# 游戏系统函数与流程

本页面记载的是 eramaker 的信息，与现行的 Emuera 规格存在部分差异。

## 基本信息

### 启动 eramaker

!!! note "标题画面"

    - 在 eramaker 中，启动游戏后会显示标题画面，提供「从最初开始」和「读取后开始」两个选项。选择「从最初开始」后，会调用 ERB 文件中的 `EVENTFIRST` 函数。
    - `EVENTFIRST` 执行完毕后，游戏就会停止。因此需要使用 `BEGIN` 调用 `SHOP` 或 `TRAIN` 等阶段。
    - 请查看示例游戏 SYSTEM.ERB 的开头部分。

### SHOP

!!! note "进入商店"

    - 进入 `SHOP` 时，会调用 `@EVENTSHOP` 函数（如果存在）。这是事件函数。
    - 之后会调用 `@SHOW_SHOP` 函数。请在此处显示日期、调教中角色等基本信息，使用 `PRINT_SHOPITEM` 显示商品，以及保存、加载等特殊操作。

!!! note "商店中的命令选择"

    - 选择 `0` 到 `99` 之间的数字表示购买物品。选择其他数字则调用 `@USERSHOP` 函数。所选数字存储在 `RESULT` 中，请进行相应处理。
    - 两者的具体实现都可以通过查看示例游戏的 SHOP.ERB 来理解。

!!! note "购买"

    - 购买物品后，会调用 `@EVENTBUY` 函数（如果存在）。这是事件函数。
    （例如，可以在此处理"所购物品从商店列表中移除"等逻辑）

### TRAIN

!!! note "进入调教"

    - 进入 `TRAIN` 时，会调用 `@EVENTTRAIN` 函数（如果存在）。这是事件函数。
    - 之后会调用 `@SHOW_STATUS` 函数。请在此处显示日期、调教中角色等基本信息，以及使用 `PRINT_PALAM` 显示调教中的参数。
    - 接着会自动显示可执行的命令。对于每个命令都会调用 `@COM_ABLExx`，如果返回 `1` 则表示可执行。另外，如果对应的 `@COM_ABLExx` 不存在也表示可执行。具体可查看示例游戏的 COMABLE.ERB。
    - 此外还会调用 `@SHOW_USERCOM` 函数。请在此处显示调教结束等特殊命令。
    - 两者的具体实现都可以通过查看示例游戏的 SYSTEM.ERB 和 INFO.ERB 来理解。

!!! note "调教中的命令选择"

    - 玩家选择命令后，首先调用 `@EVENTCOM` 函数（如果存在）。这是事件函数。
    - 然后调用所选命令对应的函数。例如选择了「正常位」，且在 TRAIN.CSV 中「正常位」的命令编号为 `20`，则会调用 `@COM20`。
    - 对于「口交」等命令，可能会因为角色能力不足而无法执行。这种情况下，在 `@COMxx` 中途调用 `RETURN 0`，则不会执行命令，返回命令选择画面。
    - 命令执行成功时，从 `@COMxx` 调用 `RETURN 1`，然后调用 `@SOURCE_CHECK` 函数。在此处理调教结果反映到调教参数中。
    - 具体可查看示例游戏的 COMxx.ERB 和 SOURCE.ERB。

!!! note "调教命令选择结束"

    - 最后调用 `@EVENTCOMEND` 函数（如果存在）。这是事件函数。
    - 执行命令的角色台词等可以在此处处理。具体可查看示例游戏 era light 的 CKOJOxx.ERB。

!!! note "用户命令"

    - 如果所选命令没有对应的 `@COMxx`，则调用 `@USERCOM`。`RESULT` 中存储了所选数字，请进行相应处理。
    - 具体可查看示例游戏的 SYSTEM.ERB。

### AFTERTRAIN

!!! note "调教结束时"

    - 进入 `AFTERTRAIN` 时，会调用 `@EVENTEND` 函数（如果存在）。这是事件函数。
    - 调教结束时角色的台词（也许可以叫做"最后的话"？）可以在此处处理。此外，调教获得的宝石的计算等也应当在此处进行。具体可查看示例游戏的 AFTERTRA.ERB。

