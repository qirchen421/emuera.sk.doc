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
