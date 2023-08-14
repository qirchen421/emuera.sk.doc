---
hide:
  - toc
---

# MONEYSTR

| 関数名                                                             | 引数              | 戻り値  |
| :----------------------------------------------------------------- | :---------------- | :------ |
| ![](../assets/images/IconEmuera.webp)[`MONEYSTR`](./MONEYSTR.md)   | `int`, `option`   | `string`|

!!! info "API"

    ```  { #language-erbapi }
	string MONEYSTR
    ```
	引数で与えられた数値に対して、[設定されたお金の単位](../Emuera/replace.md#_1)を付けた文字列を`RESULTS:0`に代入もしくは返します。  
	単位の前置・後置も自動的に処理します。  
	第2引数は[`TOSTR`](./TOSTR.md)命令と同様の数値の文字列化における変換書式指定子となります。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
