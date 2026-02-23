---
hide:
  - toc
---

# VARI,VARS

| 関数名                                                  | 引数              | 戻り値 |
| :------------------------------------------------------ | :---------------- | :----- |
| ![](../assets/images/Icondotnet.webp)[`VARI`](./VAR.md) | `string`(, `int`) | なし   |
| ![](../assets/images/Icondotnet.webp)[`VARS`](./VAR.md) | `string`(, `int`) | なし   |


!!! info "API"

    ```  { #language-erbapi }
	VARI variableName = intValue
	VARS variableName = strValue
	VARI variableName(, arraySize)
	VARS variableName(, arraySize)
    ```

	関数中のどこでも関数ローカルなダイナミック変数を定義できます  
	`VARI`が整数、`VARS`が文字列です  
	初期値として配列は与えられず、文字列は`"～"`で囲われている必要があります  

    ```  { #language-erbapi }
	VARS QUESTION = "生命、宇宙、そして万物についての究極の疑問の答え"
	VARI ANSWER = 42
	PRINTFORML Q.%QUESTION%
	PRINTFORML A.{ANSWER}

	VARI INTEGER, 3

	REPEAT 4
		INTEGER:COUNT = COUNT*14
		PRINTFORML {INTEGER:COUNT}
	REND
	```

    ``` title="結果"
	Q.生命、宇宙、そして万物についての究極の疑問の答え
	A.42

	0
	14
	28
	42
	```

!!! hint "ヒント"

    命令のみ対応しています。

### 関連項目
- [関数・プリプロセッサ>#DIM](../Emuera/function.md#dim)
