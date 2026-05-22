---
hide:
  - toc
---

# ONEINPUT(S)

| Function name                                                        | Arguments           | Return    |
| :------------------------------------------------------------------- | :------------------ | :-------- |
| ![](../assets/images/IconEmuera.webp)[`ONEINPUT`](./ONEINPUT.en.md)   | `int`(, `int`)     | `int`     |
| ![](../assets/images/IconEmuera.webp)[`ONEINPUTS`](./ONEINPUT.en.md)  | `string`(, `int`)  | `string`  |

!!! info "API"

    ```  { #language-erbapi }
	ONEINPUT defaultValue
	ONEINPUTS defaultValue
    ```
    Single-character-only input auto-processing command `ONEINPUT`, `ONEINPUTS`.  
    Format: `ONEINPUT` or `ONEINPUTS`.  
    Content: Accepts only one character of input, automatically proceeds to the next process upon input.  

    If multiple digits (or multiple characters) are pasted using paste etc., only the first digit (character) is processed as input.  
    As with `INPUT` and `INPUTS`, you can set a default input value using arguments for when an empty string is entered.  
    However, if a negative value is specified in `ONEINPUT` or an empty string is specified in `ONEINPUTS`, the argument becomes invalid and behaves the same as when no argument is specified.  
    Also, if multiple digits (or multiple characters) are specified as arguments, only the first digit (character) becomes the default input value.  
    If the argument is omitted and an empty string is entered, `ONEINPUT` requests re-input as usual, and `ONEINPUTS` assigns an empty string to `RESULTS` and proceeds to the next process.  
    In the case of `ONEINPUTS`, pressing Enter with an empty string is treated as entering an empty string.  

    Note that when these commands are used, even if keyboard macros are configured in Emuera's CONFIG settings, they may not work properly - this is by design.  

    Also, in `ONEINPUTS`, macro expressions can be used as with [`INPUTS`](./INPUT.en.md).  
    To use '()' as a string, escape it using '.'


!!! hint "Hint"

    Command only.

### See Also
- [INPUT](INPUT.en.md)
- [WAITANYKEY](WAITANYKEY.en.md)
