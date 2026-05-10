---
hide:
  - toc
---

# TEXT_BGC_ON / TEXT_BGC_OFF

| Function name | Arguments | Return |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`TEXT_BGC_ON`](./TEXT_BGC.en.md) | `int`, `int`, `int`, `int` | void |
| ![](../assets/images/IconSK.webp)[`TEXT_BGC_OFF`](./TEXT_BGC.en.md) | none | void |

!!! info "API"

    ``` { #language-erbapi }
    TEXT_BGC_ON R, G, B, Alpha%
    TEXT_BGC_OFF
    ```

    `TEXT_BGC_ON` sets the **entire line** background color for all subsequent lines. `TEXT_BGC_OFF` clears the background color, restoring transparency.

    - `R`, `G`, `B`: Background color RGB values (0–255)
    - `Alpha%`: Opacity (0–100). 0 = fully transparent, 100 = fully opaque
    - The background is drawn as a rectangle spanning the full line width (`ClientWidth`) × line height (`LineHeight`)
    - The background is only drawn when the line contains actual text (empty lines are skipped)
    - The setting remains in effect until `TEXT_BGC_OFF` is called

!!! warning "Note"

    - The background color is applied at the **line** level. For per-character or span-level background colors, use HTML inline styles
    - Nesting (save/restore) is not supported. Setting a new color overwrites the previous one

!!! example "Example"

    ``` { #language-erb }
    ; Display warning text with red background
    TEXT_BGC_ON 255, 0, 0, 30
    PRINTL Warning: HP is low!
    TEXT_BGC_OFF

    ; Semi-transparent blue background
    TEXT_BGC_ON 0, 0, 128, 50
    PRINTL This line has a blue background
    PRINTL This line also has the same background
    TEXT_BGC_OFF
    ```

### See also
- [SETCOLOR](SETCOLOR.en.md)
- [SETBGCOLOR](SETBGCOLOR.en.md)
- [HTML_PRINT](HTML_PRINT.en.md)
