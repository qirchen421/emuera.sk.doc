# Project Rules — emuera.em.doc-1

## 项目类型

Emuera 文档项目（MkDocs + mkdocs-i18n 多语言站点），非代码项目。

---

## 知识库与技能架构

本项目使用三层知识管理架构，skills 和 knowledge 通过符号链接共享：

1. **Skill 层（路由）**：`.trae/skills/` → 符号链接到 `D:\emuera\shared-trae\skills\`
2. **Knowledge 层（知识库）**：`.trae/knowledge/` → 符号链接到 `D:\emuera\shared-trae\knowledge\`
3. **Meta 层（方法论）**：`knowledge-builder` skill — 如何积累知识

### 默认技能激活规则

| 技能 | 激活条件 | 说明 |
|------|---------|------|
| **doc-building** | 任何涉及文档翻译、创建页面、修复链接、更新导航的操作 | 文档建设路由，包含 mkdocs-i18n 多语言规范 |
| **erabasic** | 涉及 ERABASIC 语法内容确认、API 签名查阅时 | 确认文档描述的 ERB 语法正确性 |
| **powershell-git** | 任何涉及终端命令、Git 操作、文件 IO 的操作 | 终端命令避坑，Git 操作规范 |
| **knowledge-builder** | 发现新洞见、需要持久化知识时 | 元方法论，指导知识积累流程 |

---

## 多语言版本同步规则

> **所有文档页面存在三语言版本（日语/中文/英语），修改任意语言版时必须同步更新其余两版。**

### 文件命名约定

| 语言 | 文件名后缀 |
|------|-----------|
| 日语（默认） | `.md`（无后缀） |
| 中文 | `.zh.md` |
| 英语 | `.en.md` |

### 同步义务清单

修改以下任一文件时，必须同步更新同目录下的语言对应文件：

**主页/概要页**：

| 日语 | 中文 | 英语 |
|------|------|------|
| `Skia/Skia_Summary.md` | `Skia/Skia_Summary.zh.md` | — |
| `EMEE/EMEE_Summary.md` | `EMEE/EMEE_Summary.zh.md` | `EMEE/EMEE_Summary.en.md` |

**函数索引表**：

| 日语 | 中文 | 英语 |
|------|------|------|
| `Reference/README.md` | `Reference/README.zh.md` | `Reference/README.en.md` |

**函数手册页**：

| 日语 | 中文 | 英语 |
|------|------|------|
| `Reference/<FunctionName>.md` | `Reference/<FunctionName>.zh.md` | `Reference/<FunctionName>.en.md` |

### 同步操作流程

1. 确认要修改的文件的语言版本
2. 检查同目录下是否存在其他语言版本文件
3. **同时修改所有语言版本**，确保内容一致
4. 特别注意：日语为默认语言（无后缀），修改 `.md` 文件时务必检查 `.zh.md` 和 `.en.md`

---

## 概要页重复问题处理（已解决）

**Skia 和 EM+EE 变体的问题已于 2026-05-09 实施解决**：

- **问题**：`Skia/Skia_Summary.*` / `EMEE/EMEE_Summary.*`（Summary 文件）与 `Skia/index.*` / `EMEE/index.*`（index 文件）互为副本，两文件需完全同步但无自动化机制。
- **根因**：Summary 文件才是原始手册（先于 index 文件存在），index 文件是后来为了 mkdocs.yml nav 路径而创建的副本。
- **解决方案**：保留 Summary 文件（原始手册），删除 index 文件，nav 改为指向 `Skia/Skia_Summary.md` 和 `EMEE/EMEE_Summary.md`。外链原本就指向 Summary 文件，无需修改。
- **涉及修改的文件**：仅 `mkdocs.yml`（nav 路径）和 `project_rules.md`（同步清单）。无需修改任何外链。
