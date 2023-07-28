---
hide:
  - navigation
  - toc
---
# 変更ログ

## Emuera.EM

=== "v17"

    * 関数追加：[`DT_COLUMN_NAMES`](../Reference/DT_COLUMN.md)。
    * 機能拡張：[`<div>`タグ](../EMEE/EMEE_Summary.md#html_print)に`display`、`margin`、`padding`、`border`、`bcolor`、`radius`属性を追加。
    * バグ修正：再起動した後`<div>`を描画するの時エラーで落ちる不具合を修正。

=== "v16fix2"

    * バグ修正：`<div>`タグにおける描画タイミング、マウス判定などの不具合を修正。
    * バグ修正：機能更新による`<img>`タグ属性の間違った二重指定警告を修正。

=== "v16fix"

    * バグ修正：一部状況でボタンがマウスに反応しないなどの不具合を修正。
    * 機能拡張：[`HTML_PRINT`の第二引数](../EMEE/EMEE_Summary.md#html_print)を追加、`<div>`タグの`size`、`rect`属性を追加。

=== "v16"

    * 関数追加：[`DT_TOXML`](../Reference/DT_SERIALIZATION.md), [`DT_FROMXML`](../Reference/DT_SERIALIZATION.md)，[`DT_COLUMN_OPTIONS`](../Reference/DT_COLUMN.md)，[`MOVETEXTBOX`](../Reference/TEXTBOX.md)，[`RESUMETEXTBOX`](../Reference/TEXTBOX.md)。
    * 機能拡張：[`<div>`タグ](../EMEE/EMEE_Summary.md#html_print)追加、`<img>`タグに`srcm`属性追加、描画仕様拡張。
    * 機能拡張：`PRINT_IMG`命令に更に[2つの形式](../EMEE/EMEE_Summary.md#html_printprint)を追加。
    * 機能拡張：[`ARRAYMSORTEX`](../Reference/ARRAYMSORTEX.md)の配列サイズが指定できるように。

=== "v15"

    * 関数追加：[`DataTable`系関数](../EMEE/EMEE_Summary.md#datatable)を追加。
    * バグ修正：フォントサイズが`16`以外の時入力欄の表示不具合を修正。
    * バグ修正：ユーザー指定アイコンのアルファチャンネル情報が無効の不具合を修正。

=== "v14fix"

    * バグ修正：一部キーボード入力が無効の不具合を修正。

=== "v14"

    * [私家版v16](https://ux.getuploader.com/ninnohito/download/482)へのアップデート。
    * 機能拡張：[`GCLEAR`](../EMEE/EMEE_Summary.md#gclear)で指定区域を指定した色で置き換えるように。
    * 機能拡張：[Emueraアイコン指定機能](../EMEE/EMEE_Summary.md#emuera)。
    * 機能拡張：[`STATIC_MAPS`/`STATIC_MAPS`](../EMEE/EMEE_Summary.md#xmlmapdatatable)が指定できるように。

=== "v13fix"

    * バグ修正：機能拡張による`PRINT_IMG`と`<img>`タグの画像表示の不具合を修正。

=== "v13"

    * 機能拡張：HTML画像系パラメータ[書式拡張](../EMEE/EMEE_Summary.md#html_print)。
    * 機能拡張：[`PRINT_IMG`引数追加](../EMEE/EMEE_Summary.md#html_printprint)。

=== "v12"

    * 機能拡張：「[セーブデータを圧縮して保存する](../EMEE/EMEE_Summary.md#_5)」コンフィグ機能追加。
    * 機能拡張：[XML、MAPがセーブデータの中で保存](../EMEE/EMEE_Summary.md#xmlmapdatatable)可能。
    * 仕様変更：[XML系の命令](../EMEE/EMEE_Summary.md#xml)の仕様を変更し、文字列のIDを使うようにした，古いバージョンとの互換性あり。

=== "v11"

    * HTMLタグ属性追加：`<clearbutton>`に[`notooltip`](../EMEE/EMEE_Summary.md#html_print)属性追加。

=== "v10"

    * HTMLタグ追加：[`<clearbutton>`](../EMEE/EMEE_Summary.md#html_print)。
    * 性能向上：アルゴリズム修正による[`XML_GET`](../Reference/XML_GET.md)の性能向上。

=== "v9"

    * 関数追加：[`ENUMFILES`](../Reference/ENUMFILES.md)。

=== "v8c"

    * バグ修正：`libwebp.dll`バージョンアップ，一部`Win11`に`webp`ファイルが読み込めない問題に対応。

=== "v8b"

    * バグ修正：[`REPLACE`拡張](../EMEE/EMEE_Summary.md#replace)による不具合の修正(eraTWのAAマップ表示エラーの原因になる)。
    * 仕様変更：[`HTML_SUBSTRING`](../Reference/HTML_SUBSTRING.md)(常に`1`)から文字列型(`RESULTS:0`と同じ)に変更。

=== "v8"

    * 機能拡張：[`XML_GET`](../Reference/XML_GET.md), [`REPLACE`](../EMEE/EMEE_Summary.md#replace)
    * バグ修正：[`XML_REMOVEATTRIBUTE`](../Reference/XML_REMOVEATTRIBUTE.md), [`VARSETEX`](../Reference/VARSETEX.md)
  
=== "v7"

    * [`HTML_STRINGLEN`](../Reference/HTML_STRINGLEN.md)機能拡張
    * [`REGEXPMATCH`](../Reference/REGEXPMATCH.md)機能拡張

=== "v6"

    * セキュリティ誤検出対策のため，[`WebP`](https://developers.google.com/speed/webp)ソリューションを[`ImageProcessor`](https://imageprocessor.org/)+`libwebp`に変更しまた。

=== "v5"

    * [`XML_SET`](../Reference/XML_SET.md), [`XML_GET`](../Reference/XML_SET.md)の説明文の修正。
    * [`XML_TOSTR`](../Reference/XML_TOSTR.md)の説明文追加。
    * 関数追加：[`XML_ADDNODE`](../Reference/XML_ADDNODE.md), [`XML_REMOVENODE`](../Reference/XML_REMOVENODE.md), [`XML_ADDATTRIBUTE`](../Reference/XML_ADDATTRIBUTE.md), [`XML_REMOVEATTRIBUTE`](../Reference/XML_REMOVEATTRIBUTE.md), [`XML_REPLACE`](../Reference/XML_REPLACE.md)。

=== "v4"

    * [`MAP_TOXML`](../Reference/MAP_SERIALIZATION.md)バグ修正。
    * 関数追加：[`MAP_CLEAR`](../Reference/MAP_OPERATION.md), [`MAP_SIZE`](../Reference/MAP_OPERATION.md), [`MAP_GETKEYS`](../Reference/MAP_GETKEYS.md), [`XML_TOSTR`](../Reference/XML_TOSTR.md)。
    * [`INPUT`系拡張](../EMEE/EMEE_Summary.md#input)機能の修正。

=== "v3"

    * 関数追加：[`EXISTFILE`](../Reference/EXISTFILE.md), [`MAP_CREATE`](../Reference/MAP_MANAGE.md), [`MAP_EXIST`](../Reference/MAP_MANAGE.md), [`MAP_RELEASE`](../Reference/MAP_MANAGE.md), [`MAP_GET`](../Reference/MAP_OPERATION.md), [`MAP_HAS`](../Reference/MAP_OPERATION.md), [`MAP_SET`](../Reference/MAP_OPERATION.md), [`MAP_REMOVE`](../Reference/MAP_OPERATION.md), [`MAP_TOXML`](../Reference/MAP_SERIALIZATION.md), [`MAP_FROMXML`](../Reference/MAP_SERIALIZATION.md)。

=== "v2"
    
    * `FUNCEXIST`を削除しました(EE版の[`EXISTFUNCTION`](../Reference/EXISTFUNCTION.md)を使ってください)
    * 関数名変更：`VAREXIST`→[`EXISTVAR`](../Reference/EXISTVAR.md)(`EXISTFUNCTION`と一致するため)
    * 関数追加：[`XML_DOCUMENT`](../Reference/XML_MANAGE.md), [`XML_RELEASE`](../Reference/XML_MANAGE.md), [`XML_SET`](../Reference/XML_SET.md), [`XML_EXIST`](../Reference/XML_MANAGE.md), [`XML_TOSTR`](../Reference/XML_TOSTR.md)。
    * `XML_GET` 第1引数が整数型になれるようにしまた。

=== "v1"

    * 初公開

## Emuera.EE
=== "v38"
	* 一部のフォントでGDRAWTEXT及びGGETTEXTSIZEの挙動が怪しいのを修正
	* EXISTFUNCTIONが大文字小文字無視のオプションに沿った挙動になるように
	* CRER氏の協力により.NET 7に正式対応。感謝

=== "v37"
	* UTF-8(BOM無し)のファイルを扱えるコンフィグ項目を追加
	* v36で行ったEXISTFUNCTIONの修正が処理時間に大きな影響を与えていたため、第二引数に非0を指定したときのみ大文字小文字を無視するように変更
	* TINPUT系でマウスクリックオプションを付けたときにタイマーの挙動が怪しいのを修正

=== "v36"
	* フォントファイル(ttf.otf)に対応
	* ENUMFUNC及びEXISTFUNCTIONで大文字小文字の表記揺れで正常に検索できない問題を修正

=== "v35fix"
	* BINPUTSの不具合を修正

=== "v35"
	* 再起動を繰り返すとメモリリークが起きる問題に対応するため、再起動処理を変更
	* タイプ初期化子エラーの原因が判明したためtry-catch式でエラーメッセージを出すように(WMPの未インストールが原因)
	* ERDの識別子とローカル変数の重複を確認するオプション項目を追加
	* PRINT中に改行せずに[`BINPUT`](../Reference/BINPUT.md)を実行した際に、その行をボタンとして認識しない不具合を修正

=== "v34"
	* [`GDASHSTYLE`](../Reference/GDASHSTYLE.md)追加

=== "v33"
	* [`GETDISPLAYLINE`](../Reference/GETDISPLAYLINE.md)追加
	* [`GCREATEFROMFILE`拡張](../Reference//README.md#gcreatefromfileに第三引数を指定することでemueraとの相対パスで画像を参照できるように)

=== "v32"
	* [`GDRAWLINE`](../Reference/GDRAWLINE.md)追加

=== "v31fix"
	* `BINPUT`と`div`機能を組み合わせると正常に動かない不具合を修正
	* `BINPUT`実行時にボタンが一つも無い場合はデフォルト値を返すように。デフォルト値も無ければ従来どおりエラー
	* `BINPUT`実行時になんらかの原因で画面描画が行われず`div`との併用ができなくなる不具合の修正

=== "v31"
	* [`BINPUT`及び`BINPUTS`](../Reference/BINPUT.md)命令追加

=== "v30"
	* [`SKIPLOG`](../Reference/SKIPLOG.md)命令追加
	* メニューアクセスのショートカットキーが効かなくなっていた不具合を修正

=== "v29"
	* `GCREATEFROMFILE`が機能しなくなっていたのを修正
	* EMの`div`機能で`margin`,`border`,`padding`を指定したときに`div`内の文字が追従しなかったのを修正
	* 翻訳辞書無効時にも内部処理が行われていて描画が重くなっていたのを修正
	* [`MOUSEB`](../Reference/MOUSEB.md)追加
	* [`SPRITEDISPOSEALL`](../Reference/SPRITEDISPOSEALL.md)追加

=== "v28"
	* `EM`のINPUT拡張が機能していなかったのを修正
	* `EE`独自に`INPUT`命令を拡張
	* [`FLOWINPUT`](../Reference/FLOWINPUT.md)追加

=== "v27"
	* `JukesBouver99`氏のパッチ提供で翻訳英語辞書に対応

=== "v26"
	* `GSETPEN`による[`GDRAWTEXT`](../Reference/GDRAWTEXT.md)機能拡張
	* [`GGETPEN`](../Reference//GGETPEN.md),[`GGETPENWIDTH`](../Reference/GGETPENWIDTH.md),[`GGETBRUSH`](../Reference/GGETBRUSH.md)追加
	* [ツールチップ機能拡張命令](../Reference/TOOLTIP_EXTENSION.md)追加

=== "v25"
	* `Emuera-Anchor`の[`Clipboard`機能](../EMEE/EMEE_Summary.md#emuera-anchorclipboard)を移植
	* 翻訳を補完

=== "v24"
	* [多言語化](../i18n/README.md)に対応(EMv14に同じく)
	* `GETNUM`を[多次元配列ERDに対応](../EMEE/EMEE_Summary.md#getnumerd)
	* [`ERDNAME`](../Reference//ERDNAME.md)追加

=== "v23"

    * [`ERD`機能](../EMEE/EMEE_Summary.md#erhcsverd)を二次元配列、三次元配列でも使えるように

=== "v22"

    * 仕様変更：[`ERD`機能](../EMEE/EMEE_Summary.md#erhcsverd)は一つの変数名に対し複数の定義ファイルの中に、同じ識別子が定義されている場合だけ、起動時にエラー吐いて終了する。ひとつの配列に複数の識別子を指定可能になる。
    * [`INPUTANY`](../Reference/INPUTANY.md)追加

=== "v21"

    * [`GETTEXTBOX`](../Reference/TEXTBOX.md), [`SETTEXTBOX`](../Reference/TEXTBOX.md)追加

=== "v20"

    * `ERD`読み込みの更に高速化
    * [`DAY`,`TIME`,`MONEY`に`CSV`を適用可能に](../EMEE/EMEE_Summary.md#daytimemoneycsv)

=== "v19"

    * `ERD`読み込みの高速化
    * デバッグコンソールで`_Rename.csv`を使えるように

=== "v18"

    * `INPUTMOUSEKEY`で文字列ボタンを扱えるように
    * `VariableSize.csv`で`COUNT`を使用禁止変数に設定できるように
    * キーマクロを`UTF-8`で保存するように

=== "v17"

    * `ERD`機能のオン/オフ切り替えオプション追加

=== "v16"

    * `ERD`機能の修正（CSV変数の添字から要素を取得できない不具合）
    * ホットキー機能拡張 `Emuera-Anchor`からの移植

=== "v15"

    * `ERD`機能の修正（ハードコーディング変数に定義されてない引数を定義した時の例外落ち）
    * `GDRAWTEXT`の修正（`GSETFONT`を使用せずに実行した場合の例外落ち）

=== "v14"

    * 関数追加：`GETMEMORYUSAGE`, `CLEARMEMORY`

=== "v13"

    * `ERD`機能追加

=== "v12"

    * 関数追加：`FORCE_BEGIN`
    * `PLAYSOUND`機能拡張 10チャンネルに対応

=== "v11fix"

    * `UPDATECHECK`修正

=== "v11"

    * 関数追加：`GDRAWGWITHROTATE`, `QUIT_AND_RESTART`, `FORCE_QUIT`, `FORCE_QUIT_AND_RESTART`

=== "v10"

    * 関数追加：`UPDATECHECK`

=== "v9"

    * WebPに対応

=== "v8"

    * 関数追加：`TRYCALLF`, `TRYCALLFORMF`

=== "v7"

    * 関数追加：`GGETTEXTSIZE`

=== "v6"

    * 関数追加：`EXISTFUNCTION`

=== "v5fix"

    * `OUTPUTLOG`機能拡張の脆弱性を修正

=== "v5"

    * `OUTPUTLOG`機能拡張

=== "v4"

    * 関数追加：`GGETFONT`, `GGETFONTSIZE`

=== "v3"

    * 関数追加：`GDRAWTEXT`

=== "v2"

    * `INPUTMOUSEKEY`機能拡張

=== "v1"

    初公開
    
    * 関数追加：`PLAYSOUND`,`STOPSOUND`,`PLAYBGM`,`STOPBGM`,`EXISTSOUND`,`SETSOUNDVOLUME`,`SETBGMVOLUME`
