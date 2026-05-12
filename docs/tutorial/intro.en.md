# ERABASIC Introduction

!!! info "Corresponding Manual Sections"

    - [Functions & Preprocessor](../Emuera/function.en.md) — Complete specification for function declarations
    - [Variable Specification](../Emuera/variables.en.md) — Complete specification for the variable system
    - [Version Evolution Comparison](evolution.en.md) — Emuera → EM+EE → Variant feature comparison

---

## What is ERABASIC

ERABASIC is a **line-driven domain-specific language (DSL)** designed for the era series of text games. It originated from the BASIC variant defined by eramaker and was significantly extended by Emuera and its variants.

ERABASIC has three characteristics that fundamentally differ from mainstream languages:

| Characteristic | Mainstream Languages | ERABASIC |
|------|---------|----------|
| Execution model | Block-structured (curly braces) | **Line-driven** (one statement per line) |
| Declaration model | Signature is declaration | **Signature reference + in-body declaration** |
| Type model | Compile-time static types | **Runtime three-type** (Int / Str / Float) |

### Line-driven

```erb
; One statement per line, no semicolons, no curly braces
PRINTL Hello, World
X = 10
Y = X * 2

; SIF can only control one following line (no ENDIF needed)
SIF X > 5
    PRINTL X is greater than 5

; IF requires ENDIF
IF X > 5
    PRINTL X is greater than 5
ELSE
    PRINTL X is not greater than 5
ENDIF
```

### Signature reference + in-body declaration

```erb
; Parameter names in function signatures are "references" to variables, not declarations
; Variables must be declared via #DIM inside the function body
@MY_FUNC(L_val, ARG:0)
#DIM L_val, 1              ; ← Declare L_val, then the signature can reference it
    L_val = ARG:0 * 2
    PRINTVL L_val
RETURN L_val
```

!!! warning "The most common mistake for AI and developers coming from mainstream languages"

    In mainstream languages, parameter types and modifiers are declared in the signature. ERABASIC is different:
    - Types are determined by `#DIM`/`#DIMS`/`#DIMF` (not the signature)
    - `REF`/`OUT` are declared on `#DIM` lines (not in the signature)
    - `#FUNCTION` marks the function type (not signature syntax)

    See [Declaration System](variable-declaration.en.md) for details.

### Three-type system

| Type | Declaration keyword | Parameter variable | Literal | Default value |
|------|-----------|---------|--------|--------|
| Integer | `#DIM` | `ARG` | `42` | `0` |
| String | `#DIMS` | `ARGS` | `"hello"` | `""` |
| Float | `#DIMF` | `ARGF` | `3.14` | `0.0` |

The three types **do not auto-convert** between each other (except for the safe Int→Float promotion).

---

## Version Evolution

ERABASIC's evolution path:

```
eramaker (2005)  →  Emuera (2008-2017)  →  EM+EE (2019-)  →  Various derivatives
  Original definition       Major extension         Feature enhancement       Skia / DotNet / m-emuera
```

| Version | Characteristics |
|------|------|
| **eramaker** | Original definition, limited features, only for historical reference |
| **Emuera** | Major extension, the baseline for modern ERABASIC |
| **EM+EE** | Audio, hotkeys, clipboard, TTF/OTF dynamic loading |
| **Skia** | Lazy loading, MAP enhancements, SQL/XML, SETIMAGELAYER |
| **DotNet** | SkiaSharp cross-platform, parallel loading, DICT dictionary |
| **m-emuera** | Avalonia UI cross-platform reference implementation |

!!! tip "This tutorial uses Emuera as the baseline"

    eramaker is only mentioned in the version evolution chapter as historical reference. Modern ERABASIC uses Emuera as its baseline. Extensions from EM+EE and variants are noted separately at the end of each chapter.

---

## Next Steps

| What you want to learn | Go to |
|:---|:---|
| File types & processing order | [File Types](file-types.en.md) |
| Line types & structure | [Line Types](line-types.en.md) |
| Write your first ERB program | [Hello World](hello-world.en.md) |
| Variables & declaration system | [Declaration System](variable-declaration.en.md) |
