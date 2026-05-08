---
hide:
  - toc
---

# TOSTR

| 函数名                                                     | 参数            | 返回值   |
| :--------------------------------------------------------- | :-------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`TOSTR`](./TOSTR.md) | `int`, `option` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string TOSTR int, option
    ```
	将数值转换为字符串的命令。
	第一个参数指定要转换的数字，第二个参数以字符串形式指定转换格式。  
	第二个参数可以省略，省略时，其行为与 [`PRINTFORM`](./PRINT.md) 的 `{}` 内相同，即简单地转换为字符串。  
	此函数内部调用 C# 的 [`Int64.ToString() 函数`](https://learn.microsoft.com/ja-jp/dotnet/api/system.int64.tostring)，可以使用与 C# 相同的格式指定。如果第二个参数不合适，将发生错误。  
	简单的格式指定示例，请参考同名的可在表达式中使用的函数。格式指定的详细信息，请参考讲解 C# 数值格式字符串的网站。  

!!! hint "提示"

    同时支持命令形式和表达式函数形式。

!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		A = 438765
		PRINTSL TOSTR(A)
		PRINTSL TOSTR(A, "x")
		PRINTSL TOSTR(A, "X")
		PRINTSL TOSTR(A, "D8")
		PRINTSL TOSTR(A, "X8")
		PRINTSL TOSTR(A, "00000000")
		PRINTSL TOSTR(A, "########")
		PRINTSL TOSTR(A, "#,###")
		PRINTSL TOSTR(A, "0000万0000")
    ``` 
    ``` title="结果"
	438765　//标准
	6b1ed　//"x" 十六进制(小写)
	6B1ED　//"X" 十六进制(大写)
	00438765　//"D8" 十进制 + 8位
	0006B1ED　//"X8" 十六进制 + 8位
	00438765　//"00000000" 十进制 + 8位
	438765　//"########" 十进制
	438,765　//"#,###" 每3位加","
	0043万8765　//"0000万0000" 8位 + 第4位插入"万"
    ```

### 相关项目
- [TOINT](TOINT.md)