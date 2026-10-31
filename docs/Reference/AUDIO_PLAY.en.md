---
hide:
  - toc
---

# AUDIO_PLAY

| Function name | Arguments | Return |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`AUDIO_PLAY`](./AUDIO_PLAY.en.md) | `string`, `string`, `int`, `int`, `int`(, `int`, `int`, `int`, `int`, `int`, `int`, `real`) | `int` |

!!! info "API"

    ``` { #language-erbapi }
    AUDIO_PLAY MediaFile, Bus, Volume, Loop, FadeMs(, Priority, MaxInstances, Flags, CrossfadeFrom, CrossfadeMs, PreservePitch, Rate)
    ```

    Creates an EWP audio v1 instance and returns the VM-assigned handle (0 = rejected). Requires `audio.instances`.

!!! hint "Hint"

    - Handle ≥1, monotonically increasing, never reused within a session; 0 = rejected.
    - `Bus` is `bgm` / `se` / `voice`; `voice` requires `audio.bus`; `master` is not a valid instance bus.
    - `Flags`: bit0=`AUDIO_FLAG_STEAL_NONE`(1), bit1=`AUDIO_FLAG_IF_CHANGED`(2). `if_changed` with `crossfadeFrom` returns 0.
    - `CrossfadeFrom`: 0 = none, -1 = oldest live on the same bus, >0 = explicit handle. `CrossfadeMs` defaults to `FadeMs`; 0 = hard cut.
    - `Rate` is the 12th argument (0.1–10.0, default 1.0). Entry parameters are atomic (no 1.0x first frame).
    - In v0.2 sessions it is fail-closed (0) and never falls back to legacy `audio.bgm/se`.

### Constants

| Constant | Value |
| :--- | :--- |
| `AUDIO_FLAG_STEAL_NONE` | 1 |
| `AUDIO_FLAG_IF_CHANGED` | 2 |

### Related
- [AUDIO_CTL](AUDIO_CTL.en.md)
- [AUDIO_QUERY](AUDIO_QUERY.en.md)
- [AUDIO_BUS](AUDIO_BUS.en.md)
