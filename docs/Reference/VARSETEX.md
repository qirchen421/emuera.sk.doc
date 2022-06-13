# VARSETEX

| 関数名                                                       | 引数                                   | 戻り値 |
| :----------------------------------------------------------- | :------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`VARSETEX`](./VARSETEX.md) | `string`, `any`(, `int`, `int`, `int`) | `1`    |

!!! info "API"

    ```  { #language-erbapi }
    1 VARSETEX varName, value(, setAllDim, from, to)
    ```
    
    本家版[`VARSET`](https://osdn.net/projects/emuera/wiki/excom#h5-VARSET.20.3C.E5.A4.89.E6.95.B0.E5.90.8D.3E.7B.2C.20.3C.E6.95.B0.E5.BC.8F.20or.20.E6.96.87.E5.AD.97.E5.88.97.E5.BC.8F.3E.2C.20.3C.E9.85.8D.E5.88.97.E7.AF.84.E5.9B.B2.E5.88.9D.E5.80.A4.3E.2C.20.3C.E9.85.8D.E5.88.97.E7.AF.84.E5.9B.B2.E7.B5.82.E5.80.A4.2B1.3E.7D)と似ています。直接識別子の代わりに`varName`で表した変数名の配列に、`value`を代入します  
	`setAllDim`が`0`以外または省略した場合、全ての次元の配列に`value`を代入、そうでない場合、最低次元の配列のみに代入します  
	`from`と`to`で要素の始点、終点を指定できる（`to`位置の要素は含まない）。`to`を省略した場合、当次元の配列の最後尾まで代入、`from`を省略した場合，当次元の配列開始位置`0`から代入します。

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erh title="DEFINE.ERH" }
    #DIM 整数配列 = 1, 2, 3, 4, 5, 6
    #DIM 整数配列2D, 3, 4
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS ローカル文字列 = "Cat1", "Cat2", "Cat3"
        #DIM i
        #DIM j

        ; 第二引数の省略：v8に実装予定
        ; VARSETEX "ローカル文字列"
        VARSETEX "ローカル文字列", "dog"
        FOR i, 0, 3
            PRINTS ローカル文字列:i+" "
        NEXT
        PRINTL
        ; 一元配列に対して，第三引数はいくつでもいい
        VARSETEX "整数配列", -1, 0, 3, 5
        FOR i, 0, 6
            PRINTFORM {整数配列:i} 
        NEXT
        PRINTL
        ; 開始位置は1行の位置2だから、第四引数が1ですが2から始まる
        ; 第三引は0だから配列1だけ有効
        VARSETEX "整数配列2D:1:2", -1, 0, 1
        FOR j, 0, 3
            PRINTFORM 配列{j} -> 
            FOR i, 0, 4
                PRINTFORM {整数配列2D:j:i, 2, RIGHT} 
            NEXT
            PRINTL
        NEXT
        PRINTL
        VARSET 整数配列2D

        ; 第三引は省略した場合
        VARSETEX "整数配列2D:1:2", -1
        FOR j, 0, 3
            PRINTFORM 配列{j} -> 
            FOR i, 0, 4
                PRINTFORM {整数配列2D:j:i, 2, RIGHT} 
            NEXT
            PRINTL
        NEXT

        ONEINPUT
    ``` 
    ``` title="結果"
    dog dog dog 
    1 2 3 -1 -1 6 
    配列0 ->  0  0  0  0 
    配列1 ->  0  0 -1 -1 
    配列2 ->  0  0  0  0 
    
    配列0 ->  0  0 -1 -1 
    配列1 ->  0  0 -1 -1 
    配列2 ->  0  0 -1 -1 
    ```
