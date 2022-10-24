---
hide:
  - navigation
  - toc
---
# 変更ログ

## Emuera.EM

=== "v15"

    * 関数追加：[`DataTable`系関数](../Reference/README.md#datatable)を追加。
    * バグ修正：フォントサイズが`16`以外の時入力欄の表示不具合を修正。
    * バグ修正：ユーザー指定アイコンのアルファチャンネル情報が無効の不具合を修正。

=== "v14fix"

    * バグ修正：一部キーボード入力が無効の不具合を修正。

=== "v14"

    * [私家版v16](https://ux.getuploader.com/ninnohito/download/482)へのアップデート。
    * 機能拡張：[`GCLEAR`](../Reference/README.md#gclear)で指定区域を指定した色で置き換えるように。
    * 機能拡張：[Emueraアイコン指定機能](../Reference/README.md#emuera)。
    * 機能拡張：[`STATIC_MAPS`/`STATIC_MAPS`](../Reference/README.md#xmlmapdatatable)が指定できるように。

=== "v13fix"

    * バグ修正：機能拡張による`PRINT_IMG`と`<img>`タグの画像表示の不具合を修正。

=== "v13"

    * 機能拡張：HTML画像系パラメータ[書式拡張](../Reference/README.md#html_print)。
    * 機能拡張：[`PRINT_IMG`引数追加](../Reference/README.md#html_printprint)。

=== "v12"

    * 機能拡張：「[セーブデータを圧縮して保存する](../Reference/README.md#_5)」コンフィグ機能追加。
    * 機能拡張：[XML、MAPがセーブデータの中で保存](../Reference/README.md#xmlmapdatatable)可能。
    * 仕様変更：[XML系の命令](../Reference/README.md#xml)の仕様を変更し、文字列のIDを使うようにした，古いバージョンとの互換性あり。

=== "v11"

    * HTMLタグ属性追加：`<clearbutton>`に[`notooltip`](../Reference/README.md#html_print)属性追加。

=== "v10"

    * HTMLタグ追加：[`<clearbutton>`](../Reference/README.md#html_print)。
    * 性能向上：アルゴリズム修正による[`XML_GET`](../Reference/XML_GET.md)の性能向上。

=== "v9"

    * 関数追加：[`ENUMFILES`](../Reference/ENUMFILES.md)。

=== "v8c"

    * バグ修正：`libwebp.dll`バージョンアップ，一部`Win11`に`webp`ファイルが読み込めない問題に対応。

=== "v8b"

    * バグ修正：[`REPLACE`拡張](../Reference/README.md#replace)による不具合の修正(eraTWのAAマップ表示エラーの原因になる)。
    * 仕様変更：[`HTML_SUBSTRING`](../Reference/HTML_SUBSTRING.md)(常に`1`)から文字列型(`RESULTS:0`と同じ)に変更。

=== "v8"

    * 機能拡張：[`XML_GET`](../Reference/XML_GET.md), [`REPLACE`](../Reference/README.md#replace)
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
    * [`INPUT`系拡張](../Reference/README.md#input)機能の修正。

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
=== "V24"
	* [多言語化](../i18n/README.md)に対応(EMv14に同じく)
	* `GETNUM`を[多次元配列ERDに対応](../Reference/README.md#getnumerd)
	* [`ERDNAME`](../Reference//ERDNAME.md)追加

=== "v23"

    * [`ERD`機能](../Reference/README.md#erhcsverd)を二次元配列、三次元配列でも使えるように

=== "v22"

    * 仕様変更：[`ERD`機能](../Reference/README.md#erhcsverd)は一つの変数名に対し複数の定義ファイルの中に、同じ識別子が定義されている場合だけ、起動時にエラー吐いて終了する。ひとつの配列に複数の識別子を指定可能になる。
    * [`INPUTANY`](../Reference/INPUTANY.md)追加

=== "v21"

    * [`GETTEXTBOX`](../Reference/GETTEXTBOX.md), [`SETTEXTBOX`](../Reference/SETTEXTBOX.md)追加

=== "v20"

    * `ERD`読み込みの更に高速化
    * [`DAY`,`TIME`,`MONEY`に`CSV`を適用可能に](../Reference/README.md#daytimemoneycsv)

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
