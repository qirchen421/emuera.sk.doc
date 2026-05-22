---
hide:
  - toc
---

# TONEINPUT

| 函数名                                                             | 参数                                        | 返回值   |
| :----------------------------------------------------------------- | :------------------------------------------ | :------- |
| ![](../assets/images/IconEmuera.webp)[`TONEINPUT`](./TONEINPUT.zh.md) | `int`, `int`(, `int`, `string`, `int`)      | `int`    |
| ![](../assets/images/IconEmuera.webp)[`TONEINPUTS`](./TONEINPUT.zh.md) | `int`, `string`(, `int`, `string`, `int`)  | `string` |

!!! info "API"

    ```  { #language-erbapi }
	TONEINPUT timeLimit, defaultValue(, displayTimeRemain, timeOverMessage, allowClick)
	TONEINPUTS timeLimit, defaultValue(, displayTimeRemain, timeOverMessage, allowClick)
    ```
	参数分别与 [`TINPUT`、`TINPUTS`](./TINPUT.zh.md) 相同。  
	这是兼具 [`ONEINPUT`](./ONEINPUT.zh.md) 与 TINPUT、[`ONEINPUTS`](./ONEINPUT.zh.md) 与 TINPUTS 性质的输入接收命令。  
	使用这些命令时，即使在 Emuera 的 CONFIG 设置中启用了键盘宏功能，  
	也可能出现无法正常工作的情况，这是已知的特性。  
	此外，在 `TONEINPUTS` 中，与 [`INPUTS`](./INPUT.zh.md) 一样，可以使用宏表达式。  
	若要在字符串中使用 `()`，请使用 `\` 进行转义。

	在EM+EE中，第5个参数变为可选设置。  
	当该参数非0时，将鼠标点击视为回车键（向`RESULTS`赋值空字符串。若按下按钮，则将按钮的索引赋值给`RESULTS:1`），左键点击时`RESULT:1`设为`1`，右键点击时`RESULT:1`设为`2`。同时，若按下++shift++、++ctrl++、++alt++键，则将该按键状态保存到`RESULT:2`中。（bit 16 17 18）  

!!! hint "提示"

    仅支持命令形式。

### 相关项目
- [TINPUT](TINPUT.zh.md)
- [ONEINPUT](ONEINPUT.zh.md)