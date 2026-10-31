---
hide:
  - toc
---

# AUDIO_CTL

| Function name | Arguments | Return |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`AUDIO_CTL`](./AUDIO_CTL.en.md) | `int`, `int`, `any`, `int`(, `int`, `string`) | `int` |

!!! info "API"

    ``` { #language-erbapi }
    AUDIO_CTL Handle, Op, Value, DurMs(, PreservePitch, Curve)
    ```

    Controls an instance. 1 = applied, 0 = no-op, -1 = unknown/terminal/invalid, -2 = unsupported.

!!! hint "Hint"

    - `Op`: STOP=0 / PAUSE=1 / RESUME=2 / SEEK=3 / VOLUME=4 / FADE=5 / RATE=6 / PRIORITY=7 / LOOP=8.
    - `SEEK` requires `audio.transitions` (-2 without it); `FADE` requires `DurMs`.
    - `RATE` `Value` is a percentage (100 = 1.0x); `PreservePitch` applies to RATE only.
    - VOLUME/RATE/LOOP/FADE on `pending` / `deferred` record intent and return 1.
    - `STOP` `DurMs` is a fade-out; `Curve` is `linear` / `log` / `sine`.

### Constants

| Constant | Value |
| :--- | :--- |
| `AUDIO_OP_STOP` | 0 |
| `AUDIO_OP_PAUSE` | 1 |
| `AUDIO_OP_RESUME` | 2 |
| `AUDIO_OP_SEEK` | 3 |
| `AUDIO_OP_VOLUME` | 4 |
| `AUDIO_OP_FADE` | 5 |
| `AUDIO_OP_RATE` | 6 |
| `AUDIO_OP_PRIORITY` | 7 |
| `AUDIO_OP_LOOP` | 8 |

### Related
- [AUDIO_PLAY](AUDIO_PLAY.en.md)
- [AUDIO_QUERY](AUDIO_QUERY.en.md)
