# 第7章：反模式与常见错误

!!! info "前置知识"

    - **Reference 分类**: [函数系列（CALL 等）](../Reference/README.zh.md#function-call) / [变量操作](../Reference/README.zh.md#variable-operations)
    - [函数与 CALL](call.zh.md) — 函数调用机制、RETURN/RETURNF
    - [FORM 语法](form-syntax.zh.md) — `%变量%`、`{表达式}` 展开规则
    - [命令 vs 表达式](command-vs-expression.zh.md) — 两条求值路径
    - [运行时机制](runtime-mechanics.zh.md) — 三阶段流水线、REF 变量生命周期
    - [变量声明系统](variable-declaration.zh.md) — REF/OUT、#DIM、作用域

!!! tip "本章要点"

    - ERABASIC 中最常见的错误源于变量作用域误解、FORM 语法误用、REF/OUT 混淆
    - "能运行但不符合预期"的代码比"报错停止"的代码更危险
    - 每种反模式都有明确的原因，正确理解后即可避免

---

## 7.1 变量作用域的误解

### ❌ 反模式：以为 LOCAL 是真正的局部变量

```erb
@FUNC_A
#DIM LOCAL, 10
LOCAL:0 = 42
CALL FUNC_B
PRINTVL LOCAL:0      ; ← 以为是 42……
```

`LOCAL` 并非每个函数独立的数组，而是**函数栈上的变量**。`CALL FUNC_B` 之后 `LOCAL:0` 仍然是 42，但这仅限于 `FUNC_B` 没有使用同名 `LOCAL` 的情况。

!!! warning "LOCAL 的真正含义"

    `LOCAL`/`LOCALS` 是保留变量名，每个函数拥有自己的实例。但 `#DIM` 声明的变量和 `LOCAL` 是不同的东西：

    ```erb
    @FUNC_A
    #DIM LOCAL, 10       ; ← 这是声明 LOCAL:0〜9
    LOCAL:0 = 42         ; ← 给 LOCAL:0 赋值 42
    ; 跳转到 FUNC_B 后，FUNC_A 的 LOCAL:0 仍然保持

    @FUNC_B
    #DIM LOCAL, 10       ; ← 这是 FUNC_B 自己的 LOCAL
    LOCAL:0 = 99         ; ← FUNC_B 的 LOCAL:0，不影响 FUNC_A
    ```

### ❌ 反模式：不理解 DYNAMIC 和 STATIC 的区别

```erb
@COUNTER
#DIM DYNAMIC COUNT     ; ← 每次调用时重置为 0
#DIM STATIC TOTAL      ; ← 调用间保持值

COUNT += 1
TOTAL += 1

PRINTVL COUNT          ; 始终为 1
PRINTVL TOTAL          ; 每次调用递增
```

| 修饰符 | 重置时机 | 用途 |
|--------|---------|------|
| 无（默认） | 每次函数调用 | 普通局部变量 |
| `DYNAMIC` | 每次函数调用 | 显式局部（影响 REF 的 ScopeIn） |
| `STATIC` | 不重置 | 跨函数调用的计数器/缓存 |
| `GLOBAL` | 跨存档保持 | 跨存档的设置值 |

---

## 7.2 参数遮蔽的错觉

### ❌ 反模式：形参名与全局变量名冲突

```erb
@FUNC
#DIM MONEY             ; ← 形参 MONEY（局部）
; 函数内这个 MONEY 是局部变量
; 与全局的 MONEY（所持金）是不同的东西

MONEY = 100            ; ← 修改的是局部 MONEY
; 调用方的所持金 MONEY 不会被修改！
```

ERABASIC 中，`#DIM` 声明的变量在函数内具有局部作用域。声明与全局变量同名的 `#DIM` 变量时，函数内局部变量优先（遮蔽）。

!!! danger "最危险的模式"

    ```erb
    @PROCESS_MONEY
    #DIM MONEY         ; ← 与所持金同名的局部变量！
    MONEY = 0          ; ← 以为把所持金清零了，实际只清了局部变量
    ```

    **对策**：形参名使用前缀或明确的命名：

    ```erb
    @PROCESS_MONEY
    #DIM L_MONEY       ; ← 用前缀区分
    ; 或
    #DIM AMOUNT        ; ← 使用不同含义的名称
    ```

---

## 7.3 FORM 语法的误用

### ❌ 反模式：使用 `{字符串变量}`

```erb
#DIMS NAME = "测试"
PRINTFORML 名称：{NAME}       ; ← ❌ 错误！{表达式} 只能求值整数表达式
```

FORM 语法的 `{表达式}` 求值**整数表达式**并转换为字符串。用 `{}` 包裹字符串变量会报错。

!!! tip "正确用法"

    ```erb
    ; 字符串变量用 %变量% 展开
    PRINTFORML 名称：%NAME%

    ; 整数变量用 {表达式} 展开
    #DIM COUNT = 5
    PRINTFORML 计数：{COUNT}
    PRINTFORML 计算：{COUNT * 2 + 1}
    ```

### ❌ 反模式：在 FORM 内期待副作用

```erb
PRINTFORML 结果：%CALL_FUNC()%    ; ← ❌ CALL 是命令，不能在表达式中使用
```

`%变量%` 求值的是**字符串表达式**。`CALL` 是命令，不能在表达式中使用。

!!! tip "正确用法"

    ```erb
    ; 有副作用的处理先执行
    CALL FUNC
    PRINTFORML 结果：%RESULTS%

    ; 或使用表达式函数
    PRINTFORML 结果：%FUNC_EXPR()%    ; ← 用 #FUNCTIONS 定义的函数则 OK
    ```

### ❌ 反模式：三连标识符的意外展开

```erb
PRINTFORML ===完成===    ; ← ❌ === 会被展开为 CALLNAME:PLAYER！
```

FORM 语法中，`***`、`+++`、`===`、`///`、`$$$` 作为三连标识符进行特殊展开：

| 三连符号 | 展开目标 |
|---------|---------|
| `***` | `NAME:TARGET` |
| `+++` | `CALLNAME:MASTER` |
| `===` | `CALLNAME:PLAYER` |
| `///` | `NAME:ASSI` |
| `$$$` | `CALLNAME:TARGET` |

!!! tip "回避方法"

    ```erb
    ; 想直接输出字符串时，不使用 FORM 语法
    PRINTL ===完成===       ; ← PRINTL 不进行 FORM 展开，安全

    ; 或者选择不包含三连符号的写法
    ```

---

## 7.4 REF/OUT 的混淆

### ❌ 反模式：以为 REF 和 OUT 是同一种东西

```erb
@FUNC
#DIM REF X, 0         ; ← REF：接收引用（不可省略）
#DIM OUT Y, 0         ; ← OUT：接收输出目标（可省略）
```

| 属性 | REF | OUT |
|------|-----|-----|
| 省略 | ❌ 不可 | ✅ 可以（绑定到 NullRefTerm） |
| 调用前设置值 | 无意义（被引用源覆盖） | 无意义（函数内设置） |
| 用途 | 作为输入引用已有数据 | 作为输出写入结果 |
| Dimension | 按声明（0=标量，0,0=2D） | 始终为 0（仅标量） |

### ❌ 反模式：OUT 参数省略顺序错误

```erb
@FUNC
#DIM OUT A, 0
#DIM OUT B, 0
#DIM OUT C, 0

; ❌ 想省略 B，但语法上变成 (A, C)
;    C 被绑定到 B 的位置
CALL FUNC(RESULT_A, RESULT_C)
```

OUT 参数按**声明顺序**绑定。省略中间参数会导致后续参数错位。

!!! tip "正确设计"

    ```erb
    ; 可能被省略的参数放在最后声明
    @FUNC
    #DIM OUT A, 0         ; 必需
    #DIM OUT B, 0         ; 必需
    #DIM OUT C, 0         ; 可选（放在最后）

    CALL FUNC(RESULT_A, RESULT_B)    ; C 可省略
    ```

### ❌ 反模式：REF 变量的维度声明错误

```erb
@FUNC
#DIM REF X, 10        ; ← ❌ 错误！REF 变量不能指定大小
#DIM REF Y, 0         ; ← ✅ 0 是维度占位符（一维引用）
#DIM REF Z, 0, 0      ; ← ✅ 二维引用
```

`#DIM REF` 的数字是**维度占位符**，不是数组大小。指定非零值会报错。

---

## 7.5 命令与表达式边界的误解

### ❌ 反模式：在表达式中使用命令

```erb
X = CALL FUNC()       ; ← ❌ CALL 是命令，不能在表达式中使用
X = PRINTL "hello"    ; ← ❌ PRINTL 是命令
```

ERABASIC 有**命令路径**和**表达式路径**两条求值路径。命令不能在表达式中使用，表达式函数也不能作为命令使用。

!!! tip "正确区分"

    ```erb
    ; 命令路径：有副作用，通过 RESULT 接收结果
    CALL FUNC()
    X = RESULT

    ; 表达式路径：无副作用，直接接收返回值
    X = FUNC_EXPR()    ; ← 用 #FUNCTION 定义的函数
    ```

### ❌ 反模式：忘记 RESULT 的污染

```erb
X = STRLENS(NAME)     ; ← STRLENS 会设置 RESULT
Y = RESULT             ; ← Y 不是 STRLENS 的结果，而是之前的 RESULT
```

许多字符串函数会设置 `RESULT`。在表达式中调用函数后，`RESULT` 的值可能已经改变。

---

## 7.6 HTML 输出的错误

### ❌ 反模式：用 PRINT 输出 HTML 标签

```erb
PRINTL <font color="red">警告</font>    ; ← ❌ 标签作为纯文本显示
```

要让 HTML 标签被解析，必须使用 `HTML_PRINT`：

```erb
HTML_PRINT "<font color='red'>警告</font>"    ; ← ✅ 显示红色"警告"
```

!!! warning "引号的使用"

    ```erb
    ; ❌ ERB 字符串内不能嵌套双引号
    HTML_PRINT "<font color="red">警告</font>"

    ; ✅ 使用单引号
    HTML_PRINT "<font color='red'>警告</font>"
    ```

### ❌ 反模式：在 HTML_PRINT 内期待 FORM 展开

```erb
HTML_PRINT "<b>%NAME%</b>"    ; ← ❌ HTML_PRINT 不进行 FORM 展开
```

`HTML_PRINT` 不展开 FORM 语法。要嵌入动态值，需要先构建 FORM 字符串：

```erb
LOCALS '= @"<b>%NAME%</b>"    ; ← @"..." 进行 FORM 展开
HTML_PRINT LOCALS              ; ← 传递已展开的字符串
```

---

## 7.7 事件函数的误用

### ❌ 反模式：在事件函数中吞掉异常

```erb
@EVENTBEFORE_ERROR
; ❌ 试图忽略错误继续执行
RETURN 1    ; ← 跳过错误处理可能导致状态损坏
```

`BEFORE_ERROR`/`BEFORE_THROW` 事件应该用于错误的**日志记录和清理**，而不是用来忽略错误本身。

### ❌ 反模式：误解 #PRI/#LATER 的优先级

```erb
@EVENTSHOP
; 普通优先级

@EVENTSHOP #PRI
; ← 先执行（高优先级）

@EVENTSHOP #LATER
; ← 后执行（低优先级）
```

| 修饰符 | 执行顺序 | 用途 |
|--------|---------|------|
| 无 | 正常顺序 | 默认的事件处理 |
| `#PRI` | 先执行 | 初始化、前置条件设置 |
| `#LATER` | 后执行 | 后处理、日志输出 |
| `#SINGLE` | 只执行一个 | 排他性事件处理 |
| `#ONLY` | 只执行这个 | 取消其他所有事件 |

---

## 7.8 总结：反模式一览

| 类别 | 反模式 | 正确理解 |
|------|--------|---------|
| 作用域 | 以为 LOCAL 是完全局部的 | LOCAL 是每个函数的实例，但 #DIM LOCAL 和保留变量 LOCAL 是不同的 |
| 作用域 | 以为 DYNAMIC 和默认相同 | DYNAMIC 影响 ScopeIn（参与 REF 变量的生命周期） |
| 遮蔽 | 忽略形参名与全局变量名冲突 | 同名 #DIM 变量局部优先，全局不会被修改 |
| FORM | 使用 `{字符串变量}` | `{表达式}` 仅支持整数表达式，字符串用 `%变量%` |
| FORM | 在 FORM 内使用 CALL | CALL 是命令，不能在表达式中使用 |
| FORM | 忘记三连标识符展开 | `===`→CALLNAME:PLAYER 等，用 PRINTL 可避免 |
| REF/OUT | 以为 REF 和 OUT 是同一种东西 | REF=不可省略的引用，OUT=可省略的输出目标 |
| REF/OUT | 给 REF 变量指定大小 | 数字是维度占位符，非零会报错 |
| 命令/表达式 | 在表达式中使用命令 | 两条求值路径是独立的 |
| 命令/表达式 | 忘记 RESULT 污染 | 字符串函数等会设置 RESULT |
| HTML | 用 PRINT 输出 HTML 标签 | 必须使用 HTML_PRINT |
| HTML | 在 HTML_PRINT 内期待 FORM 展开 | 先用 @"..." 展开再传递 |
| 事件 | 在 BEFORE_ERROR 中忽略错误 | 应用于日志记录和清理 |
| 事件 | 误解 #PRI/#LATER 顺序 | #PRI=先，#LATER=后，#SINGLE=排他，#ONLY=独占 |
