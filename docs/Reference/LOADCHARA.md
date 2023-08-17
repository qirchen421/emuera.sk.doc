---
hide:
  - toc
---

# LOADCHARA

| 関数名                                                             | 引数     | 戻り値 |
| :----------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`LOADCHARA`](./LOADCHARA.md) | `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	LOADCHARA filename
    ```
	第一引数はデータをロードするファイル名(の一部)を指定します。実際のファイル名は`chara_*.dat`になります。  
	`RESULT:0`に、読み取りに失敗した場合は`0`を、成功した場合は`1`を代入します。  
	`LOADCHARA`の前に[`CHKCHARADATA`](./CHKCHARADATA.md)関数によりファイルの適切さを確認すべきです。  
	`LOADCHARA`はSAVEされているキャラの数だけ新しいキャラを登録します。  
	したがって既存の登録キャラには影響しません。  
	何名のキャラが追加されたかを知るにはロード前後での`CHARANUM`を比較してください。  

!!! hint "ヒント"

    命令のみ対応しています。
