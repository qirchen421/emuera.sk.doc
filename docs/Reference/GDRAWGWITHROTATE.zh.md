# GDRAWGWITHROTATE

| 函数名                                                                       | 参数                                | 返回值 |
| :--------------------------------------------------------------------------- | :---------------------------------- | :----- |
| ![](../assets/images/IconEE.webp)[`GDRAWGWITHROTATE`](./GDRAWGWITHROTATE.md) | `int`, `int`, `int`(, `int`, `int`) | `int`  |

!!! info "API"

    ``` { #language-erbapi }
    int GDRAWGWITHROTATE gID, destID, Angle(, x, y)
    ```

    将 `destID` 指定的图像顺时针旋转 `Angle` 的角度，并把旋转后的图像粘贴到 `gID` 指定的图像。  
    参数 `x` / `y` 可以指定旋转的中心点。省略则默认使用 `(x/2, y/2)`（图像整体的中心点）。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    #DIMS HTML

        GCREATE 0, 400, 400
        GCREATE 1, 400, 400
        GCREATE 2, 400, 400

        GSETFONT 0, "Arial", 100
        GDRAWTEXT 0, "Emuera", 30, 150
        
        GDRAWGWITHROTATE 1, 0, 90
        GDRAWGWITHROTATE 2, 0, 180

        REPEAT 3
            SPRITECREATE @"TEST{COUNT}", COUNT
            HTML += @"<img src='TEST{COUNT}' height = '400' width = '400'>"
        REND
        HTML_PRINT HTML
        PRINTL 
        PRINTL 
        PRINTL 
        WAIT
    ```

    ![](../assets/images/GDRAWGWITHROTATE.png)
