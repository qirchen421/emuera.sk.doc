---
hide:
  - toc
---

# CBGREMOVERANGE

| Function name                                                          | Arguments        | Return |
| :-------------------------------------------------------------------- | :--------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGREMOVERANGE`](./CBGREMOVERANGE.en.md) | `int`, `int`    | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBGREMOVERANGE zMin, zMax
    ```
	Clears the settings for images set by [`CBGSETG`](./CBGSETG.en.md), [`CBGSETSPRITE`](./CBGSETSPRITE.en.md), and [`CBGSETBUTTONSPRITE`](./CBGSETBUTTONSPRITE.en.md) commands where the Z depth is between `zMin` and `zMax` (inclusive).

!!! hint "Hint"

    Both command and expression function supported.
