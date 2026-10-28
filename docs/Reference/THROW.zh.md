---
hide:
  - toc
---

# THROW

| 函数名                                                     | 参数     | 返回值 |
| :--------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`THROW`](./THROW.zh.md) | `string` | 无     |

!!! info "API"

    ```  { #language-erbapi }
	THROW formedString
    ```
    此命令会强制引发错误，并使用给定的参数字符串进行错误显示。

!!! hint "提示"

    仅支持作为命令使用。

!!! example "示例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		THROW お気の毒ですが、冒険の書は消えてしまいました
    ``` 
    ``` title="结果"
	Now Loading...
	MAIN.ERB第2行发生THROW
	THROW お気の毒ですが、冒険の書は消えてしまいました
	THROW内容：お気の毒ですが、冒険の書は消えてしまいました
	当前函数：@SYSTEM_TITLE（MAIN.ERB第1行）
	函数调用栈：
	※※※日志文件已输出至emuera.log※※※
    ```

!!! warning "SK 版限定：与 `@BEFORE_THROW` 的联动 — 处理后**仍会抛出异常**"
    Skia 版定义了 `@BEFORE_THROW` 事件函数时，`THROW` 执行会先调用它（用于紧急存档等善后处理）。但 **`@BEFORE_THROW` 结束后异常并不会被取消** — 之后照常抛出异常、弹出错误对话框，当前指令处理被中断。`@BEFORE_THROW` 不是把异常「当作没发生」的功能。

    ```
    THROW 执行
      ├ 已在 @BEFORE_THROW 内 → 直接输出消息并结束（防递归）
      ├ 已定义 @BEFORE_THROW → 延迟抛出：先执行 @BEFORE_THROW
      │       → 结束后抛出异常（错误对话框＋处理中断）
      └ 未定义 → 直接抛出异常
    ```

    详见[系统流程 — 错误处理流程](../Emuera/system_flow.zh.md)与[事件函数 — @BEFORE_THROW](../tutorial/event-functions.zh.md#before_throw)。

!!! note "脚本侧运用要点"
    在 `SELECTCASE` 的 `CASEELSE` 里放一个「不该出现的值」检测用 `THROW`，意味着未知值每到达一次，玩家就会被错误对话框打断一次。值域校验应放在开发期的静态审计里做；运行期 `THROW` 只保留给真正无法恢复的状态。既想保留运行期检测又不想打断玩家时，可以改为调试输出（`DEBUGPRINT` 系）留痕＋把值重置交还状态机重新赋值（自愈）的设计。
