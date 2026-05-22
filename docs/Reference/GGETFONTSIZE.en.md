---
hide:
  - toc
---

# GGETFONTSIZE

| Function name                                                              | Arguments | Return |
| :------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`GGETFONTSIZE`](./GGETFONTSIZE.en.md) | `int`     | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int GGETFONTSIZE gID
	```

	Returns the font size set by `GSETFONT` for the `Graphics` with the specified `gID`.

!!! hint "Hint"

    Both command and expression function supported.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		GCREATE 0, 100, 100
		GSETFONT 0, "Arial", 100

		GCREATE 1, 100, 100
		GSETFONT 1, "MS Gothic", 200

		PRINTVL GGETFONTSIZE(0)
		PRINTVL GGETFONTSIZE(1)
		WAIT
	```

	``` title="Result"
	100
	200
	```

### Related Items
- [GSETFONT](GSETFONT.en.md)
- [GGETFONT](GGETFONT.en.md)
- [GGETFONTSTYLE](GGETFONTSTYLE.en.md)
