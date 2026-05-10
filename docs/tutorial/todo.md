# ERABASIC 教程架构重构 — 待办清单

> **目标**：参照 runoob C/C#/Python 教程的渐进式学习架构，将 emuera.em.doc 的教程重构为
> 一门语言教程应有的完整体系，同时整合现有手册内容和知识库中的源码级洞见。

---

## 0. 架构设计分析

### 0.1 runoob 教程的共同模式

| 维度 | C 教程 | C# 教程 | Python 教程 |
|------|--------|---------|-------------|
| 入口 | 简介 + Hello World | 简介 + Hello World | 简介 + 版本查看 |
| 基础语法 | 数据类型、变量、常量、运算符 | 数据类型、变量、常量、运算符 | 基础语法、数据类型、运算符 |
| 控制流 | if/switch/for/while | if/switch/for/while | if/while/for |
| 函数 | 函数定义、作用域、递归 | 方法定义、参数、重载 | 函数定义、参数、lambda |
| 数据结构 | 数组、字符串、指针 | 数组、字符串、结构体 | 列表、元组、字典、集合 |
| 高级特性 | 指针、内存、文件IO | 类、继承、接口、泛型 | 模块、IO、异常、面向对象 |
| 标准库 | stdio/stdlib/string | System 集合/LINQ | 内置函数/标准库 |
| 参考 | 速查表、编译选项 | 速查表、命名空间 | 速查表、内置函数 |

**共同规律**：
1. **渐进式**：从 Hello World → 基础语法 → 控制流 → 函数 → 数据结构 → 高级特性
2. **每章独立**：每章讲一个主题，有完整示例，可独立查阅
3. **速查 + 详解**：首页有速查表，各章节有详细解释
4. **参考手册分离**：教程是"怎么用"，参考手册是"API 签名"

### 0.2 ERABASIC 作为 BASIC 变体的特殊性

| 维度 | 主流语言 | ERABASIC |
|------|---------|----------|
| 类型系统 | 编译期静态类型 | 运行期三类型（Int/Str/Float），标识符字典注册制 |
| 函数声明 | 签名即声明 | **签名引用 + 体内声明**（不可分割） |
| 变量声明 | 随处声明 | #DIM 必须紧跟 @ 标签行（预处理行规则） |
| 作用域 | 块作用域/词法作用域 | 标识符字典注册制，私有 vs 全局 |
| 参数传递 | 值/引用在签名中声明 | REF/OUT 在 #DIM 中声明，VARIADIC 在签名中声明 |
| 控制流 | 花括号块 | 行驱动，SIF 只跟一条语句 |
| 字符串 | 统一类型 | `=` 格式化 vs `'=` 表达式求值 |
| 数组 | 声明即初始化 | #DIM 内联初始化仅一维，多维需逐行赋值 |
| 文件组织 | 模块/包/命名空间 | ERH 头文件 + ERB 函数文件 + CSV 数据文件 |
| 事件驱动 | 框架回调 | 内置事件函数（@EVENT_*），引擎自动调用 |

### 0.3 现有内容盘点

**已有手册页面（可直接引用）**：

