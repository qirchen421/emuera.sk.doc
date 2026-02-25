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
