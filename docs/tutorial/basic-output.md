# 基本出力

!!! info "本節対応マニュアル"

    - [PRINT系](../Reference/PRINT.md) — PRINT命令の完全APIリファレンス
    - [PRINTSINGLE系](../Reference/PRINTSINGLE.md) — 単行出力命令
    - [PRINTDATA系](../Reference/PRINTDATA.md) — データ出力命令

---

## 概要

出力はERABASICプログラムとプレイヤーの基本的な対話手段です。すべての出力はPRINT系命令で行われ、統一された命名規則に従います：

```
PRINT(引数タイプ)(修飾)(動作サフィックス)
```

| 構成要素 | 選択肢 | 意味 |
|---------|------|------|
| **引数タイプ** | なし / V / S / FORM / FORMS | 引数の解析方法を決定 |
| **修飾** | K / D | K=強制かな変換、D=SETCOLORを無視 |
| **動作サフィックス** | なし / L / W / N | 改行の有無、入力待ちの有無 |

---

## 最も基本的な出力

### PRINT — 改行なし出力

```erb
PRINT こんにちは
PRINT 世界
; 出力：こんにちは世界（改行されず、2つのテキストが連結される）
```

`PRINT` の後ろのテキストは**単純文字列**です——引用符で囲む必要はなく、変数置換も行いません。

### PRINTL — 出力して改行

```erb
PRINTL こんにちは
PRINTL 世界
; 出力：
; こんにちは
; 世界
```

`PRINTL` = `PRINT` + `L`（Line）。最もよく使われる出力命令です。出力後に自動的に改行します。

### 改行のみ

```erb
PRINTL              ; 空行を出力
```

`PRINTL` に引数を指定しない場合、改行のみ出力します。

---

## 引数タイプ：5種類のPRINT派生

PRINT系命令は引数タイプによって5種類の派生があり、それぞれ引数の解析方法が異なります：

| 命令 | 引数タイプ | 引数の解析方法 | 例 |
|------|---------|------------|------|
| `PRINT` | 単純文字列 | そのまま出力、置換なし | `PRINT こんにちは` |
| `PRINTV` | 整数式 | 評価後に出力 | `PRINTV A + B` |
| `PRINTS` | 文字列式 | 評価後に出力 | `PRINTS NAME:TARGET` |
| `PRINTFORM` | フォーマット文字列 | FORM構文、補間サポート | `PRINTFORM こんにちは、{NAME}！` |
| `PRINTFORMS` | フォーマット文字列式 | 先に文字列式として評価し、その後FORMとして解析 | `PRINTFORMS @"こんにちは、{NAME}！"` |

### PRINT — 単純文字列

`PRINT` は後ろのテキストをそのまま出力し、変数置換を行いません：

```erb
PRINT こんにちは、世界          ; → こんにちは、世界
PRINT {NAME}              ; → {NAME}（波括弧はリテラル！）
PRINT %RESULTS%           ; → %RESULTS%（パーセントはリテラル！）
```

!!! warning "PRINT は変数置換を行わない"

    `PRINT` の後ろのテキストは純粋なテキストであり、`{変数}` や `%変数%` は置換されません。変数置換が必要な場合は `PRINTFORM` を使用してください。

### PRINTV — 整数式

`PRINTV` は後ろの内容を**整数式**として評価し、結果を出力します：

```erb
#DIM L_VAL = 42
PRINTV L_VAL              ; → 42
PRINTV L_VAL * 2          ; → 84
PRINTV 10 + 20            ; → 30
```

`PRINTV` はスペースやカンマで区切って複数の式を受け取り、出力時に結合します：

```erb
PRINTV L_VAL "点"         ; → 42点（整数と文字列式の結合）
```

!!! tip "PRINTV の引数は式であり、FORM文字列ではない"

    `PRINTV` は `SP_PRINTV_ArgumentBuilder` を使用し、引数を式リストとして解析します。
    整数式は数値として、文字列式はテキストとして出力されます。

### PRINTS — 文字列式

`PRINTS` は後ろの内容を**文字列式**として評価し、結果を出力します：

```erb
#DIMS L_NAME '= "エリナ"
PRINTS L_NAME             ; → エリナ
PRINTS L_NAME + "の冒険"  ; → エリナの冒険
PRINTS "Hello"            ; → Hello
```

