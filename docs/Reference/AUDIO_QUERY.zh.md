---
hide:
  - toc
---

# AUDIO_QUERY

| 函数名 | 参数 | 返回值 |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`AUDIO_QUERY`](./AUDIO_QUERY.zh.md) | `int`, `int` | `int` |

!!! info "API"

    ``` { #language-erbapi }
    AUDIO_QUERY Handle, Field
    ```

    查询实例状态/位置/音量等。未知 handle/field 返回 -1。

!!! hint "提示"

    - `Field`: STATE=0 / POS=1 / DUR=2 / RATE=3 / VOLUME=4 / EFFECTIVE_VOLUME=5 / PRIORITY=6 / STOLEN_BY=7 / PITCH_PRESERVED=8 / LATENCY=9 / BUS=10 / LOOP=11。
    - `STATE` 返回枚举值（PENDING=1…STOLEN=8）；`STOLEN_BY` 为 0＝未被抢。
    - `EFFECTIVE_VOLUME` 仅在 `audio.meta`＋`audio.feedback` 有回供时可用（否则 -1；ERB 侧四舍五入为整数）。
    - `LATENCY` 是设备级读数，未知为 -1；终态句柄在淘汰前仍可查询。

### 常量

| 常量 | 值 |
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

| 状态 | 值 |
| :--- | :--- |
| `AUDIO_STATE_PENDING` | 1 |
| `AUDIO_STATE_PLAYING` | 2 |
| `AUDIO_STATE_PAUSED` | 3 |
| `AUDIO_STATE_DEFERRED` | 4 |
| `AUDIO_STATE_ENDED` | 5 |
| `AUDIO_STATE_FAILED` | 6 |
| `AUDIO_STATE_STOPPED` | 7 |
| `AUDIO_STATE_STOLEN` | 8 |

### 相关项目
- [AUDIO_PLAY](AUDIO_PLAY.zh.md)
- [AUDIO_CTL](AUDIO_CTL.zh.md)
- [AUDIO_BUS_QUERY](AUDIO_BUS_QUERY.zh.md)
