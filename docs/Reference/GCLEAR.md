---
hide:
  - toc
---

# GCLEAR

| 関数名                                                       | 引数         | 戻り値 |
| :----------------------------------------------------------- | :----------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GCLEAR`](./GCLEAR.md) | `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GCLEAR gID, cARGB
    ```
	指定した`gID`の`Graphics`の全域を指定した色で置き換えます。
	処理に成功した場合、非0を返します。
	`gID`又は色指定が不適切な場合はエラーになります。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

### 関連項目
- [GSETCOLOR](GSETCOLOR.md)
