# フロー図  
フロー図は`DiagramDesigner`を用いて作成した。  
データファイルはこちら。  

以下の説明文中で特に明示されていない場合は文の主語はEmuera.exeである。  

## TITLE  
起動してerbを読み終えた後、および`BEGIN TITLE`実行後。  

> 各イベント関数の詳細は[イベント関数](../tutorial/event-functions.md)を参照。

![](../assets/images/title.gif)

`@SYSTEM_TITLE`が定義されていればそれを呼び出し、他には何もしない。  
`@SYSTEM_TITLE`中で[`BEGIN`](../Reference/BEGIN.md)命令や`LOADDATA`命令が行われずに[`RETURN`](../Reference/RETURN.md)されると次に実行する処理がなくなりエラー終了する。  
`@SYSTEM_TITLE`が定義されていなければ標準のタイトル処理を行う。  
標準のタイトル画面の`[0] 最初からはじめる`などの文字は変更可能である。  
詳細は[_replace.csv](replace.md)を参照。  

`[0] 最初からはじめる`が選択された場合、まずデータの初期化を行う。  
具体的には`STR`や`PRINTLV`の初期値の設定（`RESETDATA`命令と同じ）、`ADDCHARA 0`など。  
次に`BEGIN FIRST`を実行し、`FIRST`へ遷移する。  

`[1] ロードしてはじめる`が選択された場合、`@TITLE_LOADGAME`が定義されていればそれを呼び出す。  
定義されていなければ標準のロード画面を表示する。  
`LOADGAME`で呼ばれる画面とは微妙に異なる。  

## FIRST  
タイトル画面で`[0] 最初からはじめる`を選んだ時、および`BEGIN FIRST`実行後。  
`@EVENTFIRST`内で[`BEGIN`](../Reference/BEGIN.md)命令が行われなかった場合、次に実行する処理がなくなりエラー終了する。  

![](../assets/images/first.gif)  

## SHOP  
ロード後、および`BEGIN SHOP`実行後。  
ロード後の場合は`@EVENTSHOP`の処理を行わない。  

![](../assets/images/shop.gif)  

`@SHOW_SHOP`呼び出し後に入力を要求する。 この入力において、`0～99`が入力されると購入処理、それ以外が入力されると`@USERSHOP`を呼び出す。  
この範囲は`_replace.csv`によって変更可能である。詳細は[_replace.csv](replace.md)を参照。  
なお、`PRINT_ITEMSHOP`命令で表示されるアイテムの範囲は`ITEMNAME`と`ITEMSALES`の要素数のいずれか小さい方まで（標準は1000）。  

購入処理が呼ばれた場合、対応する`ITEMSALES`が`0`以外であるか、`MONEY`が`ITEMPRICE`より大きいかどうかを判定する。  
購入判定に失敗した場合、再度入力を要求する。  
eramakerでは購入に失敗した場合は`@SHOW_SHOP`からやり直していた。  

購入判定に成功した場合、`BOUGHT`変数に`ITEM`番号を代入し、`ITEM:BOUGHT`を`1`増やし、`MONEY`を`ITEMPRICE:BOUGHT`だけ減らす。  
`@EVENTBUY`を呼び出し`@SHOW_SHOP`へ戻る。  

どこかで[`BEGIN`](../Reference/BEGIN.md)命令が行われない限り、`SHOP`から出ることはない。  

## TRAIN  
`BEGIN TRAIN`実行後。  

![](../assets/images/train.gif)

まず一部の変数の初期化を行う。  
具体的には、`ASSIPLAY:0`に`0`、`PREVCOM:0`、`NEXTCOM:0`に`-1`を代入する。  
さらに`TFLAG`を全て`0`にし、全てのキャラの`GOTJUELP`、`TEQUIP`、`EX`、`PALAM`、`SOURCE`を全て0にする。  
最後に全てのキャラの`STAIN:2`に`2`、`STAIN:3`に`1`、`STAIN:4`に`8`、その他に`0`を代入する。  

