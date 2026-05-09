# 变量声明系统

!!! info "本节对应手册"

    - [用户定义变量](../Emuera/user_defined_variables.zh.md) — #DIM 声明规格
    - [头文件 ERH](../Emuera/ERH.zh.md) — 全局变量声明
    - [函数定义](../Emuera/function.zh.md) — 函数参数与引用传递

!!! tip "前置知识"

    本节是 [值、类型与变量](values-types.zh.md) 的进阶。请先了解三类型体系（Int/Str/Float）和基本 `#DIM` 声明。

---

## 概述

ERABASIC 的变量声明系统远比初看复杂。`#DIM`/`#DIMS`/`#DIMF` 不仅是"声明一个变量"，它们支持多种修饰关键字（CONST/DYNAMIC/STATIC/GLOBAL/SAVEDATA/CHARADATA/REF/OUT），决定了变量的**生命周期**、**可见性**、**持久化**和**引用语义**。

| 修饰关键字 | 作用 | 适用范围 |
|-----------|------|---------|
| `CONST` | 常量，不可修改 | 全局/私有 |
| `DYNAMIC` | 动态分配，函数返回时释放 | 仅私有 |
| `STATIC` | 静态，跨调用保留 | 仅私有 |
| `GLOBAL` | 跨存档全局 | 仅全局（ERH） |
| `SAVEDATA` | 存档保存 | 仅全局（ERH） |
| `CHARADATA` | 角色数据 | 仅全局（ERH） |
| `REF` | 引用型变量 | 全局/私有 |
| `OUT` | 可省略引用参数（隐含 REF） | 仅私有 |

---

## 声明位置与作用域

ERABASIC 的变量声明分布在三个位置，处理顺序从早到晚：

```
CSV 预处理（最先处理）
├── variable_size.csv    → 内置变量数组大小
├── _replace.csv         → 变量名替换映射
└── chara/*.csv          → 角色数据定义

ERH 头文件声明（ERB 之前处理）
├── #DIM X, 100          → 全局整数变量
├── #DIM CONST MAX = 100 → 全局常量
├── #DIM GLOBAL G_VAR    → 跨存档全局变量
├── #DIM SAVEDATA S_VAR  → 存档保存变量
└── #DIM CHARADATA C_VAR → 角色数据变量

ERB 函数内声明（函数级私有）
├── #DIM L_TEMP, 10      → 私有整数变量
├── #DIM DYNAMIC L_TMP   → 动态私有变量
├── #DIM STATIC L_CACHE  → 静态私有变量
├── #DIM REF L_ARR, 0    → 数组引用
├── #REF L_ELEM          → 标量引用
└── #DIM OUT L_OUT       → 可省略 OUT 参数
```

!!! warning "#行位置规则"

    所有 `#` 开头的预处理行必须紧跟 `@函数名(...)` 标签行之后、第一条执行语句之前：

    ```erb
    @MY_FUNC(ARG:0)
    #DIM L_COUNT, 10          ; ✅ 紧跟 @ 行
    #DIMS L_NAME              ; ✅ 紧跟上一条 # 行
        L_COUNT:0 = ARG:0     ; ✅ 第一条执行语句
        ; #DIM L_X, 5         ; ❌ 不能出现在函数体中间
    RETURN
    ```

---

## 数组与维度

### 维度声明

`#DIM` 后的数字决定数组的维度和大小：

| 声明 | 维度 | 大小 | 说明 |
|------|------|------|------|
| `#DIM X` | 0 | 1 | 标量（省略大小时自动=1） |
| `#DIM X, 100` | 1 | 100 | 一维数组 |
| `#DIM X, 10, 20` | 2 | 10×20 | 二维数组 |
| `#DIM X, 10, 20, 5` | 3 | 10×20×5 | 三维数组（最大） |

### 内联初始化

一维数组支持内联初始化，多维数组不支持：

```erb
; ✅ 一维数组：大小自动推断
#DIM DATA = 1, 2, 3
; DATA:0=1, DATA:1=2, DATA:2=3, 元素数为3

; ✅ 一维数组：指定大小 + 部分初始化
#DIM DATA2, 100 = 4, 5, 6
; DATA2:0=4, DATA2:1=5, DATA2:2=6, DATA2:3~99=0

; ✅ 字符串数组初始化
#DIMS NAMES = "Alice", "Bob", "Charlie"

; ❌ 多维数组不支持内联初始化
; #DIM MAT, 5, 5 = 1, 2, 3, ...  ← 错误！
```

