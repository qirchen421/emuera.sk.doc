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
| ![](../assets/images/IconSK.webp) `HTML_PRINTC` | 命令 | HTML文字列を中央寄せ出力 | [HTML_PRINTC](../Reference/HTML_PRINTC.md) |
| ![](../assets/images/IconSK.webp) `HTML_PRINTLC` | 命令 | HTML文字列を左寄せ出力（行幅計算付き） | [HTML_PRINTC](../Reference/HTML_PRINTC.md) |
| ![](../assets/images/IconSK.webp) `SPRITECREATEFROMFILE` | 式中関数 | 画像ファイルから直接スプライト作成 | [SPRITECREATEFROMFILE](../Reference/SPRITECREATEFROMFILE.md) |
| ![](../assets/images/IconSK.webp) `ANIMETIMER` | 命令/式中関数 | アニメーションフレームレートの設定/取得 | [SKIA_RENDER](../Reference/SKIA_RENDER.md) |
| ![](../assets/images/IconSK.webp) `SETRENDERQUALITY` | 命令 | レンダリング品質の設定 | [SKIA_RENDER](../Reference/SKIA_RENDER.md) |
| ![](../assets/images/IconSK.webp) `GETRENDERQUALITY` | 式中関数 | レンダリング品質の取得 | [SKIA_RENDER](../Reference/SKIA_RENDER.md) |
| ![](../assets/images/IconSK.webp) `G_POLYGON_DRAW` | 命令 | 多角形の輪郭を描画 | — |
| ![](../assets/images/IconSK.webp) `G_POLYGON_FILL` | 命令 | 多角形を塗りつぶし | — |
| ![](../assets/images/IconSK.webp) `G_POLYGON_POINT_ADD` | 命令 | 多角形の頂点を追加 | — |
| ![](../assets/images/IconSK.webp) `G_POLYGON_POINT_CLEAR` | 命令 | 多角形の全頂点をクリア | — |
| ![](../assets/images/IconSK.webp) `TEXT_BGC_ON` | 命令 | テキスト背景色表示を有効化 | — |
| ![](../assets/images/IconSK.webp) `TEXT_BGC_OFF` | 命令 | テキスト背景色表示を無効化 | — |
| ![](../assets/images/IconSK.webp) `SQL_ESCAPE` | 式中関数 | 文字列のSQLエスケープ | — |
| ![](../assets/images/IconSK.webp) `SQL_P_EXECUTE_NONQUERY` | 命令 | パラメータ化クエリ実行（非クエリ） | — |
| ![](../assets/images/IconSK.webp) `SQL_P_EXECUTE_READER` | 命令 | パラメータ化クエリ実行（リーダー） | — |
| ![](../assets/images/IconSK.webp) `SQL_P_EXECUTE_SCALAR_LONG` | 式中関数 | パラメータ化クエリ実行（スカラーlong） | — |
| ![](../assets/images/IconSK.webp) `SQL_P_EXECUTE_SCALAR_STRING` | 式中関数 | パラメータ化クエリ実行（スカラーstring） | — |
| ![](../assets/images/IconSK.webp) `SQL_P_EXECUTE_SCALAR_FLOAT` | 式中関数 | パラメータ化クエリ実行（スカラーfloat） | — |
| ![](../assets/images/IconSK.webp) `SQL_CONNECTION_OPEN` | 命令 | 便利関数：sav/sql/下にDB接続を作成 | — |
| ![](../assets/images/IconSK.webp) `RM_RESOURCECHECK_LOAD` | 式中関数 | リソースのロード状態確認 | — |
| ![](../assets/images/IconSK.webp) `RM_RELEASE_ALL` | 命令 | 全リソースを解放 | — |
| ![](../assets/images/IconSK.webp) `RM_RESOURCE_EXIST` | 式中関数 | リソースの存在確認 | — |
| ![](../assets/images/IconSK.webp) `SPRITEANIMEFRAME` | 式中関数 | アニメーションスプライトのフレーム数取得 | — |
| ![](../assets/images/IconSK.webp) `BITMAP_CACHE_ENABLE` | 命令 | ビットマップキャッシュの有効/無効 | — |
| ![](../assets/images/IconSK.webp) `STRICT_FONT_FALLBACK` | 命令 | 厳格フォントフォールバックモード | — |
| ![](../assets/images/Icondotnet.webp) `GETCSVNOBYNAME` | 式中関数 | NAMEからキャラ番号を逆査 | — |
| ![](../assets/images/Icondotnet.webp) `GETCSVNOBYNICKNAME` | 式中関数 | NICKNAMEからキャラ番号を逆査 | — |
| ![](../assets/images/Icondotnet.webp) `GETCSVNOBYCALLNAME` | 式中関数 | CALLNAMEからキャラ番号を逆査 | — |
| ![](../assets/images/Icondotnet.webp) `GETCSVNOBYMASTERNAME` | 式中関数 | MASTERNAMEからキャラ番号を逆査 | — |
| ![](../assets/images/Icondotnet.webp) `MATCHALL` | 式中関数 | 配列の全量検索（変数参照） | — |
| ![](../assets/images/Icondotnet.webp) `MATCHALLEX` | 式中関数 | 配列の全量検索（文字列変数名） | — |