`TRAIN`を出るときには初期化を行わないので、`SHOP`でセーブするとセーブデータにこれらの値が残ることになる。  
`@SAVEINFO`などでキャラの`GOTJUEL`、`TEQUIP`、`EX`、`PALAM`などに`0`を代入しておくことでセーブデータのサイズを節約することができる。  
`NEXTCOM`に非負の値を代入した場合の動作は重大な不具合を抱えているためここでは解説しない。  
Emueraの`NEXTCOM`は旧来のコードの動作を前記不具合を含めて再現する目的で実装されたものであり、新規の利用は想定されていない。  
`CALLTRAIN`命令に関しては拡張命令を参照。  

`@SHOW_STATUS`呼び出し後に実行可能な`TRAIN`を表示する。  
`TRAINNAME`が定義されているものについて、`@COM_ABLExx`を探す。  
探索範囲（図中の`MAX_TRAIN`）はEmueraでは`VariableSize.csv`で指定したTRAINNAMEの範囲まで、eramakerなら`2147483647`まで。  
`@COM_ABLExx`が定義されていないか、`0`以外の値を返したなら実行可能なので`TRAINNAME`を表示する。  
`@COM_ABLExx`が`0`を返したなら実行できないので`TRAINNAME`を表示しない。  
この時に実行可能かどうかを記憶しておく。（実行時に再度`@COM_ABLExx`を呼び出すわけではない。）  

`TRAINNAME`の表示が終わったら`@SHOW_USERCOM`を呼び出す。  
`@SHOW_USERCOM`後、入力の前に`UP`、`DOWN`、`LOSEBASE`を初期化する。  
その後、入力を要求する。  

入力結果を先の`@COM_ABLExx`の結果と照らし合わせ、実行可能なコマンドであれば対応する`@COMxx`を呼び出す流れになる。  
まず、`SELECTCOM`変数に`TRAIN`番号を代入し、全てのキャラの`NOWEX`の全ての要素を0にする。  
次に`@EVENTCOM`を呼びだし、その後に対応する`@COM`を呼び出す。  
`@COM`が`0`でない値を返したならば`@SOURCE_CHECK`、`@EVENTCOMEND`を呼び出し、`@SHOW_STATUS`に戻る。  
`@SOURCE_CHECK`終了後、`@EVENTCOMEND`呼び出し前に全てのキャラの`SOURCE`の全ての要素を0にする。  
`@SOURCE_CHECK`終了後、`@EVENTCOMEND`が存在しないか`@EVENTCOMEND`内で一度も`WAIT`命令が行われない場合、`@SHOW_STATUS`の直前に`WAIT`を発生させる。  
`@COM`が`0`を返したならば`@SHOW_STATUS`に戻る。  
なお、`UPCHECK`命令が実行されると`TARGET`の`PALAM`に`UP`と`DOWN`の値が加算・減算され、`UP`と`DOWN`の全てに`0`が代入される。  
入力結果が実行可能なコマンドでなければ`@USERCOM`を呼びだし、`@SHOW_STATUS`に戻る。  

どこかで[`BEGIN`](../Reference/BEGIN.md)命令が行われない限り、`TRAIN`から出ることはない。  

## ABLUP  
`BEGIN ABLUP`実行後。  

![](../assets/images/ablup.gif)

`@SHOW_JUEL`、`@SHOW_ABLUP_SELECT`を呼び出し、入力を要求する。  

入力が`0～99`の範囲内である場合、対応する`@ABLUP`を探す。  
対応する`@ABLUP`が定義されていれば`@ABLUP`を呼び出し、`@SHOW_JUEL`に戻る。  
定義されていない場合、再度入力を要求する。  
eramakerでは定義されていない場合は`@SHOW_JUEL`からやり直していた。  

入力が`0～99`の範囲外である場合、`@USERABLUP`を呼び出し、`@SHOW_JUEL`に戻る。  
Emuera1.705現在ではこの範囲を変える方法はない。  

どこかで[`BEGIN`](../Reference/BEGIN.md)命令が行われない限り、`ABLUP`から出ることはない。  

## AFTERTRAIN  
`BEGIN AFTERTRAIN`実行後。  
`@EVENTEND`内で[`BEGIN`](../Reference/BEGIN.md)命令が行われなかった場合、次に実行する処理がなくなりエラー終了する。  

