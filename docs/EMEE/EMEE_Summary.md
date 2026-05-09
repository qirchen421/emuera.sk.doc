---
---

# EmueraEM+EE 機能概要

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

### ![](../assets/images/IconEE.webp)`Emuera-Anchor`を同梱(サポート終了)
!!! summary ""

	システム側に言語変更機能を搭載することで各言語に対応。Emuera-Anchorは削除

### ![](../assets/images/IconEE.webp)`Emuera-Anchor`のホットキー拡張機能を移植
!!! summary ""

    Emuera-Anchorのホットキー拡張機能を移植。`Ctrl+T`でタイトル画面に戻る、`Ctrl+R`で再起動、`Ctrl+O`でERB再読み込み

### ![](../assets/images/IconEE.webp)キーマクロをUTF-8で保存するように
!!! summary ""

    英語以外の言語もマクロに組み込めるようになりました
### ![](../assets/images/IconEM.webp)セーブデータを圧縮して保存できるように
!!! summary ""

    コンフィグ画面もしくは`emuera.config`で設定可能です

    * [`セーブデータをバイナリ形式で保存する`](../Emuera/config.md#_43)が`YES`の時のみ有効です

!!! example "例"
    ``` title="emuera.config"
    セーブデータを圧縮して保存する:YES
    ```

!!! warning "注意"

    圧縮機能オンしたセーブデータは古いバージョン、本家版のEmuera.exeとの互換性がありません

### ![](../assets/images/IconEM.webp)Emueraアイコン指定機能
!!! summary ""

    `emuera.config`のコンフィグ項目で設定可能です

    コンフィグ項目`Emueraのアイコンのパス`に画像のパスを入力してください。パスは`Emuera.exe`を相対パスで指定(`..`は無効)。

    変化するのはタイトルバーとタスクバーのアイコンだけです（`Emuera.exe`のアイコンは変化しません）。

### ![](../assets/images/IconEE.webp)`Emuera-Anchor`の`Clipboard`機能を移植
!!! summary ""

	設定→クリップボードから、`Emuera`で表示したテキストを自動的にクリップボードでコピーする機能を追加

### ![](../assets/images/IconEE.webp)`ttf`、`otf`の動的読み込みに対応
!!! summary ""

	ルートディレクトリに`font`フォルダを作成し、そこに置くことでコンフィグ及び`GSETFONT`で使用可能になります

### ![](../assets/images/Iconetc.webp)`.NET 7`に対応
!!! summary ""

	CRER氏の協力の元、.NET 7に正式対応しました。感謝

## 定数・変数

### ![](../assets/images/IconEE.webp)`ERH`で定義した変数の配列に、`CSV`ファイル/`ERD`ファイルで名前を付けられるように
!!! summary ""

    `ERH`で定義した変数名を準拠にファイルを読み込み、既存の`CSV`変数と同じように配列に名前を付けることができる

    `CSV`フォルダ内で使えるものは従来どおり`「変数名.csv」`、`ERB`内で使えるものは`「変数名.ERD」`ファイルとなる。書式は`CSV`変数のファイルと同じ。これらが2つ以上存在しても、同じ識別子が定義されている場合だけ起動時にエラー吐いて終了する。違う識別子を同じ整数に置き換え可能

    また、多次元配列の変数に名前を付ける場合は、各次元に応じてファイル名に`@`から続く数字を記すことで対応する。左の添字から`1`,`2`,`3`と対応している  

!!! example "例"

    ``` { #language-csv title="ERH.ERH" }
    #DIM HOGE, 3
    #DIM HOGE2D, 3, 3
    #DIM HOGE3D, 3, 3, 3
    ```


    ``` title="ERBフォルダ"
    HOGE.ERD
    HOGE2D@1.ERD
    HOGE2D@2.ERD
    HOGE3D@1.ERD
    HOGE3D@2.ERD
    HOGE3D@3.ERD
    ```
    
### ![](../assets/images/IconEE.webp)`VariableSize.csv`で`COUNT`を使用禁止変数に設定できるように
!!! summary ""

    `COUNT,-1`を記述することで`COUNT`を使用禁止変数に設定できます。この場合、`REPEAT`の行は起動時に警告が入り、実行時にはエラー落ちします

### ![](../assets/images/IconEE.webp)`DAY`,`TIME`,`MONEY`にCSVを適用可能に
!!! summary ""

    `DAY.csv`,`TIME.csv`,`MONEY.csv`で他CSVのように名前を付けられ、`DAYNAME`,`TIMENAME`,`MONEYNAME`が使用可能になります

### ![](../assets/images/IconEM.webp)`XML`、`MAP`、`DataTable`がセーブデータの中で保存できるように
!!! summary ""

    CSVフォルダ内の`VarExt*.csv`ファイルで，保存したい[`XML`](../Reference/XML_MANAGE.md)、[`MAP`](../Reference/MAP_MANAGE.md)、[`DataTable`](../Reference/DT_MANAGE.md)のIDが設定可能になります

    * [`セーブデータをバイナリ形式で保存する`](../Emuera/config.md#_43)が`YES`の時のみ有効です
    * IDを設定したとしても、メモリにないならセーブデータへ保存しません
    * セーブデータの中に保存されたデータのIDがCSVで設定されていない場合、読み捨てます
    * セーブデータが古いバージョン、本家版のEmuera.exeとの互換性があります

!!! example "例"

    ``` { #language-csv title="VarExtSample.CSV" }
    ; global.savの中で保存しようとするMAP, XmlDocument, DataTableのID。一行複数個設定可能
    ; 複数行、複数ファイル(例えばVarExt1.csv, VarExt2.csv, VarExt3.csvなど)で設定も可
    GLOBAL_MAPS, MyMap, MyMap2
    GLOBAL_MAPS, MyMap3
    GLOBAL_XMLS, 0, MyXml
    GLOBAL_DTS, db
    ; save*.savの中で保存しようとするMAP, XmlDocument, DataTableのID
    SAVE_MAPS, MyMap4
    SAVE_XMLS, 1, MyXml2
    SAVE_DTS, mydb1
    ; GLOBALがついた変数と似ている、RESETDATAの時に変化しない、RESETGLOBALの時に削除
    STATIC_MAPS, MyMap5
    STATIC_XMLS, 1, MyXml3
    STATIC_DTS, db2
    ```

!!! warning "注意"

    CSVファイルで設定されたIDの先頭のスペースと末尾のスペースが削除されるので、注意してください

## 仕様が変更された命令・式中関数

### ![](../assets/images/IconEM.webp)`HTML_PRINT`関連の変更
!!! summary ""

    - `HTML_PRINT`の`<space>`タグで`param`に負数を指定できます
    - `HTML_PRINT`の`<clearbutton>`タグの追加。`<clearbutton>`は囲った部分のボタンかを無効とする（`title`、`pos`属性の機能は残る）
        - 属性`notooltip`が`true`の場合、ボタン`title`属性も無効とすいる
    - `HTML_PRINT`の`<img>`、`<shape>`タグの属性`width`、`height`、`ypos`、`param`を設定する時、数値の後に`px`（大小文字不問）を追加すると，数値をフォントサイズとの百分率で解釈の代わりに，ピクセル数とする。
    - `HTML_PRINT`の`<div>`タグの追加。`<div>`で囲った内容を指定したエリアで表示することが可能です。`<div>`は入れ子構造に対応していません。他のタグと併用可能です。
        - `width`属性：サブエリアの幅。`<img>`、`<shape>`タグのように`px`、フォントサイズとの百分率で指定可能。
        - `height`属性：サブエリアの高さ。`<img>`、`<shape>`タグのように`px`、フォントサイズとの百分率で指定可能。
        - `xpos`属性：サブエリアが現在位置からの横方向距離。省略可。負数なら左寄り，正数なら右寄り。`<img>`、`<shape>`タグのように`px`、フォントサイズとの百分率で指定可能。
        - `ypos`属性：サブエリアが現在位置からの縦方向距離。省略可。負数なら上寄り，正数なら下寄り。`<img>`、`<shape>`タグのように`px`、フォントサイズとの百分率で指定可能。
        - `size`属性：`width`と`height`の簡略化です。書式：`size='width,height'`。
        - `rect`属性：`xpos`、`ypos`、`width`と`height`の簡略化です。書式：`rect='xpos,ypos,width,height'`。
        - `depth`属性：サブエリアの奥行き。省略可。負数なら手前に，正数なら奥に。
        - `color`属性：サブエリアの背景色。省略可。指定のフォーマットは`<font>`タグの`color`属性と同じです。
        - `display`属性：サブエリアの描画形式。省略可。
            - `relative`（デフォルト）：今の文字位置で描画。
            - `absolute`：ウィンドウの固定位置で描画、スクロールしても移動しません。`(0, 0)`はウィンドウの左下、`ypos`は上方向が正です。
        - `margin`属性：サブエリアの全四辺のマージン領域。省略可。
            - `margin='all'`：`all`を四辺すべてに適用します。`px`、フォントサイズ百分率両方可。
            - `margin='leftRight,topBottom'`：`leftRight`を上下、`leftRight`を左右に適用します。`px`、フォントサイズ百分率両方可。
            - `margin='top,leftRight,bottom'`：`top`を上、`leftRight`を左右、`bottom`を下に適用します。`px`、フォントサイズ百分率両方可。
            - `margin='top,right,bottom,left'`：`top`を上、`right`を右、`bottom`を下、`left`を左に適用します。`px`、フォントサイズ百分率両方可。
        - `padding`属性：サブエリアの全四辺のパディング領域。省略可。指定のフォーマットは`margin`属性と同じです。
        - `border`属性：サブエリアの境界の幅。省略可。指定のフォーマットは`margin`属性と同じです。
        - `bcolor`属性：サブエリアの境界の色。省略可。指定のフォーマットは`margin`属性と似ているが、色の書式は`<font>`タグの`color`属性と同じです。
        - `radius`属性：サブエリアの境界の外側の角の丸め（半径）。省略可。
            - `radius='all'`：`all`を全四角に適用します。`px`、フォントサイズ百分率両方可。
            - `radius='ltRb,rtLb'`：`ltRb`を左上と右下、`rtLb`右上と左下に適用します。`px`、フォントサイズ百分率両方可。
            - `radius='lt,rtLb,rb'`：`lt`を左上、`rtLb`を右上と左下、`rb`を右下に適用します。`px`、フォントサイズ百分率両方可。
            - `radius='lt,rt,rb,lb'`：`lt`を左上、`rt`を右上、`rb`を右下、`lb`を左下に適用します。`px`、フォントサイズ百分率両方可。
    - 画像、`div`など行の高さを超えた内容は所在行が画面外でも表示可能にしました。
    - `HTML_PRINT`の`<img>`タグに属性`srcm`を追加。CBG系のボタンマップと似ています。[INPUT系の拡張モード](./EMEE_Summary.md#input)または`INPUTMOUSEKEY`命令を実行するとき，マウスカーソル直下のボタンマップ画像の色（RGB部分）を`RESULT:3`(`INPUTMOUSEKEY`の場合`RESULT:6`)に代入します。
    - `HTML_PRINT`に第二引数（整数型）を追加。第二引数が`0`（デフォルト）以外の場合，強制改行をしなくなります。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    
        HTML_PRINT "文<shape type='space' param='-100'>字"
        HTML_PRINT "<clearbutton><button value='1' title='ツールチップ1'>[1] 確定</button></clearbutton>"
        HTML_PRINT "<clearbutton notooltip='true'><button value='2' title='ツールチップ2'>[2] 戻る</button></clearbutton>"
        HTML_PRINT "<shape type='rect' param='0,0,200px,100'>"
        HTML_PRINT "<img src='button_normal' srcb='button_hover' srcm='button_mask'>"
        HTML_PRINT "<div ypos='-5px' xpos='-180px' width='80px' height='80px' color='#503030' depth='-1'><button value='3'>[3] ボタン3</button></div>"

        ONEINPUT
    ```

### ![](../assets/images/IconEM.webp)`HTML_PRINT`に関する`PRINT`系命令の変更

!!! summary ""
    - `PRINT_IMG`に引数を追加し（省略可）、3つの形式を追加した。
    - `PRINT_IMG`, `PRINT_RECT`, `PRINT_SPACE`の整数型引数の後にも`px`（大小文字不問）を追加可能になる
!!! info "API"

    ``` { #language-erbapi }
    PRINT_IMG src
    PRINT_IMG src, width, height, ypos
    PRINT_IMG src, srcb, width, height, ypos
    PRINT_IMG src, srcb, srcm, width, height, ypos
    ```
    HTML_PRINT命令の`<img>`タグに相当する
!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    
        PRINT_IMG "Normal", "Hover", (500+A) px, 100
        PRINT_SPACE 200 px

        ONEINPUT
    ```
### ![](../assets/images/IconEM.webp)`INPUT`系でマウスクリックを受け付けるように
!!! summary ""

    `INPUT`, `INPUTS`, `ONEINPUT`, `ONEINPUTS` に第二引数追加(整数型，省略可，デフォルトは`0`)

    `TINPUT`, `TINPUTS`, `TONEINPUT`, `TONEINPUTS` に第五引数追加(整数型，省略可，デフォルトは`0`)

    - 追加引数`==0`時、または省略した時 本家版と同じです。
    - 追加引数`!=0`時 マウスクリックをエンターキーにみなす(`RESULTS`に空文字列を代入。ボタンを押した場合，ボタンのインデックスを`RESULTS:1`に代入)、左クリックの時`RESULT:1`を`1`、右クリックの時`RESULT:1`を`2`にします。また、同時に++shift++、++ctrl++、++alt++を押した場合、そのキー状態を`RESULT:2`に保存します。(bit 16 17 18)

### ![](../assets/images/IconEM.webp)`ONEINPUT`のデフォルト値に2桁/2文字以上を指定できるように
!!! summary ""

    `ONEINPUT`, `ONEINPUTS`, `TONEINPUT`, `TONEINPUTS` デフォルト値に2桁以上/2文字以上を指定できます


### ![](../assets/images/IconEE.webp)`INPUT`系を右クリックでスキップできるオプションを追加
!!! summary ""

    `INPUT`, `INPUTS`, `ONEINPUT`, `ONEINPUTS` に第三引数追加(整数型，省略可，デフォルトは`0`)

    `TINPUT`, `TINPUTS`, `TONEINPUT`, `TONEINPUTS` に第六引数追加(整数型，省略可，デフォルトは`0`)

	- 追加引数`==0`時、もしくは省略時は本家版と同じ挙動
	- 追加引数`!=0`時、右クリック等でのスキップ中に入力待ちを行わない
	ただしデフォルト値は適用される。上記`INPUT系でマウスクリックを受け付ける`と併用した場合はそれぞれ`RESULT:1`及び`RESULTS:1`に、
	併用しなかった場合は通常通り`RESULT:0`及び`RESULTS:0`にデフォルト値が代入される

### ![](../assets/images/IconEM.webp)`LOADTEXT`、`SAVETEXT`でファイル名を指定可能に
!!! summary ""

    `LOADTEXT`の第一引数、もしくは`SAVETEXT`の第二引数が文字列の場合、それぞれの引数をパスとしてファイルをロード/セーブします。`Emuera.exe`を相対パスで指定(".."は無効)。また、設定画面か`Emuera.config`から「LOADTEXTとSAVETEXTで使える拡張子」項目で決められた拡張子しか使えません。(デフォルトはtxtのみ)
    
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

### ![](../assets/images/IconEE.webp)`GETNUM`の`ERD`対応
!!! summary ""

	`GETNUM`がERDにも対応し、省略可能な第3引数を指定できるように。第3引数は多次元配列の次元を指し、左から1,2,3となる(式中関数`VARSIZE`の仕様とは異なるため注意)
	また、式中関数`VARSIZE`の次元指定を`ERD`と同じく1,2,3とするコンフィグ項目を追加

### ![](../assets/images/IconEM.webp)`GCLEAR`で指定区域を指定した色で置き換えるように
!!! summary ""

    書式2を追加するより，第三～第六引数で区域のX、Y、幅、高さを指定可能になりました。

!!! info "API"
    ``` { #language-erbapi }
    1. GCLEAR GID, cARGB
    2. GCLEAR GID, cARGB, x, y, width, height
    ```

### ![](../assets/images/IconEE.webp)`GCREATEFROMFILE`に第三引数を指定することで、`Emuera`との相対パスで画像を参照できるように
!!! summary ""

	省略可能な第三引数が非0の場合、Emueraからの相対パスで画像を参照します  
	これによりERBフォルダやCSVフォルダ、独自仕様のフォルダなども使用可能に

### ![](../assets/images/Iconetc.webp)エイリアス(`Alias`)機能追加
Neo_Kesha氏による追加

!!! summary ""

`Talent`や`Abl`等の変数に複数の識別子を指定可能に  
拡張子`.als`ファイルで指定します  

!!! info "Talent.csv"
	```
	0, Talent1
	1, Talent2
	2, Talent3
	```

!!! info "Talent.als"
	```
	1, Talent2Alias
	0, MyCoolTalent
	2, Talent3Alias
	```

!!! info "ERBでの動作"
    ``` { #language-erbapi }
	TALENT:0:Talent1 = 15
	PRINT TALENT:0:MyCoolTalent ; 「15」と表示されます。
	TALENT:0:MyCoolTalent = 420
	PRINT TALENT:0:Talent1 ; 「420」と表示されます。
	```

### ![](../assets/images/IconEE.webp)EMEEでのみ動作する特殊なコメントアウト記号「`;^;`」を追加
!!! summary ""

	`;^;`から始まる行はeramaker及び他バージョンのEmueraでは通常通りコメントアウトされ、EMEEでのみ実行される
