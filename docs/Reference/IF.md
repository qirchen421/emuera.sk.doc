---
hide:
  - toc
---

# (S)IF

| 関数名                                                    | 引数      | 戻り値 |
| :-------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`(S)IF`](./IF.md) | `operand` | `void` |

!!! info "API"

    ```  { #language-erbapi }
	IF operand(int)
	ELSEIF operand(int)
	ELSE
	ENDIF
	SIF operand(int)
    ```
	`SIF`は条件式が成立した場合、次の行を実行します。成立しない場合、次の行をスキップします。  
	`IF`条件式が成立した場合、次の行から`ELSEIF`、`ELSE`、`ENDIF`を迎えるまで実行し、`ENDIF`行まで飛びます。成立しない場合、`ELSEIF`、`ELSE`、`ENDIF`を迎えるまでスキップします。  
	`ELSEIF`で条件式が成立している場合、その次の行から`ELSEIF`か`ELSE`か`ENDIF`を迎えるまで実行し、`ENDIF`行まで飛びます。成立していなければ次の`ELSEIF`か`ELSE`か`ENDIF`を迎えるまでスキップし、同じことを繰り返します。  
	`ELSE`ならその次の行から`ENDIF`を迎えるまで実行します。`ELSE`は必ず`ELSEIF`の後に実行され、`ELSE`の次は`ENDIF`にする必要があります。  
	条件式は厳密には`int`型であり、0は非成立、それ以外を成立とみなします。  

!!! hint "ヒント"

    命令のみに対応しています


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
	#DIM CONST TRUE = 1
	#DIM CONST FALSE = 0
		IF TRUE
			PRINTL IF=TRUE
		ELSE
			PRINTL Can not reach here
		ENDIF

		IF FALSE
			PRINTL Can not reach here
		ELSEIF TRUE
			PRINTL ELSEIF=TRUE
		ELSE
			PRINTL Can not reach here
		ENDIF
		
		IF FALSE
			PRINTL Can not reach here
		ELSEIF FALSE
			PRINTL Can not reach here
		ELSE
			PRINTL Reached ELSE
		ENDIF

		WAIT
    ``` 
    ``` title="結果"
	Now Loading...
	IF=TRUE
	ELSEIF=TRUE
	Reached ELSE
    ```
