# CSV_format.en
---
# CSV format  
eramaker CSV file format (provisional version)  
I think it's hard to get a picture just by looking at this file. It is easier to understand if you play the sample game first, and then look at the CSV files of the sample game while looking at it.  

## Basic Info  
### About CSV Files  
Put a folder named CSV directly under eramaker.exe.  
The CSV files include the following.  

|File name   |Summary                                                                       |
|:-----------|:-----------------------------------------------------------------------------|
|GameBase.csv|Registers the basic data of the game.                                         |
|Palam.csv   |Registers parameters used during training (such as C Pleasure, Pain, Hate)    |
|Abl.csv     |Registers character abilities (such as V Sense, Service, Masochism).          |
|Talent.csv  |Registers qualities (such as Cowardice, Self-Control, Quick Recovery).        |
|Mark.csv    |Registers marks (such as Pleasure Mark, Shame Mark).                          |
|Exp.csv     |Registers experiences (such as V Exp, Masturbation Exp).                      |
|Train.csv   |Registers training commands (such as Cunnilingus, Blowjob, Whip).             |
|Item.csv    |Registers items (such as Vibrator, Needle).                                   |
|Str.csv     |Registers various sentences to be used in the game.                           |
|CharaXX.csv |Registers the initial data of your character. From Chara00.csv to Chara99.csv.|

### How to write a CSV file  
In all CSV files,  

- If the first character in the first column is a ; (semicolon), the line is ignored. Empty lines are also ignored.  

**Example**  

**Setting up the physical and mental strength**

	基礎,0,2000  
	基礎,1,1000  

**Setting up abilities**  

	能力,0,2  

- Please use half-width characters when entering numbers.  

	**Correct**  

	121,Futanari  

	**Wrong**  

	１２１,Futanari  

- It won't work properly if you put "" around a string, which seems to be the default setting in OpenOffice.  

	**Correct**  

	0,Obedience  
	1,Desire  
	2,Technique  

	**Wrong**  

	0,"Obedience"  
	1,"Desire"  
	2,"Technique"  

Please refer to the help of your spreadsheet software for the setting method.  

## Format for each file  
### Format for GameBase.csv  
Write instructions in the first column and data in the second and subsequent columns.  

#### Game Code  
- コード,(Number) - Must be used in japanese.  
- Sets the game code to (Number). This is used to prevent you from accidentally loading another game's save data. (Number) can be any value.  

#### Version  
- バージョン,(Number) - Must be used in japanese.  
- Sets the version of the game to (Number). On the screen, you will see (Number) divided by 1000. By default, save data from a different version will not be loaded.  

#### Title  
- タイトル,(String) - Must be used in japanese.  
- Sets the title of the game to (String). It is displayed at startup.  

#### Author  
- 作者,(String) - Must be used in japanese.  
- Sets the author of the game to (String). It is displayed at startup.  

#### Development Year  
- 製作年,(String) - Must be used in japanese.  
- Sets the production year of the game to (String). It is displayed at startup. Since it is not a numerical value, it is possible to put 2005-2006, for example.  

#### Additional Information  
- 追加情報,(String) - Must be used in japanese.  
- Sets the game's additional information to (String). It is displayed at startup.  

#### Character from the beginning  
- 最初からいるキャラ,(Number) - Must be used in japanese.  
- Sets the character who is not the main character at the start of the game. It's used in games like Era Light, where the characters to be trained are decided from the beginning. (Number) specifies the character number. For example, if you specify 1, you get Chara01.csv, if you specify 12, you get Chara12.csv.  

#### No Items  
- アイテムなし,(Number) - Must be used in japanese.  
- If you set (Number) to 1, you will be able to train without items when you need to train a vibrator. When you make a game that has no concept of items, make it 1.  

#### Admit different versions  
- バージョン違い認める,(Number) - Must be used in japanese.  
- If the version of the saved data is (Number) or more, it can be loaded even if the version is different. Set this if you have upgraded to a new version that does not affect the entire system.  

	**Example**  
	**Save data after version 1.20 can be loaded.**  

		バージョン違い認める,1200  

### Format for Palam.csv  
- Write the Parameter number in the 1st column and the Parameter name in the 2nd column.  
- It is recommended that the Parameter numbers start at 0 and you do not make blank free numbers.  
- The maximum Parameter number is 99.  

### Format for Abl.csv  
- Write the Ability number in the 1st column and the Ability name in the 2nd column.  
- It is recommended that the Ability numbers start at 0 and you do not make blank free numbers.  
- The maximum Ability number is 99.  

### Format for Talent.csv  
- Write the Talent number in the 1st column and the Talent name in the 2nd column.  
- You can also create blank numbers.  
- The trait number is a minimum of 0 and a maximum of 99.  

### Format for Mark.csv  
- Write the Mark number in the 1st column and the Mark name in the 2nd column.  
- It is recommended that the parameter numbers start at 0 and you do not make blank free numbers.  
- The maximum Mark number is 99.  

### Format for Exp.csv  
- Write the Experience number in the 1st column and the Experience name in the 2nd column.  
- You can also create blank numbers.  
- The minimum experience number is 0 and the maximum is 99.  

### Format for Train.csv  
- Write the Command number in the 1st column and the Command name in the 2nd column.  
- You can also create blank numbers.  
- The minimum Command number is 0 and the maximum is 99.  

### Format for Item.csv  
- Write the item number in the 1st, the name of the item in the 2nd, and the price of the item in the 3rd.  
- You can also create blank numbers.  
- The minimum item number is 0 and the maximum is 99.  

### Format for Str.csv  
- Write the string number in the 1st column and the string in the 2nd column.  
- There is no limit to the length of the string.  
- You can also create blank numbers.  
- The minimum string number is 0 and the maximum is 19999.  

### Format for CharaXX.csv  
#### Number  
- 番号,(Number) - Must be used in japanese.  
- Sets the character number to (Number). This is important when creating compatibility between characters or special versions of the same character.  

#### Name  
- 名前,(String) - Must be used in japanese.  
- Sets the name of your character to (String).  
- There is no limit to the length of the string, but if it is too long, the display may be disturbed.  

