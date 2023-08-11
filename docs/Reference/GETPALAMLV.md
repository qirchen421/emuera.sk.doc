---
hide:
  - toc
---

# GETPALAMLV, GETEXPLV

| 関数名                                                               | 引数         | 戻り値 |
| :------------------------------------------------------------------- | :----------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETPALAMLV`](./GETPALAMLV.md) | `int`, `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETEXPLV`](./GETPALAMLV.md)   | `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	GETPALAMLV int, maxLV
	GETEXPLV int, maxLV
    ```
	与えられた値の内容と`PALAMLV`・`EXPLV`を比較し、その引数が`PALAMLV`・`EXPLV`でどこまで以上かを`RESULT:0`に代入します。  
	第2引数は調査する最大のLVを表します。`PALAMLV`・`EXPLV`の値を設定してから使用してください。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
