---
hide:
  - toc
---

# GGETFONT

| Function name                                                      | Arguments | Return    |
| :----------------------------------------------------------- | :-------- | :-------- |
| ![](../assets/images/IconEE.webp)[`GGETFONT`](./GGETFONT.en.md) | `int`     | `string` |

!!! info "API"

	``` { #language-erbapi }
	string GGETFONT gID
	```

	Returns the font name set by `GSETFONT` for the `Graphics` with the specified `gID`.

!!! warning "Skia version note"

	Calling `GGETFONT` after `GCREATE` without `GSETFONT` causes a NullReferenceException in EM+EE, but returns an empty string `""` in the Skia version.

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
- [GSETFONT](GSETFONT.en.md)
- [GGETFONTSIZE](GGETFONTSIZE.en.md)
- [GGETFONTSTYLE](GGETFONTSTYLE.en.md)
