---
hide:
  - toc
---

# SAVEGLOBAL

| 関数名                                                               | 引数 | 戻り値 |
| :------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SAVEGLOBAL`](./SAVEGLOBAL.md) | なし | なし   |

!!! info "API"

    ```  { #language-erbapi }
	SAVEGLOBAL
    ```
	変数`GLOBAL`と`GLOBALS`をセーブします。保存先は`global.sav`です。  
	ERHファイル内で`GLOBAL`及び`SAVEDATA`フラグを持つ変数が定義されていればそれもセーブします。  

!!! hint "ヒント"

    命令のみ対応しています。

### 関連項目
- [LOADGLOBAL](LOADGLOBAL.md)
