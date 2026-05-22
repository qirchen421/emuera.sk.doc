---
hide:
  - toc
---

# INRANGEARRAY, INRANGECARRAY

| Function name                                                         | Arguments                                   | Return |
| :-------------------------------------------------------------------- | :------------------------------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`INRANGEARRAY`](./INRANGEARRAY.en.md)  | `integerArray`, `int`, `int`(, `int`, `int`) | `int`  |
| ![](../assets/images/IconEmuera.webp)[`INRANGECARRAY`](./INRANGEARRAY.en.md) | `charaArray`, `int`, `int`(, `int`, `int`)   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int INRANGEARRAY integerArray, minValue, maxValue(, start, end)
	int INRANGECARRAY charaArray, minValue, maxValue(, start, end)
    ```
	`INRANGEARRAY` returns the number of elements in the specified array where `minValue <= value < maxValue`.  
	`INRANGECARRAY` returns the number of elements in the specified character array where `minValue <= value < maxValue`.

!!! hint "Hint"

    Both command and expression function forms are available.
