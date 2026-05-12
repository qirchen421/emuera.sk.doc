---
hide:
  - toc
---

# JUMP

| 関数名                                                     | 引数             | 戻り値 |
| :--------------------------------------------------------- | :--------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`JUMP`](./JUMP.md) | `functionName`   | なし   |

!!! info "API"

    ```  { #language-erbapi }
	JUMP functionName
    ```
	`@`から始まる文字列で定義された関数を呼び出す  
	関数の終端に達するか[`RETURN`](./RETURN.md)が行われると、関数を終了する  
	[`CALL`](./CALL.md)との違いは、実行時に関数をスタックしないため、遷移先の関数が終了しても戻ってこない。そのため、呼び出しスタックが無い場合はエラー終了の恐れがある  


!!! hint "ヒント"

    命令のみ対応しています。

!!! info "JUMPとRESULTの関係"

    JUMP先の関数で[`RETURN`](./RETURN.md)が実行された場合、`RESULT`は通常通り設定されます。JUMPはスタックフレームを置換するだけで、`RETURN`の`RESULT`設定動作には影響しません。

    JUMP先の関数が終了すると、`Return()`は`IsJump`フラグを検出して**再帰的にスタックを巻き戻し**、最初の非JUMP呼び出し元（[`CALL`](./CALL.md)等）まで戻ります。JUMP連鎖（A→JUMP B→JUMP C→RETURN）でも、RESULTは正しく設定されます。

    ``` { #language-erb }
    @SYSTEM_TITLE
        CALL AAA
        PRINTVL RESULT    ; 42（BBB の RETURN 42 が設定）

    @AAA
        JUMP BBB          ; AAA を BBB に置き換え
        PRINTL 不可达     ; 実行されない

    @BBB
        RETURN 42         ; RESULT = 42、再帰的に SYSTEM_TITLE まで戻る
    ```


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTL CALL to AAA
		CALL AAA

		PRINTW Backed SYSTEM_TITLE

		@AAA
		PRINTL JUMP to BBB
		JUMP BBB

		PRINTL Can not reach here

		@BBB
		PRINTL Exit BBB
		RETURN
    ``` 
    ``` title="結果"
	CALL to AAA
	JUMP to BBB
	Exit BBB
	Backed SYSTEM_TITLE
    ```

### 関連項目
- [JUMPFORM](FORM.md)
- [TRYJUMPFORM](TRYFORM.md)
- [TRYCJUMP](TRYC.md)
