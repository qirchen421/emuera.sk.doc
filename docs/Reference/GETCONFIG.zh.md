---
hide:
  - toc
---

# GETCONFIG(S)

| 函数名                                                              | 参数     | 返回值   |
| :------------------------------------------------------------------ | :------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`GETCONFIG`](./GETCONFIG.zh.md)  | `string` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETCONFIGS`](./GETCONFIG.zh.md) | `string` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	int GETCONFIG configWord
	string GETCONFIGS configWord
    ```
    获取配置项及 [`replace.csv`](../Emuera/replace.zh.md) 设置项的整数值或字符串值。  
    可获取的项目请参阅[配置](../Emuera/config.zh.md)页面。

!!! hint "提示"

    该函数既可作为指令使用，也可在表达式中使用。

### 相关项目
- [GETCOLOR](GETCOLOR.zh.md)
- [PRINTCPERLINE](PRINTCPERLINE.zh.md)