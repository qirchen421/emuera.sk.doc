# Character Variables

!!! info "Corresponding Manual"

    - [Variable Specifications and List](../Emuera/variables.en.md) — Complete specifications for all variables
    - [User-Defined Variables](../Emuera/user_defined_variables.en.md) — #DIM declaration specifications
    - [Header Files (ERH)](../Emuera/ERH.en.md) — Global variable declarations

---

## Overview

The core of era games is **characters** — each character has its own attributes, states, and abilities. ERABASIC manages this data through the **character variable** system.

The key difference between character variables and regular variables: the first dimension index of a character variable is the **character registration number**, and each character has its own independent set of data.

```erb
; Regular variable: one-dimensional index
FLAG:10 = 1

; Character variable: first dimension is character registration number
CFLAG:TARGET:10 = 1    ; Current training target's CFLAG #10
CFLAG:MASTER:10 = 1    ; Player character's CFLAG #10
```

---

## Character Number System

Understanding character variables requires understanding two types of "character numbers":

### Registration Number vs Character Number

| Concept | Identifier | Description | Characteristics |
|---------|-----------|-------------|-----------------|
| **Registration number** | `MASTER`/`TARGET`/`ASSI`/`PLAYER` | Dynamically assigned index by the engine | Starts from 0, sequential, changes with add/delete |
| **Character number** | `NO` | Fixed number defined in CSV | Static, identifies character template |

```erb
; Registration numbers are dynamic
; At game start, the player character is auto-registered as number 0
; ADDCHARA assigns the next sequential number
; DELCHARA causes numbers to be re-sequenced

; Character numbers are static
; Defined in the first column of CharaXX.csv
; Do not change with add/delete
```

### Four Core Registration Numbers

| Variable | Meaning | Default | Description |
|----------|---------|---------|-------------|
| `MASTER` | Player character's registration number | `0` (fixed) | Always 0 |
| `TARGET` | Current training target's registration number | `1` | The character being trained |
| `ASSI` | Assistant character's registration number | `-1` (no assistant) | The character assisting training |
| `PLAYER` | Current trainer's registration number | `0` (= MASTER) | Usually equals MASTER or ASSI, assigned by script |

> **PLAYER vs ASSIPLAY**: `PLAYER` indicates "who is performing the training", while `ASSIPLAY` indicates "whether the assistant is performing" (0=master trains, 1=assistant trains). When `ASSIPLAY == 1`, `PLAYER` is typically set to `ASSI`.

```erb
; Access player character's HP
BASE:MASTER:0

; Access training target's HP
BASE:TARGET:0

; Access assistant's HP (errors when ASSI is -1)
BASE:ASSI:0

; Access current trainer's HP
BASE:PLAYER:0

; Typical PLAYER assignment pattern
IF ASSIPLAY
    PLAYER = ASSI
ELSE
    PLAYER = MASTER
ENDIF
```

### Dynamic Nature of Registration Numbers

```erb
; Initial state: only player character, registration number 0
; MASTER == 0, CHARANUM == 1

ADDCHARA 5        ; Add character #5, registration number becomes 1
ADDCHARA 10       ; Add character #10, registration number becomes 2
; CHARANUM == 3

DELCHARA 1        ; Delete registration number 1
; Numbers are re-sequenced: former #2 becomes #1
; CHARANUM == 2
```

### Iterating Over All Characters

```erb
REPEAT CHARANUM
    ; COUNT is the current character's registration number (0 ~ CHARANUM-1)
    PRINTFORML RegNo={COUNT}, CharNo={NO:COUNT}, Name={NAME:COUNT}
REND
```

### Finding Registration Number by Character Number

```erb
#DIM regNo
regNo = GETCHARA(5)    ; Find registration number for character #5
IF regNo >= 0
    PRINTFORML Found, registration number={regNo}
ELSE
    PRINTL Character does not exist
ENDIF
```

---

## Character Variable Categories

### Basic Information Variables

Essential information for every character:

