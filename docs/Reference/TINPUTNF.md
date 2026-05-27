---
hide:
  - toc
---

# TINPUT(S)NF

| 関数名                                                          | 引数                                   | 戻り値   |
| :-------------------------------------------------------------- | :------------------------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`TINPUTNF`](./TINPUTNF.md)  | `int`, `int`(, `int`, `string`, `int`) | `int`    |
| ![](../assets/images/IconEmuera.webp)[`TINPUTSNF`](./TINPUTNF.md) | `int`, `int`(, `int`, `string`, `int`) | `string` |

!!! info "API"

    ```  { #language-erbapi }
    TINPUTNF timeLimit, defaultValue(, displayTimeRemain, timeOverMessage, allowClick)
    TINPUTSNF timeLimit, defaultValue(, displayTimeRemain, timeOverMessage, allowClick)
    ```
    [`TINPUT`](TINPUT.md) / [`TINPUTS`](TINPUT.md) と全く同じ機能ですが、**強制スクロールを行いません**。

    NF = NoFocus。実行時に `WaitInputNoFocus` 状態に入り、`WaitInput` との唯一の違いはテキストボックスの位置合わせを行わないことです。そのため、ユーザーは自由にスクロールして過去の出力を閲覧できます。

    効果：
    - ✅ ボタンのハイライトとツールチップが正常に動作
    - ✅ 入力の信頼性（エンジンネイティブの入力パイプライン）
    - ✅ ユーザーは自由にスクロール可能、スクロール位置が強制的に戻されることはない
    - ✅ タイムアウト機構は元の TINPUT と同じ

    引数と戻り値は元のバージョンと全く同じです。[`TINPUT`](TINPUT.md) / [`TINPUTS`](TINPUT.md) を参照してください。

!!! hint "ヒント"

    命令のみ対応しています。

### 典型的な用途

定期的に画面を更新したいが強制スクロールを望まない場面——例えば動的マップアニメーション、リアルタイムタイトル画面など。

```erb
; 動的マップアニメーション：毎フレーム更新、ボタンはクリック可能、ユーザーは自由にスクロール可能
$MAP_LOOP
CALL DRAW_MAP
IF ANIM_INTERVAL > 0
    TINPUTSNF ANIM_INTERVAL, "UPDATE", 0, ""
ELSE
    INPUTS
ENDIF
SELECTCASE RESULTS
CASE "UPDATE"
    ; タイムアウト → アニメーションフレームを更新
    GOTO MAP_LOOP
CASEELSE
    ; ユーザーがボタンをクリック → 通常処理
ENDSELECT
```

### 関連項目
- [TINPUT](TINPUT.md)
- [TONEINPUTNF](TONEINPUTNF.md)
- [AWAIT](AWAIT.md)
