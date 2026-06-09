# 资源设置 — 图像资源的准备方法

!!! info "前置知识"

    - **前置章节**：[HTML 标签语法](html-syntax.zh.md)（`<img>` 标签的 `src` 属性引用资源名）
    - **Reference 分类**：[图像处理相关](../Reference/README.zh.md#image)

    本页讲解如何在 Emuera 中准备和使用图像资源。各节末尾标注变体标签，标明该特性由哪个变体支持。

    | 标签 | 变体 |
    |------|------|
    | *(无)* | Emuera 原版即支持 |
    | **EM+EE** | EM+EE 追加 |
    | **Skia** | Skia 变体追加 |

---

## 概要

在 Emuera 中显示图像需要两个要素：

1. **图像文件**（PNG/JPG/BMP/WebP/GIF）放在 `resources` 文件夹中
2. **资源定义文件**（CSV）声明资源名与图像的对应关系

资源名用于 `<img src='资源名'>` 的 `src` 属性或 `SPRITECREATED("资源名")` 等式中函数。

---

## 资源定义文件（CSV）

在 `resources` 文件夹中放置 CSV 格式的文本时，会作为资源定义文件读取。文件可放在子文件夹中（1.823 及以上版本）。

### 精灵定义

```csv
;注释行
资源名, 文件名, x, y, width, height, posx, posy, delay, destWidth, destHeight
```

| 参数 | 位置 | 必需 | 说明 |
|------|------|------|------|
| 资源名 | 1 | ✅ | 用于 `<img src='资源名'>` 或 `SPRITECREATED("资源名")`。不可重复 |
| 文件名 | 2 | ✅ | 图像文件名（含扩展名），相对于 CSV 文件的路径。不能指定上级目录 |
| x, y, width, height | 3–6 | | 源图像裁剪区域（像素）。省略时使用整个图像 |
| posx, posy | 7–8 | | 图像相对位置偏移。可通过 `SPRITEPOS`/`SPRITEMOVE` 动态修改。省略时为 `0,0` |
| delay | 9 | | 仅动画帧有效。该帧显示时间（毫秒）。省略时为 `1000ms` |
| destWidth, destHeight | 10–11 | | 输出尺寸（像素）。省略时使用裁剪区域尺寸 |

!!! tag-variant "Skia"

    `destWidth`/`destHeight` 参数在 Skia 版中通过 SQLite 元数据索引存储，渲染时按需解码。

### 动画精灵定义

```csv
资源名, ANIME, width, height
资源名, 文件名, x, y, width, height, posx, posy, delay, destWidth, destHeight
资源名, 文件名, x, y, width, height, posx, posy, delay, destWidth, destHeight
……
```

首行写 `ANIME` 并指定精灵整体尺寸（`width, height` 必须为正整数，不可省略）。后续行定义各帧。

动画精灵在 `INPUT` 等待期间默认不重绘。执行 `SETANIMETIMER` 可启用等待期间的重绘。

---

## 支持的图像格式

| 格式 | Emuera | EM+EE | Skia | 说明 |
|------|--------|-------|------|------|
| BMP | ✅ | ✅ | ✅ | 无压缩，文件较大 |
| JPG | ✅ | ✅ | ✅ | 有损压缩，不支持透明 |
| PNG | ✅ | ✅ | ✅ | 无损压缩，支持透明 |
| WebP | — | ✅ | ✅ | 高压缩率，支持透明和动画 |
| GIF（动画） | — | — | ✅ | 支持多帧动画 |

也可以通过 `GCREATEFROMFILE` 或 `SPRITECREATEFROMFILE` 在 ERB 中动态加载图像。

---

## Skia 版的资源管理机制 { #skia-resource-management }

!!! tag-variant "Skia"

    Skia 版对图像资源管理进行了全面重构，核心变化是从"启动时全量加载"改为"按需加载 + 分层缓存"。

### 懒加载索引

CSV 预加载时仅建立 SQLite 内存索引（资源名 → 文件路径 + 裁剪区域 + 输出尺寸），图片数据 0 字节占用。首次渲染时才解码为 `SKBitmap`。

这意味着无论 CSV 中定义了多少资源，启动时的内存消耗仅取决于索引大小，而非图片总量。

### SharedBitmapCache — 全局位图池

全局 LRU 位图池，最大容量 200 张 `SKBitmap`，以**文件路径**为键。

- 同一文件只解码一次，多个精灵共享同一位图
- `ConstImage` 仅记录文件路径，不持有 `SKBitmap` 引用
- 渲染时通过 `SharedBitmapCache.Get(filepath)` 按需解码
- 超过容量时，最久未使用的位图被淘汰（Dispose），下次访问时重新解码

### AnimSpriteCache — 动画精灵缓存

LRU 缓存，最大容量 6 个动画精灵，以**文件路径**为键。

- 仅管理多帧 GIF/WebP 动画（`SpriteAnimated`），不管理 CSV ANIME 拼帧动画
- 超出容量时 Evict 释放全部帧数据，再次访问时重新解码
- 解决了 Sprite Sheet 模式下同一文件重复解码导致的内存爆炸

### 两种动画精灵的缓存差异

| 特性 | CSV ANIME（SpriteAnime） | GIF/WebP 动画（SpriteAnimated） |
|------|--------------------------|-------------------------------|
| 帧来源 | 多个独立文件或同一文件的不同区域 | 单个多帧文件 |
| 缓存机制 | 每帧通过 SharedBitmapCache（max 200） | 整体通过 AnimSpriteCache（max 6） |
| 内存占用 | 与帧文件数成正比 | 与动画数成正比（帧数据整体管理） |
| 淘汰行为 | 单帧位图被 LRU 淘汰 | 整体 Evict/Reload |

---

## Skia 版的资源使用建议

!!! tag-variant "Skia"

### 优先使用 CSV 注册，而非运行时动态加载

Skia 版的懒加载索引使 CSV 注册的资源在启动时零内存开销，首次渲染时才按需解码。因此**建议将图像资源注册到 CSV 中，由系统统一管理**，而非通过 `SPRITECREATEFROMFILE` 或 `GCREATEFROMFILE` 在脚本层手动加载和释放。

运行时动态加载的适用场景：

| 场景 | 推荐方式 | 理由 |
|------|---------|------|
| 通用图像资源 | CSV 注册 | 系统统一管理生命周期，无需手动 Dispose |
| 仅使用一次的临时精灵 | `SPRITECREATEFROMFILE` | 用完即释放，不浪费 CSV 索引 |
| GDRAW 系列绘制的艺术字/图形 | `GCREATEFROMFILE` | GraphicsImage 是独立画布，不经过 SharedBitmapCache |

!!! warning "SPRITECREATEFROMFILE 的注意事项"

    `SPRITECREATEFROMFILE` 创建的精灵注册在 `activeSprites` 中，但没有 CSV 元数据索引。脚本必须在使用完毕后调用 `SPRITEDISPOSE` 释放，否则精灵会持续占用内存。相比之下，CSV 注册的精灵由系统在 `RELOAD` 或退出时统一释放。

### 动画精灵：优先使用多帧文件格式

CSV ANIME（SpriteAnime）的每一帧如果来自不同的图像文件，每帧都会在 SharedBitmapCache 中占用一个槽位。当动画帧数超过 200 时，LRU 淘汰会导致频繁的解码/释放循环，造成内存占用暴增和性能下降。

**推荐做法**：

| 方案 | 说明 | 缓存占用 |
|------|------|---------|
| 多帧 GIF/WebP | 一个文件包含全部帧 | AnimSpriteCache 1 个槽位 |
| 精灵表（Sprite Sheet） | 将全部帧拼接到一张图上，CSV 中用裁剪区域指定每帧 | SharedBitmapCache 1 个槽位 |
| CSV ANIME + 多文件 | 每帧一个独立文件 | SharedBitmapCache N 个槽位（不推荐超过 200 帧） |

!!! example "精灵表示例"

    将 8 帧动画拼成一张 8×1 的胶卷图 `walk.png`（每帧 64×64，总图 512×64）：

    ```csv
    WALK, ANIME, 64, 64
    WALK, walk.png, 0, 0, 64, 64, 0, 0, 100
    WALK, walk.png, 64, 0, 64, 64, 0, 0, 100
    WALK, walk.png, 128, 0, 64, 64, 0, 0, 100
    WALK, walk.png, 192, 0, 64, 64, 0, 0, 100
    WALK, walk.png, 256, 0, 64, 64, 0, 0, 100
    WALK, walk.png, 320, 0, 64, 64, 0, 0, 100
    WALK, walk.png, 384, 0, 64, 64, 0, 0, 100
    WALK, walk.png, 448, 0, 64, 64, 0, 0, 100
    ```

    所有帧共享同一个文件 `walk.png`，SharedBitmapCache 仅占 1 个槽位。

---

## 与原版的差异

原版 Emuera 在启动时将 CSV 指定的所有图像文件展开到内存中并持续占用。因此原版建议"将图像合成为单一文件"以减少内存占用。

Skia 版改为按需加载 + LRU 缓存，内存占用大幅降低。多文件场景下 `SharedBitmapCache` 会自动管理解码和缓存，"合成单一文件"不再是内存优化的必要手段——但精灵表仍然是动画精灵的最佳实践，原因不是内存，而是缓存效率（1 个槽位 vs N 个槽位）。

---

## 相关项目

- [HTML 标签语法](html-syntax.zh.md) — `<img>` 标签的 `src` 属性引用资源名
- [SPRITECREATEFROMFILE](../Reference/SPRITECREATEFROMFILE.zh.md) — 运行时图像加载（Skia）
- [资源文件（历史）](../Emuera/resources.zh.md) — 原版 Emuera 的资源设置说明
