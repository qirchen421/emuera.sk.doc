---
hide:
  - toc
---

# AUDIO_DUCK

| 関数名 | 引数 | 戻り値 |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`AUDIO_DUCK`](./AUDIO_DUCK.md) | `string`, `string`, `int`(, `int`, `int`) | `int` |

!!! info "API"

    ``` { #language-erbapi }
    AUDIO_DUCK SourceBus, TargetBus, DuckDb(, AttackMs, ReleaseMs)
    ```

    避让（duck）ルールを設置/上書き/解除する。1＝適用、0＝変化なし、-1＝不正、-2＝未対応。

!!! hint "ヒント"

    - `SourceBus` / `TargetBus` は `bgm` / `se` / `voice`。`target=master` と `source=target` は -1。
    - `DuckDb` は -80〜0 の整数 dB。0 はそのルールを無効化する。
    - 複数ルールが同じ target に当たる場合は `min`（最大減衰）を採り、掛け合わせない。
    - `AttackMs` / `ReleaseMs` の既定は 80 / 300。`audio.bus` が無い場合は -2。

### 関連項目
- [AUDIO_BUS](AUDIO_BUS.md)
- [AUDIO_BUS_QUERY](AUDIO_BUS_QUERY.md)
