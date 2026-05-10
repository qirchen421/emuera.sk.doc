---
hide:
  - toc
---

# MAP Management

| Function name                                                    | Arguments | Return |
| :-------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEM.webp)[`MAP_CREATE`](./MAP_MANAGE.md)  | `string`  | `int`  |
| ![](../assets/images/IconEM.webp)[`MAP_EXIST`](./MAP_MANAGE.md)   | `string`  | `int`  |
| ![](../assets/images/IconEM.webp)[`MAP_RELEASE`](./MAP_MANAGE.md) | `string`  | `1`    |

!!! info "API"

    ```  { #language-erbapi }
    int MAP_CREATE mapName
    int MAP_EXIST mapName
    1 MAP_RELEASE mapName
    ```

    Functions for creating, deleting, and checking existence of `MAP` (associative array, [`Dictionary<string,string>`](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2)).
    
    - `MAP_CREATE`: Creates a `MAP` with `mapName`. Returns `0` if a `MAP` with that name already exists, `1` on success.
    - `MAP_EXIST`: Checks if a `MAP` with `mapName` exists. Returns `1` if it exists, `0` otherwise.
    - `MAP_RELEASE`: Deletes the `MAP` with `mapName`.

    !!! warning "Warning"

        See "[`XML`, `MAP`, `DataTable` Can Be Saved in Save Data](../EMEE/EMEE_Summary.en.md#xmlmapdatatable)" to save created `MAP` to save file. They are automatically deleted when "Return to Title Screen" or [`RESETDATA`](https://osdn.net/projects/emuera/wiki/excom#h5-RESETDATA) is called.

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        PRINTFORML Existence of MAP "MyMap": {MAP_EXIST("MyMap")}
        MAP_CREATE "MyMap"
        PRINTSL RESULT ? "Success" # "Already exists"
        MAP_CREATE "MyMap"
        PRINTSL RESULT ? "Success" # "Already exists"

        RESETDATA ; All MAPs are automatically deleted

        MAP_CREATE "MyMap"
        PRINTSL RESULT ? "Success" # "Already exists"
        PRINTFORML Existence of MAP "MyMap": {MAP_EXIST("MyMap")}
        MAP_RELEASE "MyMap"
        PRINTFORML Existence of MAP "MyMap": {MAP_EXIST("MyMap")}

        ONEINPUT
    ``` 
    ``` title="Result"
    Existence of MAP "MyMap": 0
    Success
    Already exists
    Success
    Existence of MAP "MyMap": 1
    Existence of MAP "MyMap": 0
    ```

### Related
- [MAP Operations](MAP_OPERATION.md)
