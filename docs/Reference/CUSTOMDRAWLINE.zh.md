---
hide:
  - toc
---

# CUSTOMDRAWLINE, DRAWLINEFORM

| 函数名                                                                       | 参数           | 返回值 |
| :--------------------------------------------------------------------------- | :------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CUSTOMDRAWLINE`](./CUSTOMDRAWLINE.zh.md) | `string`       | 无     |
| ![](../assets/images/IconEmuera.webp)[`DRAWLINEFORM`](./CUSTOMDRAWLINE.zh.md)   | `formedString` | 无     |

!!! info "API"

    ```  { #language-erbapi }
	CUSTOMDRALINE string
	DRAWLINEFORM formedString
    ```
	使用指定的字符串显示一行分隔符。DRAWLINEFORM 支持 FORM 语法。

!!! hint "提示"

    仅支持作为指令使用。

!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		CUSTOMDRAWLINE *
		DRAWLINEFORM {123+211}
		WAIT
    ``` 
    ``` title="結果"
	************************************************************************************************************************************************
	334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334
    ```

### 相关项目
- [DRAWLINE](DRAWLINE.zh.md)