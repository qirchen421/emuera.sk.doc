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
