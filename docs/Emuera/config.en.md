# Configuration Settings (emuera.config)

Emuera creates an `emuera.config` file in the same folder as the exe on first launch.  
After starting Emuera, you can change settings by selecting Settings from the Help menu.  
You can also change settings by editing `emuera.config` with a text editor.  
In that case, settings will be reflected from the next Emuera startup.  
However, be careful about mistakes in items when editing with a text editor.

 (Right) Do not wrap lines in the middle of buttons:YES
 (Wrong) Do not wrap lines in the middle of buttons:ON
 (Wrong) Do not wrap line in the middle of buttons:YES

To restore default settings, delete `emuera.config` and start Emuera.  
Only the `emuera.config` file in the same folder as the Emuera exe has an effect.  
If there are `_fixed.config` or `_default.config` files in the csv folder, some items may not be changeable or have different default values.  
See Forcing Config Settings for details.

This page also explains config items added in EM+EE.

## Environment

### Use Mouse
Whether to accept mouse input.

### Use Menu
Whether to display the menu.  
If set to not display, you cannot change settings from the menu, so you need to modify `emuera.config` to restore it.

### Use Debug Commands
Whether to accept debug commands in the main console. Default is `NO`.  
Debug commands can be executed in the debug console regardless of this option.

### Allow Multiple Instances
Whether to allow multiple instances of Emuera.

### Use Keyboard Macros
Whether to use keyboard macros with `F1-F12` keys.  
Note that if code using `ONEINPUT` or `ONEINPUTS` commands is used, keyboard macros may not work properly, but this is by design.

### Perform Autosave
Whether to perform an autosave together with the `BEGIN SHOP` command. This feature can be effectively disabled by the ERB script side, so even if set, saves may not actually occur.

### Create Save Data in sav Folder
Sets whether to place save data directly under the exe or create a sav folder and place it inside. Default is `NO`.  
When set to `YES` and the sav folder does not exist, a dialog appears asking whether to automatically move sav files.  
If you answer `Yes` to the dialog, all existing `global.sav` and `save*.sav` files are moved to the sav folder.  
When switching settings from `YES` to `NO`, manually move the sav files.

### Save CONFIG File Content in English
An EM+EE feature. Default is `NO`. Only the file content changes; it does not affect operation.

### History Log Line Count
The maximum number of lines to save in the history log. The minimum is `500` lines.

### Milliseconds Until Infinite Loop Warning
Displays a warning dialog if no [`WAIT`](../Reference/WAIT.en.md)-type commands are executed for the specified time.  
If `0` is specified, this feature is disabled.  
The following script is an infinite loop, but since WAIT is inserted between them, it is not subject to warning.

	$LOOP
	WAIT
	GOTO LOOP

Even when skipping messages with right-click or escape key, if `WAIT` is inserted, no warning is issued.

### Number of Save Data to Display
The number of save data displayed on the save/load screen. The minimum is `20` (same as eramaker), the maximum is `80`.

### Associated Text Editor
When clicking an error message, you can open the corresponding file in the text editor set here.

### Command Line Arguments
Specifies command line arguments to pass when passing a file to the text editor.

## Display

### Drawing Interface
The interface used for drawing.

- `WINAPI` - Draws with the TextOut function in `gdi32.dll`. (GDI drawing)
	- A drawing method added in 1.700 that can draw faster than other methods. (In some environments it is said to be slower than others)
- `GRAPHICS` (default) - Draws with the Graphics.DrawString function. (GDI+ drawing)
	- Same as the old `Use GDI+:YES` option.
	- As a characteristic of GDI+, string widths may shift even with non-proportional fonts.
- `TEXTRENDERER` - Draws with the TextRenderer.DrawText function. (GDI drawing)
	- Same as the old `Use GDI+:NO` option.

### (Use Image Buffer)
This option was deprecated in 1.818.  
Image buffers became unnecessary due to drawing processing changes.

### (Use GDI+ for Drawing)
This option was deprecated in 1.700.  
Please set with the `Drawing Interface` option.

### Frames Per Second
The maximum number of draws per second. Smaller values make operation faster.  
If `Maximum Skip Frame Count` is small, making frames per second smaller may not make it faster.

### (Maximum Skip Frame Count)
This option was deprecated.

