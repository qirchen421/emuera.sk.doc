---
hide:
  - toc
---

# ARRAYMSORT

| 関数名                                                               | 引数                          | 戻り値 |
| :------------------------------------------------------------------- | :---------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ARRAYMSORT`](./ARRAYMSORT.md) | `variable`(, `variable`...)   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	ARRAYMSORT variableName1(, variableName2,...)
    ```
	`ARRAYMSORT`は`variableName1`を昇順でソートし、それと同じ順序で`variableName2`以降の配列を並び替えます。  
	`variableName1`は一次元配列である必要があります。`variableName2`以降は多次元配列も受け付けます。  
	`variableName1`に`0`または空文字列の要素があるとき、それを配列の終端とみなし以降の要素はソートしません。  
	`variableName2`以降の配列の要素数が`variableName1pのソートされた要素数よりも少ない場合場合、命令を中断し`RESULT:0`に`0`を代入して終了します。  
	全ての配列のソートに成功した場合、この命令は`RESULT:0`に非0を代入して終了します。  

    ```  { #language-erbapi }
	@TEST
	#DIM ARRAY1,4
	#DIM ARRAY2,4
	#DIM ARRAY3,4,3
	ARRAY1 = 3,1,2,0
	ARRAY2 = 1001,1002,1003,0
	ARRAY3:0:0 = 1, 101, 2763
	ARRAY3:1:0 = 2, 102, 9615
	ARRAY3:2:0 = 3, 103, 7035

	ARRAYMSORT ARRAY1,ARRAY2,ARRAY3
	PRINTFORML > ARRAY1 == {ARRAY1:0},{ARRAY1:1},{ARRAY1:2},{ARRAY1:3}
	PRINTFORML > ARRAY2 == {ARRAY2:0},{ARRAY2:1},{ARRAY2:2},{ARRAY2:3}
	FOR I,0,3
		PRINTFORML > ARRAY3:{I}:0 == {ARRAY3:I:0},{ARRAY3:I:1},{ARRAY3:I:2}
	NEXT

	;;;出力
	> ARRAY1 == 1,2,3,0
	> ARRAY2 == 1002,1003,1001,0
	> ARRAY3:0:0 == 2,102,9615
	> ARRAY3:1:0 == 3,103,7035
	> ARRAY3:2:0 == 1,101,2763
	```

!!! hint "ヒント"

    命令のみ対応しています。
