---
hide:
  - toc
---

# GETPALAMLV, GETEXPLV

| Function name                                                                   | Arguments  | Return |
| :------------------------------------------------------------------------------ | :--------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETPALAMLV`](./GETPALAMLV.en.md) | `int`, `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETEXPLV`](./GETPALAMLV.en.md)   | `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	GETPALAMLV int, maxLV
	GETEXPLV int, maxLV
    ```
	Compares the given value with `PALAMLV` / `EXPLV`, and assigns to `RESULT:0` how far up to which level the argument is greater than or equal to in `PALAMLV` / `EXPLV`.  
	The second argument represents the maximum LV to investigate. Please set the values of `PALAMLV` / `EXPLV` before using this function.

!!! hint "Hint"

    Both command and expression function are supported.
