# 第7章：运行时机制

!!! info "前置知识"

    - **Reference 分类**: [函数系列（CALL 等）](../Reference/README.zh.md#function-call) / [RETURN 系列](../Reference/README.zh.md#return)
    - [函数与 CALL](call.zh.md) — 函数调用机制、RETURN/RETURNF
    - [命令 vs 表达式](command-vs-expression.zh.md) — 两条求值路径
    - [变量声明系统](variable-declaration.zh.md) — REF/OUT、#DIM、VARIADIC

!!! tip "本章要点"

    - ERABASIC 的函数调用经过三阶段流水线处理：`ConvertArg`（验证）→ `SetTransporter`（值/引用提取）→ `IntoFunction`（绑定到形参）
    - REF 变量的 `array` 在 `ScopeIn` 时被置 null，在 `SetRef` 中恢复——不理解这个生命周期就无法追踪"缺少引用对象"错误
    - CALL 函数与表达式函数（#FUNCTION）的 `ConvertArg` 执行时机不同（运行期 vs 编译期）

---

## 7.1 函数调用的两条路径

ERABASIC 有两种函数调用方式，运行时路径不同：

### CALL 函数（命令函数）

```
CALL FUNC(arg1, arg2)
│
├─ 编译期: 参数语法检查
├─ 运行期: CallFunction() → ConvertArg() → SetTransporter() → IntoFunction() → runScriptProc()
└─ 返回:   ReturnFromFunction() → ScopeOut()
```

- `ConvertArg` 在 `CallFunction` 内部调用（**运行期**，每次调用都执行）
- 返回值通过 `RESULT`/`RESULTS` 接收

### 表达式函数（#FUNCTION/#FUNCTIONS）

```
LOCAL = FUNC(arg1, arg2)
│
├─ 编译期: UserDefinedMethodTerm.Create() → ConvertArg() 验证参数
├─ 运行期: Process.GetValue(udmt) → SetTransporter() → IntoFunction() → runScriptProc()
└─ 返回:   finally { ScopeOut() } → MethodReturnValue
```

- `ConvertArg` 在 `UserDefinedMethodTerm.Create` 时调用（**编译期**，仅一次）
- 返回值作为 `RETURNF` 的值在表达式内直接使用

### 关键差异

| 属性 | CALL 函数 | 表达式函数（#FUNCTION） |
|------|----------|----------------------|
| ConvertArg 时机 | 运行期（每次调用） | 编译期（仅一次） |
| 调用入口 | `CallFunction()` | `GetValue(SuperUserDefinedMethodTerm)` |
| 返回值 | 无（通过 RESULT/RESULTS） | `MethodReturnValue`（RETURNF 的值） |
| ScopeOut 位置 | `ReturnFromFunction` | `GetValue` 的 `finally` 块 |
| AST 节点 | `InstructionLine` | `UserDefinedMethodTerm`（AExpression） |

---

## 7.2 三阶段流水线详解

### 阶段1：ConvertArg — 参数验证与转换

```
CALL FUNC(arg1, arg2)
│
├─ 类型检查（REF 参数必须是 VariableTerm）
├─ 维度匹配（标量 REF vs 数组 REF）
├─ MatchType 类型兼容性检查
├─ 默认值填充（省略的参数用 Def[i] 填充）
└─ 可变参数打包为 VariadicArgTerm
→ 输出: UserDefinedFunctionArgument
```

ConvertArg 的主要职责是**静态验证**。检查参数的类型和数量是否与函数定义一致，不一致则产生编译错误。

### 阶段2：SetTransporter — 值与引用的提取

```
SetTransporter(exm)
│
├─ 非 REF 参数: 计算表达式值 → 存入 TransporterInt/Str/Float[i]
├─ REF 标量: GetArray() → 存入 TransporterRef[i]
├─ REF 数组元素: new ElementRefInfo(...) → 存入 TransporterElementRef[i]
└─ REF 整个数组: GetArray() → 存入 TransporterRef[i]
→ 输出: Transporter 数组填充完成
```

SetTransporter 负责**运行时的值提取**。对于 REF 参数，将实际数组对象的引用存入 Transporter 数组。

### 阶段3：IntoFunction — 绑定到形参

```
IntoFunction(func, exm)
│
├─ ScopeIn() → 所有 REF 变量的 array=null
├─ TransporterElementRef[i] ≠ null → SetRef(ElementRefInfo)
├─ TransporterRef[i] ≠ null → SetRef(Array)
├─ IsOut=true → SetNullRef()（OUT 参数省略时的黑洞）
└─ 非 REF: SetValue(TransporterInt/Str/Float[i])
→ 结果: 形参绑定完成，开始执行函数体
```

---

## 7.3 REF 变量的生命周期

REF 变量的 `array` 字段随函数调用生命周期变化：

```
函数调用前:  array = 之前的值（或 null）
       ↓
ScopeIn():  array = null（重置），旧值退避到 arrayList
       ↓
SetRef():   array = 实参数组引用（绑定）
       ↓
函数体执行:  通过 array 访问实参
       ↓
ScopeOut(): array = 退避的旧值（恢复）
```

### 嵌套调用的例子

```erb
@OUTER
#DIM REF HIT_LIST, 0
; HIT_LIST.array = 外部数组引用

CALL INNER(HIT_LIST)
; ← IntoFunction 内:
;   ScopeIn() → HIT_LIST.array = null, arrayList = [外部数组]
;   SetRef(内部数组) → HIT_LIST.array = 内部数组
; ← 函数结束时:
;   ScopeOut() → HIT_LIST.array = 外部数组（恢复）

@INNER
#DIM REF DATA, 0
; 通过 DATA 访问 HIT_LIST 的数据
DATA:0 = 42
; ← 写入到调用方的数组
```

!!! warning "ScopeIn 不被调用的情况"

    `ScopeIn` 仅在 `hasPrivDynamicVar=true` 时调用。如果函数没有 `#DIM DYNAMIC` 变量，`ScopeIn`/`ScopeOut` 不会被调用，REF 变量的 `array` 在首次 `SetRef` 后保持不变。

---

## 7.4 "缺少引用对象"错误

REF 变量的 `array` 为 `null` 时访问会触发此错误：

```
引用型变量"X"缺少引用对象
```

### 触发条件

| 场景 | 原因 | 处理方法 |
|------|------|---------|
| REF 参数省略（非 OUT） | `TransporterRef[i]` 保持 null | REF 参数不可省略（仅 OUT 可省略） |
| IntoFunction 中 SetRef 未被调用 | 绑定逻辑缺陷 | 检查 ConvertArg→SetTransporter→IntoFunction 全链路 |
| ScopeOut 后未重新绑定 | 嵌套调用返回后需要重新绑定 | 检查调用结构 |

### 调试步骤

1. `ConvertArg`：确认参数类型和数量正确
2. `SetTransporter`：确认 Transporter 数组中存储了正确的值/引用
3. `IntoFunction`：确认 `SetRef` 被正确调用
4. `ScopeIn`/`ScopeOut`：确认 REF 变量的 `array` 按预期变化

---

## 7.5 OUT 参数的黑洞

OUT 参数被省略时，`SetNullRef()` 被调用，绑定到 **NullRefTerm** 黑洞：

```erb
@FUNC
#DIM OUT RESULT_OUT, 0
; 调用方省略 OUT 参数时:
; RESULT_OUT → NullRefTerm（写入后不会反映到任何地方）

CALL FUNC
; 对 RESULT_OUT 的写入被黑洞吸收

CALL FUNC(RESULT_OUT)
; 正常：RESULT_OUT 的值会被反映
```

!!! warning "OUT 参数的省略顺序"

    OUT 参数按声明顺序绑定。省略中间的 OUT 参数会导致后续参数全部错位：

    ```erb
    @FUNC
    #DIM OUT A, 0
    #DIM OUT B, 0
    #DIM OUT C, 0

    ; ❌ 危险：试图省略 B，但语法上变成 (A, C)
    ;    C 被绑定到 B 的位置
    CALL FUNC(RESULT_A, RESULT_C)
    ```

---

## 7.6 RESULT 的行为与函数的隐式末尾

### 命令函数的 RESULT

命令函数（通过 CALL 调用的函数）中，`RETURN` 设置 `RESULT`。但**函数末尾存在隐式的 `RESULT = 0`**：

```erb
@MY_FUNC
; （没有 RETURN 语句）
; ← 隐式设置 RESULT = 0

@MY_FUNC2
RESULT = 42
RETURN
; ← RETURN 本身会设置 RESULT
```

### 表达式函数的 RETURNF

表达式函数（#FUNCTION）中，`RETURNF` 设置 `MethodReturnValue`，但不触碰 `RESULT`：

```erb
@MY_EXPR_FUNC
#FUNCTION
RETURNF 42
; ← RESULT 不变
; ← MethodReturnValue = 42
```

### JUMP 的 RESULT

JUMP 只是替换栈帧，RETURN 的 RESULT 设置机制本身不变。JUMP 目标函数中执行 RETURN 时，RESULT 照常设置。

---

## 7.7 运行时机制全景图

```
ERB 脚本
    │
    ├─ CALL FUNC(args) ─────────────────────────────────────┐
    │                                                       │
    ├─ LOCAL = FUNC(args)  ← #FUNCTION                      │
    │                                                       │
    └─ CALLFORM / CALLSTR ──────────────────────────────────┘
                                                            │
    ┌───────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   ConvertArg    │────▶│  SetTransporter  │────▶│   IntoFunction   │
│  (验证・转换)    │     │  (值/引用提取)    │     │  (形参绑定)       │
└─────────────────┘     └──────────────────┘     └──────────────────┘
    编译期                  运行期                    运行期
    或运行期

    ▼
┌─────────────────┐     ┌──────────────────┐
│  runScriptProc  │────▶│  Return /        │
│  (函数体执行)    │     │  ReturnFromFunc  │
└─────────────────┘     └──────────────────┘
                              │
                              ├─ RETURN → 设置 RESULT → ScopeOut
                              ├─ RETURNF → MethodReturnValue → ScopeOut
                              └─ JUMP → 递归 Return() → 回到非 JUMP 调用者
```

---

## 7.8 总结

| 概念 | 要点 |
|------|------|
| 三阶段流水线 | ConvertArg → SetTransporter → IntoFunction。理解各阶段的职责和时机是关键 |
| REF 变量生命周期 | ScopeIn(null 化) → SetRef(绑定) → ScopeOut(恢复)。无 DYNAMIC 变量的函数不调用 ScopeIn/ScopeOut |
| OUT 参数黑洞 | 省略的 OUT 参数绑定到 NullRefTerm，写入后不会反映 |
| CALL vs 表达式函数 | ConvertArg 时机不同（运行期 vs 编译期）。RESULT 行为也不同 |
| RESULT 隐式设置 | 命令函数末尾存在隐式 RESULT=0。RETURNF 不触碰 RESULT |
