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
