---
hide:
  - toc
---

# CBGSETSPRITE

| 函数名                                                                   | 参数                          | 返回值 |
| :----------------------------------------------------------------------- | :---------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGSETSPRITE`](./CBGSETSPRITE.md) | `string`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBGSETSPRITE, spriteName, x, y, zDepth
    ```
    将指定资源名`spriteName`对应的精灵（sprite）设置为在客户端区域显示。  
    当`x`和`y`指定为0时，精灵将显示在客户端区域的左下角，且其左下角与区域左下角对齐。  
    `x`轴正方向为右，`y`轴正方向为下，`zDepth`轴正方向为屏幕向里（远离观察者）。  
    `zDepth`必须指定非零值。通常的文字绘制相当于`zDepth==0`，若`zDepth`为负值，则精灵将绘制在文字的前方。

!!! hint "提示"

    此函数同时支持作为命令和表达式函数使用。

### 相关项目
- [CBGSETG](CBGSETG.md)
- [CBGCLEAR](CBGCLEAR.md)