# ERB File Format Extensions

!!! info "Corresponding Manual Sections"

    - [eramaker ERB Format](../eramaker/ERB_format.en.md) — Original ERB format (historical reference)
    - [Emuera Extended Syntax](../Emuera/expression.en.md) — Line continuation, special comment lines
    - [Emuera Extended Syntax - Functions](../Emuera/function.en.md) — `#FUNCTION`/`#FUNCTIONS` declarations
    - [Emuera Extended Syntax - Variables](../Emuera/variables.en.md) — `#DIM`/`#DIMS`/`#DIMF` declarations

---

## Overview

eramaker defined the basic ERB file format — one statement per line, `;` for comments, `=` for assignment. Emuera significantly extends this, greatly enhancing ERB's expressiveness. This tutorial systematically introduces these extensions.

| Extension Category | eramaker | Emuera Extension |
|-------------------|----------|-----------------|
| Line continuation | ❌ (must fit on one line) | ✅ `{}` multi-line continuation |
| End-of-line comments | ❌ | ✅ `; end-of-line comment` |
| Special comment lines | ❌ | ✅ `;!;` `;#;` |
| Conditional compilation | ❌ | ✅ `[SKIPSTART]`/`[SKIPEND]` `[IF]`/`[ENDIF]` |
| Private variable declarations | ❌ | ✅ `#DIM`/`#DIMS`/`#DIMF`/`#REF`/`#REFS`/`#REFF` |
| Function type declarations | ❌ | ✅ `#FUNCTION`/`#FUNCTIONS` |
| Local variable sizing | Implicit | ✅ `#LOCALSIZE`/`#LOCALSSIZE`/`#LOCALFSIZE` |
| Event modifiers | ❌ | ✅ `#PRI`/`#LATER`/`#SINGLE`/`#ONLY` |

---

## Line Continuation `{}`

eramaker requires each statement to fit on a single line. Emuera adds `{}` line continuation syntax, allowing a statement to span multiple lines:

```erb
{
    #DIM CONST HOGE =
        1,2,3,4
}
; Equivalent to: #DIM CONST HOGE = 1,2,3,4
```

### Syntax Rules

1. **`{` and `}` must occupy their own lines** — no content other than whitespace is allowed:

```erb
; ✅ Correct
{
    A = 10 +
        20 +
        30
}

; ❌ Error: { line has non-whitespace characters
{ A = 10 +
    20
}
```

2. **A space is automatically inserted at line break positions** — when split lines are joined, a space is inserted at each line break:

```erb
{
    PRINT Hello
    World
}
; Equivalent to: PRINT Hello World (note: space between Hello and World)
```

3. **Cannot split in the middle of an identifier** — because spaces are inserted at line breaks, splitting a variable name, function name, or string will cause errors:

```erb
; ❌ Error: space inserted between PRI and NT, becoming "PRI NT"
{
    PRI
    NT Hello
}

; ❌ Error: space inserted between HEL and LO
{
    STR '= "HEL
    LO"
}
```

### Processing Order

Line continuation is processed **before** comment processing. This means comments inside `{}` blocks are included in the joined line:

```erb
{
    #DIM CONST HOGE =
        1,2,3,4 ;comment
        ,5,6,7,8
}
; After joining: #DIM CONST HOGE = 1,2,3,4 ;comment ,5,6,7,8
; ",5,6,7,8" is treated as part of the end-of-line comment and ignored!
```

!!! danger "Comment Pitfall in Line Continuation"

    Since line continuation is processed before comments, end-of-line comments in `{}` blocks can cause subsequent lines to be unexpectedly ignored. Avoid using end-of-line comments in `{}` blocks.

---

## End-of-Line Comments

Emuera allows `;` comments at the end of statements:

```erb
A = B ;Assign B to A
MONEY += 100 ;Increase money
```

### Exception

For commands like `PRINT` where the parameter is a simple string, `;` is not treated as a comment but as part of the string:

```erb
PRINT foobar;hogehoge
; Output: foobar;hogehoge (; is part of the string)
```

---

## Special Comment Lines

### `;!;` — Emuera-Only Lines

Lines starting with `;!;` are treated as valid lines (not comments) in Emuera, but as comments in eramaker:

```erb
;!;PRINTW This script cannot run in Emuera
;!;QUIT
```

This can be used to write code that only executes in eramaker (since in Emuera, these lines execute and can actively prevent running).

