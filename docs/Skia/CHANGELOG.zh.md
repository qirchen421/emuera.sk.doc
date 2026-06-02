# Changelog

All notable changes to Emuera-SKIA will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [6.1.0] — IsFunctionMethod 边界检查 + FindContextByLabel 快照枚举

### Fixed — A 类跨平台 Bug 修复（双端受益）

- **Process.State.cs** — `IsFunctionMethod` 属性 `ArgumentOutOfRangeException`
  - `functionList[currentMin]` 在 `functionList` 被部分清除后索引越界
  - 修复：添加 `if (currentMin >= functionList.Count) return false;` 边界检查
  - 触发场景：异常路径（BEFORE_ERROR/BEFORE_THROW 处理）中 `RollbackToState()` 修改 `functionList` 但未同步 `currentMin`

- **Process.State.cs** — `FindContextByLabel` 方法 `InvalidOperationException`
  - `foreach (var ctx in stack)` 枚举 `_contextStack` 期间栈被 `ClearFunctionList()` 等操作修改
  - 修复：改用快照枚举 `foreach (var ctx in stack.ToArray())`
  - 触发场景：LOCAL/ARG 变量带 subID 访问时，`Return()` 异常触发 BEFORE_ERROR → `ClearFunctionList()` 修改 `_contextStack`

## [6.0.0] — 调试窗口修复：LOCAL@FUNCNAME + 调用栈保留 + 监视稳定性

### Fixed

- **LOCAL@FUNCNAME 检测失效** — `GetArrayLocal()` 忽略 `subID`，始终返回 `CurrentContext` 的数组。现在按 `subID` 在上下文栈中查找匹配的 `ExecutionContext`
- **错误/THROW 后调试窗口调用栈被清空** — `handleException` 后不再调用 `ClearFunctionList()`，保留调用栈供调试窗口查看。新增 `ClearFunctionListPreserveTrace()` 供 BEFORE_ERROR/BEFORE_THROW 内部使用
- **调试窗口监视含 LOCAL 变量的表达式报错** — `saveCurrentState` 克隆 state 后 `CurrentContext` 为 null，LOCAL 变量走 FallbackArray 返回空数组。现在 `Clone()` 保留对原始 `_contextStack` 的引用，`CurrentContext` 在自身栈为空时自动回退
- **调试窗口表达式函数求值后 currentLine 残留** — `Process.GetValue` 的 finally 块在成功路径下 `PopContext()` 但未恢复 `currentLine`。现在 `CaptureCallState` 同时保存 `currentLine`，成功/失败路径均恢复
- **调试窗口一个监视报错后其他监视全部失败** — 上述 currentLine 残留导致后续监视在错误函数上下文中解析私有变量。修复 currentLine 恢复后错误传播链断裂

### Changed

- `DisableBeforeErrorThrow` 配置项不再必要（错误后调用栈已默认保留），但保留以维持向后兼容
- 新增 `ProcessState.ContextStackCount` 属性

***

## [5.2.0] — DisableBeforeErrorThrow 配置项：保留调试函数栈

### Added

- **DisableBeforeErrorThrow 配置项** — 新增配置选项，启用后跳过 BEFORE_ERROR/BEFORE_THROW 事件函数，直接抛出异常。解决这两个事件在异常处理时清空函数栈的问题，使调试窗口能在异常发生时正确显示调用栈和局部变量。默认关闭以保持向后兼容。

### Fixed

- 调试窗口在 THROW 或错误发生时无法监视函数参数的问题（需启用 DisableBeforeErrorThrow）

### Xamarin 移植注意

- Xamarin 端 `ConfigData.SetDefault()` 已同步添加对应 ConfigItem（参考 v0.60.2 PluginAvailableWarn NRE 修复）

***

## [5.1.0] — EEv56 上游对齐：PluginAvailableWarn + TOOLTIP 回退

### Changed — 上游对齐（emuera.em EEv56）

- **PluginAvailableWarn 配置项**（ee commit `0abdff8`）
  - 移除 `pluginsAware.txt` 安全检查机制（原机制：文件不存在时 throw ExeEE 阻止运行）
  - 新增 `ConfigCode.PluginAvailableWarn` 配置项（默认 true），检测到 Plugins 目录有 DLL 时打印警告
  - 新增 `GlobalStatic.ExistPlugin` 标志，`PluginManager.LoadPlugins()` 中根据 DLL 存在性设置
  - 新增 `Lang.PluginAvailable` 翻译字符串
  - 警告内容：「注意：外部插件功能已启用。因该功能引发的问题不在Emuera支持范围内」
  - WinForms ConfigDialog 新增 checkBox36 UI 控件（仅 WinForms 端，SkiaX 不使用 ConfigDialog）

- **TOOLTIP 默认设置回退**（ee commit `07e58ac`）
  - 当 ToolTip 三项设置均为默认值（OwnerDraw=false, InitialDelay=0, tooltip_duration=0）时，使用简单 `SetToolTip()` 而非异步 `Task.Run`
  - 修复默认配置下 TOOLTIP 显示延迟问题（异步路径的 InitialDelay 等待 + SynchronizationContext 调度开销）
  - 仅影响 Desktop 端（WinForms + SkiaX Desktop），Xamarin 端 TOOLTIP 实现不同无需修改

