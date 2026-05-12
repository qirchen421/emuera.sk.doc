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

## CSV → Variable Mapping

Each CSV file defines the index names (name variables) or initial values (data variables) for corresponding variables.

### Character Variable CSV Files

| CSV File | Name Variable | Data Variable | CharaXX.csv Keyword | Notes |
|:--|:--|:--|:--|:--|
| `abl.csv` | `ABLNAME` | `ABL` | `能力` | |
| `talent.csv` | `TALENTNAME` | `TALENT` | `素質` | |
| `exp.csv` | `EXPNAME` | `EXP` | `経験` | |
| `mark.csv` | `MARKNAME` | `MARK` | `刻印` | |
| `base.csv` | `BASENAME` | `BASE` / `MAXBASE` | `基礎` | |
| `palam.csv` | `PALAMNAME` | `PALAM` / `JUEL` / `GOTJUEL` | — | |
| `cflag.csv` | `CFLAGNAME` | `CFLAG` | `フラグ` | |
| `cstr.csv` | `CSTRNAME` | `CSTR` | `CSTR` | |
| `source.csv` | `SOURCENAME` | `SOURCE` | — | |
| `ex.csv` | `EXNAME` | `EX` / `NOWEX` | — | |
| `equip.csv` | `EQUIPNAME` | `EQUIP` | `装着物` | |
| `tequip.csv` | `TEQUIPNAME` | `TEQUIP` | — | |
| `relation.csv` | — | `RELATION` | `相性` | |
| `juel.csv` | — | `JUEL` | `珠` | |
| `stain.csv` | `STAINNAME` | `STAIN` | — | |
| `tcvar.csv` | `TCVARNAME` | `TCVAR` | — | |

### Non-Character Variable CSV Files

| CSV File | Name Variable | Data Variable | Notes |
|:--|:--|:--|:--|
| `flag.csv` | `FLAGNAME` | `FLAG` | |
| `tflag.csv` | `TFLAGNAME` | `TFLAG` | |
| `train.csv` | `TRAINNAME` | — | Command name definitions |
| `item.csv` | `ITEMNAME` / `ITEMPRICE` | `ITEM` / `ITEMSALES` | 3rd column is price |
| `strname.csv` | `STRNAME` | — | Name definitions for STR |
| `str.csv` | — | `STR` | **Direct value assignment** (not names) |
| `tstr.csv` | `TSTRNAME` | `TSTR` | |
| `savestr.csv` | `SAVESTRNAME` | `SAVESTR` | |
| `global.csv` | `GLOBALNAME` | `GLOBAL` | |
| `globals.csv` | `GLOBALSNAME` | `GLOBALS` | |

> **Note the difference between `str.csv` and `strname.csv`**: `str.csv` assigns values directly to the `STR` variable, while `strname.csv` defines `STRNAME` (index names). Their purposes are completely different.

> For complete mapping and variable access details, see [Character Variables](../tutorial/character-variables.en.md).

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
