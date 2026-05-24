---
hide:
  - toc
---

# ADDCHARA

| 函数名                                                                                                  | 参数                 | 返回值 |
| :------------------------------------------------------------------------------------------------------ | :------------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`ADDCHARA`](./ADDCHARA.zh.md) | `int`(, `int`,...)   | 无     |

!!! info "API"

    ```  { #language-erbapi }
    ADDCHARA charaNo(, charaNo,...)
    ```
    从 `CharaXX.csv` 文件中添加指定编号的角色。  
    在 `Emuera` 中，可以一次性添加多个角色。

!!! hint "提示"

    仅支持指令形式。

!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		;假设登记编号 (CharaID) 0的角色名为浩之，是主人公。
		;假设角色注册编号 (NO) 3的角色名为智子，编号5的角色名为蕾米，编号6的角色名为琴音
		PRINTFORML 当前在场角色有{CHARANUM}人。
		ADDCHARA 3
		ADDCHARA 5
		ADDCHARA 6
		PRINTFORML 当前在场角色有{CHARANUM}人。
		REPEAT CHARANUM
			PRINTFORML {COUNT}号是%NAME:COUNT%。
		REND
		DELCHARA 2
		PRINTFORML 当前在场角色有{CHARANUM}人。
		REPEAT CHARANUM
		PRINTFORML {COUNT}号是%NAME:COUNT%。
			REND
	``` 
    ``` title="结果"
	当前在场角色有1人。
	当前在场角色有4人。
	0号是浩之。
	1号是智子。
	2号是蕾米。
	3号是琴音。
	当前在场角色有3人。
	0号是浩之。
	1号是智子。
	2号是琴音。
    ```

### 相关项目
* [DELCHARA](DELCHARA.zh.md)
* [ADDVOIDCHARA](ADDVOIDCHARA.zh.md)
* [ADDCOPYCHARA](ADDCOPYCHARA.zh.md)