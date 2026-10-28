---
hide:
  - toc
---

# THROW

| 関数名                                                     | 引数     | 戻り値 |
| :--------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`THROW`](./THROW.md) | `string` | なし   |

!!! info "API"

    ```  { #language-erbapi }
	THROW formedString
    ```
    強制的にエラーとし、引数に与えた文字列でエラー表示を行う命令です。


!!! hint "ヒント"

    命令のみ対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		THROW お気の毒ですが、冒険の書は消えてしまいました
    ``` 
    ``` title="結果"
	Now Loading...
	MAIN.ERBの2行目でTHROWが発生しました
	THROW お気の毒ですが、冒険の書は消えてしまいました
	THROW内容：お気の毒ですが、冒険の書は消えてしまいました
	現在の関数：@SYSTEM_TITLE（MAIN.ERBの1行目）
	関数呼び出しスタック：
	※※※ログファイルをemuera.logに出力しました※※※
    ```

!!! warning "SK版限定：`@BEFORE_THROW` との連携 — 処理後も**例外はスローされる**"
    Skia版では `@BEFORE_THROW` イベント関数を定義しておくと、`THROW` 実行時にまずそれが呼び出される（緊急セーブなどの割り込み処理向け）。ただし **`@BEFORE_THROW` が終了しても例外は取り消されない** — その後で通常どおり例外がスローされ、エラーダイアログが表示されて現在のコマンド処理は中断される。`@BEFORE_THROW` は例外を「無かったこと」にする機能ではない。

    ```
    THROW 実行
      ├ 既に @BEFORE_THROW 内 → メッセージを出力して終了（再帰防止）
      ├ @BEFORE_THROW 定義済み → スローを遅延し @BEFORE_THROW を実行
      │       → 終了後に例外をスロー（エラーダイアログ＋処理中断）
      └ 未定義 → 直接例外をスロー
    ```

    詳細は[システムフロー — エラー処理フロー](../Emuera/system_flow.md)および[イベント関数 — @BEFORE_THROW](../tutorial/event-functions.md#before_throw)を参照。

!!! note "スクリプト側の運用指針"
    `SELECTCASE` の `CASEELSE` に「あり得ない値」の検出用として `THROW` を置くと、未知値が到達するたびにプレイヤーへエラーダイアログを提示してゲームを中断させてしまう。値域の検証は開発期の静的監査で行い、実行時の `THROW` は回復不能な状態のためだけに残すのが安全である。実行時検出を残しつつプレイヤーを妨害したくない場合は、デバッグ出力（`DEBUGPRINT` 系）で記録を残し、値をリセットして状態機に再代入させる（自愈）設計に置き換えることもできる。

