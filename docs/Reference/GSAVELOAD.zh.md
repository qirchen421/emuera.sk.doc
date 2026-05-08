---
hide:
  - toc
---

# GSAVE, GLOAD

| 函数名                                                         | 参数         | 返回值 |
| :------------------------------------------------------------- | :----------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GSAVE`](./GSAVELOAD.md) | `int`, `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GLOAD`](./GSAVELOAD.md) | `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GSAVE gID, fileNo
	int GLOAD gID, fileNo
    ```
	`GSAVE` 将指定 `gID` 的 `Graphics` 图像以 `png` 格式输出并保存，文件名带有 `fileNo` 编号。  
	处理成功时，返回非 0 值。  

	`GLOAD` 打开带有 `fileNo` 编号的文件名的图像，并创建 `Graphics`。  
	其行为与 [`GCREATEFORMFILE`](./GCREATEFROMFILE.md) 指令几乎相同，但区别在于它不是从 `resouces` 文件夹内的图像创建，而是从 `GSAVE` 指令保存的图像创建。  
	处理成功时，返回非 0 值。  
	如果指定 `gID` 的 `Graphics` 已经存在，则 `Graphics` 创建失败，此指令不执行任何操作并返回 0 后结束。  

!!! hint "提示"

    同时支持指令和表达式函数两种形式。

### 相关项目
- [GCREATE](GCREATE.md)
- [GCREATEFROMFILE](GCREATEFROMFILE.md)