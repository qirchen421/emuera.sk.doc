# 流程图
流程图使用`DiagramDesigner`制作。
数据文件在此处。

以下说明文中，除非特别注明，句子的主语均为Emuera.exe。

## TITLE
启动并读取erb结束后，以及执行`BEGIN TITLE`后。

> 各事件函数的详细说明请参阅[事件函数](../tutorial/event-functions.zh.md)。

![](../assets/images/title.gif)

如果定义了`@SYSTEM_TITLE`则调用它，其他什么也不做。
如果在`@SYSTEM_TITLE`中没有执行[`BEGIN`](../Reference/BEGIN.zh.md)指令或`LOADDATA`指令，而是执行了[`RETURN`](../Reference/RETURN.zh.md)，则由于没有要执行的处理而错误终止。
如果没有定义`@SYSTEM_TITLE`，则执行标准的标题处理。
标准标题画面的`[0] 从最初开始`等文字是可以更改的。
详情请参考[_replace.csv](replace.zh.md)。

选择`[0] 从最初开始`时，首先进行数据初始化。
具体来说是设置`STR`或`PRINTLV`的初始值（与`RESETDATA`指令相同）、`ADDCHARA 0`等。
接着执行`BEGIN FIRST`，转移到`FIRST`。

选择`[1] 读取后开始`时，如果定义了`@TITLE_LOADGAME`则调用它。
如果没有定义则显示标准的加载画面。
与`LOADGAME`调用的画面略有不同。

## FIRST
在标题画面选择`[0] 从最初开始`时，以及执行`BEGIN FIRST`后。
如果在`@EVENTFIRST`中没有执行[`BEGIN`](../Reference/BEGIN.zh.md)指令，由于没有要执行的处理而错误终止。

![](../assets/images/first.gif)

## SHOP
加载后，以及执行`BEGIN SHOP`后。
加载后的情况下不执行`@EVENTSHOP`的处理。

![](../assets/images/shop.gif)

调用`@SHOW_SHOP`后要求输入。此输入中，输入`0～99`则执行购买处理，其他输入则调用`@USERSHOP`。
此范围可通过`_replace.csv`更改。详情请参考[_replace.csv](replace.zh.md)。
另外，`PRINT_ITEMSHOP`指令显示的商品范围为`ITEMNAME`和`ITEMSALES`元素数中较小的一个（标准为1000）。

如果调用购买处理，会判断对应的`ITEMSALES`是否不为`0`，或`MONEY`是否大于`ITEMPRICE`。
如果购买判断失败，再次要求输入。
在eramaker中，购买失败时会从`@SHOW_SHOP`重新开始。

购买判断成功时，将`ITEM`编号赋值给`BOUGHT`变量，将`ITEM:BOUGHT`增加`1`，将`MONEY`减少`ITEMPRICE:BOUGHT`。
调用`@EVENTBUY`并返回`@SHOW_SHOP`。

只要不执行[`BEGIN`](../Reference/BEGIN.zh.md)指令，就不会离开`SHOP`。

## TRAIN
执行`BEGIN TRAIN`后。

![](../assets/images/train.gif)

首先初始化部分变量。
具体来说，将`0`赋值给`ASSIPLAY:0`，将`-1`赋值给`PREVCOM:0`、`NEXTCOM:0`。
此外将所有`TFLAG`设为`0`，将所有角色的`GOTJUELP`、`TEQUIP`、`EX`、`PALAM`、`SOURCE`全部设为0。
最后将所有角色的`STAIN:2`设为`2`，`STAIN:3`设为`1`，`STAIN:4`设为`8`，其他设为`0`。

离开`TRAIN`时不进行初始化，所以在`SHOP`中保存时，这些值会留在存档数据中。
通过在`@SAVEINFO`等中将角色的`GOTJUEL`、`TEQUIP`、`EX`、`PALAM`等设为`0`，可以节省存档数据的大小。
关于给`NEXTCOM`赋非负值时的动作存在严重的缺陷，因此这里不作说明。
Emuera的`NEXTCOM`是为了重现旧代码动作（包括前述缺陷）而实现的，不设想用于新用途。
关于`CALLTRAIN`指令请参考扩展指令。

调用`@SHOW_STATUS`后显示可执行的`TRAIN`。
对于已定义的`TRAINNAME`，寻找`@COM_ABLExx`。
搜索范围（图中的`MAX_TRAIN`）在Emuera中为`VariableSize.csv`中指定的TRAINNAME范围，eramaker中为`2147483647`。
如果未定义`@COM_ABLExx`或返回非0值，则可执行，显示`TRAINNAME`。
如果`@COM_ABLExx`返回`0`，则不可执行，不显示`TRAINNAME`。
此时记住是否可执行。（执行时不重新调用`@COM_ABLExx`。）

`TRAINNAME`显示完毕后调用`@SHOW_USERCOM`。
`@SHOW_USERCOM`后，在输入前初始化`UP`、`DOWN`、`LOSEBASE`。
之后要求输入。

将输入结果与前述`@COM_ABLExx`的结果对照，如果是可执行的命令，则调用对应的`@COMxx`。
首先，将`TRAIN`编号赋值给`SELECTCOM`变量，将所有角色的`NOWEX`的所有元素设为0。
接着调用`@EVENTCOM`，然后调用对应的`@COM`。
如果`@COM`返回非0值，则调用`@SOURCE_CHECK`、`@EVENTCOMEND`，返回`@SHOW_STATUS`。
`@SOURCE_CHECK`结束后，在调用`@EVENTCOMEND`前将所有角色的`SOURCE`的所有元素设为0。
`@SOURCE_CHECK`结束后，如果`@EVENTCOMEND`不存在或在`@EVENTCOMEND`中没有执行`WAIT`指令，则在`@SHOW_STATUS`前产生`WAIT`。
如果`@COM`返回`0`则返回`@SHOW_STATUS`。
另外，执行`UPCHECK`指令时，将`UP`和`DOWN`的值加减到`TARGET`的`PALAM`上，并将`UP`和`DOWN`的所有值设为`0`。
如果输入结果不是可执行的命令，则调用`@USERCOM`，返回`@SHOW_STATUS`。

