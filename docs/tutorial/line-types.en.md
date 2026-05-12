# Line Types & Structure

!!! info "Corresponding Manual Sections"

    - [Functions & Preprocessor](../Emuera/function.en.md) — Complete specification for functions and preprocessor lines
    - [User-Defined Variables](../Emuera/user_defined_variables.en.md) — Complete specification for #DIM declarations

---

## Four Line Types

ERABASIC is a **line-driven** language — the engine parses line by line, and each line belongs to one of four types:

| Line Type | Identifier | C# Class | Description |
|--------|------|-------|------|
| **Function label line** | `@FUNC_NAME` | `FunctionLabelLine` | Function entry point, defines function name and parameters |
| **Preprocessor line** | `#DIM` / `#FUNCTION` etc. | Sub-information of `FunctionLabelLine` | Declares variables, marks function type |
| **Instruction line** | `PRINT` / `CALL` / `A = 1` etc. | `InstructionLine` | Executes instructions |
| **Goto label line** | `$LABEL_NAME` | `GotoLabelLine` | Jump target |
| **Blank/Comment line** | `;` at start or empty line | `NullLine` | Ignored |

---

## Function Label Line (@ Line)

Function label lines start with `@` and define the function's name and parameters:

```erb
@MY_FUNC(ARG:0, ARG:1)
@GREET(ARGS:0)
@CALC(X, Y)
@EVENT_TRAIN
```

### Components of a Function Label Line

```
@FUNCTION_NAME(PARAM1, PARAM2, ...)
↑  ↑           ↑       ↑
│  │           │       └── Parameter list (comma-separated)
│  │           └────────── Function name
│  └────────────────────── @ prefix (required)
└───────────────────────── Function label line identifier
```

### Parameter Notation

| Parameter notation | Meaning | #DIM declaration required? |
|---------|------|-------------------|
| `ARG:0` | Built-in integer parameter | Not required (built-in) |
| `ARGS:0` | Built-in string parameter | Not required (built-in) |
| `ARGF:0` | Built-in float parameter | Not required (built-in) |
| `X` | Private variable parameter | **Required** `#DIM X` |
| `VARIADIC ARG:0` | Variadic integer parameter | Not required (built-in) |

---

## Preprocessor Line (# Line)

Preprocessor lines start with `#` and must be placed after the `@` function label line and before the first instruction line. Multiple `#` lines can appear consecutively in any order. Blank lines and comment lines (`;`) do not affect the `#` line sequence.

### Position Rules

```erb
@MY_FUNC(ARG:0, ARG:1)     ← @ label line
#DIM L_TEMP, 10             ← #DIM declaration (after @ line)
; This is a comment (does not affect the # line sequence)
#FUNCTION                    ← #FUNCTION declaration (still valid after comment)
    PRINTL Start             ← First instruction (# lines must be before this)
    L_TEMP:0 = ARG:0 + ARG:1
RETURN L_TEMP:0
```

!!! danger "# line position errors are the most common compilation warning"

    ```erb
    ; ❌ Wrong: #DIM appears in the middle of the function body
    @MY_FUNC
        PRINTL Start
        #DIM X, 10        ; → Warning: "# lines can only be used immediately after function declaration"

    ; ✅ Correct: All # lines after @ line, before executable statements
    @CALC(X, Y)
    #FUNCTION
    ; This is a comment (does not affect the # line sequence)
    #DIM X
    #DIM Y
        RETURNF X * Y
    ```

### Preprocessor Directive Categories

| Directive | Purpose | Scope |
|------|------|--------|
| `#DIM` | Declare integer private variable | Within function |
| `#DIMS` | Declare string private variable | Within function |
| `#DIMF` | Declare float private variable | Within function |
| `#REF` / `#REFS` / `#REFF` | Declare scalar reference | Within function |
| `#FUNCTION` / `#FUNCTIONS` / `#FUNCTIONF` | Mark expression function type | Function-level |
| `#LOCALSIZE` / `#LOCALSSIZE` / `#LOCALFSIZE` | Set LOCAL array size | Function-level |
| `#PRI` / `#LATER` / `#SINGLE` / `#ONLY` | Event function priority modifier | Event function |

---

## Instruction Line

Instruction lines are the body of a function, performing actual operations.

### Types of Instruction Lines

