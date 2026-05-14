# Basic Output

!!! info "Corresponding Manual Sections"

    - **Reference Category**: [PRINT related](../Reference/README.en.md#print) / [Display & Font](../Reference/README.en.md#display-font)
    - [PRINT Series](../Reference/PRINT.en.md) — Complete API reference for PRINT instructions
    - [PRINTSINGLE Series](../Reference/PRINTSINGLE.en.md) — Single-line output instructions
    - [PRINTDATA Series](../Reference/PRINTDATA.en.md) — Data output instructions

***

## Overview

Output is the primary way ERABASIC programs interact with the player. All output is done through the PRINT series of instructions, which follow a unified naming convention:

```
PRINT(parameter_type)(modifier)(behavior_suffix)
```

| Component | Options | Meaning |
| -------- | ------------------------ | ---------------------- |
| **Parameter type** | None / V / S / FORM / FORMS | Determines how the parameter is parsed |
| **Modifier** | K / D | K=force kana conversion, D=ignore SETCOLOR |
| **Behavior suffix** | None / L / W / N | Whether to add a newline, whether to wait for input |

!!! note "eramaker Compatibility"
    `PRINT`/`PRINTL`/`PRINTW`/`PRINTV`/`PRINTVL`/`PRINTS`/`PRINTSL`/`PRINTFORM`/`PRINTFORML`/`PRINTFORMW` have existed since eramaker. `PRINTK`/`PRINTD`/`PRINTDATA` series/`PRINTSINGLE` series etc. are Emuera extensions.

***

## The Most Basic Output

### PRINT — Output without newline

```erb
PRINT Hello
PRINT World
; Output: HelloWorld (no newline, two text segments concatenated)
```

The text after `PRINT` is a **simple string** — no quotes needed, no variable substitution performed.

### PRINTL — Output with newline

```erb
PRINTL Hello
PRINTL World
; Output:
; Hello
; World
```

`PRINTL` = `PRINT` + `L` (Line), the most commonly used output instruction. Automatically moves to the next line after output.

### Standalone Newline

```erb
PRINTL              ; Outputs an empty line
```

`PRINTL` without parameters outputs only a newline.

***

## Parameter Types: Five PRINT Variants

PRINT series instructions are divided into five variants based on parameter type, each parsing parameters differently:

| Instruction | Parameter Type | Parameter Parsing | Example |
| ------------ | --------- | ------------------ | ----------------------- |
| `PRINT` | Simple string | Output as-is, no substitution | `PRINT Hello` |
| `PRINTV` | Expression list (each evaluated independently) | Integer→number, String→text, auto-concatenated | `PRINTV A + B, "pts"` |
| `PRINTS` | String expression | Evaluate then output | `PRINTS NAME:TARGET` |
| `PRINTFORM` | Formatted string | FORM syntax, supports interpolation | `PRINTFORM Hello, %NAME%!` |
| `PRINTFORMS` | Formatted string expression | Evaluate as string first, then parse as FORM | `PRINTFORMS L_TEMPLATE` |

### PRINT — Simple String

`PRINT` outputs the following text as-is, without any variable substitution:

```erb
PRINT Hello, World          ; → Hello, World
PRINT %NAME%              ; → %NAME% (percent signs are literal text!)
PRINT %RESULTS%           ; → %RESULTS% (percent signs are literal text!)
```

!!! warning "PRINT does not perform variable substitution"

    The text after `PRINT` is plain text; `{variable}` and `%variable%` are not substituted. Use `PRINTFORM` when you need variable substitution.

### PRINTV — Expressions (Integer · String)

`PRINTV` evaluates the following content as **expressions** and outputs the result. Each parameter is evaluated independently: **integer expressions output numbers, string expressions output text**:

```erb
#DIM L_VAL = 42
PRINTV L_VAL              ; → 42
PRINTV L_VAL * 2          ; → 84
PRINTV 10 + 20            ; → 30

#DIMS L_NAME = "Elina"
PRINTV L_NAME             ; → Elina (string variable)
PRINTV L_NAME + "'s adventure"  ; → Elina's adventure (string expression)
```

`PRINTV` can accept multiple expressions separated by commas, concatenated in output. Each parameter's type can differ:

```erb
PRINTV L_VAL, "pts"        ; → 42pts (integer + string)
PRINTV L_VAL, "pts", L_NAME ; → 42ptsElina (integer + string + string variable)
```

!!! tip "PRINTV parameters are expressions, not FORM strings"

    `PRINTV` uses `SP_PRINTV_ArgumentBuilder`, parsing parameters as an expression list.
    Each parameter item is evaluated independently: integer expressions output numbers, string expressions output text.
    Therefore `PRINTV` can mix integer and string parameters without unifying types.

### PRINTS — String Expression

`PRINTS` evaluates the following content as a **string expression** and outputs the result:

```erb
#DIMS L_NAME '= "Elina"
PRINTS L_NAME             ; → Elina
PRINTS L_NAME + "'s adventure"  ; → Elina's adventure
PRINTS "Hello"            ; → Hello
```

### PRINTFORM — Formatted String

`PRINTFORM` is the most commonly used formatted output instruction, supporting FORM syntax variable substitution:

```erb
#DIM L_MONEY = 500
PRINTFORM Hello, %NAME:TARGET%!       ; → Hello, Elina!
PRINTFORM Money: {L_MONEY}g            ; → Money: 500g
PRINTFORM %NAME:TARGET%'s adventure          ; → Elina's adventure
```

| FORM Syntax | Function | Example |
| --------------- | --------- | ---------------------------------- |
| `{expression}` | Integer/Float interpolation | `{MONEY}` → `500` |
| `{expression,width}` | Padded interpolation | `{MONEY,8}` → `     500` |
| `{expression,width,LEFT}` | Left-aligned padding | `{MONEY,8,LEFT}` → `500     ` |
| `%expression%` | String interpolation | `%NAME%` → `Elina` |
| `%expression,width%` | Padded string interpolation | `%NAME%,10%` → `    Elina` |

> For complete FORM syntax documentation, see [FORM Syntax](form-syntax.en.md).

### PRINTFORMS — Formatted String Expression

`PRINTFORMS` first evaluates the parameter as a string expression, then performs FORM parsing on the result — meaning you can dynamically construct FORM syntax strings using expressions, like assembling HTML:

```erb
; Even variable names inside %...% are dynamically constructed
#DIMS L_VARNAME = "NAME:TARGET"
#DIMS L_TEMPLATE
L_TEMPLATE '= "Hello, %" + L_VARNAME + "%!"
; After evaluation L_TEMPLATE → "Hello, %NAME:TARGET%!"

PRINTFORMS L_TEMPLATE      ; First evaluate L_TEMPLATE, then FORM parse → Hello, Elina!
```

Difference between `PRINTFORMS` and `PRINTFORM`:

| <br /> |   `PRINTFORM`  |      `PRINTFORMS`     |
| ------ | :------------: | :-------------------: |
| Parameter | FORM string (parsed directly) | String expression (evaluate first, then FORM parse) |
| Typical use | Fixed template | Dynamic template (FORM string constructed at runtime) |

***

## Behavior Suffixes: L / W / N

All PRINT variants can have behavior suffixes added to control actions after output:

| Suffix | Meaning | Example |
| --- | --------------------- | ----------- |
| None | No newline, no wait | `PRINT Hello` |
| `L` | Newline after output | `PRINTL Hello` |
| `W` | Newline after output and wait for keypress | `PRINTW Hello` |
| `N` | No newline but wait for keypress (DotNet addition) | `PRINTN Hello` |

### Combination Examples

```erb
; PRINTFORM + L = PRINTFORML
PRINTFORML Hello, %NAME:TARGET%!

; PRINTS + W = PRINTSW
PRINTSW "Press any key to continue..."

; PRINTV + L = PRINTVL
PRINTVL A + B
```

!!! tip "Difference between PRINTW and WAIT"

    `PRINTW` = `PRINTL` + `WAIT`. `WAIT` alone also waits for a keypress but outputs no text.

### PRINTN — No Newline but Wait for Keypress

```erb
PRINTN Press any key to continue...
PRINTL Text after keypress
; Before keypress: Press any key to continue...
; After keypress: Press any key to continue...Text after keypress (same line)
```

`PRINTN` = `PRINT` + `N` (No line end). Unlike `PRINTW` — `PRINTW` outputs, adds a newline, and waits; `PRINTN` outputs and waits, but **marks the line as "unfinished"** — subsequent output is appended horizontally to the end of the current line instead of starting a new line.

!!! tip "Typical use of PRINTN"

    PRINTN is suitable for scenarios requiring inline waiting, such as progressively expanding text effects, dialogue lines that need player confirmation before showing subsequent content, etc.

    ```erb
    ; Wrong: Using PRINT + WAIT to simulate inline waiting
    PRINT Please wait...
    WAIT
    ; → Content before WAIT is not visible in the buffer; after keypress it flushes to screen and forces a newline

    ; Correct: Using PRINTN for inline waiting
    PRINTN Please wait...
    ; → Text is displayed immediately, waits for keypress, subsequent content appended to same line
    ```

> `PRINTN` is a DotNet-added behavior suffix, introduced with emuera.EM support.

***

## Outputting Numbers

### PRINTVL — Output Expression with Newline

`PRINTVL` is the combination of `PRINTV` + `L`, outputting the expression value with a newline (integer expression→number, string expression→text):

```erb
#DIM L_VAL = 42
PRINTVL L_VAL              ; → 42
PRINTVL L_VAL * 2 + 1      ; → 85
```

### Outputting Numbers in FORM Strings

Use `{expression}` to insert numeric values in formatted strings:

```erb
#DIM L_HP = 80
#DIM L_MAXHP = 100
PRINTFORML HP: {L_HP}/{L_MAXHP}        ; → HP: 80/100
PRINTFORML HP: {L_HP,5}/{L_MAXHP,5}    ; → HP:    80/  100
```

### Outputting Floats (Skia Variant)

Floats in `{}` use the default `ToString()` format output, but `{}` does not support precision control. To specify precision, use the `TOSTRF` function to convert the float to a string, then output via `%` substitution (`TOSTRF` returns a string, so you must use `%...%` not `{}`):

```erb
#DIMF L_PI = 3.14159265
PRINTFORML Pi: {L_PI}                ; → Pi: 3.14159265 ({} default format, no precision control)
PRINTFORML Pi: %TOSTRF(L_PI, "F2")%   ; → Pi: 3.14 (%...% string substitution + TOSTRF precision control)
```

***

## Output Colors

### SETCOLOR — Set Text Color

```erb
SETCOLOR 0xFF0000          ; Red (RGB hexadecimal)
PRINTL This is red text
SETCOLOR 0x00FF00          ; Green
PRINTL This is green text
SETCOLORBYNAME yellow      ; Set by color name
PRINTL This is yellow text
RESETCOLOR                 ; Restore default color
```

### PRINTD — Ignore Color Settings

The `PRINTD` series ignores `SETCOLOR` settings and always outputs in the default color:

```erb
SETCOLOR 0xFF0000
PRINTL This is red
PRINTDL This is default color (ignores SETCOLOR)
```

### TEXT\_BGC\_ON / TEXT\_BGC\_OFF — Text Background Color (SK Exclusive)

The Skia version provides `TEXT_BGC_ON` / `TEXT_BGC_OFF` to set background color for entire lines:

```erb
TEXT_BGC_ON 255, 0, 0, 30       ; Red background, 30% opacity
PRINTL This line has a red background
TEXT_BGC_OFF                     ; Turn off background color
```

See [TEXT\_BGC Reference](../Reference/TEXT_BGC.en.md).

***

## Other Output Instructions

### DRAWLINE — Draw Separator Line

```erb
DRAWLINE                    ; Draws a horizontal line
```

### PRINTSINGLE — Single-Line Output

The `PRINTSINGLE` series always displays within a single line; characters exceeding the screen edge are not displayed. Auto-wraps, no L/W suffixes:

```erb
PRINTSINGLEFORM Very long text...    ; No wrapping, excess truncated
```

### PRINTDATA — Data Output

`PRINTDATA` randomly selects one from multiple `DATA` items to output:

```erb
PRINTDATA
    DATA Apple
    DATA Orange
    DATA Banana
ENDDATA
; Randomly outputs one fruit
```

### PRINTPLAIN — Output Without Generating Buttons { #prinTPLAIN-overview }

`PRINTPLAIN`'s `PLAIN` modifier semantics mean **no buttons are generated** — `[number]` in the text is not converted to clickable interactive buttons.

`PLAIN` and `FORM` are two **orthogonal** modifier dimensions that can be freely combined:

| Dimension | Controls | Options |
|------|---------|-------|
| `FORM` | Whether to perform `%variable%`/`{expression}` interpolation | Yes = interpolate (`FORM_STR` parameter type) / No = no interpolation (`STR` parameter type) |
| `PLAIN` | Whether to convert `[number]` to buttons | Yes = no buttons / No = normal button generation |

Specific combinations:

| Instruction | Parameter Type | FORM Interpolation | Generate Buttons |
|------|---------|:--------:|:--------:|
| `PRINT` | `STR` | ❌ | ✅ |
| `PRINTFORM` | `FORM_STR` | ✅ | ✅ |
| `PRINTPLAIN` | `STR_NULLABLE` | ❌ | ❌ |
| `PRINTPLAINFORM` | `FORM_STR_NULLABLE` | ✅ | ❌ |

`PRINTPLAIN` uses the `STR_NULLABLE` parameter type (same as `PRINT`, no FORM interpolation), and the `PLAIN` modifier prevents button generation:

```erb
PRINTPLAIN %NAME%           ; → %NAME% (STR_NULLABLE, no FORM interpolation; PLAIN, no buttons)
PRINTPLAINFORM %NAME%       ; → Elina (FORM_STR_NULLABLE, FORM interpolation; PLAIN, no buttons)
```

This means during `INPUT` blocking, `[0]`, `[100]`, etc. remain as plain text; users cannot click to input values and must type manually:

```erb
PRINT [0] Click me           ; → Clickable button, clicking auto-inputs 0
PRINTPLAIN [0] Cannot click me    ; → Plain text, not clickable, must type manually
INPUT
```

For detailed mechanism, see [Buttons in Output — PRINTPLAIN](#prinTPLAIN) and [PRINTPLAIN Reference](../Reference/PRINTPLAIN.en.md).

***

## PRINT Series Quick Reference

| Instruction | Parameter Type | Newline | Equivalent |
| ----------------- | ----------- | ---- | --------------------- |
| `PRINT text` | Simple string | ❌ | — |
| `PRINTL text` | Simple string | ✅ | `PRINT` + newline |
| `PRINTW text` | Simple string | ✅+wait | `PRINTL` + `WAIT` |
| `PRINTN text` | Simple string | ❌ (line merge) | `PRINT` + display + `WAIT` + line merge |
| `PRINTV expr` | Expression (integer·string) | ❌ | — |
| `PRINTVL expr` | Expression (integer·string) | ✅ | `PRINTV` + newline |
| `PRINTS expr` | String expression | ❌ | — |
| `PRINTSL expr` | String expression | ✅ | `PRINTS` + newline |
| `PRINTFORM format` | FORM string | ❌ | — |
| `PRINTFORML format` | FORM string | ✅ | `PRINTFORM` + newline |
| `PRINTFORMW format` | FORM string | ✅+wait | `PRINTFORML` + `WAIT` |
| `PRINTFORMS expr` | FORM string expression | ❌ | — |
| `PRINTFORMSL expr` | FORM string expression | ✅ | `PRINTFORMS` + newline |

***

## Buttons in Output

### `[N]` Auto Buttons

You've already seen `[0]` automatically becoming a button in [Hello World](hello-world.en.md). Here are more details:

**Recognition rule**: The `[integer]` pattern is automatically recognized as a button core by the engine. Only integers work — `[abc]`, `[1.5]`, `[]` will not generate buttons.

**Button range**: When a line has only one `[N]`, **the entire line is the button area**:

```erb
PRINTL [0] Start Game     ; Clicking "Start Game" or "[0]" is equivalent to inputting 0
```

**Multi-button lines**: When a line has multiple `[N]`s, the engine splits them into independent buttons by space intervals:

```erb
PRINT [0] Yes    [1] No
INPUT
; Two independent buttons: Click "Yes" → RESULT=0, Click "No" → RESULT=1
```

!!! warning "Edge cases with multi-button splitting"

    When `[N]` and description text are arranged irregularly on a line, automatic splitting may not match expectations. Use `PRINTBUTTON` to explicitly create buttons in such cases (see [HTML Tag Syntax](html-syntax.en.md)).

### PRINTPLAIN — Output Without Generating Buttons { #prinTPLAIN }

`PRINTPLAIN` outputs text but **does not generate buttons**, even if the text contains `[0]`:

```erb
PRINTPLAIN [0] This is not a button    ; Output as-is, not clickable
```

**Key difference**: In an `INPUT` blocking scenario, `PRINT [0] Click` generates a clickable button that automatically passes `0` to `INPUT`; while `PRINTPLAIN [0] Not clickable` has `[0]` as plain text — the user must manually type `0` for `INPUT` to receive it. For details, see "Other Output Instructions" section [PRINTPLAIN — Output Without Generating Buttons](#prinTPLAIN-overview).

`PRINTPLAINFORM` works the same way: `[1]` in `PRINTPLAINFORM Price is {PRICE}g, select [1] Buy` also **does not** generate a button. `PRINTPLAINFORM` does perform FORM interpolation (`{PRICE}` is expanded to its numeric value).

***

## Common Pitfalls

| Pitfall | Wrong | Correct | Reason |
| ------------- | ----------------- | ----------------------------- | ----------------- |
| Expecting variable substitution in PRINT | `PRINT %NAME%` | `PRINTFORM %NAME%` | PRINT doesn't do FORM interpolation |
| PRINTS without quotes | `PRINTS hello` | `PRINTS "hello"` | Without quotes, treated as variable name |
| Forgetting newline | `PRINT Hello` | `PRINTL Hello` | PRINT doesn't add newline, content sticks together |
| Float precision in FORM | `PRINTFORM {PI}` | `PRINTFORM %TOSTRF(PI,"F2")%` | `{}` has no precision control for floats; TOSTRF returns string, must use `%...%` |
| `[abc]` expecting button | `PRINTL [abc] Option` | `PRINTL [0] Option` | Only `[integer]` generates buttons |
| `PRINTPLAIN` expecting buttons | `PRINTPLAIN [0] OK [1] Cancel\nINPUT` | `PRINT [0] OK [1] Cancel\nINPUT` | `PRINTPLAIN` doesn't generate buttons; users must type manually |

***

## Next Steps

| What you want to learn | Go to |
| :----------- | :----------------------------------- |
| FORM syntax details | [FORM Syntax](form-syntax.en.md) |
| Assignment statements | [Assignment Statements](assignment.en.md) |
| Values, types & variables | [Values, Types & Variables](values-types.en.md) |
| Input & waiting | [INPUT Instruction](../Reference/INPUT.en.md) |
| PRINT complete API | [PRINT Series](../Reference/PRINT.en.md) |
