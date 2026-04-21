# SPLIT, STRJOIN

| 函数名                                                       | 参数                                    | 返回值   |
| :----------------------------------------------------------- | :-------------------------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`SPLIT`](./SPLIT.md)   | `string`, `string`, `stringArray`       | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRJOIN`](./SPLIT.md) | `stringArray`(, `string`, `int`, `int`) | `string` |

!!! info "API"

    ```  { #language-erbapi }
    SPLIT string, sepalateWord, stringArray
    string STRJOIN stringArray(, sepalateWord, startIndex, joinCount)
    ```
    `SPLIT` 命令将第一个参数指定的字符串，以第二个参数指定的字符串作为分隔符进行分割，并将结果赋值给第三个参数指定的字符串数组变量。  
    同时，将分割后的数量赋值给 `RESULT`。  
    第三个参数指定的变量必须是数组变量。

    ```  { #language-erbapi }
    SPLIT "あい,うえ,,お", ",", LOCALS
    ```

    上述脚本执行后，`LOCALS:0` 将被赋值为 `あい`，`LOCALS:1` 为 `うえ`，`LOCALS:2` 为空字符串，`LOCALS:3` 为 `お`，`RESULT` 为 `4`。  
    如果分割后的元素数量超过了第3个参数所能容纳的元素数量，超出的部分将不会被赋值。  
    `RESULT` 中存放的是实际的分割数量，请据此进行判断。
    
    `STRJOIN` 是与 `SPLIT` 功能相反的字符串连接指令。如果指定了角色变量，可能会引发错误。  
    `sepalateWord` 是在连接时插入在元素之间的字符串。与其他语言中的同类处理类似，省略时默认自动应用 `,`（若不需要分隔符，请传入 `""`）。  
    如果指定了 `startIndex` 和 `joinCount`，则会在 `数组起始下标 ≤ i < 起始下标 + 数组元素数量` 的范围内进行连接。  
    指定后者时，前者不可省略。

!!! hint "提示"

    `STRJOIN` 支持在表达式中作为函数使用。

!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		SPLIT "あい,うえ,,お", ",", LOCALS
		REPEAT RESULT
			PRINTFORML %LOCALS:COUNT%
		REND
		PRINTFORMW %STRJOIN(LOCALS, "")%
    ``` 
    ``` title="结果"
	あい
	うえ
	
	お
	あいうえお
    ```