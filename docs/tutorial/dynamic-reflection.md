# 第6章：動的解析とリフレクション

!!! info "前提知識"

    - **Reference 分類**: [変数操作・CSV 参照](../Reference/README.md#variable-operations) / [文字列操作・参照](../Reference/README.md#string-operations)
    - [関数とCALL](call.md) — 関数呼び出し機構、RETURN/RETURNF
    - [FORM構文](form-syntax.md) — `%変数%`、`{式}` 展開ルール
    - [命令 vs 式](command-vs-expression.md) — 二つの評価パス
    - [キャラ変数](character-variables.md) — CSVテンプレートとキャラクタ番号

!!! tip "この章のポイント"

    - ERABASICのリフレクション能力は4世代の進化を経てきた：固定マッピング → 名前逆引き → 変数リフレクション → 汎用評価
    - 各世代は一群の関数に対応する。進化の流れを理解することで各関数の設計動機と制限がわかる
    - FORM構文は動的解析の「バックドア」であり、以降の動的能力はすべてFORMから派生した

---

## 6.1 第一世代：固定マッピング（eramaker）— 番号→値

eramaker時代のクエリ関数はすべて**一方向固定マッピング**：既知の番号から対応する値を検索する。変数族ごとに専用関数があり、関数名にアクセス対象がハードコードされている：

```erb
; CSV系クエリ：既知のテンプレート番号からテンプレート内の値を検索
S '= CSVNAME(0)             ; テンプレート0のNAME
S '= CSVCALLNAME(0)         ; テンプレート0のCALLNAME
X = CSVBASE(0, 2)           ; テンプレート0のBASE:2
X = CSVTALENT(0, 5)         ; テンプレート0のTALENT:5

; キャラクタクエリ：既知の番号からキャラクタを検索
I = GETCHARA(0)             ; テンプレート番号0に対応するキャラクタインデックスを検索
I = FINDCHARA(TALENT, 5)    ; TALENT:5 == 1 のキャラクタを検索

; レベルクエリ：既知の値から対応するレベルを検索
LV = GETPALAMLV(PALAM:0:2, 10)  ; PALAM:0:2の値を10段階の閾値でレベルに変換
LV = GETEXPLV(EXP:0:2, 10)      ; EXP:0:2の値を10段階の閾値でレベルに変換
```

**特徴**：コンパイル時にどの変数族にアクセスするかが決まっており、文字列で動的に選択することはできない。

**関数リファレンス**：[CSVNAME](../Reference/CSVNAME.md)、[CSVBASE](../Reference/CSV_STATUS.md)、[GETCHARA](../Reference/GETCHARA.md)、[FINDCHARA](../Reference/FINDCHARA.md)、[GETPALAMLV](../Reference/GETPALAMLV.md)

---

## 6.2 第二世代：名前逆引き（Emuera）— 文字列→番号

Emueraは`GETNUM`を導入し、**名前→番号**の逆引きを実現した。文字列を使って動的に列挙値を検索できるようになった最初の機能である：

```erb
; GETNUM — 名前文字列から番号を検索
IDX = GETNUM(PALAM, "気力")     ; PALAM内の"気力"の番号を返す
IDX = GETNUM(TALENT, "害羞")    ; TALENT内の"害羞"の番号を返す
IDX = GETNUM(CFLAG, L_FLAG_NAME) ; 動的に名前を構築して検索
```

`GETNUM`の第一引数は**変数参照**（文字列ではない）、第二引数は名前文字列である。CSV別名辞書内で名前に対応する整数番号を検索する。

**制限**：変数族はコンパイル時に指定する必要がある（第一引数が変数参照のため）。変数族を完全に動的に選択することはできない。

**関数リファレンス**：[GETNUM](../Reference/GETNUM.md)

### 同時期のFORM動的評価

Emueraは同時に`RETURNFORM`と`CALLFORM`を導入し、FORM構文の実行時展開能力を活用した：

```erb
; RETURNFORM — FORM展開後に整数式として評価
RETURNFORM %L_EXPR%         ; 二段階：FORM展開 → 整数式解析 → RESULTへ書き込み

; CALLFORM — FORM展開結果を関数名として使用
CALLFORM MY_FUNC_%L_SUFFIX% ; FORM展開 → 関数名検索 → 呼び出し
```

!!! warning "RETURNFORMは整数のみ返す"

    `RETURNFORM`の評価は二段階で行われる：FORM展開 → 整数式解析。最終結果は`RESULT`（整数配列）に書き込まれる。`RETURNSFORM`は存在しない。文字列を返すには`RESULTS = ...` + `RETURN`を使用する。

    `CALLFORM`は関数名のみ動的に構築でき、パラメータはコンパイル時に固定される。`CALLFORM F_%X%(1, 2)`の`(1, 2)`は固定である。

**関数リファレンス**：[RETURNFORM](../Reference/RETURN.md)、[CALLFORM](../Reference/FORM.md)

---

## 6.3 第三世代：変数リフレクション（EM拡張）— 文字列→変数Token

EM（EvilMask）拡張は完全な変数リフレクション機能を導入し、文字列を介した動的な変数アクセスを可能にした：

### 変数存在チェック

```erb
; EXISTVAR — 変数の存在確認、ビットマスクを返す
R = EXISTVAR("MONEY")       ; 1=整数, 2=文字列, 32=浮動小数点, 4=定数, 8=2D, 16=3D
R = EXISTVAR("NAME")        ; 2を返す（文字列変数）

; ISDEFINED — #DEFINEマクロの定義確認
R = ISDEFINED("MY_MACRO")   ; 1=定義済み, 0=未定義
```

### 変数値の読み書き

```erb
; GETVAR — 文字列名で整数変数を読み取り
X = GETVAR("MONEY")            ; X = MONEY と同等
X = GETVAR("COUNT:" + TSTR:0)  ; 変数名+インデックスを動的に構築
X = GETVAR(L_VAR_NAME, 0)      ; 変数が存在しない場合デフォルト値0を返す

; GETVARS — 文字列名で文字列変数を読み取り
S '= GETVARS("NAME:TARGET")    ; S '= NAME:TARGET と同等
S '= GETVARS(L_VAR_NAME, "")   ; 変数が存在しない場合デフォルト値""を返す

; SETVAR — 文字列名で変数に書き込み
SETVAR "MONEY", 1000           ; MONEY = 1000 と同等
```

### 関数/変数/マクロの列挙

```erb
; ENUMFUNC* — 接頭辞/接尾辞/部分一致で関数名を列挙
N = ENUMFUNCBEGINSWITH("SHOP")   ; "SHOP"で始まる関数の数
N = ENUMFUNCENDSWITH("_EVENT")   ; "_EVENT"で終わる関数の数
N = ENUMFUNCWITH("HELPER")       ; "HELPER"を含む関数の数

; ENUMVAR* — 接頭辞/接尾辞/部分一致で変数名を列挙
N = ENUMVARBEGINSWITH("FLAG")    ; "FLAG"で始まる変数の数

; ENUMMACRO* — 接頭辞/接尾辞/部分一致でマクロ名を列挙
N = ENUMMACROBEGINSWITH("DBG")   ; "DBG"で始まるマクロの数
```

**重要な違い**：`GETVAR`は変数参照のみ受け付け（式は不可）、`EVAL`は任意の式を受け付ける。`GETVAR("A + 10")`はエラーになるが、`EVAL("A + 10")`は正常に評価される。

**関数リファレンス**：[EXISTVAR](../Reference/EXISTVAR.md)、[ISDEFINED](../Reference/ISDEFINED.md)、[GETVAR/GETVARS/SETVAR](../Reference/GETSETVAR.md)、[ENUMFUNC*](../Reference/ENUMFUNC.md)、[ENUMVAR*](../Reference/ENUMVAR.md)、[ENUMMACRO*](../Reference/ENUMMACRO.md)

### EE拡張：番号→名前逆引き

EE拡張は`ERDNAME`を導入し、`GETNUM`の逆操作——既知の番号から対応する名前文字列を検索——を実現した：

```erb
; ERDNAME — 番号から名前を検索
S '= ERDNAME(PALAM, 2)       ; PALAM:2の名前を返す（例："理由"）
S '= ERDNAME(TALENT, 5)      ; TALENT:5の名前を返す（例："害羞"）
```

**関数リファレンス**：[ERDNAME](../Reference/ERDNAME.md)

### DotNet拡張：キャラクタ名→番号逆引き

DotNet派生版は`GETCSVNOBY*`シリーズを導入し、キャラクタ名からテンプレート番号を逆引きする：

```erb
; GETCSVNOBY* — キャラクタ名からテンプレート番号を逆引き
I = GETCSVNOBYNAME("博丽灵梦")          ; NAMEで逆引き
I = GETCSVNOBYNICKNAME("乐园的巫女")     ; NICKNAMEで逆引き
I = GETCSVNOBYCALLNAME("灵梦")           ; CALLNAMEで逆引き
I = GETCSVNOBYMASTERNAME("灵梦大人")     ; MASTERNAMEで逆引き
```

**関数リファレンス**：[GETCSVNOBY*](../Reference/GETCSVNOBY.md)

---

## 6.4 第四世代：汎用動的評価（Skia）— 文字列→任意の式

### EVAL/EVALS/EVALF — 汎用式評価

Skia派生版はEVALシリーズを導入した。RETURNFORMの汎用化アップグレードであり、RETURNのセマンティクスに縛られず、**式関数**として任意のコンテキストで使用できる：

```erb
; EVAL — 整数の動的評価
X = EVAL("A * 10")              ; X = A * 10 と同等
X = EVAL(L_EXPR, 0)             ; 解析失敗時はデフォルト値0を返す

; EVALS — 文字列の動的評価
S '= EVALS("NAME:TARGET")        ; S '= NAME:TARGET と同等
S '= EVALS(L_STR_EXPR, "")       ; 解析失敗時はデフォルト値""を返す

; EVALF — 浮動小数点の動的評価
F = EVALF("3.14 * 2")           ; 浮動小数点式の評価
F = EVALF(L_FLOAT_EXPR, 0.0)    ; 解析失敗時はデフォルト値0.0を返す
```

### RETURNFORMとの重要な違い

| | RETURNFORM | EVAL/EVALS/EVALF |
|------|-----------|------------------|
| **使用場所** | 独立した命令のみ | 式関数、任意の式内で使用可能 |
| **型サポート** | 整数のみ | 整数/文字列/浮動小数点の3種類 |
| **デフォルト値** | なし（解析失敗はエラー） | あり（第二引数、省略時は型のゼロ値） |
| **例外安全性** | なし（例外が伝播） | あり（解析失敗時にデフォルト値を返す） |
| **式の種類** | 整数式のみ | 任意の式（演算子、関数呼び出しを含む） |

### GETVARとの重要な違い

| | GETVAR/GETVARS | EVAL/EVALS/EVALF |
|------|---------------|------------------|
| **受け付ける内容** | 変数参照のみ | 任意の式 |
| `GETVAR("A+10")` | ❌ エラー | — |
| `EVAL("A+10")` | — | ✅ 正常に評価 |
| `GETVAR("MONEY")` | ✅ 変数を読み取り | ✅ 可能 |
| `EVAL("MONEY")` | — | ✅ ただしEVALの方が重い（完全な解析が必要） |

**関数リファレンス**：[EVAL/EVALS](../Reference/EVAL.md)

### CALLSTR — 関数名+パラメータの完全動的リフレクション

`CALLFORM`は関数名のみ動的に構築でき、パラメータはコンパイル時に固定される。`CALLSTR`はさらに進んで——**関数名とパラメータの両方を実行時文字列から解析する**：

```erb
; CALLFORM：関数名のみ動的
CALLFORM MY_FUNC_%SUFFIX%(1, 2)    ; パラメータ(1, 2)は固定

; CALLSTR：関数名とパラメータの両方が動的
L_CALL_STRING '= "MY_FUNC_A(1, 2)"
CALLSTR L_CALL_STRING               ; 実行時に関数名+パラメータを解析

; 安全版
TRYCALLSTR L_CALL_STRING             ; 関数が存在しなくてもクラッシュしない
TRYCCALLSTR L_CALL_STRING            ; 関数が存在しない場合CATCHにジャンプ
```

**関数リファレンス**：[CALLSTR](../Reference/CALLSTR.md)

### ALS多対一マッピング修正

上流のemuera.emのCSV別名読み込みでは、**番号の重複**をチェックしていたため、同じ番号に複数の名前を登録できなかった。Skiaでは**名前の重複**をチェックするように修正し、複数の名前が同じ番号にマッピングできるようにした：

```csv
; palam.csv
2,理由
2,理性        ; ← 上流：「番号重複」警告、名前は登録されない
              ; ← Skia：正常に登録、GETNUM(PALAM, "理性") は2を返す
2,Reason      ; ← Skia：同様に動作、多対一マッピング
```

| | 上流（emuera.em） | Skia修正 |
|------|:---:|:---:|
| **チェック対象** | 番号（index）の重複 | 名前（aliasName）の重複 |
| **マッピング関係** | 一対一 | 多対一 |
| **同番号・複数名前** | ❌ 拒否 | ✅ 正常に登録 |
| **同名・複数番号** | 後者が前者を上書き | 拒否（名前は一意） |

これは「列挙番号が主キー」から「列挙名が主キー」への設計転換である——名前が識別子であり、番号は値であり、複数の識別子が同じ値にマッピングできる。

---

## 6.5 リフレクション能力の進化一覧

| 時代 | 能力 | 代表関数 | 動的度合い | クエリ方向 |
|------|------|---------|---------|---------|
| eramaker | CSV番号→値クエリ | `CSVNAME`/`CSVBASE`/`CSVTALENT` | 番号→値（固定マッピング） | 番号 → 値 |
| eramaker | キャラクタ番号逆引き | `GETCHARA`/`FINDCHARA` | 番号→キャラクタインデックス | 番号 → インデックス |
| eramaker | 値→レベルクエリ | `GETPALAMLV`/`GETEXPLV` | 値→レベル閾値 | 値 → レベル |
| Emuera | 名前→番号逆引き | `GETNUM` | 文字列→番号マッピング | 名前 → 番号 |
| Emuera | FORM動的戻り値 | `RETURNFORM` | FORM→整数解析 | 文字列 → 整数 |
| Emuera | 関数名リフレクション | `CALLFORM` | FORM→関数名検索 | 文字列 → 関数 |
| EM拡張 | 変数存在チェック | `EXISTVAR`/`ISDEFINED` | 文字列→Token存在性 | 名前 → 存在性 |
| EM拡張 | 変数値読み書き | `GETVAR`/`GETVARS`/`SETVAR` | 文字列→変数値 | 名前 → 値 |
| EM拡張 | 関数/変数/マクロ列挙 | `ENUMFUNC*`/`ENUMVAR*`/`ENUMMACRO*` | 接頭辞→名前リスト | 接頭辞 → 名前リスト |
| EE拡張 | 番号→名前逆引き | `ERDNAME` | 変数+番号→名前 | 番号 → 名前 |
| DotNet | キャラクタ名→番号逆引き | `GETCSVNOBY*` | 名前→テンプレート番号 | 名前 → 番号 |
| Skia | 汎用式評価 | `EVAL`/`EVALS`/`EVALF` | 文字列→式評価 | 文字列 → 任意の値 |
| Skia | 関数名+パラメータリフレクション | `CALLSTR` | 文字列→完全な関数呼び出し | 文字列 → 関数呼び出し |
| Skia | 多対一列挙マッピング | ALS修正 | CSV別名の多対一 | 複数名前 → 同番号 |

### 進化の方向性

```
固定マッピング → 名前逆引き → 変数リフレクション → 汎用評価
   ↑               ↑               ↑                   ↑
CSVNAME         GETNUM          GETVAR              EVAL
GETCHARA        RETURNFORM      EXISTVAR            CALLSTR
GETPALAMLV      CALLFORM        ENUM*               ALS修正
                                ERDNAME
                                GETCSVNOBY*
```

**核心トレンド**：「コンパイル時にすべてを決定」から「実行時に必要に応じて解決」へ。各進化ステップは具体的なニーズに対応している：

1. **CSV\* / GETCHARA**：既知の番号から値を検索する必要
2. **GETNUM**：名前文字列から番号を検索する必要
3. **RETURNFORM / CALLFORM**：戻り値や関数名を動的に構築する必要
4. **GETVAR / EXISTVAR / ENUM\***：文字列で動的に変数にアクセスする必要
5. **ERDNAME / GETCSVNOBY\***：番号↔名前の双方向クエリが必要
6. **EVAL / CALLSTR**：任意の文字列を式や関数呼び出しとして評価する必要
7. **ALS修正**：同じ概念に複数の名前が必要（多対一マッピング）

---

## 次のステップ

| 知りたい内容 | 移動先 |
|:---|:---|
| ランタイム機構（ConvertArg→IntoFunction） | [ランタイム機構](runtime-mechanics.md)（未作成） |
| アンチパターンとよくあるエラー | [アンチパターン](anti-patterns.md)（未作成） |
| 関数宣言システム | [変数宣言](variable-declaration.md) |
| 命令 vs 式 | [命令 vs 式](command-vs-expression.md) |
| CSV別名機構 | [キャラ変数](character-variables.md) |
