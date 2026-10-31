---
hide:
  - toc
---

# AUDIO_PLAY

| 函数名 | 参数 | 返回值 |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`AUDIO_PLAY`](./AUDIO_PLAY.zh.md) | `string`, `string`, `int`, `int`, `int`(, `int`, `int`, `int`, `int`, `int`, `int`, `real`) | `int` |

!!! info "API"

    ``` { #language-erbapi }
    AUDIO_PLAY MediaFile, Bus, Volume, Loop, FadeMs(, Priority, MaxInstances, Flags, CrossfadeFrom, CrossfadeMs, PreservePitch, Rate)
    ```

    创建一个 EWP audio v1 播放实例，返回 VM 分配的句柄（0＝拒绝）。需要 `audio.instances`。

!!! hint "提示"

    - 句柄 ≥1、单调递增、会话内不复用；0＝拒绝。
    - `Bus` 为 `bgm` / `se` / `voice`；`voice` 需要 `audio.bus`，`master` 不可作为实例 bus。
    - `Flags`: bit0=`AUDIO_FLAG_STEAL_NONE`(1)，bit1=`AUDIO_FLAG_IF_CHANGED`(2)。`if_changed` 与 `crossfadeFrom` 同时给出返回 0。
    - `CrossfadeFrom`: 0＝无，-1＝同 bus 最老 live 实例，>0＝具体句柄。`CrossfadeMs` 省略＝`FadeMs`；0＝硬切。
    - `Rate` 是第 12 参（0.1〜10.0，默认 1.0）。入场参数原子给出，不会先以 1.0x 起播一帧。
    - v0.2 会话按 fail-closed 返回 0，不回退旧 `audio.bgm/se` 通道。

### 常量

| 常量 | 值 |
| :--- | :--- |
| `AUDIO_FLAG_STEAL_NONE` | 1 |
| `AUDIO_FLAG_IF_CHANGED` | 2 |

### 相关项目
- [AUDIO_CTL](AUDIO_CTL.zh.md)
- [AUDIO_QUERY](AUDIO_QUERY.zh.md)
- [AUDIO_BUS](AUDIO_BUS.zh.md)
