---
hide:
  - toc
---

# SPRITEDISPOSE

| 函数名                                                                     | 参数     | 返回值 |
| :------------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEDISPOSE`](./SPRITEDISPOSE.md) | `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITDISPOSE spriteName
    ```
	废弃（释放）由 `spriteName` 指定的资源名所对应的精灵。  
	若废弃成功，则返回非零值。  
	此指令不会影响构成该精灵来源的 `Graphics` 等对象。  
	若要释放分配给 `Graphics` 的内存，请使用 [`GDISPOSE`](./GDISPOSE.md) 指令。  

!!! hint "提示"

    此功能同时支持指令形式和表达式函数形式。

### 相关项目
- [SPRITECREAATE](SPRITECREATE.md)
- [SPRITEDISPOSEALL](SPRITEDISPOSEALL.md)