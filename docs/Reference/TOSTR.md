---
hide:
  - toc
---

# TOSTR

| 関数名                                                     | 引数            | 戻り値   |
| :--------------------------------------------------------- | :-------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`TOSTR`](./TOSTR.md) | `int`, `option` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string TOSTR int, option
    ```
	数値を文字列に変換する命令です。
	変換したい数字を第一引数に、変換の書式を文字列で第二引数に指定します。  
	第二引数は省略できますが、省略した場合は[`PRINTFORM`](./PRINT.md)の`{}`内などと同じように単に文字列になります。  
	この関数は内部でC#の[`Int64.ToString()関数`](https://learn.microsoft.com/ja-jp/dotnet/api/system.int64.tostring)を呼んでおり、C#と同じ書式指定ができます。第二引数が適切でない場合、エラーになります。  
	簡単な書式指定の例は同名の式中で使える関数を確認してください。 書式指定の詳細はC#の数値書式指定文字列について解説しているWebサイトを参考にして下さい。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。


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
    ``` title="結果"
	438765　//標準
	6b1ed　//"x" 16進数(小文字)
	6B1ED　//"X" 16進数(大文字)
	00438765　//"D8" 10進数 + 8桁
	0006B1ED　//"X8" 16進数 + 8桁
	00438765　//"00000000" 10進数 + 8桁
	438765　//"########" 10進数
	438,765　//"#,###" 3桁ごとに","
	0043万8765　//"0000万0000" 8桁 + 4桁目に"万"
    ```

### 関連項目
- [TOINT](TOINT.md)
