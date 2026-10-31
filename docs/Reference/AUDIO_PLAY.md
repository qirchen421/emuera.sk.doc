---
hide:
  - toc
---

# AUDIO_PLAY

| 関数名 | 引数 | 戻り値 |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`AUDIO_PLAY`](./AUDIO_PLAY.md) | `string`, `string`, `int`, `int`, `int`(, `int`, `int`, `int`, `int`, `int`, `int`, `real`) | `int` |

!!! info "API"

    ``` { #language-erbapi }
    AUDIO_PLAY MediaFile, Bus, Volume, Loop, FadeMs(, Priority, MaxInstances, Flags, CrossfadeFrom, CrossfadeMs, PreservePitch, Rate)
    ```

    EWP audio v1 の再生インスタンスを作成し、VM が発行したハンドルを返す（0＝拒否）。`audio.instances` が必要。

!!! hint "ヒント"

    - ハンドルは 1 以上・単調増加・セッション内で再利用しない。0 は拒否。
    - `Bus` は `bgm` / `se` / `voice`。`voice` は `audio.bus` が必要。`master` は不可。
    - `Flags`: bit0=`AUDIO_FLAG_STEAL_NONE`(1)、bit1=`AUDIO_FLAG_IF_CHANGED`(2)。`if_changed` と `crossfadeFrom` の同時指定は 0。
    - `CrossfadeFrom`: 0＝なし、-1＝同じ bus の最古 live、>0＝既存ハンドル。`CrossfadeMs` は省くと `FadeMs`、0 はハードカット。
    - `Rate` は 12 番目（0.1〜10.0、既定 1.0）。入场パラメータは原子的（1.0x の初帧を挟まない）。
    - v0.2 セッションでは fail-closed（0）で、旧 `audio.bgm/se` へは回退しない。

### 定数

| 定数 | 値 |
| :--- | :--- |
| `AUDIO_FLAG_STEAL_NONE` | 1 |
| `AUDIO_FLAG_IF_CHANGED` | 2 |

### 関連項目
- [AUDIO_CTL](AUDIO_CTL.md)
- [AUDIO_QUERY](AUDIO_QUERY.md)
- [AUDIO_BUS](AUDIO_BUS.md)
