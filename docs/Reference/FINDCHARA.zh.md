# FINDCHARA, FINDLASTCHARA

| 函数名                                                                 | 参数                                     | 返回值 |
| :--------------------------------------------------------------------- | :--------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`FINDCHARA`](./FINDCHARA.md)     | `charaVariable`, `int`(, `int`, `int`)   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`FINDLASTCHARA`](./FINDCHARA.md) | `charaVariable`, `int`(, `int`, `int`)   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int FINDCHARA charaVariable, value(, startID, endID)
	int FINDLASTCHARA charaVariable, value(, startID, endID)
    ```
	`FINDCHARA` 指令通过指定角色变量和值，返回变量等于该值的角色的注册编号。  
	如果找到多个匹配项，`FINDCHARA` 返回第一个命中的角色，  
	`FINDLASTCHARA` 返回最后一个命中的角色。如果未找到，则返回 `-1`。  
	此外，通过指定第 3 个参数可以指定搜索的起始位置，指定第 4 个参数可以指定搜索的结束位置。  
	但是，如果搜索范围超出角色数量的范围，将会导致错误。

    ```  { #language-erbapi }
	X = -1
	WHILE 1
		FINDCHARA CFLAG:10, 123, X + 1
		X = RESULT
		SIF X < 0
			BREAK
		PRINTFORML %NAME:X%
	WEND
	```

	上述脚本会列出所有`CFLAG:10`为`123`的角色。

!!! hint "提示"

    该功能同时支持命令形式和函数形式。