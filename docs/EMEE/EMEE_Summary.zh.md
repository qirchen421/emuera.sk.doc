---
---

# Emuera EM+EE 功能概览

## 常规

### ![](../assets/images/IconEM.webp)解除原本的常时资源占用

!!! summary ""

    在程序运行过程中，不再持续占用资源（`Resource`）文件夹中的图像文件。

### ![](../assets/images/IconEE.webp)支持播放音频文件

!!! summary ""

    在与 Emuera 同路径的 sound 文件夹里放入音频文件即可使用。
    更多详情请参照后文 `PLAYSOUND` 等命令的详细说明。

### ![](../assets/images/IconEM.webp)支持使用 `WebP` 格式的图像文件

!!! summary ""

    参考 `Emuera1824+v11+webp+Secure` 支持 WebP 格式图片；从 `EMv6+EEv13` 版本开始使用另一个 WebP 支持库。

### ![](../assets/images/IconEE.webp)附带 `Emuera-Anchor` 版本

!!! summary ""

    附带的 `Emuera-Anchor` 是 era 英语圈使用的 Emuera。
    UI 菜单栏 / 设置项 / 报错信息等为英文，请根据实际需要选择使用。

### ![](../assets/images/IconEE.webp)`Emuera-Anchor` 的键盘按键扩展机能的移植
!!! summary ""

    Emuera-Anchor 的键盘按键扩展机能的移植。用 `Ctrl+T` 返回标题画面、`Ctrl+R` 重启、`Ctrl+O` 重新读取 ERB 文件

### ![](../assets/images/IconEE.webp)按键宏文件以UTF-8保存
!!! summary ""

    使按键宏文件得以支持其它语言
