---
hide:
  - toc
---

# STRCOUNT

| 函数名 | 参数 | 返回值 |
| :--- | :--- | :--- |
| ![](../assets/images/IconEmuera.webp)[`STRCOUNT`](./STRCOUNT.md) | `string`, `string` | `int` |

!!! info "API"

    ```  { #language-erbapi }
	int STRCOUNT string, searchWord
    ```
	获取字符串中指定子字符串的数量的指令。将匹配的数量赋值给`RESULT:0`或返回该值。  
	搜索字符串的格式遵循C#正则表达式的规范。  

!!! hint "提示"

    支持指令和表达式函数两种用法。


!!! example "示例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORML 「も」的数目:{STRCOUNT("すもももももももものうち", "も")}
		PRINTFORMW 半角数字的数目:{STRCOUNT("1日1歩 3日で3歩 3歩進んで2歩下がる", "[0-9]")}
    ``` 
    ``` title="结果"
	「も」的数目:8
	半角数字的数目:6
    ```

### 相关项目
- [STRFIND](STRFIND.md)