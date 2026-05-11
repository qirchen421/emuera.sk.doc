---
hide:
  - toc
---

# TOSTR

| 関数名                                                     | 引数            | 戻り値   |
| :--------------------------------------------------------- | :-------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`TOSTR`](./TOSTR.md) | `int`, `option` | `string` |
| ![](../assets/images/IconSK.webp)[`TOSTRF`](./TOSTR.md) | `float`, `option` | `string` |

!!! info "API — TOSTR"

    ```  { #language-erbapi }
	string TOSTR int, option
    ```
	数値を文字列に変換する命令です。
	変換したい数字を第一引数に、変換の書式を文字列で第二引数に指定します。  
	第二引数は省略できますが、省略した場合は[`PRINTFORM`](./PRINT.md)の`{}`内などと同じように単に文字列になります。  
	この関数は内部でC#の[`Int64.ToString()関数`](https://learn.microsoft.com/ja-jp/dotnet/api/system.int64.tostring)を呼んでおり、C#と同じ書式指定ができます。第二引数が適切でない場合、エラーになります。  
	簡単な書式指定の例は同名の式中で使える関数を確認してください。 書式指定の詳細はC#の数値書式指定文字列について解説しているWebサイトを参考にして下さい。  

!!! info "API — TOSTRF" 

    ![](../assets/images/IconSK.webp) Skia 追加

    ```  { #language-erbapi }
	string TOSTRF float, option
    ```
	浮動小数点数を文字列に変換する命令です。
	変換したい浮動小数点数を第一引数に、変換の書式を文字列で第二引数に指定します。  
	第二引数は省略できますが、省略した場合は単に文字列になります。  
	この関数は内部でC#の[`Double.ToString()関数`](https://learn.microsoft.com/ja-jp/dotnet/api/system.double.tostring)を呼んでおり、C#と同じ書式指定ができます。第二引数が適切でない場合、エラーになります。  

	よく使う書式：

	| 書式 | 例 | 結果 | 説明 |
	|------|------|------|------|
	| `"F2"` | `TOSTRF(3.14, "F2")` | `"3.14"` | 固定小数点、2桁 |
	| `"F4"` | `TOSTRF(3.14, "F4")` | `"3.1400"` | 固定小数点、4桁 |
	| `"E"` | `TOSTRF(3.14, "E")` | `"3.140000E+000"` | 科学記数法 |
	| `"G4"` | `TOSTRF(3.14, "G4")` | `"3.14"` | 一般書式、4桁有効数字 |
	| `"0.00"` | `TOSTRF(3.14, "0.00")` | `"3.14"` | カスタム数値書式 |

	精度+幅パディングは FORM `%...%` 構文と組み合わせて使用します：

	``` { #language-erb }
	PRINTFORML %TOSTRF(PI, "F2"),10%      ; → "      3.14"（右詰め）
	PRINTFORML %TOSTRF(PI, "F2"),10,LEFT% ; → "3.14      "（左詰め）
	```

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
