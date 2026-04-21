---
hide:
  - navigation
---

### ![](../assets/images/IconEM.webp)释放资源占用
!!! summary ""

    程序运行中不再常驻占用Resource文件夹的图像文件

### ![](../assets/images/IconEE.webp)支持音频文件
!!! summary ""

    在与Emuera同目录的sound文件夹中放入音频文件即可使用
    详情请参见后述的PLAYSOUND命令等

### ![](../assets/images/IconEM.webp)支持资源文件的`WebP`格式
!!! summary ""

    参考Emuera1824+v11+webp+Secure添加了WebP格式支持，但从EMv6+EEv13开始使用了其他的WebP库

### ![](../assets/images/IconEE.webp)同捆`Emuera-Anchor`（支持终止）
!!! summary ""

	系统侧搭载语言变更功能来对应各种语言。删除Emuera-Anchor

### ![](../assets/images/IconEE.webp)移植`Emuera-Anchor`的热键扩展功能
!!! summary ""

    移植了Emuera-Anchor的热键扩展功能。`Ctrl+T`返回标题画面，`Ctrl+R`重启，`Ctrl+O`重新加载ERB

### ![](../assets/images/IconEE.webp)键盘宏保存为UTF-8
!!! summary ""

    现在可以将其他语言也编入宏中
