# 定数畳み込み（Constant Folding）

!!! info "前提知識"

    - **Reference 分類**: [変数宣言系](../Reference/README.md#variable-declaration)
    - [変数宣言システム](variable-declaration.md) — #DIM/#DIMS/#DIMF 宣言、配列初期化
    - [条件分岐](condition.md) — SELECTCASE 構文
    - [コマンド vs 式](command-vs-expression.md) — 式中関数の仕組み

!!! tip "この章のポイント"

    - ERABASIC はコンパイル時に式を評価（定数畳み込み）できる。これにより `#DIM ARR = POWER(2,3)` のような配列初期化が可能
    - `CanRestructure` プロパティが `true` の関数だけが定数畳み込み対象。数学関数（POWER/ABS/SQRT 等）は `CanRestructure = true` でなければならない
    - SELECTCASE の CASE が定数の場合、コンパイル時にジャンプテーブルを構築し、O(n) の線形探索を O(1) のハッシュ検索に最適化

---

## 定数畳み込みとは

定数畳み込み（Constant Folding）とは、**コンパイル時に計算できる式をあらかじめ評価し、結果の定数に置き換える**最適化手法です。

ERABASIC では主に 2 つの場面で定数畳み込みが使われます：

1. **配列初期化** — `#DIM ARR = POWER(2,3)` を `#DIM ARR = 8` に変換
2. **SELECTCASE ジャンプテーブル** — CASE 値が定数ならハッシュテーブルを構築

---

## CanRestructure — 定数畳み込みの鍵

### 概念

`CanRestructure` は `FunctionMethod` クラスのプロパティで、その関数が**同じ引数に対して常に同じ値を返す**（参照透過である）ことを示します。

```csharp
// FunctionMethod.cs
public virtual bool CanRestructure => false;  // デフォルト：定数畳み込み不可

// 例：POWER 関数
private sealed class PowerMethod : FunctionMethod
{
    public PowerMethod()
    {
        ReturnType = typeof(long);
        argumentTypeArray = [typeof(long), typeof(long)];
        CanRestructure = true;  // ← 同じ引数なら常に同じ結果
    }
}
```

### CanRestructure が true になる条件

| 条件 | 説明 |
|------|------|
| 同じ引数で常に同じ値を返す | 参照透過性（pure function） |
| グローバル状態に依存しない | RESULT、変数値などに依存しない |
| 副作用がない | I/O、変数変更などを行わない |

### CanRestructure が false の例

| 関数 | 理由 |
|------|------|
| `GETTIME` | 呼び出すたびに異なる値を返す |
| `RAND` | ランダム値を返す |
| `GETCHARA` | キャラクター追加・削除で結果が変わる |
| `GETVAR` | 変数の実行時値に依存 |

---

## 配列初期化での定数畳み込み

### ルール

`#DIM`/`#DIMS`/`#DIMF` の配列初期化子には**定数のみ**指定できます。しかし、`CanRestructure = true` の関数は定数として扱われるため、初期化子に使用できます。

### 畳み込みの流れ

```
ERB: #DIM ARR, 10 = POWER(2,3), ABS(-5), SQRT(16)
  ↓ ErhLoader 解析初期化子
  ↓ 各式に対して expr.Restructure(null) を呼び出し
  ↓ POWER(2,3) → CanRestructure = true → 評価 → SingleLongTerm(8)
  ↓ ABS(-5)   → CanRestructure = true → 評価 → SingleLongTerm(5)
  ↓ SQRT(16)  → CanRestructure = true → 評価 → SingleLongTerm(4)
  ↓ 結果: #DIM ARR, 10 = 8, 5, 4  ← すべて定数！
```

### CanRestructure が false だった場合

```
ERB: #DIM ARR, 10 = GETTIME()
  ↓ ErhLoader 解析初期化子
  ↓ GETTIME() → CanRestructure = false → Restructure 不可
  ↓ 結果が SingleTerm にならない → !result.IsConst
  ↓ エラー: "配列の初期値には定数のみ指定できます"
```

### CanRestructure の修正履歴

以下の数学関数は、元々 `CanRestructure = false` でしたが、配列初期化での使用を可能にするため `true` に修正されました：

| 関数 | 説明 | 修正時期 |
|------|------|---------|
| `POWER` | べき乗 | LazyLoading 版で修正、m-emuera に同期（2026-05-13） |
| `ABS` | 絶対値 | 同上 |
| `SQRT` | 平方根 | 同上 |
| `SIN`/`COS`/`TAN` | 三角関数 | 同上 |
| `ASIN`/`ACOS`/`ATAN` | 逆三角関数 | 同上 |
| `LOG`/`LOG10`/`EXP` | 対数・指数 | 同上 |
| `MAX`/`MIN` | 最大・最小 | 同上 |
| `SIGN` | 符号 | 同上 |
| `FLOOR`/`CEIL` | 床・天井関数 | 同上 |

---

## SELECTCASE ジャンプテーブル最適化

### 最適化の概要

SELECTCASE は通常、CASE を上から順に線形探索します（O(n)）。しかし、すべての CASE が定数値の場合、コンパイル時に `Dictionary` ジャンプテーブルを構築し、O(1) のハッシュ検索に最適化できます。

### 最適化の条件

| 条件 | 説明 |
|------|------|
| SELECTCASE の引数が Integer/String/Float 型 | これらの型のみ Dictionary に格納可能 |
| すべての CASE が `CaseType == Normal` | `TO` や `IS` を含む CASE は範囲比較が必要 |
| すべての CASE 値がコンパイル時定数 | `IsConst == true` または `Restructure` で定数化可能 |
| CASE 値に重複がない | 重複値は警告付きでスキップ（ジャンプテーブル自体は保持） |

### 定数畳み込みによる CASE 値の解決

CASE 式が `!IsConst`（定数ではない）場合でも、`Restructure(null)` を試みます：

```csharp
if (!leftTerm.IsConst)
{
    try
    {
        AExpression restructured = leftTerm.Restructure(null);
        if (restructured is SingleTerm st)
            leftTerm = st;    // ← 定数に畳み込み成功
        else
            return null;      // ← 畳み込み失敗、ジャンプテーブル不可
    }
    catch { return null; }
}
```

これにより、`CASE 1+2` のような定数式も最適化対象になります。

### 最適化できないケース

| ケース | 理由 |
|--------|------|
| `CASE 1 TO 10` | 範囲比較が必要、ハッシュ不可 |
| `CASE IS > 5` | 比較演算が必要、ハッシュ不可 |
| `CASE X`（X が変数） | 実行時まで値が不明、かつ Restructure 不可 |
| SELECTCASE の引数が Object 型 | Dictionary に格納できない |

### 重複 CASE 値の処理

**旧動作**：重複値があるとジャンプテーブル全体を放棄。

**新動作**（m-emuera 2026-05-13 移植）：重複値は警告を出してスキップし、ジャンプテーブル自体は保持：

```
SELECTCASE X
CASE 1
    ; 処理 A
CASE 1       ; ← 警告：重複値 1（前の出現: filename:lineno）、スキップ
    ; 処理 B  ← この分岐はジャンプテーブルに含まれない
CASE 2
    ; 処理 C
ENDSELECT
```

---

## ERB スクリプトへの透明性

定数畳み込みとジャンプテーブル最適化は**完全に透明**です。ERB スクリプトを一切変更する必要はありません。コンパイラが自動的に最適化の可否を判断し、不可の場合は元の動作にフォールバックします。

---

## 関連章

- [変数宣言システム](variable-declaration.md) — #DIM/#DIMS/#DIMF 宣言と配列初期化
- [条件分岐](condition.md) — SELECTCASE 構文の基本
- [コマンド vs 式](command-vs-expression.md) — 式中関数の仕組み
