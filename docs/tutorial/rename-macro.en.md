# Rename Macro: `[[name]]` Compile-Time Substitution

!!! info "Prerequisites"

    - [File Types and Load Order](file-types.en.md) — where CSV/ERH/ERB files live and how they load
    - [Variable Declarations — Identifiers: CSV / ALS / ERD](variable-declaration.en.md#identifiers) — the name→index identifier dictionaries
    - [Constant Folding](constant-folding.en.md) — substituted results participate in constant folding and SELECTCASE jump tables

!!! tip "Key points"

    - `[[name]]` is a **whole-line text substitution at file-read time** driven by `CSV/_Rename.csv`. Left column = the substituted value (usually a number), right column = the notation you write in ERB
    - Substitution happens **before** lexical analysis and comment stripping. An unregistered `[[…]]` is a **compile error** — typos never silently survive to runtime (fail-fast)
    - It is a **separate mechanism** from the CSV/ERD/ALS identifier dictionaries (name→index). The substitution result is constant text that can be embedded anywhere in an expression

---

## What is Rename?

Rename is a lightweight macro feature originating from EraMakerEx. It replaces the `[[name]]` notation in ERB files with a value registered in `CSV/_Rename.csv`. Its original purpose is to let scripts refer to numbers by name.

Enable it with the "Use _Rename.csv" config option (**default: NO**). If the option is off, every `[[…]]` in your ERB files is a compile error. See the [config reference](../Emuera/config.en.md).

## `_Rename.csv` Format

Place `_Rename.csv` directly under the `CSV` folder. Each line is `value, name`:

```csv
; Left column = substituted value (usually a number), right column = the [[notation]] written in ERB
8,千百合
44,爱莲
44,マイ      ; Multiple names pointing to the same value is fine
```

Rules:

| Rule | Description |
|------|-------------|
| Comment lines | Lines starting with `;` are skipped (useful for disabling a registration) |
| Duplicate names | When the same right column appears more than once, the **later line wins** (there is only one dictionary) |
| One flat namespace | The whole file is a single flat dictionary. Same names across categories (e.g. an item and a dish both called "Ice Cream") collide — prefix one side (e.g. `ITEM_`) to separate them |
| Encoding | Character encoding is auto-detected |

## Processing Pipeline

1. **At startup**: when the config option is enabled, `_Rename.csv` is loaded, building a dictionary of `[[right column]]` → left column
2. **At file read**: each ERB line is scanned with the regex `\[\[.*?\]\]`; matches found in the dictionary are replaced by the value text. Because this happens **before comment stripping**, `[[name]]` inside comments is substituted too
3. **At lexical analysis**: any remaining `[[…]]` is a **compile error**

Substitution is pure text replacement — the result (number text such as `8`) is embedded into the expression as-is, so it can participate in [constant folding](constant-folding.en.md) and `SELECTCASE` jump-table optimization.

## Comparing the Name→Value Mechanisms

ERABASIC has several mechanisms for "referring to numbers by name". They serve different roles — do not confuse them:

| Mechanism | Defined in | Notation | If unregistered | Notes |
|-----------|-----------|----------|-----------------|-------|
| CSV identifier file | `CSV/variablename.csv` | `ITEM:name`, `GETNUM` | Fails at runtime (`GETNUM` returns -1) | Name definitions for built-in variables |
| ERD | `ERB/variablename.erd` | Same | Same | Name definitions for `#DIM` global variables |
| ALS (alias) | Same-name `.als` next to `.erd`/`.csv` | Same (aliases allowed) | Same | Adds alternative names to the same index |
| **Rename (this page)** | `CSV/_Rename.csv` | `[[name]]` | **Compile error** | Embeds value text anywhere in an expression |
| `#DIM CONST` / `#DEFINE` | Inside ERH | Bare identifier | Compile error | Constants defined in code |

The identifier dictionary family (CSV/ERD/ALS) serves only **name-indexed variable access**, consumed by `variable:name` and `GETNUM`. Rename is not tied to any variable: it can embed a value anywhere in an expression — `CASE` values, arithmetic, array indices. See [Variable Identifiers: CSV / ALS / ERD](variable-declaration.en.md#identifiers).

## Usage Examples

```erb
; Write CASE values by name ([[おにぎり]] → 101)
SELECTCASE FLAG:料理
    CASE [[おにぎり]]
        PRINTL rice ball

; Inside arithmetic (offset + character number)
CASE DISH_CHARA_OFFSET + [[千百合]]    ; → DISH_CHARA_OFFSET + 8

; Simply checking the value
PRINTV [[千百合]]    ; → 8
```

In integer-comparison contexts, do not mix string literals `"name"` with `[[name]]`:

```erb
; ❌ "みかん" is a string literal — never equals an integer ARG
SIF GROUPMATCH(ARG, [[りんご]], "みかん")

; ✅ Use [[name]] consistently
SIF GROUPMATCH(ARG, [[りんご]], [[みかん]])
```

## Common Pitfalls

| Pitfall | Symptom | Fix |
|---------|---------|-----|
| Mixing `"name"` (string) with `[[name]]` (value) | String literals never match in integer contexts | Use `[[name]]` consistently |
| Unregistered name | Compile error (fail-fast) | Add a `value,name` line to `_Rename.csv` |
| Cross-category name collision | The later line wins, resolving to an unintended number | Separate namespaces with prefixes (e.g. `ITEM_`) |
| `[[name]]` inside comments | Substitution precedes comment stripping, so comments are affected | Be careful when writing names in comments |
| Config option off | Every `[[…]]` is a compile error | Enable "Use _Rename.csv" |

## Related Chapters

- [Variable Identifiers: CSV / ALS / ERD](variable-declaration.en.md#identifiers) — the name→index dictionaries (contrast with this mechanism)
- [Constant Folding](constant-folding.en.md) — how substituted constants get optimized
- [File Types and Load Order](file-types.en.md) — where CSV/ERH/ERB live and how they load
- [Config reference](../Emuera/config.en.md) — the "Use _Rename.csv" option
- [_Replace.csv](../Emuera/replace.en.md) — a similarly named file (display settings; a completely different mechanism)
