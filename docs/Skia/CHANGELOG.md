# Changelog

All notable changes to Emuera-SKIA will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

***

## [4.1.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-23

### Changed — オーディオアーキテクチャリファクタリング（クロスプラットフォーム基盤）

- **Sound.cs** — オーディオ再生基底クラスを追加
  - 仮想メソッド：play/stop/pause/resume/close/isPlaying/setVolume/getVolume/setSpeed/getSpeed/GetTotalTime/GetCurrentTime/SetPreservePitch
  - `Sound.Factory` 静的ファクトリプロパティを追加。ホストプログラムがプラットフォーム実装を設定（WinForms→NAudioSound、Android→AndroidSound）
  - カーネルコードは Factory を通じてインスタンスを作成し、プラットフォームへの直接依存を排除

- **Sound.NAudio.cs** — NAudioSound を Sound サブクラスにリファクタリング
  - 元の `Sound` クラスを `NAudioSound : Sound, ISampleProvider` に改名
  - 全メソッドに `override` を追加、重複する `Playing` フィールドを削除（基底クラスを使用）
  - `SoundMixer.PlaySound/StopSound` のパラメータ型を `NAudioSound` に変更

- **GlobalStatic.cs** — NAudioSound への直接依存を排除
  - `Sound[]` と `Bgm` の初期化に基底クラス `Sound` を使用
  - `Reset()` で stop+close 後に `Sound.Factory()` でインスタンスを再構築

- **Program.cs** — WinForms エントリポイントで Factory を設定
  - `Sound.Factory = () => new NAudioSound()` + `GlobalStatic.Bgm = Sound.Factory()`

- **Creator.Method.cs / Instraction.Child.cs** — 全 `new Sound()` を `Sound.Factory()` に変更

### Fixed — カーネルバグ修正

- **EraStreamReader.cs** — try ブロックに catch がなく CS1524 エラー
  - `catch { return false; }` を追加

***

## [4.0.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-23

### Fixed — 内核バグ修正（A類、EmueraFL 非オープンソースエンジンから遡及）

> 以下の修正は EmueraFL（Kom1 非オープンソースエンジン）のコミット履歴のエンジンバグ記述に由来し、ソースコードで検証・修正した。

- **GraphicsImage.cs** — GSetFont Dispose キャッシュ共有 SKFont（A27）
  - `FontFactory.GetFont` はキャッシュ共有の SKFont オブジェクトを返す。`GSetFont` 内の `font.Dispose()` はキャッシュ内の参照を無効化する
  - GSETFONT を複数回呼び出し、パラメータの組み合わせに重複がある場合（例：Regular → Bold → Regular に戻す）、キャッシュは既に Dispose された SKFont を返す → クラッシュ
  - 修正：`GSetFont` 内の `font.Dispose()` 呼び出しを削除。FontFactory が SKFont のライフサイクルを統一管理
  - 対応 EmueraFL コミット `1ee5d509`

- **GraphicsImage.cs** — プロパティの null 保護なし（A28）
  - `Fontname`/`Fontsize`/`Fnt`/`Pen`/`Brush` プロパティがフィールドに直接アクセスし、null チェックがない
  - GCREATE 後に GSETFONT/GSETPEN/GSETBRUSH を呼び出さずに GGETFONT/GGETPEN/GGETBRUSH を呼ぶと NRE が発生
  - 修正：`Fontname` は `font?.Typeface?.FamilyName ?? ""` を返し、`Fontsize` は `font != null ? (int)font.Size : 0` を返す
  - 修正：`PenColorArgb`/`PenWidth`/`BrushColorArgb` null-safe プロパティを追加。`GGETPEN`/`GGETPENWIDTH`/`GGETBRUSH` はこれらを使用し、未設定時は NRE ではなく 0 を返す
  - `Fnt`/`Pen`/`Brush` は元のフィールドをそのまま返す（null のセマンティクスは内部の呼び出し元が処理）
  - 対応 EmueraFL コミット `4ce390b0`

### Fixed — BINPUT ボタンカウント修正

- **Instraction.Child.cs** — BINPUT/BINPUTS/ONEBINPUT/ONEBINPUTS EscapedParts カウントの早期終了
  - EscapedParts カウントループで、最初の div ボタンを見つけた後 `goto loopend` で脱出し、残りの div ボタンがカウントに含まれていなかった
  - 修正：`goto loopend` を削除し、全 div の全ボタンを走査してカウントを正確に
  - 影響：機能バグではない（count>0 で WaitInput フローに入り、マッチング段階に問題なし）、カウント値がより正確になるのみ

### Changed — バージョン番号

- Skia 変体バージョン番号を 3.x から **4.0.0** にアップグレード（A類修正蓄積 + BINPUT 修正）
- `InformationalVersion` を `Skia3` から `Skia4` に更新

***

## [3.9.1](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-20

### Fixed — 内核バグ修正（A類、feature/xamarin から遡及）

> 以下の修正は erafl-CHS が Xamarin 端末で実行時に発見したクロスプラットフォームバグに由来し、WinForms 版も同様に恩恵を受ける。

