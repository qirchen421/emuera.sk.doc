---
hide:
  - toc
---

# DOTRAIN

| 関数名                                                         | 引数  | 戻り値 |
| :------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`DOTRAIN`](./DOTRAIN.md) | `int` | なし   |

!!! info "API"

    ```  { #language-erbapi }
	DOTRAIN trainNo
    ```
	強制的に`TRAIN`を行う命令です。  
	`@EVENTTRAIN`、`@SHOW_STATUS`、`@SHOW_USERCOM`、`@USERCOM`、`@EVENTCOMEND`及びそこから呼び出された関数の中でのみ使用可能です。  
	引数で指定する番号は`train.csv`で定義した番号に対応しています。  
	動作はコマンドが選択された場合と同じで、`UP`、`DOWN`などの変数を初期化し、`SELECTCOM`に引数を代入し、`@EVENTCOM`が呼ばれ、`@COM{SELECTCOM}`が呼ばれ……という流れになります。  

	引数が`0`未満であるか、`TRAINNAME`の要素数以上の値であればエラーになりますが、それ以外のチェックは行われません。  
	引数が`train.csv`で定義されていない数字でも強制的に実行しようとします。  
	また、`@COM_ABLE`を呼び出さず、強制的に実行されます。  
	必要であれば`DOTRAIN`の前に以下のようなチェックを行ってください。  

    ```  { #language-erbapi }
	SIF ( X < 0 || X >= VARSIZE("TRAINNAME") || TRAINNAME:X == "" )
		RETURN
	RESULT = 1
	TRYCALLFORM COM_ABLE{X}
	SIF RESULT == 0
		RETURN
	DOTRAIN X
	```
	逆に`DOTRAIN`を用いて`TRAIN`のコマンドを独自に実装することもできます。  
	例えば`train.csv`を空にしておき、`@SHOW_USERCOM`で独自に表示し、`@USERCOM`で`DOTRAIN`を行います。  
	あるいは`train.csv`を空にする代わりに全ての`@COM_ABLE`が`0`を返すようにしてもよいでしょう。  
	`@COM_ABLE`を変更する代わりに、全ての`@COM_ABLE`を削除し、[`_replace.csv`の`COM_ABLE初期値`](../Emuera/replace.md#com_able)を`0`にする方法もあります。  
	なお、[`CALLTRAIN`](./CALLTRAIN.md)の処理の途中で`DOTRAIN`が行われた場合、`CALLTRAIN`の残りは無効になります。  

!!! hint "ヒント"

    命令のみ対応しています。
