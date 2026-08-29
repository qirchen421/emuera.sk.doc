# Changelog

All notable changes to Emuera-SKIA will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [12.1.0] — Multilingual Encoding Compatibility + CHKDATA Save Version Info

### Added

- **CHKDATA returns save-data version info**: added the `Version` field to `EraDataResult`; `CHKDATA` now assigns the save's version number to `RESULT:1` (`0` on errors such as a missing file, the actual version value when the version differs or the data is valid). Files: `EraDataStream.cs` / `VariableEvaluator.cs` / `Creator.Method.cs`

### Fixed

- **Multilingual encoding compatibility**: `LangManager` byte-length calculation now uses per-character round-trip fallback (chars that cannot round-trip in the active language encoding are counted via the Japanese 932 encoding), fixing length/substring corruption in `GetStrlenLang`/`GetUFTIndex`/`GetSubStringLang` for CJK text under non-Japanese encodings (e.g., GBK)

### Changed

- **Version signature**: `Skiav12` → `Skiav12.1` (`1824+v24+EMv18+EEv56+Skiav12.1`)

***

## [12.0.0] — Debug Window: Variable Watch "Lock" and Direct Assignment

### Added

- **New `Lock` column in the Variable Watch**: checking it pins the variable's value — the value is automatically written back every 200 ms at safe moments, preventing scripts from changing it. Non-assignable targets (expressions, functions, constants, read-only variables) cannot be locked
- **Direct assignment from the `Value` cell**: click to edit and confirm to assign, with the same semantics as the debug console
- Lock state is session-only (not persisted)

### Fixed

- **Debug window UI layout**: fixed the bottom buttons overlapping the panel on high-DPI displays and clipped button text

### Changed

- Variable watch columns rearranged to `Lock / Target / Value`; default window width increased
- **Version signature**: `Skiav11.2` → `Skiav12` (`1824+v24+EMv18+EEv56+Skiav12`)

***

## [11.1.0] — ToolTip Async Callback NRE Defense

### Fixed — NullReference crash in OnPaint ToolTip async callback

- **`context.Post` callback hardening** (`EmueraConsole.cs` OnPaint ToolTip block):
  - `SynchronizationContext.Current` null check: skip ToolTip dispatch when `context` is `null`, avoiding the `context.Post` NullReference crash
  - Window lifecycle check: the callback first checks `window == null || window.IsDisposed || window.MainPicBox == null || window.MainPicBox.IsDisposed` and bails out during disposal/control-rebuild gaps
  - `Cursor.Current` null check: after the mouse leaves the window, `Cursor.Current` is `null` and the old code accessed `Cursor.Current.Size.Height` directly, throwing `NullReferenceException`; now fetched safely with a 32px fallback height
  - **`Screen.FromPoint` argument fix**: the old code passed `mousePos` (window-local coordinates), but `Screen.FromPoint` requires screen absolute coordinates; changed to `absoluteP` (`Cursor.Position`), fixing ToolTip positioning on multi-monitor/scaled setups
- **Affected scenario**: during the tooltip's delayed display (`Task.Delay(InitialDelay)`), moving the mouse away, closing the window, or triggering a repaint frequently crashed; dense button scenes (e.g. banquet events) reproduced it most often

### Changed

- **Version signature**: `Skiav11` → `Skiav11.1` (`1824+v24+EMv18+EEv56+Skiav11.1`)

***

## [11.0.0] — GC Config Revert + Gated Memory Diagnostics

### Changed — GC config revert

- **ServerGC → WorkstationGC**: reverted `<ServerGarbageCollection>true</ServerGarbageCollection>` introduced by the [3.0.0] upstream sync (commit `4432ee9d`)
  - Desktop GUI apps (single window, single-thread interaction) fit WorkstationGC: lower memory usage, timely return to the OS
  - Text games are insensitive to a single GC pause; WorkstationGC collects more often but with shorter pauses

### Added — memory diagnostic tool (gated)

- **MemoryDiagnostic tool gated behind config**: new setting `MemoryDiagnosticEnabled` (default `false`); while off, the engine does not write `memory_diagnostic.log`
  - Temporary diagnostic utility: on shutdown it writes a memory snapshot (process memory / GC heap breakdown / compiled scripts / VariableData / FontFactory caches / SQLite connections, etc.) to the game root directory
  - To diagnose memory issues later, add `MEMORYDIAGNOSTICLOG:YES` to `emuera.config`

### Added — diagnostic section extensions

- **GC heap breakdown**: HeapSizeBytes / FragmentedBytes / Gen0-2 heap sizes / LOH size from `GC.GetGCMemoryInfo()`
- **Thread statistics**: total thread count and Running / Wait distribution
- **FontFactory caches**: entry counts of fontDic / fallbackTypefaceCache / fallbackTypefaceCodepointCache / gdiFontDic
- **Display-line cache**: displayLineList current line count / MaxLog

***

## [10.1.0] — Input Macro Switch

### Added

- **DISABLE_INPUT_MACRO function**: Disables macro parsing for all input (textbox + SEQUENCEINPUT)
  - After calling, input is passed literally as a single segment, without parsing `(...)` repeat macros
  - No `\n` splitting and no `\e` MesSkip processing
  - Return value is always `0`
  - Desktop version implemented in `Emuera/UI/Game/EmueraConsole.cs`; SkiaX Xamarin version implemented in `Emuera.Xamarin/Platform/GameView/EmueraConsole.cs`
- **ENABLE_INPUT_MACRO function**: Restores input macro parsing (default behavior)
  - Matches the original PressEnterKey behavior
  - Return value is always `0`

### Changed

- **Version signature**: `Skiav10` → `Skiav10.1` (`1824+v24+EMv18+EEv56+Skiav10.1`)

***

## [10.0.0] — SEQUENCEINPUT Function

### Added

- **SEQUENCEINPUT function**: Takes a string argument and automatically submits it as user input at the next input wait
  - After calling `SEQUENCEINPUT("input content")`, when the engine next enters WaitInput state, it calls `PressEnterKey` to process the queued string. Same behavior as textbox input and pressing Enter
  - `\n` in the string splits it into multiple segments, each segment is sent to a separate ERB WaitInput
  - `\e` in the string is recognized as MesSkip (skip waiting)
  - Return value is always `0`
  - Works with both `WaitInput` and `WaitInputNoFocus` (NF suffix commands)
  - Desktop version implemented in `Emuera/UI/Game/EmueraConsole.cs`; SkiaX Xamarin version implemented in `Emuera.Xamarin/Platform/GameView/EmueraConsole.cs`

***

## [9.1.0] — STRFORMCHECK Function + HTML_PRINT font valign Extension

### Added

- **STRFORMCHECK function**: Takes a string argument, checks if it can be expanded as STRFORM; returns 1 if expandable, 0 if not
  - Parse failure (syntax error) returns 0
  - Runtime evaluation failure (non-existent variable etc.) returns 0
  - Shares the same parser as STRFORM, ensuring semantic consistency
- **HTML_PRINT `<font>` valign attribute**: Adds `valign` attribute (`top`/`middle`/`bottom`) to the `<font>` tag, controlling vertical alignment of text with different font sizes on the same line
  - `valign='top'` (default): text top-aligned, consistent with existing behavior
  - `valign='middle'`: text vertically centered
  - `valign='bottom'`: text bottom-aligned
  - Invalid values throw `CanNotInterpretAttribute` error
  - Nested `<font>` tags inherit outer `valign` setting
  - Desktop and SkiaX Xamarin implementations synchronized

***

## [9.0.0] — F11 Fullscreen Proportional Scaling

### Added

- **F11 Fullscreen Proportional Scaling**: When F11 is pressed, game window content (fonts, images, separators, HTML shape, ImageLayer, CBG background images, and all other visible elements) is scaled to fullscreen proportionally based on the configured width, adapting to high-resolution displays
  - Core mechanism: Applies a single `canvas.Scale()` transform at the `SKCanvas` drawing entry point, all subsequent drawing operations are automatically scaled up proportionally
  - Does not modify `Config.FontSize`, `Config.WindowX`, `Config.DrawableWidth` — engine continues laying out at logical dimensions
  - Does not reflow display lines — avoids HTML round-trip bugs
  - Mouse coordinates are automatically converted to logical coordinates
  - Input box (WinForms RichTextBox) font and height are scaled separately
  - Supports multi-monitor (`Screen.FromControl` gets current screen)
  - Introduces `RenderWidth`/`RenderHeight` properties representing logical render dimensions, `EmueraConsole.OnPaint` and related methods use these properties instead of `MainPicBox.Width`/`Height`
  - Zero impact on Android (does not compile desktop `MainWindow.cs` and `EmueraConsole.cs`)

***

## [8.2.0] — Debug Window Custom Function Evaluation Fix

### Engine Layer Fixes

