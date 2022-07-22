# ENUMFILES

| 函数名                                                         | 参数                        | 返回值 |
| :------------------------------------------------------------- | :-------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`ENUMFILES`](./ENUMFILES.md) | `string`(, `string`, `int`) | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int ENUMFILES dir, pattern, option
    ```

    将文件夹`dir`下满足`pattern`规则的文件名代入`RESULTS`数组。返回符合条件的文件数。

    - `dir`必须为`Emuera.exe`同级的相对路径(试图使用`..`回到更上级的目录是无效的)。
    - `pattern`的默认值是`*`(匹配所有文件)，详细用法请参考[Directory.EnumerateFiles](https://docs.microsoft.com/en-us/dotnet/api/system.io.directory.enumeratefiles?view=netframework-4.8)。
    - `option`的默认值为`0`，不搜索子文件夹。为其它值时则也会搜索子文件夹下的文件。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"
    ``` title="文件夹的结构"
    csv
     - Chara
        - Chara001.csv
     - _Default.config
     - _Fixed.config
     - VariableSize.csv
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM i
        #DIM total

        total = ENUMFILES("csv")
        PRINTFORML 所有文件数目（子文件夹除外）：{total}
        FOR i, 0, total
            PRINTSL RESULTS:i
        NEXT
        PRINTL

        total = ENUMFILES("csv", "*.csv", 1)
        PRINTFORML CSV文件数目：{total}
        FOR i, 0, total
            PRINTSL RESULTS:i
        NEXT

        ONEINPUT
    ```
    ``` title="输出结果"
    所有文件数目（子文件夹除外）：3
    csv\VariableSize.csv
    csv\_Default.config
    csv\_Fixed.config
    
    CSV文件数目：2
    csv\VariableSize.csv
    csv\Chara\Chara001.csv
    ```
