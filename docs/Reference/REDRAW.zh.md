---
hide:
  - toc
---

# REDRAW, CURRENTREDRAW

| 函数名                                                              | 参数 | 返回值 |
| :------------------------------------------------------------------ | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`REDRAW`](./REDRAW.zh.md)        | `int`| 无     |
| ![](../assets/images/IconEmuera.webp)[`CURRENTREDRAW`](./REDRAW.zh.md) | 无   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    REDRAW int
    int CUREENTREDRAW
    ```
	这是绘图控制命令。  
	当参数指定为`0`时，**抑制非强制性的绘图请求**（仅在需要用户输入的时刻等强制绘图时机进行绘图）。  
	当参数指定为`1`时，将如常进行绘图。此时非强制性的绘图若未满足[配置中的`每秒帧数`](../Emuera/config.zh.md#fps)所决定的最小间隔（`1000 / 每秒帧数` 毫秒），则不会绘图。  
	若在参数上加上`2`（例如`REDRAW 2`或`REDRAW 3`），则在上述效果的基础上，还会在执行`REDRAW`命令的瞬间强制进行绘图。  
	当前的`REDRAW`状态（`0`或`1`）可以通过`CURRENTREDRAW`获取。  

!!! info "详细"

	`REDRAW`只持有`0`（抑制）与`1`（常规）两种状态，`CURRENTREDRAW`也只返回`0`或`1`。  
	`REDRAW 1`仅恢复状态，**其本身不会进行绘图**。若想在`REDRAW`命令之后立刻绘图，请使用加上`2`的`REDRAW 3`。  
	`REDRAW 0`抑制的只是非强制性的绘图。进入等待用户输入的命令（`INPUT`・`INPUTS`・`INPUTSNF`・`TINPUT`系）时的绘图，以及鼠标移动到按钮上引起的绘图，都不受抑制。  

!!! warning "注意（批量绘图与滚动位置）"

	对于"先清掉、再重画"的画面（动画循环、动态地图等），请用`REDRAW 0`包住从清除到重绘的区间，并在进入输入等待之前恢复原状。

	```  { #language-erbapi }
	PREV_REDRAW = CURRENTREDRAW()
	REDRAW 0
	;	CLEARLINE 与重绘
	REDRAW PREV_REDRAW
	;	之后的输入等待会强制绘图
	```

	若不做批量绘图，清除已完成、重绘未完成的中途状态会被真的绘制出来。由于绘图同时会同步滚动位置，**画面将无法固定在最新行**（表现为行删掉又回来、窗口晃动）。  

	另外，请不要把`REDRAW 1`当作"恢复绘图"的收尾使用，它会覆盖调用方的设定。恢复请使用事先保存的值（`REDRAW PREV_REDRAW`）。  

!!! hint "提示"

    `CURRENTREDRAW`支持在表达式中作为函数使用。
