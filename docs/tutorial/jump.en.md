# Jumps

!!! info "Corresponding Manual Sections"

    - **Reference Category**: [Loop/branch syntax](../Reference/README.en.md#flow-control)
    - [GOTO](../Reference/GOTO.en.md) — GOTO instruction API reference
    - [GOTOFORM](../Reference/FORM.en.md) — GOTOFORM instruction API reference
    - [CONTINUE / BREAK](../Reference/CONTINUE.en.md) — Loop control API reference

---

## Overview

ERABASIC jumps are divided into two categories:

| Type | Instructions | Scope |
|------|------|---------|
| Intra-function jumps | `GOTO`, `$label` | Within current function |
| Loop control | `CONTINUE`, `BREAK` | Within current loop |

!!! warning "GOTO can only jump to labels within the current function"

    `GOTO` cannot jump across functions. For cross-function jumps, use `CALL`/`JUMP` (see [Functions & CALL](call.en.md)).

---

## $ Label — Define Jump Target

Lines starting with `$` define a label as a jump target for `GOTO`:

```erb
$LOOP_START
    ; Code
    GOTO LOOP_START
```

### Label Naming Rules

- Starts with `$`, followed by the label name
- Label name must be unique within the same function
- Label names are case-sensitive
- Labels are only visible within the current function

```erb
@MY_FUNC
$START
    PRINTL Start
    GOTO MIDDLE

$MIDDLE
    PRINTL Middle
    GOTO END_LABEL

$END_LABEL
    PRINTL End
RETURN
```

---

## GOTO — Unconditional Jump

`GOTO` jumps to a specified `$` label within the current function:

```erb
GOTO labelName
```

### Basic Usage

```erb
@MY_FUNC
    PRINTL 1
    GOTO THREE

$TWO
    PRINTL 2
    GOTO FIVE

$THREE
    PRINTL 3
    GOTO TWO

$FOUR
    PRINTL 4
    GOTO END_LABEL

$FIVE
    PRINTL 5
    GOTO FOUR

$END_LABEL
    PRINTW END
RETURN
; Output: 1, 3, 2, 5, 4, END
```

### GOTOFORM — Dynamic Label Jump

`GOTOFORM` uses FORM syntax to dynamically construct a label name:

```erb
#DIM L_PHASE = 2
GOTOFORM PHASE_{L_PHASE}

$PHASE_1
    PRINTL Phase 1
    RETURN

$PHASE_2
    PRINTL Phase 2
    RETURN

$PHASE_3
    PRINTL Phase 3
    RETURN
```

---

## GOTO Interaction with Loop Structures

### GOTO Jumping Into a Loop

If `GOTO` jumps into the middle of a loop body, behavior depends on the loop type:

| Loop Type | Behavior After GOTO Jump In |
|---------|-----------------|
| `REPEAT` ~ `REND` | Executes to the line before `REND`, then jumps to the line after `REND` (no loop) |
| `FOR` ~ `NEXT` | Executes to the line before `NEXT`, then jumps to the line after `NEXT` (no loop) |
| `WHILE` ~ `WEND` | Executes to `WEND`, returns to `WHILE` to check condition |
| `DO` ~ `LOOP` | Executes to `LOOP`, checks condition, if met returns to `DO` |

!!! danger "Avoid GOTO jumping into loops"

    The behavior of `GOTO` jumping into a loop body is error-prone and should be avoided. If you need to enter a loop from outside, use conditional flags or refactor the code.

### GOTO Jumping Out of a Loop

`GOTO` can jump out of a loop, but `BREAK` is the better choice:

```erb
; ❌ Not recommended: Using GOTO to exit a loop
REPEAT 100
    SIF COUNT == 5
        GOTO OUTSIDE
REND
$OUTSIDE

; ✅ Recommended: Using BREAK to exit a loop
REPEAT 100
    SIF COUNT == 5
        BREAK
REND
```

### GOTO Skipping SELECTCASE

When `GOTO` jumps into a `SELECTCASE` body, execution reaches `CASE`/`CASEELSE` and jumps to the line after `ENDSELECT`:

```erb
SELECTCASE X
    GOTO INSIDE      ; ❌ Don't do this
$INSIDE
    CASE 1           ; Execution reaches here and jumps directly past ENDSELECT
        PRINTL 1
ENDSELECT
```

---

## CONTINUE and BREAK — In-loop Jumps

`CONTINUE` and `BREAK` are dedicated jump instructions for loops (see [Loops](loop.en.md) for details):

| Instruction | Behavior |
|------|------|
| `CONTINUE` | Skip to the next iteration of the current loop |
| `BREAK` | Exit the current loop |

### CONTINUE Jump Targets

| Loop | CONTINUE Jump Target |
|------|-----------------|
| `REPEAT` | Return to `REPEAT`, `COUNT` +1 |
| `FOR` | Return to `FOR`, counter + step |
| `WHILE` | Return to `WHILE`, recheck condition |
| `DO` | Jump to `LOOP`, check condition |

### BREAK Jump Targets

`BREAK` jumps to the line after the loop's end line:

| Loop | BREAK Jump Target |
|------|---------------|
| `REPEAT` ~ `REND` | Line after `REND` |
| `FOR` ~ `NEXT` | Line after `NEXT` |
| `WHILE` ~ `WEND` | Line after `WEND` |
| `DO` ~ `LOOP` | Line after `LOOP` |

---

## GOTO Alternatives

`GOTO` can make code difficult to understand and maintain. The following scenarios have better alternatives:

| Scenario | GOTO Approach | Recommended Alternative |
|------|----------|---------|
| Exit loop | `GOTO END` | `BREAK` |
| Skip iteration | `GOTO NEXT_ITER` | `CONTINUE` |
| Conditional execution | `GOTO LABEL_A` / `GOTO LABEL_B` | `IF` / `SELECTCASE` |
| Loop retry | `GOTO RETRY` | `WHILE` / `DO` ~ `LOOP` |
| Phase switching | `GOTOFORM PHASE_{N}` | `SELECTCASE` + `CALL` |

### Refactoring Example: GOTO Loop → WHILE

```erb
; ❌ GOTO loop
$RETRY
    INPUT
    SIF RESULT < 0
        GOTO RETRY

; ✅ WHILE loop
WHILE 1
    INPUT
    SIF RESULT >= 0
        BREAK
WEND

; ✅ DO ~ LOOP (more concise)
DO
    INPUT
LOOP RESULT < 0
```

---

## Common Pitfalls

| Pitfall | Wrong | Correct | Reason |
|------|---------|---------|------|
| GOTO across functions | `GOTO OTHER_FUNC_LABEL` | Use `CALL`/`JUMP` | GOTO only works within current function |
| Label name conflict | Two `$START` labels | Each label name must be unique | Label names must be unique within a function |
| GOTO into loop | `GOTO` jumping into `FOR` body | Use conditional flags or refactor | Unpredictable behavior |
| Infinite GOTO | `GOTO A` → `$A: GOTO B` → `$B: GOTO A` | Use loop structures | Emuera will detect and report error |
| GOTO instead of BREAK | `GOTO END` to exit loop | `BREAK` | BREAK is clearer |

---

## Next Steps

| What you want to learn | Go to |
|:---|:---|
| Loop structures | [Loops](loop.en.md) |
| Conditional branching | [Conditional Branching](condition.en.md) |
| Function calls | [Functions & CALL](call.en.md) |
| GOTO complete API | [GOTO](../Reference/GOTO.en.md) |
