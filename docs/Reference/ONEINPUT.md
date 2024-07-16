---
hide:
  - toc
---

# ONEINPUT(S)

| 関数名                                                             | 引数              | 戻り値   |
| :----------------------------------------------------------------- | :---------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`ONEINPUT`](./ONEINPUT.md)   | `int`(, `int`)    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`ONEINPUTS`](./ONEINPUT.md)  | `string`(, `int`) | `string` |

!!! info "API"

    ```  { #language-erbapi }
	ONEINPUT defaultValue
	ONEINPUTS defaultValue
    ```
	一文字限定入力自動処理命令`ONEINPUT`、`ONEINPUTS`  
	書式：`ONEINPUT`` or `ONEINPUTS`  
	内容：一文字のみの入力を受け付ける、入力すると自動的に次の処理に移る  

	ペースト等を用いて複数桁の数字（複数の文字）を一度に貼りつけた場合、最初の桁（文字）のみが入力されたものとして処理されます。  
	`INPUT`や`INPUTS`同様、引数により空文字列を入力された場合のデフォルト入力値を設定することができます。  
	ただし、`ONEINPUT`で負の値を指定した場合や、`ONEINPUTS`で空文字列を指定した場合は、引数は無効となり、引数なしの場合と同じ挙動になります。  
	また、複数桁の数字（複数の文字）を引数とした場合、最初の桁（文字）のみがデフォルト入力値となります。  
	引数を省略し空文字列を入力した場合、通常と同様に`ONEINPUT`は再入力、`ONEINPUTS`は`RESULTS`に空文字列が代入され次の処理へ進みます。  
	`ONEINPUTS`の場合、空文字列のままEnterを押しても空文字列を入力したとみなされます。  
	なお、これらの命令を利用した場合にはEmueraのCONFIG設定においてキーボードマクロを使用する設定になっていても、  
	うまく働かない現象が起こりますがそれは仕様です。  
	また`ONEINPUTS`において、`INPUTS`同様にマクロ式を用いることができます。  
	文字列として()を使用する場合、を用いてエスケープしてください。  

!!! hint "ヒント"

    命令のみ対応しています。
### 関連項目
- [INPUT](INPUT.md)
