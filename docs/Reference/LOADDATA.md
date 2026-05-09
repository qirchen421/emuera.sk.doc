---
hide:
  - toc
---

# LOADDATA

| 関数名                                                           | 引数 | 戻り値 |
| :--------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`LOADDATA`](./LOADDATA.md) | `int`| なし   |

!!! info "API"

    ```  { #language-erbapi }
	LOADDATA saveID
    ```
	`saveID`で示される番号のファイルのデータをロードします。  
	ロードに失敗した場合、エラー終了します。  
	必ず[`CHKDATA`](./CHKDATA.md)命令でロード可能かどうかを調べてから実行してください。  
	`LOADDATA`は([`LOADGAME`](./SAVEGAME.md)命令と違って)スクリプトのどの場所でも呼び出すことができます。  

!!! info "EM+EE拡張：セーブデータ形式拡張"

    EM+EEは`LOADDATA`のロード動作を拡張し、標準セーブデータをロードする前に、現在メモリ上のEM独自データをクリアします：

    - **Mapデータ**：`SAVEDATA`キーワード付きの[`MAP`](./MAP.md)辞書がクリアされます
    - **Xmlデータ**：`SAVEDATA`キーワード付きのXMLドキュメントが削除されます
    - **DataTableデータ**：`SAVEDATA`キーワード付きのDataTableテーブルがクリアされます

    クリア後、セーブデータから対応するEM独自データが復元され、セーブ切り替え時のデータ一貫性が確保されます。  
    つまり、セーブデータに一部のEM独自データが含まれていない場合、ロード後はそれらのデータが存在しなくなります（ロード前の値は保持されません）。

!!! hint "ヒント"

    命令のみ対応しています。

### 関連項目
- [SAVEDATA](SAVEDATA.md)
- [CHKDATA](CHKDATA.md)
