---
hide:
  - toc
---

# SAVETEXT

| 函数名                                                                                            | 参数                            | 返回值 |
| :------------------------------------------------------------------------------------------------ | :------------------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`SAVETEXT`](./SAVETEXT.md) | `string`, `int`(, `int`, `int`) | `int`  |

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

    在EM+EE中，当第二个参数为字符串时，将第二个参数作为路径保存文件。使用相对于`Emuera.exe`的路径指定（".."无效）。此外，只能使用由设置界面或`Emuera.config`中的「LOADTEXTとSAVETEXTで使える拡張子」项目所决定的扩展名。（默认为仅txt）

    ``` title="emuera.config"
    LOADTEXTとSAVETEXTで使える拡張子:txt,xml,json
    ```

!!! hint "提示"

    指令和表达式函数均支持。

### 相关项目
- [OUTPUTLOG](OUTPUTLOG.md)