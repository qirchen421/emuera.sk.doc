# リファレンス

## 一般

### ![](../assets/images/IconEM.webp)リソースの占有解除
!!! summary ""

    プログラム動作中Resourceフォルダーの画像ファイルを常時占用しないようにしました

### ![](../assets/images/IconEE.webp)音声ファイルに対応
!!! summary ""

    Emueraと同じディレクトリにあるsoundフォルダに音声ファイルを入れることで使用可能
    詳しくは後述のPLAYSOUND命令等を参照

### ![](../assets/images/IconEM.webp)リソースファイルの`WebP`形式に対応
!!! summary ""

    Emuera1824+v11+webp+Secureを参考にWebP形式に対応していましたが、EMv6+EEv13から別のWebPライブラリを使用するように

### ![](../assets/images/IconEE.webp)`Emuera-Anchor`を同梱
!!! summary ""

    同梱のEmuera-Anchorは英語圏のeraコミュニティで使用されているEmueraです
    各UIやエラーメッセージ等が英語になっています。必要に応じて使い分けてください

### ![](../assets/images/IconEE.webp)`Emuera-Anchor`を同梱
!!! summary ""

	Emuera-Anchorのホットキー拡張機能を移植。Ctrl+Tでタイトル画面に戻る、Ctrl+Rで再起動、Ctrl+OでERB再読み込み

### ![](../assets/images/IconEE.webp)キーマクロをYTF-8で保存するように
!!! summary ""

	英語以外の言語もマクロに組み込めるようになりました
## 定数・変数

### ![](../assets/images/IconEE.webp)`ERH`で定義した変数の配列に、`CSV`ファイル/`ERD`ファイルで名前を付けられるように
!!! summary ""

    ERHで定義した変数名を準拠にファイルを読み込み、既存のCSV変数と同じように配列に名前を付けることができる。現時点では一次元配列変数にのみ対応
    CSVフォルダ内で使えるものは従来どおり「変数名.csv」、ERB内で使えるものは「変数名.ERD」ファイルとなる。書式はCSV変数のファイルと同じ。これらが2つ以上存在する場合は起動時にエラー吐いて終了する

### ![](../assets/images/IconEE.webp)`VariableSize.csv`で`COUNT`を使用禁止変数に設定できるように
!!! summary ""

	`COUNT,-1`を記述することで`COUNT`を使用禁止変数に設定できます。この場合、`REPEAT`の行は起動時に警告が入り、実行時にはエラー落ちします

## 仕様が変更された命令・式中関数

### ![](../assets/images/IconEM.webp)`HTML_PRINT`関連の変更
!!! summary ""

    - `HTML_PRINT`の`<space>`タグで`param`に負数を指定できます
    - `HTML_PRINT`の`<clearbutton>`タグの追加。`<clearbutton>`は囲った部分のボタンかを無効とする（`title`、`pos`属性の機能は残る）
        - 属性`notooltip`が`true`の場合、ボタン`title`属性も無効とすいる

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    
    HTML_PRINT "文<shape type='space' param='-100'>字"
    HTML_PRINT "<clearbutton><button value='1' title='ツールチップ1'>[1] 確定</button></clearbutton>"
    HTML_PRINT "<clearbutton notooltip='true'><button value='2' title='ツールチップ2'>[2] 戻る</button></clearbutton>"

    ONEINPUT
    ```

### ![](../assets/images/IconEM.webp)`INPUT`系でマウスクリックを受け付けるように
!!! summary ""

    `INPUT`, `INPUTS`, `ONEINPUT`, `ONEINPUTS` に第二引数追加(整数型，省略可，デフォルトは`0`)
    `TINPUT`, `TINPUTS`, `TONEINPUT`, `TONEINPUTS` に第五引数追加(整数型，省略可，デフォルトは`0`)
    追加引数`==0`時、または省略した時 本家版と同じです。
    追加引数`!=0`時 マウスクリックをエンターキーにみなす(`RESULTS`に空文字列を代入。ボタンを押した場合，ボタンのインデックスを`RESULTS:1`に代入)、左クリックの時`RESULT:1`を`1`、右クリックの時`RESULT:1`を`2`にします。また、同時に++shift++、++ctrl++、++alt++を押した場合、そのキー状態を`RESULT:2`に保存します。(bit 17 18 19)

### ![](../assets/images/IconEM.webp)`ONEINPUT`のデフォルト値に2桁/2文字以上を指定できるように
!!! summary ""

    `ONEINPUT`, `ONEINPUTS`, `TONEINPUT`, `TONEINPUTS` デフォルト値に2桁以上/2文字以上を指定できます

### ![](../assets/images/IconEM.webp)`LOADTEXT`、`SAVETEXT`でファイル名を指定可能に
!!! summary ""

    `LOADTEXT`, `SAVETEXT` の第一引数が文字列の場合、第一引数をパスとしてファイルをロード/セーブします。`Emuera.exe`を相対パスで指定(".."は無効)。また、`Emuera.config`の「LOADTEXTとSAVETEXTで使える拡張子」で決められた拡張子しか使えません。(デフォルトはtxtのみ)
    
!!! example "例"

    ``` title="emuera.config"
    LOADTEXTとSAVETEXTで使える拡張子:txt,xml,json
    ```
### ![](../assets/images/IconEM.webp)`REPLACE`の拡張
!!! summary ""

    `REPLACE`の第三引数が文字列配列変数，第四引数が0以外の場合，第二引数と合致する部分を順次に文字列配列の要素で入れ替えり，その結果を返します。
    
!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    #DIMS str = "pen", "apple"
    #DIMS orig = "I have a {1}, I have an {2}, ..."

    PRINTSL REPLACE(orig, "\\{\\d+\\}", str, 1)

    ONEINPUT
    ```
    ``` title="结果"
    I have a pen, I have an apple, ...
    ```
