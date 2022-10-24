---
hide:
  - toc
---

# PLAYSOUND

| 函数名                                                         | 参数     | 返回值 |
| :------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEE.webp)[`PLAYSOUND`](./PLAYSOUND.md) | `string` | `void` |

!!! info "API"

	``` { #language-erbapi }
	PLAYSOUND MediaFile
	```

	播放一次指定的音频文件（位于 `./sound/` 目录下）。

!!! hint "提示"

    只能作为命令使用。  
    最多可以同时播放 10 个音频文件。  
    因为使用了 WMPLib 支持库，所以允许使用 Windows Media Player 进行播放。
