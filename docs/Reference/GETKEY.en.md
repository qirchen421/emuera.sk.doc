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
	`GETKEY` returns the state of keyboard and mouse buttons.  
	If the key specified by the argument is pressed, it returns 1; if not pressed, it returns 0.  

	`GETKEYTRIGGERED` returns the state of keyboard and mouse buttons similarly to `GETKEY`.  
	While `GETKEY` gets whether a key is currently pressed, `GETKEYTRIGGERED` returns 1 only immediately after the key is pressed.  
	That is, if the key is continuously held down, `GETKEY` returns 1, but `GETKEYTRIGGERED` returns 1 only for the first time and then returns 0.  

	These functions only return 1 when Emuera's window is active; if not active, they return 0 regardless of the key state.  
	For the correspondence between key code values and actual keys, refer to Microsoft's MSDN documentation for [`GetKeyState()`](https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-getkeystate).

!!! hint "Hint"

    Both commands and expression functions are supported.

### See Also
- [AWAIT](AWAIT.md)
