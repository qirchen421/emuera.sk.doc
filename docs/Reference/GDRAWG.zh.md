---
hide:
  - toc
---

# GDRAWG

| 函数名                                                       | 参数                                                                                    | 返回值 |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GDRAWG`](./GDRAWG.zh.md) | `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`                    | `int`  |
|                                                              | `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `integerVariable` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GDRAWG destID, srcID, destX, destY, destWidth, destHeight, srcX, srcY, srcWidth, srcHeight
	int GDRAWG destID, srcID, destX, destY, destWidth, destHeight, srcX, srcY, srcWidth, srcHeight, colorMatrix
    ```
    将指定的 `srcID` 对应的 `Graphics` 绘制到指定的 `destID` 对应的 `Graphics` 上。  
    通过四个整数指定目标 `dest` `Graphics` 的位置和大小，通过另外四个整数指定源 `src` `Graphics` 的位置和大小。  
    可选地，可以通过指定一个 5x5 或更大的二维数值数组作为 `colorMatrix` 来应用颜色矩阵进行绘制。  
    `colorMatrix` 的所有元素会除以 256 后传递给 .Net Framework 的 `ColorMatrix` 类。也就是说，对角线元素全为 256 的 5x5 矩阵是单位矩阵。  
    处理成功时，返回非 0 值。  
    当目标 `Graphics` 或源 `Graphics` 中任意一个未创建等情况下，返回 0。  
    目标 `Graphics` 和源 `Graphics` 可以是同一个。

!!! hint "提示"

    命令和表达式函数均支持。

### 相关项目
- [GDRAWSPRITE](GDRAWSPRITE.zh.md)