---
hide:
  - toc
---

# ARRAYCOPY

| Function name                                                   | Arguments        | Return |
| :------------------------------------------------------------- | :--------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ARRAYCOPY`](./ARRAYCOPY.en.md) | `variable`, `variable` | none   |

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