### Number of PRINTC to Arrange
How often the system performs the [`PRINTC`](../Reference/PRINTC.en.md) command, such as with `PRINT_SHOPITEM`, before line breaking. In original eramaker, this is `3`.  
If `0` is specified, no line breaking is performed based on the number of `PRINTC`s.  
If specifying `0`, also set `Do not wrap lines in the middle of buttons` to `YES`.  
This enables automatic wrapping when exceeding the window size.

### PRINTC Character Count
How many total characters `PRINTC` should have by adding half-width spaces to the left.  
In original eramaker, this is `25`.  
For displaying shop items, this character count +1 is used.  
In eramaker, shop sale items are formatted to 26 characters.  
The approximate number of characters that can be arranged per line is `(window width) / (font size) * 2`, so please make `(PRINTC character count + 1) * (number of PRINTC to arrange)` smaller than that.

### Do Not Wrap Lines in the Middle of Buttons
A button is a string that can be selected or clicked with the mouse, such as `[200] - Save`.  
The default is `NO`, which displays the same as eramaker.  
Setting this option to `YES` moves the entire button that exceeds the window to the next line.

### Emuera Display Language
An EM+EE feature. Selects the language for UI, error messages, etc. Default is `empty string (Japanese)`, and English and Chinese language files are included.  
Uses XML files in the `lang` folder in the same directory as Emuera.


## Window

### Window Width
Specifies the width of the window at startup.  
This is the drawing area size, not the overall size.

### Window Height
Specifies the height of the window at startup.  
This is the drawing area size, but includes the height of the input area at the bottom.

### Make Window Height Variable
Whether the window size can be changed during execution.

### Maximize Window on Startup
Default is `NO`.  
If `YES`, Emuera starts with the window maximized.

### Fix Window Position on Startup
Whether to specify the window position during execution.  
If not specified, `Window Position X, Y` have no meaning.

### Window Position X
The fixed position when fixing the window position.  
X determines the horizontal position. The upper left of the display is `0,0`, and X increases going right.

### Window Position Y
The fixed position when fixing the window position.  
Y determines the vertical position. The upper left of the display is `0,0`, and Y increases going down.

### Scroll Line Count
Specifies how many lines to move with one mouse wheel scroll.

## Font

### Background Color
The background color.

### Text Color
The text color. If a [`SETCOLOR`](../Reference/SETCOLOR.en.md) command is performed in the script, that takes precedence.

### Selected Text Color
The text color of the button currently selected by mouse.

### History Text Color
The text color during backlog display. If a [`SETCOLOR`](../Reference/SETCOLOR.en.md) command is performed in the script, that takes precedence.

### Font Name
Specifies the font. Raster fonts cannot be specified.  
Proportional fonts can also be specified, but are not recommended as display will be distorted.  
With EM+EE's feature, you can now also select from `ttf` and `otf` files in the `font` folder in the same directory as Emuera.

### Font Size
Specifies the character size (height) in pixels.

### Line Height
Specifies the height of one line in pixels. Cannot be smaller than the font size.  
Setting it the same as the font size may cause display distortion.  
Font size + 1-2 is recommended.  
`Font size = 18`, `Line height = 19` is recommended.

## System

Options intended to be decided by ERB authors. If you change System items, the ERB script may not work as the author intended.

### Ignore Case Differences
Whether to ignore case differences in commands and variables in ERB. Default is `YES` (ignore).

### Use _Rename.csv
Whether to use `EraMakerEx`'s `_Rename.csv`. Default is `NO` (do not use).  
For `_Rename.csv` specifications, refer to `EraMakerEx`'s `Readme.txt` (not included with Emuera).

### Use _Replace.csv
Whether to use the `_Replace.csv` functionality added in private modification version 1.52a-c.

### Search Subdirectories
Whether to read files in subfolders within the CSV and ERB folders. Default is `NO`.  
If `YES`, files in subfolders are also subject to reading for `chara*.csv` and `*.ERB`.  
CSV files other than `chara*.csv` are not subject to this option.  
The reading order is files and folders in the folder first, then other files.  
If the `Sort Read Order by File Name` option is enabled, folders are also sorted by name.

### Sort Read Order by File Name
Whether to sort file reading order by file name. Default is `NO`.  
For issues related to file system and reading order, refer to the relevant section in Differences with eramaker.  
If `NO`, the reading order remains as returned by C#'s `Directory.GetFiles` function.  
The `GetFiles` function internally uses the `FindNextFile` function in `Kernel32.dll`, and results depend on the file system.  
`Directory.GetFiles` function results probably reproduce eramaker's reading order, but this can be a cause of script behavior differing depending on the user's environment.  
If `YES`, sorts the file list by file name before reading.  
Note that the sort result does not match NTFS file order.  
For example, `_ (underscore)` comes before numbers and letters in NTFS, but comes after numbers in file name sort.

