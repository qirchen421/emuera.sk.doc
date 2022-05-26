# Contribute guide

1. Fork and clone this repository.
2. Edit `.md` files for your language, by adding lang-code.
    
    For example:
    | Default(ja)   | English(en)   | Chinese(zh)   |
    | ---           | ---           | ---           |
    | README.md     | README.en.md  | README.zh.md  |
4. Commit to your forked repository and make a pull request.

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
4. Run the command to build and start local server:

    ``` bash
    mkdocs serve
    ```
5. Preview in the browser. (The default URL should be http://127.0.0.1:8000/emuera.em.doc/)

# Release Page

[日本語](https://evilmask.gitlab.io/emuera.em.doc/) [English](https://evilmask.gitlab.io/emuera.em.doc/en/) [简体中文](https://evilmask.gitlab.io/emuera.em.doc/zh/)