### ABLUP

!!! note "能力提升显示"

    - 首先调用 `@SHOW_JUEL` 函数。请显示所持有的宝石。
    - 然后调用 `@SHOW_ABLUP_SELECT` 函数。请显示能力列表、结束命令等。
    - 具体可查看示例游戏的 ABL.ERB。

!!! note "能力提升的命令选择"

    - 玩家选择命令后，调用所选命令对应的函数。例如选择了「C感觉」`[3]`，则会调用 `@ABLUP3`。
    - 如果所选命令没有对应的 `@ABLUPxx`，则调用 `@USERABLUP`。`RESULT` 中存储了所选编号，请进行相应处理。
    - 具体可查看示例游戏的 ABLUPxx.ERB 和 ABL.ERB。

### TURNEND

!!! note "回合结束时"

    - 调用 `@EVENTTURNEND` 函数（如果存在）。这是事件函数。
    - 可以处理时间推进、体力恢复等逻辑。
    - 请注意，如果没有 `@EVENTTURNEND` 游戏会停止。具体可查看示例游戏的 SYSTEM.ERB。

### 事件函数

!!! note "关于事件函数"

    - 事件函数是在游戏中的特定时机必定被调用的函数。在命令执行完毕后、调教开始时等时机被调用。
    - 事件函数在显示角色台词时非常方便。如果直接在 `@COMxx` 等函数中写入显示台词的命令，之后会变得难以理解，但使用事件函数可以分离管理。
    - 事件函数的性质决定了，即使存在多个同名函数也无妨。

    **例**

        ;执行正常位结束时的台词
        @EVENTCOMEND
        ;20 为正常位，如果非 20 则忽略
        SIF SELECTCOM != 20
            RETURN 0
        ;如果 FLAG:1000 非 0 则忽略
        SIF FLAG:1000
            RETURN 0
        PRINTW 「不……不行啊……！」
        ;设置 FLAG，一旦显示过则之后不再显示
        FLAG:1000 = 1
        RETURN 1

        ;执行背后位结束时的台词
        @EVENTCOMEND
        ;21 为背后位，如果非 21 则忽略
        SIF SELECTCOM != 21
            RETURN 0
        ;如果 FLAG:1001 非 0 则忽略
        SIF FLAG:1001
            RETURN 0
        PRINTW 「居然是这样的姿势……」
        ;设置 FLAG，一旦显示过则之后不再显示
        FLAG:1001 = 1
        RETURN 1

    - 可以给事件函数赋予「性质」。
    - 赋予 `#SINGLE` 性质后，如果以 `RETURN 1` 结束，则即使存在同名函数也不再执行。在角色一次触发多个台词不自然的情况下很有效。
    - 赋予 `#PRI` 性质后，会优先于其他同名函数执行。死亡检查等无论如何都必须先处理的逻辑很适合使用此性质。
    - 赋予 `#LATER` 性质后，会在其他同名函数之后执行。「一天结束了」等无论如何都必须最后处理的显示很适合使用此性质。

    **例**

        @EVENTTURNEND
        #SINGLE
        SIF FLAG:1000
            RETURN 0
        FLAG:1000 = 1
        PRINTW 「不想再做了……」
        RETURN 1

        @EVENTTURNEND
        #SINGLE
        SIF FLAG:1001
            RETURN 0
        FLAG:1001 = 1
        PRINTW 「让我回家……」
        RETURN 1

        @EVENTTURNEND
        #SINGLE
        SIF FLAG:1002
            RETURN 0
        FLAG:1002 = 1
        PRINTW 「我想出去……」
        RETURN 1

        @EVENTTURNEND
        #LATER
        PRINTW 一天结束了……
        RETURN 1

    （上面三个台词一次只能显示一个。「一天结束了……」因为标记了 `#LATER`，所以直到 FLAG:1000、FLAG:1001、FLAG:1002 变为 1 之前都不会显示）
