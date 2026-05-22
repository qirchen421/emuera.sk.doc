---
hide:
  - toc
---

# SPRITEANIMECREATE

| Function name                                                              | Arguments               | Return |
| :----------------------------------------------------------------------- | :--------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEANIMECREATE`](./SPRITEANIMECREATE.en.md) | `string`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITEANIMECREATE spriteName, width, height
    ```
	Creates an animated sprite with the resource name specified by `spriteName` and the size specified by `width` and `height`. Returns non-zero on success.  
	Returns 0 if a sprite with the same resource name already exists or if creation fails.  
	To animate, you need to add frames using the [`SPRITEANIMEADDFRAME`](./SPRITEANIMEADDFRAME.en.md) command.  
	For notes on animated sprites, see also [`resources`](../Emuera/resources.en.md).

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [SPRITEANIMEADDFRAME](SPRITEANIMEADDFRAME.en.md)
- [SETANIMETIMER](SETANIMETIMER.en.md)
