---
hide:
  - toc
---

# DELCHARA

| Function name                                                                                                | Arguments           | Return |
| :----------------------------------------------------------------------------------------------------------- | :----------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`DELCHARA`](./DELCHARA.md) | `int`(, `int`,...) | none   |

!!! info "API"

    ```  { #language-erbapi }
	DELCHARA charaID(, charaID,...)
    ```
    Deletes the character with the specified ID.  
    In `Emuera`, multiple characters can be deleted at once.


!!! hint "Hint"

    Command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		;Character number 0 is "Hiroyuki" and is the protagonist.
		;Character number 3 is "Tomoko", number 5 is "Remi", and number 6 is "Kotone"
		PRINTFORML There are {CHARANUM} characters.
		ADDCHARA 3
		ADDCHARA 5
		ADDCHARA 6
		PRINTFORML There are {CHARANUM} characters.
		REPEAT CHARANUM
			PRINTFORML {COUNT}: %NAME:COUNT%
		REND
		DELCHARA 2
		PRINTFORML There are {CHARANUM} characters.
		REPEAT CHARANUM
		PRINTFORML {COUNT}: %NAME:COUNT%
			REND
	``` 
    ``` title="Result"
	There are 1 characters.
	There are 4 characters.
	0: Hiroyuki
	1: Tomoko
	2: Remi
	3: Kotone
	There are 3 characters.
	0: Hiroyuki
	1: Tomoko
	2: Kotone
    ```

### Related
- [ADDCHARA](ADDCHARA.md)
- [DELALLCHARA](DELALLCHARA.md)
