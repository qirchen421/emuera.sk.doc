---
hide:
  - toc
---

# JUMP

| 函数名                                                     | 参数             | 返回值 |
| :--------------------------------------------------------- | :--------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`JUMP`](./JUMP.md) | `functionName`   | 无     |

!!! info "API"

    ```  { #language-erbapi }
	JUMP functionName
    ```
    以 `@` 开头的字符串定义的函数  
    当到达函数末端或执行 [`RETURN`](./RETURN.md) 时，结束函数  
    与 [`CALL`](./CALL.md) 的区别在于，执行时不会将函数压入栈，因此即使跳转到的函数结束也不会返回。所以，如果没有调用栈，可能会导致错误终止  

!!! hint "提示"

    仅支持指令。

!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
		PRINTL CALL to AAA
		CALL AAA

		PRINTW Backed SYSTEM_TITLE

		@AAA
		PRINTL JUMP to BBB
		JUMP BBB

		PRINTL Can not reach here

		@BBB
		PRINTL Exit BBB
		RETURN
    ``` 
    ``` title="结果"
	CALL to AAA
	JUMP to BBB
	Exit BBB
	Backed SYSTEM_TITLE
    ```

### 相关项目
- [JUMPFORM](FORM.md)
- [TRYJUMPFORM](TRYFORM.md)
- [TRYCJUMP](TRYC.md)