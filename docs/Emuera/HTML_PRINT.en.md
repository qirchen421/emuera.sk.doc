# HTML_PRINT Related

This section explains HTML_PRINT and related HTML commands.  
By using related commands, you can specify display content using HTML-like syntax.  
**Note: Specifications have been added in EM+EE, so this has been revised to conform to EM+EE.**

## HTML_PRINT

A command that `PRINT`s using HTML-like tags.  
The argument is a string expression like `PRINTS`, not a simple string like `PRINT`, and automatically adds a newline, so it actually behaves more like `PRINTSL`.  
Drawing by `HTML_PRINT` is not affected by `ALIGNMENT`, `SETFONT`, `COLOR`, or `FONTSTYLE` commands and their similar commands.  
To achieve these effects, everything must be specified with tags.  
Use in the form `<tagName attribute='attributeValue'>text</tagName>`.  
Attribute values must be enclosed with `'~'` or `"~"`.  
We recommend enclosing with `'~'` to distinguish from strings in Emuera.

In EM+EE's added functionality, if the second argument is non-zero (default is 0), forced line breaking is disabled.

### `p`

	<p align='~'>text</p>

The `p` tag can only be placed before text, and `</p>` can only be placed at the end.  
`</p>` can be omitted.

- `align` attribute
	Required.  
	Equivalent to the `ALIGNMENT` command. Three types can be specified: `left`, `center`, and `right`.

### `nobr`

	<nobr>text</nobr>

Equivalent to drawing by the `PRINTSINGLE` command.  
With this tag, implicit line breaks due to exceeding the drawing area are not performed (explicit line breaks with `<br>` are possible).  
However, since Emuera cannot scroll horizontally like a browser, portions exceeding the window width become invisible.  
`<nobr>` can only be placed before the first text, and `</nobr>` can only be placed after the last text.  
`</nobr>` can be omitted.

### `br`
Inserts a line break.  
This effect is a display line break, so even with multiple `<br>`s, it counts as one line for `CLEARLINE` and `LINECOUNT`.

### `button`, `nonbutton`

	<button value='~' title='~' pos='~'>text</button>
	<nonbutton title='~' pos='~'>text</nonbutton>

`button` makes the enclosed text a clickable button.  
`nonbutton` displays the enclosed text as non-button text.

- `value` attribute
	Can only be specified for `button`.  
	If `value` is omitted, it becomes a non-button like `<nonbutton>` without click capability.

- `title` attribute
	Specifies the tooltip content to display when pointing at the button.

- `pos` attribute
	Can only be used when `align` is `left` and the `nobr` tag is used.  
	Specifies the position from the left edge of the screen as a percentage of the font size.  
	For example, `<button pos='300'>Button</button>` places the button at approximately the same position as `「      Button」`.

### `font`

	<font face='~' color='~' bcolor='~' size='~'>text</font>

Changes the font, display color, button selection display color, and font size for the enclosed text.  
This tag can be nested.

