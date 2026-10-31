---
hide:
  - toc
---

# AUDIO_BUS_QUERY

| Function name | Arguments | Return |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`AUDIO_BUS_QUERY`](./AUDIO_BUS_QUERY.en.md) | `string`, `int` | `int` |

!!! info "API"

    ``` { #language-erbapi }
    AUDIO_BUS_QUERY Bus, Field
    ```

    Queries bus intent/effective volume/mute/duck/voices. Unknown = -1, missing cap = -2.

!!! hint "Hint"

    - `Field`: VOLUME=0 / EFFECTIVE_VOLUME=1 / MUTE=2 / DUCK_DB=3 / VOICES=4.
    - `DUCK_DB` is the VM intent (tenths of dB, 120 = -12.0 dB), independent of FE feedback.
    - `VOICES` counts all non-terminal instances (including the 11 legacy slots).
    - `master` / `voice` return -2 without `audio.bus`.

### Constants

| Constant | Value |
| :--- | :--- |
| `AUDIO_BQF_VOLUME` | 0 |
| `AUDIO_BQF_EFFECTIVE_VOLUME` | 1 |
| `AUDIO_BQF_MUTE` | 2 |
| `AUDIO_BQF_DUCK_DB` | 3 |
| `AUDIO_BQF_VOICES` | 4 |

### Related
- [AUDIO_BUS](AUDIO_BUS.en.md)
- [AUDIO_DUCK](AUDIO_DUCK.en.md)
- [AUDIO_QUERY](AUDIO_QUERY.en.md)
