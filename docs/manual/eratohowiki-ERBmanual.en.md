# ERB Syntax Tutorial

Original page  
eratoho Summary V3 ERB Syntax Tutorial

[Part 1: Basics, Variables, Display](https://seesaawiki.jp/eratoho/d/ERB%b9%bd%ca%b8%b9%d6%ba%c2)  
[Part 2: Branching and Iteration, Functions and Function Calls, Labels and Key Input, etc.](https://seesaawiki.jp/eratoho/d/ERB%b9%bd%ca%b8%b9%d6%ba%c22)  
[Special Chapter: Bit Operations](https://seesaawiki.jp/eratoho/d/ERB%b9%bd%ca%b8%b9%d6%ba%c23)  
[Reference: Q&A for Common Mistakes When Creating or Modifying ERB Files](https://seesaawiki.jp/eratoho/d/ERB%ca%d4%bd%b8%a4%cb%a4%aa%a4%b1%a4%eb%c2%e5%c9%bd%c5%aa%a4%ca%a5%a8%a5%e9%a1%bc)

---

## Basics
This is the foundation before syntax. If you're seeing errors like "Unknown ~", this section might be the culprit.

---

### Use Half-Width Characters for Syntax
All parts other than Japanese text should be entered using half-width characters.
The main thing to watch out for is full-width spaces. You can easily find them using your text editor's search function to search for full-width spaces.

---

### Use Indentation for Branching and Iteration
This doesn't directly cause errors, but when using branching and iteration as described later, you should use indentation. Indentation means placing a fixed amount of whitespace at the beginning of lines to offset the position, making it clearer that "this section is one block of processing."
Use the TAB key for indentation whitespace.
While indentation has no effect on processing, it's helpful when reviewing your own code during debugging or when having others look at your code.
Even if you think it's not necessary, it's best to include it.

---

### Use `;` (Half-Width Semicolon) at the Start of Commented Lines
By placing `;` at the start of a line, you can comment out that line. This is called commenting out.
Commented parts are sections where the written processing won't be executed.
They are sometimes used to temporarily disable processing or as notes about nearby processing.
Note that you can use full-width characters in comments.

``` { #language-erb title="ERB" }
;This is a comment so it won't be executed!
```

As a feature added in Emuera 1.807 and later, you can now write comments mid-syntax.
However, `;` after `PRINT` commands is not recognized as a comment and is displayed as-is as a string.

``` { #language-erb title="ERB" }
A = A + B ;This is a comment
PRINT ほげほげ ;But this is not a comment
```

---

### Make Comments Thorough and Accurate
By properly adding comments, it becomes easier to deal with any issues that may arise.
It also helps you and others understand the source when reviewing it.
Comments are useful for debugging and modification, so it's best to include them whenever possible.
However, the content of the comment must not be incorrect.
You should carefully check the content of comments as well.

<details><summary>eramaker specification</summary>

### Always include at least one empty line at the end of each file
Due to an eramaker specification issue, if there's no empty line at the end of a file,<br/>
the line right before it may not be recognized.<br/>
This is one common cause of `ENDIF~` errors.<br/>
(This issue does not occur in Emuera.)<br/>
</details>

---

## Variables
About variables used in calculations and other processing.

### What are Variables?
Variables are containers used to store calculation results or compare numbers with other numbers.
Since explanations in text alone are hard to understand, here's an example.

``` { #language-erb title="ERB" }
A = 0
B = 0
C = 0
```

`A = 0` means assigning `0` to the variable `A`.
The `A`, `B`, and `C` above are each variables. Currently, they all contain `0`.

``` { #language-erb title="ERB" }
B = A + 1
C = A + 2
```

`B = A + 1` means assigning the result of `A + 1` to variable `B`.
Here, the calculation is performed, and the contents of `B` and `C` are rewritten. Since `A` is `0`,
`B` becomes `0 + 1` which is `1`, and `C` becomes `0 + 2` which is `2`. `A` remains unchanged at `0`.

``` { #language-erb title="ERB" }
A = C
A = B
```

Next, `C` (which is `2`) is assigned to `A`. Now `A` becomes `2`.
However, in the next line, `B` (which is `1`) is assigned to `A`, so `A` becomes `1`.
As you can see, when the same variable is assigned multiple times, the result is overwritten.

``` { #language-erb title="ERB" }
C = C + 2
A = B + C
```

Next, `C + 2` is assigned to `C`.
Since `C` was `2` before the calculation, `C` becomes `2 + 2` which is `4`.
Then `B + C` (which is `1 + 4`) is assigned to `A`.
As a result of this processing, `A` is `5`, `B` is `1`, and `C` is `4`.

---

### Types of Variables
There are roughly two types of variables.
The ones like `A`, `B`, `C` above that store numbers are called "numeric variables (int type)" and
those that store text are called "string variables (string type)".
Numeric variables are used for calculations and conditional checks, while string variables are mainly used for displaying text.
Variables also have a concept called "arrays." By using arrays, you can store multiple values in a variable.
For example, an array for variable `A` is expressed as `A:0`, `A:1`, `A:2`, `A:3`, ... in the format `(variable name):(array number)`. (Use a half-width colon `:`)

``` { #language-erb title="ERB" }
A:0 = 0
A:1 = 1
A:2 = 2
A:3 = 0

A:3 = A:0 + A:1 + A:2
```

This expression means assigning the result of `A:0 + A:1 + A:2` to `A:3`, which is `0 + 1 + 2`.
As a result of the processing, `A:3` becomes `3`.

Some variables also have a two-dimensional array format. Two-dimensional arrays
can be written as `A:0:0`, `A:0:1`, ..., `A:1:0`, `A:1:1`, ..., allowing storage of even more values.

Which variables use which array format is listed in the [eramaker variable list](../eramaker/variables.en.md) and [Emuera constants and variables](../Emuera/variables.en.md).

---

### How to Use Variables
Basically, follow what's written on the [eramaker variable list page](../eramaker/variables.en.md).
Here, we'll mainly cover those that require careful handling.

- `A - Z`
Although not described on that page, they can be used as arrays.
`A` is the same as `A:0`.
That means after changing the value of `A:0`, the value of `A` also changes accordingly.

- `FLAG`/`TFLAG`/`CFLAG`
Since `FLAG` and `TFLAG` are used for game system-related parts,
use `CFLAG` when managing flags for specific characters only.
Also, since they overlap very easily, check the flag list carefully when using them.
See the "variable data.txt" included with each variant for the flag list.

<details><summary>eramaker specification</summary>

Although eramaker states that you can use 1000 numbers from 0 to 999, in practice due to a bug, only 999 from 0 to 998 can be used.<br/>
Using 999 will corrupt save data, so never use it.<br/>
Also note that `TFLAG` is reset each training session.<br/>
(When using Emuera, save data corruption does not occur even when using CFLAG:999. Also, depending on settings, you can use more than 1000 numbers.)<br/>
</details>

- `TEQUIP`
Like the flag variables above, they overlap easily, so check the flag list carefully when using.

---

### About Two-Dimensional Arrays
Two-dimensional array variables are mainly used for character-related data.
Therefore, the reading format for two-dimensional array variables is usually as follows:

``` { #language-erb title="ERB" }
;Examples for variables like "ABL", "TALENT", etc.
(Ability type):(Character registration number):(Ability number)
```

- `TALENT:5:20`
This represents talent number 20 for the character with registration number 5. (The `20` part can be replaced with the name defined in talent.csv)
One thing to be careful about here is the difference between character registration number (ID) and character number (NO).
In eratoho, character number 5 is Cirno, but registration number 5 doesn't always refer to Cirno.
Registration numbers are assigned when a character becomes trainable by purchasing them in SHOP (ADDCHARA), etc., and represent the order in the character list.
For example, if you first purchase Reimu, then purchase Cirno, Cirno's registration number becomes 2. If you then sell Reimu (DELCHARA), the entire list shifts forward by one, and Cirno's registration number becomes 1.

- `TALENT:100`
At first glance, this doesn't look like a two-dimensional array.
However, this is an abbreviation for `TALENT:TARGET:100`, representing talent number 100 for the character currently being trained or scheduled for training.
`TARGET` is a variable that holds the registration number of the character currently being trained or scheduled for training.
`TARGET` is often specified, which is why it can be omitted.

<details><summary>eramaker specification</summary>

By the way, although we explained `TALENT:5:20` in the section above,<br/>
due to eramaker specification issues, actually writing it this way doesn't represent talent 20 of registration number 5.<br/>
The cause is this `TARGET` abbreviation - when reading up to `TALENT:5`,<br/>
it's judged as an abbreviation for `TALENT:TARGET:5`, which causes errors.<br/>
To actually represent talent 20 of registration number 5, you need to do something like<br/>
```
A = 5
TALENT:A:20
```
store the registration number in a variable first.<br/>
(This issue does not occur in Emuera. `TALENT:5:20` works as intended.)<br/>
</details>

---

## Operations
The calculation methods essential for numeric processing.

### Basic Arithmetic Operations
Basic operators for performing the four arithmetic operations

|Code |Result|
|:--     |:-- |
|`A + B` |Sum of A and B. (Addition)|
|`A - B` |Difference of A minus B. (Subtraction)|
|`A * B` |Product of A and B. (Multiplication)|
|`A / B` |Quotient of A divided by B. (Division) Decimal places are truncated.|
|`A % B` |Remainder when A is divided by B. (Modulo)|

---

### Self-Referential Arithmetic Operations
Expressions like `A = A + B` can be abbreviated as follows:

|Code |Result|
|:--     |:--|
|`A += B`|`A = A + B` is the same.|  
|`A -= B`|`A = A - B` is the same.|  
|`A *= B`|`A = A * B` is the same.|  
|`A /= B`|`A = A / B` is the same.|  
|`A %= B`|`A = A % B` is the same.|  

---

### Logical Operators
Special operators used for bit operations.

|Code |Result|
|:--     |:--|
|`A \| B`|Returns the result of A OR B.|  
|`A & B` |Returns the result of A AND B.|  

---

## Display
[`PRINT`](../Reference/PRINT.en.md) series syntax for displaying text on the screen, mainly used in dialogue.

### Types of PRINT Commands
The PRINT series includes mainly the following:

|Syntax|Overview|
|:--|:--|
|`PRINT`|Displays a normal string. Cannot use variables.|  
|`PRINTV`|Displays numeric variables.|  
|`PRINTS`|Displays string variables.|  
|`PRINTFORM`|Displays a normal string with numeric and string variables combined.|  

Although not commonly used, there are also the following:

|Syntax|Overview|
|:--|:--|
|`PRINTFORMS`|Displays string variables.|  
|`PUTFORM`|Similar to `PRINTFORM`, but for save data only.|  

By adding `L` or `W` after each command, you can add newlines or wait for input (pause until Enter is pressed).
For example,

``` { #language-erb title="ERB" }
PRINT あ  
PRINT い  
PRINTL う  
PRINTW え  
PRINTL お  
```

When written like this, first

```
あいう  
え
```

is displayed, and it enters a wait state.
When you press Enter, the rest is displayed

```
あいう  
え  
お
```

---

### How to Use PRINT Commands
As mentioned above, PRINT commands each have their specific uses, but in practice, `PRINTFORM` can substitute for most of them.
To display normal text,

``` { #language-erb title="ERB" }
PRINTFORM あいうえお  
```

Write it like this. Make sure to include a half-width space between `PRINTFORM` and the text to display.
To display with numeric variables,

``` { #language-erb title="ERB" }
A = 5  
PRINTFORM Variable A is {A}
```

Write the variable name enclosed in half-width `{~~~}`.

For string variables,

``` { #language-erb title="ERB" }
STR:0 = かきくけこ  
PRINTFORM あいうえお%STR:0%さしすせそ  
```

Write the variable name enclosed in `%~~~%`.
 
`PRINTFORM` can also be followed by `L` or `W`:

- `PRINTFORML`: Adds a newline but doesn't pause or stop, continues to the next line
- `PRINTFORMW`: Adds a newline and stops at that line

Only `PUTFORM`, which is for save data, cannot be substituted with `PRINTFORM`, but since opportunities to modify save data display are rare, it will be omitted.
See the [`PUTFORM`](../Reference/PUTFORM.en.md) page for details.

---

### Other Display Methods
To display text and then add a newline, use `PRINTFORML`.
If you want to add a newline without displaying text, that is, to display a blank line, you can also use `PRINTL` or `PRINTFORML`.

``` { #language-erb title="ERB" }
PRINTFORML あいう  
PRINTFORML   
PRINTFORML えお  
```

The second line has only a half-width space after `PRINTFORML`, which allows

```
あいう  
  
えお  
```

to be displayed as a blank line. `PRINTL` produces exactly the same display.

Also, using `DRAWLINE` displays a long horizontal line like this:
```
-------------------------------------------------------------------------------
```

---

## Branching and Iteration

### Conditional Expressions
Before branching and iteration, let's discuss conditional expressions, which are the criteria for their execution.

#### Comparison Operators
Conditional expressions compare variables with variables, or the magnitude of variables and numbers, to determine if they are correct.
These are "comparison operators" like `==`, `!=`, `<`, `>`, `<=`, `>=`.
`==` means equal, `!=` means not equal, and the inequality signs have their usual meaning.
For example, when `A = 0`, `B = 1`, `C = 0`:

|Expression|Truth value (Emuera returns 1 for true, 0 for false)|  
|:--|:--|  
|`A == B`|False (`false`, incorrect)|  
|`A == C`|True (`true`, correct)|  
|`A != C`|False|  
|`A > B`|False|  
|`B > C`|True|  
|`B <= A`|False|  
|`A >= C`|True|  

As an alternative to conditional expressions using comparison operators, you can also write `0` or non-zero numbers to represent truth values.
In this case, `0` is false, and anything else is true.

#### Negation Operator
In addition to comparison operators, Emuera has a "negation operator" represented by `!` (exclamation mark).
This inverts the result of the conditional expression that follows it.
Using the example above, `!(A > B)` is true, and `!(A <= C)` is false.

#### Combining Conditional Expressions
When using multiple conditional expressions, write `&&` or `||` between them.
`&&` is used for "both A and B", and `||` is used for "A or B".
For example, the condition "A equals 0 AND B equals 1":

``` { #language-erb title="ERB" }  
A == 0 && B == 1  
```

For the condition "A equals 0 OR B equals 0":

``` { #language-erb title="ERB" }  
A == 0 || B == 0  
```

For more complex cases, "A equals 0 and B equals 1, OR A equals 0 and C equals 1":

``` { #language-erb title="ERB" }  
(A == 0 && B == 1) || (A == 0 && C == 1)  or
A == 0 && (B == 1 || C == 1)  
```

---

#### Determining Character Abilities and Talents
Among commonly used conditional expressions, there are those that determine character abilities and talents.
For example, when the character being trained is a virgin, `TALENT:TARGET:Virgin == 1` is true.
Since talents have `1` when the character has it and `0` when not,
writing simply `TALENT:TARGET:Virgin` in a conditional expression means the same as "the character being trained is a virgin."

Conversely, writing `TALENT:TARGET:Virgin == 0` (or `!TALENT:TARGET:Virgin`) means "the character being trained is not a virgin."

When the obedience level of the character being trained is Lv3 or higher, `ABL:TARGET:Obedience >= 3` is true.
Abilities and marks have levels that become numeric values directly.
Abilities like stamina and experience that are not expressed in levels are used as-is.
To express the condition "the character being trained has V experience of 10 or more",
it would be `EXP:TARGET:V Experience >= 10`.

---

#### Random (Random Numbers)
By writing `RAND: (number or numeric variable)`, you can randomly determine a number within a certain range.
For example, when writing `A = RAND:10`, variable `A` becomes any integer from 0 to 9 (since counting starts from 0, the upper limit is 9).

``` { #language-erb title="ERB" }  
A = 5  
B = RAND:A  
```

In this case, variable `B` becomes any integer from 0 to 4.

---

### Branching
Branching is processing that displays something like "When XX does YY, display ZZ."
Common syntax for branching includes `IF`, `SIF`, and `SELECTCASE`.

#### `IF - ELSEIF - ELSE - ENDIF`
This is the most commonly used syntax for "if ~ then ~" processing.
[Reference page for `IF`](../Reference/IF.en.md)

``` { #language-erb title="ERB" }  
IF A == 0  
　　PRINTFORML Variable A is 0.  
ELSEIF B == 0  
　　PRINTFORML Variable A is not 0, and variable B is 0.  
ELSE  
　　PRINTFORML Variable A is not 0, and variable B is also not 0.  
ENDIF  
```

The above is the basic form of the `IF - ELSEIF - ELSE - ENDIF` syntax:
- If variable `A` is `0` (`IF A == 0`), display 'Variable A is 0.'
- If variable `A` is not `0` and variable `B` is `0` (`ELSEIF B == 0`), display 'Variable A is not 0, and variable B is 0.'
- If none of the conditions are met (`ELSE`), display 'Variable A is not 0, and variable B is also not 0.'

In one `IF - ENDIF` block, conditional expressions are evaluated from top to bottom,
and only the processing immediately after the condition that is met is executed.
Although the example above only has one line of processing for each case, in actual use,
all processing from the current position up to the next `ELSEIF`, `ELSE`, or `ENDIF` is executed.

``` { #language-erb title="ERB" }  
IF Condition1  
　　Process1  
　　Process2  
　　Process3  
ELSEIF Condition2  
　　Process4  
　　Process5  
ELSE  
　　Process6  
ENDIF  
```

(When Condition1 is true: processes 1-3 run; when Condition1 is false and Condition2 is true: processes 4-5 run; when both are false: only process 6 runs)

When you have 3 or more conditions to check, you can add more `ELSEIF`.

``` { #language-erb title="ERB" }  
IF A == 0  
　　PRINTFORML Variable A is 0.  
ELSEIF B == 0  
　　PRINTFORML Variable A is not 0, and variable B is 0.  
ELSEIF C == 0  
　　PRINTFORML Variables A and B are not 0, and variable C is 0.  
ELSE  
　　PRINTFORML Variables A, B, and C are all not 0.  
ENDIF  
```

When there's only 1 condition to check, the `ELSEIF` and subsequent parts can be omitted.

``` { #language-erb title="ERB" }  
IF A == 0  
　　PRINTFORML Variable A is 0.  
ELSE  
　　PRINTFORML Variable A is not 0.  
ENDIF  
```

When you want to do nothing when the condition is not met, the `ELSE` part can be omitted.

``` { #language-erb title="ERB" }  
IF A == 0  
　　PRINTFORML Variable A is 0.  
ELSEIF B == 0  
　　PRINTFORML Variable A is not 0, and variable B is 0.  
ENDIF  
```

**`IF` and `ENDIF` are absolutely required.**
Be careful not to forget to write `ENDIF`, as it causes errors.

---

#### `SIF`
`SIF` is a simplified version of `IF - ENDIF`.
[Reference page for `SIF`](../Reference/IF.en.md)

``` { #language-erb title="ERB" }  
SIF A == 0  
　　PRINTFORML Variable A is 0.  
```

`SIF` doesn't require `ENDIF`, can't use `ELSEIF` or `ELSE`,
and can only execute the immediately following line. For example,

``` { #language-erb title="ERB" }  
SIF Condition  
　　Process1  
　　Process2  
```

When written like this, Process2 will execute regardless of the truth value of the condition, so be careful.
When you need to perform 2 or more processes, use `IF - ELSEIF - ELSE - ENDIF`.

<details><summary>eramaker specification</summary>

Also, in eramaker,<br/>
```
SIF Condition  
　　;Comment  
　　Process1  
```
If you put a comment line immediately after SIF, Process1 will always execute, so be careful here too.<br/>
(In Emuera, comment lines are properly ignored, so Process1 executes only when the condition is true.)<br/>
</details>

---

#### Combining `IF` and `SIF`
``` { #language-erb title="ERB" }  
IF Condition1  
　　SIF Condition2  
　　　　Process1  
　　Process2  
　　Process3  
ENDIF  
```

When written like this, if both Condition1 and Condition2 are true, processes 1-3 all execute.
If only Condition2 is true, processes 2 and 3 execute.

``` { #language-erb title="ERB" }  
SIF Condition1  
　　IF Condition2  
　　　　Process1  
　　　　Process2  
　　ENDIF  
```
Conversely, when written this way, an error occurs when Condition1 is not true.
(When Condition1 is false, only the line `IF Condition2` is skipped, resulting in the error "There's no `IF` corresponding to this `ENDIF`!")
Avoid writing branching or iteration statements like `IF` or `SIF` immediately after `SIF`.

---

#### `SELECTCASE - CASE - CASEELSE - ENDSELECT`
As an alternative to `IF`, there's `SELECTCASE - CASE - CASEELSE - ENDSELECT`.
It's used when branching processing based on the value of a single numeric variable.
It's convenient when branching processing based on random numbers, for example.
[Reference page for `SELECTCASE`](../Reference/SELECTCASE.en.md)

``` { #language-erb title="ERB" }  
SELECTCASE A  
　　CASE 0  
　　　　PRINTFORML Variable A is 0.  
　　CASE 1  
　　　　PRINTFORML Variable A is 1.  
　　CASEELSE  
　　　　PRINTFORML Variable A is not 0 or 1.  
ENDSELECT  
```

This has the same meaning as the following `IF` statement:

``` { #language-erb title="ERB" }  
IF A == 0  
　　PRINTFORML Variable A is 0.  
ELSEIF A == 1  
　　PRINTFORML Variable A is 1.  
ELSE  
　　PRINTFORML Variable A is not 0 or 1.  
ENDIF  
```

`SELECTCASE` statements branch by checking whether the number after `CASE` equals the numeric variable written immediately after `SELECTCASE` (in this case, `A`).
The following writing styles are also possible for `CASE`:

``` { #language-erb title="ERB" }  
SELECTCASE A  
　　CASE 1, 2, 3  
　　　　PRINTFORML Variable A is 1, 2, or 3.  
　　CASE 4 TO 9  
　　　　PRINTFORML Variable A is between 4 and 9.  
　　CASE IS >= 50  
　　　　PRINTFORML Variable A is 50 or more.  
　　CASE 10 TO 20, IS >= 40  
　　　　PRINTFORML Variable A is not 50 or more.  
　　　　PRINTFORML Variable A is between 10 and 20, or 40 or more (and 49 or less).  
　　CASEELSE  
　　　　PRINTFORML Variable A is 0 or less (meets none of the above conditions).  
ENDSELECT  
```

`CASE X TO Y` branches when the numeric variable is between X and Y (inclusive).
`CASE IS >= X` branches when the numeric variable is X or more.
Also, conditions written after `CASE` can be specified multiple times by separating with commas.
Therefore, this `SELECTCASE` statement has the same meaning as the following `IF` statement:

``` { #language-erb title="ERB" }  
IF A == 1 || A == 2 || A == 3  
　　PRINTFORML Variable A is 1, 2, or 3.  
ELSEIF A >= 4 && A <= 9  
　　PRINTFORML Variable A is between 4 and 9.  
ELSEIF A >= 50  
　　PRINTFORML Variable A is 50 or more.  
ELSEIF (A >= 10 && A <= 20) || A >= 40  
　　PRINTFORML Variable A is not 50 or more.  
　　PRINTFORML Variable A is between 10 and 20, or 40 or more (and 49 or less).  
ELSE  
　　PRINTFORML Variable A is 0 or less (meets none of the above conditions).  
ENDIF  
```

---

#### Ternary Operator
The ternary operator is technically not a branching syntax, but since it was derived from `IF` statements, we'll explain it here.
The ternary operator has the following form:

``` { #language-erb title="ERB" }  
<Target Variable> = <Condition> ? <Value when true> # <Value when false>  
```

For example, when variable `A` is 3 or more, assign 1 to variable `B`, otherwise assign 0. Using an `IF` statement, it would be:

``` { #language-erb title="ERB" }  
IF A >= 3  
　　B = 1  
ELSE  
　　B = 0  
ENDIF  
```

Using the ternary operator, it can be written in one line:

``` { #language-erb title="ERB" }  
B = A >= 3 ? 1 # 0  
```

The ternary operator can also be used with string variables. When handling strings, enclose the ternary operator with `\@ ~ \@`.

``` { #language-erb title="ERB" }  
PRINTFORML %CALLNAME:TARGET% is\@ TALENT:Virgin ? a virgin. # not a virgin. \@  
```

When `TALENT:TARGET:Virgin` is non-zero, this outputs '(TARGET's call name) is a virgin.' and when it's 0, it outputs '(TARGET's call name) is not a virgin.'

---

#### Combining Ternary Operator with `SELECTCASE`
By embedding the ternary operator in a `SELECTCASE` statement, you can further branch the conditional expression.

``` { #language-erb title="ERB" }  
SELECTCASE RAND:(TALENT:Virgin ? 3 # 2)  
	CASE 0  
		PRINTFORMW Unconditional 1  
	CASE 1  
		PRINTFORMW Unconditional 2  
	CASE 2  
		PRINTFORMW Virgin only  
ENDSELECT  
```

In this syntax, the conditional expression branches based on the target's virgin talent (`TALENT:Virgin`).
The conditional expression is treated as `RAND:3` when the judgment result is true, and `RAND:2` when false.
When executed, `CASE 0` and `CASE 1` are unconditionally included in the RAND selection, but `CASE 2` is excluded from RAND selection if the target is not a virgin.
This `SELECTCASE` statement has the same meaning as the following `IF` statement:

``` { #language-erb title="ERB" }  
IF RAND:3 == 0 && TALENT:0 == 1  
	PRINTFORMW Virgin only  
ELSEIF RAND:2 == 0  
	PRINTFORMW Unconditional 2  
ELSE  
	PRINTFORMW Unconditional 1  
ENDIF  
```

---

### Iteration
Iteration (loop processing) is used when you want to repeat the same process multiple times.

---

#### `REPEAT - REND`
[Reference page for `REPEAT`](../Reference/REPEAT.en.md)

``` { #language-erb title="ERB" }  
REPEAT Expression  
　　Process  
REND  
```

The process between `REPEAT - REND` is repeatedly executed.
The number of repetitions is the number or the value stored in the numeric variable immediately after `REPEAT`. You can also place an expression like `A + 1`.
For example,

``` { #language-erb title="ERB" }  
REPEAT 10  
　　PRINTFORML あ  
REND  
```

displays 'あ' on 10 lines.

---

##### `COUNT`
The variable `COUNT` stores how many times the repetition has been performed so far.
When performing the first iteration of the process within `REPEAT - REND`, it's still in the middle of the first iteration (the first iteration hasn't completed), so

``` { #language-erb title="ERB" }  
REPEAT 10  
　　PRINTFORML This is iteration {COUNT}.  
REND  
```

When written like this, it displays from the 0th to the 9th iteration.
**Remember that `COUNT` takes values from 0 to (the number after REPEAT) - 1.**
Also, be careful not to assign a value to `COUNT` as it causes errors.

##### Combining `REPEAT` with `IF` and `SIF`
You can also use `IF` and `SIF` within `REPEAT - REND`.

``` { #language-erb title="ERB" }
REPEAT 10  
　　IF COUNT == 5  
　　　　PRINTFORML Is this the 6th iteration?  
　　ELSE  
　　　　PRINTFORML This is iteration {COUNT + 1}  
　　ENDIF  
REND  
```

When written like this, only when `COUNT` is 5, i.e., the 6th iteration, '?' is displayed at the end.
While it's possible to nest another `REPEAT - REND` within `REPEAT - REND`,
the value of `COUNT` changes due to the second `REPEAT - REND`, so it won't work normally as-is.
If you want to nest `REPEAT - REND`, you need to save/restore the value of `COUNT` before and after the inner `REPEAT - REND`,
or use `FOR - NEXT` described later as an alternative.

``` { #language-erb title="ERB" }
;Example of nesting REPEAT  
REPEAT 10  
　　COUNT:1 = COUNT  
　　REPEAT 10  
　　　　Process  
　　REND  
　　COUNT = COUNT:1  
REND  
```

---

##### `CONTINUE` and `BREAK`
Within `REPEAT - REND`, use `CONTINUE` to skip to the next iteration without executing subsequent processes,
and use `BREAK` to end the iteration itself without executing subsequent processes.

``` { #language-erb title="ERB" }
REPEAT 10  
　　A = COUNT  
　　IF A == 5  
　　　　CONTINUE  
　　ENDIF  
　　PRINTFORM {A}:  
REND  
```

When executed, since `CONTINUE` is executed when `COUNT` is 5, what actually gets displayed is:

```
0:1:2:3:4:6:7:8:9:  
```

Also,

``` { #language-erb title="ERB" }
REPEAT 10  
　　A = COUNT  
　　IF A == 5  
　　　　BREAK  
　　ENDIF  
　　PRINTFORM {A}:  
REND  
```

When executed, since `BREAK` is executed when `COUNT` is 5 and the `REPEAT - REND` is exited, what actually gets displayed is:

```
0:1:2:3:4:  
```

---

#### `FOR - NEXT`
[Reference page for `FOR-NEXT`](../Reference/FOR.en.md)

``` { #language-erb title="ERB" }
FOR <Counter Numeric Variable>, <Expression>, <Expression>[, <Expression>]  
　　Process  
NEXT  
```

`FOR - NEXT` is an enhanced version of `REPEAT - REND`.
For example, the following two scripts do exactly the same thing:

``` { #language-erb title="ERB" }
FOR COUNT, 0, 10  
　　PRINTFORML Iteration {COUNT}  
NEXT  
```

``` { #language-erb title="ERB" }
REPEAT 10  
　　PRINTFORML Iteration {COUNT}  
REND  
```

The first `<Numeric Variable>` after `FOR` is equivalent to `COUNT` in `REPEAT`.
In `REPEAT`, the variable for counting iterations is fixed to `COUNT`, but in `FOR`, you can set this variable to any variable you like.
By using a separate counter variable, you can easily achieve nested loops which were troublesome with `REPEAT`.

``` { #language-erb title="ERB" }
;Nested example  
FOR A, 0, 10  
　　FOR B, 0, 10  
　　　　Process  
　　NEXT  
NEXT  
```

The second `<Expression>` after `FOR` sets the starting value of the `<Counter Numeric Variable>`.
The third `<Expression>` specifies the ending value of the `<Counter Numeric Variable>`.
For example,

``` { #language-erb title="ERB" }
FOR COUNT, 3, 8  
　　PRINTFORM {COUNT}:  
NEXT  
```

When executed:

```
3:4:5:6:7:  
```

The fourth `<Expression>` after `FOR` can set the value added to the counter variable for each loop iteration. If omitted, it's automatically set to 1.
For example,

``` { #language-erb title="ERB" }
FOR COUNT, 0, 10, 2  
　　PRINTFORM {COUNT}:  
NEXT  
```

When executed:

```
0:2:4:6:8:  
```

Note that `CONTINUE` and `BREAK` can also be used, just like with `REPEAT - REND`.

---

#### `WHILE - WEND`
[Reference page for `WHILE-WEND`](../Reference/WHILE.en.md)

``` { #language-erb title="ERB" }
WHILE Condition  
　　Process  
WEND  
```

The loop repeats while the condition is true.
For example, the following script displays 'あ' on 10 lines:

``` { #language-erb title="ERB" }
A = 0  
WHILE A < 10  
　　PRINTFORML あ  
　　A += 1  
WEND  
```

Note that if you forget to write the `A += 1` line, the value of variable `A` remains 0,
so `A < 10` remains forever true, leading to an infinite loop.
`CONTINUE` and `BREAK` can also be used in `WHILE - WEND`.

---

#### `DO - LOOP`
[Reference page for `DO-LOOP`](../Reference/DO.en.md)

``` { #language-erb title="ERB" }
DO  
　　Process  
LOOP Condition  
```

The loop repeats while the condition is true.
While the visual difference from `WHILE - WEND` is just the position of the condition, it has the characteristic that the first iteration is always executed.
Compare the following two scripts:

``` { #language-erb title="ERB" }
A = 0  
WHILE A < 0  
　　PRINTFORML あ  
WEND  
```

``` { #language-erb title="ERB" }
A = 0  
DO  
　　PRINTFORML あ  
LOOP A < 0  
```

The `WHILE` statement evaluates whether the condition is true at the beginning of the loop, so in this case `PRINTFORML` is not executed at all.
On the other hand, `DO - LOOP` evaluates the condition at the end of the loop, so in this example `PRINTFORML` is executed once, and then the expression is evaluated to exit the loop.

Also note that when calling the `CONTINUE` statement within `DO - LOOP`, it goes to `LOOP` instead of `DO`.
The following script runs in the order `DO → CONTINUE → LOOP 0` (not `DO → CONTINUE → DO`), so it doesn't become an infinite loop.

``` { #language-erb title="ERB" }
DO  
　　CONTINUE  
LOOP 0  
```

---

## Functions and Function Calls
This section covers areas used mainly when creating feature patches and variants.

### What are Functions
Functions are predefined blocks of processing that can be used from any location.
As an example, let's create a function that multiplies the value of variable `A` by 10.

``` { #language-erb title="ERB" }
@A_TEN_TIMES
A = A * 10
```

After `@`, you can name the function using half-width alphanumeric characters and `_` (underscore).
The processing that follows is what the function does.

``` { #language-erb title="ERB" }
A = 0  
CALL A_TEN_TIMES  
PRINTFORML Variable A is {A}.  

A = 5  
CALL A_TEN_TIMES  
PRINTFORML Variable A is {A}.  
```

To use (call) the function you created, write `CALL <Function Name>`.
As a result, the top displays 'Variable A is 0' and the bottom displays 'Variable A is 50'.
Sometimes `JUMP <Function Name>` is used to call functions.
The difference between `CALL` and `JUMP` is whether you return to the original location after executing the function:
`CALL` returns, `JUMP` does not.

Note that when there are multiple functions with the same name, only one of them is called (except for special event functions).
Be careful not to have duplicate function names.

---

### `RETURN` and Return Values
When you want to end a function midway when a certain condition is met,
write `RETURN <Number>`.

``` { #language-erb title="ERB" }
@TEST
SIF A == 0  
　　RETURN 0  
A = A * 5  
```

In this case, when calling function `@TEST`, if `A` is 0 nothing happens, otherwise `A` is multiplied by 5.
Also, when exiting the function with a `RETURN` statement and returning to the original location, the variable `RESULT` is overwritten with the number specified in `RETURN`.
At this time, `RESULT` is called the **return value** of the function.
For example,

``` { #language-erb title="ERB" }
@TEST2
IF A == 0  
　　RETURN 0  
ELSEIF A == 1  
　　RETURN 1  
ELSEIF A == 2  
　　RETURN 2  
ELSE  
　　RETURN 9  
ENDIF  
```

When you call this function from another location:

``` { #language-erb title="ERB" }
A = 0  
CALL TEST2  
PRINTFORML {RESULT}  

A = 2  
CALL TEST2  
PRINTFORML {RESULT}  

A = 3  
CALL TEST2  
PRINTFORML {RESULT}  
```

It displays `0`, `2`, and `9` in order.
Note that in Emuera, you can specify numeric variables or expressions in the `RETURN` statement, and you can also specify multiple return values separated by commas.

---

### Arguments
In Emuera, functions can take **arguments**. Arguments are variables that can be passed to the function when calling it with `CALL`.
Below is the function `@TEST2` written above, rewritten to take arguments.

``` { #language-erb title="ERB" }
@TEST2, ARG
IF ARG == 0  
　　RETURN 0  
ELSEIF ARG == 1  
　　RETURN 1  
ELSEIF ARG == 2  
　　RETURN 2  
ELSE  
　　RETURN 9  
ENDIF  
```

Call it as follows:

``` { #language-erb title="ERB" }
CALL TEST2, 0  
PRINTFORML {RESULT}  

CALL TEST2, 2  
PRINTFORML {RESULT}  

CALL TEST2, 3  
PRINTFORML {RESULT}  
```

When executing `CALL TEST2, 0`, `ARG` becomes 0, and you can reference `ARG` within the function.
You can take multiple arguments, and in such cases, define them as `ARG, ARG:1, ARG:2, ...`.

``` { #language-erb title="ERB" }
@TEST3, ARG, ARG:1, ARG:2  
(omitted)  
```

``` { #language-erb title="ERB" }
CALL TEST3, 0, 7, 3  
```

Arguments can also be string variables, in which case you use `ARGS`.

---

### Local Variables
Single-character variables like `A`, `B` and `COUNT` are shared as a single variable across the entire program.
However, this can cause bugs.

``` { #language-erb title="ERB" }
@MAIN
FOR COUNT, 0, 10  
　　CALL FUNC  
NEXT  

@FUNC
FOR COUNT, 0, 3  
　　(Some processing)  
NEXT  
```

When executing the `@MAIN` function above, every time `@FUNC` is called, `COUNT` is set to 3, so it falls into an infinite loop.
In this example, the problem would be solved by changing the counter variable in `@FUNC`'s FOR loop to `COUNT:1`, but
functions used in one variant easily exceed 1000, so this kind of problem is guaranteed to occur somewhere.

So, by preparing variables that can only be used within specific functions (local variables), this problem should be solved.
These local variables are `LOCAL` and `LOCALS`. Look at the following example:

``` { #language-erb title="ERB" }
@EVENTFIRST
　　LOCAL = 123  
　　CALL FUNC001  
　　PRINTFORML {LOCAL}  

@FUNC001
　　LOCAL = 567  
　　RETURN  
```

At first glance, it looks like the same variable `LOCAL` is being assigned a number in both,
but "LOCAL used in @EVENTFIRST" and "LOCAL used in @FUNC001" are treated as separate things,
so the result of the `PRINTFORML` statement is "123".

Note that `LOCALS` is the string variable version of `LOCAL`.
`ARG` and `ARGS` explained earlier are also treated as local variables.

---

#### Be Careful About Initialization Timing of LOCAL and ARG
For those who have programmed in other languages, pay special attention to the following:
**`LOCAL` and `ARG` are NOT initialized when the function is called.**
**The same `LOCAL` and `ARG` are reused for each function call.**
This characteristic requires caution when using function recursion, etc.

``` { #language-erb title="ERB" }
@SAMPLE
LOCAL += 1  
IF LOCAL < 10  
　　CALL SAMPLE  
ENDIF  
```

To someone with programming experience, this might seem like
"LOCAL is a local variable initialized to 0 when called, so LOCAL should stay at 1, cause an infinite loop, and eventually overflow the stack."
However, when calling `@SAMPLE` in reality,
**the first external call causes SAMPLE to be recursively called 9 times, and subsequent calls do not cause recursion.**
Why? Because when `LOCAL` is assigned 1 in the first call, when called again recursively, `LOCAL` is not initialized to 0, so the value 1 is retained.
Also, after the recursion completes and you exit the `@SAMPLE` function, the final value of `LOCAL` (10) continues to be retained, so from now on, even when called externally, recursion will not occur.

The same applies to `ARG`.

``` { #language-erb title="ERB" }
@SAMPLE2, ARG
SIF ARG >= 10  
　　RETURN  
CALL SAMPLE2, ARG + 1  
PRINTVL ARG  
```

Write the above code and call `CALL SAMPLE2, 0`, and **10 is displayed 10 times**.

<details><summary>Note for programmers</summary>

Regarding Emuera's internals, `LOCAL` is defined as a variable with the name "function name @LOCAL" in Emuera.<br/>
In other words, erabasic local variables are essentially global variables (like) that can only be referenced within specific functions.<br/>
In C#, this is equivalent to the following code:<br/>
```
class SampleClass  
{  
　　int SAMPLE@LOCAL = 0; // Declared as a global variable  

　　void SAMPLE()  
　　{  
　　　　SAMPLE@LOCAL += 1;  
　　　　if (SAMPLE@LOCAL < 10)  
　　　　{  
　　　　　　SAMPLE();  
　　　　}  
　　}  
}  
```
</details>

---

### Functions Usable in Expressions
In erabasic, return values from commands that return values are received via `RESULT`.
For example, using the command `ABS` that returns the absolute value of a given expression,
to store the absolute value of variable `A` in `LOCAL`, write as follows:

``` { #language-erb title="ERB" }
ABS A  
LOCAL = RESULT  
```

In contrast, using a "function usable in expressions" (hereinafter "expression function") named `ABS`, the above script can be written as:

``` { #language-erb title="ERB" }
LOCAL = ABS(A)  
```

As the name "expression function" suggests, you can directly call the function from within an assignment expression and assign the return value to `LOCAL` without going through `RESULT`.
In expression functions, arguments are called by enclosing them in parentheses like `(A)`.
If there are multiple arguments, write them separated by commas within the parentheses like `(A, B, C)`.
Conversely, if there are no arguments, write just `()`. Parentheses cannot be omitted even without arguments.
[Reference page for `ABS`](../Reference/ABS.en.md)

The same applies to commands that return strings.

``` { #language-erb title="ERB" }
STRLENS STR:0  
IF RESULT > A  
　　SUBSTRING STR:0, A, 1  
　　LOCALS:0 = %RESULTS:0%  
ENDIF  
```
``` { #language-erb title="ERB" }
IF STRLENS(STR:0) > A  
　　LOCALS:0 = %SUBSTRING(STR:0, A, 1)%  
ENDIF  
```

The two examples above perform the same operation.
You can check the list of expression functions on the [Commands and Expression Functions page](../Reference/README.en.md).

---

#### Defining Your Own Expression Functions
You can define your own expression functions.
Simply write `#FUNCTION` immediately after the `@` line that defines the function, and replace `RETURN` with `RETURNF`, and that function becomes an expression function.

``` { #language-erb title="ERB" }
;The line below could be written as @TEST2, ARG, but this is the common convention
@TEST2(ARG)  
#FUNCTION  
IF ARG == 0  
　　RETURNF 0  
ELSEIF ARG == 1  
　　RETURNF 1  
ELSEIF ARG == 2  
　　RETURNF 2  
ELSE  
　　RETURNF 9  
ENDIF  
```

Call it as follows:

``` { #language-erb title="ERB" }
PRINTFORML {TEST2(0)}  
PRINTFORML {TEST2(2)}  
PRINTFORML {TEST2(3)}  
```

If you want to create an expression function that returns a string, write `#FUNCTIONS`.
However, note that the way `RETURNF` is written differs from other commands (like `PRINTFORM`).

Related page: [User-Defined Expression Functions](../Emuera/user_defined_in_expression_function.en.md)

---

## Labels and Key Input
Labels and key input are mainly used for branching via choices.

``` { #language-erb title="ERB" }
PRINTFORML Please select  
PRINTFORML [0] Option 1  
PRINTFORML [1] Option 2  
;When Emuera finds numbers enclosed in [ ] like above, it automatically converts them to buttons  

$INPUT_LOOP  
INPUT  

IF RESULT != 0 && RESULT != 1  
　　GOTO INPUT_LOOP  
ELSEIF RESULT == 0  
　　Process1  
ELSEIF RESULT == 1  
　　Process2  
ENDIF  
```

`INPUT` waits for key input (or button operation) and stores the input number in `RESULT`.
In this case, executing Process1 when you input `0` and Process2 when you input `1`.
If you input a number that is neither 0 nor 1, `RESULT != 0 && RESULT != 1` is true, so `GOTO INPUT_LOOP` is executed.
`GOTO (Label Name)` moves to the processing of `$(Label Name)`. It's similar to the relationship between `CALL`/`JUMP` and `@`,
but for `GOTO` and `$`, they must be within the same function.
When you `GOTO INPUT_LOOP` and move to `$INPUT_LOOP`, `INPUT` is executed again,
so this series of processing repeats until you input 0 or 1.

Also, when using multiple `$` and `GOTO` combinations in one function,
an error like "ELSEIF, ELSE, or ENDIF that doesn't correspond to IF" may occur.
In this case, move the second input processing to a different function, etc.

---

## Other Notes

### Adding and Removing Characters
Use `ADDCHARA` and `DELCHARA` to add and remove characters.
[Reference page for `ADDCHARA`](../Reference/ADDCHARA.en.md)
[Reference page for `DELCHARA`](../Reference/DELCHARA.en.md)

``` { #language-erb title="ERB" }
ADDCHARA 1  
ADDCHARA 5  
ADDCHARA 9  
```

In Emuera, you can write it as:

``` { #language-erb title="ERB" }
ADDCHARA 1, 5, 9  
```

In `ADDCHARA`, character numbers from CSV are referenced.

``` { #language-erb title="ERB" }
DELCHARA 3  
DELCHARA 1  
```

In `DELCHARA`, character registration numbers (ID), not character numbers (NO), are referenced.
In the processing above, characters with character number (NO) 1 (ID=1), 5 (ID=2), and 9 (ID=3) are added first,
then the character with registration number (ID) 3, i.e., character number (NO) 9, is deleted,
then the character with registration number (ID) 1, i.e., character number (NO) 1, is deleted,
leaving only the character with character number (NO) 5.
Note that when using `DELCHARA` consecutively, characters after the deleted registration number each shift forward.

Also, when adding/removing characters, check the status of the character being trained, assistants, etc.
For example, even if a character who was an assistant is deleted with `DELCHARA`,
`ASSI` which stores the assistant's registration number doesn't change. However, since overall registration numbers shift forward,
characters that don't meet the assistant condition may become assistants.

---

### Graphical Display
Using `BAR` (`BARL`), you can visually display numeric values.
Write as `BAR (number or variable), (number or variable), (graph length)`

``` { #language-erb title="ERB" }
A = 80  
B = 100  
BAR A, B, 10  
```

This displays:

```
[********..]  
```

`A` is the current value and `B` is the maximum value. This is often used to show what proportion of the maximum the current value represents.
Note that `BARL` also adds a newline after displaying.

---

### Decimal Multiplication
In erabasic, variables and such are all processed as integers, but as an exception,
you can perform decimal calculations using `TIMES`.
[Reference page for `TIMES`](../Reference/TIMES.en.md)

``` { #language-erb title="ERB" }
A = 1000  
TIMES A, 1.5  
```

This makes variable `A` equal to `1000 × 1.5` which is `1500`.
Note that even if the result of using `TIMES` is a decimal, it's rounded to an integer.

---

### Other Commands
[`WAIT`](../Reference/WAIT.en.md)…Performs only waiting for input. No value is stored in `RESULT`.  
[`QUIT`](../Reference/QUIT.en.md)…Terminates eramaker. Mainly used during game over, etc.

---

## About Bit Operations

```
anon>Hey me. What does the single & that's often used in config mean? Is it a mistake for &&?
anon>Oh, that's called bit operations. It's properly listed [here](../eramaker/variables.en.md)
anon>It's the one at the very bottom
  ----------------------------------------
anon>...Alright, I get it
anon>I thought so. Since you don't normally use binary numbers
anon>Binary numbers? What are those? Is that delicious?
anon>I have no choice, let me explain from there
```

### Binary Numbers

#### What are Binary Numbers?
Binary numbers, which are unfamiliar to most unless you've studied that field, are something you should definitely learn if you're using bit operations.

The commonly used numbers, `0,1,2,...,9,10,11,...99,100,101,...`
These are called decimal numbers. "Is that so?"
There are other representations called "base-X numbers," but to distinguish them, remember to look at when the digit rolls over.
In decimal, it's `0,1,2,3,4,5,6,7,8,9,10,11,...`
It becomes two digits after 9. It advances to the next digit from 10, hence "decimal."
In other words, in binary, it advances to the next digit at 2. Specifically, after 1 comes "10" in notation.
So decimal "2" and binary "10" represent the same number.
To avoid confusion with decimal "10", binary "10" is often called "ichi-zero."

```
   0 - 0  
   1 - 1  
  10 - 2  
  11 - 3  
 100 - 4  
 101 - 5  
 110 - 6  
 111 - 7  
1000 - 8  
```

The 9 numbers above represent the same values in binary and decimal.
The right column is the familiar decimal.
Looking at the left column, the binary representation, you can see that digits increase with each power of 2 (2, 4, 8, etc.).
This is the basics of binary representation.

For binary numbers, remember these two points:

- Each digit is always 0 or 1
- Digits increase with each power of 2

---

#### Easy Way to Convert Binary to Decimal
Since it's difficult with the "each digit is 2 to the power of X" explanation, here's how to view it when converting binary to decimal:

Example:

1011011→(64×1+32×0+16×1+8×1+4×0+2×1+1×1)  
　　　　→(64+16+8+2+1)→91  

---

```
anon>Is this it?
anon>Hmm...I think I kind of get it...
anon>But how does this relate to config?
anon>Right. In era config, you set whether to use each function or not, right?
anon>Ah, yes. Each item shows ON or OFF
anon>Binary uses only 1 or 0, you understood that earlier, right?
anon>Ah, that's right
anon>So?
anon>Oh, I see. You map each function's ON to 1 and OFF to 0, right?
anon>That's it
anon>Now let's see how to actually write it
```

---

### Bit Operations

#### What are Bit Operations?
In the previous section, we learned that binary numbers represent values where each digit is 1 or 0.
In bit operations, you use each digit being 1 or 0 to make conditional branches.

``` { #language-erb title="ERB" }
FLAG:1 = 0  
FLAG:2 = 1  

IF FLAG:1 & 1  
　　　　PRINTFORML FLAG:1 is ON.  
ELSE  
　　　　PRINTFORML FLAG:1 is OFF.  
ENDIF  
IF FLAG:2 & 1  
　　　　PRINTFORML FLAG:2 is ON.  
ELSE  
　　　　PRINTFORML FLAG:2 is OFF.  
ENDIF  
```

`&` converts the values before and after to binary, calculates digits where both are `1` as `1` and all other digits as `0`, and presents the result as a decimal.
When looking at `FLAG:1 & 1`, first, the value of `FLAG:1` is `0`, which is also `0` in binary.
The `1` to compare is also `1` in binary, so `0` and `1` don't match.
So `FLAG:1 & 1` becomes `0`.
On the other hand, for `FLAG:2 & 1`, both `FLAG:2` and `1` become `1` in binary.
Since the first digit is `1` in both, `FLAG:2 & 1` becomes `1`.
Applying this to the `IF` statements above:

``` { #language-erb title="ERB" }
IF 0  
　　　　PRINTFORML FLAG:1 is ON.  
ELSE  
　　　　PRINTFORML FLAG:1 is OFF.  
ENDIF  
IF 1  
　　　　PRINTFORML FLAG:2 is ON.  
ELSE  
　　　　PRINTFORML FLAG:2 is OFF.  
ENDIF  
```

The displayed results are:

```
FLAG:1 is OFF.  
FLAG:2 is ON.  
```

---

#### Judging Multiple Conditions
In the example above, we explained the processing that judges one condition each for `FLAG:1` and `FLAG:2`,
but by using bit operations, you can have one flag judge multiple conditions.

``` { #language-erb title="ERB" }
IF FLAG:1 & 1  
　　　　PRINTFORML Condition 1 is ON.  
ELSE  
　　　　PRINTFORML Condition 1 is OFF.  
ENDIF  
IF FLAG:1 & 2  
　　　　PRINTFORML Condition 2 is ON.  
ELSE  
　　　　PRINTFORML Condition 2 is OFF.  
ENDIF  
IF FLAG:1 & 4  
　　　　PRINTFORML Condition 3 is ON.  
ELSE  
　　　　PRINTFORML Condition 3 is OFF.  
ENDIF  
```

Given such `IF` statements, what will the result be based on the value of `FLAG:1`?
First, when `FLAG:1` is `0`, as in the earlier example, `FLAG:1 & 1` is `0`.
Looking at `FLAG:1 & 2`, `0(00)` and `2(10)` have no digit that is `1` in both, so it's still `0`. `FLAG:1 & 4` is also `0(000)` and `4(100)`, so `0`.

Next, when `FLAG:1` is `1`, as in the earlier example, `FLAG:1 & 1` is `1`.
`FLAG:1 & 2` is `1(01)` and `2(10)`, so `0`.
`FLAG:1 & 4` is `1(001)` and `4(100)`, so `0`.

When `FLAG:1` is `2`, `FLAG:1 & 1` is `2(10)` and `1(01)`, so `0`.
`FLAG:1 & 2` is `2(10)` and `2(10)`, and both the second digit are `1`.
So `FLAG:1 & 2` becomes `10` in binary, which is `2`.
`FLAG:1 & 4` is `2(010)` and `4(100)`, so `0`.

When `FLAG:1` is `3`, `FLAG:1 & 1` is `3(11)` and `1(01)`, the first digit matches and becomes `1`.
In `FLAG:1 & 2`, `3(11)` and `2(10)` have the second digit matching and become `2`.
`FLAG:1 & 4` is `3(011)` and `4(100)`, so `0`.

When `FLAG:1` is `3`, the result display is:

```
Condition 1 is ON.  
Condition 2 is ON.  
Condition 3 is OFF.  
```

As you can see, using bit operations allows you to express combinations of multiple conditions with a single flag.
However, note that only binary conditions like ON/OFF or present/absent can be judged.
Also, the number used after `&` in each condition expression is a power of 2. The reason is explained in the next section.

---

#### How to Set Values for Bit Operations
We've explained the part that judges using bit operations, but to actually use bit operations in processing, you also need a way to manipulate the values used for judgment.
You can calculate like `FLAG:1 += 1` or `FLAG:1 -= 2` like other processing, but this can cause problems.

``` { #language-erb title="ERB" }
FLAG:1 = 0  

@CONFIG_1
PRINTFORML [0] Turn Feature 1 ON  
PRINTFORML [1] Turn Feature 1 OFF  

INPUT  

IF RESULT == 0  
　　　　PRINTFORML Turning Feature 1 ON.  
　　　　FLAG:1 += 1  
ELSEIF RESULT == 1  
　　　　PRINTFORML Turning Feature 1 OFF.  
　　　　FLAG:1 -= 1  
ENDIF  

@PRINT_CONFIG
SIF FLAG:1 & 1  
　　　　PRINTFORML Feature 1 is ON.  
SIF FLAG:1 & 2  
　　　　PRINTFORML Feature 2 is ON.  
SIF FLAG:1 & 4  
　　　　PRINTFORML Feature 3 is ON.  
;(continued below)  
```

If you execute the "Turn Feature 1 ON" command twice or more in this processing, the value of `FLAG:1` keeps increasing to 2, 3, 4,... and may not work correctly.

So, what's used to calculate the judgment variables for bit operations is `|`.
`|` calculates by converting the values before and after to binary and making each digit `1` if either one is `1` in the same position.
For example, `5(101) | 3(011)` has all three digits as 1, so the result is `111` in binary, which is `7` in decimal.

``` { #language-erb title="ERB" }
A = 5  
B = 3  

C = A | B  

PRINTFORML Variable C is {C}.  
```

↓

```
Variable C is 7.  
```

Also, `A = A | B` can be written as `A |= B`.
Be sure to remember this, since variables used in bit operations are often overwritten with the original.

Now, how about turning features OFF, etc.?
In the example above, let's say Features 1, 2, and 3 are all ON, and think about how to turn Feature 2 OFF.
Since Features 1-3 are ON, `FLAG:1 & 1`, `FLAG:1 & 2`, and `FLAG:1 & 4` are all non-zero, meaning the lower three digits of `FLAG:1` in binary are `111`.
To turn Feature 2 OFF from here, you only need to change the second digit from the bottom to `0` while keeping the others the same.
You might think to subtract `2` (binary `10`) to make the second digit `0`, but that causes problems when done twice or more.

So, we use `&` again.
`7(111) & 5(101)` results in `101` in binary, successfully changing only the second digit to `0` without affecting other digits.

To turn Feature 2 OFF when Features 1 and 2 are ON, you need to change `011` to `001`, which can be achieved with `3(011) & 5(101)`.

Now, what value is `5(101)` that comes after `&` in this case?
Looking at it in binary, it's the number where all digits other than the one you want to set to `0` are `1`.
This is the same even when the total number of features increases: if turning off Feature 4 out of 5 features, use `10111`, and if turning off Feature 3 out of 10 features, use `1111111011` after `&`.

Based on this, rewriting only the ON/OFF part of the earlier example:

``` { #language-erb title="ERB" }
@CONFIG_1
PRINTFORML [0] Turn Feature 1 ON  
PRINTFORML [1] Turn Feature 1 OFF  

INPUT  

IF RESULT == 0  
　　　　PRINTFORML Turning Feature 1 ON.  
　　　　FLAG:1 |= 1  
ELSEIF RESULT == 1  
　　　　PRINTFORML Turning Feature 1 OFF.  
　　　　FLAG:1 &= 6(→110→2+4)  
ENDIF  

(FLAG:1 &= 6 is the same as FLAG:1 = FLAG:1 & 6)
```

---

```
anon>That's it. Got it?
anon>...........
anon>...Well, I'm not confident I could explain it so people actually understand
anon>You just have to work on it yourself from here
anon>Hmm...
Exit anon  "Reimu-sama is my... master" anon!anony@anony.
anon>According to Orange, if you don't understand, ask people, not "person meat"!
anon>On IRC or the thread, there should be some kind craftsman who'll answer
anon>Yeah... I'll try my best somehow
anon>Sure. I'm looking forward to seeing something complete, whatever it is
```

---

## Common Errors in ERB Editing

**Note: This section contains many explanations dependent on eratoho and eramaker specifications.**

This section is about displaying various errors and issues that occur when creating or modifying ERB files used in eramaker and Emuera for the reference of those who come after.
While it's basically based on eramaker specifications, errors in Emuera are also described.

Also, using various tools introduced in the Development Tools Summary makes it easier to find basic mistakes, so we recommend adopting them. However, some errors like TALENT reference mistakes and dead branches cannot be found, so don't be careless - be sure to thoroughly check with your own eyes.
Also, reading and understanding the various syntax tutorials introduced on the page above will prevent basic mistakes from happening in the first place.

In the examples below, `[EOF]` indicates the end of the file there, `[CR]` indicates a newline, and `□` indicates a full-width space. Note that these are not necessarily what you should type exactly as shown. Also, Notepad particularly doesn't show `[CR]` and `□` clearly.

---

### Forgetting to Close a Loop
If you write hard-to-read source by not setting proper indentation, this kind of situation tends to happen.
Specifically,

``` { #language-erb title="ERB" }
IF A == 2  
	IF B == 3  
	IF C == 4  
		PRINTL A is 2, B is 3, C is 4.  
	ELSE  
		PRINTL A is 2, B is 3, but C is not 4.  
	ENDIF  
	PRINT A is 2, B is not 3.  
ELSE  
ENDIF  
```

In the above example, the third IF doesn't have proper indentation, so one ENDIF is missing. If you try to run this, it will error and stop working.
In other words, humans are prone to mistakes, so make sure to use proper indentation to make it readable.

---

### Closing a Loop Too Many Times
If you're told there's not enough ENDIFs, putting in too many is, of course, not the solution. They should be properly placed.

``` { #language-erb title="ERB" }
IF A == 2  
	IF B == 3  
		PRINTL A is 2 and B is 3.  
	ENDIF  
	ENDIF  
ENDIF  
```

You might think this is fine, but in eramaker (or Emuera), when things don't add up internally, unexpected behavior occurs - errors at strange points, flag corruption, all subsequent syntax not being executed, and so on.

---

### Adding ENDIF to an SIF Statement
SIF statements complete in the one line immediately following, so they don't need to be closed with ENDIF. This can happen when you create an IF statement and then convert it to SIF but forget to remove the ENDIF afterward.

``` { #language-erb title="ERB" }
 SIF A == 2  
 	 PRINTL A is 2.  
 ENDIF  
```

Well, you can catch this by reviewing once more or running some kind of checker. In any case, be careful.

---

### Trying to Fit Multiple Lines in an SIF Statement
As mentioned, SIF statements complete in the one line immediately following. That means you can't branch multiple lines with SIF like you would with IF～ENDIF. This is easy to make when adding processing to a branch made with SIF.

``` { #language-erb title="ERB" }
 SIF TALENT:MASTER:117  
 	 A += 100  
 	 B += 100  
```

In the example above, `B += 100` will always execute regardless of whether TALENT:MASTER:117 exists or not. This is a mistake that can't be detected by checkers, so be very careful.

``` { #language-erb title="ERB" }
 SIF TALENT:MASTER:117  
 	 A += 100  
 SIF TALENT:MASTER:117  
 	 B += 100  
```

Writing it this way will execute as intended, but it's faster and clearer to use IF statements from the beginning.
Actually, not using SIF statements at all is the best solution.

---

### Placing Comments Immediately After SIF is Dangerous
SIF statements execute the one line immediately following if the condition is true. In Emuera, if that line is a comment, it doesn't count it and executes the first non-comment line after it.
However, eramaker "executes" the comment line immediately after, so behavior differs between the two. Be careful about this. If possible, put comments before the SIF line.

---

### Writing ELSEIF as ELSE / Writing ELSE IF
Sometimes you might write something like the following in IF～ELSE～ENDIF statements and get errors.

``` { #language-erb title="ERB" }
 IF TALENT:120  
 	 PRINTL It's a guy.  
  ELSE TALENT:121  
 	 PRINTL It's a futa.  
  ELSE IF TALENT:122 || TALENT:123  
 	 PRINTL Maybe it'll grow someday?  
  ENDIF  
```

Now, in the example above, both ELSE statements cause errors. The first is an example of forgetting IF. The second is an example of ELSE and IF being separated.
You can't attach conditions to ELSE in the specification, so neither is properly judged.
In any case, make sure this doesn't happen.

---

### The "You're Already Dead" Branch
One mistake that can happen in IF～ELSE～ENDIF syntax is "dead branches." It may not cause errors or crashes, but it's better to avoid them.

``` { #language-erb title="ERB" }
 IF TALENT:120 == 1 || TALENT:121 == 1  
 	 PRINTL Has a penis!  
 ELSEIF TALENT:120 == 1  
 	 PRINTL It's a guy!  
 ENDIF  
```

Now, in the example above, the ELSEIF TALENT:120 == 1 line can never be true and executed. This part is a "dead branch."
Because if TALENT:120 exists, the first IF executes, and the ELSEIF judgment never runs.

``` { #language-erb title="ERB" }
 IF TALENT:120 == 1 && TALENT:121 == 1  
 	 PRINTL It's a guy AND futa.  
 ELSEIF TALENT:120 == 1  
 	 PRINTL It's a guy!  
 ENDIF  
```

What if you write it like this above?
Of course, in this case, the ELSEIF condition is no longer a "dead branch." But... "guy AND futa" what is that? Since this is an impossible condition in the specification, the first IF statement is a "dead branch."
If there's a setting where "guy" and "futa" can coexist, then it's not a dead branch, so regarding this, you need to consider the background settings and worldview, but also be careful about such "dead branches."

---

### Check If Assistant Exists Before Checking the Assistant
In erabasic, character registration numbers are all positive integers including 0, and negative numbers don't exist.
However, if ASSI doesn't exist, you can't assign a blank, so -1 is temporarily assigned.
Therefore, if you try to check the assistant's number or status when there's no assistant, you get an error: "First argument (-1) is outside the character registration number range."
When referencing the assistant in any way, always include the condition `IF ASSI > 0` before the condition expression to exclude cases where the assistant doesn't exist.

``` { #language-erb title="ERB" }
 IF ASSI >= 0  
 	 SIF TALENT:ASSI:0 == 1  
 		 PRINTL The assistant is a virgin.  
 ENDIF  
```

Also, in some dialogue templates, there are cases where the assistant's number is assumed as `Y1` with a condition that a specific character is the assistant.
As mentioned, since ASSI can only contain natural numbers, having a formula like `IF ASSI:NO == Y1` causes an error.
Normally this part should be commented out, so if you don't specify an assistant number, leave the `;` at the beginning as is.

---

### eramaker Doesn't Do Short-Circuit Evaluation
In Emuera, short-circuit evaluation (where if the previous condition is false, subsequent condition judgments are not performed) is implemented, but it's not implemented in eramaker.
So you need to write somewhat roundabout syntax. Especially when you make an Emuera-exclusive variant using convenient extended syntax and then make an eramaker variant, you tend to skip over this.

``` { #language-erb title="ERB" }
 SIF ASSI >= 0 && TALENT:ASSI:0  
 	 PRINTL The assistant is a virgin.  
```

In Emuera, if ASSI is -1 (doesn't exist), it's clear that the IF is not true, so it doesn't evaluate the following TALENT:ASSI:0 and ignores it. Therefore, it doesn't stop due to an error from trying to reference the non-existent assistant's ability.
But in eramaker, all conditions in IF statements are checked, so even when the assistant doesn't exist, it tries to reference the assistant's TALENT and an error occurs.
Therefore, as explained in the previous section, you first need to judge whether the assistant exists, and only when the assistant exists do you reference TALENT, etc.

---

### != 0 Includes -1
`!=` means "does not include ~", in other words, all values other than that number become true.
Actually, negative values are also included in this range. For example, if `ASSI != 0` (assistant is not "you"), it's also true when the assistant doesn't exist (`ASSI == -1`).
This can cause errors in later parts as it passes through the range. Note that.
Also, when writing a conditional expression in an abbreviated form like `IF TALENT:0`, in erabasic it's interpreted as `IF TALENT:0 != 0`.
That means negative values are also treated as true, so the conditional expression `IF ASSI` cannot exclude cases where there's no assistant. Write it properly as `IF ASSI > 0`.

---

### Be Careful with REPEAT Loops
REPEAT statements are convenient for iterative processing. However, some people might have misconceptions.

``` { #language-erb title="ERB" }
 REPEAT 4  
 	 SIF COUNT == 4  
 		 PRINTL Fourth  
  REND  
```

In the above, the fourth can never be printed. Because `REPEAT 4` doesn't repeat COUNT from 1 to 4, but from 0 to 3.
That is, in `REPEAT n`, n is the number of repetitions, and the last loop is (final value of COUNT) - 1.
Not knowing this creates various dead branches, so be careful.
Also, even though it's loop end, don't close with `ENDIF` instead of `REND` - that's not allowed. REPEAT can only be closed with REND, and IF can only be closed with ENDIF.

---

### Double REPEAT Statements
REPEAT statements use a dedicated variable called COUNT, but since COUNT can only be one global variable, double REPEAT where REPEAT statements are nested doesn't work in eramaker.
However, you can create double REPEAT by using the CALL command within REPEAT～REND to call a function that executes a REPEAT statement.

``` { #language-erb title="ERB" }
 REPEAT 10  
	CALL FUNC  
 REND  
 @FUNC  
 REPEAT 3  
 REND  
```

If you create double REPEAT, the inner REPEAT overwrites the outer REPEAT's information, which can lead to infinite loops in the worst case.
For example, in the above, at the end of @FUNC, COUNT is always 3, so the REPEAT in the calling function can never exit.
Calling the function with COUNT saved to another variable solves the problem, but in eramaker there's no reliable save destination, so there's no fundamental solution.
In Emuera, you can solve it by using LOCAL variables as save destinations or by replacing REPEAT with FOR～NEXT using LOCAL variables as counters.

---

### Watch Out for Comment Lines
If comment lines are properly placed and written, they help with debugging and modification, but sometimes they fail.
For example, accidentally forgetting or deleting the leading `;` when you meant to write a comment line.
Of course, that usually causes an error in that case, but depending on the comment content, it might not. For example,

``` { #language-erb title="ERB" }
 ;When debugging, money doesn't decrease if you do the following  
 ;Also, MONEY:1 is the cost incurred  
 ;MONEY:1 = 0  
 MONEY -= MONEY:1  
```

If the code you wanted to write becomes like the one below instead:

``` { #language-erb title="ERB" }
 ;When debugging, money doesn't decrease if you do the following  
 ;Also, MONEY:1 is the cost incurred  
 MONEY:1 = 0  
 MONEY -= MONEY:1  
```

Since it's not grammatically wrong, the lower description won't error.
But the internal behavior is completely different, so you don't get the result the author wanted. This kind of bug is also scary.

---

### The FORM in PRINTFORM is Important.
A common mistake is writing like this when displaying names like %CALLNAME:MASTER%:

``` { #language-erb title="ERB" }
 PRINTL %CALLNAME:MASTER% held %CALLNAME:TARGET%
```

Since %CALLNAME:MASTER% is a string variable, to display its contents you must use PRINTFORM (transform and display variables) instead of PRINT (display as-is). Incidentally, in the example above, it displays:

```
 %CALLNAME:MASTER% held %CALLNAME:TARGET%
```

Basically, PRINTFORM is a complete upgrade to PRINT, so if you're not sure, use PRINTFORM.
Also, regarding the difference between plain, L, and W: remember that PRINTFORM displays without newline or stopping, PRINTFORML adds a newline but doesn't stop and continues to the next line, PRINTFORMW adds a newline and stops at that line.

---

### Duplicate Functions?
In eramaker, defining multiple functions with the same name isn't detected as an error. So if you make duplicate function names, the worst situation happens where nothing seems wrong but something is wrong.
Therefore, except for special unchangeable things like system functions described later, avoid using the same function name.
The priority order when calling the same function name with CALL, etc., depends on the order files are read. Within the same file, the one closer to the beginning of the file is called. The file reading order depends on the file system in eramaker, but can be controlled to some extent in Emuera via config.
Also, RR-series dialogue calls use this specification.
Also, when creating custom functions in dialogue, if another dialogue accidentally uses the same function name, it can cause malfunction. Be careful not to overlap by including K (character number) in function names, etc.
Event functions, unlike normal functions, are special in that if there are multiple with the same name, all are executed (except when #SINGLE is present). For which are event functions, refer to other wiki descriptions or official documentation.

---

### Using RAND
RAND (random selection) is a convenient syntax often used when writing dialogue, but there's something to be careful about when using it.
First, the numbers selected by RAND:X are from 0 to (X-1), and X is never selected. That means making a branch like `IF RAND:3 == 3` will never be satisfied - it's a dead branch.
Also, the following mistake is common:

``` { #language-erb title="ERB" }
 IF RAND:3 == 0  
  PRINTFORMW "A"  
 ELSEIF RAND:3 == 1  
 　PRINTFORMW "B"  
 ELSEIF RAND:3 == 2  
 　PRINTFORMW "C"  
 ENDIF  
```

It looks like each has a 1/3 probability of appearing, but with this writing, the probabilities aren't equal.
Since RAND reselects the random number each time, in this case the probability of "A" appearing is 1/3, "B" is (1-1/3)×1/3=2/9, and "C" is {1-(1/3+2/9)}×1/3=4/27, with nothing appearing with a probability of 8/27.
If you want them to appear with equal probability, you need to write it in either of these forms:

``` { #language-erb title="ERB" }
 IF RAND:3 == 0  
  PRINTFORMW "A"  
 ELSEIF RAND:2 == 0  
 　PRINTFORMW "B"  
 ELSE  
 　PRINTFORMW "C"  
 ENDIF  
```

This makes "A" 1/3, "B" (1-1/3)×1/2=1/3, and "C" remaining 1/3, appearing with equal 1/3 probability.
When using variables, it becomes like below. However, be careful that the variables don't conflict with those used by the base or patch for that processing:

``` { #language-erb title="ERB" }
 A = RAND:3  
 IF A == 0  
  PRINTFORMW "A"  
 ELSEIF A == 1  
 　PRINTFORMW "B"  
 ELSE  
 　PRINTFORMW "C"  
 ENDIF  
```

Also, in Emuera-only variants, you can also use the extended syntax like the following. Note that it cannot be used in eramaker.
Example) Processing using SELECTCASE:

``` { #language-erb title="ERB" }
 SELECTCASE RAND:3  
 CASE 0  
  PRINTFORMW "A"  
 CASE 1  
  PRINTFORMW "B"  
 CASEELSE  
  PRINTFORMW "C"  
 ENDSELECT  
```

Example) Processing using PRINTDATA:

``` { #language-erb title="ERB" }
 PRINTDATAW  
  DATAFORM "A"  
  DATAFORM "B"  
  DATAFORM "C"  
 ENDDATA  
```

---

### Final Newline is Important.
In eramaker, whether it's ERB files or CSV files, the final line isn't read. That is, make sure to end with a newline.
Below is the end of an ERB file. The final line properly ends with ENDIF.

``` { #language-erb title="ERB" }
 IF RESULT == 0  
 	  CALL REPLAY_GAME  
 ELSEIF RESULT != 1  
 	  GOTO INPUT_LOOP  
 ENDIF[EOF]  
```

Now, in the example above, Emuera has no problem, but in eramaker, the final ENDIF isn't recognized and causes an error. Always end with a newline after ENDIF before saving. That way it doesn't error. That is,

``` { #language-erb title="ERB" }
 IF RESULT == 0  
 	  CALL REPLAY_GAME  
 ELSEIF RESULT != 1  
 	  GOTO INPUT_LOOP  
 ENDIF[CR]  
 [EOF]  
```

is OK.

---

### Command and Condition Statements Should Be Separated by Half-Width Spaces.
You must always include half-width spaces after command statements.
In this section, for clarity, half-width spaces are shown as `_` and full-width spaces as `□`, but when actually writing, write ` ` not `_`.

``` { #language-erb title="ERB" }
 PRINTL_Loading  
```

The examples below both cause errors in eramaker's interpretation. The first has no space after PRINTL, and the second has a full-width space instead of a half-width space after PRINTL, so PRINTL can't be recognized as a command.

``` { #language-erb title="ERB" }
 PRINTLLoading  
 PRINTL□Loading  
```

Also, when listing multiple condition statements, you must put half-width spaces between each.

``` { #language-erb title="ERB" }
 ○：IF_TALENT:85_&&_TALENT:88  
 ×：IF_TALENT:85□&&TALENT:88  
```

Even though this error often only gives a warning and doesn't crash, it can destabilize subsequent behavior and cause unintended flag corruption, etc.

---

### When You GOTO, You Forget Where You Were.
When deciding branch destinations based on input numbers or specific conditions, there are ways to manage independent items using custom functions and labels rather than nesting syntax.
The advantage is that it's easier to grasp the whole picture even with complex branches, but there's one thing to be careful about.
When using labels starting with `$` and using the GOTO command to jump to that label, erabasic forgets where you were up to in this case.
Therefore, placing the label outside the original IF structure makes it impossible to return to the original location, which can cause fatal errors.
Using labels should be limited to simple processes like returning to the selection screen when unintended numbers are input. If you're going to do complex processing like creating branches within branches at the branch destination, it's better to treat them as functions starting with `@` and call them with CALL.

---

### Don't Use the Same GOTO Label Name (INPUT_LOOP Bug).
When the same label name exists within the same function, in eramaker it jumps not to the nearest label but to the label at the very beginning of that function.
This may cause unintended behavior, so in current Emuera it's treated as a critical bug.
Number them like `$INPUT_LOOP_01` or give them distinctive custom names like `$EXTRAMODE_VIRGIN` to avoid conflicts.

---

### eramaker Reads ERB Files in the ERB Folder and CSV Files in the CSV Folder
The actual files of CSV and ERB are text files, but you shouldn't name them as `.TXT` like normal text files.
Because eramaker and Emuera only recognize CSV and ERB files (and config and ERH files), even if syntax is written there, it becomes as if it doesn't exist.
Also, eramaker only reads directly under CSV and ERB folders, so saving CSV or ERB files in subfolders is ignored (in Emuera, you can make them recognized by setting "Search Subdirectories" to YES).
Also, eramaker and Emuera read all recognizable files at startup regardless of file names or content.
When modifying, if you copy to the same folder as a backup, functions conflict, so always save backups in a separate folder.
Also, don't forget that modifications don't take effect until you restart eramaker or Emuera.

Now, a strong warning to those in environments where ERB, CSV, TXT don't display in My Computer or Explorer. Those are extensions indicating file attributes. For any reason, we strongly recommend "showing" them. Actually, making it mandatory would be fine.
Extensions are very important indicators showing part of a file's attributes, and for some reason Windows default settings sometimes hide them, but it's very inconvenient and dangerous to leave them hidden, and it also bothers others, so definitely show them. The method to show extensions differs by Windows version, but in XP for example, in folder options under the display tab in My Computer or Explorer, uncheck "Hide extensions for known file types."

---

### Even in Emuera, Be Careful When Reading CSV
As in the previous section, when the Emuera config option "Search Subdirectories" is Yes, CSV files in subdirectories are read... not quite.
For CSV files other than Chara**.csv, you must place them directly under the CSV folder or they won't be read. This is an Emuera specification, so it can't be helped.

---

### Reading CharaXX.CSV Only When Using ADDCHARA
Even if you rewrite the character CSV and restart, characters already present don't change their data.
This may seem inconvenient, but since character CSV defines initial character status, if existing characters synced with CSV, things like "Virginity you raised so carefully went down" would happen. But eramaker (and Emuera) don't do that.
Also, using this specification, if you want to reset a certain character to initial state, you can use a technique: ADDCHARA, swap, DELCHARA the old one, and it magically reverts. Though, you need to rewrite TARGET and other related variables accordingly...

---

### Avoid CFLAG:999
The eramaker variable info on this wiki specifies the usable element range for eramaker, but there's one thing to be careful about.
Actually, in eramaker, there's a bug where save/load data gets corrupted if the last element of array variables like CFLAG:999 is non-zero.
So, the usable range is actually element count - 2 (for CFLAG, up to 998).
This bug is fixed in Emuera. Using VariableSize.CSV, you can even increase the number of elements, so it's safe to use in Emuera-exclusive variants.

---

### Don't Edit CSV Files with Excel.
Many people have Office installed on their PC and have CSV files associated with Excel or other spreadsheet software.
However, **always edit CSV files for eramaker variants with a text editor**.
Because Excel adds its own paragraph markers and symbols for its own processing, which can cause eramaker to not read them properly.
Since changing the CSV association to a text editor is inconvenient for many people, you can register the text editor in the "Send to" context menu when right-clicking files, or create an option to open from file type settings.

---

### Be Careful with RAND:0.
RAND:0 returns 0 in eramaker. But in Emuera, it crashes.
This seems like a simple problem, but for example, if you have `RAND:Variable` and that variable gets assigned/calculated somewhere and reaches that processing, you should always confirm that variable is greater than 0 right before.

---

### Branching with TALENT:0 (Virgin).

**Depends on variant specifications.**

A common mistake when writing first-time dialogue is trying to branch based on whether TALENT:0 (virgin) exists.
Many might wonder what's wrong with that, but in commands that cause virginity loss like vibrators or sex, most variants process virginity loss first and then call dialogue, so by the time dialogue is called, the Virgin talent is already gone, so it can't be used for branching.
Therefore, if you want to write dialogue for virginity loss, use `EXP:0(V Experience) == 1` as the condition. However, for YM rev.6, since EXP addition is done at turn last, this condition must be `EXP:0(V Experience) == 0 && TCVAR:0(V Experience) > 0`.
Note that this method is for pure virgins and won't work for regenerated virgins.
If you really want to make a branch for regenerated virgins, at the start of training, check if a virgin exists, assign an appropriate value to some CFLAG, and judge by whether V experience is that number + 1.
For other scenarios like commands that cause virginity loss during development, you can normally use TALENT:0 as a branch condition.

