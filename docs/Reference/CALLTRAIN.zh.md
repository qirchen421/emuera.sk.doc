---
hide:
  - toc
---

# CALLTRAIN

| 函数名                                                             | 参数  | 返回值 |
| :----------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CALLTRAIN`](./CALLTRAIN.zh.md) | `int` | 无     |

!!! info "API"

    ```  { #language-erbapi }
	CALLTRAIN comCount
    ```
	连续命令执行指令。  
	需要预先将命令编号赋值给`SELECTCOM:(1～)`，并以要执行的命令数量作为参数来执行。

    ```  { #language-erbapi }
	SELECTCOM:1 = XXX
	SELECTCOM:2 = YYY
	　　　・
	　　　・
	　　　・
	SELECTCOM:N = ZZZ

	CALLTRAIN (設定したコマンドの数)
	```
	与通常的命令执行一样，也会调用`SHOW_STATUS`和`SHOW_USERCOM`，但不会显示`TRAIN`命令和`USERCOM`。  
	如果无论如何都想显示`USERCOM`，使用[`NOSKIP～ENDNOSKIP](./SKIP_RELATE.zh.md)`会是一个好办法。  
	`CALLTRAIN`自动执行结束后，系统函数`@CALLTRAINEND`会被调用。  
	请注意，`@CALLTRAINEND`不是事件函数，因此不能多重定义。  
	另外，用于指定命令的命令编号，不是游戏中的值，而是`TRAIN.CSV`中指定的值。  

!!! hint "提示"

    仅支持命令。

### 相关项目
* [DOTRAIN](DOTRAIN.zh.md)
* [STOPCALLTRAIN](STOPCALLTRAIN.zh.md)