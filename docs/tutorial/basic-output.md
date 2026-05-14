# 基本出力

!!! info "本節対応マニュアル"

    - **Reference 分類**: [PRINT 系](../Reference/README.md#print) / [表示操作・フォント操作](../Reference/README.md#display-font)
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

!!! note "eramaker互換性"
    `PRINT`/`PRINTL`/`PRINTW`/`PRINTV`/`PRINTVL`/`PRINTS`/`PRINTSL`/`PRINTFORM`/`PRINTFORML`/`PRINTFORMW` はeramakerから存在する機能です。`PRINTK`/`PRINTD`/`PRINTDATA`系/`PRINTSINGLE`系などはEmueraの拡張機能です。

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
| `PRINTV` | 式リスト（各引数が独立して評価） | 整数→数値、文字列→テキスト、自動結合 | `PRINTV A + B, "点"` |
| `PRINTS` | 文字列式 | 評価後に出力 | `PRINTS NAME:TARGET` |
| `PRINTFORM` | フォーマット文字列 | FORM構文、補間サポート | `PRINTFORM こんにちは、%NAME%！` |
| `PRINTFORMS` | フォーマット文字列式 | 先に文字列式として評価し、その後FORMとして解析 | `PRINTFORMS L_TEMPLATE` |

### PRINT — 単純文字列

`PRINT` は後ろのテキストをそのまま出力し、変数置換を行いません：

```erb
PRINT こんにちは、世界          ; → こんにちは、世界
PRINT %NAME%              ; → %NAME%（パーセントはリテラル！）
PRINT %RESULTS%           ; → %RESULTS%（パーセントはリテラル！）
```

!!! warning "PRINT は変数置換を行わない"

    `PRINT` の後ろのテキストは純粋なテキストであり、`{変数}` や `%変数%` は置換されません。変数置換が必要な場合は `PRINTFORM` を使用してください。

### PRINTV — 式（整数・文字列）

`PRINTV` は後ろの内容を**式**として評価し、結果を出力します。各引数は独立して評価され、**整数式は数値として、文字列式はテキストとして出力されます**：

```erb
#DIM L_VAL = 42
PRINTV L_VAL              ; → 42
PRINTV L_VAL * 2          ; → 84
PRINTV 10 + 20            ; → 30

#DIMS L_NAME = "エリナ"
PRINTV L_NAME             ; → エリナ（文字列変数）
PRINTV L_NAME + "の冒険"  ; → エリナの冒険（文字列式）
```

`PRINTV` はカンマで区切って複数の式を受け取り、出力時に結合します。各引数の型は異なっていても構いません：

```erb
PRINTV L_VAL, "点"        ; → 42点（整数 + 文字列）
PRINTV L_VAL, "点", L_NAME ; → 42点エリナ（整数 + 文字列 + 文字列変数）
```

!!! tip "PRINTV の引数は式であり、FORM文字列ではない"

    `PRINTV` は `SP_PRINTV_ArgumentBuilder` を使用し、引数を式リストとして解析します。
    各引数が独立して評価され、整数式は数値として、文字列式はテキストとして出力されます。
    そのため `PRINTV` は整数と文字列を混在させることができ、型を统一する必要はありません。

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
PRINTFORM こんにちは、%NAME:TARGET%！       ; → こんにちは、エリナ！
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

`PRINTFORMS` は引数を文字列式として評価した後、その結果文字列をFORMとして解析します——つまり、式を使って動的にFORM構文文字列を組み立てられます（HTML文字列の拼接と同様）：

```erb
; %...% の中の変数名も動的に組み立て可能
#DIMS L_VARNAME = "NAME:TARGET"
#DIMS L_TEMPLATE
L_TEMPLATE '= "こんにちは、%" + L_VARNAME + "%！"
; L_TEMPLATE の評価結果 → "こんにちは、%NAME:TARGET%！"

PRINTFORMS L_TEMPLATE      ; 先に L_TEMPLATE を評価し、結果をFORM解析 → こんにちは、エリナ！
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
| `N` | 改行なしでキー入力を待機（DotNet追加） | `PRINTN こんにちは` |

### 組み合わせ例

```erb
; PRINTFORM + L = PRINTFORML
PRINTFORML こんにちは、%NAME:TARGET%！

; PRINTS + W = PRINTSW
PRINTSW "何かキーを押してください..."

; PRINTV + L = PRINTVL
PRINTVL A + B
```

!!! tip "PRINTW と WAIT の違い"

    `PRINTW` = `PRINTL` + `WAIT`。`WAIT` 単独でもプレイヤーのキー入力を待機しますが、テキストは出力しません。

### PRINTN — 改行なしでキー入力待機

```erb
PRINTN 何かキーを押してください...
PRINTL 続きのテキスト
; キー入力前の表示：何かキーを押してください...
; キー入力後の表示：何かキーを押してください...続きのテキスト（同一行）
```

`PRINTN` = `PRINT` + `N`（No line end）。`PRINTW` とは異なります——`PRINTW` は出力後に改行してキー入力待機しますが、`PRINTN` は出力後にキー入力待機し、**行末を「未了」とマーク**するため、後続の出力が現在の行に水平結合されます。

!!! tip "PRINTN の典型的な用途"

    行内で待機が必要なシーンに適しています——段階的に展開されるテキスト演出や、プレイヤーの確認後に続きを表示するダイアログ行など。

    ```erb
    ; 間違い：PRINT + WAIT で行内待機を再現しようとする
    PRINT しばらくお待ちください...
    WAIT
    ; → WAIT 前の内容は buffer にあり不可視、キー入力後に強制改行されて表示

    ; 正しい：PRINTN で行内待機を実現
    PRINTN しばらくお待ちください...
    ; → テキストが即座に表示され、キー入力待機、後続の内容が同行に追加
    ```

> `PRINTN` は DotNet で追加された動作サフィックスで、emuera.EMにより導入されました。

---

## 数値の出力

### PRINTVL — 式を出力して改行

`PRINTVL` は `PRINTV` + `L` の組み合わせで、式の値を出力して改行します（整数式→数値、文字列式→テキスト）：

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

浮動小数点数は `{}` 内でデフォルトの `ToString()` フォーマットで出力されますが、`{}` には精度制御がありません。精度を指定するには、`TOSTRF` 関数で浮動小数点を文字列に変換し、`%` 置換で出力します（`TOSTRF` は文字列を返すため、`{}` ではなく `%...%` を使用します）：

```erb
#DIMF L_PI = 3.14159265
PRINTFORML 円周率：{L_PI}                ; → 円周率：3.14159265（{} デフォルト形式、精度制御なし）
PRINTFORML 円周率：%TOSTRF(L_PI, "F2")%   ; → 円周率：3.14（%...% 文字列置換 + TOSTRF 精度制御）
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

### TEXT_BGC_ON / TEXT_BGC_OFF — テキスト背景色（SK専用）

Skia版では `TEXT_BGC_ON` / `TEXT_BGC_OFF` で行全体の背景色を設定できます：

```erb
TEXT_BGC_ON 255, 0, 0, 30       ; 赤背景、30%不透明度
PRINTL この行には赤い背景色がつきます
TEXT_BGC_OFF                     ; 背景色をオフ
```

詳細は [TEXT_BGC リファレンス](../Reference/TEXT_BGC.md) を参照してください。

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

### PRINTPLAIN — ボタンを生成しない出力 { #prinTPLAIN-overview }

`PRINTPLAIN` の `PLAIN` 修飾の意味は**ボタンを生成しない**ことです——テキスト中の `[数値]` がクリック可能なボタンに変換されることはありません。

`PLAIN` と `FORM` は**直交**した修飾次元であり、自由に組み合わせることができます：

| 次元 | 制御内容 | 選択肢 |
|------|---------|-------|
| `FORM` | `%変数%`/`{式}` 補間の有無 | 有 = 補間する（`FORM_STR` 引数型）/ 無 = 補間しない（`STR` 引数型） |
| `PLAIN` | `[数値]` のボタン変換の有無 | 有 = ボタンを生成しない / 無 = 通常通りボタンを生成 |

具体的な組み合わせ：

| 命令 | 引数型 | FORM 補間 | ボタン生成 |
|------|--------|:---------:|:----------:|
| `PRINT` | `STR` | ❌ | ✅ |
| `PRINTFORM` | `FORM_STR` | ✅ | ✅ |
| `PRINTPLAIN` | `STR_NULLABLE` | ❌ | ❌ |
| `PRINTPLAINFORM` | `FORM_STR_NULLABLE` | ✅ | ❌ |

`PRINTPLAIN` は `STR_NULLABLE` 引数型（`PRINT` と同様に FORM 補間なし）を使用し、さらに `PLAIN` 修飾でボタンを生成しません：

```erb
PRINTPLAIN %NAME%           ; → %NAME%（STR_NULLABLE、FORM 補間なし；PLAIN、ボタン生成なし）
PRINTPLAINFORM %NAME%       ; → エリナ（FORM_STR_NULLABLE、FORM 補間あり；PLAIN、ボタン生成なし）
```

これは `INPUT` ブロッキング時に大きな意味を持ちます——`[0]` や `[100]` が単なるテキストとして表示され、ユーザーはクリックで入力できず、手動で値を入力する必要があります：

```erb
PRINT [0] クリック可        ; → クリック可能ボタン、クリックで 0 が入力される
PRINTPLAIN [0] クリック不可  ; → 単なるテキスト、手動入力が必要
INPUT
```

詳細は [出力内のボタン——PRINTPLAIN](#prinTPLAIN) および [PRINTPLAIN リファレンス](../Reference/PRINTPLAIN.md) を参照。

---

## PRINT系クイックリファレンス

| 命令 | 引数タイプ | 改行 | 等価な書き方 |
|------|---------|------|---------|
| `PRINT テキスト` | 単純文字列 | ❌ | — |
| `PRINTL テキスト` | 単純文字列 | ✅ | `PRINT` + 改行 |
| `PRINTW テキスト` | 単純文字列 | ✅+待機 | `PRINTL` + `WAIT` |
| `PRINTN テキスト` | 単純文字列 | ❌（行結合） | `PRINT` + 入屏 + `WAIT` + 行結合 |
| `PRINTV 式` | 式（整数·文字列） | ❌ | — |
| `PRINTVL 式` | 式（整数·文字列） | ✅ | `PRINTV` + 改行 |
| `PRINTS 式` | 文字列式 | ❌ | — |
| `PRINTSL 式` | 文字列式 | ✅ | `PRINTS` + 改行 |
| `PRINTFORM 書式文字列` | FORM文字列 | ❌ | — |
| `PRINTFORML 書式文字列` | FORM文字列 | ✅ | `PRINTFORM` + 改行 |
| `PRINTFORMW 書式文字列` | FORM文字列 | ✅+待機 | `PRINTFORML` + `WAIT` |
| `PRINTFORMS 式` | FORM文字列式 | ❌ | — |
| `PRINTFORMSL 式` | FORM文字列式 | ✅ | `PRINTFORMS` + 改行 |

---

## 出力内のボタン

### `[N]` 自動ボタン

[Hello World](hello-world.md) で `[0]` が自動的にボタンになる書き方を既に見ました。ここではさらに詳しく説明します。

**認識ルール**：`[整数]` パターンはエンジンによって自動的にボタン核として認識されます。整数のみ有効——`[abc]`、`[1.5]`、`[]` はボタンを生成しません。

**ボタン範囲**：1行に `[N]` が1つだけの場合、**行全体がボタン領域**になります：

```erb
PRINTL [0] ゲーム開始     ; "ゲーム開始" または "[0]" をクリックすると 0 を入力するのと等価
```

**複数ボタン行**：1行に複数の `[N]` がある場合、エンジンはスペース区切りで独立したボタンに分割します：

```erb
PRINT [0] はい    [1] いいえ
INPUT
; 2つの独立したボタン："はい" をクリック → RESULT=0、"いいえ" をクリック → RESULT=1
```

!!! warning "複数ボタン分割の境界ケース"

    1行の `[N]` と説明文の配置が不規則な場合、自動分割が期待通りにならないことがあります。この場合は `PRINTBUTTON` で明示的にボタンを作成してください（[HTMLタグ構文](html-syntax.md) 参照）。

### PRINTPLAIN — ボタンを生成しない出力 { #prinTPLAIN }

`PRINTPLAIN` はテキストを出力しますが、**ボタンを生成しません**。テキストに `[0]` が含まれていても：

```erb
PRINTPLAIN [0] これはボタンではない    ; そのまま出力、クリック不可
```

**実質的な違い**：`INPUT` ブロッキング時、`PRINT [0] クリック` で生成されたボタンはクリック可能で `0` を自動的に `INPUT` に渡します。一方、`PRINTPLAIN [0] クリック不可` の `[0]` は単なるテキスト——ユーザーは手動で `0` を入力しなければ `INPUT` に受け付けられません。詳しくは「その他の出力命令」の [PRINTPLAIN — ボタンを生成しない出力](#prinTPLAIN-overview) を参照。

`PRINTPLAINFORM` 版も同様です：`PRINTPLAINFORM 価格は {PRICE} 円、選択は [1] 購入` の `[1]` もボタン化**されません**。`PRINTPLAINFORM` は同時に FORM 補間を行います（`{PRICE}` が数値に展開されます）。

---

## よくある落とし穴

| 落とし穴 | 間違い | 正しい | 理由 |
|------|---------|---------|------|
| PRINT で変数置換を期待 | `PRINT %NAME%` | `PRINTFORM %NAME%` | PRINT はFORM補間を行わない |
| PRINTS に引用符なし | `PRINTS hello` | `PRINTS "hello"` | 引用符がないと変数名として扱われる |
| 改行の忘れ | `PRINT こんにちは` | `PRINTL こんにちは` | PRINT は改行しない、内容が連結される |
| FORM内の浮動小数点精度 | `PRINTFORM {PI}` | `PRINTFORM %TOSTRF(PI,"F2")%` | `{}` は浮動小数点の精度制御がない；TOSTRFは文字列を返すため `%...%` を使用 |
| `[abc]` をボタンにしたい | `PRINTL [abc] 選択肢` | `PRINTL [0] 選択肢` | `[整数]` のみボタンを生成する |
| `PRINTPLAIN` でボタンを期待 | `PRINTPLAIN [0] はい [1] いいえ\nINPUT` | `PRINT [0] はい [1] いいえ\nINPUT` | `PRINTPLAIN` はボタンを生成しない、手動入力が必要 |

---

## 次のステップ

| 知りたいこと | 進むべきページ |
|:---|:---|
| FORM構文の詳細 | [FORM構文](form-syntax.md) |
| 代入文 | [代入文](assignment.md) |
| 値・型・変数 | [値・型・変数](values-types.md) |
| 入力と待機 | [INPUT命令](../Reference/INPUT.md) |
| PRINT完全API | [PRINT系](../Reference/PRINT.md) |
