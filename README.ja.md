| [日本語](README.ja.md) | [English](README.en.md) | [简体中文](README.md) |
| :---: | :---: | :---: |

# [Release page](https://qirchen421.github.io/emuera.sk.doc/index.html)

> **[Emuera-SKIA ヘルプマニュアル](https://qirchen421.github.io/emuera.sk.doc/index.html)** — [emuera.em.doc](https://gitlab.com/EvilMask/emuera.em.doc) から派生した SkiaSharp 版のドキュメントです。

| [日本語](https://qirchen421.github.io/emuera.sk.doc/index.html) | [English](https://qirchen421.github.io/emuera.sk.doc/en/index.html) | [简体中文](https://qirchen421.github.io/emuera.sk.doc/zh/index.html) |
| :---: | :---: | :---: |

# コントリビュートガイド

1. このリポジトリを fork して clone します。
2. 使用する言語の `.md` ファイルを、言語コードを付けて編集します。

    例：
    | デフォルト(ja) | English(en)  | 中文(zh)     |
    | ----------- | ------------ | ------------ |
    | README.md   | README.en.md | README.zh.md |
3. 自分の fork にコミットし、pull request を作成します。

    ```
    注意：リポジトリ内部のファイルへのリンクは書き換える必要はありません。
    例えば [`REGEXPMATCH`](./REGEXPMATCH.md) を [`REGEXPMATCH`](./REGEXPMATCH.en.md)
    に変える必要はなく、mkdocs が自動的に処理します。
    同じフォルダに `REGEXPMATCH.en.md` を追加するだけで構いません。
    ```

# ローカルでのプレビュー

1. Python 環境を用意します。
2. リポジトリのルートフォルダでターミナルを開きます。
3. 依存関係をインストールします：
    ``` bash
    pip install mkdocs
    pip install mkdocs-material
    pip install mkdocs-minify-plugin
    pip install mkdocs-static-i18n
    ```
    オフラインビルドを行う場合は、さらに以下をインストールしてください：
    ``` bash
    pip install mkdocs-minify-plugin
    ```
    最新のビルド環境のバージョンは以下の通りです：
    | 名前                       | バージョン |
    | -------------------------- | ------- |
    | Python                     | 3.12.2  |
    | mkdocs                     | 1.5.3   |
    | mkdocs-material            | 9.5.13  |
    | mkdocs-material-extensions | 1.3.1   |
    | mkdocs-minify-plugin       | 0.8.0   |
    | mkdocs-static-i18n         | 1.2.2   |

4. 以下のコマンドを実行してビルドし、ローカルサーバーを起動します：

    ``` bash
    mkdocs serve
    ```
5. ブラウザでプレビューします。（デフォルトの URL は http://127.0.0.1:8000/ です）
