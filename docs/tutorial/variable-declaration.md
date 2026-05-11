# 変数宣言システム

!!! info "本節対応マニュアル"

    - [ユーザー定義変数](../Emuera/user_defined_variables.md) — #DIM 宣言仕様
    - [ヘッダーファイル ERH](../Emuera/ERH.md) — グローバル変数宣言
    - [関数定義](../Emuera/function.md) — 関数引数と参照渡し

!!! tip "前提知識"

    本節は[値・型・変数](values-types.md)の発展編です。3タイプ体系（Int/Str/Float）と基本的な `#DIM` 宣言を先に理解してください。

---

## 概要

ERABASICの変数宣言システムは一見したよりもはるかに複雑です。`#DIM`/`#DIMS`/`#DIMF` は単に「変数を宣言する」だけでなく、複数の修飾キーワード（CONST/DYNAMIC/STATIC/GLOBAL/SAVEDATA/CHARADATA/REF/OUT）をサポートし、変数の**ライフサイクル**、**可視性**、**永続化**、**参照セマンティクス**を決定します。

| 修飾キーワード | 作用 | 適用範囲 |
|-----------|------|---------|
| `CONST` | 定数、変更不可 | グローバル/プライベート |
| `DYNAMIC` | 動的割り当て、関数戻り時に解放 | プライベートのみ |
| `STATIC` | 静的、呼び出し間で値を保持 | プライベートのみ |
| `GLOBAL` | セーブ跨ぎグローバル | グローバルのみ（ERH） |
| `SAVEDATA` | セーブデータに保存 | グローバルのみ（ERH） |
| `CHARADATA` | キャラクターデータ | グローバルのみ（ERH） |
| `REF` | 参照型変数 | グローバル/プライベート |
| `OUT` | 省略可能参照引数（REF を暗黙に含む） | プライベートのみ |

---

## 宣言位置とスコープ

ERABASICの変数宣言は3つの位置に分散しており、処理順序は早いものから順に：

```
CSV プリプロセス（最初に処理）
├── variable_size.csv    → 組み込み変数配列サイズ
├── _replace.csv         → 変数名置換マッピング
└── chara/*.csv          → キャラクターデータ定義

ERH ヘッダーファイル宣言（ERB より前に処理）
├── #DIM X, 100          → グローバル整数変数
├── #DIM CONST MAX = 100 → グローバル定数
├── #DIM GLOBAL G_VAR    → セーブ跨ぎグローバル変数
├── #DIM SAVEDATA S_VAR  → セーブ保存変数
└── #DIM CHARADATA C_VAR → キャラクターデータ変数

ERB 関数内宣言（関数レベルプライベート）
├── #DIM L_TEMP, 10      → プライベート整数変数
├── #DIM DYNAMIC L_TMP   → 動的プライベート変数
├── #DIM STATIC L_CACHE  → 静的プライベート変数
├── #DIM REF L_ARR, 0    → 配列参照
├── #REF L_ELEM          → スカラー参照
└── #DIM OUT L_OUT       → 省略可能 OUT 引数
```

!!! warning "#行の位置ルール"

    すべての `#` で始まるプリプロセッサ行は、`@関数名(...)` ラベル行の直後、最初の実行文の前に記述する必要があります：

    ```erb
    @MY_FUNC(ARG:0)
    #DIM L_COUNT, 10          ; ✅ @ 行の直後
    #DIMS L_NAME              ; ✅ 直前の # 行の直後
        L_COUNT:0 = ARG:0     ; ✅ 最初の実行文
        ; #DIM L_X, 5         ; ❌ 関数本体の途中には書けない
    RETURN
    ```

---

## 配列と次元

### 次元宣言

`#DIM` の後の数字は配列の次元とサイズを決定します：

| 宣言 | 次元 | サイズ | 説明 |
|------|------|------|------|
| `#DIM X` | 0 | 1 | スカラー（サイズ省略時は自動的に1） |
| `#DIM X, 100` | 1 | 100 | 1次元配列 |
| `#DIM X, 10, 20` | 2 | 10×20 | 2次元配列 |
| `#DIM X, 10, 20, 5` | 3 | 10×20×5 | 3次元配列（最大） |

### インライン初期化

