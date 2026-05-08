---
hide:
  - toc
---

# CBGSETBMAPG

| 函数名                                                                 | 参数  | 返回值 |
| :--------------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGSETBMAPG`](./CBGSETBMAPG.md) | `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int CBGSETBMAPG gID
    ```
    将`gID`指定的`Graphics`设置为客户端区域的按钮映射。  
    此处设置的按钮映射会影响[`CBGSETBUTTONSPRITE`](./CBGSETBUTTONSPRITE.md)命令及[`INPUTMOUSEKEY`](./INPUTMOUSEKEY.md)命令。  
    按钮映射图像不会显示，但会像[`CBGSETG`](./CBGSETG.md)命令设置的图像一样，使画面左下角与图像左下角对齐进行放置。  
    鼠标光标正下方的按钮映射图像的颜色，将被识别为按钮的值。  
    但是，当颜色的Alpha值不为255（透明或半透明）时，将不会被识别为按钮的值。

!!! hint "提示"

    该函数同时支持命令和表达式函数两种形式。