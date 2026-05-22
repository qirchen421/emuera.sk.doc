---
hide:
    - toc
---

# Text Input Field Functions

| Function name                                                       | Arguments              | Return   |
| :----------------------------------------------------------------- | :-------------------- | :------- |
| ![](../assets/images/IconEE.webp)[`SETTEXTBOX`](./TEXTBOX.en.md)    | `string`              | `1`      |
| ![](../assets/images/IconEE.webp)[`GETTEXTBOX`](./TEXTBOX.en.md)    | none                  | `string` |
| ![](../assets/images/IconEM.webp)[`MOVETEXTBOX`](./TEXTBOX.en.md)   | `int`, `int`, `int`  | `1`      |
| ![](../assets/images/IconEM.webp)[`RESUMETEXTBOX`](./TEXTBOX.en.md) | none                  | `1`      |

!!! info "API"

    ``` { #language-erbapi }
    1 SETTEXTBOX text
    string GETTEXTBOX
    1 MOVETEXTBOX xPos, yPos, width
    1 RESUMETEXTBOX
    ```

    - `SETTEXTBOX`: Replaces the text box content with `text`.
    - `GETTEXTBOX`: Returns the string currently entered in the text box.
    - `MOVETEXTBOX`: Moves the text box to the specified position with the specified width when the next `INPUT`/`INPUTS` is executed.
        - Reference position (`xPos`, `yPos`) = (`0`, `0`) is the bottom-left of the screen. Positive `yPos` is upward.
        - When the screen is scrolled up (to view history), the text box temporarily returns to its original position.
        - After `INPUT`/`INPUTS` ends, the text box returns to its original position.
    - `RESUMETEXTBOX`: Cancels the previous `MOVETEXTBOX` and returns the text box to its original position.

!!! hint "Hint"

    Available as both command and function in expressions.
