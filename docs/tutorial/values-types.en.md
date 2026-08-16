# Values, Types & Variables

---

## The Three Type Systems

ERABASIC has three basic data types, each with its own declaration keyword, argument variable, and default value:

| Type | Declaration keyword | Argument variable | Literal example | Default value |
|------|-----------|---------|------------|--------|
| Integer | `#DIM` | `ARG` | `42`, `0x2A`, `1p5` | `0` |
| String | `#DIMS` | `ARGS` | `"hello"`, `@"form"` | `""` |
| Float | `#DIMF` | `ARGF` | `3.14`, `-1.5e2` | `0.0` |

!!! tip "Float is a Skia-variant addition"

    The float type (`#DIMF` / `ARGF` / `RESULTF`) is a type extension added in the Skia variant; the original Emuera does not support it.
    This tutorial uses Emuera as the baseline, and Float-related content is specially noted.

The three types are **not automatically converted** (except the safe Int→Float promotion). This means you cannot assign a string to an integer variable, nor an integer to a string variable — you must use an explicit conversion function.

---

## Integer Type

Integer is the default type in ERABASIC. Internally the engine uses a 64-bit signed integer (`Int64`/`long`), with a value range of `-9223372036854775808` ~ `9223372036854775807`.

### Integer Literals

ERABASIC supports several integer literal notations:

| Notation | Format | Example | Value |
|--------|------|------|----|
| Decimal | digit sequence | `42` | 42 |
| Hexadecimal | `0x` prefix | `0x2A` | 42 |
| Binary | `0b` prefix | `0b101010` | 42 |
| Power of two | `p` suffix | `1p5` | 32 (1×2⁵) |
| Power of ten | `e` suffix | `13e3` | 13000 (13×10³) |

```erb
#DIM L_VAL
L_VAL = 42            ; decimal
L_VAL = 0x2A          ; hexadecimal
L_VAL = 0b101010      ; binary
L_VAL = 1p5           ; 1 × 2⁵ = 32
L_VAL = 13e3          ; 13 × 10³ = 13000
L_VAL = -0xFF         ; -255
L_VAL = 2p10          ; 2 × 2¹⁰ = 2048
```

!!! warning "`e` and `p` are part of the integer literal, not floats"

    `13e3` is the integer 13000, not the float 13000.0. `p` denotes a power of two, `e` a power of ten.
    These suffixes can only appear inside integer literals, not in variable names.

    Source reference: `LexicalAnalyzer.ReadInt64()` parses `p`/`P` as the binary exponent and `e`/`E` as the decimal exponent; the result is still a `long`.

### Integer Arithmetic

Integer arithmetic follows standard precedence. Division is **integer division** (truncating the fractional part):

```erb
#DIM L_RESULT
L_RESULT = 10 / 3        ; → 3 (truncated, not 3.333...)
L_RESULT = -7 / 2        ; → -3 (truncated toward zero)
L_RESULT = 10 % 3        ; → 1 (remainder)
L_RESULT = 7 & 3         ; → 3 (bitwise AND)
L_RESULT = 7 | 8         ; → 15 (bitwise OR)
L_RESULT = 7 ^ 8         ; → 15 (bitwise XOR)
L_RESULT = 1 << 4        ; → 16 (left shift)
L_RESULT = 256 >> 4      ; → 16 (right shift)
```

!!! skia "Skia-variant overflow protection (SafeArithmetic)"

    In the Skia variant, arithmetic operators (`+`, `-`, `*`, unary `-`) enable overflow protection. When a result exceeds the `long` range, a warning is emitted and the result is clamped to `Long.MaxValue` or `Long.MinValue` instead of silently wrapping around.

    If you need wrap-around overflow behavior (e.g., for hash computation), use the [UNCHECKED series functions](../Reference/UNCHECKED.en.md):

    ```erb
    ; Normal addition: clamps + warns on overflow
    ; 9223372036854775807 + 1 → Long.MaxValue

    ; Wrap-around addition: wraps on overflow, no warning
    ; UNCHECKED_ADD(9223372036854775807, 1) → -9223372036854775808
    ```

---

## String Type

The string type stores text data. String literals are wrapped in `""`.

### String Literals

```erb
#DIMS L_NAME
L_NAME '= "艾莉娜"          ; string literals must be wrapped in ""
L_NAME '= "Hello World"     ; without "" it is treated as a variable name!
L_NAME '= ""                ; empty string
```

