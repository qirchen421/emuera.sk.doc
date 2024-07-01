---
hide:
  - toc
---

# BINPUT(S)

| 関数名                                                       | 引数                     | 戻り値   |
| :----------------------------------------------------------- | :----------------------- | :------- |
| ![](../assets/images/IconEE.webp)[`BINPUT`](./BINPUT.md)     | (`int`, `int`, `int`)    | `int`    |
| ![](../assets/images/IconEE.webp)[`BINPUTS`](./BINPUT.md)    | (`string`, `int`, `int`) | `string` |

!!! info "API"

    ``` { #language-erbapi }
	BINPUT (defaultValue, AllowClick, CanSkip)
	BINPUTS (defaultValue, AllowClick, CanSkip)
    ```

	実行時点でボタン化されている値のみ受け付けるINPUT(S)  
	「ボタンでの入力のみ受け付ける」ではなく「ボタン化されている値のみ受け付ける」ため、キーボード操作とマウス操作を両立させつつ、想定外の値を弾くことが可能  
	ボタンが一つも無い場合は入力待ちをせずにデフォルト値をRESULT(S)に入れ、デフォルト値も無い場合はエラーになる  
	引数はEM+EEのINPUT拡張の仕様と同じ

!!! hint "ヒント"

	命令なので式中関数としては使用できません

### 関連項目
* [INPUT](INPUT.md)
