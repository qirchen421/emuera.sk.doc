---
hide:
  - toc
---

# ARGLEN

| Function Name | Arguments | Return |
| :----- | :--- | :----- |
| ![](../assets/images/IconSK.webp)[`ARGLEN`](./ARGLEN.en.md) | none | `int` |

!!! info "API"

	``` { #language-erbapi }
	int ARGLEN
	```

	Returns the number of variadic arguments (VARIADIC) passed to the current function. Only returns a meaningful value inside functions declared with the `VARIADIC` keyword.

	- `VARIADIC` can only be specified on the last parameter in a function's parameter declaration.
	- `VARIADIC` can only modify `ARG`, `ARGS`, or `ARGF`.
	- The same type of `ARG`/`ARGS`/`ARGF` cannot appear in both fixed parameters and VARIADIC parameters (use private variables for fixed parameters instead).
	- ARGLEN itself takes no arguments.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		PRINTFORML Argument count: {MYFUNC(1, 2, 3)}

	@MYFUNC(VARIADIC ARG:0)
		#FUNCTION
		RETURNF ARGLEN
	```
	``` title="Result"
	Argument count: 3
	```

	Example with mixed fixed and variadic arguments:

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		CALL GREET("Hello", "Alice", "Bob")

	@GREET(PREFIX, VARIADIC ARGS:0)
		; PREFIX is a private variable (fixed arg), ARGS:0... is variadic string arg
		PRINTFORM %PREFIX%:
		REPEAT ARGLEN
			PRINTFORM  %ARGS:COUNT%
		REND
		PRINTL
	```
	``` title="Result"
	Hello: Alice Bob
	```