### PRINTFORM — フォーマット文字列

`PRINTFORM` は最もよく使われるフォーマット出力命令で、FORM構文の変数置換をサポートします：

```erb
#DIM L_MONEY = 500
PRINTFORM こんにちは、{NAME:TARGET}！       ; → こんにちは、エリナ！
PRINTFORM 所持金：{L_MONEY}円            ; → 所持金：500円
PRINTFORM %NAME:TARGET%の冒険          ; → エリナの冒険
```

| FORM構文 | 機能 | 例 |
|-----------|------|------|
| `{式}` | 整数/浮動小数点の補間 | `{MONEY}` → `500` |
| `{式,幅}` | パディング付き補間 | `{MONEY,8}` → `     500` |
| `{式,幅,LEFT}` | 左詰めパディング | `{MONEY,8,LEFT}` → `500     ` |
| `%式%` | 文字列の補間 | `%NAME%` → `エリナ` |
| `%式,幅%` | パディング付き文字列補間 | `%NAME%,10%` → `    エリナ` |

> FORM構文の完全な説明は[FORM構文](form-syntax.md)を参照。

### PRINTFORMS — フォーマット文字列式

`PRINTFORMS` は引数を文字列式として評価した後、結果をFORMとして解析します：

```erb
#DIMS L_FMT '= "こんにちは、{NAME:TARGET}！"
PRINTFORMS L_FMT           ; → こんにちは、エリナ！（先に L_FMT を評価し、FORMとして解析）
PRINTFORMS @"%L_FMT%"      ; 等価な書き方
```

`PRINTFORMS` と `PRINTFORM` の違い：

| | `PRINTFORM` | `PRINTFORMS` |
|------|:---:|:---:|
| 引数 | FORM文字列（直接解析） | 文字列式（先に評価、その後FORM解析） |
| 典型的な用途 | 固定テンプレート | 動的テンプレート（実行時に構築されるFORM文字列） |

---

## 動作サフィックス：L / W / N

すべてのPRINT派生には動作サフィックスを追加でき、出力後の動作を制御します：

| サフィックス | 意味 | 例 |
|------|------|------|
| なし | 改行なし、待機なし | `PRINT こんにちは` |
| `L` | 出力後に改行 | `PRINTL こんにちは` |
| `W` | 出力後に改行し、プレイヤーのキー入力を待機 | `PRINTW こんにちは` |
| `N` | 改行なしでキー入力を待機（Emuera追加） | `PRINTN こんにちは` |

### 組み合わせ例

```erb
; PRINTFORM + L = PRINTFORML
PRINTFORML こんにちは、{NAME:TARGET}！

; PRINTS + W = PRINTSW
PRINTSW "何かキーを押してください..."

; PRINTV + L = PRINTVL
PRINTVL A + B
```

!!! tip "PRINTW と WAIT の違い"

    `PRINTW` = `PRINTL` + `WAIT`。`WAIT` 単独でもプレイヤーのキー入力を待機しますが、テキストは出力しません。

---

## 数値の出力

### PRINTVL — 整数を出力して改行

`PRINTVL` は `PRINTV` + `L` の組み合わせで、整数式の値を出力して改行します：

```erb
#DIM L_VAL = 42
PRINTVL L_VAL              ; → 42
PRINTVL L_VAL * 2 + 1      ; → 85
```

### FORM文字列内で数値を出力

`{式}` を使ってフォーマット文字列内に数値を挿入します：

```erb
#DIM L_HP = 80
#DIM L_MAXHP = 100
PRINTFORML HP：{L_HP}/{L_MAXHP}        ; → HP：80/100
PRINTFORML HP：{L_HP,5}/{L_MAXHP,5}    ; → HP：   80/  100
```

### 浮動小数点数の出力（Skia派生版）

浮動小数点数は `{}` 内でデフォルトの `ToString()` フォーマットで出力されます。精度を制御するには `TOSTRF` 関数を使用します：

```erb
#DIMF L_PI = 3.14159265
PRINTFORML 円周率：{L_PI}              ; → 円周率：3.14159265
PRINTFORML 円周率：{TOSTRF(L_PI, "F2")} ; → 円周率：3.14
```

---

