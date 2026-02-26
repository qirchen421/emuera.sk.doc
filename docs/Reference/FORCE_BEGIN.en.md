---
hide:
  - toc
---

# FORCE_BEGIN

| Function name                                                             | Arguments  | Return |
| :----------------------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/IconEE.webp)[`FORCE_BEGIN`](./FORCE_BEGIN.md) | `string` | `void` |

!!! info "API"

	``` { #language-erbapi }
	FORCE_BEGIN SystemFuncName
    ```

	Executes `BEGIN` without being affected by flow control.

!!! hint "Hint"

    Can only be used as a command.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		BEGIN ABLUP

	@SHOW_JUEL
		PRINTL @SHOW_JUEL
		FORCE_BEGIN SHOP

	@EVENTSHOP
		PRINTL @EVENTSHOP

	@SHOW_SHOP
		PRINTL @SHOW_SHOP
		FORCE_BEGIN TURNEND

	@EVENTTURNEND
		PRINTL @EVENTTURNEND
		WAIT

	```

	``` title="Result"
	@SHOW_JUEL
	@EVENTSHOP
	@SHOW_SHOP
	@EVENTTURNEND
    ```

### See Also
- [BEGIN](BEGIN.md)
