---
hide:
  - toc
---

# GCREATE

| 関数名                                                         | 引数                | 戻り値 |
| :------------------------------------------------------------- | :------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`GCREATE`](./GCREATE.md) | `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GCREATE gID, width, height
    ```
	指定したサイズで指定した`gID`の`Graphics`を作成します。  
	`Graphics`の`gID`は0以上の整数、`width`、`height`は1以上8192以下の間の整数値でなければなりません。  
	引数がこの範囲を外れるとエラーです。  
	作成に成功した場合、非0を返します。  
	指定した`gID`の`Graphics`が既に作成されている場合、0を返します。  
	`Graphics`を作り直す場合は[`GDISPOSE`](./GDISPOSE.md)命令で既存の`Graphics`を廃棄してください。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
