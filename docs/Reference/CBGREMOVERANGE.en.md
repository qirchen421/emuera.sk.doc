---
hide:
  - toc
---

# CBGREMOVERANGE

| Function name                                                          | Arguments        | Return |
| :-------------------------------------------------------------------- | :--------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGREMOVERANGE`](./CBGREMOVERANGE.md) | `int`, `int`    | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBGREMOVERANGE zMin, zMax
    ```
	Clears the settings for images set by [`CBGSETG`](./CBGSETG.md), [`CBGSETSPRITE`](./CBGSETSPRITE.md), and [`CBGSETBUTTONSPRITE`](./CBGSETBUTTONSPRITE.md) commands where the Z depth is between `zMin` and `zMax` (inclusive).

!!! hint "Hint"

    Both command and expression function supported.
