---
hide:
  - toc
---

# ADDDEFCHARA

| 函数名                                                                 | 参数 | 返回值 |
| :--------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ADDDEFCHARA`](./ADDDEFCHARA.md) | 无   | 无     |

!!! info "API"

    ```  { #language-erbapi }
    ADDDEFCHARA
    ```
    执行游戏开始时的系统角色添加处理。  
    添加在 `chara0*.csv` 中定义的角色，以及在 `gamebase.csv` 中指定的初始角色。  
    `ADDCHARA 0` 是查找并添加角色 `NO` 为 `0` 的角色，而 `ADDDEFCHARA` 是根据 csv 的编号来添加角色。  
    如果对应的 csv 不存在，则会像 `ADDVOIDCHARA` 一样创建一个空角色。  
    这是为了重现 erameaker 初始化处理的命令，只能在 `@SYSTEM_TITLE` 中使用。

!!! hint "提示"

    仅支持作为命令使用。