1次元配列はインライン初期化をサポートしますが、多次元配列はサポートしません：

```erb
; ✅ 1次元配列：サイズ自動推論
#DIM DATA = 1, 2, 3
; DATA:0=1, DATA:1=2, DATA:2=3, 要素数は3

; ✅ 1次元配列：サイズ指定 + 部分初期化
#DIM DATA2, 100 = 4, 5, 6
; DATA2:0=4, DATA2:1=5, DATA2:2=6, DATA2:3~99=0

; ✅ 文字列配列の初期化
#DIMS NAMES = "Alice", "Bob", "Charlie"

; ❌ 多次元配列はインライン初期化をサポートしない
; #DIM MAT, 5, 5 = 1, 2, 3, ...  ← エラー！
```

多次元配列は行ごとに代入する必要があります：

```erb
#DIM MAT, 5, 5
MAT:0:0 = 256, 0, 0, 0, 0
MAT:1:0 = 0, 256, 0, 0, 0
```

!!! danger "初期値の数が指定サイズを超えてはならない"

    ```erb
    #DIM HIGE, 1 = 7, 8, 9    ; ❌ エラー：3つの初期値が1要素を超えている
    ```

---

## CONST — 定数

`CONST` は変更不可の定数を宣言します。初期化が必須で、途中で代入できません：

```erb
#DIM CONST MAX_LEVEL = 99
#DIM CONST ELEMENTS = 4
#DIMS CONST GAME_TITLE = "My Game"
```

### CONST の制約

- **初期化が必須** — 宣言のみで代入なしては不可
- **変更不可** — 後続の代入はエラーになる
- **1次元のみ** — 多次元定数配列はサポートしない
- **排他** — GLOBAL/SAVEDATA/REF/DYNAMIC と同時使用不可

```erb
; ✅ 正しい
#DIM CONST MAX = 100
#DIMS CONST TITLE = "Era Game"

; ❌ エラー：初期値がない
; #DIM CONST X

; ❌ エラー：DYNAMIC と同時使用不可
; #DIM CONST DYNAMIC X = 1
```

---

## DYNAMIC — 動的変数

`DYNAMIC` 変数は関数の**呼び出し時に割り当て**られ、関数の**戻り時に解放**されます：

```erb
@RECURSIVE_FUNC(ARG:0)
#DIM DYNAMIC L_SUM
    L_SUM += ARG:0
    IF ARG:0 > 0
        CALL RECURSIVE_FUNC(ARG:0 - 1)
    ENDIF
    PRINTFORML ARG:0 = {ARG:0}, L_SUM = {L_SUM}
RETURN
```

### DYNAMIC vs 非DYNAMIC

| 特徴 | DYNAMIC | 非DYNAMIC（デフォルト） |
|------|---------|-------------------|
| 割り当てタイミング | 関数呼び出し時 | プログラム起動時 |
| 解放タイミング | 関数戻り時 | プログラム終了まで解放されない |
| 再帰時 | 各呼び出しレベルで独立したコピー | すべての呼び出しで同じ変数を共有 |
| 初期値 | 呼び出しごとにデフォルト値にリセット | 前回の呼び出し時の値を保持 |
| パフォーマンス | やや遅い（割り当て/解放が必要） | やや速い |

### 再帰シナリオ

DYNAMIC変数の核心的な用途は**再帰関数**です。DYNAMICがないと、再帰呼び出しで1つ上のレベルの変数値が上書きされます：

```erb
; ❌ DYNAMIC なし：再帰時に変数が上書きされる
@BAD_RECURSE(ARG:0)
#DIM L_SUM
    L_SUM += ARG:0
    ; 2回目の再帰呼び出しで同じ L_SUM が変更される
    IF ARG:0 > 0
        CALL BAD_RECURSE(ARG:0 - 1)
    ENDIF
    ; この時点で L_SUM の値は再帰によって変更されている
RETURN

; ✅ DYNAMIC あり：各再帰レベルで独立したコピー
@GOOD_RECURSE(ARG:0)
#DIM DYNAMIC L_SUM
    L_SUM += ARG:0
    IF ARG:0 > 0
        CALL GOOD_RECURSE(ARG:0 - 1)
    ENDIF
    ; 各再帰レベルの L_SUM は独立
RETURN
```

