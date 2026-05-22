---
hide:
  - toc
---

# LOADTEXT

| 函数名                                                                                            | 参数                  | 返回值   |
| :------------------------------------------------------------------------------------------------ | :-------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`LOADTEXT`](./LOADTEXT.zh.md) | `int`(, `int`, `int`) | `string` |

!!! info "API"

    ```  { #language-erbapi }
	LOADTEXT fileNo{, force_savdir, int force_UTF8}
    ```
	`LOADTEXT` 命令版本会读取 `textXX.sav` 文件并将其结果赋值给 `RESULTS:0`。  
	若指定第二个参数为非 0，则无论选项如何，都会在 sav 文件夹内寻找文件。  
	若指定第三个参数为非 0，则会以 UTF-8 编码格式读取文件。  
	如果失败，`RESULTS:0` 将变为空字符串。  
	也存在同名的表达式中函数，它不操作 `RESULTS:0`，而是将读取结果或空字符串作为返回值返回。

!!! info "EM+EE 扩展：字符串路径重载"

    ```  { #language-erbapi }
	LOADTEXT filePath
    ```
    当第一个参数为**字符串**时，将其作为文件路径加载。这是 EM+EE 新增的参数类型重载，提供更灵活的文件读取能力：

    - 路径为相对于 `Emuera.exe` 的相对路径，`..` 无效
    - 只能使用由设置界面或 `Emuera.config` 中「LOADTEXTとSAVETEXTで使える拡張子」项目所允许的扩展名（默认为仅 `txt`）
    - 如果指定的扩展名不在允许列表中，**直接返回空字符串**（不会自动改为 `.txt`，与 SAVETEXT 行为不同）
    - 使用字符串路径时，**自动检测文件编码**（忽略 `force_UTF8` 参数）
    - 读取结果中的 `\r` 会被自动移除

    ``` title="emuera.config"
    LOADTEXTとSAVETEXTで使える拡張子:txt,xml,json
    ```

    ```  { #language-erbapi title="示例" }
    ; 标准用法：按编号从 sav 文件夹加载
    LOADTEXT 0

    ; EM+EE 扩展：按路径从自定义位置加载
    LOCALS = %LOADTEXT("plugins/config.json")%
    ```

!!! hint "提示"

    该功能同时支持作为命令和表达式函数使用。

### 相关项目
- [SAVETEXT](SAVETEXT.zh.md)
