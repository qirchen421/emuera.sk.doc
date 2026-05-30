---
---

# Skia機能概要

!!! info "このページについて"

    このページは **Emuera Skia (Skia版)** の、バグ修正を除く全量の新機能をまとめています。
    Skia版は EmueraEM+EE をベースに、遅延読み込み・MAP拡張・SkiaSharpレンダリングなどの独自機能を追加した派生版です。

---

## 凡例 { #legend }

- ![](../assets/images/IconSK.webp) - Skia（Skia版）で追加、変更、拡張された機能
- ![](../assets/images/IconEM.webp) - EM(EvilMask版)で追加された機能
- ![](../assets/images/IconEE.webp) - EE(Enter's Edition)で追加された機能
- ![](../assets/images/Icondotnet.webp) - DotNet版から同期した機能

---

## Skia版追加関数一覧 { #skia-functions }

> Skia版で新規追加された命令・式中関数の一覧。既存関数の拡張パラメータは[仕様が変更された命令](#changed-commands)を参照。

| 関数 | 種別 | 説明 | 詳細 |
|:---|:---|:---|:---|
| ![](../assets/images/IconSK.webp) `SETIMAGELAYER` | 命令 | 独立画像レイヤーの設定/更新 | [SETIMAGELAYER](../Reference/SETIMAGELAYER.md) |
| ![](../assets/images/IconSK.webp) `CLEARIMAGELAYER` | 命令 | 指定深度のレイヤーを削除 | [CLEARIMAGELAYER](../Reference/CLEARIMAGELAYER.md) |
| ![](../assets/images/IconSK.webp) `CLEARIMAGELAYER_ALL` | 命令 | 全レイヤーを削除 | [CLEARIMAGELAYER](../Reference/CLEARIMAGELAYER.md) |
| ![](../assets/images/IconSK.webp) `EXISTSIMAGELAYER` | 式中関数 | レイヤーの存在確認 | [EXISTSIMAGELAYER](../Reference/EXISTSIMAGELAYER.md) |
| ![](../assets/images/IconSK.webp) `CALLSTR` | 命令 | 文字列変数の関数を呼び出し | [CALLSTR](../Reference/CALLSTR.md) |
| ![](../assets/images/IconSK.webp) `JUMPSTR` | 命令 | 文字列変数の関数にジャンプ | [CALLSTR](../Reference/CALLSTR.md) |
| ![](../assets/images/IconSK.webp) `TRYCALLSTR` | 命令 | 存在チェック付きCALLSTR | [CALLSTR](../Reference/CALLSTR.md) |
| ![](../assets/images/IconSK.webp) `TRYJUMPSTR` | 命令 | 存在チェック付きJUMPSTR | [CALLSTR](../Reference/CALLSTR.md) |
| ![](../assets/images/IconSK.webp) `TRYCCALLSTR` | 命令 | 存在チェック付きCALLSTR（CATCH付き） | [CALLSTR](../Reference/CALLSTR.md) |
| ![](../assets/images/IconSK.webp) `TRYCJUMPSTR` | 命令 | 存在チェック付きJUMPSTR（CATCH付き） | [CALLSTR](../Reference/CALLSTR.md) |
| ![](../assets/images/IconSK.webp) `EVAL` | 式中関数 | 文字列式を整数として評価 | [EVAL](../Reference/EVAL.md) |
| ![](../assets/images/IconSK.webp) `EVALS` | 式中関数 | 文字列式を文字列として評価 | [EVAL](../Reference/EVAL.md) |
| ![](../assets/images/IconSK.webp) `BITSET` | 式中関数 | 指定ビットを設定 | [BITARRAY](../Reference/BITARRAY.md) |
| ![](../assets/images/IconSK.webp) `BITGET` | 式中関数 | 指定ビットの値を取得 | [BITARRAY](../Reference/BITARRAY.md) |
| ![](../assets/images/IconSK.webp) `BITTOGGLE` | 式中関数 | 指定ビットを反転 | [BITARRAY](../Reference/BITARRAY.md) |
| ![](../assets/images/IconSK.webp) `BITINDEXOFFIRST` | 式中関数 | 最初のセット/クリアビットのインデックス | [BITARRAY](../Reference/BITARRAY.md) |
| ![](../assets/images/IconSK.webp) `MAP_VALUES` | 式中関数 | 全値をカンマ区切り文字列で取得 | [MAP_GETKEYS](../Reference/MAP_GETKEYS.md) |
| ![](../assets/images/IconSK.webp) `MAP_TOSTRING` | 式中関数 | マップをkey=value形式にシリアライズ | [MAP_SERIALIZATION](../Reference/MAP_SERIALIZATION.md) |
| ![](../assets/images/IconSK.webp) `MAP_FROMSTRING` | 式中関数 | key=value形式からマップをデシリアライズ | [MAP_SERIALIZATION](../Reference/MAP_SERIALIZATION.md) |
| ![](../assets/images/IconSK.webp) `MAP_MERGE` | 式中関数 | 他のマップの内容をマージ | [MAP_ENHANCED](../Reference/MAP_ENHANCED.md) |
| ![](../assets/images/IconSK.webp) `MAP_REMOVEIF` | 式中関数 | 条件に一致するキーを削除 | [MAP_ENHANCED](../Reference/MAP_ENHANCED.md) |
| ![](../assets/images/IconSK.webp) `MAP_FINDKEY` | 式中関数 | 値に一致するキーを検索 | [MAP_ENHANCED](../Reference/MAP_ENHANCED.md) |
| ![](../assets/images/IconSK.webp) `SIN` | 式中関数 | サイン（ラジアン） | [MATH_EXTENSION](../Reference/MATH_EXTENSION.md) |
| ![](../assets/images/IconSK.webp) `COS` | 式中関数 | コサイン（ラジアン） | [MATH_EXTENSION](../Reference/MATH_EXTENSION.md) |
| ![](../assets/images/IconSK.webp) `TAN` | 式中関数 | タンジェント（ラジアン） | [MATH_EXTENSION](../Reference/MATH_EXTENSION.md) |
| ![](../assets/images/IconSK.webp) `ASIN` | 式中関数 | アークサイン | [MATH_EXTENSION](../Reference/MATH_EXTENSION.md) |
| ![](../assets/images/IconSK.webp) `ACOS` | 式中関数 | アークコサイン | [MATH_EXTENSION](../Reference/MATH_EXTENSION.md) |
| ![](../assets/images/IconSK.webp) `ATAN` | 式中関数 | アークタンジェント | [MATH_EXTENSION](../Reference/MATH_EXTENSION.md) |
| ![](../assets/images/IconSK.webp) `FLOOR` | 式中関数 | 切り下げ | [MATH_EXTENSION](../Reference/MATH_EXTENSION.md) |
| ![](../assets/images/IconSK.webp) `CEIL` | 式中関数 | 切り上げ | [MATH_EXTENSION](../Reference/MATH_EXTENSION.md) |
| ![](../assets/images/IconSK.webp) `ROUND` | 式中関数 | 四捨五入 | [MATH_EXTENSION](../Reference/MATH_EXTENSION.md) |
| ![](../assets/images/IconSK.webp) `UNCHECKED_ADD` | 式中関数 | 加算ラップアラウンド | [UNCHECKED](../Reference/UNCHECKED.md) |
| ![](../assets/images/IconSK.webp) `UNCHECKED_SUB` | 式中関数 | 減算ラップアラウンド | [UNCHECKED](../Reference/UNCHECKED.md) |
| ![](../assets/images/IconSK.webp) `UNCHECKED_MUL` | 式中関数 | 乗算ラップアラウンド | [UNCHECKED](../Reference/UNCHECKED.md) |
| ![](../assets/images/IconSK.webp) `UNCHECKED_NEG` | 式中関数 | 符号反転ラップアラウンド | [UNCHECKED](../Reference/UNCHECKED.md) |
| ![](../assets/images/IconSK.webp) `HTML_PRINTC` | 命令 | HTML文字列を右寄せ出力 | [HTML_PRINTC](../Reference/HTML_PRINTC.md) |
| ![](../assets/images/IconSK.webp) `HTML_PRINTLC` | 命令 | HTML文字列を左寄せ出力（行幅計算付き） | [HTML_PRINTC](../Reference/HTML_PRINTC.md) |
| ![](../assets/images/IconSK.webp) `SPRITECREATEFROMFILE` | 式中関数 | 画像ファイルから直接スプライト作成 | [SPRITECREATEFROMFILE](../Reference/SPRITECREATEFROMFILE.md) |
| ![](../assets/images/IconSK.webp) `SET_TEXT_DRAWING_MODE` | 命令 | テキスト描画パイプラインの設定 | [SKIA_RENDER](../Reference/SKIA_RENDER.md) |
| ![](../assets/images/IconSK.webp) `GET_TEXT_DRAWING_MODE` | 式中関数 | テキスト描画パイプラインの取得 | [SKIA_RENDER](../Reference/SKIA_RENDER.md) |
| ![](../assets/images/IconSK.webp) `SET_SKIA_QUALITY` | 命令 | レンダリング品質の設定 | [SKIA_RENDER](../Reference/SKIA_RENDER.md) |
| ![](../assets/images/IconSK.webp) `GET_SKIA_QUALITY` | 式中関数 | レンダリング品質の取得 | [SKIA_RENDER](../Reference/SKIA_RENDER.md) |
| ![](../assets/images/Icondotnet.webp) `G_POLYGON_DRAW` | 命令 | 多角形の輪郭を描画 | [G_POLYGON](../Reference/G_POLYGON.md) |
| ![](../assets/images/Icondotnet.webp) `G_POLYGON_FILL` | 命令 | 多角形を塗りつぶし | [G_POLYGON](../Reference/G_POLYGON.md) |
| ![](../assets/images/Icondotnet.webp) `G_POLYGON_POINT_ADD` | 命令 | 多角形の頂点を追加 | [G_POLYGON](../Reference/G_POLYGON.md) |
| ![](../assets/images/Icondotnet.webp) `G_POLYGON_POINT_CLEAR` | 命令 | 多角形の全頂点をクリア | [G_POLYGON](../Reference/G_POLYGON.md) |
| ![](../assets/images/IconSK.webp) `TEXT_BGC_ON` | 命令 | テキスト背景色表示を有効化 | [TEXT_BGC](../Reference/TEXT_BGC.md) |
| ![](../assets/images/IconSK.webp) `TEXT_BGC_OFF` | 命令 | テキスト背景色表示を無効化 | [TEXT_BGC](../Reference/TEXT_BGC.md) |
| ![](../assets/images/IconSK.webp) `SQL_ESCAPE` | 式中関数 | 文字列のSQLエスケープ | [SQL_PARAM](../Reference/SQL_PARAM.md) |
| ![](../assets/images/IconSK.webp) `SQL_P_EXECUTE_NONQUERY` | 命令 | パラメータ化クエリ実行（非クエリ） | [SQL_PARAM](../Reference/SQL_PARAM.md) |
| ![](../assets/images/IconSK.webp) `SQL_P_EXECUTE_READER` | 命令 | パラメータ化クエリ実行（リーダー） | [SQL_PARAM](../Reference/SQL_PARAM.md) |
| ![](../assets/images/IconSK.webp) `SQL_P_EXECUTE_SCALAR_LONG` | 式中関数 | パラメータ化クエリ実行（スカラーlong） | [SQL_PARAM](../Reference/SQL_PARAM.md) |
| ![](../assets/images/IconSK.webp) `SQL_P_EXECUTE_SCALAR_STRING` | 式中関数 | パラメータ化クエリ実行（スカラーstring） | [SQL_PARAM](../Reference/SQL_PARAM.md) |
| ![](../assets/images/IconSK.webp) `SQL_P_EXECUTE_SCALAR_FLOAT` | 式中関数 | パラメータ化クエリ実行（スカラーfloat） | [SQL_PARAM](../Reference/SQL_PARAM.md) |
| ![](../assets/images/Icondotnet.webp) `SQL_CONNECTION_OPEN` | 命令 | 便利関数：sav/sql/下にDB接続を作成 | [SQL_CONNECT](../Reference/SQL_CONNECT.md) |
| ![](../assets/images/IconSK.webp) `SQL_IMPORT_MAP_XML` | 命令 | XMLからMAPをSQLにインポート | [SQL_XML](../Reference/SQL_XML.md) |
| ![](../assets/images/IconSK.webp) `SQL_IMPORT_DT_XML` | 命令 | XMLからDataTableをSQLにインポート | [SQL_XML](../Reference/SQL_XML.md) |
| ![](../assets/images/IconSK.webp) `SQL_EXPORT_MAP_XML` | 命令 | SQLからMAPをXMLにエクスポート | [SQL_XML](../Reference/SQL_XML.md) |
| ![](../assets/images/IconSK.webp) `SQL_EXPORT_DT_XML` | 命令 | SQLからDataTableをXMLにエクスポート | [SQL_XML](../Reference/SQL_XML.md) |
| ![](../assets/images/IconSK.webp) `SQL_IMPORT_XML_CUSTOM` | 命令 | カスタムXMLインポート | [SQL_XML](../Reference/SQL_XML.md) |
| ![](../assets/images/IconSK.webp) `STRICT_FONT_FALLBACK` | 命令 | 厳格フォントフォールバックモード | [STRICT_FONT_FALLBACK](../Reference/STRICT_FONT_FALLBACK.md) |
| ![](../assets/images/Icondotnet.webp) `GETCSVNOBYNAME` | 式中関数 | NAMEからキャラ番号を逆査 | [GETCSVNOBY](../Reference/GETCSVNOBY.md) |
| ![](../assets/images/Icondotnet.webp) `GETCSVNOBYNICKNAME` | 式中関数 | NICKNAMEからキャラ番号を逆査 | [GETCSVNOBY](../Reference/GETCSVNOBY.md) |
| ![](../assets/images/Icondotnet.webp) `GETCSVNOBYCALLNAME` | 式中関数 | CALLNAMEからキャラ番号を逆査 | [GETCSVNOBY](../Reference/GETCSVNOBY.md) |
| ![](../assets/images/Icondotnet.webp) `GETCSVNOBYMASTERNAME` | 式中関数 | MASTERNAMEからキャラ番号を逆査 | [GETCSVNOBY](../Reference/GETCSVNOBY.md) |
| ![](../assets/images/Icondotnet.webp) `MATCHALL` | 式中関数 | 配列の全量検索（変数参照） | [MATCHALL](../Reference/MATCHALL.md) |
| ![](../assets/images/Icondotnet.webp) `MATCHALLEX` | 式中関数 | 配列の全量検索（文字列変数名） | [MATCHALL](../Reference/MATCHALL.md) |
| ![](../assets/images/IconSK.webp) `BEFORE_THROW` | イベント関数 | THROW スロー前に呼び出し | [イベント関数](../tutorial/event-functions.md#before_throw) |
| ![](../assets/images/IconSK.webp) `BEFORE_ERROR` | イベント関数 | エラー発生時に初回呼び出し | [イベント関数](../tutorial/event-functions.md#before_error) |
| ![](../assets/images/IconSK.webp) `GETPLATFORM` | 式中関数 | 実行プラットフォームの取得 | [GETPLATFORM](../Reference/GETPLATFORM.md) |
| ![](../assets/images/IconSK.webp) `TINPUTNF` | 命令 | TINPUT の NF 変種、強制スクロールなし | [TINPUTNF](../Reference/TINPUTNF.md) |
| ![](../assets/images/IconSK.webp) `TINPUTSNF` | 命令 | TINPUTS の NF 変種、強制スクロールなし | [TINPUTSNF](../Reference/TINPUTNF.md) |
| ![](../assets/images/IconSK.webp) `TONEINPUTNF` | 命令 | TONEINPUT の NF 変種、強制スクロールなし | [TONEINPUTNF](../Reference/TONEINPUTNF.md) |
| ![](../assets/images/IconSK.webp) `TONEINPUTSNF` | 命令 | TONEINPUTS の NF 変種、強制スクロールなし | [TONEINPUTSNF](../Reference/TONEINPUTNF.md) |

---

### ![](../assets/images/IconSK.webp)エラー処理イベント（SK専用）
!!! summary ""

    `BEFORE_THROW` と `BEFORE_ERROR` の2つのイベント関数を追加し、スクリプトレベルのエラー処理能力を提供する。

    - **`BEFORE_THROW`**：`THROW` 命令で例外がスローされる前に呼び出し、スクリプトによる例外のインターセプトと処理を許可
    - **`BEFORE_ERROR`**：任意のエラーが最初に発生した時に呼び出し、統一的なエラー処理フックを提供
    - イベント関数が存在する場合、例外のスローが遅延され、スクリプトはクリーンアップやリカバリ操作を行うことが可能
    - 再帰呼び出し防止：イベント関数内で再度エラーが発生した場合、イベントは再トリガーされず直接処理される

### ![](../assets/images/IconSK.webp)関数呼び出しパラメータ安全性最適化
!!! summary ""

    原版の関数呼び出し体系の三層安全性欠陥を系統的に修正。

    - **ConvertArg 多余パラメータ静默破棄**：原版では引数過多でエラー、Skia版は循環で自然に無視（CALLSTR系の実行時解析と整合）
    - **TRYCALL 安全網**：原版では `ConvertArg` 失敗時に `TRYCALL` もクラッシュ、Skia版は `isTry` フラグで `JumpToEndCatch`（`CALLS_Instruction` と整合）
    - **CALLSTR 実行時関数反射**：関数名+パラメータの実行時文字列解析をサポート、`CALLFORM` は関数名のみ実行時構築でパラメータ指定不可の制限を突破
    - 詳細は [CALL](../Reference/CALL.md)、[TRYCALL](../Reference/TRY.md)、[CALLSTR](../Reference/CALLSTR.md) を参照

### ![](../assets/images/IconSK.webp)SkiaSharpレンダリングエンジン { #skia-sharp }
!!! summary ""

    GDI+に代わりSkiaSharpをレンダリングエンジンとして採用。クロスプラットフォーム対応、GPU高速レンダリングを提供する。

    - **OpenGL ハードウェア加速**：自動検出 + 実行時降格
    - **CPU ソフトウェアレンダリング**：互換性最高
    - **Auto モード**：OpenGL優先、失敗時CPU降格
    - **SRGB 色空間修正**：SkiaSharpのデフォルト色空間による画面暗化を修正
    - **GDI フォントフォールバック**：MS Gothic等の光栅フォントはGDIレンダリングパスを保留
    - **スマートフォントフォールバック**：セリフ/サンセリフ分類フォールバック、CJK全域カバー

### ![](../assets/images/IconSK.webp)遅延読み込み機構
!!! summary ""

    ERBファイルを関数呼び出し時に動的にロードする仕組み。起動時の全量読み込みを回避し、必要な関数のみをオンデマンドで読み込む。

    - 関数→ファイルのマッピングテーブルを構築
    - `CALL`時に未ロードの関数があれば該当ERBファイルをロード
    - 大規模ゲームの起動時間を大幅に短縮

### ![](../assets/images/IconSK.webp)全画面モード (F11)
!!! summary ""

    F11キーでフルスクリーン表示に切り替え。開始メニューを覆い、マウスを上部に移動するとツールバーが自動表示される。

### ![](../assets/images/IconEE.webp)![](../assets/images/IconSK.webp)オーディオ処理 (SoundTouch)
!!! summary ""

    EEのオーディオ機能にSoundTouchライブラリを統合し、テンポ・ピッチ変更をサポート。

    - 音声のテンポ変更（速度変更、ピッチ保持）
    - 音声のピッチ変更（音程変更、速度保持）
    - リアルタイム変換再生

### ![](../assets/images/IconSK.webp)SELECTCASE コンパイル時ジャンプテーブル最適化
!!! summary ""

    コンパイル時に `Dictionary<long/string/double, InstructionLine>` ジャンプテーブルを構築し、SELECTCASEのO(n)線形スキャンをO(1)ハッシュルックアップに最適化。

    - `SelectCaseJumpTable` コアクラス：コンパイル時ジャンプテーブル構築
    - 整数・文字列・浮動小数点の3種類のキータイプをサポート
    - カンマ区切りのCASE定数リストをサポート（`CASE 1, 2, 3`）
    - 定数式に畳み込み可能な純関数式をサポート（例：`CASE ABS(3)`、`CASE TOINT("123")`）
    - 重複値の処理はFIFO戦略を採用：最初に出現した分岐を保持し、以降の重複はwarningを出力してスキップ
    - 最適化不可能なCASE（TO/IS/非定数/副作用関数などを含む）は自動的に線形スキャンにフォールバック
    - 既存のFALLTHROUGHセマンティクスとの互換性

### ![](../assets/images/IconSK.webp)画像リソース管理再構築
!!! summary ""

    画像リソース管理を全面的に再設計。

    - **SharedBitmapCache**：グローバルビットマッププール（max 200）+ ConstImage軽量シェル（filepathのみ記録、SKBitmapを保持しない）
    - **AnimSpriteCache**：アニメーション精霊LRUキャッシュ（max 6）、超過時Evictでフレームデータ解放、再アクセス時に再デコード
    - **SpriteAnime最適化**：同一ファイルの重複デコードによるメモリ爆発を修正
    - **遅延読み込みインデックス**：CSVプリロードはSQLite :memory: インデックスのみ構築、画像データは0バイト、初回レンダリング時にデコード
    - **DIV レンダリング最適化**：ヒットテストO(1)定位 + Y軸プレフィルタリング
    - **ToolTip防遮蔽**：画面端で自動反転

---

## 定数・変数 { #variables }

### ![](../assets/images/IconSK.webp)浮動小数点数（Float型）サポート
!!! summary ""

    ERABASICに浮動小数点数（Float型）のサポートを追加。EM+EEや原版Emueraは整数のみ対応。

    - `Float`型変数：`RESULTF`、`LOCALF`、`ARGF`など
    - `#DIMF` 浮動小数点変数宣言
    - `#FUNCTIONF` 浮動小数点戻り値関数
    - FORM構文拡張：`{浮動小数点式}` で浮動小数点→文字列変換、`{式,桁数}` で桁埋め対応
    - 整数と浮動小数点の自動キャスト
    - キャラクター浮動小数点変数：CharacterData中 dataFloat/dataFloatArray/dataFloatArray2D
    - アーカイブ双精度サポート
    - 浮動小数点型変換関数：`TOSTRF`（浮動小数点→文字列）、`TOFLOAT`（文字列→浮動小数点）、`TOINT` 拡張（浮動小数点→整数切り捨て）

!!! warning "注意"

    Float型はSkia版でのみ利用可能。EM+EEや原版EmueraのERBスクリプトではコンパイルエラーになる。

!!! info "API"

    | 関数 | 引数 | 戻り値 | 説明 |
    |------|------|--------|------|
    | ![](../assets/images/IconSK.webp) `TOSTRF` | `float`{, `option`} | `string` | 浮動小数点→文字列；`option` はC#書式指定文字列（例：`"F2"`、`"E"`）、省略時はデフォルト書式 |
    | ![](../assets/images/IconSK.webp) `TOFLOAT` | `string` | `float` | 文字列→浮動小数点；解析失敗時は0.0を返す |
    | ![](../assets/images/IconSK.webp) `TOINT`（拡張） | `float` | `int` | 浮動小数点→整数、直接切り捨て（丸めなし） |

### ![](../assets/images/IconSK.webp)VARIADIC 可変長引数
!!! summary ""

    関数引数宣言で `VARIADIC ARG/ARGS/ARGF` による可変長引数をサポート。

!!! info "API"

    ``` { #language-erbapi }
    @FUNC_NAME(VARIADIC ARG:0)
    @FUNC_NAME(VARIADIC ARGS:0)
    @FUNC_NAME(VARIADIC ARGF:0)
    ```

    - `ARGLEN()` 内部関数で可変長引数の数を取得
    - Int/String/Float 三種類の可変長引数タイプをサポート
    - Int→Float 暗黙変換対応

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @MY_FUNC(VARIADIC ARG:0)
    REPEAT ARGLEN()
        PRINTVL ARG:COUNT
    REND
    ```

### ![](../assets/images/IconSK.webp)参照パラメータ（REF/OUT）
!!! summary ""

    EM+EEの配列参照（`#DIM REF`）を拡張し、要素参照とOUT パラメータを追加。

    - 要素参照：`#REF X` / `#REFS X` / `#REFF X` — ターゲット配列変数の特定インデックス位置にバインド（EM+EEは配列全体のみ）
    - OUT パラメータ：`#DIM OUT X` / `#DIMS OUT X` / `#DIMF OUT X` — 省略可能な要素参照（省略時は書き込み破棄）

!!! warning "注意"

    詳細は[変数宣言チュートリアル](../tutorial/variable-declaration.md#ref)を参照。

### ![](../assets/images/IconSK.webp)ExecutionContext スタック式関数コンテキスト { #executioncontext }
!!! summary ""

    各関数呼び出しで独立した `ExecutionContext` を作成し、LOCAL/ARG 系変数の再帰上書き汚染を修正。

    - 上游（emuera.em）では `VariableLocal` 辞書で関数名（subKey）ごとに ARG/LOCAL を管理しており、異なる関数は独立した配列を持つが、同じ関数の再帰呼び出し時は subKey が同じため、すべてのレベルが同じ配列を共有し互相上書きされる問題があった
    - Skia版では `ExecutionContext` スタックにより、各呼び出しが独立した `LocalIntegers`/`LocalStrings`/`ArgIntegers`/`ArgStrings` 配列を持つ
    - `IntoFunction()` で PushContext、`Return()` で PopContext + Dispose
    - `#DIM DYNAMIC` 変数の ScopeIn/ScopeOut 管理に加えて、ExecutionContext が追加の隔離層を提供
    - **重要な違い**：`DYNAMIC` は `#DIM` で宣言されたプライベート変数のみを保護し、ARG/LOCAL などの組み込み変数は保護しない。オリジナルエンジンでは `#DIM DYNAMIC` を使用しても、再帰時に ARG:0 は上書きされる。ExecutionContext はこの問題を根本的に解決する。詳細は [変数宣言チュートリアル — オリジナルエンジンのARG再帰トラップ](../tutorial/variable-declaration.md#arg)

### ![](../assets/images/IconSK.webp)SparseArray\<T> 疎配列ストレージ
!!! summary ""

    大添字配列のメモリ効率を最適化。`SparseArray<T>` で未使用インデックスのメモリを消費しない。

### ![](../assets/images/IconSK.webp)SafeArithmetic 安全演算
!!! summary ""

    オーバーフロー保護。静的オーバーフローを防止し、演算結果が型の範囲を超えないようにする。

!!! info "API"

    Skia版では、通常の算術演算子（`+`、`-`、`*`、単項`-`）が`SafeArithmetic`によりオーバーフロー保護されています。オーバーフロー時は警告を出力し、`Long.MaxValue`または`Long.MinValue`にクランプされます。

    ラップアラウンド（折り返し）動作が必要な場面（ハッシュ計算など）のために、UNCHECKED系式中関数を提供します：

    | 関数 | 対応演算 | 説明 |
    |:---|:---|:---|
    | `UNCHECKED_ADD(a, b)` | `a + b` | 加算のラップアラウンド |
    | `UNCHECKED_SUB(a, b)` | `a - b` | 減算のラップアラウンド |
    | `UNCHECKED_MUL(a, b)` | `a * b` | 乗算のラップアラウンド |
    | `UNCHECKED_NEG(a)` | `-a` | 符号反転のラップアラウンド |

    詳細は[UNCHECKED](../Reference/UNCHECKED.md)を参照してください。

---

## 仕様が変更された命令・式中関数 { #changed-commands }

### ![](../assets/images/IconSK.webp) T プレフィックス INPUT 命令の NF サフィックス変体
!!! summary ""

    TINPUT/TINPUTS/TONEINPUT/TONEINPUTS に NF（NoFocus）サフィックス変体を追加：`TINPUTNF`/`TINPUTSNF`/`TONEINPUTNF`/`TONEINPUTSNF`。
    元の命令と完全に同じパラメータと戻り値だが、下への強制スクロールを行わない点のみ異なる。
    入力待ち中のユーザーのフリースクロールを許可する。

!!! info "API"

    ``` { #language-erbapi }
    TINPUTNF time, {defaultvalue}, {cancelvalue}, {cancelform}
    TINPUTSNF time, {defaultstring}, {cancelvalue}, {cancelform}
    TONEINPUTNF time, {defaultvalue}, {cancelvalue}, {cancelform}
    TONEINPUTSNF time, {defaultstring}, {cancelvalue}, {cancelform}
    ```

    **NF サフィックスのセマンティクス**：`WaitInput` ではなく `WaitInputNoFocus` 状態に入り、`ApplyTextBoxChanges()` を呼び出さず、ボタン ハイライト/Tooltip 機能を保持する。

### ![](../assets/images/IconSK.webp)`CBGSETSPRITE`の拡張パラメータ
!!! summary ""

    CBGSETSPRITEに4つの拡張パラメータを追加。スプライトの縮尺・透明度・カラーマトリクスを指定可能に。

!!! info "API"

    ``` { #language-erbapi }
    CBGSETSPRITE imgName, x, y, zdepth
    CBGSETSPRITE imgName, x, y, zdepth, width, height, opacity, colorMatrix
    ```

    **Skia版拡張パラメータ**（第5引数目以降）：

    - `width`, `height`（省略可）：スプライトの描画サイズ。指定しない場合は元のサイズ。
    - `opacity`（省略可，デフォルト`255`）：不透明度。0=完全透明、255=完全不透明。
    - `colorMatrix`（省略可）：`ref int[]`型。4×5カラーマトリクス（20要素）。

### ![](../assets/images/IconSK.webp)`GCREATEFROMFILE`の`isRelative`パラメータ
!!! summary ""

    GCREATEFROMFILEに省略可能な第三引数を追加。`1`に設定すると、`filePath`をプログラムディレクトリではなく現在の作業ディレクトリからの相対パスとして解釈する。絶対パスが指定された場合、このパラメータは無視される。

!!! info "API"

    ``` { #language-erbapi }
    int GCREATEFROMFILE gID, filePath{, isRelative}
    ```

!!! warning "注意"

    EM+EEのGCREATEFROMFILEにも第三引数が存在するが、意味が異なる。EM+EEでは「Emueraからの相対パス」を意味し、Skia版では「現在の作業ディレクトリからの相対パス」を意味する。

### ![](../assets/images/IconSK.webp)`SPRITECREATE`のオフセット・ターゲットサイズパラメータ
!!! summary ""

    SPRITECREATEに4つの拡張パラメータを追加。スプライトの描画オフセットとターゲットサイズ（拡大・縮小）を指定可能に。

!!! info "API"

    ``` { #language-erbapi }
    int SPRITECREATE spriteName, gID
    int SPRITECREATE spriteName, gID, x, y, width, height
    int SPRITECREATE spriteName, gID, x, y, width, height, posX, posY
    int SPRITECREATE spriteName, gID, x, y, width, height, posX, posY, destWidth, destHeight
    ```

    **Skia版拡張パラメータ**（第7引数目以降）：

    - `posX`, `posY`（省略可，デフォルト`0`）：スプライトの描画オフセット。
    - `destWidth`, `destHeight`（省略可，デフォルトはソース矩形と同じサイズ）：スプライトの描画先サイズ。負の値は絶対値として処理される。

### ![](../assets/images/IconSK.webp)`SETBGIMAGE` パラメータ解析の修正
!!! summary ""

    `resourceName` パラメータの解析方式を `FORM_STR_ANY` から型付き文字列式に変更。変数引数がリテラル文字列として扱われるバグを修正。詳細は[BACKGROUND](../Reference/BACKGROUND.md)を参照。

### ![](../assets/images/IconSK.webp)`HTML_PRINT`の`display`属性（DotNet同期）
!!! summary ""

    `<img>`タグに`display`属性を追加。`<div>`タグの`display`属性を拡張。

    - `<img display="relative">`（デフォルト）：相対位置
    - `<img display="absolute-lefttop">`：左上角絶対位置
    - `<img display="absolute-leftbottom">`：左下角絶対位置
    - `<img xpos="N">`：絶対位置指定時のX座標
    - `<div display="absolute-lefttop">` / `<div display="absolute-leftbottom">`：拡張対応

### ![](../assets/images/IconSK.webp)`FONTSTYLE`の下線・取り消し線（DotNet同期）
!!! summary ""

    `FONTSTYLE`指令のビットマスクに下線と取り消し線を追加。

    - Underline = `8`：下線
    - Strikeout = `4`：取り消し線

### ![](../assets/images/IconSK.webp)`HTML_PRINT`の`<font>`タグ`size`属性
!!! summary ""

    `<font>`タグに`size`属性を追加し、フォントサイズ（ピクセル単位）の指定をサポート。

    - `size='24'` または `size='24px'`：ピクセル単位でフォントサイズを指定
    - 入れ子の`<font>`タグで外側のフォントサイズ設定を継承
    - 詳細は[HTML_PRINT](../Emuera/HTML_PRINT.md#font)を参照

!!! example "例"

    ``` { #language-erb }
    FONTSTYLE 8
    PRINTL このテキストには下線が引かれます
    FONTSTYLE 4
    PRINTL このテキストには取り消し線が引かれます
    FONTSTYLE 12
    PRINTL 下線+取り消し線
    ```

### ![](../assets/images/IconSK.webp)画像反転ロジック（DotNet同期）
!!! summary ""

    `SPRITECREATE`等で`destRect.Width`/`Height`に負値を指定すると自動的に画像が反転される。

    - 水平反転：`Width`に負値
    - 垂直反転：`Height`に負値
    - `canvas.Scale(sx, sy)` で実装、`SKColorFilter`付き反転レンダリングも対応

### ![](../assets/images/IconSK.webp)`EXISTVAR`の拡張
!!! summary ""

    `EXISTVAR`に第二引数を追加。第二引数が非0の場合、変数名の存在に加えてストレージセルの存在も確認する。

### ![](../assets/images/IconSK.webp)`INITRAND`/`DUMPRAND`の新乱数アルゴリズムとの分離
!!! summary ""

    `UseNewRandom`のチェックを削除し、`INITRAND`/`DUMPRAND`が常にMTRandomの状態を操作するように変更。

    - 原版では `UseNewRandom=true` の場合、`INITRAND`/`DUMPRAND` は警告を出力してスキップ
    - Skia版では直接 `InitRanddata()`/`DumpRanddata()` を呼び出し、`GetNextRand` に影響しない
    - 旧スクリプトの `DUMPRAND`/`RANDOMIZE`/`INITRAND` を用いたセーブハックが引き続き利用可能

### ![](../assets/images/IconSK.webp)`SETANIMETIMER`の命令化・`GETANIMETIMER`の追加
!!! summary ""

    EM+EEでは`SETANIMETIMER`は式中関数（`FunctionMethod`）として実装され、常に`1`を返す仕様でした。Skia版では命令（`AInstruction`）に再実装し、戻り値を持たない純粋な命令に変更しました。また、現在のタイマー値を取得する`GETANIMETIMER`式中関数を新規追加しました。

!!! info "API"

    ``` { #language-erbapi }
    SETANIMETIMER time
    int GETANIMETIMER
    ```

    | 項目 | EM+EE | Skia版 |
    |:---|:---|:---|
    | `SETANIMETIMER` | 式中関数（戻り値: 常に`1`） | 命令（戻り値なし） |
    | `GETANIMETIMER` | ❌ 存在しない | ✅ 式中関数（現在のタイマー値を返す） |

!!! warning "注意"

    EM+EEでは`SETANIMETIMER`を式中関数として呼び出すことができましたが、Skia版では命令のみ対応です。EM+EEのERBで`RESULT = SETANIMETIMER(100)`のような使い方をしている場合、Skia版ではコンパイルエラーになります。

### ![](../assets/images/Iconetc.webp)`BITMAP_CACHE_ENABLE`の命令化
!!! summary ""

    EM+EEでは`BITMAP_CACHE_ENABLE`は式中関数（`FunctionMethod`）として実装されていました。Skia版では命令（`AInstruction`）に再実装し、戻り値を持たない純粋な命令に変更しました。機能自体に変更はありません。

!!! info "API"

    ``` { #language-erbapi }
    BITMAP_CACHE_ENABLE flag
    ```

    | 項目 | EM+EE | Skia版 |
    |:---|:---|:---|
    | `BITMAP_CACHE_ENABLE` | 式中関数（戻り値あり） | 命令（戻り値なし） |

!!! warning "注意"

    EM+EEでは`BITMAP_CACHE_ENABLE`を式中関数として呼び出すことができましたが、Skia版では命令のみ対応です。

### ![](../assets/images/Icondotnet.webp)`SQL_CONNECTION_OPEN`のセキュリティ強化
!!! summary ""

    DotNet版で追加された便利関数`SQL_CONNECTION_OPEN`をSkia版に移植しましたが、DotNet版のパストラバーサル脆弱性とPRAGMA設定の問題を修正しています。

!!! info "API"

    ``` { #language-erbapi }
    SQL_CONNECTION_OPEN name
    ```

    | 項目 | DotNet版 | Skia版 |
    |:---|:---|:---|
    | PRAGMA設定 | `journal_mode = OFF; synchronous = OFF` | `journal_mode = WAL; synchronous = NORMAL` |
    | クラッシュ安全性 | ❌ データベース破損リスクあり | ✅ クラッシュ時もデータベース安全 |
    | `name`パス検証 | ❌ なし（パストラバーサル脆弱性） | ✅ 不正文字・`..`を検証 |
    | DB保存先 | `sav/temp_db/` | `sav/sql/` |

!!! warning "注意"

    `name`パラメータには不正文字と`..`の検証が行われる。ERBスクリプトが`sav/sql/`ディレクトリを突破することを防止する。DotNet版のERBで`SQL_CONNECTION_OPEN "../../etc/exploit"`のような呼び出しが可能だったが、Skia版では`CodeEE`が投げられる。

---

## 新規命令・式中関数 { #new-commands }

### ![](../assets/images/IconSK.webp)`SETIMAGELAYER`系 — 独立画像レイヤー
!!! summary ""

    CBG/SETBGIMAGEとは独立した画像レイヤーシステム。depth順の描画、透明度、カラーマトリクス、スクロール追従をサポート。

!!! info "API"

    ``` { #language-erbapi }
    SETIMAGELAYER spriteName, depth, x, y, width, height{, opacity, CM_ARRAY, followScroll}
    CLEARIMAGELAYER depth
    CLEARIMAGELAYER_ALL
    int EXISTSIMAGELAYER(depth)
    ```

    - `depth`：レイヤーの深度。小さいほど手前に描画
    - `opacity`（省略可，デフォルト`255`）：不透明度
    - `CM_ARRAY`（省略可）：`ref int[]`型。4×5カラーマトリクス（20要素）
    - `followScroll`（省略可，デフォルト`0`）：`1`でテキストスクロールに追従

!!! example "例"

    ``` { #language-erb }
    ; レイヤーを設定
    SETIMAGELAYER "bg_sprite", 0, 100, 200, 300, 400, 200, CM, 1
    ; レイヤーの存在確認
    IF EXISTSIMAGELAYER(0)
        CLEARIMAGELAYER 0
    ENDIF
    ; 全レイヤーをクリア
    CLEARIMAGELAYER_ALL
    ```

!!! warning "注意"

    SETIMAGELAYERはSkia版でのみ利用可能。CBG系とは完全に独立したレイヤーシステム。

### ![](../assets/images/IconSK.webp)`CALLSTR`系 — 動的関数呼び出し
!!! summary ""

    文字列変数に格納された関数名を呼び出す。関数名を動的に切り替えることが可能。呼び出した関数で`RETURN`が実行された場合は`RESULT`にその引数が、終端に達した場合は`RESULT`に`0`が入る（`CALL`と同じ）。

!!! info "API"

    ``` { #language-erbapi }
    CALLSTR stringVariable
    JUMPSTR stringVariable
    TRYCALLSTR stringVariable
    TRYJUMPSTR stringVariable
    TRYCCALLSTR stringVariable
    TRYCJUMPSTR stringVariable
    ```

!!! example "例"

    ``` { #language-erb }
    #DIMS funcName = "MY_EVENT"
    CALLSTR funcName
    ; 存在チェック付き
    TRYCALLSTR funcName
    ```

### ![](../assets/images/IconSK.webp)`EVAL` / `EVALS` — 文字列式評価
!!! summary ""

    文字列として渡されたERB式を評価し、結果を返す。

!!! info "API"

    ``` { #language-erbapi }
    int EVAL(string{, int})
    string EVALS(string{, string})
    ```

!!! example "例"

    ``` { #language-erb }
    PRINTVL EVAL("1 + 2 * 3")  ; → 7
    PRINTS EVALS("TOSTR(100)")  ; → "100"
    ```

### ![](../assets/images/IconSK.webp)`BITARRAY`系 — ビット配列操作
!!! summary ""

    整数配列をビット配列として操作する関数群。フラグ管理に最適。

!!! info "API"

    ``` { #language-erbapi }
    int BITSET(ref int[], bitIndex{, value, elementSize})
    int BITGET(ref int[], bitIndex)
    int BITTOGGLE(ref int[], bitIndex)
    int BITINDEXOFFIRST(ref int[]{, findSet})
    ```

!!! example "例"

    ``` { #language-erb }
    #DIM flags, 10
    BITSET flags, 5       ; ビット5をセット
    PRINTVL BITGET(flags, 5)  ; → 1
    BITTOGGLE flags, 5    ; ビット5を反転
    ```

### ![](../assets/images/IconSK.webp)MAP拡張関数（6個追加）
!!! summary ""

    EM+EEのMAP関数（12個）を拡張し、計18個のMAP操作関数を提供。

!!! info "API"

    ``` { #language-erbapi }
    string MAP_VALUES(mapName)
    string MAP_TOSTRING(mapName{, pairSep, kvSep})
    int MAP_FROMSTRING(mapName, str{, pairSep, kvSep})
    int MAP_MERGE(destMapName, srcMapName)
    int MAP_REMOVEIF(mapName, operator, value)
    string MAP_FINDKEY(mapName, operator, value)
    ```

!!! example "例"

    ``` { #language-erb }
    MAP_CREATE "myMap"
    MAP_SET "myMap", "key1", "value1"
    MAP_SET "myMap", "key2", "value2"
    PRINTS MAP_VALUES("myMap")      ; → "value1,value2"
    PRINTS MAP_TOSTRING("myMap")    ; → "key1=value1,key2=value2"
    MAP_MERGE "myMap", "otherMap"
    ```

### ![](../assets/images/IconSK.webp)数学関数拡張（三角関数・端数処理）
!!! summary ""

    EM+EEの数学関数に三角関数と端数処理関数を追加。Int版とFloat版の同名オーバーロードを提供。

!!! info "API"

    ``` { #language-erbapi }
    float SIN(float) / int SIN(int)
    float COS(float) / int COS(int)
    float TAN(float) / int TAN(int)
    float ASIN(float) / int ASIN(int)
    float ACOS(float) / int ACOS(int)
    float ATAN(float) / int ATAN(int)
    int FLOOR(float) / float FLOOR(float)
    int CEIL(float) / float CEIL(float)
    int ROUND(float) / float ROUND(float)
    ```

### ![](../assets/images/IconSK.webp)`HTML_PRINTC` / `HTML_PRINTLC` — 右寄せ/左寄せHTML出力
!!! summary ""

    HTML文字列を右寄せまたは左寄せで出力する。非等幅フォントでもピクセル精度で整列可能。

!!! info "API"

    ``` { #language-erbapi }
    HTML_PRINTC htmlString {, cellWidth}
    HTML_PRINTLC htmlString {, cellWidth}
    ```

### ![](../assets/images/IconSK.webp)`SPRITECREATEFROMFILE` — ファイルからスプライト作成
!!! summary ""

    画像ファイルから直接スプライトを作成。Graphicsバッファ（GCREATE）を経由せずにスプライトを生成できる。

!!! info "API"

    ``` { #language-erbapi }
    int SPRITECREATEFROMFILE spriteName, filePath{, x, y, width, height}
    ```

### ![](../assets/images/Icondotnet.webp)`G_POLYGON`系 — 多角形描画
!!! summary ""

    DotNet版からの移植。多角形の描画・塗りつぶしを行う。SkiaSharpモードでのみ利用可能（GDIモードではCodeEE）。

!!! info "API"

    ``` { #language-erbapi }
    G_POLYGON_DRAW gID
    G_POLYGON_FILL gID
    G_POLYGON_POINT_ADD gID, x, y
    G_POLYGON_POINT_CLEAR gID
    ```

### ![](../assets/images/IconSK.webp)`TEXT_BGC_ON` / `TEXT_BGC_OFF` — テキスト背景色制御
!!! summary ""

    テキスト背景色の表示・非表示を制御。

!!! info "API"

    ``` { #language-erbapi }
    TEXT_BGC_ON
    TEXT_BGC_OFF
    ```

### ![](../assets/images/IconSK.webp)SQL パラメータ化クエリ
!!! summary ""

    SQL インジェクション防止のためのパラメータ化クエリ。

!!! info "API"

    ``` { #language-erbapi }
    string SQL_ESCAPE(str)
    SQL_P_EXECUTE_NONQUERY query, arg0, arg1, ...
    SQL_P_EXECUTE_READER query, arg0, arg1, ...
    long SQL_P_EXECUTE_SCALAR_LONG query, arg0, arg1, ...
    string SQL_P_EXECUTE_SCALAR_STRING query, arg0, arg1, ...
    float SQL_P_EXECUTE_SCALAR_FLOAT query, arg0, arg1, ...
    ```

    - `@0`, `@1`, ... プレースホルダによる安全なクエリ実行

### ![](../assets/images/IconSK.webp)`STRICT_FONT_FALLBACK` — 厳格フォントフォールバック
!!! summary ""

    厳格フォントフォールバックモードを有効にする。

---

## DotNet 同期機能 { #dotnet-sync }

### ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)GETCSVNOBY* 名前逆査
!!! summary ""

    NAME/NICKNAME/CALLNAME/MASTERNAMEからキャラクター番号を逆査。O(1)検索、未検出時は`-1`を返す。

!!! info "API"

    ``` { #language-erbapi }
    int GETCSVNOBYNAME(str)
    int GETCSVNOBYNICKNAME(str)
    int GETCSVNOBYCALLNAME(str)
    int GETCSVNOBYMASTERNAME(str)
    ```

### ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)`MATCHALL` / `MATCHALLEX` 全量検索
!!! summary ""

    配列の全量検索。DotNet版の指令形式から式中関数に再設計。RESULTを汚染しない。

!!! info "API"

    ``` { #language-erbapi }
    int MATCHALL(var, value{, beg, end{, outArr}})
    int MATCHALLEX("varName", value{, beg, end{, outArr}})
    ```

    - 戻り値：マッチ数
    - `outArr`（省略可）：マッチしたインデックスを格納する配列（0始まり）

### ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)Preload バイトレベルキャッシュ
!!! summary ""

    起動時にERB/CSVファイルをメモリにプリロード。`EraStreamReader.OpenOnCache()`でキャッシュから読み取り、ディスクIOを回避。

### ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)Stopwatch 高精度計時
!!! summary ""

    `SpriteAnime`/`SpriteAnimated`のアニメーションフレーム計時を`DateTime.Now`から`Stopwatch.GetTimestamp()`に移行。システム時計精度制限（~15ms）を排除し、アニメーションフレームレートの安定性を向上。

---

## 安定性修正 { #stability-fixes }

| 修正 | 説明 |
|:---|:---|
| TOINT 境界フォールバック | [TOINT 拡張](#variables)のFloat引数受け入れ時の保護的フォールバック：不正入力はクラッシュせず0を返す |
| METHOD_Instruction Float ブランチ | [Float型](#variables)の整合修正：原版はInteger/StringのみでFloat関数を命令呼び出し時の結果が消失；Skia版はFloat→RESULTF分岐を追加 |
| MainWindow null チェック | エンジン未初期化時の操作でクラッシュしない |
| PrintStringBuffer 空チェック | 空出力行で範囲外アクセスしない |
| SKPaint using リソース解放 | 漏れていた`using var`を補完 |
| ColorMatrix GDI+→SkiaSharp修正 | 列優先→行優先レイアウト、平移分量\*255f |
| OpenGL コンテキスト喪失クラッシュ | 双グラボ/仮想マシン環境で自動降格 |
| DIV ボタンヒットテストフォールバック | [DIV レンダリング最適化](#skia-sharp)の境界保護：O(1)定位は等高行を前提とし、複数行でインデックスマッピングが崩れた場合、線形走査へフォールバックしてクリック可用性を確保 |
| SQL_CONNECTION_OPEN 安全修正 | [セキュリティ強化](#changed-commands)の安定性次元：パストラバーサル阻断・接続漏洩修正・PRAGMA OFF→WALによるクラッシュ破損防止 |
| opDictionary 演算子逆引き修正 | 上流 emuera.em の `opDictionary` コレクション初期化子で `/`, `%`, `==` の3エントリが欠落。`ToOperatorString()` が空文字列を返しエラーメッセージが不完全に；演算子自体の計算には影響なし |

---

## 機能比較 { #feature-comparison }

| 機能 | EM+EE | Skia版 | 備考 |
|:---|:---:|:---:|:---|
| レンダリング | GDI+ | SkiaSharp | クロスプラットフォーム対応 |
| 浮動小数点 | ❌ | ✅ Float型 | RESULTF/LOCALF/ARGF |
| 動的関数呼び出し | ❌ | ✅ CALLSTR系 | 文字列変数で関数名指定 |
| 文字列式評価 | ❌ | ✅ EVAL/EVALS | 実行時式評価 |
| ビット配列 | ❌ | ✅ BITARRAY系 | フラグ管理に最適 |
| MAP関数 | 12個 | 18個 | 6個追加 |
| SQL | 基本 | XML連携+パラメータ化 | インポート/エクスポート/安全クエリ |
| 数学関数 | 基本 | 三角関数+端数処理 | SIN/COS/TAN等 |
| 右寄せ/左寄せHTML出力 | ❌ | ✅ HTML_PRINTC/LC | |
| ファイル→スプライト | ❌ | ✅ SPRITECREATEFROMFILE | GCREATE不要 |
| 画像レイヤー | CBGのみ | ✅ SETIMAGELAYER系 | depth/透明度/カラーマトリクス |
| レンダリング制御 | ❌ | ✅ ANIMETIMER/TEXT_DRAWING_MODE/SKIA_QUALITY | |
| 多角形描画 | ❌ | ✅ G_POLYGON系 | DotNet版から移植・SkiaSharpモード限定 |
| 文字装飾線 | ❌ | ✅ 下線/取り消し線 | FONTSTYLE拡張 |
| テキスト背景色制御 | ❌ | ✅ TEXT_BGC_ON/OFF | |
| レンダリングバックエンド | ❌ | ✅ Auto/OpenGL/CPU | |
| 参照パラメータ | 配列のみ | ✅ 要素参照+OUT | #REF/#REFF/OUT追加 |
| CBGSETSPRITE拡張 | 基本 | ✅ 縮尺/透明度/CM | |
| SPRITECREATE拡張 | 基本 | ✅ オフセット/ターゲットサイズ | |
| 画像反転 | ❌ | ✅ 負サイズで反転 | |
| オーディオ | 再生のみ | SoundTouch | テンポ/ピッチ変更 |
| 読み込み | 全量 | 遅延対応+Preload | 大規模ゲーム向け |
| 関数引数 | 固定長 | VARIADIC ARG/ARGS/ARGF | 可変長引数 |
| SELECTCASE | 線形スキャン | ジャンプテーブル最適化 | O(n) → O(1) |
| CSV 逆査 | なし | GETCSVNOBY* 4関数 | DotNet 由来 |
| 配列全量検索 | MATCH はカウントのみ | MATCHALL/MATCHALLEX | DotNet 由来、再設計 |
| リソース管理 | なし | ✅ RM_系/LRUキャッシュ | |
| 全画面モード | ❌ | ✅ F11 | ツールバー自動表示 |
| エラー処理イベント | ❌ | ✅ BEFORE_THROW/BEFORE_ERROR | スクリプトレベルの例外インターセプト |

## 沿革と開発背景

本项目最初の目標は、CRERが長期開発停止中であったlazyloading機能変体[CRER/emuera.em](https://gitlab.com/CRER/emuera.em)においてEM+EEの更新を追従することであった。
CRER版はカーネルをEE47まで更新したと主張していたが、実際にはEE46–47両バージョンの移植が不完全であることが判明した。その理由の一つとして、EM+EEがEE46以降の複数バージョンにわたり名前空間とファイルアーキテクチャの大幅な再構築を継続し、派生版が上流の更新を追従することが極めて困難となっていたことが挙げられる。

その後、開発者はいくつかの機能最適化、バグ修正、機能追加を行った。

続いて、開発者はEM+EEリポジトリの`ee+em/VVII-SkiaSharp`ブランチのマージに着手した。両者ともSkiaSharpライブラリを使用しているが、レンダリングアーキテクチャは全く異なる——これは開発者がVVIIのコードを再利用したくないからではなく、EM+EEと本项目がそれぞれレンダリング関連の新機能を大量に導入した結果、アーキテクチャの再構築が不可避となったためである。
また付記すべき点として、SkiaのSQLシステムは完全に独立して開発された。開発者はEmuera DotNetエンジンを使用するeraMSがSQL系関数を使用しているのを見て、この関数群の開発を思い立った。開発時にはDotNetのソースコードを見つけられず、匿名掲示板の公開情報のみを検索し、MGTの独自エンジンだと誤認していた。本文書の編集時に至って、VVIIが開発したSkiaSharp変体がDotNet変体であり、そこにSQLシステムの実装が既に存在することを発見した。

SkiaXは、Skia変体のロジックをカーネルとして開発されたAndroid端末向けXamarinエンジンであり、フレームワークは[Future-R/XEmuera](https://github.com/Future-R/XEmuera)から移植された。
しかし同様に、両者のカーネルエンジンはレンダリング層において根本的な変化を遂げている——当初のXEmueraカーネルはEmuera本体のみをサポートし、その後CKRainbowとFuture-RによってEM+EEカーネルのレンダリングロジックが段階的に適応された——ため、フレームワーク、ページナビゲーション、タッチインタラクションロジックはXEmueraと一致するものの、レンダリング実装はほぼ完全に異なる。
