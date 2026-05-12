# キャラ変数

!!! info "本節対応マニュアル"

    - [変数の仕様と一覧](../Emuera/variables.md) — 全変数の完全な仕様
    - [ユーザー定義変数](../Emuera/user_defined_variables.md) — #DIM 宣言仕様
    - [ヘッダファイル（ERH）](../Emuera/ERH.md) — グローバル変数宣言

---

## 概要

era ゲームの核心は**キャラクター**である。各キャラクターは独自の属性・状態・能力を持つ。ERABASIC は**キャラ変数**システムでこれらのデータを管理する。

キャラ変数と通常変数の重要な違い：キャラ変数の第一次元インデックスは**キャラ登録番号**であり、各キャラクターが独立したデータを持つ。

!!! note "eramaker互換性"
    基本情報変数（`NAME`/`CALLNAME`/`NO`）、数値型キャラ変数（`BASE`/`ABL`/`TALENT`/`EXP`/`MARK`/`CFLAG`/`PALAM`/`SOURCE`）、キャラ管理命令（`ADDCHARA`/`DELCHARA`）はeramakerから存在する機能です。`CSTR`/`CDFLAG`/`TCVAR`、CSV読取関数（`CSVABL`等）、`VariableSize.csv`、カスタムキャラ変数（`#DIM CHARADATA`）はEmueraの拡張機能です。

```erb
; 通常変数：一次元インデックス
FLAG:10 = 1

; キャラ変数：第一次元はキャラ登録番号
CFLAG:TARGET:10 = 1    ; 調教中キャラの第10号 CFLAG
CFLAG:MASTER:10 = 1    ; 主人公の第10号 CFLAG
```

---

## キャラ番号システム

キャラ変数を理解する前提として、2種類の「キャラ番号」を理解する必要がある：

### 登録番号 vs キャラ番号

| 概念 | 識別子 | 説明 | 特徴 |
|------|--------|------|------|
| **登録番号** | `MASTER`/`TARGET`/`ASSI`/`PLAYER` | エンジンが動的に割り当てるインデックス | 0から連続、追加・削除で変化 |
| **キャラ番号** | `NO` | CSV で定義された固定番号 | 静的、キャラテンプレートを識別 |

```erb
; 登録番号は動的
; ゲーム起動時、主人公が自動登録、番号0
; ADDCHARA で次の連続番号を割り当て
; DELCHARA で番号が再配列

; キャラ番号は静的
; CharaXX.csv の第一列で定義
; 追加・削除で変化しない
```

### 4つのコア登録番号

| 変数 | 意味 | デフォルト値 | 説明 |
|------|------|-------------|------|
| `MASTER` | 主人公の登録番号 | `0`（固定） | 常に 0 |
| `TARGET` | 調教中キャラの登録番号 | `1` | 調教されるキャラ |
| `ASSI` | 助手キャラの登録番号 | `-1`（助手なし） | 調教を補助するキャラ |
| `PLAYER` | 調教実行中キャラの登録番号 | `0`（= MASTER） | 通常は MASTER または ASSI、スクリプトで代入 |

> **PLAYER と ASSIPLAY の関係**：`PLAYER` は「誰が調教を実行しているか」、`ASSIPLAY` は「助手が調教を実行しているか」（0=主人公実行、1=助手実行）を表す。`ASSIPLAY == 1` の時、`PLAYER` は通常 `ASSI` に設定される。

```erb
; 主人公の体力にアクセス
BASE:MASTER:0

; 調教対象の体力にアクセス
BASE:TARGET:0

; 助手の体力にアクセス（ASSI が -1 の場合はエラー）
BASE:ASSI:0

; 調教実行中キャラの体力にアクセス
BASE:PLAYER:0

; PLAYER の典型的な代入パターン
IF ASSIPLAY
    PLAYER = ASSI
ELSE
    PLAYER = MASTER
ENDIF
```

### 登録番号の動的性質

