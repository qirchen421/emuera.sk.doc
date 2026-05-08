---
hide:
  - toc
---

# SETANIMETIMER

| 函数名                                                                     | 参数  | 返回值 |
| :------------------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SETANIMETIMER`](./SETANIMETIMER.md) | `int` | 无     |

!!! info "API"

    ```  { #language-erbapi }
	SETANIMETIMER time
    ```
	为动画精灵指定以毫秒为单位的重绘间隔。  
	Emuera 通常不会在 [`INPUT`](./INPUT.md) 等输入等待期间进行重绘。  
	通过此命令设置重绘间隔，可以在 `INPUT` 等输入等待期间使图像产生动画效果。  
	注意，在 [`TINPUT`](./TINPUT.md) 等具有超时处理的命令中不会进行重绘。  
	实际的重绘间隔会因计算机状态而略慢于指定的时间。  
	因此，若将重绘间隔设置为与动画的 `delay` 值相同，会导致频繁丢帧。  
	请指定一个比 `delay` 值短得多的间隔。  

	此命令与配置中的 `每秒帧数` 设置无关。  
	同时，它不受 [`REDRAW`](./REDRAW.md) 命令的重绘抑制效果影响。  

!!! hint "提示"

    仅支持命令。

### 相关项目
- [SPRITEANIMECREATE](SPRITEANIMECREATE.md)