# ERBファイル形式拡張

!!! info "本節の対応マニュアル"

    - [eramakerのERB書式](../eramaker/ERB_format.md) — 元のERB形式（歴史参考）
    - [Emueraの拡張書式](../Emuera/expression.md) — 行連結・特殊コメント行
    - [Emueraの拡張書式 - 関数](../Emuera/function.md) — `#FUNCTION`/`#FUNCTIONS` 宣言
    - [Emueraの拡張書式 - 変数](../Emuera/variables.md) — `#DIM`/`#DIMS`/`#DIMF` 宣言

---

## 概要

eramakerはERBファイルの基本形式を定義しました——1行に1文、`;`でコメント、`=`で代入。Emueraはこれを大幅に拡張し、ERBの表現力を飛躍的に向上させました。本チュートリアルではこれらの拡張を体系的に紹介します。

| 拡張カテゴリ | eramaker | Emuera拡張 |
|-------------|----------|-----------|
| 行連結 | ❌（1行で完結必須） | ✅ `{}` 複数行連結 |
| 行末コメント | ❌ | ✅ `; 行末コメント` |
| 特殊コメント行 | ❌ | ✅ `;!;` `;#;` |
| 条件付きコンパイル | ❌ | ✅ `[SKIPSTART]`/`[SKIPEND]` `[IF]`/`[ENDIF]` |
| プライベート変数宣言 | ❌ | ✅ `#DIM`/`#DIMS`/`#DIMF`/`#REF`/`#REFS`/`#REFF` |
| 関数型宣言 | ❌ | ✅ `#FUNCTION`/`#FUNCTIONS` |
| ローカル変数サイズ | 暗黙 | ✅ `#LOCALSIZE`/`#LOCALSSIZE`/`#LOCALFSIZE` |
| イベント修飾子 | ❌ | ✅ `#PRI`/`#LATER`/`#SINGLE`/`#ONLY` |

---

## 行連結 `{}`

eramakerでは各文を1行で書かなければなりませんでした。Emueraは`{}`行連結構文を追加し、1つの文を複数行に分割できるようになりました：

```erb
{
    #DIM CONST HOGE =
        1,2,3,4
}
; #DIM CONST HOGE = 1,2,3,4 と等価
```

### 構文規則

1. **`{` と `}` は単独で1行を占める必要がある**——空白文字以外の内容があってはなりません：

```erb
; ✅ 正しい
{
    A = 10 +
        20 +
        30
}

; ❌ エラー：{ 行に空白以外の文字がある
{ A = 10 +
    20
}
```

2. **改行位置に半角スペースが自動補完される**——分割された行は連結時、改行位置にスペースが挿入されます：

```erb
{
    PRINT Hello
    World
}
; PRINT Hello World と等価（Hello と World の間にスペースが入る）
```

3. **識別子の途中で分割できない**——改行位置にスペースが挿入されるため、変数名・関数名・文字列の途中で分割するとエラーになります：

```erb
; ❌ エラー：PRI と NT の間にスペースが入り "PRI NT" になる
{
    PRI
    NT Hello
}

; ❌ エラー：HEL と LO の間にスペースが入る
{
    STR '= "HEL
    LO"
}
```

### 処理順序

行連結はコメント処理の**前**に行われます。つまり、`{}`ブロック内のコメントは連結後の行に含まれます：

```erb
{
    #DIM CONST HOGE =
        1,2,3,4 ;コメント
        ,5,6,7,8
}
; 連結後：#DIM CONST HOGE = 1,2,3,4 ;コメント ,5,6,7,8
; ",5,6,7,8" は行末コメントの一部として無視される！
```

!!! danger "行連結内のコメントの罠"

    行連結がコメント処理より先に行われるため、`{}`ブロック内の行末コメントは後続の行が意図せず無視される原因になります。`{}`ブロック内では行末コメントの使用を避けることを推奨します。

---

## 行末コメント

Emueraは文の末尾に`;`コメントを追加できます：

```erb
A = B ;BをAに代入
MONEY += 100 ;金銭を増加
```

### 例外

`PRINT`などパラメータが単純文字列の命令では、`;`はコメントではなく文字列の一部として扱われます：

```erb
PRINT foobar;ほげほげ
; 出力：foobar;ほげほげ（; は文字列の一部）
```

---

## 特殊コメント行

### `;!;` — Emuera専用行

`;!;`で始まる行は、Emueraでは有効行（コメントではない）として扱われますが、eramakerではコメントとして無視されます：

```erb
;!;PRINTW このスクリプトはEmueraで実行できません
;!;QUIT
```

これはeramakerでのみ実行されるコードを書くのに使用できます（Emueraではこれらの行が実行され、能動的に実行を阻止できるため）。

### `;#;` — デバッグ専用行

