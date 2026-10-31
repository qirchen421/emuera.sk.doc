---
hide:
  - toc
---

# AUDIO_BUS_QUERY

| 関数名 | 引数 | 戻り値 |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`AUDIO_BUS_QUERY`](./AUDIO_BUS_QUERY.md) | `string`, `int` | `int` |

!!! info "API"

    ``` { #language-erbapi }
    AUDIO_BUS_QUERY Bus, Field
    ```

    バスの意図/有効音量/ミュート/duck/声部数を照会する。不明は -1、cap 欠如は -2。

!!! hint "ヒント"

    - `Field`: VOLUME=0 / EFFECTIVE_VOLUME=1 / MUTE=2 / DUCK_DB=3 / VOICES=4。
    - `DUCK_DB` は VM の意図値（十分の一 dB、120＝-12.0 dB）で、FE の回供に依存しない。
    - `VOICES` は終態でない全インスタンス（旧 11 槽を含む）。
    - `master` / `voice` は `audio.bus` が無い場合 -2。

### 定数

| 定数 | 値 |
| :--- | :--- |
| `AUDIO_BQF_VOLUME` | 0 |
| `AUDIO_BQF_EFFECTIVE_VOLUME` | 1 |
| `AUDIO_BQF_MUTE` | 2 |
| `AUDIO_BQF_DUCK_DB` | 3 |
| `AUDIO_BQF_VOICES` | 4 |

### 関連項目
- [AUDIO_BUS](AUDIO_BUS.md)
- [AUDIO_DUCK](AUDIO_DUCK.md)
- [AUDIO_QUERY](AUDIO_QUERY.md)