- **Creator.Method.cs** — ENUMFILES パス修正（A23）
  - `EnumFilesMethod` が絶対パスを返す。`LOADTEXT` の `GetValidPath` が絶対パスを拒否し `XML_GET` の解析に失敗
  - `Path.GetRelativePath(Program.ExeDir, files[i])` で絶対パスを相対パスに変換
  - 上流 ee+em a4d3665 + 1c495b5 に整合（上流は先に `Path.GetRelativePath(dir, ...)` を使用後に `Program.ExeDir` に修正）

- **EmueraConsole.Print.cs** — PRINTFORMC エンコーディングクラッシュ修正（A24）
  - ハードコード `Shift-JIS` では中国語などの非日本語文字をエンコードできず、`ReplacementFallback` もないためクラッシュ
  - `Config.Encode.CodePage` + `EncoderFallback.ReplacementFallback` に置き換え、`DEFAULT ANSI ENCODING` 設定を尊重

- **HtmlManager.cs** — HTML 自己閉じ div タグ対応（A25）
  - `&lt;div ... />` 自己閉じタグ構文がパーサーでサポートされておらず、`/` が `OperatorCode.Div` として扱われ属性解析に失敗
  - div 属性解析ループで `&lt;/>` を検出し空の `ConsoleDivPart` を作成
  - 根因：`XML_GET` が空 div 要素を XML 仕様に従い `&lt;div ... />` として出力するが、HTML パーサーがサポートしていない（同一エンジンの出力と入力が非互換）

- **Utils.cs** — `GetValidPath` ドキュメントコメント同期
  - 上流 ee+em a4d3665 のコメントを同期：`GetValidPath` は絶対パスを返すため、呼び出し側で `GetRelativePath` を行う必要があることを注記

### Fixed — EmueraFL バグ修正（非オープンソースエンジンのコミットから抽出）

> 以下の修正は EmueraFL（Kom1 非オープンソースエンジン）のコミット履歴のエンジンバグ記述に由来し、ソースコードで検証・修正した。

- **Creator.Method.cs** — GSETFONT FontStyle 喪失（A26）
  - `GSETFONT` が `Pfc.Families` からフォントを見つけた際、`new SKFont(SKTypeface.FromFamilyName(...), fontsize)` に `fs` パラメータが渡されていなかった
  - Bold/Italic/Underline/Strikeout スタイルが無視され、常に Regular になる
  - 修正：`FontFactory.GetFont(ff.Name, fs, fontsize)` に変更し統一処理
  - 対応 EmueraFL コミット `ae958303`

***

## [3.9.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-19

### Fixed — 内核バグ修正（A類、feature/xamarin から遡及）

> 以下の修正は Xamarin 移植過程で発見されたクロスプラットフォームバグに由来し、WinForms 版も同様に恩恵を受ける。

- **Process.State.cs** — 4 項目修正
  - `ShiftNextLine` null guard：`currentLine==null` 時に直接 return、空スタック NRE を防止（A1）
  - `ReturnF` 空スタック guard：`functionList.Count==0` 時に安全に終了（A2）
  - `CurrentLabel` null チェック：DebugMode 追跡ログで `called.CurrentLabel` が null の可能性があるため guard を追加（A3）
  - BEFORE_ERROR/BEFORE_THROW ロジック簡素化：2つの BEFORE_THROW 分岐を単一条件判断に統合、冗長な `GameProcProcess.DebugLog` 呼び出しを削除、論理等価（A4）

