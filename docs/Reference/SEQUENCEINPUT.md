---
hide:
  - toc
---

# SEQUENCEINPUT ![](../assets/images/IconSK.webp)

| 関数名                                                         | 引数     | 戻り値   |
| :------------------------------------------------------------- | :------- | :------- |
| ![](../assets/images/IconSK.webp)[`SEQUENCEINPUT`](./SEQUENCEINPUT.md) | `string` | `integer` |

!!! info "API"

    ```  { #language-erbapi }
	int SEQUENCEINPUT inputString
    ```
    次回の入力待機（INPUT/TINPUT/INPUTS/TINPUTS等）時に、指定した文字列をユーザー入力として自動的に送信する。`SEQUENCEINPUT` を呼び出した後、次回 WaitInput 状態に入った時、エンジンは `PressEnterKey` を呼び出してキューに入れられた文字列を処理する。テキストボックスに入力して Enter を押すのと同じ動作。

    - 文字列中の `\n` は複数セグメントに分割され、各セグメントが個別の ERB WaitInput に送られる
    - 文字列中の `\e` は MesSkip（待機スキップ）として認識される。FORM文字列解析では `\e` は2文字（`\` + `e`）として保持され、SEQUENCEINPUT パスが正しく認識できる
    - `WaitInput` と `WaitInputNoFocus`（NF接尾辞命令）の両方で動作する
    - 戻り値は常に `0`

!!! warning "注意"

    `CanRestructure = false` のため、定数畳み込みの対象になりません。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

### 関連項目
- [FLOWINPUT,FLOWINPUTS](FLOWINPUT.md)
- [INPUT](INPUT.md)
- [INPUTS](INPUT.md)
