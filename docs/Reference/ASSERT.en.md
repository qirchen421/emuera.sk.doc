---
hide:
  - toc
---

# ASSERT

| Function name                                                       | Arguments  | Return |
| :----------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ASSERT`](./ASSERT.en.md) | `int` | none   |

!!! info "API"

    ```  { #language-erbapi }
	ASSERT bool
    ```
	`DEBUG` commands only operate when launched in [debug mode](../Emuera/debug.en.md).  
	In non-debug mode, nothing is done.  
	In non-debug mode, argument parsing is also not performed, so even if there are issues with the <formedString>, no error will occur.  

	`ASSERT` does nothing when the argument is true (non-zero).  
	When the argument is false (zero), it outputs an error and stops script execution.

!!! hint "Hint"

    Only commands are supported.

### See Also
* [THROW](THROW.en.md)

