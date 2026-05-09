# バージョン進化比較

!!! tip "概要"

    ERABASICエコシステムの各バージョンにおける機能の進化を比較します。Emueraをベースラインとし、EM+EEおよび各派生版の拡張を整理します。

---

## 進化ツリー

```
Emuera (ベースライン — 現代ERABASICの事実上の起点)
  │
  └─ EmueraEM+EE (機能拡張)
       │
       ├─ EM拡張：リソース解放、WebP、圧縮セーブ、アイコン指定...
       └─ EE拡張：オーディオ、ホットキー、クリップボード、TTF/OTF動的読み込み...
            │
            ├─ LazyLoading (Skia版)
            │    ├─ 遅延読み込み機構
            │    ├─ プラグインシステム
            │    ├─ MAP拡張関数 (9個追加、計21関数)
            │    ├─ SQL拡張 (XMLインポート/エクスポート)
            │    ├─ オーディオ処理 (SoundTouch)
            │    └─ VARIADIC 可変長引数
            │
            ├─ DotNet (.NET 8版)
            │    ├─ SkiaSharp クロスプラットフォームレンダリング
            │    ├─ SQLite 内蔵
            │    ├─ 並列読み込み
            │    ├─ G_POLYGON 多角形描画
            │    └─ 多言語 resx
            │
            └─ m-emuera (クロスプラットフォーム参考)
                 └─ Avalonia UI + レンダリング再構築
```

> 💡 eramakerはERABASICの起源ですが、機能は大幅に遅れています。Emueraはすべての既知のバグを修正し、構文を大幅に拡張しており、現代のERABASICの事実上のベースラインです。

---

## 機能比較表

### 基本機能

| 機能領域 | Emuera | EM+EE | LazyLoading | DotNet |
|:---|:---:|:---:|:---:|:---:|
| 基本変数 | ✅ | ✅ | ✅ | ✅ |
| ユーザー定義変数 | ✅ #DIM/#DIMS | ✅ | ✅ VARIADIC | ✅ |
| 式関数 | ✅ #FUNCTION | ✅ | ✅ | ✅ |
| ループ文 | ✅ FOR/WHILE/DO | ✅ | ✅ | ✅ |
| SELECTCASE | ✅ | ✅ | ✅ | ✅ |
| HTML_PRINT | ✅ | ✅ | ✅ | ✅ |

### 拡張機能

| 機能領域 | Emuera | EM+EE | LazyLoading | DotNet |
|:---|:---:|:---:|:---:|:---:|
| Graphics描画 | ✅ | ✅ | ✅ | ✅ G_POLYGON |
| MAP連想配列 | — | ✅ 12関数 | ✅ 21関数 | — 6関数(DICT) |
| DataTable | — | ✅ | ✅ | — |
| XML操作 | — | ✅ | ✅ | — |
| オーディオ再生 | — | ✅ | ✅ SoundTouch | ✅ |
| SQLデータベース | — | — | ✅ | ✅ |
| 遅延読み込み | — | — | ✅ | — |
| プラグインシステム | — | — | ✅ | — |
| 並列読み込み | — | — | — | ✅ |
| 多言語 | — | — | 双語XML | 三語resx |

### EM+EE固有の拡張

| 機能 | 拡張元 | 詳細 |
|:---|:---|:---|
| リソース占有解除 | EM | プログラム動作中の画像ファイル常時占用回避 |
| WebP形式対応 | EM | リソースファイルのWebP形式サポート |
| 圧縮セーブ | EM | セーブデータの圧縮保存 |
| オーディオ対応 | EE | PLAYSOUND / PLAYBGM / STOPBGM |
| ホットキー拡張 | EE | Ctrl+T/R/O ショートカット |
| TTF/OTF動的読み込み | EE | フォントの動的ロード |

### Skia版固有の拡張

| 機能 | 詳細 |
|:---|:---|
| 遅延読み込み | 関数呼び出しに基づくERBファイルの動的ロード |
| MAP拡張関数 | MAP_EXISTS / MAP_REMOVE / MAP_COPY 等9個追加 |
| SQL拡張 | SQL_XMLEXPORT / SQL_XMLIMPORT |
| VARIADIC | VARIADIC ARG/ARGS/ARGF による可変長引数 |
| SoundTouch | 音声のテンポ・ピッチ変更 |

### EM+EE からの継承機能

| 機能 | 詳細 |
|:---|:---|
| プラグインシステム | 外部DLLによる機能拡張（EM+EE 上流から継承） |

---

## 詳細情報

| バージョン | 概要ページ |
|:---|:---|
| EM+EE | [EM+EE機能概要](../EMEE/EMEE_Summary.md) |
| Skia版 | [Skia版機能概要](../Skia/Skia_Summary.md) |
| Emuera | [Emuera仕様](../Emuera/README.md) |
| eramaker | [eramaker仕様](../eramaker/README.md) |
