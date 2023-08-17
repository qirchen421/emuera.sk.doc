---
hide:
  - toc
---

# EXISTCSV

| 関数名                                                           | 引数 | 戻り値 |
| :--------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`EXISTCSV`](./EXISTCSV.md) | `int`| `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int EXISTCSV charaNO
    ```
	対応するキャラが定義されているかどうかをチェックし`RESULT:0`に代入もしくは返します。  
	定義されていれば`1`、されていなければ`0`を返します。  
	`ADDCHARA no`がエラーにならずに実行できるかどうかを調べることができます。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
