# Functions & CALL

!!! info "Corresponding Manual Sections"

    - [CALL](../Reference/CALL.en.md) — CALL instruction API reference
    - [JUMP](../Reference/JUMP.en.md) — JUMP instruction API reference
    - [RETURN](../Reference/RETURN.en.md) — RETURN instruction API reference
    - [INPUT](../Reference/INPUT.en.md) — INPUT instruction API reference
    - [Function Definition](../Emuera/function.en.md) — Function specification
    - [User-Defined Variables](../Emuera/user_defined_variables.en.md) — #DIM declaration specification

---

## Overview

ERABASIC programs consist of **functions**. Each function starts with an `@` label and can be called with `CALL`. Functions are the basic unit of code organization — every line of code you write belongs to some function.

| Concept | Description |
|------|------|
| `@label` | Defines the function entry point |
| `CALL` | Calls a function, returns after execution |
| `JUMP` | Jumps to a function, does not return |
| `RETURN` | Returns from function, sets RESULT |
| `RETURNF` | Returns a value from an expression function |

!!! note "eramaker Compatibility"
    `@label`/`CALL`/`JUMP`/`RETURN` have existed since eramaker. `RETURNF`, `TRYCALL`/`TRYJUMP`, `#FUNCTION`/`#FUNCTIONS`, etc. are Emuera extensions.

---

## @ Label — Define Function

Lines starting with `@` define a function:

```erb
@MY_FUNC
    PRINTL This is my function
RETURN
```

### Function Naming Rules

- Starts with `@`, followed by the function name
- Function name must be unique across the entire project
- Function names are case-sensitive
- Function names can only contain letters, numbers, and underscores

### Function Execution

Functions only execute when called by `CALL` or `JUMP`. The engine automatically calls some functions at specific times (e.g., `@SYSTEM_TITLE`, `@EVENTFIRST`, etc.), see [Event Functions](event-functions.en.md).

---

## CALL — Call Function

`CALL` calls the specified function and returns to the line after `CALL` when it finishes:

```erb
@SYSTEM_TITLE
    CALL GREETING
    PRINTL Returned
    WAIT

@GREETING
    PRINTL Hello!
RETURN
; Output:
; Hello!
; Returned
```

### CALL Parameter Passing

`CALL` can pass parameters to a function, which receives them through `ARG`, `ARGS`, `ARGF`:

```erb
@SYSTEM_TITLE
    CALL SHOW_DAMAGE 100, 50
    WAIT

@SHOW_DAMAGE, ARG, ARG
    PRINTFORML Physical damage: {ARG:0}, Magic damage: {ARG:1}
    PRINTFORML Total damage: {ARG:0 + ARG:1}
RETURN
; Output:
; Physical damage: 100, Magic damage: 50
; Total damage: 150
```

| Parameter variable | Type | Description |
|---------|------|------|
| `ARG` | Integer | Receives integer parameters, `ARG:0`, `ARG:1`... |
| `ARGS` | String | Receives string parameters, `ARGS:0`, `ARGS:1`... |
| `ARGF` | Float | Receives float parameters (Skia variant), `ARGF:0`, `ARGF:1`... |

### Two Ways to Declare Parameters

**Method 1: Declare parameter types in signature** (recommended)

```erb
@SHOW_DAMAGE, ARG, ARG
; Signature declares two integer parameters
; ARG:0 = first parameter, ARG:1 = second parameter
```

**Method 2: #DIM to declare parameter variables**

```erb
@SHOW_DAMAGE
#DIM ARG
#DIM ARG, 2
; Declared inside function body, less intuitive than signature method
```

### String Parameters

```erb
@SYSTEM_TITLE
    CALL GREET "Elina"
    WAIT

@GREET, ARGS
    PRINTFORML Hello, %ARGS:0%!
RETURN
; Output: Hello, Elina!
```

### Mixed Parameters

