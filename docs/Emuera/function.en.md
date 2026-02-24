# Functions and Preprocessors

## Special Functions

### `@EVENTLOAD`
Called immediately after loading data.  
Since it is an event function, it can be defined multiple times.  
If `@EVENTLOAD` is not defined, it transitions to `@SHOW_SHOP` (same behavior as eramaker).

### `@TITLE_LOADGAME`
Called when Load is selected on the standard title screen.  
By defining `@TITLE_LOADGAME`, you can use your own load screen even on the title screen.  
If not defined, the standard load screen is used.  
If `@SYSTEM_TITLE` is defined, `@TITLE_LOADGAME` will not be called unless you explicitly [`CALL`](../Reference/CALL.md) it.

### `@SYSTEM_AUTOSAVE`
Called at the timing when an autosave is performed.  
You can define the contents of the autosave yourself.  
If not defined, the standard save function is used.

### `@SYSTEM_TITLE`
Called when CSV loading is complete.  
Also called by `BEGIN TITLE`.  
By defining `@SYSTEM_TITLE`, you can use your own title screen.  
If not defined, the standard title screen is used.

### `@CALLTRAINEND`
A function automatically called from within the system after automatic execution by `CALLTRAIN` ends.  
Note that since it is not an event function, it cannot be multiply defined.

## Argument Specification in User-Defined Functions

### Format

**Function side**

		@(FunctionName),(Arg1),{(Arg2)....}
		Arguments are ARG(:0,1,2...) for numbers, ARGS(:0,1,2...) for strings
		Private variables defined with #DIM, #DIMS in the function can also be specified as arguments

**Calling side**

		CALL (FunctionName),(Arg1),{(Arg2)....}

Both numeric expressions and string expressions can be used for numbers.  
When using string literals (constants) as arguments, enclose them in `""`.  
When using formatted string literals as arguments, write them as `@"~~"`.  
The same format can be used with [`JUMP`](../Reference/JUMP.md), CALLFORM, TRYCALL, etc., in addition to [`CALL`](../Reference/CALL.md).  
Any number of arguments can be specified on the function side.  
As of ver 1.808, if the types differ between the function side and calling side, an error occurs without conversion, regardless of whether it's number to string or string to number.  
If you want to call with a number for a string-type argument as in ver 1.807 and earlier, change the config setting or use the `TOSTR` function.  
Arguments can be omitted. If omitted, 0 is assigned for numeric types and an empty string for string types (if no default value is set).  
In the called function, passed values can be referenced with `ARG` and `ARGS`.  
Basically, it is pass-by-value, so note that changing the contents of `ARG` does not change the value of the original variable etc. that was passed.  
It is also possible to use variables other than `ARG`, `ARGS`, or private variables defined with `#DIM`, `#DIMS` in the function (such as `A` or `STR`) as arguments, but there are some limitations.  
As of ver 1.808, when using these variables, default values cannot be set and arguments cannot be omitted.

	;Definition
	@FOOBAR, ARG:0, ARGS:0
		~~
	@HOGEHOGE, ARG:0, ARG:1, ARG:2
		~~
	;Calling
	;Specify with variable
		CALL FOOBAR, X , STR:0
	;Specify with constant
		CALL FOOBAR, 123 , "aiu"
	;Specify with formatted string
		CALL FOOBAR, 123 , @"[{COUNT}] aiu"
	;Specify with expression
		CALL FOOBAR, X + 10, "aiu" * 10
	;Omit all arguments
		CALL FOOBAR
	;Omit first argument
		CALL FOOBAR, , "aiu"
	;Omit second argument
		CALL FOOBAR, 123

**<Examples that cause errors>**

	;Error (too many arguments)
		CALL FOOBAR, X , STR:0, Y
	;Error (wrong argument type - trying to assign string to numeric first argument)
		CALL FOOBAR, "aiu", "kaki"
	;Error (wrong argument type - trying to assign number to string second argument)
		CALL FOOBAR, 123 , 456

**<Examples that work but are not recommended>**

	;Destination can be other than ARG, ARGS, but normally ARG is recommended
	@FOOBAR, X, Y
	;Destination can be variable, but readability decreases
	@FOOBAR, ARG:X, ARG:Y
	;Readability decreases
	@FOOBAR, ARG:0, ARG:(ARG:0)

### Default Values for Arguments

You can set default values for function arguments.  
When setting default values, the function side becomes as follows:

	@(FunctionName),(Arg1 = Default1),{(Arg2 = Default2)....}
	Arguments are ARG(:0,1,2...) for numbers, ARGS(:0,1,2...) for strings,
	or private variables defined with #DIM, #DIMS in the function
	Other specifications cannot have default values set.

Only constants and constant strings can be specified as default values; variables cannot be specified.  
Also, default strings must be enclosed in `""`.  
If a default value is set and the calling side omits the argument, the set default value is assigned.  
If the function is called without omitting, the passed values are assigned to `ARG` and `ARGS` as usual.

	;Default value setting (partial omission is also possible)
	@FUNCTION, ARGS:0 = "kaki", ARG:0 = 111, ARG:1, ARG:2 = 200
		~~

	;Error (default values can only be constants and constant strings)
	@FOOBAR, ARG:0 = MASTER, ARG:1 = TARGET
	;Setting default values for arguments other than ARG, ARGS, or private variables defined with #DIM, #DIMS in the function is ignored.
	;Therefore, it does not behave as expected.
	@FOOBAR, X = 5, Y = 4