- **版本号更新**（ee commit `26a35dc`）
  - EEv55 → EEv56
  - Skia 版本号 v5 → v5.1

### Fixed

- **设置窗口在 TINPUT 定时器运行时无法交互** — `ShowConfigDialog()` 使用模态 `ShowDialog()`，但 TINPUTNF 的 `System.Timers.Timer` 仍在运行，超时后触发 `RunEmueraProgram` 占用主线程导致设置窗口无响应
  - `EmueraConsole.cs`：新增 `PauseTimer()` / `ResumeTimer()` 方法，暂停/恢复 genericTimer 并重置计时起点
  - `MainWindow.cs`：`ShowConfigDialog()` 中打开对话框前暂停定时器，关闭后恢复

- **系统页 checkBoxUseLazyLoading 缺少说明文本** — 控件在 Designer 中创建但未设置 Text、未绑定 ConfigCode
  - `ConfigDialog.cs`：添加 `checkBoxUseLazyLoading.Text`（`Lang.UI.ConfigDialog.System.UseLazyLoading`）
  - `ConfigDialog.cs`：SetConfig 中绑定 `ConfigCode.UseLazyLoading`，SaveConfig 中保存值

- **PluginAvailableWarn 英文描述拼写错误** — `"If available pllugins, Show warning"` → `"Plugin available warning"`
  - `ConfigData.cs`：修正拼写（`pllugins` → `plugins`），改为名词性短语与其他条目风格一致

- **Program.cs bgm.close 注释恢复** — ee 恢复了被注释掉的 `bgm.close()` / `sound[].close()`，本仓库已在 A 类修复中取消注释，无需额外操作

***

## [5.0.0] — T 前缀 NF 后缀指令 + 自由滚动 + HOVER_PAUSE

### Added

- **NF 后缀指令**：`TINPUTNF`, `TINPUTSNF`, `TONEINPUTNF`, `TONEINPUTSNF`
  - 与原版 TINPUT/TINPUTS/TONEINPUT/TONEINPUTS 参数和返回值相同，但不强制滚动到底部
  - NF = NoFocus，进入 `ConsoleState.WaitInputNoFocus` 状态，不调用 `ApplyTextBoxChanges()`
  - 仅 T 前缀指令提供 NF 变体（INPUT/INPUTS 全阻塞无轮询，NF 无意义）
  - 用 `TINPUTSNF` 替代 AWAIT+GETKEYTRIGGERED 轮询 hack

- **ConsoleState.WaitInputNoFocus = 22**：与 `WaitInput` 唯一区别是不调用 `ApplyTextBoxChanges()`
- **InputRequest.NoFocus**：布尔标志，T 前缀 NF 变体通过 `noFocus` 构造参数设置
- **EmueraConsole.WaitInputNoFocus()**：设置 `WaitInputNoFocus` 状态
- **EmueraConsole.IsWaitInputState**：替代 28 处 `state == ConsoleState.WaitInput` 判断

### Fixed

- **NF 滚动机制**：`nfUserScrolledBack` 标志记录用户上滚意图；`nfScrollOffsetFromBottom` 保存偏移量；`WaitInput` 入口强制回底；`RefreshStrings` 跳过 NF 上滚时的中间渲染
- **HOVER_PAUSE 悬停暂停**：鼠标悬停按钮时暂停动画，离开时恢复。4 个地图函数统一应用

***

## [4.3.1] — GETKEY 解耦：Latch 泄漏修复

### Fixed — AWAIT 循环首次迭代虚假鼠标点击

- **EmueraConsole.cs** — `Await()` 方法在 `DoEvents()` 前调用 `WinInput.ClearLatches()`
  - 根因：INPUTS/TINPUTS 模式下 `MouseDown` 事件设置 `_keyLatch[1]=1`，但内置输入系统不调用 `GETKEYTRIGGERED` 消费 latch
  - 从 INPUTS 切换到 AWAIT 循环时，残留 latch 被 `GETKEYTRIGGERED(1)` 消费，产生虚假点击
  - 现象：qol_MAP 地图首次进入时大概率立即退出（鼠标左键虚假触发）
  - 修复：每次 `Await()` 迭代开始前清除所有残留 latch，`DoEvents()` 产生的新 latch 由 `GETKEYTRIGGERED` 正常消费

- **WinInput.cs** — 新增 `ClearLatches()` 方法
  - 原子清除 `_keyLatch` 数组所有元素为 0
  - 防止跨输入模式（INPUTS → AWAIT）的 latch 泄漏

***

## [4.3.0] — PRINTC 像素制表重构：跨平台列对齐统一

### Fixed — PRINTFORMLC 中文环境列错位（回归修复）

