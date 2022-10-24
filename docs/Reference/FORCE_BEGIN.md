---
hide:
  - toc
---

# FORCE_BEGIN

| 関数名                                                             | 引数     | 戻り値 |
| :----------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEE.webp)[`FORCE_BEGIN`](./FORCE_BEGIN.md) | `string` | `void` |

!!! info "API"

	``` { #language-erbapi }
	FORCE_BEGIN SystemFuncName
	```

	フロー制御の影響を受けずに`BEGIN`を実行する

!!! hint "ヒント"

    命令でのみ使用可能

!!! example "例"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		BEGIN ABLUP

	@SHOW_JUEL
		PRINTL @SHOW_JUEL
		FORCE_BEGIN SHOP

	@EVENTSHOP
		PRINTL @EVENTSHOP

	@SHOW_SHOP
		PRINTL @SHOW_SHOP
		FORCE_BEGIN TURNEND

	@EVENTTURNEND
		PRINTL @EVENTTURNEND
		WAIT

	```

	``` title="結果"
	@SHOW_JUEL
	@EVENTSHOP
	@SHOW_SHOP
	@EVENTTURNEND
	```
