---
hide:
  - toc
---

# CHKCHARADATA

| 関数名                                                                   | 引数     | 戻り値 |
| :----------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CHKCHARADATA`](./CHKCHARADATA.md) | `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CHKCHARADATA filename
    ```
	datフォルダ内の`chara_*.dat`で示されるファイル名のデータの情報を返します。
	ロード可能な場合は0、何らかの理由により不可能な場合は非0が返されます。
	また、ロード可能な場合は`RESULTS:0`にセーブデータのメモを代入し、不可能な場合はその理由を`RESULTS:0`に代入します。

!!! hint "ヒント"

    命令、式中関数両方対応しています。
