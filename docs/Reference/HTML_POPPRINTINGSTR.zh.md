---
hide:
  - toc
---

# HTML_POPPRINTINGSTR

| 函数名                                                                                    | 参数  | 返回值  |
| :---------------------------------------------------------------------------------------- | :---- | :------ |
| ![](../assets/images/IconEmuera.webp)[`HTML_POPPRINTINGSTR`](./HTML_POPPRINTINGSTR.zh.md)    | `void`| `string`|

!!! info "API"

    ```  { #language-erbapi }
	string HTML_POPPRINTINGSTR
    ```
    获取当前 [`PRINT`](./PRINT.zh.md) 中处于换行等待状态的字符串缓冲区的 HTML 格式内容，并清空缓冲区。
    由于不包含 `p` 标签，因此 `ALIGNMENT` 指令设置的 `align` 属性不会生效。

!!! hint "提示"

    该函数同时支持在指令和表达式中使用。

!!! example "示例"
    
    ``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
	#DIMS HOGES
		FONTBOLD
		PRINT AAA
		FONTITALIC
		PRINT BBB
		FONTSTYLE 4
		PRINT CCC
		FONTSTYLE 0
		FONTREGULAR

		HOGES = %HTML_POPPRINTINGSTR()%
		PRINTL DDD

		PRINTFORMW %HOGES%
    ```
    ``` title="结果"
	DDD
	<b>AAA</b><i><b>BBB</b></i><s>CCC</s>
    ```