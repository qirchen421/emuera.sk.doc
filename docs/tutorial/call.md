# 関数とCALL

!!! info "本節対応マニュアル"

    - **Reference 分類**: [関数系（CALL 等）](../Reference/README.md#function-call) / [RETURN 系](../Reference/README.md#return) / [入力・ウェイト](../Reference/README.md#input-wait)
    - [CALL](../Reference/CALL.md) — CALL命令APIリファレンス
    - [JUMP](../Reference/JUMP.md) — JUMP命令APIリファレンス
    - [RETURN](../Reference/RETURN.md) — RETURN命令APIリファレンス
    - [INPUT](../Reference/INPUT.md) — INPUT命令APIリファレンス
    - [関数定義](../Emuera/function.md) — 関数仕様説明
    - [ユーザー定義変数](../Emuera/user_defined_variables.md) — #DIM 宣言仕様

---

## 概要

ERABASICプログラムは**関数**で構成されます。各関数は `@` ラベルで始まり、`CALL` で呼び出されます。関数はコード編成の基本単位であり、あなたが書くすべてのコードはいずれかの関数に属します。

| 概念 | 説明 |
|------|------|
| `@ラベル` | 関数の入口を定義 |
| `CALL` | 関数を呼び出し、実行後に戻る |
| `JUMP` | 関数にジャンプし、戻らない |
| `RETURN` | 関数から戻り、RESULT を設定 |
| `RETURNF` | 式関数から値を返す |

!!! note "eramaker互換性"
    `@ラベル`/`CALL`/`JUMP`/`RETURN` はeramakerから存在する機能です。`RETURNF`、`TRYCALL`/`TRYJUMP`、`#FUNCTION`/`#FUNCTIONS` などはEmueraの拡張機能です。

---

## @ラベル — 関数の定義

`@` で始まる行は関数を定義します：

```erb
@MY_FUNC
    PRINTL これは私の関数
RETURN
```

### 関数の命名規則

- `@` で始まり、後に関数名を続ける
- 関数名はプロジェクト全体で一意である必要がある
- 関数名は大文字小文字を区別する
- 関数名には英数字とアンダースコアのみ使用可能

### 関数の実行

関数は `CALL` や `JUMP` で呼び出されたときのみ実行されます。エンジンは特定のタイミングで一部の関数を自動的に呼び出します（`@SYSTEM_TITLE`、`@EVENTFIRST` など）。詳細は[イベント関数](event-functions.md)を参照。

---

## CALL — 関数の呼び出し

`CALL` は指定された関数を呼び出し、実行完了後に `CALL` の次の行に戻ります：

```erb
@SYSTEM_TITLE
    CALL GREETING
    PRINTL 戻りました
    WAIT

@GREETING
    PRINTL こんにちは！
RETURN
; 出力：
; こんにちは！
; 戻りました
```

### CALL の引数渡し

`CALL` は関数に引数を渡すことができ、関数内では `ARG`、`ARGS`、`ARGF` で受け取ります：

```erb
@SYSTEM_TITLE
    CALL SHOW_DAMAGE 100, 50
    WAIT

@SHOW_DAMAGE, ARG, ARG
    PRINTFORML 物理ダメージ：{ARG:0}、魔法ダメージ：{ARG:1}
    PRINTFORML 合計ダメージ：{ARG:0 + ARG:1}
RETURN
; 出力：
; 物理ダメージ：100、魔法ダメージ：50
; 合計ダメージ：150
```

| 引数変数 | 型 | 説明 |
|---------|------|------|
| `ARG` | 整数 | 整数引数を受け取る、`ARG:0`、`ARG:1`... |
| `ARGS` | 文字列 | 文字列引数を受け取る、`ARGS:0`、`ARGS:1`... |
| `ARGF` | 浮動小数点 | 浮動小数点引数を受け取る（Skia派生版）、`ARGF:0`、`ARGF:1`... |

### 引数宣言の2つの方法

**方法1：シグネチャで引数型を宣言**（推奨）

```erb
@SHOW_DAMAGE, ARG, ARG
; シグネチャで2つの整数引数を宣言
; ARG:0 = 第1引数、ARG:1 = 第2引数
```

**方法2：#DIM で引数変数を宣言**

```erb
@SHOW_DAMAGE
#DIM ARG
#DIM ARG, 2
; 関数本体内で宣言するが、シグネチャ方式ほど直感的ではない
```

### 文字列引数

```erb
@SYSTEM_TITLE
    CALL GREET "エリナ"
    WAIT

@GREET, ARGS
    PRINTFORML こんにちは、%ARGS:0%！
RETURN
; 出力：こんにちは、エリナ！
```

### 混合引数

```erb
@SHOW_INFO, ARGS, ARG, ARG
; ARGS:0 = 名前、ARG:0 = レベル、ARG:1 = HP
    PRINTFORML %ARGS:0% Lv.{ARG:0} HP:{ARG:1}
RETURN
```

---

## RETURN — 関数から戻る

`RETURN` は現在の関数を終了し、呼び出し元に戻ります：

```erb
@MY_FUNC
    PRINTL 実行中
    RETURN              ; 呼び出し元に戻る
    PRINTL 実行されない     ; RETURN の後のコードは実行されない
```

### RETURN による RESULT の設定

`RETURN` の引数は `RESULT` に格納されます：

```erb
@SYSTEM_TITLE
    CALL GET_ANSWER
    PRINTFORML 答えは{RESULT}
    WAIT

@GET_ANSWER
    RETURN 42
; 出力：答えは42
```

### 複数の戻り値

`RETURN` は複数の値を返すことができ、順に `RESULT:0`、`RESULT:1`... に格納されます：

```erb
@SYSTEM_TITLE
    CALL GET_COORDS
    PRINTFORML X={RESULT:0} Y={RESULT:1}
    WAIT

@GET_COORDS
    RETURN 10, 20
; 出力：X=10 Y=20
```

### RETURN なしの関数

関数の最後に `RETURN` がない場合、`RESULT` は `0` に設定されます：

```erb
@NO_RETURN
    PRINTL RETURNなし
; 関数終了時 RESULT = 0
```

### RETURN は必ず RESULT を上書きする

`RETURN` は**必ず**`RESULT`を上書きします。関数内で手動で`RESULT`に値を代入しても、`RETURN`実行時に失われます：

```erb
@MY_FUNC
    RESULT = 999
    RETURN 1
    ; 呼び出し元の RESULT は 999 ではなく 1
```

関数末尾でも暗黙的に上書きされます——`RETURN`がない場合、`RESULT:0`は`0`になります。

### RETURNF は RESULT を上書きしない

`#FUNCTION`宣言された式中関数は`RETURNF`で値を返します。`RETURNF`は**RESULTを上書きしません**。関数末尾でも暗黙的な代入は行われません：

```erb
@MY_EXPR_FUNC
#FUNCTION
    RESULT = 999
    RETURNF 1
    ; 呼び出し元の RESULT は 999 のまま（RETURNF は RESULT を上書きしない）
```

| 関数タイプ | 戻りキーワード | RESULT を上書き | 関数末尾の RESULT |
|---------|-----------|:---:|:---:|
| 命令型（デフォルト） | `RETURN` | ✅ 上書き | 暗黙的に `RESULT:0 = 0` |
| 式型（`#FUNCTION`） | `RETURNF` | ❌ 上書きしない | 変更なし |

### RETURNFORM — FORM構文による動的評価戻り値

`RETURNFORM` は `RETURN` の動的評価変種です。FORM構文で文字列を展開した後、展開結果を**整数式として再解析・評価**し、`RESULT` に書き込みます。

```erb
@MY_FUNC
    #DIMS L_EXPR '= "A * 10"
    RETURNFORM %L_EXPR%
; 実行過程：FORM展開 → "A * 10" → 字句解析+整数式評価 → RESULTに書き込み
; RETURN A * 10 と等価
```

!!! warning "RETURNFORM 内の % は文字列置換記号"

    `RETURNFORM` 内の `%` はFORM構文の文字列置換記号であり、剰余演算子ではありません。
    `RETURNFORM A % 100` は `A ` + 変数 `100` の値として解析され、`A mod 100` ではありません。

!!! info "RETURNFORM は整数を返し、文字列は返さない"

    `RETURNFORM` の評価は2段階で行われます：
    
    1. **FORM展開**：`%変数%` や `{式}` を実際の値に置換し、文字列を得る
    2. **再解析**：展開後の文字列を**整数式**として字句解析・評価する
    
    最終結果は `RESULT`（整数配列）に書き込まれます。`RETURNSFORM` 命令は存在しません——文字列を返す必要がある場合は、`RESULTS = ...` で代入後に `RETURN` を使用してください。
    
    つまり RETURNFORM は本質的に**制限付きの動的評価**機構です：パラメータはコンパイル時にFORM文字列として存在し、実行時に展開→整数式として再解析されます。現代のERABASICでは、より汎用的な `EVAL`/`EVALS`/`EVALF` 式関数が完全な動的評価を提供しています。

---

## JUMP — 関数へのジャンプ

`JUMP` は別の関数にジャンプしますが、**戻りません**：

```erb
@SYSTEM_TITLE
    CALL AAA
    PRINTW SYSTEM_TITLEに戻りました

@AAA
    PRINTL AAAの中
    JUMP BBB           ; BBBにジャンプ、AAAには戻らない
    PRINTL 実行されない     ; JUMP の後のコードは実行されない

@BBB
    PRINTL BBBの中
    RETURN              ; AAAの呼び出し元（SYSTEM_TITLE）に戻る
; 出力：
; AAAの中
; BBBの中
; SYSTEM_TITLEに戻りました
```

### CALL vs JUMP

| | `CALL` | `JUMP` |
|------|:---:|:---:|
| 戻るかどうか | ✅ 呼び出し元に戻る | ❌ 戻らない |
| コールスタック | プッシュされる | プッシュされない |
| 典型的な用途 | サブ関数の呼び出し | 関数間ジャンプ（末尾呼び出し最適化） |

!!! warning "JUMP のコールスタックリスク"

    `JUMP` はコールスタックにプッシュしません。呼び出しチェーンで全て `JUMP` を使用すると、最終的に `RETURN` 時に戻り先が見つからず、エラーになる可能性があります。

### JUMP と RESULT

JUMP先の関数で`RETURN`が実行された場合、`RESULT`は通常通り設定されます。JUMPはスタックフレームを置換するだけで、`RETURN`の`RESULT`設定動作には影響しません。

JUMP先の関数が終了すると、エンジンは`IsJump`フラグを検出して**再帰的にスタックを巻き戻し**、最初の非JUMP呼び出し元（`CALL`等）まで戻ります。JUMP連鎖でもRESULTは正しく設定されます：

```erb
@SYSTEM_TITLE
    CALL AAA
    PRINTVL RESULT    ; 42

@AAA
    JUMP BBB          ; AAA を BBB に置き換え

@BBB
    RETURN 42         ; RESULT = 42、再帰的に SYSTEM_TITLE まで戻る
```

---

## CALLF — 式関数の呼び出し

`CALLF` は**式関数**（`#FUNCTION` で宣言された関数）を呼び出し、式内で戻り値を使用できます：

```erb
@SYSTEM_TITLE
    #DIM L_RESULT
    L_RESULT = IS_VALID(100)
    PRINTFORML 結果={L_RESULT}
    WAIT

@IS_VALID, ARG
#FUNCTION
    IF ARG > 0 && ARG < 1000
        RETURNF 1
    ELSE
        RETURNF 0
    ENDIF
```

`#FUNCTION` で宣言された関数は `RETURNF` で値を返し（`RETURN` ではなく）、式内で直接呼び出すことができます。

> 式関数の詳細な説明は[命令 vs 式](command-vs-expression.md)を参照。

---

## INPUT — プレイヤー入力の待機

`INPUT` はプログラムの実行を一時停止し、プレイヤーの入力を待ち、結果を `RESULT` に格納します：

```erb
@SYSTEM_TITLE
    PRINTL 数字を入力してください：
    INPUT
    PRINTFORML 入力値は{RESULT}
    WAIT
```

### INPUT のデフォルト値

```erb
INPUT 0          ; 未入力時 RESULT = 0
INPUT 100        ; 未入力時 RESULT = 100
```

### INPUTS — 文字列入力

`INPUTS` は文字列入力を待ち、結果を `RESULTS` に格納します：

```erb
PRINTL 名前を入力してください：
INPUTS
PRINTFORML こんにちは、%RESULTS%！
```

### INPUT と RESULT

`INPUT` と `CALL` はどちらも `RESULT` を変更します。`CALL` の後に `INPUT` の結果を使用する必要がある場合は、先に保存してください：

```erb
INPUT
#DIM L_INPUT = RESULT       ; 入力値を保存
CALL SOME_FUNC              ; RESULT が上書きされる
PRINTFORML 入力値={L_INPUT}  ; 保存した値を使用
```

### INPUT とボタンの連動

[Hello World](hello-world.md) で `[N]` ボタンと `INPUT` の組み合わせを既に見ました。ここでは重要な詳細を補足します：

**型の一致**：`INPUT` は整数ボタン（`[0]`、`[1]` 等）のみクリック可能です。`INPUTS` は文字列ボタンのみクリック可能です。型が一致しない場合、ボタンはクリックできません。

```erb
; INPUT + 整数ボタン（一般的）
PRINTL [0] 開始
PRINTL [1] 終了
INPUT                        ; [0] をクリック → RESULT=0

; INPUTS + 文字列ボタン
PRINTBUTTON "[HogeHoge] ", "HogeHoge"
PRINTBUTTON "[PugePuge] ", "PugePuge"
INPUTS                       ; クリック → RESULTS="HogeHoge"
```

**ボタンは INPUT 待機中のみ有効**：`PRINTL [0]` はボタンを作成しますが、`INPUT` が実行されて初めてクリック可能になります。それ以前のボタンクリックは無効です。

**古いボタンは無効化**：`INPUT` のたびに、以前のボタンは自動的に無効になります（再クリック不可）。新しいボタンのみ選択可能です。

---

## 関数内の変数宣言

関数内では `#DIM`/`#DIMS`/`#DIMF` でプライベート変数を宣言します。これらの変数は現在の関数内でのみ参照可能です：

```erb
@MY_FUNC
#DIM L_COUNT                ; プライベート整数変数
#DIMS L_NAME '= "デフォルト"      ; プライベート文字列変数
#DIMF L_RATE = 0.5          ; プライベート浮動小数点変数（Skia派生版）

    FOR L_COUNT, 0, 10
        PRINTFORML %L_NAME%：{L_COUNT}
    NEXT
RETURN
```

!!! warning "#DIM は @ ラベル行の後、実行文の前に記述必須"

    `#DIM` 等のプリプロセッサ行は関数の先頭に記述する必要があり、実行可能文の後に記述することはできません。複数の `#` 行を連続して記述できます。

> 変数宣言の完全な説明は、[値・型・変数](values-types.md) と [変数宣言システム](../Emuera/user_defined_variables.md) を参照。

---

## よくある落とし穴

| 落とし穴 | 間違い | 正しい | 理由 |
|------|---------|---------|------|
| CALL 後に RESULT を使用 | `CALL F` 後に直接 `RESULT` を使用 | 先に `RESULT` を保存 | 後続の操作が RESULT を上書きする可能性 |
| JUMP の後にコードを書く | `JUMP F` の後にロジック | JUMP の後にコードを書かない | JUMP は戻らない、後ろのコードは実行されない |
| #DIM の位置が不正 | 実行文の後に `#DIM` | `@` ラベル行の後に | #DIM はプリプロセッサ行 |
| RETURNFORM で剰余 | `RETURNFORM A % 100` | `RETURN A % 100` | % は RETURNFORM 内で置換記号 |
| 関数名の衝突 | 2つの `@MY_FUNC` | 関数名を一意に | プロジェクト内で関数名は重複不可 |
| RETURN の忘れ | 関数末尾に RETURN なし | `RETURN` を追加 | RETURN なしの場合 RESULT = 0 |
| 手動で RESULT を設定後に RETURN | `RESULT = 999` 後に `RETURN 1` | 手動で RESULT を設定しない | RETURN は必ず RESULT を上書きする |
| JUMP は RESULT を設定しないと思い込む | JUMP 後に RESULT が変わらないと思う | JUMP 先の RETURN は通常通り RESULT を設定 | JUMP はスタックフレームを置換するだけで RESULT 設定に影響しない |
| INPUT で文字列ボタンを選択 | `INPUT` + `PRINTBUTTON "x", "str"` | `INPUTS` を使用 | INPUT は整数ボタンのみクリック可能 |

---

## 次のステップ

| 知りたいこと | 進むべきページ |
|:---|:---|
| 値・型・変数 | [値・型・変数](values-types.md) |
| 変数宣言システム（REF/OUT/VARIADIC） | [変数宣言システム](variable-declaration.md) |
| 条件分岐 | [条件分岐](condition.md) |
| ループ | [ループ](loop.md) |
| イベント関数 | [イベント関数](event-functions.md) |
| 命令 vs 式 | [命令 vs 式](command-vs-expression.md) |
| CALL 完全API | [CALL](../Reference/CALL.md) |
| RETURN 完全API | [RETURN](../Reference/RETURN.md) |
