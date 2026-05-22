---
hide:
  - toc
---

# LOADCHARA

| 函数名                                                             | 参数     | 返回值 |
| :----------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`LOADCHARA`](./LOADCHARA.zh.md) | `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    LOADCHARA filename
    ```
    第一个参数指定要加载数据的文件名（的一部分）。实际的文件名将是`chara_*.dat`。  
    如果读取失败，则向`RESULT:0`赋值`0`；如果成功，则赋值`1`。  
    在`LOADCHARA`之前，应使用[`CHKCHARADATA`](./CHKCHARADATA.zh.md)函数检查文件的适用性。  
    `LOADCHARA`会根据SAVE中保存的角色数量，注册相应数量的新角色。  
    因此，不会影响已存在的注册角色。  
    要了解添加了多少名角色，请比较加载前后的`CHARANUM`值。

!!! hint "提示"

    仅支持指令形式。

### 相关项目
- [SAVECHARA](SAVECHARA.zh.md)
- [CHKCHARADATA](CHKCHARADATA.zh.md)