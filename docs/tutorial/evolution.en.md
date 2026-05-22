# Version Evolution Comparison

!!! tip "Summary"

    Compare the feature evolution of each version in the ERABASIC ecosystem. Uses Emuera as the baseline, documenting extensions in EM+EE and its variants.

---

## Evolution Tree

```
Emuera (Baseline — the practical starting point of modern ERABASIC)
  │
  └─ EmueraEM+EE (Feature extensions)
       │
       ├─ EM extensions: Resource release, WebP, compressed saves, icon specification...
       └─ EE extensions: Audio, hotkeys, clipboard, TTF/OTF dynamic loading...
            │
            ├─ Skia (SkiaSharp version)
            │    ├─ Lazy loading mechanism
            │    ├─ Plugin system
            │    ├─ MAP enhanced functions (9 new, 21 total)
            │    ├─ SQL enhancements (XML import/export)
            │    ├─ Audio processing (SoundTouch)
            │    └─ VARIADIC variable arguments
            │
            ├─ DotNet (.NET 8 version)
            │    ├─ SkiaSharp cross-platform rendering
            │    ├─ SQLite built-in
            │    ├─ Parallel loading
            │    ├─ G_POLYGON polygon drawing
            │    └─ Multi-language resx
            │
            └─ Emuera-SkiaX (Android port)
                 ├─ Skia core + Xamarin framework
                 ├─ Touch optimization + virtual gamepad
                 ├─ Gallery view + floating toolbar
                 └─ Glyph fallback + lazy loading adaptation
```

> 💡 eramaker is the origin of ERABASIC, but its features are severely outdated. Emuera fixed all its known bugs and significantly extended the syntax, making it the practical baseline for modern ERABASIC.

---

## Feature Comparison Table

### Basic Features

| Feature Area | Emuera | EM+EE | Skia | DotNet |
|:---|:---:|:---:|:---:|:---:|
| Basic variables | ✅ | ✅ | ✅ | ✅ |
| User-defined variables | ✅ #DIM/#DIMS | ✅ | ✅ VARIADIC | ✅ |
| Expression functions | ✅ #FUNCTION | ✅ | ✅ | ✅ |
| Loop statements | ✅ FOR/WHILE/DO | ✅ | ✅ | ✅ |
| SELECTCASE | ✅ | ✅ | ✅ | ✅ |
| HTML_PRINT | ✅ | ✅ | ✅ | ✅ |

### Extended Features

| Feature Area | Emuera | EM+EE | Skia | DotNet |
|:---|:---:|:---:|:---:|:---:|
| Graphics drawing | ✅ | ✅ | ✅ | ✅ G_POLYGON |
| MAP associative array | — | ✅ 12 functions | ✅ 21 functions | — 6 functions (DICT) |
| DataTable | — | ✅ | ✅ | — |
| XML operations | — | ✅ | ✅ | — |
| Audio playback | — | ✅ | ✅ SoundTouch | ✅ |
| SQL database | — | — | ✅ | ✅ |
| Lazy loading | — | — | ✅ | — |
| Plugin system | — | — | ✅ | — |
| Parallel loading | — | — | — | ✅ |
| Multi-language | — | — | Dual XML | Triple resx |

### EM+EE Exclusive Extensions

| Feature | Extension Source | Details |
|:---|:---|:---|
| Resource lock release | EM | Avoid image files being locked while program is running |
| WebP format support | EM | WebP format support for resource files |
| Compressed saves | EM | Save data compressed storage |
| Audio support | EE | PLAYSOUND / PLAYBGM / STOPBGM |
| Hotkey extensions | EE | Ctrl+T/R/O shortcuts |
| TTF/OTF dynamic loading | EE | Font dynamic loading |

### Skia Version Exclusive Extensions

| Feature | Details |
|:---|:---|
| Lazy loading | Function-call-based ERB file dynamic loading |
| MAP enhanced functions | MAP_EXISTS / MAP_REMOVE / MAP_COPY etc. (9 new) |
| SQL enhancements | SQL_XMLEXPORT / SQL_XMLIMPORT |
| VARIADIC | VARIADIC ARG/ARGS/ARGF variable arguments |
| SoundTouch | Audio tempo/pitch shifting |

### EM+EE Inherited Features

| Feature | Details |
|:---|:---|
| Plugin system | External DLL feature extension (inherited from EM+EE upstream) |

---

## Detailed Information

| Version | Overview Page |
|:---|:---|
| EM+EE | [EM+EE Feature Overview](../EMEE/EMEE_Summary.en.md) |
| Skia | [Skia Feature Overview](../Skia/Skia_Summary.en.md) |
| Emuera | [Emuera Overview](../Emuera/README.en.md) |
| eramaker | [eramaker Overview](../eramaker/README.en.md) |
