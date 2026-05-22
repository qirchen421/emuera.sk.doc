---
hide:
  - toc
---

# SAVETEXT

| 函数名                                                                                            | 参数                            | 返回值 |
| :------------------------------------------------------------------------------------------------ | :------------------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`SAVETEXT`](./SAVETEXT.zh.md) | `string`, `int`(, `int`, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SAVETEXT text, fileNo(, forceSavdir, forceUTF8)
    ```
	将 `text` 指定的文本保存到文件名为 `textXX.txt` 的文件中（例如，如果 `fileNo` 为 `2`，则文件名为 `text02.txt`）。  
	此命令会原样保存字符串，不会为文本添加或更改任何头部信息。  
	此命令通常受选项设置影响，可能会在 sav 文件夹内创建文件，或以 `UTF-8` 编码保存。  
	如果在第 3 个参数中指定了非 0 值，则会忽略选项设置，强制在 sav 文件夹内保存。sav 文件夹会在需要时自动创建。  
	如果在第 4 个参数中指定了非 0 值，则会忽略选项设置，强制以 UTF-8 编码保存。  
	成功时返回非 0 值，失败时返回 0。  
	如果在短时间内重复向同一文件写入，可能会因防病毒软件等影响而导致写入失败，因此检查操作是否成功非常重要。

!!! info "EM+EE 扩展：字符串路径重载"

    ```  { #language-erbapi }
	int SAVETEXT text, filePath
    ```
    当第二个参数为**字符串**时，将其作为文件路径保存。这是 EM+EE 新增的参数类型重载，提供更灵活的文件保存能力：

    - 路径为相对于 `Emuera.exe` 的相对路径，`..` 无效
    - 只能使用由设置界面或 `Emuera.config` 中「LOADTEXTとSAVETEXTで使える拡張子」项目所允许的扩展名（默认为仅 `txt`）
    - 如果指定的扩展名不在允许列表中，会自动改为 `.txt`
    - 使用字符串路径时，**强制以 UTF-8 编码保存**（忽略 `forceUTF8` 参数）
    - 如果路径中包含不存在的目录，会自动创建

    ``` title="emuera.config"
    LOADTEXTとSAVETEXTで使える拡張子:txt,xml,json
    ```

    ```  { #language-erbapi title="示例" }
    ; 标准用法：按编号保存到 sav 文件夹
    SAVETEXT "Hello", 0

    ; EM+EE 扩展：按路径保存到自定义位置
    SAVETEXT "配置数据", "plugins/config.json"
    SAVETEXT "日志", "log/output.txt"
    ```

!!! hint "提示"

    指令和表达式函数均支持。

### 相关项目
- [LOADTEXT](LOADTEXT.zh.md)
- [OUTPUTLOG](OUTPUTLOG.zh.md)
