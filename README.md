| [日本語](README.ja.md) | [English](README.en.md) | [简体中文](README.md) |
| :---: | :---: | :---: |

# [Release page](https://qirchen421.github.io/emuera.sk.doc/index.html)

> **[Emuera-SKIA 帮助手册](https://qirchen421.github.io/emuera.sk.doc/index.html)** — 基于 [emuera.em.doc](https://gitlab.com/EvilMask/emuera.em.doc) 派生的 SkiaSharp 版本文档。

| [日本語](https://qirchen421.github.io/emuera.sk.doc/index.html) | [English](https://qirchen421.github.io/emuera.sk.doc/en/index.html) | [简体中文](https://qirchen421.github.io/emuera.sk.doc/zh/index.html) |
| :---: | :---: | :---: |

# 贡献指南

1. Fork 并克隆本仓库。
2. 编辑你所使用语言的 `.md` 文件，为其加上对应的语言代码后缀。

    例如：
    | 默认(ja) | English(en)  | 中文(zh)     |
    | ----------- | ------------ | ------------ |
    | README.md   | README.en.md | README.zh.md |
3. 提交到你 fork 的仓库，并创建 pull request。

    ```
    注意：指向仓库内部文件的链接无需改写，例如把
    [`REGEXPMATCH`](./REGEXPMATCH.md) 改成 [`REGEXPMATCH`](./REGEXPMATCH.en.md)，
    mkdocs 会自动处理。只需把 `REGEXPMATCH.en.md` 放进同一目录即可。
    ```

# 本地预览

1. 准备 Python 环境。
2. 在仓库根目录打开终端。
3. 安装依赖：
    ``` bash
    pip install mkdocs
    pip install mkdocs-material
    pip install mkdocs-minify-plugin
    pip install mkdocs-static-i18n
    ```
    若需要离线构建，还应额外安装：
    ``` bash
    pip install mkdocs-minify-plugin
    ```
    最新构建环境所用版本如下：
    | 名称                       | 版本    |
    | -------------------------- | ------- |
    | Python                     | 3.12.2  |
    | mkdocs                     | 1.5.3   |
    | mkdocs-material            | 9.5.13  |
    | mkdocs-material-extensions | 1.3.1   |
    | mkdocs-minify-plugin       | 0.8.0   |
    | mkdocs-static-i18n         | 1.2.2   |

4. 运行以下命令构建并启动本地服务器：

    ``` bash
    mkdocs serve
    ```
5. 在浏览器中预览。（默认地址应为 http://127.0.0.1:8000/）
