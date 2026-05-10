# State Machine Flow

!!! info "Corresponding Manual"

    - [Flow Diagrams](../Emuera/system_flow.en.md) — Complete flow diagrams and details for each state
    - [Event Functions](event-functions.en.md) — Event hooks automatically called by the engine at each state
    - [BEGIN Instruction](../Reference/BEGIN.en.md) — State transition instruction API reference

---

## Overview

ERABASIC programs don't start from `main()` — the engine has a **built-in state machine** that determines when your code is called and in what order.

Understanding the state machine is key to era game development: you're not writing "a program," you're writing "callback functions mounted on the engine's state machine nodes."

---

## The Two-State Model

Forget the details for now. An ERABASIC program is always in one of two states:

| State | Description | What the engine is doing |
|-------|-------------|--------------------------|
| **Running** | CALL chain is executing | Executing your code line by line |
| **Waiting** | Stopped at INPUT, waiting for player input | Doing nothing, waiting for a key press |

```
Running ──encounters INPUT──→ Waiting
Waiting ──player inputs────→ Running
```

That's it. Your program is either running a CALL chain or waiting for the player. There is no third state.

!!! tip "Intuitive Understanding"

    Imagine writing a "choose your own adventure" book. Each page (function) displays some text, then asks the reader to make a choice (INPUT). The reader's choice determines which page to turn to (the next CALL). The engine is the page-turner.

---

## State Machine Overview

The engine has 6 major states, with `BEGIN` instructions for transitioning between them:

```
TITLE ──BEGIN FIRST──→ FIRST
                         │
                         ↓
                       SHOP ←──────────────────┐
                         │                      │
                       BEGIN TRAIN              │
                         ↓                      │
                       TRAIN ──BEGIN SHOP──────→┘
                         │
                       BEGIN ABLUP → ABLUP ──BEGIN SHOP──→ SHOP
                         │
                       BEGIN AFTERTRAIN → AFTERTRAIN
                         │
                       BEGIN TURNEND → TURNEND
```

| State | Entry Method | What the engine does |
|-------|-------------|----------------------|
| **TITLE** | After startup, or `BEGIN TITLE` | Display title screen |
| **FIRST** | `BEGIN FIRST` | Game initialization |
| **SHOP** | `BEGIN SHOP`, or after loading a save | Shop/main loop |
| **TRAIN** | `BEGIN TRAIN` | Training/action loop |
| **ABLUP** | `BEGIN ABLUP` | Ability upgrade |
| **AFTERTRAIN** | `BEGIN AFTERTRAIN` | Training ended |
| **TURNEND** | `BEGIN TURNEND` | Turn ended |

### Typical Game Loop

Most era games follow this loop:

```
TITLE → FIRST → SHOP ⇄ TRAIN → SHOP → ...
                   ↑       │
                   └───────┘
```

1. **TITLE**: Player sees the title screen, chooses "Start" or "Load"
2. **FIRST**: Initialize game data
3. **SHOP**: Main menu, player chooses an action
4. **TRAIN**: Execute actions, process results
5. Return to **SHOP**, wait for the next choice

---

## TITLE — Title Screen

The engine enters the TITLE state first after startup.

### Custom Title Screen

Define `@SYSTEM_TITLE` to replace the default title screen:

```erb
@SYSTEM_TITLE
    PRINTL ═══════════════════
    PRINTL   My Era Game
    PRINTL ═══════════════════
    PRINTL [0] Start Game
    PRINTL [1] Load Save
    INPUT

    IF RESULT == 0
        BEGIN FIRST
    ELSEIF RESULT == 1
        BEGIN LOADGAME
    ENDIF
```

### Default Title Screen

If `@SYSTEM_TITLE` is not defined, the engine displays the standard title screen:

- `[0] Start from beginning` → Initialize data → `BEGIN FIRST`
- `[1] Load and start` → Display load screen

!!! warning "BEGIN is Required"

    If `@SYSTEM_TITLE` returns without executing `BEGIN`, the engine will error-terminate because there is nothing left to execute.

