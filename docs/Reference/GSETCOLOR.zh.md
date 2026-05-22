---
hide:
  - toc
---

# GSETCOLOR

| 函数名                                                             | 参数                       | 返回值 |
| :----------------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GSETCOLOR`](./GSETCOLOR.zh.md) | `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GSETCOLOR gID, cARGB, x, y
    ```
    将指定ID的Graphics对象在指定位置的像素替换为指定颜色。  
    处理成功时，返回非0值。  
    此命令速度并不快。  
    尝试结合[`GGETCOLOR`](./GGETCOLOR.zh.md)命令重写大尺寸图像的整个区域，将无法在实用时间内完成。

!!! hint "提示"

    同时支持指令和表达式函数形式。

### 相关项目
- [GGETCOLOR](GGETCOLOR.zh.md)