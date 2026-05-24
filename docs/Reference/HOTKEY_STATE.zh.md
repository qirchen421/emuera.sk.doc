---
hide:
  - toc
---

# HOTKEY_STATE / HOTKEY_STATE_INIT

| 函数名 | 参数 | 返回值 |
| :----- | :--- | :----- |
| ![](../assets/images/IconSK.webp)[`HOTKEY_STATE`](./HOTKEY_STATE.zh.md) | `int`(, `int`) | `int` |
| ![](../assets/images/IconSK.webp)[`HOTKEY_STATE_INIT`](./HOTKEY_STATE.zh.md) | `int` | `int` |

!!! info "API"

	``` { #language-erbapi }
	int HOTKEY_STATE keyCode(, state)
	int HOTKEY_STATE_INIT mode
	```

	管理快捷键状态的函数。

	- `HOTKEY_STATE`：设置指定键码的快捷键状态。省略 `state` 时默认为 `1`（启用）。始终返回 `0`。
	- `HOTKEY_STATE_INIT`：初始化快捷键状态。`mode` 指定为 `0` 时禁用所有快捷键，指定为 `1` 时读取 ERB 脚本中定义的快捷键设置。始终返回 `0`。

	!!! warning "注意"

		此函数为其他贡献者追加的扩展功能，标准版 Emuera 中不可用。
