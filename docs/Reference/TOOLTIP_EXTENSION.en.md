---
hide:
  - toc
---

# TOOLTIP Extension

| Function name                                                                           | Arguments     |
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

	Tooltip feature extension for `HTML_PRINT`.
    
	- `TOOLTIP_CUSTOM`: To use the tooltip extension features below, specify a non-zero value for the argument to turn the feature on. Specifying 0 turns it off and returns to the traditional tooltip display.
	- `TOOLTIP_SETFONT`: Specifies the font name to be applied within the tooltip.
	- `TOOLTIP_SETFONTSIZE`: Specifies the font size to be applied within the tooltip.
	- `TOOLTIP_FORMAT`: Specifies the text format within the tooltip. The argument follows C#'s [`TextFormatFlags`](https://learn.microsoft.com/en-us/dotnet/api/system.windows.forms.textformatflags?view=netframework-4.8).
	- The existing `TOOLTIP_SETCOLOR` from the original version now works. It is applied when tooltip extension is enabled.
	- Allows using `<br>` tags within tooltips. This works even when tooltip extension is off.

!!! hint "Hint"

    Command-only feature.


!!! example "Example" 
 
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

### See Also
- [Tooltip Display Operations](TOOLTIP_SET.md)
- [TOOLTIP_SETCOLOR](TOOLTIP_SETCOLOR.md)
