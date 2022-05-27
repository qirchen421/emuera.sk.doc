---
hide:
  - navigation
---

# 更新日志

## Emuera.EM

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
    * 修改函数名：`VAREXIST` → `EXISTVAR`（为与 `EXISTFUNCTION` 的命名格式保持一致）。
    * 新增函数：`XML_DOCUMENT` / `XML_RELEASE` / `XML_SET` / `XML_EXIST` / `XML_TOSTR`。
    * `XML_GET` 函数的第 1 个参数允许使用整型（整数类型）。

=== "v1"

    初次公开发布。

## Emuera.EE

=== "v14"

    * 新增函数：`GETMEMORYUSAGE` / `CLEARMEMORY`。

=== "v13"

    * 新增 ERD 功能：以类似「CSV 变量的调用方法」来使用 ERH 变量。

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