```erb
; 初期状態：主人公のみ、登録番号 0
; MASTER == 0, CHARANUM == 1

ADDCHARA 5        ; キャラ番号5のキャラを追加、登録番号は 1
ADDCHARA 10       ; キャラ番号10のキャラを追加、登録番号は 2
; CHARANUM == 3

DELCHARA 1        ; 登録番号1のキャラを削除
; 登録番号が再配列：元の番号2が1になる
; CHARANUM == 2
```

### 全キャラの走査

```erb
REPEAT CHARANUM
    ; COUNT は現在のキャラの登録番号（0 ~ CHARANUM-1）
    PRINTFORML 登録番号={COUNT}, キャラ番号={NO:COUNT}, 名前=%NAME:COUNT%
REND
```

### キャラ番号で登録番号を検索

```erb
#DIM regNo
regNo = GETCHARA(5)    ; キャラ番号5の登録番号を検索
IF regNo >= 0
    PRINTFORML 見つかりました、登録番号={regNo}
ELSE
    PRINTL キャラが存在しません
ENDIF
```

---

## キャラ変数の分類

### 基本情報変数

各キャラクターに必須の基本情報：

| 変数 | 型 | 説明 |
|------|------|------|
| `NAME` | 文字列 | キャラ名 |
| `CALLNAME` | 文字列 | 呼び名 |
| `NICKNAME` | 文字列 | ニックネーム |
| `MASTERNAME` | 文字列 | 主人への呼び方 |
| `NO` | 整数 | キャラ番号（CSV 定義） |

```erb
PRINTFORML 名前：%NAME:TARGET%
PRINTFORML 呼び名：%CALLNAME:TARGET%
PRINTFORML キャラ番号：{NO:TARGET}
```

### 数値型キャラ変数

最もよく使われるキャラデータ格納先：

| 変数 | 説明 | 保存 | 初期化タイミング |
|------|------|:----:|----------------|
| `BASE` | 基礎パラメータ（体力・気力など） | ✅ | — |
| `ABL` | 能力値 | ✅ | — |
| `TALENT` | 素質（二値マーク） | ✅ | — |
| `EXP` | 経験値 | ✅ | — |
| `MARK` | 刻印 | ✅ | — |
| `CFLAG` | カスタムフラグ | ✅ | — |
| `PALAM` | パラメータ（調教中に変化） | ✅ | TRAIN ループ開始時 |
| `SOURCE` | ソース値（調教計算用） | ✅ | `@SOURCE_CHECK` 後にゼロクリア |
| `EX` | 絶頂経験 | ✅ | TRAIN ループ開始時 |
| `TEQUIP` | 装備状態 | ✅ | TRAIN ループ開始時 |
| `STAIN` | 汚れ | ✅ | TRAIN ループ開始時 |
| `EQUIP` | 装備 | ✅ | — |
| `JUEL` | 宝石（能力向上用） | ✅ | — |
| `GOTJUEL` | 獲得した宝石 | ✅ | TRAIN ループ開始時 |

```erb
; キャラの体力を読み取る
PRINTFORML 体力：{BASE:TARGET:0}

; 素質をチェック
IF TALENT:TARGET:服従
    PRINTL 彼女は従順だ
ENDIF

; カスタムフラグを設定
CFLAG:TARGET:好感度 += 10
```

### 文字列型キャラ変数

| 変数 | 説明 | 保存 |
|------|------|:----:|
| `CSTR` | カスタム文字列 | ✅ |

```erb
CSTR:TARGET:10 = 特殊状態：発情
PRINTFORML 状態：%CSTR:TARGET:10%
```

### TRAIN ループ専用キャラ変数

これらの変数は TRAIN ループ開始時に自動的に 0 に初期化される：

| 変数 | 説明 | 対応するグローバル変数 |
|------|------|---------------------|
| `CUP` | キャラパラメータ上昇値 | `UP` |
| `CDOWN` | キャラパラメータ下降値 | `DOWN` |
| `TCVAR` | キャラ一時変数 | `TFLAG` |

```erb
; CUP/CDOWN は UPCHECK ではなく CUPCHECK を使う
CUP:TARGET:0 += 100
CUPCHECK TARGET
```

### 三次元キャラ変数

| 変数 | 説明 |
|------|------|
| `CDFLAG` | 三次元キャラ変数、3つのインデックスが必要 |