- **Debug window custom expression functions returning incorrect values (WaitInput state)**：`console.IsRunning` returns `False` during WaitInput, causing `runScriptProc` to exit immediately without executing the function body
  - Added `forceRunning` flag in `GetValue`：bypasses `console.IsRunning` check during debug evaluation
  - Clear residual `MethodReturnValue`：fixes previous `#FUNCTIONS` function return value persisting, causing unrelated HTML strings to be returned
  - Fixed `NullReferenceException`：`currentLine` becoming null after `ReturnF` caused crash in `ShiftNextLine`
  - Fixed private variable state leak：`GetValue` failure path not calling `ScopeOut`
  - Fixed `currentLine` residual：`GetValue` success path now restores `currentLine`
  - State corruption prevention：`loadPrevState` not called on `updateVarWatch` exception（try-finally fix）

***

## [8.1.0] — Float Type Error Message Fix + CanReturnFloat Dynamic Return Type

### Engine-Level Fixes

- **Float type error messages misreporting as "string type"**: Original engine used Integer/String binary error messages, Float type was misreported as "string type" or "integer type"
  - `#FUNCTION` returning Float reported `ReturnfStrInIntFunc` ("string type specified") → Distinguish Float→`ReturnfFloatInIntFunc` / String→`ReturnfStrInIntFunc`
  - `#FUNCTIONS` returning Float similarly → Added `ReturnfFloatInStrFunc`
  - Function argument Float→Integer conversion reported `CanNotConvertStrToInt` ("cannot convert from string") → Reports `CanNotConvertFloatToInt`
  - Function argument type mismatch used `String? Str : Int` binary check → Ternary: `String? Str : Float? Float : Int` (2 locations)
  - Ref argument type mismatch missing Float branch → Added `Float? FloatVar : Var` and `Float? FloatArray : Array`
  - Assigning String to Float variable reported `SetIntToStr` ("assigning integer to non-integer") → Reports `SetStrToFloat` ("assigning string to float")
  - Assigning Float to Integer variable reported `SetIntToStr` → Distinguish Float→`SetFloatToInt` / String→`SetStrToInt`

### Engine-Level Changes

- **CanReturnFloat dynamic return type mechanism**: Functions like POWER/SQRT/ABS dynamically return Integer or Float based on argument types
  - Compile-time `GetEraType()` checks if any argument is Float type to determine return type
  - Runtime `GetReturnValue()` dispatches actual return value via `HasFloatArg`
  - `FunctionMethod.CanReturnFloat` property marks dynamic return functions
  - `FunctionMethodTerm.GetEraType()` overrides base class method
  - Affected functions: POWER, ABS, SQRT, CBRT, LOG, EXP, SIGN, LIMIT, MAX, MIN, SIN, COS, TAN, ASIN, ACOS, ATAN, FLOOR, CEIL, ROUND
- **Version signature**: `Skiav8` → `Skiav8.1` (`1824+v24+EMv18+EEv56+Skiav8.1`)

***

## [8.0.0] — ERD System ALS Alias Support

### Engine-Level Additions

- **User-defined variable ALS alias support**: Variables declared with `#DIM` can now define enumeration aliases via `.als` files
  - Before: Only system variables (ABL/TALENT/CFLAG etc.) CSV files supported `.als` alias files
  - Now: User-defined variable (e.g. `BUFF`) CSV files also support corresponding `.als` files
  - Usage: Place `CSV/BUFF.als` alongside `CSV/BUFF.csv`, format is the same as system variable ALS files (`index,alias`)
  - Example: `1,气力` in `BUFF.als` makes `BUFF:2:气力` equivalent to `BUFF:2:1`
  - Multi-dimensional variable support: 2D/3D variable ALS file naming is consistent with ERD (e.g. `BUFF@1.als`, `BUFF@2.als`)
  - Aliases do not override existing same-name definitions in CSV (CSV takes priority)
  - New `loadAliasesForUserDefined()` method injects aliases into `erdNameToIntDics` dictionary
  - 3-platform sync: LazyLoading Desktop + SkiaX Desktop + SkiaX Xamarin

***

## [7.3.2] — Xamarin HtmlManager Color Sentinel Sync

### Engine-Level Fixes

- **Xamarin HtmlManager color sentinel not synced**: Xamarin has an independent `HtmlManager.cs` copy, and the v7.3.1 color sentinel fix was not synced to this copy
  - Symptom: `<div>` without `color` attribute shows pure white background on Android (`Color.FromArgb(-1)` = `0xFFFFFFFF`)
  - Fix: All color sentinels in Xamarin `HtmlManager.cs` changed from `-1` to `int.MinValue`, guards changed from `>= 0`/`< 0` to `!= int.MinValue`/`== int.MinValue`
  - Synced fix to `stringToColorInt32`: RGB mode auto-appends `0xFF` alpha, ARGB mode uses `ToInt64` to prevent overflow

***

## [7.3.1] — Color Sentinel Fix + SETIMAGELAYERL GetLineNo Fix + Border Default Color

### Engine-Level Fixes

- **Color sentinel `-1` conflicts with `0xFFFFFFFF`**: `stringToColorInt32("#FFFFFF")` returns `0xFFFFFFFF` (signed int = -1), misidentified as "color not set" by guards
  - All color sentinels changed from `-1` to `int.MinValue`
  - `ConsoleDivPart` uses `color != int.MinValue` instead of `color != -1`
  - Synced across 3 platforms: LazyLoading Desktop + SkiaX Desktop + SkiaX Xamarin
- **SETIMAGELAYERL line anchor error**: Used `LineCount` (logical line) instead of `GetLineNo` (display line index), causing Y offset
  - Fix: Changed to `exm.Console.GetLineNo`
- **HTML div border not drawn without bcolor**: WinForms original uses `Config.ForeColor` when `colors == null`
  - Fix: When `box.border != null && box.color == null`, `borderColors` defaults to `Config.ForeColor`
- **`stringToColorInt32` ARGB branch `ToInt32` overflow**: 9+ digit hex overflows int32
  - Fix: ≤6 uses `ToInt32` (RGB), >6 uses `ToInt64` (ARGB)

### Documentation Updates

- SETIMAGELAYERL anchor semantics corrected from "current line (LINECOUNT)" to "current display line (GetLineNo)"
- HTML syntax docs: added ARGB color format (`#AARRGGBB`)
- HTML syntax docs: added `bcolor` defaults to text color when omitted

***

## [7.3.0] — SETIMAGELAYERL Line-Relative Positioning (xpos/ypos) + ARGB_TO_HTML_COLOR Utility Function

### Engine-Level Changes

- **SETIMAGELAYERL parameter redesign**: API simplified to `SETIMAGELAYERL spriteName, depth, xpos, ypos, width, height, opacity, CM_ARRAY`
  - Removed `lineNo` parameter, always anchors to current line (LINECOUNT), consistent with HTML `<img>` parameter conventions
  - `xpos`: X offset relative to line position (matches HTML `<img>` `xpos` attribute semantics, automatically includes `ShapePositionShift`)
  - `ypos`: Y offset relative to line top-edge (matches HTML `<img>` `ypos` attribute semantics)
  - When `xpos=0, ypos=0`, rendering position matches `<img>` on the same line exactly
  - Clear distinction between SETIMAGELAYER and SETIMAGELAYERL positioning models: absolute coordinates vs line-relative offsets

***

## [7.2.0] — Unified Depth Rendering Pipeline + SETIMAGELAYER Multi-Sprite + SETIMAGELAYERL + ARGB Transparency + div height auto

### Engine-Level Fixes

- **Unified depth rendering pipeline**: SETIMAGELAYER, CBG, and escapedParts (including div) now share the same depth sorting system
  - Fixed the issue where div was always rendered above ImageLayer — previously ImageLayer was drawn in bulk at Step 3, div at Step 4, with two independent depth systems
  - Added `DrawLayersAtDepth(canvas, viewportW, viewportH, scrollY, int? depth)` and `GetDepths()` methods to `ImageLayerManager`
  - `EmueraConsole.OnPaint` merges three depth sources (edepth + cbgList.zdepth + idepths) into a unified descending list, drawing ImageLayer → CBG/div/text at each depth
- **SETIMAGELAYER multi-sprite support**: Changed `ImageLayerManager._layers` from `Dictionary<long, ImageLayer>` to `List<ImageLayer>`. Sprites with the same depth are rendered in insertion order and are no longer overwritten
- **SETIMAGELAYERL new command**: Automatically sets `followScroll=1` and converts Y coordinate via `GETLINEY`. The y parameter is a line number (LINECOUNT), rendering at the same position as HTML img
- **SETIMAGELAYER empty parameter support**: Parameters 3–9 use default values when empty. Only spriteName/depth are required
- **HTML div color ARGB support**: `stringToColorInt32` now supports ARGB transparency. 6 digits or fewer are parsed as RGB (Alpha=255), more than 6 digits as ARGB. `ConsoleDivPart` no longer forces Alpha=255
- **HTML div height auto**: `<div>` `height` attribute is now optional. When omitted, auto-calculated from content line count × line height + padding/border

***

## [6.3.1] — SETIMAGELAYER Multi-Sprite Support + SETIMAGELAYERL + ARGB Transparency + div height auto

### Engine-Level Fixes

