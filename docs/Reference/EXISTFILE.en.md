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