- **Process.LazyLoading.cs** — 2 項目修正
  - `LoadLazyLoadingFolders`：`\` と `/` を同時に `Path.DirectorySeparatorChar` に置換、`RuntimeInformation.IsOSPlatform` に依存しない（A5）
  - `ErbPath`：`string.Create("ERB/" + a)` から `Program.ErbDir + a` に簡素化、既存のクロスプラットフォームパスプロパティを使用（A6）

- **CharacterData.cs** — 配列 null チェック
  - `SaveToStreamBinary`：1D/2D 配列 `dataIntegerArray`/`dataStringArray`/`dataFloatArray` の `ToArray()`/`WriteWithKey` 前に null をチェック、空キャラクターデータ保存時のクラッシュを防止（A7）

- **VariableEvaluator.cs** — StainDefault null フォールバック
  - `setDefaultStain`：`Config.StainDefault ?? new List&lt;long>(new long[] { 0, 0, 2, 1, 8 })`、設定欠落時の NRE を防止（A8）

- **Instraction.Child.cs** — 2 項目修正
  - CALLPLUGIN null guard：`arg.CallFunc == null` 時に RESULT=0 を設定して return、プラグイン未ロード時の NRE を防止（A11）
  - TIMES オーバーフロー：`null` → `default(ScriptPosition)`、`PrintWarning` パラメータ型を修正（A12）

- **Creator.Method.cs** — GetCurrentProcess try-catch
  - `GetMemoryUseMethod`/`ClearMemoryMethod`：`Process.GetCurrentProcess()` を try-catch で包み、Android で例外がスローされる可能性がある場合 0L を返して降格（A16）

- **Config.cs** — プロパティ可視性を internal に変更
  - 17 個の設定プロパティを `private set` から `internal set` に変更、Xamarin プロジェクトが設定値を上書き可能に（A21）

- **OperatorMethod.cs** — オーバーフロー警告パラメータ修正
  - `null` → `default(ScriptPosition)`：4 箇所の整数オーバーフロー警告の第2パラメータを null から default(ScriptPosition) に変更、PrintWarning パラメータ型を修正

### Fixed — コンパイル警告修正（1035→240、77%削減）

- **CA2200** — `Instraction.Child.cs`：`throw e` → `throw`、元の例外スタックトレースを保持
- **SYSLIB0014** — `Instraction.Child.cs`：`WebClient` → `HttpClient`、旧 API を削除
- **CS4014** — `MainWindow.cs`：未 await の `ReloadPartialErb` 呼び出しに `_ =` 破棄マーカーを追加
- **CA1069** — `VariableCode.cs`：列挙型に `[Flags]` 属性と `SuppressMessage` を追加、`__COUNT_*__` 値の重複は設計意図
- **CA1806** — `WinmmTimer.cs`：`timeBeginPeriod`/`timeEndPeriod` の戻り値をチェック
- **CA1825** — `VariableData.cs`/`CharacterData.cs`/`Creator.Method.cs`：ゼロ長配列 `new T[0]` → `Array.Empty&lt;T>()`
- **CA1834** — 7 ファイル：単文字 `Append("x")` → `Append('x')`、char オーバーロードを使用
- **CA1854** — 9 ファイル：`ContainsKey` + インデクサ → `TryGetValue`、二重辞書検索を削除

***

## [3.8.3](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-17

### Added

- **BREAKBUTTON 指令**（ee+em/master 由来）
  - `BREAKBUTTON` — 現在のボタン待ちを強制中断し、即座に表示を更新
  - `EmueraConsole.forceUpdateGeneration()` を呼び出して実装
  - オプションパラメータあり、UI の強制更新が必要なシーンで使用
- **デバッグモード時にエラーでウィンドウを閉じない**（ee+em/master 由来、CRER 氏パッチ）
  - `ConsoleState.Error` 状態で `Program.DebugMode` が true の場合は直接 return し、閉じる処理を実行しない

### Changed

- **.gitignore マージ最適化**：ee+em/master の組織方式と feature/xamarin のワイルドカードカバーを融合（`**/bin/*`、`**/obj/*`、`**/artifacts/**`、`*.user`、`*.suo`）

***

## [3.8.2](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-15

### Fixed

- **OperatorCode.opDictionary 欠落 `/`、`%`、`==` 3 つのエントリ**（上流不具合修正）
  - 上流 emuera.em の `opDictionary` コレクション初期化子で `Div`(`/`)、`Mod`(`%`)、`Equal`(`==`) 3 つの演算子の逆マッピングが欠落していた
  - `ToOperatorString()` がこれら 3 つの演算子に対して空文字列を返し、エラーメッセージの可読性に影響（例：「演算子 を整数型に適用できません」）
  - 演算子自体の計算には影響なし（`/`、`%`、`==` は式で正常に動作）、エラーメッセージにのみ影響
  - XEmuera-1 は `.Add()` 静的コンストラクタで初期化しており、エントリが完全であり、この不具合の影響を受けない

***

## [3.8.1](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-11

### Fixed

- **SELECTCASE ジャンプテーブルが折りたたみ可能な定数の式関数をサポートするようになりました**
  - `TryBuild()` で `LeftTerm.IsConst` が `false` の場合に `Restructure(null)` を呼び出して式を折りたたむように試行
  - 純粋関数（`ABS(3)`、`SIN(0)`、`TOINT("123")` など `CanRestructure=true` の関数）は `SingleTerm` に折りたたみ可能で、ジャンプテーブル O(1) 検索に参加
  - 副作用または実行時状態に依存する関数（`RAND()`、`RESULT`、`GETTIME` など `CanRestructure=false`）は影響なし、自動的に線形スキャンにフォールバック
  - try-catch で `Restructure` 呼び出しを包み、折りたたみ失敗時は安全に線形スキャンにフォールバック
- **SELECTCASE ジャンプテーブル重複値処理戦略（FIFO）**
  - 重複する CASE 値は最初に出現した分岐を保持し、後続の重複は warning をトリガーしてスキップ
  - この動作は線形スキャンの fallthrough セマンティクスと一致し、ジャンプテーブルの決定性に影響なし
- **TOSTRF 第 2 パラメータが省略可能になりました**
  - `argumentTypeArray` が強制的にパラメータ数をチェックし、第 2 パラメータを省略できなかった不具合を修正
  - `argumentTypeArrayEx` + `OmitStart = 1` に変更し、`TOSTRF(value)` 単一パラメータ呼び出しを許可
  - `ArgType` 列挙型を拡張して `Float` 型を追加、浮動小数点パラメータ型サポートを充実

***

## [3.8.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-10

### Added

- **BEFORE_THROW / BEFORE_ERROR イベント関数**
  - `BEFORE_THROW`：`THROW` 命令で例外がスローされる前に呼び出され、スクリプトで例外をインターセプトして処理できる
  - `BEFORE_ERROR`：任意のエラーが最初に発生したときに呼び出され、エラー処理のフックを提供
  - イベント関数が存在する場合、例外のスローが遅延され、スクリプトでクリーンアップまたは復旧操作が可能
- **TEXT_BGC_ON / TEXT_BGC_OFF テキスト背景色制御**（SK 専用）
  - `TEXT_BGC_ON R, G, B, Alpha%`：後続の全ての行に全行背景色を設定（Alpha は 0～100 不透明度）
  - `TEXT_BGC_OFF`：背景色をクリアし、透明に戻す
  - 背景は行全幅 × 行高の矩形で描画され、行内に実際のテキストが存在する場合にのみ描画
- **STRICT_FONT_FALLBACK 厳格フォントフォールバックモード**（SK 専用）
  - `STRICT_FONT_FALLBACK value`：1 を設定して厳格モードを有効にすると、存在しないグリフの文字は □（tofu）で表示され、フォールバックフォントは使用されない
  - 0 を設定してデフォルトのフォールバック動作に戻す

***

## [3.7.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-10

### Added

- **SQL_CONNECTION_OPEN 便利関数**（DotNet 由来）
  - `SQL_CONNECTION_OPEN(string name)` — `sav/sql/` ディレクトリ内に自動的に SQLite データベース接続を作成/開く
  - 同一名の接続が既に存在する場合は自動的に閉じて再作成

### Fixed

- **SQL_CONNECTION_OPEN データベースクラッシュ破損リスク**：`PRAGMA journal_mode=OFF; synchronous=OFF` を `WAL; NORMAL` に変更、書き込み性能とクラッシュ安全性を両立
- **SQL_CONNECTION_OPEN パストラバーサル脆弱性**：`name` パラメータに不正文字と `..` のチェックを追加、ERB スクリプトが `sav/sql/` ディレクトリを貫通することを防止
- **SQL_CONNECTION_OPEN 接続ハンドルリーク**：`conn.Open()` 後の PRAGMA 実行失敗時に Dispose されていなかったので try-catch 保護を追加
- **SQL_CONNECTION_OPEN パス連結不備**：`$"{dir}{name}.db"` を `Path.Combine(dir, $"{name}.db")` に変更

### Changed

- **SQL_CONNECTION_OPEN PRAGMA 戦略調整**：DotNet 上流は `journal_mode=OFF; synchronous=OFF` を使用して書き込み速度を追求していたが、クラッシュ破損リスクがある；Skia 変体は `WAL; NORMAL` に変更し、OFF モードに近い書き込み性能でクラッシュ時にデータベースが破損しない
- **SQL ジェネリックリファクタリング**
  - `SqlManager` 内部の `ExecuteScalarLong`/`ExecuteScalarString`/`ExecuteScalarFloat` をジェネリック `ExecuteScalar&lt;T>` に統合
  - 全ての ERB レイヤー API は不変（`SQL_EXECUTE_SCALAR_LONG`/`STRING`/`FLOAT`）

***

## [3.6.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-10

### Added

- **G_POLYGON ポリゴン命令セット**（DotNet 由来）
  - `G_POLYGON_DRAW(int ID)` — 現在のペンでポリゴンをストローク描画
  - `G_POLYGON_FILL(int ID)` — 現在のブラシでポリゴンを塗りつぶし
  - `G_POLYGON_POINT_ADD(int ID, int x, int y)` — ポリゴンの頂点を追加
  - `G_POLYGON_POINT_CLEAR(int ID)` — 全ての頂点をクリア
  - `GraphicsImage` に `_points` フィールドと `GDrawPolygon`/`GFillPolygon`/`GDrawPolygonAddPoint`/`GDrawPolygonClearPoint` メソッドを追加
  - Skia モードでのみ使用可能（GDI モードでは CodeEE をスロー）
- **テキスト装飾線レンダリング**（DotNet 由来）
  - `StringStyle` に `HasUnderline` / `HasStrikeout` プロパティを追加、`FontStyle` setter で自動的に同期
  - `ConsoleStyledString.DrawTo` で Skia パスに下線と取り消し線を描画
  - `SKFont.Metrics.UnderlinePosition` / `StrikeoutPosition` を使用して装飾線を位置決め
  - `FONTSTYLE` 命令の Underline(8) / Strikeout(4) ビットマスクをサポート

***

## [3.5.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-09

### Added

- **Stopwatch 高精度タイマーリファクタリング**（DotNet 由来）
  - `SpriteAnime` / `SpriteAnimated` アニメーションフレームタイマーを `DateTime.Now` から `Stopwatch.GetTimestamp()` + `Stopwatch.GetElapsedTime()` に移行
  - `DateTime.Now` のシステムクロック精度制限（~15ms）を解消、アニメーションフレームレートの安定性を向上
  - 一時停止/再開ロジックを同期移行：`PauseAnimation()` / `ResumeAnimation()` で timestamp の差分を計算
- **画像反転ロジック**（DotNet 由来）
  - `ASpriteSingle.GraphicsDraw` で `destRect.Width`/`Height` が負の場合に自動的に反転
  - `canvas.Scale(sx, sy)` を使用して水平/垂直反転を実装、`SKColorFilter` 付きの反転レンダリングも同時にサポート
- **HTML DisplayMode プロパティ移植**（DotNet 由来）
  - `&lt;img>` タグに `display` プロパティを追加：`relative`（デフォルト）/ `absolute-lefttop` / `absolute-leftbottom`
  - `&lt;img>` タグに `xpos` プロパティを追加：絶対位置指定時の X 座標
  - `&lt;div>` タグの `display` プロパティを拡張して `absolute-lefttop` / `absolute-leftbottom` をサポート
  - `ConsoleImagePart.DrawTo` で 3 つの位置決めモードを実装：相対位置、左上絶対位置、左下絶対位置
  - `ConsoleDivPart.DrawTo` で 3 つの DisplayMode を同期サポート

***

## [3.4.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-09

### Added

- **GETCSVNOBY* 名前逆引き**（DotNet 由来）
  - `GETCSVNOBYNAME(str)` / `GETCSVNOBYNICKNAME(str)` / `GETCSVNOBYCALLNAME(str)` / `GETCSVNOBYMASTERNAME(str)`
  - NAME/NICKNAME/CALLNAME/MASTERNAME からキャラクターテンプレート番号を逆引き、O(1) 検索
  - 見つからない場合は -1 を返す
- **MATCHALL / MATCHALLEX 全量検索**（DotNet 由来、再設計）
  - `MATCHALL(var, value[, beg, end[, outArr]])` — 変数参照形式
  - `MATCHALLEX("varName", value[, beg, end[, outArr]])` — 文字列変数名形式
  - マッチ数を返し、第 5 パラメータでインデックス配列を出力（0 から開始）
  - DotNet 命令形式より柔軟：RESULT を汚染せず、式内で使用可能
- **Preload バイトレベル最適化**（DotNet 由来）
  - 起動時に ERB/CSV ファイルを一括でメモリにプリロード
  - `EraStreamReader.OpenOnCache()` でメモリから読み込み、ディスク IO を回避
  - `ConstantData.cs` の CSV 読み込みを `OpenOnCache()` に変更してキャッシュを活用
  - .NET 8 メモリストリーム方式で、エンコーディング互換性と BOM 剥離問題を解決

### Fixed

- **METHOD_Instruction Float 分岐欠落**：Float 式関数（TOFLOAT など 8 つ）を命令として使用すると例外がスローされる不具合を修正、`EraType.Float` 分岐を追加して `RESULTF` に書き込み
- **TOINT 不正入力クラッシュ**：try-catch を追加して不正な文字列変換をインターセプト、解析できない場合は 0 を返す（DotNet 由来）
- **MainWindow console null クラッシュ**：ShowConfigDialog とクリップボードハンドラに null チェックを追加（DotNet 由来）
- **PrintStringBuffer 空配列範囲外アクセス**：Flush() で ButtonsToDisplayLines が空配列を返す場合に ret[^1] アクセスをスキップ（DotNet 由来）
- **SKPaint リソースリーク**：Creator.Method.cs に `using var` を補完し、非管理メモリリークを防止（DotNet 由来）

### Changed

- **チュートリアルクロスリファレンス**：`line-types.zh.md`、`index.zh.md`、`CALLF.zh.md` に命令/式構文クロスリファレンスを追加

***

## [3.3.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-07

### Added

- **SELECTCASE コンパイル時ジャンプテーブル最適化**（Phase 4.2+4.6）
  - `SelectCaseJumpTable` コアクラス：コンパイル時に `Dictionary&lt;long/string/double, InstructionLine>` ジャンプテーブルを構築
  - `TryBuild()` コンパイル時構築：IfCaseList を走査し、各 CaseExpression が `CaseType == Normal &amp;&amp; LeftTerm.IsConst` かどうかをチェック
  - 最適化不可の場合（TO/IS を含む/非常量/重複キー）は自動的に null を返し、線形スキャンにフォールバック
  - `Lookup()` 実行時 O(1) 検索：ヒットしない場合は CASEELSE または ENDSELECT 行を返す
  - `AExpression.IsConst` プロパティ：`SingleTerm` は true をオーバーライド、複合式と変数参照はデフォルト false
  - `InstructionLine.SelectCaseJumpTable` フィールドでコンパイル時ジャンプテーブルを格納
  - `SELECTCASE_Instruction` 高速パス：ジャンプテーブルが存在する場合は直接 Lookup + JumpTo し、線形スキャンをスキップ

***

## [3.2.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-07

### Added

- **SETIMAGELAYER レイヤーレンダリング命令セット**（Phase 5.11）
  - `SETIMAGELAYER spriteName, depth, x, y, width, height, opacity, CM_ARRAY, followScroll` — 独立レイヤーに Sprite をレンダリング
  - `EXISTSIMAGELAYER(depth)` — 指定深度のレイヤーが存在するかどうかを検出
  - `CLEARIMAGELAYER depth` — 指定深度のレイヤーをクリア
  - `CLEARIMAGELAYER_ALL` — 全てのレイヤーをクリア
  - `ImageLayerManager` コアクラス：depth でソートした Dictionary で格納、毎フレーム直接描画
  - `ColorMatrixHelper` ユーティリティクラス：DRY リファクタリングでカラーマトリックス解析（5×5 二次元/三次元整数配列 → SkiaSharp float\[]）
  - ビューポートクリッピング：ウィンドウ外のレイヤーは描画をスキップし、GPU リソースを節約
  - アニメーションウィンドウ外一時停止：`IsOffScreen` フラグが `PauseAnimation()`/`ResumeAnimation()` をトリガー
  - スクロール追従：`FollowScroll` + `InitialScrollY` でスクロール差分を格納
  - 左下原点座標系：CBGSETSPRITE と一致
- **CBGSETSPRITE アップグレード**：4 パラメータから 8 パラメータにアップグレード `(imgName, x, y, zdepth, width, height, opacity, CM)`、第 2 パラメータ以降は全て省略可能

### Fixed

- **ColorMatrix 解析コード重複**：`ColorMatrixHelper` に抽出、ConsoleImagePart と Instraction.Child で共有
- **ArgumentBuilder 手動 LexicalAnalyzer 解析によるパラメータ欠落**：popTerms 標準方式に変更
- **SETBGIMAGE パラメータ解析方式修正**：`FORM_STR_ANY` → `SP_SETBGIMAGE`、変数パラメータがリテラル文字列として扱われる不具合を修正（depth/opacity は上流から既に存在）
- **ClientBackGroundImage に width/height が不足**：フィールドを追加、OnPaint で拡大縮小サイズを使用
- **FollowScroll が絶対 scrollY を使用して画像がビューポート外になる**：initialScrollY を格納し、スクロール差分を使用するように変更
- **SETIMAGELAYER 座標系が CBGSETSPRITE と一致しない**：左下原点座標系に変更

***

## [3.1.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-06

### Added

- **可変パラメータ関数（Variadic Arguments）**（Phase 2.1）
  - `VARIADIC ARG/ARGS/ARGF` キーワードで可変パラメータを宣言
  - `ARGLEN()` 組み込み関数で可変パラメータ数を返す
  - `VariadicArgTerm` 式クラスで残りの実パラメータをカプセル化
  - Int/String/Float 3 つの可変パラメータ型をサポート、Int→Float は暗黙的に変換
  - プライベート変数を固定パラメータとする場合、ARG 配列には可変パラメータのみが含まれる
- **要素レベル参照（Element-Level Reference）**（Phase 2.2）
  - `ElementRefInfo` 構造体で「対象変数 + 固定インデックス」参照を伝達
  - `ReferenceToken` サブクラス（Scalar/1D/2D/3D）で `ElementRefInfo` を使用して読み書きをプロキシ
  - `ScopeIn`/`ScopeOut` で参照状態を保存/復元（`_scopeState` リスト）
  - `SetTransporter` で 3 つの分岐に分配：配列参照 / 要素レベル参照 / NullRef
- **`#REF`** **/** **`#REFS`** **スカラー参照キーワード**（Phase 2.3）
  - `#REF X` で整数スカラー参照を宣言（Dimension=0）
  - `#REFS S` で文字列スカラー参照を宣言（Dimension=0）
  - `#DIM REF` 配列参照と完全に分離、セマンティクスの曖昧さを解消
  - `ConvertArg` で 3 次元の分岐にマッチ（Dimension=0 / Dimension>0 / OUT）
