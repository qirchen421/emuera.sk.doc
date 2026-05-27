---
hide:
  - toc
---

# TINPUT(S)NF

| 函数名                                                          | 参数                                   | 返回值   |
| :-------------------------------------------------------------- | :------------------------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`TINPUTNF`](./TINPUTNF.zh.md)  | `int`, `int`(, `int`, `string`, `int`) | `int`    |
| ![](../assets/images/IconEmuera.webp)[`TINPUTSNF`](./TINPUTNF.zh.md) | `int`, `int`(, `int`, `string`, `int`) | `string` |

!!! info "API"

    ```  { #language-erbapi }
    TINPUTNF timeLimit, defaultValue(, displayTimeRemain, timeOverMessage, allowClick)
    TINPUTSNF timeLimit, defaultValue(, displayTimeRemain, timeOverMessage, allowClick)
    ```
    与 [`TINPUT`](TINPUT.zh.md) / [`TINPUTS`](TINPUT.zh.md) 功能完全相同，但**不强制滚动到底部**。

    NF = NoFocus。执行时进入 `WaitInputNoFocus` 状态，与 `WaitInput` 的唯一区别是不调用文本框定位，因此用户可以自由滚动浏览历史输出。

    效果：
    - ✅ 按钮高亮和 Tooltip 正常工作
    - ✅ 输入可靠性（引擎原生输入管线）
    - ✅ 用户可自由滚动，滚动位置不会被强制拉回底部
    - ✅ 超时机制与原版 TINPUT 相同

    参数和返回值与原版完全一致，参见 [`TINPUT`](TINPUT.zh.md) / [`TINPUTS`](TINPUT.zh.md)。

!!! hint "提示"

    仅支持指令。

### 典型用途

需要定时刷新界面但又不希望强制滚动的场景——例如动态地图动画、实时标题画面等。

```erb
; 动态地图动画：每帧刷新，按钮可点击，用户可自由滚动
$MAP_LOOP
CALL DRAW_MAP
IF ANIM_INTERVAL > 0
    TINPUTSNF ANIM_INTERVAL, "UPDATE", 0, ""
ELSE
    INPUTS
ENDIF
SELECTCASE RESULTS
CASE "UPDATE"
    ; 超时 → 刷新动画帧
    GOTO MAP_LOOP
CASEELSE
    ; 用户点击按钮 → 正常处理
ENDSELECT
```

### 相关项目
- [TINPUT](TINPUT.zh.md)
- [TONEINPUTNF](TONEINPUTNF.zh.md)
- [AWAIT](AWAIT.zh.md)
