---
hide:
  - toc
---

# THROW

| 函数名                                                     | 参数     | 返回值 |
| :--------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`THROW`](./THROW.zh.md) | `string` | 无     |

!!! info "API"

    ```  { #language-erbapi }
	THROW formedString
    ```
    此命令会强制引发错误，并使用给定的参数字符串进行错误显示。

!!! hint "提示"

    仅支持作为命令使用。

!!! example "示例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		THROW お気の毒ですが、冒険の書は消えてしまいました
    ``` 
    ``` title="结果"
	Now Loading...
	MAIN.ERB第2行发生THROW
	THROW お気の毒ですが、冒険の書は消えてしまいました
	THROW内容：お気の毒ですが、冒険の書は消えてしまいました
	当前函数：@SYSTEM_TITLE（MAIN.ERB第1行）
	函数调用栈：
	※※※日志文件已输出至emuera.log※※※
    ```