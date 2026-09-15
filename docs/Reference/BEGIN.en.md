---
hide:
  - toc
---

# BEGIN

| Function name                                                   | Arguments      | Return |
| :------------------------------------------------------------- | :------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`BEGIN`](./BEGIN.en.md) | `idenetifier` | none   |

!!! info "API"

    ```  { #language-erbapi }
	BEGIN identifier
    ```
	`BEGIN` advances the game by calling various system commands.  
	When `BEGIN` is called, **the current function** ends immediately — the lines after `BEGIN` are never executed. It does **not**, however, break the call chain: the caller keeps running, control unwinds level by level, and the state transition happens only once the whole call stack is empty (at which point the engine invokes the event function for the target state). Do not read it as "everything stops here". `BEGIN` does not modify `RESULT` either.

	`BEGIN TRAIN` starts training.  
	`BEGIN AFTERTRAIN` ends training.  
	`BEGIN ABLUP` calls the ability up screen.  
	`BEGIN TURNEND` ends the current turn.  
	`BEGIN SHOP` calls `SHOP`.

	In Emuera, the keywords `FIRST` and `TITLE` have been added.  
	`BEGIN FIRST` has the same effect as selecting "[0] Start from the beginning" on the title screen, executing the event function `@EVENTFIRST`.  
	`BEGIN TITLE` returns to the title screen.  
	Neither initializes variables, so please execute [`RESETDATA`](./RESETDATA.en.md) as needed.

!!! hint "Hint"

    Commands only.

### See Also
* [FORCE_BEGIN](FORCE_BEGIN.en.md)
* [FLOWINPUT](FLOWINPUT.en.md)
* [CALLEVENT](CALLEVENT.en.md)
