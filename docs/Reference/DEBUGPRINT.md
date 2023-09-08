---
hide:
  - toc
---

# DEBUGPRINT系

| 関数名                                                                    | 引数           | 戻り値 |
| :------------------------------------------------------------------------ | :------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINT`](./DEBUGPRINT.md)      | `string`       | なし   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTL`](./DEBUGPRINT.md)     | `string`       | なし   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTFORM`](./DEBUGPRINT.md)  | `formedString` | なし   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTFORML`](./DEBUGPRINT.md) | `formedString` | なし   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGCLEAR`](./DEBUGPRINT.md)      | なし           | なし   |

!!! info "API"

    ```  { #language-erbapi }
	DEBUGPRINT string
	DEBUGPRINTL string
	DEBUGPRINTFORM formedString
	DEBUGPRINTFORML formedString
    ```
	`DEBUG`系命令は[デバッグモード](../Emuera/debug.md)で起動したときのみ動作します。  
	非デバッグモード時には何もしません。  
	非デバッグモード時には引数の解析も行われないため、<書式付文字列>におかしな点ががあってもエラーになりません。  

	`DEBUGPRINT`系はそれぞれ[`PRINT`](./PRINT.md)命令や[`PRINTL`](./PRINT.md)と同様の動作をします。  
	異なる点は出力先がメインコンソールではなくデバッグコンソールである点です。  
	また、[`SKIPDISP`](./SKIP_RELATE.md)命令の影響を受けず、nを使用することもできません。  

	`DEBUGCLEAR`はデバッグコンソールのPRINT内容を全て削除します。

!!! hint "ヒント"

    命令のみ対応しています。
