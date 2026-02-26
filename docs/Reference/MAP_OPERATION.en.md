---
hide:
  - toc
---

# MAP Operations

| Function name                                                      | Arguments                       | Return   |
| :---------------------------------------------------------------- | :----------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`MAP_GET`](./MAP_OPERATION.md)    | `string`, `string`             | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_HAS`](./MAP_OPERATION.md)    | `string`, `string`             | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_SET`](./MAP_OPERATION.md)    | `string`, `string`, `string`   | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_REMOVE`](./MAP_OPERATION.md) | `string`, `string`             | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_SIZE`](./MAP_OPERATION.md)   | `string`                       | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_CLEAR`](./MAP_OPERATION.md)  | `string`                       | `int`    |

!!! info "API"

    ```  { #language-erbapi }
    string MAP_GET mapName, key
    int MAP_HAS mapName, key
    int MAP_SET mapName, key, value
    int MAP_REMOVE mapName, key
    int MAP_SIZE mapName
    int MAP_CLEAR mapName
    ```

    Functions for manipulating data stored in `MAP` (associative array, [`Dictionary<string,string>`](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2)).
    
    - `MAP_GET`: Returns the value associated with `key` in the `MAP` with `mapName`. Returns an empty string if the key or MAP does not exist. No exception is thrown, so use `MAP_HAS` or [`MAP_EXIST`](./MAP_MANAGE.md) if needed.
    - `MAP_HAS`: Checks if `key` exists in the `MAP` with `mapName`. Returns `1` if it exists, `0` otherwise. Returns `-1` if the MAP itself does not exist.
    - `MAP_SET`: Overwrites the value associated with `key` in the MAP with `mapName` with `value`. If `key` does not exist, it is added and returns `1`. Returns `-1` if the MAP itself does not exist.
    - `MAP_REMOVE`: Removes the value associated with `key` from the MAP with `mapName` and returns `1`. Returns `-1` if the MAP itself does not exist.
    - `MAP_SIZE`: Returns the number of key-value pairs in the MAP with `mapName`. Returns `-1` if the MAP itself does not exist.
    - `MAP_CLEAR`: Removes all key-value pairs from the MAP with `mapName` and returns `1`. Returns `-1` if the MAP itself does not exist.

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 

        MAP_CREATE "MyMap"
        PRINTFORML Size of "MyMap": {MAP_SIZE("MyMap")}
        MAP_SET "MyMap", "Id", "username"
        MAP_SET "MyMap", "PassWord", "123456"
        PRINTFORML ID: %MAP_GET("MyMap", "Id")% Password: %MAP_GET("MyMap", "PassWord")%
        PRINTFORML Has "Name": {MAP_HAS("MyMap", "Name")}
        PRINTFORML Size of "MyMap": {MAP_SIZE("MyMap")}
        MAP_CLEAR "MyMap"
        PRINTFORML Size of "MyMap": {MAP_SIZE("MyMap")}

        ONEINPUT
    ``` 
    ``` title="Result"
    Size of "MyMap": 0
    ID: username Password: 123456
    Has "Name": 0
    Size of "MyMap": 2
    Size of "MyMap": 0
    ```

### Related
- [MAP Creation](MAP_MANAGE.md)
