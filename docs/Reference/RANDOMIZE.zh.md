---
hide:
  - toc
---

# RANDOMIZE, DUMPRAND, INITRAND

| 函数名                                                             | 参数  | 返回值 |
| :----------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`RANDOMIZE`](./RANDOMIZE.md) | `int` | 无     |
| ![](../assets/images/IconEmuera.webp)[`DUMPRAND`](./RANDOMIZE.md)  | 无    | 无     |
| ![](../assets/images/IconEmuera.webp)[`INITRAND`](./RANDOMIZE.md)  | 无    | 无     |

!!! info "API"

    ```  { #language-erbapi }
	RANDOMIZE int
	DUMPRAND
	INITRAND
    ```
	这些是用于控制通过 `RAND:X` 获取的随机数的指令。

	`RANDOMIZE` 指令使用指定的值初始化随机数。  
	如果使用相同的值进行初始化，`RAND` 必定会返回相同的结果。  
	对于 [`PRINTDATA`](./PRINTDATA.md) 和 [`STRDATA`](./STRDATA.md) 也会返回相同的结果。

	`DUMPRAND` 将当前的随机数状态保存到 `RANDDATA` 变量中。  
	`INITRAND` 从 `RANDDATA` 变量中读取保存的数据。  
	请注意，不要在 `DUMPRAND` 之前执行 `INITRAND`。  
	如果 `RANDDATA` 变量的内容不合适，`RAND` 将无法正常工作。

    **示例**
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

    **结果**
	```
	92539/49469/48337/15839/48368/1604
	34536/91889/81167/22434/87922/95565
	34536/91889/81167/22434/87922/95565
	68286/10690/68868/82610/90769/60789
	68286/10690/68868/82610/90769/60789
	68286/10690/68868/82610/90769/60789
	```

    在上述结果中，第一行的结果是随机的。每次运行时结果都会变化。  
    第二行和第三行由于在`RANDOMIZE`之后立即执行，因此结果必定相同。  
    在第四行之前执行了`DUMPRAND`命令。  
    通过在第五行之前执行`INITRAND`命令，将`RAND`的状态恢复到了`DUMPRAND`命令保存的状态。  
    因此，第四行和第五行的结果相同。  
    第六行通过再次执行`INITRAND`命令，重复获得了相同的结果。  
    由于`RANDDATA`变量是可保存的变量，通过在保存前执行`DUMPRAND`，并在加载后立即执行`INITRAND`，可以继续使用相同的随机数状态。

!!! hint "提示"

    仅支持命令。

### ![](../assets/images/IconSK.webp)Skia 版变更

!!! info "与新随机数算法解耦"

    原版中 `UseNewRandom=true` 时，`INITRAND`/`DUMPRAND` 会输出警告并跳过。Skia 版移除了此检查，`INITRAND`/`DUMPRAND` 始终操作 MTRandom 状态，不影响 `GetNextRand`。