- **SETIMAGELAYER multi-sprite support**: Changed `ImageLayerManager._layers` from `Dictionary<long, ImageLayer>` to `List<ImageLayer>`. Sprites with the same depth are rendered in insertion order and are no longer overwritten
- **SETIMAGELAYERL new command**: Automatically sets `followScroll=1` and converts Y coordinate via `GETLINEY`. The y parameter is a line number (LINECOUNT), rendering at the same position as HTML img
- **SETIMAGELAYER empty parameter support**: Parameters 3–9 use default values when empty. Only spriteName/depth are required
- **HTML div color ARGB support**: `stringToColorInt32` now supports ARGB transparency. 6 digits or fewer are parsed as RGB (Alpha=255), more than 6 digits as ARGB. `ConsoleDivPart` no longer forces Alpha=255
- **HTML div height auto**: `<div>` `height` attribute is now optional. When omitted, auto-calculated from content line count × line height + padding/border

***

## [7.0.0] — GETLINEY Expression Function

### Added

- **GETLINEY expression function** — Returns the physical Y coordinate (bottom-left origin) of the specified line number, using the same coordinate system as SETIMAGELAYER
  - `GETLINEY(lineNo)` returns the physical Y coordinate of line `lineNo`
  - Used to align SETIMAGELAYER layers with the HTML text flow
  - Internally reuses the `EmueraConsole.GetLinePointY(int lineNo)` method
  - Negative arguments throw a `CodeEE`

***

## [6.2.0] — GETDISPLAYLINE Negative Reverse Index

### Added

- **GETDISPLAYLINE negative argument support** — Negative arguments index from the bottom
  - `GETDISPLAYLINE(-1)` returns the last line, `GETDISPLAYLINE(-2)` returns the second-to-last line
  - Original positive index behavior unchanged (0=first line)
  - Resolves the semantic misalignment of `GETDISPLAYLINE(LINECOUNT - 1)`: `LINECOUNT` is logical line count, `GETDISPLAYLINE` uses display line index; negative indexing operates directly on display lines, bypassing the misalignment
  - Fixed `long.MinValue` and large negative `long→int` cast overflow issues

***

## [6.1.0] — IsFunctionMethod Bounds Check + FindContextByLabel Snapshot Enumeration

### Fixed — Type A Cross-platform Bug Fixes (Dual-platform Benefit)

- **Process.State.cs** — `IsFunctionMethod` property `ArgumentOutOfRangeException`
  - `functionList[currentMin]` index out of bounds after `functionList` is partially cleared
  - Fix: Added `if (currentMin >= functionList.Count) return false;` bounds check
  - Trigger scenario: Exception path (BEFORE_ERROR/BEFORE_THROW handling) where `RollbackToState()` modifies `functionList` but doesn't sync `currentMin`

- **Process.State.cs** — `FindContextByLabel` method `InvalidOperationException`
  - `foreach (var ctx in stack)` enumerating `_contextStack` while stack is modified by `ClearFunctionList()` and other operations
  - Fix: Changed to snapshot enumeration `foreach (var ctx in stack.ToArray())`
  - Trigger scenario: LOCAL/ARG variable with subID access, `Return()` exception triggers BEFORE_ERROR → `ClearFunctionList()` modifies `_contextStack`

## [6.0.0] — Debug Window Fixes: LOCAL@FUNCNAME + Call Stack Preservation + Watch Stability

### Fixed

- **LOCAL@FUNCNAME detection failure** — `GetArrayLocal()` ignores `subID`, always returns `CurrentContext`'s array. Now searches for matching `ExecutionContext` in context stack by `subID`
- **Debug window call stack cleared after error/THROW** — `handleException` no longer calls `ClearFunctionList()`, preserving call stack for debug window inspection. Added `ClearFunctionListPreserveTrace()` for BEFORE_ERROR/BEFORE_THROW internal use
- **Debug window watch expressions with LOCAL variables error** — `saveCurrentState` clones state, `CurrentContext` becomes null, LOCAL variables fall through FallbackArray returning empty array. Now `Clone()` preserves reference to original `_contextStack`, `CurrentContext` auto-falls-back when own stack is empty
- **Debug window currentLine residue after expression function evaluation** — `Process.GetValue` finally block calls `PopContext()` on success path but doesn't restore `currentLine`. Now `CaptureCallState` also saves `currentLine`, both success/failure paths restore it
- **One debug watch error causes all subsequent watches to fail** — Above currentLine residue causes subsequent watches to parse private variables in wrong function context. Fixing currentLine restoration breaks the error propagation chain

### Changed

- `DisableBeforeErrorThrow` config item no longer necessary (call stack preserved by default after errors), but retained for backward compatibility
- Added `ProcessState.ContextStackCount` property

***

## [5.2.0] — DisableBeforeErrorThrow Config Item: Preserve Debug Function Stack

### Added

- **DisableBeforeErrorThrow config item** — New config option that, when enabled, skips BEFORE_ERROR/BEFORE_THROW event functions and directly throws exceptions. Resolves the issue of these two events clearing the function stack during exception handling, enabling the debug window to correctly display call stack and local variables when exceptions occur. Default off for backward compatibility.

### Fixed

- Debug window unable to watch function parameters when THROW or error occurs (requires DisableBeforeErrorThrow to be enabled)

### Xamarin Porting Note

- Xamarin side `ConfigData.SetDefault()` has been synced with corresponding ConfigItem (refer to v0.60.2 PluginAvailableWarn NRE fix)

***

## [5.1.0] — EEv56 Upstream Sync: PluginAvailableWarn + TOOLTIP Fallback

### Changed — Upstream Sync (emuera.em EEv56)

- **PluginAvailableWarn config item** (ee commit `0abdff8`)
  - Removed `pluginsAware.txt` safety check mechanism (original: throw ExeEE to block execution when file missing)
  - Added `ConfigCode.PluginAvailableWarn` config item (default true), shows warning when DLLs exist in Plugins directory
  - Added `GlobalStatic.ExistPlugin` flag, set in `PluginManager.LoadPlugins()` based on DLL presence
  - Added `Lang.PluginAvailable` translation string
  - Warning text: "Note: External plugin functionality is enabled. Issues caused by this feature are not covered by Emuera support"
  - Added checkBox36 UI control to WinForms ConfigDialog (WinForms only, SkiaX does not use ConfigDialog)

