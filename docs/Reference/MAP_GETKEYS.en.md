---
hide:
  - toc
---

# MAP_GETKEYS

| Function name                                                     | Arguments                          | Return   |
| :--------------------------------------------------------------- | :-------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`MAP_GETKEYS`](./MAP_GETKEYS.md) | `string`                          | `string` |
|                                                                  | `string`, `int`                   | `string` |
|                                                                  | `string`, `ref` `string[]`, `int` | `string` |

!!! info "API"

    ```  { #language-erbapi }
    1. string MAP_GETKEYS mapName
    2. string MAP_GETKEYS mapName, doOutput
    3. string MAP_GETKEYS mapName, ref outputArray, doOutput
    ```

    Functions to output keys stored in `MAP` (associative array, [`Dictionary<string,string>`](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2)).

    1. Returns a string in the form "key1,key2,key3,...". Returns an empty string if the MAP itself does not exist. No exception is thrown, so use [`MAP_EXIST`](./MAP_MANAGE.md) if needed.
    2. If `doOutput` is not `0`, sequentially assigns keys to `RESULTS` and returns `RESULTS:0`. No exception is thrown, so use [`MAP_EXIST`](./MAP_MANAGE.md) if needed.
    3. If `doOutput` is not `0`, sequentially assigns keys to `outputArray` and returns an empty string. No exception is thrown, so use [`MAP_EXIST`](./MAP_MANAGE.md) if needed.

!!! hint "Hint"

    Available as both command and function in expressions

!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM i
        #DIMS keys, 5

        MAP_CREATE "MyMap"
        FOR i, 0, 5
            MAP_SET "MyMap", TOSTR(i*100), ""
        NEXT
        PRINTSL MAP_GETKEYS("MyMap")
        PRINTSL MAP_GETKEYS("MyMap", 1)
        FOR i, 0, 5
            PRINTFORML RESULTS:[%RESULTS:i%] key:[%keys:i%] 
        NEXT
        VARSET RESULTS
        PRINTSL MAP_GETKEYS("MyMap", keys, 1)
        FOR i, 0, 5
            PRINTFORML RESULTS:[%RESULTS:i%] key:[%keys:i%] 
        NEXT

        ONEINPUT
    ``` 
    ``` title="Result"
    0,100,200,300,400
    0
    RESULTS:[0] key:[] 
    RESULTS:[100] key:[] 
    RESULTS:[200] key:[] 
    RESULTS:[300] key:[] 
    RESULTS:[400] key:[] 
    
    RESULTS:[] key:[0] 
    RESULTS:[] key:[100] 
    RESULTS:[] key:[200] 
    RESULTS:[] key:[300] 
    RESULTS:[] key:[400] 
    ```

### Related
- [MAP Operations](MAP_OPERATION.md)
