---
hide:
  - toc
---

# GDRAWGWITHMASK

| 函数名                                                                       | 参数                              | 返回值 |
| :--------------------------------------------------------------------------- | :-------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GDRAWGWITHMASK`](./GDRAWGWITHMASK.md) | `int`, `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	GDRAWGWITHMASK destID, srcID, maskID, destX, destY
    ```
	在指定的 `destID` 的 `Graphics` 上，使用 `maskID` 的 `Graphics` 作为蒙版，绘制 `srcID` 的 `Graphics`。  
	通过 `destX, destY` 指定在输出目标 `destID` 的 `Graphics` 内的绘制位置。  
	处理成功时，返回非 0 值。  
	成功的条件是：`srcID` 与 `maskID` 的宽度和高度必须完全一致，且绘制区域不能超出 `destID` 的范围。  
	所谓“应用蒙版绘制”，具体是指将蒙版图像的蓝色通道值作为不透明度应用到源图像上进行绘制。  
	例如，如果蒙版图像完全是纯白色（即所有位置的蓝色通道值均为最大值），则源图像将像没有蒙版一样被原样绘制。  
	如果蒙版图像完全是纯黑色（即所有位置的蓝色通道值均为 0），则源图像将被视为完全透明，不会发生任何绘制。  
	此命令的处理由 CPU 单线程完成，而非 GPU。请不要对其速度抱有期待。

!!! hint "提示"

    命令和表达式函数均支持。