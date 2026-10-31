---
hide:
  - toc
---

# AUDIO_CTL

| 関数名 | 引数 | 戻り値 |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`AUDIO_CTL`](./AUDIO_CTL.md) | `int`, `int`, `any`, `int`(, `int`, `string`) | `int` |

!!! info "API"

    ``` { #language-erbapi }
    AUDIO_CTL Handle, Op, Value, DurMs(, PreservePitch, Curve)
    ```

    再生インスタンスを制御する。1＝適用、0＝no-op、-1＝不明/終態/不正、-2＝未対応。

!!! hint "ヒント"

    - `Op`: STOP=0 / PAUSE=1 / RESUME=2 / SEEK=3 / VOLUME=4 / FADE=5 / RATE=6 / PRIORITY=7 / LOOP=8。
    - `SEEK` は `audio.transitions` が必要（無い場合は -2）。`FADE` は `DurMs` 必須。
    - `RATE` の `Value` は百分率（100＝1.0x）。`PreservePitch` は RATE のみ有効。
    - `pending` / `deferred` への VOLUME/RATE/LOOP/FADE は意図を記録して 1。
    - `Stop` の `DurMs` はフェードアウト、`Curve` は `linear` / `log` / `sine`。

### 定数

| 定数 | 値 |
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

### 関連項目
- [AUDIO_PLAY](AUDIO_PLAY.md)
- [AUDIO_QUERY](AUDIO_QUERY.md)