- face attribute
	Specifies the font name. If an empty string is specified, the font specified in config is used.  
	If the specified font does not exist or is not supported, "Microsoft Sans Serif" is used instead.  
	(This is due to the specifications of the .Net Framework's System.Drawing.Font class)

- color attribute
	Specifies the text display color.  
	Color can be specified in hexadecimal format like `#FF0080` or word format like `red` or `blue`.  
	Color names follow the defined colors of the .Net Framework's `Color` structure.  
	However, `Transparent` cannot be specified as a color name.

- bcolor attribute
	Specifies the button selection display color.

- size attribute ![](../assets/images/IconSK.webp)
	Specifies the font size in pixels. Use `size='24'` or `size='24px'` format.  
	Nested `<font>` tags inherit the outer font size setting.

### `b`, `i`, `u`, `s`

	<b>Bold</b>, <i>Italic</i>, <u>Underline</u>, <s>Strikethrough</s>

Makes the enclosed text bold, italic, underlined, or strikethrough respectively.

### `img`

	<img src='~~' srcb='~~' height='~~'>

Displays an image inline.  
See [Resource Settings](resources.en.md) for how to prepare images.

- `src` attribute
	Required.  
	Specifies the resource name created in the CSV file in the `resources` folder.  
	If `height` or `width` is not specified, it is displayed scaled or enlarged while maintaining the aspect ratio so that the height matches the font size.  
	If the drawing interface is `WINAPI`, alpha blending is not performed.

- `srcb` attribute
	Specifies the resource name created in the CSV file in the `resources` folder.  
	`srcb` specifies the resource name that should be displayed when the button is selected.  
	If omitted, the same image as `src` is used.  
	The image is displayed scaled or enlarged to the same size as `src`.

- `height` attribute
	Specifies the display size height as a percentage of the font size. Defaults to 100 if omitted.  
	If a negative value is specified, the image is displayed vertically flipped.

- `width` attribute
	Specifies the display size width as a percentage of the font size. Defaults to 0 if omitted.  
	If 0, the value maintains the original image's aspect ratio.  
	If a negative value is specified, the image is displayed horizontally flipped.

- `ypos` attribute
	Specifies the vertical position as a percentage of the font size. Defaults to 0 if omitted.  
	Note that the base is "font size", not "line height".  
	Use `<shape type='space'>` or the `pos` attribute of `button` to adjust horizontal position.

- `px` notation
	For the above attributes, px specification is possible by adding `px` after the number.

- `srcm` attribute
	Similar to CBG series button maps. When executing [Extended INPUT mode](../EMEE/EMEE_Summary.md#input) or the `INPUTMOUSEKEY` command, assigns the color (RGB part) of the button map image directly under the mouse cursor to `RESULT:3` (`RESULT:6` for `INPUTMOUSEKEY`).

### `shape`

	<shape type='rect' param='~~' color='~~' bcolor='~~'>
	<shape type='space' param='~~'>

Draws a specified shape within the line.

- `type` attribute
	Required.  
	Specifies the type of shape to draw.  
	`rect` or `space` can be used.
	- `type='rect'`
		Draws a rectangle.  
		`param` takes 1 or 4 numbers.  
		When `param` is 1, it specifies the rectangle width.  
		`<shape type='rect' param='400'>` draws a rectangle with a width of 400% of the font size.  
		When `param` is 4, it specifies `x`, `y`, `width`, `height` in order.  
		`<shape type='rect' param='0,25,400,50'>` draws a rectangle with a height of 50% of the font size at the vertical center of the line.  
		`param='400'` means the same as `param='0,0,400,100'`.
	- `type='space'`
		Displays nothing for the width specified in `param`.  
		For example, `<shape type='space' param='400'>` draws nothing for a section of 400% of the font size.  
		This is approximately equivalent to 4 full-width spaces.

- `param` attribute
	Required.  
	Specifies parameters for shape drawing as a ratio (percentage) to the font size.  
	Separate multiple values with commas.

- `color` attribute
	Specifies the shape color. The format is the same as the `<font>` tag.

- `bcolor` attribute
	Specifies the shape color when the button is selected. The format is the same as the `<font>` tag.

### `clearbutton`
A feature added in EM+EE. `<clearbutton>` makes the enclosed portion's button status invalid (the `title` and `pos` attribute functions remain).

- If the `notooltip` attribute is `true`, the button's `title` attribute is also invalidated.

### `div`
A feature added in EM+EE. Content enclosed by `<div>` can be displayed in a specified area. `<div>` does not support nested structures. It can be used with other tags.

- `width` attribute: The width of the sub-area. Can be specified in `px` or as a percentage of the font size, like `<img>` and `<shape>` tags.
- `height` attribute: The height of the sub-area. Can be specified in `px` or as a percentage of the font size, like `<img>` and `<shape>` tags.
- `xpos` attribute: The horizontal distance of the sub-area from the current position. Can be omitted. Negative means left, positive means right. Can be specified in `px` or as a percentage of the font size, like `<img>` and `<shape>` tags.
- `ypos` attribute: The vertical distance of the sub-area from the current position. Can be omitted. Negative means up, positive means down. Can be specified in `px` or as a percentage of the font size, like `<img>` and `<shape>` tags.
- `size` attribute: Simplified `width` and `height`. Format: `size='width,height'`.
- `rect` attribute: Simplified `xpos`, `ypos`, `width`, and `height`. Format: `rect='xpos,ypos,width,height'`.
- `depth` attribute: The depth of the sub-area. Can be omitted. Negative means closer, positive means further.
- `color` attribute: The background color of the sub-area. Can be omitted. The format is the same as the `color` attribute of the `<font>` tag.

- `display` attribute: The drawing format of the sub-area. Can be omitted.
    - `relative` (default): Draw at the current character position.
    - `absolute`: Draw at a fixed position in the window, does not move even when scrolling. `(0, 0)` is the bottom left of the window, `ypos` is positive in the upward direction.

- `margin` attribute: The margin area for all four sides of the sub-area. Can be omitted.
    - `margin='all'`: Apply `all` to all four sides. Both `px` and font size percentage are acceptable.
    - `margin='leftRight,topBottom'`: Apply `leftRight` to top and bottom, `leftRight` to left and right. Both `px` and font size percentage are acceptable.
    - `margin='top,leftRight,bottom'`: Apply `top` to top, `leftRight` to left and right, `bottom` to bottom. Both `px` and font size percentage are acceptable.
    - `margin='top,right,bottom,left'`: Apply `top` to top, `right` to right, `bottom` to bottom, `left` to left. Both `px` and font size percentage are acceptable.

- `padding` attribute: The padding area for all four sides of the sub-area. Can be omitted. The format is the same as the `margin` attribute.
- `border` attribute: The border width of the sub-area. Can be omitted. The format is the same as the `margin` attribute.
- `bcolor` attribute: The border color of the sub-area. Can be omitted. The format is similar to the `margin` attribute, but the color format is the same as the `color` attribute of the `<font>` tag.

- `radius` attribute: The rounding of the outer corners of the sub-area's border (radius). Can be omitted.
    - `radius='all'`: Apply `all` to all four corners. Both `px` and font size percentage are acceptable.
    - `radius='ltRb,rtLb'`: Apply `ltRb` to top-left and bottom-right, `rtLb` to top-right and bottom-left. Both `px` and font size percentage are acceptable.
    - `radius='lt,rtLb,rb'`: Apply `lt` to top-left, `rtLb` to top-right and bottom-left, `rb` to bottom-right. Both `px` and font size percentage are acceptable.
    - `radius='lt,rt,rb,lb'`: Apply `lt` to top-left, `rt` to top-right, `rb` to bottom-right, `lb` to bottom-left. Both `px` and font size percentage are acceptable.


### Character References

When a word is enclosed by `&` and `;`, it is processed as a character reference.  
Supported character references are `&amp;`, `&gt;`, `&lt;`, `&quot;`, `&apos;`, and `&#nn;`, `&#xnn;`.

### Comments

	<!-- comment -->

During HTML interpretation, characters enclosed by `<!--` and `-->` are ignored.

## Related Commands and Functions

See the [HTML-related section in Reference](../Reference/README.en.md#html-related).
