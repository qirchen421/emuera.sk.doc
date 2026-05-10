---
hide:
  - toc
---

# BITSET / BITGET / BITTOGGLE / BITINDEXOFFIRST

| Function Name                                                            | Arguments                             | Return Value |
| :----------------------------------------------------------------------- | :------------------------------------ | :----------- |
| ![](../assets/images/IconSK.webp)[`BITSET`](./BITARRAY.en.md)        | `ref int[]`, `int`(, `int`, `int`)    | `int`        |
| ![](../assets/images/IconSK.webp)[`BITGET`](./BITARRAY.en.md)        | `ref int[]`, `int`                    | `int`        |
| ![](../assets/images/IconSK.webp)[`BITTOGGLE`](./BITARRAY.en.md)     | `ref int[]`, `int`                    | `int`        |
| ![](../assets/images/IconSK.webp)[`BITINDEXOFFIRST`](./BITARRAY.en.md) | `ref int[]`(, `int`)                | `int`        |

!!! info "API"

    ``` { #language-erbapi }
    int BITSET arrayRef, idxID{, val, length}
    int BITGET arrayRef, idxID
    int BITTOGGLE arrayRef, idxID
    int BITINDEXOFFIRST arrayRef{, val}
    ```

    Uses integer arrays to simulate bitmaps, providing bit set, read, toggle, and search functionality.

    1. **BITSET** - Sets one or more consecutive bits at the specified position in the bitmap
       - `array`: Bitmap array (passed by REF, will be modified)
       - `idx`: Starting bit index (0-based)
       - `val`: Value to set (0=clear, 1=set, non-zero treated as 1), default 1
       - `length`: Number of consecutive bits to set, default 1
       - Returns 1 on success

    2. **BITGET** - Reads the bit value at the specified position in the bitmap
       - `array`: Bitmap array
       - `idx`: Bit index to read (0-based)
       - Returns the bit value (0 or 1), returns -1 if index is out of range

    3. **BITTOGGLE** - Toggles the bit value at the specified position in the bitmap (0→1, 1→0)
       - `array`: Bitmap array (passed by REF, will be modified)
       - `idx`: Bit index to toggle (0-based)
       - Returns 1 on success, 0 if index is out of range

    4. **BITINDEXOFFIRST** - Finds the position of the first bit with the specified value in the bitmap
       - `array`: Bitmap array
       - `val`: Bit value to search for (0 or 1, non-zero treated as 1), default 0
       - Returns the index of the first matching bit, or -1 if not found

    !!! warning "Notes"
        - Bitmaps use little-endian storage, with each array element storing 64 bits
        - Indexing starts from 0; out-of-range operations are ignored
        - An integer array must be declared as the bitmap storage container before use

!!! hint "Hint"

    Supports both command and expression function syntax.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; Create bitmap array (4 elements = 256 bits)
        #DIM DYNAMIC BIT_ARRAY, 4

        ; BITSET - Set bit
        BITSET BIT_ARRAY, 5, 1, 1
        PRINTFORML BITGET(BIT_ARRAY, 5) = {BITGET(BIT_ARRAY, 5)}

        ; BITGET - Read bit
        PRINTFORML BITGET(BIT_ARRAY, 4) = {BITGET(BIT_ARRAY, 4)}
        PRINTFORML BITGET(BIT_ARRAY, 6) = {BITGET(BIT_ARRAY, 6)}

        ; BITTOGGLE - Toggle bit
        BITTOGGLE BIT_ARRAY, 5
        PRINTFORML BITGET(BIT_ARRAY, 5) = {BITGET(BIT_ARRAY, 5)} (should be 0)

        ; Batch set
        BITSET BIT_ARRAY, 10, 1, 6
        PRINTFORML BITINDEXOFFIRST(BIT_ARRAY, 1) = {BITINDEXOFFIRST(BIT_ARRAY, 1)}

        ; Clear bit
        BITSET BIT_ARRAY, 5, 0, 1
        PRINTFORML BITINDEXOFFIRST(BIT_ARRAY, 1) = {BITINDEXOFFIRST(BIT_ARRAY, 1)}

        ; Out-of-range access
        PRINTFORML BITGET(BIT_ARRAY, 300) = {BITGET(BIT_ARRAY, 300)} (returns -1)

        ONEINPUT
    ```
    ``` title="Result"
    BITGET(BIT_ARRAY, 5) = 1
    BITGET(BIT_ARRAY, 4) = 0
    BITGET(BIT_ARRAY, 6) = 0
    BITGET(BIT_ARRAY, 5) = 0 (should be 0)
    BITINDEXOFFIRST(BIT_ARRAY, 1) = 5
    BITINDEXOFFIRST(BIT_ARRAY, 1) = 10
    BITGET(BIT_ARRAY, 300) = -1 (returns -1)
    ```
