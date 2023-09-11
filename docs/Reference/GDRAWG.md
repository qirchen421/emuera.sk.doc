---
hide:
  - toc
---

# GDRAWG

| 関数名                                                       | 引数                                                                                    | 戻り値 |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GDRAWG`](./GDRAWG.md) | `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`                    | `int`  |
|                                                              | `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `integerVariable` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GDRAWG destID, srcID, destX, destY, destWidth, destHeight, srcX, srcY, srcWidth, srcHeight
	int GDRAWG destID, srcID, destX, destY, destWidth, destHeight, srcX, srcY, srcWidth, srcHeight, colorMatrix
    ```
	指定した`destID`の`Graphics`に、指定した`srcID`の`Graphics`を描画します。  
	描画先`dest`の`Graphics`の位置及びサイズを4つの整数で、描画元`src`の`Graphics`の位置及びサイズを4つの整数で指定します。  
	オプションとして、5x5以上の二次元数値配列を`colorMatrix`として指定することでカラーマトリクスを適用して描画します。  
	`colorMatrix`は全要素を1/256にして.Net Frameworkの`ColorMatrix`クラスに渡されます。つまり、対角がすべて256である5x5行列が単位行列になります。  
	処理に成功した場合、非0を返します。  
	描画先`Graphics`又は描画元`Graphics`のいずれかが未作成であるなどの場合、0を返します。  
	描画先と描画元`Graphics`は同一でも実行可能です。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
