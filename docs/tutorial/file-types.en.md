# File Types & Processing Order

!!! info "Corresponding Manual Sections"

    - [ERB Format](../eramaker/ERB_format.en.md) — ERB file format
    - [CSV Format](../eramaker/CSV_format.en.md) — CSV file format
    - [Header Files](../Emuera/ERH.en.md) — ERH header file specification

---

## Three File Types

ERABASIC programs consist of three types of files:

| Extension | Purpose | Processing Order | Analogy |
|--------|------|----------|------|
| `.CSV` | Data definitions (variable name mapping, character data, array sizes) | **First** | C's `.h` declarations + database seeds |
| `.ERH` | Header files (global variable declarations, macro definitions) | **Second** | C's `.h` header files |
| `.ERB` | Main scripts (function definitions and executable code) | **Last** | C's `.c` source files |

!!! important "Processing order is irreversible"

    The CSV → ERH → ERB processing order is fixed. This means:
    - Variable names defined in CSV can be used in ERH and ERB
    - Global variables declared in ERH can be used directly in ERB
    - ERB cannot define CSV or ERH level content

---

## CSV Files

CSV files define data-level content and are processed first during engine loading.

### Typical File Structure

```
CSV/
├── variable_size.csv     ← Built-in variable array sizes
├── _replace.csv          ← Variable name replacement mapping
├── chara/
│   ├── chara0.csv        ← Character 0 data
│   └── chara1.csv        ← Character 1 data
├── item.csv              ← Item list
├── talent.csv            ← Talent list
└── abl.csv               ← Ability list
```

### variable_size.csv

Defines array sizes for built-in variables:

```csv
BASE,100
TALENT,1000
ABL,100
EX,100
```

### _replace.csv

Variable name replacement mapping, maps display names to internal variable names:

```csv
HP,BASE:0
MP,BASE:1
```

### chara/*.csv

Character data definitions, each file defines one character:

```csv
; chara0.csv
名前,Elina
CALLNAME,Eli
BASE:0,1000
BASE:1,500
TALENT:0,1
```

---

## ERH Header Files

ERH files declare global variables and macros, processed before ERB.

### Typical File Structure

```
ERH/
└── VARIABLE.ERH
```

### Declaration Syntax

```erb
; Global integer variable
#DIM GAME_TURN, 100

; Global string variable
#DIMS SCENE_TEXT, 50

; Global float variable
#DIMF GAME_SCORE, 100

; Global constant
#DIM CONST MAX_PARTY = 6

; Cross-save global variable
#DIM GLOBAL HIGH_SCORE

; Save-persisted variable
#DIM SAVEDATA QUEST_FLAG, 100

; Character data variable
#DIM CHARADATA CHARA_LEVEL

; Macro definition
#DEFINE MAX_LEVEL 100
```

!!! warning "#DIM in ERH is a global declaration"

    `#DIM` in ERH declares **global variables** (`IsPrivate=false`), accessible from all ERB functions.
    `#DIM` inside ERB functions declares **private variables** (`IsPrivate=true`), accessible only within the current function.

---

## ERB Script Files

ERB files contain function definitions and executable code, processed last.

### Typical File Structure

```
ERB/
├── SYSTEM_TITLE.ERB      ← Title screen
├── SHOP.ERB              ← Shop screen
├── TRAIN.ERB             ← Training screen
├── SHOW_STATUS.ERB       ← Status display
└── COM/
    ├── COM0.ERB          ← Command 0
    └── COM1.ERB          ← Command 1
```

### File Naming Rules

- Extension must be `.ERB`, filename is arbitrary
- The engine loads all `.ERB` files sorted by filename
- Functions are defined by `@` label lines, independent of filename
- The same function cannot be defined in multiple files

---

## Complete Loading Flow

```
Engine Startup
  │
  ├── 1. Load CSV files
  │     ├── variable_size.csv → Set built-in variable array sizes
  │     ├── _replace.csv → Build variable name mapping
  │     └── chara/*.csv → Load character data
  │
  ├── 2. Load ERH header files
  │     └── VARIABLE.ERH → Register global variables in identifier dictionary
  │
  ├── 3. Load ERB script files
  │     ├── Parse @ label lines → Build function table
  │     ├── Parse # preprocessor lines → Register private variables
  │     └── Parse instruction lines → Generate executable code
  │
  └── 4. Call @SYSTEM_TITLE (if it exists)
        or display default title screen
```

---

## Next Steps

| What you want to learn | Go to |
|:---|:---|
| Line types & structure | [Line Types](line-types.en.md) |
| Variables & declaration system | [Declaration System](variable-declaration.en.md) |
