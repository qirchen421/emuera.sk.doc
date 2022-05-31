# 参考手册

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

## 常量 / 变量

### ![](../assets/images/IconEE.webp)支持使用 `CSV` 文件 / `ERD` 文件来调用 `ERH` 文件中定义的数组变量

!!! summary ""

    读取方式类似在 ERH 文件中定义变量，并且可以像现在的 CSV 用法那样给数组命名。
    `./CSV/` 文件夹下为 `变量名.CSV`，`./ERB/` 文件夹下为 `变量名.ERD`，调用语法仍与 CSV 变量相同。
    如果存在 2 个以上的同名变量，启动时会抛出错位并终止运行。

## 改变了标准库的命令 / 行内函数

### ![](../assets/images/IconEM.webp)`HTML_PRINT` 标签的属性值允许使用负数

!!! summary ""

    `HTML_PRINT` 的 `<space>` 标签可以给 `param` 属性指定负数值。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        HTML_PRINT "文<shape type='space' param='-100'>字"

        ONEINPUT
    ```

### ![](../assets/images/IconEM.webp)`INPUT` 系列命令支持接收鼠标点击事件

!!! summary ""

    `INPUT`, `INPUTS`, `ONEINPUT`, `ONEINPUTS` 新增第二个参数（整数类型，可省略，默认为 `0`）。
    `TINPUT`, `TINPUTS`, `TONEINPUT`, `TONEINPUTS` 新增第五个参数（整数类型，可省略，默认为 `0`）。
    当新增的参数 `== 0`（或直接省略）的时候，行为与本家版 Emuera 相同。
    当新增的参数 `!= 0` 时将鼠标点击视为回车键。此时自动将 `RESULTS`（`RESULTS:0` 的简写）设置为空字符串；
    鼠标按下时将 `RESULTS:1` 设置为按下的鼠标按键，左键为 `1`，右键为 `2`；
    除此之外，同时按下 ++shift++ / ++ctrl++ / ++alt++ 时，将 `RESULT:2` 设置为组合键的键位（bit `17` `18` `19`）。

### ![](../assets/images/IconEM.webp)`ONEINPUT` 系列命令的默认值允许指定为 2 位 / 2 字符以上

!!! summary ""

    `ONEINPUT` / `ONEINPUTS` / `TONEINPUT` / `TONEINPUTS` 的默认值允许指定为 2 位 / 2 字符以上。

### ![](../assets/images/IconEM.webp)`LOADTEXT` / `SAVETEXT` 允许指定文件名（以及路径）

!!! summary ""

    `LOADTEXT` / `SAVETEXT` 第一个参数为字符串时，以此为路径加载 / 保存文件。
    指定的路径必须为 `Emuera.exe` 同级的相对路径（试图使用 `..` 回到更上级的目录是无效的）。此外，只允许使用 `emuera.config` 中配置的 `LOADTEXTとSAVETEXTで使える拡張子` 里包含的扩展名（默认只有 `txt`）。

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

## 新增的命令 / 行内函数

### HTML 系列

| 函数名                                                                   | 参数              | 返回值 |
| :----------------------------------------------------------------------- | :---------------- | :----- |
| ![](../assets/images/IconEM.webp)[`HTML_STRINGLEN`](./HTML_STRINGLEN.md) | `string`(, `int`) | `int`  |
| ![](../assets/images/IconEM.webp)[`HTML_SUBSTRING`](./HTML_SUBSTRING.md) | `string`, `int`   | `int`  |

### 字符串操作 / 引用

| 函数名                                                             | 参数                                              | 返回值 |
| :----------------------------------------------------------------- | :------------------------------------------------ | :----- |
| ![](../assets/images/IconEM.webp)[`REGEXPMATCH`](./REGEXPMATCH.md) | `string`, `string`(, `int`)                       | `int`  |
|                                                                    | `string`, `string`, `ref` `int`, `ref` `string[]` | `int`  |

### 变量操作 / 变量引用 / CSV 引用

| 函数名                                                                   | 参数                                   | 返回值   |
| :----------------------------------------------------------------------- | :------------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`ISDEFINED`](./ISDEFINED.md)           | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`EXISTVAR`](./EXISTVAR.md)             | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCBEGINSWITH`](./ENUMFUNC.md)   | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCENDSWITH`](./ENUMFUNC.md)     | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCWITH`](./ENUMFUNC.md)         | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMVARBEGINSWITH`](./ENUMVAR.md)     | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMVARENDSWITH`](./ENUMVAR.md)       | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMVARWITH`](./ENUMVAR.md)           | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMMACROBEGINSWITH`](./ENUMMACRO.md) | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMMACROENDSWITH`](./ENUMMACRO.md)   | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMMACROWITH`](./ENUMMACRO.md)       | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`GETVAR`](./GETSETVAR.md)              | `string`                               | `int`    |
| ![](../assets/images/IconEM.webp)[`GETVARS`](./GETSETVAR.md)             | `string`                               | `string` |
| ![](../assets/images/IconEM.webp)[`SETVAR`](./GETSETVAR.md)              | `string`, `any`                        | `1`      |
| ![](../assets/images/IconEM.webp)[`VARSETEX`](./VARSETEX.md)             | `string`, `any`(, `int`, `int`, `int`) | `1`      |
| ![](../assets/images/IconEM.webp)[`ARRAYMSORTEX`](./ARRAYMSORTEX.md)     | `string`, `ref` `string[]`(, `int`)    | `1`      |
|                                                                          | `ref` `int`, `ref` `string[]`(, `int`) | `1`      |

