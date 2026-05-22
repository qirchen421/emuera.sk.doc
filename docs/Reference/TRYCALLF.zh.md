---
hide:
  - toc
---

# TRYCALLF

| 函数名                                                       | 参数     | 返回值 |
| :----------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEE.webp)[`TRYCALLF`](./TRYCALLF.zh.md) | `string` | `void`¹ |

!!! info "API"

    ``` { #language-erbapi }
    TRYCALLF funcName
    ```

    附加 `TRY` 功能的 `CALLF` 函数。  
    即便调用的目标函数不存在也不会报错；与此同时，`CALLF` 通过 `RETURNF` 返回的值也被丢弃。

!!! hint "提示"

    仅支持命令式写法。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        TRYCALLF NULL
        TRYCALLF TEST
        WAIT

    @TEST
    #FUNCTION

        PRINT 已调用 "TEST" 函数
        RETURNF 0
    ```

    ``` title="输出结果"
    已调用 "TEST" 函数
    ```

### 相关项目
- [CALLF](CALLF.zh.md)
- [TRYCALLFORMF](TRYCALLFORMF.zh.md)
