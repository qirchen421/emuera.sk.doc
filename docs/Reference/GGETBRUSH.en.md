---
hide:
  - toc
---

# GGETBRUSH

| Function name                                                        | Arguments | Return |
| :------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`GGETBRUSH`](./GGETBRUSH.en.md) | `int`     | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int GGETBRUSH gID
	```

	Returns the color set by `GSETBRUSH` for the `Graphics` with the specified `gID` (cARGB).

!!! warning "Skia version note"

	Calling `GGETBRUSH` after `GCREATE` without `GSETBRUSH` causes a NullReferenceException in EM+EE, but returns `0` in the Skia version.

!!! hint "Hint"

    Both command and expression function supported.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		GCREATE 0, 100, 100
		GSETBRUSH 0, 0xFF112233

		PRINTFORMW Color:{GGETBRUSH(0)}(%CONVERT(GGETBRUSH(0), 16)%)
	```

	``` title="Result"
	Color:4279312947(ff112233)
	```

### Related Items
- [GSETBRUSH](GSETBRUSH.en.md)