### 调试辅助 / 系统流程控制

| 函数名                                                                                   | 参数         |
| :--------------------------------------------------------------------------------------- | :----------- |
| ![](../assets/images/IconEE.webp)[`QUIT_AND_RESTART`](./QUIT_AND_RESTART.md)             | 无           |
| ![](../assets/images/IconEE.webp)[`FORCE_QUIT`](./FORCE_QUIT.md)                         | 无           |
| ![](../assets/images/IconEE.webp)[`FORCE_QUIT_AND_RESTART`](./FORCE_QUIT_AND_RESTART.md) | 无           |
| ![](../assets/images/IconEE.webp)[`FORCE_BEGIN`](./FORCE_BEGIN.md)                       | `identifier` |

### 函数系列（`CALL` 相关）

| 函数名                                                                 | 参数           |
| :--------------------------------------------------------------------- | :------------- |
| ![](../assets/images/IconEE.webp)[`EXISTFUNCTION`](./EXISTFUNCTION.md) | `string`       |
| ![](../assets/images/IconEE.webp)[`TRYCALLF`](./TRYCALLF.md)           | `string`       |
| ![](../assets/images/IconEE.webp)[`TRYCALLFORMF`](./TRYCALLFORMF.md)   | `formedString` |

### 图像处理相关

| 函数名                                                                       | 参数                                | 返回值 |
| :--------------------------------------------------------------------------- | :---------------------------------- | :----- |
| ![](../assets/images/IconEE.webp)[`GDRAWTEXT`](./GDRAWTEXT.md)               | `int`, `string`(, `int`, `int`)     | `int`  |
| ![](../assets/images/IconEE.webp)[`GGETFONT`](./GGETFONT.md)                 | `int`                               | `int`  |
| ![](../assets/images/IconEE.webp)[`GGETFONTSIZE`](./GGETFONTSIZE.md)         | `int`                               | `int`  |
| ![](../assets/images/IconEE.webp)[`GGETTEXTSIZE`](./GGETTEXTSIZE.md)         | `string`, `string`, `int`(, `int`)  | `int`  |
| ![](../assets/images/IconEE.webp)[`GDRAWGWITHROTATE`](./GDRAWGWITHROTATE.md) | `int`, `int`, `int`(, `int`, `int`) | `int`  |

### 音频处理相关

| 函数名                                                                   | 参数     | 返回值 |
| :----------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEE.webp)[`PLAYSOUND`](./PLAYSOUND.md)           | `string` | 无     |
| ![](../assets/images/IconEE.webp)[`STOPSOUND`](./STOPSOUND.md)           | 无       | 无     |
| ![](../assets/images/IconEE.webp)[`PLAYBGM`](./PLAYBGM.md)               | `string` | 无     |
| ![](../assets/images/IconEE.webp)[`STOPBGM`](./STOPBGM.md)               | 无       | 无     |
| ![](../assets/images/IconEE.webp)[`EXISTSOUND`](./EXISTSOUND.md)         | `string` | `int`  |
| ![](../assets/images/IconEE.webp)[`SETSOUNDVOLUME`](./SETSOUNDVOLUME.md) | `int`    | 无     |
| ![](../assets/images/IconEE.webp)[`SETBGMVOLUME`](./SETBGMVOLUME.md)     | `int`    | 无     |

