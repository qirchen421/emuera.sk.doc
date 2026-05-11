---
hide:
  - toc
---

# RANDOMIZE, DUMPRAND, INITRAND

| 関数名                                                             | 引数  | 戻り値 |
| :----------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`RANDOMIZE`](./RANDOMIZE.md) | `int` | なし   |
| ![](../assets/images/IconEmuera.webp)[`DUMPRAND`](./RANDOMIZE.md)  | なし  | なし   |
| ![](../assets/images/IconEmuera.webp)[`INITRAND`](./RANDOMIZE.md)  | なし  | なし   |

!!! info "API"

    ```  { #language-erbapi }
	RANDOMIZE int
	DUMPRAND
	INITRAND
    ```
	`RAND:X`で得られる乱数を制御するための命令です。  

	`RANDOMIZE`命令は指定した値で乱数を初期化します。  
	同じ値で初期化したならば、`RAND`は必ず同じ結果を返します。  
	[`PRINTDATA`](./PRINTDATA.md)、[`STRDATA`](./STRDATA.md)に関しても同じ結果を返します。

	`DUMPRAND`は現在の乱数の状態を`RANDDATA`変数に保存します。  
	`INITRAND`は`RANDDATA`変数に保存したデータを読み出します。  
	`DUMPRAND`を行う前に`INITRAND`を行ってしまわないように注意してください。  
	`RANDDATA`変数の中身が不適当な場合、`RAND`が正常に動作しなくなります。  

	**例文**
    ```  { #language-erbapi }
	PRINTFORML {RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}
	RANDOMIZE 23478612
	PRINTFORML {RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}
	RANDOMIZE 23478612
	PRINTFORML {RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}
	DUMPRAND
	PRINTFORML {RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}
	INITRAND
	PRINTFORML {RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}
	INITRAND
	PRINTFORML {RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}/{RAND:100000}
	```

	**結果**
	```
	92539/49469/48337/15839/48368/1604
	34536/91889/81167/22434/87922/95565
	34536/91889/81167/22434/87922/95565
	68286/10690/68868/82610/90769/60789
	68286/10690/68868/82610/90769/60789
	68286/10690/68868/82610/90769/60789
	```

	上記の結果のうち、最初の行は不定です。実行するたびに結果が変わります。  
	2行目、3行目は同じ値で`RANDOMIZE`した直後なので必ずこの結果になります。  
	4行目の前に`DUMPRAND`命令を実行しています。  
	5行目の前に`INITRAND`命令を行うことで、`RAND`の状態を`DUMPRAND`命令で保存した状態まで戻しています。  
	そのため、4行目と5行目は結果が同じになっています。  
	6行目では再度`INITRAND`命令を行うことで、繰り返し同じ結果を得ています。  
	`RANDDATA`変数はセーブされる変数なので、セーブ前に`DUMPRAND`を行い、ロード直後に`INITRAND`を行うことで同じ乱数状態を続けて使うことができます。  

!!! hint "ヒント"

    命令のみ対応しています。

### ![](../assets/images/IconSK.webp)Skia版の変更点

!!! info "新乱数アルゴリズムとの分離"

    原版では `UseNewRandom=true` の場合、`INITRAND`/`DUMPRAND` は警告を出力してスキップされます。Skia版ではこのチェックを削除し、`INITRAND`/`DUMPRAND` が常に MTRandom の状態を操作するように変更しました。`GetNextRand` には影響しません。
