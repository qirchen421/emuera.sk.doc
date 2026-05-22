# Variant Creation/Title Practice

Original page:  
[era series discussion thread, Summary Wiki V3, Title practice](https://seesaawiki.jp/eraseries/d/%a5%bf%a5%a4%a5%c8%a5%eb%bc%c2%c1%a9%ca%d4)

---

- [Tutorial](erawiki-tutorial.en.md)
- [Title Preparation](erawiki-title.en.md)
- Title Practice
- [ERB Creation Practice](erawiki-ERBmanual.en.md)

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

- [eratoho wiki V3 → Emuera Notes → Emuera Tutorial for Developers](Emuera-etc.en.md#emuera-tutorial-for-developers)

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

- [EmueraWiki → eramaker basic Developer Info → Emuera Added Extended Syntax → User-defined Variables](../Emuera/user_defined_variables.en.md)

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

- [eratoho wiki V3 → Development Related → ERB Syntax Tutorial 2 → Decimal Multiplication](eratohowiki-ERBmanual.en.md#branching-and-iteration)

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

- [EmueraWiki → eramaker basic Developer Info → Emuera Added Extended Syntax → General → Line Concatenation](../Emuera/expression.en.md#concatenate-rows)

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

- [EmueraWiki → eramaker basic Developer Info → Emuera Added Extended Syntax → Functions Usable in Expressions → str TOSTR(int value, str format = "")](../Reference/TOSTR.en.md)

There are many convenient expression functions, but there are too many to memorize.

The mysterious English-looking parts that aren't default variable names or DIM-declared names are mostly commands, and commands don't have `()`.  
If they have `()`, they're functions, and if they appear abruptly without `@` or `CALL`, they're functions usable in expressions.  
Search the page listing these expression functions.  
(Whether this judgment is correct aside, I think you can mostly find things this way)  
[List of Commands and Expression Functions](../Reference/README.en.md)

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

- [eramaker ERB File Format (Provisional) → Variables and Commands → Commands → Conditional Judgment](../eramaker/ERB_format.en.md#variables-and-instructions)

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

- [EmueraWiki → Emuera Added Extended Syntax → General → Assignment to String Variables Using String Expressions](../Emuera/expression.en.md#string-array-element)

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

- [Reference → `DRAWLINE`](../Reference/DRAWLINE.en.md)

> DRAWLINE draws a line from the left edge of the screen to the right edge like "----".

---  

### `_Replace.csv`
By default in Emuera, `DRAWLINE` creates a line like `-` connected together.  
Some might want to change it to a solid line `─` or make it a double line with `=`.  
How do you change the line displayed when using `DRAWLINE`?

- [EmueraWiki → eramaker basic Developer Info → _replace.csv](../Emuera/replace.en.md)

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

- [Reference → `CUSTOMDRAWLINE`, `DRAWLINEFORM`](../Reference/CUSTOMDRAWLINE.en.md)

``` { #language-erb title="ERB" }  
CUSTOMDRAWLINE ─  
```

Like this, specify the symbol you want to use for the line each time.

---  

### What is `ALIGNMENT CENTER`?

- [Reference → `ALIGNMENT`](../Reference/ALIGNMENT.en.md)

Alignment means to arrange or align.  
It specifies left-align, center-align, or right-align text.

``` { #language-erb title="ERB" }  
ALIGNMENT RIGHT ;right-align  
ALIGNMENT CENTER ;center-align  
ALIGNMENT LEFT ;left-align  
```

Usually it's left-aligned, but here it's center-aligned to look like a title screen.

---  

### What is `PRINTFORML`? {#printforml}
This is a type of command that displays strings.

- [Reference → `PRINT`](../Reference/PRINT.en.md)

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

- [EmueraWiki → eramaker basic Developer Info → Emuera Added Extended Syntax → Constants and Variables](../Emuera/variables.en.md#gamebasecsv-variables)

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

- [Reference → `PRINT` family](../Reference/PRINT.en.md)
- [Reference → Display Operations / Font Operations / Display Specifications](../Reference/README.en.md#display-font)
- [Reference → `HTML_PRINT`](../Reference/HTML_PRINT.en.md)

For image display,

- [Reference → `PRINT_IMG`](../Reference/PRINT_IMG.en.md)
- [About Resource Files](../Emuera/resources.en.md)
- [Reference → `HTML_PRINT`](../Reference/HTML_PRINT.en.md)
- [Reference → Image Processing Related](../Reference/README.en.md#image)

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

- [Reference → Loop/Branch Syntax](../Reference/README.en.md#flow-control)
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

- [Reference → `PRINTBUTTON`](../Reference/PRINTBUTTON.en.md)

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

[System Modification Q&A → Basics → IF/ELSEIF Blocks Can Be Converted to SELECTCASE Statements](erawiki-modification-QandA.md#ifelseifselectcase)

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

- [Reference → `RESETDATA`](../Reference/RESETDATA.en.md)

If you don't issue this command, when returning via "Return to Title" after already playing the game,  
other data might remain.

---

### `ADDDEFCHARA`

``` { #language-erb title="ERB" }  
;ADDDEFCHARA exists as a dedicated function to reproduce eramaker's initialization process.  
;Use ADDCHARA in other situations.  
```

- [Reference → `ADDDEFCHARA`](../Reference/ADDDEFCHARA.en.md)

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

- [Reference - `REUSELASTLINE`](../Reference/REUSELASTLINE.en.md)

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

Next Page → [ERB Production Practical Edition](erawiki-ERBmanual.en.md)
