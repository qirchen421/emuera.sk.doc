---
hide:
  - toc
---

# PRINTCPERLINE

| 函数名 | 参数 | 返回值 |
| :--- | :--- | :--- |
| ![](../assets/images/IconEmuera.webp)[`PRINTCPERLINE`](./PRINTCPERLINE.zh.md) | 无 | `int` |

!!! info "API"

    ```  { #language-erbapi }
	int PRINTCPERLINE
    ```
	将[配置`PRINTC排列数量`](../Emuera/config.md#printc)中指定的数值赋值给RESULT:0，或返回该值。默认值为3。  
	等同于`RESULT = GETCONFIG("PRINTC排列数量")`  

!!! hint "提示"

    支持指令和表达式函数两种用法。

### 相关项目
- [PRINTCLENGTH](PRINTCLENGTH.zh.md)