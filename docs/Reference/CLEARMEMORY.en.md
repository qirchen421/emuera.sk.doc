---
hide:
  - toc
---

# CLEARMEMORY

| Function name                                                     | Arguments | Return |
| :--------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`CLEARMEMORY`](./CLEARMEMORY.en.md) | `void`    | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int CLEARMEMORY
	```

	Frees memory. Returns the amount of freed memory in bytes.

!!! hint "Hint"

    Available as both command and function in expressions.  
	Effective after `LOADDATA`, `DELCHARA`, or Emuera restart, but has little effect in other situations.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		REPEAT 10000
			ADDVOIDCHARA
		REND
		DELALLCHARA
		PRINTFORMW Executed CLEARMEMORY and freed {CLEARMEMORY()/1024/1024}MB of memory
	```

	``` title="Result"
	Executed CLEARMEMORY and freed 840MB of memory
	```

### Related
- [GETMEMORYUSAGE](GETMEMORYUSAGE.en.md)
