---
hide:
  - toc
---

# CALLTRAIN

| 関数名                                                             | 引数  | 戻り値 |
| :----------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CALLTRAIN`](./CALLTRAIN.md) | `int` | なし   |

!!! info "API"

    ```  { #language-erbapi }
	CALLTRAIN comCount
    ```
	連続コマンド実行命令です。  
	あらかじめ`SELECTCOM:(1～)`にコマンド番号を代入しておき、実行するコマンドの数を引数にして実行します。  

    ```  { #language-erbapi }
	SELECTCOM:1 = XXX
	SELECTCOM:2 = YYY
	　　　・
	　　　・
	　　　・
	SELECTCOM:N = ZZZ

	CALLTRAIN (設定したコマンドの数)
	```
	通常のコマンド実行と同様に`SHOW_STATUS`や`SHOW_USERCOM`も呼び出しますが、`TRAIN`コマンド、`USERCOM`の表示はされません。  
	どうしても`USERCOM`の表示をしたい場合は[`NOSKIP～ENDNOSKIP](./SKIP_RELATE.md)`を使うと良いでしょう。  
	`CALLTRAIN`による自動実行が終了後、システム関数`@CALLTRAINEND`が呼び出されます。  
	ただし、`@CALLTRAINEND`はイベント関数ではないため多重定義できないことに注意してください。  
	なお、コマンドの指定に使うコマンド番号は、ゲーム中の値でなく、`TRAIN.CSV`で指定した値になります  

!!! hint "ヒント"

    命令のみ対応しています。

### 関連項目
* [DOTRAIN](DOTRAIN.md)
* [STOPCALLTRAIN](STOPCALLTRAIN.md)
