# Changelog

All notable changes to Emuera-SKIA will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [12.1.0] — 多言語エンコーディング互換 + CHKDATA セーブデータバージョン情報

### Added

- **CHKDATA がセーブデータのバージョン情報を返す**：`EraDataResult` に `Version` フィールドを追加。`CHKDATA` の `RESULT:1` にセーブデータ内のバージョン番号を代入（ファイルが存在しない等のエラー時は `0`、バージョン不一致・正常時は実際のバージョン値）。対象：`EraDataStream.cs` / `VariableEvaluator.cs` / `Creator.Method.cs`

### Fixed

- **多言語エンコーディング互換性**：`LangManager` のバイト長計算を「現在の言語エンコーディング → 日文 932 → 現在の言語エンコーディング」の文字単位往復方式に変更。非日本語エンコーディング（例：GBK）下の CJK テキストで `GetStrlenLang`/`GetUFTIndex`/`GetSubStringLang` の長さ・部分文字列が乱れる問題を修正

### Changed

- **バージョン署名**：`Skiav12` → `Skiav12.1`（`1824+v24+EMv18+EEv56+Skiav12.1`）

***

## [12.0.0] — デバッグウインドウ：変数ウォッチの「ロック」と直接代入

### Added

- **変数ウォッチに「ロック」列を追加**：チェックを入れると変数の値を固定し、200msごとに安全なタイミングで自動的に書き戻すため、スクリプトによる値の変更を防げる。式・関数・定数・読み取り専用変数など代入できない対象はロックできない
- **「値」セルから直接代入**：クリックして編集・確定するだけで代入できる（デバッグコンソールと同じ意味）
- ロック状態はセッション内のみ有効（永続化しない）

### Fixed

- **デバッグウインドウのUIレイアウト**：高DPI環境で下部ボタンがパネルに重なる問題、ボタン文字の切れを修正

### Changed

- 変数ウォッチの列構成を「ロック / 対象 / 値」の3列に変更し、デフォルトウィンドウ幅を拡大
- **バージョン署名**：`Skiav11.2` → `Skiav12`（`1824+v24+EMv18+EEv56+Skiav12`）

***

## [11.1.0] — ToolTip 非同期コールバック NRE 防御

### Fixed — OnPaint ToolTip 非同期コールバックのnull参照クラッシュ

- **`context.Post` コールバックのnull参照対策**（`EmueraConsole.cs` OnPaint ToolTip ブロック）：
  - `SynchronizationContext.Current` のnullチェック：`context` が `null` の場合は ToolTip のディスパッチをスキップし、`context.Post` のnull参照クラッシュを回避
  - ウィンドウライフサイクルチェック：コールバック内で `window == null || window.IsDisposed || window.MainPicBox == null || window.MainPicBox.IsDisposed` を確認し、破棄やコントロール再生成の隙間では ToolTip 表示を放棄
  - `Cursor.Current` のnullチェック：マウスがウィンドウ外へ出た後 `Cursor.Current` が `null` になり、`Cursor.Current.Size.Height` で `NullReferenceException` を起こしていた。安全に取得し、欠落時はデフォルト高さ 32px にフォールバック
  - **`Screen.FromPoint` 引数修正**：元コードは `mousePos`（ウィンドウローカル座標）を渡しており、`Screen.FromPoint` は画面絶対座標を要求するため、`absoluteP`（`Cursor.Position`）に変更。マルチディスプレイ・スケーリング環境での ToolTip 座標誤りを修正
- **影響シナリオ**：ToolTip 遅延表示中（`Task.Delay(InitialDelay)`）、プレイヤーがマウスを動かす・ウィンドウを閉じる・描画再構築が起きると高確率でクラッシュ。宴会など多人数同屏シーンでボタンが密集し、再現頻度が高い

### Changed

- **バージョン署名**：`Skiav11` → `Skiav11.1`（`1824+v24+EMv18+EEv56+Skiav11.1`）

***

## [11.0.0] — GC 設定の巻き戻し + メモリ診断ゲート

### Changed — GC 設定の巻き戻し

- **ServerGC → WorkstationGC**：アップストリーム同期（commit `4432ee9d`）で導入された `<ServerGarbageCollection>true</ServerGarbageCollection>` を巻き戻し
  - デスクトップGUI（単一ウィンドウ・単一スレッド対話）に適するのは WorkstationGC：メモリ使用量が低く、OS への早期返還が行われる
  - ノベルゲームは GC の単一停止時間に鈍感で、WorkstationGC は回収が頻繁だが短い

### Added — メモリ診断ツール（ゲート付き）

- **MemoryDiagnostic ツールのゲート化**：新設設定項目 `MemoryDiagnosticEnabled`（デフォルト `false`）。無効時はエンジンが `memory_diagnostic.log` を出力しない
  - 一時診断用途：終了時にメモリスナップショット（プロセスメモリ / GC ヒープ細分 / コンパイル後スクリプト / VariableData / FontFactory キャッシュ / SQLite 接続など）をゲーム主ディレクトリへ書き出す
  - メモリ問題の診断が必要になったら、`emuera.config` に `MEMORYDIAGNOSTICLOG:YES` を追加すれば有効化できる

### Added — 診断セクションの拡張

