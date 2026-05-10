---
hide:
  - toc
---

# BITMAP_CACHE_ENABLE

Author: JukesBouver99

| Function name                                                | Arguments  | Return |
| :----------------------------------------------------------- | :---------| :------|
| ![](../assets/images/Iconetc.webp)[`BITMAP_CACHE_ENABLE`](./BITMAP_CACHE_ENABLE.md) | `int` | void   |

!!! info "API"

    ```  { #language-erbapi }
	BITMAP_CACHE_ENABLE bool
    ```
    
	Accelerates drawing by rendering frequently color-changing text as bitmaps.  
	When enabled, it applies to all subsequent lines. You can expect speedup by wrapping heavy processing sections with `BITMAP_CACHE_ENABLE 1` and `BITMAP_CACHE_ENABLE 0`.

	When this feature is enabled, text display positions may shift.

!!! hint "Hint"

    Command and expression function both supported.

!!! skia "Skia Edition Changes"

    | Item | EM+EE | Skia Edition |
    |:---|:---|:---|
    | `BITMAP_CACHE_ENABLE` | Expression function (has return value) | Command (no return value) |

    In EM+EE, this was implemented as an expression function. In the Skia edition, it has been reimplemented as a command. The functionality itself is unchanged.

### See Also
- [Skia Edition Specification Changes](../Skia/Skia_Summary.md#changed-commands)
