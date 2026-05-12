# emuera.em.doc 待办事项

> 本文件跟踪文档项目的所有待完成工作。完成的项目移至底部「已完成」区域。

---

## 🔴 高优先级

> 无剩余高优先级任务。

---

## 🟡 中优先级

### Reference 索引一致性

- [ ] **函数手册页返回值标注统一** — README 三语言版已统一 CALL/JUMP 系列为 `void`¹，但部分函数手册详情页（如 CALL.md / JUMP.md 的返回值字段）仍需同步更新为 `void`¹

### 版本概要页改进

- [x] **Reference 首页说明增强** — 已添加教程↔Reference 对应关系表（三语言版）
- ~~**eramaker 概要页** — eramaker/README.md 内容较薄，可以补充与 Emuera 的差异要点~~ → 放弃：eramaker 差异已在各教程页的 eramaker 互換性注记中覆盖，无需单独概要页

### 导航优化

- [ ] **教程与 Reference 的交叉链接** — 在教程各子节页面顶部添加"本节对应 Reference 分类：XXX"的提示

### 多语言同步

- [ ] **创建 index.en.md** — 英文版教程首页
- [ ] **补全缺失的 .en.md 文件** — 见 tutorial/todo.md §2.1 表格中 ❌ 项
- [ ] **system_flow.md（日文版）补充 BEFORE_THROW/BEFORE_ERROR 流程段落** — 中文版和英文版已有
- [ ] **system_flow 三语言版添加反向链接** — 从流程图事件节点链接到 event-functions 教程页

---

## 🟢 低优先级

### 文档质量

- [x] **CSV 定义与角色变量映射** — character-variables 三语言版和 CSV_format 三语言版已补充完整映射表
- [x] **STR/TALENT 等 CSV 定义** — CSV_format 三语言版已补充 CSV→名称变量映射关系
- [x] **eramaker 语法覆盖** — 6 个核心教程页（condition/loop/call/basic-output/assignment/character-variables）三语言版已添加 eramaker 互換性注记

### 进阶内容

- [ ] **tutorial/runtime.zh.md** — 运行时机制（ConvertArg→SetTransporter→IntoFunction）
- [ ] **tutorial/anti-patterns.zh.md** — 反模式与常见错误
- [ ] **METHOD_SAFE / 常量折叠 / RESULT 污染** 等进阶主题

### 构建与部署

- [ ] **mkdocs serve 热重载验证** — 确认 `mkdocs serve` 在本分支上正常工作
- [ ] **CI/CD 适配** — 如果上游使用 GitHub Pages / GitLab Pages，确认新导航结构兼容

---

## ✅ 已完成

### 2026-05-12

- [x] **SQL_READER_GET_STRING FORM 语法修复** — 9 个文件（三语言版）将 `{SQL_READER_GET_STRING(...)}` 修正为 `%SQL_READER_GET_STRING(...)%`
- [x] **函数手册页返回值标注统一** — 33 个文件（11 函数 × 3 语言）统一为 `void`¹
- [x] **CSV→变量映射补充** — character-variables 和 CSV_format 三语言版添加完整映射表
- [x] **eramaker 语法覆盖标注** — 6 个核心教程页三语言版添加 eramaker 互換性注记
- [x] **Reference 首页说明增强** — README 三语言版添加教程↔Reference 对应关系表
- [x] **角色变量系统** — 创建 tutorial/character-variables.md / .zh.md / .en.md 三语言版，系统性独立说明 ABL/TALENT/MARK/EXP/PALAM 等角色二维变量
- [x] **教程首页引导性内容** — tutorial/index.md 和 index.zh.md 补充必读/推荐/选读标记、前置知识、本章要点
- [x] **CALL/JUMP 系列返回值标注统一** — README 三语言版统一为 `void`¹，添加返回值标注说明
- [x] **JUMP 详情页补充 RESULT 行为** — JUMP.md / .zh.md / .en.md 补充 JUMP 与 RESULT 关系说明
- [x] **教程函数章节补充 RETURN/RETURNF 对比** — call.zh.md / call.md 补充命令函数 vs 表达式函数的 RESULT 行为差异

### 2026-05-10

- [x] **赋值语句** — 创建 tutorial/assignment.md / .zh.md / .en.md 三语言版本
- [x] **ERB 文件格式扩展** — 创建 tutorial/erb-format-extension.md / .zh.md / .en.md 三语言版本
- [x] **事件函数** — 创建 tutorial/event-functions.md / .zh.md / .en.md 三语言版本
- [x] **Skia_Summary.md 内容验证** — 与 Changelog 交叉验证，修正 MAP 函数列表（9→6），增补 10+ 缺失功能章节
- [x] **Skia_Summary.zh.md 同步验证**

### 2026-05-09

- [x] 重构 mkdocs.yml 导航：教程为主入口（类 runoob 架构），四个概要归组到「仕様概要」，Reference 保持 API 手册
- [x] 创建 Skia/Skia_Summary.md 概要页（日文+中文） — 保留 Summary 作为主条目（原始手册），删除 index.md
- [x] 教程拆分为子目录，获得左列导航 + 右列 TOC
- [x] 修复教程页 hide 设置，启用左列导航+右列 TOC
- [x] 补充 i18n nav_translations：教程相关、仕様概要等（日/英/中三语）
- [x] Reference/README.md 顶部添加说明文字
- [x] .gitignore 添加 /site（mkdocs 构建输出）
- [x] README.md 修复教程链接（tutorial.md → tutorial/index.md）
- [x] mkdocs build 验证通过，无 WARNING
- [x] **HTML 标签语法手册** — 创建 tutorial/html-syntax.md / .zh.md / .en.md 三语言版本
- [x] **教程索引更新** — 在 tutorial/index.md 和 index.zh.md 中添加 HTML 语法手册链接
- [x] **mkdocs.yml 导航更新** — 在入出力分组中添加 html-syntax.md
- [x] **EMEE_Summary.md 中文版** — EMEE_Summary.zh.md 已存在
