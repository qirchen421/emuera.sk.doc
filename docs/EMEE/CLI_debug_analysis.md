---
---

# CLI 起動オプションとヘッドレス構文チェック

> EM+EE（Skia 変体を含む）が `System.CommandLine` で実装したコマンドラインインターフェースと、
> **AnalysisMode（解析モード）** によるヘッドレス構文チェック、および `--CliDebug` エージェント駆動プロトコルの解説。
> 実装正本＝`Program.cs`（`Main`）/ `Runtime/Script/Process.cs` / `Runtime/Script/Process.LazyLoading.cs` / `UI/CliDebug/CliDebugHost.cs`。

## コマンドラインオプション

| オプション | 説明 |
|---|---|
| `--ExeDir <dir>` | 指定フォルダの Era を起動する（作業ディレクトリ指定） |
| `-Debug`（`-debug`/`-DEBUG`） | デバッグモード |
| `-GenLang` | 言語ファイルテンプレート生成 |
| `--CliDebug` | **CLI デバッグモード**：stdin/stdout の JSON Lines プロトコルでエージェント駆動（`-Debug` を暗含）。モーダルダイアログは stdout イベントに変換されるため無人運転で固まらない |
| **位置引数 `<file\|dir>...`** | **解析モード（AnalysisMode）**：解析対象の `.ERB` ファイルまたはディレクトリ（ディレクトリは再帰的に `*.ERB` 展開） |

## 解析モード（AnalysisMode）

位置引数を 1 つでも与えると `Program.AnalysisMode = true` となり、通常の起動と以下が異なる：

1. **対象の直接全コンパイル**：`ErbLoader.LoadErbList(AnalysisFiles)` で指定ファイルのみを（且つすべて）
   コンパイルする。**遅延ローディングテーブルを経由しない**——起動時ログには現れない冷たいファイル
   （レイジーは起動時にインデックスのみ作り、本体コンパイルは呼び出し時）も、解析モードでは強制的に検査される。
2. **警告の全量出力**：`ParserMediator` は `DisplayWarningLevel` フィルターをスキップする
   （`if (level < Config.DisplayWarningLevel && !Program.AnalysisMode)`）ため、Lv1/Lv2 の全警告が出る。
3. **出力先＝`Analysis.log`**（ゲーム通常起動時の `emuera.log` とは**別ファイル**。解析結果を探す際はこちら）。
   末尾に「文件解析完成：结果输出至Analysis.log」が出たら完了。
4. CSV／ERD の読み込みは通常起動と同じく行われるため、**キー辞書（CSV 第 2 列 ∪ `.als`）が構築された上での
   識別子解決検査**になる（`无法解析的标识符` 系の警告はこの辞書に対する検査結果）。

```bat
REM 例：ディレクトリ指定
Emuera_skia.exe D:\path\to\ERB\DLC
REM 例：単一ファイル
Emuera_skia.exe D:\path\to\M_KOJO_KX_イベント.ERB
```

## --CliDebug（エージェント駆動プロトコル）

stdin/stdout 上の **JSON Lines**。起動時に `{"type":"hello","protocol":1,...}` → `{"type":"ready"}` を出力し、
以後 `{"type":"out","text":...}`（コンソール出力のストリーム）、コマンド応答 `{"type":"result","id":...}`／
`{"type":"error",...}`、終了時 `{"type":"exit"}`。

| コマンド | 機能 |
|---|---|
| `input` / `click` / `key` | 入力・ボタンクリック・キー送信 |
| `debug` (`expr`) | デバッグ式評価 |
| `watch` / `trace` | 変数ウォッチ／実行トレース |
| `screen` / `state` / `buttons` | 画面・状態・選択肢取得 |
| `log` | コンソールログ取得 |
| **`quit`** | **クリーン終了**（ログのフラッシュを保証） |

### ヘッドレス構文チェック（無人・実証済み）

```bash
{ sleep 50; echo '{"cmd":"quit","id":1}'; } | \
  Emuera_skia.exe --CliDebug 'D:\path\to\ERB\DLC' > clidebug_out.jsonl
```

stdout の JSONL に解析出力（警告を含む）が `out` イベントとして流れ、`quit` でクリーン終了する。
**待ち時間は対象規模に応じて調整**（全ツリー級なら 120s+）。終了コード 0＝正常終了。

## 警告の分類とゲート運用（⚠️ 重要）

解析モードの警告は**既存量を含む全量**であるため、ゲート（CI／バッチ審査）では
**絶対零ではなくベースライン差分**で判定する：

| 分類 | 実測例（某 ERA ツリー ERB/DLC＝370 件） | 性質 |
|---|---|---|
| `%...%` の式結果が文字列でない | 298 件 | FORM 文字列のスタイル警告（実行時は数値を印字できる）。**存量・無害** |
| 裸識別子（`GMF_ERROR_INFO_PRINT` 等） | 34 件 | **解析モードの artifact**：分離コンパイルのため、同ファイル後段・解析セット外で定義される関数への前方参照が「未定義」として警告される。通常起動では出ない |
| 数値⇔文字列演算／代入／三項演算子 | 約 30 件 | 型不整合の臭い。個別トリアージ推奨（実害あり得る） |

キー解決（退役識別子・エイリアス欠落）の検出は `无法解析的标识符`（Lv2）と
`xxx.csv中没有"…"的定义`（Lv1）で行われる——こちらは**真の欠陥**として扱う。

## 関連

- 遅延ローディング機構と起動時ログの網羅性：エンジン知識ベース `lazyloading/`（本ページの応用面とゲート運用はそちら）
- 実装：`Program.cs`（オプション定義・AnalysisFiles 収集）、`Process.cs`（`LoadErbList` 分岐）、
  `ParserMediator.cs`（警告フィルターの解析モード免除）、`UI/CliDebug/CliDebugHost.cs`（プロトコル）
