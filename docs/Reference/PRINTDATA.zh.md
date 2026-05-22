---
hide:
  - toc
---

# PRINTDATA 系列

| 函数名                                                                                        | 参数           | 返回值 |
| :-------------------------------------------------------------------------------------------- | :------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTDATA(\|K\|D)(\|L\|W)</code>](./PRINTDATA.zh.md) | 无             | 无     |
| ![](../assets/images/IconEmuera.webp)[`DATA`](./PRINTDATA.zh.md)                                 | `string`       | 无     |
| ![](../assets/images/IconEmuera.webp)[`DATAFORM`](./PRINTDATA.zh.md)                             | `formedString` | 无     |
| ![](../assets/images/IconEmuera.webp)[`DATALIST`](./PRINTDATA.zh.md)                             | 无             | 无     |
| ![](../assets/images/IconEmuera.webp)[`ENDLIST`](./PRINTDATA.zh.md)                              | 无             | 无     |
| ![](../assets/images/IconEmuera.webp)[`ENDDATA`](./PRINTDATA.zh.md)                              | 无             | 无     |

!!! info "API"

    ```  { #language-erbapi }
    PRINTDATA(|K|D)(|L|W)
    	DATA string
    	DATAFORM formedString
    	DATALIST
    	ENDLIST
    ENDDATA
    ```
    这是 `PRINTDATA` 系列指令。根据私家改造版 readme 的说明，

    ```  { #language-erbapi }
    ;*格式*
    PRINTDATA (数值变量：可省略)
    	DATA (字符串)
    	DATAFORM (FORM字符串)
    	DATALIST
    		(DATA 或 DATAFORM 的罗列)
    	ENDLIST
    ENDDATA
    ```

	    *内容*
	    将DATA、DATAFORM以及DATALIST～ENDLIST中指定的字符串以等概率随机显示
	    无需使用IF和RAND即可实现随机显示
	    若在参数中指定了数值变量，则会存入所显示的变量DATA的编号
	    适用于想根据显示的字符串来调整后续处理的情况
	    DATALIST～ENDLIST内部，每个DATA或DATAFORM相当于一行

	如上所述。
	`K`、`D`、`L`、`W`关键字的效果与[`PRINT`](./PRINT.zh.md)系命令相同。
	若`PRINTDATA`系～`ENDDATA`内部没有通过`DATA`系提供显示数据，则不执行任何操作并继续执行后续命令。
	不能在`PRINTDATA`系～`ENDDATA`以及`DATALIST`～`ENDLIST`内部书写上述语法以外的内容。

!!! hint "提示"

	仅支持命令形式。

!!! example "示例"

``` { #language-erb title="MAIN.ERB" }
@SYSTEM_TITLE
	REPEAT 10
		PRINTDATA
			DATA A
			DATA B
			DATA C
			DATA D
			DATA E
		ENDDATA
	REND

	WAIT
```
``` title="结果"
DBDAEACDAE
```

### 相关项目
- [STRDATA](STRDATA.zh.md)
- [SELECTCASE](SELECTCASE.zh.md)
- [RAND](RAND.zh.md)