---
hide:
  - toc
---

# RESETGLOBAL

| 函数名                                                                 | 参数 | 返回值 |
| :--------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`RESETGLOBAL`](./RESETGLOBAL.zh.md) | 无   | 无     |

!!! info "API"

    ```  { #language-erbapi }
	RESETGLOBAL
    ```
	初始化全局变量。  
	具体来说，将数值型全局变量赋值为`0`，将字符串型全局变量赋值为空字符串。  

!!! hint "提示"

    仅支持指令形式。

!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		GLOBAL = 123

		RESETGLOBAL
		PRINTFORMW {GLOBAL}
    ``` 
    ``` title="結果"
	0
    ```

### 相关项目
- [RESETDATA](RESETDATA.zh.md)