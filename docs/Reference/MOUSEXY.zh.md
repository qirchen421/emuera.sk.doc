---
hide:
  - toc
---

# MOUSEX, MOUSEY

| 函数名                                                             | 参数 | 返回值 |
| :----------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`MOUSEX`](./MOUSEXY.md)      | 无   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MOUSEY`](./MOUSEXY.md)      | 无   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    MOUSEX
    MOUSEY
    ```
    获取鼠标光标当前的X坐标或Y坐标。  
    坐标是相对于客户端区域左下角位置(0,0)的相对位置，右方向为x轴正方向，下方向为y轴正方向。  
    请注意，当光标位于客户端区域内时，MOUSEY会返回负值。  
    客户端区域的大小可以通过[`CLIENTWIDTH`](./CLIENTFIELD.md)、[`CLIENTHEIGHT`](./CLIENTFIELD.md)函数获取。  
    （如果需要以客户端区域左上角为基准的Y坐标，可以通过`MOUSEY()+CLIENTHEIGHT()`获取）  
    即使Emuera窗口未处于活动状态，或者鼠标光标位于窗口外，此函数也能正常工作。

!!! hint "提示"

    同时支持指令和表达式函数两种形式。

### 相关项目
- [AWAIT](AWAIT.md)