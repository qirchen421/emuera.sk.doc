# リファレンス

## 一般

### リソースの占有解除
!!! summary ""

    プログラム動作中Resourceフォルダーの画像ファイルを常時占用しないようにしました

### 音声ファイルに対応
!!! summary ""

    Emueraと同じディレクトリにあるsoundフォルダに音声ファイルを入れることで使用可能
    詳しくは後述のPLAYSOUND命令等を参照

### リソースファイルの`WebP`形式に対応
!!! summary ""

    Emuera1824+v11+webp+Secureを参考にWebP形式に対応していましたが、EMv6+EEv13から別のWebPライブラリを使用するように

### `Emuera-Anchor`を同梱
!!! summary ""

    同梱のEmuera-Anchorは英語圏のeraコミュニティで使用されているEmueraです
    各UIやエラーメッセージ等が英語になっています。必要に応じて使い分けてください

## 定数・変数

### `ERH`で定義した変数の配列に、`CSV`ファイル/`ERD`ファイルで名前を付けられるように
!!! summary ""

    ERHで定義した変数名を準拠にファイルを読み込み、既存のCSV変数と同じように配列に名前を付けることができる。現時点では一次元配列変数にのみ対応
    CSVフォルダ内で使えるものは従来どおり「変数名.csv」、ERB内で使えるものは「変数名.ERD」ファイルとなる。書式はCSV変数のファイルと同じ。これらが2つ以上存在する場合は起動時にエラー吐いて終了する

## 仕様が変更された命令・式中関数

### `HTML_PRINT`で負数を使用可能に
!!! summary ""

    `HTML_PRINT`の`<space>`タグで`param`に負数を指定できます

!!! example "例"

    ``` title="MAIN.ERB"
    @SYSTEM_TITLE
    
    HTML_PRINT "文<shape type='space' param='-100'>字"

    ONEINPUT
    ```

### `INPUT`系でマウスクリックを受け付けるように
!!! summary ""

    `INPUT`, `INPUTS`, `ONEINPUT`, `ONEINPUTS` に第二引数追加(整数型，省略可，デフォルトは`0`)
    `TINPUT`, `TINPUTS`, `TONEINPUT`, `TONEINPUTS` に第五引数追加(整数型，省略可，デフォルトは`0`)
    追加引数`==0`時、または省略した時 本家版と同じです。
    追加引数`!=0`時 マウスクリックをエンターキーにみなす(`RESULTS`に空文字列を代入。ボタンを押した場合，ボタンのインデックスを`RESULTS:1`に代入)、左クリックの時`RESULT:1`を`1`、右クリックの時`RESULT:1`を`2`にします。また、同時に++shift++、++ctrl++、++alt++を押した場合、そのキー状態を`RESULT:2`に保存します。(bit 17 18 19)

### `ONEINPUT`のデフォルト値に2桁/2文字以上を指定できるように
!!! summary ""

    `ONEINPUT`, `ONEINPUTS`, `TONEINPUT`, `TONEINPUTS` デフォルト値に2桁以上/2文字以上を指定できます

### `LOADTEXT`、`SAVETEXT`でファイル名を指定可能に
!!! summary ""

    `LOADTEXT`, `SAVETEXT` の第一引数が文字列の場合、第一引数をパスとしてファイルをロード/セーブします。`Emuera.exe`を相対パスで指定(".."は無効)。また、`Emuera.config`の「LOADTEXTとSAVETEXTで使える拡張子」で決められた拡張子しか使えません。(デフォルトはtxtのみ)
    
!!! example "例"

    ``` title="emuera.config"
    LOADTEXTとSAVETEXTで使える拡張子:txt,xml,json
    ```

### `INPUTMOUSEKEY`でボタン使用可能に
!!! summary ""

    命令実行時に`RESULT:0 = 1`(マウスクリック時)だった場合に`RESULT:5`にボタンの数値が入ります

### `OUTPUTLOG`でファイル名と拡張子を指定可能に
!!! summary ""

    `OUTPUTLOG`に引数指定することでそのファイル名.拡張子で出力できる リテラルは`PRINTS`とかと同じ
    `v5fix`で親ディレクトリを指定できる脆弱性を修正 子ディレクトリは指定可能

### `GSETFONT`でフォントスタイルを指定できるように
!!! summary ""

    第4引数に`SETFONT`と同じ4ビット数(1=太字 2=斜体 4=打ち消し線 8=下線)指定で装飾を付けられるように 省略可能

## 新規に追加された命令・式中関数

### HTML系

| 関数名                                        | 引数                                               | 戻り値 |
| :-                                            | :-                                                | :-     |
| [`HTML_STRINGLEN`](./HTML_STRINGLEN.md)       | `string`(, `int`)                                 | `int`  |

### 文字列操作・参照

