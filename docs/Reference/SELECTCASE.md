---
hide:
  - toc
---

# SELECTCASE

| 関数名                                                               | 引数  | 戻り値 |
| :------------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SELECTCASE`](./SELECTCASE.md) | `any` | なし   |
| ![](../assets/images/IconEmuera.webp)[`CASE`](./SELECTCASE.md)       | `any` | なし   |
| ![](../assets/images/IconEmuera.webp)[`CASEELSE`](./SELECTCASE.md)   | なし  | なし   |
| ![](../assets/images/IconEmuera.webp)[`ENDSELECT`](./SELECTCASE.md)  | なし  | なし   |

!!! info "API"

    ```  { #language-erbapi }
	SELECTCASE anyValue
	CASE anyValue(, anyValue...)
	CASEELSE
	ENDSELECT
    ```
	分岐構文です。Visual Basicの同名の構文と動作を似せています。  
	[`IF`](./IF.md)構文と似ていますが、`SELECTCASE`は1つの値を元に複数の行へ分岐する構文です。  
	`SELECTCASE`に指定した引数の値によって分岐します。 もっとも単純な使用法は以下のようになります。  

    ```  { #language-erbapi }
	SELECTCASE X  
		CASE 1  
			PRINTL Xは1です。  
		CASE 3  
			PRINTL Xは3です。  
		CASEELSE  
			PRINTL Xは1でも3でもありません。  
	ENDSELECT  
	```

	このスクリプトは`X`の値によって分岐します。  
	`SELECTCASE`文が実行された時、`X`が`1`であれば`CASE 1`の行に飛び、次の`CASE`または`CASEELSE`までの行を実行します。  
	同様に`X`が`3`であれば`CASE 3`に飛びます。  
	`X`の値に対応する`CASE`文がない時、`CASEELSE`文があればそこに飛びます。なければ`ENDSELECT`に飛びます。  
	Cなどの`switch`文と異なり、1つの`CASE`から次の`CASE`に流れ落ちることはありません。  
	また、[`BREAK`](./CONTINUE.md)文で`ENDSELECT`に飛ぶことはできません。  
	なお、[`GOTO`](./GOTO.md)等の命令で直接`SELECTCASE～CASE～CASEELSE～ENDSELECT`内に入った場合、[`IF～ELSEIF～ELSE～ENDIF`](./IF.md)と同様に  
	`CASE`、`CASEELSE`、`ENDSELECT`の直前まで通常通り実行したあとに、`ENDSELECT`の次の行へ飛び処理を続行します。  
	`CASE`の条件式には3種類の書式があります。  
	1つは上記のように値を直接指定する方法、2つ目は`IS <演算子> <数式>`、3つめは`<数式> TO <数式>`です。  
	`IS <演算子> <数式>`の場合、例えば`IS <= 30`であれば`X`が`30`以下の場合、`CASE`以下が実行されます。  
	`<数式> TO <数式>`の場合、例えば`10 TO 20`であれば`X`が`10`以上`20`以下の場合、`CASE`以下が実行されます。  
	また、`CASE`には複数の条件式をカンマで区切って指定することができます。  
	これらを利用して例えば以下のように書くことができます。  
  
    ```  { #language-erbapi }
	SELECTCASE X  
		CASE 1  
			PRINTL Xは1です。  
		CASE 2,3  
			PRINTL Xは1ではありません。  
			PRINTL Xは2か3です。  
		CASE 10 TO 20  
			PRINTL Xは1でも2でも3でもありません。  
			PRINTL Xは10以上20以下です。  
		CASE IS <= 30  
			PRINTL Xは1, 2, 3, 10以上20以下のどれでもありません。  
			PRINTL Xは30以下です。  
		CASE 40, 5 * 10 TO 6 * 10, IS >= 10 * 10  
			PRINTL Xは30以下ではありません。  
			PRINTL Xは40, 50以上60以下, 100以上のいずれかです。  
		CASEELSE  
			PRINTL Xは30以下, 40, 50以上60以下, 100以上のいずれにも該当しません。  
	ENDSELECT  
	```

	`IS`や`TO`は`IS <演算子> <数式>`、`<数式> TO <数式>`の形で使わねばならないことに注意してください。  
	例えば`30 < IS`や`(10 TO 20) || (30 TO 40)`のような書き方はできません。  
	また、`<数式> TO <数式>`はあくまでも左辺以上、右辺以下の場合に真となります。  
	右辺が左辺より小さい場合はその`CASE`が実行されることはありません。  
  
	1つの`CASE`に複数の条件式がある場合、短絡評価が起きることに注意してください。  
	条件は左から順にチェックされ、条件を満たすものが見つかった場合、残りの条件は評価されません。  
  
	`SELECTCASE`の引数として文字列式を使用することもできます。  
	`SELECTCASE`に文字列を指定した場合は`CASE`の条件式も文字列式である必要があります。  

!!! info "Skia 拡張：ジャンプテーブル最適化"

    ![](../assets/images/Icondotnet.webp) Skia は `SELECTCASE` に**ジャンプテーブル（Jump Table）**コンパイル時最適化を導入しました。条件を満たす `CASE` 条件をハッシュテーブル（`Dictionary`）として構築し、**O(1) ランタイム検索**を実現します。

    **適用条件**

    ジャンプテーブル最適化は、以下の条件がすべて満たされる場合にのみ有効になります：

    - `SELECTCASE` のすべての `CASE` 条件式が**直接値**である（`TO` や `IS` 式を使用しない）
    - すべての `CASE` 値が**コンパイル時定数**である（例：リテラル `1`、`"hello"` 等であり、変数ではない）
    - `CASEELSE` 文はデフォルト分岐として通常通り使用可能

    以下の場合、ジャンプテーブル最適化は無効になり、従来の線形スキャンにフォールバックします：

    - いずれかの `CASE` に `TO` 式（範囲一致）または `IS` 式（条件一致）が含まれる
    - いずれかの `CASE` 値に非定数式（変数など）が含まれる

    整数、文字列、浮動小数点数の3つのデータ型をサポートします。

!!! hint "ヒント"

    命令のみ対応しています。

### 関連項目
- [IF-ENDIF](IF.md)
- [PRINTDATA](PRINTDATA.md)
- [STRDATA](STRDATA.md)
