---
hide:
  - toc
---

# ASSERT

| 関数名                                                       | 引数  | 戻り値 |
| :----------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ASSERT`](./ASSERT.md) | `int` | none   |

!!! info "API"

    ```  { #language-erbapi }
	ASSERT bool
    ```
	`DEBUG` commands only operate when launched in [debug mode](../Emuera/debug.md).  
	In non-debug mode, nothing is done.  
	In non-debug mode, argument parsing is also not performed, so even if there are issues with the <formedString>, no error will occur.  

	`ASSERT` does nothing when the argument is true (non-zero).  
	When the argument is false (zero), it outputs an error and stops script execution.

!!! hint "Hint"

    Only commands are supported.

### See Also
* [THROW](THROW.md)

