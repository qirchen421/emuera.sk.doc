---
hide:
  - toc
---

# SPRITEDISPOSEALL

| 函数名                                                                       | 参数  | 返回值 |
| :--------------------------------------------------------------------------- | :-----| :----- |
| ![](../assets/images/IconEE.webp)[`SPRITEDISPOSEALL`](./SPRITEDISPOSEALL.zh.md) | `int` | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int SPRITEDISPOSEALL, containCsvSprite
	```

    销毁所有 SPRITE。若参数为 0，则仅销毁 ERB 上创建的 SPRITE；若参数非 0，则同时销毁 resources 内 CSV 创建的所有 SPRITE。
    返回被销毁的精灵数量。

!!! hint "提示"

    同时支持指令和表达式函数两种形式。

!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        GCREATE 0, 100, 100

        SPRITECREATE "AAA", 0
        SPRITECREATE "BBB", 0
        SPRITECREATE "CCC", 0

        PRINTFORMW {SPRITEDISPOSEALL(0)}
    ```

    ``` title="结果"
    3
    ```

### 相关项目
- [SPRITEDISPOSE](./SPRITEDISPOSE.zh.md)