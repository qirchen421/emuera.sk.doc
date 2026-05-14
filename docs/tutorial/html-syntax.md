# HTML タグ構文リファレンス

!!! info "変体による差異"

    - **Reference 分類**: [HTML 系](../Reference/README.md#html-related) / [画像処理関連](../Reference/README.md#image)

    このページでは、EmueraのHTMLタグ構文を統合的に解説します。各属性の末尾に変体タグを付記し、どの変体で追加されたかを明示します。

    | タグ | 変体 |
    |------|------|
    | *(なし)* | Emuera 原版からサポート |
    | **EM+EE** | EM+EE で追加 |
    | **DotNet** | EmueraDotNet で追加 |
    | **Skia** | Skia変体で追加 |

---

## 概要

`HTML_PRINT`・`HTML_PRINTL`などの命令で使用できるHTMLタグの構文リファレンスです。
タグは `<タグ名 属性='値'>テキスト</タグ名>` の形式で使用します。属性値は `'～'` または `"～"` で囲む必要があります（Emuera文字列との区別のため `'` 推奨）。

`HTML_PRINT`による描画は`ALIGNMENT`、`SETFONT`、`COLOR`、`FONTSTYLE`命令の影響を受けません。これらの効果はタグで指定する必要があります。

---

## テキスト構造タグ

### `<p>` — 段落整列

```html
<p align='～'>テキスト</p>
```

| 属性 | 必須 | 説明 |
|------|------|------|
| `align` | ✅ | `left` / `center` / `right` |

`</p>`は省略可能。`p`タグは文字列の前にのみ、`</p>`は最後にのみ配置可能。

### `<nobr>` — 非改行

```html
<nobr>テキスト</nobr>
```

`PRINTSINGLE`相当。描画領域を越えても暗黙の改行が行われなくなります。`<br>`による明示的な改行は可能です。`</nobr>`は省略可能。

### `<br>` — 改行

表示行の改行。複数の`<br>`があっても`CLEARLINE`や`LINECOUNT`では1行とみなされます。

---

## テキスト装飾タグ

### `<font>` — フォント指定

```html
<font face='～' color='～' bcolor='～'>テキスト</font>
```

| 属性 | 説明 |
|------|------|
| `face` | フォント名。空文字列でコンフィグ指定フォント |
| `color` | テキスト色（`#FF0080` / `red`） |
| `bcolor` | ボタン選択中の色 |

入れ子可能。色名は .NET の `Color` 構造体に準じます（`Transparent` 不可）。

### `<b>` / `<i>` / `<u>` / `<s>` — 文字装飾

```html
<b>太字</b> <i>イタリック</i> <u>下線</u> <s>打消し線</s>
```

---

## ボタンタグ

### `<button>` / `<nonbutton>`

```html
<button value='～' title='～' pos='～'>テキスト</button>
<nonbutton title='～' pos='～'>テキスト</nonbutton>
```

| 属性 | 対象 | 説明 |
|------|------|------|
| `value` | `button`のみ | ボタン値。省略時はクリック不可 |
| `title` | 両方 | ツールチップ |
| `pos` | 両方 | 左端からの位置（%、`align='left'`+`nobr`時のみ） |

### `<clearbutton>` — ボタン無効化 { data-toc-label="clearbutton" }

!!! tag-variant "EM+EE"

```html
<clearbutton>テキスト</clearbutton>
```

囲った部分のボタン機能を無効化（`title`、`pos`は保持）。

| 属性 | 説明 |
|------|------|
| `notooltip` | `true`でツールチップも無効化 |

### PRINTBUTTON — 明示的ボタン作成

`[N]` 自動ボタンや HTML `<button>` タグに加えて、ERABASIC は `PRINTBUTTON` 命令で明示的にボタンを作成できます：

```erb
PRINTBUTTON "[0] はい", 0
PRINTS "     "
PRINTBUTTON "[1] いいえ", 1
INPUT
```

`PRINTBUTTON` はエンジンの自動ボタン認識をバイパスし、ボタンの表示テキストと値を直接指定します。適用場面：

| 場面 | 自動ボタンの問題 | PRINTBUTTON の解決策 |
|------|---------------|----------------------|
| 1行に複数ボタンで分割エラー | `[0] はい [1] いいえ` の分割が異常 | 各ボタンを独立して作成 |
| 非数値のボタン値 | `[abc]` はボタンを生成しない | `PRINTBUTTON "選択肢", "文字列値"` |
| 表示テキストと値を変えたい | `[0]` は数値を表示する必要がある | `PRINTBUTTON "はい", 0` |

`PRINTBUTTON` は文字列ボタンも作成でき、`INPUTS` と組み合わせて使用します：

```erb
PRINTBUTTON "[HogeHoge] ", "HogeHoge"
PRINTBUTTON "[PugePuge] ", "PugePuge"
INPUTS
; クリック → RESULTS = "HogeHoge" または "PugePuge"
```

> PRINTBUTTON の完全な API は [PRINTBUTTON リファレンスマニュアル](../Reference/PRINTBUTTON.md) を参照してください。

---

## 画像タグ

### `<img>` — インライン画像

```html
<img src='リソース名' srcb='～' srcm='～' height='～' width='～' ypos='～' xpos='～' display='～' cm='～'>
```

#### 基本属性

| 属性 | 必須 | 説明 | 変体 |
|------|------|------|------|
| `src` | ✅ | リソース名 | |
| `srcb` | | ボタン選択時のリソース名 | |
| `srcm` | | ボタンマップ用リソース名 | EM+EE, Skia |
| `height` | | 縦幅（%、`px`指定可）。**負値で縦反転** | DotNet, Skia |
| `width` | | 横幅（%、`px`指定可）。**負値で横反転** | DotNet, Skia |
| `ypos` | | 縦位置オフセット（%、`px`指定可） | |
| `px`表記 | | 数値後に`px`でピクセル指定 | |

#### 絶対位置指定属性

!!! tag-variant "DotNet"

| 属性 | 説明 | 変体 |
|------|------|------|
| `xpos` | 絶対位置指定時のX座標（%、`px`指定可） | DotNet, Skia |
| `display` | 表示モード指定 | DotNet, Skia |

`display`属性の値：

| 値 | 説明 | 変体 |
|------|------|------|
| `relative` | デフォルト。テキスト流に追従 | DotNet, Skia |
| `absolute-lefttop` | ウィンドウ左上を原点に絶対位置指定 | DotNet, Skia |
| `absolute-leftbottom` | ウィンドウ左下を原点に絶対位置指定 | DotNet, Skia |

!!! note "xposの設計理由"

    元々`<img>`はインライン要素としてテキスト流に組み込まれるため、水平位置は自動的に決定され`xpos`は不要でした。しかし`display`属性で絶対位置指定モードに移行すると、テキスト流から離脱するため水平位置を明示的に指定する必要が生じます。これが`xpos`属性が追加された理由です。

#### カラー行列属性

!!! tag-variant "Skia"

| 属性 | 説明 | 変体 |
|------|------|------|
| `cm` | 5×5カラー行列変数名（`"CM_GRAY:0:0"`形式） | Skia |

`cm`属性には`#DIM`で宣言した5×5二次元整数配列の変数名を指定します。値は0～256の範囲で、SkiaSharpの`SKColorFilter`として適用されます。

---

## 図形タグ

### `<shape>` — 図形描画

```html
<shape type='rect' param='～～' color='～～' bcolor='～～'>
<shape type='space' param='～～'>
```

| 属性 | 必須 | 説明 |
|------|------|------|
| `type` | ✅ | `rect`（長方形） / `space`（空白） |
| `param` | ✅ | 図形パラメータ（%、カンマ区切り） |
| `color` | | 図形の色 |
| `bcolor` | | ボタン選択中の色 |

`type='rect'`の`param`：

- 1値：横幅のみ（`param='400'` = `param='0,0,400,100'`）
- 4値：`x, y, 横幅, 縦幅`

---

## コンテナタグ

### `<div>` — サブエリア

!!! tag-variant "EM+EE"

```html
<div width='～' height='～' xpos='～' ypos='～' display='～' color='～' ...>内容</div>
```

`<div>`は入れ子構造に対応していません。他のタグと併用可能です。

#### レイアウト属性

| 属性 | 説明 | 変体 |
|------|------|------|
| `width` | ✅ サブエリアの幅（%、`px`） | |
| `height` | ✅ サブエリアの高さ（%、`px`） | |
| `xpos` | 現在位置からの横方向距離 | |
| `ypos` | 現在位置からの縦方向距離 | |
| `size` | `width,height`の簡略化 | EM+EE, Skia |
| `rect` | `xpos,ypos,width,height`の簡略化 | EM+EE, Skia |
| `depth` | 奥行き（負=手前、正=奥） | EM+EE, Skia |
| `color` | 背景色 | EM+EE, Skia |

#### 表示モード属性

| 属性 | 説明 | 変体 |
|------|------|------|
| `display` | 表示モード指定 | EM+EE, DotNet, Skia |

`display`属性の値：

| 値 | 説明 | 変体 |
|------|------|------|
| `relative` | デフォルト。現在の文字位置で描画 | EM+EE, DotNet, Skia |
| `absolute` | ウィンドウ固定位置。`(0,0)`は左下、yposは上方向が正 | EM+EE, Skia |
| `absolute-lefttop` | ウィンドウ左上を原点に絶対位置指定 | DotNet, Skia |
| `absolute-leftbottom` | ウィンドウ左下を原点に絶対位置指定 | DotNet, Skia |

!!! note "`absolute`と`absolute-leftbottom`の違い"

    EM+EEの`absolute`とDotNetの`absolute-leftbottom`はどちらも左下原点の座標系ですが、yposの方向が異なります：

    - **EM+EE / Skia**：yposは上方向が正（`ウィンドウ高さ - ypos - 要素高さ`）
    - **DotNet**：yposは下方向が正（`ウィンドウ高さ + ypos`、負値で上方向）

    `absolute`はEM+EE互換としてDotNet/Skiaでも内部的にサポートされていますが、HTML属性値としては`absolute-lefttop`/`absolute-leftbottom`の明示的な指定を推奨します。

#### Box Model属性

| 属性 | 説明 | 変体 |
|------|------|------|
| `margin` | 外側余白（1～4値、`px`/%） | EM+EE, Skia |
| `padding` | 内側余白（1～4値、`px`/%） | |
| `border` | 境界線の幅（1～4値、`px`/%） | EM+EE, Skia |
| `bcolor` | 境界線の色 | EM+EE, Skia |
| `radius` | 角丸（1～4値、`px`/%） | EM+EE, Skia |

**4値指定フォーマット**（`margin`/`padding`/`border`/`radius`共通）：

| 指定数 | 適用先 |
|--------|--------|
| 1値 | 全四辺/四角 |
| 2値 | 上下・左右 |
| 3値 | 上・左右・下 |
| 4値 | 上・右・下・左 |

**`radius`の特殊パターン**：

| 指定数 | 適用先 |
|--------|--------|
| 2値 | 左上右下・右上左下 |
| 3値 | 左上・右上左下・右下 |
| 4値 | 左上・右上・右下・左下 |

---

## その他

### 文字参照

`&amp;` `&gt;` `&lt;` `&quot;` `&apos;` `&#nn;` `&#xnn;` に対応。

### コメント

`<!-- コメント -->` で囲まれた文字はHTML解釈時に無視されます。

---

## 属性サポート一覧

### `<img>` 属性対応表

| 属性 | Emuera | EM+EE | DotNet | Skia |
|------|--------|-------|--------|------|
| `src` | ✅ | ✅ | ✅ | ✅ |
| `srcb` | ✅ | ✅ | ✅ | ✅ |
| `srcm` | — | ✅ | — | ✅ |
| `height`（負値反転） | ✅ | ✅ | ✅ | ✅ |
| `width`（負値反転） | ✅ | ✅ | ✅ | ✅ |
| `ypos` | ✅ | ✅ | ✅ | ✅ |
| `px`表記 | — | ✅ | ✅ | ✅ |
| `xpos` | — | — | ✅ | ✅ |
| `display` | — | — | ✅ | ✅ |
| `cm` | — | — | — | ✅ |

### `<div>` 属性対応表

| 属性 | Emuera | EM+EE | DotNet | Skia |
|------|--------|-------|--------|------|
| `width` | — | ✅ | ✅ | ✅ |
| `height` | — | ✅ | ✅ | ✅ |
| `xpos` | — | ✅ | ✅ | ✅ |
| `ypos` | — | ✅ | ✅ | ✅ |
| `size` | — | ✅ | — | ✅ |
| `rect` | — | ✅ | — | ✅ |
| `depth` | — | ✅ | — | ✅ |
| `color` | — | ✅ | ✅ | ✅ |
| `display` | — | ✅ | ✅ | ✅ |
| `margin` | — | ✅ | — | ✅ |
| `padding` | — | ✅ | — | ✅ |
| `border` | — | ✅ | ✅ | ✅ |
| `bcolor` | — | ✅ | ✅ | ✅ |
| `radius` | — | ✅ | — | ✅ |

### `<div>` display値対応表

| 値 | EM+EE | DotNet | Skia |
|------|-------|--------|------|
| `relative` | ✅ | ✅ | ✅ |
| `absolute` | ✅ | ✅（互換） | ✅（互換） |
| `absolute-lefttop` | — | ✅ | ✅ |
| `absolute-leftbottom` | — | ✅ | ✅ |

---

## 関連項目

- [HTML_PRINT](../Reference/HTML_PRINT.md) — HTML出力命令
- [HTML_PRINT_ISLAND](../Reference/HTML_PRINT_ISLAND.md) — 独立HTMLレイヤー出力
- [リソース設定](../Emuera/resources.md) — 画像リソースの準備方法
