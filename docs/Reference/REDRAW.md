---
hide:
  - toc
---

# REDRAW, CURRENTREDRAW

| 関数名                                                              | 引数 | 戻り値 |
| :------------------------------------------------------------------ | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`REDRAW`](./REDRAW.md)        | `int`| なし   |
| ![](../assets/images/IconEmuera.webp)[`CURRENTREDRAW`](./REDRAW.md) | なし | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	REDRAW int
	int CUREENTREDRAW
    ```
	描画制御命令です。  
	引数に`0`を指定するとユーザーが入力を必要とするタイミングでのみ描画を行うようにします。  
	引数に`1`を指定すると通常通り、[コンフィグの`フレーム毎秒`](../Emuera/config.md#_16)で指定されたタイミングで描画を行います。  
	引数に`2`を加えると(`REDRAW 2`や`REDRAW 3`など)、上記の効果に加え、`REDRAW`命令を行った瞬間に強制的に描画を行います。  
	現在の`REDRAW`状態（`0`または`1`）は`CURRENTREDRAW`で取得することができます。  


!!! hint "ヒント"

    `CURRENTREDRAW`は式中関数対応しています。
