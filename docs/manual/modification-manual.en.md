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
