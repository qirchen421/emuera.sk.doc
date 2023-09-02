---
hide:
  - toc
---

# CALLF, CALLFORMF

| 関数名                                                         | 引数           | 戻り値 |
| :------------------------------------------------------------- | :------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CALLF`](./CALLF.md)     | `functionName` | なし   |
| ![](../assets/images/IconEmuera.webp)[`CALLFORMF`](./CALLF.md) | `formedString` | なし   |

!!! info "API"

    ```  { #language-erbapi }
	CALLF functionName
	CALLFORMF formedString
    ```
	以下、私家改造版更新履歴より、

		式中関数を返り値無視で呼び出す命令CALLF、CALLFORMF実装
		書式：CALLF 関数名, 引数1, ....
		　　（式中関数ですが、普通の関数の引数書式で呼び出してください）
		内容：式中関数を通常の関数扱いで呼び出す、返り値は破棄される
		疑似SETTERを作りたくてやった、今は反省している

	当然だがRESULTやRESULTSは呼んだ式中関数内で操作していない限り、変化しない。
	同系統の命令で、EM+EEにて[`TRYCALLF`](./TRYCALLF.md)、[`TRYCALLFORMF`](./TRYCALLFORMF.md)が追加されています。

!!! hint "ヒント"

    命令のみ対応しています。
