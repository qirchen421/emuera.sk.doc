---
hide:
  - toc
---

# TRYCALLFORMF

| 函数名                                                               | 参数     | 返回值 |
| :------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEE.webp)[`TRYCALLFORMF`](./TRYCALLFORMF.md) | `string` | `void` |

!!! info "API"

    ``` { #language-erbapi }
    TRYCALLFORMF funcName
    ```

    附加 `TRY` 功能的 `CALLFORMF` 函数。  
    即便调用的目标函数不存在也不会报错；与此同时，`CALLFORMF` 通过 `RETURNF` 返回的值也被丢弃。

!!! hint "提示"

    仅支持命令式写法。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

    	REPEAT 5
    		TRYCALLFORMF TEST{COUNT}
    		SIF !LINEISEMPTY()
    			PRINTL
    	REND
    	WAIT

    @TEST1
    #FUNCTION

    	PRINT 已调用 "TEST1" 函数
    	RETURNF 0

    @TEST3
    #FUNCTIONS

    	PRINT 已调用 "TEST3" 函数
    	RETURNF "HOGE"
    ```

    ``` title="输出结果"
    已调用 "TEST1" 函数
    已调用 "TEST3" 函数
    ```

### 相关项目
- [CALLF](CALLF.md)
- [TRYCALLF](TRYCALLF.md)