- **OUT パラメータ（Optional Output Parameters）**（Phase 2.4）
  - `#DIM OUT X` / `#DIMS OUT X` で省略可能な出力パラメータを宣言
  - `NullRefTerm` ブラックホール変数：省略時は全ての読み書きがサイレントに無視される
  - OUT は `#REF` と同型（スカラー参照 Dimension=0）、`#DIM REF` とは同型ではない
  - `refDestDimension` フィールドでスカラー参照と配列参照の渡し方を区別
  - OUT + 可変パラメータの組み合わせ、ネスト呼び出し、CALLFORM/TRYCALL をサポート

### Fixed

- **ARGLEN() コンパイル時定数折りたたみで 0 になる**：`CanRestructure = false` でオプティマイザの誤折りたたみを防止
- **ElementRefInfo コンテキスト依存による参照書き戻し失敗**：作成時に実際の配列スナップショットをキャプチャ
- **ReferenceToken ScopeIn/ScopeOut で参照状態が保存されない**：`_scopeState` リストを導入して保存/復元
- **SetTransporter 配列 REF パラメータの渡し方が誤り**：`refDestDimension` でスカラー参照 vs 配列参照を区別
- **CreatePrivateVariable に IsOut=true 設定が欠落**：OUT パラメータ省略時に認識できない
- **MatchType に allowElementRef パラメータが欠落**：OUT パラメータ参照マッチが失敗
- **MatchType が OUT パラメータのチェーン受け渡しをブロック**：`!rother.IsOut` 豁免を追加
- **OUT パラメータが誤って 1 次元配列参照として作成される**：強制的に `Dimension=0` と `Lengths=[1]` を設定
- **IntoFunction Float 可変パラメータ型切り捨て**：`(long)arg.GetFloatValue()` → `arg.GetFloatValue()`

