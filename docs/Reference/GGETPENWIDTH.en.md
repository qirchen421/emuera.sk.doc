---
hide:
  - toc
---

# GGETPENWIDTH

| Function name                                                              | Arguments | Return |
| :------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`GGETPENWIDTH`](./GGETPENWIDTH.en.md) | `int`     | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int GGETPENWIDTH gID
	```

	Returns the pen width set by `GSETPEN` for the `Graphics` with the specified `gID`.

!!! warning "Skia version note"

	Calling `GGETPENWIDTH` after `GCREATE` without `GSETPEN` causes a NullReferenceException in EM+EE, but returns `0` in the Skia version.

!!! hint "Hint"

    Both command and expression function supported.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		GCREATE 0, 100, 100
		GSETPEN 0, 0xFF00FF00, 5

		PRINTFORMW Color:{GGETPEN(0)}(%CONVERT(GGETPEN(0), 16)%) Width:{GGETPENWIDTH(0)}
	```

	``` title="Result"
	Color:4278255360(ff00ff00) Width:5
	```

### Related Items
- [GSETPEN](GSETPEN.en.md)
- [GGETPENWIDTH](GGETPENWIDTH.en.md)
