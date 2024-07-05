---
hide:
  - toc
---

# GETNUM

| 関数名                                                       | 引数                 | 戻り値 |
| :----------------------------------------------------------- | :------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETNUM`](./GETNUM.md) | `variable`, `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	GETNUM variableName, indexName
    ```
	各csvで定義されている名称からその数値を取得し、`RESULT:0`に代入します。  
	例えば、`abl.csv`で`2,技巧`が定義されていれば、`GETNUM ABL, "技巧"`の結果、`RESULT:0`に`2`が代入されます。  
	定義されていない場合は`-1`になります。  
	csvと変数の対応は[「Emueraで追加された記法」のページの「文字列による配列変数の要素の指定」](../Emuera/expression.md#_10)に準じます。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。

### 関連項目
- [CSVステータス系](CSV_STATUS.md)
