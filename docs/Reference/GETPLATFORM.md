---
hide:
  - toc
---

# GETPLATFORM

| 関数名                                                                  | 引数 | 戻り値 |
| :---------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconSK.webp)[`GETPLATFORM`](./GETPLATFORM.md)      | なし | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GETPLATFORM
    ```
	現在の実行プラットフォームを整数で返します。

	| 戻り値 | プラットフォーム |
	| :----- | :--------------- |
	| 0      | Windows          |
	| 1      | Android          |
	| 2      | iOS              |
	| 3      | macOS            |
	| 4      | Linux            |
	| 5      | Unknown          |

	式中関数として使用できます。`CanRestructure = true`のため、コンパイル時に定数畳み込みが可能です。

!!! hint "ヒント"

	ERBスクリプトでプラットフォームごとの条件分岐が可能になります。
	例えば、モバイル環境でのみ特定の処理をスキップする場合に使用します。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
		IF GETPLATFORM() == 0
			PRINTL Windows環境です
		ELSEIF GETPLATFORM() == 1
			PRINTL Android環境です
		ELSE
			PRINTL その他の環境です
		ENDIF
    ```

### 関連項目
- [GETCONFIG](GETCONFIG.md)
- [GETSTYLE](FONT_OPERATION.md)
