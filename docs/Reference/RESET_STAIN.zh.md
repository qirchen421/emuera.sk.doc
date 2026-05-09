---
hide:
  - toc
---

# RESET_STAIN

| 函数名 | 参数 | 返回值 |
| :--- | :--- | :--- |
| ![](../assets/images/IconEmuera.webp)[`RESET_STAIN`](./RESET_STAIN.md) | `int`| 无 |

!!! info "API"

    ```  { #language-erbapi }
	RESET_STAIN charaID
    ```
	这是初始化第1个参数所指定角色的`STAIN`的指令。初始值与`BEGIN TRAIN`时赋入的值相同，可通过[`_replace.csv`的`污渍初始值`](../Emuera/replace.zh.md)进行指定。

!!! hint "提示"

    仅支持作为指令使用。

### 相关项目
- [_replace.csv>污渍初始值](../Emuera/replace.zh.md)