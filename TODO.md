# emuera.em.doc 待办事项

> 本文件跟踪文档项目的所有待完成工作。完成的项目移至底部「已完成」区域。

---

## 🔴 高优先级

### 语法覆盖缺失

- [x] **赋值语句** — `A = 10`、`LOCALS '= "text"` 基本赋值语法无独立页面。eramaker 的 ERB_format.md 仅覆盖原始格式，Emuera 扩展部分（行连接 `{}`、`#` 预处理顺序等）分散在 expression.md 中。需要新建独立页面或在 expression.md 中补充。 → 2026-05-10 创建 tutorial/assignment.md / .zh.md / .en.md 三语言版本
- [x] **ERB 文件格式扩展** — eramaker/ERB_format.md 只覆盖了原始格式。Emuera 扩展部分（行连接 `{}`、`#DIM`/`#DIMS` 预处理、`#FUNCTION`/`#FUNCTIONS` 声明）需要独立文档或在现有页面中补充。 → 2026-05-10 创建 tutorial/erb-format-extension.md / .zh.md / .en.md 三语言版本
- [x] **事件函数** — @EVENTFIRST、@EVENTSHOP、@EVENTTRAIN 等事件触发机制无独立文档。function.md 中有部分提及但不完整。 → 2026-05-10 创建 tutorial/event-functions.md / .zh.md / .en.md 三语言版本
- [ ] **角色变量系统** — ABL/TALENT/MARK/EXP/PALAM 等角色二维变量的完整说明，目前分散在 variables.md 中，缺少系统性的独立说明。

### 教程首页完善

- [ ] **教程首页内容** — tutorial/index.md 目前是链接索引页，需要补充类似 runoob 的引导性文字（每个子节的一句话说明、学习建议、前置知识等）
- [ ] **教程首页中文版** — tutorial/index.zh.md 同上

### Skia 概要页完善

- [x] **Skia_Summary.md 内容验证** — 当前内容基于知识库中的特性列表，需要与源码交叉验证每个函数的实际签名和行为 → 2026-05-10 与 Changelog 交叉验证，修正 MAP 函数列表（9→6），增补 10+ 缺失功能章节
- [x] **Skia_Summary.zh.md 同步验证** → 2026-05-10 同步更新

---

## 🟡 中优先级

### 版本概要页改进

- [ ] **Reference 首页说明增强** — 已添加基本信息，但可以补充：按版本筛选说明、功能数量统计、与教程的导航关系图
- [x] **EMEE_Summary.md 中文版** — EMEE_Summary.zh.md 已存在
- [ ] **eramaker 概要页** — eramaker/README.md 内容较薄，可以补充与 Emuera 的差异要点

### 导航优化

- [ ] **教程子节排序** — 当前17个子节按主题组织，可以考虑按学习路径编号（01-基本文法、02-变量...），让左列导航更有层次感
- [ ] **教程与 Reference 的交叉链接** — 在教程各子节页面顶部添加"本节对应 Reference 分类：XXX"的提示

### DotNet 变体

- [ ] **DotNet 变体概要页** — 类似 Skia_Summary.md，为 EmueraDotNet 创建 DotNet/DotNet_Summary.md（SQLite、SkiaSharp、并行加载、G_POLYGON、多语言 resx 等）
- [ ] **DotNet_Summary.zh.md**

### HTML 语法手册

- [x] **HTML 标签语法手册** — 创建 tutorial/html-syntax.md / .zh.md / .en.md 三语言版本，整合原版与 EM+EE/DotNet/Skia 变体属性差异 → 2026-05-09
- [x] **教程索引更新** — 在 tutorial/index.md 和 index.zh.md 中添加 HTML 语法手册链接 → 2026-05-09
- [x] **mkdocs.yml 导航更新** — 在入出力分组中添加 html-syntax.md → 2026-05-09

---

## 🟢 低优先级

### 文档质量

- [ ] **CSV 定义与角色变量映射** — CSV 如何映射到角色变量（NAME→NAME:0、ABL→ABL:0:2 等），无完整说明
- [ ] **STR/TALENT 等 CSV 定义** — CSV 文件的完整字段说明
- [ ] **eramaker 语法覆盖** — eramaker 已有但 Emuera 未变更的语法，确保教程中有标注

### 构建与部署

- [ ] **mkdocs serve 热重载验证** — 确认 `mkdocs serve` 在本分支上正常工作
- [ ] **CI/CD 适配** — 如果上游使用 GitHub Pages / GitLab Pages，确认新导航结构兼容

---

## ✅ 已完成

- [x] 重构 mkdocs.yml 导航：教程为主入口（类 runoob 架构），四个概要归组到「仕様概要」，Reference 保持 API 手册
- [x] 创建 Skia/Skia_Summary.md 概要页（日文+中文） → 2026-05-09 保留 Summary 作为主条目（原始手册），删除 index.md
- [x] 教程拆分为子目录，获得左列导航 + 右列 TOC
- [x] 修复教程页 hide 设置，启用左列导航+右列 TOC
- [x] 补充 i18n nav_translations：教程相关、仕様概要等（日/英/中三语）
- [x] Reference/README.md 顶部添加说明文字
- [x] .gitignore 添加 /site（mkdocs 构建输出）
- [x] README.md 修复教程链接（tutorial.md → tutorial/index.md）
- [x] mkdocs build 验证通过，无 WARNING
