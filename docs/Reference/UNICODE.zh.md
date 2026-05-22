---
hide:
  - toc
---

# UNICODE, ENCODETOUNI

| 函数名                                                             | 参数     | 返回值   |
| :----------------------------------------------------------------- | :------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`UNICODE`](./UNICODE.zh.md)     | `int`    | `string` |
| ![](../assets/images/IconEmuera.webp)[`ENCODETOUNI`](./UNICODE.zh.md) | `string` | `int`    |

!!! info "API"

    ```  { #language-erbapi }
	string UNICODE characterCode
	int ENCODETOUNI string(, position)
    ```
	`UNICODE` 是根据参数值返回对应 Unicode 字符的命令/式中函数。
	例如，以下脚本会显示一个空心爱心符号。
	但是，此函数无法处理代理对。
	此外，如果字体不支持，则无法显示。

    ```  { #language-erbapi }
	UNICODE 0x2661
	PRINTFORMW %RESULTS%
	```

	请注意，Emuera 的 Unicode 支持并不完全。
	例如，当 Emuera 使用代理对时，无法保证其行为完全正确。

	`ENCODETOUNI` 将给定的字符串编码为 Unicode 并返回其字节的数值。
	作为命令使用时：

	- RESULT:0 　字符数
	- RESULT:1～ 字节数值

    式中函数的情况下，将目标位置的字符转换为 Unicode 代码值并返回。位置可以省略，省略时以 `0`（开头）为目标。

!!! hint "提示"

    命令和式中函数均支持。

!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS HOGES = @"%UNICODE(0x2661)%"
        PRINTFORMW %HOGES% %CONVERT(ENCODETOUNI(HOGES), 16)%
    ```
    ``` title="结果"
    ♡ 2661
    ```