---
hide:
  - toc
---

# GCREATEFROMFILE

| 函数名                                                                         | 参数            | 返回值 |
| :----------------------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GCREATEFROMFILE`](./GCREATEFROMFILE.md) | `int`, `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GCREATEFROMFILE gID, filePath
    ```
    使用相对于`resources`文件夹的路径指定图像文件，打开该图像并创建`Graphics`。  
    与在`resources`文件夹内的csv文件中声明资源不同，图像文件不会被锁定。（在EM+EE中，通过CSV指定的图像也不会被锁定）  
    如果创建成功，则返回非0值。  
    如果指定`gID`的`Graphics`已经存在，则`Graphics`创建失败，此命令不执行任何操作并返回0结束。  
    如果因文件不存在、无法识别为图像、文件过大等原因失败，也返回0。

!!! hint "提示"

    此功能同时支持作为命令和表达式函数使用。

### 相关项目
- [GCREATE](GCREATE.md)