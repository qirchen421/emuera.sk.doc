---
hide:
  - toc
---

# TOOLTIP機能拡張

| 関数名                                                                           | 引数     |
| :------------------------------------------------------------------------------- | :------- |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_CUSTOM`](./TOOLTIP_EXTENSION.md)      | `int`    |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_SETFONT`](./TOOLTIP_EXTENSION.md)     | `string` |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_SETFONTSIZE`](./TOOLTIP_EXTENSION.md) | `int`    |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_FORMAT`](./TOOLTIP_EXTENSION.md)      | `int`    |

!!! info "API"

    ```  { #language-erbapi }
	TOOLTIP_CUSTOM bool
    TOOLTIP_SETFONT fontName
    TOOLTIP_SETFONTSIZE fontSize
    TOOLTIP_FORMAT formatFlags
    ```

	`HTML_PRINT`のツールチップ機能拡張機能です
    
	- `TOOLTIP_CUSTOM`：下記のツールチップ機能拡張を使用する場合、`TOOLTIP_CUSTOM`の引数に非`0`を指定することで機能がオンになります。`0`を指定するとオフになり、従来のツールチップ表示に戻ります
	- `TOOLTIP_SETFONT`：ツールチップ内に適用されるフォント名を指定します
	- `TOOLTIP_SETFONTSIZE`：ツールチップ内で適用されるフォントサイズを指定します
	- `TOOLTIP_FORMAT`：ツールチップ内のテキストフォーマットを指定できます。引数はC#の[`TextFormatFlags`](https://learn.microsoft.com/ja-jp/dotnet/api/system.windows.forms.textformatflags?view=netframework-4.8)に準拠します
	- 本家からあった`TOOLTIP_SETCOLOR`が機能するように。ツールチップ拡張をオンにしてる場合に適用されます
	- ツールチップ内で`<br>`タグを使用可能に。こちらはツールチップ拡張がオフでも使用可能

!!! hint "ヒント"

    命令のみの機能です


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		TOOLTIP_CUSTOM 1
		TOOLTIP_SETCOLOR 0x00AA00, 0x00FF00
		TOOLTIP_SETFONT "Ariel"
		TOOLTIP_SETFONTSIZE 24
		TOOLTIP_FORMAT 2;Right Alignment

		HTML_PRINT "<nonbutton title='tooltip<br>123'>テキスト1</nonbutton>"
		PRINTL 
		PRINTL 
		PRINTL 
		WAIT

		TOOLTIP_SETCOLOR 0x333333, 0xAAAAAA
		TOOLTIP_SETFONT "ＭＳ 明朝"
		TOOLTIP_SETFONTSIZE 12
		TOOLTIP_FORMAT 1;Center
		HTML_PRINT "<nonbutton title='古池や<br>蛙飛びこむ<br>水の音'>テキスト2</nonbutton>"
		PRINTL 
		PRINTL 
		PRINTL 
		WAIT
    ``` 
	![](../assets/images/TOOLTIP_EXTENSION1.png)
	![](../assets/images/TOOLTIP_EXTENSION2.png)

### 関連項目
- [ツールチップ表示操作](TOOLTIP_SET.md)
- [TOOLTIP_SETCOLOR](TOOLTIP_SETCOLOR.md)
