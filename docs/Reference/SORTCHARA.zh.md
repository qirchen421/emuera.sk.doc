---
hide:
  - toc
---

# SORTCHARA

| 函数名                                                             | 参数                       | 返回值 |
| :----------------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SORTCHARA`](./SORTCHARA.zh.md) | `charaVariable`, `keyword` | 无     |

!!! info "API"

    ```  { #language-erbapi }
	SORTCHARA charaVariable, FORWARDorBACK
    ```
	根据任意键对角色列表进行排序。  
	排序键可以是字符串变量（如`NAME`）、数值型变量（如`NO`）或数值数组变量（如`CFLAG`）。  
	`charaVariable`可以省略，省略时则按角色注册编号 (NO)(`NO:XX`)排序。  
	`FORWARD`表示升序，`BACK`表示降序。省略时默认为升序排序。  
	`MASTER`不会被纳入排序对象。  
	此外，`TARGET:0`、`ASSI:0`会自动跟随排序结果，无需在排序后手动操作。  
	但是，使用了`TARGET:1`等变体的场合，需要手动使其跟随排序结果。

    ```  { #language-erbapi }
	;按NO升序排序
	SORTCHARA 
	;按NO降序排序
	SORTCHARA BACK
	;按CFLAG:2升序排序
	SORTCHARA CFLAG:2
	;按NAME降序排序
	SORTCHARA NAME, BACK
	```

	另外，即使`TARGET == -1`，也不会实际去引用`CFLAG:2`等值，因此不会出错。

!!! hint "提示"

    仅支持指令。

### 相关项目
- [SWAPCHARA](SWAPCHARA.zh.md)