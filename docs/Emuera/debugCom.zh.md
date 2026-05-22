---
hide:
  - toc
---

# 调试命令
※默认情况下无法使用调试命令。
如有需要，请在帮助的设置中勾选`使用调试命令`。

**※此功能是调试模式尚未出现版本的简易功能。**
**建议现版本调试使用[调试模式](debug.zh.md)启动。**

在脚本执行中（游戏中），输入以`@`开头的字符串时会作为调试命令接收。
是否区分大小写取决于`emuera.config`中的`忽略大小写差异`设置。

调试命令使用与ERB相同的格式指定。
例如，

	@MONEY = 10000
	@PRINTV FLAG:200
	@PRINTFORM %NAME:MASTER%的CFAG(1) = {CFLAG:MASTER:1}
	@ADDCHARA 1

可以这样书写。
另外，仅输入变量或表达式时，会输出它们的值
（下面@后面的半角空格不是必需的）

	@ FLAG:200
	@ @"%NAME:MASTER%的CFAG(1) = {CFLAG:MASTER:1}"

但是无法使用改变脚本流程的指令如`[IF](../Reference/IF.zh.md)`、`[CALL](../Reference/CALL.zh.md)`，以及要求输入的指令如`[INPUT](../Reference/INPUT.zh.md)`、`[WAIT](../Reference/WAIT.zh.md)`。

还有一些ERB中没有的指令。

	@REBOOT

重新启动并重新读取`emuera.config`、csv和erb文件。

	@OUTPUT

将当前日志输出到`emuera.log`。如果已存在则会覆盖。
这与`OUTPUTLOG`指令相同操作。

	@EXIT

退出Emuera。与`[QUIT](../Reference/QUIT.zh.md)`指令相同操作。

	@CONFIG

打开设置对话框。

	@DEBUG

打开调试对话框。这仅在以调试模式启动时有效。

除上述外，即执行普通ERB指令时，MASTER的姓名和称呼名会被强制改为`作弊`。
这是因为调试命令也具有作弊的性质，为防止滥用而采取的措施。