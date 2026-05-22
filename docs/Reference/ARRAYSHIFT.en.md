---
hide:
  - toc
---

# ARRAYSHIFT

| Function name                                                                   | Arguments                                 | Return |
| :------------------------------------------------------------------------------- | :---------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ARRAYSHIFT`](./ARRAYSHIFT.en.md) | `variable`, `int`, `value`(, `int`, `int`) | none   |

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
