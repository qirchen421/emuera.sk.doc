---
hide:
  - toc
---

# AUDIO_DUCK

| 函数名 | 参数 | 返回值 |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`AUDIO_DUCK`](./AUDIO_DUCK.zh.md) | `string`, `string`, `int`(, `int`, `int`) | `int` |

!!! info "API"

    ``` { #language-erbapi }
    AUDIO_DUCK SourceBus, TargetBus, DuckDb(, AttackMs, ReleaseMs)
    ```

    安装/覆盖/关闭避让（duck）规则。1＝已应用，0＝无变化，-1＝非法，-2＝不支持。

!!! hint "提示"

    - `SourceBus` / `TargetBus` 为 `bgm` / `se` / `voice`；`target=master` 与 `source=target` 返回 -1。
    - `DuckDb` 为 -80〜0 的整数 dB；0 表示关闭该规则。
    - 多条规则命中同一 target 时取 `min`（最大衰减），不叠乘。
    - `AttackMs` / `ReleaseMs` 默认 80 / 300；缺少 `audio.bus` 返回 -2。

### 相关项目
- [AUDIO_BUS](AUDIO_BUS.zh.md)
- [AUDIO_BUS_QUERY](AUDIO_BUS_QUERY.zh.md)
