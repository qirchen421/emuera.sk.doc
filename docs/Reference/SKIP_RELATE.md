---
hide:
  - toc
---

# SKIP系

| 関数名                                                               | 引数 | 戻り値 |
| :------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SKIPDISP`](./SKIP_RELATE.md)  | `int`| なし   |
| ![](../assets/images/IconEmuera.webp)[`NOSKIP`](./SKIP_RELATE.md)    | なし | なし   |
| ![](../assets/images/IconEmuera.webp)[`ENDNOSKIP`](./SKIP_RELATE.md) | なし | なし   |
| ![](../assets/images/IconEmuera.webp)[`ISSKIP`](./SKIP_RELATE.md)    | なし | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MOUSESKIP`](./SKIP_RELATE.md) | なし | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MESSKIP`](./SKIP_RELATE.md)   | なし | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	SKIPDISP bool
	NOSKIP
	ENDNOSKIP
	int ISSKIP
	int MOUSESKIP
	int MESSKIP
    ```
	PRINT等の画面出力命令およびWAIT、TWAITなどの制御に関する命令群です
	
	- `SKIPDISP` <数値>
		- 引数：`0` = 無視しないようにする
			- 0以外 = 無視するようにする
		- 内容：このフラグを立てると、[`PRINT`](./PRINT.md)等の出力が一切行われなくなる
			- また、このフラグが立ってる間に[`INPUT`および`INPUTS`](./INPUT.md)に達した場合は
			- ユーザーが何をすればいい知る術がないこと、また飛ばせば無限ループに入る可能性が高いため
			- 警告文と対処法を明示した上でエラーになるようにしてあります

	今一般に使われる口上の実装では口上の非表示が可能な場合、  
	表示と非表示でコマンドの結果が変わったり、動作が変わってしまう場合がある  
	そこで、これを立てた上で口上を呼び出せば、表示はされることなくそれ以外の処理が行われるため  
	表示/非表示で同じ動作を期待できる  
	[`INPUT/INPUTS`](./INPUT.md)がかぶる場合は下記の`NOSKIP～ENDNOSKIP`で囲んだり、  
	`SKIPDISP 0`しておいて、`INPUT`処理後に再度`SKIPDISP 1`するなりの対策があります（一応前者推奨）  
	ちなみに今無視するフラグが立ってるかは`ISSKIP`で取得できます  
	ver1.808から、[`SIF`](./IF.md)文の直後に置いても動作するようになりました。 なお、`SKIPDISP`を使用すると引数に関係なく`RESULT:0`が`0`にリセットされますが仕様となります。  
	
	`NOSKIP～ENDNOSKIP`は表示関係無視フラグを無視する区間を指定できます  
	この2つで囲った区間は`SKIPDISP 1`の状態でも表示等される  
	主にINPUTが必要な場合に使用するとよい  
	また、この命令は`SKIPDISP`の状態に影響しないので、  
	`SKIPDISP`フラグが立ちうる環境下のコード（例えば表示/非表示のある口上関係）では  
	これを使うと、絶対に表示する必要がある場所をきちんと表示できるようになります  
	
	`ISSKIP`は`SKIPDISP`のフラグが`0`以外（`PRINT`等の出力を無視）なら`1`を、そうでなければ`0`を`RESULT:0`に代入もしくは返します  

	`MOUSESKIP`はEmuera1.810でMESSKIPに統合されました。  
	`MESSKIP`を使用してください。  
	この関数はかつて以下のような処理をしていました。  

		右クリックが押されてWAITスキップの状態になっているなら1を、そうでなければ0を返します
		マクロ処理時のスキップ中は0を返します。
		マクロ処理のスキップと右クリックが競合した場合はマクロを優先し0を返します
		現在ではEscキーによるスキップと右クリックによるスキップを区別せずに1を返します。
	
	`MESSKIP`は[`WAIT`](./WAIT.md)スキップの状態になっているなら`1`を、そうでなければ`0`を返します  

!!! hint "ヒント"

    `ISSKIP`、`MOUSESKIP`、`MESSKIP`は式中関数対応しています。
