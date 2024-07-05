---
hide:
  - toc
---

# GCREATEFROMFILE

| 関数名                                                                         | 引数            | 戻り値 |
| :----------------------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GCREATEFROMFILE`](./GCREATEFROMFILE.md) | `int`, `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GCREATEFROMFILE gID, filePath
    ```
	`resources`フォルダ内の画像ファイルを相対パスで指定し、その画像を開いて`Graphics`を作成します。  
	`resources`フォルダ内のcsvファイルでリソースを宣言した場合と異なり、画像ファイルはロックされません。（EM+EEではCSVで指定した画像もロックされません）  
	作成に成功した場合、非0を返します。  
	指定した`gID`の`Graphics`が既に作成されている場合は`Graphics`の作成に失敗し、この命令は何もせずに0を返して終了します。  
	ファイルが存在しない、画像として認識できない、ファイルのサイズが大きすぎる、などで失敗した場合も0を返します。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。

### 関連項目
- [GCREATE](GCREATE.md)
