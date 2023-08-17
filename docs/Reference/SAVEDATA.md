---
hide:
  - toc
---

# SAVEDATA

| 関数名                                                           | 引数            | 戻り値 |
| :--------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SAVEDATA`](./SAVEDATA.md) | `int`, `string` | なし   |

!!! info "API"

    ```  { #language-erbapi }
	SAVEDATA saveID, saveInfo
    ```
	`saveID`で示される番号のファイルに現在の状態をセーブします。  
	`SAVEDATA`命令は`@SAVEINFO`を呼び出さないので[`PUTFORM`](./PUTFORM.md)でコメントを入れることができません。  
	代わりに2つ目の引数の`saveInfo`でコメントを指定します。  
	(1.704からは文字列変数だけでなく文字列式が使用できます) 以下に例を示します。  

    ```  { #language-erbapi }
	GETTIME
	STR:0 = %RESULTS:0% {DAY+1}日目
	SAVEDATA 14, STR:0
	SAVEDATA 15, RESULTS:0 + " " + @"{DAY+1}日目"
	```

		結果(ロード画面)
		[13] ----
		[14] 2009年03月28日 00:31:27 1日目
		[15] 2009年03月28日 00:31:27 1日目
		[16] ----

	上書きの確認などは行わないので必要ならERB側で用意してください。  
	既にデータがあるかどうかは[`CHKDATA`](./CHKDATA.md)命令で調べることができます。  
	`SAVEDATA`は([`SAVEGAME`](./SAVEGAME.md)命令と違って)スクリプトのどの場所でも呼び出すことができます。  

!!! hint "ヒント"

    命令のみ対応しています。
