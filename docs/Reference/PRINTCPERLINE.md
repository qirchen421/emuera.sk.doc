---
hide:
  - toc
---

# PRINTCPERLINE

| 関数名                                                                     | 引数 | 戻り値 |
| :------------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`PRINTCPERLINE`](./PRINTCPERLINE.md) | なし | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int PRINTCPERLINE
    ```
	[コンフィグ`PRINTCを並べる数`](../Emuera/config.md#printc)で指定された数をRESULT:0に代入、もしくは返します。標準は3です。  
	`RESULT = GETCONFIG("PRINTCを並べる数")`と同義です  


!!! hint "ヒント"

    命令、式中関数両方対応しています。
