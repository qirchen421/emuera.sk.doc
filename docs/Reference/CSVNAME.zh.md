---
hide:
  - toc
---

# CSVNAME系

| 函数名                                                                  | 参数 | 返回值   |
| :---------------------------------------------------------------------- | :--- | :------- |
| ![](../assets/images/IconEmuera.webp)[`CSVNAME`](./CSVNAME.zh.md)       | `int`| `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVCALLNAME`](./CSVNAME.zh.md)   | `int`| `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVNICKNAME`](./CSVNAME.zh.md)   | `int`| `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVMASTERNAME`](./CSVNAME.zh.md) | `int`| `string` |

!!! info "API"

    ```  { #language-erbapi }
	CSVNAME charaNo
	CSVCALLNAME charaNo
	CSVNICKNAME charaNo
	CSVMASTERNAME charaNo
    ```
	这是直接调用 CSV 中定义的 `NAME`、`CALLNAME`、`NICKNAME`、`MASTERNAME` 的函数。  
	当你想要获取未拥有角色的名字等情况时可以使用。  
	第一个参数是角色编号（`NO` 对应的那个）。

!!! hint "提示"

    同时支持作为指令和表达式函数使用。

!!! example "示例"
    ``` { title Chara0.csv }
    番号,0
    名前,絵夢 江良
    呼び名,江良
    ```
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        PRINTFORMW 角色编号0的全名:%CSVNAME(0)% 称呼名:%CSVCALLNAME(0)%
    ``` 
    ``` title="结果"
    角色编号0的全名:絵夢 江良 称呼名:江良
    ```

### 相关项目
- [CSV状态获取类](CSV_STATUS.zh.md)
- [GETCSVNOBY系](GETCSVNOBY.zh.md) — 从名字查编号（逆操作）
- [动态解析与反射](../tutorial/dynamic-reflection.zh.md) — CSVNAME 属于第一代"固定映射"