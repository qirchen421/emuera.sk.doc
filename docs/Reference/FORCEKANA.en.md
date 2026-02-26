---
hide:
  - toc
---

# FORCEKANA

| Function name                                                        | Arguments | Return |
| :------------------------------------------------------------------ | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`FORCEKANA`](./FORCEKANA.md) | `int`| none   |

!!! info "API"

    ```  { #language-erbapi }
	FORCEKANA int
    ```
	Specifies hiragana/katakana for display commands.
	Effective with various [`PRINT`](./PRINT.md) commands that include the `K` keyword.
	The argument has the following effects:

	- 0: No conversion
	- 1: Hiragana → Katakana
	- 2: Katakana → Hiragana (full-width only)
	- 3: Katakana → Hiragana (both full-width and half-width)

!!! hint "Hint"

    Command only.
