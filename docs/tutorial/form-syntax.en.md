# FORM Syntax (Formatted Strings)

!!! info "Related Manual Sections"

    - [Emuera Extended Syntax > Formatted String (FORM Syntax) Extensions](../Emuera/expression.en.md) — Official manual's FORM syntax description
    - [PRINT Series](../Reference/PRINT.en.md) — Output commands using FORM syntax
    - [STRFORM](../Reference/STRFORM.en.md) — Runtime FORM expansion function

!!! warning "FORM syntax is the most deeply coupled and trap-prone feature in ERABASIC"

    FORM syntax spans three major modules: lexical analysis, expression evaluation, and the rendering system. Many of its behaviors are undocumented and can only be inferred from source code. This tutorial is based on source code analysis, revealing the rules that "nobody tells you but you must know."

---

## What is FORM Syntax

FORM syntax is ERABASIC's **formatted string** mechanism — embedding variable references, conditional branches, and special symbols within strings, expanded at runtime into the final string.

It's everywhere:

```erb
PRINTFORM Name is %NAME% Money is {MONEY}
STR:0 = %CALLNAME%'s attack power is {ATK}
RESULTS = @"%NAME% has arrived!"
CALLFORM FUNC_%TARGET%
```

### Two Contexts Where FORM Syntax Appears

| Context | Syntax Form | Example |
|---------|-------------|---------|
| **Command arguments** (PRINTFORM/RETURNFORM etc.) | Written directly, no quotes needed | `PRINTFORM Hello {A}` |
| **Inside string expressions** (PRINTS args, expression function params etc.) | Wrapped in `@"..."` | `PRINTS @"Hello {A}"` |

Key difference: In command argument position, you write FORM strings directly — no quotes needed or allowed. Inside string expressions, you must mark them with `@"..."`.

---

## Basics: Variable Substitution

### `%Variable%` — String Variable Substitution

Wrap a string variable name with `%` to substitute its value at runtime:

```erb
NAME:0 = Sato
PRINTFORML Name is %NAME:0%
; Output: Name is Sato
```

You can write any **string expression** inside `%`:

```erb
PRINTFORML %CALLNAME:TARGET%
PRINTFORML %STR:0%
PRINTFORML %TOSTR(A)%
```

### `{Expression}` — Integer Expression Interpolation

Wrap an integer expression with `{}` to evaluate it at runtime and convert to string:

```erb
A = 42
PRINTFORML Value is {A}
PRINTFORML Result is {A * 2 + 10}
PRINTFORML {(MONEY + 1000 - 600) * 5}
```

!!! note "`{}` must contain an integer expression"

    The content inside `{}` is parsed as an **integer expression**. Writing a string expression will cause an error.

---

## Padding and Alignment

### `%Variable,Width,Alignment%` — String Padding

```erb
STR:0 = abc
PRINTFORML [%STR:0%]          ; [abc]
PRINTFORML [%STR:0,10%]       ; [       abc]  (right-aligned, padded with half-width spaces)
PRINTFORML [%STR:0,10,LEFT%]  ; [abc       ]  (left-aligned)
PRINTFORML [%STR:0,2%]        ; [abc]          (width too small, displayed as-is)
```

### `{Expression,Width,Alignment}` — Integer Padding

```erb
A = 123456
PRINTFORML [{A}]          ; [123456]
PRINTFORML [{A,10}]       ; [    123456]  (right-aligned)
PRINTFORML [{A,10,LEFT}]  ; [123456    ]  (left-aligned)
PRINTFORML [{A,2}]        ; [123456]      (width too small, displayed as-is)
```

### Underlying Rules for Padding Length Calculation

