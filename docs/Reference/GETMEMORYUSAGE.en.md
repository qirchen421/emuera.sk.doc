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
