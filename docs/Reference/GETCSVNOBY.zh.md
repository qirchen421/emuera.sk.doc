---
hide:
  - toc
---

# GETCSVNOBY系

| 函数名                                                                              | 参数     | 返回值 |
| :---------------------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`GETCSVNOBYNAME`](./GETCSVNOBY.zh.md)       | `string` | `int`  |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`GETCSVNOBYNICKNAME`](./GETCSVNOBY.zh.md)   | `string` | `int`  |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`GETCSVNOBYCALLNAME`](./GETCSVNOBY.zh.md)   | `string` | `int`  |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`GETCSVNOBYMASTERNAME`](./GETCSVNOBY.zh.md) | `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    GETCSVNOBYNAME name
    GETCSVNOBYNICKNAME nickname
    GETCSVNOBYCALLNAME callname
    GETCSVNOBYMASTERNAME mastername
    ```
    通过角色的名字反查角色注册编号 (NO)。是 [CSVNAME系](CSVNAME.zh.md) 的逆操作：CSVNAME 从编号查名字，GETCSVNOBY 从名字查编号。

    - `GETCSVNOBYNAME`：通过 `NAME`（角色名）反查
    - `GETCSVNOBYNICKNAME`：通过 `NICKNAME`（昵称）反查
    - `GETCSVNOBYCALLNAME`：通过 `CALLNAME`（称呼）反查
    - `GETCSVNOBYMASTERNAME`：通过 `MASTERNAME`（主人名）反查

    返回值：找到则返回角色注册编号 (NO)（≥0），未找到返回 -1。

    当存在多个同名角色时，返回最后加载的注册编号。

    !!! warning "与 FINDCHARA 的区别"
        `GETCSVNOBY*` 查询的是 CSV 模板数据，角色无需已被 `ADDCHARA` 添加即可查找。
        [FINDCHARA](FINDCHARA.zh.md) 查询的是运行时已添加的角色，返回的是登记编号 (CharaID) 而非注册编号 (NO)。

!!! hint "提示"

    支持命令语法（`GETCSVNOBYNAME "絵夢 江良"`）与表达式语法（`LOCAL = GETCSVNOBYNAME("絵夢 江良")`）两种形式。作为命令调用时结果写入 `RESULT`。查找为 O(1) 复杂度。

!!! example "示例"
    ``` { title Chara0.csv }
    番号,0
    名前,絵夢 江良
    呼び名,江良
    ```
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        LOCAL = GETCSVNOBYNAME("絵夢 江良")
        PRINTFORMW 番号={LOCAL} 呼び名番号={GETCSVNOBYCALLNAME("江良")}
    ``` 
    ``` title="结果"
    番号=0 呼び名番号=0
    ```

### 相关项目
- [CSVNAME系](CSVNAME.zh.md) — 从编号查名字（逆操作）
- [FINDCHARA](FINDCHARA.zh.md) — 从已添加角色中查找
- [动态解析与反射](../tutorial/dynamic-reflection.zh.md) — GETCSVNOBY* 属于 DotNet 扩展"角色名→编号反查"
