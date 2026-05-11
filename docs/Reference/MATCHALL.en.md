---
hide:
  - toc
---

# MATCHALL / MATCHALLEX

| Function                                                                            | Argument                                      | Return |
| :---------------------------------------------------------------------------------- | :-------------------------------------------- | :----- |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`MATCHALL`](./MATCHALL.en.md)     | `variable`, `any`(, `int`, `int`, `variable`) | `int`  |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`MATCHALLEX`](./MATCHALL.en.md)   | `string`, `any`(, `int`, `int`, `variable`)   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    MATCHALL var, value[, beg, end[, outArr]]
    MATCHALLEX "varName", value[, beg, end[, outArr]]
    ```
    Searches an array for all indices matching a value and returns the match count.

    - First argument: `MATCHALL` takes a variable reference, `MATCHALLEX` takes a string variable name
    - Second argument: Search value (must be the same type as array elements)
    - Third argument (optional): Search start index (default 0)
    - Fourth argument (optional): Search end index (default array length)
    - Fifth argument (optional): Output array variable reference. Matched indices are written to this array (starting from 0)

    Return value: Number of matched elements. Returns 0 if not found.

!!! hint "Hint"

    Supports both command syntax (`MATCHALL ARR, 2`) and expression syntax (`LOCAL = MATCHALL(ARR, 2)`). When called as a command, the result is stored in `RESULT`. Unlike [MATCH](MATCH.en.md), MATCHALL returns all match positions, not just a count.

    The difference between `MATCHALL` and `MATCHALLEX` is similar to `GETNUM` vs `GETNUMB`:
    - `MATCHALL` takes a variable reference as the first argument (compile-time resolution), better performance
    - `MATCHALLEX` takes a string variable name as the first argument (runtime resolution), more flexible

    When the fifth argument array is too small, excess indices are silently discarded, but the return value still reflects the actual match count.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM ARR, 10 = 1, 2, 3, 2, 5, 2, 7, 8, 2, 10
        #DIM IDX, 10

        ; Count only
        LOCAL = MATCHALL(ARR, 2)
        PRINTFORML Found {LOCAL} occurrences of 2

        ; Output indices to IDX
        LOCAL = MATCHALL(ARR, 2, 0, 10, IDX)
        FOR I, 0, LOCAL
            PRINTFORML IDX:{I} = {IDX:I}
        NEXT
    ```
    ``` title="Result"
    Found 4 occurrences of 2
    IDX:0 = 1
    IDX:1 = 3
    IDX:2 = 5
    IDX:3 = 8
    ```

### See Also
- [MATCH](MATCH.en.md) — Count only the first match
- [FINDELEMENT](FINDELEMENT.en.md) — Find position of a single element