### ![](../assets/images/IconEE.webp)`INPUTMOUSEKEY`でボタン使用可能に
!!! summary ""

    命令実行時に`RESULT:0 = 1`(マウスクリック時)だった場合に`RESULT:5`にボタンの数値が入ります
	また、文字列型を返すボタンを押した場合、`RESULTS`に値が代入されます

### ![](../assets/images/IconEE.webp)`OUTPUTLOG`でファイル名と拡張子を指定可能に
!!! summary ""

    `OUTPUTLOG`に引数指定することでそのファイル名.拡張子で出力できる リテラルは`PRINTS`とかと同じ
    `v5fix`で親ディレクトリを指定できる脆弱性を修正 子ディレクトリは指定可能

### ![](../assets/images/IconEE.webp)`GSETFONT`でフォントスタイルを指定できるように
!!! summary ""

    第4引数に`SETFONT`と同じ4ビット数(1=太字 2=斜体 4=打ち消し線 8=下線)指定で装飾を付けられるように 省略可能

## 新規に追加された命令・式中関数

### HTML系

| 関数名                                                                   | 引数              | 戻り値   |
| :----------------------------------------------------------------------- | :---------------- | :------- |
| ![](../assets/images/IconEM.webp)[`HTML_STRINGLEN`](./HTML_STRINGLEN.md) | `string`(, `int`) | `int`    |
| ![](../assets/images/IconEM.webp)[`HTML_SUBSTRING`](./HTML_SUBSTRING.md) | `string`, `int`   | `string` |

### 文字列操作・参照

| 関数名                                                             | 引数                                              | 戻り値 |
| :----------------------------------------------------------------- | :------------------------------------------------ | :----- |
| ![](../assets/images/IconEM.webp)[`REGEXPMATCH`](./REGEXPMATCH.md) | `string`, `string`(, `int`)                       | `int`  |
|                                                                    | `string`, `string`, `ref` `int`, `ref` `string[]` | `int`  |

### 変数操作・変数参照・CSV参照