| Type | Example | Description |
|------|------|------|
| Output instruction | `PRINTL Hello` | Output text |
| Input instruction | `INPUT` | Wait for user input |
| Assignment statement | `X = 10` | Assign value to variable |
| Function call | `CALL MY_FUNC(1, 2)` | Call function |
| Control flow | `IF` / `FOR` / `REPEAT` | Conditions and loops |
| Return | `RETURN` / `RETURNF` | Function return |

!!! warning "Command syntax vs expression syntax"

    In instruction lines, the function name **must be immediately followed by a space or tab**. The `FUNC(args)` parenthesized syntax **cannot** be used as a standalone instruction line; it can only be used within expressions (e.g., `X = FUNC(args)` or `IF FUNC(args) > 0`).

    ```erb
    ; ✅ Command syntax (space-separated)
    STRLEN "hello"

    ; ❌ Parenthesized syntax as standalone command → Parse failure!
    STRLEN("hello")
    ```

    See [Command vs Expression](command-vs-expression.en.md) for details.

### Assignment Operators

```erb
; Integer/Float assignment
X = 10                    ; Basic assignment
X += 5                    ; Addition assignment
X -= 3                    ; Subtraction assignment
X *= 2                    ; Multiplication assignment
X /= 4                    ; Division assignment
X ++                      ; Increment
X --                      ; Decrement

; String assignment
S = Hello %NAME%          ; Formatted string (%variable% string substitution)
S '= "Hello"              ; Expression evaluation (no interpolation)
S += " World"             ; String concatenation
```

!!! warning "String assignment: = and '= have different meanings"

    | Operator | Meaning | Example |
    |--------|------|------|
    | `=` | Formatted string (`%variable%` string substitution, `{variable}` numeric interpolation) | `S = Hello %NAME%` → `Hello Elina` |
    | `'= ` | Expression evaluation (no interpolation) | `S '= "Hello %NAME%"` → `Hello %NAME%` |

### Comments

```erb
; This is a comment (line starts with ;)

; ✅ End-of-line comments: preprocessor statements, conditional control statements, general instruction statements
#DIM L_COUNT, 10      ; Declare local array
#FUNCTION              ; Mark as expression function
SIF RESULT == 0        ; Skip when result is zero
    RETURN 0
CALL MY_FUNC           ; Call function
LOCAL = 10 + 20        ; Assignment expression

; ❌ PRINT series instructions do not support end-of-line comments
; PRINTL treats everything after ; as part of the string
PRINTL Hello    ; This is not a comment
; Output: Hello    ; This is not a comment
```

!!! warning "eramaker's comment limitation"

    In eramaker, end-of-line comments are not allowed (content after `;` is treated as an instruction to execute).
    Emuera relaxed this limitation — content after end-of-line `;` is ignored — but **PRINT series instructions are an exception**; they treat the remaining content on the line as a string parameter, and `;` is printed literally.

---

## Goto Label Line ($ Line)

Goto label lines start with `$` and serve as jump targets for the `GOTO` instruction:

```erb
@MY_FUNC
$LOOP_START
    PRINTL Continue?
    INPUT
    SIF RESULT == 0
        GOTO LOOP_START
RETURN
```

!!! tip "Minimize GOTO usage"

    ERABASIC provides structured control flow with IF/SELECTCASE/FOR/REPEAT/WHILE etc.
    In most cases, GOTO is unnecessary. GOTO is mainly used for backward compatibility with old code.

---

## Line Structure Overview

A complete function consists of these four line types in a fixed order:

```erb
@MY_FUNC(ARG:0, ARG:1)       ← 1. @ label line (function entry)
#DIM L_TEMP, 10               ← 2. # preprocessor line (declaration, after @ line)
#FUNCTION                      ← 2. # preprocessor line (mark type)
    L_TEMP:0 = ARG:0 + ARG:1  ← 3. Instruction line (execution)
    IF L_TEMP:0 > 10          ← 3. Instruction line (control flow)
        PRINTL Greater than 10 ← 3. Instruction line
    ENDIF                      ← 3. Instruction line
$RETRY                         ← 4. $ Goto label line
    RETURNF L_TEMP:0           ← 3. Instruction line (return)
```

---

## Next Steps

| What you want to learn | Go to |
|:---|:---|
| Declaration system details | [Declaration System](variable-declaration.en.md) |
| Control flow | [IF](../Reference/IF.en.md) / [SELECTCASE](../Reference/SELECTCASE.en.md) / [REPEAT](../Reference/REPEAT.en.md) |
