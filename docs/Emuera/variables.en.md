# Constants / Variables  
## Constants (Literals)  
### Constant Notation  
With the exception of Octal notation, Emuera supports the same notations as 吉里吉里 (KiriKiri).  
For example, the following lines all have the same meaning.  

	X = 32  
	X = 0b100000  
	X = 0x20  
	X = 1p5  

From top to bottom, the usual decimal notation, binary, hexadecimal, and 1 × 2 to the power of 5.  
Notation like 1p5 is convenient when you want to get or set bits with bit operators.  
For example, the conditional statement below becomes true when the lower 0th or 3rd bit of A stands.  

	IF (A & 1p0)||(A & 1p3)  

Also, by using e instead of p, you can express n × 10 to the power of m.  
For example, 13e3 equals 13000.  
Since the above is only a notation of a constant, you can not use it as an expression.  
**The following notation is wrong.**  

	X = 13e(A + 1)  

We have not adopted octal notation because of compatibility issues with eramaker.  
"012" is interpreted as 12 instead of 10.  

## 変数  
### 変数サイズの指定  
Emueraではcsvフォルダに`VariableSize.csv`という名前のファイルを置くことで既存の変数の要素数を指定できます。  
また、要素数に`-1`を指定することにより、ERB中でのその変数の使用を禁止することができます。  

禁止設定された変数をERB中で代入や参照するとエラーになります。 禁止設定された変数をシステムが必要とする場合、代入処理は無視され、値は常に`-1`と扱われます。  
（`MONEY`や`NEXTCOM`を禁止した場合に発生する状況です）  
また、`COUNT`を使用禁止変数にした場合、`REPEAT`も使用不可となり、実行時にエラー終了します（EM+EE）

### ローカル変数  
#### LOCAL  
#### LOCALS  
**※この変数は`obsolete`です。代わりに`#DIM`、`#DIMS`の使用を検討してください。**  
**詳しくは[ユーザー定義の変数](user_defined_variables.md)を参照してください。**  

ローカル変数（局所変数）です。  
`LOCAL`は整数、`LOCALS`は文字列となります  
サイズは基本は`LOCAL`が1000、`LOCALS`が100です。  
また、`#LOCALSIZE <設定する要素数>`および`#LOCALSSIZE <設定する要素数>`  
によって関数ごとに個別に要素数を変更できます。（ただし設定できる値は0より大きい整数）  
セーブはされません。  

	@EVENTFIRST  
		LOCAL:10 = 123  
		CALL FUNC001  
		PRINTV LOCAL:10  
		WAIT  
	@FUNC001  
		LOCAL:10 = 567  
		RETURN  

上のコードの[`PRINTV`](../Reference/PRINT.md)の結果は`123`になります。  
`@FUNC001`の中で`LOCAL:10`を変更していますが、`@EVENTFIRST`内の`LOCAL`には変更が及びません。  
多くの言語のローカル変数とは異なり、関数の呼び出しの際に初期化はされません。  

内部的には`LOCAL@関数名`という変数を作成しています。  
なのでイベント関数など同じ名前の関数が複数ある場合は共用です。また、再帰的に呼び出された場合は同じ変数をつかうことになります。  
`LOCAL@EVENTFIRST:10 = 567`のように他の関数用の変数も呼び出せますが推奨しません（デバッグ用の機能です）。  
なお、他の関数のものを呼び出す時に、呼び出し先関数名に演算子等が含まれているとエラーとなります  

#### `ARG`  
#### `ARGS`  
ローカル変数です。  
`ARG`は整数、`ARGS`は文字列となります  
サイズは基本は`ARG`が1000、`ARGS`が100で`VariableSize.csv`で変更できます。  
また、関数の引数で定義された分だけを問題なく使えるだけの要素数を自動で確保します。（VariableSize.csvで指定した数未満にはなりません）  

	@FUNC002, ARG:0, ARG:1, ARG,1100  
		LOCAL = ARG:0 * ARG:1 / 100  
		RETURN LOCAL  

この場合、`ARG`の要素数は本来`1000`ですが、`@FUNC002`において`ARG`の要素数は0～1100の1101となります。  
関数における引数指定のために使うことを想定しているので、それ以外の用途に用いると可読性が下がるかもしれません。  

#### （ユーザー定義のプライベート変数）  
特定の関数中で定義`#DIM`または`#DIMS`を用いて定義した変数はプライベート変数であるため、ローカル変数と同様に扱えます。  
詳しくは[ユーザー定義の変数](user_defined_variables.md)を参照してください。  

