# 第6章：动态解析与反射

!!! info "前置知识"

    - [函数与 CALL](call.zh.md) — 函数调用机制、RETURN/RETURNF
    - [FORM 语法](form-syntax.zh.md) — `%变量%`、`{表达式}` 展开规则
    - [命令 vs 表达式](command-vs-expression.zh.md) — 两条求值路径
    - [角色变量](character-variables.zh.md) — CSV 模板与角色编号

!!! tip "本章要点"

    - ERABASIC 的反射能力经历了四代演进：固定映射 → 名称反查 → 变量反射 → 通用求值
    - 每一代都对应一批函数族，理解演进脉络才能理解每个函数的设计动机和限制
    - FORM 语法是动态解析的"后门"，后续的动态能力全部从 FORM 生长出来

---

## 6.1 第一代：固定映射（eramaker）— 编号→值

eramaker 时代，查询函数都是**单向固定映射**：已知编号，查询对应的值。每个变量族有专用函数，函数名硬编码了访问目标：

```erb
; CSV 系列查询：已知角色模板编号，查询模板中的值
S = CSVNAME(0)              ; 模板 0 的 NAME
S = CSVCALLNAME(0)          ; 模板 0 的 CALLNAME
X = CSVBASE(0, 2)           ; 模板 0 的 BASE:2
X = CSVTALENT(0, 5)         ; 模板 0 的 TALENT:5

; 角色查询：已知编号，查找角色
I = GETCHARA(0)             ; 查找模板编号 0 对应的角色索引
I = FINDCHARA(TALENT, 5)    ; 查找 TALENT:5 == 1 的角色

; 等级查询：已知数值，查找对应等级
LV = GETPALAMLV(PALAM:0:2, 10)  ; PALAM:0:2 的值在 10 级阈值中对应的等级
LV = GETEXPLV(EXP:0:2, 10)      ; EXP:0:2 的值在 10 级阈值中对应的等级
```

**特点**：编译期就知道访问哪个变量族，无法根据字符串动态选择。

**函数参考**：[CSVNAME](../Reference/CSVNAME.zh.md)、[CSVBASE](../Reference/CSV_STATUS.zh.md)、[GETCHARA](../Reference/GETCHARA.zh.md)、[FINDCHARA](../Reference/FINDCHARA.zh.md)、[GETPALAMLV](../Reference/GETPALAMLV.zh.md)

---

## 6.2 第二代：名称反查（Emuera）— 字符串→编号

Emuera 引入了 `GETNUM`，实现了**名称→编号**的反向查询。这是第一次允许用字符串动态查找枚举值：

```erb
; GETNUM — 通过名称字符串查找编号
IDX = GETNUM(PALAM, "気力")     ; 返回 PALAM 中"気力"的编号
IDX = GETNUM(TALENT, "害羞")    ; 返回 TALENT 中"害羞"的编号
IDX = GETNUM(CFLAG, L_FLAG_NAME) ; 动态构造名称查找
```

`GETNUM` 的第一个参数是**变量引用**（不是字符串），第二个参数是名称字符串。它在 CSV 别名字典中查找名称对应的整数编号。

**限制**：仍需在编译期指定变量族（第一个参数是变量引用），无法完全动态选择变量族。

**函数参考**：[GETNUM](../Reference/GETNUM.zh.md)

### 同期的 FORM 动态求值

Emuera 同时引入了 `RETURNFORM` 和 `CALLFORM`，利用 FORM 语法的运行时展开能力：

```erb
; RETURNFORM — FORM 展开后作为整数表达式求值
RETURNFORM %L_EXPR%         ; 两阶段：FORM展开 → 整数表达式解析 → 写入 RESULT

; CALLFORM — FORM 展开后作为函数名
CALLFORM MY_FUNC_%L_SUFFIX% ; FORM展开 → 函数名查找 → 调用
```

!!! warning "RETURNFORM 只返回整数"

    `RETURNFORM` 的求值分两阶段：FORM 展开 → 整数表达式解析。最终结果写入 `RESULT`（整数数组），不存在 `RETURNSFORM`。要返回字符串，用 `RESULTS = ...` + `RETURN`。

    `CALLFORM` 只能动态构造函数名，参数仍然在编译期确定。`CALLFORM F_%X%(1, 2)` 的 `(1, 2)` 是固定的。

