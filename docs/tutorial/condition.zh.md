# 条件分支

!!! info "本节对应手册"

    - [IF / SIF](../Reference/IF.zh.md) — IF/ELSEIF/ELSE/ENDIF 和 SIF 的 API 参考
    - [SELECTCASE](../Reference/SELECTCASE.zh.md) — SELECTCASE 的 API 参考

---

## 概述

ERABASIC 提供三种条件分支结构：

| 结构 | 适用场景 | 特点 |
|------|---------|------|
| `IF` ~ `ENDIF` | 多行条件块 | 经典的多分支结构 |
| `SIF` | 单行条件 | 只控制下一行是否执行 |
| `SELECTCASE` | 按值分支 | 类似 switch，按一个值匹配多种情况 |

!!! note "eramaker 兼容性"
    `IF`/`ELSEIF`/`ELSE`/`ENDIF` 和 `SIF` 是 eramaker 就存在的功能。`SELECTCASE` 是 Emuera 的扩展功能。

---

## IF ~ ENDIF

### 基本用法

```erb
IF A > 0
    PRINTL A 是正数
ENDIF
```

`IF` 的条件是**整数表达式**：`0` 视为假，非 `0` 视为真。

### IF ~ ELSE

```erb
IF A > 0
    PRINTL A 是正数
ELSE
    PRINTL A 不是正数
ENDIF
```

### IF ~ ELSEIF ~ ELSE

```erb
IF A > 0
    PRINTL 正数
ELSEIF A == 0
    PRINTL 零
ELSE
    PRINTL 负数
ENDIF
```

可以有多个 `ELSEIF`，但只能有一个 `ELSE`（且必须在最后）。`IF` 和 `ENDIF` 必须成对出现。

### 条件表达式

`IF` 的条件是整数表达式，不是布尔类型。以下写法都是合法的：

```erb
IF A                  ; A != 0 时为真
IF A > 0              ; 比较运算
IF A > 0 && B > 0     ; 逻辑与
IF A > 0 || B > 0     ; 逻辑或
IF !A                 ; 逻辑非（A == 0 时为真）
IF STR == "hello"     ; 字符串比较
IF STR != ""          ; 字符串非空检查
```

!!! warning "没有布尔类型"

    ERABASIC 没有布尔类型。比较运算符（`==`、`!=`、`>`、`<` 等）返回整数 `1`（真）或 `0`（假）。

---

## SIF — 单行条件

`SIF` 是 ERABASIC 特有的简写形式，只控制**紧接的下一行**是否执行：

```erb
SIF A > 0
    PRINTL A 是正数

; 等价于：
IF A > 0
    PRINTL A 是正数
ENDIF
```

### SIF 的规则

1. **只控制一行**：`SIF` 只影响紧接的下一行，再下面的行不受影响
2. **不能嵌套**：`SIF` 后面不能再跟 `SIF`
3. **不能跟块结构**：`SIF` 后面不能跟 `IF`、`REPEAT`、`FOR`、`WHILE` 等块结构的开始行

```erb
; ✅ 正确：SIF 控制单行
SIF MONEY >= 100
    PRINTL 可以购买

; ❌ 错误：SIF 不能控制块结构
SIF MONEY >= 100
    IF STOCK > 0          ; 编译错误！
        PRINTL 购买成功
    ENDIF

; ✅ 正确：用 IF 代替
IF MONEY >= 100 && STOCK > 0
    PRINTL 购买成功
ENDIF
```

### SIF 常见模式

```erb
; 跳过特定迭代
SIF COUNT == 2
    CONTINUE

; 条件输出
SIF HP <= 0
    PRINTL 已倒下

; 条件赋值
SIF FLAG == 0
    FLAG = 1
```

---

## SELECTCASE — 按值分支

`SELECTCASE` 类似于其他语言的 `switch`，根据一个值匹配多种情况：

### 基本用法

```erb
SELECTCASE DAY
    CASE 1
        PRINTL 星期一
    CASE 2
        PRINTL 星期二
    CASE 3
        PRINTL 星期三
    CASEELSE
        PRINTL 其他
ENDSELECT
```

### CASE 的三种条件格式

| 格式 | 含义 | 示例 |
|------|------|------|
| 直接值 | 精确匹配 | `CASE 1` |
| `IS 运算符 表达式` | 条件匹配 | `CASE IS <= 30` |
| `表达式 TO 表达式` | 范围匹配 | `CASE 10 TO 20` |

