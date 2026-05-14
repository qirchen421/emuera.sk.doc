# ループ

!!! info "本節対応マニュアル"

    - **Reference 分類**: [ループ・分岐構文](../Reference/README.md#flow-control)
    - [REPEAT ~ REND](../Reference/REPEAT.md) — カウントループAPIリファレンス
    - [FOR ~ NEXT](../Reference/FOR.md) — 汎用カウントループAPIリファレンス
    - [WHILE ~ WEND](../Reference/WHILE.md) — 前置条件ループAPIリファレンス
    - [DO ~ LOOP](../Reference/DO.md) — 後置条件ループAPIリファレンス
    - [CONTINUE / BREAK](../Reference/CONTINUE.md) — ループ制御APIリファレンス

---

## 概要

ERABASICは4種類のループ構造を提供します：

| 構造 | 特徴 | 適用場面 |
|------|------|---------|
| `REPEAT` ~ `REND` | 固定回数、`COUNT` でカウント | ループ回数が既知 |
| `FOR` ~ `NEXT` | カスタムカウント変数・開始値・ステップ | 柔軟なカウント制御が必要 |
| `WHILE` ~ `WEND` | 前置条件、実行されない可能性あり | 条件を満たす間ループ |
| `DO` ~ `LOOP` | 後置条件、少なくとも1回は実行 | 少なくとも1回は実行する条件ループ |

すべてのループで `CONTINUE`（次の反復にスキップ）と `BREAK`（ループを抜ける）が使用できます。

!!! note "eramaker互換性"
    `REPEAT`/`REND` と `CONTINUE`/`BREAK` はeramakerから存在する機能です。`FOR`/`NEXT`、`WHILE`/`WEND`、`DO`/`LOOP` はEmueraの拡張機能です。

---

## REPEAT ~ REND — 固定回数ループ

`REPEAT` は最もシンプルなループで、ループ回数を指定し、組み込み変数 `COUNT` でカウントします：

```erb
REPEAT 5
    PRINTFORML {COUNT}回目
REND
; 出力：
; 0回目
; 1回目
; 2回目
; 3回目
; 4回目
```

### COUNT 変数

- `COUNT` は組み込み整数変数で、`0` から始まり、反復ごとに自動的に +1 される
- ループ終了時の `COUNT` はループ回数に等しい（回数 - 1 ではない）
- `COUNT` はグローバル変数であり、ネストした `REPEAT` では外側の値が上書きされる

```erb
REPEAT 3
    ; COUNT: 0, 1, 2
    PRINTFORML COUNT = {COUNT}
REND
PRINTFORML ループ終了後 COUNT = {COUNT}    ; → 3
```

!!! warning "REPEAT はネスト不可"

    `REPEAT` は常に `COUNT` を使用するため、ネストすると内側が外側の `COUNT` を上書きします。ネストループが必要な場合は `FOR` を使用してください。

---

## FOR ~ NEXT — 汎用カウントループ

`FOR` は `REPEAT` の拡張版で、カウント変数・開始値・ステップをカスタマイズできます：

```erb
FOR カウント変数, 開始値, 終了値, ステップ
    ; ループ本体
NEXT
```

| 引数 | 意味 | 省略 | デフォルト値 |
|------|------|------|--------|
| カウント変数 | カウントに使用する整数変数 | ❌ 省略不可 | — |
| 開始値 | カウント変数に最初に代入される値 | ❌ 省略不可 | — |
| 終了値 | ループ終了の境界 | ❌ 省略不可 | — |
| ステップ | 反復ごとに増加する値 | ✅ 省略可能 | `1` |

### 基本的な使い方

```erb
#DIM L_I
FOR L_I, 0, 5
    PRINTFORML L_I = {L_I}
NEXT
; 出力：L_I = 0, 1, 2, 3, 4
```

### カスタムステップ

```erb
#DIM L_I
FOR L_I, 10, 0, -2
    PRINTFORML L_I = {L_I}
NEXT
; 出力：L_I = 10, 8, 6, 4, 2
```

### ネストループ

```erb
#DIM L_X
#DIM L_Y
FOR L_Y, 0, 3
    FOR L_X, 0, 3
        PRINTFORM ({L_X},{L_Y})
    NEXT
    PRINTL
NEXT
; 出力：
; (0,0)(1,0)(2,0)
; (0,1)(1,1)(2,1)
; (0,2)(1,2)(2,2)
```

### FOR の重要なルール

1. **ステップが正**：カウント変数 < 終了値の間ループ継続
2. **ステップが負**：カウント変数 > 終了値の間ループ継続
3. **ステップが 0**：無限ループ、`BREAK` で抜ける必要がある
4. **引数はループ開始時に固定**：ループ内でカウント変数を変更してもループ回数に影響しない

```erb
#DIM L_I
#DIM L_N = 5
FOR L_I, 0, L_N
    L_N = 100       ; ループ回数に影響しない、依然として5回
NEXT
```

---

## WHILE ~ WEND — 前置条件ループ

`WHILE` は反復の前に条件をチェックし、条件が真（0以外）の間ループを継続します：

```erb
WHILE HP > 0
    ; 戦闘ロジック
    HP -= 10
WEND
```

初期条件が偽の場合、ループ本体は**1回も実行されません**：

```erb
#DIM L_X = 100
WHILE L_X < 0
    PRINTL 実行されない
WEND
```

!!! warning "無限ループに注意"

    `WHILE` の条件が常に真の場合、無限ループになります。Emuera はこれを検出してエラーを報告します。
    ループ本体に条件を変更するロジックがあること、または `BREAK` で抜けることを確認してください。

---

## DO ~ LOOP — 後置条件ループ

`DO` ~ `LOOP` は少なくとも1回はループ本体を実行し、その後 `LOOP` で条件をチェックします：

```erb
DO
    PRINTL 少なくとも1回は実行される
    A -= 1
LOOP A > 0
```

### DO ~ LOOP と WHILE ~ WEND の違い

| | `WHILE` ~ `WEND` | `DO` ~ `LOOP` |
|------|:---:|:---:|
| チェックのタイミング | ループ前 | ループ後 |
| 最少実行回数 | 0回 | 1回 |

### CONTINUE の DO ~ LOOP における特殊な動作

`DO` ~ `LOOP` 内で `CONTINUE` を実行すると、`LOOP` 行に移動して条件をチェックします。条件を満たさない場合、**`DO` に戻らず**にループを抜けます：

```erb
DO
    A += 1
    SIF A == 3
        CONTINUE       ; LOOP に移動して条件をチェック
    PRINTFORML A = {A}
LOOP A < 5
; 出力：A = 1, A = 2, A = 4
; （A == 3 のとき CONTINUE で LOOP に移動、条件はまだ満たされるのでループ継続）
```

---

## CONTINUE と BREAK

すべてのループ構造で `CONTINUE` と `BREAK` がサポートされています：

| 命令 | 動作 |
|------|------|
| `CONTINUE` | 次の反復にスキップ（`REPEAT`/`FOR` ではカウント変数が自動増分） |
| `BREAK` | ループを即座に抜け、ループ構造の後のコードを実行 |

### CONTINUE の例

```erb
REPEAT 5
    SIF COUNT == 2
        CONTINUE           ; COUNT == 2 の反復をスキップ
    PRINTFORML {COUNT}
REND
; 出力：0, 1, 3, 4
```

### BREAK の例

```erb
REPEAT 100
    SIF COUNT == 3
        BREAK              ; COUNT == 3 のときループを抜ける
    PRINTFORML {COUNT}
REND
PRINTFORML ループ終了後 COUNT = {COUNT}    ; → 3
; 出力：0, 1, 2
```

### CONTINUE の各ループでの動作

| ループ | CONTINUE の動作 |
|------|----------------|
| `REPEAT` | `REPEAT` に戻り、`COUNT` +1 |
| `FOR` | `FOR` に戻り、カウント変数 +ステップ |
| `WHILE` | `WHILE` に戻り、条件を再チェック |
| `DO` | `LOOP` に移動し、条件をチェック |

---

## 4種類のループの選択

| 場面 | 推奨 | 理由 |
|------|------|------|
| ループ回数が既知 | `REPEAT` | 最も簡潔 |
| カスタムカウントが必要 | `FOR` | 柔軟なカウント変数とステップ |
| ネストループ | `FOR` | 各レベルで異なるカウント変数 |
| 条件を満たす間ループ | `WHILE` | 前置チェック、実行されない可能性あり |
| 少なくとも1回は実行 | `DO` ~ `LOOP` | 後置チェック |

---

## よくある落とし穴

| 落とし穴 | 間違い | 正しい | 理由 |
|------|---------|---------|------|
| REPEAT のネスト | `REPEAT` 内に `REPEAT` | `FOR` でネスト | COUNT が内側で上書きされる |
| FOR のステップが 0 | `FOR I, 0, 10, 0` | ステップを 0 以外に | ステップ 0 は無限ループ |
| WHILE の無限ループ | `WHILE 1` に BREAK なし | 終了条件を確認 | Emuera がエラーを報告 |
| REND/NEXT/WEND の忘れ | `REPEAT 5` ... | `REPEAT 5` ... `REND` | ループは閉じる必要がある |
| FOR 内でカウント変数を変更 | `FOR I, 0, 10` 内で `I = 5` | ループ内でカウント変数を変更しない | 引数は開始時に固定、変更は無効 |

---

## 次のステップ

| 知りたいこと | 進むべきページ |
|:---|:---|
| 条件分岐 | [条件分岐](condition.md) |
| ジャンプとラベル | [ジャンプ](jump.md) |
| 代入文 | [代入文](assignment.md) |
| REPEAT 完全API | [REPEAT ~ REND](../Reference/REPEAT.md) |
| FOR 完全API | [FOR ~ NEXT](../Reference/FOR.md) |
