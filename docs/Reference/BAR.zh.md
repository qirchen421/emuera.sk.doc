---
hide:
  - toc
---

# BAR(L)

| 函数名                                                    | 参数                  | 返回值 |
| :-------------------------------------------------------- | :-------------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`BAR`](./BAR.md)  | `int`, `int`, `int`   | 无     |
| ![](../assets/images/Iconeramaker.webp)[`BARL`](./BAR.md) | `int`, `int`, `int`   | 无     |

!!! info "API"

    ``` { #language-erbapi }
	BAR value, maxValue, length
    ```
    绘制一个条形图，表示第一个参数相对于第二个参数的比例。第三个参数可以设置条形的长度。  
	`BAR` 在显示后不换行，而 `BARL` 在显示后会换行。

!!! hint "提示"

    仅支持指令。

!!! example "示例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		BAR 2, 10, 20
		PRINTL (2/10)
		BARL 114, 514, 81
    ``` 
    ``` title="结果"
	[****................](2/10)
	[*****************................................................................]
    ```

### 相关项目
* [BARSTR](BARSTR.md)