```erb
@SHOW_INFO, ARGS, ARG, ARG
; ARGS:0 = name, ARG:0 = level, ARG:1 = HP
    PRINTFORML %ARGS:0% Lv.{ARG:0} HP:{ARG:1}
RETURN
```

---

## RETURN — Return from Function

`RETURN` ends the current function and returns to the caller:

```erb
@MY_FUNC
    PRINTL Executing
    RETURN              ; Return to caller
    PRINTL Never executes     ; Code after RETURN doesn't execute
```

### RETURN Sets RESULT

`RETURN`'s parameter is stored in `RESULT`:

```erb
@SYSTEM_TITLE
    CALL GET_ANSWER
    PRINTFORML The answer is {RESULT}
    WAIT

@GET_ANSWER
    RETURN 42
; Output: The answer is 42
```

### Multiple Return Values

`RETURN` can return multiple values, stored sequentially in `RESULT:0`, `RESULT:1`...:

```erb
@SYSTEM_TITLE
    CALL GET_COORDS
    PRINTFORML X={RESULT:0} Y={RESULT:1}
    WAIT

@GET_COORDS
    RETURN 10, 20
; Output: X=10 Y=20
```

### Function Without RETURN

If a function reaches the end without `RETURN`, `RESULT` is set to `0`:

```erb
@NO_RETURN
    PRINTL No RETURN
; When function ends, RESULT = 0
```

### RETURN Always Overwrites RESULT

`RETURN` **always** overwrites `RESULT`. Even if you manually assign a value to `RESULT` in the function, `RETURN` will overwrite it when executed:

```erb
@MY_FUNC
    RESULT = 999
    RETURN 1
    ; Caller's RESULT is 1, not 999
```

The end of a function also implicitly overwrites — without `RETURN`, `RESULT:0` is set to `0`.

### RETURNF Does Not Overwrite RESULT

Expression functions declared with `#FUNCTION` use `RETURNF` to return values. `RETURNF` **does not overwrite RESULT**, and the function end doesn't implicitly assign either:

```erb
@MY_EXPR_FUNC
#FUNCTION
    RESULT = 999
    RETURNF 1
    ; Caller's RESULT is still 999 (RETURNF doesn't touch RESULT)
```

| Function Type | Return Keyword | Overwrites RESULT? | RESULT at Function End |
|---------|-----------|:---:|:---:|
| Command-style (default) | `RETURN` | ✅ Overwrites | Implicit `RESULT:0 = 0` |
| Expression-style (`#FUNCTION`) | `RETURNF` | ❌ Does not overwrite | Not modified |

### RETURNFORM — FORM Syntax Dynamic Evaluation Return

`RETURNFORM` is a dynamic evaluation variant of `RETURN`. It first expands the string via FORM syntax, then **re-parses the expanded result as an integer expression**, finally writing to `RESULT`.

```erb
@MY_FUNC
    #DIMS L_EXPR '= "A * 10"
    RETURNFORM %L_EXPR%
; Execution: FORM expand → "A * 10" → lexical analysis + integer expression evaluation → write to RESULT
; Equivalent to RETURN A * 10
```

!!! warning "% in RETURNFORM is a string substitution operator"

    In `RETURNFORM`, `%` is the FORM syntax string substitution operator, not the modulo operator.
    `RETURNFORM A % 100` is parsed as `A ` + the value of variable `100`, not `A mod 100`.

!!! info "RETURNFORM returns an integer, not a string"

    `RETURNFORM` evaluation has two stages:
    
    1. **FORM expansion**: Replace `%variable%` and `{expression}` with actual values, producing a string
    2. **Re-parsing**: Lexically analyze and evaluate the expanded string as an **integer expression**
    
    The final result is written to `RESULT` (integer array). There is no `RETURNSFORM` instruction — to return a string, use `RESULTS = ...` followed by `RETURN`.
    
    This means RETURNFORM is essentially a **restricted dynamic evaluation** mechanism: parameters exist as FORM strings at compile time, and are expanded then re-parsed as integer expressions at runtime. Modern ERABASIC provides the more general `EVAL`/`EVALS`/`EVALF` expression functions for full dynamic evaluation.