- **GC ヒープ細分**：`GC.GetGCMemoryInfo()` の HeapSizeBytes / FragmentedBytes / Gen0-2 ヒープサイズ / LOH サイズ
- **スレッド統計**：総スレッド数と Running / Wait 状態の分布
- **FontFactory キャッシュ**：fontDic / fallbackTypefaceCache / fallbackTypefaceCodepointCache / gdiFontDic のエントリ数
- **表示行キャッシュ**：displayLineList の現在行数 / MaxLog

***

## [10.1.0] — 入力マクロスイッチ

### Added

- **DISABLE_INPUT_MACRO 関数**：全入力（textbox + SEQUENCEINPUT）のマクロ解析を無効化する
  - 呼び出し後、入力はそのまま1段として渡され、`(...)` 反復マクロを解析しない
  - `\n` による分割と `\e` MesSkip 処理も行わない
  - 戻り値は常に `0`
  - デスクトップ版は `Emuera/UI/Game/EmueraConsole.cs` に実装、SkiaX Xamarin 版は `Emuera.Xamarin/Platform/GameView/EmueraConsole.cs` に実装
- **ENABLE_INPUT_MACRO 関数**：入力マクロ解析を復元する（デフォルト動作）
  - 本来の PressEnterKey 動作と一致
  - 戻り値は常に `0`

### Changed

- **バージョン署名**：`Skiav10` → `Skiav10.1`（`1824+v24+EMv18+EEv56+Skiav10.1`）

***

## [10.0.0] — SEQUENCEINPUT 関数

### Added

- **SEQUENCEINPUT 関数**：文字列引数を取り、次回の入力待機時にユーザー入力として自動送信する
  - `SEQUENCEINPUT("入力内容")` 呼び出し後、次回 WaitInput 状態に入った時、エンジンは `PressEnterKey` を呼び出してキューの文字列を処理する。テキストボックス入力と Enter キーと同じ動作
  - 文字列中の `\n` は複数セグメントに分割され、各セグメントが個別の ERB WaitInput に送られる
  - 文字列中の `\e` は MesSkip（待機スキップ）として認識される
  - 戻り値は常に `0`
  - `WaitInput` と `WaitInputNoFocus`（NF接尾辞命令）の両方で動作
  - デスクトップ版は `Emuera/UI/Game/EmueraConsole.cs` に実装、SkiaX Xamarin 版は `Emuera.Xamarin/Platform/GameView/EmueraConsole.cs` に実装

***

## [9.1.0] — STRFORMCHECK 関数 + HTML_PRINT font valign 拡張

### Added

- **STRFORMCHECK 関数**：文字列引数を取り、STRFORM として展開可能かチェックする。展開可能なら 1、不可なら 0 を返す
  - 解析失敗（構文エラー）の場合は 0 を返す
  - 実行時評価失敗（存在しない変数など）の場合は 0 を返す
  - STRFORM と同じパーサーを共有し、セマンティクスの一貫性を保証
- **HTML_PRINT `<font>` valign 属性**：`<font>` タグに `valign` 属性（`top`/`middle`/`bottom`）を追加。同一行内で異なるフォントサイズのテキストの垂直位置を揃える
  - `valign='top'`（デフォルト）：テキスト上端揃え、既存の動作と一致
  - `valign='middle'`：テキスト垂直中央揃え
  - `valign='bottom'`：テキスト下端揃え
  - 無効な値は `CanNotInterpretAttribute` エラーをスロー
  - ネストされた `<font>` タグは外側の `valign` 設定を継承
  - デスクトップ版と SkiaX Xamarin 版の実装を同期

***

## [9.0.0] — F11 フルスクリーン比例スケーリング

### Added

- **F11 フルスクリーン比例スケーリング**：F11 押下時、ゲームウィンドウ内容（フォント、画像、区切り線、HTML shape、ImageLayer、CBG 背景画像など全ての可視要素）が設定の幅比例でフルスクリーンにスケーリングされ、高解像度ディスプレイに対応
  - 中核メカニズム：`SKCanvas` 描画入口で `canvas.Scale()` 変換を一度適用、以降の全描画操作が自動的に比例拡大
  - `Config.FontSize`、`Config.WindowX`、`Config.DrawableWidth` を変更しない——エンジンは引き続き論理サイズでレイアウト
  - 表示行を再配置しない——HTML ラウンドトリップバグを回避
  - マウス座標は自動的に論理座標に変換
  - 入力ボックス（WinForms RichTextBox）はフォントと高さを個別にスケーリング
  - マルチモニター対応（`Screen.FromControl` で現在の画面を取得）
  - `RenderWidth`/`RenderHeight` プロパティを導入し論理レンダリングサイズを表現、`EmueraConsole.OnPaint` 及び関連メソッドは `MainPicBox.Width`/`Height` の代わりにこのプロパティを使用
  - Android 端への影響ゼロ（デスクトップの `MainWindow.cs` と `EmueraConsole.cs` をコンパイルしない）

***

## [8.2.0] — デバッグウィンドウのカスタム関数評価修正

### エンジン層修正

- **デバッグウィンドウでカスタム式関数が正しい値を返さない（WaitInput状態）**：`console.IsRunning`がWaitInput時に`False`を返し、`runScriptProc`が関数本体を実行せずに即時終了する問題を修正
  - `GetValue`に`forceRunning`フラグを追加：デバッグ評価時に`console.IsRunning`チェックをバイパス
  - `MethodReturnValue`の残留値をクリア：前の`#FUNCTIONS`関数の戻り値が残り、無関係なHTML文字列が返される問題を修正
  - `NullReferenceException`修正：`ReturnF`後`currentLine`がnullになり`ShiftNextLine`でクラッシュする問題を修正
  - プライベート変数状態リーク修正：`GetValue`失敗パスで`ScopeOut`が呼ばれない問題を修正
  - `currentLine`残留修正：`GetValue`成功パスで`currentLine`を復元するよう修正
  - 状態破損防止：`updateVarWatch`の例外時に`loadPrevState`が呼ばれない問題を修正（try-finally）

