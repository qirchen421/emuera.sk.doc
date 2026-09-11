---
alwaysApply: true
---

# Project Rules — emuera.em.doc-1（L2 薄壳）

> 本文件是 **Trae 侧的文档站薄壳**；DSH 侧同构入口为仓库根 `AGENTS.md`，两份内容同构、互相指认。
> **集群通用规范不在本文件维护**，指向 L1 正本：`D:\emuera\shared-trae\AGENTS.md` ＋ `knowledge\meta\**`。
> 分层模型：`D:\emuera\shared-trae\knowledge\meta\instruction-layering.md`。

## 本仓特有规则

1. **三语言同步（强制）**：改任意语言版必须同步其余两版。

   | 语言 | 后缀 |
   |------|------|
   | 日语（默认） | `.md` |
   | 中文 | `.zh.md` |
   | 英语 | `.en.md` |

   同步范围：`Skia/Skia_Summary.*`、`Skia/CHANGELOG.*`、`EMEE/EMEE_Summary.*`、`EMEE/CHANGELOG.*`、`Reference/README.*`、`Reference/<FunctionName>.*`。
   译后必须更新交叉引用链接（日文→`.md`、中文→`.zh.md`、英文→`.en.md`）；细则见 [mkdocs-i18n.md](file:///d:/emuera/shared-trae/knowledge/doc-building/mkdocs-i18n.md)。
2. **CJK 标题必须显式锚点**：中文/日文自动 slug 会生成 `_1` 之类编号锚点，必须用 `{ #custom-id }` 指定，且三语言使用相同锚点 ID。
3. **Changelog 权威位置**：
   - `EMEE/CHANGELOG.*` —— **当前权威位置**（MkDocs 实际访问）。
   - `Changelog/README.*` —— 上游旧位置；收到上游更新后翻译并同步进 `EMEE/`。
   - Skia 变体源文件在引擎仓：`emuera_lazyloading_selfmodified_version/CHANGELOG.md` → 同步到 `docs/skia/CHANGELOG.*`。
4. **分支策略**：`master` 接收上游更新（生产部署），`feature/*` 开发（预览部署）；**master 不直接开发**；feature 分支需同步更新 `.gitlab-ci.yml` 的 `rules`。
5. **教程示例代码用 ERABASIC 真语法**：`%变量%` 是字符串替换、`{表达式}` 是整数插值，**禁止 `{字符串变量}`**（不展开）。见 [form-syntax.md](file:///d:/emuera/shared-trae/knowledge/erabasic/form-syntax.md)。

> 完整清单与全部链接见仓库根 `AGENTS.md`（同构）。
