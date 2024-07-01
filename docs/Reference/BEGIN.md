---
hide:
  - toc
---

# BEGIN

| 関数名                                                       | 引数          | 戻り値 |
| :----------------------------------------------------------- | :------------ | :----- |
| ![](../assets/images/Iconeramaker.webp)[`BEGIN`](./BEGIN.md) | `idenetifier` | なし   |

!!! info "API"

    ```  { #language-erbapi }
	BEGIN identifier
    ```
	`BEGIN`はさまざまなシステム命令を呼び出すことにより、ゲームを進行させます。  
	`BEGIN`を呼んだ時点で実行中の関数は終了します。`CALL`でどこからか呼ばれてきたとしても、元の関数に戻ることはありません。  

	`BEGIN TRAIN`は調教を開始します。  
	`BEGIN AFTERTRAIN`は調教を終了します。  
	`BEGIN ABLUP`は能力アップ画面を呼び出します。  
	`BEGIN TURNEND`はそのターンを終了します。  
	`BEGIN SHOP`は`SHOP`を呼び出します。  

	Emueraにて、キーワードとして新しく`FIRST`と`TITLE`が追加されました。
	`BEGIN FIRST`はタイトル画面で`[0]最初からはじめる`を選択した時と同じ効果で、イベント関数`@EVENTFIRST`が実行されます。
	`BEGIN TITLE`はタイトル画面に戻ります。
	どちらも変数の初期化などは行いませんので適宜[`RESETDATA`](./RESETDATA.md)命令を実行してください。

!!! hint "ヒント"

    命令のみ対応しています。

### 関連項目
* [FORCE_BEGIN](FORCE_BEGIN.md)
* [FLOWINPUT](FLOWINPUT.md)
* [CALLEVENT](CALLEVENT.md)
