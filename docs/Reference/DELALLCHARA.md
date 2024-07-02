---
hide:
  - toc
---

# DELALLCHARA

| 関数名                                                                 | 引数 | 戻り値 |
| :--------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`DELALLCHARA`](./DELALLCHARA.md) | なし | なし   |

!!! info "API"

    ```  { #language-erbapi }
	DELALLCHARA
    ```
	登録されている全てのキャラクタを削除します。 以下のスクリプトと同じことです。

    ```  { #language-erbapi }
	REPEAT CHARANUM
		DELCHARA 0
	REND
	```

!!! hint "ヒント"

    命令のみ対応しています。

### 関連項目
- [DELCHARA](DELCHARA.md)
