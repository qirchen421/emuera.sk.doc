# Glossary  
This is a summary of the terms used in this wiki.  
I wrote it as a memo because the original coined words have increased with the extension of Emuera.  

## Startup Mode  
### Normal Mode  
This is the mode when Emuera is started normally.  
You will be in this mode when you double-click on EmueraXXXX.exe to launch it.  

### Analysis Mode  
This is the mode when a file is passed as a command line argument.  
It also becomes this mode when a file is drag and dropped into EmueraXXXX.exe.  
In analysis mode, a grammar check is performed for dragged and dropped files.  
This allows you to check for grammatical errors in the files you are developing.  
However, you will need the CSV folder of the variant you plan to use to check the type of the elements string.  
Just drag and drop the file into the EmueraXXXX.exe of the variant you plan to use.  
In addition, from 1738g, when "Report is displayed when loading" is enabled in the analysis mode, it is possible to display the report when loading.  
The list of functions used in each loaded ERB file is now displayed.  
If you have too many functions, increase the number of lines in the log in your config.  

### Debug Mode  
This is the mode when the command is started by passing "-debug" as command line argument. See Debug Mode for details.  

## Windows / Dialogs  
### Main Window  
This is the first window that opens when you normally start up.  

### Main Console  
The name of the part of the Main Window that is used for input and output.  

### Debug Window  
This is a window that can be opened when started in Debug Mode.  

### Debug Console  
The name of the input/output part that is displayed when the "Console" tab is selected in the Debug Window.  

### Configuration Dialog  
It is a dialog that can be opened from the main window menu help or settings.  

### Clipboard Dialog  
It is a dialog that can be opened by Ctrl+C from the main console.  

## Functions  
### Commands  
PRINT or WAIT, for example.  

### Functions  
It is a name that is defined in an ERB script with @~~ statements and called with a CALL instruction, etc.  
Among the functions that can be used in expressions, those that define their names in sentences @~~ are included.  

### Event Functions  
A function whose name starts with "EVENT" and is called by the system.  
If you define more than one, all of them will be called.  

### Preprocessor  
A line in a file in the ERB folder that is processed before any other instruction.  
A line that begins with # or consists of a phrase enclosed in [].  
Lines that begin with # are divided into attributes and definitions. Please see them for more information.  
Lines consisting of words or phrases enclosed in [] represent special blocks.  
See this page for more information  

### Property (Preprocessor)  
A preprocessor that determines the type and behavior of a function with a line beginning with a # specified for the function.  
There are #PRI, #LATER, #SINGLE, and #ONLY to control the behavior of when the event function is executed,  
and #FUNCTION and #FUNCTIONS to specify the type of the function in the expression.  

### Definitions (Preprocessor)  
A preprocessor that defines the name of a variable and its type on a line beginning with #.  
Functions include #LOCALSIZE and #LOCALSSIZE to specify the number of elements in a LOCAL or LOCALS variable,  
`#DIM` and #DIMS to define a variable, and #DEFINE to define a DEFINE macro in the ERH.  
Functions that can be used in expressions  
It is a "function" that can be called from within an expression.  
The "function" includes not only the above functions but also the built-in functions described below.  
In many programming languages they are simply called "functions".  

### Functions in an Expression  
Abbreviation for a function that can be used in an expression.  
It has nothing to do with expression functions (anonymous functions) or inline functions in programming languages.  

### Built-in Functions  
Among expression functions, these are functions that are built into Emuera and can be used without defining them with @~~ statements.  
Examples include `ABS(X)` and `GETTIME()`.  
This is confusing, but they do not fall under the definition of "function" above.  
It may be easier to think of them as "instructions that can be used in expressions."  

### User-Defined Functions  
Functions defined by the user.  
These are functions whose names are defined with @~~ statements in ERB scripts and called with the CALL instruction, etc.  
In other words, they are the same concept as the "functions" above.  

### `#FUNCTION(S)` Functions  
Functions whose names are defined with @~~ statements and have the #FUNCTION(S) attribute.  
These are functions that are both "functions" and "expression functions."  

## Lines, Statements, and Expressions  
### Line  
The text from one newline code to the next newline code.  
In programming contexts, this is also called a "physical line."  
Confusingly, in editor contexts, this is often called a "logical line."  

