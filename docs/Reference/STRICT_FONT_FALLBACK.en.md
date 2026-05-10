---
hide:
  - toc
---

# STRICT_FONT_FALLBACK

| Function name | Arguments | Return |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`STRICT_FONT_FALLBACK`](./STRICT_FONT_FALLBACK.en.md) | `int` | void |

!!! info "API"

    ``` { #language-erbapi }
    STRICT_FONT_FALLBACK value
    ```

    Toggles strict mode for font fallback.

    - Set `value` to `1` to enable strict mode, or `0` to disable it
    - When strict mode is enabled, characters without glyphs in the specified font will not be substituted with fallback fonts and will be displayed as □ (tofu)
    - When strict mode is disabled (default), characters without glyphs are automatically rendered using fallback fonts

!!! hint "Hint"

    Command and expression function both supported.

!!! example "Example"

    ``` { #language-erb }
    ; Enable strict mode (no font fallback)
    STRICT_FONT_FALLBACK 1
    PRINTL This text will not fall back to other fonts
    ; Disable strict mode (default fallback behavior)
    STRICT_FONT_FALLBACK 0
    ```

### See also
- [SETFONT](SETFONT.en.md)
- [SKIA_RENDER](SKIA_RENDER.en.md)
