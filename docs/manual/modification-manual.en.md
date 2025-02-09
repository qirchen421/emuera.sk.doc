# Introduction to modification  

Original page  
[era series discussion thread, Summary Wiki V3, Modification Introduction](https://seesaawiki.jp/eraseries/d/%b2%fe%c2%a4%c6%fe%cc%e7)  

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

### 新しくキャラクターを追加する  
この手順はバリアントに大きく依存するため詳しくは解説しません

<details><summary>eratoho系においての例</summary>

```
だが、これだけではゲーム内にキャラは追加されない。  
次に変更するのはItem.csv。開いて下のほうを見ると、キャラ名の付いたアイテムがずらっと並んでいるはず。  
ここに、今作成したキャラをゲーム内で購入するためのアイテムを追加します。  
アイテム番号,アイテム名,価格　の形式になっています。  

キャラ番号とアイテム番号には規則性があるので、それをちゃんと守ること。  
(例：キャラ番号:5→対応するアイテム:55　キャラ番号:6→対応するアイテム:56…)  

これだけでは終わらない。次はERBフォルダの中を開く。  
中にSHOP2.ERBがあるかどうかで、この後の作業が変わます。  

○SHOP2.ERBが無い場合  

SYSTEM.ERBを開いて、上の方に  
>ITEMSALES:51 = 1~~  
>ITEMSALES:52 = 1~~  
>ITEMSALES:53 = 1~~  
>　　　:  
という記述があるはずなので、そこに  
>ITEMSALES:(さっき追加したアイテムの番号) = 1  
を書き足す。これで終了だ。  

○SHOP2.ERBがある場合（大人数版処理を採用している）  

SYSTEM.ERBを開くのは同じだが、探すのは  
>FLAG:1000 = 1000~~  
>FLAG:1001 = 500~~  
>FLAG:1002 = 300~~  
>　　　:  
のような記述。ここに、  
>FLAG:(キャラ番号+999) = (さっき追加したアイテムの価格)  
を書き足す。  
```

</details>

---

### 所持金を増やす  
ERB内を`MONEY =`で検索等してみると、  

```
MONEY = 10000
```

のような記述があるので、数字を好きな値に書き換えてみましょう  

多くのバリアントでは`MONEY`に現在の所持金の値が入っています。この`MONEY`のような値の入れ物を**変数**と呼びます。  
`MONEY = 10000`は「MONEYと10000が等しい」という意味ではなく、
「変数MONEYに10000という数値を入れる」という処理を表します。   

また、ファイルを探して見ると、

>@EVENTFIRST  

という行があるはずです。このように```@xxx```から始まるスクリプトの塊を**関数**といいます。  
`@EVENTFIRST`は、[0]最初から始めるを選ぶと呼び出される関数です。  
多くの場合、ゲームの初期設定やゲームモードの選択をこの関数で行っています 

---

### 所持金を減らさない  
上記を応用すれば、何度買い物をしても所持金を減らさず、一定値にし続けることもできます。  
要は、ゲーム中に何度も呼び出される関数に`MONEY = 10000`と書き込めばいいわけです。  

ここでは、ショップ画面に移動した時に所持金を一定値にする方法を説明します。  
`SHOP.ERB`(ファイル名はバリアントによる)の最初の方にある`@EVENTSHOP`や`@SHOW_SHOP`が、ショップ画面に移るたびに呼び出される関数。  
ここの中に`MONEY = 10000`と書けば、ショップ画面になるたびに所持金が`10000`になます。  
「それだと買い物中にお金が尽きたらどうするんだ」という欲張りな奴は、下のほうにある`@EVENTBUY`関数に書き込めばいい。（バリアントによっては別関数の場合もあり）  
これはなにかアイテムが買われるたびに呼び出される関数なので、関数の最後で所持金を設定すれば  
何を買ってもお金が減らなくなります。  

あるいは、以下のような方法でもできます。  
ERBフォルダの中に、新しいERBファイルを作る(新規作成→テキストファイル→拡張子ごとリネームでOK)。  
拡張子が`.ERB`なら名前は自由に設定できます。  
そしてその中に以下の3行を書き込みます。  

>@EVENTBUY  
>#LATER  
>MONEY = 10000  

「`@EVENTBUY`は`SHOP.ERB`にもうあるじゃん。同じ関数が2個あってもいいの？」**いいんです。**  
`@EVENTSHOP`や`@EVENTBUY`、さっきの`@EVENTFIRST`等は**イベント関数**と呼ばれる特別な関数で、  
同じ名前の関数がいくつあっても全部実行されるという特徴があります。  
なので、あるタイミング(調教開始時、調教コマンド実行時、調教終了時etc.)で  
数パターンのイベントを起こしたい場合に大変重宝します。一番いい例が**口上**です。  

2行目の`#LATER`はイベント関数だけで使える**性質**を設定する行です。  
`#LATER`の意味は「`@EVENTBUY`が複数ある場合、この`@EVENTBUY`は一番最後に実行する」。  
他にも最初に実行させる`#PRI`、他の同じイベント関数をもう実行させない`#SINGLE`という性質もあります。  

---

### 体力・気力の減少を半分にする  
`SOURCE.ERB`(ファイル名はバリアントによる)の最後の方に以下のような部分があります。  

``` { #language-erb title="ERB" }
;-------------------------------------------------  
;体力・気力の減少  
;-------------------------------------------------  
BASE:0 -= LOSEBASE:0  
BASE:1 -= LOSEBASE:1  
;PRINT 体力-  
;PRINTV LOSEBASE:0  
;PRINT  気力-  
;PRINTVL LOSEBASE:1  
```

`BASE:0`、`BASE:1`はそれぞれ体力、気力を指し、  
`LOSEBASE:0`、`LOSEBASE:1`はそれぞれ体力減少、気力減少を指します。  
そこで次のように2行追加してみます。  

``` { #language-erb title="ERB" }
;-------------------------------------------------  
;体力・気力の減少  
;-------------------------------------------------  
LOSEBASE:0 /= 2 ;追加した部分  
LOSEBASE:1 /= 2 ;追加した部分  
BASE:0 -= LOSEBASE:0  
BASE:1 -= LOSEBASE:1  
;PRINT 体力-  
;PRINTV LOSEBASE:0  
;PRINT  気力-  
;PRINTVL LOSEBASE:1  
```

`/= 2`は2で割るという意味で、以下のようにも書けるがこちらのほうがスマートです。  

> LOSEBASE:0 = LOSEBASE:0 / 2  