| 分类 | 页面 | 内容 |
|------|------|------|
| 基础 | Emuera/expression.md | 表达式与运算符 |
| 基础 | Emuera/operand.md | 操作数与类型 |
| 变量 | Emuera/variables.md | 变量系统总览 |
| 变量 | Emuera/user_defined_variables.md | 用户定义变量（#DIM） |
| 变量 | Emuera/ERH.md | 头文件声明 |
| 函数 | Emuera/function.md | 函数与预处理器 |
| 函数 | Emuera/in_expression_function.md | 表达式函数 |
| 函数 | Emuera/user_defined_in_expression_function.md | 用户定义表达式函数 |
| 流程 | Emuera/system_flow.md | 系统流程 |
| 流程 | eramaker/system_flow.md | eramaker 流程（历史参考） |
| 格式 | eramaker/ERB_format.md | ERB 文件格式 |
| 格式 | eramaker/CSV_format.md | CSV 文件格式 |
| HTML | Emuera/HTML_PRINT.md | HTML 渲染 |
| 配置 | Emuera/config.md, config_files.md, usage.md | 设置与使用 |
| 参考 | Reference/*.md | 200+ 指令 API 页面 |

**知识库中有但手册中缺失的内容**：

| 分类 | 知识库条目 | 手册中缺失的 |
|------|-----------|-------------|
| 声明系统 | declaration-system.md | 函数声明与变量声明不可分割的架构说明 |
| 引用参数 | declaration-system.md#7 | REF/OUT 维度语义、ElementRefInfo 机制 |
| 可变参数 | declaration-system.md#8 | VARIADIC 关键字语法 |
| 类型系统 | declaration-system.md#6 | Float 类型、隐式转换规则 |
| 反模式 | declaration-system.md#9 | #DIM VARIADIC 不存在等常见错误 |
| 运行时 | runtime-flow.md | ConvertArg→SetTransporter→IntoFunction 三阶段 |
| SELECTCASE | selectcase-jumptable.md | 跳转表优化原理 |
| 图片渲染 | image-rendering.md | Sprite 缓存、SETIMAGELAYER、三变体定位对比 |
| HTML | html-manager.md | 三变体 HtmlManager 对比、标签支持矩阵 |

---

## 1. 教程目录架构设计

> **设计原则**：自底向上、感性先行。让开发者先用起来，逐步发现"为什么"，
> 而不是一开始就灌输引擎架构概念。
>
> **核心认知**：ERABASIC 程序只有两个状态——CALL 链在跑，或者停在 INPUT 等玩家。
> 开发者不是在"写程序"，而是在"写 CALL 链上的每一个节点"。
> 但这条认知不需要一开始就讲——它会在第 4 章自然浮现。

```
教程首页 (tutorial/index.zh.md)
│
├── 1. 简介
│   ├── 1.1 ERABASIC 是什么          [新建] — BASIC 变体、行驱动 DSL、era 游戏脚本
│   ├── 1.2 Hello World              [新建] — 第一个 ERB 程序，PRINT 是你认识的第一个指令
│   ├── 1.3 文件类型与处理顺序        [新建] — ERB/ERH/CSV 三层
│   ├── 1.4 行类型与结构              [新建] — @标签行、#预处理行、指令行、$标签行
│   ├── 1.5 版本演进                  → tutorial/evolution.zh.md（已有）
│   └── 1.6 开发环境                  → Emuera/usage.md（已有）
│
├── 2. 基础语法 — 写指令
│   ├── 2.1 值、类型与变量            [新建] — Int/Str/Float 三类型，A-Z 保留变量
│   ├── 2.2 表达式与运算符            → Emuera/expression.md（已有）
│   ├── 2.3 赋值                      [新建] — A = 1 也是一条指令，= vs '=
│   ├── 2.4 基本输出                  [新建] — PRINT/PRINTFORM/PRINTSINGLE/PRINTL
│   └── 2.5 注释与格式化字符串        [新建] — ;注释、FORM 语法、{变量}插值
│
├── 3. 流程控制 — 让指令有条件地执行
│   ├── 3.1 条件分支                  [新建] — IF/SIF/SELECTCASE（自然语言熟悉的结构）
│   ├── 3.2 循环                      [新建] — REPEAT/FOR/WHILE/DO
│   └── 3.3 跳转                      [新建] — GOTO/$标签/CONTINUE/BREAK
│
├── 4. 自定义函数与 CALL — 把指令打包
│   ├── 4.1 @标签                     [新建] — 定义可被 CALL 的代码块
│   ├── 4.2 CALL                      [新建] — 调用另一个 @标签
│   ├── 4.3 参数传递                  [新建] — ARG/ARGS/ARGF，CALL 时传数据
│   ├── 4.4 返回值                    [新建] — RETURN/RETURNF，RESULT 接收
│   └── 4.5 INPUT 与交互              [新建] — 等待玩家输入，RESULT 接收输入值
│         → 学习者逐步感性认识到：RESULT 是全局的，INPUT 后 RESULT 被改写
│
├── 5. 变量声明系统 — 声明自己的数据
│   ├── 5.1 #DIM/#DIMS/#DIMF          [新建] — 声明语法、数组大小与维度、内联初始化
│   ├── 5.2 作用域与修饰符            [新建] — CONST/DYNAMIC/STATIC/GLOBAL/SAVEDATA/CHARADATA
│   ├── 5.3 声明绑定                  [新建] — @标签签名 ↔ #DIM 声明（为什么不可分割）
│   ├── 5.4 引用参数                  [新建] — REF/OUT，维度语义，省略绑定
│   ├── 5.5 可变参数                  [新建] — VARIADIC ARG/ARGS/ARGF
│   └── 5.6 头文件与 CSV              → Emuera/ERH.md + eramaker/CSV_format.md（已有）
│
├── 6. 函数进阶
│   ├── 6.1 表达式函数                [新建] — #FUNCTION/#FUNCTIONS/#FUNCTIONF
│   ├── 6.2 指令修饰符                [新建] — #PRI/#LATER/#SINGLE/#ONLY
│   └── 6.3 CALL 链与调用深度         [新建] — CALL/CALLF/TJUMP/RESTART 的区别
│
├── 7. 引擎流程 — 理解引擎如何调度你的指令
│   ├── 7.1 两状态模型                [新建] — 运行态（CALL 链执行中）vs 等待 INPUT
│   ├── 7.2 系统流程                  → Emuera/system_flow.md（已有）
│   ├── 7.3 内置事件函数              [新建] — @EVENTFIRST/@EVENT_*，引擎自动 CALL 的入口
│   └── 7.4 运行时机制                [新建] — ConvertArg→SetTransporter→IntoFunction
│
├── 8. 命令与表达式的边界（进阶）
│   ├── 8.1 命令 vs 表达式            → tutorial/command-vs-expression.zh.md（✅ 已完成）
│   ├── 8.2 METHOD_SAFE               [新建] — 哪些命令可以用于表达式
│   ├── 8.3 常量折叠                  [新建] — 哪些表达式可用于初始化赋值
│   ├── 8.4 RESULT 污染               [新建] — 内置命令式函数可能改写 RESULT，但不一定
│   └── 8.5 表达式函数作为命令        [新建] — 用作命令时，必须写入 RESULT
│
├── 9. 内置指令分类速查（索引页，链接到 Reference）
│   ├── 9.1 字符串操作
│   ├── 9.2 数组操作
│   ├── 9.3 数据结构（MAP/DataTable/XML）
│   ├── 9.4 角色操作
│   ├── 9.5 图形与音频
│   └── 9.6 存档与持久化
│
├── 10. 高级主题
│   ├── 10.1 反模式与常见错误         [新建] — 整合知识库中的反模式汇总
│   ├── 10.2 调试                     → Emuera/debug.md（已有）
│   ├── 10.3 配置与兼容性             → Emuera/config.md（已有）
│   └── 10.4 变体特有功能             → EMEE/EMEE_Summary.zh.md + Skia/Skia_Summary.zh.md
│
└── 参考
    ├── 指令速查表                    → tutorial/index.zh.md（已有速查表）
    └── 指令参考手册                  → Reference/README.md（已有）
```

---

## 2. 需要新建的教程页面

> 以下页面是手册中缺失、但知识库中已有源码级洞见的内容。
> 按新架构的章节顺序排列。

### 2.1 第 1 章：简介

| 页面 | 内容来源 | 状态 |
|------|---------|------|
| `tutorial/intro.zh.md` — ERABASIC 简介 | 新写 + evolution.zh.md | ✅ 已完成 |
| `tutorial/hello-world.zh.md` — Hello World | 新写 | ✅ 已完成 |
| `tutorial/file-types.zh.md` — 文件类型与处理顺序 | syntax-quickref.md + eramaker/ERB_format.md | ✅ 已完成 |
| `tutorial/line-types.zh.md` — 行类型与结构 | syntax-quickref.md | ✅ 已完成 |

### 2.2 第 2 章：基础语法 — 写指令

| 页面 | 内容来源 | 状态 |
|------|---------|------|
| `tutorial/values-types.zh.md` — 值、类型与变量 | declaration-system.md#6 + Emuera/operand.md | ⬜ 待创建 |
| `tutorial/assignment.zh.md` — 赋值 | 新写（= vs '=、A-Z 保留变量） | ⬜ 待创建 |
| `tutorial/basic-output.zh.md` — 基本输出 | 新写（PRINT/PRINTFORM/PRINTSINGLE/PRINTL） | ⬜ 待创建 |
| `tutorial/form-syntax.zh.md` — 注释与格式化字符串 | 新写（;注释、FORM 语法、{变量}插值） | ⬜ 待创建 |

### 2.3 第 3 章：流程控制

| 页面 | 内容来源 | 状态 |
|------|---------|------|
| `tutorial/condition.zh.md` — 条件分支 | 新写（IF/SIF/SELECTCASE） | ⬜ 待创建 |
| `tutorial/loop.zh.md` — 循环 | 新写（REPEAT/FOR/WHILE/DO） | ⬜ 待创建 |
| `tutorial/jump.zh.md` — 跳转 | 新写（GOTO/$标签/CONTINUE/BREAK） | ⬜ 待创建 |

### 2.4 第 4 章：自定义函数与 CALL

| 页面 | 内容来源 | 状态 |
|------|---------|------|
| `tutorial/at-label.zh.md` — @标签 | 新写（定义可被 CALL 的代码块） | ⬜ 待创建 |
| `tutorial/call.zh.md` — CALL | 新写（调用另一个 @标签） | ⬜ 待创建 |
| `tutorial/function-params.zh.md` — 参数传递 | declaration-system.md#2（ARG/ARGS/ARGF） | ⬜ 待创建 |
| `tutorial/return-result.zh.md` — 返回值 | 新写（RETURN/RETURNF，RESULT 接收） | ⬜ 待创建 |
| `tutorial/input.zh.md` — INPUT 与交互 | 新写（等待玩家输入，RESULT 接收输入值） | ⬜ 待创建 |

### 2.5 第 5 章：变量声明系统

| 页面 | 内容来源 | 状态 |
|------|---------|------|
| `tutorial/dim-syntax.zh.md` — #DIM/#DIMS/#DIMF | declaration-system.md#4 + Emuera/user_defined_variables.md | ⬜ 待创建 |
| `tutorial/scope-modifiers.zh.md` — 作用域与修饰符 | declaration-system.md#4（CONST/DYNAMIC/STATIC/GLOBAL/SAVEDATA/CHARADATA） | ⬜ 待创建 |
| `tutorial/declaration-binding.zh.md` — 声明绑定 | declaration-system.md#1 + #5（签名引用+体内声明范式） | ⬜ 待创建 |
| `tutorial/ref-out.zh.md` — 引用参数 | declaration-system.md#7（REF/OUT，维度语义，省略绑定） | ⬜ 待创建 |
| `tutorial/variadic.zh.md` — 可变参数 | declaration-system.md#8（VARIADIC ARG/ARGS/ARGF） | ⬜ 待创建 |

### 2.6 第 6 章：函数进阶

| 页面 | 内容来源 | 状态 |
|------|---------|------|
| `tutorial/expression-function.zh.md` — 表达式函数 | declaration-system.md#2 + Emuera/in_expression_function.md | ⬜ 待创建 |
| `tutorial/function-modifiers.zh.md` — 指令修饰符 | declaration-system.md#2（#PRI/#LATER/#SINGLE/#ONLY） | ⬜ 待创建 |
| `tutorial/call-chain.zh.md` — CALL 链与调用深度 | 新写（CALL/CALLF/TJUMP/RESTART 的区别） | ⬜ 待创建 |

### 2.7 第 7 章：引擎流程

| 页面 | 内容来源 | 状态 |
|------|---------|------|
| `tutorial/two-state-model.zh.md` — 两状态模型 | 新写（运行态 vs 等待 INPUT） | ⬜ 待创建 |
| `tutorial/event-functions.zh.md` — 内置事件函数 | Emuera/function.md + system_flow.md | ✅ 已完成 |
| `tutorial/runtime.zh.md` — 运行时机制 | runtime-flow.md（ConvertArg→SetTransporter→IntoFunction） | ⬜ 待创建 |

### 2.8 第 8 章：命令与表达式的边界（进阶）

> **本章是手册中完全缺失的内容**，需要从源码中提取洞见。

| 页面 | 内容来源 | 状态 |
|------|---------|------|
| `tutorial/command-vs-expression.zh.md` — 命令 vs 表达式 | 新写（两种求值路径的根本差异） | ⬜ 待创建 |
| `tutorial/method-safe.zh.md` — METHOD_SAFE | 源码分析（哪些命令可以用于表达式） | ⬜ 待创建 |
| `tutorial/constant-folding.zh.md` — 常量折叠 | 源码分析（哪些表达式可用于初始化赋值） | ⬜ 待创建 |
| `tutorial/result-pollution.zh.md` — RESULT 污染 | 源码分析（内置命令式函数对 RESULT 的副作用） | ⬜ 待创建 |
| `tutorial/expr-as-command.zh.md` — 表达式函数作为命令 | 源码分析（用作命令时必须写入 RESULT） | ⬜ 待创建 |

### 2.9 第 10 章：高级主题

| 页面 | 内容来源 | 状态 |
|------|---------|------|
| `tutorial/anti-patterns.zh.md` — 反模式与常见错误 | declaration-system.md#9 | ⬜ 待创建 |

---

## 3. 与现有架构的关系

### 3.1 教程 vs 手册 vs 参考

| 层级 | 定位 | 内容风格 | 对应 mkdocs 导航 |
|------|------|---------|-----------------|
| **教程** | "怎么学" — 渐进式学习路径 | 有示例、有解释、有练习 | `チュートリアル` |
| **手册** | "怎么理解" — 概念与规格说明 | 有定义、有分类、有对比 | `仕様概要` + `Emuera/` |
| **参考** | "怎么用" — API 签名速查 | 有签名、有参数、有返回值 | `リファレンス` |

**教程页面引用手册/参考页面的方式**：
- 教程页面开头写"本节对应手册：[链接]"
- 教程页面补充手册中缺失的洞见（如声明系统不可分割性）
- 教程页面不重复手册/参考中已有的内容，而是链接过去

### 3.2 mkdocs.yml 导航结构建议

```yaml
nav:
  - ホーム: README.md
  - チュートリアル:
      - tutorial/index.md
      - 简介:
          - tutorial/intro.md
          - tutorial/hello-world.md
      - 基本语法:
          - tutorial/file-types.md
          - tutorial/line-types.md
          - Emuera/expression.md
          - Emuera/operand.md
          - tutorial/form-syntax.md
      - 变量与声明:
          - Emuera/variables.md
          - Emuera/user_defined_variables.md
          - Emuera/ERH.md
          - eramaker/CSV_format.md
          - tutorial/declaration.md
          - tutorial/ref-out.md
          - tutorial/variadic.md
          - tutorial/type-system.md
      # ... (其余章节类似)
```

---

## 4. 实施步骤

### Phase 1：修正现有页面 ✅

- [x] 修正 README.zh.md 主页
- [x] 确认 tutorial/index.zh.md 的链接指向正确
- [x] 修正教程首页中 basics.md/advanced.md/expert.md 的引用

### Phase 2：第 1 章 简介 ✅

- [x] tutorial/intro.zh.md — ERABASIC 简介
- [x] tutorial/hello-world.zh.md — Hello World
- [x] tutorial/file-types.zh.md — 文件类型与处理顺序
- [x] tutorial/line-types.zh.md — 行类型与结构

### Phase 3：第 2 章 基础语法 — 写指令

- [x] tutorial/values-types.zh.md — 值、类型与变量
- [x] tutorial/assignment.zh.md — 赋值（补充 #DIMS 初始化语义差异）
- [x] tutorial/basic-output.zh.md — 基本输出
- [x] tutorial/form-syntax.zh.md — 注释与格式化字符串（✅ 已完成，需检查交叉引用）

### Phase 4：第 3 章 流程控制

- [x] tutorial/condition.zh.md — 条件分支
- [x] tutorial/loop.zh.md — 循环
- [x] tutorial/jump.zh.md — 跳转

### Phase 5：第 4 章 自定义函数与 CALL

- [x] tutorial/call.zh.md — 函数与 CALL（整合了参数传递、返回值、INPUT）

### Phase 6：第 5 章 变量声明系统

- [ ] tutorial/dim-syntax.zh.md — #DIM/#DIMS/#DIMF
- [ ] tutorial/scope-modifiers.zh.md — 作用域与修饰符
- [ ] tutorial/declaration-binding.zh.md — 声明绑定
- [ ] tutorial/ref-out.zh.md — 引用参数
- [ ] tutorial/variadic.zh.md — 可变参数

### Phase 7：第 6 章 函数进阶

- [ ] tutorial/expression-function.zh.md — 表达式函数
- [ ] tutorial/function-modifiers.zh.md — 指令修饰符
- [ ] tutorial/call-chain.zh.md — CALL 链与调用深度

### Phase 8：第 7 章 引擎流程

- [ ] tutorial/two-state-model.zh.md — 两状态模型
- [x] tutorial/event-functions.zh.md — 内置事件函数
- [ ] tutorial/runtime.zh.md — 运行时机制

### Phase 9：第 8 章 命令与表达式的边界（进阶）

> 需要先分析源码，提取 METHOD_SAFE / 常量折叠 / RESULT 污染的机制。

- [ ] tutorial/command-vs-expression.zh.md — 命令 vs 表达式
- [ ] tutorial/method-safe.zh.md — METHOD_SAFE
- [ ] tutorial/constant-folding.zh.md — 常量折叠
- [ ] tutorial/result-pollution.zh.md — RESULT 污染
- [ ] tutorial/expr-as-command.zh.md — 表达式函数作为命令

### Phase 10：第 10 章 高级主题

- [ ] tutorial/anti-patterns.zh.md — 反模式与常见错误

### Phase 11：更新 mkdocs.yml 导航

- [ ] 将新页面加入教程导航
- [ ] 调整教程子目录结构
- [ ] 确保日文/英文/中文三语言同步

---

## 5. 关键设计决策（待讨论）

### 5.1 教程页面是否应该独立于手册页面？

**方案 A**：教程页面是独立文件，引用手册页面链接
- 优点：教程有完整叙事线，不受手册结构约束
- 缺点：内容可能重复

**方案 B**：教程页面就是手册页面的导读版，只写手册缺失的部分
- 优点：无重复，维护成本低
- 缺点：教程不完整，需要频繁跳转

**建议**：方案 A，因为 ERABASIC 的特殊性（声明不可分割等）需要完整叙事。

### 5.2 eramaker 内容如何处理？

**建议**：eramaker 仅在"版本演进"章节中作为历史参考提及，
教程以 Emuera 为基线。eramaker 的 CSV_format.md 和 ERB_format.md
作为"历史兼容性参考"链接到教程中。

### 5.3 三语言同步策略

**建议**：先完成中文版教程，日文/英文版后续翻译。
因为中文版有知识库支撑，内容最完整。

---

> **最后更新**：2026-05-09
