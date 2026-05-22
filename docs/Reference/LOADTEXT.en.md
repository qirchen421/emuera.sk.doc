---
hide:
  - toc
---

# LOADTEXT

| Function name                                                                                           | Arguments              | Return   |
| :------------------------------------------------------------------------------------------------------ | :--------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`LOADTEXT`](./LOADTEXT.en.md) | `int`(, `int`, `int`) | `string` |

!!! info "API"

    ```  { #language-erbapi }
	LOADTEXT fileNo{, force_savdir, int force_UTF8}
    ```
    The `LOADTEXT` command version reads `textXX.sav` and assigns the result to `RESULTS:0`.  
    If a non-zero value is specified for the second argument, it searches for files in the sav folder, ignoring the options.  
    If a non-zero value is specified for the third argument, it reads the file as being saved in UTF-8 encoding.  
    If it fails, `RESULTS:0` becomes an empty string.  
    There is also an expression function version that returns the read result or an empty string as the return value instead of using `RESULTS:0`.

!!! info "EM+EE Extension: String Path Overload"

    ```  { #language-erbapi }
	LOADTEXT filePath
    ```
    When the first argument is a **string**, it loads the file using it as the file path. This is an argument type overload added in EM+EE, providing more flexible file loading:

    - Path is specified as a relative path from `Emuera.exe` (`..` is invalid)
    - Only extensions allowed in the "Extensions available for LOADTEXT and SAVETEXT" setting in the config screen or `Emuera.config` can be used (default is `txt` only)
    - If the specified extension is not in the allowed list, **an empty string is returned** (unlike SAVETEXT, it is not automatically changed to `.txt`)
    - When using a string path, **file encoding is automatically detected** (the `force_UTF8` argument is ignored)
    - `\r` characters in the read result are automatically removed

    ``` title="emuera.config"
    Extensions available for LOADTEXT and SAVETEXT:txt,xml,json
    ```

    ```  { #language-erbapi title="Example" }
    ; Standard usage: load by number from sav folder
    LOADTEXT 0

    ; EM+EE extension: load by path from custom location
    LOCALS = %LOADTEXT("plugins/config.json")%
    ```

!!! hint "Hint"

    Command and expression function both supported.

### See Also
- [SAVETEXT](SAVETEXT.en.md)
