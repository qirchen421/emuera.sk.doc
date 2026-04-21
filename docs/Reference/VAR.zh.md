---
hide:
  - toc
---

# VARI,VARS

| 函数名                                                  | 参数              | 返回值 |
| :------------------------------------------------------ | :---------------- | :----- |
| ![](../assets/images/Icondotnet.webp)[`VARI`](./VAR.md) | `string`(, `int`) | 无     |
| ![](../assets/images/Icondotnet.webp)[`VARS`](./VAR.md) | `string`(, `int`) | 无     |

!!! info "API"

    ```  { #language-erbapi }
	VARI variableName = intValue
	VARS variableName = strValue
	VARI variableName(, arraySize)
	VARS variableName(, arraySize)
    ```

	可以在函数中的任意位置定义函数本地的动态变量。  
	`VARI` 用于整数，`VARS` 用于字符串。  
	数组不会被赋予初始值，字符串必须用 `"～"` 括起来。

    ```  { #language-erbapi }
	VARS QUESTION = "生命、宇宙、以及万物存在的终极问题的答案"
	VARI ANSWER = 42
	PRINTFORML Q.%QUESTION%
	PRINTFORML A.{ANSWER}

	VARI INTEGER, 3

	REPEAT 4
		INTEGER:COUNT = COUNT*14
		PRINTFORML {INTEGER:COUNT}
	REND
	```

    ``` title="结果"
	Q.生命、宇宙、以及万物存在的终极问题的答案
	A.42

	0
	14
	28
	42
	```

!!! hint "提示"

    仅支持命令。

### 相关项目
- [函数·预处理器>#DIM](../Emuera/function.md#dim)