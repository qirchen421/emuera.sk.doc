# Loops

!!! info "Corresponding Manual Sections"

    - **Reference Category**: [Loop/branch syntax](../Reference/README.en.md#flow-control)
    - [REPEAT ~ REND](../Reference/REPEAT.en.md) — Counted loop API reference
    - [FOR ~ NEXT](../Reference/FOR.en.md) — General counted loop API reference
    - [WHILE ~ WEND](../Reference/WHILE.en.md) — Pre-condition loop API reference
    - [DO ~ LOOP](../Reference/DO.en.md) — Post-condition loop API reference
    - [CONTINUE / BREAK](../Reference/CONTINUE.en.md) — Loop control API reference

---

## Overview

ERABASIC provides four loop structures:

| Structure | Characteristics | Use Case |
|------|---------|---------|
| `REPEAT` ~ `REND` | Fixed count, uses `COUNT` | Known number of iterations |
| `FOR` ~ `NEXT` | Custom counter variable, start value, step | Flexible counter control |
| `WHILE` ~ `WEND` | Pre-condition, may not execute | Loop while condition is met |
| `DO` ~ `LOOP` | Post-condition, executes at least once | Conditional loop with at least one execution |

All loops can be controlled with `CONTINUE` (skip to next iteration) and `BREAK` (exit loop).

!!! note "eramaker Compatibility"
    `REPEAT`/`REND` and `CONTINUE`/`BREAK` have existed since eramaker. `FOR`/`NEXT`, `WHILE`/`WEND`, `DO`/`LOOP` are Emuera extensions.

---

## REPEAT ~ REND — Fixed Count Loop

`REPEAT` is the simplest loop, specifying the number of iterations and using the built-in variable `COUNT` as the counter:

```erb
REPEAT 5
    PRINTFORML Iteration {COUNT}
REND
; Output:
; Iteration 0
; Iteration 1
; Iteration 2
; Iteration 3
; Iteration 4
```

### COUNT Variable

- `COUNT` is a built-in integer variable, starting from `0`, auto-incremented by 1 each iteration
- When the loop ends, `COUNT` equals the iteration count (not count - 1)
- `COUNT` is a global variable; nested `REPEAT` will overwrite the outer value

```erb
REPEAT 3
    ; COUNT: 0, 1, 2
    PRINTFORML COUNT = {COUNT}
REND
PRINTFORML After loop COUNT = {COUNT}    ; → 3
```

!!! warning "REPEAT cannot be nested"

    Because `REPEAT` always uses `COUNT` for counting, nesting causes the inner loop to overwrite the outer `COUNT`. Use `FOR` for nested loops.

---

## FOR ~ NEXT — General Counted Loop

`FOR` is an enhanced version of `REPEAT` with custom counter variable, start value, and step:

```erb
FOR counter, start, end, step
    ; Loop body
NEXT
```

| Parameter | Meaning | Omit? | Default |
|------|------|------|--------|
| counter | Integer variable for counting | ❌ Required | — |
| start | Value assigned to counter on first iteration | ❌ Required | — |
| end | Loop boundary | ❌ Required | — |
| step | Value added to counter each iteration | ✅ Optional | `1` |

### Basic Usage

```erb
#DIM L_I
FOR L_I, 0, 5
    PRINTFORML L_I = {L_I}
NEXT
; Output: L_I = 0, 1, 2, 3, 4
```

### Custom Step

```erb
#DIM L_I
FOR L_I, 10, 0, -2
    PRINTFORML L_I = {L_I}
NEXT
; Output: L_I = 10, 8, 6, 4, 2
```

### Nested Loops

```erb
#DIM L_X
#DIM L_Y
FOR L_Y, 0, 3
    FOR L_X, 0, 3
        PRINTFORM ({L_X},{L_Y})
    NEXT
    PRINTL
NEXT
; Output:
; (0,0)(1,0)(2,0)
; (0,1)(1,1)(2,1)
; (0,2)(1,2)(2,2)
```

### Key FOR Rules

1. **Positive step**: Loop continues while counter < end
2. **Negative step**: Loop continues while counter > end
3. **Zero step**: Infinite loop, must use `BREAK` to exit
4. **Parameters fixed at loop start**: Modifying the counter inside the loop doesn't affect iteration count

```erb
#DIM L_I
#DIM L_N = 5
FOR L_I, 0, L_N
    L_N = 100       ; Doesn't affect iteration count, still 5 times
NEXT
```

---

## WHILE ~ WEND — Pre-condition Loop

`WHILE` checks the condition before each iteration; the loop continues while the condition is true (non-zero):

```erb
WHILE HP > 0
    ; Battle logic
    HP -= 10
WEND
```

If the initial condition is false, the loop body **never executes**:

```erb
#DIM L_X = 100
WHILE L_X < 0
    PRINTL Never executes
WEND
```

!!! warning "Avoid infinite loops"

    If the `WHILE` condition is always true, it creates an infinite loop. Emuera will detect this and report an error.
    Ensure the loop body contains logic that changes the condition, or use `BREAK` to exit.

---

## DO ~ LOOP — Post-condition Loop

`DO` ~ `LOOP` executes the loop body at least once, then checks the condition at `LOOP`:

```erb
DO
    PRINTL Executes at least once
    A -= 1
LOOP A > 0
```

### DO ~ LOOP vs WHILE ~ WEND

| | `WHILE` ~ `WEND` | `DO` ~ `LOOP` |
|------|:---:|:---:|
| Check timing | Before loop | After loop |
| Minimum executions | 0 | 1 |

### CONTINUE's Special Behavior in DO ~ LOOP

When `CONTINUE` is executed inside `DO` ~ `LOOP`, it jumps to the `LOOP` line to check the condition. If the condition is not met, it **exits the loop directly** rather than returning to `DO`:

```erb
DO
    A += 1
    SIF A == 3
        CONTINUE       ; Jump to LOOP to check condition
    PRINTFORML A = {A}
LOOP A < 5
; Output: A = 1, A = 2, A = 4
; (When A == 3, CONTINUE jumps to LOOP, condition still met, continues looping)
```

---

## CONTINUE and BREAK

All loop structures support `CONTINUE` and `BREAK`:

| Instruction | Behavior |
|------|------|
| `CONTINUE` | Skip to next iteration (`COUNT` auto-increments in `REPEAT`/`FOR`) |
| `BREAK` | Immediately exit loop, execute code after the loop structure |

### CONTINUE Example

```erb
REPEAT 5
    SIF COUNT == 2
        CONTINUE           ; Skip iteration when COUNT == 2
    PRINTFORML {COUNT}
REND
; Output: 0, 1, 3, 4
```

### BREAK Example

```erb
REPEAT 100
    SIF COUNT == 3
        BREAK              ; Exit loop when COUNT == 3
    PRINTFORML {COUNT}
REND
PRINTFORML After loop COUNT = {COUNT}    ; → 3
; Output: 0, 1, 2
```

### CONTINUE Behavior in Different Loops

| Loop | CONTINUE Behavior |
|------|----------------|
| `REPEAT` | Return to `REPEAT`, `COUNT` +1 |
| `FOR` | Return to `FOR`, counter + step |
| `WHILE` | Return to `WHILE`, recheck condition |
| `DO` | Jump to `LOOP`, check condition |

---

## Choosing Among Four Loop Types

| Scenario | Recommended | Reason |
|------|------|------|
| Known iteration count | `REPEAT` | Most concise |
| Custom counter needed | `FOR` | Flexible counter variable and step |
| Nested loops | `FOR` | Each level uses a different counter |
| Loop while condition is met | `WHILE` | Pre-check, may not execute |
| Execute at least once | `DO` ~ `LOOP` | Post-check |

---

## Common Pitfalls

| Pitfall | Wrong | Correct | Reason |
|------|---------|---------|------|
| Nested REPEAT | `REPEAT` inside `REPEAT` | Use `FOR` for nesting | COUNT overwritten by inner loop |
| FOR step of 0 | `FOR I, 0, 10, 0` | Ensure step is non-zero | Step of 0 is an infinite loop |
| WHILE infinite loop | `WHILE 1` without BREAK | Ensure exit condition | Emuera will report error |
| Forgetting REND/NEXT/WEND | `REPEAT 5` ... | `REPEAT 5` ... `REND` | Loops must be closed |
| Modifying counter in FOR | `FOR I, 0, 10` with `I = 5` inside | Don't modify counter inside loop | Parameters fixed at start, modification ineffective |

---

## Next Steps

| What you want to learn | Go to |
|:---|:---|
| Conditional branching | [Conditional Branching](condition.en.md) |
| Jumps & labels | [Jumps](jump.en.md) |
| Assignment statements | [Assignment Statements](assignment.en.md) |
| REPEAT complete API | [REPEAT ~ REND](../Reference/REPEAT.en.md) |
| FOR complete API | [FOR ~ NEXT](../Reference/FOR.en.md) |