***

## [8.1.0] — Float型エラーメッセージ修正 + CanReturnFloat 動的戻り値型

### エンジン層修正

- **Float型エラーメッセージの「文字列型」誤報**：元エンジンはInteger/String二分法のエラーメッセージを使用、Float型が「文字列型」または「整数型」と誤報
  - `#FUNCTION`関数がFloatを返す時`ReturnfStrInIntFunc`（「文字列型が指定されました」）→ Float→`ReturnfFloatInIntFunc` / String→`ReturnfStrInIntFunc`に区別
  - `#FUNCTIONS`関数がFloatを返す時同理 → `ReturnfFloatInStrFunc`を追加
  - 関数引数 Float→Integer 変換時`CanNotConvertStrToInt`（「文字列型から変換できません」）→ `CanNotConvertFloatToInt`
  - 関数引数型不一致時の`String? Str : Int`二分判断 → 三分：`String? Str : Float? Float : Int`（2箇所）
  - Ref引数型不一致時にFloat分岐欠落 → `Float? FloatVar : Var`と`Float? FloatArray : Array`を追加
  - Float変数にString代入時`SetIntToStr`（「非整数型に整数を代入」）→ `SetStrToFloat`（「浮動小数点型に文字列を代入」）
  - Integer変数にFloat代入時`SetIntToStr` → Float→`SetFloatToInt` / String→`SetStrToInt`に区別

### エンジン層変更

- **CanReturnFloat 動的戻り値型メカニズム**：POWER/SQRT/ABS等の関数が引数型に応じてIntegerまたはFloatを動的に返す
  - コンパイル時`GetEraType()`は引数にFloat型があるかをチェックして戻り値型を決定
  - 実行時`GetReturnValue()`は`HasFloatArg`で実際の戻り値を分派
  - `FunctionMethod.CanReturnFloat`プロパティで動的戻り値関数をマーク
  - `FunctionMethodTerm.GetEraType()`が基底クラスメソッドをオーバーライド
  - 対象関数：POWER, ABS, SQRT, CBRT, LOG, EXP, SIGN, LIMIT, MAX, MIN, SIN, COS, TAN, ASIN, ACOS, ATAN, FLOOR, CEIL, ROUND
- **バージョン署名**：`Skiav8` → `Skiav8.1`（`1824+v24+EMv18+EEv56+Skiav8.1`）

***

## [8.0.0] — ERDシステム ALS別名対応

### エンジン層追加

- **ユーザー定義変数 ALS別名対応**：`#DIM`で宣言されたユーザー変数が`.als`ファイルで列挙別名を定義可能に
  - 従来：システム変数（ABL/TALENT/CFLAG等）のCSVファイルのみ`.als`別名ファイルに対応
  - 現在：ユーザー定義変数（例：`BUFF`）のCSVファイルにも対応する`.als`ファイルを配置可能
  - 使用法：`CSV/BUFF.csv`の横に`CSV/BUFF.als`を配置、書式はシステム変数のALSファイルと同じ（`index,別名`）
  - 例：`BUFF.als`で`1,气力`と定義すると`BUFF:2:气力`は`BUFF:2:1`と等価
  - 多次元変数対応：2D/3D変数のALSファイル命名はERDと同一（例：`BUFF@1.als`、`BUFF@2.als`）
  - 別名はCSV内の同名定義を上書きしない（CSV優先）
  - 新規`loadAliasesForUserDefined()`メソッド、別名を`erdNameToIntDics`辞書に注入
  - 3プラットフォーム同期：LazyLoading Desktop + SkiaX Desktop + SkiaX Xamarin

***

## [7.3.2] — Xamarin HtmlManager カラーセンチネル同期

### エンジン層修正

- **Xamarin HtmlManager カラーセンチネル未同期**：Xamarin側に独立した `HtmlManager.cs` コピーがあり、v7.3.1のカラーセンチネル修正が同期されていなかった
  - 症状：`color`属性なしの`<div>`がAndroid側で純白背景で表示（`Color.FromArgb(-1)` = `0xFFFFFFFF`）
  - 修正：Xamarin `HtmlManager.cs` の全カラーセンチネルを`-1`から`int.MinValue`に変更、ガードを`>= 0`/`< 0`から`!= int.MinValue`/`== int.MinValue`に変更
  - `stringToColorInt32`同期修正：RGBモードは自動的に`0xFF`アルファを補完、ARGBモードは`ToInt64`でオーバーフロー防止

***

## [7.3.1] — カラーセンチネル修正 + SETIMAGELAYERL GetLineNo 修正 + ボーダーデフォルト色

### エンジン層修正

- **カラーセンチネル `-1` と `0xFFFFFFFF` の競合**：`stringToColorInt32("#FFFFFF")` が `0xFFFFFFFF`（符号付き int = -1）を返し、ガードで「色未設定」と誤判定
  - 全カラーセンチネルを `-1` から `int.MinValue` に変更
  - `ConsoleDivPart` で `color != int.MinValue` に変更
  - 3プラットフォーム同期修正：LazyLoading Desktop + SkiaX Desktop + SkiaX Xamarin
