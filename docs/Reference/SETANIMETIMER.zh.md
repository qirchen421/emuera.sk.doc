---
hide:
  - toc
---

# SETANIMETIMER / GETANIMETIMER

| 函数名                                                                         | 参数  | 返回值 |
| :----------------------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SETANIMETIMER`](./SETANIMETIMER.zh.md)     | `int` | 无     |
| ![](../assets/images/IconSK.webp)[`GETANIMETIMER`](./SETANIMETIMER.zh.md)     | 无    | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	SETANIMETIMER time
	int GETANIMETIMER
    ```
	为动画精灵指定以毫秒为单位的重绘间隔。  
	Emuera 通常不会在 [`INPUT`](./INPUT.zh.md) 等输入等待期间进行重绘。  
	通过此命令设置重绘间隔，可以在 `INPUT` 等输入等待期间使图像产生动画效果。  
	注意，在 [`TINPUT`](./TINPUT.zh.md) 等具有超时处理的命令中不会进行重绘。  
	实际的重绘间隔会因计算机状态而略慢于指定的时间。  
	因此，若将重绘间隔设置为与动画的 `delay` 值相同，会导致频繁丢帧。  
	请指定一个比 `delay` 值短得多的间隔。  

	此命令与配置中的 `每秒帧数` 设置无关。  
	同时，它不受 [`REDRAW`](./REDRAW.zh.md) 命令的重绘抑制效果影响。  

	**GETANIMETIMER**：返回当前动画计时器的值（毫秒）。支持命令和表达式函数两种形式。

!!! hint "提示"

    `SETANIMETIMER` 仅支持命令。`GETANIMETIMER` 支持命令和表达式函数两种形式。

!!! skia "Skia版的变更"

    | 项目 | EM+EE | Skia版 |
    |:---|:---|:---|
    | `SETANIMETIMER` | 式中函数（返回值: 总是`1`） | 命令（无返回值） |
    | `GETANIMETIMER` | ❌ 不存在 | ✅ 式中函数（返回当前计时器值） |

    EM+EE 中 `SETANIMETIMER` 作为式中函数实现，可以使用 `RESULT = SETANIMETIMER(100)` 的方式调用。Skia 版将其重构为命令，因此这种写法会编译报错。

### 相关项目
- [命令 vs 表达式 — 两种求值路径的根本差异](../tutorial/command-vs-expression.zh.md) — RESULT 污染问题与式中函数重构为命令的原因
- [SPRITEANIMECREATE](SPRITEANIMECREATE.zh.md)
- [Skia版规格变更一览](../Skia/Skia_Summary.zh.md#changed-commands)