- **TOOLTIP default settings fallback** (ee commit `07e58ac`)
  - When all three ToolTip settings are at default values (OwnerDraw=false, InitialDelay=0, tooltip_duration=0), uses synchronous `SetToolTip()` instead of async `Task.Run`
  - Fixes TOOLTIP display delay under default configuration (async path's InitialDelay wait + SynchronizationContext dispatch overhead)
  - Desktop only (WinForms + SkiaX Desktop); Xamarin's TOOLTIP implementation differs and needs no change

- **Version number update** (ee commit `26a35dc`)
  - EEv55 → EEv56
  - Skia version v5 → v5.1

### Fixed

- **Config dialog unresponsive while TINPUT timer is running** — `ShowConfigDialog()` uses modal `ShowDialog()`, but TINPUTNF's `System.Timers.Timer` continues running, timeout triggers `RunEmueraProgram` occupying main thread causing config dialog to become unresponsive
  - `EmueraConsole.cs`: Added `PauseTimer()` / `ResumeTimer()` methods, pause/resume genericTimer and reset timing origin
  - `MainWindow.cs`: Pause timer before opening dialog in `ShowConfigDialog()`, resume after closing

- **System page checkBoxUseLazyLoading missing label text** — Control created in Designer but Text not set, not bound to ConfigCode
  - `ConfigDialog.cs`: Added `checkBoxUseLazyLoading.Text` (`Lang.UI.ConfigDialog.System.UseLazyLoading`)
  - `ConfigDialog.cs`: Bind `ConfigCode.UseLazyLoading` in SetConfig, save value in SaveConfig

- **PluginAvailableWarn English description typo** — `"If available pllugins, Show warning"` → `"Plugin available warning"`
  - `ConfigData.cs`: Fixed typo (`pllugins` → `plugins`), changed to noun phrase consistent with other entries

- **Program.cs bgm.close comment restoration** — ee restored commented-out `bgm.close()` / `sound[].close()`, but this repo had already uncommented them in an A-class fix, no additional action needed

***

## [5.0.0] — T-Prefixed NF Suffix Instructions + Free Scrolling + HOVER_PAUSE

### Added

- **NF suffix instructions**: `TINPUTNF`, `TINPUTSNF`, `TONEINPUTNF`, `TONEINPUTSNF`
  - Same parameters and return values as TINPUT/TINPUTS/TONEINPUT/TONEINPUTS, but does not force scroll to bottom
  - NF = NoFocus, enters `ConsoleState.WaitInputNoFocus` state, does not call `ApplyTextBoxChanges()`
  - Only T-prefixed instructions provide NF variants (INPUT/INPUTS are fully blocking, NF is meaningless)
  - `TINPUTSNF` replaces AWAIT+GETKEYTRIGGERED polling hack

- **ConsoleState.WaitInputNoFocus = 22**: Only difference from `WaitInput` is not calling `ApplyTextBoxChanges()`
- **InputRequest.NoFocus**: Boolean flag, set via `noFocus` constructor parameter in T-prefixed NF variants
- **EmueraConsole.WaitInputNoFocus()**: Sets `WaitInputNoFocus` state
- **EmueraConsole.IsWaitInputState**: Replaces 28 `state == ConsoleState.WaitInput` checks

### Fixed

- **NF scrolling mechanism**: `nfUserScrolledBack` flag records user scroll-up intent; `nfScrollOffsetFromBottom` preserves offset; `WaitInput` entry forces scroll to bottom; `RefreshStrings` skips intermediate rendering during NF scroll-back
- **HOVER_PAUSE hover pause**: Pauses animation when mouse hovers over button, resumes on leave. Applied to 4 map functions

***

## [4.3.1] — GETKEY Decoupling: Latch Leak Fix

### Fixed — AWAIT Loop First Iteration Spurious Mouse Click

- **EmueraConsole.cs** — `Await()` method calls `WinInput.ClearLatches()` before `DoEvents()`
  - Root cause: Under INPUTS/TINPUTS mode, `MouseDown` event sets `_keyLatch[1]=1`, but built-in input system doesn't call `GETKEYTRIGGERED` to consume latch
  - When switching from INPUTS to AWAIT loop, residual latch consumed by `GETKEYTRIGGERED(1)`, producing spurious click
  - Symptom: qol_MAP map exits immediately on first entry with high probability (spurious left mouse click)
  - Fix: Clear all residual latches before each `Await()` iteration start; new latches from `DoEvents()` consumed normally by `GETKEYTRIGGERED`

- **WinInput.cs** — Added `ClearLatches()` method
  - Atomically clears all elements of `_keyLatch` array to 0
  - Prevents cross-input-mode (INPUTS → AWAIT) latch leak

***

## [4.3.0] — PRINTC Pixel Tabulation Refactor: Cross-platform Column Alignment Unification

### Fixed — PRINTFORMLC Column Misalignment in Chinese Environment (Regression Fix)

- **EmueraConsole.Print.cs** — `CreateTypeCString` uses `Config.Encode.GetByteCount(str)` which under default UTF-8 encoding counts CJK characters as 3 bytes, but `Config.PrintCLength` uses half-width character units (CJK=2)
  - A24 fix changed encoding from Shift-JIS to Config.Encode and introduced regression
  - Fix: Changed to `LangManager.GetStrlenLang(str)`, calculates byte length based on language-specific ANSI encoding (Chinese=GB2312/936, Japanese=Shift-JIS/932)

### Changed — PrintC/PrintButtonC Refactored from Byte Tabulation to Pixel Tabulation

- **EmueraConsole.Print.cs** — Deleted `CreateTypeCString` method, `PrintC`/`PrintButtonC` now use pixel tabulation path
  - Old approach: byte length calculation + space padding → while loop space trimming → affected by encoding and font hinting
  - New approach: `StringMeasure.GetDisplayLength` measures content pixel width → `ConsoleSpacePart` pixel rectangle fills the difference
  - Shares same pixel tabulation concept with `PrintHtmlC`, ensuring WinForms + SkiaX dual-platform alignment consistency
  - Deleted `printCWidthL`/`printCWidthL2` (only used by old while loop)
  - Root cause analysis: monospace font `N × charWidth ≠ stringWidth` (font hinting/kerning truncation), WinForms GDI whole-string rendering absorbs error, SkiaX per-character rendering accumulates error into visible offset

### Sync Modifications

- **SkiaX Desktop** (`Emuera/UI/Game/EmueraConsole.Print.cs`) — Sync refactor
- **SkiaX Xamarin** (`Emuera.Xamarin/Platform/GameView/EmueraConsole.Print.cs`) — Sync refactor

***

## [4.2.0] — FONTBOLD/FONTITALIC/FONTREGULAR Cross-Platform Fix + GETPLATFORM API

### Fixed — Mobile Font Style Commands No-Op Causing Bold Leak

- **Instraction.Child.cs** — `FONTBOLD`/`FONTITALIC`/`FONTREGULAR` were no-ops on non-Windows platforms (`if (!OperatingSystem.IsWindows()) return;`)
  - `FONTSTYLE` command had no such restriction and worked normally on mobile
  - Asymmetry caused: `FONTSTYLE 1` sets Bold, but `FONTREGULAR` cannot reset → Bold leak → `GETSTYLE()` returns 1 → `HTMLWRAP(STYLE_FLAG=-1)` generates `<b>` tag → nesting → SkiaX HtmlManager throws "duplicate tag" error
  - Fix: Remove `!IsWindows()` restriction from all three commands. `FontStyle` enum is a pure memory operation with no platform API dependency

### Added — ERB Platform Detection API

- **GETPLATFORM()** — Returns integer code of current execution platform
  - 0=Windows, 1=Android, 2=iOS, 3=macOS, 4=Linux, 5=Unknown
  - `CanRestructure = true` (pure function, compile-time constant folding enabled)
  - ERB scripts can use `IF GETPLATFORM() == 0` for platform-specific branching

***

## [4.1.4] — GETKEY/GETKEYTRIGGERED Mouse Button Fix

### Fixed — Regression Bug from Cross-platform Backport

- **MainWindow.cs** — `GETKEYTRIGGERED(1/2/4)` mouse buttons always return 0 (A35)
  - V4.1.0 changed `WinInput.GetKeyState` from Win32 `user32.dll GetKeyState` to event-driven `_keyState` array
  - `SetKeyPressed`/`SetKeyReleased` only called in `richTextBox1_KeyDown`/`KeyUp`, mouse buttons don't trigger `KeyDown` event
  - Caused `GETKEYTRIGGERED(1)` (VK_LBUTTON), `GETKEYTRIGGERED(2)` (VK_RBUTTON), `GETKEYTRIGGERED(4)` (VK_MBUTTON) to always return 0
  - Fix: Added `WinInput.SetKeyPressed`/`SetKeyReleased` in `mainPicBox_MouseDown`/`mainPicBox_MouseUp` mapping mouse buttons to VK_LBUTTON/VK_RBUTTON/VK_MBUTTON
  - Corresponding commit `63afa0d` (cross-platform audio architecture refactor) introduced regression

- **WinInput.cs / Creator.Method.cs** — Fast mouse clicks lost in AWAIT loop (A35 supplementary fix)
  - Root cause: `MouseDown` + `MouseUp` may be processed in the same `DoEvents()`, `SetKeyReleased` immediately clears `_keyState`, causing `GETKEYTRIGGERED` to read 0
  - V3's Win32 `GetKeyState` reads hardware state directly, unaffected by message queue timing
  - Fix: Added `_keyLatch` latch array, `SetKeyPressed` sets to 1, `GETKEYTRIGGERED` prioritizes latch consumption (`ConsumeKeyLatch`), ensuring press events are detected even if button already released

***

## [4.1.3] — Remove Deprecated #FUNCTION ... Variadic Syntax

### Removed — Deprecated Syntax Cleanup

- **UserDefinedFunctionDataArgType** — Removed `__Variadic = 0x80` enum value
  - `#FUNCTION` declaration's `...` variadic syntax conflicts with lexer's float parsing, deprecated
  - Variadic arguments are now uniformly declared via `VARIADIC` keyword in function definition (`@FUNC(VARIADIC ARG:0)`), `#FUNCTION` declaration does not contain variadic argument info
- **UserDefinedFunction.cs** — Removed `case '.'` parsing code and `state == 7` handling
- **UserDefinedRefMethod.cs** — Removed `__Variadic` flag matching (2 places)

***

## [4.1.2] — debug_log Persistent Write Fix

### Fixed — debug_log No Longer Writes Persistently

- **Process.cs / Process.ScriptProc.cs** — `DebugLogEnabled` once set to `true` (triggered by exception or THROW) is never reset, causing subsequent normal execution flow to continuously write logs
  - Root cause: `catch` blocks and `THROW` instruction set `DebugLogEnabled = true`, but all `return`/`break` paths fail to reset to `false`
  - Impact: In WinForms, THROW followed by program exit has minimal impact; Android app returns to game list but process continues, `DebugLogEnabled` stays `true`, next game entry causes `IntoFunction`/`ReturnF`/`ClearFunctionList`/`GetValue` etc. high-frequency calls to continuously write logs, causing debug_log.log to grow rapidly
  - Fix: Reset `DebugLogEnabled = false` before all exception handling end paths (after `ClearFunctionList`) and all THROW `break` paths

***

## [4.1.1] — Audio API Bug Fixes (A33-A34 Backport)

### Fixed — Kernel Bug Fixes (Type A, Backported from feature/xamarin)

- **Creator.Method.cs** — ISPLAYINGSOUND dead code + infinite loop (A33)
  - `arguments[0] == null` is always false: after calling `arguments[0].GetIntValue(exm)`, `arguments[0]` cannot be null
  - for loop condition `channelId < GlobalStatic.Sound.Length` should be `i < GlobalStatic.Sound.Length`, using `channelId` causes infinite loop
  - Fix: Simplified to directly check if specified channel is playing

- **Creator.Method.cs** — SOUNDCONTROL comment error (A34)
  - Comment `2=speed change` inconsistent with actual switch logic (action=2 is stop, action=3 is speed change)
  - Corrected comment to `0=pause, 1=resume, 2=stop, 3=speed change`

***

## [4.1.0] — Cross-platform Audio Architecture Refactor + Backport Fixes

### Changed — Audio Architecture Refactor (Cross-platform Infrastructure)

- **Sound.cs** — Added audio playback base class
  - Extracted virtual methods: play/stop/pause/resume/close/isPlaying/setVolume/getVolume/setSpeed/getSpeed/GetTotalTime/GetCurrentTime/SetPreservePitch
  - Added `Sound.Factory` static factory property, host program sets platform implementation (WinForms→NAudioSound, Android→AndroidSound)
  - Kernel code creates instances via Factory, eliminating direct platform dependencies

- **Sound.NAudio.cs** — Refactored NAudioSound as Sound subclass
  - Renamed original `Sound` class to `NAudioSound : Sound, ISampleProvider`
  - Added `override` to all methods, removed duplicate `Playing` field (uses base class)
  - Changed `SoundMixer.PlaySound/StopSound` parameter type to `NAudioSound`

- **GlobalStatic.cs** — Removed NAudioSound direct dependency
  - `Sound[]` and `Bgm` initialization use base class `Sound`
  - Rebuild instances with `Sound.Factory()` after stop+close in `Reset()`

- **Program.cs** — Set Factory at WinForms entry point
  - `Sound.Factory = () => new NAudioSound()` + `GlobalStatic.Bgm = Sound.Factory()`

- **Creator.Method.cs / Instraction.Child.cs** — All `new Sound()` changed to `Sound.Factory()`
  - Ensure correct platform instances are created at runtime

### Fixed — Kernel Bug Fixes

- **EraStreamReader.cs** — try block missing catch causing CS1524
  - Added `catch { return false; }`

## [4.0.0] — Type A Fix Backport (Round 3) + BINPUT Count Fix

### Fixed — Kernel Bug Fixes (Type A, Backported from EmueraFL Closed-source Engine)

> The following fixes originate from engine bug descriptions in EmueraFL (Kom1 closed-source engine) commit history, which we verified and fixed in the source code.

- **GraphicsImage.cs** — GSetFont Dispose cache-shared SKFont (A27)
  - `FontFactory.GetFont` returns cache-shared SKFont object, `font.Dispose()` in `GSetFont` would invalidate cache references
  - When calling GSETFONT multiple times with duplicate parameter combinations (e.g., Regular → Bold → back to Regular), cache would return already Disposed SKFont → crash
  - Fix: Removed `font.Dispose()` call in `GSetFont`, FontFactory manages SKFont lifecycle uniformly
  - Corresponding EmueraFL commit `1ee5d509`

- **GraphicsImage.cs** — No null protection for properties (A28)
  - `Fontname`/`Fontsize`/`Fnt`/`Pen`/`Brush` properties directly access fields with no null checks
  - Calling GGETFONT/GGETPEN/GGETBRUSH without GSETFONT/GSETPEN/GSETBRUSH after GCREATE would cause NRE
  - Fix: `Fontname` returns `font?.Typeface?.FamilyName ?? ""`, `Fontsize` returns `font != null ? (int)font.Size : 0`
  - Fix: Added `PenColorArgb`/`PenWidth`/`BrushColorArgb` null-safe properties, `GGETPEN`/`GGETPENWIDTH`/`GGETBRUSH` now use these properties, returning 0 instead of NRE when not set
  - `Fnt`/`Pen`/`Brush` continue to return original fields (null semantics handled by internal callers)
  - Corresponding EmueraFL commit `4ce390b0`

### Fixed — BINPUT Button Count Fix

- **Instraction.Child.cs** — BINPUT/BINPUTS/ONEBINPUT/ONEBINPUTS EscapedParts count early exit
  - In EscapedParts count loop, found first div button then `goto loopend` to exit, remaining div buttons not included in count
  - Fix: Removed `goto loopend`, iterate all buttons across all divs to ensure accurate counting
  - Impact: Not a functional bug (count>0 enters WaitInput flow, no issues in matching phase), only count value is more precise

### Changed — Version Number

- Skia variant version upgraded from 3.x to **4.0.0** (Type A fixes accumulation + BINPUT fix)
- `InformationalVersion` updated from `Skia3` to `Skia4`

## [3.9.1] — Type A Fix Backport (Round 2) + Upstream Alignment + EmueraFL Bug Fixes

### Fixed — Kernel Bug Fixes (Type A, Backported from feature/xamarin)

> The following fixes originate from cross-platform bugs discovered when erafl-CHS ran on Xamarin, WinForms version also benefits.

- **Creator.Method.cs** — ENUMFILES path fix (A23)
  - `EnumFilesMethod` returns absolute path, `LOADTEXT`'s `GetValidPath` rejects absolute paths causing `XML_GET` parsing failure
  - Convert absolute path to relative with `Path.GetRelativePath(Program.ExeDir, files[i])`
  - Align with upstream ee+em a4d3665 + 1c495b5 (upstream first used `Path.GetRelativePath(dir, ...)` then corrected to `Program.ExeDir`)

- **EmueraConsole.Print.cs** — PRINTFORMC encoding crash fix (A24)
  - Hardcoded `Shift-JIS` couldn't encode non-Japanese characters like Chinese, and no `ReplacementFallback` causing crash
  - Replaced with `Config.Encode.CodePage` + `EncoderFallback.ReplacementFallback`, respecting `DEFAULT ANSI ENCODING` config

- **HtmlManager.cs** — HTML self-closing div tag support (A25)
  - `<div ... />` self-closing tag syntax not supported by parser, `/` treated as `OperatorCode.Div` causing attribute parsing failure
  - Detect `/>` in div attribute parsing loop and create empty `ConsoleDivPart`
  - Root cause: `XML_GET` serializes empty div elements as `<div ... />` per XML spec, but HTML parser doesn't support (same engine's output incompatible with input)