```erb
; 第一パラメータ：キャラ登録番号
; 第二・三パラメータ：カスタムインデックス
CDFLAG:MASTER:0:2 = 1
```

---

## キャラ管理命令

### キャラの追加

```erb
; キャラ番号0のキャラを追加（通常 FIRST で）
ADDCHARA 0

; 指定キャラ番号のキャラを追加
ADDCHARA 5

; 指定位置にキャラを挿入
ADDCHARA 3, 1    ; 登録番号1の位置にキャラ番号3のキャラを挿入
```

### キャラの削除

```erb
; 指定登録番号のキャラを削除
DELCHARA 2

; 全キャラを削除（MASTER 以外）
; 注意：自動的に再番号付けされない
```

### キャラの検索

```erb
; キャラ番号で登録番号を検索
#DIM regNo
regNo = GETCHARA(5)
; regNo >= 0 なら見つかった、-1 なら存在しない

; キャラ名で検索
regNo = GETCHARA("博麗霊夢")
```

### キャラ数の取得

```erb
; CHARANUM は現在登録されているキャラ数を返す
PRINTFORML 現在のキャラ数：{CHARANUM}
```

---

## CSV でキャラデータを定義

キャラデータは `CSV/CHARA*.CSV` ファイルで定義する。ファイル名の数字は**キャラ番号**。

### 基本フォーマット

```csv
; CSV/CHARA0.CSV — キャラ番号0
番号,0
名前,博麗霊夢
呼び名,霊夢
基礎,0,1000
基礎,1,500
素質,0,1
能力,0,5
```

| キーワード | 対応変数 | 説明 |
|-----------|---------|------|
| `番号` | `NO` | キャラ番号 |
| `名前` | `NAME` | キャラ名 |
| `呼び名` | `CALLNAME` | 呼び名 |
| `基礎` | `BASE` | 基礎パラメータ |
| `素質` | `TALENT` | 素質 |
| `能力` | `ABL` | 能力値 |
| `経験` | `EXP` | 経験値 |
| `刻印` | `MARK` | 刻印 |
| `CFLAG` | `CFLAG` | カスタムフラグ |
| `CSTR` | `CSTR` | カスタム文字列 |

### CSV 名前ファイル

各キャラ変数には対応する CSV 名前ファイルがあり、インデックスに対応する名前を定義する：

```csv
; CSV/base.csv — BASE 変数の名前
0,体力
1,気力
```

```erb
; 名前を参照
PRINTFORML %BASENAME:0%：{BASE:TARGET:0}
; 出力：体力：1000
```

### CSV → 変数の完全マッピング

CSV ファイル、名称変数、データ変数、CharaXX.csv キーワード、CSV読取関数の関係を一覧にする。

#### キャラ変数系

| CSV 名前ファイル | 名称変数 | データ変数 | CharaXX.csv キーワード | CSV読取関数 |
|:--|:--|:--|:--|:--|
| `abl.csv` | `ABLNAME` | `ABL` | `能力` | `CSVABL()` |
| `talent.csv` | `TALENTNAME` | `TALENT` | `素質` | `CSVTALENT()` |
| `exp.csv` | `EXPNAME` | `EXP` | `経験` | `CSVEXP()` |
| `mark.csv` | `MARKNAME` | `MARK` | `刻印` | `CSVMARK()` |
| `base.csv` | `BASENAME` | `BASE` / `MAXBASE` | `基礎` | `CSVBASE()` |
| `palam.csv` | `PALAMNAME` | `PALAM` / `JUEL` / `GOTJUEL` | — | — |
| `cflag.csv` | `CFLAGNAME` | `CFLAG` | `フラグ` | `CSVCFLAG()` |
| `cstr.csv` | `CSTRNAME` | `CSTR` | `CSTR` | `CSVCSTR()` |
| `source.csv` | `SOURCENAME` | `SOURCE` | — | — |
| `ex.csv` | `EXNAME` | `EX` / `NOWEX` | — | — |
| `equip.csv` | `EQUIPNAME` | `EQUIP` | — | — |
| `tequip.csv` | `TEQUIPNAME` | `TEQUIP` | — | — |
| `relation.csv` | — | `RELATION` | `相性` | `CSVRELATION()` |
| `juel.csv` | — | `JUEL` | `珠` | `CSVJUEL()` |
| `equip.csv` | — | `EQUIP` | `装着物` | `CSVEQUIP()` |
| `stain.csv` | `STAINNAME` | `STAIN` | — | — |
| `tcvar.csv` | `TCVARNAME` | `TCVAR` | — | — |
| `cdflag1.csv` | `CDFLAGNAME1` | `CDFLAG`（第2インデックス） | — | — |
| `cdflag2.csv` | `CDFLAGNAME2` | `CDFLAG`（第3インデックス） | — | — |

