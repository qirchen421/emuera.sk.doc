---
hide:
  - toc
---

# CBGSETBUTTONSPRITE

| 関数名                                                                               | 引数                                                        | 戻り値 |
| :----------------------------------------------------------------------------------- | :---------------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGSETBUTTONSPRITE`](./CBGSETBUTTONSPRITE.md) | `int`, `string`, `string`, `int`, `int`, `zDepth`           | `int`  |
|                                                                                      | `int`, `string`, `string`, `int`, `int`, `zDepth`, `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBGSETBUTTONSPRITE button, spriteName, spriteNameB, x, y, zDepth
	int CBGSETBUTTONSPRITE button, spriteName, spriteNameB, x, y, zDepth, tooltip
    ```
	[`CBGSETBMAPG`](./CBGSETBMAPG.md)命令で設定したボタンマップと連動して選択可能なボタンを設定します。  
	マウス直下のボタンマップ画像の色の`0xRRGGBB`値が、引数`button`に等しい時に表示されるスプライトを`spriteNameB`、それ以外のときに表示されるスプライトを`spriteName`に指定します。  
	`spriteName`又は`spriteNameB`は空文字列を指定することができ、そうした場合には非選択中又は選択中に何も表示しません。  
	`x, y, zdepth`については[`CBGSETSPRITE`](./CBGSETSPRITE.md)と同じです。基準位置`(x,y) = (0,0)`が画面左下と画像左下が一致する位置であることに注意してください。  
	オプションで当該ボタンを選択中に表示されるツールチップ文字列を`tooltip`で指定することができます。  
	同じ`button`の値に複数の`CBGSETBUTTONSPRITE`を割り当てることができ、また、ボタンの位置と一致する必要はありません。  
	そうした場合、ツールチップについては画像の`x, y`位置とは関係なく、ツールチップ文字列が設定された中で最も`zDepth`が大きいもの（最先に描画され、最奥に見えるもの）の表示が優先されます。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
