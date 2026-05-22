---
hide:
  - toc
---

# ADDDEFCHARA

| Function name                                                                 | Arguments | Return |
| :----------------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ADDDEFCHARA`](./ADDDEFCHARA.en.md) | none      | none   |

!!! info "API"

    ```  { #language-erbapi }
	ADDDEFCHARA
    ```
    Command that performs system character addition processing at game start.  
    Adds characters defined in `chara0*.csv` and initial characters specified in `gamebase.csv`.  
    While `ADDCHARA 0` searches for and adds a character with character `NO` of `0`, `ADDDEFCHARA` adds a character by CSV number.  
    If the corresponding CSV does not exist, an empty character is created similar to `ADDVOIDCHARA`.  
    This is a command to reproduce the eramaker initialization process and cannot be used outside of `@SYSTEM_TITLE`.

!!! hint "Hint"

    Command only.