**函数参考**：[RETURNFORM](../Reference/RETURN.zh.md)、[CALLFORM](../Reference/FORM.zh.md)

---

## 6.3 第三代：变量反射（EM 扩展）— 字符串→变量 Token

EM（EvilMask）扩展引入了完整的变量反射能力，允许通过字符串动态访问变量：

### 变量存在检查

```erb
; EXISTVAR — 检查变量是否存在，返回位掩码
R = EXISTVAR("MONEY")       ; 1=整数, 2=字符串, 32=浮点, 4=常量, 8=2D, 16=3D
R = EXISTVAR("NAME")        ; 返回 2（字符串变量）

; ISDEFINED — 检查 #DEFINE 宏是否定义
R = ISDEFINED("MY_MACRO")   ; 1=已定义, 0=未定义
```

### 变量值读写

```erb
; GETVAR — 通过字符串名读取整数变量
X = GETVAR("MONEY")            ; 等价于 X = MONEY
X = GETVAR("COUNT:" + TSTR:0)  ; 动态构造变量名+索引
X = GETVAR(L_VAR_NAME, 0)      ; 变量不存在时返回默认值 0

; GETVARS — 通过字符串名读取字符串变量
S = GETVARS("NAME:TARGET")     ; 等价于 S = NAME:TARGET
S = GETVARS(L_VAR_NAME, "")    ; 变量不存在时返回默认值 ""

; SETVAR — 通过字符串名写入变量
SETVAR "MONEY", 1000           ; 等价于 MONEY = 1000
```

### 函数/变量/宏枚举

```erb
; ENUMFUNC* — 按前缀/后缀/包含枚举函数名
N = ENUMFUNCBEGINSWITH("SHOP")   ; 以"SHOP"开头的函数数量
N = ENUMFUNCENDSWITH("_EVENT")   ; 以"_EVENT"结尾的函数数量
N = ENUMFUNCWITH("HELPER")       ; 包含"HELPER"的函数数量

; ENUMVAR* — 按前缀/后缀/包含枚举变量名
N = ENUMVARBEGINSWITH("FLAG")    ; 以"FLAG"开头的变量数量

; ENUMMACRO* — 按前缀/后缀/包含枚举宏名
N = ENUMMACROBEGINSWITH("DBG")   ; 以"DBG"开头的宏数量
```

**关键区别**：`GETVAR` 只接受变量引用（不能是表达式），而 `EVAL` 接受任意表达式。`GETVAR("A + 10")` 会报错，`EVAL("A + 10")` 正常求值。

**函数参考**：[EXISTVAR](../Reference/EXISTVAR.zh.md)、[ISDEFINED](../Reference/ISDEFINED.zh.md)、[GETVAR/GETVARS/SETVAR](../Reference/GETSETVAR.zh.md)、[ENUMFUNC*](../Reference/ENUMFUNC.zh.md)、[ENUMVAR*](../Reference/ENUMVAR.zh.md)、[ENUMMACRO*](../Reference/ENUMMACRO.zh.md)

### EE 扩展：编号→名称反查

EE 扩展引入了 `ERDNAME`，实现了 `GETNUM` 的反向操作——已知编号，查询对应的名称字符串：

```erb
; ERDNAME — 通过编号查找名称
S = ERDNAME(PALAM, 2)       ; 返回 PALAM:2 的名称（如"理由"）
S = ERDNAME(TALENT, 5)      ; 返回 TALENT:5 的名称（如"害羞"）
```

**函数参考**：[ERDNAME](../Reference/ERDNAME.zh.md)

### DotNet 扩展：角色名→编号反查

DotNet 变体引入了 `GETCSVNOBY*` 系列，通过角色名称反查模板编号：

