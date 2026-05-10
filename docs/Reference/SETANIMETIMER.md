---
hide:
  - toc
---

# SETANIMETIMER / GETANIMETIMER

| 関数名                                                                         | 引数  | 戻り値 |
| :----------------------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SETANIMETIMER`](./SETANIMETIMER.md)     | `int` | なし   |
| ![](../assets/images/IconSK.webp)[`GETANIMETIMER`](./SETANIMETIMER.md)     | なし  | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	SETANIMETIMER time
	int GETANIMETIMER
    ```
	アニメーションスプライト用にミリ秒単位で再描画間隔を指定します。  
	Emueraは通常は[`INPUT`](./INPUT.md)等の入力待ち中に再描画を行いません。  
	この命令で再描画間隔を設定することで`INPUT`等の入力待ち中に画像をアニメーションさせることができます。  
	なお、[`TINPUT`](./TINPUT.md)などの時間切れ処理のある命令中には再描画を行いません。  
	実際の描画間隔はコンピュータの状態により、指定した時間よりもやや遅れます。  
	したがって描画間隔をアニメーションの`delay`の値と同じ値にすると頻繁にフレームが飛ぶことになります。  
	`delay`よりも十分に短い間隔を指定してください。  

	この命令はコンフィグの`フレーム毎秒`の項目とは無関係です。  
	また、[`REDRAW`](./REDRAW.md)命令による再描画抑止の効果を受けません。  

	**GETANIMETIMER**：現在のアニメーションタイマーの値（ミリ秒）を返します。命令・式中関数の両方に対応しています。

!!! hint "ヒント"

    `SETANIMETIMER`は命令のみ対応。`GETANIMETIMER`は命令・式中関数の両方に対応しています。

!!! skia "Skia版の変更点"

    | 項目 | EM+EE | Skia版 |
    |:---|:---|:---|
    | `SETANIMETIMER` | 式中関数（戻り値: 常に`1`） | 命令（戻り値なし） |
    | `GETANIMETIMER` | ❌ 存在しない | ✅ 式中関数（現在のタイマー値を返す） |

    EM+EEでは`SETANIMETIMER`は式中関数として実装されており、`RESULT = SETANIMETIMER(100)`のように呼び出すことができました。Skia版では命令に再実装されたため、このような使い方はコンパイルエラーになります。

### 関連項目
- [SPRITEANIMECREATE](SPRITEANIMECREATE.md)
- [Skia版仕様変更一覧](../Skia/Skia_Summary.md#changed-commands)
