---
hide:
  - toc
---

# VARSET

| 関数名                                                             | 引数                                              | 戻り値 |
| :----------------------------------------------------------------- | :------------------------------------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`VARSET`](./VARSET.md)       | `variable`(, `value`, `startIndex`, `endIndex`)   | なし   |

!!! info "API"

    ```  { #language-erbapi }
	VARSET variableName(, value, startIndex, endIndex)
    ```
	指定した変数の配列の指定範囲に第二引数の値を代入します。  
	第二引数を省略した場合、`0`または空文字列が代入されます。  
	第三引数以降を省略した場合、配列の全てに代入されます。  
	例えば  

    ```  { #language-erbapi }
	VARSET FLAG, 0
	VARSET STR, "あああ", 0, 10
	VARSET TA:0:0:0,5678
	```

	この例では`FLAG`の要素全てが`0`になります。  
	`STR:0`から`STR:9`には`あああ`が代入され、`TA`についても三次元配列の全ての要素に`5678`が代入されます。  
	同じことはERB上で[`FOR-NEXT`](./FOR.md)ループなどを使って行うこともできますが、ループ回数が数十万回程度になると実行時間が無視できなくなります。  
	`VARSET`命令はERB上での代入よりはるかに早く処理を終わらせることができます。  
	キャラクタ変数を`VARSET`命令の対象にした場合、指定したキャラの要素のみに代入されます。  

    ```  { #language-erbapi }
	VARSET CFLAG:MASTER:0, 0
	VARSET CSTR, ""
	```

	この例では`MASTER`の`CFLAG:0～999`（VariableSize.csvを変更していなければ）が`0`になりますが、他のキャラの`CFLAG`は影響を受けません。
	また、対象を省略した場合は通常通り`TARGET`とみなされるので`TARGET`の`CSTR`が全て空文字列になります。他のキャラの`CSTR`は影響を受けません。
	1次元配列および配列型キャラクタ変数以外の、`DITEMTYPE`や`TA`等に使用した場合、第三引数以降は無視され配列の全てに代入されます。

!!! hint "ヒント"

    命令のみ対応しています。

### 関連項目
- [VARSETEX](VARSETEX.md)
