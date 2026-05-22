---
hide:
  - toc
---

# FORCE_QUIT_AND_RESTART

| Function name                                                                                   | Arguments   | Return |
| :--------------------------------------------------------------------------------------- | :----- | :----- |
| ![](../assets/images/IconEE.webp)[`FORCE_QUIT_AND_RESTART`](./FORCE_QUIT_AND_RESTART.en.md) | `void` | `void` |

!!! info "API"

	``` { #language-erbapi }
	FORCE_QUIT_AND_RESTART
	```

	Performs `QUIT_AND_RESTART` without waiting

!!! hint "Hint"

	Available only as a command  
	If executed consecutively without player input, a warning dialog will be displayed

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE

		FORCE_QUIT_AND_RESTART
	```

	![](../assets/images/FORCE_QUIT_AND_RESTART.png)

### Related Topics
- [QUIT_AND_RESTART](QUIT_AND_RESTART.en.md)
