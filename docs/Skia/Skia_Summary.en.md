---
---

# Skia Feature Summary

!!! info "About this page"

    This page covers all new features (excluding bug fixes) of **Emuera Skia (Skia version)**.
    Skia is a derivative of EmueraEM+EE, adding unique features such as lazy loading, MAP extensions, and SkiaSharp rendering.

---

## Legend { #legend }

- ![](../assets/images/IconSK.webp) - Features added, changed, or extended in Skia
- ![](../assets/images/IconEM.webp) - Features added in EM (EvilMask version)
- ![](../assets/images/IconEE.webp) - Features added in EE (Enter's Edition)
- ![](../assets/images/Icondotnet.webp) - Features synced from DotNet version

---

## Skia Added Functions { #skia-functions }

> List of commands and expression functions newly added in the Skia version. Extended parameters of existing functions are listed in [Changed Commands](#changed-commands).

| Function | Type | Description | Details |
|:---|:---|:---|:---|
| ![](../assets/images/IconSK.webp) `SETIMAGELAYER` | Command | Set/update independent image layer | [SETIMAGELAYER](../Reference/SETIMAGELAYER.en.md) |
| ![](../assets/images/IconSK.webp) `CLEARIMAGELAYER` | Command | Delete layer at specified depth | [CLEARIMAGELAYER](../Reference/CLEARIMAGELAYER.en.md) |
| ![](../assets/images/IconSK.webp) `CLEARIMAGELAYER_ALL` | Command | Delete all layers | [CLEARIMAGELAYER](../Reference/CLEARIMAGELAYER.en.md) |
| ![](../assets/images/IconSK.webp) `EXISTSIMAGELAYER` | Expression | Check layer existence | [EXISTSIMAGELAYER](../Reference/EXISTSIMAGELAYER.en.md) |
| ![](../assets/images/IconSK.webp) `CALLSTR` | Command | Call function from string variable | [CALLSTR](../Reference/CALLSTR.en.md) |
| ![](../assets/images/IconSK.webp) `JUMPSTR` | Command | Jump to function from string variable | [CALLSTR](../Reference/CALLSTR.en.md) |
| ![](../assets/images/IconSK.webp) `TRYCALLSTR` | Command | CALLSTR with existence check | [CALLSTR](../Reference/CALLSTR.en.md) |
| ![](../assets/images/IconSK.webp) `TRYJUMPSTR` | Command | JUMPSTR with existence check | [CALLSTR](../Reference/CALLSTR.en.md) |
| ![](../assets/images/IconSK.webp) `TRYCCALLSTR` | Command | CALLSTR with existence check (with CATCH) | [CALLSTR](../Reference/CALLSTR.en.md) |
| ![](../assets/images/IconSK.webp) `TRYCJUMPSTR` | Command | JUMPSTR with existence check (with CATCH) | [CALLSTR](../Reference/CALLSTR.en.md) |
| ![](../assets/images/IconSK.webp) `EVAL` | Expression | Evaluate string expression as integer | [EVAL](../Reference/EVAL.en.md) |
| ![](../assets/images/IconSK.webp) `EVALS` | Expression | Evaluate string expression as string | [EVAL](../Reference/EVAL.en.md) |
| ![](../assets/images/IconSK.webp) `BITSET` | Expression | Set specified bit | [BITARRAY](../Reference/BITARRAY.en.md) |
| ![](../assets/images/IconSK.webp) `BITGET` | Expression | Get value of specified bit | [BITARRAY](../Reference/BITARRAY.en.md) |
| ![](../assets/images/IconSK.webp) `BITTOGGLE` | Expression | Toggle specified bit | [BITARRAY](../Reference/BITARRAY.en.md) |
| ![](../assets/images/IconSK.webp) `BITINDEXOFFIRST` | Expression | Index of first set/clear bit | [BITARRAY](../Reference/BITARRAY.en.md) |
| ![](../assets/images/IconSK.webp) `MAP_VALUES` | Expression | Get all values as comma-separated string | [MAP_GETKEYS](../Reference/MAP_GETKEYS.en.md) |
| ![](../assets/images/IconSK.webp) `MAP_TOSTRING` | Expression | Serialize map to key=value format | [MAP_SERIALIZATION](../Reference/MAP_SERIALIZATION.en.md) |
| ![](../assets/images/IconSK.webp) `MAP_FROMSTRING` | Expression | Deserialize map from key=value format | [MAP_SERIALIZATION](../Reference/MAP_SERIALIZATION.en.md) |
| ![](../assets/images/IconSK.webp) `MAP_MERGE` | Expression | Merge contents of another map | [MAP_ENHANCED](../Reference/MAP_ENHANCED.en.md) |
| ![](../assets/images/IconSK.webp) `MAP_REMOVEIF` | Expression | Remove keys matching condition | [MAP_ENHANCED](../Reference/MAP_ENHANCED.en.md) |
| ![](../assets/images/IconSK.webp) `MAP_FINDKEY` | Expression | Find key by matching value | [MAP_ENHANCED](../Reference/MAP_ENHANCED.en.md) |
| ![](../assets/images/IconSK.webp) `SIN` | Expression | Sine (radians) | [MATH_EXTENSION](../Reference/MATH_EXTENSION.en.md) |
| ![](../assets/images/IconSK.webp) `COS` | Expression | Cosine (radians) | [MATH_EXTENSION](../Reference/MATH_EXTENSION.en.md) |
| ![](../assets/images/IconSK.webp) `TAN` | Expression | Tangent (radians) | [MATH_EXTENSION](../Reference/MATH_EXTENSION.en.md) |
| ![](../assets/images/IconSK.webp) `ASIN` | Expression | Arc sine | [MATH_EXTENSION](../Reference/MATH_EXTENSION.en.md) |
| ![](../assets/images/IconSK.webp) `ACOS` | Expression | Arc cosine | [MATH_EXTENSION](../Reference/MATH_EXTENSION.en.md) |
| ![](../assets/images/IconSK.webp) `ATAN` | Expression | Arc tangent | [MATH_EXTENSION](../Reference/MATH_EXTENSION.en.md) |
| ![](../assets/images/IconSK.webp) `FLOOR` | Expression | Round down | [MATH_EXTENSION](../Reference/MATH_EXTENSION.en.md) |
| ![](../assets/images/IconSK.webp) `CEIL` | Expression | Round up | [MATH_EXTENSION](../Reference/MATH_EXTENSION.en.md) |
| ![](../assets/images/IconSK.webp) `ROUND` | Expression | Round to nearest | [MATH_EXTENSION](../Reference/MATH_EXTENSION.en.md) |
| ![](../assets/images/IconSK.webp) `UNCHECKED_ADD` | Expression | Addition wrap-around | [UNCHECKED](../Reference/UNCHECKED.en.md) |
| ![](../assets/images/IconSK.webp) `UNCHECKED_SUB` | Expression | Subtraction wrap-around | [UNCHECKED](../Reference/UNCHECKED.en.md) |
| ![](../assets/images/IconSK.webp) `UNCHECKED_MUL` | Expression | Multiplication wrap-around | [UNCHECKED](../Reference/UNCHECKED.en.md) |
| ![](../assets/images/IconSK.webp) `UNCHECKED_NEG` | Expression | Negation wrap-around | [UNCHECKED](../Reference/UNCHECKED.en.md) |
| ![](../assets/images/IconSK.webp) `HTML_PRINTC` | Command | Right-aligned HTML string output | [HTML_PRINTC](../Reference/HTML_PRINTC.en.md) |
| ![](../assets/images/IconSK.webp) `HTML_PRINTLC` | Command | Left-aligned HTML string output (with line width calculation) | [HTML_PRINTC](../Reference/HTML_PRINTC.en.md) |
| ![](../assets/images/IconSK.webp) `SPRITECREATEFROMFILE` | Expression | Create sprite directly from image file | [SPRITECREATEFROMFILE](../Reference/SPRITECREATEFROMFILE.en.md) |
| ![](../assets/images/IconSK.webp) `SET_TEXT_DRAWING_MODE` | Command | Set text drawing pipeline | [SKIA_RENDER](../Reference/SKIA_RENDER.en.md) |
| ![](../assets/images/IconSK.webp) `GET_TEXT_DRAWING_MODE` | Expression | Get text drawing pipeline | [SKIA_RENDER](../Reference/SKIA_RENDER.en.md) |
| ![](../assets/images/IconSK.webp) `SET_SKIA_QUALITY` | Command | Set rendering quality | [SKIA_RENDER](../Reference/SKIA_RENDER.en.md) |
| ![](../assets/images/IconSK.webp) `GET_SKIA_QUALITY` | Expression | Get rendering quality | [SKIA_RENDER](../Reference/SKIA_RENDER.en.md) |
| ![](../assets/images/Icondotnet.webp) `G_POLYGON_DRAW` | Command | Draw polygon outline | [G_POLYGON](../Reference/G_POLYGON.en.md) |
| ![](../assets/images/Icondotnet.webp) `G_POLYGON_FILL` | Command | Fill polygon | [G_POLYGON](../Reference/G_POLYGON.en.md) |
| ![](../assets/images/Icondotnet.webp) `G_POLYGON_POINT_ADD` | Command | Add polygon vertex | [G_POLYGON](../Reference/G_POLYGON.en.md) |
| ![](../assets/images/Icondotnet.webp) `G_POLYGON_POINT_CLEAR` | Command | Clear all polygon vertices | [G_POLYGON](../Reference/G_POLYGON.en.md) |
| ![](../assets/images/IconSK.webp) `TEXT_BGC_ON` | Command | Enable text background color display | [TEXT_BGC](../Reference/TEXT_BGC.en.md) |
| ![](../assets/images/IconSK.webp) `TEXT_BGC_OFF` | Command | Disable text background color display | [TEXT_BGC](../Reference/TEXT_BGC.en.md) |
| ![](../assets/images/IconSK.webp) `SQL_ESCAPE` | Expression | SQL-escape a string | [SQL_PARAM](../Reference/SQL_PARAM.en.md) |
| ![](../assets/images/IconSK.webp) `SQL_P_EXECUTE_NONQUERY` | Command | Parameterized query execution (non-query) | [SQL_PARAM](../Reference/SQL_PARAM.en.md) |
| ![](../assets/images/IconSK.webp) `SQL_P_EXECUTE_READER` | Command | Parameterized query execution (reader) | [SQL_PARAM](../Reference/SQL_PARAM.en.md) |
| ![](../assets/images/IconSK.webp) `SQL_P_EXECUTE_SCALAR_LONG` | Expression | Parameterized query execution (scalar long) | [SQL_PARAM](../Reference/SQL_PARAM.en.md) |
| ![](../assets/images/IconSK.webp) `SQL_P_EXECUTE_SCALAR_STRING` | Expression | Parameterized query execution (scalar string) | [SQL_PARAM](../Reference/SQL_PARAM.en.md) |
| ![](../assets/images/IconSK.webp) `SQL_P_EXECUTE_SCALAR_FLOAT` | Expression | Parameterized query execution (scalar float) | [SQL_PARAM](../Reference/SQL_PARAM.en.md) |
| ![](../assets/images/Icondotnet.webp) `SQL_CONNECTION_OPEN` | Command | Convenience function: create DB connection under sav/sql/ | [SQL_CONNECT](../Reference/SQL_CONNECT.en.md) |
| ![](../assets/images/IconSK.webp) `SQL_IMPORT_MAP_XML` | Command | Import MAP from XML to SQL | [SQL_XML](../Reference/SQL_XML.en.md) |
| ![](../assets/images/IconSK.webp) `SQL_IMPORT_DT_XML` | Command | Import DataTable from XML to SQL | [SQL_XML](../Reference/SQL_XML.en.md) |
| ![](../assets/images/IconSK.webp) `SQL_EXPORT_MAP_XML` | Command | Export MAP from SQL to XML | [SQL_XML](../Reference/SQL_XML.en.md) |
| ![](../assets/images/IconSK.webp) `SQL_EXPORT_DT_XML` | Command | Export DataTable from SQL to XML | [SQL_XML](../Reference/SQL_XML.en.md) |
| ![](../assets/images/IconSK.webp) `SQL_IMPORT_XML_CUSTOM` | Command | Custom XML import | [SQL_XML](../Reference/SQL_XML.en.md) |
| ![](../assets/images/IconSK.webp) `STRICT_FONT_FALLBACK` | Command | Strict font fallback mode | [STRICT_FONT_FALLBACK](../Reference/STRICT_FONT_FALLBACK.en.md) |
| ![](../assets/images/Icondotnet.webp) `GETCSVNOBYNAME` | Expression | Reverse lookup character number by NAME | [GETCSVNOBY](../Reference/GETCSVNOBY.en.md) |
| ![](../assets/images/Icondotnet.webp) `GETCSVNOBYNICKNAME` | Expression | Reverse lookup character number by NICKNAME | [GETCSVNOBY](../Reference/GETCSVNOBY.en.md) |
| ![](../assets/images/Icondotnet.webp) `GETCSVNOBYCALLNAME` | Expression | Reverse lookup character number by CALLNAME | [GETCSVNOBY](../Reference/GETCSVNOBY.en.md) |
| ![](../assets/images/Icondotnet.webp) `GETCSVNOBYMASTERNAME` | Expression | Reverse lookup character number by MASTERNAME | [GETCSVNOBY](../Reference/GETCSVNOBY.en.md) |
| ![](../assets/images/Icondotnet.webp) `MATCHALL` | Expression | Full array search (variable reference) | [MATCHALL](../Reference/MATCHALL.en.md) |
| ![](../assets/images/Icondotnet.webp) `MATCHALLEX` | Expression | Full array search (string variable name) | [MATCHALL](../Reference/MATCHALL.en.md) |
| ![](../assets/images/IconSK.webp) `BEFORE_THROW` | Event | Called before THROW throws exception | [Event Functions](../tutorial/event-functions.en.md#before_throw) |
| ![](../assets/images/IconSK.webp) `BEFORE_ERROR` | Event | Called on first error occurrence | [Event Functions](../tutorial/event-functions.en.md#before_error) |

---

### ![](../assets/images/IconSK.webp)Error Handling Events (Skia Exclusive)
!!! summary ""

    Two event functions, `BEFORE_THROW` and `BEFORE_ERROR`, are added to provide script-level error handling capabilities.

    - **`BEFORE_THROW`**: Called before a `THROW` command throws an exception, allowing scripts to intercept and handle the exception
    - **`BEFORE_ERROR`**: Called when any error first occurs, providing a unified error handling hook
    - When an event function exists, exception throwing is delayed, allowing the script to perform cleanup or recovery operations
    - Recursion prevention: If an error occurs again within the event function, the event is not re-triggered and is processed directly

### ![](../assets/images/IconSK.webp)Function Call Parameter Safety Optimization
!!! summary ""

    Systematic fix for three layers of safety defects in the original function call system.

    - **ConvertArg silent discarding of extra parameters**: Original version errors on too many arguments; Skia version naturally ignores them via loop (consistent with CALLSTR series runtime parsing)
    - **TRYCALL safety net**: Original version crashes even `TRYCALL` on `ConvertArg` failure; Skia version uses `isTry` flag to jump to `JumpToEndCatch` (consistent with `CALLS_Instruction`)
    - **CALLSTR runtime function reflection**: Supports runtime string parsing of function name + parameters, breaking through the limitation that `CALLFORM` can only construct function names at runtime without specifying parameters
    - See [CALL](../Reference/CALL.en.md), [TRYCALL](../Reference/TRY.en.md), [CALLSTR](../Reference/CALLSTR.en.md) for details

### ![](../assets/images/IconSK.webp)SkiaSharp Rendering Engine { #skia-sharp }
!!! summary ""

    Adopts SkiaSharp as the rendering engine replacing GDI+. Provides cross-platform support and GPU-accelerated rendering.

    - **OpenGL hardware acceleration**: Auto-detection + runtime fallback
    - **CPU software rendering**: Maximum compatibility
    - **Auto mode**: OpenGL preferred, fallback to CPU on failure
    - **SRGB color space correction**: Fixes screen darkening caused by SkiaSharp's default color space
    - **GDI font fallback**: Raster fonts like MS Gothic retain GDI rendering path
    - **Smart font fallback**: Serif/sans-serif classification fallback, full CJK coverage

### ![](../assets/images/IconSK.webp)Lazy Loading Mechanism
!!! summary ""

    Dynamically loads ERB files on function call. Avoids loading all files at startup, loading only needed functions on demand.

    - Builds function-to-file mapping table
    - Loads the corresponding ERB file when `CALL` references an unloaded function
    - Significantly reduces startup time for large-scale games

### ![](../assets/images/IconSK.webp)Fullscreen Mode (F11)
!!! summary ""

    Switch to fullscreen display with F11 key. Covers the start menu; moving the mouse to the top automatically shows the toolbar.

### ![](../assets/images/IconEE.webp)![](../assets/images/IconSK.webp)Audio Processing (SoundTouch)
!!! summary ""

    Integrates SoundTouch library into EE's audio functionality, supporting tempo and pitch changes.

    - Audio tempo change (speed change, pitch preserved)
    - Audio pitch change (pitch change, speed preserved)
    - Real-time conversion playback

### ![](../assets/images/IconSK.webp)SELECTCASE Compile-time Jump Table Optimization
!!! summary ""

    Builds a `Dictionary<long/string/double, InstructionLine>` jump table at compile time, optimizing SELECTCASE from O(n) linear scan to O(1) hash lookup.

    - `SelectCaseJumpTable` core class: compile-time jump table construction
    - Supports three key types: integer, string, and floating-point
    - Supports comma-separated CASE constant lists (e.g., `CASE 1, 2, 3`)
    - Supports pure function expressions that can be folded into constant expressions (e.g., `CASE ABS(3)`, `CASE TOINT("123")`)
    - Duplicate value handling uses FIFO strategy: keeps the first occurrence, outputs warning and skips subsequent duplicates
    - Non-optimizable CASEs (containing TO/IS/non-constant/side-effect functions etc.) automatically fall back to linear scan
    - Compatible with existing FALLTHROUGH semantics

### ![](../assets/images/IconSK.webp)Image Resource Management Rebuild
!!! summary ""

    Complete redesign of image resource management.

    - **SharedBitmapCache**: Global bitmap pool (max 200) + ConstImage lightweight shell (records filepath only, does not hold SKBitmap)
    - **AnimSpriteCache**: Animation sprite LRU cache (max 6), evicts frame data on overflow, re-decodes on re-access
    - **SpriteAnime optimization**: Fixes memory explosion from duplicate decoding of the same file
    - **Lazy loading index**: CSV preload builds SQLite :memory: index only, image data is 0 bytes, decodes on first render
    - **DIV rendering optimization**: Hit-test O(1) positioning + Y-axis pre-filtering
    - **ToolTip anti-occlusion**: Auto-reversal at screen edges

---

## Constants & Variables { #variables }

### ![](../assets/images/IconSK.webp)Floating-Point (Float Type) Support
!!! summary ""

    Adds floating-point (Float type) support to ERABASIC. EM+EE and original Emuera only support integers.

    - `Float` type variables: `RESULTF`, `LOCALF`, `ARGF`, etc.
    - `#DIMF` floating-point variable declaration
    - `#FUNCTIONF` floating-point return value function
    - FORM syntax extension: `{float expression}` for float-to-string conversion, `{expression, digits}` for zero-padding
    - Automatic casting between integer and floating-point
    - Character floating-point variables: dataFloat/dataFloatArray/dataFloatArray2D in CharacterData
    - Archive double-precision support
    - Floating-point type conversion functions: `TOSTRF` (float→string), `TOFLOAT` (string→float), `TOINT` extension (float→integer truncation)

!!! warning "Note"

    Float type is only available in the Skia version. It will cause a compile error in EM+EE or original Emuera ERB scripts.

!!! info "API"

    | Function | Arguments | Return | Description |
    |------|------|--------|------|
    | ![](../assets/images/IconSK.webp) `TOSTRF` | `float`{, `option`} | `string` | Float→string; `option` is a C# format string (e.g., `"F2"`, `"E"`), uses default format when omitted |
    | ![](../assets/images/IconSK.webp) `TOFLOAT` | `string` | `float` | String→float; returns 0.0 on parse failure |
    | ![](../assets/images/IconSK.webp) `TOINT` (extended) | `float` | `int` | Float→integer, direct truncation (no rounding) |

### ![](../assets/images/IconSK.webp)VARIADIC Variable-Length Arguments
!!! summary ""

    Supports variable-length arguments via `VARIADIC ARG/ARGS/ARGF` in function parameter declarations.

!!! info "API"

    ``` { #language-erbapi }
    @FUNC_NAME(VARIADIC ARG:0)
    @FUNC_NAME(VARIADIC ARGS:0)
    @FUNC_NAME(VARIADIC ARGF:0)
    ```

    - `ARGLEN()` built-in function to get the count of variable-length arguments
    - Supports three variable-length argument types: Int/String/Float
    - Int→Float implicit conversion supported

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @MY_FUNC(VARIADIC ARG:0)
    REPEAT ARGLEN()
        PRINTVL ARG:COUNT
    REND
    ```

### ![](../assets/images/IconSK.webp)Reference Parameters (REF/OUT)
!!! summary ""

    Extends EM+EE's array references (`#DIM REF`) with scalar references and OUT parameters.

    - Scalar reference: `#REF X` / `#REFS X` / `#REFF X` — pass-by-reference for single elements (EM+EE only supports entire arrays)
    - OUT parameter: `#DIM OUT X` / `#DIMS OUT X` / `#DIMF OUT X` — optional scalar reference (write is discarded when omitted)

!!! warning "Note"

    See [Variable Declaration Tutorial](../tutorial/variable-declaration.en.md#ref) for details.

### ![](../assets/images/IconSK.webp)ExecutionContext Stack-based Function Context
!!! summary ""

    Creates an independent `ExecutionContext` for each function call, fixing LOCAL/ARG variable recursive overwrite pollution.

    - Upstream (emuera.em) used a function-name→array global dictionary, causing variables to overwrite each other during recursive calls of the same function
    - Skia version uses an `ExecutionContext` stack, where each call has independent `LocalIntegers`/`LocalStrings`/`ArgIntegers`/`ArgStrings` arrays
    - PushContext in `IntoFunction()`, PopContext + Dispose in `Return()`
    - In addition to `#DIM DYNAMIC` variable ScopeIn/ScopeOut management, ExecutionContext provides an additional isolation layer

### ![](../assets/images/IconSK.webp)SparseArray\<T> Sparse Array Storage
!!! summary ""

    Optimizes memory efficiency for large-index arrays. `SparseArray<T>` does not consume memory for unused indices.

### ![](../assets/images/IconSK.webp)SafeArithmetic Safe Operations
!!! summary ""

    Overflow protection. Prevents static overflow, ensuring arithmetic results do not exceed the type's range.

!!! info "API"

    In the Skia version, standard arithmetic operators (`+`, `-`, `*`, unary `-`) are overflow-protected by `SafeArithmetic`. On overflow, a warning is output and the value is clamped to `Long.MaxValue` or `Long.MinValue`.

    For scenarios requiring wrap-around behavior (e.g., hash calculations), UNCHECKED series expression functions are provided:

    | Function | Operation | Description |
    |:---|:---|:---|
    | `UNCHECKED_ADD(a, b)` | `a + b` | Addition wrap-around |
    | `UNCHECKED_SUB(a, b)` | `a - b` | Subtraction wrap-around |
    | `UNCHECKED_MUL(a, b)` | `a * b` | Multiplication wrap-around |
    | `UNCHECKED_NEG(a)` | `-a` | Negation wrap-around |

    See [UNCHECKED](../Reference/UNCHECKED.en.md) for details.

---

## Changed Commands & Expression Functions { #changed-commands }

### ![](../assets/images/IconSK.webp)`CBGSETSPRITE` Extended Parameters
!!! summary ""

    Adds 4 extended parameters to CBGSETSPRITE. Sprite scale, opacity, and color matrix can now be specified.

!!! info "API"

    ``` { #language-erbapi }
    CBGSETSPRITE imgName, x, y, zdepth
    CBGSETSPRITE imgName, x, y, zdepth, width, height, opacity, colorMatrix
    ```

    **Skia version extended parameters** (from 5th argument onwards):

    - `width`, `height` (optional): Sprite rendering size. Defaults to original size if not specified.
    - `opacity` (optional, default `255`): Opacity. 0=fully transparent, 255=fully opaque.
    - `colorMatrix` (optional): `ref int[]` type. 4×5 color matrix (20 elements).

### ![](../assets/images/IconSK.webp)`GCREATEFROMFILE` `isRelative` Parameter
!!! summary ""

    Adds an optional third argument to GCREATEFROMFILE. When set to `1`, `filePath` is interpreted as a relative path from the current working directory instead of the program directory. If an absolute path is specified, this parameter is ignored.

!!! info "API"

    ``` { #language-erbapi }
    int GCREATEFROMFILE gID, filePath{, isRelative}
    ```

!!! warning "Note"

    EM+EE's GCREATEFROMFILE also has a third argument, but with a different meaning. In EM+EE it means "relative path from Emuera", while in the Skia version it means "relative path from the current working directory".

### ![](../assets/images/IconSK.webp)`SPRITECREATE` Offset & Target Size Parameters
!!! summary ""

    Adds 4 extended parameters to SPRITECREATE. Sprite rendering offset and target size (scaling) can now be specified.

!!! info "API"

    ``` { #language-erbapi }
    int SPRITECREATE spriteName, gID
    int SPRITECREATE spriteName, gID, x, y, width, height
    int SPRITECREATE spriteName, gID, x, y, width, height, posX, posY
    int SPRITECREATE spriteName, gID, x, y, width, height, posX, posY, destWidth, destHeight
    ```

    **Skia version extended parameters** (from 7th argument onwards):

    - `posX`, `posY` (optional, default `0`): Sprite rendering offset.
    - `destWidth`, `destHeight` (optional, defaults to source rectangle size): Sprite destination rendering size. Negative values are processed as absolute values.

### ![](../assets/images/IconSK.webp)`SETBGIMAGE` Parameter Parsing Fix
!!! summary ""

    Changed the `resourceName` parameter parsing from `FORM_STR_ANY` to typed string expression. Fixes a bug where variable arguments were treated as literal strings. See [BACKGROUND](../Reference/BACKGROUND.en.md) for details.

### ![](../assets/images/IconSK.webp)`HTML_PRINT` `display` Attribute (DotNet Sync)
!!! summary ""

    Adds `display` attribute to `<img>` tag. Extends `display` attribute for `<div>` tag.

    - `<img display="relative">` (default): Relative position
    - `<img display="absolute-lefttop">`: Top-left absolute position
    - `<img display="absolute-leftbottom">`: Bottom-left absolute position
    - `<img xpos="N">`: X coordinate for absolute positioning
    - `<div display="absolute-lefttop">` / `<div display="absolute-leftbottom">`: Extended support

### ![](../assets/images/IconSK.webp)`FONTSTYLE` Underline & Strikethrough (DotNet Sync)
!!! summary ""

    Adds underline and strikethrough to the `FONTSTYLE` command bitmask.

    - Underline = `8`: Underline
    - Strikeout = `4`: Strikethrough

### ![](../assets/images/IconSK.webp)`HTML_PRINT` `<font>` Tag `size` Attribute
!!! summary ""

    Adds `size` attribute to the `<font>` tag, supporting font size specification in pixels.

    - `size='24'` or `size='24px'`: Specify font size in pixels
    - Nested `<font>` tags inherit the outer font size setting
    - See [HTML_PRINT](../Emuera/HTML_PRINT.en.md#font) for details

!!! example "Example"

    ``` { #language-erb }
    FONTSTYLE 8
    PRINTL This text has an underline
    FONTSTYLE 4
    PRINTL This text has a strikethrough
    FONTSTYLE 12
    PRINTL Underline + Strikethrough
    ```

### ![](../assets/images/IconSK.webp)Image Flip Logic (DotNet Sync)
!!! summary ""

    Specifying negative values for `destRect.Width`/`Height` in `SPRITECREATE` etc. automatically flips the image.

    - Horizontal flip: Negative `Width`
    - Vertical flip: Negative `Height`
    - Implemented via `canvas.Scale(sx, sy)`, also supports flipped rendering with `SKColorFilter`

### ![](../assets/images/IconSK.webp)`EXISTVAR` Extension
!!! summary ""

    Adds a second argument to `EXISTVAR`. When the second argument is non-zero, it checks for the existence of the storage cell in addition to the variable name.

### ![](../assets/images/IconSK.webp)`INITRAND`/`DUMPRAND` Decoupling from New Random Algorithm
!!! summary ""

    Removes the `UseNewRandom` check, so `INITRAND`/`DUMPRAND` always operate on the MTRandom state.

    - Original version: When `UseNewRandom=true`, `INITRAND`/`DUMPRAND` output a warning and skip
    - Skia version: Directly calls `InitRanddata()`/`DumpRanddata()`, does not affect `GetNextRand`
    - Legacy scripts using `DUMPRAND`/`RANDOMIZE`/`INITRAND` save hacks continue to work

### ![](../assets/images/IconSK.webp)`SETANIMETIMER` Command Conversion & `GETANIMETIMER` Addition
!!! summary ""

    In EM+EE, `SETANIMETIMER` was implemented as an expression function (`FunctionMethod`) that always returns `1`. The Skia version reimplements it as a command (`AInstruction`) with no return value. Additionally, the `GETANIMETIMER` expression function is newly added to retrieve the current timer value.

!!! info "API"

    ``` { #language-erbapi }
    SETANIMETIMER time
    int GETANIMETIMER
    ```

    | Item | EM+EE | Skia Version |
    |:---|:---|:---|
    | `SETANIMETIMER` | Expression function (return: always `1`) | Command (no return value) |
    | `GETANIMETIMER` | ❌ Does not exist | ✅ Expression function (returns current timer value) |

!!! warning "Note"

    In EM+EE, `SETANIMETIMER` could be called as an expression function, but the Skia version only supports command syntax. If EM+EE ERB uses `RESULT = SETANIMETIMER(100)`, it will cause a compile error in the Skia version.

### ![](../assets/images/Iconetc.webp)`BITMAP_CACHE_ENABLE` Command Conversion
!!! summary ""

    In EM+EE, `BITMAP_CACHE_ENABLE` was implemented as an expression function (`FunctionMethod`). The Skia version reimplements it as a command (`AInstruction`) with no return value. The functionality itself is unchanged.

!!! info "API"

    ``` { #language-erbapi }
    BITMAP_CACHE_ENABLE flag
    ```

    | Item | EM+EE | Skia Version |
    |:---|:---|:---|
    | `BITMAP_CACHE_ENABLE` | Expression function (with return value) | Command (no return value) |

!!! warning "Note"

    In EM+EE, `BITMAP_CACHE_ENABLE` could be called as an expression function, but the Skia version only supports command syntax.

### ![](../assets/images/Icondotnet.webp)`SQL_CONNECTION_OPEN` Security Hardening
!!! summary ""

    Ported the convenience function `SQL_CONNECTION_OPEN` from the DotNet version to the Skia version, but fixed the DotNet version's path traversal vulnerability and PRAGMA configuration issues.

!!! info "API"

    ``` { #language-erbapi }
    SQL_CONNECTION_OPEN name
    ```

    | Item | DotNet Version | Skia Version |
    |:---|:---|:---|
    | PRAGMA settings | `journal_mode = OFF; synchronous = OFF` | `journal_mode = WAL; synchronous = NORMAL` |
    | Crash safety | ❌ Database corruption risk | ✅ Database safe even on crash |
    | `name` path validation | ❌ None (path traversal vulnerability) | ✅ Validates invalid characters and `..` |
    | DB save location | `sav/temp_db/` | `sav/sql/` |

!!! warning "Note"

    The `name` parameter is validated for invalid characters and `..`. This prevents ERB scripts from escaping the `sav/sql/` directory. In the DotNet version, `SQL_CONNECTION_OPEN "../../etc/exploit"` was possible, but the Skia version throws a `CodeEE`.

---

## New Commands & Expression Functions { #new-commands }

### ![](../assets/images/IconSK.webp)`SETIMAGELAYER` Series — Independent Image Layers
!!! summary ""

    An image layer system independent of CBG/SETBGIMAGE. Supports depth-ordered rendering, opacity, color matrix, and scroll following.

!!! info "API"

    ``` { #language-erbapi }
    SETIMAGELAYER spriteName, depth, x, y, width, height{, opacity, CM_ARRAY, followScroll}
    CLEARIMAGELAYER depth
    CLEARIMAGELAYER_ALL
    int EXISTSIMAGELAYER(depth)
    ```

    - `depth`: Layer depth. Smaller values are drawn closer to the front
    - `opacity` (optional, default `255`): Opacity
    - `CM_ARRAY` (optional): `ref int[]` type. 4×5 color matrix (20 elements)
    - `followScroll` (optional, default `0`): `1` to follow text scroll

!!! example "Example"

    ``` { #language-erb }
    ; Set a layer
    SETIMAGELAYER "bg_sprite", 0, 100, 200, 300, 400, 200, CM, 1
    ; Check layer existence
    IF EXISTSIMAGELAYER(0)
        CLEARIMAGELAYER 0
    ENDIF
    ; Clear all layers
    CLEARIMAGELAYER_ALL
    ```

!!! warning "Note"

    SETIMAGELAYER is only available in the Skia version. It is a completely independent layer system from the CBG series.

### ![](../assets/images/IconSK.webp)`CALLSTR` Series — Dynamic Function Calls
!!! summary ""

    Calls a function name stored in a string variable. Function names can be switched dynamically.

!!! info "API"

    ``` { #language-erbapi }
    CALLSTR stringVariable
    JUMPSTR stringVariable
    TRYCALLSTR stringVariable
    TRYJUMPSTR stringVariable
    TRYCCALLSTR stringVariable
    TRYCJUMPSTR stringVariable
    ```

!!! example "Example"

    ``` { #language-erb }
    #DIMS funcName = "MY_EVENT"
    CALLSTR funcName
    ; With existence check
    TRYCALLSTR funcName
    ```

### ![](../assets/images/IconSK.webp)`EVAL` / `EVALS` — String Expression Evaluation
!!! summary ""

    Evaluates an ERB expression passed as a string and returns the result.

!!! info "API"

    ``` { #language-erbapi }
    int EVAL(string{, int})
    string EVALS(string{, string})
    ```

!!! example "Example"

    ``` { #language-erb }
    PRINTVL EVAL("1 + 2 * 3")  ; → 7
    PRINTS EVALS("TOSTR(100)")  ; → "100"
    ```

### ![](../assets/images/IconSK.webp)`BITARRAY` Series — Bit Array Operations
!!! summary ""

    Functions for operating on integer arrays as bit arrays. Ideal for flag management.

!!! info "API"

    ``` { #language-erbapi }
    int BITSET(ref int[], bitIndex{, value, elementSize})
    int BITGET(ref int[], bitIndex)
    int BITTOGGLE(ref int[], bitIndex)
    int BITINDEXOFFIRST(ref int[]{, findSet})
    ```

!!! example "Example"

    ``` { #language-erb }
    #DIM flags, 10
    BITSET flags, 5       ; Set bit 5
    PRINTVL BITGET(flags, 5)  ; → 1
    BITTOGGLE flags, 5    ; Toggle bit 5
    ```

### ![](../assets/images/IconSK.webp)MAP Extension Functions (6 Added)
!!! summary ""

    Extends EM+EE's MAP functions (12) to provide a total of 18 MAP operation functions.

!!! info "API"

    ``` { #language-erbapi }
    string MAP_VALUES(mapName)
    string MAP_TOSTRING(mapName{, pairSep, kvSep})
    int MAP_FROMSTRING(mapName, str{, pairSep, kvSep})
    int MAP_MERGE(destMapName, srcMapName)
    int MAP_REMOVEIF(mapName, operator, value)
    string MAP_FINDKEY(mapName, operator, value)
    ```

!!! example "Example"

    ``` { #language-erb }
    MAP_CREATE "myMap"
    MAP_SET "myMap", "key1", "value1"
    MAP_SET "myMap", "key2", "value2"
    PRINTS MAP_VALUES("myMap")      ; → "value1,value2"
    PRINTS MAP_TOSTRING("myMap")    ; → "key1=value1,key2=value2"
    MAP_MERGE "myMap", "otherMap"
    ```

### ![](../assets/images/IconSK.webp)Math Function Extensions (Trigonometric & Rounding)
!!! summary ""

    Adds trigonometric and rounding functions to EM+EE's math functions. Provides same-name overloads for Int and Float versions.

!!! info "API"

    ``` { #language-erbapi }
    float SIN(float) / int SIN(int)
    float COS(float) / int COS(int)
    float TAN(float) / int TAN(int)
    float ASIN(float) / int ASIN(int)
    float ACOS(float) / int ACOS(int)
    float ATAN(float) / int ATAN(int)
    int FLOOR(float) / float FLOOR(float)
    int CEIL(float) / float CEIL(float)
    int ROUND(float) / float ROUND(float)
    ```

### ![](../assets/images/IconSK.webp)`HTML_PRINTC` / `HTML_PRINTLC` — Right/Left-Aligned HTML Output
!!! summary ""

    Outputs HTML strings right-aligned or left-aligned. Pixel-precise alignment even with proportional fonts.

!!! info "API"

    ``` { #language-erbapi }
    HTML_PRINTC htmlString {, cellWidth}
    HTML_PRINTLC htmlString {, cellWidth}
    ```

### ![](../assets/images/IconSK.webp)`SPRITECREATEFROMFILE` — Create Sprite from File
!!! summary ""

    Creates a sprite directly from an image file. Generates sprites without going through a Graphics buffer (GCREATE).

!!! info "API"

    ``` { #language-erbapi }
    int SPRITECREATEFROMFILE spriteName, filePath{, x, y, width, height}
    ```

### ![](../assets/images/Icondotnet.webp)`G_POLYGON` Series — Polygon Drawing
!!! summary ""

    Ported from the DotNet version. Draws and fills polygons. Only available in SkiaSharp mode (CodeEE in GDI mode).

!!! info "API"

    ``` { #language-erbapi }
    G_POLYGON_DRAW gID
    G_POLYGON_FILL gID
    G_POLYGON_POINT_ADD gID, x, y
    G_POLYGON_POINT_CLEAR gID
    ```

### ![](../assets/images/IconSK.webp)`TEXT_BGC_ON` / `TEXT_BGC_OFF` — Text Background Color Control
!!! summary ""

    Controls the display/hide of text background color.

!!! info "API"

    ``` { #language-erbapi }
    TEXT_BGC_ON
    TEXT_BGC_OFF
    ```

### ![](../assets/images/IconSK.webp)SQL Parameterized Queries
!!! summary ""

    Parameterized queries for SQL injection prevention.

!!! info "API"

    ``` { #language-erbapi }
    string SQL_ESCAPE(str)
    SQL_P_EXECUTE_NONQUERY query, arg0, arg1, ...
    SQL_P_EXECUTE_READER query, arg0, arg1, ...
    long SQL_P_EXECUTE_SCALAR_LONG query, arg0, arg1, ...
    string SQL_P_EXECUTE_SCALAR_STRING query, arg0, arg1, ...
    float SQL_P_EXECUTE_SCALAR_FLOAT query, arg0, arg1, ...
    ```

    - Safe query execution using `@0`, `@1`, ... placeholders

### ![](../assets/images/IconSK.webp)`STRICT_FONT_FALLBACK` — Strict Font Fallback
!!! summary ""

    Enables strict font fallback mode.

---

## DotNet Sync Features { #dotnet-sync }

### ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)GETCSVNOBY* Name Reverse Lookup
!!! summary ""

    Reverse lookup of character number by NAME/NICKNAME/CALLNAME/MASTERNAME. O(1) search, returns `-1` if not found.

!!! info "API"

    ``` { #language-erbapi }
    int GETCSVNOBYNAME(str)
    int GETCSVNOBYNICKNAME(str)
    int GETCSVNOBYCALLNAME(str)
    int GETCSVNOBYMASTERNAME(str)
    ```

### ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)`MATCHALL` / `MATCHALLEX` Full Search
!!! summary ""

    Full array search. Redesigned from DotNet version's command format to expression functions. Does not pollute RESULT.

!!! info "API"

    ``` { #language-erbapi }
    int MATCHALL(var, value{, beg, end{, outArr}})
    int MATCHALLEX("varName", value{, beg, end{, outArr}})
    ```

    - Return value: Match count
    - `outArr` (optional): Array to store matched indices (0-based)

### ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)Preload Byte-Level Cache
!!! summary ""

    Preloads ERB/CSV files into memory at startup. Reads from cache via `EraStreamReader.OpenOnCache()`, avoiding disk IO.

### ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)Stopwatch High-Precision Timing
!!! summary ""

    Migrates `SpriteAnime`/`SpriteAnimated` animation frame timing from `DateTime.Now` to `Stopwatch.GetTimestamp()`. Eliminates system clock precision limitations (~15ms), improving animation frame rate stability.

---

## Stability Fixes { #stability-fixes }

| Fix | Description |
|:---|:---|
| TOINT boundary fallback | Protective fallback for [TOINT extension](#variables) accepting Float: invalid input returns 0 instead of crashing |
| METHOD_Instruction Float branch | Consistency fix for [Float type](#variables): original only had Integer/String branches, Float function result was lost when called as command; Skia adds Float→RESULTF branch |
| MainWindow null check | No crash on operations before engine initialization |
| PrintStringBuffer empty check | No out-of-range access on empty output lines |
| SKPaint using resource release | Added missing `using var` |
| ColorMatrix GDI+→SkiaSharp fix | Column-major→row-major layout, translation component\*255f |
| OpenGL context loss crash | Auto-fallback in dual-GPU/virtual machine environments |
| DIV button hit-test fallback | Boundary protection for [DIV rendering optimization](#skia-sharp): O(1) positioning assumes uniform line height; multi-line content breaks index mapping, falls back to linear traversal to preserve click usability |
| SQL_CONNECTION_OPEN security fix | Stability dimension of [security hardening](#changed-commands): path traversal blocking, connection leak fix, PRAGMA OFF→WAL preventing crash corruption |

---

## Feature Comparison { #feature-comparison }

| Feature | EM+EE | Skia Version | Notes |
|:---|:---:|:---:|:---|
| Rendering | GDI+ | SkiaSharp | Cross-platform support |
| Floating-point | ❌ | ✅ Float type | RESULTF/LOCALF/ARGF |
| Dynamic function call | ❌ | ✅ CALLSTR series | Function name via string variable |
| String expression evaluation | ❌ | ✅ EVAL/EVALS | Runtime expression evaluation |
| Bit array | ❌ | ✅ BITARRAY series | Ideal for flag management |
| MAP functions | 12 | 18 | 6 added |
| SQL | Basic | XML integration+parameterized | Import/export/safe queries |
| Math functions | Basic | Trigonometric+rounding | SIN/COS/TAN etc. |
| Right/left-aligned HTML output | ❌ | ✅ HTML_PRINTC/LC | |
| File→sprite | ❌ | ✅ SPRITECREATEFROMFILE | No GCREATE needed |
| Image layers | CBG only | ✅ SETIMAGELAYER series | depth/opacity/color matrix |
| Rendering control | ❌ | ✅ ANIMETIMER/TEXT_DRAWING_MODE/SKIA_QUALITY | |
| Polygon drawing | ❌ | ✅ G_POLYGON series | Ported from DotNet, SkiaSharp mode only |
| Text decoration lines | ❌ | ✅ Underline/Strikethrough | FONTSTYLE extension |
| Text background color control | ❌ | ✅ TEXT_BGC_ON/OFF | |
| Rendering backend | ❌ | ✅ Auto/OpenGL/CPU | |
| Reference parameters | Arrays only | ✅ Scalar+OUT | #REF/#REFF/OUT added |
| CBGSETSPRITE extension | Basic | ✅ Scale/opacity/CM | |
| SPRITECREATE extension | Basic | ✅ Offset/target size | |
| Image flip | ❌ | ✅ Flip with negative size | |
| Audio | Playback only | SoundTouch | Tempo/pitch change |
| Loading | Full | Lazy+Preload | For large-scale games |
| Function arguments | Fixed-length | VARIADIC ARG/ARGS/ARGF | Variable-length arguments |
| SELECTCASE | Linear scan | Jump table optimization | O(n) → O(1) |
| CSV reverse lookup | None | GETCSVNOBY* 4 functions | DotNet origin |
| Array full search | MATCH count only | MATCHALL/MATCHALLEX | DotNet origin, redesigned |
| Resource management | None | ✅ RM_ series/LRU cache | |
| Fullscreen mode | ❌ | ✅ F11 | Auto-show toolbar |