- **EmueraConsole.Print.cs** — `CreateTypeCString` 中 `Config.Encode.GetByteCount(str)` 默认 UTF-8 编码下 CJK 字符=3字节，但 `Config.PrintCLength` 以半角字符为单位（CJK=2）
  - A24 修复将编码从 Shift-JIS 改为 Config.Encode 后引入回归
  - 修复：改用 `LangManager.GetStrlenLang(str)`，基于语言设置的 ANSI 编码（中文=GB2312/936，日文=Shift-JIS/932）计算字节长度

### Changed — PrintC/PrintButtonC 从字节制表重构为像素制表

- **EmueraConsole.Print.cs** — 删除 `CreateTypeCString` 方法，`PrintC`/`PrintButtonC` 改用像素制表路径
  - 旧方案：字节长度计算补空格字符 → while 循环删空格微调 → 受编码和字体 hinting 影响
  - 新方案：`StringMeasure.GetDisplayLength` 测量内容像素宽度 → `ConsoleSpacePart` 像素矩形填充差值
  - 与 `PrintHtmlC` 共享同一套像素制表理念，确保 WinForms + SkiaX 双端对齐一致
  - 删除 `printCWidthL`/`printCWidthL2`（仅旧 while 循环使用）
  - 根因分析：等宽字体 `N × charWidth ≠ stringWidth`（字体 hinting/kerning 截断），WinForms GDI 整串绘制误差被吸收，SkiaX 逐字符绘制误差累积为可见偏移

### 同步修改

- **SkiaX Desktop** (`Emuera/UI/Game/EmueraConsole.Print.cs`) — 同步重构
- **SkiaX Xamarin** (`Emuera.Xamarin/Platform/GameView/EmueraConsole.Print.cs`) — 同步重构

***

## [4.2.0] — FONTBOLD/FONTITALIC/FONTREGULAR 跨平台修复 + GETPLATFORM API

### Fixed — 移动端字体样式指令空操作导致 Bold 泄漏

- **Instraction.Child.cs** — `FONTBOLD`/`FONTITALIC`/`FONTREGULAR` 在非 Windows 平台是空操作（`if (!OperatingSystem.IsWindows()) return;`）
  - `FONTSTYLE` 命令无此限制，在移动端正常执行
  - 不对称导致：`FONTSTYLE 1` 设置 Bold 后 `FONTREGULAR` 无法恢复 → Bold 泄漏 → `GETSTYLE()` 返回 1 → `HTMLWRAP(STYLE_FLAG=-1)` 生成 `<b>` 标签 → 嵌套 → SkiaX HtmlManager 抛出"标签重复使用"错误
  - 修复：移除三个指令的 `!IsWindows()` 限制，`FontStyle` 枚举是纯内存操作，不依赖平台 API

### Added — ERB 平台检测 API

- **GETPLATFORM()** — 返回当前运行平台的整数编码
  - 0=Windows, 1=Android, 2=iOS, 3=macOS, 4=Linux, 5=Unknown
  - `CanRestructure = true`（纯函数，编译期可常量折叠）
  - ERB 脚本可通过 `IF GETPLATFORM() == 0` 等方式做平台条件分支

***

## [4.1.4] — GETKEY/GETKEYTRIGGERED 鼠标按键修复

### Fixed — 跨平台回流引入的回归 Bug

- **MainWindow.cs** — `GETKEYTRIGGERED(1/2/4)` 鼠标按键永远返回 0（A35）
  - V4.1.0 将 `WinInput.GetKeyState` 从 Win32 `user32.dll GetKeyState` 改为事件驱动的 `_keyState` 数组
  - `SetKeyPressed`/`SetKeyReleased` 只在 `richTextBox1_KeyDown`/`KeyUp` 中调用，鼠标按键不触发 `KeyDown` 事件
  - 导致 `GETKEYTRIGGERED(1)` (VK_LBUTTON)、`GETKEYTRIGGERED(2)` (VK_RBUTTON)、`GETKEYTRIGGERED(4)` (VK_MBUTTON) 永远返回 0
  - 修复：在 `mainPicBox_MouseDown`/`mainPicBox_MouseUp` 中添加 `WinInput.SetKeyPressed`/`SetKeyReleased` 映射鼠标按键到 VK_LBUTTON/VK_RBUTTON/VK_MBUTTON
  - 对应 commit `63afa0d`（跨平台音频架构重构）引入的回归

- **WinInput.cs / Creator.Method.cs** — 快速鼠标点击在 AWAIT 循环中丢失（A35 补充修复）
  - 根因：`MouseDown` + `MouseUp` 可能在同一个 `DoEvents()` 中被处理，`SetKeyReleased` 立即清除 `_keyState`，导致 `GETKEYTRIGGERED` 读到 0
  - V3 的 Win32 `GetKeyState` 直接读硬件状态，不受消息队列时序影响
  - 修复：添加 `_keyLatch` 锁存数组，`SetKeyPressed` 时置 1，`GETKEYTRIGGERED` 优先消费 latch（`ConsumeKeyLatch`），确保即使按键已释放也能检测到按下事件

***

