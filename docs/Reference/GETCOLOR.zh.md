---
hide:
  - toc
---

# GETCOLOR 系列

| 函数名                                                              | 参数 | 返回值 |
| :------------------------------------------------------------------ | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETCOLOR`](./GETCOLOR.md)      | 无   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETBGCOLOR`](./GETCOLOR.md)    | 无   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETDEFCOLOR`](./GETCOLOR.md)   | 无   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETDEFBGCOLOR`](./GETCOLOR.md) | 无   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETFOCUSCOLOR`](./GETCOLOR.md) | 无   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GETCOLOR
	int GETBGCOLOR
	int GETDEFCOLOR
	int GETDEFBGCOLOR
	int GETFOCUSCOLOR
    ```
	分别将颜色代码赋值给 `RESULT:0` 或返回。  
	`GETCOLOR` 返回当前使用的文字颜色，`GETDEFCOLOR` 返回[配置中指定的文字颜色](../Emuera/config.md#_28)，`GETBGCOLOR` 返回当前使用的背景颜色，  
	`GETDEFBGCOLOR` 返回[默认使用的背景颜色](../Emuera/config.md#_27)，`GETFOCUSCOLOR` 返回[按钮选中时的文字颜色](../Emuera/config.md#_29)。  
	返回值为十六进制的 `0xRRGGBB`。  
	例如，橙色 (R,G,B) = (`255, 128, 0`) 则返回 `0xFF8000`（十进制为 `16744448`）。  
	关于颜色与数字的对应关系，可以参考讲解 web color 的网站。  
	自 1.731 版本变更后，[`SETCOLOR`](./SETCOLOR.md) 命令也可以使用 `SETCOLOR 0xFF8000` 这样的形式来指定了。

!!! hint "提示"

    该函数在指令和表达式中均可使用。

### 相关项目
- [SETCOLOR](SETCOLOR.md)
- [SETBGCOLOR](SETBGCOLOR.md)
- [GETCONFIG](GETCONFIG.md)