---

## JUMP — Jump to Function

`JUMP` jumps to another function and **does not return**:

```erb
@SYSTEM_TITLE
    CALL AAA
    PRINTW Returned to SYSTEM_TITLE

@AAA
    PRINTL In AAA
    JUMP BBB           ; Jump to BBB, doesn't return to AAA
    PRINTL Never executes     ; Code after JUMP doesn't execute

@BBB
    PRINTL In BBB
    RETURN              ; Returns to AAA's caller (SYSTEM_TITLE)
; Output:
; In AAA
; In BBB
; Returned to SYSTEM_TITLE
```

### CALL vs JUMP

| | `CALL` | `JUMP` |
|------|:---:|:---:|
| Returns? | ✅ Returns to caller | ❌ Does not return |
| Call stack | Pushed onto stack | Not pushed onto stack |
| Typical use | Call sub-function | Function-to-function jump (tail call optimization) |

!!! warning "JUMP call stack risk"

    `JUMP` doesn't push onto the call stack. If the entire call chain uses `JUMP`, the final `RETURN` may not find a return target, causing an error.

### JUMP and RESULT

`RETURN` in the JUMP target function sets `RESULT` normally. JUMP only replaces the stack frame and doesn't affect `RETURN`'s behavior of setting `RESULT`.

When the JUMP target function ends, the engine detects the `IsJump` flag and **recursively unwinds stack frames** back to the original non-JUMP caller (e.g., `CALL`). JUMP chains also correctly propagate RESULT:

```erb
@SYSTEM_TITLE
    CALL AAA
    PRINTVL RESULT    ; 42

@AAA
    JUMP BBB          ; AAA is replaced by BBB

@BBB
    RETURN 42         ; RESULT = 42, recursively unwinds to SYSTEM_TITLE
```

---

## CALLF — Expression Function Call

`CALLF` calls an **expression function** (declared with `#FUNCTION`) and can use the return value in expressions:

```erb
@SYSTEM_TITLE
    #DIM L_RESULT
    L_RESULT = IS_VALID(100)
    PRINTFORML Result={L_RESULT}
    WAIT

@IS_VALID, ARG
#FUNCTION
    IF ARG > 0 && ARG < 1000
        RETURNF 1
    ELSE
        RETURNF 0
    ENDIF
```

Functions declared with `#FUNCTION` use `RETURNF` to return values (instead of `RETURN`) and can be called directly in expressions.

> For detailed explanation of expression functions, see [Command vs Expression](command-vs-expression.en.md).

---

## INPUT — Wait for Player Input

`INPUT` pauses program execution, waits for player input, and stores the result in `RESULT`:

```erb
@SYSTEM_TITLE
    PRINTL Enter a number:
    INPUT
    PRINTFORML You entered {RESULT}
    WAIT
```

### INPUT Default Value

```erb
INPUT 0          ; If no input, RESULT = 0
INPUT 100        ; If no input, RESULT = 100
```

### INPUTS — String Input

`INPUTS` waits for string input, storing the result in `RESULTS`:

```erb
PRINTL Enter your name:
INPUTS
PRINTFORML Hello, %RESULTS%!
```

### INPUT and RESULT

Both `INPUT` and `CALL` modify `RESULT`. If you need to use `INPUT`'s result after a `CALL`, save it first:

```erb
INPUT
#DIM L_INPUT = RESULT       ; Save input value
CALL SOME_FUNC              ; RESULT gets overwritten
PRINTFORML Input value={L_INPUT}  ; Use saved value
```

### INPUT and Button Interaction