### セーブデータ間で共有される変数  
#### `GLOBAL`  
#### `GLOBALS`  
異なるセーブデータ間で共有することができる変数です。  
`GLOBAL`は整数、`GLOBALS`は文字列となります  
サイズは基本は`GLOBAL`が1000、`GLOBALS`が100で`VariableSize.csv`で変更できます。  
他のデータと一緒にはセーブ・ロードされません。  
グローバル変数をセーブするには`SAVEGLOBAL`命令を使います。  
`SAVEGLOBAL`を行うと、`global.sav`に`GLOBAL`と`GLOBALS`が保存されます。  
書き込むときに既に`global.sav`がある場合、上書きします  
`LOADGLOBAL`命令により、`global.sav`から`GLOBAL`と`GLOBALS`を読み込めます。  
`LOADGLOBAL`は`@EVENTFIRST`および`@EVENTLOAD`のタイミングで行うことを勧めます。  
`GLOBAL`、`GLOBALS`を経由すれば異なるセーブデータ間でデータを共有することができます。  

#### （ユーザー定義のグローバル変数）  
ERH中で定義`#DIM GLOBAL`または`#DIMS GLOBAL`を用いて定義した変数はグローバル変数となります。  
また、`#DIM SAVEDATA GLOBAL`とすることでセーブされるグローバル変数となります。  
詳しくは[ヘッダーファイル（ERH）](ERH.md)を参照してください。  

### キャラクタ変数  
#### `NICKNAME`  
#### `MASTERNAME`  
`NAME`や`CALLNAME`と同様のセーブされる文字列型変数です。  
`chara*.csv`では`NICKNAME`、`MASTERNAME`または`あだ名`、`主人の呼び方`として指定します。  

#### `CSTR`  
セーブされる文字列配列変数です。  
`CFLAG`の文字列版です。  
`chara*.csv`では`CSTR`として指定します。  

#### `CUP`  
#### `CDOWN`  
#### `DOWNBASE`  
#### `TCVAR`  
数値型配列変数です。  
それぞれ、`UP`、`DOWN`、`LOSEBASE`、`TFLAG`のキャラクタ変数版として使用することが想定されています。  
そのため初期化タイミングやセーブの可不可もこれらの変数と同じです。  
ただし、`CUP`と`CDOWN`は[`UPCHECK`](../Reference/UPCHECK.md)命令の代わりに`CUPCHECK`命令を使います。  

#### `CDFLAG`  
数値型キャラクター三次元配列変数です。  

	CDFLAG:MASTER:0:2   

などのように第一引数がキャラ登録番号なのは従来のキャラクター変数と同じですが、  
第二引数と第三引数が必要になります。  

#### （ユーザー定義のキャラクタ変数）  
ERH中で定義`#DIM CHARADATA`または`#DIMS CHARADATA`を用いて定義した変数はキャラクタ変数となり、`CFLAG`などと同様自由に扱えます。  
詳しくは[ヘッダーファイル（ERH）](ERH.md)を参照してください。  

### csv関連  
#### csv変数  
各csvで定義された値を参照するための変数です。  
使い方は例えば`TALENTNAME`と`talent.csv`の関係と同じです。  
全て代入不可でセーブされない1次元配列変数です。  
csvで定義されていない場合、0または空文字列を返します。  

|変数名     |ファイル   |型      |要素数|
|:----------|:----------|:-------|:-----|
|ITEMPRICE  |item.csv   |整数型  |1000  |
|TRAINNAME  |train.csv  |文字列型|1000  |
|BASENAME   |base.csv   |文字列型|100   |
|EQUIPNAME  |equip.csv  |文字列型|100   |
|EQUIPNAME  |tequip.csv |文字列型|100   |
|STAINNAME  |stain.csv  |文字列型|1000  |
|EXNAME     |ex.csv     |文字列型|100   |
|SOURCENAME |source.csv |文字列型|100   |
|FLAGNAME   |flag.csv   |文字列型|10000 |
|TFLAGNAME  |tflag.csv  |文字列型|1000  |
|CFLAGNAME  |cflag.csv  |文字列型|1000  |
|TCVARNAME  |tcvar.csv  |文字列型|100   |
|STRNAME    |strname.csv|文字列型|20000 |
|TSTRNAME   |tstr.csv   |文字列型|100   |
|CSTRNAME   |cstr.csv   |文字列型|100   |
|SAVESTRNAME|savestr.csv|文字列型|100   |
|CDFLAGNAME1|cdflag1.csv|文字列型|1     |
|CDFLAGNAME2|cdflag2.csv|文字列型|1     |
|GLOBALNAME |global.csv |文字列型|100   |
|GLOBALSNAME|globals.csv|文字列型|100   |

