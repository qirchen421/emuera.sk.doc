---
hide:
  - toc
---

# GOTO

| 函数名                                                     | 参数          | 返回值 |
| :--------------------------------------------------------- | :------------ | :----- |
| ![](../assets/images/Iconeramaker.webp)[`GOTO`](./GOTO.zh.md) | `labelName`   | 无     |

!!! info "API"

    ```  { #language-erbapi }
	GOTO labelName
	$labelName
    ```
    跳转到函数内由`$`定义的标签处

!!! hint "提示"

    仅支持在指令中使用。

!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTL 1
		GOTO THREE

		$TWO
		PRINTL 2
		GOTO FIVE

		$THREE
		PRINTL 3
		GOTO TWO

		$FOUR
		PRINTL 4
		GOTO END

		$FIVE
		PRINTL 5
		GOTO FOUR

		$END
		PRINTW END
    ```
    ``` title="结果"
	1
	3
	2
	5
	4
	END
    ```

### 相关项目
- [GOTOFORM](FORM.zh.md)