***

## [3.0.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-05

### Added

- **Float 型システムフルリファクタリング完了**（B.3 全サブタスク）
  - `#DIMF` 浮動小数点変数宣言、`LOCALF`/`ARGF`/`RESULTF` 組み込み浮動小数点変数
  - `#FUNCTIONF` 浮動小数点戻り値関数、Float 四則/比較/単項/三項演算
  - 同名オーバーロード数学関数（SIN/COS/SQRT など）、配列関数 Float 分岐
  - `TOFLOAT`/`TOSTRF` 型変換、セーブデータ倍精度サポート、DT/SQL Float 操作
- **三角関数と端数処理関数**：SIN/COS/TAN/ASIN/ACOS/ATAN/FLOOR/CEIL/ROUND（Int+Float 同名オーバーロード）
- **キャラクター浮動小数点変数サポート**：CharacterData の dataFloat/dataFloatArray/dataFloatArray2D
- **RenderingBackend レンダリングバックエンド設定**：Auto/OpenGL/CPU 3 モード、実行時にシームレスにダウングレード
- **TEXT\_BGC\_ON / TEXT\_BGC\_OFF**：テキスト背景色オンオフ命令
- **上流同期**：CurrentCulture→InvariantCulture、TIMES 文化依存修正、VARS2D 修正、FORCE\_QUIT 修正、ServerGC 有効化