### Allow System Function Override
Whether to allow overriding functions that can be used in expressions with user-defined functions.  
Default is `YES` (allow).

### Display Warning When System Function is Overridden
Whether to display a warning that a function that can be used in expressions has been overridden by a user-defined function.  
Default is `YES` (display).  
If the `Allow System Function Override` option is `YES`, the warning is displayed regardless of this item's setting.

### Warn When Multiple Non-Event Functions with Same Name are Defined
In eramaker's system, even if there are multiple functions with the same name, only the first one read is valid and subsequent ones are ignored.  
While this specification can be useful, it can also be a cause of script behavior differing depending on the user's environment.  
Setting this option to `YES` (warn) causes a warning when there are multiple functions with the same name.

### Include Full-Width Space in Whitespace
Default is `YES` (include), and setting to `NO` (do not include) prevents full-width spaces from being used as whitespace.  
In other words, you can prohibit using full-width spaces for indentation, etc., instead of half-width spaces or tabs in ERB.

### Internal East Asian Language to Use
You can select the locale to use for processing that depends on internal locale, such as `STRLENS`.  
However, there is no change to the UI. Default is `Japanese (ja-JP)`.  
The following languages are supported:
- `Japanese (Shift-JIS, default)`
- `Korean (ko-KR)`
- `Simplified Chinese (zh-CN) (untested)`
- `Traditional Chinese (zh-TW) (untested)`

### Do Not Expand Triple Symbols in FORM
In eramaker's FORM syntax, when symbols like `///` or `+++` appear three times in a row, they are expanded to strings like `NAME:ASSI` or `CALLNAME:ASSI`.  
Setting this item to `YES` (do not expand) rejects this specification and treats them as symbols.  
Default is `NO` (expand).

### Save Save Data in Binary Format
Whether to write save data in binary format. Default is `NO` (do not save).  
If `NO` (do not save), the character encoding of save data is the same syntax as eramaker.  
Saving in binary format may or may not result in smaller file size, so be careful when changing settings.  
Using `#DIM SAVEDATA` to define saveable character-type variables or multi-dimensional string variables requires this option to be YES.

### Save Save Data in UTF-8
Whether to write save data with `UTF-8` character encoding. Default is `NO` (do not save).  
If `NO` (do not save), the character encoding of save data is `SJIS`, same as eramaker.  
If `Save Save Data in Binary Format` is `YES`, this option is invalid (`UTF-8` is used forcibly).

### Compress Save Data
An EM+EE feature. Compresses and saves save data size. Available when `Save Save Data in Binary Format` is `YES`.

### Allow 2+ Character Input via Mouse in ONEINPUT Commands
An item that does not appear in the config screen and can only be set by directly editing `emuera.config`.  
Default is `NO` (do not allow).  
If `YES`, in `ONEINPUT` series commands, when a value of 2 or more characters is input at once via mouse input, it is not cut to just the first character.

### Read UTF-8 (without BOM) Encoded Files
An EM+EE feature. If `YES`, supports files in UTF-8 (without BOM).

### Do Not Store Character Variable Arguments
Default is `NO`. When using character variables like `CFLAG`, if written as `CFLAG:0`, it is automatically complemented and executed as `CFLAG:TARGET:0`, but if this option is `YES`, it is not complemented and must be written each time.

### Disable UPDATECHECK
An EM+EE feature. If `YES`, when executing [`UPDATECHECK`](../Reference/UPDATECHECK.en.md), processing is not performed and `4` is assigned to `RESULT`.

