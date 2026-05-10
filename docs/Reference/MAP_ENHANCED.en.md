---
hide:
  - toc
---

# MAP Enhanced Operations

| Function name                                                                        | Arguments                         | Return   |
| :----------------------------------------------------------------------------------- | :-------------------------------- | :------- |
| ![](../assets/images/IconSK.webp)[`MAP_MERGE`](./MAP_ENHANCED.md)                    | `string`, `string`                | `int`    |
| ![](../assets/images/IconSK.webp)[`MAP_REMOVEIF`](./MAP_ENHANCED.md)                 | `string`, `string`, `string`      | `int`    |
| ![](../assets/images/IconSK.webp)[`MAP_FINDKEY`](./MAP_ENHANCED.md)                  | `string`, `string`, `string`      | `string` |

!!! info "API"

    ```  { #language-erbapi }
    int MAP_MERGE destMapName, srcMapName
    int MAP_REMOVEIF mapName, matchValue, mode
    string MAP_FINDKEY mapName, matchValue, mode
    ```

    MAP enhanced operation functions added in Skia (SkiaSharp version). Provides batch merge, conditional delete, and conditional search.

    - `MAP_MERGE`: Merges all key-value pairs from `srcMapName` into `destMapName`. Keys with the same name are overwritten by the source MAP's values. Returns `1` on success, `0` if either MAP does not exist.
    - `MAP_REMOVEIF`: Batch deletes key-value pairs matching the condition specified by `mode`. Returns the actual number of deletions, or `-1` for an invalid mode.
    - `MAP_FINDKEY`: Searches for keys matching the condition specified by `mode`, returning a comma-separated key list. `RESULT` is set to the match count.

    **Match modes** (shared by `MAP_REMOVEIF` and `MAP_FINDKEY`):

    | Mode | Description |
    | :--- | :---------- |
    | `"KEY_CONTAINS"` | Key contains matchValue |
    | `"KEY_PREFIX"` | Key starts with matchValue |
    | `"KEY_SUFFIX"` | Key ends with matchValue |
    | `"VAL_CONTAINS"` | Value contains matchValue |
    | `"VAL_EQ"` | Value equals matchValue |

    Additional mode for `MAP_REMOVEIF` only:

    | Mode | Description |
    | :--- | :---------- |
    | `"VAL_NE"` | Value does not equal matchValue |

    !!! note "Difference between MAP_FINDKEY and MAP_REMOVEIF"
        `MAP_FINDKEY` does not support the `"VAL_NE"` mode (searching for "not equal" is rarely useful and may return too many results). `MAP_FINDKEY` only searches without deleting, while `MAP_REMOVEIF` searches and deletes.

!!! hint "Hint"

    Available as both command and function in expressions

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; === MAP_MERGE ===
        MAP_CREATE "baseDB"
        MAP_SET "baseDB", "name", "Unknown"
        MAP_SET "baseDB", "level", "1"

        MAP_CREATE "overrideDB"
        MAP_SET "overrideDB", "name", "Hero"
        MAP_SET "overrideDB", "class", "Warrior"

        MAP_MERGE "baseDB", "overrideDB"
        PRINTFORML Merged: %MAP_TOSTRING("baseDB")%

        ; === MAP_FINDKEY ===
        MAP_CREATE "itemDB"
        MAP_SET "itemDB", "sword", "Iron Sword"
        MAP_SET "itemDB", "potion_hp", "Potion"
        MAP_SET "itemDB", "potion_mp", "Potion"
        MAP_SET "itemDB", "shield", "Wooden Shield"

        LOCALS = MAP_FINDKEY("itemDB", "potion_", "KEY_PREFIX")
        PRINTFORML Keys with potion_ prefix: %LOCALS% (count: {RESULT})

        LOCALS = MAP_FINDKEY("itemDB", "Potion", "VAL_CONTAINS")
        PRINTFORML Keys with value containing "Potion": %LOCALS% (count: {RESULT})

        ; === MAP_REMOVEIF ===
        MAP_CREATE "tempDB"
        MAP_SET "tempDB", "a", "1"
        MAP_SET "tempDB", "b", "2"
        MAP_SET "tempDB", "c", "1"
        MAP_SET "tempDB", "d", "3"

        LOCAL = MAP_REMOVEIF("tempDB", "1", "VAL_EQ")
        PRINTFORML Deleted {LOCAL} entries with value "1"
        PRINTFORML Remaining: %MAP_TOSTRING("tempDB")%

        ; === Cleanup ===
        MAP_RELEASE "baseDB"
        MAP_RELEASE "overrideDB"
        MAP_RELEASE "itemDB"
        MAP_RELEASE "tempDB"

        ONEINPUT
    ```
    ``` title="Result"
    Merged: name=Hero,level=1,class=Warrior
    Keys with potion_ prefix: potion_hp,potion_mp (count: 2)
    Keys with value containing "Potion": potion_hp,potion_mp (count: 2)
    Deleted 2 entries with value "1"
    Remaining: b=2,d=3
    ```

### Related
- [MAP Management](MAP_MANAGE.md)
- [MAP Operations](MAP_OPERATION.md)
- [MAP Key/Value Retrieval](MAP_GETKEYS.md)
- [MAP Serialization](MAP_SERIALIZATION.md)
