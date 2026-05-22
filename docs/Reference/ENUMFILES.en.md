---
hide:
  - toc
---

# ENUMFILES

| Function name                                                 | Arguments                 | Return |
| :------------------------------------------------------------ | :------------------------ | :----- |
| ![](../assets/images/IconEM.webp)[`ENUMFILES`](./ENUMFILES.en.md) | `string`(, `string`, `int`) | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int ENUMFILES dir, pattern, option
    ```

    Assigns file names from folder `dir` that match the condition specified by `pattern` to the `RESULTS` array. Returns the number of matching files.

    - `dir` is specified relative to `Emuera.exe` (`..` is invalid).
    - Default value for `pattern` is `*` (all files). See [Directory.EnumerateFiles](https://docs.microsoft.com/en-us/dotnet/api/system.io.directory.enumeratefiles).
    - Default value for `option` is `0` (do not search subfolders). Any other value searches subfolders as well.

!!! hint "Hint"

    Available as both command and function in expressions

!!! example "Example"
    ``` title="Folder structure"
    csv
     - Chara
        - Chara001.csv
     - _Default.config
     - _Fixed.config
     - VariableSize.csv
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM i
        #DIM total

        total = ENUMFILES("csv")
        PRINTFORML Total files (excluding subfolders): {total}
        FOR i, 0, total
            PRINTSL RESULTS:i
        NEXT
        PRINTL

        total = ENUMFILES("csv", "*.csv", 1)
        PRINTFORML CSV file count: {total}
        FOR i, 0, total
            PRINTSL RESULTS:i
        NEXT

        ONEINPUT
    ```
    ``` title="Result"
    Total files (excluding subfolders): 3
    csv\VariableSize.csv
    csv\_Default.config
    csv\_Fixed.config
    
    CSV file count: 2
    csv\VariableSize.csv
    csv\Chara\Chara001.csv
    ```

### Related
- [EXISTFILE](EXISTFILE.en.md)
