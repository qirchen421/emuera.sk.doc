---
hide:
  - navigation
---

# 更新日志

## Emuera.EM

=== "v12"

    * 新增「セーブデータを圧縮して保存する」设置项，参见[`相关说明`](../Reference/README.md#_5)。
    * 新增将 XML、MAP 数据保存进存档的功能，参见[`相关说明`](../Reference/README.md#xmlmap)。
	* 调整 XML 系列命令的行为，现在使用字符串作为 ID，兼容旧版本，参见[`参考手册`](../Reference/README.md#xml)。

=== "v11"

    * 新增HTML标签属性：添加了`<clearbutton>`标签的`notooltip`属性。

=== "v10"

    * 新增HTML标签：`<clearbutton>`。
    * 性能提高：修正算法以提高 `XML_GET` 的性能。

=== "v9"

    * 新增函数：`ENUMFILES`。

=== "v8c"

	* `libwebp.dll` 版本升级，该升级解决了一部分系统无法读取`webp`文件的问题。

=== "v8b"

	* 修复关于 `REPLACE` 扩展带来的错误(该错误会导致eraTW的AA显示发生错误)。
	* 将 `HTML_SUBSTRING` 的返回值从整数型(固定为 `1`)更改为字符串型(与 `RESULTS:0` 相同)。

=== "v8"

    * 扩展 `XML_GET` / `REPLACE` 相关功能。
    * 修复关于 `XML_REMOVEATTRIBUTE` / `VARSETEX` 的错误。

=== "v7"

    * 新增 `HTML_STRINGLEN` 功能。
    * 新增 `REGEXPMATCH` 功能。

=== "v6"

    * 为了避免杀毒软件误报，将 [`WebP`](https://developers.google.com/speed/webp) 的支持库更换为 [`ImageProcessor`](https://imageprocessor.org/) + `libwebp`。

=== "v5"

    * 修订关于 `XML_SET` / `XML_GET` 的说明。
    * 补充关于 `XML_TOSTR` 的说明。
    * 新增函数：`XML_ADDNODE` / `XML_REMOVENODE` / `XML_ADDATTRIBUTE` / `XML_REMOVEATTRIBUTE` / `XML_REPLACE`。

=== "v4"

    * 修复关于 `MAP_TOXML` 的错误。
    * 新增函数：`MAP_CLEAR` / `MAP_SIZE` / `MAP_GETKEYS` / `XML_TOSTR`。
    * 修复关于 `INPUT` 系列扩展命令的错误。

=== "v3"

    * 新增函数：`EXISTFILE` / `MAP_CREATE` / `MAP_EXIST` / `MAP_RELEASE` / `MAP_GET` / `MAP_HAS` / `MAP_SET` / `MAP_REMOVE` / `MAP_TOXML` / `MAP_FROMXML`。

=== "v2"

    * 删除 `FUNCEXIST` 函数（请使用 EE 版的 `EXISTFUNCTION` 函数作为替代）。
    * 修改函数名：`VAREXIST` → `EXISTVAR`（为了与 `EXISTFUNCTION` 的命名格式保持一致）。
    * 新增函数：`XML_DOCUMENT` / `XML_RELEASE` / `XML_SET` / `XML_EXIST` / `XML_TOSTR`。
    * `XML_GET` 函数的第 1 个参数允许使用整型（整数类型）。

=== "v1"

    初次公开发布。

## Emuera.EE

=== "v21"

	* 新增函数：`GETTEXTBOX`,`SETTEXTBOX`

=== "v20"

	* `ERD` 读取进一步高速化
	* 可以用`CSV`来配置`DAY`,`TIME`,`MONEY`数组了

=== "v19"

	* `ERD` 读取高速化
	* 使 `_Rename.csv` 在调试控制台生效

=== "v18"

	* `INPUTMOUSEKEY`现在可以处理以字符串为索引的按钮
	* `VariableSize.csv`现在可以禁用`COUNT`变量
	* 按键宏文件现在使用`UTF-8`保存

=== "v17"

	* 增加了 ERD 功能的开启/关闭设置项

=== "v16"

	* ERD 功能修复（无法根据CSV变量下标获取元素值的问题）
	* 从 Emuera-Anchor 移植了键盘操作加强的功能

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
