---
hide:
  - toc
---

# PRINT 系

| 関数名                                                                                                                                            | 引数     | 戻り値 |
| :------------------------------------------------------------------------------------------------------------------------------------------------ | :------- | :----- |
| ![](../assets/images/Icondotnet.webp)[<code>PRINT(\|V\|S\|FORM\|FORMS)N</code>](./PRINT.md) | `string` | なし   |

!!! info "API"

    ```  { #language-erbapi }
	PRINTN string
    PRINTVN integerVariable
    PRINTSN stringVariable
    PRINTFORMN formedString
    PRINTFORMSN string
    ```
    改行しない`PRINTW`命令です。上述した基本的な`PRINT`命令にのみ追加しています  
	それぞれの挙動やリテラルは[`PRINT`系命令](PRINT.md)と同じです  

!!! hint "ヒント"

    命令のみに対応しています。