## [4.1.3] — 移除废弃的 #FUNCTION ... 可变参数语法

### Removed — 废弃语法清理

- **UserDefinedFunctionDataArgType** — 移除 `__Variadic = 0x80` 枚举值
  - `#FUNCTION` 声明中的 `...` 可变参数语法与词法分析器的浮点数解析冲突，已废弃
  - 可变参数统一通过 `VARIADIC` 关键字在函数定义中声明（`@FUNC(VARIADIC ARG:0)`），`#FUNCTION` 声明不包含可变参数信息
- **UserDefinedFunction.cs** — 移除 `case '.'` 解析代码和 `state == 7` 处理
- **UserDefinedRefMethod.cs** — 移除 `__Variadic` 标志匹配（2 处）

***

## [4.1.2] — debug_log 持续写入修复

### Fixed — debug_log 不再持续写入

- **Process.cs / Process.ScriptProc.cs** — `DebugLogEnabled` 一旦被设为 `true`（异常或 THROW 触发）后永不重置，导致后续正常执行流程持续写日志
  - 根因：`catch` 块和 `THROW` 指令中 `DebugLogEnabled = true`，但所有 `return`/`break` 路径均未重置为 `false`
  - 影响：WinForms 中 THROW 后程序退出影响不大；Android app 返回游戏列表后进程继续，`DebugLogEnabled` 保持 `true`，下次进入游戏时 `IntoFunction`/`ReturnF`/`ClearFunctionList`/`GetValue` 等高频调用持续写日志，导致 debug_log.log 快速增长
  - 修复：在所有异常处理结束路径（`ClearFunctionList` 之后）和 THROW 的所有 `break` 路径前重置 `DebugLogEnabled = false`

***

## [4.1.1] — 音频 API Bug 修复（A33-A34 回流）

### Fixed — 内核 Bug 修复（A类，从 feature/xamarin 回流）

- **Creator.Method.cs** — ISPLAYINGSOUND 死代码 + 无限循环（A33）
  - `arguments[0] == null` 永假：在调用 `arguments[0].GetIntValue(exm)` 之后，`arguments[0]` 不可能为 null
  - for 循环条件 `channelId < GlobalStatic.Sound.Length` 应为 `i < GlobalStatic.Sound.Length`，使用 `channelId` 导致死循环
  - 修复：简化为直接检查指定通道是否正在播放

- **Creator.Method.cs** — SOUNDCONTROL 注释错误（A34）
  - 注释 `2=变速` 与实际 switch 逻辑不一致（action=2 是停止，action=3 才是变速）
  - 修正注释为 `0=暂停, 1=恢复, 2=停止, 3=变速`

***

## [4.1.0] — 跨平台音频架构重构 + 回流修复

### Changed — 音频架构重构（跨平台基础建设）

- **Sound.cs** — 新增音频播放基类
  - 提取虚方法：play/stop/pause/resume/close/isPlaying/setVolume/getVolume/setSpeed/getSpeed/GetTotalTime/GetCurrentTime/SetPreservePitch
  - 新增 `Sound.Factory` 静态工厂属性，宿主程序设置平台实现（WinForms→NAudioSound，Android→AndroidSound）
  - 内核代码通过 Factory 创建实例，消除平台直接依赖

- **Sound.NAudio.cs** — NAudioSound 重构为 Sound 子类
  - 原 `Sound` 类重命名为 `NAudioSound : Sound, ISampleProvider`
  - 所有方法加 `override`，移除重复 `Playing` 字段（使用基类）
  - `SoundMixer.PlaySound/StopSound` 参数类型改为 `NAudioSound`

- **GlobalStatic.cs** — 去除 NAudioSound 直接依赖
  - `Sound[]` 和 `Bgm` 初始化使用基类 `Sound`
  - `Reset()` 中 stop+close 后用 `Sound.Factory()` 重建实例

- **Program.cs** — WinForms 入口设置 Factory
  - `Sound.Factory = () => new NAudioSound()` + `GlobalStatic.Bgm = Sound.Factory()`

- **Creator.Method.cs / Instraction.Child.cs** — 所有 `new Sound()` 改为 `Sound.Factory()`
  - 确保运行时创建平台正确的实例

### Fixed — 内核 Bug 修复

- **EraStreamReader.cs** — try 块缺少 catch 导致 CS1524
  - 添加 `catch { return false; }`

## [4.0.0] — A类修复回流（第三轮）+ BINPUT 计数修复

### Fixed — 内核 Bug 修复（A类，从 EmueraFL 闭源引擎回溯）

> 以下修复源自 EmueraFL（Kom1 闭源引擎）commit 历史中的引擎 bug 描述，我们在源码中验证并修复。

- **GraphicsImage.cs** — GSetFont Dispose 缓存共享 SKFont（A27）
  - `FontFactory.GetFont` 返回缓存共享的 SKFont 对象，`GSetFont` 中 `font.Dispose()` 会使缓存中的引用失效
  - 多次 GSETFONT 且参数组合有重复时（如先 Regular 再 Bold 再切回 Regular），缓存返回已被 Dispose 的 SKFont → 崩溃
  - 修复：移除 `GSetFont` 中的 `font.Dispose()` 调用，FontFactory 统一管理 SKFont 生命周期
  - 对应 EmueraFL commit `1ee5d509`