#### 非キャラ変数系

| CSV 名前ファイル | 名称変数 | データ変数 | 備考 |
|:--|:--|:--|:--|
| `flag.csv` | `FLAGNAME` | `FLAG` | |
| `tflag.csv` | `TFLAGNAME` | `TFLAG` | |
| `train.csv` | `TRAINNAME` | — | コマンド名定義 |
| `item.csv` | `ITEMNAME` / `ITEMPRICE` | `ITEM` / `ITEMSALES` | 3列目が価格 |
| `strname.csv` | `STRNAME` | — | STR の名前定義 |
| `str.csv` | — | `STR` | **値の直接代入**（名前ではない） |
| `tstr.csv` | `TSTRNAME` | `TSTR` | |
| `savestr.csv` | `SAVESTRNAME` | `SAVESTR` | |
| `global.csv` | `GLOBALNAME` | `GLOBAL` | |
| `globals.csv` | `GLOBALSNAME` | `GLOBALS` | |

> **`str.csv` と `strname.csv` の違いに注意**：`str.csv` は変数 `STR` に値を直接代入するファイル、`strname.csv` は `STRNAME`（インデックスの名前）を定義するファイル。役割が全く異なる。

### CSV から変数への変換例

CharaXX.csv で定義したデータは、`ADDCHARA` 実行時に対応する変数に自動的に代入される。

```csv
; CSV/Chara5.csv
番号,5
名前,博麗霊夢
呼び名,霊夢
基礎,0,2000
基礎,1,1000
素質,0,1
素質,3,1
能力,0,5
能力,2,3
経験,1,100
フラグ,0,1
CSTR,0,テスト用キャラ
```

```erb
; ADDCHARA 実行後の変数状態（登録番号 = 1 の場合）
; NO:1 = 5
; NAME:1 = "博麗霊夢"
; CALLNAME:1 = "霊夢"
; BASE:1:0 = 2000,  BASE:1:1 = 1000
; TALENT:1:0 = 1,   TALENT:1:3 = 1
; ABL:1:0 = 5,      ABL:1:2 = 3
; EXP:1:1 = 100
; CFLAG:1:0 = 1
; CSTR:1:0 = "テスト用キャラ"
```

### 名称によるインデックスアクセス

名称変数が定義されている場合、数値インデックスの代わりに名前でアクセスできる。

```erb
; 以下はすべて等価
ABL:TARGET:0
ABL:TARGET:従順        ; ABLNAME:0 = "従順" の場合

; 名前アクセスは GETNUM でも実現可能
#DIM idx
idx = GETNUM(ABL, "従順")    ; idx = 0
ABL:TARGET:idx = 10
```

### CSV読取関数

`ADDCHARA` せずに CSV の定義値を直接読み取る関数群。第一引数は**キャラ番号**（登録番号ではない）。

```erb
; キャラ番号5のCSVデータを直接読み取る（ADDCHARA 不要）
PRINTFORML 能力0 = {CSVABL(5, 0)}
PRINTFORML 素質3 = {CSVTALENT(5, 3)}
PRINTFORML 基礎0 = {CSVBASE(5, 0)}
PRINTFORML CFLAG0 = {CSVCFLAG(5, 0)}
PRINTFORML CSTR0 = %CSVCSTR(5, 0)%
```

