# HTML Tag Syntax Reference

!!! info "Variant Differences"

    - **Reference Category**: [HTML related](../Reference/README.en.md#html-related) / [Image processing related](../Reference/README.en.md#image)

    This page provides an integrated explanation of Emuera's HTML tag syntax. Variant tags are appended to each attribute to indicate which variant added it.

    | Tag | Variant |
    |-----|---------|
    | *(none)* | Supported since original Emuera |
    | **EM+EE** | Added in EM+EE |
    | **DotNet** | Added in EmueraDotNet |
    | **Skia** | Added in Skia variant |

---

## Overview

This is the syntax reference for HTML tags usable with `HTML_PRINT`, `HTML_PRINTL`, and related commands.
Tags use the format `<tagname attribute='value'>text</tagname>`. Attribute values must be enclosed in `'～'` or `"～"` (single quotes recommended to distinguish from Emuera strings).

`HTML_PRINT` rendering is not affected by `ALIGNMENT`, `SETFONT`, `COLOR`, or `FONTSTYLE` commands. These effects must be specified via tags.

---

## Text Structure Tags

### `<p>` — Paragraph Alignment

```html
<p align='～'>text</p>
```

| Attribute | Required | Description |
|-----------|----------|-------------|
| `align` | ✅ | `left` / `center` / `right` |

`</p>` is optional. The `p` tag can only be placed before text, and `</p>` only at the end.

### `<nobr>` — No Break

```html
<nobr>text</nobr>
```

Equivalent to `PRINTSINGLE`. Prevents implicit line breaks when exceeding the drawing area (explicit `<br>` breaks still work). `</nobr>` is optional.

### `<br>` — Line Break

A display-line break. Multiple `<br>` tags still count as one line for `CLEARLINE`/`LINECOUNT`.

---

## Text Decoration Tags

### `<font>` — Font Specification

```html
<font face='～' color='～' bcolor='～'>text</font>
```

| Attribute | Description |
|-----------|-------------|
| `face` | Font name. Empty string uses the configured font |
| `color` | Text color (`#FF0080` / `red`) |
| `bcolor` | Button selection color |

Nestable. Color names follow .NET's `Color` struct definitions (`Transparent` not allowed).

!!! info "ARGB Color Format"

    The `color`/`bcolor` attributes support 8-digit ARGB colors: `#AARRGGBB` (e.g., `#80FF0000` = semi-transparent red). The 6-digit `#RRGGBB` format defaults alpha to 255 (fully opaque).

### `<b>` / `<i>` / `<u>` / `<s>` — Text Decoration

```html
<b>bold</b> <i>italic</i> <u>underline</u> <s>strikethrough</s>
```

---

## Button Tags

### `<button>` / `<nonbutton>`

```html
<button value='～' title='～' pos='～'>text</button>
<nonbutton title='～' pos='～'>text</nonbutton>
```

| Attribute | Scope | Description |
|-----------|-------|-------------|
| `value` | `button` only | Button value. Omitting makes it non-clickable |
| `title` | Both | Tooltip |
| `pos` | Both | Position from left edge (%, only with `align='left'`+`nobr`) |

### `<clearbutton>` — Button Invalidation { data-toc-label="clearbutton" }

!!! tag-variant "EM+EE"

```html
<clearbutton>text</clearbutton>
```

Invalidates button functionality in the enclosed section (`title` and `pos` are preserved).

| Attribute | Description |
|-----------|-------------|
| `notooltip` | When `true`, tooltip is also invalidated |

### PRINTBUTTON — Explicit Button Creation

In addition to `[N]` auto-buttons and HTML `<button>` tags, ERABASIC provides the `PRINTBUTTON` instruction to explicitly create buttons:

```erb
PRINTBUTTON "[0] Yes", 0
PRINTS "     "
PRINTBUTTON "[1] No", 1
INPUT
```

`PRINTBUTTON` bypasses the engine's automatic button recognition and directly specifies the button's display text and value. Use cases:

| Scenario | Auto-button problem | PRINTBUTTON solution |
|----------|-------------------|---------------------|
| Multi-button line split errors | `[0] Yes [1] No` may split incorrectly | Each button created independently |
| Non-numeric button values | `[abc]` does not generate a button | `PRINTBUTTON "Option", "string_value"` |
| Display text differs from value | `[0]` must display the number | `PRINTBUTTON "Yes", 0` |

`PRINTBUTTON` can also create string buttons for use with `INPUTS`:

```erb
PRINTBUTTON "[HogeHoge] ", "HogeHoge"
PRINTBUTTON "[PugePuge] ", "PugePuge"
INPUTS
; Click → RESULTS = "HogeHoge" or "PugePuge"
```

> For the complete PRINTBUTTON API, see the [PRINTBUTTON Reference](../Reference/PRINTBUTTON.en.md).

---

## Image Tag

### `<img>` — Inline Image

```html
<img src='resourcename' srcb='～' srcm='～' height='～' width='～' ypos='～' xpos='～' display='～' cm='～'>
```

#### Basic Attributes

| Attribute | Required | Description | Variant |
|-----------|----------|-------------|---------|
| `src` | ✅ | Resource name | |
| `srcb` | | Resource name for button selection state | |
| `srcm` | | Resource name for button map | EM+EE, Skia |
| `height` | | Vertical size (%, `px`). **Negative value flips vertically** | DotNet, Skia |
| `width` | | Horizontal size (%, `px`). **Negative value flips horizontally** | DotNet, Skia |
| `ypos` | | Vertical position offset (%, `px`) | |
| `px` notation | | Append `px` to values for pixel specification | |

#### Absolute Positioning Attributes

!!! tag-variant "DotNet"

| Attribute | Description | Variant |
|-----------|-------------|---------|
| `xpos` | X coordinate for absolute positioning (%, `px`) | DotNet, Skia |
| `display` | Display mode specification | DotNet, Skia |

`display` attribute values:

| Value | Description | Variant |
|-------|-------------|---------|
| `relative` | Default. Follows text flow | DotNet, Skia |
| `absolute-lefttop` | Absolute positioning with window top-left as origin | DotNet, Skia |
| `absolute-leftbottom` | Absolute positioning with window bottom-left as origin | DotNet, Skia |

!!! note "Design rationale for xpos"

    Originally, `<img>` was an inline element embedded in the text flow, so the horizontal position was automatically determined by layout and `xpos` was unnecessary. However, when the `display` attribute switches to absolute positioning mode, the image leaves the text flow and the horizontal position is no longer determined by layout. This is why `xpos` was added.

#### Color Matrix Attribute

!!! tag-variant "Skia"

| Attribute | Description | Variant |
|-----------|-------------|---------|
| `cm` | 5×5 color matrix variable name (`"CM_GRAY:0:0"` format) | Skia |

The `cm` attribute specifies a 5×5 two-dimensional integer array variable name declared with `#DIM`. Values range from 0 to 256 and are applied as a SkiaSharp `SKColorFilter`.

---

## Shape Tag

### `<shape>` — Shape Drawing

```html
<shape type='rect' param='～～' color='～～' bcolor='～～'>
<shape type='space' param='～～'>
```

| Attribute | Required | Description |
|-----------|----------|-------------|
| `type` | ✅ | `rect` (rectangle) / `space` (blank space) |
| `param` | ✅ | Shape parameters (%, comma-separated) |
| `color` | | Shape color |
| `bcolor` | | Button selection color |

`type='rect'` `param`:

- 1 value: width only (`param='400'` = `param='0,0,400,100'`)
- 4 values: `x, y, width, height`

---

## Container Tag

### `<div>` — Sub-area

!!! tag-variant "EM+EE"

```html
<div width='～' height='～' xpos='～' ypos='～' display='～' color='～' ...>content</div>
```

`<div>` does not support nesting. Can be combined with other tags.

!!! warning "Required attributes"

    `width` is a **required attribute**. Omitting it triggers a runtime error. Only integers or `Npx` format accepted (`"auto"` is not valid).

    `height` is optional. When omitted, it is auto-calculated from content lines + padding/border (`lineCount × lineHeight + paddingTop/Bottom + borderTop/Bottom`).

#### Layout Attributes

| Attribute | Description | Variant |
|-----------|-------------|---------|
| `width` | ✅ Sub-area width (%, `px`) | |
| `height` | Sub-area height (%, `px`). Auto-calculated when omitted | Skia |
| `xpos` | Horizontal distance from current position | |
| `ypos` | Vertical distance from current position | |
| `size` | Shorthand for `width,height` | EM+EE, Skia |
| `rect` | Shorthand for `xpos,ypos,width,height` | EM+EE, Skia |
| `depth` | Depth (negative=front, positive=back) | EM+EE, Skia |
| `color` | Background color | EM+EE, Skia |

#### Display Mode Attribute

| Attribute | Description | Variant |
|-----------|-------------|---------|
| `display` | Display mode specification | EM+EE, DotNet, Skia |

`display` attribute values:

| Value | Description | Variant |
|-------|-------------|---------|
| `relative` | Default. Draw at current text position | EM+EE, DotNet, Skia |
| `absolute` | Fixed window position. `(0,0)` is bottom-left, ypos positive upward | EM+EE, Skia |
| `absolute-lefttop` | Absolute positioning with window top-left as origin | DotNet, Skia |
| `absolute-leftbottom` | Absolute positioning with window bottom-left as origin | DotNet, Skia |

!!! note "Difference between `absolute` and `absolute-leftbottom`"

    EM+EE's `absolute` and DotNet's `absolute-leftbottom` both use a bottom-left origin coordinate system, but the ypos direction differs:

    - **EM+EE / Skia**: ypos positive upward (`WindowHeight - ypos - ElementHeight`)
    - **DotNet**: ypos positive downward (`WindowHeight + ypos`, negative values go upward)

    `absolute` is internally supported in DotNet/Skia as an EM+EE compatibility mode, but explicit specification of `absolute-lefttop`/`absolute-leftbottom` is recommended as HTML attribute values.

#### Box Model Attributes

| Attribute | Description | Variant |
|-----------|-------------|---------|
| `margin` | Outer margin (1–4 values, `px`/%) | EM+EE, Skia |
| `padding` | Inner padding (1–4 values, `px`/%) | |
| `border` | Border width (1–4 values, `px`/%) | EM+EE, Skia |
| `bcolor` | Border color (defaults to text color when omitted) | EM+EE, Skia |
| `radius` | Border radius (1–4 values, `px`/%) | EM+EE, Skia |

**4-value specification format** (common to `margin`/`padding`/`border`/`radius`):

| Values | Applied to |
|--------|------------|
| 1 value | All four sides/corners |
| 2 values | Top-bottom / Left-right |
| 3 values | Top / Left-right / Bottom |
| 4 values | Top / Right / Bottom / Left |

**`radius` special patterns**:

| Values | Applied to |
|--------|------------|
| 2 values | Top-left+Bottom-right / Top-right+Bottom-left |
| 3 values | Top-left / Top-right+Bottom-left / Bottom-right |
| 4 values | Top-left / Top-right / Bottom-right / Bottom-left |

---

## Miscellaneous

### Character References

Supports `&amp;` `&gt;` `&lt;` `&quot;` `&apos;` `&#nn;` `&#xnn;`.

### Comments

Text enclosed in `<!-- comment -->` is ignored during HTML parsing.

---

## Attribute Support Matrix

### `<img>` Attribute Support

| Attribute | Emuera | EM+EE | DotNet | Skia |
|-----------|--------|-------|--------|------|
| `src` | ✅ | ✅ | ✅ | ✅ |
| `srcb` | ✅ | ✅ | ✅ | ✅ |
| `srcm` | — | ✅ | — | ✅ |
| `height` (negative flip) | ✅ | ✅ | ✅ | ✅ |
| `width` (negative flip) | ✅ | ✅ | ✅ | ✅ |
| `ypos` | ✅ | ✅ | ✅ | ✅ |
| `px` notation | — | ✅ | ✅ | ✅ |
| `xpos` | — | — | ✅ | ✅ |
| `display` | — | — | ✅ | ✅ |
| `cm` | — | — | — | ✅ |

### `<div>` Attribute Support

| Attribute | Emuera | EM+EE | DotNet | Skia |
|-----------|--------|-------|--------|------|
| `width` | — | ✅ | ✅ | ✅ |
| `height` | — | ✅ | ✅ | ✅ |
| `xpos` | — | ✅ | ✅ | ✅ |
| `ypos` | — | ✅ | ✅ | ✅ |
| `size` | — | ✅ | — | ✅ |
| `rect` | — | ✅ | — | ✅ |
| `depth` | — | ✅ | — | ✅ |
| `color` | — | ✅ | ✅ | ✅ |
| `display` | — | ✅ | ✅ | ✅ |
| `margin` | — | ✅ | — | ✅ |
| `padding` | — | ✅ | — | ✅ |
| `border` | — | ✅ | ✅ | ✅ |
| `bcolor` | — | ✅ | ✅ | ✅ |
| `radius` | — | ✅ | — | ✅ |

### `<div>` display Value Support

| Value | EM+EE | DotNet | Skia |
|-------|-------|--------|------|
| `relative` | ✅ | ✅ | ✅ |
| `absolute` | ✅ | ✅ (compat) | ✅ (compat) |
| `absolute-lefttop` | — | ✅ | ✅ |
| `absolute-leftbottom` | — | ✅ | ✅ |

---

## Resource Configuration

For image resource preparation, CSV definition format, Skia resource management (lazy-load index, SharedBitmapCache, AnimSpriteCache), and usage guidelines, see [Resource Configuration — Preparing Image Resources](resources.en.md).

---

## See Also

- [Resource Configuration — Preparing Image Resources](resources.en.md) — CSV definition format, Skia resource management
- [HTML_PRINT](../Reference/HTML_PRINT.en.md) — HTML output command
- [HTML_PRINT_ISLAND](../Reference/HTML_PRINT_ISLAND.en.md) — Independent HTML layer output
- [SPRITECREATEFROMFILE](../Reference/SPRITECREATEFROMFILE.en.md) — Runtime image loading (Skia)
- [Resource Files (Legacy)](../Emuera/resources.en.md) — Original Emuera resource configuration
