---
---

# CLI 启动选项与无头语法检查

> EM+EE（含 Skia 变体）基于 `System.CommandLine` 实现的命令行接口、**AnalysisMode（解析模式）**
> 无头语法检查、以及 `--CliDebug` agent 驱动协议的说明。
> 实现正本＝`Program.cs`（`Main`）／`Runtime/Script/Process.cs`／`Runtime/Script/Process.LazyLoading.cs`／`UI/CliDebug/CliDebugHost.cs`。

## 命令行选项

| 选项 | 说明 |
|---|---|
| `--ExeDir <dir>` | 启动指定文件夹的 Era（工作目录） |
| `-Debug`（`-debug`/`-DEBUG`） | 调试模式 |
| `-GenLang` | 生成语言文件模板 |
| `--CliDebug` | **CLI 调试模式**：stdin/stdout 的 JSON Lines 协议，供 agent 驱动（隐含 `-Debug`）；模态对话框转为 stdout 事件，无人值守不卡死 |
| **位置参数 `<file\|dir>...`** | **解析模式（AnalysisMode）**：待解析的 `.ERB` 文件或目录（目录递归展开为 `*.ERB`） |

## 解析模式（AnalysisMode）

给任意位置参数即 `Program.AnalysisMode = true`，与正常启动的差异：

1. **目标直接全编译**：`ErbLoader.LoadErbList(AnalysisFiles)` 只编译指定文件、且全部编译，
   **不经过懒加载表**——正常启动只建索引、调用时才编译的「冷文件」在解析模式下强制受检。
2. **警告全量输出**：`ParserMediator` 跳过 `DisplayWarningLevel` 过滤
   （`if (level < Config.DisplayWarningLevel && !Program.AnalysisMode)`），Lv1/Lv2 全部出现。
3. **输出＝`Analysis.log`**（与正常启动的 `emuera.log` 是**两个文件**，查结果别找错）；末尾出现
   「文件解析完成：结果输出至Analysis.log」即完成。
4. CSV／ERD 照常加载 ⇒ **键字典（CSV 列 2 ∪ `.als`）先建好再做标识符解析检查**
   （`无法解析的标识符` 系警告即对该字典的检查结果）。

```bat
REM 例：目录
Emuera_skia.exe D:\path\to\ERB\DLC
REM 例：单文件
Emuera_skia.exe D:\path\to\M_KOJO_KX_イベント.ERB
```

## --CliDebug（agent 驱动协议）

stdin/stdout **JSON Lines**：启动输出 `{"type":"hello","protocol":1,...}` → `{"type":"ready"}`，
此后 `{"type":"out","text":...}`（控制台输出流）、命令应答 `{"type":"result","id":...}`／
`{"type":"error",...}`，退出时 `{"type":"exit"}`。

| 命令 | 功能 |
|---|---|
| `input` / `click` / `key` | 输入／点按钮／发键 |
| `debug` (`expr`) | 调试表达式求值 |
| `watch` / `trace` | 变量监视／执行轨迹 |
| `screen` / `state` / `buttons` | 画面／状态／可选项 |
| `log` | 取控制台日志 |
| **`quit`** | **干净退出**（保证日志刷盘） |

### 无头语法检查（无人值守·已实证）

```bash
{ sleep 50; echo '{"cmd":"quit","id":1}'; } | \
  Emuera_skia.exe --CliDebug 'D:\path\to\ERB\DLC' > clidebug_out.jsonl
```

解析输出（含警告）以 `out` 事件流入 stdout JSONL，`quit` 干净退出。
**等待时长按目标规模调整**（全仓级 120s+）。exit 0＝正常终止。

## 警告分类与闸门运用（⚠️ 重要）

解析模式输出**含存量的全量**警告，闸门（CI／批量审查）必须用**基线 diff** 判定，⛔ 要求绝对零：

| 分类 | 实测样例（某 ERA 树 ERB/DLC＝370 条） | 性质 |
|---|---|---|
| `%%中的表达式结果不是字符串` | 298 条 | FORM 串风格告警（运行期可印数值）。**存量·无害** |
| 裸标识符（`GMF_ERROR_INFO_PRINT` 等） | 34 条 | **解析模式 artifact**：孤立编译下，同文件后段／解析集外定义的函数前向引用被当「未定义」。正常启动不出现 |
| 数值⇔字符串运算／赋值／三目 | 约 30 条 | 类型不匹配气味，值得逐条 triage（可能真有实害） |

键解析类（退役标识符、缺别名）＝`无法解析的标识符`（Lv2）与
`xxx.csv中没有"…"的定义`（Lv1）——这两类是**真缺陷**，直接当缺陷处置。

## 相关

- 懒加载机制与启动日志的覆盖面（本页应用的闸门运用细节）：引擎知识库 `lazyloading/`
- 实现：`Program.cs`（选项定义＋AnalysisFiles 收集）、`Process.cs`（`LoadErbList` 分支）、
  `ParserMediator.cs`（警告过滤的解析模式豁免）、`UI/CliDebug/CliDebugHost.cs`（协议）