`;#;`で始まる行はデバッグモードでのみ実行され、非デバッグモードではコメントとして扱われます：

```erb
;#;PRINTV DEBUG_VAR
;#;PRINTW デバッグ情報
```

!!! tip "デバッグ命令に;#;は不要"

    `DEBUG`系命令（`DEBUGPRINT`など）は非デバッグモードでは自動的に無視されるため、`;#;`を付ける必要はありません。同様に、デバッグ変数も非デバッグモードでは空文字列または0になります。

---

## 条件付きコンパイル

### `[SKIPSTART]` / `[SKIPEND]`

この2つのマークの間のコードはEmueraではスキップされます（実行も解析もされない）：

```erb
[SKIPSTART]
このコードはEmueraでは実行されない
[SKIPEND]
```

### `[IF]` / `[ENDIF]`

条件に基づいてコードをコンパイルするかどうかを決定します。`[IF]`の引数は定義名（`_replace.csv`で定義）であり、式ではありません：

```erb
[IF ___]
    ___ が定義されている場合のみコンパイル
[ENDIF]
```

### `;!;` との組み合わせ

`;!;`と`[SKIPSTART]`/`[SKIPEND]`を組み合わせて、Emueraまたはeramakerでのみ実行されるコードを書けます：

```erb
; Emuera以外でのみ実行
;!;[SKIPSTART]
PRINTW このスクリプトはEmuera以外では実行できません
QUIT
;!;[SKIPEND]
```

---

## `#` プリプロセスディレクティブ

`#`で始まる行はプリプロセスディレクティブで、関数定義内で使用し、変数の宣言や関数属性の指定などを行います。これらは解析段階で処理され、実行時の文ではありません。

### プライベート変数宣言

関数内で宣言された変数はその関数内でのみ参照可能です：

```erb
@MY_FUNCTION
#DIM L_COUNT          ; 整数プライベート変数、デフォルト値0
#DIM L_ARR, 10        ; 整数プライベート配列、10要素
#DIMS L_NAME          ; 文字列プライベート変数、デフォルト値""
#DIMS L_NAMES, 5      ; 文字列プライベート配列、5要素
#DIMF L_SCORE         ; 実数プライベート変数、デフォルト値0.0
#DIMF L_SCORES, 3     ; 実数プライベート配列、3要素
```

#### インライン初期化

プライベート変数は宣言時に初期化できます：

```erb
#DIM L_VALUE = 42
#DIM L_ARR, 5 = 10, 20, 30, 40, 50
#DIMS L_GREETING = "Hello"
#DIMS L_NAMES, 3 = "Alice", "Bob", "Charlie"
```

#### 定数宣言

`CONST`キーワードで定数を宣言します：

```erb
#DIM CONST MAX_LEVEL = 99
#DIM CONST ELEMENTS = 4
#DIMS CONST GAME_TITLE = "My Game"
```

#### 参照変数宣言

`#REF`/`#REFS`/`#REFF`で参照変数（エイリアス変数）を宣言し、別の変数を指します：

```erb
#REF L_REF = TARGET    ; L_REF は TARGET のエイリアス
#REFS L_NAME_REF = NAME:TARGET
```

!!! warning "プライベート変数の命名規則"

    - `#DIM`/`#DIMS`/`#DIMF` の `#` は省略不可（`DIM` と書いてはいけない）
    - 変数名は数字で始めてはいけない
    - A-Zの単一文字変数名はエンジン予約変数、プライベート変数名には使用不可
    - プライベート変数名は既存のグローバル変数名と競合してはいけない

### 関数型宣言

`#FUNCTION`と`#FUNCTIONS`は関数を**式関数**として宣言し、式中で関数のように呼び出せるようにします：

```erb
@IS_POSITIVE(A)
#FUNCTION
IF A > 0
    RETURNF 1
ELSE
    RETURNF 0
ENDIF

@GET_GREETING(NAME)
#FUNCTIONS
RETURNF "こんにちは、" + NAME + "！"
```

- `#FUNCTION` — 整数（Int64）を返す式関数
- `#FUNCTIONS` — 文字列（String）を返す式関数

!!! warning "`#FUNCTION`/`#FUNCTIONS` の制限"

    - 関数ラベル行（`@関数名`）の後、最初の実行文の前に記述する必要がある
    - 複数の `#` 行を連続して記述可能（例：`#DIM` → `#FUNCTION`）、順序は問わない
    - 空行とコメント行（`;`）は `#` 行の連続に影響しない
    - システム関数（`@SHOW_SHOP`など）やイベント関数（`@EVENTFIRST`など）には使用不可
    - `#PRI`/`#LATER`/`#SINGLE`/`#ONLY` と同時には使用不可
    - 関数名は数字で始めてはいけない
    - 戻り値には `RETURN` ではなく `RETURNF` を使用する

