---
hide:
  - toc
---

# AUDIO_BUS

| 函数名 | 参数 | 返回值 |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`AUDIO_BUS`](./AUDIO_BUS.zh.md) | `string`, `int`, `int`, `int` | `int` |

!!! info "API"

    ``` { #language-erbapi }
    AUDIO_BUS Bus, Op, Value, DurMs
    ```

    操作总线音量/静音/停止。1＝已应用，0＝no-op，-1＝非法，-2＝不支持。

!!! hint "提示"

    - `Bus` 为 `master` / `bgm` / `se` / `voice`；`bgm`/`se` 始终可用，`master`/`voice` 需要 `audio.bus`。
    - `Op`: VOLUME=0 / MUTE=1 / STOP_ALL=2。
    - `STOP_ALL` 的 `Value` 是 `includePaused`（0/1，默认 0）；`DurMs` 是淡出（需要 transitions）。
    - v1 不做总线音量淡变（volume/mute 的 `DurMs` 被忽略并计 degraded）。

### 常量

| 常量 | 值 |
| :--- | :--- |
| `AUDIO_BUSOP_VOLUME` | 0 |
| `AUDIO_BUSOP_MUTE` | 1 |
| `AUDIO_BUSOP_STOP_ALL` | 2 |
| `AUDIO_BUS_MASTER` | 0 |
| `AUDIO_BUS_BGM` | 1 |
| `AUDIO_BUS_SE` | 2 |
| `AUDIO_BUS_VOICE` | 3 |

### 相关项目
- [AUDIO_BUS_QUERY](AUDIO_BUS_QUERY.zh.md)
- [AUDIO_DUCK](AUDIO_DUCK.zh.md)
