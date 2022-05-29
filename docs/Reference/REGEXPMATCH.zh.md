# REGEXPMATCH

| 函数名                                                             | 参数                                              | 返回值 |
| :----------------------------------------------------------------- | :------------------------------------------------ | :----- |
| ![](../assets/images/IconEM.webp)[`REGEXPMATCH`](./REGEXPMATCH.md) | `string`, `string`(, `int`)                       | `int`  |
|                                                                    | `string`, `string`, `ref` `int`, `ref` `string[]` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int REGEXPMATCH str, pattern(, output)
    2. int REGEXPMATCH str, pattern, ref groupCount, ref matches
    ```
    
    如果 `str` 符合 `pattern` 正则表达式规则，返回匹配到的结果数量，否则返回 `0`。
    
    1. `output` 参数为省略或 `0` 以外的整数时，匹配到的子表达式组数保存到 `RESULT:1`，所有的匹配结果全部保存到 `RESULTS` 数组（共「子表达式组数量」×「返回值（匹配结果数量）」个）。
    2. 匹配到的子表达式组数保存到 `groupCount`，所有的匹配结果全部保存到 `matches`（数量同上）。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM groupCount
        #DIMS matches, 10
        #DIM i
        #DIM j
        #DIM count

        REGEXPMATCH "Apple Banana Car", "(.{2})\\b"
        PRINTFORML 匹配结果数量: {RESULT}
        count = REGEXPMATCH("Apple Banana Car", ".(.{2})\\b", groupCount, matches)
        PRINTFORML 匹配结果数量: {count}  子表达式组数量: {groupCount}
        PRINTL
        FOR i, 0, count
            PRINTFORML 匹配结果{i+1}:
            FOR j, 0, groupCount
                PRINTFORML 子表达式组{j}: %matches:(i*groupCount+j)%
            NEXT
            PRINTL
        NEXT

        ONEINPUT
        
    ``` 
    ``` title="输出结果"
    匹配结果数量: 3
    匹配结果数量: 3  子表达式组数量: 2
    
    匹配结果1:
    子表达式组0: ple
    子表达式组1: le
    
    匹配结果2:
    子表达式组0: ana
    子表达式组1: na
    
    匹配结果3:
    子表达式组0: Car
    子表达式组1: ar
    ```
