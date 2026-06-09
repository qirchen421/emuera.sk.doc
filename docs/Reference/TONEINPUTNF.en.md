---
hide:
  - toc
---

# TONEINPUT(S)NF

| Function name                                                          | Arguments                                   | Return    |
| :--------------------------------------------------------------------- | :------------------------------------------ | :-------- |
| ![](../assets/images/IconEmuera.webp)[`TONEINPUTNF`](./TONEINPUTNF.en.md)  | `int`, `int`(, `int`, `string`, `int`)    | `int`     |
| ![](../assets/images/IconEmuera.webp)[`TONEINPUTSNF`](./TONEINPUTNF.en.md) | `int`, `string`(, `int`, `string`, `int`) | `string`  |

!!! info "API"

    ```  { #language-erbapi }
    TONEINPUTNF timeLimit, defaultValue(, displayTimeRemain, timeOverMessage, allowClick)
    TONEINPUTSNF timeLimit, defaultValue(, displayTimeRemain, timeOverMessage, allowClick)
    ```
    Functionally identical to [`TONEINPUT`](TONEINPUT.en.md) / [`TONEINPUTS`](TONEINPUT.en.md), but **does not force scroll to the bottom**.

    NF = NoFocus. Enters the `WaitInputNoFocus` state on execution. The only difference from `WaitInput` is that it does not reposition the text box, allowing the user to freely scroll through historical output.

    Effects:
    - ✅ Button highlighting and tooltips work normally
    - ✅ Input reliability (engine-native input pipeline)
    - ✅ User can freely scroll; scroll position is not forced back to the bottom
    - ✅ Timeout mechanism is identical to the original TONEINPUT

    Arguments and return values are identical to the original versions. See [`TONEINPUT`](TONEINPUT.en.md) / [`TONEINPUTS`](TONEINPUT.en.md).

!!! hint "Hint"

    Command only.

### Typical Use Cases

Scenarios requiring periodic display refresh without forced scrolling — such as dynamic map animations, real-time title screens, etc.

```erb
; Dynamic map animation: refresh each frame, buttons clickable, user can freely scroll
$MAP_LOOP
CALL DRAW_MAP
IF ANIM_INTERVAL > 0
    TONEINPUTSNF ANIM_INTERVAL, "UPDATE", 0, ""
ELSE
    INPUTS
ENDIF
SELECTCASE RESULTS
CASE "UPDATE"
    ; Timeout → refresh animation frame
    GOTO MAP_LOOP
CASEELSE
    ; User clicks button → normal processing
ENDSELECT
```

### See Also
- [TONEINPUT](TONEINPUT.en.md)
- [TONEINPUTS](TONEINPUT.en.md)
- [TINPUTNF](TINPUTNF.en.md)
- [AWAIT](AWAIT.en.md)