### Fixed

- **OpenGL コンテキスト喪失クラッシュ**：デュアルグラフィックス/仮想マシン環境で自動的に CPU レンダリングにダウングレード
- **ColorMatrix GDI+→SkiaSharp 移行修正**：列優先→行優先レイアウト、並進成分 ×255f、GDrawG GDI+ 残留クリーンアップ
- **マージ競合ブラックスクリーン**：mr-6 ブランチマージ後の PaintSurface イベント非表示を修正
- **Float セーブデータ喪失**：LoadVariableBinary Float セグメントが誤って long に切り捨てられていたのを修正

### Changed

- `typeof(long)`/`typeof(string)` ハードコード → `EraType` 列挙 + `VariableDescriptor` クエリ（746 箇所置換）

***

## [2.0.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-04

### Added

- **ExecutionContext スタック式関数コンテキスト**：LOCAL/ARG 同関数再帰上書き汚染を修正
- **SparseArray\<T> スパース配列ストレージ**：大きなインデックスの配列メモリを大幅に節約
- **SafeArithmetic 安全演算**：オーバーフロー保護、もはやサイレントにオーバーフローしない
- **EraType 列挙 + VariableDescriptor**：型システムインフラ
- **#DIMF 構文解析**：浮動小数点変数宣言 + 浮動小数点リテラル
- **セーブデータ Float セグメント**：EraSaveDataType Float/FloatArray/FloatArray2D/FloatArray3D

