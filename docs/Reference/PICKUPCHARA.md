---
hide:
  - toc
---

# PICKUPCHARA

| 関数名                                                                 | 引数              | 戻り値 |
| :--------------------------------------------------------------------- | :---------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`PICKUPCHARA`](./PICKUPCHARA.md) | `int`(, `int`...) | なし   |

!!! info "API"

    ```  { #language-erbapi }
	PICKUPCHARA charaID(, charaID...)
    ```
	引数で指定したキャラのみを残し、他のキャラを全て削除する命令です。  
	`MASTER:0`、`TARGET:0`、`ASSI:0`などは自動で追随します。命令後手動で設定し直す必要はありません。  
	対象キャラに負の値を指定した場合エラーになりますが、`MASTER`、`TARGET`、`ASSI`等を対象に設定し、  
	その結果それらの変数の中身が負の値だった場合は、例外でエラーになりません（無視される）。  

!!! hint "ヒント"

    命令のみ対応しています。
