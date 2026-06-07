# HTML 标签语法参考

!!! info "变体差异"

    - **Reference 分类**: [HTML 系列](../Reference/README.zh.md#html-related) / [图像处理相关](../Reference/README.zh.md#image)

    本页面整合讲解 Emuera 的 HTML 标签语法。各属性末尾标注变体标签，标明该属性由哪个变体追加。

    | 标签 | 变体 |
    |------|------|
    | *(无)* | Emuera 原版即支持 |
    | **EM+EE** | EM+EE 追加 |
    | **DotNet** | EmueraDotNet 追加 |
    | **Skia** | Skia 变体追加 |

---

## 概要

本文档是 `HTML_PRINT`、`HTML_PRINTL` 等命令中可使用的 HTML 标签语法参考。
标签使用 `<标签名 属性='值'>文本</标签名>` 的形式。属性值必须用 `'～'` 或 `"～"` 包围（推荐使用 `'` 以与 Emuera 字符串区分）。

`HTML_PRINT` 的绘制不受 `ALIGNMENT`、`SETFONT`、`COLOR`、`FONTSTYLE` 命令的影响。这些效果必须通过标签指定。

---

## 文本结构标签

### `<p>` — 段落对齐

```html
<p align='～'>文本</p>
```

| 属性 | 必需 | 说明 |
|------|------|------|
| `align` | ✅ | `left` / `center` / `right` |

`</p>`可省略。`p`标签只能放在字符串前，`</p>`只能放在最后。

### `<nobr>` — 禁止换行

```html
<nobr>文本</nobr>
```

相当于 `PRINTSINGLE`。超出绘制区域时不会隐式换行（`<br>` 显式换行仍可用）。`</nobr>`可省略。

### `<br>` — 换行

显示行的换行。无论有多少 `<br>`，在 `CLEARLINE` 或 `LINECOUNT` 中都视为一行。

---

## 文本装饰标签

### `<font>` — 字体指定

```html
<font face='～' color='～' bcolor='～'>文本</font>
```

| 属性 | 说明 |
|------|------|
| `face` | 字体名。空字符串使用配置中指定的字体 |
| `color` | 文本颜色（`#FF0080` / `red`） |
| `bcolor` | 按钮选中时的颜色 |

可嵌套。颜色名遵循 .NET 的 `Color` 结构体定义（不可指定 `Transparent`）。

!!! info "ARGB 颜色格式"

    `color`/`bcolor` 属性支持 8 位 ARGB 颜色：`#AARRGGBB`（如 `#80FF0000` = 半透明红色）。6 位 `#RRGGBB` 格式 alpha 默认为 255（不透明）。

### `<b>` / `<i>` / `<u>` / `<s>` — 文字装饰

```html
<b>粗体</b> <i>斜体</i> <u>下划线</u> <s>删除线</s>
```

---

## 按钮标签

### `<button>` / `<nonbutton>`

```html
<button value='～' title='～' pos='～'>文本</button>
<nonbutton title='～' pos='～'>文本</nonbutton>
```

| 属性 | 对象 | 说明 |
|------|------|------|
| `value` | 仅`button` | 按钮值。省略时不可点击 |
| `title` | 两者 | 工具提示 |
| `pos` | 两者 | 距左端的位置（%、仅在 `align='left'`+`nobr` 时可用） |

### `<clearbutton>` — 按钮无效化 { data-toc-label="clearbutton" }

!!! tag-variant "EM+EE"

```html
<clearbutton>文本</clearbutton>
```

使包围部分的按钮功能无效化（`title`、`pos` 仍保留）。

| 属性 | 说明 |
|------|------|
| `notooltip` | `true` 时工具提示也无效化 |

### PRINTBUTTON — 显式按钮创建

除了 `[N]` 自动按钮和 HTML `<button>` 标签，ERABASIC 还提供 `PRINTBUTTON` 指令显式创建按钮：

```erb
PRINTBUTTON "[0] 是", 0
PRINTS "     "
PRINTBUTTON "[1] 否", 1
INPUT
```

`PRINTBUTTON` 绕过引擎的自动按钮识别，直接指定按钮的显示文本和值。适用场景：

| 场景 | 自动按钮的问题 | PRINTBUTTON 的解决方案 |
|------|---------------|----------------------|
| 一行多按钮拆分错误 | `[0] 是 [1] 否` 可能拆分异常 | 每个按钮独立创建 |
| 非数字按钮值 | `[abc]` 不会生成按钮 | `PRINTBUTTON "选项", "字符串值"` |
| 显示文本与值不同 | `[0]` 必须显示数字 | `PRINTBUTTON "是", 0` |

`PRINTBUTTON` 也可以创建字符串按钮，配合 `INPUTS` 使用：

```erb
PRINTBUTTON "[HogeHoge] ", "HogeHoge"
PRINTBUTTON "[PugePuge] ", "PugePuge"
INPUTS
; 点击 → RESULTS = "HogeHoge" 或 "PugePuge"
```

> PRINTBUTTON 的完整 API 见 [PRINTBUTTON 参考手册](../Reference/PRINTBUTTON.zh.md)。

---

## 图像标签

### `<img>` — 内联图像

```html
<img src='资源名' srcb='～' srcm='～' height='～' width='～' ypos='～' xpos='～' display='～' cm='～'>
```

#### 基本属性

| 属性 | 必需 | 说明 | 变体 |
|------|------|------|------|
| `src` | ✅ | 资源名 | |
| `srcb` | | 按钮选中时的资源名 | |
| `srcm` | | 按钮映射用资源名 | EM+EE, Skia |
| `height` | | 纵向尺寸（%、`px`指定）。**负值时垂直翻转** | DotNet, Skia |
| `width` | | 横向尺寸（%、`px`指定）。**负值时水平翻转** | DotNet, Skia |
| `ypos` | | 垂直位置偏移（%、`px`指定） | |
| `px`表示 | | 数值后加 `px` 可进行像素指定 | |

#### 绝对定位属性

!!! tag-variant "DotNet"

| 属性 | 说明 | 变体 |
|------|------|------|
| `xpos` | 绝对定位时的 X 坐标（%、`px`指定） | DotNet, Skia |
| `display` | 显示模式指定 | DotNet, Skia |

`display` 属性值：

| 值 | 说明 | 变体 |
|------|------|------|
| `relative` | 默认。跟随文本流 | DotNet, Skia |
| `absolute-lefttop` | 以窗口左上角为原点绝对定位 | DotNet, Skia |
| `absolute-leftbottom` | 以窗口左下角为原点绝对定位 | DotNet, Skia |

!!! note "xpos 的设计理由"

    原先 `<img>` 作为内联元素嵌入文本流，水平位置由排版自动决定，因此不需要 `xpos`。但当 `display` 属性切换到绝对定位模式时，图片脱离了文本流，水平位置不再由排版自动决定，必须有一个属性来指定 X 坐标。这就是 `xpos` 被追加的原因。

#### 颜色矩阵属性

!!! tag-variant "Skia"

| 属性 | 说明 | 变体 |
|------|------|------|
| `cm` | 5×5 颜色矩阵变量名（`"CM_GRAY:0:0"` 格式） | Skia |

`cm` 属性指定用 `#DIM` 声明的 5×5 二维整数数组变量名。值范围为 0～256，作为 SkiaSharp 的 `SKColorFilter` 应用。

---

## 图形标签

### `<shape>` — 图形绘制

```html
<shape type='rect' param='～～' color='～～' bcolor='～～'>
<shape type='space' param='～～'>
```

| 属性 | 必需 | 说明 |
|------|------|------|
| `type` | ✅ | `rect`（矩形）/ `space`（空白） |
| `param` | ✅ | 图形参数（%、逗号分隔） |
| `color` | | 图形颜色 |
| `bcolor` | | 按钮选中时的颜色 |

`type='rect'` 的 `param`：

- 1 值：仅宽度（`param='400'` = `param='0,0,400,100'`）
- 4 值：`x, y, 宽度, 高度`

---

## 容器标签

### `<div>` — 子区域

!!! tag-variant "EM+EE"

```html
<div width='～' height='～' xpos='～' ypos='～' display='～' color='～' ...>内容</div>
```

`<div>` 不支持嵌套结构。可与其他标签组合使用。

!!! warning "必需属性"

    `width` 为**必需属性**，省略会触发运行时错误。仅接受整数或 `Npx` 格式（`"auto"` 不合法）。

    `height` 为可选属性。省略时自动从内容行数 + padding/border 计算高度（`行数 × 行高 + padding上下 + border上下`）。

!!! warning "不支持 align"

    `<div>` **不支持** `align` 属性。文本对齐需在 `<div>` 内部使用 `<p align='center'>内容</p>` 实现。

#### 布局属性

| 属性 | 说明 | 变体 |
|------|------|------|
| `width` | ✅ 子区域宽度（%、`px`） | |
| `height` | 子区域高度（%、`px`）。省略时自动计算 | Skia |
| `xpos` | 从当前位置的横向距离 | |
| `ypos` | 从当前位置的纵向距离 | |
| `size` | `width,height` 的简写 | EM+EE, Skia |
| `rect` | `xpos,ypos,width,height` 的简写 | EM+EE, Skia |
| `depth` | 深度（负=靠前、正=靠后） | EM+EE, Skia |
| `color` | 背景色 | EM+EE, Skia |

#### 显示模式属性

| 属性 | 说明 | 变体 |
|------|------|------|
| `display` | 显示模式指定 | EM+EE, DotNet, Skia |

`display` 属性值：

| 值 | 说明 | 变体 |
|------|------|------|
| `relative` | 默认。在当前文字位置绘制 | EM+EE, DotNet, Skia |
| `absolute` | 窗口固定位置。`(0,0)`为左下角，ypos 向上为正 | EM+EE, Skia |
| `absolute-lefttop` | 以窗口左上角为原点绝对定位 | DotNet, Skia |
| `absolute-leftbottom` | 以窗口左下角为原点绝对定位 | DotNet, Skia |

!!! note "`absolute` 与 `absolute-leftbottom` 的区别"

    EM+EE 的 `absolute` 与 DotNet 的 `absolute-leftbottom` 都使用左下原点坐标系，但 ypos 方向不同：

    - **EM+EE / Skia**：ypos 向上为正（`窗口高度 - ypos - 元素高度`）
    - **DotNet**：ypos 向下为正（`窗口高度 + ypos`，负值向上）

    `absolute` 作为 EM+EE 兼容模式在 DotNet/Skia 内部也有支持，但作为 HTML 属性值推荐使用 `absolute-lefttop`/`absolute-leftbottom` 的显式指定。

#### Box Model 属性

| 属性 | 说明 | 变体 |
|------|------|------|
| `margin` | 外边距（1～4 值、`px`/%） | EM+EE, Skia |
| `padding` | 内边距（1～4 值、`px`/%） | |
| `border` | 边框宽度（1～4 值、`px`/%） | EM+EE, Skia |
| `bcolor` | 边框颜色（省略时默认文本色） | EM+EE, Skia |
| `radius` | 圆角（1～4 值、`px`/%） | EM+EE, Skia |

**4 值指定格式**（`margin`/`padding`/`border`/`radius` 通用）：

| 指定数 | 应用到 |
|--------|--------|
| 1 值 | 全四边/四角 |
| 2 值 | 上下・左右 |
| 3 值 | 上・左右・下 |
| 4 值 | 上・右・下・左 |

**`radius` 的特殊模式**：

| 指定数 | 应用到 |
|--------|--------|
| 2 值 | 左上右下・右上左下 |
| 3 值 | 左上・右上左下・右下 |
| 4 值 | 左上・右上・右下・左下 |

---

## 其他

### 字符引用

支持 `&amp;` `&gt;` `&lt;` `&quot;` `&apos;` `&#nn;` `&#xnn;`。

### 注释

`<!-- 注释 -->` 包围的文字在 HTML 解析时被忽略。

---

## 标签闭合规则

Emuera 的 HTML 解析器**严格要求**所有非自闭合标签必须正确闭合。未闭合的标签会触发运行时错误："存在没有结尾的标签"。

### 自闭合标签（无需闭合）

| 标签 | 说明 |
|------|------|
| `<br>` | 换行 |
| `<img>` | 内联图像 |
| `<shape>` | 图形绘制 |

### 必须闭合的标签

| 标签 | 闭合形式 |
|------|---------|
| `<font>` | `</font>` |
| `<p>` | `</p>`（可省略，但建议显式闭合） |
| `<b>` / `<i>` / `<u>` / `<s>` | 对应的 `</b>` / `</i>` / `</u>` / `</s>` |
| `<button>` / `<nonbutton>` | `</button>` / `</nonbutton>` |
| `<div>` | `</div>` |
| `<nobr>` | `</nobr>` |

### 嵌套规则

标签必须按嵌套顺序闭合（后开先关）：

```html
<!-- ✅ 正确 -->
<font color='red'><b>文本</b></font>

<!-- ❌ 错误：交叉嵌套 -->
<font color='red'><b>文本</font></b>
```

---

## 行平衡 HTML

### 问题

当 HTML 内容包含 `<br>` 换行，且 `<font>` 等标签跨越 `<br>` 边界时，按 `<br>` 分割后每行会出现未配对标签：

```html
<!-- 整体包裹：跨行 <font> -->
<font color='red'>第一行<br>第二行<br>第三行</font>

<!-- 按 <br> 分割后 -->
<font color='red'>第一行    ← 未闭合
第二行                   ← 无标签
第三行</font>            ← 无开标签
```

Emuera 解析器检测到 `FonttagList.Count > 0`，抛出"存在没有结尾的标签"错误。

### 解决方案：行平衡 HTML

**每行独立包裹 `<font>` 标签**，确保按 `<br>` 分割后每行标签配对：

```html
<!-- 行平衡：每行独立 <font> -->
<font color='red'>第一行</font><br><font color='red'>第二行</font><br><font color='red'>第三行</font>
```

### 适用场景

行平衡 HTML 是**按行处理 HTML 内容**的必要前提：

| 场景 | 说明 |
|------|------|
| 字符画信箱（`LETTERBOX_DRAW`） | 按 `<br>` 分割后逐行添加边框字符 |
| VN 框架（`FLAN_LETTERBOX_FRAME`） | 同上 |
| `HTML_STRINGLEN` 逐行测量 | 对每行独立测量渲染宽度 |

### 生产者契约

`LETTER_TEXT_TO_HTML` / `FLAN_TEXT_BLOCK` 等文本→HTML 转换函数**必须**输出行平衡 HTML。下游消费者（`LETTERBOX_DRAW` / `FLAN_LETTERBOX_FRAME`）可安全地按 `<br>` 分割处理。

---

## HTML 内置函数

Emuera 提供以下 HTML 处理内置函数，用于在 ERB 脚本中操作 HTML 字符串：

| 函数 | 类型 | 用途 |
|------|------|------|
| `HTML_ESCAPE(文本)` | 函数 | 纯文本 → HTML 转义（`<` → `&lt;` 等） |
| `HTML_TOPLAINTEXT(HTML)` | 函数 | HTML → 纯文本（删除标签 + 展开字符引用） |
| `HTML_STRINGLEN(HTML, 模式)` | 函数 | HTML 渲染宽度（模式 0=半角字符数，1=像素） |
| `HTML_SUBSTRING(HTML, 宽度)` | 函数 | 按 HTML 渲染宽度截取子串（`RESULTS:1` = 剩余部分） |
| `HTML_STRINGLINES(HTML, 宽度)` | 函数 | HTML 按宽度分割后的行数 |
| `HTML_GETPRINTEDSTR(行号)` | 函数 | 获取已显示行的 HTML 内容 |
| `HTML_POPPRINTINGSTR()` | 函数 | 获取当前 PRINT 缓冲区的 HTML 内容 |

| 指令 | 类型 | 用途 |
|------|------|------|
| `HTML_TAGSPLIT HTML, 结果数, 结果数组` | 指令 | 将 HTML 拆分为纯文本段和标签段交替数组（偶数索引=纯文本，奇数索引=标签） |

> 各函数的详细参数和返回值见 Reference 分类中的对应页面。

---

## 属性支持一览

### `<img>` 属性对应表

| 属性 | Emuera | EM+EE | DotNet | Skia |
|------|--------|-------|--------|------|
| `src` | ✅ | ✅ | ✅ | ✅ |
| `srcb` | ✅ | ✅ | ✅ | ✅ |
| `srcm` | — | ✅ | — | ✅ |
| `height`（负值翻转） | ✅ | ✅ | ✅ | ✅ |
| `width`（负值翻转） | ✅ | ✅ | ✅ | ✅ |
| `ypos` | ✅ | ✅ | ✅ | ✅ |
| `px`表示 | — | ✅ | ✅ | ✅ |
| `xpos` | — | — | ✅ | ✅ |
| `display` | — | — | ✅ | ✅ |
| `cm` | — | — | — | ✅ |

### `<div>` 属性对应表

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

### `<div>` display 值对应表

| 值 | EM+EE | DotNet | Skia |
|------|-------|--------|------|
| `relative` | ✅ | ✅ | ✅ |
| `absolute` | ✅ | ✅（兼容） | ✅（兼容） |
| `absolute-lefttop` | — | ✅ | ✅ |
| `absolute-leftbottom` | — | ✅ | ✅ |

---

## 资源设置

图像资源的准备方法、CSV 定义格式、Skia 版资源管理机制（懒加载索引、SharedBitmapCache、AnimSpriteCache）及使用建议，详见 [资源设置 — 图像资源的准备方法](resources.zh.md)。

---

## 相关项目

- [资源设置 — 图像资源的准备方法](resources.zh.md) — CSV 定义格式、Skia 版资源管理机制
- [HTML_PRINT](../Reference/HTML_PRINT.zh.md) — HTML 输出命令
- [HTML_PRINT_ISLAND](../Reference/HTML_PRINT_ISLAND.zh.md) — 独立 HTML 图层输出
- [SPRITECREATEFROMFILE](../Reference/SPRITECREATEFROMFILE.zh.md) — 运行时图像加载（Skia）
- [资源文件（历史）](../Emuera/resources.zh.md) — 原版 Emuera 的资源设置说明