### XML 文件处理相关

| 函数名                                                                             | 参数                                                         | 返回值   |
| :--------------------------------------------------------------------------------- | :----------------------------------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`XML_DOCUMENT`](./XML_MANAGE.md)                 | `int`, `string`                                              | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_RELEASE`](./XML_MANAGE.md)                  | `int`                                                        | `1`      |
| ![](../assets/images/IconEM.webp)[`XML_EXIST`](./XML_MANAGE.md)                    | `int`                                                        | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_GET`](./XML_GET.md)                         | `any`, `string`(, `int`, `int`)                              | `int`    |
|                                                                                    | `any`, `string`, `ref` `string[]`, `int`                     | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_SET`](./XML_SET.md)                         | `int`, `string`, `string`(, `int`, `int`)                    | `int`    |
|                                                                                    | `ref` `string`, `string`, `string`(, `int`, `int`)           | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_TOSTR`](./XML_TOSTR.md)                     | `int`                                                        | `string` |
| ![](../assets/images/IconEM.webp)[`XML_ADDNODE`](./XML_ADDNODE.md)                 | `int`, `string`, `string`(, `int`, `int`)                    | `int`    |
|                                                                                    | `ref` `string`, `string`, `string`(, `int`, `int`)           | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVENODE`](./XML_REMOVENODE.md)           | `int`, `string`(, `int`)                                     | `int`    |
|                                                                                    | `ref` `string`, `string`(, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REPLACE`](./XML_REPLACE.md)                 | `int`, `string`                                              | `int`    |
|                                                                                    | `int`, `string`, `string`(, `int`)                           | `int`    |
|                                                                                    | `ref` `string`, `string`, `string`(, `int`)                  | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_ADDATTRIBUTE`](./XML_ADDATTRIBUTE.md)       | `int`, `string`, `string`(, `string`, `int`, `int`)          | `int`    |
|                                                                                    | `ref` `string`, `string`, `string`(, `string`, `int`, `int`) | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVEATTRIBUTE`](./XML_REMOVEATTRIBUTE.md) | `int`, `string`(, `int`)                                     | `int`    |
|                                                                                    | `ref` `string`, `string`(, `int`)                            | `int`    |

### MAP（映射数组）相关

| 函数名                                                                   | 参数                              | 返回值   |
| :----------------------------------------------------------------------- | :-------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`MAP_CREATE`](./MAP_MANAGE.md)         | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_EXIST`](./MAP_MANAGE.md)          | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_RELEASE`](./MAP_MANAGE.md)        | `string`                          | `1`      |
| ![](../assets/images/IconEM.webp)[`MAP_GET`](./MAP_OPERATION.md)         | `string`, `string`                | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_HAS`](./MAP_OPERATION.md)         | `string`, `string`                | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_SET`](./MAP_OPERATION.md)         | `string`, `string`, `string`      | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_REMOVE`](./MAP_OPERATION.md)      | `string`, `string`                | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_SIZE`](./MAP_OPERATION.md)        | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_CLEAR`](./MAP_OPERATION.md)       | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_GETKEYS`](./MAP_GETKEYS.md)       | `string`                          | `string` |
|                                                                          | `string`, `int`                   | `string` |
|                                                                          | `string`, `ref` `string[]`, `int` | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_TOXML`](./MAP_SERIALIZATION.md)   | `string`                          | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_FROMXML`](./MAP_SERIALIZATION.md) | `string`, `string`                | `int`    |

### 其他

| 函数名                                                                   | 参数     | 返回值 |
| :----------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEM.webp)[`EXISTFILE`](./EXISTFILE.md)           | `string` | `int`  |
| ![](../assets/images/IconEE.webp)[`UPDATECHECK`](./UPDATECHECK.md)       | 无       | 无     |
| ![](../assets/images/IconEE.webp)[`GETMEMORYUSAGE`](./GETMEMORYUSAGE.md) | 无       | `int`  |
| ![](../assets/images/IconEE.webp)[`CLEARMEMORY`](./CLEARMEMORY.md)       | 无       | `int`  |
