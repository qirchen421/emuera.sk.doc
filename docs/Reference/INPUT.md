---
hide:
  - toc
---

# INPUT(S)

| 関数名                                                        | 引数                    | 戻り値     |
| :------------------------------------------------------------ | :---------------------- | :--------- |
| ![](../assets/images/Iconeramaker.webp)[`INPUT`](./INPUT.md)  | (`int`, `int`, `int`)   | `void`     |
| ![](../assets/images/Iconeramaker.webp)[`INPUTS`](./INPUT.md) | (`int`, `int`, `int`)   | `void`     |

!!! info "API"

    ```  { #language-erbapi }
	INPUT (defaultValue, canClick, allowSkip)
	INPUTS (defaultValue, canClick, allowSkip)
    ```
	入力待ちを行い、`INPUT`は入力された数字を`RESULT`に代入し、`INPTUS`は入力された文字列を`RESULTS`に代入する  
	第一引数を設定した場合、何も入力されなかった場合にデフォルト値として各変数に代入されます  
	EEの追加機能として、ミドルクリックを通常の左クリックと同様に受け付ける。ミドルクリックの場合は`RESULT:1`に3が入る  

	第二引数を設定した場合、マウスクリックをエンターキーにみなす(`RESULTS`に空文字列を代入。ボタンを押した場合，ボタンのインデックスを`RESULTS:1`に代入)、左クリックの時`RESULT:1`を`1`、右クリックの時`RESULT:1`を`2`、ミドルクリックの時`RESULT:1`を`3`にします。また、同時に++shift++、++ctrl++、++alt++を押した場合、そのキー状態を`RESULT:2`に保存します。(bit 16 17 18)  

	第三引数を設定した場合、右クリック等でのスキップ中に入力待ちを行わない  
	ただしデフォルト値は適用される。上記`INPUT系でマウスクリックを受け付ける`と併用した場合はそれぞれ`RESULT:1`及び`RESULTS:1`に、  
	併用しなかった場合は通常通り`RESULT:0`及び`RESULTS:0`にデフォルト値が代入される  

!!! hint "ヒント"

    命令のみ対応しています。
