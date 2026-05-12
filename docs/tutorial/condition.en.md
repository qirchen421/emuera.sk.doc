# Conditional Branching

!!! info "Corresponding Manual Sections"

    - [IF / SIF](../Reference/IF.en.md) — API reference for IF/ELSEIF/ELSE/ENDIF and SIF
    - [SELECTCASE](../Reference/SELECTCASE.en.md) — API reference for SELECTCASE

---

## Overview

ERABASIC provides three conditional branching structures:

| Structure | Use Case | Characteristics |
|------|---------|------|
| `IF` ~ `ENDIF` | Multi-line conditional blocks | Classic multi-branch structure |
| `SIF` | Single-line condition | Only controls whether the next line executes |
| `SELECTCASE` | Branch by value | Similar to switch, matches one value against multiple cases |

!!! note "eramaker Compatibility"
    `IF`/`ELSEIF`/`ELSE`/`ENDIF` and `SIF` have existed since eramaker. `SELECTCASE` is an Emuera extension.

---

## IF ~ ENDIF

### Basic Usage

```erb
IF A > 0
    PRINTL A is positive
ENDIF
```

The condition for `IF` is an **integer expression**: `0` is treated as false, non-`0` as true.

### IF ~ ELSE

```erb
IF A > 0
    PRINTL A is positive
ELSE
    PRINTL A is not positive
ENDIF
```

### IF ~ ELSEIF ~ ELSE

```erb
IF A > 0
    PRINTL Positive
ELSEIF A == 0
    PRINTL Zero
ELSE
    PRINTL Negative
ENDIF
```

You can have multiple `ELSEIF`s, but only one `ELSE` (which must be last). `IF` and `ENDIF` must always be paired.

### Conditional Expressions

The condition for `IF` is an integer expression, not a boolean type. All of the following are valid:

```erb
IF A                  ; True when A != 0
IF A > 0              ; Comparison operation
IF A > 0 && B > 0     ; Logical AND
IF A > 0 || B > 0     ; Logical OR
IF !A                 ; Logical NOT (true when A == 0)
IF STR == "hello"     ; String comparison
IF STR != ""          ; String non-empty check
```

!!! warning "No boolean type"

    ERABASIC has no boolean type. Comparison operators (`==`, `!=`, `>`, `<`, etc.) return integer `1` (true) or `0` (false).

---

## SIF — Single-line Condition

`SIF` is an ERABASIC-specific shorthand that only controls whether the **immediately following line** executes:

```erb
SIF A > 0
    PRINTL A is positive

; Equivalent to:
IF A > 0
    PRINTL A is positive
ENDIF
```

### SIF Rules

1. **Controls only one line**: `SIF` only affects the immediately following line; lines below are unaffected
2. **Cannot nest**: `SIF` cannot be followed by another `SIF`
3. **Cannot precede block structures**: `SIF` cannot be followed by the start of an `IF`, `REPEAT`, `FOR`, `WHILE`, etc. block

```erb
; ✅ Correct: SIF controls a single line
SIF MONEY >= 100
    PRINTL Can purchase

; ❌ Wrong: SIF cannot control a block structure
SIF MONEY >= 100
    IF STOCK > 0          ; Compilation error!
        PRINTL Purchase successful
    ENDIF

; ✅ Correct: Use IF instead
IF MONEY >= 100 && STOCK > 0
    PRINTL Purchase successful
ENDIF
```

### Common SIF Patterns

```erb
; Skip specific iterations
SIF COUNT == 2
    CONTINUE

; Conditional output
SIF HP <= 0
    PRINTL Defeated

; Conditional assignment
SIF FLAG == 0
    FLAG = 1
```

---

## SELECTCASE — Branch by Value

`SELECTCASE` is similar to `switch` in other languages, matching one value against multiple cases:

### Basic Usage

```erb
SELECTCASE DAY
    CASE 1
        PRINTL Monday
    CASE 2
        PRINTL Tuesday
    CASE 3
        PRINTL Wednesday
    CASEELSE
        PRINTL Other
ENDSELECT
```

### Three CASE Condition Formats

| Format | Meaning | Example |
|------|------|------|
| Direct value | Exact match | `CASE 1` |
| `IS operator expression` | Conditional match | `CASE IS <= 30` |
| `expression TO expression` | Range match | `CASE 10 TO 20` |

