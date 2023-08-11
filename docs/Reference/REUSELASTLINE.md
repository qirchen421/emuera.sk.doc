---
hide:
  - toc
---

# REUSELASTLINE

| 関数名                                                                     | 引数     | 戻り値 |
| :------------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`REUSELASTLINE`](./REUSELASTLINE.md) | `string` | なし   |

!!! info "API"

    ```  { #language-erbapi }
	REUSELASTLINE string
    ```
	最終行を指定した書式付き文字列で書き換えるが、  
	これを使って書き換えた行は、次の行が追加されるとそれに置き換わる  
	基本的には[`INPUT`](./INPUT.md)、[`INPUTS`](./INPUT.md)のループ処理の中でのみ使用するもの  
	引数は[`PRINTFORM`](./PRINT.md)と同様の書式を使用可  
	なお、`REUSELASTLINE （この半角スペース必須）`とすれば、警告文なしで空行にできます  

    ```  { #language-erbapi }
	$INPUT_LOOP  
	INPUT  
	IF RESULT != 0  
		;!;CLEARLINE 1   
		;!;REUSELASTLINE 無効ですよ  
		GOTO INPUT_LOOP  
	ENDIF  
	```

	のように、[`GOTO INPUT_LOOP`](./GOTO.md)の前に`REUSELASTLINE`を呼び出すと、  
	前の入力が画面から消去され、次の入力は前の入力と同じ行に表示される  
	これによって、無効な入力が繰り返されても、行数が増えず、  
	気づいたら選択肢が画面外に…なんて事態は防げる…はず  
	ちなみに`@USERXXX`系関数の条件分岐の最後に  
	（対象は`@USERCOM`、`@USERSHOP`、`@USERABLUP`の3つ）  

    ```  { #language-erbapi }
	;!;ELSE  
		;!;REUSELASTLINE   
	ENDIF  
	```

	とやっておくと…？  
	(Emuera専用なら`;!;`は必要なし)  

!!! hint "ヒント"

    命令のみ対応しています。
