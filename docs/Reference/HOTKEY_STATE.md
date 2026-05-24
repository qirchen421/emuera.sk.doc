---
hide:
  - toc
---

# HOTKEY_STATE / HOTKEY_STATE_INIT

| 関数名 | 引数 | 戻り値 |
| :----- | :--- | :----- |
| ![](../assets/images/Iconetc.webp)[`HOTKEY_STATE`](./HOTKEY_STATE.md) | `int`(, `int`) | `int` |
| ![](../assets/images/Iconetc.webp)[`HOTKEY_STATE_INIT`](./HOTKEY_STATE.md) | `int` | `int` |

!!! info "API"

	``` { #language-erbapi }
	int HOTKEY_STATE keyCode(, state)
	int HOTKEY_STATE_INIT mode
	```

	ホットキーの状態を管理する関数です。

	- `HOTKEY_STATE`：指定したキーコードのホットキー状態を設定します。`state`を省略した場合は`1`（有効）として扱われます。常に`0`を返します。
	- `HOTKEY_STATE_INIT`：ホットキー状態を初期化します。`mode`に`0`を指定すると全てのホットキーを無効化し、`1`を指定するとERBスクリプトで定義されたホットキー設定を読み込みます。常に`0`を返します。

	!!! warning "注意"

		この関数はその他のコントリビューターによって追加された拡張機能です。標準版Emueraでは動作しません。
