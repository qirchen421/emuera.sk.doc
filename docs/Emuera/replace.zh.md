# _replace.csv
通过在csv文件夹中放置名为_replace.csv的文件，可以进行与显示相关的设置。

## お金の単位(Currency symbol)
在`PRINT_SHOPITEM`显示的商品价格上附加的单位。
标准为`$`。可以是全角字符或多字符字符串。

## 単位の位置(Currency symbol position)
在`PRINT_SHOPITEM`显示的商品价格上附加的单位是位于数字前还是数字后。
用`前`或`後`指定。标准为`後`。

## 起動時簡略表示(Loading message)
在配置中将`ロード時にレポートを表示する`功能设为OFF时，代替显示的字符串。
标准为`Now Loading...`。

## 販売アイテム数(Max shop item storage)
在eramaker的通常SHOP处理中，`PRINT_SHOPITEM`会显示`ITEMSALES`不为0的`ITEMNAME(0～999)`全部。
而购买处理和`@EVENTBUY`的处理只在输入了`0～99`的情况下进行，输入其他值时会调用`@USERSHOP`。

Emuera也基本上重现了这个处理。
修改`販売アイテム数`时，调用购买处理的商品范围会发生变化。
例如，将销售商品数量设为`1000`时，输入`0～999`的情况下进行购买处理，输入负值或`1000`以上值时调用`@USERSHOP`。

请注意，输入0～(销售商品数量-1)时，无论购买成功与否，都不会调用@USERSHOP。
例如销售商品数量为1000时，"[200] - 存档"或"[300] - 读档"会被视为尝试购买200号、300号商品的处理，不会调用@USERSHOP。

另外，如想增加（减少）`PRINT_SHOPITEM`显示的商品，请更改`VariableSize.csv`中`ITEMNAME`和`ITEMSALES`数组的元素数量。
`ITEMNAME`和`ITEMSALES`数组元素数量中较小的那个将成为`PRINT_SHOPITEM`显示的商品范围。

## DRAWLINE文字(DRAWLINE character)
`[DRAWLINE](../Reference/DRAWLINE.md)`指令显示的字符。
标准为`-`。

## BAR文字1(BAR character 1)
## BAR文字2(BAR character 2)
指定用于`[BAR](../Reference/BAR.md)`或`[BARL](../Reference/BAR.md)`指令的字符。
标准为`BAR字符1`为`*`，`BAR字符2`为`.`。
这种情况下会显示为`[****....]`。
也可以指定全角字符或多字符字符串，但请考虑显示偏移。
另外，指定数字时，Emuera会为了将`[88881111]`等视为可点击按钮而做出不自然的动作。

## システムメニュー0(System menu 0)
## システムメニュー1(System menu 1)
标题画面最初显示的选择项说明使用的字符串。
标准分别为`从最初开始`、`读取后开始`，

	[0] 从最初开始
	[1] 读取后开始

如上所示显示。
定义`@SYSTEM_TITLE`使用自定义标题画面时，这里指定的字符串不会使用。
请在`@SYSTEM_TITLE`中创建显示处理。

## COM_ABLE初期値(Default COM_ABLE)
在`TRAIN`中找不到`@COM_ABLE{X}`时的值。
标准为1，未定义对应`@COM_ABLE`时视为COM可执行。
将此值设为0时，未定义`@COM_ABLE`的情况下视为COM不可执行。

## 汚れの初期値(Default Stain)
`STAIN`初始化时赋值的值。
用`/`分隔可以指定`STAIN:1`之后的值。
标准为`0, 0, 2, 1, 8`。

## 時間切れ表示(Time up message)
`TINPUT`等有限时输入指令时间到时显示的字符串。
标准为`时间到`。

## EXPLVの初期値(Default EXPLV)
指定`EXPLV`的初始值。
用`/`分隔可以指定`EXPLV:1`之后的值。
标准为`0, 1, 4, 20, 50, 200`。

## PALAMLVの初期値(Default PALAMLV)
指定`PALAMLV`的初始值。
用`/`分隔可以指定`PALAMLV:1`之后的值。
标准为`0, 100, 500, 3000, 10000, 30000, 60000, 100000, 150000, 250000`。

## PBANDの初期値(Default PALAMLV)
指定`PBAND:0`的初始值。
标准为`4`。

## RELATIONの初期値(Default RELATION)
在`Chara**.csv`中，未指定时`RELATION`的初始值。
标准为`0`。