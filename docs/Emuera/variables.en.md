# Variable Specifications and List
Content has been supplemented to match EmueraEM+EE specifications

## Constants (Literals)
### Constant Notation
In Emuera, you can use the constant notation available in Kirikiri, except for octal notation.
For example, all of the following lines have the same meaning:

	X = 32
	X = 0b100000
	X = 0x20
	X = 1p5

From top to bottom, they are: normal `decimal`, `binary`, `hexadecimal`, and `1×2 to the power of 5`.
The notation like `1p5` is useful when combined with bit operators to get/set individual bits.
For example, the following conditional expression is true when bit 0 or bit 3 of `A` is set:

	IF (A & 1p0) || (A & 1p3)

Also, using `e` instead of `p` represents `n×10 to the power of m`.
For example, `13e3` equals `13000`.
The above are merely constant notations and cannot use expressions.
The following notation would result in an error:

	X = 13e(A + 1)

Regarding `octal notation`, we have not adopted it due to compatibility issues with eramaker.
`012` is interpreted as `12`, not `10`.

## Variables
### Variable Size Specification
In Emuera, you can specify the number of elements for existing variables by placing a file named `VariableSize.csv` in the csv folder.
Also, by specifying `-1` for the number of elements, you can prohibit the use of that variable in ERB.

Using or referencing a prohibited variable in ERB will result in an error.
If the system requires a prohibited variable, the assignment is ignored and the value is always treated as `-1`.
(This occurs when `MONEY` or `NEXTCOM` are prohibited.)
Also, if `COUNT` is set as a prohibited variable, `REPEAT` also becomes unusable and causes an error termination at runtime (EM+EE)

### Local Variables
#### LOCAL
#### LOCALS
**※This variable is `obsolete`. Please consider using `#DIM` and `#DIMS` instead.**
**See [User-Defined Variables](user_defined_variables.md) for details.**
**For new game development, it is recommended to set both `LOCAL` and `LOCALS` element counts to `-1` in `VariableSize.csv` to disable them, forcing migration to `#DIM`/`#DIMS`.**

Local variables.
`LOCAL` is integer, `LOCALS` is string.
The default size is 1000 for `LOCAL` and 100 for `LOCALS`.
Also, you can change the number of elements individually for each function using `#LOCALSIZE <number of elements>` and `#LOCALSSIZE <number of elements>`. (However, the value must be a positive integer)
They are not saved.

	@EVENTFIRST
		LOCAL:10 = 123
		CALL FUNC001
		PRINTV LOCAL:10
		WAIT
	@FUNC001
		LOCAL:10 = 567
		RETURN

The result of [`PRINTV`](../Reference/PRINT.md) in the above code will be `123`.
Even though `LOCAL:10` is changed inside `@FUNC001`, the `LOCAL` in `@EVENTFIRST` is not affected.
Unlike local variables in many other languages, they are not initialized when a function is called.

