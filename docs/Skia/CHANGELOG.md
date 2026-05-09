# Changelog

All notable changes to Emuera-SKIA will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

***

## [3.7.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-10

### Added

- **SQL_CONNECTION_OPEN 便利函数**（源自 DotNet）
  - `SQL_CONNECTION_OPEN(string name)` — 自动在 `sav/sql/` 目录下创建/打开 SQLite 数据库连接
  - 若同名连接已存在则自动关闭重建

### Fixed

- **SQL_CONNECTION_OPEN 数据库崩溃损坏风险**：`PRAGMA journal_mode=OFF; synchronous=OFF` 改为 `WAL; NORMAL`，兼顾写入性能与崩溃安全
- **SQL_CONNECTION_OPEN 路径穿越漏洞**：`name` 参数增加非法字符和 `..` 校验，阻止 ERB 脚本穿透 `sav/sql/` 目录
- **SQL_CONNECTION_OPEN 连接句柄泄露**：`conn.Open()` 后 PRAGMA 执行失败时未 Dispose，已加 try-catch 防护
- **SQL_CONNECTION_OPEN 路径拼接不规范**：`$"{dir}{name}.db"` 改为 `Path.Combine(dir, $"{name}.db")`

### Changed

- **SQL_CONNECTION_OPEN PRAGMA 策略调整**：DotNet 上游使用 `journal_mode=OFF; synchronous=OFF` 追求极致写入速度但存在崩溃损坏风险；Skia 变体改为 `WAL; NORMAL`，写入性能接近 OFF 模式且崩溃时数据库不会损坏
- **SQL 泛型重构**
  - `SqlManager` 内部 `ExecuteScalarLong`/`ExecuteScalarString`/`ExecuteScalarFloat` 合并为泛型 `ExecuteScalar<T>`
  - 保留所有 ERB 层 API 不变（`SQL_EXECUTE_SCALAR_LONG`/`STRING`/`FLOAT`）
  
## [3.6.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-10

### Added

- **G_POLYGON 多边形指令集**（源自 DotNet）
  - `G_POLYGON_DRAW(int ID)` — 用当前画笔描边多边形
  - `G_POLYGON_FILL(int ID)` — 用当前画刷填充多边形
  - `G_POLYGON_POINT_ADD(int ID, int x, int y)` — 添加多边形顶点
  - `G_POLYGON_POINT_CLEAR(int ID)` — 清除所有顶点
  - `GraphicsImage` 新增 `_points` 字段及 `GDrawPolygon`/`GFillPolygon`/`GDrawPolygonAddPoint`/`GDrawPolygonClearPoint` 方法
  - 仅 Skia 模式可用（GDI 模式抛出 CodeEE）
- **文字装饰线渲染**（源自 DotNet）
  - `StringStyle` 新增 `HasUnderline` / `HasStrikeout` 属性，在 `FontStyle` setter 中自动同步
  - `ConsoleStyledString.DrawTo` 在 Skia 路径中绘制下划线和删除线
  - 使用 `SKFont.Metrics.UnderlinePosition` / `StrikeoutPosition` 定位装饰线
  - 支持 `FONTSTYLE` 指令的 Underline(8) / Strikeout(4) 位掩码


***

## [3.5.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-09

### Added

- **Stopwatch 高精度计时重构**（源自 DotNet）
  - `SpriteAnime` / `SpriteAnimated` 动画帧计时从 `DateTime.Now` 迁移到 `Stopwatch.GetTimestamp()` + `Stopwatch.GetElapsedTime()`
  - 消除 `DateTime.Now` 的系统时钟精度限制（~15ms），提升动画帧率稳定性
  - 暂停/恢复逻辑同步迁移：`PauseAnimation()` / `ResumeAnimation()` 使用 timestamp 差值计算
- **图像翻转逻辑**（源自 DotNet）
  - `ASpriteSingle.GraphicsDraw` 支持 `destRect.Width`/`Height` 为负值时自动翻转
  - 使用 `canvas.Scale(sx, sy)` 实现水平/垂直翻转，同时支持带 `SKColorFilter` 的翻转渲染
