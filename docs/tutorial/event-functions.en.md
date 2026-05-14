# Event Functions

!!! info "Corresponding Manual Sections"

    - **Reference Category**: [Debugging aids and system flow control](../Reference/README.en.md#debug-system-flow)
    - [Emuera System Flow](../Emuera/system_flow.en.md) — System flow and event trigger timing
    - [Emuera Extended Syntax - Functions](../Emuera/function.en.md) — Function definition and invocation
    - [ERB File Format Extensions](erb-format-extension.en.md) — `#PRI`/`#LATER`/`#SINGLE`/`#ONLY` modifiers

---

## Overview

Functions in ERABASIC are divided into three categories:

| Type | Example | Characteristics |
|------|---------|----------------|
| **Event functions** | `@EVENTFIRST`, `@EVENTSHOP` | Can be defined multiple times, automatically called by the engine, supports `#PRI`/`#LATER` etc. |
| **System functions** | `@SHOW_SHOP`, `@SHOW_STATUS` | Can only be defined once, called by the engine at specific timings |
| **User functions** | `@MY_FUNC` | Can only be defined once, actively called by scripts via `CALL` |

Event functions are one of ERABASIC's core mechanisms — the engine automatically calls them at specific timings, and you can define multiple event functions with the same name that execute in priority order.

---

## Event Functions vs. System Functions

While both event functions and system functions are automatically called by the engine, they have fundamental differences:

| | Event Functions | System Functions |
|------|:---:|:---:|
| Multiple definitions allowed | ✅ Yes | ❌ Only once |
| `#PRI`/`#LATER` modifiers | ✅ Available | ❌ Not available |
| `#SINGLE`/`#ONLY` modifiers | ✅ Available | ❌ Not available |
| `#FUNCTION`/`#FUNCTIONS` | ❌ Not available | ❌ Not available |
| `#LOCALSIZE` etc. size specification | ⚠️ Ignored | ✅ Effective |
| Behavior when undefined | Skip (no error) | Mostly skip, a few error |

### Source Code Determination

The engine determines whether a function name is an event function using `IdentifierDictionary.IsEventLabelName()`. The current event function name list:

```
EVENTFIRST, EVENTTRAIN, EVENTSHOP, EVENTBUY,
EVENTCOM, EVENTTURNEND, EVENTCOMEND, EVENTEND, EVENTLOAD,
BEFORE_THROW, BEFORE_ERROR  ← SK only
```

> **SK Exclusive**: `BEFORE_THROW` and `BEFORE_ERROR` are event functions added in the Skia version for error handling and exception interception.

System functions are determined using `IdentifierDictionary.IsSystemLabelName()`. The system function name list includes the above event function names plus:

```
SHOW_STATUS, SHOW_USERCOM, USERCOM, SOURCE_CHECK,
CALLTRAINEND, SHOW_JUEL, SHOW_ABLUP_SELECT, USERABLUP,
SHOW_SHOP, SAVEINFO, USERSHOP,
TITLE_LOADGAME, SYSTEM_AUTOSAVE, SYSTEM_TITLE, SYSTEM_LOADEND
```

Additionally, function names matching the patterns `COM\d+` (e.g., `@COM5`), `COM_ABLE\d+` (e.g., `@COM_ABLE5`), and `ABLUP\d+` (e.g., `@ABLUP3`) are also treated as system functions.

---

## Event Function Invocation Mechanism

### Multi-Definition Traversal

When the engine calls an event function, it finds all definitions with the same name and executes them in priority groups:

```
Group 0: #ONLY functions (only the first one is executed)
Group 1: #PRI functions (priority execution)
Group 2: Normal functions (no modifiers)
Group 3: #LATER functions (delayed execution)
```

The engine traverses from Group 0, executing within each group in definition order. When all groups have been traversed, the event function call is complete.

### `#ONLY` Behavior

If an event function is declared with `#ONLY`, the engine only executes the first definition with `#ONLY` and skips all other event functions with the same name:

```erb
@EVENTFIRST
#ONLY
; Only this function will be executed
PRINTW Unique initialization

@EVENTFIRST
; This function is skipped by #ONLY
PRINTW Will not execute
```

!!! warning "Consequences of Multiple #ONLY"

    If multiple event functions with the same name declare `#ONLY`, only the first one is executed. The engine issues a warning for subsequent `#ONLY` definitions.

### `#SINGLE` Behavior

`#SINGLE` indicates that only one event function should be executed before stopping. Unlike `#ONLY`, `#SINGLE` doesn't restrict which function is executed — it simply stops traversal after the current function finishes:

```erb
@EVENTFIRST
#SINGLE
PRINTW Initialization

@EVENTFIRST
#SINGLE
; If the above function has already executed, this won't
PRINTW Will not execute
```

### Combining `#PRI` and `#LATER`

`#PRI` and `#LATER` can be specified simultaneously — the function is added to both groups, executing once in the priority group and once in the delayed group:

```erb
@EVENTFIRST
#PRI
PRINTW 1. Execute first

@EVENTFIRST
#PRI #LATER
PRINTW 2. Priority execution (also registered in delayed group)

@EVENTFIRST
PRINTW 3. Normal execution

@EVENTFIRST
#LATER
PRINTW 4. Delayed execution

@EVENTFIRST
#PRI #LATER
PRINTW 5. Delayed execution again (due to #PRI #LATER combination)
```

---

## Complete Event Function List

### `@EVENTFIRST`

**Trigger timing**: After selecting "Start from beginning", or after executing `BEGIN FIRST`.

**Behavior**: Game start event. If no `BEGIN` command or `RETURN` is executed within `@EVENTFIRST`, the engine will error-terminate due to no subsequent processing.

```erb
@EVENTFIRST
PRINTW Game starts!
MONEY = 500
BEGIN SHOP
```

### `@EVENTSHOP`

**Trigger timing**: When entering the SHOP phase (except after loading).

**Behavior**: Called before `@SHOW_SHOP`. Note that `@EVENTSHOP` is **not called** when entering SHOP after loading a save.

```erb
@EVENTSHOP
PRINTW Welcome to the shop!
```

### `@EVENTBUY`

**Trigger timing**: After a successful purchase in SHOP.

**Behavior**: After a successful purchase, the `BOUGHT` variable has been set to the purchased item number, `ITEM:BOUGHT` has been incremented by 1, and `MONEY` has been decreased.

```erb
@EVENTBUY
PRINTW Purchased %ITEMNAME:BOUGHT%!
```

### `@EVENTTRAIN`

**Trigger timing**: When entering the TRAIN phase, before `@SHOW_STATUS`.

**Behavior**: If undefined, the engine skips directly to `@SHOW_STATUS`.

```erb
@EVENTTRAIN
PRINTW Training begins!
```

### `@EVENTCOM`

**Trigger timing**: When executing a command in TRAIN, before calling `@COMxx`.

**Behavior**: `SELECTCOM` has been set to the selected command number.

```erb
@EVENTCOM
PRINTW Executed command {SELECTCOM}
```

### `@EVENTCOMEND`

**Trigger timing**: After a command executes successfully in TRAIN (`@COMxx` returns non-zero), after `@SOURCE_CHECK` completes.

**Behavior**: All characters' `SOURCE` has been reset to 0. If no `WAIT` command is executed within `@EVENTCOMEND`, the engine automatically adds one.

```erb
@EVENTCOMEND
PRINTW Command execution complete
```

### `@EVENTTURNEND`

**Trigger timing**: After executing `BEGIN TURNEND`.

**Behavior**: Turn end event. If no `BEGIN` command is executed within `@EVENTTURNEND`, the engine will error-terminate due to no subsequent processing.

```erb
@EVENTTURNEND
DAY += 1
PRINTW Day {DAY} ends
BEGIN SHOP
```

### `@EVENTEND`

**Trigger timing**: After executing `BEGIN AFTERTRAIN`.

**Behavior**: Training end event. If no `BEGIN` command is executed within `@EVENTEND`, the engine will error-terminate due to no subsequent processing.

```erb
@EVENTEND
PRINTW Training completely ended
BEGIN SHOP
```

### `@EVENTLOAD`

**Trigger timing**: After loading save data, after `@SYSTEM_LOADEND` (if defined).

**Behavior**: Load completion event. If no `BEGIN` command is executed within `@EVENTLOAD`, it proceeds normally to `@SHOW_SHOP`.

```erb
@EVENTLOAD
PRINTW Save data loaded!
```

### `@BEFORE_THROW` (SK Exclusive) { #before_throw }

**Trigger timing**: Before the `THROW` instruction throws an exception.

**Behavior**: Allows scripts to intercept and handle exceptions before they are thrown. If the `@BEFORE_THROW` event function exists, the exception will be delayed, allowing the script to perform cleanup or recovery operations.

**Note**: If `THROW` is called again inside `@BEFORE_THROW`, recursive calls are blocked and the message is printed directly without triggering the event again.

```erb
@BEFORE_THROW
#PRI
PRINTW Exception detected, attempting recovery...
; Cleanup or recovery operations can be performed here
; If the function ends normally, the exception will continue to be thrown
```

### `@BEFORE_ERROR` (SK Exclusive) { #before_error }

**Trigger timing**: When any error first occurs (including runtime errors, script errors, etc.).

**Behavior**: Called before the error handling process begins, providing a unified error handling hook. Allows scripts to intervene before errors are displayed to the user.

**Note**: If another error occurs inside `@BEFORE_ERROR`, the error handling process proceeds directly without triggering the event again.

```erb
@BEFORE_ERROR
#PRI
PRINTW Error occurred, processing...
; Error logging or recovery attempts can be performed here
```

> **SK Exclusive**: `BEFORE_THROW` and `BEFORE_ERROR` are event functions added in the Skia version, providing more powerful error handling capabilities. These events are not available in the original Emuera or other variants.

---

## System Function List

System functions are called by the engine at specific timings, but can only be defined once and do not support `#PRI`/`#LATER` modifiers.

### Title-Related

| Function Name | Trigger Timing | Description |
|--------------|---------------|-------------|
| `@SYSTEM_TITLE` | Title screen after startup | Custom title screen, replaces standard title |
| `@TITLE_LOADGAME` | Selecting "Load" on title screen | Custom load screen, replaces standard load screen |

### SHOP-Related

| Function Name | Trigger Timing | Description |
|--------------|---------------|-------------|
| `@SHOW_SHOP` | After entering SHOP | Display shop screen |
| `@USERSHOP` | Non-purchase number input in SHOP | Handle custom input |

### TRAIN-Related

| Function Name | Trigger Timing | Description |
|--------------|---------------|-------------|
| `@SHOW_STATUS` | Start of TRAIN loop | Display status screen |
| `@SHOW_USERCOM` | After displaying executable commands | Display custom command prompt |
| `@USERCOM` | Input of non-executable command | Handle custom command input |
| `@SOURCE_CHECK` | After `@COMxx` returns non-zero | Process SOURCE calculation |
| `@COMxx` | Input of executable command | Execute command with corresponding number |
| `@COM_ABLExx` | When displaying command list | Determine if command is executable (return 0 = not executable) |
| `@CALLTRAINEND` | After continuous training commands end | Continuous training end processing |

### ABLUP-Related

| Function Name | Trigger Timing | Description |
|--------------|---------------|-------------|
| `@SHOW_JUEL` | After entering ABLUP | Display jewel screen |
| `@SHOW_ABLUP_SELECT` | After `@SHOW_JUEL` | Display ability upgrade selection |
| `@ABLUPxx` | Selecting upgrade item | Execute ability upgrade with corresponding number |
| `@USERABLUP` | Input outside 0-99 range | Handle custom upgrade input |

### Save-Related

| Function Name | Trigger Timing | Description |
|--------------|---------------|-------------|
| `@SAVEINFO` | Just before saving | Generate save description information |
| `@SYSTEM_AUTOSAVE` | During auto-save | Custom auto-save processing |
| `@SYSTEM_LOADEND` | After loading completes | Custom post-load processing (before `@EVENTLOAD`) |

---

## Call Flow Details

### Event Functions in the TRAIN Loop

TRAIN is the most complex flow, involving collaboration between multiple event and system functions:

```
BEGIN TRAIN
    │
    ├─ @EVENTTRAIN (optional, multiple definitions allowed)
    │
    ├─ @SHOW_STATUS (must be defined)
    │   ├─ Display executable commands (calls @COM_ABLExx to determine)
    │   └─ @SHOW_USERCOM (must be defined)
    │
    ├─ Wait for input
    │
    ├─ Executable command input?
    │   ├─ Yes → @EVENTCOM (multiple definitions allowed)
    │   │       → @COMxx (must be defined, non-zero return = success)
    │   │       → @SOURCE_CHECK (must be defined)
    │   │       → @EVENTCOMEND (multiple definitions allowed)
    │   │       → Return to @SHOW_STATUS
    │   │
    │   └─ No → @USERCOM (must be defined)
    │           → Return to @SHOW_STATUS
    │
    └─ Execute BEGIN command → Leave TRAIN
```

### Event Functions in the SHOP Loop

```
BEGIN SHOP
    │
    ├─ @EVENTSHOP (optional, multiple definitions allowed)
    │
    ├─ Auto-save (if enabled)
    │   └─ @SYSTEM_AUTOSAVE or @SAVEINFO
    │
    ├─ @SHOW_SHOP (must be defined)
    │
    ├─ Wait for input
    │
    ├─ Purchase number input?
    │   ├─ Yes → Purchase processing → @EVENTBUY (multiple definitions allowed)
    │   │       → Return to @SHOW_SHOP
    │   │
    │   └─ No → @USERSHOP (must be defined)
    │           → Return to @SHOW_SHOP
    │
    └─ Execute BEGIN command → Leave SHOP
```

---

## Common Patterns

### Initialization Pattern

```erb
@EVENTFIRST
#PRI
; Highest priority initialization
MONEY = 500
DAY = 1

@EVENTFIRST
; Normal initialization
CALL INIT_ITEMS
CALL INIT_CHARACTERS

@EVENTFIRST
#LATER
; Last initialization
PRINTW Initialization complete!
BEGIN SHOP
```

### Post-Load Processing Pattern

```erb
@SYSTEM_LOADEND
; Executes before @EVENTLOAD
PRINTW System load complete

@EVENTLOAD
; Executes after @SYSTEM_LOADEND
PRINTW Welcome back!
```

### Command Extension Pattern

```erb
@EVENTCOM
; Common processing before each command
TFLAG:CommandCount += 1

@EVENTCOMEND
; Common processing after each command
CALL CHECK_LEVEL_UP
```

---

## Common Pitfalls

| Pitfall | Description | Solution |
|---------|-------------|----------|
| Event function doesn't execute BEGIN | Some event functions (like `@EVENTFIRST`, `@EVENTEND`) will cause the engine to error-terminate if BEGIN is not executed | Ensure BEGIN or RETURN is executed at the end of event functions |
| @EVENTSHOP not called after loading | After loading, SHOP is entered directly without calling @EVENTSHOP | Use `@EVENTLOAD` or `@SYSTEM_LOADEND` for post-load logic |
| #ONLY misuse | #ONLY skips all event functions with the same name, including definitions in other files | Use #ONLY carefully; #SINGLE is usually safer |
| #LOCALSIZE ineffective in event functions | #LOCALSIZE in event functions is ignored | Use #DIM to declare private variables instead |
| Multiple system function definitions | System functions can only be defined once; multiple definitions cause errors | Ensure each system function is defined in only one file |
| @COM_ABLExx return value misunderstanding | Return 0 means not executable, non-0 means executable | Note it's "non-0 = executable", not "1 = executable" |

---

## Next Steps

| What You Want to Learn | Go To |
|:---|:---|
| ERB file format extensions | [ERB File Format Extensions](erb-format-extension.en.md) |
| Assignment statement details | [Assignment Statements](assignment.en.md) |
| System flow diagrams | [Flow Diagrams](../Emuera/system_flow.en.md) |
| BEGIN command | [BEGIN](../Reference/BEGIN.md) |
| CALL command | [CALL](../Reference/CALL.md) |
