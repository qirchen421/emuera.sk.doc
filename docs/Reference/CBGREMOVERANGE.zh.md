---
hide:
  - toc
---

# CBGREMOVERANGE

| 函数名                                                                       | 参数         | 返回值 |
| :--------------------------------------------------------------------------- | :----------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGREMOVERANGE`](./CBGREMOVERANGE.md) | `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBGREMOVERANGE zMin, zMax
    ```
	解除由 [`CBGSETG`](./CBGSETG.md)、[`CBGSETSPRITE`](./CBGSETSPRITE.md)、[`CBGSETBUTTONSPRITE`](./CBGSETBUTTONSPRITE.md) 命令设置的图像中，Z深度在 `zMin` 以上 `zMax` 以下（含）的图像。

!!! hint "提示"

    该函数同时支持在命令和表达式中使用。