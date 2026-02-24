# Expression Functions

**The syntax explained on this page is not required.**  
**Everything that can be done in ERB can also be done without using "Expression Functions" (the script will just be a bit longer).**  
**If you don't feel inconvenienced by the existing syntax, you don't need to use "Expression Functions".**

"Expression Functions" is a new syntax added in Emuera ver 1.712.  
This is what is simply called a "function" in many programming languages.  
In eramaker basic, what is defined with `@~~` and called with [`CALL`](../Reference/CALL.md) is called a "function", so Emuera calls the new "function" a "function available in expressions".  
Below, when there is no misunderstanding, "Expression Functions" will simply be called functions.

Also, other pages may abbreviate "Expression Functions" as "expression functions".  
However, this is unrelated to expression functions (anonymous functions) or inline functions in other programming languages.  
For user-defined "Expression Functions" that are not built-in and are defined and used in ERB, see [User-Defined Expression Functions](./user_defined_in_expression_function.md).

"Expression Functions" are used as follows:

	A = ABS(A)
	IF STRLENS(STR:0) > A
		LOCALS:0 = %SUBSTRING(STR:0, A, 1)%
	ENDIF

This script:
Calculates the absolute value of A and assigns it to A,
and if the string length of `STR:0` is greater than `A`,
assigns the `A`-th character of `STR:0` to `LOCALS:0`.

The above script can be rewritten without using "Expression Functions" as follows:

	ABS A
	A = RESULT
	STRLENS STR:0
	IF RESULT > A
		SUBSTRING STR:0, A, 1
		LOCALS:0 = %RESULTS:0%
	ENDIF

Except for intermediate values being assigned to `RESULT` and `RESULTS`, this behaves exactly the same as above.

# Notation

The following explains the symbols used in the documentation.  
For example:

	int STRLENS(str s)
	str SUBSTRING(str s, int start = 0, int length = -1)

The initial `int` or `str` represents the return type.  
`int` means integer type, `str` means string type.  
The following script works on line 1 but causes an error on line 2:

	A = STRLENS("abc")
	A = SUBSTRING("abc", 0, 1)

The return value of [`SUBSTRING`](../Reference/SUBSTRING.md) is `str`, i.e., string type, so it cannot be assigned to the integer variable `A`. Functions that return string type cannot be assigned, but can otherwise be treated like string variables.

	STR = %SUBSTRING("abc", 0, 1)%

Next, [`STRLENS`](../Reference/STRLEN.md) or `SUBSTRING` is the function name.

The characters inside `()`, such as `str s`, represent arguments.  
If there are multiple arguments, they are separated by `,` (comma). `STRLENS` has 1 argument, `SUBSTRING` has 3 arguments.

The first word of an argument is the argument type.  
The argument of `STRLENS` is string type (str).  
For `SUBSTRING`, the first argument is string type (str), and the second and third arguments are integer type (int).  
The following words like `str`, `start`, and `length` are argument names.  
Argument names are convenience names used in the documentation and do not need to be specifically noted.

The `= 0` after the argument name indicates that the argument can be omitted and shows the default value when omitted.  
All of the following lines have the same meaning:

	STR = SUBSTRING(RESULTS)
	STR = SUBSTRING(RESULTS, 0)
	STR = SUBSTRING(RESULTS, , -1)
	STR = SUBSTRING(RESULTS, 0, -1)

When omitting a middle argument rather than the last argument, you need to insert `,` to indicate which argument is being omitted, like `SUBSTRING(RESULTS, , -1)`.  
However, this is not necessary when it is clear which argument is omitted.  
All of the following lines have the same meaning:

	;int RAND(int min = 0, int max)
	A = RAND(100)
	A = RAND( , 100)
	A = RAND(0, 100)

Also,

	int GETTIME()

indicates no arguments. In this case, `()` is still required (to distinguish from variables).

	int FINDCHARA(var key, ? value, int start = 0)

Here, `var` represents a variable type. You pass a variable like `TALENT`.  
`?` indicates that multiple types are accepted.  
In `FINDCHARA`, the type to pass as the second argument depends on the variable specified as the first argument.

	int MAX(int n, int m...)

indicates that any number of arguments are acceptable.

	M = MAX(A, B, C, D, E, F, G)

assigns the largest number among A through G to M.

The documentation for EM+EE uses a slightly different notation.
