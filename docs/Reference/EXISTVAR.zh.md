---
hide:
  - toc
---

# EXISTVAR

| 函数名                                                       | 参数     | 返回值 |
| :----------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEM.webp)[`EXISTVAR`](./EXISTVAR.md) | `string` | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int EXISTVAR varName
    ```

    如果存在与 `varName` 同名的变量 / 常量则返回对应的正整数，否则返回 `0`。
    
    - 为整数类型时，返回值 setbit 1
    - 为字符串类型时，返回值 setbit 2
    - 为常量类型时，返回值 setbit 3
    - 为二维数组时，返回值 setbit 4
    - 为三维数组时，返回值 setbit 5

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erh title="DEFINE.ERH" }
    #DIM CONST BIT = 0, 1, 1p1, 1p2, 1p3, 1p4, 1p5, 1p6, 1p7
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM 角色数据, 2, 2
        #DIMS 名字

        ; 「角色数据」为二维整数类型数组 setbit 1、4
        PRINTFORML {EXISTVAR("角色数据")} {BIT:1|BIT:4} ; 0b1001 == 1 + 8
        ; 「BIT」为整数类型数组常量 setbit 1、3
        PRINTFORML {EXISTVAR("BIT")} {BIT:1|BIT:3} ; 0b0101 == 1 + 4
        ; 「名字」为字符串类型变量 setbit 2
        PRINTFORML {EXISTVAR("名字")} {BIT:2} ; 0b0010 == 2
        ; 当前不存在名为「性别」的变量或常量
        PRINTFORML {EXISTVAR("性别")} ; 「性别」声明于另一个函数(Foo)的作用域

        ONEINPUT

    @Foo
        #DIMS 性别
    ```
    ``` title="输出结果"
    9 9
    5 5
    2 2
    0
    ```

### 相关项目
- [ENUMVAR](ENUMVAR.md)