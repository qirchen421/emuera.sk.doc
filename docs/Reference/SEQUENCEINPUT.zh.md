---
hide:
  - toc
---

# SEQUENCEINPUT ![](../assets/images/IconSK.webp)

| 函数名                                                         | 参数     | 返回值   |
| :------------------------------------------------------------- | :------- | :------- |
| ![](../assets/images/IconSK.webp)[`SEQUENCEINPUT`](./SEQUENCEINPUT.zh.md) | `string` | `integer` |

!!! info "API"

    ```  { #language-erbapi }
	int SEQUENCEINPUT inputString
    ```
    在下一次输入等待（INPUT/TINPUT/INPUTS/TINPUTS等）时，将指定字符串作为用户输入自动提交。调用 `SEQUENCEINPUT` 后，下一次进入 WaitInput 状态时，引擎调用 `PressEnterKey` 处理排队的字符串，行为与在文本框中输入并按回车一致。

    - 字符串中的 `\n` 会被拆分为多段，每段喂入一个 ERB WaitInput
    - 字符串中的 `\e` 会被识别为 MesSkip（跳过等待）。FORM 字符串解析中 `\e` 会作为 2 个字符（`\` + `e`）保留，使 SEQUENCEINPUT 路径能正确识别
    - 同时作用于 `WaitInput` 和 `WaitInputNoFocus`（NF 后缀指令）
    - 返回值始终为 `0`

!!! warning "注意"

    由于 `CanRestructure = false`，不会成为常量折叠的对象。

!!! hint "提示"

    指令和表达式函数均支持此功能。

### 相关项目
- [FLOWINPUT,FLOWINPUTS](FLOWINPUT.zh.md)
- [INPUT](INPUT.zh.md)
- [INPUTS](INPUT.zh.md)
