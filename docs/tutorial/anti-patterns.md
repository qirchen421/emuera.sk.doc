# 第7章：アンチパターンとよくある間違い

!!! info "前提知識"

    - **Reference 分類**: [関数系（CALL 等）](../Reference/README.md#function-call) / [変数操作](../Reference/README.md#variable-operations)
    - [関数とCALL](call.md) — 関数呼び出し機構、RETURN/RETURNF
    - [FORM構文](form-syntax.md) — `%変数%`、`{式}` 展開ルール
    - [コマンド vs 式](command-vs-expression.md) — 二つの評価パス
    - [実行時メカニズム](runtime-mechanics.md) — 三段階パイプライン、REF変数ライフサイクル
    - [変数宣言システム](variable-declaration.md) — REF/OUT、#DIM、スコープ

!!! tip "この章のポイント"

    - ERABASICで最もよくある間違いは、変数スコープの誤解、FORM構文の誤用、REF/OUTの混同に起因する
    - 「動くが意図通りではない」コードは「エラーで止まる」コードより危険
    - 各アンチパターンには明確な原因があり、正しい理解で回避できる

---

## 7.1 変数スコープの誤解

### ❌ アンチパターン：LOCALは本当にローカルだと思っている

```erb
@FUNC_A
#DIM LOCAL, 10
LOCAL:0 = 42
CALL FUNC_B
PRINTVL LOCAL:0      ; ← 42だと思っているが…
```

`LOCAL`は関数ごとに独立した配列ではなく、**関数スタック上の変数**である。`CALL FUNC_B`の後でも`LOCAL:0`は42のままだが、これは`FUNC_B`が同じ名前の`LOCAL`を使っていない場合に限る。

!!! warning "LOCALの真の意味"

    `LOCAL`/`LOCALS`は予約変数名であり、各関数が独自のインスタンスを持つ。しかし、`#DIM`で宣言した変数と`LOCAL`は別物である：

    ```erb
    @FUNC_A
    #DIM LOCAL, 10       ; ← これは LOCAL:0〜9 を宣言
    LOCAL:0 = 42         ; ← LOCAL:0 に 42 を代入
    ; FUNC_B に移動しても FUNC_A の LOCAL:0 は保持される

    @FUNC_B
    #DIM LOCAL, 10       ; ← これは FUNC_B 用の別の LOCAL
    LOCAL:0 = 99         ; ← FUNC_B の LOCAL:0、FUNC_A には影響しない
    ```

### ❌ アンチパターン：DYNAMICとSTATICの違いを理解していない

```erb
@COUNTER
#DIM DYNAMIC COUNT     ; ← 毎回の呼び出しで0にリセットされる
#DIM STATIC TOTAL      ; ← 呼び出し間で値が保持される

COUNT += 1
TOTAL += 1

PRINTVL COUNT          ; 常に1
PRINTVL TOTAL          ; 呼び出しごとに増加
```

| 修飾子 | リセットタイミング | 用途 |
|--------|------------------|------|
| なし（デフォルト） | 関数呼び出しごと | 通常のローカル変数 |
| `DYNAMIC` | 関数呼び出しごと | 明示的なローカル（REFのScopeInに影響） |
| `STATIC` | リセットなし | 関数をまたぐカウンタ・キャッシュ |
| `GLOBAL` | セーブデータ間で保持 | セーブをまたぐ設定値 |

---

## 7.2 引数の影（シャドーイング）の錯覚

### ❌ アンチパターン：仮引数名とグローバル変数名の衝突

```erb
@FUNC
#DIM MONEY             ; ← 仮引数 MONEY（ローカル）
; 関数内ではこの MONEY はローカル変数として振る舞う
; グローバルの MONEY（所持金）とは別物

MONEY = 100            ; ← ローカルの MONEY を変更
; 呼び出し元の所持金 MONEY は変更されない！
```

ERABASICでは、`#DIM`で宣言された変数は関数内でローカルスコープを持つ。グローバル変数と同名の`#DIM`変数を宣言すると、関数内ではローカル変数が優先される（シャドーイング）。

!!! danger "最も危険なパターン"

    ```erb
    @PROCESS_MONEY
    #DIM MONEY         ; ← 所持金と同名のローカル変数！
    MONEY = 0          ; ← 所持金をゼロにしたつもりが、ローカル変数をゼロにしている
    ```

    **対策**：仮引数名には接頭辞や明確な名前を使用する：

    ```erb
    @PROCESS_MONEY
    #DIM L_MONEY       ; ← 接頭辞で区別
    ; または
    #DIM AMOUNT        ; ← 別の意味を持つ名前
    ```

---

## 7.3 FORM構文の誤用

### ❌ アンチパターン：`{文字列変数}`の使用

```erb
#DIMS NAME = "テスト"
PRINTFORML 名前：{NAME}       ; ← ❌ エラー！{式}は整数式のみ評価可能
```

FORM構文の`{式}`は**整数式**を評価して文字列に変換する。文字列変数を`{}`で囲むとエラーになる。

!!! tip "正しい使い方"

    ```erb
    ; 文字列変数は %変数% で展開
    PRINTFORML 名前：%NAME%

    ; 整数変数は {式} で展開
    #DIM COUNT = 5
    PRINTFORML カウント：{COUNT}
    PRINTFORML 計算：{COUNT * 2 + 1}
    ```

### ❌ アンチパターン：FORM内での副作用を期待する

```erb
PRINTFORML 結果：%CALL_FUNC()%    ; ← ❌ CALLは式の中で使えない
```

`%変数%`は**文字列式**を評価する。`CALL`はコマンドであり、式の中では使用できない。

!!! tip "正しい使い方"

    ```erb
    ; 副作用のある処理は先に実行
    CALL FUNC
    PRINTFORML 結果：%RESULTS%

    ; または式関数を使用
    PRINTFORML 結果：%FUNC_EXPR()%    ; ← #FUNCTIONS で定義された関数ならOK
    ```

### ❌ アンチパターン：三連識別子の意図しない展開

```erb
PRINTFORML ===完了===    ; ← ❌ === が CALLNAME:PLAYER に展開される！
```

FORM構文では、`***`、`+++`、`===`、`///`、`$$$`は三連識別子として特殊展開される：

| 三連記号 | 展開先 |
|---------|--------|
| `***` | `NAME:TARGET` |
| `+++` | `CALLNAME:MASTER` |
| `===` | `CALLNAME:PLAYER` |
| `///` | `NAME:ASSI` |
| `$$$` | `CALLNAME:TARGET` |

!!! tip "回避方法"

    ```erb
    ; 文字列として直接出力したい場合は、FORM構文を使わない
    PRINTL ===完了===       ; ← PRINTLはFORM展開しないので安全

    ; またはFORM構文をエスケープ（方法なし、PRINT系を使い分ける）
    ```

---

## 7.4 REF/OUTの混同

### ❌ アンチパターン：REFとOUTを同じものだと思っている

```erb
@FUNC
#DIM REF X, 0         ; ← REF：参照の受け取り（省略不可）
#DIM OUT Y, 0         ; ← OUT：出力先の受け取り（省略可能）
```

| 属性 | REF | OUT |
|------|-----|-----|
| 省略 | ❌ 不可 | ✅ 可能（NullRefTermにバインド） |
| 呼び出し前に値を設定 | 意味なし（参照先で上書き） | 意味なし（関数内で設定） |
| 用途 | 入力として既存データを参照 | 出力として結果を書き込む |
| Dimension | 宣言に従う（0=スカラー、0,0=2D） | 常に0（スカラーのみ） |

### ❌ アンチパターン：OUT引数の省略順序を間違える

```erb
@FUNC
#DIM OUT A, 0
#DIM OUT B, 0
#DIM OUT C, 0

; ❌ Bを省略したいが、構文上は(A, C)となり
;    CがBの位置にバインドされてしまう
CALL FUNC(RESULT_A, RESULT_C)
```

OUT引数は**宣言順にバインド**される。中間の引数を省略すると後続がずれる。

!!! tip "正しい設計"

    ```erb
    ; 省略される可能性の高い引数を最後に宣言する
    @FUNC
    #DIM OUT A, 0         ; 必須
    #DIM OUT B, 0         ; 必須
    #DIM OUT C, 0         ; オプション（最後に宣言）

    CALL FUNC(RESULT_A, RESULT_B)    ; Cは省略OK
    ```

### ❌ アンチパターン：REF変数の次元宣言を間違える

```erb
@FUNC
#DIM REF X, 10        ; ← ❌ エラー！REF変数にサイズは指定できない
#DIM REF Y, 0         ; ← ✅ 0は次元プレースホルダ（1次元参照）
#DIM REF Z, 0, 0      ; ← ✅ 2次元参照
```

`#DIM REF`の数字は**次元プレースホルダ**であり、配列サイズではない。0以外の値を指定するとエラーになる。

---

## 7.5 命令と式の境界の誤解

### ❌ アンチパターン：式の中でコマンドを使う

```erb
X = CALL FUNC()       ; ← ❌ CALLはコマンド、式の中では使えない
X = PRINTL "hello"    ; ← ❌ PRINTLはコマンド
```

ERABASICには**コマンドパス**と**式パス**の二つの評価経路がある。コマンドは式の中で使えず、式関数はコマンドとして使えない。

!!! tip "正しい使い分け"

    ```erb
    ; コマンドパス：副作用あり、RESULTで結果を受け取る
    CALL FUNC()
    X = RESULT

    ; 式パス：副作用なし、戻り値を直接受け取る
    X = FUNC_EXPR()    ; ← #FUNCTION で定義された関数
    ```

### ❌ アンチパターン：RESULTの汚染を忘れる

```erb
X = STRLENS(NAME)     ; ← STRLENSはRESULTを設定する
Y = RESULT             ; ← YはSTRLENSの結果ではなく、直前のRESULT
```

多くの文字列関数は`RESULT`を設定する。式の中で関数を呼んだ後、`RESULT`の値が変わっていることに注意が必要。

---

## 7.6 HTML出力の間違い

### ❌ アンチパターン：PRINTでHTMLタグを出力する

```erb
PRINTL <font color="red">警告</font>    ; ← ❌ タグがそのまま文字列として表示される
```

HTMLタグを解釈させるには`HTML_PRINT`を使う必要がある：

```erb
HTML_PRINT "<font color='red'>警告</font>"    ; ← ✅ 赤い「警告」と表示
```

!!! warning "引用符の使い方"

    ```erb
    ; ❌ ERB文字列内で二重引用符をネストできない
    HTML_PRINT "<font color="red">警告</font>"

    ; ✅ 単一引用符を使用
    HTML_PRINT "<font color='red'>警告</font>"
    ```

### ❌ アンチパターン：HTML_PRINT内でFORM構文を使う

```erb
HTML_PRINT "<b>%NAME%</b>"    ; ← ❌ HTML_PRINTはFORM展開しない
```

`HTML_PRINT`はFORM構文を展開しない。動的な値を埋め込むには、先にFORM文字列を構築する：

```erb
LOCALS '= @"<b>%NAME%</b>"    ; ← @"..." でFORM展開
HTML_PRINT LOCALS              ; ← 展開済みの文字列を渡す
```

---

## 7.7 イベント関数の誤用

### ❌ アンチパターン：イベント関数内で例外を握りつぶす

```erb
@EVENTBEFORE_ERROR
; ❌ エラーを無視して続行しようとする
RETURN 1    ; ← エラー処理をスキップすると、状態が壊れる可能性がある
```

`BEFORE_ERROR`/`BEFORE_THROW`イベントは、エラーの**ログ記録やクリーンアップ**に使用すべきであり、エラー自体を無視するために使うべきではない。

### ❌ アンチパターン：#PRI/#LATERの優先度を誤解する

```erb
@EVENTSHOP
; 通常の優先度

@EVENTSHOP #PRI
; ← 先に実行される（高優先度）

@EVENTSHOP #LATER
; ← 後に実行される（低優先度）
```

| 修飾子 | 実行順序 | 用途 |
|--------|---------|------|
| なし | 通常順 | デフォルトのイベント処理 |
| `#PRI` | 先に実行 | 初期化、前提条件の設定 |
| `#LATER` | 後に実行 | 後処理、ログ出力 |
| `#SINGLE` | 一つだけ実行 | 排他的なイベント処理 |
| `#ONLY` | これだけ実行 | 他のイベントをすべてキャンセル |

---

## 7.8 まとめ：アンチパターン一覧

| カテゴリ | アンチパターン | 正しい理解 |
|---------|--------------|-----------|
| スコープ | LOCALは完全にローカルだと思っている | LOCALは関数ごとのインスタンスだが、#DIM LOCALと予約変数LOCALは別物 |
| スコープ | DYNAMICとデフォルトは同じだと思っている | DYNAMICはScopeInに影響する（REF変数のライフサイクルに関与） |
| シャドーイング | 仮引数名とグローバル変数名の衝突を無視 | 同名の#DIM変数はローカルが優先、グローバルは変更されない |
| FORM | `{文字列変数}`を使う | `{式}`は整数式のみ、文字列は`%変数%` |
| FORM | FORM内でCALLを使う | CALLはコマンド、式の中では使えない |
| FORM | 三連識別子の展開を忘れる | `===`→CALLNAME:PLAYER等、PRINTLを使えば回避 |
| REF/OUT | REFとOUTを同じものだと思う | REF=省略不可の参照、OUT=省略可能な出力先 |
| REF/OUT | REF変数にサイズを指定する | 数字は次元プレースホルダ、0以外はエラー |
| 命令/式 | 式の中でコマンドを使う | 二つの評価パスは独立している |
| 命令/式 | RESULTの汚染を忘れる | 文字列関数等はRESULTを設定する |
| HTML | PRINTでHTMLタグを出力する | HTML_PRINTを使う必要がある |
| HTML | HTML_PRINT内でFORM展開を期待する | 先に@"..."でFORM展開してから渡す |
| イベント | BEFORE_ERRORでエラーを無視する | ログ記録やクリーンアップに使うべき |
| イベント | #PRI/#LATERの順序を誤解する | #PRI=先、#LATER=後、#SINGLE=排他、#ONLY=独占 |
