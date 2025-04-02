---
hide:
  - toc
---

# WHILE-WEND

| 関数名                                                     | 引数  | 戻り値 |
| :--------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`WHILE`](./WHILE.md) | `int` | なし   |
| ![](../assets/images/IconEmuera.webp)[`WEND`](./WHILE.md)  | なし  | なし   |

!!! info "API"

    ```  { #language-erbapi }
	WHILE bool
	WEND
    ```
	[`REPEAT～REND`](./REPEAT.md)や[`FOR～NEXT`](./FOR.md)のような繰り返し構文の一種です。  
	`WHILE`の`bool`が0以外である限りループを繰り返します。  
	常に満たし続ける条件を与えると、[`BREAK`](./CONTINUE.md)で抜けるようになっていない限り無限ループになります  
	あまりにループ処理が長いとEmueraが文句を言う場合があります  
	なお、[`GOTO`](./GOTO.md)等の命令で直接`WHILE～WEND`内に入った場合、通常どおり`WEND`に到達した時点で`WHILE`へループし、条件を判定します。  

!!! hint "ヒント"

    命令のみ対応しています。

### 関連項目
- [REPEAT-REND](REPEAT.md)
- [FOR-NEXT](FOR.md)
- [CONTINUE.BREAK](CONTINUE.md)