- **HTML DisplayMode 属性移植**（源自 DotNet）
  - `<img>` 标签新增 `display` 属性：`relative`（默认）/ `absolute-lefttop` / `absolute-leftbottom`
  - `<img>` 标签新增 `xpos` 属性：绝对定位时的 X 坐标
  - `<div>` 标签 `display` 属性扩展支持 `absolute-lefttop` / `absolute-leftbottom`
  - `ConsoleImagePart.DrawTo` 实现三种定位模式：相对定位、左上角绝对定位、左下角绝对定位
  - `ConsoleDivPart.DrawTo` 同步支持三种 DisplayMode

***

## [3.4.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-09

### Added

- **GETCSVNOBY* 名字反查**（源自 DotNet）
  - `GETCSVNOBYNAME(str)` / `GETCSVNOBYNICKNAME(str)` / `GETCSVNOBYCALLNAME(str)` / `GETCSVNOBYMASTERNAME(str)`
  - 通过 NAME/NICKNAME/CALLNAME/MASTERNAME 反查角色模板编号，O(1) 查找
  - 未找到返回 -1
- **MATCHALL / MATCHALLEX 全量搜索**（源自 DotNet，重新设计）
  - `MATCHALL(var, value[, beg, end[, outArr]])` — 变量引用形式
  - `MATCHALLEX("varName", value[, beg, end[, outArr]])` — 字符串变量名形式
  - 返回匹配计数，第五参数输出索引数组（从 0 开始）
  - 比 DotNet 指令形式更灵活：不污染 RESULT，可在表达式中使用
- **Preload 字节级优化**（源自 DotNet）
  - 启动时将 ERB/CSV 文件一次性预加载到内存
  - `EraStreamReader.OpenOnCache()` 从内存读取而非磁盘 IO
  - `ConstantData.cs` 中 CSV 加载改用 `OpenOnCache()` 充分利用缓存
  - .NET 8 内存流方案，解决编码兼容性与 BOM 剥离问题

### Fixed

- **METHOD_Instruction Float 分支缺失**：Float 表达式函数（TOFLOAT 等 8 个）用作命令时抛出异常，已添加 `EraType.Float` 分支写入 `RESULTF`
- **TOINT 非法输入崩溃**：增加 try-catch 拦截非法字符串转换，无法解析时返回 0（源自 DotNet）
- **MainWindow console null 崩溃**：ShowConfigDialog 和剪贴板处理器加 null 检查（源自 DotNet）
- **PrintStringBuffer 空数组越界**：Flush() 中 ButtonsToDisplayLines 返回空数组时跳过 ret[^1] 访问（源自 DotNet）
- **SKPaint 资源泄漏**：Creator.Method.cs 补全 `using var`，防止非托管内存泄漏（源自 DotNet）

### Changed

- **教程交叉引用**：`line-types.zh.md`、`index.zh.md`、`CALLF.zh.md` 添加命令/表达式语法交叉引用

***

## [3.3.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-07

### Added

- **SELECTCASE 编译期跳转表优化**（Phase 4.2+4.6）
  - `SelectCaseJumpTable` 核心类：编译期构建 `Dictionary<long/string/double, InstructionLine>` 跳转表
  - `TryBuild()` 编译期构建：遍历 IfCaseList，检查每个 CaseExpression 是否 `CaseType == Normal && LeftTerm.IsConst`
  - 不可优化时（含 TO/IS/非常量/重复键）自动返回 null，fallback 到线性扫描
  - `Lookup()` 运行时 O(1) 查找，未命中时返回 CASEELSE 或 ENDSELECT 行
  - `AExpression.IsConst` 属性：`SingleTerm` override 为 true，复合表达式和变量引用默认 false
  - `InstructionLine.SelectCaseJumpTable` 字段存储编译期跳转表
  - `SELECTCASE_Instruction` 快速路径：有跳转表时直接 Lookup + JumpTo，跳过线性扫描

***

## [3.2.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-07

### Added

