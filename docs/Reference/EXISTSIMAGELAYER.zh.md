---
hide:
  - toc
---

# EXISTSIMAGELAYER

| 函数名                                                                           | 参数    | 返回值 |
| :------------------------------------------------------------------------------- | :------ | :----- |
| ![](../assets/images/IconSK.webp)[`EXISTSIMAGELAYER`](./EXISTSIMAGELAYER.zh.md) | `int`   | `int`  |

!!! info "API"

    ``` { #language-erbapi }
    int EXISTSIMAGELAYER(depth)
    ```

    检测指定 `depth` 的 [`SETIMAGELAYER`](./SETIMAGELAYER.zh.md) 图层是否存在。

    **参数**：

    | 参数 | 类型 | 说明 |
    | :--- | :--- | :--- |
    | `depth` | int | 图层深度值 |

    **返回值**：存在返回 1，不存在返回 0。

!!! hint "提示"

    支持命令和表达式函数两种形式。

!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        SETIMAGELAYER "pet_1", 1

        IF EXISTSIMAGELAYER(1)
            PRINTL depth=1 的图层已存在
        ELSE
            PRINTL depth=1 的图层不存在
        ENDIF

        ; 作为表达式使用
        #DIM L_COUNT
        FOR L_COUNT, 1, 5
            PRINTVL EXISTSIMAGELAYER(L_COUNT)
        NEXT
    ```
    ``` title="结果"
    depth=1 的图层已存在
    1
    0
    0
    0
    ```

### 相关项
- [SETIMAGELAYER](SETIMAGELAYER.zh.md)
- [CLEARIMAGELAYER](CLEARIMAGELAYER.zh.md)