!!! warning "DYNAMIC と RESTART"

    `RESTART` 命令は「関数の先頭に戻る」だけで、DYNAMIC変数は**リセットしません**。関数が戻って再度呼び出された場合にのみリセットされます。

### DYNAMIC の排他制約

CONST、STATIC、GLOBAL、SAVEDATA、CHARADATA、REF、OUT と同時使用できません。

---

## STATIC — 静的プライベート変数

`STATIC` 変数は関数呼び出し間で**値を保持**しますが、宣言された関数内でのみ参照可能です：

```erb
@COUNTER
#DIM STATIC L_COUNT
    L_COUNT += 1
    PRINTFORML {L_COUNT}回目の呼び出し
RETURN
```

```
1回目の呼び出し
2回目の呼び出し
3回目の呼び出し
```

### STATIC vs 非DYNAMIC vs DYNAMIC

| 特徴 | STATIC | 非DYNAMIC（デフォルト） | DYNAMIC |
|------|--------|-------------------|---------|
| 呼び出し間で値を保持 | ✅ | ✅ | ❌（毎回リセット） |
| 再帰時の独立性 | ❌（共有） | ❌（共有） | ✅（独立） |
| 可視性 | 宣言された関数のみ | 宣言された関数のみ | 宣言された関数のみ |

STATIC とデフォルト（非DYNAMIC）の違いは**セマンティクスの明確性**にあります：STATIC は「呼び出し間で値を保持する必要がある」ことを明示しますが、デフォルトの動作も値を保持するものの、それは意図的でない可能性があります。

### STATIC の排他制約

DYNAMIC、REF、OUT と同時使用できません。

---

## グローバル変数宣言（ERH）

ERH ヘッダーファイルで宣言された変数は**グローバル変数**であり、すべての ERB ファイルからアクセスできます：

```erb
; VARIABLE.ERH
#DIM GAME_STATE, 10            ; グローバル整数配列
#DIMS GAME_NAME                ; グローバル文字列変数
#DIMF GAME_SCORE               ; グローバル浮動小数点変数（Skia追加）
#DIM CONST MAX_PARTY = 6       ; グローバル定数
```

### グローバル変数専用の修飾子

以下の修飾キーワードは ERH 内でのみ使用できます：

#### GLOBAL — セーブ跨ぎグローバル

`GLOBAL` 変数の値は**すべてのセーブデータ間で共有**され、`global.sav` ファイルに保存されます：

```erb
; VARIABLE.ERH
#DIM GLOBAL TOTAL_PLAY_COUNT     ; セーブ跨ぎ累計プレイ回数
#DIMS GLOBAL LAST_SAVE_NAME      ; セーブ跨ぎ最終セーブ名
```

- `SAVEGLOBAL` で保存、`LOADGLOBAL` で読み込み
- セーブデータのロードによる変更はない

#### SAVEDATA — セーブ保存

`SAVEDATA` 変数の値は**セーブデータに保存・ロード**されます：

```erb
; VARIABLE.ERH
#DIM SAVEDATA QUEST_FLAGS, 100   ; クエストフラグ、セーブデータに保存
#DIMS SAVEDATA SCENE_MEMO        ; シーンメモ、セーブデータに保存
```

- セーブ書き込み時に自動保存
- セーブロード時に自動復元

#### CHARADATA — キャラクターデータ

`CHARADATA` 変数は**各キャラクターごとに独立して保存**され、`TALENT`、`ABL` などの組み込みキャラ変数に似ています：

```erb
; VARIABLE.ERH
#DIM CHARADATA SKILL_LEVEL, 10   ; 各キャラクターのスキルレベル
#DIMS CHARADATA NICKNAME         ; 各キャラクターのニックネーム
```

- アクセス方法：`SKILL_LEVEL:キャラ番号:スキル番号`
- キャラクターの追加/削除に伴い割り当て/解放

### グローバル修飾子の排他表

| | CONST | GLOBAL | SAVEDATA | CHARADATA | REF |
|---|---|---|---|---|---|
| CONST | — | ❌ | ❌ | ❌ | ❌ |
| GLOBAL | ❌ | — | ❌ | ❌ | ❌ |
| SAVEDATA | ❌ | ❌ | — | ✅ | ❌ |
| CHARADATA | ❌ | ❌ | ✅ | — | ❌ |
| REF | ❌ | ❌ | ❌ | ❌ | — |

