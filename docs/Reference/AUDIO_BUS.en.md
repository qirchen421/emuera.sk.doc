---
hide:
  - toc
---

# AUDIO_BUS

| Function name | Arguments | Return |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`AUDIO_BUS`](./AUDIO_BUS.en.md) | `string`, `int`, `int`, `int` | `int` |

!!! info "API"

    ``` { #language-erbapi }
    AUDIO_BUS Bus, Op, Value, DurMs
    ```

    Controls bus volume/mute/stop_all. 1 = applied, 0 = no-op, -1 = invalid, -2 = unsupported.

!!! hint "Hint"

    - `Bus` is `master` / `bgm` / `se` / `voice`; `bgm`/`se` are always available, `master`/`voice` require `audio.bus`.
    - `Op`: VOLUME=0 / MUTE=1 / STOP_ALL=2.
    - `STOP_ALL` `Value` is `includePaused` (0/1, default 0); `DurMs` is a fade-out (requires transitions).
    - v1 does not fade bus volume (`DurMs` on volume/mute is ignored and counted as degraded).

### Constants

| Constant | Value |
| :--- | :--- |
| `AUDIO_BUSOP_VOLUME` | 0 |
| `AUDIO_BUSOP_MUTE` | 1 |
| `AUDIO_BUSOP_STOP_ALL` | 2 |
| `AUDIO_BUS_MASTER` | 0 |
| `AUDIO_BUS_BGM` | 1 |
| `AUDIO_BUS_SE` | 2 |
| `AUDIO_BUS_VOICE` | 3 |

### Related
- [AUDIO_BUS_QUERY](AUDIO_BUS_QUERY.en.md)
- [AUDIO_DUCK](AUDIO_DUCK.en.md)
