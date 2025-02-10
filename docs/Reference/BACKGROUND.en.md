---
hide:
  - toc
---

# BACKGROUND Operation

Added by Neo_Kesha

| 関数名                                                               | 引数                     | 戻り値 |
| :------------------------------------------------------------------- | :----------------------- | :----- |
| ![](../assets/images/Iconetc.webp)[`SETBGIMAGE`](./BACKGROUND.md)    | `string`(, `int`, `int`) | None   |
| ![](../assets/images/Iconetc.webp)[`REMOVEBGIMAGE`](./BACKGROUND.md) | `string`                 | None   |
| ![](../assets/images/Iconetc.webp)[`CLEARBGIMAGE`](./BACKGROUND.md)  | None                     | None   |

!!! info "API"
    ```  { #language-erbapi }
	SETBGIMAGE resourceName(, depth, opacity)
	REMOVEBGIMAGE resourceName
	CLEARBGIMAGE
    ```

	SETBGIMAGE sets image of ResourceName to background. Depth and Opacity are optional parameters  
	ResourceName - name of resuourse defined in CSV at Resource folder  
	Depth - depth of the image. Used to sort layers. Default to 0. Image of Depth equal to -1 will be infront of image with Depth equal to 0  
	Opacity - value from 0 to 255.  

	REMOVEBGIMAGE removes single image from background using ResourceName as a key  
	CLEARBGIMAGE clears all backgrounds images  

	Set of commands to add backgrounds to Emuera Console window. WINAPI is not supported.  
	Backgrounds must be defined in resources CSV file. Backgrounds support Transparency and Layers.  
	Backgrounds will be resized dynamically to fit in Console windows with aspect ratio preservation  

!!! hint "Hint"

	Only works as a command. Can not be used in expressions.