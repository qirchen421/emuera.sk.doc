---
hide:
  - toc
---

# TINPUT(S)

| 関数名                                                        | 引数                                   | 戻り値   |
| :------------------------------------------------------------ | :------------------------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`TINPUT`](./TINPUT.md)  | `int`, `int`(, `int`, `string`, `int`) | `int`    |
| ![](../assets/images/IconEmuera.webp)[`TINPUTS`](./TINPUT.md) | `int`, `int`(, `int`, `string`, `int`) | `string` |

!!! info "API"

    ```  { #language-erbapi }
	TINPUT timeLimit, defaultValue(, displayTimeRemain, timeOverMessage, allowClick)
	TINPUTS timeLimit, defaultValue(, displayTimeRemain, timeOverMessage, allowClick)
    ```
	制限時間のある入力受付命令です。 1番目の引数は制限時間(ms)ですが、100msより細かい値を設定しても正確な動作はできません。  
	2番目の引数は時間切れ時のデフォルトのリターン値になります  
	3番目の引数は残り時間を表示するかで0なら非表示、他は表示となります。省略した場合は1（表示）です。  
	4番目の引数は時間切れ時に表示される文字列です。空文字列の場合はタイマー表示を消去して次の処理へ移ります。  
	なお、4番目の引数を設定した場合、3番目の引数は省略できません。  
	また`TINPUTS`において、[`INPUTS`](./INPUT.md)同様にマクロ式を用いることができます。  
	文字列として()を使用する場合、を用いてエスケープしてください。  

	EM+EEにて省略可能な第5引数を設定可能に。  
	非0時、マウスクリックをエンターキーにみなす(`RESULTS`に空文字列を代入。ボタンを押した場合，ボタンのインデックスを`RESULTS:1`に代入)、左クリックの時`RESULT:1`を`1`、右クリックの時`RESULT:1`を`2`にします。また、同時に++shift++、++ctrl++、++alt++を押した場合、そのキー状態を`RESULT:2`に保存します。(bit 16 17 18)  


!!! hint "ヒント"

    命令のみ対応しています。
