# ジャンプ

!!! info "本節対応マニュアル"

    - **Reference 分類**: [ループ・分岐構文](../Reference/README.md#flow-control)
    - [GOTO](../Reference/GOTO.md) — GOTO命令APIリファレンス
    - [GOTOFORM](../Reference/FORM.md) — GOTOFORM命令APIリファレンス
    - [CONTINUE / BREAK](../Reference/CONTINUE.md) — ループ制御APIリファレンス

---

## 概要

ERABASICのジャンプは2種類に分けられます：

| タイプ | 命令 | スコープ |
|------|------|---------|
| 関数内ジャンプ | `GOTO`、`$ラベル` | 現在の関数内 |
| ループ制御 | `CONTINUE`、`BREAK` | 現在のループ内 |

!!! warning "GOTO は現在の関数内のラベルにのみジャンプ可能"

    `GOTO` は関数をまたいでジャンプできません。関数をまたぐジャンプには `CALL`/`JUMP` を使用します（[関数とCALL](call.md)を参照）。

---

## $ ラベル — ジャンプ先の定義

`$` で始まる行はラベルを定義し、`GOTO` のジャンプ先となります：

```erb
$LOOP_START
    ; コード
    GOTO LOOP_START
```

### ラベルの命名規則

- `$` で始まり、後にラベル名を続ける
- ラベル名は同じ関数内で一意である必要がある
- ラベル名は大文字小文字を区別する
- ラベルはその関数内でのみ参照可能

```erb
@MY_FUNC
$START
    PRINTL 開始
    GOTO MIDDLE

$MIDDLE
    PRINTL 中間
    GOTO END_LABEL

$END_LABEL
    PRINTL 終了
RETURN
```

---

## GOTO — 無条件ジャンプ

`GOTO` は現在の関数内の指定された `$` ラベルにジャンプします：

```erb
GOTO labelName
```

### 基本的な使い方

```erb
@MY_FUNC
    PRINTL 1
    GOTO THREE

$TWO
    PRINTL 2
    GOTO FIVE

$THREE
    PRINTL 3
    GOTO TWO

$FOUR
    PRINTL 4
    GOTO END_LABEL

$FIVE
    PRINTL 5
    GOTO FOUR

$END_LABEL
    PRINTW END
RETURN
; 出力：1, 3, 2, 5, 4, END
```

### GOTOFORM — 動的ラベルジャンプ

`GOTOFORM` はFORM構文を使用してラベル名を動的に構築します：

```erb
#DIM L_PHASE = 2
GOTOFORM PHASE_{L_PHASE}

$PHASE_1
    PRINTL フェーズ1
    RETURN

$PHASE_2
    PRINTL フェーズ2
    RETURN

$PHASE_3
    PRINTL フェーズ3
    RETURN
```

---

## GOTO とループ構造の相互作用

### GOTO でループ内にジャンプ

`GOTO` でループ本体の内側にジャンプした場合、動作はループの種類に依存します：

| ループ種別 | GOTO で飛び込んだ後の動作 |
|---------|-----------------|
| `REPEAT` ~ `REND` | `REND` の前の行まで実行し、`REND` の次の行に移動（ループしない） |
| `FOR` ~ `NEXT` | `NEXT` の前の行まで実行し、`NEXT` の次の行に移動（ループしない） |
| `WHILE` ~ `WEND` | `WEND` まで実行し、`WHILE` に戻って条件をチェック |
| `DO` ~ `LOOP` | `LOOP` まで実行し、条件をチェック、満たされれば `DO` に戻る |

!!! danger "GOTO でループ内にジャンプするのは避ける"

    `GOTO` でループ内にジャンプする動作はエラーを起こしやすいので避けてください。ループの外からループに入る必要がある場合は、条件フラグを使用するか、コードをリファクタリングしてください。

### GOTO でループから抜ける

`GOTO` でループから抜けることはできますが、`BREAK` の方が適切です：

```erb
; ❌ 非推奨：GOTO でループから抜ける
REPEAT 100
    SIF COUNT == 5
        GOTO OUTSIDE
REND
$OUTSIDE

; ✅ 推奨：BREAK でループから抜ける
REPEAT 100
    SIF COUNT == 5
        BREAK
REND
```

### GOTO で SELECTCASE をスキップ

`GOTO` で `SELECTCASE` の内側にジャンプすると、`CASE`/`CASEELSE` の前で `ENDSELECT` の次の行に移動します：

```erb
SELECTCASE X
    GOTO INSIDE      ; ❌ このようなことはしない
$INSIDE
    CASE 1           ; ここに到達すると ENDSELECT の後に直接ジャンプ
        PRINTL 1
ENDSELECT
```

---

## CONTINUE と BREAK — ループ内ジャンプ

`CONTINUE` と `BREAK` はループ内の専用ジャンプ命令です（詳細は[ループ](loop.md)を参照）：

| 命令 | 動作 |
|------|------|
| `CONTINUE` | 現在のループの次の反復にスキップ |
| `BREAK` | 現在のループを抜ける |

### CONTINUE のジャンプ先

| ループ | CONTINUE のジャンプ先 |
|------|-----------------|
| `REPEAT` | `REPEAT` に戻り、`COUNT` +1 |
| `FOR` | `FOR` に戻り、カウント変数 +ステップ |
| `WHILE` | `WHILE` に戻り、条件を再チェック |
| `DO` | `LOOP` に移動し、条件をチェック |

### BREAK のジャンプ先

`BREAK` はループ終了行の次の行にジャンプします：

| ループ | BREAK のジャンプ先 |
|------|---------------|
| `REPEAT` ~ `REND` | `REND` の次の行 |
| `FOR` ~ `NEXT` | `NEXT` の次の行 |
| `WHILE` ~ `WEND` | `WEND` の次の行 |
| `DO` ~ `LOOP` | `LOOP` の次の行 |

---
