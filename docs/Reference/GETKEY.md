---
hide:
  - toc
---

# GETKEY, GETKEYTRIGGERED

| 関数名                                                                | 引数      | 戻り値 |
| :-------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETKEY`](./GETKEY.md)          | `keyCode` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETKEYTRIGGERED`](./GETKEY.md) | `keyCode` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	GETKEY keyCode
	GETKEYTRIGGERED keyCode
    ```
	`GETKEY`はキーボード及びマウスボタンの状態を返します。  
	引数で指定されるキーが押されていれば1、押されていなければ0を返します。  

	`GETKEYTRIGGERED`は`GETKEY`と同様にキーボード及びマウスボタンの状態を返します。  
	`GETKEY`は現在押されているかどうかを取得するのに対し、`GETKEYTRIGGERED`は押された直後のみ1を返します。  
	すなわち継続して押し続けている場合は`GETKEY`は1を返しますが、`GETKEYTRIGGERD`は最初のみ1を返し以降は0を返します。  

	これらの関数はEmueraのウインドウがアクティブのときのみ1を返し、アクティブ状態でなければキー状態にかかわらず0を返します。  
	キーコードの数値と実際のキーの対応に関してはマイクロソフト社が提供するMSDNの[`GetKeyState()`](https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-getkeystate)の項を参照してください。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。

### 関連項目
- [AWAIT](AWAIT.md)
