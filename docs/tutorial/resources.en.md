# Resource Configuration — Preparing Image Resources

!!! info "Prerequisites"

    - **Prerequisite chapter**: [HTML Tag Syntax](html-syntax.en.md) (the `src` attribute of `<img>` tags references resource names)
    - **Reference category**: [Image Processing](../Reference/README.en.md#image)

    This page explains how to prepare and use image resources in Emuera. Variant tags at the end of each section indicate which variant supports the feature.

    | Tag | Variant |
    |-----|---------|
    | *(none)* | Supported in original Emuera |
    | **EM+EE** | Added in EM+EE |
    | **Skia** | Added in Skia |

---

## Overview

Displaying images in Emuera requires two elements:

1. **Image files** (PNG/JPG/BMP/WebP/GIF) placed in the `resources` folder
2. **Resource definition files** (CSV) declaring the mapping between resource names and images

Resource names are used as the `src` attribute value in `<img src='ResourceName'>` or in expression functions like `SPRITECREATED("ResourceName")`.

---

## Resource Definition File (CSV)

Placing a CSV format text file in the `resources` folder reads it as a resource definition file. Files can be placed in subfolders (since 1.823).

### Sprite Definition

```csv
;Comment line
ResourceName, FileName, x, y, width, height, posx, posy, delay, destWidth, destHeight
```

| Parameter | Position | Required | Description |
|-----------|----------|----------|-------------|
| ResourceName | 1 | ✅ | Used in `<img src='ResourceName'>` or `SPRITECREATED("ResourceName")`. Must be unique |
| FileName | 2 | ✅ | Image file name (with extension). Relative path from the CSV file. Parent directories not allowed |
| x, y, width, height | 3–6 | | Source image crop region (pixels). Omit to use the entire image |
| posx, posy | 7–8 | | Image relative position offset. Can be changed dynamically with `SPRITEPOS`/`SPRITEMOVE`. Defaults to `0,0` |
| delay | 9 | | Animation frames only. Display time for this frame (milliseconds). Defaults to `1000ms` |
| destWidth, destHeight | 10–11 | | Output size (pixels). Defaults to crop region size |

!!! tag-variant "Skia"

    The `destWidth`/`destHeight` parameters are stored in the SQLite metadata index in the Skia edition and decoded on demand during rendering.

### Animated Sprite Definition

```csv
ResourceName, ANIME, width, height
ResourceName, FileName, x, y, width, height, posx, posy, delay, destWidth, destHeight
ResourceName, FileName, x, y, width, height, posx, posy, delay, destWidth, destHeight
......
```

Write `ANIME` on the first line and specify the overall sprite size (`width, height` must be positive integers, cannot be omitted). Subsequent lines define each frame.

Animated sprites are not redrawn during wait periods like `INPUT` by default. Execute `SETANIMETIMER` to enable redrawing during waits.

---

## Supported Image Formats

| Format | Emuera | EM+EE | Skia | Description |
|--------|--------|-------|------|-------------|
| BMP | ✅ | ✅ | ✅ | Uncompressed, large file size |
| JPG | ✅ | ✅ | ✅ | Lossy compression, no transparency |
| PNG | ✅ | ✅ | ✅ | Lossless compression, transparency support |
| WebP | — | ✅ | ✅ | High compression, transparency and animation support |
| GIF (animated) | — | — | ✅ | Multi-frame animation support |

You can also load images dynamically from ERB using `GCREATEFROMFILE` or `SPRITECREATEFROMFILE`.

---

## Skia Resource Management

!!! tag-variant "Skia"

    The Skia edition completely redesigns image resource management. The core change is moving from "load all at startup" to "on-demand loading + tiered caching".

### Lazy-load Index

CSV pre-loading only builds an SQLite in-memory index (resource name → file path + crop region + output size), with 0 bytes of image data. Images are decoded to `SKBitmap` only on first render.

Regardless of how many resources are defined in CSV, startup memory consumption depends only on the index size, not the total image data.

### SharedBitmapCache — Global Bitmap Pool

Global LRU bitmap pool with a maximum capacity of 200 `SKBitmap` entries, keyed by **file path**.

- The same file is decoded only once, with multiple sprites sharing the same bitmap
- `ConstImage` only records the file path and does not hold an `SKBitmap` reference
- Rendering uses `SharedBitmapCache.Get(filepath)` for on-demand decoding
- When capacity is exceeded, the least recently used bitmap is evicted (Dispose) and re-decoded on next access

### AnimSpriteCache — Animated Sprite Cache

LRU cache with a maximum capacity of 6 animated sprites, keyed by **file path**.

- Only manages multi-frame GIF/WebP animations (`SpriteAnimated`), not CSV ANIME assembled-frame animations
- When capacity is exceeded, Evict releases all frame data and re-decodes on next access
- Solves the memory explosion caused by duplicate decoding of the same file in Sprite Sheet mode

### Cache Differences Between Animation Types

| Feature | CSV ANIME (SpriteAnime) | GIF/WebP Animation (SpriteAnimated) |
|---------|-------------------------|-------------------------------------|
| Frame source | Multiple independent files or different regions of the same file | Single multi-frame file |
| Cache mechanism | Each frame via SharedBitmapCache (max 200) | Entire animation via AnimSpriteCache (max 6) |
| Memory usage | Proportional to number of frame files | Proportional to number of animations (frame data managed as a whole) |
| Eviction behavior | Individual frame bitmaps evicted by LRU | Entire animation Evict/Reload |

---

## Skia Resource Usage Guidelines

!!! tag-variant "Skia"

### Prefer CSV Registration Over Runtime Dynamic Loading

The Skia edition's lazy-load index means CSV-registered resources have zero memory overhead at startup and are decoded on demand at first render. Therefore, **it is recommended to register image resources in CSV and let the system manage them uniformly**, rather than manually loading and releasing them via `SPRITECREATEFROMFILE` or `GCREATEFROMFILE` at the script level.

Applicable scenarios for runtime dynamic loading:

| Scenario | Recommended method | Reason |
|----------|-------------------|--------|
| General image resources | CSV registration | System manages lifecycle uniformly, no manual Dispose needed |
| One-time temporary sprites | `SPRITECREATEFROMFILE` | Release immediately after use, no CSV index waste |
| Art text/graphics drawn with GDRAW series | `GCREATEFROMFILE` | GraphicsImage is an independent canvas, does not go through SharedBitmapCache |

!!! warning "SPRITECREATEFROMFILE Caveats"

    Sprites created with `SPRITECREATEFROMFILE` are registered in `activeSprites` but have no CSV metadata index. Scripts must call `SPRITEDISPOSE` to release them after use, otherwise the sprite will continue to occupy memory. In contrast, CSV-registered sprites are uniformly released by the system during `RELOAD` or on exit.

### Animation Sprites: Prefer Multi-frame File Formats

When each frame of a CSV ANIME (SpriteAnime) comes from a different image file, each frame occupies one slot in SharedBitmapCache. When the number of animation frames exceeds 200, LRU eviction causes frequent decode/release cycles, resulting in memory spikes and performance degradation.

**Recommended approaches**:

| Approach | Description | Cache footprint |
|----------|-------------|----------------|
| Multi-frame GIF/WebP | One file containing all frames | AnimSpriteCache 1 slot |
| Sprite Sheet | Combine all frames into one image, specify crop regions in CSV | SharedBitmapCache 1 slot |
| CSV ANIME + multiple files | Each frame is an independent file | SharedBitmapCache N slots (not recommended for >200 frames) |

!!! example "Sprite Sheet Example"

    Combine an 8-frame animation into an 8×1 filmstrip image `walk.png` (each frame 64×64, total 512×64):

    ```csv
    WALK, ANIME, 64, 64
    WALK, walk.png, 0, 0, 64, 64, 0, 0, 100
    WALK, walk.png, 64, 0, 64, 64, 0, 0, 100
    WALK, walk.png, 128, 0, 64, 64, 0, 0, 100
    WALK, walk.png, 192, 0, 64, 64, 0, 0, 100
    WALK, walk.png, 256, 0, 64, 64, 0, 0, 100
    WALK, walk.png, 320, 0, 64, 64, 0, 0, 100
    WALK, walk.png, 384, 0, 64, 64, 0, 0, 100
    WALK, walk.png, 448, 0, 64, 64, 0, 0, 100
    ```

    All frames share the same file `walk.png`, occupying only 1 slot in SharedBitmapCache.

---

## Differences from Original Version

The original Emuera loads all image files specified in CSV into memory at startup and keeps them until exit. Therefore, the original version recommends "combining images into a single file" to reduce memory usage.

The Skia edition switches to on-demand loading + LRU caching, significantly reducing memory usage. In multi-file scenarios, `SharedBitmapCache` automatically manages decoding and caching, making "combining into a single file" no longer a necessary memory optimization — however, sprite sheets remain the best practice for animation sprites, not for memory reasons but for cache efficiency (1 slot vs N slots).

---

## See Also

- [HTML Tag Syntax](html-syntax.en.md) — The `src` attribute of `<img>` tags references resource names
- [SPRITECREATEFROMFILE](../Reference/SPRITECREATEFROMFILE.en.md) — Runtime image loading (Skia)
- [Resource Files (Legacy)](../Emuera/resources.en.md) — Original Emuera resource configuration
