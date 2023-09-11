---
hide:
  - toc
---

# GDISPOSE

| 関数名                                                           | 引数  | 戻り値 |
| :--------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GDISPOSE`](./GDISPOSE.md) | `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GDISPOSE gID
    ```
	指定した`gID`の`Graphics`を廃棄します。  
	廃棄に成功した場合、非0を返します。  
	指定した`gID`の`Graphics`が未作成（廃棄済の場合を含む）の場合、0を返します。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
