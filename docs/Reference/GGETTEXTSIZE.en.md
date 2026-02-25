---
hide:
  - toc
---

# GGETTEXTSIZE

| Function name                                                              | Arguments                             | Return        |
| :------------------------------------------------------------------- | :----------------------------------- | :------------ |
| ![](../assets/images/IconEE.webp)[`GGETTEXTSIZE`](./GGETTEXTSIZE.md) | `string`, `string`, `int`(, `int`) | `int`, `int` |

!!! info "API"

	``` { #language-erbapi }
	int GGETTEXTSIZE text, fontName, fontSize(, fontStyle)
	```

	Sets the drawing area width and height when performing `GDRAWTEXT` with the specified arguments to `RESULT:0` and `RESULT:1` respectively.

!!! hint "Hint"

	Supports both command and expression function, but for expression functions, you need to handle RESULT:1 separately, so using it as a command is recommended.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE

		GGETTEXTSIZE "USA", "Arial", 150
		PRINTFORML Width:{RESULT:0} Height:{RESULT:1}
		GGETTEXTSIZE "Japan", "Arial", 150
		PRINTFORML Width:{RESULT:0} Height:{RESULT:1}
		GGETTEXTSIZE "USA", "MS PGothic", 150
		PRINTFORML Width:{RESULT:0} Height:{RESULT:1}
		GGETTEXTSIZE "Japan", "MS PGothic", 150
		PRINTFORML Width:{RESULT:0} Height:{RESULT:1}
		WAIT
	```

	``` title="Result"
	Width:308 Height:167
	Width:330 Height:172
	Width:281 Height:150
	Width:300 Height:150
	```

### Related Items
- [GDRAWTEXT](GDRAWTEXT.md)