---

## FIRST — Game Initialization

Entered via `BEGIN FIRST`. The engine calls `@EVENTFIRST`.

```erb
@EVENTFIRST
    MONEY = 1000
    DAY = 1
    ADDCHARA 0
    PRINTW Game started!
    BEGIN SHOP
```

!!! warning "FIRST State Requires a Transition"

    If `@EVENTFIRST` does not execute `BEGIN`, the engine will error-terminate. Typically, `BEGIN SHOP` is placed at the end to enter the main loop.

---

## SHOP — Main Loop

SHOP is the game's main loop. The player spends most of their time making choices here.

### Execution Flow

```
BEGIN SHOP
    │
    ├─ @EVENTSHOP (if defined)
    │
    ├─ Auto-save (if enabled)
    │
    ├─ @SHOW_SHOP (must be defined)
    │
    ├─ Wait for input
    │
    ├─ Purchase number (0~99) input?
    │   ├─ Yes → Purchase processing → @EVENTBUY → Back to @SHOW_SHOP
    │   └─ No → @USERSHOP → Back to @SHOW_SHOP
    │
    └─ BEGIN executed → Leave SHOP
```

### Basic Usage

```erb
@SHOW_SHOP
    PRINTL ─── Main Menu ───
    PRINTL [0] Start training
    PRINTL [1] Check status
    PRINTL [100] Save
    PRINTL [101] Load

@USERSHOP
    IF RESULT == 0
        BEGIN TRAIN
    ELSEIF RESULT == 1
        CALL SHOW_STATUS_DETAIL
    ELSEIF RESULT == 100
        SAVEGAME
    ELSEIF RESULT == 101
        LOADGAME
    ENDIF
```

!!! note "@EVENTSHOP is Not Called After Loading"

    After loading a save, the game enters SHOP directly but **does not** call `@EVENTSHOP`. Use `@EVENTLOAD` or `@SYSTEM_LOADEND` for post-load logic.

---

## TRAIN — Action Loop

TRAIN is the core gameplay loop. The player selects and executes actions here.

### Execution Flow

```
BEGIN TRAIN
    │
    ├─ Initialize variables (ASSIPLAY, TFLAG, PALAM, etc.)
    │
    ├─ @EVENTTRAIN (if defined)
    │
    ├─ @SHOW_STATUS (must be defined)
    │   ├─ Display executable commands (calls @COM_ABLExx to check)
    │   └─ @SHOW_USERCOM (must be defined)
    │
    ├─ Wait for input
    │
    ├─ Executable command input?
    │   ├─ Yes → @EVENTCOM → @COMxx → @SOURCE_CHECK → @EVENTCOMEND
    │   │       → Back to @SHOW_STATUS
    │   └─ No → @USERCOM → Back to @SHOW_STATUS
    │
    └─ BEGIN executed → Leave TRAIN
```

### Basic Usage

```erb
@SHOW_STATUS
    PRINTL ─── Training ───
    CALL SHOW_TARGET_INFO

@SHOW_USERCOM
    PRINTL [0] Pat head
    PRINTL [1] Embrace
    PRINTL [999] Return to shop

@COM0
    PRINTW You gently patted her head.
    RETURN 1

@COM1
    PRINTW You gave her a hug.
    RETURN 1

@USERCOM
    IF RESULT == 999
        BEGIN SHOP
    ENDIF
```

### Command Availability Check

`@COM_ABLExx` determines whether a command is available. Return non-zero = available, return 0 = unavailable:

```erb
@COM_ABLE5
    ; Command 5 requires TARGET's trust >= 50
    IF CFLAG:TRUST < 50
        RETURN 0
    ENDIF
    RETURN 1
```

---

## Other States

### ABLUP — Ability Upgrade

Entered via `BEGIN ABLUP`. Used for upgrading character abilities.

```erb
@SHOW_JUEL
    PRINTL ─── Gems ───
    ; Display current gems

@SHOW_ABLUP_SELECT
    PRINTL [0] Upgrade obedience
    PRINTL [1] Upgrade desire
    ; Display upgradeable ability list
```

