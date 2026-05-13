# Chapter 6: Dynamic Parsing and Reflection

!!! info "Prerequisites"

    - [Functions and CALL](call.en.md) — Function call mechanism, RETURN/RETURNF
    - [FORM Syntax](form-syntax.en.md) — `%variable%` and `{expression}` expansion rules
    - [Commands vs Expressions](command-vs-expression.en.md) — Two evaluation paths
    - [Character Variables](character-variables.en.md) — CSV templates and character indices

!!! tip "Key Points"

    - ERABASIC's reflection capabilities have evolved across four generations: fixed mapping → name lookup → variable reflection → general evaluation
    - Each generation corresponds to a family of functions; understanding the evolutionary path reveals the design motivation and limitations of each function
    - FORM syntax is the "back door" for dynamic parsing — all subsequent dynamic capabilities grew out of FORM

---

## 6.1 First Generation: Fixed Mapping (eramaker) — Index to Value

In the eramaker era, query functions were all **one-way fixed mappings**: given an index, query the corresponding value. Each variable family had dedicated functions, with the function name hard-coding the access target:

```erb
; CSV queries: given a template index, query values from the template
S '= CSVNAME(0)             ; NAME of template 0
S '= CSVCALLNAME(0)         ; CALLNAME of template 0
X = CSVBASE(0, 2)           ; BASE:2 of template 0
X = CSVTALENT(0, 5)         ; TALENT:5 of template 0

; Character queries: given an index, find the character
I = GETCHARA(0)             ; Find character index for template 0
I = FINDCHARA(TALENT, 5)    ; Find character with TALENT:5 == 1

; Level queries: given a value, find the corresponding level
LV = GETPALAMLV(PALAM:0:2, 10)  ; PALAM:0:2 value mapped to level in 10-tier thresholds
LV = GETEXPLV(EXP:0:2, 10)      ; EXP:0:2 value mapped to level in 10-tier thresholds
```

**Characteristic**: Which variable family to access is known at compile time; cannot dynamically select based on a string.

**Function Reference**: [CSVNAME](../Reference/CSVNAME.en.md), [CSVBASE](../Reference/CSV_STATUS.en.md), [GETCHARA](../Reference/GETCHARA.en.md), [FINDCHARA](../Reference/FINDCHARA.en.md), [GETPALAMLV](../Reference/GETPALAMLV.en.md)

---

## 6.2 Second Generation: Name Lookup (Emuera) — String to Index

Emuera introduced `GETNUM`, implementing **name-to-index** reverse lookup. This was the first time a string could be used to dynamically find an enumeration value:

```erb
; GETNUM — find index by name string
IDX = GETNUM(PALAM, "気力")     ; Returns the index of "気力" in PALAM
IDX = GETNUM(TALENT, "害羞")    ; Returns the index of "害羞" in TALENT
IDX = GETNUM(CFLAG, L_FLAG_NAME) ; Dynamic name construction
```

`GETNUM`'s first parameter is a **variable reference** (not a string), the second is a name string. It looks up the integer index corresponding to the name in the CSV alias dictionary.

**Limitation**: The variable family must still be specified at compile time (the first parameter is a variable reference); cannot fully dynamically select the variable family.

**Function Reference**: [GETNUM](../Reference/GETNUM.en.md)

### Contemporaneous FORM Dynamic Evaluation

Emuera also introduced `RETURNFORM` and `CALLFORM`, leveraging FORM syntax's runtime expansion capability:

```erb
; RETURNFORM — FORM expansion followed by integer expression evaluation
RETURNFORM %L_EXPR%         ; Two phases: FORM expansion → integer expression parsing → write to RESULT

; CALLFORM — FORM expansion used as a function name
CALLFORM MY_FUNC_%L_SUFFIX% ; FORM expansion → function name lookup → call
```

