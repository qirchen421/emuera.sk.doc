# _replace.csv

By placing a file named `_replace.csv` in the csv folder, you can configure display-related settings.

## Money Unit
The unit appended to item prices displayed by `PRINT_SHOPITEM`.  
The default is `$`. Full-width characters or strings containing multiple characters are also acceptable.

## Unit Position
Whether the unit appended to item prices displayed by `PRINT_SHOPITEM` comes before or after the number.  
Specify `前` (before) or `後` (after). The default is `後` (after).

## Startup Simple Display
The string displayed instead when the `Display report on load` option in config is OFF.  
The default is `Now Loading...`.

## Shop Item Count
In eramaker's standard SHOP processing, `PRINT_SHOPITEM` displays all `ITEMNAME(0-999)` where `ITEMSALES` is not 0.  
On the other hand, purchase processing and `@EVENTBUY` processing are only performed when `0-99` is entered, and `@USERSHOP` is called for other values.

Emuera basically reproduces this behavior as well.  
Changing the `Shop Item Count` changes the range of items for which purchase processing is called.  
For example, if you set the shop item count to `1000`, purchase processing is performed when `0-999` is entered, and `@USERSHOP` is called for negative values or values of `1000` or higher.

Note that if a value from 0 to (shop item count - 1) is entered, `@USERSHOP` will not be called regardless of whether the purchase succeeds or not.  
For example, if the shop item count is 1000, `[200] - Save` and `[300] - Load` will be treated as attempts to purchase items 200 and 300, and `@USERSHOP` will not be called.

To increase (or decrease) the items displayed by `PRINT_SHOPITEM`, change the array size of `ITEMNAME` and `ITEMSALES` in `VariableSize.csv`.  
The smaller of the `ITEMNAME` and `ITEMSALES` array sizes will be the range of items displayed by `PRINT_SHOPITEM`.

## DRAWLINE Character
The character displayed by the [`DRAWLINE`](../Reference/DRAWLINE.en.md) command.  
The default is `-`.

## BAR Character 1
## BAR Character 2
Specifies the characters used in the [`BAR`](../Reference/BAR.en.md) or [`BARL`](../Reference/BAR.en.md) commands.  
The defaults are `*` for `BAR Character 1` and `.` for `BAR Character 2`.  
In this case, it will be displayed like `[****....]`.  
Full-width characters or strings consisting of multiple characters can also be specified, but consider display alignment.  
Also, if numbers are specified, Emuera will treat `[88881111]` etc. as clickable buttons, resulting in unnatural behavior.

## System Menu 0
## System Menu 1
The strings used for the initially displayed choices on the title screen.  
The defaults are `最初からはじめる` (Start from beginning) and `ロードしてはじめる` (Start from load) respectively, and are displayed as:

	[0] 最初からはじめる
	[1] ロードしてはじめる

If you define `@SYSTEM_TITLE` to use your own title screen, the strings specified here will not be used.  
Create the display processing inside `@SYSTEM_TITLE`.

## COM_ABLE Default Value
Specifies the value when `@COM_ABLE{X}` is not found during `TRAIN`.  
The default is 1, meaning COM is considered executable if the corresponding `@COM_ABLE` is not defined.  
If you set this value to 0, COM will be considered not executable if `@COM_ABLE` is not defined.

## Stain Initial Value
The value assigned when `STAIN` is initialized.  
You can specify values for `STAIN:1` and beyond by separating them with `/`.  
The default is `0, 0, 2, 1, 8`.

## Time Out Display
The string displayed when time runs out in timed input commands like `TINPUT`.  
The default is `時間切れ` (Time out).

## EXPLV Initial Value
Specifies the initial value of `EXPLV`.  
You can specify values for `EXPLV:1` and beyond by separating them with `/`.  
The default is `0, 1, 4, 20, 50, 200`.

## PALAMLV Initial Value
Specifies the initial value of `PALAMLV`.  
You can specify values for `PALAMLV:1` and beyond by separating them with `/`.  
The default is `0, 100, 500, 3000, 10000, 30000, 60000, 100000, 150000, 250000`.

## PBAND Initial Value
Specifies the initial value of `PBAND:0`.  
The default is `4`.

## RELATION Initial Value
Specifies the initial value of `RELATION` when not specified in `Chara**.csv`.  
The default is `0`.
