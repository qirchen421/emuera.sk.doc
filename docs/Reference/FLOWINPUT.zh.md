---
hide:
  - toc
---

# FLOWINPUT,FLOWINPUTS

| 函数名                                                               | 参数                         | 返回值 |
| :------------------------------------------------------------------- | :--------------------------- | :----- |
| ![](../assets/images/IconEE.webp)[`FLOWINPUT`](./FLOWINPUT.md)       | `int`(, `int`, `int`, `int`) | `void` |
| ![](../assets/images/IconEE.webp)[`FLOWINPUTS`](./FLOWINPUT.md)      | `int`(, `string`)            | `void` |

!!! info "API"

	``` { #language-erbapi }
	FLOWINPUT default(, AllowLeftClick, AllowSkip, ForceSkip)
	FLOWINPUTS toggle(, default)
	```

	为流程中的 INPUT（例如在 `@SHOW_SHOP` 内）添加默认值、是否允许左键点击以及是否允许跳过等选项。
	以下是各选项的引用说明：

	```
	`INPUT`, `INPUTS`, `ONEINPUT`, `ONEINPUTS` 新增第二参数（整数类型，可省略，默认值为 `0`）

    `TINPUT`, `TINPUTS`, `TONEINPUT`, `TONEINPUTS` 新增第五参数（整数类型，可省略，默认值为 `0`）

    - 追加引数`==0`时，或省略时 与原版行为相同。
    - 追加引数`!=0`时 将鼠标点击视为回车键（向`RESULTS`代入空字符串。若按下按钮，则将按钮索引代入`RESULTS:1`），左键点击时`RESULT:1`设为`1`，右键点击时`RESULT:1`设为`2`。同时，若按下++shift++、++ctrl++、++alt++键，则将其按键状态保存到`RESULT:2`中。（bit 16 17 18）
    ```
    ```
    `INPUT`、`INPUTS`、`ONEINPUT`、`ONEINPUTS` 新增第三参数（整数型，可省略，默认值为`0`）
    
    `TINPUT`、`TINPUTS`、`TONEINPUT`、`TONEINPUTS` 新增第六参数（整数型，可省略，默认值为`0`）

    - 当追加参数 `==0` 或省略时，行为与原版相同
    - 当追加参数 `!=0` 时，在右键等导致的跳过过程中不进行输入等待
    但默认值会被应用。与上述 `INPUT系命令接受鼠标点击` 功能并用时，默认值会分别代入 `RESULT:1` 及 `RESULTS:1`；
    未并用时，默认值会照常代入 `RESULT:0` 及 `RESULTS:0`
    在 EEv46 中增加了第四参数。若设置为非0，则会向 `RESULT` 填入默认值并强制跳过
    ```

    FLOWINPUTS在第一参数非0时启用。启用后，系统流程上的所有 `INPUT` 都将被视为 `INPUTS` 处理
    在商店画面等根据输入值改变处理的场景，建议使用 `FLOWINPUT` 来设置默认值。其他行为控制也通过 `FLOWINPUT` 进行

!!! hint "提示"

	指令和表达式函数均支持此功能。

### 相关项目
- [BEGIN](BEGIN.md)