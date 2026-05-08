# config.en
---
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
Displays a warning dialog if no [`WAIT`](../Reference/WAIT.md)-type commands are executed for the specified time.  
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
How often the system performs the [`PRINTC`](../Reference/PRINTC.md) command, such as with `PRINT_SHOPITEM`, before line breaking. In original eramaker, this is `3`.  
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
The text color. If a [`SETCOLOR`](../Reference/SETCOLOR.md) command is performed in the script, that takes precedence.

### Selected Text Color
The text color of the button currently selected by mouse.

### History Text Color
The text color during backlog display. If a [`SETCOLOR`](../Reference/SETCOLOR.md) command is performed in the script, that takes precedence.

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
An EM+EE feature. If `YES`, when executing [`UPDATECHECK`](../Reference/UPDATECHECK.md), processing is not performed and `4` is assigned to `RESULT`.

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
If `YES`, event functions can be called with the [`CALL`](../Reference/CALL.md) command, resulting in the same specification as eramaker.

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
Whether to warn when the destination function of [`CALL`](../Reference/CALL.md) or [`JUMP`](../Reference/JUMP.md) commands does not exist.
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
See the [Debug Mode](debug.md) article for details on debug mode.

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
Copies when [`WAIT`](../Reference/WAIT.md) occurs.

### Use INPUT as Trigger
Copies when [`INPUT`](../Reference/INPUT.md) occurs.

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


---

# config_files.en
---
# Forcing Config Settings

Emuera reads files named `_fixed.config` and/or `_default.config` if they exist in the csv folder.  
The format of each `.config` file is the same as `emuera.config`. See [Config Items](config.md) for the meaning of each item.

The priority of each file depends on the order in which Emuera reads config files.  
Emuera reads config files in the following order:

	csv\_default.config
	emuera.config
	csv\_fixed.config

Settings are overwritten by later files. That is, settings in `_default.config` are overwritten by `emuera.config`, and settings in `emuera.config` are overwritten by `_fixed.config`.  
Note that these files will only be read if they exist at the above paths with the exact filenames.  
In other words, if you create a subfolder in the csv folder and place `_fixed.config` or `_default.config` there, or name the file `default.config` without the underscore, it will not be read.

## `_fixed.config`
Options set in `_fixed.config` take priority over `emuera.config`.
Also, items specified in `_fixed.config` cannot be changed via Emuera's settings dialog.
Use `_fixed.config` only when specific options are required for the intended behavior.  
For scripts that depend on Emuera's line break position, the `Do not wrap lines in the middle of buttons` option must be set to `YES`.  
Also, if `_Replace.csv` or `_Rename.csv` needs to be used, options related to these are required.  
If `SETCOLOR` is used, the background color and text color may need to be fixed.  
However, setting options that are not particularly required in `_fixed.config` will prevent user customization.  
Keep the items set in `_fixed.config` to a minimum.

## `_default.config`
If you have options you want to recommend but not enforce, use `_default.config` instead of fixed.  
`_default.config` is used as the initial setting when `emuera.config` does not exist.  
If `emuera.config` exists, the options set in `emuera.config` take priority, so user settings will not be overwritten.


---

# debug.en
---
# Debug Mode

Debug mode is a mode added in ver 1.750.  
This feature is independent of the `Use debug commands` option.

## Starting Emuera in Debug Mode

To start Emuera in debug mode, pass `-Debug` as a command line argument.

An easy way to pass command line arguments is to right-click `EmueraXXXX.exe` and select `Create shortcut`, then right-click the created shortcut and select `Properties`, then add ` -Debug` to the end of the string in `Target`.  
(If the target is enclosed in `""` like `"C:\~~\EmueraXXX.exe"`, add ` -Debug` after the `"`)  
Double-clicking the shortcut will start it in debug mode.

## Behavior in Debug Mode

When started in debug mode, a folder named `debug` is automatically created.  
The variable watch list and debug console log described below are saved in the `debug` folder.

In debug mode, lines starting with `;#;` and lines between `[IF_DEBUG]` and `[ENDIF]` are executed in addition to normally executed lines.  
When not in debug mode, these lines are treated as comments and not executed.  
Conversely, in debug mode, lines between `[IF_NDEBUG]` and `[ENDIF]` are treated as comments and not executed.

	;#;PRINTL This line is executed only in debug mode.
	[IF_DEBUG]
		PRINTL This line is executed only in debug mode.
	[ENDIF]
	[IF_NDEBUG]
		PRINTL This line is executed only when not in debug mode.
	[ENDIF]

Also, there are commands that only function in debug mode.  
The `DEBUGPRINT`, `DEBUGPRINTFORM`, `DEBUGPRINTL`, and `DEBUGPRINTFORML` commands function similarly to [`PRINT`](../Reference/PRINT.md) statements, but output to the debug window.  
The `ASSERT` command throws an error when its argument is 0. When the argument is non-zero, it does nothing.  
The `DEBUGCLEAR` command clears all text in the debug window. It takes no arguments.  
These commands do nothing in non-debug mode.  
Arguments are not parsed either, so even if there are problems with the format in `DEBUGPRINTFORM`, nothing happens in non-debug mode.  
These are treated as no-op commands, not as comment lines, so they are safe to use immediately after an [`SIF`](../Reference/IF.md) statement.

Also, the variables `__FILE__`, `__LINE__`, and `__FUNCTION__` return meaningful values only in debug mode.  
In non-debug mode, they return 0 or an empty string.

## Debug Window

In debug mode, you can open the debug window.  
Open it from the Debug menu, or type `@DEBUG` in the console.  
You can also open the debug window with the shortcut key `Ctrl+D` in the main console.  
Depending on config options, the debug window may open automatically at startup.

The debug window is resizable. Adjust the size to suit your needs.  
The initial size and position of the debug window can be changed from the `Debug` section of the settings dialog.  
You can get the current size and position by opening the settings dialog with the debug window open.

The information displayed in the debug window can be switched using tabs within the window.  
Information is updated when the debug window gains focus or when tabs are switched.  
You can also update information with the shortcut key `Ctrl+R` from the main console, or clear all text with the `DEBUGCLEAR` command.

### Console
This is the debug console.  
It is the output destination for `DEBUGPRINT`, `DEBUGPRINTFORM`, etc.  
Errors and warnings from information output to the main console are also output to the debug console.  
You can enter debug commands from the text box at the bottom of the console.  
Unlike debug commands in the main console, you do not need to prefix with `@`.  
This feature works even when the `Use debug commands` option is NO.  
Also, `MASTER`'s name will not become `CHEATER`.

### Variable Watch
Click around the area below the column labeled `Target`. You should enter edit mode.  
Enter variable names whose values you want to know, such as `TALENT:MASTER:2` or `NAME:TARGET`, and the value will be displayed in the `Value` column.  
If an error occurs while getting the value, the error content will be displayed.  
To delete a target, edit it to an empty string.  
The row will be deleted when the variable watch is updated.  
Targets added to the variable watch are saved when the debug window is closed and loaded when opened.  
If you want to save/load at other times, use Save/Load from the File menu.

You can use constants and expressions as `Target`, not just variables, but be careful when calling expression functions.  
Variable watch actually calls that expression function each time it updates the value.  
If the called expression function has side effects such as changing other variables, side effects will occur each time the variable watch is updated.

### Stack Trace
Information about currently called functions.  
The top is the current function, followed by the function that called the current function, and the function that called that function, and so on.


---

# debugCom.en
---
# Debug Commands  
※Debug commands are not available by default.  
Check "Allow debug commands" from the Environment Settings menu if you want to use them.  

**※This function is a simple function of the version without debug mode.**  
**We recommend that you start in debug mode for debugging with the current version.**  

During script execution (in game), if you enter a string beginning with "@", it will be accepted as a debug command.  
Case sensitivity depends on the "Ignore capitalization" config in emuera.config.  

Debug commands are in the same format as ERB.  
For example, you can write like this:  

	@MONEY = 10000  
	@PRINTV FLAG:200  
	@PRINTFORM %NAME:MASTER% CFLAG(1) = {CFLAG:MASTER:1}  
	@ADDCHARA 1  

Also, if you simply enter a variable or a formula, those values will be output  
（The following space after @ is not required）  

	@ FLAG:200  
	@ @"%NAME:MASTER% CFLAG(1) = {CFLAG:MASTER:1}"  

However, you can not use instructions that change the execution flow such as IF and CALL, and instructions that require input such as INPUT and WAIT.  

There are some instructions not in ERB.  

- @REBOOT  
Restart and reread emuera.config, csv, and erb files.  

- @OUTPUT  
Outputs the current log to emuera.log. If it already exists, it will be overwritten.  
This is the same operation as the OUTPUTLOG instruction.  

- @EXIT  
Quit Emuera. Same operation as QUIT instruction.  

- @CONFIG  
Opens the Settings dialog.  

- @DEBUG  
Opens the debug dialog. This is valid only when started in debug mode.  

Other than the above, if a normal ERB instruction is executed, MASTER's NAME and CALLNAME are changed to "CHEATER".  
This is a measure to prevent abuse, as debug commands are cheats.  


---

# differences_of_Emuera_and_eramaker.en
---
# Differences with eramaker  
## Differences from eramaker  
### Fixed bugs and unnatural behavior  
The last element of the array is unavailable  
In eramaker, if the last element of the array is not zero, the data will be corrupted on load  
Emuera does not have this problem.  
This problem is caused by the fact that the save and load specifications are not unified in eramaker, but Emuera is.  
Therefore, saving with eramaker and loading with Emuera does not cause this problem, but saving with Emuera and loading with eramaker reproduces this problem.  

### Anomaly of the unary operator "-"  
There are problems with eramaker, such as -100 < 0 being false.  
Emuera does not have this problem.  

### The last line of the file is unreadable  
eramaker ignores lines without a newline.  
This means that the last line of the file, whether it is CSV or ERB, will be ignored.  
Emuera does not reproduce this behavior.  

### If there are extra elements in the array, they're ignored  

	A:1:2 = 34  

In eramaker, the above expression assigns 34 to A:1.  
Emuera makes this an error.  

### Can't use a specific format for array calls  
In eramaker, you can use variables such as A:0 and A:(COUNT+1).  
However, writing double array variables such as ABL:0:2 or TALENT:(COUNT+1):2 will result in an error.  
Also, if the argument is omitted when calling a string variable, an error may occur.  
Emuera does not have this problem.  
No error occurs whether the argument of the double array is a constant or a formula, and the argument of a string variable can be omitted.  

### Treating abnormal numbers in the CSV as integers  

	0,Rotor,200  
	0xFF,Router,200  

If the above is found in Item.csv, eramaker interprets 0xFF as 0 and ITEM:0 is defined as a Router.  
Emuera doesn't reproduce this, but invalidates this definition with an error, and ITEM:0 is defined as a Rotor.  

### Awkward notation works  

	A:0:1:99999 +-RESULTS:0=@=+123|*?=Y  

The above expression works in eramaker.  
Emuera makes this an error.  

## Other points that are different from eramaker  
### If the line immediately after the SIF is a blank line, comment line, etc.  

	SIF conditional  
		;comment  
		PRINT hogehoge  

eramaker always executes a PRINT line.  
This is because eramaker recognizes that the next line in the SIF is ";comment".  

Emuera only executes PRINT lines if the conditional statement is true, just like Kiri Kiri (吉里吉里) and others.  
Emuera treats blank lines and comment lines as non-existent, and recognizes the next line in the SIF as "PRINT hogehoge".  
Also, eramaker can put an IF or REPEAT statement on the next line after the SIF, but this often behaves differently from the author's intentions, so Emuera limits the lines that can be brought after the SIF.  

### Behavior when arguments such as IF and ELSEIF are omitted.  
In eramaker, if you omit IF, ELSEIF or the argument of the assignment statement, the behavior becomes indeterminate.  
However, if the RETURN argument is omitted, it acts like RETURN 0.  
Emuera always interprets the omitted argument as 0, so anything inside a blank IF is always not executed, but is subject to a warning.  