### AFTERTRAIN — Training Ended

Entered via `BEGIN AFTERTRAIN`. Event handling after training is completely finished.

### TURNEND — Turn Ended

Entered via `BEGIN TURNEND`. End-of-day processing.

```erb
@EVENTTURNEND
    DAY += 1
    PRINTW Day {DAY} has ended.
    BEGIN SHOP
```

---

## BEGIN Instruction — State Transition

`BEGIN` is the only way to transition between states. It includes an implicit `RETURN` — code after `BEGIN` will never execute.

```erb
@MY_FUNC
    BEGIN SHOP
    PRINTL This line will never execute
```

### Available BEGIN Parameters

| Instruction | Target State |
|-------------|-------------|
| `BEGIN FIRST` | FIRST state |
| `BEGIN SHOP` | SHOP state |
| `BEGIN TRAIN` | TRAIN state |
| `BEGIN ABLUP` | ABLUP state |
| `BEGIN AFTERTRAIN` | AFTERTRAIN state |
| `BEGIN TURNEND` | TURNEND state |
| `BEGIN TITLE` | TITLE state |
| `BEGIN LOADGAME` | Load screen |

---

## Save and Load

### Saving

The `SAVEGAME` instruction displays the save screen. Just before saving, the engine calls `@SAVEINFO` to generate the save description:

```erb
@SAVEINFO
    ; PRINT output from this function becomes the save description
    PRINTFORM Day {DAY} - %CALLNAME:MASTER%'s record
```

### Loading

The `LOADGAME` instruction displays the load screen. Flow after loading completes:

```
Load complete
    │
    ├─ @SYSTEM_LOADEND (if defined)
    │   └─ Executed BEGIN? → Transition
    │
    ├─ @EVENTLOAD (if defined)
    │   └─ Executed BEGIN? → Transition
    │
    └─ Default → @SHOW_SHOP
```

The `LOADDATA` instruction directly loads a save by number without displaying the load screen.

---

## Error Handling Flow

### THROW Exception

The `THROW` instruction throws an exception. If `@BEFORE_THROW` event function (Skia exclusive) is defined, the engine calls it before throwing:

```
THROW executed
    │
    ├─ Already inside @BEFORE_THROW? → Throw directly
    │
    └─ @BEFORE_THROW defined? → Call @BEFORE_THROW → Throw
```

### Runtime Errors

When any uncaught error occurs, if `@BEFORE_ERROR` event function (Skia exclusive) is defined, the engine calls it before error processing.

> See [Event Functions — BEFORE_THROW / BEFORE_ERROR](event-functions.en.md#before_throw)

---

## Common Pitfalls

| Pitfall | Description | Solution |
|---------|-------------|----------|
| Event function doesn't execute BEGIN | `@EVENTFIRST`, `@EVENTEND`, etc. will error-terminate without `BEGIN` | Ensure `BEGIN` or `RETURN` at the end |
| @EVENTSHOP not called after loading | After loading a save, SHOP is entered directly, skipping `@EVENTSHOP` | Use `@EVENTLOAD` or `@SYSTEM_LOADEND` |
| Code after BEGIN doesn't execute | `BEGIN` includes an implicit `RETURN` | Don't write code after `BEGIN` |
| Forgetting BEGIN SHOP in TRAIN | The TRAIN loop doesn't end automatically | Handle "return" logic in `@USERCOM` |
| @COMxx returns 0 | Command is treated as failed; `@SOURCE_CHECK` and `@EVENTCOMEND` are not called | Ensure successful commands return non-zero |

---

## Next Steps

| What you want to learn | Go to |
|:---|:---|
| Event functions in detail | [Event Functions](event-functions.en.md) |
| BEGIN instruction API | [BEGIN](../Reference/BEGIN.en.md) |
| Character variable system | [Character Variables](../Emuera/variables.en.md) |
| Complete flow diagrams | [Flow Diagrams](../Emuera/system_flow.en.md) |
