---
hide:
  - toc
---

# GSAVE, GLOAD

| 関数名                                                         | 引数         | 戻り値 |
| :------------------------------------------------------------- | :----------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GSAVE`](./GSAVELOAD.md) | `int`, `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GLOAD`](./GSAVELOAD.md) | `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GSAVE gID, fileNo
	int GLOAD gID, fileNo
    ```
	`GSAVE`は指定した`gID`の`Graphics`の画像を、`fileNo`の番号を付けたファイル名で`png`形式で出力し保存します。  
	処理に成功した場合、非0を返します。  

	`GLOAD`は`fileNo`の番号を付けたファイル名の画像を開き、`Graphics`を作成します。  
	動作としては[`GCREATEFORMFILE`](./GCREATEFROMFILE.md)命令とほぼ同じですが`resouces`フォルダ内の画像ではなく`GSAVE`命令で保存した画像から作成する点が異なります。  
	処理に成功した場合、非0を返します。  
	指定した`gID`の`Graphics`が既に作成されている場合は`Graphics`の作成に失敗し、この命令は何もせずに0を返して終了します。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。

### 関連項目
- [GCREATE](GCREATE.md)
- [GCREATEFROMFILE](GCREATEFROMFILE.md)