- **GraphicsImage.cs** — 属性无 null 保护（A28）
  - `Fontname`/`Fontsize`/`Fnt`/`Pen`/`Brush` 属性直接访问字段，无 null 检查
  - GCREATE 后未 GSETFONT/GSETPEN/GSETBRUSH 就调用 GGETFONT/GGETPEN/GGETBRUSH 会 NRE
  - 修复：`Fontname` 返回 `font?.Typeface?.FamilyName ?? ""`，`Fontsize` 返回 `font != null ? (int)font.Size : 0`
  - 修复：新增 `PenColorArgb`/`PenWidth`/`BrushColorArgb` null-safe 属性，`GGETPEN`/`GGETPENWIDTH`/`GGETBRUSH` 改用这些属性，未设置时返回 0 而非 NRE
  - `Fnt`/`Pen`/`Brush` 保持返回原始字段（null 语义由内部调用方处理）
  - 对应 EmueraFL commit `4ce390b0`

### Fixed — BINPUT 按钮计数修复

- **Instraction.Child.cs** — BINPUT/BINPUTS/ONEBINPUT/ONEBINPUTS EscapedParts 计数早期退出
  - EscapedParts 计数循环中，找到第一个 div 按钮后 `goto loopend` 跳出，其余 div 按钮未计入 count
  - 修复：移除 `goto loopend`，遍历所有 div 的所有按钮，确保计数准确
  - 影响：非功能 Bug（count>0 即进 WaitInput 流程，匹配阶段无此问题），仅计数值更精确

### Changed — 版本号

- Skia 变体版本号从 3.x 升级到 **4.0.0**（A类修复累积 + BINPUT 修复）
- `InformationalVersion` 从 `Skia3` 更新为 `Skia4`

## [3.9.1] — A类修复回流（第二轮）+ 上游对齐 + EmueraFL bug 修复

### Fixed — 内核 Bug 修复（A类，从 feature/xamarin 回流）

> 以下修复源自 erafl-CHS 在 Xamarin 端运行时发现的跨平台 Bug，WinForms 版同样受益。

- **Creator.Method.cs** — ENUMFILES 路径修复（A23）
  - `EnumFilesMethod` 返回绝对路径，`LOADTEXT` 的 `GetValidPath` 拒绝绝对路径导致 `XML_GET` 解析失败
  - 使用 `Path.GetRelativePath(Program.ExeDir, files[i])` 将绝对路径转为相对路径
  - 对齐上游 ee+em a4d3665 + 1c495b5（上游先用了 `Path.GetRelativePath(dir, ...)` 后修正为 `Program.ExeDir`）

- **EmueraConsole.Print.cs** — PRINTFORMC 编码崩溃修复（A24）
  - 硬编码 `Shift-JIS` 无法编码中文等非日文字符，且无 `ReplacementFallback` 导致崩溃
  - 用 `Config.Encode.CodePage` + `EncoderFallback.ReplacementFallback` 替换，尊重 `DEFAULT ANSI ENCODING` 配置

- **HtmlManager.cs** — HTML 自闭合 div 标签支持（A25）
  - `<div ... />` 自闭合标签语法未被解析器支持，`/` 被当作 `OperatorCode.Div` 导致属性解析失败
  - 在 div 属性解析循环中检测 `</>` 并创建空 `ConsoleDivPart`
  - 根因：`XML_GET` 序列化空 div 元素按 XML 规范输出 `<div ... />`，但 HTML 解析器不支持（同一引擎的输出和输入不兼容）

- **Utils.cs** — `GetValidPath` 文档注释同步
  - 同步上游 ee+em a4d3665 的注释：标注 `GetValidPath` 返回绝对路径，调用方需自行 `GetRelativePath`

### Fixed — EmueraFL bug 修复（从闭源引擎 commit 提取）

> 以下修复源自 EmueraFL（Kom1 闭源引擎）commit 历史中的引擎 bug 描述，我们在源码中验证并修复。

- **Creator.Method.cs** — GSETFONT FontStyle 丢失（A26）
  - `GSETFONT` 从 `Pfc.Families` 找到字体时，`new SKFont(SKTypeface.FromFamilyName(...), fontsize)` 未传入 `fs` 参数
  - 导致 Bold/Italic/Underline/Strikeout 样式被忽略，始终为 Regular
  - 修复：改为 `FontFactory.GetFont(ff.Name, fs, fontsize)` 统一处理
  - 对应 EmueraFL commit `ae958303`

***

## [3.9.0] — A类修复回流 + 编译警告修复

### Fixed — 内核 Bug 修复（A类，从 feature/xamarin 回流）

> 以下修复源自 Xamarin 移植过程中发现的跨平台 Bug，WinForms 版同样受益。

