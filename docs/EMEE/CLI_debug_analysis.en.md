---
---

# CLI Options and Headless Syntax Checking

> The command-line interface of EM+EE (including the Skia variant), implemented with `System.CommandLine`:
> **AnalysisMode** headless syntax checking and the `--CliDebug` agent-driving protocol.
> Implementation: `Program.cs` (`Main`), `Runtime/Script/Process.cs`,
> `Runtime/Script/Process.LazyLoading.cs`, `UI/CliDebug/CliDebugHost.cs`.

## Command-line options

| Option | Description |
|---|---|
| `--ExeDir <dir>` | Launch the Era in the given folder (working directory) |
| `-Debug` (`-debug`/`-DEBUG`) | Debug mode |
| `-GenLang` | Generate language-file template |
| `--CliDebug` | **CLI debug mode**: stdin/stdout JSON Lines protocol for agent driving (implies `-Debug`); modal dialogs are converted to stdout events so unattended runs never block |
| **Positional `<file\|dir>...`** | **AnalysisMode**: `.ERB` files or directories to analyze (directories are expanded to `*.ERB` recursively) |

## AnalysisMode

Passing any positional argument sets `Program.AnalysisMode = true`, which differs from a normal launch:

1. **Direct full compilation of the targets**: `ErbLoader.LoadErbList(AnalysisFiles)` compiles exactly the
   listed files — **bypassing the lazy-loading table**. "Cold" files that a normal startup only indexes
   (bodies compile on call) are force-checked in this mode.
2. **All warnings, unfiltered**: `ParserMediator` skips the `DisplayWarningLevel` filter
   (`if (level < Config.DisplayWarningLevel && !Program.AnalysisMode)`), so Lv1/Lv2 warnings all appear.
3. **Output goes to `Analysis.log`** — a **separate file** from the normal-launch `emuera.log`.
   The trailing line 「文件解析完成：结果输出至Analysis.log」 marks completion.
4. CSV/ERD loading happens as usual, so the **key dictionaries (CSV column 2 ∪ `.als`) are built before
   identifier-resolution checking** (`无法解析的标识符` warnings are checked against those dictionaries).

```bat
REM Directory example
Emuera_skia.exe D:\path\to\ERB\DLC
REM Single-file example
Emuera_skia.exe D:\path\to\M_KOJO_KX_イベント.ERB
```

## --CliDebug (agent-driving protocol)

JSON Lines on stdin/stdout: on startup `{"type":"hello","protocol":1,...}` → `{"type":"ready"}`,
then `{"type":"out","text":...}` (console output stream), command responses
`{"type":"result","id":...}` / `{"type":"error",...}`, and `{"type":"exit"}` on shutdown.

| Command | Purpose |
|---|---|
| `input` / `click` / `key` | Send input / click buttons / send keys |
| `debug` (`expr`) | Evaluate a debug expression |
| `watch` / `trace` | Variable watch / execution trace |
| `screen` / `state` / `buttons` | Screen / state / selectable buttons |
| `log` | Fetch the console log |
| **`quit`** | **Clean exit** (guarantees log flush) |

### Headless syntax checking (unattended, verified)

```bash
{ sleep 50; echo '{"cmd":"quit","id":1}'; } | \
  Emuera_skia.exe --CliDebug 'D:\path\to\ERB\DLC' > clidebug_out.jsonl
```

The analysis output (including warnings) streams to stdout as `out` events; `quit` exits cleanly.
**Scale the wait to the target size** (120s+ for a full tree). Exit code 0 = clean termination.

## Warning taxonomy and gate usage (⚠️ important)

AnalysisMode emits **the full warning set including pre-existing stock**, so a gate (CI / batch review)
must judge by **baseline diff**, never by absolute zero:

| Class | Measured sample (one ERA tree, ERB/DLC = 370) | Nature |
|---|---|---|
| `%%中的表达式结果不是字符串` (%% expression result is not a string) | 298 | FORM-string style warning (runtime prints numbers fine). **Stock, harmless** |
| Bare identifiers (`GMF_ERROR_INFO_PRINT` etc.) | 34 | **AnalysisMode artifact**: isolated compilation flags forward references to functions defined later in the same file or outside the analysis set. Not emitted on a normal launch |
| Number⇔string operators / assignment / ternary | ~30 | Type-mismatch smells; triage individually (real harm possible) |

Key-resolution findings (retired identifiers, missing aliases) are exactly
`无法解析的标识符` (Lv2) and `xxx.csv中没有"…"的定义` (Lv1) — treat those as **true defects**.

## See also

- Lazy-loading mechanism and startup-log coverage (gate usage details): engine knowledge base `lazyloading/`
- Implementation: `Program.cs` (option definitions, AnalysisFiles collection), `Process.cs`
  (`LoadErbList` branch), `ParserMediator.cs` (warning-filter exemption in analysis mode),
  `UI/CliDebug/CliDebugHost.cs` (protocol)