- **SETIMAGELAYER 图层渲染指令集**（Phase 5.11）
  - `SETIMAGELAYER spriteName, depth, x, y, width, height, opacity, CM_ARRAY, followScroll` — 在独立图层上渲染 Sprite
  - `EXISTSIMAGELAYER(depth)` — 检测指定深度图层是否存在
  - `CLEARIMAGELAYER depth` — 清除指定深度图层
  - `CLEARIMAGELAYER_ALL` — 清除所有图层
  - `ImageLayerManager` 核心类：按 depth 排序的 Dictionary 存储，每帧直接绘制
  - `ColorMatrixHelper` 工具类：DRY 重构颜色矩阵解析（5×5 二维/三维整数数组 → SkiaSharp float\[]）
  - 视口裁剪：离窗图层跳过绘制，节省 GPU 资源
  - 动图离窗暂停：`IsOffScreen` 标记触发 `PauseAnimation()`/`ResumeAnimation()`
  - 跟随滚动：`FollowScroll` + `InitialScrollY` 存储滚动增量
  - 左下原点坐标系：与 CBGSETSPRITE 一致
- **CBGSETSPRITE 升级**：从 4 参数升级为 8 参数 `(imgName, x, y, zdepth, width, height, opacity, CM)`，第 2 个参数起全部可省略

### Fixed

- **ColorMatrix 解析代码重复**：提取到 `ColorMatrixHelper`，ConsoleImagePart 和 Instraction.Child 共用
- **ArgumentBuilder 手动 LexicalAnalyzer 解析导致参数丢失**：改用 popTerms 标准方法
- **SETBGIMAGE 只解析单参数**：新增 SpSetBgImageArgument，完整参数解析
- **ClientBackGroundImage 缺少 width/height**：添加字段，OnPaint 中使用缩放尺寸
- **FollowScroll 使用绝对 scrollY 导致图片在视口外**：存储 initialScrollY，改用滚动增量
- **SETIMAGELAYER 坐标系与 CBGSETSPRITE 不一致**：改为左下原点坐标系

***

## [3.1.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-06

### Added

- **可变参数函数（Variadic Arguments）**（Phase 2.1）
  - `VARIADIC ARG/ARGS/ARGF` 关键字声明可变参数
  - `ARGLEN()` 内置函数返回可变参数数量
  - `VariadicArgTerm` 表达式类封装剩余实参
  - 支持 Int/String/Float 三种可变参数类型，Int→Float 隐式转换
  - 私有变量做固定参数时，ARG 数组仅包含可变参数
- **元素级引用（Element-Level Reference）**（Phase 2.2）
  - `ElementRefInfo` 结构体传输"目标变量 + 固定索引"引用
  - `ReferenceToken` 子类（Scalar/1D/2D/3D）使用 `ElementRefInfo` 代理读写
  - `ScopeIn`/`ScopeOut` 保存/恢复引用状态（`_scopeState` 列表）
  - `SetTransporter` 三路分发：数组引用 / 元素级引用 / NullRef