- **Process.State.cs** — 4 项修复
  - `ShiftNextLine` null guard：`currentLine==null` 时直接 return，防止空栈 NRE（A1）
  - `ReturnF` 空栈 guard：`functionList.Count==0` 时安全退出（A2）
  - `CurrentLabel` null 检查：DebugMode 追踪日志中 `called.CurrentLabel` 可能为 null，添加 guard（A3）
  - BEFORE_ERROR/BEFORE_THROW 逻辑简化：合并两个 BEFORE_THROW 分支为单一条件判断，移除冗余 `GameProcProcess.DebugLog` 调用，逻辑等价（A4）

- **Process.LazyLoading.cs** — 2 项修复
  - `LoadLazyLoadingFolders`：同时替换 `\` 和 `/` 为 `Path.DirectorySeparatorChar`，不再依赖 `RuntimeInformation.IsOSPlatform`（A5）
  - `ErbPath`：从 `string.Create("ERB/" + a)` 简化为 `Program.ErbDir + a`，使用已有的跨平台路径属性（A6）

- **CharacterData.cs** — 数组 null 检查
  - `SaveToStreamBinary`：1D/2D 数组 `dataIntegerArray`/`dataStringArray`/`dataFloatArray` 在 `ToArray()`/`WriteWithKey` 前检查 null，防止空角色数据保存崩溃（A7）

- **VariableEvaluator.cs** — StainDefault null 兜底
  - `setDefaultStain`：`Config.StainDefault ?? new List<long>(new long[] { 0, 0, 2, 1, 8 })`，防止配置缺失时 NRE（A8）

- **Instraction.Child.cs** — 2 项修复
  - CALLPLUGIN null guard：`arg.CallFunc == null` 时设置 RESULT=0 并 return，防止插件未加载时 NRE（A11）
  - TIMES 溢出：`null` → `default(ScriptPosition)`，修复 `PrintWarning` 参数类型（A12）

- **Creator.Method.cs** — GetCurrentProcess try-catch
  - `GetMemoryUseMethod`/`ClearMemoryMethod`：`Process.GetCurrentProcess()` 包裹 try-catch，Android 上可能抛异常，返回 0L 降级（A16）

- **Config.cs** — 属性可见性改 internal
  - 17 个配置属性从 `private set` 改为 `internal set`，允许 Xamarin 项目覆盖配置值（A21）

- **OperatorMethod.cs** — 溢出警告参数修正
  - `null` → `default(ScriptPosition)`：4 处整数溢出警告的第2参数从 null 改为 default(ScriptPosition)，修复 PrintWarning 参数类型

### Fixed — 编译警告修复（1035→240，减少 77%）

- **CA2200** — `Instraction.Child.cs`：`throw e` → `throw`，保留原始异常堆栈
- **SYSLIB0014** — `Instraction.Child.cs`：`WebClient` → `HttpClient`，移除过时 API
- **CS4014** — `MainWindow.cs`：未 await 的 `ReloadPartialErb` 调用添加 `_ =` 丢弃标记
- **CA1069** — `VariableCode.cs`：枚举添加 `[Flags]` 属性和 `SuppressMessage`，`__COUNT_*__` 值重复是设计意图
- **CA1806** — `WinmmTimer.cs`：检查 `timeBeginPeriod`/`timeEndPeriod` 返回值
- **CA1825** — `VariableData.cs`/`CharacterData.cs`/`Creator.Method.cs`：零长度数组 `new T[0]` → `Array.Empty<T>()`
- **CA1834** — 7 个文件：单字符 `Append("x")` → `Append('x')`，使用 char 重载
- **CA1854** — 9 个文件：`ContainsKey` + 索引器 → `TryGetValue`，消除双重字典查找

***

## [3.8.3] — 上游对齐（BREAKBUTTON + 调试模式不关闭窗口）

### Added

- **BREAKBUTTON 指令**（源自 ee+em/master）
  - `BREAKBUTTON` — 强制中断当前按钮等待，立即刷新显示
  - 调用 `EmueraConsole.forceUpdateGeneration()` 实现
  - 可选参数，用于需要强制刷新 UI 的场景
- **调试模式下错误时不关闭窗口**（源自 ee+em/master，CRER 氏补丁）
  - `ConsoleState.Error` 状态下若 `Program.DebugMode` 为 true 则直接返回，不执行关闭流程

### Changed

- **.gitignore 合并优化**：融合 ee+em/master 的组织方式与 feature/xamarin 的通配符覆盖（`**/bin/*`、`**/obj/*`、`**/artifacts/**`、`*.user`、`*.suo`）

***

## [3.8.2] — 运算符反向映射修复

### Fixed

- **OperatorCode.opDictionary 丢失 `/`, `%`, `==` 三个条目**（上游缺陷修复）
  - 上游 emuera.em 的 `opDictionary` 集合初始化器中遗漏了 `Div`(`/`)、`Mod`(`%`)、`Equal`(`==`) 三个运算符的反向映射
  - 导致 `ToOperatorString()` 对这三个运算符返回空字符串，影响错误消息的可读性（如"无法将运算符  应用于整数类型"）
  - 运算符本身的计算不受影响（`/`、`%`、`==` 在表达式中正常工作），仅影响错误提示
  - XEmuera-1 使用 `.Add()` 静态构造函数初始化，条目完整，不受此缺陷影响

***

## [3.8.1] — SELECTCASE 跳转表增强 + TOSTRF 可选参数

### Fixed

- **SELECTCASE 跳转表现在支持可折叠常量的表达式函数**
  - `TryBuild()` 中当 `LeftTerm.IsConst` 为 `false` 时尝试调用 `Restructure(null)` 折叠表达式
  - 纯函数（如 `ABS(3)`、`SIN(0)`、`TOINT("123")` 等 `CanRestructure=true` 的函数）可被折叠为 `SingleTerm`，参与跳转表 O(1) 查找
  - 有副作用或依赖运行时状态的函数（如 `RAND()`、`RESULT`、`GETTIME()` 等 `CanRestructure=false`）不受影响，自动回退到线性扫描
  - try-catch 包裹 `Restructure` 调用，折叠失败时安全回退到线性扫描
- **SELECTCASE 跳转表重复值处理策略（FIFO）**
  - 重复的 CASE 值保留第一个出现的分枝，后续重复项触发 warning 后跳过
  - 此行为与线性扫描的 fallthrough 语义一致，且不影响跳转表的确定性
- **TOSTRF 第二参数现在可省略**
  - 修复了 `argumentTypeArray` 导致强制校验参数个数、第二参数无法省略的问题
  - 改用 `argumentTypeArrayEx` + `OmitStart = 1`，允许 `TOSTRF(value)` 单参数调用
  - 扩展 `ArgType` 枚举增加 `Float` 类型，完善浮点参数类型支持

## [3.8.0] — BEFORE_THROW/BEFORE_ERROR 事件 + TEXT_BGC_ON/TEXT_BGC_OFF + STRICT_FONT_FALLBACK

### Added

- **BEFORE_THROW / BEFORE_ERROR 事件函数**
  - `BEFORE_THROW`：在 `THROW` 指令抛出异常前调用，允许脚本拦截和处理异常
  - `BEFORE_ERROR`：在任何错误第一次发生时调用，提供错误处理的钩子
  - 若事件函数存在，异常会被延迟抛出，允许脚本进行清理或恢复操作
- **TEXT_BGC_ON / TEXT_BGC_OFF 文本背景色控制**（SK 专属）
  - `TEXT_BGC_ON R, G, B, Alpha%`：为后续所有行设置整行背景色（Alpha 为 0～100 不透明度）
  - `TEXT_BGC_OFF`：清除背景色，恢复透明
  - 背景以行全宽 × 行高的矩形绘制，仅当行内存在实际文本时才绘制
- **STRICT_FONT_FALLBACK 严格字体回退模式**（SK 专属）
  - `STRICT_FONT_FALLBACK value`：设为 1 启用严格模式，不存在字形的字符显示为 □（tofu）而非回退字体
  - 设为 0 恢复默认回退行为
  
## [3.7.0] — SQL_CONNECTION_OPEN 增强

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
  
## [3.6.0] — G_POLYGON 多边形绘制 + 文字装饰线

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

## [3.5.0] — Stopwatch 高精度计时 + 图像翻转 + HTML DisplayMode

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

## [3.4.0] — GETCSVNOBY* 名字反查 + MATCHALL 全量搜索 + Preload 优化

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

## [3.3.0] — SELECTCASE 编译期跳转表优化

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

## [3.2.0] — SETIMAGELAYER 图层渲染 + CBGSETSPRITE 升级

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
- **SETBGIMAGE 参数解析方式修复**：`FORM_STR_ANY` → `SP_SETBGIMAGE`，修复变量参数被当作字面量字符串的 bug（depth/opacity 自上游已有）
- **ClientBackGroundImage 缺少 width/height**：添加字段，OnPaint 中使用缩放尺寸
- **FollowScroll 使用绝对 scrollY 导致图片在视口外**：存储 initialScrollY，改用滚动增量
- **SETIMAGELAYER 坐标系与 CBGSETSPRITE 不一致**：改为左下原点坐标系

***

## [3.1.0] — 可变参数函数 + 元素级引用 + #REF/#REFS + OUT 参数

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
- **`#REF`** **/** **`#REFS`** **元素引用关键字**（Phase 2.3）
  - `#REF X` 声明整数元素引用（Dimension=0）
  - `#REFS S` 声明字符串元素引用（Dimension=0）
  - 与 `#DIM REF` 数组引用彻底分离，消除语义歧义
  - `ConvertArg` 三维分支匹配（Dimension=0 / Dimension>0 / OUT）
