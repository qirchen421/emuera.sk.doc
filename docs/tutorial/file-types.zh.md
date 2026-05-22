# 文件类型与处理顺序

!!! info "本节对应手册"

    - [ERB 书式](../eramaker/ERB_format.zh.md) — ERB 文件格式
    - [CSV 书式](../eramaker/CSV_format.zh.md) — CSV 文件格式
    - [头文件](../Emuera/ERH.zh.md) — ERH 头文件规格

---

## 三种文件类型

ERABASIC 程序由三种文件组成：

| 扩展名 | 用途 | 处理顺序 | 类比 |
|--------|------|----------|------|
| `.CSV` | 数据定义（变量名映射、角色数据、数组大小） | **最先** | C 的 `.h` 声明 + 数据库种子 |
| `.ERH` | 头文件（全局变量声明、宏定义） | **其次** | C 的 `.h` 头文件 |
| `.ERB` | 主脚本（函数定义和执行代码） | **最后** | C 的 `.c` 源文件 |

!!! important "处理顺序不可逆"

    CSV → ERH → ERB 的处理顺序是固定的。这意味着：
    - CSV 中定义的变量名，ERH 和 ERB 中都可以使用
    - ERH 中声明的全局变量，ERB 中可以直接使用
    - ERB 中不能定义 CSV 或 ERH 级别的内容

---

## CSV 文件

CSV 文件定义数据层面的内容，在引擎加载时最先处理。

### 典型文件结构

```
CSV/
├── variable_size.csv     ← 内置变量数组大小
├── _replace.csv          ← 变量名替换映射
├── chara/
│   ├── chara0.csv        ← 角色0的数据
│   └── chara1.csv        ← 角色1的数据
├── item.csv              ← 物品列表
├── talent.csv            ← 素质列表
└── abl.csv               ← 能力列表
```

### variable_size.csv

定义内置变量的数组大小：

```csv
BASE,100
TALENT,1000
ABL,100
EX,100
```

### _replace.csv

变量名替换映射，将显示名映射到内部变量名：

```csv
体力,BASE:0
气力,BASE:1
```

### chara/*.csv

角色数据定义，每个文件定义一个角色：

```csv
; chara0.csv
名前,艾莉娜
CALLNAME,艾莉
BASE:0,1000
BASE:1,500
TALENT:0,1
```

---

## ERH 头文件

ERH 文件声明全局变量和宏，在 ERB 之前处理。

### 典型文件结构

```
ERH/
└── VARIABLE.ERH
```

### 声明语法

```erb
; 全局整数变量
#DIM GAME_TURN, 100

; 全局字符串变量
#DIMS SCENE_TEXT, 50

; 全局浮点变量
#DIMF GAME_SCORE, 100

; 全局常量
#DIM CONST MAX_PARTY = 6

; 跨存档全局变量
#DIM GLOBAL HIGH_SCORE

; 存档保存变量
#DIM SAVEDATA QUEST_FLAG, 100

; 角色数据变量
#DIM CHARADATA CHARA_LEVEL

; 宏定义
#DEFINE MAX_LEVEL 100
```

!!! warning "ERH 中的 #DIM 是全局声明"

    ERH 中的 `#DIM` 声明的是**全局变量**（`IsPrivate=false`），所有 ERB 函数都可以访问。
    ERB 函数内的 `#DIM` 声明的是**私有变量**（`IsPrivate=true`），只有当前函数可以访问。

---

## ERB 脚本文件

ERB 文件包含函数定义和执行代码，最后处理。

### 典型文件结构

```
ERB/
├── SYSTEM_TITLE.ERB      ← 标题画面
├── SHOP.ERB              ← 商店画面
├── TRAIN.ERB             ← 训练画面
├── SHOW_STATUS.ERB       ← 状态显示
└── COM/
    ├── COM0.ERB          ← 命令0
    └── COM1.ERB          ← 命令1
```

### 文件名规则

- 扩展名必须是 `.ERB`，文件名任意
- 引擎按文件名排序加载所有 `.ERB` 文件
- 函数按 `@` 标签行定义，与文件名无关
- 同一函数不能在多个文件中重复定义

---

## 完整加载流程

```
引擎启动
  │
  ├── 1. 加载 CSV 文件
  │     ├── variable_size.csv → 设置内置变量数组大小
  │     ├── _replace.csv → 建立变量名映射
  │     └── chara/*.csv → 加载角色数据
  │
  ├── 2. 加载 ERH 头文件
  │     └── VARIABLE.ERH → 注册全局变量到标识符字典
  │
  ├── 3. 加载 ERB 脚本文件
  │     ├── 解析 @ 标签行 → 建立函数表
  │     ├── 解析 # 预处理行 → 注册私有变量
  │     └── 解析指令行 → 生成执行代码
  │
  └── 4. 调用 @SYSTEM_TITLE（如果存在）
        或显示默认标题画面
```

---

## 下一步

| 你想了解什么 | 前往 |
|:---|:---|
| 行类型与结构 | [行类型](line-types.zh.md) |
| 变量与声明系统 | [声明系统](variable-declaration.zh.md) |
