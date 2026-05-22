---
hide:
  - toc
---

# GSETPEN

| Function name                                                      | Arguments            | Return |
| :------------------------------------------------------------- | :------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`GSETPEN`](./GSETPEN.en.md) | `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GSETPEN gID, cARGB, penWidth
    ```
	Sets the pen with the specified color and width to the `Graphics` with the specified `gID`.  
	The specified pen is retained until the `Graphics` is disposed via the [`GDISPOSE`](./GDISPOSE.en.md) command.  
	Returns non-zero on success.  
	To retrieve the set pen color and pen width, use [`GGETPEN`](./GGETPEN.en.md) and [`GGETPENWIDTH`](./GGETPENWIDTH.en.md) respectively.  
	The pen color and width set with `GSETPEN` are used in the following commands/expression functions:

	- [`GDRAWTEXT`](./GDRAWTEXT.en.md)
	- [`GDRAWLINE`](./GDRAWLINE.en.md)

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GDRAWTEXT](GDRAWTEXT.en.md)
- [GDRAWLINE](GDRAWLINE.en.md)
- [GGETPEN](GGETPEN.en.md)
- [GGETPENWIDTH](GGETPENWIDTH.en.md)
