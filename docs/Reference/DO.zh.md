---
hide:
  - toc
---

# DO-LOOP

| 函数名                                                 | 参数  | 返回值 |
| :----------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`DO`](./DO.md)   | 无    | 无     |
| ![](../assets/images/IconEmuera.webp)[`LOOP`](./DO.md) | `int` | 无     |

!!! info "API"

    ```  { #language-erbapi }
	DO
	LOOP bool
    ```
	[`REPEAT～REND`](./REPEAT.md) 和 [`FOR～NEXT`](./FOR.md) 一样，是一种循环结构。  
	与 C 语言的 `do～while`、VB 的 `do～loop while` 结构类似，只要 `LOOP` 的 `bool` 不为 `0`，就会继续执行循环。  
	其特点是，与 [`WHILE～WEND`](./WHILE.md) 不同，它至少会执行一次。  
	另外，在 `DO～LOOP` 内执行 [`CONTINUE`](./CONTINUE.md) 时，如果 `LOOP` 的条件不满足，则会直接跳出 `LOOP`。请注意，执行 `CONTINUE` 后不一定会返回到 `DO` 语句。  
	此外，如果通过 [`GOTO`](./GOTO.md) 等命令直接跳转到 `DO～LOOP` 内部，在正常到达 `LOOP` 时会进行条件判断，如果 `bool` 不为 `0`，则会循环回 `DO`。  

!!! hint "提示"

    仅支持命令。