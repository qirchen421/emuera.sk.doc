---
hide:
  - toc
---

# SEQUENCEINPUT ![](../assets/images/IconSK.webp)

| Function name                                                         | Arguments | Return   |
| :-------------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/IconSK.webp)[`SEQUENCEINPUT`](./SEQUENCEINPUT.en.md) | `string`  | `integer` |

!!! info "API"

    ```  { #language-erbapi }
	int SEQUENCEINPUT inputString
    ```
    Queues a string to be automatically submitted as user input at the next input wait (INPUT/TINPUT/INPUTS/TINPUTS etc.). After calling `SEQUENCEINPUT`, when the engine next enters WaitInput state, it calls `PressEnterKey` to process the queued string, behaving identically to typing in the textbox and pressing Enter.

    - `\n` in the string splits it into multiple segments, each fed to a separate ERB WaitInput
    - `\e` in the string is recognized as MesSkip (skip waiting). In FORM string parsing, `\e` is preserved as 2 characters (`\` + `e`) so the SEQUENCEINPUT path can correctly identify it
    - Works with both `WaitInput` and `WaitInputNoFocus` (NF suffix commands)
    - Return value is always `0`

!!! warning "Note"

    `CanRestructure = false`, so it is not subject to constant folding.

!!! hint "Hint"

    Supports both command and expression function.

### See Also
- [FLOWINPUT, FLOWINPUTS](FLOWINPUT.en.md)
- [INPUT](INPUT.en.md)
- [INPUTS](INPUT.en.md)
