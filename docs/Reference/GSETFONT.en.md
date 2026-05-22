---
hide:
  - toc
---

# GSETFONT

| Function name                                                        | Arguments                             | Return |
| :--------------------------------------------------------------- | :----------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GSETFONT`](./GSETFONT.en.md) | `int`, `string`, `string`(, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GSETFONT gID, fontName, fontSize(, fontStyle)
    ```
	Sets the font with the specified name and size to the `Graphics` with the specified `gID`.  
	The specified font is retained until the `Graphics` is disposed via the [`GDISPOSE`](./GDISPOSE.en.md) command.  
	Returns non-zero on success.  
	To retrieve the set font name and font size, use [`GGETFONT`](./GGETFONT.en.md) and [`GGETFONTSIZE`](./GGETFONTSIZE.en.md).  
	In EM+EE, an optional 4th argument was added. You can specify the font style. Specify using the same 4-bit number as [`SETFONT`](./SETFONT.en.md).  
	In EM+EE, you can also specify `ttf` and `otf` files located in the `font` folder.  
	The font set with `GSETFONT` is used in the following commands/expression functions:  

	- [`GDRAWTEXT`](./GDRAWTEXT.en.md)


!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GDRAWTEXT](GDRAWTEXT.en.md)
- [GGETFONT](GGETFONT.en.md)
- [GGETFONTSIZE](GGETFONTSIZE.en.md)
- [GGETFONTSTYLE](GGETFONTSTYLE.en.md)