```erb
; GETCSVNOBY* — 通过角色名反查模板编号
I = GETCSVNOBYNAME("博丽灵梦")          ; 按 NAME 反查
I = GETCSVNOBYNICKNAME("乐园的巫女")     ; 按 NICKNAME 反查
I = GETCSVNOBYCALLNAME("灵梦")           ; 按 CALLNAME 反查
I = GETCSVNOBYMASTERNAME("灵梦大人")     ; 按 MASTERNAME 反查
```

**函数参考**：[GETCSVNOBY*](../Reference/GETCSVNOBY.zh.md)

---

## 6.4 第四代：通用动态求值（Skia）— 字符串→任意表达式

### EVAL/EVALS/EVALF — 通用表达式求值

Skia 变体引入了 EVAL 系列，是 RETURNFORM 的通用化升级。不再绑定 RETURN 语义，作为**表达式函数**在任意上下文中使用：

```erb
; EVAL — 整数动态求值
X = EVAL("A * 10")              ; 等价于 X = A * 10
X = EVAL(L_EXPR, 0)             ; 解析失败返回默认值 0

; EVALS — 字符串动态求值
S = EVALS("NAME:TARGET")        ; 等价于 S = NAME:TARGET
S = EVALS(L_STR_EXPR, "")       ; 解析失败返回默认值 ""

; EVALF — 浮点动态求值
F = EVALF("3.14 * 2")           ; 浮点表达式求值
F = EVALF(L_FLOAT_EXPR, 0.0)    ; 解析失败返回默认值 0.0
```

### 与 RETURNFORM 的关键区别

| | RETURNFORM | EVAL/EVALS/EVALF |
|------|-----------|------------------|
| **使用位置** | 仅作为独立命令 | 表达式函数，可在任意表达式中使用 |
| **类型支持** | 仅整数 | 整数/字符串/浮点 三种 |
| **默认值** | 无（解析失败报错） | 有（第二参数，省略时为类型零值） |
| **异常安全** | 无（异常传播） | 有（解析失败返回默认值） |
| **表达式类型** | 仅整数表达式 | 任意表达式（含运算符、函数调用） |

### 与 GETVAR 的关键区别

| | GETVAR/GETVARS | EVAL/EVALS/EVALF |
|------|---------------|------------------|
| **接受内容** | 仅变量引用 | 任意表达式 |
| `GETVAR("A+10")` | ❌ 报错 | — |
| `EVAL("A+10")` | — | ✅ 正常求值 |
| `GETVAR("MONEY")` | ✅ 读取变量 | ✅ 也可 |
| `EVAL("MONEY")` | — | ✅ 但 EVAL 更重（需完整解析） |

**函数参考**：[EVAL/EVALS](../Reference/EVAL.zh.md)

### CALLSTR — 函数名+参数全动态反射

`CALLFORM` 只能动态构造函数名，参数仍然在编译期确定。`CALLSTR` 则更进一步——**函数名和参数都从运行时字符串解析**：

```erb
; CALLFORM：只有函数名是动态的
CALLFORM MY_FUNC_%SUFFIX%(1, 2)    ; 参数 (1, 2) 固定

; CALLSTR：函数名和参数都是动态的
L_CALL_STRING '= "MY_FUNC_A(1, 2)"
CALLSTR L_CALL_STRING               ; 运行时解析函数名+参数

; 安全版本
TRYCALLSTR L_CALL_STRING             ; 函数不存在时不崩溃
TRYCCALLSTR L_CALL_STRING            ; 函数不存在时跳到 CATCH
```

**函数参考**：[CALLSTR](../Reference/CALLSTR.zh.md)

### ALS 多对一映射修复

上游原版 emuera.em 的 CSV 别名加载中，检查**编号是否重复**，导致同一个编号只能有一个名称。Skia 修复为检查**名称是否重复**，允许多个名称映射到同一编号：

```csv
; palam.csv
2,理由
2,理性        ; ← 原版：报"编号重复"警告，名称不被注册
              ; ← Skia：正常注册，GETNUM(PALAM, "理性") 返回 2
2,Reason      ; ← Skia：也可以，多对一映射
```

| | 原版（emuera.em） | Skia 修复 |
|------|:---:|:---:|
| **检查对象** | 编号（index）是否重复 | 名称（aliasName）是否重复 |
| **映射关系** | 一对一 | 多对一 |
| **同编号多名称** | ❌ 被拒绝 | ✅ 正常注册 |
| **同名多编号** | 后者覆盖前者 | 被拒绝（名称唯一） |