### Fixed

- **ConvertArg() 余分なパラメータをサイレントに破棄**：TooManyFuncArgs エラーを削除し、TRY セーフティネットを追加
- **TIMES\_Instruction オーバーフロー保護**
- **INITRAND/DUMPRAND と新乱数アルゴリズムの結合解除**

***

## [1.3.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-02

### Fixed

- **ツールバーがタイトルに戻った後にスプライトインデックスが宙ぶらりんになる**：立ち絵が透明になる不具合を修正

***

## [1.2.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-04-28

### Fixed

- **SpriteG スナップショットモード**：合成スプライトが空白にレンダリングされる不具合を修正

***

## [1.1.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-04-26 ～ 2026-04-27

### Added

- **HTML\_PRINTC / HTML\_PRINTLC**：ピクセルベースの HTML 表組み命令、非等幅フォントで正確に位置合わせ
- **HTML\_PRINT font タグ size 属性**
- **SQL パラメータ化クエリ**：`SQL_ESCAPE`、`SQL_P_EXECUTE_*` シリーズ、`@0,@1...` プレースホルダでインジェクション防止
- **MAP フルセットメソッド API**：MAP\_VALUES/MAP\_MERGE/MAP\_REMOVEIF/MAP\_FINDKEY/MAP\_TOSTRING/MAP\_FROMSTRING

### Fixed

- **カラーテキストレンダリングが細すぎる**：SETCOLOR 後にテキストが細く薄くなる不具合を修正
- **SKIA 下での GDRAW パイプライン実装方式**
- **HTML 新規タグのクローズ動作**

***

## [1.0.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-04-22 ～ 2026-04-25

### Added

