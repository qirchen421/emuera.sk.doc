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
