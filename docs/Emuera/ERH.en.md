# Header Files

In addition to files with the ERB extension, you can place files with the ERH extension in the ERB folder.  
ERH files contain content that should be processed before ERB files.  
Specifically, this includes global variable definitions using `#DIM` and `#DIMS`, and macro definitions using `#DEFINE`.  
You must not write lines other than `#DIM`, `#DIMS`, and `#DEFINE` in headers.

Emuera reads all `*.ERH` files placed in the ERB folder.  
The processing order is `files in csv folder` → `*.ERH` → `*.ERB`, so ERH effects do not apply to content in the CSV folder.  
Conversely, replacement by `_rename.csv` is also applied to `*.ERH`.  
eramakerEX does not apply `_rename.csv` to `*.ERH`, so using ERH files will lose compatibility with `eramakerEX`.

## Declaring Global Variables

See also: [User-Defined Variables](./user_defined_variables.md)

You can declare new variables in header files.  
These become global variables that can be referenced from all places in ERB, unlike private variables declared within ERB.  
Unlike private variables, there is no `DYNAMIC`/`STATIC` distinction, and you cannot declare reference type variables using `REF`, but you can similarly declare constants using `CONST`.  
You can declare up to 3-dimensional variables.  
If you do not specify the number of elements, it becomes an array with 1 element, so you can use it like a non-array variable.  
Variable declarations are made using `#DIM` or `#DIMS` as follows.  
Note that `#DIM HOGE,1,2` creates a 2-dimensional array.

	<*.ERH>
		#DIM MY_INT
		#DIM MY_INT_ARRAY, 100
		#DIMS MY_STR
		#DIMS MY_STR_ARRAY, 100

By defining the above in an ERH file, you can use them in ERB files as follows:

	<*.ERB>
		MY_INT = 100
		MY_INT_ARRAY:10 = MY_INT_ARRAY:10 + 45
		MY_STR = aaa
		PRINTFORML {MY_INT_ARRAY:10} %MY_STR%

The number of elements in a variable declaration using `#DIM` can be specified with a number or a constant expression.  
However, note that unlike `#DIM` in `*.ERB` files, macros are not expanded.

### `SAVEDATA` Keyword

By adding the `SAVEDATA` keyword when declaring a variable, you can declare a saveable variable.  
However, when declaring a multi-dimensional saveable variable using the `SAVEDATA` keyword, the option `Save data in binary format` must be enabled.

	<*.ERH>
		#DIM SAVEDATA MY_INT_ARRAY, 100
		#DIMS SAVEDATA MY_STR_ARRAY, 100

By declaring this way, the contents of `MY_INT_ARRAY` and `MY_STR_ARRAY` are saved and loaded like existing variables such as `DAY` and `MONEY`.  
Conversely, variables declared without the `SAVEDATA` keyword are not saved and are initialized when loaded.

### `CHARADATA` Keyword

By adding the `CHARADATA` keyword when declaring a variable, you can declare a character variable.  
`CHARADATA` can be used together with the `SAVEDATA` keyword.

	<*.ERH>
		#DIM CHARADATA C_INT_ARRAY, 100
		#DIMS CHARADATA C_STR_ARRAY, 100
		#DIM CHARADATA SAVEDATA CS_INT_ARRAY, 100

In the above example, `C_INT_ARRAY` and `C_STR_ARRAY` are character variables but are not saved/loaded.  
`CS_INT_ARRAY` is a character variable and is both saved and loaded.

### `GLOBAL` Keyword

By adding the `GLOBAL` keyword when declaring a variable, you can declare a global variable.  
`GLOBAL` can be used together with the `SAVEDATA` keyword.

	<*.ERH>
		#DIM GLOBAL G_INT_ARRAY, 100
		#DIMS GLOBAL G_STR_ARRAY, 100
		#DIM GLOBAL SAVEDATA GS_INT_ARRAY, 100

Global variables are neither loaded nor initialized during normal save/load.  
Because of this property, they can be used to share data between different save files.  
When using both `GLOBAL` and `SAVEDATA` keywords, the variable becomes one that is read from and written to the `global.sav` file by the `SAVEGLOBAL` and `LOADGLOBAL` commands.

For details on initial values and constants, see [User-Defined Variables](./user_defined_variables.md).

## Macro Definitions

Here, "macro" refers to a function that replaces strings in ERB code with predefined other strings.  
Although it is called a macro, it has nothing to do with keyboard macros that can be used with the `F1-F12 keys` during Emuera execution.  
This feature was created with reference to `#define` in C and C++.  
By defining macros in ERH files, they apply to code in all ERB files.

### Basic Usage

Macros are typically defined as follows:

	<*.ERH>
		#DEFINE <identifier to replace> <replacement expression>

This replaces <identifier to replace> with <replacement expression> in ERB. For example, if you define:

	<*.ERH>
		#DEFINE FIVE 5

in an ERH file, the string FIVE in ERB files is replaced with 5. For example:

	<*.ERB>
		X = FIVE

becomes

	(After expansion)
		X = 5

You can also add end-of-line comments to macros.  
Everything after a semicolon is ignored as a comment.  
The part after the semicolon is not included in the macro and will not be expanded.

	<*.ERH>
		#DEFINE FIVE 5 ;comment
	<*.ERB>
		X = FIVE + FIVE
	(After expansion)
		X = 5 + 5

