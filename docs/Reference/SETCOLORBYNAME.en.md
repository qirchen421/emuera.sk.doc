---
hide:
  - toc
---

# SETCOLORBYNAME, SETBGCOLORBYNAME

| Function name                                                                         | Arguments      | Return |
| :------------------------------------------------------------------------------------ | :------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SETCOLORBYNAME`](./SETCOLORBYNAME.md)         | `colorName`    | none   |
| ![](../assets/images/IconEmuera.webp)[`SETBGCOLORBYNAME`](./SETCOLORBYNAME.md)       | `colorName`    | none   |

!!! info "API"

    ```  { #language-erbapi }
	SETCOLORBYNAME colorName
	SETBGCOLORBYNAME colorName
    ```
	Command to specify the font display color or background color from predefined color names.  
	All other specifications are the same as [`SETCOLOR`](./SETCOLOR.md)/[`SETBGCOLOR`](./SETBGCOLOR.md). The argument is a color name. For predefined color names, refer to the [KnownColor enumeration](https://learn.microsoft.com/en-us/dotnet/api/system.drawing.knowncolor).

!!! hint "Hint"

    Command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		SETCOLORBYNAME yellow
		PRINTL yellow
		SETCOLORBYNAME green
		PRINTL green
		SETCOLORBYNAME blue
		PRINTW blue
    ``` 
	![](../assets/images/SETCOLORBYNAME.png)

### Related
- [SETCOLOR](SETCOLOR.md)
