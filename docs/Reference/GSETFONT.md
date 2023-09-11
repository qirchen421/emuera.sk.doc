---
hide:
  - toc
---

# GSETFONT

| 関数名                                                           | 引数                               | 戻り値 |
| :--------------------------------------------------------------- | :--------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GSETFONT`](./GSETFONT.md) | `int`, `string`, `string`(, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GSETFONT gID, fontName, fontSize(, fontStyle)
    ```
	指定した`gID`の`Graphics`に指定した名前およびサイズのフォントを設定します。
	指定したフォントは[`GDISPOSE`](./GDISPOSE.md)命令で`Graphics`が破棄されるまで記憶されます。
	処理に成功した場合、非0を返します。
	設定されたフォント名、フォントサイズを取得するには[`GGETFONT`](./GGETFONT.md)、[`GGETFONTSIZE`](./GGETFONTSIZE.md)を使用します。
	EM+EEにて省略可能な第4引数を追加。フォントスタイルを指定できます。[`SETFONT`](./SETFONT.md)と同じ4ビット数で指定します。
	EM+EEにて、[`font`フォルダ内にある`ttf`,`otf`ファイルも指定できるようになりました。](../EMEE//EMEE_Summary.md#ttfotf)
	`GSETFONT`で設定したフォントは以下の命令・式中関数で使用されます。

	- [`GDRAWTEXT`](./GDRAWTEXT.md)


!!! hint "ヒント"

    命令、式中関数両方対応しています。
