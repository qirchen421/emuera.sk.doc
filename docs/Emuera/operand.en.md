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