!!! danger "String literals must be wrapped in double quotes"

    ```erb
    ; ❌ Wrong: without quotes it is treated as a variable name
    L_NAME '= hello

    ; ✅ Correct: quotes make it a string literal
    L_NAME '= "hello"
    ```

### Two Ways to Assign Strings

String variables have two assignment syntaxes with completely different behavior:

```erb
#DIMS L_STR

; = goes through FORM syntax (supports variable interpolation)
L_STR = 你好，%NAME:TARGET%！    ; %NAME:TARGET% is replaced with the character name
L_STR = 金钱：{MONEY}元           ; {MONEY} is replaced with the money value

; '= goes through expression syntax (no interpolation, supports concatenation)
L_STR '= "你好"                   ; literal assignment
L_STR '= NAME:TARGET + "的冒险"   ; string concatenation
L_STR '= "Hello %NAME%"           ; the percent sign is literal text, not interpolated!
```

| | `=` (FORM syntax) | `'= ` (expression) |
|------|:---:|:---:|
| `{var}` interpolation | ✅ | ❌ |
| `%var%` substitution | ✅ | ❌ |
| string concatenation `+` | ❌ | ✅ |
| string literal `""` | not required | **required** |

> See [assignment statements](assignment.en.md) and [FORM syntax](form-syntax.en.md) for details.

### String Operations

Strings support comparison and concatenation:

```erb
; Concatenation (requires '= assignment)
L_STR '= "你好" + "世界"        ; → "你好世界"
L_STR '= L_STR + "！"           ; → "你好世界！"

; Repetition
L_STR '= "啊" * 3               ; → "啊啊啊"

; Comparison
IF L_STR == "你好"
    PRINTL 匹配
ENDIF
IF L_STR != ""
    PRINTL 非空
ENDIF
```

---

## Float Type (Skia variant addition)

Float is a distinct `EraType` enum value and must be declared with `#DIMF`. Internally the engine uses `double` (64-bit double-precision float).

### Float Literals

```erb
#DIMF L_FLOAT
L_FLOAT = 3.14              ; decimal-point literal
L_FLOAT = -1.5e2            ; scientific notation → -150.0
L_FLOAT = 0.001             ; decimal
L_FLOAT = 10 / 3.0          ; float division → 3.333...
```

!!! warning "Integer division vs float division"

    ```erb
    #DIMF L_F
    L_F = 10 / 3         ; → 3.0 (integer division promoted to float afterward)
    L_F = 10 / 3.0       ; → 3.333... (float division)
    L_F = 10.0 / 3       ; → 3.333... (float division)
    ```

    The type of the assignment target variable does not affect how the right-hand expression is evaluated. `10 / 3` is always integer division and yields `3`;
    float division is only triggered when one of the operands is a float value.

### Float Arithmetic

```erb
#DIMF L_PI = 3.14159265
#DIMF L_R = 5.0
#DIMF L_AREA

L_AREA = L_PI * L_R * L_R       ; circle area
L_AREA = L_R * L_R * L_PI       ; equivalent form
```

---

## The Nature of Arrays: No Scalars Exist, Everything is an Array

There are no true scalar variables in ERABASIC — **all variables are arrays**. This is the key to understanding ERABASIC's variable system.

### Everything is an Array

| Notation | Actual | Description |
|----------|--------|-------------|
| `#DIM L_VAR` | `#DIM L_VAR, 1` | Declare a 1-element 1D array |
| `L_VAR = 10` | `L_VAR:0 = 10` | `L_VAR` is shorthand for `L_VAR:0` |
| `ARG` | `ARG:0` | First element of built-in integer argument array |
| `ARGS` | `ARGS:0` | First element of built-in string argument array |
| `LOCAL` | `LOCAL:0` | First element of built-in local integer array |
| `RESULT` | `RESULT:0` | First element of built-in return value integer array |

```erb
#DIM L_VAR              ; Effectively #DIM L_VAR, 1 — 1-element 1D array
L_VAR = 42              ; Effectively L_VAR:0 = 42
PRINTV L_VAR            ; Outputs 42
PRINTV L_VAR:0          ; Also outputs 42
```

**`:` is the array element access identifier**. Use `variable_name:index` to access the Nth element of that variable.

### Confusion from Shorthand Notation

Because `L_VAR` can omit `:0`, and `:` is also the separator for array access, parsing ambiguities arise when variable access is nested.

