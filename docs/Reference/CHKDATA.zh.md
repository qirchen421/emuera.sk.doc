---
hide:
  - toc
---

# CHKDATA

| 函数名                                                         | 参数 | 返回值 |
| :------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CHKDATA`](./CHKDATA.zh.md) | `int`| `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CHKDATA saveID
    ```
	将`saveID`所指定编号的文件数据信息赋值给`RESULT:0`和`RESULTS:0`。  
	`RESULT:0`可取得以下值。仅在值为`0`时，可以加载该文件。

    - 0 - 该文件可加载。
    - 1 - 指定文件不存在。
    - 2 - 游戏代码不匹配。（数据中[gamebase.csv的`代码`](../Emuera/variables.md#gamebasecsv)值不同）
    - 3 - 版本不匹配。（数据中[gamebase.csv的`版本`](../Emuera/variables.md#gamebasecsv)值不同，且不属于可兼容的版本）
    - 4 - 文件存在上述之外的其他问题。

    当 `RESULT:0` 为 `0` 时，`RESULTS:0` 会被代入存档数据的注释（在 `@SAVEINFO` 中使用 [`PUTFORM`](./PUTFORM.zh.md) 输入的字符串，或 [`SAVEDATA`](./SAVEDATA.zh.md) 的第二个参数）。  
        当 `RESULT:0` 不为 `0` 时，`RESULTS:0` 会被代入诸如 `存档数据的版本不同` 之类的错误信息。  
        另外，如果在调用 `CHKDATA` 时并非处于向 `RESULT:0` 赋值的过程中（例如 `RESULT:0 = CHKDATA(LOCAL)`），  
        则 `RESULT:0` 会被代入存档数据的时间戳（例如，2009年3月28日13时5分23秒678毫秒会表示为 `RESULT = 20090328130523678`）。  

!!! hint "提示"

    该函数同时支持作为命令和表达式函数使用。

### 相关项目
- [SAVEDATA](SAVEDATA.zh.md)
- [LOADDATA](LOADDATA.zh.md)
- [FIND_CHARADATA](FIND_CHARADATA.zh.md)