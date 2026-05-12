# Command vs Expression — The Fundamental Difference Between Two Evaluation Paths

!!! info "Corresponding Manual Sections"

    - [Expression Functions](../Emuera/user_defined_in_expression_function.en.md) — Complete specification for #FUNCTION/#FUNCTIONS
    - [CALLF Instruction Reference](../Reference/CALLF.md) — CALLF API documentation

---

## Origin of the Problem

If you're coming from C/Java/Python, you might naturally write code like this:

```erb
STRLEN("hello")
```

Then receive an error:

```
命令の直後は半角スペースまたはタブでなければなりません
(The character after a command must be a half-width space or tab)
```

**Why can't `STRLEN("hello")` be used as a standalone statement?** The answer lies at the ERABASIC parser level.

---

## Parser Rules

The ERABASIC parser makes a strict distinction between "commands" and "expressions" at the lexical analysis stage.

### Command Line Parsing Rules

When the parser encounters a line starting with a function name, it checks the **first character** after the function name:

```
Function name + space/tab/semicolon → Command line (InstructionLine)
Function name + (                  → Invalid! → InvalidLine
Function name + other              → Invalid! → InvalidLine
```

This rule is defined in [`LogicalLineParser.cs`](file:///d:/emuera/emuera_lazyloading_selfmodified_version/Emuera/Runtime/Script/Parser/LogicalLineParser.cs):

```csharp
var current = stream.Current;
if (current != ';' && current != ' ' && current != '\t' && ...)
{
    return new InvalidLine(position, errMes);
}
```

**Core rule**: In command lines, the function name **must be immediately followed by a space, tab, or semicolon**. `(` causes a parse failure.

### Two Syntaxes Compared

| | Command Syntax | Expression Syntax |
|------|---------|-----------|
| **Form** | `FUNC arg1, arg2, arg3` | `FUNC(arg1, arg2, arg3)` |
| **Separator** | Space after function name, commas between parameters | `(` after function name, commas between parameters, `)` at end |
| **Allowed position** | Standalone line (statement) | Inside expressions (right side of assignment, conditions, operations...) |
| **Parameter parsing** | Depends on `ArgumentBuilder` type | Unified expression parser |

---

## Practical Examples

### Correct Usage

```erb
; ✅ Command syntax (space-separated) — as standalone statement
STRLEN "hello"
PRINTL Result

; ✅ Expression syntax (parentheses) — inside an expression
X = STRLEN("hello")
IF STRLEN("hello") > 5
    PRINTL Long string
ENDIF

; ✅ CALL command — comma-separated parameters
CALL MY_FUNC(1, 2)
```

### Incorrect Usage

```erb
; ❌ Parenthesized syntax as standalone command → Parse failure!
STRLEN("hello")
; → InvalidLine: "The character after a command must be a half-width space or tab"

; ❌ Same applies to custom expression functions
@CALC(X, Y)
#FUNCTION
    RETURNF X * Y

CALC(3, 5)    ; → Parse failure!
```

---

## Why This Matters

This syntax limitation doesn't affect **getter functions** (like `STRLEN`, `MAX`) much — they should be used in expressions anyway.

But it creates a real dilemma for **setter functions** (functions with side effects):

```erb
; Developer wants to write a SETTER function to modify state
@SETTER(KEY, VAL)
#FUNCTION
    ; Modify some global state
    RETURNF 1    ; Return value is meaningless, just to satisfy #FUNCTION requirement

; ❌ Cannot write in natural command form
SETTER("key", val)
; → Parse failure! Function name cannot be directly followed by '('

; ⚠️ Can only use space syntax
SETTER "key", val
; → Parses successfully, but pollutes RESULT! (see below)
```

---

## RESULT Pollution Problem

When expression functions (`#FUNCTION`/`#FUNCTIONS`) are called using command syntax (space), the engine follows the `METHOD_Instruction` path, which **unconditionally** writes the return value to `RESULT` (integer) or `RESULTS` (string):

```erb
RESULT = 42
PRINTVL RESULT          ; Output 42

SETANIMETIMER 30        ; Called as command → RESULT = 1 (polluted!)
PRINTVL RESULT          ; Output 1 ← Unexpectedly overwritten!

BITMAP_CACHE_ENABLE 1   ; Same → RESULT overwritten!
```

In contrast, old-style pure commands (like `SETFONT`, `SETCOLOR`) follow the `doNormalFunction` path and **do not write to RESULT**.

!!! info "Affected actual functions"

    The following functions are implemented as expression functions in EM+EE and pollute RESULT when called with command syntax:

    - [SETANIMETIMER](../Reference/SETANIMETIMER.en.md) — Sets animation redraw interval; in EM+EE the return value is always `1` (meaningless)
    - [BITMAP_CACHE_ENABLE](../Reference/BITMAP_CACHE_ENABLE.en.md) — Enables bitmap cache to accelerate drawing; in EM+EE has a return value (meaningless)

    The Skia version refactored both into pure commands, eliminating the RESULT pollution problem at its root.

!!! info "Detailed analysis"

    For complete analysis of the three instruction dispatch paths (A/B/C) and RESULT pollution, see the subsequent sections of this page.

---

## Solutions

### Solution 1: CALLF (After-the-fact Remedy)

`CALLF` is an instruction specifically designed to solve this problem — it calls an expression function but discards the return value:

```erb
; ✅ CALLF allows parenthesized syntax without polluting RESULT
CALLF SETTER("key", val)
; RESULT unchanged
```

**Drawback**: More verbose than a direct command-style function. `CALLF SETTER("key", val)` is not as concise as `SETTER "key", val`.

!!! info "CALLF Reference"

    See [CALLF Instruction Reference](../Reference/CALLF.md).

### Solution 2: Register Directly as Instruction (Design-level Solution)

**The better approach** is to register the setter function directly as an `AInstruction` (command), so it doesn't follow the `METHOD_Instruction` path:

| | Expression Function (#FUNCTION) | Registered as Instruction |
|------|:---:|:---:|
| **Registration method** | `FunctionMethod` → `methodInstruction` | `AInstruction` subclass |
| **Dispatch path** | Path A → `METHOD_Instruction` | Path A → own `DoInstruction` |
| **Writes to RESULT?** | ✅ Unconditionally writes | ❌ Does not write |
| **Usable in expressions?** | ✅ Naturally supported | ✅ With `METHOD_SAFE` flag |

**Example**: `SETANIMETIMER` in the Skia version is registered as `SETANIMETIMER_Instruction`, doesn't write to RESULT, and has the `METHOD_SAFE` flag added so it can still be used in expressions. `BITMAP_CACHE_ENABLE` is similarly refactored from an expression function to a pure command.

---

## Summary

| Problem | Cause | Solution |
|------|------|---------|
| `FUNC(args)` cannot be a standalone statement | Parser requires space/tab after function name; `(` is invalid | Use space syntax `FUNC args` or CALLF |
| Expression function as command pollutes RESULT | `METHOD_Instruction` unconditionally writes to RESULT | CALLF or register as Instruction |
| CALLF is too verbose | Extra CALLF wrapper layer | Register as Instruction at design time |

**Core insight**: ERABASIC's "commands" and "expressions" are two different syntactic forms, not two usages of the same syntax. This design stems from eramaker's historical legacy and still affects how we write setter functions in modern ERABASIC.

---

## Deep Understanding: ERABASIC is Command-Driven

From the syntax rules in this section, you can appreciate ERABASIC's most fundamental design philosophy: **it is a command-driven language**.

In C/Java/Python, `func(a)` is a function call statement — the language doesn't distinguish between "commands" and "expression functions." But in ERABASIC, when the parser sees a line of code, it first determines: **Is this line a command?**

```
Parser's perspective:
  Line starts with a known command name? → Command syntax (space-separated parameters)
  Line starts with CALL?      → Call custom command (parenthesized syntax)
  Line starts with CALLF?     → Call expression function (parenthesized syntax)
  Line starts with variable + =? → Assignment statement (expression syntax)
  Line starts with IF/FOR/...? → Control flow (expression syntax)
```

**Three calling methods, three syntactic forms**:

| Calling Method | Syntax | Example | Essence |
|---------|------|------|------|
| Built-in command | `CMD arg1, arg2` | `PRINTL "hello"` | Space-separated, parser directly recognizes |
| CALL custom command | `CALL FUNC(arg1, arg2)` | `CALL MY_FUNC(1, 2)` | CALL is the command, `()` is CALL's parameter format |
| CALLF expression function | `CALLF FUNC(arg1, arg2)` | `CALLF STRLEN("hello")` | CALLF is the command, `()` is CALLF's parameter format |

**Key insight**: The `()` parenthesized syntax itself doesn't distinguish between "command-style functions" and "expression functions." `MY_FUNC` in `CALL MY_FUNC(1, 2)` is a command-style function (defined with `@` label), while `STRLEN` in `CALLF STRLEN("hello")` is an expression function (defined with `#FUNCTION`) — both use `()` for parameters, but **both require a "command" (CALL or CALLF) to drive them**.

In other words: **There is no "bare" function call statement in ERABASIC.** Every function call must be initiated by a command — either a built-in command name, CALL, or CALLF. This is its most fundamental syntactic difference from mainstream languages.

---

## Related Sections

- [Line Types & Structure](line-types.en.md) — Basics of the four line types
- [Expression Functions](../Emuera/user_defined_in_expression_function.en.md) — Complete specification for #FUNCTION/#FUNCTIONS
- [CALLF Instruction Reference](../Reference/CALLF.md) — CALLF API documentation
