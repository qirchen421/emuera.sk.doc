---
hide:
  - toc
---

# EXISTFILE

| 函数名                                                         | 参数     | 返回值 |
| :------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEM.webp)[`EXISTFILE`](./EXISTFILE.md) | `string` | `int`  |

!!! info "API"

    ``` { #language-erbapi }
    int EXISTFILE relativePath
    ```

    判断 `Emuera.exe` 同级以及下级子目录（无法使用 `..` 访问父级目录）的相对路径是否存在文件 `relativePath`。  
		如果存在，返回 `1`；否则返回 `0`。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        PRINT csv/VariableSize.csv:
        PRINTSL EXISTFILE("csv/VariableSize.csv") ? " 存在" # " 不存在"
        PRINT erb/!@#$%^%^.txt:
        PRINTSL EXISTFILE("erb/!@#$%^%^.txt") ? " 存在" # " 不存在"

        ONEINPUT
    ```
    ``` title="输出结果"
    csv/VariableSize.csv: 存在
    erb/!@#$%^%^.txt: 不存在
    ```

