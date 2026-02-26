---
hide:
  - toc
---

# INPUTMOUSEKEY

| Function name                                                              | Arguments | Return |
| :------------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`INPUTMOUSEKEY`](./INPUTMOUSEKEY.md) | `int`     | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	INPUTMOUSEKEY timeLimit
    ```
    The `INPUTMOUSEKEY` command is a command that directly recognizes mouse and keyboard input.  
    The argument specifies the time in milliseconds until timeout processing, similar to [`TINPUT`](./TINPUT.md).  
    If the argument is omitted or specified as 0 or less, timeout processing is not performed.  
    This command can recognize function keys, arrow keys, PageUp keys, etc., as input, which cannot be captured by commands like [`ONEINPUT`](./ONEINPUT.md).  
    On the other hand, during input waiting with this command, the ESC key, right-click skip function, macro function, and other functions cannot be used - it simply accepts the result that the ESC key, etc., was pressed.  
    Also, this command does not perform any [`PRINT`](./PRINT.md) processing, including timeout display.  
    If you want to implement skip functionality or display input, you need to handle it in ERB.  

    By specifying a value in milliseconds for the first argument, timeout processing is performed. The return value of `INPUTMOUSEKEY` can have up to 6 values, which are assigned to `RESULT:0`, `RESULT:1`, `RESULT:2`, `RESULT:3`, `RESULT:4`, and `RESULT:5` respectively.  

    - RESULT:0 == 1; Mouse press detected
      - RESULT:1 ; Mouse button - Left button 0x100000, Right button 0x200000, Middle button 0x400000. Integer value of C#'s System.Windows.Forms.MouseButtons enum
      - RESULT:2 ; Mouse X coordinate. Based on the bottom-left corner of the client area. Always a positive value.
      - RESULT:3 ; Mouse Y coordinate. Based on the bottom-left corner of the client area. Always a negative value.
      - RESULT:4 ; When CBGSETBMAP is executed and the opacity of the color directly under the click coordinates is 0xFF, returns the color as 0xRRGGBB. Returns -1 if not applicable.
      - RESULT:5 ; Value of the clicked button
    - RESULT:0 == 2; Mouse wheel rotation detected
      - RESULT:1 ; Wheel amount
      - RESULT:2 ; Mouse X coordinate
      - RESULT:3 ; Mouse Y coordinate
    - RESULT:0 == 3; Keyboard press detected
      - RESULT:1 ; Code of the pressed key. Does not include modifier codes (Alt, Ctrl, Shift). Equivalent to KeyCode. Integer value of C#'s System.Windows.Forms.Keys enum
      - RESULT:2 ; Code of the pressed key. Includes modifier codes. Equivalent to KeyData
    - RESULT:0 == 4; Ended due to timeout

    <!-- For mouse buttons, refer to MB_LEFT to MB_MIDDLE in _VirtualKey.ERH, and for key codes, refer to VK_~ in _VirtualKey.ERH. -->
    Key codes are shared with the [`GETKEY`](./GETKEY.md) function.  
    Note that the mouse wheel amount is not 1 or -1, but large values like at least 120.  
    Also, whether wheel detection works when the cursor is outside the Emuera window depends on Windows settings and cannot be changed by Emuera.  
    By default, it is detected on Windows 8.1 and earlier, but on Windows 10, wheels outside the screen seem to not be detected.  


!!! hint "Hint"

    Command only.

### See Also
- [INPUT](INPUT.md)
