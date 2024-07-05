---
hide:
  - toc
---

# GETCOLOR系

| 関数名                                                                | 引数 | 戻り値 |
| :-------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETCOLOR`](./GETCOLOR.md)      | なし | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETBGCOLOR`](./GETCOLOR.md)    | なし | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETDEFCOLOR`](./GETCOLOR.md)   | なし | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETDEFBGCOLOR`](./GETCOLOR.md) | なし | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETFOCUSCOLOR`](./GETCOLOR.md) | なし | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GETCOLOR
	int GETBGCOLOR
	int GETDEFCOLOR
	int GETDEFBGCOLOR
	int GETFOCUSCOLOR
    ```
	それぞれ、色コードを`RESULT:0`に代入、もしくは返します。  
	`GETCOLOR`は現在使用中の文字色、`GETDEFCOLOR`は[コンフィグで指定している文字色](../Emuera/config.md#_28)、`GETBGCOLOR`は現在使用している背景色、  
	`GETDEFBGCOLOR`は[デフォルトで使用している背景色](../Emuera/config.md#_27)、`GETFOCUSCOLOR`は[ボタン選択中の文字色](../Emuera/config.md#_29)を返します。
	戻り値は16進数で`0xRRGGBB`となります。  
	例えばオレンジ色(R,G,B) = (`255, 128, 0`)であれば`0xFF8000`(10進数で`16744448`)を返します。
	色と数字の対応はweb colorについて解説しているWebサイトを参考にするとよいでしょう。
	1.731での変更により、[`SETCOLOR`](./SETCOLOR.md)命令も`SETCOLOR 0xFF8000`のような形式で指定できるようになりました。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

### 関連項目
- [SETCOLOR](SETCOLOR.md)
- [SETBGCOLOR](SETBGCOLOR.md)
- [GETCONFIG](GETCONFIG.md)
