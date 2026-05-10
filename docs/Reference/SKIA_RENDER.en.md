---
hide:
  - toc
---

# SET_TEXT_DRAWING_MODE / SET_SKIA_QUALITY

| Function Name                                                                        | Arguments                         | Return Value |
| :----------------------------------------------------------------------------------- | :-------------------------------- | :----------- |
| ![](../assets/images/IconSK.webp)[`SET_TEXT_DRAWING_MODE`](./SKIA_RENDER.en.md)      | `int`                             | `int`        |
| ![](../assets/images/IconSK.webp)[`GET_TEXT_DRAWING_MODE`](./SKIA_RENDER.en.md)      | None                              | `int`        |
| ![](../assets/images/IconSK.webp)[`SET_SKIA_QUALITY`](./SKIA_RENDER.en.md)           | `int`(, `int`, `int`)             | `int`        |
| ![](../assets/images/IconSK.webp)[`GET_SKIA_QUALITY`](./SKIA_RENDER.en.md)           | `int`                             | `int`        |

!!! info "API"

    ``` { #language-erbapi }
    SET_TEXT_DRAWING_MODE modeID
    int GET_TEXT_DRAWING_MODE
    SET_SKIA_QUALITY qualityID{, hintingID, edgingID}
    int GET_SKIA_QUALITY typeID
    ```

    Rendering control API added in Skia (SkiaSharp version). Dynamically controls the text rendering pipeline and SkiaSharp quality parameters.

    ### SET_TEXT_DRAWING_MODE / GET_TEXT_DRAWING_MODE

    Dynamically switches the global text rendering pipeline.

    - **mode = 1**: `TEXTRENDERER` — Renders with GDI+ (TextRenderer)
    - **mode = 3**: `SKIASHARP` — Renders with SkiaSharp

    - `SET_TEXT_DRAWING_MODE`: Command only. Returns 1 on success, 0 on failure.
    - `GET_TEXT_DRAWING_MODE`: Supports both command and expression function. Returns the current rendering mode (1=GDI+, 3=SkiaSharp).
    - Default is `SKIASHARP` (3).
    - After switching pipelines, cached fonts may need to be reloaded to take effect.

    ### SET_SKIA_QUALITY / GET_SKIA_QUALITY

    Controls SkiaSharp rendering quality parameters. All parameters are optional; omitted values remain unchanged.

    **SET_SKIA_QUALITY Parameters**:

    | Parameter | Range | Description |
    | :--- | :--- | :--- |
    | `quality` | 0–3 | Image quality level |
    | `hinting` | 0–3 | Font hinting: 0=none, 1=slight, 2=normal, 3=full |
    | `edging` | 0–2 | Anti-aliasing mode: 0=alias, 1=antialias, 2=subpixel |

    **GET_SKIA_QUALITY Parameters**:

    | type | Return Value |
    | :--- | :--- |
    | 0 | Current ImageQuality value |
    | 1 | Current FontHinting value |
    | 2 | Current FontEdging value |

    - `SET_SKIA_QUALITY`: Command only. After calling, FontFactory clears the font cache.
    - `edging=0` (alias) produces a sharp pixel style similar to early Windows fonts.
    - `edging=2` (subpixel) provides the best visual smoothness.

    **Default Values (emuera.config)**:

    | Parameter | Default | Description |
    | :--- | :--- | :--- |
    | ImageQuality | High (3) | Image quality level |
    | FontHinting | None (0) | Font hinting |
    | FontEdging | SubpixelAntiAlias (2) | Anti-aliasing mode |

    !!! warning "Notes"
        - `SET_TEXT_DRAWING_MODE` and `SET_SKIA_QUALITY` are command only.
        - `GET_TEXT_DRAWING_MODE` and `GET_SKIA_QUALITY` support both command and expression function syntax.
        - Raster fonts (MS Gothic, MS Mincho, etc.) automatically use GDI+ rendering when the `render` attribute is not specified. To render with SkiaSharp, it is recommended to use `edging='alias'`.

!!! hint "Hint"

    `SET_TEXT_DRAWING_MODE` and `SET_SKIA_QUALITY` are command only. `GET_TEXT_DRAWING_MODE` and `GET_SKIA_QUALITY` support both command and expression function syntax.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; Check current rendering mode
        PRINTFORML Current mode: {GET_TEXT_DRAWING_MODE()}

        ; Set high quality mode
        SET_SKIA_QUALITY 3, 2, 2
        PRINTFORML ImageQuality: {GET_SKIA_QUALITY(0)}

        ; Pixel-style rendering
        SET_SKIA_QUALITY 3, 0, 0
        HTML_PRINT "Pixel-style text"

        ; Switch to GDI+ mode
        SET_TEXT_DRAWING_MODE 1
        PRINTFORML Mode after switch: {GET_TEXT_DRAWING_MODE()}

        ; Switch back to SkiaSharp mode
        SET_TEXT_DRAWING_MODE 3
    ```

### HTML_PRINT font Tag Extended Attributes

The following attributes have been added to the `<font>` tag in [`HTML_PRINT`](./HTML_PRINT.en.md):

| Attribute | Values | Description |
    | :--- | :--- | :--- |
    | `render` | `'gdi'` / `'skia'` | Specifies the rendering pipeline (overrides global setting) |
    | `edging` | `'alias'` / `'antialias'` / `'subpixel'` | Controls anti-aliasing mode |
    | `hinting` | `'none'` / `'slight'` / `'normal'` / `'full'` | Controls font hinting level |
    | `size` | Positive float (optional `px` suffix) | Specifies font size in pixels |

    - Attributes support **nested inheritance**: inner `<font>` tags inherit unspecified attributes from outer tags.
    - When `render` is omitted, raster fonts automatically use GDI+, while others follow the global setting.
    - The `size` attribute supports floating-point values (e.g., `<font size='12.5'>`).

    ``` { #language-erb title="HTML font attribute examples" }
    HTML_PRINT "<font render='gdi' face='MS Gothic'>[♥] GDI+ rendering</font>"
    HTML_PRINT "<font edging='alias'>Pixel-style text</font>"
    HTML_PRINT "<font size='24'>Large font (24px)</font>"
    HTML_PRINT "<font render='skia' edging='subpixel' hinting='full'>SkiaSharp+high quality</font>"
    ```

### See Also
- [HTML_PRINT](HTML_PRINT.en.md)
- [SETFONT](SETFONT.en.md)
