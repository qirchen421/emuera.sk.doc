# 第7章：実行時メカニズム

!!! info "前提知識"

    - **Reference 分類**: [関数系（CALL 等）](../Reference/README.md#function-call) / [RETURN 系](../Reference/README.md#return)
    - [関数とCALL](call.md) — 関数呼び出し機構、RETURN/RETURNF
    - [コマンド vs 式](command-vs-expression.md) — 二つの評価パス
    - [変数宣言システム](variable-declaration.md) — REF/OUT、#DIM、VARIADIC

!!! tip "この章のポイント"

    - ERABASICの関数呼び出しは三段階パイプラインで処理される：`ConvertArg`（検証）→ `SetTransporter`（値/参照の抽出）→ `IntoFunction`（仮引数へのバインド）
    - REF変数の`array`は`ScopeIn`でnullにリセットされ、`SetRef`で復元される。このライフサイクルを理解しないと「参照対象がありません」エラーの原因を追跡できない
    - CALL関数と式関数（#FUNCTION）は、`ConvertArg`の実行タイミングが異なる（実行期 vs コンパイル期）

---

## 7.1 関数呼び出しの二つの経路

ERABASICには二つの関数呼び出し方式があり、実行時のパスが異なる：

### CALL関数（コマンド関数）

```
CALL FUNC(arg1, arg2)
│
├─ コンパイル期: 引数の構文チェック
├─ 実行期: CallFunction() → ConvertArg() → SetTransporter() → IntoFunction() → runScriptProc()
└─ 復帰:   ReturnFromFunction() → ScopeOut()
```

- `ConvertArg`は`CallFunction`の内部で呼び出される（**実行期**、呼び出しごとに実行）
- 戻り値は`RESULT`/`RESULTS`経由で受け取る

### 式関数（#FUNCTION/#FUNCTIONS）

```
LOCAL = FUNC(arg1, arg2)
│
├─ コンパイル期: UserDefinedMethodTerm.Create() → ConvertArg() で引数検証
├─ 実行期: Process.GetValue(udmt) → SetTransporter() → IntoFunction() → runScriptProc()
└─ 復帰:   finally { ScopeOut() } → MethodReturnValue
```

- `ConvertArg`は`UserDefinedMethodTerm.Create`の時点で呼び出される（**コンパイル期**、一度だけ）
- 戻り値は`RETURNF`の値として式内で直接使用

### キーとなる違い

| 属性 | CALL関数 | 式関数（#FUNCTION） |
|------|----------|-------------------|
| ConvertArgのタイミング | 実行期（毎回） | コンパイル期（一度だけ） |
| 呼び出し入口 | `CallFunction()` | `GetValue(SuperUserDefinedMethodTerm)` |
| 戻り値 | なし（RESULT/RESULTS経由） | `MethodReturnValue`（RETURNFの値） |
| ScopeOutの位置 | `ReturnFromFunction` | `GetValue`の`finally`ブロック |
| ASTノード | `InstructionLine` | `UserDefinedMethodTerm`（AExpression） |

---

## 7.2 三段階パイプラインの詳細

### 段階1：ConvertArg — 引数の検証と変換

```
CALL FUNC(arg1, arg2)
│
├─ 型チェック（REF引数はVariableTermでなければならない）
├─ 次元マッチング（スカラーREF vs 配列REF）
├─ MatchType型互換性チェック
├─ デフォルト値の充填（省略された引数にDef[i]を適用）
└─ 可変長引数をVariadicArgTermにパッキング
→ 出力: UserDefinedFunctionArgument
```

ConvertArgの主な役割は**静的検証**である。引数の型と数が関数定義と一致するかを確認し、不一致があればコンパイルエラーを発生させる。

### 段階2：SetTransporter — 値と参照の抽出

```
SetTransporter(exm)
│
├─ 非REF引数: 式を評価 → TransporterInt/Str/Float[i] に値を格納
├─ REFスカラー: GetArray() → TransporterRef[i] に参照を格納
├─ REF配列要素: new ElementRefInfo(...) → TransporterElementRef[i] に要素参照を格納
└─ REF配列全体: GetArray() → TransporterRef[i] に配列参照を格納
→ 出力: Transporter配列の充填完了
```

SetTransporterは**実行時の値抽出**を担当する。REF引数の場合、実際の配列オブジェクトへの参照をTransporter配列に格納する。

### 段階3：IntoFunction — 仮引数へのバインド

```
IntoFunction(func, exm)
│
├─ ScopeIn() → 全REF変数のarray=nullにリセット
├─ TransporterElementRef[i] ≠ null → SetRef(ElementRefInfo)
├─ TransporterRef[i] ≠ null → SetRef(Array)
├─ IsOut=true → SetNullRef()（OUT引数省略時のブラックホール）
└─ 非REF: SetValue(TransporterInt/Str/Float[i])
→ 結果: 仮引数バインド完了、関数本体の実行開始
```

---

## 7.3 REF変数のライフサイクル

REF変数の`array`フィールドは、関数呼び出しのライフサイクルに沿って変化する：

```
関数呼び出し前:  array = 前の値（またはnull）
       ↓
ScopeIn():      array = null（リセット）、旧値をarrayListに退避
       ↓
SetRef():       array = 実引数の配列参照（バインド）
       ↓
関数本体の実行:  arrayを通じて実引数にアクセス
       ↓
ScopeOut():     array = 退避した旧値に復元
```

### ネスト呼び出しの例

```erb
@OUTER
#DIM REF HIT_LIST, 0
; HIT_LIST.array = 外部配列への参照

CALL INNER(HIT_LIST)
; ← IntoFunction内で:
;   ScopeIn() → HIT_LIST.array = null, arrayList = [外部配列]
;   SetRef(内部配列) → HIT_LIST.array = 内部配列
; ← 関数終了時:
;   ScopeOut() → HIT_LIST.array = 外部配列（復元）

@INNER
#DIM REF DATA, 0
; DATAを通じてHIT_LISTのデータにアクセス
DATA:0 = 42
; ← 呼び出し元の配列に書き込まれる
```

!!! warning "ScopeInが呼び出されないケース"

    `ScopeIn`は`hasPrivDynamicVar=true`の場合にのみ呼び出される。関数に`#DIM DYNAMIC`変数がない場合、`ScopeIn`/`ScopeOut`は呼び出されず、REF変数の`array`は最初の`SetRef`後そのまま維持される。

---

## 7.4 「参照対象がありません」エラー

REF変数の`array`が`null`の状態でアクセスすると、このエラーが発生する：

```
参照型変数"X"は参照対象を持っていません
```

### 発生条件

| シナリオ | 原因 | 対処 |
|---------|------|------|
| REF引数の省略（OUT以外） | `TransporterRef[i]`がnullのまま | REF引数は省略不可（OUTのみ省略可能） |
| IntoFunctionでSetRef未呼び出し | バインドロジックの欠陥 | ConvertArg→SetTransporter→IntoFunctionの全链路を確認 |
| ScopeOut後の未再バインド | ネスト呼び出しからの復帰後、再バインドが必要 | 呼び出し構造を見直す |

### デバッグ手順

1. `ConvertArg`：引数の型と数が正しいか確認
2. `SetTransporter`：Transporter配列に正しい値/参照が格納されているか確認
3. `IntoFunction`：`SetRef`が正しく呼び出されているか確認
4. `ScopeIn`/`ScopeOut`：REF変数の`array`が期待通りに変化しているか確認

---

## 7.5 OUT引数のブラックホール

OUT引数が省略された場合、`SetNullRef()`が呼び出され、**NullRefTerm**というブラックホールにバインドされる：

```erb
@FUNC
#DIM OUT RESULT_OUT, 0
; 呼び出し側がOUT引数を省略した場合:
; RESULT_OUT → NullRefTerm（書き込んでもどこにも反映されない）

CALL FUNC
; RESULT_OUTへの書き込みはブラックホールに吸い込まれる

CALL FUNC(RESULT_OUT)
; こちらは正常にRESULT_OUTに値が反映される
```

!!! warning "OUT引数の省略順序"

    OUT引数は宣言順にバインドされる。中間のOUT引数を省略すると、後続の引数がすべてずれる：

    ```erb
    @FUNC
    #DIM OUT A, 0
    #DIM OUT B, 0
    #DIM OUT C, 0

    ; ❌ 危険：Bだけ省略しようとしても、構文上は(A, C)となり
    ;    CがBの位置にバインドされてしまう
    CALL FUNC(RESULT_A, RESULT_C)
    ```

---

## 7.6 RESULTの挙動と関数の暗黙の末尾

### コマンド関数のRESULT

コマンド関数（CALLで呼び出される関数）では、`RETURN`が`RESULT`を設定する。しかし、**関数の末尾に暗黙の`RESULT = 0`が存在する**：

```erb
@MY_FUNC
; （RETURN文なし）
; ← 暗黙的に RESULT = 0 が設定される

@MY_FUNC2
RESULT = 42
RETURN
; ← RETURN は RESULT を 42 に設定する……のではなく、
;    関数末尾の RESULT=0 が実行されるわけではない。
;    実際は RETURN 自体が RESULT を設定する
```

### 式関数のRETURNF

式関数（#FUNCTION）では、`RETURNF`は`MethodReturnValue`を設定するが、`RESULT`には触れない：

```erb
@MY_EXPR_FUNC
#FUNCTION
RETURNF 42
; ← RESULT は変更されない
; ← MethodReturnValue = 42
```

### JUMPのRESULT

JUMPはスタックフレームを置き換えるだけで、RETURNのRESULT設定メカニズム自体は変わらない。JUMP先の関数でRETURNが実行されれば、通常通りRESULTが設定される。

---

## 7.7 実行時メカニズムの全体図

```
ERBスクリプト
    │
    ├─ CALL FUNC(args) ─────────────────────────────────────┐
    │                                                       │
    ├─ LOCAL = FUNC(args)  ← #FUNCTION                      │
    │                                                       │
    └─ CALLFORM / CALLSTR ──────────────────────────────────┘
                                                            │
    ┌───────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   ConvertArg    │────▶│  SetTransporter  │────▶│   IntoFunction   │
│  (検証・変換)    │     │  (値/参照の抽出)  │     │  (仮引数バインド) │
└─────────────────┘     └──────────────────┘     └──────────────────┘
    コンパイル期             実行期                    実行期
    または実行期

    ▼
┌─────────────────┐     ┌──────────────────┐
│  runScriptProc  │────▶│  Return /        │
│  (関数本体の実行) │     │  ReturnFromFunc  │
└─────────────────┘     └──────────────────┘
                              │
                              ├─ RETURN → RESULT設定 → ScopeOut
                              ├─ RETURNF → MethodReturnValue → ScopeOut
                              └─ JUMP → 再帰的Return() → 非JUMP呼び出し元まで
```

---

## 7.8 まとめ

| 概念 | ポイント |
|------|---------|
| 三段階パイプライン | ConvertArg → SetTransporter → IntoFunction。各段階の役割とタイミングを理解することが重要 |
| REF変数ライフサイクル | ScopeIn(null化) → SetRef(バインド) → ScopeOut(復元)。DYNAMIC変数がない関数ではScopeIn/ScopeOutが呼ばれない |
| OUT引数のブラックホール | 省略されたOUT引数はNullRefTermにバインドされ、書き込んでも反映されない |
| CALL vs 式関数 | ConvertArgのタイミングが異なる（実行期 vs コンパイル期）。RESULTの挙動も異なる |
| RESULTの暗黙設定 | コマンド関数の末尾には暗黙のRESULT=0が存在。RETURNFはRESULTに触れない |