#### Anti-pattern 1: 1D Array + Variable Subscript

```erb
#DIM L_IDX = 5
; ❌ Error: FLAG is a 1D array, has no second dimension
FLAG:L_IDX:2

; ✅ Correct: Wrap subscript expression in parentheses
FLAG:(L_IDX:2)
```

The error in `FLAG:L_IDX:2` is: `FLAG` is a 1D array (`FLAG:0`, `FLAG:1`, ...), but `:L_IDX:2` is interpreted as accessing a second dimension. Correctly wrap the subscript expression with parentheses `(L_IDX:2)`.

#### Anti-pattern 2: Character Array Default Omission Trap

The first dimension of character arrays (like `CFLAG`, `TALENT`, `EXP`) defaults to `TARGET` and can be omitted. This creates a subtle trap:

```erb
#DIM L_VAR = 5
; ❌ Semantic error: Intended CFLAG:TARGET:L_VAR:0
CFLAG:L_VAR:2

; Actual parsing process:
; 1. CFLAG is character array, first dimension omitted → defaults to TARGET
; 2. L_VAR:2 is parsed as second dimension index → attempts to access CFLAG:TARGET:L_VAR:2
; 3. But L_VAR itself is an array, L_VAR expands to L_VAR:0
; 4. Final result: CFLAG:TARGET:(L_VAR:0):2 → Wrong dimension structure

; ✅ Correct: Explicitly specify character number
CFLAG:TARGET:L_VAR
```

While `CFLAG:L_VAR:2` passes syntax checking, its parsing path is completely different from what the developer intended. Always explicitly write the first dimension of character arrays (e.g., `CFLAG:TARGET:`) to avoid such traps.

#### Anti-pattern 3: Variable Name Misinterpreted as Array Index

```erb
; ❌ Semantic error: TALNET is 2D array, TALENT is variable name
TALNET:TALENT:5

; Actual interpretation:
; 1. TALNET is 2D array → needs two indices
; 2. TALENT is treated as variable name → TALENT expands to TALENT:0 (TALENT is also a character array, first dimension defaults to TARGET)
; 3. Entire expression: TALNET:(TALENT:TARGET:0):5
; 4. Syntactically correct but semantically wrong
```

`TALNET:TALENT:5` is a classic example of **syntactically valid but semantically incorrect** code. The engine won't error, but it actually accesses `TALNET:(TALENT:TARGET:0):5` — using the value of the `TALENT` variable itself as the first dimension index of TALNET.

### Rule Summary

| Rule | Description |
|------|-------------|
| **Always wrap compound subscripts in parentheses** | Use `FLAG:(L_IDX)` not `FLAG:L_IDX` |
| **Explicitly write first dimension for character arrays** | Use `CFLAG:TARGET:L_VAR` not `CFLAG:L_VAR` |
| **Beware variable names being interpreted as array indices** | `TALNET:TALENT:5` is syntactically correct but semantically wrong |
| **Variable names themselves are `:0` shorthand** | Understanding `L_VAR` = `L_VAR:0` is the root of all confusion |

> These anti-patterns are pitfalls even experienced developers can fall into. When writing ERB code, **whenever you see multiple identifiers separated by `:`, always pause and verify the parsing path matches your intent**.

---

## Built-in Variables

ERABASIC provides many built-in variables that can be used without declaration. Below are commonly used built-in variables:

| Variable | Type | Purpose |
|----------|------|---------|
| `RESULT` | Int 1D array | Function return value (written by `RETURN`) |
| `RESULTS` | Str 1D array | Function string return value |
| `RESULTF` | Float 1D array | Function float return value (Skia addition) |
| `ARG` | Int 1D array | Function integer parameters |
| `ARGS` | Str 1D array | Function string parameters |
| `ARGF` | Float 1D array | Function float parameters (Skia addition) |
| `COUNT` | Int | Loop counter (used by `REPEAT`) |
| `TARGET` | Int | Current target character number |
| `MASTER` | Int | Main character number (usually 0) |
| `ASSI` | Int | Assistant character number |
| `MONEY` | Int | Money |
| `DAY` | Int | Elapsed days |
| `TIME` | Int | Time |
| `LOCAL` | Int 1D array | Function local integer variables (⚠ outdated, use `#DIM` for new games, set VariableSize.csv to -1 to disable) |
| `LOCALS` | Str 1D array | Function local string variables (⚠ outdated, use `#DIMS` for new games, set VariableSize.csv to -1 to disable) |
| `LOCALF` | Float 1D array | Function local float variables (⚠ outdated, use `#DIMF` for new games, set VariableSize.csv to -1 to disable) |

