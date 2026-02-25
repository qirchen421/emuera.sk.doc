---
hide:
  - toc
---

# GGETFONTSTYLE

| Function name                                                                  | Arguments | Return |
| :--------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`GGETFONTSTYLE`](./GGETFONTSTYLE.md) | `int`     | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int GGETFONTSTYLE gID
	```

	Returns the font style set by `GSETFONT` for the `Graphics` with the specified `gID`.

!!! hint "Hint"

    Both command and expression function supported.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		GCREATE 0, 100, 100
		GSETFONT 0, "Arial", 100, 1|8

		GCREATE 1, 100, 100
		GSETFONT 1, "MS Gothic", 100, 2|4

		PRINTVL GGETFONTSTYLE(0)
		PRINTVL GGETFONTSTYLE(1)
		WAIT
	```

	``` title="Result"
	9
	6
	```

### Related Items
- [GSETFONT](GSETFONT.md)
- [GGETFONT](GGETFONT.md)
- [GGETFONTSIZE](GGETFONTSIZE.md)
