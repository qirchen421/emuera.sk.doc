---
hide:
  - toc
---

# BINPUT(S)

| Function name                                                      | Arguments                    | Return    |
| :----------------------------------------------------------------- | :-------------------------- | :-------- |
| ![](../assets/images/IconEE.webp)[`BINPUT`](./BINPUT.en.md)           | (`int`, `int`, `int`)      | `int`     |
| ![](../assets/images/IconEE.webp)[`BINPUTS`](./BINPUT.en.md)         | (`string`, `int`, `int`)   | `string`  |

!!! info "API"

    ``` { #language-erbapi }
	BINPUT (defaultValue, AllowClick, CanSkip)
	BINPUTS (defaultValue, AllowClick, CanSkip)
    ```

    An INPUT(S) that only accepts values that are currently buttonized.  
    Since it is "only accepts buttonized values" rather than "only accepts button input", it is possible to reject unexpected values while supporting both keyboard and mouse operations.  
    If there are no buttons, it proceeds without waiting for input and puts the default value into RESULT(S). If there is no default value either, it causes an error.  
    The arguments follow the same specification as EM+EE's INPUT extension.  


!!! hint "Hint"

    Since it is a command, it cannot be used as an expression function.

### See Also
* [INPUT](INPUT.en.md)
