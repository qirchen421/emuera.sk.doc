# Resource Files

This section explains how to prepare resource files for displaying images in Emuera.

Resource files are placed in a `resources` folder created in the same folder as the executable.  
Files can be placed in subfolders within the `resources` folder (since 1.823).

## Resource Definition File (csv)

Placing a CSV format text file in the `resources` folder will read it as a resource definition file. The format is as follows:

	;Comment line
	ResourceNameA, SourceFileName, x, y, width, height, posx, posy
	ResourceNameB, SourceFileName, x, y, width, height, posx, posy

	ResourceNameC, ANIME, width, height
	ResourceNameC, SourceFileName, x, y, width, height, posx, posy, delay
	ResourceNameC, SourceFileName, x, y, width, height, posx, posy, delay

- Comment line
	Lines starting with a semicolon are ignored as comment lines.

- Sprite

		ResourceNameA, SourceFileName, x, y, width, height, posx, posy

	You can create a sprite with the name `ResourceNameA` using the above format.  
	The resource name is the name used as the value of the `src` attribute in `<img src='ResourceNameA'>`.  
	It is also used in the form `SPRITECREATED("ResourceNameA")`.  
	Resource names must not duplicate other resource names.  
	The source file name is the name of the image file. Include the extension. Specify it as a relative path from the CSV file.  
	You cannot specify image files in folders higher than the CSV file.  
	Specify image files in the same folder as the CSV file or its subfolders.  
	`x, y, width, height` specify the portion of the source image to use, in pixels.  
	`x, y, width, height` can be omitted, in which case the entire image is used.  
	`posx, posy` specify the relative position of the image. These values can be changed dynamically by the `SPRITEPOS` and `SPRITEMOVE` commands.  
	`posx, posy` can be omitted, in which case they default to `0,0`.

- Animated Sprite

		ResourceNameC, ANIME, width, height
		ResourceNameC, SourceFileName, x, y, width, height, offsetx, offsety, delay
		ResourceNameC, SourceFileName, x, y, width, height, offsetx, offsety, delay
		......

	You can create an animated sprite with the name `ResourceNameC` using the above format.  
	To create an animated sprite, create a line with `ANIME` instead of the file name and specify the overall size of the sprite.  
	This `width, height` must be positive integers. They cannot be omitted.  
	In subsequent lines, specify the images for each frame of the animation.  
	Each frame is defined the same way as a normal sprite.  
	`delay` specifies the time that frame is displayed, in milliseconds. If omitted, it defaults to `1000ms`.  
	Note that Emuera does not normally redraw during wait times like [`INPUT`](../Reference/INPUT.md), so animated sprites may appear frozen at a specific frame.  
	Use the `SETANIMETIMER` command to instruct redrawing during INPUT.  
	See the command documentation for details on the `SETANIMETIMER` command.

## Image Files

Image files are required to display images.  
Prepare image files in `bmp`, `jpg`, or `png` format and place them in the `resources` folder.  
EM+EE includes a library that also supports `webp` format.  
You can also generate graphics within ERB using `GCREATEFROMFILE`.

## Notes

All image files specified in CSV files are loaded into memory when Emuera starts and occupy memory until it ends.  
It is better for both memory and speed to combine images into a single file and use them by specifying ranges, rather than loading many image files.  
Also, using `GCREATEFROMFILE` and `GDISPOSE`, and `SPRITECREATE` and `SPRITEDISPOSE` as needed is effective.  
If the drawing interface in config is set to `WINAPI`, processing is done by `GDI` and alpha blending is not performed.  
If the drawing interface is `Graphics` or `TextRenderer`, processing is done by `GDI+` and alpha blending is performed.  
Scaling also differs slightly between `WINAPI (GDI)` and `Graphics` or `TextRenderer (GDI+)`.
