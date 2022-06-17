---
hide:
  - navigation
---
# 変更ログ

## Emuera.EM

=== "v8"

    * 機能拡張：`XML_GET`, `REPLACE`
    * バグ修正：`XML_REMOVEATTRIBUTE`, `VARSETEX`
  
=== "v7"

    * `HTML_STRINGLEN`機能拡張
    * `REGEXPMATCH`機能拡張

=== "v6"

    * セキュリティ誤検出対策のため，[`WebP`](https://developers.google.com/speed/webp)ソリューションを[`ImageProcessor`](https://imageprocessor.org/)+`libwebp`に変更しまた。

=== "v5"

    * `XML_SET`, `XML_GET`の説明文の修正。
    * `XML_TOSTR`の説明文追加。
    * 関数追加：`XML_ADDNODE`, `XML_REMOVENODE`, `XML_ADDATTRIBUTE`, `XML_REMOVEATTRIBUTE`, `XML_REPLACE`。

=== "v4"

    * `MAP_TOXML`バグ修正。
    * 関数追加：`MAP_CLEAR`, `MAP_SIZE`, `MAP_GETKEYS`, `XML_TOSTR`。
    * `INPUT`系拡張機能の修正。

=== "v3"

    * 関数追加：`EXISTFILE`, `MAP_CREATE`, `MAP_EXIST`, `MAP_RELEASE`, `MAP_GET`, `MAP_HAS`, `MAP_SET`, `MAP_REMOVE`, `MAP_TOXML`, `MAP_FROMXML`。

=== "v2"
    
    * `FUNCEXIST`を削除しました(EE版の`EXISTFUNCTION`を使ってください)
    * 関数名変更：`VAREXIST`→`EXISTVAR`(`EXISTFUNCTION`と一致するため)
    * 関数追加：`XML_DOCUMENT`, `XML_RELEASE`, `XML_SET`, `XML_EXIST`, `XML_TOSTR`。
    * `XML_GET` 第1引数が整数型になれるようにしまた。

=== "v1"

    * 初公開

## Emuera.EE

=== "v16"

	* ERD機能の修正（CSV変数の添字から要素を取得できない不具合）
	* ホットキー機能拡張 Emuera-Anchorからの移植

=== "v15"

	* ERD機能の修正（ハードコーディング変数に定義されてない引数を定義した時の例外落ち）
	* GDRAWTEXTの修正（GSETFONTを使用せずに実行した場合の例外落ち）

=== "v14"

	* 関数追加：`GETMEMORYUSAGE`, `CLEARMEMORY`

=== "v13"

	* ERD機能追加

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
