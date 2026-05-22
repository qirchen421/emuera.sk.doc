---
hide:
  - toc
---

# PRINTBUTTON 系列

| 函数名                                                                                     | 参数            | 返回值 |
| :----------------------------------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTBUTTON(\|C\|LC)</code>](./PRINTBUTTON.zh.md) | `string`, `any` | 无     |

!!! info "API"

    ```  { #language-erbapi }
    PRINTBUTTON(|C|LC) string, buttonValue
    ```
    `PRINTBUTTON` 指令用于生成可通过鼠标点击的按钮。
    其格式与 [`PRINTS`](./PRINT.zh.md) 指令相似，但需要指定第二个参数，即点击按钮时输入的数字或字符串。如果第一个参数中包含换行符，该换行符将被忽略且不会导致换行。

    Emuera 会自动将类似 `[300] 保存` 这样用 `[]` 括起来的数字及其前后的字符串转换为按钮。
    `PRINTBUTTON` 指令的作用就是强制生成此类按钮，而非依赖自动转换。
    该指令在以下情况下特别有用：

    ```  { #language-erbapi }
    PRINT 这样可以吗？ [0] 是    [1] 否
    INPUT
    ```

    对于这样的行，Emuera 无法正确识别按钮，会将其识别为 `これでいい？ [0] はい` 和 `[1] いいえ` 两个按钮。
    使用 `PRINTBUTTON` 重写后如下所示：

    ```  { #language-erbapi }
    PRINTS "これでいい？ "
    PRINTBUTTON "[0] はい", 0
    PRINTS "     "
    PRINTBUTTON "[1] いいえ", 1
    INPUT
    ```

    （这里使用`PRINTS`命令代替`PRINT`是为了明确显示半角空格的数量）
    这样处理后，`これでいい？ `将不再是按钮，只有`[0] はい`和`[1] いいえ`会成为按钮。
    需要注意的是，`PRINTBUTTON`命令中显示的字符串并非必须包含`[0]`或`[1]`等数字，但如果完全不显示对应的数字，可能会让使用数字键盘等设备进行操作的玩家感到困惑。因此建议仍按惯例显示`[0]`等数字。
    此外，`PRINTBUTTON`命令不仅可以创建输入数字的按钮，还可以创建输入字符串的按钮。这样创建的按钮可以在执行[`INPUTS`](./INPUT.zh.md)命令时被点击。

    ```  { #language-erbapi }
    PRINTL 请输入姓名。
    PRINTBUTTON "[HogeHoge] ", "HogeHoge"
    PRINTBUTTON "[PugePuge] ", "PugePuge"
    PRINTBUTTON "[FooBar] ", "FooBar"
    INPUTS
    ```

    括号内的关键字用于指定文本对齐方式。

    - 无 - 不对齐
    - `C` - 与 [`PRINTC`](./PRINTC.zh.md) 类似，向右对齐
    - `LC` - 与 [`PRINTLC`](./PRINTC.zh.md) 类似，向左对齐

!!! hint "提示"

    仅支持命令。

### 相关项目
- [PRINT](PRINT.zh.md)