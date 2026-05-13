# ERABASIC 教程架构重构 — 待办清单

> **目标**：将 emuera.em.doc 的教程重构为渐进式学习体系，整合手册内容和知识库洞见。

---

## 0. 设计原则

### 0.1 ERABASIC 的特殊性

| 维度 | 主流语言 | ERABASIC |
|------|---------|----------|
| 类型系统 | 编译期静态类型 | 运行期三类型（Int/Str/Float），标识符字典注册制 |
| 函数声明 | 签名即声明 | **签名引用 + 体内声明**（不可分割） |
| 变量声明 | 随处声明 | #DIM 必须在 @ 标签行之后、执行语句之前（预处理行规则） |
| 事件驱动 | 框架回调 | 内置事件函数（@EVENT_*），引擎自动调用 |

### 0.2 教程 vs 手册 vs 参考

| 层级 | 定位 | 对应 mkdocs 导航 |
|------|------|-----------------|
| **教程** | "怎么学" — 渐进式学习路径 | `チュートリアル` |
| **手册** | "怎么理解" — 概念与规格说明 | `仕様概要` |
| **参考** | "怎么用" — API 签名速查 | `リファレンス` |

### 0.3 知识库中有但手册中缺失的内容

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

## 1. 教程章节架构（6章）

> **核心区分**：第1–4章是**语言语法**（IF/REPEAT/CALL），第5章是**引擎特性**（状态机/事件/角色），第6章是**渲染特性**。

```
教程首页 (tutorial/index.zh.md / index.md)
│
├── 第1章：简介 🔴 必读 — 理解全貌，运行第一个程序
│   ├── intro.zh.md              ✅ 已完成
│   ├── hello-world.zh.md        ✅ 已完成
│   ├── file-types.zh.md         ✅ 已完成
│   ├── line-types.zh.md         ✅ 已完成
│   └── evolution.zh.md          ✅ 已完成
│
├── 第2章：基础语法 🔴 必读 — 值与变量，基本输入输出
│   ├── values-types.zh.md       ✅ 已完成
│   ├── assignment.zh.md         ✅ 已完成
│   ├── basic-output.zh.md       ✅ 已完成
│   └── form-syntax.zh.md        ✅ 已完成
│
├── 第3章：控制流 🔴 必读 — 条件、循环、跳转
│   ├── condition.zh.md          ✅ 已完成
│   ├── loop.zh.md               ✅ 已完成
│   └── jump.zh.md               ✅ 已完成
│
├── 第4章：函数 🔴 必读 — 拆分代码，声明数据
│   ├── call.zh.md               ✅ 已完成（含参数传递、返回值、INPUT、RETURN/RETURNF 对比）
│   ├── variable-declaration.zh.md ✅ 已完成（含 #DIM/作用域/REF·OUT/VARIADIC）
│   ├── erb-format-extension.zh.md ✅ 已完成
│   └── command-vs-expression.zh.md ✅ 已完成
│
├── 第5章：引擎特性 🟡 推荐 — 引擎内置运行时机制
│   ├── system-flow.zh.md        ✅ 已完成（两状态模型、BEGIN、各状态流程）
│   ├── event-functions.zh.md    ✅ 已完成（含 BEFORE_THROW/BEFORE_ERROR）
│   └── character-variables.zh.md ✅ 已完成（角色编号、角色变量分类、管理指令、CSV 定义、自定义变量）
│
└── 第6章：HTML与图形 🟢 选读 — 富文本与渲染
    └── html-syntax.zh.md        ✅ 已完成
```

---

## 2. 页面文件清单与多语言状态

> 文件命名规范：日文 `.md`、中文 `.zh.md`、英文 `.en.md`

### 2.1 教程页面

