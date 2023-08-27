---
hide:
  - toc
---

# DO-LOOP

| 関数名                                                 | 引数  | 戻り値 |
| :----------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`DO`](./DO.md)   | なし  | なし   |
| ![](../assets/images/IconEmuera.webp)[`LOOP`](./DO.md) | `int` | なし   |

!!! info "API"

    ```  { #language-erbapi }
	DO
	LOOP bool
    ```
	[`REPEAT～REND`](./REPEAT.md)や[`FOR～NEXT`](./FOR.md)のような繰り返し構文の一種です。  
	Cの`do～while`、VBの`do～loop while`構文と同様、`LOOP`の`bool`が`0`以外である限り実行をループを繰り返します。  
	[`WHILE～WEND`](./WHILE.md)と異なり最低でも1回は実行されることが特徴です。  
	なお、`DO～LOOP`内で[`CONTINUE`](./CONTINUE.md)した場合には`LOOP`の条件を満たしていなければそのまま`LOOP`を抜けます。`CONTINUE`しても`DO`文に戻るとは限らないことに注意してください。  
	また、[`GOTO`](./GOTO.md)等の命令で直接`DO～LOOP`内に入った場合、通常どおり`LOOP`に到達した時点で条件を判定し、`bool`が`0`以外なら`DO`へループします。  

!!! hint "ヒント"

    命令のみ対応しています。