### ![](../assets/images/IconEM.webp)可以压缩保存存档数据
!!! summary ""

    可在配置画面或`emuera.config`中设置

    * 仅在[`以二进制格式保存存档数据`](../Emuera/config.md#_43)为`YES`时有效

!!! example "示例"
    ``` title="emuera.config"
    压缩保存存档数据:YES
    ```

!!! warning "注意"

    开启压缩功能的存档与旧版本、官方版的Emuera.exe不兼容

### ![](../assets/images/IconEM.webp)Emuera图标指定功能
!!! summary ""

    可在`emuera.config`的配置项目中设置

    在配置项目`Emuera的图标路径`中输入图像路径。路径以`Emuera.exe`为准相对指定（`..`无效）。

    只有标题栏和任务栏的图标会改变（`Emuera.exe`的图标不会改变）。

### ![](../assets/images/IconEE.webp)移植`Emuera-Anchor`的`Clipboard`功能
!!! summary ""

	设置→剪贴板，添加了自动将`Emuera`显示的文本复制到剪贴板的功能

### ![](../assets/images/IconEE.webp)支持`ttf`、`otf`的动态加载
!!! summary ""

	在根目录创建`font`文件夹，放入其中即可在配置及`GSETFONT`中使用

### ![](../assets/images/Iconetc.webp)支持`.NET 7`
!!! summary ""

	在CRER氏的协助下，正式支持.NET 7。感谢

## 常量·变量

### ![](../assets/images/IconEE.webp)在`ERH`中定义的变量数组，可以使用`CSV`文件/`ERD`文件命名
!!! summary ""

    读取符合`ERH`中定义的变量名的文件，可以像现有`CSV`变量一样为数组命名

    在`CSV`文件夹内可用的仍然是传统的`「变量名.csv」`，在`ERB`内可用的是`「变量名.ERD」`文件。格式与`CSV`变量文件相同。即使存在2个以上，只要定义了相同的标识符，启动时就会报错退出。可以将不同的标识符替换为相同的整数

    此外，为多维数组变量命名时，通过在文件名后用`@`跟随数字来对应各个维度。从左边的索引开始对应`1`、`2`、`3`  

!!! example "示例"

    ``` { #language-csv title="ERH.ERH" }
    #DIM HOGE, 3
    #DIM HOGE2D, 3, 3
    #DIM HOGE3D, 3, 3, 3
    ```


    ``` title="ERB文件夹"
    HOGE.ERD
    HOGE2D@1.ERD
    HOGE2D@2.ERD
    HOGE3D@1.ERD
    HOGE3D@2.ERD
    HOGE3D@3.ERD
    ```
    
### ![](../assets/images/IconEE.webp)可在`VariableSize.csv`中将`COUNT`设置为禁止使用变量
!!! summary ""

    通过写入`COUNT,-1`可以将`COUNT`设置为禁止使用变量。此时，`REPEAT`行在启动时会发出警告，执行时会报错退出

### ![](../assets/images/IconEE.webp)对`DAY`、`TIME`、`MONEY`应用CSV
!!! summary ""

    可在`DAY.csv`、`TIME.csv`、`MONEY.csv`中像其他CSV一样命名，`DAYNAME`、`TIMENAME`、`MONEYNAME`就可以使用了

### ![](../assets/images/IconEM.webp)XML、MAP、DataTable可以在存档数据中保存
!!! summary ""

    通过CSV文件夹内的`VarExt*.csv`文件，可以设置要保存在[`XML`](../Reference/XML_MANAGE.md)、[`MAP`](../Reference/MAP_MANAGE.md)、[`DataTable`](../Reference/DT_MANAGE.md)中的ID

    * 仅在[`以二进制格式保存存档数据`](../Emuera/config.md#_43)为`YES`时有效
    * 即使设置了ID，如果内存中没有也不会保存到存档数据中
    * 如果存档数据中保存的数据ID在CSV中未设置，将被丢弃
    * 存档数据与旧版本、官方版的Emuera.exe兼容

!!! example "示例"

    ``` { #language-csv title="VarExtSample.CSV" }
    ; 要在global.sav中保存的MAP, XmlDocument, DataTable的ID。一行可设置多个
    ; 可在多行、多个文件（如VarExt1.csv, VarExt2.csv, VarExt3.csv等）中设置
    GLOBAL_MAPS, MyMap, MyMap2
    GLOBAL_MAPS, MyMap3
    GLOBAL_XMLS, 0, MyXml
    GLOBAL_DTS, db
    ; 要在save*.sav中保存的MAP, XmlDocument, DataTable的ID
    SAVE_MAPS, MyMap4
    SAVE_XMLS, 1, MyXml2
    SAVE_DTS, mydb1
    ; 与带GLOBAL的变量类似，不随RESETDATA变化，RESETGLOBAL时删除
    STATIC_MAPS, MyMap5
    STATIC_XMLS, 1, MyXml3
    STATIC_DTS, db2
    ```

!!! warning "注意"

    注意CSV文件中设置的ID的前后空格会被删除

## 规格变更的命令·表达式函数

### ![](../assets/images/IconEM.webp)`HTML_PRINT`相关变更
!!! summary ""

    - `HTML_PRINT`的`<space>`标签中可以指定负数作为`param`
    - 添加`HTML_PRINT`的`<clearbutton>`标签。`<clearbutton>`使所围部分的按钮无效（`title`、`pos`属性功能保留）
        - 属性`notooltip`为`true`时，按钮`title`属性也无效
    - 设置`HTML_PRINT`的`<img>`、`<shape>`标签的属性`width`、`height`、`ypos`、`param`时，数值后添加`px`（大小写不敏感），数值将以像素为单位，而不是按字体大小百分比解释。
    - 添加`HTML_PRINT`的`<div>`标签。可以将所围内容在指定区域内显示。`<div>`不支持嵌套结构。可与其他标签并用。
        - `width`属性：子区域的宽度。像`<img>`、`<shape>`标签一样可以用`px`或按字体大小百分比指定。
        - `height`属性：子区域的高度。像`<img>`、`<shape>`标签一样可以用`px`或按字体大小百分比指定。
        - `xpos`属性：子区域与当前位置的横向距离。可省略。负数向左，正数向右。像`<img>`、`<shape>`标签一样可以用`px`或按字体大小百分比指定。
        - `ypos`属性：子区域与当前位置的纵向距离。可省略。负数向上，正数向下。像`<img>`、`<shape>`标签一样可以用`px`或按字体大小百分比指定。
        - `size`属性：`width`和`height`的简化。格式：`size='width,height'`。
        - `rect`属性：`xpos`、`ypos`、`width`和`height`的简化。格式：`rect='xpos,ypos,width,height'`。
        - `depth`属性：子区域的深度。可省略。负数在前方，正数在后方。
        - `color`属性：子区域的背景色。可省略。指定格式与`<font>`标签的`color`属性相同。
        - `display`属性：子区域的绘制形式。可省略。
            - `relative`（默认）：在当前文字位置绘制。
            - `absolute`：在窗口固定位置绘制，滚动时也不移动。(0, 0)是窗口左下角，`ypos`向上为正。
        - `margin`属性：子区域四个边的边距区域。可省略。
            - `margin='all'`：将`all`应用到四边。支持`px`和字体大小百分比。
            - `margin='leftRight,topBottom'`：将`leftRight`应用到上下，`leftRight`应用到左右。支持`px`和字体大小百分比。
            - `margin='top,leftRight,bottom'`：将`top`应用到上，`leftRight`应用到左右，`bottom`应用到下。支持`px`和字体大小百分比。
            - `margin='top,right,bottom,left'`：将`top`应用到上，`right`应用到右，`bottom`应用到下，`left`应用到左。支持`px`和字体大小百分比。
        - `padding`属性：子区域四个边的填充区域。可省略。指定格式与`margin`属性相同。
        - `border`属性：子区域边框的宽度。可省略。指定格式与`margin`属性相同。
        - `bcolor`属性：子区域边框的颜色。可省略。指定格式与`margin`属性相似，但颜色格式与`<font>`标签的`color`属性相同。
        - `radius`属性：子区域边框外侧的圆角（半径）。可省略。
            - `radius='all'`：将`all`应用到四个角。支持`px`和字体大小百分比。
            - `radius='ltRb,rtLb'`：将`ltRb`应用到左上和右下，`rtLb`应用到右上和左下。支持`px`和字体大小百分比。
            - `radius='lt,rtLb,rb'`：将`lt`应用到左上，`rtLb`应用到右上和左下，`rb`应用到右下。支持`px`和字体大小百分比。
            - `radius='lt,rt,rb,lb'`：将`lt`应用到左上，`rt`应用到右上，`rb`应用到右下，`lb`应用到左下。支持`px`和字体大小百分比。
    - 图像、`div`等超过行高的内容即使所在行在屏幕外也能显示。
    - `HTML_PRINT`的`<img>`标签添加属性`srcm`。与CBG系按钮映射相似。[INPUT系的扩展模式](./EMEE_Summary.md#input)或执行`INPUTMOUSEKEY`命令时，将鼠标光标正下方的按钮映射图像颜色（RGB部分）代入`RESULT:3`（`INPUTMOUSEKEY`时为`RESULT:6`）。
    - `HTML_PRINT`添加第二参数（整数型）。第二参数不为`0`（默认）时，将不再强制换行。

!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    
        HTML_PRINT "文<shape type='space' param='-100'>字"
        HTML_PRINT "<clearbutton><button value='1' title='工具提示1'>[1] 确定</button></clearbutton>"
        HTML_PRINT "<clearbutton notooltip='true'><button value='2' title='工具提示2'>[2] 返回</button></clearbutton>"
        HTML_PRINT "<shape type='rect' param='0,0,200px,100'>"
        HTML_PRINT "<img src='button_normal' srcb='button_hover' srcm='button_mask'>"
        HTML_PRINT "<div ypos='-5px' xpos='-180px' width='80px' height='80px' color='#503030' depth='-1'><button value='3'>[3] 按钮3</button></div>"

        ONEINPUT
    ```

### ![](../assets/images/IconEM.webp)关于`HTML_PRINT`的`PRINT`系命令变更

!!! summary ""
    - 为`PRINT_IMG`添加参数（可选），增加3种形式。
    - `PRINT_IMG`、`PRINT_RECT`、`PRINT_SPACE`的整数型参数后也可以添加`px`（大小写不敏感）
!!! info "API"

    ``` { #language-erbapi }
    PRINT_IMG src
    PRINT_IMG src, width, height, ypos
    PRINT_IMG src, srcb, width, height, ypos
    PRINT IMG src, srcb, srcm, width, height, ypos
    ```
    相当于HTML_PRINT命令的`<img>`标签
!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    
        PRINT_IMG "Normal", "Hover", (500+A) px, 100
        PRINT_SPACE 200 px

        ONEINPUT
    ```

### ![](../assets/images/IconEM.webp)使`INPUT`系接受鼠标点击
!!! summary ""

    为`INPUT`、`INPUTS`、`ONEINPUT`、`ONEINPUTS`添加第二参数（整数型，可选，默认为`0`）

    为`TINPUT`、`TINPUTS`、`TONEINPUT`、`TONEINPUTS`添加第五参数（整数型，可选，默认为`0`）

    - 附加参数`==0`时，或省略时 与官方版相同。
    - 附加参数`!=0`时 将鼠标点击视为回车键（向`RESULTS`代入空字符串。按下按钮时，将按钮索引代入`RESULTS:1`），左击时`RESULT:1`为`1`，右击时`RESULT:1`为`2`。同时按下++shift++、++ctrl++、++alt++时，将其按键状态保存到`RESULT:2`。（bit 16 17 18）

### ![](../assets/images/IconEM.webp)使`ONEINPUT`的默认值可指定两位/两字符以上
!!! summary ""

    `ONEINPUT`、`ONEINPUTS`、`TONEINPUT`、`TONEINPUTS` 默认值可指定两位以上/两字符以上


### ![](../assets/images/IconEE.webp)添加`INPUT`系可右键跳过的选项
!!! summary ""

    为`INPUT`、`INPUTS`、`ONEINPUT`、`ONEINPUTS` 添加第三参数（整数型，可选，默认为`0`）

    为`TINPUT`、`TINPUTS`、`TONEINPUT`、`TONEINPUTS` 添加第六参数（整数型，可选，默认为`0`）

	- 附加参数`==0`时，或省略时与官方版行为相同
	- 附加参数`!=0`时，右键等跳过时不进行输入等待
	但会应用默认值。与上述`INPUT系接受鼠标点击`并用时，分别将`RESULT:1`及`RESULTS:1`，
	不并用时则按常规将默认值代入`RESULT:0`及`RESULTS:0`

### ![](../assets/images/IconEM.webp)使`LOADTEXT`、`SAVETEXT`可指定文件名
!!! summary ""

    当`LOADTEXT`的第一参数，或`SAVETEXT`的第二参数为字符串时，将各自的参数作为路径加载/保存文件。相对于`Emuera.exe`的相对路径（".."无效）。另外，只能使用在设置画面或`Emuera.config`的「LOADTEXT和SAVETEXT可用扩展名」项目中规定的扩展名。（默认仅为txt）
    
!!! example "示例"

    ``` title="emuera.config"
    LOADTEXT和SAVETEXT可用扩展名:txt,xml,json
    ```

### ![](../assets/images/IconEM.webp)`REPLACE`扩展
!!! summary ""

    `REPLACE`的第三参数为字符串数组变量，第四参数不为0时，依次将第二参数匹配的部分替换为字符串数组的元素，并返回结果。
    
!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    #DIMS str = "pen", "apple"
    #DIMS orig = "I have a {1}, I have an {2}, ..."

    PRINTSL REPLACE(orig, "\\{\\d+\\}", str, 1)

    ONEINPUT
    ```
    ``` title="结果"
    I have a pen, I have an apple, ...
    ```

### ![](../assets/images/IconEE.webp)使`INPUTMOUSEKEY`可使用按钮
!!! summary ""

    命令执行时`RESULT:0 = 1`（鼠标点击时）时`RESULT:5`中存入按钮的数值
    此外，按下字符串型按钮时，值将代入`RESULTS`

### ![](../assets/images/IconEE.webp)使`OUTPUTLOG`可指定文件名和扩展名
!!! summary ""

    通过为`OUTPUTLOG`指定参数可以以该文件名.扩展名输出 文字与`PRINTS`等相同
    v5fix中修复了可指定父目录的漏洞 子目录仍可指定

### ![](../assets/images/IconEE.webp)使`GSETFONT`可指定字体样式
!!! summary ""

    第4参数指定与`SETFONT`相同的4位数（1=粗体 2=斜体 4=删除线 8=下划线）可添加装饰 省略可能

### ![](../assets/images/IconEE.webp)`GETNUM`支持`ERD`
!!! summary ""

	`GETNUM`支持ERD，可指定可选的第3参数。第3参数指多维数组的维度，从左到右为1,2,3（与表达式函数`VARSIZE`的规格不同请注意）
	另外，添加了将表达式函数`VARSIZE`的维度指定设置为与`ERD`相同的1,2,3的配置项目

### ![](../assets/images/IconEM.webp)使`GCLEAR`可指定区域并用指定颜色替换
!!! summary ""

    添加格式2，可通过第三～第六参数指定区域的X、Y、宽度、高度。

!!! info "API"
    ``` { #language-erbapi }
    1. GCLEAR GID, cARGB
    2. GCLEAR GID, cARGB, x, y, width, height
    ```

### ![](../assets/images/IconEE.webp)`GCREATEFROMFILE`通过指定第三参数，可使用相对于`Emuera`的路径引用图像
!!! summary ""

	可选的第三参数非0时，使用相对于Emuera的路径引用图像  
	由此ERB文件夹、CSV文件夹、自定义文件夹等也可以使用

### ![](../assets/images/Iconetc.webp)添加别名(`Alias`)功能
由Neo_Kesha氏添加

!!! summary ""

可为`Talent`、`Abl`等变量指定多个标识符  
通过扩展名`.als`文件指定  

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

!!! info "ERB中的操作"
    ``` { #language-erbapi }
	TALENT:0:Talent1 = 15
	PRINT TALENT:0:MyCoolTalent ; 显示"15"。
	TALENT:0:MyCoolTalent = 420
	PRINT TALENT:0:Talent1 ; 显示"420"。
	```

### ![](../assets/images/IconEE.webp)添加仅在EMEE中运行的特殊注释符号「`;^;`」
!!! summary ""

	以`;^;`开头的行在eramaker及其他版本的Emuera中通常会被注释掉，仅在EMEE中执行