---
hide:
  - toc
---

# MAP Serialization

| Function name                                                                   | Arguments                | Return   |
| :----------------------------------------------------------------------------- | :---------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`MAP_TOXML`](./MAP_SERIALIZATION.md)   | `string`                | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_FROMXML`](./MAP_SERIALIZATION.md) | `string`, `string`      | `int`    |

!!! info "API"

    ```  { #language-erbapi }
    1. string MAP_TOXML mapName
    2. int MAP_FROMXML mapName, xmlMap
    ```

    Functions to convert between `MAP` (associative array, [`Dictionary<string,string>`](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2)) and `XML`. Can be used to save MAP contents to save files.

    - `MAP_TOXML`: Converts the MAP with `mapName` to XML and returns it.
    - `MAP_FROMXML`: Reads and overwrites key-value pairs from XML into the MAP with `mapName`.

    The XML must be in the following format:
    ``` xml
    <map>
        <p><k>key1</k><v>value1</v></p>
        <p><k>key2</k><v>value2</v></p>
        <p><k>key3</k><v>value3</v></p>
        ....
    </map>
    ```
    
!!! hint "Hint"

    Available as both command and function in expressions

!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM i
        #DIMS xml

        MAP_CREATE "MyMap"
        FOR i, 0, 3
            MAP_SET "MyMap", TOSTR(i), TOSTR(i*100)
        NEXT
        xml '= MAP_TOXML("MyMap")
        PRINTSL xml

        MAP_CLEAR "MyMap"
        FOR i, 0, 3
            MAP_SET "MyMap", TOSTR(i), TOSTR(i)
            PRINTFORML MyMap["%TOSTR(i)%"] = %MAP_GET("MyMap", TOSTR(i))%
        NEXT
        PRINTL

        MAP_FROMXML "MyMap", xml
        FOR i, 0, 3
            PRINTFORML MyMap["%TOSTR(i)%"] = %MAP_GET("MyMap", TOSTR(i))%
        NEXT

        ONEINPUT
    ``` 
    ``` title="Result"
    <map><p><k>0</k><v>0</v></p><p><k>1</k><v>100</v></p><p><k>2</k><v>200</v></p></map>
    MyMap["0"] = 0
    MyMap["1"] = 1
    MyMap["2"] = 2
    
    MyMap["0"] = 0
    MyMap["1"] = 100
    MyMap["2"] = 200
    ```