多维数组需要逐行赋值：

```erb
#DIM MAT, 5, 5
MAT:0:0 = 256, 0, 0, 0, 0
MAT:1:0 = 0, 256, 0, 0, 0
```

!!! danger "初始化值数量不能超过指定大小"

    ```erb
    #DIM HIGE, 1 = 7, 8, 9    ; ❌ 错误：3个初始值超过1个元素
    ```

---

## CONST — 常量

`CONST` 声明不可修改的常量。必须初始化，且中途不能赋值：

```erb
#DIM CONST MAX_LEVEL = 99
#DIM CONST ELEMENTS = 4
#DIMS CONST GAME_TITLE = "My Game"
```

### CONST 的约束

- **必须初始化** — 不能只声明不赋值
- **不可修改** — 后续赋值会报错
- **仅一维** — 多维常量数组不支持
- **互斥** — 不能与 GLOBAL/SAVEDATA/REF/DYNAMIC 同时使用

```erb
; ✅ 正确
#DIM CONST MAX = 100
#DIMS CONST TITLE = "Era Game"

; ❌ 错误：缺少初始值
; #DIM CONST X

; ❌ 错误：不能与 DYNAMIC 同时使用
; #DIM CONST DYNAMIC X = 1
```

---

## DYNAMIC — 动态变量

`DYNAMIC` 变量在函数**调用时分配**，函数**返回时释放**：

```erb
@RECURSIVE_FUNC(ARG:0)
#DIM DYNAMIC L_SUM
    L_SUM += ARG:0
    IF ARG:0 > 0
        CALL RECURSIVE_FUNC(ARG:0 - 1)
    ENDIF
    PRINTFORML ARG:0 = {ARG:0}, L_SUM = {L_SUM}
RETURN
```

### DYNAMIC vs 非 DYNAMIC

| 特性 | DYNAMIC | 非 DYNAMIC（默认） |
|------|---------|-------------------|
| 分配时机 | 函数调用时 | 程序启动时 |
| 释放时机 | 函数返回时 | 程序结束前不释放 |
| 递归时 | 每层调用独立副本 | 所有调用共享同一变量 |
| 初始值 | 每次调用重置为默认值 | 保留上次调用的值 |
| 性能 | 较慢（需要分配/释放） | 较快 |

### 递归场景

DYNAMIC 变量的核心用途是**递归函数**。没有 DYNAMIC，递归调用会覆盖上一层的变量值：

```erb
; ❌ 不用 DYNAMIC：递归时变量被覆盖
@BAD_RECURSE(ARG:0)
#DIM L_SUM
    L_SUM += ARG:0
    ; 第二次递归调用会修改同一个 L_SUM
    IF ARG:0 > 0
        CALL BAD_RECURSE(ARG:0 - 1)
    ENDIF
    ; 此时 L_SUM 的值已经被递归修改
RETURN

; ✅ 用 DYNAMIC：每层递归有独立副本
@GOOD_RECURSE(ARG:0)
#DIM DYNAMIC L_SUM
    L_SUM += ARG:0
    IF ARG:0 > 0
        CALL GOOD_RECURSE(ARG:0 - 1)
    ENDIF
    ; 每层递归的 L_SUM 独立
RETURN
```

!!! warning "DYNAMIC 与 RESTART"

    `RESTART` 指令是"回到函数开头"，**不会**重置 DYNAMIC 变量。只有函数返回+重新调用才会重置。

### DYNAMIC 的互斥约束

不能与 CONST、STATIC、GLOBAL、SAVEDATA、CHARADATA、REF、OUT 同时使用。

---

## STATIC — 静态私有变量

`STATIC` 变量在函数调用之间**保留值**，但只在声明它的函数内可见：

```erb
@COUNTER
#DIM STATIC L_COUNT
    L_COUNT += 1
    PRINTFORML 第{L_COUNT}次调用
RETURN
```

```
第1次调用
第2次调用
第3次调用
```

### STATIC vs 非 DYNAMIC vs DYNAMIC

| 特性 | STATIC | 非 DYNAMIC（默认） | DYNAMIC |
|------|--------|-------------------|---------|
| 跨调用保留值 | ✅ | ✅ | ❌（每次重置） |
| 递归独立 | ❌（共享） | ❌（共享） | ✅（独立） |
| 可见性 | 仅声明函数 | 仅声明函数 | 仅声明函数 |

