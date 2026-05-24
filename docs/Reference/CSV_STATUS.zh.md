---
hide:
  - toc
---

# CSV状态获取函数

| 函数名                                                                | 参数         | 返回值   |
| :-------------------------------------------------------------------- | :----------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`CSVBASE`](./CSV_STATUS.zh.md)     | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVCSTR`](./CSV_STATUS.zh.md)     | `int`, `int` | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVABL`](./CSV_STATUS.zh.md)      | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVTALENT`](./CSV_STATUS.zh.md)   | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVMARK`](./CSV_STATUS.zh.md)     | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVEXP`](./CSV_STATUS.zh.md)      | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVRELATION`](./CSV_STATUS.zh.md) | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVJUEL`](./CSV_STATUS.zh.md)     | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVEQUIP`](./CSV_STATUS.zh.md)    | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVCFLAG`](./CSV_STATUS.zh.md)    | `int`, `int` | `int`    |

!!! info "API"

    ```  { #language-erbapi }
	CSVBASE charaNo, index
	CSVCSTR charaNo, index
	CSVABL charaNo, index
	CSVTALENT charaNo, index
	CSVMARK charaNo, index
	CSVEXP charaNo, index
	CSVRELATION charaNo, index
	CSVJUEL charaNo, index
	CSVEQUIP charaNo, index
	CSVCFLAG charaNo, index
    ```
	这是直接调用 CSV 中定义的值的函数。  
	第一参数为角色注册编号 (NO)，第二参数为各变量的索引。  
	`CSVCSTR` 会将字符串赋值给 `RESULTS`，其他函数则将数值赋值给 `RESULT`。  

!!! hint "提示"

    同时支持指令和表达式函数两种形式。

!!! example "例" 
    
	``` { title Chara0.csv }
	番号,0
	名前,絵夢 江良
	呼び名,江良

	能力,0,3
	経験,1,200
	CSTR,2,このキャラはテスト用キャラです
	```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORMW %CSVNAME(0)%のABL:0={CSVABL(0, 0)} EXP:1={CSVEXP(0, 1)} %CSVCSTR(0, 2)%
    ``` 
    ``` title="結果"
	絵夢 江良のABL:0=3 EXP:1=200 このキャラはテスト用キャラです
    ```

### 相关项目
- [CSVNAME系列](CSVNAME.zh.md)