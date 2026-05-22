---
hide:
  - toc
---

# CVARSET

| 函数名                                                         | 参数                                          | 返回值 |
| :------------------------------------------------------------- | :-------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CVARSET`](./CVARSET.zh.md) | `charaVariable`(, `int`, `int`, `int`, `int`) | 无     |

!!! info "API"

    ```  { #language-erbapi }
	CVARSET characterVariable, index, value, startID, endID
    ```
	此命令用于对指定已注册角色，向其角色变量的特定元素赋值。  
	对于第一参数指定的变量，针对第四参数及之后参数指定的已注册角色，将第三参数指定的值赋给第二参数指定的元素。  
	对于`NAME`、`ISASSI`等一维数组变量，第二参数不影响处理。因此，若不省略第三参数，请指定一个适当的值。  
	若省略第三参数，则赋值`0`或空字符串。  
	若也省略第二参数，则赋值给第`0`个元素。  
	若省略第四参数及之后的参数，则对所有已注册角色赋值。  

    ```  { #language-erbapi }
	CVARSET CFLAG, 10, 123
	```

	此脚本与以下代码等效。

    ```  { #language-erbapi }
    REPEAT CHARANUM
	    CFLAG:COUNT:10 = 123
    REND
    ```

!!! hint "提示"

    仅支持命令形式。

### 相关项目
- [VARSET](VARSET.zh.md)