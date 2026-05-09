---
---

# Skia機能概要

!!! info "このページについて"

    このページは **Emuera Skia (Skia版)** の、バグ修正を除く全量の新機能をまとめています。
    Skia版は EmueraEM+EE をベースに、遅延読み込み・MAP拡張などの独自機能を追加した派生版です。

---

## 凡例 { #legend }

- ![](../assets/images/IconSK.webp) - Skia（Skia版）で追加、変更、拡張された機能
- ![](../assets/images/IconEM.webp) - EM(EvilMask版)で追加された機能
- ![](../assets/images/IconEE.webp) - EE(Enter's Edition)で追加された機能

---

## 目次 { #toc }

- [凡例](#legend)
- [目次](#toc)
- [遅延読み込み機構](#lazy-loading)
- [MAP拡張関数（9個追加）](#map-extended)
- [SQL拡張（XML インポート/エクスポート）](#sql-extended)
- [オーディオ処理 (SoundTouch)](#audio-soundtouch)
- [VARIADIC 可変長引数](#variadic)
- [SELECTCASE コンパイル時ジャンプテーブル最適化](#selectcase-optimization)
- [DotNet 同期機能](#dotnet-sync)
- [機能比較](#feature-comparison)

---

## ![](../assets/images/IconSK.webp)遅延読み込み機構 { #lazy-loading }

!!! summary ""

    ERBファイルを関数呼び出し時に動的にロードする仕組み。起動時の全量読み込みを回避し、必要な関数のみをオンデマンドで読み込む。

    - 関数→ファイルのマッピングテーブルを構築
    - `CALL`時に未ロードの関数があれば該当ERBファイルをロード
    - 大規模ゲームの起動時間を大幅に短縮

---

## ![](../assets/images/IconEM.webp)![](../assets/images/IconSK.webp)MAP拡張関数（9個追加） { #map-extended }

!!! summary ""

    EM+EEのMAP関数（12個）を拡張し、計21個のMAP操作関数を提供。

    **追加された関数**：

    | 関数 | 説明 |
    |:---|:---|
    | `MAP_EXISTS` | キーの存在確認 |
    | `MAP_REMOVE` | キーの削除 |
    | `MAP_COPY` | マップのコピー |
    | `MAP_MERGE` | マップのマージ |
    | `MAP_KEYRENAME` | キーのリネーム |
    | `MAP_SWAP` | 値のスワップ |
    | `MAP_SUBMAP` | ネストされたマップ操作 |
    | `MAP_FROMCSV` | CSVからのマップ生成 |
    | `MAP_TOCSV` | マップのCSV出力 |

    詳細：[MAP操作](../Reference/MAP_OPERATION.md) / [MAPシリアライズ](../Reference/MAP_SERIALIZATION.md)

---

## ![](../assets/images/IconSK.webp)SQL拡張（XML インポート/エクスポート） { #sql-extended }

!!! summary ""

    EM+EEのSQL機能にXML連携を追加。

    | 関数 | 説明 |
    |:---|:---|
    | `SQL_XMLEXPORT` | SQLクエリ結果をXML形式でエクスポート |
    | `SQL_XMLIMPORT` | XMLデータをSQLテーブルにインポート |

---

## ![](../assets/images/IconEE.webp)![](../assets/images/IconSK.webp)オーディオ処理 (SoundTouch) { #audio-soundtouch }

!!! summary ""

    EEのオーディオ機能にSoundTouchライブラリを統合し、テンポ・ピッチ変更をサポート。

    - 音声のテンポ変更（速度変更、ピッチ保持）
    - 音声のピッチ変更（音程変更、速度保持）
    - リアルタイム変換再生

---

## ![](../assets/images/IconSK.webp)VARIADIC 可変長引数 { #variadic }

!!! summary ""

    関数引数宣言で `VARIADIC ARG/ARGS/ARGF` による可変長引数をサポート。`ARGLEN()` で引数数を取得。

    ```erabasic
    @MY_FUNC(VARIADIC ARG:0)
    REPEAT ARGLEN()
        PRINTVL ARG:COUNT
    REND
    ```

---

## ![](../assets/images/IconSK.webp)SELECTCASE コンパイル時ジャンプテーブル最適化 { #selectcase-optimization }

!!! summary ""

    コンパイル時に `Dictionary<long/string/double, InstructionLine>` ジャンプテーブルを構築し、SELECTCASEのO(n)線形スキャンをO(1)ハッシュルックアップに最適化。

    - `SelectCaseJumpTable` コアクラス：コンパイル時ジャンプテーブル構築
    - 整数・文字列・浮動小数点の3種類のキータイプをサポート
    - case数が少ない場合は自動的に線形スキャンにフォールバック
    - 既存のFALLTHROUGHセマンティクスとの互換性

---

## ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)DotNet 同期機能 { #dotnet-sync }

!!! summary ""

    Emuera.NET から同期した機能。同期時に再設計または拡張された機能もあります。

    **ERB 関数**：

    | 関数 | 説明 | DotNet との差異 |
    |:---|:---|:---|
    | `GETCSVNOBYNAME` | NAME からキャラクター番号を逆引き | 差異なし |
    | `GETCSVNOBYNICKNAME` | NICKNAME からキャラクター番号を逆引き | 差異なし |
    | `GETCSVNOBYCALLNAME` | CALLNAME からキャラクター番号を逆引き | 差異なし |
    | `GETCSVNOBYMASTERNAME` | MASTERNAME からキャラクター番号を逆引き | 差異なし |
    | `MATCHALL` | 配列の全量検索（変数参照） | 式関数として再設計、RESULT を汚染しない |
    | `MATCHALLEX` | 配列の全量検索（文字列変数名） | 式関数として再設計、RESULT を汚染しない |

    **パフォーマンス最適化**：

    | 機能 | 説明 |
    |:---|:---|
    | Preload バイトレベルキャッシュ | 起動時に ERB/CSV をメモリにプリロード、`OpenOnCache()` でキャッシュから読み取り |

    **安定性修正**：

    | 修正 | 説明 |
    |:---|:---|
    | TOINT 境界修正 | 不正な入力は 0 を返し、クラッシュしない |
    | METHOD_Instruction Float ブランチ | Float 関数を命令として使用した場合、RESULTF に書き込む |
    | MainWindow null チェック | エンジン未初期化時の操作でクラッシュしない |
    | PrintStringBuffer 空チェック | 空出力行で範囲外アクセスしない |
    | SKPaint using リソース解放 | 漏れていた `using var` を補完 |

---

## 機能比較 { #feature-comparison }

| 機能 | EM+EE | Skia版 | 備考 |
|:---|:---:|:---:|:---|
| MAP関数 | 12個 | 21個 | 9個追加 |
| SQL | 基本 | XML連携追加 | インポート/エクスポート |
| オーディオ | 再生のみ | SoundTouch | テンポ/ピッチ変更 |
| 読み込み | 全量 | 遅延対応 | 大規模ゲーム向け |
| 関数引数 | 固定長 | VARIADIC ARG/ARGS/ARGF | 可変長引数 |
| SELECTCASE | 線形スキャン | ジャンプテーブル最適化 | O(n) → O(1) |
| CSV 逆引き | なし | GETCSVNOBY* 4関数 | DotNet 由来 |
| 配列全量検索 | MATCH はカウントのみ | MATCHALL/MATCHALLEX | DotNet 由来、再設計 |
| プリロードキャッシュ | なし | Preload バイトレベルキャッシュ | 起動時間短縮 |
