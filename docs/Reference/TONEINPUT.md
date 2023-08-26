---
hide:
  - toc
---

# TONEINPUT

| 関数名                                                             | 引数                                        | 戻り値   |
| :----------------------------------------------------------------- | :------------------------------------------ | :------- |
| ![](../assets/images/IconEmuera.webp)[`TONEINPUT`](./TONEINPUT.md) | `int`, `int`(, `int`, `string`, `int`)      | `int`    |
| ![](../assets/images/IconEmuera.webp)[`TONEINPUTS`](./TONEINPUT.md) | `int`, `string`(, `int`, `string`, `int`)  | `string` |

!!! info "API"

    ```  { #language-erbapi }
	TONEINPUT timeLimit, defaultValue(, displayTimeRemain, timeOverMessage, allowClick)
	TONEINPUTS timeLimit, defaultValue(, displayTimeRemain, timeOverMessage, allowClick)
    ```
	引数はそれぞれ[`TINPUT`、`TINPUTS`](./TINPUT.md)と同じです。  
	それぞれ[`ONEINPUT`](./ONEINPUT.md)とTINPUT、[`ONEINPUTS`](./ONEINPUT.md)とTINPUTSの性質を併せ持つ入力受付命令です。  
	これらの命令を利用した場合にはEmueraのCONFIG設定においてキーボードマクロを使用する設定になっていても、  
	うまく働かない現象が起こりますがそれは仕様です。  
	またpTONEINPUTS`において、[`INPUTS`](./INPUT.md)同様にマクロ式を用いることができます。  
	文字列として()を使用する場合、を用いてエスケープしてください。  

	EM+EEにて省略可能が第5引数を設定可能に。  
	非0時、マウスクリックをエンターキーにみなす(`RESULTS`に空文字列を代入。ボタンを押した場合，ボタンのインデックスを`RESULTS:1`に代入)、左クリックの時`RESULT:1`を`1`、右クリックの時`RESULT:1`を`2`にします。また、同時に++shift++、++ctrl++、++alt++を押した場合、そのキー状態を`RESULT:2`に保存します。(bit 16 17 18)  

!!! hint "ヒント"

    命令のみ対応しています。
