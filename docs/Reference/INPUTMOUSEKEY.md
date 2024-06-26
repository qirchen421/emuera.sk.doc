---
hide:
  - toc
---

# INPUTMOUSEKEY

| 関数名                                                                     | 引数  | 戻り値 |
| :------------------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`INPUTMOUSEKEY`](./INPUTMOUSEKEY.md) | `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	INPUTMOUSEKEY timeLimit
    ```
	`INPUTMOUSEKEY`命令はマウスやキーボードの入力を直接認識する命令です。  
	引数は[`TINPUT`](./TINPUT.md)のような時間切れ処理を行うまでの時間をミリ秒で指定します。  
	引数を省略したか0以下を指定した場合には時間切れ処理は行われません。  
	この命令は、[`ONEINPUT`](./ONEINPUT.md)等では捕捉できないファンクションキーや方向キー、PageUpキー等も入力として認識することができます。  
	一方でこの命令による入力の受付待機中はESCキーや右クリックによるスキップ機能、マクロ機能、その他の機能が使用できず、単にESCキー等が押されたという結果のみ受け付けます。  
	また、この命令は時間切れ表示等を含めて一切の[`PRINT`](./PRINT.md)処理を行いません。  
	スキップ機能の実装や、入力を表示したい場合などはERB側で対応する必要があります。  
	第1引数にミリ秒単位で数値を指定することにより、時間切れ処理が行われます。`INPUTMOUSEKEY`の返り値は最大6つであり、`RESULT:0`, `RESULT:1`, `RESULT:2`, `RESULT:3`, `RESULT:4`, `RESULT:5`にそれぞれ代入されます。  

		RESULT:0 == 1; マウス押下が検出された
		　RESULT:1 ;マウスボタン - 左ボタン0x100000、右ボタン0x200000、中ボタン0x400000。C#のSystem.Windows.Forms.MouseButtons列挙体の整数値
		　RESULT:2 ;マウスX座標 クライアント領域の左下を基準とする。常に正の値になる。
		　RESULT:3 ;マウスY座標 クライアント領域の左下を基準とする。常に負の値になる。
		　RESULT:4 ;CBGSETBMAPが実行されており、クリック座標直下の色の不透明度が0xFFである時、色の0xRRGGBBを返す。該当しない場合は-1。
		　RESULT:5 ;クリックしたボタンの値
		RESULT:0 == 2; マウスホイールの回転が検出された
		　RESULT:1 ;ホイール量
		　RESULT:2 ;マウスX座標
		　RESULT:3 ;マウスY座標
		RESULT:0 == 3; キーボード押下が検出された
		　RESULT:1 ;押されたキーのコード。修飾コード(Alt,Ctrl,Shift)を含まない。KeyCode相当。C#のSystem.Windows.Forms.Keys列挙体の整数値
		　RESULT:2 ;押されたキーのコード。修飾コードを含む。KeyData相当
		　RESULT:0 == 4; 時間切れにより終了した

	<!-- マウスのボタンについては_VirtualKey.ERHのMB_LEFT～MB_MIDDLEを、キーコードについては_VirtualKey.ERHのVK_～を参照してください。 -->
	キーコードは[`GETKEY`](./GETKEY.md)関数のものと共通です。  
	マウスホイールのホイール量は1や-1ではなく最低でも120など大きな値になるので注意してください。  
	また、Emueraの画面外にカーソルがある場合にホイールが検出されるかどうかはWindowsの設定次第でありEmuera側では変更できません。  
	初期設定ではWindows8.1以前は検出されますがWindows10では画面外のホイールは検出されないようです。  

!!! hint "ヒント"

    命令のみ対応しています。