| 页面 | 日文 .md | 中文 .zh.md | 英文 .en.md |
|------|:--------:|:-----------:|:-----------:|
| index | ✅ | ✅ | ✅ |
| intro | ✅ | ✅ | ✅ |
| hello-world | ✅ | ✅ | ✅ |
| file-types | ✅ | ✅ | ✅ |
| line-types | ✅ | ✅ | ✅ |
| evolution | ✅ | ✅ | ✅ |
| values-types | ✅ | ✅ | ✅ |
| assignment | ✅ | ✅ | ✅ |
| basic-output | ✅ | ✅ | ✅ |
| form-syntax | ✅ | ✅ | ✅ |
| condition | ✅ | ✅ | ✅ |
| loop | ✅ | ✅ | ✅ |
| jump | ✅ | ✅ | ✅ |
| call | ✅ | ✅ | ✅ |
| variable-declaration | ✅ | ✅ | ✅ |
| erb-format-extension | ✅ | ✅ | ✅ |
| event-functions | ✅ | ✅ | ✅ |
| command-vs-expression | ✅ | ✅ | ✅ |
| system-flow | ✅ | ✅ | ✅ |
| character-variables | ✅ | ✅ | ✅ |
| html-syntax | ✅ | ✅ | ✅ |

### 2.1b 高级教程页面（第6章）

| 页面 | 日文 .md | 中文 .zh.md | 英文 .en.md | 备注 |
|------|:--------:|:-----------:|:-----------:|------|
| dynamic-reflection | ✅ | ✅ | ✅ | 动态解析与反射演进：RETURNFORM→EVAL→CALLFORM→CALLSTR→变量反射→ALS别名（含字符串赋值 `'=` 修复） |
| runtime-mechanics | ❌ | ❌ | ❌ | 运行时机制：ConvertArg→SetTransporter→IntoFunction |
| anti-patterns | ❌ | ❌ | ❌ | 反模式与常见错误 |

### 2.2 引擎特性章节引用的规格页

| 页面 | 日文 .md | 中文 .zh.md | 英文 .en.md | 备注 |
|------|:--------:|:-----------:|:-----------:|------|
| Emuera/system_flow | ✅ | ✅ | ✅ | 日文版缺 BEFORE_THROW/BEFORE_ERROR 段落 |
| Emuera/variables | ✅ | ✅ | ❌ | — |

---

## 3. 实施步骤

### Phase 1：第1–4章内容 ✅ 全部完成

所有语言语法相关的教程页面已创建（日文+中文），部分有英文版。

### Phase 2：第5章引擎特性 — 结构搭建 ✅ 已完成

- [x] 教程首页新增第5章「引擎特性」（index.zh.md / index.md）
- [x] 事件函数从第4章移至第5章
- [x] 角色系统合并为第5章「角色变量」
- [x] mkdocs.yml 新增「エンジン特性」导航组
- [x] Skia_Summary.zh.md 链接修复（BEFORE_THROW/BEFORE_ERROR）
- [x] Skia_Summary.md（日文版）补充条目和段落
- [x] event-functions 三语言版添加显式锚点

### Phase 3：第5章引擎特性 — 教程页补全 ✅ 已完成

- [x] **system-flow 教程页** `tutorial/system-flow.zh.md` + `.md` + `.en.md`：三语言版已创建
- [x] **character-variables 教程页** `tutorial/character-variables.zh.md` + `.md` + `.en.md`：三语言版已创建
- [ ] **system_flow.md（日文版）补充 BEFORE_THROW/BEFORE_ERROR 流程段落**：中文版和英文版已有
- [ ] **system_flow 三语言版添加反向链接**：从流程图事件节点链接到 event-functions 教程页

### Phase 3.5：教程首页引导性内容 ✅ 已完成

- [x] **index.zh.md** — 添加必读/推荐/选读标记、前置知识、本章要点
- [x] **index.md** — 同步日文版引导性内容

### Phase 4：多语言同步 ✅ 已完成

- [x] 创建 index.en.md（英文版教程首页）
- [x] 补全缺失的 .en.md 文件（见 §2.1 表格中 ❌ 项）— 12 个页面已翻译
- [ ] 三语言交叉引用链接一致性检查

### Phase 5：进阶内容（第6章高级教程）🟡 部分完成