- **OUT 参数（Optional Output Parameters）**（Phase 2.4）
  - `#DIM OUT X` / `#DIMS OUT X` 声明可省略输出参数
  - `NullRefTerm` 黑洞变量：省略时所有读写被静默忽略
  - OUT 与 `#REF` 同构（元素引用 Dimension=0），与 `#DIM REF` 不同构
  - `refDestDimension` 字段区分元素引用和数组引用传递方式
  - 支持 OUT + 可变参数组合、嵌套调用、CALLFORM/TRYCALL

### Fixed

- **ARGLEN() 编译期常量折叠为 0**：`CanRestructure = false` 阻止优化器误折叠
- **ElementRefInfo 上下文依赖导致引用写回失败**：创建时捕获实际数组快照
- **ReferenceToken ScopeIn/ScopeOut 未保存引用状态**：引入 `_scopeState` 列表保存/恢复
- **SetTransporter 数组 REF 参数传递错误**：`refDestDimension` 区分元素引用 vs 数组引用
- **CreatePrivateVariable 缺少 IsOut=true 设置**：OUT 参数省略时无法识别
- **MatchType 缺少 allowElementRef 参数**：OUT 参数引用匹配失败
- **MatchType 阻止 OUT 参数链式传递**：增加 `!rother.IsOut` 豁免
- **OUT 参数被错误创建为一维数组引用**：强制 `Dimension=0` 和 `Lengths=[1]`
- **IntoFunction Float 可变参数类型截断**：`(long)arg.GetFloatValue()` → `arg.GetFloatValue()`

