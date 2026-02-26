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
