---
hide:
  - toc
---

# FLOWINPUT, FLOWINPUTS

| Function name                                                               | Arguments                       | Return |
| :-------------------------------------------------------------------------- | :------------------------------ | :----- |
| ![](../assets/images/IconEE.webp)[`FLOWINPUT`](./FLOWINPUT.md)             | `int`(, `int`, `int`, `int`) | `void` |
| ![](../assets/images/IconEE.webp)[`FLOWINPUTS`](./FLOWINPUT.md)            | `int`(, `string`)              | `void` |

!!! info "API"

	``` { #language-erbapi }
	FLOWINPUT default(, AllowLeftClick, AllowSkip, ForceSkip)
	FLOWINPUTS toggle(, default)
    ```

	Adds options for default value, left-click permission, and skip permission to INPUT in flow (such as in `@SHOW_SHOP`).
	Below are quotes for each option:

	```
	Added second argument to `INPUT`, `INPUTS`, `ONEINPUT`, `ONEINPUTS` (integer, optional, default is `0`).

    Added fifth argument to `TINPUT`, `TINPUTS`, `TONEINPUT`, `TONEINPUTS` (integer, optional, default is `0`).

    - When added argument == 0, or omitted: Same as original version.
    - When added argument != 0: Treats mouse clicks as Enter key (assigns empty string to `RESULTS`. If button is pressed, assigns button index to `RESULTS:1`). When left-clicked, sets `RESULT:1` to 1, when right-clicked sets `RESULT:1` to 2. Also, if ++shift++, ++ctrl++, or ++alt++ are pressed simultaneously, their key states are saved in `RESULT:2` (bits 16 17 18).
	```
	```
    Added third argument to `INPUT`, `INPUTS`, `ONEINPUT`, `ONEINPUTS` (integer, optional, default is `0`).

    Added sixth argument to `TINPUT`, `TINPUTS`, `TONEINPUT`, `TONEINPUTS` (integer, optional, default is `0`).

    - When added argument == 0, or omitted: Same behavior as original version.
    - When added argument != 0: Does not wait for input during skip via right-click, etc.
    However, the default value is applied. When used together with "INPUT system accepts mouse clicks" above, the default values are assigned to `RESULT:1` and `RESULTS:1` respectively, or to `RESULT:0` and `RESULTS:0` as usual if not used together.
    EE v46 added fourth argument. When set to non-0, forces skip by putting default value in `RESULT`.
    ```

	FLOWINPUTS enables with first argument non-0. When enabled, all `INPUT` in system flow are treated as `INPUTS`.  
	For screens like SHOP where processing changes with input values, it is recommended to set default values with `FLOWINPUT`. Other behavior control is done with `FLOWINPUT`.


!!! hint "Hint"

	Supports both command and expression function.

### See Also
- [BEGIN](BEGIN.md)
