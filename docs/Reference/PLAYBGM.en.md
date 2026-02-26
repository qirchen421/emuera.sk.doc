---
hide:
  - toc
---

# PLAYBGM

| Function name                                             | Arguments | Return |
| :-------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`PLAYBGM`](./PLAYBGM.md) | `string` | `void` |

!!! info "API"

	``` { #language-erbapi }
	PLAYBGM MediaFile
	```

	Plays a sound file from the `sound` folder in a loop

!!! hint "Hint"

    Available as command only  
    Supports simultaneous playback of up to 10 sound files  
    Uses WMPLib, supports formats playable by WMP

### Related
- [PLAYSOUND](PLAYSOUND.md)
- [STOPBGM](STOPBGM.md)
- [SETBGMVOLUME](SETBGMVOLUME.md)
