---
hide:
  - toc
---

# GETSECOND

| 函数名                                                             | 参数 | 返回值 |
| :----------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETSECOND`](./GETSECOND.md) | 无   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GETTIME
    ```
	获取自公元0001年1月1日起经过的时间（以秒为单位），并赋值给RESULT:0。  
	由于可以直接进行加减运算，因此比GETTIME更适合用于计算经过的时间等场景。  

!!! hint "提示"

    该函数同时支持作为指令和表达式函数使用。

### 相关项目
- [GETMILLISECOND](GETMILLISECOND.md)
- [GETTIME](GETTIME.md)