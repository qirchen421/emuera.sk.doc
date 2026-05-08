---
hide:
  - toc
---

# VARSET

| 函数名                                                             | 参数                                              | 返回值 |
| :----------------------------------------------------------------- | :------------------------------------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`VARSET`](./VARSET.md)       | `variable`(, `value`, `startIndex`, `endIndex`)   | 无     |

!!! info "API"

    ```  { #language-erbapi }
	VARSET variableName(, value, startIndex, endIndex)
    ```
	将第二参数的值赋值给指定变量数组的指定范围。  
	若省略第二参数，则赋值 `0` 或空字符串。  
	若省略第三及后续参数，则赋值给数组的全部元素。  
	例如  

    ```  { #language-erbapi }
	VARSET FLAG, 0
	VARSET STR, "あああ", 0, 10
	VARSET TA:0:0:0,5678
	```

    在这个例子中，`FLAG` 的所有元素都将变为 `0`。  
    `STR:0` 到 `STR:9` 将被赋值为 `あああ`，`TA` 的所有三维数组元素也将被赋值为 `5678`。  
    同样的事情也可以在 ERB 中使用 [`FOR-NEXT`](./FOR.md) 循环等来实现，但当循环次数达到数十万次时，执行时间就不可忽视了。  
    `VARSET` 指令可以比在 ERB 中进行赋值更快地完成处理。  
    当将角色变量作为 `VARSET` 指令的目标时，赋值将仅作用于指定角色的元素。

    ```  { #language-erbapi }
	VARSET CFLAG:MASTER:0, 0
	VARSET CSTR, ""
	```

	此例中，`MASTER` 的 `CFLAG:0～999`（若未更改 VariableSize.csv）将变为 `0`，但其他角色的 `CFLAG` 不受影响。
	此外，省略对象时，将如常视为 `TARGET`，因此 `TARGET` 的所有 `CSTR` 都将变为空字符串。其他角色的 `CSTR` 不受影响。
	对于一维数组及数组型角色变量以外的类型，如用于 `DITEMTYPE` 或 `TA` 等时，第三及之后的参数将被忽略，并对数组的所有元素进行赋值。

!!! hint "提示"

    仅支持命令形式。

### 相关项目
- [VARSETEX](VARSETEX.md)