#### Nickname  
- 呼び名,(String) - Must be used in japanese.  
- Sets the name of the character to (String). Use it for characters with nicknames.  
- There is no limit to the length of the string, but if it is too long, the display may be disturbed.  

#### Base Attributes  
- 基礎,(Number 1),(Number 2) - Must be used in japanese.  
- Sets the first (Number 1) of the character's basic parameters to (Number 2).  
- In the sample game, the number 0 is your health, the number 1 is your energy, and the number 2 is your ejaculation gauge.  
- (Number 1) is a minimum of 0 and a maximum of 99.  

	**Example**  
	**2000 in stamina and 1000 in spirit.**  

		基礎,0,2000  
		基礎,1,1000  

#### Ability  
- 能力,(Number 1),(Number 2) - Must be used in japanese.  
- Set the first (Number 1) of your character's initial abilities to (Number 2).  
- For (Number 1), use the ability number specified in Abl.csv.  
- There is no particular limit to (Number 2), but in the sample game, it is set from 0 to 5.  

#### Talent  
- 素質,(Number) - Must be used in japanese.  
- Adds the (Number) trait to the Character.  
- For (Number), use the talent number specified in Talent.csv.  

#### Experience  
- 経験,(Number 1),(Number 2) - Must be used in japanese.  
- Set the character's initial experience number (Number 1) to (Number 2).  
- For (Number 1), please use the experience number specified in Exp.csv.  

#### Affinity  
- 相性,(Number 1),(Number 2) - Must be used in japanese.  
- Set the affinity for the (Number 1) character to (Number 2).  
- For (Number 1), use the character numbers specified in CharaXX.csv, respectively.  
- Note that 100 (Number 2) is the standard. Lower means incompatible, and higher means that it is compatible.  

#### Assistant  
- 助手,(Number) - Must be used in japanese.  
- If (Number) is set to 1, it is treated as an assistant from the initial state.  

