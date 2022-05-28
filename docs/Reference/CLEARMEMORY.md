# CLEARMEMORY

| 関数名| 引数 | 戻り値 |
| :-----| :--- | :----- |
| ![](../assets/images/IconEE.webp)[`CLEARMEMORY`](./CLEARMEMORY.md) | `void` | `int` |

!!! info "API"

	``` { #language-erbapi }
	int CLEARMEMORY
	```

	メモリを解放する。解放したメモリの量を返す(byte)

!!! hint "ヒント"

    命令、式中関数両方対応しています。  
	`LOADDATA`、`DELCHARA`、Emueraの再起動を行った後などに実行すると効果的ですが、それ以外の場面では大きな効果はありません

!!! example "例"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		REPEAT 10000
			ADDVOIDCHARA
		REND
		DELALLCHARA
		PRINTFORMW CLEARMEMORYを実行して{CLEARMEMORY()/1024/1024}MBのメモリを解放しました
	```

	``` title="結果"
	CLEARMEMORYを実行して840MBのメモリを解放しました
	```
