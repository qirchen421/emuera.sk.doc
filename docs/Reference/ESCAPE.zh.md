---
hide:
  - toc
---

# ESCAPE

| 函数名                                                       | 参数     | 返回值   |
| :----------------------------------------------------------- | :------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`ESCAPE`](./ESCAPE.zh.md) | `string` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string ESCAPE string
    ```
	对参数字符串中的正则表达式元字符进行转义，使其在正则表达式中被视为普通文本，并返回转义后的字符串。

!!! hint "提示"

    该函数同时支持指令和表达式函数两种用法。

!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORMW %ESCAPE("!#$%&'()")%
    ``` 
    ``` title="结果"
	!\#\$%&'\(\)
    ```