| 関数名                                                                   | 引数                                   | 戻り値   |
| :----------------------------------------------------------------------- | :------------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`ISDEFINED`](./ISDEFINED.md)           | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`EXISTVAR`](./EXISTVAR.md)             | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCBEGINSWITH`](./ENUMFUNC.md)   | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCENDSWITH`](./ENUMFUNC.md)     | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCWITH`](./ENUMFUNC.md)         | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMVARBEGINSWITH`](./ENUMVAR.md)     | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMVARENDSWITH`](./ENUMVAR.md)       | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMVARWITH`](./ENUMVAR.md)           | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMMACROBEGINSWITH`](./ENUMMACRO.md) | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMMACROENDSWITH`](./ENUMMACRO.md)   | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMMACROWITH`](./ENUMMACRO.md)       | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`GETVAR`](./GETSETVAR.md)              | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`GETVARS`](./GETSETVAR.md)             | `string`                               | `string` |
| ![](../assets/images/IconEM.webp)[`SETVAR`](./GETSETVAR.md)              | `string`, `any`                        | `1`      |
| ![](../assets/images/IconEM.webp)[`VARSETEX`](./VARSETEX.md)             | `string`, `any`(, `int`, `int`, `int`) | `1`      |
| ![](../assets/images/IconEM.webp)[`ARRAYMSORTEX`](./ARRAYMSORTEX.md)     | `string`, `ref` `string[]`(, `int`)    | `1`      |
|                                                                          | `ref` `int`, `ref` `string[]`(, `int`) | `1`      |

### デバッグ補助・システムフロー制御

| 関数名                                                                                   | 引数         |
| :--------------------------------------------------------------------------------------- | :----------- |
| ![](../assets/images/IconEE.webp)[`QUIT_AND_RESTART`](./QUIT_AND_RESTART.md)             | なし         |
| ![](../assets/images/IconEE.webp)[`FORCE_QUIT`](./FORCE_QUIT.md)                         | なし         |
| ![](../assets/images/IconEE.webp)[`FORCE_QUIT_AND_RESTART`](./FORCE_QUIT_AND_RESTART.md) | なし         |
| ![](../assets/images/IconEE.webp)[`FORCE_BEGIN`](./FORCE_BEGIN.md)                       | `identifier` |

### 関数系（CALL等）

| 関数名                                                                 | 引数           |
| :--------------------------------------------------------------------- | :------------- |
| ![](../assets/images/IconEE.webp)[`EXISTFUNCTION`](./EXISTFUNCTION.md) | `string`       |
| ![](../assets/images/IconEE.webp)[`TRYCALLF`](./TRYCALLF.md)           | `string`       |
| ![](../assets/images/IconEE.webp)[`TRYCALLFORMF`](./TRYCALLFORMF.md)   | `formedString` |

### 画像処理関連

| 関数名                                                                       | 引数                                | 戻り値   |
| :--------------------------------------------------------------------------- | :---------------------------------- | :------- |
| ![](../assets/images/IconEE.webp)[`GDRAWTEXT`](./GDRAWTEXT.md)               | `int`, `string`(, `int`, `int`)     | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETFONT`](./GGETFONT.md)                 | `int`                               | `string` |
| ![](../assets/images/IconEE.webp)[`GGETFONTSIZE`](./GGETFONTSIZE.md)         | `int`                               | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETFONTSTYLE`](./GGETFONTSTYLE.md)       | `int`                               | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETTEXTSIZE`](./GGETTEXTSIZE.md)         | `string`, `string`, `int`(, `int`)  | `int`    |
| ![](../assets/images/IconEE.webp)[`GDRAWGWITHROTATE`](./GDRAWGWITHROTATE.md) | `int`, `int`, `int`(, `int`, `int`) | `int`    |

### サウンド系

| 関数名                                                                   | 引数     | 戻り値 |
| :----------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEE.webp)[`PLAYSOUND`](./PLAYSOUND.md)           | `string` | なし   |
| ![](../assets/images/IconEE.webp)[`STOPSOUND`](./STOPSOUND.md)           | なし     | なし   |
| ![](../assets/images/IconEE.webp)[`PLAYBGM`](./PLAYBGM.md)               | `string` | なし   |
| ![](../assets/images/IconEE.webp)[`STOPBGM`](./STOPBGM.md)               | なし     | なし   |
| ![](../assets/images/IconEE.webp)[`EXISTSOUND`](./EXISTSOUND.md)         | `string` | `int`  |
| ![](../assets/images/IconEE.webp)[`SETSOUNDVOLUME`](./SETSOUNDVOLUME.md) | `int`    | なし   |
| ![](../assets/images/IconEE.webp)[`SETBGMVOLUME`](./SETBGMVOLUME.md)     | `int`    | なし   |

