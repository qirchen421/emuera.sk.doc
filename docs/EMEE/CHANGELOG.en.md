---
hide:
  - toc
---

# Changelog

## Emuera.EM

=== "v18"

    * Function added: [`HTML_STRINGLINES`](../Reference/HTML_STRINGLINES.md).
    * Bug fix: Fixed line position shift issue with [`<div>` tag](../EMEE/EMEE_Summary.md#html_print).
    * Bug fix: Fixed error when target of [`DT_CELL_GETS`](../Reference/DT_CELL.md) is INT.
    * Bug fix: Fixed issue where outer [`<clearbutton>` tag](../EMEE/EMEE_Summary.md#html_print) was ineffective against content in [`<div>` tag](../EMEE/EMEE_Summary.md#html_print).

=== "v17"

    * Function added: [`DT_COLUMN_NAMES`](../Reference/DT_COLUMN.md).
    * Feature extended: Added `display`, `margin`, `padding`, `border`, `bcolor`, `radius` attributes to [`<div>` tag](../EMEE/EMEE_Summary.md#html_print).
    * Bug fix: Fixed crash when rendering `<div>` after restart.

=== "v16fix2"

    * Bug fix: Fixed issues with rendering timing and mouse detection in `<div>` tag.
    * Bug fix: Fixed incorrect double attribute warning in `<img>` tag caused by feature update.

=== "v16fix"

    * Bug fix: Fixed issue where buttons sometimes did not respond to mouse in certain situations.
    * Feature extended: Added second argument to [`HTML_PRINT`](../EMEE/EMEE_Summary.md#html_print), added `size` and `rect` attributes to `<div>` tag.

=== "v16"

    * Functions added: [`DT_TOXML`](../Reference/DT_SERIALIZATION.md), [`DT_FROMXML`](../Reference/DT_SERIALIZATION.md), [`DT_COLUMN_OPTIONS`](../Reference/DT_COLUMN.md), [`MOVETEXTBOX`](../Reference/TEXTBOX.md), [`RESUMETEXTBOX`](../Reference/TEXTBOX.md).
    * Feature extended: Added [`<div>` tag](../EMEE/EMEE_Summary.md#html_print), added `srcm` attribute to `<img>` tag, extended rendering specification.
    * Feature extended: Added 2 more forms to [`PRINT_IMG` command](../EMEE/EMEE_Summary.md#html_printprint).
    * Feature extended: [`ARRAYMSORTEX`](../Reference/ARRAYMSORTEX.md) now accepts array size specification.

=== "v15"

    * Functions added: [`DataTable` system functions](../EMEE/EMEE_Summary.md#xmlmapdatatable).
    * Bug fix: Fixed display issue with input field when font size is not `16`.
    * Bug fix: Fixed issue where alpha channel information in user-specified icons was ignored.

=== "v14fix"

    * Bug fix: Fixed issue where some keyboard inputs were disabled.

=== "v14"

    * Update to [Private v16](https://ux.getuploader.com/ninnohito/download/482).
    * Feature extended: [`GCLEAR`](../EMEE/EMEE_Summary.md#gclear) now replaces specified area with specified color.
    * Feature extended: [Emuera icon specification feature](../EMEE/EMEE_Summary.md#emuera).
    * Feature extended: [`STATIC_MAPS`/`STATIC_MAPS`](../EMEE/EMEE_Summary.md#xmlmapdatatable) can now be specified.

=== "v13fix"

    * Bug fix: Fixed display issue with `PRINT_IMG` and `<img>` tag images caused by feature extension.

=== "v13"

    * Feature extended: Extended HTML image parameter [format](../EMEE/EMEE_Summary.md#html_print).
    * Feature extended: Added [`PRINT_IMG` arguments](../EMEE/EMEE_Summary.md#html_printprint).

=== "v12"

    * Feature extended: Added config feature to [compress and save save data](../EMEE/EMEE_Summary.md#_5).
    * Feature extended: [XML and MAP can be saved in save data](../EMEE/EMEE_Summary.md#xmlmapdatatable).
    * Specification change: Changed [XML system commands](../EMEE/EMEE_Summary.md#xmlmapdatatable) to use string IDs, compatible with older versions.

=== "v11"

    * HTML tag attribute added: Added [`notooltip`](../EMEE/EMEE_Summary.md#html_print) attribute to `<clearbutton>`.

=== "v10"

    * HTML tag added: [`<clearbutton>`](../EMEE/EMEE_Summary.md#html_print).
    * Performance improvement: Improved [`XML_GET`](../Reference/XML_GET.md) performance through algorithm improvements.

=== "v9"

    * Function added: [`ENUMFILES`](../Reference/ENUMFILES.md).

=== "v8c"

    * Bug fix: Updated `libwebp.dll` version, fixed issue where some Win11 systems could not load `webp` files.

=== "v8b"

    * Bug fix: Fixed issue with [`REPLACE` extension](../EMEE/EMEE_Summary.md#replace) (caused AA map display errors in eraTW).
    * Specification change: Changed [`HTML_SUBSTRING`](../Reference/HTML_SUBSTRING.md) from always returning `1` to string type (same as `RESULTS:0`).

=== "v8"

    * Feature extended: [`XML_GET`](../Reference/XML_GET.md), [`REPLACE`](../EMEE/EMEE_Summary.md#replace)
    * Bug fix: [`XML_REMOVEATTRIBUTE`](../Reference/XML_REMOVEATTRIBUTE.md), [`VARSETEX`](../Reference/VARSETEX.md)

=== "v7"

    * [`HTML_STRINGLEN`](../Reference/HTML_STRINGLEN.md) feature extended
    * [`REGEXPMATCH`](../Reference/REGEXPMATCH.md) feature extended

=== "v6"

    * Changed image processing to [`ImageProcessor`](https://imageprocessor.org/)+`libwebp` to avoid security false positives. Also supports [`WebP`](https://developers.google.com/speed/webp).

=== "v5"

    * Fixed descriptions of [`XML_SET`](../Reference/XML_SET.md), [`XML_GET`](../Reference/XML_SET.md).
    * Added description for [`XML_TOSTR`](../Reference/XML_TOSTR.md).
    * Functions added: [`XML_ADDNODE`](../Reference/XML_ADDNODE.md), [`XML_REMOVENODE`](../Reference/XML_REMOVENODE.md), [`XML_ADDATTRIBUTE`](../Reference/XML_ADDATTRIBUTE.md), [`XML_REMOVEATTRIBUTE`](../Reference/XML_REMOVEATTRIBUTE.md), [`XML_REPLACE`](../Reference/XML_REPLACE.md).

=== "v4"

    * [`MAP_TOXML`](../Reference/MAP_SERIALIZATION.md) bug fix.
    * Functions added: [`MAP_CLEAR`](../Reference/MAP_OPERATION.md), [`MAP_SIZE`](../Reference/MAP_OPERATION.md), [`MAP_GETKEYS`](../Reference/MAP_GETKEYS.md), [`XML_TOSTR`](../Reference/XML_TOSTR.md).
    * Fixed [`INPUT` system extension](../EMEE/EMEE_Summary.md#input) features.

=== "v3"

    * Functions added: [`EXISTFILE`](../Reference/EXISTFILE.md), [`MAP_CREATE`](../Reference/MAP_MANAGE.md), [`MAP_EXIST`](../Reference/MAP_MANAGE.md), [`MAP_RELEASE`](../Reference/MAP_MANAGE.md), [`MAP_GET`](../Reference/MAP_OPERATION.md), [`MAP_HAS`](../Reference/MAP_OPERATION.md), [`MAP_SET`](../Reference/MAP_OPERATION.md), [`MAP_REMOVE`](../Reference/MAP_OPERATION.md), [`MAP_TOXML`](../Reference/MAP_SERIALIZATION.md), [`MAP_FROMXML`](../Reference/MAP_SERIALIZATION.md).

=== "v2"

    * Removed `FUNCEXIST` (please use EE's [`EXISTFUNCTION`](../Reference/EXISTFUNCTION.md))
    * Function name change: `VAREXIST` → [`EXISTVAR`](../Reference/EXISTVAR.md) (to match `EXISTFUNCTION`)
    * Functions added: [`XML_DOCUMENT`](../Reference/XML_MANAGE.md), [`XML_RELEASE`](../Reference/XML_MANAGE.md), [`XML_SET`](../Reference/XML_SET.md), [`XML_EXIST`](../Reference/XML_MANAGE.md), [`XML_TOSTR`](../Reference/XML_TOSTR.md).
    * `XML_GET` first argument can now be integer type.

=== "v1"

    * Initial release

## Emuera.EE
=== "v55"
	Added ONEBINPUT, ONEBINPUTS
	VVII's patch for .NET 10 support
	csproj organization by daughterpatch
	Fixed bug where 2D array variables with string type names in ERD were not referenced

=== "v54"
	Improved operational stability
	Fixed return value of SPRITEGETCOLOR
	Fixed issue where BINPUTS always returns 0
	Merged VVII's patch (output error log on resource loading failure, adjusted plugin description for VSCode)
	Updated libwebp dll (CRER)
	Improved resource loading behavior via above two points
	Fixed TIMES behavior issue in certain regions
	Merged Private v23-24

=== "v53"
	Fixed button hit detection disappearing when using large images with HTML_PRINT
	Now outputs variant name and version defined in GameBase.csv when outputting logs

=== "v52"
	Withdrawn sprite generation log exception error
	Fixed TINPUT being too fast to function properly
	Significantly reduced Emuera main file size by removing unnecessary references
	ERB folders now prioritize folders with "#" in the name (no effect on normal variants, for maintaining compatibility with past versions)
	Fixed HTML_SUBSTRING with CRER's patch

=== "v51"
	v50 is skipped
	Fixed [`SPRITEANIME`](../Reference/SPRITEANIMECREATE.md) with daughterpatch's patch, fixed tooltips, logs now saved with UTF-8 BOM
	Can replace line break codes when joining lines from options (default is one half-width space)
	Completed some translations with CRER's patch, clipboard feature made into tool
	Fixed issue where sprites specified in CSV using lowercase letters were not generated properly
	CSV sprite generation logs now displayed when showing load report in config
	Fixed [`QUIT_AND_RESTART`](../Reference/QUIT_AND_RESTART.md) system commands not working due to restart process change
	Fixed line wrapping to optimal character count with JukesBouver's patch

=== "v49"
	* Fixed button mouseover detection not working in div, srcb not displaying
	* Memory optimization by JukesBouver99
	* RikaiDialog processing fix by Alex Swift
	* Fixed and adjusted sprite generation process from CSV in resources folder, SPRITEDISPOSEALL also fixed
	* Merged daughter's patch. Added [EXISTMETH](../Reference/EXISTMETH.md), [GETMETH](../Reference/GETMETH.md), [GETMETHS](../Reference/GETMETH.md)

=== "v48fix"
	* Fixed middle-click detection implemented in v48 being incorrect
	* Fixed CSV in resources folder being loaded multiple times
	* Fixed proper initialization for each Xml, Map, DataTable according to attributes (data saved in save data→cleared when loading separate data, global data→cleared on RESETGLOBAL, LOADGLOBAL)
	* Merged Private v22 changes
	* Fixed unable to scroll up logs with up key in text box
	* Added second argument to [OUTPUTLOG](../Reference/OUTPUTLOG.md). When non-zero, excludes version info
	* Merged MogeMoc's (RainForTW) fix. srcb now applies on mouseover regardless of depth for images displayed with HTML_PRINT
	* Added warning when character 0 is defined multiple times
	* Added exception handling for files opened in separate processes

=== "v48"
	* Merged master branch of [Emuera.NET](https://gitlab.com/VVIIlet/emuera) by VVII (as of 2024/06/30)
	* Added various QoL improvements, added [`VAR` system commands](../Reference/VAR.md), [`PRINTN` system commands](../Reference/PRINTN.md), [`HTML_PRINT_ISLAND` command](../Reference/HTML_PRINT_ISLAND.md)
	* [`INPUT`](../Reference/INPUT.md) system now accepts middle-click (mouse wheel click). `RESULTS:1` returns 3
	* Added HOTKEY related commands
	* Added comment symbol "`;^;`" that only works in EMEE

=== "v47"
	* Rolled back previous specification for [`GETDISPLAYLINE`](../Reference/GETDISPLAYLINE.md) fix due to issues in v46
	* Added [background operation commands](../Reference/BACKGROUND.md) by Neo_Kesha
	* Added [`CALLSHARP`](../Reference/CALLSHARP.md) by Neo_Kesha
	* Added [CSV alias feature](../EMEE/EMEE_Summary.md#alias) by Neo_Kesha
	* Added [`BITMAP_CACHE_ENABLE`](../Reference/BITMAP_CACHE_ENABLE.md) by JukesBouver99 (fairylord/KFC)
	* .NET 8 support by fairylord

=== "v46"
	* Fixed [`GETDISPLAYLINE`](../Reference/GETDISPLAYLINE.md) arguments to return lines corresponding to `LINECOUNT`
	* Extended [`FLOWINPUT`](../Reference/FLOWINPUT.md)
	* Added [`FLOWINPUTS`](../Reference/FLOWINPUT.md)

=== "v45"
	* NAudio version feature extension and stability improvements by Ignominious.Reverie
	* Fixed exception when performing [`GDRAWTEXT`](../Reference/GDRAWTEXT.md) without specifying font
	* [`GETCONFIG`, `GETCONFIGS`](../Reference/GETCONFIG.md) now can retrieve EMEE extended config

=== "v44"
	* [`PLAYSOUND`](../Reference/PLAYSOUND.md) second argument now can set playback count

=== "v43"
	* Bug fixes for [`MOUSEB`](../Reference/MOUSEB.md), [`UPDATECHECK`](../Reference/UPDATECHECK.md), [`SPRITEANIMEADDFRAME`](../Reference/SPRITEANIMEADDFRAME.md)
	* NAudio version stability improvements (Ignminious.Reverie, CRER)
	* Fixed some missing config translations
	* Merged memory optimization for resource file reading by MogeMoc (RainForTW)

=== "v42"
	* Minor fixes and translation omissions. Explained in v43

=== "v41fix"
	* Fixed webp library vulnerability (https://nvd.nist.gov/vuln/detail/CVE-2023-4863)
	* Replaced included "libwebp.dll" with new version, added "libsharpyuv.dll"

=== "v41"
	* Added [`TOOLIP_IMG`](../Reference/TOOLTIP_EXTENSION.md)
	* Bundled NAudio version for Linux music playback (Ignominious.Reverie)

=== "v40"
	* Fixed various bugs and optimizations for Wine etc.
	* Not an Emuera update, but moved Emuera documentation from dead OSDN server to EM+EE wiki
	* https://evilmask.gitlab.io/emuera.em.doc/index.html

=== "v39fix"
	* Fixed files with different encodings being read correctly with CRER's patch
	* Added `GETDOINGFUNCTION`
	* Fixed suspicious behavior with CLEARLINE and div combination again. Should not happen anymore

=== "v39"
	* Fixed DPI scaling issue with CRER's patch
	* Fixed [`ARRAYREMOVE`](../Reference/ARRAYREMOVE.md) third argument 0 or less not clearing all subsequent array elements
	* Fixed character count mismatch between [`PRINTC` and `PRINTLC`](../Reference/PRINT.md)
	* Implemented resource CSV re-read function

=== "v38fix"
	* Fixed some function and command behavior issues due to CurrentCulture change

=== "v38"
	* Fixed suspicious behavior of [`GDRAWTEXT`](../Reference/GDRAWTEXT.md) and [`GGETTEXTSIZE`](../Reference/GGETTEXTSIZE.md) with some fonts
	* Fixed [`EXISTFUNCTION`](../Reference/EXISTFUNCTION.md) to behave according to case-insensitive option
	* .NET 7 officially supported thanks to CRER

=== "v37"
	* Added config option to handle UTF-8 (without BOM) files
	* Fixed [`EXISTFUNCTION`](../Reference/EXISTFUNCTION.md) fix in v36 having significant impact on processing time, changed to only ignore case when second argument is non-zero
	* Fixed suspicious timer behavior when mouse click option is attached to [`TINPUT`](../Reference/TINPUT.md) system

=== "v36"
	* Supported font files (ttf, otf)
	* Fixed search not working properly with case variations in [`ENUMFUNC`](../Reference/ENUMFUNC.md) and [`EXISTFUNCTION`](../Reference/EXISTFUNCTION.md)

=== "v35fix"
	* Fixed issue with [`BINPUTS`](../Reference/BINPUT.md)

=== "v35"
	* Changed restart process to address memory leak when restarting repeatedly
	* Identified cause of initializer error, now shows error message with try-catch (caused by missing WMP)
	* Added option to check for duplicate ERD identifiers and local variables
	* Fixed issue where [`BINPUT`](../Reference/BINPUT.md) executed without newline in PRINT was not recognized as button

=== "v34"
	* Added [`GDASHSTYLE`](../Reference/GDASHSTYLE.md)

=== "v33"
	* Added [`GETDISPLAYLINE`](../Reference/GETDISPLAYLINE.md)
	* [`GCREATEFROMFILE` extension](../Reference/GCREATEFROMFILE.md)

=== "v32"
	* Added [`GDRAWLINE`](../Reference/GDRAWLINE.md)

=== "v31fix"
	* Fixed issue where `BINPUT` and div feature did not work together properly
	* When executing BINPUT with no buttons, return default value. If no default, error as before
	* Fixed issue where screen rendering did not occur for some reason, making div combination unusable

=== "v31"
	* Added [`BINPUT` and `BINPUTS`](../Reference/BINPUT.md) commands

=== "v30"
	* Added [`SKIPLOG`](../Reference/SKIPLOG.md) command
	* Fixed shortcut keys for menu access not working

=== "v29"
	* Fixed `GCREATEFROMFILE` not working
	* Fixed div content not following when specifying margin, border, padding with EM's div feature
	* Fixed internal processing still running when translation dictionary was disabled, causing slow rendering
	* Added [`MOUSEB`](../Reference/MOUSEB.md)
	* Added [`SPRITEDISPOSEALL`](../Reference/SPRITEDISPOSEALL.md)

=== "v28"
	* Fixed EM's INPUT extension not working
	* Extended INPUT command uniquely for EE
	* Added [`FLOWINPUT`](../Reference/FLOWINPUT.md)

=== "v27"
	* English dictionary support with patch from JukesBouver99

=== "v26"
	* [`GDRAWTEXT`](../Reference/GDRAWTEXT.md) feature extended with `GSETPEN`
	* Added [`GGETPEN`](../Reference/GGETPEN.md), [`GGETPENWIDTH`](../Reference/GGETPENWIDTH.md), [`GGETBRUSH`](../Reference/GGETBRUSH.md)
	* Added [tooltip feature extension commands](../Reference/TOOLTIP_EXTENSION.md)

=== "v25"
	* Ported [`Clipboard` feature](../EMEE/EMEE_Summary.md#emuera-anchorclipboard) from Emuera-Anchor
	* Completed translations

=== "v24"
	* Supported [internationalization](../i18n/README.md) (same as EMv14)
	* Applied [`GETNUM` to multidimensional array ERD](../EMEE/EMEE_Summary.md#getnumerd)
	* Added [`ERDNAME`](../Reference/ERDNAME.md)

=== "v23"
    * Extended [`ERD` feature](../EMEE/EMEE_Summary.md#erhcsverd) to work with 2D and 3D arrays

=== "v22"
    * Specification change: [`ERD` feature](../EMEE/EMEE_Summary.md#erhcsverd) now throws error at startup if the same identifier is defined in multiple definition files for one variable name. Allows specifying multiple identifiers for one array.
    * Added [`INPUTANY`](../Reference/INPUTANY.md)

=== "v21"
    * Added [`GETTEXTBOX`](../Reference/TEXTBOX.md), [`SETTEXTBOX`](../Reference/TEXTBOX.md)

=== "v20"
    * Further accelerated ERD reading
    * [`DAY`, `TIME`, `MONEY` now accept CSV](../EMEE/EMEE_Summary.md#daytimemoneycsv)

=== "v19"
    * Accelerated ERD reading
    * Debug console now supports `_Rename.csv`

=== "v18"
    * `INPUTMOUSEKEY` now supports string buttons
    * `COUNT` can be set as forbidden variable in `VariableSize.csv`
    * Key macros now saved as UTF-8

=== "v17"
    * Added option to toggle ERD feature on/off

=== "v16"
    * ERD feature fix (could not get elements from CSV variable indices)
    * Hotkey feature extension ported from Emuera-Anchor

=== "v15"
    * ERD feature fix (exception when defining undefined arguments for hardcoded variables)
    * GDRAWTEXT fix (exception when executed without using GSETFONT)

=== "v14"
    * Functions added: `GETMEMORYUSAGE`, `CLEARMEMORY`

=== "v13"
    * ERD feature added

=== "v12"
    * Function added: `FORCE_BEGIN`
    * PLAYSOUND feature extended to support 10 channels

=== "v11fix"
    * UPDATECHECK fix

=== "v11"
    * Functions added: `GDRAWGWITHROTATE`, `QUIT_AND_RESTART`, `FORCE_QUIT`, `FORCE_QUIT_AND_RESTART`

=== "v10"
    * Function added: `UPDATECHECK`

=== "v9"
    * WebP support

=== "v8"
    * Functions added: `TRYCALLF`, `TRYCALLFORMF`

=== "v7"
    * Function added: `GGETTEXTSIZE`

=== "v6"
    * Function added: `EXISTFUNCTION`

=== "v5fix"
    * Fixed vulnerability in OUTPUTLOG feature extension

=== "v5"
    * OUTPUTLOG feature extension

=== "v4"
    * Functions added: `GGETFONT`, `GGETFONTSIZE`

=== "v3"
    * Function added: `GDRAWTEXT`

=== "v2"
    * INPUTMOUSEKEY feature extension

=== "v1"
    Initial release
    
    * Functions added: `PLAYSOUND`, `STOPSOUND`, `PLAYBGM`, `STOPBGM`, `EXISTSOUND`, `SETSOUNDVOLUME`, `SETBGMVOLUME`
