---
hide:
  - toc
---

# GOTO

| 関数名                                                     | 引数          | 戻り値 |
| :--------------------------------------------------------- | :------------ | :----- |
| ![](../assets/images/Iconeramaker.webp)[`GOTO`](./GOTO.md) | `labelName`   | なし   |

!!! info "API"

    ```  { #language-erbapi }
	GOTO labelName
	$labelName
    ```
    関数内の`$`から定義されたラベルに移動する


!!! hint "ヒント"

    命令のみ対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTL 1
		GOTO THREE

		$TWO
		PRINTL 2
		GOTO FIVE

		$THREE
		PRINTL 3
		GOTO TWO

		$FOUR
		PRINTL 4
		GOTO END

		$FIVE
		PRINTL 5
		GOTO FOUR

		$END
		PRINTW END
    ``` 
    ``` title="結果"
	1
	3
	2
	5
	4
	END
    ```

### 関連項目
- [GOTOFORM](FORM.md)
