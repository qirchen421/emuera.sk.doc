---
hide:
  - toc
---

# SAVETEXT

| Function name                                                                                           | Arguments                    | Return |
| :------------------------------------------------------------------------------------------------------ | :--------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`SAVETEXT`](./SAVETEXT.md) | `string`, `int`(, `int`, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SAVETEXT text, fileNo(, forceSavdir, forceUTF8)
    ```
    Saves the text specified by `text` to a file named `textXX.txt` (e.g., if `fileNo` is `2`, it saves to `text02.txt`).  
    This command saves the string as-is without adding or modifying headers or other content.  
    This command is normally affected by the option settings and is created in the sav folder and saved in UTF-8.  
    If a non-zero value is specified for the third argument, it forces saving in the sav folder, ignoring the options. The sav folder is created if needed.  
    If a non-zero value is specified for the fourth argument, it forces saving in UTF-8 encoding, ignoring the options.  
    Returns non-zero on success, and zero on failure.  
    If writing to the same file repeatedly in a short period of time, writing may fail due to antivirus software or other factors, so checking success/failure is important.

!!! info "EM+EE Extension: String Path Overload"

    ```  { #language-erbapi }
	int SAVETEXT text, filePath
    ```
    When the second argument is a **string**, it saves the file using it as the file path. This is an argument type overload added in EM+EE, providing more flexible file saving:

    - Path is specified as a relative path from `Emuera.exe` (`..` is invalid)
    - Only extensions allowed in the "Extensions available for LOADTEXT and SAVETEXT" setting in the config screen or `Emuera.config` can be used (default is `txt` only)
    - If the specified extension is not in the allowed list, it is automatically changed to `.txt`
    - When using a string path, **saving is forced in UTF-8 encoding** (the `forceUTF8` argument is ignored)
    - If the path contains non-existent directories, they are created automatically

    ``` title="emuera.config"
    Extensions available for LOADTEXT and SAVETEXT:txt,xml,json
    ```

    ```  { #language-erbapi title="Example" }
    ; Standard usage: save by number to sav folder
    SAVETEXT "Hello", 0

    ; EM+EE extension: save by path to custom location
    SAVETEXT "Config data", "plugins/config.json"
    SAVETEXT "Log", "log/output.txt"
    ```

!!! hint "Hint"

    Command and expression function both supported.

### See Also
- [LOADTEXT](LOADTEXT.md)
- [OUTPUTLOG](OUTPUTLOG.md)