---

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
    - case数が少ない場合は自動的に線形スキャンにフォールバック
    - 既存のFALLTHROUGHセマンティクスとの互換性

### ![](../assets/images/IconSK.webp)画像リソース管理再構築
!!! summary ""

    画像リソース管理を全面的に再設計。

    - **SharedBitmapCache**：グローバルビットマッププール + ConstImage軽量シェル
    - **SpriteAnime最適化**：同一ファイルの重複デコードによるメモリ爆発を修正
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

!!! warning "注意"

    Float型はSkia版でのみ利用可能。EM+EEや原版EmueraのERBスクリプトではコンパイルエラーになる。

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

### ![](../assets/images/IconSK.webp)参照パラメータ（#REF/#REFS/OUT）
!!! summary ""

    関数引数の参照渡しと出力パラメータをサポート。

!!! info "API"

    ``` { #language-erbapi }
    @FUNC_NAME(#REF X, #REFS S)
    @FUNC_NAME(#DIM OUT X, #DIMS OUT S)
    ```

    - `#REF X` / `#REFS S`：スカラー参照渡し（Dimension=0）
    - `#DIM OUT X` / `#DIMS OUT X`：省略可能な出力パラメータ
    - OUT引数省略時は書き込みが黑洞化（NullRefTerm）され、エラーにならない
    - OUT + VARIADIC の組み合わせ、ネスト呼び出し、CALLFORM/TRYCALL対応

### ![](../assets/images/IconSK.webp)SparseArray\<T> 疎配列ストレージ
!!! summary ""

    大添字配列のメモリ効率を最適化。`SparseArray<T>` で未使用インデックスのメモリを消費しない。

### ![](../assets/images/IconSK.webp)SafeArithmetic 安全演算
!!! summary ""

    オーバーフロー保護。静的オーバーフローを防止し、演算結果が型の範囲を超えないようにする。

---

## 仕様が変更された命令・式中関数 { #changed-commands }

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

### ![](../assets/images/IconSK.webp)`SETBGIMAGE`の深度・透明度パラメータ
!!! summary ""

    SETBGIMAGEに深度と透明度のパラメータを追加。

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

    文字列変数に格納された関数名を呼び出す。関数名を動的に切り替えることが可能。

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

### ![](../assets/images/IconSK.webp)`HTML_PRINTC` / `HTML_PRINTLC` — 中央寄せHTML出力
!!! summary ""

    HTML文字列を中央寄せで出力する。非等幅フォントでもピクセル精度で整列可能。

!!! info "API"

    ``` { #language-erbapi }
    HTML_PRINTC htmlString
    HTML_PRINTLC htmlString
    ```

