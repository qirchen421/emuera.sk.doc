---
hide:
  - toc
---

# CLIENTWIDTH, CLIENTHEIGHT

| 関数名                                                                  | 引数 | 戻り値 |
| :---------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CLIENTWIDTH`](./CLIENTFIELD.md)  | なし | `int`  |
| ![](../assets/images/IconEmuera.webp)[`CLIENTHEIGHT`](./CLIENTFIELD.md) | なし | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CLIENTWIDTH
	INT CLIENTHEIGHT
    ```
	クライアント領域（ウィンドウの描画領域）の現在の幅または高さを取得します。  
	この数値にはウィンドウ枠やメニューバー、スクロールバー、テキスト入力領域の幅や高さを含みません。  
	`CLIENTHEIGHT`はユーザーによってゲーム中に変更される可能性があることに注意して下さい。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