- **Utils.cs** — `GetValidPath` doc comment sync
  - Sync with upstream ee+em a4d3665 comments: Note that `GetValidPath` returns absolute path, caller needs to `GetRelativePath`

### Fixed — EmueraFL Bug Fixes (Extracted from Closed-source Engine Commits)

> The following fixes originate from engine bug descriptions in EmueraFL (Kom1 closed-source engine) commit history, which we verified and fixed in the source code.

- **Creator.Method.cs** — GSETFONT FontStyle lost (A26)
  - When `GSETFONT` found font from `Pfc.Families`, `new SKFont(SKTypeface.FromFamilyName(...), fontsize)` didn't pass `fs` parameter
  - Caused Bold/Italic/Underline/Strikeout styles to be ignored, always Regular
  - Fix: Changed to `FontFactory.GetFont(ff.Name, fs, fontsize)` for unified handling
  - Corresponding EmueraFL commit `ae958303`

***

## [3.9.0] — Type A Fix Backport + Compile Warning Fixes

### Fixed — Kernel Bug Fixes (Type A, Backported from feature/xamarin)

> The following fixes originate from cross-platform bugs discovered during Xamarin porting, WinForms version also benefits.

- **Process.State.cs** — 4 fixes
  - `ShiftNextLine` null guard: Directly return when `currentLine==null`, prevent empty stack NRE (A1)
  - `ReturnF` empty stack guard: Safe exit when `functionList.Count==0` (A2)
  - `CurrentLabel` null check: `called.CurrentLabel` might be null in DebugMode tracing logs, add guard (A3)
  - BEFORE_ERROR/BEFORE_THROW logic simplification: Merge two BEFORE_THROW branches into single condition check, remove redundant `GameProcProcess.DebugLog` calls, logically equivalent (A4)

