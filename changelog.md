# emuera.em.doc 变更日志

> 本文件记录文档项目的历史变更、设计原则和架构决策。

---

## 设计原则

### ERABASIC 的特殊性

| 维度 | 主流语言 | ERABASIC |
|------|---------|----------|
| 类型系统 | 编译期静态类型 | 运行期三类型（Int/Str/Float），标识符字典注册制 |
| 函数声明 | 签名即声明 | **签名引用 + 体内声明**（不可分割） |
| 变量声明 | 随处声明 | #DIM 必须在 @ 标签行之后、执行语句之前（预处理行规则） |
| 事件驱动 | 框架回调 | 内置事件函数（@EVENT_*），引擎自动调用 |

### 教程 vs 手册 vs 参考

| 层级 | 定位 | 对应 mkdocs 导航 |
|------|------|-----------------|
| **教程** | "怎么学" — 渐进式学习路径 | `チュートリアル` |
| **手册** | "怎么理解" — 概念与规格说明 | `仕様概要` |
| **参考** | "怎么用" — API 签名速查 | `リファレンス` |

### 关键设计决策

1. **教程页面独立于手册页面** — 教程是独立文件，引用手册链接。ERABASIC 的特殊性需要完整叙事，不适合只做导读版。
2. **eramaker 内容处理** — 仅在"版本演进"章节中作为历史参考提及，教程以 Emuera 为基线。
3. **三语言同步策略** — 先完成中文版教程，日文/英文版后续翻译。中文版有知识库支撑，内容最完整。
4. **引擎特性 vs 语言语法** — 第5章「引擎特性」与第1–4章「语言语法」是不同维度：语言语法是开发者主动编写的结构，引擎特性是引擎预设的调度机制。
5. **教程首页引导体系** — 三级标记：🔴 必读（第1–4章）、🟡 推荐（第5章）、🟢 选读（第6–7章）。每个章节标注前置知识和本章要点。

---

## 教程架构

```
教程首页 (tutorial/index.zh.md / index.md)
│
├── 第1章：简介 🔴 必读
│   ├── intro / hello-world / file-types / line-types / evolution
│
├── 第2章：基础语法 🔴 必读
│   ├── values-types / assignment / basic-output / form-syntax
│
├── 第3章：控制流 🔴 必读
│   ├── condition / loop / jump
│
├── 第4章：函数 🔴 必读
│   ├── call / variable-declaration / erb-format-extension / command-vs-expression
│
├── 第5章：引擎特性 🟡 推荐
│   ├── system-flow / event-functions / character-variables
│
├── 第6章：HTML与图形 🟢 选读
│   ├── html-syntax / resources
│
└── 第7章：高级主题 🟢 选读
    ├── dynamic-reflection / runtime-mechanics / method-safety / constant-folding
```

---

## 实施历史

### Phase 1–3：基础架构（2026-05-09 ~ 05-10）

- mkdocs.yml 导航重构：教程为主入口，四个概要归组到「仕様概要」，Reference 保持 API 手册
- 第1–4章教程页面创建（日文+中文）
- 第5章引擎特性结构搭建：事件函数从第4章移出，角色系统合并
- system-flow / character-variables 教程页补全（三语言版）
- system_flow 规格页补充 BEFORE_THROW/BEFORE_ERROR + 反向链接
- HTML 标签语法手册（三语言版）
- Skia/EMEE 概要页创建

### Phase 3.5–4：引导与多语言同步（2026-05-12）

- 教程首页添加必读/推荐/选读标记、前置知识、本章要点
- 角色变量系统教程页（三语言版）
- Phase 4 多语言同步：补全 12 个 .en.md 文件
- 三语言交叉引用链接一致性检查：全目录修复约2500+链接
- SQL_READER_GET_STRING FORM 语法修复（9 文件）
- 函数手册页返回值标注统一（33 文件）
- CALL/JUMP 系列返回值标注统一 + JUMP RESULT 行为补充
- CSV→变量映射补充 + eramaker 语法覆盖标注
- Reference 首页说明增强：教程↔Reference 对应关系表

### Phase 5–5.6：进阶内容与资源文档（2026-05-15 ~ 05-22）

- 第7章高级主题：dynamic-reflection / runtime-mechanics（三语言版）
- anti-patterns 教程页移除，内容保留在知识库
- 章节编号统一：移除"第N章："前缀
- 导航标签翻译：「高度なトピック」→ 中文「高级主题」/ 英文「Advanced Topics」
- html-syntax 新增资源设置小节（Skia 懒加载/SharedBitmapCache/AnimSpriteCache）
- Emuera/resources 标注历史文档 + Skia 特性变更注释
- 资源设置独立教程页：tutorial/resources 三语言版
- METHOD_SAFE / 常量折叠进阶主题：method-safety + constant-folding 三语言版
- RESULT 污染：已在 command-vs-expression 教程页中覆盖

---

## 变更日志

| 日期 | 变更 |
|------|------|
| 2026-05-22 | METHOD_SAFE / 常量折叠进阶主题三语言版；资源设置独立教程页；anti-patterns 移除；章节编号统一；导航标签翻译；Emuera/resources 标注历史文档 |
| 2026-05-15 | 第7章高级主题三语言版（runtime-mechanics、dynamic-reflection）；mkdocs.yml 导航更新 |
| 2026-05-12 | Phase 4 多语言同步（12 个 .en.md + 2500+ 链接修复）；函数手册页返回值标注统一；角色变量系统；CSV→变量映射；eramaker 语法覆盖 |
| 2026-05-10 | 赋值语句 / ERB 文件格式扩展 / 事件函数教程页（三语言版）；Skia_Summary 验证 |
| 2026-05-09 | 项目初始化：mkdocs.yml 导航重构、教程拆分、i18n 配置；HTML 标签语法手册；Skia/EMEE 概要页 |
