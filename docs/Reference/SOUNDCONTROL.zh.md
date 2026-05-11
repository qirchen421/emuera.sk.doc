---
hide:
  - toc
---

# SOUNDCONTROL, BGMCONTROL, GETSOUNDORBGMINFO, ISPLAYINGSOUND, ISPLAYINGBGM

| 函数名                                                                         | 参数                          | 返回值 |
| :----------------------------------------------------------------------------- | :---------------------------- | :----- |
| ![](../assets/images/IconSK.webp)[`SOUNDCONTROL`](./SOUNDCONTROL.md)           | `int`, `int`{, `int`, `int`}  | `int`  |
| ![](../assets/images/IconSK.webp)[`BGMCONTROL`](./SOUNDCONTROL.md)             | `int`{, `int`, `int`}         | `int`  |
| ![](../assets/images/IconSK.webp)[`GETSOUNDORBGMINFO`](./SOUNDCONTROL.md)      | `int`{, `int`}                | `int`  |
| ![](../assets/images/IconSK.webp)[`ISPLAYINGSOUND`](./SOUNDCONTROL.md)         | {`int`}                       | `int`  |
| ![](../assets/images/IconSK.webp)[`ISPLAYINGBGM`](./SOUNDCONTROL.md)           | 无                            | `int`  |

!!! info "API — SOUNDCONTROL"

    ```  { #language-erbapi }
	int SOUNDCONTROL channelId, action {, speed, preservePitch}
    ```
	控制声音通道的播放。

	**参数**

	| 参数 | 类型 | 说明 |
	| :--- | :--- | :--- |
	| `channelId` | `int` | 声音通道编号（0～9） |
	| `action` | `int` | 控制动作（见下表） |
	| `speed` | `int` | `action=3` 时的播放速度（百分比，100=正常速度） |
	| `preservePitch` | `int` | `action=3` 时的音调保持（0=改变音调，1=保持音调，省略时=1） |

	**action 值**

	| 值 | 动作 | 额外参数 |
	| :--- | :--- | :--- |
	| 0 | 暂停 | 无 |
	| 1 | 恢复 | 无 |
	| 2 | 停止 | 无 |
	| 3 | 变速 | `speed`, `preservePitch` |

	**返回值**：成功时 `1`，无效通道编号时 `-1`，无效控制动作时 `-2`

!!! info "API — BGMCONTROL"

    ```  { #language-erbapi }
	int BGMCONTROL action {, speed, preservePitch}
    ```
	控制 BGM 通道的播放。是 `SOUNDCONTROL` 的 BGM 版本。

	**参数**

	| 参数 | 类型 | 说明 |
	| :--- | :--- | :--- |
	| `action` | `int` | 控制动作（与 `SOUNDCONTROL` 相同） |
	| `speed` | `int` | `action=3` 时的播放速度（百分比，100=正常速度） |
	| `preservePitch` | `int` | `action=3` 时的音调保持（0=改变音调，1=保持音调，省略时=1） |

	**返回值**：成功时 `1`，无效控制动作时 `-2`

!!! info "API — GETSOUNDORBGMINFO"

    ```  { #language-erbapi }
	int GETSOUNDORBGMINFO channelId {, infoType}
    ```
	获取声音或 BGM 通道的播放信息。`channelId` 指定为 `-1` 时表示 BGM 通道。

	**参数**

	| 参数 | 类型 | 说明 |
	| :--- | :--- | :--- |
	| `channelId` | `int` | 声音通道编号（0～9），`-1` 表示 BGM |
	| `infoType` | `int` | 获取的信息类型（省略时将所有信息存入 RESULT 数组） |

	**infoType 值**

	| 值 | 获取信息 | 单位 |
	| :--- | :--- | :--- |
	| 1 | 总时长 | 毫秒 |
	| 2 | 当前播放位置 | 毫秒 |
	| 3 | 播放状态 | 0=已暂停，1=播放中 |
	| 4 | 通道音量 | 0～100 |
	| 5 | 播放速度 | 百分比（100=正常速度） |

	省略 `infoType` 时，`RESULT:0`～`RESULT:4` 依次存储上述5项信息，函数返回值为 `RESULT:0`（总时长）。

!!! info "API — ISPLAYINGSOUND"

    ```  { #language-erbapi }
	int ISPLAYINGSOUND {channelId}
    ```
	检查声音通道是否正在播放。

	指定 `channelId` 时，如果该通道正在播放则返回通道编号，否则返回 `-1`。
	省略 `channelId` 时，从第一个通道开始搜索，返回第一个正在播放的通道编号；如果没有正在播放的通道则返回 `-1`。

!!! info "API — ISPLAYINGBGM"

    ```  { #language-erbapi }
	int ISPLAYINGBGM
    ```
	检查 BGM 是否正在播放。正在播放时返回 `1`，否则返回 `0`。

!!! hint "提示"

    所有函数均作为表达式函数使用。  
	变速功能使用 SoundTouch 库实现。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
		; 获取 BGM 播放信息
		GETSOUNDORBGMINFO -1
		PRINTFORML 总时长: {RESULT:0}ms  当前位置: {RESULT:1}ms

		; 检查 BGM 是否正在播放
		IF ISPLAYINGBGM
			PRINTFORML BGM 正在播放
			; 暂停 BGM
			BGMCONTROL 0
		ENDIF

		; 将通道0设为2倍速（保持音调）
		SOUNDCONTROL 0, 3, 200, 1

		; 获取通道0的播放速度
		GETSOUNDORBGMINFO 0, 5
		PRINTFORML 速度: {RESULT}%

		; 查找正在播放的声音通道
		LOCAL = ISPLAYINGSOUND()
		PRINTFORML 正在播放的通道: {LOCAL}
		WAIT
    ```

### 相关项目
- [PLAYSOUND](PLAYSOUND.md)
- [PLAYBGM](PLAYBGM.md)
- [STOPSOUND](STOPSOUND.md)
- [STOPBGM](STOPBGM.md)
- [SETSOUNDVOLUME](SETSOUNDVOLUME.md)
- [SETBGMVOLUME](SETBGMVOLUME.md)