`cstr.csv`等と`str.csv`の役割を混同しないでください。  
`str.csv`は変数`STR`に代入される値を決めるファイルですが、`cstr.csv`は`CSTRNAME`を定めるファイルです。  
`STRNAME`を定めるファイルは`strname.csv`となっています。`str.csv`及び`strname.csv`の使い方に注意してください。  

#### `gamebase.csv`変数  
`gamebase.csv`で定義された値を参照するための変数です。  
すべて非配列、代入不可、セーブされない変数です。  

|変数名               |キーワード          |型      |
|:--------------------|:-------------------|:-------|
|GAMEBASE_AUTHOR      |作者                |文字列型|
|GAMEBASE_INFO        |追加情報            |文字列型|
|GAMEBASE_YEAR        |製作年              |文字列型|
|GAMEBASE_TITLE       |タイトル            |文字列型|
|GAMEBASE_GAMECODE    |コード              |整数型  |
|GAMEBASE_VERSION     |バージョン          |整数型  |
|GAMEBASE_ALLOWVERSION|バージョン違い認める|整数型  |
|GAMEBASE_DEFAULTCHARA|最初からいるキャラ  |整数型  |
|GAMEBASE_NOITEM      |アイテムなし        |整数型  |

#### `WINDOW_TITLE`  
Emueraのウィンドウのタイトルバーに表示されている文字列です。  
非配列の文字列型変数です。初期値は`gamebase.csv`の`ウィンドウタイトル`に設定された値です。  
`ウィンドウタイトル`が設定されていなければ`タイトル`と`バージョン`から生成します。  
`タイトル`も設定されていない場合、`Emuera`になります。  

#### その他のcsvに関わる変数  
##### `MONEYLABEL`  
お金の単位が記録された変数です。  
非配列の文字列型変数で、代入不可、セーブされない変数です。  
初期値は[`_Replace.csv`](replace.md)にて設定される`お金の単位`に設定された値です。  
`お金の単位`が設定されていない場合、eramakerと同じ`$`になります。  

##### `DRAWLINESTR`  
[`DRAWLINE`](../Reference/DRAWLINE.md)命令を行ったときに表示される文字列が記録された変数です。  
非配列の文字列型変数で、代入不可、セーブされない変数です。  
初期値は`_Replace.csv`にて設定される`DRAWLINE文字`に設定された値を繰り返したものです。  
そのため`DRAWLINE文字`に設定された値そのままの文字列が入っているわけではありません。  
`DRAWLINE文字`が設定されていない場合、eramakerと同じ、例えば  
`------------------------------------------------------------------------------------------------------------`になります。  

### セーブロード関連  
#### `LASTLOAD_*`  
最後にロードしたデータの情報を参照するための変数です。  
参照はできますが代入はできません。  
全て初期値は`-1`または空文字列です。  
ロードした時に更新され、`RESETDATA`やメニューの`タイトルに戻る`を実行すると初期値に戻ります。  

##### `LASTLOAD_VERSION`  
最後にロードしたデータのバージョン（`gamebase.csv`で定義する値）  

##### `LASTLOAD_NO`  
最後にロードしたデータの番号（`save*.sav`の`*`に相当する番号）  

##### `LASTLOAD_TEXT`  
テキスト（[`PUTFORM`](../Reference/PUTFORM.md)で追加するテキスト。`SAVEDATA_TEXT`）  

#### `SAVEDATA_TEXT`  
セーブデータに保存され、セーブ/ロード画面で表示されるテキストです。  
ロード後に`LASTLOAD_TEXT`で参照できるテキストでもあります。  
参照も代入も可能です。  
`@SAVEINFO`が呼ばれる時に現在時刻を表す文字列が代入され、`PUTFORM`で追記することができる文字列です。  
`@SAVEINFO`中でこの文字列に直接代入することで時刻表示もカスタマイズできます。  
[`SAVEGAME`](../Reference/SAVEGAME.md)と`PUTFORM`を使わない（`SAVELOAD.ERB`を使う場合）には出番がありません。  

