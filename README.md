# Release page

> **Emuera-SKIA 帮助手册** — 基于 [emuera.em.doc](https://gitlab.com/EvilMask/emuera.em.doc) 派生的 SkiaSharp 版本文档。

| [日本語](https://emuera-sk-doc-705c3d.gitgud.site/index.html) | [English](https://emuera-sk-doc-705c3d.gitgud.site/en/index.html) | [简体中文](https://emuera-sk-doc-705c3d.gitgud.site/zh/index.html) |
| :-------------------------------------------------------------: | :-----------------------------------------------------------------: | :------------------------------------------------------------------: |

# Contribute guide

1. Fork and clone this repository.
2. Edit `.md` files for your language, by adding lang-code.
    
    For example:
    | Default(ja) | English(en)  | Chinese(zh)  |
    | ----------- | ------------ | ------------ |
    | README.md   | README.en.md | README.zh.md |
4. Commit to your forked repository and make a pull request.
    
        Note: Your don't neet to change and link that link to the internal file, like
        changing [`REGEXPMATCH`](./REGEXPMATCH.md) into [`REGEXPMATCH`](./REGEXPMATCH.en.md)
        the mkdocs will handle it automatically. Just simply add a `REGEXPMATCH.en.md` into
        the folder.

# Preview on local machine

1. Prepare a Python environment.
2. Open a terminal in the repository root folder.
3. Install dependencies:
    ``` bash
    pip install mkdocs
    pip install mkdocs-material
    pip install mkdocs-minify-plugin
    pip install mkdocs-static-i18n
    ```
    If you want to make an offline build, you should additionally install:
    ``` bash
    pip install mkdocs-minify-plugin
    ```
    The versions of the latest building environment are:
    | Name                       | Version |
    | -------------------------- | ------- |
    | Python                     | 3.12.2  |
    | mkdocs                     | 1.5.3   |
    | mkdocs-material            | 9.5.13  |
    | mkdocs-material-extensions | 1.3.1   |
    | mkdocs-minify-plugin       | 0.8.0   |
    | mkdocs-static-i18n         | 1.2.2   |

4. Run the command to build and start local server:

    ``` bash
    mkdocs serve
    ```
5. Preview in the browser. (The default URL should be http://127.0.0.1:8000/)