- **SETIMAGELAYERL 行アンカーエラー**：`LineCount`（論理行番号）ではなく `GetLineNo`（表示行インデックス）を使用すべきところで誤使用、Y座標オフセット発生
  - 修正：`exm.Console.GetLineNo` に変更
- **HTML div ボーダー bcolor 省略時描画されない**：WinForms 原版は `colors == null` 時 `Config.ForeColor` を使用
  - 修正：`box.border != null && box.color == null` 時、`borderColors` のデフォルトを `Config.ForeColor` に
- **`stringToColorInt32` ARGB 分岐 `ToInt32` オーバーフロー**：9桁以上の16進数が int32 をオーバーフロー
  - 修正：≤6 は `ToInt32`（RGB）、>6 は `ToInt64`（ARGB）を使用

### ドキュメント更新

- SETIMAGELAYERL アンカー意味を「現在行（LINECOUNT）」から「現在表示行（GetLineNo）」に修正
- HTML構文ドキュメントにARGBカラーフォーマット（`#AARRGGBB`）を追加
- HTML構文ドキュメントに `bcolor` 省略時のデフォルトテキスト色を追記

***

## [7.3.0] — SETIMAGELAYERL 行相対位置決め（xpos/ypos）+ ARGB_TO_HTML_COLOR ユーティリティ関数

### エンジン層変更

- **SETIMAGELAYERL パラメータ再設計**：API を `SETIMAGELAYERL spriteName, depth, xpos, ypos, width, height, opacity, CM_ARRAY` に簡素化
  - `lineNo` パラメータを削除、常に現在の行（LINECOUNT）にアンカー、HTML `<img>` と同じパラメータ規約
  - `xpos`：行位置からのXオフセット（HTML `<img>` の `xpos` 属性と同じ意味、`ShapePositionShift` を自動含む）
  - `ypos`：行上端からのYオフセット（HTML `<img>` の `ypos` 属性と同じ意味）
  - `xpos=0, ypos=0` の場合、同じ行の `<img>` と全く同じ位置にレンダリング
  - SETIMAGELAYER と SETIMAGELAYERL の位置決めモデルを明確に区別：絶対座標 vs 行相対オフセット

***

## [7.2.0] — レンダリングパイプライン統合depth + SETIMAGELAYER マルチスプライト + SETIMAGELAYERL + ARGB 透明度 + div height auto

### エンジン層修正

- **レンダリングパイプライン統合depth**：SETIMAGELAYER、CBG、escapedParts（div含む）が同じdepthソートシステムを共有
  - divが常にImageLayerの上に表示される問題を修正——従来ImageLayerはStep 3で一括描画、divはStep 4で描画され、2つの独立したdepthシステムが存在
  - `ImageLayerManager` に `DrawLayersAtDepth(canvas, viewportW, viewportH, scrollY, int? depth)` と `GetDepths()` メソッドを追加
  - `EmueraConsole.OnPaint` は3つのdepthソース（edepth + cbgList.zdepth + idepths）を統合降順リストにマージし、各depthでImageLayer→CBG/div/テキストの順に描画
- **SETIMAGELAYER マルチスプライト対応**：`ImageLayerManager._layers` を `Dictionary<long, ImageLayer>` から `List<ImageLayer>` に変更。同じ depth のスプライトは追加順にレンダリングされ、上書きされなくなりました
- **SETIMAGELAYERL 新規命令**：自動 `followScroll=1` + 自動 `GETLINEY` Y座標変換。y パラメータは行番号（LINECOUNT）で、HTML img と同じ位置にレンダリング
- **SETIMAGELAYER 空パラメータ対応**：第3～9パラメータが空の場合にデフォルト値を使用。spriteName/depth のみ必須
- **HTML div color ARGB 対応**：`stringToColorInt32` が ARGB 透明度をサポート。6桁以下は RGB（Alpha=255）、6桁超は ARGB として解析。`ConsoleDivPart` は Alpha=255 を強制しなくなりました
- **HTML div height auto**：`<div>` の `height` 属性を省略可能に変更。省略時は内容行数 × 行高 + padding/border から自動計算

***

## [6.3.1] — SETIMAGELAYER マルチスプライト対応 + SETIMAGELAYERL + ARGB 透明度 + div height auto

### エンジン層修正

- **SETIMAGELAYER マルチスプライト対応**：`ImageLayerManager._layers` を `Dictionary<long, ImageLayer>` から `List<ImageLayer>` に変更。同じ depth のスプライトは追加順にレンダリングされ、上書きされなくなりました
- **SETIMAGELAYERL 新規命令**：自動 `followScroll=1` + 自動 `GETLINEY` Y座標変換。y パラメータは行番号（LINECOUNT）で、HTML img と同じ位置にレンダリング
- **SETIMAGELAYER 空パラメータ対応**：第3～9パラメータが空の場合にデフォルト値を使用。spriteName/depth のみ必須
- **HTML div color ARGB 対応**：`stringToColorInt32` が ARGB 透明度をサポート。6桁以下は RGB（Alpha=255）、6桁超は ARGB として解析。`ConsoleDivPart` は Alpha=255 を強制しなくなりました
- **HTML div height auto**：`<div>` の `height` 属性を省略可能に変更。省略時は内容行数 × 行高 + padding/border から自動計算

***

## [7.0.0] — GETLINEY 式中関数

### Added