### ![](../assets/images/IconEM.webp)存档保存时进行压缩
!!! summary ""

    可以在设置界面或者`emuera.config`中进行设置

    * 该功能只有在「[セーブデータをバイナリ形式で保存する](https://osdn.net/projects/emuera/wiki/config#h5-.E3.82.BB.E3.83.BC.E3.83.96.E3.83.87.E3.83.BC.E3.82.BF.E3.82.92.E3.83.90.E3.82.A4.E3.83.8A.E3.83.AA.E5.BD.A2.E5.BC.8F.E3.81.A7.E4.BF.9D.E5.AD.98.E3.81.99.E3.82.8B)」为 `YES` 时有效

!!! example "示例代码"
    ``` title="emuera.config"
    セーブデータを圧縮して保存する:YES
    ```

!!! warning "注意"

    开启压缩功能的存档不兼容旧版本及本家版的 Emuera.exe。

### ![](../assets/images/IconEM.webp)Emuera 图标设置功能
!!! summary ""

    可使用 `emuera.config` 中的设置项进行设定

    请在设置项 `Emueraのアイコンのパス` 处输入图标图像的地址。地址为 `Emuera.exe` 的同级或子级地址。

    只有标题栏和任务栏的图标会发生变化（`Emuera.exe` 的图标不会改变）。

### ![](../assets/images/IconEE.webp)`Emuera-Anchor` 的剪贴板功能的移植
!!! summary ""

    添加了自动将 `Emuera` 的显示文字复制到剪贴板的功能。可在設定→剪贴板处设置。

## 常量 / 变量

### ![](../assets/images/IconEE.webp)使用 `CSV` 文件 / `ERD` 文件来调用 `ERH` 文件中定义的数组变量

!!! summary ""

    读取方式类似在 `ERH` 文件中定义变量，并且可以像现在的 `CSV` 用法那样给数组命名。
    
    `CSV` 文件夹下为 `变量名.CSV`，`ERB` 文件夹下为 `变量名.ERD`，调用语法仍与 CSV 变量相同。即使同一个变量存在多个设置文件，只有在定义了相同标识符的情况下，启动时会抛出错位并终止运行。不同标识符可以替换为同一个整数。

    另外，需要为多维数组命名时，在对应的文件名之后加上 `@` 和对应维度的数字，维度从左至右依次为 `1`、`2`、`3`。

!!! example "例"

    ``` { #language-csv title="ERH.ERH" }
    #DIM HOGE, 3
    #DIM HOGE2D, 3, 3
    #DIM HOGE3D, 3, 3, 3
    ```


    ``` title="ERBフォルダ"
    HOGE.ERD
    HOGE2D@1.ERD
    HOGE2D@2.ERD
    HOGE3D@1.ERD
    HOGE3D@2.ERD
    HOGE3D@3.ERD
    ```
    
### ![](../assets/images/Iconetc.webp)别名（`Alias`）功能追加 {#alias}

Neo_Kesha 氏新增

!!! summary ""

    可以为 `Talent`、`Abl` 等变量指定多个标识符。  
    通过扩展名 `.als` 文件来指定。

!!! info "Talent.csv"
    ```
    0, Talent1
    1, Talent2
    2, Talent3
    ```

!!! info "Talent.als"
    ```
    1, Talent2Alias
    0, MyCoolTalent
    2, Talent3Alias
    ```

!!! info "ERB 中的行为"
    ``` { #language-erbapi }
    TALENT:0:Talent1 = 15
    PRINT TALENT:0:MyCoolTalent ; 显示「15」
    TALENT:0:MyCoolTalent = 420
    PRINT TALENT:0:Talent1 ; 显示「420」
    ```

### ![](../assets/images/IconEE.webp)在 `VariableSize.csv` 中设置禁用 `COUNT` 变量
!!! summary ""

    通过加入 `COUNT,-1` 行来禁用 `COUNT` 。若如此做，`REPEAT` 所在的行会在启动时弹出经过、并在运行时报错终止。

### ![](../assets/images/IconEE.webp)通过 CSV 来配置 `DAY`，`TIME`，`MONEY`
!!! summary ""

    可用 `DAY.csv`，`TIME.csv`，`MONEY.csv` 来像其它 CSV 一样配置数值与名称转换，并应用于 `DAYNAME`，`TIMENAME`，`MONEYNAME` 变量

### ![](../assets/images/IconEM.webp)将`XML`、`MAP`、`DataTable` 数据保存进存档文件
!!! summary ""

    可以利用CSV文件夹内的 `VarExt*.csv` 文件来设定需要保存的 [`XML`](../Reference/XML_MANAGE.md)、[`MAP`](../Reference/MAP_MANAGE.md)、[`DataTable`](../Reference/DT_MANAGE.md) 的 ID。

    * 该功能只有在「[セーブデータをバイナリ形式で保存する](https://osdn.net/projects/emuera/wiki/config#h5-.E3.82.BB.E3.83.BC.E3.83.96.E3.83.87.E3.83.BC.E3.82.BF.E3.82.92.E3.83.90.E3.82.A4.E3.83.8A.E3.83.AA.E5.BD.A2.E5.BC.8F.E3.81.A7.E4.BF.9D.E5.AD.98.E3.81.99.E3.82.8B)」为 `YES` 时有效
    * 即使设定了 ID，若内存中不存在该数据则不会保存进存档文件。
    * 存档中保存的数据的 ID 没有在 CSV 中设定时会被丢弃。
    * 存档与旧版本及本家版的 Emuera.exe 兼容。

!!! example "示例代码"

    ``` { #language-csv title="VarExtSample.CSV" }
    ; 设置希望保存在global.sav中的MAP, XmlDocument, DataTable的ID。一行可以设置多个。
    ; 也可用多行，多个文件(例如VarExt1.csv, VarExt2.csv, VarExt3.csv等)来进行设定。
    GLOBAL_MAPS, MyMap, MyMap2
    GLOBAL_MAPS, MyMap3
    GLOBAL_XMLS, 0, MyXml
    GLOBAL_DTS, db
    ; 设置希望保存在save*.sav中的MAP, XmlDocument, DataTable的ID。
    SAVE_MAPS, MyMap4
    SAVE_XMLS, 1, MyXml2
    SAVE_DTS, mydb1
    ; 与有GLOBAL标记的变量类似，RESETDATA时不变，RESETGLOBAL时被删除
    STATIC_MAPS, MyMap5
    STATIC_XMLS, 1, MyXml3
    STATIC_DTS, db2
    ```

!!! warning "注意"

    CSV文件所设置的 ID 的前后空格将被删除。

## 改变了标准库的命令 / 行内函数

### ![](../assets/images/IconEM.webp)`HTML_PRINT` 相关更改

!!! summary ""

    - `HTML_PRINT` 的 `<space>` 标签可以给 `param` 属性指定负数值。
    - `HTML_PRINT` 添加 `<clearbutton>` 标签。`<clearbutton>` 标签包围的内容不会被按钮化（`title`、`pos`属性的功能仍然有效）
        - 属性`notooltip`为`true`时，同时将按钮的`title`属性无效化
    - 在设置 `HTML_PRINT` 的 `<img>`、`<shape>` 的标签属性 `width`、`height`、`ypos`、`param` 时，在数值后添加 `px`（不区分大小写）则使数值被识别为像素数而不是字体大小的百分比。
    - `HTML_PRINT` 添加 `<div>` 标签。能够将 `<div>` 包围的内容将显示到指定范围的区域。`<div>` 不支持嵌套。可以与其它标签同时使用。
        - `width` 属性：子区域的宽度。像 `<img>`、`<shape>` 标签一样タグ可以用 `px` 和字体大小的百分比来设定。
        - `height` 属性：子区域的高度。像 `<img>`、`<shape>` 标签一样タグ可以用 `px` 和字体大小的百分比来设定。
        - `xpos` 属性：子区域的高度距离当前位置的水平方向距离。可省略。负数左移，正数右移。像 `<img>`、`<shape>` 标签一样タグ可以用 `px` 和字体大小的百分比来设定。
        - `ypos` 属性：子区域的高度距离当前位置的垂直方向距离。可省略。负数上移，正数下移。像 `<img>`、`<shape>` 标签一样タグ可以用 `px` 和字体大小的百分比来设定。
        - `size` 属性：`width` 与 `height` 的简略写法。格式：`size='width,height'`。
        - `rect` 属性：`xpos`、`ypos`、`width` 与 `height` 的简略写法。格式：`rect='xpos,ypos,width,height'`。
        - `depth` 属性：子区域的深度。可省略。负数向视线反方向移动，正数向视线同方向移动。
        - `color` 属性：子区域的背景色。可省略。格式与 `<font>` 标签的 `color` 属性相同。
        - `display` 属性：子区域的渲染方式。可省略。
            - `relative`（默认值）：渲染在当前文字的现在位置。
            - `absolute`：渲染在窗口的固定位置，滚动鼠标滚轮也不会移动。原点 `(0, 0)` 为窗口左下，`ypos` 上方向为正。
        - `margin` 属性：子区域的外边距。可省略。
            - `margin='all'`：`all` 指定全部四条边。`px`、字体大小百分比均有效。
            - `margin='leftRight,topBottom'`：`leftRight`指定上下、`leftRight`指定左右。`px`、字体大小百分比均有效。
            - `margin='top,leftRight,bottom'`：`top`指定上、`leftRight`指定左右、`bottom`指定下。`px`、字体大小百分比均有效。
            - `margin='top,right,bottom,left'`：`top`指定上、`right`指定右、`bottom`指定下、`left`指定左。`px`、字体大小百分比均有效。
        - `padding` 属性：子区域的内边距。可省略。格式与 `margin` 属性相同。
        - `border` 属性：子区域的边框宽度。可省略。格式与 `margin` 属性相同。
        - `bcolor` 属性：子区域的边框颜色。可省略。格式与 `margin` 属性相似，颜色格式与 `<font>` 标签的 `color` 属性相同。
        - `radius` 属性：子区域的边框圆角（半径）。可省略。
            - `radius='all'`：`all`指定全四角。`px`、字体大小百分比均有效。
            - `radius='ltRb,rtLb'`：`ltRb`指定左上和右下、`rtLb`右上和左下。`px`、字体大小百分比均有效。
            - `radius='lt,rtLb,rb'`：`lt`指定左上、`rtLb`指定右上和左下、`rb`指定右下。`px`、字体大小百分比均有效。
            - `radius='lt,rt,rb,lb'`：`lt`指定左上、`rt`指定右上、`rb`指定右下、`lb`指定左下。`px`、字体大小百分比均有效。
    - 现在图像、`div` 之类的超过行高度的内容即使所在行移出画面也能正常显示了。
    - `HTML_PRINT` 的 `<img>` 标签添加 `srcm` 属性。与 CBG 系列的按钮映射图像相似。执行 [INPUT 系列命令的扩展模式](#input)或 `INPUTMOUSEKEY` 命令时，将鼠标正下方的按钮映射图像颜色（RGB部分）赋值到 `RESULT:3`（`INPUTMOUSEKEY` 时赋值到 `RESULT:6`）。
    - `HTML_PRINT` 添加第二参数（整型）。第二参数不为 `0`（默认值）时，不会发生强制换行。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    
        HTML_PRINT "文<shape type='space' param='-100'>字"
        HTML_PRINT "<clearbutton><button value='1' title='ツールチップ1'>[1] 確定</button></clearbutton>"
        HTML_PRINT "<clearbutton notooltip='true'><button value='2' title='ツールチップ2'>[2] 戻る</button></clearbutton>"
        HTML_PRINT "<shape type='rect' param='0,0,200px,100'>"
        HTML_PRINT "<img src='button_normal' srcb='button_hover' srcm='button_mask'>"
        HTML_PRINT "<div ypos='-5px' xpos='-180px' width='80px' height='80px' color='#503030' depth='-1'><button value='3'>[3] ボタン3</button></div>"

        ONEINPUT
    ```

### ![](../assets/images/IconEM.webp)与 `HTML_PRINT` 有关的 `PRINT` 系列命令的更改

!!! summary ""
    - 为 `PRINT_IMG` 添加了多个参数0（可省略）和3个新的调用形式
    - 可在 `PRINT_IMG`, `PRINT_RECT`, `PRINT_SPACE` 的整型参数后添加关键字 `px`（不区分大小写）
!!! info "API"

    ``` { #language-erbapi }
    PRINT_IMG src
    PRINT_IMG src, width, height, ypos
    PRINT_IMG src, srcb, width, height, ypos
    PRINT_IMG src, srcb, srcm, width, height, ypos
    ```
    与 `HTML_PRINT` 命令的 `<img>` 标签相同
!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    
        PRINT_IMG "Normal", "Hover", (500+A) px, 100
        PRINT_SPACE 200 px

        ONEINPUT
    ```
### ![](../assets/images/IconEM.webp)`INPUT` 系列命令支持接收鼠标点击事件

!!! summary ""

    `INPUT`, `INPUTS`, `ONEINPUT`, `ONEINPUTS` 新增第二个参数（整数类型，可省略，默认为 `0`）。
    `TINPUT`, `TINPUTS`, `TONEINPUT`, `TONEINPUTS` 新增第五个参数（整数类型，可省略，默认为 `0`）。
    当新增的参数 `== 0`（或直接省略）的时候，行为与本家版 Emuera 相同。
    当新增的参数 `!= 0` 时将鼠标点击视为回车键。此时自动将 `RESULTS`（`RESULTS:0` 的简写）设置为空字符串；
    鼠标按下时将 `RESULTS:1` 设置为按下的鼠标按键，左键为 `1`，右键为 `2`；
    除此之外，同时按下 ++shift++ / ++ctrl++ / ++alt++ 时，将 `RESULT:2` 设置为组合键的键位（bit `16` `17` `18`）。

### ![](../assets/images/IconEM.webp)`ONEINPUT` 系列命令的默认值允许指定为 2 位 / 2 字符以上

!!! summary ""

    `ONEINPUT` / `ONEINPUTS` / `TONEINPUT` / `TONEINPUTS` 的默认值允许指定为 2 位 / 2 字符以上。

### ![](../assets/images/IconEM.webp)`LOADTEXT` / `SAVETEXT` 允许指定文件名（以及路径）

!!! summary ""

    `LOADTEXT` / `SAVETEXT` 第一个参数为字符串时，以此为路径加载 / 保存文件。
    指定的路径必须为 `Emuera.exe` 同级的相对路径（试图使用 `..` 回到更上级的目录是无效的）。此外，只允许使用设置界面或者 `emuera.config` 中配置的 `LOADTEXTとSAVETEXTで使える拡張子` 里包含的扩展名（默认只有 `txt`）。

!!! example "示例代码"

    ``` title="emuera.config"
    LOADTEXTとSAVETEXTで使える拡張子:txt,xml,json
    ```
### ![](../assets/images/IconEM.webp)`REPLACE` 的功能扩充
!!! summary ""

    `REPLACE` 的第三个参数为字符串数组变量，第四个参数为 `0` 以外的值时，依次将与第二个参数相同的部分用字符串数组的内容替换，并返回替换后的结果。
    
!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    #DIMS str = "pen", "apple"
    #DIMS orig = "I have a {1}, I have an {2}, ..."

    PRINTSL REPLACE(orig, "\\{\\d+\\}", str, 1)

    ONEINPUT
    ```
    ``` title="输出结果"
    I have a pen, I have an apple, ...
    ```
### ![](../assets/images/IconEE.webp)`INPUTMOUSEKEY` 支持直接获取按钮的值

!!! summary ""

    当命令执行时若 `RESULT:0 == 1`（鼠标点击事件），被点击的按钮的值同时也会保存到 `RESULT:5`。

### ![](../assets/images/IconEE.webp)`OUTPUTLOG` 支持自定义输出日志的文件名

!!! summary ""

    使用 `OUTPUTLOG` 的字符串参数（格式同 `PRINTS`）来指定输出日志的文件名（包括扩展名和路径）。
    `v5fix` 修复了可以访问上级目录的安全性漏洞，现在只允许指定同级以及下级子目录。

### ![](../assets/images/IconEE.webp)`GSETFONT` 支持设置字体样式

!!! summary ""

    第四个参数类似 `SETFONT` 的 4 bit 参数用法：1=**粗体** 2=_斜体_ 4=<s>删除线</s> 8=<u>下划线</u>；可省略。

### ![](../assets/images/IconEE.webp)`GETNUM`的`ERD`支持
!!! summary ""

    `GETNUM` 现在也支持 ERD 功能，追加了可省略的第3参数。第3参数用来指定数组维度，从左到右依次为 1, 2, 3 (注意这与行内函数 `VARSIZE` 的指定行为不同)
    另外，追加了 `VARSIZE` 使用与 ERD 相同的维度指定方式的配置选项。

### ![](../assets/images/IconEE.webp)`GCLEAR` 支持用指定颜色替换指定区域
!!! summary ""

    添加了函数形式2，第三至第六个参数可以指定目标区域的X、Y、宽、高了。

!!! info "API"
    ``` { #language-erbapi }
    1. GCLEAR GID, cARGB
    2. GCLEAR GID, cARGB, x, y, width, height
    ```

## 新增的命令 / 行内函数

### HTML 系列

| 函数名                                                                   | 参数              | 返回值   |
| :----------------------------------------------------------------------- | :---------------- | :------- |
| ![](../assets/images/IconEM.webp)[`HTML_STRINGLEN`](../Reference/HTML_STRINGLEN.md) | `string`(, `int`) | `int`    |
| ![](../assets/images/IconEM.webp)[`HTML_SUBSTRING`](../Reference/HTML_SUBSTRING.md) | `string`, `int`   | `string` |

### 字符串操作 / 引用

| 函数名                                                             | 参数                                              | 返回值 |
| :----------------------------------------------------------------- | :------------------------------------------------ | :----- |
| ![](../assets/images/IconEM.webp)[`REGEXPMATCH`](../Reference/REGEXPMATCH.md) | `string`, `string`(, `int`)                       | `int`  |
|                                                                    | `string`, `string`, `ref` `int`, `ref` `string[]` | `int`  |

### 变量操作 / 变量引用 / CSV 引用

| 函数名                                                                   | 参数                                          | 返回值   |
| :----------------------------------------------------------------------- | :-------------------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`ISDEFINED`](../Reference/ISDEFINED.md)           | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`EXISTVAR`](../Reference/EXISTVAR.md)             | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCBEGINSWITH`](../Reference/ENUMFUNC.md)   | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCENDSWITH`](../Reference/ENUMFUNC.md)     | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCWITH`](../Reference/ENUMFUNC.md)         | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMVARBEGINSWITH`](../Reference/ENUMVAR.md)     | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMVARENDSWITH`](../Reference/ENUMVAR.md)       | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMVARWITH`](../Reference/ENUMVAR.md)           | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMMACROBEGINSWITH`](../Reference/ENUMMACRO.md) | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMMACROENDSWITH`](../Reference/ENUMMACRO.md)   | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMMACROWITH`](../Reference/ENUMMACRO.md)       | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`GETVAR`](../Reference/GETSETVAR.md)              | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`GETVARS`](../Reference/GETSETVAR.md)             | `string`                                      | `string` |
| ![](../assets/images/IconEM.webp)[`SETVAR`](../Reference/GETSETVAR.md)              | `string`, `any`                               | `1`      |
| ![](../assets/images/IconEM.webp)[`VARSETEX`](../Reference/VARSETEX.md)             | `string`, `any`(, `int`, `int`, `int`)        | `1`      |
| ![](../assets/images/IconEM.webp)[`ARRAYMSORTEX`](../Reference/ARRAYMSORTEX.md)     | `string`, `ref` `string[]`(, `int`, `int`)    | `1`      |
|                                                                          | `ref` `int`, `ref` `string[]`(, `int`, `int`) | `1`      |
| ![](../assets/images/IconEE.webp)[`ERDNAME`](../Reference/ERDNAME.md)               | `variable`, `int`(, `int`)                    | `string` |