### ![](../assets/images/IconSK.webp)`SPRITECREATEFROMFILE` — ファイルからスプライト作成
!!! summary ""

    画像ファイルから直接スプライトを作成。Graphicsバッファ（GCREATE）を経由せずにスプライトを生成できる。

!!! info "API"

    ``` { #language-erbapi }
    int SPRITECREATEFROMFILE spriteName, filePath{, x, y, width, height}
    ```

### ![](../assets/images/IconSK.webp)`G_POLYGON`系 — 多角形描画
!!! summary ""

    多角形の描画・塗りつぶしを行う。SkiaSharpモードでのみ利用可能（GDIモードではCodeEE）。

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

### ![](../assets/images/IconSK.webp)`SQL_CONNECTION_OPEN` — 便利DB接続関数
!!! summary ""

    `sav/sql/` ディレクトリ下にSQLiteデータベース接続を自動作成。同名接続が存在する場合は自動的に閉じて再構築する。

!!! info "API"

    ``` { #language-erbapi }
    SQL_CONNECTION_OPEN name
    ```

!!! warning "注意"

    `name`パラメータには不正文字と`..`の検証が行われる。ERBスクリプトが`sav/sql/`ディレクトリを突破することを防止する。

### ![](../assets/images/IconSK.webp)リソース管理システム
!!! summary ""

    画像リソースのLRUキャッシュ管理。

!!! info "API"

    ``` { #language-erbapi }
    int RM_RESOURCECHECK_LOAD(resourceName)
    RM_RELEASE_ALL
    int RM_RESOURCE_EXIST(resourceName)
    ```

### ![](../assets/images/IconSK.webp)`SPRITEANIMEFRAME` — アニメーションフレーム数取得
!!! summary ""

    アニメーションスプライトのフレーム数を取得する。

!!! info "API"

    ``` { #language-erbapi }
    int SPRITEANIMEFRAME spriteName
    ```

### ![](../assets/images/IconSK.webp)`BITMAP_CACHE_ENABLE` — ビットマップキャッシュ制御
!!! summary ""

    ビットマップキャッシュの有効/無効を切り替える。

!!! info "API"

    ``` { #language-erbapi }
    BITMAP_CACHE_ENABLE flag
    ```

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

    配列の全量検索。DotNet版の指令形式から式関数に再設計。RESULTを汚染しない。

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
| TOINT 境界修正 | 不正な入力は0を返し、クラッシュしない |
| METHOD_Instruction Float ブランチ | Float関数を命令として使用した場合、RESULTFに書き込む |
| MainWindow null チェック | エンジン未初期化時の操作でクラッシュしない |
| PrintStringBuffer 空チェック | 空出力行で範囲外アクセスしない |
| SKPaint using リソース解放 | 漏れていた`using var`を補完 |
| ColorMatrix GDI+→SkiaSharp修正 | 列優先→行優先レイアウト、平移分量\*255f |
| OpenGL コンテキスト喪失クラッシュ | 双グラボ/仮想マシン環境で自動降格 |

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
| 中央寄せHTML出力 | ❌ | ✅ HTML_PRINTC/LC | |
| ファイル→スプライト | ❌ | ✅ SPRITECREATEFROMFILE | GCREATE不要 |
| 画像レイヤー | CBGのみ | ✅ SETIMAGELAYER系 | depth/透明度/カラーマトリクス |
| レンダリング制御 | ❌ | ✅ ANIMETIMER/QUALITY | |
| 多角形描画 | ❌ | ✅ G_POLYGON系 | SkiaSharpモード限定 |
| 文字装飾線 | ❌ | ✅ 下線/取り消し線 | FONTSTYLE拡張 |
| テキスト背景色制御 | ❌ | ✅ TEXT_BGC_ON/OFF | |
| レンダリングバックエンド | ❌ | ✅ Auto/OpenGL/CPU | |
| 参照パラメータ | ❌ | ✅ #REF/#REFS/OUT | |
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
