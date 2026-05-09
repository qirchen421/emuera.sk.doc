# ERABASIC チュートリアル

!!! tip "学習パス"

    このチュートリアルは **Emuera** をベースラインとし、**Emuera → EM+EE → 各派生版** の流れに沿って構成されています。eramakerは歴史的参考のみ。

---

## 🚀 クイックスタート

| あなたがしたいこと... | ここから始めてください |
|:---|:---|
| eraゲームとは何かを知る | [eraゲームとは](#eraゲームとは) |
| 初めてERBスクリプトを書く | [最初のERBプログラム](#最初のerbプログラム) |
| 基礎から体系的に学ぶ | [基礎チュートリアル](basics.md) |
| 特定の命令の使い方を調べる | [リファレンス](../Reference/README.md) |
| EM+EEの新機能を知る | [EM+EE機能概要](../EMEE/EMEE_Summary.md) |
| Skia版の新機能を知る | [Skia版機能概要](../Skia/Skia_Summary.md) |

---

## 📋 チュートリアル構成

| セクション | 内容 | 対象 |
|:---|:---|:---|
| [📖 代入文](assignment.md) | 基本代入・文字列代入・複合代入・インクリメント・一括代入 | 初心者 |
| [📄 ERBファイル形式拡張](erb-format-extension.md) | 行連結・#DIM/#DIMS・#FUNCTION・イベント修飾子・条件付きコンパイル | 初心者~中級者 |
| [🔔 イベント関数](event-functions.md) | イベント関数とシステム関数・呼び出しメカニズム・#PRI/#LATER/#SINGLE/#ONLY | 初心者~中級者 |
| [🔤 FORM構文](form-syntax.md) | 書式付文字列・変数置換・パディング整列・\@三項演算子・三連記号・エスケープルール | 初心者~中級者 |
| [📖 基礎チュートリアル](basics.md) | ERABASIC認識、変数、制御フロー、関数 | 初心者 |
| [📚 応用チュートリアル](advanced.md) | 入出力、データ構造、グラフィック、セーブ | 中級者 |
| [🔧 高度なトピック](expert.md) | デバッグ、設定、互換性 | 上級者 |
| [🌐 HTMLタグ構文](html-syntax.md) | HTML_PRINTタグ、属性、派生版差異 | 中級者~上級者 |
| [🗺️ バージョン進化比較](evolution.md) | Emuera→EM+EE→各派生版の機能比較 | 全員 |

---

## 📋 命令クイックリファレンス

| 分類 | よく使う命令 | 詳細 |
|:---|:---|:---|
| **出力** | `PRINT` `PRINTL` `PRINTFORM` `PRINTBUTTON` | [PRINT系](../Reference/PRINT.md) |
| **入力** | `INPUT` `ONEINPUT` `TINPUT` `WAIT` | [入力/ウェイト](../Reference/INPUT.md) |
| **分岐** | `IF` `SELECTCASE` `GOTO` | [ループ/分岐](../Reference/IF.md) |
| **ループ** | `REPEAT` `FOR` `WHILE` `DO` | [ループ/分岐](../Reference/REPEAT.md) |
| **関数** | `CALL` `JUMP` `TRYCALL` `CALLF` | [関数系](../Reference/CALL.md) |
| **変数** | `VARSET` `ARRAYSORT` `SWAP` `CUPCHECK` | [変数操作](../Reference/VARSET.md) |
| **キャラ** | `ADDCHARA` `DELCHARA` `GETCHARA` `FINDCHARA` | [キャラ操作](../Reference/ADDCHARA.md) |
| **セーブ** | `SAVEDATA` `LOADDATA` `SAVEGLOBAL` | [セーブ操作](../Reference/SAVEDATA.md) |
| **グラフィック** | `GCREATE` `GDRAWG` `SPRITECREATE` | [画像処理](../Reference/GCREATE.md) |
| **オーディオ** | `PLAYSOUND` `PLAYBGM` `EXISTSOUND` | [サウンド系](../Reference/PLAYSOUND.md) |
| **データ構造** | `MAP_CREATE` `DT_CREATE` `XML_DOCUMENT` | [MAP](../Reference/MAP_MANAGE.md) / [DT](../Reference/DT_MANAGE.md) / [XML](../Reference/XML_MANAGE.md) |
| **システム** | `BEGIN` `THROW` `QUIT` `AWAIT` | [システムフロー](../Reference/BEGIN.md) |

---

## eraゲームとは

eraゲームは、テキストベースのロールプレイング/シミュレーションゲームの一種で、**ERABASIC**言語でスクリプトを記述します。ERABASICは元々eramakerで定義され、その後Emueraとその派生版によって大幅に拡張されました。現代のERABASICはEmueraをベースラインとしています。

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

## 最初のERBプログラム

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

!!! info "その他のリソース"

    - **制作マニュアル**：[初心者向け](../manual/modification-manual.md) → [中級者向け](../manual/eratohowiki-ERBmanual.md)
    - **完全な命令リファレンス**：[Reference](../Reference/README.md)
    - **EM+EE新機能概要**：[EMEE_Summary](../EMEE/EMEE_Summary.md)
    - **Skia版機能概要**：[Skia版機能概要](../Skia/Skia_Summary.md)
    - **変更ログ**：[Changelog](../Changelog/README.md)
