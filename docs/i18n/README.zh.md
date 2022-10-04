---
hide:
  - navigation
---
# 多语言支持

> EmueraEM+EE从`Emuera1824+v15+EMv14+EEv23`版本开始支持多语言。

## 界面语言

!!! summary ""

    从下面的表格下载翻译文件（`右键`→`链接另存为…`），将翻译文件复制进LANG文件夹(与ERB、CSV文件夹同级)，Emuera会自动检索(所有`lang/emuera.*.xml`)可用语言。
    没有设定、没有对应翻译文件、未翻译的部分将使用日文显示。

    从`帮助`→`设置`→`显示`→`Emuera界面语言`处可选择语言。或者在配置文件(*.config)的`Emueraの表示言語`/`Emuera interface language`项目处设定。

    在Emuera的命令行中添加`-genlang`(详见「[Emueraをデバッグモードで起動する](https://osdn.net/projects/emuera/wiki/debug#h4-Emuera.E3.82.92.E3.83.87.E3.83.90.E3.83.83.E3.82.B0.E3.83.A2.E3.83.BC.E3.83.89.E3.81.A7.E8.B5.B7.E5.8B.95.E3.81.99.E3.82.8B)」)，会自动生存默认语言文件，以`lang/emuera-default-lang.xml`的名称保存。欢迎翻译并发布其它语言翻译文件。

!!! example "配置文件示例" 
    
    ``` title="emuera.config"
    Emueraの表示言語:English
    ```

| 语言                                                                                                                | 翻译文件                                       | 完成度  |
| :------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------- | :------ |
| 日本語                                                                                                              | (默认语言)                                     | 100.00% |
| [English](https://docs.google.com/spreadsheets/d/1wxXyXjQLZyKm1dqg8GwvvVD2oG2uaFPL2zDHKjrNbNM/edit#gid=1850904001)  | [emuera.en.xml](../assets/files/emuera.en.xml) | 100.00% |
| [简体中文](https://docs.google.com/spreadsheets/d/1wxXyXjQLZyKm1dqg8GwvvVD2oG2uaFPL2zDHKjrNbNM/edit#gid=1945272582) |                                                | 27.93%  |

## 配置文件

!!! summary ""

    配置文件现在可以同时识别日语和英语的设置项目，默认以`UTF-8-BOM`形式保存。

    若勾选了`帮助`→`设置`→`环境`→`用英文输出配置文件的设置项目`，配置文件将使用英文保存。也可在配置文件(*.config)的`CONFIGファイルの内容を英語で保存する`/`Output English items in the config file`项目处设定。

| 日语                                                  | 英语                                                       | 默认值          |
| :---------------------------------------------------- | :--------------------------------------------------------- | :-------------- |
| 大文字小文字の違いを無視する                          | Ignore case                                                | `YES`           |
| _Rename.csvを利用する                                 | Use _Rename.csv file                                       | `NO`            |
| _Replace.csvを利用する                                | Use _Replace.csv file                                      | `YES`           |
| マウスを使用する                                      | Use mouse                                                  | `YES`           |
| メニューを使用する                                    | Show menu                                                  | `YES`           |
| デバッグコマンドを使用する                            | Allow debug commands                                       | `NO`            |
| 多重起動を許可する                                    | Allow multiple instances                                   | `YES`           |
| オートセーブを行なう                                  | Make autosaves                                             | `YES`           |
| キーボードマクロを使用する                            | Use keyboard macros                                        | `YES`           |
| ウィンドウの高さを可変にする                          | Changeable window height                                   | `YES`           |
| 描画インターフェース                                  | Drawing interface                                          | `TEXTRENDERER`  |
| ウィンドウ幅                                          | Window width                                               | `760`           |
| ウィンドウ高さ                                        | Window height                                              | `480`           |
| ウィンドウ位置X                                       | Window X position                                          | `0`             |
| ウィンドウ位置Y                                       | Window Y position                                          | `0`             |
| 起動時のウィンドウ位置を指定する                      | Fixed window starting position                             | `NO`            |
| 起動時にウィンドウを最大化する                        | Maximize window on startup                                 | `NO`            |
| 履歴ログの行数                                        | Max history log lines                                      | `5000`          |
| PRINTCを並べる数                                      | Items per line for PRINTC                                  | `3`             |
| PRINTCの文字数                                        | Number of Item characters for PRINTC                       | `25`            |
| フォント名                                            | Font name                                                  | `ＭＳ ゴシック` |
| フォントサイズ                                        | Font size                                                  | `18`            |
| 一行の高さ                                            | Line height                                                | `19`            |
| 文字色                                                | Text color                                                 | `"192,192,192"` |
| 背景色                                                | Background color                                           | `"0,0,0"`       |
| 選択中文字色                                          | Highlight color                                            | `"255,255,0"`   |
| 履歴文字色                                            | History log color                                          | `"192,192,192"` |
| フレーム毎秒                                          | FPS                                                        | `5`             |
| 最大スキップフレーム数                                | Skip frames                                                | `3`             |
| スクロール行数                                        | Lines per scroll                                           | `1`             |
| 無限ループ警告までのミリ秒数                          | Milliseconds for infinite loop warning                     | `5000`          |
| 表示する最低警告レベル                                | Minimum warning level                                      | `1`             |
| ロード時にレポートを表示する                          | Display loading report                                     | `NO`            |
| ロード時に引数を解析する                              | Reduce argument on load                                    | `NO`            |
| 呼び出されなかった関数を無視する                      | Ignore uncalled functions                                  | `YES`           |
| 関数が見つからない警告の扱い                          | Function is not found warning                              | `IGNORE`        |
| 関数が呼び出されなかった警告の扱い                    | Function not called warning                                | `IGNORE`        |
| ボタンの途中で行を折りかえさない                      | Button wrapping                                            | `NO`            |
| サブディレクトリを検索する                            | Search subfolders                                          | `NO`            |
| 読み込み順をファイル名順にソートする                  | Sort filenames                                             | `NO`            |
| 表示するセーブデータ数                                | Save data count per page                                   | `20`            |
| eramaker互換性に関する警告を表示する                  | Eramaker compatibility warning                             | `YES`           |
| システム関数の上書きを許可する                        | Allow overriding system functions                          | `YES`           |
| システム関数が上書きされたとき警告を表示する          | System function override warning                           | `YES`           |
| 関連づけるテキストエディタ                            | Text editor                                                | `notepad`       |
| テキストエディタコマンドライン指定                    | Text editor command line setting                           | `USER_SETTING`  |
| エディタに渡す行指定引数                              | Text editor command line arguments                         | (空字符串)      |
| 同名の非イベント関数が複数定義されたとき警告する      | Duplicated functions warning                               | `NO`            |
| 解釈不可能な行があっても実行する                      | Execute error lines                                        | `NO`            |
| CALLNAMEが空文字列の時にNAMEを代入する                | Use NAME if CALLNAME is empty                              | `NO`            |
| セーブデータをsavフォルダ内に作成する                 | Use sav folder                                             | `NO`            |
| 擬似変数RANDの仕様をeramakerに合わせる                | Imitate behavior for RAND                                  | `NO`            |
| 関数・属性については大文字小文字を無視しない          | Do not ignore case for functions and attributes            | `NO`            |
| 全角スペースをホワイトスペースに含める                | Whitespace includes full-width space                       | `YES`           |
| セーブデータをUTF-8で保存する                         | Use UTF8 for save data                                     | `NO`            |
| ver1739以前の非ボタン折り返しを再現する               | Reproduce wrapping behavior like in pre ver1739            | `NO`            |
| 内部で使用する東アジア言語                            | Default ANSI encoding                                      | `JAPANESE`      |
| ONEINPUT系命令でマウスによる2文字以上の入力を許可する | Allow long input by mouse for ONEINPUT                     | `NO`            |
| イベント関数のCALLを許可する                          | Allow CALL on event functions                              | `NO`            |
| SPキャラを使用する                                    | Allow SP characters                                        | `NO`            |
| セーブデータをバイナリ形式で保存する                  | Use the binary format for saving data                      | `NO`            |
| ユーザー関数の全ての引数の省略を許可する              | Allow arguments omission for user functions                | `NO`            |
| ユーザー関数の引数に自動的にTOSTRを補完する           | Auto TOSTR conversion for user function arguments          | `NO`            |
| FORM中の三連記号を展開しない                          | Do not process triple symbols inside FORM                  | `NO`            |
| TIMESの計算をeramakerにあわせる                       | Imitate behavior for TIMES                                 | `NO`            |
| キャラクタ変数の引数を補完しない                      | Do not auto-complete arguments for character variables     | `NO`            |
| 文字列変数の代入に文字列式を強制する                  | String variable assignment on valid with string expression | `NO`            |
| UPDATECHECKを許可しない                               | Disallow UPDATECHECK                                       | `NO`            |
| ERD機能を利用する                                     | Use ERD                                                    | `YES`           |
| LOADTEXTとSAVETEXTで使える拡張子                      | Valid extensions for LOADTEXT and SAVETEXT                 | `txt`           |
| セーブデータを圧縮して保存する                        | Compress save data                                         | `NO`            |
| CONFIGファイルの内容を英語で保存する                  | Output English items in the config file                    | `NO`            |
| Emueraの表示言語                                      | Emuera interface language                                  | (空字符串)      |
| Emueraのアイコンのパス                                | Path to a custom window icon                               | (空字符串)      |
