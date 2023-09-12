---
hide:
  - toc
---

# GETCONFIG(S)

| 関数名                                                              | 引数     | 戻り値   |
| :------------------------------------------------------------------ | :------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`GETCONFIG`](./GETCONFIG.md)  | `string` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETCONFIGS`](./GETCONFIG.md) | `string` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	int GETCONFIG configWord
	strimng GETCONFIGS configWord
    ```
	コンフィグ及び[`replace.csv`](../Emuera/replace.md)の設定項目を整数または文字列で取得します。  
	取得可能な項目は[コンフィグ](../Emuera/config.md)のページを参照してください。

!!! hint "ヒント"

    命令、式中関数両方対応しています。