!!! warning "RETURNFORM Only Returns Integers"

    `RETURNFORM` evaluates in two phases: FORM expansion → integer expression parsing. The final result is written to `RESULT` (an integer array); there is no `RETURNSFORM`. To return a string, use `RESULTS = ...` + `RETURN`.

    `CALLFORM` can only dynamically construct function names; parameters are still determined at compile time. `CALLFORM F_%X%(1, 2)` has fixed `(1, 2)`.

**Function Reference**: [RETURNFORM](../Reference/RETURN.en.md), [CALLFORM](../Reference/FORM.en.md)

---

## 6.3 Third Generation: Variable Reflection (EM Extensions) — String to Variable Token

EM (EvilMask) extensions introduced complete variable reflection capabilities, allowing dynamic access to variables via strings:

### Variable Existence Check

```erb
; EXISTVAR — check if a variable exists, returns a bitmask
R = EXISTVAR("MONEY")       ; 1=integer, 2=string, 32=float, 4=constant, 8=2D, 16=3D
R = EXISTVAR("NAME")        ; Returns 2 (string variable)

; ISDEFINED — check if a #DEFINE macro is defined
R = ISDEFINED("MY_MACRO")   ; 1=defined, 0=undefined
```

### Variable Read/Write

```erb
; GETVAR — read integer variable by string name
X = GETVAR("MONEY")            ; Equivalent to X = MONEY
X = GETVAR("COUNT:" + TSTR:0)  ; Dynamically construct variable name + index
X = GETVAR(L_VAR_NAME, 0)      ; Returns default value 0 if variable doesn't exist

; GETVARS — read string variable by string name
S '= GETVARS("NAME:TARGET")    ; Equivalent to S '= NAME:TARGET
S '= GETVARS(L_VAR_NAME, "")   ; Returns default value "" if variable doesn't exist

; SETVAR — write variable by string name
SETVAR "MONEY", 1000           ; Equivalent to MONEY = 1000
```

### Function/Variable/Macro Enumeration

```erb
; ENUMFUNC* — enumerate functions by prefix/suffix/containing
N = ENUMFUNCBEGINSWITH("SHOP")   ; Number of functions starting with "SHOP"
N = ENUMFUNCENDSWITH("_EVENT")   ; Number of functions ending with "_EVENT"
N = ENUMFUNCWITH("HELPER")       ; Number of functions containing "HELPER"

; ENUMVAR* — enumerate variables by prefix/suffix/containing
N = ENUMVARBEGINSWITH("FLAG")    ; Number of variables starting with "FLAG"

; ENUMMACRO* — enumerate macros by prefix/suffix/containing
N = ENUMMACROBEGINSWITH("DBG")   ; Number of macros starting with "DBG"
```

**Key Difference**: `GETVAR` only accepts variable references (not expressions), while `EVAL` accepts arbitrary expressions. `GETVAR("A + 10")` will error, `EVAL("A + 10")` evaluates normally.

**Function Reference**: [EXISTVAR](../Reference/EXISTVAR.en.md), [ISDEFINED](../Reference/ISDEFINED.en.md), [GETVAR/GETVARS/SETVAR](../Reference/GETSETVAR.en.md), [ENUMFUNC*](../Reference/ENUMFUNC.en.md), [ENUMVAR*](../Reference/ENUMVAR.en.md), [ENUMMACRO*](../Reference/ENUMMACRO.en.md)

### EE Extension: Index to Name Lookup

EE extensions introduced `ERDNAME`, implementing the reverse of `GETNUM` — given an index, query the corresponding name string:

```erb
; ERDNAME — find name by index
S '= ERDNAME(PALAM, 2)       ; Returns the name of PALAM:2 (e.g., "理由")
S '= ERDNAME(TALENT, 5)      ; Returns the name of TALENT:5 (e.g., "害羞")
```

**Function Reference**: [ERDNAME](../Reference/ERDNAME.en.md)

### DotNet Extension: Character Name to Index Lookup

DotNet variant introduced the `GETCSVNOBY*` series, looking up template indices by character name:

