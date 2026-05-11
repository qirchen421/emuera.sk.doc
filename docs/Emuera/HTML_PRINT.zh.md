# HTML_PRINT相关  
这里介绍以HTML_PRINT命令为首的html相关命令。  
通过使用相关命令，可以使用类似html的语法来指定显示内容。  
**※由于EM+EE中增加了功能，已根据EM+EE规范进行了修订**  

## HTML_PRINT  
利用类似html的标签进行`PRINT`的命令。  
参数不像`PRINT`那样的字符串，而是与`PRINTS`相同的字符串表达式，由于会自动换行，实际上接近`PRINTSL`的操作。  
`HTML_PRINT`的绘制不受`ALIGNMENT`、`SETFONT`、`COLOR`、`FONTSTYLE`命令及其类似命令的影响。  
要获得这些效果，必须全部通过标签指定。  
使用`<标签名 属性='属性值'>文本</标签名>`这样的形式。  
属性值必须用`'～'`或`"～"`包围。  
为了与Emuera中的字符串区别，推荐使用`'～'`包围。  

EM+EE的新增功能，当第二个参数为`0`（默认）以外时，将不再强制换行。  

### `p`  

	<p align='～'>文本</p>  

`p`标签只能放在字符串前，`</p>`只能放在最后。  
`</p>`可以省略。  

- `align`属性  
	必需  
	相当于`ALIGNMENT`命令。可以指定`left`、`center`、`right`三种。  

### `nobr`  

	<nobr>文本</nobr>  

相当于`PRINTSINGLE`命令的绘制  
添加此标签后，不会因超出绘制区域而进行隐式换行（可以进行由`<br>`引起的显式换行）  
但Emuera与浏览器不同，无法横向滚动，所以超出窗口宽度的部分将不可见。  
`<nobr>`只能放在第一个文本之前，`</nobr>`只能放在最后一个文本之后。  
`</nobr>`可以省略  

### `br`  
    进行换行。  
    此效果是显示行的换行，所以无论有多少`<br>`，在`CLEARLINE`或`LINECOUT`中都视为一行。  

### `button`, `nonbutton`  

	<button value='～' title='～' pos='～'>文本</button>  
	<nonbutton title='～' pos='～'>文本</nonbutton>  

`button`将包围的文本部分设为可点击的按钮。  
`nonbutton`将包围的文本部分显示为非按钮文本。  

- `value`属性  
	只能指定给`button`。  
	省略`value`时，将变为不可点击的与`<nonbutton>`类似的非按钮。  

- `title`属性  
	指定鼠标悬停时显示的工具提示内容。  

- `pos`属性  
	仅在`align`为`left`且使用了`nobr`标签时可以使用。  
	以字体大小的百分比指定从屏幕左端的位置。  
	例如`<button pos='300'>按钮</button>`的话，按钮将写在与`「　　　按钮」`几乎相同的位置。  

### `font`  

	<font face='～' color='～' bcolor='～' size='～'>文本</font>  

更改包围部分的字体、显示颜色、按钮选中时的显示颜色、字体大小  
此标签可以嵌套  

- face属性  
	指定字体名称。指定空字符串时，使用配置中指定的字体。  
	如果指定的字体不存在或不支持，将使用"Microsoft Sans Serif"。  
	（这是由于.Net Framework的System.Drawing.Font类的规格）  

- color属性  
	指定文本的显示颜色。  
	颜色指定可以使用`#FF0080`这样的十六进制格式或`red`、`blue`这样的单词格式。  
	颜色名称遵循`.Net Framework`的`Color结构体`的定义颜色。  
	但`Transparent`不能作为颜色名称指定。  

- bcolor属性  
	指定按钮选中时的显示颜色。  

- size属性 ![](../assets/images/IconSK.webp)
	以像素为单位指定字体大小。可使用 `size='24'` 或 `size='24px'` 格式。  
	嵌套 `<font>` 标签时继承外层字体大小设置。  

### `b`, `i`, `u`, `s`  

	<b>粗体</b>, <i>斜体</i>, <u>下划线</u>, <s>删除线</s>  

将包围部分的字符分别设为粗体、斜体、带下划线、带删除线  

### `img`  

	<img src='～～' srcb='～～' height='～～'>  

在行内显示图像。  
准备图像的方法请参考[资源设置](resources.md)。  

- `src`属性  
	必需  
	指定在`resources`文件夹的csv中创建的资源名  
	不指定`height`或`width`时，保持纵横比，缩小或放大到纵高与字体大小一致。  
	绘制接口为`WINAPI`时，不进行alpha混合。  

- `srcb`属性  
	指定在`resources`文件夹的csv中创建的资源名  
	`srcb`指定按钮选中时应显示的资源名。  
	省略时使用与`src`相同的图像。  
	图像会缩放或放大到与`src`相同的大小显示。  

- `height`属性  
	以字体大小的百分比指定显示尺寸的高度。省略时为100。  
	指定负值时，图像垂直翻转显示。  

- `width`属性  
	以字体大小的百分比指定显示尺寸的宽度。省略时为0。  
	为0时，会变为保持原图纵横比的值。  
	指定负值时，图像水平翻转显示。  

- `ypos`属性  
	以字体大小的百分比指定显示位置的纵向位置。省略时为0。  
	请注意基准是"字体大小"而不是"行高"。  
	横向位置的调整请使用`<shape type='space'>`或button的`pos`属性。  

- `px`表示  
	对于上述属性，可以在数值后加上`px`进行像素指定  