### 输入 / 等待

| 函数名                                                       | 参数 | 返回值           |
| :----------------------------------------------------------- | :--- | :--------------- |
| ![](../assets/images/IconEE.webp)[`INPUTANY`](../Reference/INPUTANY.md) | 无   | `int` / `string` |

### 调试辅助 / 系统流程控制

| 函数名                                                                                   | 参数         |
| :--------------------------------------------------------------------------------------- | :----------- |
| ![](../assets/images/IconEE.webp)[`QUIT_AND_RESTART`](../Reference/QUIT_AND_RESTART.md)             | 无           |
| ![](../assets/images/IconEE.webp)[`FORCE_QUIT`](../Reference/FORCE_QUIT.md)                         | 无           |
| ![](../assets/images/IconEE.webp)[`FORCE_QUIT_AND_RESTART`](../Reference/FORCE_QUIT_AND_RESTART.md) | 无           |
| ![](../assets/images/IconEE.webp)[`FORCE_BEGIN`](../Reference/FORCE_BEGIN.md)                       | `identifier` |

### 提示框处理相关

| 函数名                                                                 | 参数           |
| :------------------------------------------------------------------------------- | :------- |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_CUSTOM`](../Reference/TOOLTIP_EXTENSION.md)      | `int`    |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_SETFONT`](../Reference/TOOLTIP_EXTENSION.md)     | `string` |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_SETFONTSIZE`](../Reference/TOOLTIP_EXTENSION.md) | `int`    |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_FORMAT`](../Reference/TOOLTIP_EXTENSION.md)      | `int`    |

