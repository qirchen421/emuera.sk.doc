---
hide:
  - toc
---

# VARSETEX

| Function name                                                   | Arguments                           | Return |
| :------------------------------------------------------------- | :---------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`VARSETEX`](./VARSETEX.en.md) | `string`, `any`(, `int`, `int`, `int`) | `1`    |

!!! info "API"

    ```  { #language-erbapi }
    1 VARSETEX varName, value(, setAllDim, from, to)
    ```
    
    Similar to the original version of [`VARSET`](VARSET.en.md). Instead of directly using an identifier, assigns `value` to the array of the variable name represented by `varName`.  
	If `setAllDim` is not `0` or omitted, assigns `value` to all dimensions of the array. Otherwise, only assigns to the lowest dimension.  
	You can specify the start and end positions of elements with `from` and `to` (elements at the `to` position are not included). If `to` is omitted, assignment continues to the end of that dimension's array. If `from` is omitted, assignment starts from position `0` of that dimension's array.

!!! hint "Hint"

    Both command and expression function are supported.


!!! example "Example" 
    
    ``` { #language-erh title="DEFINE.ERH" }
    #DIM 整数配列 = 1, 2, 3, 4, 5, 6
    #DIM 整数配列2D, 3, 4
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS ローカル文字列 = "Cat1", "Cat2", "Cat3"
        #DIM i
        #DIM j

        ; Second argument omission: planned for v8
        ; VARSETEX "ローカル文字列"
        VARSETEX "ローカル文字列", "dog"
        FOR i, 0, 3
            PRINTS ローカル文字列:i+" "
        NEXT
        PRINTL
        ; For 1D arrays, third argument can be any value
        VARSETEX "整数配列", -1, 0, 3, 5
        FOR i, 0, 6
            PRINTFORM {整数配列:i} 
        NEXT
        PRINTL
        ; Start position is index 1, row 2 (actually starts at index 2 because 4th arg is 1)
        ; Third arg is 0 so only array 1 is valid
        VARSETEX "整数配列2D:1:2", -1, 0, 1
        FOR j, 0, 3
            PRINTFORM Array{j} -> 
            FOR i, 0, 4
                PRINTFORM {整数配列2D:j:i, 2, RIGHT} 
            NEXT
            PRINTL
        NEXT
        PRINTL
        VARSET 整数配列2D

        ; Third argument omitted
        VARSETEX "整数配列2D:1:2", -1
        FOR j, 0, 3
            PRINTFORM Array{j} -> 
            FOR i, 0, 4
                PRINTFORM {整数配列2D:j:i, 2, RIGHT} 
            NEXT
            PRINTL
        NEXT

        ONEINPUT
    ``` 
    ``` title="Result"
    dog dog dog 
    1 2 3 -1 -1 6 
    Array0 ->  0  0  0  0 
    Array1 ->  0  0 -1 -1 
    Array2 ->  0  0  0  0 
    
    Array0 ->  0  0 -1 -1 
    Array1 ->  0  0 -1 -1 
    Array2 ->  0  0 -1 -1 
    ```

### Related Items
- [VARSET](VARSET.en.md)
