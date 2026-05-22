---
hide:
  - toc
---

# TINPUT(S)

| 函数名                                                        | 参数                                   | 返回值   |
| :------------------------------------------------------------ | :------------------------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`TINPUT`](./TINPUT.zh.md)  | `int`, `int`(, `int`, `string`, `int`) | `int`    |
| ![](../assets/images/IconEmuera.webp)[`TINPUTS`](./TINPUT.zh.md) | `int`, `int`(, `int`, `string`, `int`) | `string` |

!!! info "API"

    ```  { #language-erbapi }
	TINPUT timeLimit, defaultValue(, displayTimeRemain, timeOverMessage, allowClick)
	TINPUTS timeLimit, defaultValue(, displayTimeRemain, timeOverMessage, allowClick)
    ```
	这是带有时间限制的输入接收命令。第一个参数是时间限制（毫秒），但即使设置小于100ms的值也无法精确运作。  
	第二个参数是超时时的默认返回值。  
	第三个参数控制是否显示剩余时间，0为不显示，其他值为显示。省略时默认为1（显示）。  
	第四个参数是超时时显示的字符串。如果为空字符串，则会清除计时器显示并继续执行后续处理。  
	请注意，如果设置了第四个参数，则不能省略第三个参数。  
	此外，在`TINPUTS`中，与[`INPUTS`](./INPUT.zh.md)一样，可以使用宏表达式。  
	若要在字符串中使用`()`，请使用``进行转义。

    EM+EE中可设置可选的第五个参数。  
    非0时，将鼠标点击视为回车键（向`RESULTS`赋值空字符串。若按下按钮，则将按钮索引赋值给`RESULTS:1`），左键点击时`RESULT:1`设为`1`，右键点击时`RESULT:1`设为`2`。同时，若按下++shift++、++ctrl++、++alt++，则将其按键状态保存至`RESULT:2`。（bit 16 17 18）

!!! hint "提示"

    仅支持指令。

### 相关项目
- [INPUT](INPUT.zh.md)
- [TONEINPUT](TONEINPUT.zh.md)