### 函数系列（`CALL` 相关）

| 函数名                                                                 | 参数           |
| :--------------------------------------------------------------------- | :------------- |
| ![](../assets/images/IconEE.webp)[`EXISTFUNCTION`](../Reference/EXISTFUNCTION.md) | `string`       |
| ![](../assets/images/IconEE.webp)[`TRYCALLF`](../Reference/TRYCALLF.md)           | `string`       |
| ![](../assets/images/IconEE.webp)[`TRYCALLFORMF`](../Reference/TRYCALLFORMF.md)   | `formedString` |

### 图像处理相关

| 函数名                                                                       | 参数                                | 返回值 |
| :--------------------------------------------------------------------------- | :---------------------------------- | :----- |
| ![](../assets/images/IconEE.webp)[`GDRAWTEXT`](../Reference/GDRAWTEXT.md)               | `int`, `string`(, `int`, `int`)     | `int`  |
| ![](../assets/images/IconEE.webp)[`GGETFONT`](../Reference/GGETFONT.md)                 | `int`                               | `int`  |
| ![](../assets/images/IconEE.webp)[`GGETFONTSIZE`](../Reference/GGETFONTSIZE.md)         | `int`                               | `int`  |
| ![](../assets/images/IconEE.webp)[`GGETFONTSTYLE`](../Reference/GGETFONTSTYLE.md)       | `int`                               | `int`  |
| ![](../assets/images/IconEE.webp)[`GGETTEXTSIZE`](../Reference/GGETTEXTSIZE.md)         | `string`, `string`, `int`(, `int`)  | `int`  |
| ![](../assets/images/IconEE.webp)[`GDRAWGWITHROTATE`](../Reference/GDRAWGWITHROTATE.md) | `int`, `int`, `int`(, `int`, `int`) | `int`  |
| ![](../assets/images/IconEE.webp)[`GGETPEN`](../Reference/GGETPEN.md)                   | `int`                               | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETPENWIDTH`](../Reference/GGETPENWIDTH.md)         | `int`                               | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETBRUSH`](../Reference/GGETBRUSH.md)               | `int`                               | `int`    |

