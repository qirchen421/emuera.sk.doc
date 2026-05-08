---
hide:
  - toc
---

# SAVEGLOBAL

| 函数名                                                               | 参数 | 返回值 |
| :------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SAVEGLOBAL`](./SAVEGLOBAL.md) | 无   | 无     |

!!! info "API"

    ```  { #language-erbapi }
	SAVEGLOBAL
    ```
	保存 `GLOBAL` 和 `GLOBALS` 变量。保存目标为 `global.sav`。  
	如果在 ERH 文件中定义了拥有 `GLOBAL` 及 `SAVEDATA` 标志的变量，也会一并保存。  

!!! hint "提示"

    仅支持命令形式。

### 相关项目
- [LOADGLOBAL](LOADGLOBAL.md)