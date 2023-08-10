---
hide:
  - toc
---

# PRINT_IMG

| 関数名                                                                                              | 引数                                                         | 戻り値 |
| :-------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`PRINT_IMG`](./PRINT_IMG.md) | `string`                                                     | なし   |
|                                                                                                     | `string`, `int`, `int`, `int`                                | なし   |
|                                                                                                     | `string`, `string`, `int`, `int`, `int`                      | なし   |
|                                                                                                     | `string`, `string`, `2DIntegerVariable`, `int`, `int`, `int` | なし   |

!!! info "API"

    ```  { #language-erbapi }
	PRINT_IMG spriteName
	PRINT_IMG spriteName, width, height, ypos
	PRINT_IMG spriteName, spriteNameBack, width, height, ypos
	PRINT_IMG spriteName, spriteNameBack, colorMatrix, width, height, ypos
    ```
	行中に指定した画像を表示します。  
	[`HTML_PRINT`命令の`<img>`タグ](../Emuera/HTML_PRINT.md#img)に相当します。  
	EM+EEにて記法が拡張。詳しくは[サマリー参照](../EMEE/EMEE_Summary.md#html_printprint)  

!!! hint "ヒント"

    命令のみ対応しています。  
