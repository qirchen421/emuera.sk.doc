---
hide:
  - toc
---

# PRINTDATA Related

| Function name                                                                                        | Arguments     | Return   |
| :---------------------------------------------------------------------------------------------------- | :------------ | :------- |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTDATA(\|K\|D)(\|L\|W)</code>](./PRINTDATA.md) | none          | none     |
| ![](../assets/images/IconEmuera.webp)[`DATA`](./PRINTDATA.md)                                        | `string`      | none     |
| ![](../assets/images/IconEmuera.webp)[`DATAFORM`](./PRINTDATA.md)                                     | `formedString` | none     |
| ![](../assets/images/IconEmuera.webp)[`DATALIST`](./PRINTDATA.md)                                    | none          | none     |
| ![](../assets/images/IconEmuera.webp)[`ENDLIST`](./PRINTDATA.md)                                     | none          | none     |
| ![](../assets/images/IconEmuera.webp)[`ENDDATA`](./PRINTDATA.md)                                     | none          | none     |

!!! info "API"

    ```  { #language-erbapi }
    PRINTDATA(|K|D)(|L|W)
    	DATA string
    	DATAFORM formedString
    	DATALIST
    	ENDLIST
    ENDDATA
    ```
    `PRINTDATA` family command. According to the custom readme:

    ```  { #language-erbapi }
    ;*Format*
    PRINTDATA (numericVariable: optional)
    	DATA (string)
    	DATAFORM (FORM string)
    	DATALIST
    		(DATA or DATAFORM list)
    	ENDLIST
    ENDDATA
    ```

    *Content*
    Randomly displays one of the strings specified by DATA, DATAFORM, or DATALIST~ENDLIST with equal probability.
    Allows implementing random display without using IF and RAND.
    If a numeric variable is specified as an argument, the number of the displayed DATA will be stored in that variable.
    Use this when you want to modify subsequent processing based on which string was displayed.
    Within DATALIST~ENDLIST, each DATA or DATAFORM counts as one line.

    The `K`, `D`, `L`, `W` keywords work the same as the [PRINT](./PRINT.md) family.
    If no display data is provided by the `DATA` family inside `PRINTDATA`~`ENDDATA`, it proceeds without doing anything.
    You cannot include any statements other than the above syntax inside `PRINTDATA`~`ENDDATA` or `DATALIST`~`ENDLIST`.

!!! hint "Hint"

    Command only.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    	REPEAT 10
    		PRINTDATA
    			DATA A
    			DATA B
    			DATA C
    			DATA D
    			DATA E
    		ENDDATA
    	REND

    	WAIT
    ```
    ``` title="Result"
    DBDAEACDAE
    ```

### Related Items
- [STRDATA](STRDATA.md)
- [SELECTCASE](SELECTCASE.md)
- [RAND](RAND.md)
