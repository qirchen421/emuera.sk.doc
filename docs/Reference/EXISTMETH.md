---
hide:
  - toc
---

# EXISTMETH

| 関数名                                                           | 引数 | 戻り値 |
| :--------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/Iconetc.webp)[`EXISTMETH`](./EXISTMETH.md)  | `string`| `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int EXISTMETH functionName
    ```
	式中関数があるか確認して`#FUNCTION`なら1、`#FUNCTIONS`なら2、なければ0を返します

!!! hint "ヒント"

    命令、式中関数両方対応しています。

### 関連項目
- [EXISTFUNCTION](EXISTFUNCTION.md)
- [GETMETH,GETMETHS](GETMETH.md)
