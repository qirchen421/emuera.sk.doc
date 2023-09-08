---
hide:
  - toc
---

# TOOLTIP_SETDELAY, TOOLTIP_SETDURATION

| 関数名                                                                         | 引数    | 戻り値 |
| :----------------------------------------------------------------------------- | :------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`TOOLTIP_SETDELAY`](./TOOLTIP_SET.md)    | `int`   | なし   |
| ![](../assets/images/IconEmuera.webp)[`TOOLTIP_SETDURATION`](./TOOLTIP_SET.md) | `int`   | なし   |

!!! info "API"

    ```  { #language-erbapi }
	TOOLTIP_SETDELAY milliSecond
	TOOLTIP_SETDURATION milliSecond
    ```
	`TOOLTIP_SETDELAY`ツールチップが表示されるまでの時間をミリ秒単位で設定します。
	ディフォルトは500(ミリ秒)、最大値は32767です。

	`TOOLTIP_SETDURATION`はツールチップの表示時間をミリ秒単位で設定します。0を指定するとデフォルトの表示時間になります。

!!! hint "ヒント"

    命令のみ対応しています。
