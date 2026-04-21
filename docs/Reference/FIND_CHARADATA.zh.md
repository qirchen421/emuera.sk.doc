---
hide:
  - toc
---

# FIND_CHARADATA

| 函数名                                                                       | 参数     | 返回值 |
| :--------------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`FIND_CHARADATA`](./FIND_CHARADATA.md) | `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int FIND_CHARADATA filename
    ```
    在 dat 文件夹中搜索可以作为 [`LOADCHARA`](./LOADCHARA.md) 目标的文件，并将文件名（`chara_*.dat` 中的 `*` 部分）代入 `RESULTS`。  
    返回值是命中数（找到的文件数）。  
    参数可以指定 `chara_*.dat` 中的 `*` 部分。  
    例如，`FIND_CHARADATA("*あなた*")` 会搜索 `chara_*あなた*.dat`，`chara_001あなた.dat` 和 `chara_あなたABC.dat` 会被命中。  
    省略参数时，相当于指定了 `*`，会搜索 `chara_*.dat`。  
    另外，`chara_.dat`（`*` 为空字符串）无法通过 [`LOADCHARA`](./LOADCHARA.md) 指定，因此不会被命中。  
    如果命中数超过 `RESULTS` 的元素数量，不会报错，但超出部分的文件名不会被代入。

!!! hint "提示"

    命令和表达式函数均支持。

### 相关项目
- [SAVECHARA](SAVECHARA.md)
- [LOADCHARA](LOADCHARA.md)
- [CHKCHARADATA](CHKCHARADATA.md)