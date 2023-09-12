---
hide:
  - toc
---

# SPRITEANIMEADDFRAME

| 関数名                                                                                 | 引数                                                             | 戻り値 |
| :------------------------------------------------------------------------------------- | :--------------------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEANIMEADDFRAME`](./SPRITEANIMEADDFRAME.md) | `string`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITEANIMEADDFRAME spriteName, gID, x, y, width, height, offsetx, offsety, delay
    ```
	`spriteName`で指定したリソース名を持つアニメーションスプライトにフレームを追加します。  
	`gID`で指定した`Graphics`の`x, y, width, height`で指定した四角形の範囲をフレームとし、スプライト左上から`offsetx, offsety`の位置に配置します。  
	アニメーションスプライトの作成時に設定したサイズの範囲から外れた部分は描画されません。  
	`delay`にはこのフレームを表示する時間をミリ秒単位で指定します。  
	`spriteName`のリソース名が存在しない、又はアニメーションスプライトでない場合はこの命令は失敗し、何もしません。  
	フレームの追加に成功した場合1を、失敗した場合は0を返します。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
