---
hide:
  - toc
---

# Variant Production / ERB Production Practical Guide

Original page  
[era series discussion thread wiki V3 ERB Production Practical Guide](https://seesaawiki.jp/eraseries/d/ERB%c0%bd%ba%ee%bc%c2%c1%a9%ca%d4)

---

- [Tutorial](erawiki-tutorial.md)
- [Title Preparation](erawiki-title.md)
- [Title Practice](erawiki-title2.md)
- ERB Production Practical Guide

---

This page summarizes discussions from a Discord server

- [Discord - eraEVENT_KXX](https://discord.gg/cuSh6y5j93)

Continuing from [Title Practice](erawiki-title2.md), this page explains practical ERB content.

---

## VSCode Installation Guide

There are also detailed PDF guides available. These are more thorough and easier to understand:

- [eraVSCode: Download](http://book-shelf-end.com/up/dwlink.cgi?eraRx3299.zip)

1. Download from the official website and install  
   [Visual Studio Code - Code Editor Microsoft Azure](https://azure.microsoft.com/ja-jp/products/visual-studio-code/)

2. Go to the Extensions tab on the left, search for "erabasic" and install the ERB plugin  
   ![](../assets/images/VSCodeSS1.JPG)

3. Open your variant or dialogue folder via the File menu in the top left  
   ![](../assets/images/VSCodeSS2.JPG)

4. The editor environment is ready at this point, but save the workspace  
   ![](../assets/images/VSCodeSS3.JPG)

5. Thanks to the erabasic extension, ERB files are now easier to read  
   The above explains how to install "Visual Studio Code (VSCode)", but be careful not to confuse it with the similarly named "Visual Studio" app.  
   Visual Studio is an integrated development environment (IDE) for compiled, built, and debugged languages, and is different from VSCode which is a source code editor.  
   Since erabasic only needs Emuera to read the code, VSCode is the better choice.  
   Thanks to the volunteer ERB plugins, jumping to function definitions is easy (there's "Go to Definition" for functions and variables), which saves time when working on unfamiliar variants: "Where is the function being CALLed here?"  
   Even when many functions are in one file, the outline feature enables flexible production.  
   Git integration is also possible.

---

## About Variable Types

For those who have never programmed before when starting with era, many wonder "What is a variable?"  
As already thoroughly explained, variables are like boxes. Since this is a clichéd explanation, I'll skip it.  
Searching for "variable" will show various types like `boolean`, `double`, `float`, and beginners often get confused by this.  
Even though other languages have many variable types, Emuera only uses 2 types: `str` (`string`) and `int` (`integer`).

>`str` type (string type): Variables containing text. Can store any data including numbers  
>`int` type (numeric type): Variables containing numbers. Can only store numbers but are powerful for calculations

Since there are only these two concepts—variables for text and variables for numbers— forget about other variable types when using Emuera.  
Although Emuera has both numeric and string types from the start, variables with "STR" or "S" in their names tend to be string types. `CSTR`, `LOCALS`, `ARGS`, `GLOBALS` are string types.

The familiar "Day X" or "Money XXX yen" in era games use numeric variables.  
And character names, including "You", use string types.

The latter uses variables like `NAME` and `CALLNAME`. As the variable names suggest, these are character names and call names (abbreviations).  
There are also variables like `ITEMNAME` (item names) and `TRAINNAME` (command names), but these are only referenced in ERB and never assigned, so you don't need to memorize them at first.

---

## CFLAG, Character Variables, and Usable Variables in Dialogue

`CFLAG` is often written as `CFLAG:XX` and looks similar to `FLAG:XX`, but it's a two-dimensional array variable called a character variable.  
Which variables are character variables is listed in the EmueraWiki variable list.

- [Constants and Variables - Provisional Specification](../Emuera/variables.md#_21)

For one-dimensional arrays like `FLAG`, `FLAG:XX` represents boxes arranged horizontally. For two-dimensional arrays like `CFLAG`, they're boxes arranged vertically as well.  
For `CFLAG:3:2`, the 3 represents the column and 2 represents the position from the front (technically counting from 0, so it's the 3rd from the front in the 4th column).  
When `CFLAG:2` is used, it's automatically complemented to `CFLAG:TARGET:2` for processing.  
This is a helpful specification for era, where processing the target (TARGET) is frequent.

Among these, character variables have the 3 in `CFLAG:3:2` representing the character.  
So it becomes "the 2nd status of the 3rd character."  
Of course, modifying `CFLAG:3:XX` doesn't affect `CFLAG:1:XX` (the 1st character's status).  
This allows creating unique events in dialogue without affecting other characters.

However, `CFLAG` can only be used in dialogue for variants that explicitly state "you can freely use CFLAG 1000-1999 in dialogue," like eraTW.  
For variants without such explicit statements, arbitrarily changing CFLAG in dialogue may cause issues with the main game's operation. Be careful.

Next, I'll explain from both the dialogue author's and variant author's perspectives about "I don't have CFLAG to use in dialogue!" and "My variant uses CFLAG, so I can't have it used in dialogue!"

The solution is "Variable Definition" and "ERH Files."

- [User-Defined Variables](../Emuera/user_defined_variables.md)
- [Header Files (ERH)](../Emuera/ERH.md)

For creating one-time events in dialogue that are self-contained and don't need to be saved, using `DIM` to define variables under the function name is convenient.  
For example, creating a variable named `CHRISTMAS` when branching based on "it's Christmas today."

``` { #language-erb title="ERB" }
@XXXX;Dialogue function
#DIM DYNAMIC CHRISTMAS
```

For "one function isn't enough, I want to create larger-scale events spanning multiple functions," you use ERH files.  
These allow creating variables that can be used in any function and are saved.  
For example, you can record "how many times a specific command was executed" and use that to create branches like "So you like this kind of command, don't you?"

Here's an example of defining a variable for character number 3's dialogue in an ERH file:

``` { #language-erb title="ERB" }
#DIM SAVEDATA KOJOFLAG3, 10
```

This example defines a saved variable named `KOJOFLAG3` that can be used from 0 to 9.  
Defining variables is complete by adding this one line to an ERH file.  
Some variants have dialogue flags prepared in advance, but if not, preparing them yourself is a useful technique for creating dialogue.

Variant authors who want to prepare flags for dialogue also use ERH. They just need to define character variables that can be freely used in dialogue.  
For example, eratohoReverse has a variable called `KFLAG` for dialogue.  
By creating a file with:

``` { #language-erb title="ERB" }
#DIM SAVEDATA CHARADATA KOJOFLAG, 100
```

And writing something like "KOJOFLAG 0-99 can be freely used in dialogue" in the readme, the issue is resolved.  
Since this creates a character variable, it can be used without conflict unless there are multiple dialogues for a single character.

Note that when creating character variables using `CHARADATA`, you must include `SAVEDATA` together, otherwise it becomes a character variable that isn't saved. Most dialogue should use saved variables.

---

## IF~ENDIF, SELECTCASE~ENDSELECT, and Indentation

When creating branches in era, the first thing to learn is probably `IF` and `ENDIF`.  
These must always be used in pairs or errors will occur. The same applies to `SELECTCASE~ENDSELECT`.  
If you use one `IF`, you need one `ENDIF`. If you use 5 `IF`s, you need 5 `ENDIF`s.  
"Counting how many I used while writing source code is annoying!" That's a valid point. That's where indentation comes in.

Most editors will insert about 4 spaces when you press the Tab key.  
These have no effect on the source code's execution.  
But by aligning each pair of `IF` and `ENDIF` with indentation, it becomes clear and easy to follow.

`SELECTCASE~ENDSELECT` is used as frequently as `IF~ENDIF`, and uses the three-part structure `SELECTCASE~CASE~ENDSELECT`.  
Let's see how `IF` and `SELECTCASE` indentation actually looks. This example uses `FLAG:0`:

``` { #language-erb title="ERB" }
IF FLAG:0 == 0
    PRINTW FLAG:0's content is 0
ELSEIF FLAG:0 == 1
    PRINTW FLAG:0's content is 1
ELSE
    PRINTW FLAG:0's content is neither 0 nor 1
ENDIF

SELECTCASE FLAG:0
    CASE 0
        PRINTW FLAG:0's content is 0
    CASE 1
        PRINTW FLAG:0's content is 1
    CASEELSE
        PRINTW FLAG:0's content is neither 0 nor 1
ENDSELECT
```

As you can see, the indentation differs slightly between `IF` and `SELECTCASE`.  
This subtle difference can be quite difficult for beginners.  
So if you're "not using a dialogue template" or "adding your own branches even if using one," starting with `IF~ENDIF` for everything helps avoid confusion. This applies to dialogue and variant sides alike.

Fundamentally, anything that can be done with `SELECTCASE` can also be done with `IF`, so there's no need to force yourself to use `SELECTCASE` when you're not used to it.  
Using indentation and using `SELECTCASE` are both "to make source code more readable," and trying to make it look good from the start is difficult for beginners. You'll learn through dealing with errors.

When writing code, don't write line by line from the start. Instead, write the structure (functions, branches) first.  
Before writing the content like `PRINTW`, writing `IF`, `ELSEIF`, and `ENDIF` first prevents forgetting to close them.

Reference material for `IF` and `SELECTCASE`:

- [System Modification Q&A - IF/ELSEIF blocks can be converted to SELECTCASE](erawiki-modification-QandA.md#ifelseifselectcase)

---

## Functions and CALL

In ERB files, there are lines starting with "@" like `@XXX`.

The official "About Functions" from eramaker is easy to understand:

- [eramaker era basic format](../eramaker/ERB_format.md#_4)

>Writing a program from start to finish continuously makes it hard to understand.  
>"Functions" are used to divide parts into pieces and make it clearer.

You can create functions anywhere in an ERB file. When Emuera starts, it reads all ERB files in the directory, so the folder structure doesn't matter.  
Most variants now have clear folder divisions. As shown, ERB files in subfolders are also read.  
Functions are actually used when called with `CALL`. The function at game start is `@SYSTEM_TITLE`, and the game expands from there.  
File names don't matter at all; ERB files are read by function units.  
Think of ERB files as being similar to folders, with functions inside them—it's easier to understand that way.

And the command that calls that function is the `CALL` command.

``` { #language-erb title="ERB" }
PRINTFORMW This is dialogue
```

This writes "This is dialogue" to "display on screen," using the `PRINT` command.

``` { #language-erb title="ERB" }
CALL KANSUU

@KANSUU
PRINTFORMW The function was called
```

This is a process that "calls" the function `@KANSUU`, then "displays" the text "The function was called."

As you can see, actions like "display on screen" and "call" are called "commands."  
Since both `PRINTFORMW` and `CALL` are commands, they work based on what code follows them.  
This concept of commands is important. Once you understand this, you'll realize that the `IF~~` and `SELECTCASE~~` explained above were also commands.  
Three important concepts for making era: variables, functions, and commands. Understanding these greatly increases what you can do.

Next, I'll explain how to create functions.  
"CALLing functions to navigate seems convenient!" "By the way, how do you create functions? Is it difficult?" No, not difficult at all.

Simply write `@~~` in an ERB file and the function is created. That's really all there is to it.

From the example above:

``` { #language-erb title="ERB" }
@KANSUU
```

This single line creates a function. It's not difficult at all—give it a name that doesn't conflict with other functions, and you're a master once you call it with `CALL`.  
As mentioned, functions are equivalent to files in a folder. Be careful not to insert a function in the middle of another function—it's incorrect syntax.  
Make sure a function with `@~~` has finished before creating the next one.  
Of course, if you're "nervous about editing other people's ERB files!" you can create your own ERB file and put functions there.

This explains the concept and creation of functions. You can now practice `CALL` in earnest, but let me mention a few notes.  
One is that "after another function is called using `CALL`, it returns to where `CALL` was invoked."

``` { #language-erb title="ERB" }
PRINTFORMW Left home and arrived at Haneda Airport
CALL USA
PRINTFORMW Returned home from Haneda Airport

@USA
PRINTFORMW Took an international flight to America and came back
```

Think of the execution flow as a traveler doing this.

Another note is that you can use Japanese for function names.  
However, this is a matter of preference—"this might be easier to read"—so there's no need to force yourself to use Japanese.

``` { #language-erb title="ERB" }
CALL 関数

@関数
PRINTFORMW The function was called
```

This is just the previous example with `@KANSUU` replaced with Japanese. It works the same way.

Finally, although I specifically explained `CALL` in this guide, there are other commands that call functions: `JUMP`, `CALLFORM`, `TRYCCALLFORM`, and others. You don't need to memorize them at first—when you think "I want to make this kind of processing," you can look them up.

---

## Variables, Assignment, and Operations

Note: If "operation" is unfamiliar, you can think of it as "calculation" — the interpretation is the same.

I explained variable types. Now I'll explain various methods to change the contents of these variables.  
First, note that only numbers can be assigned to numeric variables, and only text can be assigned to string variables.  
Both numeric and string types use `=` for assignment, which is putting a specific value into a variable.

``` { #language-erb title="ERB" }
@TEST
#DIM INT

INT = 123
STR = ABC

PRINTFORMW {INT} %STR%
```

The usage of `#DIM` is as explained in this page. When `@TEST` function is called, it should display "123 ABC".  
This is because 123 is assigned to variable `INT`, and ABC is assigned to variable `STR`. Changing the assigned values changes what's displayed.

Here's another thing to explain: how to display variable contents with `PRINTFORMW`.  
Numeric variables are wrapped in `{}`, and string variables are wrapped in `%%` to display their contents.  
When displaying days or money:

``` { #language-erb title="ERB" }
PRINTFORML Master:%CALLNAME:MASTER% Day {DAY} Money:{MONEY} yen
```

This displays the required information. `PRINTFORML` is for when you don't want to wait for input.

You can also use operators when assigning values like the `123` or `ABC` above.  
Operators are calculation symbols from arithmetic: `+`, `-`, multiplication `*`, division `/`, etc.

``` { #language-erb title="ERB" }
@TEST
#DIM INT
#DIM PLUS

PLUS = 45
INT = 123+PLUS

PRINTFORMW {INT}
```

This example displays 168—the result of 123+45.

``` { #language-erb title="ERB" }
@TEST
#DIM INT
#DIM PLUS

PLUS = 45
INT = 123

PRINTFORMW {INT+PLUS}
```

This also works and displays 168. Processing is done from top to bottom, so it's important to assign to the `PLUS` variable first.

The basics are the four operators I mentioned: `+`, `-`, `*`, `/`. They're simple but you'll use them constantly in era development, so master them.  
Other operators will be explained in the next section.

---

## Comparison Operators and true/false

Programming has long had the concept of `true` and `false`. This is the `boolean` mentioned in the "Variable Types" section.  
Although variables can hold `true` or `false`, as mentioned, erabasic only has int and string types.  
In Emuera, numeric variables with value 0 are treated as `false`, and all other values are treated as `true`.

With that understanding, let me explain comparison operators.  
They're mainly used with `IF`. The following is a common example found everywhere in era:

``` { #language-erb title="ERB" }
IF CFLAG:0 >= 1
  PRINTFORMW CFLAG:TARGET:0 is 1 or greater
ELSE
  PRINTFORMW CFLAG:TARGET:0 is 0 or less
ENDIF
```

Comparison operators are used with a variable, then an operator, then another variable or number after `IF`.  
This processes the branch to display the first message if `CFLAG:0` is 1 or greater, and the second message otherwise.  
This should be easy to imagine since the English meanings of `IF` and `ELSE` are the same.

The official "Conditionals" section from eramaker has the basics:  
[eramaker era basic format](../eramaker/ERB_format.md)

If you're still unclear about `IF`, try reading this as well:  
[Title Practice - IF](erawiki-title2.md#if)

As mentioned, when the condition after `IF` is met, the processing under `IF` executes.

The available comparison operators are:

>X < Y, when X is less than Y  
>X > Y, when Y is less than X  
>X >= Y, when X is greater than or equal to Y  
>X <= Y, when Y is greater than or equal to X  
>X == Y, when X and Y are equal  
>X != Y, when X and Y are not equal

Be careful because `>` and `>=` are different—they give different results when both values are the same.  
`==` is completely different from the assignment operator I mentioned earlier.  
These six comparison operators compare two values, so by principle, only one should be used per condition expression. Operators that don't compare can be used together.

``` { #language-erb title="ERB" }
IF X+Y >= 10
  PRINTFORMW {X}+{Y} is 10 or greater
ELSE
  PRINTFORMW {X}+{Y} is less than 10
ENDIF
```

As shown, operators from the previous section can be used separately from comparison operators.

Multiple conditions can also be set in one `IF`. For this, different operators like `&&` and `||` appear. These will be explained in the next section.

"Some may be wondering: what were `true` and `false` at the beginning about?"  
When the condition after `IF` is satisfied, it's `true` (1); when not satisfied, it's `false` (0).  
So in extreme terms:

``` { #language-erb title="ERB" }
IF 1
  PRINTFORMW It's true
ELSE
  PRINTFORMW It's false
ENDIF
```

This is how it works. Since `1` is `true` and always satisfies the `IF` condition, the "It's false" under `ELSE` will never display.  
Same applies when using `0` (false) as the condition:

``` { #language-erb title="ERB" }
IF 0
  PRINTFORMW It's false
ELSE
  PRINTFORMW It's true
ENDIF
```

As mentioned at the beginning, only `0` is `false`—everything else (even negative values) is treated as `true`. So when "I'm using `IF` but there's no comparison operator!" this mechanism is being used:

``` { #language-erb title="ERB" }
IF MONEY
  PRINTFORMW Has money. Money is {MONEY} yen
ELSE
  PRINTFORMW Money is 0 yen
ENDIF
```

This isn't commonly used with variables like `MONEY` that have large values, but this is what it means when comparison operators are omitted. It's convenient for simple branches like checking if a flag is set.

---

## How to Specify Multiple Conditions in One IF Branch

I mentioned that comparison operators are limited to one per condition expression, and arithmetic operators like `+` or `-` have no limit.  
Now I'll explain something different: logical operators.

There are basically three:

|Operator|Explanation|
|:-|:-|
| Condition1 `&&` Condition2 | Executes branch when both Condition1 and 2 are satisfied (true)|
| Condition1 `\|\|` Condition2 | Executes branch when either Condition1 or 2 is satisfied|
|`!`Condition | Returns false when condition is satisfied, true when not satisfied|

These increase the number of condition expressions directly, so the rule "comparison operators are limited to one per condition expression" applies to both Condition1 and Condition2.  
Using `&&` and `||` operators, you can increase condition expressions as much as you want.

``` { #language-erb title="ERB" }
IF CFLAG:0 == 0 && FLAG:0 == 0 && STR:0 == ""
  PRINTFORMW Nothing is assigned to CFLAG:0, FLAG:0, or STR:0
ENDIF
```

This uses `&&` (AND, logical conjunction). The branch executes when all conditions are satisfied.  
You can set 3 or more condition expressions together, and mix numeric and string type conditions.

``` { #language-erb title="ERB" }
IF CFLAG:0 != 0 || FLAG:0 != 0 || STR:0 != ""
  PRINTFORMW Something is assigned to CFLAG:0, FLAG:0, or STR:0
ENDIF
```

This uses `||` (OR, logical disjunction). The branch executes when any condition is satisfied.

As you can see, `&&` has stricter conditions, so `||` is easier to pass the branch.  
Conversely, this can also lead to code executing unintended branches.  
For example:

``` { #language-erb title="ERB" }
IF (CFLAG:0 == 0 || (FLAG:0 == 0 && STR:0 == "") || TEQUIP:0 == 0) && (CSTR:0 == "" || TFLAG:0 == 0)
  PRINTFORMW ???
ENDIF
```

At this point, it becomes very difficult for both the writer and reader to understand what processing is being executed.

You can use both `&&` and `||` in one `IF` branch. However, overuse severely reduces readability, so it's not recommended.  
Especially for beginners, adding too much information makes it impossible to identify even where the mistake is. Try keeping condition expressions to around 3 as an upper limit.  
For an example mixing `&&` and `||` with 3 condition expressions:

``` { #language-erb title="ERB" }
IF (CFLAG:0 == 0 || FLAG:0 == 0) && STR:0 == ""
  PRINTFORMW Either CFLAG:0 or FLAG:0 is 0, and STR:0 is an empty string
ENDIF
```

OR branches using `||` generally need parentheses, just like multiplication and division, to maintain calculation order.

---

## String Variable Operations

So far I've explained numeric variable operations. Now I'll explain string variable operations.  
First, the common aspect: assignment uses `=` just like numeric types.  
However, this assignment syntax has some tricky rules.

``` { #language-erb title="ERB" }
@TEST
#DIM DYNAMIC INT

INT = 1
STR = AAA
PRINTFORMW INT is {INT} STR is %STR%
```

Those who have read this far should be able to predict this result—it displays the contents of variables `INT` and `STR`.  
What about this next example?

``` { #language-erb title="ERB" }
@TEST
#DIM DYNAMIC INT, 2

INT:0 = 1
INT:1 = INT:0

STR:0 = AAA
STR:1 = STR:0

PRINTFORMW INT:1 is {INT:1} STR:1 is %STR:1%
```

This also reviews "arrays." `INT:0` and `INT:1` are different variables, so different values can be stored, and the contents of `INT:0` can be copied (assigned) to `INT:1`.  
"You might think the result is the same as before," but it's different.

Since `INT` is a numeric variable, `INT:0` is automatically interpreted as a variable, so 1 is also stored in `INT:1`.  
However, string type assignments don't interpret it as a variable, so the content of `STR:1` becomes the string "STR:0" rather than "AAA".

There are a few notations you can use when you "want to reference the variable's contents."  
First, use `%%` to wrap it, just like with `PRINTFORMW`:

``` { #language-erb title="ERB" }
STR:1 = STR:0
;↓
STR:1 = %STR:0%
```

With this change, `STR:0` is interpreted as a variable, and "AAA" is assigned to `STR:1`.  
This assignment works even with mixed variables and non-variables. Same for numeric types.

``` { #language-erb title="ERB" }
@TEST
#DIM DYNAMIC INT, 2

INT:0 = 1
INT:1 = INT:0+3

STR:0 = AAA
STR:1 = BBB%STR:0%CCC

PRINTFORMW INT:1 is {INT:1} STR:1 is %STR:1%
```

When written this way, `INT:1` gets "4" (1+3), and `STR:1` gets "BBBAAACCC".

There's another method for string type assignment: using `'=`.

``` { #language-erb title="ERB" }
STR:0 = AAA
STR:1 '= STR:0

PRINTFORMW STR:1 is %STR:1%
```

With this notation, it interprets it as a variable without needing %%, so `STR:1` contains "AAA".

Honestly, having two similar but different notations is confusing. Pick one to use from the start and temporarily forget the other.  
Someone might ask: "How do I write something like 'BBBAAACCC' using '`=`?" In that case:

``` { #language-erb title="ERB" }
STR:0 = AAA
STR:1 '= @"BBB%STR:0%CCC"

PRINTFORMW STR:1 is %STR:1%
```

Write this. Text wrapped with `@"~~"` is processed the same as `PRINTFORM`.  
The @ symbol tells era in advance "I'm about to use a variable!" So forgetting the @:

``` { #language-erb title="ERB" }
STR:0 = AAA
STR:1 '= "BBB%STR:0%CCC"

PRINTFORMW STR:1 is %STR:1%
```

Results in the content being "BBB%STR:0%CCC"—`STR:0` doesn't expand.

Let me jump ahead a bit to explain "Can other operators be used with string variables?"  
Some operators that work with numeric variables also work with string variables.

First, the six comparison operators can all be used.  
`==` and `!=` are easy to understand—they check if both are the same or not.

``` { #language-erb title="ERB" }
@TEST
STR = AAA

IF STR == "AAA"
  PRINTFORMW STR is AAA
ELSEIF STR != "AAA"
  PRINTFORMW STR is not AAA
ENDIF
```

When using non-variable values with comparison operators, they must be wrapped in "~~".

``` { #language-erb title="ERB" }
@TEST
STR:0 = AAA
STR:1 = AAA

IF STR:0 == STR:1
  PRINTFORMW STR:0 is %STR:1%
ELSEIF STR:0 != STR:1
  PRINTFORMW STR:0 is not %STR:1%
ENDIF
```

But when comparing variables to each other, "~~" isn't needed.

Let's see what else can be used in string operations besides comparison operators.  
The operators that can be used are `+` and `*`—addition and multiplication.

Multiplication is as written here:

- [Emuera Wiki - Operations](../Emuera/operand.md)

``` { #language-erb title="ERB" }
    STR:0 = % "あ" * 10 %
    PRINTFORML STR:0 = "%STR:0%"
    WAIT
  ;Result
  STR:0 = "ああああああああああ"
```

*Quoted from the page above*

This assigns "あ" 10 times—that is, 10 copies of "あ"—to `STR:0`.

For addition:

``` { #language-erb title="ERB" }
STR:0 = AAA
STR:1 = BBB
STR:2 = %STR:0+STR:1%

PRINTFORMW STR:2 is %STR:2%
```

This combines `STR:0` and `STR:1` into "AAABBB".  
Those who read this section might think:

``` { #language-erb title="ERB" }
STR:2 = %STR:0%%STR:1%
```

Wouldn't that work? Exactly—both give the same result.

So when is the addition operator useful? It's when appending to existing string variables.

``` { #language-erb title="ERB" }
STR = AAA
STR += "BBB"
STR += "CCC"

PRINTFORMW STR is %STR%
```

This has AAA assigned to `STR`, then BBB and CCC are added using the addition operator, resulting in "AAABBBCCC" as one text.  
Note that appending requires wrapping in "~~".  
You could just assign "AAABBBCCC" from the start—also correct.

But what if it changes based on conditions using `IF`?

``` { #language-erb title="ERB" }
STR = Today is

IF RAND:2
  STR += "curry"
ELSE
  STR += "omurice"
ENDIF

STR += "is what I want to eat"

PRINTFORMW %STR%
```

This can be used when you want to change string variable contents under conditions.  
Dialogue and narration can be done with combinations of `PRINT` commands, but the string variable addition operator is required to use more advanced commands like `HTML_PRINT`.

This section explained string variable operations. Since the presence or absence of "~~" changes depending on the operator used, either work hard to memorize it or try to keep your notation consistent.

---

## Types of PRINT Commands

Era is a text game, so `PRINT` commands for displaying text are the core of the game.  
In extreme terms, you can get by with just `PRINTFORML` and `PRINTFORMW`, but let's see what else exists and what they can do.

Reference links:

- [Title Practice - PRINTFORML?](erawiki-title2.md#printforml)
- [Reference - PRINT commands](../Reference/PRINT.md)

`PRINT(L|W)` and `PRINTFORM(L|W)` are the most common `PRINT` commands nowadays.  
`PRINT(L|W)` displays the specified text as-is, while `PRINTFORM(L|W)` expands variables and expression functions to display.  
Adding `L` adds a newline, adding `W` adds a newline and wait (input wait), and having neither doesn't add a newline.

``` { #language-erb title="ERB" }
PRINTL Display with newline
PRINTW Display with newline and wait

PRINT No newline
PRINTL Continues from above line, adds newline
```

The point about whether to expand variables is the same as explained for string variable assignment.

``` { #language-erb title="ERB" }
STR = AAA

PRINTW The content of STR is %STR%
PRINTFORMW The content of STR is %STR%
```

Both look the same in code, but the latter properly displays the content of `STR`—actual display is:

```
The content of %STR% is
The content of AAA is
```

The former is equivalent to wrapping only with "~~" (double quotes), and the latter is equivalent to `@"~~"` (double quotes with @) in string variables.

"So using FORM's version that has more features is better, right?" That's not entirely wrong.  
It's fine to differentiate them, and also fine to be consistent—it depends on the person.

"When using PRINTFORM, using `%` or `{` causes them to be treated as variables and errors!" In that case, use escape characters.  
The system has certain characters for determining variables within `FORM`, and when you want to use those as literal characters, you need to teach the system "this is just text."

``` { #language-erb title="ERB" }
PRINTFORMW Displays percent \%
PRINTFORMW Displays curly brace \{
```

Use the "\" key on the keyboard, which is on the right of the forward slash.  
The yen mark `¥` on the left of BackSpace is also synonymous.  
Escape characters are used in all aspects of programming, not just era—it's not a loss to remember this.

The reference above has explanations for several PRINT commands. As categorized, each has different functions:

- `PRINTSINGLE` family  
  `PRINT` that doesn't wrap at screen edges. Used to prevent display corruption from unexpected string overflow, but if it's overflowing past the edge, the display is already broken—better to review screen size.

- `PRINT` family  
  Important for meticulous creators who want commands and choices aligned at regular intervals.  
  Automatically adds newline after displaying the number specified in config. However, text that's not buttons doesn't auto-wrap.

- `PRINTDATA` family  
  Randomly displays one line from multiple texts.  
  Makes random branching using `RAND:XX` much smarter, but can't do variable assignment, calculations, or insert other commands—use for simple one-line displays (dialogue, etc.).

- `PRINTBUTTON` family  
  In era, numbers wrapped in `[]` automatically become mouse-click-enabled buttons.  
  Like `[1]` is a button for `1`—buttons that normally only accept numbers can be made to return string types.

- `PRINTPLAIN` family  
  The button-ization above applies to entire lines. So using `PRINT` (not `L` or `W`) to display multiple lines in one line results in them being grouped together as buttons automatically.  
  Use `PRINTPLAIN` to prevent this button-ization.

Other commands with "PRINT" include `DEBUGPRINT` and `HTML_PRINT`, but these are completely different, so I'll skip them here.

---

## Debugging Methods

Era, like any program, has bugs.  
Rarely there are programs without bugs, but modern source code with increasing complexity and bloat almost certainly has them.  
The process of fixing them is called bug fixing, debugging.  
Finding bugs and fixing them—let me explain how to find bugs, starting with the easiest methods.

The first thing to do is enable Emuera's debug mode.  
Right-click on the Emuera you're using and select "Create Shortcut."

![](../assets/images/debugSS1.JPG)

In the created shortcut's properties, add " -debug" to the end of the target. A half-width space is required.

![](../assets/images/debugSS2.JPG)

Starting Emuera from this shortcut starts it in debug mode.

- [Debug Mode](../Emuera/debug.md)

The debug window in debug mode has three tabs: "Variable Watch," "Stack Trace," and "Console."  
As written on the page, you can check how variables change (what's in them), check what functions are connected via `CALL`, and even directly modify variables.  
Debug mode is essential when creating patches, not just dialogue, so prepare a shortcut that can start in debug mode.

There's another simple debugging method:  
From Help → Settings → Analysis tab, select "Enable Developer Settings."

![](../assets/images/debugSS3.JPG)

The most important is "0. Non-standard syntax."  
Even ERB files that don't show errors on the load screen can actually error when the code is reached—it's common.  
This setting reduces that by widening the error warning range, making it clearer where bugs are.  
However, this doesn't find all bugs—it only reduces bugs from 10 to about 5—so don't assume you're safe just because errors stopped appearing.  
Both debug mode and developer settings are the minimum debug features you should enable—they're always helpful to have on.

Next is the advanced level: debugging while playing.  
The most common bugs in Emuera are "syntax errors" and "unexpected variable changes."  
The former can be largely resolved with developer settings. But the latter you won't know until you run it.  
For example:

``` { #language-erb title="ERB" }
@TEST
PRINTL Please enter a number
INPUT
PRINTFORML Is {RESULT} correct?
[0] - Yes
[1] - No
INPUT
SIF RESULT == 1
	RESTART
PRINTFORMW The number you entered is {RESULT}
```

This code doesn't work well. That's because the confirmation choice overwrites the contents of `RESULT`.  
Experienced developers know "this is the cause," but this can be confusing when you're absorbed in development or are a beginner. Even with this simple example, the same phenomenon occurs in complex code—same for experts.

This code has the `RESULT` display on line 3 not working well, but what debugging methods are there to find the cause? Let me give a few examples.

First, using Variable Watch: write `RESULT` in the "Target" section of Variable Watch.

![](../assets/images/debugSS4.JPG)

Now you can always see what's in `RESULT`.  
Try running the code with this. You'll see that in the confirmation choice, `RESULT` has the entered value—after the choice, `RESULT` becomes strange.  
So the problem is in the choice section—line 7 or later in the source code.  
Thinking about this reveals "the cause is the duplicate INPUT!"

Another method: using `DEBUGPRINT` and the console.

``` { #language-erb title="ERB" }
@TEST
PRINTL Please enter a number
INPUT
DEBUGPRINTFORML At line 5, RESULT is {RESULT}
PRINTFORML Is {RESULT} correct?
[0] - Yes
[1] - No
INPUT
DEBUGPRINTFORML At line 10, RESULT is {RESULT}
SIF RESULT == 1
	RESTART
PRINTFORMW The number you entered is {RESULT}
```

`DEBUGPRINTFORML` is used at key points. Nothing changes on the Emuera screen, but `DEBUGPRINTFORML` text appears in the console of the debug window.  
This lets you check variable contents without changing the actual processing. Even if you accidentally leave this debug processing in a release, it won't be a problem.  
The code is the same as before, so the problem is in the choice section—same reasoning.

By the way, the correct way to write this code is to save the `RESULT` value to another variable first:

``` { #language-erb title="ERB" }
@TEST
#DIM DYNAMIC NUMBER
PRINTL Please enter a number
INPUT
NUMBER = RESULT
PRINTFORML Is {RESULT} correct?
[0] - Yes
[1] - No
INPUT
SIF RESULT == 1
  RESTART
PRINTFORMW The number you entered is {NUMBER}
```

This copies `RESULT` to `NUMBER` before the confirmation choice, so it displays correctly.

There's a problem with Variable Watch: you can't check variable contents except at points that wait for player input like `INPUT`, `PRINTW`, or `WAIT`.  
In those cases, using `DEBUGPRINT` to display variable contents line by line in the console makes it clearer where the bug is.  
Use them according to the source code. If you're not confident in choosing, use `DEBUGPRINT` to display main variables.

---

## Creating Random Display Dialogues

Those who understand `IF` and `SELECTCASE` are probably already using branches like `IF RAND:XX` and `SELECTCASE RAND:XX`.  
This "RAND:XX" is called a random number. It's written like a variable, but its content is always randomly changing.  
`RAND:3` randomly selects 1 from 3 candidates.  
You might think "1-3 are randomly chosen," but most programming languages count from 0, so 0-2 (3 types) are chosen.

Using random numbers gives the possibility of different results in what would otherwise be the same conditions.  
Most dialogue that shows different lines for the same command uses this random number.  
Now, let's actually write dialogue using random numbers. Example:

``` { #language-erb title="ERB" }
;Using IF
IF RAND:3 == 0
  PRINTW "I want curry today"
ELSEIF RAND:2 == 0
  PRINTW "I want omurice today"
ELSE
  PRINTW "I want pasta today"
ENDIF
```

This is the correct syntax to display each branch with equal probability. But you might notice something off.  
The first `IF` is `RAND:3`, but the second `IF` is `RAND:2`.  
"This seems wrong—surely this is the correct way to write it?"

``` { #language-erb title="ERB" }
IF RAND:3 == 0
  PRINTW "I want curry today"
ELSEIF RAND:3 == 1
  PRINTW "I want omurice today"
ELSE
  PRINTW "I want pasta today"
ENDIF
```

You want to correct it, but this doesn't give equal probability.  
Because random numbers are "always" changing—the first `IF RAND:3` and second `IF RAND:3` don't necessarily give the same result.  
While the first example had 33%:33%:33% probability, the second has 33%:22%:44%—the displayed dialogue becomes biased.  
For 3 random branches, the first branch displays at 33% (RAND:3), the remaining 2 branches mean the second displays at 50% (RAND:2), and if none, the ELSE displays—giving equal probability.

This is like a little logic quiz, and while it's useful to know, it's honestly not practical to write this in code.  
So I recommend using `SELECTCASE` for random branches.

``` { #language-erb title="ERB" }
SELECTCASE RAND:3
  CASE 0
    PRINTW "I want curry today"
  CASE 1
    PRINTW "I want omurice today"
  CASE 2
    PRINTW "I want pasta today"
ENDSELECT
```

With this, the random number is fixed at the first `SELECTCASE`, so using `CASE` to specify the candidates (0-2) that `RAND:3` returns gives equal probability.

For this random branch, there's another command besides `IF` and `SELECTCASE`.  
`PRINTDATA` is a command that selects one line equally randomly from multiple options.

``` { #language-erb title="ERB" }
PRINTDATAW
  DATA "I want curry today"
  DATA "I want omurice today"
  DATA "I want pasta today"
ENDDATA
```

This example does the same as the previous `IF` and `SELECTCASE` examples.  
When adding branches with `SELECTCASE`, you need to change `RAND:X` and add `CASE`—troublesome. But with `PRINTDATA`, you just add one line from `DATA`:

``` { #language-erb title="ERB" }
DATA "I want fried rice today"
```

That's all it takes to add candidates to the random branch.

This section explained using random numbers in dialogue, but random numbers can also add randomness to calculation processing—the usage is wide. This will be explained in a separate section for addition.

---

## Changing Text Color

You should now be able to use `PRINT` commands to display text.  
Now I'll explain how to color text to make it more vibrant, which is common in modern variants.  
The easiest way is using the command `SETCOLOR`.

- [Reference - SETCOLOR](../Reference/SETCOLOR.md)

As written there, SETCOLOR has a few syntaxes.

``` { #language-erb title="ERB" }
SETCOLOR 255, 0, 0
PRINTW This is red text
SETCOLOR 0x00FF00
PRINTW This is green text
```

There are two formats: RGB and hexadecimal.  
Emuera can write in hexadecimal by starting with "0x". Depending on the situation, hexadecimal can be easier to understand. If you don't know what hexadecimal is, I'll explain in a separate section.

For those who "can't imagine colors from numbers," there's also `SETCOLORBYNAME`:

- [Reference - SETCOLORBYNAME](../Reference/SETCOLORBYNAME.md)

Usage is as follows:

``` { #language-erb title="ERB" }
SETCOLORBYNAME blue
PRINTW This is blue text
SETCOLORBYNAME yellow
PRINTW This is yellow text
```

The colors available here are only those defined in C# that Emuera uses.

- [KnownColor Enumeration (System.Drawing) - Microsoft Docs](https://docs.microsoft.com/ja-jp/dotnet/api/system.drawing.knowncolor?redirectedfrom=MSDN&view=net-5.0)

Honestly, the Microsoft page is hard to understand, so looking here is easier:

- [WEB Color Palette - HTML Color Codes](https://www.colordic.org/)

Colors like `cyan`, `lime`, `purple` written by name make it easier to imagine "this SETCOLOR becomes this color"—I recommend it.  
However, only defined colors can be specified—if you use custom color names or misspellings, it causes an error.  
You can use `COLOR_FROMNAME` (an expression function) to check if a color name exists, so check once if you're unsure.

``` { #language-erb title="ERB" }
SIF COLOR_FROMNAME("yelow") == -1
  PRINTW Typo
```

These can be used in dialogue and are useful for emphasizing specific lines.  
However, remember that once `SETCOLOR` is used, `PRINT` continues in that color until `RESETCOLOR`.  
Using `SETCOLOR` in dialogue to indicate "this character has this image color" is a good idea, but forgetting `RESETCOLOR` ruins the game's entire appearance—so like `IF~ENDIF`, use `SETCOLOR` and `RESETCOLOR` as a pair.

You can also change fonts, not just colors.

- [Reference - FONTBOLD/FONTITALIC/FONTREGULAR](../Reference/FONT_OPERATION.md)

`FONTBOLD` is bold, `FONTITALIC` is italic, and `FONTSTYLE` with 4 is strikethrough, 8 is underline.  
`FONTSTYLE` uses bit numbers, so if you don't understand that, it's best not to touch it for now.  
Remember to use `FONTBOLD` and `FONTITALIC` the same way as `SETCOLOR`, and use `FONTREGULAR` the same way as `RESETCOLOR`.  
Forgetting `FONTREGULAR` also causes display issues—don't forget.

---

## About Bit Numbers

To handle `FONTSTYLE` above, you must understand bit numbers.  
First, imagine a row of switches in a home breaker box that toggle on and off.

![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/off.png)

Four OFF switches. In decimal, this is 0. In binary, it's 0000.  
Bit numbers are applications of binary, so I'll explain them together.

![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/on.png)

Only the first digit is ON. This is 0001 in binary, which is 1 in decimal.

![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/on.png)![](../assets/images/off.png)

This is the example of 0010 in binary, which is 2 in decimal.  
Like this, you can convert patterns of each switch's on/off to binary—0110, 1100, etc.  
Now, what is binary, why can't we use decimal, and why do we use binary for bit operations?

Binary, as above, is a counting method composed only of 0 and 1—each switch's on/off.  
Since there are 4 switches, there are 2^4 = 16 patterns.  
This is called a 4-bit number. Usable numbers are 0-15. Adding 1 to 15 (1111) causes overflow (insufficient switches causing a loop) and returns to 0 (0000).  

To turn the first digit on to get 1, then express 2, turn the second digit on and turn the first off. To get 3, turn the first digit on again. This is the same as in decimal when reaching 10 and the ones place becomes 0.

Here's the example of 3 (0011):  
![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/on.png)![](../assets/images/on.png)

Similarly, to make it 4, raise the third digit and turn the first and second off (0100):  

![](../assets/images/off.png)![](../assets/images/on.png)![](../assets/images/off.png)![](../assets/images/off.png)

Since 2 switches (first and second digit) could handle 4 numbers 0-3, when the third digit is ON, the first and second digit's on/off alone adds +4, meaning it can handle 0-7.  
Similarly, 8 (1000):

![](../assets/images/on.png)![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/off.png)

Like with 4, the lower 3 digits can handle numbers 0-7, so adding 8 allows 0-15.  
If you can understand this, you should know how to solve the overflow problem for 16 and beyond.  
The answer is simple—just add more switches.

![](../assets/images/on.png)![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/off.png)

This handles 16 (10000). Adding 16 to the lower 4 digits' 0-15 gives 0-31—now handling double the numbers.  
As you can see, even with binary of only 1 and 0, huge numbers can be expressed by increasing digits.  
Now I'll explain why bit numbers are used in programs.

The numeric variable usage explained so far is based on decimal—put 3 in variable 1, 5 in variable 2, add variables 1 and 2 to get 8.  
Let's reverse this thinking entirely and think in binary. As explained, since binary counting has numbers corresponding to decimal, they can be put directly into numeric variables.

In era, many variants use bit numbers for the "stain" system. Why is that?  
It's to hold multiple pieces of information (semen stain, vaginal fluid stain) in one body part.  
I'll simplify and explain with 3 types of stains: semen, vaginal fluid, and anal.

![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/off.png)

From right to left are switches for semen, vaginal fluid, and anal stains.  
First, say it's stained with semen. This state is 001 (1 in decimal).

![](../assets/images/off.png)![](../assets/images/off.png]![](../assets/images/on.png)

Next, anal stain is added. This state is 101 (5 in decimal).

![](../assets/images/on.png)![](../assets/images/off.png)![](../assets/images/on.png)

Finally, all stains are added. This state is 111 (7 in decimal).

![](../assets/images/on.png)![](../assets/images/on.png)![](../assets/images/on.png)

This stain state is mainly stored in STAIN flags in decimal.  
With just 0-7 that 3 bits can handle, multiple information—each stain's presence or absence—is stored.  
For example, 010 (3 in decimal) means only vaginal fluid is present. By adding using bit operations, you can add semen and anal stain information. Each number 0-7 has a pattern assigned.  
If you want to hold other stain information, think of it as adding switches for those.

*You can do the same with decimal by assigning information to each digit—like choosing 14072358 (14,7,23,58) in a certain lottery. But this is a side note, so forget it for now.*

This bit number is simply used to determine each information's on/off and `true`/`false`.  
If you can understand this, you'll understand the `FONTSTYLE` explanation I mentioned first.  
From the `FONTSTYLE` command explanation:

``` { #language-erb title="ERB" }
0 is normal, 1 is bold, 2 is italic, 4 is strikethrough, 8 is underline.
```

This uses 4-bit numbers because you can combine the 4 font changes.  
![](../assets/images/off.png]![](../assets/images/off.png]![](../assets/images/off.png]![](../assets/images/off.png)

Following binary syntax, from right to left are bold switch, italic switch, strikethrough switch, and underline switch.  
Turning each switch on as needed allows combining those font changes.  
To italicize and strikethrough, it's 0110 (6 in decimal)—so `FONTSTYLE 6` is correct.  
Those used to decimal might be confused by binary, but since it's a crucial concept in computing, even if you don't fully understand it, remember that this is how it's used.

I explained the minimum understanding needed for patterns where using bit numbers is convenient and customary, like in stains or using bit numbers in commands. In the next section, I'll explain commands like `SETBIT` and `GETBIT` that simplify bit number processing.

---

## Commands and Expression Functions for Bit Operations

There are 4 main types: `SETBIT`, `CLEARBIT`, `INVERTBIT`, and `GETBIT`.

- [Reference - Bit Operations](../Reference/BIT_OPERATION.md)

In the above bit numbers, to turn only the third switch from the right ON, you assign 4 to the variable—0100 in binary.  
However, when assigning, all bit number records are initialized.  
So when you want to turn the third switch from the right ON in a state already being used, you must add 4 instead of assigning.  
But if the third switch is already ON, this causes duplicate switches turning ON, making the bit number chaotic.  
That's what `SETBIT` command solves.

``` { #language-erb title="ERB" }
;Turn bit 0 ON
INT += 1
;Turn bit 2 ON
INT += 4

;Want to turn bit 1 ON but don't know ON/OFF state
SETBIT INT, 1
```

This is used when you don't know the ON/OFF state of the second position from right (1 counting from 0) and want to definitively turn it ON.  
Adding 2 is fine, but as mentioned, if it's already ON, it becomes 9 (1001 in binary).  
`SETBIT` checks if that bit is already ON and automatically adds for you.  
Of course, if it's already ON, there's no change to variable `INT`.

`CLEARBIT`, as the name suggests, is a command to clear the specified bit.

``` { #language-erb title="ERB" }
;Set bits 0,1,2 (0111=7)
INT = 7

;Turn bit 0 OFF
INT -= 1

;Turn bit 2 OFF
INT -= 4

;Turn bit 1 OFF—let's try using CLEARBIT
CLEARBIT INT, 1
```

In the final `CLEARBIT`, bit 2 (which is 2) is turned OFF, so 2 is subtracted and `INT` becomes 0.  
This is also used when you want to definitively turn it OFF without knowing ON/OFF state. If already OFF, there's no change.

`INVERTBIT` is a command to toggle this—using the switch analogy makes it clear.

![](../assets/images/off.png]![](../assets/images/off.png]![](../assets/images/off.png]

From right to right are bits 0, 1, 2—specifying `INVERTBIT INT, 0~2` toggles their ON/OFF.  
This command never has a "nothing happens" case—it always definitively adds or subtracts by the specified bit count.

Finally, `GETBIT`. This is not a command but an expression function.

``` { #language-erb title="ERB" }
;Turn bits 0 and 2 ON (0101=5)
INT = 5

IF GETBIT(INT, 0)
  PRINTW Bit 0 is ON
ELSE
  PRINTW Bit 0 is OFF
ENDIF

IF GETBIT(INT, 1)
  PRINTW Bit 1 is ON
ELSE
  PRINTW Bit 1 is OFF
ENDIF

IF GETBIT(INT, 2)
  PRINTW Bit 2 is ON
ELSE
  PRINTW Bit 2 is OFF
ENDIF
```

As set from the start, bits 0 and 2 are ON, so results are: 0=ON, 1=OFF, 2=ON.  
Using this as reference, try incorporating `SETBIT`, `CLEARBIT`, and `INVERTBIT` into the examples above—it's interesting.  
Applying this, in era, to perform stain (`BIT`) SET, CLEAR, and GET. Inversion (`INVERT`) isn't used much, but bit operations are used in other situations, so it's not a loss to remember.

*Infinite Loop Tip*  
There's a command called `AWAIT` implemented in Emuera Ver1.823.  
Sometimes when creating processes with too many loop iterations, Emuera displays a dialog box saying "This looks like an infinite loop..."

![](../assets/images/inifinite_loopSS.JPG)

Most of the time this appears, an actual infinite loop is occurring, but depending on PC specs, heavy processing is treated as infinite loops.  
Inserting the `AWAIT` command in loop processing prevents this malfunction.

- [Reference - AWAIT](../Reference/AWAIT.md)

As EmueraWiki states, frequent `AWAIT` noticeably slows processing, so for example, inserting `AWAIT` every 100 loops or inserting `AWAIT` every 10% of the total achieves light processing while using `AWAIT`.

---

## Character Encoding

While nowadays with HTML evolution and character encoding standardization, we see it less, everyone has probably experienced character corruption at least once.  
The cause is character encoding.  
As the famous saying "programs are made of 0 and 1" goes, the text you're reading right now through computers and smartphones is ultimately made of combinations of 0 and 1.  
Character encoding is used to convert those 0 and 1 combinations into characters.

The main character codes used in Japan are Shift-JIS and Unicode (including UTF series).  
The former, Shift-JIS (also abbreviated as SJIS), was originally created with the background of being good at handling Japanese.  
However, with IT普及, Unicode has spread to handle country-specific characters and symbols that SJIS couldn't support.

So why does character corruption occur from differences in these character codes? It's because the conversion tables differ.  
As mentioned, programs themselves are made of 0 and 1, but for example, the same 10101011 has different corresponding characters depending on character code.  
Opening something written in SJIS as Unicode causes corruption—and vice versa.

This can also happen in era, but thankfully Emuera is a high-tech specification that works even with mixed SJIS and Unicode files.  
However, there are various character codes besides SJIS and Unicode, and there's no guarantee they'll all work when mixed randomly.  
It's desirable to keep file character codes consistent as much as possible—use free conversion software.  
As mentioned, Unicode systems are strong with symbol handling—if you want to write text using special characters, use Unicode character codes.

---

*More sections will be added in the future.*
