---
hide:
  - toc
---

# AUDIO_QUERY

| 関数名 | 引数 | 戻り値 |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`AUDIO_QUERY`](./AUDIO_QUERY.md) | `int`, `int` | `int` |

!!! info "API"

    ``` { #language-erbapi }
    AUDIO_QUERY Handle, Field
    ```

    インスタンスの状態/位置/音量などを照会する。不明な handle/field は -1。

!!! hint "ヒント"

    - `Field`: STATE=0 / POS=1 / DUR=2 / RATE=3 / VOLUME=4 / EFFECTIVE_VOLUME=5 / PRIORITY=6 / STOLEN_BY=7 / PITCH_PRESERVED=8 / LATENCY=9 / BUS=10 / LOOP=11。
    - `STATE` は列挙値（PENDING=1…STOLEN=8）。`STOLEN_BY` は 0＝未被抢。
    - `EFFECTIVE_VOLUME` は `audio.meta`＋`audio.feedback` の回供がある場合のみ（無ければ -1、ERB は整数に丸め）。
    - `LATENCY` はデバイス級の読みで、不明なら -1。終態 handle も淘汰まで照会できる。

### 定数

| 定数 | 値 |
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

| 状態 | 値 |
| :--- | :--- |
| `AUDIO_STATE_PENDING` | 1 |
| `AUDIO_STATE_PLAYING` | 2 |
| `AUDIO_STATE_PAUSED` | 3 |
| `AUDIO_STATE_DEFERRED` | 4 |
| `AUDIO_STATE_ENDED` | 5 |
| `AUDIO_STATE_FAILED` | 6 |
| `AUDIO_STATE_STOPPED` | 7 |
| `AUDIO_STATE_STOLEN` | 8 |

### 関連項目
- [AUDIO_PLAY](AUDIO_PLAY.md)
- [AUDIO_CTL](AUDIO_CTL.md)
- [AUDIO_BUS_QUERY](AUDIO_BUS_QUERY.md)
