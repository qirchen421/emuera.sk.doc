---
hide:
  - toc
---

# AUDIO_DUCK

| Function name | Arguments | Return |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`AUDIO_DUCK`](./AUDIO_DUCK.en.md) | `string`, `string`, `int`(, `int`, `int`) | `int` |

!!! info "API"

    ``` { #language-erbapi }
    AUDIO_DUCK SourceBus, TargetBus, DuckDb(, AttackMs, ReleaseMs)
    ```

    Installs/overwrites/disables a duck rule. 1 = applied, 0 = no change, -1 = invalid, -2 = unsupported.

!!! hint "Hint"

    - `SourceBus` / `TargetBus` are `bgm` / `se` / `voice`; `target=master` and `source=target` return -1.
    - `DuckDb` is an integer dB in -80..0; 0 disables the rule.
    - Multiple rules on the same target use `min` (strongest attenuation), not multiplication.
    - `AttackMs` / `ReleaseMs` default to 80 / 300; returns -2 without `audio.bus`.

### Related
- [AUDIO_BUS](AUDIO_BUS.en.md)
- [AUDIO_BUS_QUERY](AUDIO_BUS_QUERY.en.md)