`SAVEDATA` と `CHARADATA` は同時使用可能で、「セーブデータに保存されるキャラクターデータ」を意味します。

---

## REF — 参照型変数 { #ref }

`REF` は参照型変数を宣言し、参照変数を操作すると**実際に操作されるのは参照先のターゲット変数**です。

### 配列参照

```erb
@PROCESS_ARRAY
#DIM REF L_ARR, 0            ; 1次元配列参照
    REPEAT VARSIZE("L_ARR")
        L_ARR:COUNT *= 2     ; 渡された元の配列を変更
    REND
RETURN

; 呼び出し
#DIM DATA, 5 = 1, 2, 3, 4, 5
CALL PROCESS_ARRAY(DATA)
; 呼び出し後 DATA は 2, 4, 6, 8, 10 になる
```

### REF の次元セマンティクス

`#DIM REF` の後の数字は**次元プレースホルダ**であり、配列サイズではありません。数字は 0 でなければなりません：

| 宣言 | カンマ数 | Dimension | 実際のサイズ |
|------|--------|-----------|---------|
| `#DIM REF X` | 0 | 1 | 渡された引数で決定 |
| `#DIM REF X, 0` | 1 | 1 | 渡された引数で決定 |
| `#DIM REF X, 0, 0` | 2 | 2 | 渡された引数で決定 |

```erb
; ✅ 正しい：0 は次元プレースホルダ
#DIM REF L_1D, 0
#DIM REF L_2D, 0, 0

; ❌ エラー：0以外の値は「参照型変数は配列サイズを指定できない」エラー
; #DIM REF L_ARR, 10
```

### スカラー参照

`#REF`/`#REFS`/`#REFF` はスカラー参照（Dimension=0）を宣言し、単一の変数要素を参照します：

```erb
@MODIFY_ELEM
#REF L_REF                   ; 整数スカラー参照
    L_REF += 100             ; 渡された元の要素を変更
RETURN

; 呼び出し
CALL MODIFY_ELEM(TALENT:0:23)
; TALENT:0:23 が変更される
```

| 宣言 | 型 | Dimension | 参照粒度 |
|------|------|-----------|---------|
| `#REF X` | Int | 0 | スカラー要素 |
| `#REFS X` | Str | 0 | スカラー要素 |
| `#REFF X` | Float | 0 | スカラー要素 |
| `#DIM REF X, 0` | Int | 1 | 配列全体 |
| `#DIMS REF X, 0` | Str | 1 | 配列全体 |
| `#DIMF REF X, 0` | Float | 1 | 配列全体 |

---

## OUT — 省略可能参照引数

`OUT` は REF の特殊な形式で、呼び出し時に省略可能です。省略した場合、関数内での読み書きは暗黙に無視されます。

```erb
@DIVIDE(ARG:0, ARG:1)
#DIM OUT L_QUOTIENT           ; 省略可能整数 OUT 引数
#DIM OUT L_REMAINDER          ; 省略可能整数 OUT 引数
    L_QUOTIENT = ARG:0 / ARG:1
    L_REMAINDER = ARG:0 % ARG:1
RETURN

; 呼び出し1：商のみ必要
CALL DIVIDE(17, 5)
PRINTVL RESULT                 ; 3（RETURN が返す RESULT）

; 呼び出し2：商と余数が必要
#DIM L_Q
#DIM L_R
CALL DIVIDE(17, 5, L_Q, L_R)
PRINTFORML 商={L_Q}、余り={L_R}   ; 商=3、余り=2
```

### OUT の動作

| 呼び出し方法 | OUT 引数のバインド | 関数内での書き込み | 関数内での読み取り |
|---------|-------------|-----------|-----------|
| 変数を渡す | `ElementRefInfo` → 参照ターゲット変数 | ターゲット変数に書き込み | ターゲット変数から読み取り |
| 省略 | `NullRefTerm`（ブラックホール） | 書き込みは破棄 | デフォルト値を返す |

### OUT の制約

- Dimension=0 が強制される（スカラー参照）
- 宣言内の次元数字は直接破棄される
- REF セマンティクスを暗黙に含み、REF と同時使用不可
- CONST、GLOBAL、SAVEDATA、CHARADATA、STATIC と同時使用不可

