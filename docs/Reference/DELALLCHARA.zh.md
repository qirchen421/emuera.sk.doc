---
hide:
  - toc
---

# DELALLCHARA

| 函数名                                                                 | 参数 | 返回值 |
| :--------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`DELALLCHARA`](./DELALLCHARA.zh.md) | 无   | 无     |

!!! info "API"

    ```  { #language-erbapi }
	DELALLCHARA
    ```
	删除所有已注册的角色。 效果等同于以下脚本：

    ```  { #language-erbapi }
	REPEAT CHARANUM
		DELCHARA 0
	REND
	```

!!! hint "提示"

    仅支持作为命令使用。

### 相关项目
- [DELCHARA](DELCHARA.zh.md)