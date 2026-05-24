---
hide:
  - toc
---

# GETDOINGFUNCTION

| Function Name | Arguments | Return |
| :----- | :--- | :----- |
| ![](../assets/images/IconEE.webp)[`GETDOINGFUNCTION`](./GETDOINGFUNCTION.en.md) | none | `string` |

!!! info "API"

	``` { #language-erbapi }
	string GETDOINGFUNCTION
	```

	Returns the label name of the currently executing function. Returns an empty string if called during system idle (e.g., title screen).

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@EVENTSHOP
		PRINTFORML Current function: %GETDOINGFUNCTION%
	```
	``` title="Result"
	Current function: EVENTSHOP
	```
