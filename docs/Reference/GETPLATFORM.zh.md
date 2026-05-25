---
hide:
  - toc
---

# GETPLATFORM

| 函数名                                                                  | 参数 | 返回值 |
| :---------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconSK.webp)[`GETPLATFORM`](./GETPLATFORM.zh.md)   | 无   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GETPLATFORM
    ```
	返回当前运行平台的整数编码。

	| 返回值 | 平台    |
	| :----- | :------ |
	| 0      | Windows |
	| 1      | Android |
	| 2      | iOS     |
	| 3      | macOS   |
	| 4      | Linux   |
	| 5      | Unknown |

	可作为表达式中函数使用。`CanRestructure = true`，编译时可进行常量折叠。

!!! hint "提示"

	ERB脚本可以根据平台进行条件分支。
	例如，仅在移动环境下跳过特定处理时使用。

!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
		IF GETPLATFORM() == 0
			PRINTL Windows环境
		ELSEIF GETPLATFORM() == 1
			PRINTL Android环境
		ELSE
			PRINTL 其他环境
		ENDIF
    ```

### 相关项
- [GETCONFIG](GETCONFIG.zh.md)
- [GETSTYLE](FONT_OPERATION.zh.md)