#### Flags  
- フラグ,(Number 1),(Number 2) - Must be used in japanese.  
- Set the (Number 1)-th character flag to (Number 2).  
- (Number 1) must be a minimum of 0 and a maximum of 999.  
- The character flags can be used freely, up to the game creator's ideas. In the sample game, a character whose 0th flag is 1 is a "special character".  
- (※ It's called a flag, but it can be any integer value other than 0 and 1)  

## Useful things to know  
### About *** and +++ in Str.csv  
- In the Str.csv of the sample game era light, there are a lot of ***, +++, etc. In the game, they should be translated as "Akari" and "Hiroyuki-chan" respectively.  
- You'll need some knowledge of ERA BASIC to fully understand this, but for the time being know that *** is the name of the character you're training, +++ is the name of the main character, and $$$ is the callname of the character you're training.  
- In the sample game erakanon there is an assistant system. /// is the name of the assistant and === is the name of the person (main character or assistant) who is doing the training at the time.  


---

# ERB_format.en
---
#ERB format  
eramaker ERB file format (provisional)  
I think it's hard to get a picture just by looking at this file. It is easier to understand if you play the sample game first, and then look at the ERB files of the sample game while looking at it.  

## Basic Info  
### About the ERB file  
- Put a folder named ERB directly under eramaker.exe, and put ERB file in it.  
- You can use any file name as long as the extension is .ERB  
- Please edit it with a text editor such as Notepad.  

### How to write an ERB file  
#### Comments & Spaces  
In all ERB files,  

- If the first character in the first column is a ; (semicolon), the line is ignored. Empty lines are also ignored.  
- (Don't put a semicolon at the end of a line, or a comment after it.) Both ways can be done in Emuera.  
- Any number of spaces or tabs at the beginning of a line will be ignored.  

	**CORRECT**

		;Setting up the money  
		MONEY = 500  
		;Setting the time  
		DAY = 10  
		TIME = 1  
		;Game start  
		PRINT What do we do now?  

	**Also CORRECT in Emuera**
	**The ; at the end of MONEY = 500 is not needed**
	**MISTAKE in eramaker**

		MONEY = 500;  
		TIME = 5; (Start on Day 5)  

#### Half-width input  
Please use half-width characters when inputting numbers, instructions, variable names, function names, etc.  

	**CORRECT**  

		MONEY = 500  
		PRINT Let the game begin.  

	**MISTAKE**  

		ＭＯＮＥＹ ＝　500  
		ＰＲＩＮＴ Let the game begin.  
		Inputting a string  
		It doesn't work properly if you enclose a string with "".  

	**CORRECT**  

		PRINT The day is over...  

	**MISTAKE**  

		PRINT "The day is over..."  
		It' s all in one line  
		Even when writing long instructions, don't split them into more than two lines.  

	**CORRECT**  

		PRINT Nayuki's body was sensitive and she had a lot of experience, so she was happy even if it was a little rough. Even though she denies it with her mouth, Nayuki is getting more and more promiscuous. But the peculiar circumstance of her being asleep made me hesitant to make a bolder move.  

	**MISTAKE**  

		PRINT   
		Nayuki's body was sensitive and she had a lot of experience, so she was happy even if it was a little rough. Even though she denies it with her mouth, Nayuki is getting more and more promiscuous. But the peculiar circumstance of her being asleep made me hesitant to make a bolder move.  

## Variables and Instructions  
### About the variables  
In training SLG, the change of parameters is vital. Therefore, it is necessary to learn how to use "variables" that can store data and perform calculations such as adding and multiplying data.  

#### Putting a number in a variable  
Use = (equal). Please enter it in half-width characters. Before and after = is separated by a half-size space or a tab.  
The numbers that can be used in eramaker are basically integers. Do not enter a decimal point.*  

**CORRECT**  

	MONEY = 500  

**MISTAKE**  

	MONEY ＝ 500  
	MONEY=500  
	MONEY = 3.14  

***Adendum**: Emuera has since added more number literal types. Check Constants (Literals) for more information.  

### Putting a calculated number into a variable  
Use = in the same way. Note that * is for multiplication, / is for division, and % is for the rest of the division.  
Fractions are rounded down when the result is a decimal.  

**CORRECT**  

	;set MONEY to 74  
	MONEY = 15+34+25  
	;set MONEY to 650  
	MONEY = 150+(100-50)*10  
	;set MONEY to 3  
	MONEY = 10/3  
	;set MONEY to TIME multiplied by 10  
	MONEY = TIME*10  
	;If DAY is 0,1,2... then MONEY becomes 0,10,20... and returns to 0 when it exceeds 7.  
	MONEY = DAY%7*10  

**MISTAKE**  

	MONEY = 500×10÷4  

#### Add or multiply variables  
Use +=, -=, *=, /=, %=.  

**EXAMPLE**  

	MONEY = 100  
	TIME = 12  
	;set MONEY to 150  
	MONEY += 50  
	;set MONEY to 750  
	MONEY *= 7-2  
	;set MONEY to 80  
	MONEY -= 670  
	;set MONEY to 8  
	MONEY %= TIME  
	;set MONEY to 1  
	MONEY /= TIME-4  

#### About Arrays  
- The variables can be accessed as an "array". An "array" is for managing multiple data with the variable of the same name.  
- To access the array, use : (colon). Please enter it in half-width characters. Don't put any spaces in between.  
- The number that can be put after the array is at least 0. The maximum value is determined by the variable. See the list for more information.  
- You can also put a variable instead of a number after the array. However, you can't put an array after an array.  

**CORRECT**  

	A = 35  
	;Set the FLAG to a value  
	FLAG:0 = 0  
	FLAG:2 = 10  
	FLAG:35 = 440  
	;Calculate with FLAG  
	FLAG:A += 100/FLAG:2  
	FLAG:2 *= FLAG:A  

**MISTAKE**  

	FLAG：0 = 10  
	FLAG : 52 = 1000  
	FLAG:FLAG:20 = 10000  
	FLAG:91881816 = 1  

#### About the Double Sequence  
- Exceptionally, some variables can be accessed using two colons. Usually variables related to your character's data.  
- Use (variable name):(character number):(variable number) to access it.  

#### EXAMPLE  

	A = 2  
	;Makes the 5th character's 0th ability LV3.  
	ABL:5:0 = 3  
	;A (2nd) character's first experience is increased by 1.  
	EXP:A:1 += 1  

#### Display the variable on the screen  
- The easiest way to do this is to use the PRINTV and PRINTVL commands. We will discuss the instruction in more detail later.  

**EXAMPLE**  

	A = 2  
	PRINTV A  
	A = 30  
	PRINTVL A  
	B = 400  
	PRINTVL B  

**RESULTS**  

	230  
	400  

#### About String Variables  
- Regular variables can only handle integers, but there are string variables that can handle strings. However, the features are limited.  
- To display a string variable on the screen, use the PRINTS or PRINTSL instruction.  

**CORRECT**  

	STR:0 = aiueo  
	PRINTSL STR:0  

**MISTAKE**  

	;You can't add it with +=  
	STR:0 += ueo  

#### Variable List  
See [here.](variables.en.md)  

### About Instructions (Basic)  
Instructions can be used to display characters on the screen and to make conditional judgments.  

#### How to write an instruction  
- The basic writing style is (instruction name) (instruction content). Separate (instruction name) and (instruction content) with a half-size space or tab.  
- If there is no (instruction content), start a new line as it is.  
**CORRECT**  

	PRINT This is a test.  
	SIF 3 == 1+2  
	PRINT Obviously.  
	WAIT  

**MISTAKE**  

	PRINTThis is a test.。  
	;wait for input  
	WAIT 0  

#### Displaying Text  
- PRINT is an instruction to display text; PRINTL displays text and starts a new line; PRINTW displays text and waits for input.  
- The PRINTV command displays the content of a variable, the PRINTVL command displays the content of the variable and makes a new line, the PRINTVW command displays the content of the variable and waits for input.  
- PRINTS is an instruction that displays the contents of a string variable, PRINTSL displays the contents of the string variable and starts a new line, PRINTSW displays the contents of the string variable and waits for input, and PRINTSW displays the contents of the string variable and waits for input.  
- PRINTFORM can display a combination of characters, variables, and string variables; PRINTFORML can do the same and break a new line; PRINTFORMW can do the same and wait for input.  
- PRINTFORMS is the same as PRINTFORM. PRINTFORMSL is the same as PRINTFORM, but with a new line, PRINTFORMSW is the same as PRINTFORM and waits for input.  
(If you are waiting for input with a W at the end of the command, press Enter to move on, and the line will eventually be broken.  

**EXAMPLE**  

	MONEY = 500  
	NAME:0 = Sato  
	PRINT The money is   
	PRINTV MONEY  
	PRINTL  yen.  
	PRINT My name is   
	PRINTS NAME:0  
	PRINTL .  
	PRINTFORML To repeat, the name is %NAME:0% and the money is {MONEY} yen.  
	PRINTFORMW If you get 1000 yen and pay 600 yen, you're left with {MONEY+1000-600} yen.  
	STR:0 = If you multiply that money by five, it's {(MONEY+1000-600)*5} yen.  
	PRINTFORMSW STR:0  

**RESULTS**  

	The money is 500 yen.  
	My name is Sato.  
	To repeat, the name is Sato and the money is 500 yen.  
	If you get 1000 yen and pay 600 yen, you're left with 900 yen.  
	If you multiply that money by five, it's 4500 yen.  

#### Making Conditional Decisions  
- The quickest way to understand conditional decisions is to look at examples.  
- SIF executes the next line if the conditional expression is not 0 (if true). If it is 0 (if not true), it skips the next line.  
- If the conditional expression is not 0 (if satisfied), IF executes from the next line until ELSE, ELSEIF, or ENDIF are encountered. (If it's ELSE, it will be executed from the next line until it receives an ENDIF. If the conditional expression is satisfied in ELSEIF, it executes the next lines until it encounters ELSE, ELSEIF, or ENDIF. If the conditional expression is not satisfied, skip until ELSE, ELSEIF, or ENDIF, and repeat)  

**EXAMPLE**  

	A = 1  
	B = 2  
	C = 4  

	SIF A == 1  
	PRINTL Test 1  
	SIF B != 1  
	PRINTL Test 2  
	SIF C < 5  
	PRINTL Test 3  
	IF A+B > 2  
	IF C >= 6  
		PRINTL Test 4  
	ELSE  
		PRINTL Test 5  
	ENDIF  
	IF A == 1 && B == 3  
		PRINTL Test 6  
	ELSEIF A == 1 || B == 3  
		PRINTL Test 7  
	ELSEIF A > 1 || (B > 2 && C > 2)  
		PRINTL Test 8  
	ENDIF  
	ELSEIF A+B == 2  
	PRINTL Test 9  
	ELSE  
	PRINTL Test 10  
	ENDIF  

**RESULTS**  

	Test 1  
	Test 2  
	Test 3  
	Test 5  
	Test 7  

- Use == for "equal" and != for "not equal", > for "left is greater than", >= for "left is greater or equal than right", < for "left is less than", and <= for "left is less or equal than right". All fields must be typed in half-width characters.  
- Use && for "and" and || for "or". All fields must be typed in half-width characters.  
- You can also use parentheses to describe complex conditions.  

#### Input and wait for input  
- Use WAIT to wait for input, e.g. to display a sentence.  
(※Usually something like PRINTW is used instead. It makes it easier to see because stuff can be expressed with fewer lines)  
- If you want the player to input an integer, use INPUT. The result of the input is stored in the RESULT variable.  
- If you want the player to input a string, use INPUTS. The result of the input is stored in RESULTS variable.  

**EXAMPLE**  

	PRINT Data entry begins.  
	WAIT  
	PRINTL Please enter your age.  
	INPUT  
	PRINTL Please enter your name.  
	INPUTS  
	PRINTFORML %RESULTS% is {RESULT} years old, isn't it?  

#### Repetition and GOTO  
- If you want to repeat the same instruction, use REPEAT, which is repeated until REND is found. The number of times it is repeated is stored in the COUNT.  
- Please note that you cannot create a REPEAT inside a REPEAT.  
- If you use CONTINUE on the way from REPEAT to REND, it will go back to where REPEAT was. If you use BREAK, it will stop repeating and skip to the next line after REND.  
- If you want to move to another place at once, you can use GOTO. To use GOTO, you need to register a "label" with $.  

**Example 1**  

	REPEAT 10  
	PRINT AIU  
	REND  
	;Line break by writing 0 characters in PRINTL  
	PRINTL   
	REPEAT 5  
	PRINTFORML Score: {COUNT*5}  
	REND  

**Results Of Example 1**  

	AIUAIUAIUAIUAIUAIUAIUAIUAIUAIU  
	Score: 0  
	Score: 5  
	Score: 10  
	Score: 15  
	Score: 20  

**Example 2**  

	MONEY = 300  
	REPEAT 5  
		SIF MONEY <= COUNT*100  
			BREAK  
		PRINTFORML That's more money than {COUNT*100} yen.  
	REND  
	REPEAT 5  
		SIF MONEY == COUNT*100  
			CONTINUE  
		PRINTFORML The holdings are not {COUNT*100} yen.  
	REND  

**Results Of Example 2**  

	That's more money than 0 yen.  
	That's more money than 100 yen.  
	That's more money than 200 yen.  
	The holdings are not 0 yen.  
	The holdings are not 100 yen.  
	The holdings are not 200 yen.  
	The holdings are not 400 yen.  

**Example 3**  

	$INPUT_LOOP  
	PRINTL Enter a number from 0 to 9.  
	INPUT  
	SIF RESULT < 0 || RESULT > 9  
		GOTO INPUT_LOOP  
	PRINTFORML {RESULT} has been entered.  

#### About Functions  
- It's hard to understand your program when you're writing it from start to finish.  
- You can use "functions" to break them down into parts and make them easier to understand.  
- Functions are registered using @. After @, write the name of the function using the alphabet and _ (underscore). Please enter the function name in half-width characters.  
- The first function called in the game should be named EVENTFIRST (more on this later).  
- To move to another function, use JUMP.  
- If you want to move to another function and then resume from the original position when the function is finished, use CALL.  
- If you use RETURN in a function called by CALL, you can terminate the function in the middle. At that time, the number specified by RETURN is stored in RESULT. If the function exits without using RETURN, RESULT will be set to 0.  
- If you use RESTART, you start from the beginning of the function.  

**EXAMPLE**  

	@EVENTFIRST  
	PRINTW Game start.  

	CALL OPENING  
	PRINTFORMW The opening result was {RESULT}.  
	CALL GAME_MAIN  
	PRINTFORMW The result of the game was {RESULT}.  
	JUMP ENDING  

	PRINTL You can't see this part because I used JUMP.  

	@OPENING  
	PRINTW Doing Opening.  
	RETURN 25  

	@GAME_MAIN  
	PRINTW We're in the game.  
	PRINTL Ending without RETURN.  

	@ENDING  
	PRINTW Doing Ending.  
	RESTART  

**RESULTS**  

	Game start.  
	Doing Opening.  
	The opening result was 25.  
	We're in the game.  
	Ending without RETURN.  
	The result of the game was 0.  
	Doing Ending.  
	Doing Ending.  
	Doing Ending.  
	Doing Ending.  
	Doing Ending.  
	.......(keeps on infinitely)  

#### Other Basic Instructions  
- Use QUIT to quit the game.  
- With DRAWLINE, you can draw a line ---- from the left edge of the screen to the right edge of the screen.  
- You can use TIMES to multiply by decimals. eramaker basically treats numbers as integers, so if you want to intertwine decimals, you can use this instruction: TIMES (variable),(fractional).  
- If you use BAR, you can display a graph like [*****....], if you use BARL, you can use it in the form of a new line. BARL is used the same way as BAR (variable),(maximum value),(length).  

**EXAMPLE**  

	MONEY = 500  
	DRAWLINE  
	BARL MONEY , 1000 , 20  
	PRINTFORMW I have {MONEY} yen.  
	DRAWLINE  
	TIMES MONEY , 1.25  
	BARL MONEY , 1000 , 20  
	PRINTFORMW It is now {MONEY} yen. End the game.  
	QUIT  

**RESULTS**  

	---------------------------------------------------------------------  
	[**********..........]  
	I have 500 yen.  
	---------------------------------------------------------------------  
	[************........]  
	It is now 625 yen. End the game.  

### About Instructions (for Training)  
- The eramaker has a number of special instructions to use for training.  
#### Display of training data  
- PRINT_ABL displays the character's abilities.  
- PRINT_TALENT displays the character's qualities.  
- PRINT_MARK displays the character's marks.  
- PRINT_EXP displays the experiences of the character.  
- PRINT_PALAM displays the character's training parameters.  
- When using the above instructions, specify which character's data you want to display. For example, PRINT_ABL 0 will usually show the ability of the protagonist.  

- PRINT_ITEM displays the items in your possession.  
- PRINT_SHOPITEM displays the items available in the shop.  

- UPCHECK shows the change in training parameters as a result of training commands.  

#### Character Management  
- ADDCHARA adds a character. If you want to add the character number 3, you do it with ADDCHARA 3.  
- ADDSPCHARA adds an SP character. If you want to add an SP character with character number 3, use ADDSPCHARA 3.  
(An SP character is a character whose character flag number 0 is 1)  
- DELCHARA removes characters added by ADDCHARA and others.  

**EXAMPLE**  

	;The name of the character with character number 0 is Hiroyuki, the main character.  
	;Suppose the name of the character number 3 is Tomoko, the name of the character number 5 is Remy, and the name of the character number 6 is Kotone.  
	PRINTFORML The number of characters you have now is {CHARANUM}.  

	ADDCHARA 3  
	ADDCHARA 5  
	ADDCHARA 6  
	PRINTFORML The number of characters you have now is {CHARANUM}.  
	REPEAT CHARANUM  
	PRINTFORML At number {COUNT} is %NAME:COUNT%。  
	REND  
	DELCHARA 2  
	PRINTFORML The number of characters you have now is {CHARANUM}.  
	REPEAT CHARANUM  
	PRINTFORML At number {COUNT} is %NAME:COUNT%。  
	REND  

**RESULTS**  

	The number of characters you have now is 1.  
	The number of characters you have now is 4.  
	At number 0 is Hiroyuki。  
	At number 1 is Tomoko。  
	At number 2 is Remy。  
	At number 3 is Kotone。  
	The number of characters you have now is 3.  
	At number 0 is Hiroyuki。  
	At number 1 is Tomoko。  
	At number 2 is Kotone。  

#### Save-Related  
- SAVEGAME calls the save screen and LOADGAME calls the load screen. You must be a SHOP to be able to call them.  
- PUTFORM can only be used with a special function called @SAVEINFO, which can be written in the same format as PRINTFORM to give an overview of the saved data. It's a good idea to write data such as what day it is, how good your characters are, and which characters you're training.  

#### BEGIN  
- BEGIN progresses the game by invoking various system instructions.  
- When BEGIN is called, the running function is terminated, and even if it is called from somewhere by CALL, it does not return to the original function.  

	- BEGIN TRAIN will start training.  
	- BEGIN AFTERTRAIN is no longer training.  
	- BEGIN ABLUP invokes the Ability Up screen.  
	- BEGIN TURNEND ends its turn.  
	- BEGIN SHOP calls the SHOP.  


---

# README.en
---
---
hide:
  - toc
---

# Information about eramaker
Most of the features implemented in eramaker are not explained in Emuera's documentation. Therefore if you need, check eramaker's below:  

- [Eramaker Game Structure](system_flow.en.md)
- [Eramaker CSV File Format](CSV_format.en.md)
- [Eramaker ERB File Format](ERB_format.en.md)
- [Eramaker Variable List](variables.en.md)

You can also refer to the following link for the original japanese version: [http://cbaku.com/b/2010/12/eramaker/](http://cbaku.com/b/2010/12/eramaker/)


---

# system_flow.en
---
# Game Structure  
eramaker era basic Structure (provisional version)  
I'm sure it's hard to get a picture just by looking at this file. It is easier to understand if you play the sample game first, and then look at the ERB files of the sample game while you have it open.  

## Basic Information  
### When opening eramaker  
- In eramaker, when you start the game, the title screen will appear and you will be presented with a choice between 「New Game」 and 「Load Game」. If you choose 「New Game」, the function EVENTFIRST will be called in the ERB file.  
- When the EVENTFIRST is over, the game stops. So you need to call SHOP, TRAIN, etc with BEGIN.  
- See the beginning of the SYSTEM.ERB in the sample game.  

### SHOP  

#### Entering SHOP  
- When you enter SHOP, a function called @EVENTSHOP (if it exists) is called. This is an #Event Function.  
- After that, the function @SHOW_SHOP will be called. This is where you can display basic information such as the date and characters being trained, use PRINT_SHOPITEM for sales, and special actions such as saving and loading.  

#### Command Selection in SHOP  
- If a number between 0 to 99 is chosen, it means to buy an item. If any other number is chosen, the function @USERSHOP is called. The selected number is stored in RESULT and should be processed accordingly.  
- Both are easy to understand if you look at the sample game's SHOP.ERB.  

#### Purchasing  
- When you buy an item, the function @EVENTBUY is called (if it exists). This is an #Event Function.  
(Items bought disappear from the shop lineup, so it's a good idea if you want to do something here)  

### TRAIN  
#### Entering TRAIN  
- When you enter TRAIN, the function @EVENTTRAIN (if it exists) is called. This is an #Event Function.  
- After that, the function @SHOW_STATUS is called. This is where you can display basic information such as the date and characters being trained, as well as using PRINT_PALAM to show parameters in training.  
- It will then automatically display the commands that can be executed. The function @COM_ABLExx will be called for every command, which means that it can be executed if its RETURN is 1. Moreover, if the corresponding @COM_ABLExx does not exist, it also means that it is executable. The sample game COMABLE.ERB should be easy to understand.  
- In addition, the function @SHOW_USERCOM will be called. Special commands, such as ending training can be displayed here.  
- Both are easy to understand by looking at the sample games SYSTEM.ERB and INFO.ERB.  

#### Command Selection in TRAIN  
- When the player chooses a command, the function @EVENTCOM (if it exists) is called first. This is an #Event Function.  
- In addition, the function corresponding to the selected command will be called. For example, if 「Missionary」 is selected and the command number of 「Missionary」 is 20 in TRAIN.CSV, the function @COM20 will be called.  
- In the case of commands like 「Blowjob」, you may not be able to execute them depending on your character's ability. In this case, RETURN 0 is called in the middle of @COMxx. Then, it will return to the command selection without executing the command.  
- If the command can be executed, RETURN 1 is called from @COMxx. Then the function @SOURCE_CHECK will be called. This is where the results of the training command are reflected in the training parameters.  
- Both COMxx.ERB and SOURCE.ERB are easy to understand by looking at the sample games.  

#### End of Command Selection in TRAIN  
- Finally, a function called @EVENTCOMEND (if it exists) will be called. This is an #Event Function.  
- It's a good idea to do the dialogue of the character whose command is executed here. The sample game era light's CKOJOxx.ERB should be easy to understand.  

#### User Command  
- If there is no @COMxx corresponding to the selected command, @USERCOM will be called. RESULT contains the selected command number, so please perform the corresponding operations.  
- The sample game's SYSTEM.ERB should be easy to understand when inspected.  

### AFTERTRAIN  
- When you enter AFTERTRAIN, the function @EVENTEND (if it exists) will be called. This is an #Event Function.  
- It's a good idea to deal with your character's dialogue (parting words?) when you finish training here. In addition, the calculation of the Gems obtained from the training should be done here as well. The sample game's AFTERTRA.ERB should be easy to understand.  

### ABLUP  
#### View ABLUP  
- First, the function @SHOW_JUEL is called. It shows the Gems you have.  
- Then, the function @SHOW_ABLUP_SELECT will be called. It displays the list of Abilities, exit commands, etc.  
- The sample game's ABL.ERB is easy to understand.  

#### ABLUP's command selection  
- When the player selects a command, the function corresponding to the selected command is called. For example, if 「C-Sense」 in [3] is selected, the function @ABLUP3 will be called.  
- If there is no @ABLUPxx corresponding to the selected command, @USERABLUP will be called. RESULT will contain the selected ABL number, so please perform the corresponding operations.  
- The sample games ABLUPxx.ERB and ABL.ERB are easy to understand.  

### TURNEND  
- The function @EVENTTURNEND (if it exists) will be called. This is #Event Function.  
- You may want to deal with time progression, physical recovery, etc.  
- Please note that the game needs @EVENTTURNEND or it will stop.  
- The sample game's SYSTEM.ERB is easy to understand.  

### Event Function  
#### About Event Functions  
- An event function is a function that is always called at a certain time in the game. It is called when you have finished executing a command or when you want to start training.  
- Event functions are useful for displaying the character's dialogue. If you write instructions to display dialogue directly to functions such as @COMxx it will be confusing later, but you can use event functions to manage them separately.  
- Due to the nature of event functions, there may be more than one with the same name.  

		; Example  

		;The line when you finish performing Missionary  
		@EVENTCOMEND  
		;20 is Missionary, if not 20, ignore it.  
		SIF SELECTCOM != 20  
			RETURN 0  
		;Ignore if FLAG:1000 is not 0  
		SIF FLAG:1000  
			RETURN 0  
		PRINTW 「No... Oh my God!」  
		;Set the FLAG. Once it appeared, it won't appear again.  
		FLAG:1000 = 1  
		RETURN 1  

		;The line when you finish executing DoggyStyle  
		@EVENTCOMEND  
		;21 is DoggyStyle; if it's not 21, ignore it.  
		SIF SELECTCOM != 21  
			RETURN 0  
		;Ignore if FLAG:1001 is not 0  
		SIF FLAG:1001  
			RETURN 0  
		PRINTW 「Not like this...」  
		;Set the FLAG. Once it appeared, it won't appear again.  
		FLAG:1001 = 1  
		RETURN 1  

- Event functions can be given a "property".  
- If the property #SINGLE is given, the function with the same name will not be executed if it exits with RETURN 1. This is useful when a character says several lines at a time that are unnatural.  
- If you grant the property #PRI, it will be executed before any other function of the same name. This is useful for processes such as death checks that would be unnatural if not done first.  
- When the property #LATER is given, it is executed after other functions of the same name. This is useful for processes that are unnatural if you don't do it at the end, such as displaying "The day is over".  

		; Example  

		@EVENTTURNEND  
		#SINGLE  
		SIF FLAG:1000  
			RETURN 0  
		FLAG:1000 = 1  
		PRINTW 「I don't want to...」  
		RETURN 1  

		@EVENTTURNEND  
		#SINGLE  
		SIF FLAG:1001  
			RETURN 0  
		FLAG:1001 = 1  
		PRINTW 「Let me go home...」  
		RETURN 1  

		@EVENTTURNEND  
		#SINGLE  
		SIF FLAG:1002  
			RETURN 0  
		FLAG:1002 = 1  
		PRINTW 「I need to get out...」  
		RETURN 1  

		@EVENTTURNEND  
		#LATER  
		PRINTW The day is over...  
		RETURN 1  

（The three lines above can only appear one at a time. The "The day is over..." is marked with #LATER, so it never appears until FLAG:1000, FLAG:1001, or FLAG:1002 become 1.）  


---

# variables.en
---
# Variable List  
eramaker era basic variable list (provisional version)  
I think it's hard to get a picture just by looking at this file. It is easier to understand if you play the sample game first, and then look at the ERB files of the sample game while looking at it.  

## Basic Variables  
### Generic Variables  
#### A-Z  
- The variable is a single letter of the alphabet, from A to Z.  
- You can use it as a disposable data container as you like. However, it is not suitable for long time data storage because it is not known where it is rewritten.  

#### COUNT  
- This variable counts the number of times it is repeated when using the REPEAT instruction.  
- Do not rewrite the contents of COUNT between REPEAT and REND, as this may lead to a malfunction.  

#### RESULT  
- A variable that records various results.  
- Since you don't know where it could be rewritten, it is preferable to move the data to another variable unless it is used on the spot.  

#### RESULTS (String Variable)  
- A string variable that records various results.  
- Since you don't know where it could be rewritten, it is preferable to move the data to another variable unless it is used on the spot.  

### Basic Information Variables  
#### DAY  
- Records the date. Feel free to handle it as you wish.  

#### TIME  
- Records the time. Feel free to handle it as you wish.  

#### MONEY  
- Keeps track of your money. The program will refer to it when you shop, so don't rewrite it unless you've gained or lost money.  

### Basic Training Information Variables  
#### MASTER  
- It refers to the protagonist's Character Registration Number, which may be different from the number specified in CharaXX.csv. It is usually 0.  

#### TARGET  
- This is the Character Registration Number of the trainee, which may be different from the number specified in CharaXX.csv.  

#### ASSI  
- It refers to the assistant's Character Registration Number, which may be different from the number specified in CharaXX.csv.  

#### PLAYER  
- Refers to the Character Registration Number of the person doing the training. Normally it should match MASTER or ASSI, but be aware that the number may be different from the one specified in CharaXX.csv.  

#### CHARANUM  
- The number of characters currently registered. Includes the protagonist. This variable cannot be changed by the user.  

#### ASSIPLAY  
- If it's a 1, the assistant is doing the training, if it's a 0, it's not.  

#### SELECTCOM  
- The selected command is the same command number as the one registered in TRAIN.CSV.  

#### PREVCOM  
- This is the previous selected command. This is used for example for penalties for executing the same command in succession.  

### Training Variables  
#### LOSEBASE (Array, 0-999)  
- It's how much of the basic parameters are lost by the training command. Normally, LOSEBASE:0 is for physical exhaustion and LOSEBASE:1 is for energy exhaustion.  

#### UP (Array, 0-999)  
- This is how much the training parameters are raised by the training command. A in UP:A is the parameter number specified in PALAM.CSV.  

#### DOWN (Array, 0-999)  
- This is how much the training parameters are lowered by the training command. A of DOWN:A is the parameter number specified in PALAM.CSV.  

#### PALAMLV (Array, 0-999)  
- This is the boundary value of the level of the parameter in training. If the training parameters exceed this threshold, the number of gems you receive after training will increase dramatically.  

#### EXPLV (Array, 0-999)  
- This is the boundary value for the level of experience. If your experience exceeds this threshold, your training may be more effective (especially with V and A experience).  

#### EJAC  
- This is a temporary variable that is used for ejaculation checks. It's an independent variable for readability, but it's really just a data entry.  

### Flags  
#### FLAG (Array, 0-9999)  
- Record the various states of the game. In the sample game, FLAG:0 is used to determine if a character in training has been rested or not. It's also frequently used to see if an event has occurred or not.  

#### TFLAG (Array, 0-999)  
- Record the various states of the game. Think of it as a Temporary Flag, or Training Flag, which is used in the sample game to record how you ejaculated and whether you performed the service training. In short, it is a flag for temporary use rather than FLAG.  

#### Character Data  
- Most of the character data is double-arranged and is accessed as EXP:1:2 (looking at the second experience of the first character).  
- However, it can also be written as EXP:0. In this case, it will be interpreted as EXP:TARGET:0. In other words, you don't need to write TARGET: to access the data of the character being trained.  

#### NO (Array, 0-99)  
- Character number. Since it is not a double array, it is accessed as NO:TARGET or NO:ASSI.  

#### BASE (Double Array, 0-99)  
- These are the basic parameters of the character. In the sample game, BASE:0 represents health, BASE:1 represents energy and BASE:2 represents ejaculation gauge.  

#### MAXBASE (Double Array, 0-99)  
- This is the maximum value of the basic parameters of the character.  

#### ABL (Double Array, 0-99)  
- The ability of your character, which is accessed by the ability number registered in ABL.CSV.  

#### TALENT (Double Array, 0-999)  
- The qualities of the character. It is accessed by the quality number registered in TALENT.CSV.  

#### EXP (Double Array, 0-99)  
- The experience of the character, which is accessed by the experience number registered in EXP.CSV.  

#### MARK (Double Array, 0-99)  
- This is the engraving of the character. It is accessed by the mark number registered in MARK.CSV.  

#### RELATION (Double Array, 0-99)  
- RELATION:TARGET:3 indicates the compatibility of the character in training with the character number 3. Note that I'm not referring to the compatibility with the characters with Character Registration Number 3.  

#### JUEL (Double Array, 0-199)  
- This is the gems that character has. Access by the parameter number registered in PALAM.CSV.  

#### CFLAG (Double Array, 0-999)  
- This is a flag for each character. You can record a variety of data for each character. In the sample game, a character whose CFLAG:0 is 1 is considered an SP character.  

#### ISASSI (Array, 0-99)  
- If it's a 0, it's not an assistant. If it's a 1, it's an assistant. Since it is not a double array, it is accessed as ISASSI:TARGET or ISASSI:ASSI.  

#### NAME (Array, 0-99) (String Variable)  
- The name of the character. Since it is not a double array, it is accessed as NAME:TARGET or NAME:ASSI.  

#### CALLNAME (Array, 0-99) (String Variable)  
- This is the name of the character. Since it is not a double array, it is accessed as CALLNAME:TARGET or CALLNAME:ASSI.  

#### TEQUIP (Double Array, 0-99)  
- This is the item that Chara is wearing. You can use this when you're putting in vibrators during training, but you can also use it for character enhancement items. In the sample game, we also used it to judge the use of aphrodisiacs.  

#### PALAM (Double Array, 0-99)  
- Character's training parameters, accessed by the parameter numbers registered in PALAM.CSV.  

#### STAIN (Double Array, 0-99)  
- This is the "dirt" generated by training. It changes when you ejaculate from a blow job or have anal sex. In the sample game, STAIN:0 refers to the mouth, STAIN:1 to the hand, STAIN:2 to the penis, STAIN:3 to the vagina, and STAIN:4 to the anal stain. See here for details of the stain notation.  

#### EX (Double Array, 0-99)  
- This is how many times climaxed during this training. In the sample game, EX:0 is a C climax, EX:1 is a V climax, and EX:2 is an A climax.  

#### SOURCE (Double Array, 0-99)  
- This is the training source generated by executing commands. If you look at the COMxx.ERB and SOURCE.ERB, you will see the flow from the training source to the UP of the training parameters.  

#### NOWEX (Double Array, 0-99)  
- This is how many times climaxed during this command alone. In the sample game, NOWEX:0 is a C climax, NOWEX:1 is a V climax, and NOWEX:2 is an A climax.  

#### GOTJUEL (Double Array, 0-99)  
- This is the gems received after this training, which is accessed by the parameter number registered in PALAM.CSV.  

### Item Data  
#### ITEM (Array, 0-99)  
- This is the number of each item you have, accessed by the item number registered in ITEM.CSV.  

#### ITEMSALES (Array, 0-99)  
- It' s whether the item is available in the shop or not. If it's a 1, it's for sale. If it's a 0, it's not for sale. The item number registered in ITEM.CSV is used to access it.  

#### BOUGHT  
- Here's what items were bought. You can use this if you want to delete the item you just bought at @EVENTBUY from the shop.  

#### NOITEM  
- If NO ITEM is specified in GAMEBASE.CSV, it will be set to 1. In this case, the execution of the command will ignore the presence or absence of the item.  

#### PBAND  
- This is the item number for the strap-on. It is set to 4 by default. Strap-on is treated as an independent variable because it is often involved in training decisions.  

### Name Data  
#### ABLNAME (Array, 0-99) (String Variable)  
- The name of the ability, accessed by the parameter number registered in ABL.CSV.  

#### TALENTNAME (Array, 0-99) (String Variable)  
- The name of the property, accessed by the parameter number registered in TALENT.CSV.  

#### EXPNAME (Array, 0-99) (String Variable)  
- The name of the experience, which is accessed by the parameter number registered in EXP.CSV.  

#### MARKNAME (Array, 0-99) (String Variable)  
- The name of the mark, accessed by the parameter number registered in MARK.CSV.  

#### PALAMNAME (Array, 0-199) (String Variable)  
- The name of the parameter while training, which is accessed by the parameter number registered in PALAM.CSV.  

#### ITEMNAME (Array, 0-99) (String Variable)  
- The name of the item, which is accessed by the parameter number registered in ITEM.CSV.  

### String Data  
#### STR (Array, 0-19999) (String Variable)  
- String data. The data of STR.CSV is stored here. Note that modifying this variable will not save it.  
#### SAVESTR (Array, 0-99) (String Variable)  
- String data. The data recorded here will be saved when you save it. You can store the string variables you want to use all the time here.  

### Other Data  
#### RAND (Pseudo-Array)  
- This is a special variable that returns a random number. For example: PRINTV RAND:10 randomly displays a number from 0 to 9.  
- Remember that the return value is an integer from 0 to A-1 in the case of RAND:A.  

## Character Registration Number  
### The difference between a character registration number and a character number**  

#### Unembodied Character Data  
- The number (番号) specified in CharaXX.CSV. That's the "character number".  
- However, not all of the characters in CharaXX.CSV are real at the start of the game. They only become real when the ADDCHARA command is called.  

#### Registering a character  
- At the start of the game, the only character who is an entity is the main character. And the main character's "character registration number" is 0.  
- Let's assume that a character whose character number is 5 in ADDCHARA is registered here. The "character number" of this character is 5, but the "registration number of the character" is 1 because it is next to the main character. If you add one more character with a character number of 7, the registration number of that character is 2.  

#### Removing a character  
- Now, let's assume that the DELCHARA command deleted a character whose registration number is 1. Then, the "registration number" of the character with "character number 7" added later will become 1.  
- Keep in mind that the currently registered characters are given a "character registration number" from 0 without any gaps.  

## About Stain  
### Specifics of the stain data  
#### Types of Stains  
- The stain data is managed by STAIN. STAIN:TARGET:0 means the dirt of the mouth of the character being trained.  
- However, there are many different types of stains that can be considered here. If you give a blow job, you'll get a smear of semen, and if you give a cunnilingus, you'll get a smear of love juice.  
- The sample game assumes four types of dirt: vagina, penis, semen, and anus.  

#### How to describe the stain data  
- Now, the numbers 1, 2, 4, and 8 have been assigned to this stain. In other words, if there are anal and seminal stains, 4+8 is 12, if there are love semen and seminal stains, 1+4 is 5, and so on.  
- If we express it this way, one variable can handle the four types of stains well. However, "added semen stains in the mouth" and "determining whether there is love semen stains in the mouth" do not work well with the conventional +-*/%.  

#### How to get the stain data  
- So, we use the & and | operators. It's similar to && (and) and || (or), but it's used alone.  
- For example, let's say that STAIN:TARGET:0 is 12. If we call STAIN:TARGET:0 & 4 here, only the part of 4 will be extracted. That is, STAIN:TARGET:0 & 4 == 4.  
- Next, let's assume that STAIN:TARGET:0 is 1+2+8=11. If we call STAIN:TARGET:0 & 4 here, only the part of 4 will be extracted. That is, STAIN:TARGET:0 & 4 == 0.  
- This way, you can easily tell which stains are present or not.  

#### How to add stain data  
- Next, let's say that STAIN:TARGET:0 is 1+4=5. If we type STAIN:TARGET:0 | 2, the 2 part will be added. That is, STAIN:TARGET:0 | 2 == 7.  
- And let's say that STAIN:TARGET:0 is 1+2+4=7. If we set STAIN:TARGET:0 | 2 here, the 2 part will be added. But part 2 is already included, so it doesn't change. That is, STAIN:TARGET:0 | 2 == 7.  
- It is also possible to write STAIN:TARGET:0 |= 2.  
- This way, additional dirt can be treated without worrying about whether it already contains dirt or not.  


---


