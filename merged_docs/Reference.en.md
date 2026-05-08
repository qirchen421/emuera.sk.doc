# ABS.en
---
---
hide:
  - toc
---

# ABS, SIGN

| Function name                                             | Arguments | Return |
| :-------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ABS`](./ABS.md)   | `int`     | `int`  |
| ![](../assets/images/IconEmuera.webp)[`SIGN`](./ABS.md)  | `int`     | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int ABS int
	int SIGN int
    ```
	Expression functions that return absolute value and sign respectively.
	`ABS` returns the absolute value. `SIGN` returns `-1` for negative values, `0` for zero, and `1` for positive values.


!!! hint "Hint"

    Both command and expression function forms are available.


---

# ADDCHARA.en
---
---
hide:
  - toc
---

# ADDCHARA

| Function name                                                                                                | Arguments           | Return |
| :----------------------------------------------------------------------------------------------------------- | :----------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`ADDCHARA`](./ADDCHARA.md) | `int`(, `int`,...) | none   |

!!! info "API"

    ```  { #language-erbapi }
	ADDCHARA charaNo(, charaNo,...)
    ```
    Adds the character with the specified number from the `CharaXX.csv` file.  
    In `Emuera`, multiple characters can be added at once.


!!! hint "Hint"

    Command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		;Character number 0 is "Hiroyuki" and is the protagonist.
		;Character number 3 is "Tomoko", number 5 is "Remi", and number 6 is "Kotone"
		PRINTFORML There are {CHARANUM} characters.
		ADDCHARA 3
		ADDCHARA 5
		ADDCHARA 6
		PRINTFORML There are {CHARANUM} characters.
		REPEAT CHARANUM
			PRINTFORML {COUNT}: %NAME:COUNT%
		REND
		DELCHARA 2
		PRINTFORML There are {CHARANUM} characters.
		REPEAT CHARANUM
		PRINTFORML {COUNT}: %NAME:COUNT%
			REND
	``` 
    ``` title="Result"
	There are 1 characters.
	There are 4 characters.
	0: Hiroyuki
	1: Tomoko
	2: Remi
	3: Kotone
	There are 3 characters.
	0: Hiroyuki
	1: Tomoko
	2: Kotone
    ```

### Related
* [DELCHARA](DELCHARA.md)
* [ADDVOIDCHARA](ADDVOIDCHARA.md)
* [ADDCOPYCHARA](ADDCOPYCHARA.md)


---

# ADDCOPYCHARA.en
---
---
hide:
  - toc
---

# ADDCOPYCHARA

| Function name                                                                   | Arguments | Return |
| :------------------------------------------------------------------------------ | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ADDCOPYCHARA`](./ADDCOPYCHARA.md) | `int`     | none   |

!!! info "API"

    ```  { #language-erbapi }
	ADDCOPYCHARA charaID
    ```
    Adds a new character with the same data as the character with the specified registration number. In other words, this is a variant of `ADDCHARA`.

!!! hint "Hint"

    Command only.

### Related
* [ADDCHARA](ADDCHARA.md)


---

# ADDDEFCHARA.en
---
---
hide:
  - toc
---

# ADDDEFCHARA

| Function name                                                                 | Arguments | Return |
| :----------------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ADDDEFCHARA`](./ADDDEFCHARA.md) | none      | none   |

!!! info "API"

    ```  { #language-erbapi }
	ADDDEFCHARA
    ```
    Command that performs system character addition processing at game start.  
    Adds characters defined in `chara0*.csv` and initial characters specified in `gamebase.csv`.  
    While `ADDCHARA 0` searches for and adds a character with character `NO` of `0`, `ADDDEFCHARA` adds a character by CSV number.  
    If the corresponding CSV does not exist, an empty character is created similar to `ADDVOIDCHARA`.  
    This is a command to reproduce the eramaker initialization process and cannot be used outside of `@SYSTEM_TITLE`.

!!! hint "Hint"

    Command only.


---

# ADDVOIDCHARA.en
---
---
hide:
  - toc
---

# ADDVOIDCHARA

| Function name                                                                   | Arguments | Return |
| :------------------------------------------------------------------------------ | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ADDVOIDCHARA`](./ADDVOIDCHARA.md) | none      | none   |

!!! info "API"

    ```  { #language-erbapi }
	ADDVOIDCHARA
    ```
    Command to add a character without using CSV.  
    Characters added via `ADDVOIDCHARA` have all variables initialized to `0` or empty strings.

!!! hint "Hint"

    Command only.

### Related
* [ADDCHARA](ADDCHARA.md)


---

# ALIGNMENT.en
---
---
hide:
  - toc
---

# ALIGNMENT, CURRENTALIGN

| Function name                                                                  | Arguments    | Return    |
| :----------------------------------------------------------------------------- | :----------- | :-------- |
| ![](../assets/images/IconEmuera.webp)[`ALIGNMENT`](./ALIGNMENT.md)            | `keyword`    | none      |
| ![](../assets/images/IconEmuera.webp)[`CURRENTALIGN`](./ALIGNMENT.md)         | none         | `string`  |

!!! info "API"

    ```  { #language-erbapi }
	ALIGNMENT keyword
	string CURRENTALIGN
    ```
	Aligns subsequent lines to the specified position.  
	The keyword can be one of `LEFT`, `CENTER`, or `RIGHT`.  
	Normal display is `ALIGNMENT LEFT`, aligned to the left edge.  
	`ALIGNMENT CENTER` allows centering like on title screens.  
	`ALIGNMENT` takes effect when a newline occurs.

	The current `ALIGNMENT` can be obtained with `CURRENTALIGN`.

!!! hint "Hint"

    `CURRENTALIGN` is supported as an expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		ALIGNMENT RIGHT
		PRINTFORML AAA CURRENTALIGN:%CURRENTALIGN()%
		ALIGNMENT CENTER
		PRINTFORMW BBB CURRENTALIGN:%CURRENTALIGN()%
    ``` 
	![](../assets/images/ALIGNMENT.png)


---

# ARRAYCOPY.en
---
---
hide:
  - toc
---

# ARRAYCOPY

| Function name                                                   | Arguments        | Return |
| :------------------------------------------------------------- | :--------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ARRAYCOPY`](./ARRAYCOPY.md) | `variable`, `variable` | none   |

!!! info "API"

    ```  { #language-erbapi }
	ARRAYCOPY variableName, variableName
    ```
	Implementation of the thoughtless array copy command ARRAYCOPY.  
	Format: `ARRAYCOPY <sourceVariableName>, <destinationVariableName>`  
	Description: Copies the values of the source variable to the destination variable.  
	Type variables must have the same type and same number of dimensions.  
	Also not supported for character variables.  
	If the number of elements differs, it copies as much as possible.

!!! hint "Hint"

    Command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIM HOGE, 10
		#DIM HOGE2, 10

		REPEAT 10
			HOGE:COUNT = RAND:10
			HOGE2:COUNT = RAND:10
			PRINTFORML HOGE:{COUNT}={HOGE:COUNT} HOGE2:{COUNT}={HOGE2:COUNT}
		REND


		ARRAYCOPY "HOGE", "HOGE2"

		PRINTL After copy...

		REPEAT 10
			PRINTFORML HOGE:{COUNT}={HOGE:COUNT} HOGE2:{COUNT}={HOGE2:COUNT}
		REND
		WAIT
    ``` 
    ``` title="Result"
	HOGE:0=9 HOGE2:0=3
	HOGE:1=0 HOGE2:1=3
	HOGE:2=7 HOGE2:2=0
	HOGE:3=3 HOGE2:3=3
	HOGE:4=1 HOGE2:4=3
	HOGE:5=2 HOGE2:5=0
	HOGE:6=3 HOGE2:6=9
	HOGE:7=3 HOGE2:7=3
	HOGE:8=4 HOGE2:8=9
	HOGE:9=5 HOGE2:9=2
	After copy...
	HOGE:0=9 HOGE2:0=9
	HOGE:1=0 HOGE2:1=0
	HOGE:2=7 HOGE2:2=7
	HOGE:3=3 HOGE2:3=3
	HOGE:4=1 HOGE2:4=1
	HOGE:5=2 HOGE2:5=2
	HOGE:6=3 HOGE2:6=3
	HOGE:7=3 HOGE2:7=3
	HOGE:8=4 HOGE2:8=4
	HOGE:9=5 HOGE2:9=5
    ```


---

# ARRAYMSORT.en
---
---
hide:
  - toc
---

# ARRAYMSORT

| Function name                                                                   | Arguments                | Return |
| :----------------------------------------------------------------------------- | :---------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ARRAYMSORT`](./ARRAYMSORT.md) | `variable`(, `variable`...) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	ARRAYMSORT variableName1(, variableName2,...)
    ```
	`ARRAYMSORT` sorts `variableName1` in ascending order and rearranges the arrays after `variableName2` in the same order.  
	`variableName1` must be a 1-dimensional array. `variableName2` and subsequent can accept multidimensional arrays.  
	When `variableName1` has elements with `0` or empty string, they are treated as the end of the array and subsequent elements are not sorted.  
	If the number of elements in the arrays after `variableName2` is less than the number of sorted elements in `variableName1`, the command is interrupted, assigns `0` to `RESULT:0`, and terminates.  
	If all arrays are successfully sorted, this command assigns a non-zero value to `RESULT:0` and terminates.

    ```  { #language-erbapi }
	@TEST
	#DIM ARRAY1,4
	#DIM ARRAY2,4
	#DIM ARRAY3,4,3
	ARRAY1 = 3,1,2,0
	ARRAY2 = 1001,1002,1003,0
	ARRAY3:0:0 = 1, 101, 2763
	ARRAY3:1:0 = 2, 102, 9615
	ARRAY3:2:0 = 3, 103, 7035

	ARRAYMSORT ARRAY1,ARRAY2,ARRAY3
	PRINTFORML > ARRAY1 == {ARRAY1:0},{ARRAY1:1},{ARRAY1:2},{ARRAY1:3}
	PRINTFORML > ARRAY2 == {ARRAY2:0},{ARRAY2:1},{ARRAY2:2},{ARRAY2:3}
	FOR I,0,3
		PRINTFORML > ARRAY3:{I}:0 == {ARRAY3:I:0},{ARRAY3:I:1},{ARRAY3:I:2}
	NEXT

	;;;output
	> ARRAY1 == 1,2,3,0
	> ARRAY2 == 1002,1003,1001,0
	> ARRAY3:0:0 == 2,102,9615
	> ARRAY3:1:0 == 3,103,7035
	> ARRAY3:2:0 == 1,101,2763
    ```

!!! hint "Hint"

    Command only.

### Related Items
* [ARRAYSORT](ARRAYSORT.md)


---

# ARRAYMSORTEX.en
---
---
hide:
  - toc
---

# ARRAYMSORTEX

| Function name                                                                   | Arguments                                      | Return |
| :----------------------------------------------------------------------------- | :-------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`ARRAYMSORTEX`](./ARRAYMSORTEX.md) | `string`, `ref` `string[]`(, `int`, `int`)    | `1`    |
|                                                                              | `ref` `int`, `ref` `string[]`(, `int`, `int`) | `1`    |

!!! info "API"

    ```  { #language-erbapi }
    1. 1 ARRAYMSORTEX indexName, arrayNameList(, sortAscending, size)
    2. 1 ARRAYMSORTEX indexArray, arrayNameList(, sortAscending, size)
    ```
    
    Similar to the original version of [`ARRAYMSORT`](https://osdn.net/projects/emuera/wiki/excom#h5-ARRAYMSORT.20array1.7B.2C.20array2....7D).
    
    1. Sorts the variable array represented by `indexName`, and sorts all arrays in `arrayNameList` in the same order based on this sort.
    2. Sorts `indexArray`, and sorts all arrays in `arrayNameList` in the same order based on this sort.

    If `sortAscending` is not `0` or omitted, sorts in ascending order. Otherwise, sorts in descending order. If `size` is specified, references an array of the specified size instead of ending with `0` or empty string.

!!! hint "Hint"

    Both command and expression function are supported.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        #DIM idx = 4,2,3,1
        #DIMS idxStr = "1","2","3","4"
        #DIM AA = 1,2,3,4
        #DIM BB = 5,3,1,2
        #DIMS Arrays = "idx", "AA", "BB" ; idx not included so idx won't be sorted

        ARRAYMSORTEX idx, Arrays      ; ascending
        PRINTFORML > idx == {idx},{idx:1},{idx:2},{idx:3}
        PRINTFORML > AA == {AA},{AA:1},{AA:2},{AA:3}
        PRINTFORML > BB == {BB},{BB:1},{BB:2},{BB:3}
        PRINTL
        ARRAYMSORTEX "idxStr", Arrays, 0   ; descending
        PRINTFORML > idxStr == %idxStr%,%idxStr:1%,%idxStr:2%,%idxStr:3%
        PRINTFORML > AA == {AA},{AA:1},{AA:2},{AA:3}
        PRINTFORML > BB == {BB},{BB:1},{BB:2},{BB:3}

        ONEINPUT
    ``` 
    ``` title="Result"
    > idx == 1,2,3,4
    > AA == 4,2,3,1
    > BB == 2,3,1,5
    
    > idxStr == 1,2,3,4
    > AA == 1,3,2,4
    > BB == 5,1,3,2
    ```

### Related Items
* [ARRAYSORT](ARRAYSORT.md)


---

# ARRAYREMOVE.en
---
---
hide:
  - toc
---

# ARRAYREMOVE

| Function name                                                                   | Arguments               | Return |
| :------------------------------------------------------------------------------- | :--------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ARRAYREMOVE`](./ARRAYREMOVE.md) | `variable`, `int`, `int` | none   |

!!! info "API"

    ```  { #language-erbapi }
	ARRAYREMOVE variableName, startIndex, clearCount
    ```
	Implementation of the ARRAYREMOVE command for partial deletion of array elements.  
	Format: `ARRAYREMOVE <targetVariable>, <startIndex>, <numberOfElementsToRemove>`  
	Description: Deletes the specified number of elements from the array variable starting at the specified index, and compresses the remaining elements.  
	If the number of elements to remove is 0 or less, all elements from the start index are cleared.

!!! hint "Hint"

    Command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIM HOGE, 10
		#DIM HOGE2, 10

		REPEAT 10
			HOGE:COUNT = COUNT
			HOGE2:COUNT = COUNT
		REND

		ARRAYREMOVE HOGE, 4, 3
		ARRAYREMOVE HOGE2, 6, -1

		REPEAT 10
			PRINTFORML HOGE:{COUNT}={HOGE:COUNT} HOGE2:{COUNT}={HOGE2:COUNT}
		REND
		WAIT
    ``` 
    ``` title="Result"
	HOGE:0=0 HOGE2:0=0
	HOGE:1=1 HOGE2:1=1
	HOGE:2=2 HOGE2:2=2
	HOGE:3=3 HOGE2:3=3
	HOGE:4=7 HOGE2:4=4
	HOGE:5=8 HOGE2:5=5
	HOGE:6=9 HOGE2:6=0
	HOGE:7=0 HOGE2:7=0
	HOGE:8=0 HOGE2:8=0
	HOGE:9=0 HOGE2:9=0
    ```


---

# ARRAYSHIFT.en
---
---
hide:
  - toc
---

# ARRAYSHIFT

| Function name                                                                   | Arguments                                 | Return |
| :------------------------------------------------------------------------------- | :---------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ARRAYSHIFT`](./ARRAYSHIFT.md) | `variable`, `int`, `value`(, `int`, `int`) | none   |

!!! info "API"

    ```  { #language-erbapi }
	ARRAYSHIFT variable, shiftCount, value(, startIndex, targetCount)
    ```
	Implementation of the ARRAYSHIFT command for shifting an array.  
	Format: `ARRAYSHIFT <targetVariable>, <shiftCount>, <initialValueOfCreatedBlankArea>{, <startIndexOfShiftedArrayRange>, <numberOfElementsInShiftedArrayRange>}`  
	Description: Shifts the array variable by the specified amount. Positive values shift toward larger indices, negative values shift toward smaller indices.  
	Values that exceed the array range are discarded, and the blank area created by the shift is filled with the value specified in the second argument.  
	Using the optional 4th and 5th arguments allows shifting only a portion of the range.

!!! hint "Hint"

    Command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIM HOGE, 10
		#DIM HOGE2, 10

		REPEAT 10
			HOGE:COUNT = COUNT
			HOGE2:COUNT = COUNT
		REND

		ARRAYSHIFT HOGE, 3, -1
		ARRAYSHIFT HOGE2, 3, -1, 5, 5

		REPEAT 10
			PRINTFORML HOGE:{COUNT}={HOGE:COUNT} HOGE2:{COUNT}={HOGE2:COUNT}
		REND
		WAIT
    ``` 
    ``` title="Result"
	HOGE:0=-1 HOGE2:0=0
	HOGE:1=-1 HOGE2:1=1
	HOGE:2=-1 HOGE2:2=2
	HOGE:3=0 HOGE2:3=3
	HOGE:4=1 HOGE2:4=4
	HOGE:5=2 HOGE2:5=-1
	HOGE:6=3 HOGE2:6=-1
	HOGE:7=4 HOGE2:7=-1
	HOGE:8=5 HOGE2:8=5
	HOGE:9=6 HOGE2:9=6
    ```


---

# ARRAYSORT.en
---
---
hide:
  - toc
---

# ARRAYSORT

| Function name                                                   | Arguments                              | Return |
| :------------------------------------------------------------- | :------------------------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`ARRAYSORT`](./ARRAYSORT.md) | `variable`(, `sortFormat`, `int`, `int`) | none   |

!!! info "API"

    ```  { #language-erbapi }
	ARRAYSORT variableName(, FORWARD or BACK, startIndex, targetCount)
    ```
	Implementation of the ARRAYSORT command for sorting array variables.  
	Format: `ARRAYSORT` \[targetVariable\](, \[sortOrder (FORWARD or BACK)\], \[startIndex\], \[targetCount\])  
	Description: Sorts the array data starting from the start index for the specified number of elements.  
	`FORWARD` sorts in ascending order, `BACK` sorts in descending order.

!!! hint "Hint"

    Command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIM HOGE, 10
		#DIM HOGE2, 10

		REPEAT 10
			HOGE:COUNT = RAND:10
			HOGE2:COUNT = COUNT
			PRINTFORML HOGE:{COUNT}={HOGE:COUNT} HOGE2:{COUNT}={HOGE2:COUNT}
		REND


		ARRAYSORT HOGE
		ARRAYSORT HOGE2, BACK, 4, 4

		PRINTL After sort...

		REPEAT 10
			PRINTFORML HOGE:{COUNT}={HOGE:COUNT} HOGE2:{COUNT}={HOGE2:COUNT}
		REND
		WAIT
    ``` 
    ``` title="Result"
	HOGE:0=9 HOGE2:0=0
	HOGE:1=9 HOGE2:1=1
	HOGE:2=0 HOGE2:2=2
	HOGE:3=8 HOGE2:3=3
	HOGE:4=3 HOGE2:4=4
	HOGE:5=8 HOGE2:5=5
	HOGE:6=6 HOGE2:6=6
	HOGE:7=7 HOGE2:7=7
	HOGE:8=5 HOGE2:8=8
	HOGE:9=1 HOGE2:9=9
	After sort...
	HOGE:0=0 HOGE2:0=0
	HOGE:1=1 HOGE2:1=1
	HOGE:2=3 HOGE2:2=2
	HOGE:3=5 HOGE2:3=3
	HOGE:4=6 HOGE2:4=7
	HOGE:5=7 HOGE2:5=6
	HOGE:6=8 HOGE2:6=5
	HOGE:7=8 HOGE2:7=4
	HOGE:8=9 HOGE2:8=8
	HOGE:9=9 HOGE2:9=9
    ```

### Related Items
* [ARRAYMSORT](ARRAYMSORT.md)
* [ARRAYMSORTEX](ARRAYMSORTEX.md)


---

# ASSERT.en
---
---
hide:
  - toc
---

# ASSERT

| Function name                                                       | Arguments  | Return |
| :----------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ASSERT`](./ASSERT.md) | `int` | none   |

!!! info "API"

    ```  { #language-erbapi }
	ASSERT bool
    ```
	`DEBUG` commands only operate when launched in [debug mode](../Emuera/debug.md).  
	In non-debug mode, nothing is done.  
	In non-debug mode, argument parsing is also not performed, so even if there are issues with the <formedString>, no error will occur.  

	`ASSERT` does nothing when the argument is true (non-zero).  
	When the argument is false (zero), it outputs an error and stops script execution.

!!! hint "Hint"

    Only commands are supported.

### See Also
* [THROW](THROW.md)



---

# AWAIT.en
---
---
hide:
  - toc
---

# AWAIT

| Function name                                                     | Arguments | Return |
| :--------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`AWAIT`](./AWAIT.md) | `int` | none  |

!!! info "API"

    ```  { #language-erbapi }
	AWAIT milliSecond
    ```
	Temporarily stops ERB execution and performs Windows processing.  
	If an argument is specified, it waits for the specified number of milliseconds.  
	The `AWAIT` command interrupts Emuera's infinite loop warning and prevents Emuera's process from becoming "Not Responding".  
	Use this when performing time-consuming operations.  
	However, since the `AWAIT` command itself takes a considerable amount of execution time, running it too frequently will slow things down.  
	Also, to avoid alarming the user, it is recommended to periodically display the progress of work, for example as shown below:
    ```  { #language-erbapi }
	REDRAW 0
	FOR LCNT, 0, 100
		PRINTSL "Working... " + TOSTR(LCNT) + "% complete"
		AWAIT 
		CLEARLINE 1
		;Time-consuming processing
	NEXT
    ```

!!! hint "Hint"

    Only commands are supported.

### See Also
* [WAIT](WAIT.md)
* [TWAIT](TWAIT.md)


---

# BACKGROUND.en
---
---
hide:
  - toc
---

# BACKGROUND Operation

Added by Neo_Kesha

| Function name                                                               | Arguments                     | Return |
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

---

# BAR.en
---
---
hide:
  - toc
---

# BAR(L)

| Function name                                                  | Arguments         | Return |
| :------------------------------------------------------------- | :---------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`BAR`](./BAR.md)     | `int`, `int`, `int`  | none   |
| ![](../assets/images/Iconeramaker.webp)[`BARL`](./BAR.md)    | `int`, `int`, `int`  | none   |

!!! info "API"

    ```  { #language-erbapi }
	BAR value, maxValue, length
    ```
    Draws a bar graph representing the ratio of the first argument to the second argument. The third argument sets the length of the graph.  
	`BAR` does not add a newline after displaying, while `BARL` adds a newline.


!!! hint "Hint"

    Command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		BAR 2, 10, 20
		PRINTL (2/10)
		BARL 114, 514, 81
    ``` 
    ``` title="Result"
	[****................](2/10)
	[*****************................................................................]
    ```

### Related
* [BARSTR](BARSTR.md)


---

# BARSTR.en
---
---
hide:
  - toc
---

# BARSTR

| Function name                                                    | Arguments          | Return   |
| :--------------------------------------------------------------- | :----------------- | :--------|
| ![](../assets/images/IconEmuera.webp)[`BARSTR`](./BARSTR.md)   | `int`, `int`, `int` | `string`|

!!! info "API"

    ```  { #language-erbapi }
	string BARSTR value, maxValue, length
    ```
	Returns in `RESULTS:0` the same string that would be displayed by the [`BAR`](./BAR.md) command with the same arguments.

!!! hint "Hint"

    Command and expression function both supported.

### Related
* [BAR](BAR.md)


---

# BEGIN.en
---
---
hide:
  - toc
---

# BEGIN

| Function name                                                   | Arguments      | Return |
| :------------------------------------------------------------- | :------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`BEGIN`](./BEGIN.md) | `idenetifier` | none   |

!!! info "API"

    ```  { #language-erbapi }
	BEGIN identifier
    ```
	`BEGIN` advances the game by calling various system commands.  
	When `BEGIN` is called, the currently executing function ends. Even if called from somewhere via `CALL`, it will not return to the original function.

	`BEGIN TRAIN` starts training.  
	`BEGIN AFTERTRAIN` ends training.  
	`BEGIN ABLUP` calls the ability up screen.  
	`BEGIN TURNEND` ends the current turn.  
	`BEGIN SHOP` calls `SHOP`.

	In Emuera, the keywords `FIRST` and `TITLE` have been added.  
	`BEGIN FIRST` has the same effect as selecting "[0] Start from the beginning" on the title screen, executing the event function `@EVENTFIRST`.  
	`BEGIN TITLE` returns to the title screen.  
	Neither initializes variables, so please execute [`RESETDATA`](./RESETDATA.md) as needed.

!!! hint "Hint"

    Commands only.

### See Also
* [FORCE_BEGIN](FORCE_BEGIN.md)
* [FLOWINPUT](FLOWINPUT.md)
* [CALLEVENT](CALLEVENT.md)


---

# BINPUT.en
---
---
hide:
  - toc
---

# BINPUT(S)

| Function name                                                      | Arguments                    | Return    |
| :----------------------------------------------------------------- | :-------------------------- | :-------- |
| ![](../assets/images/IconEE.webp)[`BINPUT`](./BINPUT.md)           | (`int`, `int`, `int`)      | `int`     |
| ![](../assets/images/IconEE.webp)[`BINPUTS`](./BINPUT.md)         | (`string`, `int`, `int`)   | `string`  |

!!! info "API"

    ``` { #language-erbapi }
	BINPUT (defaultValue, AllowClick, CanSkip)
	BINPUTS (defaultValue, AllowClick, CanSkip)
    ```

    An INPUT(S) that only accepts values that are currently buttonized.  
    Since it is "only accepts buttonized values" rather than "only accepts button input", it is possible to reject unexpected values while supporting both keyboard and mouse operations.  
    If there are no buttons, it proceeds without waiting for input and puts the default value into RESULT(S). If there is no default value either, it causes an error.  
    The arguments follow the same specification as EM+EE's INPUT extension.  


!!! hint "Hint"

    Since it is a command, it cannot be used as an expression function.

### See Also
* [INPUT](INPUT.md)


---

# BIT_OPERATION.en
---
---
hide:
  - toc
---

# BIT Operation

| Function name                                                                  | Arguments                               | Return |
| :----------------------------------------------------------------------------- | :------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETBIT`](./BIT_OPERATION.md)            | `int`, `int`                           | `int`  |
| ![](../assets/images/IconEmuera.webp)[`SETBIT`](./BIT_OPERATION.md)            | `integerVariable`, `int`(, `int`...)   | none   |
| ![](../assets/images/IconEmuera.webp)[`CLEARBIT`](./BIT_OPERATION.md)          | `integerVariable`, `int`(, `int`...)   | none   |
| ![](../assets/images/IconEmuera.webp)[`INVERTBIT`](./BIT_OPERATION.md)        | `integerVariable`, `int`(, `int`...)   | none   |

!!! info "API"

    ```  { #language-erbapi }
	int GETBIT targetInt, bit
	SETBIT integerVariable, bit(, bit...)
	CLEARBIT integerVariable, bit(, bit...)
	INVERTBIT integerVariable, bit(, bit...)
    ```
	Bit manipulation functions.

	`GETBIT` retrieves a specific bit of the first argument.
	Specify the target number as the first argument and the bit position to retrieve as the second argument. The second argument accepts values from `0` to `63`. Specifying a value outside this range results in an error.
	When the second argument is a constant, for example `5`:

    ```  { #language-erbapi }
	GETBIT X, 5
	RESULT = (X & 1p5) != 0
	```
	
	Both lines produce the same result.

	`SETBIT`, `CLEARBIT`, and `INVERTBIT` manipulate the bits at the positions specified by the second and subsequent arguments in the variable specified by the first argument.
	`SETBIT` sets the bit to `1`, `CLEARBIT` sets it to `0`, and `INVERTBIT` inverts it.

    ```  { #language-erbapi }
	SETBIT X, A
	CLEARBIT Y, B
	INVERTBIT Z, C
    ```

	The results above are equivalent to:

    ```  { #language-erbapi }
	X |= 1 << A
	Y &= ~(1 << B)
	Z ^= 1 << C
    ```

	These formats also correspond to `GETBIT`.
	Bits changed with `SETBIT X, A` can be referenced with `GETBIT(X, A)`.

!!! hint "Hint"

    Expression function forms are available for all except `SETBIT`.

### Related
* [System Modification Q&A>Binary Bit Operations](../manual/erawiki-modification-QandA.md#2stain)
* [ERB Creation Practice>About Bit Numbers](../manual/erawiki-ERBmanual.md#_7)


---

# BITMAP_CACHE_ENABLE.en
---
---
hide:
  - toc
---

# BITMAP_CACHE_ENABLE

Author: JukesBouver99

| Function name                                                | Arguments  | Return |
| :----------------------------------------------------------- | :---------| :------|
| ![](../assets/images/Iconetc.webp)[`BITMAP_CACHE_ENABLE`](./BITMAP_CACHE_ENABLE.md) | `int` | void   |

!!! info "API"

    ```  { #language-erbapi }
	BITMAP_CACHE_ENABLE bool
    ```
    
	Accelerates drawing by rendering frequently color-changing text as bitmaps.  
	When enabled, it applies to all subsequent lines. You can expect speedup by wrapping heavy processing sections with `BITMAP_CACHE_ENABLE 1` and `BITMAP_CACHE_ENABLE 0`.

	When this feature is enabled, text display positions may shift.

!!! hint "Hint"

    Command and expression function both supported.


---

# CALL.en
---
---
hide:
  - toc
---

# CALL

| Function name | Arguments | Return |
| :--------------------------------------------------------- | :------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`CALL`](./CALL.md) | `functionName` | `void` |

!!! info "API"

	``` { #language-erbapi }
	CALL funcName
	```

	Calls a function defined with a string starting with `@`  
	When the function reaches its end or executes [`RETURN`](./RETURN.md), the function ends and control returns to the line that executed `CALL`  
	If `RETURN` is executed, its argument is stored in `RESULT`; if the function reaches its end, `0` is stored in `RESULT`

!!! hint "Hint"

	Only available as a statement.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		CALL AAA
		PRINTFORML {RESULT}
		CALL BBB
		PRINTFORML {RESULT}
		WAIT
	
	@AAA
		PRINTL Here is @AAA
		RETURN 123
	
	@BBB
		PRINTL Here is @BBB
	```

	``` title="Result"
	Here is @AAA
	123
	Here is @BBB
	0
	```

### Related
- [CALLFORM](FORM.md)
- [TRYCALLFORM](TRYFORM.md)
- [EXISTFUNCTION](EXISTFUNCTION.md)


---

# CALLEVENT.en
---
---
hide:
  - toc
---

# CALLEVENT

| Function name | Arguments | Return |
| :----------------------------------------------------------------- | :------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CALLEVENT`](./CALLEVENT.md) | `functionName` | none   |

!!! info "API"

    ```  { #language-erbapi }
	CALLEVENT eventFunction
    ```
	Calls an event function as an event function.  
	Arguments cannot be passed.  
	Also cannot be used within an event function or in functions called from an event function.

!!! hint "Hint"

    Only available as a statement.


---

# CALLF.en
---
---
hide:
  - toc
---

# CALLF, CALLFORMF

| Function name | Arguments | Return |
| :------------------------------------------------------------- | :------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CALLF`](./CALLF.md)     | `functionName` | none   |
| ![](../assets/images/IconEmuera.webp)[`CALLFORMF`](./CALLF.md) | `formedString` | none   |

!!! info "API"

    ```  { #language-erbapi }
	CALLF functionName
	CALLFORMF formedString
    ```
	From the private modification update history:

		Implemented CALLF and CALLFORMF commands that call in-expression functions while ignoring the return value
		Format: CALLF functionName, argument1, ...
			(Although it's an in-expression function, call it with regular function argument syntax)
		Behavior: Calls in-expression functions as regular functions; the return value is discarded
		I wanted to make a pseudo-SETTER, but now I'm regretting it

	Of course, RESULT and RESULTS remain unchanged unless the called in-expression function modifies them within itself.  
	Related commands in EM+EE include [`TRYCALLF`](./TRYCALLF.md) and [`TRYCALLFORMF`](./TRYCALLFORMF.md).

!!! hint "Hint"

    Only available as a statement.

### Related
* [TRYCALLF](TRYCALLF.md)
* [TRYCALLFORMF](TRYCALLFORMF.md)
* [EXISTFUNCTION](EXISTFUNCTION.md)
* [In-expression functions](../Emuera/in_expression_function.md)


---

# CALLSHARP.en
---
---
hide:
  - toc
---

# CALLSHARP

Added by Neo_Kesha

| Function name                                                          | Arguments           | Return |
| :-------------------------------------------------------------- | :------------- | :----- |
| ![](../assets/images/Iconetc.webp)[`CALLSHARP`](./CALLSHARP.md) | `functionName` |        |

!!! info "API"

	``` { #language-erbapi }
	CALLSHARP funcName
	```

	C# Plugins
	
	You can write C# Plugins for EmuEra when EraBasic is not enough.  
	To add Plugin, create `plugins/` folder at your Emuera installation folder and put DLL file of plugin there.  
	Make sure to also include a note to add a `pluginsAware.txt` file to the folder where Emuera.exe resides, else there will be a crash on start up.

	How to create Plugins (Simple example at [https://gitlab.com/EvilMask/emuera.em/-/tree/master/EmueraPluginExample](https://gitlab.com/EvilMask/emuera.em/-/tree/master/EmueraPluginExample))
	
	1. Clone\Fork [EmuEra repository](https://gitlab.com/EvilMask/emuera.em)  
	2. Open project at Visual Studio  
	3. Add new Project to solution. Make it Class Librarry  
	4. Add EmuEra as dependency project  
	5. Create .cs file e.g. "Manifest.cs"  
	6. Create class named exactly PluginManifest that inherits PluginManifestAbstract  
	7. PluginName, PluginDescription, PluginAuthor and PluginVersion fields are optional and have no use yet.  
	8. Create .cs file e.g. "MyCoolCode.cs"  
	9. Each method is a class inherited from IPluginMethod  
	10. Create class e.g. MyCoolNativeMethod : IPluginMethod  
	11. Override "Name" field. This will be method name that will be used by ERB interpreter to find your Method. E.g. "MyCoolMethod1"  
	12. Override Execute method with your code.  
	13. In the constructor of PluginManifest, add your class to methods list with   
	```methods.Add(new MyCoolNativeMethod ())```  
	14. Use CALLSHARP MyCoolMethod1() to call your native code from ERB  


	## Arguments

	You can pass arguments from ERB to Plugin and from Plugin to ERB. If you pass variable as an argument, you will be able to change it's value from Plugin  
	Execute method recieves arguments as array of PluginMethodParameter. It can either be string, or int.  
	Extended example (example based on [https://gitlab.com/EvilMask/emuera.em/-/tree/master/EmueraPluginExample](https://gitlab.com/EvilMask/emuera.em/-/tree/master/EmueraPluginExample)):  

	```c#
       public void Execute(PluginMethodParameter[] args)
        {
            //Unpack your variables
            var characterId = args[0].intValue;
            var characterName = args[1].strValue;
            //Call code
            var result = SET_CHAR_NAME(characterId, characterName);
            //Update return values
            if (args.Length > 2) {
              args[2].intValue = result;
            }
        }
      
      internal static int SET_CHAR_NAME(int charId, string charName) {
        //Do code
      }
	```

	## Plugin API
	Plugin system have PluginManager call, that acts as an API to proxy useful features of EmuEra to plugins.

	```c#
	var api = PluginManager.GetInstance();
	```

	You can call basic system calls such as

	```c#
	api.Print("Hiiiii");
	```

	You can work with variables:

	```c#
	api.FLAG[intKey] = 11;
	api.FLAG[strKey] = 15; //Access by string is much slower than by int ID.
	api.FLAG[FlagsEnum.CoolFlagIUseALot] = 17; //Use enums instead of strings
	```

	You can work with Character variables using  PluginAPICharContext 

	```c#
	PluginAPICharContext ctx = api.CreateCharContext(charId);
	for (int i = 1; i <= 24; ++i)
	{
	ctx.CFLAG[200 + i] = ctx.EQUIP[i];
	}
	ctx.UserDefined["UDArray", 0] = 13;
	```


---

# CALLTRAIN.en
---
---
hide:
  - toc
---

# CALLTRAIN

| Function name                                                       | Arguments | Return |
| :----------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CALLTRAIN`](./CALLTRAIN.md) | `int` | none   |

!!! info "API"

    ```  { #language-erbapi }
	CALLTRAIN comCount
    ```
	Sequential command execution command.  
	Pre-assign command numbers to `SELECTCOM:(1～)`, then execute with the number of commands to execute as the argument.

    ```  { #language-erbapi }
	SELECTCOM:1 = XXX
	SELECTCOM:2 = YYY
	　　　·
	　　　·
	　　　·
	SELECTCOM:N = ZZZ

	CALLTRAIN (number of commands set)
    ```
	Like normal command execution, it calls `SHOW_STATUS` and `SHOW_USERCOM`, but the display of `TRAIN` commands and `USERCOM` is not shown.  
	If you really want to display `USERCOM`, you can use [`NOSKIP～ENDNOSKIP`](./SKIP_RELATE.md).  
	After automatic execution by `CALLTRAIN` ends, the system function `@CALLTRAINEND` is called.  
	However, note that `@CALLTRAINEND` is not an event function and cannot be overloaded.  
	The command numbers used for specifying commands are the values specified in `TRAIN.CSV`, not the in-game values.

!!! hint "Hint"

    Commands only.

### See Also
* [DOTRAIN](DOTRAIN.md)
* [STOPCALLTRAIN](STOPCALLTRAIN.md)


---

# CARRAY.en
---
---
hide:
  - toc
---

# SUMCARRAY, CMATCH, MAXCARRAY, MINCARRAY

| Function name                                                    | Arguments                             | Return |
| :-------------------------------------------------------------- | :----------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SUMCARRAY`](./CARRAY.md) | `charaArray`(, `int`, `int`)         | `int`  |
| ![](../assets/images/IconEmuera.webp)[`CMATCH`](./CARRAY.md)    | `charaArray`, `any`(, `int`, `int`) | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MAXCARRAY`](./CARRAY.md) | `charaArray`(, `int`, `int`)         | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MINCARRAY`](./CARRAY.md) | `charaArray`(, `int`, `int`)         | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SUMCARRAY charaArray(, start, end)
	int CMATCH charaArray, value(, start, end)
	int MAXCARRAY charaArray(, start, end)
	int MINCARRAY charaArray(, start, end)
    ```
	Variations of [`SUMARRAY`](./SUMARRAY.md), [`MATCH`](./MATCH.md), [`MAXARRAY`](./MAXMINARRAY.md), and [`MINARRAY`](./MAXMINARRAY.md) that scan across characters.  
	`charaArray` must be a character array variable.  
	`start` and `end` are specified by character registration numbers.  
	For example, `RESULT = SUMCARRAY(CFLAG:2, A, B)` can also be written as:  
	(`B` must be less than `CHARANUM`)

		RESULT = 0
		FOR COUNT, A, B
			RESULT += CFLAG:COUNT:2
		REND

!!! hint "Hint"

    Both command and expression function forms are available.


---

# CBGCLEAR.en
---
---
hide:
  - toc
---

# CBGCLEAR

| Function name                                                  | Arguments | Return |
| :------------------------------------------------------------ | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGCLEAR`](./CBGCLEAR.md) | none      | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBGCLEAR
    ```
	Clears all background image settings set by CBG commands (commands beginning with `CBG`).

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [CBGSETG](CBGSETG.md)
- [CBGSETSPRITE](CBGSETSPRITE.md)


---

# CBGCLEARBUTTON.en
---
---
hide:
  - toc
---

# CBGCLEARBUTTON

| Function name                                                          | Arguments | Return |
| :-------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGCLEARBUTTON`](./CBGCLEARBUTTON.md) | none      | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBGCLEARBUTTON
    ```
	Clears the button settings set by the [`CBGSETBUTTONSPRITE`](./CBGSETBUTTONSPRITE.md) command.

!!! hint "Hint"

    Both command and expression function supported.


---

# CBGREMOVEMAPB.en
---
---
hide:
  - toc
---

# CBGREMOVEMAPB

| Function name                                                        | Arguments | Return |
| :------------------------------------------------------------------ | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGREMOVEMAPB`](./CBGREMOVEMAPB.md) | none      | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBGREMOVEMAPB
    ```
	Clears the button map setting set by the [`CBGSETBMAPG`](./CBGSETBMAPG.md) command.

!!! hint "Hint"

    Both command and expression function supported.


---

# CBGREMOVERANGE.en
---
---
hide:
  - toc
---

# CBGREMOVERANGE

| Function name                                                          | Arguments        | Return |
| :-------------------------------------------------------------------- | :--------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGREMOVERANGE`](./CBGREMOVERANGE.md) | `int`, `int`    | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBGREMOVERANGE zMin, zMax
    ```
	Clears the settings for images set by [`CBGSETG`](./CBGSETG.md), [`CBGSETSPRITE`](./CBGSETSPRITE.md), and [`CBGSETBUTTONSPRITE`](./CBGSETBUTTONSPRITE.md) commands where the Z depth is between `zMin` and `zMax` (inclusive).

!!! hint "Hint"

    Both command and expression function supported.


---

# CBGSETBMAPG.en
---
---
hide:
  - toc
---

# CBGSETBMAPG

| Function name                                                    | Arguments | Return |
| :-------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGSETBMAPG`](./CBGSETBMAPG.md) | `int`     | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBGSETBMAPG gID
    ```
	Sets the `Graphics` specified by `gID` as the button map for the client area.  
	The button map set here affects the [`CBGSETBUTTONSPRITE`](./CBGSETBUTTONSPRITE.md) command and the [`INPUTMOUSEKEY`](./INPUTMOUSEKEY.md) command.  
	The button map image is not displayed, but is positioned with the screen bottom-left aligned to the image bottom-left, similar to the image set by the [`CBGSETG`](./CBGSETG.md) command.  
	The color of the button map image under the mouse cursor is recognized as the button value.  
	However, if the alpha value of the color is not 255 (i.e., transparent or semi-transparent), it is not recognized as a button value.

!!! hint "Hint"

    Both command and expression function supported.


---

# CBGSETBUTTONSPRITE.en
---
---
hide:
  - toc
---

# CBGSETBUTTONSPRITE

| Function name                                                                                 | Arguments                                              | Return |
| :-------------------------------------------------------------------------------------------- | :----------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGSETBUTTONSPRITE`](./CBGSETBUTTONSPRITE.md) | `int`, `string`, `string`, `int`, `int`, `zDepth`           | `int`  |
|                                                                                                | `int`, `string`, `string`, `int`, `int`, `zDepth`, `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBGSETBUTTONSPRITE button, spriteName, spriteNameB, x, y, zDepth
	int CBGSETBUTTONSPRITE button, spriteName, spriteNameB, x, y, zDepth, tooltip
    ```
	Sets selectable buttons in conjunction with the button map set by the [`CBGSETBMAPG`](./CBGSETBMAPG.md) command.  
	When the `0xRRGGBB` value of the button map image color under the mouse equals the `button` argument, the sprite specified by `spriteNameB` is displayed; otherwise, the sprite specified by `spriteName` is displayed.  
	`spriteName` or `spriteNameB` can be an empty string, in which case nothing is displayed when not selected or when selected, respectively.  
	For `x, y, zDepth`, see [`CBGSETSPRITE`](./CBGSETSPRITE.md). Note that the reference position `(x,y) = (0,0)` is the position where the screen bottom-left aligns with the image bottom-left.  
	Optionally, you can specify a tooltip string to be displayed when the button is selected via `tooltip`.  
	Multiple `CBGSETBUTTONSPRITE` commands can be assigned to the same `button` value, and the buttons do not need to match the button positions.  
	In such cases, for tooltips, the tooltip string with the highest `zDepth` (drawn first, appearing furthest back) is displayed priority, regardless of the image's `x, y` position.

!!! hint "Hint"

    Both command and expression function supported.


---

# CBGSETG.en
---
---
hide:
  - toc
---

# CBGSETG

| Function name                                                | Arguments              | Return |
| :---------------------------------------------------------- | :--------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGSETG`](./CBGSETG.md) | `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBGSETG gID, x, y, zDepth
    ```
	Sets the `Graphics` specified by `gID` to be displayed in the client area.  
	When `x` and `y` are both 0, the image is displayed with the bottom-left of the client area aligned to the bottom-left of the image.  
	`x` is positive to the right, `y` is positive downward, and `zDepth` is positive toward the back of the screen.  
	Specify a non-zero value for `zDepth`. Normal text drawing corresponds to `zDepth==0`; if `zDepth` is negative, it will be drawn in front of the text.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [CBGSETSPRITE](CBGSETSPRITE.md)
- [CBGCLEAR](CBGCLEAR.md)


---

# CBGSETSPRITE.en
---
---
hide:
  - toc
---

# CBGSETSPRITE

| Function name                                                      | Arguments                 | Return |
| :--------------------------------------------------------------- | :------------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGSETSPRITE`](./CBGSETSPRITE.md) | `string`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBGSETSPRITE, spriteName, x, y, zDepth
    ```
	Sets the sprite with the resource name specified by `spriteName` to be displayed in the client area.  
	When `x` and `y` are both 0, the image is displayed with the bottom-left of the client area aligned to the bottom-left of the image.  
	`x` is positive to the right, `y` is positive downward, and `zDepth` is positive toward the back of the screen.  
	Specify a non-zero value for `zDepth`. Normal text drawing corresponds to `zDepth==0`; if `zDepth` is negative, it will be drawn in front of the text.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [CBGSETG](CBGSETG.md)
- [CBGCLEAR](CBGCLEAR.md)


---

# CHARATU.en
---
---
hide:
  - toc
---

# CHARATU

| Function name                                                   | Arguments       | Return   |
| :------------------------------------------------------------- | :-------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`CHARATU`](./CHARATU.md) | `string`, `int` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string CHARATU string, position
    ```
	Expression function that retrieves the character at the specified position in a string. The processing uses Unicode.  

	Example:
		CHARATU(<sourceString>, [characterPosition])
	This function gets the character at the specified position in the string.

!!! hint "Hint"

    Supported as both command and expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIMS HOGES = "いろはにほ"

		REPEAT 5
			PRINTFORML %CHARATU(HOGES, COUNT)%
		REND
		WAIT
    ``` 
    ``` title="Result"
	い
	ろ
	は
	に
	ほ
    ```

### See Also
- [SUBSTRING](SUBSTRING.md)


---

# CHKCHARADATA.en
---
---
hide:
  - toc
---

# CHKCHARADATA

| Function name                                                         | Arguments | Return |
| :-------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CHKCHARADATA`](./CHKCHARADATA.md) | `string`  | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CHKCHARADATA filename
    ```
    Returns information about the file with the filename indicated by `chara_*.dat` in the dat folder.  
    Returns 0 if loadable, and non-zero if unable to load for some reason.  
    Also, when loadable, assigns the save data memo to `RESULTS:0`, and when not loadable, assigns the reason to `RESULTS:0`.  


!!! hint "Hint"

    Command and expression function both supported.

### See Also
- [SAVECHARA](SAVECHARA.md)
- [LOADCHARA](LOADCHARA.md)


---

# CHKDATA.en
---
---
hide:
  - toc
---

# CHKDATA

| Function name                                                     | Arguments | Return |
| :---------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CHKDATA`](./CHKDATA.md) | `int`     | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CHKDATA saveID
    ```
    Gets information about the save data file with the number specified by `saveID` and stores it in `RESULT:0` and `RESULTS:0`.  
    `RESULT:0` can have the following values. Only when it is `0` can the file be loaded.  

    - 0 - This file can be loaded.
    - 1 - The specified file does not exist.
    - 2 - The game code is different (data with different `code` value from [gamebase.csv](../Emuera/variables.md#gamebasecsv)).
    - 3 - The version is different (data with different `version` value from [gamebase.csv](../Emuera/variables.md#gamebasecsv), and is not an accepted version).
    - 4 - There is some other problem with the file.

    When `RESULT:0` is `0`, `RESULTS:0` contains the save data comment (the string entered via [`PUTFORM`](./PUTFORM.md) in `@SAVEINFO`, or the second argument of [`SAVEDATA`](./SAVEDATA.md)).  
    When `RESULT:0` is not `0`, `RESULTS:0` contains an error message such as "Save data version is different".  
    Also, if `CHKDATA` is called at a timing that is not in the middle of assigning a value to `RESULT:0` (e.g., `RESULT:0 = CHKDATA(LOCAL)`),  
    `RESULT:0` is assigned the save data timestamp (e.g., if the timestamp is March 28, 2009 13:05:23.678, then `RESULT = 20090328130523678`).  


!!! hint "Hint"

    Command and expression function both supported.

### See Also
- [SAVEDATA](SAVEDATA.md)
- [LOADDATA](LOADDATA.md)
- [FIND_CHARADATA](FIND_CHARADATA.md)


---

# CLEARLINE.en
---
---
hide:
  - toc
---

# CLEARLINE

| Function name                                                             | Arguments | Return   |
| :------------------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/Iconeramaker.webp)[`CLEARLINE`](./CLEARLINE.md) | `int`     | none     |

!!! info "API"

    ```  { #language-erbapi }
	CLEARLINE line
    ```
	Deletes the specified number of lines (counting method is the same as `LINECOUNT`).
	A line is counted as from a newline by [`PRINTL`](./PRINT.md) etc. until the next newline.
	Note that long strings split across multiple lines are treated as a single line, so be careful.

!!! hint "Hint"

    Both command and expression function are supported.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTL SSS
		PRINTL OOO
		PRINTL UUU
		PRINTL NNN
		PRINTL DDD
		PRINTL VVV
		PRINTL OOO
		PRINTL LLL
		PRINTL TTT
		CLEARLINE 8
		PRINTL EEE
		PRINTW XXX
    ``` 
    ``` title="Result"
	SSS
	EEE
	XXX
    ```

### Related Items
- [REUSELASTLINE](REUSELASTLINE.md)


---

# CLEARMEMORY.en
---
---
hide:
  - toc
---

# CLEARMEMORY

| Function name                                                     | Arguments | Return |
| :--------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`CLEARMEMORY`](./CLEARMEMORY.md) | `void`    | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int CLEARMEMORY
	```

	Frees memory. Returns the amount of freed memory in bytes.

!!! hint "Hint"

    Available as both command and function in expressions.  
	Effective after `LOADDATA`, `DELCHARA`, or Emuera restart, but has little effect in other situations.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		REPEAT 10000
			ADDVOIDCHARA
		REND
		DELALLCHARA
		PRINTFORMW Executed CLEARMEMORY and freed {CLEARMEMORY()/1024/1024}MB of memory
	```

	``` title="Result"
	Executed CLEARMEMORY and freed 840MB of memory
	```

### Related
- [GETMEMORYUSAGE](GETMEMORYUSAGE.md)


---

# CLEARTEXTBOX.en
---
---
hide:
  - toc
---

# CLEARTEXTBOX

| Function name                                                                   | Arguments | Return |
| :------------------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CLEARTEXTBOX`](./CLEARTEXTBOX.md) | none      | none   |

!!! info "API"

    ```  { #language-erbapi }
	CLEARTEXTBOX
    ```
	Clears all text in the bottom input field.

!!! hint "Hint"

    Command only.


---

# CLIENTFIELD.en
---
---
hide:
  - toc
---

# CLIENTWIDTH, CLIENTHEIGHT

| Function name                                                              | Arguments | Return |
| :-------------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CLIENTWIDTH`](./CLIENTFIELD.md)  | none      | `int`  |
| ![](../assets/images/IconEmuera.webp)[`CLIENTHEIGHT`](./CLIENTFIELD.md) | none      | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CLIENTWIDTH
	int CLIENTHEIGHT
    ```
	Gets the current width or height of the client area (the drawing area of the window).  
	This value does not include the width or height of window borders, menu bars, scroll bars, or text input areas.  
	Note that `CLIENTHEIGHT` may be changed by the user during gameplay.

!!! hint "Hint"

    Available as both command and function in expressions


---

# COLOR_FROM.en
---
---
hide:
  - toc
---

# COLOR_FROMNAME, COLOR_FROMRGB

| Function name                                                             | Arguments            | Return    |
| :------------------------------------------------------------------------ | :------------------- | :-------- |
| ![](../assets/images/IconEmuera.webp)[`COLOR_FROMNAME`](./COLOR_FROM.md) | `string`            | `int`     |
| ![](../assets/images/IconEmuera.webp)[`COLOR_FROMRGB`](./COLOR_FROM.md)  | `int`, `int`, `int` | `string`  |

!!! info "API"

    ```  { #language-erbapi }
	int COLOR_FROMNAME colorName
	string COLOR_FROMRGB R, G, B
    ```
	`COLOR_FROMNAME` interprets the given argument as a color name and returns it as a value in `0xRRGGBB` format.  
	If the color name does not exist, it returns -1.

	`COLOR_FROMRGB` returns the given R,G,B values as a value in `0xRRGGBB` format.  
	If arguments are outside the 0-255 range, an error occurs.

!!! hint "Hint"

    Command and expression function both supported.

### Related
- [SETCOLOR](SETCOLOR.md)


---

# CONTINUE.en
---
---
hide:
  - toc
---

# CONTINUE, BREAK

| Function name                                                       | Arguments | Return |
| :----------------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`CONTINUE`](./CONTINUE.md) | none | none   |
| ![](../assets/images/Iconeramaker.webp)[`BREAK`](./CONTINUE.md)    | none | none   |

!!! info "API"

    ```  { #language-erbapi }
	loopInstruction
		CONTINUE
		BREAK
	loopendInstruction
    ```
    Loop control commands available within [`REPEAT`](./REPEAT.md), [`FOR`](./FOR.md), [`WHILE`](./WHILE.md), and [`DO`](./DO.md).  
	`CONTINUE` returns to the loop start line at execution. For `REPEAT` and `FOR`, it increments or decrements the corresponding counter variable.  
	`BREAK` terminates the remaining loop execution at execution and jumps to the loop end line.


!!! hint "Hint"

    Commands only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		REPEAT 5
			SIF COUNT == 2
				CONTINUE
			SIF COUNT == 4
				BREAK
			PRINTFORML {COUNT}
		REND
		PRINTFORML {COUNT}

		DO
			COUNT++
			IF UNICODE(COUNT) == "A"
				FOR COUNT, COUNT, COUNT+26
					PRINTFORM %UNICODE(COUNT)%
				NEXT
				BREAK
			ENDIF
		LOOP 1
		WAIT
    ``` 
    ``` title="Result"
	0
	1
	3
	5
	ABCDEFGHIJKLMNOPQRSTUVWXYZ
    ```


---

# CONVERT.en
---
---
hide:
  - toc
---

# CONVERT

| Function name                                                   | Arguments      | Return    |
| :------------------------------------------------------------- | :------------ | :-------- |
| ![](../assets/images/IconEmuera.webp)[`CONVERT`](./CONVERT.md) | `int`, `int`  | `string`  |

!!! info "API"

    ```  { #language-erbapi }
	
	string CONVERT value, ※
    ```
	※ accepts only 2, 8, 10, or 16.  
	Returns a string representation of the first argument in base 2, 8, 10, or 16.

!!! hint "Hint"

    Both command and expression function forms are available.

### Related
- [Variable Specifications and List>Constant Notation](../Emuera/variables.md#_3)


---

# COPYCHARA.en
---
---
hide:
  - toc
---

# COPYCHARA

| Function name                                                     | Arguments      | Return |
| :--------------------------------------------------------------- | :------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`COPYCHARA`](./COPYCHARA.md) | `int`, `int` | none   |

!!! info "API"

    ```  { #language-erbapi }
	COPYCHARA charaID, charaID
    ```
    Copies all data from the character with the registration number specified in the first argument to the character with the registration number specified in the second argument.

!!! hint "Hint"

    Command only.


---

# CSV_STATUS.en
---
---
hide:
  - toc
---

# CSV Status Functions

| Function name                                                                  | Arguments  | Return   |
| :----------------------------------------------------------------------------- | :--------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`CSVBASE`](./CSV_STATUS.md)     | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVCSTR`](./CSV_STATUS.md)     | `int`, `int` | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVABL`](./CSV_STATUS.md)      | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVTALENT`](./CSV_STATUS.md)   | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVMARK`](./CSV_STATUS.md)     | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVEXP`](./CSV_STATUS.md)      | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVRELATION`](./CSV_STATUS.md) | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVJUEL`](./CSV_STATUS.md)     | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVEQUIP`](./CSV_STATUS.md)    | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVCFLAG`](./CSV_STATUS.md)    | `int`, `int` | `int`    |

!!! info "API"

    ```  { #language-erbapi }
	CSVBASE charaNo, index
	CSVCSTR charaNo, index
	CSVABL charaNo, index
	CSVTALENT charaNo, index
	CSVMARK charaNo, index
	CSVEXP charaNo, index
	CSVRELATION charaNo, index
	CSVJUEL charaNo, index
	CSVEQUIP charaNo, index
	CSVCFLAG charaNo, index
    ```
	Functions to directly call values defined in CSV.  
	The first argument is the character number, and the second argument is the index of each variable.  
	`CSVCSTR` assigns the string to `RESULTS`, while the others assign numeric values to `RESULT`.

!!! hint "Hint"

    Both command and expression function are supported.


!!! example "Example" 
	
	``` { title="Chara0.csv" }
	番号,0
	名前,Emu Era
	呼び名,江良

	能力,0,3
	経験,1,200
	CSTR,2,This is a test character
	```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORMW %CSVNAME(0)%'s ABL:0={CSVABL(0, 0)} EXP:1={CSVEXP(0, 1)} %CSVCSTR(0, 2)%
    ``` 
    ``` title="Result"
	Emu Era's ABL:0=3 EXP:1=200 This is a test character
    ```

### Related Items
- [CSVNAME Functions](CSVNAME.md)


---

# CSVNAME.en
---
---
hide:
  - toc
---

# CSVNAME Functions

| Function name                                                                  | Arguments | Return   |
| :------------------------------------------------------------------------------ | :-------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`CSVNAME`](./CSVNAME.md)       | `int`     | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVCALLNAME`](./CSVNAME.md)   | `int`     | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVNICKNAME`](./CSVNAME.md)   | `int`     | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVMASTERNAME`](./CSVNAME.md) | `int`     | `string` |

!!! info "API"

    ```  { #language-erbapi }
	CSVNAME charaNo
	CSVCALLNAME charaNo
	CSVNICKNAME charaNo
	CSVMASTERNAME charaNo
    ```
	Functions to directly call `NAME`, `CALLNAME`, `NICKNAME`, and `MASTERNAME` defined in CSV.  
	Use this when you want to get the name of a character you don't own.  
	The first argument is the character number (the `NO` value).

!!! hint "Hint"

    Both command and expression function are supported.


!!! example "Example" 
	``` { title="Chara0.csv" }
	番号,0
	名前,Emu Era
	呼び名,江良
	```
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORMW Full name of character 0:%CSVNAME(0)% Call name:%CSVCALLNAME(0)%
    ``` 
    ``` title="Result"
	Full name of character 0:Emu Era Call name:江良
    ```

### Related Items
- [CSV Status Functions](CSV_STATUS.md)


---

# CUPCHECK.en
---
---
hide:
  - toc
---

# CUPCHECK

| Function name                                                   | Arguments | Return |
| :------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CUPCHECK`](./CUPCHECK.md) | `int`     | none   |

!!! info "API"

    ```  { #language-erbapi }
    CUPCHECK charaID
    ```
    Addition of CUPCHECK, the UPCHECK counterpart for CUP and CDOWN.  
    Format: `CUPCHECK <character>`  
    Description: Runs UPCHECK for the character specified by the argument. That's all.  
    Of course, there is no effect on UP or DOWN. Also, while UPCHECK displays the results, CUPCHECK does not display the results.

!!! hint "Hint"

    Command only.

### Related Items
- [UPCHECK](UPCHECK.md)


---

# CUSTOMDRAWLINE.en
---
---
hide:
  - toc
---

# CUSTOMDRAWLINE, DRAWLINEFORM

| Function name                                                                       | Arguments      | Return   |
| :---------------------------------------------------------------------------------- | :------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`CUSTOMDRAWLINE`](./CUSTOMDRAWLINE.md) | `string`       | none     |
| ![](../assets/images/IconEmuera.webp)[`DRAWLINEFORM`](./CUSTOMDRAWLINE.md)   | `formedString` | none     |

!!! info "API"

    ```  { #language-erbapi }
	CUSTOMDRAWLINE string
	DRAWLINEFORM formedString
    ```
	Displays a single line separator using the specified string. DRAWLINEFORM supports FORM syntax.

!!! hint "Hint"

    Command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		CUSTOMDRAWLINE *
		DRAWLINEFORM {123+211}
		WAIT
    ``` 
    ``` title="Result"
	************************************************************************************************************************************************
	334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334
    ```

### Related Items
- [DRAWLINE](DRAWLINE.md)


---

# CVARSET.en
---
---
hide:
  - toc
---

# CVARSET

| Function name                                                   | Arguments                                | Return |
| :------------------------------------------------------------- | :--------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CVARSET`](./CVARSET.md) | `charaVariable`(, `int`, `int`, `int`, `int`) | none   |

!!! info "API"

    ```  { #language-erbapi }
	CVARSET characterVariable, index, value, startID, endID
    ```
	Command to assign a specific element of a character variable for the specified registered character.  
	For the registered characters specified by the fourth argument and beyond of the variable specified in the first argument, assigns the value specified by the third argument to the element specified by the second argument.  
	For 1-dimensional array variables such as `NAME` and `ISASSI`, the second argument does not affect processing. Therefore, if you do not omit the third argument, please specify an appropriate value.  
	If the third argument is omitted, `0` or empty string is assigned.  
	If the second argument is also omitted, assignment is made to element 0.  
	If the fourth argument and beyond are omitted, assignment is made to all registered characters.

    ```  { #language-erbapi }
	CVARSET CFLAG, 10, 123
    ```

	This script is equivalent to:

    ```  { #language-erbapi }
	REPEAT CHARANUM
		CFLAG:COUNT:10 = 123
	REND
    ```

!!! hint "Hint"

    Command only.

### Related Items
- [VARSET](VARSET.md)


---

# DEBUGPRINT.en
---
---
hide:
  - toc
---

# DEBUGPRINT

| Function name                                                                    | Arguments           | Return |
| :------------------------------------------------------------------------ | :------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINT`](./DEBUGPRINT.md)      | `string`       | none   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTL`](./DEBUGPRINT.md)     | `string`       | none   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTFORM`](./DEBUGPRINT.md)  | `formedString` | none   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTFORML`](./DEBUGPRINT.md) | `formedString` | none   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGCLEAR`](./DEBUGPRINT.md)      | none           | none   |

!!! info "API"

    ```  { #language-erbapi }
	DEBUGPRINT string
	DEBUGPRINTL string
	DEBUGPRINTFORM formedString
	DEBUGPRINTFORML formedString
    ```
	`DEBUG` commands only operate when launched in [debug mode](../Emuera/debug.md).  
	In non-debug mode, nothing is done; argument parsing is also not performed, so even if there are issues with the <formedString>, no error will occur.  

	`DEBUGPRINT` commands work similarly to [`PRINT`](./PRINT.md) and [`PRINTL`](./PRINT.md) commands, respectively.  
	The difference is that the output goes to the debug console instead of the main console.  
	Also, it is not affected by the [`SKIPDISP`](./SKIP_RELATE.md) command, and n cannot be used.  

	`DEBUGCLEAR` clears all printed content from the debug console.

!!! hint "Hint"

    Only commands are supported.


---

# DELALLCHARA.en
---
---
hide:
  - toc
---

# DELALLCHARA

| Function name                                                                 | Arguments | Return |
| :----------------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`DELALLCHARA`](./DELALLCHARA.md) | none      | none   |

!!! info "API"

    ```  { #language-erbapi }
	DELALLCHARA
    ```
    Deletes all registered characters. Equivalent to the following script:

    ```  { #language-erbapi }
	REPEAT CHARANUM
		DELCHARA 0
	REND
    ```

!!! hint "Hint"

    Command only.

### Related
- [DELCHARA](DELCHARA.md)


---

# DELCHARA.en
---
---
hide:
  - toc
---

# DELCHARA

| Function name                                                                                                | Arguments           | Return |
| :----------------------------------------------------------------------------------------------------------- | :----------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`DELCHARA`](./DELCHARA.md) | `int`(, `int`,...) | none   |

!!! info "API"

    ```  { #language-erbapi }
	DELCHARA charaID(, charaID,...)
    ```
    Deletes the character with the specified ID.  
    In `Emuera`, multiple characters can be deleted at once.


!!! hint "Hint"

    Command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		;Character number 0 is "Hiroyuki" and is the protagonist.
		;Character number 3 is "Tomoko", number 5 is "Remi", and number 6 is "Kotone"
		PRINTFORML There are {CHARANUM} characters.
		ADDCHARA 3
		ADDCHARA 5
		ADDCHARA 6
		PRINTFORML There are {CHARANUM} characters.
		REPEAT CHARANUM
			PRINTFORML {COUNT}: %NAME:COUNT%
		REND
		DELCHARA 2
		PRINTFORML There are {CHARANUM} characters.
		REPEAT CHARANUM
		PRINTFORML {COUNT}: %NAME:COUNT%
			REND
	``` 
    ``` title="Result"
	There are 1 characters.
	There are 4 characters.
	0: Hiroyuki
	1: Tomoko
	2: Remi
	3: Kotone
	There are 3 characters.
	0: Hiroyuki
	1: Tomoko
	2: Kotone
    ```

### Related
- [ADDCHARA](ADDCHARA.md)
- [DELALLCHARA](DELALLCHARA.md)


---

# DELDATA.en
---
---
hide:
  - toc
---

# DELDATA

| Function name                                                     | Arguments | Return |
| :---------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`DELDATA`](./DELDATA.md) | `int`     | none   |

!!! info "API"

    ```  { #language-erbapi }
	DELDATA saveID
    ```
    Deletes the data from the file with the number specified by `saveID`.  
    No error occurs even if the file does not exist.


!!! hint "Hint"

    Command only.


---

# DO.en
---
---
hide:
  - toc
---

# DO-LOOP

| Function name                                                 | Arguments | Return |
| :------------------------------------------------------------ | :--------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`DO`](./DO.md)          | none  | none   |
| ![](../assets/images/IconEmuera.webp)[`LOOP`](./DO.md)        | `int` | none   |

!!! info "API"

    ```  { #language-erbapi }
	DO
	LOOP bool
    ```
	A looping construct similar to [`REPEAT～REND`](./REPEAT.md) and [`FOR～NEXT`](./FOR.md).  
	Like C's `do～while` or VB's `do～loop while`, it repeats execution while `bool` in `LOOP` is non-zero.  
	Unlike [`WHILE～WEND`](./WHILE.md), it always executes at least once.  
	Note that when [`CONTINUE`](./CONTINUE.md) is executed inside `DO～LOOP`, it exits `LOOP` if the condition is not satisfied. Note that `CONTINUE` does not necessarily return to the `DO` statement.  
	Also, if you enter `DO～LOOP` directly via commands like [`GOTO`](./GOTO.md), it evaluates the condition when reaching `LOOP` as normal, and loops back to `DO` if `bool` is non-zero.

!!! hint "Hint"

    Commands only.


---

# DOTRAIN.en
---
---
hide:
  - toc
---

# DOTRAIN

| Function name                                                   | Arguments | Return |
| :------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`DOTRAIN`](./DOTRAIN.md) | `int` | none   |

!!! info "API"

    ```  { #language-erbapi }
	DOTRAIN trainNo
    ```
	Command that forces `TRAIN` execution.  
	Can only be used inside `@EVENTTRAIN`, `@SHOW_STATUS`, `@SHOW_USERCOM`, `@USERCOM`, `@EVENTCOMEND`, and functions called from there.  
	The number specified in the argument corresponds to the number defined in `train.csv`.  
	The behavior is the same as when a command is selected: it initializes variables like `UP` and `DOWN`, assigns the argument to `SELECTCOM`, calls `@EVENTCOM`, calls `@COM{SELECTCOM}`, and so on.

	If the argument is less than 0 or greater than or equal to the number of elements in `TRAINNAME`, an error occurs, but no other checks are performed.  
	Even if the argument is a number not defined in `train.csv`, it will attempt to force execution.  
	Also, it does not call `@COM_ABLE` and is forcibly executed.  
	If necessary, perform checks like the following before `DOTRAIN`:

    ```  { #language-erbapi }
	SIF ( X < 0 || X >= VARSIZE("TRAINNAME") || TRAINNAME:X == "" )
		RETURN
	RESULT = 1
	TRYCALLFORM COM_ABLE{X}
	SIF RESULT == 0
		RETURN
	DOTRAIN X
    ```
	Conversely, you can implement your own `TRAIN` commands using `DOTRAIN`.  
	For example, leave `train.csv` empty, display your own in `@SHOW_USERCOM`, and perform `DOTRAIN` in `@USERCOM`.  
	Alternatively, instead of leaving `train.csv` empty, you can make all `@COM_ABLE` return 0.  
	Another method is to delete all `@COM_ABLE` and set [`COM_ABLE default value` in `_replace.csv`](../Emuera/replace.md#com_able) to 0.  
	Note that if `DOTRAIN` is executed during `CALLTRAIN` processing, the remaining `CALLTRAIN` is invalidated.

!!! hint "Hint"

    Commands only.

### See Also
- [CALLTRAIN](CALLTRAIN.md)


---

# DRAWLINE.en
---
---
hide:
  - toc
---

# DRAWLINE

| Function name                                                             | Arguments | Return   |
| :------------------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/Iconeramaker.webp)[`DRAWLINE`](./DRAWLINE.md) | none      | none     |

!!! info "API"

    ```  { #language-erbapi }
	DRAWLINE
    ```
    Draws a line from the right edge of the screen to the left edge using `-`.


!!! hint "Hint"

    Command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		DRAWLINE
		WAIT
    ``` 
    ``` title="Result"
	------------------------------------------------------------------------------------------------------------------------------------------------
    ```

### Related Items
- [CUSTOMDRAWLINE](CUSTOMDRAWLINE.md)


---

# DT_CELL.en
---
---
hide:
  - toc
---

# DataTable Cell Management

| Function name                                                    | Arguments                                      | Return   |
| :-------------------------------------------------------------- | :-------------------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`DT_CELL_GET`](./DT_CELL.md)    | `string`, `int`, `string`(, `int`)            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_CELL_GETS`](./DT_CELL.md)   | `string`, `int`, `string`(, `int`)            | `string` |
| ![](../assets/images/IconEM.webp)[`DT_CELL_ISNULL`](./DT_CELL.md) | `string`, `int`, `string`(, `int`)            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_CELL_SET`](./DT_CELL.md)    | `string`, `int`, `string`(, `any`, `int`)    | `int`    |

!!! info "API"

    ```  { #language-erbapi }
    int DT_CELL_GET dataTableName, row, columnName(, asId)
    string DT_CELL_GETS dataTableName, row, columnName(, asId)
    int DT_CELL_ISNULL dataTableName, row, columnName(, asId)
    int DT_CELL_SET dataTableName, row, columnName(, value, asId)
    ```

    Functions for manipulating cells in `DataTable` (database, based on [`DataTable`](https://learn.microsoft.com/en-us/dotnet/api/system.data.datatable) class).

    - `DT_CELL_GET`: Returns the integer value at column `columnName` of row `row` in the `DataTable` with `dataTableName`. Returns `0` on failure.
        - If `asId` is `1`, the row with column `id` value equal to `row` is targeted.
        - If `asId` is other value, it targets row `row` (0-indexed).
    - `DT_CELL_GETS`: Returns the string value at column `columnName` of row `row` in the `DataTable` with `dataTableName`. Returns empty string on failure.
    - `DT_CELL_ISNULL`: Returns `1` if the value at column `columnName` of row `row` in the `DataTable` with `dataTableName` is null (neither integer nor string).
        - Returns `0` if the value is not null.
        - Returns `-1` if the DataTable does not exist.
        - Returns `-2` if the corresponding row or column does not exist.
    - `DT_CELL_SET`: Assigns `value` to column `columnName` of row `row` in the `DataTable` with `dataTableName`. If `value` is omitted, assigns null.
        - Returns `1` on success.
        - Returns `0` if attempting to assign a value to column `id`.
        - Returns `-1` if the DataTable does not exist.
        - Returns `-2` if the type of `value` does not match the cell's type.
        - Returns `-3` if the corresponding row or column does not exist.

    !!! warning "Warning"

        The value of column `id` cannot be edited.

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        #DIM id

        DT_CREATE "db"
        DT_COLUMN_ADD "db", "name"
        DT_COLUMN_ADD "db", "height", "int16"
        DT_COLUMN_ADD "db", "age", "int16"

        id = DT_ROW_ADD("db", "name", "Name1", "age", 11)
        DT_ROW_ADD "db", "name", "Name2", "age", 21, "height", 164
        DT_ROW_ADD "db", "name", "Name3", "age", 18, "height", 159
        DT_ROW_ADD "db", "name", "Name4", "age", 33, "height", 180
        DT_ROW_ADD "db", "name", "Name5", "age", 18, "height", 172

        PRINTFORML Row 1 column height is \@DT_CELL_ISNULL("db", id, "height", 1)==1?null#not null\@

        DT_CELL_SET "db", 0, "height", 132

        PRINTFORM Row 1 - Name: %DT_CELL_GETS("db", 0, "name")% 
        PRINTFORM Age: {DT_CELL_GET("db", 0, "age")} 
        PRINTFORML Height: {DT_CELL_GET("db", 0, "height")}

        ONEINPUT
    ``` 
    ``` title="Result"
    Row 1 column height is null
    Row 1 - Name: Name1 Age: 11 Height: 132
    ```


---

# DT_COLUMN.en
---
---
hide:
  - toc
---

# DataTable Column Management

| Function name                                                                 | Arguments                                                          | Return |
| :--------------------------------------------------------------------------- | :---------------------------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_ADD`](./DT_COLUMN.md)     | `string`, `string`(, `any`, `int`)                                | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_EXIST`](./DT_COLUMN.md)   | `string`, `string`                                                | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_REMOVE`](./DT_COLUMN.md)  | `string`, `string`                                                | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_LENGTH`](./DT_COLUMN.md)  | `string`                                                          | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_OPTIONS`](./DT_COLUMN.md) | `string`, `string`, `keyword`, `any`([,`keyword`, `any`] ...) | none   |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_NAMES`](./DT_COLUMN.md)   | `string`(, `ref` `string[]`)                                     | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int DT_COLUMN_ADD dataTableName, columnName(, type, nullable)
    int DT_COLUMN_EXIST dataTableName, columnName
    int DT_COLUMN_REMOVE dataTableName, columnName
    int DT_COLUMN_LENGTH dataTableName
    int DT_COLUMN_OPTIONS dataTableName, columnName, option, optionValue([, option, optionValue] ...)
    int DT_COLUMN_NAMES dataTableName(, outputArray)
    ```

    Functions for manipulating columns in `DataTable` (database, based on [`DataTable`](https://learn.microsoft.com/en-us/dotnet/api/system.data.datatable) class).

    - `DT_COLUMN_ADD`: Adds column `columnName` to the `DataTable` with `dataTableName`. Returns `0` if `columnName` already exists, `1` on success.
        - `type` specifies the type of values stored in the column.
            - `1` (integer) / `int8` (string): 8-bit signed integer
            - `2` (integer) / `int16` (string): 16-bit signed integer
            - `3` (integer) / `int32` (string): 32-bit signed integer
            - `4` (integer) / `int64` (string): 64-bit signed integer
            - `5` (integer) / `string` (string): string (default)
        - If `nullable` is not `0` (default), allows null values for this column
    - `DT_COLUMN_EXIST`: Checks if column `columnName` exists in the `DataTable` with `dataTableName`. Returns the type number (see `type` in `DT_COLUMN_ADD`) if it exists, `0` otherwise.
    - `DT_COLUMN_REMOVE`: Removes column `columnName` from the `DataTable` with `dataTableName`. Returns `1` on success.
    - `DT_COLUMN_LENGTH`: Returns the number of columns in the `DataTable` with `dataTableName`. Returns `-1` if the DataTable does not exist.
    - `DT_COLUMN_OPTIONS`: Sets options for column `columnName` in the `DataTable` with `dataTableName`. `option` is case-insensitive.
        - `option` is `DEFAULT`: Sets the default value for the specified column.
    - `DT_COLUMN_NAMES`: Sequentially assigns all column names of the `DataTable` with `dataTableName` to `outputArray`. If `outputArray` is omitted, assigns to `RESULTS`. Returns the column count.

    !!! warning "Warning"

        Column `id` cannot be removed.

!!! hint "Hint"

    Available as both command and function in expressions. `DT_COLUMN_OPTIONS` is command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 

        DT_CREATE "db"
        DT_COLUMN_ADD "db", "name"
        DT_COLUMN_ADD "db", "height", "int16"
        DT_COLUMN_ADD "db", "age", "int16"

        DT_COLUMN_OPTIONS "db", "age", DEFAULT, 5

        DT_ROW_ADD "db", "name", "Name1", "age", 11, "height", 132
        DT_ROW_ADD "db", "name", "Name2", "height", 164
        DT_ROW_ADD "db", "name", "Name3", "age", 18, "height", 159
        DT_ROW_ADD "db", "name", "Name4", "age", 33, "height", 180
        DT_ROW_ADD "db", "name", "Name5", "age", 18, "height", 172

        PRINT Column names:
        FOR LOCAL, 0, DT_COLUMN_NAMES("db")
            PRINTFORM %RESULTS:LOCAL% 
        NEXT
        PRINTL

        PRINTFORML Column count: {DT_COLUMN_LENGTH("db")}, column "age" exists: {DT_COLUMN_EXIST("db", "age")}

        PRINTFORML %DT_CELL_GETS("db", 1, "name")%'s age is {DT_CELL_GET("db", 1, "age")}

        DT_COLUMN_REMOVE "db", "age"

        PRINTFORML Column count: {DT_COLUMN_LENGTH("db")}, column "age" exists: {DT_COLUMN_EXIST("db", "age")}

        ONEINPUT
    ``` 
    ``` title="Result"
    Column names: id name height age 
    Column count: 4, column "age" exists: 2
    Name2's age is 5
    Column count: 3, column "age" exists: 0
    ```


---

# DT_MANAGE.en
---
---
hide:
  - toc
---

# DataTable Management

| Function name                                                    | Arguments        | Return |
| :-------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEM.webp)[`DT_CREATE`](./DT_MANAGE.md)  | `string`        | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_EXIST`](./DT_MANAGE.md)   | `string`        | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_RELEASE`](./DT_MANAGE.md) | `string`        | `1`    |
| ![](../assets/images/IconEM.webp)[`DT_CLEAR`](./DT_MANAGE.md)   | `string`        | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_NOCASE`](./DT_MANAGE.md)  | `string`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int DT_CREATE dataTableName
    int DT_EXIST dataTableName
    1 DT_RELEASE dataTableName
    int DT_CLEAR dataTableName
    int DT_NOCASE dataTableName, ignoreCase
    ```

    Functions for creating, deleting, checking existence, clearing data, and setting case-insensitive comparison of `DataTable` (database, based on [`DataTable`](https://learn.microsoft.com/en-us/dotnet/api/system.data.datatable) class).
    
    - `DT_CREATE`: Creates a `DataTable` with `dataTableName`. Returns `0` if a `DataTable` with that name already exists, `1` on success.
    - `DT_EXIST`: Checks if a `DataTable` with `dataTableName` exists. Returns `1` if it exists, `0` otherwise.
    - `DT_RELEASE`: Deletes the `DataTable` with `dataTableName`.
    - `DT_CLEAR`: Removes all rows from the `DataTable` with `dataTableName` (column settings remain unchanged), returns `1`. Returns `-1` if the DataTable does not exist.
    - `DT_NOCASE`: Sets whether the `DataTable` with `dataTableName` ignores case during string comparison in [`DT_SELECT`](./DT_SELECT.md) function. Returns `1`. Returns `-1` if the DataTable does not exist.
        - If `ignoreCase` is `0` (default): Case-sensitive
        - If `ignoreCase` is other value: Case-insensitive

    !!! warning "Warning"

        The column `id` is automatically added after the `DataTable` is created. See "[`XML`, `MAP`, `DataTable` Save Function](../EMEE/EMEE_Summary.md#xmlmapdatatable)" to save to save file. They are automatically deleted when "Return to Title Screen" or [`RESETDATA`](https://osdn.net/projects/emuera/wiki/excom#h5-RESETDATA) is called.

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        PRINTFORML Existence of DataTable "db": {DT_EXIST("db")}
        DT_CREATE "db"
        PRINTSL RESULT ? "Success" # "Already exists"
        DT_CREATE "db"
        PRINTSL RESULT ? "Success" # "Already exists"

        CALL GEN_DB_DATA
        
        PRINTFORML DataTable "db" data count: {DT_ROW_LENGTH("db")} rows x {DT_COLUMN_LENGTH("db")} columns
        PRINTFORML Number of rows where "name" starts with "n": {DT_SELECT("db", "name LIKE 'n%'")}
        DT_NOCASE "db", 1
        PRINTFORML Number of rows where "name" starts with "n": {DT_SELECT("db", "name LIKE 'n%'")}
        DT_CLEAR "db"
        PRINTFORML DataTable "db" data count: {DT_ROW_LENGTH("db")} rows x {DT_COLUMN_LENGTH("db")} columns

        RESETDATA ; All DataTables are automatically deleted

        DT_CREATE "db"
        PRINTSL RESULT ? "Success" # "Already exists"
        PRINTFORML Existence of DataTable "db": {DT_EXIST("db")}
        DT_RELEASE "db"
        PRINTFORML Existence of DataTable "db": {DT_EXIST("db")}

        ONEINPUT

    @GEN_DB_DATA
        DT_COLUMN_ADD "db", "name"
        DT_COLUMN_ADD "db", "height", "int16"
        DT_COLUMN_ADD "db", "age", "int16"

        DT_ROW_ADD "db", "name", "Name1", "age", 11, "height", 132
        DT_ROW_ADD "db", "name", "Name2", "age", 21, "height", 164
        DT_ROW_ADD "db", "name", "Name3", "age", 18, "height", 159
        DT_ROW_ADD "db", "name", "Name4", "age", 33, "height", 180
        DT_ROW_ADD "db", "name", "Name5", "age", 18, "height", 172
    ``` 
    ``` title="Result"
    Existence of DataTable "db": 0
    Success
    Already exists
    DataTable "db" data count: 5 rows x 4 columns
    Number of rows where "name" starts with "n": 0
    Number of rows where "name" starts with "n": 5
    DataTable "db" data count: 0 rows x 4 columns
    Success
    Existence of DataTable "db": 1
    Existence of DataTable "db": 0
    ```


---

# DT_ROW.en
---
---
hide:
  - toc
---

# DataTable Row Management

| Function name                                                  | Arguments                                                      | Return |
| :------------------------------------------------------------ | :------------------------------------------------------------ | :----- |
| ![](../assets/images/IconEM.webp)[`DT_ROW_ADD`](./DT_ROW.md)    | `string`([, `string`, `any`] ...)                             | `int`  |
|                                                                | `string`, `ref` `string[]`, `ref` `any[]`, `int`            | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_ROW_SET`](./DT_ROW.md)    | `string`, `int`, `string`, `any`([, `string`, `any`] ...) | `int`  |
|                                                                | `string`, `int`, `ref` `string[]`, `ref` `any[]`, `int`   | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_ROW_REMOVE`](./DT_ROW.md) | `string`, `int`                                              | `int`  |
|                                                                | `string`, `ref` `int[]`, `int`                              | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_ROW_LENGTH`](./DT_ROW.md) | `string`                                                      | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    a. int DT_ROW_ADD dataTableName(, columnName, columnValue) ...
    b. int DT_ROW_ADD dataTableName, columnNames, columnValues, count

    a. int DT_ROW_SET dataTableName, idValue(, columnName, columnValue) ...
    b. int DT_ROW_SET dataTableName, idValue, columnNames, columnValues, count

    a. int DT_ROW_REMOVE dataTableName, idValue
    b. int DT_ROW_REMOVE dataTableName, idValues, count

    int DT_ROW_LENGTH dataTableName
    ```

    Functions for manipulating rows in `DataTable` (database, based on [`DataTable`](https://learn.microsoft.com/en-us/dotnet/api/system.data.datatable) class).

    - `DT_ROW_ADD`: Adds a row to the `DataTable` with `dataTableName`. Returns `-1` if the DataTable does not exist.
        1. Adds a row, assigns `columnValue` to column `columnName` of that row, returns the value of column `id` of the row. Multiple `columnName`/`columnValue` pairs can be passed.
        2. Adds a row, sequentially takes column names from `columnNames` and values from `columnValues`, assigns values to the corresponding columns of that row, repeats up to `count` times. Returns the value of column `id` of the row.
    - `DT_ROW_SET`: Edits values in the row where column `id` is `idValue` in the `DataTable` with `dataTableName`. Returns `-1` if the DataTable does not exist.
        1. Assigns `columnValue` to column `columnName` of that row, returns the number of edited values. Multiple `columnName`/`columnValue` pairs can be passed.
        2. Sequentially takes column names from `columnNames` and values from `columnValues`, assigns values to the corresponding columns of that row, repeats up to `count` times. Returns the number of edited values.
    - `DT_ROW_REMOVE`: Removes rows from the `DataTable` with `dataTableName`. Returns `-1` if the DataTable does not exist.
        1. Removes the row where column `id` is `idValue`. Returns `1` on success.
        2. Sequentially removes rows where column `id` matches elements in `idValues`, repeats up to `count` times. Returns the number of removed rows on success.
    - `DT_ROW_LENGTH`: Returns the number of rows in the `DataTable` with `dataTableName`. Returns `-1` if the DataTable does not exist.

    !!! warning "Warning"

        The value of column `id` cannot be edited.

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        #DIM id
        #DIMS columnNames = "age", "height"
        #DIM columnValues = 11, 132

        DT_CREATE "db"
        DT_COLUMN_ADD "db", "name"
        DT_COLUMN_ADD "db", "height", "int16"
        DT_COLUMN_ADD "db", "age", "int16"

        id = DT_ROW_ADD("db", "name", "Name1")
        DT_ROW_SET "db", id, columnNames, columnValues, 2
        DT_ROW_ADD "db", "name", "Name2", "age", 21, "height", 164
        DT_ROW_ADD "db", "name", "Name3", "age", 18, "height", 159
        DT_ROW_ADD "db", "name", "Name4", "age", 33, "height", 180
        DT_ROW_ADD "db", "name", "Name5", "age", 18, "height", 172

        PRINTFORML Row count: {DT_ROW_LENGTH("db")}

        CALL PRINTL_ROW(0)
        DT_ROW_SET "db", id, "age", 0, "height", 50
        CALL PRINTL_ROW(0)

        ONEINPUT

    @PRINTL_ROW(index)
        #DIM index
        PRINTFORM Row {index+1} - Name: %DT_CELL_GETS("db", index, "name")% 
        PRINTFORM Age: {DT_CELL_GET("db", index, "age")} 
        PRINTFORML Height: {DT_CELL_GET("db", index, "height")}
    ``` 
    ``` title="Result"
    Row count: 5
    Row 1 - Name: Name1 Age: 11 Height: 132
    Row 1 - Name: Name1 Age: 0 Height: 50
    ```


---

# DT_SELECT.en
---
---
hide:
  - toc
---

# DT_SELECT

| Function name                                                 | Arguments                                          | Return |
| :------------------------------------------------------------ | :------------------------------------------------ | :----- |
| ![](../assets/images/IconEM.webp)[`DT_SELECT`](./DT_SELECT.md) | `string`(, `string`, `string`, `ref` `int[]`)    | `int`  |


!!! info "API"

    ```  { #language-erbapi }
    int DT_SELECT dataTableName(, filterExpression, sortRule, output)
    ```

    Selects rows from the `DataTable` with `dataTableName` that satisfy `filterExpression`, sorts them according to `sortRule`, sequentially assigns column `id` values to `output`, and returns the number of rows.

    - If `filterExpression` is omitted, targets all rows.
    - If `sortRule` is omitted, no sorting is applied.
    - If `output` is not specified, column `id` values are sequentially assigned to `RESULT` (starting from `RESULT:1`).

    See [`C#'s DataTable.Select`](https://learn.microsoft.com/en-us/dotnet/api/system.data.datatable.select).

!!! warning "Warning"

    The return value may exceed the number of elements in `output` / `RESULT`.

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        #DIM idx, 10
        #DIM count
        #DIM i

        DT_CREATE "db"
        DT_COLUMN_ADD "db", "name"
        DT_COLUMN_ADD "db", "height", "int16"
        DT_COLUMN_ADD "db", "age", "int16"

        DT_ROW_ADD "db", "name", "Name1", "age", 11, "height", 132
        DT_ROW_ADD "db", "name", "Name2", "age", 21, "height", 164
        DT_ROW_ADD "db", "name", "Name3", "age", 18, "height", 159
        DT_ROW_ADD "db", "name", "Name4", "age", 33, "height", 180
        DT_ROW_ADD "db", "name", "Name5", "age", 18, "height", 172

        count = DT_SELECT("db", "age >= 18", "age ASC, height DESC", idx)

        PRINTL People aged 18 or older:
        FOR i, 0, count
            CALL PRINTL_ROW(idx:i)
        NEXT

        ONEINPUT

    @PRINTL_ROW(id)
        #DIM id
        PRINTFORM Name: %DT_CELL_GETS("db", id, "name", 1)% 
        PRINTFORM Age: {DT_CELL_GET("db", id, "age", 1)} 
        PRINTFORML Height: {DT_CELL_GET("db", id, "height", 1)}
    ``` 
    ``` title="Result"
    People aged 18 or older:
    Name: Name5 Age: 18 Height: 172
    Name: Name3 Age: 18 Height: 159
    Name: Name2 Age: 21 Height: 164
    Name: Name4 Age: 33 Height: 180
    ```


---

# DT_SERIALIZATION.en
---
---
hide:
  - toc
---

# DataTable Serialization

| Function name                                                                 | Arguments                        | Return   |
| :----------------------------------------------------------------------------- | :------------------------------ | :------- |
| ![](../assets/images/IconEM.webp)[`DT_TOXML`](./DT_SERIALIZATION.md)   | `string`(, `ref` `string`)     | `string` |
| ![](../assets/images/IconEM.webp)[`DT_FROMXML`](./DT_SERIALIZATION.md) | `string`, `string`, `string`    | `int`    |


!!! info "API"

    ```  { #language-erbapi }
    1. string DT_TOXML dataTableName(, schemaOutput)
    2. int DT_FROMXML dataTableName, schemaXml, dataXml
    ```

    Functions to convert between `DataTable` (database, based on [`DataTable`](https://learn.microsoft.com/en-us/dotnet/api/system.data.datatable) class) and XML.

    - `DT_TOXML`: Converts the `DataTable` with `dataTableName` to XML, assigns schema XML to `schemaOutput` (or `RESULTS:1` if omitted), and returns data XML.
    - `DT_FROMXML`: Parses schema XML `schemaXml` and data XML `dataXml`, overwrites the `DataTable` with `dataTableName`. Returns `1` on success, `0` otherwise.

!!! hint "Hint"

    Available as both command and function in expressions

!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        #DIMS schema
        #DIMS data

        DT_CREATE "db"
        DT_COLUMN_ADD "db", "name"
        DT_COLUMN_ADD "db", "height", "int16"
        DT_COLUMN_ADD "db", "age", "int16"

        DT_ROW_ADD "db", "name", "Name1", "age", 11, "height", 132

        data '= DT_TOXML("db", schema)

        DT_RELEASE "db"

        DT_FROMXML "db", schema, data
        PRINTFORML %DT_CELL_GETS("db", 0, "name")%'s age is {DT_CELL_GET("db", 0, "age")}

        ONEINPUT
    ``` 
    ``` title="Result"
    Name1's age is 11
    ```


---

# ENUMFILES.en
---
---
hide:
  - toc
---

# ENUMFILES

| Function name                                                 | Arguments                 | Return |
| :------------------------------------------------------------ | :------------------------ | :----- |
| ![](../assets/images/IconEM.webp)[`ENUMFILES`](./ENUMFILES.md) | `string`(, `string`, `int`) | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int ENUMFILES dir, pattern, option
    ```

    Assigns file names from folder `dir` that match the condition specified by `pattern` to the `RESULTS` array. Returns the number of matching files.

    - `dir` is specified relative to `Emuera.exe` (`..` is invalid).
    - Default value for `pattern` is `*` (all files). See [Directory.EnumerateFiles](https://docs.microsoft.com/en-us/dotnet/api/system.io.directory.enumeratefiles).
    - Default value for `option` is `0` (do not search subfolders). Any other value searches subfolders as well.

!!! hint "Hint"

    Available as both command and function in expressions

!!! example "Example"
    ``` title="Folder structure"
    csv
     - Chara
        - Chara001.csv
     - _Default.config
     - _Fixed.config
     - VariableSize.csv
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM i
        #DIM total

        total = ENUMFILES("csv")
        PRINTFORML Total files (excluding subfolders): {total}
        FOR i, 0, total
            PRINTSL RESULTS:i
        NEXT
        PRINTL

        total = ENUMFILES("csv", "*.csv", 1)
        PRINTFORML CSV file count: {total}
        FOR i, 0, total
            PRINTSL RESULTS:i
        NEXT

        ONEINPUT
    ```
    ``` title="Result"
    Total files (excluding subfolders): 3
    csv\VariableSize.csv
    csv\_Default.config
    csv\_Fixed.config
    
    CSV file count: 2
    csv\VariableSize.csv
    csv\Chara\Chara001.csv
    ```

### Related
- [EXISTFILE](EXISTFILE.md)


---

# ENUMFUNC.en
---
---
hide:
  - toc
---

# ENUMFUNC Functions

| Function name                                                                   | Arguments  | Return |
| :----------------------------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCBEGINSWITH`](./ENUMFUNC.md) | `string`   | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCENDSWITH`](./ENUMFUNC.md)   | `string`   | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCWITH`](./ENUMFUNC.md)       | `string`   | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int ENUMFUNCBEGINSWITH keyword
    int ENUMFUNCENDSWITH keyword
    int ENUMFUNCWITH keyword
    ```

    Returns the total number of defined functions that contain `keyword`.  
    Also assigns function names containing `keyword` to the array of `RESULTS`.

    - `ENUMFUNCBEGINSWITH` returns function names that start with `keyword`.
    - `ENUMFUNCENDSWITH` returns function names that end with `keyword`.
    - `ENUMFUNCWITH` returns function names that contain `keyword`.

!!! hint "Hint"

    Both command and expression function are supported.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        PRINTFORML Number of function names starting with "Foo":{ENUMFUNCBEGINSWITH("Foo")}
        ENUMFUNCENDSWITH "Foo"
        PRINTFORML Number of function names ending with "Foo":{RESULT}
        CALL PrintFoo
        ENUMFUNCWITH "Foo"
        PRINTFORML Number of function names containing "Foo":{RESULT}
        CALL PrintFoo

        ONEINPUT

    @PrintFoo
        #DIM i
        FOR i, 0, RESULT
            SIF i>0
                PRINT , 
            PRINTS RESULTS:i
        NEXT
        PRINTL

    @Foo1
    @Foo2
    @Foo3
    @Dummy1Foo
    @Dummy2Foo
    @My_Foo_Func
    ```
    ``` title="Result"
    Number of function names starting with "Foo":3
    Number of function names ending with "Foo":3
    PrintFoo, Dummy1Foo, Dummy2Foo
    Number of function names containing "Foo":7
    PrintFoo, Foo1, Foo2, Foo3, Dummy1Foo, Dummy2Foo, My_Foo_Func
    ```

### Related Items
- [EXISTFUNCTION](EXISTFUNCTION.md)


---

# ENUMMACRO.en
---
---
hide:
  - toc
---

# ENUMMACRO Functions

| Function name                                                                   | Arguments  | Return |
| :----------------------------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/IconEM.webp)[`ENUMMACROBEGINSWITH`](./ENUMMACRO.md) | `string`   | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMMACROENDSWITH`](./ENUMMACRO.md)   | `string`   | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMMACROWITH`](./ENUMMACRO.md)       | `string`   | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int ENUMMACROBEGINSWITH keyword
    int ENUMMACROENDSWITH keyword
    int ENUMMACROWITH keyword
    ```

    Returns the total number of defined macros whose names contain `keyword`.  
    Also assigns macro names containing `keyword` to the array of `RESULTS`.

    - `ENUMMACROBEGINSWITH` returns macro names that start with `keyword`.
    - `ENUMMACROENDSWITH` returns macro names that end with `keyword`.
    - `ENUMMACROWITH` returns macro names that contain `keyword`.

!!! hint "Hint"

    Both command and expression function are supported.

!!! example "Example"

    ``` { #language-erh title="DEFINE.ERH" }
    #DIMS CONST Foo1 = "1"
    #DEFINE Foo2 "Test"
    #DEFINE Foo3
    #DEFINE MyFoo 1 + 1
    #DEFINE YourFoo 1 + 1
    #DEFINE AFooInTheMiddle
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        PRINTFORML Number of macro names starting with "Foo":{ENUMMACROBEGINSWITH("Foo")}
        ENUMMACROENDSWITH "Foo"
        PRINTFORML Number of macro names ending with "Foo":{RESULT}
        CALL PrintFoo
        ENUMMACROWITH "Foo"
        PRINTFORML Number of macro names containing "Foo":{RESULT}
        CALL PrintFoo

        ONEINPUT

    @PrintFoo
        #DIM i
        FOR i, 0, RESULT
            SIF i>0
                PRINT , 
            PRINTS RESULTS:i
        NEXT
        PRINTL
    ```
    ``` title="Result"
    Number of macro names starting with "Foo":2
    Number of macro names ending with "Foo":2
    MyFoo, YourFoo
    Number of macro names containing "Foo":5
    Foo2, Foo3, MyFoo, YourFoo, AFooInTheMiddle
    ```


---

# ENUMVAR.en
---
---
hide:
  - toc
---

# ENUMVAR Functions

| Function name                                                                   | Arguments  | Return |
| :----------------------------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/IconEM.webp)[`ENUMVARBEGINSWITH`](./ENUMVAR.md) | `string`   | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMVARENDSWITH`](./ENUMVAR.md)   | `string`   | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMVARWITH`](./ENUMVAR.md)       | `string`   | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int ENUMVARBEGINSWITH keyword
    int ENUMVARENDSWITH keyword
    int ENUMVARWITH keyword
    ```

    Returns the total number of defined variables and constants whose names contain `keyword`.  
    Also assigns variable and constant names containing `keyword` to the array of `RESULTS`.

    - `ENUMVARBEGINSWITH` returns variable/constant names that start with `keyword`.
    - `ENUMVARENDSWITH` returns variable/constant names that end with `keyword`.
    - `ENUMVARWITH` returns variable/constant names that contain `keyword`.

    !!! warning "Warning"

        Unlike [`EXISTVAR`](./EXISTVAR.md), this does not enumerate local variables or constants.

!!! hint "Hint"

    Both command and expression function are supported.

!!! example "Example"

    ``` { #language-erh title="DEFINE.ERH" }
    #DIMS CONST Foo1 = "1"
    #DIM Foo2, 2, 2
    #DIMS CONST Foo3 = "3", "4"
    #DIM MyFoo 
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS Local3DFoo, 2, 2, 2

        PRINTFORML Number of variable/constant names starting with "Foo":{ENUMVARBEGINSWITH("Foo")}
        ENUMVARENDSWITH "Foo"
        PRINTFORML Number of variable/constant names ending with "Foo":{RESULT}
        CALL PrintFoo
        ENUMVARWITH "Foo"
        PRINTFORML Number of variable/constant names containing "Foo":{RESULT}
        CALL PrintFoo

        ONEINPUT

    @PrintFoo
        #DIM i
        FOR i, 0, RESULT
            SIF i>0
                PRINT , 
            PRINTS RESULTS:i
        NEXT
        PRINTL
    ```
    ``` title="Result"
    Number of variable/constant names starting with "Foo":3
    Number of variable/constant names ending with "Foo":1
    MyFoo
    Number of variable/constant names containing "Foo":4
    Foo1, Foo2, Foo3, MyFoo
    ```

### Related Items
- [EXISTVAR](EXISTVAR.md)


---

# ERDNAME.en
---
---
hide:
  - toc
---

# ERDNAME

| Function name                                                 | Arguments                  | Return   |
| :----------------------------------------------------------- | :------------------------ | :-------- |
| ![](../assets/images/IconEE.webp)[`ERDNAME`](./ERDNAME.md) | `variable`, `int`(, `int`) | `string` |

!!! info "API"

	``` { #language-erbapi }
	string ERDNAME variableName, index(, dimension)
	```

	Specifies the index of the `ERD` variable and returns the name of that element. The dimension can be specified with the third argument (numbered from left to right like file names: 1, 2, 3).

!!! hint "Hint"

    Both command and expression function are supported.

!!! example "Example"

	``` { #language-erb title="HOGE3D@1.ERD" }
	0,AAA
	1,BBB
	2,CCC
	```
	``` { #language-erb title="HOGE3D@2.ERD" }
	0,DDD
	1,EEE
	2,FFF
	```
	``` { #language-erb title="HOGE3D@3.ERD" }
	0,GGG
	1,HHH
	2,III
	```
    ``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE

		PRINTFORMW %ERDNAME(HOGE3D, 0, 1)% %ERDNAME(HOGE3D, 1, 2)% %ERDNAME(HOGE3D, 2, 3)%
	```
	``` title="Result"
	AAA EEE III
	```

### Related Items
- [User-defined Variables>ERD Function](../Emuera/user_defined_variables.md#erderabasic-define)


---

# ESCAPE.en
---
---
hide:
  - toc
---

# ESCAPE

| Function name                                                 | Arguments | Return   |
| :----------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`ESCAPE`](./ESCAPE.md) | `string`  | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string ESCAPE string
    ```
	Escapes regular expression meta-characters in the argument string so that it is treated as plain text in regular expressions.  

!!! hint "Hint"

    Supported as both command and expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORMW %ESCAPE("!#$%&'()")%
    ``` 
    ``` title="Result"
	!\#\$%&'\(\)
    ```


---

# EXISTCSV.en
---
---
hide:
  - toc
---

# EXISTCSV

| Function name                                                   | Arguments | Return |
| :------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`EXISTCSV`](./EXISTCSV.md) | `int`     | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int EXISTCSV charaNO
    ```
    Checks if the corresponding character is defined and assigns the result to `RESULT:0` or returns it.  
    Returns `1` if defined, `0` if not.  
    Can be used to check whether `ADDCHARA no` will execute without error.

!!! hint "Hint"

    Both command and expression function forms are available.


---

# EXISTFILE.en
---
---
hide:
  - toc
---

# EXISTFILE

| Function name                                                 | Arguments | Return |
| :------------------------------------------------------------ | :-------- | :----- |
| ![](../assets/images/IconEM.webp)[`EXISTFILE`](./EXISTFILE.md) | `string`  | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int EXISTFILE relativePath
	```

	Checks if the file exists at `relativePath` relative to `Emuera.exe` (".." is invalid). Returns `1` if it exists, `0` otherwise.

!!! hint "Hint"

    Available as both command and function in expressions

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        PRINT csv/VariableSize.csv: exists
        PRINTSL EXISTFILE("csv/VariableSize.csv") ? "Yes" # "No"
        PRINT erb/!@#$%^%^.txt: exists
        PRINTSL EXISTFILE("erb/!@#$%^%^.txt") ? "Yes" # "No"

        ONEINPUT
	```
	``` title="Result"
	csv/VariableSize.csv: exists
    erb/!@#$%^%^.txt: does not exist
	```

### Related
- [ENUMFILES](ENUMFILES.md)


---

# EXISTFUNCTION.en
---
---
hide:
  - toc
---

# EXISTFUNCTION

| Function name | Arguments | Return |
| :--------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEE.webp)[`EXISTFUNCTION`](./EXISTFUNCTION.md) | `string` | `int`  |

!!! info "API"

    ``` { #language-erbapi }
	int EXISTFUNCTION funcName
    ```

	In-expression function that checks if the function specified by the argument exists. Returns 1 for regular functions, 2 for in-expression functions (numeric type), or 3 for in-expression functions (string type).  
	Built-in in-expression functions return 0. System functions return 1 if defined in ERB, otherwise 0.

!!! hint "Hint"

	Available as both a statement and in-expression function.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
	#DIM DYNAMIC LCOUNT

		PRINTVL EXISTFUNCTION("TEST1")
		PRINTVL EXISTFUNCTION("TEST2")
		PRINTVL EXISTFUNCTION("TEST3")
		PRINTVL EXISTFUNCTION("SYSTEM_TITLE")
		PRINTVL EXISTFUNCTION("SHOP")
		WAIT

	@TEST1

	@TEST2
	#FUNCTION

	@TEST3
	#FUNCTIONS
    ```

    ``` title="Result"
	1
	2
	3
	1
	0
    ```

### Related
- [ENUMFUNC](ENUMFUNC.md)


---

# EXISTMETH.en
---
---
hide:
  - toc
---

# EXISTMETH

| Function name | Arguments | Return |
| :--------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/Iconetc.webp)[`EXISTMETH`](./EXISTMETH.md)  | `string`| `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int EXISTMETH functionName
    ```
	In-expression function that checks if an in-expression function exists. Returns 1 for `#FUNCTION`, 2 for `#FUNCTIONS`, or 0 if not found.

!!! hint "Hint"

	Available as both a statement and in-expression function.

### Related
- [EXISTFUNCTION](EXISTFUNCTION.md)
- [GETMETH,GETMETHS](GETMETH.md)


---

# EXISTSOUND.en
---
---
hide:
  - toc
---

# EXISTSOUND

| Function name                                                   | Arguments | Return |
| :-------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`EXISTSOUND`](./EXISTSOUND.md) | `string`  | `int`  |

!!! info "API"

	``` { #language-erbapi }
	EXISTSOUND MediaFile
	```

	Checks if the specified file exists in the `sound` folder  
	Returns 1 if it exists, 0 if it does not

!!! hint "Hint"

    Available as both command and function in expressions

### Related
- [PLAYSOUND](PLAYSOUND.md)
- [PLAYBGM](PLAYBGM.md)


---

# EXISTVAR.en
---
---
hide:
  - toc
---

# EXISTVAR

| Function name                                                 | Arguments  | Return |
| :----------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/IconEM.webp)[`EXISTVAR`](./EXISTVAR.md) | `string` | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int EXISTVAR varName
    ```

    If a variable or constant with the same name as `varName` is defined, returns a positive number depending on the type of variable/constant. Returns `0` if not defined.
    
    - For integer type, return value sets bit 1
    - For string type, return value sets bit 2
    - For constants, return value sets bit 3
    - For 2-dimensional arrays, return value sets bit 4
    - For 3-dimensional arrays, return value sets bit 5

!!! hint "Hint"

    Both command and expression function are supported.

!!! example "Example"

    ``` { #language-erh title="DEFINE.ERH" }
    #DIM CONST BIT = 0, 1, 1p1, 1p2, 1p3, 1p4, 1p5, 1p6, 1p7
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM キャラデータ, 2, 2
        #DIMS 名前

        ; "キャラデータ" is a 2D integer array so sets bit 1, 4
        PRINTFORML {EXISTVAR("キャラデータ")} {BIT:1|BIT:4}
        ; "BIT" is an integer constant array so sets bit 1, 3
        PRINTFORML {EXISTVAR("BIT")} {BIT:1|BIT:3}
        ; "名前" is a string type so sets bit 2
        PRINTFORML {EXISTVAR("名前")} {BIT:2}
        ; "性別" does not exist in the current context
        PRINTFORML {EXISTVAR("性別")}

        ONEINPUT

    @Foo
        #DIMS 性別
    ```
    ``` title="Result"
    9 9
    5 5
    2 2
    0
    ```

### Related Items
- [ENUMVAR](ENUMVAR.md)


---

# FIND_CHARADATA.en
---
---
hide:
  - toc
---

# FIND_CHARADATA

| Function name                                                           | Arguments | Return |
| :---------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`FIND_CHARADATA`](./FIND_CHARADATA.md) | `string`  | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int FIND_CHARADATA filename
    ```
    Searches for files that can be targets of [`LOADCHARA`](./LOADCHARA.md) in the dat folder and assigns the filename (the `*` part of `chara_*.dat`) to `RESULTS`.  
    The return value is the hit count (the number of files found).  
    The argument can specify the `*` part of `chara_*.dat`.  
    For example, `FIND_CHARADATA("*あなた*")` searches for `chara_*あなた*.dat`, and will match `chara_001あなた.dat` or `chara_あなたABC.dat`.  
    If the argument is omitted, it is equivalent to specifying `*`, searching for `chara_*.dat`.  
    Note that `chara_.dat` (where `*` is an empty string) does not match because it cannot be specified in [`LOADCHARA`](./LOADCHARA.md).  
    If the hit count exceeds the number of elements in `RESULTS`, it does not cause an error, but the excess filenames are not assigned.  


!!! hint "Hint"

    Command and expression function both supported.

### See Also
- [SAVECHARA](SAVECHARA.md)
- [LOADCHARA](LOADCHARA.md)
- [CHKCHARADATA](CHKCHARADATA.md)


---

# FINDCHARA.en
---
---
hide:
  - toc
---

# FINDCHARA, FINDLASTCHARA

| Function name                                                                 | Arguments                               | Return |
| :----------------------------------------------------------------------------- | :------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`FINDCHARA`](./FINDCHARA.md)     | `charaVariable`, `int`(, `int`, `int`) | `int`  |
| ![](../assets/images/IconEmuera.webp)[`FINDLASTCHARA`](./FINDCHARA.md) | `charaVariable`, `int`(, `int`, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int FINDCHARA charaVariable, value(, startID, endID)
	int FINDLASTCHARA charaVariable, value(, startID, endID)
    ```
    The `FINDCHARA` command specifies a character variable and a value, and returns the registration number of the character whose variable matches that value.  
    If multiple matches are found, `FINDCHARA` returns the first matching character, and `FINDLASTCHARA` returns the last matching character. Returns `-1` if not found.  
    You can also specify the third argument to set the search start position, and the fourth argument to set the search end position.  
    However, an error occurs if the search range exceeds the character count.

    ```  { #language-erbapi }
	X = -1
	WHILE 1
		FINDCHARA CFLAG:10, 123, X + 1
		X = RESULT
		SIF X < 0
			BREAK
		PRINTFORML %NAME:X%
	WEND
    ```

    The above script lists all characters with `CFLAG:10` equal to `123`.

!!! hint "Hint"

    Both command and expression function forms are available.


---

# FINDELEMENT.en
---
---
hide:
  - toc
---

# FINDELEMENT

| Function name                                                                     | Arguments                                   | Return |
| :------------------------------------------------------------------------------- | :------------------------------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`FINDELEMENT`](./FINDELEMENT.md)     | `variable`, `value`(, `int`, `int`, `int`) | `int`  |
| ![](../assets/images/IconEmuera.webp)[`FINDLASTELEMENT`](./FINDELEMENT.md) | `variable`, `value`(, `int`, `int`, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	FINDELEMENT variableName, value(, startIndex, endIndex, completeMatch)
	FINDLASTELEMENT variableName, value(, startIndex, endIndex, completeMatch)
    ```
	Function to get the position of a specific element within a specified range in an array.  
	`value` must be of the same type as `variableName`.  
	If there is an element in the search range of array elements specified by `startIndex` and `endIndex` that matches the content specified by `value`, it returns that position.  
	If `endIndex` is omitted, it searches to the end of the array.  
	If there are multiple matches, `FINDELEMENT` returns the first match, and `FINDLASTELEMENT` returns the last match. Returns `-1` if no match is found.  
	If the search target is a string type, you can use regular expressions similar to [`REPLACE`](./REPLACE.md).  
	`completeMatch` is only valid when the search target is string type. If it is `0`, partial string match is acceptable. If it is not `0`, only exact string match is acceptable.

	The `variableName` can only be 1-dimensional array variables; multidimensional arrays cannot be specified.  
	If a character array such as CFLAG is specified for `variableName`, it counts only for the specified character.

!!! hint "Hint"

    Both command and expression function are supported.


---

# FLOWINPUT.en
---
---
hide:
  - toc
---

# FLOWINPUT, FLOWINPUTS

| Function name                                                               | Arguments                       | Return |
| :-------------------------------------------------------------------------- | :------------------------------ | :----- |
| ![](../assets/images/IconEE.webp)[`FLOWINPUT`](./FLOWINPUT.md)             | `int`(, `int`, `int`, `int`) | `void` |
| ![](../assets/images/IconEE.webp)[`FLOWINPUTS`](./FLOWINPUT.md)            | `int`(, `string`)              | `void` |

!!! info "API"

	``` { #language-erbapi }
	FLOWINPUT default(, AllowLeftClick, AllowSkip, ForceSkip)
	FLOWINPUTS toggle(, default)
    ```

	Adds options for default value, left-click permission, and skip permission to INPUT in flow (such as in `@SHOW_SHOP`).
	Below are quotes for each option:

	```
	Added second argument to `INPUT`, `INPUTS`, `ONEINPUT`, `ONEINPUTS` (integer, optional, default is `0`).

    Added fifth argument to `TINPUT`, `TINPUTS`, `TONEINPUT`, `TONEINPUTS` (integer, optional, default is `0`).

    - When added argument == 0, or omitted: Same as original version.
    - When added argument != 0: Treats mouse clicks as Enter key (assigns empty string to `RESULTS`. If button is pressed, assigns button index to `RESULTS:1`). When left-clicked, sets `RESULT:1` to 1, when right-clicked sets `RESULT:1` to 2. Also, if ++shift++, ++ctrl++, or ++alt++ are pressed simultaneously, their key states are saved in `RESULT:2` (bits 16 17 18).
	```
	```
    Added third argument to `INPUT`, `INPUTS`, `ONEINPUT`, `ONEINPUTS` (integer, optional, default is `0`).

    Added sixth argument to `TINPUT`, `TINPUTS`, `TONEINPUT`, `TONEINPUTS` (integer, optional, default is `0`).

    - When added argument == 0, or omitted: Same behavior as original version.
    - When added argument != 0: Does not wait for input during skip via right-click, etc.
    However, the default value is applied. When used together with "INPUT system accepts mouse clicks" above, the default values are assigned to `RESULT:1` and `RESULTS:1` respectively, or to `RESULT:0` and `RESULTS:0` as usual if not used together.
    EE v46 added fourth argument. When set to non-0, forces skip by putting default value in `RESULT`.
    ```

	FLOWINPUTS enables with first argument non-0. When enabled, all `INPUT` in system flow are treated as `INPUTS`.  
	For screens like SHOP where processing changes with input values, it is recommended to set default values with `FLOWINPUT`. Other behavior control is done with `FLOWINPUT`.


!!! hint "Hint"

	Supports both command and expression function.

### See Also
- [BEGIN](BEGIN.md)


---

# FONT_OPERATION.en
---
---
hide:
  - toc
---

# FONT operations

| Function name                                                                    | Arguments | Return |
| :------------------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`FONTBOLD`](./FONT_OPERATION.md)          | none | none   |
| ![](../assets/images/IconEmuera.webp)[`FONTITALIC`](./FONT_OPERATION.md)        | none | none   |
| ![](../assets/images/IconEmuera.webp)[`FONTSTYLE`](./FONT_OPERATION.md)         | `int`| none   |
| ![](../assets/images/IconEmuera.webp)[`FONTREGULAR`](./FONT_OPERATION.md)      | none | none   |
| ![](../assets/images/IconEmuera.webp)[`GETSTYLE`](./FONT_OPERATION.md)          | none | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	FONTBOLD
	FONTITALIC
	FONTSTYLE
	FONTREGULAR bitStyle
	int GETSTYLE
    ```
	Changes the text style for subsequent characters.  
	`BOLD` and `ITALIC` can be combined (bold italic).  
	Calling `REGULAR` clears the bold and italic settings.

	`FONTSTYLE` changes subsequent text to the specified style.  
	If 0, normal; if 1, bold (same as `FONTBOLD`); if 2, italic (same as `FONTITALIC`); if 4, strikethrough; if 8, underline.  
	These can be combined bit by bit.  
	For example, FONTSTYLE 3 means bold and italic.  
	`FONTBOLD` and `FONTITALIC` add bold and italic styles to the current style respectively.  
	`FONTREGULAR` is equivalent to `FONTSTYLE 0`, returning to normal style.

	`GETSTYLE` returns the current font style (bold, italic, etc.) in `RESULT:0`.  
	This is the same value specified by the `SETSTYLE` command.  
	If `SETSTYLE` has not been called, it returns `0`.

!!! hint "Hint"

    `GETSTYLE` is supported as an expression function only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		FONTSTYLE 1 + 2
		PRINTL Bold + Italic
		FONTSTYLE 5
		PRINTL Bold + Strikethrough
		FONTITALIC
		PRINTL Bold + Italic + Strikethrough
		PRINTFORML GETSTYLE:{GETSTYLE()}
		FONTSTYLE 0
		PRINTW Normal
    ``` 
	![](../assets/images/FONT_OPERATION.png)


---

# FOR.en
---
---
hide:
  - toc
---

# FOR-NEXT

| Function name                                                  | Arguments                               | Return |
| :------------------------------------------------------------ | :-------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`FOR`](./FOR.md)       | `integerVariable`, `int`, `int`(, `int`) | none   |
| ![](../assets/images/IconEmuera.webp)[`NEXT`](./FOR.md)      | none                                    | none   |

!!! info "API"

    ```  { #language-erbapi }
	FOR integerVariable, startNum, endNum(, value)
    ```
	`FOR～NEXT` is an enhanced version of [`REPEAT～REND`](./REPEAT.md).  
	The first argument specifies the variable used for counting (in `REPEAT`, it is always `COUNT:0`).  
	The second argument specifies the initial value assigned to the variable (in `REPEAT`, it is always `0`).  
	The third argument specifies the value at which the loop ends (the value settable in `REPEAT`).  
	The fourth argument specifies the value added to the variable each iteration (in `REPEAT`, it is always `1`).  

    ```  { #language-erbapi }
	FOR COUNT, 0, X  
		;～  
	NEXT  
	REPEAT X  
		;～  
	REND  
    ```

	These two behave almost identically.  
	Both are constructs that repeat X times, and support [`CONTINUE`](./CONTINUE.md) and [`BREAK`](./CONTINUE.md) within the loop.  
	Differences include being able to specify a counter variable, and being able to change the start value and step.  
	`FOR～NEXT` can also be nested.

    ```  { #language-erbapi }
	FOR Y, 0, 100  
		FOR X, 0, 100  
			～  
		NEXT  
	NEXT  
    ```

	The variable specified in the first argument `integerVariable` must be a numeric variable only. Character variables cannot be used.  
	The fourth argument `value` is optional. If omitted, it is `1`.  
	When `value` is positive, `value` is added to the `integerVariable` each iteration, and the loop ends when the variable becomes greater than or equal to the third argument `endNum`.  
	When `value` is negative, the loop ends when the `integerVariable` becomes less than or equal to `endNum`.  
	When `value` is 0, it becomes an infinite loop that repeats forever until a [`BREAK`](./CONTINUE.md) statement is executed.  
	All values are fixed at the start of the loop and are not affected by subsequent variable changes.  
	The following two produce the same result:

    ```  { #language-erbapi }
	;1  
	X = 10  
	FOR COUNT:X, 0, X, X/10  
		X = 10000  
	NEXT  
	;2  
	FOR COUNT:10, 0, 10, 10/10  
		X = 10000  
	NEXT  
    ```
	Note that if you enter `FOR～NEXT` directly via commands like [`GOTO`](./GOTO.md), it executes normally up to just before `NEXT`, similar to `REPEAT～REND`, then ignores `NEXT` and continues from the next line.

!!! hint "Hint"

    Commands only.

### See Also
- [REPEAT-REND](REPEAT.md)
- [WHILE-WEND](WHILE.md)
- [CONTINUE,BREAK](CONTINUE.md)


---

# FORCE_BEGIN.en
---
---
hide:
  - toc
---

# FORCE_BEGIN

| Function name                                                             | Arguments  | Return |
| :----------------------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/IconEE.webp)[`FORCE_BEGIN`](./FORCE_BEGIN.md) | `string` | `void` |

!!! info "API"

	``` { #language-erbapi }
	FORCE_BEGIN SystemFuncName
    ```

	Executes `BEGIN` without being affected by flow control.

!!! hint "Hint"

    Can only be used as a command.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		BEGIN ABLUP

	@SHOW_JUEL
		PRINTL @SHOW_JUEL
		FORCE_BEGIN SHOP

	@EVENTSHOP
		PRINTL @EVENTSHOP

	@SHOW_SHOP
		PRINTL @SHOW_SHOP
		FORCE_BEGIN TURNEND

	@EVENTTURNEND
		PRINTL @EVENTTURNEND
		WAIT

	```

	``` title="Result"
	@SHOW_JUEL
	@EVENTSHOP
	@SHOW_SHOP
	@EVENTTURNEND
    ```

### See Also
- [BEGIN](BEGIN.md)


---

# FORCE_QUIT.en
---
---
hide:
  - toc
---

# FORCE_QUIT

| Function name                                                           | Arguments | Return |
| :--------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`FORCE_QUIT`](./FORCE_QUIT.md) | `void` | `void` |

!!! info "API"

	``` { #language-erbapi }
	FORCE_QUIT
	```

	Executes `QUIT` without the `WAIT`.

!!! hint "Hint"

	Can only be used as a command.

### See Also
- [QUIT](QUIT.md)


---

# FORCE_QUIT_AND_RESTART.en
---
---
hide:
  - toc
---

# FORCE_QUIT_AND_RESTART

| Function name                                                                                   | Arguments   | Return |
| :--------------------------------------------------------------------------------------- | :----- | :----- |
| ![](../assets/images/IconEE.webp)[`FORCE_QUIT_AND_RESTART`](./FORCE_QUIT_AND_RESTART.md) | `void` | `void` |

!!! info "API"

	``` { #language-erbapi }
	FORCE_QUIT_AND_RESTART
	```

	Performs `QUIT_AND_RESTART` without waiting

!!! hint "Hint"

	Available only as a command  
	If executed consecutively without player input, a warning dialog will be displayed

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE

		FORCE_QUIT_AND_RESTART
	```

	![](../assets/images/FORCE_QUIT_AND_RESTART.png)

### Related Topics
- [QUIT_AND_RESTART](QUIT_AND_RESTART.md)


---

# FORCEKANA.en
---
---
hide:
  - toc
---

# FORCEKANA

| Function name                                                        | Arguments | Return |
| :------------------------------------------------------------------ | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`FORCEKANA`](./FORCEKANA.md) | `int`| none   |

!!! info "API"

    ```  { #language-erbapi }
	FORCEKANA int
    ```
	Specifies hiragana/katakana for display commands.
	Effective with various [`PRINT`](./PRINT.md) commands that include the `K` keyword.
	The argument has the following effects:

	- 0: No conversion
	- 1: Hiragana → Katakana
	- 2: Katakana → Hiragana (full-width only)
	- 3: Katakana → Hiragana (both full-width and half-width)

!!! hint "Hint"

    Command only.


---

# FORCEWAIT.en
---
---
hide:
  - toc
---

# FORCEWAIT

| Function name                                                       | Arguments | Return |
| :------------------------------------------------------------------ | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`FORCEWAIT`](./FORCEWAIT.md) | none      | none   |

!!! info "API"

    ```  { #language-erbapi }
	FORCEWAIT
    ```
    A [`WAIT`](./WAIT.md) command that cannot be skipped by right-click or macro skip.  
    The skip state is cleared when this command is reached.


!!! hint "Hint"

    Command only.

### See Also
- [WAIT](WAIT.md)


---

# FORM.en
---
---
hide:
  - toc
---

# CALLFORM, JUMPFORM, GOTOFORM

| Function name | Arguments | Return |
| :----------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CALLFORM`](./FORM.md) | `functionName`(, `any`...) | none   |
| ![](../assets/images/IconEmuera.webp)[`JUMPFORM`](./FORM.md) | `functionName`(, `any`...) | none   |
| ![](../assets/images/IconEmuera.webp)[`GOTOFORM`](./FORM.md) | `labelName`                | none   |

!!! info "API"

    ```  { #language-erbapi }
	CALLFORM functionName(, argument...)
	JUMPFORM functionName(, argument...)
	GOTOFORM labelName
    ```
	Same as [`CALL`](./CALL.md), [`JUMP`](./JUMP.md), and [`GOTO`](./GOTO.md), but allows specifying function names in the same format as [`PRINTFORM`](./PRINT.md).

    ```  { #language-erbapi }
	CALLFORM KOJO_{NO:TARGET}_{SELECTCOM}
    ```

	Can be used like the example above. `JUMPFORM` and `CALLFORM` can accept arguments. See the [function argument specification](../Emuera//function.md#_2) section for details.  
	Note: For entering loop/branch syntax directly via `GOTOFORM`, see [`TRYGOTO`](./TRY.md), [Loop/Branch Syntax](../Reference/README.md#_8), and the [TRYC system](./TRYC.md).

!!! hint "Hint"

    Only available as a statement.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIMS HOGE
		HOGES = AAA
		CALLFORM %HOGES%
		JUMPFORM %"C"*3%

	@AAA
		PRINTL AAA

	@CCC
		PRINTL CCC
		WAIT
    ``` 
    ``` title="Result"
	AAA
	CCC
    ```

### Related
- [CALL](CALL.md)
- [JUMP](JUMP.md)
- [GOTO](GOTO.md)
- [TRYC system](TRYC.md)


---

# GCLEAR.en
---
---
hide:
  - toc
---

# GCLEAR

| Function name                                                      | Arguments      | Return |
| :----------------------------------------------------------- | :------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`GCLEAR`](./GCLEAR.md) | `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GCLEAR gID, cARGB
    ```
	Replaces the entire area of the `Graphics` with the specified `gID` with the specified color.  
	Returns non-zero on success.  
	An error occurs if `gID` or color specification is invalid.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GSETCOLOR](GSETCOLOR.md)


---

# GCREATE.en
---
---
hide:
  - toc
---

# GCREATE

| Function name                                                    | Arguments        | Return |
| :-------------------------------------------------------------- | :--------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GCREATE`](./GCREATE.md) | `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GCREATE gID, width, height
    ```
	Creates a `Graphics` with the specified `gID` and size.  
	The `gID` must be a non-negative integer, and `width` and `height` must be integers between 1 and 8192.  
	An error occurs if arguments are outside this range.  
	Returns non-zero on success.  
	Returns 0 if a `Graphics` with the specified `gID` already exists.  
	To recreate a `Graphics`, use the [`GDISPOSE`](./GDISPOSE.md) command to dispose of the existing `Graphics` first.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GCREATEFROMFILE](GCREATEFROMFILE.md)
- [GDISPOSE](GDISPOSE.md)


---

# GCREATED.en
---
---
hide:
  - toc
---

# GCREATED

| Function name                                                        | Arguments | Return |
| :--------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GCREATED`](./GCREATED.md) | `int`     | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GCREATED gID
    ```
	Returns 1 if the `Graphics` with the specified `gID` has been created, or 0 if it has not been created (including if disposed).

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GCREATE](GCREATE.md)


---

# GCREATEFROMFILE.en
---
---
hide:
  - toc
---

# GCREATEFROMFILE

| Function name                                                                        | Arguments         | Return |
| :----------------------------------------------------------------------------- | :---------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GCREATEFROMFILE`](./GCREATEFROMFILE.md) | `int`, `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GCREATEFROMFILE gID, filePath
    ```
	Opens an image file from the `resources` folder using a relative path and creates a `Graphics`.  
	Unlike images declared in CSV files in the `resources` folder, image files are not locked. (In EM+EE, images specified in CSV are also not locked.)  
	Returns non-zero on success.  
	If a `Graphics` with the specified `gID` already exists, `Graphics` creation fails and this command returns 0 without doing anything.  
	Also returns 0 if the file doesn't exist, cannot be recognized as an image, or the file size is too large.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GCREATE](GCREATE.md)


---

# GDASHSTYLE.en
---
---
hide:
  - toc
---

# GDASHSTYLE

| Function name                                                        | Arguments                | Return |
| :------------------------------------------------------------- | :----------------------| :----- |
| ![](../assets/images/IconEE.webp)[`GDASHSTYLE`](./GDASHSTYLE.md) | `int`, `int`, `int` | 1      |

!!! info "API"

	``` { #language-erbapi }
	int GDASHSTYLE gID, DashStyle, DashCap
	```

	Sets the line style for `GDRAWLINE`. DashStyle and DashCap can be specified using the numeric values of C#'s DashStyle and DashCap enumerations.  
	DashStyle: 0=solid line, 1=line composed of dashes, 2=line composed of dots, 3=line composed of dashes and dots, 4=line composed of dashes and two dots  
	DashCap (line end shape): 0=normal shape (right angle), 2=rounded shape, 3=triangular shape. 1 is unused. Direct complaints to Microsoft.

!!! hint "Hint"

	Both command and expression function supported.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		#DIM DYNAMIC LCOUNT
		FOR LCOUNT, 0, 5
			GCREATE LCOUNT, 100, 100

			GSETPEN LCOUNT, 0xFFFF0000, 5
			
			GDASHSTYLE LCOUNT, 1, 3
			GSETPEN LCOUNT, 0xFFFF0000, 4

			GCLEAR LCOUNT, 0xFFFFFFFF

			GDRAWLINE LCOUNT, 0, 0, 100, (LCOUNT+1)*20

			SPRITECREATE @"LINE{LCOUNT}", LCOUNT
			HTML_PRINT @"<img src='LINE{LCOUNT}' srcb='' height='500'>"
			REPEAT 4
				PRINTL
			REND
		NEXT
		WAIT
	```

	![](../assets/images/GDASHSTYLE.png)

### Related Items
- [GDRAWLINE](GDRAWLINE.md)


---

# GDISPOSE.en
---
---
hide:
  - toc
---

# GDISPOSE

| Function name                                                          | Arguments | Return |
| :--------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GDISPOSE`](./GDISPOSE.md) | `int`     | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GDISPOSE gID
    ```
	Disposes the `Graphics` with the specified `gID`.  
	Returns non-zero on success.  
	Returns 0 if the `Graphics` with the specified `gID` does not exist (including if already disposed).

!!! hint "Hint"

    Both command and expression function supported.


---

# GDRAWG.en
---
---
hide:
  - toc
---

# GDRAWG

| Function name                                                      | Arguments                                                                                      | Return |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GDRAWG`](./GDRAWG.md) | `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`                        | `int`  |
|                                                              | `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `integerVariable` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GDRAWG destID, srcID, destX, destY, destWidth, destHeight, srcX, srcY, srcWidth, srcHeight
	int GDRAWG destID, srcID, destX, destY, destWidth, destHeight, srcX, srcY, srcWidth, srcHeight, colorMatrix
    ```
	Draws the `Graphics` with the specified `srcID` onto the `Graphics` with the specified `destID`.  
	Specify the destination position and size with 4 integers for `dest`, and the source position and size with 4 integers for `src`.  
	Optionally, you can specify a 5x5 or larger 2D numeric array as `colorMatrix` to apply a color matrix during drawing.  
	All elements of `colorMatrix` are divided by 256 before being passed to the .Net Framework `ColorMatrix` class. That is, a 5x5 matrix with all diagonals at 256 becomes the identity matrix.  
	Returns non-zero on success.  
	Returns 0 if either the destination or source `Graphics` does not exist.  
	The source and destination `Graphics` can be the same.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GDRAWSPRITE](GDRAWSPRITE.md)


---

# GDRAWGWITHMASK.en
---
---
hide:
  - toc
---

# GDRAWGWITHMASK

| Function name                                                                      | Arguments                            | Return |
| :--------------------------------------------------------------------------- | :---------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GDRAWGWITHMASK`](./GDRAWGWITHMASK.md) | `int`, `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	GDRAWGWITHMASK destID, srcID, maskID, destX, destY
    ```
	Draws the `Graphics` with `srcID` onto the `Graphics` with `destID`, applying the `Graphics` with `maskID` as a mask.  
	Specify the drawing position within `destID` with `destX, destY`.  
	Returns non-zero on success.  
	The conditions for success are that `srcID` and `maskID` must have exactly matching widths and heights, and the drawing area must not exceed the bounds of `destID`.  
	Applying a mask means applying the blue value of the mask image as opacity to the source image.  
	For example, if the mask is completely white (blue value is MAX everywhere), the source image is drawn as if there were no mask.  
	If the mask is completely black (blue value is 0 everywhere), the source image is treated as completely transparent and nothing happens.  
	Note that this command is processed by the CPU in a single thread, not by the GPU, so don't expect high speed.

!!! hint "Hint"

    Both command and expression function supported.


---

# GDRAWGWITHROTATE.en
---
---
hide:
  - toc
---

# GDRAWGWITHROTATE

| Function name                                                                      | Arguments                              | Return |
| :--------------------------------------------------------------------------- | :----------------------------------- | :----- |
| ![](../assets/images/IconEE.webp)[`GDRAWGWITHROTATE`](./GDRAWGWITHROTATE.md) | `int`, `int`, `int`(, `int`, `int`) | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int GDRAWGWITHROTATE gID, destID, Angle(, x, y)
	```

	Rotates the image of `destID` by the specified `Angle` degrees to the right and pastes it onto `gID`.  
	`x` and `y` specify the center of rotation. If omitted, it becomes `x/2`, `y/2` (center point of the entire image).

!!! hint "Hint"

    Both command and expression function supported.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
	#DIMS HTML

		GCREATE 0, 400, 400
		GCREATE 1, 400, 400
		GCREATE 2, 400, 400

		GSETFONT 0, "Arial", 100
		GDRAWTEXT 0, "Emuera", 30, 150
		
		GDRAWGWITHROTATE 1, 0, 90
		GDRAWGWITHROTATE 2, 0, 180

		REPEAT 3
			SPRITECREATE @"TEST{COUNT}", COUNT
			HTML += @"<img src='TEST{COUNT}' height = '400' width = '400'>"
		REND
		HTML_PRINT HTML
		PRINTL 
		PRINTL 
		PRINTL 
		WAIT
	```

	![](../assets/images/GDRAWGWITHROTATE.png)


---

# GDRAWLINE.en
---
---
hide:
  - toc
---

# GDRAWLINE

| Function name                                                        | Arguments                            | Return |
| :------------------------------------------------------------- | :---------------------------------- | :----- |
| ![](../assets/images/IconEE.webp)[`GDRAWLINE`](./GDRAWLINE.md) | `int`, `int`, `int`, `int`, `int` | 1      |

!!! info "API"

	``` { #language-erbapi }
	int GDRAWLINE gID, fromX, fromY, forX, forY
	```

	Draws a line from coordinates `fromX`,`fromY` to coordinates `forX`,`forY` on the `Graphics` specified by `gID`.  
	Uses the color and thickness specified by `GSETPEN`.

!!! hint "Hint"

	Both command and expression function supported.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
	#DIM DYNAMIC LCOUNT

		FOR LCOUNT, 0, 5
			GCREATE LCOUNT, 100, 100
			GCLEAR LCOUNT, 0xFFFFFFFF
			GSETPEN LCOUNT, 0xFFFF0000, 5
			GDRAWLINE LCOUNT, 0, 0, 100, (LCOUNT+1)*20
			SPRITECREATE @"LINE{LCOUNT}", LCOUNT
			HTML_PRINT @"<img src='LINE{LCOUNT}' srcb='' height='500'>"
			REPEAT 4
				PRINTL
			REND
		NEXT
		WAIT
	```

	![](../assets/images/GDRAWLINE.png)

### Related Items
- [GSETPEN](GSETPEN.md)
- [GDASHSTYLE](GDASHSTYLE.md)


---

# GDRAWSPRITE.en
---
---
hide:
  - toc
---

# GDRAWSPRITE

| Function name                                                                  | Arguments                                                         | Return |
| :--------------------------------------------------------------------- | :--------------------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GDRAWSPRITE`](./GDRAWSPRITE.md) | `int`, `string`                                                | `int`  |
|                                                                        | `int`, `string`, `int`, `int`                                  | `int`  |
|                                                                        | `int`, `string`, `int`, `int`, `int`, `int`                    | `int`  |
|                                                                        | `int`, `string`, `int`, `int`, `int`, `int`, `integerVariable` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GDRAWSPRITE gID, spriteName
	int GDRAWSPRITE gID, spriteName, destX, destY
	int GDRAWSPRITE gID, spriteName, destX, destY, destWidth, destHeight
	int GDRAWSPRITE gID, spriteName, destX, destY, destWidth, destHeight, colorMatrix
    ```
	Draws the `Sprite` with the specified `spriteName` onto the `Graphics` with the specified `gID`.  
	Optionally, you can specify the position within the `Graphics` with `destX, destY` to draw the `Sprite` at that position.  
	You can also specify the drawing width and height with `destWidth, destHeight` to scale and draw the `Sprite` to that size.  
	Furthermore, you can specify a 5x5 matrix as `colorMatrix` to apply a color matrix during drawing.  
	Note that the `Sprite` size can be obtained using the `SPRITEWIDTH(str imgName), SPRITEHEIGHT(str imgName)` functions.  
	Returns non-zero on success.  

	If an animated sprite is specified, one frame of the animation is drawn.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GDRAWG](GDRAWG.md)


---

# GDRAWTEXT.en
---
---
hide:
  - toc
---

# GDRAWTEXT

| Function name                                                        | Arguments                          | Return |
| :------------------------------------------------------------- | :-------------------------------- | :----- |
| ![](../assets/images/IconEE.webp)[`GDRAWTEXT`](./GDRAWTEXT.md) | `int`, `string`(, `int`, `int`) | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int GDRAWTEXT gID, text(, x, y)
	```

	Draws `text` on the `Graphics` specified by `gID`. Uses the font and outline specified by `GSETFONT` and `GSETPEN`.  
	If `x`,`y` are omitted, draws at position `0`, `0`.

!!! hint "Hint"

	Both command and expression function supported.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
	#DIM DYNAMIC LCOUNT

		FOR LCOUNT, 1, 6
			GCREATE LCOUNT, 2000, 300
			GSETFONT LCOUNT, "Arial", LCOUNT*50, 0
			GSETPEN LCOUNT, 0xFFFF0000, 5
			GDRAWTEXT LCOUNT, "ABC"
			SPRITECREATE @"TEST{LCOUNT}", LCOUNT
			HTML_PRINT @"<img src='TEST{LCOUNT}' srcb='' height='300'>"
			REPEAT 2
				PRINTL 
			REND
		NEXT
	```

	![](../assets/images/GDRAWTEXT.png)

### Related Items
- [GSETFONT](GSETFONT.md)
- [GSETPEN](GSETPEN.md)
- [GGETTEXTSIZE](GGETTEXTSIZE.md)


---

# GETCHARA.en
---
---
hide:
  - toc
---

# GETCHARA

| Function name                                                   | Arguments | Return |
| :------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETCHARA`](./GETCHARA.md) | `int`     | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GETCHARA charaNO
    ```
    Checks whether the specified character exists among the currently owned characters and returns their position in the list, or `-1` if not found.  
    Can be used to check if a specific character exists in the entire list.

!!! hint "Hint"

    Both command and expression function forms are available.


---

# GETCOLOR.en
---
---
hide:
  - toc
---

# GETCOLOR functions

| Function name                                                                | Arguments | Return |
| :--------------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETCOLOR`](./GETCOLOR.md)           | none | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETBGCOLOR`](./GETCOLOR.md)         | none | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETDEFCOLOR`](./GETCOLOR.md)         | none | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETDEFBGCOLOR`](./GETCOLOR.md)      | none | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETFOCUSCOLOR`](./GETCOLOR.md)      | none | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GETCOLOR
	int GETBGCOLOR
	int GETDEFCOLOR
	int GETDEFBGCOLOR
	int GETFOCUSCOLOR
    ```
	Each function returns the color code in `RESULT:0`.  
	`GETCOLOR` returns the currently used text color, `GETDEFCOLOR` returns the text color specified in [config](../Emuera/config.md#_28), `GETBGCOLOR` returns the currently used background color,  
	`GETDEFBGCOLOR` returns the [default background color](../Emuera/config.md#_27), and `GETFOCUSCOLOR` returns the [text color when a button is selected](../Emuera/config.md#_29).  
	The return value is in hexadecimal format as `0xRRGGBB`.  
	For example, orange (R,G,B) = (`255, 128, 0`) returns `0xFF8000` (which is `16744448` in decimal).  
	For color-to-number mapping, you can refer to websites that explain web colors.  
	Due to changes in version 1.731, the [`SETCOLOR`](./SETCOLOR.md) command can now also accept the format `SETCOLOR 0xFF8000`.

!!! hint "Hint"

    Command and expression function both supported.

### Related
- [SETCOLOR](SETCOLOR.md)
- [SETBGCOLOR](SETBGCOLOR.md)
- [GETCONFIG](GETCONFIG.md)


---

# GETCONFIG.en
---
---
hide:
  - toc
---

# GETCONFIG(S)

| Function name                                                      | Arguments | Return    |
| :---------------------------------------------------------------- | :-------- | :-------- |
| ![](../assets/images/IconEmuera.webp)[`GETCONFIG`](./GETCONFIG.md)  | `string`  | `int`     |
| ![](../assets/images/IconEmuera.webp)[`GETCONFIGS`](./GETCONFIG.md) | `string`  | `string`  |

!!! info "API"

    ```  { #language-erbapi }
	int GETCONFIG configWord
	string GETCONFIGS configWord
    ```
	Gets the configuration and [`replace.csv`](../Emuera/replace.md) settings as an integer or string.  
	For available items, see the [config](../Emuera/config.md) page.

!!! hint "Hint"

    Available as both command and function in expressions

### Related
- [GETCOLOR](GETCOLOR.md)
- [PRINTCPERLINE](PRINTCPERLINE.md)


---

# GETDISPLAYLINE.en
---
---
hide:
  - toc
---

# GETDISPLAYLINE

| Function name                                                     | Arguments  | Return      |
| :--------------------------------------------------------------- | :--------- | :---------- |
| ![](../assets/images/IconEE.webp)[`GETDISPLAYLINE`](./GETDISPLAYLINE.md) | `int` | `string`  |

!!! info "API"

	``` { #language-erbapi }
	string GETDISPLAYLINE lineNumber
	```

	Returns the string from the specified line of already displayed lines.

!!! hint "Hint"

    Command and expression function both supported.  
	Display lines are managed as an array, so they start from 0. You can loop through all lines using the `LINECOUNT` variable.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		PRINTL AAA
		PRINTL BBB
		PRINTL CCC

		REPEAT LINECOUNT
			PRINTFORML Line {COUNT}:%GETDISPLAYLINE(COUNT)%
		REND
		WAIT
	```
	``` title="Result"
	Now Loading...
	AAA
	BBB
	CCC
	0:Now Loading...
	1:AAA
	2:BBB
	3:CCC
	```

### Related
- [HTML_POPPRINTINGSTR](HTML_POPPRINTINGSTR.md)


---

# GETKEY.en
---
---
hide:
  - toc
---

# GETKEY, GETKEYTRIGGERED

| Function name                                                                | Arguments      | Return |
| :-------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETKEY`](./GETKEY.md)          | `keyCode` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETKEYTRIGGERED`](./GETKEY.md) | `keyCode` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	GETKEY keyCode
	GETKEYTRIGGERED keyCode
    ```
	`GETKEY` returns the state of keyboard and mouse buttons.  
	If the key specified by the argument is pressed, it returns 1; if not pressed, it returns 0.  

	`GETKEYTRIGGERED` returns the state of keyboard and mouse buttons similarly to `GETKEY`.  
	While `GETKEY` gets whether a key is currently pressed, `GETKEYTRIGGERED` returns 1 only immediately after the key is pressed.  
	That is, if the key is continuously held down, `GETKEY` returns 1, but `GETKEYTRIGGERED` returns 1 only for the first time and then returns 0.  

	These functions only return 1 when Emuera's window is active; if not active, they return 0 regardless of the key state.  
	For the correspondence between key code values and actual keys, refer to Microsoft's MSDN documentation for [`GetKeyState()`](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getkeystate).

!!! hint "Hint"

    Both commands and expression functions are supported.

### See Also
- [AWAIT](AWAIT.md)


---

# GETLINESTR.en
---
---
hide:
  - toc
---

# GETLINESTR

| Function name                                                               | Arguments | Return   |
| :-------------------------------------------------------------------------- | :-------- | :-------- |
| ![](../assets/images/IconEmuera.webp)[`GETLINESTR`](./GETLINESTR.md) | `string`  | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string GETLINESTR pattern
    ```
	Returns the string that would be displayed when passed to [`CUSTOMDRAWLINE`](./CUSTOMDRAWLINE.md) or [`DRAWLINEFORM`](./CUSTOMDRAWLINE.md).
	The length of the string returned by this command or expression function is not guaranteed to correspond to the "string length that can be displayed on one line".

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [DRAWLINE](DRAWLINE.md)
- [CUSTOMDRAWLINE](CUSTOMDRAWLINE.md)


---

# GETMEMORYUSAGE.en
---
---
hide:
  - toc
---

# GETMEMORYUSAGE

| Function name                                                     | Arguments | Return |
| :--------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`GETMEMORYUSAGE`](./GETMEMORYUSAGE.md) | `void` | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int GETMEMORYUSAGE
	```

	Returns the current memory usage of the running Emuera in bytes.

!!! hint "Hint"

    Available as both command and function in expressions

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		PRINTFORMW Current memory usage is {GETMEMORYUSAGE()/1024/1024}MB
		REPEAT 10000
			ADDVOIDCHARA
		REND
		PRINTFORMW Memory usage after executing ADDVOIDCHARA 10000 times is {GETMEMORYUSAGE()/1024/1024}MB
	```

	``` title="Result"
	Current memory usage is 112MB
	Memory usage after executing ADDVOIDCHARA 10000 times is 934MB
	```

### Related
- [CLEARMEMORY](CLEARMEMORY.md)


---

# GETMETH.en
---
---
hide:
  - toc
---

# GETMETH,GETMETHS

| Function name | Arguments | Return |
| :----------------------------------------------------------- | :---------------------------------- | :-------- |
| ![](../assets/images/Iconetc.webp)[`GETMETH`](./GETMETH.md)  | `string`(, `int`, `argument`...)    | `int`     |
| ![](../assets/images/Iconetc.webp)[`GETMETHS`](./GETMETH.md) | `string`(, `string`, `argument`...) | `string`  |

!!! info "API"

    ```  { #language-erbapi }
	int GETMETH functionName(, defaultValue, argument...)
	string GETMETHS functionName(, defaultValue, argument...)
    ```
	Calls an in-expression function from a string. `GETMETH` corresponds to `#FUNCTION`, and `GETMETHS` corresponds to `#FUNCTIONS`.  
	The second argument is the return value if the function is not found; the third and subsequent arguments become the arguments for the in-expression function specified in the first argument.

!!! hint "Hint"

	Available as both a statement and in-expression function.

### Related
- [GETVAR,GETVARS,SETVAR](GETSETVAR.md)


---

# GETMILLISECOND.en
---
---
hide:
  - toc
---

# GETMILLISECOND

| Function name                                                               | Arguments | Return |
| :-------------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETMILLISECOND`](./GETMILLISECOND.md) | none      | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GETMILLISECOND
    ```
    Gets the elapsed time in milliseconds since January 1, 1 AD.  
    Since it can be added/subtracted as-is, it is more suitable than GETTIME for measuring elapsed time, etc.  
    Note that the precision of the return value depends on the execution environment, but is around several tens of milliseconds.  
    (If only a few milliseconds have passed, the same value may be returned.)  
    Please be careful if measuring performance is your goal.  


!!! hint "Hint"

    Command and expression function both supported.

### See Also
- [GETSECOND](GETSECOND.md)
- [GETTIME](GETTIME.md)


---

# GETNUM.en
---
---
hide:
  - toc
---

# GETNUM

| Function name                                                   | Arguments           | Return |
| :------------------------------------------------------------- | :------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETNUM`](./GETNUM.md) | `variable`, `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	GETNUM variableName, indexName
    ```
	Gets the numeric value from the name defined in each CSV and assigns it to `RESULT:0`.  
	For example, if `2,技巧` is defined in `abl.csv`, then executing `GETNUM ABL, "技巧"` will assign `2` to `RESULT:0`.  
	If not defined, the result is `-1`.  
	The correspondence between CSV and variables follows the "Array element specification by string" in the ["Syntax added in Emuera"](../Emuera/expression.md#_10) page.

!!! hint "Hint"

    Both command and expression function are supported.

### Related Items
- [CSV Status Functions](CSV_STATUS.md)


---

# GETPALAMLV.en
---
---
hide:
  - toc
---

# GETPALAMLV, GETEXPLV

| Function name                                                                   | Arguments  | Return |
| :------------------------------------------------------------------------------ | :--------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETPALAMLV`](./GETPALAMLV.md) | `int`, `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETEXPLV`](./GETPALAMLV.md)   | `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	GETPALAMLV int, maxLV
	GETEXPLV int, maxLV
    ```
	Compares the given value with `PALAMLV` / `EXPLV`, and assigns to `RESULT:0` how far up to which level the argument is greater than or equal to in `PALAMLV` / `EXPLV`.  
	The second argument represents the maximum LV to investigate. Please set the values of `PALAMLV` / `EXPLV` before using this function.

!!! hint "Hint"

    Both command and expression function are supported.


---

# GETSECOND.en
---
---
hide:
  - toc
---

# GETSECOND

| Function name                                                       | Arguments | Return |
| :------------------------------------------------------------------ | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETSECOND`](./GETSECOND.md) | none      | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GETTIME
    ```
    Gets the elapsed time in seconds since January 1, 1 AD and assigns it to RESULT:0.  
    Since it can be added/subtracted as-is, it is more suitable than GETTIME for measuring elapsed time, etc.  


!!! hint "Hint"

    Command and expression function both supported.

### See Also
- [GETMILLISECOND](GETMILLISECOND.md)
- [GETTIME](GETTIME.md)


---

# GETSETVAR.en
---
---
hide:
  - toc
---

# SETVAR, GETVAR Functions

| Function name                                                   | Arguments      | Return   |
| :------------------------------------------------------------- | :------------- | :------- |
| ![](../assets/images/IconEM.webp)[`GETVAR`](./GETSETVAR.md)  | `string`       | `int`    |
| ![](../assets/images/IconEM.webp)[`GETVARS`](./GETSETVAR.md) | `string`       | `string` |
| ![](../assets/images/IconEM.webp)[`SETVAR`](./GETSETVAR.md)  | `string`, `any` | `1`      |

!!! info "API"
    
    ``` { #language-erbapi }
    int GETVAR varName
    string GETVARS varName
    1 SETVAR varName, value
    ```

    `GET` and `SET` functions for variables/constants represented by `varName` (constants cannot be `SET`).

    - `GETVAR` returns the value of the integer type variable/constant represented by `varName`.
    - `GETVARS` returns the value of the string type variable/constant represented by `varName`.
    - `SETVAR` assigns `value` to the variable represented by `varName`. `value` must be of the same type as the variable.

!!! hint "Hint"

    Both command and expression function are supported.

!!! example "Example"

    ``` { #language-erh title="DEFINE.ERH" }
    #DIMS CONST 定数文字列 = "Banana"
    #DIM 整数型変数 = 10
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS ローカル文字列 = "local"

        ; Error: "Foo" is not a recognizable identifier
        ; PRINTFORML {GETVAR("Foo")} 
        PRINTFORM {GETVAR("整数型変数")} %GETVARS("ローカル文字列")% 
        PRINTSL GETVARS("定数文字列")

        ; Error: "定数文字列" is not a variable
        ; SETVAR "定数文字列", "Apple"
        ; Error: "整数型変数" is not string type
        ; SETVAR "整数型変数", "Apple"
        SETVAR "ローカル文字列", "Apple"
        PRINTSL ローカル文字列

        ONEINPUT
    ```
    ``` title="Result"
    10 local Banana
    Apple
    ```

### Related Items
- [STRFORM](STRFORM.md)
- [GETMETH,GETMETHS](GETMETH.md)


---

# GETTIME.en
---
---
hide:
  - toc
---

# GETTIME

| Function name                                                       | Arguments | Return          |
| :------------------------------------------------------------------ | :-------- | :-------------- |
| ![](../assets/images/IconEmuera.webp)[`GETTIME`](./GETTIME.md)     | none      | `int`, `string` |
| ![](../assets/images/IconEmuera.webp)[`GETTIME()`](./GETTIME.md)   | none      | `int`           |
| ![](../assets/images/IconEmuera.webp)[`GETTIMES()`](./GETTIME.md)  | none      | `string`        |

!!! info "API"

    ```  { #language-erbapi }
	GETTIME
	int GETTIME
	string GETTIMES
    ```
    Assigns information about the current date and time of the PC to `RESULT:0` and `RESULTS:0`.  
    If the current date and time is March 28, 2009 13:05:23.678, then `RESULT:0` is assigned `20090328130523678`.  
    `RESULTS:0` is assigned `2009/03/28 13:05:23`.  
    `RESULTS:0` is primarily intended for use in save data comments.  
    If you want to use a custom format for the date, please decompose `RESULT:0` and use it.  
    Note that the precision of `RESULT:0` depends on the execution environment, but is around several tens of milliseconds.  
    (If only a few milliseconds have passed, the same value may be returned.)  
    Please be careful if measuring performance is your goal.

    As expression functions, `GETTIME()` and `GETTIMES()` return the values that would be assigned to `RESULT:0` and `RESULTS:0` when the `GETTIME` command is executed.  


!!! hint "Hint"

    Command and expression function both supported.

### See Also
- [GETSECOND](GETSECOND.md)
- [GETMILLISECOND](GETMILLISECOND.md)


---

# GFILLRECTANGLE.en
---
---
hide:
  - toc
---

# GFILLRECTANGLE

| Function name                                                                      | Arguments                            | Return |
| :--------------------------------------------------------------------------- | :---------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GFILLRECTANGLE`](./GFILLRECTANGLE.md) | `int`, `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GFILLRECTANGLE gID, x, y, width, height
    ```
	Draws a rectangle at `x, y` with the specified `width` and `height` on the `Graphics` with the specified `gID`.  
	Returns non-zero on success.  
	The drawing color defaults to the Emuera config text color if not specified beforehand using the [`GSETBRUSH`](./GSETBRUSH.md) command.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GSETBRUSH](GSETBRUSH.md)


---

# GGETBRUSH.en
---
---
hide:
  - toc
---

# GGETBRUSH

| Function name                                                        | Arguments | Return |
| :------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`GGETBRUSH`](./GGETBRUSH.md) | `int`     | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int GGETBRUSH gID
	```

	Returns the color set by `GSETBRUSH` for the `Graphics` with the specified `gID` (cARGB).

!!! hint "Hint"

    Both command and expression function supported.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		GCREATE 0, 100, 100
		GSETBRUSH 0, 0xFF112233

		PRINTFORMW Color:{GGETBRUSH(0)}(%CONVERT(GGETBRUSH(0), 16)%)
	```

	``` title="Result"
	Color:4279312947(ff112233)
	```

### Related Items
- [GSETBRUSH](GSETBRUSH.md)


---

# GGETCOLOR.en
---
---
hide:
  - toc
---

# GGETCOLOR

| Function name                                                          | Arguments            | Return |
| :----------------------------------------------------------------- | :------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`GGETCOLOR`](./GGETCOLOR.md) | `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GGETCOLOR gID, x, y
    ```
	Gets the color at the specified position in the `Graphics` with the specified `gID` as an integer value in `0xAARRGGBB` format.  
	Returns -1 if the `Graphics` has not been created or disposed, or if `x, y` is outside the image bounds.  

	Note that this command returns -1 on failure, not 0.  
	This command returns 0 when getting the color of a position that is black and completely transparent.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GSETCOLOR](GSETCOLOR.md)


---

# GGETFONT.en
---
---
hide:
  - toc
---

# GGETFONT

| Function name                                                      | Arguments | Return    |
| :----------------------------------------------------------- | :-------- | :-------- |
| ![](../assets/images/IconEE.webp)[`GGETFONT`](./GGETFONT.md) | `int`     | `string` |

!!! info "API"

	``` { #language-erbapi }
	string GGETFONT gID
	```

	Returns the font name set by `GSETFONT` for the `Graphics` with the specified `gID`.

!!! hint "Hint"

    Both command and expression function supported.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		GCREATE 0, 100, 100
		GSETFONT 0, "Arial", 100

		GCREATE 1, 100, 100
		GSETFONT 1, "MS Gothic", 100

		PRINTSL GGETFONT(0)
		PRINTSL GGETFONT(1)
		WAIT
	```

	``` title="Result"
	Arial
	MS Gothic
	```

### Related Items
- [GSETFONT](GSETFONT.md)
- [GGETFONTSIZE](GGETFONTSIZE.md)
- [GGETFONTSTYLE](GGETFONTSTYLE.md)


---

# GGETFONTSIZE.en
---
---
hide:
  - toc
---

# GGETFONTSIZE

| Function name                                                              | Arguments | Return |
| :------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`GGETFONTSIZE`](./GGETFONTSIZE.md) | `int`     | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int GGETFONTSIZE gID
	```

	Returns the font size set by `GSETFONT` for the `Graphics` with the specified `gID`.

!!! hint "Hint"

    Both command and expression function supported.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		GCREATE 0, 100, 100
		GSETFONT 0, "Arial", 100

		GCREATE 1, 100, 100
		GSETFONT 1, "MS Gothic", 200

		PRINTVL GGETFONTSIZE(0)
		PRINTVL GGETFONTSIZE(1)
		WAIT
	```

	``` title="Result"
	100
	200
	```

### Related Items
- [GSETFONT](GSETFONT.md)
- [GGETFONT](GGETFONT.md)
- [GGETFONTSTYLE](GGETFONTSTYLE.md)


---

# GGETFONTSTYLE.en
---
---
hide:
  - toc
---

# GGETFONTSTYLE

| Function name                                                                  | Arguments | Return |
| :--------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`GGETFONTSTYLE`](./GGETFONTSTYLE.md) | `int`     | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int GGETFONTSTYLE gID
	```

	Returns the font style set by `GSETFONT` for the `Graphics` with the specified `gID`.

!!! hint "Hint"

    Both command and expression function supported.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		GCREATE 0, 100, 100
		GSETFONT 0, "Arial", 100, 1|8

		GCREATE 1, 100, 100
		GSETFONT 1, "MS Gothic", 100, 2|4

		PRINTVL GGETFONTSTYLE(0)
		PRINTVL GGETFONTSTYLE(1)
		WAIT
	```

	``` title="Result"
	9
	6
	```

### Related Items
- [GSETFONT](GSETFONT.md)
- [GGETFONT](GGETFONT.md)
- [GGETFONTSIZE](GGETFONTSIZE.md)


---

# GGETPEN.en
---
---
hide:
  - toc
---

# GGETPEN

| Function name                                                  | Arguments | Return |
| :----------------------------------------------------------| :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`GGETPEN`](./GGETPEN.md) | `int`     | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int GGETPEN gID
	```

	Returns the color set by `GSETPEN` for the `Graphics` with the specified `gID` (cARGB).

!!! hint "Hint"

    Both command and expression function supported.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		GCREATE 0, 100, 100
		GSETPEN 0, 0xFF00FF00, 5

		PRINTFORMW Color:{GGETPEN(0)}(%CONVERT(GGETPEN(0), 16)%) Width:{GGETPENWIDTH(0)}
	```

	``` title="Result"
	Color:4278255360(ff00ff00) Width:5
	```

### Related Items
- [GSETPEN](GSETPEN.md)
- [GGETPENWIDTH](GGETPENWIDTH.md)


---

# GGETPENWIDTH.en
---
---
hide:
  - toc
---

# GGETPENWIDTH

| Function name                                                              | Arguments | Return |
| :------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`GGETPENWIDTH`](./GGETPENWIDTH.md) | `int`     | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int GGETPENWIDTH gID
	```

	Returns the pen width set by `GSETPEN` for the `Graphics` with the specified `gID`.

!!! hint "Hint"

    Both command and expression function supported.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		GCREATE 0, 100, 100
		GSETPEN 0, 0xFF00FF00, 5

		PRINTFORMW Color:{GGETPEN(0)}(%CONVERT(GGETPEN(0), 16)%) Width:{GGETPENWIDTH(0)}
	```

	``` title="Result"
	Color:4278255360(ff00ff00) Width:5
	```

### Related Items
- [GSETPEN](GSETPEN.md)
- [GGETPENWIDTH](GGETPENWIDTH.md)


---

# GGETTEXTSIZE.en
---
---
hide:
  - toc
---

# GGETTEXTSIZE

| Function name                                                              | Arguments                             | Return        |
| :------------------------------------------------------------------- | :----------------------------------- | :------------ |
| ![](../assets/images/IconEE.webp)[`GGETTEXTSIZE`](./GGETTEXTSIZE.md) | `string`, `string`, `int`(, `int`) | `int`, `int` |

!!! info "API"

	``` { #language-erbapi }
	int GGETTEXTSIZE text, fontName, fontSize(, fontStyle)
	```

	Sets the drawing area width and height when performing `GDRAWTEXT` with the specified arguments to `RESULT:0` and `RESULT:1` respectively.

!!! hint "Hint"

	Supports both command and expression function, but for expression functions, you need to handle RESULT:1 separately, so using it as a command is recommended.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE

		GGETTEXTSIZE "USA", "Arial", 150
		PRINTFORML Width:{RESULT:0} Height:{RESULT:1}
		GGETTEXTSIZE "Japan", "Arial", 150
		PRINTFORML Width:{RESULT:0} Height:{RESULT:1}
		GGETTEXTSIZE "USA", "MS PGothic", 150
		PRINTFORML Width:{RESULT:0} Height:{RESULT:1}
		GGETTEXTSIZE "Japan", "MS PGothic", 150
		PRINTFORML Width:{RESULT:0} Height:{RESULT:1}
		WAIT
	```

	``` title="Result"
	Width:308 Height:167
	Width:330 Height:172
	Width:281 Height:150
	Width:300 Height:150
	```

### Related Items
- [GDRAWTEXT](GDRAWTEXT.md)


---

# GOTO.en
---
---
hide:
  - toc
---

# GOTO

| Function name | Arguments | Return |
| :--------------------------------------------------------- | :------------ | :----- |
| ![](../assets/images/Iconeramaker.webp)[`GOTO`](./GOTO.md) | `labelName`   | none   |

!!! info "API"

    ```  { #language-erbapi }
	GOTO labelName
	$labelName
    ```
    Moves to a label defined with `$` within a function


!!! hint "Hint"

    Only available as a statement.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTL 1
		GOTO THREE

		$TWO
		PRINTL 2
		GOTO FIVE

		$THREE
		PRINTL 3
		GOTO TWO

		$FOUR
		PRINTL 4
		GOTO END

		$FIVE
		PRINTL 5
		GOTO FOUR

		$END
		PRINTW END
    ``` 
    ``` title="Result"
	1
	3
	2
	5
	4
	END
    ```

### Related
- [GOTOFORM](FORM.md)


---

# GROUPCHECK.en
---
---
hide:
  - toc
---

# GROUPMATCH, NOSAMES, ALLSAMES

| Function name                                                         | Arguments          | Return |
| :------------------------------------------------------------------- | :---------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GROUPMATCH`](./GROUPCHECK.md) | `any`, `any`...   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`NOSAMES`](./GROUPCHECK.md)    | `any`, `any`...   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`ALLSAMES`](./GROUPCHECK.md)   | `any`, `any`...   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GROUPMATCH key, value...
	int NOSAMES value, value...
	int ALLSAMES value, value...
    ```
	All arguments must be the same type.  
	`GROUPMATCH` returns the total number of matches between the value specified in the first argument and the values specified in the subsequent arguments.  
	`NOSAMES` returns `1` if all specified values are different, otherwise returns `0`.  
	`ALLSAMES` returns `1` if all specified values are the same, otherwise returns `0`.


!!! hint "Hint"

    Both command and expression function forms are available.

### Related
- [MATCH](MATCH.md)


---

# GSAVELOAD.en
---
---
hide:
  - toc
---

# GSAVE, GLOAD

| Function name                                                        | Arguments      | Return |
| :------------------------------------------------------------- | :------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`GSAVE`](./GSAVELOAD.md) | `int`, `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GLOAD`](./GSAVELOAD.md) | `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GSAVE gID, fileNo
	int GLOAD gID, fileNo
    ```
	`GSAVE` outputs and saves the image of the `Graphics` with the specified `gID` as a `png` file with the number specified by `fileNo` as the filename.  
	Returns non-zero on success.  

	`GLOAD` opens an image with the number specified by `fileNo` as the filename and creates a `Graphics`.  
	In terms of operation, it is almost the same as the [`GCREATEFROMFILE`](./GCREATEFROMFILE.md) command, but it creates from images saved by the `GSAVE` command rather than from images in the `resources` folder.  
	Returns non-zero on success.  
	If a `Graphics` with the specified `gID` already exists, `Graphics` creation fails and this command returns 0 without doing anything.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GCREATE](GCREATE.md)
- [GCREATEFROMFILE](GCREATEFROMFILE.md)


---

# GSETBRUSH.en
---
---
hide:
  - toc
---

# GSETBRUSH

| Function name                                                          | Arguments      | Return |
| :----------------------------------------------------------------- | :------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`GSETBRUSH`](./GSETBRUSH.md) | `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GSETBRUSH gID, cARGB
    ```
	Sets the brush with the specified color to the `Graphics` with the specified `gID`.  
	The specified brush is retained until the `Graphics` is disposed via the GDISPOSE command.  
	Returns non-zero on success.  
	The set brush color can be retrieved with [`GGETBRUSH`](./GGETBRUSH.md).  
	The brush color set here is used in the following commands/expression functions:  
	
	- [`GFILLRECTANGLE`](./GFILLRECTANGLE.md)

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GGETBRUSH](GGETBRUSH.md)
- [GFILLRECTANGLE](GFILLRECTANGLE.md)


---

# GSETCOLOR.en
---
---
hide:
  - toc
---

# GSETCOLOR

| Function name                                                          | Arguments                     | Return |
| :----------------------------------------------------------------- | :--------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GSETCOLOR`](./GSETCOLOR.md) | `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GSETCOLOR gID, cARGB, x, y
    ```
	Replaces the pixel at the specified position in the `Graphics` with the specified `gID` with the specified color.  
	Returns non-zero on success.  
	This command is not particularly fast.  
	Using this together with the [`GGETCOLOR`](./GGETCOLOR.md) command to rewrite an entire large image will not finish within a practical time.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GGETCOLOR](GGETCOLOR.md)


---

# GSETFONT.en
---
---
hide:
  - toc
---

# GSETFONT

| Function name                                                        | Arguments                             | Return |
| :--------------------------------------------------------------- | :----------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GSETFONT`](./GSETFONT.md) | `int`, `string`, `string`(, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GSETFONT gID, fontName, fontSize(, fontStyle)
    ```
	Sets the font with the specified name and size to the `Graphics` with the specified `gID`.  
	The specified font is retained until the `Graphics` is disposed via the [`GDISPOSE`](./GDISPOSE.md) command.  
	Returns non-zero on success.  
	To retrieve the set font name and font size, use [`GGETFONT`](./GGETFONT.md) and [`GGETFONTSIZE`](./GGETFONTSIZE.md).  
	In EM+EE, an optional 4th argument was added. You can specify the font style. Specify using the same 4-bit number as [`SETFONT`](./SETFONT.md).  
	In EM+EE, you can also specify `ttf` and `otf` files located in the `font` folder.  
	The font set with `GSETFONT` is used in the following commands/expression functions:  

	- [`GDRAWTEXT`](./GDRAWTEXT.md)


!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GDRAWTEXT](GDRAWTEXT.md)
- [GGETFONT](GGETFONT.md)
- [GGETFONTSIZE](GGETFONTSIZE.md)
- [GGETFONTSTYLE](GGETFONTSTYLE.md)


---

# GSETPEN.en
---
---
hide:
  - toc
---

# GSETPEN

| Function name                                                      | Arguments            | Return |
| :------------------------------------------------------------- | :------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`GSETPEN`](./GSETPEN.md) | `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GSETPEN gID, cARGB, penWidth
    ```
	Sets the pen with the specified color and width to the `Graphics` with the specified `gID`.  
	The specified pen is retained until the `Graphics` is disposed via the [`GDISPOSE`](./GDISPOSE.md) command.  
	Returns non-zero on success.  
	To retrieve the set pen color and pen width, use [`GGETPEN`](./GGETPEN.md) and [`GGETPENWIDTH`](./GGETPENWIDTH.md) respectively.  
	The pen color and width set with `GSETPEN` are used in the following commands/expression functions:

	- [`GDRAWTEXT`](./GDRAWTEXT.md)
	- [`GDRAWLINE`](./GDRAWLINE.md)

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GDRAWTEXT](GDRAWTEXT.md)
- [GDRAWLINE](GDRAWLINE.md)
- [GGETPEN](GGETPEN.md)
- [GGETPENWIDTH](GGETPENWIDTH.md)


---

# GWIDTHHEIGHT.en
---
---
hide:
  - toc
---

# GWIDTH, GHEIGHT

| Function name                                                             | Arguments | Return |
| :------------------------------------------------------------------ | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GWIDTH`](./GWIDTHHEIGHT.md)  | `int`     | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GHEIGHT`](./GWIDTHHEIGHT.md) | `int`     | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GWIDTH gID
	int GHEIGHT gID
    ```
	Gets the width or height of the `Graphics` with the specified `gID`.  
	Returns 0 if the `Graphics` has not been created (including if disposed).

!!! hint "Hint"

    Both command and expression function supported.


---

# HTML_ESCAPE.en
---
---
hide:
  - toc
---

# HTML_ESCAPE

| Function name                                                                 | Arguments     | Return  |
| :--------------------------------------------------------------------- | :------- | :------ |
| ![](../assets/images/IconEmuera.webp)[`HTML_ESCAPE`](./HTML_ESCAPE.md) | `string` | `string`|

!!! info "API"

    ```  { #language-erbapi }
	str HTML_ESCAPE, htmlString  
    ```
	Escapes (converts to character references) the target string for HTML.  
	Use the [`HTML_TOPLAINTEXT`](./HTML_TOPLAINTEXT.md) function to unescape.


!!! hint "Hint"

    Both commands and expression functions are supported.


!!! example "Example" 
 
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORMW %HTML_ESCAPE("A&B<C>D'E")%
    ``` 
    ``` title="Result"
	A&amp;B&lt;C&gt;D&apos;E
    ```

### See Also
- [HTML_TOPLAINTEXT](HTML_TOPLAINTEXT.md)
- [ESCAPE](ESCAPE.md)


---

# HTML_GETPRINTEDSTR.en
---
---
hide:
  - toc
---


# HTML_GETPRINTEDSTR

| Function name                                                                               | Arguments | Return  |
| :----------------------------------------------------------------------------------- | :--- | :------ |
| ![](../assets/images/IconEmuera.webp)[`HTML_GETPRINTEDSTR`](./HTML_GETPRINTEDSTR.md) | `int`| `string`|

!!! info "API"

    ```  { #language-erbapi }
	str HTML_GETPRINTEDSTR, lineNo  
    ```
	Gets the content of the line specified by `lineNo` from already displayed lines as an HTML-formatted string.  
	The line counting method is the same as `LINECOUNT` and `CLEARLINE` commands.


!!! hint "Hint"

    Both commands and expression functions are supported.


!!! example "Example" 
 
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIMS HOGES, 4
		FONTBOLD
		PRINTL AAA
		FONTITALIC
		PRINTL BBB
		FONTSTYLE 4
		PRINTL CCC
		FONTSTYLE 0
		FONTREGULAR

		REPEAT 4
			HOGES:COUNT = %HTML_GETPRINTEDSTR(COUNT)%
		REND
		REPEAT 4
			PRINTFORML %HOGES:COUNT%
		REND

		WAIT
    ``` 
	![](../assets/images/HTML_GETPRINTEDSTR.png)

### See Also
- [GETDISPLAULINE](GETDISPLAYLINE.md)


---

# HTML_POPPRINTINGSTR.en
---
---
hide:
  - toc
---

# HTML_POPPRINTINGSTR

| Function name                                                                                    | Arguments  | Return  |
| :---------------------------------------------------------------------------------------- | :---- | :------ |
| ![](../assets/images/IconEmuera.webp)[`HTML_POPPRINTINGSTR`](./HTML_POPPRINTINGSTR.md)    | `void`| `string`|

!!! info "API"

    ```  { #language-erbapi }
	string HTML_POPPRINTINGSTR
    ```
	Gets the current string buffer waiting for newline in [`PRINT`](./PRINT.md) in HTML format and clears the buffer.  
	Since `p` tags are not used, `align` from the `ALIGNMENT` command is not reflected.


!!! hint "Hint"

    Both commands and expression functions are supported.


!!! example "Example" 
 
    ``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
	#DIMS HOGES
		FONTBOLD
		PRINT AAA
		FONTITALIC
		PRINT BBB
		FONTSTYLE 4
		PRINT CCC
		FONTSTYLE 0
		FONTREGULAR

		HOGES = %HTML_POPPRINTINGSTR()%
		PRINTL DDD

		PRINTFORMW %HOGES%
    ``` 
    ``` title="Result"
	DDD
	<b>AAA</b><i><b>BBB</b></i><s>CCC</s>
    ```


---

# HTML_PRINT.en
---
---
hide:
  - toc
---

# HTML_PRINT

| Function name                                                               | Arguments     | Return |
| :------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`HTML_PRINT`](./HTML_PRINT.md) | `string` | none   |

!!! info "API"

    ```  { #language-erbapi }
	HTML_PRINT htmlStyleString
    ```
	A command to [`PRINT`](./PRINT.md) using HTML-like tags.  
	The argument is not a string like `PRINT` but a string expression like `PRINTS`, and automatically adds a newline, so in practice it is closer to the behavior of `PRINTSL`. (EM+EE has added an option to not add a newline)  
	The `HTML_PRINT` is not affected by [`ALIGNMENT`](./ALIGNMENT.md), [`SETFONT`](./SETFONT.md), [`SETCOLOR`](./SETCOLOR.md), [`FONTSTYLE`](./FONT_OPERATION.md) commands and their similar commands.  
	To get these effects, you must specify everything using tags.  
	See [`HTML_PRINT` Related](../Emuera/HTML_PRINT.md) for details.

!!! hint "Hint"

    Only commands are supported.

### See Also
- [HTML_PRINT Related](../Emuera/HTML_PRINT.md)


---

# HTML_PRINT_ISLAND.en
---
---
hide:
  - toc
---

# HTML_PRINT_ISLAND, HTML_PRINT_ISLAND_CLEAR

| Function name                                                                                   | Arguments     | Return |
| :--------------------------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/Icondotnet.webp)[`HTML_PRINT_ISLAND`](./HTML_PRINT_ISLAND.md)       | `string` | none   |
| ![](../assets/images/Icondotnet.webp)[`HTML_PRINT_ISLAND_CLEAR`](./HTML_PRINT_ISLAND.md) | `string` | none   |

!!! info "API"

    ```  { #language-erbapi }
	HTML_PRINT_ISLAND htmlStyleString
    ```
	The tag-based notation is the same as [`HTML_PRINT`](HTML_PRINT.md), but it does not depend on line information.  
	Since it does not depend on line information, unlike regular [`PRINT`](PRINT.md) commands, it will not disappear no matter how much you scroll.  
	See [`HTML_PRINT` Related](../Emuera/HTML_PRINT.md) for details.

!!! hint "Hint"

    Only commands are supported.


---

# HTML_STRINGLEN.en
---
---
hide:
  - toc
---

# HTML_STRINGLEN

| Function name                                                                   | Arguments              | Return |
| :----------------------------------------------------------------------- | :---------------- | :----- |
| ![](../assets/images/IconEM.webp)[`HTML_STRINGLEN`](./HTML_STRINGLEN.md) | `string`(, `int`) | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int HTML_STRINGLEN html(, returnPixel)
    ```

    Returns the width of the result of displaying `html` with `html_print`. If there are multiple lines, it returns the width of the first line.
    If `returnPixel` is `0` or omitted, it returns in half-width character units. Otherwise, it returns the number of pixels.

    !!! warning "Warning"

        Unless wrapped in `<nobr></nobr>`, the return value will not exceed "window width - scrollbar width" no matter how long the string is.

!!! hint "Hint"

    Both commands and expression functions are supported.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        PRINTFORML {HTML_STRINGLEN("<b>B</b>")}
        PRINTFORML {HTML_STRINGLEN("<b>B</b>", 1)} {GETCONFIG("フォントサイズ")/2}

        ONEINPUT
    ```
    ``` title="Result"
    2
    9 8
    ```
    This is because bold characters are wider than normal

### See Also
- [STRLEN](STRLEN.md)


---

# HTML_STRINGLINES.en
---
---
hide:
  - toc
---

# HTML_STRINGLINES

| Function name                                                                       | Arguments            | Return |
| :--------------------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEM.webp)[`HTML_STRINGLINES`](./HTML_STRINGLINES.md) | `string`, `int` | `int`  |

!!! info "API"

    ``` { #language-erbapi }
    int HTML_STRINGLINES html, width
    ```

    Returns the number of lines when splitting the result of printing `html` with `html_print` by `width` (half-width character count).

!!! hint "Hint"

    Both commands and expression functions are supported.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        PRINTVL HTML_STRINGLINES("AB<b>CD</b>",4)

        ONEINPUT
    ```
    ``` title="Result"
    2
    ```
    This is because bold characters are wider than normal


---

# HTML_SUBSTRING.en
---
---
hide:
  - toc
---

# HTML_SUBSTRING

| Function name                                                                   | Arguments            | Return   |
| :----------------------------------------------------------------------- | :-------------- | :------- |
| ![](../assets/images/IconEM.webp)[`HTML_SUBSTRING`](./HTML_SUBSTRING.md) | `string`, `int` | `string` |

!!! info "API"
    
    ``` { #language-erbapi }
    int HTML_SUBSTRING html, width
    ```

    Splits the result of printing `html` with `html_print` by `width` (half-width character count) and returns it.

    !!! warning "Warning"

        In `v8b`, the return type was changed from integer type (always `1`) to string type (same as `RESULTS:0`).

!!! hint "Hint"

    Both commands and expression functions are supported.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        PRINTSL HTML_SUBSTRING("AB<b>CD</b>EFG",4)
        PRINTSL RESULTS:1

        ONEINPUT
    ```
    ``` title="Result"
    AB<b>C</b>
    <b>D</b>EFG
    ```
    This is because bold characters are wider than normal

### See Also
- [SUBSTRING](SUBSTRING.md)


---

# HTML_TAGSPLIT.en
---
---
hide:
  - toc
---

# HTML_TAGSPLIT

| Function name                                                                        | Arguments                                              | Return          |
| :---------------------------------------------------------------------------- | :------------------------------------------------ | :-------------- |
| ![](../assets/images/IconEmuera.webp)[`HTML_TAGSPLIT`](./HTML_TAGSPLIT.md) | `string`(, `integerVariable`, `stringVariable`)   | `int`, `string` |

!!! info "API"

    ```  { #language-erbapi }
	HTML_TAGSPLIT string(, integerVariable, stringVariable)
    ```

	Interprets the target string as an HTML string, splits it into tags and plain text, assigns the split count to `RESULT` and the split string to `RESULTS`.  
	If the second and third arguments are specified, they are assigned to the specified variables instead of `RESULT` and `RESULTS`.  
	If an error occurs during splitting, -1 is assigned to RESULT.  
	`HTML_TAGSPLIT` does not verify the validity of tag contents or relationships.  
	If the split count exceeds the size of the `RESULTS` array, the excess is not assigned to `RESULTS`.

!!! hint "Hint"

    Only commands are supported.


!!! example "Example" 
 
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		HTML_TAGSPLIT "<p align='right'>あ<!--comment-->い<font color='red'>う</font></p>"  
		REPEAT 8
			PRINTFORML RESULTS:{COUNT} = %RESULTS:COUNT%
		REND
		PRINTFORML RESULT = {RESULT}
		WAIT
    ``` 
    ``` title="Result"
	RESULTS:0 = <p align='right'>  
	RESULTS:1 = あ  
	RESULTS:2 = <!--comment-->  
	RESULTS:3 = い  
	RESULTS:4 = <font color='red'>  
	RESULTS:5 = う  
	RESULTS:6 = </font>  
	RESULTS:7 = </p>  
	RESULT = 8  

    ```

### See Also
- [SPLIT](SPLIT.md)


---

# HTML_TOPLAINTEXT.en
---
---
hide:
  - toc
---

# HTML_TOPLAINTEXT

| Function name                                                                           | Arguments     | Return  |
| :------------------------------------------------------------------------------- | :------- | :------ |
| ![](../assets/images/IconEmuera.webp)[`HTML_TOPLAINTEXT`](./HTML_TOPLAINTEXT.md) | `string` | `string`|

!!! info "API"

    ```  { #language-erbapi }
	str HTML_TOPLAINTEXT, string  
    ```
	Converts the target HTML string to plain text.  
	Specifically, it removes HTML tags from the string and expands character references.


!!! hint "Hint"

    Both commands and expression functions are supported.


!!! example "Example" 
 
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORMW %HTML_TOPLAINTEXT("<b>AAA</b><i><b>BBB</b></i><s>CCC</s>")%
    ``` 
    ``` title="Result"
	AAABBBCCC
    ```


---

# IF.en
---
---
hide:
  - toc
---

# (S)IF

| Function name                                                | Arguments  | Return |
| :----------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`(S)IF`](./IF.md) | `operand` | `void` |

!!! info "API"

    ```  { #language-erbapi }
	IF operand(int)
	ELSEIF operand(int)
	ELSE
	ENDIF
	SIF operand(int)
    ```
	`SIF` executes the next line if the condition is true. If false, it skips the next line.  
	`IF` executes from the next line until it encounters `ELSEIF`, `ELSE`, or `ENDIF`, then jumps to the `ENDIF` line. If false, it skips until it encounters `ELSEIF`, `ELSE`, or `ENDIF`.  
	When a condition in `ELSEIF` is true, it executes from the next line until it encounters another `ELSEIF`, `ELSE`, or `ENDIF`, then jumps to `ENDIF`. If false, it skips to the next `ELSEIF`, `ELSE`, or `ENDIF` and repeats the same process.  
	`ELSE` executes from the next line until it encounters `ENDIF`. `ELSE` must always follow `ELSEIF`, and `ENDIF` must follow `ELSE`.  
	The condition is strictly of type `int`, where 0 is false and anything else is true.

!!! hint "Hint"

    Commands only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
	#DIM CONST TRUE = 1
	#DIM CONST FALSE = 0
		IF TRUE
			PRINTL IF=TRUE
		ELSE
			PRINTL Can not reach here
		ENDIF

		IF FALSE
			PRINTL Can not reach here
		ELSEIF TRUE
			PRINTL ELSEIF=TRUE
		ELSE
			PRINTL Can not reach here
		ENDIF
		
		IF FALSE
			PRINTL Can not reach here
		ELSEIF FALSE
			PRINTL Can not reach here
		ELSE
			PRINTL Reached ELSE
		ENDIF

		WAIT
    ``` 
    ``` title="Result"
	Now Loading...
	IF=TRUE
	ELSEIF=TRUE
	Reached ELSE
    ```

### See Also
- [SELECTCASE](SELECTCASE.md)


---

# INPUT.en
---
---
hide:
  - toc
---

# INPUT(S)

| Function name                                                      | Arguments                  | Return    |
| :----------------------------------------------------------------- | :------------------------- | :-------- |
| ![](../assets/images/Iconeramaker.webp)[`INPUT`](./INPUT.md)      | (`int`, `int`, `int`)     | `void`    |
| ![](../assets/images/Iconeramaker.webp)[`INPUTS`](./INPUT.md)    | (`int`, `int`, `int`)     | `void`    |

!!! info "API"

    ```  { #language-erbapi }
	INPUT (defaultValue, canClick, allowSkip)
	INPUTS (defaultValue, canClick, allowSkip)
    ```
    Waits for input. `INPUT` assigns the entered number to `RESULT`, while `INPUTS` assigns the entered string to `RESULTS`.  
    If the first argument is set, it is used as the default value for the respective variables when nothing is entered.  

    As an additional feature in EE, middle click is accepted as normal left click. In case of middle click, `RESULT:1` is set to 3.  

    If the second argument is set, mouse clicks are treated as Enter key presses (assigns an empty string to `RESULTS`. If a button is pressed, the button index is assigned to `RESULT:1`). Left click sets `RESULT:1` to 1, right click sets `RESULT:1` to 2, and middle click sets `RESULT:1` to 3. Also, if ++shift++, ++ctrl++, or ++alt++ is pressed at the same time, the key state is saved in `RESULT:2` (bits 16, 17, 18).  

    If the third argument is set, input waiting is not performed during skip via right-click, etc.  
    However, the default value is still applied. When used together with "INPUT system accepts mouse clicks" above, the default values are assigned to `RESULT:1` and `RESULTS:1` respectively.  
    If not used together, the default values are assigned to `RESULT:0` and `RESULTS:0` as usual.  


!!! hint "Hint"

    Command only.

### See Also
- [TINPUT](TINPUT.md)
- [INPUTMOUSEKEY](INPUTMOUSEKEY.md)
- [BINPUT](BINPUT.md)
- [INPUTANY](INPUTANY.md)
- [REUSELASTLINE](REUSELASTLINE.md)


---

# INPUTANY.en
---
---
hide:
  - toc
---

# INPUTANY

| Function name                                                      | Arguments | Return           |
| :----------------------------------------------------------------- | :-------- | :--------------- |
| ![](../assets/images/IconEE.webp)[`INPUTANY`](./INPUTANY.md)      | none      | `int` / `string` |

!!! info "API"

    ``` { #language-erbapi }
	INPUTANY
    ```

    An INPUT command that accepts both numeric and string input.  
    When executed, [`PRINTBUTTON`](./PRINTBUTTON.md) and `[{int}]` become clickable.  
    If numeric input is entered, it is assigned to `RESULT`; if string input is entered, it is assigned to `RESULTS`.  


!!! hint "Hint"

    Since it is a command, it cannot be used as an expression function.

!!! example "Example" 

    ``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE

	PRINTL [0] 0です
	PRINTL [1] 1です
	PRINTBUTTON "[A] Aです", "A"
	PRINTL 

	INPUTANY

	PRINTFORMW \@ RESULTS != "" ? %RESULTS% # {RESULT} \@が入力されました

    ``` 
    ``` title="Result (when 1 is entered)"
	[0] 0です
	[1] 1です
	[A] Aです
	1
	1が入力されました
    ```

    ``` title="Result (when A is entered)"
	[0] 0です
	[1] 1です
	[A] Aです
	A
	Aが入力されました
    ```

### See Also
- [INPUT](INPUT.md)


---

# INPUTMOUSEKEY.en
---
---
hide:
  - toc
---

# INPUTMOUSEKEY

| Function name                                                              | Arguments | Return |
| :------------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`INPUTMOUSEKEY`](./INPUTMOUSEKEY.md) | `int`     | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	INPUTMOUSEKEY timeLimit
    ```
    The `INPUTMOUSEKEY` command is a command that directly recognizes mouse and keyboard input.  
    The argument specifies the time in milliseconds until timeout processing, similar to [`TINPUT`](./TINPUT.md).  
    If the argument is omitted or specified as 0 or less, timeout processing is not performed.  
    This command can recognize function keys, arrow keys, PageUp keys, etc., as input, which cannot be captured by commands like [`ONEINPUT`](./ONEINPUT.md).  
    On the other hand, during input waiting with this command, the ESC key, right-click skip function, macro function, and other functions cannot be used - it simply accepts the result that the ESC key, etc., was pressed.  
    Also, this command does not perform any [`PRINT`](./PRINT.md) processing, including timeout display.  
    If you want to implement skip functionality or display input, you need to handle it in ERB.  

    By specifying a value in milliseconds for the first argument, timeout processing is performed. The return value of `INPUTMOUSEKEY` can have up to 6 values, which are assigned to `RESULT:0`, `RESULT:1`, `RESULT:2`, `RESULT:3`, `RESULT:4`, and `RESULT:5` respectively.  

    - RESULT:0 == 1; Mouse press detected
      - RESULT:1 ; Mouse button - Left button 0x100000, Right button 0x200000, Middle button 0x400000. Integer value of C#'s System.Windows.Forms.MouseButtons enum
      - RESULT:2 ; Mouse X coordinate. Based on the bottom-left corner of the client area. Always a positive value.
      - RESULT:3 ; Mouse Y coordinate. Based on the bottom-left corner of the client area. Always a negative value.
      - RESULT:4 ; When CBGSETBMAP is executed and the opacity of the color directly under the click coordinates is 0xFF, returns the color as 0xRRGGBB. Returns -1 if not applicable.
      - RESULT:5 ; Value of the clicked button
    - RESULT:0 == 2; Mouse wheel rotation detected
      - RESULT:1 ; Wheel amount
      - RESULT:2 ; Mouse X coordinate
      - RESULT:3 ; Mouse Y coordinate
    - RESULT:0 == 3; Keyboard press detected
      - RESULT:1 ; Code of the pressed key. Does not include modifier codes (Alt, Ctrl, Shift). Equivalent to KeyCode. Integer value of C#'s System.Windows.Forms.Keys enum
      - RESULT:2 ; Code of the pressed key. Includes modifier codes. Equivalent to KeyData
    - RESULT:0 == 4; Ended due to timeout

    <!-- For mouse buttons, refer to MB_LEFT to MB_MIDDLE in _VirtualKey.ERH, and for key codes, refer to VK_~ in _VirtualKey.ERH. -->
    Key codes are shared with the [`GETKEY`](./GETKEY.md) function.  
    Note that the mouse wheel amount is not 1 or -1, but large values like at least 120.  
    Also, whether wheel detection works when the cursor is outside the Emuera window depends on Windows settings and cannot be changed by Emuera.  
    By default, it is detected on Windows 8.1 and earlier, but on Windows 10, wheels outside the screen seem to not be detected.  


!!! hint "Hint"

    Command only.

### See Also
- [INPUT](INPUT.md)


---

# INRANGEARRAY.en
---
---
hide:
  - toc
---

# INRANGEARRAY, INRANGECARRAY

| Function name                                                         | Arguments                                   | Return |
| :-------------------------------------------------------------------- | :------------------------------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`INRANGEARRAY`](./INRANGEARRAY.md)  | `integerArray`, `int`, `int`(, `int`, `int`) | `int`  |
| ![](../assets/images/IconEmuera.webp)[`INRANGECARRAY`](./INRANGEARRAY.md) | `charaArray`, `int`, `int`(, `int`, `int`)   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int INRANGEARRAY integerArray, minValue, maxValue(, start, end)
	int INRANGECARRAY charaArray, minValue, maxValue(, start, end)
    ```
	`INRANGEARRAY` returns the number of elements in the specified array where `minValue <= value < maxValue`.  
	`INRANGECARRAY` returns the number of elements in the specified character array where `minValue <= value < maxValue`.

!!! hint "Hint"

    Both command and expression function forms are available.


---

# ISACTIVE.en
---
---
hide:
  - toc
---

# ISACTIVE

| Function name                                                           | Arguments | Return |
| :--------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ISACTIVE`](./ISACTIVE.md) | none | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	ISACTIVE
    ```
	Returns the state of Emuera's window.  
	Returns 1 if active, 0 if not active.

!!! hint "Hint"

    Both commands and expression functions are supported.


---

# ISDEFINED.en
---
---
hide:
  - toc
---

# ISDEFINED

| Function name                                                 | Arguments  | Return |
| :----------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/IconEM.webp)[`ISDEFINED`](./ISDEFINED.md) | `string` | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int ISDEFINED macroName
    ```

    Returns `1` if a macro with the same name as `macroName` (`#DEFINE XXX`) is defined. Returns `0` if not defined.

!!! hint "Hint"

    Both command and expression function are supported.

!!! example "Example"

    ``` { #language-erh title="DEFINE.ERH" }
    #DEFINE 体力 0
    #DEFINE 気力 1
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM キャラデータ, 2 = 1000, 200

        PRINTFORML {ISDEFINED("体力")} {キャラデータ:体力}
        PRINTFORML {ISDEFINED("気力")} {キャラデータ:気力}
        PRINTFORML {ISDEFINED("攻撃力")}

        ONEINPUT
    ```
    ``` title="Result"
    1 1000
    1 200
    0
    ```

### Related Items
- [Functions/Preprocessor>Lines representing special blocks>\[IF XXX\]](../Emuera/function.md#if-xxxelseif-xxxelseendif)


---

# JUMP.en
---
---
hide:
  - toc
---

# JUMP

| Function name | Arguments | Return |
| :--------------------------------------------------------- | :--------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`JUMP`](./JUMP.md) | `functionName`   | none   |

!!! info "API"

    ```  { #language-erbapi }
	JUMP functionName
    ```
	Calls a function defined with a string starting with `@`  
	When the function reaches its end or executes [`RETURN`](./RETURN.md), the function ends  
	Unlike [`CALL`](./CALL.md), it does not push the function onto the runtime stack, so when the destination function ends, it does not return. Therefore, if there is no call stack, it may result in an error termination


!!! hint "Hint"

    Only available as a statement.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTL CALL to AAA
		CALL AAA

		PRINTW Backed SYSTEM_TITLE

		@AAA
		PRINTL JUMP to BBB
		JUMP BBB

		PRINTL Can not reach here

		@BBB
		PRINTL Exit BBB
		RETURN
    ``` 
    ``` title="Result"
	CALL to AAA
	JUMP to BBB
	Exit BBB
	Backed SYSTEM_TITLE
    ```

### Related
- [JUMPFORM](FORM.md)
- [TRYJUMPFORM](TRYFORM.md)
- [TRYCJUMP](TRYC.md)


---

# LINEISEMPTY.en
---
---
hide:
  - toc
---

# LINEISEMPTY

| Function name                                                           | Arguments | Return |
| :----------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`LINEISEMPTY`](./LINEISEMPTY.md) | none | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int LINEISEMPTY
    ```
	Command to determine whether the line currently being printed with [`PRINT`](./PRINT.md) is empty.  
	At the point this command is executed, if executing `PRINTL` would result in just an empty line, it returns `1` in `RESULT:0`; otherwise, it returns `0`.  
	When using `PRINTC` to sequentially write buttons based on conditions, using this command at the end allows you to determine whether there are any buttons to display, and if not, display something specific instead.

!!! hint "Hint"

    Command and expression function both supported.


---

# LOADCHARA.en
---
---
hide:
  - toc
---

# LOADCHARA

| Function name                                                       | Arguments | Return |
| :------------------------------------------------------------------ | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`LOADCHARA`](./LOADCHARA.md) | `string`  | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	LOADCHARA filename
    ```
    The first argument specifies the filename (part of it) to load the data. The actual filename will be `chara_*.dat`.  
    Assigns `0` to `RESULT:0` if reading fails, and `1` if successful.  
    You should check the file's suitability using the [`CHKCHARADATA`](./CHKCHARADATA.md) function before `LOADCHARA`.  
    `LOADCHARA` registers as many new characters as there are saved characters.  
    Therefore, it does not affect existing registered characters.  
    To know how many characters were added, compare `CHARANUM` before and after loading.  


!!! hint "Hint"

    Command only.

### See Also
- [SAVECHARA](SAVECHARA.md)
- [CHKCHARADATA](CHKCHARADATA.md)


---

# LOADDATA.en
---
---
hide:
  - toc
---

# LOADDATA

| Function name                                                       | Arguments | Return |
| :------------------------------------------------------------------ | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`LOADDATA`](./LOADDATA.md) | `int`     | none   |

!!! info "API"

    ```  { #language-erbapi }
	LOADDATA saveID
    ```
    Loads the data from the file with the number specified by `saveID`.  
    If loading fails, the game ends with an error.  
    Always use the [`CHKDATA`](./CHKDATA.md) command to check if loading is possible before executing.  
    Unlike the [`LOADGAME`](./SAVEGAME.md) command, `LOADDATA` can be called from anywhere in the script.  


!!! hint "Hint"

    Command only.

### See Also
- [LOADDATA](LOADDATA.md)
- [CHKDATA](CHKDATA.md)


---

# LOADGLOBAL.en
---
---
hide:
  - toc
---

# LOADGLOBAL

| Function name                                                         | Arguments | Return |
| :-------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`LOADGLOBAL`](./LOADGLOBAL.md) | none      | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	LOADGLOBAL
    ```
    Loads `GLOBAL` and `GLOBALS`. Save destination is `global.sav`.  
    Does not error even if loading fails.  
    Assigns `1` to `RESULT` on success, and `0` on failure.  
    Like regular save data, files with incorrect [`code` and `version`](../Emuera/variables.md#gamebasecsv) set in `gamebase.csv` cannot be loaded.  
    See the variables section for details on the `GLOBAL` variable.  


!!! hint "Hint"

    Command only.

### See Also
- [SAVEGLOBAL](SAVEGLOBAL.md)
- [Variables shared between save data](../Emuera/variables.md#_8)


---

# LOADTEXT.en
---
---
hide:
  - toc
---

# LOADTEXT

| Function name                                                                                           | Arguments              | Return   |
| :------------------------------------------------------------------------------------------------------ | :--------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`LOADTEXT`](./LOADTEXT.md) | `int`(, `int`, `int`) | `string` |

!!! info "API"

    ```  { #language-erbapi }
	LOADTEXT fileNo{, force_savdir, int force_UTF8}
    ```
    The `LOADTEXT` command version reads `textXX.sav` and assigns the result to `RESULTS:0`.  
    If a non-zero value is specified for the second argument, it searches for files in the sav folder, ignoring the options.  
    If a non-zero value is specified for the third argument, it reads the file as being saved in UTF-8 encoding.  
    If it fails, `RESULTS:0` becomes an empty string.  
    There is also an expression function version that returns the read result or an empty string as the return value instead of using `RESULTS:0`.  

    In EM+EE, if the first argument is a string, it loads the file using the first argument as the path. Specify as a relative path from `Emuera.exe` (".." is invalid). Also, only extensions allowed in the "Extensions available for LOADTEXT and SAVETEXT" setting in the config screen or `Emuera.config` can be used (default is txt only).

    ``` title="emuera.config"
    Extensions available for LOADTEXT and SAVETEXT:txt,xml,json
    ```


!!! hint "Hint"

    Command and expression function both supported.

### See Also
- [SAVETEXT](SAVETEXT.md)


---

# MAP_GETKEYS.en
---
---
hide:
  - toc
---

# MAP_GETKEYS

| Function name                                                     | Arguments                          | Return   |
| :--------------------------------------------------------------- | :-------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`MAP_GETKEYS`](./MAP_GETKEYS.md) | `string`                          | `string` |
|                                                                  | `string`, `int`                   | `string` |
|                                                                  | `string`, `ref` `string[]`, `int` | `string` |

!!! info "API"

    ```  { #language-erbapi }
    1. string MAP_GETKEYS mapName
    2. string MAP_GETKEYS mapName, doOutput
    3. string MAP_GETKEYS mapName, ref outputArray, doOutput
    ```

    Functions to output keys stored in `MAP` (associative array, [`Dictionary<string,string>`](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2)).

    1. Returns a string in the form "key1,key2,key3,...". Returns an empty string if the MAP itself does not exist. No exception is thrown, so use [`MAP_EXIST`](./MAP_MANAGE.md) if needed.
    2. If `doOutput` is not `0`, sequentially assigns keys to `RESULTS` and returns `RESULTS:0`. No exception is thrown, so use [`MAP_EXIST`](./MAP_MANAGE.md) if needed.
    3. If `doOutput` is not `0`, sequentially assigns keys to `outputArray` and returns an empty string. No exception is thrown, so use [`MAP_EXIST`](./MAP_MANAGE.md) if needed.

!!! hint "Hint"

    Available as both command and function in expressions

!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM i
        #DIMS keys, 5

        MAP_CREATE "MyMap"
        FOR i, 0, 5
            MAP_SET "MyMap", TOSTR(i*100), ""
        NEXT
        PRINTSL MAP_GETKEYS("MyMap")
        PRINTSL MAP_GETKEYS("MyMap", 1)
        FOR i, 0, 5
            PRINTFORML RESULTS:[%RESULTS:i%] key:[%keys:i%] 
        NEXT
        VARSET RESULTS
        PRINTSL MAP_GETKEYS("MyMap", keys, 1)
        FOR i, 0, 5
            PRINTFORML RESULTS:[%RESULTS:i%] key:[%keys:i%] 
        NEXT

        ONEINPUT
    ``` 
    ``` title="Result"
    0,100,200,300,400
    0
    RESULTS:[0] key:[] 
    RESULTS:[100] key:[] 
    RESULTS:[200] key:[] 
    RESULTS:[300] key:[] 
    RESULTS:[400] key:[] 
    
    RESULTS:[] key:[0] 
    RESULTS:[] key:[100] 
    RESULTS:[] key:[200] 
    RESULTS:[] key:[300] 
    RESULTS:[] key:[400] 
    ```

### Related
- [MAP Operations](MAP_OPERATION.md)


---

# MAP_MANAGE.en
---
---
hide:
  - toc
---

# MAP Management

| Function name                                                    | Arguments | Return |
| :-------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEM.webp)[`MAP_CREATE`](./MAP_MANAGE.md)  | `string`  | `int`  |
| ![](../assets/images/IconEM.webp)[`MAP_EXIST`](./MAP_MANAGE.md)   | `string`  | `int`  |
| ![](../assets/images/IconEM.webp)[`MAP_RELEASE`](./MAP_MANAGE.md) | `string`  | `1`    |

!!! info "API"

    ```  { #language-erbapi }
    int MAP_CREATE mapName
    int MAP_EXIST mapName
    1 MAP_RELEASE mapName
    ```

    Functions for creating, deleting, and checking existence of `MAP` (associative array, [`Dictionary<string,string>`](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2)).
    
    - `MAP_CREATE`: Creates a `MAP` with `mapName`. Returns `0` if a `MAP` with that name already exists, `1` on success.
    - `MAP_EXIST`: Checks if a `MAP` with `mapName` exists. Returns `1` if it exists, `0` otherwise.
    - `MAP_RELEASE`: Deletes the `MAP` with `mapName`.

    !!! warning "Warning"

        See "[`XML`, `MAP`, `DataTable` Save Function](./README.md#xmlmapdatatable)" to save created `MAP` to save file. They are automatically deleted when "Return to Title Screen" or [`RESETDATA`](https://osdn.net/projects/emuera/wiki/excom#h5-RESETDATA) is called.

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        PRINTFORML Existence of MAP "MyMap": {MAP_EXIST("MyMap")}
        MAP_CREATE "MyMap"
        PRINTSL RESULT ? "Success" # "Already exists"
        MAP_CREATE "MyMap"
        PRINTSL RESULT ? "Success" # "Already exists"

        RESETDATA ; All MAPs are automatically deleted

        MAP_CREATE "MyMap"
        PRINTSL RESULT ? "Success" # "Already exists"
        PRINTFORML Existence of MAP "MyMap": {MAP_EXIST("MyMap")}
        MAP_RELEASE "MyMap"
        PRINTFORML Existence of MAP "MyMap": {MAP_EXIST("MyMap")}

        ONEINPUT
    ``` 
    ``` title="Result"
    Existence of MAP "MyMap": 0
    Success
    Already exists
    Success
    Existence of MAP "MyMap": 1
    Existence of MAP "MyMap": 0
    ```

### Related
- [MAP Operations](MAP_OPERATION.md)


---

# MAP_OPERATION.en
---
---
hide:
  - toc
---

# MAP Operations

| Function name                                                      | Arguments                       | Return   |
| :---------------------------------------------------------------- | :----------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`MAP_GET`](./MAP_OPERATION.md)    | `string`, `string`             | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_HAS`](./MAP_OPERATION.md)    | `string`, `string`             | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_SET`](./MAP_OPERATION.md)    | `string`, `string`, `string`   | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_REMOVE`](./MAP_OPERATION.md) | `string`, `string`             | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_SIZE`](./MAP_OPERATION.md)   | `string`                       | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_CLEAR`](./MAP_OPERATION.md)  | `string`                       | `int`    |

!!! info "API"

    ```  { #language-erbapi }
    string MAP_GET mapName, key
    int MAP_HAS mapName, key
    int MAP_SET mapName, key, value
    int MAP_REMOVE mapName, key
    int MAP_SIZE mapName
    int MAP_CLEAR mapName
    ```

    Functions for manipulating data stored in `MAP` (associative array, [`Dictionary<string,string>`](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2)).
    
    - `MAP_GET`: Returns the value associated with `key` in the `MAP` with `mapName`. Returns an empty string if the key or MAP does not exist. No exception is thrown, so use `MAP_HAS` or [`MAP_EXIST`](./MAP_MANAGE.md) if needed.
    - `MAP_HAS`: Checks if `key` exists in the `MAP` with `mapName`. Returns `1` if it exists, `0` otherwise. Returns `-1` if the MAP itself does not exist.
    - `MAP_SET`: Overwrites the value associated with `key` in the MAP with `mapName` with `value`. If `key` does not exist, it is added and returns `1`. Returns `-1` if the MAP itself does not exist.
    - `MAP_REMOVE`: Removes the value associated with `key` from the MAP with `mapName` and returns `1`. Returns `-1` if the MAP itself does not exist.
    - `MAP_SIZE`: Returns the number of key-value pairs in the MAP with `mapName`. Returns `-1` if the MAP itself does not exist.
    - `MAP_CLEAR`: Removes all key-value pairs from the MAP with `mapName` and returns `1`. Returns `-1` if the MAP itself does not exist.

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 

        MAP_CREATE "MyMap"
        PRINTFORML Size of "MyMap": {MAP_SIZE("MyMap")}
        MAP_SET "MyMap", "Id", "username"
        MAP_SET "MyMap", "PassWord", "123456"
        PRINTFORML ID: %MAP_GET("MyMap", "Id")% Password: %MAP_GET("MyMap", "PassWord")%
        PRINTFORML Has "Name": {MAP_HAS("MyMap", "Name")}
        PRINTFORML Size of "MyMap": {MAP_SIZE("MyMap")}
        MAP_CLEAR "MyMap"
        PRINTFORML Size of "MyMap": {MAP_SIZE("MyMap")}

        ONEINPUT
    ``` 
    ``` title="Result"
    Size of "MyMap": 0
    ID: username Password: 123456
    Has "Name": 0
    Size of "MyMap": 2
    Size of "MyMap": 0
    ```

### Related
- [MAP Creation](MAP_MANAGE.md)


---

# MAP_SERIALIZATION.en
---
---
hide:
  - toc
---

# MAP Serialization

| Function name                                                                   | Arguments                | Return   |
| :----------------------------------------------------------------------------- | :---------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`MAP_TOXML`](./MAP_SERIALIZATION.md)   | `string`                | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_FROMXML`](./MAP_SERIALIZATION.md) | `string`, `string`      | `int`    |

!!! info "API"

    ```  { #language-erbapi }
    1. string MAP_TOXML mapName
    2. int MAP_FROMXML mapName, xmlMap
    ```

    Functions to convert between `MAP` (associative array, [`Dictionary<string,string>`](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2)) and `XML`. Can be used to save MAP contents to save files.

    - `MAP_TOXML`: Converts the MAP with `mapName` to XML and returns it.
    - `MAP_FROMXML`: Reads and overwrites key-value pairs from XML into the MAP with `mapName`.

    The XML must be in the following format:
    ``` xml
    <map>
        <p><k>key1</k><v>value1</v></p>
        <p><k>key2</k><v>value2</v></p>
        <p><k>key3</k><v>value3</v></p>
        ....
    </map>
    ```
    
!!! hint "Hint"

    Available as both command and function in expressions

!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM i
        #DIMS xml

        MAP_CREATE "MyMap"
        FOR i, 0, 3
            MAP_SET "MyMap", TOSTR(i), TOSTR(i*100)
        NEXT
        xml '= MAP_TOXML("MyMap")
        PRINTSL xml

        MAP_CLEAR "MyMap"
        FOR i, 0, 3
            MAP_SET "MyMap", TOSTR(i), TOSTR(i)
            PRINTFORML MyMap["%TOSTR(i)%"] = %MAP_GET("MyMap", TOSTR(i))%
        NEXT
        PRINTL

        MAP_FROMXML "MyMap", xml
        FOR i, 0, 3
            PRINTFORML MyMap["%TOSTR(i)%"] = %MAP_GET("MyMap", TOSTR(i))%
        NEXT

        ONEINPUT
    ``` 
    ``` title="Result"
    <map><p><k>0</k><v>0</v></p><p><k>1</k><v>100</v></p><p><k>2</k><v>200</v></p></map>
    MyMap["0"] = 0
    MyMap["1"] = 1
    MyMap["2"] = 2
    
    MyMap["0"] = 0
    MyMap["1"] = 100
    MyMap["2"] = 200
    ```


---

# MATCH.en
---
---
hide:
  - toc
---

# MATCH

| Function name                                             | Arguments                   | Return |
| :-------------------------------------------------------- | :-------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`MATCH`](./MATCH.md) | `array`, `any`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int MATCH array, value(, start, end)
    ```
	Returns the number of elements in the specified array that match the `value`.  
	`value` must be the same type as `array`.  
	Specify a one-dimensional array to search in `array`, and search elements from `start` to less than `end`.  
	If `end` is omitted, the search extends to the end of the array.  
	`RESULT = MATCH(X, Y, A, B)` is equivalent to:

		RESULT = 0
		FOR COUNT, A, B
			IF X:COUNT == Y
				RESULT += 1
			ENDIF
		REND

	(This also works if you specify string arrays and string expressions instead of `X` and `Y`.)  
	Only one-dimensional array variables can be specified for `array`; multidimensional arrays cannot be used.  
	If a character array such as `CFLAG` is specified for `array`, only the specified characters are counted.

!!! hint "Hint"

    Both command and expression function forms are available.

### Related
- [GROUPMATCH](GROUPCHECK.md)


---

# MATH_EXTENSION.en
---
---
hide:
  - toc
---

# CBRT, LOG, LOG10, EXPONENT

| Function name                                                                  | Arguments | Return |
| :----------------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBRT`](./MATH_EXTENSION.md)            | `int`     | `int`  |
| ![](../assets/images/IconEmuera.webp)[`LOG`](./MATH_EXTENSION.md)             | `int`     | `int`  |
| ![](../assets/images/IconEmuera.webp)[`LOG10`](./MATH_EXTENSION.md)           | `int`     | `int`  |
| ![](../assets/images/IconEmuera.webp)[`EXPONENT`](./MATH_EXTENSION.md)        | `int`     | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBRT value
	int LOG value
	int LOG10 value
	int EXPONENT value
    ```
	From the private modification changelog:

		Added mathematical functions as expression functions
		CBRT (cube root)
		LOG (natural logarithm)
		LOG10 (common logarithm)
		EXPONENT (exponential function)
		Format for all: functionName(argument)

	Since Emuera cannot handle decimal values, some ingenuity is required when using these functions.

!!! hint "Hint"

    Both command and expression function forms are available.


---

# MAX.en
---
---
hide:
  - toc
---

# MAX, MIN, LIMIT, INRANGE

| Function name                                               | Arguments              | Return |
| :---------------------------------------------------------- | :-------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`MAX`](./MAX.md)       | `int`(, `int`...)     | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MIN`](./MAX.md)       | `int`(, `int`...)     | `int`  |
| ![](../assets/images/IconEmuera.webp)[`LIMIT`](./MAX.md)    | `int`, `int`, `int`   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`INRANGE`](./MAX.md)  | `int`, `int`, `int`   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int MAX int(, int...)
	int MIN int(, int...)
	int LIMIT int, minValue, maxValue
	int INRANGE int, minValue, maxValue
    ```
	`MAX` returns the maximum value among the arguments.

	`MIN` returns the minimum value among the arguments.

	`LIMIT` returns the value of the first argument.
	However, if the first argument is less than the second argument, it returns the second argument. If it is greater than the third argument, it returns the third argument.
	For example, if you want to assign `X - Y` to `A` but ensure the value after assignment is between `0` and `100`, you would normally write:

    ```  { #language-erbapi }
	A = X - Y
	SIF A < 0
		A = 0
	SIF A > 100
		A = 100
    ```

	The `LIMIT` command allows you to combine this into two lines or one line.

    ```  { #language-erbapi }
	LIMIT X - Y, 0, 100
	A = RESULT

	A = LIMIT(X - Y, 0, 100)
    ```

	`INRANGE` returns `1` if the first argument's value is greater than or equal to the second argument and less than or equal to the third argument. It returns `0` if the first argument is less than the second or greater than the third.

!!! hint "Hint"

    Both command and expression function forms are available.

### Related
- [MAXARRAY, MINARRAY](MAXMINARRAY.md)


---

# MAXMINARRAY.en
---
---
hide:
  - toc
---

# MAXARRAY, MINARRAY

| Function name                                                        | Arguments                   | Return |
| :------------------------------------------------------------------ | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`MAXARRAY`](./MAXMINARRAY.md) | `integerArray`, `int`, `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MINARRAY`](./MAXMINARRAY.md) | `integerArray`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int MAXARRAY integerArray(, start, end)
	int MINARRAY integerArray(, start, end)
    ```
	Returns the maximum or minimum value in an array.  
	Specify a one-dimensional array to search in `integerArray`, and search elements from `start` to less than `end`.  
	If `end` is omitted, the search extends to the end of the array.  
	`RESULT = MAXARRAY(X, A, B)` is equivalent to:

		RESULT = X:A
		FOR COUNT, A, B
			IF X:COUNT > RESULT
				RESULT = X:COUNT
			ENDIF
		REND

	Only one-dimensional integer array variables can be specified for `integerArray`; string variables and multidimensional arrays cannot be used.  
	If a character array such as `CFLAG` is specified for `integerArray`, only the specified characters are searched.

!!! hint "Hint"

    Both command and expression function forms are available.

### Related
- [MAX, MIN](MAX.md)


---

# MONEYSTR.en
---
---
hide:
  - toc
---

# MONEYSTR

| Function name                                                       | Arguments         | Return   |
| :------------------------------------------------------------------ | :---------------- | :--------|
| ![](../assets/images/IconEmuera.webp)[`MONEYSTR`](./MONEYSTR.md)  | `int`, `option`  | `string`|

!!! info "API"

    ```  { #language-erbapi }
	string MONEYSTR
    ```
	Returns in `RESULTS:0` a string with the [configured money unit](../Emuera/replace.md#_1) appended to the number given as the argument.  
	Unit prefix/suffix is automatically handled.  
	The second argument is the conversion format specifier for numeric string conversion, similar to the [`TOSTR`](./TOSTR.md) command.

!!! hint "Hint"

    Command and expression function both supported.


---

# MOUSEB.en
---
---
hide:
  - toc
---

# MOUSEB

| Function name                                                   | Arguments | Return   |
| :------------------------------------------------------- | :--- | :------- |
| ![](../assets/images/IconEE.webp)[`MOUSEB`](./MOUSEB.md) | none | `string` |

!!! info "API"

	``` { #language-erbapi }
	string MOUSEB
	```

	Gets the content of the button being hovered over.

!!! hint "Hint"

    Expression function support  
	Used in combination with `AWAIT`  
	Returns as string type because it is not determined whether it is `INPUT` or `INPUTS` at the time of execution

### See Also
- [AWAIT](AWAIT.md)


---

# MOUSEXY.en
---
---
hide:
  - toc
---

# MOUSEX, MOUSEY

| Function name                                                             | Arguments | Return |
| :----------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`MOUSEX`](./MOUSEXY.md)      | none | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MOUSEY`](./MOUSEXY.md)      | none | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	MOUSEX
	MOUSEY
    ```
	Gets the current X or Y coordinate of the mouse cursor.  
	The coordinates are relative positions with the bottom-left of the client area as (0,0), with the positive x-axis to the right and the positive y-axis downward.  
	Note that MOUSEY returns a negative value when the cursor is inside the client area.  
	The size of the client area can be obtained using the [`CLIENTWIDTH`](./CLIENTFIELD.md) and [`CLIENTHEIGHT`](./CLIENTFIELD.md) functions.  
	(If you need Y coordinates relative to the top-left of the client area, you can get them with `MOUSEY()+CLIENTHEIGHT()`)  
	This function works even when Emuera's window is not active, and even when the mouse cursor is outside the window.

!!! hint "Hint"

    Both commands and expression functions are supported.

### See Also
- [AWAIT](AWAIT.md)


---

# ONEINPUT.en
---
---
hide:
  - toc
---

# ONEINPUT(S)

| Function name                                                        | Arguments           | Return    |
| :------------------------------------------------------------------- | :------------------ | :-------- |
| ![](../assets/images/IconEmuera.webp)[`ONEINPUT`](./ONEINPUT.md)   | `int`(, `int`)     | `int`     |
| ![](../assets/images/IconEmuera.webp)[`ONEINPUTS`](./ONEINPUT.md)  | `string`(, `int`)  | `string`  |

!!! info "API"

    ```  { #language-erbapi }
	ONEINPUT defaultValue
	ONEINPUTS defaultValue
    ```
    Single-character-only input auto-processing command `ONEINPUT`, `ONEINPUTS`.  
    Format: `ONEINPUT` or `ONEINPUTS`.  
    Content: Accepts only one character of input, automatically proceeds to the next process upon input.  

    If multiple digits (or multiple characters) are pasted using paste etc., only the first digit (character) is processed as input.  
    As with `INPUT` and `INPUTS`, you can set a default input value using arguments for when an empty string is entered.  
    However, if a negative value is specified in `ONEINPUT` or an empty string is specified in `ONEINPUTS`, the argument becomes invalid and behaves the same as when no argument is specified.  
    Also, if multiple digits (or multiple characters) are specified as arguments, only the first digit (character) becomes the default input value.  
    If the argument is omitted and an empty string is entered, `ONEINPUT` requests re-input as usual, and `ONEINPUTS` assigns an empty string to `RESULTS` and proceeds to the next process.  
    In the case of `ONEINPUTS`, pressing Enter with an empty string is treated as entering an empty string.  

    Note that when these commands are used, even if keyboard macros are configured in Emuera's CONFIG settings, they may not work properly - this is by design.  

    Also, in `ONEINPUTS`, macro expressions can be used as with [`INPUTS`](./INPUT.md).  
    To use '()' as a string, escape it using '.'


!!! hint "Hint"

    Command only.

### See Also
- [INPUT](INPUT.md)
- [WAITANYKEY](WAITANYKEY.md)


---

# OUTPUTLOG.en
---
---
hide:
  - toc
---

# OUTPUTLOG

| Function name                                                                                           | Arguments    | Return |
| :------------------------------------------------------------------------------------------------------ | :----------- | :----- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEE.webp)[`OUTPUTLOG`](./OUTPUTLOG.md) | (`string`)   | none   |

!!! info "API"

    ```  { #language-erbapi }
	OUTPUTLOG (filePath)
    ```
    The log output command OUTPUTLOG. Don't overuse it as it can shorten the lifespan of your disk.  
    Note that the log encoding is Unicode.  
    In EM+EE, specifying an argument allows output to that filename.extension. Literals work the same as `PRINTS`.  
    In `v5fix`, a vulnerability that allowed specifying parent directories was fixed. Subdirectories are still allowed.  


!!! hint "Hint"

    Command only.

### See Also
- [SAVETEXT](SAVETEXT.md)


---

# PICKUPCHARA.en
---
---
hide:
  - toc
---

# PICKUPCHARA

| Function name                                                                 | Arguments            | Return |
| :----------------------------------------------------------------------------- | :------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`PICKUPCHARA`](./PICKUPCHARA.md) | `int`(, `int`...)  | none   |

!!! info "API"

    ```  { #language-erbapi }
	PICKUPCHARA charaID(, charaID...)
    ```
    Command that deletes all characters except those specified in the arguments.  
    `MASTER:0`, `TARGET:0`, `ASSI:0` etc. are automatically tracked. No manual adjustment is required after the command.  
    Specifying a negative value for the target character results in an error. However, if `MASTER`, `TARGET`, `ASSI`, etc. are set as targets and the result is a negative value, it does not cause an error (it is ignored).

!!! hint "Hint"

    Command only.

### Related
- [DELCHARA](DELCHARA.md)
- [DELALLCHARA](DELALLCHARA.md)


---

# PLAYBGM.en
---
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


---

# PLAYSOUND.en
---
---
hide:
  - toc
---

# PLAYSOUND

| Function name                                                 | Arguments | Return |
| :------------------------------------------------------------ | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`PLAYSOUND`](./PLAYSOUND.md) | `string` | `void` |

!!! info "API"

	``` { #language-erbapi }
	PLAYSOUND MediaFile
	```

	Plays a sound file from the `sound` folder once

!!! hint "Hint"

    Available as command only  
    Supports simultaneous playback of up to 10 sound files  
    Uses WMPLib, supports formats playable by WMP

### Related
- [PLAYBGM](PLAYBGM.md)
- [SETSOUNDVOLUME](SETSOUNDVOLUME.md)


---

# POWER.en
---
---
hide:
  - toc
---

# POWER

| Function name                                               | Arguments                        | Return |
| :---------------------------------------------------------- | :------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`POWER`](./POWER.md) | `integerVariable`, `int`, `int`  | `int`  |
|                                                             | `int`, `int`                    | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	POWER integerVariable, int, int
	int POWER int, int
    ```
    Arguments differ between command and expression function.  
    For the command form, the value of the second argument multiplied by the third argument is assigned to the variable specified in the first argument.  
    For the expression function form, the value of the first argument multiplied by the second argument is returned.


!!! hint "Hint"

    Both command and expression function forms are available.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		ADDVOIDCHARA
		TARGET = 0
		X = 11
		Y = 2
		POWER A, X, 2
		PRINTFORML <TEST1> = {A}
		POWER CFLAG:2, X + 1, Y + 1
		PRINTFORML <TEST2> = {CFLAG:2}
    ``` 
    ``` title="Result"
	<TEST1> = 121
	<TEST2> = 1728
    ```

### Related
- [CBRT, LOG, LOG10, EXPONENT](MATH_EXTENSION.md)


---

# PRINT.en
---
---
hide:
  - toc
---

# PRINT Related

| Function name                                                                                                                                            | Arguments | Return   |
| :------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------- | :------- |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)![](../assets/images/Icondotnet.webp)[<code>PRINT(|V|S|FORM|FORMS)(|K|D)(|L|W|N)</code>](./PRINT.md) | `string`  | none     |

!!! info "API"

    ```  { #language-erbapi }
    PRINTV(|K|D)(|L|W|N) integerVariable
    PRINTS(|K|D)(|L|W|N) stringVariable
    PRINTFORM(|K|D)(|L|W|N) formedString
    PRINTFORMS(|K|D)(|L|W|N) string
    ```
    Basic command for the PRINT family.

    ![](../assets/images/Iconeramaker.webp)The keyword in the first set of parentheses specifies the argument type.

    - None - (<string>)
    - V - (<expression> <expression> ,<expression> ...)
    - S - <string expression>
    - FORM - (<formed string>)
    - FORMS - <formed string expression>

    ![](../assets/images/IconEmuera.webp)The "K" in the second set of parentheses specifies whether to apply the FORCEKANA command. The "D" keyword specifies to ignore the SETCOLOR command. Keywords K and D cannot be used together.

    - None - Ignores `FORCEKANA` and draws with the color specified by `SETCOLOR`.
    - K - Applies `FORCEKANA` when drawing.
    - D - Ignores `SETCOLOR` and draws with the default color specified in config.

    ![](../assets/images/Iconeramaker.webp)The keyword in the third set of parentheses specifies whether to add a newline after drawing and whether to wait.

    - None - `PRINT` alone, no newline or `WAIT`.
    - L - Newline after `PRINT`.
    - W - Newline after `PRINT` and executes `WAIT` command.
    - ![](../assets/images/Icondotnet.webp)N - Executes `WAIT` command after `PRINT` without newline. Cannot be combined with keywords K or D in the second set of parentheses.
    - For example, `PRINTSDW` means: takes a <string expression> as argument, draws with default color, and executes `WAIT` command after `PRINT`.

!!! hint "Hint"

    Command only.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    #DIM HOGE
    #DIMS HOGES
    	PRINT 1+2=
    	HOGE = 3
    	PRINTV HOGE
    	PRINTL
    	PRINT HOGES is
    	HOGES = String
    	PRINTSL HOGES
    	PRINT HOGE*HOGE=
    	PRINTFORMSL HOGES*HOGE
    	SETCOLORBYNAME yellow
    	HOGE = GETCOLOR()
    	PRINTFORML Now color is R:{HOGE/0x10000} G:{HOGE/0x100%0x100} B:{HOGE%0x100}
    	HOGES = but PRINTD will ignore SETCOLOR
    	PRINTSDL HOGES
    	HOGES = サンプルはこれでおわり
    	FORCEKANA 2
    	PRINTK ﾌﾟﾘﾝﾄの
    	PRINTFORMKW %HOGES%
    ```
    ![](../assets/images/PRINT.png)

### Related Items
- [PRINTBUTTON](PRINTBUTTON.md)
- [BITMAP_CACHE_ENABLE](BITMAP_CACHE_ENABLE.md)
- [Extensions added in Emuera>Formatted String (FORM syntax) Extensions](../Emuera/expression.md#form_1)


---

# PRINT_IMG.en
---
---
hide:
  - toc
---

# PRINT_IMG

| Function name                                                                                              | Arguments                                                     | Return   |
| :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------ | :------- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`PRINT_IMG`](./PRINT_IMG.md) | `string`                                                      | none     |
|                                                                                                            | `string`, `int`, `int`, `int`                                 | none     |
|                                                                                                            | `string`, `string`, `int`, `int`, `int`                       | none     |
|                                                                                                            | `string`, `string`, `2DIntegerVariable`, `int`, `int`, `int` | none     |

!!! info "API"

    ```  { #language-erbapi }
	PRINT_IMG spriteName
	PRINT_IMG spriteName, width, height, ypos
	PRINT_IMG spriteName, spriteNameBack, width, height, ypos
	PRINT_IMG spriteName, spriteNameBack, colorMatrix, width, height, ypos
    ```
	Displays the specified image in the line.
	Corresponds to the `<img>` tag of the [`HTML_PRINT` command](../Emuera/HTML_PRINT.md#img).
	Syntax extended in EM+EE. See [Summary](../EMEE/EMEE_Summary.md#html_printprint) for details.

!!! hint "Hint"

    Command only.

### Related Items
- [SPRITECREATE](SPRITECREATE.md)


---

# PRINT_RECT.en
---
---
hide:
  - toc
---

# PRINT_RECT

| Function name                                                               | Arguments               | Return   |
| :-------------------------------------------------------------------------- | :---------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`PRINT_RECT`](./PRINT_RECT.md) | `int`                   | none     |
|                                                                           | `int`, `int`, `int`, `int` | none     |

!!! info "API"

    ```  { #language-erbapi }
	PRINT_RECT width
	PRINT_RECT xPos, yPos, width, height
    ```
	Displays a rectangle with width as the specified percentage of font size, or displays a rectangle with x, y, width, height each as the specified percentage of arguments.
	The color can be changed using the `SETCOLOR` command, same as font color.
	Corresponds to the `<shape type='rect'>` tag of the [`HTML_PRINT` command](../Emuera/HTML_PRINT.md#shape).
	In EM+EE, `px` notation is also supported.

!!! hint "Hint"

    Command only.


---

# PRINT_SPACE.en
---
---
hide:
  - toc
---

# PRINT_SPACE

| Function name                                                                 | Arguments | Return   |
| :----------------------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`PRINT_SPACE`](./PRINT_SPACE.md) | `int`     | none     |

!!! info "API"

    ```  { #language-erbapi }
	PRINT_SPACE width
    ```
	Creates a blank space with size equal to the specified percentage of font size.
	Corresponds to the `<shape type='space'>` tag of the [`HTML_PRINT` command](../Emuera/HTML_PRINT.md#shape).
	In EM+EE, `px` notation is also supported.


!!! hint "Hint"

    Command only.


---

# PRINT_STATUS.en
---
---
hide:
  - toc
---

# PRINT_STATUS Related

| Function name                                                                       | Arguments | Return   |
| :---------------------------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_ABL`](./PRINT_STATUS.md)      | `int`     | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_TALENT`](./PRINT_STATUS.md)   | `int`     | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_MARK`](./PRINT_STATUS.md)       | `int`     | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_EXP`](./PRINT_STATUS.md)      | `int`     | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_PALAM`](./PRINT_STATUS.md)    | `int`     | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_ITEM`](./PRINT_STATUS.md)     | none      | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_SHOPITEM`](./PRINT_STATUS.md) | none      | none     |

!!! info "API"

    ```  { #language-erbapi }
	PRINT_ABL charaID
	PRINT_TALENT charaID
	PRINT_MARK charaID
	PRINT_EXP charaID
	PRINT_PALAM charaID
	PRINT_ITEM
	PRINT_SHOPITEM
    ```
    Each displays the current status in a simple format.
    For `PRINT_ABL`, `PRINT_TALENT`, `PRINT_MARK`, `PRINT_EXP`, and `PRINT_PALAM`, specify the character ID as the argument.


!!! hint "Hint"

    Command only.


!!! example "Example" 
    

    ``` { #language-erb title="ABL.csv" }
	0,能力0
	1,能力1
	2,能力2
    ```

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		ADDVOIDCHARA
		ABL:0:0 = 2
		ABL:0:2 = 3

		PRINT_ABL 0
		WAIT
    ``` 
    ``` title="Result"
	能力0LV2 能力2LV3 
    ```


---

# PRINTBUTTON.en
---
---
hide:
  - toc
---

# PRINTBUTTON Related

| Function name                                                                                     | Arguments    | Return   |
| :------------------------------------------------------------------------------------------------ | :----------- | :------- |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTBUTTON(|C|LC)</code>](./PRINTBUTTON.md) | `string`, `any` | none     |

!!! info "API"

    ```  { #language-erbapi }
    PRINTBUTTON(|C|LC) string, buttonValue
    ```
    The `PRINTBUTTON` command creates a clickable button.
    The format is similar to the [`PRINTS`](./PRINT.md) command, but the second argument specifies the number or string to input when clicked.
    If the first argument contains a newline code, it is omitted and no newline occurs.

    Emuera automatically converts numbers enclosed in `[]` (like `[300] Save`) along with surrounding text into buttons.
    `PRINTBUTTON` is the command to forcibly create such buttons instead of relying on automatic conversion.
    This command is useful in situations like:

    ```  { #language-erbapi }
    PRINT これでいい？ [0] はい    [1] いいえ
    INPUT
    ```

    Emuera cannot correctly recognize buttons in such lines, resulting in two buttons: `これでいい？ [0] はい` and `[1] いいえ`.
    Rewriting with `PRINTBUTTON`:

    ```  { #language-erbapi }
    PRINTS "これでいい？ "
    PRINTBUTTON "[0] はい", 0
    PRINTS "     "
    PRINTBUTTON "[1] いいえ", 1
    INPUT
    ```

    (Using `PRINTS` instead of `PRINT` is to clearly show the number of half-width spaces)
    With this, `これでいい？ ` becomes non-button, and only `[0] はい` and `[1] いいえ` become buttons.
    While it's not required for the displayed string to contain `[0]` or `[1]`, not displaying the corresponding numbers may confuse users using numpad operations. It is recommended to keep the `[0]` notation as before.
    Also, `PRINTBUTTON` can create buttons that input strings instead of numbers. Such buttons can be clicked when [`INPUTS`](./INPUT.md) command is executed.

    ```  { #language-erbapi }
    PRINTL 名前を入力してください。
    PRINTBUTTON "[ほげほげ] ", "ほげほげ"
    PRINTBUTTON "[ぷげぷげ] ", "ぷげぷげ"
    PRINTBUTTON "[ふうばあ] ", "ふうばあ"
    INPUTS
    ```

    The keyword in parentheses specifies the text alignment.

    - None - No alignment
    - `C` - Aligns right like [`PRINTC`](./PRINTC.md)
    - `LC` - Aligns left like [`PRINTLC`](./PRINTC.md)

!!! hint "Hint"

    Command only.

### Related Items
- [PRINT](PRINT.md)


---

# PRINTC.en
---
---
hide:
  - toc
---

# PRINTC Related

| Function name                                                                                        | Arguments | Return   |
| :---------------------------------------------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/IconEmuera.webp)[<code>PRINT(|FORM)(C|LC)(|K|D)</code>](./PRINTC.md) | `string`  | none     |

!!! info "API"

    ```  { #language-erbapi }
    PRINT(C|L)(|K|D) string
    PRINTFORM(C|L)(|K|D)(|L|W) formedString
    ```
    `PRINTC` family command.
    Pads the string with half-width spaces to match the character count specified in config [`PRINTC character count`](../Emuera/config.md#printc_1) (default 25) before printing.
    Note that Emuera handles `PRINTC` family commands specially within the button conversion processing of `PRINT`ed strings.

    The keyword in the first set of parentheses specifies the argument type.

    - None - <string>
    - `FORM` - <formed string>

    The keyword in the second set of parentheses specifies the alignment position.

    - `C` - Align right (adds half-width spaces on the left)
    - `LC` - Align left

    The `K` and `D` in the third set of parentheses work the same as the [PRINT](./PRINT.md) family.

!!! hint "Hint"

    Command only.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    	PRINTC AAA
    	PRINT |
    	PRINTC BBB
    	PRINT |
    	PRINTC CCC
    	PRINTL |
    	PRINTLC DDD
    	PRINT |
    	PRINTLC EEE
    	PRINT |
    	PRINTLC FFF
    	PRINTL |
    	PRINTC GGG
    	PRINT |
    	PRINTLC HHH
    	PRINT |
    	PRINTC III
    	PRINTW |
    ```
    ``` title="Result"
                          AAA|                      BBB|                      CCC|
    DDD                      |EEE                      |FFF                      |
                          GGG|HHH                      |                      III|

    ```

### Related Items
- [PRINTCPERLINE](PRINTCPERLINE.md)
- [PRINTCLENGTH](PRINTCLENGTH.md)


---

# PRINTCLENGTH.en
---
---
hide:
  - toc
---

# PRINTCLENGTH

| Function name                                                           | Arguments | Return |
| :----------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`PRINTCLENGTH`](./PRINTCLENGTH.md) | none | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int PRINTCLENGTH
    ```
	Returns the value of [`PRINTCの文字数`](../Emuera/config.md#printc_1) from config. This is equivalent to `RESULT = GETCONFIG("PRINTCの文字数")`.

!!! hint "Hint"

    Command and expression function both supported.

### Related
- [PRINTCPERLINE](PRINTCPERLINE.md)


---

# PRINTCPERLINE.en
---
---
hide:
  - toc
---

# PRINTCPERLINE

| Function name                                                             | Arguments | Return |
| :------------------------------------------------------------------------ | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`PRINTCPERLINE`](./PRINTCPERLINE.md) | none | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int PRINTCPERLINE
    ```
	Returns the number specified by the [config `PRINTCを並べる数`](../Emuera/config.md#printc) in `RESULT:0`. The default is 3.  
	This is equivalent to `RESULT = GETCONFIG("PRINTCを並べる数")`.


!!! hint "Hint"

    Command and expression function both supported.

### Related
- [PRINTCLENGTH](PRINTCLENGTH.md)


---

# PRINTDATA.en
---
---
hide:
  - toc
---

# PRINTDATA Related

| Function name                                                                                        | Arguments     | Return   |
| :---------------------------------------------------------------------------------------------------- | :------------ | :------- |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTDATA(|K|D)(|L|W)</code>](./PRINTDATA.md) | none          | none     |
| ![](../assets/images/IconEmuera.webp)[`DATA`](./PRINTDATA.md)                                        | `string`      | none     |
| ![](../assets/images/IconEmuera.webp)[`DATAFORM`](./PRINTDATA.md)                                     | `formedString` | none     |
| ![](../assets/images/IconEmuera.webp)[`DATALIST`](./PRINTDATA.md)                                    | none          | none     |
| ![](../assets/images/IconEmuera.webp)[`ENDLIST`](./PRINTDATA.md)                                     | none          | none     |
| ![](../assets/images/IconEmuera.webp)[`ENDDATA`](./PRINTDATA.md)                                     | none          | none     |

!!! info "API"

    ```  { #language-erbapi }
    PRINTDATA(|K|D)(|L|W)
    	DATA string
    	DATAFORM formedString
    	DATALIST
    	ENDLIST
    ENDDATA
    ```
    `PRINTDATA` family command. According to the custom readme:

    ```  { #language-erbapi }
    ;*Format*
    PRINTDATA (numericVariable: optional)
    	DATA (string)
    	DATAFORM (FORM string)
    	DATALIST
    		(DATA or DATAFORM list)
    	ENDLIST
    ENDDATA
    ```

    *Content*
    Randomly displays one of the strings specified by DATA, DATAFORM, or DATALIST~ENDLIST with equal probability.
    Allows implementing random display without using IF and RAND.
    If a numeric variable is specified as an argument, the number of the displayed DATA will be stored in that variable.
    Use this when you want to modify subsequent processing based on which string was displayed.
    Within DATALIST~ENDLIST, each DATA or DATAFORM counts as one line.

    The `K`, `D`, `L`, `W` keywords work the same as the [PRINT](./PRINT.md) family.
    If no display data is provided by the `DATA` family inside `PRINTDATA`~`ENDDATA`, it proceeds without doing anything.
    You cannot include any statements other than the above syntax inside `PRINTDATA`~`ENDDATA` or `DATALIST`~`ENDLIST`.

!!! hint "Hint"

    Command only.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    	REPEAT 10
    		PRINTDATA
    			DATA A
    			DATA B
    			DATA C
    			DATA D
    			DATA E
    		ENDDATA
    	REND

    	WAIT
    ```
    ``` title="Result"
    DBDAEACDAE
    ```

### Related Items
- [STRDATA](STRDATA.md)
- [SELECTCASE](SELECTCASE.md)
- [RAND](RAND.md)


---

# PRINTN.en
---
---
hide:
  - toc
---

# PRINTN Related

| Function name                                                                                                                                            | Arguments | Return   |
| :------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------- | :------- |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)![](../assets/images/Icondotnet.webp)[<code>PRINT(|V|S|FORM|FORMS)N</code>](./PRINT.md) | `string`  | none     |

!!! info "API"

    ```  { #language-erbapi }
	PRINTN string
    PRINTVN integerVariable
    PRINTSN stringVariable
    PRINTFORMN formedString
    PRINTFORMSN string
    ```
    A `PRINTW` command without newline. Only added to the basic `PRINT` commands mentioned above.
	Each behavior and literal is the same as the [PRINT family commands](PRINT.md).

!!! hint "Hint"

    Command only.

### Related Items
- [PRINT](PRINT.md)


---

# PRINTPLAIN.en
---
---
hide:
  - toc
---

# PRINTPLAIN

| Function name                                                                                  | Arguments | Return   |
| :--------------------------------------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTPLAIN(|FORM)</code>](./PRINTPLAIN.md) | `string`  | none     |

!!! info "API"

    ```  { #language-erbapi }
    PRINTPLAIN(|FORM) string
    ```
    Outputs the argument string as plain text. Even if there are button strings (like numbers), they will not be converted to buttons.
    The keyword in parentheses specifies the argument type.

    - None - <string>
    - `FORM` - <formed string>

!!! hint "Hint"

    Command only.

### Related Items
- [PRINT](PRINT.md)


---

# PRINTSINGLE.en
---
---
hide:
  - toc
---

# PRINTSINGLE Related

| Function name                                                                                                         | Arguments | Return   |
| :--------------------------------------------------------------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTSINGLE(|V|S|FORM|FORMS)(|K|D)</code>](./PRINTSINGLE.md) | `string`  | none     |

!!! info "API"

    ```  { #language-erbapi }
    PRINTSINGLEV(|K|D) integerVariable
    PRINTSINGLES(|K|D) stringVariable
    PRINTSINGLEFORM(|K|D) formedString
    PRINTSINGLEFORMS(|K|D) string
    ```
    The `PRINTSINGLE` family is almost the same as `PRINTL`, but `PRINTSINGLE` does not wrap text and always displays on a single line.
    Characters beyond the screen edge are not drawn.
    Since newline is automatically added, there are no `(|L|W)` keywords.
    Other keywords work the same as the [PRINT](./PRINT.md) family.

!!! hint "Hint"

    Command only.

### Related Items
- [PRINT](PRINT.md)


---

# PUTFORM.en
---
---
hide:
  - toc
---

# PUTFORM

| Function name                                                       | Arguments | Return |
| :------------------------------------------------------------------ | :-------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`PUTFORM`](./PUTFORM.md) | `string`  | none   |

!!! info "API"

    ```  { #language-erbapi }
	PUTFORM saveInfo
    ```
    `PUTFORM` can only be used in the special function `@SAVEINFO`.  
    By writing in the same format as `PRINTFORM`, you can add a summary to the save data.  
    You should write data such as what day it is, the character's abilities, which character is being trained, etc.


!!! hint "Hint"

    Command only.

### See Also
- [SAVEDATA](SAVEDATA.md)
- [System Flow Diagram>SAVEGAME](../Emuera/system_flow.md#savegame)


---

# QUIT.en
---
---
hide:
  - toc
---

# QUIT

| Function name                                                   | Arguments | Return |
| :------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`QUIT`](./QUIT.md)   | none | none   |

!!! info "API"

    ```  { #language-erbapi }
	QUIT
    ```
    Exits Emuera after one [`WAIT`](./WAIT.md).


!!! hint "Hint"

    Commands only.

### See Also
- [FORCE_QUIT](FORCE_QUIT.md)
- [QUIT_AND_RESTART](QUIT_AND_RESTART.md)


---

# QUIT_AND_RESTART.en
---
---
hide:
  - toc
---

# QUIT_AND_RESTART

| Function name                                                                         | Arguments | Return |
| :----------------------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`QUIT_AND_RESTART`](./QUIT_AND_RESTART.md) | `void` | `void` |

!!! info "API"

    ``` { #language-erbapi }
	QUIT_AND_RESTART
    ```

	Similar to QUIT, restarts Emuera after WAIT.

!!! hint "Hint"

	Since this is a command, it cannot be used as an expression function.

### See Also
- [QUIT](QUIT.md)
- [FORCE_QUIT_AND_RESTART](FORCE_QUIT_AND_RESTART.md)


---

# RAND.en
---
---
hide:
  - toc
---

# RAND

| Function name                                           | Arguments        | Return |
| :----------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`RAND`](./RAND.md) | `int`(, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int RAND min(, max)
    ```
	Almost the same as the variable with the same name.  
	`RAND(X)` behaves exactly the same as `RAND:X`.  
	The random number generator is exactly the same, and random numbers can be controlled by [`RANDOMIZE`](./RANDOMIZE.md) or [`INITRAND`](./RANDOMIZE.md).  
	The `RAND` function can specify two arguments; when two are specified, the first argument is used as the minimum value of the random number.  
	This function generates a random number between 0 and 18446744073709551615 (2^64 - 1), divides it by `max-min`, adds `min`, and returns the result.  
	Therefore, `max` must be greater than `min` (cannot be the same).  
	An error occurs if `max-min` exceeds the maximum value of signed 64-bit integer (9223372036854775807).  
	Also, if `max-min` is very large (about 1 trillion?), the bias from the modulo operation becomes significant.

!!! hint "Hint"

    Available as both command and function in expressions

### Related
- [PRINTDATA](PRINTDATA.md)
- [STRDATA](STRDATA.md)


---

# RANDOMIZE.en
---
---
hide:
  - toc
---

# RANDOMIZE, DUMPRAND, INITRAND

| Function name                                                       | Arguments | Return |
| :----------------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`RANDOMIZE`](./RANDOMIZE.md) | `int` | none   |
| ![](../assets/images/IconEmuera.webp)[`DUMPRAND`](./RANDOMIZE.md)  | none  | none   |
| ![](../assets/images/IconEmuera.webp)[`INITRAND`](./RANDOMIZE.md)  | none  | none   |

!!! info "API"

    ```  { #language-erbapi }
	RANDOMIZE int
	DUMPRAND
	INITRAND
    ```
	Commands to control the random numbers obtained by `RAND:X`.

	The `RANDOMIZE` command initializes the random number generator with the specified value.  
	If initialized with the same value, `RAND` will always return the same result.  
	[`PRINTDATA`](./PRINTDATA.md) and [`STRDATA`](./STRDATA.md) will also return the same results.

	`DUMPRAND` saves the current random number state to the `RANDDATA` variable.  
	`INITRAND` loads the data saved in the `RANDDATA` variable.  
	Be careful not to execute `INITRAND` before `DUMPRAND`.  
	If the contents of the `RANDDATA` variable are invalid, `RAND` may not work correctly.

	**Example**
    ```  { #language-erbapi }
	PRINTFORML {RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}
	RANDOMIZE 23478612
	PRINTFORML {RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}
	RANDOMIZE 23478612
	PRINTFORML {RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}
	DUMPRAND
	PRINTFORML {RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}
	INITRAND
	PRINTFORML {RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}
	INITRAND
	PRINTFORML {RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}
	```

	**Result**
	```
	92539/49469/48337/15839/48368/1604
	34536/91889/81167/22434/87922/95565
	34536/91889/81167/22434/87922/95565
	68286/10690/68868/82610/90769/60789
	68286/10690/68868/82610/90769/60789
	68286/10690/68868/82610/90769/60789
	```

	Among the results above, the first line is indeterminate. The result changes each time it is executed.  
	Lines 2 and 3 are always the same because they are immediately after `RANDOMIZE` with the same value.  
	Line 4 is preceded by the `DUMPRAND` command.  
	Line 5 is preceded by the `INITRAND` command, which restores the `RAND` state to the state saved by the `DUMPRAND` command.  
	Therefore, lines 4 and 5 have the same results.  
	Line 6 executes `INITRAND` again, producing the same result repeatedly.  
	Since the `RANDDATA` variable is saved, you can continue using the same random number state by executing `DUMPRAND` before saving and `INITRAND` immediately after loading.

!!! hint "Hint"

    Commands only.


---

# README.en
---
## List of commands and functions

---

## Icons meaning

- ![](../assets/images/Iconeramaker.webp) - Commands available from eramaker
- ![](../assets/images/IconEmuera.webp) - Commands added, changed, and extended in Emuera
- ![](../assets/images/IconEM.webp) - Commands added, changed, or extended in EM (EvilMask version)
- ![](../assets/images/IconEE.webp) - Commands added, changed, or extended in EE (Enterprise Edition)
- ![](../assets/images/Icondotnet.webp) - Commands added, changed, or extended in [Emuera.NET](https://gitlab.com/VVIIlet/emuera)
- ![](../assets/images/Iconetc.webp) - Commands added, modified, or extended by other contributors

---

### PRINT related

| Function name                                                                                                                                     | Arguments                                                    | Return   |
| :------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------- | :------- |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[<code>PRINT(\|V\|S\|FORM\|FORMS)(\|K\|D)(\|L\|W)</code>](./PRINT.md) | `string`                                                     | none     |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTSINGLE(\|V\|S\|FORM\|FORMS)(\|K\|D)</code>](./PRINTSINGLE.md)                                    | `string`                                                     | none     |
| ![](../assets/images/IconEmuera.webp)[<code>PRINT(\|FORM)(C\|LC)(\|K\|D)</code>](./PRINTC.md)                                                     | `string`                                                     | none     |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTDATA(\|K\|D)(\|L\|W)</code>](./PRINTDATA.md)                                                     | none                                                         | none     |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTBUTTON(\|C\|LC)</code>](./PRINTBUTTON.md)                                                        | `string`, `any`                                              | none     |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTPLAIN(\|FORM)</code>](./PRINTPLAIN.md)                                                           | `string`                                                     | none     |
| ![](../assets/images/Iconeramaker.webp)[`DRAWLINE`](./DRAWLINE.md)                                                                                | none                                                         | none     |
| ![](../assets/images/IconEmuera.webp)[`CUSTOMDRAWLINE`](./CUSTOMDRAWLINE.md)                                                                      | `string`                                                     | none     |
| ![](../assets/images/IconEmuera.webp)[`DRAWLINEFORM`](./CUSTOMDRAWLINE.md)                                                                        | `formedString`                                               | none     |
| ![](../assets/images/IconEmuera.webp)[`GETLINESTR`](./GETLINESTR.md)                                                                              | `string`                                                     | `string` |
| ![](../assets/images/IconEmuera.webp)[`REUSELASTLINE`](./REUSELASTLINE.md)                                                                        | `string`                                                     | none     |
| ![](../assets/images/IconEmuera.webp)[`CLEARLINE`](./CLEARLINE.md)                                                                                | `int`                                                        | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_ABL`](./PRINT_STATUS.md)                                                                           | `int`                                                        | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_TALENT`](./PRINT_STATUS.md)                                                                        | `int`                                                        | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_MARK`](./PRINT_STATUS.md)                                                                          | `int`                                                        | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_EXP`](./PRINT_STATUS.md)                                                                           | `int`                                                        | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_PALAM`](./PRINT_STATUS.md)                                                                         | `int`                                                        | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_ITEM`](./PRINT_STATUS.md)                                                                          | none                                                         | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_SHOPITEM`](./PRINT_STATUS.md)                                                                      | none                                                         | none     |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`PRINT_IMG`](./PRINT_IMG.md)                                               | `string`                                                     | none     |
|                                                                                                                                                   | `string`, `int`, `int`, `int`                                | none     |
|                                                                                                                                                   | `string`, `string`, `int`, `int`, `int`                      | none     |
|                                                                                                                                                   | `string`, `string`, `2DIntegerVariable`, `int`, `int`, `int` | none     |
| ![](../assets/images/IconEmuera.webp)[`PRINT_RECT`](./PRINT_RECT.md)                                                                              | `int`                                                        | none     |
|                                                                                                                                                   | `int`, `int`, `int`, `int`                                   | none     |
| ![](../assets/images/IconEmuera.webp)[`PRINT_SPACE`](./PRINT_SPACE.md)                                                                            | `int`                                                        | none     |
| ![](../assets/images/Icondotnet.webp)[<code>PRINT(\|V\|S\|FORM\|FORMS)N</code>](./PRINTN.md) | `string` | none   |

### Display operation, font operation, display specifications

| Function name                                                                  | Arguments           | Return   |
| :----------------------------------------------------------------------------- | :------------------ | :------- |
| ![](../assets/images/Iconeramaker.webp)[`BAR`](./BAR.md)                       | `int`, `int`, `int` | none     |
| ![](../assets/images/Iconeramaker.webp)[`BARL`](./BAR.md)                      | `int`, `int`, `int` | none     |
| ![](../assets/images/IconEmuera.webp)[`SETCOLOR`](./SETCOLOR.md)               | `int`, `int`, `int` | none     |
|                                                                                | `int`               | none     |
| ![](../assets/images/IconEmuera.webp)[`RESETCOLOR`](./SETCOLOR.md)             | none                | none     |
| ![](../assets/images/IconEmuera.webp)[`SETBGCOLOR`](./SETBGCOLOR.md)           | `int`, `int`, `int` | none     |
|                                                                                | `int`               | none     |
| ![](../assets/images/IconEmuera.webp)[`RESETBGCOLOR`](./SETBGCOLOR.md)         | none                | none     |
| ![](../assets/images/IconEmuera.webp)[`SETCOLORBYNAME`](./SETCOLORBYNAME.md)   | `colorName`         | none     |
| ![](../assets/images/IconEmuera.webp)[`SETBGCOLORBYNAME`](./SETCOLORBYNAME.md) | `colorName`         | none     |
| ![](../assets/images/IconEmuera.webp)[`GETCOLOR`](./GETCOLOR.md)               | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETBGCOLOR`](./GETCOLOR.md)             | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETDEFCOLOR`](./GETCOLOR.md)            | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETDEFBGCOLOR`](./GETCOLOR.md)          | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETFOCUSCOLOR`](./GETCOLOR.md)          | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`FONTBOLD`](./FONT_OPERATION.md)         | none                | none     |
| ![](../assets/images/IconEmuera.webp)[`FONTITALIC`](./FONT_OPERATION.md)       | none                | none     |
| ![](../assets/images/IconEmuera.webp)[`FONTSTYLE`](./FONT_OPERATION.md)        | `int`               | none     |
| ![](../assets/images/IconEmuera.webp)[`FONTREGULAR`](./FONT_OPERATION.md)      | none                | none     |
| ![](../assets/images/IconEmuera.webp)[`GETSTYLE`](./FONT_OPERATION.md)         | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CHKFONT`](./SETFONT.md)                 | `string`            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SETFONT`](./SETFONT.md)                 | `string`            | none     |
| ![](../assets/images/IconEmuera.webp)[`GETFONT`](./SETFONT.md)                 | none                | `string` |
| ![](../assets/images/IconEmuera.webp)[`FORCEKANA`](./FORCEKANA.md)             | `int`               | none     |
| ![](../assets/images/IconEmuera.webp)[`ALIGNMENT`](./ALIGNMENT.md)             | `keyword`           | none     |
| ![](../assets/images/IconEmuera.webp)[`CURRENTALIGN`](./ALIGNMENT.md)          | none                | `string` |
| ![](../assets/images/IconEmuera.webp)[`REDRAW`](./REDRAW.md)                   | `int`               | none     |
| ![](../assets/images/IconEmuera.webp)[`CURRENTREDRAW`](./REDRAW.md)            | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`PRINTCPERLINE`](./PRINTCPERLINE.md)     | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`PRINTCLENGTH`](./PRINTCLENGTH.md)       | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`LINEISEMPTY`](./LINEISEMPTY.md)         | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`BARSTR`](./BARSTR.md)                   | `int`, `int`, `int` | `string` |
| ![](../assets/images/IconEmuera.webp)[`MONEYSTR`](./MONEYSTR.md)               | `int`, `option`     | `string` |
| ![](../assets/images/IconEmuera.webp)[`SKIPDISP`](./SKIP_RELATE.md)            | `int`               | none     |
| ![](../assets/images/IconEmuera.webp)[`NOSKIP`](./SKIP_RELATE.md)              | none                | none     |
| ![](../assets/images/IconEmuera.webp)[`ENDNOSKIP`](./SKIP_RELATE.md)           | none                | none     |
| ![](../assets/images/IconEmuera.webp)[`ISSKIP`](./SKIP_RELATE.md)              | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MOUSESKIP`](./SKIP_RELATE.md)           | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MESSKIP`](./SKIP_RELATE.md)             | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`COLOR_FROMNAME`](./COLOR_FROM.md)       | `string`            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`COLOR_FROMRGB`](./COLOR_FROM.md)        | `int`, `int`, `int` | `string` |
| ![](../assets/images/IconEE.webp)[`SKIPLOG`](./SKIPLOG.md)                     | `int`               | `void`   |
| ![](../assets/images/IconEE.webp)[`GETDISPLAYLINE`](./GETDISPLAYLINE.md)       | `int`               | `string` |
| ![](../assets/images/Iconetc.webp)[`BITMAP_CACHE_ENABLE`](./BITMAP_CACHE_ENABLE.md)       | `int`               | `void` |


### String Manipulation and Reference

| Function name                                                       | Arguments                                         | Return   |
| :------------------------------------------------------------------ | :------------------------------------------------ | :------- |
| ![](../assets/images/IconEmuera.webp)[`TOUPPER`](./TOUPPER.md)      | `string`                                          | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOLOWER`](./TOUPPER.md)      | `string`                                          | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOHALF`](./TOUPPER.md)       | `string`                                          | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOFULL`](./TOUPPER.md)       | `string`                                          | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOSTR`](./TOSTR.md)          | `int`, `option`                                   | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOINT`](./TOINT.md)          | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`ISNUMERIC`](./TOINT.md)      | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLEN`](./STRLEN.md)        | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLENS`](./STRLEN.md)       | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLENFORM`](./STRLEN.md)    | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLENU`](./STRLEN.md)       | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLENSU`](./STRLEN.md)      | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLENFORMU`](./STRLEN.md)   | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SUBSTRING`](./SUBSTRING.md)  | `string`, `int`, `int`                            | `string` |
| ![](../assets/images/IconEmuera.webp)[`SUBSTRINGU`](./SUBSTRING.md) | `string`, `int`, `int`                            | `string` |
| ![](../assets/images/IconEmuera.webp)[`CHARATU`](./CHARATU.md)      | `string`, `int`                                   | `string` |
| ![](../assets/images/IconEmuera.webp)[`STRFIND`](./STRFIND.md)      | `string`, `string`(, `int`)                       | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRFINDU`](./STRFIND.md)     | `string`, `string`(, `int`)                       | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRCOUNT`](./STRCOUNT.md)    | `string`, `string`                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPLIT`](./SPLIT.md)          | `string`, `string`, `stringArray`                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRJOIN`](./SPLIT.md)        | `stringArray`(, `string`, `int`, `int`)           | `string` |
| ![](../assets/images/IconEmuera.webp)[`REPLACE`](./REPLACE.md)      | `string`, `string`, `string`                      | `string` |
| ![](../assets/images/IconEmuera.webp)[`ESCAPE`](./ESCAPE.md)        | `string`                                          | `string` |
| ![](../assets/images/IconEmuera.webp)[`UNICODE`](./UNICODE.md)      | `int`                                             | `string` |
| ![](../assets/images/IconEmuera.webp)[`ENCODETOUNI`](./UNICODE.md)  | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRFORM`](./STRFORM.md)      | `string`                                          | `string` |
| ![](../assets/images/IconEM.webp)[`REGEXPMATCH`](./REGEXPMATCH.md)  | `string`, `string`(, `int`)                       | `int`    |
|                                                                     | `string`, `string`, `ref` `int`, `ref` `string[]` | `int`    |

### Arithmetics

| Function name                                                             | Arguments                                    | Return   |
| :------------------------------------------------------------------------ | :------------------------------------------- | :------- |
| ![](../assets/images/Iconeramaker.webp)[`TIMES`](./TIMES.md)              | `int`, `float`                               | none     |
| ![](../assets/images/IconEmuera.webp)[`POWER`](./POWER.md)                | `integerVariable`, `int`, `int`              | `int`    |
|                                                                           | `int`, `int`                                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`ABS`](./ABS.md)                    | `int`                                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SIGN`](./ABS.md)                   | `int`                                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SQRT`](./SQRT.md)                  | `int`                                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBRT`](./MATH_EXTENSION.md)        | `int`                                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`LOG`](./MATH_EXTENSION.md)         | `int`                                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`LOG10`](./MATH_EXTENSION.md)       | `int`                                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`EXPOMENT`](./MATH_EXTENSION.md)    | `int`                                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETBIT`](./BIT_OPERATION.md)       | `int`, `int`                                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SETBIT`](./BIT_OPERATION.md)       | `integerVariable`, `int`(, `int`...)         | none     |
| ![](../assets/images/IconEmuera.webp)[`CLEARBIT`](./BIT_OPERATION.md)     | `integarVariable`, `int`(, `int`...)         | none     |
| ![](../assets/images/IconEmuera.webp)[`INVERTBIT`](./BIT_OPERATION.md)    | `integarVariable`, `int`(, `int`...)         | none     |
| ![](../assets/images/IconEmuera.webp)[`MAX`](./MAX.md)                    | `int`(, `int`...)                            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MIN`](./MAX.md)                    | `int`(, `int`...)                            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`LIMIT`](./MAX.md)                  | `int`, `int`, `int`                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`INRANGE`](./MAX.md)                | `int`, `int`, `int`                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SUMARRAY`](./SUMARRAY.md)          | `integerArray`(, `int`, `int`)               | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MATCH`](./MATCH.md)                | `array`, `any`, `int`, `int`                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MAXARRAY`](./MAXMINARRAY.md)       | `integerArray`, `int`, `int`                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MINARRAY`](./MAXMINARRAY.md)       | `integerArray`, `int`, `int`                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SUMCARRAY`](./CARRAY.md)           | `charaArray`(, `int`, `int`)                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CMATCH`](./CARRAY.md)              | `charaArray`, `any`(, `int`, `int`)          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MAXCARRAY`](./CARRAY.md)           | `charaArray`(, `int`, `int`)                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MINCARRAY`](./CARRAY.md)           | `charaArray`(, `int`, `int`)                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`INRANGEARRAY`](./INRANGEARRAY.md)  | `integerArray`, `int`, `int`(, `int`, `int`) | `int`    |
| ![](../assets/images/IconEmuera.webp)[`INRANGECARRAY`](./INRANGEARRAY.md) | `charaArray`, `int`, `int`(, `int`, `int`)   | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GROUPMATCH`](./GROUPCHECK.md)      | `any`, `any`...                              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`NOSAMES`](./GROUPCHECK.md)         | `any`, `any`...                              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`ALLSAMES`](./GROUPCHECK.md)        | `any`, `any`...                              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CONVERT`](./CONVERT.md)            | `int`, `int`                                 | `string` |

### Character operation/reference

| Function name                                                                                           | Arguments                              | Return |
| :------------------------------------------------------------------------------------------------------ | :------------------------------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`ADDCHARA`](./ADDCHARA.md) | `int`(, `int`,...)                     | none   |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`DELCHARA`](./DELCHARA.md) | `int`(, `int`,...)                     | none   |
| ![](../assets/images/IconEmuera.webp)[`SWAPCHARA`](./SWAPCHARA.md)                                      | `int`, `int`                           | none   |
| ![](../assets/images/IconEmuera.webp)[`SORTCHARA`](./SORTCHARA.md)                                      | `charaVariable`, `keyword`             | none   |
| ![](../assets/images/IconEmuera.webp)[`GETCHARA`](./GETCHARA.md)                                        | `int`                                  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`ADDDEFCHARA`](./ADDDEFCHARA.md)                                  | none                                   | none   |
| ![](../assets/images/IconEmuera.webp)[`ADDVOIDCHARA`](./ADDVOIDCHARA.md)                                | none                                   | none   |
| ![](../assets/images/IconEmuera.webp)[`DELALLCHARA`](./DELALLCHARA.md)                                  | none                                   | none   |
| ![](../assets/images/IconEmuera.webp)[`PICKUPCHARA`](./PICKUPCHARA.md)                                  | `int`(, `int`...)                      | none   |
| ![](../assets/images/IconEmuera.webp)[`EXISTCSV`](./EXISTCSV.md)                                        | `int`                                  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`FINDCHARA`](./FINDCHARA.md)                                      | `charaVariable`, `int`(, `int`, `int`) | `int`  |
| ![](../assets/images/IconEmuera.webp)[`FINDLASTCHARA`](./FINDCHARA.md)                                  | `charaVariable`, `int`(, `int`, `int`) | `int`  |
| ![](../assets/images/IconEmuera.webp)[`COPYCHARA`](./COPYCHARA.md)                                      | `int`, `int`                           | none   |
| ![](../assets/images/IconEmuera.webp)[`ADDCOPYCHARA`](./ADDCOPYCHARA.md)                                | `int`                                  | none   |

### Variable manipulation, variable reference, CSV reference

| Function name                                                              | Arguments                                     | Return   |
| :------------------------------------------------------------------------- | :-------------------------------------------- | :------- |
| ![](../assets/images/Iconeramaker.webp)[`UPCHECK`](./UPCHECK.md)           | none                                          | none     |
| ![](../assets/images/IconEmuera.webp)[`VARSIZE`](./VARSIZE.md)             | `variable`                                    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`VARSIZE()`](./VARSIZE.md)           | `variable`(, `dimension`)                     | `int`    |
| ![](../assets/images/IconEmuera.webp)[`RESETDATA`](./RESETDATA.md)         | none                                          | none     |
| ![](../assets/images/IconEmuera.webp)[`RESETGLOBAL`](./RESETGLOBAL.md)     | none                                          | none     |
| ![](../assets/images/IconEmuera.webp)[`RESET_STAIN`](./RESET_STAIN.md)     | `int`                                         | none     |
| ![](../assets/images/IconEmuera.webp)[`SWAP`](./SWAP.md)                   | `variable`, `variable`                        | none     |
| ![](../assets/images/IconEmuera.webp)[`CSVNAME`](./CSVNAME.md)             | `int`                                         | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVCALLNAME`](./CSVNAME.md)         | `int`                                         | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVNICKNAME`](./CSVNAME.md)         | `int`                                         | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVMASTERNAME`](./CSVNAME.md)       | `int`                                         | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVBASE`](./CSV_STATUS.md)          | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVCSTR`](./CSV_STATUS.md)          | `int`, `int`                                  | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVABL`](./CSV_STATUS.md)           | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVTALENT`](./CSV_STATUS.md)        | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVMARK`](./CSV_STATUS.md)          | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVEXP`](./CSV_STATUS.md)           | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVRELATION`](./CSV_STATUS.md)      | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVJUEL`](./CSV_STATUS.md)          | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVEQUIP`](./CSV_STATUS.md)         | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CFLAG`](./CSV_STATUS.md)            | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETNUM`](./GETNUM.md)               | `variable`, `string`                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETPALAMLV`](./GETPALAMLV.md)       | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETEXPLV`](./GETPALAMLV.md)         | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`FINDELEMENT`](./FINDELEMENT.md)     | `variable`, `value`(, `int`, `int`, `int`)    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`FINDLASTELEMENT`](./FINDELEMENT.md) | `variable`, `value`(, `int`, `int`, `int`)    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`VARSET`](./VARSET.md)               | `variable`(, `value`, `int`, `int`)           | none     |
| ![](../assets/images/IconEmuera.webp)[`CVARSET`](./CVARSET.md)             | `charaVariable`(, `int`, `int`, `int`, `int`) | none     |
| ![](../assets/images/IconEmuera.webp)[`ARRAYSHIFT`](./ARRAYSHIFT.md)       | `variable`, `int`, `value`(, `int`, `int`)    | none     |
| ![](../assets/images/IconEmuera.webp)[`ARRAYREMOVE`](./ARRAYREMOVE.md)     | `variable`, `int`, `int`                      | none     |
| ![](../assets/images/IconEmuera.webp)[`ARRAYSORT`](./ARRAYSORT.md)         | `variable`(, `sortFormat`, `int`, `int`)      | none     |
| ![](../assets/images/IconEmuera.webp)[`ARRAYCOPY`](./ARRAYCOPY.md)         | `varible`, `variable`                         | none     |
| ![](../assets/images/IconEmuera.webp)[`ARRAYMSORT`](./ARRAYMSORT.md)       | `variable`(, `variable`...)                   | none     |
| ![](../assets/images/IconEmuera.webp)[`CUPCHECK`](./CUPCHECK.md)           | `int`                                         | none     |
| ![](../assets/images/IconEM.webp)[`ISDEFINED`](./ISDEFINED.md)             | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`EXISTVAR`](./EXISTVAR.md)               | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCBEGINSWITH`](./ENUMFUNC.md)     | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCENDSWITH`](./ENUMFUNC.md)       | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCWITH`](./ENUMFUNC.md)           | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMVARBEGINSWITH`](./ENUMVAR.md)       | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMVARENDSWITH`](./ENUMVAR.md)         | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMVARWITH`](./ENUMVAR.md)             | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMMACROBEGINSWITH`](./ENUMMACRO.md)   | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMMACROENDSWITH`](./ENUMMACRO.md)     | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMMACROWITH`](./ENUMMACRO.md)         | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`GETVAR`](./GETSETVAR.md)                | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`GETVARS`](./GETSETVAR.md)               | `string`                                      | `string` |
| ![](../assets/images/IconEM.webp)[`SETVAR`](./GETSETVAR.md)                | `string`, `any`                               | `1`      |
| ![](../assets/images/IconEM.webp)[`VARSETEX`](./VARSETEX.md)               | `string`, `any`(, `int`, `int`, `int`)        | `1`      |
| ![](../assets/images/IconEM.webp)[`ARRAYMSORTEX`](./ARRAYMSORTEX.md)       | `string`, `ref` `string[]`(, `int`, `int`)    | `1`      |
|                                                                            | `ref` `int`, `ref` `string[]`(, `int`, `int`) | `1`      |
| ![](../assets/images/IconEE.webp)[`ERDNAME`](./ERDNAME.md)                 | `variable`, `int`(, `int`)                    | `string` |
| ![](../assets/images/Icondotnet.webp)[`VARI`](./VAR.md) | `string`(, `int`) | none   |
| ![](../assets/images/Icondotnet.webp)[`VARS`](./VAR.md) | `string`(, `int`) | none   |

### Save data operations

| Function name                                                                                       | Arguments                             | Return   |
| :-------------------------------------------------------------------------------------------------- | :------------------------------------ | :------- |
| ![](../assets/images/Iconeramaker.webp)[`PUTFORM`](./PUTFORM.md)                                    | `string`                              | none     |
| ![](../assets/images/IconEmuera.webp)[`SAVEDATA`](./SAVEDATA.md)                                    | `int`, `string`                       | none     |
| ![](../assets/images/IconEmuera.webp)[`LOADDATA`](./LOADDATA.md)                                    | `int`                                 | none     |
| ![](../assets/images/IconEmuera.webp)[`DELDATA`](./DELDATA.md)                                      | `int`                                 | none     |
| ![](../assets/images/IconEmuera.webp)[`CHKDATA`](./CHKDATA.md)                                      | `int`                                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SAVENOS`](./SAVENOS.md)                                      | `int`                                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SAVEGLOBAL`](./SAVEGLOBAL.md)                                | none                                  | none     |
| ![](../assets/images/IconEmuera.webp)[`LOADGLOBAL`](./LOADGLOBAL.md)                                | none                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEE.webp)[`OUTPUTLOG`](./OUTPUTLOG.md) | (`string`)                            | none     |
| ![](../assets/images/IconEmuera.webp)[`SAVECHARA`](./SAVECHARA.md)                                  | `string`, `string`, `int`(, `int`...) | none     |
| ![](../assets/images/IconEmuera.webp)[`LOADCHARA`](./LOADCHARA.md)                                  | `string`                              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CHKCHARADATA`](./CHKCHARADATA.md)                            | `string`                              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`FIND_CHARADATA`](./FIND_CHARADATA.md)                        | `string`                              | `int`    |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`SAVETEXT`](./SAVETEXT.md)   | `string`, `int`(, `int`, `int`)       | `int`    |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`LOADTEXT`](./LOADTEXT.md)   | `int`(, `int`, `int`)                 | `string` |

### Get date and time

| Function name                                                                | Arguments | Return          |
| :--------------------------------------------------------------------------- | :--- | :-------------- |
| ![](../assets/images/IconEmuera.webp)[`GETTIME`](./GETTIME.md)               | none | `int`, `string` |
| ![](../assets/images/IconEmuera.webp)[`GETTIME()`](./GETTIME.md)             | none | `int`           |
| ![](../assets/images/IconEmuera.webp)[`GETTIMES()`](./GETTIME.md)            | none | `string`        |
| ![](../assets/images/IconEmuera.webp)[`GETMILLISECOND`](./GETMILLISECOND.md) | none | `int`           |
| ![](../assets/images/IconEmuera.webp)[`GETSECOND`](./GETSECOND.md)           | none | `int`           |

### Input/Wait

| Function name                                                              | Arguments                                 | Return           |
| :------------------------------------------------------------------------- | :---------------------------------------- | :--------------- |
| ![](../assets/images/Iconeramaker.webp)[`INPUT`](./INPUT.md)               | (`int`, `int`, `int`)                     | `void`           |
| ![](../assets/images/Iconeramaker.webp)[`INPUTS`](./INPUT.md)              | (`int`, `int`, `int`)                     | `void`           |
| ![](../assets/images/Iconeramaker.webp)[`WAIT`](./WAIT.md)                 | none                                      | `void`           |
| ![](../assets/images/IconEmuera.webp)[`FORCEWAIT`](./FORCEWAIT.md)         | none                                      | none             |
| ![](../assets/images/IconEmuera.webp)[`TINPUT`](./TINPUT.md)               | `int`, `int`(, `int`, `string`, `int`)    | `int`            |
| ![](../assets/images/IconEmuera.webp)[`TINPUTS`](./TINPUT.md)              | `int`, `int`(, `int`, `string`, `int`)    | `string`         |
| ![](../assets/images/IconEmuera.webp)[`TWAIT`](./TWAIT.md)                 | `int`, `int`                              | none             |
| ![](../assets/images/IconEmuera.webp)[`ONEINPUT`](./ONEINPUT.md)           | `int`(, `int`)                            | `int`            |
| ![](../assets/images/IconEmuera.webp)[`ONEINPUTS`](./ONEINPUT.md)          | `string`(, `int`)                         | `string`         |
| ![](../assets/images/IconEmuera.webp)[`TONEINPUT`](./TONEINPUT.md)         | `int`, `int`(, `int`, `string`, `int`)    | `int`            |
| ![](../assets/images/IconEmuera.webp)[`TONEINPUTS`](./TONEINPUT.md)        | `int`, `string`(, `int`, `string`, `int`) | `string`         |
| ![](../assets/images/IconEmuera.webp)[`WAITANYKEY`](./WAITANYKEY.md)       | none                                      | none             |
| ![](../assets/images/IconEmuera.webp)[`INPUTMOUSEKEY`](./INPUTMOUSEKEY.md) | `int`                                     | `int`            |
| ![](../assets/images/IconEE.webp)[`INPUTANY`](./INPUTANY.md)               | none                                      | `int` / `string` |
| ![](../assets/images/IconEE.webp)[`BINPUT`](./BINPUT.md)                   | (`int`, `int`, `int`)                     | `int`            |
| ![](../assets/images/IconEE.webp)[`BINPUTS`](./BINPUT.md)                  | (`string`, `int`, `int`)                  | `string`         |

### Loop/branch syntax

| Function name                                                               | Arguments                                | Return |
| :-------------------------------------------------------------------------- | :--------------------------------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`(S)IF-ELSEIF-ELSE-ENDIF`](./IF.md) | `operand`                                | none   |
| ![](../assets/images/Iconeramaker.webp)[`REPEAT`](./REPEAT.md)              | `int`                                    | none   |
| ![](../assets/images/Iconeramaker.webp)[`REND`](./REPEAT.md)                | none                                     | none   |
| ![](../assets/images/Iconeramaker.webp)[`CONTINUE`](./CONTINUE.md)          | none                                     | none   |
| ![](../assets/images/Iconeramaker.webp)[`BREAK`](./CONTINUE.md)             | none                                     | none   |
| ![](../assets/images/IconEmuera.webp)[`FOR`](./FOR.md)                      | `integerVariable`, `int`, `int`(, `int`) | none   |
| ![](../assets/images/IconEmuera.webp)[`NEXT`](./FOR.md)                     | none                                     | none   |
| ![](../assets/images/IconEmuera.webp)[`WHILE`](./WHILE.md)                  | `int`                                    | none   |
| ![](../assets/images/IconEmuera.webp)[`WEND`](./WHILE.md)                   | none                                     | none   |
| ![](../assets/images/IconEmuera.webp)[`DO`](./DO.md)                        | none                                     | none   |
| ![](../assets/images/IconEmuera.webp)[`LOOP`](./DO.md)                      | `int`                                    | none   |
| ![](../assets/images/IconEmuera.webp)[`SELECTCASE`](./SELECTCASE.md)        | `any`                                    | none   |
| ![](../assets/images/IconEmuera.webp)[`CASE`](./SELECTCASE.md)              | `any`                                    | none   |
| ![](../assets/images/IconEmuera.webp)[`CASEELSE`](./SELECTCASE.md)          | none                                     | none   |
| ![](../assets/images/IconEmuera.webp)[`ENDSELECT`](./SELECTCASE.md)         | none                                     | none   |

### Random Number Control

| Function name                                                      | Arguments  | Return |
| :----------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`RANDOMIZE`](./RANDOMIZE.md) | `int` | none   |
| ![](../assets/images/IconEmuera.webp)[`DUMPRAND`](./RANDOMIZE.md)  | none  | none   |
| ![](../assets/images/IconEmuera.webp)[`INITRAND`](./RANDOMIZE.md)  | none  | none   |

### Debugging aids and system flow control

| Function name                                                                            | Arguments             |
| :--------------------------------------------------------------------------------------- | :-------------------- |
| ![](../assets/images/Iconeramaker.webp)[`SAVEGAME`](./SAVEGAME.md)                       | none                  |
| ![](../assets/images/Iconeramaker.webp)[`LOADGAME`](./SAVEGAME.md)                       | none                  |
| ![](../assets/images/Iconeramaker.webp)[`BEGIN`](./BEGIN.md)                             | `idenetifier`         |
| ![](../assets/images/Iconeramaker.webp)[`QUIT`](./QUIT.md)                               | none                  |
| ![](../assets/images/IconEmuera.webp)[`CALLTRAIN`](./CALLTRAIN.md)                       | `int`                 |
| ![](../assets/images/IconEmuera.webp)[`DOTRAIN`](./DOTRAIN.md)                           | `int`                 |
| ![](../assets/images/IconEmuera.webp)[`THROW`](./THROW.md)                               | `string`              |
| ![](../assets/images/IconEE.webp)[`QUIT_AND_RESTART`](./QUIT_AND_RESTART.md)             | none                  |
| ![](../assets/images/IconEE.webp)[`FORCE_QUIT`](./FORCE_QUIT.md)                         | none                  |
| ![](../assets/images/IconEE.webp)[`FORCE_QUIT_AND_RESTART`](./FORCE_QUIT_AND_RESTART.md) | none                  |
| ![](../assets/images/IconEE.webp)[`FORCE_BEGIN`](./FORCE_BEGIN.md)                       | `identifier`          |
| ![](../assets/images/IconEE.webp)[`FLOWINPUT`](./FLOWINPUT.md)                           | `int`(, `int`, `int`) |

### Functions (CALL, etc.)

| Function name                                                          | Arguments                  | Return |
| :--------------------------------------------------------------------- | :------------------------- | :---- |
| ![](../assets/images/Iconeramaker.webp)[`CALL`](./CALL.md)             | `functionName`             | none  |
| ![](../assets/images/Iconeramaker.webp)[`JUMP`](./JUMP.md)             | `functionName`             | none  |
| ![](../assets/images/Iconeramaker.webp)[`GOTO`](./GOTO.md)             | `labelName`                | none  |
| ![](../assets/images/Iconeramaker.webp)[`RESTART`](./RESTART.md)       | none                       | none  |
| ![](../assets/images/IconEmuera.webp)[`TRYCALL`](./TRY.md)             | `functionName`(, `any`...) | none  |
| ![](../assets/images/IconEmuera.webp)[`TRYJUMP`](./TRY.md)             | `functionName`(, `any`...) | none  |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTO`](./TRY.md)             | `labelName`                | none  |
| ![](../assets/images/IconEmuera.webp)[`CALLFORM`](./FORM.md)           | `functionName`(, `any`...) | none  |
| ![](../assets/images/IconEmuera.webp)[`JUMPFORM`](./FORM.md)           | `functionName`(, `any`...) | none  |
| ![](../assets/images/IconEmuera.webp)[`GOTOFORM`](./FORM.md)           | `labelName`                | none  |
| ![](../assets/images/IconEmuera.webp)[`TRYCALLFORM`](./TRYFORM.md)     | `formedString`(, `any`...) | none  |
| ![](../assets/images/IconEmuera.webp)[`TRYJUMPFORM`](./TRYFORM.md)     | `formedString`(, `any`...) | none  |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTOFORM`](./TRYFORM.md)     | `formedString`             | none  |
| ![](../assets/images/IconEmuera.webp)[`CALLF`](./CALLF.md)             | `functionName`             | none  |
| ![](../assets/images/IconEmuera.webp)[`CALLFORMF`](./CALLF.md)         | `formedString`             | none  |
| ![](../assets/images/IconEmuera.webp)[`CALLEVENT`](./CALLEVENT.md)     | `functionName`             | none  |
| ![](../assets/images/IconEmuera.webp)[`TRYCCALL`](./TRYC.md)           | `functionName`(, `any`...) | none  |
| ![](../assets/images/IconEmuera.webp)[`TRYCJUMP`](./TRYC.md)           | `functionName`(, `any`...) | none  |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTO`](./TRYC.md)            | `labelName`                | none  |
| ![](../assets/images/IconEmuera.webp)[`TRYCCALLFORM`](./TRYC.md)       | `functionName`(, `any`...) | none  |
| ![](../assets/images/IconEmuera.webp)[`TRYCCALLFORM`](./TRYC.md)       | `functionName`(, `any`...) | none  |
| ![](../assets/images/IconEmuera.webp)[`TRYCGOTOFORM`](./TRYC.md)       | `labelName`                | none  |
| ![](../assets/images/IconEmuera.webp)[`CATCH`](./TRYC.md)              | none                       | none  |
| ![](../assets/images/IconEmuera.webp)[`ENDCATCH`](./TRYC.md)           | none                       | none  |
| ![](../assets/images/IconEmuera.webp)[`TRYCALLLIST`](./TRYLIST.md)     | none                       | none  |
| ![](../assets/images/IconEmuera.webp)[`TRYJUMPLIST`](./TRYLIST.md)     | none                       | none  |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTOLIST`](./TRYLIST.md)     | none                       | none  |
| ![](../assets/images/IconEmuera.webp)[`FUNC`](./TRYLIST.md)            | `functionName`(, `any`...) | none  |
| ![](../assets/images/IconEmuera.webp)[`ENDFUNC`](./TRYLIST.md)         | none                       | none  |
| ![](../assets/images/IconEE.webp)[`EXISTFUNCTION`](./EXISTFUNCTION.md) | `string`                   | `int` |
| ![](../assets/images/IconEE.webp)[`TRYCALLF`](./TRYCALLF.md)           | `functionName`             | none  |
| ![](../assets/images/IconEE.webp)[`TRYCALLFORMF`](./TRYCALLFORMF.md)   | `formedString`             | none  |
| ![](../assets/images/Iconetc.webp)[`CALLSHARP`](./CALLSHARP.md)        | `functionName`             |       |
| ![](../assets/images/Iconetc.webp)[`EXISTMETH`](./EXISTMETH.md)        | `functionName`             | `int` |
| ![](../assets/images/Iconetc.webp)[`GETMETH`](./GETMETH.md)            | `string`(, `int`, `argument`...)   | `int`     |
| ![](../assets/images/Iconetc.webp)[`GETMETHS`](./GETMETH.md)           | `string`(, `string`, `argument`...)| `string`  |

### RETURN related

| Function name                                                                                       | Arguments               | Return                     |
| :-------------------------------------------------------------------------------------------------- | :---------------------- | :------------------------- |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`RETURN`](./RETURN.md) | `int`(, `int`,...)      | `Same as arguments`               |
| ![](../assets/images/IconEmuera.webp)[`RETURNFORM`](./RETURN.md)                                    | `string`(, `string`,...) | `Same as arguments (converted to numeric type)` |
| ![](../assets/images/IconEmuera.webp)[`RETURNF`](../Emuera/user_defined_in_expression_function.md)  | `any`                   | `Same as arguments`               |

### DEBUG related

| Function name                                                             | Arguments      | Return |
| :------------------------------------------------------------------------ | :------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINT`](./DEBUGPRINT.md)      | `string`       | none   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTL`](./DEBUGPRINT.md)     | `string`       | none   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTFORM`](./DEBUGPRINT.md)  | `formedString` | none   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTFORML`](./DEBUGPRINT.md) | `formedString` | none   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGCLEAR`](./DEBUGPRINT.md)      | none           | none   |
| ![](../assets/images/IconEmuera.webp)[`ASSERT`](./ASSERT.md)              | `int`          | none   |

### Tooltip related

| Function name                                                                    | Arguments    |
| :------------------------------------------------------------------------------- | :----------- |
| ![](../assets/images/IconEmuera.webp)[`TOOLTIP_SETCOLOR`](./TOOLTIP_SETCOLOR.md) | `int`, `int` |
| ![](../assets/images/IconEmuera.webp)[`TOOLTIP_SETDELAY`](./TOOLTIP_SET.md)      | `int`        |
| ![](../assets/images/IconEmuera.webp)[`TOOLTIP_SETDURATION`](./TOOLTIP_SET.md)   | `int`        |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_CUSTOM`](./TOOLTIP_EXTENSION.md)      | `int`        |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_SETFONT`](./TOOLTIP_EXTENSION.md)     | `string`     |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_SETFONTSIZE`](./TOOLTIP_EXTENSION.md) | `int`        |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_FORMAT`](./TOOLTIP_EXTENSION.md)      | `int`        |

### HTML related

| Function name                                                                            | Arguments                                       | Return          |
| :--------------------------------------------------------------------------------------- | :---------------------------------------------- | :-------------- |
| ![](../assets/images/IconEmuera.webp)[`HTML_PRINT`](./HTML_PRINT.md)                     | `string`                                        | none            |
| ![](../assets/images/IconEmuera.webp)[`HTML_TAGSPLIT`](./HTML_TAGSPLIT.md)               | `string`(, `integerVariable`, `stringVariable`) | `int`, `string` |
| ![](../assets/images/IconEmuera.webp)[`HTML_POPPRINTINGSTR`](./HTML_POPPRINTINGSTR.md)   | none                                            | `string`        |
| ![](../assets/images/IconEmuera.webp)[`HTML_GETPRINTEDSTR`](./HTML_GETPRINTEDSTR.md)     | `int`                                           | `string`        |
| ![](../assets/images/IconEmuera.webp)[`HTML_ESCAPE`](./HTML_ESCAPE.md)                   | `string`                                        | `string`        |
| ![](../assets/images/IconEmuera.webp)[`HTML_TOPLAINTEXT`](./HTML_TOPLAINTEXT.md)         | `string`                                        | `string`        |
| ![](../assets/images/IconEM.webp)[`HTML_STRINGLEN`](./HTML_STRINGLEN.md)                 | `string`(, `int`)                               | `int`           |
| ![](../assets/images/IconEM.webp)[`HTML_SUBSTRING`](./HTML_SUBSTRING.md)                 | `string`, `int`                                 | `string`        |
| ![](../assets/images/IconEM.webp)[`HTML_STRINGLINES`](./HTML_STRINGLINES.md)             | `string`, `int`                                 | `string`        |
| ![](../assets/images/Icondotnet.webp)[`HTML_PRINT_ISLAND`](./HTML_PRINT_ISLAND.md)       | `string`                                        | none            |
| ![](../assets/images/Icondotnet.webp)[`HTML_PRINT_ISLAND_CLEAR`](./HTML_PRINT_ISLAND.md) | `string`                                        | none            |

### AWAIT related

| Function name                                                         | Arguments | Return   |
| :-------------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`AWAIT`](./AWAIT.md)            | `int`     | none     |
| ![](../assets/images/IconEmuera.webp)[`GETKEY`](./GETKEY.md)          | `keyCode` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETKEYTRIGGERED`](./GETKEY.md) | `keyCode` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MOUSEX`](./MOUSEXY.md)         | none      | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MOUSEY`](./MOUSEXY.md)         | none      | `int`    |
| ![](../assets/images/IconEmuera.webp)[`ISACTIVE`](./ISACTIVE.md)      | none      | `int`    |
| ![](../assets/images/IconEE.webp)[`MOUSEB`](./MOUSEB.md)              | none      | `string` |

### Image processing related

<details>
<summary>About image processing related commands</summary>

These are image processing commands. <br>
Graphics commands beginning with G are commands for manipulating the resizable drawing area. <br>
To use G commands, you must specify GRAPHICS or TEXTRENDERER as the drawing method. <br>
If WINAPI is specified as the drawing method, G commands cannot be used and an error will occur. <br>
Sprite commands beginning with SPRITE are commands related to sprites. <br>
Sprites can also be displayed inline with the PRINT_IMG command, just like resources declared in the resources folder. <br>
ClientBackground commands beginning with CBG are commands related to the background image of the client area. <br>
<br>
Please note that the color specification in image processing commands is not RGB but ARGB format including alpha value (opacity). <br>
The ARGB type is expressed in hexadecimal as 0xAARRGGBB. <br>
<br>
Most image processing commands can also be called as functions in expressions. <br>
When called as a function, the result value is not assigned to `RESULT` but becomes the return value. <br>

</details>

| Function name                                                                          | Arguments                                                                               | Return   |
| :------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`GCREATE`](./GCREATE.md)                         | `int`, `int`, `int`                                                                     | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GCREATEFROMFILE`](./GCREATEFROMFILE.md)         | `int`, `string`                                                                         | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GDISPOSE`](./GDISPOSE.md)                       | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GCLEAR`](./GCLEAR.md)                           | `int`, `int`                                                                            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GFILLRECTANGLE`](./GFILLRECTANGLE.md)           | `int`, `int`, `int`, `int`, `int`                                                       | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GDRAWG`](./GDRAWG.md)                           | `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`                    | `int`    |
|                                                                                        | `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `integerVariable` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GDRAWGWITHMASK`](./GDRAWGWITHMASK.md)           | `int`, `int`, `int`, `int`, `int`                                                       | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GDRAWSPRITE`](./GDRAWSPRITE.md)                 | `int`, `string`                                                                         | `int`    |
|                                                                                        | `int`, `string`, `int`, `int`                                                           | `int`    |
|                                                                                        | `int`, `string`, `int`, `int`, `int`, `int`                                             | `int`    |
|                                                                                        | `int`, `string`, `int`, `int`, `int`, `int`, `integerVariable`                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GSETCOLOR`](./GSETCOLOR.md)                     | `int`, `int`, `int`, `int`                                                              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GSETBRUSH`](./GSETBRUSH.md)                     | `int`, `int`                                                                            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GSETFONT`](./GSETFONT.md)                       | `int`, `string`, `string`(, `int`)                                                      | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GSETPEN`](./GSETPEN.md)                         | `int`, `int`, `int`                                                                     | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GCREATED`](./GCREATED.md)                       | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GWIDTH`](./GWIDTHHEIGHT.md)                     | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GHEIGHT`](./GWIDTHHEIGHT.md)                    | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GGETCOLOR`](./GGETCOLOR.md)                     | `int`, `int`, `int`                                                                     | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GSAVE`](./GSAVELOAD.md)                         | `int`, `int`                                                                            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GLOAD`](./GSAVELOAD.md)                         | `int`, `int`                                                                            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITECREATE`](./SPRITECREATE.md)               | `string`, `int`                                                                         | `int`    |
|                                                                                        | `string`, `int`, `int`, `int`, `int`, `int`                                             | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEANIMECREATE`](./SPRITEANIMECREATE.md)     | `string`, `int`, `int`                                                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEANIMEADDFRAME`](./SPRITEANIMEADDFRAME.md) | `string`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEDISPOSE`](./SPRITEDISPOSE.md)             | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEGETCOLOR`](./SPRITEGETCOLOR.md)           | `string`, `int`, `int`                                                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITECREATED`](./SPRITECREATED.md)             | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEWIDTH`](./SPRITEWIDTHHEIGHT.md)           | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEHEIGHT`](./SPRITEWIDTHHEIGHT.md)          | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEWIDTH`](./SPRITEWIDTHHEIGHT.md)           | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEHEIGHT`](./SPRITEWIDTHHEIGHT.md)          | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEPOSX`](./SPRITEPOSXY.md)                  | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEPOSY`](./SPRITEPOSXY.md)                  | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITESETPOS`](./SPRITESETPOS.md)               | `string`, `int`, `int`                                                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEMOVE`](./SPRITEMOVE.md)                   | `string`, `int`, `int`                                                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGSETG`](./CBGSETG.md)                         | `int`, `int`, `int`, `int`                                                              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGSETSPRITE`](./CBGSETSPRITE.md)               | `string`, `int`, `int`, `int`                                                           | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGSETBMAPG`](./CBGSETBMAPG.md)                 | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGSETBUTTONSPRITE`](./CBGSETBUTTONSPRITE.md)   | `int`, `string`, `string`, `int`, `int`, `zDepth`                                       | `int`    |
|                                                                                        | `int`, `string`, `string`, `int`, `int`, `zDepth`, `string`                             | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGCLEAR`](./CBGCLEAR.md)                       | none                                                                                    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGREMOVEMAPB`](./CBGREMOVEMAPB.md)             | none                                                                                    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGCLEARBUTTON`](./CBGCLEARBUTTON.md)           | none                                                                                    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGREMOVERANGE`](./CBGREMOVERANGE.md)           | `int`, `int`                                                                            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SETANIMETIMER`](./SETANIMETIMER.md)             | `int`                                                                                   | none     |
| ![](../assets/images/IconEE.webp)[`GDRAWTEXT`](./GDRAWTEXT.md)                         | `int`, `string`(, `int`, `int`)                                                         | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETFONT`](./GGETFONT.md)                           | `int`                                                                                   | `string` |
| ![](../assets/images/IconEE.webp)[`GGETFONTSIZE`](./GGETFONTSIZE.md)                   | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETFONTSTYLE`](./GGETFONTSTYLE.md)                 | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETTEXTSIZE`](./GGETTEXTSIZE.md)                   | `string`, `string`, `int`(, `int`)                                                      | `int`    |
| ![](../assets/images/IconEE.webp)[`GDRAWGWITHROTATE`](./GDRAWGWITHROTATE.md)           | `int`, `int`, `int`(, `int`, `int`)                                                     | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETPEN`](./GGETPEN.md)                             | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETPENWIDTH`](./GGETPENWIDTH.md)                   | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETBRUSH`](./GGETBRUSH.md)                         | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEE.webp)[`SPRITEDISPOSEALL`](./SPRITEDISPOSEALL.md)           | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEE.webp)[`GDRAWLINE`](./GDRAWLINE.md)                         | `int`, `int`, `int`, `int`, `int`                                                       | `int`    |
| ![](../assets/images/IconEE.webp)[`GDASHSTYLE`](./GDASHSTYLE.md)                       | `int`, `int`, `int`                                                                     | `int`    |
| ![](../assets/images/Iconetc.webp)[`SETBGIMAGE`](./BACKGROUND.md)                      | `string`(, `int`, `int`)                                                                | none     |
| ![](../assets/images/Iconetc.webp)[`REMOVEBGIMAGE`](./BACKGROUND.md)                   | `string`                                                                                | none     |
| ![](../assets/images/Iconetc.webp)[`CLEARBGIMAGE`](./BACKGROUND.md)                    | none                                                                                    | none     |

### Sound related

| Function name                                                            | Arguments| Return |
| :----------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEE.webp)[`PLAYSOUND`](./PLAYSOUND.md)           | `string` | none   |
| ![](../assets/images/IconEE.webp)[`STOPSOUND`](./STOPSOUND.md)           | none     | none   |
| ![](../assets/images/IconEE.webp)[`PLAYBGM`](./PLAYBGM.md)               | `string` | none   |
| ![](../assets/images/IconEE.webp)[`STOPBGM`](./STOPBGM.md)               | none     | none   |
| ![](../assets/images/IconEE.webp)[`EXISTSOUND`](./EXISTSOUND.md)         | `string` | `int`  |
| ![](../assets/images/IconEE.webp)[`SETSOUNDVOLUME`](./SETSOUNDVOLUME.md) | `int`    | none   |
| ![](../assets/images/IconEE.webp)[`SETBGMVOLUME`](./SETBGMVOLUME.md)     | `int`    | none   |

### XML related

| Function name                                                                             | Arguments                                                    | Return   |
| :---------------------------------------------------------------------------------------- | :----------------------------------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`XML_DOCUMENT`](./XML_MANAGE.md)                        | `any`, `string`                                              | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_RELEASE`](./XML_MANAGE.md)                         | `any`                                                        | `1`      |
| ![](../assets/images/IconEM.webp)[`XML_EXIST`](./XML_MANAGE.md)                           | `any`                                                        | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_GET`](./XML_GET.md)                                | `any`, `string`(, `int`, `int`)                              | `int`    |
|                                                                                           | `any`, `string`, `ref` `string[]`(, `int`)                   | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_GET_BYNAME`](./XML_GET.md)                         | `string`, `string`(, `int`, `int`)                           | `int`    |
|                                                                                           | `string`, `string`, `ref` `string[]`(, `int`)                | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_SET`](./XML_SET.md)                                | `int`, `string`, `string`(, `int`, `int`)                    | `int`    |
|                                                                                           | `ref` `string`, `string`, `string`(, `int`, `int`)           | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_SET_BYNAME`](./XML_SET.md)                         | `string`, `string`, `string`(, `int`, `int`)                 | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_TOSTR`](./XML_TOSTR.md)                            | `any`                                                        | `string` |
| ![](../assets/images/IconEM.webp)[`XML_ADDNODE`](./XML_ADDNODE.md)                        | `int`, `string`, `string`(, `int`, `int`)                    | `int`    |
|                                                                                           | `ref` `string`, `string`, `string`(, `int`, `int`)           | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_ADDNODE_BYNAME`](./XML_ADDNODE.md)                 | `string`, `string`, `string`(, `int`, `int`)                 | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVENODE`](./XML_REMOVENODE.md)                  | `int`, `string`(, `int`)                                     | `int`    |
|                                                                                           | `ref` `string`, `string`(, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVENODE_BYNAME`](./XML_REMOVENODE.md)           | `string`, `string`(, `int`)                                  | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REPLACE`](./XML_REPLACE.md)                        | `int`, `string`                                              | `int`    |
|                                                                                           | `int`, `string`, `string`(, `int`)                           | `int`    |
|                                                                                           | `ref` `string`, `string`, `string`(, `int`)                  | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REPLACE_BYNAME`](./XML_REPLACE.md)                 | `string`, `string`, `string`(, `int`)                        | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_ADDATTRIBUTE`](./XML_ADDATTRIBUTE.md)              | `int`, `string`, `string`(, `string`, `int`, `int`)          | `int`    |
|                                                                                           | `ref` `string`, `string`, `string`(, `string`, `int`, `int`) | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_ADDATTRIBUTE_BYNAME`](./XML_ADDATTRIBUTE.md)       | `string`, `string`, `string`(, `string`, `int`, `int`)       | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVEATTRIBUTE`](./XML_REMOVEATTRIBUTE.md)        | `int`, `string`(, `int`)                                     | `int`    |
|                                                                                           | `ref` `string`, `string`(, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVEATTRIBUTE_BYNAME`](./XML_REMOVEATTRIBUTE.md) | `string`, `string`(, `int`)                                  | `int`    |

### MAP (associative array) related

| Function name                                                            | Arguments                         | Return   |
| :----------------------------------------------------------------------- | :-------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`MAP_CREATE`](./MAP_MANAGE.md)         | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_EXIST`](./MAP_MANAGE.md)          | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_RELEASE`](./MAP_MANAGE.md)        | `string`                          | `1`      |
| ![](../assets/images/IconEM.webp)[`MAP_GET`](./MAP_OPERATION.md)         | `string`, `string`                | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_HAS`](./MAP_OPERATION.md)         | `string`, `string`                | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_SET`](./MAP_OPERATION.md)         | `string`, `string`, `string`      | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_REMOVE`](./MAP_OPERATION.md)      | `string`, `string`                | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_SIZE`](./MAP_OPERATION.md)        | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_CLEAR`](./MAP_OPERATION.md)       | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_GETKEYS`](./MAP_GETKEYS.md)       | `string`                          | `string` |
|                                                                          | `string`, `int`                   | `string` |
|                                                                          | `string`, `ref` `string[]`, `int` | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_TOXML`](./MAP_SERIALIZATION.md)   | `string`                          | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_FROMXML`](./MAP_SERIALIZATION.md) | `string`, `string`                | `int`    |

### DataTable （database） related

| Function name                                                          | Arguments                                                     | Return   |
| :--------------------------------------------------------------------- | :------------------------------------------------------------ | :------- |
| ![](../assets/images/IconEM.webp)[`DT_CREATE`](./DT_MANAGE.md)         | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_EXIST`](./DT_MANAGE.md)          | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_RELEASE`](./DT_MANAGE.md)        | `string`                                                      | `1`      |
| ![](../assets/images/IconEM.webp)[`DT_CLEAR`](./DT_MANAGE.md)          | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_NOCASE`](./DT_MANAGE.md)         | `string`, `int`                                               | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_ADD`](./DT_COLUMN.md)     | `string`, `string`(, `any`, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_EXIST`](./DT_COLUMN.md)   | `string`, `string`                                            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_REMOVE`](./DT_COLUMN.md)  | `string`, `string`                                            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_LENGTH`](./DT_COLUMN.md)  | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_OPTIONS`](./DT_COLUMN.md) | `string`, `string`, `keyword`, `any`([,`keyword`, `any`] ...) | none     |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_NAMES`](./DT_COLUMN.md)   | `string`(, `ref` `string[]`)                                  | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_ROW_ADD`](./DT_ROW.md)           | `string`([, `string`, `any`] ...)                             | `int`    |
|                                                                        | `string`, `ref` `string[]`, `ref` `any[]`, `int`              | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_ROW_SET`](./DT_ROW.md)           | `string`, `int`, `string`, `any`([, `string`, `any`] ...)     | `int`    |
|                                                                        | `string`, `int`, `ref` `string[]`, `ref` `any[]`, `int`       | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_ROW_REMOVE`](./DT_ROW.md)        | `string`, `int`                                               | `int`    |
|                                                                        | `string`, `ref` `int[]`, `int`                                | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_ROW_LENGTH`](./DT_ROW.md)        | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_CELL_GET`](./DT_CELL.md)         | `string`, `int`, `string`(, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_CELL_GETS`](./DT_CELL.md)        | `string`, `int`, `string`(, `int`)                            | `string` |
| ![](../assets/images/IconEM.webp)[`DT_CELL_ISNULL`](./DT_CELL.md)      | `string`, `int`, `string`(, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_CELL_SET`](./DT_CELL.md)         | `string`, `int`, `string`(, `any`, `int`)                     | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_SELECT`](./DT_SELECT.md)         | `string`(, `string`, `string`, `ref` `int[]`)                 | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_TOXML`](./DT_SERIALIZATION.md)   | `string`(, `ref` `string`)                                    | `string` |
| ![](../assets/images/IconEM.webp)[`DT_FROMXML`](./DT_SERIALIZATION.md) | `string`, `string`, `string`                                  | `int`    |

### Others

| Function name                                                              | Arguments                   | Return   |
| :------------------------------------------------------------------------- | :-------------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`RAND`](./RAND.md)                   | `int`(, `int`)              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CLEARTEXTBOX`](./CLEARTEXTBOX.md)   | none                        | none     |
| ![](../assets/images/IconEmuera.webp)[`STRDATA`](./STRDATA.md)             | `stringVariable`            | none     |
| ![](../assets/images/IconEmuera.webp)[`STOPCALLTRAIN`](./STOPCALLTRAIN.md) | none                        | none     |
| ![](../assets/images/IconEmuera.webp)[`GETCONFIG`](./GETCONFIG.md)         | `string`                    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETCONFIGS`](./GETCONFIG.md)        | `string`                    | `string` |
| ![](../assets/images/IconEmuera.webp)[`CLIENTWIDTH`](./CLIENTFIELD.md)     | none                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CLIENTHEIGHT`](./CLIENTFIELD.md)    | none                        | `int`    |
| ![](../assets/images/IconEM.webp)[`EXISTFILE`](./EXISTFILE.md)             | `string`                    | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFILES`](./ENUMFILES.md)             | `string`(, `string`, `int`) | `int`    |
| ![](../assets/images/IconEE.webp)[`UPDATECHECK`](./UPDATECHECK.md)         | none                        | none     |
| ![](../assets/images/IconEE.webp)[`GETMEMORYUSAGE`](./GETMEMORYUSAGE.md)   | none                        | `int`    |
| ![](../assets/images/IconEE.webp)[`CLEARMEMORY`](./CLEARMEMORY.md)         | none                        | `int`    |
| ![](../assets/images/IconEE.webp)[`SETTEXTBOX`](./TEXTBOX.md)              | `string`                    | `1`      |
| ![](../assets/images/IconEE.webp)[`GETTEXTBOX`](./TEXTBOX.md)              | none                        | `string` |
| ![](../assets/images/IconEM.webp)[`MOVETEXTBOX`](./TEXTBOX.md)             | `int`, `int`, `int`         | `1`      |
| ![](../assets/images/IconEM.webp)[`RESUMETEXTBOX`](./TEXTBOX.md)           | none                        | `1`      |


---

# REDRAW.en
---
---
hide:
  - toc
---

# REDRAW, CURRENTREDRAW

| Function name                                                          | Arguments | Return |
| :-------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`REDRAW`](./REDRAW.md)         | `int`| none   |
| ![](../assets/images/IconEmuera.webp)[`CURRENTREDRAW`](./REDRAW.md) | none | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	REDRAW int
	int CURRENTREDRAW
    ```
	Drawing control command.  
	Specifying `0` for the argument causes drawing to occur only when user input is required.  
	Specifying `1` for the argument causes normal drawing at the timing specified by [config `frames per second`](../Emuera/config.md#_16).  
	Adding `2` to the argument (such as `REDRAW 2` or `REDRAW 3`) has the above effects plus forces drawing immediately when the `REDRAW` command is executed.  
	The current `REDRAW` state (`0` or `1`) can be obtained with `CURRENTREDRAW`.


!!! hint "Hint"

    `CURRENTREDRAW` is supported as an expression function.


---

# REGEXPMATCH.en
---
---
hide:
  - toc
---

# REGEXPMATCH

| Function name                                                         | Arguments                                            | Return |
| :------------------------------------------------------------------- | :-------------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`REGEXPMATCH`](./REGEXPMATCH.md)   | `string`, `string`(, `int`)                         | `int`  |
|                                                                        | `string`, `string`, `ref` `int`, `ref` `string[]`   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int REGEXPMATCH str, pattern(, output)
    2. int REGEXPMATCH str, pattern, ref groupCount, ref matches
    ```
    
    Returns the number of matches if `str` matches the regex pattern `pattern`. Returns 0 if no match.  
    
    1. If `output` is a non-zero integer (default is `0`), assigns the number of match groups to `RESULT:1` and each match result to `RESULTS` (total: "groupCount" × "returnValue").  
    
    2. Assigns the number of match groups to `groupCount` and each match result to `matches` (total: "groupCount" × "returnValue").  

!!! hint "Hint"

    Supported as both command and expression function.

!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM groupCount
        #DIMS matches, 10
        #DIM i
        #DIM j
        #DIM count

        REGEXPMATCH "Apple Banana Car", "(.{2})\\b"
        PRINTFORML Number of matches:{RESULT}
        count = REGEXPMATCH("Apple Banana Car", ".(.{2})\\b", groupCount, matches)
        PRINTFORML Number of matches:{count} Group count:{groupCount}
        FOR i, 0, count
            PRINTFORML Result {i+1}:
            FOR j, 0, groupCount
                PRINTFORM Group {j}:%matches:(i*groupCount+j)% 
            NEXT
            PRINTL
        NEXT
        
        ONEINPUT
        
    ``` 
    ``` title="Result"
    Number of matches:3
    Number of matches:3 Group count:2
    Result 1:
    Group 0:ple Group 1:le 
    Result 2:
    Group 0:ana Group 1:na 
    Result 3:
    Group 0:Car Group 1:ar 
    ```


---

# REPEAT.en
---
---
hide:
  - toc
---

# REPEAT-REND

| Function name                                                   | Arguments | Return |
| :------------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`REPEAT`](./REPEAT.md) | `int` | none   |
| ![](../assets/images/Iconeramaker.webp)[`REND`](./REPEAT.md)   | none  | none   |

!!! info "API"

    ```  { #language-erbapi }
	REPEAT loopCount
	REND
    ```
    The code between `REPEAT` and `REND` loops the number of times specified by the argument. The loop count is stored in the `COUNT` variable.  
	When [`CONTINUE`](./CONTINUE.md) is executed, it returns to the `REPEAT` line and increments the `COUNT` variable by 1.  
	When [`BREAK`](./CONTINUE.md) is executed, it terminates the loop and proceeds to the `REND` line.


!!! hint "Hint"

    Commands only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		REPEAT 5
			SIF COUNT == 2
				CONTINUE
			SIF COUNT == 4
				BREAK
			PRINTFORML {COUNT}
		REND
		PRINTFORMW {COUNT}
    ``` 
    ``` title="Result"
	0
	1
	3
	5
    ```

### See Also
- [FOR-NEXT](FOR.md)
- [WHILE_WEND](WHILE.md)
- [CONTINUE,BREAK](CONTINUE.md)


---

# REPLACE.en
---
---
hide:
  - toc
---

# REPLACE

| Function name                                                   | Arguments                       | Return   |
| :------------------------------------------------------------- | :----------------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`REPLACE`](./REPLACE.md) | `string`, `string`, `string`  | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string REPLACE string, searchWord, replaceWord
    ```
	Searches the target string for the replacement pattern, and if a match is found, replaces it with the replacement string.  
	The internal processing uses regular expressions. The second argument follows C# regular expression specifications.  
	Therefore, characters used in regular expressions such as `()`, `[]`, `$`, `/`, `.`, `*`, `+` must be escaped.  

!!! hint "Hint"

    Supported as both command and expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORMW %REPLACE("12億3456万7890円", "[^0-9]", "")%
    ``` 
    ``` title="Result"
	1234567890
    ```


---

# RESET_STAIN.en
---
---
hide:
  - toc
---

# RESET_STAIN

| Function name                                                               | Arguments | Return |
| :------------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`RESET_STAIN`](./RESET_STAIN.md) | `int`     | none   |

!!! info "API"

    ```  { #language-erbapi }
	RESET_STAIN charaID
    ```
	Command to initialize the `STAIN` of the character specified by the first argument. The initial value is the same as the value assigned when [`BEGIN TRAIN` is called, and can be specified in [`_replace.csv>Initial stain value`](../Emuera/replace.md#_5).

!!! hint "Hint"

    Command only.

### Related Items
- [_replace.csv>Initial stain value](../Emuera/replace.md#_5)


---

# RESETDATA.en
---
---
hide:
  - toc
---

# RESETDATA

| Function name                                                           | Arguments | Return |
| :--------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`RESETDATA`](./RESETDATA.md) | none      | none   |

!!! info "API"

    ```  { #language-erbapi }
	RESETDATA
    ```
	Initializes all variables except global variables.  
	Specifically, it deletes all characters, assigns `0` or empty string to all local variables and all regular variables.  
	Also, variables with initial values set such as `PALAMLV` and `STR` are assigned their initial values.

!!! hint "Hint"

    Command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		RESULT = 123
		LOCAL = 456

		RESETDATA
		PRINTFORMW {RESULT} {LOCAL}
    ``` 
    ``` title="Result"
	0 0
    ```

### Related Items
- [RESETGLOBAL](RESETGLOBAL.md)


---

# RESETGLOBAL.en
---
---
hide:
  - toc
---

# RESETGLOBAL

| Function name                                                               | Arguments | Return |
| :------------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`RESETGLOBAL`](./RESETGLOBAL.md) | none      | none   |

!!! info "API"

    ```  { #language-erbapi }
	RESETGLOBAL
    ```
	Initializes global variables.  
	Specifically, assigns `0` to numeric global variables and assigns empty string to string global variables.

!!! hint "Hint"

    Command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		GLOBAL = 123

		RESETGLOBAL
		PRINTFORMW {GLOBAL}
    ``` 
    ``` title="Result"
	0
    ```

### Related Items
- [RESETDATA](RESETDATA.md)


---

# RESTART.en
---
---
hide:
  - toc
---

# RESTART

| Function name | Arguments | Return |
| :--------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`RESTART`](./RESTART.md) | none | none   |

!!! info "API"

    ```  { #language-erbapi }
	RESTART
    ```
    Returns to the beginning of the currently executing function. Dynamic variables defined using `DYNAMIC` are not initialized


!!! hint "Hint"

    Only available as a statement.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIM DYNAMIC RESTARTCOUNT

		RESTARTCOUNT++

		SELECTCASE RESTARTCOUNT
			CASE 1
				PRINTL Doe, a deer, a female deer
				RESTART
			CASE 2
				PRINTL Ray, a drop of golden sun
				RESTART
			CASE 3
				PRINTL Me, a name I call my self
				RESTART
			CASE 4
				PRINTL Far, a long, long way to run
				RESTART
			CASE 5
				PRINTL Sew, a needle pulling thread
				RESTART
			CASE 6
				PRINTL La, a note to follow Sew
				RESTART
			CASE 7
				PRINTL Tea, a drink with jam and bread
				RESTART
		ENDSELECT

		PRINTW That will bring us back to Do
    ``` 
    ``` title="Result"
	Doe, a deer, a female deer
	Ray, a drop of golden sun
	Me, a name I call my self
	Far, a long, long way to run
	Sew, a needle pulling thread
	La, a note to follow Sew
	Tea, a drink with jam and bread
	That will bring us back to Do
    ```

### Related
- [RETURN](RETURN.md)


---

# RETURN.en
---
---
hide:
  - toc
---

# RETURN

| Function name                                                                                              | Arguments                   | Return                    |
| :-------------------------------------------------------------------------------------------------- | :--------------------- | :------------------------ |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`RETURN`](./RETURN.md) | `int`(, `int`,...)     | `same as arguments`              |
| ![](../assets/images/IconEmuera.webp)[`RETURNFORM`](./RETURN.md)                                    | `string`(, `string`,...)| `same as arguments (converted to numeric)`|

!!! info "API"

    ```  { #language-erbapi }
	RETURN result:0(, result:1,...)
	RETURNFORM formedString(, formedString,...)
    ```
    Assigns the values specified in the arguments to `RESULT` and terminates the currently executing function.  
	`RETURN` assigns arguments from left to right to `RESULT:0`, `RESULT:1`, etc.  
	
	`RETURNFORM` is a variant of `RETURN`.  
	The formatted string specified in the arguments is parsed as an expression and `RETURN` is performed.  
	For example, the following is possible:

    ```  { #language-erbapi }
	A = 100
	CALL TEST
	PRINTFORMW RESULT == {RESULT}

	@TEST
	STR = A * 10
	RETURNFORM %STR%
    ```

	Note that unlike `RETURN`, % is not treated as the modulo operator but as the start of a string expression.  

    ```  { #language-erbapi }
	;OK. Returns the last two digits of A.
		RETURN A % 100

	;Error. Tries to read everything after % as a string expression.
		RETURNFORM A % 100
    ```
	Multiple return values are also supported.  
	When multiple return values are specified, they are assigned to `RESULT:0`, `RESULT:1`, etc. in order from the beginning.  

!!! hint "Hint"

    Only commands are supported.


!!! example "Example" 
 
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		CALL AAA

		PRINTFORML {RESULT:0}, {RESULT:1}, {RESULT:2}

		CALL BBB

		PRINTFORMW {RESULT:0}

		@AAA
		RETURN 5, 7, 3

		@BBB
		#DIMS HOGES

		HOGES '= "3"*2

		RETURNFORM %HOGES%4
    ``` 
    ``` title="Result"
		5, 7, 3
		334
    ```

### See Also
- [RESTART](RESTART.md)


---

# REUSELASTLINE.en
---
---
hide:
  - toc
---

# REUSELASTLINE

| Function name                                                                     | Arguments | Return   |
| :-------------------------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`REUSELASTLINE`](./REUSELASTLINE.md) | `string`  | none     |

!!! info "API"

    ```  { #language-erbapi }
	REUSELASTLINE string
    ```
	Rewrites the last line with the specified formatted string.
	However, lines rewritten using this will be replaced when the next line is added.
	Basically, this should only be used within the loop processing of [`INPUT`](./INPUT.md) and [`INPUTS`](./INPUT.md).
	The argument uses the same format as [`PRINTFORM`](./PRINT.md).
	Note that `REUSELASTLINE ` (with this half-width space required) allows creating an empty line without warnings.

    ```  { #language-erbapi }
	$INPUT_LOOP  
	INPUT  
	IF RESULT != 0  
		;!;CLEARLINE 1   
		;!;REUSELASTLINE 無効ですよ  
		GOTO INPUT_LOOP  
	ENDIF  
	```

	Calling `REUSELASTLINE` before [`GOTO INPUT_LOOP`](./GOTO.md) will erase the previous input from the screen, and the next input will be displayed on the same line as the previous input.
	This prevents the number of lines from increasing even when invalid inputs are repeated, avoiding the situation where choices end up off-screen.
	Additionally, at the end of conditional branches in `@USERXXX` family functions
	(applicable to `@USERCOM`, `@USERSHOP`, and `@USERABLUP`):

    ```  { #language-erbapi }
	;!;ELSE  
		;!;REUSELASTLINE   
	ENDIF  
	```

	Can be used to...?
	(If using Emuera-specific code, `;!;` is not required)

!!! hint "Hint"

    Command only.


---

# SAVECHARA.en
---
---
hide:
  - toc
---

# SAVECHARA

| Function name                                                       | Arguments                        | Return |
| :------------------------------------------------------------------ | :------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SAVECHARA`](./SAVECHARA.md) | `string`, `string`, `int`(, `int`...) | none   |

!!! info "API"

    ```  { #language-erbapi }
	SAVECHARA filename, memo, charaNO{,charaNO2...}
    ```
    Command to save the data of specified characters to a file.  
    The first argument specifies the filename (part of it) to save the data. The actual filename will be `chara_*.dat`.  
    The second argument saves a string as a memo for the save data. It can be read later using the [`CHKCHARADATA`](./CHKCHARADATA.md) function.  
    The third and subsequent arguments specify the registration numbers of characters to save. Any number can be specified, but the same registration number cannot be specified multiple times.  
    If the dat folder does not exist, the system attempts to create it. If creation fails, an error occurs.  
    Also, an error occurs if the first argument is an empty string or contains characters that cannot be used in filenames.  


!!! hint "Hint"

    Command only.

### See Also
- [LOADCHARA](LOADCHARA.md)
- [CHKCHARADATA](CHKCHARADATA.md)


---

# SAVEDATA.en
---
---
hide:
  - toc
---

# SAVEDATA

| Function name                                                       | Arguments         | Return |
| :------------------------------------------------------------------ | :---------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SAVEDATA`](./SAVEDATA.md) | `int`, `string`  | none   |

!!! info "API"

    ```  { #language-erbapi }
	SAVEDATA saveID, saveInfo
    ```
    Saves the current state to the file with the number specified by `saveID`.  
    Since the `SAVEDATA` command does not call `@SAVEINFO`, you cannot add a comment using [`PUTFORM`](./PUTFORM.md).  
    Instead, specify a comment using the second argument `saveInfo`.  
    (From 1.704, string expressions can be used in addition to string variables) Below is an example.  

    ```  { #language-erbapi }
	GETTIME
	STR:0 = %RESULTS:0% {DAY+1}日目
	SAVEDATA 14, STR:0
	SAVEDATA 15, RESULTS:0 + " " + @"{DAY+1}日目"
    ```

		Result (Load screen)
		[13] ----
		[14] 2009年03月28日 00:31:27 1日目
		[15] 2009年03月28日 00:31:27 1日目
		[16] ----

    No overwrite confirmation is performed; please implement it in ERB if needed.  
    You can check if data already exists using the [`CHKDATA`](./CHKDATA.md) command.  
    Unlike the [`SAVEGAME`](./SAVEGAME.md) command, `SAVEDATA` can be called from anywhere in the script.  


!!! hint "Hint"

    Command only.

### See Also
- [LOADDATA](LOADDATA.md)


---

# SAVEGAME.en
---
---
hide:
  - toc
---

# SAVEGAME, LOADGAME

| Function name                                                       | Arguments | Return |
| :----------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`SAVEGAME`](./SAVEGAME.md) | none  | none   |
| ![](../assets/images/Iconeramaker.webp)[`LOADGAME`](./SAVEGAME.md) | none  | none   |

!!! info "API"

    ```  { #language-erbapi }
	SAVEGAME
	LOADGAME
    ```
	`SAVEGAME` calls the save screen, and `LOADGAME` calls the load screen. Neither can be called outside of `SHOP`.

!!! hint "Hint"

    Commands only.

### See Also
- [PUTFORM](PUTFORM.md)


---

# SAVEGLOBAL.en
---
---
hide:
  - toc
---

# SAVEGLOBAL

| Function name                                                         | Arguments | Return |
| :-------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SAVEGLOBAL`](./SAVEGLOBAL.md) | none      | none   |

!!! info "API"

    ```  { #language-erbapi }
	SAVEGLOBAL
    ```
    Saves the variables `GLOBAL` and `GLOBALS`. Save destination is `global.sav`.  
    If variables with `GLOBAL` and `SAVEDATA` flags are defined in ERH files, they are also saved.  


!!! hint "Hint"

    Command only.

### See Also
- [LOADGLOBAL](LOADGLOBAL.md)


---

# SAVENOS.en
---
---
hide:
  - toc
---

# SAVENOS

| Function name                                                     | Arguments | Return |
| :---------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SAVENOS`](./SAVENOS.md) | `int`     | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SAVENOS variable
    ```
    As a command, retrieves the number specified in the config [`Save data count per page`](../Emuera/config.md#_10) and assigns it to the specified numeric variable. The default is `20`.  
    Numeric variable cannot be omitted.

    As an expression function, returns the number specified in the config `Save data count per page`. The default is 20.  
    It is synonymous with `GETCONFIG("Save data count per page")`  


!!! hint "Hint"

    Command and expression function both supported.


---

# SAVETEXT.en
---
---
hide:
  - toc
---

# SAVETEXT

| Function name                                                                                           | Arguments                    | Return |
| :------------------------------------------------------------------------------------------------------ | :--------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`SAVETEXT`](./SAVETEXT.md) | `string`, `int`(, `int`, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SAVETEXT text, fileNo(, forceSavdir, forceUTF8)
    ```
    Saves the text specified by `text` to a file named `textXX.txt` (e.g., if `fileNo` is `2`, it saves to `text02.txt`).  
    This command saves the string as-is without adding or modifying headers or other content.  
    This command is normally affected by the option settings and is created in the sav folder and saved in UTF-8.  
    If a non-zero value is specified for the third argument, it forces saving in the sav folder, ignoring the options. The sav folder is created if needed.  
    If a non-zero value is specified for the fourth argument, it forces saving in UTF-8 encoding, ignoring the options.  
    Returns non-zero on success, and zero on failure.  
    If writing to the same file repeatedly in a short period of time, writing may fail due to antivirus software or other factors, so checking success/failure is important.  

    In EM+EE, if the second argument is a string, it saves the file using the second argument as the path. Specify as a relative path from `Emuera.exe` (".." is invalid). Also, only extensions allowed in the "Extensions available for LOADTEXT and SAVETEXT" setting in the config screen or `Emuera.config` can be used (default is txt only).

    ``` title="emuera.config"
    Extensions available for LOADTEXT and SAVETEXT:txt,xml,json
    ```


!!! hint "Hint"

    Command and expression function both supported.

### See Also
- [OUTPUTLOG](OUTPUTLOG.md)


---

# SELECTCASE.en
---
---
hide:
  - toc
---

# SELECTCASE

| Function name                                                             | Arguments | Return |
| :----------------------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SELECTCASE`](./SELECTCASE.md)     | `any` | none   |
| ![](../assets/images/IconEmuera.webp)[`CASE`](./SELECTCASE.md)           | `any` | none   |
| ![](../assets/images/IconEmuera.webp)[`CASEELSE`](./SELECTCASE.md)       | none  | none   |
| ![](../assets/images/IconEmuera.webp)[`ENDSELECT`](./SELECTCASE.md)      | none  | none   |

!!! info "API"

    ```  { #language-erbapi }
	SELECTCASE anyValue
	CASE anyValue(, anyValue...)
	CASEELSE
	ENDSELECT
    ```
	Branching construct. Modeled after Visual Basic's identically named construct.  
	Similar to the [`IF`](./IF.md) construct, `SELECTCASE` is a construct that branches to multiple lines based on a single value.  
	Branches based on the value of the argument specified in `SELECTCASE`. The simplest usage is as follows:

    ```  { #language-erbapi }
	SELECTCASE X  
		CASE 1  
			PRINTL X is 1.  
		CASE 3  
			PRINTL X is 3.  
		CASEELSE  
			PRINTL X is neither 1 nor 3.  
	ENDSELECT  
    ```

	This script branches based on the value of `X`.  
	When `SELECTCASE` is executed, if `X` is `1`, it jumps to the `CASE 1` line and executes lines until the next `CASE` or `CASEELSE`.  
	Similarly, if `X` is `3`, it jumps to `CASE 3`.  
	If there is no `CASE` matching the value of `X`, it jumps to `CASEELSE` if present, otherwise to `ENDSELECT`.  
	Unlike C's `switch` statement, execution does not fall through from one `CASE` to the next.  
	Also, the [`BREAK`](./CONTINUE.md) statement cannot jump to `ENDSELECT`.  
	Note that if you enter `SELECTCASE～CASE～CASEELSE～ENDSELECT` directly via commands like [`GOTO`](./GOTO.md), it executes normally up to the line before `CASE`, `CASEELSE`, or `ENDSELECT`, then jumps to the next line after `ENDSELECT`, similar to [`IF～ELSEIF～ELSE～ENDIF`](./IF.md).  
	There are three formats for `CASE` conditions.  
	One is specifying values directly as above. The second is `IS <operator> <expression>`. The third is `<expression> TO <expression>`.  
	For `IS <operator> <expression>`, for example `IS <= 30`, the `CASE` block executes if `X` is 30 or less.  
	For `<expression> TO <expression>`, for example `10 TO 20`, the `CASE` block executes if `X` is between 10 and 20 (inclusive).  
	Multiple condition expressions can also be specified in `CASE` separated by commas.  
	Using these, you can write as follows:

    ```  { #language-erbapi }
	SELECTCASE X  
		CASE 1  
			PRINTL X is 1.  
		CASE 2,3  
			PRINTL X is not 1.  
			PRINTL X is 2 or 3.  
		CASE 10 TO 20  
			PRINTL X is not 1, 2, or 3.  
			PRINTL X is between 10 and 20.  
		CASE IS <= 30  
			PRINTL X is not 1, 2, 3, or between 10 and 20.  
			PRINTL X is 30 or less.  
		CASE 40, 5 * 10 TO 6 * 10, IS >= 10 * 10  
			PRINTL X is not 30 or less.  
			PRINTL X is 40, between 50 and 60, or 100 or more.  
		CASEELSE  
			PRINTL X does not match any case.  
	ENDSELECT  
    ```

	Note that `IS` and `TO` must be used in the forms `IS <operator> <expression>` and `<expression> TO <expression>`.  
	For example, `30 < IS` or `(10 TO 20) || (30 TO 40)` are not valid.  
	Also, `<expression> TO <expression>` evaluates to true only when the left side is greater than or equal to the right side. If the right side is less than the left side, that `CASE` will never execute.  

	Note that when a `CASE` has multiple condition expressions, short-circuit evaluation occurs.  
	Conditions are checked from left to right, and if a matching condition is found, remaining conditions are not evaluated.

	String expressions can also be used as arguments to `SELECTCASE`.  
	When a string is specified in `SELECTCASE`, the `CASE` conditions must also be string expressions.

!!! hint "Hint"

    Commands only.

### See Also
- [IF-ENDIF](IF.md)
- [PRINTDATA](PRINTDATA.md)
- [STRDATA](STRDATA.md)


---

# SETANIMETIMER.en
---
---
hide:
  - toc
---

# SETANIMETIMER

| Function name                                                    | Arguments | Return |
| :-------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SETANIMETIMER`](./SETANIMETIMER.md) | `int`     | none   |

!!! info "API"

    ```  { #language-erbapi }
	SETANIMETIMER time
    ```
	Specifies the redraw interval in milliseconds for animated sprites.  
	Normally, Emuera does not redraw during input waits such as [`INPUT`](./INPUT.md).  
	By setting a redraw interval with this command, images can be animated during input waits like `INPUT`.  
	Note that no redraw is performed in commands with timeout processing such as [`TINPUT`](./TINPUT.md).  
	The actual drawing interval will be slightly slower than the specified time due to computer conditions.  
	Therefore, setting the drawing interval to the same value as the animation's `delay` will cause frequent frame drops.  
	Please specify an interval sufficiently shorter than `delay`.  

	This command is independent of the "Frames per second" setting in config.  
	Also, it is not affected by the redraw suppression effect of the [`REDRAW`](./REDRAW.md) command.

!!! hint "Hint"

    Command only (not available as expression function).

### Related Items
- [SPRITEANIMECREATE](SPRITEANIMECREATE.md)


---

# SETBGCOLOR.en
---
---
hide:
  - toc
---

# SETBGCOLOR

| Function name                                                                   | Arguments           | Return |
| :------------------------------------------------------------------------------ | :------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`SETBGCOLOR`](./SETBGCOLOR.md)          | `int`, `int`, `int`  | none   |
|                                                                                 | `int`               | none   |
| ![](../assets/images/IconEmuera.webp)[`RESETBGCOLOR`](./SETBGCOLOR.md)        | none                | none   |

!!! info "API"

    ```  { #language-erbapi }
	SETBGCOLOR R, G, B
	SETBGCOLOR hexaDecimal
	RESETBGCOLOR
    ```
	Command to change the background color to the specified color.  
	The basic specifications are the same as [`SETCOLOR`/`RESETCOLOR`](./SETCOLOR.md), except that for safety, if the color is changed again within 0.2 seconds, it will force a WAIT until 0.2 seconds have elapsed.  
	The current background color can be obtained with [`GETBGCOLOR`](./GETCOLOR.md), and the default background color can be obtained with [`GETDEFBGCOLOR`](./GETCOLOR.md).  
	To specify colors by name, use [`SETBGCOLORBYNAME`](./SETCOLORBYNAME.md).

    ```  { #language-erbapi }
	SETBGCOLOR 255, 128, 0
	SETBGCOLOR 0xFF8000
    ```

	Both lines have the same meaning. The value obtained with the [`GETBGCOLOR`](./GETCOLOR.md) command will be the latter format.

!!! hint "Hint"

    Command only.

### Related
- [SETCOLOR](SETCOLOR.md)


---

# SETBGMVOLUME.en
---
---
hide:
  - toc
---

# SETBGMVOLUME

| Function name                                                           | Arguments | Return |
| :---------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`SETBGMVOLUME`](./SETBGMVOLUME.md) | `int`     | `void` |

!!! info "API"

	``` { #language-erbapi }
	SETBGMVOLUME int(0 to 100)
	```

	Sets the volume for `PLAYBGM` to a value between 0 and 100

!!! hint "Hint"

    Available as command only

### Related
- [PLAYBGM](PLAYBGM.md)


---

# SETCOLOR.en
---
---
hide:
  - toc
---

# SETCOLOR, RESETCOLOR

| Function name                                                           | Arguments         | Return |
| :---------------------------------------------------------------------- | :---------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SETCOLOR`](./SETCOLOR.md)      | `int`, `int`, `int`  | none   |
|                                                                         | `int`             | none   |
| ![](../assets/images/IconEmuera.webp)[`RESETCOLOR`](./SETCOLOR.md)    | none              | none   |

!!! info "API"

    ```  { #language-erbapi }
	SETCOLOR R, G, B
	SETCOLOR hexaDecimal
	RESETCOLOR
    ```
	Changes the text color to the specified color. The change remains in effect until `RESETCOLOR` is called.  
	The specification method uses the `RGB` format.  
	The color specified with `SETCOLOR` can be reset with `RESETCOLOR`.  
	The current text color can be obtained with [`GETCOLOR`](./GETCOLOR.md), and the default text color can be obtained with [`GETDEFCOLOR`](./GETCOLOR.md).  
	Since version 1.731, `SETCOLOR` can also accept colors in `0xRRGGBB` format.  
	To specify colors by name, use [`SETCOLORBYNAME`](./SETCOLORBYNAME.md).

    ```  { #language-erbapi }
	SETCOLOR 255, 128, 0
	SETCOLOR 0xFF8000
    ```

	Both lines have the same meaning. The value obtained with the [`GETCOLOR`](./GETCOLOR.md) command will be the latter format.

!!! hint "Hint"

    Command only.

### Related
- [SETBGCOLOR](SETBGCOLOR.md)
- [SETCOLORBYNAME](SETCOLORBYNAME.md)


---

# SETCOLORBYNAME.en
---
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


---

# SETFONT.en
---
---
hide:
  - toc
---

# SETFONT functions

| Function name                                                        | Arguments   | Return    |
| :------------------------------------------------------------------ | :---------- | :-------- |
| ![](../assets/images/IconEmuera.webp)[`CHKFONT`](./SETFONT.md)      | `string`    | `int`     |
| ![](../assets/images/IconEmuera.webp)[`SETFONT`](./SETFONT.md)      | `string`    | none      |
| ![](../assets/images/IconEmuera.webp)[`GETFONT`](./SETFONT.md)      | none        | `string`  |

!!! info "API"

    ```  { #language-erbapi }
	int CHKFONT fontName
	SETFONT fontName
	string GETFONT
    ```
	`CHKFONT` checks whether a font with the specified name is installed.  
	If installed, 1 is returned in `RESULT:0`; if not installed, 0 is returned.

	`SETFONT` command uses the specified font name for subsequent string display.  
	If the argument is omitted or an empty string is specified, it returns to the [default font specified in emuera.config](../Emuera/config.md#_31).  
	If the specified font is not installed, `Microsoft Sans Serif` is used instead.  
	When specifying a font that may not be installed, refer to `CHKFONT` before `SETFONT`.

	`GETFONT` returns the name of the currently used font in `RESULTS:0`.  
	This is the same name specified by the `SETFONT` command.  
	If `SETFONT` has not been called, it returns the name of the [default font specified in emuera.config](../Emuera/config.md#_31).

	Each is an EM+EE addition, and fonts in the `font` folder (ttf, otf) in the same directory as Emuera are also available.

!!! hint "Hint"

    `CHKFONT` and `GETFONT` are supported as expression functions.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTL abc123(Default font)
		CHKFONT "MS PGothic"
		IF RESULT
			SETFONT "MS PGothic"
			PRINTL abc123(MS PGothic)
		ENDIF
		CHKFONT "MS Mincho"
		IF RESULT
			SETFONT "MS Mincho"
			PRINTL abc123(MS Mincho)
		ENDIF
		STR:0 = MS PMincho
		CHKFONT STR:0
		IF RESULT
			SETFONT STR:0
			PRINTL abc123(MS PMincho)
		ENDIF
		SETFONT
    ``` 
	![](../assets/images/SETFONT.png)


---

# SETSOUNDVOLUME.en
---
---
hide:
  - toc
---

# SETSOUNDVOLUME

| Function name                                                               | Arguments | Return |
| :-------------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`SETSOUNDVOLUME`](./SETSOUNDVOLUME.md) | `int`     | `void` |

!!! info "API"

	``` { #language-erbapi }
	SETSOUNDVOLUME int(0 to 100)
	```

	Sets the volume for `PLAYSOUND` to a value between 0 and 100

!!! hint "Hint"

    Available as command only

### Related
- [PLAYSOUND](PLAYSOUND.md)


---

# SKIP_RELATE.en
---
---
hide:
  - toc
---

# SKIP functions

| Function name                                                           | Arguments | Return |
| :----------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SKIPDISP`](./SKIP_RELATE.md)    | `int`| none   |
| ![](../assets/images/IconEmuera.webp)[`NOSKIP`](./SKIP_RELATE.md)       | none | none   |
| ![](../assets/images/IconEmuera.webp)[`ENDNOSKIP`](./SKIP_RELATE.md)    | none | none   |
| ![](../assets/images/IconEmuera.webp)[`ISSKIP`](./SKIP_RELATE.md)       | none | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MOUSESKIP`](./SKIP_RELATE.md)    | none | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MESSKIP`](./SKIP_RELATE.md)      | none | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	SKIPDISP bool
	NOSKIP
	ENDNOSKIP
	int ISSKIP
	int MOUSESKIP
	int MESSKIP
    ```
	Commands related to screen output control such as PRINT and control commands like WAIT, TWAIT, etc.
	
	- `SKIPDISP` `<value>`
		- Argument: `0` = Do not ignore
		-         : Non-zero = Ignore
		- Effect: When this flag is set, output from [`PRINT`](./PRINT.md) etc. will not occur at all
			- Also, if [`INPUT` or `INPUTS`](./INPUT.md) is reached while this flag is set,
			- An error will occur with a warning message and solution because there is no way for the user to know what to do, and skipping could lead to infinite loops

	In current general dialogue implementations, when dialogue can be hidden,  
	the command results or behavior may differ between displayed and hidden states.  
	By setting this flag and calling the dialogue, the display will not occur but other processing will,  
	so the same behavior can be expected for both display/hide.  
	If [`INPUT/INPUTS`](./INPUT.md) overlaps, you can wrap it with `NOSKIP~ENDNOSKIP`,  
	or set `SKIPDISP 0`, then after `INPUT` processing, set `SKIPDISP 1` again (the former is recommended).  
	By the way, you can check if the skip flag is currently set with `ISSKIP`.  
	Since ver1.808, this also works when placed immediately after an [`SIF`](./IF.md) statement. Note that using `SKIPDISP` resets `RESULT:0` to `0` regardless of the argument - this is by design.
	
	`NOSKIP~ENDNOSKIP` specifies a range to ignore the skip display flag.  
	The area between these two will be displayed even when `SKIPDISP 1` is set.  
	This is mainly useful when `INPUT` is needed.  
	Also, this command does not affect the `SKIPDISP` state,  
	so in code where `SKIPDISP` flag may be set (such as dialogue-related code with display/hide),  
	using this ensures that places that absolutely must be displayed are properly displayed.
	
	`ISSKIP` returns `1` in `RESULT:0` if the `SKIPDISP` flag is non-zero (ignoring `PRINT` etc. output), otherwise returns `0`.

	`MOUSESKIP` was integrated into `MESSKIP` in Emuera1.810.  
	Please use `MESSKIP`.  
	This function used to handle the following:

		If right-click is pressed and WAIT skip state is active, returns 1; otherwise returns 0.
		Returns 0 during macro processing skip.
		If macro processing skip and right-click conflict, macro takes priority and returns 0.
		Currently, it returns 1 without distinguishing between Esc key skip and right-click skip.
	
	`MESSKIP` returns `1` if the [`WAIT`](./WAIT.md) skip state is active, otherwise returns `0`.

!!! hint "Hint"

    `ISSKIP`, `MOUSESKIP`, and `MESSKIP` are supported as expression functions.


---

# SKIPLOG.en
---
---
hide:
  - toc
---

# SKIPLOG

| Function name                                                   | Arguments  | Return |
| :------------------------------------------------------------- | :----------| :------|
| ![](../assets/images/IconEE.webp)[`SKIPLOG`](./SKIPLOG.md)   | `int`      | `void` |

!!! info "API"

	``` { #language-erbapi }
	SKIPLOG bool
	```

	Controls the log skip state via left-click etc. Non-zero enables skip, zero disables skip state.

!!! hint "Hint"

    Command only.


---

# SORTCHARA.en
---
---
hide:
  - toc
---

# SORTCHARA

| Function name                                                     | Arguments                 | Return |
| :--------------------------------------------------------------- | :---------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SORTCHARA`](./SORTCHARA.md) | `charaVariable`, `keyword` | none   |

!!! info "API"

    ```  { #language-erbapi }
	SORTCHARA charaVariable, FORWARDorBACK
    ```
    Sorts the character list by any key.  
    Sort keys can be string variables like `NAME`, integer variables like `NO`, or integer array variables like `CFLAG`.  
    `charaVariable` can be omitted, in which case sorting is done by character number (`NO:XX`).  
    If `FORWARD` is specified, sorting is ascending; if `BACK` is specified, sorting is descending. If omitted, sorting is ascending.  
    `MASTER` is not included in the sort.  
    Also, `TARGET:0` and `ASSI:0` are automatically tracked, so manual adjustment is not required after use.  
    However, variants that use `TARGET:1` etc. require manually tracking these.

    ```  { #language-erbapi }
	;Sort by NO in ascending order
	SORTCHARA 
	;Sort by NO in descending order
	SORTCHARA BACK
	;Sort by CFLAG:2 in ascending order
	SORTCHARA CFLAG:2
	;Sort by NAME in descending order
	SORTCHARA NAME, BACK
    ```

    Note that even if `TARGET == -1`, no error occurs because values like `CFLAG:2` are not actually referenced.

!!! hint "Hint"

    Command only.

### Related
- [SWAPCHARA](SWAPCHARA.md)


---

# SPLIT.en
---
---
hide:
  - toc
---

# SPLIT, STRJOIN

| Function name                                                   | Arguments                              | Return   |
| :------------------------------------------------------------- | :------------------------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`SPLIT`](./SPLIT.md)    | `string`, `string`, `stringArray`      | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRJOIN`](./SPLIT.md)  | `stringArray`(, `string`, `int`, `int`) | `string` |

!!! info "API"

    ```  { #language-erbapi }
	SPLIT string, sepalateWord, stringArray
	string STRJOIN stringArray(, sepalateWord, startIndex, joinCount)
    ```
	`SPLIT` splits the string specified in the first argument using the string specified in the second argument as the delimiter, and assigns the result to the string array variable specified in the third argument.  
	Also assigns the number of splits to `RESULT`.  
	The variable specified in the third argument must be an array variable.  

    ```  { #language-erbapi }
	SPLIT "あい,うえ,,お", ",", LOCALS
    ```

	As a result of the above script, `LOCALS:0` becomes "あい", `LOCALS:1` becomes "うえ", `LOCALS:2` becomes an empty string, `LOCALS:3` becomes "お", and `RESULT` becomes `4`.  
	If the number of split elements exceeds the assignable capacity of the third argument, those elements are not assigned.  
	Since `RESULT` contains the actual split count, use that to determine the number.  

	`STRJOIN` is the opposite string concatenation command from `SPLIT`. Specifying a character variable may result in an error.  
	`sepalateWord` is the string to add between elements during concatenation. As with similar functions in other languages, when omitted, `,` is automatically applied (specify `""` if no delimiter is needed).  
	If `startIndex` and `joinCount` are specified, concatenation is performed in the range `arrayIndexStart ≤ i < startPosition + arrayIndexElementCount`.  
	When specifying the latter, the former cannot be omitted.  

!!! hint "Hint"

    `STRJOIN` is supported as an expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		SPLIT "あい,うえ,,お", ",", LOCALS
		REPEAT RESULT
			PRINTFORML %LOCALS:COUNT%
		REND
		PRINTFORMW %STRJOIN(LOCALS, "")%
    ``` 
    ``` title="Result"
	あい
	うえ
	
	お
	あいうえお
    ```


---

# SPRITEANIMEADDFRAME.en
---
---
hide:
  - toc
---

# SPRITEANIMEADDFRAME

| Function name                                                                      | Arguments                                                             | Return |
| :------------------------------------------------------------------------------- | :------------------------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEANIMEADDFRAME`](./SPRITEANIMEADDFRAME.md) | `string`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITEANIMEADDFRAME spriteName, gID, x, y, width, height, offsetx, offsety, delay
    ```
	Adds a frame to the animated sprite with the resource name specified by `spriteName`.  
	The rectangular area specified by `x, y, width, height` in the `Graphics` specified by `gID` becomes the frame, positioned at `offsetx, offsety` from the top-left of the sprite.  
	Parts outside the size set when creating the animated sprite will not be drawn.  
	`delay` specifies the display time for this frame in milliseconds.  
	This command fails and does nothing if the resource name `spriteName` does not exist or is not an animated sprite.  
	Returns 1 on success, 0 on failure.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [SPRITEANIMECREATE](SPRITEANIMECREATE.md)


---

# SPRITEANIMECREATE.en
---
---
hide:
  - toc
---

# SPRITEANIMECREATE

| Function name                                                              | Arguments               | Return |
| :----------------------------------------------------------------------- | :--------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEANIMECREATE`](./SPRITEANIMECREATE.md) | `string`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITEANIMECREATE spriteName, width, height
    ```
	Creates an animated sprite with the resource name specified by `spriteName` and the size specified by `width` and `height`. Returns non-zero on success.  
	Returns 0 if a sprite with the same resource name already exists or if creation fails.  
	To animate, you need to add frames using the [`SPRITEANIMEADDFRAME`](./SPRITEANIMEADDFRAME.md) command.  
	For notes on animated sprites, see also [`resources`](../Emuera/resources.md).

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [SPRITEANIMEADDFRAME](SPRITEANIMEADDFRAME.md)
- [SETANIMETIMER](SETANIMETIMER.md)


---

# SPRITECREATE.en
---
---
hide:
  - toc
---

# SPRITECREATE

| Function name                                                      | Arguments                                   | Return |
| :--------------------------------------------------------------- | :------------------------------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITECREATE`](./SPRITECREATE.md) | `string`, `int`                            | `int`  |
|                                                                    | `string`, `int`, `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITECREATE spriteName, gID
	int SPRITECREATE spriteName, gID, x, y, width, height
    ```
	Creates a sprite with the resource name specified by `spriteName`, using part or all of the `Graphics` specified by `gID`.  
	By specifying `x, y, width, height`, you can crop that portion of the `Graphics` as a sprite.  
	Returns non-zero on success.  
	Returns 0 if a sprite with the same resource name already exists or if creation fails.  
	Since sprites only remember the parent `Graphics`'s `gID` and crop position, changes to the parent `Graphics` will also change the sprite.  
	Also, if the parent `Graphics` is disposed, the sprite is also treated as disposed.  
	The created sprite can be handled almost like resources declared in the csv file in the `resources` folder.  
	For example, it can be used with the [`PRINT_IMG`](./PRINT_IMG.md) command or [`HTML_PRINT` img tags](../Emuera/HTML_PRINT.md#img).

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GCREATE](GCREATE.md)


---

# SPRITECREATED.en
---
---
hide:
  - toc
---

# SPRITECREATED

| Function name                                                        | Arguments | Return |
| :------------------------------------------------------------------ | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITECREATED`](./SPRITECREATED.md) | `string`  | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITECREATED spriteName
    ```
	Returns 1 if a sprite with the specified name has been created, or 0 if it has not been created or has been disposed.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [SPRITECREATE](SPRITECREATE.md)


---

# SPRITEDISPOSE.en
---
---
hide:
  - toc
---

# SPRITEDISPOSE

| Function name                                                        | Arguments | Return |
| :------------------------------------------------------------------ | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEDISPOSE`](./SPRITEDISPOSE.md) | `string`  | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITDISPOSE spriteName
    ```
	Disposes the sprite with the resource name specified by `spriteName`.  
	Returns non-zero on success.  
	This command does not affect the original `Graphics` or other resources.  
	To release memory allocated to `Graphics`, use the [`GDISPOSE`](./GDISPOSE.md) command.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [SPRITECREATE](SPRITECREATE.md)
- [SPRITEDISPOSEALL](SPRITEDISPOSEALL.md)


---

# SPRITEDISPOSEALL.en
---
---
hide:
  - toc
---

# SPRITEDISPOSEALL

| Function name                                                            | Arguments | Return |
| :---------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`SPRITEDISPOSEALL`](./SPRITEDISPOSEALL.md) | `int`     | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int SPRITEDISPOSEALL, containCsvSprite
	```

	Disposes all SPRITEs. If the argument is 0, only those created in ERB are disposed; if non-zero, all including those created in CSV in resources are disposed.  
	Returns the number of sprites disposed.

!!! hint "Hint"

	Both command and expression function supported.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		GCREATE 0, 100, 100

		SPRITECREATE "AAA", 0
		SPRITECREATE "BBB", 0
		SPRITECREATE "CCC", 0

		PRINTFORMW {SPRITEDISPOSEALL(0)}
	```

	``` title="Result"
	3
	```

### Related Items
- [SPRITEDISPOSE](./SPRITEDISPOSE.md)


---

# SPRITEGETCOLOR.en
---
---
hide:
  - toc
---

# SPRITEGETCOLOR

| Function name                                                          | Arguments               | Return |
| :------------------------------------------------------------------- | :--------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEGETCOLOR`](./SPRITEGETCOLOR.md) | `string`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITEGETCOLOR spriteName, x, y
    ```
	Gets the color at the specified position of the sprite with the resource name specified by `spriteName` as an integer value in `0xAARRGGBB` format.  
	Returns -1 if `spriteName` has not been created or has been disposed, or if `x, y` is outside the image bounds.  

	Note that this command returns -1 on failure, not 0.  
	This command returns 0 if you get the color of a position that is black and fully transparent.

!!! hint "Hint"

    Both command and expression function supported.


---

# SPRITEMOVE.en
---
---
hide:
  - toc
---

# SPRITEMOVE

| Function name                                                        | Arguments               | Return |
| :------------------------------------------------------------------ | :--------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEMOVE`](./SPRITEMOVE.md) | `string`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITEMOVE spriteName, movex, movey
    ```
	Adds the specified values to the relative X and Y position of the sprite with the specified name.  
	That is, it is equivalent to:

		SPRITESETPOS spriteName, SPRITEPOSX(spriteName) + movex, SPRITEPOSY(spriteName) + movey

	Returns non-zero on success, or 0 if the specified sprite has not been created or has been disposed.

!!! hint "Hint"

    Both command and expression function supported.


---

# SPRITEPOSXY.en
---
---
hide:
  - toc
---

# SPRITEPOSX, SPRITEPOSY

| Function name                                                           | Arguments | Return |
| :--------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEPOSX`](./SPRITEPOSXY.md) | `string`  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`SPRITEPOSY`](./SPRITEPOSXY.md) | `string`  | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITEPOSX spriteName
	int SPRITEPOSY spriteName
    ```
	Gets the relative X or Y position of the sprite with the specified name.  
	Returns 0 if the sprite has not been created or has been disposed.  
	To distinguish between position X/Y being 0 versus not created/disposed, call [`SPRITECREATED`](./SPRITECREATED.md) separately.

!!! hint "Hint"

    Both command and expression function supported.


---

# SPRITESETPOS.en
---
---
hide:
  - toc
---

# SPRITESETPOS

| Function name                                                          | Arguments               | Return |
| :------------------------------------------------------------------- | :--------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITESETPOS`](./SPRITESETPOS.md) | `string`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITESETPOS spriteName, posX, posY
    ```
	Sets the relative X and Y position of the sprite with the specified name.  
	Returns non-zero on success, or 0 if the specified sprite has not been created or has been disposed.

!!! hint "Hint"

    Both command and expression function supported.


---

# SPRITEWIDTHHEIGHT.en
---
---
hide:
  - toc
---

# SPRITEWIDTH, SPRITEHEIGHT

| Function name                                                               | Arguments | Return |
| :---------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEWIDTH`](./SPRITEWIDTHHEIGHT.md)  | `string`  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`SPRITEHEIGHT`](./SPRITEWIDTHHEIGHT.md) | `string`  | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITEWIDTH spriteName
	int SPRITEHEIGHT spriteName
    ```
	Gets the width or height of the sprite with the specified name.  
	Returns 0 if the sprite has not been created or has been disposed.

!!! hint "Hint"

    Both command and expression function supported.


---

# SQRT.en
---
---
hide:
  - toc
---

# SQRT

| Function name                                             | Arguments | Return |
| :-------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SQRT`](./SQRT.md) | `int`     | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SQRT int
    ```
    Returns the square root of the argument. Decimal parts are truncated, so it is recommended to scale up the value before use.


!!! hint "Hint"

    Both command and expression function forms are available.

### Related
- [CBRT, LOG, LOG10, EXPOMENT](MATH_EXTENSION.md)


---

# STOPBGM.en
---
---
hide:
  - toc
---

# STOPBGM

| Function name                                             | Arguments | Return |
| :-------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`STOPBGM`](./STOPBGM.md) | `void` | `void` |

!!! info "API"

	``` { #language-erbapi }
	STOPBGM
	```

	Stops the BGM currently playing via `PLAYBGM`

!!! hint "Hint"

    Available as command only

### Related
- [PLAYBGM](PLAYBGM.md)


---

# STOPCALLTRAIN.en
---
---
hide:
  - toc
---

# STOPCALLTRAIN

| Function name                                                                     | Arguments | Return |
| :--------------------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`STOPCALLTRAIN`](./STOPCALLTRAIN.md) | none      | none   |

!!! info "API"

    ```  { #language-erbapi }
	STOPCALLTRAIN
    ```
	When called while [`CALLTRAIN`](./CALLTRAIN.md) command is running, it ends the CALLTRAIN processing at that point.  
	Does nothing otherwise.

!!! hint "Hint"

    Command only.

### Related
- [CALLTRAIN](CALLTRAIN.md)


---

# STOPSOUND.en
---
---
hide:
  - toc
---

# STOPSOUND

| Function name                                                 | Arguments | Return |
| :------------------------------------------------------------ | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`STOPSOUND`](./STOPSOUND.md) | `void` | `void` |

!!! info "API"

	``` { #language-erbapi }
	STOPSOUND
	```

	Stops the sound currently playing via `PLAYSOUND`

!!! hint "Hint"

    Available as command only

### Related
- [PLAYSOUND](PLAYSOUND.md)


---

# STRCOUNT.en
---
---
hide:
  - toc
---

# STRCOUNT

| Function name                                                     | Arguments          | Return |
| :--------------------------------------------------------------- | :----------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`STRCOUNT`](./STRCOUNT.md) | `string`, `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int STRCOUNT string, searchWord
    ```
	Command that retrieves the number of occurrences of a specified substring in a string. Assigns the hit count to `RESULT:0` or returns it.  
	The search string format follows C# regular expression specifications.  

!!! hint "Hint"

    Supported as both command and expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORML Number of "も":{STRCOUNT("すもももももももものうち", "も")}
		PRINTFORMW Number of half-width digits:{STRCOUNT("1日1歩 3日で3歩 3歩進んで2歩下がる", "[0-9]")}
    ``` 
    ``` title="Result"
	Number of "も":8
	Number of half-width digits:6
    ```

### See Also
- [STRFIND](STRFIND.md)


---

# STRDATA.en
---
---
hide:
  - toc
---

# STRDATA

| Function name                                                 | Arguments          | Return |
| :------------------------------------------------------------ | :---------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`STRDATA`](./STRDATA.md) | `stringVariable`  | none   |

!!! info "API"

    ```  { #language-erbapi }
	STRDATA stringVariable
		DATA
		DATAFORM
		DATALIST
		ENDLIST
	ENDDATA
    ```
	A command that assigns strings to a specified string-type variable instead of displaying them with [`PRINTDATA`](./PRINTDATA.md).  
	Each format is the same as `PRINTDATA`, so please refer to that page.

!!! hint "Hint"

    Command only.
### Related
- [PRINTDATA](PRINTDATA.md)


---

# STRFIND.en
---
---
hide:
  - toc
---

# STRFIND

| Function name                                                          | Arguments                     | Return |
| :-------------------------------------------------------------------- | :--------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`STRFIND`](./STRFIND.md)        | `string`, `string`(, `int`)  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRFINDU`](./STRFIND.md)       | `string`, `string`(, `int`)  | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int STRFIND string, searchWord(, startPosition)
	int STRFINDU string, searchWord(, startPosition)
    ```
	String search command.  
	The first argument specifies the target string as a string expression, and the second argument specifies the search string as a string expression.  
	`STRFIND` counts full-width characters as 2, while `STRFINDU` counts them as 1, and returns a 0-based index. Returns -1 if not found.  
	Since version 1.712, a third argument can be specified for STRFIND(U).  
	The third argument specifies the search start position as a 0-based index.  

    ```  { #language-erbapi }
	STRFIND "abcdeabced","a",3
    ```

	In the above, `RESULT` will be assigned `5`.  
	Although there is an "a" at position 0, the search starts at position 3 (the "d") due to the third argument, so the first "a" found is at position 5.  

!!! hint "Hint"

    Supported as both command and expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		STR:0 = abcdefghi
		STR:1 = あいうえお
		STR:2 = うえ
		STRFIND STR:0, "cde"
		PRINTFORML <TEST1> = {RESULT:0}
		STRFIND STR:1, "いうえ"
		PRINTFORML <TEST2> = {RESULT:0}
		STRFIND STR:1, STR:2
		PRINTFORML <TEST3> = {RESULT:0}
		STRFIND STR:1, "か"
		PRINTFORML <TEST4> = {RESULT:0}
    ``` 
    ``` title="Result"
	<TEST1> = 2
	<TEST2> = 2
	<TEST3> = 4
	<TEST4> = -1
    ```

### See Also
- [STRCOUNT](STRCOUNT.md)
- [SUBSTRING](SUBSTRING.md)


---

# STRFORM.en
---
---
hide:
  - toc
---

# STRFORM

| Function name                                                   | Arguments | Return   |
| :------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`STRFORM`](./STRFORM.md) | `string`  | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string STRFORM formedString
    ```
	Treats the given string as a formatted string similar to PRINTFORM, and returns the expanded string.  


!!! hint "Hint"

    Supported as both command and expression function.

### See Also
- [GETVAR, GETVARS](GETSETVAR.md)
- [GETMETH, GETMETHS](GETMETH.md)


---

# STRLEN.en
---
---
hide:
  - toc
---

# STRLEN Family

| Function name                                                           | Arguments | Return |
| :--------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`STRLEN`](./STRLEN.md)            | `string`  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRLENS`](./STRLEN.md)          | `string`  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRLENFORM`](./STRLEN.md)       | `string`  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRLENU`](./STRLEN.md)          | `string`  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRLENSU`](./STRLEN.md)         | `string`  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRLENFORMU`](./STRLEN.md)      | `string`  | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	STRLEN string
	int STRLENS string
	STRLENFORM formedString
	STRLENU string
	int STRLENSU string
	STRLENFORMU formedString
    ```
	`STRLEN`, `STRLENS`, and `STRLENFORM` measure the length of a string and assign it to `RESULT:0`.  
	The length is in bytes using SHIFT-JIS. This means full-width characters are counted as 2 characters.  

	`STRLENU`, `STRLENSU`, and `STRLENFORMU` are Unicode versions. The difference is that full-width characters are counted as 1 character.  

!!! hint "Hint"

    `STRLENS` and `STRLENSU` are supported as expression functions.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		STRLEN ABCあいう
		PRINTFORML <TEST1> = {RESULT}
		STR:0 = ABCあいう
		STRLENS STR:0
		PRINTFORML <TEST2> = {RESULT}
		STRLENFORM abc%STR:0%
		PRINTFORML <TEST3> = {RESULT}

		;STRLENS also supports string expressions
		STRLENS "abc" + STR:0
		PRINTFORML <TEST4> = {RESULT}
		WAIT
    ``` 
    ``` title="Result"
	<TEST1> = 9
	<TEST2> = 9
	<TEST3> = 12
	<TEST4> = 12
    ```


---

# SUBSTRING.en
---
---
hide:
  - toc
---

# SUBSTRING

| Function name                                                             | Arguments                | Return   |
| :----------------------------------------------------------------------- | :---------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`SUBSTRING`](./SUBSTRING.md)       | `string`, `int`, `int`  | `string` |
| ![](../assets/images/IconEmuera.webp)[`SUBSTRINGU`](./SUBSTRING.md)      | `string`, `int`, `int`  | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string SUBSTRING string, startPosition, characterCount
	string SUBSTRINGU string, startPosition, characterCount
    ```
	Returns a substring starting from the position specified by the first argument, with the number of characters specified by the second argument.  
	The starting position uses 0 for the first character of the string. If a position beyond the string length is specified, an empty string is returned.  
	For `SUBSTRING`, the character count is specified in SHIFT-JIS bytes, meaning full-width characters are counted as 2. `SUBSTRINGU` uses Unicode counting, so full-width characters are counted as 1.  
	If a negative value is specified for the character count, or if a position beyond the end of the original string is specified, it returns the string from the starting position to the end.  
	If the starting or ending position falls in the middle of a character (e.g., in the middle of a full-width character), it is treated as if the next position was specified.  
	Be careful: this may result in a string that is 1 character longer than the specified character count.  

!!! hint "Hint"

    Supported as both command and expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		STR:0 = 01234あいうえお
		SUBSTRING STR:0, 0, -1
		PRINTFORML <TEST1> = %RESULTS:0%
		SUBSTRING STR:0, 1, 3
		PRINTFORML <TEST2> = %RESULTS:0%
		SUBSTRING STR:0, 6, 3
		PRINTFORML <TEST3> = %RESULTS:0%
		WAIT
    ``` 
    ``` title="Result"
	<TEST1> = 01234あいうえお
	<TEST2> = 123
	<TEST3> = いう
    ```

### See Also
- [STRFIND](STRFIND.md)


---

# SUMARRAY.en
---
---
hide:
  - toc
---

# SUMARRAY

| Function name                                                     | Arguments                     | Return |
| :--------------------------------------------------------------- | :--------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SUMARRAY`](./SUMARRAY.md) | `integerArray`(, `int`, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SUMARRAY integerArray(, startIndex, endIndex)
    ```
	Returns the sum of array values.  
	Specify a one-dimensional integer array in `integerArray` to calculate the sum of elements from `startIndex` to less than `endIndex`.  
	If `endIndex` is omitted, the sum extends to the end of the array.  
	`RESULT = SUMARRAY(X, A, B)` is equivalent to:

		RESULT = 0
		FOR COUNT, A, B
			RESULT += X:COUNT
		REND

	Note that values up to `X:(B - 1)` are added, and `X:B` is not added.
	Only one-dimensional integer array variables can be specified for `integerArray`; string variables and multidimensional arrays cannot be used.
	If a character array such as `CFLAG` is specified for `integerArray`, only the specified characters are summed.

!!! hint "Hint"

    Both command and expression function forms are available.


---

# SWAP.en
---
---
hide:
  - toc
---

# SWAP

| Function name                                               | Arguments             | Return |
| :---------------------------------------------------------- | :-------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SWAP`](./SWAP.md) | `variable`, `variable` | none   |

!!! info "API"

    ```  { #language-erbapi }
	SWAP variable, variable
    ```
	Swaps the contents of variable1 and variable2.  
	The two variables to be swapped must be of the same type (integer and integer, or string and string).

!!! hint "Hint"

    Command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIM AAA
		#DIM BBB

		AAA = 123
		BBB = 456

		REPEAT 2
			PRINTFORML AAA:{AAA} BBB:{BBB}
			SWAP AAA, BBB
		REND
		WAIT
    ``` 
    ``` title="Result"
	AAA:123 BBB:456
	AAA:456 BBB:123
    ```


---

# SWAPCHARA.en
---
---
hide:
  - toc
---

# SWAPCHARA

| Function name                                                     | Arguments      | Return |
| :--------------------------------------------------------------- | :------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`SWAPCHARA`](./SWAPCHARA.md) | `int`, `int` | none   |

!!! info "API"

    ```  { #language-erbapi }
	SWAPCHARA charaID, charaID
    ```
    Swaps the registration numbers of the two specified characters.


!!! hint "Hint"

    Command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		;Assume only MASTER exists
		ADDCHARA 10
		ADDCHARA 11
		PRINTFORML NO:1 = {NO:1}, NO:2 = {NO:2}
		SWAPCHARA 1,2
		PRINTFORMW NO:1 = {NO:1}, NO:2 = {NO:2}
    ``` 
    ``` title="Result"
	NO:1 = 10, NO:2 = 11
	NO:1 = 11, NO:2 = 10
    ```

### Related
- [SORTCHARA](SORTCHARA.md)


---

# TEXTBOX.en
---
---
hide:
    - toc
---

# Text Input Field Functions

| Function name                                                       | Arguments              | Return   |
| :----------------------------------------------------------------- | :-------------------- | :------- |
| ![](../assets/images/IconEE.webp)[`SETTEXTBOX`](./TEXTBOX.md)    | `string`              | `1`      |
| ![](../assets/images/IconEE.webp)[`GETTEXTBOX`](./TEXTBOX.md)    | none                  | `string` |
| ![](../assets/images/IconEM.webp)[`MOVETEXTBOX`](./TEXTBOX.md)   | `int`, `int`, `int`  | `1`      |
| ![](../assets/images/IconEM.webp)[`RESUMETEXTBOX`](./TEXTBOX.md) | none                  | `1`      |

!!! info "API"

    ``` { #language-erbapi }
    1 SETTEXTBOX text
    string GETTEXTBOX
    1 MOVETEXTBOX xPos, yPos, width
    1 RESUMETEXTBOX
    ```

    - `SETTEXTBOX`: Replaces the text box content with `text`.
    - `GETTEXTBOX`: Returns the string currently entered in the text box.
    - `MOVETEXTBOX`: Moves the text box to the specified position with the specified width when the next `INPUT`/`INPUTS` is executed.
        - Reference position (`xPos`, `yPos`) = (`0`, `0`) is the bottom-left of the screen. Positive `yPos` is upward.
        - When the screen is scrolled up (to view history), the text box temporarily returns to its original position.
        - After `INPUT`/`INPUTS` ends, the text box returns to its original position.
    - `RESUMETEXTBOX`: Cancels the previous `MOVETEXTBOX` and returns the text box to its original position.

!!! hint "Hint"

    Available as both command and function in expressions.


---

# THROW.en
---
---
hide:
  - toc
---

# THROW

| Function name                                                   | Arguments  | Return |
| :------------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`THROW`](./THROW.md)   | `string` | none   |

!!! info "API"

    ```  { #language-erbapi }
	THROW formedString
    ```
    Forces an error and displays the error using the string provided as an argument.


!!! hint "Hint"

    Commands only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		THROW Unfortunately, the book of adventure has been lost
    ``` 
    ``` title="Result"
	Now Loading...
	THROW occurred at line 2 of MAIN.ERB
	THROW Unfortunately, the book of adventure has been lost
	THROW content: Unfortunately, the book of adventure has been lost
	Current function: @SYSTEM_TITLE (line 1 of MAIN.ERB)
	Function call stack:
	 ※※Log output to emuera.log ※※

    ```


---

# TIMES.en
---
---
hide:
  - toc
---

# TIMES

| Function name                                                 | Arguments     | Return |
| :------------------------------------------------------------ | :------------ | :----- |
| ![](../assets/images/Iconeramaker.webp)[`TIMES`](./TIMES.md) | `int`, `float` | none   |

!!! info "API"

    ```  { #language-erbapi }
	TIMES integerVariable, float
    ```
    Multiplies the first argument variable by the decimal value of the second argument. Fractional parts are truncated by default.


!!! hint "Hint"

    Command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIM HOGE

		HOGE = 100
		TIMES HOGE, 1.25
		PRINTFORML {HOGE}
		TIMES HOGE, 2.672
		PRINTFORMW {HOGE}
    ``` 
    ``` title="Result"
	125
	334
    ```


---

# TINPUT.en
---
---
hide:
  - toc
---

# TINPUT(S)

| Function name                                                      | Arguments                               | Return    |
| :----------------------------------------------------------------- | :-------------------------------------- | :-------- |
| ![](../assets/images/IconEmuera.webp)[`TINPUT`](./TINPUT.md)      | `int`, `int`(, `int`, `string`, `int`) | `int`     |
| ![](../assets/images/IconEmuera.webp)[`TINPUTS`](./TINPUT.md)    | `int`, `int`(, `int`, `string`, `int`) | `string`  |

!!! info "API"

    ```  { #language-erbapi }
	TINPUT timeLimit, defaultValue(, displayTimeRemain, timeOverMessage, allowClick)
	TINPUTS timeLimit, defaultValue(, displayTimeRemain, timeOverMessage, allowClick)
    ```
    Input acceptance command with time limit. The first argument is the time limit in milliseconds, but setting a value finer than 100ms will not result in accurate operation.  
    The second argument is the default return value on timeout.  
    The third argument determines whether to display the remaining time: 0 means hide, any other value means display. Default is 1 (display).  
    The fourth argument is the string displayed on timeout. If it is an empty string, the timer display is cleared and processing moves to the next step.  
    Note that if the fourth argument is set, the third argument cannot be omitted.  

    Also, in `TINPUTS`, macro expressions can be used as with [`INPUTS`](./INPUT.md).  

    To use '()' as a string, escape it using '.'

    In EM+EE, an optional fifth argument can be set.  
    When non-zero, mouse clicks are treated as Enter key presses (assigns an empty string to `RESULTS`. If a button is pressed, the button index is assigned to `RESULT:1`). Left click sets `RESULT:1` to 1, right click sets `RESULT:1` to 2. Also, if ++shift++, ++ctrl++, or ++alt++ is pressed at the same time, the key state is saved in `RESULT:2` (bits 16, 17, 18).  


!!! hint "Hint"

    Command only.

### See Also
- [INPUT](INPUT.md)
- [TONEINPUT](TONEINPUT.md)


---

# TOINT.en
---
---
hide:
  - toc
---

# TOINT, ISNUMERIC

| Function name                                                     | Arguments | Return |
| :--------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TOINT`](./TOINT.md)       | `string`  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`ISNUMERIC`](./TOINT.md)   | `string`  | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int TOINT string
	int ISNUMERIC string
    ```
	`TOINT` converts the argument string to a number and assigns it to `RESULT:0` or returns it. However, only strings composed of half-width digits can be converted.  
	If the argument cannot be interpreted as a number, `0` is assigned or returned. This applies to full-width digits as well.  
	If the value passed is indeterminate, using `ISNUMERIC` before `TOINT` improves code stability.  

	`ISNUMERIC` determines whether a string can be parsed as a number (i.e., whether a value can be obtained with `TOINT`).  
	If the argument can be interpreted as a number, it assigns or returns `1` to `RESULT:0`; otherwise, it assigns or returns `0`.  

!!! hint "Hint"

    Supported as both command and expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIMS HOGES
		REPEAT 3
			SELECTCASE COUNT
				CASE 0
					HOGES = 123
				CASE 1
					HOGES = 一二三
				CASE 2
					HOGES = １２３
			ENDSELECT
			IF ISNUMERIC(HOGES)
				PRINTFORML Variable HOGES can be converted to numeric type ({TOINT(HOGES)})
			ELSE
				PRINTFORML Variable HOGES cannot be converted to numeric type (%HOGES%)
			ENDIF
		REND
		WAIT
    ``` 
    ``` title="Result"
	Variable HOGES can be converted to numeric type (123)
	Variable HOGES cannot be converted to numeric type (一二三)
	Variable HOGES cannot be converted to numeric type (１２３)
    ```

### See Also
- [TOSTR](TOSTR.md)


---

# TONEINPUT.en
---
---
hide:
  - toc
---

# TONEINPUT

| Function name                                                        | Arguments                                     | Return    |
| :------------------------------------------------------------------- | :-------------------------------------------- | :-------- |
| ![](../assets/images/IconEmuera.webp)[`TONEINPUT`](./TONEINPUT.md)   | `int`, `int`(, `int`, `string`, `int`)      | `int`     |
| ![](../assets/images/IconEmuera.webp)[`TONEINPUTS`](./TONEINPUT.md)  | `int`, `string`(, `int`, `string`, `int`)    | `string`  |

!!! info "API"

    ```  { #language-erbapi }
	TONEINPUT timeLimit, defaultValue(, displayTimeRemain, timeOverMessage, allowClick)
	TONEINPUTS timeLimit, defaultValue(, displayTimeRemain, timeOverMessage, allowClick)
    ```
    The arguments are the same as [`TINPUT` and `TINPUTS`](./TINPUT.md) respectively.  
    These are input acceptance commands that combine the properties of [`ONEINPUT`](./ONEINPUT.md) with TINPUT, and [`ONEINPUTS`](./ONEINPUT.md) with TINPUTS.  
    Note that when these commands are used, even if keyboard macros are configured in Emuera's CONFIG settings, they may not work properly - this is by design.  

    Also, in `TONEINPUTS`, macro expressions can be used as with [`INPUTS`](./INPUT.md).  
    To use '()' as a string, escape it using '.'

    In EM+EE, an optional fifth argument can be set.  
    When non-zero, mouse clicks are treated as Enter key presses (assigns an empty string to `RESULTS`. If a button is pressed, the button index is assigned to `RESULT:1`). Left click sets `RESULT:1` to 1, right click sets `RESULT:1` to 2. Also, if ++shift++, ++ctrl++, or ++alt++ is pressed at the same time, the key state is saved in `RESULT:2` (bits 16, 17, 18).  


!!! hint "Hint"

    Command only.

### See Also
- [TINPUT](TINPUT.md)
- [ONEINPUT](ONEINPUT.md)


---

# TOOLTIP_EXTENSION.en
---
---
hide:
  - toc
---

# TOOLTIP Extension

| Function name                                                                           | Arguments     |
| :------------------------------------------------------------------------------- | :------- |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_CUSTOM`](./TOOLTIP_EXTENSION.md)      | `int`    |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_SETFONT`](./TOOLTIP_EXTENSION.md)     | `string` |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_SETFONTSIZE`](./TOOLTIP_EXTENSION.md) | `int`    |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_FORMAT`](./TOOLTIP_EXTENSION.md)      | `int`    |

!!! info "API"

    ```  { #language-erbapi }
	TOOLTIP_CUSTOM bool
    TOOLTIP_SETFONT fontName
    TOOLTIP_SETFONTSIZE fontSize
    TOOLTIP_FORMAT formatFlags
    ```

	Tooltip feature extension for `HTML_PRINT`.
    
	- `TOOLTIP_CUSTOM`: To use the tooltip extension features below, specify a non-zero value for the argument to turn the feature on. Specifying 0 turns it off and returns to the traditional tooltip display.
	- `TOOLTIP_SETFONT`: Specifies the font name to be applied within the tooltip.
	- `TOOLTIP_SETFONTSIZE`: Specifies the font size to be applied within the tooltip.
	- `TOOLTIP_FORMAT`: Specifies the text format within the tooltip. The argument follows C#'s [`TextFormatFlags`](https://learn.microsoft.com/en-us/dotnet/api/system.windows.forms.textformatflags?view=netframework-4.8).
	- The existing `TOOLTIP_SETCOLOR` from the original version now works. It is applied when tooltip extension is enabled.
	- Allows using `<br>` tags within tooltips. This works even when tooltip extension is off.

!!! hint "Hint"

    Command-only feature.


!!! example "Example" 
 
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		TOOLTIP_CUSTOM 1
		TOOLTIP_SETCOLOR 0x00AA00, 0x00FF00
		TOOLTIP_SETFONT "Ariel"
		TOOLTIP_SETFONTSIZE 24
		TOOLTIP_FORMAT 2;Right Alignment

		HTML_PRINT "<nonbutton title='tooltip<br>123'>テキスト1</nonbutton>"
		PRINTL 
		PRINTL 
		PRINTL 
		WAIT

		TOOLTIP_SETCOLOR 0x333333, 0xAAAAAA
		TOOLTIP_SETFONT "ＭＳ 明朝"
		TOOLTIP_SETFONTSIZE 12
		TOOLTIP_FORMAT 1;Center
		HTML_PRINT "<nonbutton title='古池や<br>蛙飛びこむ<br>水の音'>テキスト2</nonbutton>"
		PRINTL 
		PRINTL 
		PRINTL 
		WAIT
    ``` 
	![](../assets/images/TOOLTIP_EXTENSION1.png)
	![](../assets/images/TOOLTIP_EXTENSION2.png)

### See Also
- [Tooltip Display Operations](TOOLTIP_SET.md)
- [TOOLTIP_SETCOLOR](TOOLTIP_SETCOLOR.md)


---

# TOOLTIP_SET.en
---
---
hide:
  - toc
---

# TOOLTIP_SETDELAY, TOOLTIP_SETDURATION

| Function name                                                                         | Arguments    | Return |
| :----------------------------------------------------------------------------- | :------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`TOOLTIP_SETDELAY`](./TOOLTIP_SET.md)    | `int`   | none   |
| ![](../assets/images/IconEmuera.webp)[`TOOLTIP_SETDURATION`](./TOOLTIP_SET.md) | `int`   | none   |

!!! info "API"

    ```  { #language-erbapi }
	TOOLTIP_SETDELAY milliSecond
	TOOLTIP_SETDURATION milliSecond
    ```
	`TOOLTIP_SETDELAY` sets the time in milliseconds before the tooltip is displayed.  
	The default is 500 (milliseconds), and the maximum value is 32767.  

	`TOOLTIP_SETDURATION` sets the display duration of the tooltip in milliseconds. Specifying 0 uses the default display duration.

!!! hint "Hint"

    Only commands are supported.

### See Also
- [Tooltip Extension](TOOLTIP_EXTENSION.md)
- [TOOLTIP_SETCOLOR](TOOLTIP_SETCOLOR.md)


---

# TOOLTIP_SETCOLOR.en
---
---
hide:
  - toc
---

# TOOLTIP_SETCOLOR

| Function name                                                                           | Arguments         | Return |
| :------------------------------------------------------------------------------- | :----------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TOOLTIP_SETCOLOR`](./TOOLTIP_SETCOLOR.md) | `int`, `int` | none   |

!!! info "API"

    ```  { #language-erbapi }
	TOOLTIP_SETCOLOR colorCode, colorCode
    ```
	Sets the foreground and background color of the tooltip using numeric values in 0xRRGGBB format. The first argument is the text color, and the second is the background color.  
	If you want to use R,G,B values or strings, use the [`COLOR_FROMRGB`](./COLOR_FROM.md) or [`COLOR_FROMNAME`](./COLOR_FROM.md) functions.  

	This command does not work in the original Emuera. It works when used together with [`TOOLTIP_CUSTOM`](./TOOLTIP_EXTENSION.md) added in EM+EE.  

!!! hint "Hint"

    Only commands are supported.

### See Also
- [Tooltip Extension](TOOLTIP_EXTENSION.md)
- [Tooltip Display Operations](TOOLTIP_SET.md)


---

# TOSTR.en
---
---
hide:
  - toc
---

# TOSTR

| Function name                                                 | Arguments      | Return   |
| :------------------------------------------------------------ | :------------ | :------- |
| ![](../assets/images/IconEmuera.webp)[`TOSTR`](./TOSTR.md)   | `int`, `option` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string TOSTR int, option
    ```
	Command that converts a number to a string.
	Specify the number to convert as the first argument, and the format as a string in the second argument.  
	The second argument can be omitted; when omitted, it simply becomes a string (similar to `{}` in [`PRINTFORM`](./PRINT.md)).  
	This function internally calls C#'s [`Int64.ToString()` function](https://learn.microsoft.com/en-us/dotnet/api/system.int64.tostring), so C# format specifiers can be used. If the second argument is invalid, an error occurs.  
	For simple format specifier examples, see the expression function with the same name. For detailed format specifications, refer to websites explaining C# numeric format strings.  

!!! hint "Hint"

    Supported as both command and expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		A = 438765
		PRINTSL TOSTR(A)
		PRINTSL TOSTR(A, "x")
		PRINTSL TOSTR(A, "X")
		PRINTSL TOSTR(A, "D8")
		PRINTSL TOSTR(A, "X8")
		PRINTSL TOSTR(A, "00000000")
		PRINTSL TOSTR(A, "########")
		PRINTSL TOSTR(A, "#,###")
		PRINTSL TOSTR(A, "0000万0000")
    ``` 
    ``` title="Result"
	438765　//standard
	6b1ed　//"x" hexadecimal (lowercase)
	6B1ED　//"X" hexadecimal (uppercase)
	00438765　//"D8" decimal + 8 digits
	0006B1ED　//"X8" hexadecimal + 8 digits
	00438765　//"00000000" decimal + 8 digits
	438765　//"########" decimal
	438,765　//"#,###" comma every 3 digits
	0043万8765　//"0000万0000" 8 digits + "万" at 4th position
    ```

### See Also
- [TOINT](TOINT.md)


---

# TOUPPER.en
---
---
hide:
  - toc
---

# TOUPPER, TOLOWER, TOHALF, TOFULL

| Function name                                                      | Arguments | Return   |
| :----------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`TOUPPER`](./TOUPPER.md)   | `string`  | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOLOWER`](./TOUPPER.md)   | `string`  | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOHALF`](./TOUPPER.md)    | `string`  | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOFULL`](./TOUPPER.md)    | `string`  | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string TOUPPER string
	string TOLOWER string
	string TOHALF string
	string TOFULL string
    ```
	Applies specific conversions to the argument string and assigns the result to `RESULTS:0` or returns it.  
	`TOUPPER` converts alphabets to uppercase. `TOLOWER` converts to lowercase.  
	`TOHALF` converts full-width characters to half-width, but full-width characters without corresponding half-width equivalents remain unchanged.  
	`TOFULL` converts half-width characters to full-width.  

!!! hint "Hint"

    Supported as both command and expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
	PRINTFORML %TOUPPER("eRAseRmOToRpHAntOM")%
	PRINTFORML %TOLOWER("BEATMANIA")+"IIDX"%
	PRINTFORML %TOHALF("パルスのファルシのルシがパージでコクーン")%
	PRINTFORMW %TOFULL("SUGOI DEKAI")%
    ``` 
    ``` title="Result"
	ERASERMOTORPHANTOM
	beatmaniaIIDX
	ﾊﾟﾙｽのﾌｧﾙｼのﾙｼがﾊﾟｰｼﾞでｺｸｰﾝ
	ＳＵＧＯＩ　ＤＥＫＡＩ
    ```


---

# TRY.en
---
---
hide:
  - toc
---

# TRYJUMP, TRYCALL, TRYGOTO

| Function name | Arguments | Return |
| :--------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TRYCALL`](./TRY.md) | `functionName`(, `any`...) | none   |
| ![](../assets/images/IconEmuera.webp)[`TRYJUMP`](./TRY.md) | `functionName`(, `any`...) | none   |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTO`](./TRY.md) | `labelName`                | none   |

!!! info "API"

    ```  { #language-erbapi }
	TRYCALL functionName(, `argument`...)
	TRYJUMP functionName(, `argument`...)
	TRYGOTO labelName
    ```
	Same as [`JUMP`](./JUMP.md), [`CALL`](./CALL.md), and [`GOTO`](./GOTO.md), but does not throw an error even if the specified function does not exist.  
	If the specified function does not exist, nothing happens.  
	`TRYJUMP` and `TRYCALL` can accept arguments. See the [function argument specification](../Emuera//function.md#_2) section for details.  
	Note: If entering an [`IF～ELSEIF～ELSE～ENDIF`](./IF.md) block directly via `TRYGOTO`, execution proceeds normally up to just before `ELSEIF`, `ELSE`, or `ENDIF`, then jumps to the line after `ENDIF`.  
	Also, if entering a [`REPEAT～REND`](./REPEAT.md) block directly, execution proceeds normally up to just before `REND`, then continues from the next line, ignoring `REND`.  
	These behaviors are processed the same as `GOTO` and other GOTO-related commands. For other loop/branch syntax added in Emuera, see [Loop/Branch Syntax](../Reference/README.md#_8) and the [TRYC system](./TRYC.md).

!!! hint "Hint"

    Only available as a statement.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		TRYCALL AAA
		TRYCALL BBB
		TRYCALL CCC
		WAIT

	@AAA
		PRINTL AAA

	@CCC
		PRINTL CCC
    ``` 
    ``` title="Result"
	AAA
	CCC
    ```

### Related
- [TRY◯◯FORM](TRYFORM.md)
- [CALL](CALL.md)
- [JUMP](JUMP.md)
- [GOTO](GOTO.md)


---

# TRYC.en
---
---
hide:
  - toc
---

# TRYC system

| Function name | Arguments | Return |
| :--------------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TRYCCALL`](./TRYC.md)     | `functionName`(, `any`...) | none   |
| ![](../assets/images/IconEmuera.webp)[`TRYCJUMP`](./TRYC.md)     | `functionName`(, `any`...) | none   |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTO`](./TRYC.md)      | `labelName`                | none   |
| ![](../assets/images/IconEmuera.webp)[`TRYCCALLFORM`](./TRYC.md) | `functionName`(, `any`...) | none   |
| ![](../assets/images/IconEmuera.webp)[`TRYCCALLFORM`](./TRYC.md) | `functionName`(, `any`...) | none   |
| ![](../assets/images/IconEmuera.webp)[`TRYCGOTOFORM`](./TRYC.md) | `labelName`                | none   |
| ![](../assets/images/IconEmuera.webp)[`CATCH`](./TRYC.md)        | none                       | none   |
| ![](../assets/images/IconEmuera.webp)[`ENDCATCH`](./TRYC.md)     | none                       | none   |

!!! info "API"

    ```  { #language-erbapi }
	TRYCCALL functionName(, argument...)
	TRYCJUMP functionName(, argument...)
	TRYCJUMP labelName
	TRYCCALLFORM formedString(, argument...)
	TRYCJUMPFORM formedString(, argument...)
	TRYCGOTOFORM formedString
	CATCH
	ENDCATCH
    ```
	Controls the behavior when a function is not found during TRYC system function calls.  
	If the function exists, it calls the function and executes the lines after TRYC; if it does not exist, it executes the lines after CATCH.  
	Grammatically, this is similar to [`IF～ELSE～ENDIF`](./IF.md) (the difference is that if the function exists, you may omit the processing).  
	Therefore, if entering the `TRYC～CATCH～ENDCATCH` block directly via [`GOTO`](./GOTO.md) or similar commands, execution proceeds normally up to just before `CATCH` and `ENDCATCH`, then jumps to the line after `ENDCATCH`, similar to [`IF～ELSEIF～ELSE～ENDIF`](./IF.md).  
	Also, for entering loop/branch syntax directly via `TRYCGOTO` or `TRYCGOTOFORM`, see [`TRYGOTO`](./TRY.md) and [Loop/Branch Syntax](../Reference/README.md#_8).

    ```  { #language-erbapi }
		TRYCCALL UNKNOWN_FUNC ;Function that does not exist
			;Processing after function execution if function existed (optional; can be omitted and go directly to CATCH)
		CATCH
			;Processing when function does not exist
		ENDCATCH
	```

	Note: Nesting is possible.

!!! hint "Hint"

    Only available as a statement.

### Related
- [TRY system](TRY.md)
- [CALL](CALL.md)
- [JUMP](JUMP.md)
- [GOTO](GOTO.md)


---

# TRYCALLF.en
---
---
hide:
  - toc
---

# TRYCALLF

| Function name | Arguments | Return |
| :----------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEE.webp)[`TRYCALLF`](./TRYCALLF.md) | `string` | `void` |

!!! info "API"

	``` { #language-erbapi }
	TRYCALLF funcName
    ```

	The TRY version of `CALLF`. Does not throw an error even if the called function does not exist; however, like `CALLF`, the return value of `RETURNF` is discarded.

!!! hint "Hint"

	Only available as a statement.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE

		TRYCALLF NULL
		TRYCALLF TEST
		WAIT

	@TEST
	#FUNCTION

		PRINT Called "TEST" function.
		RETURNF 0
	```

	``` title="Result"
	Called "TEST" function.
	```

### Related
- [CALLF](CALLF.md)
- [TRYCALLFORMF](TRYCALLFORMF.md)


---

# TRYCALLFORMF.en
---
---
hide:
  - toc
---

# TRYCALLFORMF

| Function name | Arguments | Return |
| :------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEE.webp)[`TRYCALLFORMF`](./TRYCALLFORMF.md) | `string` | `void` |

!!! info "API"

	``` { #language-erbapi }
	TRYCALLFORMF funcName
    ```

	The TRY version of `CALLFORMF`. Does not throw an error even if the called function does not exist; however, like `CALLFORMF`, the return value of `RETURNF` is discarded.

!!! hint "Hint"

	Only available as a statement.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE

		REPEAT 5
			TRYCALLFORMF TEST{COUNT}
			SIF !LINEISEMPTY()
				PRINTL 
		REND
		WAIT

	@TEST1
	#FUNCTION

		PRINT Called "TEST1" function.
		RETURNF 0

	@TEST3
	#FUNCTIONS

		PRINT Called "TEST3" function.
		RETURNF "HOGE"
	```

	``` title="Result"
	Called "TEST1" function.
	Called "TEST3" function.
	```

### Related
- [CALLF](CALLF.md)
- [TRYCALLF](TRYCALLF.md)


---

# TRYFORM.en
---
---
hide:
  - toc
---

# TRYCALLFORM, TRYJUMPFORM, TRYGOTOFORM

| Function name | Arguments | Return |
| :----------------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TRYCALLFORM`](./TRYFORM.md) | `formedString`(, `any`...) | none   |
| ![](../assets/images/IconEmuera.webp)[`TRYJUMPFORM`](./TRYFORM.md) | `formedString`(, `any`...) | none   |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTOFORM`](./TRYFORM.md) | `formedString`             | none   |

!!! info "API"

    ```  { #language-erbapi }
	TRYCALLFORM formedString(, argument...)
	TRYJUMPFORM formedString(, argument...)
	TRYGOTOFORM formedString
    ```
	Same as [`JUMP`](./JUMP.md), [`CALL`](./CALL.md), and [`GOTO`](./GOTO.md), but allows specifying function names in the same format as [`PRINTFORM`](./PRINT.md), and does not throw an error even if the function does not exist.  
	`TRYJUMPFORM` and `TRYCALLFORM` can accept arguments. See the [function argument specification](../Emuera//function.md#_2) section for details.  
	Note: For entering loop/branch syntax directly via `TRYGOTOFORM`, see [`TRYGOTO`](./TRY.md), [Loop/Branch Syntax](../Reference/README.md#_8), and the [TRYC system](./TRYC.md).

!!! hint "Hint"

    Only available as a statement.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIMS HOGE
		HOGES = AAA

		TRYCALLFORM %HOGES%
		TRYCALLFORM %HOGES%BBB
		TRYJUMPFORM %"C"*3%

	@AAA
		PRINTL AAA

	@BBB
		PRINTL BBB

	@CCC
		PRINTL CCC
		WAIT
    ``` 
    ``` title="Result"
	AAA
	CCC
    ```

### Related
- [TRY system](TRY.md)
- [CALL](CALL.md)
- [JUMP](JUMP.md)
- [GOTO](GOTO.md)


---

# TRYLIST.en
---
---
hide:
  - toc
---

# TRYLIST system

| Function name | Arguments | Return |
| :----------------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TRYCALLLIST`](./TRYLIST.md) | none                       | none   |
| ![](../assets/images/IconEmuera.webp)[`TRYJUMPLIST`](./TRYLIST.md) | none                       | none   |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTOLIST`](./TRYLIST.md) | none                       | none   |
| ![](../assets/images/IconEmuera.webp)[`FUNC`](./TRYLIST.md)        | `functionName`(, `any`...) | none   |
| ![](../assets/images/IconEmuera.webp)[`ENDFUNC`](./TRYLIST.md)     | none                       | none   |

!!! info "API"

    ```  { #language-erbapi }
	TRYCALLLIST
	TRYJUMPLIST
	TRYGOTOLIST
	FUNC functionName(, argument...)
	ENDFUNC
    ```
	A syntax to specify multiple functions (labels) and call only the first one found.  
	No statements other than the above syntax can be written within `TRYLIST～ENDFUNC`.  
	Note: For entering loop/branch syntax directly via `TRYGOTOLIST`, see [`TRYGOTO`](./TRY.md), [Loop/Branch Syntax](../Reference/README.md#_8), and the [TRYC system](./TRYC.md).  
	Used as follows:

    ```  { #language-erbapi }
	TRYCALLLIST
		FUNC function1
		FUNC function2
	ENDFUNC
    ```

	Attempts to call the function specified by `FUNC` in order; if successful, proceeds to `ENDFUNC` after calling; if failed, moves to the next `FUNC` (or `ENDFUNC`).  
	This is equivalent to:

    ```  { #language-erbapi }
	TRYCCALL function1
	CATCH
		TRYCCALL function2
		CATCH
		ENDCATCH
	ENDCATCH
    ```

!!! hint "Hint"

    Only available as a statement.

### Related
- [TRY system](TRY.md)
- [TRYC system](TRYC.md)
- [CALL](CALL.md)
- [JUMP](JUMP.md)
- [GOTO](GOTO.md)


---

# TWAIT.en
---
---
hide:
  - toc
---

# TWAIT

| Function name                                                      | Arguments     | Return |
| :----------------------------------------------------------------- | :------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`TWAIT`](./TWAIT.md)        | `int`, `int` | none   |

!!! info "API"

    ```  { #language-erbapi }
	TWAIT timeLimit, forceWait
    ```
    The first argument is the time limit, the second argument is the input acceptance flag.  
    Pauses execution until the time limit elapses.  
    The actual behavior changes depending on the input acceptance flag setting:  

    - Input acceptance flag = 0: Accepts input, proceeds even before the time limit if input occurs
    - Input acceptance flag != 0: Does not accept input (can forcibly wait until the time limit)


!!! hint "Hint"

    Command only.

### See Also
- [WAIT](WAIT.md)
- [TINPUT](TINPUT.md)


---

# UNICODE.en
---
---
hide:
  - toc
---

# UNICODE, ENCODETOUNI

| Function name                                                         | Arguments            | Return   |
| :------------------------------------------------------------------- | :------------------ | :------- |
| ![](../assets/images/IconEmuera.webp)[`UNICODE`](./UNICODE.md)       | `int`               | `string` |
| ![](../assets/images/IconEmuera.webp)[`ENCODETOUNI`](./UNICODE.md)   | `string`             | `int`    |

!!! info "API"

    ```  { #language-erbapi }
	string UNICODE characterCode
	int ENCODETOUNI string(, position)
    ```
	`UNICODE` is a command/expression function that returns the Unicode character corresponding to the argument value.  
	For example, the following script displays a hollow heart mark.  
	However, this function cannot handle surrogate pairs.  
	Also, the font must support it to display correctly.  

    ```  { #language-erbapi }
	UNICODE 0x2661
	PRINTFORMW %RESULTS%
    ```

	Note that Emuera's Unicode support is not complete.  
	For example, Emuera does not guarantee correct behavior when using surrogate pairs.  

	`ENCODETOUNI` encodes the given string to Unicode and returns the byte values as numbers.  
	For commands:
	- RESULT:0: Number of characters
	- RESULT:1~: Byte values

	For expression functions, it converts the character at the target position to a Unicode code value and returns it. The position can be omitted, in which case position `0` (first character) is targeted.  

!!! hint "Hint"

    Supported as both command and expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIMS HOGES = @"%UNICODE(0x2661)%"
		PRINTFORMW %HOGES% %CONVERT(ENCODETOUNI(HOGES), 16)%
    ``` 
    ``` title="Result"
	♡ 2661
    ```


---

# UPCHECK.en
---
---
hide:
  - toc
---

# UPCHECK

| Function name                                                             | Arguments | Return |
| :----------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`UPCHECK`](./UPCHECK.md) | none      | none   |

!!! info "API"

    ```  { #language-erbapi }
	UPCHECK
    ```
    Adds the `UP` and `DOWN` status values of `TARGET` to `PALAM` and displays the change amounts.


!!! hint "Hint"

    Command only.


!!! example "Example" 
    ``` { #language-erb title="PALAM.csv" }
	0,Ability0
	1,Ability1
	2,Ability2
	```
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		ADDVOIDCHARA
		TARGET = 0
		UP:0 = 123
		UP:1 = 456
		UP:2 = 789

		UPCHECK
		WAIT
    ``` 
    ``` title="Result"
	Ability0 0+123=123
	Ability1 0+456=456
	Ability2 0+789=789
    ```

### Related Items
- [CUPCHECK](CUPCHECK.md)


---

# UPDATECHECK.en
---
---
hide:
  - toc
---

# UPDATECHECK

| Function name                                                     | Arguments | Return |
| :--------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`UPDATECHECK`](./UPDATECHECK.md) | `void`    | `int`  |

!!! info "API"

	``` { #language-erbapi }
	UPDATECHECK
	```

	Gets version information from the URL listed in `GameBase.csv` and prompts for update via dialog box if an update is available.

	- 1, Add "Version Name" and "Version Info URL" to GameBase.csv
		- The version name can be any version string, and the URL should be a URL for version checking
	- 2, Upload a text file with version info and latest version link to the above URL
		- Write the latest version name on the first line, and the link on the second line. Third line and beyond can be comments etc.
		- If using a public Git, you can push to the repository and reference via raw
	- 3, When UPDATECHECK is executed, access the URL in GameBase.csv; if the current version differs from the latest, ask the player via dialog box whether to open the server-side link
		- If already at the latest version, RESULT is set to 0 and ends
	- 4, If "Yes" is selected, open the browser and RESULT is set to 2. If "No" is selected, do nothing and RESULT is set to 1. If the link is not found, or the link doesn't contain version info/latest link, RESULT is set to 3 on failure.

	Also, a "Disable Update Check" option is added to config; if this is on when UPDATECHECK is executed, nothing happens but RESULT is set to 4.
	
	In 11fix, RESULT is set to 5 if not connected to the network.

!!! hint "Hint"

    Command only.

!!! example "Example"
	``` { #language-csv title="GameBase.csv" }
	Version Info URL, C:\test.txt
	Version.1.00
	```

	``` title="C:\test.txt"
	1.01
	https://evilmask.gitlab.io/emuera.em.doc/
	```

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		UPDATECHECK
	```

	![](../assets/images/UPDATECHECK.png)


---

# VAR.en
---
---
hide:
  - toc
---

# VARI, VARS

| Function name                                                  | Arguments             | Return |
| :---------------------------------------------------------- | :------------------- | :----- |
| ![](../assets/images/Icondotnet.webp)[`VARI`](./VAR.md) | `string`(, `int`)   | none   |
| ![](../assets/images/Icondotnet.webp)[`VARS`](./VAR.md) | `string`(, `int`)   | none   |


!!! info "API"

    ```  { #language-erbapi }
	VARI variableName = intValue
	VARS variableName = strValue
	VARI variableName(, arraySize)
	VARS variableName(, arraySize)
    ```

	You can define dynamically scoped local variables anywhere within a function.  
	`VARI` is for integers, `VARS` is for strings.  
	Arrays are not given as initial values, and strings must be enclosed in `"~"`.

    ```  { #language-erbapi }
	VARS QUESTION = "生命、宇宙、そして万物についての究極の疑問の答え"
	VARI ANSWER = 42
	PRINTFORML Q.%QUESTION%
	PRINTFORML A.{ANSWER}

	VARI INTEGER, 3

	REPEAT 4
		INTEGER:COUNT = COUNT*14
		PRINTFORML {INTEGER:COUNT}
	REND
    ```

    ``` title="Result"
	Q.生命、宇宙、そして万物についての究極の疑問の答え
	A.42

	0
	14
	28
	42
    ```

!!! hint "Hint"

    Command only.

### Related Items
- [Functions/Preprocessor>#DIM](../Emuera/function.md#dim)


---

# VARSET.en
---
---
hide:
  - toc
---

# VARSET

| Function name                                                   | Arguments                                 | Return |
| :------------------------------------------------------------- | :---------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`VARSET`](./VARSET.md) | `variable`(, `value`, `startIndex`, `endIndex`) | none   |

!!! info "API"

    ```  { #language-erbapi }
	VARSET variableName(, value, startIndex, endIndex)
    ```
	Assigns the value of the second argument to the specified range of the array of the specified variable.  
	If the second argument is omitted, `0` or empty string is assigned.  
	If the third argument and beyond are omitted, assignment is made to all elements of the array.  
	For example:

    ```  { #language-erbapi }
	VARSET FLAG, 0
	VARSET STR, "あああ", 0, 10
	VARSET TA:0:0:0,5678
    ```

	In this example, all elements of `FLAG` become `0`.  
	`STR:0` to `STR:9` are assigned "あああ", and all elements of the three-dimensional array `TA` are assigned `5678`.  
	The same can be done using [`FOR-NEXT`](./FOR.md) loops in ERB, but when the loop count reaches tens of thousands, the execution time becomes non-negligible.  
	The `VARSET` command can complete processing much faster than assignment in ERB.  
	When a character variable is the target of `VARSET`, only the elements of the specified character are assigned.

    ```  { #language-erbapi }
	VARSET CFLAG:MASTER:0, 0
	VARSET CSTR, ""
    ```

	In this example, `CFLAG:0～999` of `MASTER` (if VariableSize.csv has not been changed) become `0`, but the `CFLAG` of other characters are not affected.  
	Also, if the target is omitted, it is treated as `TARGET` as usual, so all `CSTR` of `TARGET` become empty strings. The `CSTR` of other characters are not affected.  
	When used on non-1-dimensional arrays and non-array character variables such as `DITEMTYPE` or `TA`, the third argument and beyond are ignored, and assignment is made to all elements of the array.

!!! hint "Hint"

    Command only.

### Related Items
- [VARSETEX](VARSETEX.md)


---

# VARSETEX.en
---
---
hide:
  - toc
---

# VARSETEX

| Function name                                                   | Arguments                           | Return |
| :------------------------------------------------------------- | :---------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`VARSETEX`](./VARSETEX.md) | `string`, `any`(, `int`, `int`, `int`) | `1`    |

!!! info "API"

    ```  { #language-erbapi }
    1 VARSETEX varName, value(, setAllDim, from, to)
    ```
    
    Similar to the original version of [`VARSET`](VARSET.md). Instead of directly using an identifier, assigns `value` to the array of the variable name represented by `varName`.  
	If `setAllDim` is not `0` or omitted, assigns `value` to all dimensions of the array. Otherwise, only assigns to the lowest dimension.  
	You can specify the start and end positions of elements with `from` and `to` (elements at the `to` position are not included). If `to` is omitted, assignment continues to the end of that dimension's array. If `from` is omitted, assignment starts from position `0` of that dimension's array.

!!! hint "Hint"

    Both command and expression function are supported.


!!! example "Example" 
    
    ``` { #language-erh title="DEFINE.ERH" }
    #DIM 整数配列 = 1, 2, 3, 4, 5, 6
    #DIM 整数配列2D, 3, 4
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS ローカル文字列 = "Cat1", "Cat2", "Cat3"
        #DIM i
        #DIM j

        ; Second argument omission: planned for v8
        ; VARSETEX "ローカル文字列"
        VARSETEX "ローカル文字列", "dog"
        FOR i, 0, 3
            PRINTS ローカル文字列:i+" "
        NEXT
        PRINTL
        ; For 1D arrays, third argument can be any value
        VARSETEX "整数配列", -1, 0, 3, 5
        FOR i, 0, 6
            PRINTFORM {整数配列:i} 
        NEXT
        PRINTL
        ; Start position is index 1, row 2 (actually starts at index 2 because 4th arg is 1)
        ; Third arg is 0 so only array 1 is valid
        VARSETEX "整数配列2D:1:2", -1, 0, 1
        FOR j, 0, 3
            PRINTFORM Array{j} -> 
            FOR i, 0, 4
                PRINTFORM {整数配列2D:j:i, 2, RIGHT} 
            NEXT
            PRINTL
        NEXT
        PRINTL
        VARSET 整数配列2D

        ; Third argument omitted
        VARSETEX "整数配列2D:1:2", -1
        FOR j, 0, 3
            PRINTFORM Array{j} -> 
            FOR i, 0, 4
                PRINTFORM {整数配列2D:j:i, 2, RIGHT} 
            NEXT
            PRINTL
        NEXT

        ONEINPUT
    ``` 
    ``` title="Result"
    dog dog dog 
    1 2 3 -1 -1 6 
    Array0 ->  0  0  0  0 
    Array1 ->  0  0 -1 -1 
    Array2 ->  0  0  0  0 
    
    Array0 ->  0  0 -1 -1 
    Array1 ->  0  0 -1 -1 
    Array2 ->  0  0 -1 -1 
    ```

### Related Items
- [VARSET](VARSET.md)


---

# VARSIZE.en
---
---
hide:
  - toc
---

# VARSIZE

| Function name                                                           | Arguments                | Return |
| :--------------------------------------------------------------------- | :----------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`VARSIZE`](./VARSIZE.md)   | `variable`              | `int`  |
| ![](../assets/images/IconEmuera.webp)[`VARSIZE()`](./VARSIZE.md) | `variable`(, `dimension`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	VARSIZE variableName
	VARSIZE(variableName(, dimension))
    ```
	There are differences in specifications between command and expression function.  
	When used as a command, assigns the array size of the specified variable to `RESULT:0`.  
	For multidimensional array variables, sizes are assigned in order from the leftmost element: `RESULT:0`, `RESULT:1`, `RESULT:2`.  
	The array size is specified in `VariableSize.csv`.

    ```  { #language-erbapi }
	VARSIZE FLAG
	PRINTFORML <TEST1> = {RESULT:0}
	VARSIZE SAVESTR
	PRINTFORML <TEST2> = {RESULT:0}
	VARSIZE TALENT
	PRINTFORML <TEST3> = {RESULT:0}
	WAIT
    ```

	Result (when size has not been modified):

		<TEST1> = 10000
		<TEST2> = 100
		<TEST3> = 1000

	※ This does not actually reference the variable, so out-of-bounds array access will not occur.  
	　In the example above, even if `TARGET == -1`, it will not cause an error trying to reference TALENT of "-1st" character.

	When used as an expression function:

	```  { #language-erbapi }
	X = VARSIZE("FLAG")
    ```

	The variable must be specified as a string.  
	Also, when getting the size of multidimensional array variables such as `DITEMTYPE` or `TA`, the second argument specifies the dimension (from the leftmost element: `0, 1, 2`).  
	To get the element count of a multidimensional array at once, use the command form.  
	Also, when [`Align VARSIZE Dimension Specification with ERD Feature`](../Emuera/config.md#align-varsize-dimension-specification-with-erd-feature) added in EM+EE is enabled, the dimension specification becomes `1, 2, 3` from the left, matching the ERD system.

!!! hint "Hint"

    Both command and expression function are supported.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIM HOGE, 1, 2, 3
		#DIMS HOGES, 4, 5, 6

		VARSIZE HOGE
		PRINTFORML HOGE 1Dim:{RESULT:0} 2Dim:{RESULT:1} 3Dim:{RESULT:2}
		PRINTFORMW HOGES 1Dim:{VARSIZE("HOGES", 0)} 2Dim:{VARSIZE("HOGES", 1)} 3Dim:{VARSIZE("HOGES", 2)}
    ``` 
    ``` title="Result"
	HOGE 1Dim:1 2Dim:2 3Dim:3
	HOGES 1Dim:4 2Dim:5 3Dim:6
    ```


---

# WAIT.en
---
---
hide:
  - toc
---

# WAIT

| Function name                                                      | Arguments | Return    |
| :----------------------------------------------------------------- | :-------- | :-------- |
| ![](../assets/images/Iconeramaker.webp)[`WAIT`](./WAIT.md)        | none      | `void`    |

!!! info "API"

    ```  { #language-erbapi }
	WAIT
    ```
    Waits for one mouse click or Enter key press.


!!! hint "Hint"

    Command only.

### See Also
- [WAITANYKEY](WAITANYKEY.md)
- [TWAIT](TWAIT.md)
- [AWAIT](AWAIT.md)


---

# WAITANYKEY.en
---
---
hide:
  - toc
---

# WAITANYKEY

| Function name                                                          | Arguments | Return |
| :--------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`WAITANYKEY`](./WAITANYKEY.md)  | none      | none   |

!!! info "API"

    ```  { #language-erbapi }
	WAITANYKEY
    ```
    A [`WAIT`](./WAIT.md) command that waits for any key input or mouse click.  
    Can also be considered the [`ONEINPUT`](./ONEINPUT.md) version of `WAIT`.  


!!! hint "Hint"

    Command both supported.

### See Also
- [WAIT](WAIT.md)
- [ONEINPUT](ONEINPUT.md)


---

# WHILE.en
---
---
hide:
  - toc
---

# WHILE-WEND

| Function name                                                     | Arguments | Return |
| :--------------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`WHILE`](./WHILE.md)       | `int` | none   |
| ![](../assets/images/IconEmuera.webp)[`WEND`](./WHILE.md)        | none  | none   |

!!! info "API"

    ```  { #language-erbapi }
	WHILE bool
	WEND
    ```
	A looping construct similar to [`REPEAT～REND`](./REPEAT.md) and [`FOR～NEXT`](./FOR.md).  
	The loop repeats while `bool` in `WHILE` is non-zero.  
	If given a condition that is always true, it becomes an infinite loop unless exited with [`BREAK`](./CONTINUE.md).  
	Excessive loop processing may cause Emuera to complain.  
	Note that if you enter `WHILE～WEND` directly via commands like [`GOTO`](./GOTO.md), it loops back to `WHILE` upon reaching `WEND` and evaluates the condition as normal.

!!! hint "Hint"

    Commands only.

### See Also
- [REPEAT-REND](REPEAT.md)
- [FOR-NEXT](FOR.md)
- [CONTINUE.BREAK](CONTINUE.md)


---

# XML_ADDATTRIBUTE.en
---
---
hide:
  - toc
---

# XML_ADDATTRIBUTE Functions

| Function name                                                                              | Arguments                                                       | Return |
| :---------------------------------------------------------------------------------------- | :------------------------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_ADDATTRIBUTE`](./XML_ADDATTRIBUTE.md)        | `int`, `string`, `string`(, `string`, `int`, `int`)          | `int`  |
|                                                                                           | `ref` `string`, `string`, `string`(, `string`, `int`, `int`) | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_ADDATTRIBUTE_BYNAME`](./XML_ADDATTRIBUTE.md) | `string`, `string`, `string`(, `string`, `int`, `int`)        | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_ADDATTRIBUTE xmlId, xpath, attrName(, attrValue, methodType, doSetAll)
    2. int XML_ADDATTRIBUTE ref xml, xpath, attrName(, attrValue, methodType, doSetAll)
    3. int XML_ADDATTRIBUTE_BYNAME xmlName, xpath, attrName(, attrValue, methodType, doSetAll)
    ```
    Adds a new attribute `attrName=attrValue` to the specified `XML` based on attribute/element nodes selected by `xpath` ([About XPath](https://www.octoparse.com/blog/xpath-introduction)).  
    If `attrValue` is omitted, it becomes an empty string. If `doSetAll` is `0` or omitted, and the match count is 1 or more, addition is not performed.

    - If `methodType` is `0` or omitted, adds the attribute at the end of the selected element node's attribute list.
    - If `methodType` is `1`, adds the attribute before the selected attribute.
    - If `methodType` is `2`, adds the attribute after the selected attribute.

    Returns the match count on success. Returns `0` on failure.

    1. Uses the string conversion of `xmlId` ([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29)) as a key to select nodes from the stored [`XmlDocument`](https://docs.microsoft.com/en-us/dotnet/api/system.xml.xmldocument). Returns `-1` if the `XmlDocument` does not exist.
    2. Selects nodes from `xml` and assigns the result to `xml`. `xml` must be a variable.
    3. Uses `xmlName` as a key to select nodes from the stored `XmlDocument`. Returns `-1` if the `XmlDocument` does not exist.

    !!! warning "Warning"

        This does not obtain actual `XmlNode` instances, so using `//` at the beginning of `xpath` has no meaning.

!!! hint "Hint"

    Available as both command and function in expressions

!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS xml = "<xml/>"

        PRINTFORML {XML_ADDATTRIBUTE(xml, "/xml", "foo")} -> %xml%

        XML_DOCUMENT 0, xml
        PRINTFORML {XML_ADDATTRIBUTE(0, "/xml/@foo", "id", "1", 1)} -> %XML_TOSTR(0)%

        ONEINPUT
    ``` 
    ``` title="Result"
    1 -> <xml foo="" />
    1 -> <xml id="1" foo="" />
    ```


---

# XML_ADDNODE.en
---
---
hide:
  - toc
---

# XML_ADDNODE Functions

| Function name                                                                      | Arguments                                             | Return |
| :-------------------------------------------------------------------------------- | :--------------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_ADDNODE`](./XML_ADDNODE.md)        | `int`, `string`, `string`(, `int`, `int`)           | `int`  |
|                                                                                   | `ref` `string`, `string`, `string`(, `int`, `int`) | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_ADDNODE_BYNAME`](./XML_ADDNODE.md) | `string`, `string`, `string`(, `int`, `int`)       | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_ADDNODE xmlId, xpath, nodeXml(, methodType, doSetAll)
    2. int XML_ADDNODE ref xml, xpath, nodeXml(, methodType, doSetAll)
    3. int XML_ADDNODE_BYNAME xmlName, xpath, nodeXml(, methodType, doSetAll)
    ```
    Adds nodes to the specified `XML` based on element nodes selected by `xpath` ([About XPath](https://www.octoparse.com/blog/xpath-introduction)).  
    If `doSetAll` is `0` or omitted, and the match count is 1 or more, addition is not performed.

    - If `methodType` is `0` or omitted, uses the selected element node as the parent node and adds `nodeXml` as the last child node.
    - If `methodType` is `1`, adds `nodeXml` as a sibling node before the selected element node (not the root node).
    - If `methodType` is `2`, adds `nodeXml` as a sibling node after the selected element node (not the root node).

    Returns the match count on success. Returns `0` on failure.
    
    1. Uses the string conversion of `xmlId` ([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29)) as a key to select nodes from the stored [`XmlDocument`](https://docs.microsoft.com/en-us/dotnet/api/system.xml.xmldocument). Returns `-1` if the `XmlDocument` does not exist.
    2. Selects nodes from `xml` and assigns the result to `xml`. `xml` must be a variable.
    3. Uses `xmlName` as a key to select nodes from the stored `XmlDocument`. Returns `-1` if the `XmlDocument` does not exist.

    !!! warning "Warning"

        This does not obtain actual `XmlNode` instances, so using `//` at the beginning of `xpath` has no meaning.

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS xml = "<xml/>"

        PRINTFORML {XML_ADDNODE(xml, "/xml", "<child/>")} -> %xml%

        XML_DOCUMENT 0, xml

        PRINTFORML {XML_ADDNODE(0, "/xml/child", "<brother/>", 1)}
        PRINTSL XML_TOSTR(0)

        ONEINPUT
    ``` 
    ``` title="Result"
    1 -> <xml><child /></xml>
    1
    <xml><brother /><child /></xml>
    ```


---

# XML_GET.en
---
---
hide:
  - toc
---

# XML_GET Functions

| Function name                                                    | Arguments                                            | Return |
| :--------------------------------------------------------------- | :--------------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_GET`](./XML_GET.md)        | `any`, `string`(, `int`, `int`)                     | `int`  |
|                                                                  | `any`, `string`, `ref` `string[]`(, `int`)          | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_GET_BYNAME`](./XML_GET.md) | `string`, `string`(, `int`, `int`)                  | `int`  |
|                                                                  | `string`, `string`, `ref` `string[]`(, `int`)        | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_GET xml, xpath(, doOutput, outputType)
    2. int XML_GET xml, xpath, ref outputArray(, outputType)
    3. int XML_GET_BYNAME xmlName, xpath(, doOutput, outputType)
    4. int XML_GET_BYNAME xmlName, xpath, ref outputArray(, outputType)
    ```
    Selects nodes from `xml` (`xmlName`) using `xpath` and returns the number of matches ([About XPath](https://www.octoparse.com/blog/xpath-introduction)).

    For forms 1 and 2: If `xml` is a string, nodes are selected from its content. If `xml` is an integer, it is converted to string ([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29)) and used as a key to select nodes from the stored [`XmlDocument`](https://docs.microsoft.com/en-us/dotnet/api/system.xml.xmldocument). Returns `-1` if the `XmlDocument` does not exist.

    For forms 3 and 4: Selects nodes from the stored `XmlDocument` using `xmlName` as the key.

    Note:
    - Forms 1 and 3: If `doOutput` is `0` or omitted, only the match count is returned. Otherwise, the matches are assigned to `RESULTS`.
    - Forms 2 and 4: The matches are assigned to `outputArray`.

    The value of `outputType` determines the assignment result:
    - `1`: Node's `InnerText`
    - `2`: Node's `InnerXml`
    - `3`: Node's `OuterXml`
    - `4`: Node's `Name`
    - Other or omitted: Node's `Value`

    !!! warning "Warning"

        This does not obtain actual `XmlNode` instances, so using `//` at the beginning of `xpath` has no meaning.

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS xml = "<test><dir readonly='false'><file name='A.txt'>InnerText content A</file></dir><file name='B.txt'>InnerText content B</file></test>"
        #DIMS nodes, 10
        XML_DOCUMENT 0, xml

        ; Search directly from string
        PRINTFORML Match count: {XML_GET(xml, "/test//file", 1, 3)}
        PRINTFORML InnerXml(1): %RESULTS:0%
        PRINTFORML InnerXml(2): %RESULTS:1%

        ; Search from XmlDocument
        PRINTFORML Match count: {XML_GET(0, "/test//file/@name", 1)}
        PRINTFORML Value(1): %RESULTS:0%
        PRINTFORML Value(2): %RESULTS:1%
        PRINTFORML Match count: {XML_GET(0, "/test/dir/*[1]", nodes, 1)}
        PRINTFORML InnerText: %nodes:0%

        ONEINPUT
    ``` 
    ``` title="Result"
    Match count: 2
    InnerXml(1): <file name="A.txt">InnerText content A</file>
    InnerXml(2): <file name="B.txt">InnerText content B</file>
    Match count: 2
    Value(1): A.txt
    Value(2): B.txt
    Match count: 1
    InnerText: InnerText content A
    ```


---

# XML_MANAGE.en
---
---
hide:
  - toc
---

# XML_DOCUMENT Management

| Function name                                                     | Arguments       | Return |
| :--------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_DOCUMENT`](./XML_MANAGE.md) | `any`, `string` | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_RELEASE`](./XML_MANAGE.md)  | `any`           | `1`    |
| ![](../assets/images/IconEM.webp)[`XML_EXIST`](./XML_MANAGE.md)    | `any`           | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int XML_DOCUMENT xmlId, xmlContent
    1 XML_RELEASE xmlId
    int XML_EXIST xmlId
    ```

    Functions for creating, deleting, and checking existence of [`XmlDocument`](https://docs.microsoft.com/en-us/dotnet/api/system.xml.xmldocument). If `xmlId` is an integer, it is converted to string ([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29)).
    
    - `XML_DOCUMENT`: Parses `xmlContent` and saves it as an `XmlDocument`. Returns `0` if an `XmlDocument` already exists for `xmlId`. Returns `1` on success.
    - `XML_RELEASE`: Deletes the `XmlDocument` associated with `xmlId`.
    - `XML_EXIST`: Checks if an `XmlDocument` exists for `xmlId`. Returns `1` if it exists, `0` otherwise.

    !!! warning "Warning"

        See "[`XML`, `MAP`, `DataTable` Save Function](./README.md#xmlmapdatatable)" to save created `XmlDocument` to save file. They are automatically deleted when "Return to Title Screen" or [`RESETDATA`](https://osdn.net/projects/emuera/wiki/excom#h5-RESETDATA) is called.

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        PRINTFORML Existence of XmlDocument 0: {XML_EXIST(0)}
        XML_DOCUMENT 0, "<xml/>"
        PRINTSL RESULT ? "Success" # "Already exists"
        XML_DOCUMENT 0, "<xml/>"
        PRINTSL RESULT ? "Success" # "Already exists"

        RESETDATA ; All XmlDocuments are automatically deleted

        XML_DOCUMENT 0, "<xml/>"
        PRINTSL RESULT ? "Success" # "Already exists"
        PRINTFORML Existence of XmlDocument 0: {XML_EXIST(0)}
        XML_RELEASE 0
        PRINTFORML Existence of XmlDocument 0: {XML_EXIST(0)}

        ONEINPUT
    ``` 
    ``` title="Result"
    Existence of XmlDocument 0: 0
    Success
    Already exists
    Success
    Existence of XmlDocument 0: 1
    Existence of XmlDocument 0: 0
    ```


---

# XML_REMOVEATTRIBUTE.en
---
---
hide:
  - toc
---

# XML_REMOVEATTRIBUTE Functions

| Function name                                                                                    | Arguments                             | Return |
| :---------------------------------------------------------------------------------------------- | :----------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_REMOVEATTRIBUTE`](./XML_REMOVEATTRIBUTE.md)        | `int`, `string`(, `int`)             | `int`  |
|                                                                                                  | `ref` `string`, `string`(, `int`)   | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_REMOVEATTRIBUTE_BYNAME`](./XML_REMOVEATTRIBUTE.md) | `string`, `string`(, `int`)         | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_REMOVEATTRIBUTE xmlId, xpath(, doSetAll)
    2. int XML_REMOVEATTRIBUTE ref xml, xpath(, doSetAll)
    3. int XML_REMOVEATTRIBUTE_BYNAME xmlName, xpath(, doSetAll)
    ```
    Removes attributes selected by `xpath` from the specified `XML` ([About XPath](https://www.octoparse.com/blog/xpath-introduction)).  
    If `doSetAll` is `0` or omitted, and the match count is 1 or more, removal is not performed. Returns the match count on success. Returns `0` on failure.

    1. Uses the string conversion of `xmlId` ([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29)) as a key to select nodes from the stored [`XmlDocument`](https://docs.microsoft.com/en-us/dotnet/api/system.xml.xmldocument). Returns `-1` if the `XmlDocument` does not exist.
    2. Selects nodes from `xml` and assigns the result to `xml`. `xml` must be a variable.
    3. Uses `xmlName` as a key to select nodes from the stored `XmlDocument`. Returns `-1` if the `XmlDocument` does not exist.

    !!! warning "Warning"

        This does not obtain actual `XmlNode` instances, so using `//` at the beginning of `xpath` has no meaning.

!!! hint "Hint"

    Available as both command and function in expressions

!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS xml = "<xml id='1' name='foo'/>"

        PRINTFORML {XML_REMOVEATTRIBUTE(xml, "/xml/@id")} -> %xml%

        XML_DOCUMENT 0, xml
        PRINTFORML {XML_REMOVEATTRIBUTE(0, "/xml/@name")} -> %XML_TOSTR(0)%

        ONEINPUT
    ``` 
    ``` title="Result"
    1 -> <xml name="foo" />
    1 -> <xml />
    ```


---

# XML_REMOVENODE.en
---
---
hide:
  - toc
---

# XML_REMOVENODE Functions

| Function name                                                                          | Arguments                            | Return |
| :------------------------------------------------------------------------------------ | :---------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_REMOVENODE`](./XML_REMOVENODE.md)        | `int`, `string`(, `int`)            | `int`  |
|                                                                                       | `ref` `string`, `string`(, `int`)   | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_REMOVENODE_BYNAME`](./XML_REMOVENODE.md) | `string`, `string`(, `int`)         | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_REMOVENODE xmlId, xpath(, doSetAll)
    2. int XML_REMOVENODE ref xml, xpath(, doSetAll)
    3. int XML_REMOVENODE_BYNAME xmlName, xpath(, doSetAll)
    ```
    Removes element nodes selected by `xpath` from the specified `XML` (root node is invalid) ([About XPath](https://www.octoparse.com/blog/xpath-introduction)).  
    If `doSetAll` is `0` or omitted, and the match count is 1 or more, removal is not performed. Returns the match count on success. Returns `0` on failure.
    
    1. Uses the string conversion of `xmlId` ([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29)) as a key to select nodes from the stored [`XmlDocument`](https://docs.microsoft.com/en-us/dotnet/api/system.xml.xmldocument). Returns `-1` if the `XmlDocument` does not exist.
    2. Selects nodes from `xml` and assigns the result to `xml`. `xml` must be a variable.
    3. Uses `xmlName` as a key to select nodes from the stored `XmlDocument`. Returns `-1` if the `XmlDocument` does not exist.

    !!! warning "Warning"

        This does not obtain actual `XmlNode` instances, so using `//` at the beginning of `xpath` has no meaning.

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS xml = "<xml><brother/><brother/><sister/></xml>"

        XML_DOCUMENT 0, xml
        PRINTFORML {XML_REMOVENODE(xml, "/xml/brother", 1)} -> %xml%

        PRINTFORML {XML_REMOVENODE(0, "/xml/sister", 1)}
        PRINTSL XML_TOSTR(0)

        ONEINPUT
    ``` 
    ``` title="Result"
    2 -> <xml><sister /></xml>
    1
    <xml><brother /><brother /></xml>
    ```


---

# XML_REPLACE.en
---
---
hide:
  - toc
---

# XML_REPLACE Functions

| Function name                                                                    | Arguments                                      | Return |
| :------------------------------------------------------------------------------ | :-------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_REPLACE`](./XML_REPLACE.md)        | `any`, `string`                               | `int`  |
|                                                                                 | `int`, `string`, `string`(, `int`)           | `int`  |
|                                                                                 | `ref` `string`, `string`, `string`(, `int`)  | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_REPLACE_BYNAME`](./XML_REPLACE.md) | `string`, `string`, `string`(, `int`)        | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_REPLACE xmlId, newXml
    2. int XML_REPLACE xmlId, xpath, newXml(, doSetAll)
    3. int XML_REPLACE ref xml, xpath, newXml(, doSetAll)
    4. int XML_REPLACE_BYNAME xmlName, xpath, newXml(, doSetAll)
    ```
    Selects nodes from `xml` using `xpath` and overwrites matching nodes with `newXml` ([About XPath](https://www.octoparse.com/blog/xpath-introduction)).  
    If `doSetAll` is `0` or omitted, and the match count is 1 or more, overwriting is not performed. Returns the match count on success. Returns `0` on failure.

    1. Overwrites the root node of the [`XmlDocument`](https://docs.microsoft.com/en-us/dotnet/api/system.xml.xmldocument) stored with `xmlId` with `newXml`. Returns `-1` if the `XmlDocument` does not exist. If `xmlId` is an integer, it is converted to string ([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29)).
    2. Uses the string conversion of `xmlId` (`TOSTR`) as a key to select nodes from the stored `XmlDocument`. Returns `-1` if the `XmlDocument` does not exist.
    3. Selects nodes from `xml` and assigns the result to `xml`. `xml` must be a variable.
    4. Uses `xmlName` as a key to select nodes from the stored `XmlDocument`. Returns `-1` if the `XmlDocument` does not exist.

    !!! warning "Warning"

        This does not obtain actual `XmlNode` instances, so using `//` at the beginning of `xpath` has no meaning.

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS xml = "<xml/>"

        XML_DOCUMENT 0, xml
        PRINTFORML {XML_REPLACE(0, "<xml><boy/></xml>")} -> %XML_TOSTR(0)%
        PRINTFORML {XML_REPLACE(0, "/xml/boy", "<girl/>")} -> %XML_TOSTR(0)%

        ONEINPUT
    ``` 
    ``` title="Result"
    1 -> <xml><boy /></xml>
    1 -> <xml><girl /></xml>
    ```


---

# XML_SET.en
---
---
hide:
  - toc
---

# XML_SET Functions

| Function name                                                    | Arguments                                             | Return |
| :--------------------------------------------------------------- | :--------------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_SET`](./XML_SET.md)        | `int`, `string`, `string`(, `int`, `int`)           | `int`  |
|                                                                  | `ref` `string`, `string`, `string`(, `int`, `int`) | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_SET_BYNAME`](./XML_SET.md) | `string`, `string`, `string`(, `int`, `int`)       | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_SET xmlId, xpath, value(, doSetAll, outputType)
    2. int XML_SET ref xml, xpath, value(, doSetAll, outputType)
    3. int XML_SET_BYNAME xmlName, xpath, value(, doSetAll, outputType)
    ```
    Selects nodes from `xml` using `xpath`, assigns `value` to matching nodes, and returns the match count ([About XPath](https://www.octoparse.com/blog/xpath-introduction)).  
    If `doSetAll` is `0` or omitted, and the match count is 1 or more, assignment is not performed. Returns `0` on failure.
    
    1. Uses the string conversion of `xmlId` ([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29)) as a key to select nodes from the stored [`XmlDocument`](https://docs.microsoft.com/en-us/dotnet/api/system.xml.xmldocument). Returns `-1` if the `XmlDocument` does not exist.
    2. Selects nodes from `xml` and assigns the result to `xml`. `xml` must be a variable.
    3. Uses `xmlName` as a key to select nodes from the stored `XmlDocument`. Returns `-1` if the `XmlDocument` does not exist.

    The value of `outputType` determines the assignment result:
    - `1`: Node's `InnerText`
    - `2`: Node's `InnerXml`
    - Other or omitted: Node's `Value`

    !!! warning "Warning"

        This does not obtain actual `XmlNode` instances, so using `//` at the beginning of `xpath` has no meaning.

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS xml = "<test><file name='A.txt'>InnerText content A</file><a>A</a></test>"

        ; Search directly from string
        PRINTFORML Match count: {XML_SET(xml, "/test/*", "B", 1, 1)}
        PRINTSL xml
        XML_DOCUMENT 0, xml

        ; Search from XmlDocument
        PRINTFORML Match count: {XML_SET(0, "/test/file/@name", "X.xml")}
        XML_GET 0, "/test/file/@name", 1
        PRINTSL RESULTS

        ONEINPUT
    ``` 
    ``` title="Result"
    Match count: 2
    <test><file name="A.txt">B</file><a>B</a></test>
    Match count: 1
    X.xml
    ```


---

# XML_TOSTR.en
---
---
hide:
  - toc
---

# XML_TOSTR

| Function name                                                 | Arguments | Return   |
| :------------------------------------------------------------ | :-------- | :------- |
| ![](../assets/images/IconEM.webp)[`XML_TOSTR`](./XML_TOSTR.md) | `any`     | `string` |


!!! info "API"

    ```  { #language-erbapi }
    string XML_TOSTR xmlId
    ```
    Returns the content of the [`XmlDocument`](https://docs.microsoft.com/en-us/dotnet/api/system.xml.xmldocument) stored with `xmlId`. If `xmlId` is an integer, it is converted to string ([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29)).

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        XML_DOCUMENT 0, "<xml/>"

        PRINTSL XML_TOSTR(0)

        ONEINPUT
    ``` 
    ``` title="Result"
    <xml />
    ```


---