## 出力色

### SETCOLOR — 文字色の設定

```erb
SETCOLOR 0xFF0000          ; 赤（RGB 16進数）
PRINTL これは赤い文字
SETCOLOR 0x00FF00          ; 緑
PRINTL これは緑の文字
SETCOLORBYNAME yellow      ; 色名で設定
PRINTL これは黄色の文字
RESETCOLOR                 ; デフォルト色に戻す
```

### PRINTD — 色設定を無視

`PRINTD` 系は `SETCOLOR` の設定を無視し、常にデフォルト色で出力します：

```erb
SETCOLOR 0xFF0000
PRINTL これは赤
PRINTDL これはデフォルト色（SETCOLORを無視）
```

---

## その他の出力命令

### DRAWLINE — 区切り線の描画

```erb
DRAWLINE                    ; 横線を描画
```

### PRINTSINGLE — 単行出力

`PRINTSINGLE` 系は常に1行内に表示し、画面端を超える文字は表示されません。自動改行され、L/Wサフィックスはありません：

```erb
PRINTSINGLEFORM 非常に長いテキスト...    ; 折り返しなし、超過部分は切り捨て
```

### PRINTDATA — データ出力

`PRINTDATA` は複数の `DATA` 項目からランダムに1つを選んで出力します：

```erb
PRINTDATA
    DATA りんご
    DATA みかん
    DATA バナナ
ENDDATA
; いずれかの果物をランダムに出力
```

### PRINTPLAIN — そのまま出力

`PRINTPLAIN` はFORM解析を行わず、文字列をそのまま出力します（`{` や `%` も含む）：

```erb
PRINTPLAIN {NAME}           ; → {NAME}（補間なし）
```

---

## PRINT系クイックリファレンス

| 命令 | 引数タイプ | 改行 | 等価な書き方 |
|------|---------|------|---------|
| `PRINT テキスト` | 単純文字列 | ❌ | — |
| `PRINTL テキスト` | 単純文字列 | ✅ | `PRINT` + 改行 |
| `PRINTW テキスト` | 単純文字列 | ✅+待機 | `PRINTL` + `WAIT` |
| `PRINTV 式` | 整数式 | ❌ | — |
| `PRINTVL 式` | 整数式 | ✅ | `PRINTV` + 改行 |
| `PRINTS 式` | 文字列式 | ❌ | — |
| `PRINTSL 式` | 文字列式 | ✅ | `PRINTS` + 改行 |
| `PRINTFORM 書式文字列` | FORM文字列 | ❌ | — |
| `PRINTFORML 書式文字列` | FORM文字列 | ✅ | `PRINTFORM` + 改行 |
| `PRINTFORMW 書式文字列` | FORM文字列 | ✅+待機 | `PRINTFORML` + `WAIT` |
| `PRINTFORMS 式` | FORM文字列式 | ❌ | — |
| `PRINTFORMSL 式` | FORM文字列式 | ✅ | `PRINTFORMS` + 改行 |

---

## よくある落とし穴

| 落とし穴 | 間違い | 正しい | 理由 |
|------|---------|---------|------|
| PRINT で変数置換を期待 | `PRINT {NAME}` | `PRINTFORM {NAME}` | PRINT はFORM補間を行わない |
| PRINTV で文字列出力 | `PRINTV "hello"` | `PRINTS "hello"` | PRINTV は整数式 |
| PRINTS に引用符なし | `PRINTS hello` | `PRINTS "hello"` | 引用符がないと変数名として扱われる |
| 改行の忘れ | `PRINT こんにちは` | `PRINTL こんにちは` | PRINT は改行しない、内容が連結される |
| FORM内の浮動小数点精度 | `PRINTFORM {PI}` | `PRINTFORM {TOSTRF(PI,"F2")}` | `{}` は浮動小数点の精度制御がない |

---

## 次のステップ

| 知りたいこと | 進むべきページ |
|:---|:---|
| FORM構文の詳細 | [FORM構文](form-syntax.md) |
| 代入文 | [代入文](assignment.md) |
| 値・型・変数 | [値・型・変数](values-types.md) |
| 入力と待機 | [INPUT命令](../Reference/INPUT.md) |
| PRINT完全API | [PRINT系](../Reference/PRINT.md) |
