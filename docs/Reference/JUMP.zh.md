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

!!! info "JUMP 与 RESULT 的关系"

    JUMP 目标函数中执行 [`RETURN`](./RETURN.md) 时，`RESULT` 会正常设置。JUMP 只是替换栈帧，不影响 `RETURN` 设置 `RESULT` 的行为。

    JUMP 目标函数结束时，`Return()` 会检测到 `IsJump` 标志，**递归地回退栈帧**，直到回到最初的非 JUMP 调用方（如 [`CALL`](./CALL.md)）。JUMP 链（A→JUMP B→JUMP C→RETURN）中 RESULT 也能正确设置。

    ``` { #language-erb }
    @SYSTEM_TITLE
        CALL AAA
        PRINTVL RESULT    ; 42（BBB 的 RETURN 42 设置了 RESULT）

    @AAA
        JUMP BBB          ; AAA 被 BBB 替换
        PRINTL 不可达     ; 不会执行

    @BBB
        RETURN 42         ; RESULT = 42，递归回退到 SYSTEM_TITLE
    ```

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