```erb
; ✅ 正しい
#DIM OUT L_OUT
#DIM OUT L_OUT2, 0           ; 等価（,0 は無視される）

; ⚠️ 数字は無視される
#DIM OUT L_OUT3, 1           ; 1 は無視され、Dimension=0 のまま
```

---

## 関数シグネチャと変数宣言の関係

ERABASICの関数シグネチャと変数宣言には独自の関係があり、これが主流言語との最も根本的な違いです。

### シグネチャは参照、本体内で宣言

主流言語では、関数シグネチャが同時に引数を宣言します（`void f(int x)`）。ERABASICでは、シグネチャ内の名前は**参照**に過ぎず、変数は `#DIM` で宣言する必要があります：

```erb
@CALC(X, Y)
#DIM X                        ; ← 変数 X を宣言、シグネチャが参照できる
#DIM Y                        ; ← 変数 Y を宣言
#FUNCTION
    RETURNF X * Y
```

シグネチャが参照する変数に `#DIM` 宣言がない場合、解析時にエラーになります。

### 名前付き引数 vs ARG 配列

関数引数には2つの渡し方があります：

```erb
; 方法1：組み込み ARG 配列を使用
@FUNC(ARG:0, ARG:1)
    PRINTFORML {ARG:0} + {ARG:1} = {ARG:0 + ARG:1}
RETURN

; 方法2：名前付き引数を使用（推奨）
@FUNC(L_A, L_B)
#DIM L_A
#DIM L_B
    PRINTFORML {L_A} + {L_B} = {L_A + L_B}
RETURN
```

**名前付き引数と ARG 配列は完全に独立したエンティティ**です：

```erb
@FUNC(L_VAL, ARG:2 = 0)
#DIM L_VAL
    ; L_VAL は第1引数の値を受け取る
    ; ARG:2 は第3引数の値を受け取る
    ; ARG:0 と ARG:1 は影響を受けない（独立エンティティ）

    PRINTFORML L_VAL={L_VAL}, ARG:2={ARG:2}
    PRINTFORML ARG:0={ARG:0}, ARG:1={ARG:1}
RETURN

; 呼び出し：CALL FUNC(100, 200, 300)
; 出力：L_VAL=100, ARG:2=300
; 出力：ARG:0=0, ARG:1=0（代入されていない）
```

!!! danger "名前付き引数は ARG 要素のエイリアスではない"

    ```erab
    ; ❌ 誤解：@FUNC(AMOUNT) は「AMOUNT は ARG:0 のエイリアス」を意味する
    ; ✅ 正解：@FUNC(AMOUNT) は「第1引数の値が AMOUNT という名前の #DIM 変数に書き込まれる」を意味する
    ```

    名前付き引数と ARG[n] は完全に独立しています。関数シグネチャ内の引数位置は値がどの変数に書き込まれるかを決定しますが、ARG 配列に自動的に充填されることはありません。

### 「引数のシャドウイング」は存在しない

C/Java/Python のバックグラウンドを持つ開発者はよく、`#DIM` で同名変数を宣言すると関数引数を「シャドウイング」するという認識ミスをします。**これはERABASICでは起こり得ません**。

```erb
@FUNC(AMOUNT)
#DIM DYNAMIC AMOUNT           ; ← 「シャドウイング」ではなく、「AMOUNT 変数を作成」
    IF AMOUNT == 0             ; ← 読み取っているのは #DIM が作成した変数
        ; ...
    ENDIF
RETURN
```

**理由**：ERABASICの識別子辞書には1つの検索エントリしかありません。シグネチャからでも関数本体からでも `AMOUNT` にアクセスすると、同じ `UserDefinedVariableToken` に解決されます。「引数変数」と「プライベート変数」という2つの異なるエンティティは存在しません。

| 主流言語（誤った移行） | ERABASIC の実際の動作 |
|---|---|
| `void f(int x) { int x = 0; }` → コンパイルエラーまたはシャドウイング | `@F(X)` は変数を作成せず、`#DIM X` が唯一の変数を作成 |
| 引数 = 関数シグネチャが記憶域を割り当て | 引数名 = 識別子参照、記憶域なし |
| ローカル宣言は新しい変数を作成 | `#DIM` は**引数名が使用する**変数を作成 |

