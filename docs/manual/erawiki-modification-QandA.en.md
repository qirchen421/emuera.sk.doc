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
### About Private Variables (A～Z and LOCAL, not #DIM) { #azlocaldim }
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

### Movement Within Functions (Control Structures) { #_2 }

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

### Writing Repetition (`FOR` and `REPEAT` Differences and Recommended Style) { #forrepeat }
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

### RESULT and Inline Functions { #result }
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

### IF/ELSEIF Groups Can Be Changed to SELECTCASE { #ifelseifselectcase }
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

### Eliminating Magic Numbers { #_6 }

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

### How to Use GREP { #grep }

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

### Bit Operations Using Binary (`STAIN` Mechanism) { #2stain }
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
[eratoho Summary V3 - ERB Syntax Lecture 3](../manual/eratohowiki-ERBmanual.en.md#branching)

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
### Please Use UTF-8 for Character Encoding Whenever Possible { #utf-8 }

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