| 関数名                                        | 引数                                               | 戻り値 |
| :-                                            | :-                                                | :-     |
| [`REGEXPMATCH`](./REGEXPMATCH.md)             | `string`, `string`(, `int`)                       | `int`  |
|                                               | `string`, `string`, `ref` `int`, `ref` `string`   | `int`  |

### 変数操作・変数参照・CSV参照

| 関数名                                            | 引数                                  | 戻り値    |
| :-                                                | :-                                    | :-         |
| [`ISDEFINED`](./ISDEFINED.md)                     | `string`                              | `int`      |
| [`EXISTVAR`](./EXISTVAR.md)                       | `string`                              | `int`      |
| [`ENUMFUNCBEGINSWITH`](./ENUMFUNCBEGINSWITH.md)   | `string`                              | `int`      |
| [`ENUMVARBEGINSWITH`](./ENUMVARBEGINSWITH.md)     | `string`                              | `int`      |
| [`ENUMMACROBEGINSWITH`](./ENUMMACROBEGINSWITH.md) | `string`                              | `int`      |
| [`ENUMFUNCENDSWITH`](./ENUMFUNCENDSWITH.md)       | `string`                              | `int`      |
| [`ENUMVARENDSWITH`](./ENUMVARENDSWITH.md)         | `string`                              | `int`      |
| [`ENUMMACROENDSWITH`](./ENUMMACROENDSWITH.md)     | `string`                              | `int`      |
| [`ENUMFUNCWITH`](./ENUMFUNCWITH.md)               | `string`                              | `int`      |
| [`ENUMVARWITH`](./ENUMVARWITH.md)                 | `string`                              | `int`      |
| [`ENUMMACROWITH`](./ENUMMACROWITH.md)             | `string`                              | `int`      |
| [`GETVAR`](./GETVAR.md)                           | `string`                              | `int`      |
| [`GETVARS`](./GETVARS.md)                         | `string`                              | `string`   |
| [`SETVAR`](./SETVAR.md)                           | `string`, `any`                       | `1`        |
| [`VARSETEX`](./VARSETEX.md)                       | `string`, `any`(, `int`, `int`, `int`)| `1`        |
| [`ARRAYMSORTEX`](./ARRAYMSORTEX.md)               | `string`, `ref` `string`(, `int`)     | `1`        |
|                                                   | `ref` `int`, `ref` `string`(, `int`)  | `1`        |

### デバッグ補助・システムフロー制御

| 関数名                                                        | 引数          |
| :-                                                            | :-            |
|[`QUIT_AND_RESTART`](./QUIT_AND_RESTART.md)                    | なし          |
|[`FORCE_QUIT`](./FORCE_QUIT.md)                                | なし          |
|[`FORCE_QUIT_AND_RESTART`](./FORCE_QUIT_AND_RESTART.md)        | なし          |
|[`FORCE_BEGIN`](./FORCE_BEGIN.md)                              | `identifier`  |

### 関数系（CALL等）

| 関数名                                            | 引数           |
| :-                                               | :-             |
|[`EXISTFUNCTION`](./EXISTFUNCTION.md)             | `string`       |
|[`TRYCALLF`](./TRYCALLF.md)                       | `string`       |
|[`TRYCALLFORMF`](./TRYCALLFORMF.md)               | `formedString` |

### 画像処理関連

| 関数名                                            | 引数                                  | 戻り値    |
| :-                                                | :-                                    | :-         |
| [`GDRAWTEXT`](./GDRAWTEXT.md)                     | `int`, `string`(, `int`, `int`)       | `int`      |
| [`GGETFONT`](./GGETFONT.md)                       | `int`                                 | `int`      |
| [`GGETFONTSIZE`](./GGETFONTSIZE.md)               | `int`                                 | `int`      |
| [`GGETTEXTSIZE`](./GGETTEXTSIZE.md)               | `string`, `string`, `int`(, `int`)    | `int`      |
| [`GDRAWGWITHROTATE`](./GDRAWGWITHROTATE.md)       | `int`, `int`, `int`(, `int`, `int`)   | `int`      |

### サウンド系

| 関数名                                        | 引数      | 戻り値    |
| :-                                            | :-        | :-        |
| [`PLAYSOUND`](./PLAYSOUND.md)                 | `string`  | なし      |
| [`STOPSOUND`](./STOPSOUND.md)                 | なし      | なし      |
| [`PLAYBGM`](./PLAYBGM.md)                     | `string`  | なし      |
| [`STOPBGM`](./STOPBGM.md)                     | なし      | なし      |
| [`EXISTSOUND`](./EXISTSOUND.md)               | `string`  | `int`     |
| [`SETSOUNDVOLUME`](./SETSOUNDVOLUME.md)       | `int`     | なし      |
| [`SETBGMVOLUME`](./SETBGMVOLUME.md)           | `int`     | なし      |

### XML系

### MAP（連想配列）系

### その他

