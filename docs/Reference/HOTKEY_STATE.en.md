---
hide:
  - toc
---

# HOTKEY_STATE / HOTKEY_STATE_INIT

| Function Name | Arguments | Return |
| :----- | :--- | :----- |
| ![](../assets/images/Iconetc.webp)[`HOTKEY_STATE`](./HOTKEY_STATE.en.md) | `int`(, `int`) | `int` |
| ![](../assets/images/Iconetc.webp)[`HOTKEY_STATE_INIT`](./HOTKEY_STATE.en.md) | `int` | `int` |

!!! info "API"

	``` { #language-erbapi }
	int HOTKEY_STATE keyCode(, state)
	int HOTKEY_STATE_INIT mode
	```

	Functions for managing hotkey states.

	- `HOTKEY_STATE`: Sets the hotkey state for the specified key code. If `state` is omitted, it defaults to `1` (enabled). Always returns `0`.
	- `HOTKEY_STATE_INIT`: Initializes hotkey states. Specifying `0` for `mode` disables all hotkeys; specifying `1` loads hotkey settings defined in ERB scripts. Always returns `0`.

	!!! warning "Note"

		This function is an extension added by other contributors and is not available in standard Emuera.
