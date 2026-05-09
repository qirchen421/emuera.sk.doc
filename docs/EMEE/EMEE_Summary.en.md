---
---

# Emuera EM+EE Features Summary

### ![](../assets/images/IconEM.webp)Resource Release
!!! summary ""

    Images in the Resource folder are no longer locked while the program is running.

### ![](../assets/images/IconEE.webp)Audio File Support
!!! summary ""

    Place audio files in the sound folder (same directory as Emuera) to use them.

    See PLAYSOUND command and related functions for details.

### ![](../assets/images/IconEM.webp)WebP Image Format Support
!!! summary ""

    WebP format support was added based on Emuera1824+v11+webp+Secure.

    Starting from EMv6+EEv13, a different WebP library is used.

### ![](../assets/images/IconEE.webp)Emuera-Anchor Integrated (Support Ended)
!!! summary ""

    Language switching functionality was added to the system to support multiple languages.

    Emuera-Anchor is no longer necessary and has been removed.

### ![](../assets/images/IconEE.webp)Emuera-Anchor Hotkey Extensions Ported
!!! summary ""

    Ported hotkey extensions from Emuera-Anchor.

    `Ctrl+T` returns to title screen, `Ctrl+R` restarts, `Ctrl+O` reloads ERB.

### ![](../assets/images/IconEE.webp)Key Macros Saved in UTF-8
!!! summary ""

    Languages other than English can now be included in macros.

