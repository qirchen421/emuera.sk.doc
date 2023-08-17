---
hide:
  - toc
---

# ADDDEFCHARA

| 関数名                                                                 | 引数 | 戻り値 |
| :--------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ADDDEFCHARA`](./ADDDEFCHARA.md) | なし | なし   |

!!! info "API"

    ```  { #language-erbapi }
	ADDDEFCHARA
    ```
	ゲーム開始時のシステム的なキャラ追加処理を行う命令です。  
	`chara0*.csv`で定義されたキャラと、`gamebase.csv`で指定された初期キャラを追加します。  
	`ADDCHARA 0`はキャラ`NO`が`0`であるキャラを探して追加しますが、`ADDDEFCHARA`はcsvの番号でキャラを追加します。  
	該当するcsvが存在しない場合、`ADDVOIDCHARA`同様に空のキャラクタを作成します。  
	これはeramakerの初期化処理を再現するための命令であり、`@SYSTEM_TITLE`以外では使用できません。  

!!! hint "ヒント"

    命令のみ対応しています。
