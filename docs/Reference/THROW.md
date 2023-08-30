---
hide:
  - toc
---

# THROW

| 関数名                                                     | 引数     | 戻り値 |
| :--------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`THROW`](./THROW.md) | `string` | なし   |

!!! info "API"

    ```  { #language-erbapi }
	THROW formedString
    ```
    強制的にエラーとし、引数に与えた文字列でエラー表示を行う命令です。


!!! hint "ヒント"

    命令のみ対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		THROW お気の毒ですが、冒険の書は消えてしまいました
    ``` 
    ``` title="結果"
	Now Loading...
	MAIN.ERBの2行目でTHROWが発生しました
	THROW お気の毒ですが、冒険の書は消えてしまいました
	THROW内容：お気の毒ですが、冒険の書は消えてしまいました
	現在の関数：@SYSTEM_TITLE（MAIN.ERBの1行目）
	関数呼び出しスタック：
	※※※ログファイルをemuera.logに出力しました※※※
    ```
