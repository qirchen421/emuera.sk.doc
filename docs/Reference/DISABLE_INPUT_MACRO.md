---
hide:
  - toc
---

# DISABLE_INPUT_MACRO ![](../assets/images/IconSK.webp)

| 関数名                                                         | 引数     | 戻り値   |
| :------------------------------------------------------------- | :------- | :------- |
| ![](../assets/images/IconSK.webp)[`DISABLE_INPUT_MACRO`](./DISABLE_INPUT_MACRO.md) | なし | `integer` |

!!! info "API"

    ```  { #language-erbapi }
	int DISABLE_INPUT_MACRO
    ```
    全入力（textbox + SEQUENCEINPUT）のマクロ解析を無効化する。呼び出し後、入力はそのまま1段として渡され、`(...)` 反復マクロを解析しない、`\n` による分割も `\e` MesSkip 処理も行わない。

    - デフォルト状態はマクロ解析 ON（本来の PressEnterKey と一致）
    - `ENABLE_INPUT_MACRO` でデフォルト動作に復元可能
    - 戻り値は常に `0`

!!! warning "注意"

    `CanRestructure = false` のため、定数畳み込みの対象にならない。

### 関連項目
- [ENABLE_INPUT_MACRO](ENABLE_INPUT_MACRO.md)
- [SEQUENCEINPUT](SEQUENCEINPUT.md)
- [INPUT](INPUT.md)
