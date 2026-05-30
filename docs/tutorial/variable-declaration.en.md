# Variable Declaration System

!!! info "Corresponding Reference"

    - **Reference Category**: [Variable manipulation, CSV reference](../Reference/README.en.md#variable-operations)
    - [User-Defined Variables](../Emuera/user_defined_variables.en.md) — #DIM declaration specification
    - [Header Files ERH](../Emuera/ERH.en.md) — Global variable declarations
    - [Function Definition](../Emuera/function.en.md) — Function parameters and pass-by-reference

!!! tip "Prerequisites"

    This section builds upon [Values, Types & Variables](values-types.en.md). Please familiarize yourself with the three-type system (Int/Str/Float) and basic `#DIM` declarations first.

---

## Overview

ERABASIC's variable declaration system is far more complex than it first appears. `#DIM`/`#DIMS`/`#DIMF` do more than just "declare a variable" — they support multiple modifier keywords (CONST/DYNAMIC/STATIC/GLOBAL/SAVEDATA/CHARADATA/REF/OUT) that determine the variable's **lifetime**, **visibility**, **persistence**, and **reference semantics**.

| Modifier | Effect | Scope |
|----------|--------|-------|
| `CONST` | Constant, immutable | Global/Private |
| `DYNAMIC` | Dynamically allocated, released on function return | Private only |
| `STATIC` | Static, preserved across calls | Private only |
| `GLOBAL` | Cross-save global | Global only (ERH) |
| `SAVEDATA` | Saved with game data | Global only (ERH) |
| `CHARADATA` | Per-character data | Global only (ERH) |
| `REF` | Reference variable | Global/Private |
| `OUT` | Optional reference parameter (implies REF) | Private only |

---

## Declaration Location and Scope

ERABASIC variable declarations are distributed across three locations, processed from earliest to latest:

```
CSV Preprocessing (processed first)
├── variable_size.csv    → Built-in variable array sizes
├── _replace.csv         → Variable name replacement mappings
└── chara/*.csv          → Character data definitions

ERH Header Declarations (processed before ERB)
├── #DIM X, 100          → Global integer variable
├── #DIM CONST MAX = 100 → Global constant
├── #DIM GLOBAL G_VAR    → Cross-save global variable
├── #DIM SAVEDATA S_VAR  → Save-persisted variable
└── #DIM CHARADATA C_VAR → Character data variable

ERB Function-Local Declarations (function-level private)
├── #DIM L_TEMP, 10      → Private integer variable
├── #DIM DYNAMIC L_TMP   → Dynamic private variable
├── #DIM STATIC L_CACHE  → Static private variable
├── #DIM REF L_ARR, 0    → Array reference
├── #REF L_ELEM          → Element reference
└── #DIM OUT L_OUT       → Optional OUT parameter
```

!!! warning "# Line Position Rule"

    All preprocessor lines starting with `#` must appear after the `@FunctionName(...)` label line and before the first executable statement. Multiple `#` lines can appear consecutively in any order. Blank lines and comment lines (`;`) do not interrupt the `#` line sequence:

    ```erb
    @MY_FUNC(ARG:0)
    #DIM L_COUNT, 10          ; ✅ After @ line
    ; This is a comment (does not interrupt # line sequence)
    #DIMS L_NAME              ; ✅ Still valid after comment
        L_COUNT:0 = ARG:0     ; ✅ First executable statement
        ; #DIM L_X, 5         ; ❌ Cannot appear in function body
    RETURN
    ```

---

## Arrays and Dimensions

### Dimension Declaration

The number after `#DIM` determines the array's dimensionality and size:

| Declaration | Dimensions | Size | Description |
|-------------|-----------|------|-------------|
| `#DIM X` | 0 | 1 | Single-element array (size defaults to 1 when omitted) |
| `#DIM X, 100` | 1 | 100 | One-dimensional array |
| `#DIM X, 10, 20` | 2 | 10×20 | Two-dimensional array |
| `#DIM X, 10, 20, 5` | 3 | 10×20×5 | Three-dimensional array (maximum) |

### Inline Initialization

One-dimensional arrays support inline initialization; multi-dimensional arrays do not:

```erb
; ✅ 1D array: size automatically inferred
#DIM DATA = 1, 2, 3
; DATA:0=1, DATA:1=2, DATA:2=3, element count is 3

; ✅ 1D array: specified size + partial initialization
#DIM DATA2, 100 = 4, 5, 6
; DATA2:0=4, DATA2:1=5, DATA2:2=6, DATA2:3~99=0

; ✅ String array initialization
#DIMS NAMES = "Alice", "Bob", "Charlie"

; ❌ Multi-dimensional arrays do not support inline initialization
; #DIM MAT, 5, 5 = 1, 2, 3, ...  ← Error!
```

Multi-dimensional arrays require row-by-row assignment:

```erb
#DIM MAT, 5, 5
MAT:0:0 = 256, 0, 0, 0, 0
MAT:1:0 = 0, 256, 0, 0, 0
```

!!! danger "Initialization value count must not exceed specified size"

    ```erb
    #DIM HIGE, 1 = 7, 8, 9    ; ❌ Error: 3 initial values exceed 1 element
    ```

---

## CONST — Constants

`CONST` declares immutable constants. Must be initialized and cannot be reassigned:

```erb
#DIM CONST MAX_LEVEL = 99
#DIM CONST ELEMENTS = 4
#DIMS CONST GAME_TITLE = "My Game"
```

### CONST Constraints

- **Must be initialized** — Cannot declare without assignment
- **Immutable** — Subsequent assignment causes an error
- **One-dimensional only** — Multi-dimensional constant arrays are not supported
- **Mutually exclusive** — Cannot be combined with GLOBAL/SAVEDATA/REF/DYNAMIC

```erb
; ✅ Correct
#DIM CONST MAX = 100
#DIMS CONST TITLE = "Era Game"

; ❌ Error: missing initial value
; #DIM CONST X

; ❌ Error: cannot combine with DYNAMIC
; #DIM CONST DYNAMIC X = 1
```

---

## DYNAMIC — Dynamic Variables

`DYNAMIC` variables are **allocated on function call** and **released on function return**:

```erb
@RECURSIVE_FUNC(ARG:0)
#DIM DYNAMIC L_SUM
    L_SUM += ARG:0
    IF ARG:0 > 0
        CALL RECURSIVE_FUNC(ARG:0 - 1)
    ENDIF
    PRINTFORML ARG:0 = {ARG:0}, L_SUM = {L_SUM}
RETURN
```

### DYNAMIC vs Non-DYNAMIC

| Property | DYNAMIC | Non-DYNAMIC (default) |
|----------|---------|----------------------|
| Allocation timing | On function call | At program startup |
| Release timing | On function return | Not released until program ends |
| During recursion | Independent copy per call depth | All calls share the same variable |
| Initial value | Reset to default on each call | Retains value from previous call |
| Performance | Slower (allocation/release overhead) | Faster |

### Recursive Scenarios

The primary use case for DYNAMIC variables is **recursive functions**. Without DYNAMIC, recursive calls overwrite the previous level's variable values:

```erb
; ❌ Without DYNAMIC: variable overwritten during recursion
@BAD_RECURSE(ARG:0)
#DIM L_SUM
    L_SUM += ARG:0
    ; The second recursive call modifies the same L_SUM
    IF ARG:0 > 0
        CALL BAD_RECURSE(ARG:0 - 1)
    ENDIF
    ; L_SUM has already been modified by recursion
RETURN

; ✅ With DYNAMIC: each recursion level has an independent copy
@GOOD_RECURSE(ARG:0)
#DIM DYNAMIC L_SUM
    L_SUM += ARG:0
    IF ARG:0 > 0
        CALL GOOD_RECURSE(ARG:0 - 1)
    ENDIF
    ; Each recursion level's L_SUM is independent
RETURN
```

!!! danger "Original Engine ARG Recursion Trap"

    In the `BAD_RECURSE` example above, even adding `DYNAMIC` to `L_SUM` **still causes recursion errors in the original engine (emuera.em / EM+EE)** — because `ARG:0` in the original engine is stored per function name, so when the same function is called recursively, all levels share the same ARG array rather than having independent copies.

    ```erb
    ; In the original engine, ARG:0 is also overwritten during recursion!
    @STILL_BAD_RECURSE(ARG:0)
    #DIM DYNAMIC L_SUM       ; ← L_SUM now has independent copies
        L_SUM += ARG:0
        IF ARG:0 > 0
            CALL STILL_BAD_RECURSE(ARG:0 - 1)  ; ← But ARG:0 gets overwritten!
        ENDIF
        ; ARG:0 here is no longer the passed-in value, but the innermost recursion's value
    RETURN
    ```

    **Root cause**: The original engine manages LOCAL/ARG through a `VariableLocal` dictionary keyed by function name (subKey). Different functions have independent arrays, but **when the same function is called recursively, the subKey is identical, so all levels share the same ARG/LOCAL array**. `DYNAMIC` only solves the problem for `#DIM`-declared private variables — **it does not protect built-in variables like ARG/LOCAL**.

    **Skia version fix**: Introduces an `ExecutionContext` stack, where each function call has independent `ArgIntegers`/`ArgStrings`/`LocalIntegers`/`LocalStrings` arrays, fundamentally resolving the ARG/LOCAL overwrite problem during recursion. See [Skia Version Specification Changes — ExecutionContext Stack-based Function Context](../Skia/Skia_Summary.en.md#executioncontext).

    | Engine | ARG:0 Recursion Behavior | L_SUM (DYNAMIC) Recursion Behavior |
    |--------|-------------------------|-----------------------------------|
    | Original (emuera.em / EM+EE) | ❌ Shared across all levels, overwritten | ✅ Independent copy |
    | Skia version | ✅ Independent copy (ExecutionContext isolation) | ✅ Independent copy |

!!! warning "DYNAMIC and RESTART"

    The `RESTART` instruction jumps back to the function start and does **not** reset DYNAMIC variables. Only returning from and re-entering the function resets them.

### DYNAMIC Mutual Exclusion

Cannot be combined with CONST, STATIC, GLOBAL, SAVEDATA, CHARADATA, REF, or OUT.

---

## STATIC — Static Private Variables

`STATIC` variables **retain their values** across function calls but are only visible within the declaring function:

```erb
@COUNTER
#DIM STATIC L_COUNT
    L_COUNT += 1
    PRINTFORML Call #{L_COUNT}
RETURN
```

```
Call #1
Call #2
Call #3
```

### STATIC vs Non-DYNAMIC vs DYNAMIC

| Property | STATIC | Non-DYNAMIC (default) | DYNAMIC |
|----------|--------|----------------------|---------|
| Retains value across calls | ✅ | ✅ | ❌ (reset each call) |
| Independent during recursion | ❌ (shared) | ❌ (shared) | ✅ (independent) |
| Visibility | Declaring function only | Declaring function only | Declaring function only |

The difference between STATIC and default (non-DYNAMIC) is **semantic clarity**: STATIC explicitly signals "I need to retain values across calls," while the default behavior also retains values but may be unintentional.

### STATIC Mutual Exclusion

Cannot be combined with DYNAMIC, REF, or OUT.

---

## Global Variable Declarations (ERH)

Variables declared in ERH header files are **global variables** accessible from all ERB files:

```erb
; VARIABLE.ERH
#DIM GAME_STATE, 10            ; Global integer array
#DIMS GAME_NAME                ; Global string variable
#DIMF GAME_SCORE               ; Global float variable (Skia addition)
#DIM CONST MAX_PARTY = 6       ; Global constant
```

### Global-Only Modifiers

The following modifier keywords can only be used in ERH files:

#### GLOBAL — Cross-Save Global

`GLOBAL` variable values are **shared across all save files** and persisted to the `global.sav` file:

```erb
; VARIABLE.ERH
#DIM GLOBAL TOTAL_PLAY_COUNT     ; Cross-save cumulative play count
#DIMS GLOBAL LAST_SAVE_NAME      ; Cross-save last save name
```

- Saved with `SAVEGLOBAL`, loaded with `LOADGLOBAL`
- Not affected by save file loading

#### SAVEDATA — Save-Persisted

`SAVEDATA` variable values are **saved and loaded with game saves**:

```erb
; VARIABLE.ERH
#DIM SAVEDATA QUEST_FLAGS, 100   ; Quest flags, saved with game data
#DIMS SAVEDATA SCENE_MEMO        ; Scene notes, saved with game data
```

- Automatically saved when writing a save file
- Automatically restored when loading a save file

#### CHARADATA — Character Data

`CHARADATA` variables are **stored independently per character**, similar to built-in character variables like `TALENT` and `ABL`:

```erb
; VARIABLE.ERH
#DIM CHARADATA SKILL_LEVEL, 10   ; Skill level per character
#DIMS CHARADATA NICKNAME         ; Nickname per character
```

- Access pattern: `SKILL_LEVEL:characterIndex:skillIndex`
- Allocated/released as characters are added/removed

### Global Modifier Mutual Exclusion Table

| | CONST | GLOBAL | SAVEDATA | CHARADATA | REF |
|---|---|---|---|---|---|
| CONST | — | ❌ | ❌ | ❌ | ❌ |
| GLOBAL | ❌ | — | ❌ | ❌ | ❌ |
| SAVEDATA | ❌ | ❌ | — | ✅ | ❌ |
| CHARADATA | ❌ | ❌ | ✅ | — | ❌ |
| REF | ❌ | ❌ | ❌ | ❌ | — |

`SAVEDATA` and `CHARADATA` can be used together, meaning "character data that is saved with game data."

---

## REF — Reference Variables { #ref }

`REF` declares reference variables. Operating on a reference variable **actually operates on the target variable it references**.

### Array References

```erb
@PROCESS_ARRAY
#DIM REF L_ARR, 0            ; 1D array reference
    REPEAT VARSIZE("L_ARR")
        L_ARR:COUNT *= 2     ; Modifies the original passed-in array
    REND
RETURN

; Call site
#DIM DATA, 5 = 1, 2, 3, 4, 5
CALL PROCESS_ARRAY(DATA)
; After the call, DATA becomes 2, 4, 6, 8, 10
```

### REF Dimension Semantics

The number after `#DIM REF` is a **dimension placeholder**, not an array size. The number must be 0:

| Declaration | Comma count | Dimension | Actual size |
|-------------|------------|-----------|-------------|
| `#DIM REF X` | 0 | 1 | Determined by passed argument |
| `#DIM REF X, 0` | 1 | 1 | Determined by passed argument |
| `#DIM REF X, 0, 0` | 2 | 2 | Determined by passed argument |

```erb
; ✅ Correct: 0 is a dimension placeholder
#DIM REF L_1D, 0
#DIM REF L_2D, 0, 0

; ❌ Error: non-zero value causes "reference variable cannot specify array size"
; #DIM REF L_ARR, 10
```

### Element References

`#REF`/`#REFS`/`#REFF` declare element references (Dimension=0), binding to a specific index position of a target array variable:

```erb
@MODIFY_ELEM
#REF L_REF                   ; Integer element reference
    L_REF += 100             ; Modifies the original passed-in element
RETURN

; Call site
CALL MODIFY_ELEM(TALENT:0:23)
; TALENT:0:23 is modified
```

| Declaration | Type | Dimension | Reference granularity |
|-------------|------|-----------|----------------------|
| `#REF X` | Int | 0 | Single element |
| `#REFS X` | Str | 0 | Single element |
| `#REFF X` | Float | 0 | Single element |
| `#DIM REF X, 0` | Int | 1 | Entire array |
| `#DIMS REF X, 0` | Str | 1 | Entire array |
| `#DIMF REF X, 0` | Float | 1 | Entire array |

> **Terminology note**: Variables declared with `#REF` have Dimension=0. The source code class name is `ReferenceIntScalarToken`, where "Scalar" means **the reference variable itself is zero-dimensional (does not accept subscripts)**, not "references a scalar value". ERABASIC has no scalars — all variables are arrays, and `X` is shorthand for `X:0`. The binding semantics of `#REF` is "reference a specific index position of another array variable", implemented via `ElementRefInfo(TargetVar, Indices)`.

---

## OUT — Optional Reference Parameters

`OUT` is a special form of REF: it can be omitted at the call site. When omitted, reads and writes inside the function are silently ignored.

```erb
@DIVIDE(ARG:0, ARG:1)
#DIM OUT L_QUOTIENT           ; Optional integer OUT parameter
#DIM OUT L_REMAINDER          ; Optional integer OUT parameter
    L_QUOTIENT = ARG:0 / ARG:1
    L_REMAINDER = ARG:0 % ARG:1
RETURN

; Call 1: only need the quotient
CALL DIVIDE(17, 5)
PRINTVL RESULT                 ; 3 (RESULT from RETURN)

; Call 2: need both quotient and remainder
#DIM L_Q
#DIM L_R
CALL DIVIDE(17, 5, L_Q, L_R)
PRINTFORML Quotient={L_Q}, Remainder={L_R}   ; Quotient=3, Remainder=2
```

### OUT Behavior

| Call style | OUT parameter binding | Write inside function | Read inside function |
|-----------|----------------------|----------------------|---------------------|
| Variable passed | `ElementRefInfo` → references target variable | Writes to target variable | Reads from target variable |
| Omitted | `NullRefTerm` (black hole) | Writes are discarded | Reads return default value |

### OUT Constraints

- Forces `Dimension=0` (element reference)
- Dimension number in declaration is silently discarded
- Implies REF semantics; cannot be combined with REF
- Cannot be combined with CONST, GLOBAL, SAVEDATA, CHARADATA, or STATIC

```erb
; ✅ Correct
#DIM OUT L_OUT
#DIM OUT L_OUT2, 0           ; Equivalent (,0 is ignored)

; ⚠️ Number is ignored
#DIM OUT L_OUT3, 1           ; 1 is ignored, still Dimension=0
```

---

## Function Signature and Variable Declaration Relationship

ERABASIC has a unique relationship between function signatures and variable declarations — this is the most fundamental difference from mainstream languages.

### Signatures Reference, Bodies Declare

In mainstream languages, function signatures also declare parameters (`void f(int x)`). In ERABASIC, names in signatures are merely **references**; variables must be declared via `#DIM`:

```erb
@CALC(X, Y)
#DIM X                        ; ← Declares variable X
#DIM Y                        ; ← Declares variable Y
#FUNCTION
    RETURNF X * Y
```

If a variable referenced in the signature has no `#DIM` declaration, a parser error occurs.

### Named Parameters vs ARG Array { #arg }

Function parameters can be passed in two ways:

```erb
; Method 1: Using built-in ARG array
@FUNC(ARG:0, ARG:1)
    PRINTFORML {ARG:0} + {ARG:1} = {ARG:0 + ARG:1}
RETURN

; Method 2: Using named parameters (recommended)
@FUNC(L_A, L_B)
#DIM L_A
#DIM L_B
    PRINTFORML {L_A} + {L_B} = {L_A + L_B}
RETURN
```

**Named parameters and the ARG array are completely independent entities**:

```erb
@FUNC(L_VAL, ARG:2 = 0)
#DIM L_VAL
    ; L_VAL receives the first parameter value
    ; ARG:2 receives the third parameter value
    ; ARG:0 and ARG:1 are unaffected (independent entities)

    PRINTFORML L_VAL={L_VAL}, ARG:2={ARG:2}
    PRINTFORML ARG:0={ARG:0}, ARG:1={ARG:1}
RETURN

; Call: CALL FUNC(100, 200, 300)
; Output: L_VAL=100, ARG:2=300
; Output: ARG:0=0, ARG:1=0 (not assigned)
```

!!! danger "Named parameters are NOT aliases for ARG elements"

    ```erab
    ; ❌ Misconception: @FUNC(AMOUNT) means "AMOUNT is an alias for ARG:0"
    ; ✅ Correct: @FUNC(AMOUNT) means "the first parameter's value is written to the #DIM variable named AMOUNT"
    ```

    Named parameters and ARG[n] are completely independent. The parameter position in the function signature determines which variable receives the value, but does not automatically populate the ARG array.

### "Parameter Shadowing" Does Not Exist

Developers from C/Java/Python backgrounds often make a cognitive error: assuming that a `#DIM` declaration with the same name "shadows" a function parameter. **This is impossible in ERABASIC**.

```erb
@FUNC(AMOUNT)
#DIM DYNAMIC AMOUNT           ; ← Not "shadowing", but "creating the AMOUNT variable"
    IF AMOUNT == 0             ; ← Reads the variable created by #DIM
        ; ...
    ENDIF
RETURN
```

**Reason**: ERABASIC's identifier dictionary has only one lookup entry. Whether accessing `AMOUNT` from the signature or the function body, it resolves to the same `UserDefinedVariableToken`. There are no two separate entities — "parameter variable" and "private variable."

| Mainstream language (incorrect mental model) | ERABASIC actual behavior |
|---|---|
| `void f(int x) { int x = 0; }` → compile error or shadowing | `@F(X)` does not create a variable; `#DIM X` creates the sole variable |
| Parameter = function signature allocates storage | Parameter name = identifier reference, no storage |
| Local declaration creates a new variable | `#DIM` creates the variable **for the parameter name to use** |

---

## VARIADIC — Variable Arguments

The `VARIADIC` keyword declares a variable number of arguments. It can only modify the last parameter:

```erb
@SUM_ALL(VARIADIC ARG:0)
#DIM DYNAMIC L_TOTAL
    L_TOTAL = 0
    REPEAT ARGLEN()
        L_TOTAL += ARG:COUNT
    REND
    RESULT = L_TOTAL
RETURN

; Call site
CALL SUM_ALL(1, 2, 3, 4, 5)
PRINTVL RESULT                 ; 15
```

### VARIADIC Syntax

| Declaration | Type | Description |
|-------------|------|-------------|
| `VARIADIC ARG:0` | Int | Variable integer arguments |
| `VARIADIC ARGS:0` | Str | Variable string arguments |
| `VARIADIC ARGF:0` | Float | Variable float arguments (Skia addition) |

### Fixed + Variable Arguments

It is recommended to use private variables for fixed parameters and the ARG array for variable arguments:

```erb
@PROCESS(L_MODE, VARIADIC ARG:0)
#DIM L_MODE
    ; L_MODE receives the first fixed parameter
    ; ARG:0...ARG:(ARGLEN()-1) receive variable arguments
    PRINTFORML Mode={L_MODE}, ArgCount={ARGLEN()}
RETURN

; Call site
CALL PROCESS(1, 10, 20, 30)
; L_MODE=1, ARG:0=10, ARG:1=20, ARG:2=30, ARGLEN()=3
```

!!! warning "VARIADIC Constraints"

    - Can only modify the last parameter
    - Type must be one of ARG/ARGS/ARGF
    - The same ARG type cannot appear in both fixed and variable parameters
    - `#DIM VARIADIC` does not exist — VARIADIC is a function parameter declaration keyword, not a #DIM modifier
    - `ARGLEN()` is a function and must be called with parentheses

---

## #LOCALSIZE — Local Variable Size

`#LOCALSIZE`/`#LOCALSSIZE`/`#LOCALFSIZE` specify the size of the LOCAL/LOCALS/LOCALF arrays:

!!! warning "LOCAL/LOCALS are obsolete"

    `LOCAL` and `LOCALS` are legacy designs and not recommended. Use `#DIM`/`#DIMS` private variable declarations instead.
    For new game development, it is recommended to set both `LOCAL` and `LOCALS` element counts to `-1` in `VariableSize.csv` to disable them, forcing migration to `#DIM`/`#DIMS`.

```erb
@MY_FUNC
#LOCALSIZE 100              ; LOCAL array size is 100
#LOCALSSIZE 50              ; LOCALS array size is 50
#LOCALFSIZE 10              ; LOCALF array size is 10 (Skia addition)
```

!!! info "No effect in event functions"

    Specifying `#LOCALSIZE` etc. in event functions is ignored because event functions can have multiple definitions, and the LOCAL variable size is determined by the maximum value across all definitions.

---

## Variable Naming Prohibitions

| Prohibited | Reason | Correct alternative |
|-----------|--------|-------------------|
| `A` ~ `Z` (26 letters) | Engine built-in general-purpose variables | `L_A`, `L_COUNT` |
| `DAY`, `MONEY`, `TIME` | System state variables | `L_DAY`, `L_MONEY` |
| `TARGET`, `ASSI`, `MASTER` | Character index variables | `L_TARGET` |
| `LOCAL`, `ARG`, `GLOBAL` | Engine extended variables (LOCAL/LOCALS obsolete) | `L_LOCAL`, `L_ARG`, or use `#DIM`/`#DIMS` |
| `REF`, `OUT` | #DIM modifier keywords | `_ref`, `_out`, `L_OUT` |
| Same name as instructions | e.g., `PRINTFORM`, `CALL`, `RETURN` | Add prefix |

---

## Modifier Mutual Exclusion Master Table

| | CONST | DYNAMIC | STATIC | GLOBAL | SAVEDATA | CHARADATA | REF | OUT |
|---|---|---|---|---|---|---|---|---|
| CONST | — | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| DYNAMIC | ❌ | — | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| STATIC | ❌ | ❌ | — | — | — | — | ❌ | ❌ |
| GLOBAL | ❌ | ❌ | — | — | ❌ | ❌ | ❌ | — |
| SAVEDATA | ❌ | ❌ | — | ❌ | — | ✅ | ❌ | — |
| CHARADATA | ❌ | ❌ | — | ❌ | ✅ | — | ❌ | — |
| REF | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | ❌ |
| OUT | ❌ | ❌ | ❌ | — | — | — | ❌ | — |

- `SAVEDATA` + `CHARADATA` can be used together
- `STATIC` + `GLOBAL`/`SAVEDATA`/`CHARADATA` combinations are theoretically possible in ERH but have little practical significance
- `OUT` implies REF and cannot be combined with REF

---

## Anti-Pattern Summary

### Declaration Anti-Patterns

| Incorrect | Reason | Correct |
|-----------|--------|---------|
| `DIM X, 10` | `#DIM` is a preprocessor directive; `#` cannot be omitted | `#DIM X, 10` |
| `#DIM A` | A~Z are engine built-in variables | `#DIM L_A` |
| `#DIM OUT B, 1` | OUT forces Dimension=0; number is ignored | `#DIM OUT B` |
| `#DIM REF X, 10` | REF number must be 0 | `#DIM REF X, 0` |
| `#DIM DYNAMIC out` | `out` is a reserved keyword | `#DIM DYNAMIC _out` |
| `#DIM MAT, 5, 5 = 1, 2` | Multi-dimensional arrays do not support inline initialization | Assign element by element |
| `#DIM VARIADIC X` | `#DIM VARIADIC` does not exist | `@FUNC(VARIADIC ARG:0)` |

### Scope Anti-Patterns

| Misconception | Correct understanding |
|--------------|----------------------|
| "LOCAL is a true local variable" | LOCAL is stored per function name; different functions have independent arrays, but recursive calls to the same function share the same array (original engine) |
| "Private variable = local variable" | Private variables are function-level registrations; LOCAL is a built-in variable stored per function name |
| "Private variables disappear after function return" | Non-DYNAMIC private variables retain their data |
| "DYNAMIC variables are the same as LOCAL" | DYNAMIC is allocated on call and released on return; LOCAL is never released |
| "Writing L_val in the signature declares it" | The signature is only a reference; must use `#DIM` to declare |
| "Named parameters are aliases for ARG[n]" | Named parameters and the ARG array are completely independent entities |

---

## Next Steps

| What you want to learn | Go to |
|:---|:---|
| Three-type system and type conversion | [Values, Types & Variables](values-types.en.md) |
| Assignment statement details | [Assignment Statements](assignment.en.md) |
| Function definition and invocation | [Functions & CALL](call.en.md) |
| ERH global variable declarations | [Header Files ERH](../Emuera/ERH.en.md) |
| User-defined variable specification | [User-Defined Variables](../Emuera/user_defined_variables.en.md) |
