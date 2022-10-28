---
hide:
    - toc
---

# 入力欄関係

| 関数名                                                           | 引数                | 戻り値   |
| :--------------------------------------------------------------- | :------------------ | :------- |
| ![](../assets/images/IconEE.webp)[`SETTEXTBOX`](./TEXTBOX.md)    | `string`            | `1`      |
| ![](../assets/images/IconEE.webp)[`GETTEXTBOX`](./TEXTBOX.md)    | なし                | `string` |
| ![](../assets/images/IconEM.webp)[`MOVETEXTBOX`](./TEXTBOX.md)   | `int`, `int`, `int` | `1`      |
| ![](../assets/images/IconEM.webp)[`RESUMETEXTBOX`](./TEXTBOX.md) | なし                | `1`      |

!!! info "API"

    ``` { #language-erbapi }
    1 SETTEXTBOX text
    string GETTEXTBOX
    1 MOVETEXTBOX xPos, yPos, width
    1 RESUMETEXTBOX
    ```

    - `SETTEXTBOX`：テキストボックスの内容を`text`に置き換える。
    - `GETTEXTBOX`：実行時点でテキストボックスに入力されている文字列を返す。
    - `MOVETEXTBOX`：次の`INPUT`/`INPUTS`の時テキストボックスを指定幅を`width`にし、指定いちへ移動する。
        - 基準位置(`xPos`, `yPos`) = (`0`, `0`)が画面左下です。`yPos`は上方向が正。
        - 画面が上に遷移された(履歴を見る)時、テキストボックスが一時的に元の位置に戻ります。
        - `INPUT`/`INPUTS`終了後、キストボックスが元の位置に戻ります。
    - `RESUMETEXTBOX`：前回の`MOVETEXTBOX`を無効にし、キストボックスが元の位置に戻ります。

!!! hint "ヒント"

    命令、式中関数両方対応しています。  
