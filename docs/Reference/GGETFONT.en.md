---
hide:
  - toc
---

# GGETFONT

| Function name                                                      | Arguments | Return    |
| :----------------------------------------------------------- | :-------- | :-------- |
| ![](../assets/images/IconEE.webp)[`GGETFONT`](./GGETFONT.md) | `int`     | `string` |

!!! info "API"

	``` { #language-erbapi }
	string GGETFONT gID
	```

	Returns the font name set by `GSETFONT` for the `Graphics` with the specified `gID`.

!!! hint "Hint"

    Both command and expression function supported.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		GCREATE 0, 100, 100
		GSETFONT 0, "Arial", 100

		GCREATE 1, 100, 100
		GSETFONT 1, "MS Gothic", 100

		PRINTSL GGETFONT(0)
		PRINTSL GGETFONT(1)
		WAIT
	```

	``` title="Result"
	Arial
	MS Gothic
	```

### Related Items
- [GSETFONT](GSETFONT.md)
- [GGETFONTSIZE](GGETFONTSIZE.md)
- [GGETFONTSTYLE](GGETFONTSTYLE.md)
