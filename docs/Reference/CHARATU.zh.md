---
hide:
  - toc
---

# CHARATU

| 函数名                                                         | 参数            | 返回值   |
| :------------------------------------------------------------- | :-------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`CHARATU`](./CHARATU.zh.md) | `string`, `int` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string CHARATU string, position
    ```
	获取字符串中指定位置字符的式中函数`CHARATU`  

		CHARATU(<参照字符串>, [获取字符位置])

    获取字符串中指定位置的字符  
　　处理系统采用Unicode编码  

!!! hint "提示"

    该功能同时支持指令和表达式函数两种形式。

!!! example "示例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIMS HOGES = "いろはにほ"

		REPEAT 5
			PRINTFORML %CHARATU(HOGES, COUNT)%
		REND
		WAIT
    ``` 
    ``` title="结果"
	い
	ろ
	は
	に
	ほ
    ```

### 相关项目
- [SUBSTRING](SUBSTRING.zh.md)