> For the complete list of built-in variables, see [Variable Specifications](../Emuera/variables.en.md).

### A~Z Reserved Variables

**The 26 single-letter variables A~Z are engine-built generic integer arrays and must NOT be declared with `#DIM`!**

```erb
; ❌ Error: A~Z are engine built-in variables
#DIM A
#DIM X

; ✅ Correct: Use L_ prefix to avoid conflict
#DIM L_A
#DIM L_X
```

These variables are defined in `VariableCode` as `__INTEGER__ | __ARRAY_1D__` type, and are reserved general-purpose storage space in the engine. You can use them directly in code like `A:0`, `B:5`, but cannot redeclare them with `#DIM`.

### Private Variable Declaration

Use `#DIM`/`#DIMS`/`#DIMF` inside functions to declare private variables:

```erb
@MY_FUNC(ARG:0)
#DIM L_COUNT, 10          ; Private integer array, 10 elements
#DIMS L_NAME              ; Private string variable (single-element array)
#DIMF L_SCORE             ; Private float variable (single-element array, Skia addition)
    L_COUNT:0 = ARG:0
    L_NAME '= "Test"
    L_SCORE = 0.0
RETURN
```

!!! warning "#DIM must be after @ label line and before execution statements"

    ```erb
    ; ❌ Error: #DIM appears in the middle of function body
    @MY_FUNC
        PRINTL Start
        #DIM X, 10        ; → Warning

    ; ✅ Correct: #DIM after @ line
    @MY_FUNC
    #DIM X, 10
        PRINTL Start
    ```

> See [Line Types & Structure](line-types.en.md) and [ERB File Format Extension](erb-format-extension.en.md) for details.

### Array Access

Use `:` followed by index after variable name to access array elements:

```erb
; 1D array
A:0 = 100
A:5 = 200
L_COUNT:3 = 42

; 2D array
DA:0:0 = 1
DA:0:1 = 2

; Use variable as index
#DIM L_IDX = 5
PRINTVL A:L_IDX           ; Output value of A:5

; String index (when name mapping is defined in CSV)
ABL:0 += 1                ; Numeric index
ABL:"Skill" += 1          ; String index (if defined in abl.csv)
```

---

## Type Conversion

Automatic conversion does not occur between the three types (except for safe Int→Float promotion). Explicit conversion functions must be used for cross-type operations.

### Implicit Conversion

The only implicit conversion occurs during **argument binding**:

| Argument Type | Parameter Type | Behavior |
|---------------|----------------|----------|
| Integer | Float | ✅ Safe promotion |
| Other combinations | — | ❌ Blocked |

```erb
@FLOAT_FUNC(ARGF:0)
#FUNCTIONF
    RETURNF ARGF:0 * 2.0

; ✅ Integer 5 automatically promoted to float 5.0
RESULTF = FLOAT_FUNC(5)
```

### Explicit Conversion Functions (TO Series) { #type-conversion-functions }

| Function | Functionality | Example | Result |
|----------|---------------|---------|--------|
| `TOSTR(int)` | Integer → String | `TOSTR(42)` | `"42"` |
| `TOSTR(int, fmt)` | Integer → String (formatted) | `TOSTR(42, "D4")` | `"0042"` |
| `TOSTR(int, "X")` | Integer → Hex string | `TOSTR(255, "X")` | `"FF"` |
| `TOSTRF(float)` | Float → String (Skia addition) | `TOSTRF(3.14)` | `"3.14"` |
| `TOSTRF(float, fmt)` | Float → String (formatted) | `TOSTRF(3.14, "F2")` | `"3.14"` |
| `TOINT(str)` | String → Integer | `TOINT("42")` | `42` |
| `TOINT(float)` | Float → Integer (Skia extension) | `TOINT(3.7)` | `3` (truncated) |
| `TOFLOAT(str)` | String → Float (Skia addition) | `TOFLOAT("3.14")` | `3.14` |

### Complete Type Conversion Table

