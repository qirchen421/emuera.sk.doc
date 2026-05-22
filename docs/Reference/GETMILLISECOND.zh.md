---
hide:
  - toc
---

# GETMILLISECOND

| 函数名                                                                       | 参数 | 返回值 |
| :--------------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETMILLISECOND`](./GETMILLISECOND.zh.md) | 无   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int GETMILLISECOND
    ```
    获取自公元0001年1月1日起经过的时间，单位为毫秒。  
    由于可以直接进行加减运算，因此比 GETTIME 更适合用于测量经过的时间。  
    请注意，返回值的精度取决于运行环境，大约在十几到几十毫秒之间。  
    （如果仅经过了几毫秒，可能会返回相同的值）  
    若用于性能测量，请留意此点。

!!! hint "提示"

    该函数既可作为指令使用，也可在表达式中作为函数使用。

### 相关项目
- [GETSECOND](GETSECOND.zh.md)
- [GETTIME](GETTIME.zh.md)