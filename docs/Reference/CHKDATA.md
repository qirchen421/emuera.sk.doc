---
hide:
  - toc
---

# CHKDATA

| 関数名                                                         | 引数 | 戻り値 |
| :------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CHKDATA`](./CHKDATA.md) | `int`| `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CHKDATA saveID
    ```
	`saveID`で示される番号のファイルのデータの情報を`RESULT:0`と`RESULTS:0`に代入します。  
	`RESULT:0`は以下の値をとります。`0`の場合のみ、そのファイルをロードすることができます。  

	- 0 - このファイルはロード可能です。
	- 1 - 指定されたファイルは存在しません。
	- 2 - ゲームのコードが違います。([gamebase.csvの`コード`](../Emuera/variables.md#gamebasecsv)の値が違うデータ)
	- 3 - バージョンが違います。([gamebase.csvの`バージョン`](../Emuera/variables.md#gamebasecsv)の値が異なり、許容されるバージョンでもないデータ)
	- 4 - 上記以外の問題があるファイルです。

	`RESULT:0`が`0`のとき、`RESULTS:0`にはセーブデータのコメント（`@SAVEINFO`の[`PUTFORM`](./PUTFORM.md)で入力した文字列、または[`SAVEDATA`](./SAVEDATA.md)の第２引数）が代入されます。  
	`RESULT:0`が`0`以外のとき、`RESULTS:0`には`セーブデータのバーションが異なります`などのエラーメッセージが代入されます。  
	また、`CHKDATA`を呼んだタイミングが`RESULT:0`に値を代入する途中でない場合（`RESULT:0 = CHKDATA(LOCAL)`など）、  
	`RESULT:0`にはセーブデータのタイムスタンプ（2009年3月28日13時5分23秒678ミリ秒であれば、`RESULT = 20090328130523678`）が代入されます。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
