---
hide:
  - toc
---

# INPUTMOUSEKEY

| 函数名                                                                     | 参数  | 返回值 |
| :------------------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`INPUTMOUSEKEY`](./INPUTMOUSEKEY.zh.md) | `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	INPUTMOUSEKEY timeLimit
    ```
    `INPUTMOUSEKEY` 指令用于直接识别鼠标或键盘的输入。  
    参数以毫秒为单位指定执行超时处理前的等待时间，类似于 [`TINPUT`](./TINPUT.zh.md)。  
    如果省略参数或指定了 0 或负数，则不会执行超时处理。  
    此指令可以识别 [`ONEINPUT`](./ONEINPUT.zh.md) 等指令无法捕获的功能键、方向键、PageUp 键等作为输入。  
    另一方面，在此指令等待输入期间，无法使用 ESC 键或右键的跳过功能、宏功能以及其他功能，仅能接收按下 ESC 键等的结果。  
    此外，此指令不执行任何 [`PRINT`](./PRINT.zh.md) 处理，包括超时显示等。  
    如果需要实现跳过功能或显示输入内容等，需要在 ERB 侧进行相应处理。  
    通过在第一参数中指定以毫秒为单位的数值，将执行超时处理。`INPUTMOUSEKEY` 的返回值最多有 6 个，分别赋值给 `RESULT:0`、`RESULT:1`、`RESULT:2`、`RESULT:3`、`RESULT:4`、`RESULT:5`。

        RESULT:0 == 1; 检测到鼠标按下
        　RESULT:1 ;鼠标按钮 - 左0x100000、右键 0x200000、中0x400000。对应 C# 的 System.WindowForms.MouseButtons 枚举的整数值
        　RESULT:2 ;鼠标 X 坐标 以客户端的左下角为基准。始终为正值。
        　RESULT:3 ;鼠标 Y 坐标 以客户端的左下角为基准。始终为负值。
        　RESULT:4 ;当 CBGSETBMAP 已执行点击坐标正下方的颜色不透明度为 0xF时，返回颜色的 0xRRGGBB 值。否回 -1。
        　RESULT:5 ;被点击按钮的值
        RESULT:0 == 2; 检测到鼠标滚轮滚动
        　RESULT:1 ;滚轮量
        　RESULT:2 ;鼠标 X 坐标
        　RESULT:3 ;鼠标 Y 坐标
        RESULT:0 == 3; 检测到键盘按下
        　RESULT:1 ;被按下键的代码。不包饰键代码（Alt、Ctrl、Shift）。于 KeyCode。对应 C# 的 SysteWindows.Forms.Keys 枚举的整数值
        　RESULT:2 ;被按下键的代码。包含键代码。相当于 KeyData
        RESULT:0 == 4; 因超时而结束

<!-- 关于鼠标按钮，请参考 _VirtualKey.ERH 中的 MB_LEFT 到 MB_MIDDLE；关于键码，请参考 _VirtualKey.ERH 中的 VK_~。 -->
键码与 [`GETKEY`](./GETKEY.zh.md) 函数通用。  
请注意，鼠标滚轮的滚动量不是 1 或 -1，而是至少为 120 等较大的值。  
此外，当光标位于 Emuera 窗口外时，滚轮是否被检测到取决于 Windows 的设置，Emuera 端无法更改。  
在默认设置下，Windows 8.1 及更早版本会检测到，但在 Windows 10 中，窗口外的滚轮似乎不会被检测到。

!!! hint "提示"

    仅支持指令。

### 相关项目
- [INPUT](INPUT.zh.md)