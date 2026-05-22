---
hide:
  - toc
---

# LOADGLOBAL

| 函数名                                                               | 参数 | 返回值 |
| :------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`LOADGLOBAL`](./LOADGLOBAL.zh.md) | 无   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    LOADGLOBAL
    ```
    加载 `GLOBAL` 与 `GLOBALS`。保存目标文件为 `global.sav`。  
    即使加载失败也不会引发错误。  
    加载成功时，将 `1` 赋值给 `RESULT`；失败时，将 `0` 赋值给 `RESULT`。  
    与普通的存档数据类似，在 `gamebase.csv` 中设置的 [`代码、版本`](../Emuera/variables.md#gamebasecsv) 不正确的文件将无法加载。  
    关于变量 `GLOBAL` 的详细信息，请参阅变量章节。

!!! hint "提示"

    仅支持作为指令使用。

### 相关项目
- [SAVEGLOBAL](SAVEGLOBAL.zh.md)
- [常量·变量>存档间共享的变量](../Emuera/variables.md#_8)