- **`#REF`** **/** **`#REFS`** **标量引用关键字**（Phase 2.3）
  - `#REF X` 声明整数标量引用（Dimension=0）
  - `#REFS S` 声明字符串标量引用（Dimension=0）
  - 与 `#DIM REF` 数组引用彻底分离，消除语义歧义
  - `ConvertArg` 三维分支匹配（Dimension=0 / Dimension>0 / OUT）
- **OUT 参数（Optional Output Parameters）**（Phase 2.4）
  - `#DIM OUT X` / `#DIMS OUT X` 声明可省略输出参数
  - `NullRefTerm` 黑洞变量：省略时所有读写被静默忽略
  - OUT 与 `#REF` 同构（标量引用 Dimension=0），与 `#DIM REF` 不同构
  - `refDestDimension` 字段区分标量引用和数组引用传递方式
  - 支持 OUT + 可变参数组合、嵌套调用、CALLFORM/TRYCALL

### Fixed

- **ARGLEN() 编译期常量折叠为 0**：`CanRestructure = false` 阻止优化器误折叠
- **ElementRefInfo 上下文依赖导致引用写回失败**：创建时捕获实际数组快照
- **ReferenceToken ScopeIn/ScopeOut 未保存引用状态**：引入 `_scopeState` 列表保存/恢复
- **SetTransporter 数组 REF 参数传递错误**：`refDestDimension` 区分标量引用 vs 数组引用
- **CreatePrivateVariable 缺少 IsOut=true 设置**：OUT 参数省略时无法识别
- **MatchType 缺少 allowElementRef 参数**：OUT 参数引用匹配失败
- **MatchType 阻止 OUT 参数链式传递**：增加 `!rother.IsOut` 豁免
- **OUT 参数被错误创建为一维数组引用**：强制 `Dimension=0` 和 `Lengths=[1]`
- **IntoFunction Float 可变参数类型截断**：`(long)arg.GetFloatValue()` → `arg.GetFloatValue()`

***

## [3.0.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-05

### Added

- **Float 类型系统全量重构完成**（B.3 全部子任务）
  - `#DIMF` 浮点变量声明、`LOCALF`/`ARGF`/`RESULTF` 内置浮点变量
  - `#FUNCTIONF` 浮点返回函数、Float 四则/比较/一元/三元运算
  - 同名重载数学函数（SIN/COS/SQRT 等）、数组函数 Float 分支
  - `TOFLOAT`/`TOSTRF` 类型转换、存档双精度支持、DT/SQL Float 操作
- **三角函数与端数处理函数**：SIN/COS/TAN/ASIN/ACOS/ATAN/FLOOR/CEIL/ROUND（Int+Float 同名重载）
- **角色浮点变量支持**：CharacterData 中 dataFloat/dataFloatArray/dataFloatArray2D
- **RenderingBackend 渲染后端配置**：Auto/OpenGL/CPU 三模式，运行时无缝降级
- **TEXT\_BGC\_ON / TEXT\_BGC\_OFF**：文本背景色开关指令
- **上游同步**：CurrentCulture→InvariantCulture、TIMES 文化依赖修复、VARS2D 修复、FORCE\_QUIT 修复、ServerGC 启用

### Fixed

- **OpenGL 上下文丢失崩溃**：双显卡/虚拟机环境自动降级到 CPU 渲染
- **ColorMatrix GDI+→SkiaSharp 迁移修复**：列优先→行优先布局、平移分量 \*255f、GDrawG GDI+ 残留清理
- **合并冲突黑屏**：修复 mr-6 分支合并后 PaintSurface 事件隐藏
- **Float 存档数据丢失**：LoadVariableBinary Float 段被错误截断为 long

### Changed

- `typeof(long)`/`typeof(string)` 硬编码 → `EraType` 枚举 + `VariableDescriptor` 查询（746 处替换）

***

## [2.0.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-04

### Added

- **ExecutionContext 栈式函数上下文**：修复 LOCAL/ARG 同函数递归覆写污染
- **SparseArray\<T> 稀疏数组存储**：大幅节省大下标数组内存
- **SafeArithmetic 安全运算**：溢出保护，不再静默溢出
- **EraType 枚举 + VariableDescriptor**：类型系统基础设施
- **#DIMF 语法解析**：浮点变量声明 + 浮点字面量
- **存档 Float 段**：EraSaveDataType Float/FloatArray/FloatArray2D/FloatArray3D

### Fixed

- **ConvertArg() 多余参数静默丢弃**：移除 TooManyFuncArgs 报错，增加 TRY 安全网
- **TIMES\_Instruction 溢出保护**
- **INITRAND/DUMPRAND 与新随机数算法解耦**

***

## [1.3.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-05-02

### Fixed

- **工具栏返回标题后精灵索引悬置**：导致立绘透明

***

## [1.2.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-04-28

### Fixed

- **SpriteG 快照模式**：导致合成精灵渲染为空白

***

## [1.1.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-04-26 \~ 2026-04-27

### Added

- **HTML\_PRINTC / HTML\_PRINTLC**：基于像素的 HTML 制表命令，非等宽字体精确对齐
- **HTML\_PRINT font 标签 size 属性**
- **SQL 参数化查询**：`SQL_ESCAPE`、`SQL_P_EXECUTE_*` 系列，`@0,@1...` 占位符防注入
- **MAP 全套方法 API**：MAP\_VALUES/MAP\_MERGE/MAP\_REMOVEIF/MAP\_FINDKEY/MAP\_TOSTRING/MAP\_FROMSTRING

### Fixed

- **彩色文字渲染偏细**：修复 SETCOLOR 后文字偏细偏虚
- **SKIA 下 GDRAW 管线实现方式**
- **HTML 新增标签关闭行为**

***

## [1.0.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-04-22 \~ 2026-04-25

### Added

- **SkiaSharp 渲染引擎**：全面替代 GDI+，支持 GPU 加速
- **OpenGL 硬件加速**：自动检测 + 运行时降级
- **SRGB 颜色空间修复**：修复 SkiaSharp 默认颜色空间导致画面偏暗
- **GDI 字体回退**：MS Gothic 等光栅字体保留 GDI 渲染路径
- **智能字体回退**：衬线/无衬线分类回退，CJK 全覆盖
- **渲染控制 API**：SET\_TEXT\_DRAWING\_MODE / GET\_TEXT\_DRAWING\_MODE / SET\_SKIA\_QUALITY / GET\_SKIA\_QUALITY
- **HTML\_PRINT font 渲染属性扩展**：render/edging/hinting
- **全屏功能 (F11)**：覆盖开始菜单，鼠标移到顶部自动显示工具栏
- **BitArray 功能**
- **DIV 渲染性能优化**：命中测试 O(1) 定位 + Y轴预剔除
- **ToolTip 防遮挡**：屏幕边缘自动翻转
- **图像资源管理重构**：SharedBitmapCache 全局位图池 + ConstImage 轻量外壳
- **SPRITEANIMEFRAME**：动画精灵帧数查询
- **STRICT\_FONT\_FALLBACK**：严格字体回退模式
- **SETANIMETIMER**：动画帧间隔控制
- **BITMAP\_CACHE\_ENABLE**：位图缓存开关

### Fixed

- **FontFactory 字体缓存内存泄漏**：游戏重置时正确释放
- **RasterFont 检查方法**
- **MS Gothic 字体与过去产生差异**
- **SkiaSharp 文本渲染排版不对称**
- **SpriteAnime 动画渲染卡顿**：同一文件重复解码导致内存爆炸
- **Word Wrap 导致富文本字体回退丢失**
- **DIV 内图片按钮点击失效**（高度超过一行）
- **MoveMouse 剪枝错误**
- **符号渲染空格与重叠**
- **字体回收 Bug**
- **Skia 渲染质量用户设置不生效**
- **PrintPlainwithSingleLine 在 Plugin API 不执行渲染**
- **数组扩大到一千万位**

***

## [0.3.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-04-13 \~ 2026-04-18

### Added

- **EVAL / EVALS**：运行时动态求值表达式
- **CALLSTR / JUMPSTR / TRYCALLSTR / TRYJUMPSTR / TRYCCALLSTR / TRYCJUMPSTR**：动态函数调度
- **SQL 数据库操作全套**：SQL\_CONNECT/DISCONNECT/EXECUTE\_NONQUERY/EXECUTE\_READER/READER\_*/EXECUTE\_SCALAR\_*/IMPORT\_MAP\_XML/IMPORT\_DT\_XML/EXPORT\_MAP\_XML/EXPORT\_DT\_XML/IMPORT\_XML\_CUSTOM
- **资源管理系统 (ResourceManager)**：RM\_RESOURCECHECK\_LOAD / RM\_RELEASE\_ALL / RM\_RESOURCE\_EXIST，LRU 缓存淘汰
- **SqlManager 流式 XML 解析**：XmlReader/XmlWriter，支持 GB 级数据导入导出