STATIC 和默认（非 DYNAMIC）的区别在于**语义清晰性**：STATIC 明确表示"我需要跨调用保留值"，而默认行为虽然也保留值，但可能是不经意的。

### STATIC 的互斥约束

不能与 DYNAMIC、REF、OUT 同时使用。

---

## 全局变量声明（ERH）

在 ERH 头文件中声明的变量是**全局变量**，所有 ERB 文件都可以访问：

```erb
; VARIABLE.ERH
#DIM GAME_STATE, 10            ; 全局整数数组
#DIMS GAME_NAME                ; 全局字符串变量
#DIMF GAME_SCORE               ; 全局浮点变量（Skia 新增）
#DIM CONST MAX_PARTY = 6       ; 全局常量
```

### 全局变量专有修饰

以下修饰关键字只能在 ERH 中使用：

#### GLOBAL — 跨存档全局

`GLOBAL` 变量的值在**所有存档之间共享**，保存到 `global.sav` 文件：

```erb
; VARIABLE.ERH
#DIM GLOBAL TOTAL_PLAY_COUNT     ; 跨存档累计游玩次数
#DIMS GLOBAL LAST_SAVE_NAME      ; 跨存档最后存档名
```

- 使用 `SAVEGLOBAL` 保存，`LOADGLOBAL` 读取
- 不随存档加载而改变

#### SAVEDATA — 存档保存

`SAVEDATA` 变量的值**随存档保存和加载**：

```erb
; VARIABLE.ERH
#DIM SAVEDATA QUEST_FLAGS, 100   ; 任务标记，随存档保存
#DIMS SAVEDATA SCENE_MEMO        ; 场景备忘，随存档保存
```

- 写入存档时自动保存
- 读取存档时自动恢复

#### CHARADATA — 角色数据

`CHARADATA` 变量为**每个角色独立存储**，类似 `TALENT`、`ABL` 等内置角色变量：

```erb
; VARIABLE.ERH
#DIM CHARADATA SKILL_LEVEL, 10   ; 每个角色的技能等级
#DIMS CHARADATA NICKNAME         ; 每个角色的昵称
```

- 访问方式：`SKILL_LEVEL:角色编号:技能编号`
- 随角色添加/删除而分配/释放

### 全局修饰互斥表

| | CONST | GLOBAL | SAVEDATA | CHARADATA | REF |
|---|---|---|---|---|---|
| CONST | — | ❌ | ❌ | ❌ | ❌ |
| GLOBAL | ❌ | — | ❌ | ❌ | ❌ |
| SAVEDATA | ❌ | ❌ | — | ✅ | ❌ |
| CHARADATA | ❌ | ❌ | ✅ | — | ❌ |
| REF | ❌ | ❌ | ❌ | ❌ | — |

`SAVEDATA` 和 `CHARADATA` 可以同时使用，表示"随存档保存的角色数据"。

---

## REF — 引用型变量

`REF` 声明引用型变量，操作引用变量时**实际操作的是它引用的目标变量**。

### 数组引用

```erb
@PROCESS_ARRAY
#DIM REF L_ARR, 0            ; 一维数组引用
    REPEAT VARSIZE("L_ARR")
        L_ARR:COUNT *= 2     ; 修改的是传入的原始数组
    REND
RETURN

; 调用
#DIM DATA, 5 = 1, 2, 3, 4, 5
CALL PROCESS_ARRAY(DATA)
; 调用后 DATA 变为 2, 4, 6, 8, 10
```

### REF 的维度语义

`#DIM REF` 后的数字是**维度占位符**，不是数组大小。数字必须为 0：

| 声明 | 逗号数 | Dimension | 实际大小 |
|------|--------|-----------|---------|
| `#DIM REF X` | 0 | 1 | 由传入参数决定 |
| `#DIM REF X, 0` | 1 | 1 | 由传入参数决定 |
| `#DIM REF X, 0, 0` | 2 | 2 | 由传入参数决定 |

```erb
; ✅ 正确：0 是维度占位符
#DIM REF L_1D, 0
#DIM REF L_2D, 0, 0

; ❌ 错误：非零值报错"引用型变量不能指定数组大小"
; #DIM REF L_ARR, 10
```

### 标量引用

`#REF`/`#REFS`/`#REFF` 声明标量引用（Dimension=0），引用单个变量元素：