### Characters that can be used in function names  
In eramaker, all characters, including symbols and double-byte characters, can be used.  
Emuera also allows full-width characters, but not symbols other than _ (underscores).  
Also, Emuera does not recommend starting the function name with a half-size number.  
The following script will work with eramaker, but will give an error with Emuera.  

		CALL \.,)(][+-%* 　@&$  

	@\.,)(][+-%* 　@&$  
		PRINTL Function @\.,)(][+-%* 　@&$ was called.  
		RETURN 0  

In Emuera, if the function name contains ( or ), it is misunderstood as a function argument.  
Also, the LOCAL@ function name does not work properly when the function name includes @ or the symbol of the operator.  
Including {} or % will interfere with the CALLFORM call.  
For this reason, Emuera, like many programming languages such as C# and Kirikiri (吉里吉里), prohibits the use of symbols in function names.  
As of ver 1.721, this is a warning level 1 and not a warning that immediately terminates the error, but it may behave unintentionally at some point.  

Also, if the function name starts with a half-width number, it cannot be called as a function that can be used in an expression. This is to determine whether it is a number or a variable or function by looking at a single letter in the expression.  

### RAND Specifications  

	A = RAND:X  

In eramaker, it returns 0 when X is 0.  
Otherwise, it returns (a random number from 0 to 32767) % (the absolute value of X).  
This method works even when X is negative, never returns a value greater than 32767, and the bias of the value is negligible when X is greater than 1000.  

Emuera does not reproduce this.  
Emuera returns (a random number from 0 to 18446744073709551615) % (X).  
When X is a value of 0 or negative, Emuera gives an error.  
(This is the result of focusing on the consistency of the return values, based on the official description that "the return value is an integer from 0 to A-1 in the case of RAND:A")  
Also, X is valid from 1 to 9223372036854775807 (positive 64-bit signed integer range).  
If X is less than about 100 trillion, there is not enough bias to be felt.  

### WAIT Specifications  
In eramaker, the line break is printed when the Enter key is pressed, rather than when the WAIT instruction is executed.  
In Emuera, if the cursor is in the middle of a line when executing a WAIT instruction, a new line will be started, and if the cursor "pressed the Enter key" or "left clicked", it will not be accompanied by a new line.  

### JUMP Specifications  
In eramaker, JUMP can't be done from a function called by CALL.  
In Emuera, even a called function can be JUMPed.  
RETURN in JUMP destination is the same as RETURN in JUMP source function.  

		CALL FOOBAR  

		@FOO
		PRINTL Function @FOO
		JUMP BAR
		@BAR
		PRINTL Function @BAR
		RETURN 0
		@FOOBAR
		PRINTL Function @FOOBAR
		CALL FOO
		PRINTW Back to the @FOOBAR function
	;Result of the execution  
	;eramaker(error)  
	CALLで呼ばれた先からJUMPで関数を呼び出そうとしました  
	(Tried to call a function with JUMP from a destination called with CALL)  

	;Emuera  
	Function @FOOBAR  
	Function @FOO  
	Function @BAR  
	Back to the @FOOBAR function  

### CALLNAME Specifications  
In eramaker, when referring to CALLNAME, if CALLNAME is an empty string, it returns the value of NAME instead.  
Emuera returns an empty string if CALLNAME is an empty string.  

To bridge this difference, Emuera provides an option to use NAME if CALLNAME is an empty string.  
When this option is YES, if CALLNAME is not set in chara*.csv or is set to an empty string, it is treated as being set to the same string as NAME.  
However, even this option is not completely reproducible.  
For example, if you add a character in eramaker and read the save data in Emuera, the behavior may be different.  

### Unrolling PRINTFORM and other FORMs  
eramaker repeats over and over until there is nothing left to unroll.  
If there is a self-reference or circular reference, it will freeze.  
Emuera only unrolls once.  
An eramaker unrolling would probably look like this  

	str = String to unroll  
	while(str with {～～} in it)  
		Unroll the leftmost {～～}  
	while(str with %～～% in it)  
		Unroll the leftmost %～～%  
	while(str with *** in it)  
		Unroll the leftmost ***  
	while(str with $$$ in it)  
		Unroll the leftmost $$$  
	while(str with +++ in it)  
		Unroll the leftmost +++  
	while(str with /// in it)  
		Unroll the leftmost ///  
	while(str with === in it)  
		Unroll the leftmost ===  

Because of this behavior, eramaker also allows you to do the following  

	STR:1 = S1%STR:2%3%4%  
	STR:2 = S2%STR:  
	STR:3 = S3%STR:  
	STR:4 = S4  
	PRINTFORMSL STR:1  
	PRINTFORML %STR:1%  
	DRAWLINE  
	;・Result  
	;S1S2S3S4  
	;S1S2S3S4  

Emuera does not replicate this.  

### Attributes of the EVENT Functions  
In eramaker, the event function call is done as follows.  

	foreach(Function with #PRI)  
	{  
		Function Call  
		if(#SINGLE and the return value is 1)  
			break;  
	}  
	foreach(Function with no #PRI and no #LATER)  
	{  
		Function Call  
		if(#SINGLE and the return value is 1)  
			break;  
	}  
	foreach(Function with #LATER)  
	{  
		Function Call  
		if(#SINGLE and the return value is 1)  
			break;  
	}  

Event functions with both #PRI and #LATER will be called twice.  
- SINGLE interrupts subsequent function calls only when the return value is 1.  
In addition, the function call is interrupted by #SINGLE for each pair with #PRI or #LATER.  
Emuera since ver1.800 (1.756alpha018 if you include the development version) reproduces this behavior exactly.  

Prior to that, Emuera used the following event function calls.  

Sort the list of functions according to #PRI and #LATER  

	foreach(All functions)  
	{  
		Function Call  
		if(#SINGLE and the return value is 1)  
			break;  
	}  

If both #PRI and #LATER are added, it is treated as if neither of them were added.  
If the function call is interrupted by #SINGLE, the event function call is terminated regardless of the presence or absence of #PRI or #LATER.  

Note that up to Emuera 1.751b, #SINGLE interrupts subsequent function calls when the return value is not 0.  
This was fixed in 1.752, and as with eramaker, the current version only aborts further function calls when the return value is 1.  

### How to read the gamebase.csv "コード" (code)  
If the code in gamebase.csv contains a number of values beyond the range of -2147483648 to 2147483647, which is the number that eramaker can handle, eramaker rewrites the values in the csv to hexadecimal and uses the last 8 digits as the game code.  
For example, in the case of "コード,08231000181818110", the game code will be 301712126, which is in the range that eramaker can handle.  

Emuera does not reproduce this behavior.  
In Emuera version 1.803 or earlier, the game code is set to 0 when the code is "08231000181818110".  
Emuera can handle numbers in the range of -9223372036854775808 to 9223372036854775807, but  
just like eramaker, GAMEBASE_GAMECODE only handles the number in the range from -2147483648 to 2147483647, and if the range is exceeded, it becomes 0.  

In addition, in ver. 1.804 or later Emuera, the game code is 8231000181818110 as written in the case of "コード,08231000181818110".  
(GAMEBASE_GAMECODE has been changed to a variable that handles the same range as the other variables.)  
Also, the game code is set to 0 if the game code is beyond the range that Emuera can handle, such as "コード,98231000181818110110".  
In ver. 1.805 or later, Emuera can read saved data with a game code of 0 regardless of the game's game code.  

### How to read abl.csv, etc  
In eramaker, you can specify negative or very large values for the index, such as "99999,Technique".  
However, since the number specified here is used by PRINT_ABL, etc., ABL:99999 is referenced in PRINT_ABL (internally by eramaker) and an error occurs.  
Thus, the practical value is the same as the number of arrays in ABL and TALENT.  
An error occurs in item.csv when referring to ITEM and ITEMSALES in SHOP as well.  
In Emuera, you cannot specify values outside the range of an array such as ABL.  
Such lines will be ignored.  
Instead, you can change the range of the array by using VariableSize.csv.

### How to read train.csv  
It's basically the same as any other csv file, but the circumstances are a little different from the others.  
In eramaker, for example, even if you define "XXX,99999", if @COM99999 is defined, it will be executed correctly.  
On the other hand, if you define a negative value, such as "YYY,-2", the command will be displayed, but nothing will happen when you select it.  

Emuera does not reproduce this behavior.  
The range that can be defined is up to the size of the TRAINNAME specified in VariableSize.csv, otherwise it is ignored.  
If the size of TRAINNAME is not changed, the valid range is from 0 to 999.  

### How to read chara*.csv  
With eramaker, even if the "number" is less than 0 or more than 1000, ADDCHARA can be done normally.  
This works the same way with Emuera.  

In eramaker, if a third value is required, such as "基礎,0" (BASE), it is treated as 0 if omitted.  
Also, if the third value is not needed, such as "素質,0,100" (TALENT), it will be ignored and set to 1.  
Emuera does not reproduce this behavior.  
MAXBASE:0 becomes 1 if it is set with "基礎,0" and TALENT:0 becomes 100 if it is set to "素質,0,100".  

### File Newline Code  
In eramaker, when the line feed code is ![CR]![LF] and ![LF], it is a line feed, but when it is only ![CR], it is not a line feed and various malfunctions occur.  
Emuera does not reproduce this behavior and considers ![CR] a line break even if it is alone.  

## Unfixed bugs and Unnatural behavior  
### File reading order depends on the file system  
In eramaker basic, there is a case that the behavior depends on the order of reading files, for example, when CALLing a multiplexed function.  
However, eramaker may not work as expected because the order in which files are read depends on the file system.  
Emuera also reproduces this problem.  
Many of the currently released scripts assume that the file system is NTFS and will not work properly if the file system is FAT.  

### Count is added at the end of REPEAT-REND  
In eramaker, when exiting REPEAT-REND, the count is increased by 1.  
You will also get +1 if you exit with a BREAK.  
Emuera replicates this behavior.  
In the FOR-NEXT syntax, the loop variable is incremented by 1 as well.  
Note that the behavior is different from the for syntax and break statements in common programming languages.  

### NEXTCOM behavior  
In eramaker, the initial value of NEXTCOM is -1, but after NEXTCOM is executed, the value assigned is 0 instead of -1.  
Therefore, unless the ERB side is assigned again, COM0 will continue to be repeated.  
The official description of eramaker does not mention the existence of NEXTCOM.  
Emuera replicates this behavior.  
The functionality of NEXTCOM is reproduced for eramaker compatibility only and is not recommended for use.  
If you don't plan to run your code in eramaker, consider using the DOTRAIN or CALLTRAIN instructions.  

## Changed Features  
### SP Characters  
In eramaker, a character whose CFLAG:0 is set to non-zero in csv becomes an SP character.  
The specification was a bit confusing because it cannot be registered by ADDCHARA, but must be registered by ADDDSPCHARA.  
It was also the cause of a bug, such as unintentionally setting CFLAG:0 to non-zero and not being able to register with ADDCHARA.  
Emuera has decided not to support this feature by default, starting with ver 1.816.  
CFLAG:0 is no longer singled out and all characters can now be registered from ADDCHARA.  
It is possible to reproduce eramaker's behavior with the compatibility option "SPキャラを使用する" (Use SP character), but it is not recommended to use it for any purpose other than to run old scripts.  

## Added Features  
See Extended grammar added in Emuera  


---

# ERH.en
---
# Header Files

In addition to files with the ERB extension, you can place files with the ERH extension in the ERB folder.  
ERH files contain content that should be processed before ERB files.  
Specifically, this includes global variable definitions using `#DIM` and `#DIMS`, and macro definitions using `#DEFINE`.  
You must not write lines other than `#DIM`, `#DIMS`, and `#DEFINE` in headers.

Emuera reads all `*.ERH` files placed in the ERB folder.  
The processing order is `files in csv folder` → `*.ERH` → `*.ERB`, so ERH effects do not apply to content in the CSV folder.  
Conversely, replacement by `_rename.csv` is also applied to `*.ERH`.  
eramakerEX does not apply `_rename.csv` to `*.ERH`, so using ERH files will lose compatibility with `eramakerEX`.

## Declaring Global Variables

See also: [User-Defined Variables](./user_defined_variables.md)

You can declare new variables in header files.  
These become global variables that can be referenced from all places in ERB, unlike private variables declared within ERB.  
Unlike private variables, there is no `DYNAMIC`/`STATIC` distinction, and you cannot declare reference type variables using `REF`, but you can similarly declare constants using `CONST`.  
You can declare up to 3-dimensional variables.  
If you do not specify the number of elements, it becomes an array with 1 element, so you can use it like a non-array variable.  
Variable declarations are made using `#DIM` or `#DIMS` as follows.  
Note that `#DIM HOGE,1,2` creates a 2-dimensional array.

	<*.ERH>
		#DIM MY_INT
		#DIM MY_INT_ARRAY, 100
		#DIMS MY_STR
		#DIMS MY_STR_ARRAY, 100

By defining the above in an ERH file, you can use them in ERB files as follows:

	<*.ERB>
		MY_INT = 100
		MY_INT_ARRAY:10 = MY_INT_ARRAY:10 + 45
		MY_STR = aaa
		PRINTFORML {MY_INT_ARRAY:10} %MY_STR%

The number of elements in a variable declaration using `#DIM` can be specified with a number or a constant expression.  
However, note that unlike `#DIM` in `*.ERB` files, macros are not expanded.

### `SAVEDATA` Keyword

By adding the `SAVEDATA` keyword when declaring a variable, you can declare a saveable variable.  
However, when declaring a multi-dimensional saveable variable using the `SAVEDATA` keyword, the option `Save data in binary format` must be enabled.

	<*.ERH>
		#DIM SAVEDATA MY_INT_ARRAY, 100
		#DIMS SAVEDATA MY_STR_ARRAY, 100

By declaring this way, the contents of `MY_INT_ARRAY` and `MY_STR_ARRAY` are saved and loaded like existing variables such as `DAY` and `MONEY`.  
Conversely, variables declared without the `SAVEDATA` keyword are not saved and are initialized when loaded.

### `CHARADATA` Keyword

By adding the `CHARADATA` keyword when declaring a variable, you can declare a character variable.  
`CHARADATA` can be used together with the `SAVEDATA` keyword.

	<*.ERH>
		#DIM CHARADATA C_INT_ARRAY, 100
		#DIMS CHARADATA C_STR_ARRAY, 100
		#DIM CHARADATA SAVEDATA CS_INT_ARRAY, 100

In the above example, `C_INT_ARRAY` and `C_STR_ARRAY` are character variables but are not saved/loaded.  
`CS_INT_ARRAY` is a character variable and is both saved and loaded.

### `GLOBAL` Keyword

By adding the `GLOBAL` keyword when declaring a variable, you can declare a global variable.  
`GLOBAL` can be used together with the `SAVEDATA` keyword.

	<*.ERH>
		#DIM GLOBAL G_INT_ARRAY, 100
		#DIMS GLOBAL G_STR_ARRAY, 100
		#DIM GLOBAL SAVEDATA GS_INT_ARRAY, 100

Global variables are neither loaded nor initialized during normal save/load.  
Because of this property, they can be used to share data between different save files.  
When using both `GLOBAL` and `SAVEDATA` keywords, the variable becomes one that is read from and written to the `global.sav` file by the `SAVEGLOBAL` and `LOADGLOBAL` commands.

For details on initial values and constants, see [User-Defined Variables](./user_defined_variables.md).

## Macro Definitions

Here, "macro" refers to a function that replaces strings in ERB code with predefined other strings.  
Although it is called a macro, it has nothing to do with keyboard macros that can be used with the `F1-F12 keys` during Emuera execution.  
This feature was created with reference to `#define` in C and C++.  
By defining macros in ERH files, they apply to code in all ERB files.

### Basic Usage

Macros are typically defined as follows:

	<*.ERH>
		#DEFINE <identifier to replace> <replacement expression>

This replaces <identifier to replace> with <replacement expression> in ERB. For example, if you define:

	<*.ERH>
		#DEFINE FIVE 5

in an ERH file, the string FIVE in ERB files is replaced with 5. For example:

	<*.ERB>
		X = FIVE

becomes

	(After expansion)
		X = 5

You can also add end-of-line comments to macros.  
Everything after a semicolon is ignored as a comment.  
The part after the semicolon is not included in the macro and will not be expanded.

	<*.ERH>
		#DEFINE FIVE 5 ;comment
	<*.ERB>
		X = FIVE + FIVE
	(After expansion)
		X = 5 + 5

Note that macro expansion is done almost exactly as strings.

	<*.ERH>
		#DEFINE SIX           1 + 5
		#DEFINE NINE          8 + 1
	<*.ERB>
		X = SIX * NINE

You might think `X` would be assigned `6*9`, i.e., 36, but actually:

	(After expansion)
		X = 1 + 5 * 8 + 1

Since multiplication takes precedence, `X = 42`.

Macros can be expanded to constant strings like `"~~"`, or to variables, functions, or expressions.  
If you consider that the string to the right of `#DEFINE` is expanded as-is, you can understand most cases.

	<*.ERH>
		#DEFINE HOGE        "hogehoge"
		#DEFINE PIYO        A
		#DEFINE FUGA        DA:10
		#DEFINE HOGERA      LOCAL + MY_FUNC(X, Y)
	<*.ERB>
		X = STRLEN(HOGE)
		Y = PIYO + 5
		FUGA:20 += PIYO
		LOCAL = HOGERA

		@MY_FUNC(ARG, ARG:1)
		#FUNCTION
			~omitted~
	(After expansion)
		X = STRLEN("hogehoge")
		Y = A + 5
		DA:10:20 += A
		LOCAL = LOCAL + MY_FUNC(X, Y)

		@MY_FUNC(ARG, ARG:1)
		#FUNCTION
			~omitted~

Due to the specification that macros are expanded as strings, you can also make the replacement target an incomplete operator or part of an expression.  
However, such usage is not recommended.  
Unless used very carefully, it will significantly reduce code readability.

	<*.ERH>
		#DEFINE PLUS       +
		#DEFINE FIVEPLUS   5 +
	<*.ERB>
		X = 1 PLUS 2
		Y = FIVEPLUS 2
	(After expansion)
		X = 1 + 2
		Y = 5 + 2

### Nested Macro Expansion

You can define macros that contain other macros. Such macros are repeatedly expanded during ERB loading until macros can no longer be applied.

	<.ERH>
		#DEFINE FIVE_1 5
		#DEFINE FIVE_2 FIVE_1 + FIVE_1
		#DEFINE FIVE_3 FIVE_2 + FIVE_2
	<.ERB>
		X = FIVE_3
	(After expansion)
		X = 5 + 5 + 5 + 5

If a macro still remains after a certain number of expansion iterations, Emuera will terminate processing with an error, suspecting a self-referencing or circularly referencing macro.  
Be careful not to create self-referencing or circularly referencing macros like the following:

	<.ERH>
		#DEFINE HOGE HOGE
		#DEFINE PIYO FUGA + 1
		#DEFINE FUGA PIYO + 2
	<.ERB>
	;Error
		X = HOGE
		Y = PIYO

### Preprocessor

You can branch whether to execute multiple lines based on whether a macro with a certain name is defined.  
Lines between the `[IF XXX]` line and the `[ENDIF]` line are executed only if `XXX` is `DEFINE`d. For example:

	<*.ERB>
		[IF HOGE]
			PRINTL HOGE is defined
		[ELSEIF PUYO]
			PRINTL HOGE is not defined
			PRINTL PUYO is defined
		[ELSE]
			PRINTL Neither HOGE nor PUYO is defined
		[ENDIF]

For this purpose, you can also define empty macros (macros without a replacement target).

	<*.ERH>
		#DEFINE HOGE

You can also use EM+EE's [`ISDEFINED`](../Reference/ISDEFINED.md) for the same purpose.

### Macro Limitations

Macros are basically expanded only within expressions.

	<*.ERH>
		#DEFINE FIVE 5
	<*.ERB>
		PRINT FIVE

simply prints the characters `FIVE`. This is the same as `PRINT X` printing only the characters `X`, not the value of `X`.

The replacement target of a macro cannot be an assignment operator or an expression containing an assignment operator.  
The following macro definitions cause errors:

	<*.ERH>
	;Error
		#DEFINE HOGE =
		#DEFINE PUGE X = 1

While it was written that macro replacement targets can be parts of expressions, the correspondence of parentheses must be complete within the macro itself. The following macro definitions cause errors:

	<*.ERH>
	;Error
		#DEFINE HOGE ( X +
		#DEFINE PUGE Y )
	<*.ERB>
		Z = HOGE PUGE

The replacement target of a macro cannot be an instruction.  
The following macro definition causes an error:

	<*.ERH>
		#DEFINE MY_PRINTL     PRINTL
	<*.ERB>
		MY_PRINTL This is PRINTL
	(After expansion)
		;Error

As mentioned above, macros are applied only to `*.ERB`, not to `*.csv` and `*.ERH`.  
Also, even within `*.ERB`, they are not applied to preprocessors, attribute names, or symbols at the beginning of lines.  
`[SKIPSTART]`, `#DIM`, `#FUNCTION`, the `@` part of `@EVENTFIRST`, etc., are not subject to replacement.  
For example, even if you `#DEFINE HOGE SKIPSTART`, `[HOGE]` will not start commenting.  
However, even for strings after `#`, variable names like those in `#DIM` are subject to replacement.  
For example, the following code:

	<*.ERH>
		#DEFINE HOGE MY_INT
		#DEFINE FIVE 5
	<*.ERB>
		@FUNC
		#DIM HOGE, FIVE
		HOGE:0 = 10
	(After expansion)
		@FUNC
		#DIM MY_INT, 5
		MY_INT:0 = 10

is expanded as shown and works correctly.


---

# expression.en
---
# General  
## End of line comment  

	A = B ;Substitute A for B  

You can insert a comment at the end of a line in this way.  
However, there are some exceptions, and if the argument is a simple string instruction such as the “PRINT” instruction, it will be evaluated as part of the string without beign treated as a comment  

	PRINT foo;bar  

In this case, "foo;bar" is PRINTed.  

## Concatenate Rows  

	{  
		DIM CONST HOGE =  
			1,2,3,4  
	}  

Will be interpreted as "#DIM CONST HOGE = 1,2,3,4"  
'{' and '}' lines must not contain any other characters besides whitespace.  
One-byte space is added at the position where there is a line feed symbol.  
In other words, lines cannot be split in the middle of function names and variable names,  
If you divide PRINT etc., the display character string will include the half-width space that was a line feed  
In Emuera's grammatical interpretation, line continuation processing is performed before interpretation of comments.  
In other words  

	{  
		#DIM CONST HOGE =  
			1,2,3,4 ;comment  
			,5,6,7,8  
	}  

Becomes "#DIM CONST HOGE = 1,2,3,4 ;comment ,5,6,7,8",  
",5,6,7,8" is considered part of the end-of-line comment and ignored.  

## Special Comment Line  
### ;!;  
In both Emuera and eramaker, lines starting with ; are considered comment lines, but Emuera considers lines starting with ;!; To be valid lines, not comments.  
Use this when writing statements that you do not want eramaker to execute.  
For example, adding the following script to @SHOWSHOP can prohibit operation on Emuera.  

	;!;PRINTW This script cannot be executed in Emuera  
	;!;QUIT  

(Also, by using it together with [SKIPSTART] and [SKIPEND], you can prohibit the operation of other than Emuera like the following script.)  
Use this when writing statements that you do not want to be executed except by Emuera.  

	;!;[SKIPSTART]  
	PRINTW This script cannot be executed except by Emuera  
	QUIT  
	;!;[SKIPEND]  

### ;#;  
Lines starting with ;#; are executed only in debug mode.  
In non-debug mode, it is regarded as a comment line and is not executed.  
However, since DEBUG instructions are originally ignored in non-debug mode, there is no need to prefix ;#; to the line.  
Similarly, debug variables are empty strings or 0 in non-debug mode, so there is no worry about errors.  
See [../debug|here] for debug mode.  

## Character Array  
eramaker probably has only 100 arrays for character creation.  
Therefore, even if different characters are defined in chara3.csv, chara03.csv, and chara3B.csv, only one person is valid.  
In Emuera, characters can be defined as many as memory allows.  
Also, if it corresponds to "chara*.csv", it will read any file such as chara101.csv, charaABC.csv  
If the character number is duplicated and there are multiple candidates for ADDCHARA or ADDSPCHARA, only the one that was read first will be valid.  

## Integer Value Range  
Integers that can be handled by eramaker are 32-bit signed integers, that is, in the range from -2147483648 to 2147483647.  
Emuera handles 64-bit signed integers in the same range as Kirikiri (吉里吉里), from -9223372036854775808 to 9223372036854775807.  

## Batch Assignment to Array Variables  

	A:10 = 1,2,3  
	DA:0:0 = 1,2,3  

When written as above, the values ​​of 1, 2, and 3 are assigned to A:10 to A:12, respectively  
In the following multidimensional array, values of 1, 2, and 3 are assigned to DA:0:0 to DA:0:2, respectively.  
DA:0:0 to DA:0:99 is not assigned to DA:1:0, and an out-of-array reference error occurs  
However, it cannot be used for compound assignment (A += 1,2,3 etc.).  
Also, when using batch assignment for assignment to a string type array variable, you must perform [../exetc#Assignment to a String Variable Using a String Expression|assignment using a string expression]  

	;The string "Strawberry, Melon, Blue Hawaii" is assigned to STR: 20  
	STR:20 = Strawberry, Melon, Blue Hawaii  
	;"Strawberry", "Melon", "Blue Hawaii" are assigned to STR:20~STR:22 respectively  
	STR:20 '= "Strawberry", "Melon", "Blue Hawaii"  

## Assignment to String Variable Using FORM Syntax  
When assigning to a string variable, you can specify the character string to be assigned in the same format as PRINTFORM.  

	SAVESTR:0 = %RESULTS%  

In this statement, you can substitute the contents of RESULTS for SAVESTR:0.  
The same statement means that eramaker substitutes the actual string of %RESULTS% for SAVESTR:0.  
If you want to substitute for the string %RESULTS% itself in Emuera, write as follows:  

	SAVESTR:0 = \%RESULT\%  

The character immediately after the \ symbol is not treated as a system symbol.  
If you want to include the \ symbol in the string, use \\.  

In the rare case, if you want the same behavior on eramaker and Emuera, you need to write as follows.  

	;!;SAVESTR:0 = \%RESULT\%  
	;!;[SKIPSTART]  
	SAVESTR:0 = %RESULTS%  
	;!;[SKIPEND]  

## Assignment to a String Variable Using a String Expression  
In Emuera after ver1813, assignment to string variables can be newly performed using the assignment operator '= and a string expression.  

	;Same as "STR = Ayu"  
	STR '= "Ayu"  
	;Same as "STR = %TSTR:0%ABC"  
	STR '= TSTR:0 + "ABC"  

## Specifying Array Variable Elements Using Character Strings  
For the following variables, the argument can be called as a character string defined in *.csv.  
For details on the new variables of Emuera, see [../exvar|Extended Syntax-Constants and Variables Added by Emuera].  

	ITEM (item.csv)  
	ITEMSALES (item.csv)  
	LOSEBASE (base.csv)  
	BASE (base.csv)  
	MAXBASE (base.csv)  
	ABL (abl.csv)  
	TALENT (talent.csv)  
	EXP (exp.csv)  
	MARK (mark.csv)  
	RELATION (chara*.csv)  
	UP (palam.csv)  
	DOWN (palam.csv)  
	PALAM (palam.csv)  
	JUEL (palam.csv)  
	GOTJUEL (palam.csv)  
	STAIN (stain.csv)  
	SOURCE (source.csv)  
	EX (ex.csv)  
	NOWEX (ex.csv)  
	TEQUIP (tequip.csv)  
	EQUIP (equip.csv)  
	FLAG (flag.csv)  
	TFLAG (tflag.csv)  
	CFLAG (cflag.csv)  
	STR (strname.csv)  
	SAVESTR (savestr.csv)  

The following are variables added by Emuera  

	ITEMPRICE (item.csv)  
	DOWNBASE (base.csv)  
	CUP (palam.csv)  
	CDOWN (palam.csv)  
	TCVAR (tcvar.csv)  
	TSTR (tstr.csv)  
	CSTR (cstr.csv)  
	CDFLAG (cdflag1.csv, cdflag2.csv)  
	GLOBAL (global.csv)  
	GLOBALS (globals.csv)  

For example, if abl.csv has the definition "2, Skill", the following four lines have the same meaning.  

	ABL:Skill += 1  
	ABL:2 += 1  
	ABL:"Skill" += 1  
	ABL:(ABLNAME:2) += 1  

For RELATION, you can specify either NAME or CALLNAME.  
If there are multiple definitions with the same name, the one defined first will be called.  
For example, if abl.csv contains "2, Skill" and "4, Skill", and "2, Skill" is defined in the previous line, "ABL:Skill" becomes "ABL:2".  
Strings can be expressions or variables. In that case, please add () as shown below.  

	ABL:(RESULTS:0) = ABL:(RESULTS:0) + 1  

If () is omitted, the item name and the variable name may be the same. In that case, the variable takes precedence.  
For example, if abl.csv has the definition "0, Rotor",  

	@HOGE  
	#DIM Rotor, 0  
	Rotor = 1  
	PRINTFORML {ABL:Rotor}  

In this case, it is interpreted as the first ABL, not the zeroth ABL.  
Similarly, if the item name is a number, interpretation as a number takes precedence.  
For example, if you define "0,10" in abl.csv and refer to ABL: 10, it will not be interpreted as the 0th ABL and will be the 10th ABL.  

This can also be used in definitions in chara*.csv.  
For example, if abl.csv has the definition "2, Skill", the following two lines have the same meaning:  

	能力,2,2  
	能力,Skill,2  

However, it cannot be used for RELATION(相性).  
This is because the system does not know the correspondence between chara name and NO when reading chara*.csv.  

## Formatted String (FORM Syntax) Extension  
You can specify the number of digits (characters) to be displayed in {} and %% in the formatted strings used in PRINTFORM, etc.  
In the form of:  

- `{Variable/Expression, Number of digits, Justification (LEFT or RIGHT)}`  
- `%Variable/String Expression, Number of digits, Justification (LEFT or RIGHT)%`  

Full-width (Japanese) characters are counted as 2 characters.  
Half-size spaces will be added to the number of digits (characters) in the display.  
Normally it is right-aligned, but if you specify the keyword LEFT, it will be left-aligned.  
If the original number of digits is larger than the specified number of display digits, it is displayed as it is.  

	A = 123456  
	STR:0 = あいう  
	PRINTFORML [{A}]  
	PRINTFORML [{A,10}]  
	PRINTFORML [{A,10,LEFT}]  
	PRINTFORML [%STR:0%]  
	PRINTFORML [%STR:0,10%]  
	PRINTFORML [%STR:0,10,LEFT%]  
	PRINTFORML [{A,2}]  
	PRINTFORML [%STR:0,2%]  

Results into  

	[123456]  
	[    123456]  
	[123456    ]  
	[あいう]  
	[    あいう]  
	[あいう    ]  
	[123456]  
	[あいう]  

## Using Formatted Strings (FORM Syntax) in String Expressions  
Using the FORM syntax in a string expression, such as PRINTS or arguments to a user-defined function in an expression, will result in an error.  
So when you use a formatted string in a string expression, you can use it in the same way that you use "～" when you use a defined string in a string expression.  
Use it like @"～".  
In addition, if the string in @"～" is only described by a ternary operator using \@～\@, you can omit @"～" and write directly as \@～\@.  
Correct example  

	;Assignment is a FORM syntax  
	STR:0 = aiu  
	;Addition is a string expression  
	RESULTS += STR:0  
	;Example of using a constant string as a string expression  
	RESULTS += "eo"  
	;Example of using the FORM syntax for a string expression  
	PRINTS @"%RESULTS% lalilulelo"  
	;The following four lines are all the same  
	PRINTS STR:0 + "！"  
	PRINTFORM %STR:0%！  
	PRINTS @"%STR:0%！"  
	PRINTFORM %STR:0 + "！"%  

	Wrong example  

	;It will be "RESULTS" inside  
	STR:0 = RESULTS  
	;You'll get an error  
	RESULTS += eo  
	;You'll get an error  
	RESULTS += %STR:0%  
	;You'll also see "@" and " printed  
	PRINTFORM @"%RESULTS% lalilulelo"  

## Use of macro syntax with INPUTS  
INPUTS and other similar input acceptance instructions can be used as macro expressions.  
For the format of the macro, please refer to the Macros section in the How to Use section.  
If you don't use the macro syntax and want to use () as a simple string, escape it with \.  


---

# function.en
---
# Functions and Preprocessors

## Special Functions

### `@EVENTLOAD`
Called immediately after loading data.  
Since it is an event function, it can be defined multiple times.  
If `@EVENTLOAD` is not defined, it transitions to `@SHOW_SHOP` (same behavior as eramaker).

### `@TITLE_LOADGAME`
Called when Load is selected on the standard title screen.  
By defining `@TITLE_LOADGAME`, you can use your own load screen even on the title screen.  
If not defined, the standard load screen is used.  
If `@SYSTEM_TITLE` is defined, `@TITLE_LOADGAME` will not be called unless you explicitly [`CALL`](../Reference/CALL.md) it.

### `@SYSTEM_AUTOSAVE`
Called at the timing when an autosave is performed.  
You can define the contents of the autosave yourself.  
If not defined, the standard save function is used.

### `@SYSTEM_TITLE`
Called when CSV loading is complete.  
Also called by `BEGIN TITLE`.  
By defining `@SYSTEM_TITLE`, you can use your own title screen.  
If not defined, the standard title screen is used.

### `@CALLTRAINEND`
A function automatically called from within the system after automatic execution by `CALLTRAIN` ends.  
Note that since it is not an event function, it cannot be multiply defined.

## Argument Specification in User-Defined Functions

### Format

**Function side**

		@(FunctionName),(Arg1),{(Arg2)....}
		Arguments are ARG(:0,1,2...) for numbers, ARGS(:0,1,2...) for strings
		Private variables defined with #DIM, #DIMS in the function can also be specified as arguments

**Calling side**

		CALL (FunctionName),(Arg1),{(Arg2)....}

Both numeric expressions and string expressions can be used for numbers.  
When using string literals (constants) as arguments, enclose them in `""`.  
When using formatted string literals as arguments, write them as `@"~~"`.  
The same format can be used with [`JUMP`](../Reference/JUMP.md), CALLFORM, TRYCALL, etc., in addition to [`CALL`](../Reference/CALL.md).  
Any number of arguments can be specified on the function side.  
As of ver 1.808, if the types differ between the function side and calling side, an error occurs without conversion, regardless of whether it's number to string or string to number.  
If you want to call with a number for a string-type argument as in ver 1.807 and earlier, change the config setting or use the `TOSTR` function.  
Arguments can be omitted. If omitted, 0 is assigned for numeric types and an empty string for string types (if no default value is set).  
In the called function, passed values can be referenced with `ARG` and `ARGS`.  
Basically, it is pass-by-value, so note that changing the contents of `ARG` does not change the value of the original variable etc. that was passed.  
It is also possible to use variables other than `ARG`, `ARGS`, or private variables defined with `#DIM`, `#DIMS` in the function (such as `A` or `STR`) as arguments, but there are some limitations.  
As of ver 1.808, when using these variables, default values cannot be set and arguments cannot be omitted.

	;Definition
	@FOOBAR, ARG:0, ARGS:0
		~~
	@HOGEHOGE, ARG:0, ARG:1, ARG:2
		~~
	;Calling
	;Specify with variable
		CALL FOOBAR, X , STR:0
	;Specify with constant
		CALL FOOBAR, 123 , "aiu"
	;Specify with formatted string
		CALL FOOBAR, 123 , @"[{COUNT}] aiu"
	;Specify with expression
		CALL FOOBAR, X + 10, "aiu" * 10
	;Omit all arguments
		CALL FOOBAR
	;Omit first argument
		CALL FOOBAR, , "aiu"
	;Omit second argument
		CALL FOOBAR, 123

**<Examples that cause errors>**

	;Error (too many arguments)
		CALL FOOBAR, X , STR:0, Y
	;Error (wrong argument type - trying to assign string to numeric first argument)
		CALL FOOBAR, "aiu", "kaki"
	;Error (wrong argument type - trying to assign number to string second argument)
		CALL FOOBAR, 123 , 456

**<Examples that work but are not recommended>**

	;Destination can be other than ARG, ARGS, but normally ARG is recommended
	@FOOBAR, X, Y
	;Destination can be variable, but readability decreases
	@FOOBAR, ARG:X, ARG:Y
	;Readability decreases
	@FOOBAR, ARG:0, ARG:(ARG:0)

### Default Values for Arguments

You can set default values for function arguments.  
When setting default values, the function side becomes as follows:

	@(FunctionName),(Arg1 = Default1),{(Arg2 = Default2)....}
	Arguments are ARG(:0,1,2...) for numbers, ARGS(:0,1,2...) for strings,
	or private variables defined with #DIM, #DIMS in the function
	Other specifications cannot have default values set.

Only constants and constant strings can be specified as default values; variables cannot be specified.  
Also, default strings must be enclosed in `""`.  
If a default value is set and the calling side omits the argument, the set default value is assigned.  
If the function is called without omitting, the passed values are assigned to `ARG` and `ARGS` as usual.

	;Default value setting (partial omission is also possible)
	@FUNCTION, ARGS:0 = "kaki", ARG:0 = 111, ARG:1, ARG:2 = 200
		~~

	;Error (default values can only be constants and constant strings)
	@FOOBAR, ARG:0 = MASTER, ARG:1 = TARGET
	;Setting default values for arguments other than ARG, ARGS, or private variables defined with #DIM, #DIMS in the function is ignored.
	;Therefore, it does not behave as expected.
	@FOOBAR, X = 5, Y = 4

### Pass by Reference for Arguments

From ver 1.810, pass by reference for arguments became possible by making a reference type variable a formal parameter.  
See the [Reference Type Variables](user_defined_variables.md#_6) section for how to define reference type variables.

**<xxx.ERB>**

	@SYSTEM_TITLE
	A = 0
	CALL TEST(A)
	B = 1
	CALL TEST(B)
	PRINTFORML A == {A}
	PRINTFORML B == {B}
	WAIT

	@TEST(HOGE)
	#DIM REF HOGE
	HOGE = 100
	RETURN

**<Execution Result>**

	A == 100
	B == 100

In the above example, the function `@TEST` has a reference type variable as a formal parameter.  
When `@TEST` is called the first time, `HOGE` becomes a reference to the actual argument `A`.  
Since `HOGE = 100` in the function `@TEST` assigns `100` to the referenced variable `A`, the result of the first `PRINTFORML` is `100`.  
Similarly, when `@TEST` is called the second time, `100` is assigned to the variable `B`, and the result of the second `PRINTFORML` is also `100`.

## Attributes

Preprocessors that determine function specifications and behavior.  
When writing preprocessors starting with `#` in a function, they must be placed immediately after the function.

### `#ONLY`
An attribute for event functions only.  
If there is an event function with `#ONLY` specified, only that one is executed, and other event functions with the same name are not executed.  
Also, if there are multiple event functions with the same name with `#ONLY` specified, only "the first one" is executed.

### `#FUNCTION`
An attribute for expression functions.  
Expression functions cannot end with a normal RETURN; instead, they must end with `RETURNF <numeric expression>`.  
See [User-Defined Expression Functions](user_defined_in_expression_function.md) for details.

### `#FUNCTIONS`
An attribute for expression functions.  
Expression functions cannot end with a normal `RETURN`; instead, they must end with RETURNF <string expression>.  
See [User-Defined Expression Functions](user_defined_in_expression_function.md) for details.

## Definitions

Preprocessors that define variable names and their specifications.  
When writing preprocessors starting with `#` in a function, they must be placed immediately after the function.

### `#LOCALSIZE <constant expression>`, `#LOCALSSIZE <constant expression>`

Preprocessors for specifying the number of elements of `LOCAL` and `LOCALS` individually for each function.  
The result of the constant expression must be an integer greater than 0; otherwise, if an expression containing variables or an uninterpretable string is given, it is ignored.  
If ignored or if this preprocessor is not used, the setting value in `VariableSize.csv` is used normally.  
If this preprocessor is used on an event function, the setting of the first one executed is used (as of ver 1800).

### `#DIM`

User-defined variable declaration. When used in a specific function in ERB, you can define a numeric variable that can only be used within that function.  
See User-Defined Variables for details.  
Also, when used in an ERH file, you can define a numeric variable whose value can be shared by all functions.  
See [Header Files (ERH)](ERH.md) for details.

### `#DIMS`

User-defined variable declaration. When used in a specific function in ERB, you can define a string variable that can only be used within that function.  
See User-Defined Variables for details. Also, when used in an ERH file, you can define a string variable whose value can be shared by all functions.  
See [Header Files (ERH)](ERH.md) for details.

### `#DEFINE`

DEFINE macro declaration. When used in an ERH file, you can replace strings in all ERB code with predefined other strings.  
See Header Files (ERH) for details.

## Lines Representing Special Blocks

These are preprocessor lines.  
On the same line where these are written, you must not write commands, functions, or comments immediately after them.  
These cannot be interpreted by eramaker, so you may need to use `;!;` when coding.

### `[SKIPSTART]` to `[SKIPEND]`

Lines written between `[SKIPSTART]` and `[SKIPEND]` are not read or executed by Emuera.  
This is used when intentionally changing behavior between Emuera and eramaker.  
Use this when writing statements you do not want executed in Emuera.  
Also, by combining with `;!;`, you can write statements you do not want executed outside of Emuera.  
See the [Notation Added in Emuera](expression.md) section for details.

### `[IF XXX]` to `[ELSEIF XXX]` to `[ELSE]` to `[ENDIF]`

You can branch whether to execute multiple lines based on whether a macro named `XXX` is defined.  
See [Header Files (ERH)](ERH.md) for details.

### `[IF_DEBUG]` to `[ENDIF]`

Lines written between `[IF_DEBUG]` and `[ENDIF]` are executed only in debug mode.  
In non-debug mode, they are treated as comment lines and not executed.  
However, `DEBUG` commands are originally ignored in non-debug mode, so there is no need to prefix `;#;` to the beginning of the line.  
Similarly, debug variables are empty strings or 0 in non-debug mode, so there is no worry about errors.  
See [here](debug.md) for debug mode.

### `[IF_NDEBUG]` to `[ENDIF]`

Lines written between `[IF_NDEBUG]` and `[ENDIF]` are executed only in non-debug mode.  
In debug mode, they are treated as comment lines and not executed.  
The condition is reversed compared to `[IF_DEBUG]`.  
See [here](debug.md) for debug mode.


---

# glossary.en
---
# Glossary  
This is a summary of the terms used in this wiki.  
I wrote it as a memo because the original coined words have increased with the extension of Emuera.  

## Startup Mode  
### Normal Mode  
This is the mode when Emuera is started normally.  
You will be in this mode when you double-click on EmueraXXXX.exe to launch it.  

### Analysis Mode  
This is the mode when a file is passed as a command line argument.  
It also becomes this mode when a file is drag and dropped into EmueraXXXX.exe.  
In analysis mode, a grammar check is performed for dragged and dropped files.  
This allows you to check for grammatical errors in the files you are developing.  
However, you will need the CSV folder of the variant you plan to use to check the type of the elements string.  
Just drag and drop the file into the EmueraXXXX.exe of the variant you plan to use.  
In addition, from 1738g, when "Report is displayed when loading" is enabled in the analysis mode, it is possible to display the report when loading.  
The list of functions used in each loaded ERB file is now displayed.  
If you have too many functions, increase the number of lines in the log in your config.  

### Debug Mode  
This is the mode when the command is started by passing "-debug" as command line argument. See Debug Mode for details.  

## Windows / Dialogs  
### Main Window  
This is the first window that opens when you normally start up.  

### Main Console  
The name of the part of the Main Window that is used for input and output.  

### Debug Window  
This is a window that can be opened when started in Debug Mode.  

### Debug Console  
The name of the input/output part that is displayed when the "Console" tab is selected in the Debug Window.  

### Configuration Dialog  
It is a dialog that can be opened from the main window menu help or settings.  

### Clipboard Dialog  
It is a dialog that can be opened by Ctrl+C from the main console.  

## Functions  
### Commands  
PRINT or WAIT, for example.  

### Functions  
It is a name that is defined in an ERB script with @~~ statements and called with a CALL instruction, etc.  
Among the functions that can be used in expressions, those that define their names in sentences @~~ are included.  

### Event Functions  
A function whose name starts with "EVENT" and is called by the system.  
If you define more than one, all of them will be called.  

### Preprocessor  
A line in a file in the ERB folder that is processed before any other instruction.  
A line that begins with # or consists of a phrase enclosed in [].  
Lines that begin with # are divided into attributes and definitions. Please see them for more information.  
Lines consisting of words or phrases enclosed in [] represent special blocks.  
See this page for more information  

### Property (Preprocessor)  
A preprocessor that determines the type and behavior of a function with a line beginning with a # specified for the function.  
There are #PRI, #LATER, #SINGLE, and #ONLY to control the behavior of when the event function is executed,  
and #FUNCTION and #FUNCTIONS to specify the type of the function in the expression.  

### Definitions (Preprocessor)  
A preprocessor that defines the name of a variable and its type on a line beginning with #.  
Functions include #LOCALSIZE and #LOCALSSIZE to specify the number of elements in a LOCAL or LOCALS variable,  
`#DIM` and #DIMS to define a variable, and #DEFINE to define a DEFINE macro in the ERH.  
Functions that can be used in expressions  
It is a "function" that can be called from within an expression.  
The "function" includes not only the above functions but also the built-in functions described below.  
In many programming languages they are simply called "functions".  

### Functions in an Expression  
Abbreviation for a function that can be used in an expression.  
It has nothing to do with expression functions (anonymous functions) or inline functions in programming languages.  

### Built-in Functions  
Among expression functions, these are functions that are built into Emuera and can be used without defining them with @~~ statements.  
Examples include `ABS(X)` and `GETTIME()`.  
This is confusing, but they do not fall under the definition of "function" above.  
It may be easier to think of them as "instructions that can be used in expressions."  

### User-Defined Functions  
Functions defined by the user.  
These are functions whose names are defined with @~~ statements in ERB scripts and called with the CALL instruction, etc.  
In other words, they are the same concept as the "functions" above.  

### `#FUNCTION(S)` Functions  
Functions whose names are defined with @~~ statements and have the #FUNCTION(S) attribute.  
These are functions that are both "functions" and "expression functions."  

## Lines, Statements, and Expressions  
### Line  
The text from one newline code to the next newline code.  
In programming contexts, this is also called a "physical line."  
Confusingly, in editor contexts, this is often called a "logical line."  

### Statement  
A statement (or logical line) is a single processing unit in Emuera.  
Most statements consist of one instruction and its arguments, or a variable, an assignment operator, and an expression.  
In ERB, the rule is one statement per line, so "line" and "statement" mean almost the same thing.  
This wiki does not distinguish between them.  

### Expression  
A combination of variables, constants, expression functions, non-assignment operators, and parentheses.  
Assignment operators can only be used as the first operator in an assignment statement and cannot be used in expressions.  

### Numeric Expression  
An expression whose evaluation result (operation result) is a number.  
For example, `A+B`, `STR == "abc"`, etc.  

### String Expression  
An expression whose evaluation result (operation result) is a string.  
For example, `STR + STR:1`, `"a" * 10`, etc.  

## Variables  
### Pseudo-Variables  
Things that can be written like variables, such as RAND and CHARANUM, but are not actually variables.  
Internally, they behave similarly to expression functions.  

### Array Variables  
Variables that have multiple elements.  
The number of elements in an array variable can be changed with `VariableSize.csv`, and normally does not increase or decrease in scripts,  
but for some local variables, the number of array elements can be specified in the script.  

### Character Variables  
Variables that record the state of characters.  
They are unrelated to char-type variables in C and other languages.  
Due to their nature, the number of elements increases or decreases as characters are added or removed via ADDCHARA or DELCHARA.  
Although they are treated as one type of array variable in eramaker's documentation because elements are specified in the same format as array variables, such as `NO:TARGET`, this wiki distinguishes between character variables and array variables.  

### Double Array Variables  
Variables that are both character variables and array variables.  
They take two arguments (can be omitted), such as `CFLAG:TARGET:2`.  
Since they are character variables, the first argument represents the character number.  
Also, the number of elements in the first dimension increases or decreases as characters are added or removed.  
The number of elements in the second dimension can only be changed with `VariableSize.csv` and does not increase or decrease in scripts.  

This wiki does not use the term "double array" except when explaining eramaker specifications.  
Instead, we use terms like "character variable that is also an array variable."  

### Multidimensional Array Variables  
These are two-dimensional array variables like `DITEMTYPE` and three-dimensional array variables like `TA`.  
They take 2 or 3 arguments, such as `DA:0:1` or `TA:1:2:3`.  
The number of elements in multidimensional array variables can only be changed with `VariableSize.csv` and does not increase or decrease in scripts.  
Also, arguments to multidimensional array variables cannot be omitted.  

### Character Multidimensional Array Variables  
Variables that are both character variables and multidimensional array variables.  
They take 3 arguments (cannot be omitted), such as `CFLAG:TARGET:0:2`.  
Since they are character variables, the first argument represents the character number.  
Also, the number of elements in the first dimension increases or decreases as characters are added or removed.  
The number of elements in the second and third dimensions can only be changed with `VariableSize.csv` and does not increase or decrease in scripts.  

As of ver1807, only `CDFLAG` falls into this category.  
See CDFLAG for details.  

### Local Variables  
Variables that are prepared for each function (function name), such as LOCAL, LOCALS, and private variables.  
See the separate section for private variables.  
LOCAL and LOCALS other than private variables are not actually "local variables" in the usual sense,  
but are `public static` variables named `LOCAL@function_name` or `LOCALS@function_name`.  
Values are retained even after exiting the function, and can be assigned and referenced from outside the function.  
Also, in cases like recursive calls where the function is called multiple times, the values are shared.  

### Global-Scope Variables  
Variables whose values are shared among all functions, to which most variables except LOCAL, LOCALS, private variables, etc. belong.  
This is also the concept of global variables in general programming languages.  
Also, global-scope variables can be defined by using `#DIM` or `#DIMS` in an ERH.  
See the Header Files (ERH) page for details.  

### Global Variables  
Variables whose values can be shared between different save data. Global variables are also included in global-scope variables.  
The timing of save/load and initialization is different from normal variables.  
Emuera's global variables are unrelated to the concept of global variables in general programming languages.  

### Private Variables  
Variables defined by `#DIM` or `#DIMS` for each function (function name).  
These are also local variables, so each function has its own separate instance.  
However, unlike LOCAL which is considered the same local variable, assignment and reference from outside the function using `@function_name` is not possible.  
See the User-Defined Variables page for details.  


---

# HTML_PRINT.en
---
# HTML_PRINT Related

This section explains HTML_PRINT and related HTML commands.  
By using related commands, you can specify display content using HTML-like syntax.  
**Note: Specifications have been added in EM+EE, so this has been revised to conform to EM+EE.**

## HTML_PRINT

A command that `PRINT`s using HTML-like tags.  
The argument is a string expression like `PRINTS`, not a simple string like `PRINT`, and automatically adds a newline, so it actually behaves more like `PRINTSL`.  
Drawing by `HTML_PRINT` is not affected by `ALIGNMENT`, `SETFONT`, `COLOR`, or `FONTSTYLE` commands and their similar commands.  
To achieve these effects, everything must be specified with tags.  
Use in the form `<tagName attribute='attributeValue'>text</tagName>`.  
Attribute values must be enclosed with `'~'` or `"~"`.  
We recommend enclosing with `'~'` to distinguish from strings in Emuera.

In EM+EE's added functionality, if the second argument is non-zero (default is 0), forced line breaking is disabled.

### `p`

	<p align='~'>text</p>

The `p` tag can only be placed before text, and `</p>` can only be placed at the end.  
`</p>` can be omitted.

- `align` attribute
	Required.  
	Equivalent to the `ALIGNMENT` command. Three types can be specified: `left`, `center`, and `right`.

### `nobr`

	<nobr>text</nobr>

Equivalent to drawing by the `PRINTSINGLE` command.  
With this tag, implicit line breaks due to exceeding the drawing area are not performed (explicit line breaks with `<br>` are possible).  
However, since Emuera cannot scroll horizontally like a browser, portions exceeding the window width become invisible.  
`<nobr>` can only be placed before the first text, and `</nobr>` can only be placed after the last text.  
`</nobr>` can be omitted.

### `br`
Inserts a line break.  
This effect is a display line break, so even with multiple `<br>`s, it counts as one line for `CLEARLINE` and `LINECOUNT`.

### `button`, `nonbutton`

	<button value='~' title='~' pos='~'>text</button>
	<nonbutton title='~' pos='~'>text</nonbutton>

`button` makes the enclosed text a clickable button.  
`nonbutton` displays the enclosed text as non-button text.

- `value` attribute
	Can only be specified for `button`.  
	If `value` is omitted, it becomes a non-button like `<nonbutton>` without click capability.

- `title` attribute
	Specifies the tooltip content to display when pointing at the button.

- `pos` attribute
	Can only be used when `align` is `left` and the `nobr` tag is used.  
	Specifies the position from the left edge of the screen as a percentage of the font size.  
	For example, `<button pos='300'>Button</button>` places the button at approximately the same position as `「      Button」`.

### `font`

	<font face='~' color='~' bcolor='~'>text</font>

Changes the font, display color, and button selection display color for the enclosed text.  
This tag can be nested.

- face attribute
	Specifies the font name. If an empty string is specified, the font specified in config is used.  
	If the specified font does not exist or is not supported, "Microsoft Sans Serif" is used instead.  
	(This is due to the specifications of the .Net Framework's System.Drawing.Font class)

- color attribute
	Specifies the text display color.  
	Color can be specified in hexadecimal format like `#FF0080` or word format like `red` or `blue`.  
	Color names follow the defined colors of the .Net Framework's `Color` structure.  
	However, `Transparent` cannot be specified as a color name.

- bcolor attribute
	Specifies the button selection display color.

### `b`, `i`, `u`, `s`

	<b>Bold</b>, <i>Italic</i>, <u>Underline</u>, <s>Strikethrough</s>

Makes the enclosed text bold, italic, underlined, or strikethrough respectively.

### `img`

	<img src='~~' srcb='~~' height='~~'>

Displays an image inline.  
See [Resource Settings](resources.md) for how to prepare images.

- `src` attribute
	Required.  
	Specifies the resource name created in the CSV file in the `resources` folder.  
	If `height` or `width` is not specified, it is displayed scaled or enlarged while maintaining the aspect ratio so that the height matches the font size.  
	If the drawing interface is `WINAPI`, alpha blending is not performed.

- `srcb` attribute
	Specifies the resource name created in the CSV file in the `resources` folder.  
	`srcb` specifies the resource name that should be displayed when the button is selected.  
	If omitted, the same image as `src` is used.  
	The image is displayed scaled or enlarged to the same size as `src`.

- `height` attribute
	Specifies the display size height as a percentage of the font size. Defaults to 100 if omitted.  
	If a negative value is specified, the image is displayed vertically flipped.

- `width` attribute
	Specifies the display size width as a percentage of the font size. Defaults to 0 if omitted.  
	If 0, the value maintains the original image's aspect ratio.  
	If a negative value is specified, the image is displayed horizontally flipped.

- `ypos` attribute
	Specifies the vertical position as a percentage of the font size. Defaults to 0 if omitted.  
	Note that the base is "font size", not "line height".  
	Use `<shape type='space'>` or the `pos` attribute of `button` to adjust horizontal position.

- `px` notation
	For the above attributes, px specification is possible by adding `px` after the number.

- `srcm` attribute
	Similar to CBG series button maps. When executing [Extended INPUT mode](../EMEE/EMEE_Summary.md#input) or the `INPUTMOUSEKEY` command, assigns the color (RGB part) of the button map image directly under the mouse cursor to `RESULT:3` (`RESULT:6` for `INPUTMOUSEKEY`).

### `shape`

	<shape type='rect' param='~~' color='~~' bcolor='~~'>
	<shape type='space' param='~~'>

Draws a specified shape within the line.

- `type` attribute
	Required.  
	Specifies the type of shape to draw.  
	`rect` or `space` can be used.
	- `type='rect'`
		Draws a rectangle.  
		`param` takes 1 or 4 numbers.  
		When `param` is 1, it specifies the rectangle width.  
		`<shape type='rect' param='400'>` draws a rectangle with a width of 400% of the font size.  
		When `param` is 4, it specifies `x`, `y`, `width`, `height` in order.  
		`<shape type='rect' param='0,25,400,50'>` draws a rectangle with a height of 50% of the font size at the vertical center of the line.  
		`param='400'` means the same as `param='0,0,400,100'`.
	- `type='space'`
		Displays nothing for the width specified in `param`.  
		For example, `<shape type='space' param='400'>` draws nothing for a section of 400% of the font size.  
		This is approximately equivalent to 4 full-width spaces.

- `param` attribute
	Required.  
	Specifies parameters for shape drawing as a ratio (percentage) to the font size.  
	Separate multiple values with commas.

- `color` attribute
	Specifies the shape color. The format is the same as the `<font>` tag.

- `bcolor` attribute
	Specifies the shape color when the button is selected. The format is the same as the `<font>` tag.

### `clearbutton`
A feature added in EM+EE. `<clearbutton>` makes the enclosed portion's button status invalid (the `title` and `pos` attribute functions remain).

- If the `notooltip` attribute is `true`, the button's `title` attribute is also invalidated.

### `div`
A feature added in EM+EE. Content enclosed by `<div>` can be displayed in a specified area. `<div>` does not support nested structures. It can be used with other tags.

- `width` attribute: The width of the sub-area. Can be specified in `px` or as a percentage of the font size, like `<img>` and `<shape>` tags.
- `height` attribute: The height of the sub-area. Can be specified in `px` or as a percentage of the font size, like `<img>` and `<shape>` tags.
- `xpos` attribute: The horizontal distance of the sub-area from the current position. Can be omitted. Negative means left, positive means right. Can be specified in `px` or as a percentage of the font size, like `<img>` and `<shape>` tags.
- `ypos` attribute: The vertical distance of the sub-area from the current position. Can be omitted. Negative means up, positive means down. Can be specified in `px` or as a percentage of the font size, like `<img>` and `<shape>` tags.
- `size` attribute: Simplified `width` and `height`. Format: `size='width,height'`.
- `rect` attribute: Simplified `xpos`, `ypos`, `width`, and `height`. Format: `rect='xpos,ypos,width,height'`.
- `depth` attribute: The depth of the sub-area. Can be omitted. Negative means closer, positive means further.
- `color` attribute: The background color of the sub-area. Can be omitted. The format is the same as the `color` attribute of the `<font>` tag.

- `display` attribute: The drawing format of the sub-area. Can be omitted.
    - `relative` (default): Draw at the current character position.
    - `absolute`: Draw at a fixed position in the window, does not move even when scrolling. `(0, 0)` is the bottom left of the window, `ypos` is positive in the upward direction.

- `margin` attribute: The margin area for all four sides of the sub-area. Can be omitted.
    - `margin='all'`: Apply `all` to all four sides. Both `px` and font size percentage are acceptable.
    - `margin='leftRight,topBottom'`: Apply `leftRight` to top and bottom, `leftRight` to left and right. Both `px` and font size percentage are acceptable.
    - `margin='top,leftRight,bottom'`: Apply `top` to top, `leftRight` to left and right, `bottom` to bottom. Both `px` and font size percentage are acceptable.
    - `margin='top,right,bottom,left'`: Apply `top` to top, `right` to right, `bottom` to bottom, `left` to left. Both `px` and font size percentage are acceptable.

- `padding` attribute: The padding area for all four sides of the sub-area. Can be omitted. The format is the same as the `margin` attribute.
- `border` attribute: The border width of the sub-area. Can be omitted. The format is the same as the `margin` attribute.
- `bcolor` attribute: The border color of the sub-area. Can be omitted. The format is similar to the `margin` attribute, but the color format is the same as the `color` attribute of the `<font>` tag.

- `radius` attribute: The rounding of the outer corners of the sub-area's border (radius). Can be omitted.
    - `radius='all'`: Apply `all` to all four corners. Both `px` and font size percentage are acceptable.
    - `radius='ltRb,rtLb'`: Apply `ltRb` to top-left and bottom-right, `rtLb` to top-right and bottom-left. Both `px` and font size percentage are acceptable.
    - `radius='lt,rtLb,rb'`: Apply `lt` to top-left, `rtLb` to top-right and bottom-left, `rb` to bottom-right. Both `px` and font size percentage are acceptable.
    - `radius='lt,rt,rb,lb'`: Apply `lt` to top-left, `rt` to top-right, `rb` to bottom-right, `lb` to bottom-left. Both `px` and font size percentage are acceptable.


### Character References

When a word is enclosed by `&` and `;`, it is processed as a character reference.  
Supported character references are `&amp;`, `&gt;`, `&lt;`, `&quot;`, `&apos;`, and `&#nn;`, `&#xnn;`.

### Comments

	<!-- comment -->

During HTML interpretation, characters enclosed by `<!--` and `-->` are ignored.

## Related Commands and Functions

See the [HTML-related section in Reference](../Reference/README.md#html系).


---

# in_expression_function.en
---
# Expression Functions

**The syntax explained on this page is not required.**  
**Everything that can be done in ERB can also be done without using "Expression Functions" (the script will just be a bit longer).**  
**If you don't feel inconvenienced by the existing syntax, you don't need to use "Expression Functions".**

"Expression Functions" is a new syntax added in Emuera ver 1.712.  
This is what is simply called a "function" in many programming languages.  
In eramaker basic, what is defined with `@~~` and called with [`CALL`](../Reference/CALL.md) is called a "function", so Emuera calls the new "function" a "function available in expressions".  
Below, when there is no misunderstanding, "Expression Functions" will simply be called functions.

Also, other pages may abbreviate "Expression Functions" as "expression functions".  
However, this is unrelated to expression functions (anonymous functions) or inline functions in other programming languages.  
For user-defined "Expression Functions" that are not built-in and are defined and used in ERB, see [User-Defined Expression Functions](./user_defined_in_expression_function.md).

"Expression Functions" are used as follows:

	A = ABS(A)
	IF STRLENS(STR:0) > A
		LOCALS:0 = %SUBSTRING(STR:0, A, 1)%
	ENDIF

This script:
Calculates the absolute value of A and assigns it to A,
and if the string length of `STR:0` is greater than `A`,
assigns the `A`-th character of `STR:0` to `LOCALS:0`.

The above script can be rewritten without using "Expression Functions" as follows:

	ABS A
	A = RESULT
	STRLENS STR:0
	IF RESULT > A
		SUBSTRING STR:0, A, 1
		LOCALS:0 = %RESULTS:0%
	ENDIF

Except for intermediate values being assigned to `RESULT` and `RESULTS`, this behaves exactly the same as above.

# Notation

The following explains the symbols used in the documentation.  
For example:

	int STRLENS(str s)
	str SUBSTRING(str s, int start = 0, int length = -1)

The initial `int` or `str` represents the return type.  
`int` means integer type, `str` means string type.  
The following script works on line 1 but causes an error on line 2:

	A = STRLENS("abc")
	A = SUBSTRING("abc", 0, 1)

The return value of [`SUBSTRING`](../Reference/SUBSTRING.md) is `str`, i.e., string type, so it cannot be assigned to the integer variable `A`. Functions that return string type cannot be assigned, but can otherwise be treated like string variables.

	STR = %SUBSTRING("abc", 0, 1)%

Next, [`STRLENS`](../Reference/STRLEN.md) or `SUBSTRING` is the function name.

The characters inside `()`, such as `str s`, represent arguments.  
If there are multiple arguments, they are separated by `,` (comma). `STRLENS` has 1 argument, `SUBSTRING` has 3 arguments.

The first word of an argument is the argument type.  
The argument of `STRLENS` is string type (str).  
For `SUBSTRING`, the first argument is string type (str), and the second and third arguments are integer type (int).  
The following words like `str`, `start`, and `length` are argument names.  
Argument names are convenience names used in the documentation and do not need to be specifically noted.

The `= 0` after the argument name indicates that the argument can be omitted and shows the default value when omitted.  
All of the following lines have the same meaning:

	STR = SUBSTRING(RESULTS)
	STR = SUBSTRING(RESULTS, 0)
	STR = SUBSTRING(RESULTS, , -1)
	STR = SUBSTRING(RESULTS, 0, -1)

When omitting a middle argument rather than the last argument, you need to insert `,` to indicate which argument is being omitted, like `SUBSTRING(RESULTS, , -1)`.  
However, this is not necessary when it is clear which argument is omitted.  
All of the following lines have the same meaning:

	;int RAND(int min = 0, int max)
	A = RAND(100)
	A = RAND( , 100)
	A = RAND(0, 100)

Also,

	int GETTIME()

indicates no arguments. In this case, `()` is still required (to distinguish from variables).

	int FINDCHARA(var key, ? value, int start = 0)

Here, `var` represents a variable type. You pass a variable like `TALENT`.  
`?` indicates that multiple types are accepted.  
In `FINDCHARA`, the type to pass as the second argument depends on the variable specified as the first argument.

	int MAX(int n, int m...)

indicates that any number of arguments are acceptable.

	M = MAX(A, B, C, D, E, F, G)

assigns the largest number among A through G to M.

The documentation for EM+EE uses a slightly different notation.


---

# operand.en
---
# Operations
## Operators
### Unary Operators
- `~` Bitwise NOT - Unary operator (highest priority)
- `!` Logical NOT - Unary operator (highest priority)

### Binary Operators
- `<<` Left bit shift. Higher priority than comparison and bitwise operations, lower than arithmetic operations.
- `>>` Right bit shift. Higher priority than comparison and bitwise operations, lower than arithmetic operations.
- `^` Bitwise XOR. Same priority as `&`, `|`.
- `^^` Logical XOR (non-bitwise). Same priority as `&&`, `||`.
- `!&` Logical NAND (non-bitwise). Same priority as `&&`, `||`.
- `!|` Logical NOR (non-bitwise). Same priority as `&&`, `||`.

### Ternary Operator
- `?～#` Regular ternary operator - Priority is lower than the other operators above (judgment and results are processed first)
	Format (Numeric): <Destination Variable> = <Condition> ? <Value if true> # <Value if false>
	Format (String): <Destination Variable> = \@<Condition> ? <Value if true> # <Value if false>\@

	It is processed the same way as

			IF <Condition>
				<Destination Variable> = <Value if true>
			ELSE
				<Destination Variable> = <Value if false>
			ENDIF

	Numeric ternary operators can be used in normal calculations by putting them in (), and string ternary operators can be used directly in PRINTFORM instructions.
	However, the `#` cannot be omitted in the ternary operator in the format of `\@～\@`.

### Assignment Operator
- `'=` Operator for assigning to string-type variables using a string expression. [See here for details](expression.md#form_2)

### Increment / Decrement
- `++` Increment
- `--` Decrement
Use these instead of assignment statements. They cannot be combined with other operators.

## Provisional Operator Priority Table

| Category             | Priority | Compound Assignment | Symbols                         |
| :------------------- | :------- | :------------------ | :------------------------------ |
| Negation operators   | High     | ×                   | `~`, `!`                        |
| Arithmetic operators | ↑        | ○                   | `*`, `/`, `%`                   |
|                      |          | ○                   | `+`, `-`                        |
| Bit shift operators  |          | ○                   | `<<`, `>>`                      |
| Comparison operators |          | ×                   | `<`, `>`, `<=`, `>=`            |
|                      |          | ×                   | `==`, `!=`                      |
| Logical operators    |          | ○                   | `&`, `|`, `^`                   |
|                      | ↓        | ×                   | `&&`, `!&`, `||`, `!|`, `^^`    |
| Ternary operator     | Low      | ×                   | `～?…#＿`                       |

## Additional Operations
- `==` Comparison between strings. You cannot compare a number and a string.
- `!=` Comparison between strings.
- `<` Comparison between strings. Comparison is done from the beginning and determined when a different character is found.
- `>` Comparison between strings.
- `<=` Comparison between strings.
- `>=` Comparison between strings.
- `+` Concatenation of strings. You cannot add or concatenate a number and a string.
- `*` Multiplication of a string and an integer. You cannot multiply a string and a string.

	**Example**

		STR:0 = % "あ" * 10 %
		PRINTFORML STR:0 = "%STR:0%"
		WAIT

	**Result**

		STR:0 = "ああああああああああ"

## Short-Circuit Evaluation of Logical Operators
Short-circuit evaluation means, for example, in the expression `(X && Y)`, when `X` is `0`, `Y` is not evaluated because the result will clearly be `0` regardless of its value.
Many languages, including KiriKiri, use short-circuit evaluation for logical operators.
This evaluation method allows you to write code like the following:

	IF (ASSI >= 0) && (NO:ASSI == 1)
		～～～
	ELSE
		～～～
	ENDIF

If `ASSI` is 0 or less, the overall result is `0` regardless of the result of `(NO:ASSI == 1)`, so `NO:ASSI` is not referenced. Therefore, no error occurs.
The evaluation order is left term first, right term second.

	IF (NO:ASSI == 1) && (ASSI >= 0)

If you write it this way, it tries to calculate `(NO:ASSI == 1)` first, so an error occurs when `ASSI < 0`.


---

# README.en
---

- Information for end users
  - [How to Use](usage.en.md)
  - [Config Settings](config.en.md)
  - [Shortcut Keys](shortcut.en.md)

- eramaker basic Information for Developers
	- [Glossary](glossary.en.md)
	- [Debug Commands](debugCom.en.md)
	- [Debug Mode](debug.en.md)
	- [_replace.csv](replace.en.md)
	- [Forcing a Config item](config_files.en.md)
	- [Flowchart](system_flow.en.md)
	- [Differences with eramaker](differences_of_Emuera_and_eramaker.en.md)
	- Extended syntax added in Emuera
		- [General](expression.en.md)
		- [Operations](operand.en.md)
		- [Constants / Variables](variables.en.md)
		- [User-Defined Variables](./user_defined_variables.en.md)
		- [List of Instructions / In-expression functions](../Reference/README.en.md)
		- [Function / Preprocessor](./function.en.md)
		- [User-defined in-expression functions](./user_defined_in_expression_function.en.md)
		- [Header Files（ERH）](./ERH.en.md)
		- [HTML_PRINT related](./HTML_PRINT.en.md)
		- [Resource file](./resources.en.md)


---

# replace.en
---
# _replace.csv

By placing a file named `_replace.csv` in the csv folder, you can configure display-related settings.

## Money Unit
The unit appended to item prices displayed by `PRINT_SHOPITEM`.  
The default is `$`. Full-width characters or strings containing multiple characters are also acceptable.

## Unit Position
Whether the unit appended to item prices displayed by `PRINT_SHOPITEM` comes before or after the number.  
Specify `前` (before) or `後` (after). The default is `後` (after).

## Startup Simple Display
The string displayed instead when the `Display report on load` option in config is OFF.  
The default is `Now Loading...`.

## Shop Item Count
In eramaker's standard SHOP processing, `PRINT_SHOPITEM` displays all `ITEMNAME(0-999)` where `ITEMSALES` is not 0.  
On the other hand, purchase processing and `@EVENTBUY` processing are only performed when `0-99` is entered, and `@USERSHOP` is called for other values.

Emuera basically reproduces this behavior as well.  
Changing the `Shop Item Count` changes the range of items for which purchase processing is called.  
For example, if you set the shop item count to `1000`, purchase processing is performed when `0-999` is entered, and `@USERSHOP` is called for negative values or values of `1000` or higher.

Note that if a value from 0 to (shop item count - 1) is entered, `@USERSHOP` will not be called regardless of whether the purchase succeeds or not.  
For example, if the shop item count is 1000, `[200] - Save` and `[300] - Load` will be treated as attempts to purchase items 200 and 300, and `@USERSHOP` will not be called.

To increase (or decrease) the items displayed by `PRINT_SHOPITEM`, change the array size of `ITEMNAME` and `ITEMSALES` in `VariableSize.csv`.  
The smaller of the `ITEMNAME` and `ITEMSALES` array sizes will be the range of items displayed by `PRINT_SHOPITEM`.

## DRAWLINE Character
The character displayed by the [`DRAWLINE`](../Reference/DRAWLINE.md) command.  
The default is `-`.

## BAR Character 1
## BAR Character 2
Specifies the characters used in the [`BAR`](../Reference/BAR.md) or [`BARL`](../Reference/BAR.md) commands.  
The defaults are `*` for `BAR Character 1` and `.` for `BAR Character 2`.  
In this case, it will be displayed like `[****....]`.  
Full-width characters or strings consisting of multiple characters can also be specified, but consider display alignment.  
Also, if numbers are specified, Emuera will treat `[88881111]` etc. as clickable buttons, resulting in unnatural behavior.

## System Menu 0
## System Menu 1
The strings used for the initially displayed choices on the title screen.  
The defaults are `最初からはじめる` (Start from beginning) and `ロードしてはじめる` (Start from load) respectively, and are displayed as:

	[0] 最初からはじめる
	[1] ロードしてはじめる

If you define `@SYSTEM_TITLE` to use your own title screen, the strings specified here will not be used.  
Create the display processing inside `@SYSTEM_TITLE`.

## COM_ABLE Default Value
Specifies the value when `@COM_ABLE{X}` is not found during `TRAIN`.  
The default is 1, meaning COM is considered executable if the corresponding `@COM_ABLE` is not defined.  
If you set this value to 0, COM will be considered not executable if `@COM_ABLE` is not defined.

## Stain Initial Value
The value assigned when `STAIN` is initialized.  
You can specify values for `STAIN:1` and beyond by separating them with `/`.  
The default is `0, 0, 2, 1, 8`.

## Time Out Display
The string displayed when time runs out in timed input commands like `TINPUT`.  
The default is `時間切れ` (Time out).

## EXPLV Initial Value
Specifies the initial value of `EXPLV`.  
You can specify values for `EXPLV:1` and beyond by separating them with `/`.  
The default is `0, 1, 4, 20, 50, 200`.

## PALAMLV Initial Value
Specifies the initial value of `PALAMLV`.  
You can specify values for `PALAMLV:1` and beyond by separating them with `/`.  
The default is `0, 100, 500, 3000, 10000, 30000, 60000, 100000, 150000, 250000`.

## PBAND Initial Value
Specifies the initial value of `PBAND:0`.  
The default is `4`.

## RELATION Initial Value
Specifies the initial value of `RELATION` when not specified in `Chara**.csv`.  
The default is `0`.


---

# resources.en
---
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


---

# shortcut.en
---
# Shortcut keys  
In Emuera, you can perform some operations with shortcut keys.  

## Ctrl + B  
Minimize the Emuera window.  

## Ctrl + C, Ctrl + Insert  
Open the clipboard dialog.  
This operation is valid only when no character is selected.  
If any character is selected, just copy that character.  

## Ctrl + V, Shift + Insert  
Paste the copied characters.  

## Ctrl + D  
Open the debug window. This is valid only when started in debug mode.  

## Ctrl + R  
Updates information in the debug window. Focus does not shift.  
This is valid only when started in debug mode.  

## Ctrl + 0-9  
Switches the macro group to groups 0 to 9.  

## Shift + F1-F12  
Assigns the current string to F1 to F12 as a macro.  

## F1-F12  
Call the macro assigned to each key.  

## Esc  
Press during a macro execution to interrupt the macro.  


---

# system_flow.en
---
# Flowchart  
## TITLE  
After starting up and reading the ERB, and after running BEGIN TITLE.  

![](../assets/images/title.gif)  

If @SYSTEM_TITLE is defined, call it and do nothing else.  
If BEGIN or LOADDATA instruction is not executed in @SYSTEM_TITLE and RETURN is executed, the next process is not executed; it ends in an error.  

If @SYSTEM_TITLE is not defined, the standard title processing is done.  
Characters such as "![0] Start from the beginning" on the standard title screen can be changed.  
See _replace.csv for details.  

If "![0] Start from the beginning" is selected, the first step is to initialize the data.  
More specifically, the initial values of STR and PRINTLV (the same as the RESETDATA instruction), ADDCHARA 0, etc.  
Next, BEGIN FIRST is executed to transition to FIRST.  

If @TITLE_LOADGAME is defined, it is called when "![1] Load and start" is selected.  
If not defined, the standard load screen is displayed.  
It is slightly different from the screen called from LOADGAME.  

## FIRST  
When "![0] Start from the beginning" is selected in the title screen and after BEGIN FIRST is executed.  
If the BEGIN instruction is not executed in @EVENTFIRST, the next process is not executed; it ends in an error.  

![](../assets/images/first.gif)  

## SHOP  
After loading and running the BEGIN SHOP.  
If it is loaded, @EVENTSHOP is not processed.  

![](../assets/images/shop.gif)  

Request input after the @SHOW_SHOP call.  
If a value between 0 and 99 is received, the purchase process is performed, and if any other value is entered, @USERSHOP is called.  
This range can be changed by _replace.csv. See [replace _replace.csv] for more information.  
The range of items displayed by the PRINT_ITEMSHOP instruction is limited to the number of ITEMNAME or ITEMSALES elements, whichever is smaller (the standard is 1000).  

When the purchase process is called, it judges whether the corresponding ITEMSALES is non-zero or whether MONEY is greater than ITEMPRICE.  
If the purchase decision fails, it is requested to enter it again.  
In eramaker, if the purchase failed, It would start over from @SHOW_SHOP.  

If the purchase decision is successful, assign the ITEM number to the BOUGHT variable, increase ITEM:BOUGHT by 1, and reduce MONEY by ITEMPRICE:BOUGHT.  
Call @EVENTBUY and return to @SHOW_SHOP.  

Unless a BEGIN instruction is issued somewhere, it will never leave the SHOP.  

## TRAIN  
After BEGIN TRAIN is executed.  

![](../assets/images/train.gif)  

First, some of the variables are initialized.  
Specifically, assign 0 to ASSIPLAY:0, 0 to PREVCOM:0, and -1 to NEXTCOM:0.  
In addition, all TFLAGs are set to 0 and all characters' GOTJUEL, TEQUIP, EX, PALAM, and SOURCE are set to 0.  
Finally, assign 2 to STAIN:2, 1 to STAIN:3, 8 to STAIN:4, and 0 to all others.  

These values will remain in the save data when you save with SHOP, because they are not initialized when you exit TRAIN.  
You can save space in your save data by assigning 0 to your character's GOTJUEL, TEQUIP, EX, PALAM, etc. in @SAVEINFO.  
The behavior when a non-negative value is assigned to NEXTCOM is not explained here because it is a serious problem.  
Emuera's NEXTCOM was implemented to reproduce the behavior of the old code including the aforementioned defects, and no new use is expected.  
For the CALLTRAIN instruction, see the extension instructions.  

Display executable TRAIN commands after a @SHOW_STATUS call.  
Look up @COM_ABLExx for which TRAINNAMEs are defined.  
The search range (MAX_TRAIN in the figure) is up to the range of TRAINNAME specified in VariableSize.csv in Emuera, and up to 2147483647 in eramaker.  
If @COM_ABLExx is not defined or returns a non-zero value, TRAINNAME is displayed because it is executable.  
If @COM_ABLExx returns 0, TRAINNAME is not displayed because it cannot be executed.  
It remembers which commands are executable or not at this time. (It doesn't call @COM_ABLExx again at runtime.)  

When TRAINNAME is displayed, call @SHOW_USERCOM.  
After @SHOW_USERCOM, initialize "UP", "DOWN" and "LOSEBASE" before inputting.  
It then asks for input.  

The input result is checked against the result of @COM_ABLExx, and if it is an executable command, the corresponding @COMxx is called.  
First, assign the TRAIN command number to the SELECTCOM variable and set all NOWEX of all characters to 0.  
Next, call @EVENTCOM, followed by the corresponding @COM.  
If @COM returns a non-zero value, call @SOURCE_CHECK and @EVENTCOMEND and return to @SHOW_STATUS.  
After @SOURCE_CHECK ends, set all SOURCE elements of all characters to 0 before calling @EVENTCOMEND.  
After @SOURCE_CHECK ends, if @EVENTCOMEND does not exist or no WAIT instruction is performed in @EVENTCOMEND, WAIT is generated just before @SHOW_STATUS.  
If @COM returns 0, it returns to @SHOW_STATUS.  
When the UPCHECK instruction is executed, the UP and DOWN values are added and subtracted to the TARGET's PALAM, and all of the UP and DOWN values are assigned to 0.  
If the input result is not an executable command, it calls @USERCOM and returns to @SHOW_STATUS.  

Unless a BEGIN instruction is issued somewhere, it will never leave TRAIN.  

## ABLUP  
After executing BEGIN ABLUP.  

![](../assets/images/ablup.gif)  

Call @SHOW_JUEL and @SHOW_ABLUP_SELECT to request input.  

If the input is within the range of 0 to 99, find the corresponding @ABLUP.  
If the corresponding @ABLUP is defined, it calls @ABLUP and returns to @SHOW_JUEL.  
If it is not defined, it will ask for input again.  
In eramaker, if it is not defined, It would start over from @SHOW_JUEL.  

If the input is out of the range of 0 to 99, call @USERABLUP and return to @SHOW_JUEL.  
As of Emuera 1.705, there is no way to change this range.  

Unless a BEGIN instruction is made somewhere, it will never leave ABLUP.  

## AFTERTRAIN  
After BEGIN AFTERTRAIN is executed.  
If the BEGIN instruction is not executed in @EVENTEND, the next process is not executed; it ends in an error.  

![](../assets/images/aftertrain.gif)  

## TURNEND  
After BEGIN TURNEND is executed.  
If the BEGIN instruction is not executed in @EVENTTURNEND, the next process is not executed; it ends in an error.  

![](../assets/images/turnend.gif)  

## LOADGAME  
When the LOADGAME instruction is executed.  
The BEGIN instruction contains the RETURN instruction and never executes the statements below BEGIN, but the LOADDATA and SAVEDATA instructions return to the original location just like the CALL instruction.  
However, when LOAD is executed, it forgets the original position and transitions to LOADDATAEND.  

![](../assets/images/loadgame.gif)  

## SAVEGAME  
When the SAVEGAME instruction is executed.  
The timing of calling @SAVEINFO is just before the writing is actually done.  

![](../assets/images/savegame.gif)  

## LOADDATAEND  
After LOAD is executed with LOADGAME and after the LOADDATA instruction is executed.  
When LOAD is executed, all the states of the calling function and so on are cleared.  

![](../assets/images/loaddataend1821.gif)

In eramaker, it doesn't do anything here and goes to @SHOW_SHOP.  
In Emuera, if @SYSTEM_LOADEND is defined, it executes @SYSTEM_LOADEND.  
If the BEGIN instruction is executed by the end of @SYSTEM_LOADEND, it transitions to there.  
Otherwise, if @EVENTLOAD is defined, @EVENTLOAD is executed.  

If the BEGIN instruction is executed by the end of @EVENTLOAD, it transitions to there.  
If the BEGIN instruction is not executed, it transitions to @SHOW_SHOP as usual.  


---

# usage.en
---
# Usage  
## Operating Environment  
.NET Framework 2.0 environment is required.  
Only Windows XP and Vista have been tested.  

If you get the error "Application could not be initialized properly" and cannot start, .NET Framework 2.0 is not installed.  
Download and install the .NET Framework 2.0 runtime from Microsoft's site.  

## Usage  
Please put EmueraXXX.exe in the same folder as eramaker.exe and start it.  
(XXX is the number that represents the version. Also, depending on your environment, .exe may not be displayed)  
If it does not start, please read the "System Requirements" section.  
It generates emuera.config immediately after startup and emuera.log when an error occurs.  

The basic operation is almost the same as eramaker.exe, but it is possible to operate with the mouse.  
Point and click on the choices (the numbers surrounded by []) with the mouse.  
You can skip to the next choice by using escape key or right-clicking, and if you keep right-clicking to select a choice, you can skip to the next choice as soon as you select it.  
In addition, you can use Ctrl+V to paste the contents of the clipboard, or (like eramaker.exe) press the up and down keys to recall the previous input.  

!You can also run the file that you have converted in EraMakerEx as it is.  
However, this feature is disabled by default, so if you need it, please check the "Use _Rename.csv" checkbox in the help settings.  

## Macros  
Emuera has a simple macro function.  
For example, typing "\e" will skip to the next option, just as if you were using the Esc key or right-clicking.  
If you type "\n", it will separate the input and become the next input.  
For example, if you enter "0\e\n1\e\n", you will enter 0 and skip to the next option, and 1 and skip to the next option.  
Also, (~~)*n repeats the input in parentheses n times.  
"(0\e\n)*3" is the same thing as "0\e\n0\e\n0\e\n".  
You can stop the macro execution by pressing the Esc key while it is running.  

The macro you create can be saved in association with the F1-F12 key.  
Press the F1 to F12 keys while holding down the Shift key to save the current input content in the F1 to F12 keys.  
Then press F1-F12 keys to input the macro you saved.  
The saved macro will be stored in macro.txt.  
(The configuration option "Use keyboard macros" must be enabled.)  

In addition, you can switch between macro groups by holding down the Ctrl key and pressing the numeric 0-9 keys.  
(Group 0 is selected by default when starting Emuera.)  
F1 to F12 of the Group 0 and F1 to F12 of the Group 1 can store different macros, so more macros can be stored.  
You can also change the group from the contextual menu that comes up when you right-click on the input box  

You can also edit macro.txt directly in a text editor  
To the right of the colon of "マクロキーF○:" (Macro key F○), write the macro you want to input when you press the F○ key.  
"G×:マクロキーF○:" (G×:Macro key F○) is a macro for selecting group X.  
If you change the message to the right of the column "グループ×:マクログループ×に設定" (Group x: Set to macro group x)",  
you can also change the text displayed when you switch to Group X.  

## Menu  
To use this feature, the "Use menu" item in the configuration must be enabled.  
It is enabled by default.  

## File  
### Restart  
Restarts Emuera  
Keep in mind that if you don't save, you will lose information about the running game.  

### Save Log  
Saves the past log to a file with a name.  
The maximum number of rows saved is the same as the number of rows in the history log.  

### Return to Title Screen  
Back to the title.  
Keep in mind that if you don't save, you will lose information about the running game.  

### Reload Code  
Reread the .erb file with the game information intact.  
For functions that have already been called, the previous code will be executed.  
The previous code remains in the memory until the called function runs out, so it may run out of memory if it is used consecutively.  

### Exit  
Quit Emuera  

## Help  
### Settings  
Configure the settings. See config for configuration details.  


---

# user_defined_in_expression_function.en
---
# User-Defined Expression Functions

You can also call functions defined with `@~~` in expressions as "Expression Functions".  
For built-in functions among "Expression Functions", see [Expression Functions](../Reference/README.md).

## Format

Functions to be called must have the `#FUNCTION` or `#FUNCTIONS` flag and end with `RETURNF`.

Adding `#FUNCTION` makes it recognized as a function that returns a number.  
Adding `#FUNCTIONS` makes it recognized as a function that returns a string.  
Functions with `#FUNCTION(S)` cannot end with a normal [`RETURN`](../Reference/RETURN.md). Instead, they end with `RETURNF`.  
`RETURNF` takes a numeric expression or string expression. This must match the type indicated by `#FUNCTION(S)`.  
If the `RETURNF` argument is omitted or the end of the function is reached without `RETURNF`, it returns `0` or an empty string.

	X = GET_CFLAG(TARGET, Y)
	STR = %GET_NAME(TARGET)%

	@GET_CFLAG(ARG:0, ARG:1)
	#FUNCTION
		SIF ARG:0 <= 0 || ARG:0 >= CHARANUM
			RETURNF 0
		RETURNF CFLAG:(ARG:0):(ARG:1)

	@GET_NAME(ARG:0)
	#FUNCTIONS
		SIF ARG:0 <= 0 || ARG:0 >= CHARANUM
			RETURNF ""
		RETURNF NAME:(ARG:0)

Note: Although arguments in function definitions are enclosed in `()`, this is not required syntax for definitions.  
When calling expression functions, you must use the syntax with `()`.  
As with normal functions, you can also separate the function name and arguments with commas.  
The following two lines mean the same thing:

	@GET_CFLAG(ARG:0, ARG:1)
	@GET_CFLAG, ARG, ARG:1

Also, you can set default values for arguments.  
For the syntax regarding default values, see [Argument Specification in User-Defined Functions](./function.md#_2).

## Restrictions

### Cannot be Called from CALL
Functions with the `FUNCTION(S)` flag cannot be called normally with [`CALL`](../Reference/CALL.md) etc.  
They can only be called within expressions.

		;Error
		CALL GET_CFLAG, X, Y
	@GET_CFLAG(ARG:0, ARG:1)
	#FUNCTION
		SIF ARG:0 <= 0 || ARG:0 >= CHARANUM
			RETURNF 0
		RETURNF CFLAG:(ARG:0):(ARG:1)

They can be called using the dedicated commands `CALLF` and `CALLFORMF` for calling `#FUNCTION(S)`.

### Some Commands Cannot be Used
Inside functions with the `FUNCTION(S)` flag, commands that involve input such as [`WAIT`](../Reference/WAIT.md), and commands that involve function calls such as `CALL`, cannot be used.  
Using them will cause an error.

The `CALL` command cannot be used, but functions with the `FUNCTION(S)` flag can be called within expressions.  
Also, calling `#FUNCTION(S)` with the `CALLF` and `CALLFORMF` commands is possible.

### No Overloading
You cannot distinguish between multiple `#FUNCTION(S)` functions by differences in the number or type of arguments.  
Only one function with the same name can be defined; if multiple functions with the same name are defined, only the first defined function is valid.

### Overriding Built-in Functions
If you define a function with the same name as a built-in function, that built-in function can no longer be called.  
For example, if you define `@ABS`, you can no longer call the original ABS.  
Emuera displays a warning at startup when a built-in function is overridden.  
Since overriding a built-in function may cause unintended behavior, function overriding can be prohibited by configuration.  
There is also a config option to suppress warnings for intentional overriding (not recommended).

## Notes

You should not change variables other than local variables inside functions with the `FUNCTION(S)` flag.  
Functions that change variables other than local variables (functions with side effects) may behave differently due to short-circuit evaluation and expression evaluation order described below.  
Also, they may behave unexpectedly due to unexpected calls from debug commands or the debug variable watch window.

### Call Omission by Short-Circuit Evaluation

Even if there is a function in an expression, it may not be called due to short-circuit evaluation.

For example, the following script calls `GET_ASSI_CFLAG` inside the [`IF`](../Reference/IF.md) statement, and changes `ASSI` inside `GET_ASSI_CFLAG`.

		IF X || GET_ASSI_CFLAG(0)
			Y = CFLAG:ASSI:2
		ENDIF
	@GET_ASSI_CFLAG(ARG:0)
	#FUNCTION
		SIF ASSI < 0
			ASSI = 0
		RETURNF CFLAG:ASSI:(ARG:0)

At first glance, it seems that `Y = CFLAG:ASSI:2` would never have `ASSI < 0`.  
However, if `X` is non-zero, `GET_ASSI_CFLAG` is not executed due to short-circuit evaluation, so it may error when trying to evaluate `CFLAG:ASSI:2` with `ASSI < 0`.

### Results Change Depending on Expression Evaluation Order

The evaluation order of variables and functions in expressions is undefined.  
Functions with side effects may depend on the order in which functions in an expression are called.  
Do not write such code.  
The call order will likely be the same if the Emuera version is the same, but may change in the future.  
In the script below, `TARGET` is being changed inside `@ADDCHARA_CFLAG`.

		X = CFLAG:TARGET:10 + ADDCHARA_CFLAG(0)
	@ADDCHARA_CFLAG(ARG)
	#FUNCTION
		ADDCHARA ARG
		TARGET = CHARANUM -1
		RETURNF CFLAG:TARGET:2

Depending on whether `CFLAG:TARGET:10` is evaluated before or after `@ADDCHARA_CFLAG`, the variable referred to by `CFLAG:TARGET:10` changes.  
Therefore, this script depends on evaluation order.  
You should not use [`ADDCHARA`](../Reference/ADDCHARA.md) or assign to `TARGET` inside functions with the `#FUNCTION(S)` flag.

### May be Called by Debug Features

Functions with the `#FUNCTION(S)` flag may be dynamically called not only from scripts in `*.ERB` files, but also from debug commands and the debug variable watch window.  
In particular, the variable watch frequently tries to update values, calling that function with each update.  
Functions with side effects may malfunction due to such calls.


---

# user_defined_variables.en
---
# User-defined variables  
You can define your favorite variables using #DIM and #DIMS.  
Variables defined within a function become private variables that can only be used within that function,  
Variables defined in the header file (ERH) are global variables that can be referenced from all places in the ERB.  

## Format (for private variables)  
Write `#DIM(S) <Variable Name>, <Number of Elements> {, <Number of Elements> {, <Number of Elements>}}` under the declaration of the function for which you want to define the variable.  
`<Variable Name>` is an arbitrary character string consisting of only "_" as the symbol, not the first character, like the function name.  
`<Number of Elements>` is any integer or constant expression within the range of 1 to 1000000. If omitted, it will be 1.  
The dimension of the defined variable changes depending on how many `<Number of Elements>` are given. The maximum is three-dimensional, and no more than four-dimensional variables can be defined.  
Multiple private variables by #DIM(S) can be defined in a single function.  

This makes the variable named by `<Variable Name>` available to the function.  
Variables can be assigned with the number of elements specified by `<Number of Elements>`, and are not saved. The initial value is 0 or an empty string.  
If it is defined by #DIM, it will be an integer variable, and if it is defined by #DIMS, it will be a string variable.  
The variable defined by #DIM(S) can be specified as an argument of the function. You can also set an initial value.  

	@FIND_CSTR (KEY, VALUE)  
	#FUNCTION  
	#DIM LCOUNT  
	#DIM KEY  
	#DIMS VALUE  
	SIF KEY < 0 || KEY >= VARSIZE("CSTR")  
		RETURNF -1  
	FOR LCOUNT, 0, CHARANUM  
		SIF LCOUNT == MASTER  
			CONTINUE  
		SIF CSTR:LCOUNT:KEY == VALUE  
			RETURNF LCOUNT  
	NEXT  

As in the script above, naming variables according to the application and setting the appropriate number of elements may improve readability due to non-contiguous use of LOCAL.  

## Initial value setting  
When declaring a one-dimensional array variable, you can define an initial value.  
The number of elements in the array that defines the initial value can be omitted, in which case the number of initial values ​​automatically becomes the number of elements in the array.  
If you do not omit the number of elements in the array, that number will be the number of elements in the array.  
If the number of elements is not omitted and the number of initial values ​​is larger than the number of elements, an error will occur.  

	;HOGE element number is 3 because element number is omitted  
	#DIM HOGE = 1,2,3  

	;PUGE element number is 100 because element number is not omitted  
	#DIM PUGE,100 = 4,5,6  

	;Error (the number of initial values ​​is larger than the specified number of elements)  
	#DIM HIGE,1 = 7,8,9  

	;Character string variable also possible (specified by character string expression)  
	#DIMS SHOGE = "A", "B", "C"  

Note that initial values ​​cannot be defined for multidimensional arrays.  

## Dynamic variables  
If you put DYNAMIC before the variable name like `#DIM(S) DYNAMIC <variable name>, <number of elements>`, the defined variable will be allocated dynamically.  
Specifically, it is allocated when the function is called, and the variable and its value disappear when the function ends.  
(Because the RESTART instruction is an "instruction to return to the beginning of the function", even dynamically allocated variables are not reset.)  
Even if you call (recursive) yourself in a function, variables are secured for the number of recursions, so the behavior of recursive processing is stable.  
However, the operation is slower than without DYNAMIC (static variable).  

## Constants  
When defining a one-dimensional array variable, enter CONST before the variable name to define a one-dimensional array constant.  
As with the default values, only one-dimensional array variables can be defined.  
A constant declaration must have an initial value and cannot be changed by assignment in the middle.  
CONST, by its very nature, cannot be used with the GLOBAL, SAVEDATA, REF, and DYNAMIC keywords.  
You can also specify the number of elements in the array without omitting it, but an error will occur if the number of elements does not match the number of initial values.  

	;Definition of one-dimensional constant array  
	#DIM CONST HOGE = 1,2,3  

	;Error (the number of initial values ​​and the number of elements do not match)  
	#DIM CONST PUGE,100 = 4,5,6  

	;Character string variable also possible (specified by character string expression)  
	#DIMS CONST SHOGE = "A", "B", "C"  

## Reference Type Variables  
You can define a reference variable by using the REF keyword before the variable name.  
Declare integer type 1 to 3 dimensional arrays and character string type 1 to 3 dimensional arrays as follows.  

	#DIM REF HOGE1DIM,0  
	#DIM REF HOGE2DIM,0,0  
	#DIM REF HOGE3DIM,0,0,0  
	#DIMS REF PUGE1DIM,0  
	#DIMS REF PUGE2DIM,0,0  
	#DIMS REF PUGE3DIM,0,0,0  

If there are commas, 0 can be omitted. Commas can also be omitted for one-dimensional arrays.  
Reference-type variables have no substance, and manipulating reference-type variables means that variables passed by REF instruction (currently unavailable in ver1.815) or by reference are manipulated instead.  
For details on passing by reference, see [../exfunc|Passing by Function-Argument Reference].  

## Format (for global variables)  
When #DIM(S) is described in the [../ERH|Header File (ERH)], unlike private variables defined in ERB,  
This is a global variable that can be referenced from all places in the ERB.  
Unlike private variables, there is no distinction between DYNAMIC and STATIC, and reference type variables using REF cannot be defined, but constants using CONST can be defined in the same way.  
It is possible to define variables, global variables, and character variables that are saved as functions that DIM does not have in functions.  
For details, see the [../ERH|Header File (ERH)].  

## Restrictions  
### Cannot use the same name as the instruction  
You cannot define a variable with the same name as an instruction as follows:  

	;Error  
	#DIM PRINTFORM  
	#DIM SELECTCASE  
	#DIM CALL  
	#DIM RETURN  
	#DIM GOTO  
	#DIM SQRT  
	#DIM DATAFORM  
	#DIM NOSKIP  
	#DIM FUNC  
	#DIM ENDFUNC  

Variables with the same names as function names and preprocessors can be defined, but are not recommended.  

	;Not recommended  
	#DIM EVENTFIRST  
	#DIM COMF32  
	#DIM COMABLE15  
	#DIM SHOW_ABLUP_SELECT  
	#DIM DIM  
	#DIM PRI  
	#DIM ONLY  
	#DIM SKIPSTART  

### Interference from outside the function  
Unlike LOCAL with LOCAL@HOGE, there is no way to reference or assign a private variable of another function.  


---

# variables.en
---
# Variable Specifications and List
Content has been supplemented to match EmueraEM+EE specifications

## Constants (Literals)
### Constant Notation
In Emuera, you can use the constant notation available in Kirikiri, except for octal notation.
For example, all of the following lines have the same meaning:

	X = 32
	X = 0b100000
	X = 0x20
	X = 1p5

From top to bottom, they are: normal `decimal`, `binary`, `hexadecimal`, and `1×2 to the power of 5`.
The notation like `1p5` is useful when combined with bit operators to get/set individual bits.
For example, the following conditional expression is true when bit 0 or bit 3 of `A` is set:

	IF (A & 1p0) || (A & 1p3)

Also, using `e` instead of `p` represents `n×10 to the power of m`.
For example, `13e3` equals `13000`.
The above are merely constant notations and cannot use expressions.
The following notation would result in an error:

	X = 13e(A + 1)

Regarding `octal notation`, we have not adopted it due to compatibility issues with eramaker.
`012` is interpreted as `12`, not `10`.

## Variables
### Variable Size Specification
In Emuera, you can specify the number of elements for existing variables by placing a file named `VariableSize.csv` in the csv folder.
Also, by specifying `-1` for the number of elements, you can prohibit the use of that variable in ERB.

Using or referencing a prohibited variable in ERB will result in an error.
If the system requires a prohibited variable, the assignment is ignored and the value is always treated as `-1`.
(This occurs when `MONEY` or `NEXTCOM` are prohibited.)
Also, if `COUNT` is set as a prohibited variable, `REPEAT` also becomes unusable and causes an error termination at runtime (EM+EE)

### Local Variables
#### LOCAL
#### LOCALS
**※This variable is `obsolete`. Please consider using `#DIM` and `#DIMS` instead.**
**See [User-Defined Variables](user_defined_variables.md) for details.**

Local variables.
`LOCAL` is integer, `LOCALS` is string.
The default size is 1000 for `LOCAL` and 100 for `LOCALS`.
Also, you can change the number of elements individually for each function using `#LOCALSIZE <number of elements>` and `#LOCALSSIZE <number of elements>`. (However, the value must be a positive integer)
They are not saved.

	@EVENTFIRST
		LOCAL:10 = 123
		CALL FUNC001
		PRINTV LOCAL:10
		WAIT
	@FUNC001
		LOCAL:10 = 567
		RETURN

The result of [`PRINTV`](../Reference/PRINT.md) in the above code will be `123`.
Even though `LOCAL:10` is changed inside `@FUNC001`, the `LOCAL` in `@EVENTFIRST` is not affected.
Unlike local variables in many other languages, they are not initialized when a function is called.

Internally, it creates a variable named `LOCAL@function name`.
Therefore, they are shared when there are multiple functions with the same name, such as event functions.
Also, when called recursively, they use the same variable.
You can also call variables for other functions like `LOCAL@EVENTFIRST:10 = 567`, but this is not recommended (it's for debugging).
Note that an error occurs if the called function name contains operators or other special characters.

#### `ARG`
#### `ARGS`
Local variables.
`ARG` is integer, `ARGS` is string.
The default size is 1000 for `ARG` and 100 for `ARGS`, which can be changed in `VariableSize.csv`.
Also, it automatically secures enough elements to use without problems only for the parts defined as function arguments. (It will not be less than the number specified in VariableSize.csv)

	@FUNC002, ARG:0, ARG:1, ARG,1100
		LOCAL = ARG:0 * ARG:1 / 100
		RETURN LOCAL

In this case, the number of elements of `ARG` is normally 1000, but in `@FUNC002`, the number of elements of `ARG` becomes 1101 (from 0 to 1100).
Since this is intended to be used for specifying arguments in functions, using it for other purposes may reduce readability.

#### (User-Defined Private Variables)
Variables defined using `#DIM` or `#DIMS` within a specific function become private variables and can be treated as local variables.
See [User-Defined Variables](user_defined_variables.md) for details.

### Variables Shared Between Save Data
#### `GLOBAL`
#### `GLOBALS`
Variables that can be shared between different save data.
`GLOBAL` is integer, `GLOBALS` is string.
The default size is 1000 for `GLOBAL` and 100 for `GLOBALS`, which can be changed in `VariableSize.csv`.
They are not saved/loaded together with other data.
To save global variables, use the `SAVEGLOBAL` command.
When `SAVEGLOBAL` is performed, `GLOBAL` and `GLOBALS` are saved to `global.sav`.
If `global.sav` already exists, it will be overwritten.
You can read `GLOBAL` and `GLOBALS` from `global.sav` using the `LOADGLOBAL` command.
It is recommended to perform `LOADGLOBAL` at the timing of `@EVENTFIRST` and `@EVENTLOAD`.
Through `GLOBAL` and `GLOBALS`, you can share data between different save data.

#### (User-Defined Global Variables)
Variables defined using `#DIM GLOBAL` or `#DIMS GLOBAL` in ERH become global variables.
Also, by using `#DIM SAVEDATA GLOBAL`, it becomes a saveable global variable.
See [Header Files (ERH)](ERH.md) for details.

### Character Variables
#### `NICKNAME`
#### `MASTERNAME`
Saveable string variables similar to `NAME` and `CALLNAME`.
In `chara*.csv`, specify as `NICKNAME`, `MASTERNAME`, or `あだ名` (nickname), `主人の呼び方` (master's call name).

#### `CSTR`
Saveable string array variable.
The string version of `CFLAG`.
In `chara*.csv`, specify as `CSTR`.

#### `CUP`
#### `CDOWN`
#### `DOWNBASE`
#### `TCVAR`
Numeric array variables.
Each is intended to be used as the character variable version of `UP`, `DOWN`, `LOSEBASE`, and `TFLAG` respectively.
Therefore, the initialization timing and save/non-save status are the same as these variables.
However, use the `CUPCHECK` command instead of the [`UPCHECK`](../Reference/UPCHECK.md) command for `CUP` and `CDOWN`.

#### `CDFLAG`
Numeric type character three-dimensional array variable.

	CDFLAG:MASTER:0:2

The first argument is the character registration number, as with traditional character variables, but the second and third arguments are required.

#### (User-Defined Character Variables)
Variables defined using `#DIM CHARADATA` or `#DIMS CHARADATA` in ERH become character variables and can be freely used like `CFLAG` and others.
See [Header Files (ERH)](ERH.md) for details.

### CSV-Related
#### CSV Variables
Variables for referencing values defined in each csv.
The usage is the same as the relationship between `TALENTNAME` and `talent.csv`.
All are one-dimensional array variables that cannot be assigned and are not saved.
If not defined in csv, returns 0 or an empty string.

|Variable Name |File   |Type     |Elements|
|:-------------|:-------|:--------|:-------|
|ITEMPRICE     |item.csv|Integer |1000    |
|TRAINNAME     |train.csv|String |1000    |
|BASENAME      |base.csv |String |100     |
|EQUIPNAME     |equip.csv |String |100     |
|EQUIPNAME     |tequip.csv |String |100     |
|STAINNAME     |stain.csv |String |1000    |
|EXNAME        |ex.csv    |String |100    |
|SOURCENAME    |source.csv|String |100    |
|FLAGNAME      |flag.csv  |String |10000   |
|TFLAGNAME     |tflag.csv |String |1000    |
|CFLAGNAME     |cflag.csv |String |1000    |
|TCVARNAME     |tcvar.csv |String |100     |
|STRNAME       |strname.csv|String |20000  |
|TSTRNAME      |tstr.csv  |String |100     |
|CSTRNAME      |cstr.csv  |String |100     |
|SAVESTRNAME   |savestr.csv|String |100    |
|CDFLAGNAME1   |cdflag1.csv|String |1      |
|CDFLAGNAME2   |cdflag2.csv|String |1      |
|GLOBALNAME    |global.csv |String |100    |
|GLOBALSNAME   |globals.csv|String |100    |

Do not confuse the role of `cstr.csv` and `str.csv`.
`str.csv` is the file that determines the values assigned to the variable `STR`, while `cstr.csv` is the file that defines `CSTRNAME`.
The file that defines `STRNAME` is `strname.csv`. Please note the usage of `str.csv` and `strname.csv`.

#### `gamebase.csv` Variables
Variables for referencing values defined in `gamebase.csv`.
All are non-array variables that cannot be assigned and are not saved.

|Variable Name           |Keyword          |Type     |
|:-----------------------|:-----------------|:--------|
|GAMEBASE_AUTHOR        |Author           |String   |
|GAMEBASE_INFO          |Additional Info  |String   |
|GAMEBASE_YEAR          |Year             |String   |
|GAMEBASE_TITLE         |Title            |String   |
|GAMEBASE_GAMECODE      |Code             |Integer  |
|GAMEBASE_VERSION       |Version          |Integer  |
|GAMEBASE_ALLOWVERSION  |Allow Version Difference|Integer|
|GAMEBASE_DEFAULTCHARA  |Starting Characters|Integer |
|GAMEBASE_NOITEM        |No Items         |Integer  |

#### `WINDOW_TITLE`
This is the string displayed in the title bar of the Emuera window.
It is a non-array string variable. The initial value is the value set in `ウィンドウタイトル` (window title) in `gamebase.csv`.
If `ウィンドウタイトル` is not set, it is generated from `タイトル` (title) and `バージョン` (version).
If `タイトル` is also not set, it becomes `Emuera`.

#### Other CSV-Related Variables
##### `MONEYLABEL`
A variable that records the currency unit.
It is a non-array string variable that cannot be assigned and is not saved.
The initial value is the value set as `お金の単位` (currency unit) in [`_Replace.csv`](replace.md).
If `お金の単位` is not set, it becomes `$`, the same as eramaker.

##### `DRAWLINESTR`
A variable that records the string displayed when the [`DRAWLINE`](../Reference/DRAWLINE.md) command is executed.
It is a non-array string variable that cannot be assigned and is not saved.
The initial value is the value set in `DRAWLINE文字` (DRAWLINE character) in `_Replace.csv`, repeated.
Therefore, it does not contain the exact string set in `DRAWLINE文字`.
If `DRAWLINE文字` is not set, it is the same as eramaker, for example:
`------------------------------------------------------------------------------------------------------------`

### Save/Load Related
#### `LASTLOAD_*`
Variables for referencing information about the last loaded data.
They can be referenced but cannot be assigned.
All initial values are `-1` or empty strings.
They are updated when loading, and return to initial values when `RESETDATA` or "Return to Title" from the menu is executed.

##### `LASTLOAD_VERSION`
The version of the last loaded data (value defined in `gamebase.csv`)

##### `LASTLOAD_NO`
The number of the last loaded data (the number corresponding to `*` in `save*.sav`)

##### `LASTLOAD_TEXT`
Text (text added with [`PUTFORM`](../Reference/PUTFORM.md). `SAVEDATA_TEXT`)

#### `SAVEDATA_TEXT`
This is the text saved in save data and displayed in the save/load screen.
It is also the text that can be referenced with `LASTLOAD_TEXT` after loading.
Both reference and assignment are possible.
A string representing the current time is assigned when `@SAVEINFO` is called, and it is a string that can be appended to with `PUTFORM`.
You can also customize the time display by directly assigning to this string in `@SAVEINFO`.
If you don't use [`SAVEGAME`](../Reference/SAVEGAME.md) and `PUTFORM` (when using `SAVELOAD.ERB`), it won't be used.

#### (User-Defined Saveable Global-Scope Variables)
Variables defined using `#DIM SAVEDATA` or `#DIMS SAVEDATA` in ERH become saveable global-scope variables.
However, when defining a saveable multi-dimensional global-scope variable using `#DIMS SAVEDATA`, the option [`Save data in binary format`](config.md#_43) must be enabled.
See [Header Files (ERH)](ERH.md) for details.

### Multi-Dimensional Array Variables
#### `DITEMTYPE`
#### `DA` to `DE`
**※This variable is obsolete. Please consider using #DIM and #DIMS to assign appropriate names according to usage.**
**See [User-Defined](user_defined_variables.md) for details.**

Fixed-length integer two-dimensional arrays.
Called like `DITEMTYPE:1:2`. Arguments cannot be omitted.
In eramaker's double arrays, the first argument specifies the character registration number, so the array size varies depending on `CHARANUM`.
Two-dimensional arrays like `DITEMTYPE` do not change from the size specified in `VariableSize.csv`.
When used as an argument for the `VARSIZE` command, the number of elements is assigned to `RESULT:0` and `RESULT:1`.
If `DITEMTYPE,100,200` is specified in `VariableSize.csv`, you can use up to `DITEMTYPE:99:199`, and the `VARSIZE` command assigns `100` and `200` to `RESULT:0` and `RESULT:1`.

#### `TA`, `TB`
**※This variable is obsolete. Please consider using #DIM and #DIMS to assign appropriate names according to usage.**
**See [User-Defined Variables](user_defined_variables.md) for details.**

Fixed-length integer three-dimensional arrays.
Called like `TA:1:2:3`. Arguments cannot be omitted.
The default size is `100×100×100`. That is, you can use up to `TA:99:99:99`.
It is possible to change the size in `VariableSize.csv`, but the total size cannot exceed 1 million.
When used as an argument for the `VARSIZE` command, the number of elements is assigned to `RESULT:0`, `RESULT:1`, and `RESULT:2`.

#### (User-Defined Multi-Dimensional Array Variables)
Since ver1.808, variables defined using `#DIM` or `#DIMS` can be made multi-dimensional.
See [User-Defined Variables](user_defined_variables.md) for details.

### Debug Variables
Debug variables provide information for debugging.
Debug variables only return meaningful values when started in debug mode.
When started in normal mode, they return `empty string` or `0`.

All have two underscores `_` before and after the name.

#### `__FILE__`
A one-dimensional read-only variable.
Returns the file name of the currently executing script.
The file name includes the folder structure and extension, the same as error information.

When referenced from debug commands or variable watch during system input wait, etc., it returns an empty string if there is no currently executing script.

#### `__LINE__`
A one-dimensional read-only variable.
Returns the line number of the currently executing script.
Line numbers start from 1, the same as error information.

If there is no currently executing script, it returns -1.

#### `__FUNCTION__`
A one-dimensional read-only variable.
Returns the name of the currently executing function.
The function name does not include `@` or the argument list.

If there is no currently executing script, it returns an empty string.

### Other
#### `TSTR`
String type one-dimensional array. One-dimensional array, not saved.
Initialized at the same timing as `TFLAG`.

#### `RANDDATA`
An array for storing the state of random numbers. Numeric one-dimensional array, assignable, saved.
Recorded by `DUMPRAND` and read by `INITRAND`.

#### `LINECOUNT`
A variable that returns the number of lines printed so far.
`LINECOUNT` increases by 1 for each newline (not including automatic line breaks due to window width) from startup, and decreases by the number of times `CLEARLINE` is executed.
It does not change due to deletion from log buffer overflow (standard 5000).
It is a non-array numeric variable that cannot be assigned or saved.
Also, the line counting method is the same as `CLEARLINE`.

#### `ISTIMEOUT`
From the readme attached to the private modification version 1809+v2:

	○Added variable ISTIMEOUT to check if TINPUT system timed out
	　Initialized to 0 when TINPUT system is called, becomes 1 on timeout.

As of ver1815, this variable may be unusable.

#### `__INT_MAX__`
#### `__INT_MIN__`
Non-array numeric variables that store the maximum and minimum values of the numeric variable definition domain, respectively. Cannot be assigned or saved.
Since they are not debug variables, they can be used even in normal startup.

#### (User-Defined Global-Scope Variables)
Variables defined using `#DIM` or `#DIMS` in ERH become global-scope variables and can be freely used like single-character variables (`A`, etc.).
See [Header Files (ERH)](ERH.md) for details.

#### (User-Defined Constants)
Variables defined using `#DIM` or `#DIMS` in ERH and specific functions become one-dimensional array constants and are treated as variables that cannot be assigned.
See [User-Defined Variables](ERH.md) for details.

#### (User-Defined Reference Type Variables)
Variables defined using `#DIM REF` or `#DIMS REF` within a specific function become reference type variables.
See [User-Defined Variables](ERH.md) for details.

### Differences from eramaker Specifications
#### `NAME`
#### `CALLNAME`
In eramaker, assignment is not possible.
In Emuera, assignment is now possible.

#### `RAND`
#### `CHARANUM`
In eramaker, assignment is possible and they are saved/loaded, but there is no way to use the assigned value.
In Emuera, assignment is prohibited.

### Provisional Specification Table
#### Variables that existed in eramaker
|Variable Name|Type   |Array           |Assign|Save|Prohibit|Initial Value|Initialization Timing|Remarks|
|:------------|:-----|:---------------|:-----|:---|:-------|:-------------|:---------------------|:------|
|RESULT       |Integer|One-dimensional|○    |○   |×       |-|-|-|
|RESULTS      |String |One-dimensional|○    |×   |×       |-|-|-|
|A～Z         |Integer|One-dimensional|○    |○   |○       |-|-|-|
|COUNT        |Integer|One-dimensional|○    |○   |○       |-|-|`COUNT:0` is used as counter in `REPEAT`.  Prohibiting it makes `REPEAT` unusable|
|DAY          |Integer|One-dimensional|○    |○   |○       |-|-|-|
|TIME         |Integer|One-dimensional|○    |○   |○       |-|-|-|
|MONEY        |Integer|One-dimensional|○    |○   |○       |-|-|-|
|MASTER       |Integer|One-dimensional|○    |○   |○       |-|-|-|
|TARGET       |Integer|One-dimensional|○    |○   |×       |:0 = 1|-|-|
|ASSI         |Integer|One-dimensional|○    |○   |○       |:0 = -1|-|-|
|PLAYER       |Integer|One-dimensional|○    |○   |○       |-|-|-|
|ASSIPLAY     |Integer|One-dimensional|○    |○   |○       |:0 = 0|BEGIN TRAIN|-|
|SELECTCOM    |Integer|One-dimensional|○    |○   |×       |-|-|-|
|PREVCOM      |Integer|One-dimensional|○    |○   |○       |:0 = -1|BEGIN TRAIN|-|
|NEXTCOM      |Integer|One-dimensional|○    |○   |○       |:0 = -1|BEGIN TRAIN|-|
|LOSEBASE     |Integer|One-dimensional|○    |○   |○       |All 0|At end of `@SHOW_USERCOM`|Elements can be specified by `BASENAME`|
|UP           |Integer|One-dimensional|○    |○   |○       |All 0|At end of `@SHOW_USERCOM`  `UPCHECK`|Elements can be specified by `PALAMNAME`|
|DOWN         |Integer|One-dimensional|○    |○   |○       |All 0|At end of `@SHOW_USERCOM`  `UPCHECK`|Elements can be specified by `PALAMNAME`|
|PALAMLV      |Integer|One-dimensional|○    |○   |×       |`_replace.csv`  `PALAMLV initial value`|-|-|
|EXPLV        |Integer|One-dimensional|○    |○   |×       |`_replace.csv`  `EXPLV initial value`|-|-|
|EJAC         |Integer|One-dimensional|○    |○   |○       |:0 = 10000|-|-|
|FLAG         |Integer|One-dimensional|○    |○   |○       |-|-|`FLAGNAME` specifies elements|
|TFLAG        |Integer|One-dimensional|○    |○   |○       |All 0|BEGIN TRAIN|`TFLAGNAME` specifies elements|
|ITEM         |Integer|One-dimensional|○    |○   |○       |-|-|`ITEMNAME` specifies elements|
|ITEMSALES    |Integer|One-dimensional|○    |○   |○       |-|-|`ITEMNAME` specifies elements|
|BOUGHT       |Integer|One-dimensional|○    |○   |○       |-|-|-|
|PBAND        |Integer|One-dimensional|○    |○   |○       |:0 = `_replace.csv`  `PBAND initial value`|-|-|
|CHARANUM     |Integer|Non-dimensional|×    |×   |×       |-|-|Returns the number of registered characters regardless of element specified|
|RAND         |Integer|Non-dimensional|×    |×   |×       |-|-|`RAND:X` where `X` is 0 or negative causes error. Otherwise returns random value from 0 to (number of elements -1)|
|STR          |String |One-dimensional|○    |×   |○       |`STR.CSV`|-|`STRNAME` specifies elements|
|SAVESTR      |String |One-dimensional|○    |○   |○       |-|-|`SAVESTRNAME` specifies elements|
|NO           |Numeric|Character + Non-dimensional|○|○|×|-|-|Specified by `番号,**` in `CHARA**.CSV`|
|ISASSI       |Numeric|Character + Non-dimensional|○|○|×|-|-|Specified by `助手,1` in `CHARA**.CSV` to be treated as assistant from the start|
|NAME         |String |Character + Non-dimensional|○|○|×|-|-|Specified by `名前,**` in `CHARA**.CSV`|
|CALLNAME     |String |Character + Non-dimensional|○|○|×|-|-|Specified by `呼び名,**` in `CHARA**.CSV`|
|BASE         |Numeric|Character + One-dimensional|○|○|○|-|-|All elements become same value as `MAXBASE` when `ADDCHARA` is called.  Elements specified by `BASENAME`|
|MAXBASE      |Numeric|Character + One-dimensional|○|○|○||-|Specified by `基礎,*,**` in `CHARA**.CSV`.  Elements specified by `BASENAME`|
|ABL          |Numeric|Character + One-dimensional|○|○|○|-|-|Specified by `能力,*,**` in `CHARA**.CSV`.  Elements specified by `ABLNAME`|
|TALENT       |Numeric|Character + One-dimensional|○|○|○|-|-|Specified by `素質,*` in `CHARA**.CSV`.  Third value can also be specified like `素質,*,**`.  Elements specified by `TALENTNAME`|
|EXP          |Numeric|Character + One-dimensional|○|○|○|-|-|Specified by `経験,*,**` in `CHARA**.CSV`.  Elements specified by `EXPNAME`|
|MARK         |Numeric|Character + One-dimensional|○|○|○|-|-|Specified by `刻印,*,**` in `CHARA**.CSV`.  Elements specified by `MARKNAME`|
|RELATION     |Numeric|Character + One-dimensional|○|○|○|`replace.csv`  `RELATION initial value`|-|Specified by `相性,*,**` in `CHARA**.CSV`.  Elements specified by `NAME` or `CALLNAME`|
|JUEL         |Numeric|Character + One-dimensional|○|○|○|-|-|Can be specified by `珠,*,**` in `CHARA**.CSV`.  Elements specified by `PALAMNAME`|
|CFLAG        |Numeric|Character + One-dimensional|○|○|○|-|-|Specified by `フラグ,*,**` in `CHARA**.CSV`.  Elements specified by `CFLAGNAME`|
|EQUIP        |Numeric|Character + One-dimensional|○|○|○|-|-|Can be specified by `装着物,*,**` in `CHARA**.CSV`.  Elements specified by `EQUIPNAME`|
|TEQUIP       |Numeric|Character + One-dimensional|○|○|○|All 0|BEGIN TRAIN|Elements specified by `TEQUIPNAME`|
|PALAM        |Numeric|Character + One-dimensional|○|○|○|All 0|BEGIN TRAIN|Elements specified by `PALAMNAME`|
|STAIN        |Numeric|Character + One-dimensional|○|○|×|`_replace.csv`  `Initial stain value`|BEGIN TRAIN|Elements specified by `STAINNAME`|
|EX           |Numeric|Character + One-dimensional|○|○|○|All 0|BEGIN TRAIN|Elements specified by `EXNAME`|
|SOURCE       |Numeric|Character + One-dimensional|○|○|○|All 0|BEGIN TRAIN  At end of `@SOURCE_CHECK`|Elements specified by `SOURCENAME`|
|NOWEX        |Numeric|Character + One-dimensional|○|○|○|All 0|Directly before `@EVENTCOM`|Not updated before `@USERCOM`.  Elements specified by `EXNAME`|
|GOTJUEL      |Numeric|Character + One-dimensional|○|○|○|All 0|BEGIN TRAIN|Elements specified by `PALAMNAME`|
|ABLNAME      |String |One-dimensional|×    |×   |○       |`ABL.CSV`|-|-|
|TALENTNAME   |String |One-dimensional|×    |×   |○       |`TALENT.CSV`|-|-|
|EXPNAME      |String |One-dimensional|×    |×   |○       |`EXP.CSV`|-|-|
|MARKNAME     |String |One-dimensional|×    |×   |○       |`MARK.CSV`|-|-|
|PALAMNAME    |String |One-dimensional|×    |×   |○       |`PALAM.CSV`|-|-|
|ITEMNAME     |String |One-dimensional|×    |×   |○       |`ITEM.CSV`|-|-|
|NOITEM       |Integer|One-dimensional|○    |○   |○       |:0 = gamebase.csv  "No Items"|-|Can specify values other than 0 and 1|

<!--Parts with underline are specifications that differ between eramaker and Emuera-->

#### Emuera-Only Variables
<!--Skipped proofreading for now-->
|Variable Name|Type|Array|Assign|Save|Prohibit|Initial Value|Initialization Timing|Remarks|
|:--|:--|:--|:--|:--|:--|:--|:--|:--|
|LOCAL|Integer|One-dimensional|○|×|○|-|-|#LOCALSIZE changes element count for each function|
|LOCALS|String|One-dimensional|○|×|○|-|-|#LOCALSSIZE changes element count for each function|
|ARG|Integer|One-dimensional|○|×|○|Arbitrary|When function is called※|※Only if set as argument.  Secures elements equal to number defined by arguments for each function|
|ARGS|String|One-dimensional|○|×|○|Arbitrary|When function is called※|※Only if set as argument.  Secures elements equal to number defined by arguments for each function|
|(Private)|Arbitrary|Arbitrary|Arbitrary|×|×|Arbitrary|Game start  When function is called※|※Only if set as argument.  Defined by #DIM or #DIMS in function|
|(Refer)|Arbitrary|Arbitrary|※|※|×|-|-|※Depends on reference target.  Defined by "#DIM REF" or "#DIMS REF" in function|
|(Wide_area)|Arbitrary|Arbitrary|Arbitrary|Arbitrary|×|Arbitrary|Game start|Defined by #DIM or #DIMS in ERH|
|GLOBAL|Integer|One-dimensional|○|※|○|-|-|※Saved by SAVEGLOBAL, loaded by LOADGLOBAL.  Elements specified by GLOBALNAME|
|GLOBALS|String|One-dimensional|○|※|○|-|-|※Saved by SAVEGLOBAL, loaded by LOADGLOBAL.  Elements specified by GLOBALSNAME|
|LINECOUNT|Integer|Non-dimensional|×|×|×|-|-|-|
|ISTIMEOUT|Integer|Non-dimensional|×|×|×|0|When TINPUT system command executed|1 is assigned when TINPUT system command times out|
|`__INT_MAX__`|Integer|Non-dimensional|×|×|×|9223372036854775807|-|-|
|`__INT_MIN__`|Integer|Non-dimensional|×|×|×|-9223372036854775808|-|-|
|RANDDATA|Integer|One-dimensional|○|○|×|-|-|-|
|TSTR|String|One-dimensional|○|×|○|All empty strings|BEGIN TRAIN|Elements specified by TSTRNAME|
|DA|Integer|Two-dimensional|○|○|○|-|-|-|
|DB|Integer|Two-dimensional|○|○|○|-|-|-|
|DC|Integer|Two-dimensional|○|○|○|-|-|-|
|DD|Integer|Two-dimensional|○|○|○|-|-|-|
|DE|Integer|Two-dimensional|○|○|○|-|-|-|
|DITEMTYPE|Integer|Two-dimensional|○|○|○|-|-|-|
|TA|Integer|Three-dimensional|○|○|○|-|-|-|
|TB|Integer|Three-dimensional|○|○|○|-|-|-|
|NICKNAME|String|Character + Non-dimensional|○|○|×|-|-|Specified by "あだ名,**" in CHARA**.CSV|
|MASTERNAME|String|Character + Non-dimensional|○|○|×|-|-|Specified by "主人の呼び方,**" in CHARA**.CSV|
|DOWNBASE|Integer|Character + One-dimensional|○|○|○|All 0|At end of @SHOW_USERCOM|Elements specified by BASENAME|
|CUP|Integer|Character + One-dimensional|○|○|○|All 0|At end of @SHOW_USERCOM  UPCHECK|Elements specified by PALAMNAME|
|CDOWN|Integer|Character + One-dimensional|○|○|○|All 0|At end of @SHOW_USERCOM  UPCHECK|Elements specified by PALAMNAME|
|TCVAR|Integer|Character + One-dimensional|○|○|○|All 0|BEGIN TRAIN|Elements specified by TCVARNAME|
|CSTR|String|Character + One-dimensional|○|○|○|-|-|Specified by "CSTR,*,**" in CHARA**.CSV|  Elements specified by CSTRNAME|
|CDFLAG|Integer|Character + Two-dimensional|○|○|○|-|-|Elements specified by CFDLAGNAME1 and CDFLAGNAME2.  Note that initial element count setting is 1×1|
|ITEMPRICE|Integer|One-dimensional|×|×|○|item.csv|-|Elements specified by ITEMNAME|
|TRAINNAME|String|One-dimensional|×|×|○|train.csv|-|-|
|BASENAME|String|One-dimensional|×|×|○|base.csv|-|-|
|EQUIPNAME|String|One-dimensional|×|×|○|equip.csv|-|-|
|TEQUIPNAME|String|One-dimensional|×|×|○|tequip.csv|-|-|
|STAINNAME|String|One-dimensional|×|×|○|stain.csv|-|-|
|EXNAME|String|One-dimensional|×|×|○|ex.csv|-|-|
|SOURCENAME|String|One-dimensional|×|×|○|source.csv|-|-|
|FLAGNAME|String|One-dimensional|×|×|○|flag.csv|-|-|
|TFLAGNAME|String|One-dimensional|×|×|○|tflag.csv|-|-|
|CFLAGNAME|String|One-dimensional|×|×|○|cflag.csv|-|-|
|TCVARNAME|String|One-dimensional|×|×|○|tcvar.csv|-|-|
|STRNAME|String|One-dimensional|×|×|○|strname.csv|-|str.csv specifies STR content, not element name|
|TSTRNAME|String|One-dimensional|×|×|○|tstr.csv|-|-|
|CSTRNAME|String|One-dimensional|×|×|○|cstr.csv|-|-|
|SAVESTRNAME|String|One-dimensional|×|×|○|savestr.csv|-|-|
|CDFLAGNAME1|String|One-dimensional|×|×|○|cdflag1.csv|-|-|
|CDFLAGNAME2|String|One-dimensional|×|×|○|cdflag2.csv|-|-|
|GLOBALNAME|String|One-dimensional|×|×|○|global.csv|-|-|
|GLOBALSNAME|String|One-dimensional|×|×|○|globals.csv|-|-|
|GAMEBASE_AUTHOR|String|Non-dimensional|×|×|×|gamebase.csv  "作者"|-|-|
|GAMEBASE_INFO|String|Non-dimensional|×|×|×|gamebase.csv  "追加情報"|-|-|
|GAMEBASE_YEAR|String|Non-dimensional|×|×|×|gamebase.csv  "製作年"|-|-|
|GAMEBASE_TITLE|String|Non-dimensional|×|×|×|gamebase.csv  "タイトル"|-|-|
|GAMEBASE_GAMECODE|Integer|Non-dimensional|×|×|×|gamebase.csv  "コード"|-|-|
|GAMEBASE_VERSION|Integer|Non-dimensional|×|×|×|gamebase.csv  "バージョン"|-|-|
|GAMEBASE_ALLOWVERSION|Integer|Non-dimensional|×|×|×|gamebase.csv  "バージョン違い認める"|-|-|
|GAMEBASE_DEFAULTCHARA|Integer|Non-dimensional|×|×|×|gamebase.csv  "最初からいるキャラ"|-|-|
|GAMEBASE_NOITEM|Integer|Non-dimensional|×|×|×|gamebase.csv  "アイテムなし"|-|-|
|WINDOW_TITLE|String|Non-dimensional|○|×|×|gamebase.csv  "ウィンドウタイトル"※|-|※If not present, generated from "タイトル" and "バージョン".  If "タイトル" is also not present, becomes "Emuera"|
|MONEYLABEL|String|Non-dimensional|×|×|×|_replace.csv  "お金の単位"※|-|※If not present, becomes "$"|
|DRAWLINESTR|String|Non-dimensional|×|×|×|_replace.csv  "DRAWLINE文字"※|-|※If not present, becomes repeated "-" characters|
|LASTLOAD_VERSION|Integer|Non-dimensional|×|×|×|-1|Game start  RESETDATA|Value updated on load|
|LASTLOAD_NO|Integer|Non-dimensional|×|×|×|-1|Game start  RESETDATA|Value updated on load|
|LASTLOAD_TEXT|String|Non-dimensional|×|×|×|Empty string|Game start  RESETDATA|Value updated on load|
|SAVEDATA_TEXT|String|Non-dimensional|○|※|×|※※|At start of @SAVEINFO|※Saved as save data title  ※※String representing current time|


---


