---
hide:
  - toc
---

# AUDIO_CTL

| 函数名 | 参数 | 返回值 |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`AUDIO_CTL`](./AUDIO_CTL.zh.md) | `int`, `int`, `any`, `int`(, `int`, `string`) | `int` |

!!! info "API"

    ``` { #language-erbapi }
    AUDIO_CTL Handle, Op, Value, DurMs(, PreservePitch, Curve)
    ```

    控制播放实例。1＝已应用，0＝no-op，-1＝未知/终态/非法，-2＝不支持。

!!! hint "提示"

    - `Op`: STOP=0 / PAUSE=1 / RESUME=2 / SEEK=3 / VOLUME=4 / FADE=5 / RATE=6 / PRIORITY=7 / LOOP=8。
    - `SEEK` 需要 `audio.transitions`（缺失返回 -2）；`FADE` 必须给 `DurMs`。
    - `RATE` 的 `Value` 是百分比（100＝1.0x）；`PreservePitch` 仅对 RATE 有效。
    - 对 `pending` / `deferred` 的 VOLUME/RATE/LOOP/FADE 记录意图并返回 1。
    - `STOP` 的 `DurMs` 是淡出；`Curve` 为 `linear` / `log` / `sine`。

### 常量

| 常量 | 值 |
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

### 相关项目
- [AUDIO_PLAY](AUDIO_PLAY.zh.md)
- [AUDIO_QUERY](AUDIO_QUERY.zh.md)
