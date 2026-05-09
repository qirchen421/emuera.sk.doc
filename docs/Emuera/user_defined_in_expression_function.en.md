# User-Defined Expression Functions

You can also call functions defined with `@~~` in expressions as "Expression Functions".  
For built-in functions among "Expression Functions", see [Expression Functions](../Reference/README.md).

## Format

Functions to be called must have the `#FUNCTION` or `#FUNCTIONS` flag and end with `RETURNF`.

Adding `#FUNCTION` makes it recognized as a function that returns a number.  
Adding `#FUNCTIONS` makes it recognized as a function that returns a string.  
Functions with `#FUNCTION(S)` cannot end with a normal [`RETURN`](../Reference/RETURN.md). Instead, they end with `RETURNF`.  
`RETURNF` takes a numeric expression or string expression. This must match the type indicated by `#FUNCTION(S)`.  
If the `RETURNF` argument is omitted or the end of the function is reached without `RETURNF`, it returns `0` or an empty string.

	X = GET_CFLAG(TARGET, Y)
	STR = %GET_NAME(TARGET)%

	@GET_CFLAG(ARG:0, ARG:1)
	#FUNCTION
		SIF ARG:0 <= 0 || ARG:0 >= CHARANUM
			RETURNF 0
		RETURNF CFLAG:(ARG:0):(ARG:1)

	@GET_NAME(ARG:0)
	#FUNCTIONS
		SIF ARG:0 <= 0 || ARG:0 >= CHARANUM
			RETURNF ""
		RETURNF NAME:(ARG:0)

Note: Although arguments in function definitions are enclosed in `()`, this is not required syntax for definitions.  
When calling expression functions, you must use the syntax with `()`.  
As with normal functions, you can also separate the function name and arguments with commas.  
The following two lines mean the same thing:

	@GET_CFLAG(ARG:0, ARG:1)
	@GET_CFLAG, ARG, ARG:1

Also, you can set default values for arguments.  
For the syntax regarding default values, see [Argument Specification in User-Defined Functions](./function.en.md#argument-specification-in-user-defined-functions).

## Restrictions

### Cannot be Called from CALL
Functions with the `FUNCTION(S)` flag cannot be called normally with [`CALL`](../Reference/CALL.md) etc.  
They can only be called within expressions.

		;Error
		CALL GET_CFLAG, X, Y
	@GET_CFLAG(ARG:0, ARG:1)
	#FUNCTION
		SIF ARG:0 <= 0 || ARG:0 >= CHARANUM
			RETURNF 0
		RETURNF CFLAG:(ARG:0):(ARG:1)

They can be called using the dedicated commands `CALLF` and `CALLFORMF` for calling `#FUNCTION(S)`.

### Some Commands Cannot be Used
Inside functions with the `FUNCTION(S)` flag, commands that involve input such as [`WAIT`](../Reference/WAIT.md), and commands that involve function calls such as `CALL`, cannot be used.  
Using them will cause an error.

The `CALL` command cannot be used, but functions with the `FUNCTION(S)` flag can be called within expressions.  
Also, calling `#FUNCTION(S)` with the `CALLF` and `CALLFORMF` commands is possible.

### No Overloading
You cannot distinguish between multiple `#FUNCTION(S)` functions by differences in the number or type of arguments.  
Only one function with the same name can be defined; if multiple functions with the same name are defined, only the first defined function is valid.

### Overriding Built-in Functions
If you define a function with the same name as a built-in function, that built-in function can no longer be called.  
For example, if you define `@ABS`, you can no longer call the original ABS.  
Emuera displays a warning at startup when a built-in function is overridden.  
Since overriding a built-in function may cause unintended behavior, function overriding can be prohibited by configuration.  
There is also a config option to suppress warnings for intentional overriding (not recommended).

## Notes

You should not change variables other than local variables inside functions with the `FUNCTION(S)` flag.  
Functions that change variables other than local variables (functions with side effects) may behave differently due to short-circuit evaluation and expression evaluation order described below.  
Also, they may behave unexpectedly due to unexpected calls from debug commands or the debug variable watch window.

### Call Omission by Short-Circuit Evaluation

Even if there is a function in an expression, it may not be called due to short-circuit evaluation.

For example, the following script calls `GET_ASSI_CFLAG` inside the [`IF`](../Reference/IF.md) statement, and changes `ASSI` inside `GET_ASSI_CFLAG`.

		IF X || GET_ASSI_CFLAG(0)
			Y = CFLAG:ASSI:2
		ENDIF
	@GET_ASSI_CFLAG(ARG:0)
	#FUNCTION
		SIF ASSI < 0
			ASSI = 0
		RETURNF CFLAG:ASSI:(ARG:0)

At first glance, it seems that `Y = CFLAG:ASSI:2` would never have `ASSI < 0`.  
However, if `X` is non-zero, `GET_ASSI_CFLAG` is not executed due to short-circuit evaluation, so it may error when trying to evaluate `CFLAG:ASSI:2` with `ASSI < 0`.

### Results Change Depending on Expression Evaluation Order

The evaluation order of variables and functions in expressions is undefined.  
Functions with side effects may depend on the order in which functions in an expression are called.  
Do not write such code.  
The call order will likely be the same if the Emuera version is the same, but may change in the future.  
In the script below, `TARGET` is being changed inside `@ADDCHARA_CFLAG`.

		X = CFLAG:TARGET:10 + ADDCHARA_CFLAG(0)
	@ADDCHARA_CFLAG(ARG)
	#FUNCTION
		ADDCHARA ARG
		TARGET = CHARANUM -1
		RETURNF CFLAG:TARGET:2

Depending on whether `CFLAG:TARGET:10` is evaluated before or after `@ADDCHARA_CFLAG`, the variable referred to by `CFLAG:TARGET:10` changes.  
Therefore, this script depends on evaluation order.  
You should not use [`ADDCHARA`](../Reference/ADDCHARA.md) or assign to `TARGET` inside functions with the `#FUNCTION(S)` flag.

### May be Called by Debug Features

Functions with the `#FUNCTION(S)` flag may be dynamically called not only from scripts in `*.ERB` files, but also from debug commands and the debug variable watch window.  
In particular, the variable watch frequently tries to update values, calling that function with each update.  
Functions with side effects may malfunction due to such calls.