- **GETLINEY 式中関数** — 指定行番号の物理Y座標（左下原点、SETIMAGELAYERと同じ座標系）を返す
  - `GETLINEY(lineNo)` は `lineNo` 行の物理Y座標を返す
  - SETIMAGELAYERレイヤーとHTMLテキストフローの配置合わせに使用
  - 内部で `EmueraConsole.GetLinePointY(int lineNo)` メソッドを再利用
  - 負数引数は `CodeEE` をスロー

***

## [6.2.0] — GETDISPLAYLINE 負数逆順インデックス

### Added

- **GETDISPLAYLINE 負数引数サポート** — 負数引数で下から逆順インデックス
  - `GETDISPLAYLINE(-1)` は最後の行、`GETDISPLAYLINE(-2)` は下から2番目の行を返す
  - 従来の正数インデックスの動作は変更なし（0=最初の行）
  - `GETDISPLAYLINE(LINECOUNT - 1)` の意味的不整合を解決：`LINECOUNT` は論理行数、`GETDISPLAYLINE` は表示行インデックスであり、両者は整合しない；負数インデックスは表示行レベルで直接操作し、不整合を回避
  - `long.MinValue` および大きな負数の `long→int` キャストオーバーフロー問題を修正

***

## [6.1.0] — IsFunctionMethod 境界チェック + FindContextByLabel スナップショット列挙

### Fixed — A類クロスプラットフォームバグ修正（デュアルプラットフォーム受益）

- **Process.State.cs** — `IsFunctionMethod` プロパティ `ArgumentOutOfRangeException`
  - `functionList[currentMin]` が `functionList` の部分クリア後にインデックス越境
  - 修正：`if (currentMin >= functionList.Count) return false;` 境界チェックを追加
  - トリガー場面：例外パス（BEFORE_ERROR/BEFORE_THROW 処理）で `RollbackToState()` が `functionList` を変更するが `currentMin` を同期しない

- **Process.State.cs** — `FindContextByLabel` メソッド `InvalidOperationException`
  - `foreach (var ctx in stack)` で `_contextStack` を列挙中にスタックが `ClearFunctionList()` 等の操作で変更される
  - 修正：スナップショット列挙 `foreach (var ctx in stack.ToArray())` に変更
  - トリガー場面：LOCAL/ARG 変数の subID アクセス時、`Return()` 例外が BEFORE_ERROR をトリガー → `ClearFunctionList()` が `_contextStack` を変更

## [6.0.0] — デバッグウィンドウ修正：LOCAL@FUNCNAME + コールスタック保持 + ウォッチ安定性

### Fixed

- **LOCAL@FUNCNAME 検出無効** — `GetArrayLocal()` が `subID` を無視し、常に `CurrentContext` の配列を返す。現在 `subID` に基づいてコンテキストスタックで一致する `ExecutionContext` を検索
- **エラー/THROW 後デバッグウィンドウのコールスタックがクリアされる** — `handleException` 後に `ClearFunctionList()` を呼び出さず、デバッグウィンドウで確認できるようコールスタックを保持。BEFORE_ERROR/BEFORE_THROW 内部用に `ClearFunctionListPreserveTrace()` を新規追加
- **デバッグウィンドウで LOCAL 変数を含む式のウォッチがエラー** — `saveCurrentState` が state をクローンした後 `CurrentContext` が null、LOCAL 変数が FallbackArray にフォールバックして空配列を返す。現在 `Clone()` は元の `_contextStack` への参照を保持、`CurrentContext` は自身のスタックが空の時に自動フォールバック
- **デバッグウィンドウの式関数評価後 currentLine 残留** — `Process.GetValue` の finally ブロックが成功パスで `PopContext()` するが `currentLine` を復元しない。現在 `CaptureCallState` が `currentLine` も同時に保存、成功/失敗パス共に復元
- **デバッグウィンドウで1つのウォッチがエラーになると他のウォッチも全て失敗** — 上記 currentLine 残留により後続ウォッチが誤った関数コンテキストでプライベート変数を解析。currentLine 復元修正後エラー伝播チェーンが断絶

### Changed

- `DisableBeforeErrorThrow` 設定項目は不要になった（エラー後コールスタックはデフォルトで保持）、ただし後方互換のため維持
- `ProcessState.ContextStackCount` プロパティを新規追加

***

## [5.2.0] — DisableBeforeErrorThrow 設定項目：デバッグ関数スタック保持

### Added

- **DisableBeforeErrorThrow 設定項目** — 新規設定オプション、有効化すると BEFORE_ERROR/BEFORE_THROW イベント関数をスキップし、直接例外をスロー。これら2つのイベントが例外処理時に関数スタックをクリアする問題を解決し、デバッグウィンドウが例外発生時にコールスタックとローカル変数を正しく表示できるようにする。後方互換のためデフォルトはオフ。

### Fixed

- デバッグウィンドウで THROW やエラー発生時に関数パラメータをウォッチできない問題（DisableBeforeErrorThrow の有効化が必要）

### Xamarin 移植注意

- Xamarin 側 `ConfigData.SetDefault()` に対応 ConfigItem を同期的に追加（v0.60.2 PluginAvailableWarn NRE 修正を参照）

***

## [5.1.0] — EEv56 上流同期：PluginAvailableWarn + TOOLTIP フォールバック

### Changed — 上流同期（emuera.em EEv56）

