---
hide:
  - toc
---

# AWAIT

| 函数名                                                     | 参数 | 返回值 |
| :--------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`AWAIT`](./AWAIT.zh.md) | `int` | 无  |

!!! info "API"

    ```  { #language-erbapi }
    AWAIT milliSecond
    ```
    暂停ERB的执行，进行Windows的处理。  
    如果指定了参数，则等待执行指定的毫秒数。  
    `AWAIT`指令会中断Emuera的无限循环警告，防止Emuera进程进入“无响应”状态。  
    请在执行耗时处理时使用。  
    但是，`AWAIT`指令本身也需要一定的执行时间，过于频繁地使用会导致速度变慢。  
    另外，为了避免让用户感到不安，建议像下面这样逐次显示工作进度。  
    ```  { #language-erbapi }
    REDRAW 0
    FOR LCNT, 0, 100
        PRINTSL "处理中・・・ " + TOSTR(LCNT) + "％ 完成"
        AWAIT 
        CLEARLINE 1
        ;耗时处理
    NEXT
    ```

!!! hint "提示"

    仅支持作为指令使用。

### 相关项目
* [WAIT](WAIT.zh.md)
* [TWAIT](TWAIT.zh.md)
* [TINPUTNF](TINPUTNF.zh.md)