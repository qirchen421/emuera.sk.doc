---
hide:
  - toc
---

# CBGSETBMAPG

| 関数名                                                                 | 引数  | 戻り値 |
| :--------------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGSETBMAPG`](./CBGSETBMAPG.md) | `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBGSETBMAPG gID
    ```
	`gID`で指定する`Graphics`をクライアント領域のボタンマップとして設定します。  
	ここで設定したボタンマップは[`CBGSETBUTTONSPRITE`](./CBGSETBUTTONSPRITE.md)命令及び[`INPUTMOUSEKEY`](./INPUTMOUSEKEY.md)命令に影響します。  
	ボタンマップ画像は表示はされませんが[`CBGSETG`](./CBGSETG.md)命令で設定した画像と同様に画面左下と画像左下位置が一致するように配置されます。  
	マウスカーソル直下のボタンマップ画像の色が、ボタンの値として認識されます。  
	ただし、色のアルファ値が255でない（透明又は半透明である）ときにはボタンの値としては認識されません。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