- **Process.LazyLoading.cs** — 2 fixes
  - `LoadLazyLoadingFolders`: Replace `\` and `/` with `Path.DirectorySeparatorChar` simultaneously, no longer dependent on `RuntimeInformation.IsOSPlatform` (A5)
  - `ErbPath`: Simplified from `string.Create("ERB/" + a)` to `Program.ErbDir + a`, use existing cross-platform path property (A6)

- **CharacterData.cs** — Array null checks
  - `SaveToStreamBinary`: Check null for 1D/2D arrays `dataIntegerArray`/`dataStringArray`/`dataFloatArray` before `ToArray()`/`WriteWithKey`, prevent crash when saving empty character data (A7)

- **VariableEvaluator.cs** — StainDefault null fallback
  - `setDefaultStain`: `Config.StainDefault ?? new List<long>(new long[] { 0, 0, 2, 1, 8 })`, prevent NRE when config missing (A8)

- **Instraction.Child.cs** — 2 fixes
  - CALLPLUGIN null guard: Set RESULT=0 and return when `arg.CallFunc == null`, prevent NRE when plugin not loaded (A11)
  - TIMES overflow: `null` → `default(ScriptPosition)`, fix `PrintWarning` parameter type (A12)

- **Creator.Method.cs** — GetCurrentProcess try-catch
  - `GetMemoryUseMethod`/`ClearMemoryMethod`: Wrap `Process.GetCurrentProcess()` in try-catch, might throw exception on Android, return 0L to degrade (A16)

- **Config.cs** — Property visibility changed to internal
  - 17 config properties changed from `private set` to `internal set`, allow Xamarin project to override config values (A21)

- **OperatorMethod.cs** — Overflow warning parameter fix
  - `null` → `default(ScriptPosition)`: Change 4 integer overflow warning 2nd parameters from null to default(ScriptPosition), fix `PrintWarning` parameter type

### Fixed — Compile Warning Fixes (1035→240, 77% reduction)

- **CA2200** — `Instraction.Child.cs`: `throw e` → `throw`, preserve original exception stack
- **SYSLIB0014** — `Instraction.Child.cs`: `WebClient` → `HttpClient`, remove obsolete API
- **CS4014** — `MainWindow.cs`: Add `_ =` discard marker to unawaited `ReloadPartialErb` calls
- **CA1069** — `VariableCode.cs`: Add `[Flags]` attribute and `SuppressMessage` to enum, duplicate `__COUNT_*__` values are design intent
- **CA1806** — `WinmmTimer.cs`: Check `timeBeginPeriod`/`timeEndPeriod` return values
- **CA1825** — `VariableData.cs`/`CharacterData.cs`/`Creator.Method.cs`: Zero-length array `new T[0]` → `Array.Empty<T>()`
- **CA1834** — 7 files: Single-character `Append("x")` → `Append('x')`, use char overload
- **CA1854** — 9 files: `ContainsKey` + indexer → `TryGetValue`, eliminate double dictionary lookup

***

## [3.8.3] — Upstream Alignment (BREAKBUTTON + Debug Mode Don't Close Window)

### Added

- **BREAKBUTTON Instruction** (from ee+em/master)
  - `BREAKBUTTON` — Forcefully interrupt current button wait, immediately refresh display
  - Implemented by calling `EmueraConsole.forceUpdateGeneration()`
  - Optional parameter, used in scenes requiring forced UI refresh
- **Don't close window on error in debug mode** (from ee+em/master, CRER patch)
  - When `ConsoleState.Error` and `Program.DebugMode` is true, directly return, don't execute close flow

### Changed

- **.gitignore merge optimization**: Merge ee+em/master's organization with feature/xamarin's wildcard coverage (`**/bin/*`, `**/obj/*`, `**/artifacts/**`, `*.user`, `*.suo`)

***

## [3.8.2] — Operator Reverse Mapping Fix

### Fixed

- **OperatorCode.opDictionary missing `/`, `%`, `==` three entries** (upstream defect fix)
  - Upstream emuera.em's `opDictionary` collection initializer omitted reverse mappings for `Div`(`/`), `Mod`(`%`), `Equal`(`==`) three operators
  - Caused `ToOperatorString()` to return empty string for these three operators, impacting error message readability (e.g., "Cannot apply operator  to integer type")
  - Operator calculation itself not impacted (`/`, `%`, `==` work normally in expressions), only affects error messages
  - XEmuera-1 uses `.Add()` in static constructor for initialization, entries complete, not impacted by this defect

***

## [3.8.1] — SELECTCASE Jump Table Enhancement + TOSTRF Optional Parameter

### Fixed

- **SELECTCASE jump table now supports foldable constant expression functions**
  - In `TryBuild()`, when `LeftTerm.IsConst` is `false`, try calling `Restructure(null)` to fold expression
  - Pure functions (like `ABS(3)`, `SIN(0)`, `TOINT("123")` etc. `CanRestructure=true` functions) can be folded to `SingleTerm`, participate in jump table O(1) lookup
  - Functions with side effects or runtime state dependent (like `RAND()`, `RESULT`, `GETTIME` etc. `CanRestructure=false`) not impacted, automatically fallback to linear scan
  - Wrap `Restructure` call in try-catch, safely fallback to linear scan when folding fails
- **SELECTCASE jump table duplicate value handling strategy (FIFO)**
  - Duplicate CASE values keep first occurrence branch, subsequent duplicates trigger warning then skipped
  - This behavior consistent with linear scan fallthrough semantics, no impact on jump table determinism
- **TOSTRF second parameter now optional**
  - Fixed issue where `argumentTypeArray` caused forced parameter count check, second parameter couldn't be omitted
  - Changed to `argumentTypeArrayEx` + `OmitStart = 1`, allow `TOSTRF(value)` single-parameter call
  - Extended `ArgType` enum to add `Float` type, complete float parameter type support

## [3.8.0] — BEFORE_THROW/BEFORE_ERROR Events + TEXT_BGC_ON/TEXT_BGC_OFF + STRICT_FONT_FALLBACK

### Added

- **BEFORE_THROW / BEFORE_ERROR Event Functions**
  - `BEFORE_THROW`: Called before `THROW` instruction throws exception, allow script to intercept and handle exceptions
  - `BEFORE_ERROR`: Called when any error first occurs, provide error handling hook
  - If event function exists, exception throw will be delayed, allow script to perform cleanup or recovery operations
- **TEXT_BGC_ON / TEXT_BGC_OFF Text Background Color Control** (SK exclusive)
  - `TEXT_BGC_ON R, G, B, Alpha%`: Set full-line background color for all subsequent lines (Alpha is 0~100 opacity)
  - `TEXT_BGC_OFF`: Clear background color, restore transparency
  - Background drawn as line full-width × line height rectangle, only drawn when actual text exists in line
- **STRICT_FONT_FALLBACK Strict Font Fallback Mode** (SK exclusive)
  - `STRICT_FONT_FALLBACK value`: Set to 1 to enable strict mode, characters with missing glyphs display as □ (tofu) instead of fallback fonts
  - Set to 0 to restore default fallback behavior

## [3.7.0] — SQL_CONNECTION_OPEN Enhancement

### Added

- **SQL_CONNECTION_OPEN Convenience Function** (from DotNet)
  - `SQL_CONNECTION_OPEN(string name)` — Automatically create/open SQLite database connection in `sav/sql/` directory
  - If connection with same name already exists, automatically close and rebuild

### Fixed

- **SQL_CONNECTION_OPEN database crash corruption risk**: Changed `PRAGMA journal_mode=OFF; synchronous=OFF` to `WAL; NORMAL`, balance write performance and crash safety
- **SQL_CONNECTION_OPEN path traversal vulnerability**: Added illegal character and `..` checks to `name` parameter, prevent ERB scripts from penetrating `sav/sql/` directory
- **SQL_CONNECTION_OPEN connection handle leak**: Added try-catch protection when PRAGMA execution fails after `conn.Open()`
- **SQL_CONNECTION_OPEN path concatenation not standard**: Changed `$"{dir}{name}.db"` to `Path.Combine(dir, $"{name}.db")`

### Changed

- **SQL_CONNECTION_OPEN PRAGMA strategy adjustment**: DotNet upstream used `journal_mode=OFF; synchronous=OFF` to pursue extreme write speed but with crash corruption risk; Skia variant changed to `WAL; NORMAL`, write performance close to OFF mode and database won't corrupt on crash
- **SQL generic refactor**
  - Merged `SqlManager` internal `ExecuteScalarLong`/`ExecuteScalarString`/`ExecuteScalarFloat` to generic `ExecuteScalar<T>`
  - All ERB layer APIs unchanged (`SQL_EXECUTE_SCALAR_LONG`/`STRING`/`FLOAT`)

## [3.6.0] — G_POLYGON Polygon Drawing + Text Decoration Lines

### Added

- **G_POLYGON Polygon Instruction Set** (from DotNet)
  - `G_POLYGON_DRAW(int ID)` — Stroke draw polygon with current pen
  - `G_POLYGON_FILL(int ID)` — Fill polygon with current brush
  - `G_POLYGON_POINT_ADD(int ID, int x, int y)` — Add polygon vertex
  - `G_POLYGON_POINT_CLEAR(int ID)` — Clear all vertices
  - Added `_points` field and `GDrawPolygon`/`GFillPolygon`/`GDrawPolygonAddPoint`/`GDrawPolygonClearPoint` methods to `GraphicsImage`
  - Only available in Skia mode (throws CodeEE in GDI mode)
- **Text decoration line rendering** (from DotNet)
  - Added `HasUnderline` / `HasStrikeout` properties to `StringStyle`, auto-sync in `FontStyle` setter
  - `ConsoleStyledString.DrawTo` draws underline and strikeout in Skia path
  - Use `SKFont.Metrics.UnderlinePosition` / `StrikeoutPosition` to position decoration lines
  - Support `FONTSTYLE` instruction's Underline(8) / Strikeout(4) bitmask

***

## [3.5.0] — Stopwatch High-precision Timing + Image Flip + HTML DisplayMode

### Added

- **Stopwatch high-precision timing refactor** (from DotNet)
  - `SpriteAnime` / `SpriteAnimated` animation frame timing migrated from `DateTime.Now` to `Stopwatch.GetTimestamp()` + `Stopwatch.GetElapsedTime()`
  - Eliminated `DateTime.Now` system clock precision limit (~15ms), improve animation frame rate stability
  - Pause/resume logic migrated synchronously: `PauseAnimation()` / `ResumeAnimation()` use timestamp difference calculation
- **Image flip logic** (from DotNet)
  - `ASpriteSingle.GraphicsDraw` supports automatic flip when `destRect.Width`/`Height` negative
  - Use `canvas.Scale(sx, sy)` to implement horizontal/vertical flip, also support flip rendering with `SKColorFilter`
- **HTML DisplayMode property port** (from DotNet)
  - Added `display` property to `<img>` tag: `relative` (default) / `absolute-lefttop` / `absolute-leftbottom`
  - Added `xpos` property to `<img>` tag: X coordinate when absolute position
  - Extended `<div>` tag `display` property to support `absolute-lefttop` / `absolute-leftbottom`
  - `ConsoleImagePart.DrawTo` implements three positioning modes: relative positioning, top-left absolute positioning, bottom-left absolute positioning
  - `ConsoleDivPart.DrawTo` synchronously supports three DisplayModes

***

## [3.4.0] — GETCSVNOBY* Name Reverse Lookup + MATCHALL Full Search + Preload Optimization

### Added

- **GETCSVNOBY* Name Reverse Lookup** (from DotNet)
  - `GETCSVNOBYNAME(str)` / `GETCSVNOBYNICKNAME(str)` / `GETCSVNOBYCALLNAME(str)` / `GETCSVNOBYMASTERNAME(str)`
  - Reverse lookup character template number by NAME/NICKNAME/CALLNAME/MASTERNAME, O(1) lookup
  - Returns -1 if not found
- **MATCHALL / MATCHALLEX Full Search** (from DotNet, redesigned)
  - `MATCHALL(var, value[, beg, end[, outArr]])` — Variable reference form
  - `MATCHALLEX("varName", value[, beg, end[, outArr]])` — String variable name form
  - Returns match count, 5th parameter outputs index array (starting from 0)
  - More flexible than DotNet instruction form: Doesn't pollute RESULT, usable in expressions
- **Preload byte-level optimization** (from DotNet)
  - Preload ERB/CSV files to memory all at once on startup
  - `EraStreamReader.OpenOnCache()` reads from memory instead of disk IO
  - CSV loading in `ConstantData.cs` changed to `OpenOnCache()` to fully utilize cache
  - .NET 8 memory stream solution, solves encoding compatibility and BOM stripping issues

### Fixed

- **METHOD_Instruction Float branch missing**: Float expression functions (TOFLOAT etc. 8 functions) throw exception when used as instruction, added `EraType.Float` branch to write `RESULTF`
- **TOINT illegal input crash**: Added try-catch to intercept illegal string conversion, returns 0 when can't parse (from DotNet)
- **MainWindow console null crash**: Added null checks to ShowConfigDialog and clipboard handlers (from DotNet)
- **PrintStringBuffer empty array out-of-bounds**: Skip ret[^1] access when ButtonsToDisplayLines returns empty array in Flush() (from DotNet)
- **SKPaint resource leak**: Complemented `using var` in Creator.Method.cs, prevent unmanaged memory leak (from DotNet)

### Changed

- **Tutorial cross-reference**: Added instruction/expression syntax cross-reference to `line-types.zh.md`, `index.zh.md`, `CALLF.zh.md`

***

## [3.3.0] — SELECTCASE Compile-time Jump Table Optimization

### Added

- **SELECTCASE compile-time jump table optimization** (Phase 4.2+4.6)
  - `SelectCaseJumpTable` core class: Build `Dictionary<long/string/double, InstructionLine>` jump table at compile time
  - `TryBuild()` compile-time build: Iterate IfCaseList, check if each CaseExpression is `CaseType == Normal && LeftTerm.IsConst`
  - When can't optimize (contains TO/IS/non-constant/duplicate keys), automatically return null, fallback to linear scan
  - `Lookup()` runtime O(1) lookup, returns CASEELSE or ENDSELECT line when not hit
  - `AExpression.IsConst` property: `SingleTerm` overrides to true, compound expressions and variable references default to false
  - `InstructionLine.SelectCaseJumpTable` field stores compile-time jump table
  - `SELECTCASE_Instruction` fast path: Direct Lookup + JumpTo when jump table exists, skip linear scan

***

## [3.2.0] — SETIMAGELAYER Layer Rendering + CBGSETSPRITE Upgrade

### Added

- **SETIMAGELAYER Layer Rendering Instruction Set** (Phase 5.11)
  - `SETIMAGELAYER spriteName, depth, x, y, width, height, opacity, CM_ARRAY, followScroll` — Render Sprite on independent layer
  - `EXISTSIMAGELAYER(depth)` — Detect if layer at specified depth exists
  - `CLEARIMAGELAYER depth` — Clear layer at specified depth
  - `CLEARIMAGELAYER_ALL` — Clear all layers
  - `ImageLayerManager` core class: Stored in Dictionary sorted by depth, directly drawn each frame
  - `ColorMatrixHelper` utility class: DRY refactor color matrix parsing (5×5 2D/3D integer array → SkiaSharp float\[])
  - Viewport clipping: Skip drawing layers outside window, save GPU resources
  - Animation pause when offscreen: `IsOffScreen` flag triggers `PauseAnimation()`/`ResumeAnimation()`
  - Follow scroll: Store scroll delta with `FollowScroll` + `InitialScrollY`
  - Bottom-left origin coordinate system: Consistent with CBGSETSPRITE
- **CBGSETSPRITE Upgrade**: Upgraded from 4 parameters to 8 parameters `(imgName, x, y, zdepth, width, height, opacity, CM)`, all parameters from 2nd onwards optional

### Fixed

- **ColorMatrix parsing code duplicate**: Extracted to `ColorMatrixHelper`, shared by ConsoleImagePart and Instraction.Child
- **ArgumentBuilder manual LexicalAnalyzer parsing caused parameter loss**: Changed to popTerms standard method
- **SETBGIMAGE parameter parsing method fix**: `FORM_STR_ANY` → `SP_SETBGIMAGE`, fixed bug where variable parameters treated as literal strings (depth/opacity already existed from upstream)
- **ClientBackGroundImage missing width/height**: Added fields, use scaled size in OnPaint
- **FollowScroll using absolute scrollY causes image to be offscreen**: Store initialScrollY, use scroll delta instead
- **SETIMAGELAYER coordinate system inconsistent with CBGSETSPRITE**: Changed to bottom-left origin coordinate system

***

## [3.1.0] — Variadic Arguments + Element-Level Reference + #REF/#REFS + OUT Parameter

### Added

- **Variadic Arguments** (Phase 2.1)
  - Declare variadic parameters with `VARIADIC ARG/ARGS/ARGF` keyword
  - `ARGLEN()` built-in function returns number of variadic parameters
  - `VariadicArgTerm` expression class encapsulates remaining actual parameters
  - Supports Int/String/Float three variadic parameter types, Int→Float implicit conversion
  - When private variable is fixed parameter, ARG array only contains variadic parameters
- **Element-Level Reference** (Phase 2.2)
  - `ElementRefInfo` struct transmits "target variable + fixed index" reference
  - `ReferenceToken` subclasses (Scalar/1D/2D/3D) use `ElementRefInfo` to proxy read/write
  - `ScopeIn`/`ScopeOut` save/restore reference state (`_scopeState` list)
  - `SetTransporter` three-way dispatch: Array reference / Element-level reference / NullRef
- **`#REF` / `#REFS` Element Reference Keyword** (Phase 2.3)
  - `#REF X` declares integer element reference (Dimension=0)
  - `#REFS S` declares string element reference (Dimension=0)
  - Completely separate from `#DIM REF` array reference, eliminate semantic ambiguity
  - `ConvertArg` three-dimensional branch matching (Dimension=0 / Dimension>0 / OUT)
- **OUT Parameter (Optional Output Parameter)** (Phase 2.4)
  - `#DIM OUT X` / `#DIMS OUT X` declares omittable output parameter
  - `NullRefTerm` black hole variable: All read/write silently ignored when omitted
  - OUT isomorphic with `#REF` (Element reference Dimension=0), not isomorphic with `#DIM REF`
  - `refDestDimension` field distinguishes element reference and array reference passing methods
  - Supports OUT + variadic parameter combinations, nested calls, CALLFORM/TRYCALL

### Fixed

- **ARGLEN() compile-time constant folded to 0**: `CanRestructure = false` prevents optimizer mis-folding
- **ElementRefInfo context-dependent caused reference write-back failure**: Capture actual array snapshot when created
- **ReferenceToken ScopeIn/ScopeOut didn't save reference state**: Introduced `_scopeState` list to save/restore
- **SetTransporter array REF parameter passing error**: `refDestDimension` distinguishes element reference vs array reference
- **CreatePrivateVariable missing IsOut=true setting**: Can't recognize when OUT parameter omitted
- **MatchType missing allowElementRef parameter**: OUT parameter reference matching fails
- **MatchType blocked OUT parameter chain passing**: Added `!rother.IsOut` exemption
- **OUT parameter mistakenly created as 1D array reference**: Forced `Dimension=0` and `Lengths=[1]`
- **IntoFunction Float variadic parameter type truncation**: `(long)arg.GetFloatValue()` → `arg.GetFloatValue()`

***

## [3.0.0] — Float Type System Full Refactor + OpenGL Degradation

### Added

- **Float Type System Full Refactor Complete** (B.3 all subtasks)
  - `#DIMF` float variable declaration, `LOCALF`/`ARGF`/`RESULTF` built-in float variables
  - `#FUNCTIONF` float return function, Float arithmetic/comparison/unary/ternary operations
  - Same-name overloaded math functions (SIN/COS/SQRT etc.), array function Float branches
  - `TOFLOAT`/`TOSTRF` type conversion, save file double-precision support, DT/SQL Float operations
- **Trigonometric and Rounding Functions**: SIN/COS/TAN/ASIN/ACOS/ATAN/FLOOR/CEIL/ROUND (Int+Float same-name overloads)
- **Character Float Variable Support**: dataFloat/dataFloatArray/dataFloatArray2D in CharacterData
- **RenderingBackend Render Backend Config**: Auto/OpenGL/CPU three modes, seamless degradation at runtime
- **TEXT\_BGC\_ON / TEXT\_BGC\_OFF**: Text background color on/off instructions
- **Upstream Sync**: CurrentCulture→InvariantCulture, TIMES culture dependency fix, VARS2D fix, FORCE\_QUIT fix, ServerGC enabled

### Fixed

- **OpenGL context loss crash**: Auto degrade to CPU rendering in dual graphics/virtual machine environments
- **ColorMatrix GDI+→SkiaSharp migration fix**: Column-major→row-major layout, translation component ×255f, GDrawG GDI+ residue cleanup
- **Merge conflict black screen**: Fixed PaintSurface event hidden after mr-6 branch merge
- **Float save file data loss**: Fixed LoadVariableBinary Float segment mistakenly truncated to long

### Changed

- `typeof(long)`/`typeof(string)` hardcoded → `EraType` enum + `VariableDescriptor` query (746 replacements)

***

## [2.0.0] — Type System Foundation + Safe Arithmetic

### Added

- **ExecutionContext Stack-style Function Context**: Fixed LOCAL/ARG same function recursive overwrite pollution
- **SparseArray\<T> Sparse Array Storage**: Dramatically saves large subscript array memory
- **SafeArithmetic Safe Arithmetic**: Overflow protection, no longer silently overflows
- **EraType Enum + VariableDescriptor**: Type system infrastructure
- **#DIMF Syntax Parsing**: Float variable declaration + float literal
- **Save File Float Segment**: EraSaveDataType Float/FloatArray/FloatArray2D/FloatArray3D

### Fixed

- **ConvertArg() extra parameters silently discarded**: Removed TooManyFuncArgs error, added TRY safety net
- **TIMES\_Instruction overflow protection**
- **INITRAND/DUMPRAND decoupled from new random algorithm**

***

## [1.3.0] — Sprite Index Hanging Fix

### Fixed

- **Sprite index hanging after toolbar returns to title**: Caused standing sprite to become transparent

***

## [1.2.0] — SpriteG Snapshot Mode Fix

### Fixed

- **SpriteG snapshot mode**: Caused composite sprite to render as blank

***

## [1.1.0] — HTML_PRINTC + SQL Parameterization + MAP API

### Added

- **HTML\_PRINTC / HTML\_PRINTLC**: Pixel-based HTML table commands, precise alignment with non-monospace fonts
- **HTML\_PRINT font tag size attribute**
- **SQL Parameterized Query**: `SQL_ESCAPE`, `SQL_P_EXECUTE_*` series, `@0,@1...` placeholders to prevent injection
- **MAP Full Set Method API**: MAP\_VALUES/MAP\_MERGE/MAP\_REMOVEIF/MAP\_FINDKEY/MAP\_TOSTRING/MAP\_FROMSTRING

### Fixed

- **Color text rendering too thin**: Fixed text becoming too thin and faint after SETCOLOR
- **GDRAW pipeline implementation under SKIA**
- **HTML new tag closing behavior**

***

## [1.0.0] — SkiaSharp Rendering Engine Release

### Added

- **SkiaSharp Rendering Engine**: Completely replaced GDI+, supports GPU acceleration
- **OpenGL Hardware Acceleration**: Auto detection + runtime degradation
- **SRGB Color Space Fix**: Fixed screen darkness caused by SkiaSharp default color space
- **GDI Font Fallback**: MS Gothic and other raster fonts retain GDI rendering path
- **Smart Font Fallback**: Serif/sans-serif classification fallback, CJK full coverage
- **Rendering Control API**: SET\_TEXT\_DRAWING\_MODE / GET\_TEXT\_DRAWING\_MODE / SET\_SKIA\_QUALITY / GET\_SKIA\_QUALITY
- **HTML\_PRINT font rendering attribute extension**: render/edging/hinting
- **Fullscreen Function (F11)**: Covers Start menu, toolbar automatically shows when mouse moves to top
- **SPRITECREATEFROMFILE**: Create Sprite directly from image file, no need for GCREATE intermediate
- **BitArray Functionality**
- **DIV Rendering Performance Optimization**: Hit test O(1) positioning + Y-axis pre-culling
- **ToolTip Occlusion Prevention**: Auto flip at screen edges
- **Image Resource Management Refactor**: SharedBitmapCache global bitmap pool + ConstImage lightweight shell
- **STRICT\_FONT\_FALLBACK**: Strict font fallback mode
- **SETANIMETIMER**: Animation frame interval control
- **BITMAP\_CACHE\_ENABLE**: Bitmap cache on/off

### Fixed

- **FontFactory font cache memory leak**: Properly released on game reset
- **RasterFont checking method**
- **MS Gothic font differs from past**
- **SkiaSharp text rendering typography asymmetric**
- **SpriteAnime animation rendering choppy**: Memory explosion from repeated decoding of same file
- **Word Wrap causing rich text font fallback loss**
- **DIV image button click disabled** (when height exceeds one line)
- **MoveMouse pruning error**
- **Symbol rendering spacing and overlap**
- **Font collection Bug**
- **Skia rendering quality user settings not applied**
- **PrintPlainwithSingleLine doesn't execute rendering in Plugin API**
- **Array expanded to ten million digits**

***

## [0.3.0] — EVAL/EVALS + CALLSTR Series + SQL Full Set

### Added

- **EVAL / EVALS**: Runtime dynamic expression evaluation
- **CALLSTR / JUMPSTR / TRYCALLSTR / TRYJUMPSTR / TRYCCALLSTR / TRYCJUMPSTR**: Dynamic function dispatch
- **SQL Database Operation Full Set**: SQL\_CONNECT/DISCONNECT/EXECUTE\_NONQUERY/EXECUTE\_READER/READER\_*/EXECUTE\_SCALAR\_*/IMPORT\_MAP\_XML/IMPORT\_DT\_XML/EXPORT\_MAP\_XML/EXPORT\_DT\_XML/IMPORT\_XML\_CUSTOM
- **Resource Management System (ResourceManager)**: RM\_RESOURCECHECK\_LOAD / RM\_RELEASE\_ALL / RM\_RESOURCE\_EXIST, LRU cache eviction
- **SqlManager Streaming XML Parsing**: XmlReader/XmlWriter, supports GB-level data import/export

