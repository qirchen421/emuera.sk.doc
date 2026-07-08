---
hide:
  - toc
---

# ENABLE_INPUT_MACRO ![](../assets/images/IconSK.webp)

| 関数名                                                         | 引数     | 戻り値   |
| :------------------------------------------------------------- | :------- | :------- |
| ![](../assets/images/IconSK.webp)[`ENABLE_INPUT_MACRO`](./ENABLE_INPUT_MACRO.md) | なし | `integer` |

!!! info "API"

    ```  { #language-erbapi }
	int ENABLE_INPUT_MACRO
    ```
    入力マクロ解析を復元する（デフォルト動作）。`DISABLE_INPUT_MACRO` 呼び出し後にこの関数を呼ぶと、本来の PressEnterKey のマクロ解析、`\n` 分割、`\e` MesSkip 処理が復元される。

    - 戻り値は常に `0`

!!! warning "注意"

    `CanRestructure = false` のため、定数畳み込みの対象にならない。

### 関連項目
- [DISABLE_INPUT_MACRO](DISABLE_INPUT_MACRO.md)
- [SEQUENCEINPUT](SEQUENCEINPUT.md)
- [INPUT](INPUT.md)
