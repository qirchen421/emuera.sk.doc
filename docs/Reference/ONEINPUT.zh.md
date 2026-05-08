---
hide:
  - toc
---

# ONEINPUT(S)

| 函数名                                                             | 参数              | 返回值   |
| :----------------------------------------------------------------- | :---------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`ONEINPUT`](./ONEINPUT.md)   | `int`(, `int`)    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`ONEINPUTS`](./ONEINPUT.md)  | `string`(, `int`) | `string` |

!!! info "API"

    ```  { #language-erbapi }
	ONEINPUT defaultValue
	ONEINPUTS defaultValue
    ```
	单字符限定输入自动处理指令 `ONEINPUT`、`ONEINPUTS`  
	格式：`ONEINPUT` 或 `ONEINPUTS`  
	功能：仅接受单个字符的输入，输入后自动进行下一步处理

    使用粘贴等方式一次性输入多位数（多个字符）时，仅第一个数字（字符）会被视为有效输入进行处理。  
    与`INPUT`和`INPUTS`类似，可以通过参数设置输入空字符串时的默认值。  
    但是，当`ONEINPUT`指定了负值，或`ONEINPUTS`指定了空字符串时，参数将无效，行为与无参数时相同。  
    此外，若参数为多位数（多个字符），则仅第一个数字（字符）会被作为默认值。  
    省略参数并输入空字符串时，`ONEINPUT`会要求重新输入，`ONEINPUTS`则会将空字符串赋值给`RESULTS`并继续执行后续处理，这与通常行为一致。  
    对于`ONEINPUTS`，即使直接按Enter键保持空字符串，也会被视为输入了空字符串。  
    需要注意的是，使用这些指令时，即使Emuera的CONFIG设置中启用了键盘宏功能，  
    也可能出现无法正常工作的情况，这是预期行为。  
    此外，在`ONEINPUTS`中，与`INPUTS`一样可以使用宏表达式。  
    若需将`()`作为字符串使用，请使用`\`进行转义。

!!! hint "提示"

    仅支持命令。
### 相关项目
- [INPUT](INPUT.md)
- [WAITANYKEY](WAITANYKEY.md)