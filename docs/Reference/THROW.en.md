---
hide:
  - toc
---

# THROW

| Function name                                                   | Arguments  | Return |
| :------------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`THROW`](./THROW.en.md)   | `string` | none   |

!!! info "API"

    ```  { #language-erbapi }
	THROW formedString
    ```
    Forces an error and displays the error using the string provided as an argument.


!!! hint "Hint"

    Commands only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		THROW Unfortunately, the book of adventure has been lost
    ``` 
    ``` title="Result"
	Now Loading...
	THROW occurred at line 2 of MAIN.ERB
	THROW Unfortunately, the book of adventure has been lost
	THROW content: Unfortunately, the book of adventure has been lost
	Current function: @SYSTEM_TITLE (line 1 of MAIN.ERB)
	Function call stack:
	 ※※Log output to emuera.log ※※

    ```

!!! warning "SK edition only: interplay with `@BEFORE_THROW` — the exception is **still thrown** afterwards"
    In the Skia edition, when a `@BEFORE_THROW` event function is defined, `THROW` calls it first (for cleanup such as emergency saves). However, **the exception is not cancelled when `@BEFORE_THROW` ends** — it is thrown as usual afterwards, the error dialog appears, and the current command processing is interrupted. `@BEFORE_THROW` does not make the exception "never have happened".

    ```
    THROW executed
      ├ already inside @BEFORE_THROW → print message and finish (recursion guard)
      ├ @BEFORE_THROW defined → delay the throw: run @BEFORE_THROW first
      │       → throw the exception after it ends (error dialog + interruption)
      └ not defined → throw directly
    ```

    See [System Flow — Error Handling](../Emuera/system_flow.en.md) and [Event Functions — @BEFORE_THROW](../tutorial/event-functions.en.md#before_throw).

!!! note "Scripting guidance"
    Putting a `THROW` in a `SELECTCASE` `CASEELSE` as a "this should never happen" guard means the player gets an error dialog every time an unknown value reaches it. Validate value domains with static audits during development; keep runtime `THROW` only for truly unrecoverable states. To keep a runtime check without interrupting the player, replace it with a debug-only log (`DEBUGPRINT` family) plus resetting the value so the state machine re-assigns it on its next pass (self-healing).

