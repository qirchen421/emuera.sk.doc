---
hide:
  - toc
---

# GETMETH, GETMETHS, GETMETHF

| Function name | Arguments | Return |
| :----------------------------------------------------------- | :---------------------------------- | :-------- |
| ![](../assets/images/Iconetc.webp)[`GETMETH`](./GETMETH.en.md)  | `string`(, `int`, `argument`...)    | `int`     |
| ![](../assets/images/Iconetc.webp)[`GETMETHS`](./GETMETH.en.md) | `string`(, `string`, `argument`...) | `string`  |
| ![](../assets/images/IconSK.webp)[`GETMETHF`](./GETMETH.en.md)  | `string`(, `float`, `argument`...)  | `float`   |

!!! info "API"

    ```  { #language-erbapi }
	int GETMETH functionName(, defaultValue, argument...)
	string GETMETHS functionName(, defaultValue, argument...)
	float GETMETHF functionName(, defaultValue, argument...)
    ```
	Calls an in-expression function from a string. `GETMETH` corresponds to `#FUNCTION`, `GETMETHS` corresponds to `#FUNCTIONS`, and `GETMETHF` corresponds to `#FUNCTIONF`.
	The second argument is the return value if the function is not found; the third and subsequent arguments become the arguments for the in-expression function specified in the first argument.

!!! hint "Hint"

	Available as both a statement and in-expression function.

### Related
- [GETVAR,GETVARS,SETVAR](GETSETVAR.en.md)
