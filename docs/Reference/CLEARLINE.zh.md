---
hide:
  - toc
---

# CLEARLINE

| 函数名                                                             | 参数 | 返回值 |
| :----------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CLEARLINE`](./CLEARLINE.md) | `int`| 无     |

!!! info "API"

    ```  { #language-erbapi }
	CLEARLINE line
    ```
	删除指定行数的字符串（行数的计数方式与`LINECOUNT`相同）。  
	行数是指从[`PRINTL`](./PRINT.md)等命令开始到发生换行为止的内容算作一行。  
	请注意，即使一个长字符串被分割成多行显示，也会被整体视为一行。

!!! hint "提示"

    仅命令支持两种方式。

!!! example "示例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTL SSS
		PRINTL OOO
		PRINTL UUU
		PRINTL NNN
		PRINTL DDD
		PRINTL VVV
		PRINTL OOO
		PRINTL LLL
		PRINTL TTT
		CLEARLINE 8
		PRINTL EEE
		PRINTW XXX
    ``` 
    ``` title="结果"
	SSS
	EEE
	XXX
    ```

### 相关项目
- [REUSELASTLINE](REUSELASTLINE.md)