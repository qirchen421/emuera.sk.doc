---
hide:
  - toc
---

# TOUPPER, TOLOWER, TOHALF, TOFULL

| 函数名                                                         | 参数     | 返回值   |
| :------------------------------------------------------------- | :------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`TOUPPER`](./TOUPPER.zh.md) | `string` | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOLOWER`](./TOUPPER.zh.md) | `string` | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOHALF`](./TOUPPER.zh.md)  | `string` | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOFULL`](./TOUPPER.zh.md)  | `string` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string TOUPPER string
	string TOLOWER string
	string TOHALF string
	string TOFULL string
    ```
	将参数字符串进行特定转换后的结果赋值给 `RESULTS:0` 或作为返回值。  
	`TOUPPER` 将字母转换为大写，`TOLOWER` 将字母转换为小写。  
	`TOHALF` 将全角字符转换为半角，但对于没有对应半角字符的全角字符则保持不变。  
	`TOFULL` 将半角字符转换为全角。  

!!! hint "提示"

    同时支持作为指令和表达式内函数使用。

!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
	PRINTFORML %TOUPPER("eRAseRmOToRpHAntOM")%
	PRINTFORML %TOLOWER("BEATMANIA")+"IIDX"%
	PRINTFORML %TOHALF("パルスのファルシのルシがパージでコクーン")%
	PRINTFORMW %TOFULL("SUGOI DEKAI")%
    ``` 
    ``` title="结果"
	ERASERMOTORPHANTOM
	beatmaniaIIDX
	ﾊﾟﾙｽのﾌｧﾙｼのﾙｼがﾊﾟｰｼﾞでｺｸｰﾝ
	ＳＵＧＯＩ　ＤＥＫＡＩ
    ```