# EXISTFILE

| 関数名                                                         | 引数     | 戻り値 |
| :------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEM.webp)[`EXISTFILE`](./EXISTFILE.md) | `string` | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int EXISTFILE relativePath
	```

	`relativePath`を`Emuera.exe`の相対パスで指定し(".."は無効)、ファイルの存否をチェックします。存在しているなら`1`を返す，そうでない場合`0`を返します。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

	``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        PRINT csv/VariableSize.csv: 存在
        PRINTSL EXISTFILE("csv/VariableSize.csv") ? "する" # "しない"
        PRINT erb/!@#$%^%^.txt: 存在
        PRINTSL EXISTFILE("erb/!@#$%^%^.txt") ? "する" # "しない"

        ONEINPUT
	```
	``` title="結果"
	csv/VariableSize.csv: 存在する
    erb/!@#$%^%^.txt: 存在しない
	```

