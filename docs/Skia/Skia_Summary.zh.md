---
---

# Skia 功能概要

!!! info "关于本页"

    本页汇总了 **Emuera Skia (Skia版)** 除 bug 修复外的全量新功能。
    Skia版以 EmueraEM+EE 为基础，追加了延迟加载、MAP扩展、SkiaSharp渲染等独有功能的派生版本。

---

## 凡例 { #legend }

- ![](../assets/images/IconSK.webp) - Skia（Skia版）中追加、变更、扩展的功能
- ![](../assets/images/IconEM.webp) - EM(EvilMask版)中追加的功能
- ![](../assets/images/IconEE.webp) - EE(Enter's Edition)中追加的功能
- ![](../assets/images/Icondotnet.webp) - 从 DotNet 版同步的功能

---

## Skia版新增函数一览 { #skia-functions }

> Skia版新增的命令·式中函数一览。已有函数的扩展参数请参阅[规格变更的命令](#changed-commands)。

| 函数 | 类型 | 说明 | 详情 |
|:---|:---|:---|:---|
| ![](../assets/images/IconSK.webp) `SETIMAGELAYER` | 命令 | 独立图像图层的设置/更新 | [SETIMAGELAYER](../Reference/SETIMAGELAYER.md) |
| ![](../assets/images/IconSK.webp) `CLEARIMAGELAYER` | 命令 | 删除指定深度的图层 | [CLEARIMAGELAYER](../Reference/CLEARIMAGELAYER.md) |
| ![](../assets/images/IconSK.webp) `CLEARIMAGELAYER_ALL` | 命令 | 删除全部图层 | [CLEARIMAGELAYER](../Reference/CLEARIMAGELAYER.md) |
| ![](../assets/images/IconSK.webp) `EXISTSIMAGELAYER` | 式中函数 | 确认图层是否存在 | [EXISTSIMAGELAYER](../Reference/EXISTSIMAGELAYER.md) |
| ![](../assets/images/IconSK.webp) `CALLSTR` | 命令 | 调用字符串变量中的函数 | [CALLSTR](../Reference/CALLSTR.md) |
| ![](../assets/images/IconSK.webp) `JUMPSTR` | 命令 | 跳转到字符串变量中的函数 | [CALLSTR](../Reference/CALLSTR.md) |
| ![](../assets/images/IconSK.webp) `TRYCALLSTR` | 命令 | 带存在检查的CALLSTR | [CALLSTR](../Reference/CALLSTR.md) |
| ![](../assets/images/IconSK.webp) `TRYJUMPSTR` | 命令 | 带存在检查的JUMPSTR | [CALLSTR](../Reference/CALLSTR.md) |
| ![](../assets/images/IconSK.webp) `TRYCCALLSTR` | 命令 | 带存在检查的CALLSTR（带CATCH） | [CALLSTR](../Reference/CALLSTR.md) |
| ![](../assets/images/IconSK.webp) `TRYCJUMPSTR` | 命令 | 带存在检查的JUMPSTR（带CATCH） | [CALLSTR](../Reference/CALLSTR.md) |
| ![](../assets/images/IconSK.webp) `EVAL` | 式中函数 | 将字符串表达式作为整数求值 | [EVAL](../Reference/EVAL.md) |
| ![](../assets/images/IconSK.webp) `EVALS` | 式中函数 | 将字符串表达式作为字符串求值 | [EVAL](../Reference/EVAL.md) |
| ![](../assets/images/IconSK.webp) `BITSET` | 式中函数 | 设置指定位 | [BITARRAY](../Reference/BITARRAY.md) |
| ![](../assets/images/IconSK.webp) `BITGET` | 式中函数 | 获取指定位的值 | [BITARRAY](../Reference/BITARRAY.md) |
| ![](../assets/images/IconSK.webp) `BITTOGGLE` | 式中函数 | 翻转指定位 | [BITARRAY](../Reference/BITARRAY.md) |
| ![](../assets/images/IconSK.webp) `BITINDEXOFFIRST` | 式中函数 | 首个设置/清除位的索引 | [BITARRAY](../Reference/BITARRAY.md) |
| ![](../assets/images/IconSK.webp) `MAP_VALUES` | 式中函数 | 以逗号分隔字符串获取全部值 | [MAP_GETKEYS](../Reference/MAP_GETKEYS.md) |
| ![](../assets/images/IconSK.webp) `MAP_TOSTRING` | 式中函数 | 将Map序列化为key=value格式 | [MAP_SERIALIZATION](../Reference/MAP_SERIALIZATION.md) |
| ![](../assets/images/IconSK.webp) `MAP_FROMSTRING` | 式中函数 | 从key=value格式反序列化Map | [MAP_SERIALIZATION](../Reference/MAP_SERIALIZATION.md) |
| ![](../assets/images/IconSK.webp) `MAP_MERGE` | 式中函数 | 合并其他Map的内容 | [MAP_ENHANCED](../Reference/MAP_ENHANCED.md) |
| ![](../assets/images/IconSK.webp) `MAP_REMOVEIF` | 式中函数 | 删除符合条件的键 | [MAP_ENHANCED](../Reference/MAP_ENHANCED.md) |
| ![](../assets/images/IconSK.webp) `MAP_FINDKEY` | 式中函数 | 搜索与值匹配的键 | [MAP_ENHANCED](../Reference/MAP_ENHANCED.md) |
| ![](../assets/images/IconSK.webp) `SIN` | 式中函数 | 正弦（弧度） | [MATH_EXTENSION](../Reference/MATH_EXTENSION.md) |
| ![](../assets/images/IconSK.webp) `COS` | 式中函数 | 余弦（弧度） | [MATH_EXTENSION](../Reference/MATH_EXTENSION.md) |
| ![](../assets/images/IconSK.webp) `TAN` | 式中函数 | 正切（弧度） | [MATH_EXTENSION](../Reference/MATH_EXTENSION.md) |
| ![](../assets/images/IconSK.webp) `ASIN` | 式中函数 | 反正弦 | [MATH_EXTENSION](../Reference/MATH_EXTENSION.md) |
| ![](../assets/images/IconSK.webp) `ACOS` | 式中函数 | 反余弦 | [MATH_EXTENSION](../Reference/MATH_EXTENSION.md) |
| ![](../assets/images/IconSK.webp) `ATAN` | 式中函数 | 反正切 | [MATH_EXTENSION](../Reference/MATH_EXTENSION.md) |
| ![](../assets/images/IconSK.webp) `FLOOR` | 式中函数 | 向下取整 | [MATH_EXTENSION](../Reference/MATH_EXTENSION.md) |
| ![](../assets/images/IconSK.webp) `CEIL` | 式中函数 | 向上取整 | [MATH_EXTENSION](../Reference/MATH_EXTENSION.md) |
| ![](../assets/images/IconSK.webp) `ROUND` | 式中函数 | 四舍五入 | [MATH_EXTENSION](../Reference/MATH_EXTENSION.md) |
| ![](../assets/images/IconSK.webp) `UNCHECKED_ADD` | 式中函数 | 加法回环溢出 | [UNCHECKED](../Reference/UNCHECKED.md) |
| ![](../assets/images/IconSK.webp) `UNCHECKED_SUB` | 式中函数 | 减法回环溢出 | [UNCHECKED](../Reference/UNCHECKED.md) |
| ![](../assets/images/IconSK.webp) `UNCHECKED_MUL` | 式中函数 | 乘法回环溢出 | [UNCHECKED](../Reference/UNCHECKED.md) |
| ![](../assets/images/IconSK.webp) `UNCHECKED_NEG` | 式中函数 | 取反回环溢出 | [UNCHECKED](../Reference/UNCHECKED.md) |
| ![](../assets/images/IconSK.webp) `HTML_PRINTC` | 命令 | 右对齐输出HTML字符串 | [HTML_PRINTC](../Reference/HTML_PRINTC.md) |
| ![](../assets/images/IconSK.webp) `HTML_PRINTLC` | 命令 | 左对齐输出HTML字符串（带行宽计算） | [HTML_PRINTC](../Reference/HTML_PRINTC.md) |
| ![](../assets/images/IconSK.webp) `SPRITECREATEFROMFILE` | 式中函数 | 从图像文件直接创建Sprite | [SPRITECREATEFROMFILE](../Reference/SPRITECREATEFROMFILE.md) |
| ![](../assets/images/IconSK.webp) `SET_TEXT_DRAWING_MODE` | 命令 | 设置文本渲染管线 | [SKIA_RENDER](../Reference/SKIA_RENDER.md) |
| ![](../assets/images/IconSK.webp) `GET_TEXT_DRAWING_MODE` | 式中函数 | 获取文本渲染管线 | [SKIA_RENDER](../Reference/SKIA_RENDER.md) |
| ![](../assets/images/IconSK.webp) `SET_SKIA_QUALITY` | 命令 | 设置渲染品质 | [SKIA_RENDER](../Reference/SKIA_RENDER.md) |
| ![](../assets/images/IconSK.webp) `GET_SKIA_QUALITY` | 式中函数 | 获取渲染品质 | [SKIA_RENDER](../Reference/SKIA_RENDER.md) |
| ![](../assets/images/Icondotnet.webp) `G_POLYGON_DRAW` | 命令 | 绘制多边形轮廓 | [G_POLYGON](../Reference/G_POLYGON.md) |
| ![](../assets/images/Icondotnet.webp) `G_POLYGON_FILL` | 命令 | 填充多边形 | [G_POLYGON](../Reference/G_POLYGON.md) |
| ![](../assets/images/Icondotnet.webp) `G_POLYGON_POINT_ADD` | 命令 | 添加多边形顶点 | [G_POLYGON](../Reference/G_POLYGON.md) |
| ![](../assets/images/Icondotnet.webp) `G_POLYGON_POINT_CLEAR` | 命令 | 清除所有顶点 | [G_POLYGON](../Reference/G_POLYGON.md) |
| ![](../assets/images/IconSK.webp) `TEXT_BGC_ON` | 命令 | 启用文本背景色显示 | [TEXT_BGC](../Reference/TEXT_BGC.md) |
| ![](../assets/images/IconSK.webp) `TEXT_BGC_OFF` | 命令 | 禁用文本背景色显示 | [TEXT_BGC](../Reference/TEXT_BGC.md) |
| ![](../assets/images/IconSK.webp) `SQL_ESCAPE` | 式中函数 | 字符串SQL转义 | [SQL_PARAM](../Reference/SQL_PARAM.md) |
| ![](../assets/images/IconSK.webp) `SQL_P_EXECUTE_NONQUERY` | 命令 | 参数化查询执行（非查询） | [SQL_PARAM](../Reference/SQL_PARAM.md) |
| ![](../assets/images/IconSK.webp) `SQL_P_EXECUTE_READER` | 命令 | 参数化查询执行（读取器） | [SQL_PARAM](../Reference/SQL_PARAM.md) |
| ![](../assets/images/IconSK.webp) `SQL_P_EXECUTE_SCALAR_LONG` | 式中函数 | 参数化查询执行（标量long） | [SQL_PARAM](../Reference/SQL_PARAM.md) |
| ![](../assets/images/IconSK.webp) `SQL_P_EXECUTE_SCALAR_STRING` | 式中函数 | 参数化查询执行（标量string） | [SQL_PARAM](../Reference/SQL_PARAM.md) |
| ![](../assets/images/IconSK.webp) `SQL_P_EXECUTE_SCALAR_FLOAT` | 式中函数 | 参数化查询执行（标量float） | [SQL_PARAM](../Reference/SQL_PARAM.md) |
| ![](../assets/images/Icondotnet.webp) `SQL_CONNECTION_OPEN` | 命令 | 便利函数：在sav/sql/下创建DB连接 | [SQL_CONNECT](../Reference/SQL_CONNECT.md) |
| ![](../assets/images/IconSK.webp) `SQL_IMPORT_MAP_XML` | 命令 | 从 XML 导入 MAP 到 SQL | [SQL_XML](../Reference/SQL_XML.md) |
| ![](../assets/images/IconSK.webp) `SQL_IMPORT_DT_XML` | 命令 | 从 XML 导入 DataTable 到 SQL | [SQL_XML](../Reference/SQL_XML.md) |
| ![](../assets/images/IconSK.webp) `SQL_EXPORT_MAP_XML` | 命令 | 从 SQL 导出 MAP 为 XML | [SQL_XML](../Reference/SQL_XML.md) |
| ![](../assets/images/IconSK.webp) `SQL_EXPORT_DT_XML` | 命令 | 从 SQL 导出 DataTable 为 XML | [SQL_XML](../Reference/SQL_XML.md) |
| ![](../assets/images/IconSK.webp) `SQL_IMPORT_XML_CUSTOM` | 命令 | 自定义 XML 导入 | [SQL_XML](../Reference/SQL_XML.md) |
| ![](../assets/images/IconSK.webp) `STRICT_FONT_FALLBACK` | 命令 | 严格字体回退模式 | [STRICT_FONT_FALLBACK](../Reference/STRICT_FONT_FALLBACK.md) |
| ![](../assets/images/Icondotnet.webp) `GETCSVNOBYNAME` | 式中函数 | 从NAME反查角色编号 | [GETCSVNOBY](../Reference/GETCSVNOBY.md) |
| ![](../assets/images/Icondotnet.webp) `GETCSVNOBYNICKNAME` | 式中函数 | 从NICKNAME反查角色编号 | [GETCSVNOBY](../Reference/GETCSVNOBY.md) |
| ![](../assets/images/Icondotnet.webp) `GETCSVNOBYCALLNAME` | 式中函数 | 从CALLNAME反查角色编号 | [GETCSVNOBY](../Reference/GETCSVNOBY.md) |
| ![](../assets/images/Icondotnet.webp) `GETCSVNOBYMASTERNAME` | 式中函数 | 从MASTERNAME反查角色编号 | [GETCSVNOBY](../Reference/GETCSVNOBY.md) |
| ![](../assets/images/Icondotnet.webp) `MATCHALL` | 式中函数 | 数组全量搜索（变量引用） | [MATCHALL](../Reference/MATCHALL.md) |
| ![](../assets/images/Icondotnet.webp) `MATCHALLEX` | 式中函数 | 数组全量搜索（字符串变量名） | [MATCHALL](../Reference/MATCHALL.md) |
| ![](../assets/images/IconSK.webp) `BEFORE_THROW` | 事件函数 | THROW 抛出前调用 | [事件函数](../tutorial/event-functions.zh.md#before_throw) |
| ![](../assets/images/IconSK.webp) `BEFORE_ERROR` | 事件函数 | 错误发生时首次调用 | [事件函数](../tutorial/event-functions.zh.md#before_error) |

---

### ![](../assets/images/IconSK.webp)错误处理事件
!!! summary ""

    新增 `BEFORE_THROW` 和 `BEFORE_ERROR` 两个事件函数，提供脚本级别的错误处理能力。

    - **`BEFORE_THROW`**：在 `THROW` 指令抛出异常前调用，允许脚本拦截和处理异常
    - **`BEFORE_ERROR`**：在任何错误第一次发生时调用，提供统一的错误处理钩子
    - 事件函数存在时，异常会被延迟抛出，允许脚本进行清理或恢复操作
    - 防止递归调用：在事件函数内部再次抛出错误时，会直接处理而不再次触发事件

### ![](../assets/images/IconSK.webp)函数调用参数安全性优化
!!! summary ""

    对原版函数调用体系的三层安全性缺陷进行系统性修复。

    - **ConvertArg 多余参数静默丢弃**：原版中参数过多时报错，Skia 版通过循环自然忽略（与 CALLSTR 系的运行时解析行为对齐）
    - **TRYCALL 安全网**：原版中 `ConvertArg` 失败时 `TRYCALL` 也会崩溃，Skia 版通过 `isTry` 标志跳转到 `JumpToEndCatch`（与 `CALLS_Instruction` 对齐）
    - **CALLSTR 运行时函数反射**：支持函数名+参数的运行时字符串解析，突破 `CALLFORM` 只能运行时构造函数名而无法指定参数的限制
    - 详细说明请参阅 [CALL](../Reference/CALL.zh.md)、[TRYCALL](../Reference/TRY.zh.md)、[CALLSTR](../Reference/CALLSTR.zh.md)

### ![](../assets/images/IconSK.webp)SkiaSharp 渲染引擎 { #skia-sharp }
!!! summary ""

    采用 SkiaSharp 替代 GDI+ 作为渲染引擎。提供跨平台支持、GPU 高速渲染。

    - **OpenGL 硬件加速**：自动检测 + 运行时降级
    - **CPU 软件渲染**：兼容性最高
    - **Auto 模式**：OpenGL 优先，失败时降级为 CPU
    - **SRGB 色彩空间修正**：修正 SkiaSharp 默认色彩空间导致的画面偏暗
    - **GDI 字体回退**：MS Gothic 等光栅字体保留 GDI 渲染路径
    - **智能字体回退**：衬线/无衬线分类回退，CJK 全域覆盖

### ![](../assets/images/IconSK.webp)延迟加载机制
!!! summary ""

    在函数调用时动态加载 ERB 文件的机制。避免启动时全量加载，仅按需加载所需函数。

    - 构建函数→文件的映射表
    - `CALL` 时若存在未加载的函数则加载对应 ERB 文件
    - 大幅缩短大型游戏的启动时间

### ![](../assets/images/IconSK.webp)全屏模式 (F11)
!!! summary ""

    按 F11 键切换全屏显示。覆盖开始菜单，鼠标移至顶部时自动显示工具栏。

### ![](../assets/images/IconEE.webp)![](../assets/images/IconSK.webp)音频处理 (SoundTouch)
!!! summary ""

    在 EE 的音频功能上集成 SoundTouch 库，支持节奏和音高变更。

    - 音频节奏变更（变速不变调）
    - 音频音高变更（变调不变速）
    - 实时转换播放

### ![](../assets/images/IconSK.webp)SELECTCASE 编译时跳转表优化
!!! summary ""

    编译时构建 `Dictionary<long/string/double, InstructionLine>` 跳转表，将 SELECTCASE 的 O(n) 线性扫描优化为 O(1) 哈希查找。

    - `SelectCaseJumpTable` 核心类：编译时跳转表构建
    - 支持整数、字符串、浮点数三种键类型
    - 支持逗号分隔的 CASE 常量列表（`CASE 1, 2, 3`）
    - 支持可折叠常量的纯函数表达式（如 `CASE ABS(3)`、`CASE TOINT("123")`）
    - 重复值处理采用 FIFO 策略：保留第一个出现的分枝，后续重复项触发 warning 后跳过
    - 不可优化的 CASE（含 TO/IS/非常量/副作用函数等）自动回退到线性扫描
    - 与现有 FALLTHROUGH 语义兼容

### ![](../assets/images/IconSK.webp)图像资源管理重构
!!! summary ""

    全面重新设计图像资源管理。

    - **SharedBitmapCache**：全局位图池（max 200）+ ConstImage 轻量外壳（仅记录 filepath，不持有 SKBitmap）
    - **AnimSpriteCache**：动画精灵 LRU 缓存（max 6），超出时 Evict 释放帧数据，再次访问时重新解码
    - **SpriteAnime 优化**：修复同一文件重复解码导致的内存爆炸
    - **懒加载索引**：CSV 预加载仅建立 SQLite :memory: 索引，图片数据 0 字节，首次渲染时才解码
    - **DIV 渲染优化**：命中测试 O(1) 定位 + Y 轴预过滤
    - **ToolTip 防遮挡**：屏幕边缘自动反转

---

## 常量·变量 { #variables }

### ![](../assets/images/IconSK.webp)浮点数（Float型）支持
!!! summary ""

    在 ERABASIC 中添加浮点数（Float型）支持。EM+EE 和原版 Emuera 仅支持整数。

    - `Float` 型变量：`RESULTF`、`LOCALF`、`ARGF` 等
    - `#DIMF` 浮点数变量声明
    - `#FUNCTIONF` 浮点数返回值函数
    - FORM 语法扩展：`{浮点数式}` 浮点数→字符串转换，`{式,位数}` 支持位数填充
    - 整数与浮点数的自动类型转换
    - 角色浮点数变量：CharacterData 中 dataFloat/dataFloatArray/dataFloatArray2D
    - 存档双精度支持
    - 浮点数类型转换函数：`TOSTRF`（浮点→字符串）、`TOFLOAT`（字符串→浮点）、`TOINT` 扩展（浮点→整数截断）

!!! warning "注意"

    Float 型仅在 Skia 版中可用。EM+EE 和原版 Emuera 的 ERB 脚本中会导致编译错误。

!!! info "API"

    | 函数 | 参数 | 返回值 | 说明 |
    |------|------|--------|------|
    | ![](../assets/images/IconSK.webp) `TOSTRF` | `float`{, `option`} | `string` | 浮点→字符串；`option` 为 C# 格式字符串（如 `"F2"`、`"E"`），省略时使用默认格式 |
    | ![](../assets/images/IconSK.webp) `TOFLOAT` | `string` | `float` | 字符串→浮点；解析失败返回 0.0 |
    | ![](../assets/images/IconSK.webp) `TOINT`（扩展） | `float` | `int` | 浮点→整数，直接截断（非四舍五入） |

### ![](../assets/images/IconSK.webp)VARIADIC 可变长参数
!!! summary ""

    在函数参数声明中支持 `VARIADIC ARG/ARGS/ARGF` 可变长参数。

!!! info "API"

    ``` { #language-erbapi }
    @FUNC_NAME(VARIADIC ARG:0)
    @FUNC_NAME(VARIADIC ARGS:0)
    @FUNC_NAME(VARIADIC ARGF:0)
    ```

    - `ARGLEN()` 内部函数获取可变长参数的数量
    - 支持 Int/String/Float 三种可变长参数类型
    - 支持 Int→Float 隐式转换

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @MY_FUNC(VARIADIC ARG:0)
    REPEAT ARGLEN()
        PRINTVL ARG:COUNT
    REND
    ```

### ![](../assets/images/IconSK.webp)引用参数（REF/OUT）
!!! summary ""

    扩展 EM+EE 的数组引用（`#DIM REF`），新增标量引用和 OUT 参数。

    - 标量引用：`#REF X` / `#REFS X` / `#REFF X` — 引用传递单个元素（EM+EE 仅支持数组整体引用）
    - OUT 参数：`#DIM OUT X` / `#DIMS OUT X` / `#DIMF OUT X` — 可省略的标量引用（省略时写入丢弃）

!!! warning "注意"

    详细说明请参阅[变量声明教程](../tutorial/variable-declaration.zh.md#ref)。

### ![](../assets/images/IconSK.webp)ExecutionContext 栈式函数上下文
!!! summary ""

    每次函数调用创建独立的 `ExecutionContext`，修复 LOCAL/ARG 系变量递归覆写污染。

    - 上游（emuera.em）通过 `VariableLocal` 字典按函数名（subKey）存储 ARG/LOCAL，不同函数拥有独立数组，但同一函数递归时 subKey 相同，所有层级共享同一份数组导致互相覆写
    - Skia 版通过 `ExecutionContext` 栈，每次调用拥有独立的 `LocalIntegers`/`LocalStrings`/`ArgIntegers`/`ArgStrings` 数组
    - `IntoFunction()` 时 PushContext，`Return()` 时 PopContext + Dispose
    - 在 `#DIM DYNAMIC` 变量的 ScopeIn/ScopeOut 管理之外，ExecutionContext 提供额外的隔离层
    - **关键区别**：`DYNAMIC` 只保护 `#DIM` 声明的私有变量，不保护 ARG/LOCAL 等内置变量。原版引擎中即使使用 `#DIM DYNAMIC`，递归时 ARG:0 仍会被覆盖。ExecutionContext 从根本上解决了此问题。详见 [变量声明教程 — 原版引擎的 ARG 递归陷阱](../tutorial/variable-declaration.zh.md#arg)

### ![](../assets/images/IconSK.webp)SparseArray\<T> 稀疏数组存储
!!! summary ""

    优化大下标数组的内存效率。使用 `SparseArray<T>` 使未使用索引不消耗内存。

### ![](../assets/images/IconSK.webp)SafeArithmetic 安全运算
!!! summary ""

    溢出保护。防止静态溢出，确保运算结果不超过类型范围。

!!! info "API"

    Skia 版中，普通算术运算符（`+`、`-`、`*`、一元 `-`）由 `SafeArithmetic` 提供溢出保护。溢出时输出警告，并将结果钳位到 `Long.MaxValue` 或 `Long.MinValue`。

    对于需要回环溢出（wrap-around）行为的场景（如哈希计算），提供了 UNCHECKED 系列式中函数：

    | 函数 | 对应运算 | 说明 |
    |:---|:---|:---|
    | `UNCHECKED_ADD(a, b)` | `a + b` | 加法回环溢出 |
    | `UNCHECKED_SUB(a, b)` | `a - b` | 减法回环溢出 |
    | `UNCHECKED_MUL(a, b)` | `a * b` | 乘法回环溢出 |
    | `UNCHECKED_NEG(a)` | `-a` | 取反回环溢出 |

    详情参阅 [UNCHECKED](../Reference/UNCHECKED.md)。

---

## 规格变更的命令·式中函数 { #changed-commands }

### ![](../assets/images/IconSK.webp)`CBGSETSPRITE` 的扩展参数
!!! summary ""

    CBGSETSPRITE 新增 4 个扩展参数。可指定 Sprite 的缩放、透明度和颜色矩阵。

!!! info "API"

    ``` { #language-erbapi }
    CBGSETSPRITE imgName, x, y, zdepth
    CBGSETSPRITE imgName, x, y, zdepth, width, height, opacity, colorMatrix
    ```

    **Skia版扩展参数**（第 5 个参数起）：

    - `width`, `height`（可省略）：Sprite 的绘制尺寸。不指定时为原始尺寸。
    - `opacity`（可省略，默认 `255`）：不透明度。0=完全透明，255=完全不透明。
    - `colorMatrix`（可省略）：`ref int[]` 型。4×5 颜色矩阵（20 个元素）。

### ![](../assets/images/IconSK.webp)`GCREATEFROMFILE` 的 `isRelative` 参数
!!! summary ""

    GCREATEFROMFILE 新增可省略的第三参数。设为 `1` 时，将 `filePath` 解释为从当前工作目录而非程序目录的相对路径。指定绝对路径时此参数被忽略。

!!! info "API"

    ``` { #language-erbapi }
    int GCREATEFROMFILE gID, filePath{, isRelative}
    ```

!!! warning "注意"

    EM+EE 的 GCREATEFROMFILE 也有第三参数，但含义不同。EM+EE 中表示"从 Emuera 的相对路径"，Skia 版中表示"从当前工作目录的相对路径"。

### ![](../assets/images/IconSK.webp)`SPRITECREATE` 的偏移·目标尺寸参数
!!! summary ""

    SPRITECREATE 新增 4 个扩展参数。可指定 Sprite 的绘制偏移和目标尺寸（缩放）。

!!! info "API"

    ``` { #language-erbapi }
    int SPRITECREATE spriteName, gID
    int SPRITECREATE spriteName, gID, x, y, width, height
    int SPRITECREATE spriteName, gID, x, y, width, height, posX, posY
    int SPRITECREATE spriteName, gID, x, y, width, height, posX, posY, destWidth, destHeight
    ```

    **Skia版扩展参数**（第 7 个参数起）：

    - `posX`, `posY`（可省略，默认 `0`）：Sprite 的绘制偏移。
    - `destWidth`, `destHeight`（可省略，默认与源矩形相同尺寸）：Sprite 的绘制目标尺寸。负值取绝对值处理。

### ![](../assets/images/IconSK.webp)`SETBGIMAGE` 参数解析修复
!!! summary ""

    `resourceName` 参数的解析方式从 `FORM_STR_ANY` 改为类型化字符串表达式。修复了变量参数被当作字面量字符串的 bug。详见 [BACKGROUND](../Reference/BACKGROUND.zh.md)。

### ![](../assets/images/IconSK.webp)`HTML_PRINT` 的 `display` 属性（DotNet 同步）
!!! summary ""

    `<img>` 标签新增 `display` 属性。`<div>` 标签的 `display` 属性扩展。

    - `<img display="relative">`（默认）：相对位置
    - `<img display="absolute-lefttop">`：左上角绝对位置
    - `<img display="absolute-leftbottom">`：左下角绝对位置
    - `<img xpos="N">`：绝对位置指定时的 X 坐标
    - `<div display="absolute-lefttop">` / `<div display="absolute-leftbottom">`：扩展支持

### ![](../assets/images/IconSK.webp)`FONTSTYLE` 的下划线·删除线（DotNet 同步）
!!! summary ""

    `FONTSTYLE` 命令的位掩码新增下划线和删除线。

    - Underline = `8`：下划线
    - Strikeout = `4`：删除线

!!! example "例"

    ``` { #language-erb }
    FONTSTYLE 8
    PRINTL 此文本带有下划线
    FONTSTYLE 4
    PRINTL 此文本带有删除线
    FONTSTYLE 12
    PRINTL 下划线+删除线
    ```

### ![](../assets/images/IconSK.webp)`HTML_PRINT` 的 `<font>` 标签 `size` 属性
!!! summary ""

    `<font>` 标签新增 `size` 属性，支持指定字体大小（像素单位）。

    - `size='24'` 或 `size='24px'`：以像素为单位指定字体大小
    - 嵌套 `<font>` 标签时继承外层字体大小设置
    - 详细说明请参阅 [HTML_PRINT](../Emuera/HTML_PRINT.zh.md#font)

### ![](../assets/images/IconSK.webp)图像翻转逻辑（DotNet 同步）
!!! summary ""

    在 `SPRITECREATE` 等命令中指定 `destRect.Width`/`Height` 为负值时自动翻转图像。

    - 水平翻转：`Width` 为负值
    - 垂直翻转：`Height` 为负值
    - 使用 `canvas.Scale(sx, sy)` 实现，支持带 `SKColorFilter` 的翻转渲染

### ![](../assets/images/IconSK.webp)`EXISTVAR` 的扩展
!!! summary ""

    `EXISTVAR` 新增第二参数。第二参数为非 0 时，除了确认变量名存在外，还确认存储单元是否存在。

### ![](../assets/images/IconSK.webp)`INITRAND`/`DUMPRAND` 与新随机数算法解耦
!!! summary ""

    移除 `UseNewRandom` 检查，`INITRAND`/`DUMPRAND` 始终操作 MTRandom 状态。

    - 原版中 `UseNewRandom=true` 时，`INITRAND`/`DUMPRAND` 输出警告并跳过
    - Skia 版直接调用 `InitRanddata()`/`DumpRanddata()`，不影响 `GetNextRand`
    - 旧脚本中使用 `DUMPRAND`/`RANDOMIZE`/`INITRAND` 的存档 hack 可继续使用

### ![](../assets/images/IconSK.webp)`SETANIMETIMER` 的命令化·`GETANIMETIMER` 的新增
!!! summary ""

    EM+EE 中 `SETANIMETIMER` 作为式中函数（`FunctionMethod`）实现，总是返回 `1`。Skia 版将其重构为命令（`AInstruction`），不再有返回值。同时新增了 `GETANIMETIMER` 式中函数，用于获取当前计时器值。

!!! info "API"

    ``` { #language-erbapi }
    SETANIMETIMER time
    int GETANIMETIMER
    ```

    | 项目 | EM+EE | Skia版 |
    |:---|:---|:---|
    | `SETANIMETIMER` | 式中函数（返回值: 总是`1`） | 命令（无返回值） |
    | `GETANIMETIMER` | ❌ 不存在 | ✅ 式中函数（返回当前计时器值） |

!!! warning "注意"

    EM+EE 中 `SETANIMETIMER` 可以作为式中函数调用，但 Skia 版仅支持命令语法。如果 EM+EE 的 ERB 中使用了 `RESULT = SETANIMETIMER(100)` 这样的写法，在 Skia 版中会编译报错。

### ![](../assets/images/Iconetc.webp)`BITMAP_CACHE_ENABLE` 的命令化
!!! summary ""

    EM+EE 中 `BITMAP_CACHE_ENABLE` 作为式中函数（`FunctionMethod`）实现。Skia 版将其重构为命令（`AInstruction`），不再有返回值。功能本身无变化。

!!! info "API"

    ``` { #language-erbapi }
    BITMAP_CACHE_ENABLE flag
    ```

    | 项目 | EM+EE | Skia版 |
    |:---|:---|:---|
    | `BITMAP_CACHE_ENABLE` | 式中函数（有返回值） | 命令（无返回值） |

!!! warning "注意"

    EM+EE 中 `BITMAP_CACHE_ENABLE` 可以作为式中函数调用，但 Skia 版仅支持命令语法。

### ![](../assets/images/Icondotnet.webp)`SQL_CONNECTION_OPEN` 的安全强化
!!! summary ""

    DotNet 版新增的便捷函数 `SQL_CONNECTION_OPEN` 已移植到 Skia 版，但修复了 DotNet 版的路径穿越漏洞和 PRAGMA 设置问题。

!!! info "API"

    ``` { #language-erbapi }
    SQL_CONNECTION_OPEN name
    ```

    | 项目 | DotNet版 | Skia版 |
    |:---|:---|:---|
    | PRAGMA设置 | `journal_mode = OFF; synchronous = OFF` | `journal_mode = WAL; synchronous = NORMAL` |
    | 崩溃安全性 | ❌ 数据库有损坏风险 | ✅ 崩溃时数据库安全 |
    | `name`路径验证 | ❌ 无（路径穿越漏洞） | ✅ 验证非法字符和`..` |
    | DB存储位置 | `sav/temp_db/` | `sav/sql/` |

!!! warning "注意"

    `name` 参数会进行非法字符和 `..` 验证，防止 ERB 脚本突破 `sav/sql/` 目录。DotNet 版中 `SQL_CONNECTION_OPEN "../../etc/exploit"` 这样的调用是可能的，但 Skia 版会抛出 `CodeEE`。

---

## 新增命令·式中函数 { #new-commands }

### ![](../assets/images/IconSK.webp)`SETIMAGELAYER` 系 — 独立图像图层
!!! summary ""

    与 CBG/SETBGIMAGE 独立的图像图层系统。支持 depth 顺序绘制、透明度、颜色矩阵和滚动跟随。

!!! info "API"

    ``` { #language-erbapi }
    SETIMAGELAYER spriteName, depth, x, y, width, height{, opacity, CM_ARRAY, followScroll}
    CLEARIMAGELAYER depth
    CLEARIMAGELAYER_ALL
    int EXISTSIMAGELAYER(depth)
    ```

    - `depth`：图层深度。值越小越靠前绘制
    - `opacity`（可省略，默认 `255`）：不透明度
    - `CM_ARRAY`（可省略）：`ref int[]` 型。4×5 颜色矩阵（20 个元素）
    - `followScroll`（可省略，默认 `0`）：`1` 时跟随文本滚动

!!! example "例"

    ``` { #language-erb }
    ; 设置图层
    SETIMAGELAYER "bg_sprite", 0, 100, 200, 300, 400, 200, CM, 1
    ; 确认图层是否存在
    IF EXISTSIMAGELAYER(0)
        CLEARIMAGELAYER 0
    ENDIF
    ; 清除全部图层
    CLEARIMAGELAYER_ALL
    ```

!!! warning "注意"

    SETIMAGELAYER 仅在 Skia 版中可用。与 CBG 系是完全独立的图层系统。

### ![](../assets/images/IconSK.webp)`CALLSTR` 系 — 动态函数调用
!!! summary ""

    调用存储在字符串变量中的函数名。可动态切换函数名。被调用函数执行 `RETURN` 时设置 `RESULT`，到达末尾时 `RESULT` 设为 `0`，与 `CALL` 行为一致。

!!! info "API"

    ``` { #language-erbapi }
    CALLSTR stringVariable
    JUMPSTR stringVariable
    TRYCALLSTR stringVariable
    TRYJUMPSTR stringVariable
    TRYCCALLSTR stringVariable
    TRYCJUMPSTR stringVariable
    ```

!!! example "例"

    ``` { #language-erb }
    #DIMS funcName = "MY_EVENT"
    CALLSTR funcName
    ; 带存在检查
    TRYCALLSTR funcName
    ```

### ![](../assets/images/IconSK.webp)`EVAL` / `EVALS` — 字符串表达式求值
!!! summary ""

    对作为字符串传入的 ERB 表达式进行求值并返回结果。

!!! info "API"

    ``` { #language-erbapi }
    int EVAL(string{, int})
    string EVALS(string{, string})
    ```

!!! example "例"

    ``` { #language-erb }
    PRINTVL EVAL("1 + 2 * 3")  ; → 7
    PRINTS EVALS("TOSTR(100)")  ; → "100"
    ```

### ![](../assets/images/IconSK.webp)`BITARRAY` 系 — 位数组操作
!!! summary ""

    将整数数组作为位数组操作的函数群。适合标志管理。

!!! info "API"

    ``` { #language-erbapi }
    int BITSET(ref int[], bitIndex{, value, elementSize})
    int BITGET(ref int[], bitIndex)
    int BITTOGGLE(ref int[], bitIndex)
    int BITINDEXOFFIRST(ref int[]{, findSet})
    ```

!!! example "例"

    ``` { #language-erb }
    #DIM flags, 10
    BITSET flags, 5       ; 设置第5位
    PRINTVL BITGET(flags, 5)  ; → 1
    BITTOGGLE flags, 5    ; 翻转第5位
    ```

### ![](../assets/images/IconSK.webp)MAP 扩展函数（6 个新增）
!!! summary ""

    在 EM+EE 的 MAP 函数（12 个）基础上扩展，共提供 18 个 MAP 操作函数。

!!! info "API"

    ``` { #language-erbapi }
    string MAP_VALUES(mapName)
    string MAP_TOSTRING(mapName{, pairSep, kvSep})
    int MAP_FROMSTRING(mapName, str{, pairSep, kvSep})
    int MAP_MERGE(destMapName, srcMapName)
    int MAP_REMOVEIF(mapName, operator, value)
    string MAP_FINDKEY(mapName, operator, value)
    ```

!!! example "例"

    ``` { #language-erb }
    MAP_CREATE "myMap"
    MAP_SET "myMap", "key1", "value1"
    MAP_SET "myMap", "key2", "value2"
    PRINTS MAP_VALUES("myMap")      ; → "value1,value2"
    PRINTS MAP_TOSTRING("myMap")    ; → "key1=value1,key2=value2"
    MAP_MERGE "myMap", "otherMap"
    ```

### ![](../assets/images/IconSK.webp)数学函数扩展（三角函数·取整处理）
!!! summary ""

    在 EM+EE 的数学函数基础上新增三角函数和取整函数。提供 Int 版和 Float 版的同名重载。

!!! info "API"

    ``` { #language-erbapi }
    float SIN(float) / int SIN(int)
    float COS(float) / int COS(int)
    float TAN(float) / int TAN(int)
    float ASIN(float) / int ASIN(int)
    float ACOS(float) / int ACOS(int)
    float ATAN(float) / int ATAN(int)
    int FLOOR(float) / float FLOOR(float)
    int CEIL(float) / float CEIL(float)
    int ROUND(float) / float ROUND(float)
    ```

### ![](../assets/images/IconSK.webp)`HTML_PRINTC` / `HTML_PRINTLC` — 右对齐/左对齐 HTML 输出
!!! summary ""

    以右对齐或左对齐方式输出 HTML 字符串。即使在非等宽字体下也能实现像素级对齐。

!!! info "API"

    ``` { #language-erbapi }
    HTML_PRINTC htmlString {, cellWidth}
    HTML_PRINTLC htmlString {, cellWidth}
    ```

### ![](../assets/images/IconSK.webp)`SPRITECREATEFROMFILE` — 从文件创建 Sprite
!!! summary ""

    从图像文件直接创建 Sprite。无需经过 Graphics 缓冲区（GCREATE）即可生成 Sprite。

!!! info "API"

    ``` { #language-erbapi }
    int SPRITECREATEFROMFILE spriteName, filePath{, x, y, width, height}
    ```

### ![](../assets/images/Icondotnet.webp)`G_POLYGON` 系 — 多边形绘制
!!! summary ""

    从 DotNet 版移植。进行多边形的描边和填充。仅 SkiaSharp 模式可用（GDI 模式下抛出 CodeEE）。

!!! info "API"

    ``` { #language-erbapi }
    G_POLYGON_DRAW gID
    G_POLYGON_FILL gID
    G_POLYGON_POINT_ADD gID, x, y
    G_POLYGON_POINT_CLEAR gID
    ```

### ![](../assets/images/IconSK.webp)`TEXT_BGC_ON` / `TEXT_BGC_OFF` — 文本背景色控制
!!! summary ""

    控制文本背景色的显示和隐藏。

!!! info "API"

    ``` { #language-erbapi }
    TEXT_BGC_ON
    TEXT_BGC_OFF
    ```

### ![](../assets/images/IconSK.webp)SQL 参数化查询
!!! summary ""

    用于防止 SQL 注入的参数化查询。

!!! info "API"

    ``` { #language-erbapi }
    string SQL_ESCAPE(str)
    SQL_P_EXECUTE_NONQUERY query, arg0, arg1, ...
    SQL_P_EXECUTE_READER query, arg0, arg1, ...
    long SQL_P_EXECUTE_SCALAR_LONG query, arg0, arg1, ...
    string SQL_P_EXECUTE_SCALAR_STRING query, arg0, arg1, ...
    float SQL_P_EXECUTE_SCALAR_FLOAT query, arg0, arg1, ...
    ```

    - `@0`, `@1`, ... 占位符实现安全查询执行

### ![](../assets/images/IconSK.webp)`STRICT_FONT_FALLBACK` — 严格字体回退
!!! summary ""

    启用严格字体回退模式。

---

## DotNet 同步功能 { #dotnet-sync }

### ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)GETCSVNOBY* 名称反查
!!! summary ""

    从 NAME/NICKNAME/CALLNAME/MASTERNAME 反查角色编号。O(1) 查找，未找到时返回 `-1`。

!!! info "API"

    ``` { #language-erbapi }
    int GETCSVNOBYNAME(str)
    int GETCSVNOBYNICKNAME(str)
    int GETCSVNOBYCALLNAME(str)
    int GETCSVNOBYMASTERNAME(str)
    ```

### ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)`MATCHALL` / `MATCHALLEX` 全量搜索
!!! summary ""

    数组全量搜索。从 DotNet 版的指令形式重新设计为表达式函数。不污染 RESULT。

!!! info "API"

    ``` { #language-erbapi }
    int MATCHALL(var, value{, beg, end{, outArr}})
    int MATCHALLEX("varName", value{, beg, end{, outArr}})
    ```

    - 返回值：匹配数
    - `outArr`（可省略）：存储匹配索引的数组（从 0 开始）

### ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)Preload 字节级缓存
!!! summary ""

    启动时将 ERB/CSV 文件预加载到内存。通过 `EraStreamReader.OpenOnCache()` 从缓存读取，避免磁盘 IO。

### ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)Stopwatch 高精度计时
!!! summary ""

    将 `SpriteAnime`/`SpriteAnimated` 的动画帧计时从 `DateTime.Now` 迁移到 `Stopwatch.GetTimestamp()`。消除系统时钟精度限制（~15ms），提升动画帧率稳定性。

---

## 稳定性修复 { #stability-fixes }

| 修复 | 说明 |
|:---|:---|
| TOINT 边界回退 | [TOINT 扩展](#variables)接受 Float 参数时的保护性回退：非法输入返回 0 而非崩溃 |
| METHOD_Instruction Float 分支 | [Float 类型](#variables)的配套修复：原版仅 Integer/String 两分支，Float 函数作命令调用时结果丢失；Skia 新增 Float→RESULTF 分支 |
| MainWindow null 检查 | 引擎未初始化时的操作不会崩溃 |
| PrintStringBuffer 空检查 | 空输出行不会越界访问 |
| SKPaint using 资源释放 | 补充遗漏的 `using var` |
| ColorMatrix GDI+→SkiaSharp 修正 | 列优先→行优先布局，平移分量\*255f |
| OpenGL 上下文丢失崩溃 | 双显卡/虚拟机环境下自动降级 |
| DIV 按钮命中测试回退 | [DIV 渲染优化](#skia-sharp)的边界保护：O(1) 定位以等高行为前提，多行内容破坏索引映射，回退到线性遍历确保点击仍可用 |
| SQL_CONNECTION_OPEN 安全修复 | [安全强化](#changed-commands)的稳定性维度：路径穿越阻断、连接泄露修复、PRAGMA OFF→WAL 防崩溃损坏 |
| opDictionary 运算符反查修复 | 上游 emuera.em 的 `opDictionary` 集合初始化器遗漏 `/`, `%`, `==` 三个条目，`ToOperatorString()` 返回空字符串导致错误消息不完整；运算符本身计算不受影响 |

---

## 功能比较 { #feature-comparison }

| 功能 | EM+EE | Skia版 | 备注 |
|:---|:---:|:---:|:---|
| 渲染 | GDI+ | SkiaSharp | 跨平台支持 |
| 浮点数 | ❌ | ✅ Float型 | RESULTF/LOCALF/ARGF |
| 动态函数调用 | ❌ | ✅ CALLSTR系 | 字符串变量指定函数名 |
| 字符串表达式求值 | ❌ | ✅ EVAL/EVALS | 运行时表达式求值 |
| 位数组 | ❌ | ✅ BITARRAY系 | 适合标志管理 |
| MAP函数 | 12个 | 18个 | 新增6个 |
| SQL | 基础 | XML联动+参数化 | 导入/导出/安全查询 |
| 数学函数 | 基础 | 三角函数+取整 | SIN/COS/TAN等 |
| 右对齐/左对齐HTML输出 | ❌ | ✅ HTML_PRINTC/LC | |
| 文件→Sprite | ❌ | ✅ SPRITECREATEFROMFILE | 无需GCREATE |
| 图像图层 | 仅CBG | ✅ SETIMAGELAYER系 | depth/透明度/颜色矩阵 |
| 渲染控制 | ❌ | ✅ ANIMETIMER/TEXT_DRAWING_MODE/SKIA_QUALITY | |
| 多边形绘制 | ❌ | ✅ G_POLYGON系 | 从DotNet版移植·仅SkiaSharp模式 |
| 文字装饰线 | ❌ | ✅ 下划线/删除线 | FONTSTYLE扩展 |
| 文本背景色控制 | ❌ | ✅ TEXT_BGC_ON/OFF | |
| 渲染后端 | ❌ | ✅ Auto/OpenGL/CPU | |
| 引用参数 | 仅数组 | ✅ 标量+OUT | #REF/#REFF/OUT新增 |
| CBGSETSPRITE扩展 | 基础 | ✅ 缩放/透明度/CM | |
| SPRITECREATE扩展 | 基础 | ✅ 偏移/目标尺寸 | |
| 图像翻转 | ❌ | ✅ 负尺寸翻转 | |
| 音频 | 仅播放 | SoundTouch | 节奏/音高变更 |
| 加载 | 全量 | 延迟+Preload | 面向大型游戏 |
| 函数参数 | 固定长度 | VARIADIC ARG/ARGS/ARGF | 可变长参数 |
| SELECTCASE | 线性扫描 | 跳转表优化 | O(n) → O(1) |
| CSV反查 | 无 | GETCSVNOBY* 4函数 | 源自 DotNet |
| 数组全量搜索 | MATCH 仅计数 | MATCHALL/MATCHALLEX | 源自 DotNet，重新设计 |
| 资源管理 | 无 | ✅ RM_系/LRU缓存 | |
| 全屏模式 | ❌ | ✅ F11 | 工具栏自动显示 |
| 错误处理事件 | ❌ | ✅ BEFORE_THROW/BEFORE_ERROR | 脚本级异常拦截 |

## 沿革与开发背景

本项目最初的目标是在 CRER 长期暂停开发的 lazyloading 功能变体 [CRER/emuera.em](https://gitlab.com/CRER/emuera.em) 中跟进 EM+EE 的更新。
- CRER 版本声称内核已更新至 EE47，但实际发现 EE46–47 两个版本的移植均不完整。原因之一是 EM+EE 从 EE46 起连续数个版本对命名空间和文件架构进行了大幅重构，使得变体跟进上游更新变得极为困难。

此后，开发者进行了若干功能优化、错误修正与功能新增。

随后，开发者着手合并 EM+EE 仓库中的 `ee+em/VVII-SkiaSharp` 分支。虽然两者都用上了 SkiaSharp 库，但渲染架构完全不同——这并非开发者不愿复用 VVII 的代码，而是因为 EM+EE 和本项目各自引入了大量渲染相关的新功能，使得架构性重构成为必然。
- 另外需要说明的是，Skia 的 SQL 系统是完全独立开发的。开发者是在看到使用 Emuera DotNet 引擎的 eraMS 使用了 SQL 系列函数后，才萌生了开发此系列函数的想法。开发时并未找到 DotNet 的源代码，仅检索到匿名版上的发布信息，误以为是 MGT 的自研引擎。直到编纂本文档时才发现 VVII 开发的 SkiaSharp 变体就是 DotNet 变体，其中已存在 SQL 系统的实现。

SkiaX 是以 Skia 变体的逻辑为内核开发的 Android 端 Xamarin 引擎，框架移植自 [Future-R/XEmuera](https://github.com/Future-R/XEmuera)。
- 但同样地，由于两者的内核引擎在渲染层面发生了根本性变化——最初的 XEmuera 内核仅支持 Emuera 本体，之后由 CKRainbow 和 Future-R 逐步适配了 EM+EE 内核的渲染逻辑——因此除了框架、页面导航和触屏交互逻辑两者一致外，渲染实现上几乎完全不同。