> **CSV読取関数と変数アクセスの違い**：`CSVABL(5, 0)` はキャラ番号5のCSV定義値を読み取る。`ABL:TARGET:0` は登録番号TARGETの現在の実行時値を読み取る。CSV読取関数は初期値の参照に使い、実行時の値は変数アクセスを使う。

### VariableSize.csv による配列サイズ変更

Emuera では `CSV/VariableSize.csv` で各変数の要素数を変更できる。

```csv
; CSV/VariableSize.csv
ABL,100
TALENT,1000
CFLAG,10000
STR,20000
```

eramaker では各変数に固定の上限があった（例：ABL は最大99、TALENT は最大99）。Emuera では `VariableSize.csv` でこれらを拡張できる。ただし、`ABLNAME` などの名称変数の要素数は変更不可（CSV ファイルの行数に自動的に追従する）。

---

## カスタムキャラ変数

組み込みキャラ変数が足りない場合、ERH ヘッダファイルでカスタムキャラ変数を宣言できる：

```erb
; ERH/VARIABLE.ERH

; カスタムキャラ変数
#DIM CHARADATA 好感度      ; 整数型、各キャラ独立
#DIMS CHARADATA 特殊状態   ; 文字列型、各キャラ独立

; 保存可能なキャラ変数
#DIM SAVEDATA CHARADATA 親密度
```

使い方は組み込みキャラ変数と全く同じ：

```erb
好感度:TARGET += 10
特殊状態:TARGET:0 = 恋愛

PRINTFORML 好感度：{好感度:TARGET}
PRINTFORML 状態：%特殊状態:TARGET:0%
```

---

## RELATION — 特殊なキャラ変数

`RELATION` は特殊なキャラ変数で、第二パラメータは**キャラ番号**而非登録番号：

```erb
; RELATION:登録番号:キャラ番号
; 調教対象とキャラ番号3のキャラの相性
RELATION:TARGET:3 = 50
```

これは他のほとんどのキャラ変数と異なる——他のキャラ変数の第二パラメータは配列インデックスだが、`RELATION` の第二パラメータはキャラ番号である。

---

## よくある落とし穴

| 落とし穴 | 説明 | 解決策 |
|---------|------|--------|
| 登録番号とキャラ番号の混同 | 登録番号は追加・削除で変化、キャラ番号は固定 | `GETCHARA()` でキャラ番号から登録番号を検索 |
| ASSI が -1 の時にキャラ変数にアクセス | 助手なしの場合 `ASSI == -1`、`BASE:ASSI:0` はエラー | 先に `ASSI >= 0` をチェック |
| DELCHARA 後の登録番号変化 | キャラ削除後、後続キャラの登録番号が再配列される | 走査時は `CHARANUM` と `REPEAT` を使い、登録番号をキャッシュしない |
| CUP/CDOWN で CUPCHECK を忘れる | `CUP`/`CDOWN` は `UPCHECK` ではなく `CUPCHECK` を使う | キャラ版は `CUPCHECK`、グローバル版は `UPCHECK` |
| TALENT が二値マーク | `TALENT` の値は 0 か 1、任意の整数ではない | `IF TALENT:TARGET:服従` を使い `IF TALENT:TARGET:服従 > 0` ではない |
| SOURCE が自動ゼロクリア | `@SOURCE_CHECK` 終了後、全 `SOURCE` が 0 になる | SOURCE 値を保持したい場合は `@SOURCE_CHECK` 前に保存 |
| PALAM が TRAIN 開始時にゼロクリア | `PALAM` は `BEGIN TRAIN` で初期化される | TRAIN をまたいで保持するデータは `CFLAG` や `BASE` を使う |

---

## 次のステップ

| 知りたいこと | 前へ |
|:---|:---|
| イベント関数の詳細 | [イベント関数](event-functions.md) |
| ステートマシンフロー | [ステートマシンフロー](system-flow.md) |
| 変数宣言システム | [変数宣言システム](variable-declaration.md) |
| 完全な変数仕様 | [変数の仕様と一覧](../Emuera/variables.md) |
| ユーザー定義変数 | [ユーザー定義変数](../Emuera/user_defined_variables.md) |
