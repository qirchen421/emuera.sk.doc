---
hide:
  - navigation
---
# 変更ログ

## Emuera.EM

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

=== "v14"

    * `GETMEMORYUSAGE`、`CLEARMEMORY`追加

=== "v13"

    * `ERD`機能（`ERH`変数の配列に`CSV`変数のように名前を付けられる機能）追加