### Pass by Reference for Arguments

From ver 1.810, pass by reference for arguments became possible by making a reference type variable a formal parameter.  
See the [Reference Type Variables](user_defined_variables.md#_6) section for how to define reference type variables.

**<xxx.ERB>**

	@SYSTEM_TITLE
	A = 0
	CALL TEST(A)
	B = 1
	CALL TEST(B)
	PRINTFORML A == {A}
	PRINTFORML B == {B}
	WAIT

	@TEST(HOGE)
	#DIM REF HOGE
	HOGE = 100
	RETURN

**<Execution Result>**

	A == 100
	B == 100

In the above example, the function `@TEST` has a reference type variable as a formal parameter.  
When `@TEST` is called the first time, `HOGE` becomes a reference to the actual argument `A`.  
Since `HOGE = 100` in the function `@TEST` assigns `100` to the referenced variable `A`, the result of the first `PRINTFORML` is `100`.  
Similarly, when `@TEST` is called the second time, `100` is assigned to the variable `B`, and the result of the second `PRINTFORML` is also `100`.

## Attributes

Preprocessors that determine function specifications and behavior.  
When writing preprocessors starting with `#` in a function, they must be placed immediately after the function.

### `#ONLY`
An attribute for event functions only.  
If there is an event function with `#ONLY` specified, only that one is executed, and other event functions with the same name are not executed.  
Also, if there are multiple event functions with the same name with `#ONLY` specified, only "the first one" is executed.

### `#FUNCTION`
An attribute for expression functions.  
Expression functions cannot end with a normal RETURN; instead, they must end with `RETURNF <numeric expression>`.  
See [User-Defined Expression Functions](user_defined_in_expression_function.md) for details.

### `#FUNCTIONS`
An attribute for expression functions.  
Expression functions cannot end with a normal `RETURN`; instead, they must end with RETURNF <string expression>.  
See [User-Defined Expression Functions](user_defined_in_expression_function.md) for details.

## Definitions

Preprocessors that define variable names and their specifications.  
When writing preprocessors starting with `#` in a function, they must be placed immediately after the function.

### `#LOCALSIZE <constant expression>`, `#LOCALSSIZE <constant expression>`

Preprocessors for specifying the number of elements of `LOCAL` and `LOCALS` individually for each function.  
The result of the constant expression must be an integer greater than 0; otherwise, if an expression containing variables or an uninterpretable string is given, it is ignored.  
If ignored or if this preprocessor is not used, the setting value in `VariableSize.csv` is used normally.  
If this preprocessor is used on an event function, the setting of the first one executed is used (as of ver 1800).

### `#DIM`

User-defined variable declaration. When used in a specific function in ERB, you can define a numeric variable that can only be used within that function.  
See User-Defined Variables for details.  
Also, when used in an ERH file, you can define a numeric variable whose value can be shared by all functions.  
See [Header Files (ERH)](ERH.md) for details.

### `#DIMS`

User-defined variable declaration. When used in a specific function in ERB, you can define a string variable that can only be used within that function.  
See User-Defined Variables for details. Also, when used in an ERH file, you can define a string variable whose value can be shared by all functions.  
See [Header Files (ERH)](ERH.md) for details.

### `#DEFINE`

DEFINE macro declaration. When used in an ERH file, you can replace strings in all ERB code with predefined other strings.  
See Header Files (ERH) for details.

## Lines Representing Special Blocks

These are preprocessor lines.  
On the same line where these are written, you must not write commands, functions, or comments immediately after them.  
These cannot be interpreted by eramaker, so you may need to use `;!;` when coding.

### `[SKIPSTART]` to `[SKIPEND]`

Lines written between `[SKIPSTART]` and `[SKIPEND]` are not read or executed by Emuera.  
This is used when intentionally changing behavior between Emuera and eramaker.  
Use this when writing statements you do not want executed in Emuera.  
Also, by combining with `;!;`, you can write statements you do not want executed outside of Emuera.  
See the [Notation Added in Emuera](expression.md) section for details.

### `[IF XXX]` to `[ELSEIF XXX]` to `[ELSE]` to `[ENDIF]`

You can branch whether to execute multiple lines based on whether a macro named `XXX` is defined.  
See [Header Files (ERH)](ERH.md) for details.

### `[IF_DEBUG]` to `[ENDIF]`

Lines written between `[IF_DEBUG]` and `[ENDIF]` are executed only in debug mode.  
In non-debug mode, they are treated as comment lines and not executed.  
However, `DEBUG` commands are originally ignored in non-debug mode, so there is no need to prefix `;#;` to the beginning of the line.  
Similarly, debug variables are empty strings or 0 in non-debug mode, so there is no worry about errors.  
See [here](debug.md) for debug mode.

### `[IF_NDEBUG]` to `[ENDIF]`

Lines written between `[IF_NDEBUG]` and `[ENDIF]` are executed only in non-debug mode.  
In debug mode, they are treated as comment lines and not executed.  
The condition is reversed compared to `[IF_DEBUG]`.  
See [here](debug.md) for debug mode.
