---
hide:
  - toc
---

# TOOLTIP_SETCOLOR

| 関数名                                                                           | 引数         | 戻り値 |
| :------------------------------------------------------------------------------- | :----------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TOOLTIP_SETCOLOR`](./TOOLTIP_SETCOLOR.md) | `int`, `int` | なし   |

!!! info "API"

    ```  { #language-erbapi }
	TOOLTIP_SETCOLOR colorCode, colorCode
    ```
	ツールチップの前景色及び背景色を0xRRGGBB形式の数値で設定します。第1引数が文字色、第2引数が背景色です。  
	指定にR,G,B値や文字列を使いたい場合は[`COLOR_FROMRGB`](./COLOR_FROM.md)や[`COLOR_FROMNAME`](./COLOR_FROM.md)関数を使用してください。  

	この命令は本家Emueraでは機能しません。EM+EEにて追加された、[`TOOLTIP_CUSTOM`](./TOOLTIP_EXTENSION.md)と併用することで機能します。  

!!! hint "ヒント"

    命令のみ対応しています。
