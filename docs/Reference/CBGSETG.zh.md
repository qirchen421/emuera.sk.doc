---
hide:
  - toc
---

# CBGSETG

| 函数名                                                         | 参数                       | 返回值 |
| :------------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGSETG`](./CBGSETG.md) | `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBGSETG gID, x, y, zDepth
    ```
    将指定`gID`的`Graphics`设置为在客户端区域内显示。  
    当`x`和`y`指定为0时，图像左下角将与客户端区域的左下角对齐显示。  
    `x`的正方向为右，`y`的正方向为下，`zDepth`的正方向为屏幕纵深方向（向里）。  
    `zDepth`必须指定非零值。通常的文字绘制相当于`zDepth==0`，如果`zDepth`为负值，则会在文字的前方绘制。

!!! hint "提示"

    此函数同时支持作为命令和表达式内函数使用。

### 相关项目
- [CBGSETSPRITE](CBGSETSPRITE.md)
- [CBGCLEAR](CBGCLEAR.md)