| Variable | Type | Description |
|----------|------|-------------|
| `NAME` | String | Character name |
| `CALLNAME` | String | Character nickname/call name |
| `NICKNAME` | String | Nickname |
| `MASTERNAME` | String | How they address the master |
| `NO` | Integer | Character number (CSV defined) |

```erb
PRINTFORML Name: %NAME:TARGET%
PRINTFORML Call name: %CALLNAME:TARGET%
PRINTFORML Character number: {NO:TARGET}
```

### Numeric Character Variables

The most commonly used character data storage:

| Variable | Description | Saved | Initialization |
|----------|-------------|:-----:|----------------|
| `BASE` | Base parameters (HP, stamina, etc.) | ✅ | — |
| `ABL` | Ability values | ✅ | — |
| `TALENT` | Traits (binary flags) | ✅ | — |
| `EXP` | Experience values | ✅ | — |
| `MARK` | Marks/imprints | ✅ | — |
| `CFLAG` | Custom flags | ✅ | — |
| `PALAM` | Parameters (change during training) | ✅ | At TRAIN loop start |
| `SOURCE` | Source values (for training calculations) | ✅ | Zeroed after `@SOURCE_CHECK` |
| `EX` | Orgasm experience | ✅ | At TRAIN loop start |
| `TEQUIP` | Equipment state | ✅ | At TRAIN loop start |
| `STAIN` | Stains | ✅ | At TRAIN loop start |
| `EQUIP` | Equipment | ✅ | — |
| `JUEL` | Jewels (for ability upgrades) | ✅ | — |
| `GOTJUEL` | Acquired jewels | ✅ | At TRAIN loop start |

```erb
; Read character's HP
PRINTFORML HP: {BASE:TARGET:0}

; Check trait
IF TALENT:TARGET:OBEDIENCE
    PRINTL She is obedient
ENDIF

; Set custom flag
CFLAG:TARGET:AFFINITY += 10
```

### String Character Variables

| Variable | Description | Saved |
|----------|-------------|:-----:|
| `CSTR` | Custom strings | ✅ |

```erb
CSTR:TARGET:10 = Special status: in heat
PRINTFORML Status: %CSTR:TARGET:10%
```

### TRAIN Loop-Specific Character Variables

These variables are automatically initialized to 0 at the start of the TRAIN loop:

| Variable | Description | Global counterpart |
|----------|-------------|-------------------|
| `CUP` | Character parameter increase | `UP` |
| `CDOWN` | Character parameter decrease | `DOWN` |
| `TCVAR` | Character temporary variable | `TFLAG` |

```erb
; CUP/CDOWN require CUPCHECK, not UPCHECK
CUP:TARGET:0 += 100
CUPCHECK TARGET
```

### Three-Dimensional Character Variables

| Variable | Description |
|----------|-------------|
| `CDFLAG` | 3D character variable, requires three indices |

```erb
; First parameter: character registration number
; Second and third parameters: custom indices
CDFLAG:MASTER:0:2 = 1
```

---

## Character Management Instructions

### Adding Characters

```erb
; Add character #0 (typically in FIRST)
ADDCHARA 0

; Add a specific character number
ADDCHARA 5

; Insert character at a specific position
ADDCHARA 3, 1    ; Insert character #3 at registration number 1
```

### Deleting Characters

```erb
; Delete character by registration number
DELCHARA 2

; Delete all characters (except MASTER)
; Note: this does not automatically re-number
```

### Finding Characters

```erb
; Find registration number by character number
#DIM regNo
regNo = GETCHARA(5)
; regNo >= 0 means found, -1 means not found

; Find by character name
regNo = GETCHARA("Hakurei Reimu")
```

### Character Count

```erb
; CHARANUM returns the current number of registered characters
PRINTFORML Current characters: {CHARANUM}
```

---

## Defining Character Data in CSV

Character data is defined in `CSV/CHARA*.CSV` files. The number in the filename is the **character number**.

### Basic Format

