# ERABASIC 简介

!!! info "本節対応マニュアル"

    - [関数・プリプロセッサ](../Emuera/function.md) — 関数宣言の完全仕様
    - [変数仕様](../Emuera/variables.md) — 変数システムの完全仕様
    - [バージョン進化比較](evolution.md) — Emuera → EM+EE → 各派生版機能比較

---

## ERABASICとは

ERABASICは**行駆動のドメイン固有言語（DSL）**で、eraシリーズのテキストゲームのために設計されています。eramakerで定義されたBASIC変体に由来し、Emueraとその派生版によって大幅に拡張されました。

ERABASICには、主流言語と根本的に異なる3つの特徴があります：

| 特徴 | 主流言語 | ERABASIC |
|------|---------|----------|
| 実行モデル | ブック構造（波括弧） | **行駆動**（1行1文） |
| 宣言モデル | シグネチャ＝宣言 | **シグネチャ参照 + 関数内宣言** |
| 型モデル | コンパイル時静的型付け | **実行時3タイプ**（Int / Str / Float） |

### 行駆動

```erb
; 1行1文、セミコロンなし、波括弧なし
PRINTL こんにちは、世界
X = 10
Y = X * 2

; SIFは次の1行のみ制御（ENDIFなし）
SIF X > 5
    PRINTL Xは5より大きい

; IFにはENDIFが必要
IF X > 5
    PRINTL Xは5より大きい
ELSE
    PRINTL Xは5以下
ENDIF
```

### シグネチャ参照 + 関数内宣言

```erb
; 関数シグネチャのパラメータ名は変数への「参照」であり、宣言ではない
; 変数は #DIM で関数内に宣言する必要がある
@MY_FUNC(L_val, ARG:0)
#DIM L_val, 1              ; ← L_valを宣言、シグネチャが参照できる
    L_val = ARG:0 * 2
    PRINTVL L_val
RETURN L_val
```

!!! warning "AIや主流言語からの移行者が最も犯しやすい間違い"

    主流言語では、パラメータの型と修飾子はシグネチャで宣言します。ERABASICは異なります：
    - 型は `#DIM`/`#DIMS`/`#DIMF` で決定（シグネチャではない）
    - `REF`/`OUT` は `#DIM` 行で宣言（シグネチャではない）
    - `#FUNCTION` は関数タイプをマーク（シグネチャ構文ではない）

    詳細は[変数宣言システム](variable-declaration.md)を参照。

### 3タイプ体系

| 型 | 宣言キーワード | パラメータ変数 | リテラル | デフォルト値 |
|------|-----------|---------|--------|--------|
| Integer | `#DIM` | `ARG` | `42` | `0` |
| String | `#DIMS` | `ARGS` | `"hello"` | `""` |
| Float | `#DIMF` | `ARGF` | `3.14` | `0.0` |

3つの型の間で**自動変換は行われません**（Int→Floatの安全な昇格を除く）。

---

## バージョン進化

ERABASICの進化ルート：

```
eramaker（2005）  →  Emuera（2008-2017）  →  EM+EE（2019-）  →  各派生版
  原始定義              大幅拡張              機能強化            Skia / DotNet / m-emuera
```

| バージョン | 特徴 |
|------|------|
| **eramaker** | 原始定義、機能限定、歴史的参考のみ |
| **Emuera** | 大幅拡張、現代ERABASICのベースライン |
| **EM+EE** | オーディオ、ホットキー、クリップボード、TTF/OTF動的ロード |
| **Skia版** | レイジーロード、MAP強化、SQL/XML、SETIMAGELAYER |
| **DotNet** | SkiaSharpクロスプラットフォーム、並列ロード、DICT辞書 |
| **m-emuera** | Avalonia UIクロスプラットフォーム参考実装 |

!!! tip "本チュートリアルはEmueraをベースラインとする"

    eramakerはバージョン進化の章でのみ歴史的参考として言及します。現代ERABASICはEmueraをベースとし、EM+EEおよび各派生版の拡張機能は各章の末尾に個別に記載します。

---

## 次のステップ

| 知りたいこと | 進むべきページ |
|:---|:---|
| ファイルタイプと処理順序 | [ファイルタイプ](file-types.md) |
| 行タイプと構造 | [行タイプ](line-types.md) |
| 最初のERBプログラム | [Hello World](hello-world.md) |
| 変数と宣言システム | [変数宣言システム](variable-declaration.md) |
