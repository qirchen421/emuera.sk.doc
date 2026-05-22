---
hide:
  - toc
---

# PRINTC Related

| Function name                                                                                        | Arguments | Return   |
| :---------------------------------------------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/IconEmuera.webp)[<code>PRINT(\|FORM)(C\|LC)(\|K\|D)</code>](./PRINTC.en.md) | `string`  | none     |

!!! info "API"

    ```  { #language-erbapi }
    PRINT(C|L)(|K|D) string
    PRINTFORM(C|L)(|K|D)(|L|W) formedString
    ```
    `PRINTC` family command.
    Pads the string with half-width spaces to match the character count specified in config [`PRINTC character count`](../Emuera/config.en.md#printc-character-count) (default 25) before printing.
    Note that Emuera handles `PRINTC` family commands specially within the button conversion processing of `PRINT`ed strings.

    The keyword in the first set of parentheses specifies the argument type.

    - None - <string>
    - `FORM` - <formed string>

    The keyword in the second set of parentheses specifies the alignment position.

    - `C` - Align right (adds half-width spaces on the left)
    - `LC` - Align left

    The `K` and `D` in the third set of parentheses work the same as the [PRINT](./PRINT.en.md) family.

!!! hint "Hint"

    Command only.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    	PRINTC AAA
    	PRINT |
    	PRINTC BBB
    	PRINT |
    	PRINTC CCC
    	PRINTL |
    	PRINTLC DDD
    	PRINT |
    	PRINTLC EEE
    	PRINT |
    	PRINTLC FFF
    	PRINTL |
    	PRINTC GGG
    	PRINT |
    	PRINTLC HHH
    	PRINT |
    	PRINTC III
    	PRINTW |
    ```
    ``` title="Result"
                          AAA|                      BBB|                      CCC|
    DDD                      |EEE                      |FFF                      |
                          GGG|HHH                      |                      III|

    ```

### Related Items
- [PRINTCPERLINE](PRINTCPERLINE.en.md)
- [PRINTCLENGTH](PRINTCLENGTH.en.md)
