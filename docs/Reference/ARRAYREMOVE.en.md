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
