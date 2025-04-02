---
hide:
  - toc
---

# SORTCHARA

| 関数名                                                             | 引数                       | 戻り値 |
| :----------------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SORTCHARA`](./SORTCHARA.md) | `charaVariable`, `keyword` | なし   |

!!! info "API"

    ```  { #language-erbapi }
	SORTCHARA charaVariable, FORWARDorBACK
    ```
	任意のキーによる、キャラリストのソート。  
	ソートキーは`NAME`のような文字列変数、`NO`のような数値型変数、`CFLAG`のような数値配列変数のいずれでも可能です。  
	`charaVariable`は省略することができ、その場合はキャラ番号(`NO:XX`)でソートされます。  
	`FORWARD`なら昇順、`BACK`なら降順になります。省略した場合は昇順でソートされます。  
	`MASTER`はソートの対象になりません。  
	また、`TARGET:0`、`ASSI:0`は自動で追尾されますので使用後に手動で操作する必要はありません。  
	しかし`TARGET:1`などを使用しているバリアントはこれらを手動で追随させる必要があります。  

    ```  { #language-erbapi }
	;NOで昇順にソート
	SORTCHARA 
	;NOで降順にソート
	SORTCHARA BACK
	;CFLAG:2で昇順にソート
	SORTCHARA CFLAG:2
	;NAMEで降順にソート
	SORTCHARA NAME, BACK
	```

	なお、`TARGET == -1`の場合でも、`CFLAG:2`などの値を実際に参照するわけではないのでエラーにはなりません。  

!!! hint "ヒント"

    命令のみ対応しています。

### 関連項目
- [SWAPCHARA](SWAPCHARA.md)
