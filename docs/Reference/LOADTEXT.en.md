---
hide:
  - toc
---

# LOADTEXT

| Function name                                                                                           | Arguments              | Return   |
| :------------------------------------------------------------------------------------------------------ | :--------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`LOADTEXT`](./LOADTEXT.md) | `int`(, `int`, `int`) | `string` |

!!! info "API"

    ```  { #language-erbapi }
	LOADTEXT fileNo{, force_savdir, int force_UTF8}
    ```
    The `LOADTEXT` command version reads `textXX.sav` and assigns the result to `RESULTS:0`.  
    If a non-zero value is specified for the second argument, it searches for files in the sav folder, ignoring the options.  
    If a non-zero value is specified for the third argument, it reads the file as being saved in UTF-8 encoding.  
    If it fails, `RESULTS:0` becomes an empty string.  
    There is also an expression function version that returns the read result or an empty string as the return value instead of using `RESULTS:0`.  

    In EM+EE, if the first argument is a string, it loads the file using the first argument as the path. Specify as a relative path from `Emuera.exe` (".." is invalid). Also, only extensions allowed in the "Extensions available for LOADTEXT and SAVETEXT" setting in the config screen or `Emuera.config` can be used (default is txt only).

    ``` title="emuera.config"
    Extensions available for LOADTEXT and SAVETEXT:txt,xml,json
    ```


!!! hint "Hint"

    Command and expression function both supported.

### See Also
- [SAVETEXT](SAVETEXT.md)
