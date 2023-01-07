---
hide:
  - toc
---

# FLOWINPUT

| 関数名                                                               | 引数                  | 戻り値 |
| :------------------------------------------------------------------- | :-------------------- | :----- |
| ![](../assets/images/IconEE.webp)[`FLOWINPUT`](./FLOWINPUT.md)       | `int`(, `int`, `int`) | `void` |

!!! info "API"

	``` { #language-erbapi }
	FLOWINPUT default(, AllowLeftClick, AllowSkip)
	```

	フロー中のINPUT(`@SHOW_SHOP`内など)に対し、デフォルト値、左クリックの可否、スキップの可否のオプションを追加する
	以下それぞれのオプションの引用

	```
	`INPUT`, `INPUTS`, `ONEINPUT`, `ONEINPUTS` に第二引数追加(整数型，省略可，デフォルトは`0`)

    `TINPUT`, `TINPUTS`, `TONEINPUT`, `TONEINPUTS` に第五引数追加(整数型，省略可，デフォルトは`0`)

    - 追加引数`==0`時、または省略した時 本家版と同じです。
    - 追加引数`!=0`時 マウスクリックをエンターキーにみなす(`RESULTS`に空文字列を代入。ボタンを押した場合，ボタンのインデックスを`RESULTS:1`に代入)、左クリックの時`RESULT:1`を`1`、右クリックの時`RESULT:1`を`2`にします。また、同時に++shift++、++ctrl++、++alt++を押した場合、そのキー状態を`RESULT:2`に保存します。(bit 16 17 18)
	```
	```
    `INPUT`, `INPUTS`, `ONEINPUT`, `ONEINPUTS` に第三引数追加(整数型，省略可，デフォルトは`0`)

    `TINPUT`, `TINPUTS`, `TONEINPUT`, `TONEINPUTS` に第六引数追加(整数型，省略可，デフォルトは`0`)

	-追加引数`==0`時、もしくは省略時は本家版と同じ挙動
	-追加引数`!=0`時、右クリック等でのスキップ中に入力待ちを行わない
	ただしデフォルト値は適用される。上記`INPUT系でマウスクリックを受け付ける`と併用した場合はそれぞれ`RESULT:1`及び`RESULTS:1`に、
	併用しなかった場合は通常通り`RESULT:0`及び`RESULTS:0`にデフォルト値が代入される
	```

!!! hint "ヒント"

	命令のみ対応しています
