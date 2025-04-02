---
hide:
  - toc
---

# GROUPMATCH, NOSAMES, ALLSAMES

| 関数名                                                               | 引数            | 戻り値 |
| :------------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GROUPMATCH`](./GROUPCHECK.md) | `any`, `any`... | `int`  |
| ![](../assets/images/IconEmuera.webp)[`NOSAMES`](./GROUPCHECK.md)    | `any`, `any`... | `int`  |
| ![](../assets/images/IconEmuera.webp)[`ALLSAMES`](./GROUPCHECK.md)   | `any`, `any`... | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GROUPMATCH key, value...
	int NOSAMES value, value...
	int ALLSAMES value, value...
    ```
	各々の引数はすべて同じ型の必要があります。  
	`GROPUMATCH`は第1引数で指定された値と、第2引数以降で指定された値の中で合致する合計数を返します。  
	`NOSAMES`は引数で指定された値が全て異なる場合に1を返し、それ以外は0を返します。  
	`ALLSAMES`は引数で指定された値が全て同じである場合に1を返し、それ以外は0を返します。  


!!! hint "ヒント"

    命令、式中関数両方対応しています。

### 関連項目
- [MATCH](MATCH.md)
