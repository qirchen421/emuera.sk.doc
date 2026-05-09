---
---

# 更新日志

## Emuera.EM

=== "v18"

    * 新增函数：[`HTML_STRINGLINES`](../Reference/HTML_STRINGLINES.md)。
    * 修复了 [`<div>` 标签](../EMEE/EMEE_Summary.md#html_print)行位置偏移的问题。
    * 修复了 [`DT_CELL_GETS`](../Reference/DT_CELL.md)在目标为 INT 类型时出错的问题。
    * 修复了外层 [`<clearbutton>` 标签](../EMEE/EMEE_Summary.md#html_print)对 [`<div>` 标签](../EMEE/EMEE_Summary.md#html_print)内容无效的问题。

=== "v17"

    * 新增了 [`DT_COLUMN_NAMES`](../Reference/DT_COLUMN.md)。
    * [`<div>` 标签](../EMEE/EMEE_Summary.md#html_print) 新增 `display`、`margin`、`padding`、`border`、`bcolor`、`radius`属性。
    * 修正了重启后渲染 `<div>` 时报错终止的问题。

=== "v16fix2"

    * 修复了 `<div>` 标签的渲染时机，鼠标判定等方面的问题。
    * 修复了功能更新导致的 `<img>` 标签发出错误的属性重复赋值警告的问题。

=== "v16fix"

    * 修复了部分情况下按钮不响应鼠标操作等问题。
    * 新增了 [`HTML_PRINT` 的第二参数](../EMEE/EMEE_Summary.md#html_print)以及 `<div>` 标签的 `size`、`rect` 属性。

=== "v16"

    *  新增了 [`DT_TOXML`](../Reference/DT_SERIALIZATION.md) / [`DT_FROMXML`](../Reference/DT_SERIALIZATION.md) / [`DT_COLUMN_OPTIONS`](../Reference/DT_COLUMN.md) / [`MOVETEXTBOX`](../Reference/TEXTBOX.md) / [`RESUMETEXTBOX`](../Reference/TEXTBOX.md)。
    * 新增了 [`<div>` 标签](../EMEE/EMEE_Summary.md#html_print)，`<img>` 标签新增了 `srcm` 属性，扩展了渲染时的特性。
    * 为 `PRINT_IMG` 命令添加了[另外两种调用形式](../EMEE/EMEE_Summary.md#html_print-print)。
    * [`ARRAYMSORTEX`](../Reference/ARRAYMSORTEX.md) 现在可以指定数组大小了。

=== "v15"

    * 新增了 [`DataTable` 系列函数](../EMEE/EMEE_Summary.md#datatable)。
    * 修复了字体大小不为 `16` 时输入栏的显示问题。
    * 修复了用户定义的程序图标的透明通道信息无效的问题。

=== "v14fix"

    * 修复关于使用键盘输入时部分输入无效的问题。

=== "v14"

    * 更新至[私家版v16](https://ux.getuploader.com/ninnohito/download/482)。
    * 扩展了 [`GCLEAR`](../EMEE/EMEE_Summary.md#gclear) 的功能使其能用指定颜色替换指定区域。
    * 新增了 [Emuera 图标设置功能](../EMEE/EMEE_Summary.md#emuera)。
    * 现在可以指定 [`STATIC_MAPS`/`STATIC_MAPS`](../EMEE/EMEE_Summary.md#xmlmapdatatable) 了。

=== "v13fix"

    * 修复关于功能扩展导致的用 `PRINT_IMG` 与 `<img>` 标签显示图像报错的问题。

=== "v13"

    * 扩展了 HTML 图像相关参数的[输入格式](../EMEE/EMEE_Summary.md)。
    * 新增了 [`PRINT_IMG` 的参数](../EMEE/EMEE_Summary.md)。

=== "v12"

    * 新增「[压缩保存存档数据](../EMEE/EMEE_Summary.md#_5)」设置项。
    * 新增将 [XML、MAP 数据保存进存档](../EMEE/EMEE_Summary.md#xmlmapdatatable)的功能。
	* 调整 [XML 系列命令](../EMEE/EMEE_Summary.md#xml)的行为，现在使用字符串作为 ID，兼容旧版本。

=== "v11"

    * 新增HTML标签属性：添加了 `<clearbutton>` 标签的 [`notooltip`](../EMEE/EMEE_Summary.md#html_print) 属性。

=== "v10"

    * 新增HTML标签：[`<clearbutton>`](../EMEE/EMEE_Summary.md#html_print)。
    * 性能提高：修正算法以提高 [`XML_GET`](../Reference/XML_GET.md) 的性能。

=== "v9"

    * 新增函数：[`ENUMFILES`](../Reference/ENUMFILES.md)。

=== "v8c"

	* `libwebp.dll` 版本升级，该升级解决了一部分系统无法读取`webp`文件的问题。

=== "v8b"

	* 修复关于 [`REPLACE` 扩展](../EMEE/EMEE_Summary.md#replace)带来的错误(该错误会导致eraTW的AA显示发生错误)。
	* 将 [`HTML_SUBSTRING`](../Reference/HTML_SUBSTRING.md) 的返回值从整数型(固定为 `1`)更改为字符串型(与 `RESULTS:0` 相同)。

=== "v8"

    * 扩展 [`XML_GET`](../Reference/XML_GET.md) / [`REPLACE`](../EMEE/EMEE_Summary.md#replace) 相关功能。
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
    * 修复关于 [`INPUT` 系列命令扩展](../EMEE/EMEE_Summary.md#input)的错误。

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
=== "v55"
	新增 ONEBINPUT、ONEBINPUTS 函数
	合并 VVII 氏的补丁以支持 .NET 10
	daughterpatch 氏整理了 csproj 文件
	修复了 ERD 为二维字符串数组变量命名后无法引用的问题

=== "v54"
	改善了运行稳定性
	修复了 SPRITEGETCOLOR 返回值异常的问题
	修复了 BINPUTS 始终返回 0 的问题
	合并 VVII 氏的补丁（资源读取失败时输出错误日志、调整 VSCode 插件描述）
	更新 libwebp 的 dll（CRER 氏）
	以上两点改善了资源读取的行为
	修复了 TIMES 在特定地区行为异常的问题
	合并私家版 v23～v24

=== "v53"
	修复了 HTML_PRINT 使用大图片时按钮点击判定消失的问题
	日志输出时现在也会输出 GameBase.csv 中定义的变体名和版本号

=== "v52"
	因精灵图生成日志出现异常错误而暂时撤回
	修复了 TINPUT 运行过快导致功能无法正常工作的问题
	通过删除不必要的引用大幅缩小了 Emuera 本体文件大小
	ERB 文件夹内，现在优先读取文件夹名含「#」的文件夹。这是为了保持与过去版本的兼容性，普通变体不受影响（感谢 CRER 氏的 bug 修复）
	合并 CRER 氏的补丁修复了 HTML_SUBSTRING

=== "v51"
	v50 为空缺版本
	合并 daughterpatch 氏的补丁修复了 [`SPRITEANNIME`](../Reference/SPRITEANIMECREATE.md)、工具提示以及日志以 UTF-8 BOM 格式保存的问题
	现在可以在设置中替换行连接时的换行代码（默认为半角空格 1 个）
	合并 CRER 氏的补丁补充了部分翻译，并将剪贴板功能工具化
	修复了 CSV 指定的精灵图使用小写字母时无法正常生成的问题
	设置中开启加载报告时现在也会显示 CSV 精灵图的生成日志
	修改了重启处理，修复了 [`QUIT_AND_RESTART`](../Reference/QUIT_AND_RESTART.md) 系列命令无法正常工作的问题
	合并 JukesBouver 氏的补丁使屏幕上的文字换行以最佳字数进行

=== "v49"
	* 修复了 div 内按钮无法被鼠标悬停检测、srcb 不显示的问题
	* JukesBouver99 氏的内存优化
	* Alex Swift 氏的 RikaiDialog 处理修正
	* 修复并调整了 resources 文件夹内 CSV 生成精灵图的处理，同时修复了 SPRITEDISPOSEALL
	* 合并 daughter 氏的补丁。新增 [EXISTMETH](../Reference/EXISTMETH.md)、[GETMETH](../Reference/GETMETH.md)、[GETMETHS](../Reference/GETMETH.md)

=== "v48fix"
	* 修复了 v48 中实现的中键点击判定异常的问题
	* 修复了 resources 文件夹内的 CSV 被重复加载的问题
	* 各 Xml、Map、DataTable 现在会根据属性进行正确的初始化（存档数据→加载其他数据时清除；全局数据→RESETGLOBAL/LOADGLOBAL 时清除）
	* 合并私家版 v22 的变更
	* 修复了文本框中按 ↑ 键无法回溯日志的问题
	* [OUTPUTLOG](../Reference/OUTPUTLOG.md) 新增第二参数。非 0 时不包含版本信息
	* 合并 MogeMoc 氏(RainForTW)的修正。HTML_PRINT 显示的图片现在无论 depth 如何，鼠标悬停时都会应用 srcb
	* 现在当 0 号角色被重复定义时会发出警告
	* 添加了文件被其他进程占用时的异常处理

=== "v48"
	* 合并 VVII 氏制作的 [Emuera.NET](https://gitlab.com/VVIIlet/emuera) 的 master 分支(截至 2024/06/30)
	* 除了各项操作的 QoL 改善外，新增了 [`VAR` 系列命令](../Reference/VAR.md)、[`PRINTN` 系列命令](../Reference/PRINTN.md)、[`HTML_PRINT_ISLAND` 命令](../Reference/HTML_PRINT_ISLAND.md)
	* [`INPUT`](../Reference/INPUT.md) 系列现在支持中键点击（鼠标滚轮点击）。`RESULTS:1` 中会填入 3
	* 新增 HOTKEY 相关命令
	* 新增仅在 EMEE 中生效的注释符号「`;^;`」

=== "v47"
	* v46 中对 [`GETDISPLAYLINE`](../Reference/GETDISPLAYLINE.md) 的修正存在问题，回滚到之前的规格
	* Neo_Kesha 氏新增了[后台操作系列命令](../Reference/BACKGROUND.md)
	* Neo_Kesha 氏新增了 [`CALLSHARP`](../Reference/CALLSHARP.md)
	* Neo_Kesha 氏新增了 [CSV 别名功能](../EMEE/EMEE_Summary.md#alias)
	* ユケッス(JukesBouver99) 氏新增了 [`BITMAP_CACHE_ENABLE`](../Reference/BITMAP_CACHE_ENABLE.md)
	* fairylord(KFC的人) 氏完成了 .NET 8 适配

=== "v46"
	* 修正了 [`GETDISPLAYLINE`](../Reference/GETDISPLAYLINE.md) 的参数使其返回与 `LINECOUNT` 对应的行
	* 扩展了 [`FLOWINPUT`](../Reference/FLOWINPUT.md)
	* 新增了 [`FLOWINPUTS`](../Reference/FLOWINPUT.md)

=== "v45"
	* 合并 Ignominious.Reverie 氏的补丁，扩展了 NAudio 版功能并提高了稳定性
	* 修复了未指定字体执行 [`GDRAWTEXT`](../Reference/GDRAWTEXT.md) 时异常退出的问题
	* [`GETCONFIG`/`GETCONFIGS`](../Reference/GETCONFIG.md) 现在可以获取 EMEE 扩展的配置项

=== "v44"
	* [`PLAYSOUND`](../Reference/PLAYSOUND.md) 的第二参数现在可以设置播放次数

=== "v43"
	* 修复了 [`MOUSEB`](../Reference/MOUSEB.md)、[`UPDATECHECK`](../Reference/UPDATECHECK.md)、[`SPRITEANIMEADDFRAME`](../Reference/SPRITEANIMEADDFRAME.md) 的问题
	* NAudio 版运行稳定性提升（Ignominious.Reverie、CRER）
	* 修复了部分配置项的翻译遗漏
	* 合并 MogeMoc 氏的资源文件读取处理内存优化（RainForTW）

=== "v42"
	* 微量修正及翻译遗漏等修复。详见 v43 说明

=== "v41fix"
	* 修复了 webp 库的漏洞（https://nvd.nist.gov/vuln/detail/CVE-2023-4863）
	* 请替换附带的「libwebp.dll」并新增使用「libsharpyuv.dll」

=== "v41"
	* 新增 [`TOOLTIP_IMG`](../Reference/TOOLTIP_EXTENSION.md)
	* 为 Linux 版附带了使用 NAudio 作为音乐播放库的版本（Ignominious.Reverie 氏）

=== "v40"
	* 修复了各种 bug，以及对 Wine 等环境的优化
	* 虽非 Emuera 本身的更新，但已将 OSDN（服务器已关闭）上的 Emuera 文档移植到了 EM+EE 的 wiki
	* https://evilmask.gitlab.io/emuera.em.doc/index.html

=== "v39fix"
	* 合并 CRER 氏的补丁，现在即使混入不同编码的文件也能正常读取
	* 新增 `GETDOINGFUNCTION`
	* 再次修复了 CLEARLINE 与 div 并用时行为异常的 bug，这次应该不会再发生了

=== "v39"
	* 合并 CRER 氏的补丁解决了 DPI 缩放问题
	* 修复了 [`ARRAYREMOVE`](../Reference/ARRAYREMOVE.md) 第三参数设为 0 以下时未能清除后续数组元素的问题
	* 修复了 [`PRINTC` 和 `PRINTLC`](../Reference/PRINT.md) 字符数不一致的问题
	* 实现了资源 CSV 重新加载功能

=== "v38"
	* 修复了部分字体下GDRAWTEXT及GGETTEXTSIZE的行为不正确的问题。
	* EXISTFUNCTION是否无视大小写与设置保持一致。
	* CRER的帮助下正式支持.NET 7。感谢。

=== "v37"
	* 设置选项中添加了以UTF-8(非BOM)处理文件的功能。
	* v36中对EXISTFUNCTION的修复严重影响了处理事件，故目前只有在第二参数非0时才会无视大小写。
	* 修复了TINPUT系列指令添加了鼠标按键检测选项后，计时器的行为不正确的问题。

=== "v36"
	* 支持部分字体文件(ttf.otf)。
	* 修复了ENUMFUNC及EXISTFUNCTION无法正常识别大小写交错的函数名的问题。

=== "v35fix"
	* 修复了BINPUTS的错误。

=== "v35"
	* 为了解决重复重启导致的内存泄漏问题，修改了重启机制。
	* 为了明确类型初始化的报错，使用try-catch得到了报错信息。(原因是WMP未安装)
	* 设置选项中添加了对ERD的变量名与局部变量重复的检查。
	* 修复了使用PRINT并未换行时，执行[`BINPUT`](../Reference/BINPUT.md)无法识别该行按钮的问题。

=== "v34"
	* 新增了 [`GDASHSTYLE`](../Reference/GDASHSTYLE.md) 函数。

=== "v33"
	* 新增了 [`GETDISPLAYLINE`](../Reference/GETDISPLAYLINE.md) 函数。
	* [`GCREATEFROMFILE`扩展](../Reference/README.md)

=== "v32"
	* 新增了 [`GDRAWLINE`](../Reference/GDRAWLINE.md) 函数。

=== "v31fix"
	* 修复了`BINPUT`和`div`功能组合后无法继续执行的问题。
	* `BINPUT`执行时若无任何按钮则返回默认值。若无默认值则报错。
	* 修复了`BINPUT`执行时由于某些原因不会重绘画面，导致与`div`并用时出现错误的问题。

=== "v31"
	* 新增了 [`BINPUT`及`BINPUTS`](../Reference/BINPUT.md) 函数。

=== "v30"
	* 新增了 [`SKIPLOG`](../Reference/SKIPLOG.md) 函数。
	* 修复了菜单栏的快捷键无效的问题。

=== "v29"
	* 修复`GCREATEFROMFILE`无法正常生效的问题。
	* 修复了`EM`的`div`功能中设定`margin`、`border`、`padding`后，`div`内的文字未能跟随设置的问题。
	* 修复了关闭翻译词典时，仍会在内部处理，导致重复描绘的问题。
	* 新增了 [`MOUSEB`](../Reference/MOUSEB.md) 函数。
	* 新增了 [`SPRITEDISPOSEALL`](../Reference/SPRITEDISPOSEALL.md) 函数。

=== "v28"
	* 修复了`EM`的INPUT功能扩展无法正常生效的问题。
	* `EE`方面对`INPUT`命令进行扩展。
	* 新增了 [`FLOWINPUT`](../Reference/FLOWINPUT.md) 函数。

=== "v27"
	* `JukesBouver99`提供了英语翻译词典的补丁

=== "v26"
	* 扩展了利用 `GSETPEN` 进行 [`GDRAWTEXT`](../Reference/GDRAWTEXT.md) 的相关功能。
	* 新增了 [`GGETPEN`](../Reference//GGETPEN.md) / [`GGETPENWIDTH`](../Reference/GGETPENWIDTH.md) / [`GGETBRUSH`](../Reference/GGETBRUSH.md)。
	* 新增了 [TOOLTIPS 功能扩展](../Reference/TOOLTIP_EXTENSION.md)相关函数。

=== "v25"
	* 移植了 `Emuera-Anchor` 的[剪贴板功能](../EMEE/EMEE_Summary.md#emuera-anchor_2)。
	* 补充了遗漏的翻译。

=== "V24"
	* [多语言支持](../i18n/README.md)(同EMv14)。
	* `GETNUM` 现在支持[多维数组的 ERD 功能](../EMEE/EMEE_Summary.md#getnumerd)。
	* 新增 [`ERDNAME`](../Reference//ERDNAME.md) 函数。

=== "v23"

    * [`ERD` 功能](../EMEE/EMEE_Summary.md#csv-erd-erh)现在也支持二维和三维数组。

=== "v22"

    * [`ERD` 功能](../EMEE/EMEE_Summary.md#csv-erd-erh)现在对于同一个变量的多个定义文件，只有其中定义了相同标识符时会报错，不同标识符现在可以替换为同一个整数。
    * 新增命令 [`INPUTANY`](../Reference/INPUTANY.md)

=== "v21"

	* 新增函数：[`GETTEXTBOX`](../Reference/TEXTBOX.md) / [`SETTEXTBOX`](../Reference/TEXTBOX.md)。

=== "v20"

	* `ERD` 读取进一步高速化。
	* 可以[用 `CSV` 来配置 `DAY`, `TIME`, `MONEY` 数组](../EMEE/EMEE_Summary.md#csv-daytimemoney)了。

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