- **PluginAvailableWarn 設定項目**（ee commit `0abdff8`）
  - `pluginsAware.txt`による安全チェック機構を廃止（元機構：ファイルが存在しない場合 throw ExeEE で実行を阻止）
  - `ConfigCode.PluginAvailableWarn`設定項目を追加（デフォルト true）、Plugins ディレクトリに DLL がある場合に警告を表示
  - `GlobalStatic.ExistPlugin`フラグを追加、`PluginManager.LoadPlugins()`で DLL 存在に基づいて設定
  - `Lang.PluginAvailable`翻訳文字列を追加
  - 警告内容：「注意：外部プラグイン機能が有効になっています。この機能で生じた不具合等はEmueraのサポート対象外となります」
  - WinForms ConfigDialog に checkBox36 UI コントロールを追加（WinForms のみ、SkiaX は ConfigDialog を使用しない）

- **TOOLTIP デフォルト設定フォールバック**（ee commit `07e58ac`）
  - ToolTip の3項目設定がすべてデフォルト値（OwnerDraw=false, InitialDelay=0, tooltip_duration=0）の場合、非同期`Task.Run`の代わりに同期`SetToolTip()`を使用
  - デフォルト設定での TOOLTIP 表示遅延問題を修正（非同期パスの InitialDelay 待機 + SynchronizationContext ディスパッチオーバーヘッド）
  - Desktop 版のみに影響（WinForms + SkiaX Desktop）、Xamarin 版の TOOLTIP 実装は異なるため修正不要

- **バージョン番号更新**（ee commit `26a35dc`）
  - EEv55 → EEv56
  - Skia バージョン番号 v5 → v5.1

### Fixed

- **TINPUT タイマー動作中に設定ウィンドウが操作不能** — `ShowConfigDialog()` がモーダル `ShowDialog()` を使用するが、TINPUTNF の `System.Timers.Timer` が動作し続け、タイムアウト後に `RunEmueraProgram` がメインスレッドを占有して設定ウィンドウが応答しなくなる
  - `EmueraConsole.cs`：`PauseTimer()` / `ResumeTimer()` メソッドを追加、genericTimer の一時停止/再開とタイマー起点のリセット
  - `MainWindow.cs`：`ShowConfigDialog()` でダイアログを開く前にタイマーを一時停止、閉じた後に再開

- **システムページ checkBoxUseLazyLoading の説明テキスト欠落** — コントロールが Designer で作成されているが Text が未設定、ConfigCode に未バインド
  - `ConfigDialog.cs`：`checkBoxUseLazyLoading.Text` を追加（`Lang.UI.ConfigDialog.System.UseLazyLoading`）
  - `ConfigDialog.cs`：SetConfig で `ConfigCode.UseLazyLoading` をバインド、SaveConfig で値を保存

- **PluginAvailableWarn 英語説明のスペルミス** — `"If available pllugins, Show warning"` → `"Plugin available warning"`
  - `ConfigData.cs`：スペル修正（`pllugins` → `plugins`）、他の項目とスタイルを統一する名詞句に変更

- **Program.cs bgm.close コメント復元** — ee はコメントアウトされた`bgm.close()` / `sound[].close()`を復元したが、本リポジトリは A クラス修正で既にコメント解除済み、追加操作不要

***

## [5.0.0] — T プレフィックス NF サフィックス命令 + フリースクロール + HOVER_PAUSE

### Added

- **NF サフィックス命令**：`TINPUTNF`, `TINPUTSNF`, `TONEINPUTNF`, `TONEINPUTSNF`
  - TINPUT/TINPUTS/TONEINPUT/TONEINPUTS と同じパラメータと戻り値だが、下への強制スクロールを行わない
  - NF = NoFocus、`ConsoleState.WaitInputNoFocus` 状態に入り、`ApplyTextBoxChanges()` を呼び出さない
  - T プレフィックス命令のみ NF 変体を提供（INPUT/INPUTS は完全ブロッキングで NF は無意味）
  - `TINPUTSNF` で AWAIT+GETKEYTRIGGERED ポーリングハックを代替

- **ConsoleState.WaitInputNoFocus = 22**：`WaitInput` との唯一の違いは `ApplyTextBoxChanges()` を呼び出さないこと
- **InputRequest.NoFocus**：ブールフラグ、T プレフィックス NF 変体は `noFocus` コンストラクタ引数で設定
- **EmueraConsole.WaitInputNoFocus()**：`WaitInputNoFocus` 状態を設定
- **EmueraConsole.IsWaitInputState**：28箇所の `state == ConsoleState.WaitInput` 判定を置き換え

### Fixed

- **NF スクロール機構**：`nfUserScrolledBack` フラグでユーザーの上方スクロール意図を記録；`nfScrollOffsetFromBottom` でオフセットを保存；`WaitInput` 入口で強制最下部スクロール；NF 上方スクロール時の `RefreshStrings` 中間レンダリングをスキップ
- **HOVER_PAUSE ホバー一時停止**：マウスがボタンにホバーした時にアニメーションを一時停止、離れた時に再開。4つのマップ関数に統一適用

***

## [4.3.1] — GETKEY デカップリング：Latch リーク修正

### Fixed — AWAIT ループ初回反復の虚偽マウスクリック

