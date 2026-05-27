---
hide:
  - toc
---

# INPUT(S)

| 函数名                                                        | 参数                    | 返回值     |
| :------------------------------------------------------------ | :---------------------- | :--------- |
| ![](../assets/images/Iconeramaker.webp)[`INPUT`](./INPUT.zh.md)  | (`int`, `int`, `int`)   | `void`     |
| ![](../assets/images/Iconeramaker.webp)[`INPUTS`](./INPUT.zh.md) | (`int`, `int`, `int`)   | `void`     |

!!! info "API"

    ```  { #language-erbapi }
    INPUT (defaultValue, canClick, allowSkip)
    INPUTS (defaultValue, canClick, allowSkip)
    ```
    等待输入，`INPUT`将输入的数字赋值给`RESULT`，`INPUTS`将输入的字符串赋值给`RESULTS`  
    若设置了第一个参数，则在未输入任何内容时，将默认值赋值给各变量  
    作为EE的附加功能，接受中键点击，与通常的左键点击同等处理。中键点击时，`RESULT:1`中将被置入3


    当设置了第二个参数时，将鼠标点击视作回车键（将空字符串赋值给RESULTS，按下按钮时将按钮索引赋值给RESULTS:1），左键点击时RESULT:1设为1，右键点击时RESULT:1设为2，中键点击时RESULT:1设为3。同时按下Shift、Ctrl、Alt键时，将按键状态保存到RESULT:2中（位16、17、18）。
    
    当设置了第三个参数时，在右键点击等跳过过程中不进行输入等待，但会应用默认值。如果与上述"INPUT系列接受鼠标点击"功能一起使用，则分别将值赋给RESULT:1和RESULTS:1，如果不一起使用，则按常规方式赋值给RESULT:0及...


!!! hint "提示"

    仅支持命令形式。

### 相关项目
- [TINPUTNF](TINPUTNF.zh.md)
- [TINPUT](TINPUT.zh.md)
- [INPUTMOUSEKEY](INPUTMOUSEKEY.zh.md)
- [BINPUT](BINPUT.zh.md)
- [INPUTANY](INPUTANY.zh.md)
- [REUSELASTLINE](REUSELASTLINE.zh.md)