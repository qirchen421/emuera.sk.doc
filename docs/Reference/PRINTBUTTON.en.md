---
hide:
  - toc
---

# PRINTBUTTON Related

| Function name                                                                                     | Arguments    | Return   |
| :------------------------------------------------------------------------------------------------ | :----------- | :------- |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTBUTTON(\|C\|LC)</code>](./PRINTBUTTON.md) | `string`, `any` | none     |

!!! info "API"

    ```  { #language-erbapi }
    PRINTBUTTON(|C|LC) string, buttonValue
    ```
    The `PRINTBUTTON` command creates a clickable button.
    The format is similar to the [`PRINTS`](./PRINT.md) command, but the second argument specifies the number or string to input when clicked.
    If the first argument contains a newline code, it is omitted and no newline occurs.

    Emuera automatically converts numbers enclosed in `[]` (like `[300] Save`) along with surrounding text into buttons.
    `PRINTBUTTON` is the command to forcibly create such buttons instead of relying on automatic conversion.
    This command is useful in situations like:

    ```  { #language-erbapi }
    PRINT これでいい？ [0] はい    [1] いいえ
    INPUT
    ```

    Emuera cannot correctly recognize buttons in such lines, resulting in two buttons: `これでいい？ [0] はい` and `[1] いいえ`.
    Rewriting with `PRINTBUTTON`:

    ```  { #language-erbapi }
    PRINTS "これでいい？ "
    PRINTBUTTON "[0] はい", 0
    PRINTS "     "
    PRINTBUTTON "[1] いいえ", 1
    INPUT
    ```

    (Using `PRINTS` instead of `PRINT` is to clearly show the number of half-width spaces)
    With this, `これでいい？ ` becomes non-button, and only `[0] はい` and `[1] いいえ` become buttons.
    While it's not required for the displayed string to contain `[0]` or `[1]`, not displaying the corresponding numbers may confuse users using numpad operations. It is recommended to keep the `[0]` notation as before.
    Also, `PRINTBUTTON` can create buttons that input strings instead of numbers. Such buttons can be clicked when [`INPUTS`](./INPUT.md) command is executed.

    ```  { #language-erbapi }
    PRINTL 名前を入力してください。
    PRINTBUTTON "[ほげほげ] ", "ほげほげ"
    PRINTBUTTON "[ぷげぷげ] ", "ぷげぷげ"
    PRINTBUTTON "[ふうばあ] ", "ふうばあ"
    INPUTS
    ```

    The keyword in parentheses specifies the text alignment.

    - None - No alignment
    - `C` - Aligns right like [`PRINTC`](./PRINTC.md)
    - `LC` - Aligns left like [`PRINTLC`](./PRINTC.md)

!!! hint "Hint"

    Command only.

### Related Items
- [PRINT](PRINT.md)
