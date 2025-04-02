---
hide:
  - toc
---

# FOR-NEXT

| 関数名                                                  | 引数                                     | 戻り値 |
| :------------------------------------------------------ | :--------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`FOR`](./FOR.md)  | `integerVariable`, `int`, `int`(, `int`) | なし   |
| ![](../assets/images/IconEmuera.webp)[`NEXT`](./FOR.md) | なし                                     | なし   |

!!! info "API"

    ```  { #language-erbapi }
	FOR integerVariable, startNum, endNum(, value)
    ```
	`FOR～NEXT`は[`REPEAT～REND`](./REPEAT.md)の機能強化版です。  
	第１引数はカウントに使用される変数を表します（`REPEAT`では常に`COUNT:0`）。  
	第２引数は変数に最初に代入される値を表します（`REPEAT`では常に`0`）。  
	第３引数はループが終了される値を表します（`REPEAT`で設定可能な値）。  
	第４引数はループごとに加算される値を表します（`REPEAT`では常に`1`）。  
  
    ```  { #language-erbapi }
	FOR COUNT, 0, X  
		;～～  
	NEXT  
	REPEAT X  
		;～～  
	REND  
	```

	上の二つはほぼ同じ動作をします。  
	ともにX回の繰り返しを行う構文で、ループの途中で[`CONTINUE`](./CONTINUE.md)や[`BREAK`](./CONTINUE.md)を使用できます。  
	異なる点はカウント用の変数を指定できることと、開始値とステップを変更できることです。  
	また、`FOR～NEXT`は入れ子にすることができます。  

    ```  { #language-erbapi }
	FOR Y, 0, 100  
		FOR X, 0, 100  
			～～  
		NEXT  
	NEXT  
	```

	第１引数である`integerVariable`に指定できる変数は数値型の変数のみです。キャラクタ変数も使えません。  
	第４引数である`value`は省略可能です。省略した場合、`1`です。  
	`value`が正の値のとき、繰り返しのたびに`integerVariable`の変数に`value`が加算され、第３引数`endNum`以上となったときにループが終了します。  
	`value`が負の値のときは、`ntegerVariable`の変数が`endNum`以下となったときにループが終了します。  
	`value`が0であれば無限ループになります。[`BREAK`](./CONTINUE.md)文が実行されるまで永久に繰り返します。  
	各値はループの開始と同時に固定され、ループの途中で変数が変化しても影響を受けません。  
	以下の２つは同じ結果になります。  

    ```  { #language-erbapi }
	;１  
	X = 10  
	FOR COUNT:X, 0, X, X/10  
		X = 10000  
	NEXT  
	;２  
	FOR COUNT:10, 0, 10, 10/10  
		X = 10000  
	NEXT  
	```
	なお、[`GOTO`](./GOTO.md)等の命令で直接`FOR～NEXT`内に入った場合、`REPEAT～REND`と同様に`NEXT`の直前まで通常通り実行し、その後`NEXT`を無視して次の行から処理を続行します。  

!!! hint "ヒント"

    命令のみ対応しています。

### 関連項目
- [REPEAT-REND](REPEAT.md)
- [WHILE-WEND](WHILE.md)
- [CONTINUE,BREAK](CONTINUE.md)
