---
hide:
  - toc
---

# LOADTEXT

| 函数名                                                                                            | 参数                  | 返回值   |
| :------------------------------------------------------------------------------------------------ | :-------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`LOADTEXT`](./LOADTEXT.md) | `int`(, `int`, `int`) | `string` |

!!! info "API"

    ```  { #language-erbapi }
	LOADTEXT fileNo{, force_savdir, int force_UTF8}
    ```
	`LOADTEXT` 命令版本会读取 `textXX.sav` 文件并将其结果赋值给 `RESULTS:0`。  
	若指定第二个参数为非 0，则无论选项如何，都会在 sav 文件夹内寻找文件。  
	若指定第三个参数为非 0，则会以 UTF-8 编码格式读取文件。  
	如果失败，`RESULTS:0` 将变为空字符串。  
	也存在同名的表达式中函数，它不操作 `RESULTS:0`，而是将读取结果或空字符串作为返回值返回。

    在 EM+EE 中，如果第一个参数是字符串，则会将第一个参数作为路径来加载文件。路径需指定为相对于 `Emuera.exe` 的相对路径（".." 无效）。此外，只能使用在设置界面或 `Emuera.config` 中 "LOADTEXTとSAVETEXTで使える拡張子" 项目所规定的扩展名（默认为仅 txt）。

    ``` title="emuera.config"
    LOADTEXTとSAVETEXTで使える拡張子:txt,xml,json
    ```

!!! hint "提示"

    该功能同时支持作为命令和表达式函数使用。

### 相关项目
- [SAVETEXT](SAVETEXT.md)