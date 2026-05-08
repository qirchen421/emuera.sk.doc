# Emuera-etc.en
---
# Supplementary Notes on Emuera

Source page
[eratoho Summary V3: Supplementary Notes on Emuera](https://seesaawiki.jp/eratoho/d/Emuera%a4%cb%a4%c4%a4%a4%a4%c6%a4%ce%ca%e4%c2%ad)

---

<!--Comments disabled since contact via this route is questionable
## Purpose of This Page
This page is for `妊）|дﾟ)` to provide various supplementary information about Emuera.
(If there's anything you'd like added, feel free to drop by IRC)
Latest version and official wiki are [[here>http://sourceforge.jp/projects/emuera/]])
-->

## Emuera Tutorial for Developers
Emuera is not just a runtime environment but also a very useful syntax checker with many beneficial features for developers.
However, looking at the recent situation, it seems that this convenient feature isn't being utilized well.
So let me summarize the developer-oriented usage of Emuera.

---

### 1. Don't Use Default Settings
Emuera's default settings are oriented toward players only,
and features like syntax checking won't be fully utilized. However, it's easy to mistakenly think that "no errors with default settings = no problems."
In reality, important parts of syntax checking are skipped in default settings, so there are quite a few basic syntax errors that get overlooked.
(Even Lv2 warnings can easily be missed)
Therefore, for developers, the following settings are recommended:

- Analysis Tab

`Show report on load`: Checked
`Check arguments on load`: `Always` or `When updated` (the former is recommended, but depends on preference)
`Minimum warning level to display`: `0` (not an error, but it's best to have no basic syntax mistakes either)
<u>CALLFORM-related calls are not important in code that uses many recent CALLFORM variants, so this is optional</u>

- Environment Tab

`Associated text editor`: Path to your regular text editor
`Command line arguments`: Command line arguments to open the file at a specific line in your editor (refer to your software's help)
<u>Now when an error occurs, clicking on the line where the error happened will automatically open that location in your editor</u>

---

### 2. Analysis Mode Option
Emuera has a special startup mode called Analysis mode.
This is launched by dragging an ERB file or folder onto `Emuera.exe`,
and it automatically performs checks using the developer-oriented settings mentioned above and outputs results to `Analysis.log`.
When run on a variant, it also considers CSV data, making it a sufficient tool for basic syntax checking.
While the faster option is preferred for regular use, this mode is recommended for those who want thorough syntax checking during development.
<u>Note: Analysis mode also outputs a list of function names for each ERB file, which regular startup doesn't provide</u>

---

### 3. Recent Enhancements to Syntax Interpretation
Since 1807v5, Emuera's syntax checking and developer-oriented features have been enhanced.

- A. Function Call Stack

In runtime errors, it now displays how functions were called - from the current function's line, to the caller's line, to the caller's function's caller, and so on.
This is useful for identifying where problems occur, such as errors in generic expression functions.

- B. Added Array Out-of-Bounds Check in Startup Variable Check

Added a check at startup for variables with literal arguments to verify if indices are within bounds.
This reports out-of-bounds errors for constants at startup.

- C. `THROW` that Throws an Error

The [`THROW`](../Reference/THROW.en.md) command forces an error when that line is reached.
It has various uses, such as confirming specific conditions during debugging.

By using Emuera effectively as described above, you can almost eliminate uploading code with simple syntax errors remaining.
Please use it properly, regardless of whether you're a variant creator, dialogue creator, or patch creator.

---

### 4. How to Use `_fixed.config`
First, when you want to set runtime environment settings on the variant side, you must not use `emuera.config`.
This is because `emuera.config` is for users to define their own environment,
and it's expected to be overwritten by users.
(User side is expected to copy/paste from other variants, etc.)

So, what do you do when you want to fix settings on the variant side? This is where `_fixed.config` in the CSV folder comes in.
Settings specified in `_fixed.config` cannot be overwritten by users and always take priority.
This is very effective for settings that can be considered design-level, such as rendering methods and save data formats.

There's a similar file called `_default.config`, which specifies default values when there's no user setting,
but in practice it rarely sees use.

---

## Q&A

### Q: Why does Emuera take so long to start?
A: Emuera reads all code at startup and checks the correspondence of `IF～ENDIF`, `CALL`, etc. That's why it takes time to start.
However, this makes actual script processing faster than eramaker.
(You can't really feel it because rendering is the bottleneck)
It also allows error checking at startup.
This is a complete tradeoff between startup speed and post-startup processing speed.
**String parsing processing improvements since 1.735 have significantly reduced startup time**

### Q: Emuera rendering is too slow
A: Actually, C# is not a language particularly good at graphics rendering. So this is somewhat by specification.
Using OpenGL or DirectX instead of current GDI/GDI+ might make it faster, but the author doesn't have the bandwidth to go that far.
If anyone has the courage to try, feel free to give it a shot.

Workaround:
In most cases, default settings should provide acceptable speed, but RadeonHD has slow GDI rendering due to PowerPlay specifications, so using GDI+ with Graphics + image buffer settings makes it faster with less flickering.
(There's also a method to fix clock in CCC for HD4XX0 series, but not recommended for beginners)
Lowering FPS settings is also effective on older machines.

<!--
#### Q: Implement ○○!
A: Graphics display, sound reproduction, things that increase rendering: How about some bubuzuke (no)?
  Others: If compatibility with eramaker can't be maintained → Unfortunately rejected
          Other cases → Will answer after judging if it's feasible

#### Q: `PRINTC` with `BOLD` FONT specification shifts...
A: I'm very sorry, but it's a specification. To fix it, we'd need to rebuild from the ground up, which is quite difficult.
(1/15 supplement: After discussion with Emu), if Emu) has time, they'll work on this section)
-->

### Q: What can be done with `_Replace.csv` and its format?
A: As follows:

- Currency unit
  - Content: Specifies the currency unit for money display
  - Format: Currency unit, <character(s) to use>
- Unit position
  - Content: Whether to put the unit before or after the number
  - Format: Unit position, <front or back>
- Display during file loading
  - Content: Specifies the string to display when detailed display is disabled during startup loading
  - Format: Simplified startup display, <string to display>
- Number of items recognized as shop sale items
  - Content: Specifies the upper limit of ITEM number to handle as sale items in SHOP
  - Format: Sale item count, <upper limit ITEM number>
- Characters used for DRAWLINE
  - Content: Specifies the character(s) used for DRAWLINE
  - Format: DRAWLINE character, <string to use>
- Specification of characters used in BAR
  - Content: Specification of characters used in BAR (string usage not guaranteed to work properly)
  - Format: BAR character 1, <character for in-range display>
          BAR character 2, <character for out-of-range display>
- System menu string
  - Content: Specifies system menu string after loading completes
  - Format: System menu 0, <string to replace "Start from beginning">
          System menu 1, <string to replace "Load and start">
- COM_ABLE initial value
  - Content: Specifies what to return when @COM_ABLEXX doesn't exist
  - Format: COM_ABLE initial value, <0 or 1>
- Stain initial value
  - Content: Specifies initial value of STAIN variable
  - Format: Stain initial value, <initial values for each array element (separated by /)>
- TINPUT timeout display content
  - Content: String to display when TINPUT times out
  - Format: Timeout display, <string to display>
- PALAMLV initial value
  - Content: Specifies initial value of PALAMLV variable
  - Format: PALAMLV initial value, <initial values separated by "/">
- EXPLV initial value
  - Content: Specifies initial value of EXPLV variable
  - Format: EXPLV initial value, <initial values separated by "/">
- PBAND:0 initial value
  - Content: Specifies initial value of PBAND:0 variable
  - Format: PBAND initial value, <value>

---

## Emuera Specification Supplements
### The Peculiar Specification of `REPEAT～REND` (`FOR～NEXT`)
In eramaker, the following code doesn't execute the loop:

``` { #language-erb title="ERB" }
GOTO $TEST
REPEAT 10
	;～以下処理～
	$TEST
REND
```

What about this?

``` { #language-erb title="ERB" }
REPEAT 10
	;～以下処理～
	$TEST
REND
COUNT = 0
GOTO $TEST
```

The answer is: "The loop executes even though it didn't go through `REPEAT`."
As a specification of eramaker,
"Once you enter the loop even once, thereafter jumping into it with `GOTO` without going through `REPEAT` will still execute the loop"
This rather odd specification exists.
Emuera naturally reproduces this. It's definitely not something you should use, however.

---

### Regarding `CONTINUE` Processing
Two essential commands for loop processing: `CONTINUE` and `BREAK`.
While `BREAK` for forcibly exiting a loop is straightforward,
`CONTINUE` processing is often misunderstood.
This misunderstanding occurs with the `DO～LOOP` syntax.

``` { #language-erb title="ERB" }
DO
	;(処理)
	CONTINUE
LOOP 0
```

This code may look like an infinite loop at first glance because of the CONTINUE,
but actually the inside of `DO～LOOP` executes only once.
This is because `CONTINUE` essentially jumps to the end of the loop by specification.
So the loop processing is:
<u>`CONTINUE` → `LOOP 0` evaluation → Result is false</u>, so it exits the loop.

---

### The Peculiar Specification of Strings and `RETURNF`
In user-defined expression functions, by declaring the identifier `#FUNCTIONS`,
functions can return strings with `RETURNF`.
However, this `RETURNF` string has a rather peculiar mechanism.
The format for returning strings with `RETURNF` differs from rules for `PRINT` display and string assignment.
Specifically:

|String Type|Format             |Example|
|:-          |:-               |:-|
|Simple string  |"string"         |RETURNF "テスト"|
|String variable  |Variable name           |RETURNF STR:0|
|FORM string  |@"FORM string syntax"|RETURNF @"%STR:1%{A:2}\@(LOCAL) ? あ # い\@"|

For the last FORM string, using @"～" is required or it will cause an error, so be especially careful.

---

### 3-Dimensional Arrays and Their Limits
Emuera provides 3-dimensional arrays.
```
TA:XX:XX:XX and TB:XX:XX:XX
```
Array elements are `100×100×100`, totaling 1 million elements.
~~As a limitation, array size cannot be changed~~
Since 1732a, array size can be changed with 1 million as the upper limit.

---

### Increment/Decrement Extensions
Pre/post, in-expression usage, and more are supported.
You should be able to use it almost like a normal C program.

---

### String Operations
Recent Emuera allows using `*=` in string operations, etc.
Whether there's a use case for this is even a mystery to the implementer.

---

### Meaning of `PRINTCPERLINE()`
There's an item in config called "Number of PRINTCs to align," but actually it's only used for displaying training commands.
In other words, when using `PRINTC` family from scripts, automatic line breaks according to settings don't occur.
Still, this command comes in handy when you want to display things like USERCOM commands the same way as training commands.
Basically, you read the settings with this command and write code that performs line breaks accordingly.

---

### `DO～LOOP` Command

Format:

``` { #language-erb title="ERB" }
DO 
	;(命令)
LOOP (条件)  
```

Supplement:
`WHILE～WEND` loops don't execute any processing inside if conditions aren't met at first.
In contrast, `DO～LOOP` evaluates whether to loop at the `LOOP` line after executing the loop body once.
If it's guaranteed that processing will occur at least once, using `DO～LOOP` results in smarter code.

---

### Changes in `REUSELASTLINE` Specification
`REUSELASTLINE` specification differs between the first implementation in `[Private Modification] 1.52q rev.2` and after being incorporated into the main version in `1.60`.
Specifically, originally it was:
- Erase the previous line and display the line being erased when adding the next line

Changed to:
- Display the line being erased when adding the next line

Therefore, when trying to erase invalid input for `INPUT`,
with the original specification, you could just use:

``` { #language-erb title="ERB" }
REUSELASTLINE (warning message)  
```

But now you need:

``` { #language-erb title="ERB" }
CLEARLINE 1
REUSELASTLINE (warning message)  
```

Note that for `@USERXXX` processing, it still works with just
`REUSELASTLINE_` (_ is a space)
(The processing is done internally in this case, so CLEARLINE is not needed)

As for this specification difference, it's been decided not to change it back as it would cause more confusion (determined through direct dialogue between authors).

---

### Bit Operation Commands
Bit operations are useful but notoriously complicated.
Emuera has implemented binary notation like `1pN` and added many bit operation operators, making bit operations much easier.
That said, for programming veterans it's manageable, but for others it's still tough even with this implementation.
So besides the above methods, `GETBIT`, `SETBIT`, `CLEARBIT`, `INVERTBIT` are provided.
Reference: [Reference/BIT_OPERATION](../Reference/BIT_OPERATION.en.md)

Format:

``` { #language-erb title="ERB" }
GETBIT (variable to operate), (bit position)  
; Gets the 2^(bit position) bit of the target variable
; (GETBIT can be used as an in-expression function)

SETBIT (variable to operate), (bit position)  
; Sets the 2^(bit position) bit of the target variable to 1

CLEARBIT (variable to operate), (bit position)  
; Sets the 2^(bit position) bit of the target variable to 0

INVERTBIT (variable to operate), (bit position)  
; Inverts the 2^(bit position) bit of the target variable (0→1, 1→0)
```

Advantages of this method:
- No need to calculate the bit value each time
- Bit position can use variables unlike 1pN, allowing centralized processing

Disadvantages:
- Tedious for those who know what they're doing
- Using operators looks cooler

---

### Differences in String Processing Between Shift-JIS and Unicode
Emuera essentially provides three commands for getting string length:

``` { #language-erb title="ERB" }
STRLEN (string)  
STRLENS (string expression)  
STRLENFORM (FORM syntax)  
```

All of these get the string length as Shift-JIS.
In contrast,

``` { #language-erb title="ERB" }
STRLENU (string)  
STRLENSU (string expression)  
STRLENFORMU (FORM syntax)  
```

get the string length as Unicode.
The main difference is that Shift-JIS counts one kanji character as 2 characters, while Unicode counts kanji as 1 character.

---

### Things to Avoid Even with LOCAL Variables
`LOCAL` is a very convenient variable, but there are still things to avoid due to ERB specifications.

- Using across the same event function

Event functions can have multiple definitions according to ERB specifications.
This means `LOCAL` is shared across all functions as well.
Processing that depends on `LOCAL` crossing the same event function boundaries
has a very high probability of breaking due to interrupts from other functions with the same name.
For such purposes, using `TFLAG`, etc., is recommended.

- Using `LOCAL@～`

`LOCAL` variables can be referenced from outside the function via `LOCAL@`.
However, this is a "for debugging" measure.
It's not particularly problematic if you're just checking values,
but once you start assigning, it becomes a bug source and makes debugging difficult.
Using this in regular code is not recommended at all.
(The author would like to make `LOCAL@～` read-only in the future)
The author recommends designing implementations that don't require this.

- Using as static variables
`LOCAL` keeps its value even after a function ends,
making it behave similarly to static variables in C.
However, you should avoid using `LOCAL` as static variables.
This becomes clear when considering code like:

``` { #language-erb title="ERB" }
@TEST  
IF LOCAL == 0  
	;～  
ELSEIF LOCAL == 1  
	;～  
ELSE  
	;～  
ENDIF  
LOCAL = （something depending on conditions）  
```

The behavior is determined by the last set value of `LOCAL`.
At first glance this seems fine since `LOCAL` is static,
but this code can break when loading save data.
`LOCAL` is a variable not saved in save data, so values are discarded by:

- Returning to title
- Loading save data

etc.
In other words, processing that depends on previously set values easily becomes a bug source.
`LOCAL` should be used only within a single processing session.

---

### Should You Use `IF` or `SELECTCASE`?
When using `IF` or `SELECTCASE` to branch on `A = RAND:5` and then branch on `A`,
you can write similar code with either.
However, there's a big difference in processing speed,
with `IF` taking about twice as long as `SELECTCASE`.
For simple value branching like the example above,
using `SELECTCASE` rather than `IF` is more efficient.

Note that for dialogues, using `PRINTDATA` family results in shorter code and sometimes faster processing.

---

### `CALLF` and Pseudo-Setters
The `CALLF` command:

```
Calls an expression function and ignores its return value
```

Seems useless, but there are usage patterns like:

``` { #language-erb title="ERB" }
@SET_VALUE(ARG, ARG:1)  
#FUNCTION  
RETURNF VALUE("SET", ARG, ARG:1)  

@GET_VALUE(ARG)  
#FUNCTION  
RETURNF VALUE("GET", ARG)  

@VALUE(ARGS, ARG, ARG:1)  
#FUNCTION  
IF ARGS == "GET"  
	RETURNF LOCAL:ARG  
ELSEIF ARGS == "SET"  
	LOCAL:ARG = ARG:1  
ENDIF  
```

This makes it possible to reference `LOCAL` of function `@VALUE` without using `LOCAL@`.
It's useful when you want to reference an array across multiple functions without using one-character variables.

---

## Various Technical Tidbits
### Behind the Scenes of Script Processing Speed Optimization in Private Modifications
Recent private modifications have achieved script processing speed optimization,
and the implementation is very tricky.

Previous script processing, simply put, looked like this:

```
(Main routine)→(Script execution start)→(Processing preparation)  
→(Script actual processing)→(Infinite loop judgment routine)  
→(Main routine)  
```

This was repeated for each line - that's the existing code.
As you can see, this is very inefficient.
In current private modifications, it's been rebuilt as:

```
(Main routine)→(Script execution start)  
→｛(Processing preparation)→(Script processing)→(Infinite loop judgment)｝×n  
→(Main routine)  
```

The key is line 2. In this processing, as long as there's no need to return to the main routine,
looping script execution indefinitely reduces function call counts.
Additionally, some frequently used processing has special processing paths,
further reducing processing time and achieving speedups for `REPEAT～REND`, etc.

---

### Emuera Error Checking Contents
After startup, Emuera reads code and displays errors if any.
There are 2 patterns of display:

- Errors displayed during file loading
  - Displayed under `*****.ERB loading...`
- Errors displayed after syntax checking post file loading
  - Displayed after file loading completes, before title display

This is categorized by the timescale difference in code checking.
Specifically, errors are checked in this order:

- Error checking during file loading
  1. Verification of whether lines are interpretable
    a. Lines starting with `[SKIPSTART]` or `#`
      - Check if used correctly, display error if not
    b. Function declaration lines
      - Check if declaration format is correct, display error if not
    c. Lines starting with `+` or `-`
      - Check if it's pre-increment/decrement, display error if not
    d. Lines expected to start with commands/variables
      - First, check if the first string is a command or variable
      - Display error if neither
      - If the first string is invalid (contains symbols like `\` or `$` that shouldn't exist), throw exception and stop loading here (changed to not stop in 1731t and later)
    e. If it's expected to be a variable assignment line
      - Check if it's in assignment form, display error if not
  2. Error checking done in syntax checking after file loading
    a. Checking contents of declared functions
      - For functions declared with `#FUNCTION`, check for unavailable commands
      - If "Analyze arguments at startup" is enabled, check if arguments have correct format
      - Check pairing commands like `IF～ELSEIF～ELSE～ENDIF` and `REPEAT～REND`
      - Check jump destinations for `CALL` (commands like `CALLFORM` where destination is determined at runtime are not checked)

---

### Processing Difference Between `PRINT` and `PRINTFORM` Families
When displaying plain text without variable content, which has less internal processing: `PRINT` or `PRINTFORM`?
The answer is `PRINT` (though you could guess without thinking about it).
`PRINT` has very little processing because it displays arguments as-is.

- PRINT family
  - Argument check: Assign argument as-is to string
  - Command execution content: Extract argument, pass to display function as-is

- PRINTFORM family
  - Argument check: Extract argument, check for variable existence, save as string corresponding to string.Format syntax
  - Command execution content: Extract argument, process to insert variable content into format, create display string, and pass to display function

Thus, even for plain text, there's a vast difference in processing between `PRINT` and `PRINTFORM`.
By the way, 1755a significantly improved processing speed when giving plain text to `PRINTFORM`, so the difference has narrowed considerably (though it's still noticeably slower).

---

### Order of IF Statement Condition Evaluation
Consider the following IF statement:
``` { #language-erb title="ERB" }
IF A && (B || (C && D))
```
In this syntax, what order are conditions A~D evaluated?
(For simplicity, short-circuit evaluation is not considered)
One might think C→D→B→A due to parentheses priority, but actually Emuera evaluates in the order A→B→C→D.

Why is this? This comes from how Emuera processes syntax.
Emuera interprets the above syntax as:
```
1. Let Y = C && D,  
	IF A && (B || Y)
1. Let X = B || Y,  
	IF A && X
```

And actual processing is:

```
1. Evaluate A && X
	1a. Evaluate left side A
	1b. Evaluate right side X→proceed to evaluate B || Y since X = B || Y
1. Evaluate B || Y
	2a. Evaluate left side B
	2b. Evaluate right side Y→proceed to evaluate C && D since Y = C && D
1. Evaluate C && D
	3a. Evaluate left side C
	3b. Evaluate right side D
```

Thus, the evaluation order is A→B→C→D.
Think about it and you'll see it becomes correct, so there's no problem with this method.
Furthermore, since short-circuit evaluation prioritizes the left side, this is actually more reasonable.
(If the left side is false, there's no need to evaluate the right side's () content, reducing processing.
If the left side is true, the processing done is the same as evaluating the right side's () content first.
From a comprehensive view, processing amount decreases.
In that sense, for code intended only for Emuera, placing the condition least likely to be true first within error-free ranges is not meaningless coding in theory.
Of course, practically speaking, as mentioned in Q&A, Emuera's processing bottleneck is rendering, so focusing on this won't make a significant difference in processing speed.)

---

### Why `VARSET` is Fast
The `VARSET` command that initializes an entire variable array with a specified value is

``` { #language-erb title="ERB" }
REPEAT N(array size)  
	A:N = 0  
REND  
```

Yet it's over 10,000 times faster at minimum.
(`VARSET` finishes processing almost instantly even with 1 million array elements.)
There are legitimate reasons for this.

When called, `VARSET` internally performs loop processing that assigns the specified value to the given array.
This internal loop processing is optimized at runtime and executes very quickly.
On the other hand, for `REPEAT～REND`, the following processing occurs:

```
1. Enter REPEAT
	(If first time, set COUNT to 0,
	if jumped from REND, add 1 to COUNT and check termination)
2. Execute A:COUNT = 0
3. REND line does nothing and returns to REPEAT line
```

(This 1~3 repeats for the set number of times)
Thus, with `REPEAT～REND`, not only is there value assignment processing to variables,
but there's also additional processing to drive the 3 lines of code.
Result: not only simply more processing, but also more complex processing makes runtime optimization difficult, taking very long.
Generally, implementing internal commands that do the same processing as ERB-written scripts results in internal commands being significantly faster in most cases.
(Especially for processing that loops through arrays)
However, there aren't many cases where such long, heavy code produces meaningful differences, so there aren't many cases where you can actually feel this difference.

---

### Code Reload Specification and Memory Consumption Increase
Emuera has a feature to reload ERB files, but memory consumption increases with each use.
There are unavoidable factors for this.
In Emuera's ERB code processing, at startup it reads all code line by line and manages it by packing into classes. At this time, information about the next line of the current line is stored.

Now, what happens when ERB file reloading is done not only during system input waiting but also during input waiting commands like `INPUT`?
At this time, if the file containing the current `INPUT` function is reloaded and the code information is replaced, what happens?

The answer is simple:

**Emuera loses track of the code to execute and throws an error.**

Therefore, during reload, existing code cannot be discarded.

**So, there's a mechanism to stack code separately from already loaded code.**

And by overwriting function definition information, the new code is executed.
Due to this specification, currently executing functions will operate according to old code until they end and are called again, which cannot be prevented.
Also, while there's old code after reload, it's difficult to distinguish between old and new after adding reload file code, so it's left as is without deletion. Therefore, code stack grows with each reload and memory consumption increases.
Thus, while necessary during development, it's a feature safer not to use except when needed.


---

# eratohowiki-ERBmanual.en
---
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

Which variables use which array format is listed in the [eramaker variable list](../eramaker/variables.md) and [Emuera constants and variables](../Emuera/variables.md).

---

### How to Use Variables
Basically, follow what's written on the [eramaker variable list page](../eramaker/variables.md).
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
[`PRINT`](../Reference/PRINT.md) series syntax for displaying text on the screen, mainly used in dialogue.

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
See the [`PUTFORM`](../Reference/PUTFORM.md) page for details.

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
[Reference page for `IF`](../Reference/IF.md)

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
[Reference page for `SIF`](../Reference/IF.md)

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
[Reference page for `SELECTCASE`](../Reference/SELECTCASE.md)

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
[Reference page for `REPEAT`](../Reference/REPEAT.md)

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
[Reference page for `FOR-NEXT`](../Reference/FOR.md)

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
[Reference page for `WHILE-WEND`](../Reference/WHILE.md)

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
[Reference page for `DO-LOOP`](../Reference/DO.md)

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
[Reference page for `ABS`](../Reference/ABS.md)

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
You can check the list of expression functions on the [Commands and Expression Functions page](../Reference/README.md).

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

Related page: [User-Defined Expression Functions](../Emuera/user_defined_in_expression_function.md)

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
[Reference page for `ADDCHARA`](../Reference/ADDCHARA.md)
[Reference page for `DELCHARA`](../Reference/DELCHARA.md)

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
[Reference page for `TIMES`](../Reference/TIMES.md)

``` { #language-erb title="ERB" }
A = 1000  
TIMES A, 1.5  
```

This makes variable `A` equal to `1000 × 1.5` which is `1500`.
Note that even if the result of using `TIMES` is a decimal, it's rounded to an integer.

---

### Other Commands
[`WAIT`](../Reference/WAIT.md)…Performs only waiting for input. No value is stored in `RESULT`.  
[`QUIT`](../Reference/QUIT.md)…Terminates eramaker. Mainly used during game over, etc.

---

## About Bit Operations

```
anon>Hey me. What does the single & that's often used in config mean? Is it a mistake for &&?
anon>Oh, that's called bit operations. It's properly listed [here](../eramaker/variables.md)
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


---

# eratohowiki-ERB-QandA.en
---
# ERB Development Q&A

Original page  
[eratoho Summary V3 ERB Development Q&A](https://seesaawiki.jp/eratoho/d/ERB%b3%ab%c8%afQ%26A)

---

This page was intended to explain various ERA-BASIC topics used in development for eramaker and Emuera in Q&A format, but it has become a page explaining the basics of variables and functions.

## Variables

### Q: What are array variables?
**A: Think of them as families**  
In eramaker, almost all variables are array variables.
For example, a single-character variable `A` contains multiple variables like `A:0`, `A:1`, `A:2`. You can think of these as members of the `A` family.

However, since each family has different characteristics, you cannot specify them all at once. For example:

``` { #language-erb title="ERB" }
 A = 2  
```

In the above, `2` is assigned to `A:0` (when a variable is written alone, you can assume `:0` is omitted at the end), but `A:1` or `A:2` will not change.

Some may wonder why bother grouping them under the same name. Let's consider the `ITEM` variable, which actually manages items.
If `ITEM:1` is `1`, it means item number `1` has already been purchased. Without arrays, if you used variable `I` as the purchase flag for item 1, then what about item 2? Item 3? You'd need more and more new variables. And since ERB only has 26 single-character variables available, you could only manage 26 items.

That's not all. When purchasing an item, you need to set the item flag to 1 (or more), and the process does `ITEM:BOUGHT = 1`. If item management used separate variables, purchasing item 1 would require variable `I`, item 2 would require variable `J`, item 3 would require variable `K`... you'd need to manipulate different variables for each item purchased, plus additional branching logic.

Array variables are essential to eliminate this confusion and make code clearer.

---

### Q: What are elements of array variables?
**A: They indicate specific containers within that array**  
As mentioned in the previous section, array variables have multiple containers with the same name, and these are distinguished by "elements." For example, "`A:2`" is a numeric array variable with name `A` and element `2`.

Some variables have multiple elements. For example, "`CFLAG:4:2`" is a variable with element `4` and element `2` of the variable named `CFLAG`. Variables with two elements like this are called 2D arrays. Those with only one element like `A:2` are called 1D arrays. Note that eramaker does not have 3D arrays (Emuera has introduced 3D array variables).

While we compared array variables to "families" in the previous section, 2D arrays might be better understood as "apartment buildings." Even though they're residents of the same building, they live on different floors, and rooms with the same number on different floors are not the same room.

---

### Q: Are `RESULT`, `PLAYER`, etc. also array variables?
**A: They also have households**  
In the era world, there are almost no variables without households. This is quite enviable, but COUNT, RESULT, DAY, TIME, MONEY, MASTER, TARGET, ASSI, PLAYER, ASSIPLAY, SELECTCOM, PREVCOM, LOSEBASE, UP, DOWN, PALAMLV, EXPLV, EJAC, FLAG, TFLAG, ITEM, ITEMSALES, BOUGHT, NOITEM, PBAND, RESULTS, STR, SAVESTR, NO, ISASSI, NAME, CALLNAME, BASE, MAXBASE, ABL, TALENT, EXP, MARK, RELATION, JUEL, CFLAG, EQUIP, TEQUIP, PALAM, STAIN, EX, SOURCE, NOWEX, GOTJUEL are all array variables.

Note that some of the above variables are initialized at specific times, and whether all elements of that array variable are initialized or only specific elements differ. For example, at the start of training, `PREVCOM:0` is initialized to `-1`, but `PREVCOM:1` and beyond are not initialized.

[Reference: Emuera Variable List](../Emuera/variables.md)

---

### Q: What are single-character variables?
**A: Numeric array variables with single alphabet letter names.**  
These are the 26 types of numeric array variables: `A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z`. Since they are numeric type, they cannot be used for string assignment, but they are the basic variables used for handling numbers.

Note that when dialogue files handle processing, it can be dangerous to manipulate variables used by the variant main system from the dialogue side.

For example, if the main system leaves `A:0` with the actual training target character number when calling a dialog, and the dialog side overwrites `A` with something like `A = RAND:2`, problems will occur when processing returns to the main system.

Normally, at event call timings, the variables (flags) that must not be destroyed should be clear, but sometimes the variant side doesn't provide sufficient information. In that case, dialog authors should use Grep or source checking to understand which variables must not be destroyed.

Also, in Emuera variants, you should use the local variables `LOCAL` and `LOCALS`.

---

### Q: eramaker has too few variables!
**A: Wait, are you sure you're using arrays effectively?**  
You already know variables are limited, but with some ingenuity, there are ways to deal with this. The most common mistake is:

```
ABCDEFGIJKMNPQRSTUVXYZ - what, you're using 22 of them!  
And you only have HLOW's 4 left!
```

This mistake happens because you forgot that these single-character variables are "array variables." If you're using similar flags, you should consider combining them under the same name. For example, if you have variables `A`, `B`, and `C` each assigned in different sources, you could change them to `A`, `A:1`, and `A:2`, allowing the B and C parts to be used as separate variables. By organizing your flags this way, flag shortages won't happen often.

---

### Q: What's the difference between numeric variables and string variables?
**A: Whether the content is just a number or a string.**  
Numeric variables are variables that contain numbers. They can be processed mathematically, such as with arithmetic operations. For example:

``` { #language-erb title="ERB" }
 C = A:2 + B:1  
```

In this case, the value of `A:2` plus the value of `B:1` is assigned to the numeric variable `C:0`.

String variables are variables that contain strings. They are used for things like character names or trait names. However, they cannot be processed mathematically like numeric variables. They can only be manipulated through string operations.

---

### Q: Do variable names have special meanings?
**A: Sometimes**  
Some variables have special meanings. For example, the variable TARGET represents the training target, and PALAM represents parameters.

Since these variables were prepared in the original erakanon for those specific uses, using them as intended is the clearest approach, but you are not bound by this in development. You can use variables however the creator wants. However, each variable has an initial value set or is initialized at specific timings, so make sure you understand how that variable behaves when using it.

Below are the main variables that require caution when using:

- `COUNT`: A numeric variable used for counting in `REPEAT` loops. It should probably not be modified. Also, as mentioned above, `COUNT` is an array variable, but only `COUNT:0` is actually used for loop counting, so you cannot nest `REPEAT` loops in eramaker. With Emuera extensions using `FOR`, `DO`, `WHILE`, etc., it becomes possible, but you still cannot share the counting numeric variable.

- `RESULT`: A numeric variable that contains some kind of result. This might be the return value from `RETURN` when returning from `CALL`, or a number entered with `INPUT`, etc., stored in `RESULT:0`. `RESULT:1` and beyond have no specific role in eramaker.

- `RESULTS`: A string variable that contains some kind of result. For example, a string entered with `INPUTS` might be stored in `RESULTS:0`. `RESULTS:1` and beyond have no specific role in eramaker.

- `SELECTCOM`: A numeric variable indicating the training command number selected in this training turn. `SELECTCOM:1` and beyond are used in Emuera's extended instruction `CALLTRAIN`. Note that `SELECTCOM` may not be used if the training (`BEGIN TRAIN` and related processing) is not used (example: eratohoSB).

- `ITEMSALES`: A numeric variable indicating whether an item is for sale.

- `STAIN`: A numeric variable representing stains. Note that it uses bit management. You need to study bit management from other pages or the original documentation.

- `CHARANUM`: A numeric variable representing the current number of registered characters. The same number is in every element. Assigning to it doesn't change the number, so it has no meaning. In Emuera, attempting to assign to it causes an error.

- `RAND`: A pseudo-array numeric variable that returns random numbers. Assigning to it has no meaning. In Emuera, attempting to assign to it causes an error.

The above variables are automatically used as described. On the other hand, the following variables are just containers unless set in ERB:

- `MASTER`: A numeric variable indicating the master's registration number. Note that the master's registration number is not necessarily always "0".

- `PLAYER`: A numeric variable indicating the trainer's registration number. Unless you create a mechanism to actually switch trainers, this variable won't be very useful.

- `TARGET`: A numeric variable indicating the training target's registration number. "0" usually means the master is the training target, and "-1" usually means there is no training target.

- `ASSI`: A numeric variable indicating the assistant's registration number. "-1" usually means there is no assistant.

- `ASSIPLAY`: A numeric variable indicating whether assistant training is in progress. Usually "0" means not in assistant training, and "1" means in assistant training. Note that it doesn't indicate which character is the assistant or whether an assistant exists.

- `PREVCOM`: A numeric variable indicating the training command number selected in the previous training turn. By the way, "-1" is assigned when entering training. Note that `PREVCOM:1` and beyond won't be assigned unless you create such a mechanism. Also note that assigning the previous turn's `SELECTCOM` to `PREVCOM` doesn't happen automatically - there must be actual processing for that.

- `NEXTCOM`: A numeric variable containing the training command number to execute in the next training turn. In the training turn, there's a check right before `SHOW_STATUS` is called, and if it contains a number 0 or greater, it will skip command input and try to execute the training command in `Train.csv` corresponding to the number in `NEXTCOM:0`. Note that `NEXTCOM:1` and beyond don't have this function. **Since there are various issues with this variable's behavior, it's best not to use it until you fully understand it.**

- `LOSEBASE`: A numeric variable showing the decrease value of `BASE` in the training turn. Note that it's not a character variable (= not a 2D array variable), so you need to use `TARGET` for access. If you want to use it as a character variable, please use `DOWNBASE`.

- `EJAC`: A numeric variable related to the ejaculation gauge. However, it doesn't automatically change when ejaculation occurs. You need to create a separate mechanism for that.

- `ITEM`: A numeric variable showing whether you own an item and how many.

- `NOITEM`: A numeric variable showing whether the no-item setting is enabled or disabled. "1" means no-item setting, "0" means not no-item setting. However, in most variants, it's probably "0". It may also take values other than 0 and 1.

- `STR`: A string variable. Since single-character variables are numeric, if you want to handle string variables in era, you'll probably use this a lot. The initial value is defined in str.csv. Note that it's not saved in save data. If you want string variables to be saved, use `SAVESTR` below.

- `SAVESTR`: A string variable. Since this is saved in save data, it's more valuable. However, in maker, it can only do jobs that numeric variables can do (cannot save characters entered with `INPUTS`).

- `ISASSI`: A numeric variable showing whether that character has ever become an assistant, but it's not automatically set, so you need to change the value to true in the assistant processing. Also note that it's not a character variable.

- `NAME`, `CALLNAME`: Both are string variables containing that character's name, but `NAME` is used for the real name and `CALLNAME` is used for how they're called or a nickname. Of course, you could make them exactly the same, or use them differently like full name and abbreviation.

- `CFLAG`: A numeric variable that can be held per character, but it can actually be initially set in `Chara**.csv` with the format "flag,***,###".

- `EQUIP`: Although not explained in the original, it's a numeric variable that can be used as a character variable in eramaker. It's not an Emuera extended variable.

- `PBAND`: Originally a numeric variable to make handling penis bands (which had many special processes) easier. For example, with `ITEM:PBAND`, the item number of the penis band can change without needing to modify the contents. However, it's just a numeric variable, so it's fine to use it that way. Note that it's not a character variable.

- `LOCAL`: A local numeric array variable available only in Emuera. Local variables are variables that can be used separately for each era function. Even with the same `LOCAL` name, different values are stored depending on which function called it.

- `LOCALS`: A local string array variable available only in Emuera. This is the string version of `LOCAL` above and can be used similarly.

- `ARG`: A local numeric array variable available only in Emuera. This is similar to `LOCAL`, but it's intended for passing numeric (flag) values between functions.

- `ARGS`: A local string array variable available only in Emuera. This is the string version of `ARG` above and can be used similarly.

- `CSTR`: A string variable available only in Emuera that can be held per character. Since it's also saved, it appears to be very convenient to use.

---

### Q: What are character variables?
**A: These are 2D array variables where arrays are prepared for each registered character**  
Almost all variables are array variables, but there is a series of variables where arrays are prepared for each registered character. These are called character variables. Variables that are not character variables are 1D array variables, so you cannot prepare separate flags for each registered character.

```
Character variable SOURCE example  
SOURCE:A:B A...Character with registration number A   
               B...Indicates SOURCE:B  
Non-character variable UP example  
UP:B B...Indicates PALAM:B  
      Target must always be TARGET:0 (training target)
```

In other words, to manage each character with non-character variables, you would have to manipulate `TARGET:0`, but if you do that, you'd likely run out of flags for saving other characters, so if you're making a variant that trains multiple targets simultaneously in eramaker, you'd need to create a mechanism to handle the flag shortage.
Emuera has slightly improved this situation, but some ingenuity is still needed.

For which variables are character variables and which are non-character variables, please refer to the [Variable List](../Emuera/variables.md).

---

### Q: What are character numbers (NO) and registered character numbers (ID)?
**A: They have different meanings**  
Character number (`NO`) is the number set in `Chara***.csv`, used to add characters in the game with `ADDCHARA (number)`. In almost all eratoho variants, there's Reimu Hakurei's character settings in `Chara001.csv`, and there's a line in that CSV file:

``` { #language-erb title="ERB" }
 番号,1,  
```

That's Reimu's character number.

On the other hand, registered character number or character registration number or registration number (`ID`) is the number assigned to characters that exist in the game as master or slave. This has no relation to character numbers and normally should be added sequentially as 0, 1, 2, 3... as ADDCHARA is used. In other words, characters that haven't appeared yet don't have a registration number. They are only assigned to characters that appear in the game.

The numeric variables `MASTER`, `ASSI`, `TARGET` show that the character with the registration number stored in them plays that role. Note that this is not the character with that character number playing that role.

You can get the character number from a registration number. That's `NO:(registration number, ID)`. If you want the master's character number, use `NO:MASTER`, and if you want the training target's character number, you can use `NO:TARGET` or just `NO`.

Normally, the first element in character variables is accessed by registration number, not character number. Note that the second element of `RELATION`, a character variable representing relationships, is accessed by character number, not registration number. In other words...

```
 RELATION:A:B  
 A...Registration number (ID) (MASTER, ASSI, TARGET)  
 B...Character number (NO) (NO:MASTER, NO:ASSI, NO:TARGET)  
```

So be careful not to confuse character numbers and registration numbers. Also, note that registration numbers change when using `SWAPCHARA` or `SORTCHARA` in Emuera, etc.

By the way, `DELCHARA (number)` specifies by registration number, not character number, but you probably understand that's natural.

---

## Functions

### Q: What are functions?
**A: A series of code that performs specific processing**  
When writing ERB, execution order is from top to bottom. However, you don't have to flow from top to bottom from game start.

For example, when using the SHOP command to buy a slave, train a slave, or save game data, the processing after each should be different. If you handle all of that sequentially with `IF RESULT == ~ ELSE ~ ENDIF`, the code would become very hard to read.

At times like this, you can create the slave purchase processing part separately and call it when needed. The separately created part is called a "function" in era.

The instructions to call functions are `JUMP` and `CALL`. `JUMP` moves processing to that function. It doesn't automatically return to the original location. On the other hand, `CALL` resumes processing from the line after `CALL` when the function finishes.

Note that in Emuera, you can `JUMP` from a `CALL`ed function, but this doesn't work in maker. (Actually, where can `JUMP` be used in maker?)

In ERB, functions start from the function declaration line, that is, the line with `@function name`. And from there to the end of that ERB file, or just before the next function start, is that function.

So if there's another function declaration line after, execution doesn't continue from there - processing ends. Therefore, if called with `CALL`, it returns to the line after `CALL` in the original location, and if called with `JUMP`, the program itself ends there. Also, to end a function at an arbitrary location, use the instruction `RETURN`. (Actually, `RETURN 0` is executed at the end of a function even if there's nothing there)

---

### Q: Wait, there are functions being called without `JUMP` or `CALL`?
**A: Some functions are called automatically**  
However... please read the question below for details.

---

### Q: What's the difference between `RETURN 0` and `RETURN 1`?
**A: It matters when returning from CALL**  
There are often `RETURN 0` or `RETURN 1` in functions. As mentioned in the previous answer, `RETURN` ends that function called with `CALL` and returns to the original processing, but you can add a number after `RETURN`.

And this is actually assigned to the variable `RESULT:0`.

So, if you have processing like `IF RESULT == 0 ~ ELSEIF RESULT == 1` after the `CALL` statement, you can branch after returning depending on the processing in the called function.

If a numeric variable is specified like `RETURN B`, the variable's value goes into `RESULT`. However, if you write `RETURN RESULT`, it works normally in Emuera, but in maker it's equivalent to `RETURN 0`.

Also, in Emuera, you can use expressions like `RETURN A+B`, not just numeric variables.

If you want to return multiple values, separate with commas like `RETURN A, B, C`. In this case, `A` is assigned to `RESULT:0`, `B` to `RESULT:1`, and `C` to `RESULT:2`.

Note that when a function ends without a `RETURN` statement but is called with `CALL`, it returns to the original processing, but `RESULT` contains 0 at that time (as if `RETURN 0` was automatically executed).

Note that special processing occurs when a function with `RETURN` falls under the following cases:

- If that function is a system function and has the `#SINGLE` attribute  
If it returns with `RETURN 1`, any subsequent system functions with the same name won't be executed. If it ends with something other than `RETURN 1` (including `RETURN 0`), it doesn't do that processing.

- If that function is named `COMABLE(number)`.  
If the number value is outside the range `0 to 2147483647` in eramaker, or outside the range specified by `TRAINNAME` in `VariableSize.csv` in Emuera, or if it's within that range but not defined in `Train.csv`, there's no special processing.  
If not, it's assumed to represent whether that `TRAIN` (command) can be executed.  
If `RETURN 0`, it can't be executed, so it doesn't display the `TRAINNAME` (command name) and disables input for that `TRAIN`. If not `RETURN 0` (including `RETURN 1`), it can be executed, so it displays the `TRAINNAME` and enables input for that `TRAIN`. However, if the setting to not display `TRAINNAME` is enabled, the processing differs.

- If that function is named `COM(number)`.  
The number value range and conditions are the same as `COMABLE(number)`, and if it doesn't fit, there's no special processing.  
If in `COMABLE(number)`, it returns something other than `RETURN 0` (including `RETURN 1`), it's assumed to represent whether that `TRAIN` was actually executed.  
If `RETURN 0`, it wasn't executed, so it returns to the `SHOW_STATUS` function. If not `RETURN 0` (including `RETURN 1`), it was executed, so it moves to processing that calls the `@SOURCE_CHECK` function or `@EVENTCOMEND` function.

---

### Q: What are event functions?
**A: Functions set up for special behavior**  
In era, normally functions with the same name cannot have multiple instances. If you create functions with the same name, which function gets called is determined based on specific rules, and only that function executes - other functions with the same name that weren't called are ignored.

However, there's an exception for event functions: if multiple functions with the same name exist, all of them are processed. The execution order also follows specific rules, but it can be controlled to some extent.

Below are the event functions with explanations. Note that event functions are not mandatory, so some variants may not have certain event functions.

- `EVENTFIRST`  
An event function called when starting the game from the beginning.

- `EVENTSHOP`  
An event function called when entering SHOP.

- `EVENTBUY`  
An event function called when something is purchased in SHOP.

- `EVENTTRAIN`  
An event function called when entering TRAIN (training).

- `EVENTCOM`  
An event function called after the player selects a command in training.

- `EVENTCOMEND`  
An event function called at the end of a training turn.

- `EVENTEND`  
An event function called at the start of training end processing.

- `EVENTTURNEND`  
An event function called at turn end.

- `EVENTLOAD`  
An event function called immediately after loading data. Emuera only.

---

### Q: What are the attributes given to event functions?
**A: A mechanism that determines how event functions are processed**  
As mentioned in the previous section, event functions can have multiple functions with the same name, and attributes can be added to the function declaration line to control the execution order.

- `#PRI`  
Functions with this execute before other functions with the same name. However, if there are multiple functions with this, you cannot directly determine priority among them.

- `#LATER`  
Functions with this execute after other functions with the same name. However, if there are multiple functions with this, you cannot directly determine priority among them.

- `#SINGLE`  
If this function ends with `RETURN 1`, other functions with the same name won't execute even if they exist. If it ends with `RETURN 0`, it executes other functions with the same name. It's a bit difficult to know when to use this, so you may not need to memorize it.

- `#ONLY`  
Only this function executes, and other functions with the same name don't execute. However, if this is given to multiple functions, only the first one executed based on normal rules executes. Note that this is Emuera only and is invalid in eramaker.

---

### Q: Are there functions with special behavior?
**A: There are functions that are called at predetermined timings**  
We touched on event functions in the previous section, but in eramaker, there are also functions with predetermined call timings among functions other than those. They work well when you process as expected. Of course, you can also write code that ignores this. In any case, below are such functions with explanations. Note that of course, some of these functions may not exist in certain variants.

In the following explanations, "it is assumed that ~" means that while it might be used in ways that aren't that, you should check the actual code.

- `SHOW_SHOP`  
A function called after `EVENTSHOP` (or immediately after `BEGIN SHOP` if `EVENTSHOP` doesn't exist). It's assumed to display purchasable items and accept SHOP command input.

- `USER_SHOP`  
A function called when a number other than `0~99` is selected in SHOP. It's assumed to transition to processing for commands other than item purchase in SHOP (starting training, resting, checking status, saving, loading, etc.). After ending, if there's no `BEGIN`, it returns to `@SHOW_SHOP`.

- `SHOW_STATUS`  
A function called after `EVENTTRAIN` (or immediately after `BEGIN TRAIN` if `EVENTTRAIN` doesn't exist). It's assumed to display status needed for training.

- `COM_ABLExx`  
A function called after `SHOW_STATUS` for all training commands. It's assumed to determine whether training command xx can or cannot be executed. If the return value is not 0, it's executable and displays as a training command. When 0, it's not executable and that command is not displayed.

- `SHOW_USERCOM`  
A function called after `COM_ABLExx`. It's assumed to display training commands based on `COM_ABLExx` results and accept player command input.

- `COMxx`  
A function called after `EVENTCOM` (or immediately after the player selects a training command if `EVENTCOM` doesn't exist), and only the corresponding `COMxx` is called. If there's no corresponding `COMxx`, this isn't called - `USERCOM` is called instead. It's assumed to handle execution of the selected training command.

- `USERCOM`  
As mentioned above, a function called when a training command without a corresponding `COMxx` is input. It's assumed to handle commands other than actual training in the training turn, such as status display, help, ending training, or switching players.

- `SOURCE_CHECK`  
A function called immediately after `COMxx` returns when `RESULT:0` is not 0 (i.e., when a training command was executed). It's assumed to handle `SOURCE` changes and parameter reflection after training command execution. After ending, if there's `EVENTCOMEND`, it calls that. Then, if that ends or there's no `EVENTCOMEND`... if there's no `BEGIN` instruction, it checks `NEXTCOM:0`. If `NEXTCOM` is 0 or greater, it executes the training command in `NEXTCOM`. Otherwise, it returns to `@SHOW_STATUS`.

- `SHOW_JUEL`  
A function called immediately after `BEGIN ABLUP`. It's assumed to display the target's owned jewels needed for ability UP.

- `SHOW_ABLUP_SELECT`  
A function called after `SHOW_JUEL`. It's assumed to have the player select which of the target's abilities to UP.

- `ABLUPxx`  
A function called when the number input by the player in `SHOW_ABLUP_SELECT` is `0~99` and there's a corresponding `ABLUPxx`. If there's no corresponding `ABLUPxx`, re-entry will be requested. If the input number is outside the `0~99` range, `USERABLUP` below is called. It's assumed to handle UP processing for the ability corresponding to `xx`. After ending, if there's no `BEGIN`, it returns to `@SHOW_JUEL`.

- `USERABLUP`  
A function called when the number input by the player in `SHOW_ABLUP_SELECT` is outside the `0~99` range. It's assumed to handle ability changes that don't work well with normal `ABLUP` ability UP. After ending, if there's no `BEGIN`, it returns to `SHOW_JUEL`.

- `SAVE_INFO`  
A function to add a summary to save data. This is the only function with this behavior. It's called just before game data is saved.

---

### Q: What is the BEGIN instruction?
**A: An instruction that calls various system instructions**  
From the questions above, you now know that functions exist at special timings. And `BEGIN` is the instruction to control these special timings in ERB.
By using this, you can call SHOP, start training, end training, end turns, etc. Of course, you can ignore this mechanism and directly CALL the relevant processing functions to progress the game, but in that case, you need to describe all necessary flag initializations and other code.

Until you understand this, use the existing structure. It's not too late to experiment after you understand.

When a `BEGIN` instruction is executed, the processing doesn't happen immediately - it happens after all code that should be executed, such as event functions or functions called with `CALL`, has finished executing. Also, there are timings when `BEGIN` cannot be used, so be careful because if `BEGIN` is used at such timing, it may cause behavior issues due to errors.

- `BEGIN SHOP`  
A `BEGIN` instruction that calls SHOP. If `EVENTSHOP` exists, it calls it, otherwise it goes directly to `SHOW_SHOP`.

- `BEGIN TRAIN`  
A `BEGIN` instruction to start training. After initializing some training-related flags, if `EVENTTRAIN` exists, it calls it, otherwise it goes directly to `SHOW_STATUS`.

- `BEGIN AFTERTRAIN`  
A `BEGIN` instruction to end training. It goes directly to `EVENTEND`.

- `BEGIN ABLUP`  
A `BEGIN` instruction to call the ability UP screen. It goes directly to `SHOW_JUEL`.

- `BEGIN TURNEND`  
A `BEGIN` instruction to end the turn (not the training turn). It goes directly to `@EVENTTURNEND`.

- `BEGIN FIRST`  
A `BEGIN` instruction to call starting the game from the beginning. This is an Emuera extension and cannot be used in eramaker. Note that variables are not initialized, so you should use the `RESETDATA` instruction.

- `BEGIN TITLE`  
A `BEGIN` instruction to call the title screen. This is an Emuera extension and cannot be used in eramaker. Note that variables are not initialized, so you should use the `RESETDATA` instruction.

---

### Q: What are user-defined inline functions?
**A: A new type of function extended in Emuera**  
In era, normal functions are called or jumped to with CALL or JUMP, but in Emuera, a new type called "user-defined inline functions" has been introduced. These are functions that can be used like reserved keywords in expressions. That is,

``` { #language-erb title="ERB" }
 LOCAL = HOGE()  
 (omitted)  
 @HOGE  
 #FUNCTION  
 LOCAL = RAND:6  
 RETURNF LOCAL  
```

In this case, the function `HOGE` is a user-defined inline function. This `HOGE` cannot be directly called with `CALL` or `JUMP`, but can be called in expressions as shown above and its value used. In the example above, the numeric variable `LOCAL:0` is assigned a random number from 0 to 5.

The `#FUNCTION` below the function declaration `@HOGE` indicates that this function is a user-defined inline function that returns a number. Of course, you can also create user-defined inline functions that return strings, and their attribute is declared with `#FUNCTIONS`.

Note that after the `HOGE` call above, there are parentheses. If arguments exist, you put them in. Even if the function doesn't require arguments, you must not omit the parentheses. You need to let Emuera know this is an inline function call. Below is an example of a user-defined inline function with arguments.

``` { #language-erb title="ERB" }
 LOCALS = HOGES(STR:0)  
 (omitted)  
 @HOGES(ARGS)  
 #FUNCTIONS  
 LOCALS = %ARGS%%ARGS%  
 RETURNF LOCALS  
```

In the example above, the string variable `LOCALS:0` ends up being assigned a string with the contents of `STR:0` concatenated twice.

Note that in functions converted to inline functions, you cannot use instructions that request input like `INPUT` or `WAIT`, or instructions that jump to other functions like `CALL` or `JUMP`. However, you can call other inline functions from within an inline function.

Note that when returning from a user-defined inline function, use `RETURNF` instead of normal `RETURN` or `RETURNFORM`.
If there's no `RETURNF` and the function reaches its end, it returns `0` for user-defined inline functions with `#FUNCTION`, and returns an empty string for user-defined inline functions with `#FUNCTIONS`. Note that it doesn't return to `RESULT:0` or `RESULTS:0`. In most cases, it will be assigned to the destination variable in the caller (in the example above, for `HOGE()` it's `LOCAL:0`, for `HOGES(ARGS)` it's `LOCALS:0`), or used directly as conditions in branching statements.

In any case, you cannot return a string from `RETURNF` in a user-defined inline function with `#FUNCTION`, or return a number from `RETURNF` in a user-defined inline function with `#FUNCTIONS`.

Also, you don't have to force yourself to use user-defined inline functions. While they can make code cleaner and easier to understand, if you're not sure, you should build with instructions that are easy for you to understand instead of inline functions.

Of course, there are also pre-defined inline functions that are not user-defined. For those, please refer to [List of Instructions/Inline Functions](../Reference/README.md). You can use them as much as you understand.

---

## Special Shortcuts in FORM Syntax

### Q: `PRINTFORM +++` doesn't display "+++".
**A: In eramaker's specification, when certain symbol characters are repeated three times, it displays the contents of a specific string variable.**  
If you want to display the symbol character itself instead, use the instruction `PRINT` without `FORM`. Below is a list of symbol characters and their corresponding string variables. This is the same in Emuera.

```
 *** = NAME:TARGET  
 /// = NAME:ASSI  
 $$$ = CALLNAME:TARGET  
 +++ = CALLNAME:MASTER  
 === = CALLNAME:PLAYER  
```

---

### Q: I got an error when trying to display `///`?
**A: As explained in the previous section, in FORM syntax, `///` means the character string variable `NAME:ASSI`.**  
However, in normal variants, the initial value of `ASSI` is `-1`, so if there's no processing that explicitly adds an assistant, trying to display `NAME:ASSI` will cause the following error (in Emuera):

```
 PRINTFORML ///  
 The first argument (-1) of character array variable NAME is outside the character registration number range  
```

Eramaker gives a similar error. There are several ways to avoid this, but `PRINTL ///` is an easy workaround.


---

# erawiki-ERBmanual.en
---
# Variant Production / ERB Creation Practice

Original page  
[eera series discussion thread, Summary Wiki V3, ERB creation practice](https://seesaawiki.jp/eraseries/d/ERB%c0%bd%ba%ee%bc%c2%c1%a9%ca%d4)

---

- [Tutorial](erawiki-tutorial.md)
- [Title Preparation](erawiki-title.md)
- [Title Practice](erawiki-title2.md)
- ERB creation practice

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


---

# erawiki-modification-QandA.en
---
---
title: System Modification Q&A
---

# System Modification Q&A

Original page  
[era series discussion thread, Summary Wiki V3, System Modification Q&A](https://seesaawiki.jp/eraseries/d/%a5%b7%a5%b9%a5%c6%a5%e0%b2%fe%c2%a4Q%26A)

<!--
//This page is intended as a guide combining command references, explaining which commands to use in various situations
//Always want to keep the latest information, so please feel free to correct or delete any outdated descriptions
//The title is tentatively Q&A, but rather than being constrained by that, I plan to write about things that are more advanced than commonly used dialogue syntax
//If the content grows significantly, we can split into separate pages
-->
This is a collection of programming information mainly for authors of new variants and large-scale patches.  
Unless otherwise noted, the assumption is that it will run on the latest version of Emuera at that time.  
It may not work properly with eramaker or older versions of Emuera.

## Basic Knowledge
### About Private Variables (A～Z and LOCAL, not #DIM)
- Use `#DIM` to declare and use variables only within a function
- When adding data you want to save, write `#DIM` in an ERH file
- I can't think of a reason to normally use LOCAL, but I use it in sample code

In older erabasic, single-character variables like `A～Z` were used for temporary variables, but they are no longer recommended.  
This is because they can be used in multiple places, and when `CALL`ed, the values can be overwritten in other locations, causing you to unknowingly change values.

However, there were no other variables available for recording loop counts or saving intermediate calculation results.

As a result, a variable called `LOCAL` was added as a local variable that can only be used within that function.  
(String local variables are `LOCALS`)

However, since they're all named `LOCAL`, it's fine for one or two, but when using things like `LOCAL:1` or `LOCAL:4` extensively, the program becomes hard to read, and it's difficult to remember what each variable is used for.

That's why private variables were added. By writing `#DIM` followed by the variable name you want to create, you can create a new variable that can only be used in that function.

``` { #language-erb title="ERB" }
@EVENTFIRST  
#DIM LCOUNT  
LCOUNT = 99  
```

`#DIM` must be written immediately after each `@~~~~~` to be valid. It cannot be used in other functions. It is not saved.  
You can create string types with `#DIMS`. You can also create large arrays. See the page below for details.  
[User-Defined Variables](../Emuera/user_defined_variables.md)

`LOCAL` has another usage. By appending a function name like `LOCAL@USER_SHOP`, you can modify other function's variables. (This was originally a debug feature)  
In the past, this was used to compensate for the lack of global variables, but when used this way, they're no longer local or anything, and you end up with the same problems as `A～Z`.  
Now, to create new variables with `#DIM`, you write them in an ERH file instead of immediately after `@~~~~~`.  
You can also decide whether to save them, or whether to save to global data.  
In recent large-scale variants, ERH is commonly used, so if you encounter unfamiliar variable names, try looking for files with the .ERH extension.  
(They are often placed directly in the ERB folder, and there may be multiple)  
[About ERH (Header Files)](../Emuera/ERH.md)

The only reason to deliberately use `LOCAL` now is when making patches where you don't want to significantly change the program, or when you don't want to upgrade the Emuera version.  
However, sample code in this page may use `LOCAL`.  
This is because when samples are partial rather than the whole function, `#DIM` doesn't work well since it must be placed immediately after the function label.  
When actually making variants or patches, please replace parts like `LOCAL` and `LOCAL:1` with variables created using `#DIM`.

Finally, I'll explain the difference from local variables in general programming languages. (If you've never used anything other than erabasic, you can ignore this)  
Emuera's local variables are different from local variables in popular programming languages like C, JavaScript, and Ruby. They are closer to global variables.  
Even with `#DIM` declarations, data from the previous function call remains, so they are functionally closer to global variables.  
This normally doesn't cause problems, but it becomes an issue when creating so-called recursive processing. All simultaneously called functions end up reading and writing the same variables.  
To create true local variables in the general sense in Emuera, add `DYNAMIC` when declaring with `#DIM`.

---

### Movement Within Functions (Control Structures)

erabasic programs (and most other programming languages) execute from top to bottom in the order they are written. This is called sequential execution.  
Like novels or movies, it's fine to proceed in order for things like that, but in games, what happens next changes depending on conditions. Programs that change this order are called control structures.

In game books, you might see things like "If the hero has the sword, go to page 23," and readers open the specified page instead of the next page. In other words, it's a control structure aimed at the reader.

Control structures include things like using separate functions like `CALL` and `JUMP`, or commands to end the game, but here I'll write about changing the execution order within a function.

| Control Structure Name              | Go Forward      | Go Backward     | Move Into Other Control Structures   |
| :---                                | :---            | :---            | :---                                  |
| [TRYGOTO・GOTOFORM](../Reference/GOTO.md) | $label          | $label          | Possible but not recommended         |
| [GOTO](../Reference/GOTO.md)            | $label          | $label          | Possible but not recommended         |
| [LOOP](../Reference/DO.md), [WHILE](../Reference/WHILE.md), [FOR](../Reference/FOR.md) | Loop start      | Loop end        | &#9747;                              |
| [IF](../Reference/IF.md), [SELECTCASE](../Reference/SELECTCASE.md) | ELSE, ENDIF, CASE | &#9747;         | &#9747;                               |
| [RESTART](../Reference/RESTART.md)     | &#9747;         | Function start  | &#9747;                               |

Basically, using limited commands within a scope is safer and makes for more readable programs than using powerful constructs that allow everything.  
If any seem suitable, prefer the ones lower in the table above.

The basis of control structures is the `GOTO` statement. By combining it with `IF` statements and simple expressions, all other structures can be rewritten using `GOTO`.  
However, it's too powerful and tends to cause unexpected behavior, so it's generally recommended to avoid it.  
(Those who want to know more should research "structured programming")

Another drawback is that corresponding labels are always required, and it becomes harder to understand the structure compared to other approaches, making it unclear which labels correspond to which `GOTOs`.  
In older erabasic, `GOTO` was frequently used for looping when input results were incorrect (`$INPUT_LOOP`), but most of these can be replaced with `LOOP` or `WHILE` statements. EM+EE also has the `BINPUT` command.

The only thing `GOTO` can do that others can't is move into other control structures, but you should avoid this as much as possible.  
For example, `GOTO`ing from outside a `FOR` loop into the loop makes it unclear which iteration of the loop you're in.  
With `IF` statements, there's a possibility of execution even when conditions aren't met. It's not a bug, so emuera operates correctly according to the rules, but those rules may not be the same as what you're thinking.  
Moving within the same control structure, or moving out of a structure to outside, is fine. In particular, jumping out of deeply nested loops at once is one valid use of `GOTO`.  
(Without `GOTO`, you'd need multiple `BREAK` or `CONTINUE` combined with `IF` statements, which actually becomes harder to understand)

TRY-series control structures are used when making patches or dialogues that can work whether or not the function (the file it's written in) exists.  
FORM-series control structures are used when you want to change the jump destination based on variable state, and don't want to write many `GOTO` statements with `SELECTCASE`, or when you might increase the number later.  
The downside is that at startup, it's impossible to determine if labels are correct, and you won't know until you run it, making bugs hard to find.  
I don't think there are many effective use cases for `GOTO` within a function, aside from `CALL` and `JUMP`.

- Repetition (`LOOP`, `WHILE`, `FOR`)  
Repetition is also a control structure.  
Repeating based on specified conditions is like conditional `GOTO`, but you can also do the same as `GOTO` to the beginning with `CONTINUE`, and `BREAK` does the same as `GOTO` immediately after that control structure.  
If you write `BREAK` at the end of an (infinite) loop, it doesn't repeat, and when not continuing, it proceeds forward, so it can replace `GOTO` statements that go backward.

- Branching (`IF`, `SELECTCASE`)  
`IF` statements that don't match the condition are the same as `GOTO` immediately after `ELSE`, or if there's no `ELSE`, `GOTO` immediately after `ENDIF`. `SELECTCASE` is a `GOTO` that can set multiple conditions at once.  
Branching can be used for control that goes forward, but cannot be used to go backward. If you want to go backward conditionally, you need to use other commands together.

- RESTART  
This is a `GOTO` to the beginning of the function. It's used when canceling in `@SHOP` or `@ABLUP` to return to the initial screen and redo from the start.  
It's not redoing from the beginning, but rather `GOTO` to the beginning, so variables are not in their initial state but in their modified state.  
If you want to move to just below the beginning instead of the beginning itself, create a label there and use `GOTO`, or use repetition structures with `CONTINUE`.

---

### Writing Repetition (`FOR` and `REPEAT` Differences and Recommended Style)
- Try not to use `REPEAT`
- Use `FOR` with private variables or local variables
- `WHILE` and `DO` are for advanced users. Use them when it's difficult to know the loop count in advance

Processes that repeat the same thing many times appear frequently in erabasic.  
The most obvious example is a list of owned characters. You repeat displaying character names and parameters for character 1, character 2, etc.  
Restoring everyone's health is the same: increase character 1's HP, then repeat for the number of people.

`REPEAT～REND` is a repetition structure that has been used since the early days of erabasic.  
While easy to write, it has several known problems.  
The `COUNT` variable used to check which iteration you're on is a global variable, so you can't create mechanisms that nest two `REPEAT`s, and if you use `REPEAT` in a function that gets `CALL`ed during `REPEAT`, the order becomes chaotic after the `CALL` finishes.

That's why the [FOR～NEXT](../Reference/FOR.md) construct was prepared.  
Since you can use variables other than `COUNT`, the above problems don't occur.  
(You can use global variables including `COUNT`, but since that's the same as with `REPEAT`, you normally use private variables)  
You can also change the starting number from 0, so you can start from 1 instead of 0 to exclude "you (character 0)".  
Other programming languages can declare dedicated local variables in `FOR` statements, but Emuera's `FOR` statement doesn't have that feature, so declare them with `#DIM` like other variables.

You can use any variable name for `FOR`, but it's easier to understand later if you decide on a convention like "use this name for repetition counters."  
In other languages, `i` is conventionally used, and when nesting loops, `i, j, k`, etc. are used. But in erabasic, `A～Z` are global variables and lowercase/uppercase aren't distinguished, so you can't use this method.  
Some ideas: prefix with `L` to indicate it's local (`LCOUNT`), shorten `COUNT` to `CNT`, prefix with `_` to distinguish from global variables (`_I`), or even use Japanese like `カウンタ`. Choose whatever you prefer considering length and clarity.

``` { #language-erb title="ERB" }
;Example: Set everyone's HP to MAX
@~~~~~~~~
#DIM LCOUNT  

FOR LCOUNT, 0, CHARANUM  
    BASE:LCOUNT:体力 = MAXBASE:LCOUNT:体力:  
NEXT  
```

Another structure you can use for repetition is [WHILE～WEND](../Reference/WHILE.md).  
It's mainly used when you don't know how many times to loop, and while the two are similar, the difference is whether the exit condition is checked before or after the loop.  
Simply put, use `WHILE` when there's a chance the loop body might not execute at all, and `LOOP` when it must execute at least once.  
However, depending on how you write `BREAK` and `IF`, you can do the same things with either, so it's a matter of preference once it works correctly.  
Neither sets a counter variable, so if you want to know which iteration you're on, you need to write code that sets a local variable to 0 before the loop and increments it by 1 each iteration.  
A common pattern is an infinite loop that continues until `BREAK`, which works the same with `WHILE 1～WEND` and `DO～LOOP 1`.  
(When the condition part is just `1`, the condition is always satisfied. The number can be 2, 3, or 999—as long as it's not 0—but conventionally 1 is used)

If you've never used `WHILE` and `DO` in other languages, you might find it hard to imagine when to use them.  
Looking at actual variant examples, there are uses like custom sorting, reducing other gauges until the rejection gauge becomes zero, repeating until parameter distribution is complete during level-ups, etc.  
You could use `FOR` with absurdly large numbers or combinations of `IF` and `GOTO` statements, but writing meaningless large numbers feels wrong, and with `GOTO` it's a hassle to come up with label names, so `WHILE` and `DO` write more cleanly.

For example, when displaying a list of characters from a separate CSV, `FOR` is used because character numbers might have gaps, but if you know there are no gaps, you can use `WHILE` (`DO`).  
Create an infinite loop and `BREAK` when `EXISTCSV` fails—it's elegant.

Example: A "Yes/No" selection program that doesn't proceed until answering "Yes"

``` { #language-erb title="ERB" }
PRINTL お主なら「はい」を選んでくれると信じておる……選んでくれるな？  
DO  
    PRINTL [0]はい  
    PRINTL [1]いいえ  
    INPUT  
    IF RESULT==0   
        BREAK  
    ENDIF  
    PRINTL もう一度言うぞ。選ぶのは「はい」だ  
LOOP 1  
```

---

### RESULT and Inline Functions
`RESULT` is a variable used to return function results.  
`RESULT` is often used immediately after the `INPUT` command, but `RESULT` is overwritten whenever you `CALL` any function.  
When executing multiple functions and adding up their results, if you don't copy the contents of `RESULT` to a private variable each time, you'll only know the `RESULT` of the last function executed.

And when you're putting it in a private variable anyway, it's faster to use inline functions. Most built-in functions have inline function versions available.

``` { #language-erb title="ERB" }
;For normal function call  
CALL TEST 70  
LOCAL = RESULT  

;For inline function  
LOCAL = TEST(70)  
```

[You can also make your own functions into inline functions.](../Emuera/user_defined_in_expression_function.md)  
Things that fall under the following conditions are often better made as inline functions:
- Don't do character input like `INPUT`
- Don't display characters with `PRINT` statements, etc.
- Don't modify variables like `CFLAG` or `ABL` (reading only is safe)

---

### IF/ELSEIF Groups Can Be Changed to SELECTCASE
<!--;Somehow I feel like I'm missing something  -->
There are times when you want to create many branches based on a single variable, calculation result, or random number.  
Depending on input, output different results, or output different results depending on random numbers.  
That's when this applies.

With `IF` statements, you have to write evaluation expressions one by one after `IF` and `ELSEIF`.  
It's quite laborious and a source of mistakes.  
That's when [SELECTCASE](../Reference/SELECTCASE.md) comes in handy.  
It's a command to evaluate one thing and branch to multiple destinations, and it's faster than `IF`.  
You only need to write the evaluation target once after `SELECTCASE`.  
Then you just write conditions after `CASE`. It's much cleaner.  
For ranges, you can use `IS`, `TO`, etc. See the link above for details.  
End with `ENDSELECT`. Simple, right?

``` { #language-erb title="ERB" }
;Made it slightly more elaborate than just branching with LOCAL  
;Branching using IF  
IF LOCAL+LOCAL:1 == 0  
    PRINT 0でした  
ELSEIF LOCAL+LOCAL:1 == 1  
    PRINT 1でした  
ELSEIF LOCAL+LOCAL:1 == 2  
    PRINT 2でした  
ELSEIF LOCAL+LOCAL:1 == 3  
    PRINT 3でした  
ELSE  
    PRINT 0から3ではありませんでした  
ENDIF  

;Branching using SELECTCASE  
SELECTCASE LOCAL+LOCAL:1  
    CASE 0  
        PRINT 0でした  
    CASE 1  
        PRINT 1でした  
    CASE 2  
        PRINT 2でした  
    CASE 3  
        PRINT 3でした  
    CASEELSE  
        PRINT 0から3ではありませんでした  
ENDSELECT  
```

---

### About Initial Settings

There are two setting methods, CSV and ERB, but things you set once and don't change, or things used only on the title screen, can only be set with CSV.  
There are more than what's in the table below, but since most can be set with either [GAMEBASE.CSV](../eramaker/CSV_format.md) or [_replace.csv](../Emuera/replace.md), things not written here should be set in ERB, not CSV.

| Setting Item                          | CSV Used for Setting |
| :---                                  | :---                  |
| Title, Author Name, Year, etc.        | GAMEBASE.CSV (※1)    |
| Characters existing at start          | GAMEBASE.CSV (※1※2)  |
| Character names, initial abilities     | CHARA*.CSV           |
| Now Loading display                   | _replace.csv         |
| Money unit                            | _replace.csv         |
| Initial values for stains             | _replace.csv         |
| TINPUT timeout display                | _replace.csv         |
| Timing for EXPLV increase             | _replace.csv         |
| Timing for PALAMLV increase           | _replace.csv         |
| Default value when RELATION unspecified| _replace.csv        |

※1 Invalid if `@SYSTEM_TITLE` is defined  
※2 Character 0 is forced to join, and only 1 other character besides 0 can be specified.

Money and initial items are normally set in the `@EVENT_FIRST` function. It runs only once when starting a new game, making it suitable for initial setup.  
It's common to interpose difficulty selection before setting up, then change settings based on difficulty.

The same applies to characters. Character 0 (the "you" in most variants) joins automatically, but if you need other initially joining characters, you must add them manually.  
You can do this in `GAMEBASE.CSV` if it's just one person, but if there are multiple, setting just one in CSV can cause confusion, so it's safer to add all on the ERB side.  
For player selection types, first remove character 0, then add a different character.  
Games where each character acts with AI (era红魔馆, era恋姬, etc.) need character data even when not as companions or slaves, so they `ADDCHARA` everyone first to create the data, then display only what's needed.

---

### Don't Include emuera.config in Distribution
Including `emuera.config` in distributed files will overwrite player custom settings during version updates.  
However, if there are no settings at all, the layout can break significantly, so using the [[_default.config](../Emuera/config_files.md) mechanism is convenient.

The specific steps would be something like this:  
(Only step (4) is needed for updates that don't change options)

1. Normally set up your preferred settings to create `emuera.config`
2. Copy `emuera.config` to the csv folder and rename it to `_default.config`
   (If there's an existing `_default.config` such as for a derived variant, remove it or rename it)
3. Delete the `emuera.config` in the same folder as the exe, and check if there are problems with launching, saving, and loading in that state
4. `emuera.config` should have been created in step (3), so delete it again and compress into zip

Settings that completely break functionality (not just display issues) are recommended to have `_fixed.config` in the csv folder.  
For example, `_Rename.csv` and `_Replace.csv` settings are suitable for `_fixed`.  
Since normal players don't usually change those options, `_fixed.config` is not necessary if you only have defaults, but if you must change settings during a major version update, use `_fixed.config`.

Don't use `_fixed` for window width and height, which can be very important in some variants.  
People often change font types and sizes, and adjust screen size to play.

---

### Use Descriptive File Names

- Think of file names as one-line comments explaining the file
- Use Japanese for newly added files
- Leave files from the original variant unchanged if you haven't modified their functionality
- When renaming files mid-project, distribute the entire file rather than as a patch
- If you're uncertain, consider whether you've packed too many functions into one file or lack consistency—maybe you should split the files
  (Even if you're unsure about splitting down to one function each, it might indicate packing too much into one function)
  
eraRorona's file naming is a great reference.

For training-related folders, numbering the files keeps them in order, organizing them by execution order and situation.  
Folder division is also effective, but if you divide too finely, files become hard to find, so numbering at the beginning is recommended. It's also effective when the execution order is unclear.

Also, with `ABL` and `Chara.csv`, connecting the traditional name and description with `_` makes it clear both which file in the traditional variant it corresponds to and what the content is.  
This method seems good for renaming files from derived variants.

---

### Naming Variables and Functions

- Don't use the case-sensitive option
- Use `_` instead of spaces when connecting multiple English words
- Use short names for frequently used items, prioritize clarity for less frequent ones
- Actively use Japanese names when you can't quickly decide on a name
- Keep system-used terms like `TALENT` and `ABL` as-is. Don't force translation to Japanese

Regarding Japanese names, some people don't use them due to past trauma, the hassle of switching input methods, or because English-speaking people are involved in development, but you should use them unless there's a specific reason not to.

One problem that occurs when you're too obsessed with alphanumeric characters is that if everything is time-related, you might create things like `TIME`, `TOKI`, `TIMER`, `TIME2`, etc., and later you can't understand them at all.  
Adding comments to incomprehensible names is double the work.

Also note that Emuera's case option works for half-width characters but not for full-width characters. Unless it's an in-game proper noun, it's safer not to use full-width alphabets as variable names.

---

### Eliminating Magic Numbers

- Numbers you should change:
  - Index numbers for characters, talents, etc. that aren't related to their content
  - Numbers with special meanings like upper limits
  - The same number appearing many times with the same meaning
- Numbers that are fine as-is:
  - Numbers that have meaning as ordinal numbers themselves
  - Numbers for initializing variables and constants
- Numbers that are hard to judge:
  - Initial values, minimum values
  - Numbers used only within a function or only once
  - Command numbers like `[200]～`

Magic numbers in programming are numbers whose meaning can't be understood just by looking at them, like needing comments to understand.

In era, for example, when you write `ABL:2` to check the skill value, the `2` is a magic number.  
It's only because skill is defined as number 2 in `ABL.CSV` that you know this, and it differs by variant. Moreover, the number 2 has no relation to skill at all.

In display-related contexts, sometimes being second has meaning while being "skill" doesn't. In that case, you should write 2. Writing "skill" makes the meaning less clear.

The main ways to replace them are:
- Write using the CSV notation like `ABL:技巧`
- Create constants with [#DIM CONST](../Emuera/user_defined_variables.md) (can also be variables or inline functions)
- [`#DEFINE`](../Emuera/ERH.md) can also be used, but handling is difficult, so it's for advanced users.

For example, if the maximum number of characters is 100, and you write 100 everywhere, you can't immediately tell that's the maximum number of characters just by looking.

``` { #language-erb title="ERB" }
#DIM CONST 最大人数 = 100  
```

Writing this in ERH makes it easy to change the number later, and searching for "最大人数" with GREP makes it easy to find all usage locations.

Most max values should be constants, but minimum values depend on the situation.  
Writing `#DIM 最小人数 = 0` when making a `FOR` loop doesn't help with clarity.  
However, when making a `FOR` loop starting from 1 to skip the character 0 "you," you might hesitate whether to make that `1` a constant.

``` { #language-erb title="ERB" }
#DIM CONST あなたを除く先頭 = 1  
```

You can write it like this, but it might be more natural to use a loop from 0 and only `CONTINUE` when `== MASTER`.

For command numbers, unify the `PRINT` part and the `IF` (`SELECTCASE`) part. If you make the condition part a constant, also use the same constant in the display part with `PRINTFORM`. There's no point in making only one side a constant, and people will wonder if there's some special intent.

---

### Example of Changing Magic Numbers (Character Specification)

When specifying characters with `ADDCHARA` or `GETCHARA`, there's no corresponding feature in Emuera, so magic numbers tend to remain in the source code.  
In shops, etc., using the sales numbers as-is doesn't cause problems, but for events, you need numbers to specify characters.

Currently in Emuera, the only place you can specify characters by name is the `RELATION` array. Everything else uses number specifications, so it ultimately becomes numbers, but there are areas where you can make improvements.

There are mainly two patterns in thinking:
- Use `_Rename.csv` or ERH
- Use `GETNUM`

<!--
//Since GETNUM added NAME specification in Emuera1.819, there's no need to use this method now.  
//-Create a function that can specify by string  
-->

One method is to create corresponding constants.  
In eraMegaten, a character name and number mapping table is created with `_Rename.csv`, which is replaced with that character's number at runtime.  
You can write it like `ADDCHARA [[キャラ:アメノウズメ]]`.  
It's convenient because it's clearer than numbers and gives a warning at startup if there's a typo. The downside is that the brackets are somewhat in the way, and preparing the CSV is tedious.

Regarding preparation, eraMegaten creates an ERB that generates the data, displays the CSV contents and necessary data via `TRYCALL` using `PRINT` statements, and saves the log to use as `_Rename.csv`.  
This is because typos or forgetting to add things will definitely happen if you do it manually. The same applies when making constants in ERH instead of CSV.  
If there are few characters, manual work is fine. Since characters requiring name specification are usually few, you can just write the minimum needed rather than all characters.

Also, for constant-related issues in general, while typos will be detected, if you mistake one constant for another kind, no error appears.  
For example, if you accidentally write a building name in `GETCHARA`, it might check a character with the same number or always be absent, but no error occurs.  
This unfortunately is inferior to official name specification features.

The second method is using `GETNUM` with NAME specification. Requires Emuera ver1.819 or later.  
For example, in eratoho, writing `GETNUM(CALLNAME, "霊夢")` gets Reimu's number.  
<!--
//The second method is to specify with a string enclosed in "", and create an inline function that converts it to a number.  
//There's a difference between printing everything or returning the corresponding number as RETURN, but the rough mechanism is the same as the _Rename.csv generating ERB.  
//The only example I have of this method is 東方ナイン, but it seems currently unavailable, so only the relevant function is excerpted here:  
//=||  
//@GETCHARANO, ARGS  
//#FUNCTION  
//     FOR LOCAL, 0, 100  
//          SIF EXISTCSV(LOCAL, 0) == 0  
//               CONTINUE  
//          SIF ARGS == CSVNAME(LOCAL, 0)  
//               BREAK  
//     NEXT  
//     RETURNF (LOCAL - 1)  
//||=  
//When using it, write like ADDCHARA GETCHARANO("霊夢")  
//The advantages and disadvantages of the function creation method are the opposite of the constant method.  
//You can check each time whether it's a character's name, but you can't confirm until you actually run that event.  
//However, if the event runs, an error will appear, and if there's an error, it's easy to check and fix.  
-->

In practice these two can be combined, though examples are rare.  
For example, if `_Rename.csv` replaces `[[霊夢]]` with "霊夢" and you write `ADDCHARA GETCHARANO([[霊夢]])`, strict checking is done at both startup and runtime.  
However, preparing this is tedious, so using one or the other is sufficient. The second method is recommended because it requires no preparation and only needs Emuera updates.

---

### How to Use GREP

When investigating the cause of bugs or researching the mechanisms of parent variants, GREP search is almost essential.  
GREP functionality is standard in Sakura Editor and VSCode. In Sakura Editor it's Ctrl+G, in VSCode use the search menu in the sidebar.

<!--
//For example, with a tool like "Tab Mojiken," clicking on GREP results shows a preview, so you can quickly check even with many misses without opening tabs or windows individually.  
//Searching itself is about twice as fast as Sakura Editor, and the difference increases when searching repeatedly with various conditions. Using exclusion search like "KOJO*.*" makes it even faster. (For system-related, you don't need to check dialogues)  
-->

There are two patterns for searching: searching with normal characters as-is, and searching using a special notation called regular expressions.  
For example, when you want to find places using `FLAG:100`, a normal search finds both `TFLAG:100` and `CFLAG:100`, but with regular expressions, you can write `[^TC]FLAG:100` to find only `FLAG` without `T` or `C` before it.  
`[^TC]FLAG:10[0-9]` finds `FLAG:100～109`.  
For detailed syntax, see sites explaining regular expressions.  
When the amount is small, it's often faster to just search normally and look with your eyes than to think up regular expressions. The method doesn't matter as long as you find it.

Next, how to search: there are basically three patterns.

1. Search by variable name or function name
2. Search for what you want to know by searching for text that might be in comments
3. Search for text displayed on the screen at the time you want to investigate

1. When you know what variables or functions are used, simply searching by that name brings up all the places they're used.  
Using regular expressions well, you can distinguish between places that use the variable and places that modify it.  
Even if you know the target, if it's like `LOCAL` or `A`, this method doesn't work well. Easy-to-understand variable names are also easy-to-search variable names.

2. When you want to find mechanisms related to things like "恋慕" (love) or "妊娠" (pregnancy), searching for those words usually finds them.  
This also applies when looking for parts where no message appears on screen.  
The downside is that comments must be written, and unlike variable names, if there are variations in notation, they won't be found. Even with comments, if it's written as "にんしん" or "懐妊" instead of "妊娠", it won't be found.  
When writing comments, you need to think about how you'll search for them later, otherwise even you won't be able to find them.

3. This requires some skill. The content shown on screen might be formatted by programs or `PRINTFORM`.  
When investigating variants that have processing for breast enlargement, searching for:

```
＜○○○の胸が大きくなった＞  
```

Will never show in search results. This is because the `○○○` part differs by character, so it's not written in ERB as-is.

In such cases, you break the word down to investigate. The first candidate is "`胸が大きくなった＞`", but if breasts and butts share a common mechanism, this might not work either. "大きく" and "小さく" might also be processed in the program.  
If nothing hits or the hits are all wrong, try "`が大きくなった`", "`大きく`", "`胸`", "`なった`"... and so on.

If breaking it down doesn't work, search with the text immediately before or after, starting with what you can search. If there's a `CALL` near that text, check where that `CALL` goes too. By following the flow like this, you'll always find it.

---
<details><summary>Contains training variant-specific content, collapsed</summary>

### About Differences in Training Command Execution Judgments
1. Displayed and executable (normal)
2. Displayed but not executable (target's motivation or `PALAM` insufficient)
3. Not displayed and not executable (insufficient items, wrong sex, too narrow, etc.)
4. Not displayed but executable (derivative commands)
5. Cannot be executed under any circumstances (bug, work in progress, balance broken and disabled, etc.)

Training commands are classified into these five, changing based on your and the target's situations.

The difference between (2) and (3), which can be confusing, is that they're both "cannot execute" but one is displayed and the other isn't.

Basically, (2) is execution value insufficiency. Execution values quantify the target's motivation.  
Since execution values change based on arousal and lubrication, they can become executable during a training session.  
For example, while masturbation doesn't require special techniques, the person won't do it unless they're motivated. (If you do it, it becomes caressing.)  
Even without consent for fellatio, it might become iraimajio or they might bite.  
Sometimes execution is impossible, but it just shows the required execution value, but there can also be refusal dialogues or stamina reduction.  
Some variants have multiple execution value judgments, so even for the same execution, whether it becomes forceful or smooth with consent changes.

(3) is for things that are unlikely to be possible during that training session, such as insufficient items or insufficient ABL.  
These can be used after training when conditions are met (like ABL increases or item purchases), making them available from the next training session.  
Can also be used in option screens to toggle display for commands that require certain conditions.

(4) are derivative commands, which are like secret techniques that become possible by combining certain commands.  
Many variants adopt things like Sixty-Nine from combining cunnilingus and fellatio.  
While possible with three or more commands, most activate with combinations of the previous command (`PREVCOM`) and current command.  
As secret techniques, they often have stronger effects than normal commands.

(5) used when there were too many commands, but recently, it's common to set options in the option screen and use that flag to hide them via the (3) mechanism.

Depending on variant policies and author preferences, it's roughly this classification.  
Even in service commands, those with high difficulty are (3) hidden without sufficient "奉仕精神" (service spirit) ABL, and some commands require high execution values even after displaying.

The two points for command display conditions are:
- Listed in `Train.csv`
- The corresponding `COM_ABLE◯◯◯` function returns 1, or the `COM_ABLE◯◯◯` function doesn't exist

To always be (1), just write it in `Train.csv` and don't make `COM_ABLE◯◯◯`.  
(2) can be made by having `COMF◯◯◯` return `0` when execution value is insufficient.  
(3) is made by creating `COM_ABLE◯◯◯` and checking whether execution is possible.  
For (4) derivative commands, they're either not written in CSV or are commented out in CSV. When derivable, use `JUMP COMF◯◯◯` at the beginning of the source command.  
(5) becomes an available command by commenting out in CSV and removing the `;` if there's no derivative `JUMP`.

In eraMegaten, when executing results in a derivative command, there's a mechanism to display the derivative command name in the list too, but this isn't possible with standard command display.  
So `COM_ABLE◯◯◯` is made to return 0 to disable normal command listing, and everything is displayed with `@SHOW_USERCOM`.  
(Accurately, only when the `CALLTRAIN` command is called, condition-checking functions are called from `COM_ABLE◯◯◯`, otherwise it unconditionally returns 0)

---

</details>

### About Decimal Calculations and Display

In erabasic, there's no mechanism for handling decimals except for the `TIMES` command.  
Even using `TIMES`, since it can't be passed as an argument, it's unsuitable for cases where actual processing is done in separate functions.

However, even in variants not using `TIMES`, decimal calculations are actually performed.  
For example, compatibility between characters (`RELATION`), which represents a multiplier—if written as decimals, 100% is 1.00, 1% is 0.01.  
How is this calculated? The number multiplied by 100 is used in calculations, then divided by 100.

``` { #language-erb title="ERB" }
UP:4 *= RELATION:R  
UP:4 /= 100  
```

Most variants contain code like this in SOURCE-related areas.  
By multiplying by the compatibility value with the training target as-is, then dividing by 100, it produces the calculation result `UP:4 * 相性(%)`.  
Calculating while multiplied by 100 allows for integer precision 100 times finer.

Not just calculations but also display can be converted to decimals.  
To display a decimal like `280.56`, internally it's stored and calculated as integer `28056`, and only at display time is it formatted to look right.

``` { #language-erb title="ERB" }
LOCAL = 28056  
PRINTFORML {LOCAL/100}.{LOCAL%100}  
```

280, which is the result of dividing by 100, becomes the integer part, a decimal point is added, and the remainder of dividing by 100 (56) becomes the fractional part—displayed this way, players recognize it as the decimal `280.56`.

This is called fixed-point, and since it only requires integers, multiplication, division (and remainder calculations), it's commonly used in eras without decimal features.  
While 100 is commonly used for calculations (like percentage displays), if you want 0.1 increments, 10 times is enough; if you need 0.001 precision, you must multiply by 1000; if you need even smaller increments, you increase the digits further.  
However, increasing decimal places in fixed-point means reducing integer digits, so be careful not to increase decimal places too much in calculations that could involve huge numbers like hundreds of millions or trillions.

When you're not used to this, you'll get different numbers than expected, especially digit misalignment.  
For example, if you multiply both the number being multiplied and the multiplier by 100, you get the original number times 10000, so dividing by 100 still gives 100 times the number, resulting in weirdness.  
For addition and subtraction, you must calculate numbers with the same multiplier together.  
If you clearly feel the digits are wrong, debug while comparing with calculator results.

Also, not just fixed-point or era-specific, but for calculations where multiplication and division give the same result regardless of order, do multiplication first, then division.  
This is because computers have rounding errors when dividing first.  
`1000*3/3` is 1000, but `1000/3*3` gives 999.

---

### In-Depth Explanation About IF Condition Expressions

`IF` statements are normally used together with condition expressions like `==` or `>`.  
If the condition is met, execution continues; if not, execution resumes after the ELSE part, or if there's no ELSE, after `ENDIF`.  
However, when studying by looking at various variant codes, you sometimes see strange `IF` statements that can't be explained by this alone.

Accurately, what `IF` checks is whether the calculation result of the condition expression is 0 or not 0.  
Therefore, writing a program like below doesn't cause an error, and branching occurs based on the value of A at that point.

``` { #language-erb title="ERB" }
IF A  
     PRINTL Aは0ではない  
ELSE  
     PRINTL Aは0である  
ENDIF  
```

This gives the same result as writing:

``` { #language-erb title="ERB" }
IF A != 0  
     PRINTL Aは0ではない  
ELSE  
     PRINTL Aは0である  
ENDIF  
```

Comparison condition expressions like `==` or `!=` are calculation expressions that become 1 when the condition is met, and 0 when not. Since when the condition is met, it's not 0, it's evaluated as intended in the `IF` statement.

This applies to cases other than condition branching as well. `WHILE` and ternary operators that branch based on conditions all work the same way.

The result of 0 in condition evaluation is called "false" or "False", and non-zero is called "true" or "True". In on/off terms, true is on and false is off.  
This might look like "if A>5 is true, then..." etc.  
True/false is terminology used in programming in general, not just Emuera.

The fact that comparison is a calculation and the result is a number also applies to cases other than condition branching.  
Below is an example using the condition result directly in assignment.

``` { #language-erb title="ERB" }
     A = 5  
     B = A == 5  
```

In this case, since A==5 results in 1, B becomes 1.  
Writing this with an IF statement looks like:

``` { #language-erb title="ERB" }
     A = 5  
     IF A == 5  
          B = 1  
     ELSE  
          B = 0  
     ENDIF  
```

Using this mechanism, you can also split complex condition checks into several expressions.

``` { #language-erb title="ERB" }
     A = TALENT:処女 == 1  
     B = ABL:技巧 > 3  
       
     IF A && B  
          PRINTL (TALENT:処女 == 1)&&(ABL:技巧 > 3) が真の場合  
     ENDIF  
```

Usually writing condition expressions normally is clearest, but when code tends to get long, there are cases where seemingly confusing `IF` statements are used to eliminate waste.

Emuera's condition evaluation is C-style, and the general approach is similar in other programming languages, though there are differences in details.  
For example, in Emuera, comparison results are integers, but some languages have separate logical type mechanisms, and in those languages you can't assign comparison results to integers.  
When learning other languages, check how "true" and "false" are handled in that language's manual.

---

### Bit Operations Using Binary (`STAIN` Mechanism)
- Can pack many flags into one variable
- When you see `&` or `|`, it's probably related to this
- Use SETBIT・GETBIT if using now

Among erabasic mechanisms, `STAIN` is quite hard to understand.  
It's a method to create many simple flags by decomposing one integer variable into many small numbers.  
You see it used for things other than `STAIN`.

For example, when you want to use numbers 0-9 for six digits, using an array with six variables is the normal approach, but there's also the method of treating a six-digit number like `406478` as six digits from 0-9 arranged together.  
To check the thousands digit, you can either convert to string and check the 4th character from the right, or divide the whole by 10000 and take the remainder divided by 1000. With clever calculations, you can also change only the targeted digit.  
Integers can go up to 19 digits, and if all digits are filled with 9, that's 18 digits, so this method can pack 18 digits from 0-9. This reduces the number of variables needed and makes save data smaller.

In the standard `STAIN`, the range 0-9 isn't needed—you just need to distinguish whether there's stain or not.  
That means you only need 0 and 1, so thinking of each digit as base-2 instead of base-10 allows creating more flags than dividing by 10.

Thinking of each digit as base-2 is called binary, and numbers written using binary thinking are called binary numbers.  
`Emuera` provides a way to write binary numbers by prefixing with `0b`.  
(Variable names can't start with numbers, so there's no worry about name collision with binary numbers starting with 0)

Originally, computer internals all work in binary, but they're converted to decimal for display, so humans don't normally think in binary. Only in special cases is binary handling used.  
In era variants, binary is probably only used when you want to pack multiple numbers into one variable, like with `STAIN`.

It's hard to imagine each digit carrying over by 2, but think of it like a soroban with only the upper beads. It also looks like a collection of on/off switches.  
(Normal soroban combines the base-2 "heaven" beads and base-5 "earth" beads, making the overall mechanism decimal)

An important point is that decimal and binary are just different ways of writing and thinking—the numbers themselves are exactly the same. It's like writing 1, or 壱, or ONE—they all represent the same number. They're not different numbers like positive and negative.  
Internally, they're not distinguished from normal integers, so even variables assigned by writing in binary display in decimal when shown with `PRINTV`. `PRINTV` is technically not a command to display the specified variable, but a command to display the specified variable in decimal.  
If you want to display as binary for debugging, convert using the `CONVERT` function and display as text with `PRINTS`.

Binary increases by doubling each digit instead of multiplying by 10 for each place like ones, tens, hundreds, thousands...

|Decimal|1|2|4|8|16|32|64|128|256|
| :--- |:-|:-|:-|:-|:-|:-|:-|:-|:-|
|Binary|0b1|0b10|0b100|0b1000|0b10000|0b100000|0b1000000|0b10000000|0b100000000|

It's convenient to memorize common patterns, but impossible to memorize all. Use Windows Calculator in programmer mode to convert between binary and decimal to find the numbers you need.

In binary, you can't say "ones place" or "tens place"—instead you say "what bit" or "bit number." Bit means a digit in binary. Emuera integers are 64-bit, so that's 64 flags.  
In Emuera, the rightmost digit in binary is bit 0, counting up to bit 1, bit 2... toward the left, with the leftmost being bit 63.

You can extract each digit with calculations similar to decimal, but bit masks are normally used because they're faster and more concise. In Emuera, the `&` operator is `AND`, and the `|` operator is `OR`.  
[About Stains (lower part of page)](../eramaker/variables.md)  
[Mask (Information Engineering)](http://ja.wikipedia.org/wiki/%E3%83%9E%E3%82%B9%E3%82%AF_%28%E6%83%85%E5%A0%B1%E5%B7%A5%E5%AD%A6%29)  
[eratoho Summary V3 - ERB Syntax Lecture 3](../manual/eratohowiki-ERBmanual.md#_38)

By the way, about the difference between `&&` and `&`: `&` is `AND` on the numbers as-is, while `&&` is `AND` after converting both sides to 1 (true) or 0 (false).  
`A && B` is the same as `(A != 0)&(B != 0)`.  
Normally you should use `&&`, and only use `&` when using as bit masks. Conversely, if you see `&&`, it's a normal condition expression; if you see `&`, it's bit mask related. The same applies to `||` and `|`.

While older bit mask programs become much clearer just by replacing the decimal parts with binary, you can now easily do bit operations with the three commands `GETBIT`, `SETBIT`, and `CLEARBIT`.  
Unless you're extracting multiple bits at once, you don't need bit masks. (This is written as knowledge for variant modification rather than practical use)  
[BIT Operation Commands](../Reference/BIT_OPERATION.md)

The disadvantage of packing with this method is that if you later need more than 64 flags, or want to set numbers greater than 1, it's troublesome to handle. You can't easily increase the limit like with arrays.  
Since recent Emuera can add variables with `#DIM`, that might be simpler in some cases.

---

## Practical Examples
### Creating Character-Specific IDs (Numbers)

eramaker originally had no characters with the same `NO`, but with variants like Megaten where multiple demons of the same species can be added as companions, or adding random characters, there's a need for information to identify this specific character beyond just `NO`.

For example, this information is needed when tracking parent information in pregnancy, or when following `MASTER:0` and `TARGET:0` other numbers after sorting with `SORTCHARA`.

It's often called character ID or just ID, so this article calls it ID.  
Currently, this isn't provided by the eramaker or emuera system, so each variant that needs it either saves it to `CFLAG` or makes it retrievable via a function.

| Variant Name | ID Storage Location | Limit | Mechanism |
| :---         | :---                | :---  | :---       |
| eraMegaten   | `CFLAG:キャラ固有の番号` | 200 (ownership limit) | Smallest number not overlapping with current characters |
| eraRorona    | `CFLAG:キャラID`       | CHARANUM at generation | Smallest number not overlapping with current characters |
| eraWeapon    | `CFLAG:3109`         | Integer limit | Increment counter by 1 each time |

Other variants are mostly similar to one of these.  
It's also common to make it retrievable via a function called `@GET_ID` instead of `CFLAG`.

Megaten and Rorona basically use the same mechanism: as long as the number doesn't overlap with other current characters.  
This is sufficient for tracking after sorting, but as play continues, characters with the same ID will naturally appear, so using this ID for blood relations will later show different people instead of unknown data.  
Either don't use it for such purposes, or remove references to deleted character IDs.

What Weapon and 恋姬 adopt is simply a method of giving sequential numbers from 1 in order of creation.  
You might worry about running out of order. "Won't it hit a limit and cause an error at some point?" But let's roughly calculate when "some point" might be:

```
9223372036854775808/(100000000*60*60*24*365) = 2924  
```

Emuera's integer upper limit is 922 trillion, so you'd need to continuously generate 100 million characters per second for about 3000 years to exhaust IDs.  
Realistically, generating 100 million per second would run out of memory, and the PC would break before continuing for 3000 years. Normally, the year display will run out of 4 digits before IDs run out.

The advantage of fixed limits and reuse is when managing data in arrays separate from character variables.  
For example, you can't make a 922 trillion × 922 trillion 2D array for character compatibility, so you need to make it with realistic numbers.  
You need to think about managing read/write by the ID in the array rather than by array order.

For no specific reason like that, Weapon's method is recommended. It's the simplest, and easier to adapt if you want to add something later.  
When it's a hassle to find free `CFLAG` slots, you can also make a dedicated variable with `#DIM CHARADATA`.

Also, start IDs from 1, not 0. You can't distinguish between having no ID set and ID 0. (Weapon and 恋姬 also start from ID 1, probably for the same reason)  
When adding the ID mechanism later, you can just automatically assign IDs to characters with ID 0 without worrying about save data versions.  
When creating characters, always go through your own function instead of using `ADDCHARA` or `ADDVOIDCHARA` directly, and set the ID in that function to reduce omissions.

---

### Page Switching for Character Lists

In variants with many characters, the character selection screen doesn't fit on screen, so such variants have page switching functionality.  
This is commonly called page navigation or pagination.

It's used when selecting training partners, assistants, or targets for status display from owned characters, when purchasing characters, etc.  
I'll mainly write about owned characters here, but purchase processing is the same mechanism.

It seems easier to first introduce examples from existing variants.  
Here, "character number" refers to the current character order specified by `TARGET` or `ASSI`. It's not `NO`.

<!--//If there are better recommended implementations, please add them  -->
- In eraMegaten:
  - Always displays 20 people per page in any situation
  - Puts the display count in single-character variable `A`, the character numbers to display in `Q:0` to `Q:A`, and the page number in `P`, then uses `SHOW_CHARA_LIST`
  - In `@SHOW_CHARA_LIST`, displays based on contents of `A`, `Q`, and `P`
  - The display content differences branch by `FLAG:ショップコマンド`
  - If `P` is 1 or more, display previous page; if `P` is less than `(number of people-1)/20`, display next page
  - If page changes, change `P`, keep `A` and `Q` as-is, and redo `SHOW_CHARA_LIST`

- In erainSchool:
  - Displays 10 people per page
  - Both display and page switching are done in `@DISPLAY_COMMON`
  - Parts that differ by calling situation are set as arguments to `DISPLAY_COMMON`
  - Parts that differ by calling situation are made into separate functions and called with `TRYCALLFORM`
    (Like `@DISPLAY_SET01_FUNCTION` for training selection, `@DISPLAY_SET03_FUNCTION` for assistant change, etc.)
  - Loops with `REPEAT CHARANUM`, and when not displaying a character, `CONTINUE`; characters outside the page range aren't displayed but don't `CONTINUE`, only characters in range are displayed
  - If display position is not first, show "return to previous page"; if there are 10 or more characters remaining from display position, show "advance to next page"

There are other detailed mechanisms, but it's roughly like this.

What's needed in any method is deciding how many people per page.  
Depending on expected screen size and what's displayed top/bottom, it's probably 10-30 for single-character-per-row, and at most 30.

Next is distinguishing which characters to display and which not.  
For example, with 10 per page, character 24 should normally appear on page 3.  
However, if characters before 24 are hidden for some reason, it might be page 2 or page 1. Or page 1 might have 4 people, page 2 has 8, etc.—displaying different numbers per page.  
There are three ways to avoid this problem:

- Megaten style: Prepare an array that packs only the numbers to display
- inSchool style: Check each time including characters in non-display ranges
- `SORTCHARA` to put characters to display at the front

Each also investigates how many maximum people are displayed at once, and uses that for max page calculation.  
Megaten style is recommended, but using global variables like `Q` for passing between functions isn't good—making dedicated variables with `#DIM` in ERH or passing via arguments would be better.

Conditions and display content differing by situation are the same as without pages, branching with `SELECTCASE` or `IF`, or making separate functions.  
Some variants create a string list of conditions and pass it. The advantage is you can see the conditions just by looking at the call part.  
This is thinking similar to anonymous functions and interface inheritance in other languages, done within what's possible in erabasic.  
If there's little difference, IF is fine, but if display content is completely different by situation or there are many display types, separate functions might be better.

"Return to previous page" is simple: don't display on page 1, display on others.  
However, check whether page 1 is logically 0 or 1.  
Here we proceed assuming page 1 is 1.

Whether to advance to the next page is shown when total count is greater than current page number × 10, or when current page number is less than max page number.

You can also make it jump to any page like `1.2.3.4.5…` like online stores. A bit tedious, but you can find how to make this for other programming languages online.

When page navigation mechanisms stop working well, try making it smaller first and test while writing on paper.  
For example, with page count calculations, start with 3 or 4 per page—something you can calculate in your head.  
Then write out what results you'd get with 4 people, or 5 people, and as you do this, your thoughts organize.

---

### Complex Sorting with SORTCHARA

Characters are normally in the order they were `ADDCHARA`ed, but as the number grows, you want to sort (reorder) by various conditions.  
In such cases, you can use the `SORTCHARA` command for fast reordering.

Normal usage is like `SORTCHARA MAXBASE:0`, which sorts character variables in descending or ascending order based on magnitude.  
This is fine when satisfied with one variable, but it can't directly handle conditions that don't fit in a single variable.

The first method is to use multiple `SORTCHARA` separately.

1. Sort by condition 1, and if condition 1 is the same, sort by condition 2
2. Sort by condition 1, and move items matching condition 2 to the bottom of the list

You can solve these by using `SORTCHARA` twice.  
`SORTCHARA` is a so-called stable sort, meaning when sorting, if numbers are the same, they stay in their original order.  
Therefore, for case (1), executing in the order `SORTCHARA 条件2` then `SORTCHARA 条件1` leaves only condition 2's order when condition 1 is the same.  
For case (2), just do condition 1, then condition 2. However, this works for talents like 0 or 1 but can't handle fine specifications like obedience below 3.  
Sorting by obedience rearranges 1, 2, 3 separately, so it won't be the intended order. You need to combine with the method below.

The second method is to calculate conditions and store them in character variables beforehand.  
For the previous case of obedience below 3, before sorting, check if all characters have obedience 3 or less and store it in a character variable.

``` { #language-erb title="ERB" }
FOR LOCAL, 0, CHARANUM  
     ;When actually using, use an unused number or make a new variable with #DIM CHARADATA instead of 777
     IF ABL:LOCAL:従順 <= 3  
          CFLAG:LOCAL:777 = 0  
     ELSE  
          CFLAG:LOCAL:777 = 1  
     ENDIF  
NEXT  
```

With this, `SORTCHARA CFLAG:777` clearly separates characters with obedience 3 or less from those higher.  
Complex sorting like by total HP and energy:

``` { #language-erb title="ERB" }
CFLAG:LOCAL:777 = MAXBASE:LOCAL:体力 + MAXBASE:LOCAL:気力  
```

You can handle this by changing the calculation expression like this.  
Even for things like sell price, it's the same.

You can use multiple SORTs and pre-calculations together, making it possible to get the exact sorting you want.

If you want manual sorting, you can use `SWAPCHARA` to swap one person at a time, but then if you use `SORTCHARA` afterward, the manual specification changes.  
If you must use `SORTCHARA` internally, you need tricks like saving the order before sorting and restoring after, or having a system that prioritizes specific characters rather than sorting.

---

### Displaying a List of Characters from CSV

Q. I want to make character selection, but the character list isn't working well.  
A. You can get the content described in CSV using CSVNAME, CSVABL, etc.  
     You can also get whether a CSV with any character number exists using EXISTCSV.  
     Loop through these as appropriate.

This mechanism is often used for character purchase or selection.

The example below displays character names from CSV registration with numbers.  
Even if there are missing character numbers in the middle, checking with `EXISTCSV` beforehand prevents weird displays.  
Setting the upper limit to 10000 people just makes it slow without meaning, so it checks up to number 99.

In actual usage, there are often also processes like hiding hidden or unselectable characters, displaying parameters and amounts.  
(In this example, making hidden characters 100 or later makes them easily unselectable)

``` { #language-erb title="ERB" }
FOR LOCAL,0,100  
    IF EXISTCSV(LOCAL)  
        PRINTFORMLC [{LOCAL}]%CSVNAME(LOCAL)%  
    ENDIF  
NEXT  
```

Since 100 in this example is a magic number, when actually using it, it's desirable to rewrite referring to eliminating magic numbers.

<!--[[Remove Magic Numbers>#content_1_10]]reference when rewriting -->

---

### Creating Random Characters

Some variants use a system where different characters appear each time, unlike the normal CSV-based character generation system.  
Commonly called random characters.  
The reasons vary—original characters aren't enough, or wanting different gameplay each time—it's a popular system.

When creating random characters, there are two methods: creating with `ADDCHARA` from source CSV, and using `ADDVOIDCHARA`.  
Using `ADDCHARA` requires preparing a CSV for random characters, but has the advantage that rough settings can be made in CSV.  
For example, in eraWiz, there are separate CSVs for jobs, adjusted in ERB from those.

Since there was no `ADDVOIDCHARA` in the past, there was a method of making a near-empty CSV, but now `ADDVOIDCHARA` suffices.

Then modify the HP and parameters of the characters created that way.

``` { #language-erb title="ERB" }
MAXBASE:0 += RAND:200  
```

This makes random characters with HP varying from initial value to initial value+199.  
The basic method is repeating this for HP, energy, talents, experience, etc.

However, completely dice-rolled characters end up quite rough.  
For example, having both "high pride" and "low pride" as talents is strange. And it's also strange to always have one or the other.  
You need to set probabilities like 20% high pride, 20% low pride, 60% neither, and adjust to make it varied enough not to feel unnatural.

It's a matter of preference, so that roughness is "good" is certainly possible, but you also need to decide the range of that roughness.  
In some cases, whether it's okay for trained characters with maxed stats to appear, and what percentage probability that is.  
This is a common challenge not just in era variants but in various games, so checking game strategy wikis for games with random characters is helpful.

There's also the name problem.  
With completely random names in Japanese kana, they won't be pronounceable.  
A basic mechanism is writing some names in ERB and using one that doesn't overlap with current characters.  
For Japanese and Chinese, another method is randomly combining kanji commonly used in names.  
This is also hard to make plausible names, but at least separating family name and given name is a good idea.

Let me introduce some examples of random character generation.  
First, eraWiz. Beyond jobs, it decides species, and additionally branches by roughly random personality, with talents more likely based on personality.  
For example, "noble" characters are more likely to get high pride, "violent" characters are more likely to become defiant.  
It's excellent—characters get appropriate talents while personality classification can be used in dialogues.  
Names are also divided by personality, totaling about 200 types.

Next, eraWeapon. It prevents mutually exclusive talents from appearing together, and has talents that appear more often based on weapon characteristics (like whip personification increases sadist rate)—I think it's a standard generation process.  
Names are 50 types. Since it's the personification of self-made weapons, being advised to name them yourself, the random name count is fewer than others.

In other variants too, the basic structure should be the same: create a base character, adjust numbers within reasonable ranges, and assign names—so reading with this in mind makes decoding easier.

---

### Making Child (Son) Training Functions

(This is an article about making them trainable, but even if pregnancy/birth only without training, the mechanisms other than character generation are the same.)

The thinking is the same as random characters, but you often make them while referring to parent data.  
Not required, but it's better for atmosphere when personalities are similar, or creating strong characters that inherit abilities, rather than complete randomness.  
It's random characters with correction processing like talents of the same parent being more likely to appear, or adding 10% of parent's abilities to initial values.

You can also make children without random elements.  
Not era, but Fire Emblem Awakening and Fire Emblem Genealogy of the Holy War have fixed names and classes per mother, fixed ability increases and decreases per father—no random elements.  
There's also a method where only the first child is a fixed character and subsequent ones are random. This is common in historical simulation games.  
However, since multiple children are born in expectation, it becomes boring if only the same abilities appear, so I don't think there's a fixed method in era variants currently. (eraMegaten's fusion is close to this thinking)

Child gender varies by variant—some are daughter-only, some allow ratio changes via options. I think it's a matter of preference.

A problem with child characters is how to identify the father.  
Often storing father information in the pregnant character's `CFLAG`, but when each CSV only has one character, `NO` alone is fine, but there can be random characters or multiple characters from the same CSV.  
So eraMegaten has every character possess a number called `CFLAG:キャラ固有の番号`, with this number being unique per character, used to identify the father.  
Since relationship is important in dialogues and fantasies, it's good to save it as character data and display parents' names on the status screen too.

Due to timing gaps between pregnancy and birth, sometimes the father is sold by birth time.  
There's also the method of keeping the data even after selling, but no examples of such implementation were found.  
This is because there are many disadvantages: save data grows increasingly, unnecessary things get mixed into the character list, and important characters probably won't be sold.  
eraMegaten also records the parent's `NO` separately from the unique character number, and when sold, uses that to assign species, etc.

Other than that, there's special processing at full term, postpartum milk, child-rearing, etc., but basically you save a number representing days since pregnancy in the mother's `CFLAG`, and each day check that number at the end of the day to display messages and change abilities.  
There's also the method of holding parameters as "which day" instead of "how many days left," but this method doesn't work well with NG+ features.  
You need to handle things like resetting pregnancy information during inheritance.

The difficult part is setting child age. What age should they be to train well? Do they grow with their parents? Does it change generations? Should there be a limit? etc.  
If it's a pattern where they grow and replace generations, doing it by week or month instead of day prevents boredom before growth, but too fast might mean training enough before lifespan runs out.  
Also, how many turns the pregnancy period should be is a challenge.  
Too short makes it difficult to incorporate pregnancy play into training and events.  
This is probably the most difficult part of the pregnancy system—timing affects the overall game system and dialogues.

A common pattern is shortening the pregnancy period, with children growing quickly and then staying at that state.  
This can keep balance from changing drastically even in variants that didn't have pregnancy originally.  
However, it's not suitable for enjoying sex while watching growth, or age-gap incest.

There are games with all ages where children appear, so you can apply methods from those.  
Make generations change quickly by shortening lifespan, or have time pass with each event, or have them time travel from the future the moment pregnancy is confirmed.

No method has been found that satisfies all desires yet. Think about what situations excite you most and plan your settings accordingly.

---

### Checking if a Specific Character is a Slave (Companion)

When the existence of a character (`ADDCHARA`ed) is a condition for event occurrence, you can check this with `GETCHARA` or `FINDCHARA`.

`GETCHARA` (character number) checks whether that character exists, and if so, at what position from the beginning.  
If they don't exist, -1 is returned, so when just checking existence, you use `IF GETCHARA(キャラ番号)!=-1`.
<!--
GETCHARALAST doesn't exist as a command
`GETCHARALAST` gives different results when multiple characters with the same NO exist, but for existing characters it's the same (not -1), so GETCHARA is better if there's no specific intent since it's fewer characters.
-->

Use `GETCHARA` when conditions are just character numbers (NO variable), but use `FINDCHARA` when checking by other conditions like `NAME` or `CFLAG`.  
You can do the same as `GETCHARA` with one character variable as the condition.

Since `FINDCHARA` can only specify one variable as condition, when conditions are more complex, you need to write your own processing.  
This would be writing a loop from 0 to `CHARANUM-1`, checking one person at a time.

---

## Other Topics
### Please Use UTF-8 for Character Encoding Whenever Possible

SHIFT-JIS is the standard character encoding for Japanese Windows, but it's hardly known overseas at all.  
Even if they know, once they understand the historical issues, they probably don't want to use it.  
As a result, overseas editors either can't display SHIFT-JIS files or some characters become garbled. There's no prospect of fixing this.  
Even Japanese editors are rarely completely Japanese-made, so there are still difficult situations.

As a result, the software usable for editing ERB files is significantly limited.  
Even if you find good overseas software and make ERB syntax highlighting settings, SHIFT-JIS files won't work well.  
When making ERB processing programs, the constraint is that you must use programming languages that support SHIFT-JIS.

In contrast, UTF-8 is now arguably the world standard. Overseas editors and programming languages all support UTF-8.  
Since basic building blocks for editor creation are already supported, editors can read and write properly even without their authors specifically thinking about world support.  
Sakura Editor had issues with UTF-8 handling before, but since version 2, it handles UTF-8 internally, similar to overseas software methods.  
If you need to use eramaker or old ERB compatibility programs, that's unavoidable, but I think there's no need to use UTF-8 for Emuera-only variants anymore.  
As UTF-8 spreads, various auxiliary software can become UTF-8-only, making them easier to create.

However, you shouldn't change character encoding when making patches.  
That makes added parts confusing for authors and users.  
For files that are additions rather than changes, you can use UTF-8, but it's probably better to keep consistency within the variant to avoid confusion.

Emuera seems to only support UTF-8 with BOM.  
In Sakura Editor's save screen, there's a checkbox labeled "BOM"—please check it.  
It's on the right side of the area where you select SJIS or UTF-8.  
Other tools also generally let you select one or the other. If given the choice between UTF-8 and UTF-8N, the one **without N** has BOM.

---

### Learning Programming Methods

Improving your erabasic skills requires learning other programming languages.  
This is because without knowing other languages, you can't distinguish between things that can't be done because it's era versus things that can't be done for other reasons.

Knowing many languages you use often, and languages you don't use but mostly understand, helps in various ways regardless.  
Most convenient eramaker tools are made with languages other than eraBasic.  
Emuera is made with C# language, and people who can handle C# can modify it to their liking. There are variants that actually use modified Emuera.

Even without something that large-scale, it's common to write suitable programs for work.  
For example, if you want to rename files like `chara0.csv`, `chara1.csv` to names like `chara0_あなた.csv`, you can write a program that can read/write files and do simple string processing to rewrite all files without typos.

Recently, online learning environments are well set up, so try various things and start with sites or languages that look good.  
In particular, sites where you write in a browser input form and submit to execute are great because you can start without installing anything.  
I think the first hurdle for beginners is getting to a state where you can program, not the program itself.

[Programming Self-Study: 10 Recommended Japanese Online Learning Services](http://techacademy.jp/magazine/938)

Starting with game production tools is also good.  
Some use that tool's dedicated language like erabasic, but here are some that can use general languages. There are plenty of beginner sites and explanations.

| Tool Name                      | Language Used |
| :---                           | :---          |
| RPGツクールVX・VX ACE          | Ruby          |
| Unity4                         | C#, JavaScript|
| NScripter                     | Lua(NLua)     |
| 吉里吉里2                      | JavaScript(TJS)|

You can use [paiza](http://paiza.jp/) to check your programming skill level.  
Originally a job change site, it has quiz games where you answer with programs, with problems from beginner to advanced levels.  
<!--
CodeIQ ended, so commented out
[CodeIQ](https://codeiq.jp/) grades including problem-solving approaches, not just results. There are sometimes language restrictions and time to get grading, but this is also usable if conditions are met.
-->

When you can't figure out how to solve a problem, or solved it but think there might be a more efficient method, studying algorithms is effective.  
It's the thinking and theory about how to solve various problems.  
There are books and online articles from beginner to advanced levels.  
For example, when making a character sorting system yourself, learning sorting algorithms makes a big difference in speed when the number of people increases.

---

### Reading TRPG Rulebooks

Making game systems means translating your brain settings into numbers.  
This sounds difficult, but doing the reverse—imagining settings from numbers—is something you do normally while playing era, so it's not that hard to understand.

The best way to research how to do this is to actually play games.  
But computer games often don't disclose detailed rules.  
Even strategy guides don't write detailed calculation formulas.

So this section recommends reading tabletop RPG (TRPG) rulebooks.  
Books cost about 1000 yen, and all you need is stationery. Dice can be replaced with smartphone or browser dice apps.  
Originally, several people gather and play using those rules, but for those interested in game systems, it's interesting as reading material.

TRPGs with adult content are fine, but all-ages games are also okay.  
This is because whether you create a strength stat to express strong vs. weak people, or a breast size stat to express large vs. small breasts, is fundamentally the same thing.  
Especially recent variants have more non-erotic systems like daily life and dungeon exploration, not just training.

Since different games and authors have various thinking, it would be good to reference those while making your own game.

There are many TRPGs, so let me recommend some:

- Sword World  
A TRPG themed around an orthodox fantasy world.  
Replay novels of actual play are popular and are in the light novel section.  
Currently in bookstores is the significantly renewed 2.0, but older versions are available as e-books or used books.  
For fans of old-style fantasy, the old version is recommended; for those who think dwarf (female) = loli, 2.0 is recommended.

- Suspect (サタスペ)  
A TRPG themed around the Oriental underworld.  
There are elements like prostitutes and crime in the rules, and there are many such parameters and skills. The downside is it's a bit pricey.

- Absolute Slave (絶対隕奴)  
An 18+ TRPG. It's a bit different from battle-fuck style, but you can defeat opponents in battle or make them slaves through training. If you really can't get motivated without ero, use this one.

- Rulebooks viewable for free  
There are books in libraries, but more are available online now.  
http://jinriki.tumblr.com/post/60355051949/trpg  
There are samples of the latest rules, out-of-print old rules, derivative works, original self-made games, and quite a number.  
The downside is many are somewhat hard to read, but the large quantity makes comparing rules easier, and by comparing, you can understand system characteristics and common patterns.

- Videos on video sites being played  
You don't have to actually play yourself, but you should understand how to play. It's easier to understand "so this number means this" while watching interesting videos.  
You often see works like "Paranoia" and "Call of Cthulhu TRPG."

- eraTRPG favorite characters  
Since it's a variant that trains TRPG replay novel characters, the characters have TRPG sources.  
To enhance play fulfillment, reading rulebooks and replays might be good.  
(There are multiple replay series for the same rules, so check which book the character appears in)

- Works you know the original  
For eraMegaten players, Shin Megami Tensei RPG, or for anime fans, Log Horizon TRPG. Knowing the original makes it easier to understand what settings they wanted to express with what numbers.  
(真・女神転生RPG's latest version (魔都東京200X) used in Knightail seems currently difficult to obtain. Like other out-of-print rulebooks, books from publishers can be viewed at the National Diet Library. You can ask nearby libraries to get them. There are individual differences in fit, so buying at premium prices is not recommended)

- Replay novels that were interesting  
Same as reading the original first makes things clearer, reading replay novels before rulebooks is clearer.  
A baseball or soccer player reading only the rulebook without knowing the rules probably won't understand at all.  
A game isn't necessarily fun just because a novel is fun (and vice versa), but the atmosphere differs. Same as getting motivation from having dialogues.

In addition to strategy and management elements, board games are also good references, not just TRPGs.  
Board games that support single-player especially should be reproducible in eramaker unless using really weird boards.  
(Reproduction is possible for versus games, but making them for versus or creating strong enough AI is difficult)  
Family computer and Game Boy games also have less complex mechanics than recent games, making systems easier to understand.  
You can make similar things as game systems, aside from pixel art graphics and music.

---

### How Not to Make Things Flavor (and How to Do It)

You often see the word "flavor" in era variant threads.  
It seems to be used in card games and TRPGs, meaning elements not directly related to play or rules.

In era variants, these are what are called dialogue and narration. Except for dialogues that also change some abilities, they're basically flavor text. Even with them, parameter and pearl gains are the same, but the feeling during play differs.  
You sometimes see elements like hair color, but they only serve for imagination and have no meaning in the rules.  
Some variants don't give effects to clothing, while others have different available commands or parameter changes depending on clothing.

It's fine when flavor functions are made that way, but otherwise the function often goes unused, which is unfortunate.  
Also, making new patches can sometimes make traditional functions meaningless.  
This section writes about how to prevent things from becoming flavor. (You can intentionally make things flavor by doing the opposite)

- Make differences  
It's flavor because it has no rule-based difference whether it's there or not, so make it different when present or absent.  
For example, the "巨乳" (big breasts) talent changes available commands, but in variants where only characters with "巨乳" appear, "巨乳" becomes a flavor talent—because the talent has no effect on training methods or selling prices for that character.  
(For derived variants, it's easier to give everyone the talent than modify the system for big breasts just for convenience of reuse)  
You don't see the "美人" (beautiful) talent probably because you don't need to make a talent when only "美人" appears. Some variants add the reverse attractive talent for random characters.  
The "人間" (human) talent isn't needed when only humans exist, but in variants like eraMegaten, species is an important parameter.  
You might want to give everyone "魅力" (charm), "プライド高い" (proud), "Ａ敏感" (anal sensitive), but if you overuse them, character individuality thins out. It's better to have varied talents for character variety, making talents meaningful.  
Incidentally, the "処女" (virgin) talent doesn't become flavor even if given to everyone. Even without character differences, there are differences between when "処女" is present and when it's not, affecting play.

- Relate to game purpose  
Whether something is flavor depends on the game's purpose.  
The game's purpose is normally an ending, but there can be multiple endings or achievements.  
For example, day display is important as a rule if there's a day limit in clear conditions, but becomes flavor if you don't need to count days.  
Variants where you never have money troubles, money doesn't have much meaning.  
If you want play where money matters, you must relate it to clear conditions or training intensity.  
Some variants or mode settings have no particular purpose, in which case the entire system becomes flavor for enjoying situations.  
Even in games like SimCity, there are achievement-like mechanisms where you're praised at certain population milestones, with motivation to aim for the achievement max of 500,000. I think some kind of goal or being praised makes games more game-like.

- Change based on situation during play  
If there are superior commands or choices in all situations, you only need to use those, so inferior commands lose reason to be used.  
Simply making the inferior one stronger just reverses which is superior, making one always flavor.  
Making mechanisms where advantages and disadvantages change by situation allows usage differentiation by case.  
In eraKanon, for characters with low C feeling, E massager is overwhelmingly efficient, but when C feeling has increased, vibrators give greater C pleasure per energy.  
(Balance of energy and stamina consumption, and source amounts differ slightly too)  
In eraKanon, depending on talents, training with SM commands goes more smoothly than pleasure or service commands, but in some variants where SM effects are low for everyone (or until stamina runs out), the entire SM system becomes hard to use.  
The eraToho A and derived variant route branches create uses for SM by increasing sell prices or making dialogue branches when trained with SM.

- Add usage restrictions  
Even if there's an absolutely superior choice, adding some restriction to the superior side creates situations where both commands are needed.  
For example, many variants have the effect decrease for consecutive same command use—this gives reason to use up to 2 commands. Checking up to 2 commands before allows up to 3.  
Restrict powerful commands to once per day, or have achievements that unlock when not used if used.  
Another restriction is requiring expensive devices or disposable items, but that has no meaning if money is flavor.  
If players judge something too powerful, they might do self-imposed challenge play on their own. That's the player's freedom, but it's better for game side to adjust so commands you want used can be used without worry.

- Make people notice the above  
Even with adjustment, it's meaningless if no one notices the intent.  
In eraKanon, if there are limited characters and commands, having people investigate is one of the funs, but in large-scale variants, trying all patterns is enormous.  
If it's made as flavor with little effect, people probably think "there must be flavor since it's not effective"—questions don't come.  
For commands with limited effective situations, it's probably better to have hints like writing in spoiler text, having villagers tell you in-game, or something.

When adjusting while listening to player opinions, it's easier to get opinions and have guidelines for incorporating them if you attach what direction you want, like "I want commands like this to be usable in situations like that" or "I want to keep △△'s strength but not allow spamming."  
It's also good to write when new features are flavor, especially those with difficult triggering conditions—they might unintentionally become traps in game progression.

---

### Use Version Control Systems

<!--
//I was unsure whether to recommend to beginners or if it would cause problems instead, but I think beginners need it specifically, so I wrote it for now.  
//If there are low-trouble methods or good intro sites, please correct, and also if there are usage examples for writing dialogues  
-->

Version control, simply put, is keeping a history of updates so you can look back later.

It's common to keep history by saving old data in zip or writing progress in comments or text files.

The difficulty with this method is that file-level comparison doesn't show where in the file the difference is, and saving too finely increases file count and capacity.  
That's why dedicated version control systems, which solve these problems, are commonly used in programming.

The basic usage is to install a version control system in advance, then set the folder containing the variant etc. for use with the version control system. This is called creating a repository.  
After that, after normally saving in the editor, you register changed files as update history at roughly each feature addition, or at suitable breakpoints. This is called a commit.

Later, you can find things like "Which files were changed on what date?" or "On which dates was this file changed?"  
When you think "What was this part changed for?", you can trace history to find out, and if you think this change was a failure, you can revert it.

Those who use WinMerge are probably used to diff displays—version control systems store these diffs. They only save where changes exist, so it's more efficient than saving all versions in zip.

Version control data is unnecessary for playing, so it's often not included in distribution files, but sometimes it's attached for developers, or accidentally included.  
Actually, quite a number of people probably use version control to manage their own variants and compilations. It's also used for Emuera development.

When developing patches, you sometimes have trouble when the parent version updates during production, but since you can see update history in diffs, it's easy to merge your added parts with what's been added to the parent.  
Even when saying "the same file," the parts being changed are often completely different, so most of the time the fixes complete automatically.  
Bugs from overwriting with old files are rare, and when they occur, understanding and fixing the cause is easy.

There are difficult parts when merging patch development, but just recording changes and checking them is relatively easy, so if interested, please try once.  
It was originally something only programmers used, but it's actually a mechanism usable for various purposes since it just manages file update history.  
It seems to be used in fields like Office data, illustrations, and novels too. The same kind of troubles happen in any field—accidentally overwriting with a weird state or thinking the previous version was better.

There are various like Subversion (SVN), Git, Mercurial, etc., each with slightly different specialties, but they all have the same mechanism of registering diffs as update history and handling them later.  
If something appeals to you from intro or comparison sites, use that; if nothing stands out, SVN or Git, which have the most users, are easier to look up when in trouble.  
eraRorona has data for the Bazaar system attached.  
Any system is fine, but using GUI software like TortoiseSVN, TortoiseGit, or SourceTree is recommended rather than direct command line.


---

# erawiki-title.en
---
# Variant Creation/Title Preparation

Original page:  
[era series discussion thread, Summary Wiki V3, Title preparation](https://seesaawiki.jp/eraseries/d/%a5%bf%a5%a4%a5%c8%a5%eb%bd%e0%c8%f7%ca%d4)  

---

- [Tutorial](erawiki-tutorial.md)
- Title Preparation
- [Title Practice](erawiki-title2.md)
- [ERB Creation Practice](erawiki-ERBmanual.md)

---  

## Preparation for making a title screen
I don't have a good grasp of the vanilla system, but I have the initial environment set up.

I want to make a game quickly.
Let's make a title screen that shows that spirit.

When I think of existing variant works,
there are all kinds of title screens, such as the familiar simple black screen as if there was a unified standard,
ASCII art, or the use of images.

I'm suddenly saying something that contradicts the headline,
but in fact there is no need to make a title screen for era.

So, this section will be a headline fraud for a while.
But I hope you'll read it, as it should be useful even if you end up making it yourself.

---  

### GameBase.csv

Let's open the CSV folder, `GameBase.csv`.

```
Code, 326136
Version, 110
Title, erakanon (minimum)
Creator, Sato Satoshi (Circle Baku)
Year of production, 2005-2006
Additional information, (※This is a sample game for eramaker, a tool for creating training SLGs.)
```

It what it says.

---  

### Change the title

Replace this:
```
Title,erakanon(minimum)
```

with this:

```
Title,your idea
```

, save it, and try launching Emuera.exe.

The name displayed in the upper left corner of the window should change to

>Your idea 0.11

The center of the screen should change to

>Your idea

.

You may have already noticed, but just by changing `Gamebase.csv`,
the displayed information will change and the title screen will be created.

"No! I can imagine a cooler title! I want to make it myself!! !"
Some people may think this.
However, even if you want to make your own title screen, try using the information entered in `Gamebase.csv`.

When you change your mind and want to change the title,
or when you want to update and change the game version.
The fewer places you have to change, the better.

Even if you create your own, if you make it so that "when you change only Gamebase.csv, the information displayed on the title screen automatically changes", it will be easier to make future changes in one place.

If that's all you want,
you might think, "If I don't use Gamebase.csv and just manage the file for title display, I can make the changes in one place, right?"

However, there are times when it is convenient to specify `Gamebase.csv`, such as the fact that the `Gamebase.csv` variable cannot be assigned (WINDOW_TITLE can be assigned) and
that it manages whether save data can be loaded depending on the version.
It also has the advantage that it is easy for others to see where the information is.
Some people check `Gamebase.csv` to check the version and then report an error.

So, regardless of whether you actually use it or not, it is useful to know how it can be used.

---  

### Change the window title

Somewhere near this:

```
Title,Your idea of ​​title
```

Try adding this line:

```
Window title,Your idea of ​​window title
```

The center of the screen will remain

>『Your idea of ​​title』

but name displayed in the upper left corner of the window will change from

>『Your idea of ​​title 0.11』

to

>『Your idea of ​​window title』

.

There is no mention of this in the eramaker manual.
Because it is a function added to Emuera.

- [EmueraWiki→Variables→csv related→WINDOW_TITLE](https://evilmask.gitlab.io/emuera.em.doc/Emuera/variables.html#window_title)

```
The initial value is the value set for "Window title" in gamebase.csv.
If "window title" is not set,
it will be generated from "title" and "version".
If "title" is also not set, it will be "Emuera".
```

... is what it says.

If you want to change the displayed window title for some reason, such as not wanting to display the version in the title,
it is a good idea to specify the window title like that.

---  

### Change the author

```
Author, Satoshi (Circle Baku)
```

Let's change it to

```
Author, your handle name
```

.

You are the author of this variant.
It seems that there is an item in `Gamebase.csv` assuming that the author name will be changed,
so there is no problem in changing the author item here.

Regarding the copyright of the creators of era vanilla and Emuera, please read the separate Readme that is included.
(Emuera has a Readme that is intended to be included.
It seems that eramaker does not have a Readme with a separate license description.
It can be left in the title postscript introduction, or a site introduction can be attached to your own Readme,
or some other form of guidance can be included, such as including an instruction manual with a license description.)

It is important to respect your predecessors and respect copyright.
However, if you are shy and leave the author as is, another problem will arise.
This can cause inconvenience to tool developers and base variant developers, as they may be mistaken as being involved in the creation of their own work, and inquiries about errors caused by modifications may be sent to the other party.

Therefore, make the contact information clear.
You can also write a disclaimer saying that you cannot answer inquiries.

---  

### About licenses
I touched briefly on copyright.
There are people who have written about licenses, so learn about them and avoid trouble.

- [Beginner's course for production → Useful links for production → About licenses](https://evilmask.gitlab.io/emuera.em.doc/manual/WhatIsLicense.html)

---  

### What's a code?
Let's play around with the other items.

I think the line that's the most confusing is

>Code,326136

.

For those who don't need to understand the meaning and just want to get going, I'll give you the conclusion first:
For now, just put in a number between 100000 and 100000000 that is unlikely to overlap.

- [Bakuto, Baku eramaker CSV file format (provisional)](https://cbaku2.sakura.ne.jp/b/erakanon/eramacsv.html)

If you look at it, it says:

>Code,(number)
>Set the game code to (number).
>This is used to prevent accidentally loading save data from a different game.
>(number) can be any value.

It says.

It can be any number that doesn't overlap with other games, it's like an ID.

Some people would rather specify as many digits as possible and make the numbers as unique as possible.
What is the limit for digits?

- [EmueraWiki → Differences from eramaker → How to read the gamebase.csv "code"](https://evilmask.gitlab.io/emuera.em.doc/Emuera/differences_of_Emuera_and_eramaker.html#gamebasecsv)

Reading what is written here,
In the case of eramaker, if the number of digits exceeds the limit, it will be automatically specified by partially removing them.
<!--
It seems that the number of digits was really anything.
However, there is also the confusing aspect that it is not treated as it is actually specified.
-->

In the case of Emuera, if the number of digits exceeds the limit, it seems to be treated as 0.
It says that if it is 0, it will be read regardless of the game code.
The range is "-9223372036854775808 to 9223372036854775807" (64 bits).

This is to prevent malfunctions, so avoid repeating numbers such as a string of the same numbers or numbers with nice round numbers.

<!-->
This page contains a list of links to eratoho Matome V3, which contains detailed information about variables.
[[Advanced]]
-->

---

### What is a version?
If you keep overwriting, you won't be able to restore if you make a mistake.
It's better to save it when you've completed a section and add new elements based on the copy.
That way, if you make a mistake, it's easier to restore the saved data.

To keep the backup from becoming a mess,
the version is a number that is assigned according to the progress of the production.

By increasing the number every time you update, it's easier to see how much has been updated.

- [eramaker CSV file format (provisional)](https://cbaku2.sakura.ne.jp/b/erakanon/eramacsv.html)

If you look at it,

> The screen shows the value obtained by dividing (the number) by 1000 (100 is 0.10)

It explains that.

Currently, the version is

```
Version,110
```

Let's change that like this:

```
Version,100
```

The number displayed on the title screen will be 0.10.

Let's try this:

```
Version,112
```

The number displayed on the title screen will be 0.112.

By default, two decimal places are displayed,
and the third decimal place will be omitted unless specified.

With that in mind,
how you actually manage it is up to each individual,
specify it in a way that is easy for you to manage.

For example,

- The first digit is the major version

(When it is a huge update that affects the whole game, or when compatibility of save data is lost)

- The first or second digit after the decimal point is the minor version

(When small additions such as features are made)

- The third digit after the decimal point is the bug fix

There are ways of dividing like this (probably the way it is divided by default)

The first digit is the major version
The digit after the decimal point is the minor version

The first digit is the major version
The digit after the decimal point is the minor version
The second digit after the decimal point is the patch
The third digit after the decimal point is the bug fix

There are also ways of dividing like this, where the number of digits is increased to 10,000 without using the display that automatically divides, and
The display is displayed as `X.XX.XX`, and compatibility is lost. Elements are added. Bug fix

There are also ways of dividing like this. In any case, patch authors often do not touch `Gamebase.csv`, so it is possible that it will never be touched unless someone compiles it.

There are also version control systems, and many people use them.

- [Thread about the era series Summary Wiki V3 → System modification Q&A → Other → Using a version control system](https://evilmask.gitlab.io/emuera.em.doc/manual/erawiki-modification-QandA.html#_17)

By increasing the number every time you update, it's easier to see how much has been updated.

- [Thread about the era series Summary Wiki V3 → System modification Q&A → Other → Using a version control system](https://evilmask.gitlab.io/emuera.em.doc/manual/erawiki-modification-QandA.html#_17)

---

### What is the year of production?
It is the time when it was made.

```
Year of production, 2005-2006
```

Some people may be surprised to see this.
It gives a sense of the depth of history.

For those who are going to make one in the future, let's just write

```
Year of production, 2024
```

. (As of 2024)  

---  

### What is additional information?

```
Additional information, (※This is a sample game of eramaker, a tool for creating training SLGs.)
```

You can write any additional information you want here.
Introduction to the tool, introduction to the original variant, age warning, or writing it separately if you don't want to display it, etc.

---  

### Do you accept version differences?
Set it to the minimum version at first. If you set the version to 1, set it to 1.

When updating to break compatibility, if you just notify players that there is no compatibility,
players who do not notice will continue to play with old data and report it as a bug.

If you set this when updating to break compatibility,
old save data from before that version will not be able to be loaded.

When updating to replace some variables,
you usually write a process to fill in the discrepancy in `@EVENTLOAD`, which is loaded immediately after loading,
so that compatibility is not lost.
<!--//(2021/05/12 Added after being pointed out in the wiki editing thread. Thank you) -->

Cutting compatibility is a last resort, except when making a major update that makes you want to play from the beginning again.
The more people who play,
the more people will be shocked and say, ``I wish I hadn't upgraded if I couldn't load my important save data!''
This may not be the case for short games.

There are probably cases where they would rather accept the loss of compatibility and the possibility of bugs than have their saved data become unusable.

---  

### Starting character, no items
This depends on the game you're making, so I'll leave it out for now.
Starting characters are used in eralight.

---  

### Variables in which the entered information is stored
This information is stored in the following variables,
so it can be called up and used from within the game.

- [EmueraWiki → eramaker basic developer information → Emuera extension syntax → Constants and variables](https://evilmask.gitlab.io/emuera.em.doc/Emuera/variables.html#gamebasecsv)

Even if you create your own title, if you use these variables to display it,
the only thing you need to change when updating is `Gamebase.csv`.

As it says, these are non-array, non-assignable, and non-saved variables,
they cannot be rewritten from the ERB side.

---

Next page → [Title Practice](erawiki-title2.md)


---

# erawiki-title2.en
---
# Variant Creation/Title Practice

Original page:  
[era series discussion thread, Summary Wiki V3, Title practice](https://seesaawiki.jp/eraseries/d/%a5%bf%a5%a4%a5%c8%a5%eb%bc%c2%c1%a9%ca%d4)

---

- [Tutorial](erawiki-tutorial.md)
- [Title Preparation](erawiki-title.md)
- Title Practice
- [ERB Creation Practice](erawiki-ERBmanual.md)

---

## `SYSTEM_FLOW.ERB`
Despite the heading saying "let's create a title,"  
what I've written so far was actually about how NOT to create a title.  
Some of you might be getting tired of this.

Let's open etc1821.  
There's a file called `SYSTEM_FLOW.ERB`. Let's open it.

```
;[LICENSE]Public Domain  
;I relinquish copyright for this file.  
;I will not exercise moral rights for this file.  
;2015/11/01 MinorShift (Emuera author)  
```

It's written here.  
They not only provide tools, a generous license, and wiki guidance, but they also support introductions.  
I'm grateful. I'll write while venerating the depth of MinorShift's generosity.

When you scroll down further, you'll find

```
;If @SYSTEM_TITLE is defined, SYSTEM_TITLE is called instead of the default title screen.  
@SYSTEM_TITLE  
```

The `;` is a marker that tells the processor "everything from here to the end of the line is a comment, so don't read it as code."  
In other words, the line "If @SYSTEM_TITLE is defined..." is explanatory text for anyone modifying the code.

Of course, comments are also written so the author won't forget things, but overall, the content in the etc1821 folder feels like it's written to teach.  
Half the work of deciphering ERB is following these helpful comments left in Japanese.

This explanation means:  
If there's a line anywhere in any ERB file in the ERB folder

```
@SYSTEM_TITLE  
```

Then instead of showing the title screen we've been seeing all this time, the processing written below this will be displayed instead.

---

## Creating a New File!
Now, let's return to the erakanon folder.  
Let's create `TITLE.ERB` inside the ERB folder.

---  

## What is Encoding?
Different variants may use different encodings.

To humans, characters are characters, but computers assign numbers to each character,  
and determine "this number means I should display this character."

Encoding is that criterion - which number is assigned to which character.  
It's also called "character code" to distinguish it from video encoding.

In the past, there was no standardization, so there are several types of encoding.  
If you try to read with a different assignment, the computer gets confused and garbles the text.

|Editor|Default Encoding|Change Method|
|-:|:-|:-|
|Windows Notepad|Win10 201903 and later:<br>UTF-8 without BOM<br>Otherwise: Shift-JIS|Cannot change|
|Hidemaru Editor|Shift-JIS|Other (O) → Check Expert Settings → File~~ → Encoding 1 → When creating new/ASCII → Change (D)|
|Sakura Editor|UTF-8 without BOM|Settings → Type-specific Settings List → Basic → Settings Change → Window Tab~~ → Default Character Code|
|Visual Studio Code|UTF-8 without BOM|Set files.autoGuessEncoding to checked (true) in Settings (`Ctrl+,`) for auto-encoding to work|
| | |Change default encoding in Settings (`Ctrl+,`) files.encoding |
| | |Select UTF-8 shown at bottom right of window, then select Japanese (Shift JIS) from the appeared action list to change temporarily|

The major encoding used to be `Shift_JIS`,  
but now for modern era, `UTF-8 with BOM` is becoming common.

There are several reasons for this, and someone on the wiki explains it.

- [System Modification Q&A → Other → Please use UTF-8 as much as possible for character codes](erawiki-modification-QandA.md#utf-8)

As you can see from its creation year, erakanon is an older work and uses `Shift_JIS`.  
If your editor shows encoding, it should display that.  
Encoding and line breaks are usually shown in the bottom right corner.

Mixed encodings can cause reading failures and garbled text.  
If you're going to modify for a long time, I think it's best to convert all files to UTF-8 with BOM.

Saving each one individually is tough. Use encoding change tools to do it all at once.  
For now, if you haven't changed anything, just create it with Shift_JIS.

<details><summary>Supplementary info you can skip for now</summary>

There's another thing involving UTF-8. To define save-enabled character-type variables and multidimensional string variables using `#DIM SAVEDATA` in Emuera's ERH,  
you must set the config "Save data in binary format" to YES.  
When set to YES, save data is automatically saved in UTF-8.

</details>

---  

## `@SYSTEM_TITLE`
Make sure your created `TITLE.ERB` is in Shift-JIS encoding, then

``` { #language-erb title="ERB" }  
PRINTL Title Screen  
WAIT  
```

Try inputting this.

When you start the game, instead of when the title screen was displayed before,  
the text "Title Screen" will be displayed and the game will pause.

---  

## emuera.log
Clicking causes an error.

``` { #language-erb title="ERB" }  
An error occurred at the end of a function.  
Unexpected script end.  
***Check the log file for details, output to emuera.log  
```

This "emuera.log" will be your long-term partner when modifying era.  
Close the game for now.  
A file called emuera.log has been created where Emuera1824.exe is located.  
This saves what errors occurred and where.

How many warnings you receive can be set in config.  
One of the Emuera creators, `妊)|дﾟ)`, has published recommended developer settings. Very helpful.

- [eratoho wiki V3 → Emuera Notes → Emuera Tutorial for Developers](Emuera-etc.md#emuera_1)

There's also a one-click developer mode that automatically applies these settings now.

---  

## Where are Function Boundaries?
Let's continue looking at SYSTEM_FLOW.ERB.

`@something` = functions  
may have only one per file, but  
when there are two or more, everything up to the next `@something` is one group.

So the contents of @SYSTEM_TITLE are as follows.  
Try copying everything to TITLE.ERB.

``` { #language-erb title="ERB" }  
@SYSTEM_TITLE  
#DIMS VERSIONNAME  
;At this timing, reading global variables prevents missed data.  
;GLOBAL is not initialized or overwritten by RESETDATA or LOADDATA.  
;Uncomment as needed.  
;LOADGLOBAL  

;Create version notation in VERSIONNAME.  
;1001 displays as 1.001, 1100 displays as 1.10  
VERSIONNAME = {GAMEBASE_VERSION / 1000}.%TOSTR(GAMEBASE_VERSION % 1000 / 10,"00")%  
SIF GAMEBASE_VERSION % 10 != 0  
	VERSIONNAME += TOSTR(GAMEBASE_VERSION % 10)  

;Title display.  
DRAWLINE   

ALIGNMENT CENTER  
PRINTFORML %GAMEBASE_TITLE%  
PRINTFORML %VERSIONNAME%  
PRINTFORML %GAMEBASE_AUTHOR%  
PRINTFORML (%GAMEBASE_YEAR%)  
PRINTL   
PRINTFORML %GAMEBASE_INFO%  
ALIGNMENT LEFT  

DRAWLINE   

;Choice display  
$TITLE_SELECT  
PRINTSL "[0] " + GETCONFIGS("システムメニュー0");  
PRINTSL "[1] " + GETCONFIGS("システムメニュー1");  

$TITLE_INPUT  
INPUT  
IF RESULT == 0  
	RESETDATA  
	;ADDDEFCHARA exists as a dedicated function to reproduce eramaker's initialization process.  
	;Use ADDCHARA in other situations.  
	ADDDEFCHARA  
	BEGINWORD '= "FIRST"  
	CALL MAIN_LOOP  
ELSEIF RESULT == 1  
	CALL LOADGAME_EX  
	GOTO TITLE_SELECT  
	;If returned from LOADGAME_EX without LOADing, select again.  
ELSE  
	REUSELASTLINE Invalid value  
	GOTO TITLE_INPUT  
ENDIF  
```

---  

## What is DIM?
Let's look at the first line.

``` { #language-erb title="ERB" }  
#DIMS VERSIONNAME  
```

This, generally called `DIM`, is called a "user-defined variable."  
"User" here refers to Emuera users - people who make games with Emuera.  
(Players are end users)

In other words, it's a variable that we can define, with any name we like.

Japanese can be used too. However, opinions differ on using Japanese in variable names.  
Those who actively use Japanese names to improve readability.  
Those who find it confusing when combined with Japanese strings.  
Those who combine English keywords because grep searches catch the main text when searching.  
It depends on personal preference.

DIM must be written on the next line after `@something`.  
(For expression functions, `#FUNCTION` or `#FUNCTIONS` comes first, and there's also ERH, a dedicated file for making variables usable across a wider scope)

``` { #language-erb title="ERB" }  
#DIM 喜欢的名字  
```

is a box that can hold numbers.

``` { #language-erb title="ERB" }  
#DIMS 喜欢的名字  
```

is a box that can hold strings.

(Generally, adding `S` at the end means the string version.  
 `#FUNCTION`, `#FUNCTIONS` are the same.  
 String translates to "character" or "string".  
 In .NET and other languages, string-related processing is called String class or String object.  
 `S` is the abbreviation.)

Declaring variables like this is called "declaring a variable."

There are various other patterns too.

- [EmueraWiki → eramaker basic Developer Info → Emuera Added Extended Syntax → User-defined Variables](../Emuera/user_defined_variables.md)

Give variables names that make their contents clear and searchable to improve readability.  
Prevent multiple people from using the same variable for different purposes and accidentally overwriting.  
This is why `LOCAL`, `LOCALS`, `ARG`, `ARGS`, `A`, `B`, `C`, and other single/two-character variables are often replaced with user-defined variables.

- [era series discussion thread wiki V3 → System Modification Q&A → Basics → About Private Variables (A-Z and LOCAL, not #DIM)](erawiki-modification-QandA.md#azlocaldim)

Old processing is hard to understand and tedious. I understand someone wants to convert everything to `DIM`.  
But don't ask those who clean up "why don't you update to the latest?"  
When everyone plays around and leaves, the room is a mess, asking the host "why don't you clean?" makes you seem like a demon. That happens too.

Here,

``` { #language-erb title="ERB" }  
#DIMS VERSIONNAME  
```

is used, so a string box named `VERSIONNAME` is being created.

---  

## What are Global Variables?
Let's look at the next line.

``` { #language-erb title="ERB" }  
;At this timing, reading global variables prevents missed data.  
;GLOBAL is not initialized or overwritten by RESETDATA or LOADDATA.  
;Uncomment as needed.  
;LOADGLOBAL  
```

This line can be ignored if you're not using global variables.

Global variables are variables used throughout the game.

Even saying "throughout," it's hard to imagine.

For example, you play the game and save Save Data A.  
You start fresh again and save Save Data B.  
Data A and B don't interfere with each other.  
These are normal savable variables.

However, information for both A and B can sometimes be stored in the same place.  
Like the recall mode accessible from the title screen, or saving config settings.

The recall mode accessible from the title screen usually allows viewing events regardless of save data - as long as you've seen the event in any save, you can view it in recall.  
Flags are set for events seen in A and events seen in B.  
Config settings can also be loaded from A and used in B.

These are called global variables - variables used across the entire game, not bound to save data.

When savable, it's sometimes called global save data.  
Global save data is saved separately in a file called global.sav.

|Variable Name|Property|
|:-|:-|
|GLOBAL|Savable with SAVEGLOBAL command, loadable with LOADGLOBAL command.|
|GLOBALS|String version of GLOBAL.|
|#DIM GLOBAL SAVEDATA 喜欢的名字|DIM version|

If you're using global variables, here

``` { #language-erb title="ERB" }  
;LOADGLOBAL  
```

remove the `;` to uncomment

``` { #language-erb title="ERB" }  
LOADGLOBAL  
```

so that global variables are loaded here and reflected in the game. Use as needed.

---  

## Calculating and Stringifying Version
Let's look at the next line.

``` { #language-erb title="ERB" }  
;Create version notation in VERSIONNAME.  
;1001 displays as 1.001, 1100 displays as 1.10  
VERSIONNAME = {GAMEBASE_VERSION / 1000}.%TOSTR(GAMEBASE_VERSION % 1000 / 10,"00")%  
SIF GAMEBASE_VERSION % 10 != 0  
	VERSIONNAME += TOSTR(GAMEBASE_VERSION % 10)  
```

At first glance, it looks despairing - what is this? The hurdle is too high. You might laugh.

Actually, it's just dividing by 1000. Due to era basic's limitations, decimal results can't be handled.

- [eratoho wiki V3 → Development Related → ERB Syntax Tutorial 2 → Decimal Multiplication](eratohowiki-ERBmanual.md#_36)

So when displaying the version, to make it look like a decimal,  
preparations are being made to format the numbers as strings.

So here, you can ignore this and pretend you didn't see it - leave it to this calculation.  
If you want to understand, let's go through it step by step.

### VERSIONNAME
This is the user-defined variable declared earlier.  
Since it was declared with `DIMS`, it can hold strings.

It looks like various calculations are being done on the right side, but  
you can see that the result is being treated as characters.

### GAMEBASE_VERSION
Information related to Gamebase.csv that appeared earlier has finally arrived.  
`GAMEBASE_VERSION` contains the version set in Gamebase.csv.

Recall that versions are usually displayed like `1.01` or `0.001` with decimals,  
but in Gamebase.csv, it's written as a four-digit number like `1001`.

To make it look like a version, dividing by 1000 works.  
However, decimal results can't be obtained.

So,  
before the string `.`, place the four-digit version divided by 1000.  
After the string `.`, place the remainder of the four-digit version divided by 1000, further divided by 10, as a two-digit zero-padded string.  
If there's a remainder, place it after that as a string.

When concatenated, it becomes a string that looks like a decimal.

(Think of it as splitting: first digit is major version,  
 first to second decimal places are minor version,  
 third decimal place is bug fix)

It's tempting to think "why not just make it a string from the beginning if this much work is needed?"

But there's a reason the version needs to be a number.  
Even though it's unfamiliar, even though it's the same number `1`, if you ask the computer to treat it as a string, it can't do calculations.  
Characters are just character information - whether it's a number or plain text, the computer has no way to distinguish (unless you create a function to distinguish)

One difference between numbers and strings is whether you can perform calculations or compare magnitudes.

If you want to specify that versions 0.8 and below have no compatibility,  
you don't want to specify each one with strings like 0.7 is no good, 0.6 is no good...

Being able to make all numbers below that one value invalid by just specifying "accept version differences?" in one place in Gamebase.csv is easier.  
For that, it must be a number.

So, although it looks like complex processing is being done,  
it seems to be a workaround to format the display.

### What is `{~~}`?
You might understand vaguely what's being done, but if you can't decipher it yourself, it doesn't matter.  
There are several unfamiliar symbols.

`{~~}` is called a FORM string, FORM syntax, or formatted string.

When used with commands like `PRINTFORM` or `CALLFORM`, it can expand variables and variable calculations.  
You might not understand this yet if you've never opened an ERB, but you've probably seen it in character dialogue and narration - lines like:

``` { #language-erb title="ERB" }  
PRINTFORM Affection level became {CFLAG:TARGET:好感度}.  
```

`{~~}` has two uses.  
Here, it's being used for purpose #1: "give me the variable's contents, or the result of a calculation."

``` { #language-erb title="ERB" }  
VERSIONNAME = {GAMEBASE_VERSION / 1000}～  
```

`GAMEBASE_VERSION` is being divided by 1000. That's extracting the thousands place.  
Because it's wrapped in `{}`, the result can be displayed.

If the version specified in Gamebase.csv is `1`, then `GAMEBASE_VERSION` containing it is also `1`.  
`/` means `÷`, so `1 / 1000 = 0.001`, but era discards decimal places. The result is `0`.

`GAMEBASE_VERSION / 1000` is wrapped in `{}`, and the result `0` is a number, but since the expression following it is a string,  
by adding, the number is also treated as a string and assigned as a string to `VERSIONNAME`.

Use #2 of `{~~}`: "line concatenation" is not related here yet, so I'll link to the wiki's explanation.

- [EmueraWiki → eramaker basic Developer Info → Emuera Added Extended Syntax → General → Line Concatenation](../Emuera/expression.md#_2)

---  

### What is `%~~%`?
`%~~%` means "give me the contents of a string variable, or the result of a string calculation."

It's used for strings, not numbers.  
Essentially, this is the string version of `{~~}` use #1: "give me the variable's contents, or the result of a calculation."

``` { #language-erb title="ERB" }  
VERSIONNAME = {GAMEBASE_VERSION / 1000}.%TOSTR(GAMEBASE_VERSION % 1000 / 10,"00")%  
```

The `.` after `{GAMEBASE_VERSION / 1000}` is just a string.

``` { #language-erb title="ERB" }  
%TOSTR(GAMEBASE_VERSION % 1000 / 10,"00")%  
```

This is wrapped in `%%`.  
You might wonder why it's a string when `GAMEBASE_VERSION` is a number.

``` { #language-erb title="ERB" }  
GAMEBASE_VERSION % 1000 / 10  
```

This calculates the remainder when divided by 1000, then divides that by 10.  
This is something that can only be done with numbers.  
That's where `TOSTR()` comes in.

---  

### What is `TOSTR()`?
This means "convert to string."

`TOSTR()` is a function usable in expressions, pre-built into Emuera.

- [EmueraWiki → eramaker basic Developer Info → Emuera Added Extended Syntax → Functions Usable in Expressions → str TOSTR(int value, str format = "")](../Reference/TOSTR.md)

There are many convenient expression functions, but there are too many to memorize.

The mysterious English-looking parts that aren't default variable names or DIM-declared names are mostly commands, and commands don't have `()`.  
If they have `()`, they're functions, and if they appear abruptly without `@` or `CALL`, they're functions usable in expressions.  
Search the page listing these expression functions.  
(Whether this judgment is correct aside, I think you can mostly find things this way)  
[List of Commands and Expression Functions](../Reference/README.md)

Press CTRL and F together to open the browser's page search.

When searching, searching for including what's inside `()` won't find it.  
Search for just the word before `()`.

If it's not there, try grep searching in the variant's internal files.  
You want to find where the processing is written, so search with `@search term`.  
If found, it was a custom expression function someone created.

- [era series discussion thread wiki V3 → System Modification Q&A → Basics → How to GREP](erawiki-modification-QandA.md#grep)

(If using Visual Studio Code or other editors, some people have published features that automatically open the file where a function or expression function name is defined when clicked)

In any case, `TOSTR` converts numbers to strings.

It's convenient for adding commas to numbers or zero-padding to align digit count.

Here,  
it's specified as `"00"` to display numbers like `01, 02, 03...` as two digits with zero-padding even for single digits.  
(Zero-padding like this is sometimes called zero padding)

---  

### What is `SIF`?

``` { #language-erb title="ERB" }  
SIF GAMEBASE_VERSION % 10 != 0  
	VERSIONNAME += TOSTR(GAMEBASE_VERSION % 10)  
```

`SIF` is a type of conditional branch - a simplified one-line version of `IF～ELSE～ENDIF`.

- [eramaker ERB File Format (Provisional) → Variables and Commands → Commands → Conditional Judgment](../eramaker/ERB_format.md#_4)

SIF executes the next line if the conditional expression is not 0 (when true). If 0 (when false), it skips the next line.

``` { #language-erb title="ERB" }  
SIF XXXXX  
```

The `XXXXX` is where you write the condition.  
The next line is the processing to execute when the condition passes.

``` { #language-erb title="ERB" }  
SIF GAMEBASE_VERSION % 10 != 0  
```

Here, it means if the remainder when dividing `GAMEBASE_VERSION` by 10 (`%` calculates the remainder)  
is not 0 (`!` means negation, so `!=` means "not equal to")  
Dividing by 10 and getting a non-zero means there's a ones digit.  
The remainder is the ones digit itself.

So,

``` { #language-erb title="ERB" }  
SIF GAMEBASE_VERSION % 10 != 0	;if there's a ones digit  
	VERSIONNAME += TOSTR(GAMEBASE_VERSION % 10)	;add the ones digit as a string  
```

Note that some people don't like `SIF` because when processing increases and lines get longer, it needs to be rewritten as an `IF` statement, comments make lines hard to read, and commenting out processing affects the next line.  
On the other hand, once you're used to it, it's convenient and tends to be overused. It depends on individual preference.

---  

### Supplement `=` and `'=`

``` { #language-erb title="ERB" }  
VARSIONNAME =   
```

Can now also be written as

``` { #language-erb title="ERB" }  
VARSIONNAME '= ""  
```

- [EmueraWiki → Emuera Added Extended Syntax → General → Assignment to String Variables Using String Expressions](../Emuera/expression.md#_9)

This was originally unavailable syntax that became usable as Emuera evolved.  
It's clearer that it's a string assignment.

However, when using this, you need to enclose with `"~~"` like `字符串变量名 '= "啊啊"`  

It can be a bit troublesome, but it's less confusing even when Japanese variables and Japanese strings are mixed.  
Also, it's easier to see at a glance when assigning strings with trailing spaces or spaces only.

---  

## Main Display Section
Let's finally look at the next processing.

``` { #language-erb title="ERB" }  
;Title display.  
DRAWLINE   

ALIGNMENT CENTER  
PRINTFORML %GAMEBASE_TITLE%  
PRINTFORML %VERSIONNAME%  
PRINTFORML %GAMEBASE_AUTHOR%  
PRINTFORML (%GAMEBASE_YEAR%)  
PRINTL   
PRINTFORML %GAMEBASE_INFO%  
ALIGNMENT LEFT  

DRAWLINE   
```

---

### What is `DRAWLINE`?
This means "draw a dividing line."  
Often used for scene changes and creating headings.

- [Reference → `DRAWLINE`](../Reference/DRAWLINE.md)

> DRAWLINE draws a line from the left edge of the screen to the right edge like "----".

---  

### `_Replace.csv`
By default in Emuera, `DRAWLINE` creates a line like `-` connected together.  
Some might want to change it to a solid line `─` or make it a double line with `=`.  
How do you change the line displayed when using `DRAWLINE`?

- [EmueraWiki → eramaker basic Developer Info → _replace.csv](../Emuera/replace.md)

There's a file called _Replace.csv in the etc1821 folder.  
Copy this and paste it into the CSV folder in the erakanon folder.

``` { #language-erb title="ERB" }  
;DRAWLINE display character  
;Character to display for DRAWLINE  
;DRAWLINE character , (half-width character)  
;DRAWLINE character , +  
```

``` { #language-erb title="ERB" }  
;DRAWLINE character , +  
```

From here, remove `;`

``` { #language-erb title="ERB" }  
DRAWLINE character , +  
```

and save.

When you start Emuera, the part that was

```
------  
```

should now be

```
++++++  
```

This alone gives a bit more originality to the title screen.

Some want to use different line types. Wanting different line types for major and minor headings, or thicker lines only for date changes, etc.

There's a command

``` { #language-erb title="ERB" }  
CUSTOMDRAWLINE <string>  
```

and a command method

``` { #language-erb title="ERB" }  
DRAWLINEFORM <FORM string>  
```

- [Reference → `CUSTOMDRAWLINE`, `DRAWLINEFORM`](../Reference/CUSTOMDRAWLINE.md)

``` { #language-erb title="ERB" }  
CUSTOMDRAWLINE ─  
```

Like this, specify the symbol you want to use for the line each time.

---  

### What is `ALIGNMENT CENTER`?

- [Reference → `ALIGNMENT`](../Reference/ALIGNMENT.md)

Alignment means to arrange or align.  
It specifies left-align, center-align, or right-align text.

``` { #language-erb title="ERB" }  
ALIGNMENT RIGHT ;right-align  
ALIGNMENT CENTER ;center-align  
ALIGNMENT LEFT ;left-align  
```

Usually it's left-aligned, but here it's center-aligned to look like a title screen.

---  

### What is `PRINTFORML`?
This is a type of command that displays strings.

- [Reference → `PRINT`](../Reference/PRINT.md)

Suddenly seeing the mysterious description `PRINT(|V|S|FORM|FORMS)(|K|D)(|L|W)`  
might make some people's heads hurt.

`PRINT` itself is a command that displays text.  
After `PRINT`, add a half-width space and write text.

``` { #language-erb title="ERB" }  
PRINT ああああ  
```

And then the complex something following `PRINT`. I think you're curious.  
After `PRINT`, there are three parentheses groups separated.  
Several alphabetic words or phrases are separated by `|`.

This means you can use the functions you want by attaching them to `PRINT`.

Each function separated by `|` within one parenthesis group can only be chosen one, but functions from different parentheses groups can be combined.  
Where it says `(|`, it means "(none|", so it can be omitted.

As shown, you can choose one from each of the three parentheses groups and use them,  
like `PRINTV / PRINTS / PRINTFORM / PRINTFORMS / PRINTK / PRINTD / PRINTL / PRINTW`

Or choose one from the first and second parentheses groups and attach them,  
like `PRINTVK / PRINTSK / PRINTFORMK / PRINTFORMSK / PRINTVD / PRINTSD`

Or choose one from the first, second, and third parentheses groups and attach them,  
like `PRINTVKL / PRINTSKL / PRINTFORMKL / PRINTFORMSKL / PRINTVDL / PRINTSDL`

Or one from the first and one from the third, etc.

Era often uses string-variable-converted you and character names in dialogue and narration.  
Therefore, `PRINTFORM` family that can use `{~~}` and `%~~%` are frequently used.

Also, `PRINTC` family for alignment.  
`PRINTBUTTON` family displays choices and `INPUT` receives them.  
`PRINTDATA` family for random text display.

And so on - `PRINT` related commands are convenient and basic information.

Here it's `PRINTFORML`, so it's combining:  
`PRINT` - display text.  
`FORM` - use formatted string.  
`L` - add newline, no click needed.

---  

### Individual Displays
Earlier we talked about Gamebase.csv, and the variables containing that information are listed here.

The contents are as written here.

- [EmueraWiki → eramaker basic Developer Info → Emuera Added Extended Syntax → Constants and Variables](../Emuera/variables.md#gamebasecsv)

By using Gamebase.csv information on the title screen like this,  
you can update the title screen just by modifying Gamebase.csv without touching the title screen itself.

``` { #language-erb title="ERB" }  
DRAWLINE   

ALIGNMENT CENTER  
PRINTFORML %GAMEBASE_TITLE%  
PRINTFORML %VERSIONNAME%  
PRINTFORML %GAMEBASE_AUTHOR%  
PRINTFORML (%GAMEBASE_YEAR%)  
PRINTL   
PRINTFORML %GAMEBASE_INFO%  
ALIGNMENT LEFT  

DRAWLINE   
```

Gamebase.csv information formatted,  
`VERSIONNAME` created by converting the version number to a string,  
using `PRINTL` where you want blank lines,  
changing center-align back to left-align,  
and drawing the dividing line again,

the title display is complete.

---  

### Customize Design
You can modify to your taste - change to left-aligned display format, add information you want, remove information you want to show elsewhere,  
omit GAMEBASE_TITLE and replace with ASCII art, display images, etc.

For font display, color changes, special displays,

- [Reference → `PRINT` family](../Reference/PRINT.md)
- [Reference → Display Operations / Font Operations / Display Specifications](../Reference/README.md#_3)
- [Reference → `HTML_PRINT`](../Reference/HTML_PRINT.md)

For image display,

- [Reference → `PRINT_IMG`](../Reference/PRINT_IMG.md)
- [About Resource Files](../Emuera/resources.md)
- [Reference → `HTML_PRINT`](../Reference/HTML_PRINT.md)
- [Reference → Image Processing Related](../Reference/README.md#_14)

Also, `WINDOW_TITLE` can be assigned.  
You can add something to display in the window title at the top left.  
You can also change the "Processing..." loading display in _Replace.csv.

---  

## Choices
The appearance can probably be modified now, but the game is hard to use if you can't have players select from buttons.

Let's continue.  
Because it's a title screen, it uses a slightly special button using _Replace.csv.

``` { #language-erb title="ERB" }  
;Choice display  
$TITLE_SELECT  
PRINTSL "[0] " + GETCONFIGS("システムメニュー0");  
PRINTSL "[1] " + GETCONFIGS("システムメニュー1");  
```

---  

### `$TITLE_SELECT`

Based on the explanation so far,

``` { #language-erb title="ERB" }  
$TITLE_SELECT  
```

is an unfamiliar line.

Processing basically flows from top to bottom, but you can make it go back and forth or loop around the same place.

Writing `$label name` lets you place a "label" there.  
It's like a sticky note placed on important parts of a book, or a pin in a chat tool.  
Writing `GOTO label name` at another place in the same function lets you return to the labeled location.

It seems to be placed here as a return point to display buttons again when returning from the load screen without loading.

- [System Modification Q&A → Basics → Movement Methods Within Functions (Control Syntax)](erawiki-modification-QandA.md#_2)

`GOTO` statements tend to reduce readability, so it's said to avoid them except for breaking out of nested loops.  
It's recommended to replace with `LOOP` or `WHILE` statements.  
It might be a bit difficult, so even if you can't understand it, search for "spaghetti program" or "spaghetti code" to learn more.

So let's learn how to write loop processing too.

- [Reference → Loop/Branch Syntax](../Reference/README.md#_10)
- [System Modification Q&A → Basics → Loop Processing Writing Methods (FOR and REPEAT Differences and Recommended Syntax)](erawiki-modification-QandA.md#forrepeat)

If unclear, for now just borrow it as is until you understand.

---  

### Buttons

``` { #language-erb title="ERB" }  
PRINTSL "[0] " + GETCONFIGS("システムメニュー0");  
PRINTSL "[1] " + GETCONFIGS("システムメニュー1");  
```

This is a slightly irregular button using `GETCONFIGS()`.

`PRINTSL` is a command combining:  
`PRINT` - displays text  
`S` - displays string expression  
`L` - adds newline without clicking  

It displays text enclosed in `"~~"` added to the string expression.

And it uses `GETCONFIGS()`, a function usable in expressions,  
to call data from _Replace.csv.  
`GETCONFIGS()` "gets config item values as integers or strings."

When you open _Replace.csv,

``` { #language-erb title="ERB" }  
;Title screen system menu display 1  
;String part of '[0] Start from beginning' on startup screen  
;システムメニュー0 , (string)  
システムメニュー0 , 最初から調教  
;Title screen system menu display 2  
;String part of '[1] Continue training' on startup screen  
;システムメニュー1 , (string)  
システムメニュー1 , 調教の続きを行う  
```

Lines starting with `;` are comments, so they're explanatory text not read. So

``` { #language-erb title="ERB" }  
システムメニュー0 , 最初から調教  
システムメニュー1 , 調教の続きを行う  
```

can be replaced to change "最初から調教" to "Game Start", etc.

For `[0]` and `[1]`, reading what's written about the `PRINTBUTTON` command in EmueraWiki might give you an overall understanding of button display.

- [Reference → `PRINTBUTTON`](../Reference/PRINTBUTTON.md)

---  

## Selection Result
Let's look at the next part.

``` { #language-erb title="ERB" }  
$TITLE_INPUT  
INPUT  
IF RESULT == 0  
	RESETDATA  
	;ADDDEFCHARA exists as a dedicated function to reproduce eramaker's initialization process.  
	;Use ADDCHARA in other situations.  
	ADDDEFCHARA  
	;BEGINWORD '= "FIRST"  
	;CALL MAIN_LOOP  
	BEGIN FIRST  
ELSEIF RESULT == 1  
	LOADGAME  
	GOTO TITLE_SELECT  
	;If returned from LOADGAME_EX without LOADing, select again.  
ELSE  
	REUSELASTLINE Invalid value  
	GOTO TITLE_INPUT  
ENDIF  
```

---  

### `INPUT`

``` { #language-erb title="ERB" }  
INPUT  
```

This is a command meaning "wait for input."

Once you output buttons, you must have this somewhere.  
Otherwise the game will proceed on its own and players can't select buttons.

If you type 0 manually,  
or if you click the button with 0 as the specified value with a mouse,  
both are treated as inputting 0.

So it's a command to wait until either the mouse button is clicked,  
or the number is typed manually and Enter is pressed.

If you want to receive strings,

``` { #language-erb title="ERB" }  
INPUTS  
```

There's also this command.

``` { #language-erb title="ERB" }  
INPUT 0  
```

Writing this makes 0 the input when Enter is pressed without typing anything.

This allows "if Enter is held down, respond to all many choices with 0 in succession,"  
which is convenient for test play.

`$TITLE_INPUT` is the same label as `$TITLE_SELECT`.  
When an invalid value is given, it's placed above `INPUT` to be called to wait for input again.

---  

### `IF`
This is called "IF statement," "conditional expression," "branch," or "conditional branch."  
It commands "if ~, then do ~."  
It's not an exaggeration to say most of games are made with conditional branches.

If affection exceeds 1000, add Lover.  
If money exceeds 100 million, clear the game.  
And so on.

Display objectives in the opening.  
When player operates buttons, change status values as a result.  
Display ending when conditions are met.

This flow is basic game processing.

Usage 1:

``` { #language-erb title="ERB" }  
IF 条件  
	Processing when condition is true  
ENDIF  
```

Usage 2:

``` { #language-erb title="ERB" }  
IF 条件  
	Processing when condition is true  
ELSE  
	Processing when condition is false  
ENDIF  
```

Usage 3:

``` { #language-erb title="ERB" }  
IF 条件1  
	Processing when condition1 is true  
ELSEIF 条件2  
	Processing when condition2 is true  
ELSE  
	Processing when neither condition1 nor condition2 is true  
ENDIF  
```

As many `ELSEIF` as you can specify.

By the way, after `IF condition`, there's a blank at the line start.  
That's pressing the tab key.

IF statements can be nested - an IF statement inside an IF statement.  
If everything started from the beginning of the line, it would be very hard to read.

So when writing processing inside an IF statement, always press tab once to lower the line start.  
If you write an IF statement in the one-tab-lowered place, that processing is another one-tab line start lower.  
And so on to make the nested structure clearer.

(Nesting gets complicated no matter how well formatted, so it's better avoided if possible.  
Also, when creating a brand new variant, using half-width spaces can be considered.  
Some latest coding standards specify using half-width spaces instead of tabs, and in that case, the number of spaces is specifically determined by usage.  
However, inconsistency is the most confusing thing.  
Therefore, when borrowing existing works that use tabs, it's better to use tabs)

Lowering the line start compared to surrounding text is called "indentation" or "indenting."

Patch IF statements with massive nesting and inconsistent indentation sometimes drive collaborators crazy.  
Be careful when writing IF statements.

Some may have seen it - in era, it's possible to have "hundreds of command conditional branches."  
If even one of these is off, all subsequent lines get shifted.

Also, when you want conditional branches like "for one variable, when the content number is 1, when it's 2, when it's 3..."  
it's recommended to use `SELECTCASE` to simplify the conditional expression.  
It's introduced here.

[System Modification Q&A → Basics → IF/ELSEIF Blocks Can Be Converted to SELECTCASE Statements](erawiki-modification-QandA.md#ifelseselectcase)

The `INPUT` `RESULT` branch we're looking at right now is a good candidate for a SELECTCASE statement.  
You might try it.

---

### `RESULT == 0`
The condition is `RESULT == 0`.  
The suddenly appearing `RESULT` is a pre-built variable.  
The button selected by the player or manual input via `INPUT`  
is automatically saved in this `RESULT`.  
(It also receives `RETURN something` from functions, not just `INPUT`)

This `RESULT` is very commonly used and its contents change frequently.  
So it's said to be better to immediately save it to a custom `DIM` variable you created  
and use that instead.

In increasingly complex modern era, `RETURN` types easily lose `RESULT`,  
and using `RESULT` to receive and save for use can cause bugs.  
This can sometimes be solved with reference-type variables definable with `#DIM REF`.  
Although private variables (`LOCAL` variables) can't be shared across multiple functions,  
assignments in functions using this reference-type variable as an argument are reflected in the calling function.

Advice to use expression functions whenever possible is introduced here.

- [System Modification Q&A → Basics → `RESULT` and Expression Functions](erawiki-modification-QandA.md#result)

EmueraWiki's "Functions Usable in Expressions" section states  
"Assignment to `RESULT` and `RESULTS` is not performed,"  
but there are exceptions.  
`CHKDATA()`, `CHKCHARADATA()`, `FIND_CHARADATA()` fall into this.  
Also, within expression functions, `RESULT` isn't necessarily always un-writable - it gets overwritten normally if you use commands that use the `RESULT` variable.  
If you use `CALL` neither, nor assign anything, but several lines of code mysteriously don't work, consider `RESULT` misfire.

Here, it's used immediately after `INPUT`,  
so there's no concern about it being overwritten, so we can proceed.

`RESULT == 0` means "if the INPUT result was 0,"  
so it's the meaning of "if 'Start from Training' is selected."

---

### `RESETDATA`
Let's look at the processing when "Start from Training" is selected.

``` { #language-erb title="ERB" }  
RESETDATA  
```

This is a command meaning "please reset the data."

- [Reference → `RESETDATA`](../Reference/RESETDATA.md)

If you don't issue this command, when returning via "Return to Title" after already playing the game,  
other data might remain.

---

### `ADDDEFCHARA`

``` { #language-erb title="ERB" }  
;ADDDEFCHARA exists as a dedicated function to reproduce eramaker's initialization process.  
;Use ADDCHARA in other situations.  
```

- [Reference → `ADDDEFCHARA`](../Reference/ADDDEFCHARA.md)

This is a command to maintain compatibility with eramaker - it registers all characters with CSV data at once.

Even if you add character data in CSV,  
the character won't be added unless you load them like this.

Some variants may already have settings with `ADDCHARA` from the beginning.  
There are cases to prepare void characters with `ADDVOIDCHARA` and add settings later to customize characters.

CSV numbers can be set skipping numbers like `1,3,7`, but  
characters are registered packed together when registered.

When handling pre-built character data like `CFLAG` and `BASE`,  
the character number specified is the registration order, not the CSV number.  
(The CSV number is also called "NO" (meaning Number) in EmueraWiki and such. The latter is sometimes called "registration number")

---

### `BEGINWORD '= "FIRST"`
Let's look at the next line.

``` { #language-erb title="ERB" }  
BEGINWORD '= "FIRST"  
CALL MAIN_LOOP  
```

The processing we're looking at now is extracted from SYSTEM_FLOW.ERB.  
SYSTEM_FLOW.ERB is a file that guides the flow in Emuera.

`BEGINWORD` is more of a variable created to make navigation easier than one needed for processing.  
The location where `BEGINWORD` is declared is in `SYSTEM_FLOW.ERH`.

Files with extension `.ERH` are files to write `DIM` declarations that are used not only within functions but across various functions.

Copy SYSTEM_FLOW.ERB from the etc1821 folder and paste it into the ERB folder in erakanon folder to make it work, but  
we won't do that here.

Since this is about making a vanilla environment, not about tracing flow, let's rewrite to `BEGIN FIRST`.

``` { #language-erb title="ERB" }  
BEGINWORD '= "FIRST"  
CALL MAIN_LOOP  
```

Change to

``` { #language-erb title="ERB" }  
BEGIN FIRST  
```

When you start the game and select '[0] Start from Training',  
the error that occurred after adding `@SYSTEM_TITLE` should disappear and the game should start.

---

### `ELSEIF RESULT == 1`
Let's look at the next line.

``` { #language-erb title="ERB" }  
ELSEIF RESULT == 1  
	CALL LOADGAME_EX  
	GOTO TITLE_SELECT  
	;If returned from LOADGAME_EX without LOADing, select again.  
```

`ELSEIF RESULT == 1` means  
when "[1] Continue Training" is selected.

`CALL XXXX` is a command to call a function (/@something).  
This means to call the function `@LOADGAME_EX`.

This is also a function call from within `SYSTEM_FLOW.ERB`,  
so if you want to borrow `@LOADGAME_EX`, copy it over.

In addition to Emuera's official etc folder, era variants have  
many functions released under CC license, and  
you can often use them by copying them along with their licenses.  
Even when creating from scratch, I think you can gratefully borrow them.

If you want to borrow the vanilla default system,

``` { #language-erb title="ERB" }  
ELSEIF RESULT == 1  
	LOADGAME  
	GOTO TITLE_SELECT  
```

Change to this and it should work.

`GOTO TITLE_SELECT`, as mentioned in the `$TITLE_SELECT` section,  
is a return command to redisplay when returning to the title screen without loading.

---

### `ELSE`

``` { #language-erb title="ERB" }  
ELSE  
	REUSELASTLINE Invalid value  
	GOTO TITLE_INPUT  
ENDIF  
```

`ELSE` means "otherwise."  
Here, perhaps for guidance, it displays that it's an invalid value using `REUSELASTLINE`, a command that rewrites the last line with a formatted string.

- [Reference - `REUSELASTLINE`](../Reference/REUSELASTLINE.md)

If you want to ignore manual input, you can just return without question.

---

### `ENDIF`
IF statements end with `ENDIF`.  
Unlike SIF statements, corresponding `ENDIF` is always required.

`GOTO TITLE_INPUT` seems to only return to wait for input since the buttons are alive, unlike for loading.

---

## Let's Read Common Mistakes
It describes things that are easy to make mistakes on. Read through for when you get stuck.  
[Common Mistakes](https://seesaawiki.jp/eraseries/d/%a4%e8%a4%af%a4%a2%a4%eb%b8%ed%a4%ea)

---

## Conclusion
I've worked on adding a title screen and connecting it to vanilla.  
I hope I've been able to guide you on how to research eramaker-side processing, how to find deprecated variables for updating, how to look up Emuera commands and expression functions, and so on.

The person writing this still has many things they don't understand.  
I think knowing how to research what you don't understand is what's important.  
Even when you think you're skilled, there are many blind spots. I want to never lose my beginner's mind.

Since era is a training simulator, there are no RPGs, maps, or strategies by default.  
To make a games, you need to know not just how to use tools, but also level design, pathfinding, thinking logic, etc. Era doesn't teach those.  
I want to commend that all of this - vanilla and tools - are features that various volunteers have each learned and created.

I hope this becomes a stepping stone for you to create what you want.

---

Next Page → [ERB Production Practical Edition](erawiki-ERBmanual.md)


---

# erawiki-tutorial.en
---
# Variant creation/Tutorial

Original page:  
[era series discussion thread, Summary Wiki V3, Tutorial](https://seesaawiki.jp/eraseries/d/%a5%c1%a5%e5%a1%bc%a5%c8%a5%ea%a5%a2%a5%eb)  

**※Currently, the link to OSDN on this page is difficult to access.**

---

- Tutorial
- [Title preparation](erawiki-title.md)
- [Title practice](erawiki-title2.md)
- [ERB creation practice](erawiki-ERBmanual.md)

---

## Introduction
This tutorial was posted on the wiki on 2021/05/09,
and it is about introducing Emuera to the vanilla era for modification.
Vanilla is the opposite of variant, and refers to eramaker, the original era.

- [Makumakuto, Baku (R18) Circle Baku](http://cbaku.com/)

The copyright holder is Sato Satoshi. Vanilla is still fun to play today. I am grateful to him.


However, I do not recommend creating a new variant from the vanilla era now.
Many functions have been added to the variants that have been modified from the past to the present.
It is very difficult to create something that has been accumulated by volunteers over the years by yourself.
Of course, it would be much easier if there was a model and someone who could lend me the processing, but even so.
(If you borrow it, check the license.
Generally speaking, it is rare to allow derivative works of games made by individuals.
There are many variants of era that do not allow derivative works.)

With that in mind, let's try to create a vanilla modified environment.
If you know about vanilla, your understanding when reading EmueraWiki will change significantly.
As a result, the range of things you can do will also change.
I will write the beginning of the process of introducing Emuera to vanilla, creating a title, and connecting it.

---  

Vanilla uses many variables that are deprecated in the current Emuera
(Deprecated variables are listed in VariableSize.CSV in etc1821, etc.)
These are also used in many current variants.
The main reason is probably that there is simply too much for an individual to handle.
For beginners, ease of understanding is a matter of life and death, but you should not pressure those who are compiling it to make changes.
Realize that code improvements are something you do to make it easier for yourself to work with.

---  

## Read the introduction to modding
- [Introduction to modding](modification-manual.md)

This is a manual for a standard training SLG, and it explains what you need to do to get started.
First, read "[An easy-to-use text editor](modification-manual.md#_3)", "[A search tool that can use GREP](modification-manual.md#grep)", and "[These are the things you should remember at the beginning](modification-manual.md#_5)".

---  

Recently used text editors include Sakura Editor, which is easy to install, starts up quickly, and has a color-changing function created by volunteers, and Visual Studio Code, which requires Japanese localization, starts up slowly, has fast GREP, and has a function jump function created by volunteers.

If the default encoding is not Shift-JIS and the auto-encoding function is off,
when you open erakanon, the characters may be garbled.
You can consider it a temporary thing and proceed with the work in Shift-JIS,
or you can first find an encoding conversion tool such as free donationware and change the whole to UTF-8 with BOM.

<u>For those who don't know much about it, try borrowing Sakura Editor for now. </u>
Even if you can't research and use the color-coding function or GREP, it is convenient enough to use it as a substitute for notepad, and it is originally in Japanese.
The function that displays full-width spaces, half-width spaces, and tabs so that they can be distinguished is very useful.
If you create it with notepad, you will have a hard time (usually by someone other than yourself), so try to avoid creating it with notepad as much as possible.
<!--
|bgcolor(#F0F0E7):[[Title Practical Edition]] → What is encoding? |
|https://seesaawiki.jp/eraseries/d/%a5%bf%a5%a4%a5%c8%a5%eb%bc%c2%c1%a9%ca%d4#content_2_3|
//(2021/05/11 I wrote that it was not supported, but I was corrected after someone pointed it out in the wiki editing thread. Thank you.
//　I will comment out the correction notes so that they are not difficult to read.
//　I plan to comment them out when you can check them again at a later date. Thank you for the additional information.)
-->

---  

Also, Sakura Editor now has a GREP function, so the GREP tool is no longer necessary.
<!--There is a difference in speed. It seems that ripgrep is recommended. -->
<!--// (Added on 2021/05/11 after receiving advice from the wiki editing thread) -->
GREP is a system that allows you to search across multiple files, and is useful for finding errors.
You can read about how to use GREP here.

- [System Modification Q&A → Basic Knowledge → How to Use GREP] (erawiki-modification-QandA.md#grep)

**And backups are very important. **

With recent variants, it may not be possible to add characters using the method described below, but
This time, we are testing erakanon and Emuera together, so you can learn the basics.

---  

Also, if you set Explorer to show file extensions,
you'll see the file format as `filename.XXX`.

If you want to play around with era, it's hard to do it if you don't know the file format, like ERB, ERH, or csv.
If you don't have file extensions shown, search for "Windows Explorer Show File Extensions"
and set it to show file extensions.

---  

<!-- The tool collection is almost completely dead due to broken links, so I've commented it out.
*Find useful tools
The addresses of editor distribution sites are in a link collection.
Find the editor you want here.
|bgcolor(#F0F0E7):[[Tools]]|
|https://seesaawiki.jp/eraseries/d/%a5%c4%a1%bc%a5%eb|
----
[[▲Back to table of contents>#contents]]
//
//
//
-->
## Operating environment required for Emuera

|Windows|
|:-|
|.NET Framework 4.5|

.NET Framework 4.5 adds various capabilities to the programming language C# used in Emuera when creating Windows applications.

- Windows 11 comes with 4.8 installed, so there is no particular impact.
- Windows 10 comes with 4.6 installed. It works without any problems.
- Windows 8 and 8.1 come with 4.5 installed from the beginning.
- Installation is possible on Windows Vista and 7. Search and read the official Microsoft download page.
- Installation is not possible on Windows XP.

EmueraEM+EE requires the latest .NET. Follow the instructions at startup to download and install.

If there are no problems, continue.

---  

## Download Emuera

- [Emuera - emulator of eramaker download](https://ja.osdn.net/projects/emuera/releases/)

- [EmueraEM+EE (download from the top page)](../README.md)

This time, download the original Emuera at the top.

>Emuera1824.zip(Date: 2019-01-28, Size: 253.98 KB)

>etc1821.zip(Date: 2015-11-04, Size: 8.73 KB)

Click the blue button on the left to download and unzip the zip file.

Emuera1824 folder

- Emuera_readme.txt
- Emuera1824.exe

etc1821 folder

- _Replace.csv
- Chara0Anata.csv
- readme.txt
- SYSTEM_FLOW.ERB
- SYSTEM_FLOW.ERH
- VariableSize.CSV
- VariableSize_0.CSV

These files are included.

First, let's read `Emuera_readme.txt`.
Emuera is created by `MinorShift` and `Pregnant)|дﾟ)の人`.
You can donate to MinorShift, Emuera is pronounced as `Emu-ra`,
How to use it by putting it in the same folder as eramaker.exe and starting it,
Operating environment and license are written, so check it out.

Some of you may be thinking, "Oh?"
It says to put Emuera.exe where eramaker.exe is.
However, most eras do not include eramaker.exe.

If you don't know anything about eramaker and try to access it from Emuera,
even if you read the Wiki you will likely be left confused.
I'll check etc1821 later, but let's download eramaker as well.

---  

## Download eramaker

- [Bakuto, Baku (R18) Circle Baku](http://cbaku.com/)

Click on this category Doujin games, and take a look at the one that appears at the end

- [Doujin games erakanon (eramaker)](https://cbaku2.sakura.ne.jp/b/2010/12/eramaker/)

.
After reading the really tempting introduction,

>Download (6/2 ver)

download erakanon and unzip it.

It contains the erakanon folder

- eramaker.exe
- erakanor.html
- CSV folder
- ERB folder

.

erakanon is a game where there are multiple targets, and you select the target by purchasing the card.
eralight is a game where there is only one target, and the target is selected from the beginning without any purchases.
(For those who want to modify it → Information for modification → eramaker's simple sample game eralight)

Here, we will proceed with the assumption that erakanon is used as the base.

---  

## Starting eramaker
Let's start eramaker.exe in the erakanon folder.
When you start it, you'll notice something.
"You can't use the mouse to operate it...?"

You enter the command number using the number keys on your keyboard,
and execute it with the Enter key.

## Starting Emuera
As explained in Emuera_readme.txt,
try copying and pasting Emuera1824.exe from the Emuera1824 folder into the erakanon folder.

Close eramaker.exe and start Emuera1824.exe.
A small warning will appear, but don't worry about it for now.
You can now operate it with the mouse.

<!--
Emuera is intended to be installed in this order, so EmueraWiki does not provide much explanation on the installation of the CSV and ERB folders or their contents.
(There is a link to eramaker on the front page of EmueraWiki, and it says that there is very little written about eramaker on EmueraWiki, but at first you may not understand the relationship between eramaker and Emuera and may tend to skip over it.)
-->

Next, try deleting eramaker.exe.
Start Emuera1824.exe again.
It will run just as it did before. The same goes for eralight.

Emuera is an eramaker emulator (imitation software), and can be used as a "convenient replacement with added features."
Beginners who tried to start with Emuera may have been confused by the eramaker specifications, but now you'll be fine.

---  

## Let's look at the modification information while playing
Let's look at the following page again.

- [Doujin Game erakanon (eramaker)] (https://cbaku2.sakura.ne.jp/b/2010/12/eramaker/)

Look a little further down the page,

> For those who want to make modifications

There is a heading.

And there is a link to the modification information.

- [eramaker CSV format](https://cbaku2.sakura.ne.jp/b/erakanon/eramacsv.html)
- [eramaker era basic structure](https://cbaku2.sakura.ne.jp/b/erakanon/eramaerc.html)
- [eramaker era basic format](https://cbaku2.sakura.ne.jp/b/erakanon/eramaerb.html)
- [eramaker variable list](https://cbaku2.sakura.ne.jp/b/erakanon/eramavar.html)

<!--
(2021/04/29 "How to modify eralight" is a broken link, so please add information to the thread in the comments)
//2021/06/16 Thread information
//In the tutorial, regarding "How to modify eralight" which is a broken link to the official erakanon site,
//The location is http://cbaku2.sakura.ne.jp/b/erakanon/tut000/eramt000.html, they said.
//They were unsure how to handle it so they just wanted to provide information, but I think it was just a mistake in the specification.
//It's possible that the creators decided to remove it temporarily, so I was unsure and wrote it in the comments. Thanks for the info.
-->
As it says on each page, try to read through it while playing the game.

---  

### Structure of eramaker era basic

- [Structure of eramaker era basic](https://cbaku2.sakura.ne.jp/b/erakanon/eramaerc.html)

Reading this while playing with erakanon will help you get a good grasp of the overall flow and atmosphere.

- [EmueraWiki flow](https://evilmask.gitlab.io/emuera.em.doc/Emuera/system_flow.html)

For more details, see the Emuera flow diagram.

---  

### eramaker era basic format

- [eramaker era basic format](https://cbaku2.sakura.ne.jp/b/erakanon/eramaerb.html)

Written to be easy to understand even for beginners.
If you don't know the basics of how to write, give it a read.

---  

### eramaker CSV format

- [eramaker CSV format](https://cbaku2.sakura.ne.jp/b/erakanon/eramacsv.html)

CSV is like a summary of information.
You specify status data, character data, etc. with this.
This manual explains the file name and contents.
It is a file with the extension `.csv` in the erakanon or eralight CSV folder.

There are various names for CSV.
For example, `Abl.csv`.
``Abl'' is an abbreviation for ``Ability''
This is a file that sets the character's ability status.

>Write the ability number in the first column and the ability name in the second column.

It says this, and when you actually open the file,

```
0, Obedient
```

The first line looks like this.

If you write this in CSV, ERB processing will turn

```
ABL: Character number: 0
```

into

```
ABL: Character number: Obedient
```

.

Anyone can see what it is doing at a glance, and it is easier to understand (readability is improved) than a mysterious number (magic number) that is hard to understand.

Of course, the person who created it is less likely to forget it than if it was managed only by numbers.

CSV seems to be mainly used for this purpose.

- [System modification Q&A → Basic knowledge → Eliminate magic numbers] (erawiki-modification-QandA.md#_6)

Also, the number of CSVs that can be specified in Emuera has increased significantly. Therefore, what is written here should be read together with

- [EmueraWiki → Extended syntax added in Emuera → General → Specifying elements of array variables using strings] (../Emuera/expression.md#10)

. That said, if you look at too many variable names at first, you won't be able to remember them all.

When you actually use it, you just need to remember where the list is to look up the CSVs you can use.

The number of variables has also increased, so you should also check out the instructions in the document

- [Extended syntax added in Emuera → Constants and variables → CSV related](../Emuera/variables.md#csv)

.

You can also create your own data that is not in CSV using a DIM array.

---  

### eramaker variable list
You can think of variables as numbers that change.

In a game, the status changes depending on who is playing.

When creating a game, no matter how the player plays and what the status changes,
you need to write down in advance what will happen as a result.

Prepare a box, put a sticker on it, write "Likeability" on it, and name it.
Put numbers into the box and command it to calculate like this no matter what the contents are.
The box is the variable. The name written on the sticker becomes the variable name.

- [eramaker variable list](https://cbaku2.sakura.ne.jp/b/erakanon/eramavar.html)

`A-Z` is currently deprecated, and it is recommended to use the `DIM` variable in Emuera.
I won't try it now because I'm just trying it out in a vanilla environment, but if you really want to create a new variant from scratch, read 'VariableSize.CSV' in the 'etc1821' folder, rename `VariableSize_0.CSV` to `VariableSize.CSV` and put it in the CSV folder.
(`VariableSize.CSV` is a file for explanation, and `VariableSize_0.CSV` is a file that is intended for actual use)

Deprecated variables are set to `-1` from the beginning, so they will automatically become unusable.
If you try it, you may be able to figure out what changes you need to make to update the vanilla era.
(Over 1000 lines of warnings will appear, all involving single-character variables being turned off)

Those who are used to it may be confused by the fact that `LOCAL` and `LOCALS` cannot be used.
It has been said that when there are many functions, reducing the number of `ARG` and `ARGS` that can be used as arguments will make it lighter, so
they are set conservatively to 1.

- [System modification Q&A → Basic knowledge → About private variables (using #DIM instead of A-Z or LOCAL)] (erawiki-modification-QandA.md#azlocaldim)

---  

### Useful things to know
Currently, `***`, `+++` and `///` are not used much because they do not go well with `///`, which is used to express embarrassment, and ASCII art.
This function can be set to be prohibited on the config side.
If it is used as a convenient function on the ERB side, the use of that expression in dialogues will be prohibited.

---  

### Read the advanced version

A collection of links to the eratoho summary V3 page that lists the range and contents of each variable is compiled.

- [Advanced version](https://seesaawiki.jp/eraseries/d/%b1%fe%cd%d1%ca%d4)

If you're someone who can't figure out what page the explanation is on even after looking at the link titles on EmueraWiki, it might be easier to understand if you click on the list of additional specifications for Emuera here.
The technical information for developers explains the system features of eramaker for those who understand it.

---  

## Let's fix errors

```
Warning Lv2: INFO.ERB: Line 89: An unexpected symbol ':' was found during syntax analysis.
SIF STAIN:MASTER::COUNT & 2
Warning Lv2: INFO.ERB: Line 91: An unexpected symbol ':' was found during syntax analysis.
SIF STAIN:MASTER::COUNT & 4
Warning Lv2: INFO.ERB: Line 93: An unexpected symbol ':' was found during syntax analysis.
SIF STAIN:MASTER::COUNT & 8
```

I decided not to worry about it earlier, but when I started erakanon with Emuera.exe, I got this error.
Let's fix it before we modify it.

When you open the ERB folder, there are many files.
Looking at the warning, you can see that the cause of the error is `INFO.ERB`.
Let's open that file in an editor.

If you have line numbers displayed in the editor, you should be able to find the problem around line 89.

``` { #language-erb title="ERB" }
SIF STAIN:MASTER::COUNT & 2
PRINT <Ｐ>
SIF STAIN:MASTER::COUNT & 4
PRINT <詳細>
SIF STAIN:MASTER::COUNT & 8
PRINT <Ａ>
```

The cause is that there are too many ``:`` after MASTER here.

``` { #language-erb title="ERB" }
SIF STAIN:MASTER:COUNT & 2
PRINT <Ｐ>
SIF STAIN:MASTER:COUNT & 4
PRINT <詳細>
SIF STAIN:MASTER:COUNT & 8
PRINT <Ａ>
```

Change it to this and save it.

Close the file and start Emuera1824.exe again, and the warning will no longer be displayed.

Next page → [Title Preparation] (erawiki-title.md)


---

# erawiki-vscode-git.en
---
# Using git with VSCode

This page summarizes posts from a Discord server

- [Discord - eraEVENT_KXX](https://discord.gg/cuSh6y5j93)

This explains how to use git with VSCode, which was described in [ERB Production Practice](erawiki-ERBmanual.md).
Some git terminology appears below, which can be interpreted as follows:
- Repository → Project
- Pull → Download
- Push → Upload

## What is git?

git is a version control system that anyone with some programming knowledge knows. It automatically merges code edited in each user's environment, notifies of conflicts, and keeps everything at the latest version, making it almost essential for collaborative development.

Even for individual use, creating diff history locally is useful for identifying issues when problems occur, such as bugs, and for rolling back.

To use git, you need to register with a git service like GitHub to upload your source code. You also need an application on your PC to access git.

VSCode has git functionality built-in, so no additional apps are needed. Text editors like Sakura Editor don't have this, so you'd need to install separate git management apps like GitBash or SourceTree. We'll skip explaining those here.

git is essentially a project, so of course it needs an administrator. In most cases, the administrator (Admin) is the variant author, and patch authors or dialogue authors are Contributors.

The push (upload) method differs slightly between administrators and contributors, so we'll explain each separately.

## git Operations for Administrators (Variant Authors)

First, you need to create a git project. Popular git hosting services include GitHub and GitLab. While their browser interfaces differ, operations in VSCode and git apps are the same.

Create a GitHub account first:

- [GitHub](https://github.com)

After creating an account, open the folder where you normally create your variant in VSCode, and select the git feature from the left menu.
![](../assets/images/erawiki-vscode-git/admin_1.png)

If you haven't created a git repository yet, it will display like this. Select "Publish to GitHub".
![](../assets/images/erawiki-vscode-git/admin_2.png)

You'll be asked for confirmation. Allow it and log in via browser to authenticate VSCode.
![](../assets/images/erawiki-vscode-git/admin_3.png)

Now you can select the variant files to push to the git repository, but wait first. It will be more convenient to set up a `.gitignore` file, which specifies files to ignore when pushing.

Configure `.gitignore` for save data, error log files, debug folders, and other files that should be removed before distribution or would cause issues if shared.

Create a file named `.gitignore` and edit it with VSCode or a text editor.

While files to exclude vary by variant, the basics are:

- Exclude `_default.config` or `_fixed.config` as needed
`emuera.config`

- If images are provided by the player
`resources/`

- However, if sprites are specified in CSV files
`!resources/*.csv`

- The following should be excluded
`*.sav`
`*.log`
`*.lnk`
`sav/`
`debug/`
`macro.txt`

Then enter a repository name and select the files to push.
![](../assets/images/erawiki-vscode-git/admin_4.png)

![](../assets/images/erawiki-vscode-git/admin_5.png)

Now the repository is created on GitHub.
![](../assets/images/erawiki-vscode-git/admin_6.png)

Next, let me explain how to push changes to this repository. If you've gotten this far, it's not difficult.

Edit your source code as usual, and when you have a decent amount of changes, commit the updates. For example, you can commit separately for bug fixes and feature additions - it's easier to understand when you divide commits by approach, but there's no clear answer as it's up to each person's preference.

However, if the variant author has specified "please commit like this," it's safest to follow their instructions.

Just like when creating a repository, open the git feature, and you'll see a list of files changed since the last commit. Select a file to see the changes.
Give this change a name and commit it.
![](../assets/images/erawiki-vscode-git/admin_7.png)

Then select "Sync Changes" to push the changes to the repository on GitHub.
This is the basic flow for administrators.
![](../assets/images/erawiki-vscode-git/admin_8.png)

To accept contributor operations explained in the next section, go to Settings, select "Change Visibility" at the bottom, and set the repository to Public.
You'll get strict warnings, so consider the risks before making it public.
![](../assets/images/erawiki-vscode-git/admin_9.png)

## git Operations for Contributors (Patch Authors)

We've explained administrator git operations, but how about contributors?
Since contributors don't have direct access to the main git repository, they need to push via a Pull Request (also called Merge Request).

Below explains pushing using Pull Requests. However, if the administrator is a trusted creator, they can grant repository access to allow pushing using the same steps as administrators.
You can set detailed permissions, but please note that any issues with the repository are at your own risk.

Contributors also create a GitHub account, access the variant repository they want to patch, and select "Fork" in the top right.
![](../assets/images/erawiki-vscode-git/cont_1.png)

A confirmation screen will appear - follow it.
![](../assets/images/erawiki-vscode-git/cont_2.png)

After a moment, an exact copy of the source repository will be created under your account.
![](../assets/images/erawiki-vscode-git/cont_3.png)

Open VSCode, select "Clone Repository" from the git menu, and proceed with GitHub authentication just like the administrator.
![](../assets/images/erawiki-vscode-git/cont_4.png)

![](../assets/images/erawiki-vscode-git/cont_5.png)

Select the target repository and choose where to save it on your PC. The source code will be downloaded and become editable.
![](../assets/images/erawiki-vscode-git/cont_6.png)

The commit-push method is the same as for administrators, but since you're pushing to your forked repository, it won't reflect in the original repository.
To reflect this, you make a Pull Request.

This is a test repository for Pull Requests. You can send your committed changes to the original repository via Pull Request from the browser.
![](../assets/images/erawiki-vscode-git/cont_7.png)

Add an explanation of what changes you made so the administrator can understand, and create the Pull Request.
![](../assets/images/erawiki-vscode-git/cont_8.png)

The Pull Request has been sent to the administrator. Once the administrator approves it, the merge is complete. You can notify them like "I sent a Pull Request."
![](../assets/images/erawiki-vscode-git/cont_9.png)

![](../assets/images/erawiki-vscode-git/cont_10.png)

While the administrator receives Pull Requests and merges them, keeping the repository always up-to-date, this isn't always the case for contributors.
You need to periodically pull updates from the original repository.

This can be done with git operations, but it's a bit difficult, so using the "Sync fork" feature provided by GitHub is recommended.
This syncs the repository with the original, so pulling in VSCode will give you the latest code.
![](../assets/images/erawiki-vscode-git/cont_11.png)

When creating patches and sending Pull Requests, check the latest version to avoid conflicts or clashes with outdated specifications.


---

# glossary.en
---
# Glossary

For items you'd like to add, contact us on [Discord](https://discord.com/channels/428432103042973706/1236190714954514452).

## Programming Terms

### git
A version control system. It maintains change history locally and can upload to and back up online projects called remote repositories.
It particularly excels in collaborative development, but even for individual projects, it has useful features like checking changed areas and rolling back, so learning how to use it is worthwhile.
See [this page](HowToUseGit.md) for details.

### VSCode (VSC)
An IDE (Integrated Development Environment) for programming. It's essentially an application.
Free and feature-rich. Can be made even more convenient by installing extensions.
See [this page](erawiki-ERBmanual.md#vscode) for detailed installation instructions.

### Uploader
Also called "loda." A service that lets you upload files so anyone can download them. Of course, also used for distributing free games.
**There is no guarantee of constant service, and in the era community, major uploaders have gone offline or had issues multiple times in the past, resulting in the loss of many variants, dialogue, and patches.**
It's important to keep data on your own computer, and you can also spread risk by using multiple uploaders. Recently, there's also a method to create download links from git repositories.

### Indent
Spaces used to make source code look better. Can be entered with the Tab key in most text editors.
It doesn't affect actual operation, but is used to make pairs clear in statements that need to be closed with ENDIF, ENDSELECT, etc., like IF and SELECTCASE statements.

### Esper
Refers to someone with the ability to understand the background behind insufficient explanations from questioners like "This doesn't work" or "How do I do this?"
Of course, there are almost no espers in the real world. When asking questions, please provide detailed explanations including your environment, error logs, etc.

### Function
One unit for dividing source code. It's similar to dividing files into folders and then further dividing the files.
In Emuera, there are no concepts like classes or namespaces - functions starting with `@~` are the only and smallest units of source code.

### Sakura Editor
A text editor. Much more feature-rich and lightweight than the standard Windows Notepad.
Can be used for programming with proper settings, so it's sometimes used for era development.
Download and detailed explanation are on the [official page](https://sakura-editor.github.io/).

### Spaghetti (Code)
Source code with significantly low readability caused by excessively using verbose expressions, `CALL`, and magic numbers.
A derogatory term comparing the elements to spaghetti that are entangled in a bad way and can't be unraveled.
Of course, cleaner source code is always better, but as mentioned, it's a derogatory term, so saying "that's spaghetti code" to others isn't good manners.
As a patch author, refactoring is the smoothest way to avoid waves.

### Black Box
Refers to a program that works despite the source code content being unclear.
In era, there are many cases where you base on other variants or port functions, resulting in "I don't understand the content but I can use the functionality."
This is convenient in open-source era, but the flip side is that when "unknown bugs are discovered," "the author didn't anticipate this usage and normal results aren't obtained," or "further modifications are desired," the creator can't handle it because they don't understand the content.
It's worth noting that the term "black box" itself has almost no negative connotation.

### Variable
A concept for holding data. There are various types called "types" that handle different data.
In Emuera, types are only "integer (int)" and "string (str)."
Integer type also serves as bool type - 0 is treated as false, and any other value as true.

### Magic Number
Refers to insufficiently explained numbers or variables whose purpose is only known to the person who wrote the code. And often even the author themselves forget the meaning when reading their own code later.
This includes single-character variables, `LOCAL`, `ARG`, etc. from other sections. Using these excessively makes it unclear which process uses which variable, and can cause black boxes.
Basically not recommended, and now that you can name variables, it's desirable to declare with appropriate names matching their purpose before using.
Also, there's a troublesome aspect that source code with many magic numbers that humans can't decode works fine from a program perspective - one reason why refactoring is often undervalued in the programming field.

### Command
Something that executes an action in era source code - calling functions, adding characters, displaying text, etc.
See [this page](../Reference/README.md) for a list of available commands.

### Infinite Loop
A phenomenon where loops don't end due to some cause when using loop commands. Most are due to program errors.
Emuera has a fail-safe that stops operation as an infinite loop when a loop continues beyond a certain time.
Rarely, it can also be triggered when running heavy code on low-spec PCs, or when source code is messy and has very high loop counts.
Since fewer loop iterations is always better, how much you can optimize this is a skill to show.

### Refactoring
The work of organizing source code.
This improves maintainability and readability of source code, making it very important for continuous variant development.
Specific examples include "combining the same process into one function," "naming variables to make purposes clear," "reducing loop processing waste to lighten operation," "replacing existing processing with clear-purpose commands/expression functions," and "changing filenames to match file contents."
However, refactoring requires almost as much effort as creating source code from scratch, and since operation doesn't change and players can hardly feel the difference, it tends to be neglected relative to its importance.
~~Additionally, in many cases file size decreases. Not a good match with users who judge variant/dialogue scale by file size.~~
Can be considered an eternal challenge for programmers.

### Exception
One type of program error. Occurs when referencing a variable with no value, etc.
In era development, errors aren't called exceptions - when this word appears, it refers to Emuera itself's errors.

## era Terms

### CSV
A file extension standing for "Comma Separated Value." Unlike ERB, this file format is used in various applications.
Therefore it can be edited with Excel and other applications, but since extra symbols may get mixed in, it's not recommended.
While ERB describes source code, this is used to define various data in advance (character data, variable names, etc.).

### Emuera
A derived game engine based on eramaker below, with additional features. It's now the mainstream.
Open source, and besides Emuera.NET EM+EE which this wiki mainly covers, there are various versions in Japan and abroad.
[Official Emuera OSDN](https://ja.osdn.net/projects/emuera/wiki/FrontPage) (may have connectivity issues)

### eramaker
The original era. A game creation engine created by circle 獏 (Baku).
**First release was December 12, 2005.**
[漠々と、獏/erakanon's page](https://cbaku.com/b/2010/eramaker/)

### ERB
A file extension (variously said to be) standing for "ERaBasic." Era source code is mainly written in files with this extension.
Since it's basically an extension unique to era, it's not used in other applications. Change it from Windows settings to show file extensions.
In IDEs like Visual Studio Code, you can create files without extensions, so use by adding the ".ERB" extension.

### NO
The character number listed in character CSVs. A unique number for each character, also used in [CSV reference commands](../Reference/CSV_STATUS.md).
Basically fixed values and don't change. Sometimes confused with registration number (ID), but they're different. Beginners should be careful.

### SHOP
When you first start the game, the screen shown is the title screen, and then after starting the game, the main menu shown is conventionally called the SHOP screen.
This comes from the function name that makes up this screen being "SHOP" since the eramaker era.

### あなた (You)
The character registered as character number 0 in most variants. Usually male, but sometimes female or customizable.
In second-generation ero, the man often becomes a mob, and era follows this. Also, in dream genres, it's important that the protagonist is "あなた."
Becomes almost unnecessary in plays that enjoy character couplings.

### Single-Character Variable
Variables using single letters A-Z. Integer type.
Since they can maintain values across functions, they were valued in restrictive eramaker.
However, in Emuera where return value specifications via `RETURN` expanded and variables can be declared, they significantly reduce source code readability, so usage is now avoided in many variants.
This is due to lack of uniqueness - "unclear variable purpose" and "after all only 26 types, so when creating complex processing, variable name collisions occur somewhere."
~~Single-character variables are still heavily used in variants based on old variants, but refactoring requires enormous effort, so demanding too much from variant authors is strictly prohibited.~~

### "Character registration number is out of range"
Probably the most frequent error in era. Occurs when referencing a status of a non-existent character.
Causes include `TARGET` being -1, loops running too far, wrong variables used for character reference, character reference variables having unexpected values, etc.
Can be prevented in advance by comparing `TARGET` or character reference variables with `CHARANUM` (character count).

### Dialogue (Koujou/Kokusho)
In default era, only narration is often implemented. A system that gives characters dedicated dialogue in such games is called "koujou" (dialogue).
There are two types: general dialogue and character-specific dialogue. General dialogue, as the name suggests, references character traits and such to display from several patterns. Because of this, "this character wouldn't say this" occasionally happens.
Character-specific dialogue is made for that character, and (despite interpretation differences) creates an atmosphere comparable to commercial erotic games where the character actually speaks.
The problem is that both require **enormous effort and time, plus writing skill**, making dialogue authors who can create these very in demand.

### Expression Function
In erabasic, functions are normally called with `CALL`, but functions that can return numbers or strings in expressions without using `CALL` are called expression functions.
Bundling frequently used verbose processes into functions is the same as regular functions, used for situations like getting only the result (number) from complex calculations, or getting text (string) that changes depending on the scene.
See [this page](../Emuera/in_expression_function.md) for detailed expression function specifications.

### Registration Number (ID)
Numbers assigned to characters added with ADDCHARA system commands. Starts from 0 and is always processed front-packed.
Specified by registration number for TARGET and ASSI. Unlike NO, it's not unique to characters and changes with DELCHARA or SORTCHARA.

### Variant
A general term for games that run on eramaker or Emuera. Everything ultimately traces back to and is derived (Variant) from a base game called erakanon, hence called variants.
Often called eragame(s) in English-speaking regions.


---

# HowToUseGit.en
---
# What is git?

Original source page
[eratoho Summary V3 Git Usage](https://seesaawiki.jp/eratoho/d/Git%a4%ce%bb%c8%a4%a4%a4%ab%a4%bf)

---

<!--
// Draft
// This probably has some difficult or unclear parts - please fix if you can
-->

git is a tool for managing the revision history of folders and their contents, and is one of the most sophisticated such tools currently available.

For the era community, git is useful for:

- Recording variant versions and integrating patches, which automates much of that work and reduces effort
- Recording your work during development, and automating the extraction of patch diff files based on those recordings

Additionally, with remote repositories where you can publish and manage projects:

- Players can check the progress of variant development
- Requests and suggestions can be managed centrally through issues
- Full releases of the latest version are easily downloadable

<!--
// Removed server-related features from explanation as they add complexity - can add as advanced content later
//- Can develop using local repositories without setting up a server
//- When developing in a public repository, users can track progress
-->

These benefits are expected.
Although it's sometimes written as if it can't be used alone, git can be used starting from a single person.
It may be difficult to understand what you can use it for, but if your situation matches the useful scenarios mentioned above, please give it a try.

**Advantages**
- Can check and revert past versions of variants without having to create separate folders
- Making patch compilation easier than winmerge
- Can review what work you've done up to now

<!--
// Changed to "no need to change" - lack of disadvantages isn't an advantage
//- Can be introduced without changing your existing development methods
-->

**Disadvantages**
- High learning cost to learn git
- If you don't need to manage past versions or compile patches, there are almost no advantages

---

## Q&A
Questions are welcome for clarity
<!--Need to add link once the editing base is established-->

## Git Clients
Software for saving and manipulating history. All can do roughly similar things.
There are many options, but here are some commonly used in the era community:

### [SourceTree](https://www.sourcetreeapp.com/)
One of the GUI git clients with an excellent UI.
Easy to see and operate, with official Japanese language support.

### [TortoiseGit](https://tortoisegit.org/)
GUI git client.
The official version is in English, but a Japanese language file is distributed by a separate author, and it works on Vista.

### [Git for Windows](https://gitforwindows.org/)
The most official Windows git. Command line is the main interface, but it comes with a GUI as a bonus.
Since git was originally operated on a screen like Windows Command Prompt (as distributed on this site),
using this git client directly may let you access git's more complex features.

<!--Server is dead, so commented out
## era Hosting Server
https://emuera.git-server.com:8443/
A server built specifically for era, where you can share folder history using git.
User registration is required to create dedicated repositories.
-->

---

## Tutorial Sites
### [Git Tutorial for Beginners](https://backlog.com/ja/git-tutorial/) Difficulty:★
A tutorial created by the company that operates the Backlog service to promote their own service.
The content is aimed at people with absolutely no knowledge, with illustrations and key points, making it easy to read.
You can learn the general basics here. Note that it recommends using the Backlog service during the tutorial.
Uses TortoiseGit.

### [Git Fundamentals](http://tracpath.com/bootcamp/learning_git_firststep.html) Difficulty:★★
Explains git's mechanism overview with diagrams.
Based on the command line but uses diagrams and simple language to explain each term - relatively easy to understand.

### [SourceTree Setup Guide](https://ux.getuploader.com/buppa3/download/183) Difficulty:★★★
Written for the era community.
Content explains how to operate SourceTree and which commands to use.
Assumes understanding of git terminology from other tutorials, but helpful when setting up SourceTree.

### [OSDNMagazine](https://osdn.jp/magazine/09/06/19/0340248) Difficulty:★★★
TortoiseGit installation procedure.
Explains how to download TortoiseGit and perform various operations.
Most terms are not explained, so you need to understand them from other tutorials.

### [Dotinstall](https://dotinstall.com/lessons/basic_gitgithub) Difficulty:★★★★
Git tutorial with video explanations.
The content is easy since it uses the command-line format close to the original, but it may look intimidating.
If you want to try git for Windows, use this as a basis for studying.

### [LearnGitBranching](http://k.swd.cc/learnGitBranching-ja/) Difficulty:★★★★
A site where you can simulate git commands.
You can develop a feel for operating in a command-line style git by solving puzzles in a simulated git screen.
There's a menu in the bottom right - rely on it if needed.
<!--
// I used this before and got stuck at weird places - uppercase/lowercase, commit order, etc.
-->

### [Git Tutorial](https://www.atlassian.com/ja/git/) Difficulty:★★★★
Atlassian's (company that makes SourceTree) Git tutorial. Command line format.
Provides cheat sheets for people who have used another version control system.
The tutorial isn't really for complete beginners, but the content is concise and well-organized.
This site also offers specific ideas for git branch and server usage - different from others.
Read this once you're familiar with git.

### [Introduction to Version Control with Git](http://www.plowman.co.jp/school/Git/Git.html) Difficulty:★★★★★
Tutorial using TortoiseGit.
<!--The writing style is a bit annoying but-->
The content is extensive and plentiful, and the language is easy to understand.
Recommended if you want to learn everything from what version control is to complex commands.

---

## Other Reference Materials
### [Pro Git](https://git-scm.com/book/ja/v2)
The git creators' explanation of git.
While it's aimed at people starting with git,
it's quite lengthy and written for people already proficient with similar tools, so it's better suited for those already familiar with git.

## era Community Glossary
<!--
// Created a glossary in case we can explain things more clearly than tutorial sites
-->
Term explanations welcome

### Client
A tool for communicating with a server.
In the context of git, it's software used to access repositories.

### Repository
Simply put, a save data vault.
Created for each folder you want to save, and that folder's history is saved.

### Working Tree
The folder and its contents that are targets for saving.
Refers to the directory where you actually work.

### INDEX, INDEX Tree
Content extracted from the working tree for saving.
When saving, you can adjust what to save here by adding what you've actually worked on in the directory.
This is probably the most confusing part of learning git - think of it as tracking how much has changed from the previous save data to now.

### Commit
The act of saving.
You can save the files in the INDEX.


---

# LTOL-license.en
---
# About LTOL License

Original source page
[eratoho Summary V3 About LTOL License](https://seesaawiki.jp/eratoho/d/LTOL%a5%e9%a5%a4%a5%bb%a5%f3%a5%b9%a4%cb%a4%c4%a4%a4%a4%c6)

---

## Introduction
This page describes and explains **Limited Time Open Licence**/**Timed Open License** (hereafter **LTOL License**), a dialogue license proposal compiled by volunteers.

This license was created to protect the rights of dialogue authors while also considering the convenience of modifiers.

<span style="color:red">However, adopting this license is not mandatory.</span>

Note that for dialogues that have not declared adoption of the LTOL License, you cannot process them based on this license.

---

## License Text

```
1. About This License
   This license is stated to protect the dialogue lines and other content.
   The following actions are prohibited:

1-a. Incorporating into other licenses.
  Porting and using lines written under this license in other licensed dialogues,
   then establishing that license at the porting destination.
   This applies only to derivatives that are subject to license provisions.
   Prevention of license pollution.

1-b. Modifying the license.
   Replacing this license with another license for dialogues under this license.
   Dialogues under this license cannot have their license changed except for version upgrades.
   This license takes effect when stated, and cannot be switched to another license.

1-c. Infringing on other licenses.
   Lines written under this license cannot add code that infringes on the rights of other licenses.
   Only permitted when the source license allows porting and similar actions.

2. Modifications, etc.
   Authors can permit or refuse modifications.
   However, if not specifically stated, permission is granted.

3. License Period
   This states the conditions for the license's validity period and expiration.

3-a. Validity Period
   This license is valid for one year from when the license is stated.
   However, if the dialogue is updated or version-upped, the period extends by another year.

3-b. License Expiration
   When the validity period expires, or if communication with the author who adopted this license
   becomes impossible for six months, this license expires and becomes a free license.
   However, if the author returns, the last stated dialogue version is considered the author's work.
   Subsequent derivatives cannot claim license rights.
```

---

## Explanation

### Article 1: Matters That Should Be Restricted

#### Regarding 1-a
This provision is prohibited when the destination license (hereinafter B) has a clause stating that derivatives are also subject to license B.
In other words, porting is permitted for licenses that do not apply a license to derivatives from license A (hereinafter A).
Porting is also permitted for no license and free licenses.
Note: This license stops at this license.
It does not infect other licenses.

#### Regarding 1-b
Dialogues written under this license cannot have their license changed except for version upgrades or downgrades.
When changing the license, it is done by the author adding notes, or by modifiers when the author permits modifications.
Changes to the license are not permitted in an un-updated state.

#### Regarding 1-c
This is a matter of calling for not infringing on other people's licenses, as a matter of common sense.
It prohibits porting and similar actions when they are prohibited.

---

### Article 2: Permission and Refusal of Modifications

Stated that when refusing, it should be clearly indicated.
If not explicitly stated, it becomes a refusal clause - this is to prevent accidents where not stating permission results in uniform refusal.
It is expected that those who wish to refuse should explicitly state their refusal.

---

### Article 3: License Period

#### 3-a. About Validity Period
When this license is stated or included with a dialogue, a one-year validity period begins from the dialogue file creation date.
That is, the deadline updates each time you update.
Previous versions are also protected under the license.

#### 3-b. About Expiration Conditions
If there are no dialogue updates and the validity period expires, the dialogue becomes free.
However, previous versions that continue to be updated are considered under valid license.
Also, if the validity period exists but all communication with the author becomes impossible, the dialogue expires and becomes free six months after the last update date.
However, if the author returns, the version with this license stated and included is considered the author's work.
Subsequent derivatives cannot claim license rights.
Note: While the author is reachable, there is a one-year grace period for updates from the last creation date.

---

## FAQ

### Q1. What is the purpose of establishing this license?
A1. It was created to answer questions about what to do when you can't contact the dialogue author for maintenance, or when you want to add content but don't know how.

### Q2. I want to upload a revised version by a different person...
A2. It's OK if modification/revision isn't explicitly refused.
However, as etiquette, it's better to contact them on the thread, etc.

### Q3. I'm making dialogue under GNU GPL license - can I port from this license?
A3. No, because it conflicts with Article 1-a.

### Q4. I want to maintain it...
A4. It's OK if refusal isn't explicitly stated, as mentioned in A2.
If you can make contact, why not contact the author on the thread?

### Q5. I don't really understand Article 1-a...
A5. Simply put, it's a license where the destination license applies a license to dialogues created from that dialogue.
Let's call this license A and the destination license B.
Others are C.

```
A (original) → B (destination) → B derivatives
```

This kind of license is NG for the destination.

```
A (original) → B → C derivatives
```

This kind is OK.

By the way, this license does not apply to the destination.
(It doesn't infect.)

First appeared in [eratoho General Thread #74](https://jbbs.shitaraba.net/bbs/read_archive.cgi/otaku/11514/1267895273/) post 530.


---

# modification-manual.en
---
# Introduction to modding  

Original page  
[era series discussion thread, Summary Wiki V3, Introduction to modding](https://seesaawiki.jp/eraseries/d/%b2%fe%c2%a4%c6%fe%cc%e7)  

---  
The good thing about era is that anyone can edit it easily.
You can just play around with it, but since you're here, why not try tinkering with it?

## What you need

### era variant
Prepare the variant you want to play around with and don't forget to back it up

### Code Editor
I recommend [Sakura Editor](https://sakura-editor.github.io/) or [Visual Studio Code](https://code.visualstudio.com/).

Visual Studio Code (hereinafter referred to as VSCode) is more convenient in terms of functionality, but since the default settings are in English, it may be difficult to set up.

CSV files can be opened using a spreadsheet program such as Excel,
but this is not recommended as the automated processing can cause problems.

---  

## Let's modify it

### **Don't forget to back up before you do anything.**

### Understanding the basic file structure

The basic file structure of era games is as follows:
- EmueraXXX.exe
- CSV folder
- ERB folder 

The CSV folder contains data used by the system, such as character status, abilities, qualities, experience, and items, in CSV format (text separated by commas).

The ERB folder contains the program code that describes how it works.

Basically,
if you want to rewrite only the data, such as characters, you will rewrite the contents of the CSV folder,
and if you want to rewrite the processing, you will rewrite the contents of the ERB folder.


CSV can only load certain file names (such as `CharaXXX.csv` or `Talent.csv`), so there's no problem creating a file like `a.csv`, but
**ERB will load all files with the extension .ERB in the ERB folder**.
If you want to put the backup in the ERB folder, make sure to change the extension.

---

### Editing characters  
Open `CharaXXX.csv` in the CSV folder. You should see a variety of strings separated by `,`.
`Chara0.csv` is the main character in most variants, and `Chara1.csv` and onwards are the character data for the characters to be trained.

Character data is written in the following order, separated by `,`.

- Number(番号)
Chara number. Referenced in scripts.
In most cases, this is the same number as the `XXX` in `CharaXXX.csv`.

- Name(名前)
- Callname(呼び名)(nickname)
The name will be used in menu displays such as "Training ○○", and the callname will be used in dialogues during training.
Therefore, use the full name for the name, and a nickname or an abbreviated name for the callname.
In japanese, name is usually "FamilyName + Name", and callname is just the name. In english, name is usually "Name + FamilyName" instead, swapped around.

- Base(基礎)
In most variants, `Base,0` is the maximum stamina, and `Base,1` is the maximum willpower.
`Base,2` is only available to the protagonist and male characters, but it is an ejaculation gauge.
If `Base,2` and above are not present, they are usually initialized to appropriate values, so there is no need to add them to characters that do not have them. 

- Talent(素質)
The presence or absence of talent. `Talent,XXX` means "the person has talent number XXX."
The numbers correspond to values ​​in `Talent.csv`, so rewrite them while looking at `Talent.csv`.

- Ability(能力)
Initial abilities. `Ability,XXX,YYY` means "ability number XXX is at level YYY."
The numbers correspond to values ​​in `Abl.csv`, so rewrite them while looking at `Abl.csv`.

- Experience(経験)  
Initial experience. `Experience,XXX,YYY` means "experience number XXX is YYY".
The numbers correspond to values ​​in `exp.csv`, so rewrite them while looking at `exp.csv`.

- Affinity(相性)(compatibility)  
It depends on the variant, but `compatibility,XXX,YYY` is often used to mean "When **trained** by character with character number XXX, the effect is YYY% of the normal effect."
When THIS character **is trained by** XXX character, and NOT when THIS character **trains** the XXX character.
Characters not listed are 100%, or ±0.

- Flag(フラグ)  
This is where you write data to be referenced by the script.
The meaning changes completely depending on the variant,
so try things like increasing her energy by 10 times, increasing her compatibility with you to the highest level,
making her a `[Virgin]`, adding `[Love]`, removing `[Denial of Pleasure]`, etc. Do whatever you like.

---

### Adding a new character  
This procedure is highly variant-dependent and will not be explained in detail.

<details><summary>Example of how it's done in eratoho.</summary>

```
First, create a new CharaXXX.csv file. It goes without saying that XXX should not overlap with existing characters, but eramaker can only read XXX from 0 to 99, so keep that in mind.

However, this alone will not add the character to the game.
The next thing to modify is Item.csv. If you open it and look at the bottom, you should see a row of items with character names.
This is where you add items that will be available to purchase in the game for the character you just created.
The format is item number, item name, price.

There is a correlation for character numbers and item numbers, so be sure to follow it.
(Example: Character number: 5 → corresponding item: 55 Character number: 6 → corresponding item: 56...)

This is not the end of it. Next, open the ERB folder.
There are two options, depending on whether SHOP2.ERB is inside or not.

1) If there is no SHOP2.ERB:

Open SYSTEM.ERB and near the top you should see the following text:
>ITEMSALES:51 = 1~~  
>ITEMSALES:52 = 1~~  
>ITEMSALES:53 = 1~~  
>　　　:  
Add the following text:
>ITEMSALES:(Number of item just added) = 1  
That's it.  

2) If there is a SHOP2.ERB (we're dealing with a version with large number of people):

Open SYSTEM.ERB in the same way, but look for the following text:
>FLAG:1000 = 1000~~  
>FLAG:1001 = 500~~  
>FLAG:1002 = 300~~  
>　　　:  
Add the following text:
>FLAG:(character number + 999) = (price of just added item)
```

</details>

---

### Increasing your money  
If you search for `MONEY =` in the ERB folder, you will find a statement like

```
MONEY = 10000
```

, so try changing the number to whatever you want.

In many variants, `MONEY` contains the current amount of money. Value containers like this `MONEY` are called ***variables***.
`MONEY = 10000` does not mean "MONEY is equal to 10000", but rather "put the number 10000 into the variable MONEY".

Also, if you search the ERB folder, you should be able to find a line that says:

>@EVENTFIRST  

A block of script starting with ```@xxx``` like this is called a **function** (or more rarely, a procedure).
@EVENTFIRST is the function that is called when you select `[0] Start from the beginning`.
In many cases, this function is used to set up the game and select the game mode.

---

### Don't decrease your money
By applying the above, you can keep your money constant no matter how many times you shop, without it decreasing.
Basically, you just write `MONEY = 10000` in a function that is called many times during the game.

Here, we will explain how to make your money constant when you move to the shop screen.
The `@EVENTSHOP` and `@SHOW_SHOP` at the beginning of `SHOP.ERB` (the exact file name may vary) are functions that are called every time you move to the shop screen.
If you write `MONEY = 10000` in there, your money will be set to `10000` every time you go to the shop screen.
If you're greedy and wondering, "What if I run out of money while shopping?", you can write it in the `@EVENTBUY` function at the bottom. (Depending on the variant, it may be a different function.)
This is a function that is called every time an item is purchased, so if you set your money at the end of the function,
your money will not decrease no matter what you buy.

Alternatively, you can do it the following way.
Create a new ERB file in the ERB folder (Create new -> Text file -> Rename with extension).
As long as the extension is `.ERB`, you can set the name freely.
Then write the following three lines in it:

>@EVENTBUY  
>#LATER  
>MONEY = 10000  

"But `@EVENTBUY` is already in `SHOP.ERB`. Can I have two of the same function?" **No problem. **
`@EVENTSHOP`, `@EVENTBUY`, and the previous `@EVENTFIRST` are special functions called **event functions**,
and have the characteristic that no matter how many functions with the same name there are, they will all be executed.
Therefore, it is very useful when you want to trigger several different types of events at a certain timing 
(when training starts, when a training command is executed, when training ends, etc.). The best example is **dialogues**.

The second line, `#LATER`, sets a **property** for that function, it can only be used with event functions.
`#LATER` means "If there are multiple `@EVENTBUY`s, this `@EVENTBUY` will be executed last."
There are also other properties, `#PRI`, which executes first, and `#SINGLE`, which prevents other similar event functions from being executed again.

---

### Halve the loss of stamina and energy
The following section is at the end of `SOURCE.ERB` (file name depends on the variant).

``` { #language-erb title="ERB" }
;-------------------------------------------------
;Loss of stamina and energy
;-------------------------------------------------
BASE:0 -= LOSEBASE:0
BASE:1 -= LOSEBASE:1
;PRINT stamina-
;PRINTV LOSEBASE:0
;PRINT energy-
;PRINTVL LOSEBASE:1
```

`BASE:0` and `BASE:1` refer to stamina and energy, respectively,
`LOSEBASE:0` and `LOSEBASE:1` refer to loss of stamina and energy, respectively.
So let's add two lines like this:

``` { #language-erb title="ERB" }
;-------------------------------------------------
;Loss of stamina and energy
;-------------------------------------------------
LOSEBASE:0 /= 2 ;Added part
LOSEBASE:1 /= 2 ;Added part
BASE:0 -= LOSEBASE:0
BASE:1 -= LOSEBASE:1
;PRINT stamina-
;PRINTV LOSEBASE:0
;PRINT energy-
;PRINTVL LOSEBASE:1
```

`/= 2` means to divide by 2, and can also be written as follows, but this is more elegant.

> LOSEBASE:0 = LOSEBASE:0 / 2


---

# README.en
---
---
hide:
  - toc
---
# Production Manual
This will compile manuals that serve as references for era production.

## For Beginners
- [Modification Guide](modification-manual.md) (Source: era Series Discussion Thread Summary Wiki V3)
- [Variant Production/Tutorial](erawiki-tutorial.md) (Source: era Series Discussion Thread Summary Wiki V3)
- [Variant Production/Title Preparation](erawiki-title.md) (Source: era Series Discussion Thread Summary Wiki V3)
- [Variant Production/Title Practice](erawiki-title2.md) (Source: era Series Discussion Thread Summary Wiki V3)
- [Variant Production/ERB Production Practice](erawiki-ERBmanual.md) (Source: era Series Discussion Thread Summary Wiki V3)

## For Intermediate Users
- [eratoho Summary V3 ERB Syntax Lecture](eratohowiki-ERBmanual.md) (Source: eratoho Summary V3)
- [ERB Development Q&A](eratohowiki-ERB-QandA.md) (Source: eratoho Summary V3)
- [System Modification Q&A](erawiki-modification-QandA.md) (Source: era Series Discussion Thread Summary Wiki V3)

## For Current Creators
- [Notes on Emuera](Emuera-etc.md) (Source: eratoho Summary V3)
- [About Licenses](WhatIsLicense.md) (Source: eratoho Summary V3)
- [About LTOL License](LTOL-license.md) (Source: eratoho Summary V3)
- [How to Use Git](HowToUseGit.md) (Source: eratoho Summary V3)
- [git Operations with VSCode](erawiki-vscode-git.md) (Source: era Series Discussion Thread Summary Wiki V3)

## Other Resources
- [Glossary](glossary.md)


---

# WhatIsLicense.en
---
# About Licenses

<!--
// The wiki's license page was about LTOL, so I made this up
-->

Original source page
[eratoho Summary V3 About Licenses](https://seesaawiki.jp/eratoho/d/%a5%e9%a5%a4%a5%bb%a5%f3%a5%b9%a4%cb%a4%c4%a4%a4%a4%c6)

---

## About Licenses - What to Do in 3 Lines

**To avoid trouble,**
**For dialogue and variant/modification patches,**
**we recommend stating whether modifications and redistribution are permitted or not.**

---

## What is a License?

> A license (US: license, UK: licence) is permission to do something that would otherwise be illegal, or the document granting such permission.
> [From wikipedia](https://ja.wikipedia.org/wiki/%E3%83%A9%E3%82%A4%E3%82%BB%E3%83%B3%E3%82%B9)

It's that thing usually found at the back of readme files.

---

## Why are Licenses Needed?

When era modifications first began, modifications were done under implicit understanding.
However, now that many people are involved in creation, stating permissions/refusals for modifications and redistribution is recommended to prevent troubles.

**Even if you want to say "you can do whatever you want with what I made," if you write nothing, <span style="color:red">everything is treated as prohibited</span>, so <span style="color:red">we recommend adding a note</span>.**

**<span style="color:red">There is actually a precedent where dialogue was used commercially without permission</span>**

**We strongly recommend stating the usable scope of dialogue when allowing modifications (e.g., prohibited for use outside era, commercial use prohibited, etc.)**
For details on the background, please see the discussion about [Toho Tessaku Roku incident](http://jbbs.shitaraba.net/bbs/read.cgi/otaku/16783/1448035831/) on the bulletin board.

---

## What Should I Write?

- **Modification** (syntax fixes, dialogue additions, etc.) - **permission or prohibition**
- **Redistribution** (inclusion in compilations, re-uploads) - **permission or prohibition**

Having at least these two points covered is fine.
If you don't care about the details, **you don't have to use the checklist or license template below.**

For modification patches or feature additions other than dialogue, you may also want to state:

- **Incorporation** (incorporating features into the variant) - **permission or prohibition**
- **Porting** (porting to a different variant) - **permission or prohibition**

**We recommend permitting modifications and redistribution unless there's a specific reason not to.**

<!--
//**License Text Examples
//- "Feel free to modify and redistribute"
//License text recommendation for those who find licenses troublesome. Copy and paste freely!
//-- "(Add above) However, when modifying, please state that it is a modification"
//Commonly used pattern
//- "Prohibit modifications/redistribution except for bug fixes and dialogue compilations"
//Recommendation for those who don't want their justice tainted
-->

---

## For Those Who Want Detailed Licenses

### Cases Where Modification/Redistribution Permission is Needed

- Re-uploading when files disappear due to uploader troubles
  Prevents situations where the author is absent and recovery becomes impossible
- Inclusion in dialogue compilations
- Variant/modification patches
  Inconvenient if modifications aren't allowed

### Cases to Prohibit

- Modification
  Don't want their "justice" tainted
- Redistribution
  Not yet complete
  Special dialogue (joke dialogue, etc.)
  Want to keep track of everything themselves

### Checklist When Writing Dialogue Licenses

1. About the Dialogue
   State the following items:

- Dialogue name (better if it clearly shows its character)
- Dialogue author name (can be like "Thread XX No. 123", but something unique that doesn't conflict with others) (include original author for additions, etc.)
- Contact method (email or blog; if neither exists or you don't want to publish, IRC channel and time you respond, or frequency of checking chat thread/main thread)
  Multiple methods are better if available.
- Update date or version

These items are not directly related to the license, but we recommend writing them because not having them causes confusion about which dialogue version is being updated.

2. Modifications
   Clarify which parts can be modified:

- Correcting obvious typos
- Fixing ERB syntax that causes operational issues
- Fixing mismatches between comments in ERB and actual behavior to match comments
- Updates required to support variant version upgrades
- Partial or full porting of dialogue to other variants
- Additions without modifying existing dialogue
- Quoting or porting only some functions/features within the dialogue
- All free to use

3. Redistribution

- Re-uploading
- Inclusion in dialogue compilations

<!--
//4. Other
//- License inheritance
//  About the license after modifications
//- Timed license
//  Becomes free after a certain period
//  LTOL
//- Items requiring author's permission
//  If contact is lost, it effectively becomes equivalent to prohibition
-->

### License Template
A license template created by volunteers.
There is no rule that you must use this license.
[About LTOL License](LTOL-license.md)
<!---[[eratohoYM Dialogue Template License Template>Templates・Tools#YM_KOJO_L]]-->


---


