---
hide:
  - toc
---

# SKIP系

| 函数名                                                               | 参数 | 返回值 |
| :------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SKIPDISP`](./SKIP_RELATE.md)  | `int`| 无     |
| ![](../assets/images/IconEmuera.webp)[`NOSKIP`](./SKIP_RELATE.md)    | 无   | 无     |
| ![](../assets/images/IconEmuera.webp)[`ENDNOSKIP`](./SKIP_RELATE.md) | 无   | 无     |
| ![](../assets/images/IconEmuera.webp)[`ISSKIP`](./SKIP_RELATE.md)    | 无   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MOUSESKIP`](./SKIP_RELATE.md) | 无   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MESSKIP`](./SKIP_RELATE.md)   | 无   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	SKIPDISP bool
	NOSKIP
	ENDNOSKIP
	int ISSKIP
	int MOUSESKIP
	int MESSKIP
    ```
	PRINT等画面输出指令以及WAIT、TWAIT等与控制相关的指令群。

	- `SKIPDISP` <数值>
		- 参数：`0` = 设置为不忽略
			- 非0值 = 设置为忽略
		- 说明：设置此标志后，[`PRINT`](./PRINT.md)等输出将完全不会执行。
			- 此外，在此标志被设置期间，若执行到[`INPUT`及`INPUTS`](./INPUT.md)指令，
			- 考虑到用户将无从得知应如何操作，且跳过可能导致无限循环，
			- 系统会显示警告信息及处理方法，并引发错误。

    在当前普遍使用的角色对话实现中，当对话内容可以隐藏时，  
    显示与隐藏状态下命令的执行结果或行为可能会发生变化。  
    因此，若在设置此标志后调用对话，则除了显示部分外，其他处理仍会执行，  
    从而可以确保在显示/隐藏状态下获得一致的行为。  
    若遇到与[`INPUT/INPUTS`](./INPUT.md)冲突的情况，可采取以下措施：  
    使用下述的`NOSKIP～ENDNOSKIP`包裹相关代码，  
    或先执行`SKIPDISP 0`，在`INPUT`处理后再执行`SKIPDISP 1`（原则上推荐前者）。  
    顺便一提，当前是否设置了忽略标志可通过`ISSKIP`获取。  
    从ver1.808开始，即使将其紧接在[`SIF`](./IF.md)语句之后也能正常工作。  
    需要注意的是，使用`SKIPDISP`时，无论参数如何，`RESULT:0`都会被重置为`0`，此为既定规格。  

    `NOSKIP～ENDNOSKIP`可用于指定忽略显示相关标志的代码区间。  
    被这两个命令包裹的区间，即使在`SKIPDISP 1`状态下，显示等操作也会正常执行。  
    主要用于需要`INPUT`输入的场景。  
    此外，此命令不会影响`SKIPDISP`的状态，  
    因此在可能设置`SKIPDISP`标志的环境下（例如包含显示/隐藏功能的角色对话相关代码），  
    使用此命令可以确保必须显示的内容能够正确显示。  

    `ISSKIP`会在`SKIPDISP`标志为非`0`值（即忽略`PRINT`等输出）时，将`1`赋值或返回给`RESULT:0`，否则为`0`。

    `MOUSESKIP` 已在 Emuera 1.810 版本中合并到 `MESSKIP`。  
    请使用 `MESSKIP`。  
    此函数过去曾执行如下处理：

        如果按下右键并处于 WAIT 跳过状态，则返回 1，否则返回 0。
        在宏处理期间的跳过中返回 0。
        如果宏处理的跳过与右键按下冲突，则优先宏处理并返回 0。
        现在，无论是由 Esc 键还是右键引起的跳过，均不加以区分并返回 1。

    `MESSKIP` 在处于 [`WAIT`](./WAIT.md) 跳过状态时返回 `1`，否则返回 `0`。

!!! hint "提示"

    `ISSKIP`、`MOUSESKIP`、`MESSKIP` 支持在表达式中作为函数使用。