---
hide:
  - toc
---

# SAVETEXT

| 関数名                                                                                            | 引数                            | 戻り値 |
| :------------------------------------------------------------------------------------------------ | :------------------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`SAVETEXT`](./SAVETEXT.md) | `string`, `int`(, `int`, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SAVETEXT text, fileNo(, forceSavdir, forceUTF8)
    ```
	`text`で指定したテキストを、ファイル名`textXX.txt`（例えば`fileNo`が`2`なら`text02.txt`）に保存します。  
	この命令はテキストにヘッダーなどを付け加えたり変更したりすることなく文字列そのままを保存します。  
	この命令は通常はオプション設定の影響を受け、savフォルダ内に作成されたり、`UTF-8`で保存されます。  
	第3引数に非0を指定した場合、オプションを無視して強制的にsavフォルダ内に保存します。savフォルダは必要に応じて作成されます。  
	第4引数に非0を指定した場合、オプションを無視して強制的にUTF-8エンコードで保存します。  
	成功した場合非0が、失敗した場合0を返します。  
	短い時間中に同一ファイルに書き込むことを繰り返した場合、ウイルス対策ソフト等の影響で書き込みに失敗する可能性がありますので成否のチェックは重要です。

!!! info "EM+EE拡張：文字列パスオーバーロード"

    ```  { #language-erbapi }
	int SAVETEXT text, filePath
    ```
    第2引数に**文字列**を指定した場合、ファイルパスとして保存します。EM+EEで追加された引数型オーバーロードで、より柔軟なファイル保存が可能です：

    - パスは`Emuera.exe`からの相対パスで指定（`..`は無効）
    - 設定画面または`Emuera.config`の「LOADTEXTとSAVETEXTで使える拡張子」項目で許可された拡張子のみ使用可能（デフォルトは`txt`のみ）
    - 指定した拡張子が許可リストにない場合、自動的に`.txt`に変更されます
    - 文字列パス使用時は**強制的にUTF-8エンコードで保存**されます（`forceUTF8`引数は無視）
    - パスに存在しないディレクトリが含まれる場合、自動的に作成されます

    ``` title="emuera.config"
    LOADTEXTとSAVETEXTで使える拡張子:txt,xml,json
    ```

    ```  { #language-erbapi title="例" }
    ; 標準用法：番号でsavフォルダに保存
    SAVETEXT "Hello", 0

    ; EM+EE拡張：パスでカスタム位置に保存
    SAVETEXT "設定データ", "plugins/config.json"
    SAVETEXT "ログ", "log/output.txt"
    ```

!!! hint "ヒント"

    命令、式中関数両方対応しています。

### 関連項目
- [LOADTEXT](LOADTEXT.md)
- [OUTPUTLOG](OUTPUTLOG.md)
