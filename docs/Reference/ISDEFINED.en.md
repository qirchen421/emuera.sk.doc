---
hide:
  - toc
---

# ISDEFINED

| Function name                                                 | Arguments  | Return |
| :----------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/IconEM.webp)[`ISDEFINED`](./ISDEFINED.md) | `string` | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int ISDEFINED macroName
    ```

    Returns `1` if a macro with the same name as `macroName` (`#DEFINE XXX`) is defined. Returns `0` if not defined.

!!! hint "Hint"

    Both command and expression function are supported.

!!! example "Example"

    ``` { #language-erh title="DEFINE.ERH" }
    #DEFINE 体力 0
    #DEFINE 気力 1
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM キャラデータ, 2 = 1000, 200

        PRINTFORML {ISDEFINED("体力")} {キャラデータ:体力}
        PRINTFORML {ISDEFINED("気力")} {キャラデータ:気力}
        PRINTFORML {ISDEFINED("攻撃力")}

        ONEINPUT
    ```
    ``` title="Result"
    1 1000
    1 200
    0
    ```

### Related Items
- [Functions/Preprocessor>Lines representing special blocks>\[IF XXX\]](../Emuera/function.en.md#if-xxx-to-elseif-xxx-to-else-to-endif)