```erb
SELECTCASE SCORE
    CASE 90 TO 100
        PRINTL 优秀
    CASE IS >= 80
        PRINTL 良好
    CASE IS >= 60
        PRINTL 及格
    CASEELSE
        PRINTL 不及格
ENDSELECT
```

### 多条件组合

一个 `CASE` 可以用逗号分隔多个条件：

```erb
SELECTCASE MONTH
    CASE 3 TO 5
        PRINTL 春天
    CASE 6 TO 8
        PRINTL 夏天
    CASE 9 TO 11
        PRINTL 秋天
    CASE 12, 1, 2
        PRINTL 冬天
ENDSELECT
```

也可以混合使用不同格式：

```erb
CASE 1, 3, 5, 10 TO 20, IS >= 100
; 匹配：1、3、5、10~20、100及以上
```

### 字符串匹配

`SELECTCASE` 也支持字符串：

```erb
SELECTCASE WEATHER
    CASE "晴"
        PRINTL 天气晴朗
    CASE "雨"
        PRINTL 下雨了
    CASEELSE
        PRINTL 其他天气
ENDSELECT
```

### SELECTCASE 注意事项

1. **不穿透**：与 C 的 `switch` 不同，匹配到一个 `CASE` 后不会继续执行下一个 `CASE`
2. **不能用 BREAK 跳出**：`BREAK` 在 `SELECTCASE` 中无效，要跳出需用 `GOTO`
3. **短路求值**：`CASE` 中多个条件从左到右检查，匹配到即停止
4. **TO 范围**：`A TO B` 要求 `A <= B`，否则永远不会匹配
5. **IS 语法**：必须是 `IS 运算符 表达式`，不能写成 `30 < IS`

!!! tip "Skia 扩展：跳转表优化"

    当 `SELECTCASE` 的所有 `CASE` 条件均为**直接常量值**（不使用 `TO` / `IS`，且不是变量）时，Skia 会在编译期自动构建**跳转表**，将运行时查找从 **O(n) 线性扫描**优化为 **O(1) 哈希查找**。包含 `TO` / `IS` 表达式或非常量值时自动回退到线性扫描。

---

## 三种分支结构的选择

| 场景 | 推荐 | 原因 |
|------|------|------|
| 两种情况二选一 | `IF` ~ `ELSE` | 简洁直观 |
| 多个条件判断 | `IF` ~ `ELSEIF` | 每个分支条件独立 |
| 按一个值匹配多种情况 | `SELECTCASE` | 更清晰，避免重复写变量名 |
| 只控制一行 | `SIF` | 简洁，但注意限制 |

```erb
; 场景：按等级输出评价
; SELECTCASE 更适合——都是对 LEVEL 的值做匹配
SELECTCASE LEVEL
    CASE IS >= 90
        PRINTL S级
    CASE IS >= 70
        PRINTL A级
    CASE IS >= 50
        PRINTL B级
    CASEELSE
        PRINTL C级
ENDSELECT

; 场景：多个独立条件
; IF 更适合——条件之间没有共同变量
IF HP <= 0
    PRINTL 已倒下
ELSEIF MP < 10
    PRINTL 魔力不足
ELSEIF HUNGER > 80
    PRINTL 饥饿
ENDIF
```

---

## 常见陷阱

| 陷阱 | 错误写法 | 正确写法 | 原因 |
|------|---------|---------|------|
| 忘记 ENDIF | `IF A > 0` ... | `IF A > 0` ... `ENDIF` | IF 必须有配对的 ENDIF |
| SIF 控制多行 | `SIF A > 0` 后跟多行 | 用 `IF` 代替 | SIF 只控制下一行 |
| SIF 嵌套 | `SIF` 后跟 `SIF` | 用 `IF` 代替 | SIF 不能嵌套 |
| SELECTCASE 用 BREAK | `CASE 1: BREAK` | 不需要 | SELECTCASE 不穿透，无需 BREAK |
| IS 语法错误 | `CASE 30 < IS` | `CASE IS < 30` | IS 必须在运算符左侧 |
| TO 范围反了 | `CASE 20 TO 10` | `CASE 10 TO 20` | 左值必须 ≤ 右值 |

---

## 下一步

| 你想了解什么 | 前往 |
|:---|:---|
| 循环结构 | [循环](loop.zh.md) |
| 跳转与标签 | [跳转](jump.zh.md) |
| 赋值语句 | [赋值语句](assignment.zh.md) |
| IF 完整 API | [IF / SIF](../Reference/IF.zh.md) |
| SELECTCASE 完整 API | [SELECTCASE](../Reference/SELECTCASE.zh.md) |
