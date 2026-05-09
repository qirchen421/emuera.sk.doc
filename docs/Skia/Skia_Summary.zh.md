---
---

# Skia功能概览

!!! info "关于本页"

    本页汇总了 **Emuera Skia (Skia 版)** 除 bug 修复外的全部新增功能。
    Skia 版以 EmueraEM+EE 为基础，添加了懒加载、MAP 增强等独有功能。

---

## 凡例

- ![](../assets/images/IconSK.webp) - Skia（Skia 版）中追加、变更、扩展的功能
- ![](../assets/images/IconEM.webp) - EM（EvilMask 版）中追加的功能
- ![](../assets/images/IconEE.webp) - EE（Enter's Edition）中追加的功能

---

## 目录

- [凡例](#凡例)
- [目录](#目录)
- [懒加载机制](#懒加载机制)
- [MAP 增强函数（9 个新增）](#map-增强函数9-个新增)
- [SQL 增强（XML 导入/导出）](#sql-增强xml-导入导出)
- [音频处理 (SoundTouch)](#音频处理-soundtouch)
- [VARIADIC 可变参数](#variadic-可变参数)
- [SELECTCASE 编译期跳转表优化](#selectcase-编译期跳转表优化)
- [DotNet 同步功能](#dotnet-同步功能)
- [功能对比](#功能对比)

---

## ![](../assets/images/IconSK.webp)懒加载机制

!!! summary ""

    在函数调用时动态加载 ERB 文件的机制。避免启动时全量加载，仅按需加载所需函数。

    - 构建函数→文件的映射表
    - `CALL` 时若函数未加载，则加载对应 ERB 文件
    - 大幅缩短大型游戏的启动时间

---

## ![](../assets/images/IconEM.webp)![](../assets/images/IconSK.webp)MAP 增强函数（9 个新增）

!!! summary ""

    在 EM+EE 的 MAP 函数（12 个）基础上扩展，共提供 21 个 MAP 操作函数。

    **新增函数**：

    | 函数 | 说明 |
    |:---|:---|
    | `MAP_EXISTS` | 确认键是否存在 |
    | `MAP_REMOVE` | 删除键 |
    | `MAP_COPY` | 复制映射 |
    | `MAP_MERGE` | 合并映射 |
    | `MAP_KEYRENAME` | 重命名键 |
    | `MAP_SWAP` | 交换值 |
    | `MAP_SUBMAP` | 嵌套映射操作 |
    | `MAP_FROMCSV` | 从 CSV 生成映射 |
    | `MAP_TOCSV` | 映射输出为 CSV |

    详情：[MAP 操作](../Reference/MAP_OPERATION.md) / [MAP 序列化](../Reference/MAP_SERIALIZATION.md)

---

## ![](../assets/images/IconSK.webp)SQL 增强（XML 导入/导出）

!!! summary ""

    在 EM+EE 的 SQL 功能基础上添加 XML 联动。

    | 函数 | 说明 |
    |:---|:---|
    | `SQL_XMLEXPORT` | 将 SQL 查询结果以 XML 格式导出 |
    | `SQL_XMLIMPORT` | 将 XML 数据导入 SQL 表 |

---

## ![](../assets/images/IconEE.webp)![](../assets/images/IconSK.webp)音频处理 (SoundTouch)

!!! summary ""

    在 EE 的音频功能基础上集成 SoundTouch 库，支持变速变调。

    - 音频变速（改变速度，保持音调）
    - 音频变调（改变音程，保持速度）
    - 实时转换播放

---

## ![](../assets/images/IconSK.webp)VARIADIC 可变参数

!!! summary ""

    函数参数声明支持 `VARIADIC ARG/ARGS/ARGF` 可变参数，配合 `ARGLEN()` 获取参数数量。

    ```erabasic
    @MY_FUNC(VARIADIC ARG:0)
    REPEAT ARGLEN()
        PRINTVL ARG:COUNT
    REND
    ```

---

## ![](../assets/images/IconSK.webp)SELECTCASE 编译期跳转表优化

!!! summary ""

    编译期构建 `Dictionary<long/string/double, InstructionLine>` 跳转表，将 SELECTCASE 的 O(n) 线性扫描优化为 O(1) 哈希查找。

    - `SelectCaseJumpTable` 核心类：编译期构建跳转表
    - 支持整数、字符串、浮点数三种键类型
    - 对 case 数量较少的情况自动回退到线性扫描
    - 兼容原有的 FALLTHROUGH 语义

---

## ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)DotNet 同步功能

!!! summary ""

    从 [Emuera.NET](https://gitlab.com/VVIIlet/emuera) 同步的功能。部分功能在同步时进行了重新设计或增强。

    **ERB 函数**：

    | 函数 | 说明 | 与 DotNet 差异 |
    |:---|:---|:---|
    | `GETCSVNOBYNAME` | 通过 NAME 反查角色编号 | 无差异 |
    | `GETCSVNOBYNICKNAME` | 通过 NICKNAME 反查角色编号 | 无差异 |
    | `GETCSVNOBYCALLNAME` | 通过 CALLNAME 反查角色编号 | 无差异 |
    | `GETCSVNOBYMASTERNAME` | 通过 MASTERNAME 反查角色编号 | 无差异 |
    | `MATCHALL` | 数组全量搜索（变量引用） | 重新设计为表达式函数，不污染 RESULT |
    | `MATCHALLEX` | 数组全量搜索（字符串变量名） | 重新设计为表达式函数，不污染 RESULT |

    **性能优化**：

    | 功能 | 说明 |
    |:---|:---|
    | Preload 字节级缓存 | 启动时预加载 ERB/CSV 到内存，`OpenOnCache()` 从缓存读取 |

    **稳定性修复**：

    | 修复 | 说明 |
    |:---|:---|
    | TOINT 边界修复 | 非法输入返回 0 而非崩溃 |
    | METHOD_Instruction Float 分支 | Float 函数用作命令时写入 RESULTF |
    | MainWindow null 检查 | 引擎未初始化时操作不崩溃 |
    | PrintStringBuffer 空检查 | 空输出行不越界 |
    | SKPaint using 资源释放 | 补全遗漏的 `using var` |

---

## 功能对比

| 功能 | EM+EE | Skia 版 | 备注 |
|:---|:---:|:---:|:---|
| MAP 函数 | 12 个 | 21 个 | 新增 9 个 |
| SQL | 基础 | 新增 XML 联动 | 导入/导出 |
| 音频 | 仅播放 | SoundTouch | 变速/变调 |
| 加载 | 全量 | 懒加载 + Preload 缓存 | 面向大型游戏 |
| 函数参数 | 固定长度 | VARIADIC ARG/ARGS/ARGF | 可变参数 |
| SELECTCASE | 线性扫描 | 跳转表优化 | O(n) → O(1) |
| CSV 反查 | 无 | GETCSVNOBY* 4 函数 | 源自 DotNet |
| 数组全量搜索 | MATCH 仅计数 | MATCHALL/MATCHALLEX | 源自 DotNet，重新设计 |
