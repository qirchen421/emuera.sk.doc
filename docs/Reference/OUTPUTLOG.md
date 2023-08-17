---
hide:
  - toc
---

# OUTPUTLOG

| 関数名                                                                                              | 引数       | 戻り値 |
| :-------------------------------------------------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEE.webp)[`OUTPUTLOG`](./OUTPUTLOG.md) | (`string`) | なし   |

!!! info "API"

    ```  { #language-erbapi }
	OUTPUTLOG (filePath)
    ```
	ログ出力命令OUTPUTLOGです。やり過ぎはディスクの寿命を縮めるのでほどほどに  
	なお、ログの文字コードはUnicodeです。  
    EM+EEにて、引数指定することでそのファイル名.拡張子で出力できるようになりました。リテラルは`PRINTS`とかと同じ  
    `v5fix`で親ディレクトリを指定できる脆弱性を修正。子ディレクトリは指定可能  

!!! hint "ヒント"

    命令のみ対応しています。