- **SkiaSharp レンダリングエンジン**：全面的に GDI+ を置き換え、GPU アクセラレーションをサポート
- **OpenGL ハードウェアアクセラレーション**：自動検出 + 実行時ダウングレード
- **SRGB カラースペース修正**：SkiaSharp デフォルトカラースペースによる画面の暗さを修正
- **GDI フォントフォールバック**：MS Gothic などのラスターフォントは GDI レンダリングパスを保持
- **スマートフォントフォールバック**：セリフ/サンセリフ分類フォールバック、CJK フルカバー
- **レンダリング制御 API**：SET\_TEXT\_DRAWING\_MODE / GET\_TEXT\_DRAWING\_MODE / SET\_SKIA\_QUALITY / GET\_SKIA\_QUALITY
- **HTML\_PRINT font レンダリング属性拡張**：render/edging/hinting
- **フルスクリーン機能 (F11)**：スタートメニューをカバー、マウスを上部に移動するとツールバーを自動表示
- **SPRITECREATEFROMFILE**：画像ファイルから直接 Sprite を作成、GCREATE 中継不要
- **BitArray 機能**
- **DIV レンダリングパフォーマンス最適化**：ヒットテスト O(1) 位置特定 + Y軸事前除外
- **ToolTip オクルージョン防止**：画面エッジで自動反転
- **画像リソース管理リファクタリング**：SharedBitmapCache グローバルビットマッププール + ConstImage 軽量シェル
- **STRICT\_FONT\_FALLBACK**：厳格フォントフォールバックモード
- **SETANIMETIMER**：アニメーションフレーム間隔制御
- **BITMAP\_CACHE\_ENABLE**：ビットマップキャッシュオンオフ

### Fixed

- **FontFactory フォントキャッシュメモリリーク**：ゲームリセット時に正しく解放
- **RasterFont チェック方法**
- **MS Gothic フォントが過去との差異を生じる**
- **SkiaSharp テキストレンダリング組版が非対称**
- **SpriteAnime アニメーションレンダリングカクカク**：同じファイルの繰り返しデコードによるメモリ爆発
- **Word Wrap がリッチテキストフォントフォールバック喪失を引き起こす**
- **DIV 内の画像ボタンクリック無効**（高さが 1 行を超える場合）
- **MoveMouse プルーニングエラー**
- **記号レンダリングの空白と重なり**
- **フォント回収 Bug**
- **Skia レンダリング品質ユーザー設定が反映されない**
- **PrintPlainwithSingleLine が Plugin API でレンダリングを実行しない**
- **配列が一千万桁に拡大**

***

## [0.3.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-04-13 ～ 2026-04-18

### Added

- **EVAL / EVALS**：実行時動的式評価
- **CALLSTR / JUMPSTR / TRYCALLSTR / TRYJUMPSTR / TRYCCALLSTR / TRYCJUMPSTR**：動的関数ディスパッチ
- **SQL データベース操作フルセット**：SQL\_CONNECT/DISCONNECT/EXECUTE\_NONQUERY/EXECUTE\_READER/READER\_*/EXECUTE\_SCALAR\_*/IMPORT\_MAP\_XML/IMPORT\_DT\_XML/EXPORT\_MAP\_XML/EXPORT\_DT\_XML/IMPORT\_XML\_CUSTOM
- **リソース管理システム (ResourceManager)**：RM\_RESOURCECHECK\_LOAD / RM\_RELEASE\_ALL / RM\_RESOURCE\_EXIST、LRU キャッシュ淘汰
- **SqlManager ストリーミング XML 解析**：XmlReader/XmlWriter、GB レベルのデータインポートエクスポートをサポート

### Fixed

- **XML\_ADDNODE マルチノードマッチ**：最後の 1 回しか挿入されない Bug を修正
- **文字列比較ロジック**：GreaterEqualStrStr / LessEqualStrStr エラーロジック
- **SqlManager.CloseAll() がグローバルリセットに統合されていない**：GlobalStatic.Reset() で呼び出しを追加
- **欠落していたローカライゼーションエントリ**

***

## [0.2.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-03-09

### Fixed

- **BGMControl 機能異常**：パラメータオーバーロードが無効
- **変調フラグが存在すると変調される**：ロジックを修正

***

## [0.1.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-02-16 ～ 2026-02-19

### Added

- **SoundTouch オーディオ可変速ライブラリ**：ピッチ不変可変速/ピッチ可変可変速をサポート
- **オーディオ制御命令**：GETSOUNDORBGMINFO / ISPLAYINGSOUND / SOUNDCONTROL / ISPLAYINGBGM / BGMCONTROL
- **SOUNDCONTROL チャンネルオーディオ停止**
- **EXISTVAR 拡張**：ストレージユニット存在性チェックをサポート（第 2 パラメータ）

### Fixed

- **EXISTFUNCTION**：Lazyloading で含まれていて未実行の関数検出をサポート
- **.als ファイル**：番号 10 以降の文字列ポインタ読み込みを修正
- **SPRITECREATE**：8/10 パラメータ書式をサポート、CSV 能力と一致
- **GCREATEFROMFILE isRelative パラメータ**：第 3 パラメータが 0 以外の場合に現在の作業ディレクトリから相対パスを解析

***
