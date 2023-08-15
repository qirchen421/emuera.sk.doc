---
hide:
  - toc
---

# TOUPPER, TOLOWER, TOHALF, TOFULL

| 関数名                                                         | 引数     | 戻り値   |
| :------------------------------------------------------------- | :------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`TOUPPER`](./TOUPPER.md) | `string` | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOLOWER`](./TOUPPER.md) | `string` | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOHALF`](./TOUPPER.md)  | `string` | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOFULL`](./TOUPPER.md)  | `string` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string TOUPPER string
	string TOLOWER string
	string TOHALF string
	string TOFULL string
    ```
	引数の文字列に特定の変換をかけた結果を`RESULTS:0`に代入もしくは返します。  
	`TOUPPER`はアルファベットを大文字にした結果を、`TOLOWER`は小文字化した結果を代入します  
	`TOHALF`は全角文字を半角にしますが、対応する半角文字がない全角文字はそのままです。  
	`TOFULL`は半角文字を全角にします。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
	PRINTFORML %TOUPPER("eRAseRmOToRpHAntOM")%
	PRINTFORML %TOLOWER("BEATMANIA")+"IIDX"%
	PRINTFORML %TOHALF("パルスのファルシのルシがパージでコクーン")%
	PRINTFORMW %TOFULL("SUGOI DEKAI")%
    ``` 
    ``` title="結果"
	ERASERMOTORPHANTOM
	beatmaniaIIDX
	ﾊﾟﾙｽのﾌｧﾙｼのﾙｼがﾊﾟｰｼﾞでｺｸｰﾝ
	ＳＵＧＯＩ　ＤＥＫＡＩ
    ```
