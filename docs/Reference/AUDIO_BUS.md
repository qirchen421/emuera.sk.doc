---
hide:
  - toc
---

# AUDIO_BUS

| 関数名 | 引数 | 戻り値 |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`AUDIO_BUS`](./AUDIO_BUS.md) | `string`, `int`, `int`, `int` | `int` |

!!! info "API"

    ``` { #language-erbapi }
    AUDIO_BUS Bus, Op, Value, DurMs
    ```

    バスの音量/ミュート/停止を操作する。1＝適用、0＝no-op、-1＝不正、-2＝未対応。

!!! hint "ヒント"

    - `Bus` は `master` / `bgm` / `se` / `voice`。`bgm`/`se` は常時、`master`/`voice` は `audio.bus` が必要。
    - `Op`: VOLUME=0 / MUTE=1 / STOP_ALL=2。
    - `STOP_ALL` の `Value` は `includePaused`（0/1、既定 0）。`DurMs` はフェードアウト（transitions が必要）。
    - v1 はバス音量の淡変をしない（volume/mute の `DurMs` は無視し degraded を数える）。

### 定数

| 定数 | 値 |
| :--- | :--- |
| `AUDIO_BUSOP_VOLUME` | 0 |
| `AUDIO_BUSOP_MUTE` | 1 |
| `AUDIO_BUSOP_STOP_ALL` | 2 |
| `AUDIO_BUS_MASTER` | 0 |
| `AUDIO_BUS_BGM` | 1 |
| `AUDIO_BUS_SE` | 2 |
| `AUDIO_BUS_VOICE` | 3 |

### 関連項目
- [AUDIO_BUS_QUERY](AUDIO_BUS_QUERY.md)
- [AUDIO_DUCK](AUDIO_DUCK.md)
