---
hide:
  - toc
---

# FIND_CHARADATA

| Function name                                                           | Arguments | Return |
| :---------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`FIND_CHARADATA`](./FIND_CHARADATA.md) | `string`  | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int FIND_CHARADATA filename
    ```
    Searches for files that can be targets of [`LOADCHARA`](./LOADCHARA.md) in the dat folder and assigns the filename (the `*` part of `chara_*.dat`) to `RESULTS`.  
    The return value is the hit count (the number of files found).  
    The argument can specify the `*` part of `chara_*.dat`.  
    For example, `FIND_CHARADATA("*あなた*")` searches for `chara_*あなた*.dat`, and will match `chara_001あなた.dat` or `chara_あなたABC.dat`.  
    If the argument is omitted, it is equivalent to specifying `*`, searching for `chara_*.dat`.  
    Note that `chara_.dat` (where `*` is an empty string) does not match because it cannot be specified in [`LOADCHARA`](./LOADCHARA.md).  
    If the hit count exceeds the number of elements in `RESULTS`, it does not cause an error, but the excess filenames are not assigned.  


!!! hint "Hint"

    Command and expression function both supported.

### See Also
- [SAVECHARA](SAVECHARA.md)
- [LOADCHARA](LOADCHARA.md)
- [CHKCHARADATA](CHKCHARADATA.md)
