# ARRAYMSORTEX

| 関数名                                                               | 引数                                   | 戻り値 |
| :------------------------------------------------------------------- | :------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`ARRAYMSORTEX`](./ARRAYMSORTEX.md) | `string`, `ref` `string[]`(, `int`)    | `1`    |
|                                                                      | `ref` `int`, `ref` `string[]`(, `int`) | `1`    |

!!! info "API"

    ```  { #language-erbapi }
    1. 1 ARRAYMSORTEX indexName, arrayNameList(, sortAscending)
    2. 1 ARRAYMSORTEX indexArray, arrayNameList(, sortAscending)
    ```
    
    本家版[`ARRAYMSORTEX`](https://osdn.net/projects/emuera/wiki/excom#h5-ARRAYMSORT.20array1.7B.2C.20array2....7D)と似ています。
    
    1. `indexName`で表した変数配列を並べ替え，その変化を基準に，`arrayNameList`内すべての行列を同じ順で並べ替えます。
    2. `indexArray`を並べ替え，その変化を基準に，`arrayNameList`内すべての行列を同じ順で並べ替えます。

    `sortAscending`が`0`以外または省略した場合，正順で並べ替え，そうでない場合，逆順で並べ替えます。

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        #DIM idx = 4,2,3,1
        #DIMS idxStr = "1","2","3","4"
        #DIM AA = 1,2,3,4
        #DIM BB = 5,3,1,2
        #DIMS Arrays = "idx", "AA", "BB" ; idxを入れないとidxを並び替えしない

        ARRAYMSORTEX idx, Arrays      ;正順
        PRINTFORML > idx == {idx},{idx:1},{idx:2},{idx:3}
        PRINTFORML > AA == {AA},{AA:1},{AA:2},{AA:3}
        PRINTFORML > BB == {BB},{BB:1},{BB:2},{BB:3}
        PRINTL
        ARRAYMSORTEX "idxStr", Arrays, 0   ;逆順
        PRINTFORML > idxStr == %idxStr%,%idxStr:1%,%idxStr:2%,%idxStr:3%
        PRINTFORML > AA == {AA},{AA:1},{AA:2},{AA:3}
        PRINTFORML > BB == {BB},{BB:1},{BB:2},{BB:3}

        ONEINPUT
    ``` 
    ``` title="結果"
    > idx == 1,2,3,4
    > AA == 4,2,3,1
    > BB == 2,3,1,5
    
    > idxStr == 1,2,3,4
    > AA == 1,3,2,4
    > BB == 5,1,3,2
    ```