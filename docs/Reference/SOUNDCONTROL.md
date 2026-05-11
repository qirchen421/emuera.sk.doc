---
hide:
  - toc
---

# SOUNDCONTROL, BGMCONTROL, GETSOUNDORBGMINFO, ISPLAYINGSOUND, ISPLAYINGBGM

| 関数名                                                                         | 引数                          | 戻り値 |
| :----------------------------------------------------------------------------- | :---------------------------- | :----- |
| ![](../assets/images/IconSK.webp)[`SOUNDCONTROL`](./SOUNDCONTROL.md)           | `int`, `int`{, `int`, `int`}  | `int`  |
| ![](../assets/images/IconSK.webp)[`BGMCONTROL`](./SOUNDCONTROL.md)             | `int`{, `int`, `int`}         | `int`  |
| ![](../assets/images/IconSK.webp)[`GETSOUNDORBGMINFO`](./SOUNDCONTROL.md)      | `int`{, `int`}                | `int`  |
| ![](../assets/images/IconSK.webp)[`ISPLAYINGSOUND`](./SOUNDCONTROL.md)         | {`int`}                       | `int`  |
| ![](../assets/images/IconSK.webp)[`ISPLAYINGBGM`](./SOUNDCONTROL.md)           | なし                          | `int`  |

!!! info "API — SOUNDCONTROL"

    ```  { #language-erbapi }
	int SOUNDCONTROL channelId, action {, speed, preservePitch}
    ```
	サウンドチャンネルの再生を制御します。

	**パラメータ**

	| パラメータ | 型 | 説明 |
	| :--- | :--- | :--- |
	| `channelId` | `int` | サウンドチャンネル番号（0～9） |
	| `action` | `int` | 制御動作（下表参照） |
	| `speed` | `int` | `action=3` 時の再生速度（パーセント、100=通常速度） |
	| `preservePitch` | `int` | `action=3` 時の音調保持（0=音調変更、1=音調保持、省略時=1） |

	**action 値**

	| 値 | 動作 | 追加パラメータ |
	| :--- | :--- | :--- |
	| 0 | 一時停止 | なし |
	| 1 | 再開 | なし |
	| 2 | 停止 | なし |
	| 3 | 変速 | `speed`, `preservePitch` |

	**戻り値**：成功時 `1`、無効なチャンネル番号時 `-1`、無効な制御動作時 `-2`

!!! info "API — BGMCONTROL"

    ```  { #language-erbapi }
	int BGMCONTROL action {, speed, preservePitch}
    ```
	BGMチャンネルの再生を制御します。`SOUNDCONTROL` の BGM 版です。

	**パラメータ**

	| パラメータ | 型 | 説明 |
	| :--- | :--- | :--- |
	| `action` | `int` | 制御動作（`SOUNDCONTROL` と同じ） |
	| `speed` | `int` | `action=3` 時の再生速度（パーセント、100=通常速度） |
	| `preservePitch` | `int` | `action=3` 時の音調保持（0=音調変更、1=音調保持、省略時=1） |

	**戻り値**：成功時 `1`、無効な制御動作時 `-2`

!!! info "API — GETSOUNDORBGMINFO"

    ```  { #language-erbapi }
	int GETSOUNDORBGMINFO channelId {, infoType}
    ```
	サウンドまたは BGM チャンネルの再生情報を取得します。`channelId` に `-1` を指定すると BGM チャンネルを対象とします。

	**パラメータ**

	| パラメータ | 型 | 説明 |
	| :--- | :--- | :--- |
	| `channelId` | `int` | サウンドチャンネル番号（0～9）、`-1` で BGM |
	| `infoType` | `int` | 取得する情報の種類（省略時は全情報を RESULT 配列に格納） |

	**infoType 値**

	| 値 | 取得情報 | 単位 |
	| :--- | :--- | :--- |
	| 1 | 総再生時間 | ミリ秒 |
	| 2 | 現在の再生位置 | ミリ秒 |
	| 3 | 再生状態 | 0=一時停止、1=再生中 |
	| 4 | チャンネル音量 | 0～100 |
	| 5 | 再生速度 | パーセント（100=通常速度） |

	`infoType` を省略した場合、`RESULT:0`～`RESULT:4` に上記5つの情報が順に格納され、関数の戻り値として `RESULT:0`（総再生時間）が返されます。

!!! info "API — ISPLAYINGSOUND"

    ```  { #language-erbapi }
	int ISPLAYINGSOUND {channelId}
    ```
	サウンドチャンネルが再生中かどうかを確認します。

	`channelId` を指定した場合、そのチャンネルが再生中ならチャンネル番号を、そうでなければ `-1` を返します。
	`channelId` を省略した場合、再生中のチャンネルを先頭から検索し、最初に見つかったチャンネル番号を返します。再生中のチャンネルがない場合は `-1` を返します。

!!! info "API — ISPLAYINGBGM"

    ```  { #language-erbapi }
	int ISPLAYINGBGM
    ```
	BGM が再生中かどうかを確認します。再生中なら `1`、そうでなければ `0` を返します。

!!! hint "ヒント"

    すべて式中関数として使用します。  
	変速機能は SoundTouch ライブラリを使用しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
		; BGM の再生情報を取得
		GETSOUNDORBGMINFO -1
		PRINTFORML 総時間: {RESULT:0}ms  現在位置: {RESULT:1}ms

		; BGM が再生中か確認
		IF ISPLAYINGBGM
			PRINTFORML BGM 再生中
			; BGM を一時停止
			BGMCONTROL 0
		ENDIF

		; チャンネル0を2倍速（音調保持）に設定
		SOUNDCONTROL 0, 3, 200, 1

		; チャンネル0の再生速度を取得
		GETSOUNDORBGMINFO 0, 5
		PRINTFORML 速度: {RESULT}%

		; 再生中のサウンドチャンネルを検索
		LOCALS = ISPLAYINGSOUND()
		PRINTFORML 再生中チャンネル: {LOCAL}
		WAIT
    ```

### 関連項目
- [PLAYSOUND](PLAYSOUND.md)
- [PLAYBGM](PLAYBGM.md)
- [STOPSOUND](STOPSOUND.md)
- [STOPBGM](STOPBGM.md)
- [SETSOUNDVOLUME](SETSOUNDVOLUME.md)
- [SETBGMVOLUME](SETBGMVOLUME.md)