| Source → Target | Implicit | Explicit Function | Notes |
|-----------------|----------|-------------------|-------|
| Int → Str | ❌ | `TOSTR(i)` | Original version |
| Int → Float | ✅ | — | Safe promotion |
| Str → Int | ❌ | `TOINT(s)` | Parse failure → 0 |
| Str → Float | ❌ | `TOFLOAT(s)` | Skia addition; parse failure → 0.0 |
| Float → Str | ❌ | `TOSTRF(f)` | Skia addition |
| Float → Int | ❌ | `TOINT(f)` | Skia extension; direct truncation |

### Conversion Examples

```erb
; Integer → String
#DIMS L_STR
L_STR '= TOSTR(42)             ; → "42"
L_STR '= TOSTR(42, "D4")       ; → "0042" (4-digit zero-padded)
L_STR '= TOSTR(255, "X")       ; → "FF" (hexadecimal)

; String → Integer
#DIM L_INT
L_INT = TOINT("42")            ; → 42
L_INT = TOINT("abc")           ; → 0 (parse failure)
L_INT = TOINT("")              ; → 0 (empty string)

; Float → String (Skia addition)
#DIMF L_PI = 3.14159265
L_STR '= TOSTRF(L_PI)          ; → "3.14159265"
L_STR '= TOSTRF(L_PI, "F2")    ; → "3.14"
L_STR '= TOSTRF(L_PI, "E")     ; → "3.141593E+000"

; String → Float (Skia addition)
#DIMF L_F
L_F = TOFLOAT("3.14")          ; → 3.14
L_F = TOFLOAT("-1.5e2")        ; → -150.0
L_F = TOFLOAT("abc")           ; → 0.0 (parse failure)

; Float → Integer (Skia extension)
L_INT = TOINT(3.7)             ; → 3 (truncated, not rounded)
L_INT = TOINT(-2.9)            ; → -2 (truncated toward zero)
```

!!! warning "TOINT truncates floats, does not round"

    `TOINT(3.7)` returns `3`, not `4`. The source implementation is `(long)GetFloatValue()`, which is C#'s direct cast, truncating toward zero.

### Using Conversion in FORM Syntax

Conversion functions are especially useful when you need to insert non-integer values into formatted strings:

```erb
; Insert float value in PRINTFORM (Skia variant)
#DIMF L_PI = 3.14159265
PRINTFORML PI: %TOSTRF(L_PI, "F2")%    ; → "PI: 3.14" (TOSTRF returns string, use %...% not {})

; Concatenate in string assignment
#DIMS L_MSG
L_MSG = PI is %TOSTRF(L_PI, "F4")%       ; FORM syntax, %...% string interpolation
L_MSG '= "PI is " + TOSTRF(L_PI, "F4")   ; Expression syntax, concatenation
```

> See [FORM Syntax](form-syntax.en.md) for complete FORM syntax documentation.

---

## Common Pitfalls

| Pitfall | Wrong Usage | Correct Usage | Reason |
|---------|-------------|---------------|--------|
| Using A-Z as variable names | `#DIM A` | `#DIM L_A` | A~Z are engine built-in generic variables |
| Strings without quotes | `S '= hello` | `S '= "hello"` | Without quotes, it's treated as variable name |
| Assigning integer to string | `S = 42` | `S '= TOSTR(42)` | Type mismatch |
| Assigning float to integer | `X = 3.14` | `X = TOINT(3.14)` | Float assigned to integer truncates to 3 |
| Expecting rounding | Expecting 4 from `TOINT(3.7)` | Manual: `TOINT(3.7 + 0.5)` | TOINT truncates, doesn't round |
| Unexpected integer division | Expecting 3.33 from `10 / 3` | `10 / 3.0` | Integer division when all operands are integers |
| Unexpected interpolation in FORM | `S = 100%` | `S = 100\%` or `S '= "100%"` | `%` is variable substitution in FORM syntax |
| Wrong #DIM position | `@F` → `PRINTL` → `#DIM` | `@F` → `#DIM` → `PRINTL` | #DIM must be after @ line, before execution statements |

---

## Next Steps

| What do you want to learn | Go to |
|:---|:---|
| Complete assignment syntax | [Assignment Statements](assignment.en.md) |
| Format string details | [FORM Syntax](form-syntax.en.md) |
| Variable declaration system (CONST/DYNAMIC/REF/OUT, etc.) | [Variable Declaration System](variable-declaration.en.md) |
| Complete list of built-in variables | [Variable Specifications](../Emuera/variables.en.md) |
| Operators and expressions | [Operations](../Emuera/operand.en.md) |
