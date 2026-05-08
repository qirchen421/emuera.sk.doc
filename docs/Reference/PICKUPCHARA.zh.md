---
hide:
  - toc
---

# PICKUPCHARA

| 函数名                                                                 | 参数              | 返回值 |
| :--------------------------------------------------------------------- | :---------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`PICKUPCHARA`](./PICKUPCHARA.md) | `int`(, `int`...) | 无     |

!!! info "API"

    ```  { #language-erbapi }
    PICKUPCHARA charaID(, charaID...)
    ```
    此指令仅保留参数指定的角色，并删除所有其他角色。  
    `MASTER:0`、`TARGET:0`、`ASSI:0` 等会自动跟随调整，指令执行后无需手动重新设置。  
    若为目标角色指定负值将导致错误，但若将 `MASTER`、`TARGET`、`ASSI` 等变量本身设为目标，  
    且这些变量内容为负值时，则作为例外不会出错（会被忽略）。

!!! hint "提示"

    仅支持指令形式。

### 相关项目
- [DELCHARA](DELCHARA.md)
- [DELALLCHARA](DELALLCHARA.md)