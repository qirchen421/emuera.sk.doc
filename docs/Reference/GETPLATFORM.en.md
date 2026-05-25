---
hide:
  - toc
---

# GETPLATFORM

| Function name                                                           | Arguments | Return |
| :---------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconSK.webp)[`GETPLATFORM`](./GETPLATFORM.en.md)   | none      | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GETPLATFORM
    ```
	Returns an integer code representing the current execution platform.

	| Return | Platform |
	| :----- | :------- |
	| 0      | Windows  |
	| 1      | Android  |
	| 2      | iOS      |
	| 3      | macOS    |
	| 4      | Linux    |
	| 5      | Unknown  |

	Can be used as an expression function. `CanRestructure = true`, allowing constant folding at compile time.

!!! hint "Hint"

	ERB scripts can perform platform-specific conditional branching.
	For example, use it to skip certain processing only on mobile environments.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
		IF GETPLATFORM() == 0
			PRINTL Windows environment
		ELSEIF GETPLATFORM() == 1
			PRINTL Android environment
		ELSE
			PRINTL Other environment
		ENDIF
    ```

### See also
- [GETCONFIG](GETCONFIG.en.md)
- [GETSTYLE](FONT_OPERATION.en.md)