### Use ERD Feature
An EM+EE feature. Setting to `NO` disables the [ERD feature](../EMEE/EMEE_Summary.md#erhcsverd).

### Align VARSIZE Dimension Specification with ERD Feature
An EM+EE feature. In the ERD feature, dimensions are `1`, `2`, `3` from the left, but in `VARSIZE` they are `0`, `1`, `2` from the left.  
Setting this option to `YES` makes `VARSIZE` use `1`, `2`, `3` from the left like ERD.

## Compatibility

Options for solving problems such as different behavior between eramaker and Emuera, or scripts that worked in past versions of Emuera no longer working.  
Do not change these if the default settings are fine.

### Run Even If There Are Uninterpretable Lines
Default is `NO`, and if there are lines that fail to interpret at startup, it ends with an error at the title screen.  
This option stops that behavior and allows proceeding from the title even if there are uninterpretable lines.

### Substitute NAME When CALLNAME is Empty String
Default is `NO`.  
If `YES`, when `CALLNAME` is not set or set to an empty string in `chara*.csv`, it treats it as if the same string as `NAME` is set.  
This is an option to reproduce the behavior where eramaker returned `NAME` when `CALLNAME` was an empty string.  
However, this option cannot completely reproduce it.  
For example, behavior may differ when reading save data with added characters in eramaker with Emuera.

### Match Pseudo-Variable RAND Specification to eramaker
Default is `NO`.  
If `YES`, the `RAND` generation method becomes the same as eramaker.  
This method has characteristics such as working with negative argument values, never returning values of `32767` or more, and having non-negligible bias in values around `X` exceeding `1000`.  
See Differences with eramaker for details.

### Do Not Ignore Case for Functions and Attributes
Default is `NO`.  
eramaker does not distinguish between upper and lower case for commands and variables, but distinguishes upper and lower case for function names and attributes.  
Setting this item to `YES` and `Ignore Case Differences:YES` enables the same behavior as eramaker.

### Allow CALL of Event Functions
Default is `NO`.  
If `YES`, event functions can be called with the [`CALL`](../Reference/CALL.en.md) command, resulting in the same specification as eramaker.

### Reproduce Pre-1739 Non-Button Line Wrapping
Default is `NO`.  
If `YES`, reproduces `DRAWLINE` and other specifications from Emuera 1.739 and earlier. This allows scripts using display dependent on Emuera's pre-1739 non-button line wrapping specification to work correctly.  
If display breaks when updating Emuera version, setting this config to `YES` may solve it.

### (Always Perform DRAWLINE on New Line)
This option was deprecated in 1.806.  
Currently migrated to the `Reproduce Pre-1739 Non-Button Line Wrapping` option.

### Allow Omitting All Arguments of User Functions
Default is `NO`.  
If `YES`, even if variables other than ARG, ARGS, or user-defined private variables are set as function arguments, arguments can be ignored when calling.  
This reproduces the specification from Emuera 1.807 and earlier where omitting arguments with these variables would not perform assignment and maintain the state before calling the function.  
If errors occur in functions when updating from Emuera 1.807 or earlier, setting this config to `YES` may solve it.

### Automatically Supplement TOSTR for User Function Arguments
Default is `NO`.  
If `YES`, when passing a number to a string-type argument when calling a function as in Emuera 1.807 and earlier, it automatically converts to string type.  
If errors occur in functions when updating from Emuera 1.807 or earlier, setting this config to `YES` may solve it.  
There was a bug between Emuera 1.820 (Emuera1819+v10) where this option's effect was inverted.

### Use SP Characters
Default is `NO`.  
An option to restore SP character-related functionality deleted in 1.816.  
If errors occur when updating from Emuera 1.816 or earlier, setting this config to `YES` may solve it.

## Analysis

### Display eramaker Compatibility Warnings
Displays warnings related to eramaker compatibility.

### Display Report on Load
Whether to display a report such as total line count and number of functions during loading.  
If not displayed, the loading message specified in `_replace.csv` is displayed.

### Check for ERD Identifier and Local Variable Duplication
An EM+EE feature. When referencing variables defined with the [ERD feature](../EMEE/EMEE_Summary.md#erhcsverd), if an identifier duplicates with a local variable, an unexpected array may be referenced.  
Setting this to `YES` causes a warning at startup for identifier and local variable duplication.

### Parse Arguments on Load
Whether to parse command arguments during loading.  
Parsing during loading makes loading considerably slower and execution slightly faster.  
If not for error checking purposes, it's more comfortable to set `NO`.
- `Always No (NO)` - Do not parse.
- `Do If Updated (ONCE)` - Parse only if CSV or ERB has been updated since the last launch.
- `Always Yes (YES)` - Parse.

### Minimum Warning Level to Display
The level of warnings to display during loading. Warnings below the specified value are not displayed.
- `0` - Warnings that don't cause particular problems, like using `==` instead of `=`.
- `1` - Problems that can be ignored and executed, like using `#PRI` outside function declarations.
- `2` - Lines that error at runtime, like uninterpretable lines or unsupported `IF~ENDIF`.
- `3` - Unrecoverable errors that occur during loading. Displayed forcibly.

### (Parse FORM Strings on Load)
This option was deprecated in 1.800.

### Ignore Uncalled Functions
Only effective when parsing arguments on load.  
If `YES`, argument parsing is not performed for uncalled functions.

### Handling of Function Not Found Warning
Only effective when parsing arguments on load.  
Whether to warn when the destination function of [`CALL`](../Reference/CALL.en.md) or [`JUMP`](../Reference/JUMP.en.md) commands does not exist.
- `Ignore (IGNORE)` - Do not warn.
- `Display Only Count (LATER)` - Do not warn, but report only the ignored count later.
- `Display Once Per File (ONCE)` - Warn only once per file.
- `Display (DISPLAY)` - Display all.

Note that `CALLFORM` and `JUMPFORM` are not subject to this.

### Handling of Function Not Called Warning
Only effective when parsing arguments on load.  
Whether to warn when `@~~` is defined but never called.  
The format is the same as `Handling of Function Not Found Warning`.

### (Ignore Warnings in Specified Files)
This feature was removed.

## Debug

Debug-related options are only effective when starting Emuera in debug mode.  
See the [Debug Mode](debug.en.md) article for details on debug mode.

### Display Debug Window on Startup
Automatically displays the debug window when starting in debug mode.

### Display Debug Window on Top
Sets the debug window to be always on top by default when opened.  
After opening, it can be toggled with buttons inside the debug window.

### Debug Window Width
Specifies the debug window width.  
This is the overall size including the window frame.

### Debug Window Height
Specifies the debug window height.  
This is the overall size including the window frame.  
Unlike the main window, the debug window can be freely resized after opening.  
To use the `Get Current Window Size` button in the settings dialog, you need to open the settings dialog with the debug window open.

### Specify Debug Window Position
Whether to specify the position of the debug window when opened.  
If not specified, `Debug Window Position X, Y` have no meaning.

### Debug Window Position X
The fixed position when fixing the debug window position.  
X determines the horizontal position. The upper left of the display is `(0, 0)`, and X increases going right.

### Debug Window Position Y
The fixed position when fixing the debug window position.  
Y determines the vertical position. The upper left of the display is `(0, 0)`, and Y increases going down.  
To use the `Get Current Window Position` button in the settings dialog, you need to open the settings dialog with the debug window open.

## Clipboard
All are features added in EM+EE, ported from the English version of Emuera-Anchor.

### Copy Displayed Text to Clipboard
Setting to `YES` enables the clipboard feature.

### Ignore <> Tags in Text
Option to ignore HTML tags.

### Replace <> with Following String
Replaces HTML tags with any string.

### Copy Only New Lines
Copies only newly `PRINT`ed lines.

### Clear Clipboard and Buffer on Screen Refresh
Clears the clipboard and copy buffer when restarting or returning to title.

### Use Left Click as Trigger
Copies when a left click occurs.

### Use Wheel Click as Trigger
Copies when a mouse click occurs.

### Use Double Click as Trigger
Copies when a double click occurs.

### Use WAIT as Trigger
Copies when [`WAIT`](../Reference/WAIT.en.md) occurs.

### Use INPUT as Trigger
Copies when [`INPUT`](../Reference/INPUT.en.md) occurs.

### Number of Lines to Paste to Clipboard
Specifies the number of lines to paste to the clipboard when the feature is triggered.

### Total Buffer Size
Specifies the maximum buffer size for storing text to paste to the clipboard.

### Scroll Line Count
Specifies the copy range to the clipboard to go back with one scroll operation.

### Clipboard Update Interval (milliseconds)
Specifies the clipboard update interval.

## Rikai
All are features added in EM+EE, config related to Japanese→English popup translation feature.  
To enable the feature, you need to specify an appropriate translation language file in `RIKAICHAN File Path` (included with EmueraEM+EE).

### Use RIKAICHAN
Setting to `YES` enables the popup dictionary.

### RIKAICHAN File Path
Specifies the language file for using the popup dictionary as a relative path from Emuera.

### Popup Background Color
Changes the popup box background color.

### Popup Text Color
Changes the popup box text color.

### Highlight Word Being Translated
Highlights the word being translated with a block.