> 以下内容需要从源码中提取洞见，优先级较低。

- [x] **tutorial/dynamic-reflection** — 动态解析与反射演进（三语言版全部完成并注册到导航）
  - [x] 6.1 第一代固定映射：CSVNAME/GETCHARA/GETPALAMLV
  - [x] 6.2 第二代名称反查：GETNUM/RETURNFORM/CALLFORM
  - [x] 6.3 第三代变量反射：EXISTVAR/GETVAR/GETVARS/SETVAR/ENUM*/ERDNAME/GETCSVNOBY*
  - [x] 6.4 第四代通用求值：EVAL/EVALS/EVALF/CALLSTR/ALS修复
  - [x] 6.5 反射能力演进总表：从静态编译到运行时动态的逐步解放
  - [x] 字符串赋值 `'=` 语法审查与修复（含 EVAL 参考页三语言同步修正）
- [ ] **tutorial/runtime-mechanics.zh.md** — 运行时机制（ConvertArg→SetTransporter→IntoFunction）
- [ ] **tutorial/anti-patterns.zh.md** — 反模式与常见错误

### Phase 6：mkdocs.yml 导航更新 🟡 部分完成

- [x] 新建教程页加入导航（dynamic-reflection.md 已添加到「関数」章节）
- [ ] 调整教程子目录结构
- [x] 确保三语言同步（dynamic-reflection 三语言版本导航注册一致）

---

## 4. 关键设计决策

### 4.1 教程页面独立于手册页面

采用方案 A：教程页面是独立文件，引用手册页面链接。
ERABASIC 的特殊性（声明不可分割等）需要完整叙事，不适合只做导读版。

### 4.2 eramaker 内容处理

eramaker 仅在"版本演进"章节中作为历史参考提及，教程以 Emuera 为基线。

### 4.3 三语言同步策略

先完成中文版教程，日文/英文版后续翻译。中文版有知识库支撑，内容最完整。

### 4.4 引擎特性 vs 语言语法

第5章「引擎特性」与第1–4章「语言语法」是不同维度：
- 语言语法：IF/REPEAT/CALL/#DIM — 开发者主动编写的结构
- 引擎特性：状态机/事件函数/角色变量 — 引擎预设的调度机制，开发者只需挂载钩子

### 4.5 教程首页引导体系

采用三级标记系统：
- 🔴 必读：核心章节，不掌握则无法编写正常脚本（第1–4章）
- 🟡 推荐：实用章节，掌握后可显著提升开发效率（第5章）
- 🟢 选读：进阶章节，按需学习（第6章）

每个章节标注**前置知识**和**本章要点**，帮助非顺序读者快速定位。

---

## 5. 变更日志

| 日期 | 变更 |
|------|------|
| 2026-05-12 | 新增第6章高级教程规划：dynamic-reflection（中文版已创建）、runtime-mechanics、anti-patterns；修复 RETURNFORM 文档（三语言版）：明确两阶段求值机制和整数返回限制；新增 §2.1b 高级教程页面进度表 |
| 2026-05-12 | Phase 4 多语言同步完成：补全 12 个缺失的 .en.md 文件（index/intro/hello-world/file-types/line-types/evolution/values-types/basic-output/condition/loop/jump/call/command-vs-expression）；修正 values-types 和 variable-declaration 的 .en.md 状态（此前已存在但误标为 ❌） |
| 2026-05-12 | 教程首页添加引导性内容：必读/推荐/选读标记、前置知识、本章要点（index.zh.md + index.md）；角色变量系统确认完成（三语言版）；整理 TODO 结构 |
| 2026-05-11 | 重构为6章架构：新增第5章「引擎特性」，事件函数从第4章移出，角色系统合并；修复 BEFORE_THROW/BEFORE_ERROR 链接和锚点；mkdocs.yml 新增エンジン特性导航组 |
| 2026-05-09 | 初始版本：10章架构、Phase 1–5 完成 |

---

> **最后更新**：2026-05-12