### ローカル変数サイズ指定

`#LOCALSIZE`/`#LOCALSSIZE`/`#LOCALFSIZE`は`LOCAL`/`LOCALS`/`LOCALF`配列のサイズを指定します：

!!! warning "LOCAL/LOCALS は obsolete"

    `LOCAL` と `LOCALS` は過去の設計であり、使用は推奨されません。`#DIM`/`#DIMS` でプライベート変数を宣言してください。
    新規ゲーム開発では、`VariableSize.csv` で `LOCAL` と `LOCALS` の要素数をともに `-1` に設定して無効化し、`#DIM`/`#DIMS` への移行を推奨します。

```erb
@MY_FUNCTION
#LOCALSIZE 100        ; LOCAL 配列のサイズを100に（デフォルトは設定に依存）
#LOCALSSIZE 50        ; LOCALS 配列のサイズを50に
#LOCALFSIZE 10        ; LOCALF 配列のサイズを10に
```

!!! info "イベント関数では無効"

    イベント関数で`#LOCALSIZE`などを指定すると無視されます。イベント関数には複数の定義がある可能性があり、LOCAL変数のサイズはすべての定義の中の最大値で決まるためです。

### イベント修飾子

イベント関数には修飾子を使用して呼び出し順序と方法を制御できます：

| 修飾子 | 効果 |
|-------|------|
| `#PRI` | 優先的に呼び出し（他のイベント関数より前に） |
| `#LATER` | 遅延して呼び出し（他のイベント関数より後に） |
| `#SINGLE` | 1つだけ呼び出し（最初に見つけたもので停止） |
| `#ONLY` | この関数のみ呼び出し（同名の他のイベント関数をすべて無視） |

```erb
@EVENTFIRST
#PRI
; この関数は他の @EVENTFIRST より先に呼び出される
PRINTW 優先初期化

@EVENTFIRST
; この関数は #PRI の後に呼び出される
PRINTW 通常初期化

@EVENTFIRST
#LATER
; この関数は通常関数の後に呼び出される
PRINTW 遅延初期化
```

!!! warning "イベント修飾子の排他規則"

    - `#ONLY` は `#PRI`/`#LATER`/`#SINGLE` と排他——`#ONLY` を指定すると他の修飾子は無視される
    - `#PRI` と `#LATER` は同時に指定可能（関数は両方のリストに追加される）
    - これらの修飾子はイベント関数にのみ使用可能、ユーザー定義関数やシステム関数には使用不可

---

## 完全な例

以下は複数の拡張を組み合わせた関数の例です：

```erb
@CALC_DAMAGE(ATTACKER, DEFENDER, SKILL_ID)
#FUNCTION
#DIM CONST BASE_MULTIPLIER = 100
#DIM L_ATK_POWER
#DIM L_DEF_POWER
#DIM L_DAMAGE
#LOCALSIZE 10

L_ATK_POWER = ABL:ATTACKER:0 * BASE_MULTIPLIER / 100
L_DEF_POWER = ABL:DEFENDER:1 * BASE_MULTIPLIER / 100

{
    L_DAMAGE = L_ATK_POWER - L_DEF_POWER
        + SKILL_ID * 10
}

IF L_DAMAGE < 1
    L_DAMAGE = 1
ENDIF

RETURNF L_DAMAGE
```

---

## eramakerとの互換性

| 機能 | eramaker | Emuera | 互換方案 |
|------|----------|--------|---------|
| 行連結 | ❌ | ✅ `{}` | eramakerは`{`/`}`行を無視 |
| 行末コメント | ❌ | ✅ `;` | eramakerは`;`以降を文字列として扱う |
| `;!;` | コメント | 有効行 | eramakerはスキップ、Emueraは実行 |
| `;#;` | コメント | デバッグ行 | eramakerはスキップ |
| `#DIM` 等 | ❌ | ✅ | eramakerはエラー |
| `#FUNCTION` | ❌ | ✅ | eramakerはエラー |
| `[SKIPSTART]` | ❌ | ✅ | eramakerは無視 |

eramakerとEmueraの両方で動作させる必要がある場合は、`;!;`と`[SKIPSTART]`/`[SKIPEND]`を組み合わせて使用できます：

```erb
; Emuera専用コード
;!;SAVESTR:0 = \%RESULT\%

; eramaker専用コード
;!;[SKIPSTART]
SAVESTR:0 = %RESULTS%
;!;[SKIPEND]
```

---

## 次のステップ

| 知りたいこと | 参照 |
|:---|:---|
| 代入文の詳細 | [代入文](assignment.md) |
| イベント関数の仕組み | [イベント関数](event-functions.md) |
| 変数と宣言 | [ファイルタイプ](file-types.md) |
| システムフロー図 | [フロー図](../Emuera/system_flow.md) |
