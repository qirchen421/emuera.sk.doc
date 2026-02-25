---
hide:
  - toc
---

# EXISTVAR

| Function name                                                 | Arguments  | Return |
| :----------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/IconEM.webp)[`EXISTVAR`](./EXISTVAR.md) | `string` | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int EXISTVAR varName
    ```

    If a variable or constant with the same name as `varName` is defined, returns a positive number depending on the type of variable/constant. Returns `0` if not defined.
    
    - For integer type, return value sets bit 1
    - For string type, return value sets bit 2
    - For constants, return value sets bit 3
    - For 2-dimensional arrays, return value sets bit 4
    - For 3-dimensional arrays, return value sets bit 5

!!! hint "Hint"

    Both command and expression function are supported.

!!! example "Example"

    ``` { #language-erh title="DEFINE.ERH" }
    #DIM CONST BIT = 0, 1, 1p1, 1p2, 1p3, 1p4, 1p5, 1p6, 1p7
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM キャラデータ, 2, 2
        #DIMS 名前

        ; "キャラデータ" is a 2D integer array so sets bit 1, 4
        PRINTFORML {EXISTVAR("キャラデータ")} {BIT:1|BIT:4}
        ; "BIT" is an integer constant array so sets bit 1, 3
        PRINTFORML {EXISTVAR("BIT")} {BIT:1|BIT:3}
        ; "名前" is a string type so sets bit 2
        PRINTFORML {EXISTVAR("名前")} {BIT:2}
        ; "性別" does not exist in the current context
        PRINTFORML {EXISTVAR("性別")}

        ONEINPUT

    @Foo
        #DIMS 性別
    ```
    ``` title="Result"
    9 9
    5 5
    2 2
    0
    ```

### Related Items
- [ENUMVAR](ENUMVAR.md)
