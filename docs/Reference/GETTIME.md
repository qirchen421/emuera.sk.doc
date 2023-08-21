---
hide:
  - toc
---

# GETTIME

| 関数名                                                             | 引数 | 戻り値          |
| :----------------------------------------------------------------- | :--- | :-------------- |
| ![](../assets/images/IconEmuera.webp)[`GETTIME`](./GETTIME.md)     | なし | `int`, `string` |
| ![](../assets/images/IconEmuera.webp)[`GETTIME()`](./GETTIME.md)   | なし | `int`           |
| ![](../assets/images/IconEmuera.webp)[`GETTIMES()`](./GETTIME.md)  | なし | `string`        |

!!! info "API"

    ```  { #language-erbapi }
	GETTIME
	int GETTIME
	string GETTIMES
    ```
	パソコンの現在日時・時刻に関する情報を`RESULT:0`と`RESULTS:0`に代入します。  
	現在日時が2009年3月28日13時5分23秒678ミリ秒であれば、`RESULT:0`には`20090328130523678`が代入されます。  
	`RESULTS:0`には`2009/03/28 13:05:23`が代入されます。  
	`RESULTS:0`は主にセーブデータのコメントに使用することを想定しています。  
	年月日について独自の表記をしたい場合は`RESULT:0`を分解して使用してください。  
	なお、`RESULT:0`の精度は実行する環境にもよりますが、十数～数十ミリ秒程度です。  
	（数ミリ秒しか経過していない場合、同じ値が帰ってくることがあります）  
	パフォーマンスの測定を目的とする場合は注意してください。  

	式中関数としての`GETTIME()`、`GETTIMES()`はそれぞれ、`GETTIME`命令が行われた時に`RESULT:0`、`RESULTS:0`に代入される値を返します  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
