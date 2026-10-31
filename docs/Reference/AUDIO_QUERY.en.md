---
hide:
  - toc
---

# AUDIO_QUERY

| Function name | Arguments | Return |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`AUDIO_QUERY`](./AUDIO_QUERY.en.md) | `int`, `int` | `int` |

!!! info "API"

    ``` { #language-erbapi }
    AUDIO_QUERY Handle, Field
    ```

    Queries instance state/position/volume etc. Unknown handle/field returns -1.

!!! hint "Hint"

    - `Field`: STATE=0 / POS=1 / DUR=2 / RATE=3 / VOLUME=4 / EFFECTIVE_VOLUME=5 / PRIORITY=6 / STOLEN_BY=7 / PITCH_PRESERVED=8 / LATENCY=9 / BUS=10 / LOOP=11.
    - `STATE` returns the enum (PENDING=1…STOLEN=8); `STOLEN_BY` is 0 when not stolen.
    - `EFFECTIVE_VOLUME` is available only with `audio.meta` + `audio.feedback` (else -1; ERB rounds to int).
    - `LATENCY` is a device-level reading (-1 unknown); terminal handles remain queryable until evicted.

### Constants

| Constant | Value |
| :--- | :--- |
| `AUDIO_QF_STATE` | 0 |
| `AUDIO_QF_POS` | 1 |
| `AUDIO_QF_DUR` | 2 |
| `AUDIO_QF_RATE` | 3 |
| `AUDIO_QF_VOLUME` | 4 |
| `AUDIO_QF_EFFECTIVE_VOLUME` | 5 |
| `AUDIO_QF_PRIORITY` | 6 |
| `AUDIO_QF_STOLEN_BY` | 7 |
| `AUDIO_QF_PITCH_PRESERVED` | 8 |
| `AUDIO_QF_LATENCY` | 9 |
| `AUDIO_QF_BUS` | 10 |
| `AUDIO_QF_LOOP` | 11 |

| State | Value |
| :--- | :--- |
| `AUDIO_STATE_PENDING` | 1 |
| `AUDIO_STATE_PLAYING` | 2 |
| `AUDIO_STATE_PAUSED` | 3 |
| `AUDIO_STATE_DEFERRED` | 4 |
| `AUDIO_STATE_ENDED` | 5 |
| `AUDIO_STATE_FAILED` | 6 |
| `AUDIO_STATE_STOPPED` | 7 |
| `AUDIO_STATE_STOLEN` | 8 |

### Related
- [AUDIO_PLAY](AUDIO_PLAY.en.md)
- [AUDIO_CTL](AUDIO_CTL.en.md)
- [AUDIO_BUS_QUERY](AUDIO_BUS_QUERY.en.md)
