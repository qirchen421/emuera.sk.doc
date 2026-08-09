# Assignment Statements

!!! info "Corresponding Manual Sections"

    - **Reference Category**: [Arithmetics](../Reference/README.en.md#arithmetic)
    - [Emuera Extended Syntax](../Emuera/expression.en.md) — FORM syntax assignment, string expression assignment
    - [eramaker ERB Format](../eramaker/ERB_format.en.md) — Basic assignment syntax (historical reference)

---

## Overview

Assignment statements are one of the most fundamental operations in ERABASIC — storing values into variables. While the syntax appears simple, ERABASIC has several different forms of assignment, each suited to different scenarios:

| Assignment Form | Syntax | Applicable Types | Description |
|----------------|--------|-----------------|-------------|
| Basic assignment | `X = 10` | Integer/Float | Most common form |
| String FORM assignment | `S = Hello %NAME%` | String | Supports `%variable%` string substitution, `{variable}` numeric interpolation |
| String expression assignment | `S '= "Hello"` | String | Expression evaluation, no interpolation |
| Compound assignment | `X += 5` | Integer/Float/String | Arithmetic + assignment |
| Increment/Decrement | `X ++` / `X --` | Integer/Float | Prefix or postfix |
| Batch assignment | `A:10 = 1,2,3` | Array | Consecutive element assignment |

!!! note "eramaker Compatibility"
    Basic assignment (`=`), compound assignment (`+=`/`-=`/`*=`/`/=`/`%=`), and string FORM assignment have existed since eramaker. Increment/decrement (`++`/`--`), string expression assignment (`'=`), and batch assignment are Emuera extensions.

---

## How the Parser Identifies Assignment Statements

When the ERABASIC parser encounters a line of code, it determines its type in the following order:

```
1. Line starts with ++ or -- ? → Prefix increment/decrement statement
2. Line starts with a known command name? → Command statement (PRINT, CALL, etc.)
3. Neither of the above → Attempt to parse as assignment statement
```

When the parser determines a line is not a command:

1. It reads the assignment target (variable on the left side of the equals sign) using `LexicalAnalyzer.Analyse`
2. It reads the assignment operator using `LexicalAnalyzer.ReadAssignmentOperator`
3. It parses the remaining part as an expression (right side of the equals sign)

This means **the left side of an assignment must be a variable** — it cannot be an expression or constant.

---

## Basic Assignment

### Integer Assignment

```erb
A = 100
MONEY = 500
FLAG:0 = 1
ABL:TARGET:0 = 3
```

The right side of the equals sign can be any integer expression:

```erb
A = 10 + 20
A = B * 2 + C
A = MAX(10, 20)
A = STRLEN("hello")
```

### Float Assignment

```erb
#DIMF SCORE
SCORE = 3.14
SCORE = 10 / 3.0
```

!!! warning "Integer Division vs. Float Division"

    `10 / 3` results in `3` (integer division, truncating decimals), while `10 / 3.0` results in `3.333...` (float division).
    The type of the target variable does not affect how the right-side expression is evaluated.

---

## String Assignment

String variables have two assignment methods with completely different behaviors:

### FORM Syntax Assignment (`=`)

When assigning with `=`, the right side is parsed as FORM syntax — `{variable}` is interpolated and `%variable%` is substituted:

```erb
NAME:0 = Elina
STR:0 = Hello, %NAME:0%!          ; → "Hello, Elina!"
STR:1 = Money: {MONEY}G            ; → "Money: 500G"
STR:2 = %NAME:0%'s Adventure       ; → "Elina's Adventure"
STR:3 = NAME:0                     ; → "NAME:0" (no % means literal text!)
STR:4 = CSVNAME(0)                 ; → "CSVNAME(0)" (function is NOT called, stored as-is)
```

This is eramaker's original behavior. In eramaker, `STR:0 = %RESULTS%` assigns the contents of `RESULTS` to `STR:0`.

### String Expression Assignment (`'=`)

When assigning with `'= `, the right side is parsed as a **string expression** — no FORM interpolation, expression evaluation instead:

```erb
STR:0 '= "Hello"                   ; → "Hello" (literal)
STR:1 '= "Hello %NAME:0%"          ; → "Hello %NAME:0%" (no interpolation! percent signs are literal text)
STR:2 '= NAME:0 + "'s Adventure"   ; → "Elina's Adventure" (string concatenation)
STR:3 '= TSTR:0 + "Continue"       ; → variable value + "Continue"
STR:4 '= CSVNAME(0)                ; → name of character 0 (function called via expression evaluation)
```

### Comparison of the Two Methods

| | `=` (FORM syntax) | `'= ` (expression) |
|------|:---:|:---:|
| `{variable}` interpolation | ✅ | ❌ |
| `%variable%` substitution | ✅ | ❌ |
| String concatenation `+` | ❌ | ✅ |
| String literals `""` | Not required | **Required** |
| Expression function calls | ❌ | ✅ |
| eramaker compatible | ✅ | ❌ (Emuera extension) |

!!! tip "Selection Guide"

    - Simple variable interpolation needed → Use `=` (FORM syntax is more concise)
    - String concatenation, function calls, complex expressions needed → Use `'= `
    - When unsure, `'= ` + `""` wrapping is safer (prevents accidental interpolation)

---

## Compound Assignment

Compound assignment operators combine arithmetic operations and assignment in one step:

```erb
X += 5          ; X = X + 5
X -= 3          ; X = X - 3
X *= 2          ; X = X * 2
X /= 4          ; X = X / 4
X %= 10         ; X = X % 10 (modulo)
```

Emuera also supports bitwise compound assignments:

```erb
X <<= 2         ; X = X << 2 (left shift)
X >>= 1         ; X = X >> 1 (right shift)
X |= 0xFF       ; X = X | 0xFF (bitwise OR)
X &= 0x0F       ; X = X & 0x0F (bitwise AND)
X ^= 0xAA       ; X = X ^ 0xAA (bitwise XOR)
```

String variables also support `+=`:

```erb
STR:0 += "Appended text"       ; String concatenation (Emuera extension)
```

!!! warning "Compound assignment cannot be used for batch assignment"

    ```erb
    ; ❌ Error: Compound assignment does not support batch assignment
    A:10 += 1,2,3

    ; ✅ Correct: Use the basic assignment batch form
    A:10 = 1,2,3
    ```

---

## Increment and Decrement

### Postfix Form (Statement)

```erb
X ++            ; X = X + 1
X --            ; X = X - 1
```

Postfix increment/decrement is used as a **standalone statement** and cannot be embedded in expressions:

```erb
; ✅ Correct: Standalone statement
X ++

; ❌ Error: Cannot embed in expression
A = X ++ + 1
```

### Prefix Form (Statement)

```erb
++X             ; Prefix increment (as standalone statement)
--X             ; Prefix decrement (as standalone statement)
```

Prefix increment/decrement is also a standalone statement. When the parser detects `++` or `--` at the beginning of a line, it recognizes it as a prefix increment/decrement statement.

!!! warning "Strict Rules for Prefix Increment/Decrement"

    A variable name must immediately follow `++` or `--` at the beginning of a line. If something other than a variable follows, an error occurs:

    ```erb
    ; ❌ Error: Not a variable after ++
    ++ 5
    ++ (A + B)

    ; ✅ Correct
    ++ A
    ++ FLAG:0
    ```

### Increment/Decrement in Expressions

Inside expressions (such as the right side of an assignment, IF conditions, etc.), postfix `++`/`--` can be used:

```erb
A = X ++        ; A = current value of X, then X = X + 1
IF Y -- > 0     ; Evaluate Y > 0, then Y = Y - 1
```

However, prefix `++`/`--` **cannot** be used in expressions:

```erb
; ❌ Error: Prefix increment cannot be used in expressions
A = ++ X
```

---

## Batch Assignment

When assigning to array variables, you can specify multiple values separated by commas for consecutive element batch assignment:

```erb
; Assign 1, 2, 3 to A:10, A:11, A:12 respectively
A:10 = 1,2,3

; Two-dimensional array: assign to DA:0:0, DA:0:1, DA:0:2 respectively
DA:0:0 = 1,2,3
```

!!! warning "Batch Assignment Limitations"

    1. **No cross-row assignment**: Two-dimensional array batch assignment does not automatically wrap to the next row. `DA:0:0 = 1,2,3` only assigns to `DA:0:0`~`DA:0:2`, not continuing to `DA:1:0`
    2. **Compound assignment not supported**: Cannot write `A:10 += 1,2,3`
    3. **String batch assignment requires `'= `**:

    ```erb
    ; ❌ Error: Using = treats the entire content as a single FORM string
    STR:20 = Strawberry,Melon,BlueHawaii
    ; → STR:20 = "Strawberry,Melon,BlueHawaii" (one string)

    ; ✅ Correct: Use '= to assign individually
    STR:20 '= "Strawberry", "Melon", "BlueHawaii"
    ; → STR:20 = "Strawberry", STR:21 = "Melon", STR:22 = "BlueHawaii"
    ```

---

## `==` as an Assignment Operator

ERABASIC has a legacy behavior: `==` (normally a comparison operator) appearing in an assignment position is treated as the assignment operator `=`:

```erb
A == 10         ; Equivalent to A = 10 (warning will be issued)
```

When the parser detects `==` in an assignment position, it issues a warning but still executes the assignment. This is because early code frequently misused `==` for assignment, and this behavior was retained for compatibility.

!!! danger "Do not use == for assignment in new code"

    While the engine tolerates `==` assignment, it reduces code readability and generates warnings. Always use `=` for assignment and `==` only for comparison.

---

## Assignment and the Type System

ERABASIC has three basic types: Integer (Int64), String (String), and Float (Double). Types must match during assignment:

| Target Variable Type | Allowed Assignments | Disallowed Assignments |
|---------------------|--------------------|-----------------------|
| Integer (`#DIM`) | Integer expressions | String, Float (truncated to integer) |
| String (`#DIMS`) | `=` FORM syntax or `'= ` string expression | Integer expressions |
| Float (`#DIMF`) | Float/Integer expressions | String |

```erb
#DIM L_INT
#DIMS L_STR
#DIMF L_FLOAT

L_INT = 42                ; ✅ Integer assignment
L_INT = 3.14              ; ⚠️ Float assigned to integer, truncated to 3
L_STR = Hello             ; ✅ FORM syntax
L_STR '= "Hello"          ; ✅ String expression
L_STR = 42                ; ✅ FORM syntax: "42" (number treated as string literal)
L_FLOAT = 3.14            ; ✅ Float assignment
L_FLOAT = 10              ; ✅ Integer automatically converts to float
```

---

## Common Pitfalls

| Pitfall | Wrong | Correct | Reason |
|---------|-------|---------|--------|
| String without quotes | `S '= hello` | `S '= "hello"` | Without quotes, treated as variable name |
| Accidental interpolation in FORM syntax | `S = 100%` | `S = 100\%` or `S '= "100%"` | `%` is a variable substitution marker in FORM syntax |
| Batch assignment with `=` | `STR:0 = "a","b"` | `STR:0 '= "a","b"` | `=` treats commas as part of FORM text |
| `==` misused as assignment | `A == 10` | `A = 10` | `==` is a comparison operator, use `=` for assignment |
| Compound batch assignment | `A:0 += 1,2,3` | `A:0 = 1,2,3` | Compound assignment does not support batch |
| Assignment target not a variable | `A + B = 10` | Not allowed | Left side of assignment must be a variable |

---

## Next Steps

| What You Want to Learn | Go To |
|:---|:---|
| Variable declaration and types | [File Types](file-types.en.md) |
| Command vs. expression boundary | [Command vs Expression](command-vs-expression.en.md) |
| ERB file format extensions | [ERB File Format Extensions](erb-format-extension.en.md) |
| Formatted string details | [PRINT Command](../Reference/PRINT.en.md) |
