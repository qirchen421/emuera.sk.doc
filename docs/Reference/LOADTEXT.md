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
	同名の式中関数もあり、`RESULTS:0`の代わりに返り値に読取結果又は空文字列を返します  

    EM+EEでは、第一引数が文字列の場合、第一引数をパスとしてファイルをロードします。`Emuera.exe`の相対パスで指定(".."は無効)。また、設定画面か`Emuera.config`から「LOADTEXTとSAVETEXTで使える拡張子」項目で決められた拡張子しか使えません。(デフォルトはtxtのみ)

    ``` title="emuera.config"
    LOADTEXTとSAVETEXTで使える拡張子:txt,xml,json
    ```

!!! hint "ヒント"

    命令、式中関数両方対応しています。

### 関連項目
- [SAVETEXT](SAVETEXT.md)
