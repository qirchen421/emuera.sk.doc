---
hide:
  - toc
---

# FOR-NEXT

| 函数名                                                  | 参数                                     | 返回值 |
| :------------------------------------------------------ | :--------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`FOR`](./FOR.md)  | `integerVariable`, `int`, `int`(, `int`) | 无     |
| ![](../assets/images/IconEmuera.webp)[`NEXT`](./FOR.md) | 无                                       | 无     |

!!! info "API"

    ```  { #language-erbapi }
    FOR integerVariable, startNum, endNum(, value)
    ```
    `FOR～NEXT` 是 [`REPEAT～REND`](./REPEAT.md) 的功能增强版。  
    第一个参数表示用于计数的变量（在 `REPEAT` 中始终是 `COUNT:0`）。  
    第二个参数表示最初赋值给变量的值（在 `REPEAT` 中始终是 `0`）。  
    第三个参数表示循环结束的值（相当于 `REPEAT` 中可设置的值）。  
    第四个参数表示每次循环累加的值（在 `REPEAT` 中始终是 `1`）。  

    ```  { #language-erbapi }
    FOR COUNT, 0, X  
        ;～～  
    NEXT  
    REPEAT X  
        ;～～  
    REND  
    ```

	上面的两个语句功能几乎相同。  
	两者都是执行X次循环的语法，在循环过程中可以使用[`CONTINUE`](./CONTINUE.md)或[`BREAK`](./CONTINUE.md)。  
	不同之处在于可以指定用于计数的变量，并且可以更改起始值和步长。  
	此外，`FOR～NEXT`可以嵌套使用。  

    ```  { #language-erbapi }
	FOR Y, 0, 100  
		FOR X, 0, 100  
			～～  
		NEXT  
	NEXT  
	```

    第1个参数`integerVariable`只能指定数值类型的变量，不能使用角色变量。
    第4个参数`value`是可选的，如果省略则默认为`1`。
    当`value`为正值时，在每次循环时向`integerVariable`变量增加`value`值，直到达到第3个参数`endNum`时循环结束。
    当`value`为负值时，当`integerVariable`变量的值小于等于`endNum`时循环结束。
    如果`value`为0，则会产生无限循环，直到执行[`BREAK`](./CONTINUE.md)语句才会退出。
    各个值在循环开始时就被固定下来，即使在循环过程中变量发生变化也不会受到影响。
    以下两个例子会产生相同的结果。

    ```  { #language-erbapi }
    ;１
    X = 10
    FOR COUNT:X, 0, X, X/10
        X = 10000
    NEXT
    ;２
    FOR COUNT:10, 0, 10, 10/10
        X = 10000
    NEXT
    ```
    此外，如果通过 [`GOTO`](./GOTO.md) 等指令直接跳转到 `FOR～NEXT` 循环内部，其行为与 `REPEAT～REND` 类似：会从进入点开始正常执行，直到 `NEXT` 指令的前一行，然后忽略 `NEXT` 指令，并从下一行继续执行。

!!! hint "提示"

    仅支持指令。

### 相关项目
- [REPEAT-REND](REPEAT.md)
- [WHILE-WEND](WHILE.md)
- [CONTINUE,BREAK](CONTINUE.md)