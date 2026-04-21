---
hide:
  - toc
---

# MATCH

| 函数名                                                     | 参数                         | 返回值 |
| :--------------------------------------------------------- | :--------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`MATCH`](./MATCH.md) | `array`, `any`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int MATCH array, value(, start, end)
    ```
    `MATCH` 函数用于返回 `array` 指定的数组变量中，与 `value` 值相等的元素数量。  
    `value` 的类型必须与 `array` 相同。  
    `array` 指定要搜索的一维数组，并在 `start` 以上、`end` 未满的元素范围内进行搜索。  
    如果省略 `end`，则搜索范围直到数组的最后一个元素。  
    `RESULT = MATCH(X, Y, A, B)` 的结果等同于：

            RESULT = 0
            FOR COUNT, A, B
                IF X:COUNT == Y
                    RESULT += 1
                ENDIF
            REND

    与以下代码等价。（即使指定字符串数组和字符串表达式代替`X`、`Y`也能正常工作）  
    `array`只能指定一维数组变量，不能指定多维数组。  
    当`array`指定为`CFLAG`等角色数组时，仅对指定的角色进行计数。

!!! hint "提示"

    同时支持指令和表达式函数两种形式。

### 相关项目
- [GROUPMATCH](GROUPCHECK.md)