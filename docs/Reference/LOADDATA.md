---
hide:
  - toc
---

# LOADDATA

| 関数名                                                           | 引数 | 戻り値 |
| :--------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`LOADDATA`](./LOADDATA.md) | `int`| なし   |

!!! info "API"

    ```  { #language-erbapi }
	LOADDATA saveID
    ```
	`saveID`で示される番号のファイルのデータをロードします。  
	ロードに失敗した場合、エラー終了します。  
	必ず[`CHKDATA`](./CHKDATA.md)命令でロード可能かどうかを調べてから実行してください。  
	`LOADDATA`は([`LOADGAME`](./SAVEGAME.md)命令と違って)スクリプトのどの場所でも呼び出すことができます。  

!!! hint "ヒント"

    命令のみ対応しています。
