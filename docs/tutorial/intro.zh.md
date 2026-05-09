# ERABASIC 简介

!!! info "本节对应手册"

    - [函数·预处理器](../Emuera/function.md) — 函数声明的完整规格
    - [变量规格](../Emuera/variables.md) — 变量系统的完整规格
    - [版本演进对照](evolution.zh.md) — Emuera → EM+EE → 各变体功能对比

---

## 什么是 ERABASIC

ERABASIC 是一门**行驱动的领域特定语言（DSL）**，专为 era 系列文本游戏设计。它源自 eramaker 定义的 BASIC 变体，经 Emuera 及其变体大幅扩展。

ERABASIC 有三个与主流语言根本不同的特征：

| 特征 | 主流语言 | ERABASIC |
|------|---------|----------|
| 执行模型 | 块结构（花括号） | **行驱动**（一行一条语句） |
| 声明模型 | 签名即声明 | **签名引用 + 体内声明** |
| 类型模型 | 编译期静态类型 | **运行期三类型**（Int / Str / Float） |

### 行驱动

```erb
; 一行一条语句，没有分号，没有花括号
PRINTL 你好，世界
X = 10
Y = X * 2

; SIF 只能跟一条语句（没有 ENDIF）
SIF X > 5
    PRINTL X 大于 5

; IF 需要ENDIF
IF X > 5
    PRINTL X 大于 5
ELSE
    PRINTL X 不大于 5
ENDIF
```

### 签名引用 + 体内声明

```erb
; 函数签名中的参数名是对变量的"引用"，不是声明
; 变量必须通过 #DIM 在函数体内声明
@MY_FUNC(L_val, ARG:0)
#DIM L_val, 1              ; ← 声明 L_val，签名才能引用它
    L_val = ARG:0 * 2
    PRINTVL L_val
RETURN L_val
```

!!! warning "AI 和从主流语言转来的开发者最容易犯的错"

    主流语言中，参数类型和修饰符都在签名中声明。ERABASIC 不同：
    - 类型由 `#DIM`/`#DIMS`/`#DIMF` 决定（不是签名）
    - `REF`/`OUT` 在 `#DIM` 行声明（不是签名）
    - `#FUNCTION` 标记函数类型（不是签名语法）

    详见 [声明系统](declaration.zh.md)。

### 三类型体系

| 类型 | 声明关键字 | 参数变量 | 字面量 | 默认值 |
|------|-----------|---------|--------|--------|
| Integer | `#DIM` | `ARG` | `42` | `0` |
| String | `#DIMS` | `ARGS` | `"hello"` | `""` |
| Float | `#DIMF` | `ARGF` | `3.14` | `0.0` |

三种类型之间**不会自动转换**（除 Int→Float 的安全提升）。

---

## 版本演进

ERABASIC 的演进路线：

```
eramaker（2005）  →  Emuera（2008-2017）  →  EM+EE（2019-）  →  各派生版
  原始定义              大幅扩展              功能增强            Skia / DotNet / m-emuera
```

| 版本 | 特点 |
|------|------|
| **eramaker** | 原始定义，功能有限，仅作历史参考 |
| **Emuera** | 大幅扩展，现代 ERABASIC 的基准线 |
| **EM+EE** | 音频、热键、剪贴板、TTF/OTF 动态加载 |
| **Skia 版** | 懒加载、MAP 增强、SQL/XML、SETIMAGELAYER |
| **DotNet** | SkiaSharp 跨平台、并行加载、DICT 字典 |
| **m-emuera** | Avalonia UI 跨平台参考实现 |

!!! tip "本教程以 Emuera 为基准线"

    eramaker 仅在版本演进章节中作为历史参考提及。现代 ERABASIC 以 Emuera 为基准，EM+EE 及各变体的扩展功能在各章节末尾单独标注。

---

## 下一步

| 你想了解什么 | 前往 |
|:---|:---|
| 文件类型与处理顺序 | [文件类型](file-types.zh.md) |
| 行类型与结构 | [行类型](line-types.zh.md) |
| 写第一个 ERB 程序 | [Hello World](hello-world.zh.md) |
| 变量与声明系统 | [声明系统](declaration.zh.md) |
