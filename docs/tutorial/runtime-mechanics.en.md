# Runtime Mechanics

!!! info "Prerequisites"

    - **Reference Category**: [Functions (CALL, etc.)](../Reference/README.en.md#function-call) / [RETURN related](../Reference/README.en.md#return)
    - [Functions and CALL](call.en.md) — Function call mechanism, RETURN/RETURNF
    - [Command vs Expression](command-vs-expression.en.md) — Two evaluation paths
    - [Variable Declaration System](variable-declaration.en.md) — REF/OUT, #DIM, VARIADIC

!!! tip "Key Points"

    - ERABASIC function calls are processed through a three-stage pipeline: `ConvertArg` (validation) → `SetTransporter` (value/reference extraction) → `IntoFunction` (binding to formal parameters)
    - The `array` field of REF variables is reset to null by `ScopeIn` and restored by `SetRef` — understanding this lifecycle is essential for tracking "missing reference target" errors
    - CALL functions and expression functions (#FUNCTION) differ in when `ConvertArg` executes (runtime vs compile time)

---

## 7.1 Two Function Call Paths

ERABASIC has two function call methods with different runtime paths:

### CALL Functions (Command Functions)

```
CALL FUNC(arg1, arg2)
│
├─ Compile time: Argument syntax checking
├─ Runtime: CallFunction() → ConvertArg() → SetTransporter() → IntoFunction() → runScriptProc()
└─ Return:  ReturnFromFunction() → ScopeOut()
```

- `ConvertArg` is called inside `CallFunction` (**runtime**, executed on every call)
- Return values are received through `RESULT`/`RESULTS`

### Expression Functions (#FUNCTION/#FUNCTIONS)

```
LOCAL = FUNC(arg1, arg2)
│
├─ Compile time: UserDefinedMethodTerm.Create() → ConvertArg() validates arguments
├─ Runtime: Process.GetValue(udmt) → SetTransporter() → IntoFunction() → runScriptProc()
└─ Return:  finally { ScopeOut() } → MethodReturnValue
```

- `ConvertArg` is called at `UserDefinedMethodTerm.Create` time (**compile time**, once only)
- Return value is used directly in the expression as the value of `RETURNF`

### Key Differences

| Attribute | CALL Function | Expression Function (#FUNCTION) |
|-----------|--------------|-------------------------------|
| ConvertArg timing | Runtime (every call) | Compile time (once only) |
| Call entry point | `CallFunction()` | `GetValue(SuperUserDefinedMethodTerm)` |
| Return value | None (via RESULT/RESULTS) | `MethodReturnValue` (RETURNF value) |
| ScopeOut location | `ReturnFromFunction` | `GetValue`'s `finally` block |
| AST node | `InstructionLine` | `UserDefinedMethodTerm` (AExpression) |

---

## 7.2 Three-Stage Pipeline in Detail

### Stage 1: ConvertArg — Argument Validation and Conversion

```
CALL FUNC(arg1, arg2)
│
├─ Type checking (REF arguments must be VariableTerm)
├─ Dimension matching (scalar REF vs array REF)
├─ MatchType type compatibility checking
├─ Default value filling (omitted arguments filled with Def[i])
└─ Variadic arguments packed into VariadicArgTerm
→ Output: UserDefinedFunctionArgument
```

ConvertArg's primary responsibility is **static validation**. It checks whether argument types and counts match the function definition, producing a compile error if they don't.

### Stage 2: SetTransporter — Value and Reference Extraction

```
SetTransporter(exm)
│
├─ Non-REF arguments: Evaluate expression → store in TransporterInt/Str/Float[i]
├─ REF scalar: GetArray() → store in TransporterRef[i]
├─ REF array element: new ElementRefInfo(...) → store in TransporterElementRef[i]
└─ REF entire array: GetArray() → store in TransporterRef[i]
→ Output: Transporter arrays filled
```

SetTransporter is responsible for **runtime value extraction**. For REF arguments, it stores references to the actual array objects in the Transporter arrays.

### Stage 3: IntoFunction — Binding to Formal Parameters

```
IntoFunction(func, exm)
│
├─ ScopeIn() → All REF variables' array = null
├─ TransporterElementRef[i] ≠ null → SetRef(ElementRefInfo)
├─ TransporterRef[i] ≠ null → SetRef(Array)
├─ IsOut=true → SetNullRef() (black hole for omitted OUT arguments)
└─ Non-REF: SetValue(TransporterInt/Str/Float[i])
→ Result: Formal parameter binding complete, function body execution begins
```

---

## 7.3 REF Variable Lifecycle

The `array` field of REF variables changes along the function call lifecycle:

```
Before function call:  array = previous value (or null)
       ↓
ScopeIn():            array = null (reset), old value saved to arrayList
       ↓
SetRef():             array = actual argument's array reference (binding)
       ↓
Function body execution: Access actual argument through array
       ↓
ScopeOut():           array = saved old value (restored)
```

### Nested Call Example

```erb
@OUTER
#DIM REF HIT_LIST, 0
; HIT_LIST.array = reference to external array

CALL INNER(HIT_LIST)
; ← Inside IntoFunction:
;   ScopeIn() → HIT_LIST.array = null, arrayList = [external_array]
;   SetRef(inner_array) → HIT_LIST.array = inner_array
; ← At function end:
;   ScopeOut() → HIT_LIST.array = external_array (restored)

@INNER
#DIM REF DATA, 0
; Access HIT_LIST's data through DATA
DATA:0 = 42
; ← Writes to the caller's array
```

!!! warning "Cases Where ScopeIn Is Not Called"

    `ScopeIn` is only called when `hasPrivDynamicVar=true`. If the function has no `#DIM DYNAMIC` variables, `ScopeIn`/`ScopeOut` are not called, and the REF variable's `array` remains as set by the first `SetRef`.

---

## 7.4 "Missing Reference Target" Error

Accessing a REF variable when its `array` is `null` triggers this error:

```
Reference variable "X" lacks a reference target
```

### Trigger Conditions

| Scenario | Cause | Resolution |
|----------|-------|-----------|
| REF argument omitted (non-OUT) | `TransporterRef[i]` remains null | REF arguments cannot be omitted (only OUT can) |
| SetRef not called in IntoFunction | Binding logic defect | Check the full ConvertArg→SetTransporter→IntoFunction chain |
| No rebinding after ScopeOut | Need to rebind after nested call returns | Review call structure |

### Debugging Steps

1. `ConvertArg`: Confirm argument types and counts are correct
2. `SetTransporter`: Confirm Transporter arrays contain correct values/references
3. `IntoFunction`: Confirm `SetRef` is called correctly
4. `ScopeIn`/`ScopeOut`: Confirm REF variable's `array` changes as expected

---

## 7.5 OUT Parameter Black Hole

When an OUT parameter is omitted, `SetNullRef()` is called, binding to a **NullRefTerm** black hole:

```erb
@FUNC
#DIM OUT RESULT_OUT, 0
; When the caller omits the OUT argument:
; RESULT_OUT → NullRefTerm (writes go nowhere)

CALL FUNC
; Writes to RESULT_OUT are absorbed by the black hole

CALL FUNC(RESULT_OUT)
; Normal: RESULT_OUT's value will be reflected
```

!!! warning "OUT Parameter Omission Order"

    OUT parameters are bound in declaration order. Omitting a middle OUT parameter causes all subsequent parameters to shift:

    ```erb
    @FUNC
    #DIM OUT A, 0
    #DIM OUT B, 0
    #DIM OUT C, 0

    ; ❌ Dangerous: trying to omit B, but syntactically becomes (A, C)
    ;    C gets bound to B's position
    CALL FUNC(RESULT_A, RESULT_C)
    ```

---

## 7.6 RESULT Behavior and Implicit Function End

### Command Function RESULT

In command functions (called via CALL), `RETURN` sets `RESULT`. However, **an implicit `RESULT = 0` exists at the function's end**:

```erb
@MY_FUNC
; (No RETURN statement)
; ← Implicitly sets RESULT = 0

@MY_FUNC2
RESULT = 42
RETURN
; ← RETURN itself sets RESULT
```

### Expression Function RETURNF

In expression functions (#FUNCTION), `RETURNF` sets `MethodReturnValue` but does not touch `RESULT`:

```erb
@MY_EXPR_FUNC
#FUNCTION
RETURNF 42
; ← RESULT is unchanged
; ← MethodReturnValue = 42
```

### JUMP's RESULT

JUMP only replaces the stack frame; the RETURN RESULT-setting mechanism itself is unchanged. When RETURN is executed in a JUMP target function, RESULT is set normally.

---

## 7.7 Runtime Mechanics Overview

```
ERB Script
    │
    ├─ CALL FUNC(args) ─────────────────────────────────────┐
    │                                                       │
    ├─ LOCAL = FUNC(args)  ← #FUNCTION                      │
    │                                                       │
    └─ CALLFORM / CALLSTR ──────────────────────────────────┘
                                                            │
    ┌───────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   ConvertArg    │────▶│  SetTransporter  │────▶│   IntoFunction   │
│  (validation)   │     │  (extraction)    │     │  (binding)       │
└─────────────────┘     └──────────────────┘     └──────────────────┘
    Compile time            Runtime                  Runtime
    or runtime

    ▼
┌─────────────────┐     ┌──────────────────┐
│  runScriptProc  │────▶│  Return /        │
│  (body exec)    │     │  ReturnFromFunc  │
└─────────────────┘     └──────────────────┘
                              │
                              ├─ RETURN → set RESULT → ScopeOut
                              ├─ RETURNF → MethodReturnValue → ScopeOut
                              └─ JUMP → recursive Return() → back to non-JUMP caller
```

---

## 7.8 Summary

| Concept | Key Point |
|---------|-----------|
| Three-stage pipeline | ConvertArg → SetTransporter → IntoFunction. Understanding each stage's role and timing is crucial |
| REF variable lifecycle | ScopeIn(null) → SetRef(bind) → ScopeOut(restore). Functions without DYNAMIC variables don't call ScopeIn/ScopeOut |
| OUT parameter black hole | Omitted OUT parameters bind to NullRefTerm; writes are not reflected |
| CALL vs expression function | ConvertArg timing differs (runtime vs compile time). RESULT behavior also differs |
| Implicit RESULT setting | Command function end has implicit RESULT=0. RETURNF doesn't touch RESULT |
