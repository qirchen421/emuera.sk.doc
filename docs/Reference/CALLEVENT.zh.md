---
hide:
  - toc
---

# CALLEVENT

| 函数名                                                             | 参数           | 返回值 |
| :----------------------------------------------------------------- | :------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CALLEVENT`](./CALLEVENT.md) | `functionName` | `void`¹ |


!!! info "API"

    ```  { #language-erbapi }
	CALLEVENT eventFuction
    ```
	将事件函数作为事件函数调用。  
	无法传递参数。  
	也无法在事件函数内部或从事件函数调用的函数内部使用。  

!!! hint "提示"

    仅支持命令形式。