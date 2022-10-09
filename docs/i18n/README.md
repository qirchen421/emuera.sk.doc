---
hide:
  - navigation
---
# 多言語化

> EmueraEM+EEは、`Emuera1824+v16+EMv14+EEv24`から多言語化しました。

## 表示言語

!!! summary ""

    下の表から翻訳ファイルをダウンロードし（`右クリック`→`名前をつけてリンク先を保存…`）、言語ファイルをLANGフォルダ(ERB、CSVフォルダと同じ場所)にコピーすれば，Emueraが自動的に(すべての`lang/emuera.*.xml`)探知できます。
    設定されていない、言語ファイルがない、未翻訳の部分は日本語で表示されます。

    `ヘルプ`→`設定`→`表示`→`Emuera表示言語`から表示言語を選べます。もしくはコンフィグファイル(*.config)に`Emueraの表示言語`/`Emuera interface language`項目で設定できます。

    Emueraのコマンドラインに`-genlang`を追加すると(「[Emueraをデバッグモードで起動する](https://osdn.net/projects/emuera/wiki/debug#h4-Emuera.E3.82.92.E3.83.87.E3.83.90.E3.83.83.E3.82.B0.E3.83.A2.E3.83.BC.E3.83.89.E3.81.A7.E8.B5.B7.E5.8B.95.E3.81.99.E3.82.8B)」に参照してください)、デフォルト言語ファイルが自動的に生成され、`lang/emuera-default-lang.xml`の名前で保存されます。他の言語の翻訳、言語ファイルの配布は歓迎です。

!!! example "例" 
    
    ``` title="emuera.config"
    Emueraの表示言語:English
    ```

!!! hint "ヒント"

    日本語版のみを使うには，`lang`フォルダが要りません。

| 言語                                                                                                                | 翻訳ファイル                                     | 完成度  |
| :------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------- | :------ |
| 日本語                                                                                                              | (デフォルト言語)                                 | 100.00% |
| [English](https://docs.google.com/spreadsheets/d/1wxXyXjQLZyKm1dqg8GwvvVD2oG2uaFPL2zDHKjrNbNM/edit#gid=1850904001)  | [emuera.eng.xml](../assets/files/emuera.eng.xml) | 100.00% |
| [简体中文](https://docs.google.com/spreadsheets/d/1wxXyXjQLZyKm1dqg8GwvvVD2oG2uaFPL2zDHKjrNbNM/edit#gid=1945272582) | [emuera.zhs.xml](../assets/files/emuera.zhs.xml) | 100.00%  |

## コンフィグ

!!! summary ""

    コンフィグ項目は日本語、英語両方に対応し、コンフィグファイルは`UTF-8-BOM`で保存するようにしました。

    `ヘルプ`→`設定`→`環境`→`CONFIGファイルの内容を英語で保存する`を選択した場合，コンフィグ項目が英語で出力します。もしくはコンフィグファイル(*.config)に`CONFIGファイルの内容を英語で保存する`/`Output English items in the config file`項目で設定できます。

    なお、"_Replace.csv"の項目も英語で設定できるようになりました。

### emuera.config

| 日本語                                                | 英語                                                       | デフォルト      |
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
| エディタに渡す行指定引数                              | Text editor command line arguments                         | (空文字列)      |
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
| VARSIZEの次元指定をERD機能に合わせる                  | Imitate ERD to VARSIZE dimension specification             | `NO`            |
| LOADTEXTとSAVETEXTで使える拡張子                      | Valid extensions for LOADTEXT and SAVETEXT                 | `txt`           |
| セーブデータを圧縮して保存する                        | Compress save data                                         | `NO`            |
| CONFIGファイルの内容を英語で保存する                  | Output English items in the config file                    | `NO`            |
| Emueraの表示言語                                      | Emuera interface language                                  | (空文字列)      |
| Emueraのアイコンのパス                                | Path to a custom window icon                               | (空文字列)      |

### debug.config

| 日本語                               | 英語                                 | デフォルト |
| :----------------------------------- | :----------------------------------- | :--------- |
| 起動時にデバッグウインドウを表示する | Show debug window on startup         | `YES`      |
| デバッグウインドウを最前面に表示する | Debug window always on top           | `YES`      |
| デバッグウィンドウ幅                 | Debug window width                   | `400`      |
| デバッグウィンドウ高さ               | Debug window height                  | `300`      |
| デバッグウィンドウ位置を指定する     | Fixed debug window starting position | `NO`       |
| デバッグウィンドウ位置X              | Debug window X position              | `0`        |
| デバッグウィンドウ位置Y              | Debug window Y position              | `0`        |

### _replace.csv

| 日本語            | 英語                     |
| :---------------- | :----------------------- |
| お金の単位        | Currency symbol          |
| 単位の位置        | Currency symbol position |
| 起動時簡略表示    | Loading message          |
| 販売アイテム数    | Max shop item storage    |
| DRAWLINE文字      | DRAWLINE character       |
| BAR文字1          | BAR character 1          |
| BAR文字2          | BAR character 2          |
| システムメニュー0 | System menu 0            |
| システムメニュー1 | System menu 1            |
| COM_ABLE初期値    | Default COM_ABLE         |
| 汚れの初期値      | Default Stain            |
| 時間切れ表示      | Time up message          |
| EXPLVの初期値     | Default EXPLV            |
| PALAMLVの初期値   | Default PALAMLV          |
| PBANDの初期値     | Default PBAND            |
| RELATIONの初期値  | Default RELATION         |
