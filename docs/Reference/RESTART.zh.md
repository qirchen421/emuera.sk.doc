---
hide:
  - toc
---

# RESTART

| 函数名 | 参数 | 返回值 |
| :--- | :--- | :--- |
| ![](../assets/images/Iconeramaker.webp)[`RESTART`](./RESTART.md) | 无 | 无 |

!!! info "API"

    ```  { #language-erbapi }
	RESTART
    ```
    返回当前正在执行的函数的开头。使用`DYNAMIC`定义的动态变量不会被初始化


!!! hint "提示"

    仅支持作为指令使用。


!!! example "示例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIM DYNAMIC RESTARTCOUNT

		RESTARTCOUNT++

		SELECTCASE RESTARTCOUNT
			CASE 1
				PRINTL Doe, a deer, a female deer
				RESTART
			CASE 2
				PRINTL Ray, a drop of golden sun
				RESTART
			CASE 3
				PRINTL Me, a name I call my self
				RESTART
			CASE 4
				PRINTL Far, a long, long way to run
				RESTART
			CASE 5
				PRINTL Sew, a needle pulling thread
				RESTART
			CASE 6
				PRINTL La, a note to follow Sew
				RESTART
			CASE 7
				PRINTL Tea, a drink with jam and bread
				RESTART
		ENDSELECT

		PRINTW That will bring us back to Do
    ``` 
    ``` title="结果"
	Doe, a deer, a female deer
	Ray, a drop of golden sun
	Me, a name I call my self
	Far, a long, long way to run
	Sew, a needle pulling thread
	La, a note to follow Sew
	Tea, a drink with jam and bread
	That will bring us back to Do
    ```

### 相关项目
- [RETURN](RETURN.md)