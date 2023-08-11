---
hide:
  - toc
---

# FINDELEMENT

| 関数名                                                                     | 引数                                         | 戻り値 |
| :------------------------------------------------------------------------- | :------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`FINDELEMENT`](./FINDELEMENT.md)     | `variable`, `value`(, `int`, `int`, `int`)   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`FINDLASTELEMENT`](./FINDELEMENT.md) | `variable`, `value`(, `int`, `int`, `int`)   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	FINDELEMENT variableName, value(, startIndex, endIndex, completeMatch)
	FINDLASTEELEMENT variableName, value(, startIndex, endIndex, completeMatch)
    ```
	配列中の特定範囲から特定の要素の位置を取得する関数です。  
	`value`は`variableName`と同じ型である必要があります。  
	`startIndex`、`endIndex`で指定された配列要素の検索範囲に`value`で指定された内容と同じ要素があれば、その位置を返します。  
	`endIndex`を省略した場合、配列の最後までを対象とします。  
	複数ある場合は`FINDELEMENT`は最初にヒットしたものを、  
	`FINDLASTELEMENT`は最後にヒットしたものを返します。ヒットしない場合は`-1`を返します。  
	検索対象が文字列型の場合は[`REPLACE`](./REPLACE.md)と同様に正規表現を使えます。  
	`completeMatch`は検索対象が文字列型の場合のみ有効で、`0`であれば文字列の一部が一致でもOKとし、  
	`0`以外であれば文字列と完全に一致した場合のみOKとします。  

	`variableName`に指定できるものは1次元配列変数のみで多次元配列は指定できません。  
	`variableName`にCFLAGなどのキャラクタ配列を指定した場合、指定されたキャラについてのみ数え上げます。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
