---
hide:
  - toc
---

# DELCHARA

| 函数名                                                                                                  | 参数                 | 返回值 |
| :------------------------------------------------------------------------------------------------------ | :------------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`DELCHARA`](./DELCHARA.md) | `int`(, `int`,...)   | 无     |

!!! info "API"

    ```  { #language-erbapi }
	DELCHARA charaID(, charaID,...)
    ```
    删除指定ID的角色。  
	在`Emuera`中，可以一次性删除多个角色。

!!! hint "提示"

    仅支持指令形式。

!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		;假设角色编号0的角色名为浩之，是主人公。
		;假设角色编号3的角色名为智子，编号5的角色名为蕾米，编号6的角色名为琴音
		PRINTFORML 当前存在的角色有{CHARANUM}人。
		ADDCHARA 3
		ADDCHARA 5
		ADDCHARA 6
		PRINTFORML 当前存在的角色有{CHARANUM}人。
		REPEAT CHARANUM
			PRINTFORML {COUNT}号是%NAME:COUNT%。
		REND
		DELCHARA 2
		PRINTFORML 当前存在的角色有{CHARANUM}人。
		REPEAT CHARANUM
		PRINTFORML {COUNT}号是%NAME:COUNT%。
			REND
	``` 
    ``` title="结果"
	当前存在的角色有1人。
	当前存在的角色有4人。
	0号是浩之。
	1号是智子。
	2号是蕾米。
	3号是琴音。
	当前存在的角色有3人。
	0号是浩之。
	1号是智子。
	2号是琴音。
    ```

### 相关项目
- [ADDCHARA](ADDCHARA.md)
- [DELALLCHARA](DELALLCHARA.md)