```erb
; GETCSVNOBY* — look up template index by character name
I = GETCSVNOBYNAME("博丽灵梦")          ; Look up by NAME
I = GETCSVNOBYNICKNAME("乐园的巫女")     ; Look up by NICKNAME
I = GETCSVNOBYCALLNAME("灵梦")           ; Look up by CALLNAME
I = GETCSVNOBYMASTERNAME("灵梦大人")     ; Look up by MASTERNAME
```

**Function Reference**: [GETCSVNOBY*](../Reference/GETCSVNOBY.en.md)

---

## 6.4 Fourth Generation: General Dynamic Evaluation (Skia) — String to Arbitrary Expression

### EVAL/EVALS/EVALF — General Expression Evaluation

The Skia variant introduced the EVAL series, a generalized upgrade of RETURNFORM. No longer bound to RETURN semantics, they serve as **expression functions** usable in any context:

```erb
; EVAL — dynamic integer evaluation
X = EVAL("A * 10")              ; Equivalent to X = A * 10
X = EVAL(L_EXPR, 0)             ; Returns default value 0 on parse failure

; EVALS — dynamic string evaluation
S '= EVALS("NAME:TARGET")        ; Equivalent to S '= NAME:TARGET
S '= EVALS(L_STR_EXPR, "")       ; Returns default value "" on parse failure

; EVALF — dynamic float evaluation
F = EVALF("3.14 * 2")           ; Float expression evaluation
F = EVALF(L_FLOAT_EXPR, 0.0)    ; Returns default value 0.0 on parse failure
```

### Key Differences from RETURNFORM

| | RETURNFORM | EVAL/EVALS/EVALF |
|------|-----------|------------------|
| **Usage Location** | Standalone command only | Expression function, usable in any expression |
| **Type Support** | Integer only | Integer/String/Float |
| **Default Value** | None (error on parse failure) | Yes (second parameter, defaults to type zero value) |
| **Exception Safety** | None (exception propagates) | Yes (returns default value on parse failure) |
| **Expression Type** | Integer expression only | Arbitrary expressions (including operators and function calls) |

### Key Differences from GETVAR

| | GETVAR/GETVARS | EVAL/EVALS/EVALF |
|------|---------------|------------------|
| **Accepts** | Variable references only | Arbitrary expressions |
| `GETVAR("A+10")` | ❌ Error | — |
| `EVAL("A+10")` | — | ✅ Evaluates normally |
| `GETVAR("MONEY")` | ✅ Reads variable | ✅ Also works |
| `EVAL("MONEY")` | — | ✅ But EVAL is heavier (needs full parsing) |

**Function Reference**: [EVAL/EVALS](../Reference/EVAL.en.md)

### CALLSTR — Fully Dynamic Function Name + Parameters Reflection

`CALLFORM` can only dynamically construct function names; parameters are still determined at compile time. `CALLSTR` goes further — **both function name and parameters are parsed from runtime strings**:

```erb
; CALLFORM: only the function name is dynamic
CALLFORM MY_FUNC_%SUFFIX%(1, 2)    ; Parameters (1, 2) are fixed

; CALLSTR: both function name and parameters are dynamic
L_CALL_STRING '= "MY_FUNC_A(1, 2)"
CALLSTR L_CALL_STRING               ; Parse function name + parameters at runtime

; Safe versions
TRYCALLSTR L_CALL_STRING             ; No crash if function doesn't exist
TRYCCALLSTR L_CALL_STRING            ; Jump to CATCH if function doesn't exist
```

**Function Reference**: [CALLSTR](../Reference/CALLSTR.en.md)

### ALS Multi-to-One Mapping Fix

In the upstream emuera.em CSV alias loading, the check was for **duplicate indices**, which meant only one name could exist per index. Skia fixed this by checking for **duplicate names** instead, allowing multiple names to map to the same index:

```csv
; palam.csv
2,理由
2,理性        ; ← Upstream: "duplicate index" warning, name not registered
              ; ← Skia: registered normally, GETNUM(PALAM, "理性") returns 2
2,Reason      ; ← Skia: also works, multi-to-one mapping
```

