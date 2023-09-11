---
hide:
  - toc
---

# GDRAWGWITHMASK

| 関数名                                                                       | 引数                              | 戻り値 |
| :--------------------------------------------------------------------------- | :-------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GDRAWGWITHMASK`](./GDRAWGWITHMASK.md) | `int`, `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	GDRAWGWITHMASK destID, srcID, maskID, destX, destY
    ```
	指定した`destID`の`Graphics`に、`srcID`の`Graphics`を、`maskID`の`Graphics`をマスクとして適用して描画します。  
	出力先`destID`の`Graphics`内の描画位置を`destX, destY`で指定します。  
	処理に成功した場合、非0を返します。  
	`srcID`と`maskID`の幅及び高さが完全に一致すること、描画領域が`destID`からはみ出さないことが成功の条件です。  
	マスクとして適用して描画するとは、具体的には、マスク画像の青の値を不透明度としてソース画像に適用して描画することです。  
	例えば、マスク画像が完全に白一色（つまり全部の場所で青色がMAX）の場合、ソース画像はマスクなしの場合と同様にそのまま描画されます。  
	マスク画像が完全に黒一色（つまり全部の場所で青色が0）の場合、ソース画像は完全透明として扱われ何も起きません。  
	この命令の処理はGPUではなく、CPUがシングルスレッドで解決します。速度には期待しないでください。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
