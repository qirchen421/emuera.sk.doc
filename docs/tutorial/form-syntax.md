# FORM構文（書式付文字列）

!!! info "本節の対応マニュアル"

    - **Reference 分類**: [文字列操作・参照](../Reference/README.md#string-operations)
    - [Emueraで追加された記法 > 書式付文字列（FORM構文）拡張](../Emuera/expression.md) — 公式マニュアルのFORM構文説明
    - [PRINT系](../Reference/PRINT.md) — FORM構文を使用する出力命令
    - [STRFORM](../Reference/STRFORM.md) — 実行時FORM展開関数

!!! warning "FORM構文はERABASICで最も深く結合し、最も罠しやすい機能"

    FORM構文は字句解析・式評価・描画システムの3つのモジュールにまたがる。多くの動作はドキュメント化されておらず、ソースコードからしか推測できない。本チュートリアルはソースコード分析に基づき、「誰も教えてくれないが知っておくべき」ルールを明らかにする。

---

## FORM構文とは

FORM構文はERABASICの**書式付文字列**機構——文字列中に変数参照・条件分岐・特殊記号を埋め込み、実行時に展開して最終文字列を得る。

どこにでもある：

```erb
PRINTFORM 名前は%NAME%金は{MONEY}
STR:0 = %CALLNAME%の攻撃力は{ATK}
RESULTS = @"%NAME%が来た！"
CALLFORM FUNC_%TARGET%
```

### FORM構文の2つの出現位置

| 位置 | 構文形式 | 例 |
|------|---------|------|
| **命令の引数**（PRINTFORM/RETURNFORM等） | そのまま書く、引用符不要 | `PRINTFORM Hello {A}` |
| **文字列式の内部**（PRINTS/式中関数の引数等） | `@"..."`で囲む | `PRINTS @"Hello {A}"` |

重要な違い：命令の引数位置ではFORM文字列を直接書き、引用符は不要・不可。文字列式の内部では`@"..."`でマークする必要がある。

---

## 基礎：変数置換

### `%変数%` — 文字列変数置換

`%`で文字列変数名を囲むと、実行時にその変数の値に置換：

```erb
NAME:0 = 佐藤
PRINTFORML 名前は%NAME:0%
; 出力：名前は佐藤
```

`%`の中には任意の**文字列式**を書ける：

```erb
PRINTFORML %CALLNAME:TARGET%
PRINTFORML %STR:0%
PRINTFORML %TOSTR(A)%
```

### `{式}` — 整数式埋め込み

`{}`で整数式を囲むと、実行時に評価して文字列に変換：

```erb
A = 42
PRINTFORML 値は{A}
PRINTFORML 計算結果は{A * 2 + 10}
PRINTFORML {(MONEY + 1000 - 600) * 5}
```

!!! note "`{}`の中は整数式でなければならない"

    `{}`の中は**整数式**として解析される。文字列式を書くとエラーになる。

---

## パディングと整列

### `%変数,桁数,整列%` — 文字列パディング

```erb
STR:0 = あいう
PRINTFORML [%STR:0%]          ; [あいう]
PRINTFORML [%STR:0,10%]       ; [    あいう]  （右揃え、不足分は半角スペース）
PRINTFORML [%STR:0,10,LEFT%]  ; [あいう    ]  （左揃え）
PRINTFORML [%STR:0,2%]        ; [あいう]      （桁数不足、そのまま表示）
```

### `{式,桁数,整列}` — 整数パディング

```erb
A = 123456
PRINTFORML [{A}]          ; [123456]
PRINTFORML [{A,10}]       ; [    123456]  （右揃え）
PRINTFORML [{A,10,LEFT}]  ; [123456    ]  （左揃え）
PRINTFORML [{A,2}]        ; [123456]      （桁数不足、そのまま表示）
```

### パディング長計算の内部ルール

!!! danger "全角文字の長さ計算はエンコーディングと深く結合"

    パディング長は`LangManager.GetStrlenLang()`で計算される。このメソッドの動作：

    1. 文字列が**すべてASCII文字**の場合、長さ = `string.Length`（文字数）
    2. そうでない場合、長さ = `Encoding.GetByteCount(string)`（システムエンコーディングのバイト数）

    つまり：

    - Shift-JISエンコーディングでは、全角文字 = 2バイト = 2文字幅
    - UTF-8エンコーディングでは、漢字 = 3バイト ≠ 2文字幅

    **ソースコードコメント原文**（[StrForm.cs](https://github.com/Emuera/EmueraDotNet/blob/main/Runtime/Script/Data/StrForm.cs) `FormatPercent`クラス）：

    ```
    totalLength -= currentLength - ret.Length;
    //全角文字の数だけマイナス。タブ文字？ゼロ幅文字？知るか！
    ```

    このコメントはパディングロジックの**ハック本質**を示している：全角文字がシステムエンコーディングでちょうど2バイト占めることを前提に、`totalLength - (byteLength - charLength)`でパディング量を調整する。Shift-JIS以外の環境では予期しない結果になる可能性がある。

    パディングは常に**半角スペース**（`' '`）を使用する。

---

## `@"..."` — 文字列式中のFORM構文

文字列式（`PRINTS`の引数、`+=`の右辺等）ではFORM構文を直接書けず、`@"..."`で囲む必要がある：

```erb
; ✅ 正しい
PRINTS @"%RESULTS%続き"
STR:0 += @"%NAME%が来た"

; ❌ 間違い — PRINTSは裸のFORM構文を受け付けない
PRINTS %RESULTS%続き

; ❌ 間違い — PRINTFORMに@"は不要
PRINTFORM @"%RESULTS%続き"  ; @"と"もそのまま表示される
```

### `@"..."`の解析入口

式コンテキストで`@`文字に遭遇したとき、字句解析器は：

1. 次の文字が`"`かチェック
2. `"`なら`@"`をスキップし、`AnalyseFormattedString(st, FormStrEndWith.DoubleQuotation, false)`を呼び出す
3. 閉じの`"`まで解析する

つまり`@"..."`の中のFORM構文は`PRINTFORM`引数のFORM構文と**完全に同じ**だが、終了条件が異なる（`"` vs 行末）。

---

## `\@ ? # \@` — FORM三項演算子

FORM構文で最も混乱しやすい機能の一つ。

### 構文

```
\@ 条件 ? 真値文字列 # 偽値文字列 \@
```

### 例

```erb
PRINTFORML \@ TALENT:0 ? 素質あり # 素質なし \@
PRINTFORML 結果は\@ A > 0 ? 正 # 負 \@！
```

### 解析フロー

`\@`の解析は`LexicalAnalyzer.AnalyseYenAt()`メソッドで行われる：

1. `\@`に遭遇 → 条件部分の解析開始（`?`まで）
2. 条件部分は**整数式**として解析（`ExpressionParser.ReduceIntegerTerm`）
3. `?`の後 → 真値文字列の解析（`#`まで）、これは**ネストしたFORM文字列**
4. `#`の後 → 偽値文字列の解析（`\@`まで）、これもネストFORM文字列
5. 閉じの`\@` → 終了

### 式の三項演算子との違い

| 特徴 | FORM三項演算子 `\@ ? # \@` | 式三項演算子 `? #` |
|------|---------------------------|----------------------|
| 出現位置 | FORM文字列の内部 | 式の内部 |
| 条件の型 | 整数式 | 整数式 |
| 結果の型 | **文字列** | 整数または文字列（オペランド依存） |
| 区切り記号 | `?`と`#` | `?`と`#` |
| 閉じマーク | `\@` | なし（優先順位に依存） |
| 真値/偽値 | FORM文字列（ネスト埋め込み対応） | 式 |
| `#`省略可 | はい（省略時は偽値が空文字列） | いいえ |

!!! tip "`#`を省略した場合"

    `\@`の直後に`@`が来る（`#`がない）場合、パーサーは警告を出し、偽値を空文字列にする：

    ```erb
    ; 以下は警告が出る、偽値は空
    PRINTFORML \@ TALENT:0 ? 素質あり \@
    ```

### 式コンテキストでの使用

式コンテキストでは`\@...\@`を`@"..."`なしで直接使用できる：

```erb
; 以下の2行は等価
PRINTS @"\@ A > 0 ? 正 # 負 \@"
PRINTS \@ A > 0 ? 正 # 負 \@
```

これは字句解析器が式コンテキストで`\@`に遭遇したとき、直接`StrFormWord`として解析するため。

### `\@...\@`の各コンテキストでの動作

`\@...\@`はFORM構文の一部でありながら、式コンテキストで直接使用できるリテラルでもある。この二重性により、コンテキストごとの動作が混乱しやすい。以下に逐一分析する：

| コンテキスト | コード例 | 動作 | 解析方式 |
|--------|---------|------|---------|
| **PRINTFORM** | `PRINTFORM \@ A>0 ? 正 # 負 \@` | FORM文字列展開 | `AnalyseFormattedString`が直接解析 |
| **PRINTS** | `PRINTS \@ A>0 ? 正 # 負 \@` | `PRINTS @"\@ A>0 ? 正 # 負 \@"`と等価 | 式コンテキストで`\@`がFORM開始として認識 |
| **RETURNF** | `RETURNF \@ A>0 ? 正 # 負 \@` | 展開後の文字列を返す | 同上、`\@`は式コンテキストで`StrFormWord`として解析 |
| **RETURNFORM** | `RETURNFORM \@ A>0 ? 正 # 負 \@` | FORM文字列展開 | `AnalyseFormattedString`が直接解析 |
| **文字列リテラル内** | `"結果は\@ A>0 ? 正 # 負 \@"` | **展開されない**——`\@`は通常文字列で`@`にエスケープされる | `ReadString`が処理、`\`が消費され`@`が残る |
| **@"..."内** | `@"\@ A>0 ? 正 # 負 \@"` | FORM文字列展開 | `AnalyseFormattedString`が解析 |
| **代入 =** | `STR:0 = \@ A>0 ? 正 # 負 \@` | FORM文字列展開 | 代入`=`は`AnalyseFormattedString`を使用 |
| **代入 '=** | `STR:0 '= \@ A>0 ? 正 # 負 \@` | FORM文字列展開 | `'=`は式解析だが、`\@`は式コンテキストでも認識される |
| **#DIMS初期化** | `#DIMS S = \@ A>0 ? 正 # 負 \@` | **コンパイル時式評価** | `ExpressionParser.ReduceArguments`、`\@`は`StrFormWord`として解析 |

!!! warning "重要な違い：通常文字列リテラル vs FORMコンテキスト"

    通常文字列リテラル`"..."`では、`\@`は`@`にエスケープされる（`\`が消費される）ため、**FORM三項演算子はトリガーされない**。これは`"..."`が`ReadString`で解析され、`AnalyseFormattedString`を経由しないため。

    ```erb
    ; ❌ 展開されない——通常文字列、\@は@にエスケープされる
    RESULTS = "結果は\@ A>0 ? 正 # 負 \@"

    ; ✅ 正しい——FORMコンテキスト
    RESULTS = \@ A>0 ? 正 # 負 \@

    ; ✅ 正しい——@"..."内部はFORMコンテキスト
    RESULTS = @"結果は\@ A>0 ? 正 # 負 \@"
    ```

!!! tip "核心ルール：`\@`は任意のFORM解析入口で有効"

    解析パスが`AnalyseFormattedString`を経由する場合（PRINTFORM引数、`@"..."`、代入`=`）、または式コンテキストで`\@`に遭遇する場合（RETURNF、`'=`、#DIMS初期化）、`\@`三項演算子は正しく解析される。唯一の例外は通常文字列リテラル`"..."`。

### 実測比較：PRINTL / PRINTFORML / PRINTSL と `\@` と `@"..."`

以下のテスト（`A = -1`、つまり `A > 0` が偽）は、3種の出力コマンドの`\@`と`@"..."`に対する動作の違いを明確に示す：

```erb
; A = -1（A > 0 は偽）と仮定

; ── PRINTL：プレーンテキスト出力、FORM構文を解析しない ──
PRINTL 結果は\@ A > 0 ? 正 # 非正 \@！
; → 出力：結果は\@ A > 0 ? 正 # 非正 \@！（そのまま出力）

PRINTL  @"\@ A > 0 ? 正 # 負 \@"
; → 出力： @"\@ A > 0 ? 正 # 負 \@"（そのまま出力）

; ── PRINTFORML：FORM構文解析 ──
PRINTFORML 結果は\@ A > 0 ? 正 # 非正 \@！
; → 出力：結果は非正！（\@ 三項演算子が展開）

PRINTFORML @"\@ A > 0 ? 正 # 負 \@"
; → 出力：@"負"（@ と " はFORM内の通常文字、\@ が展開）
; ⚠️ 注意：PRINTFORML では @"..." はFORM文字列構文ではない！
;    @ と " はリテラル文字、\@ のみが三項演算子をトリガー

; ── PRINTSL：式評価 ──
PRINTSL @"\@ A > 0 ? 正 # 負 \@"
; → 出力：負（@"..." は式内のFORM文字列構文、\@ が内部で展開）

PRINTSL \@ A > 0 ? 正 # 負 \@
; → 出力：負（式コンテキストで \@ を StrFormWord として直接認識）
```

!!! warning "PRINTFORML の `@"..."` はFORM文字列構文ではない"

    よくある混同点。`AnalyseFormattedString`（PRINTFORML の解析パス）では、`@` と `"` は通常文字であり、`@"..."` はFORM文字列構文として処理されない。**式コンテキスト**（PRINTSL、RETURNF、代入 `'=` など）でのみ `@"..."` がFORM文字列構文となる。

    | コマンド | `@"..."` の意味 | `\@` の展開 |
    |---------|---------------|------------|
    | PRINTFORML | `@` + `"` + 内容 + `"`（全てリテラル） | ✅（FORMコンテキスト） |
    | PRINTSL | FORM文字列構文（`@"..."` がFORM内容を包む） | ✅（FORMコンテキスト） |
    | PRINTL | `@` + `"` + 内容 + `"`（全てリテラル） | ❌（プレーンテキスト） |

---

## 文字列代入と初期化の意味論的差異

FORM構文は文字列代入と初期化で動作が異なり、よくある混乱の源である。

> 代入文の完全な説明は[代入文](assignment.md)を参照のこと。本節ではFORM構文と直接関連する部分のみを扱う。

### 代入文：`=`はFORM構文を使用

文字列変数の代入文`=`の右辺は**FORM構文**で解析される：

```erb
STR:0 = %CALLNAME%が来た       ; ✅ %変数%置換
STR:0 = 金額は{MONEY}円      ; ✅ {}整数埋め込み
STR:0 = \@ A>0 ? 正 # 負 \@  ; ✅ \@三項演算子
```

ソースコード位置：`ArgumentBuilder.cs`の`SP_SET_ArgumentBuilder`、`op == OperatorCode.Assignment`の時に`LexicalAnalyzer.AnalyseFormattedString(st, FormStrEndWith.EoL, true)`を呼び出す。

### 代入文：`'=`は式構文を使用

文字列変数の代入文`'=`の右辺は**式構文**で解析される：

```erb
STR:0 '= "Hello"              ; ✅ 文字列式
STR:0 '= TOSTR(A)             ; ✅ 関数呼び出し
STR:0 '= RESULTS:0 + "世界"   ; ✅ 文字列結合
```

ソースコード位置：`ArgumentBuilder.cs`の`SP_SET_ArgumentBuilder`、`op == OperatorCode.AssignmentStr`の時に`ExpressionParser.ReduceArguments`を呼び出す。

!!! note "`'=`でも`\@`は使用可能"

    `'=`は式解析を使用するが、字句解析器は式コンテキストで`\@`に遭遇しても`StrFormWord`として解析するため、`\@`三項演算子は`'=`の右辺でも動作する：

    ```erb
    STR:0 '= \@ A>0 ? 正 # 負 \@  ; ✅ STR:0 = \@ A>0 ? 正 # 負 \@と等価
    ```

### #DIMS初期化：`=`は式構文を使用

`#DIMS`変数宣言の`=`初期化は**式構文**を使用し、FORM構文ではない：

```erb
#DIMS GREETING = "こんにちは"    ; ✅ 文字列式
#DIMS GREETING = %CALLNAME%   ; ❌ FORM構文ではない！%は剰余演算子として解釈される
#DIMS GREETING = {MONEY}      ; ❌ FORM構文ではない！{ }はブロック区切りとして解釈される
```

ソースコード位置：`UserDefinedVariable.cs`、初期化値は`ExpressionParser.ReduceArguments(wc, ArgsEndWith.EoL, false)`で解析され、各初期化値は`SingleTerm`（コンパイル時定数）でなければならない。

!!! danger "#DIMS初期化の3つの罠"

    1. **`=`は式評価であり、FORM展開ではない** — `%CALLNAME%`は変数値に置換されない
    2. **初期化値はコンパイル時定数でなければならない** — 関数呼び出しや変数参照は不可（`\@`三項演算子も、条件部分が通常定数ではないため不可）
    3. **`'=`構文はない** — 初期化には`=`しかなく、代入文のように`=`と`'=`の2種類はない

### 意味論的差異のまとめ

| 場面 | 構文 | 解析方式 | FORM構文対応 | `\@`対応 |
|------|------|---------|------------|----------|
| 文字列代入 `=` | `STR = ...` | `AnalyseFormattedString` | ✅ 完全対応 | ✅ |
| 文字列代入 `'=` | `STR '= ...` | `ExpressionParser.ReduceArguments` | ❌ | ✅（式コンテキストで認識） |
| #DIMS初期化 `=` | `#DIMS S = ...` | `ExpressionParser.ReduceArguments` | ❌ | 定数の場合のみ |
| PRINTFORM引数 | `PRINTFORM ...` | `AnalyseFormattedString` | ✅ 完全対応 | ✅ |
| @"..."内部 | `@"..."` | `AnalyseFormattedString` | ✅ 完全対応 | ✅ |
| 通常文字列 `"..."` | `"..."` | `ReadString` | ❌ | ❌（`@`にエスケープ） |

---

## Skia変体の浮動小数点拡張

Skia変体は`EraType.Float`浮動小数点型を導入し、FORM構文と型変換関数を拡張した。

### `{}`中の浮動小数点埋め込み

原版Emueraでは`{}`は整数式のみを受け付ける。Skia変体は`FormatCurlyBrace`を拡張し、浮動小数点式を自動認識する：

```erb
#DIMF PI = 3.14159
PRINTFORML 円周率は{PI}         ; 出力：円周率は3.14159
PRINTFORML 幅{PI,10}            ; 出力：   3.14159（右揃えパディング）
PRINTFORML 幅{PI,10,LEFT}       ; 出力：3.14159   （左揃えパディング）
```

ソースコード実装（[StrForm.cs](file:///d:/emuera/emuera_lazyloading_selfmodified_version/Emuera/Runtime/Script/Data/StrForm.cs) `FormatCurlyBrace`クラス）：

```csharp
if (arguments[0].GetEraType() == EraType.Float)
    ret = arguments[0].GetFloatValue(exm).ToString();
else
    ret = arguments[0].GetIntValue(exm).ToString();
```

!!! note "浮動小数点パディングの精度問題"

    `{}`中の浮動小数点数の文字列変換にはC#の`double.ToString()`デフォルト形式が使用され、**精度制御は提供されない**。つまり：

    - `3.14159265` → `"3.14159265"`（完全精度）
    - `3.0` → `"3"`（整数部分は小数点を省略）
    - `0.0000001` → `"1E-07"`（極小値は科学記数法を使用）

    精度を指定する必要がある場合は`TOSTRF`関数と`%`置換を組み合わせて使用する（下記「精度と幅の組み合わせ制御」を参照）。

> **TOシリーズ型変換関数の完全なAPIドキュメント**（TOSTR / TOSTRF / TOINT / TOFLOAT の引数シグネチャ、フォーマット文字列、サンプルコード）は、[値・型・変数 — 型変換関数](../Reference/TOSTR.md)を参照のこと。本節ではFORM構文と直接関連する部分のみを扱う。

### FORM構文とのクロスリファレンス

| FORM構文 | 原版の動作 | Skia拡張の動作 |
|-----------|---------|-------------|
| `{整数式}` | 整数→文字列 | 変更なし |
| `{浮動小数点式}` | ❌ 不支持（非整数式） | ✅ 浮動小数点→文字列（デフォルト形式） |
| `{式,桁数}` | 整数→文字列+パディング | 浮動小数点もパディング対応 |
| `%文字列式%` | 文字列置換 | 変更なし |

!!! tip "精度と幅の組み合わせ制御"

    **現在のメカニズムの能力境界**：

    | ニーズ | 構文 | 実現可否 |
    |--------|------|---------|
    | 浮動小数点→文字列（デフォルト精度） | `{PI}` | ✅ |
    | 浮動小数点→文字列+パディング | `{PI,10}` | ✅ |
    | 浮動小数点→文字列（精度指定） | `TOSTRF(PI, "F2")` | ✅ |
    | 浮動小数点→文字列（精度指定+パディング） | `%TOSTRF(PI, "F2"),10%` | ✅ |
    | 浮動小数点→文字列（精度指定+パディング+左揃え） | `%TOSTRF(PI, "F2"),10,LEFT%` | ✅ |

    **精度+パディングの推奨書き方**：

    ```erb
    #DIMF PI = 3.14159265

    ; ❌ {} では精度制御不可
    PRINTFORML {PI}              ; → 3.14159265（デフォルト形式）

    ; ✅ TOSTRF + % 置換：精度+右揃えパディング
    PRINTFORML %TOSTRF(PI, "F2"),10%    ; → "      3.14"

    ; ✅ TOSTRF + % 置換：精度+左揃えパディング
    PRINTFORML %TOSTRF(PI, "F2"),10,LEFT% ; → "3.14      "

    ; ✅ @"..." 内でも使用可能
    PRINTS @"%TOSTRF(PI, "F2"),10%"
    ```

    **原理**：`%expr,width,LEFT%`の`FormatPercent`は任意の文字列式を第1引数として受け付けるため、`TOSTRF(PI, "F2")`の戻り値を`%...%`の入力として直接使用でき、パディングと揃え機能を同時に享受できる。`FormatPercent`は全角文字幅も正しく処理する（`LangManager.GetStrlenLang`経由）が、`FormatCurlyBrace`のパディングは全角を考慮しない。

---

## 三連記号展開

### 構文

| 三連記号 | 展開先 | 意味 |
|---------|--------|------|
| `***` | `NAME:TARGET` | ターゲットの名前 |
| `+++` | `CALLNAME:MASTER` | 主人公の呼び名 |
| `===` | `CALLNAME:PLAYER` | プレイヤーの呼び名 |
| `///` | `NAME:ASSI` | 助手の名前 |
| `$$$` | `CALLNAME:TARGET` | ターゲットの呼び名 |

### 例

```erb
PRINTFORML ***が来た！     ; → NAME:TARGET + "が来た！"
PRINTFORML +++が===を攻撃した  ; → CALLNAME:MASTER + "が" + CALLNAME:PLAYER + "を攻撃した"
```

### 検出ルール

三連記号の検出は`CharStream.TripleSymbol()`で実装されている：

```csharp
public bool TripleSymbol()
{
    if (pointer + 3 > source.Length)
        return false;
    return source[pointer] == source[pointer + 1] && source[pointer] == source[pointer + 2];
}
```

**重要ルール**：**連続する3つの同じ文字**で、その文字が`* + = / $`のいずれかであれば、三連記号として認識される。つまり：

- `++++` → 最初の`+++`が展開され、残りの1つの`+`は普通の文字
- `+++++` → 最初の`+++`が展開され、次の`++`は展開されない（2つしかない）
- `======` → 2つの`===`が連続展開される

### 設定オプション

`SystemIgnoreTripleSymbol`設定項（デフォルト`false`）で三連記号展開を無効にできる。有効にすると`+++`等は普通の文字として扱われる。

!!! danger "PRINTFORML === の罠"

    ```erb
    PRINTFORML ===
    ```

    この行は`===`を出力**しない**！`CALLNAME:PLAYER`の値に展開される。

    本当に`===`を出力したい場合はエスケープが必要：

    ```erb
    PRINTFORML \=\=
    ```

    または`SystemIgnoreTripleSymbol`設定を有効にする。

    同様に`PRINTFORML +++`は`CALLNAME:MASTER`に、`PRINTFORML ***`は`NAME:TARGET`に展開される。

---

## エスケープルール

`\`はFORM文字列のエスケーププレフィックス。後続の文字によって動作が変わる：

### FORM文字列中のエスケープ（`AnalyseFormattedString`）

| エスケープシーケンス | 結果 | 説明 |
|---------|------|------|
| `\s` | 半角スペース ` ` |  |
| `\S` | 全角スペース `　` |  |
| `\t` | タブ `\t` |  |
| `\n` | 改行 `\n` |  |
| `\@` | `\@`三項演算子の開始 | 特別処理 |
| `\\` | `\` | バックスラッシュ自身 |
| `\%` | `%` | パーセント自身（変数置換をトリガーしない） |
| `\{` | `{` | 左波括弧自身 |
| `\"` | `"` | ダブルクォート自身 |
| `\その他` | その文字 | `\`が消費される |

### 通常文字列中のエスケープ（`ReadString`）

通常文字列（`"..."`で囲まれた定文字列）にも同様のエスケープルールがあるが、**`\@`はない**：

| エスケープシーケンス | 結果 |
|---------|------|
| `\s` | 半角スペース |
| `\S` | 全角スペース |
| `\t` | タブ |
| `\n` | 改行 |
| `\その他` | その文字 |

### 重要な違い

!!! warning "FORM文字列と通常文字列のエスケープの違い"

    - FORM文字列では`\@`は三項演算子の開始マーク
    - 通常文字列では`\@`は`@`にエスケープされる（`\`が消費され、`@`が残る）
    - FORM文字列では`\`の後の`%`、`{`、`"`等の特殊文字はその特殊意味がエスケープされる
    - 通常文字列では`%`、`{`に特殊意味はないのでエスケープ不要

### 実用的なエスケープ例

```erb
; リテラル %RESULTS% を出力
SAVESTR:0 = \%RESULTS\%

; リテラル {A} を出力
PRINTFORML 変数Aの書き方は\{A\}

; バックスラッシュ自身を出力
PRINTFORML パスはC\\Program Files

; === リテラルを出力（三連記号展開を回避）
PRINTFORML \=\=（最初の2つだけエスケープ、3つ目の=は三連にならない）
; または
PRINTFORML \===（最初の1つをエスケープ、残りの==は三連にならない）
```

---

## FORM文字列を命令の引数として

### FORM_STR_ANY引数型

FORM構文を使用する命令（`PRINTFORM`、`RETURNFORM`、`PUTFORM`等）の引数型は`FORM_STR_ANY`。この引数型のビルダーは`FORM_STR_ANY_ArgumentBuilder`。

### カンマ区切りのFORM引数

`FORM_STR_ANY`引数は**カンマ**で複数のFORM文字列を区切る：

```erb
RETURNFORM %RESULTS%, {RESULT}
; 2つの引数：%RESULTS% と {RESULT}
```

**重要なメカニズム**：`AnalyseFormattedString`はカンマに遭遇したとき、`endWith == FormStrEndWith.Comma`なら**現在のFORM文字列の解析を停止**する。つまりカンマは`FORM_STR_ANY`引数では**区切り記号**であり、FORM文字列の一部にはならない。

```erb
; FORM文字列中にカンマを含めたい場合：
PRINTFORM こんにちは\,世界    ; エスケープ？できない！
PRINTFORM こんにちは,世界      ; 2つの引数として解釈される
```

!!! danger "FORM文字列中にカンマを含めることはできない"

    カンマは`FORM_STR_ANY`の区切り記号であり、FORMエスケープルールに**`\,`は存在しない**ため、`FORM_STR_ANY`引数で直接カンマを出力することはできない。

    代替案：

    ```erb
    ; 案1：文字列式を使う
    PRINTS "こんにちは,世界"

    ; 案2：@"..."構文を使う
    PRINTS @"こんにちは,世界"
    ```

### CALLFORM系の関数名部分

`CALLFORM`/`JUMPFORM`/`GOTOFORM`等の命令の関数名部分は`FormStrEndWith.LeftParenthesis_Bracket_Comma_Semicolon`終了条件を使用——`(`、`[`、`,`、`;`に遭遇すると関数名の解析を停止する：

```erb
CALLFORM FUNC_%TARGET%(ARG:0, ARG:1)
;       ^^^^^^^^^^^^^^^^  関数名部分（FORM文字列）
;                       ^^^^^^^^^^  引数部分（式）
```

つまり関数名部分には`(`、`[`、`,`、`;`を含めることはできない。

### `;`コメント記号との関係

`FORM_STR_ANY`引数では`;`は**終了記号ではない**——FORM文字列は行末まで解析される。これは一部の命令（`PRINT`等）で`;`がコメントとして扱われるのとは異なる：

```erb
PRINT Hello;World      ; "Hello;World"を出力（;は文字列の一部）
PRINTFORM Hello;World  ; "Hello;World"を出力（;はFORM文字列の一部）
```

ただし`CALLFORM`の関数名部分では`;`が関数名解析を終了させる。

---

## STRFORM関数 — 実行時FORM展開

`STRFORM`関数は文字列引数を受け取り、FORM文字列として展開する：

```erb
#DIMS FORM_STR = "名前は%NAME:0%、値は{A}"
RESULTS = STRFORM(FORM_STR)
```

!!! warning "STRFORMは実行時展開"

    `PRINTFORM`のコンパイル時解析と異なり、`STRFORM`は**実行時**に`AnalyseFormattedString`を呼び出して文字列を再解析する。つまり：

    - 渡された文字列にFORM構文エラーがあると、実行時に例外がスローされる
    - FORM文字列を動的に構築してから展開できる

    ソースコード実装（[Creator.Method.cs](https://github.com/Emuera/EmueraDotNet/blob/main/Runtime/Script/Statements/Function/Creator.Method.cs) `StrFormMethod`クラス）：

    ```csharp
    StrFormWord wt = LexicalAnalyzer.AnalyseFormattedString(new CharStream(str), FormStrEndWith.EoL, false);
    StrForm strForm = StrForm.FromWordToken(wt);
    destStr = strForm.GetString(exm);
    ```

---

## FORM構文の内部アーキテクチャ

### 解析→展開→描画の3段階

```
ソース文字列
    │
    ▼  LexicalAnalyzer.AnalyseFormattedString()
StrFormWord (strs[] + SubWord[])
    │     strs: 静的テキスト断片
    │     SubWord: 動的置換ポイント
    │       ├─ CurlyBraceSubWord  → {} 整数埋め込み
    │       ├─ PercentSubWord     → %% 文字列置換
    │       ├─ TripleSymbolSubWord → +++ 等の三連記号
    │       └─ YenAtSubWord       → \@ 三項演算子
    │
    ▼  StrForm.FromWordToken()
StrForm (strs[] + AExpression[])
    │     SubWordをAExpression（式ノード）に変換
    │     三連記号 → 事前構築済みのFunctionMethodTerm
    │     {} → FormatCurlyBrace
    │     %% → FormatPercent
    │     \@ → FormatYenAt
    │
    ▼  StrForm.GetString()
最終文字列
    │     strs[i] + terms[i].GetStrValue() を交互に結合
```

### FormStrEndWith — 終了条件列挙型

FORM文字列の解析は`FormStrEndWith`列挙型で終了条件を制御する：

| 列挙値 | 終了文字 | 用途 |
|--------|---------|------|
| `EoL` | 行末 | `PRINTFORM`等の命令引数 |
| `DoubleQuotation` | `"` | `@"..."`中のFORM文字列 |
| `Sharp` | `#` | `\@`三項演算子の真値部分 |
| `YenAt` | `\@` | `\@`三項演算子の偽値部分 |
| `Comma` | `,` | `FORM_STR_ANY`引数 |
| `LeftParenthesis_Bracket_Comma_Semicolon` | `(` `[` `,` `;` | `CALLFORM`系の関数名部分 |

### 定数畳み込み最適化

FORM文字列中のすべての動的部分がコンパイル時に値を確定できる場合、`StrForm`は**定数畳み込み**を実行する——すべての`SingleTerm`を1つの純文字列にマージし、実行時の評価を回避する：

```csharp
// StrForm.Restricture()の最適化ロジック
if (termList[i] is SingleTerm)
{
    string str = termList[i].GetStrValue(exm);
    strList[i] = strList[i] + str + strList[i + 1];
    termList.RemoveAt(i);
    strList.RemoveAt(i + 1);
    i--;
}
```

FORM文字列全体が定数の場合、`StrForm.IsConst`は`true`を返し、`ToStrFormTerm()`は`StrFormTerm`ではなく`SingleStrTerm`を直接返す。

---

## FORM構文の起源推測

FORM構文は無から設計されたものではなく、eramaker時代の単純な変数置換から段階的に進化したもの。

### eramaker時代

eramakerがサポートするFORM構文は2種類のみ：

1. `%変数名%` — 文字列変数置換（単純な変数名のみ、式は不可）
2. `{変数名}` — 整数変数表示（単純な変数名のみ、式は不可）

```erb
; eramaker構文
PRINTFORM 名前は%NAME:0%、金は{MONEY}円
```

eramakerには**ない**：

- `{}`中の式計算
- `%%`中の文字列式
- パディング整列（桁数指定）
- `\@`三項演算子
- 三連記号展開
- エスケープルール（eramakerでは`\`に特別な意味はない）
- `@"..."`構文

### Emueraの拡張

Emueraはeramakerとの互換性を保ちつつ、段階的に追加した：

1. **`{}`中の式サポート** — 単純変数名に限定しない
2. **`%%`中の文字列式サポート** — 同上
3. **パディング整列** — `{変数,桁数,LEFT/RIGHT}`と`%変数,桁数,LEFT/RIGHT%`
4. **エスケープルール** — `\s`、`\S`、`\t`、`\n`、`\%`、`\{`、`\\`
5. **`\@`三項演算子** — C言語の三項演算子にインスパイアされたが、`:`の代わりに`#`を使用（ERABASICでは`:`が配列添字区切り記号のため）
6. **三連記号** — よく使うキャラ名のショートカット
7. **`@"..."`構文** — FORM構文を式コンテキストで使用可能にする
8. **STRFORM関数** — 実行時FORM展開

### 設計哲学

FORM構文の進化はERABASICの核心的な設計哲学を体現している：**命令構文のフレームワーク内で、段階的に式能力を追加する**。

- `%変数%`と`{変数}`は**命令構文**の思考——特殊マークで文字列に「穴を開けて」値を埋める
- `@"..."`は**式構文**の思考——FORM文字列を式の一つの値として扱う
- `\@ ? # \@`は2つの思考の**交配**——FORM文字列中に条件式を埋め込む

この混在がFORM構文と式システムの間の**深い結合**を生み、多くの混乱しやすい動作の根源となっている。

---

## よくある罠クイックリファレンス

| 罠 | 原因 | 解決策 |
|------|------|---------|
| `PRINTFORML ===`の出力が`===`ではない | `===`は三連記号、`CALLNAME:PLAYER`に展開 | `\=\=`または`\===`でエスケープ |
| `PRINTFORML +++`の出力が`+++`ではない | `+++`は`CALLNAME:MASTER`に展開 | 同上 |
| `PRINTFORM @"..."`が`@"..."`をそのまま表示 | `PRINTFORM`に`@"`は不要 | `PRINTFORM ...`と直接書く |
| FORM文字列中にカンマを出力できない | カンマは`FORM_STR_ANY`の区切り記号 | `PRINTS @"..."`または文字列式を使用 |
| `\@`三項演算子で`#`がコメント扱いされる | されない、`#`はFORMでは三項演算子の区切り記号 | そのまま使用可 |
| `STR:0 = %RESULTS%`がeramakerと動作が違う | eramakerは`%`を展開しない | `\%RESULTS\%`で互換 |
| 全角文字のパディング幅がおかしい | パディング長はシステムエンコーディングのバイト数で計算 | `LangManager`のエンコーディング依存を理解 |
| `{A,10}`でAが文字列変数 | `{}`は整数式のみ受け付ける | `%STR,10%`を使用 |

---

## 構文クイックリファレンス

```
FORM文字列構文（PRINTFORM引数 / @"..."内部）：

  通常テキスト        → そのまま出力
  %文字列式%         → 文字列値に置換
  %式,桁数%          → 置換して右揃えパディング
  %式,桁数,LEFT%     → 置換して左揃えパディング
  {整数式}           → 評価して文字列に変換
  {式,桁数}          → 文字列変換して右揃えパディング
  {式,桁数,LEFT}     → 文字列変換して左揃えパディング
  \@ 条件 ? 真 # 偽 \@ → 条件が真なら真値、偽なら偽値を出力
  ***                → NAME:TARGET
  +++                → CALLNAME:MASTER
  ===                → CALLNAME:PLAYER
  ///                → NAME:ASSI
  $$$                → CALLNAME:TARGET
  \s                 → 半角スペース
  \S                 → 全角スペース
  \t                 → タブ
  \n                 → 改行
  \\                 → バックスラッシュ
  \%                 → パーセント（置換をトリガーしない）
  \{                 → 左波括弧（埋め込みをトリガーしない）
  \"                 → ダブルクォート
  \その他            → その文字（\が消費される）
```