- **EmueraConsole.cs** — `Await()` メソッドが `DoEvents()` の前に `WinInput.ClearLatches()` を呼び出す
  - 根因：INPUTS/TINPUTS モードで `MouseDown` イベントが `_keyLatch[1]=1` を設定するが、組み込み入力システムは `GETKEYTRIGGERED` を呼び出して latch を消費しない
  - INPUTS から AWAIT ループに切り替えると、残留 latch が `GETKEYTRIGGERED(1)` に消費され、虚偽クリックが発生
  - 現象：qol_MAP マップ初回進入時に高確率で即座に退出（マウス左クリックの虚偽トリガー）
  - 修正：各 `Await()` 反復開始前に全残留 latch をクリア；`DoEvents()` で生成された新規 latch は `GETKEYTRIGGERED` で正常に消費

- **WinInput.cs** — `ClearLatches()` メソッドを追加
  - `_keyLatch` 配列の全要素を原子的に 0 にクリア
  - 入力モード横断（INPUTS → AWAIT）の latch リークを防止

***

## [4.3.0] — PRINTC ピクセルタブリファクタリング：クロスプラットフォーム列揃え統一

### Fixed — PRINTFORMLC 中国語環境での列ずれ（回帰修正）

- **EmueraConsole.Print.cs** — `CreateTypeCString` で `Config.Encode.GetByteCount(str)` がデフォルト UTF-8 エンコーディングで CJK 文字を3バイトとして計算するが、`Config.PrintCLength` は半角文字単位（CJK=2）
  - A24 修正がエンコーディングを Shift-JIS から Config.Encode に変更した際の回帰
  - 修正：`LangManager.GetStrlenLang(str)` に変更、言語設定の ANSI エンコーディング（中国語=GB2312/936、日本語=Shift-JIS/932）に基づいてバイト長を計算

### Changed — PrintC/PrintButtonC をバイトタブからピクセルタブにリファクタリング

- **EmueraConsole.Print.cs** — `CreateTypeCString` メソッドを削除、`PrintC`/`PrintButtonC` をピクセルタブパスに変更
  - 旧方式：バイト長計算でスペース文字補完 → while ループでスペース微調整 → エンコーディングとフォントヒンティングの影響を受ける
  - 新方式：`StringMeasure.GetDisplayLength` でコンテンツのピクセル幅を測定 → `ConsoleSpacePart` ピクセル矩形で差分を埋める
  - `PrintHtmlC` と同じピクセルタブ概念を共有、WinForms + SkiaX デュアルプラットフォームの揃え一貫性を確保
  - `printCWidthL`/`printCWidthL2` を削除（旧 while ループのみで使用）
  - 根因分析：等幅フォント `N × charWidth ≠ stringWidth`（フォントヒンティング/カーニングの切り捨て）、WinForms GDI は文字列全体描画で誤差を吸収、SkiaX は文字ごと描画で誤差が蓄積して可視オフセットに

### 同期修正

- **SkiaX Desktop** (`Emuera/UI/Game/EmueraConsole.Print.cs`) — 同期リファクタリング
- **SkiaX Xamarin** (`Emuera.Xamarin/Platform/GameView/EmueraConsole.Print.cs`) — 同期リファクタリング

***

## [4.2.0] — FONTBOLD/FONTITALIC/FONTREGULAR クロスプラットフォーム修正 + GETPLATFORM API

### Fixed — モバイル版フォントスタイル命令の空操作によるBoldリーク

- **Instraction.Child.cs** — `FONTBOLD`/`FONTITALIC`/`FONTREGULAR` が非Windowsプラットフォームで空操作だった（`if (!OperatingSystem.IsWindows()) return;`）
  - `FONTSTYLE` 命令にはこの制限がなく、モバイルでも正常に動作
  - 非対称性により：`FONTSTYLE 1` でBoldを設定後、`FONTREGULAR` でリセット不可 → Boldリーク → `GETSTYLE()` が1を返す → `HTMLWRAP(STYLE_FLAG=-1)` が`<b>`タグを生成 → ネスト → SkiaX HtmlManagerが「タグ重複使用」エラーをスロー
  - 修正：3つの命令から `!IsWindows()` 制限を削除。`FontStyle` 列挙型は純粋なメモリ操作であり、プラットフォームAPIに依存しない

### Added — ERB プラットフォーム検出 API

- **GETPLATFORM()** — 現在の実行プラットフォームの整数コードを返す
  - 0=Windows, 1=Android, 2=iOS, 3=macOS, 4=Linux, 5=Unknown
  - `CanRestructure = true`（純粋関数、コンパイル時定数畳み込み可能）
  - ERBスクリプトで `IF GETPLATFORM() == 0` のようにプラットフォーム条件分岐が可能

***

## [4.1.4] — GETKEY/GETKEYTRIGGERED マウスボタン修正

### Fixed — クロスプラットフォームバックポートによる回帰バグ

- **MainWindow.cs** — `GETKEYTRIGGERED(1/2/4)` マウスボタンが常に 0 を返す（A35）
  - V4.1.0 で `WinInput.GetKeyState` を Win32 `user32.dll GetKeyState` からイベント駆動の `_keyState` 配列に変更
  - `SetKeyPressed`/`SetKeyReleased` は `richTextBox1_KeyDown`/`KeyUp` でのみ呼び出され、マウスボタンは `KeyDown` イベントをトリガーしない
  - `GETKEYTRIGGERED(1)` (VK_LBUTTON)、`GETKEYTRIGGERED(2)` (VK_RBUTTON)、`GETKEYTRIGGERED(4)` (VK_MBUTTON) が常に 0 を返す
  - 修正：`mainPicBox_MouseDown`/`mainPicBox_MouseUp` で `WinInput.SetKeyPressed`/`SetKeyReleased` を追加し、マウスボタンを VK_LBUTTON/VK_RBUTTON/VK_MBUTTON にマッピング
  - 対応コミット `63afa0d`（クロスプラットフォームオーディオアーキテクチャリファクタリング）で導入された回帰

