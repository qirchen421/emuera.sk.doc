---
hide:
  - toc
---

# MONEYSTR

| 函数名                                                             | 参数              | 返回值  |
| :----------------------------------------------------------------- | :---------------- | :------ |
| ![](../assets/images/IconEmuera.webp)[`MONEYSTR`](./MONEYSTR.zh.md)   | `int`, `option`   | `string`|

!!! info "API"

    ```  { #language-erbapi }
	string MONEYSTR
    ```
    对于参数给定的数值，将附有[已设定的货币单位](../Emuera/replace.zh.md)的字符串赋值给`RESULTS:0`或返回。  
    单位的前置/后置也会自动处理。  
    第二个参数与[`TOSTR`](./TOSTR.zh.md)指令类似，是数值字符串化时的转换格式指定符。

!!! hint "提示"

    同时支持指令和表达式函数两种形式。