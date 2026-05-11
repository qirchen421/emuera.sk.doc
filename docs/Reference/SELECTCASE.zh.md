---
hide:
  - toc
---

# SELECTCASE

| 函数名                                                               | 参数  | 返回值 |
| :------------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SELECTCASE`](./SELECTCASE.md) | `any` | 无     |
| ![](../assets/images/IconEmuera.webp)[`CASE`](./SELECTCASE.md)       | `any` | 无     |
| ![](../assets/images/IconEmuera.webp)[`CASEELSE`](./SELECTCASE.md)   | 无    | 无     |
| ![](../assets/images/IconEmuera.webp)[`ENDSELECT`](./SELECTCASE.md)  | 无    | 无     |

!!! info "API"

    ```  { #language-erbapi }
	SELECTCASE anyValue
	CASE anyValue(, anyValue...)
	CASEELSE
	ENDSELECT
    ```
	这是一个分支结构。其行为模仿了 Visual Basic 的同名结构。  
	它与 [`IF`](./IF.md) 结构类似，但 `SELECTCASE` 是根据一个值分支到多行代码的结构。  
	根据 `SELECTCASE` 指定的参数值进行分支。最简单的用法如下所示。  

    ```  { #language-erbapi }
	SELECTCASE X  
		CASE 1  
			PRINTL X是1。  
		CASE 3  
			PRINTL X是3。  
		CASEELSE  
			PRINTL X既不是1也不是3。  
	ENDSELECT  
	```

    该脚本根据 `X` 的值进行分支。  
    执行 `SELECTCASE` 语句时，如果 `X` 为 `1`，则跳转到 `CASE 1` 所在行，并执行直到下一个 `CASE` 或 `CASEELSE` 之前的行。  
    同样地，如果 `X` 为 `3`，则跳转到 `CASE 3`。  
    当 `X` 的值没有对应的 `CASE` 语句时，如果存在 `CASEELSE` 语句，则跳转到该处；否则跳转到 `ENDSELECT`。  
    与 C 语言等的 `switch` 语句不同，它不会从一个 `CASE` 继续执行到下一个 `CASE`。  
    此外，无法使用 [`BREAK`](./CONTINUE.md) 语句跳转到 `ENDSELECT`。  
    另外，如果通过 [`GOTO`](./GOTO.md) 等指令直接进入 `SELECTCASE～CASE～CASEELSE～ENDSELECT` 内部，则会与 [`IF～ELSEIF～ELSE～ENDIF`](./IF.md) 类似，  
    正常执行直到 `CASE`、`CASEELSE`、`ENDSELECT` 的紧前位置，然后跳转到 `ENDSELECT` 的下一行继续处理。  
    `CASE` 的条件表达式有三种格式。  
    第一种是如上所述直接指定值的方法，第二种是 `IS <运算符> <表达式>`，第三种是 `<表达式> TO <表达式>`。  
    对于 `IS <运算符> <表达式>` 的情况，例如 `IS <= 30`，当 `X` 小于等于 `30` 时，将执行 `CASE` 以下的部分。  
    对于 `<表达式> TO <表达式>` 的情况，例如 `10 TO 20`，当 `X` 在 `10` 到 `20` 之间（含）时，将执行 `CASE` 以下的部分。  
    此外，可以在 `CASE` 中指定多个用逗号分隔的条件表达式。  
    利用这些特性，可以写出如下示例：  

    ```  { #language-erbapi }
	SELECTCASE X  
		CASE 1  
			PRINTL X是1。  
		CASE 2,3  
			PRINTL X不是1。  
			PRINTL X是2或3。  
		CASE 10 TO 20  
			PRINTL X不是1、2、3中的任何一个。  
			PRINTL X在10到20之间。  
		CASE IS <= 30  
			PRINTL X不是1、2、3，也不在10到20之间。  
			PRINTL X小于等于30。  
		CASE 40, 5 * 10 TO 6 * 10, IS >= 10 * 10  
			PRINTL X大于30。  
			PRINTL X是40、50到60之间、或100以上的值。  
		CASEELSE  
			PRINTL X不满足以上任何条件。  
	ENDSELECT  
    ```

	请注意，`IS` 和 `TO` 必须按照 `IS <运算符> <表达式>` 或 `<表达式> TO <表达式>` 的形式使用。  
	例如，不能写成 `30 < IS` 或 `(10 TO 20) || (30 TO 40)`。  
	此外，`<表达式> TO <表达式>` 仅在左值以上、右值以下时为真。  
	如果右值小于左值，则该 `CASE` 永远不会被执行。  
  
	请注意，当一个 `CASE` 包含多个条件表达式时，会发生短路求值。  
	条件从左到右依次检查，一旦找到满足的条件，剩余的条件将不会被评估。  
  
	也可以将字符串表达式用作 `SELECTCASE` 的参数。  
	如果在 `SELECTCASE` 中指定了字符串，则 `CASE` 的条件表达式也必须是字符串表达式。  

!!! info "Skia 扩展：跳转表优化"

    ![](../assets/images/Icondotnet.webp) Skia 对 `SELECTCASE` 引入了**跳转表（Jump Table）**编译期优化，将符合条件的 `CASE` 条件构建为哈希表（`Dictionary`），实现 **O(1) 运行时查找**，大幅提升多分支场景下的执行效率。

    **适用条件**

    跳转表优化仅在以下条件全部满足时生效：

    - `SELECTCASE` 的所有 `CASE` 条件表达式均为**直接值**（即不使用 `TO` 或 `IS` 表达式）
    - 所有 `CASE` 值均为**编译期常量**（例如字面量 `1`、`"hello"` 等，而非变量）
    - `CASEELSE` 语句仍可作为默认分支正常使用

    以下情况下跳转表优化不生效，回退到传统的线性扫描：

    - 任一 `CASE` 包含 `TO` 表达式（范围匹配）或 `IS` 表达式（条件匹配）
    - 任一 `CASE` 值包含非常量表达式（如变量）

    支持整数、字符串、浮点数三种数据类型。

!!! hint "提示"

    仅支持指令。

### 相关项目
- [IF-ENDIF](IF.md)
- [PRINTDATA](PRINTDATA.md)
- [STRDATA](STRDATA.md)