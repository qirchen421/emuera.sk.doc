# 関数安全性と METHOD_SAFE

!!! info "前提知識"

    - **Reference 分類**: [関数系（CALL 等）](../Reference/README.md#function-call)
    - [コマンド vs 式](command-vs-expression.md) — 2つの評価パス、RESULT 汚染
    - [変数宣言システム](variable-declaration.md) — #FUNCTION/#FUNCTIONS 宣言
    - [実行時メカニズム](runtime-mechanics.md) — 関数呼び出しパイプライン

!!! tip "この章のポイント"

    - `METHOD_SAFE` は関数登録時の安全フラグで、`#FUNCTION` 関数本体内で安全に呼び出せる命令をマークする
    - `METHOD_SAFE` なしの命令（`CALL`、`WAIT`、`INPUT` 等）は `#FUNCTION` 関数本体内で使用禁止 — コンパイル時にエラー
    - `METHOD_SAFE` の本質は ERABASIC の式関数に対する**副作用制限**の理解にある：式関数は副作用を持たないことが望ましいが、エンジンは強制しない — 制限しているのは**制御フローと I/O 系**の副作用のみ

---

## METHOD_SAFE とは

`METHOD_SAFE` は ERABASIC エンジンが関数登録時に設定するフラグビットで、`FunctionIdentifier.cs` で定義されています：

```csharp
public const int METHOD_SAFE = 0x00004;
// #Function中で呼び出してよい命令。WAITなど入力を伴うもの、CALLなど関数呼び出しを伴うものは不可。
```

**一言で言うと**：`METHOD_SAFE` が付いた命令は `#FUNCTION`/`#FUNCTIONS` 関数本体内で使用可能。付いていない命令は使用不可。

---

## なぜ METHOD_SAFE が必要か

ERABASIC の式中関数（`#FUNCTION`/`#FUNCTIONS`）は**純粋な計算**として設計されています — 式の評価中に呼び出され、制御フローのジャンプやブロッキング I/O を生じないことが期待されます。

式中関数内で `CALL`（別関数へのジャンプ）や `WAIT`（ユーザー入力待ち）を呼び出すと、式評価の正常な流れが壊れます：

```erb
@BAD_FUNC(X)
#FUNCTION
    WAIT            ; ❌ コンパイルエラー！WAIT に METHOD_SAFE なし
    RETURNF X * 2

@ALSO_BAD(X)
#FUNCTION
    CALL OTHER()    ; ❌ コンパイルエラー！CALL に METHOD_SAFE なし
    RETURNF X + 1
```

コンパイラは `ErbLoader` でチェックします：`#FUNCTION` 関数本体内の命令を解析する際、その命令の `IsMethodSafe()` が `false` を返せば、警告を発しその行をエラーとしてマークします。

---

## METHOD_SAFE 付きの命令

### 代表的な METHOD_SAFE 付き命令

| 分類 | 命令例 | 説明 |
|------|--------|------|
| **出力** | `PRINT`、`PRINTL`、`PRINTS`、`PRINTFORM` 等 | テキスト出力は実行フローをブロックしない |
| **書式付き出力** | `PRINTBUTTON`、`PRINTPLAIN`、`PRINTPLAINFORM` | ボタンとプレーンテキスト出力 |
| **キャラ情報表示** | `PRINT_ABL`、`PRINT_TALENT`、`PRINT_MARK` 等 | キャラ属性の表示 |
| **描画** | `DRAWLINE`、`CUSTOMDRAWLINE`、`DRAWLINEFORM` | 罫線描画 |
| **色・フォント** | `SETCOLOR`、`SETBGCOLOR`、`FONTSTYLE`、`ALIGNMENT` | 表示設定 |
| **制御フロー終了** | `ENDIF`、`ENDSELECT`、`DO` | 構文の終了マーカー |
| **データ操作** | `SPLIT`、`SAVEDATA`、`UPCHECK`、`CUPCHECK` | 文字列分割、セーブ、パラメータ変動チェック |
| **キャラ管理** | `ADDDEFCHARA` | デフォルトキャラ追加 |
| **セーブ** | `PUTFORM` | セーブ情報に書き込み |

### METHOD_SAFE なしの代表命令

| 分類 | 命令例 | 理由 |
|------|--------|------|
| **関数呼び出し** | `CALL`、`JUMP`、`GOTO` | 制御フロージャンプ、式評価を破壊 |
| **TRY 系列** | `TRYCALL`、`TRYJUMP`、`TRYGOTO` | 同上、エラー耐性付きジャンプ |
| **入力待ち** | `WAIT`、`INPUT`、`TINPUT`、`ONEINPUT` | ブロッキング I/O |
| **フロー制御** | `IF`、`SELECTCASE`、`REPEAT`、`WHILE`、`FOR` | フロー制御の**開始**マーカー（`ENDIF`、`ENDSELECT` 等の終了マーカーは METHOD_SAFE 付き） |
| **復帰** | `RETURN`、`RETURNF` | 関数復帰 |
| **セーブ読込** | `LOADDATA` | セーブ読込はグローバル状態を変更 |

---

## METHOD_SAFE と RESULT 汚染の関係

`METHOD_SAFE` と RESULT 汚染は**独立した問題**ですが、混同されがちです：

| 問題 | メカニズム | 影響 |
|------|-----------|------|
| **METHOD_SAFE** | コンパイル時チェック | 命令が `#FUNCTION` 本体内で**使用可能か**を決定 |
| **RESULT 汚染** | 実行時動作 | 式中関数がコマンドとして呼ばれると `METHOD_Instruction` が無条件で RESULT に書き込み |

ある命令が `METHOD_SAFE` を持ちつつ RESULT 汚染を起こすこともあります — 両者は矛盾しません。例えば、`STRLEN` は組み込み式中関数として `#FUNCTION` 本体内で使用可能ですが、コマンド構文で呼ばれると RESULT を汚染します。

逆に、`SETFONT` は `METHOD_SAFE` なし（純粋なコマンド、`doNormalFunction` パス）ですが、RESULT も汚染しません — そもそも RESULT に書き込まないからです。

**重要な区別**：

```
METHOD_SAFE → 「この命令は #FUNCTION 本体内で安全か？」（コンパイル時）
RESULT 汚染 → 「この命令は RESULT を意図せず上書きするか？」（実行時）
```

---

## METHOD_SAFE の実際のチェック箇所

エンジンは 2 つの場所で `METHOD_SAFE` をチェックします：

### 1. コンパイル時：ErbLoader

```csharp
// ErbLoader.cs — ERB ファイル読み込み時
if (inMethod)  // 現在 #FUNCTION 関数本体内
{
    if (!func.Function.IsMethodSafe())
    {
        ParserMediator.Warn(
            string.Format(trerror.CanNotUseInUserFunc.Text, func.Function.Name),
            nextLine, 2, true, false);
        continue;  // その行をスキップ、エラーとしてマーク
    }
}
```

これは**コンパイル時**チェック — ERB ファイルの読み込み時に使用可能な命令が確定します。

### 2. 実行時：EmueraConsole（デバッグコマンド）

デバッグコンソールでコマンドを実行する際も `IsMethodSafe()` をチェックします：

```csharp
// EmueraConsole.cs — デバッグコマンド実行
if (!func.Function.IsMethodSafe())
    throw new CodeEE(string.Format(trerror.CanNotUseInstruction.Text, func.Function.Name));
```

---

## 実践的なアドバイス

### 1. #FUNCTION では計算のみを行う

```erb
; ✅ 良い例 — 純粋な計算
@CALC_BONUS(BASE, LEVEL)
#FUNCTION
    #DIM BONUS
    BONUS = BASE * LEVEL / 100
    RETURNF BONUS

; ⚠️ 可能だが非推奨 — 出力の副作用あり
@DEBUG_PRINT_VALUE(X)
#FUNCTION
    PRINTVL X        ; METHOD_SAFE、コンパイル時は許可
    RETURNF X        ; しかし式中で呼ぶと PRINT の出力タイミングが予期しないものに

; ❌ 禁止 — 制御フローの副作用
@BAD_FUNC(X)
#FUNCTION
    CALL OTHER()     ; コンパイルエラー！CALL に METHOD_SAFE なし
    RETURNF X
```

### 2. 副作用が必要な場合はコマンド関数を使う

```erb
; ✅ コマンド関数（@ラベル、#FUNCTION なし）は任意のコマンドを使用可能
@PROCESS_DATA(KEY, VAL)
    ; CALL、WAIT、INPUT 等を自由に使用可能
    CALL SAVE_TO_DB(KEY, VAL)
    WAIT
    RETURN
```

### 3. METHOD_SAFE ≠ 「副作用なし」を理解する

`METHOD_SAFE` は**制御フローと I/O 系**の副作用のみを制限します。`METHOD_SAFE` 付きの命令でも以下の可能性があります：

- グローバル変数の変更（`SETCOLOR` が現在の色を変更等）
- テキスト出力（`PRINTL` 等）
- RESULT の変更（式中関数がコマンド構文で呼ばれた時等）

---

## 関連章

- [コマンド vs 式](command-vs-expression.md) — RESULT 汚染、CALLF、METHOD_Instruction
- [実行時メカニズム](runtime-mechanics.md) — 関数呼び出しパイプライン
- [変数宣言システム](variable-declaration.md) — #FUNCTION/#FUNCTIONS 宣言
- [CALLF 命令リファレンス](../Reference/CALLF.md) — CALLF の API ドキュメント
