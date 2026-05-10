# Hello World

!!! info "本節対応マニュアル"

    - [ERB書式](../eramaker/ERB_format.md) — eramakerのERBフォーマット（歴史参考）
    - [システムフロー](../Emuera/system_flow.md) — エンジン起動と関数呼び出しフロー

---

## 最初のERBプログラム

`ERB/SYSTEM_TITLE.ERB` に最初の関数を書きます：

```erb
@SYSTEM_TITLE
    PRINTL eraの世界へようこそ！
    PRINTL [0] ゲーム開始
    PRINTL [1] ロード
    INPUT
    IF RESULT == 0
        BEGIN FIRST
    ELSEIF RESULT == 1
        BEGIN LOADGAME
    ENDIF
```

### 行ごとの解説

| 行 | 意味 |
|----|------|
| `@SYSTEM_TITLE` | 関数ラベル行。`SYSTEM_TITLE` という名前の関数を定義。エンジンはタイトル画面で自動的にこの関数を呼び出す |
| `PRINTL eraの世界へようこそ！` | テキストを1行出力して改行。`PRINTL` = PRINT + Line |
| `PRINTL [0] ゲーム開始` | 選択肢テキストを出力。`[0]` は自動的にクリック可能なボタンになる（下記参照） |
| `INPUT` | ユーザーの数値入力を待ち、結果を `RESULT` に格納 |
| `IF RESULT == 0` | ユーザー入力が 0 かどうかを判定 |
| `BEGIN FIRST` | ゲーム開始フローに移行 |
| `BEGIN LOADGAME` | ロードフローに移行 |

### `[N]` ボタン構文

`PRINTL [0] ゲーム開始` という行には、ERABASIC エンジンの特殊な動作が含まれています。テキスト中の `[0]` は自動的に**クリック可能なボタン**として認識されます。

**今はこれだけ知っておけば大丈夫**：

- `[整数]` は PRINTL 出力内でクリック可能なボタンになる
- ボタンをクリックすることは、INPUT 時にその数値を入力するのと等価（`[0]` をクリック → `RESULT = 0`）
- ボタンは `INPUT`（または `INPUTS`）が入力を待っている時だけクリック可能
- **行全体がボタン領域**——`[0]` だけでなく `ゲーム開始` もクリック可能

```erb
; この2つの入力方法は等価：
PRINTL [0] ゲーム開始
INPUT
; 方法1："ゲーム開始" をクリック → RESULT = 0
; 方法2：キーボードで 0 を入力 → RESULT = 0
```

!!! tip "段階的に学ぶ"

    `[N]` ボタンは ERABASIC で最もよく使われる書き方ですが、その仕組みは**出力システムと入力システムの深い結合**に関わります。本チュートリアルでは段階的に詳しく説明します：

    | 段階 | 学ぶ内容 | 場所 |
    |------|---------|------|
    | 今 | `[N]` がボタンを作り、INPUT がボタンを有効化する | このページ |
    | 基本出力 | ボタンの表示動作、PRINTPLAIN はボタンを生成しない | [基本出力](basic-output.md) |
    | 関数と CALL | INPUT/INPUTS の完全な使い方、デフォルト値、RESULT の保存 | [関数と CALL](call.md) |
    | HTMLとグラフィック | PRINTBUTTON 明示的ボタン、HTML `<button>` タグ | [HTMLタグ構文](html-syntax.md) |

### 実行方法

1. `Emuera.exe` をゲームのルートディレクトリに配置
2. `ERB/` フォルダに `SYSTEM_TITLE.ERB` を作成
3. `Emuera.exe` をダブルクリックして起動

---

## 2番目のプログラム：カスタム関数

```erb
@SYSTEM_TITLE
    CALL GREET("勇者")
    PRINTL [0] ゲーム開始
    INPUT
    IF RESULT == 0
        BEGIN FIRST
    ENDIF

@GREET(ARGS:0)
    PRINTFORM ようこそ、%ARGS:0%！
    PRINTL 冒険が始まりました。
RETURN
```

### 行ごとの解説

| 行 | 意味 |
|----|------|
| `CALL GREET("勇者")` | 関数 `GREET` を呼び出し、文字列引数 `"勇者"` を渡す |
| `@GREET(ARGS:0)` | 関数ラベル行。`ARGS:0` は組み込み文字列引数変数 |
| `PRINTFORM ようこそ、%ARGS:0%！` | フォーマット出力。`%ARGS:0%` が引数値に置換される |
| `RETURN` | 関数から戻る |

---

## 3番目のプログラム：式関数

```erb
@SYSTEM_TITLE
#DIM L_RESULT
    L_RESULT = ADD(3, 5)
    PRINTFORM 3 + 5 = {L_RESULT}
    PRINTL
    WAIT

@ADD(ARG:0, ARG:1)
#FUNCTION
    RETURNF ARG:0 + ARG:1
```

### 行ごとの解説

| 行 | 意味 |
|----|------|
| `#DIM L_RESULT` | プライベート整数変数 `L_RESULT` を宣言 |
| `L_RESULT = ADD(3, 5)` | 式関数 `ADD` を呼び出し、戻り値を `L_RESULT` に代入 |
| `@ADD(ARG:0, ARG:1)` | 関数ラベル行。`ARG:0` と `ARG:1` は組み込み整数引数変数 |
| `#FUNCTION` | この関数を式関数としてマーク（`@` 行の後の `#` プリプロセッサ領域） |
| `RETURNF ARG:0 + ARG:1` | 式関数は `RETURNF` で値を返す（`RETURN` ではない） |

!!! warning "`#` プリプロセッサ行は `@` 行の後、実行文の前に記述"

    すべての `#` で始まる行（`#DIM`/`#DIMS`/`#FUNCTION` 等）は、`@` ラベル行の後、最初の実行文の前に記述する必要があります。複数の `#` 行を連続して記述でき、順序は問いません。空行とコメント行（`;`）は影響しません。

    ```erb
    ; ❌ 間違い：実行文が # 行の連続を中断
    @ADD(ARG:0, ARG:1)
        PRINTL 開始          ; → 実行文、lastLine が更新される
    #FUNCTION                 ; → 警告: "#行は関数宣言の直後のみ使用可能"

    ; ✅ 正しい：#DIM、コメント、#FUNCTION を混在可能
    @ADD(ARG:0, ARG:1)
    #DIM L_TMP
    ; これはコメント（# 行の連続に影響しない）
    #FUNCTION
        RETURNF ARG:0 + ARG:1
    ```

---

## よくある落とし穴

| 落とし穴 | 間違い | 正しい | 理由 |
|------|---------|---------|------|
| 文字列に引用符なし | `CALL GREET(勇者)` | `CALL GREET("勇者")` | 引用符がないと変数名として扱われる |
| #DIM の位置が不正 | `@F` → `PRINTL` → `#DIM` | `@F` → `#DIM` → `PRINTL` | #DIM は @ 行の後、実行文の前に記述必須 |
| A〜Z を変数名に使用 | `#DIM A` | `#DIM L_A` | A〜Z はエンジン組み込み変数 |
| RETURNF を命令型関数で使用 | `RETURNF 42` | `RETURN 42` | RETURNF は式関数専用 |

---

## 次のステップ

| 知りたいこと | 進むべきページ |
|:---|:---|
| ファイルタイプと処理順序 | [ファイルタイプ](file-types.md) |
| 行タイプと構造 | [行タイプ](line-types.md) |
