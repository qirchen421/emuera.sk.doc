---
hide:
  - toc
---

# UPCHECK

| 函数名                                                           | 参数 | 返回值 |
| :--------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`UPCHECK`](./UPCHECK.zh.md) | 无   | 无     |

!!! info "API"

    ```  { #language-erbapi }
	UPCHECK
    ```
    将`TARGET`的`UP`、`DOWN`状态值累加到`PALAM`中，并显示增减量

!!! hint "提示"

    仅支持作为指令使用。

!!! example "示例"
    ``` { #language-erb title="PALAM.csv" }
	0,能力0
	1,能力1
	2,能力2
	```
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		ADDVOIDCHARA
		TARGET = 0
		UP:0 = 123
		UP:1 = 456
		UP:2 = 789

		UPCHECK
		WAIT
    ``` 
    ``` title="结果"
	能力0 0+123=123
	能力1 0+456=456
	能力2 0+789=789
    ```

### 相关项目
- [CUPCHECK](CUPCHECK.zh.md)