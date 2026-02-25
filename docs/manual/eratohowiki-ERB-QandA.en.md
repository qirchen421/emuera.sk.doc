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