### Fixed

- **XML\_ADDNODE 多节点匹配**：修复只插入最后一次的 Bug
- **字符串比较逻辑**：GreaterEqualStrStr / LessEqualStrStr 错误逻辑
- **SqlManager.CloseAll() 未集成到全局重置**：GlobalStatic.Reset() 中添加调用
- **遗漏的本地化条目**

***

## [0.2.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-03-09

### Fixed

- **BGMControl 功能异常**：参数重载失效
- **变调标志存在即变调**：逻辑修正

***

## [0.1.0](https://gitgud.io/minus010001/emuera_lazyloading_selfmodified_version) — 2026-02-16 \~ 2026-02-19

### Added

- **SoundTouch 音频变速库**：支持变速不变调/变速变调
- **音频控制指令**：GETSOUNDORBGMINFO / ISPLAYINGSOUND / SOUNDCONTROL / ISPLAYINGBGM / BGMCONTROL
- **SOUNDCONTROL 停止通道音频**
- **EXISTVAR 扩展**：支持存储单元存在性检查（第二参数）

### Fixed

- **EXISTFUNCTION**：支持 Lazyloading 包含且未运行的函数检测
- **.als 文件**：序号 10 后的字符串指针读取修复
- **SPRITECREATE**：支持 8/10 参数写法，与 CSV 能力对齐

***

