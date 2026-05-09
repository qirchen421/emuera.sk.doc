---
hide:
  - toc
---

# SAVEDATA

| 函数名                                                           | 参数            | 返回值 |
| :--------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`SAVEDATA`](./SAVEDATA.md) | `int`, `string` | 无     |

!!! info "API"

    ```  { #language-erbapi }
	SAVEDATA saveID, saveInfo
    ```
	将当前状态保存到由 `saveID` 指定编号的文件中。  
	`SAVEDATA` 命令不会调用 `@SAVEINFO`，因此无法使用 [`PUTFORM`](./PUTFORM.md) 添加注释。  
	作为替代，可以通过第二个参数 `saveInfo` 来指定注释。  
	(从 1.704 版本开始，不仅可以使用字符串变量，还可以使用字符串表达式) 示例如下：

    ```  { #language-erbapi }
	GETTIME
	STR:0 = %RESULTS:0% {DAY+1}日目
	SAVEDATA 14, STR:0
	SAVEDATA 15, RESULTS:0 + " " + @"{DAY+1}日目"
    ```

		结果（加载画面）
		[13] ----
		[14] 2009年03月28日 00:31:27 第1天
		[15] 2009年03月28日 00:31:27 第1天
		[16] ----

	本命令不会执行覆盖确认等操作，如有需要请在ERB侧自行准备。  
	可以使用[`CHKDATA`](./CHKDATA.md)命令检查是否已存在数据。  
	`SAVEDATA`命令（与[`SAVEGAME`](./SAVEGAME.md)命令不同）可以在脚本的任何位置调用。

!!! info "EM+EE 扩展：存档格式增强"

    EM+EE 扩展了 `SAVEDATA` 的存档格式，在标准存档数据之后额外保存 EM 专属数据：

    - **Map 数据**：标记为 `SAVEDATA` 关键字的 [`MAP`](./MAP.md) 字典
    - **Xml 数据**：标记为 `SAVEDATA` 关键字的 XML 文档
    - **DataTable 数据**：标记为 `SAVEDATA` 关键字的 DataTable 表

    这些数据在 [`LOADDATA`](./LOADDATA.md) 加载时会被先清除再从存档恢复，确保存档切换时数据一致性。

!!! hint "提示"

    仅支持命令形式。

### 相关项目
- [LOADDATA](LOADDATA.md)
- [CHKDATA](CHKDATA.md)
