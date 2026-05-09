---
hide:
  - toc
---

# LOADTEXT

| 関数名                                                                                            | 引数                  | 戻り値   |
| :------------------------------------------------------------------------------------------------ | :-------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`LOADTEXT`](./LOADTEXT.md) | `int`(, `int`, `int`) | `string` |

!!! info "API"

    ```  { #language-erbapi }
	LOADTEXT fileNo{, force_savdir, int force_UTF8}
    ```
	`LOADTEXT`命令版は`textXX.sav`を読み取りその結果を`RESULTS:0`に代入します。  
	第2引数に非0を指定した場合、オプションによらずsavフォルダ内のファイルを探します。  
	第3引数に非0を指定した場合、UTF-8エンコードで保存されているものとして読み取ります。  
	失敗した場合、`RESULTS:0`が空文字列になります。  
	同名の式中関数もあり、`RESULTS:0`の代わりに返り値に読取結果又は空文字列を返します。

!!! info "EM+EE拡張：文字列パスオーバーロード"

    ```  { #language-erbapi }
	LOADTEXT filePath
    ```
    第1引数に**文字列**を指定した場合、ファイルパスとして読み込みます。EM+EEで追加された引数型オーバーロードで、より柔軟なファイル読み込みが可能です：

    - パスは`Emuera.exe`からの相対パスで指定（`..`は無効）
    - 設定画面または`Emuera.config`の「LOADTEXTとSAVETEXTで使える拡張子」項目で許可された拡張子のみ使用可能（デフォルトは`txt`のみ）
    - 指定した拡張子が許可リストにない場合、**空文字列を返します**（SAVETEXTと異なり、自動的に`.txt`には変更されません）
    - 文字列パス使用時は**ファイルエンコーディングを自動検出**します（`force_UTF8`引数は無視）
    - 読み取り結果の`\r`は自動的に削除されます

    ``` title="emuera.config"
    LOADTEXTとSAVETEXTで使える拡張子:txt,xml,json
    ```

    ```  { #language-erbapi title="例" }
    ; 標準用法：番号でsavフォルダから読み込み
    LOADTEXT 0

    ; EM+EE拡張：パスでカスタム位置から読み込み
    LOCALS = %LOADTEXT("plugins/config.json")%
    ```

!!! hint "ヒント"

    命令、式中関数両方対応しています。

### 関連項目
- [SAVETEXT](SAVETEXT.md)
