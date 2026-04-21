---
hide:
  - toc
---

# EXISTSOUND

| 函数名                                                           | 参数     | 返回值 |
| :--------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEE.webp)[`EXISTSOUND`](./EXISTSOUND.md) | `string` | `int`  |

!!! info "API"

	``` { #language-erbapi }
	EXISTSOUND MediaFile
	```

	判断音频资源目录 `./sound/` 中是否存在参数 `MediaFile` 指定的音频文件；存在返回 `1`，不存在返回 `0`。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

### 相关项目
- [PLAYSOUND](PLAYSOUND.md)
- [PLAYBGM](PLAYBGM.md)