# Interaction System: INPUT and AWAIT

!!! info "Corresponding Reference"

    - **Reference Category**: [Input & Wait](../Reference/README.en.md#input-wait) / [AWAIT Related](../Reference/README.en.md#await)
    - [INPUT](../Reference/INPUT.en.md) — INPUT/INPUTS command API reference
    - [TINPUT](../Reference/TINPUT.en.md) — TINPUT/TINPUTS command API reference
    - [TINPUTNF](../Reference/TINPUTNF.en.md) — TINPUTNF/TINPUTSNF command API reference (NoFocus variant)
    - [TONEINPUTNF](../Reference/TONEINPUTNF.en.md) — TONEINPUTNF/TONEINPUTSNF command API reference (NoFocus variant)
    - [AWAIT](../Reference/AWAIT.en.md) — AWAIT command API reference
    - [GETKEY](../Reference/GETKEY.en.md) — GETKEY/GETKEYTRIGGERED command API reference

---

## Overview

In [State Machine Flow](system-flow.en.md), you learned about the two-state model of "running" and "waiting". This section dives deeper into the interaction system behind these two states — how your program interacts with the player.

ERABASIC interaction commands are divided into two models:

| Model | Representative Commands | Behavior |
|-------|------------------------|----------|
| **Pull model** | INPUT, TINPUT, BINPUT | Pause script, wait for complete input |
| **Push polling model** | AWAIT + GETKEY/MOUSEB | Don't pause script, detect instantaneous state |

---

## Pull Model: INPUT Series

The INPUT series is the most common interaction method. The script pauses execution, waits for the player to make a complete input (key press, button click, text entry), then continues.

```erb
PRINTL [0] Start Game
PRINTL [1] Load Save
INPUT

IF RESULT == 0
    BEGIN FIRST
ELSEIF RESULT == 1
    LOADGAME
ENDIF
```

### Three Side Effects of INPUT

INPUT doesn't just "wait for input" — it does three things simultaneously:

1. **Wait for input**: Pause the script until the player makes a complete input
2. **Force scroll**: Scroll the window to the bottom, ensuring the input line is visible
3. **Activate buttons**: `[0]`, `[1]`, etc. become clickable

This means after each INPUT, the player **cannot** continue browsing previous output — the window is forced back to the bottom.

### TINPUT — Input with Timeout

`TINPUT` adds a timeout mechanism on top of INPUT:

```erb
; Wait for input within 3 seconds, timeout sets RESULT = 0
TINPUT 3000, 0
```

Timeout accuracy is approximately 100ms. Setting smaller values will not result in accurate operation.

### INPUTMOUSEKEY — Raw Input Detection

`INPUTMOUSEKEY` enters the waiting state but **does not activate buttons**. It directly detects raw mouse/keyboard events. Suitable for scenarios requiring precise mouse/keyboard detection without button interaction.

---

## Push Polling Model: AWAIT Series

The AWAIT series is another interaction method — the script doesn't pause, it just yields time to Windows for message processing.

```erb
; Yield 16ms
AWAIT 16
```

AWAIT combined with GETKEY, MOUSEB, MOUSEXY, ISACTIVE, etc. can detect instantaneous keyboard/mouse states:

```erb
$LOOP
AWAIT 16
IF GETKEYTRIGGERED(1)
    ; Left mouse button was pressed
    BREAK
ENDIF
GOTO LOOP
```

### AWAIT Characteristics

- **Does not pause script**: Script continues executing after AWAIT
- **Does not force scroll**: User can freely browse historical output
- **Does not activate buttons**: `[0]` etc. are not clickable
- **Unreliable input**: Key presses between two frames may be missed

### Typical AWAIT Use Cases

1. **Progress display for time-consuming processing**: Prevents Emuera from becoming "Not Responding"

    ```erb
    REDRAW 0
    FOR LCNT, 0, 100
        PRINTSL "Working... " + TOSTR(LCNT) + "%"
        AWAIT
        CLEARLINE 1
        ; Time-consuming processing
    NEXT
    ```

2. **Real-time UI polling**: Non-blocking input detection combined with GETKEY/MOUSEB

    ```erb
    $LOOP
    CALL DRAW_REALTIME_UI
    AWAIT 16
    IF GETKEYTRIGGERED(1)
        ; Handle click
    ENDIF
    GOTO LOOP
    ```

### AWAIT Pitfalls

!!! warning "AWAIT loops may miss input"

    AWAIT only pumps the message queue once. If a key event occurs between two AWAIT calls, GETKEYTRIGGERED may not detect it. This is the fundamental limitation of AWAIT polling — it samples "instantaneous state", not "accumulated events".

---

## Comparing the Two Models

| Dimension | INPUT Series | AWAIT Series |
|-----------|-------------|--------------|
| Script pause | ✅ Pauses | ❌ Continues |
| Input reliability | ✅ Atomic | ❌ May miss |
| Button interaction | ✅ Activates | ❌ Inactive |
| Free scrolling | ❌ Forced to bottom | ✅ Position maintained |
| Timeout | ✅ TINPUT | ⚠️ Manual compensation |

**Core contradiction**: You need button interaction (INPUT's advantage) + free scrolling (AWAIT's advantage), but the two models are mutually exclusive.

---

## NoFocus Variants: Bridging the Two Models

NF (NoFocus) suffix variants resolve this contradiction.

```erb
TINPUTNF  ; Same, with timeout
TINPUTSNF ; Same, string input + timeout
TONEINPUTNF  ; NF variant of TONEINPUT
TONEINPUTSNF ; NF variant of TONEINPUTS
```

NF variants have identical arguments to the original versions. The only difference is they **do not force scroll to the bottom**.

### Replacing AWAIT Polling with TINPUTSNF

Previously, code using AWAIT + GETKEYTRIGGERED for dynamic interfaces:

```erb
; Old approach: AWAIT polling (~200 lines of ERB)
$LOOP
CALL DRAW_MAP
AWAIT 16
IF GETKEYTRIGGERED(1)
    ; Handle click... but buttons aren't clickable, need to manually calculate click areas
ENDIF
GOTO LOOP
```

Replaced with TINPUTSNF:

```erb
; New approach: TINPUTSNF (~10 lines of ERB)
$LOOP
CALL DRAW_MAP
TINPUTSNF 33, "UPDATE", 0, "", 1
SELECTCASE RESULTS
CASE "UPDATE"
    ; Timeout → refresh animation frame
    GOTO LOOP
CASEELSE
    ; User clicks button → normal processing, button highlighting/tooltips work normally
ENDSELECT
```

### Hover-Pause Mode

In dynamic interfaces, pausing animation when the mouse hovers over a button preserves tooltips. Implement via `HOVER_PAUSE` flag + `MOUSEB()` detection:

```erb
; HOVER_PAUSE: pause animation on hover, resume on leave
$INPUT_LOOP
IF ANIMATERECOLOREDMAPS > 0 && !FLAG:70
    IF HOVER_PAUSE
        TINPUTSNF 200, "UPDATE", 0, ""     ; Hover mode: short timeout polling
    ELSE
        TINPUTSNF ANIMATERECOLOREDMAPS, "UPDATE", 0, ""  ; Animation mode: frame interval
    ENDIF
ELSE
    INPUTS
ENDIF

; Hover state detection
IF RESULTS == "UPDATE"
    IF MOUSEB() != ""
        ; Mouse on button → pause animation
        IF !HOVER_PAUSE
            HOVER_PAUSE = 1
        ENDIF
        GOTO INPUT_LOOP    ; Don't advance animation, keep polling
    ELSE
        ; Mouse left button → resume animation
        IF HOVER_PAUSE
            HOVER_PAUSE = 0
        ENDIF
    ENDIF
ENDIF
; ... normal input processing
```

Principle: After TINPUTSNF timeout, check `MOUSEB()` — if mouse is on a button, set `HOVER_PAUSE=1` and `GOTO INPUT_LOOP` (don't advance animation); if mouse left, reset `HOVER_PAUSE=0`. In hover mode, use 200ms short timeout polling to ensure quick animation resume when mouse leaves.

### Advantages of NF Variants

| Feature | AWAIT Polling | NF Variants |
|---------|--------------|-------------|
| Free scrolling | ✅ | ✅ |
| Button highlighting | ❌ | ✅ |
| Tooltips | ❌ | ✅ |
| Input reliability | ❌ | ✅ |
| Code volume | More | Less |

---

## Interaction Command Quick Reference

| Command | Blocking | Buttons | Free Scroll | Timeout | Return |
|---------|:---:|:---:|:---:|:---:|--------|
| `INPUT` | ✅ | ✅ | ❌ | ❌ | RESULT |
| `INPUTS` | ✅ | ✅ | ❌ | ❌ | RESULTS |
| `TINPUT` | ✅ | ✅ | ❌ | ✅ | RESULT |
| `TINPUTS` | ✅ | ✅ | ❌ | ✅ | RESULTS |
| `ONEINPUT` | ✅ | ✅ | ❌ | ❌ | RESULT |
| `BINPUT` | ✅ | ✅ | ❌ | ❌ | RESULT |
| `INPUTANY` | ✅ | ❌ | ❌ | ❌ | RESULT |
| `INPUTMOUSEKEY` | ✅ | ❌ | ❌ | ✅ | RESULT:0~5 |
| `AWAIT` | ❌ | ❌ | ✅ | ❌ | none |
| `TINPUTNF` | ✅ | ✅ | ✅ | ✅ | RESULT |
| `TINPUTSNF` | ✅ | ✅ | ✅ | ✅ | RESULTS |
| `TONEINPUTNF` | ✅ | ✅ | ✅ | ✅ | RESULT |
| `TONEINPUTSNF` | ✅ | ✅ | ✅ | ✅ | RESULTS |

---

## Next Steps

| What you want to learn | Go to |
|:---|:---|
| INPUT command API | [INPUT](../Reference/INPUT.en.md) |
| TINPUT command API | [TINPUT](../Reference/TINPUT.en.md) |
| TINPUTNF command API | [TINPUTNF](../Reference/TINPUTNF.en.md) |
| TONEINPUTNF command API | [TONEINPUTNF](../Reference/TONEINPUTNF.en.md) |
| AWAIT command API | [AWAIT](../Reference/AWAIT.en.md) |
| GETKEY command API | [GETKEY](../Reference/GETKEY.en.md) |
| State machine flow | [State Machine Flow](system-flow.en.md) |
| Event functions | [Event Functions](event-functions.en.md) |
