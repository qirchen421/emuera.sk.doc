# ERABASIC 教程

!!! tip "学习路径"

    本教程以 **Emuera** 为基准线，按照 **Emuera → EM+EE → 各变体** 的演进路线组织。eramaker 仅作为历史参考。

---

## 🚀 快速开始

| 如果你想要... | 请从这里开始 |
|:---|:---|
| 了解什么是 era 游戏 | [era 游戏是什么](#era-game) |
| 第一次编写 ERB 脚本 | [第一个 ERB 程序](#first-erb-program) |
| 从基础系统学习 | [ERABASIC 简介](intro.zh.md) |
| 查找某个指令的用法 | [指令参考手册](../Reference/README.md) |
| 了解 EM+EE 有什么新功能 | [EM+EE 功能概览](../EMEE/EMEE_Summary.zh.md) |
| 了解 Skia 版有什么新功能 | [Skia 版功能概览](../Skia/Skia_Summary.zh.md) |

---

## 📚 学习路径

!!! info "阅读指南"

    各章内容以前一章为基础。初学者请从第1章开始顺序阅读。有经验的开发者可以按需跳读。

    | 标记 | 含义 |
    |:----:|------|
    | 🔴 必读 | 核心章节，不掌握则无法编写正常脚本 |
    | 🟡 推荐 | 实用章节，掌握后可显著提升开发效率 |
    | 🟢 选读 | 进阶章节，按需学习 |

### 第1章：简介 🔴 必读

> 理解 ERABASIC 的全貌，运行第一个程序

**前置知识**：无｜**本章要点**：era 游戏的文件结构、ERB 脚本的基本运行方式

| 主题 | 内容 |
|:---|:---|
| [ERABASIC 是什么](intro.zh.md) | BASIC 变体、行驱动 DSL、era 游戏脚本 |
| [Hello World](hello-world.zh.md) | 第一个 ERB 程序，PRINT 是你认识的第一个指令 |
| [文件类型与处理顺序](file-types.zh.md) | ERB/ERH/CSV 三层结构 |
| [行类型与结构](line-types.zh.md) | @标签行、#预处理行、指令行、$标签行 |
| [版本演进](evolution.zh.md) | eramaker → Emuera → EM+EE → Skia |

### 第2章：基础语法 🔴 必读

> 理解值与变量，学会编写基本的输入输出

**前置知识**：第1章「简介」｜**本章要点**：Int/Str/Float 三类型、`=` 与 `'=` 的区别、FORM 语法 `{变量}` 替换

| 主题 | 内容 |
|:---|:---|
| [值、类型与变量](values-types.zh.md) | Int/Str/Float 三类型、A-Z 保留变量、类型转换 |
| [赋值语句](assignment.zh.md) | `=` vs `'=`、复合赋值、自增自减、批量赋值 |
| [基本输出](basic-output.zh.md) | PRINT/PRINTFORM/PRINTSINGLE/PRINTL |
| [FORM 语法](form-syntax.zh.md) | 格式化字符串、`{变量}`替换、填充对齐、`\@`三元运算符 |

### 第3章：控制流 🔴 必读

> 掌握控制程序流程的语法

**前置知识**：第2章「基础语法」｜**本章要点**：IF/SIF 分支、REPEAT 循环、GOTO 与 $ 标签

| 主题 | 内容 |
|:---|:---|
| [条件分支](condition.zh.md) | IF/SIF/SELECTCASE |
| [循环](loop.zh.md) | REPEAT/FOR/WHILE/DO、CONTINUE/BREAK |
| [跳转](jump.zh.md) | GOTO/$标签、GOTO 与循环的交互 |

### 第4章：函数 🔴 必读

> 将程序拆分为函数，实现代码复用

**前置知识**：第3章「控制流」｜**本章要点**：CALL/RETURN 调用链、#DIM 声明规则、命令函数 vs 表达式函数（RESULT 污染）

| 主题 | 内容 |
|:---|:---|
| [函数与 CALL](call.zh.md) | @标签、CALL/JUMP、RETURN、参数传递、INPUT |
| [变量声明系统](variable-declaration.zh.md) | CONST/DYNAMIC/STATIC/GLOBAL/SAVEDATA/CHARADATA/REF/OUT、VARIADIC |
| [ERB 文件格式扩展](erb-format-extension.zh.md) | 行连接、#DIM/#DIMS、#FUNCTION、条件编译 |
| [命令 vs 表达式](command-vs-expression.zh.md) | 命令语法与表达式语法的边界、RESULT 污染、CALLF |

### 第5章：引擎特性 🟡 推荐

> 理解引擎内置的运行时特性——状态机、事件钩子、角色数据系统。这些不是语言语法，而是引擎为你预设好的调度机制。

**前置知识**：第4章「函数」｜**本章要点**：TITLE→SHOP→TRAIN 状态循环、@EVENT* 钩子注册、角色编号 vs 注册编号

| 主题 | 内容 |
|:---|:---|
| [状态机流程](system-flow.zh.md) | TITLE→FIRST→SHOP→TRAIN 循环、BEGIN 指令、两状态模型 |
| [事件函数](event-functions.zh.md) | @EVENTFIRST/@EVENTSHOP/@EVENTLOAD、#PRI/#LATER、BEFORE_THROW/BEFORE_ERROR |
| [角色变量](character-variables.zh.md) | 角色编号系统（MASTER/TARGET/ASSI/PLAYER）、角色变量（CFLAG/TALENT/ABL）、角色管理指令 |

### 第6章：HTML 与图形 🟢 选读

> 处理富文本显示与图形

**前置知识**：第2章「基础语法」｜**本章要点**：HTML_PRINT 标签语法、各变体属性差异

| 主题 | 内容 |
|:---|:---|
| [HTML 标签语法](html-syntax.zh.md) | HTML_PRINT 标签、属性、变体差异 |

### 第7章：高级主题 🟢 选读

> 动态解析、运行时机制、反模式——深入理解 ERABASIC

**前置知识**：第4章「函数」｜**本章要点**：三阶段流水线、REF 变量生命周期、常见错误规避

| 主题 | 内容 |
|:---|:---|
| [动态解析与反射](dynamic-reflection.zh.md) | RETURNFORM→EVAL→CALLFORM→CALLSTR→变量反射→ALS别名 |
| [运行时机制](runtime-mechanics.zh.md) | ConvertArg→SetTransporter→IntoFunction、REF变量生命周期 |
| [反模式与常见错误](anti-patterns.zh.md) | 作用域误解、FORM误用、REF/OUT混淆、HTML输出错误 |

---

## era 游戏是什么 {: #era-game }

era 游戏是一类基于文本的角色扮演/模拟游戏，使用 **ERABASIC** 语言编写脚本。ERABASIC 最初由 eramaker 定义，后经 Emuera 及其变体大幅扩展。现代 ERABASIC 以 Emuera 为基准。

详情请参见「[第1章：ERABASIC 简介](intro.zh.md)」。

一个 era 游戏的典型文件结构：

```
游戏目录/
├── Emuera.exe          ← 引擎可执行文件
├── CSV/                ← 数据定义文件
│   ├── CHARA0.CSV      ← 角色0的数据
│   ├── item.CSV        ← 物品列表
│   └── VariableSize.csv← 变量大小配置
├── ERB/                ← 脚本文件
│   ├── SYSTEM_TITLE.ERB← 标题画面
│   ├── SHOP.ERB        ← 商店画面
│   └── TRAIN.ERB       ← 训练画面
├── ERH/                ← 头文件（全局变量声明）
│   └── VARIABLE.ERH
├── resource/           ← 图片资源
└── sound/              ← 音频资源
```

## 第一个 ERB 程序 {: #first-erb-program }

详情请参见「[第2章：Hello World](hello-world.zh.md)」。

在 `ERB/SYSTEM_TITLE.ERB` 中编写你的第一个函数：

```erabasic
@SYSTEM_TITLE
    PRINTL 欢迎来到 era 世界！
    PRINTL [0] 开始游戏
    PRINTL [1] 读取存档
    INPUT
    IF RESULT == 0
        BEGIN FIRST
    ELSEIF RESULT == 1
        BEGIN LOADGAME
    ENDIF
```

这定义了一个自定义标题画面，显示两个选项并根据用户输入跳转。

---

!!! info "接下来阅读"

    - **从基础系统学习**：[ERABASIC 简介](intro.zh.md)
    - **制作手册**：[初级教程](../manual/modification-manual.zh.md) → [中级教程](../manual/eratohowiki-ERBmanual.zh.md)
    - **完整指令参考**：[Reference](../Reference/README.md)
    - **Emuera 规格**：[规格概要](../Emuera/README.zh.md)
    - **EM+EE 新功能概览**：[EMEE_Summary](../EMEE/EMEE_Summary.zh.md)
    - **Skia 版功能概览**：[Skia 版功能概览](../Skia/Skia_Summary.zh.md)