这是从"枚举编号是主键"到"枚举名称是主键"的设计转变——名称是标识符，编号是值，多个标识符可以映射到同一个值。

---

## 6.5 反射能力演进总表

| 时代 | 能力 | 代表函数 | 动态程度 | 查询方向 |
|------|------|---------|---------|---------|
| eramaker | CSV 编号→值查询 | `CSVNAME`/`CSVBASE`/`CSVTALENT` | 编号→值（固定映射） | 编号 → 值 |
| eramaker | 角色编号反查 | `GETCHARA`/`FINDCHARA` | 编号→角色索引 | 编号 → 索引 |
| eramaker | 数值→等级查询 | `GETPALAMLV`/`GETEXPLV` | 数值→等级阈值 | 值 → 等级 |
| Emuera | 名称→编号反查 | `GETNUM` | 字符串→编号映射 | 名称 → 编号 |
| Emuera | FORM 动态返回值 | `RETURNFORM` | FORM→整数解析 | 字符串 → 整数 |
| Emuera | 函数名反射 | `CALLFORM` | FORM→函数名查找 | 字符串 → 函数 |
| EM 扩展 | 变量存在检查 | `EXISTVAR`/`ISDEFINED` | 字符串→Token存在性 | 名称 → 存在性 |
| EM 扩展 | 变量值读写 | `GETVAR`/`GETVARS`/`SETVAR` | 字符串→变量值 | 名称 → 值 |
| EM 扩展 | 函数/变量/宏枚举 | `ENUMFUNC*`/`ENUMVAR*`/`ENUMMACRO*` | 前缀→名称列表 | 前缀 → 名称列表 |
| EE 扩展 | 编号→名称反查 | `ERDNAME` | 变量+编号→名称 | 编号 → 名称 |
| DotNet | 角色名→编号反查 | `GETCSVNOBY*` | 名称→模板编号 | 名称 → 编号 |
| Skia | 通用表达式求值 | `EVAL`/`EVALS`/`EVALF` | 字符串→表达式求值 | 字符串 → 任意值 |
| Skia | 函数名+参数反射 | `CALLSTR` | 字符串→完整函数调用 | 字符串 → 函数调用 |
| Skia | 多对一枚举映射 | ALS 修复 | CSV 别名多对一 | 多名称 → 同编号 |

### 演进方向

```
固定映射 → 名称反查 → 变量反射 → 通用求值
   ↑           ↑           ↑           ↑
CSVNAME     GETNUM      GETVAR      EVAL
GETCHARA    RETURNFORM  EXISTVAR    CALLSTR
GETPALAMLV  CALLFORM    ENUM*       ALS修复
                        ERDNAME
                        GETCSVNOBY*
```

**核心趋势**：从"编译期确定一切"到"运行时按需解析"。每一步演进都对应一个具体需求：

1. **CSV\* / GETCHARA**：需要查询已知编号对应的值
2. **GETNUM**：需要根据名称字符串查找编号
3. **RETURNFORM / CALLFORM**：需要动态构造返回值或函数名
4. **GETVAR / EXISTVAR / ENUM\***：需要根据字符串动态访问变量
5. **ERDNAME / GETCSVNOBY\***：需要编号↔名称双向查询
6. **EVAL / CALLSTR**：需要将任意字符串作为表达式或函数调用求值
7. **ALS 修复**：需要同一概念有多个名称（多对一映射）

---

## 下一步

| 你想了解什么 | 前往 |
|:---|:---|
| 运行时机制（ConvertArg→IntoFunction） | [运行时机制](runtime-mechanics.zh.md)（待创建） |
| 反模式与常见错误 | [反模式](anti-patterns.zh.md)（待创建） |
| 函数声明系统 | [变量声明系统](variable-declaration.zh.md) |
| 命令 vs 表达式 | [命令 vs 表达式](command-vs-expression.zh.md) |
| CSV 别名机制 | [角色变量](character-variables.zh.md) |
