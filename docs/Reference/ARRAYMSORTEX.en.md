---
hide:
  - toc
---

# ARRAYMSORTEX

| Function name                                                                   | Arguments                                      | Return |
| :----------------------------------------------------------------------------- | :-------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`ARRAYMSORTEX`](./ARRAYMSORTEX.en.md) | `string`, `ref` `string[]`(, `int`, `int`)    | `1`    |
|                                                                              | `ref` `int`, `ref` `string[]`(, `int`, `int`) | `1`    |

!!! info "API"

    ```  { #language-erbapi }
    1. 1 ARRAYMSORTEX indexName, arrayNameList(, sortAscending, size)
    2. 1 ARRAYMSORTEX indexArray, arrayNameList(, sortAscending, size)
    ```
    
    Similar to the original version of [`ARRAYMSORT`](https://osdn.net/projects/emuera/wiki/excom#h5-ARRAYMSORT.20array1.7B.2C.20array2....7D).
    
    1. Sorts the variable array represented by `indexName`, and sorts all arrays in `arrayNameList` in the same order based on this sort.
    2. Sorts `indexArray`, and sorts all arrays in `arrayNameList` in the same order based on this sort.

    If `sortAscending` is not `0` or omitted, sorts in ascending order. Otherwise, sorts in descending order. If `size` is specified, references an array of the specified size instead of ending with `0` or empty string.

!!! hint "Hint"

    Both command and expression function are supported.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        #DIM idx = 4,2,3,1
        #DIMS idxStr = "1","2","3","4"
        #DIM AA = 1,2,3,4
        #DIM BB = 5,3,1,2
        #DIMS Arrays = "idx", "AA", "BB" ; idx not included so idx won't be sorted

        ARRAYMSORTEX idx, Arrays      ; ascending
        PRINTFORML > idx == {idx},{idx:1},{idx:2},{idx:3}
        PRINTFORML > AA == {AA},{AA:1},{AA:2},{AA:3}
        PRINTFORML > BB == {BB},{BB:1},{BB:2},{BB:3}
        PRINTL
        ARRAYMSORTEX "idxStr", Arrays, 0   ; descending
        PRINTFORML > idxStr == %idxStr%,%idxStr:1%,%idxStr:2%,%idxStr:3%
        PRINTFORML > AA == {AA},{AA:1},{AA:2},{AA:3}
        PRINTFORML > BB == {BB},{BB:1},{BB:2},{BB:3}

        ONEINPUT
    ``` 
    ``` title="Result"
    > idx == 1,2,3,4
    > AA == 4,2,3,1
    > BB == 2,3,1,5
    
    > idxStr == 1,2,3,4
    > AA == 1,3,2,4
    > BB == 5,1,3,2
    ```

### Related Items
* [ARRAYSORT](ARRAYSORT.en.md)