### Statement  
A statement (or logical line) is a single processing unit in Emuera.  
Most statements consist of one instruction and its arguments, or a variable, an assignment operator, and an expression.  
In ERB, the rule is one statement per line, so "line" and "statement" mean almost the same thing.  
This wiki does not distinguish between them.  

### Expression  
A combination of variables, constants, expression functions, non-assignment operators, and parentheses.  
Assignment operators can only be used as the first operator in an assignment statement and cannot be used in expressions.  

### Numeric Expression  
An expression whose evaluation result (operation result) is a number.  
For example, `A+B`, `STR == "abc"`, etc.  

### String Expression  
An expression whose evaluation result (operation result) is a string.  
For example, `STR + STR:1`, `"a" * 10`, etc.  

## Variables  
### Pseudo-Variables  
Things that can be written like variables, such as RAND and CHARANUM, but are not actually variables.  
Internally, they behave similarly to expression functions.  

### Array Variables  
Variables that have multiple elements.  
The number of elements in an array variable can be changed with `VariableSize.csv`, and normally does not increase or decrease in scripts,  
but for some local variables, the number of array elements can be specified in the script.  

### Character Variables  
Variables that record the state of characters.  
They are unrelated to char-type variables in C and other languages.  
Due to their nature, the number of elements increases or decreases as characters are added or removed via ADDCHARA or DELCHARA.  
Although they are treated as one type of array variable in eramaker's documentation because elements are specified in the same format as array variables, such as `NO:TARGET`, this wiki distinguishes between character variables and array variables.  

### Double Array Variables  
Variables that are both character variables and array variables.  
They take two arguments (can be omitted), such as `CFLAG:TARGET:2`.  
Since they are character variables, the first argument represents the character number.  
Also, the number of elements in the first dimension increases or decreases as characters are added or removed.  
The number of elements in the second dimension can only be changed with `VariableSize.csv` and does not increase or decrease in scripts.  

This wiki does not use the term "double array" except when explaining eramaker specifications.  
Instead, we use terms like "character variable that is also an array variable."  

### Multidimensional Array Variables  
These are two-dimensional array variables like `DITEMTYPE` and three-dimensional array variables like `TA`.  
They take 2 or 3 arguments, such as `DA:0:1` or `TA:1:2:3`.  
The number of elements in multidimensional array variables can only be changed with `VariableSize.csv` and does not increase or decrease in scripts.  
Also, arguments to multidimensional array variables cannot be omitted.  

### Character Multidimensional Array Variables  
Variables that are both character variables and multidimensional array variables.  
They take 3 arguments (cannot be omitted), such as `CFLAG:TARGET:0:2`.  
Since they are character variables, the first argument represents the character number.  
Also, the number of elements in the first dimension increases or decreases as characters are added or removed.  
The number of elements in the second and third dimensions can only be changed with `VariableSize.csv` and does not increase or decrease in scripts.  

As of ver1807, only `CDFLAG` falls into this category.  
See CDFLAG for details.  

### Local Variables  
Variables that are prepared for each function (function name), such as LOCAL, LOCALS, and private variables.  
See the separate section for private variables.  
LOCAL and LOCALS other than private variables are not actually "local variables" in the usual sense,  
but are `public static` variables named `LOCAL@function_name` or `LOCALS@function_name`.  
Values are retained even after exiting the function, and can be assigned and referenced from outside the function.  
Also, in cases like recursive calls where the function is called multiple times, the values are shared.  

### Global-Scope Variables  
Variables whose values are shared among all functions, to which most variables except LOCAL, LOCALS, private variables, etc. belong.  
This is also the concept of global variables in general programming languages.  
Also, global-scope variables can be defined by using `#DIM` or `#DIMS` in an ERH.  
See the Header Files (ERH) page for details.  

### Global Variables  
Variables whose values can be shared between different save data. Global variables are also included in global-scope variables.  
The timing of save/load and initialization is different from normal variables.  
Emuera's global variables are unrelated to the concept of global variables in general programming languages.  

### Private Variables  
Variables defined by `#DIM` or `#DIMS` for each function (function name).  
These are also local variables, so each function has its own separate instance.  
However, unlike LOCAL which is considered the same local variable, assignment and reference from outside the function using `@function_name` is not possible.  
See the User-Defined Variables page for details.  
