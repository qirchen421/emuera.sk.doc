---
hide:
  - toc
---

# TWAIT

| 函数名                                                     | 参数         | 返回值 |
| :--------------------------------------------------------- | :----------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TWAIT`](./TWAIT.zh.md) | `int`, `int` | 无     |

!!! info "API"

    ```  { #language-erbapi }
	TWAIT timeLimit, forceWait
    ```
	第一参数为限制时间，第二参数为输入接收标志。
	在限制时间经过前，将暂停执行。
	实际行为会根据输入接收标志的指定而变化。

    - 输入接收标志 = 0：接受输入，一旦有输入，即使未到限制时间也会继续执行
    - 输入接收标志 != 0：不接受输入（可以强制等待直到限制时间）

!!! hint "提示"

    仅支持指令。

### 相关项目
- [WAIT](WAIT.zh.md)
- [TINPUT](TINPUT.zh.md)