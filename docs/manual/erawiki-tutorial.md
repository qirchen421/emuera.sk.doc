# バリアント製作/チュートリアル  

元となったページ  
[eraシリーズを語るスレ まとめWiki V3 チュートリアル](https://seesaawiki.jp/eraseries/d/%a5%c1%a5%e5%a1%bc%a5%c8%a5%ea%a5%a2%a5%eb)  

**※現在、当ページ内のOSDNへのリンクは繋がりづらくなっています。**

<!--  
|~CENTER:チュートリアルページ一覧|  
|チュートリアル|  
|[[タイトル準備編]]|  
|[[タイトル実践編]]|  
|[[ERB製作実践編]]|  
-->  

---

## はじめに  
このチュートリアルは、2021/05/09にwikiに書き込んだものだが  
改変用のバニラeraにEmueraを導入してみようという内容になっている。  
バニラというのはバリアントの対義語で、eraの元祖であるeramakerのことだ。  

|漠々ト、獏（R18） サークル獏|  
|:-|
|http://cbaku.com/|  

著作権者は佐藤敏様だ。バニラは今遊んでも面白い。感謝を申し上げる。  

だが、今バニラのeraから新バリアントを自作するのはあまりおすすめしない。  
昔から今まで改変されているバリアントには、たくさんの機能が追加されている。  
何年もかけて有志が積み重ねてくれたものを、一人で作っていくのはとても大変だ。  
もちろん手本があり処理を貸してくれる方がいれば格段に楽だが、それでも。  
（お借りする場合はライセンスを確認しよう。  
　一般的に言えば個人製作ゲームの派生製作が許可されるのは稀だ。  
　eraにも派生を許可していないバリアントは多い）  

その上で、あえてバニラ改変の環境をつくってみよう。  
バニラについて知っているとEmueraWikiを読んだときの理解度が大きく変わる。  
結果としてやれることの幅も変わってくる。  
バニラにEmueraを導入しタイトルを作って繋げるところまでの序盤を書いてみる。  

---  

バニラは今のEmueraでは非推奨になった変数も数多く使用されている  
（非推奨の変数についてはetc1821のVariableSize.CSV等に記載されている）  
これは現行のバリアントでも数多く使用されている。  
単純に量が多くて個人には手がつけられないという理由がおそらく一番大きい。  
初心者にとってわかりやすさは死活問題だが、まとめてくれる方々に直せと迫ってはいけない。  
コード改善は自分が作業しやすくするために行うものと割り切ろう。  

---  

## 改造入門を読もう  
- [改造入門](modification-manual.md)

スタンダードな調教SLG向けのマニュアルで、はじめの準備として必要なことを書いてくれている。  
「[使いやすいテキストエディタ](modification-manual.md#_3)」、「[GREPのできる検索ツール](modification-manual.md#grep)」、「[最初にこれだけは肝に銘じよう](modification-manual.md#_5)」、  
をまずは読もう。  

---  

最近使われてそうなテキストエディタは  
導入が簡単・起動が早い・有志製作の色変え機能があるサクラエディタや  
日本語化が必要・起動はやや遅い・GREPがはやい・有志製作の関数ジャンプ機能があるVisual Studio Codeだろうか。  

デフォルトのエンコードがShift-JISではなくオートエンコード機能がオフの場合  
erakanonを開くと文字化けするかもしれない。  
一時のことと考えてShift-JISで作業を進めてもいいし、  
先にフリーカンパウェア等のエンコード変換ツールを探して全体にBOMつきUTF-8にしてもいい。  

<u>よくわからない人はとりあえず、サクラエディタをお借りしてみよう。</u>  
色分け機能やGREPなどを調べて活用できなくても、メモ帳代わりに使うだけで十分便利で、もとから日本語だ。  
全角スペース・半角スペース・タブの見分けがつくように表示してくれる機能がとてもありがたい。  
メモ帳で作ると大変な目に遭う（だいたいの場合、自分以外の人が）ので、メモ帳で作るのは極力避けよう。  
<!--
|bgcolor(#F0F0E7):[[タイトル実践編]]→エンコードってなに？|  
|https://seesaawiki.jp/eraseries/d/%a5%bf%a5%a4%a5%c8%a5%eb%bc%c2%c1%a9%ca%d4#content_2_3|  
//(2021/05/11 対応していないと書いていたのをwiki編集スレでご指摘いただいて修正。感謝。  
//　修正のメモについては読みにくくならないように  
//　時期をあけてご確認いただけた頃にコメントアウト予定です。追加情報も感謝）  
-->

---  

また、今はサクラエディタにもGREP機能がついてGREPツールは不要になっている。  
速度には差がある。ripgrepがおすすめらしい。  
<!--//（2021/05/11 wiki編集スレでご助言いただいて追記）  -->
GREPというのは、複数のファイルをまたいで検索できるシステムで、エラー箇所を探すのに役立つ。  
GREPのやり方についてはこちらで紹介してくれているので読んでみよう。  
|[システム改造Q&A→基礎知識→GREPのやり方](erawiki-modification-QandA.md#grep)|  
|:- |
|https://evilmask.gitlab.io/emuera.em.doc/manual/erawiki-modification-QandA.html#grep|  

---  

そしてバックアップはとても大事だ。  

---  

続きは昨今のバリアントだと案内してくれている方法ではキャラを追加できないこともあるが、  
今回はerakanonとEmueraをまとめてみるテストなので基本的なところを教われると思う。  

---  

また、エクスプローラーで拡張子を表示する設定にすると、  
`ファイル名.XXX`という感じに、ファイル形式が見えるようになる。  

eraを弄るなら、ERB、ERHとかcsvとか、ファイル形式がわからないとやりにくい。  
拡張子を表示していない人は『Windows エクスプローラー 拡張子表示』  
などで検索して、拡張子を表示する設定にしておこう。  

---  

<!-- ツール集がリンク切れでほぼ全滅なのでコメントアウト
*便利なツールを探そう  
エディタ配布サイトのアドレスなどがリンク集になっている。  
こちらで欲しいエディタを探してみよう。  
|bgcolor(#F0F0E7):[[ツール]]|  
|https://seesaawiki.jp/eraseries/d/%a5%c4%a1%bc%a5%eb|  
----  
[[▲目次に戻る>#contents]]  
//  
//  
//  
-->
## Emueraに必要な動作環境  

|Windows|  
|:-|
|.NET Framework 4.5|  

.NET Framework 4.5は、Windowsのアプリを作成するとき、  
Emueraに使われているプログラミング言語C#のできることを色々追加してくれるらしい。  
- Windows 11 だと、4.8が普通に入ってるので特段影響はないかと思いますとのこと（Emueraスレより。感謝）  
- Windows 10 だと、4.6がインストールされている。特に問題なく動く。  
- Windows 8 や 8.1 だと、4.5がはじめからインストールされている。  
- Windows Vista や 7 だと、インストールは可能らしい。検索して公式Microsoftダウンロードページを読もう。  
- Windows XPだと、インストール不可。  

EmueraEM+EEではさらに最新の.NETが要求されます。起動時の誘導に従ってダウンロード&インストールしてください。

問題なければ続きへ。  


---  

## Emueraのダウンロード  

|アプリ名|リンク|
|:-|:-|
|Emuera - emulator of eramaker ダウンロード|https://ja.osdn.net/projects/emuera/releases/|  
|EmueraEM+EE|https://evilmask.gitlab.io/emuera.em.doc/assets/files/Emuera1824%2Bv21%2BEMv18%2BEEv46%2BRikaichan.zip|

Emuera1824.zip(日付: 2019-01-28, サイズ: 253.98 KB)  
etc1821.zip(日付: 2015-11-04, サイズ: 8.73 KB)  
の、左側にある青ボタンをクリックしてダウンロードし、zipを展開してみよう。  

- Emuera1824フォルダ  
  - Emuera_readme.txt  
  - Emuera1824.exe  
- etc1821フォルダ  
  - _Replace.csv  
  - Chara0あなた.csv  
  - readme.txt  
  - SYSTEM_FLOW.ERB  
  - SYSTEM_FLOW.ERH  
  - VariableSize.CSV  
  - VariableSize_0.CSV  

というファイルが入っている。  

まずは`Emuera_readme.txt`を読んでみよう。  
Emueraの著作者は`MinorShift`さんと`妊）|дﾟ)の中の人`さんで  
MinorShiftさんには投げ銭支援ができる、Emueraはエミューラと読む、  
eramaker.exeと同じフォルダにいれて起動するという使い方、  
動作環境やライセンスなどが書かれているので確認しよう。  

おや、と思った方がいるかもしれない。  
eramaker.exeのあるところにEmuera.exeを入れるように書いてある。  
しかし大抵のeraはeramaker.exeが同梱されていない。  

eramakerについて何も知らずEmueraから入ろうとすると、  
Wikiを読んでも何がなにやら？？？になりがちだ。  
etc1821については後で確かめるとして、eramakerもダウンロードしてみよう。  

---  

## eramakerのダウンロード  

|漠々ト、獏（R18） サークル獏様|
|:-|
|http://cbaku.com/|  

こちらのカテゴリ 同人ゲームをクリックし、最後尾の辺りに表示される  

|同人ゲーム erakanon(eramaker）|
|:-|
|https://cbaku2.sakura.ne.jp/b/2010/12/eramaker/|  

を見てみよう。  
実にそそられる紹介文を読んだら、  

>ダウンロード(6/2 ver)  

からerakanonをダウンロードして解凍してみよう。  

- erakanonフォルダ  
  - eramaker.exe  
  - erakanor.html  
  - CSVフォルダ  
  - ERBフォルダ  

が入っている。  

erakanonは複数の対象がいて、対象のカードを購入して選択するゲームだ。  
eralightは対象が一人で、購入がなくはじめから対象に選ばれているゲームだ。  
（改変したい人へ→改変のための情報→eramakerのシンプルなサンプルゲーム eralight）  

ここではerakanonをベースにする前提で話を進める。  

---  

## eramakerの起動  
erakanonフォルダ内、eramaker.exeを起動してみよう。  
起動してみると気が付くだろう。  
『マウスで操作ができないだと……？』ということに。  

キーボードの数字キーでコマンド番号を入力し、  
エンターキーで実行する仕組みだ。  

## Emueraの起動  
Emuera_readme.txtで説明されていた通り、  
Emuera1824フォルダ内にあるEmuera1824.exeを  
erakanonフォルダにコピペしてみよう。  

eramaker.exeを閉じ、Emuera1824.exe起動する。  
ちょっと警告が出るが、今は気にしなくていい。  
今度はマウスで操作できる。  

おそらくEmueraはこの流れで導入することを想定しているため、  
CSVやERBフォルダの導入やその中身についてEmueraWiki側であまり説明していないのだと思う。  
（EmueraWikiのフロントページにeramakerへのリンクがあり、  
　eramakerのことはEmueraWikiにはほとんど書いてないよ、と書かれているのだが  
　最初はeramakerとEmueraの関係がわからなくて読み飛ばしてしまいがちだろう）  

次に、eramaker.exeを削除してみよう。  
再び、Emuera1824.exeを起動する。  
それまでと変わりなく動く。eralightの場合も同様だ。  

Emueraはeramakerのエミュレーター（模倣ソフトウェア）で、  
『機能が追加され、便利になった代替』として使用することができる。  
Emueraから入ろうとした初心者はその辺りで混乱したと思うが、これでもう大丈夫だ。  

---  

## 遊びながら改変情報を見てみよう  
再び以下のページを見てみよう。  

|同人ゲーム erakanon(eramaker）|
|:-|
|https://cbaku2.sakura.ne.jp/b/2010/12/eramaker/|  

ページを少し下のほうまで見ると  

>改変したい人へ  

という見出しがある。  
そして改変情報へのリンクがある。  

|ページ名|リンク|
|:-|:-|
|eramakerのCSV書式|https://cbaku2.sakura.ne.jp/b/erakanon/eramacsv.html|  
|eramakerのera basicの構造|https://cbaku2.sakura.ne.jp/b/erakanon/eramaerc.html|  
|eramakerのera basic書式|https://cbaku2.sakura.ne.jp/b/erakanon/eramaerb.html|  
|eramakerの変数リスト|https://cbaku2.sakura.ne.jp/b/erakanon/eramavar.html|  

<!--
（2021/04/29『eralightの改変の仕方』はリンク切れしているためコメントにスレへの情報を記載）  
//2021/06/16 スレ情報　  
//チュートリアル内、erakanon公式のリンク切れになっている「eralightの改変の仕方」について、  
//所在はttp://cbaku2.sakura.ne.jp/b/erakanon/tut000/eramt000.htmlです、とのこと  
//扱いに迷ったので情報提供のみとのお話だが、同じく、ただの指定ミスだとは思うものの  
//製作者様側の判断で一時的に外されている可能性もあるので迷い、コメント欄に記載。情報感謝  
-->
各ページに書かれている通り、ゲームを実際にプレイしながら目を通してみよう。  

---  

### eramakerのera basicの構造  

|eramakerのera basicの構造|
|:-|
|https://cbaku2.sakura.ne.jp/b/erakanon/eramaerc.html|  

erakanonで遊びながら、ここを読むと全体の流れや雰囲気をつかみやすい。  

|EmueraWiki flow|
|:-|
|https://evilmask.gitlab.io/emuera.em.doc/Emuera/system_flow.html|  

もっと詳しいことはEmueraのフロー図へ。  

---  

### eramakerのera basic書式  

|eramakerのera basic書式|
|:-|
|https://cbaku2.sakura.ne.jp/b/erakanon/eramaerb.html|  

素人にもわかりやすくなるように書いてくださっている。  
書き方の基礎がわからない人は読んでみよう。  

---  

### eramakerのCSV書式  

|eramakerのCSV書式|
|:-|
|https://cbaku2.sakura.ne.jp/b/erakanon/eramacsv.html|  

CSVは情報まとめのようなもの。  
ステータスデータ、キャラクターデータなどをこれで指定する。  
この説明書でファイル名と内容について説明されている。  
erakanonあるいはeralightのCSVフォルダ内にある、拡張子が`.csv`のファイルだ。  

色々な名前のCSVがある。  
たとえば、`Abl.csv`。  
『Abl』というのはおそらく『Ability』の略で  
キャラの能力ステータスについて設定するファイルだ。  


>1列目に能力番号を、2列目に能力名を書きます。  

と書いてあり、実際にファイルを開いてみると  

>0,従順  

一行目はこのようになっている。  

CSVにこのように書いておくと、ERBの処理で  

>ABL:キャラ番号:0  

を  

>ABL:キャラ番号:従順  

と、書くことができる。  

誰が見ても、よくわからない謎の数字（マジックナンバー、と表現するらしい）より  
パッと見で何をしているのかがわかりやすくなる（可読性が上がる、と表現するらしい）。  
もちろん作っている本人も、数字だけで管理するより忘れにくい。  

CSVは主にこういった目的で使うようだ。  

|[システム改造Q&A→基礎知識→マジックナンバーをなくす](erawiki-modification-QandA.md#_6)|  
|:-|
|https://evilmask.gitlab.io/emuera.em.doc/manual/erawiki-modification-QandA.html#_6|  

また、Emueraでは指定できるCSVが大量に増えている。そのためここに書かれていることは、  

|[EmueraWiki→Emueraで追加された拡張文法→一般→文字列による配列変数の要素の指定](../Emuera/expression.md#10)|  
|:-|
|https://evilmask.gitlab.io/emuera.em.doc/Emuera/expression.html#_10|  

と合わせて読みたい。  
といっても、最初にあまりたくさんの変数名を見ても覚えきれない。  
実際に使うとき、使えるcsvを調べられる一覧がどこにあるかだけ思い出せればいいだろう。  

変数そのものも増えているので、書かれている案内通り  

|[Emueraで追加された拡張文法→定数・変数→csv関連](../Emuera/variables.md#csv)|  
|:-|
|https://evilmask.gitlab.io/emuera.em.doc/Emuera/variables.html#csv|  

も合わせて確認したいところ。  

CSVにないデータをDIMの配列で自作することもできる。  

---  

### eramakerの変数リスト  
変数というのはそのまま、変わる数字と考えていいと思う。  

ゲームはプレイする人によってステータスが変わっていく。  
作るときは、遊ぶ人がどんなプレイをしてステータスがどうなろうとも、  
それによってどうなるかを前もって書いておく必要がある。  

箱を用意してシールを貼り『好感度』と書いて名付ける。  
箱に数字を入れていき、中身が何であってもこう計算してくれ、と命令する。  
箱となるのが変数。シールに書いた名前が変数名になる。  

|eramakerの変数リスト|
|:-|
|https://cbaku2.sakura.ne.jp/b/erakanon/eramavar.html|  

`A-Z`については現在は非推奨で、Emueraでは`DIM`変数を使うことがおすすめされている。  
今はバニラ環境で試してみようという趣旨なので試さないが、  
本当に１から新しいバリアントを作るなら『etc1821』フォルダ内『VariableSize.CSV』を読み、  
`VariableSize_0.CSV`を`VariableSize.CSV`と名前を変えてCSVフォルダにいれてみよう。  
（`VariableSize.CSV`は説明用のファイルで、`VariableSize_0.CSV`は実際に使うことを想定したファイルのようだ）  

非推奨の変数は最初から`-1`に設定してくれているため、自動的に使えなくなる。  
試してみれば、バニラのeraを最新化するためにどこを変更したらいいか、わかるかもしれない。  
（1000行を超える警告が出て、すべて一文字変数のオフ絡み）  

慣れている方は`LOCAL`,`LOCALS`が使えないことに戸惑うかもしれない。  
関数が多いとき、引数として使える`ARG`や`ARGS`を減らすと軽くなるという話もあり  
そちらは控えめに1で設定されているようだ。  

|[システム改造Q&A→基礎知識→プライベート変数について(A～ZやLOCALではなく#DIMで)](erawiki-modification-QandA.md#azlocaldim)|  
|:-|
|https://evilmask.gitlab.io/emuera.em.doc/manual/erawiki-modification-QandA.html#azlocaldim|  

---  

### 知っておくと便利なことについて  
現在、`***`や`+++`や`///`は、照れている表現としての`///`や、アスキーアート等と相性が悪いのであまり使われていない。  
こちらの機能はconfig側で禁止に設定できる。  
ERB側で便利機能として使われている場合は、口上側でその表現を使うことが禁止されることになる。  

---  

### 応用編を読もう  
各変数の範囲や内容について一覧のあるeratohoまとめ V3ページへのリンク集をまとめてくれている。  
|応用編|  
|:-|
|https://seesaawiki.jp/eraseries/d/%b1%fe%cd%d1%ca%d4|  

『EmueraWIkiのリンクタイトルを見ても、どのページになんの説明が載ってるのかわからん……』という方はここのEmueraの追加仕様一覧から飛ぶとわかりやすいかもしれない。  
開発者向け技術情報はわかる人向けにeramakerのシステム的特徴を教えてくれている。  

---  

## エラーの修正をしよう  

```
警告Lv2:INFO.ERB:89行目:構文解釈中に予期しない記号':'を発見しました  
    SIF STAIN:MASTER::COUNT & 2  
警告Lv2:INFO.ERB:91行目:構文解釈中に予期しない記号':'を発見しました  
    SIF STAIN:MASTER::COUNT & 4  
警告Lv2:INFO.ERB:93行目:構文解釈中に予期しない記号':'を発見しました  
    SIF STAIN:MASTER::COUNT & 8  
```

先ほどは気にしないことにしたが、Emuera.exeでerakanonを起動すると、こんなエラーが出た。  
改変する前に直しておこう。  

ERBフォルダを開くとたくさんのファイルがある。  
警告を見ると、INFO.ERBにエラーの原因があるようだ。  
そのファイルをエディタで開いてみよう。  

エディタで行番号を表示していると、  
指定されている89行目付近で問題の場所を見つけられるはずだ。  

``` { #language-erb title="ERB" }
SIF STAIN:MASTER::COUNT & 2  
    PRINT <Ｐ>  
SIF STAIN:MASTER::COUNT & 4  
    PRINT <精>  
SIF STAIN:MASTER::COUNT & 8  
    PRINT <Ａ>  
```

ここのMASTERの後の『`:`』が多いらしい。  

``` { #language-erb title="ERB" }
SIF STAIN:MASTER:COUNT & 2  
    PRINT <Ｐ>  
SIF STAIN:MASTER:COUNT & 4  
    PRINT <精>  
SIF STAIN:MASTER:COUNT & 8  
    PRINT <Ａ>  
```

に書き換え、保存してみよう。  

ファイルを閉じ、再びEmuera1824.exeから起動すると、警告が表示されなくなっている。  

<!--次のページ→[[タイトル準備編]]  -->
