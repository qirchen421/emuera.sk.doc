---
hide:
  - toc
---

# AWAIT

| 関数名                                                     | 引数 | 戻り値 |
| :--------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`AWAIT`](./AWAIT.md) | `int` | なし  |

!!! info "API"

    ```  { #language-erbapi }
	AWAIT milliSecond
    ```
	ERBの実行を一時停止し、Windowsの処理を行います。  
	引数を指定した場合、指定したミリ秒数だけ実行を待機します。  
	`AWAIT`命令はEmueraの無限ループ警告を中断し、Emueraのプロセスが「応答なし」になることを防ぎます。  
	時間がかかる処理を行うときに使用して下さい。  
	ただし、`AWAIT`命令自体がそれなりの実行時間がかかるため、頻繁に行いすぎると遅くなります。  
	また、ユーザーを不安にしないため、例えば以下のように作業進度を逐次表示することをお勧めします。  
    ```  { #language-erbapi }
	REDRAW 0
	FOR LCNT, 0, 100
		PRINTSL "作業中・・・ " + TOSTR(LCNT) + "％ 完了"
		AWAIT 
		CLEARLINE 1
		;時間がかかる処理
	NEXT
	```

!!! hint "ヒント"

    命令のみ対応しています。

### 関連項目
* [WAIT](WAIT.md)
* [TWAIT](TWAIT.md)
* [TINPUTNF](TINPUTNF.md)
