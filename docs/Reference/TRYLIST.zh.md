---
hide:
  - toc
---

# TRYLIST系

| 函数名                                                             | 参数                       | 返回值 |
| :----------------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TRYCALLLIST`](./TRYLIST.zh.md) | 无                       | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`TRYJUMPLIST`](./TRYLIST.zh.md) | 无                       | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTOLIST`](./TRYLIST.zh.md) | 无                       | 无   |
| ![](../assets/images/IconEmuera.webp)[`FUNC`](./TRYLIST.zh.md)        | `functionName`(, `any`...) | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`ENDFUNC`](./TRYLIST.zh.md)     | 无                       | 无   |

!!! info "API"

    ```  { #language-erbapi }
	TRYCALLLIST
	TRYJUMPLIST
	TRYGOTOLIST
	FUNC functionName(, argument...)
	ENDFUNC
    ```
	这是一个用于指定多个函数（标签）并仅调用第一个找到的函数的语法。  
	在 `TRYLIST系～ENDFUNC` 内部，不能使用上述语法以外的描述。  
	另外，关于使用 `TRYGOTOLIST` 直接进入循环/分支结构的情况，请参考 [`TRYGOTO`](./TRY.zh.md)、[`循环/分支结构`](../Reference/README.zh.md#flow-control) 以及 [`TRYC` 系](./TRYC.zh.md) 的章节。  
	使用方法如下所示：  

    ```  { #language-erbapi }
	TRYCALLLIST
		FUNC 函数1
		FUNC 函数2
	ENDFUNC
	```

    `FUNC` 指定的函数将按顺序尝试调用，若成功则调用后跳转至 `ENDFUNC`，若失败则跳转至下一行的 `FUNC`（或 `ENDFUNC`）。  
    这等同于以下脚本：

    ```  { #language-erbapi }
    TRYCCALL 関数1
    CATCH
        TRYCCALL 関数2
        CATCH
        ENDCATCH
    ENDCATCH
    ```

!!! hint "提示"

    仅支持指令。

### 相关项目
- [TRY系](TRY.zh.md)
- [TRYC系](TRYC.zh.md)
- [CALL](CALL.zh.md)
- [JUMP](JUMP.zh.md)
- [GOTO](GOTO.zh.md)