***

## [3.0.0] — Float 类型系统全量重构 + OpenGL 降级

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

## [2.0.0] — 类型系统基础 + 安全运算

### Added

- **ExecutionContext 栈式函数上下文**：修复 LOCAL/ARG 同函数递归覆写污染
- **SparseArray<T> 稀疏数组存储**：大幅节省大下标数组内存
- **SafeArithmetic 安全运算**：溢出保护，不再静默溢出
- **EraType 枚举 + VariableDescriptor**：类型系统基础设施
- **#DIMF 语法解析**：浮点变量声明 + 浮点字面量
- **存档 Float 段**：EraSaveDataType Float/FloatArray/FloatArray2D/FloatArray3D

### Fixed

- **ConvertArg() 多余参数静默丢弃**：移除 TooManyFuncArgs 报错，增加 TRY 安全网
- **TIMES\_Instruction 溢出保护**
- **INITRAND/DUMPRAND 与新随机数算法解耦**

***

## [1.3.0] — 精灵索引悬置修复

### Fixed

- **工具栏返回标题后精灵索引悬置**：导致立绘透明

***

## [1.2.0] — SpriteG 快照模式修复

### Fixed

- **SpriteG 快照模式**：导致合成精灵渲染为空白

***

## [1.1.0] — HTML_PRNTC + SQL 参数化 + MAP API

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

## [1.0.0] — SkiaSharp 渲染引擎发布

### Added

- **SkiaSharp 渲染引擎**：全面替代 GDI+，支持 GPU 加速
- **OpenGL 硬件加速**：自动检测 + 运行时降级
- **SRGB 颜色空间修复**：修复 SkiaSharp 默认颜色空间导致画面偏暗
- **GDI 字体回退**：MS Gothic 等光栅字体保留 GDI 渲染路径
- **智能字体回退**：衬线/无衬线分类回退，CJK 全覆盖
- **渲染控制 API**：SET\_TEXT\_DRAWING\_MODE / GET\_TEXT\_DRAWING\_MODE / SET\_SKIA\_QUALITY / GET\_SKIA\_QUALITY
- **HTML\_PRINT font 渲染属性扩展**：render/edging/hinting
- **全屏功能 (F11)**：覆盖开始菜单，鼠标移到顶部自动显示工具栏
- **SPRITECREATEFROMFILE**：从图像文件直接创建 Sprite，无需 GCREATE 中转
- **BitArray 功能**
- **DIV 渲染性能优化**：命中测试 O(1) 定位 + Y轴预剔除
- **ToolTip 防遮挡**：屏幕边缘自动翻转
- **图像资源管理重构**：SharedBitmapCache 全局位图池 + ConstImage 轻量外壳
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

## [0.3.0] — EVAL/EVALS + CALLSTR 系列 + SQL 全套

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

## [0.2.0] — BGMControl 修复

### Fixed

- **BGMControl 功能异常**：参数重载失效
- **变调标志存在即变调**：逻辑修正

***

## [0.1.0] — SoundTouch 变速库 + 音频控制指令

### Added

- **SoundTouch 音频变速库**：支持变速不变调/变速变调
- **音频控制指令**：GETSOUNDORBGMINFO / ISPLAYINGSOUND / SOUNDCONTROL / ISPLAYINGBGM / BGMCONTROL
- **SOUNDCONTROL 停止通道音频**
- **EXISTVAR 扩展**：支持存储单元存在性检查（第二参数）

### Fixed

- **EXISTFUNCTION**：支持 Lazyloading 包含且未运行的函数检测
- **.als 文件**：序号 10 后的字符串指针读取修复
- **SPRITECREATE**：支持 8/10 参数写法，与 CSV 能力对齐
- **GCREATEFROMFILE isRelative 参数**：第三参数非 0 时从当前工作目录解析相对路径

***
