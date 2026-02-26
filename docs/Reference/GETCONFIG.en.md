---
hide:
  - toc
---

# GETCONFIG(S)

| Function name                                                      | Arguments | Return    |
| :---------------------------------------------------------------- | :-------- | :-------- |
| ![](../assets/images/IconEmuera.webp)[`GETCONFIG`](./GETCONFIG.md)  | `string`  | `int`     |
| ![](../assets/images/IconEmuera.webp)[`GETCONFIGS`](./GETCONFIG.md) | `string`  | `string`  |

!!! info "API"

    ```  { #language-erbapi }
	int GETCONFIG configWord
	string GETCONFIGS configWord
    ```
	Gets the configuration and [`replace.csv`](../Emuera/replace.md) settings as an integer or string.  
	For available items, see the [config](../Emuera/config.md) page.

!!! hint "Hint"

    Available as both command and function in expressions

### Related
- [GETCOLOR](GETCOLOR.md)
- [PRINTCPERLINE](PRINTCPERLINE.md)
