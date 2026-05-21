# 版本演进对照

!!! tip "概要"

    比较 ERABASIC 生态各版本的功能演进。以 Emuera 为基准线，整理 EM+EE 及各变体的扩展。

---

## 演进树

```
Emuera (基准线 — 现代 ERABASIC 的实际起点)
  │
  └─ EmueraEM+EE (功能扩展)
       │
       ├─ EM 扩展：资源释放、WebP、压缩存档、图标指定...
       └─ EE 扩展：音频、热键、剪贴板、TTF/OTF 动态加载...
            │
            ├─ Skia (SkiaSharp版)
            │    ├─ 懒加载机制
            │    ├─ 插件系统
            │    ├─ MAP 增强函数 (9个新增，共21函数)
            │    ├─ SQL 增强 (XML导入导出)
            │    ├─ 音频处理 (SoundTouch)
            │    └─ VARIADIC 可变参数
            │
            ├─ DotNet (.NET 8 版)
            │    ├─ SkiaSharp 跨平台渲染
            │    ├─ SQLite 内置
            │    ├─ 并行加载
            │    ├─ G_POLYGON 多边形绘制
            │    └─ 多语言 resx
            │
            └─ Emuera-SkiaX (Android 移植)
                 ├─ Skia 内核 + Xamarin 框架
                 ├─ 触屏优化 + 虚拟手柄
                 ├─ 画廊视图 + 悬浮工具栏
                 └─ 字形回退 + 懒加载适配
```

> 💡 eramaker 是 ERABASIC 的起源，但功能已严重落后。Emuera 修复了其所有已知 bug 并大幅扩展了语法，是现代 ERABASIC 的实际基准。

---

## 功能对比表

### 基础功能

| 功能领域 | Emuera | EM+EE | Skia | DotNet |
|:---|:---:|:---:|:---:|:---:|
| 基本变量 | ✅ | ✅ | ✅ | ✅ |
| 用户定义变量 | ✅ #DIM/#DIMS | ✅ | ✅ VARIADIC | ✅ |
| 表达式函数 | ✅ #FUNCTION | ✅ | ✅ | ✅ |
| 循环语句 | ✅ FOR/WHILE/DO | ✅ | ✅ | ✅ |
| SELECTCASE | ✅ | ✅ | ✅ | ✅ |
| HTML_PRINT | ✅ | ✅ | ✅ | ✅ |

### 扩展功能

| 功能领域 | Emuera | EM+EE | Skia | DotNet |
|:---|:---:|:---:|:---:|:---:|
| Graphics 绘图 | ✅ | ✅ | ✅ | ✅ G_POLYGON |
| MAP 关联数组 | — | ✅ 12函数 | ✅ 21函数 | — 6函数(DICT) |
| DataTable | — | ✅ | ✅ | — |
| XML 操作 | — | ✅ | ✅ | — |
| 音频播放 | — | ✅ | ✅ SoundTouch | ✅ |
| SQL 数据库 | — | — | ✅ | ✅ |
| 懒加载 | — | — | ✅ | — |
| 插件系统 | — | — | ✅ | — |
| 并行加载 | — | — | — | ✅ |
| 多语言 | — | — | 双语XML | 三语resx |

### EM+EE 特有扩展

| 功能 | 扩展来源 | 详情 |
|:---|:---|:---|
| 资源占用解除 | EM | 程序运行中避免图片文件常驻占用 |
| WebP 格式支持 | EM | 资源文件的 WebP 格式支持 |
| 压缩存档 | EM | 存档数据压缩保存 |
| 音频支持 | EE | PLAYSOUND / PLAYBGM / STOPBGM |
| 热键扩展 | EE | Ctrl+T/R/O 快捷键 |
| TTF/OTF 动态加载 | EE | 字体动态加载 |

### Skia 版特有扩展

| 功能 | 详情 |
|:---|:---|
| 懒加载 | 基于函数调用的 ERB 文件动态加载 |
| MAP 增强函数 | MAP_EXISTS / MAP_REMOVE / MAP_COPY 等9个新增 |
| SQL 增强 | SQL_XMLEXPORT / SQL_XMLIMPORT |
| VARIADIC | VARIADIC ARG/ARGS/ARGF 可变参数 |
| SoundTouch | 音频变速变调 |

### EM+EE 继承功能

| 功能 | 详情 |
|:---|:---|
| 插件系统 | 外部 DLL 功能扩展（继承自 EM+EE 上游） |

---

## 详细信息

| 版本 | 概要页面 |
|:---|:---|
| EM+EE | [EM+EE 功能概要](../EMEE/EMEE_Summary.zh.md) |
| Skia 版 | [Skia 版功能概要](../Skia/Skia_Summary.zh.md) |
| Emuera | [Emuera 概要](../Emuera/README.md) |
| eramaker | [eramaker 概要](../eramaker/README.md) |
