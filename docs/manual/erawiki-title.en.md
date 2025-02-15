# Variant creation/Title preparation

Original page:  
[era series discussion thread, Summary Wiki V3, Title preparation](https://seesaawiki.jp/eraseries/d/%a5%bf%a5%a4%a5%c8%a5%eb%bd%e0%c8%f7%ca%d4)  

---

- [Tutorial](erawiki-tutorial.md)
- Title preparation
- [Title practice](erawiki-title2.md)
- [ERB creation practice](erawiki-ERBmanual.md)

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

### バージョンってなに？  
常に上書きしていると失敗したとき元に戻せない。  
一区切りついたところで保存して、コピーをもとに新しい要素を追加したほうがいい。  
そうすれば失敗したとき、保存してあるデータに戻しやすい。  

そのバックアップがぐちゃぐちゃにならないように、  
製作の進行度に応じて付けておく番号がバージョンだ。  

更新するたびに数字をあげることで、どこまで更新されたかわかりやすくする。  

- [eramaker CSVファイル書式（暫定版）](https://cbaku2.sakura.ne.jp/b/erakanon/eramacsv.html)  

を見ると  

>画面上は、(数値)を1000で割ったものが表示されます（100なら0.10）  

と説明されている。  

現在、バージョンは  

```
バージョン,110  
```

になっている。  

これを  

```
バージョン,100  
```

にしてみよう。  

タイトル画面に表示される数字が、0.10になる。  

```
バージョン,112  
```

にしてみよう。  

タイトル画面に表示される数字が、0.112になる。  

小数点以下2桁まで表示されるのがデフォルトで、  
小数点以下3桁目は、指定がなければ省略される。  

とりあえずそれを頭の片隅においた上で、  
実際どのように管理するかは人それぞれで、  
自分が管理しやすいように指定しよう。  

例をあげると  

- １桁目がメジャーバージョン  
（全体に影響するような巨大な更新であったり、セーブデータの互換性を失うときに）  

- 小数点以下１～２桁目がマイナーバージョン  
（機能などの細々とした追加を行うときに）  

- 小数点以下３桁目が不具合修正  

といった分け方や（たぶんデフォルト設定で想定されている分け方）  

１桁目はメジャーバージョン  
小数点以下はマイナーバージョン  
といった分け方や  

１桁目がメジャーバージョン  
小数点以下１桁目がマイナーバージョン  
小数点以下２桁目がパッチ  
小数点以下３桁目が不具合修正  
といった分け方や  

自動的に割り算される表示を使わないようにして桁数を一万に増やし、  
`X.XX.XX`と表示して、互換性喪失.要素追加.不具合修正とする  
といった分け方などがある。  

なんにせよ、パッチ作者は`Gamebase.csv`を弄らないことが多いので、  
まとめてくれる人がいないと触れられることすらないという状況もありえる。  

バージョン管理システムというものもあり、活用している方が多い。  

- [eraシリーズを語るスレ　まとめWiki　V3→システム改造Q&A→その他→バージョン管理システムを使う](https://evilmask.gitlab.io/emuera.em.doc/manual/erawiki-modification-QandA.html#_17)  

### What is a version?
If you keep overwriting, you won't be able to restore if you make a mistake.
It's better to save it when you've completed a section and add new elements based on the copy.
That way, if you make a mistake, it's easier to restore the saved data.

To keep the backup from becoming a mess,
the version is a number that is assigned according to the progress of the production.

By increasing the number every time you update, it's easier to see how much has been updated.

- [eramaker CSV file format (provisional)] (https://cbaku2.sakura.ne.jp/b/erakanon/eramacsv.html)

If you look at

>The screen shows the value obtained by dividing (the number) by 1000 (100 is 0.10)

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

There are also ways of dividing like this (probably the way it is divided by default)

The first digit is the major version
The first digit after the decimal point is the minor version
The second digit after the decimal point is the patch
The third digit after the decimal point is the bug fix

There are also ways of dividing like this, where the number of digits is increased to 10,000 without using the display that automatically divides, and
The display is displayed as `X.XX.XX`, and compatibility is lost. Elements are added. Bug fix

There are also ways of dividing like this. In any case, patch authors often do not touch `Gamebase.csv`, so it is possible that it will never be touched unless someone compiles it.

There are also version control systems, and many people use them.

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
