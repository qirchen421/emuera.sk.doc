---
hide:
  - toc
---

# HTML_PRINT

| 関数名                                                               | 引数     | 戻り値 |
| :------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`HTML_PRINT`](./HTML_PRINT.md) | `string` | なし   |

!!! info "API"

    ```  { #language-erbapi }
	HTML_PRINT htmlStyleString
    ```
	htmlっぽいタグを利用して[`PRINT`](./PRINT.md)する命令です。  
	引数が`PRINT`のような文字列ではなく`PRINTS`と同じ文字列式でり、自動的に改行するので実際は`PRINTSL`の動作に近いです。（EM+EEでは改行しないオプションが追加されています）
	`HTML_PRINT`による描画は[`ALIGNMENT`](./ALIGNMENT.md)、[`SETFONT`](./SETFONT.md)、[`SETCOLOR`](./SETCOLOR.md)、[`FONTSTYLE`](./FONT_OPERATION.md)命令とその類似命令の影響を受けません。
	これらの効果を得るには全てタグで指定する必要があります。
	詳細は[`HTML_PRINT`関連](../Emuera/HTML_PRINT.md)を参照してください。

!!! hint "ヒント"

    命令のみ対応しています。
