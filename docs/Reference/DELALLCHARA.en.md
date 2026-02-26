---
hide:
  - toc
---

# DELALLCHARA

| Function name                                                                 | Arguments | Return |
| :----------------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`DELALLCHARA`](./DELALLCHARA.md) | none      | none   |

!!! info "API"

    ```  { #language-erbapi }
	DELALLCHARA
    ```
    Deletes all registered characters. Equivalent to the following script:

    ```  { #language-erbapi }
	REPEAT CHARANUM
		DELCHARA 0
	REND
    ```

!!! hint "Hint"

    Command only.

### Related
- [DELCHARA](DELCHARA.md)
