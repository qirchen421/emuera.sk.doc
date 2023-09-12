---
hide:
  - toc
---

# MOUSEX, MOUSEY

| 関数名                                                             | 引数 | 戻り値 |
| :----------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`MOUSEX`](./MOUSEXY.md)      | なし | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MOUSEY`](./MOUSEXY.md)      | なし | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	MOUSEX
	MOUSEY
    ```
	マウスカーソルの現在のX座標またはY座標を取得します。  
	座標はクライアント領域の左下位置を(0,0)とする相対位置であり、右方向がx軸の正、下方向がy軸の正です。  
	カーソルがクライアント領域内にある場合MOUSEYは負の値を返すことに注意してください。  
	クライアント領域の広さは[`CLIENTWIDTH`](./CLIENTFIELD.md)、[`CLIENTHEIGHT`](./CLIENTFIELD.md)関数によって取得できます。  
	（クライアント領域左上を基準とするY座標が必要なら、`MOUSEY()+CLIENTHEIGHT()`によって取得できます）  
	この関数はEmueraのウインドウがアクティブでなくても、また、マウスカーソルがウインドウ外であっても正常に動作します。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
