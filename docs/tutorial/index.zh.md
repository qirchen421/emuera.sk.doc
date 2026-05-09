# ERABASIC 教程

!!! tip "学习路径"

    本教程以 **Emuera** 为基准线，按照 **Emuera → EM+EE → 各变体** 的演进路线组织。eramaker 仅作为历史参考。

---

## 🚀 快速开始

| 如果你想要... | 请从这里开始 |
|:---|:---|
| 了解什么是 era 游戏 | [era 游戏是什么](#era-游戏是什么) |
| 第一次编写 ERB 脚本 | [第一个 ERB 程序](#第一个-erb-程序) |
| 从基础系统学习 | [ERABASIC 简介](intro.zh.md) |
| 查找某个指令的用法 | [指令参考手册](../Reference/README.md) |
| 了解 EM+EE 有什么新功能 | [EM+EE 功能概览](../EMEE/EMEE_Summary.zh.md) |
| 了解 Skia 版有什么新功能 | [Skia 版功能概览](../Skia/Skia_Summary.zh.md) |

---

## 📋 教程构成

| 章节 | 内容 | 适合 |
|:---|:---|:---|
| [📖 简介](intro.zh.md) | ERABASIC 是什么、Hello World、版本演进 | 初学者 |
| [🔢 值、类型与变量](values-types.zh.md) | 三类型体系、变量命名、类型转换 | 初学者 |
| [📝 赋值语句](assignment.zh.md) | 基本赋值、字符串赋值、复合赋值、自增自减、批量赋值 | 初学者 |
| [🖥️ 基本输出](basic-output.zh.md) | PRINT 系列、参数类型、行为后缀、格式化输出 | 初学者 |
| [📄 ERB 文件格式扩展](erb-format-extension.zh.md) | 行连接、#DIM/#DIMS、#FUNCTION、事件修饰符、条件编译 | 初学者~中级者 |
| [🔔 事件函数](event-functions.zh.md) | 事件函数 vs 系统函数、调用机制、#PRI/#LATER/#SINGLE/#ONLY | 初学者~中级者 |
| [🔤 FORM 语法](form-syntax.zh.md) | 格式化字符串、变量替换、填充对齐、\@三元运算符、三连标识符、转义规则 | 初学者~中级者 |
| [🔀 条件分支](condition.zh.md) | IF/SIF/SELECTCASE | 初学者 |
| [🔄 循环](loop.zh.md) | REPEAT/FOR/WHILE/DO、CONTINUE/BREAK | 初学者 |
| [⏭️ 跳转](jump.zh.md) | GOTO/$标签、GOTO 与循环的交互 | 初学者 |
| [📞 函数与 CALL](call.zh.md) | @标签、CALL/JUMP、RETURN、参数传递、INPUT | 初学者 |
| [📦 变量声明系统](variable-declaration.zh.md) | CONST/DYNAMIC/STATIC/GLOBAL/SAVEDATA/CHARADATA/REF/OUT、函数签名与声明的关系、VARIADIC | 中级者 |
| [🔤 字符串操作](../Reference/TOSTR.md) | 字符串函数、FORM 语法 | 中级者 |
| [🖥️ 输入输出](../Reference/PRINT.md) | PRINT/INPUT/WAIT | 初学者 |
| [🗃️ 数据结构](../Reference/MAP_MANAGE.md) | 数组/MAP/DataTable/XML | 中级者 |
| [🎨 图形与音频](../Reference/GCREATE.md) | 图形操作/Sprite/HTML/音频 | 中级者~高级者 |
| [🌐 HTML 标签语法](html-syntax.zh.md) | HTML_PRINT 标签、属性、变体差异 | 中级者~高级者 |
| [💾 存档与持久化](../Reference/SAVEDATA.md) | 存档/全局变量/角色数据 | 中级者 |
| [⚡ 命令 vs 表达式](command-vs-expression.zh.md) | 命令语法与表达式语法的边界、RESULT 污染、CALLF | 中级者~高级者 |
| [🔧 高级主题](../Emuera/debug.zh.md) | 调试、配置、兼容性、反模式 | 高级者 |
| [🗺️ 版本演进对照](evolution.zh.md) | Emuera→EM+EE→各变体功能对比 | 所有人 |

---

## 📋 指令速查

| 分类 | 常用指令 | 详见 |
|:---|:---|:---|
| **输出** | `PRINT` `PRINTL` `PRINTFORM` `PRINTBUTTON` | [PRINT 系列](../Reference/PRINT.md) |
| **输入** | `INPUT` `ONEINPUT` `TINPUT` `WAIT` | [输入/等待](../Reference/INPUT.md) |
| **分支** | `IF` `SELECTCASE` `GOTO` | [循环/分支](../Reference/IF.md) |
| **循环** | `REPEAT` `FOR` `WHILE` `DO` | [循环/分支](../Reference/REPEAT.md) |
| **函数** | `CALL` `JUMP` `TRYCALL` `CALLF` | [函数系](../Reference/CALL.md) |
| **变量** | `VARSET` `ARRAYSORT` `SWAP` `CUPCHECK` | [变量操作](../Reference/VARSET.md) |
| **角色** | `ADDCHARA` `DELCHARA` `GETCHARA` `FINDCHARA` | [角色操作](../Reference/ADDCHARA.md) |
| **存档** | `SAVEDATA` `LOADDATA` `SAVEGLOBAL` | [存档操作](../Reference/SAVEDATA.md) |
| **图形** | `GCREATE` `GDRAWG` `SPRITECREATE` | [图像处理](../Reference/GCREATE.md) |
| **音频** | `PLAYSOUND` `PLAYBGM` `EXISTSOUND` | [声音系](../Reference/PLAYSOUND.md) |
| **数据结构** | `MAP_CREATE` `DT_CREATE` `XML_DOCUMENT` | [MAP](../Reference/MAP_MANAGE.md) / [DT](../Reference/DT_MANAGE.md) / [XML](../Reference/XML_MANAGE.md) |
| **系统** | `BEGIN` `THROW` `QUIT` `AWAIT` | [系统流程](../Reference/BEGIN.md) |

---

## era 游戏是什么

era 游戏是一类基于文本的角色扮演/模拟游戏，使用 **ERABASIC** 语言编写脚本。ERABASIC 最初由 eramaker 定义，后经 Emuera 及其变体大幅扩展。现代 ERABASIC 以 Emuera 为基准。

一个 era 游戏的典型文件结构：

```
游戏目录/
├── Emuera.exe          ← 引擎可执行文件
├── CSV/                ← 数据定义文件
│   ├── CHARA0.CSV      ← 角色0的数据
│   ├── item.CSV        ← 物品列表
│   └── VariableSize.csv← 变量大小配置
├── ERB/                ← 脚本文件
│   ├── SYSTEM_TITLE.ERB← 标题画面
│   ├── SHOP.ERB        ← 商店画面
│   └── TRAIN.ERB       ← 训练画面
├── ERH/                ← 头文件（全局变量声明）
│   └── VARIABLE.ERH
├── resource/           ← 图片资源
└── sound/              ← 音频资源
```

## 第一个 ERB 程序

在 `ERB/SYSTEM_TITLE.ERB` 中编写你的第一个函数：

```erabasic
@SYSTEM_TITLE
    PRINTL 欢迎来到 era 世界！
    PRINTL [0] 开始游戏
    PRINTL [1] 读取存档
    INPUT
    IF RESULT == 0
        BEGIN FIRST
    ELSEIF RESULT == 1
        BEGIN LOADGAME
    ENDIF
```

这定义了一个自定义标题画面，显示两个选项并根据用户输入跳转。

---

!!! info "更多资源"

    - **制作手册**：[初级教程](../manual/modification-manual.zh.md) → [中级教程](../manual/eratohowiki-ERBmanual.zh.md)
    - **完整指令参考**：[Reference](../Reference/README.md)
    - **EM+EE 新功能概览**：[EMEE_Summary](../EMEE/EMEE_Summary.zh.md)
    - **Skia 版功能概览**：[Skia 版功能概览](../Skia/Skia_Summary.zh.md)
    - **变更日志**：[Changelog](../Changelog/README.zh.md)
