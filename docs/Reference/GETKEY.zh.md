---
hide:
  - toc
---

# GETKEY, GETKEYTRIGGERED

| 函数名                                                                 | 参数      | 返回值 |
| :--------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETKEY`](./GETKEY.zh.md)          | `keyCode` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETKEYTRIGGERED`](./GETKEY.zh.md) | `keyCode` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	GETKEY keyCode
	GETKEYTRIGGERED keyCode
    ```
	`GETKEY` 返回键盘及鼠标按键的状态。  
	如果参数指定的按键被按下则返回 1，否则返回 0。  

	`GETKEYTRIGGERED` 与 `GETKEY` 类似，返回键盘及鼠标按键的状态。  
	`GETKEY` 获取的是当前是否被按下，而 `GETKEYTRIGGERED` 仅在按键被按下的瞬间返回 1。  
	也就是说，持续按住按键时，`GETKEY` 会返回 1，但 `GETKEYTRIGGERD` 仅在最初返回 1，之后返回 0。

    这些函数仅在Emuera窗口处于活动状态时返回1，如果窗口非活动状态，则无论按键状态如何都返回0。  
    关于键码数值与实际按键的对应关系，请参考微软公司MSDN中[`GetKeyState()`](https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-getkeystate)的说明。

!!! hint "提示"

    该函数同时支持指令和表达式函数两种使用方式。

### 相关项目
- [AWAIT](AWAIT.zh.md)