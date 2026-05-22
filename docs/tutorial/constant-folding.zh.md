# 常量折叠（Constant Folding）

!!! info "前置知识"

    - **Reference 分类**: [变量声明系列](../Reference/README.zh.md#variable-declaration)
    - [变量声明系统](variable-declaration.zh.md) — #DIM/#DIMS/#DIMF 声明、数组初始化
    - [条件分支](condition.zh.md) — SELECTCASE 语法
    - [命令 vs 表达式](command-vs-expression.zh.md) — 表达式函数机制

!!! tip "本章要点"

    - ERABASIC 能在编译期对表达式求值（常量折叠），使 `#DIM ARR = POWER(2,3)` 这样的数组初始化成为可能
    - 只有 `CanRestructure` 属性为 `true` 的函数才能被常量折叠。数学函数（POWER/ABS/SQRT 等）必须设 `CanRestructure = true`
    - SELECTCASE 的 CASE 值为常量时，编译期可构建跳转表，将 O(n) 线性扫描优化为 O(1) 哈希查找

---

## 什么是常量折叠

常量折叠（Constant Folding）是指**在编译期就能计算出结果的表达式，提前求值并替换为常量**的优化技术。

ERABASIC 中常量折叠主要用于两个场景：

1. **数组初始化** — 将 `#DIM ARR = POWER(2,3)` 转换为 `#DIM ARR = 8`
2. **SELECTCASE 跳转表** — CASE 值为常量时构建哈希表

---

## CanRestructure — 常量折叠的关键

### 概念

`CanRestructure` 是 `FunctionMethod` 类的属性，表示该函数**对相同参数始终返回相同值**（引用透明）。

```csharp
// FunctionMethod.cs
public virtual bool CanRestructure => false;  // 默认：不可常量折叠

// 示例：POWER 函数
private sealed class PowerMethod : FunctionMethod
{
    public PowerMethod()
    {
        ReturnType = typeof(long);
        argumentTypeArray = [typeof(long), typeof(long)];
        CanRestructure = true;  // ← 相同参数，相同结果
    }
}
```

### CanRestructure 为 true 的条件

| 条件 | 说明 |
|------|------|
| 相同参数始终返回相同值 | 引用透明性（pure function） |
| 不依赖全局状态 | 不依赖 RESULT、变量值等 |
| 无副作用 | 不进行 I/O、修改变量等 |

### CanRestructure 为 false 的示例

| 函数 | 原因 |
|------|------|
| `GETTIME` | 每次调用返回不同值 |
| `RAND` | 返回随机值 |
| `GETCHARA` | 角色增删会改变结果 |
| `GETVAR` | 依赖变量的运行时值 |

---

## 数组初始化中的常量折叠

### 规则

`#DIM`/`#DIMS`/`#DIMF` 的数组初始化器只能指定**常量**。但 `CanRestructure = true` 的函数会被视为常量，因此可以在初始化器中使用。

### 折叠流程

```
ERB: #DIM ARR, 10 = POWER(2,3), ABS(-5), SQRT(16)
  ↓ ErhLoader 解析初始化器
  ↓ 对每个表达式调用 expr.Restructure(null)
  ↓ POWER(2,3) → CanRestructure = true → 求值 → SingleLongTerm(8)
  ↓ ABS(-5)   → CanRestructure = true → 求值 → SingleLongTerm(5)
  ↓ SQRT(16)  → CanRestructure = true → 求值 → SingleLongTerm(4)
  ↓ 结果: #DIM ARR, 10 = 8, 5, 4  ← 全部是常量！
```

### CanRestructure 为 false 时

```
ERB: #DIM ARR, 10 = GETTIME()
  ↓ ErhLoader 解析初始化器
  ↓ GETTIME() → CanRestructure = false → Restructure 不可
  ↓ 结果不是 SingleTerm → !result.IsConst
  ↓ 错误: "配列の初期値には定数のみ指定できます"（数组初始值只能指定常量）
```

### CanRestructure 修正历史

以下数学函数原本 `CanRestructure = false`，为支持数组初始化中的使用而修正为 `true`：

| 函数 | 说明 | 修正时期 |
|------|------|---------|
| `POWER` | 幂运算 | LazyLoading 版修正，同步至 m-emuera（2026-05-13） |
| `ABS` | 绝对值 | 同上 |
| `SQRT` | 平方根 | 同上 |
| `SIN`/`COS`/`TAN` | 三角函数 | 同上 |
| `ASIN`/`ACOS`/`ATAN` | 反三角函数 | 同上 |
| `LOG`/`LOG10`/`EXP` | 对数·指数 | 同上 |
| `MAX`/`MIN` | 最大·最小 | 同上 |
| `SIGN` | 符号 | 同上 |
| `FLOOR`/`CEIL` | 向下取整·向上取整 | 同上 |

---

## SELECTCASE 跳转表优化

### 优化概述

SELECTCASE 通常从上到下线性扫描每个 CASE（O(n)）。但当所有 CASE 都是常量值时，编译期可以构建 `Dictionary` 跳转表，优化为 O(1) 哈希查找。

### 优化条件

| 条件 | 说明 |
|------|------|
| SELECTCASE 参数为 Integer/String/Float 类型 | 只有这些类型能存入 Dictionary |
| 所有 CASE 的 `CaseType == Normal` | 含 `TO` 或 `IS` 的 CASE 需要范围比较 |
| 所有 CASE 值为编译期常量 | `IsConst == true` 或可通过 `Restructure` 常量化 |
| CASE 值无重复 | 重复值会警告并跳过（跳转表本身保留） |

### 常量折叠对 CASE 值的解析

当 CASE 表达式 `!IsConst`（非常量）时，会尝试 `Restructure(null)`：

```csharp
if (!leftTerm.IsConst)
{
    try
    {
        AExpression restructured = leftTerm.Restructure(null);
        if (restructured is SingleTerm st)
            leftTerm = st;    // ← 常量折叠成功
        else
            return null;      // ← 折叠失败，无法构建跳转表
    }
    catch { return null; }
}
```

这使得 `CASE 1+2` 这样的常量表达式也能被优化。

### 不可优化的情况

| 情况 | 原因 |
|------|------|
| `CASE 1 TO 10` | 需要范围比较，无法哈希 |
| `CASE IS > 5` | 需要比较运算，无法哈希 |
| `CASE X`（X 为变量） | 运行时才能确定值，且 Restructure 不可 |
| SELECTCASE 参数为 Object 类型 | 无法存入 Dictionary |

### 重复 CASE 值的处理

**旧行为**：遇到重复值就放弃整个跳转表。

**新行为**（m-emuera 2026-05-13 移植）：重复值发出警告并跳过，跳转表本身保留：

```
SELECTCASE X
CASE 1
    ; 处理 A
CASE 1       ; ← 警告：重复值 1（前次出现: filename:lineno），跳过
    ; 处理 B  ← 此分支不包含在跳转表中
CASE 2
    ; 处理 C
ENDSELECT
```

---

## 对 ERB 脚本的透明性

常量折叠和跳转表优化**完全透明**——不需要修改任何 ERB 脚本。编译器自动判断是否可优化，不可优化时静默退回原有行为。

---

## 相关章节

- [变量声明系统](variable-declaration.zh.md) — #DIM/#DIMS/#DIMF 声明与数组初始化
- [条件分支](condition.zh.md) — SELECTCASE 语法基础
- [命令 vs 表达式](command-vs-expression.zh.md) — 表达式函数机制