---

## VARIADIC — 可変引数

`VARIADIC` キーワードは可変数の引数を宣言し、最後の引数にのみ修飾できます：

```erb
@SUM_ALL(VARIADIC ARG:0)
#DIM DYNAMIC L_TOTAL
    L_TOTAL = 0
    REPEAT ARGLEN()
        L_TOTAL += ARG:COUNT
    REND
    RESULT = L_TOTAL
RETURN

; 呼び出し
CALL SUM_ALL(1, 2, 3, 4, 5)
PRINTVL RESULT                 ; 15
```

### VARIADIC 構文

| 宣言 | 型 | 説明 |
|------|------|------|
| `VARIADIC ARG:0` | Int | 可変整数引数 |
| `VARIADIC ARGS:0` | Str | 可変文字列引数 |
| `VARIADIC ARGF:0` | Float | 可変浮動小数点引数（Skia追加） |

### 固定引数 + 可変引数

固定引数にプライベート変数、可変引数に ARG 配列を使用することを推奨します：

```erb
@PROCESS(L_MODE, VARIADIC ARG:0)
#DIM L_MODE
    ; L_MODE は第1固定引数を受け取る
    ; ARG:0...ARG:(ARGLEN()-1) は可変引数を受け取る
    PRINTFORML モード={L_MODE}、引数数={ARGLEN()}
RETURN

; 呼び出し
CALL PROCESS(1, 10, 20, 30)
; L_MODE=1, ARG:0=10, ARG:1=20, ARG:2=30, ARGLEN()=3
```

!!! warning "VARIADIC の制約"

    - 最後の引数にのみ修飾可能
    - 型は ARG/ARGS/ARGF のいずれかでなければならない
    - 同じ型の ARG を固定引数と可変引数で同時に使用できない
    - `#DIM VARIADIC` は存在しない — VARIADIC は関数引数宣言キーワードであり、#DIM の修飾子ではない
    - `ARGLEN()` は関数であり、括弧付きで呼び出す必要がある

---

## #LOCALSIZE — ローカル変数サイズ

`#LOCALSIZE`/`#LOCALSSIZE`/`#LOCALFSIZE` は LOCAL/LOCALS/LOCALF 配列のサイズを指定します：

!!! warning "LOCAL/LOCALS は obsolete"

    `LOCAL` と `LOCALS` は過去の設計であり、使用は推奨されません。`#DIM`/`#DIMS` でプライベート変数を宣言してください。
    新規ゲーム開発では、`VariableSize.csv` で `LOCAL` と `LOCALS` の要素数をともに `-1` に設定して無効化し、`#DIM`/`#DIMS` への移行を推奨します。

```erb
@MY_FUNC
#LOCALSIZE 100              ; LOCAL 配列のサイズを100に
#LOCALSSIZE 50              ; LOCALS 配列のサイズを50に
#LOCALFSIZE 10              ; LOCALF 配列のサイズを10に（Skia追加）
```

!!! info "イベント関数では無効"

    イベント関数で `#LOCALSIZE` 等を指定しても無視されます。イベント関数は複数の定義を持つ可能性があり、LOCAL 変数のサイズはすべての定義中の最大値で決定されるためです。

---

## 変数命名の禁止事項

| 禁止事項 | 理由 | 正しい代替 |
|------|------|---------|
| `A` ~ `Z`（26個） | エンジン組み込み汎用変数 | `L_A`, `L_COUNT` |
| `DAY`, `MONEY`, `TIME` | システム状態変数 | `L_DAY`, `L_MONEY` |
| `TARGET`, `ASSI`, `MASTER` | キャラ番号変数 | `L_TARGET` |
| `LOCAL`, `ARG`, `GLOBAL` | エンジン拡張変数（LOCAL/LOCALS は obsolete） | `L_LOCAL`, `L_ARG`、または `#DIM`/`#DIMS` を使用 |
| `REF`, `OUT` | #DIM 修飾キーワード | `_ref`, `_out`, `L_OUT` |
| 命令と同名 | 例：`PRINTFORM`, `CALL`, `RETURN` | プレフィックスを追加 |