```erb
@MODIFY_ELEM
#REF L_REF                   ; 整数标量引用
    L_REF += 100             ; 修改的是传入的原始元素
RETURN

; 调用
CALL MODIFY_ELEM(TALENT:0:23)
; TALENT:0:23 被修改
```

| 声明 | 类型 | Dimension | 引用粒度 |
|------|------|-----------|---------|
| `#REF X` | Int | 0 | 标量元素 |
| `#REFS X` | Str | 0 | 标量元素 |
| `#REFF X` | Float | 0 | 标量元素 |
| `#DIM REF X, 0` | Int | 1 | 整个数组 |
| `#DIMS REF X, 0` | Str | 1 | 整个数组 |
| `#DIMF REF X, 0` | Float | 1 | 整个数组 |

---

## OUT — 可省略引用参数

`OUT` 是 REF 的特殊形式：调用时可以省略，省略后函数内的读写被静默忽略。

```erb
@DIVIDE(ARG:0, ARG:1)
#DIM OUT L_QUOTIENT           ; 可省略整数 OUT 参数
#DIM OUT L_REMAINDER          ; 可省略整数 OUT 参数
    L_QUOTIENT = ARG:0 / ARG:1
    L_REMAINDER = ARG:0 % ARG:1
RETURN

; 调用1：只需要商
CALL DIVIDE(17, 5)
PRINTVL RESULT                 ; 3（RETURN 返回的 RESULT）

; 调用2：需要商和余数
#DIM L_Q
#DIM L_R
CALL DIVIDE(17, 5, L_Q, L_R)
PRINTFORML 商={L_Q}，余数={L_R}   ; 商=3，余数=2
```

### OUT 的行为

| 调用方式 | OUT 参数绑定 | 函数内写入 | 函数内读取 |
|---------|-------------|-----------|-----------|
| 传入变量 | `ElementRefInfo` → 引用目标变量 | 写入目标变量 | 读取目标变量 |
| 省略 | `NullRefTerm`（黑洞） | 写入被丢弃 | 读取返回默认值 |

### OUT 的约束

- 强制 `Dimension=0`（标量引用）
- 声明中的维度数字被直接丢弃
- 隐含 REF 语义，不能与 REF 同时使用
- 不能与 CONST、GLOBAL、SAVEDATA、CHARADATA、STATIC 同时使用

```erb
; ✅ 正确
#DIM OUT L_OUT
#DIM OUT L_OUT2, 0           ; 等价（,0 被忽略）

; ⚠️ 数字被忽略
#DIM OUT L_OUT3, 1           ; 1 被忽略，仍为 Dimension=0
```

---

## 函数签名与变量声明的关系

ERABASIC 的函数签名与变量声明有独特的关系，这是与主流语言最根本的区别。

### 签名引用，体内声明

在主流语言中，函数签名同时声明参数（`void f(int x)`）。在 ERABASIC 中，签名中的名字只是**引用**，变量必须通过 `#DIM` 声明：

```erb
@CALC(X, Y)
#DIM X                        ; ← 声明变量 X
#DIM Y                        ; ← 声明变量 Y
#FUNCTION
    RETURNF X * Y
```

如果签名引用的变量没有 `#DIM` 声明，解析时会报错。

### 命名参数 vs ARG 数组

函数参数有两种传递方式：

```erb
; 方式1：使用内置 ARG 数组
@FUNC(ARG:0, ARG:1)
    PRINTFORML {ARG:0} + {ARG:1} = {ARG:0 + ARG:1}
RETURN

; 方式2：使用命名参数（推荐）
@FUNC(L_A, L_B)
#DIM L_A
#DIM L_B
    PRINTFORML {L_A} + {L_B} = {L_A + L_B}
RETURN
```

**命名参数和 ARG 数组是完全独立的实体**：

```erb
@FUNC(L_VAL, ARG:2 = 0)
#DIM L_VAL
    ; L_VAL 接收第一个参数值
    ; ARG:2 接收第三个参数值
    ; ARG:0 和 ARG:1 不受影响（独立实体）

    PRINTFORML L_VAL={L_VAL}, ARG:2={ARG:2}
    PRINTFORML ARG:0={ARG:0}, ARG:1={ARG:1}
RETURN

; 调用：CALL FUNC(100, 200, 300)
; 输出：L_VAL=100, ARG:2=300
; 输出：ARG:0=0, ARG:1=0（未被赋值）
```