只要不执行[`BEGIN`](../Reference/BEGIN.zh.md)指令，就不会离开`TRAIN`。

## ABLUP
执行`BEGIN ABLUP`后。

![](../assets/images/ablup.gif)

调用`@SHOW_JUEL`、`@SHOW_ABLUP_SELECT`，要求输入。

如果输入在`0～99`范围内，则寻找对应的`@ABLUP`。
如果定义了对应的`@ABLUP`则调用`@ABLUP`，返回`@SHOW_JUEL`。
如果没有定义，再次要求输入。
在eramaker中，如果没有定义则从`@SHOW_JUEL`重新开始。

如果输入超出`0～99`范围，则调用`@USERABLUP`，返回`@SHOW_JUEL`。
截至Emuera1.705，没有改变此范围的方法。

只要不执行[`BEGIN`](../Reference/BEGIN.zh.md)指令，就不会离开`ABLUP`。

## AFTERTRAIN
执行`BEGIN AFTERTRAIN`后。
如果在`@EVENTEND`中没有执行[`BEGIN`](../Reference/BEGIN.zh.md)指令，由于没有要执行的处理而错误终止。

![](../assets/images/aftertrain.gif)

## TURNEND
执行`BEGIN TURNEND`后。
如果在`@EVENTTURNEND`中没有执行[`BEGIN`](../Reference/BEGIN.zh.md)指令，由于没有要执行的处理而错误终止。

![](../assets/images/turnend.gif)

## LOADGAME
执行[`LOADGAME`](../Reference/SAVEGAME.zh.md)指令时。
[`BEGIN`](../Reference/BEGIN.zh.md)指令包含[`RETURN`](../Reference/RETURN.zh.md)指令，因此`[BEGIN]`以下的语句决不会执行，但[`LOADGAME`](../Reference/SAVEGAME.zh.md)和[`SAVEGAME`](../Reference/SAVEGAME.zh.md)指令与[`CALL`](../Reference/CALL.zh.md)指令一样会回到原来的位置。
不过，如果执行了LOAD，则会忘记原来的位置并转移到`LOADDATAEND`。

![](../assets/images/loadgame.gif)

## SAVEGAME
执行[`SAVEGAME`](../Reference/SAVEGAME.zh.md)指令时。
调用`@SAVEINFO`的时机是在实际写入前一刻。

![](../assets/images/savegame.gif)

## LOADDATAEND
在[`LOADGAME`](../Reference/SAVEGAME.zh.md)中执行LOAD后，以及执行`LOADDATA`指令后。
在执行LOAD时，调用中的函数等之前的状态全部被清除。

![](../assets/images/loaddataend1821.gif)

在eramaker中这里什么也不做，转移到`@SHOW_SHOP`。
在Emuera中，如果定义了`@SYSTEM_LOADEND`则执行`@SYSTEM_LOADEND`。
直到`@SYSTEM_LOADEND`结束前如果执行了[`BEGIN`](../Reference/BEGIN.zh.md)指令，则转移到那里。
否则如果定义了`@EVENTLOAD`则执行`@EVENTLOAD`。

直到`@EVENTLOAD`结束前如果执行了[`BEGIN`](../Reference/BEGIN.zh.md)指令，则转移到那里。
如果没有执行[`BEGIN`](../Reference/BEGIN.zh.md)指令，则照常转移到`@SHOW_SHOP`。

## 错误处理流程（SK 专属）

### THROW 异常处理

当执行 `THROW` 指令时，引擎会检查是否定义了 `@BEFORE_THROW` 事件函数：

```
THROW 指令执行
    │
    ├─ 检查是否已在 @BEFORE_THROW 中（防止递归）
    │   ├─ 是 → 直接打印消息并退出
    │   │
    │   └─ 否 → 检查是否定义了 @BEFORE_THROW
    │           ├─ 是 → 延迟抛出，调用 @BEFORE_THROW
    │           │       → @BEFORE_THROW 结束后抛出异常
    │           │
    │           └─ 否 → 直接抛出异常
```

### 通用错误处理

当发生任何未捕获的错误时（包括运行时错误、脚本错误等），引擎会检查是否定义了 `@BEFORE_ERROR` 事件函数：

```
错误发生
    │
    ├─ 检查是否已在 @BEFORE_ERROR 中（防止递归）
    │   ├─ 是 → 直接处理错误并退出
    │   │
    │   └─ 否 → 检查是否定义了 @BEFORE_ERROR
    │           ├─ 是 → 延迟处理，调用 @BEFORE_ERROR
    │           │       → @BEFORE_ERROR 结束后处理错误
    │           │
    │           └─ 否 → 直接处理错误
```

> **SK 专属说明**：`BEFORE_THROW` 和 `BEFORE_ERROR` 事件函数是 Skia 版本新增的功能，允许脚本在异常抛出前进行拦截和处理。原版 Emuera 不支持这些事件。
> 详见[事件函数 — BEFORE_THROW / BEFORE_ERROR](../tutorial/event-functions.zh.md#before_throw)。