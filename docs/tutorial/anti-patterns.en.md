# Chapter 7: Anti-Patterns and Common Mistakes

!!! info "Prerequisites"

    - **Reference Category**: [Functions (CALL, etc.)](../Reference/README.en.md#function-call) / [Variable Operations](../Reference/README.en.md#variable-operations)
    - [Functions and CALL](call.en.md) — Function call mechanism, RETURN/RETURNF
    - [FORM Syntax](form-syntax.en.md) — `%variable%`, `{expression}` expansion rules
    - [Command vs Expression](command-vs-expression.en.md) — Two evaluation paths
    - [Runtime Mechanics](runtime-mechanics.en.md) — Three-stage pipeline, REF variable lifecycle
    - [Variable Declaration System](variable-declaration.en.md) — REF/OUT, #DIM, scope

!!! tip "Key Points"

    - The most common mistakes in ERABASIC stem from variable scope misunderstandings, FORM syntax misuse, and REF/OUT confusion
    - Code that "runs but doesn't behave as intended" is more dangerous than code that "errors and stops"
    - Each anti-pattern has a clear cause and can be avoided with correct understanding

---

## 7.1 Variable Scope Misunderstandings

### ❌ Anti-Pattern: Assuming LOCAL is truly local

```erb
@FUNC_A
#DIM LOCAL, 10
LOCAL:0 = 42
CALL FUNC_B
PRINTVL LOCAL:0      ; ← Expecting 42...
```

`LOCAL` is not a per-function independent array, but a **variable on the function stack**. After `CALL FUNC_B`, `LOCAL:0` is still 42, but only if `FUNC_B` doesn't use the same `LOCAL` name.

!!! warning "The True Meaning of LOCAL"

    `LOCAL`/`LOCALS` are reserved variable names where each function has its own instance. But `#DIM`-declared variables and `LOCAL` are different things:

    ```erb
    @FUNC_A
    #DIM LOCAL, 10       ; ← This declares LOCAL:0〜9
    LOCAL:0 = 42         ; ← Assigns 42 to LOCAL:0
    ; After jumping to FUNC_B, FUNC_A's LOCAL:0 is preserved

    @FUNC_B
    #DIM LOCAL, 10       ; ← This is FUNC_B's own LOCAL
    LOCAL:0 = 99         ; ← FUNC_B's LOCAL:0, doesn't affect FUNC_A
    ```

### ❌ Anti-Pattern: Not understanding the difference between DYNAMIC and STATIC

```erb
@COUNTER
#DIM DYNAMIC COUNT     ; ← Reset to 0 on every call
#DIM STATIC TOTAL      ; ← Value persists across calls

COUNT += 1
TOTAL += 1

PRINTVL COUNT          ; Always 1
PRINTVL TOTAL          ; Increments with each call
```

| Modifier | Reset Timing | Use Case |
|----------|-------------|----------|
| None (default) | Per function call | Normal local variables |
| `DYNAMIC` | Per function call | Explicit local (affects ScopeIn for REF) |
| `STATIC` | Never | Cross-call counters/caches |
| `GLOBAL` | Persists across saves | Cross-save settings |

---

## 7.2 Parameter Shadowing Illusion

### ❌ Anti-Pattern: Formal parameter name colliding with global variable name

```erb
@FUNC
#DIM MONEY             ; ← Formal parameter MONEY (local)
; Inside this function, MONEY is a local variable
; It's separate from the global MONEY (player's money)

MONEY = 100            ; ← Modifies the local MONEY
; The caller's money MONEY is NOT modified!
```

In ERABASIC, variables declared with `#DIM` have local scope within the function. Declaring a `#DIM` variable with the same name as a global variable causes the local variable to take precedence (shadowing).

!!! danger "Most Dangerous Pattern"

    ```erb
    @PROCESS_MONEY
    #DIM MONEY         ; ← Local variable with same name as money!
    MONEY = 0          ; ← Thought you zeroed the money, but only zeroed the local
    ```

    **Solution**: Use prefixes or clear names for formal parameters:

    ```erb
    @PROCESS_MONEY
    #DIM L_MONEY       ; ← Distinguish with prefix
    ; or
    #DIM AMOUNT        ; ← Use a name with different meaning
    ```

---

## 7.3 FORM Syntax Misuse

### ❌ Anti-Pattern: Using `{string_variable}`

```erb
#DIMS NAME = "Test"
PRINTFORML Name: {NAME}       ; ← ❌ Error! {expression} only evaluates integer expressions
```

FORM syntax `{expression}` evaluates **integer expressions** and converts them to strings. Wrapping string variables in `{}` causes an error.

!!! tip "Correct Usage"

    ```erb
    ; String variables use %variable% expansion
    PRINTFORML Name: %NAME%

    ; Integer variables use {expression} expansion
    #DIM COUNT = 5
    PRINTFORML Count: {COUNT}
    PRINTFORML Calculation: {COUNT * 2 + 1}
    ```

### ❌ Anti-Pattern: Expecting side effects inside FORM

```erb
PRINTFORML Result: %CALL_FUNC()%    ; ← ❌ CALL is a command, cannot be used in expressions
```

`%variable%` evaluates a **string expression**. `CALL` is a command and cannot be used inside expressions.

!!! tip "Correct Usage"

    ```erb
    ; Execute side effects first
    CALL FUNC
    PRINTFORML Result: %RESULTS%

    ; Or use expression functions
    PRINTFORML Result: %FUNC_EXPR()%    ; ← OK if defined with #FUNCTIONS
    ```

### ❌ Anti-Pattern: Unintended triple-symbol expansion

```erb
PRINTFORML ===Complete===    ; ← ❌ === expands to CALLNAME:PLAYER!
```

In FORM syntax, `***`, `+++`, `===`, `///`, `$$$` are expanded as triple symbols:

| Triple Symbol | Expands To |
|--------------|-----------|
| `***` | `NAME:TARGET` |
| `+++` | `CALLNAME:MASTER` |
| `===` | `CALLNAME:PLAYER` |
| `///` | `NAME:ASSI` |
| `$$$` | `CALLNAME:TARGET` |

!!! tip "Workaround"

    ```erb
    ; When you want to output the string directly, don't use FORM syntax
    PRINTL ===Complete===       ; ← PRINTL doesn't do FORM expansion, so it's safe

    ; Or avoid using triple symbols in your text
    ```

---

## 7.4 REF/OUT Confusion

### ❌ Anti-Pattern: Thinking REF and OUT are the same thing

```erb
@FUNC
#DIM REF X, 0         ; ← REF: receives reference (cannot be omitted)
#DIM OUT Y, 0         ; ← OUT: receives output target (can be omitted)
```

| Attribute | REF | OUT |
|-----------|-----|-----|
| Omission | ❌ Not allowed | ✅ Allowed (binds to NullRefTerm) |
| Setting value before call | Meaningless (overwritten by reference source) | Meaningless (set inside function) |
| Purpose | Reference existing data as input | Write results as output |
| Dimension | Per declaration (0=scalar, 0,0=2D) | Always 0 (scalar only) |

### ❌ Anti-Pattern: Wrong OUT parameter omission order

```erb
@FUNC
#DIM OUT A, 0
#DIM OUT B, 0
#DIM OUT C, 0

; ❌ Want to omit B, but syntactically becomes (A, C)
;    C gets bound to B's position
CALL FUNC(RESULT_A, RESULT_C)
```

OUT parameters are bound in **declaration order**. Omitting a middle parameter causes all subsequent parameters to shift.

!!! tip "Correct Design"

    ```erb
    ; Declare parameters that may be omitted last
    @FUNC
    #DIM OUT A, 0         ; Required
    #DIM OUT B, 0         ; Required
    #DIM OUT C, 0         ; Optional (declared last)

    CALL FUNC(RESULT_A, RESULT_B)    ; C can be omitted
    ```

### ❌ Anti-Pattern: Wrong dimension declaration for REF variables

```erb
@FUNC
#DIM REF X, 10        ; ← ❌ Error! Cannot specify size for REF variables
#DIM REF Y, 0         ; ← ✅ 0 is a dimension placeholder (1D reference)
#DIM REF Z, 0, 0      ; ← ✅ 2D reference
```

The numbers in `#DIM REF` are **dimension placeholders**, not array sizes. Specifying non-zero values causes an error.

---

## 7.5 Command vs Expression Boundary Misunderstanding

### ❌ Anti-Pattern: Using commands inside expressions

```erb
X = CALL FUNC()       ; ← ❌ CALL is a command, cannot be used in expressions
X = PRINTL "hello"    ; ← ❌ PRINTL is a command
```

ERABASIC has two evaluation paths: **command path** and **expression path**. Commands cannot be used in expressions, and expression functions cannot be used as commands.

!!! tip "Correct Distinction"

    ```erb
    ; Command path: has side effects, receives results via RESULT
    CALL FUNC()
    X = RESULT

    ; Expression path: no side effects, receives return value directly
    X = FUNC_EXPR()    ; ← Function defined with #FUNCTION
    ```

### ❌ Anti-Pattern: Forgetting RESULT pollution

```erb
X = STRLENS(NAME)     ; ← STRLENS sets RESULT
Y = RESULT             ; ← Y is not STRLENS's result, but the previous RESULT
```

Many string functions set `RESULT`. After calling a function in an expression, the value of `RESULT` may have changed.

---

## 7.6 HTML Output Mistakes

### ❌ Anti-Pattern: Outputting HTML tags with PRINT

```erb
PRINTL <font color="red">Warning</font>    ; ← ❌ Tags displayed as plain text
```

To have HTML tags interpreted, you must use `HTML_PRINT`:

```erb
HTML_PRINT "<font color='red'>Warning</font>"    ; ← ✅ Displays red "Warning"
```

!!! warning "Quote Usage"

    ```erb
    ; ❌ Cannot nest double quotes in ERB strings
    HTML_PRINT "<font color="red">Warning</font>"

    ; ✅ Use single quotes
    HTML_PRINT "<font color='red'>Warning</font>"
    ```

### ❌ Anti-Pattern: Expecting FORM expansion inside HTML_PRINT

```erb
HTML_PRINT "<b>%NAME%</b>"    ; ← ❌ HTML_PRINT doesn't do FORM expansion
```

`HTML_PRINT` doesn't expand FORM syntax. To embed dynamic values, construct the FORM string first:

```erb
LOCALS '= @"<b>%NAME%</b>"    ; ← @"..." does FORM expansion
HTML_PRINT LOCALS              ; ← Pass the expanded string
```

---

## 7.7 Event Function Misuse

### ❌ Anti-Pattern: Swallowing exceptions in event functions

```erb
@EVENTBEFORE_ERROR
; ❌ Trying to ignore errors and continue
RETURN 1    ; ← Skipping error handling may corrupt state
```

`BEFORE_ERROR`/`BEFORE_THROW` events should be used for **logging and cleanup** of errors, not to ignore the errors themselves.

### ❌ Anti-Pattern: Misunderstanding #PRI/#LATER priority

```erb
@EVENTSHOP
; Normal priority

@EVENTSHOP #PRI
; ← Executes first (high priority)

@EVENTSHOP #LATER
; ← Executes last (low priority)
```

| Modifier | Execution Order | Use Case |
|----------|----------------|----------|
| None | Normal order | Default event handling |
| `#PRI` | First | Initialization, prerequisite setup |
| `#LATER` | Last | Post-processing, logging |
| `#SINGLE` | Only one | Exclusive event handling |
| `#ONLY` | Only this | Cancels all other events |

---

## 7.8 Summary: Anti-Pattern Overview

| Category | Anti-Pattern | Correct Understanding |
|----------|-------------|----------------------|
| Scope | Assuming LOCAL is fully local | LOCAL is per-function instance, but #DIM LOCAL and reserved LOCAL are different |
| Scope | Assuming DYNAMIC is same as default | DYNAMIC affects ScopeIn (participates in REF variable lifecycle) |
| Shadowing | Ignoring formal parameter / global name collision | Same-name #DIM variable takes local precedence; global is not modified |
| FORM | Using `{string_variable}` | `{expression}` only supports integer expressions; strings use `%variable%` |
| FORM | Using CALL inside FORM | CALL is a command, cannot be used in expressions |
| FORM | Forgetting triple-symbol expansion | `===`→CALLNAME:PLAYER etc.; use PRINTL to avoid |
| REF/OUT | Thinking REF and OUT are the same | REF=non-omittable reference, OUT=omittable output target |
| REF/OUT | Specifying size for REF variables | Numbers are dimension placeholders; non-zero causes error |
| Command/Expression | Using commands in expressions | Two evaluation paths are independent |
| Command/Expression | Forgetting RESULT pollution | String functions etc. set RESULT |
| HTML | Outputting HTML tags with PRINT | Must use HTML_PRINT |
| HTML | Expecting FORM expansion in HTML_PRINT | Expand with @"..." first, then pass |
| Events | Ignoring errors in BEFORE_ERROR | Should be used for logging and cleanup |
| Events | Misunderstanding #PRI/#LATER order | #PRI=first, #LATER=last, #SINGLE=exclusive, #ONLY=sole |
