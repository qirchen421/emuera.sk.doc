# イベント関数

!!! info "本節の対応マニュアル"

    - **Reference 分類**: [デバッグ補助・システムフロー制御](../Reference/README.md#debug-system-flow)
    - [Emuera フロー図](../Emuera/system_flow.md) — システムフローとイベントの呼び出しタイミング
    - [Emueraの拡張書式 - 関数](../Emuera/function.md) — 関数定義と呼び出し
    - [ERBファイル形式拡張](erb-format-extension.md) — `#PRI`/`#LATER`/`#SINGLE`/`#ONLY` 修飾子

---

## 概要

ERABASICの関数は3つのカテゴリに分かれます：

| 型 | 例 | 特徴 |
|---|------|------|
| **イベント関数** | `@EVENTFIRST`、`@EVENTSHOP` | 複数定義可能、エンジンが自動呼び出し、`#PRI`/`#LATER` 等の修飾子に対応 |
| **システム関数** | `@SHOW_SHOP`、`@SHOW_STATUS` | 1回のみ定義、エンジンが特定タイミングで呼び出し |
| **ユーザー関数** | `@MY_FUNC` | 1回のみ定義、スクリプトから `CALL` で能動的に呼び出し |

イベント関数はERABASICの中核メカニズムの一つです——エンジンが特定のタイミングで自動的に呼び出し、同名のイベント関数を複数定義でき、優先度に従って順次実行されます。

---

## イベント関数とシステム関数

イベント関数とシステム関数はどちらもエンジンが自動的に呼び出しますが、本質的な違いがあります：

| | イベント関数 | システム関数 |
|------|:---:|:---:|
| 複数定義可能か | ✅ 可能 | ❌ 1回のみ |
| `#PRI`/`#LATER` 修飾子 | ✅ 使用可 | ❌ 使用不可 |
| `#SINGLE`/`#ONLY` 修飾子 | ✅ 使用可 | ❌ 使用不可 |
| `#FUNCTION`/`#FUNCTIONS` | ❌ 使用不可 | ❌ 使用不可 |
| `#LOCALSIZE` 等のサイズ指定 | ⚠️ 無視される | ✅ 有効 |
| 未定義時の動作 | スキップ（エラーなし） | ほとんどスキップ、少数はエラー |

### ソースコードでの判定基準

エンジンは `IdentifierDictionary.IsEventLabelName()` で関数名がイベント関数かどうかを判定します。現在のイベント関数名リスト：

```
EVENTFIRST, EVENTTRAIN, EVENTSHOP, EVENTBUY,
EVENTCOM, EVENTTURNEND, EVENTCOMEND, EVENTEND, EVENTLOAD,
BEFORE_THROW, BEFORE_ERROR  ← SK専用
```

> **SK専用**：`BEFORE_THROW` と `BEFORE_ERROR` は Skia版で追加されたイベント関数で、エラー処理と例外インターセプトに使用されます。

`IdentifierDictionary.IsSystemLabelName()` でシステム関数かどうかを判定します。システム関数名リストには上記のイベント関数名に加えて以下が含まれます：

```
SHOW_STATUS, SHOW_USERCOM, USERCOM, SOURCE_CHECK,
CALLTRAINEND, SHOW_JUEL, SHOW_ABLUP_SELECT, USERABLUP,
SHOW_SHOP, SAVEINFO, USERSHOP,
TITLE_LOADGAME, SYSTEM_AUTOSAVE, SYSTEM_TITLE, SYSTEM_LOADEND
```

さらに、`COM\d+`（例：`@COM5`）、`COM_ABLE\d+`（例：`@COM_ABLE5`）、`ABLUP\d+`（例：`@ABLUP3`）のパターンに一致する関数名もシステム関数として扱われます。

---

## イベント関数の呼び出しメカニズム

### 複数定義の走査

エンジンがイベント関数を呼び出す際、同名のすべてのイベント関数定義を検索し、優先度ごとにグループ分けして順次実行します：

```
グループ0：#ONLY 関数（最初の1つのみ実行）
グループ1：#PRI 関数（優先実行）
グループ2：通常関数（修飾子なし）
グループ3：#LATER 関数（遅延実行）
```

エンジンはグループ0から順に走査し、各グループ内では定義順に実行します。すべてのグループの走査が終わると、イベント関数の呼び出しは終了します。

### `#ONLY` の動作

イベント関数に `#ONLY` が宣言されている場合、エンジンは最初に `#ONLY` が宣言された定義のみを実行し、他の同名イベント関数をすべてスキップします：

```erb
@EVENTFIRST
#ONLY
; この関数のみが実行される
PRINTW 唯一の初期化

@EVENTFIRST
; この関数は #ONLY によりスキップされる
PRINTW 実行されない
```

!!! warning "複数の #ONLY の結果"

    同名のイベント関数に複数 `#ONLY` が宣言されている場合、最初の1つのみが実行されます。エンジンは後続の `#ONLY` 定義に対して警告を発します。

### `#SINGLE` の動作

`#SINGLE` は1つのイベント関数のみ実行して停止することを示します。`#ONLY` と異なり、`#SINGLE` はどの関数が実行されるかを制限しません——現在の関数の実行が終わった後に走査を停止するだけです：

```erb
@EVENTFIRST
#SINGLE
PRINTW 初期化

@EVENTFIRST
#SINGLE
; 上の関数がすでに実行されていれば、これは実行されない
PRINTW 実行されない
```

### `#PRI` と `#LATER` の組み合わせ

`#PRI` と `#LATER` は同時に指定できます——関数は両方のグループに追加され、優先グループで1回、遅延グループでもう1回実行されます：

```erb
@EVENTFIRST
#PRI
PRINTW 1. 最初に実行

@EVENTFIRST
#PRI #LATER
PRINTW 2. 優先実行（遅延グループにも登録）

@EVENTFIRST
PRINTW 3. 通常実行

@EVENTFIRST
#LATER
PRINTW 4. 遅延実行

@EVENTFIRST
#PRI #LATER
PRINTW 5. 再度遅延実行（#PRI #LATER 同時指定のため）
```

---

## イベント関数一覧

### `@EVENTFIRST`

**呼び出しタイミング**：「最初からはじめる」を選択後、または `BEGIN FIRST` 実行後。

**動作**：ゲーム開始時のイベント。`@EVENTFIRST` 内で `BEGIN` 命令や `RETURN` を実行しない場合、エンジンは後続の処理がないためエラー終了します。

```erb
@EVENTFIRST
PRINTW ゲーム開始！
MONEY = 500
BEGIN SHOP
```

### `@EVENTSHOP`

**呼び出しタイミング**：SHOPフェーズに入った時（ロード後を除く）。

**動作**：`@SHOW_SHOP` の前に呼び出されます。ロード後にSHOPに入る時は `@EVENTSHOP` は**呼び出されない**ことに注意してください。

```erb
@EVENTSHOP
PRINTW ショップへようこそ！
```

### `@EVENTBUY`

**呼び出しタイミング**：SHOPで商品の購入に成功した後。

**動作**：購入成功後、`BOUGHT` 変数には購入した商品番号が設定され、`ITEM:BOUGHT` は1増加し、`MONEY` は減少しています。

```erb
@EVENTBUY
PRINTW %ITEMNAME:BOUGHT%を購入しました！
```

### `@EVENTTRAIN`

**呼び出しタイミング**：TRAINフェーズに入った時、`@SHOW_STATUS` の前。

**動作**：未定義の場合、エンジンはスキップして `@SHOW_STATUS` に進みます。

```erb
@EVENTTRAIN
PRINTW 調教開始！
```

### `@EVENTCOM`

**呼び出しタイミング**：TRAINでコマンドを実行する時、`@COMxx` を呼び出す前。

**動作**：`SELECTCOM` には選択されたコマンド番号が設定されています。

```erb
@EVENTCOM
PRINTW コマンド {SELECTCOM} を実行
```

### `@EVENTCOMEND`

**呼び出しタイミング**：TRAINでコマンドの実行が成功した後（`@COMxx` が非0を返した後）、`@SOURCE_CHECK` 終了後。

**動作**：全キャラの `SOURCE` はすでに0にリセットされています。`@EVENTCOMEND` 内で `WAIT` 命令が実行されない場合、エンジンは自動的に `WAIT` を追加します。

```erb
@EVENTCOMEND
PRINTW コマンド実行完了
```

### `@EVENTTURNEND`

**呼び出しタイミング**：`BEGIN TURNEND` 実行後。

**動作**：ターン終了イベント。`@EVENTTURNEND` 内で `BEGIN` 命令を実行しない場合、エンジンは後続の処理がないためエラー終了します。

```erb
@EVENTTURNEND
DAY += 1
PRINTW {DAY}日目終了
BEGIN SHOP
```

### `@EVENTEND`

**呼び出しタイミング**：`BEGIN AFTERTRAIN` 実行後。

**動作**：調教終了イベント。`@EVENTEND` 内で `BEGIN` 命令を実行しない場合、エンジンは後続の処理がないためエラー終了します。

```erb
@EVENTEND
PRINTW 調教完全終了
BEGIN SHOP
```

### `@EVENTLOAD`

**呼び出しタイミング**：セーブデータのロード後、`@SYSTEM_LOADEND` の後（定義されている場合）。

**動作**：ロード完了イベント。`@EVENTLOAD` 内で `BEGIN` 命令を実行しない場合、通常通り `@SHOW_SHOP` に移行します。

```erb
@EVENTLOAD
PRINTW セーブデータのロード完了！
```

### `@BEFORE_THROW` （SK専用） { #before_throw }

**呼び出しタイミング**：`THROW` 命令で例外がスローされる前。

**動作**：スクリプトがスローされる例外をインターセプト・処理することを許可します。`@BEFORE_THROW` イベント関数が存在する場合、例外のスローが遅延され、スクリプトはクリーンアップやリカバリ操作を行うことができます。

**注意**：`@BEFORE_THROW` 内で再び `THROW` を呼び出した場合、再帰呼び出しはブロックされ、メッセージは直接出力されてイベントは再トリガーされません。

```erb
@BEFORE_THROW
#PRI
PRINTW 例外を検出、リカバリを試みます...
; ここでクリーンアップ操作やリカバリを試行可能
; 関数が正常終了した場合、例外は継続してスローされます
```

### `@BEFORE_ERROR` （SK専用） { #before_error }

**呼び出しタイミング**：何らかのエラーが最初に発生した時（ランタイムエラー、スクリプトエラー等を含む）。

**動作**：エラー処理フローが開始される前に呼び出され、統一的なエラー処理フックを提供します。エラーがユーザーに表示される前にスクリプトが介入することを許可します。

**注意**：`@BEFORE_ERROR` 内で再びエラーが発生した場合、イベントは再トリガーされず、直接エラー処理フローに入ります。

```erb
@BEFORE_ERROR
#PRI
PRINTW エラーが発生しました、処理中...
; ここでエラーログの記録や修復を試行可能
```

> **SK専用**：`BEFORE_THROW` と `BEFORE_ERROR` は Skia版で追加されたイベント関数で、より強力なエラー処理機能を提供します。これらのイベントは原版 Emuera や他の派生版では利用できません。

---

## システム関数一覧

システム関数はエンジンが特定のタイミングで呼び出しますが、1回のみ定義可能で、`#PRI`/`#LATER` 等の修飾子はサポートしません。

### タイトル関連

| 関数名 | 呼び出しタイミング | 説明 |
|--------|-----------------|------|
| `@SYSTEM_TITLE` | 起動後のタイトル画面 | カスタムタイトル画面、標準タイトルの代替 |
| `@TITLE_LOADGAME` | タイトル画面で「ロード」選択時 | カスタムロード画面、標準ロード画面の代替 |

### SHOP関連

| 関数名 | 呼び出しタイミング | 説明 |
|--------|-----------------|------|
| `@SHOW_SHOP` | SHOPに入った後 | ショップ画面の表示 |
| `@USERSHOP` | SHOPで購入番号以外の入力 | カスタム入力の処理 |

### TRAIN関連

| 関数名 | 呼び出しタイミング | 説明 |
|--------|-----------------|------|
| `@SHOW_STATUS` | TRAINループの開始 | ステータス画面の表示 |
| `@SHOW_USERCOM` | 実行可能コマンド表示後 | カスタムコマンドプロンプトの表示 |
| `@USERCOM` | 実行不可コマンドの入力 | カスタムコマンド入力の処理 |
| `@SOURCE_CHECK` | `@COMxx` が非0を返した後 | SOURCE計算の処理 |
| `@COMxx` | 実行可能コマンドの入力 | 対応番号のコマンドを実行 |
| `@COM_ABLExx` | コマンドリスト表示時 | コマンドが実行可能か判定（0返却＝不可） |
| `@CALLTRAINEND` | 連続調教コマンド終了後 | 連続調教終了処理 |

### ABLUP関連

| 関数名 | 呼び出しタイミング | 説明 |
|--------|-----------------|------|
| `@SHOW_JUEL` | ABLUPに入った後 | 宝石画面の表示 |
| `@SHOW_ABLUP_SELECT` | `@SHOW_JUEL` の後 | 能力向上選択の表示 |
| `@ABLUPxx` | 向上項目の選択 | 対応番号の能力向上を実行 |
| `@USERABLUP` | 0～99範囲外の入力 | カスタム向上入力の処理 |

### セーブ関連

| 関数名 | 呼び出しタイミング | 説明 |
|--------|-----------------|------|
| `@SAVEINFO` | セーブ直前 | セーブ説明情報の生成 |
| `@SYSTEM_AUTOSAVE` | オートセーブ時 | カスタムオートセーブ処理 |
| `@SYSTEM_LOADEND` | ロード完了後 | カスタムロード後処理（`@EVENTLOAD` の前） |

---

## 呼び出しフローの詳細

### TRAINループのイベント関数

TRAINは最も複雑なフローで、複数のイベント関数とシステム関数が連携します：

```
BEGIN TRAIN
    │
    ├─ @EVENTTRAIN（任意、複数定義可）
    │
    ├─ @SHOW_STATUS（定義必須）
    │   ├─ 実行可能コマンドの表示（@COM_ABLExx を呼び出して判定）
    │   └─ @SHOW_USERCOM（定義必須）
    │
    ├─ 入力待ち
    │
    ├─ 実行可能コマンドの入力？
    │   ├─ はい → @EVENTCOM（複数定義可）
    │   │       → @COMxx（定義必須、非0返却＝成功）
    │   │       → @SOURCE_CHECK（定義必須）
    │   │       → @EVENTCOMEND（複数定義可）
    │   │       → @SHOW_STATUS に戻る
    │   │
    │   └─ いいえ → @USERCOM（定義必須）
    │           → @SHOW_STATUS に戻る
    │
    └─ BEGIN 命令の実行 → TRAIN を離脱
```

### SHOPループのイベント関数

```
BEGIN SHOP
    │
    ├─ @EVENTSHOP（任意、複数定義可）
    │
    ├─ オートセーブ（有効な場合）
    │   └─ @SYSTEM_AUTOSAVE または @SAVEINFO
    │
    ├─ @SHOW_SHOP（定義必須）
    │
    ├─ 入力待ち
    │
    ├─ 購入番号の入力？
    │   ├─ はい → 購入処理 → @EVENTBUY（複数定義可）
    │   │       → @SHOW_SHOP に戻る
    │   │
    │   └─ いいえ → @USERSHOP（定義必須）
    │           → @SHOW_SHOP に戻る
    │
    └─ BEGIN 命令の実行 → SHOP を離脱
```

---

## よくあるパターン

### 初期化パターン

```erb
@EVENTFIRST
#PRI
; 最優先で実行される初期化
MONEY = 500
DAY = 1

@EVENTFIRST
; 通常初期化
CALL INIT_ITEMS
CALL INIT_CHARACTERS

@EVENTFIRST
#LATER
; 最後に実行される初期化
PRINTW 初期化完了！
BEGIN SHOP
```

### ロード後処理パターン

```erb
@SYSTEM_LOADEND
; @EVENTLOAD の前に実行
PRINTW システムロード完了

@EVENTLOAD
; @SYSTEM_LOADEND の後に実行
PRINTW おかえりなさい！
```

### コマンド拡張パターン

```erb
@EVENTCOM
; 各コマンド実行前に共通処理
TFLAG:コマンド回数 += 1

@EVENTCOMEND
; 各コマンド実行後に共通処理
CALL CHECK_LEVEL_UP
```

---

## よくある落とし穴

| 落とし穴 | 説明 | 解決策 |
|---------|------|--------|
| イベント関数でBEGINを実行しない | 一部のイベント関数（`@EVENTFIRST`、`@EVENTEND` 等）で `BEGIN` を実行しないと、エンジンがエラー終了する | イベント関数の末尾で必ず `BEGIN` または `RETURN` を実行 |
| ロード後に@EVENTSHOPが呼ばれない | ロード後はSHOPに直接入り、`@EVENTSHOP` は呼ばれない | `@EVENTLOAD` や `@SYSTEM_LOADEND` でロード後の処理を行う |
| #ONLY の誤用 | `#ONLY` は他のファイルの定義を含め、同名のすべてのイベント関数をスキップする | `#ONLY` は慎重に使用、通常は `#SINGLE` の方が安全 |
| #LOCALSIZE がイベント関数で無効 | イベント関数の `#LOCALSIZE` は無視される | `#DIM` でプライベート変数を宣言する |
| システム関数の複数定義 | システム関数は1回しか定義できず、複数定義はエラー | 各システム関数が1つのファイルでのみ定義されていることを確認 |
| @COM_ABLExx の戻り値の誤解 | 0は実行不可、非0は実行可能を示す | 「非0＝実行可能」であり、「1＝実行可能」ではないことに注意 |

---

## 次のステップ

| 知りたいこと | 参照 |
|:---|:---|
| ERBファイル形式拡張 | [ERBファイル形式拡張](erb-format-extension.md) |
| 代入文の詳細 | [代入文](assignment.md) |
| システムフロー図 | [フロー図](../Emuera/system_flow.md) |
| BEGIN命令 | [BEGIN](../Reference/BEGIN.md) |
| CALL命令 | [CALL](../Reference/CALL.md) |