- `srcm`属性  
	类似于CBG系统的按钮映射。执行[INPUT系的扩展模式](../EMEE/EMEE_Summary.md#input)或`INPUTMOUSEKEY`命令时，将鼠标光标正下方按钮映射图像的颜色（RGB部分）赋值给`RESULT:3`（`INPUTMOUSEKEY`时为`RESULT:6`）。  

### `shape`  

	<shape type='rect' param='～～' color='～～' bcolor='～～'>  
	<shape type='space' param='～～'>  

在行中绘制指定图形。  

- `type`属性  
	必需  
	指定要绘制的图形类型。  
	可以使用`rect`或`space`。  
	- `type='rect'`  
		绘制矩形。  
		`param`指定1个或4个数字。  
		`param`为1个时指定矩形的宽度。  
		`<shape type='rect' param='400'>`绘制宽度为字体大小400%的矩形。  
		`param`为4个时按`x`、`y`、`宽度`、`高度`顺序指定。  
		`<shape type='rect' param='0,25,400,50'>`在行的上下中央绘制高度为字体大小50%的矩形。  
		`param='400'`与`param='0,0,400,100'`意思相同。  
	- `type='space'`  
		不显示指定宽度的内容。  
		例如`<shape type='space' param='400'>`只在字体大小400%的区间不绘制任何内容。  
		这大约等于四个全角空格的宽度。  

- `param`属性  
	必需  
	以与字体大小的比例（百分比）指定图形绘制的参数。  
	指定多个值时用逗号分隔。  

- `color`属性  
	指定图形的颜色。指定格式与`<font>`标签相同。  

- `bcolor`属性  
	指定图形按钮选中时的颜色。指定格式与`<font>`标签相同。  

### `clearbutton`  
EM+EE中新增的功能。`<clearbutton>`使包围部分的按钮无效（`title`、`pos`属性功能仍保留）  

- 属性`notooltip`为`true`时，按钮`title`属性也无效  

### `div`  
EM+EE中新增的功能。`<div>`可以在指定区域内显示包围的内容。`<div>`不支持嵌套结构。可以与其他标签结合使用。  

- `width`属性：子区域的宽度。可以像`<img>`、`<shape>`标签一样用`px`、字体大小的百分比指定。  
- `height`属性：子区域的高度。可以像`<img>`、`<shape>`标签一样用`px`、字体大小的百分比指定。  
- `xpos`属性：子区域从当前位置的横向距离。可省略。负数则靠左，正数则靠右。可以像`<img>`、`<shape>`标签一样用`px`、字体大小的百分比指定。  
- `ypos`属性：子区域从当前位置的纵向距离。可省略。负数则靠上，正数则靠下。可以像`<img>`、`<shape>`标签一样用`px`、字体大小的百分比指定。  
- `size`属性：`width`和`height`的简化。格式：`size='width,height'`。  
- `rect`属性：`xpos`、`ypos`、`width`和`height`的简化。格式：`rect='xpos,ypos,width,height'`。  
- `depth`属性：子区域的深度。可省略。负数则靠前，正数则靠后。  
- `color`属性：子区域的背景色。可省略。指定格式与`<font>`标签的`color`属性相同。  

- `display`属性：子区域的绘制形式。可省略。  
    - `relative`（默认）：在当前文字位置绘制。  
    - `absolute`：在窗口固定位置绘制，滚动时也不会移动。(0, 0)是窗口左下，ypos向上为正。  

- `margin`属性：子区域四个边的边距区域。可省略。  
    - `margin='all'`：将`all`应用到四边。可使用`px`或字体大小百分比。  
    - `margin='leftRight,topBottom'`：将`leftRight`应用到上下，`leftRight`应用到左右。可使用`px`或字体大小百分比。  
    - `margin='top,leftRight,bottom'`：将`top`应用到上，`leftRight`应用到左右，`bottom`应用到下。可使用`px`或字体大小百分比。  
    - `margin='top,right,bottom,left'`：将`top`应用到上，`right`应用到右，`bottom`应用到下，`left`应用到左。可使用`px`或字体大小百分比。  

- `padding`属性：子区域四个边的内边距区域。可省略。指定格式与`margin`属性相同。  
- `border`属性：子区域边界的宽度。可省略。指定格式与`margin`属性相同。  
- `bcolor`属性：子区域边界的颜色。可省略。指定格式与`margin`属性类似，但颜色格式与`<font>`标签的`color`属性相同。  

- `radius`属性：子区域边界外侧的圆角（半径）。可省略。  
    - `radius='all'`：将`all`应用到四个角。可使用`px`或字体大小百分比。  
    - `radius='ltRb,rtLb'`：将`ltRb`应用到左上和右下，`rtLb`应用到右上和左下。可使用`px`或字体大小百分比。  
    - `radius='lt,rtLb,rb'`：将`lt`应用到左上，`rtLb`应用到右上和左下，`rb`应用到右下。可使用`px`或字体大小百分比。  
    - `radius='lt,rt,rb,lb'`：将`lt`应用到左上，`rt`应用到右上，`rb`应用到右下，`lb`应用到左下。可使用`px`或字体大小百分比。  

### 字符引用  
如果有被`&`和`;`包围的单词，将其作为字符引用处理。  
支持的字符引用有`&amp;`、`&gt;`、`&lt;`、`&quot;`、`&apos;`及`&#nn;`、`&#xnn;`。  

### 注释  

	<!-- 注释 -->  

在html解析中，`<!--`和`-->`包围的文字会被忽略  

## 相关命令·函数  
请参考[参考资料中的HTML系](../Reference/README.zh.md#html-related)项目  