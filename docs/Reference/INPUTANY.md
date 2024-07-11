---
hide:
  - toc
---

# INPUTANY

| 関数名                                                       | 引数 | 戻り値           |
| :----------------------------------------------------------- | :--- | :--------------- |
| ![](../assets/images/IconEE.webp)[`INPUTANY`](./INPUTANY.md) | 無し | `int` / `string` |

!!! info "API"

    ``` { #language-erbapi }
	INPUTANY
    ```

	数値型、文字列型両方の入力を受け付けるINPUT命令  
	実行時点で`PRINTBUTTON`及び`[{int}]`のボタンをクリック可能になる  
	数値型が入力された場合は`RESULT`に、文字列型が入力された場合は`RESULTS`に代入される

!!! hint "ヒント"

	命令なので式中関数としては使用できません

!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE

	PRINTL [0] 0です
	PRINTL [1] 1です
	PRINTBUTTON "[A] Aです", "A"
	PRINTL 

	INPUTANY

	PRINTFORMW \@ RESULTS != "" ? %RESULTS% # {RESULT} \@が入力されました

    ``` 
    ``` title="結果(1を入力した場合)"
	[0] 0です
	[1] 1です
	[A] Aです
	1
	1が入力されました
    ```

    ``` title="結果(Aを入力した場合)"
	[0] 0です
	[1] 1です
	[A] Aです
	A
	Aが入力されました
    ```

### 関連項目
- [INPUT](INPUT.md)