![](../assets/images/aftertrain.gif)

## TURNEND  
`BEGIN TURNEND`実行後。  
`@EVENTTURNEND`内で[`BEGIN`](../Reference/BEGIN.md)命令が行われなかった場合、次に実行する処理がなくなりエラー終了する。  

![](../assets/images/turnend.gif)

## LOADGAME  
[`LOADGAME`](../Reference/SAVEGAME.md)命令の実行時。  
[`BEGIN`](../Reference/BEGIN.md)命令は[`RETURN`](../Reference/RETURN.md)命令を内包し[`BEGIN`](../Reference/BEGIN.md)以下の文は決して実行されないが、[`LOADGAME`](../Reference/SAVEGAME.md)と[`SAVEGAME`](../Reference/SAVEGAME.md)命令は[`CALL`](../Reference/CALL.md)命令と同様に元の場所に帰ってくる。  
ただし、LOADが実行された場合はもとの位置を忘れて`LOADDATAEND`へ遷移する。  

![](../assets/images/loadgame.gif)

## SAVEGAME  
[`SAVEGAME`](../Reference/SAVEGAME.md)命令の実行時。  
`@SAVEINFO`を呼び出すタイミングは実際に書き込みが行われる直前である。  

![](../assets/images/savegame.gif)

## LOADDATAEND  
[`LOADGAME`](../Reference/SAVEGAME.md)でLOADが実行された後、および`LOADDATA`命令の実行後。  
LOADが行われた時点で呼び出し中の関数などこれまでの状態は全て消去される。  

![](../assets/images/loaddataend1821.gif)

eramakerだとここでは何もせず、`@SHOW_SHOP`に遷移する。  
Emueraでは、`@SYSTEM_LOADEND`が定義されていれば`@SYSTEM_LOADEND`を実行する。  
`@SYSTEM_LOADEND`終了までに[`BEGIN`](../Reference/BEGIN.md)命令が行われれば、そちらへ遷移する。  
でなければ`@EVENTLOAD`が定義されていれば`@EVENTLOAD`を実行する。  

`@EVENTLOAD`終了までに[`BEGIN`](../Reference/BEGIN.md)命令が行われれば、そちらへ遷移する。  
[`BEGIN`](../Reference/BEGIN.md)命令が行われなければ通常通り`@SHOW_SHOP`に遷移する。  

## エラー処理フロー（SK専用）

### THROW 例外処理

`THROW` 命令が実行されると、`@BEFORE_THROW` イベント関数が定義されているかを確認する：

```
THROW 命令実行
    │
    ├─ 既に @BEFORE_THROW 内か？（再帰防止）
    │   ├─ はい → メッセージを直接出力して終了
    │   │
    │   └─ いいえ → @BEFORE_THROW が定義されているか？
    │           ├─ はい → スローを遅延、@BEFORE_THROW を呼び出す
    │           │       → @BEFORE_THROW 終了後に例外をスロー
    │           │
    │           └─ いいえ → 直接例外をスロー
```

### 汎用エラー処理

捕捉されないエラーが発生した場合（ランタイムエラー、スクリプトエラー等を含む）、`@BEFORE_ERROR` イベント関数が定義されているかを確認する：

```
エラー発生
    │
    ├─ 既に @BEFORE_ERROR 内か？（再帰防止）
    │   ├─ はい → 直接エラー処理して終了
    │   │
    │   └─ いいえ → @BEFORE_ERROR が定義されているか？
    │           ├─ はい → 処理を遅延、@BEFORE_ERROR を呼び出す
    │           │       → @BEFORE_ERROR 終了後にエラー処理
    │           │
    │           └─ いいえ → 直接エラー処理
```

> **SK専用**：`BEFORE_THROW` と `BEFORE_ERROR` イベント関数は Skia版で追加された機能で、スクリプトが例外のスロー前にインターセプト・処理することを可能にする。これらのイベントは原版 Emuera では利用できない。
> 詳細は[イベント関数 — BEFORE_THROW / BEFORE_ERROR](../tutorial/event-functions.md#before_throw)を参照。