```erb
SELECTCASE SCORE
    CASE 90 TO 100
        PRINTL Excellent
    CASE IS >= 80
        PRINTL Good
    CASE IS >= 60
        PRINTL Pass
    CASEELSE
        PRINTL Fail
ENDSELECT
```

### Multiple Condition Combination

A single `CASE` can combine multiple conditions with commas:

```erb
SELECTCASE MONTH
    CASE 3 TO 5
        PRINTL Spring
    CASE 6 TO 8
        PRINTL Summer
    CASE 9 TO 11
        PRINTL Autumn
    CASE 12, 1, 2
        PRINTL Winter
ENDSELECT
```

You can also mix different formats:

```erb
CASE 1, 3, 5, 10 TO 20, IS >= 100
; Matches: 1, 3, 5, 10~20, 100 and above
```

### String Matching

`SELECTCASE` also supports strings:

```erb
SELECTCASE WEATHER
    CASE "Sunny"
        PRINTL Clear weather
    CASE "Rain"
        PRINTL It's raining
    CASEELSE
        PRINTL Other weather
ENDSELECT
```

### SELECTCASE Notes

1. **No fallthrough**: Unlike C's `switch`, matching a `CASE` does not continue to the next `CASE`
2. **Cannot use BREAK to exit**: `BREAK` has no effect in `SELECTCASE`; use `GOTO` to exit
3. **Short-circuit evaluation**: Multiple conditions in `CASE` are checked left to right; matching stops at first hit
4. **TO range**: `A TO B` requires `A <= B`, otherwise it never matches
5. **IS syntax**: Must be `IS operator expression`, cannot write `30 < IS`

!!! tip "Skia extension: Jump table optimization"

    When all `CASE` conditions in a `SELECTCASE` are **direct constant values** (no `TO` / `IS`, and not variables), Skia automatically builds a **jump table** at compile time, optimizing runtime lookup from **O(n) linear scan** to **O(1) hash lookup**. When `TO` / `IS` expressions or non-constant values are present, it automatically falls back to linear scanning.

---

## Choosing Among Three Branching Structures

| Scenario | Recommended | Reason |
|------|------|------|
| Two alternatives | `IF` ~ `ELSE` | Simple and intuitive |
| Multiple independent conditions | `IF` ~ `ELSEIF` | Each branch condition is independent |
| Match one value against multiple cases | `SELECTCASE` | Clearer, avoids repeating variable name |
| Control only one line | `SIF` | Concise, but note limitations |

```erb
; Scenario: Output rating by level
; SELECTCASE is better — all matching against LEVEL's value
SELECTCASE LEVEL
    CASE IS >= 90
        PRINTL S rank
    CASE IS >= 70
        PRINTL A rank
    CASE IS >= 50
        PRINTL B rank
    CASEELSE
        PRINTL C rank
ENDSELECT

; Scenario: Multiple independent conditions
; IF is better — conditions don't share a common variable
IF HP <= 0
    PRINTL Defeated
ELSEIF MP < 10
    PRINTL Low mana
ELSEIF HUNGER > 80
    PRINTL Starving
ENDIF
```

---

## Common Pitfalls

| Pitfall | Wrong | Correct | Reason |
|------|---------|---------|------|
| Forgetting ENDIF | `IF A > 0` ... | `IF A > 0` ... `ENDIF` | IF must have a matching ENDIF |
| SIF controlling multiple lines | `SIF A > 0` followed by multiple lines | Use `IF` instead | SIF only controls the next line |
| Nested SIF | `SIF` followed by `SIF` | Use `IF` instead | SIF cannot be nested |
| Using BREAK in SELECTCASE | `CASE 1: BREAK` | Not needed | SELECTCASE doesn't fall through, no BREAK needed |
| IS syntax error | `CASE 30 < IS` | `CASE IS < 30` | IS must be on the left of the operator |
| Reversed TO range | `CASE 20 TO 10` | `CASE 10 TO 20` | Left value must be ≤ right value |

---

## Next Steps

| What you want to learn | Go to |
|:---|:---|
| Loop structures | [Loops](loop.en.md) |
| Jumps & labels | [Jumps](jump.en.md) |
| Assignment statements | [Assignment Statements](assignment.en.md) |
| IF complete API | [IF / SIF](../Reference/IF.en.md) |
| SELECTCASE complete API | [SELECTCASE](../Reference/SELECTCASE.en.md) |
