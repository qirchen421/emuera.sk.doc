---
hide:
  - toc
---

# TRYC系

| 関数名                                                           | 引数                       | 戻り値 |
| :--------------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TRYCCALL`](./TRYC.md)     | `functionName`(, `any`...) | なし   |
| ![](../assets/images/IconEmuera.webp)[`TRYCJUMP`](./TRYC.md)     | `functionName`(, `any`...) | なし   |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTO`](./TRYC.md)      | `labelName`                | なし   |
| ![](../assets/images/IconEmuera.webp)[`TRYCCALLFORM`](./TRYC.md) | `functionName`(, `any`...) | なし   |
| ![](../assets/images/IconEmuera.webp)[`TRYCCALLFORM`](./TRYC.md) | `functionName`(, `any`...) | なし   |
| ![](../assets/images/IconEmuera.webp)[`TRYCGOTOFORM`](./TRYC.md) | `labelName`                | なし   |
| ![](../assets/images/IconEmuera.webp)[`CATCH`](./TRYC.md)        | なし                       | なし   |
| ![](../assets/images/IconEmuera.webp)[`ENDCATCH`](./TRYC.md)     | なし                       | なし   |

!!! info "API"

    ```  { #language-erbapi }
	TRYCCALL functionName(, argument...)
	TRYCJUMP functionName(, argument...)
	TRYCJUMP labelName
	TRYCCALLFORM formedString(, argument...)
	TRYCJUMPFORM formedString(, argument...)
	TRYCGOTOFORM formedString
	CATCH
	ENDCATCH
    ```
	`TRYC`系の関数呼び出し時に関数が見つからなかった場合の挙動を制御できます。  
	関数が存在した場合は関数を呼び出し`TRYC`以降の行を、存在しなかった場合は`CATCH`以降の行を実行します。  
	文法としては[`IF～ELSE～ENDIF`](./IF.md)と同様になります（違いは関数があった場合の処理がなくてもよいこと）  
	そのため、[`GOTO`](./GOTO.md)等の命令で直接`TRYC系～CATCH～ENDCATCH`内に入った場合、`IF～ELSEIF～ELSE～ENDIF`と同様に  
	`CATCH`、`ENDCATCH`の直前まで通常通り実行したあとに、`ENDCATCH`の次の行へ飛び処理を続行します。  
	また、`TRYCGOTO`・`TRYCGOTOFORM`で直接ループ・分岐構文内に入った場合については[`TRYGOTO`](./TRY.md)や[`ループ・分岐構文`](../Reference/README.md#_8)の項を参照してください。  

    ```  { #language-erbapi }
		TRYCCALL UNKNOWN_FUNC ;存在しない関数
			;関数があったとき、関数処理後に行う処理（あれば、なければ省略して直CATCHでOK）
		CATCH
			;関数がなかったときに行う処理
		ENDCATCH
	```

	なお、入れ子可能です。  

!!! hint "ヒント"

    命令のみ対応しています。

### 関連項目
- [TRY系](TRY.md)
- [CALL](CALL.md)
- [JUMP](JUMP.md)
- [GOTO](GOTO.md)
