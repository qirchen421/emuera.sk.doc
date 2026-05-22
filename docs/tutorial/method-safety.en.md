# Function Safety and METHOD_SAFE

!!! info "Prerequisites"

    - **Reference Category**: [Function Series (CALL etc.)](../Reference/README.en.md#function-call)
    - [Command vs Expression](command-vs-expression.en.md) — Two evaluation paths, RESULT pollution
    - [Variable Declaration System](variable-declaration.en.md) — #FUNCTION/#FUNCTIONS declarations
    - [Runtime Mechanics](runtime-mechanics.en.md) — Function call pipeline

!!! tip "Key Points"

    - `METHOD_SAFE` is a safety flag set during function registration that marks which commands can be safely called inside `#FUNCTION` function bodies
    - Commands without `METHOD_SAFE` (such as `CALL`, `WAIT`, `INPUT`) are prohibited inside `#FUNCTION` function bodies — the compiler will report an error
    - The essence of `METHOD_SAFE` is understanding ERABASIC's **side-effect restrictions** on expression functions: expression functions should ideally be side-effect-free, but the engine doesn't enforce this — it only restricts **control flow and I/O-type** side effects

---

## What is METHOD_SAFE

`METHOD_SAFE` is a flag bit set during function registration in the ERABASIC engine, defined in `FunctionIdentifier.cs`:

```csharp
public const int METHOD_SAFE = 0x00004;
// #Function中で呼び出してよい命令。WAITなど入力を伴うもの、CALLなど関数呼び出しを伴うものは不可。
// Translation: Commands that may be called within #Function. Those involving input like WAIT,
// or function calls like CALL, are not allowed.
```

**In one sentence**: Commands marked with `METHOD_SAFE` can be used inside `#FUNCTION`/`#FUNCTIONS` function bodies; unmarked commands are prohibited.

---

## Why METHOD_SAFE is Needed

ERABASIC's expression functions (`#FUNCTION`/`#FUNCTIONS`) are designed as **pure computations** — they are called during expression evaluation and are expected not to cause control flow jumps or blocking I/O.

If you call `CALL` (jump to another function) or `WAIT` (wait for user input) inside an expression function, it breaks the normal expression evaluation flow:

```erb
@BAD_FUNC(X)
#FUNCTION
    WAIT            ; ❌ Compile error! WAIT lacks METHOD_SAFE
    RETURNF X * 2

@ALSO_BAD(X)
#FUNCTION
    CALL OTHER()    ; ❌ Compile error! CALL lacks METHOD_SAFE
    RETURNF X + 1
```

The compiler checks this in `ErbLoader`: when parsing commands inside a `#FUNCTION` function body, if the command's `IsMethodSafe()` returns `false`, it issues a warning and marks the line as an error.

---

## Commands with METHOD_SAFE

### Typical METHOD_SAFE Commands

| Category | Examples | Description |
|----------|----------|-------------|
| **Output** | `PRINT`, `PRINTL`, `PRINTS`, `PRINTFORM`, etc. | Text output doesn't block execution flow |
| **Formatted output** | `PRINTBUTTON`, `PRINTPLAIN`, `PRINTPLAINFORM` | Button and plain text output |
| **Character info display** | `PRINT_ABL`, `PRINT_TALENT`, `PRINT_MARK`, etc. | Display character attributes |
| **Drawing** | `DRAWLINE`, `CUSTOMDRAWLINE`, `DRAWLINEFORM` | Draw lines |
| **Color/Font** | `SETCOLOR`, `SETBGCOLOR`, `FONTSTYLE`, `ALIGNMENT` | Visual settings |
| **Control flow end** | `ENDIF`, `ENDSELECT`, `DO` | Syntax structure end markers |
| **Data operations** | `SPLIT`, `SAVEDATA`, `UPCHECK`, `CUPCHECK` | String split, save, parameter change check |
| **Character management** | `ADDDEFCHARA` | Add default character |
| **Save** | `PUTFORM` | Write to save info |

### Typical Commands without METHOD_SAFE

| Category | Examples | Reason |
|----------|----------|--------|
| **Function calls** | `CALL`, `JUMP`, `GOTO` | Control flow jumps, break expression evaluation |
| **TRY series** | `TRYCALL`, `TRYJUMP`, `TRYGOTO` | Same as above, with error-tolerant jumps |
| **Input waiting** | `WAIT`, `INPUT`, `TINPUT`, `ONEINPUT` | Blocking I/O |
| **Flow control** | `IF`, `SELECTCASE`, `REPEAT`, `WHILE`, `FOR` | Flow control **start** markers (but end markers like `ENDIF`, `ENDSELECT` have METHOD_SAFE) |
| **Return** | `RETURN`, `RETURNF` | Function return |
| **Save loading** | `LOADDATA` | Loading saves changes global state |

---

## METHOD_SAFE vs RESULT Pollution

`METHOD_SAFE` and RESULT pollution are **two independent issues** that are often confused:

| Issue | Mechanism | Impact |
|-------|-----------|--------|
| **METHOD_SAFE** | Compile-time check | Determines whether a command **can** be used inside `#FUNCTION` |
| **RESULT pollution** | Runtime behavior | `METHOD_Instruction` unconditionally writes to RESULT when expression functions are called as commands |

A command can have `METHOD_SAFE` and still cause RESULT pollution — the two are not contradictory. For example, `STRLEN` as a built-in expression function can be used inside `#FUNCTION` bodies, but calling it with command syntax pollutes RESULT.

Conversely, `SETFONT` lacks `METHOD_SAFE` (it's a pure command, takes the `doNormalFunction` path), but it also doesn't pollute RESULT — because it never writes to RESULT in the first place.

**Key distinction**:

```
METHOD_SAFE → "Is this command safe inside #FUNCTION?" (compile-time)
RESULT pollution → "Does this command unexpectedly overwrite RESULT?" (runtime)
```

---

## Where METHOD_SAFE is Checked

The engine checks `METHOD_SAFE` in two places:

### 1. Compile-time: ErbLoader

```csharp
// ErbLoader.cs — During ERB file loading
if (inMethod)  // Currently inside a #FUNCTION function body
{
    if (!func.Function.IsMethodSafe())
    {
        ParserMediator.Warn(
            string.Format(trerror.CanNotUseInUserFunc.Text, func.Function.Name),
            nextLine, 2, true, false);
        continue;  // Skip this line, mark as error
    }
}
```

This is a **compile-time** check — which commands are usable is determined during ERB file loading.

### 2. Runtime: EmueraConsole (Debug Commands)

Debug console command execution also checks `IsMethodSafe()`:

```csharp
// EmueraConsole.cs — Debug command execution
if (!func.Function.IsMethodSafe())
    throw new CodeEE(string.Format(trerror.CanNotUseInstruction.Text, func.Function.Name));
```

---

## Practical Advice

### 1. Only compute in #FUNCTION

```erb
; ✅ Good practice — pure computation
@CALC_BONUS(BASE, LEVEL)
#FUNCTION
    #DIM BONUS
    BONUS = BASE * LEVEL / 100
    RETURNF BONUS

; ⚠️ Allowed but not recommended — output side effect
@DEBUG_PRINT_VALUE(X)
#FUNCTION
    PRINTVL X        ; METHOD_SAFE, allowed at compile-time
    RETURNF X        ; But PRINT timing may be unexpected when called in expressions

; ❌ Prohibited — control flow side effect
@BAD_FUNC(X)
#FUNCTION
    CALL OTHER()     ; Compile error! CALL lacks METHOD_SAFE
    RETURNF X
```

### 2. Use command functions when side effects are needed

```erb
; ✅ Command functions (@label, no #FUNCTION) can use any command
@PROCESS_DATA(KEY, VAL)
    ; Can freely use CALL, WAIT, INPUT, etc.
    CALL SAVE_TO_DB(KEY, VAL)
    WAIT
    RETURN
```

### 3. Understand that METHOD_SAFE ≠ "no side effects"

`METHOD_SAFE` only restricts **control flow and I/O-type** side effects. Commands with `METHOD_SAFE` may still:

- Modify global variables (e.g., `SETCOLOR` changes current color)
- Output text (e.g., `PRINTL`)
- Modify RESULT (e.g., expression functions called with command syntax)

---

## Related Chapters

- [Command vs Expression](command-vs-expression.en.md) — RESULT pollution, CALLF, METHOD_Instruction
- [Runtime Mechanics](runtime-mechanics.en.md) — Function call pipeline
- [Variable Declaration System](variable-declaration.en.md) — #FUNCTION/#FUNCTIONS declarations
- [CALLF Reference](../Reference/CALLF.en.md) — CALLF API documentation
