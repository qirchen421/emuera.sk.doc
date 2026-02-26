---
hide:
  - toc
---

# BEGIN

| Function name                                                   | Arguments      | Return |
| :------------------------------------------------------------- | :------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`BEGIN`](./BEGIN.md) | `idenetifier` | none   |

!!! info "API"

    ```  { #language-erbapi }
	BEGIN identifier
    ```
	`BEGIN` advances the game by calling various system commands.  
	When `BEGIN` is called, the currently executing function ends. Even if called from somewhere via `CALL`, it will not return to the original function.

	`BEGIN TRAIN` starts training.  
	`BEGIN AFTERTRAIN` ends training.  
	`BEGIN ABLUP` calls the ability up screen.  
	`BEGIN TURNEND` ends the current turn.  
	`BEGIN SHOP` calls `SHOP`.

	In Emuera, the keywords `FIRST` and `TITLE` have been added.  
	`BEGIN FIRST` has the same effect as selecting "[0] Start from the beginning" on the title screen, executing the event function `@EVENTFIRST`.  
	`BEGIN TITLE` returns to the title screen.  
	Neither initializes variables, so please execute [`RESETDATA`](./RESETDATA.md) as needed.

!!! hint "Hint"

    Commands only.

### See Also
* [FORCE_BEGIN](FORCE_BEGIN.md)
* [FLOWINPUT](FLOWINPUT.md)
* [CALLEVENT](CALLEVENT.md)
