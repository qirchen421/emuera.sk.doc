---
hide:
  - toc
---

# SOUNDCONTROL, BGMCONTROL, GETSOUNDORBGMINFO, ISPLAYINGSOUND, ISPLAYINGBGM

| Function name                                                                    | Arguments                     | Return |
| :------------------------------------------------------------------------------- | :---------------------------- | :----- |
| ![](../assets/images/IconSK.webp)[`SOUNDCONTROL`](./SOUNDCONTROL.en.md)             | `int`, `int`{, `int`, `int`}  | `int`  |
| ![](../assets/images/IconSK.webp)[`BGMCONTROL`](./SOUNDCONTROL.en.md)               | `int`{, `int`, `int`}         | `int`  |
| ![](../assets/images/IconSK.webp)[`GETSOUNDORBGMINFO`](./SOUNDCONTROL.en.md)        | `int`{, `int`}                | `int`  |
| ![](../assets/images/IconSK.webp)[`ISPLAYINGSOUND`](./SOUNDCONTROL.en.md)           | {`int`}                       | `int`  |
| ![](../assets/images/IconSK.webp)[`ISPLAYINGBGM`](./SOUNDCONTROL.en.md)             | none                          | `int`  |

!!! info "API — SOUNDCONTROL"

    ```  { #language-erbapi }
	int SOUNDCONTROL channelId, action {, speed, preservePitch}
    ```
	Controls playback of a sound channel.

	**Parameters**

	| Parameter | Type | Description |
	| :--- | :--- | :--- |
	| `channelId` | `int` | Sound channel number (0–9) |
	| `action` | `int` | Control action (see table below) |
	| `speed` | `int` | Playback speed in percent (100=normal) when `action=3` |
	| `preservePitch` | `int` | Pitch preservation when `action=3` (0=change pitch, 1=preserve pitch, default=1) |

	**action values**

	| Value | Action | Extra Parameters |
	| :--- | :--- | :--- |
	| 0 | Pause | none |
	| 1 | Resume | none |
	| 2 | Stop | none |
	| 3 | Change speed | `speed`, `preservePitch` |

	**Return value**: `1` on success, `-1` for invalid channel number, `-2` for invalid action

!!! info "API — BGMCONTROL"

    ```  { #language-erbapi }
	int BGMCONTROL action {, speed, preservePitch}
    ```
	Controls playback of the BGM channel. BGM version of `SOUNDCONTROL`.

	**Parameters**

	| Parameter | Type | Description |
	| :--- | :--- | :--- |
	| `action` | `int` | Control action (same as `SOUNDCONTROL`) |
	| `speed` | `int` | Playback speed in percent (100=normal) when `action=3` |
	| `preservePitch` | `int` | Pitch preservation when `action=3` (0=change pitch, 1=preserve pitch, default=1) |

	**Return value**: `1` on success, `-2` for invalid action

!!! info "API — GETSOUNDORBGMINFO"

    ```  { #language-erbapi }
	int GETSOUNDORBGMINFO channelId {, infoType}
    ```
	Gets playback information for a sound or BGM channel. Specify `-1` for `channelId` to target the BGM channel.

	**Parameters**

	| Parameter | Type | Description |
	| :--- | :--- | :--- |
	| `channelId` | `int` | Sound channel number (0–9), or `-1` for BGM |
	| `infoType` | `int` | Type of information to retrieve (omit to store all info in RESULT array) |

	**infoType values**

	| Value | Information | Unit |
	| :--- | :--- | :--- |
	| 1 | Total duration | milliseconds |
	| 2 | Current position | milliseconds |
	| 3 | Playback state | 0=paused, 1=playing |
	| 4 | Channel volume | 0–100 |
	| 5 | Playback speed | percent (100=normal) |

	When `infoType` is omitted, all five values are stored in `RESULT:0` through `RESULT:4` in order, and the function returns `RESULT:0` (total duration).

!!! info "API — ISPLAYINGSOUND"

    ```  { #language-erbapi }
	int ISPLAYINGSOUND {channelId}
    ```
	Checks whether a sound channel is playing.

	When `channelId` is specified, returns the channel number if it is playing, or `-1` otherwise.
	When `channelId` is omitted, searches from the first channel and returns the first playing channel number, or `-1` if no channel is playing.

!!! info "API — ISPLAYINGBGM"

    ```  { #language-erbapi }
	int ISPLAYINGBGM
    ```
	Checks whether BGM is playing. Returns `1` if playing, `0` otherwise.

!!! hint "Hint"

    All functions are used as expression functions.  
	The speed change feature uses the SoundTouch library.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
		; Get BGM playback info
		GETSOUNDORBGMINFO -1
		PRINTFORML Total: {RESULT:0}ms  Position: {RESULT:1}ms

		; Check if BGM is playing
		IF ISPLAYINGBGM
			PRINTFORML BGM is playing
			; Pause BGM
			BGMCONTROL 0
		ENDIF

		; Set channel 0 to 2x speed (preserve pitch)
		SOUNDCONTROL 0, 3, 200, 1

		; Get channel 0 playback speed
		GETSOUNDORBGMINFO 0, 5
		PRINTFORML Speed: {RESULT}%

		; Find playing sound channel
		LOCAL = ISPLAYINGSOUND()
		PRINTFORML Playing channel: {LOCAL}
		WAIT
    ```

### Related
- [PLAYSOUND](PLAYSOUND.en.md)
- [PLAYBGM](PLAYBGM.en.md)
- [STOPSOUND](STOPSOUND.en.md)
- [STOPBGM](STOPBGM.en.md)
- [SETSOUNDVOLUME](SETSOUNDVOLUME.en.md)
- [SETBGMVOLUME](SETBGMVOLUME.en.md)