Internally, it creates a variable named `LOCAL@function name`.
Therefore, they are shared when there are multiple functions with the same name, such as event functions.
Also, when called recursively, they use the same variable.
You can also call variables for other functions like `LOCAL@EVENTFIRST:10 = 567`, but this is not recommended (it's for debugging).
Note that an error occurs if the called function name contains operators or other special characters.

#### `ARG`
#### `ARGS`
Local variables.
`ARG` is integer, `ARGS` is string.
The default size is 1000 for `ARG` and 100 for `ARGS`, which can be changed in `VariableSize.csv`.
Also, it automatically secures enough elements to use without problems only for the parts defined as function arguments. (It will not be less than the number specified in VariableSize.csv)

	@FUNC002, ARG:0, ARG:1, ARG,1100
		LOCAL = ARG:0 * ARG:1 / 100
		RETURN LOCAL

In this case, the number of elements of `ARG` is normally 1000, but in `@FUNC002`, the number of elements of `ARG` becomes 1101 (from 0 to 1100).
Since this is intended to be used for specifying arguments in functions, using it for other purposes may reduce readability.

#### (User-Defined Private Variables)
Variables defined using `#DIM` or `#DIMS` within a specific function become private variables and can be treated as local variables.
See [User-Defined Variables](user_defined_variables.md) for details.

### Variables Shared Between Save Data
#### `GLOBAL`
#### `GLOBALS`
Variables that can be shared between different save data.
`GLOBAL` is integer, `GLOBALS` is string.
The default size is 1000 for `GLOBAL` and 100 for `GLOBALS`, which can be changed in `VariableSize.csv`.
They are not saved/loaded together with other data.
To save global variables, use the `SAVEGLOBAL` command.
When `SAVEGLOBAL` is performed, `GLOBAL` and `GLOBALS` are saved to `global.sav`.
If `global.sav` already exists, it will be overwritten.
You can read `GLOBAL` and `GLOBALS` from `global.sav` using the `LOADGLOBAL` command.
It is recommended to perform `LOADGLOBAL` at the timing of `@EVENTFIRST` and `@EVENTLOAD`.
Through `GLOBAL` and `GLOBALS`, you can share data between different save data.

#### (User-Defined Global Variables)
Variables defined using `#DIM GLOBAL` or `#DIMS GLOBAL` in ERH become global variables.
Also, by using `#DIM SAVEDATA GLOBAL`, it becomes a saveable global variable.
See [Header Files (ERH)](ERH.md) for details.

### Character Variables
#### `NICKNAME`
#### `MASTERNAME`
Saveable string variables similar to `NAME` and `CALLNAME`.
In `chara*.csv`, specify as `NICKNAME`, `MASTERNAME`, or `あだ名` (nickname), `主人の呼び方` (master's call name).

#### `CSTR`
Saveable string array variable.
The string version of `CFLAG`.
In `chara*.csv`, specify as `CSTR`.

#### `CUP`
#### `CDOWN`
#### `DOWNBASE`
#### `TCVAR`
Numeric array variables.
Each is intended to be used as the character variable version of `UP`, `DOWN`, `LOSEBASE`, and `TFLAG` respectively.
Therefore, the initialization timing and save/non-save status are the same as these variables.
However, use the `CUPCHECK` command instead of the [`UPCHECK`](../Reference/UPCHECK.md) command for `CUP` and `CDOWN`.

#### `CDFLAG`
Numeric type character three-dimensional array variable.

	CDFLAG:MASTER:0:2

The first argument is the character registration number, as with traditional character variables, but the second and third arguments are required.

#### (User-Defined Character Variables)
Variables defined using `#DIM CHARADATA` or `#DIMS CHARADATA` in ERH become character variables and can be freely used like `CFLAG` and others.
See [Header Files (ERH)](ERH.md) for details.

### CSV-Related
#### CSV Variables
Variables for referencing values defined in each csv.
The usage is the same as the relationship between `TALENTNAME` and `talent.csv`.
All are one-dimensional array variables that cannot be assigned and are not saved.
If not defined in csv, returns 0 or an empty string.

|Variable Name |File   |Type     |Elements|
|:-------------|:-------|:--------|:-------|
|ITEMPRICE     |item.csv|Integer |1000    |
|TRAINNAME     |train.csv|String |1000    |
|BASENAME      |base.csv |String |100     |
|EQUIPNAME     |equip.csv |String |100     |
|EQUIPNAME     |tequip.csv |String |100     |
|STAINNAME     |stain.csv |String |1000    |
|EXNAME        |ex.csv    |String |100    |
|SOURCENAME    |source.csv|String |100    |
|FLAGNAME      |flag.csv  |String |10000   |
|TFLAGNAME     |tflag.csv |String |1000    |
|CFLAGNAME     |cflag.csv |String |1000    |
|TCVARNAME     |tcvar.csv |String |100     |
|STRNAME       |strname.csv|String |20000  |
|TSTRNAME      |tstr.csv  |String |100     |
|CSTRNAME      |cstr.csv  |String |100     |
|SAVESTRNAME   |savestr.csv|String |100    |
|CDFLAGNAME1   |cdflag1.csv|String |1      |
|CDFLAGNAME2   |cdflag2.csv|String |1      |
|GLOBALNAME    |global.csv |String |100    |
|GLOBALSNAME   |globals.csv|String |100    |

Do not confuse the role of `cstr.csv` and `str.csv`.
`str.csv` is the file that determines the values assigned to the variable `STR`, while `cstr.csv` is the file that defines `CSTRNAME`.
The file that defines `STRNAME` is `strname.csv`. Please note the usage of `str.csv` and `strname.csv`.

#### `gamebase.csv` Variables
Variables for referencing values defined in `gamebase.csv`.
All are non-array variables that cannot be assigned and are not saved.

|Variable Name           |Keyword          |Type     |
|:-----------------------|:-----------------|:--------|
|GAMEBASE_AUTHOR        |Author           |String   |
|GAMEBASE_INFO          |Additional Info  |String   |
|GAMEBASE_YEAR          |Year             |String   |
|GAMEBASE_TITLE         |Title            |String   |
|GAMEBASE_GAMECODE      |Code             |Integer  |
|GAMEBASE_VERSION       |Version          |Integer  |
|GAMEBASE_ALLOWVERSION  |Allow Version Difference|Integer|
|GAMEBASE_DEFAULTCHARA  |Starting Characters|Integer |
|GAMEBASE_NOITEM        |No Items         |Integer  |

#### `WINDOW_TITLE`
This is the string displayed in the title bar of the Emuera window.
It is a non-array string variable. The initial value is the value set in `ウィンドウタイトル` (window title) in `gamebase.csv`.
If `ウィンドウタイトル` is not set, it is generated from `タイトル` (title) and `バージョン` (version).
If `タイトル` is also not set, it becomes `Emuera`.

#### Other CSV-Related Variables
##### `MONEYLABEL`
A variable that records the currency unit.
It is a non-array string variable that cannot be assigned and is not saved.
The initial value is the value set as `お金の単位` (currency unit) in [`_Replace.csv`](replace.md).
If `お金の単位` is not set, it becomes `$`, the same as eramaker.

##### `DRAWLINESTR`
A variable that records the string displayed when the [`DRAWLINE`](../Reference/DRAWLINE.md) command is executed.
It is a non-array string variable that cannot be assigned and is not saved.
The initial value is the value set in `DRAWLINE文字` (DRAWLINE character) in `_Replace.csv`, repeated.
Therefore, it does not contain the exact string set in `DRAWLINE文字`.
If `DRAWLINE文字` is not set, it is the same as eramaker, for example:
`------------------------------------------------------------------------------------------------------------`

### Save/Load Related
#### `LASTLOAD_*`
Variables for referencing information about the last loaded data.
They can be referenced but cannot be assigned.
All initial values are `-1` or empty strings.
They are updated when loading, and return to initial values when `RESETDATA` or "Return to Title" from the menu is executed.

##### `LASTLOAD_VERSION`
The version of the last loaded data (value defined in `gamebase.csv`)

##### `LASTLOAD_NO`
The number of the last loaded data (the number corresponding to `*` in `save*.sav`)

##### `LASTLOAD_TEXT`
Text (text added with [`PUTFORM`](../Reference/PUTFORM.md). `SAVEDATA_TEXT`)

#### `SAVEDATA_TEXT`
This is the text saved in save data and displayed in the save/load screen.
It is also the text that can be referenced with `LASTLOAD_TEXT` after loading.
Both reference and assignment are possible.
A string representing the current time is assigned when `@SAVEINFO` is called, and it is a string that can be appended to with `PUTFORM`.
You can also customize the time display by directly assigning to this string in `@SAVEINFO`.
If you don't use [`SAVEGAME`](../Reference/SAVEGAME.md) and `PUTFORM` (when using `SAVELOAD.ERB`), it won't be used.

#### (User-Defined Saveable Global-Scope Variables)
Variables defined using `#DIM SAVEDATA` or `#DIMS SAVEDATA` in ERH become saveable global-scope variables.
However, when defining a saveable multi-dimensional global-scope variable using `#DIMS SAVEDATA`, the option [`Save data in binary format`](config.en.md#save-save-data-in-binary-format) must be enabled.
See [Header Files (ERH)](ERH.md) for details.

### Multi-Dimensional Array Variables
#### `DITEMTYPE`
#### `DA` to `DE`
**※This variable is obsolete. Please consider using #DIM and #DIMS to assign appropriate names according to usage.**
**See [User-Defined](user_defined_variables.md) for details.**

Fixed-length integer two-dimensional arrays.
Called like `DITEMTYPE:1:2`. Arguments cannot be omitted.
In eramaker's double arrays, the first argument specifies the character registration number, so the array size varies depending on `CHARANUM`.
Two-dimensional arrays like `DITEMTYPE` do not change from the size specified in `VariableSize.csv`.
When used as an argument for the `VARSIZE` command, the number of elements is assigned to `RESULT:0` and `RESULT:1`.
If `DITEMTYPE,100,200` is specified in `VariableSize.csv`, you can use up to `DITEMTYPE:99:199`, and the `VARSIZE` command assigns `100` and `200` to `RESULT:0` and `RESULT:1`.

#### `TA`, `TB`
**※This variable is obsolete. Please consider using #DIM and #DIMS to assign appropriate names according to usage.**
**See [User-Defined Variables](user_defined_variables.md) for details.**

Fixed-length integer three-dimensional arrays.
Called like `TA:1:2:3`. Arguments cannot be omitted.
The default size is `100×100×100`. That is, you can use up to `TA:99:99:99`.
It is possible to change the size in `VariableSize.csv`, but the total size cannot exceed 1 million.
When used as an argument for the `VARSIZE` command, the number of elements is assigned to `RESULT:0`, `RESULT:1`, and `RESULT:2`.

#### (User-Defined Multi-Dimensional Array Variables)
Since ver1.808, variables defined using `#DIM` or `#DIMS` can be made multi-dimensional.
See [User-Defined Variables](user_defined_variables.md) for details.

### Debug Variables
Debug variables provide information for debugging.
Debug variables only return meaningful values when started in debug mode.
When started in normal mode, they return `empty string` or `0`.

All have two underscores `_` before and after the name.

#### `__FILE__`
A one-dimensional read-only variable.
Returns the file name of the currently executing script.
The file name includes the folder structure and extension, the same as error information.

When referenced from debug commands or variable watch during system input wait, etc., it returns an empty string if there is no currently executing script.

#### `__LINE__`
A one-dimensional read-only variable.
Returns the line number of the currently executing script.
Line numbers start from 1, the same as error information.

If there is no currently executing script, it returns -1.

#### `__FUNCTION__`
A one-dimensional read-only variable.
Returns the name of the currently executing function.
The function name does not include `@` or the argument list.

If there is no currently executing script, it returns an empty string.

### Other
#### `TSTR`
String type one-dimensional array. One-dimensional array, not saved.
Initialized at the same timing as `TFLAG`.

#### `RANDDATA`
An array for storing the state of random numbers. Numeric one-dimensional array, assignable, saved.
Recorded by `DUMPRAND` and read by `INITRAND`.

#### `LINECOUNT`
A variable that returns the number of lines printed so far.
`LINECOUNT` increases by 1 for each newline (not including automatic line breaks due to window width) from startup, and decreases by the number of times `CLEARLINE` is executed.
It does not change due to deletion from log buffer overflow (standard 5000).
It is a non-array numeric variable that cannot be assigned or saved.
Also, the line counting method is the same as `CLEARLINE`.

#### `ISTIMEOUT`
From the readme attached to the private modification version 1809+v2:

	○Added variable ISTIMEOUT to check if TINPUT system timed out
	　Initialized to 0 when TINPUT system is called, becomes 1 on timeout.

As of ver1815, this variable may be unusable.

#### `__INT_MAX__`
#### `__INT_MIN__`
Non-array numeric variables that store the maximum and minimum values of the numeric variable definition domain, respectively. Cannot be assigned or saved.
Since they are not debug variables, they can be used even in normal startup.

#### (User-Defined Global-Scope Variables)
Variables defined using `#DIM` or `#DIMS` in ERH become global-scope variables and can be freely used like single-character variables (`A`, etc.).
See [Header Files (ERH)](ERH.md) for details.

#### (User-Defined Constants)
Variables defined using `#DIM` or `#DIMS` in ERH and specific functions become one-dimensional array constants and are treated as variables that cannot be assigned.
See [User-Defined Variables](ERH.md) for details.

#### (User-Defined Reference Type Variables)
Variables defined using `#DIM REF` or `#DIMS REF` within a specific function become reference type variables.
See [User-Defined Variables](ERH.md) for details.

### Differences from eramaker Specifications
#### `NAME`
#### `CALLNAME`
In eramaker, assignment is not possible.
In Emuera, assignment is now possible.

#### `RAND`
#### `CHARANUM`
In eramaker, assignment is possible and they are saved/loaded, but there is no way to use the assigned value.
In Emuera, assignment is prohibited.

### Provisional Specification Table
#### Variables that existed in eramaker
|Variable Name|Type   |Array           |Assign|Save|Prohibit|Initial Value|Initialization Timing|Remarks|
|:------------|:-----|:---------------|:-----|:---|:-------|:-------------|:---------------------|:------|
|RESULT       |Integer|One-dimensional|○    |○   |×       |-|-|-|
|RESULTS      |String |One-dimensional|○    |×   |×       |-|-|-|
|A～Z         |Integer|One-dimensional|○    |○   |○       |-|-|-|
|COUNT        |Integer|One-dimensional|○    |○   |○       |-|-|`COUNT:0` is used as counter in `REPEAT`.  Prohibiting it makes `REPEAT` unusable|
|DAY          |Integer|One-dimensional|○    |○   |○       |-|-|-|
|TIME         |Integer|One-dimensional|○    |○   |○       |-|-|-|
|MONEY        |Integer|One-dimensional|○    |○   |○       |-|-|-|
|MASTER       |Integer|One-dimensional|○    |○   |○       |-|-|-|
|TARGET       |Integer|One-dimensional|○    |○   |×       |:0 = 1|-|-|
|ASSI         |Integer|One-dimensional|○    |○   |○       |:0 = -1|-|-|
|PLAYER       |Integer|One-dimensional|○    |○   |○       |-|-|-|
|ASSIPLAY     |Integer|One-dimensional|○    |○   |○       |:0 = 0|BEGIN TRAIN|-|
|SELECTCOM    |Integer|One-dimensional|○    |○   |×       |-|-|-|
|PREVCOM      |Integer|One-dimensional|○    |○   |○       |:0 = -1|BEGIN TRAIN|-|
|NEXTCOM      |Integer|One-dimensional|○    |○   |○       |:0 = -1|BEGIN TRAIN|-|
|LOSEBASE     |Integer|One-dimensional|○    |○   |○       |All 0|At end of `@SHOW_USERCOM`|Elements can be specified by `BASENAME`|
|UP           |Integer|One-dimensional|○    |○   |○       |All 0|At end of `@SHOW_USERCOM`  `UPCHECK`|Elements can be specified by `PALAMNAME`|
|DOWN         |Integer|One-dimensional|○    |○   |○       |All 0|At end of `@SHOW_USERCOM`  `UPCHECK`|Elements can be specified by `PALAMNAME`|
|PALAMLV      |Integer|One-dimensional|○    |○   |×       |`_replace.csv`  `PALAMLV initial value`|-|-|
|EXPLV        |Integer|One-dimensional|○    |○   |×       |`_replace.csv`  `EXPLV initial value`|-|-|
|EJAC         |Integer|One-dimensional|○    |○   |○       |:0 = 10000|-|-|
|FLAG         |Integer|One-dimensional|○    |○   |○       |-|-|`FLAGNAME` specifies elements|
|TFLAG        |Integer|One-dimensional|○    |○   |○       |All 0|BEGIN TRAIN|`TFLAGNAME` specifies elements|
|ITEM         |Integer|One-dimensional|○    |○   |○       |-|-|`ITEMNAME` specifies elements|
|ITEMSALES    |Integer|One-dimensional|○    |○   |○       |-|-|`ITEMNAME` specifies elements|
|BOUGHT       |Integer|One-dimensional|○    |○   |○       |-|-|-|
|PBAND        |Integer|One-dimensional|○    |○   |○       |:0 = `_replace.csv`  `PBAND initial value`|-|-|
|CHARANUM     |Integer|Non-dimensional|×    |×   |×       |-|-|Returns the number of registered characters regardless of element specified|
|RAND         |Integer|Non-dimensional|×    |×   |×       |-|-|`RAND:X` where `X` is 0 or negative causes error. Otherwise returns random value from 0 to (number of elements -1)|
|STR          |String |One-dimensional|○    |×   |○       |`STR.CSV`|-|`STRNAME` specifies elements|
|SAVESTR      |String |One-dimensional|○    |○   |○       |-|-|`SAVESTRNAME` specifies elements|
|NO           |Numeric|Character + Non-dimensional|○|○|×|-|-|Specified by `番号,**` in `CHARA**.CSV`|
|ISASSI       |Numeric|Character + Non-dimensional|○|○|×|-|-|Specified by `助手,1` in `CHARA**.CSV` to be treated as assistant from the start|
|NAME         |String |Character + Non-dimensional|○|○|×|-|-|Specified by `名前,**` in `CHARA**.CSV`|
|CALLNAME     |String |Character + Non-dimensional|○|○|×|-|-|Specified by `呼び名,**` in `CHARA**.CSV`|
|BASE         |Numeric|Character + One-dimensional|○|○|○|-|-|All elements become same value as `MAXBASE` when `ADDCHARA` is called.  Elements specified by `BASENAME`|
|MAXBASE      |Numeric|Character + One-dimensional|○|○|○||-|Specified by `基礎,*,**` in `CHARA**.CSV`.  Elements specified by `BASENAME`|
|ABL          |Numeric|Character + One-dimensional|○|○|○|-|-|Specified by `能力,*,**` in `CHARA**.CSV`.  Elements specified by `ABLNAME`|
|TALENT       |Numeric|Character + One-dimensional|○|○|○|-|-|Specified by `素質,*` in `CHARA**.CSV`.  Third value can also be specified like `素質,*,**`.  Elements specified by `TALENTNAME`|
|EXP          |Numeric|Character + One-dimensional|○|○|○|-|-|Specified by `経験,*,**` in `CHARA**.CSV`.  Elements specified by `EXPNAME`|
|MARK         |Numeric|Character + One-dimensional|○|○|○|-|-|Specified by `刻印,*,**` in `CHARA**.CSV`.  Elements specified by `MARKNAME`|
|RELATION     |Numeric|Character + One-dimensional|○|○|○|`replace.csv`  `RELATION initial value`|-|Specified by `相性,*,**` in `CHARA**.CSV`.  Elements specified by `NAME` or `CALLNAME`|
|JUEL         |Numeric|Character + One-dimensional|○|○|○|-|-|Can be specified by `珠,*,**` in `CHARA**.CSV`.  Elements specified by `PALAMNAME`|
|CFLAG        |Numeric|Character + One-dimensional|○|○|○|-|-|Specified by `フラグ,*,**` in `CHARA**.CSV`.  Elements specified by `CFLAGNAME`|
|EQUIP        |Numeric|Character + One-dimensional|○|○|○|-|-|Can be specified by `装着物,*,**` in `CHARA**.CSV`.  Elements specified by `EQUIPNAME`|
|TEQUIP       |Numeric|Character + One-dimensional|○|○|○|All 0|BEGIN TRAIN|Elements specified by `TEQUIPNAME`|
|PALAM        |Numeric|Character + One-dimensional|○|○|○|All 0|BEGIN TRAIN|Elements specified by `PALAMNAME`|
|STAIN        |Numeric|Character + One-dimensional|○|○|×|`_replace.csv`  `Initial stain value`|BEGIN TRAIN|Elements specified by `STAINNAME`|
|EX           |Numeric|Character + One-dimensional|○|○|○|All 0|BEGIN TRAIN|Elements specified by `EXNAME`|
|SOURCE       |Numeric|Character + One-dimensional|○|○|○|All 0|BEGIN TRAIN  At end of `@SOURCE_CHECK`|Elements specified by `SOURCENAME`|
|NOWEX        |Numeric|Character + One-dimensional|○|○|○|All 0|Directly before `@EVENTCOM`|Not updated before `@USERCOM`.  Elements specified by `EXNAME`|
|GOTJUEL      |Numeric|Character + One-dimensional|○|○|○|All 0|BEGIN TRAIN|Elements specified by `PALAMNAME`|
|ABLNAME      |String |One-dimensional|×    |×   |○       |`ABL.CSV`|-|-|
|TALENTNAME   |String |One-dimensional|×    |×   |○       |`TALENT.CSV`|-|-|
|EXPNAME      |String |One-dimensional|×    |×   |○       |`EXP.CSV`|-|-|
|MARKNAME     |String |One-dimensional|×    |×   |○       |`MARK.CSV`|-|-|
|PALAMNAME    |String |One-dimensional|×    |×   |○       |`PALAM.CSV`|-|-|
|ITEMNAME     |String |One-dimensional|×    |×   |○       |`ITEM.CSV`|-|-|
|NOITEM       |Integer|One-dimensional|○    |○   |○       |:0 = gamebase.csv  "No Items"|-|Can specify values other than 0 and 1|

<!--Parts with underline are specifications that differ between eramaker and Emuera-->

#### Emuera-Only Variables
<!--Skipped proofreading for now-->
|Variable Name|Type|Array|Assign|Save|Prohibit|Initial Value|Initialization Timing|Remarks|
|:--|:--|:--|:--|:--|:--|:--|:--|:--|
|LOCAL|Integer|One-dimensional|○|×|○|-|-|#LOCALSIZE changes element count for each function **⚠obsolete, recommend setting -1 in VariableSize.csv for new games**|
|LOCALS|String|One-dimensional|○|×|○|-|-|#LOCALSSIZE changes element count for each function **⚠obsolete, recommend setting -1 in VariableSize.csv for new games**|
|ARG|Integer|One-dimensional|○|×|○|Arbitrary|When function is called※|※Only if set as argument.  Secures elements equal to number defined by arguments for each function|
|ARGS|String|One-dimensional|○|×|○|Arbitrary|When function is called※|※Only if set as argument.  Secures elements equal to number defined by arguments for each function|
|(Private)|Arbitrary|Arbitrary|Arbitrary|×|×|Arbitrary|Game start  When function is called※|※Only if set as argument.  Defined by #DIM or #DIMS in function|
|(Refer)|Arbitrary|Arbitrary|※|※|×|-|-|※Depends on reference target.  Defined by "#DIM REF" or "#DIMS REF" in function|
|(Wide_area)|Arbitrary|Arbitrary|Arbitrary|Arbitrary|×|Arbitrary|Game start|Defined by #DIM or #DIMS in ERH|
|GLOBAL|Integer|One-dimensional|○|※|○|-|-|※Saved by SAVEGLOBAL, loaded by LOADGLOBAL.  Elements specified by GLOBALNAME|
|GLOBALS|String|One-dimensional|○|※|○|-|-|※Saved by SAVEGLOBAL, loaded by LOADGLOBAL.  Elements specified by GLOBALSNAME|
|LINECOUNT|Integer|Non-dimensional|×|×|×|-|-|-|
|ISTIMEOUT|Integer|Non-dimensional|×|×|×|0|When TINPUT system command executed|1 is assigned when TINPUT system command times out|
|`__INT_MAX__`|Integer|Non-dimensional|×|×|×|9223372036854775807|-|-|
|`__INT_MIN__`|Integer|Non-dimensional|×|×|×|-9223372036854775808|-|-|
|RANDDATA|Integer|One-dimensional|○|○|×|-|-|-|
|TSTR|String|One-dimensional|○|×|○|All empty strings|BEGIN TRAIN|Elements specified by TSTRNAME|
|DA|Integer|Two-dimensional|○|○|○|-|-|-|
|DB|Integer|Two-dimensional|○|○|○|-|-|-|
|DC|Integer|Two-dimensional|○|○|○|-|-|-|
|DD|Integer|Two-dimensional|○|○|○|-|-|-|
|DE|Integer|Two-dimensional|○|○|○|-|-|-|
|DITEMTYPE|Integer|Two-dimensional|○|○|○|-|-|-|
|TA|Integer|Three-dimensional|○|○|○|-|-|-|
|TB|Integer|Three-dimensional|○|○|○|-|-|-|
|NICKNAME|String|Character + Non-dimensional|○|○|×|-|-|Specified by "あだ名,**" in CHARA**.CSV|
|MASTERNAME|String|Character + Non-dimensional|○|○|×|-|-|Specified by "主人の呼び方,**" in CHARA**.CSV|
|DOWNBASE|Integer|Character + One-dimensional|○|○|○|All 0|At end of @SHOW_USERCOM|Elements specified by BASENAME|
|CUP|Integer|Character + One-dimensional|○|○|○|All 0|At end of @SHOW_USERCOM  UPCHECK|Elements specified by PALAMNAME|
|CDOWN|Integer|Character + One-dimensional|○|○|○|All 0|At end of @SHOW_USERCOM  UPCHECK|Elements specified by PALAMNAME|
|TCVAR|Integer|Character + One-dimensional|○|○|○|All 0|BEGIN TRAIN|Elements specified by TCVARNAME|
|CSTR|String|Character + One-dimensional|○|○|○|-|-|Specified by "CSTR,*,**" in CHARA**.CSV|  Elements specified by CSTRNAME|
|CDFLAG|Integer|Character + Two-dimensional|○|○|○|-|-|Elements specified by CFDLAGNAME1 and CDFLAGNAME2.  Note that initial element count setting is 1×1|
|ITEMPRICE|Integer|One-dimensional|×|×|○|item.csv|-|Elements specified by ITEMNAME|
|TRAINNAME|String|One-dimensional|×|×|○|train.csv|-|-|
|BASENAME|String|One-dimensional|×|×|○|base.csv|-|-|
|EQUIPNAME|String|One-dimensional|×|×|○|equip.csv|-|-|
|TEQUIPNAME|String|One-dimensional|×|×|○|tequip.csv|-|-|
|STAINNAME|String|One-dimensional|×|×|○|stain.csv|-|-|
|EXNAME|String|One-dimensional|×|×|○|ex.csv|-|-|
|SOURCENAME|String|One-dimensional|×|×|○|source.csv|-|-|
|FLAGNAME|String|One-dimensional|×|×|○|flag.csv|-|-|
|TFLAGNAME|String|One-dimensional|×|×|○|tflag.csv|-|-|
|CFLAGNAME|String|One-dimensional|×|×|○|cflag.csv|-|-|
|TCVARNAME|String|One-dimensional|×|×|○|tcvar.csv|-|-|
|STRNAME|String|One-dimensional|×|×|○|strname.csv|-|str.csv specifies STR content, not element name|
|TSTRNAME|String|One-dimensional|×|×|○|tstr.csv|-|-|
|CSTRNAME|String|One-dimensional|×|×|○|cstr.csv|-|-|
|SAVESTRNAME|String|One-dimensional|×|×|○|savestr.csv|-|-|
|CDFLAGNAME1|String|One-dimensional|×|×|○|cdflag1.csv|-|-|
|CDFLAGNAME2|String|One-dimensional|×|×|○|cdflag2.csv|-|-|
|GLOBALNAME|String|One-dimensional|×|×|○|global.csv|-|-|
|GLOBALSNAME|String|One-dimensional|×|×|○|globals.csv|-|-|
|GAMEBASE_AUTHOR|String|Non-dimensional|×|×|×|gamebase.csv  "作者"|-|-|
|GAMEBASE_INFO|String|Non-dimensional|×|×|×|gamebase.csv  "追加情報"|-|-|
|GAMEBASE_YEAR|String|Non-dimensional|×|×|×|gamebase.csv  "製作年"|-|-|
|GAMEBASE_TITLE|String|Non-dimensional|×|×|×|gamebase.csv  "タイトル"|-|-|
|GAMEBASE_GAMECODE|Integer|Non-dimensional|×|×|×|gamebase.csv  "コード"|-|-|
|GAMEBASE_VERSION|Integer|Non-dimensional|×|×|×|gamebase.csv  "バージョン"|-|-|
|GAMEBASE_ALLOWVERSION|Integer|Non-dimensional|×|×|×|gamebase.csv  "バージョン違い認める"|-|-|
|GAMEBASE_DEFAULTCHARA|Integer|Non-dimensional|×|×|×|gamebase.csv  "最初からいるキャラ"|-|-|
|GAMEBASE_NOITEM|Integer|Non-dimensional|×|×|×|gamebase.csv  "アイテムなし"|-|-|
|WINDOW_TITLE|String|Non-dimensional|○|×|×|gamebase.csv  "ウィンドウタイトル"※|-|※If not present, generated from "タイトル" and "バージョン".  If "タイトル" is also not present, becomes "Emuera"|
|MONEYLABEL|String|Non-dimensional|×|×|×|_replace.csv  "お金の単位"※|-|※If not present, becomes "$"|
|DRAWLINESTR|String|Non-dimensional|×|×|×|_replace.csv  "DRAWLINE文字"※|-|※If not present, becomes repeated "-" characters|
|LASTLOAD_VERSION|Integer|Non-dimensional|×|×|×|-1|Game start  RESETDATA|Value updated on load|
|LASTLOAD_NO|Integer|Non-dimensional|×|×|×|-1|Game start  RESETDATA|Value updated on load|
|LASTLOAD_TEXT|String|Non-dimensional|×|×|×|Empty string|Game start  RESETDATA|Value updated on load|
|SAVEDATA_TEXT|String|Non-dimensional|○|※|×|※※|At start of @SAVEINFO|※Saved as save data title  ※※String representing current time|