### XML系

| 関数名                                                                             | 引数                                                         | 戻り値   |
| :--------------------------------------------------------------------------------- | :----------------------------------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`XML_DOCUMENT`](./XML_MANAGE.md)                 | `int`, `string`                                              | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_RELEASE`](./XML_MANAGE.md)                  | `int`                                                        | `1`      |
| ![](../assets/images/IconEM.webp)[`XML_EXIST`](./XML_MANAGE.md)                    | `int`                                                        | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_GET`](./XML_GET.md)                         | `any`, `string`(, `int`, `int`)                              | `int`    |
|                                                                                    | `any`, `string`, `ref` `string[]`, `int`                     | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_SET`](./XML_SET.md)                         | `int`, `string`, `string`(, `int`, `int`)                    | `int`    |
|                                                                                    | `ref` `string`, `string`, `string`(, `int`, `int`)           | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_TOSTR`](./XML_TOSTR.md)                     | `int`                                                        | `string` |
| ![](../assets/images/IconEM.webp)[`XML_ADDNODE`](./XML_ADDNODE.md)                 | `int`, `string`, `string`(, `int`, `int`)                    | `int`    |
|                                                                                    | `ref` `string`, `string`, `string`(, `int`, `int`)           | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVENODE`](./XML_REMOVENODE.md)           | `int`, `string`(, `int`)                                     | `int`    |
|                                                                                    | `ref` `string`, `string`(, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REPLACE`](./XML_REPLACE.md)                 | `int`, `string`                                              | `int`    |
|                                                                                    | `int`, `string`, `string`(, `int`)                           | `int`    |
|                                                                                    | `ref` `string`, `string`, `string`(, `int`)                  | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_ADDATTRIBUTE`](./XML_ADDATTRIBUTE.md)       | `int`, `string`, `string`(, `string`, `int`, `int`)          | `int`    |
|                                                                                    | `ref` `string`, `string`, `string`(, `string`, `int`, `int`) | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVEATTRIBUTE`](./XML_REMOVEATTRIBUTE.md) | `int`, `string`(, `int`)                                     | `int`    |
|                                                                                    | `ref` `string`, `string`(, `int`)                            | `int`    |

### MAP（連想配列）系

| 関数名                                                                   | 引数                              | 戻り値   |
| :----------------------------------------------------------------------- | :-------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`MAP_CREATE`](./MAP_MANAGE.md)         | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_EXIST`](./MAP_MANAGE.md)          | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_RELEASE`](./MAP_MANAGE.md)        | `string`                          | `1`      |
| ![](../assets/images/IconEM.webp)[`MAP_GET`](./MAP_OPERATION.md)         | `string`, `string`                | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_HAS`](./MAP_OPERATION.md)         | `string`, `string`                | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_SET`](./MAP_OPERATION.md)         | `string`, `string`, `string`      | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_REMOVE`](./MAP_OPERATION.md)      | `string`, `string`                | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_SIZE`](./MAP_OPERATION.md)        | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_CLEAR`](./MAP_OPERATION.md)       | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_GETKEYS`](./MAP_GETKEYS.md)       | `string`                          | `string` |
|                                                                          | `string`, `int`                   | `string` |
|                                                                          | `string`, `ref` `string[]`, `int` | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_TOXML`](./MAP_SERIALIZATION.md)   | `string`                          | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_FROMXML`](./MAP_SERIALIZATION.md) | `string`, `string`                | `int`    |

### その他

| 関数名                                                                   | 引数                        | 戻り値 |
| :----------------------------------------------------------------------- | :-------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`EXISTFILE`](./EXISTFILE.md)           | `string`                    | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMFILES`](./ENUMFILES.md)           | `string`(, `string`, `int`) | `int`  |
| ![](../assets/images/IconEE.webp)[`UPDATECHECK`](./UPDATECHECK.md)       | なし                        | なし   |
| ![](../assets/images/IconEE.webp)[`GETMEMORYUSAGE`](./GETMEMORYUSAGE.md) | なし                        | `int`  |
| ![](../assets/images/IconEE.webp)[`CLEARMEMORY`](./CLEARMEMORY.md)       | なし                        | `int`  |