```csv
; CSV/CHARA0.CSV — Character number 0
番号,0
名前,Hakurei Reimu
呼び名,Reimu
基礎,0,1000
基礎,1,500
素質,0,1
能力,0,5
```

| Keyword | Variable | Description |
|---------|----------|-------------|
| `番号` | `NO` | Character number |
| `名前` | `NAME` | Character name |
| `呼び名` | `CALLNAME` | Call name |
| `基礎` | `BASE` | Base parameters |
| `素質` | `TALENT` | Traits |
| `能力` | `ABL` | Ability values |
| `経験` | `EXP` | Experience |
| `刻印` | `MARK` | Marks/imprints |
| `CFLAG` | `CFLAG` | Custom flags |
| `CSTR` | `CSTR` | Custom strings |

### CSV Name Files

Each character variable has a corresponding CSV name file that defines the names for each index:

```csv
; CSV/base.csv — Names for BASE variable
0,HP
1,SP
```

```erb
; Reference names
PRINTFORML %BASENAME:0%: {BASE:TARGET:0}
; Output: HP: 1000
```

---

## Custom Character Variables

When built-in character variables aren't enough, you can declare custom character variables in ERH header files:

```erb
; ERH/VARIABLE.ERH

; Custom character variables
#DIM CHARADATA AFFINITY       ; Integer type, independent per character
#DIMS CHARADATA SPECIAL_STATE ; String type, independent per character

; Saveable character variables
#DIM SAVEDATA CHARADATA INTIMACY
```

Usage is identical to built-in character variables:

```erb
AFFINITY:TARGET += 10
SPECIAL_STATE:TARGET:0 = In Love

PRINTFORML Affinity: {AFFINITY:TARGET}
PRINTFORML State: %SPECIAL_STATE:TARGET:0%
```

---

## RELATION — A Special Character Variable

`RELATION` is a special character variable whose second parameter is a **character number**, not a registration number:

```erb
; RELATION:registration_number:character_number
; Training target's relation with character #3
RELATION:TARGET:3 = 50
```

This differs from most character variables — other character variables use an array index as the second parameter, but `RELATION` uses a character number.

---

## Common Pitfalls

| Pitfall | Description | Solution |
|---------|-------------|----------|
| Confusing registration and character numbers | Registration numbers change with add/delete; character numbers are fixed | Use `GETCHARA()` to find registration number from character number |
| Accessing character variables when ASSI is -1 | When there's no assistant, `ASSI == -1`; accessing `BASE:ASSI:0` errors | Check `ASSI >= 0` first |
| Registration numbers change after DELCHARA | After deleting a character, subsequent registration numbers are re-sequenced | Use `CHARANUM` and `REPEAT` for iteration; don't cache registration numbers |
| Forgetting CUPCHECK for CUP/CDOWN | `CUP`/`CDOWN` require `CUPCHECK`, not `UPCHECK` | Character version uses `CUPCHECK`, global version uses `UPCHECK` |
| TALENT is a binary flag | `TALENT` values are 0 or 1, not arbitrary integers | Use `IF TALENT:TARGET:OBEDIENCE` not `IF TALENT:TARGET:OBEDIENCE > 0` |
| SOURCE is auto-zeroed | All `SOURCE` values are set to 0 after `@SOURCE_CHECK` | Save SOURCE values before `@SOURCE_CHECK` if needed |
| PALAM is zeroed at TRAIN start | `PALAM` is initialized at `BEGIN TRAIN` | Use `CFLAG` or `BASE` for data that persists across TRAIN loops |

---

## Next Steps

| What you want to learn | Go to |
|:---|:---|
| Event functions in detail | [Event Functions](event-functions.en.md) |
| State machine flow | [State Machine Flow](system-flow.en.md) |
| Variable declaration system | [Variable Declaration System](variable-declaration.en.md) |
| Complete variable specifications | [Variable Specifications](../Emuera/variables.en.md) |
| User-defined variables | [User-Defined Variables](../Emuera/user_defined_variables.en.md) |
