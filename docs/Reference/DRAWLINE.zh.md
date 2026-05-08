---
hide:
  - toc
---

# DRAWLINE

| 函数名                                                             | 参数 | 返回值 |
| :----------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`DRAWLINE`](./DRAWLINE.md) | 无   | 无     |

!!! info "API"

    ```  { #language-erbapi }
	DRAWLINE
    ```
    从屏幕右端到左端用 `-` 画一条线

!!! hint "提示"

    仅支持指令形式。

!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		DRAWLINE
		WAIT
    ``` 
    ``` title="結果"
	------------------------------------------------------------------------------------------------------------------------------------------------
    ```

### 相关项目
- [CUSTOMDRAWLINE](CUSTOMDRAWLINE.md)