---
hide:
  - toc
---

# TRYJUMP, TRYCALL, TRYGOTO

| 関数名                                                     | 引数                       | 戻り値 |
| :--------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TRYCALL`](./TRY.md) | `functionName`(, `any`...) | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`TRYJUMP`](./TRY.md) | `functionName`(, `any`...) | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTO`](./TRY.md) | `labelName`                | なし   |

!!! info "API"

    ```  { #language-erbapi }
	TRYCALL functionName(, `argument`...)
	TRYJUMP functionName(, `argument`...)
	TRYGOTO labelName
    ```
	[`JUMP`](./JUMP.md)、[`CALL`](./CALL.md)、[`GOTO`](./GOTO.md)と同じですが、指定した関数が存在しなくともエラーになりません。  
	指定した関数が存在しない場合は何もしません。  
	`TRYJUMP`と`TRYCALL`は引数を指定できます。詳しくは[関数ページの`自作関数における引数指定`の項](../Emuera//function.md#_2)を参照してください。  
	なお、`TRYGOTO`で直接[`IF～ELSEIF～ELSE～ENDIF`](./IF.md)内に入った場合、`ELSEIF`、`ELSE`、`ENDIF`の直前まで通常通り実行したあとに、`ENDIF`の次の行へ飛び処理を続行します。  
	また直接[`REPEAT～REND`](./REPEAT.md)内に入った場合、`REND`の直前まで通常通り実行し、その後`REND`を無視して次の行から処理を続行します。  
	これらの処理は`GOTO`や他の`GOTO`系命令と同様の処理です。その他のEmueraで追加されたループ・分岐構文については[`ループ・分岐構文`](../Reference/README.md#flow-control)、[`TRYC`系](./TRYC.md)の項を参照してください。  

!!! hint "ヒント"

    命令のみ対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		TRYCALL AAA
		TRYCALL BBB
		TRYCALL CCC
		WAIT

	@AAA
		PRINTL AAA

	@CCC
		PRINTL CCC
    ``` 
    ``` title="結果"
	AAA
	CCC
    ```

### 関連項目
- [TRY◯◯FORM](TRYFORM.md)
- [CALL](CALL.md)
- [JUMP](JUMP.md)
- [GOTO](GOTO.md)
