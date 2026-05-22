---
hide:
  - toc
---

# SETANIMETIMER / GETANIMETIMER

| Function name                                                        | Arguments | Return |
| :------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SETANIMETIMER`](./SETANIMETIMER.en.md) | `int`     | none   |
| ![](../assets/images/IconSK.webp)[`GETANIMETIMER`](./SETANIMETIMER.en.md) | none      | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	SETANIMETIMER time
	int GETANIMETIMER
    ```
	Specifies the redraw interval in milliseconds for animated sprites.  
	Normally, Emuera does not redraw during input waits such as [`INPUT`](./INPUT.en.md).  
	By setting a redraw interval with this command, images can be animated during input waits like `INPUT`.  
	Note that no redraw is performed in commands with timeout processing such as [`TINPUT`](./TINPUT.en.md).  
	The actual drawing interval will be slightly slower than the specified time due to computer conditions.  
	Therefore, setting the drawing interval to the same value as the animation's `delay` will cause frequent frame drops.  
	Please specify an interval sufficiently shorter than `delay`.  

	This command is independent of the "Frames per second" setting in config.  
	Also, it is not affected by the redraw suppression effect of the [`REDRAW`](./REDRAW.en.md) command.

	**GETANIMETIMER**: Returns the current animation timer value in milliseconds. Supports both command and expression function forms.

!!! hint "Hint"

    `SETANIMETIMER` is command only. `GETANIMETIMER` supports both command and expression function forms.

!!! skia "Skia Edition Changes"

    | Item | EM+EE | Skia Edition |
    |:---|:---|:---|
    | `SETANIMETIMER` | Expression function (returns: always `1`) | Command (no return value) |
    | `GETANIMETIMER` | ❌ Does not exist | ✅ Expression function (returns current timer value) |

    In EM+EE, `SETANIMETIMER` was implemented as an expression function, allowing calls like `RESULT = SETANIMETIMER(100)`. In the Skia edition, it has been reimplemented as a command, so such usage will cause a compilation error.

### See Also
- [Command vs Expression — The Fundamental Difference Between Two Evaluation Paths](../tutorial/command-vs-expression.en.md) — RESULT pollution issue and why expression functions were reimplemented as commands
- [SPRITEANIMECREATE](SPRITEANIMECREATE.en.md)
- [Skia Edition Specification Changes](../Skia/Skia_Summary.md#changed-commands)
