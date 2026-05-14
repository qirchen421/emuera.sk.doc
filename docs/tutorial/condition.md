# 条件分岐

!!! info "本節対応マニュアル"

    - **Reference 分類**: [ループ・分岐構文](../Reference/README.md#flow-control)
    - [IF / SIF](../Reference/IF.md) — IF/ELSEIF/ELSE/ENDIF と SIF のAPIリファレンス
    - [SELECTCASE](../Reference/SELECTCASE.md) — SELECTCASE のAPIリファレンス

---

## 概要

ERABASICは3種類の条件分岐構造を提供します：

| 構造 | 適用場面 | 特徴 |
|------|---------|------|
| `IF` ~ `ENDIF` | 複数行の条件ブロック | クラシックな多分岐構造 |
| `SIF` | 1行条件 | 次の1行のみ実行を制御 |
| `SELECTCASE` | 値による分岐 | switchに似た、1つの値で複数のケースにマッチ |

!!! note "eramaker互換性"
    `IF`/`ELSEIF`/`ELSE`/`ENDIF` と `SIF` はeramakerから存在する機能です。`SELECTCASE` はEmueraの拡張機能です。

---

## IF ~ ENDIF

### 基本的な使い方

```erb
IF A > 0
    PRINTL Aは正の数
ENDIF
```

`IF` の条件は**整数式**です：`0` は偽、`0` 以外は真として扱われます。

### IF ~ ELSE

```erb
IF A > 0
    PRINTL Aは正の数
ELSE
    PRINTL Aは正の数ではない
ENDIF
```

### IF ~ ELSEIF ~ ELSE

```erb
IF A > 0
    PRINTL 正の数
ELSEIF A == 0
    PRINTL ゼロ
ELSE
    PRINTL 負の数
ENDIF
```

複数の `ELSEIF` を持てますが、`ELSE` は1つだけ（最後に配置）。`IF` と `ENDIF` はペアで必要です。

### 条件式

`IF` の条件は整数式であり、ブール型ではありません。以下の書き方はすべて有効です：

```erb
IF A                  ; A != 0 のとき真
IF A > 0              ; 比較演算
IF A > 0 && B > 0     ; 論理積
IF A > 0 || B > 0     ; 論理和
IF !A                 ; 論理否定（A == 0 のとき真）
IF STR == "hello"     ; 文字列比較
IF STR != ""          ; 文字列の空チェック
```

!!! warning "ブール型は存在しない"

    ERABASICにはブール型がありません。比較演算子（`==`、`!=`、`>`、`<` 等）は整数 `1`（真）または `0`（偽）を返します。

---

## SIF — 1行条件

`SIF` はERABASIC特有の簡略記法で、**直後の1行のみ**実行を制御します：

```erb
SIF A > 0
    PRINTL Aは正の数

; 以下と等価：
IF A > 0
    PRINTL Aは正の数
ENDIF
```

### SIF のルール

1. **1行のみ制御**：`SIF` は直後の1行にのみ影響し、その次の行には影響しない
2. **ネスト不可**：`SIF` の後に `SIF` を続けることはできない
3. **ブロック構造の後に不可**：`SIF` の後に `IF`、`REPEAT`、`FOR`、`WHILE` などのブロック構造の開始行を続けることはできない

```erb
; ✅ 正しい：SIF は1行を制御
SIF MONEY >= 100
    PRINTL 購入可能

; ❌ 間違い：SIF はブロック構造を制御できない
SIF MONEY >= 100
    IF STOCK > 0          ; コンパイルエラー！
        PRINTL 購入成功
    ENDIF

; ✅ 正しい：IF を使用
IF MONEY >= 100 && STOCK > 0
    PRINTL 購入成功
ENDIF
```

### SIF のよくあるパターン

```erb
; 特定の反復をスキップ
SIF COUNT == 2
    CONTINUE

; 条件付き出力
SIF HP <= 0
    PRINTL 倒れた

; 条件付き代入
SIF FLAG == 0
    FLAG = 1
```

---

## SELECTCASE — 値による分岐

`SELECTCASE` は他の言語の `switch` に似て、1つの値で複数のケースにマッチさせます：

### 基本的な使い方

```erb
SELECTCASE DAY
    CASE 1
        PRINTL 月曜日
    CASE 2
        PRINTL 火曜日
    CASE 3
        PRINTL 水曜日
    CASEELSE
        PRINTL その他
ENDSELECT
```

### CASE の3つの条件フォーマット

| フォーマット | 意味 | 例 |
|------|------|------|
| 直接値 | 完全一致 | `CASE 1` |
| `IS 演算子 式` | 条件マッチ | `CASE IS <= 30` |
| `式 TO 式` | 範囲マッチ | `CASE 10 TO 20` |

```erb
SELECTCASE SCORE
    CASE 90 TO 100
        PRINTL 優秀
    CASE IS >= 80
        PRINTL 良好
    CASE IS >= 60
        PRINTL 合格
    CASEELSE
        PRINTL 不合格
ENDSELECT
```

### 複数条件の組み合わせ

1つの `CASE` にカンマで区切って複数の条件を指定できます：

```erb
SELECTCASE MONTH
    CASE 3 TO 5
        PRINTL 春
    CASE 6 TO 8
        PRINTL 夏
    CASE 9 TO 11
        PRINTL 秋
    CASE 12, 1, 2
        PRINTL 冬
ENDSELECT
```

異なるフォーマットを混用することも可能です：

```erb
CASE 1, 3, 5, 10 TO 20, IS >= 100
; マッチ：1、3、5、10~20、100以上
```

### 文字列マッチ

`SELECTCASE` は文字列もサポートします：

```erb
SELECTCASE WEATHER
    CASE "晴"
        PRINTL 晴天です
    CASE "雨"
        PRINTL 雨が降っています
    CASEELSE
        PRINTL その他の天気
ENDSELECT
```

### SELECTCASE の注意事項

1. **フォールスルーなし**：C の `switch` と異なり、1つの `CASE` にマッチしても次の `CASE` に進まない
2. **BREAK で抜けられない**：`BREAK` は `SELECTCASE` 内で無効。抜けるには `GOTO` を使用
3. **短絡評価**：`CASE` 内の複数条件は左から右にチェックされ、マッチした時点で停止
4. **TO の範囲**：`A TO B` は `A <= B` である必要がある。そうでないとマッチしない
5. **IS 構文**：`IS 演算子 式` の形式でなければならない。`30 < IS` とは書けない

!!! tip "Skia 拡張：ジャンプテーブル最適化"

    `SELECTCASE` のすべての `CASE` 条件が**直接定数値**（`TO` / `IS` を使用せず、変数でもない）の場合、Skia はコンパイル時に自動的に**ジャンプテーブル**を構築し、ランタイム検索を **O(n) 線形スキャン**から **O(1) ハッシュ検索**に最適化します。`TO` / `IS` 式や非定数値が含まれる場合は自動的に線形スキャンにフォールバックします。

---

## 3種類の分岐構造の選択

| 場面 | 推奨 | 理由 |
|------|------|------|
| 2つのケースのいずれか | `IF` ~ `ELSE` | 簡潔で直感的 |
| 複数の条件判定 | `IF` ~ `ELSEIF` | 各分岐の条件が独立 |
| 1つの値で複数ケースにマッチ | `SELECTCASE` | より明確、変数名の重複を避けられる |
| 1行のみ制御 | `SIF` | 簡潔だが、制限に注意 |

```erb
; 場面：レベルに応じて評価を出力
; SELECTCASE が適している——すべて LEVEL の値に対するマッチング
SELECTCASE LEVEL
    CASE IS >= 90
        PRINTL S級
    CASE IS >= 70
        PRINTL A級
    CASE IS >= 50
        PRINTL B級
    CASEELSE
        PRINTL C級
ENDSELECT

; 場面：複数の独立した条件
; IF が適している——条件間に共通の変数がない
IF HP <= 0
    PRINTL 倒れた
ELSEIF MP < 10
    PRINTL 魔力不足
ELSEIF HUNGER > 80
    PRINTL 空腹
ENDIF
```

---

## よくある落とし穴

| 落とし穴 | 間違い | 正しい | 理由 |
|------|---------|---------|------|
| ENDIF の忘れ | `IF A > 0` ... | `IF A > 0` ... `ENDIF` | IF にはペアとなる ENDIF が必要 |
| SIF で複数行を制御 | `SIF A > 0` の後に複数行 | `IF` を使用 | SIF は次の1行のみ制御 |
| SIF のネスト | `SIF` の後に `SIF` | `IF` を使用 | SIF はネスト不可 |
| SELECTCASE で BREAK | `CASE 1: BREAK` | 不要 | SELECTCASE はフォールスルーしない、BREAK 不要 |
| IS 構文エラー | `CASE 30 < IS` | `CASE IS < 30` | IS は演算子の左に配置必須 |
| TO の範囲が逆 | `CASE 20 TO 10` | `CASE 10 TO 20` | 左値は右値以下である必要がある |

---

## 次のステップ

| 知りたいこと | 進むべきページ |
|:---|:---|
| ループ構造 | [ループ](loop.md) |
| ジャンプとラベル | [ジャンプ](jump.md) |
| 代入文 | [代入文](assignment.md) |
| IF 完全API | [IF / SIF](../Reference/IF.md) |
| SELECTCASE 完全API | [SELECTCASE](../Reference/SELECTCASE.md) |
