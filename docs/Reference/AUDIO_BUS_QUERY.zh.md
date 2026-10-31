---
hide:
  - toc
---

# AUDIO_BUS_QUERY

| 函数名 | 参数 | 返回值 |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`AUDIO_BUS_QUERY`](./AUDIO_BUS_QUERY.zh.md) | `string`, `int` | `int` |

!!! info "API"

    ``` { #language-erbapi }
    AUDIO_BUS_QUERY Bus, Field
    ```

    查询总线意图/有效音量/静音/duck/声部数。未知返回 -1，缺 cap 返回 -2。

!!! hint "提示"

    - `Field`: VOLUME=0 / EFFECTIVE_VOLUME=1 / MUTE=2 / DUCK_DB=3 / VOICES=4。
    - `DUCK_DB` 是 VM 意图值（十分之一 dB，120＝-12.0 dB），不依赖 FE 回供。
    - `VOICES` 统计全部非终态实例（含旧 11 槽）。
    - 缺少 `audio.bus` 时，`master` / `voice` 返回 -2。

### 常量

| 常量 | 值 |
| :--- | :--- |
| `AUDIO_BQF_VOLUME` | 0 |
| `AUDIO_BQF_EFFECTIVE_VOLUME` | 1 |
| `AUDIO_BQF_MUTE` | 2 |
| `AUDIO_BQF_DUCK_DB` | 3 |
| `AUDIO_BQF_VOICES` | 4 |

### 相关项目
- [AUDIO_BUS](AUDIO_BUS.zh.md)
- [AUDIO_DUCK](AUDIO_DUCK.zh.md)
- [AUDIO_QUERY](AUDIO_QUERY.zh.md)
