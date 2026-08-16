# コマンド vs 式 — 2つの評価パスの根本的な違い

!!! info "このセクションに対応するリファレンス"

    - **Reference 分類**: [関数シリーズ（CALL など）](../Reference/README.md#function-call)
    - [式関数](../Emuera/user_defined_in_expression_function.md) — #FUNCTION/#FUNCTIONS の完全仕様
    - [CALLF 命令リファレンス](../Reference/CALLF.md) — CALLF の API ドキュメント

---

## 問題の発端

C/Java/Python などの言語から来た場合、次のようなコードを自然に書いてしまうかもしれません：

```erb
STRLEN("hello")
```

そして次のようなエラーを受け取ります：

```
命令の直後は半角スペースまたはタブでなければなりません
（命令后必须是半角空格或制表符）
```

**なぜ `STRLEN("hello")` は単独の文として使えないのか？** 答えは ERABASIC のパーサの層にあります。

---

## パーサの規則

ERABASIC のパーサは字句解析の段階で「コマンド」と「式」を厳密に区別します。

### コマンド行の解析規則

パーサが関数名で始まる行に出会うと、関数名の**直後の最初の文字**をチェックします：

```
関数名 + スペース/タブ/セミコロン → コマンド行（InstructionLine）
関数名 + (                  → 不正！→ InvalidLine
関数名 + その他               → 不正！→ InvalidLine
```

この規則は [`LogicalLineParser.cs`](file:///d:/emuera/emuera_lazyloading_selfmodified_version/Emuera/Runtime/Script/Parser/LogicalLineParser.cs) で定義されています：

```csharp
var current = stream.Current;
if (current != ';' && current != ' ' && current != '\t' && ...)
{
    return new InvalidLine(position, errMes);
}
```

**核心規則**：コマンド行では、関数名の直後には**スペース、タブ、またはセミコロンが続かなければなりません**。`(` は解析失敗を引き起こします。

### 2つの構文の対照

| | コマンド構文 | 式構文 |
|------|---------|-----------|
| **形式** | `FUNC arg1, arg2, arg3` | `FUNC(arg1, arg2, arg3)` |
| **区切り文字** | 関数名の直後は**スペース**、引数間はカンマ | 関数名の直後は `( `、引数間はカンマ、末尾は `)` |
| **出現位置** | 独立した行（文） | 式の中（代入の右辺、条件、演算…） |
| **引数解析** | `ArgumentBuilder` の種類に依存 | 統一的に式パーサで解析 |

---

## 実例デモ

### 正しい使い方

```erb
; ✅ コマンド構文（スペース区切り）— 独立した文として
STRLEN "hello"
PRINTL 結果

; ✅ 式構文（括弧）— 式の中で
X = STRLEN("hello")
IF STRLEN("hello") > 5
    PRINTL 長い文字列
ENDIF

; ✅ CALL コマンド — カンマ区切りで引数を渡す
CALL MY_FUNC(1, 2)
```

### 間違った使い方

```erb
; ❌ 括弧構文を独立したコマンドとして → 解析失敗！
STRLEN("hello")
; → InvalidLine: "命令の直後は半角スペースまたはタブでなければなりません"

; ❌ 同様に、カスタム式関数もダメ
@CALC(X, Y)
#FUNCTION
    RETURNF X * Y

CALC(3, 5)    ; → 解析失敗！
```

---

## なぜこれが重要なのか

この構文制限は **getter 関数**（例：`STRLEN`、`MAX`）にはあまり影響しません——そもそも式の中で使うべきものだからです。

しかし **setter 関数**（副作用のある関数）にとっては本当のジレンマを生みます：

```erb
; 開発者は状態を変更する SETTER 関数を書きたい
@SETTER(KEY, VAL)
#FUNCTION
    ; 何らかのグローバル状態を変更
    RETURNF 1    ; 戻り値は意味なし、ただ #FUNCTION の要件を満たすため

; ❌ 自然なコマンド形式には書けない
SETTER("key", val)
; → 解析失敗！関数名の直後に '(' は置けない

; ⚠️ スペース構文しか使えない
SETTER "key", val
; → 解析は成功するが、RESULT を汚染する！（後述）
```

---

## RESULT 汚染問題

式関数（`#FUNCTION`/`#FUNCTIONS`）をコマンド構文（スペース）で呼び出すと、エンジンは `METHOD_Instruction` パスを通り、戻り値を**無条件に** `RESULT`（整数）または `RESULTS`（文字列）に書き込みます：

```erb
RESULT = 42
PRINTVL RESULT          ; 42 を出力

SETANIMETIMER 30        ; コマンドとして呼び出し → RESULT = 1（汚染！）
PRINTVL RESULT          ; 1 を出力 ← 意図しない上書き！

BITMAP_CACHE_ENABLE 1   ; 同様に → RESULT が上書きされる！
```

一方、旧来の純粋なコマンド（例：`SETFONT`、`SETCOLOR`）は `doNormalFunction` パスを通り、**RESULT に書き込みません**。

!!! info "影響を受ける実際の関数"

    以下の関数は EM+EE において式中関数として実装されており、コマンド構文で呼び出すと RESULT を汚染します：

    - [SETANIMETIMER](../Reference/SETANIMETIMER.md) — アニメーション再描画間隔を設定、EM+EE では戻り値は常に `1`（意味なし）
    - [BITMAP_CACHE_ENABLE](../Reference/BITMAP_CACHE_ENABLE.md) — ビットマップキャッシュを有効化して描画を高速化、EM+EE では戻り値あり（意味なし）

    Skia 版では両者を純粋なコマンドに再構成し、RESULT 汚染問題を根本から解消しています。

!!! info "詳細分析"

    3つの命令ディスパッチパス（A/B/C）と RESULT 汚染の完全な分析については、本ページの続く章を参照してください。

---

## 解決策

### 解決策 1：CALLF（事後的な救済）

`CALLF` はこの問題を解決するために特別に設計された命令です——式関数を呼び出すが戻り値を破棄します：

```erb
; ✅ CALLF は括弧構文を許し、RESULT を汚染しない
CALLF SETTER("key", val)
; RESULT は変化しない
```

**欠点**：直接コマンド式関数を書くより冗長です。`CALLF SETTER("key", val)` は `SETTER "key", val` より簡潔ではありません。

!!! info "CALLF リファレンス"

    詳細は [CALLF 命令リファレンス](../Reference/CALLF.md) を参照。

### 解決策 2：Instruction として直接登録する（設計レベルでの解決）

**より良い解決策**は、setter 関数を `AInstruction`（コマンド）として直接登録し、`METHOD_Instruction` パスを通らないようにすることです：

| | 式関数（#FUNCTION） | Instruction として登録 |
|------|:---:|:---:|
| **登録方法** | `FunctionMethod` → `methodInstruction` | `AInstruction` サブクラス |
| **ディスパッチパス** | パス A → `METHOD_Instruction` | パス A → 独自の `DoInstruction` |
| **RESULT を書く？** | ✅ 無条件に書く | ❌ 書かない |
| **式の中で使える？** | ✅ 天然サポート | ✅ `METHOD_SAFE` フラグを付ける |

**実例**：`SETANIMETIMER` は Skia 版で `SETANIMETIMER_Instruction` として登録され、RESULT に書き込まず、同時に `METHOD_SAFE` フラグを付けて式の中でも使えるようになっています。`BITMAP_CACHE_ENABLE` も同様に、式中関数から純粋なコマンドへ再構成されています。

---

## まとめ

| 問題 | 原因 | 解決策 |
|------|------|---------|
| `FUNC(args)` は独立した文にならない | パーサが関数名の直後にスペース/タブを要求し、`(` は不正 | スペース構文 `FUNC args` または CALLF を使う |
| 式関数をコマンドとして呼ぶと RESULT を汚染 | `METHOD_Instruction` が無条件に RESULT を書く | CALLF または Instruction として登録 |
| CALLF が冗長すぎる | CALLF のラップが一層増える | 設計時に Instruction として登録する |

**核心認識**：ERABASIC の「コマンド」と「式」は同じ構文の2つの使い方ではなく、**異なる2つの構文形式**です。この設計は eramaker の歴史的遺産に由来し、現代の ERABASIC でも私たちが setter 関数をどう書くかに影響を与え続けています。

---

## 深く理解する：ERABASIC はコマンド駆動である

このセクションの構文規則から、ERABASIC の最も根本的な設計哲学が見えてきます：**それはコマンド駆動の言語である**ということです。

C/Java/Python では、`func(a)` はただの関数呼び出し文です——言語は「コマンド」と「式関数」を区別しません。しかし ERABASIC では、パーサが一行のコードを見たとき、まず判断するのは：**この行はコマンドか？** という点です。

```
パーサの視点：
  行頭が既知のコマンド名？ → コマンド構文（スペース区切り引数）
  行頭が CALL？      → カスタムコマンドの呼び出し（括弧構文）
  行頭が CALLF？     → 式関数の呼び出し（括弧構文）
  行頭が 変数名 + =？  → 代入文（式構文）
  行頭が IF/FOR/...？ → 制御フロー（式構文）
```

**3つの呼び出し方式、3つの構文形式**：

| 呼び出し方式 | 構文 | 例 | 本質 |
|---------|------|------|------|
| 組み込みコマンド | `CMD arg1, arg2` | `PRINTL "hello"` | スペース区切り、パーサが直接認識 |
| CALL カスタムコマンド | `CALL FUNC(arg1, arg2)` | `CALL MY_FUNC(1, 2)` | CALL がコマンド、`()` は CALL の引数形式 |
| CALLF 式関数 | `CALLF FUNC(arg1, arg2)` | `CALLF STRLEN("hello")` | CALLF がコマンド、`()` は CALLF の引数形式 |

**重要な洞察**：`()` 括弧構文そのものは「コマンド式関数」と「式関数」を区別しません。`CALL MY_FUNC(1, 2)` の `MY_FUNC` はコマンド式関数（`@` ラベル定義）であり、`CALLF STRLEN("hello")` の `STRLEN` は式関数（`#FUNCTION` 定義）——どちらも `()` で引数を渡しますが、**どちらも呼び出しを「コマンド」（CALL または CALLF）で駆動する必要があります**。

言い換えれば：**ERABASIC には「裸」の関数呼び出し文は存在しません。** あらゆる関数呼び出しは何らかのコマンドを通じて開始されなければなりません——組み込みのコマンド名であるか、CALL であるか、CALLF であるかのいずれかです。これが主流の言語と最根本的に異なる構文上の違いです。

---

## 関連章

- [行の型と構造](line-types.md) — 4つの行の型の基礎知識
- [式関数](../Emuera/user_defined_in_expression_function.md) — #FUNCTION/#FUNCTIONS の完全仕様
- [CALLF 命令リファレンス](../Reference/CALLF.md) — CALLF の API ドキュメント