### `;#;` — Debug-Only Lines

Lines starting with `;#;` are only executed in debug mode; in non-debug mode, they are treated as comments:

```erb
;#;PRINTV DEBUG_VAR
;#;PRINTW Debug information
```

!!! tip "Debug commands don't need ;#;"

    `DEBUG` series commands (like `DEBUGPRINT`) are automatically ignored in non-debug mode, so `;#;` is unnecessary. Similarly, debug variables are empty strings or 0 in non-debug mode.

---

## Conditional Compilation

### `[SKIPSTART]` / `[SKIPEND]`

Code between these two markers is skipped in Emuera (neither executed nor parsed):

```erb
[SKIPSTART]
This code will not execute in Emuera
[SKIPEND]
```

### `[IF]` / `[ENDIF]`

Determines whether to compile code based on conditions. The `[IF]` parameter is a definition name (defined in `_replace.csv`), not an expression:

```erb
[IF ___]
    Only compiled when ___ is defined
[ENDIF]
```

### Combining with `;!;`

You can combine `;!;` with `[SKIPSTART]`/`[SKIPEND]` to write code that only runs in Emuera or only in eramaker:

```erb
; Only run outside Emuera
;!;[SKIPSTART]
PRINTW This script cannot run outside Emuera
QUIT
;!;[SKIPEND]
```

---

## `#` Preprocessor Directives

Lines starting with `#` are preprocessor directives used inside function definitions to declare variables, specify function attributes, etc. These are processed during the parsing phase, not at runtime.

### Private Variable Declarations

Variables declared inside a function are only visible within that function:

```erb
@MY_FUNCTION
#DIM L_COUNT          ; Integer private variable, default 0
#DIM L_ARR, 10        ; Integer private array, 10 elements
#DIMS L_NAME          ; String private variable, default ""
#DIMS L_NAMES, 5      ; String private array, 5 elements
#DIMF L_SCORE         ; Float private variable, default 0.0
#DIMF L_SCORES, 3     ; Float private array, 3 elements
```

#### Inline Initialization

Private variables can be initialized at declaration:

```erb
#DIM L_VALUE = 42
#DIM L_ARR, 5 = 10, 20, 30, 40, 50
#DIMS L_GREETING = "Hello"
#DIMS L_NAMES, 3 = "Alice", "Bob", "Charlie"
```

#### Constant Declarations

Use the `CONST` keyword to declare constants:

```erb
#DIM CONST MAX_LEVEL = 99
#DIM CONST ELEMENTS = 4
#DIMS CONST GAME_TITLE = "My Game"
```

#### Reference Variable Declarations

Use `#REF`/`#REFS`/`#REFF` to declare reference variables (alias variables) pointing to another variable:

```erb
#REF L_REF = TARGET    ; L_REF is an alias for TARGET
#REFS L_NAME_REF = NAME:TARGET
```

!!! warning "Private Variable Naming Rules"

    - The `#` in `#DIM`/`#DIMS`/`#DIMF` cannot be omitted (do not write `DIM`)
    - Variable names cannot start with a digit
    - Single-letter A-Z variable names are engine-reserved and cannot be used as private variable names
    - Private variable names cannot conflict with existing global variable names

### Function Type Declarations

`#FUNCTION` and `#FUNCTIONS` declare a function as an **expression function** that can be called like a function within expressions:

```erb
@IS_POSITIVE(A)
#FUNCTION
IF A > 0
    RETURNF 1
ELSE
    RETURNF 0
ENDIF

@GET_GREETING(NAME)
#FUNCTIONS
RETURNF "Hello, " + NAME + "!"
```

- `#FUNCTION` — Expression function returning an integer (Int64)
- `#FUNCTIONS` — Expression function returning a string (String)

!!! warning "Limitations of `#FUNCTION`/`#FUNCTIONS`"

    - Must be placed after the function label line (`@FunctionName`) and before the first executable statement
    - Multiple `#` lines can appear in sequence (e.g., `#DIM` → `#FUNCTION`), order does not matter
    - Empty lines and comment lines (`;`) have no effect on the `#` line sequence
    - Cannot be used with system functions (`@SHOW_SHOP`, etc.) or event functions (`@EVENTFIRST`, etc.)
    - Cannot be used together with `#PRI`/`#LATER`/`#SINGLE`/`#ONLY`
    - Function names cannot start with a digit
    - Use `RETURNF` instead of `RETURN` for return values

