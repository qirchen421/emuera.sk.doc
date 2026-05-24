---
hide:
  - toc
---

# SAVECHARA

| 函数名                                                             | 参数                                    | 返回值 |
| :----------------------------------------------------------------- | :-------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SAVECHARA`](./SAVECHARA.zh.md) | `string`, `string`, `int`(, `int`...)   | 无     |

!!! info "API"

    ```  { #language-erbapi }
	SAVECHARA filename, memo, charaID{,charaID2...}
    ```
	将指定角色的数据保存到文件的指令。  
	第一个参数指定用于保存数据的文件名（的一部分）。实际的文件名将是 `chara_*.dat`。  
	第二个参数保存一个字符串，作为存档数据的备注。之后可以通过 [`CHKCHARADATA`](./CHKCHARADATA.zh.md) 函数读取。  
	从第三个参数开始，指定要保存的角色的登记编号 (CharaID)。可以指定任意多个，但不能多次指定同一个登记编号 (CharaID)。  
	如果 dat 文件夹不存在，将尝试创建该文件夹。如果创建失败，将发生错误。  
	此外，如果第一个参数是空字符串、第一个参数包含文件名中不能使用的字符等情况，也会发生错误。  

!!! hint "提示"

    仅支持指令形式。

### 相关项目
- [LOADCHARA](LOADCHARA.zh.md)
- [CHKCHARADATA](CHKCHARADATA.zh.md)