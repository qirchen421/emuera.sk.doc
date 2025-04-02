---
hide:
  - toc
---

# RESET_STAIN

| 関数名                                                                 | 引数 | 戻り値 |
| :--------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`RESET_STAIN`](./RESET_STAIN.md) | `int`| なし   |

!!! info "API"

    ```  { #language-erbapi }
	RESET_STAIN charaID
    ```
	第1引数で指定したキャラクタの`STAIN`を初期化する命令です。 初期値は`BEGIN TRAIN`のときに代入される値と同様で、[`_replace.csv`の`汚れの初期値``](../Emuera/replace.md#_5)で指定できます。

!!! hint "ヒント"

    命令のみ対応しています。

### 関連項目
- [_replace.csv>汚れの初期値](../Emuera/replace.html#_5)