Note that macro expansion is done almost exactly as strings.

	<*.ERH>
		#DEFINE SIX           1 + 5
		#DEFINE NINE          8 + 1
	<*.ERB>
		X = SIX * NINE

You might think `X` would be assigned `6*9`, i.e., 36, but actually:

	(After expansion)
		X = 1 + 5 * 8 + 1

Since multiplication takes precedence, `X = 42`.

Macros can be expanded to constant strings like `"~~"`, or to variables, functions, or expressions.  
If you consider that the string to the right of `#DEFINE` is expanded as-is, you can understand most cases.

	<*.ERH>
		#DEFINE HOGE        "hogehoge"
		#DEFINE PIYO        A
		#DEFINE FUGA        DA:10
		#DEFINE HOGERA      LOCAL + MY_FUNC(X, Y)
	<*.ERB>
		X = STRLEN(HOGE)
		Y = PIYO + 5
		FUGA:20 += PIYO
		LOCAL = HOGERA

		@MY_FUNC(ARG, ARG:1)
		#FUNCTION
			~omitted~
	(After expansion)
		X = STRLEN("hogehoge")
		Y = A + 5
		DA:10:20 += A
		LOCAL = LOCAL + MY_FUNC(X, Y)

		@MY_FUNC(ARG, ARG:1)
		#FUNCTION
			~omitted~

Due to the specification that macros are expanded as strings, you can also make the replacement target an incomplete operator or part of an expression.  
However, such usage is not recommended.  
Unless used very carefully, it will significantly reduce code readability.

	<*.ERH>
		#DEFINE PLUS       +
		#DEFINE FIVEPLUS   5 +
	<*.ERB>
		X = 1 PLUS 2
		Y = FIVEPLUS 2
	(After expansion)
		X = 1 + 2
		Y = 5 + 2

### Nested Macro Expansion

You can define macros that contain other macros. Such macros are repeatedly expanded during ERB loading until macros can no longer be applied.

	<.ERH>
		#DEFINE FIVE_1 5
		#DEFINE FIVE_2 FIVE_1 + FIVE_1
		#DEFINE FIVE_3 FIVE_2 + FIVE_2
	<.ERB>
		X = FIVE_3
	(After expansion)
		X = 5 + 5 + 5 + 5

If a macro still remains after a certain number of expansion iterations, Emuera will terminate processing with an error, suspecting a self-referencing or circularly referencing macro.  
Be careful not to create self-referencing or circularly referencing macros like the following:

	<.ERH>
		#DEFINE HOGE HOGE
		#DEFINE PIYO FUGA + 1
		#DEFINE FUGA PIYO + 2
	<.ERB>
	;Error
		X = HOGE
		Y = PIYO

### Preprocessor

You can branch whether to execute multiple lines based on whether a macro with a certain name is defined.  
Lines between the `[IF XXX]` line and the `[ENDIF]` line are executed only if `XXX` is `DEFINE`d. For example:

	<*.ERB>
		[IF HOGE]
			PRINTL HOGE is defined
		[ELSEIF PUYO]
			PRINTL HOGE is not defined
			PRINTL PUYO is defined
		[ELSE]
			PRINTL Neither HOGE nor PUYO is defined
		[ENDIF]

For this purpose, you can also define empty macros (macros without a replacement target).

	<*.ERH>
		#DEFINE HOGE

You can also use EM+EE's [`ISDEFINED`](../Reference/ISDEFINED.md) for the same purpose.

### Macro Limitations

Macros are basically expanded only within expressions.

	<*.ERH>
		#DEFINE FIVE 5
	<*.ERB>
		PRINT FIVE

simply prints the characters `FIVE`. This is the same as `PRINT X` printing only the characters `X`, not the value of `X`.

The replacement target of a macro cannot be an assignment operator or an expression containing an assignment operator.  
The following macro definitions cause errors:

	<*.ERH>
	;Error
		#DEFINE HOGE =
		#DEFINE PUGE X = 1

While it was written that macro replacement targets can be parts of expressions, the correspondence of parentheses must be complete within the macro itself. The following macro definitions cause errors:

	<*.ERH>
	;Error
		#DEFINE HOGE ( X +
		#DEFINE PUGE Y )
	<*.ERB>
		Z = HOGE PUGE

The replacement target of a macro cannot be an instruction.  
The following macro definition causes an error:

	<*.ERH>
		#DEFINE MY_PRINTL     PRINTL
	<*.ERB>
		MY_PRINTL This is PRINTL
	(After expansion)
		;Error

As mentioned above, macros are applied only to `*.ERB`, not to `*.csv` and `*.ERH`.  
Also, even within `*.ERB`, they are not applied to preprocessors, attribute names, or symbols at the beginning of lines.  
`[SKIPSTART]`, `#DIM`, `#FUNCTION`, the `@` part of `@EVENTFIRST`, etc., are not subject to replacement.  
For example, even if you `#DEFINE HOGE SKIPSTART`, `[HOGE]` will not start commenting.  
However, even for strings after `#`, variable names like those in `#DIM` are subject to replacement.  
For example, the following code:

	<*.ERH>
		#DEFINE HOGE MY_INT
		#DEFINE FIVE 5
	<*.ERB>
		@FUNC
		#DIM HOGE, FIVE
		HOGE:0 = 10
	(After expansion)
		@FUNC
		#DIM MY_INT, 5
		MY_INT:0 = 10

is expanded as shown and works correctly.
