---
hide:
  - toc
---

# GETTIME

| 函数名                                                             | 参数 | 返回值          |
| :----------------------------------------------------------------- | :--- | :-------------- |
| ![](../assets/images/IconEmuera.webp)[`GETTIME`](./GETTIME.md)     | 无   | `int`, `string` |
| ![](../assets/images/IconEmuera.webp)[`GETTIME()`](./GETTIME.md)   | 无   | `int`           |
| ![](../assets/images/IconEmuera.webp)[`GETTIMES()`](./GETTIME.md)  | 无   | `string`        |

!!! info "API"

    ```  { #language-erbapi }
	GETTIME
	int GETTIME
	string GETTIMES
    ```
	将计算机的当前日期/时间信息赋值给 `RESULT:0` 和 `RESULTS:0`。  
	如果当前日期时间是 2009年3月28日13时5分23秒678毫秒，则 `RESULT:0` 将被赋值为 `20090328130523678`。  
	`RESULTS:0` 将被赋值为 `2009/03/28 13:05:23`。  
	`RESULTS:0` 主要预想用于存档数据的注释。  
	若希望对年月日使用自定义的表示方式，请分解 `RESULT:0` 来使用。  
	另外，`RESULT:0` 的精度取决于运行环境，大约在十几到几十毫秒左右。  
	（如果只经过了几毫秒，可能会返回相同的值）  
	若以性能测量为目的，请注意这一点。

    作为表达式内函数使用的`GETTIME()`和`GETTIMES()`，分别返回执行`GETTIME`命令时赋值给`RESULT:0`和`RESULTS:0`的值。

!!! hint "提示"

    同时支持命令形式和表达式内函数形式。

### 相关项目
- [GETSECOND](GETSECOND.md)
- [GETMILLISECOND](GETMILLISECOND.md)