---
hide:
  - toc
---

# FUNCTIONNAME

| 函数名                                                             | 参数 | 返回值 |
| :----------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/Icon.webp)[`FUNCTIONNAME`](./FUNCTIONNAME.md) | ``   | ``     |

!!! info "API"

    ```  { #language-erbapi }
    FUNCTIONNAME arg1, arg2
    ```
    Summary

!!! hint "提示"

    支持命令和表达式函数两种形式。

!!! example "示例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        Sample code
    ``` 
    ``` title="结果"

    ```

---

## 手册编写规范

### 凡例图标

| 图标 | 含义 |
|------|------|
| ![](../assets/images/Iconeramaker.webp) | eramaker 中已有的命令 |
| ![](../assets/images/IconEmuera.webp) | Emuera 中追加、变更、扩展的命令 |
| ![](../assets/images/IconEM.webp) | EM（EvilMask 版）中追加的功能 |
| ![](../assets/images/IconEE.webp) | EE（Enter's Edition）中追加的功能 |
| ![](../assets/images/Icondotnet.webp) | [Emuera.NET](https://gitlab.com/VVIIlet/emuera) 中追加的功能 |
| ![](../assets/images/IconSK.webp) | Skia版（LazyLoading）中追加的功能 |
| ![](../assets/images/Iconetc.webp) | 其他贡献者追加的功能 |

### 多图标组合

源自 DotNet 并在 Skia 版同步的功能使用双图标：
```
![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)
```

### 文件命名

- 中文手册：`FUNCTIONNAME.zh.md`
- 英文手册：`FUNCTIONNAME.en.md`（可选）
- 日文手册：`FUNCTIONNAME.md`（默认）
