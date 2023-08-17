---
hide:
  - toc
---

# LOADGLOBAL

| 関数名                                                               | 引数 | 戻り値 |
| :------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`LOADGLOBAL`](./LOADGLOBAL.md) | なし | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	LOADGLOBAL
    ```
	`GLOBAL`と`GLOBALS`をロードします。保存先は`global.sav`です。  
	読み込みに失敗してもエラーにはなりません。  
	読み込みに成功すると`RESULT`に`1`を、失敗すると`0`を代入します。  
	通常のセーブデータと同様に、`gamebase.csv`で設定された[`コード、バージョン`](../Emuera/variables.md#gamebasecsv)が適切でないファイルはロードできません。  
	変数`GLOBAL`の詳細は変数の節を参照してください。  

!!! hint "ヒント"

    命令のみ対応しています。
