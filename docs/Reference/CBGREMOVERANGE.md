---
hide:
  - toc
---

# CBGREMOVERANGE

| 関数名                                                                       | 引数         | 戻り値 |
| :--------------------------------------------------------------------------- | :----------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGREMOVERANGE`](./CBGREMOVERANGE.md) | `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBGREMOVERANGE zMin, zMax
    ```
	[`CBGSETG`](./CBGSETG.md)、[`CBGSETSPRITE`](./CBGSETSPRITE.md)、[`CBGSETBUTTONSPRITE`](./CBGSETBUTTONSPRITE.md)命令で設定した画像のうち、Z深度が`zMin`以上`zMax`以下である画像を設定解除します。

!!! hint "ヒント"

    命令、式中関数両方対応しています。
