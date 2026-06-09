# Constant Folding

!!! info "Prerequisites"

    - **Reference Category**: [Variable Declaration Series](../Reference/README.en.md#variable-operations)
    - [Variable Declaration System](variable-declaration.en.md) — #DIM/#DIMS/#DIMF declarations, array initialization
    - [Conditionals](condition.en.md) — SELECTCASE syntax
    - [Command vs Expression](command-vs-expression.en.md) — Expression function mechanics

!!! tip "Key Points"

    - ERABASIC can evaluate expressions at compile time (constant folding), enabling array initialization like `#DIM ARR = POWER(2,3)`
    - Only functions with `CanRestructure = true` are eligible for constant folding. Math functions (POWER/ABS/SQRT etc.) must have `CanRestructure = true`
    - When SELECTCASE CASE values are constants, the compiler can build a jump table, optimizing O(n) linear scanning to O(1) hash lookup

---

## What is Constant Folding

Constant Folding is an optimization technique that **evaluates expressions at compile time and replaces them with their constant results**.

In ERABASIC, constant folding is primarily used in two scenarios:

1. **Array initialization** — Converting `#DIM ARR = POWER(2,3)` to `#DIM ARR = 8`
2. **SELECTCASE jump tables** — Building hash tables when CASE values are constants

---

## CanRestructure — The Key to Constant Folding

### Concept

`CanRestructure` is a property of the `FunctionMethod` class that indicates the function **always returns the same value for the same arguments** (referential transparency).

```csharp
// FunctionMethod.cs
public virtual bool CanRestructure => false;  // Default: not eligible for constant folding

// Example: POWER function
private sealed class PowerMethod : FunctionMethod
{
    public PowerMethod()
    {
        ReturnType = typeof(long);
        argumentTypeArray = [typeof(long), typeof(long)];
        CanRestructure = true;  // ← Same arguments, same result
    }
}
```

### Conditions for CanRestructure = true

| Condition | Description |
|-----------|-------------|
| Always returns the same value for the same arguments | Referential transparency (pure function) |
| Does not depend on global state | Does not depend on RESULT, variable values, etc. |
| No side effects | No I/O, variable modifications, etc. |

### Examples where CanRestructure = false

| Function | Reason |
|----------|--------|
| `GETTIME` | Returns different values on each call |
| `RAND` | Returns random values |
| `GETCHARA` | Character additions/deletions change the result |
| `GETVAR` | Depends on runtime variable values |

---

## Constant Folding in Array Initialization

### Rule

`#DIM`/`#DIMS`/`#DIMF` array initializers can only specify **constants**. However, functions with `CanRestructure = true` are treated as constants and can be used in initializers.

### Folding Process

```
ERB: #DIM ARR, 10 = POWER(2,3), ABS(-5), SQRT(16)
  ↓ ErhLoader parses initializers
  ↓ Calls expr.Restructure(null) for each expression
  ↓ POWER(2,3) → CanRestructure = true → evaluate → SingleLongTerm(8)
  ↓ ABS(-5)   → CanRestructure = true → evaluate → SingleLongTerm(5)
  ↓ SQRT(16)  → CanRestructure = true → evaluate → SingleLongTerm(4)
  ↓ Result: #DIM ARR, 10 = 8, 5, 4  ← All constants!
```

### When CanRestructure is false

```
ERB: #DIM ARR, 10 = GETTIME()
  ↓ ErhLoader parses initializers
  ↓ GETTIME() → CanRestructure = false → Restructure not possible
  ↓ Result is not a SingleTerm → !result.IsConst
  ↓ Error: "配列の初期値には定数のみ指定できます" (Only constants can be specified as array initial values)
```

### CanRestructure Fix History

The following math functions originally had `CanRestructure = false` and were fixed to `true` to support use in array initializers:

| Function | Description | Fix Date |
|----------|-------------|----------|
| `POWER` | Exponentiation | Fixed in LazyLoading, synced to m-emuera (2026-05-13) |
| `ABS` | Absolute value | Same |
| `SQRT` | Square root | Same |
| `SIN`/`COS`/`TAN` | Trigonometric functions | Same |
| `ASIN`/`ACOS`/`ATAN` | Inverse trigonometric functions | Same |
| `LOG`/`LOG10`/`EXP` | Logarithm/Exponential | Same |
| `MAX`/`MIN` | Maximum/Minimum | Same |
| `SIGN` | Sign | Same |
| `FLOOR`/`CEIL` | Floor/Ceiling | Same |

---

## SELECTCASE Jump Table Optimization

### Optimization Overview

SELECTCASE normally scans each CASE linearly from top to bottom (O(n)). However, when all CASE values are constants, the compiler can build a `Dictionary` jump table at compile time, optimizing to O(1) hash lookup.

### Optimization Conditions

| Condition | Description |
|-----------|-------------|
| SELECTCASE argument is Integer/String/Float type | Only these types can be stored in a Dictionary |
| All CASEs have `CaseType == Normal` | CASEs with `TO` or `IS` require range comparison |
| All CASE values are compile-time constants | `IsConst == true` or can be constantized via `Restructure` |
| No duplicate CASE values | Duplicate values are warned and skipped (jump table itself is preserved) |

### Constant Folding for CASE Values

When a CASE expression `!IsConst` (not a constant), `Restructure(null)` is attempted:

```csharp
if (!leftTerm.IsConst)
{
    try
    {
        AExpression restructured = leftTerm.Restructure(null);
        if (restructured is SingleTerm st)
            leftTerm = st;    // ← Constant folding succeeded
        else
            return null;      // ← Folding failed, jump table not possible
    }
    catch { return null; }
}
```

This allows constant expressions like `CASE 1+2` to be optimized as well.

### Cases That Cannot Be Optimized

| Case | Reason |
|------|--------|
| `CASE 1 TO 10` | Range comparison required, cannot hash |
| `CASE IS > 5` | Comparison operation required, cannot hash |
| `CASE X` (X is a variable) | Value unknown until runtime, and Restructure not possible |
| SELECTCASE argument is Object type | Cannot store in Dictionary |

### Duplicate CASE Value Handling

**Old behavior**: Encountering a duplicate value abandons the entire jump table.

**New behavior** (m-emuera 2026-05-13 port): Duplicate values emit a warning and are skipped, while the jump table itself is preserved:

```
SELECTCASE X
CASE 1
    ; Process A
CASE 1       ; ← Warning: duplicate value 1 (previous occurrence: filename:lineno), skipped
    ; Process B  ← This branch is not included in the jump table
CASE 2
    ; Process C
ENDSELECT
```

---

## Transparency to ERB Scripts

Constant folding and jump table optimization are **completely transparent** — no ERB script modifications are needed. The compiler automatically determines whether optimization is possible and silently falls back to the original behavior when it's not.

---

## Related Chapters

- [Variable Declaration System](variable-declaration.en.md) — #DIM/#DIMS/#DIMF declarations and array initialization
- [Conditionals](condition.en.md) — SELECTCASE syntax basics
- [Command vs Expression](command-vs-expression.en.md) — Expression function mechanics
