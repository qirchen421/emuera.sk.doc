---
hide:
  - toc
---

# CLEARIMAGELAYER / CLEARIMAGELAYER_ALL

| 函数名                                                                               | 参数    | 返回值 |
| :----------------------------------------------------------------------------------- | :------ | :----- |
| ![](../assets/images/IconSK.webp)[`CLEARIMAGELAYER`](./CLEARIMAGELAYER.zh.md)         | `int`   | 无   |
| ![](../assets/images/IconSK.webp)[`CLEARIMAGELAYER_ALL`](./CLEARIMAGELAYER.zh.md)     | 无    | 无   |

!!! info "API"

    ``` { #language-erbapi }
    CLEARIMAGELAYER depth
    CLEARIMAGELAYER_ALL
    ```

    - **CLEARIMAGELAYER**：清除指定 `depth` 的 [`SETIMAGELAYER`](./SETIMAGELAYER.zh.md) 图层。
    - **CLEARIMAGELAYER_ALL**：清除所有 `SETIMAGELAYER` 图层。

    | 参数 | 类型 | 说明 |
    | :--- | :--- | :--- |
    | `depth` | int | 要清除的图层深度值 |

    !!! warning "注意"
        - 仅支持命令语法，不支持表达式调用。
        - `CLEARIMAGELAYER` 清除的图层可通过再次调用 [`SETIMAGELAYER`](./SETIMAGELAYER.zh.md) 重新创建。
        - 这两个命令仅影响 `SETIMAGELAYER` 创建的图层，不影响 [`CBGSETSPRITE`](./CBGSETSPRITE.zh.md) 或 [`SETBGIMAGE`](./BACKGROUND.zh.md) 创建的背景图。

!!! hint "提示"

    仅命令语法可用。

!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        SETIMAGELAYER "pet_1", 1
        SETIMAGELAYER "pet_2", 2

        ; 清除指定图层
        CLEARIMAGELAYER 1

        ; 检测是否已清除
        PRINTVL EXISTSIMAGELAYER(1)
        PRINTVL EXISTSIMAGELAYER(2)

        ; 清除所有图层
        CLEARIMAGELAYER_ALL
    ```
    ``` title="结果"
    0
    1
    ```

### 相关项
- [SETIMAGELAYER](SETIMAGELAYER.zh.md)
- [EXISTSIMAGELAYER](EXISTSIMAGELAYER.zh.md)
