---
hide:
  - toc
---

# CBGSETBMAPG

| Function name                                                    | Arguments | Return |
| :-------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGSETBMAPG`](./CBGSETBMAPG.en.md) | `int`     | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBGSETBMAPG gID
    ```
	Sets the `Graphics` specified by `gID` as the button map for the client area.  
	The button map set here affects the [`CBGSETBUTTONSPRITE`](./CBGSETBUTTONSPRITE.en.md) command and the [`INPUTMOUSEKEY`](./INPUTMOUSEKEY.en.md) command.  
	The button map image is not displayed, but is positioned with the screen bottom-left aligned to the image bottom-left, similar to the image set by the [`CBGSETG`](./CBGSETG.en.md) command.  
	The color of the button map image under the mouse cursor is recognized as the button value.  
	However, if the alpha value of the color is not 255 (i.e., transparent or semi-transparent), it is not recognized as a button value.

!!! hint "Hint"

    Both command and expression function supported.
