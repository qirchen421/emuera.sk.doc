# Project Rules — emuera.em.doc-1

## 项目类型

Emuera 文档项目（MkDocs + mkdocs-i18n 多语言站点），非代码项目。

## 通用语言与技能

通用语言：[CONTEXT.md](file:///d:/emuera/shared-trae/CONTEXT.md)
技能有效性反馈：[SKILL-EFFECTIVENESS-LOG.md](file:///d:/emuera/shared-trae/skills/SKILL-EFFECTIVENESS-LOG.md)

### 默认技能

| 技能 | 激活条件 |
|------|---------|
| **doc-building** | 文档翻译、创建页面、修复链接、更新导航 |
| **erabasic** | ERABASIC 语法确认、API 签名查阅；**编写教程示例代码时（强制）**；`%变量%` 是字符串替换，`{表达式}` 是整数插值，禁止 `{字符串变量}` |
| **powershell-git** | 终端命令、Git 操作 |
| **knowledge-builder** | 发现新洞见时 |

### 辅助技能

| 技能 | 激活条件 |
|------|---------|
| **grill-with-docs** | 对齐教程结构、术语锐化 |
| **caveman** | 长翻译会话节省 token |
| **handoff** | 结束会话、交接翻译进度 |

## 多语言同步规则

> 修改任意语言版时必须同步更新其余两版。

| 语言 | 后缀 |
|------|------|
| 日语（默认） | `.md` |
| 中文 | `.zh.md` |
| 英语 | `.en.md` |

同步范围：`Skia/Skia_Summary.*`、`EMEE/EMEE_Summary.*`、`Reference/README.*`、`Reference/<FunctionName>.*`

流程：确认语言版本 → 检查其他语言版本是否存在 → **同时修改所有版本**

## Changelog 同步规则

> 上游 `Changelog/README.md` 已被移动到子栏目 `EMEE/CHANGELOG.md`。
> **当前权威位置为 `EMEE/CHANGELOG.*`**。上游更新时需同步。

| 文件 | 作用 | 同步方向 |
|------|------|---------|
| `Changelog/README.*` | 上游旧位置（可能不再更新） | 接收上游后 → 同步到 EMEE |
| `EMEE/CHANGELOG.*` | **当前权威位置**，MkDocs 实际访问 | 主编辑位置 |

同步流程：
1. 上游 `Changelog/README.en.md` 更新 → 翻译后更新 `Changelog/README.md` + `README.zh.md`
2. 将更新同步到 `EMEE/CHANGELOG.md` + `CHANGELOG.en.md` + `CHANGELOG.zh.md`
3. 三语言必须全部同步

## Git 分支策略

| 分支 | 用途 | CI |
|------|------|-----|
| `master` | 接收上游更新 | 生产部署 |
| `feature/*` | 开发工作 | 预览部署 |

约束：master 不直接开发；feature 分支需同步更新 `.gitlab-ci.yml` 的 `rules`