- **WinInput.cs / Creator.Method.cs** — AWAIT ループで高速マウスクリックが消失（A35 補足修正）
  - 根因：`MouseDown` + `MouseUp` が同じ `DoEvents()` 内で処理される可能性があり、`SetKeyReleased` が直ちに `_keyState` をクリアするため、`GETKEYTRIGGERED` が 0 を読み取る
  - V3 の Win32 `GetKeyState` はハードウェア状態を直接読み取るため、メッセージキューのタイミングの影響を受けない
  - 修正：`_keyLatch` ラッチ配列を追加、`SetKeyPressed` 時に 1 を設定、`GETKEYTRIGGERED` はラッチを優先消費（`ConsumeKeyLatch`）、ボタンが既に解放されていても押下イベントを検出可能に

***

## [4.1.3] — 廃止された #FUNCTION ... 可変長引数構文の削除

### Removed — 廃止構文のクリーンアップ

- **UserDefinedFunctionDataArgType** — `__Variadic = 0x80` 列挙値を削除
  - `#FUNCTION` 宣言の `...` 可変長引数構文は字句解析器の浮動小数点解析と競合するため、廃止済み
  - 可変長引数は `VARIADIC` キーワードで関数定義に統一宣言（`@FUNC(VARIADIC ARG:0)`）、`#FUNCTION` 宣言に可変長引数情報は含まれない
- **UserDefinedFunction.cs** — `case '.'` 解析コードと `state == 7` 処理を削除
- **UserDefinedRefMethod.cs** — `__Variadic` フラグマッチングを削除（2箇所）

***

## [4.1.2] — debug_log 持続書き込み修正

### Fixed — debug_log が持続的に書き込まれなくなる

- **Process.cs / Process.ScriptProc.cs** — `DebugLogEnabled` が `true` に設定されると（例外や THROW のトリガー時）、その後リセットされず、正常な実行フローでもログが持続的に書き込まれる
  - 根因：`catch` ブロックと `THROW` 命令で `DebugLogEnabled = true` とするが、全 `return`/`break` パスで `false` にリセットしていない
  - 影響：WinForms では THROW 後にプログラムが終了するため影響は小さい；Android アプリはゲームリストに戻った後もプロセスが継続し、`DebugLogEnabled` が `true` のまま、次回ゲーム进入時に `IntoFunction`/`ReturnF`/`ClearFunctionList`/`GetValue` 等の高頻度呼び出しでログが持続的に書き込まれ、debug_log.log が急速に増大
  - 修正：全例外処理終了パス（`ClearFunctionList` の後）と THROW の全 `break` パスの前に `DebugLogEnabled = false` にリセット

***

## [4.1.1] — オーディオ API バグ修正（A33-A34 バックポート）

### Fixed — カーネルバグ修正（A類、feature/xamarin からバックポート）

- **Creator.Method.cs** — ISPLAYINGSOUND デッドコード + 無限ループ（A33）
  - `arguments[0] == null` は常に偽：`arguments[0].GetIntValue(exm)` 呼び出し後、`arguments[0]` は null になり得ない
  - for ループ条件 `channelId < GlobalStatic.Sound.Length` は `i < GlobalStatic.Sound.Length` であるべき、`channelId` を使用すると無限ループに
  - 修正：指定チャンネルが再生中かを直接チェックするように簡素化

- **Creator.Method.cs** — SOUNDCONTROL コメント誤り（A34）
  - コメント `2=変速` が実際の switch ロジックと不一致（action=2 は停止、action=3 が変速）
  - コメントを `0=一時停止, 1=再開, 2=停止, 3=変速` に修正

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
- **`#REF`** **/** **`#REFS`** **要素参照キーワード**（Phase 2.3）
  - `#REF X` で整数要素参照を宣言（Dimension=0）
  - `#REFS S` で文字列要素参照を宣言（Dimension=0）
  - `#DIM REF` 配列参照と完全に分離、セマンティクスの曖昧さを解消
  - `ConvertArg` で 3 次元の分岐にマッチ（Dimension=0 / Dimension>0 / OUT）
- **OUT パラメータ（Optional Output Parameters）**（Phase 2.4）
  - `#DIM OUT X` / `#DIMS OUT X` で省略可能な出力パラメータを宣言
  - `NullRefTerm` ブラックホール変数：省略時は全ての読み書きがサイレントに無視される
  - OUT は `#REF` と同型（要素参照 Dimension=0）、`#DIM REF` とは同型ではない
  - `refDestDimension` フィールドで要素参照と配列参照の渡し方を区別
  - OUT + 可変パラメータの組み合わせ、ネスト呼び出し、CALLFORM/TRYCALL をサポート

### Fixed

- **ARGLEN() コンパイル時定数折りたたみで 0 になる**：`CanRestructure = false` でオプティマイザの誤折りたたみを防止
- **ElementRefInfo コンテキスト依存による参照書き戻し失敗**：作成時に実際の配列スナップショットをキャプチャ
- **ReferenceToken ScopeIn/ScopeOut で参照状態が保存されない**：`_scopeState` リストを導入して保存/復元
- **SetTransporter 配列 REF パラメータの渡し方が誤り**：`refDestDimension` で要素参照 vs 配列参照を区別
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
