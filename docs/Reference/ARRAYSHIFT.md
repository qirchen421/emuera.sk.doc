---
hide:
  - toc
---

# ARRAYSHIFT

| 関数名                                                               | 引数                                       | 戻り値 |
| :------------------------------------------------------------------- | :----------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ARRAYSHIFT`](./ARRAYSHIFT.md) | `variable`, `int`, `value`(, `int`, `int`) | なし   |

!!! info "API"

    ```  { #language-erbapi }
	ARRAYSHIFT variable, shiftCount, value(, startIndex, targetCount)
    ```
	配列をシフトする命令ARRAYSHIFT実装  
	書式：`ARRAYSHIFT <対象変数>, <ずらす数>, <ずらしてできた空白領域の初期値>{, <ずらず配列範囲の初値>, <ずらす配列要素の範囲の数>}``  
	内容：配列変数を指定した数だけずらす、正の値で添え字の大きい方へ、負の値で小さい方にずらす  
	　　　配列の範囲からはみでた値は掃き捨て、ずらして出来た空白領域は第2引数で指定した値で満たす  
	　　　省略可能な第4および第5引数を使うと一部の範囲のみをずらすことができる  

!!! hint "ヒント"

    命令のみ対応しています。
