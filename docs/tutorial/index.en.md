# ERABASIC Tutorial

!!! tip "Learning Path"

    This tutorial uses **Emuera** as the baseline, organized along the evolution path **Emuera → EM+EE → Variants**. eramaker is only referenced as historical context.

---

## 🚀 Quick Start

| If you want to... | Start here |
|:---|:---|
| Understand what era games are | [What is an era game](#era-game) |
| Write your first ERB script | [First ERB Program](#first-erb-program) |
| Learn from the basics | [ERABASIC Introduction](intro.en.md) |
| Look up a specific instruction | [Instruction Reference](../Reference/README.en.md) |
| See what's new in EM+EE | [EM+EE Feature Overview](../EMEE/EMEE_Summary.en.md) |
| See what's new in Skia | [Skia Feature Overview](../Skia/Skia_Summary.en.md) |

---

## 📚 Learning Path

!!! info "Reading Guide"

    Each chapter builds on the previous one. Beginners should start from Chapter 1 and read sequentially. Experienced developers can skip ahead as needed.

    | Mark | Meaning |
    |:----:|---------|
    | 🔴 Must-read | Core chapters — you cannot write proper scripts without these |
    | 🟡 Recommended | Practical chapters — significantly improves development efficiency |
    | 🟢 Optional | Advanced chapters — learn as needed |

### Chapter 1: Introduction 🔴 Must-read

> Understand the big picture of ERABASIC and run your first program

**Prerequisites**: None ｜ **Key points**: era game file structure, basic ERB script execution

| Topic | Content |
|:---|:---|
| [What is ERABASIC](intro.en.md) | BASIC variant, line-driven DSL, era game scripting |
| [Hello World](hello-world.en.md) | Your first ERB program; PRINT is your first instruction |
| [File Types & Processing Order](file-types.en.md) | ERB/ERH/CSV three-layer structure |
| [Line Types & Structure](line-types.en.md) | @label lines, #preprocessor lines, instruction lines, $label lines |
| [Version Evolution](evolution.en.md) | eramaker → Emuera → EM+EE → Skia |

### Chapter 2: Basic Syntax 🔴 Must-read

> Understand values and variables, learn basic input/output

**Prerequisites**: Chapter 1 "Introduction" ｜ **Key points**: Int/Str/Float three types, `=` vs `'=` distinction, FORM syntax `{variable}` substitution

| Topic | Content |
|:---|:---|
| [Values, Types & Variables](values-types.en.md) | Int/Str/Float three types, A-Z reserved variables, type conversion |
| [Assignment Statements](assignment.en.md) | `=` vs `'=`、compound assignment, increment/decrement, batch assignment |
| [Basic Output](basic-output.en.md) | PRINT/PRINTFORM/PRINTSINGLE/PRINTL |
| [FORM Syntax](form-syntax.en.md) | Formatted strings, `{variable}` substitution, padding/alignment, `\@` ternary operator |

### Chapter 3: Control Flow 🔴 Must-read

> Master syntax for controlling program flow

**Prerequisites**: Chapter 2 "Basic Syntax" ｜ **Key points**: IF/SIF branching, REPEAT loops, GOTO and $ labels

| Topic | Content |
|:---|:---|
| [Conditional Branching](condition.en.md) | IF/SIF/SELECTCASE |
| [Loops](loop.en.md) | REPEAT/FOR/WHILE/DO, CONTINUE/BREAK |
| [Jumps](jump.en.md) | GOTO/$label, GOTO interaction with loops |

### Chapter 4: Functions 🔴 Must-read

> Split programs into functions for code reuse

**Prerequisites**: Chapter 3 "Control Flow" ｜ **Key points**: CALL/RETURN call chain, #DIM declaration rules, command functions vs expression functions (RESULT pollution)

| Topic | Content |
|:---|:---|
| [Functions & CALL](call.en.md) | @label, CALL/JUMP, RETURN, parameter passing, INPUT |
| [Variable Declaration System](variable-declaration.en.md) | CONST/DYNAMIC/STATIC/GLOBAL/SAVEDATA/CHARADATA/REF/OUT, VARIADIC |
| [ERB Format Extensions](erb-format-extension.en.md) | Line continuation, #DIM/#DIMS, #FUNCTION, conditional compilation |
| [Command vs Expression](command-vs-expression.en.md) | Boundary between command syntax and expression syntax, RESULT pollution, CALLF |

### Chapter 5: Engine Features 🟡 Recommended

> Understand built-in runtime features — state machine, event hooks, character data system. These are not language syntax, but scheduling mechanisms the engine pre-configures for you.

**Prerequisites**: Chapter 4 "Functions" ｜ **Key points**: TITLE→SHOP→TRAIN state loop, @EVENT* hook registration, character number vs registration number

| Topic | Content |
|:---|:---|
| [State Machine Flow](system-flow.en.md) | TITLE→FIRST→SHOP→TRAIN loop, BEGIN instruction, two-state model |
| [Event Functions](event-functions.en.md) | @EVENTFIRST/@EVENTSHOP/@EVENTLOAD, #PRI/#LATER, BEFORE_THROW/BEFORE_ERROR |
| [Character Variables](character-variables.en.md) | Character number system (MASTER/TARGET/ASSI/PLAYER), character variables (CFLAG/TALENT/ABL), character management instructions |

### Chapter 6: HTML & Graphics 🟢 Optional

> Handle rich text display and graphics

**Prerequisites**: Chapter 2 "Basic Syntax" ｜ **Key points**: HTML_PRINT tag syntax, attribute differences across variants

| Topic | Content |
|:---|:---|
| [HTML Tag Syntax](html-syntax.en.md) | HTML_PRINT tags, attributes, variant differences |
| [Resource Configuration](resources.en.md) | CSV definition format, image formats, Skia resource management |

### Chapter 7: Advanced Topics 🟢 Optional

> Dynamic analysis, runtime mechanics, function safety, constant folding — aiming for deep understanding of ERABASIC

**Prerequisites**: Chapter 4 "Functions" ｜ **Key points**: Three-stage pipeline, METHOD_SAFE restrictions, CanRestructure and compile-time optimization

| Topic | Content |
|:---|:---|
| [Dynamic Analysis & Reflection](dynamic-reflection.en.md) | RETURNFORM→EVAL→CALLFORM→CALLSTR→variable reflection→ALS aliases |
| [Runtime Mechanics](runtime-mechanics.en.md) | ConvertArg→SetTransporter→IntoFunction, REF variable lifecycle |
| [Function Safety & METHOD_SAFE](method-safety.en.md) | Command restrictions in #FUNCTION bodies, METHOD_SAFE flag, distinction from RESULT pollution |
| [Constant Folding](constant-folding.en.md) | CanRestructure, array initialization constant folding, SELECTCASE jump table optimization |

---

## What is an era game {: #era-game }

Era games are a genre of text-based role-playing/simulation games scripted in **ERABASIC**. ERABASIC was originally defined by eramaker and later significantly extended by Emuera and its variants. Modern ERABASIC uses Emuera as its baseline.

See "[Chapter 1: ERABASIC Introduction](intro.en.md)" for details.

A typical era game file structure:

```
Game directory/
├── Emuera.exe          ← Engine executable
├── CSV/                ← Data definition files
│   ├── CHARA0.CSV      ← Character 0 data
│   ├── item.CSV        ← Item list
│   └── VariableSize.csv← Variable size configuration
├── ERB/                ← Script files
│   ├── SYSTEM_TITLE.ERB← Title screen
│   ├── SHOP.ERB        ← Shop screen
│   └── TRAIN.ERB       ← Training screen
├── ERH/                ← Header files (global variable declarations)
│   └── VARIABLE.ERH
├── resource/           ← Image resources
└── sound/              ← Audio resources
```

## First ERB Program {: #first-erb-program }

See "[Chapter 2: Hello World](hello-world.en.md)" for details.

Write your first function in `ERB/SYSTEM_TITLE.ERB`:

```erabasic
@SYSTEM_TITLE
    PRINTL Welcome to the era world!
    PRINTL [0] Start Game
    PRINTL [1] Load Save
    INPUT
    IF RESULT == 0
        BEGIN FIRST
    ELSEIF RESULT == 1
        BEGIN LOADGAME
    ENDIF
```

This defines a custom title screen that displays two options and transitions based on user input.

---

!!! info "What to Read Next"

    - **Learn from the basics**: [ERABASIC Introduction](intro.en.md)
    - **Authoring manual**: [Beginner Tutorial](../manual/modification-manual.en.md) → [Intermediate Tutorial](../manual/eratohowiki-ERBmanual.en.md)
    - **Complete instruction reference**: [Reference](../Reference/README.en.md)
    - **Emuera specification**: [Specification Overview](../Emuera/README.en.md)
    - **EM+EE new features overview**: [EMEE_Summary](../EMEE/EMEE_Summary.en.md)
    - **Skia feature overview**: [Skia Feature Overview](../Skia/Skia_Summary.en.md)
