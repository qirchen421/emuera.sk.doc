---
hide:
  - navigation
  - toc
---

# 更新日志

## Emuera.EM

=== "v16"

    *  新增了 [`DT_TOXML`](../Reference/DT_SERIALIZATION.md) / [`DT_FROMXML`](../Reference/DT_SERIALIZATION.md) / [`DT_COLUMN_OPTIONS`](../Reference/DT_COLUMN.md) / [`MOVETEXTBOX`](../Reference/TEXTBOX.md) / [`RESUMETEXTBOX`](../Reference/TEXTBOX.md)。
    * 新增了 [`<div>` 标签](../Reference/README.md#html_print)，`<img>` 标签新增了 `srcm` 属性，扩展了渲染时的特性。
    * 为 `PRINT_IMG` 命令添加了[另外两种调用形式](../Reference/README.md#html_print-print)。
    * [`ARRAYMSORTEX`](../Reference/ARRAYMSORTEX.md) 现在可以指定数组大小了。

=== "v15"

    * 新增了 [`DataTable` 系列函数](../Reference/README.md#datatable)。
    * 修复了字体大小不为 `16` 时输入栏的显示问题。
    * 修复了用户定义的程序图标的透明通道信息无效的问题。

=== "v14fix"

    * 修复关于使用键盘输入时部分输入无效的问题。

=== "v14"

    * 更新至[私家版v16](https://ux.getuploader.com/ninnohito/download/482)。
    * 扩展了 [`GCLEAR`](../Reference/README.md#gclear) 的功能使其能用指定颜色替换指定区域。
    * 新增了 [Emuera 图标设置功能](../Reference/README.md#emuera)。
    * 现在可以指定 [`STATIC_MAPS`/`STATIC_MAPS`](../Reference/README.md#xmlmapdatatable) 了。

=== "v13fix"

    * 修复关于功能扩展导致的用 `PRINT_IMG` 与 `<img>` 标签显示图像报错的问题。

=== "v13"

    * 扩展了 HTML 图像相关参数的[输入格式](../Reference/README.md#html_print)。
    * 新增了 [`PRINT_IMG` 的参数](../Reference/README.md#html_printprint)。

=== "v12"

    * 新增「[セーブデータを圧縮して保存する](../Reference/README.md#_5)」设置项。
    * 新增将 [XML、MAP 数据保存进存档](../Reference/README.md#xmlmapdatatable)的功能。
	* 调整 [XML 系列命令](../Reference/README.md#xml)的行为，现在使用字符串作为 ID，兼容旧版本。

=== "v11"

    * 新增HTML标签属性：添加了 `<clearbutton>` 标签的 [`notooltip`](../Reference/README.md#html_print) 属性。

=== "v10"

    * 新增HTML标签：[`<clearbutton>`](../Reference/README.md#html_print)。
    * 性能提高：修正算法以提高 [`XML_GET`](../Reference/XML_GET.md) 的性能。

=== "v9"

    * 新增函数：[`ENUMFILES`](../Reference/ENUMFILES.md)。

=== "v8c"

	* `libwebp.dll` 版本升级，该升级解决了一部分系统无法读取`webp`文件的问题。

=== "v8b"

	* 修复关于 [`REPLACE` 扩展](../Reference/README.md#replace)带来的错误(该错误会导致eraTW的AA显示发生错误)。
	* 将 [`HTML_SUBSTRING`](../Reference/HTML_SUBSTRING.md) 的返回值从整数型(固定为 `1`)更改为字符串型(与 `RESULTS:0` 相同)。

=== "v8"

    * 扩展 [`XML_GET`](../Reference/XML_GET.md) / [`REPLACE`](../Reference/README.md#replace) 相关功能。
    * 修复关于 [`XML_REMOVEATTRIBUTE`](../Reference/XML_REMOVEATTRIBUTE.md) / [`VARSETEX`](../Reference/VARSETEX.md) 的错误。

=== "v7"

    * 扩展 [`HTML_STRINGLEN`](../Reference/HTML_STRINGLEN.md) 功能。
    * 扩展 [`REGEXPMATCH`](../Reference/REGEXPMATCH.md) 功能。

=== "v6"

    * 为了避免杀毒软件误报，将 [`WebP`](https://developers.google.com/speed/webp) 的支持库更换为 [`ImageProcessor`](https://imageprocessor.org/) + `libwebp`。

=== "v5"

    * 修订关于 [`XML_SET`](../Reference/XML_SET.md) / [`XML_GET`](../Reference/XML_SET.md) 的说明。
    * 补充关于 [`XML_TOSTR`](../Reference/XML_TOSTR.md) 的说明。
    * 新增函数：[`XML_ADDNODE`](../Reference/XML_ADDNODE.md) / [`XML_REMOVENODE`](../Reference/XML_REMOVENODE.md) / [`XML_ADDATTRIBUTE`](../Reference/XML_ADDATTRIBUTE.md) / [`XML_REMOVEATTRIBUTE`](../Reference/XML_REMOVEATTRIBUTE.md) / [`XML_REPLACE`](../Reference/XML_REPLACE.md)。

=== "v4"

    * 修复关于 [`MAP_TOXML`](../Reference/MAP_SERIALIZATION.md) 的错误。
    * 新增函数：[`MAP_CLEAR`](../Reference/MAP_OPERATION.md) / [`MAP_SIZE`](../Reference/MAP_OPERATION.md) / [`MAP_GETKEYS`](../Reference/MAP_GETKEYS.md) / [`XML_TOSTR`](../Reference/XML_TOSTR.md)。
    * 修复关于 [`INPUT` 系列命令扩展](../Reference/README.md#input)的错误。

=== "v3"

    * 新增函数：[`EXISTFILE`](../Reference/EXISTFILE.md) / [`MAP_CREATE`](../Reference/MAP_MANAGE.md) / [`MAP_EXIST`](../Reference/MAP_MANAGE.md) / [`MAP_RELEASE`](../Reference/MAP_MANAGE.md) / [`MAP_GET`](../Reference/MAP_OPERATION.md) / [`MAP_HAS`](../Reference/MAP_OPERATION.md) / [`MAP_SET`](../Reference/MAP_OPERATION.md) / [`MAP_REMOVE`](../Reference/MAP_OPERATION.md) / [`MAP_TOXML`](../Reference/MAP_SERIALIZATION.md) / [`MAP_FROMXML`](../Reference/MAP_SERIALIZATION.md)。

=== "v2"

    * 删除 `FUNCEXIST` 函数（请使用 EE 版的 [`EXISTFUNCTION`](../Reference/EXISTFUNCTION.md) 函数作为替代）。
    * 修改函数名：`VAREXIST` → [`EXISTVAR`](../Reference/EXISTVAR.md)（为了与 `EXISTFUNCTION` 的命名格式保持一致）。
    * 新增函数：[`XML_DOCUMENT`](../Reference/XML_MANAGE.md) / [`XML_RELEASE`](../Reference/XML_MANAGE.md) / [`XML_SET`](../Reference/XML_SET.md) / [`XML_EXIST`](../Reference/XML_MANAGE.md) / [`XML_TOSTR`](../Reference/XML_TOSTR.md)。
    * `XML_GET` 函数的第 1 个参数允许使用整型（整数类型）。

=== "v1"

    初次公开发布。

## Emuera.EE
=== "v25"
	* 移植了 `Emuera-Anchor` 的[剪贴板功能](../Reference/README.md#emuera-anchor_2)
	* 补充了遗漏的翻译

=== "V24"
	* [多语言支持](../i18n/README.md)(同EMv14)
	* `GETNUM` 现在支持[多维数组的 ERD 功能](../Reference/README.md#getnumerd)
	* 新增 [`ERDNAME`](../Reference//ERDNAME.md) 函数

=== "v23"

    * [`ERD` 功能](../Reference/README.md#csv-erd-erh)现在也支持二维和三维数组。

=== "v22"

    * [`ERD` 功能](../Reference/README.md#csv-erd-erh)现在对于同一个变量的多个定义文件，只有其中定义了相同标识符时会报错，不同标识符现在可以替换为同一个整数。
    * 新增命令 [`INPUTANY`](../Reference/INPUTANY.md)

=== "v21"

	* 新增函数：[`GETTEXTBOX`](../Reference/TEXTBOX.md) / [`SETTEXTBOX`](../Reference/TEXTBOX.md)。

=== "v20"

	* `ERD` 读取进一步高速化。
	* 可以[用 `CSV` 来配置 `DAY`, `TIME`, `MONEY` 数组](../Reference/README.md#csv-daytimemoney)了。

=== "v19"

	* `ERD` 读取高速化。
	* 使 `_Rename.csv` 在调试控制台生效。

=== "v18"

	* `INPUTMOUSEKEY` 现在可以处理以字符串为索引的按钮。
	* `VariableSize.csv` 现在可以禁用 `COUNT` 变量。
	* 按键宏文件现在使用 `UTF-8` 保存。

=== "v17"

	* 增加了 ERD 功能的开启/关闭设置项。

=== "v16"

	* ERD 功能修复（无法根据CSV变量下标获取元素值的问题）。
	* 从 Emuera-Anchor 移植了键盘操作加强的功能。

=== "v15"

	* 修复关于 `ERD` 的错误（定义了代码中未定义的参数时会报错退出）。
	* 修复关于 `GDRAWTEXT` 的错误（没有调用`GSETFONT`之前调用时会报错退出）。

=== "v14"

    * 新增函数：`GETMEMORYUSAGE` / `CLEARMEMORY`。

=== "v13"

    * 新增 ERD 功能：以「类似 CSV 变量的调用方法」来使用 ERH 变量。

=== "v12"

    * 新增函数：`FORCE_BEGIN`。
    * 扩展 `PLAYSOUND` 相关功能，现在最多支持 10 个频道。

=== "v11fix"

    * 修复关于 `UPDATECHECK` 函数的错误。

=== "v11"

    * 新增函数：`GDRAWGWITHROTATE` / `QUIT_AND_RESTART` / `FORCE_QUIT` / `FORCE_QUIT_AND_RESTART`。

=== "v10"

    * 新增函数：`UPDATECHECK`。

=== "v9"

    * 支持关于 WebP 的处理功能。

=== "v8"

    * 新增函数：`TRYCALLF` / `TRYCALLFORMF`。

=== "v7"

    * 新增函数：`GGETTEXTSIZE`。

=== "v6"

    * 新增函数：`EXISTFUNCTION`。

=== "v5fix"

    * 修复 `OUTPUTLOG` 扩展命令的稳定性。

=== "v5"

    * 扩展 `OUTPUTLOG` 相关功能。

=== "v4"

    * 新增函数：`GGETFONT` / `GGETFONTSIZE`。

=== "v3"

    * 新增函数：`GDRAWTEXT`。

=== "v2"

    * 扩展 `INPUTMOUSEKEY` 相关功能。

=== "v1"

    * 初次公开发布。
    * 新增函数：`PLAYSOUND` / `STOPSOUND` / `PLAYBGM` / `STOPBGM` / `EXISTSOUND` / `SETSOUNDVOLUME` / `SETBGMVOLUME`。
