---
hide:
  - toc
---

# CHKDATA

| Function name                                                     | Arguments | Return |
| :---------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CHKDATA`](./CHKDATA.md) | `int`     | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CHKDATA saveID
    ```
    Gets information about the save data file with the number specified by `saveID` and stores it in `RESULT:0` and `RESULTS:0`.  
    `RESULT:0` can have the following values. Only when it is `0` can the file be loaded.  

    - 0 - This file can be loaded.
    - 1 - The specified file does not exist.
    - 2 - The game code is different (data with different `code` value from [gamebase.csv](../Emuera/variables.en.md#gamebasecsv-variables)).
    - 3 - The version is different (data with different `version` value from [gamebase.csv](../Emuera/variables.en.md#gamebasecsv-variables), and is not an accepted version).
    - 4 - There is some other problem with the file.

    When `RESULT:0` is `0`, `RESULTS:0` contains the save data comment (the string entered via [`PUTFORM`](./PUTFORM.md) in `@SAVEINFO`, or the second argument of [`SAVEDATA`](./SAVEDATA.md)).  
    When `RESULT:0` is not `0`, `RESULTS:0` contains an error message such as "Save data version is different".  
    Also, if `CHKDATA` is called at a timing that is not in the middle of assigning a value to `RESULT:0` (e.g., `RESULT:0 = CHKDATA(LOCAL)`),  
    `RESULT:0` is assigned the save data timestamp (e.g., if the timestamp is March 28, 2009 13:05:23.678, then `RESULT = 20090328130523678`).  


!!! hint "Hint"

    Command and expression function both supported.

### See Also
- [SAVEDATA](SAVEDATA.md)
- [LOADDATA](LOADDATA.md)
- [FIND_CHARADATA](FIND_CHARADATA.md)
