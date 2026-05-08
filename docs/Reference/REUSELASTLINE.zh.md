---
hide:
  - toc
---

# REUSELASTLINE

| 函数名                                                                     | 参数     | 返回值 |
| :------------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`REUSELASTLINE`](./REUSELASTLINE.md) | `string` | 无     |

!!! info "API"

    ```  { #language-erbapi }
    REUSELASTLINE string
    ```
	使用指定的格式化字符串重写最后一行，  
	但通过此方式重写的行，在添加下一行时会被替换掉。  
	基本上仅在 [`INPUT`](./INPUT.md)、[`INPUTS`](./INPUT.md) 的循环处理中使用。  
	参数可使用与 [`PRINTFORM`](./PRINT.md) 相同的格式。  
	另外，使用 `REUSELASTLINE （此半角空格必需）` 可以在不显示警告信息的情况下清空该行。

    ```  { #language-erbapi }
	$INPUT_LOOP  
	INPUT  
	IF RESULT != 0  
		;!;CLEARLINE 1   
		;!;REUSELASTLINE 無効ですよ  
		GOTO INPUT_LOOP  
	ENDIF  
	```

	类似这样，在[`GOTO INPUT_LOOP`](./GOTO.md)之前调用`REUSELASTLINE`，  
	之前的输入会从画面中清除，下一次输入会显示在与前一次输入相同的行上  
	这样一来，即使重复进行无效输入，行数也不会增加，  
	应该能防止出现“回过神来选项已经跑到画面外了…”这种情况  
	顺便一提，在`@USERXXX`系列函数的条件分支末尾  
	（对象是`@USERCOM`、`@USERSHOP`、`@USERABLUP`这三个）  

    ```  { #language-erbapi }
	;!;ELSE  
		;!;REUSELASTLINE   
	ENDIF  
	```

	这样写的话…？  
	(如果仅用于Emuera，则不需要`;!;`)  

!!! hint "提示"

    仅支持指令。