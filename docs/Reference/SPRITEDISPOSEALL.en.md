---
hide:
  - toc
---

# SPRITEDISPOSEALL

| Function name                                                            | Arguments | Return |
| :---------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`SPRITEDISPOSEALL`](./SPRITEDISPOSEALL.md) | `int`     | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int SPRITEDISPOSEALL, containCsvSprite
	```

	Disposes all SPRITEs. If the argument is 0, only those created in ERB are disposed; if non-zero, all including those created in CSV in resources are disposed.  
	Returns the number of sprites disposed.

!!! hint "Hint"

	Both command and expression function supported.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		GCREATE 0, 100, 100

		SPRITECREATE "AAA", 0
		SPRITECREATE "BBB", 0
		SPRITECREATE "CCC", 0

		PRINTFORMW {SPRITEDISPOSEALL(0)}
	```

	``` title="Result"
	3
	```

### Related Items
- [SPRITEDISPOSE](./SPRITEDISPOSE.md)
