# ERABASIC チュートリアル

!!! tip "学習パス"

    このチュートリアルは **Emuera** をベースラインとし、**Emuera → EM+EE → 各派生版** の流れに沿って構成されています。eramakerは歴史的参考のみ。

---

## 🚀 クイックスタート

| あなたがしたいこと... | ここから始めてください |
|:---|:---|
| eraゲームとは何かを知る | [eraゲームとは](#era-game) |
| 初めてERBスクリプトを書く | [最初のERBプログラム](#first-erb-program) |
| 基礎から体系的に学ぶ | [ERABASIC简介](intro.md) |
| 特定の命令の使い方を調べる | [リファレンス](../Reference/README.md) |
| EM+EEの新機能を知る | [EM+EE機能概要](../EMEE/EMEE_Summary.md) |
| Skia版の新機能を知る | [Skia版機能概要](../Skia/Skia_Summary.md) |

---

## 📚 学習パス

!!! info "読み方"

    各章は前の章の内容を前提としています。初めての方は第1章から順に読み進めてください。既に経験がある方は必要な章だけを読んでも構いません。

    | マーク | 意味 |
    |:----:|------|
    | 🔴 必読 | 中核章、理解しないと正常なスクリプトが書けない |
    | 🟡 推奨 | 実用章、理解すると開発効率が大幅に向上する |
    | 🟢 選読 | 応用章、必要に応じて学習 |

### 第1章：简介 🔴 必読

> ERABASICの全体像を理解し、最初のプログラムを動かす

**前提知識**：なし｜**本章のポイント**：eraゲームのファイル構造、ERBスクリプトの基本的な実行方法

| トピック | 内容 |
|:---|:---|
| [ERABASICとは](intro.md) | BASIC変体、行駆動DSL、eraゲームスクリプト |
| [Hello World](hello-world.md) | 最初のERBプログラム、PRINTは最初の命令 |
| [ファイルタイプと処理順序](file-types.md) | ERB/ERH/CSV三層構造 |
| [行タイプと構造](line-types.md) | @ラベル行、#プリプロセス行、命令行、$ラベル行 |
| [バージョン進化](evolution.md) | eramaker → Emuera → EM+EE → Skia |

### 第2章：基礎文法 🔴 必読

> 値と変数を理解し、基本的な入出力を書けるようになる

**前提知識**：第1章「简介」｜**本章のポイント**：Int/Str/Float三タイプ、`=`と`'=`の違い、FORM構文`{変数}`置換

| トピック | 内容 |
|:---|:---|
| [値・型・変数](values-types.md) | Int/Str/Float三タイプ、A-Z予約変数、型変換 |
| [代入文](assignment.md) | `=` vs `'=`、複合代入、インクリメント、一括代入 |
| [基本出力](basic-output.md) | PRINT/PRINTFORM/PRINTSINGLE/PRINTL |
| [FORM構文](form-syntax.md) | 書式付文字列、`{変数}`置換、パディング、`\@`三項演算子 |

### 第3章：制御フロー 🔴 必読

> プログラムの流れを制御する構文を身につける

**前提知識**：第2章「基礎文法」｜**本章のポイント**：IF/SIF分岐、REPEATループ、GOTOと$ラベル

| トピック | 内容 |
|:---|:---|
| [条件分岐](condition.md) | IF/SIF/SELECTCASE |
| [ループ](loop.md) | REPEAT/FOR/WHILE/DO、CONTINUE/BREAK |
| [ジャンプ](jump.md) | GOTO/$ラベル、GOTOとループの相互作用 |

### 第4章：関数 🔴 必読

> プログラムを関数に分割し、再利用可能にする

**前提知識**：第3章「制御フロー」｜**本章のポイント**：CALL/RETURN呼び出しチェーン、#DIM宣言ルール、コマンド関数vs式関数（RESULT汚染）

| トピック | 内容 |
|:---|:---|
| [関数とCALL](call.md) | @ラベル、CALL/JUMP、RETURN、引数渡し、INPUT |
| [変数宣言システム](variable-declaration.md) | CONST/DYNAMIC/STATIC/GLOBAL/SAVEDATA/CHARADATA/REF/OUT、VARIADIC |
| [ERBファイル形式拡張](erb-format-extension.md) | 行連結、#DIM/#DIMS、#FUNCTION、条件付きコンパイル |
| [コマンド vs 式](command-vs-expression.md) | コマンド構文と式構文の境界、RESULT汚染、CALLF |

### 第5章：エンジン特性 🟡 推奨

> エンジンに内蔵されたランタイム特性——ステートマシン、イベントフック、キャラクターデータシステム。これらは言語構文ではなく、エンジンがあらかじめ用意したスケジューリング機構である。

**前提知識**：第4章「関数」｜**本章のポイント**：TITLE→SHOP→TRAIN状態サイクル、@EVENT*フック登録、キャラ番号vs登録番号

| トピック | 内容 |
|:---|:---|
| [ステートマシンフロー](system-flow.md) | TITLE→FIRST→SHOP→TRAINサイクル、BEGIN命令、二状態モデル |
| [イベント関数](event-functions.md) | @EVENTFIRST/@EVENTSHOP/@EVENTLOAD、#PRI/#LATER、BEFORE_THROW/BEFORE_ERROR |
| [キャラ変数](character-variables.md) | キャラ番号システム（MASTER/TARGET/ASSI/PLAYER）、キャラ変数（CFLAG/TALENT/ABL）、キャラ管理命令 |

### 第6章：HTML・グラフィック 🟢 選読

> リッチな表示とグラフィックを扱う

**前提知識**：第2章「基礎文法」｜**本章のポイント**：HTML_PRINTタグ構文、各派生版属性差異

| トピック | 内容 |
|:---|:---|
| [HTMLタグ構文](html-syntax.md) | HTML_PRINTタグ、属性、派生版差異 |

---

## eraゲームとは {: #era-game }

eraゲームは、テキストベースのロールプレイング/シミュレーションゲームの一種で、**ERABASIC**言語でスクリプトを記述します。ERABASICは元々eramakerで定義され、その後Emueraとその派生版によって大幅に拡張されました。現代のERABASICはEmueraをベースラインとしています。

詳しくは「[第1章：简介](intro.md)」を参照してください。

eraゲームの典型的なファイル構造：

```
ゲームディレクトリ/
├── Emuera.exe          ← エンジン実行ファイル
├── CSV/                ← データ定義ファイル
│   ├── CHARA0.CSV      ← キャラ0のデータ
│   ├── item.CSV        ← アイテムリスト
│   └── VariableSize.csv← 変数サイズ設定
├── ERB/                ← スクリプトファイル
│   ├── SYSTEM_TITLE.ERB← タイトル画面
│   ├── SHOP.ERB        ← ショップ画面
│   └── TRAIN.ERB       ← 調教画面
├── ERH/                ← ヘッダファイル（グローバル変数宣言）
│   └── VARIABLE.ERH
├── resource/           ← 画像リソース
└── sound/              ← オーディオリソース
```

## 最初のERBプログラム {: #first-erb-program }

詳しくは「[Hello World](hello-world.md)」を参照してください。

`ERB/SYSTEM_TITLE.ERB`に最初の関数を書いてみましょう：

```erabasic
@SYSTEM_TITLE
    PRINTL eraの世界へようこそ！
    PRINTL [0] ゲームを始める
    PRINTL [1] セーブデータを読み込む
    INPUT
    IF RESULT == 0
        BEGIN FIRST
    ELSEIF RESULT == 1
        BEGIN LOADGAME
    ENDIF
```

これはカスタムタイトル画面を定義し、2つの選択肢を表示し、ユーザーの入力に応じて遷移します。

---

!!! info "次に読む"

    - **基礎から体系的に学ぶ**：[ERABASIC简介](intro.md)
    - **制作マニュアル**：[初心者向け](../manual/modification-manual.md) → [中級者向け](../manual/eratohowiki-ERBmanual.md)
    - **完全な命令リファレンス**：[Reference](../Reference/README.md)
    - **Emuera仕様**：[仕様概要](../Emuera/README.md)
    - **EM+EE新機能概要**：[EMEE_Summary](../EMEE/EMEE_Summary.md)
    - **Skia版機能概要**：[Skia版機能概要](../Skia/Skia_Summary.md)
