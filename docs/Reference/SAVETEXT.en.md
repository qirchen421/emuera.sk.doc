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

    In EM+EE, if the second argument is a string, it saves the file using the second argument as the path. Specify as a relative path from `Emuera.exe` (".." is invalid). Also, only extensions allowed in the "Extensions available for LOADTEXT and SAVETEXT" setting in the config screen or `Emuera.config` can be used (default is txt only).

    ``` title="emuera.config"
    Extensions available for LOADTEXT and SAVETEXT:txt,xml,json
    ```


!!! hint "Hint"

    Command and expression function both supported.

### See Also
- [OUTPUTLOG](OUTPUTLOG.md)