You've already seen `[N]` buttons working with `INPUT` in [Hello World](hello-world.en.md). Here are key details:

**Type matching**: `INPUT` can only click integer buttons (`[0]`, `[1]`, etc.), `INPUTS` can only click string buttons. Type mismatches make buttons unclickable.

```erb
; INPUT + integer buttons (common)
PRINTL [0] Start
PRINTL [1] Exit
INPUT                        ; Click [0] → RESULT=0

; INPUTS + string buttons
PRINTBUTTON "[HogeHoge] ", "HogeHoge"
PRINTBUTTON "[PugePuge] ", "PugePuge"
INPUTS                       ; Click → RESULTS="HogeHoge"
```

**Buttons only activate during INPUT wait**: `PRINTL [0]` creates a button, but it only becomes clickable when execution reaches `INPUT`. Button clicks before that are ignored.

**Old buttons expire**: After each `INPUT`, previous buttons automatically expire (cannot be clicked again); only new buttons can be selected.

---

## Variable Declarations Inside Functions

Use `#DIM`/`#DIMS`/`#DIMF` inside functions to declare private variables, visible only within the current function:

```erb
@MY_FUNC
#DIM L_COUNT                ; Private integer variable
#DIMS L_NAME '= "Default"   ; Private string variable
#DIMF L_RATE = 0.5          ; Private float variable (Skia variant)

    FOR L_COUNT, 0, 10
        PRINTFORML %L_NAME%: {L_COUNT}
    NEXT
RETURN
```

!!! warning "#DIM must be after @ label line and before executable statements"

    `#DIM` and other preprocessor lines must be written at the beginning of the function, not after executable statements. Multiple `#` lines can appear consecutively.

> For complete variable declaration documentation, see [Values, Types & Variables](values-types.en.md) and [Variable Declaration System](../Emuera/user_defined_variables.en.md).

---

## Common Pitfalls

| Pitfall | Wrong | Correct | Reason |
|------|---------|---------|------|
| Using RESULT after CALL | Using `RESULT` directly after `CALL F` | Save `RESULT` first | Subsequent operations may overwrite RESULT |
| Writing code after JUMP | Writing logic after `JUMP F` | Don't write code after JUMP | JUMP doesn't return, code after it doesn't execute |
| #DIM in wrong position | `#DIM` after executable statements | After `@` label line | #DIM is a preprocessor line |
| RETURNFORM modulo | `RETURNFORM A % 100` | `RETURN A % 100` | % in RETURNFORM is a substitution operator |
| Function name conflict | Two `@MY_FUNC` | Function names must be unique | Function names cannot be duplicated in a project |
| Forgetting RETURN | No RETURN at function end | Add `RETURN` | Without RETURN, RESULT = 0 |
| Manual RESULT then RETURN | `RESULT = 999` then `RETURN 1` | Don't manually set RESULT | RETURN always overwrites RESULT |
| Assuming JUMP doesn't set RESULT | Thinking RESULT unchanged after JUMP | JUMP target's RETURN sets RESULT normally | JUMP replaces stack frame but doesn't affect RESULT setting |
| INPUT with string buttons | `INPUT` + `PRINTBUTTON "x", "str"` | Use `INPUTS` instead | INPUT can only click integer buttons |

---

## Next Steps

| What you want to learn | Go to |
|:---|:---|
| Values, types & variables | [Values, Types & Variables](values-types.en.md) |
| Variable declaration system (REF/OUT/VARIADIC) | [Variable Declaration System](variable-declaration.en.md) |
| Conditional branching | [Conditional Branching](condition.en.md) |
| Loops | [Loops](loop.en.md) |
| Event functions | [Event Functions](event-functions.en.md) |
| Command vs expression | [Command vs Expression](command-vs-expression.en.md) |
| CALL complete API | [CALL](../Reference/CALL.en.md) |
| RETURN complete API | [RETURN](../Reference/RETURN.en.md) |
