---
hide:
  - toc
---

# ESCAPE

| 関数名                                                       | 引数     | 戻り値   |
| :----------------------------------------------------------- | :------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`ESCAPE`](./ESCAPE.md) | `string` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string ESCAPE string
    ```
	文字列が正規表現中で平文となるように、引数中の文字列の正規表現メタ文字をエスケープして返す

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORMW %ESCAPE("!#$%&'()")%
    ``` 
    ``` title="結果"
	!\#\$%&'\(\)
    ```