### Fixed

- **XML\_ADDNODE multi-node matching**: Fixed Bug where only last insertion applied
- **String comparison logic**: GreaterEqualStrStr / LessEqualStrStr error logic
- **SqlManager.CloseAll() not integrated into global reset**: Added call in GlobalStatic.Reset()
- **Missing localization entries**

***

## [0.2.0] — BGMControl Fix

### Fixed

- **BGMControl functional abnormality**: Parameter overload invalid
- **Pitch changes when pitch flag exists**: Logic correction

***

## [0.1.0] — SoundTouch Audio Speed Library + Audio Control Instructions

### Added

- **SoundTouch Audio Speed Library**: Supports speed change without pitch change / speed change with pitch change
- **Audio Control Instructions**: GETSOUNDORBGMINFO / ISPLAYINGSOUND / SOUNDCONTROL / ISPLAYINGBGM / BGMCONTROL
- **SOUNDCONTROL stop channel audio**
- **EXISTVAR extension**: Supports storage unit existence check (2nd parameter)

### Fixed

- **EXISTFUNCTION**: Supports detecting functions included in Lazyloading but not executed
- **.als file**: Fixed string pointer reading after index 10
- **SPRITECREATE**: Supports 8/10 parameter format, aligns with CSV capability
- **GCREATEFROMFILE isRelative parameter**: Parses relative path from current working directory when 3rd parameter is not 0

***
