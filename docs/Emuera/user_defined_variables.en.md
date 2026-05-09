# User-defined variables  
You can define your favorite variables using #DIM and #DIMS.  
Variables defined within a function become private variables that can only be used within that function,  
Variables defined in the header file (ERH) are global variables that can be referenced from all places in the ERB.  

## Format (for private variables)  
Write `#DIM(S) <Variable Name>, <Number of Elements> {, <Number of Elements> {, <Number of Elements>}}` under the declaration of the function for which you want to define the variable.  
`<Variable Name>` is an arbitrary character string consisting of only "_" as the symbol, not the first character, like the function name.  
`<Number of Elements>` is any integer or constant expression within the range of 1 to 1000000. If omitted, it will be 1.  
The dimension of the defined variable changes depending on how many `<Number of Elements>` are given. The maximum is three-dimensional, and no more than four-dimensional variables can be defined.  
Multiple private variables by #DIM(S) can be defined in a single function.  

This makes the variable named by `<Variable Name>` available to the function.  
Variables can be assigned with the number of elements specified by `<Number of Elements>`, and are not saved. The initial value is 0 or an empty string.  
If it is defined by #DIM, it will be an integer variable, and if it is defined by #DIMS, it will be a string variable.  
The variable defined by #DIM(S) can be specified as an argument of the function. You can also set an initial value.  

	@FIND_CSTR (KEY, VALUE)  
	#FUNCTION  
	#DIM LCOUNT  
	#DIM KEY  
	#DIMS VALUE  
	SIF KEY < 0 || KEY >= VARSIZE("CSTR")  
		RETURNF -1  
	FOR LCOUNT, 0, CHARANUM  
		SIF LCOUNT == MASTER  
			CONTINUE  
		SIF CSTR:LCOUNT:KEY == VALUE  
			RETURNF LCOUNT  
	NEXT  

As in the script above, naming variables according to the application and setting the appropriate number of elements may improve readability due to non-contiguous use of LOCAL.  

## Initial value setting  
When declaring a one-dimensional array variable, you can define an initial value.  
The number of elements in the array that defines the initial value can be omitted, in which case the number of initial values ​​automatically becomes the number of elements in the array.  
If you do not omit the number of elements in the array, that number will be the number of elements in the array.  
If the number of elements is not omitted and the number of initial values ​​is larger than the number of elements, an error will occur.  

	;HOGE element number is 3 because element number is omitted  
	#DIM HOGE = 1,2,3  

	;PUGE element number is 100 because element number is not omitted  
	#DIM PUGE,100 = 4,5,6  

	;Error (the number of initial values ​​is larger than the specified number of elements)  
	#DIM HIGE,1 = 7,8,9  

	;Character string variable also possible (specified by character string expression)  
	#DIMS SHOGE = "A", "B", "C"  

Note that initial values ​​cannot be defined for multidimensional arrays.  

## Dynamic variables  
If you put DYNAMIC before the variable name like `#DIM(S) DYNAMIC <variable name>, <number of elements>`, the defined variable will be allocated dynamically.  
Specifically, it is allocated when the function is called, and the variable and its value disappear when the function ends.  
(Because the RESTART instruction is an "instruction to return to the beginning of the function", even dynamically allocated variables are not reset.)  
Even if you call (recursive) yourself in a function, variables are secured for the number of recursions, so the behavior of recursive processing is stable.  
However, the operation is slower than without DYNAMIC (static variable).  

## Constants  
When defining a one-dimensional array variable, enter CONST before the variable name to define a one-dimensional array constant.  
As with the default values, only one-dimensional array variables can be defined.  
A constant declaration must have an initial value and cannot be changed by assignment in the middle.  
CONST, by its very nature, cannot be used with the GLOBAL, SAVEDATA, REF, and DYNAMIC keywords.  
You can also specify the number of elements in the array without omitting it, but an error will occur if the number of elements does not match the number of initial values.  

	;Definition of one-dimensional constant array  
	#DIM CONST HOGE = 1,2,3  

	;Error (the number of initial values ​​and the number of elements do not match)  
	#DIM CONST PUGE,100 = 4,5,6  

	;Character string variable also possible (specified by character string expression)  
	#DIMS CONST SHOGE = "A", "B", "C"  

## Reference Type Variables  
You can define a reference variable by using the REF keyword before the variable name.  
Declare integer type 1 to 3 dimensional arrays and character string type 1 to 3 dimensional arrays as follows.  

	#DIM REF HOGE1DIM,0  
	#DIM REF HOGE2DIM,0,0  
	#DIM REF HOGE3DIM,0,0,0  
	#DIMS REF PUGE1DIM,0  
	#DIMS REF PUGE2DIM,0,0  
	#DIMS REF PUGE3DIM,0,0,0  

If there are commas, 0 can be omitted. Commas can also be omitted for one-dimensional arrays.  
Reference-type variables have no substance, and manipulating reference-type variables means that variables passed by REF instruction (currently unavailable in ver1.815) or by reference are manipulated instead.  
For details on passing by reference, see [../exfunc|Passing by Function-Argument Reference].  

## Format (for global variables)  
When #DIM(S) is described in the [../ERH|Header File (ERH)], unlike private variables defined in ERB,  
This is a global variable that can be referenced from all places in the ERB.  
Unlike private variables, there is no distinction between DYNAMIC and STATIC, and reference type variables using REF cannot be defined, but constants using CONST can be defined in the same way.  
It is possible to define variables, global variables, and character variables that are saved as functions that DIM does not have in functions.  
For details, see the [../ERH|Header File (ERH)].  

## Restrictions  
### Cannot use the same name as the instruction  
You cannot define a variable with the same name as an instruction as follows:  

	;Error  
	#DIM PRINTFORM  
	#DIM SELECTCASE  
	#DIM CALL  
	#DIM RETURN  
	#DIM GOTO  
	#DIM SQRT  
	#DIM DATAFORM  
	#DIM NOSKIP  
	#DIM FUNC  
	#DIM ENDFUNC  

Variables with the same names as function names and preprocessors can be defined, but are not recommended.  

	;Not recommended  
	#DIM EVENTFIRST  
	#DIM COMF32  
	#DIM COMABLE15  
	#DIM SHOW_ABLUP_SELECT  
	#DIM DIM  
	#DIM PRI  
	#DIM ONLY  
	#DIM SKIPSTART  

### Interference from outside the function  
Unlike LOCAL with LOCAL@HOGE, there is no way to reference or assign a private variable of another function.  

## `ERD (ERabasic Define)` Feature
A feature added in EM+EE. You can assign identifiers to variables defined in ERH using `*.csv` or `*.ERD` files, just like CSV variables.  
Below is a quote from the EM+EE Summary:

Variable arrays defined in `ERH` can have names assigned via `CSV`/`ERD` files, the same way as existing `CSV` variables.  
Files usable in the `CSV` folder follow the conventional `VariableName.csv` format, while files usable in `ERB` use the `VariableName.ERD` format. The file format is the same as CSV variable files. If two or more of these files exist, an error will only occur at startup if the same identifier is defined in multiple files. Different identifiers can map to the same integer.  
For multi-dimensional array variables, append `@` followed by a dimension number to the file name. Dimensions correspond from left to right as `1`, `2`, `3`.    

**ERH**

    #DIM HOGE, 3
    #DIM HOGE2D, 3, 3
    #DIM HOGE3D, 3, 3, 3

**File Structure**

    HOGE.ERD
    HOGE2D@1.ERD
    HOGE2D@2.ERD
    HOGE3D@1.ERD
    HOGE3D@2.ERD
    HOGE3D@3.ERD
