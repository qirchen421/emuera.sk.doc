# ステートマシンフロー

!!! info "本節対応マニュアル"

    - **Reference 分類**: [デバッグ補助・システムフロー制御](../Reference/README.md#debug-system-flow)
    - [フロー図](../Emuera/system_flow.md) — 各状態の完全なフロー図と詳細
    - [イベント関数](event-functions.md) — エンジンが各状態で自動呼出するイベントフック
    - [BEGIN命令](../Reference/BEGIN.md) — 状態遷移命令 API リファレンス

---

## 概要

ERABASIC プログラムは `main()` から実行されるわけではない。エンジンには**内蔵ステートマシン**があり、あなたのコードがいつ呼ばれるか、どの順序で呼ばれるかを決定している。

ステートマシンを理解することが era ゲーム開発の鍵である：あなたが書くのは「一つのプログラム」ではなく、「エンジンのステートマシンの各ノードにマウントされたコールバック関数」である。

---

## 二状態モデル

まず細かいことは忘れよう。ERABASIC プログラムはいつでも次のどちらかの状態にある：

| 状態 | 説明 | エンジンがしていること |
|------|------|----------------------|
| **実行状態** | CALL チェーンが実行中 | あなたのコードを一行ずつ実行 |
| **待機状態** | INPUT でプレイヤー入力を待機 | 何もせず、プレイヤーのキー入力を待つ |

```
実行状態 ──INPUTに遭遇──→ 待機状態
待機状態 ──プレイヤー入力──→ 実行状態
```

これだけである。プログラムは CALL チェーンを実行しているか、プレイヤーを待っているかのどちらか。第三の状態はない。

!!! tip "直感的理解"

    「自分で選ぶ冒険の書」を書いていると想像してほしい。各ページ（関数）はテキストを表示し、読者に選択（INPUT）を求める。読者の選択が次のページ（次の CALL）を決定する。エンジンはページをめくる人である。

---

## ステートマシン概要

エンジンには6つの主要状態があり、`BEGIN` 命令でそれらの間を遷移する：

```
TITLE ──BEGIN FIRST──→ FIRST
                         │
                         ↓
                       SHOP ←──────────────────┐
                         │                      │
                       BEGIN TRAIN              │
                         ↓                      │
                       TRAIN ──BEGIN SHOP──────→┘
                         │
                       BEGIN ABLUP → ABLUP ──BEGIN SHOP──→ SHOP
                         │
                       BEGIN AFTERTRAIN → AFTERTRAIN
                         │
                       BEGIN TURNEND → TURNEND
```

| 状態 | 进入方法 | エンジンがすること |
|------|---------|-------------------|
| **TITLE** | 起動後、または `BEGIN TITLE` | タイトル画面を表示 |
| **FIRST** | `BEGIN FIRST` | ゲーム初期化 |
| **SHOP** | `BEGIN SHOP`、またはセーブロード後 | ショップ/メインループ |
| **TRAIN** | `BEGIN TRAIN` | 調教/行動ループ |
| **ABLUP** | `BEGIN ABLUP` | 能力向上 |
| **AFTERTRAIN** | `BEGIN AFTERTRAIN` | 調教終了 |
| **TURNEND** | `BEGIN TURNEND` | ターン終了 |

### 典型的なゲームループ

多くの era ゲームはこのループに従う：

```
TITLE → FIRST → SHOP ⇄ TRAIN → SHOP → ...
                   ↑       │
                   └───────┘
```

1. **TITLE**：プレイヤーがタイトル画面を見る、「開始」か「ロード」を選択
2. **FIRST**：ゲームデータを初期化
3. **SHOP**：メインメニュー、プレイヤーが行動を選択
4. **TRAIN**：行動を実行、結果を処理
5. **SHOP** に戻り、次の選択を待つ

---

## TITLE — タイトル画面

エンジン起動後、最初に TITLE 状態に入る。

### カスタムタイトル画面

`@SYSTEM_TITLE` を定義すると、デフォルトのタイトル画面を置き換えられる：

```erb
@SYSTEM_TITLE
    PRINTL ═══════════════════
    PRINTL   私の era ゲーム
    PRINTL ═══════════════════
    PRINTL [0] ゲームを始める
    PRINTL [1] ロードする
    INPUT

    IF RESULT == 0
        BEGIN FIRST
    ELSEIF RESULT == 1
        BEGIN LOADGAME
    ENDIF
```

### デフォルトタイトル画面

`@SYSTEM_TITLE` が定義されていない場合、エンジンは標準のタイトル画面を表示する：

- `[0] 最初からはじめる` → データ初期化 → `BEGIN FIRST`
- `[1] ロードしてはじめる` → ロード画面を表示

!!! warning "BEGIN を実行しなければならない"

    `@SYSTEM_TITLE` で `BEGIN` 命令を実行せずに `RETURN` すると、次に実行する処理がなくなりエラー終了する。

---

## FIRST — ゲーム初期化

`BEGIN FIRST` でこの状態に入る。エンジンは `@EVENTFIRST` を呼び出す。

```erb
@EVENTFIRST
    MONEY = 1000
    DAY = 1
    ADDCHARA 0
    PRINTW ゲーム開始！
    BEGIN SHOP
```

!!! warning "FIRST 状態では遷移が必須"

    `@EVENTFIRST` で `BEGIN` を実行しないと、エンジンはエラー終了する。通常は末尾で `BEGIN SHOP` を実行してメインループに入る。

---

## SHOP — メインループ

SHOP はゲームのメインループである。プレイヤーは大半の時間ここで選択を行う。

### 実行フロー

```
BEGIN SHOP
    │
    ├─ @EVENTSHOP（定義されていれば）
    │
    ├─ オートセーブ（有効な場合）
    │
    ├─ @SHOW_SHOP（定義必須）
    │
    ├─ 入力待ち
    │
    ├─ 購入番号（0~99）の入力？
    │   ├─ はい → 購入処理 → @EVENTBUY → @SHOW_SHOP に戻る
    │   └─ いいえ → @USERSHOP → @SHOW_SHOP に戻る
    │
    └─ BEGIN 実行 → SHOP を離脱
```

### 基本的な使い方

```erb
@SHOW_SHOP
    PRINTL ─── メインメニュー ───
    PRINTL [0] 調教を始める
    PRINTL [1] ステータス確認
    PRINTL [100] セーブ
    PRINTL [101] ロード

@USERSHOP
    IF RESULT == 0
        BEGIN TRAIN
    ELSEIF RESULT == 1
        CALL SHOW_STATUS_DETAIL
    ELSEIF RESULT == 100
        SAVEGAME
    ELSEIF RESULT == 101
        LOADGAME
    ENDIF
```

!!! note "ロード後は @EVENTSHOP が呼ばれない"

    セーブデータをロードした後は SHOP に直接入り、`@EVENTSHOP` は**呼ばれない**。ロード後の処理が必要な場合は `@EVENTLOAD` または `@SYSTEM_LOADEND` を使う。

---

## TRAIN — 行動ループ

TRAIN はゲームのコアプレイループである。プレイヤーはここで行動を選択・実行する。

### 実行フロー

```
BEGIN TRAIN
    │
    ├─ 変数初期化（ASSIPLAY、TFLAG、PALAM など）
    │
    ├─ @EVENTTRAIN（定義されていれば）
    │
    ├─ @SHOW_STATUS（定義必須）
    │   ├─ 実行可能コマンドを表示（@COM_ABLExx で判定）
    │   └─ @SHOW_USERCOM（定義必須）
    │
    ├─ 入力待ち
    │
    ├─ 実行可能コマンドの入力？
    │   ├─ はい → @EVENTCOM → @COMxx → @SOURCE_CHECK → @EVENTCOMEND
    │   │       → @SHOW_STATUS に戻る
    │   └─ いいえ → @USERCOM → @SHOW_STATUS に戻る
    │
    └─ BEGIN 実行 → TRAIN を離脱
```

### 基本的な使い方

```erb
@SHOW_STATUS
    PRINTL ─── 調教中 ───
    CALL SHOW_TARGET_INFO

@SHOW_USERCOM
    PRINTL [0] 頭を撫でる
    PRINTL [1] 抱きしめる
    PRINTL [999] ショップに戻る

@COM0
    PRINTW 彼女の頭を優しく撫でた。
    RETURN 1

@COM1
    PRINTW 彼女を抱きしめた。
    RETURN 1

@USERCOM
    IF RESULT == 999
        BEGIN SHOP
    ENDIF
```

### コマンド実行可否判定

`@COM_ABLExx` はコマンドが使用可能かを決定する。非 0 を返せば実行可能、0 を返せば不可：

```erb
@COM_ABLE5
    ; コマンド5は TARGET の信頼度 >= 50 が必要
    IF CFLAG:信頼度 < 50
        RETURN 0
    ENDIF
    RETURN 1
```

---

## その他の状態

### ABLUP — 能力向上

`BEGIN ABLUP` で入る。キャラクターの能力を向上させるために使用する。

```erb
@SHOW_JUEL
    PRINTL ─── 宝石一覧 ───
    ; 現在の宝石を表示

@SHOW_ABLUP_SELECT
    PRINTL [0] 服従を向上
    PRINTL [1] 欲望を向上
    ; 向上可能な能力リストを表示
```

### AFTERTRAIN — 調教終了

`BEGIN AFTERTRAIN` で入る。調教が完全に終了した後のイベント処理。

### TURNEND — ターン終了

`BEGIN TURNEND` で入る。一日の終わりの処理。

```erb
@EVENTTURNEND
    DAY += 1
    PRINTW {DAY}日目が終わった。
    BEGIN SHOP
```

---

## BEGIN 命令 — 状態遷移

`BEGIN` は状態遷移の唯一の方法である。暗黙の `RETURN` を含む——`BEGIN` の後のコードは決して実行されない。

```erb
@MY_FUNC
    BEGIN SHOP
    PRINTL この行は決して実行されない
```

### 使用可能な BEGIN パラメータ

| 命令 | 遷移先 |
|------|--------|
| `BEGIN FIRST` | FIRST 状態 |
| `BEGIN SHOP` | SHOP 状態 |
| `BEGIN TRAIN` | TRAIN 状態 |
| `BEGIN ABLUP` | ABLUP 状態 |
| `BEGIN AFTERTRAIN` | AFTERTRAIN 状態 |
| `BEGIN TURNEND` | TURNEND 状態 |
| `BEGIN TITLE` | TITLE 状態 |
| `BEGIN LOADGAME` | ロード画面 |

---

## セーブとロード

### セーブ

`SAVEGAME` 命令はセーブ画面を表示する。セーブ直前に、エンジンは `@SAVEINFO` を呼び出してセーブの説明文を生成する：

```erb
@SAVEINFO
    ; この関数の PRINT 出力がセーブの説明文になる
    PRINTFORM {DAY}日目 %CALLNAME:MASTER%の記録
```

### ロード

`LOADGAME` 命令はロード画面を表示する。ロード完了後のフロー：

```
ロード完了
    │
    ├─ @SYSTEM_LOADEND（定義されていれば）
    │   └─ BEGIN を実行？→ 遷移
    │
    ├─ @EVENTLOAD（定義されていれば）
    │   └─ BEGIN を実行？→ 遷移
    │
    └─ デフォルト → @SHOW_SHOP
```

`LOADDATA` 命令は指定番号のセーブデータを直接ロードする。ロード画面は表示しない。

---

## エラー処理フロー

### THROW 例外

`THROW` 命令は例外をスローする。`@BEFORE_THROW` イベント関数（Skia 専用）が定義されていれば、スロー前に呼び出される：

```
THROW 実行
    │
    ├─ 既に @BEFORE_THROW 内？→ 直接スロー
    │
    └─ @BEFORE_THROW が定義されている？→ @BEFORE_THROW 呼出 → スロー
```

### ランタイムエラー

捕捉されないエラーが発生した場合、`@BEFORE_ERROR` イベント関数（Skia 専用）が定義されていれば、エラー処理前に呼び出される。

> 詳細は [イベント関数 — BEFORE_THROW / BEFORE_ERROR](event-functions.md#before_throw)

---

## よくある落とし穴

| 落とし穴 | 説明 | 解決策 |
|---------|------|--------|
| イベント関数で BEGIN を実行しない | `@EVENTFIRST`、`@EVENTEND` 等で `BEGIN` を実行しないとエラー終了 | 末尾に `BEGIN` または `RETURN` を確実に書く |
| ロード後 @EVENTSHOP が呼ばれない | セーブロード後は SHOP に直接入り `@EVENTSHOP` をスキップ | `@EVENTLOAD` または `@SYSTEM_LOADEND` を使う |
| BEGIN の後のコードが実行されない | `BEGIN` は暗黙の `RETURN` を含む | `BEGIN` の後にコードを書かない |
| TRAIN で BEGIN SHOP を忘れる | TRAIN ループは自動で終了しない | `@USERCOM` で「戻る」ロジックを処理 |
| @COMxx が 0 を返す | コマンドが失敗とみなされ、@SOURCE_CHECK と @EVENTCOMEND が呼ばれない | 成功したコマンドは非 0 を返すようにする |

---

## 次のステップ

| 知りたいこと | 前へ |
|:---|:---|
| インタラクションシステム：INPUTとAWAIT | [インタラクションシステム](interaction.md) |
| イベント関数の詳細 | [イベント関数](event-functions.md) |
| BEGIN 命令 API | [BEGIN](../Reference/BEGIN.md) |
| キャラ変数システム | [キャラ変数](../Emuera/variables.md) |
| 完全なフロー図 | [フロー図](../Emuera/system_flow.md) |
