---
hide:
  - toc
---

# OUTPUTLOG

| 函数名                                                                                              | 参数       | 返回值 |
| :-------------------------------------------------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEE.webp)[`OUTPUTLOG`](./OUTPUTLOG.zh.md) | (`string`) | 无     |

!!! info "API"

    ```  { #language-erbapi }
	OUTPUTLOG (filePath)
    ```
    这是日志输出命令 `OUTPUTLOG`。过度使用会缩短磁盘寿命，请适度使用。  
    另外，日志的字符编码是 Unicode。  
    在 EM+EE 中，通过指定参数，可以输出为指定的文件名.扩展名。字面量规则与 `PRINTS` 等相同。  
    `v5fix` 版本修复了可以指定父目录的漏洞。可以指定子目录。

!!! hint "提示"

    仅支持命令形式。

### 相关项目
- [SAVETEXT](SAVETEXT.zh.md)