!!! danger "Full-width character length calculation is deeply tied to encoding"

    Padding length is calculated using `LangManager.GetStrlenLang()`. This method's behavior:

    1. If the string is **all ASCII characters**, length = `string.Length` (character count)
    2. Otherwise, length = `Encoding.GetByteCount(string)` (byte count in system encoding)

    This means:

    - Under Shift-JIS encoding, full-width characters = 2 bytes = 2 character widths
    - Under UTF-8 encoding, CJK characters = 3 bytes ≠ 2 character widths

    **Source code comment** (from [StrForm.cs](https://github.com/Emuera/EmueraDotNet/blob/main/Runtime/Script/Data/StrForm.cs) `FormatPercent` class):

    ```
    totalLength -= currentLength - ret.Length;
    //全角文字の数だけマイナス。タブ文字？ゼロ幅文字？知るか！
    ```

    Translation: "Subtract by the number of full-width characters. Tab characters? Zero-width characters? Who cares!"

    This comment reveals the **hack nature** of the padding logic: it assumes full-width characters occupy exactly 2 bytes in the system encoding, then adjusts padding via `totalLength - (byteLength - charLength)`. For non-Shift-JIS environments, this calculation may produce unexpected results.

    Padding always uses **half-width spaces** (`' '`), regardless of alignment direction.

---

## `@"..."` — FORM Syntax Inside String Expressions

In string expressions (such as `PRINTS` arguments, `+=` right-hand side), you cannot write FORM syntax directly — it must be wrapped in `@"..."`:

```erb
; ✅ Correct
PRINTS @"%RESULTS% continues"
STR:0 += @"%NAME% has arrived"

; ❌ Wrong — PRINTS doesn't accept bare FORM syntax
PRINTS %RESULTS% continues

; ❌ Wrong — PRINTFORM doesn't need @"..."
PRINTFORM @"%RESULTS% continues"  ; Will output @"..." and "..." literally
```

### Parsing Entry Point for `@"..."`

When the lexical analyzer encounters `@` in an expression context:

1. Checks if the next character is `"`
2. If so, skips `@"`, calls `AnalyseFormattedString(st, FormStrEndWith.DoubleQuotation, false)`
3. Parses until the closing `"`

This means the FORM syntax inside `@"..."` is **identical** to that in `PRINTFORM` arguments — only the termination condition differs (`"` vs end of line).

---

## `\@ ? # \@` — FORM Ternary Operator

This is one of the most confusing features in FORM syntax.

### Syntax

```
\@ condition ? true_string # false_string \@
```

### Examples

```erb
PRINTFORML \@ TALENT:0 ? Has talent # No talent \@
PRINTFORML Result is \@ A > 0 ? positive # non-positive \@!
```

### Parsing Flow

The parsing of `\@` is implemented in `LexicalAnalyzer.AnalyseYenAt()`:

1. Encounters `\@` → starts parsing the condition part (until `?`)
2. The condition part is parsed as an **integer expression** (`ExpressionParser.ReduceIntegerTerm`)
3. After `?` → parses the true-value string (until `#`), which is a **nested FORM string**
4. After `#` → parses the false-value string (until `\@`), also a nested FORM string
5. Closing `\@` → end

### Differences from Expression Ternary Operator

| Feature | FORM Ternary `\@ ? # \@` | Expression Ternary `? :` |
|---------|--------------------------|--------------------------|
| Context | Inside FORM strings | Inside expressions |
| Condition type | Integer expression | Integer expression |
| Result type | **String** | Integer or string (depends on operands) |
| Delimiters | `?` and `#` | `?` and `:` |
| Closing marker | `\@` | None (relies on precedence) |
| True/false values | FORM strings (support nested interpolation) | Expressions |
| `#` can be omitted | Yes (false value defaults to empty string) | No |

!!! tip "Omitting `#`"

    If `\@` is immediately followed by `@` (without `#`), the parser issues a warning and sets the false value to an empty string:

    ```erb
    ; This triggers a warning, false value is empty
    PRINTFORML \@ TALENT:0 ? Has talent \@
    ```

### Using in Expression Context

In expression contexts, `\@...\@` can be used **without** `@"..."`:

```erb
; These two lines are equivalent
PRINTS @"\@ A > 0 ? positive # negative \@"
PRINTS \@ A > 0 ? positive # negative \@
```

This is because the lexical analyzer, upon encountering `\@` in an expression context, parses it directly as a `StrFormWord`.

### `\@...\@` Behavior in Different Contexts

`\@...\@` is both part of FORM syntax and a literal that can be used directly in expression contexts. This dual identity makes its behavior confusing across different contexts. Here is a detailed analysis:

| Context | Code Example | Behavior | Parsing Method |
|---------|-------------|----------|---------------|
| **PRINTFORM** | `PRINTFORM \@ A>0 ? pos # neg \@` | FORM string expansion | `AnalyseFormattedString` parses directly |
| **PRINTS** | `PRINTS \@ A>0 ? pos # neg \@` | Equivalent to `PRINTS @"\@ A>0 ? pos # neg \@"` | `\@` recognized as FORM start in expression context |
| **RETURNF** | `RETURNF \@ A>0 ? pos # neg \@` | Returns expanded string | Same — `\@` parsed as `StrFormWord` in expression context |
| **RETURNFORM** | `RETURNFORM \@ A>0 ? pos # neg \@` | FORM string expansion | `AnalyseFormattedString` parses directly |
| **Inside string literal** | `"Result is\@ A>0 ? pos # neg \@"` | **Not expanded** — `\@` is escaped to `@` in plain strings | `ReadString` processes it — `\` consumed, `@` remains |
| **Inside @"..."** | `@"\@ A>0 ? pos # neg \@"` | FORM string expansion | `AnalyseFormattedString` parses |
| **Assignment =** | `STR:0 = \@ A>0 ? pos # neg \@` | FORM string expansion | Assignment `=` uses `AnalyseFormattedString` |
| **Assignment '=** | `STR:0 '= \@ A>0 ? pos # neg \@` | FORM string expansion | `'=` uses expression parsing, but `\@` is still recognized in expression context |
| **#DIMS init** | `#DIMS S = \@ A>0 ? pos # neg \@` | **Compile-time expression evaluation** | `ExpressionParser.ReduceArguments`, `\@` parsed as `StrFormWord` |

!!! warning "Key Distinction: Plain String Literal vs FORM Context"

    In a plain string literal `"..."`, `\@` is escaped to `@` (`\` is consumed), so the **FORM ternary operator is NOT triggered**. This is because `"..."` is parsed by `ReadString`, not `AnalyseFormattedString`.

    ```erb
    ; ❌ Not expanded — plain string, \@ is escaped to @
    RESULTS = "Result is\@ A>0 ? pos # neg \@"

    ; ✅ Correct — FORM context
    RESULTS = \@ A>0 ? pos # neg \@

    ; ✅ Correct — @"..." interior is FORM context
    RESULTS = @"Result is\@ A>0 ? pos # neg \@"
    ```

!!! tip "Core Rule: `\@` Works at Any FORM Parsing Entry Point"

    As long as the parsing path goes through `AnalyseFormattedString` (PRINTFORM argument, `@"..."`, assignment `=`), or encounters `\@` in an expression context (RETURNF, `'=`, #DIMS initialization), the `\@` ternary operator will be correctly parsed. The only exception is the plain string literal `"..."`.

### Tested Comparison: PRINTL / PRINTFORML / PRINTSL with `\@` and `@"..."`

The following test (with `A = -1`, i.e. `A > 0` is false) clearly demonstrates how three output commands handle `\@` and `@"..."` differently:

```erb
; Assume A = -1 (A > 0 is false)

; ── PRINTL: plain text output, no FORM syntax parsing ──
PRINTL Result is \@ A > 0 ? positive # non-positive \@!
; → Output: Result is \@ A > 0 ? positive # non-positive \@! (literal output)

PRINTL  @"\@ A > 0 ? positive # negative \@"
; → Output: @"\@ A > 0 ? positive # negative \@" (literal output)

; ── PRINTFORML: FORM syntax parsing ──
PRINTFORML Result is \@ A > 0 ? positive # non-positive \@!
; → Output: Result is non-positive! (\@ ternary operator expanded)

PRINTFORML @"\@ A > 0 ? positive # negative \@"
; → Output: @"negative" (@ and " are literal characters in FORM, \@ expanded)
; ⚠️ Note: @"..." is NOT FORM string syntax in PRINTFORML!
;    @ and " are literal characters, only \@ triggers the ternary operator

; ── PRINTSL: expression evaluation ──
PRINTSL @"\@ A > 0 ? positive # negative \@"
; → Output: negative (@"..." is FORM string syntax in expression context, \@ expanded inside)

PRINTSL \@ A > 0 ? positive # negative \@
; → Output: negative (expression context directly recognizes \@ as StrFormWord)
```

!!! warning "`@"..."` in PRINTFORML is NOT FORM String Syntax"

    This is a common point of confusion. In `AnalyseFormattedString` (PRINTFORML's parsing path), `@` and `"` are ordinary characters — `@"..."` is not treated as FORM string syntax. Only in **expression contexts** (PRINTSL, RETURNF, assignment `'=`, etc.) does `@"..."` become FORM string syntax.

    | Command | Meaning of `@"..."` | `\@` Expansion |
    |---------|---------------------|----------------|
    | PRINTFORML | `@` + `"` + content + `"` (all literal) | ✅ (FORM context) |
    | PRINTSL | FORM string syntax (`@"..."` wraps FORM content) | ✅ (FORM context) |
    | PRINTL | `@` + `"` + content + `"` (all literal) | ❌ (plain text) |

---

## Semantic Differences in String Assignment and Initialization

FORM syntax behaves differently in string assignment and initialization, which is a common source of confusion.

> For the complete explanation of assignment statements, see [Assignment](assignment.en.md). This section only covers aspects directly related to FORM syntax.

### Assignment Statement: `=` Uses FORM Syntax

The right side of a string variable assignment `=` is parsed using **FORM syntax**:

```erb
STR:0 = %CALLNAME% arrived       ; ✅ %variable% substitution
STR:0 = Amount is {MONEY}        ; ✅ {} integer interpolation
STR:0 = \@ A>0 ? positive # negative \@  ; ✅ \@ ternary operator
```

Source location: `ArgumentBuilder.cs`, `SP_SET_ArgumentBuilder`. When `op == OperatorCode.Assignment`, it calls `LexicalAnalyzer.AnalyseFormattedString(st, FormStrEndWith.EoL, true)`.

### Assignment Statement: `'= ` Uses Expression Syntax

The right side of a string variable assignment `'= ` is parsed using **expression syntax**:

```erb
STR:0 '= "Hello"              ; ✅ String expression
STR:0 '= TOSTR(A)             ; ✅ Function call
STR:0 '= RESULTS:0 + " world" ; ✅ String concatenation
```

Source location: `ArgumentBuilder.cs`, `SP_SET_ArgumentBuilder`. When `op == OperatorCode.AssignmentStr`, it calls `ExpressionParser.ReduceArguments`.

!!! note "`\@` Still Works with `'= `"

    Although `'= ` uses expression parsing, the lexical analyzer still recognizes `\@` as a `StrFormWord` in expression context, so the `\@` ternary operator works on the right side of `'= `:

    ```erb
    STR:0 '= \@ A>0 ? positive # negative \@  ; ✅ Equivalent to STR:0 = \@ A>0 ? positive # negative \@
    ```

### #DIMS Initialization: `=` Uses Expression Syntax

The `=` initialization in `#DIMS` variable declarations uses **expression syntax**, not FORM syntax:

```erb
#DIMS GREETING = "Hello"        ; ✅ String expression
#DIMS GREETING = %CALLNAME%   ; ❌ Not FORM syntax! % is interpreted as modulo operator
#DIMS GREETING = {MONEY}      ; ❌ Not FORM syntax! { } is interpreted as block delimiter
```

Source location: `UserDefinedVariable.cs`. Initialization values are parsed via `ExpressionParser.ReduceArguments(wc, ArgsEndWith.EoL, false)`, and each initialization value must be a `SingleTerm` (compile-time constant).

!!! danger "Three Pitfalls of #DIMS Initialization"

    1. **`=` is expression evaluation, not FORM expansion** — `%CALLNAME%` will NOT be substituted with the variable's value
    2. **Initialization values must be compile-time constants** — No function calls or variable references (even `\@` ternary operators won't work since the condition part is usually not a constant)
    3. **There is no `'= ` syntax** — Initialization only has `=`, unlike assignment statements which have both `=` and `'= `

### Semantic Difference Summary

| Scenario | Syntax | Parsing Method | FORM Syntax Support | `\@` Support |
|----------|--------|---------------|-------------------|-------------|
| String assignment `=` | `STR = ...` | `AnalyseFormattedString` | ✅ Full support | ✅ |
| String assignment `'= ` | `STR '= ...` | `ExpressionParser.ReduceArguments` | ❌ | ✅ (recognized in expression context) |
| #DIMS initialization `=` | `#DIMS S = ...` | `ExpressionParser.ReduceArguments` | ❌ | Only when constant |
| PRINTFORM argument | `PRINTFORM ...` | `AnalyseFormattedString` | ✅ Full support | ✅ |
| @"..." interior | `@"..."` | `AnalyseFormattedString` | ✅ Full support | ✅ |
| Plain string `"..."` | `"..."` | `ReadString` | ❌ | ❌ (escaped to `@`) |

---

## Skia Variant Floating-Point Extensions

The Skia variant (LazyLoading) introduces the `EraType.Float` floating-point type and extends FORM syntax and type conversion functions accordingly.

### Floating-Point Interpolation in `{}`

In the original Emuera, `{}` only accepts integer expressions. The Skia variant extends `FormatCurlyBrace` to automatically recognize floating-point expressions:

```erb
#DIMF PI = 3.14159
PRINTFORML Pi is {PI}            ; Output: Pi is 3.14159
PRINTFORML Width {PI,10}         ; Output:    3.14159 (right-aligned padding)
PRINTFORML Width {PI,10,LEFT}    ; Output: 3.14159    (left-aligned padding)
```

Source implementation ([StrForm.cs](file:///d:/emuera/emuera_lazyloading_selfmodified_version/Emuera/Runtime/Script/Data/StrForm.cs) `FormatCurlyBrace` class):

```csharp
if (arguments[0].GetEraType() == EraType.Float)
    ret = arguments[0].GetFloatValue(exm).ToString();
else
    ret = arguments[0].GetIntValue(exm).ToString();
```

!!! note "Floating-Point Padding Precision"

    Floating-point to string conversion in `{}` uses C#'s `double.ToString()` default format, which **provides no precision control**. This means:

    - `3.14159265` → `"3.14159265"` (full precision)
    - `3.0` → `"3"` (integer part omits decimal point)
    - `0.0000001` → `"1E-07"` (very small values use scientific notation)

    Use the `TOSTRF` function with `%` substitution when precision is needed (see "Combined Precision and Width Control" below).

> **For the complete API documentation of TO series type conversion functions** (TOSTR / TOSTRF / TOINT / TOFLOAT parameter signatures, format strings, and example code), see [Values, Types & Variables — Type Conversion Functions](../Reference/TOSTR.md). This section only covers aspects directly related to FORM syntax.

### Cross-Reference with FORM Syntax

| FORM Syntax | Original Behavior | Skia Extended Behavior |
|-------------|-------------------|----------------------|
| `{integer expression}` | Integer → String | Unchanged |
| `{float expression}` | ❌ Error | ✅ Float → String (default format) |
| `{expression, width}` | Integer → String + padding | Float also supports padding |
| `%string expression%` | String substitution | Unchanged |

!!! tip "Combined Precision and Width Control"

    **Capability boundaries of the current mechanism**:

    | Need | Syntax | Feasibility |
    |------|--------|-------------|
    | Float → String (default precision) | `{PI}` | ✅ |
    | Float → String + padding | `{PI,10}` | ✅ |
    | Float → String (specified precision) | `TOSTRF(PI, "F2")` | ✅ |
    | Float → String (specified precision + padding) | `%TOSTRF(PI, "F2"),10%` | ✅ |
    | Float → String (specified precision + padding + left align) | `%TOSTRF(PI, "F2"),10,LEFT%` | ✅ |

    **Recommended patterns for precision + padding**:

    ```erb
    #DIMF PI = 3.14159265

    ; ❌ {} cannot control precision
    PRINTFORML {PI}              ; → 3.14159265 (default format)

    ; ✅ TOSTRF + % substitution: precision + right-aligned padding
    PRINTFORML %TOSTRF(PI, "F2"),10%    ; → "      3.14"

    ; ✅ TOSTRF + % substitution: precision + left-aligned padding
    PRINTFORML %TOSTRF(PI, "F2"),10,LEFT% ; → "3.14      "

    ; ✅ Also works inside @"..."
    PRINTS @"%TOSTRF(PI, "F2"),10%"
    ```

    **How it works**: `FormatPercent` in `%expr,width,LEFT%` accepts any string expression as its first argument, so `TOSTRF(PI, "F2")`'s return value can be used directly as `%...%` input while enjoying padding and alignment. `FormatPercent` also correctly handles full-width character widths (via `LangManager.GetStrlenLang`), whereas `FormatCurlyBrace`'s padding does not account for full-width.

!!! warning "Current Limitations and Improvement Directions"

    The current `{}` syntax **does not support a format string parameter**, which is the main gap in floating-point formatting:

    | Syntax | Parameters | Missing Capability |
    |--------|-----------|-------------------|
    `{expr}` | Expression | — |
    `{expr,width}` | Expression + padding width | — |
    `{expr,width,LEFT}` | + Alignment direction | — |
    `{expr,width,LEFT,format}` | + Format string | ❌ **Not supported** |

    **Viable improvement proposals**:

    1. **Extend `TOSTRF` parameters** (recommended, minimal change):
       ```erb
       TOSTRF(float_value, format, width, align)
       ; Example: TOSTRF(PI, "F2", 10, "LEFT") → "3.14      "
       ```
       - Pro: No lexer changes needed, only function parameter extension
       - Con: Inconsistent with `TOSTR`'s parameter pattern (TOSTR's format is the 2nd parameter)

    2. **Extend `{}` syntax to support format strings**:
       ```erb
       {PI,10,LEFT,"F2"}  ; or {PI:"F2",10}
       ```
       - Pro: More intuitive syntax, similar to C# interpolated strings
       - Con: Requires modifying `LexicalAnalyzer.AnalyseFormattedString` and `FormatCurlyBrace`, large impact area

    3. **New `FORMATF` function** (similar to `STRFORM` but for floats):
       ```erb
       FORMATF("{0:F2}", PI)  ; → "3.14"
       ```
       - Pro: High generality, can reuse C# formatting
       - Con: Overlaps with existing `STRFORM` functionality

    **Current recommendation**: Proposal 1 (extend `TOSTRF`), as it has minimal changes and is compatible with the existing `TOSTRF` + `%...%` workaround.

    > **Complete TO series function documentation**: [Values, Types & Variables — Type Conversion Functions](../Reference/TOSTR.md)

---

## Triple Symbol Expansion

### Syntax

| Triple Symbol | Expands To | Meaning |
|--------------|-----------|---------|
| `***` | `NAME:TARGET` | Target character's name |
| `+++` | `CALLNAME:MASTER` | Master's call name |
| `===` | `CALLNAME:PLAYER` | Player's call name |
| `///` | `NAME:ASSI` | Assistant's name |
| `$$$` | `CALLNAME:TARGET` | Target character's call name |

### Examples

```erb
PRINTFORML *** has arrived!     ; → NAME:TARGET + " has arrived!"
PRINTFORML +++ attacked ===     ; → CALLNAME:MASTER + " attacked " + CALLNAME:PLAYER
```

### Detection Rules

Triple symbol detection is implemented in `CharStream.TripleSymbol()`:

```csharp
public bool TripleSymbol()
{
    if (pointer + 3 > source.Length)
        return false;
    return source[pointer] == source[pointer + 1] && source[pointer] == source[pointer + 2];
}
```

**Key rule**: Any **three consecutive identical characters** where the character is one of `* + = / $` will be recognized as a triple symbol. This means:

- `++++` → The first `+++` is expanded, leaving one `+` as a regular character
- `+++++` → The first `+++` is expanded, then `++` is not (only two)
- `======` → Two `===` expanded consecutively

### Configuration Option

The `SystemIgnoreTripleSymbol` configuration item (default `false`) can disable triple symbol expansion. When enabled, `+++` etc. are treated as regular characters.

!!! danger "The PRINTFORML === Trap"

    ```erb
    PRINTFORML ===
    ```

    This line will **not** output `===`! It expands to the value of `CALLNAME:PLAYER`.

    If you actually want to output `===`, you need to escape it:

    ```erb
    PRINTFORML \=\=
    ```

    Or enable the `SystemIgnoreTripleSymbol` configuration.

    Similarly, `PRINTFORML +++` expands to `CALLNAME:MASTER`, and `PRINTFORML ***` expands to `NAME:TARGET`.

---

## Escape Rules

`\` is the escape prefix in FORM strings. Its behavior depends on the character that follows:

### Escapes in FORM Strings (`AnalyseFormattedString`)

| Escape Sequence | Result | Description |
|----------------|--------|-------------|
| `\s` | Half-width space ` ` | |
| `\S` | Full-width space `　` | |
| `\t` | Tab `\t` | |
| `\n` | Newline `\n` | |
| `\@` | Start of `\@` ternary operator | Special handling |
| `\\` | `\` | Backslash itself |
| `\%` | `%` | Percent sign (no longer triggers variable substitution) |
| `\{` | `{` | Left curly brace (no longer triggers interpolation) |
| `\"` | `"` | Double quote |
| `\other` | That character | `\` is consumed |

### Escapes in Regular Strings (`ReadString`)

Regular strings (literal strings wrapped in `"..."`) have similar escape rules but **no `\@`**:

| Escape Sequence | Result |
|----------------|--------|
| `\s` | Half-width space |
| `\S` | Full-width space |
| `\t` | Tab |
| `\n` | Newline |
| `\other` | That character |

### Key Differences

!!! warning "Escape differences between FORM strings and regular strings"

    - In FORM strings, `\@` is the start marker for the ternary operator
    - In regular strings, `\@` is escaped to `@` (`\` consumed, `@` remains)
    - In FORM strings, `\` before `%`, `{`, `"` etc. escapes their special meaning
    - In regular strings, `%`, `{` have no special meaning and don't need escaping

### Practical Escape Examples

```erb
; Output literal %RESULTS%
SAVESTR:0 = \%RESULTS\%

; Output literal {A}
PRINTFORML Variable A syntax is \{A\}

; Output backslash itself
PRINTFORML Path is C\\Program Files

; Output === literally (avoid triple symbol expansion)
PRINTFORML \=\= (escape first two, third = doesn't form a triple)
; Or
PRINTFORML \=== (escape first one, remaining == doesn't form a triple)
```

---

## FORM Strings as Command Arguments

### FORM_STR_ANY Argument Type

Commands that use FORM syntax (such as `PRINTFORM`, `RETURNFORM`, `PUTFORM`, etc.) have arguments of type `FORM_STR_ANY`. The builder for this argument type is `FORM_STR_ANY_ArgumentBuilder`.

### Comma-Separated FORM Arguments

`FORM_STR_ANY` arguments use **commas** to separate multiple FORM strings:

```erb
RETURNFORM %RESULTS%, {RESULT}
; Two arguments: %RESULTS% and {RESULT}
```

**Key mechanism**: When `AnalyseFormattedString` encounters a comma and `endWith == FormStrEndWith.Comma`, it **stops parsing the current FORM string**. This means commas are **delimiters** in `FORM_STR_ANY` arguments, not part of the FORM string.

```erb
; If you want to include a comma in a FORM string:
PRINTFORM Hello\,World    ; Escape comma? Not possible!
PRINTFORM Hello,World      ; Will be treated as two arguments
```

!!! danger "You cannot include commas in FORM strings"

    Since commas are delimiters for `FORM_STR_ANY` and the FORM escape rules **do not include `\,`**, you cannot directly output a comma in a `FORM_STR_ANY` argument.

    Workarounds:

    ```erb
    ; Option 1: Use string expression
    PRINTS "Hello,World"

    ; Option 2: Use @"..." syntax
    PRINTS @"Hello,World"
    ```

### Function Name Part in CALLFORM Series

The function name part of `CALLFORM`/`JUMPFORM`/`GOTOFORM` etc. uses `FormStrEndWith.LeftParenthesis_Bracket_Comma_Semicolon` termination — parsing stops when encountering `(`, `[`, `,`, or `;`:

```erb
CALLFORM FUNC_%TARGET%(ARG:0, ARG:1)
;       ^^^^^^^^^^^^^^^^  Function name part (FORM string)
;                       ^^^^^^^^^^  Argument part (expressions)
```

This means the function name part **cannot contain** `(`, `[`, `,`, or `;`.

### Interaction with `;` Comment Marker

In `FORM_STR_ANY` arguments, `;` is **not** a terminator — the FORM string is parsed all the way to end of line. This differs from some commands (like `PRINT`) where `;` is treated as a comment:

```erb
PRINT Hello;World      ; Outputs "Hello;World" (; is part of the string)
PRINTFORM Hello;World  ; Outputs "Hello;World" (; is part of the FORM string)
```

However, in `CALLFORM`'s function name part, `;` terminates function name parsing.

---

## STRFORM Function — Runtime FORM Expansion

The `STRFORM` function accepts a string argument and expands it as a FORM string:

```erb
#DIMS FORM_STR = "Name is %NAME:0%, value is {A}"
RESULTS = STRFORM(FORM_STR)
```

!!! warning "STRFORM is runtime expansion"

    Unlike `PRINTFORM`'s compile-time parsing, `STRFORM` calls `AnalyseFormattedString` at **runtime** to re-parse the string. This means:

    - If the passed string contains FORM syntax errors, an exception is thrown at runtime
    - You can dynamically construct FORM strings and then expand them

    Source implementation ([Creator.Method.cs](https://github.com/Emuera/EmueraDotNet/blob/main/Runtime/Script/Statements/Function/Creator.Method.cs) `StrFormMethod` class):

    ```csharp
    StrFormWord wt = LexicalAnalyzer.AnalyseFormattedString(new CharStream(str), FormStrEndWith.EoL, false);
    StrForm strForm = StrForm.FromWordToken(wt);
    destStr = strForm.GetString(exm);
    ```

---

## Internal Architecture of FORM Syntax

### Three Phases: Parse → Expand → Render

```
Source String
    │
    ▼  LexicalAnalyzer.AnalyseFormattedString()
StrFormWord (strs[] + SubWord[])
    │     strs: static text fragments
    │     SubWord: dynamic replacement points
    │       ├─ CurlyBraceSubWord  → {} integer interpolation
    │       ├─ PercentSubWord     → %% string substitution
    │       ├─ TripleSymbolSubWord → +++ etc. triple symbols
    │       └─ YenAtSubWord       → \@ ternary operator
    │
    ▼  StrForm.FromWordToken()
StrForm (strs[] + AExpression[])
    │     Converts SubWords to AExpressions (expression nodes)
    │     Triple symbols → pre-built FunctionMethodTerm
    │     {} → FormatCurlyBrace
    │     %% → FormatPercent
    │     \@ → FormatYenAt
    │
    ▼  StrForm.GetString()
Final String
    │     Alternately concatenates strs[i] + terms[i].GetStrValue()
```

### FormStrEndWith — Termination Condition Enum

FORM string parsing is controlled by the `FormStrEndWith` enum for termination conditions:

| Enum Value | Termination Characters | Usage |
|-----------|----------------------|-------|
| `EoL` | End of line | `PRINTFORM` etc. command arguments |
| `DoubleQuotation` | `"` | FORM strings inside `@"..."` |
| `Sharp` | `#` | True-value part of `\@` ternary |
| `YenAt` | `\@` | False-value part of `\@` ternary |
| `Comma` | `,` | `FORM_STR_ANY` arguments |
| `LeftParenthesis_Bracket_Comma_Semicolon` | `(` `[` `,` `;` | Function name part of `CALLFORM` series |

### Constant Folding Optimization

If all dynamic parts of a FORM string can be determined at compile time, `StrForm` performs **constant folding** — merging all `SingleTerm`s into a single pure string, avoiding runtime evaluation:

```csharp
// Optimization logic in StrForm.Restricture()
if (termList[i] is SingleTerm)
{
    string str = termList[i].GetStrValue(exm);
    strList[i] = strList[i] + str + strList[i + 1];
    termList.RemoveAt(i);
    strList.RemoveAt(i + 1);
    i--;
}
```

If the entire FORM string is constant, `StrForm.IsConst` returns `true`, and `ToStrFormTerm()` returns `SingleStrTerm` directly instead of `StrFormTerm`.

---

## Speculating on the Origins of FORM Syntax

FORM syntax was not designed from scratch — it evolved gradually from simple variable substitution in the eramaker era.

### The eramaker Era

eramaker only supported two FORM syntax features:

1. `%VariableName%` — String variable substitution (only simple variable names, no expressions)
2. `{VariableName}` — Integer variable display (only simple variable names, no expressions)

```erb
; eramaker syntax
PRINTFORM Name is %NAME:0%, money is {MONEY}
```

eramaker **did not have**:

- Expression evaluation inside `{}`
- String expressions inside `%%`
- Padding and alignment (width specification)
- `\@` ternary operator
- Triple symbol expansion
- Escape rules (`\` has no special meaning in eramaker)
- `@"..."` syntax

### Emuera's Extensions

Emuera added the following while maintaining eramaker compatibility:

1. **Expression support inside `{}`** — No longer limited to simple variable names
2. **String expression support inside `%%`** — Same
3. **Padding and alignment** — `{variable,width,LEFT/RIGHT}` and `%variable,width,LEFT/RIGHT%`
4. **Escape rules** — `\s`, `\S`, `\t`, `\n`, `\%`, `\{`, `\\`
5. **`\@` ternary operator** — Inspired by C's ternary operator, but using `#` instead of `:` (since `:` is the array index delimiter in ERABASIC)
6. **Triple symbols** — Shortcuts for frequently used character names
7. **`@"..."` syntax** — Enabling FORM syntax in expression contexts
8. **STRFORM function** — Runtime FORM expansion

### Design Philosophy

The evolution of FORM syntax embodies ERABASIC's core design philosophy: **incrementally adding expression capabilities within the command syntax framework**.

- `%Variable%` and `{Variable}` reflect **command syntax** thinking — using special markers to "cut holes" in strings for value insertion
- `@"..."` reflects **expression syntax** thinking — treating FORM strings as expression values
- `\@ ? # \@` is a **hybrid** of both — embedding conditional expressions within FORM strings

This mixing creates the **deep coupling** between FORM syntax and the expression system, which is the root cause of many confusing behaviors.

---

## Common Pitfalls Quick Reference

| Pitfall | Cause | Solution |
|---------|-------|----------|
| `PRINTFORML ===` doesn't output `===` | `===` is a triple symbol, expands to `CALLNAME:PLAYER` | Escape with `\=\=` or `\===` |
| `PRINTFORML +++` doesn't output `+++` | `+++` expands to `CALLNAME:MASTER` | Same as above |
| `PRINTFORM @"..."` outputs `@"..."` literally | `PRINTFORM` doesn't need `@"` | Write `PRINTFORM ...` directly |
| Can't output comma in FORM string | Comma is a `FORM_STR_ANY` delimiter | Use `PRINTS @"..."` or string expression |
| `#` in `\@` ternary treated as comment | It's not; `#` is the ternary delimiter in FORM | Use normally |
| `STR:0 = %RESULTS%` behaves differently in eramaker | eramaker doesn't expand `%` | Use `\%RESULTS\%` for compatibility |
| Full-width character padding width is wrong | Padding length calculated by system encoding byte count | Understand `LangManager`'s encoding dependency |
| `{A,10}` where A is a string variable | `{}` only accepts integer expressions | Use `%STR,10%` instead |

---

## Syntax Quick Reference

```
FORM String Syntax (PRINTFORM arguments / inside @"..."):

  Plain text            → Output as-is
  %string_expression%   → Substitute with string value
  %expression,width%    → Substitute with right-aligned padding
  %expression,width,LEFT% → Substitute with left-aligned padding
  {integer_expression}  → Evaluate and convert to string
  {expression,width}    → Convert to string with right-aligned padding
  {expression,width,LEFT} → Convert to string with left-aligned padding
  \@ condition ? true # false \@ → Output true value if condition is true, false value otherwise
  ***                   → NAME:TARGET
  +++                   → CALLNAME:MASTER
  ===                   → CALLNAME:PLAYER
  ///                   → NAME:ASSI
  $$$                   → CALLNAME:TARGET
  \s                    → Half-width space
  \S                    → Full-width space
  \t                    → Tab
  \n                    → Newline
  \\                    → Backslash
  \%                    → Percent sign (doesn't trigger substitution)
  \{                    → Left curly brace (doesn't trigger interpolation)
  \"                    → Double quote
  \other                → That character (\ is consumed)
```
