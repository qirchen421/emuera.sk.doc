# コンフィグ設定の強制
Emueraはcsvフォルダ内に`_fixed.config`及び/又は`_default.config`というファイル名のファイルが存在するとこれらのファイルを読みに行きます。  
各`.config`ファイルの書式は`emuera.config`と同じです。 各項目の意味は[コンフィグの項目](config.md)を参照してください。  

各ファイルの優先度はEmueraがconfigファイルを読む順序に依存しています。  
Emueraがコンフィグファイルを読む順序は  

	csv¥_default.config
	emuera.config
	csv¥_fixed.config

の順であり、後から読まれた設定によって上書きされていきます。 すなわち、`_default.config`の設定は`emuera.config`によって上書きされ、`emuera.config`の設定は`_fixed.config`によって上書きされます。 なお、これらのファイルは上記のパス、ファイル名で存在していないと読み込まれません。
つまり、csvフォルダの中にサブフォルダを作ってその下に`_fixed.config`や`_default.config`を置いたり、`default.config`といったアンダーバーの抜けたファイル名にしたりしても読み込まれることはありません。

## `_fixed.config`
`_fixed.config`に設定されたオプションは`emuera.config`よりも優先されます。
また、`_fixed.config`で指定された項目はEmueraの設定ダイアログによって変更できなくなります。
`_fixed.config`は意図した動作をするために特定のオプションが必須である場合にのみ使用してください。
Emueraの行折り返し位置に依存しているスクリプトでは`ボタンの途中で行を折りかえさない`オプションを`YES`にする必要があります。
また、`_Replace.csv`・`_Rename.csv`を利用する必要があればこれらに関するオプションが必須です。
他に、`SETCOLOR`を利用する場合には、背景色・文字色などを固定する必要があるでしょう。
しかし、特に必須でないオプションまで`_fixed.config`で設定を行うとユーザーによるカスタマイズができなくなってしまいます。
`_fixed.config`に設定する項目は最小限に留めるようにしてください。

## `_default.config`
強制するほどではないけれども推奨したいオプションがある場合は、fixedの代わりに`_default.config`を使用します。
`_default.config`は`emuera.config`が存在しない場合、初期設定として使われます。
`emuera.config`が存在する場合には`emuera.config`で設定したオプションが優先されるので、ユーザーが設定したオプションを上書きすることはありません。
