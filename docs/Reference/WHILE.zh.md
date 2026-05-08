---
hide:
  - toc
---

# WHILE-WEND

| 函数名                                                     | 参数  | 返回值 |
| :--------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`WHILE`](./WHILE.md) | `int` | 无     |
| ![](../assets/images/IconEmuera.webp)[`WEND`](./WHILE.md)  | 无    | 无     |

!!! info "API"

    ```  { #language-erbapi }
	WHILE bool
	WEND
    ```
	这是类似于 [`REPEAT～REND`](./REPEAT.md) 或 [`FOR～NEXT`](./FOR.md) 的一种循环结构。  
	只要 `WHILE` 的 `bool` 不为 0，就会重复执行循环。  
	如果给定的条件始终满足，除非使用 [`BREAK`](./CONTINUE.md) 跳出，否则将形成无限循环。  
	如果循环处理时间过长，Emuera 可能会报错。  
	另外，如果通过 [`GOTO`](./GOTO.md) 等指令直接跳转到 `WHILE～WEND` 循环内部，当执行到 `WEND` 时，会正常跳回 `WHILE` 处进行条件判断。

!!! hint "提示"

    仅支持指令形式。

### 相关项目
- [REPEAT-REND](REPEAT.md)
- [FOR-NEXT](FOR.md)
- [CONTINUE.BREAK](CONTINUE.md)