!!! danger "命名参数不是 ARG 元素的别名"

    ```erab
    ; ❌ 错误理解：@FUNC(AMOUNT) 意味着 "AMOUNT 就是 ARG:0 的别名"
    ; ✅ 正确理解：@FUNC(AMOUNT) 意味着 "第一个参数的值写入名为 AMOUNT 的 #DIM 变量"
    ```

    命名参数和 ARG[n] 是完全独立的。函数签名中的参数位置决定了值写入哪个变量，但不会自动填充 ARG 数组。

### 不存在"参数遮蔽"

来自 C/Java/Python 背景的开发者常犯一个认知错误：认为 `#DIM` 声明同名变量会"遮蔽"函数参数。**这在 ERABASIC 中不可能发生**。

```erb
@FUNC(AMOUNT)
#DIM DYNAMIC AMOUNT           ; ← 不是"遮蔽"，而是"创建 AMOUNT 变量"
    IF AMOUNT == 0             ; ← 读取的就是 #DIM 创建的变量
        ; ...
    ENDIF
RETURN
```

**原因**：ERABASIC 的标识符字典只有一个查询入口。无论从签名还是函数体访问 `AMOUNT`，都解析到同一个 `UserDefinedVariableToken`。不存在"参数变量"和"私有变量"两个不同实体。

| 主流语言（错误迁移） | ERABASIC 实际行为 |
|---|---|
| `void f(int x) { int x = 0; }` → 编译错误或遮蔽 | `@F(X)` 不创建变量，`#DIM X` 创建唯一变量 |
| 参数 = 函数签名分配存储空间 | 参数名 = 标识符引用，无存储 |
| 局部声明创建新变量 | `#DIM` 创建**供参数名使用的**变量 |

---

## VARIADIC — 可变参数

`VARIADIC` 关键字声明可变数量的参数，只能修饰最后一个参数：

```erb
@SUM_ALL(VARIADIC ARG:0)
#DIM DYNAMIC L_TOTAL
    L_TOTAL = 0
    REPEAT ARGLEN()
        L_TOTAL += ARG:COUNT
    REND
    RESULT = L_TOTAL
RETURN

; 调用
CALL SUM_ALL(1, 2, 3, 4, 5)
PRINTVL RESULT                 ; 15
```

### VARIADIC 语法

| 声明 | 类型 | 说明 |
|------|------|------|
| `VARIADIC ARG:0` | Int | 可变整数参数 |
| `VARIADIC ARGS:0` | Str | 可变字符串参数 |
| `VARIADIC ARGF:0` | Float | 可变浮点参数（Skia 新增） |

### 固定参数 + 可变参数

推荐使用私有变量作为固定参数，ARG 数组作为可变参数：

```erb
@PROCESS(L_MODE, VARIADIC ARG:0)
#DIM L_MODE
    ; L_MODE 接收第一个固定参数
    ; ARG:0...ARG:(ARGLEN()-1) 接收可变参数
    PRINTFORML 模式={L_MODE}，参数数={ARGLEN()}
RETURN

; 调用
CALL PROCESS(1, 10, 20, 30)
; L_MODE=1, ARG:0=10, ARG:1=20, ARG:2=30, ARGLEN()=3
```

!!! warning "VARIADIC 约束"

    - 只能修饰最后一个参数
    - 类型必须是 ARG/ARGS/ARGF 之一
    - 同类型 ARG 不能在固定参数和可变参数中同时出现
    - `#DIM VARIADIC` 不存在 — VARIADIC 是函数参数声明关键字，不是 #DIM 修饰符
    - `ARGLEN()` 是函数，必须带括号调用

---

## #LOCALSIZE — 局部变量尺寸

`#LOCALSIZE`/`#LOCALSSIZE`/`#LOCALFSIZE` 指定 LOCAL/LOCALS/LOCALF 数组的大小：

!!! warning "LOCAL/LOCALS 已过时"

    `LOCAL` 和 `LOCALS` 是过时的设计，不推荐使用。请使用 `#DIM`/`#DIMS` 声明私有变量替代。
    对于新游戏开发，建议在 `VariableSize.csv` 中将 `LOCAL` 和 `LOCALS` 的元素数均设为 `-1` 以禁用，强制迁移到 `#DIM`/`#DIMS`。

```erb
@MY_FUNC
#LOCALSIZE 100              ; LOCAL 数组大小为 100
#LOCALSSIZE 50              ; LOCALS 数组大小为 50
#LOCALFSIZE 10              ; LOCALF 数组大小为 10（Skia 新增）
```

