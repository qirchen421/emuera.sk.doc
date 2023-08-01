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
