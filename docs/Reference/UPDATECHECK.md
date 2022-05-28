# UPDATECHECK

| 関数名                                                             | 引数   | 戻り値 |
| :----------------------------------------------------------------- | :----- | :----- |
| ![](../assets/images/IconEE.webp)[`UPDATECHECK`](./UPDATECHECK.md) | `void` | `int`  |

!!! info "API"

	``` { #language-erbapi }
	UPDATECHECK
	```

	`GameBase.csv`に記載されたURLからバージョン情報を取得、更新されていればダイアログボックスで更新を促す  

	- 1,GameBase.csvに「バージョン名」「バージョン情報URL」を追加
		- バージョン名には文字列型で任意のバージョン名、URLにはバージョン確認用のURLを記載する
	- 2,上記のURLにバージョン情報と最新版リンクを記載したテキストをアップロードする
		- 1行目に最新のバージョン名を書き、2行目にはリンクを書く 3行目以降はコメント等自由に書いてOK
		- オープンなGitを使うならリポジトリにプッシュしてrawで参照するのもあり
	- 3,UPDATECHECK実行時にGameBase.csvに記載したURLにアクセスし、現バージョンと最新バージョンが違えばダイアログボックス経由でサーバー側のリンクを開くかどうかプレイヤーに尋ねる
		- 最新版の場合はRESULTに0が入って終了する
	- 4,「はい」が選ばれればブラウザを開きRESULTに2が入る 「いいえ」が選ばれれば何もせずRESULTに1が入る リンク先が見つからない、リンク先にバージョン情報や最新版リンクが書いてない等、何らかの理由で失敗した場合はRESULTには3が入る

!!! hint "ヒント"

    命令としてのみ使用可能

!!! example "例"
	``` { #language-erb title="GameBase.csv" }
	バージョン情報URL,C:\test.txt
	バージョン名.1.00
	```

	``` { #language-erb title="C:\test.txt" }
	1.01
	https://evilmask.gitlab.io/emuera.em.doc/
	```

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		UPDATECHECK
	```

	![](../assets/images/UPDATECHECK.png)