### 音频处理相关

| 函数名                                                                   | 参数     | 返回值 |
| :----------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEE.webp)[`PLAYSOUND`](../Reference/PLAYSOUND.md)           | `string` | 无     |
| ![](../assets/images/IconEE.webp)[`STOPSOUND`](../Reference/STOPSOUND.md)           | 无       | 无     |
| ![](../assets/images/IconEE.webp)[`PLAYBGM`](../Reference/PLAYBGM.md)               | `string` | 无     |
| ![](../assets/images/IconEE.webp)[`STOPBGM`](../Reference/STOPBGM.md)               | 无       | 无     |
| ![](../assets/images/IconEE.webp)[`EXISTSOUND`](../Reference/EXISTSOUND.md)         | `string` | `int`  |
| ![](../assets/images/IconEE.webp)[`SETSOUNDVOLUME`](../Reference/SETSOUNDVOLUME.md) | `int`    | 无     |
| ![](../assets/images/IconEE.webp)[`SETBGMVOLUME`](../Reference/SETBGMVOLUME.md)     | `int`    | 无     |

### XML 文件处理相关

| 函数名                                                                                    | 参数                                                         | 返回值   |
| :---------------------------------------------------------------------------------------- | :----------------------------------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`XML_DOCUMENT`](../Reference/XML_MANAGE.md)                        | `any`, `string`                                              | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_RELEASE`](../Reference/XML_MANAGE.md)                         | `any`                                                        | `1`      |
| ![](../assets/images/IconEM.webp)[`XML_EXIST`](../Reference/XML_MANAGE.md)                           | `any`                                                        | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_GET`](../Reference/XML_GET.md)                                | `any`, `string`(, `int`, `int`)                              | `int`    |
|                                                                                           | `any`, `string`, `ref` `string[]`(, `int`)                   | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_GET_BYNAME`](../Reference/XML_GET.md)                         | `string`, `string`(, `int`, `int`)                           | `int`    |
|                                                                                           | `string`, `string`, `ref` `string[]`(, `int`)                | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_SET`](../Reference/XML_SET.md)                                | `int`, `string`, `string`(, `int`, `int`)                    | `int`    |
|                                                                                           | `ref` `string`, `string`, `string`(, `int`, `int`)           | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_SET_BYNAME`](../Reference/XML_SET.md)                         | `string`, `string`, `string`(, `int`, `int`)                 | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_TOSTR`](../Reference/XML_TOSTR.md)                            | `int`                                                        | `string` |
| ![](../assets/images/IconEM.webp)[`XML_ADDNODE`](../Reference/XML_ADDNODE.md)                        | `int`, `string`, `string`(, `int`, `int`)                    | `int`    |
|                                                                                           | `ref` `string`, `string`, `string`(, `int`, `int`)           | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_ADDNODE_BYNAME`](../Reference/XML_ADDNODE.md)                 | `string`, `string`, `string`(, `int`, `int`)                 | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVENODE`](../Reference/XML_REMOVENODE.md)                  | `int`, `string`(, `int`)                                     | `int`    |
|                                                                                           | `ref` `string`, `string`(, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVENODE_BYNAME`](../Reference/XML_REMOVENODE.md)           | `string`, `string`(, `int`)                                  | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REPLACE`](../Reference/XML_REPLACE.md)                        | `int`, `string`                                              | `int`    |
|                                                                                           | `int`, `string`, `string`(, `int`)                           | `int`    |
|                                                                                           | `ref` `string`, `string`, `string`(, `int`)                  | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REPLACE_BYNAME`](../Reference/XML_REPLACE.md)                 | `string`, `string`, `string`(, `int`)                        | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_ADDATTRIBUTE`](../Reference/XML_ADDATTRIBUTE.md)              | `int`, `string`, `string`(, `string`, `int`, `int`)          | `int`    |
|                                                                                           | `ref` `string`, `string`, `string`(, `string`, `int`, `int`) | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_ADDATTRIBUTE_BYNAME`](../Reference/XML_ADDATTRIBUTE.md)       | `string`, `string`, `string`(, `string`, `int`, `int`)       | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVEATTRIBUTE`](../Reference/XML_REMOVEATTRIBUTE.md)        | `int`, `string`(, `int`)                                     | `int`    |
|                                                                                           | `ref` `string`, `string`(, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVEATTRIBUTE_BYNAME`](../Reference/XML_REMOVEATTRIBUTE.md) | `string`, `string`(, `int`)                                  | `int`    |

### MAP（映射数组）相关

| 函数名                                                                   | 参数                              | 返回值   |
| :----------------------------------------------------------------------- | :-------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`MAP_CREATE`](../Reference/MAP_MANAGE.md)         | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_EXIST`](../Reference/MAP_MANAGE.md)          | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_RELEASE`](../Reference/MAP_MANAGE.md)        | `string`                          | `1`      |
| ![](../assets/images/IconEM.webp)[`MAP_GET`](../Reference/MAP_OPERATION.md)         | `string`, `string`                | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_HAS`](../Reference/MAP_OPERATION.md)         | `string`, `string`                | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_SET`](../Reference/MAP_OPERATION.md)         | `string`, `string`, `string`      | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_REMOVE`](../Reference/MAP_OPERATION.md)      | `string`, `string`                | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_SIZE`](../Reference/MAP_OPERATION.md)        | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_CLEAR`](../Reference/MAP_OPERATION.md)       | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_GETKEYS`](../Reference/MAP_GETKEYS.md)       | `string`                          | `string` |
|                                                                          | `string`, `int`                   | `string` |
|                                                                          | `string`, `ref` `string[]`, `int` | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_TOXML`](../Reference/MAP_SERIALIZATION.md)   | `string`                          | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_FROMXML`](../Reference/MAP_SERIALIZATION.md) | `string`, `string`                | `int`    |

### DataTable（数据库）相关
| 函数名                                                                 | 参数                                                          | 返回值   |
| :--------------------------------------------------------------------- | :------------------------------------------------------------ | :------- |
| ![](../assets/images/IconEM.webp)[`DT_CREATE`](../Reference/DT_MANAGE.md)         | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_EXIST`](../Reference/DT_MANAGE.md)          | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_RELEASE`](../Reference/DT_MANAGE.md)        | `string`                                                      | `1`      |
| ![](../assets/images/IconEM.webp)[`DT_CLEAR`](../Reference/DT_MANAGE.md)          | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_NOCASE`](../Reference/DT_MANAGE.md)         | `string`, `int`                                               | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_ADD`](../Reference/DT_COLUMN.md)     | `string`, `string`(, `any`, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_EXIST`](../Reference/DT_COLUMN.md)   | `string`, `string`                                            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_REMOVE`](../Reference/DT_COLUMN.md)  | `string`, `string`                                            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_LENGTH`](../Reference/DT_COLUMN.md)  | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_OPTIONS`](../Reference/DT_COLUMN.md) | `string`, `string`, `keyword`, `any`([,`keyword`, `any`] ...) | 无       |
| ![](../assets/images/IconEM.webp)[`DT_ROW_ADD`](../Reference/DT_ROW.md)           | `string`([, `string`, `any`] ...)                             | `int`    |
|                                                                        | `string`, `ref` `string[]`, `ref` `any[]`, `int`              | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_ROW_SET`](../Reference/DT_ROW.md)           | `string`, `int`, `string`, `any`([, `string`, `any`] ...)     | `int`    |
|                                                                        | `string`, `int`, `ref` `string[]`, `ref` `any[]`, `int`       | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_ROW_REMOVE`](../Reference/DT_ROW.md)        | `string`, `int`                                               | `int`    |
|                                                                        | `string`, `ref` `int[]`, `int`                                | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_ROW_LENGTH`](../Reference/DT_ROW.md)        | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_CELL_GET`](../Reference/DT_CELL.md)         | `string`, `int`, `string`(, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_CELL_GETS`](../Reference/DT_CELL.md)        | `string`, `int`, `string`(, `int`)                            | `string` |
| ![](../assets/images/IconEM.webp)[`DT_CELL_ISNULL`](../Reference/DT_CELL.md)      | `string`, `int`, `string`(, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_CELL_SET`](../Reference/DT_CELL.md)         | `string`, `int`, `string`(, `any`, `int`)                     | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_SELECT`](../Reference/DT_SELECT.md)         | `string`(, `string`, `string`, `ref` `int[]`)                 | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_TOXML`](../Reference/DT_SERIALIZATION.md)   | `string`(, `ref` `string`)                                    | `string` |
| ![](../assets/images/IconEM.webp)[`DT_FROMXML`](../Reference/DT_SERIALIZATION.md) | `string`, `string`, `string`                                  | `int`    |

### 其他

| 函数名                                                                   | 参数                        | 返回值   |
| :----------------------------------------------------------------------- | :-------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`EXISTFILE`](../Reference/EXISTFILE.md)           | `string`                    | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFILES`](../Reference/ENUMFILES.md)           | `string`(, `string`, `int`) | `int`    |
| ![](../assets/images/IconEE.webp)[`UPDATECHECK`](../Reference/UPDATECHECK.md)       | 无                          | 无       |
| ![](../assets/images/IconEE.webp)[`GETMEMORYUSAGE`](../Reference/GETMEMORYUSAGE.md) | 无                          | `int`    |
| ![](../assets/images/IconEE.webp)[`CLEARMEMORY`](../Reference/CLEARMEMORY.md)       | 无                          | `int`    |
| ![](../assets/images/IconEE.webp)[`SETTEXTBOX`](../Reference/TEXTBOX.md)            | `string`                    | `1`      |
| ![](../assets/images/IconEE.webp)[`GETTEXTBOX`](../Reference/TEXTBOX.md)            | 无                          | `string` |
| ![](../assets/images/IconEM.webp)[`MOVETEXTBOX`](../Reference/TEXTBOX.md)           | `int`, `int`, `int`         | `1`      |
| ![](../assets/images/IconEM.webp)[`RESUMETEXTBOX`](../Reference/TEXTBOX.md)         | 无                          | `1`      |