### ![](../assets/images/IconEM.webp)Compressed Save Data
!!! summary ""

    Configurable in the settings screen or `emuera.config`.

    * Only valid when [`Save save data in binary format`](../Emuera/config.md#_43) is set to `YES`.

!!! example "Example"
    ``` title="emuera.config"
    Save compressed data:YES
    ```

!!! warning "Warning"

    Save data with compression enabled is not compatible with older versions or the original Emuera.exe.

### ![](../assets/images/IconEM.webp)Emuera Icon Specification Feature
!!! summary ""

    Configurable via the config item in `emuera.config`

    Enter the image path in the config item `Path to Emuera icon`.
    Path is relative to `Emuera.exe` (`..` is not valid).

    Only the title bar and taskbar icons change (`Emuera.exe` icon itself does not change)

### ![](../assets/images/IconEE.webp)Emuera-Anchor Clipboard Functionality Ported
!!! summary ""

    Added automatic clipboard copying feature for text displayed in Emuera.
    Configure via Settings → Clipboard.

### ![](../assets/images/IconEE.webp)Dynamic Loading of `ttf` and `otf` Fonts
!!! summary ""

    Create a `font` folder in the root directory and place fonts there to use them in config and `GSETFONT`.

### ![](../assets/images/Iconetc.webp).NET 7 Support
!!! summary ""

    With help from CRER, .NET 7 is now officially supported.
    Thank you!

## Constants & Variables

### ![](../assets/images/IconEE.webp)Variable Arrays Defined in `ERH` Can Have Names Assigned via `CSV`/`ERD` Files
!!! summary ""

    Reads files conforming to variable names defined in `ERH` and assigns names to arrays, just like existing CSV variables.

    Files usable in the CSV folder are named `「VariableName.csv」`, and those usable in ERB are `「VariableName.ERD」`.
    The format is the same as CSV variable files.
    If two or more such files exist with the same identifier defined, an error occurs at startup and the program terminates.
    Different identifiers can be mapped to the same integer.

    For multidimensional array variables, add `@` followed by a number to the filename to correspond to each dimension.
    The numbers correspond to the dimension index from the left: 1, 2, 3...

!!! example "Example"

    ``` { #language-csv title="ERH.ERH" }
    #DIM HOGE, 3
    #DIM HOGE2D, 3, 3
    #DIM HOGE3D, 3, 3, 3
    ```


    ``` title="ERB folder"
    HOGE.ERD
    HOGE2D@1.ERD
    HOGE2D@2.ERD
    HOGE3D@1.ERD
    HOGE3D@2.ERD
    HOGE3D@3.ERD
    ```
    
### ![](../assets/images/IconEE.webp)Using `COUNT` as a Restricted Variable in `VariableSize.csv`
!!! summary ""

    By specifying `COUNT,-1`, you can set COUNT as a restricted variable.
    In this case, a warning appears at startup for `REPEAT` lines, and an error occurs during execution.

### ![](../assets/images/IconEE.webp)CSV Applied to `DAY`, `TIME`, `MONEY`
!!! summary ""

    Names can be assigned via `DAY.csv`, `TIME.csv`, `MONEY.csv` just like other CSV files.
    `DAYNAME`, `TIMENAME`, `MONEYNAME` become available.

### ![](../assets/images/IconEM.webp)`XML`, `MAP`, `DataTable` Can Be Saved in Save Data
!!! summary ""

    IDs for [`XML`](../Reference/XML_MANAGE.md), [`MAP`](../Reference/MAP_MANAGE.md), and [`DataTable`](../Reference/DT_MANAGE.md) that you want to save can be configured in `VarExt*.csv` files in the CSV folder.

    * Only valid when [`Save save data in binary format`](../Emuera/config.md#_43) is set to `YES`.
    * Even if IDs are set, data not in memory will not be saved to save data.
    * If saved data contains IDs not configured in CSV, they are discarded.
    * Save data is compatible with older versions and the original Emuera.exe.

!!! example "Example"

    ``` { #language-csv title="VarExtSample.CSV" }
    ; IDs of MAP, XmlDocument, DataTable to save in global.sav. Multiple IDs per line supported
    ; Can also be configured across multiple files (e.g., VarExt1.csv, VarExt2.csv, VarExt3.csv)
    GLOBAL_MAPS, MyMap, MyMap2
    GLOBAL_MAPS, MyMap3
    GLOBAL_XMLS, 0, MyXml
    GLOBAL_DTS, db
    ; IDs of MAP, XmlDocument, DataTable to save in save*.sav
    SAVE_MAPS, MyMap4
    SAVE_XMLS, 1, MyXml2
    SAVE_DTS, mydb1
    ; Similar to variables with GLOBAL prefix, unchanged during RESETDATA, deleted during RESETGLOBAL
    STATIC_MAPS, MyMap5
    STATIC_XMLS, 1, MyXml3
    STATIC_DTS, db2
    ```

!!! warning "Warning"

    Note that leading and trailing spaces in IDs configured in CSV files are removed.

## Modified Commands & Functions

### ![](../assets/images/IconEM.webp)`HTML_PRINT` Related Changes
!!! summary ""

    - The `<space>` tag in `HTML_PRINT` now accepts negative numbers for the `param` attribute
    - Added `<clearbutton>` tag to `HTML_PRINT`. `<clearbutton>` disables buttons in the wrapped area (title and pos attributes remain functional)
        - If the `notooltip` attribute is `true`, the button `title` attribute is also disabled
    - When setting `width`, `height`, `ypos`, and `param` attributes for `<img>` and `<shape>` tags in `HTML_PRINT`, adding `px` (case-insensitive) after the number interprets it as pixels instead of a percentage of font size
    - Added `<div>` tag to `HTML_PRINT`. Content wrapped in `<div>` can be displayed in a specified area. `<div>` does not support nesting. Can be used with other tags.
        - `width` attribute: Width of the sub-area. Can be specified in pixels or as a percentage of font size, similar to `<img>` and `<shape>` tags.
        - `height` attribute: Height of the sub-area. Can be specified in pixels or as a percentage of font size, similar to `<img>` and `<shape>` tags.
        - `xpos` attribute: Horizontal distance from current position. Optional. Negative shifts left, positive shifts right. Can be specified in pixels or as a percentage of font size, similar to `<img>` and `<shape>` tags.
        - `ypos` attribute: Vertical distance from current position. Optional. Negative shifts up, positive shifts down. Can be specified in pixels or as a percentage of font size, similar to `<img>` and `<shape>` tags.
        - `size` attribute: Simplified `width` and `height`. Format: `size='width,height'`.
        - `rect` attribute: Simplified `xpos`, `ypos`, `width`, and `height`. Format: `rect='xpos,ypos,width,height'`.
        - `depth` attribute: Depth of the sub-area. Optional. Negative brings forward, positive pushes back.
        - `color` attribute: Background color of the sub-area. Optional. Format is the same as the `color` attribute in `<font>` tags.
        - `display` attribute: Drawing format of the sub-area. Optional.
            - `relative` (default): Draws at current text position.
            - `absolute`: Draws at fixed window position, does not move when scrolling. `(0, 0)` is the bottom-left of the window, `ypos` is positive upward.
        - `margin` attribute: Margin area on all four sides of the sub-area. Optional.
            - `margin='all'`: Applies `all` to all four sides. Both pixels and percentage of font size supported.
            - `margin='leftRight,topBottom'`: Applies `leftRight` to top/bottom and left/right. Both pixels and percentage of font size supported.
            - `margin='top,leftRight,bottom'`: Applies `top` to top, `leftRight` to left/right, `bottom` to bottom. Both pixels and percentage of font size supported.
            - `margin='top,right,bottom,left'`: Applies `top` to top, `right` to right, `bottom` to bottom, `left` to left. Both pixels and percentage of font size supported.
        - `padding` attribute: Padding area on all four sides of the sub-area. Optional. Same format as `margin` attribute.
        - `border` attribute: Width of the sub-area border. Optional. Same format as `margin` attribute.
        - `bcolor` attribute: Color of the sub-area border. Optional. Same format as `margin` attribute, but color format is the same as the `color` attribute in `<font>` tags.
        - `radius` attribute: Rounding radius of the outer corners of the sub-area border. Optional.
            - `radius='all'`: Applies `all` to all four corners. Both pixels and percentage of font size supported.
            - `radius='ltRb,rtLb'`: Applies `ltRb` to top-left and bottom-right, `rtLb` to top-right and bottom-left. Both pixels and percentage of font size supported.
            - `radius='lt,rtLb,rb'`: Applies `lt` to top-left, `rtLb` to top-right and bottom-left, `rb` to bottom-right. Both pixels and percentage of font size supported.
            - `radius='lt,rt,rb,lb'`: Applies `lt` to top-left, `rt` to top-right, `rb` to bottom-right, `lb` to bottom-left. Both pixels and percentage of font size supported.
    - Content exceeding line height (such as images and divs) can now be displayed even when the line is off-screen
    - Added `srcm` attribute to `<img>` tag in `HTML_PRINT`. Similar to CBG button maps. When using [extended INPUT mode](./EMEE_Summary.md#input) or executing `INPUTMOUSEKEY`, the color (RGB part) of the button map image under the mouse cursor is assigned to `RESULT:3` (or `RESULT:6` for `INPUTMOUSEKEY`)
    - Added second argument (integer type) to `HTML_PRINT`. If the second argument is not `0` (default), forced line breaks are disabled

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    
        HTML_PRINT "文<shape type='space' param='-100'>字"
        HTML_PRINT "<clearbutton><button value='1' title='ツールチップ1'>[1] 確定</button></clearbutton>"
        HTML_PRINT "<clearbutton notooltip='true'><button value='2' title='ツールチップ2'>[2] 戻る</button></clearbutton>"
        HTML_PRINT "<shape type='rect' param='0,0,200px,100'>"
        HTML_PRINT "<img src='button_normal' srcb='button_hover' srcm='button_mask'>"
        HTML_PRINT "<div ypos='-5px' xpos='-180px' width='80px' height='80px' color='#503030' depth='-1'><button value='3'>[3] ボタン3</button></div>"

        ONEINPUT
    ```

### ![](../assets/images/IconEM.webp)`HTML_PRINT` Related Changes to PRINT Commands
!!! summary ""

    - Added arguments to `PRINT_IMG` (optional) and added 3 new formats
    - `px` (case-insensitive) can now be added after numeric arguments for `PRINT_IMG`, `PRINT_RECT`, and `PRINT_SPACE`
!!! info "API"

    ``` { #language-erbapi }
    PRINT_IMG src
    PRINT_IMG src, width, height, ypos
    PRINT_IMG src, srcb, width, height, ypos
    PRINT_IMG src, srcb, srcm, width, height, ypos
    ```
    Corresponds to the `<img>` tag of HTML_PRINT command
!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    
        PRINT_IMG "Normal", "Hover", (500+A) px, 100
        PRINT_SPACE 200 px

        ONEINPUT
    ```
### ![](../assets/images/IconEM.webp)Mouse Click Support in `INPUT` Family
!!! summary ""

    Added second argument to `INPUT`, `INPUTS`, `ONEINPUT`, `ONEINPUTS` (integer type, optional, default is `0`)

    Added fifth argument to `TINPUT`, `TINPUTS`, `TONEINPUT`, `TONEINPUTS` (integer type, optional, default is `0`)

    - When added argument equals `0` or omitted: Same as original version
    - When added argument does not equal `0`: Mouse clicks are treated as Enter key (assigns empty string to `RESULTS`. If button is pressed, button index is assigned to `RESULTS:1`)
    - Left click sets `RESULT:1` to `1`, right click sets `RESULT:1` to `2`
    - If ++shift++, ++ctrl++, or ++alt++ is pressed simultaneously, the key state is saved in `RESULT:2` (bits 16, 17, 18)

### ![](../assets/images/IconEM.webp)`ONEINPUT` Default Value Supports 2+ Digits/Characters
!!! summary ""

    `ONEINPUT`, `ONEINPUTS`, `TONEINPUT`, `TONEINPUTS` now support default values with 2 or more digits/characters


### ![](../assets/images/IconEE.webp)Option to Skip `INPUT` Family with Right Click
!!! summary ""

    Added third argument to `INPUT`, `INPUTS`, `ONEINPUT`, `ONEINPUTS` (integer type, optional, default is `0`)

    Added sixth argument to `TINPUT`, `TINPUTS`, `TONEINPUT`, `TONEINPUTS` (integer type, optional, default is `0`)

    - When added argument equals `0` or omitted: Same behavior as original version
    - When added argument does not equal `0`: Does not wait for input during skip via right-click, etc.
    - However, default values are still applied
    - When used together with "Mouse Click Support in INPUT Family", default values are assigned to `RESULT:1` and `RESULTS:1` respectively
    - When not used together, default values are assigned to `RESULT:0` and `RESULTS:0` as usual

### ![](../assets/images/IconEM.webp)`LOADTEXT`, `SAVETEXT` File Name Specification
!!! summary ""

    If the first argument of `LOADTEXT` or the second argument of `SAVETEXT` is a string, the respective argument is used as the path to load/save the file.
    Path is relative to `Emuera.exe` (".." is invalid).
    Also, only extensions specified in the "Extensions available for LOADTEXT and SAVETEXT" setting in the config screen or `Emuera.config` can be used (default is txt only).
    
!!! example "Example"

    ``` title="emuera.config"
    Extensions available for LOADTEXT and SAVETEXT:txt,xml,json
    ```
### ![](../assets/images/IconEM.webp)`REPLACE` Extension
!!! summary ""

    If the third argument of `REPLACE` is a string array variable and the fourth argument is non-zero, matching parts from the second argument are replaced sequentially with elements of the string array and the result is returned
    
!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    #DIMS str = "pen", "apple"
    #DIMS orig = "I have a {1}, I have an {2}, ..."

    PRINTSL REPLACE(orig, "\\{\\d+\\}", str, 1)

    ONEINPUT
    ```
    ``` title="Result"
    I have a pen, I have an apple, ...
    ```
### ![](../assets/images/IconEE.webp)Button Support in `INPUTMOUSEKEY`
!!! summary ""

    When `RESULT:0 = 1` (mouse click) during command execution, the button value is stored in `RESULT:5`.
    Also, when a button that returns a string type is pressed, the value is assigned to `RESULTS`.

### ![](../assets/images/IconEE.webp)File Name and Extension Specification in `OUTPUTLOG`
!!! summary ""

    By specifying arguments in `OUTPUTLOG`, output can be saved with that filename and extension.
    Literals are the same as `PRINTS`.
    Fixed a vulnerability in `v5fix` that allowed specifying parent directories.
    Subdirectories can still be specified.

### ![](../assets/images/IconEE.webp)Font Style Specification in `GSETFONT`
!!! summary ""

    Added optional fourth argument to specify font style using the same 4-bit number as `SETFONT` (1=bold, 2=italic, 4=strikethrough, 8=underline).

### ![](../assets/images/IconEE.webp)`GETNUM` ERD Support
!!! summary ""

    `GETNUM` now supports ERD and can have an optional third argument
    The third argument specifies the dimension of the multidimensional array, counting from the left as 1, 2, 3 (note: differs from the `VARSIZE` function specification).
    Also added a config option to make dimension specification in the `VARSIZE` function use 1, 2, 3 (same as ERD).

### ![](../assets/images/IconEM.webp)`GCLEAR` Area Specification with Color
!!! summary ""

    Added format 2: can now specify X, Y, width, and height of the area via the third to sixth arguments.

!!! info "API"
    ``` { #language-erbapi }
    1. GCLEAR GID, cARGB
    2. GCLEAR GID, cARGB, x, y, width, height
    ```

### ![](../assets/images/IconEE.webp)`GCREATEFROMFILE` Relative Path Support
!!! summary ""

    If the optional third argument is non-zero, images are referenced via relative path from Emuera.
    This allows using ERB folder, CSV folder, and custom folders.

### ![](../assets/images/Iconetc.webp)Added Alias (`Alias`) Functionality
!!! summary ""

    Added by Neo_Kesha

!!! summary ""

    Multiple identifiers can now be specified for variables such as `Talent` and `Abl`.
    Specified in `.als` extension files.

!!! info "Talent.csv"
    ```
    0, Talent1
    1, Talent2
    2, Talent3
    ```

!!! info "Talent.als"
    ```
    1, Talent2Alias
    0, MyCoolTalent
    2, Talent3Alias
    ```

!!! info "Behavior in ERB"
    ``` { #language-erbapi }
	TALENT:0:Talent1 = 15
	PRINT TALENT:0:MyCoolTalent ; Displays "15"
	TALENT:0:MyCoolTalent = 420
	PRINT TALENT:0:Talent1 ; Displays "420"
    ```

### ![](../assets/images/IconEE.webp)Special Comment Symbol "`;^;`" That Only Works in EMEE
!!! summary ""

    Lines starting with `;^;` are commented out as usual in eramaker and other versions of Emuera, but are executed only in EMEE.