!!! info "事件函数中无效"

    在事件函数中指定 `#LOCALSIZE` 等会被忽略，因为事件函数可能有多个定义，LOCAL 变量的大小由所有定义中的最大值决定。

---

## 变量命名禁区

| 禁区 | 原因 | 正确替代 |
|------|------|---------|
| `A` ~ `Z`（26个） | 引擎内置泛用变量 | `L_A`, `L_COUNT` |
| `DAY`, `MONEY`, `TIME` | 系统状态变量 | `L_DAY`, `L_MONEY` |
| `TARGET`, `ASSI`, `MASTER` | 角色编号变量 | `L_TARGET` |
| `LOCAL`, `ARG`, `GLOBAL` | 引擎扩展变量（LOCAL/LOCALS 已过时） | `L_LOCAL`, `L_ARG`，或使用 `#DIM`/`#DIMS` |
| `REF`, `OUT` | #DIM 修饰关键字 | `_ref`, `_out`, `L_OUT` |
| 指令同名 | 如 `PRINTFORM`, `CALL`, `RETURN` | 加前缀 |

---

## 修饰关键字互斥总表

| | CONST | DYNAMIC | STATIC | GLOBAL | SAVEDATA | CHARADATA | REF | OUT |
|---|---|---|---|---|---|---|---|---|
| CONST | — | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| DYNAMIC | ❌ | — | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| STATIC | ❌ | ❌ | — | — | — | — | ❌ | ❌ |
| GLOBAL | ❌ | ❌ | — | — | ❌ | ❌ | ❌ | — |
| SAVEDATA | ❌ | ❌ | — | ❌ | — | ✅ | ❌ | — |
| CHARADATA | ❌ | ❌ | — | ❌ | ✅ | — | ❌ | — |
| REF | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | ❌ |
| OUT | ❌ | ❌ | ❌ | — | — | — | ❌ | — |

- `SAVEDATA` + `CHARADATA` 可以同时使用
- `STATIC` + `GLOBAL`/`SAVEDATA`/`CHARADATA` 的组合在 ERH 中理论上可行，但实际意义不大
- `OUT` 隐含 REF，不能与 REF 同时使用

---

## 反模式汇总

### 声明反模式

| 错误写法 | 原因 | 正确写法 |
|---------|------|---------|
| `DIM X, 10` | `#DIM` 是预处理指令，`#` 不可省略 | `#DIM X, 10` |
| `#DIM A` | A~Z 是引擎内置变量 | `#DIM L_A` |
| `#DIM OUT B, 1` | OUT 强制 Dimension=0，数字被忽略 | `#DIM OUT B` |
| `#DIM REF X, 10` | REF 数字必须为 0 | `#DIM REF X, 0` |
| `#DIM DYNAMIC out` | `out` 是保留关键字 | `#DIM DYNAMIC _out` |
| `#DIM MAT, 5, 5 = 1, 2` | 多维数组不支持内联初始化 | 逐元素赋值 |
| `#DIM VARIADIC X` | `#DIM VARIADIC` 不存在 | `@FUNC(VARIADIC ARG:0)` |

### 作用域反模式

| 错误理解 | 正确理解 |
|---------|---------|
| "LOCAL 是真正的局部变量" | LOCAL 在所有函数间共享同一数组，跨函数调用不重置 |
| "私有变量 = 局部变量" | 私有变量是函数级注册，LOCAL 是内置共享 |
| "私有变量在函数返回后消失" | 非 DYNAMIC 的私有变量数据保留 |
| "DYNAMIC 变量和 LOCAL 一样" | DYNAMIC 是调用时分配返回时释放，LOCAL 不释放 |
| "签名中写 L_val 就声明了它" | 签名只是引用，必须用 `#DIM` 声明 |
| "命名参数是 ARG[n] 的别名" | 命名参数和 ARG 数组是完全独立的实体 |

---

## 下一步

| 你想了解什么 | 前往 |
|:---|:---|
| 三类型体系与类型转换 | [值、类型与变量](values-types.zh.md) |
| 赋值语句详解 | [赋值语句](assignment.zh.md) |
| 函数定义与调用 | [函数与 CALL](call.zh.md) |
| ERH 全局变量声明 | [头文件 ERH](../Emuera/ERH.zh.md) |
| 用户定义变量规格 | [用户定义变量](../Emuera/user_defined_variables.zh.md) |
