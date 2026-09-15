---
hide:
  - toc
---

# REDRAW, CURRENTREDRAW

| Function name                                                          | Arguments | Return |
| :-------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`REDRAW`](./REDRAW.en.md)         | `int`| none   |
| ![](../assets/images/IconEmuera.webp)[`CURRENTREDRAW`](./REDRAW.en.md) | none | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	REDRAW int
	int CURRENTREDRAW
    ```
	Drawing control command.  
	Specifying `0` for the argument **suppresses non-forced drawing requests** (drawing then happens only at forced drawing opportunities, such as when user input is required).  
	Specifying `1` for the argument performs drawing as usual. In this case, non-forced drawing is skipped when the minimum interval determined by the config [`frames per second`](../Emuera/config.en.md#fps) (`1000 / frames per second` milliseconds) has not elapsed.  
	Adding `2` to the argument (such as `REDRAW 2` or `REDRAW 3`) has the above effects plus forces drawing immediately when the `REDRAW` command is executed.  
	The current `REDRAW` state (`0` or `1`) can be obtained with `CURRENTREDRAW`.

!!! info "Details"

	`REDRAW` only holds two states: `0` (suppressed) and `1` (normal), and `CURRENTREDRAW` also returns only `0` or `1`.  
	`REDRAW 1` merely restores the state; **it does not itself perform any drawing**. If you want drawing to happen immediately after a `REDRAW` command, use `REDRAW 3` (adding `2`).  
	What `REDRAW 0` suppresses is only non-forced drawing. Drawing performed on entering commands that wait for user input (`INPUT`, `INPUTS`, `INPUTSNF`, `TINPUT` family), as well as drawing caused by moving the mouse over a button, are not suppressed.  

!!! warning "Note (batched drawing and scroll position)"

	For screens that "clear first, then redraw" (animation loops, dynamic maps, etc.), wrap the span from clearing to redrawing in `REDRAW 0`, and restore the original state before entering input wait.

	```  { #language-erbapi }
	PREV_REDRAW = CURRENTREDRAW()
	REDRAW 0
	;	CLEARLINE and redraw
	REDRAW PREV_REDRAW
	;	the following input wait forces drawing
	```

	Without batched drawing, the intermediate state — already cleared, not yet redrawn — is actually drawn. Because drawing also synchronizes the scroll position, **the screen can no longer stay pinned to the latest line** (it appears as lines disappearing and returning, or the window jittering).  

	Also, do not use `REDRAW 1` as a closing statement to "restore drawing"; it overwrites the caller's setting. To restore, use the value you saved beforehand (`REDRAW PREV_REDRAW`).  

!!! hint "Hint"

    `CURRENTREDRAW` is supported as an expression function.
