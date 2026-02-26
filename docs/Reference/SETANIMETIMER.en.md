---
hide:
  - toc
---

# SETANIMETIMER

| Function name                                                    | Arguments | Return |
| :-------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SETANIMETIMER`](./SETANIMETIMER.md) | `int`     | none   |

!!! info "API"

    ```  { #language-erbapi }
	SETANIMETIMER time
    ```
	Specifies the redraw interval in milliseconds for animated sprites.  
	Normally, Emuera does not redraw during input waits such as [`INPUT`](./INPUT.md).  
	By setting a redraw interval with this command, images can be animated during input waits like `INPUT`.  
	Note that no redraw is performed in commands with timeout processing such as [`TINPUT`](./TINPUT.md).  
	The actual drawing interval will be slightly slower than the specified time due to computer conditions.  
	Therefore, setting the drawing interval to the same value as the animation's `delay` will cause frequent frame drops.  
	Please specify an interval sufficiently shorter than `delay`.  

	This command is independent of the "Frames per second" setting in config.  
	Also, it is not affected by the redraw suppression effect of the [`REDRAW`](./REDRAW.md) command.

!!! hint "Hint"

    Command only (not available as expression function).

### Related Items
- [SPRITEANIMECREATE](SPRITEANIMECREATE.md)
