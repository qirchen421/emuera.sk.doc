---
hide:
  - toc
---

# CALLSHARP

制作者：Neo_Kesha

| 関数名                                                          | 引数           | 戻り値 |
| :-------------------------------------------------------------- | :------------- | :----- |
| ![](../assets/images/Iconetc.webp)[`CALLSHARP`](./CALLSHARP.md) | `functionName` | `void` |

!!! info "API"

	``` { #language-erbapi }
	CALLSHARP funcName
	```

	EraBasicだけでは物足りない場合に、Emuera用のC#プラグインを作成することができます。  
	プラグインを追加するには、EmueraのインストールフォルダにPluginフォルダを作成し、そこにプラグインのDLLファイルを置きます。  

	プラグインの作成方法 (簡単な例 https://gitlab.com/EvilMask/emuera.em/-/tree/master/EmueraPluginExample)
	1) Emueraのリポジトリをクローンする https://gitlab.com/EvilMask/emuera.em
	2) Visual Studioでプロジェクトを開く
	3) ソリューションに新しいプロジェクトを追加する。Class Libraryにする。
	4) Emueraを依存プロジェクトとして追加する。
	5) `.cs`ファイル（例："`Manifest.cs`"）を作成します。
	6) `PluginManifestAbstract`を継承した`PluginManifest`という名前のクラスを作成します。
	7) `PluginName`、`PluginDescription`、`PluginAuthor`、`PluginVersion`フィールドはオプションで、まだ使用されていません。
	8) `.cs`ファイル（例："`MyCoolCode.cs`"）を作成します。
	9) 各メソッドは`IPluginMethod`から継承したクラスです。
	10) クラスの作成 (例 : `MyCoolNativeMethod : IPluginMethod`)
	11) "`Name`"フィールドをオーバーライドします。これは、ERB側で呼び出すために使用されるメソッド名になります。例："`MyCoolMethod1`"
	12) 任意のコードで`Execute`メソッドをオーバーライドします。
	13) `PluginManifest`のコンストラクタで、次のようにメソッド・リストにクラスを追加します。
	`methods.Add(new MyCoolNativeMethod ())`
	14)  `CALLSHARP MyCoolMethod1()`を使用して、ERB からC#コードを呼び出します。

	## 引数について

	ERBからPluginへ、PluginからERBへ引数を渡すことができます。変数を引数に渡すと、Pluginからその変数の値を変更することができます。  
	`Execute`メソッドは`PluginMethodParameter`の配列として引数を受け取ります。引数には文字列型か数値型を指定します。  
	拡張例（https://gitlab.com/NeoKesha/emuera.em/-/blob/neokesha/feature/plugin-update-testing/PluginDev/ に基づく例）：  

	```c#
		public void Execute(PluginMethodParameter[] args)
			{
				//変数を展開する
				var characterId = args[0].intValue；
				var characterName = args[1].strValue；
				//コードを呼び出す
				var result = SET_CHAR_NAME(characterId, characterName)；
				//戻り値の更新
				if (args.Length > 2) {
				args[2].intValue = result；
				}
			}
		
		internal static int SET_CHAR_NAME(int charId, string charName) { //コードを実行します。
			//コードを実行
		}
	```


	## プラグインAPI
	プラグインシステムには`PluginManager`呼び出しがあり、Emueraの便利な機能をプラグインにプロキシするAPIとして動作します。

	```c#
	var api = PluginManager.GetInstance()；
	```

	次のような基本的な処理を実行することができます。

	```c#
	api.Print("Hiiiii")；
	```

	変数を扱うこともできます：

	```c#
	api.FLAG[intKey] = 11；
	api.FLAG[strKey] = 15; //文字列によるアクセスはintKeyによるアクセスよりも遅くなります。
	api.FLAG[FlagsEnum.CoolFlagIUseALot] = 17; //文字列の代わりに列挙型を使用する。
	```

	PluginAPICharContextを使って文字列変数を扱うことができます。

	```c#
	PluginAPICharContext ctx = api.CreateCharContext(charId)；
	for (int i = 1; i <= 24; ++i)
	{
	ctx.CFLAG[200 + i] = ctx.EQUIP[i]；
	}
	ctx.UserDefined["UDArray", 0] = 13；
	```
