---
hide:
  - toc
---

# GETLINESTR

| 関数名                                                               | 引数     | 戻り値   |
| :------------------------------------------------------------------- | :------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`GETLINESTR`](./GETLINESTR.md) | `string` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string GETLINESTR pattern
    ```
	引数文字列を[`CUSTOMDRAWLINE`](./CUSTOMDRAWLINE.md)、[`DRAWLINEFORM`](./CUSTOMDRAWLINE.md)に渡した時に表示される文字列を返します。  
	この命令及び式中関数が返す文字列の長さが`1行に表示できる文字列長`に対応することは保証されません。  


!!! hint "ヒント"

    命令、式中関数両方対応しています。
