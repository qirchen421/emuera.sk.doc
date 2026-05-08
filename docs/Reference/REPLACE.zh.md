---
hide:
  - toc
---

# REPLACE

| 函数名                                                         | 参数                         | 返回值   |
| :------------------------------------------------------------- | :--------------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`REPLACE`](./REPLACE.md) | `string`, `string`, `string` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string REPLACE string, searchWord, replaceWord
    ```
	在目标字符串中搜索目标模式，如果匹配成功，则用替换字符串进行替换。
	内部处理完全基于正则表达式。第二个参数遵循 C# 正则表达式的规范进行操作。
	因此，对于正则表达式中使用的符号，如 `()`、`[]`、`$`、`/`、`.`、`*`、`+` 等，必须进行转义。

!!! hint "提示"

    该函数同时支持指令和表达式内函数两种形式。

!!! example "示例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORMW %REPLACE("12億3456万7890円", "[^0-9]", "")%
    ``` 
    ``` title="结果"
	1234567890
    ```