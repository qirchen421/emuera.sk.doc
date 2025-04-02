---
hide:
  - toc
---

# GETMETH,GETMETHS

| 関数名                                                       | 引数                                | 戻り値    |
| :----------------------------------------------------------- | :---------------------------------- | :-------- |
| ![](../assets/images/Iconetc.webp)[`GETMETH`](./GETMETH.md)  | `string`(, `int`, `argument`...)    | `int`     |
| ![](../assets/images/Iconetc.webp)[`GETMETHS`](./GETMETH.md) | `string`(, `string`, `argument`...) | `string`  |

!!! info "API"

    ```  { #language-erbapi }
	int GETMETH functionName(, defaultValue, argument...)
	string GETMETHs functionName(, defaultValue, argument...)
    ```
	式中関数を文字列から呼び出すことができます。`GETMETH`は`#FUNCTION`に、`GETMETHS`は`#FUNCTIONS`にそれぞれ対応しています。  
	第二引数は関数が見つからなかった場合の返り値で、第三引数移行が第一引数で指定した式中関数への引数となります。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

### 関連項目
- [GETVAR,GETVARS,SETVAR](GETSETVAR.md)
