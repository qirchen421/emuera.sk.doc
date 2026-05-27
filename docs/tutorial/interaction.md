# インタラクションシステム：INPUT と AWAIT

!!! info "本節の対応マニュアル"

    - **Reference 分類**: [入力・ウェイト](../Reference/README.md#input-wait) / [AWAIT関連](../Reference/README.md#await)
    - [INPUT](../Reference/INPUT.md) — INPUT/INPUTS 命令 API リファレンス
    - [TINPUT](../Reference/TINPUT.md) — TINPUT/TINPUTS 命令 API リファレンス
    - [TINPUTNF](../Reference/TINPUTNF.md) — TINPUTNF/TINPUTSNF 命令 API リファレンス（NoFocus変種）
    - [TONEINPUTNF](../Reference/TONEINPUTNF.md) — TONEINPUTNF/TONEINPUTSNF 命令 API リファレンス（NoFocus変種）
    - [AWAIT](../Reference/AWAIT.md) — AWAIT 命令 API リファレンス
    - [GETKEY](../Reference/GETKEY.md) — GETKEY/GETKEYTRIGGERED 命令 API リファレンス

---

## 概要

[状態マシンフロー](system-flow.md)では、「実行状態」と「待機状態」の2状態モデルについて学びました。本節では、この2つの状態の背後にあるインタラクションシステムについて詳しく説明します。

ERABASICのインタラクション命令は2つのモデルに分かれます：

| モデル | 代表命令 | 動作 |
|--------|---------|------|
| **プルモデル** | INPUT, TINPUT, BINPUT | スクリプトを一時停止し、完全な入力を待機 |
| **プッシュポーリングモデル** | AWAIT + GETKEY/MOUSEB | スクリプトを一時停止せず、瞬時状態を検出 |

---

## プルモデル：INPUT系

INPUT系は最も一般的なインタラクション方法です。スクリプトの実行を一時停止し、プレイヤーが完全な入力（キー押下、ボタンクリック、文字列入力）を行うのを待ってから再開します。

```erb
PRINTL [0] ゲーム開始
PRINTL [1] ロード
INPUT

IF RESULT == 0
    BEGIN FIRST
ELSEIF RESULT == 1
    LOADGAME
ENDIF
```

### INPUTの3つの副作用

INPUTは単に「入力を待つ」だけではありません——同時に3つのことを行います：

1. **入力待機**：スクリプトを一時停止し、完全な入力を待つ
2. **強制スクロール**：ウィンドウを一番下までスクロールし、入力行を可視化
3. **ボタン有効化**：`[0]`、`[1]`などのボタンがクリック可能になる

つまり、INPUTの後、プレイヤーは以前の出力を閲覧できません——ウィンドウが強制的に一番下に戻されるからです。

### TINPUT — タイムアウト付き入力

`TINPUT`はINPUTにタイムアウト機構を追加したものです：

```erb
; 3秒以内に入力を待機、タイムアウト時は RESULT = 0
TINPUT 3000, 0
```

タイムアウト精度は約100msです。それより小さい値を設定しても正確な動作はできません。

### INPUTMOUSEKEY — 生入力検出

`INPUTMOUSEKEY`は待機状態に入りますが**ボタンを有効化しません**。マウス/キーボードの生イベントを直接検出します。ボタンインタラクションなしでマウス/キーボードを正確に検出したい場面に適しています。

---

## プッシュポーリングモデル：AWAIT系

AWAIT系はもう一つのインタラクション方法——スクリプトを一時停止せず、Windowsに時間を譲るだけです。

```erb
; 16ms譲る
AWAIT 16
```

AWAITはGETKEY、MOUSEB、MOUSEXY、ISACTIVEなどの命令と組み合わせて、キーボード/マウスの瞬時状態を検出できます：

```erb
$LOOP
AWAIT 16
IF GETKEYTRIGGERED(1)
    ; マウス左ボタンが押された
    BREAK
ENDIF
GOTO LOOP
```

### AWAITの特徴

- **スクリプトを一時停止しない**：AWAIT後もスクリプトは実行を続ける
- **強制スクロールしない**：ユーザーは過去の出力を自由に閲覧できる
- **ボタンを有効化しない**：`[0]`などのボタンはクリック不可
- **入力が信頼できない**：2フレーム間のキー押下が見逃される可能性がある

### AWAITの典型的な用途

1. **時間のかかる処理の進捗表示**：Emueraが「応答なし」になるのを防ぐ

    ```erb
    REDRAW 0
    FOR LCNT, 0, 100
        PRINTSL "作業中... " + TOSTR(LCNT) + "%"
        AWAIT
        CLEARLINE 1
        ; 時間のかかる処理
    NEXT
    ```

2. **リアルタイムUIポーリング**：GETKEY/MOUSEBと組み合わせた非ブロッキング入力検出

    ```erb
    $LOOP
    CALL DRAW_REALTIME_UI
    AWAIT 16
    IF GETKEYTRIGGERED(1)
        ; クリック処理
    ENDIF
    GOTO LOOP
    ```

### AWAITの落とし穴

!!! warning "AWAITループは入力を逃す可能性がある"

    AWAITはメッセージキューを1回だけポンプします。2回のAWAITの間にキーイベントが発生した場合、GETKEYTRIGGEREDが検出できない可能性があります。これはAWAITポーリングの根本的な限界——「瞬時状態」をサンプリングするだけで、「蓄積イベント」ではないからです。

---

## 2つのモデルの比較

| 次元 | INPUT系 | AWAIT系 |
|------|---------|---------|
| スクリプト一時停止 | ✅ 一時停止 | ❌ 継続 |
| 入力の信頼性 | ✅ 原子性 | ❌ 損失の可能性 |
| ボタンインタラクション | ✅ 有効化 | ❌ 無効 |
| 自由スクロール | ❌ 強制スクロール | ✅ 位置維持 |
| タイムアウト | ✅ TINPUT | ⚠️ 手動補正 |

**核心的な矛盾**：ボタンインタラクション（INPUTの利点）+ 自由スクロール（AWAITの利点）が必要だが、2つのモデルは互いに排他的。

---

## NoFocus変種：2つのモデルの架け橋

NF（NoFocus）サフィックス変種が上記の矛盾を解決します。T プレフィックス（タイマー付き入力）命令のみ NF 変種を提供——INPUT/INPUTS は完全ブロッキングで待機中にコンテンツ更新がないため、NF は無意味です。

```erb
TINPUTNF  ; タイムアウト付き + 自由スクロール
TINPUTSNF ; 同上、文字列入力 + タイムアウト付き
TONEINPUTNF  ; TONEINPUT の NF 変種
TONEINPUTSNF ; TONEINPUTS の NF 変種
```

NF変種は元のバージョンと引数が完全に同じで、唯一の違いは**強制スクロールを行わない**ことです。

### TINPUTSNFでAWAITポーリングを置き換える

以前、AWAIT + GETKEYTRIGGEREDで動的インターフェースを作っていたコード：

```erb
; 旧方式：AWAITポーリング（約200行のERB）
$LOOP
CALL DRAW_MAP
AWAIT 16
IF GETKEYTRIGGERED(1)
    ; クリック処理...しかしボタンはクリック不可、クリック領域を手動計算する必要がある
ENDIF
GOTO LOOP
```

TINPUTSNFで置き換えると：

```erb
; 新方式：TINPUTSNF（約10行のERB）
$LOOP
CALL DRAW_MAP
TINPUTSNF 33, "UPDATE", 0, "", 1
SELECTCASE RESULTS
CASE "UPDATE"
    ; タイムアウト → アニメーションフレームを更新
    GOTO LOOP
CASEELSE
    ; ユーザーがボタンをクリック → 通常処理、ボタンハイライト/ツールチップも正常動作
ENDSELECT
```

### ホバー一時停止モード

動的インターフェースでは、マウスがボタンにホバーしたときにアニメーションを一時停止することでツールチップを維持します。`HOVER_PAUSE`フラグ + `MOUSEB()`検出で実装：

```erb
; HOVER_PAUSE：マウスホバーでアニメーション一時停止、離脱で再開
$INPUT_LOOP
IF ANIMATERECOLOREDMAPS > 0 && !FLAG:70
    IF HOVER_PAUSE
        TINPUTSNF 200, "UPDATE", 0, ""     ; ホバーモード：短いタイムアウトポーリング
    ELSE
        TINPUTSNF ANIMATERECOLOREDMAPS, "UPDATE", 0, ""  ; アニメーションモード：フレーム間隔
    ENDIF
ELSE
    INPUTS
ENDIF

; ホバー状態検出
IF RESULTS == "UPDATE"
    IF MOUSEB() != ""
        ; マウスがボタン上 → アニメーション一時停止
        IF !HOVER_PAUSE
            HOVER_PAUSE = 1
        ENDIF
        GOTO INPUT_LOOP    ; アニメーションを進めず、ポーリング継続
    ELSE
        ; マウスがボタンから離脱 → アニメーション再開
        IF HOVER_PAUSE
            HOVER_PAUSE = 0
        ENDIF
    ENDIF
ENDIF
; ... 通常の入力処理
```

原理：TINPUTSNFタイムアウト後に`MOUSEB()`をチェック——マウスがボタン上なら`HOVER_PAUSE=1`に設定し`GOTO INPUT_LOOP`（アニメーションを進めない）、マウスが離脱したら`HOVER_PAUSE=0`に戻す。ホバーモードでは200msの短いタイムアウトでポーリングし、マウス離脱後の素早いアニメーション再開を確保。

### NF変種の利点

| 特徴 | AWAITポーリング | NF変種 |
|------|----------------|--------|
| 自由スクロール | ✅ | ✅ |
| ボタンハイライト | ❌ | ✅ |
| ツールチップ | ❌ | ✅ |
| 入力の信頼性 | ❌ | ✅ |
| コード量 | 多い | 少ない |

---

## インタラクション命令クイックリファレンス

| 命令 | ブロック | ボタン | 自由スクロール | タイムアウト | 戻り値 |
|------|:---:|:---:|:---:|:---:|------|
| `INPUT` | ✅ | ✅ | ❌ | ❌ | RESULT |
| `INPUTS` | ✅ | ✅ | ❌ | ❌ | RESULTS |
| `TINPUT` | ✅ | ✅ | ❌ | ✅ | RESULT |
| `TINPUTS` | ✅ | ✅ | ❌ | ✅ | RESULTS |
| `ONEINPUT` | ✅ | ✅ | ❌ | ❌ | RESULT |
| `BINPUT` | ✅ | ✅ | ❌ | ❌ | RESULT |
| `INPUTANY` | ✅ | ❌ | ❌ | ❌ | RESULT |
| `INPUTMOUSEKEY` | ✅ | ❌ | ❌ | ✅ | RESULT:0~5 |
| `AWAIT` | ❌ | ❌ | ✅ | ❌ | なし |
| `TINPUTNF` | ✅ | ✅ | ✅ | ✅ | RESULT |
| `TINPUTSNF` | ✅ | ✅ | ✅ | ✅ | RESULTS |
| `TONEINPUTNF` | ✅ | ✅ | ✅ | ✅ | RESULT |
| `TONEINPUTSNF` | ✅ | ✅ | ✅ | ✅ | RESULTS |

---

## 次のステップ

| 知りたいこと | 参照 |
|:---|:---|
| INPUT命令API | [INPUT](../Reference/INPUT.md) |
| TINPUT命令API | [TINPUT](../Reference/TINPUT.md) |
| TINPUTNF命令API | [TINPUTNF](../Reference/TINPUTNF.md) |
| TONEINPUTNF命令API | [TONEINPUTNF](../Reference/TONEINPUTNF.md) |
| AWAIT命令API | [AWAIT](../Reference/AWAIT.md) |
| GETKEY命令API | [GETKEY](../Reference/GETKEY.md) |
| 状態マシンフロー | [状態マシンフロー](system-flow.md) |
| イベント関数 | [イベント関数](event-functions.md) |
