---
hide:
  - toc
---

# RESETDATA

| 函数名                                                             | 参数 | 返回值 |
| :----------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`RESETDATA`](./RESETDATA.zh.md) | 无   | 无     |

!!! info "API"

    ```  { #language-erbapi }
	RESETDATA
    ```
	初始化除全局变量外的所有变量。  
	具体来说，会删除所有角色，并将所有局部变量及所有普通变量赋值为`0`或空字符串。  
	此外，对于`PALAMLV`或`STR`等设置了初始值的变量，会为其赋予初始值。  

!!! hint "提示"

    仅支持指令。

!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		RESULT = 123
		LOCAL = 456

		RESETDATA
		PRINTFORMW {RESULT} {LOCAL}
    ``` 
    ``` title="结果"
	0 0
    ```

### 相关项目
- [RESETGLOBAL](RESETGLOBAL.zh.md)