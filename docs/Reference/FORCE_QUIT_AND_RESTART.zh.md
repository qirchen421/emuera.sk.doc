---
hide:
  - toc
---

# FORCE_QUIT_AND_RESTART

| 函数名                                                                                   | 参数   | 返回值 |
| :--------------------------------------------------------------------------------------- | :----- | :----- |
| ![](../assets/images/IconEE.webp)[`FORCE_QUIT_AND_RESTART`](./FORCE_QUIT_AND_RESTART.md) | `void` | `void` |

!!! info "API"

    ``` { #language-erbapi }
    FORCE_QUIT_AND_RESTART
    ```

    未附加 `WAIT` 的 `QUIT_AND_RESTART`。（即直接重启）

!!! hint "提示"

    只能作为命令使用。  
		未插入输入等待，导致连续执行（死循环）的情况下弹出警告对话框。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        FORCE_QUIT_AND_RESTART
    ```

    ![](../assets/images/FORCE_QUIT_AND_RESTART.png)
