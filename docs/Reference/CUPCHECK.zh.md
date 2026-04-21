---
hide:
  - toc
---

# CUPCHECK

| 函数名                                                           | 参数  | 返回值 |
| :--------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CUPCHECK`](./CUPCHECK.md) | `int` | 无     |

!!! info "API"

    ```  { #language-erbapi }
    CUPCHECK charaID
    ```
    CUPCHECK 是 CUP、CDOWN 对应的 UPCHECK。
    　格式：CUPCHECK <角色>
    　内容：对参数指定的角色执行 UPCHECK，仅此而已。
    当然，不会受到 UP、DOWN 的影响。此外，UPCHECK 会显示结果，但 CUPCHECK 产生的结果不会显示。

!!! hint "提示"

    仅支持指令。

### 相关项目
- [UPCHECK](UPCHECK.md)