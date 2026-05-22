---
hide:
  - toc
---

# BEGIN

| 函数名                                                       | 参数          | 返回值 |
| :----------------------------------------------------------- | :------------ | :----- |
| ![](../assets/images/Iconeramaker.webp)[`BEGIN`](./BEGIN.zh.md) | `identifier` | 无     |

!!! info "API"

    ```  { #language-erbapi }
	BEGIN identifier
    ```
	`BEGIN` 通过调用各种系统指令来推进游戏进程。  
	调用 `BEGIN` 时，当前正在执行的函数将立即终止。即使该函数是通过 `CALL` 从其他地方调用的，也不会返回到原函数。

    `BEGIN TRAIN` 用于开始调教。  
    `BEGIN AFTERTRAIN` 用于结束调教。  
    `BEGIN ABLUP` 用于呼出能力提升界面。  
    `BEGIN TURNEND` 用于结束当前回合。  
    `BEGIN SHOP` 用于呼出 `SHOP`。

    在 Emuera 中，新增了 `FIRST` 和 `TITLE` 作为关键字。
    `BEGIN FIRST` 的效果与在标题画面选择 `[0] 从头开始` 相同，将执行事件函数 `@EVENTFIRST`。
    `BEGIN TITLE` 用于返回标题画面。
    请注意，这两条指令均不会初始化变量，请根据需要适时执行 [`RESETDATA`](./RESETDATA.zh.md) 指令。

!!! hint "提示"

    仅支持作为指令使用。

### 相关项目
* [FORCE_BEGIN](FORCE_BEGIN.zh.md)
* [FLOWINPUT](FLOWINPUT.zh.md)
* [CALLEVENT](CALLEVENT.zh.md)