#### （ユーザー定義のセーブ可能な広域変数）  
ERH中で定義`#DIM SAVEDATA`または`#DIMS SAVEDATA"`を用いて定義した変数はセーブ可能な広域変数となります。  
ただし、`#DIMS SAVEDATA`を用いてセーブ可能な多次元広域変数を定義する場合、オプション[`セーブデータをバイナリ形式で保存する`](config.md#_43)が有効になっている必要があります。  
詳しくは[ヘッダーファイル（ERH）](ERH.md)を参照してください。  

### 多次元配列変数  
#### `DITEMTYPE`  
#### `DA ～ DE`  
**※この変数はobsoleteです。代わりに#DIM、#DIMSを使用して用途に応じた名前を付けることを検討してください。**  
**詳しくは[ユーザー定義](user_defined_variables.md)の変数を参照してください。**  

固定長の整数型二次元配列です。  
`DITEMTYPE:1:2`のように呼び出します。引数は省略できません。  
eramakerの二重配列は第一引数にはキャラクタ登録番号を指定するので`CHARANUM`によって配列の大きさが異なります。  
`DITEMTYPE`などの二次元配列は`VariableSize.csv`で指定した大きさのまま変化することはありません。  
`VARSIZE`命令の対象にした場合、`RESULT:0`と`RESULT:1`にそれぞれ要素数が代入されます。  
`VariableSize.csv`で`DITEMTYPE,100,200`としていると`DITEMTYPE:99:199`まで使用でき、`VARSIZE`命令では`RESULT:0`と`RESULT:1`に`100`と`200`が代入されます。  

#### `TA, TB`  
**※この変数はobsoleteです。代わりに#DIM、#DIMSを使用して用途に応じた名前を付けることを検討してください。**  
**詳しくは[ユーザー定義の変数](user_defined_variables.md)を参照してください。**  

固定長の整数型三次元配列です。  
`TA:1:2:3`のように呼び出します。引数は省略できません。  
サイズは標準では`100×100×100`です。つまり`TA:99:99:99`まで使えます。  
`VariableSize.csv`でサイズを変更することが可能ですが、合計で100万を超えるサイズは指定できません。  
`VARSIZE`命令の対象にした場合、`RESULT:0`と`RESULT:1`と`RESULT:2`にそれぞれの要素数が代入されます。  

#### （ユーザー定義の多次元配列変数）  
ver1.808以降、定義#DIMまたは#DIMSを用いて定義した変数を多次元とすることができるようになりました。  
詳しくは[ユーザー定義の変数](user_defined_variables.md)を参照してください。  

### デバッグ変数  
デバッグ変数はデバッグ用の情報を提供するための変数です。  
デバッグ変数はデバッグモードで起動したときのみ意味のある値を返します。  
通常モードで起動したときには`空文字列`又は`0`を返します。  

全て名前の前と後ろにアンダースコア`_`が2つ付いています。  

#### `__FILE__`  
一次元読み取り専用変数です。  
現在実行中のスクリプトのファイル名を返します。  
ファイル名はエラー情報などと同じようにフォルダ構造及び拡張子までを含む形式です。  

システム入力待ち中にデバッグコマンドや変数ウォッチから参照した場合など、  
現在実行中のスクリプトがない場合は空文字列を返します。  

#### `__LINE__`  
一次元読み取り専用変数です。  
現在実行中のスクリプトの行番号を返します。  
行番号はエラー情報などと同じように1から始まる数字です。  

現在実行中のスクリプトがない場合は-1を返します。  

#### `__FUNCTION__`  
一次元読み取り専用変数です。  
現在実行中の関数名を返します。  
関数名は`@`及び引数のリストを含みません。  

現在実行中のスクリプトがない場合は空文字列を返します。  

### その他  
#### `TSTR`  
文字列型1次元配列です。一次元配列で、セーブはされません。  
`TFLAG`と同じタイミングで初期化されます。  

#### `RANDDATA`  
乱数の状態を記憶するための配列です。数値型の一次元配列で代入可、セーブされます。  
`DUMPRAND`によって記録され、`INITRAND`によって読み出されます。  

#### `LINECOUNT`  
これまでに`PRINT`した行数を返す変数です。  
`LINECOUNT`は起動直後から改行(ウインドウ幅による改行を含まない)のたび+1、`CLEARLINE`した数だけ-されます。  
ログバッファー(標準5000)をあふれたことによる削除によっては変動しません。  
非配列の数値型変数で、代入・セーブ共に不可能です。  
また、行の数え方は`CLEARLINE`と同様です。  

#### `ISTIMEOUT`  
以下、私家改造版1809+v2に添付のreadmeより  

	○TINPUT系がタイムアウトしたかをチェックする変数ISTIMEOUT追加  
	　TINPUT系が呼び出された時に0に初期化され、タイムアウトすると1となります。  

ver1815現在、この変数は利用不能な可能性があります。  

#### `__INT_MAX__`  
#### `__INT_MIN__`  
数値型変数の定義域最大値、最小値という定数が記録されている非配列の数値型変数で、代入・セーブ共に不可能です。  
デバッグ変数ではないので普通に起動した場合でも使用できます。  

#### （ユーザー定義の広域変数）  
ERH中で定義`#DIM`または`#DIMS`を用いて定義した変数は広域変数となり、一文字変数（`A`など）同様自由に扱えます。  
詳しくは[ヘッダーファイル（ERH）](ERH.md)を参照してください。  

#### （ユーザー定義の定数）  
ERH中および特定の関数中で、定義`#DIM`または`#DIMS`を用いて定義した変数は1次元配列の定数となり、代入できない変数として扱えます。  
詳しくは[ユーザー定義の変数](ERH.md)を参照してください。  

#### （ユーザー定義の参照型変数）  
特定の関数中で定義`#DIM REF`または`#DIMS REF`を用いて定義した変数は参照型変数となります。  
詳しくは[ユーザー定義の変数](ERH.md)を参照してください。  

### makerとの仕様の違い  
#### `NAME`  
#### `CALLNAME`  
eramakerでは代入ができません。  
Emueraでは代入できるようになっています。  

#### `RAND`  
#### `CHARANUM`  
eramakerでは代入でき、セーブ・ロードされますが代入した値を使用する方法がありません。  
Emueraでは代入を禁止しています。  

### 暫定的な仕様表  
#### eramakerにも存在していた変数  
|変数名     |型    |配列          |代入|セーブ|禁止|初期値|初期化されるタイミング|備考|
|:----------|:-----|:-------------|:---|:-----|:---|:-----|:---------------------|:---|
|RESULT     |整数  |一次元        |○  |○    |×  |-|-|-|
|RESULTS    |文字列|一次元        |○  |×    |×  |-|-|-|
|A～Z       |整数  |一次元        |○  |○    |○  |-|-|-|
|COUNT      |整数  |一次元        |○  |○    |○  |-|-|`COUNT:0`は`REPEAT`においてカウンターとして使用される  禁止した場合は`REPEAT`使用不可|
|DAY        |整数  |一次元        |○  |○    |○  |-|-|-|
|TIME       |整数  |一次元        |○  |○    |○  |-|-|-|
|MONEY      |整数  |一次元        |○  |○    |○  |-|-|-|
|MASTER     |整数  |一次元        |○  |○    |○  |-|-|-|
|TARGET     |整数  |一次元        |○  |○    |×  |:0 = 1|-|-|
|ASSI       |整数  |一次元        |○  |○    |○  |:0 = -1|-|-|
|PLAYER     |整数  |一次元        |○  |○    |○  |-|-|-|
|ASSIPLAY   |整数  |一次元        |○  |○    |○  |:0 = 0|BEGIN TRAIN|-|
|SELECTCOM  |整数  |一次元        |○  |○    |×  |-|-|-|
|PREVCOM    |整数  |一次元        |○  |○    |○  |:0 = -1|BEGIN TRAIN|-|
|NEXTCOM    |整数  |一次元        |○  |○    |○  |:0 = -1|BEGIN TRAIN|-|
|LOSEBASE   |整数  |一次元        |○  |○    |○  |全て0|`@SHOW_USERCOM`終了時|`BASENAME`によって要素の指定ができる|
|UP         |整数  |一次元        |○  |○    |○  |全て0|`@SHOW_USERCOM`終了時  `UPCHECK`時|`PALAMNAME`によって要素の指定ができる|
|DOWN       |整数  |一次元        |○  |○    |○  |全て0|`@SHOW_USERCOM`終了時  `UPCHECK`時|`PALAMNAME`によって要素の指定ができる|
|PALAMLV    |整数  |一次元        |○  |○    |×  |`_replace.csv`  `PALAMLVの初期値`|-|-|
|EXPLV      |整数  |一次元        |○  |○    |×  |`_replace.csv`  `EXPLVの初期値`|-|-|
|EJAC       |整数  |一次元        |○  |○    |○  |:0 = 10000|-|-|
|FLAG       |整数  |一次元        |○  |○    |○  |-|-|`FLAGNAME`によって要素の指定ができる|
|TFLAG      |整数  |一次元        |○  |○    |○  |全て0|BEGIN TRAIN|`TFLAGNAME`によって要素の指定ができる|
|ITEM       |整数  |一次元        |○  |○    |○  |-|-|`ITEMNAME`によって要素の指定ができる|
|ITEMSALES  |整数  |一次元        |○  |○    |○  |-|-|`ITEMNAME`によって要素の指定ができる|
|BOUGHT     |整数  |一次元        |○  |○    |○  |-|-|-|
|PBAND      |整数  |一次元        |○  |○    |○  |:0 = `_replace.csv``  `PBANDの初期値`|-|-|
|CHARANUM   |整数  |無次元        |×  |×    |×  |-|-|どんな要素を指定してもキャラの登録数が返ってくる。|
|RAND       |整数  |無次元        |×  |×    |×  |-|-|`RAND:X`の`X`が`0`や負の値の場合エラーとなるように  それ以外の場合0～(要素数-1)までのランダムな値が返ってくる。|
|STR        |文字列|一次元        |○  |×    |○  |`STR.CSV`|-|`STRNAME`によって要素の指定ができる|
|SAVESTR    |文字列|一次元        |○  |○    |○  |-|-|`SAVESTRNAME`によって要素の指定ができる|
|NO         |数値  |キャラ＋無次元|○  |○    |×  |-|-|`CHARA**.CSV`で`番号,**`により指定する|
|ISASSI     |数値  |キャラ＋無次元|○  |○    |×  |-|-|`CHARA**.CSV`で`助手,1`と指定することで初期状態から助手として扱われる|
|NAME       |文字列|キャラ＋無次元|○  |○    |×  |-|-|`CHARA**.CSV`で`名前,**`により指定する|
|CALLNAME   |文字列|キャラ＋無次元|○  |○    |×  |-|-|`CHARA**.CSV`で`呼び名,**`により指定する|
|BASE       |数値  |キャラ＋ー次元|○  |○    |○  |-|-|`ADDCHARA`時に全要素が`MAXBASE`と同じ値になる  `BASENAME`によって要素の指定ができる|
|MAXBASE    |数値  |キャラ＋ー次元|○  |○    |○  ||-|`CHARA**.CSV`で`基礎,*,**`により指定する  `BASENAME`によって要素の指定ができる|
|ABL        |数値  |キャラ＋ー次元|○  |○    |○  |-|-|`CHARA**.CSV`で`能力,*,**`により指定する  `ABLNAME`によって要素の指定ができる|
|TALENT     |数値  |キャラ＋ー次元|○  |○    |○  |-|-|`CHARA**.CSV`で`素質,*`により指定する  `素質,*,**`のように3番目の値も指定できるように  TALENTNAMEによって要素の指定ができる|
|EXP        |数値  |キャラ＋ー次元|○  |○    |○  |-|-|`CHARA**.CSV`で`経験,*,**`により指定する  `EXPNAME`によって要素の指定ができる|
|MARK       |数値  |キャラ＋ー次元|○  |○    |○  |-|-|`CHARA**.CSV`で`刻印,*,**`により指定する  `MARKNAME`によって要素の指定ができる|
|RELATION   |数値  |キャラ＋ー次元|○  |○    |○  |`replace.csv`  `RELATIONの初期値`|-|`CHARA**.CSV`で`相性,*,**`により指定する  `NAME`または`CALLNAME`によって要素の指定ができる|
|JUEL       |数値  |キャラ＋ー次元|○  |○    |○  |-|-|`CHARA**.CSV`で`珠,*,**`により指定できるように  `PALAMNAME`によって要素の指定ができる|
|CFLAG      |数値  |キャラ＋ー次元|○  |○    |○  |-|-|`CHARA**.CSV`で`フラグ,*,**`により指定する  `CFLAGNAME`によって要素の指定ができる|
|EQUIP      |数値  |キャラ＋ー次元|○  |○    |○  |-|-|`CHARA**.CSV`で`装着物,*,**`により指定できるように  `EQUIPNAME`によって要素の指定ができる|
|TEQUIP     |数値  |キャラ＋ー次元|○  |○    |○  |全て0|BEGIN TRAIN|`TEQUIPNAME`によって要素の指定ができる|
|PALAM      |数値  |キャラ＋ー次元|○  |○    |○  |全て0|BEGIN TRAIN|`PALAMNAME`によって要素の指定ができる|
|STAIN      |数値  |キャラ＋ー次元|○  |○    |×  |`_replace.csv`  `汚れの初期値`|BEGIN TRAIN|`STAINNAME`によって要素の指定ができる|
|EX         |数値  |キャラ＋ー次元|○  |○    |○  |全て0|BEGIN TRAIN|`EXNAME`によって要素の指定ができる|
|SOURCE     |数値  |キャラ＋ー次元|○  |○    |○  |全て0|BEGIN TRAIN  `@SOURCE_CHECK`終了時|`SOURCENAME`によって要素の指定ができる|
|NOWEX      |数値  |キャラ＋ー次元|○  |○    |○  |全て0|`@EVENTCOM`直前|`@USERCOM`前には更新されない  `EXNAME`によって要素の指定ができる|
|GOTJUEL    |数値  |キャラ＋ー次元|○  |○    |○  |全て0|BEGIN TRAIN|`PALAMNAME`によって要素の指定ができる|
|ABLNAME    |文字列|一次元        |×  |×    |○  |`ABL.CSV`|-|-|
|TALENTNAME |文字列|一次元        |×  |×    |○  |`TALENT.CSV`|-|-|
|EXPNAME    |文字列|一次元        |×  |×    |○  |`EXP.CSV`|-|-|
|MARKNAME   |文字列|一次元        |×  |×    |○  |`MARK.CSV`|-|-|
|PALAMNAME  |文字列|一次元        |×  |×    |○  |`PALAM.CSV`|-|-|
|ITEMNAME   |文字列|一次元        |×  |×    |○  |`ITEM.CSV`|-|-|
|NOITEM     |整数  |一次元        |○  |○    |○  |:0 = gamebase.csv  "アイテムなし"|-|0と1以外も指定できる|

<!--アンダーライン付の部分はeramakerとEmueraで仕様が異なる部分である-->

#### Emuera専用変数  
<!--校正飽きたので後回し-->
|変数名|型|配列|代入|セーブ|禁止|初期値|初期化されるタイミング|備考|
|:--|:--|:--|:--|:--|:--|:--|:--|:--|
|LOCAL|整数|一次元|○  |×  |○  |-|-|#LOCALSIZEによって関数ごとに要素数が変化|
|LOCALS|文字列|一次元|○  |×  |○  |-|-|#LOCALSSIZEによって関数ごとに要素数が変化|
|ARG|整数|一次元|○  |×  |○  |任意|関数が呼び出された時※|※引数に設定されている場合のみ  関数ごとに引数で定義された分だけの要素数を確保|
|ARGS|文字列|一次元|○  |×  |○  |任意|関数が呼び出された時※|※引数に設定されている場合のみ  関数ごとに引数で定義された分だけの要素数を確保|
|(Private)|任意|任意|任意|×  |×  |任意|ゲーム開始  関数が呼び出された時※|※引数に設定されている場合のみ  関数中の#DIMまたは#DIMSで定義|
|(Refer)|任意|任意|※|※|×  |-|-|※参照先に依存  関数中の"#DIM REF"または"#DIMS REF"で定義|
|(Wide_area)|任意|任意|任意|任意|×  |任意|ゲーム開始|ERH中の#DIMまたは#DIMSで定義|
|GLOBAL|整数|一次元|○  |※|×  |-|-|※SAVEGLOBALでセーブ、LOADGLOBALでロードする  GLOBALNAMEによって要素の指定ができる|
|GLOBALS|文字列|一次元|○  |※|×  |-|-|※SAVEGLOBALでセーブ、LOADGLOBALでロードする  GLOBALSNAMEによって要素の指定ができる|
|LINECOUNT|整数|無次元|×  |×  |×  |-|-|-|
|ISTIMEOUT|整数|無次元|×|×|×|0|TINPUT系命令実行時|TINPUT系命令がタイムアウトした場合1が代入される|
|`__INT_MAX__`|整数|無次元|×|×|×|9223372036854775807|-|-|
|`__INT_MIN__`|整数|無次元|×|×|×|-9223372036854775808|-|-|
|RANDDATA|整数|一次元|○|○|×|-|-|-|
|TSTR|文字列|一次元|○|×|○|全て空文字列|BEGIN TRAIN|TSTRNAMEによって要素の指定ができる|
|DA|整数|二次元|○|○|○|-|-|-|
|DB|整数|二次元|○|○|○|-|-|-|
|DC|整数|二次元|○|○|○|-|-|-|
|DD|整数|二次元|○|○|○|-|-|-|
|DE|整数|二次元|○|○|○|-|-|-|
|DITEMTYPE|整数|二次元|○|○|○|-|-|-|
|TA|整数|三次元|○|○|○|-|-|-|
|TB|整数|三次元|○|○|○|-|-|-|
|NICKNAME|文字列|キャラ＋無次元|○|○|×|-|-|CHARA**.CSVで「あだ名,**」により指定する|
|MASTERNAME|文字列|キャラ＋無次元|○|○|×|-|-|CHARA**.CSVで「主人の呼び方,**」により指定する|
|DOWNBASE|整数|キャラ＋ー次元|○|○|○|全て0|@SHOW_USERCOM終了時|BASENAMEによって要素の指定ができる|
|CUP|整数|キャラ＋ー次元|○|○|○|全て0|@SHOW_USERCOM終了時  UPCHECK時|PALAMNAMEによって要素の指定ができる|
|CDOWN|整数|キャラ＋ー次元|○|○|○|全て0|@SHOW_USERCOM終了時  UPCHECK時|PALAMNAMEによって要素の指定ができる|
|TCVAR|整数|キャラ＋ー次元|○|○|○|全て0|BEGIN TRAIN|TCVARNAMEによって要素の指定ができる|
|CSTR|文字列|キャラ＋ー次元|○|○|○|-|-|CHARA**.CSVで「CSTR,*,**」により指定する|  CSTRNAMEによって要素の指定ができる|
|CDFLAG|整数|キャラ＋二次元|○|○|○|-|-|CFDLAGNAME1およびCDFLAGNAME2によって要素の指定ができる  要素数の初期設定値が1･1であることに注意|
|ITEMPRICE|整数|一次元|×|×|○|item.csv|-|ITEMNAMEによって要素の指定ができる|
|TRAINNAME|文字列|一次元|×|×|○|train.csv|-|-|
|BASENAME|文字列|一次元|×|×|○|base.csv|-|-|
|EQUIPNAME|文字列|一次元|×|×|○|equip.csv|-|-|
|TEQUIPNAME|文字列|一次元|×|×|○|tequip.csv|-|-|
|STAINNAME|文字列|一次元|×|×|○|stain.csv|-|-|
|EXNAME|文字列|一次元|×|×|○|ex.csv|-|-|
|SOURCENAME|文字列|一次元|×|×|○|source.csv|-|-|
|FLAGNAME|文字列|一次元|×|×|○|flag.csv|-|-|
|TFLAGNAME|文字列|一次元|×|×|○|tflag.csv|-|-|
|CFLAGNAME|文字列|一次元|×|×|○|cflag.csv|-|-|
|TCVARNAME|文字列|一次元|×|×|○|tcvar.csv|-|-|
|STRNAME|文字列|一次元|×|×|○|strname.csv|-|str.csvで指定するのはSTRの中身であって要素名ではない|
|TSTRNAME|文字列|一次元|×|×|○|tstr.csv|-|-|
|CSTRNAME|文字列|一次元|×|×|○|cstr.csv|-|-|
|SAVESTRNAME|文字列|一次元|×|×|○|savestr.csv|-|-|
|CDFLAGNAME1|文字列|一次元|×|×|○|cdflag1.csv|-|-|
|CDFLAGNAME2|文字列|一次元|×|×|○|cdflag2.csv|-|-|
|GLOBALNAME|文字列|一次元|×|×|○|global.csv|-|-|
|GLOBALSNAME|文字列|一次元|×|×|○|globals.csv|-|-|
|GAMEBASE_AUTHOR|文字列|無次元|×|×|×|gamebase.csv  "作者"|-|-|
|GAMEBASE_INFO|文字列|無次元|×|×|×|gamebase.csv  "追加情報"|-|-|
|GAMEBASE_YEAR|文字列|無次元|×|×|×|gamebase.csv  "製作年"|-|-|
|GAMEBASE_TITLE|文字列|無次元|×|×|×|gamebase.csv  "タイトル"|-|-|
|GAMEBASE_GAMECODE|整数|無次元|×|×|×|gamebase.csv  "コード"|-|-|
|GAMEBASE_VERSION|整数|無次元|×|×|×|gamebase.csv  "バージョン"|-|-|
|GAMEBASE_ALLOWVERSION|整数|無次元|×|×|×|gamebase.csv  "バージョン違い認める"|-|-|
|GAMEBASE_DEFAULTCHARA|整数|無次元|×|×|×|gamebase.csv  "最初からいるキャラ"|-|-|
|GAMEBASE_NOITEM|整数|無次元|×|×|×|gamebase.csv  "アイテムなし"|-|-|
|WINDOW_TITLE|文字列|無次元|○|×|×|gamebase.csv  "ウィンドウタイトル"※|-|※ない場合は"タイトル"と"バージョン"から生成  "タイトル"もない場合は「Emuera」|
|MONEYLABEL|文字列|無次元|×|×|×|_replace.csv  "お金の単位"※|-|※ない場合は「$」|
|DRAWLINESTR|文字列|無次元|×|×|×|_replace.csv  "DRAWLINE文字"※|-|※ない場合は「-」の繰り返し|
|LASTLOAD_VERSION|整数|無次元|×|×|×|-1|ゲーム開始  RESETDATA時|ロード時に値が更新される|
|LASTLOAD_NO|整数|無次元|×|×|×|-1|ゲーム開始  RESETDATA時|ロード時に値が更新される|
|LASTLOAD_TEXT|文字列|無次元|×|×|×|空文字列|ゲーム開始  RESETDATA時|ロード時に値が更新される|
|SAVEDATA_TEXT|文字列|無次元|○|※|×|※※|@SAVEINFO開始時|※セーブデータのタイトルとして保存される  ※※現在時刻を表す文字列|
