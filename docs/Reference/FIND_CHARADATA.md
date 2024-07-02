---
hide:
  - toc
---

# FIND_CHARADATA

| 関数名                                                                       | 引数     | 戻り値 |
| :--------------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`FIND_CHARADATA`](./FIND_CHARADATA.md) | `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int FIND_CHARADATA filename
    ```
	[`LOADCHARA`](./LOADCHARA.md)の対象となり得るファイルをdatフォルダの中から探索しファイル名(`chara_*.dat`の`*`の部分)を`RESULTS`に代入します。  
	戻り値はヒット数（発見されたファイル数）です。  
	引数は`chara_*.dat`の`*`の部分を指定できます。  
	例えば`FIND_CHARADATA("*あなた*")`であれば、`chara_*あなた*.dat`を探し、`chara_001あなた.dat`や`chara_あなたABC.dat`がヒットします。  
	引数を省略した場合、`*`を指定したことになり`chara_*.dat`を探します。  
	なお、`chara_.dat`(`*`が空文字列)は[`LOADCHARA`](./LOADCHARA.md)で指定できないのでヒットしません。  
	ヒット数が`RESULTS`の要素数を超えた場合はエラーにはなりませんが超えた分のファイル名は代入されません。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。

### 関連項目
- [SAVECHARA](SAVECHARA.md)
- [LOADCHARA](LOADCHARA.md)
- [CHKCHARADATA](CHKCHARADATA.md)