### Local Variable Size Specification

`#LOCALSIZE`/`#LOCALSSIZE`/`#LOCALFSIZE` specify the size of `LOCAL`/`LOCALS`/`LOCALF` arrays:

!!! warning "LOCAL/LOCALS are obsolete"

    `LOCAL` and `LOCALS` are legacy designs and their use is not recommended. Use `#DIM`/`#DIMS` to declare private variables instead.
    For new game development, it is recommended to set both `LOCAL` and `LOCALS` element counts to `-1` in `VariableSize.csv` to disable them, forcing migration to `#DIM`/`#DIMS`.

```erb
@MY_FUNCTION
#LOCALSIZE 100        ; LOCAL array size is 100 (default depends on settings)
#LOCALSSIZE 50        ; LOCALS array size is 50
#LOCALFSIZE 10        ; LOCALF array size is 10
```

!!! info "Invalid in Event Functions"

    Specifying `#LOCALSIZE` etc. in event functions is ignored because event functions may have multiple definitions, and the LOCAL variable size is determined by the maximum across all definitions.

### Event Modifiers

Event functions can use modifiers to control call order and behavior:

| Modifier | Effect |
|----------|--------|
| `#PRI` | Priority call (before other event functions) |
| `#LATER` | Delayed call (after other event functions) |
| `#SINGLE` | Call only one (stop at the first one found) |
| `#ONLY` | Call only this function (ignore all other event functions with the same name) |

```erb
@EVENTFIRST
#PRI
; This function is called before other @EVENTFIRST functions
PRINTW Priority initialization

@EVENTFIRST
; This function is called after #PRI functions
PRINTW Normal initialization

@EVENTFIRST
#LATER
; This function is called after normal functions
PRINTW Delayed initialization
```

!!! warning "Event Modifier Exclusivity Rules"

    - `#ONLY` is mutually exclusive with `#PRI`/`#LATER`/`#SINGLE` — specifying `#ONLY` causes other modifiers to be ignored
    - `#PRI` and `#LATER` can be specified simultaneously (the function is added to both lists)
    - These modifiers can only be used with event functions, not user-defined functions or system functions

---

## Complete Example

Here is a function that combines multiple extensions:

```erb
@CALC_DAMAGE(ATTACKER, DEFENDER, SKILL_ID)
#FUNCTION
#DIM CONST BASE_MULTIPLIER = 100
#DIM L_ATK_POWER
#DIM L_DEF_POWER
#DIM L_DAMAGE
#LOCALSIZE 10

L_ATK_POWER = ABL:ATTACKER:0 * BASE_MULTIPLIER / 100
L_DEF_POWER = ABL:DEFENDER:1 * BASE_MULTIPLIER / 100

{
    L_DAMAGE = L_ATK_POWER - L_DEF_POWER
        + SKILL_ID * 10
}

IF L_DAMAGE < 1
    L_DAMAGE = 1
ENDIF

RETURNF L_DAMAGE
```

---

## Compatibility with eramaker

| Feature | eramaker | Emuera | Compatibility Solution |
|---------|----------|--------|----------------------|
| Line continuation | ❌ | ✅ `{}` | eramaker ignores `{`/`}` lines |
| End-of-line comments | ❌ | ✅ `;` | eramaker treats content after `;` as string |
| `;!;` | Comment | Valid line | eramaker skips, Emuera executes |
| `;#;` | Comment | Debug line | eramaker skips |
| `#DIM` etc. | ❌ | ✅ | eramaker errors |
| `#FUNCTION` | ❌ | ✅ | eramaker errors |
| `[SKIPSTART]` | ❌ | ✅ | eramaker ignores |

If you need compatibility with both eramaker and Emuera, you can combine `;!;` with `[SKIPSTART]`/`[SKIPEND]`:

```erb
; Emuera-only code
;!;SAVESTR:0 = \%RESULT\%

; eramaker-only code
;!;[SKIPSTART]
SAVESTR:0 = %RESULTS%
;!;[SKIPEND]
```

---

## Next Steps

| What You Want to Learn | Go To |
|:---|:---|
| Assignment statement details | [Assignment Statements](assignment.en.md) |
| Event function mechanism | [Event Functions](event-functions.en.md) |
| Variables and declarations | [File Types](file-types.md) |
| System flow diagrams | [Flow Diagrams](../Emuera/system_flow.en.md) |
