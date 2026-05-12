# Hello World

!!! info "Corresponding Manual Sections"

    - [ERB Format](../eramaker/ERB_format.en.md) — eramaker's ERB format (historical reference)
    - [System Flow](../Emuera/system_flow.en.md) — Engine startup and function call flow

---

## Your First ERB Program

Write your first function in `ERB/SYSTEM_TITLE.ERB`:

```erb
@SYSTEM_TITLE
    PRINTL Welcome to the era world!
    PRINTL [0] Start Game
    PRINTL [1] Load Save
    INPUT
    IF RESULT == 0
        BEGIN FIRST
    ELSEIF RESULT == 1
        BEGIN LOADGAME
    ENDIF
```

### Line-by-line Explanation

| Line | Meaning |
|----|------|
| `@SYSTEM_TITLE` | Function label line, defines a function named `SYSTEM_TITLE`. The engine automatically calls this function on the title screen |
| `PRINTL Welcome to the era world!` | Outputs a line of text and moves to the next line. `PRINTL` = PRINT + Line |
| `PRINTL [0] Start Game` | Outputs option text; `[0]` automatically becomes a clickable button (see explanation below) |
| `INPUT` | Waits for the user to input a number, stores the result in `RESULT` |
| `IF RESULT == 0` | Checks whether the user input is 0 |
| `BEGIN FIRST` | Transitions to the game start flow |
| `BEGIN LOADGAME` | Transitions to the load save flow |

### `[N]` Button Syntax

The line `PRINTL [0] Start Game` contains a special ERABASIC engine behavior: `[0]` in the text is automatically recognized as a **clickable button**.

**What you need to know right now**:

- `[integer]` in PRINTL output becomes a clickable button
- Clicking the button is equivalent to entering that number during INPUT (clicking `[0]` → `RESULT = 0`)
- Buttons can only be clicked when `INPUT` (or `INPUTS`) is waiting for input
- **The entire line is the button area** — not just `[0]`, "Start Game" is also clickable

```erb
; These two input methods are equivalent:
PRINTL [0] Start Game
INPUT
; Method 1: Click "Start Game" → RESULT = 0
; Method 2: Type 0 on keyboard → RESULT = 0
```

!!! tip "Progressive Learning"

    `[N]` buttons are the most common pattern in ERABASIC, but their underlying mechanism involves **deep coupling between the output and input systems**. This tutorial covers them progressively:

    | Stage | What you'll learn | Where |
    |------|---------|--------|
    | Now | `[N]` creates buttons, INPUT activates buttons | This page |
    | Basic Output | Button display behavior, PRINTPLAIN doesn't generate buttons | [Basic Output](basic-output.en.md) |
    | Functions & CALL | Complete INPUT/INPUTS usage, default values, RESULT preservation | [Functions & CALL](call.en.md) |
    | HTML & Graphics | PRINTBUTTON explicit buttons, HTML `<button>` tags | [HTML Tag Syntax](html-syntax.en.md) |

### How to Run

1. Place `Emuera.exe` in the game root directory
2. Create `SYSTEM_TITLE.ERB` in the `ERB/` folder
3. Double-click `Emuera.exe` to start

---

## Second Program: Custom Function

```erb
@SYSTEM_TITLE
    CALL GREET("Hero")
    PRINTL [0] Start Game
    INPUT
    IF RESULT == 0
        BEGIN FIRST
    ENDIF

@GREET(ARGS:0)
    PRINTFORM Welcome, %ARGS:0%!
    PRINTL Your adventure begins.
RETURN
```

### Line-by-line Explanation

| Line | Meaning |
|----|------|
| `CALL GREET("Hero")` | Calls function `GREET`, passing string parameter `"Hero"` |
| `@GREET(ARGS:0)` | Function label line; `ARGS:0` is the built-in string parameter variable |
| `PRINTFORM Welcome, %ARGS:0%!` | Formatted output; `%ARGS:0%` is replaced with the parameter value |
| `RETURN` | Function returns |

---

## Third Program: Expression Function

```erb
@SYSTEM_TITLE
#DIM L_RESULT
    L_RESULT = ADD(3, 5)
    PRINTFORM 3 + 5 = {L_RESULT}
    PRINTL
    WAIT

@ADD(ARG:0, ARG:1)
#FUNCTION
    RETURNF ARG:0 + ARG:1
```

### Line-by-line Explanation

| Line | Meaning |
|----|------|
| `#DIM L_RESULT` | Declares a private integer variable `L_RESULT` |
| `L_RESULT = ADD(3, 5)` | Calls expression function `ADD`, assigns the return value to `L_RESULT` |
| `@ADD(ARG:0, ARG:1)` | Function label line; `ARG:0` and `ARG:1` are built-in integer parameter variables |
| `#FUNCTION` | Marks this function as an expression function (in the `#` preprocessor section after the `@` line) |
| `RETURNF ARG:0 + ARG:1` | Expression functions use `RETURNF` to return values (not `RETURN`) |

!!! warning "`#` preprocessor lines must be after the `@` line and before executable statements"

    All lines starting with `#` (`#DIM`/`#DIMS`/`#FUNCTION`, etc.) must be placed after the `@` label line and before the first executable statement. Multiple `#` lines can appear consecutively in any order. Blank lines and comment lines (`;`) do not affect the `#` line sequence.

    ```erb
    ; ❌ Wrong: executable statement interrupts the # line sequence
    @ADD(ARG:0, ARG:1)
        PRINTL Start            ; → Executable statement, updates lastLine
    #FUNCTION                   ; → Warning: "# lines can only be used immediately after function declaration"

    ; ✅ Correct: #DIM, comments, #FUNCTION can be mixed
    @ADD(ARG:0, ARG:1)
    #DIM L_TMP
    ; This is a comment (does not affect the # line sequence)
    #FUNCTION
        RETURNF ARG:0 + ARG:1
    ```

---

## Common Pitfalls

| Pitfall | Wrong | Correct | Reason |
|------|---------|---------|------|
| String without quotes | `CALL GREET(Hero)` | `CALL GREET("Hero")` | Without quotes, it's treated as a variable name |
| #DIM in wrong position | `@F` → `PRINTL` → `#DIM` | `@F` → `#DIM` → `PRINTL` | #DIM must be after @ line, before executable statements |
| A-Z as variable names | `#DIM A` | `#DIM L_A` | A~Z are engine built-in variables |
| RETURNF in command function | `RETURNF 42` | `RETURN 42` | RETURNF is only for expression functions |

---

## Next Steps

| What you want to learn | Go to |
|:---|:---|
| File types & processing order | [File Types](file-types.en.md) |
| Line types & structure | [Line Types](line-types.en.md) |
