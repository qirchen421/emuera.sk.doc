---
hide:
  - toc
---

# TWAIT

| Function name                                                      | Arguments     | Return |
| :----------------------------------------------------------------- | :------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`TWAIT`](./TWAIT.en.md)        | `int`, `int` | none   |

!!! info "API"

    ```  { #language-erbapi }
	TWAIT timeLimit, forceWait
    ```
    The first argument is the time limit, the second argument is the input acceptance flag.  
    Pauses execution until the time limit elapses.  
    The actual behavior changes depending on the input acceptance flag setting:  

    - Input acceptance flag = 0: Accepts input, proceeds even before the time limit if input occurs
    - Input acceptance flag != 0: Does not accept input (can forcibly wait until the time limit)


!!! hint "Hint"

    Command only.

### See Also
- [WAIT](WAIT.en.md)
- [TINPUT](TINPUT.en.md)