| | Upstream (emuera.em) | Skia Fix |
|------|:---:|:---:|
| **Check Target** | Duplicate index | Duplicate alias name |
| **Mapping Relationship** | One-to-one | Multi-to-one |
| **Same Index, Multiple Names** | ❌ Rejected | ✅ Registered normally |
| **Same Name, Multiple Indices** | Latter overwrites former | Rejected (name is unique) |

This is a design shift from "enumeration index is the primary key" to "enumeration name is the primary key" — the name is the identifier, the index is the value, and multiple identifiers can map to the same value.

---

## 6.5 Reflection Capability Evolution Summary

| Era | Capability | Representative Functions | Dynamic Degree | Query Direction |
|------|------|---------|---------|---------|
| eramaker | CSV index to value query | `CSVNAME`/`CSVBASE`/`CSVTALENT` | Index→Value (fixed mapping) | Index → Value |
| eramaker | Character index reverse lookup | `GETCHARA`/`FINDCHARA` | Index→Character index | Index → Index |
| eramaker | Value to level query | `GETPALAMLV`/`GETEXPLV` | Value→Level threshold | Value → Level |
| Emuera | Name to index lookup | `GETNUM` | String→Index mapping | Name → Index |
| Emuera | FORM dynamic return value | `RETURNFORM` | FORM→Integer parsing | String → Integer |
| Emuera | Function name reflection | `CALLFORM` | FORM→Function name lookup | String → Function |
| EM Extensions | Variable existence check | `EXISTVAR`/`ISDEFINED` | String→Token existence | Name → Existence |
| EM Extensions | Variable read/write | `GETVAR`/`GETVARS`/`SETVAR` | String→Variable value | Name → Value |
| EM Extensions | Function/Variable/Macro enumeration | `ENUMFUNC*`/`ENUMVAR*`/`ENUMMACRO*` | Prefix→Name list | Prefix → Name list |
| EE Extensions | Index to name lookup | `ERDNAME` | Variable+Index→Name | Index → Name |
| DotNet | Character name to index lookup | `GETCSVNOBY*` | Name→Template index | Name → Index |
| Skia | General expression evaluation | `EVAL`/`EVALS`/`EVALF` | String→Expression evaluation | String → Any value |
| Skia | Function + parameter reflection | `CALLSTR` | String→Complete function call | String → Function call |
| Skia | Multi-to-one enum mapping | ALS fix | CSV alias multi-to-one | Multiple names → Same index |

### Evolution Direction

```
Fixed mapping → Name lookup → Variable reflection → General evaluation
   ↑               ↑               ↑                   ↑
CSVNAME         GETNUM          GETVAR              EVAL
GETCHARA        RETURNFORM      EXISTVAR            CALLSTR
GETPALAMLV      CALLFORM        ENUM*               ALS fix
                                ERDNAME
                                GETCSVNOBY*
```

**Core Trend**: From "everything determined at compile time" to "on-demand runtime resolution". Each step of evolution corresponds to a specific need:

1. **CSV\* / GETCHARA**: Need to query values by known index
2. **GETNUM**: Need to look up an index by name string
3. **RETURNFORM / CALLFORM**: Need to dynamically construct return values or function names
4. **GETVAR / EXISTVAR / ENUM\***: Need to dynamically access variables by string
5. **ERDNAME / GETCSVNOBY\***: Need bidirectional index↔name queries
6. **EVAL / CALLSTR**: Need to evaluate arbitrary strings as expressions or function calls
7. **ALS fix**: Need multiple names for the same concept (multi-to-one mapping)

---

## Next Steps

| What would you like to learn? | Go to |
|:---|:---|
| Runtime mechanics (ConvertArg→IntoFunction) | [Runtime Mechanics](runtime-mechanics.en.md) (TBD) |
| Anti-patterns and common mistakes | [Anti-patterns](anti-patterns.en.md) (TBD) |
| Function declaration system | [Variable Declaration](variable-declaration.en.md) |
| Commands vs expressions | [Commands vs Expressions](command-vs-expression.en.md) |
| CSV alias mechanism | [Character Variables](character-variables.en.md) |
