---
hide:
  - toc
---

# SWAPCHARA

| 函数名                                                             | 参数         | 返回值 |
| :----------------------------------------------------------------- | :----------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SWAPCHARA`](./SWAPCHARA.zh.md) | `int`, `int` | 无     |

!!! info "API"

    ```  { #language-erbapi }
	SWAPCHARA charaID, charaID
    ```
    交换指定两个角色的注册编号。

!!! hint "提示"

    仅支持指令形式。

!!! example "示例"
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		;假设初始只有MASTER
		ADDCHARA 10
		ADDCHARA 11
		PRINTFORML NO:1 = {NO:1}, NO:2 = {NO:2}
		SWAPCHARA 1,2
		PRINTFORMW NO:1 = {NO:1}, NO:2 = {NO:2}
    ``` 
    ``` title="结果"
	NO:1 = 10, NO:2 = 11
	NO:1 = 11, NO:2 = 10
    ```

### 相关项目
- [SORTCHARA](SORTCHARA.zh.md)