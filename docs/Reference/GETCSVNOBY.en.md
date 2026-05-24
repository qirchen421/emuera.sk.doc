---
hide:
  - toc
---

# GETCSVNOBY Series

| Function                                                                            | Argument | Return |
| :---------------------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`GETCSVNOBYNAME`](./GETCSVNOBY.en.md)       | `string` | `int`  |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`GETCSVNOBYNICKNAME`](./GETCSVNOBY.en.md)   | `string` | `int`  |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`GETCSVNOBYCALLNAME`](./GETCSVNOBY.en.md)   | `string` | `int`  |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`GETCSVNOBYMASTERNAME`](./GETCSVNOBY.en.md) | `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    GETCSVNOBYNAME name
    GETCSVNOBYNICKNAME nickname
    GETCSVNOBYCALLNAME callname
    GETCSVNOBYMASTERNAME mastername
    ```
    Reverse lookups the character number (NO) from a character's name. This is the inverse of [CSVNAME series](CSVNAME.en.md): CSVNAME gets the name from a number, GETCSVNOBY gets the number from a name.

    - `GETCSVNOBYNAME`: Reverse lookup by `NAME` (character name)
    - `GETCSVNOBYNICKNAME`: Reverse lookup by `NICKNAME`
    - `GETCSVNOBYCALLNAME`: Reverse lookup by `CALLNAME`
    - `GETCSVNOBYMASTERNAME`: Reverse lookup by `MASTERNAME`

    Return value: Character number (NO) (≥0) if found, -1 if not found.

    When multiple characters share the same name, returns the last loaded character number.

    !!! warning "Difference from FINDCHARA"
        `GETCSVNOBY*` queries CSV template data, so characters do not need to be added via `ADDCHARA` to be found.
        [FINDCHARA](FINDCHARA.en.md) queries runtime-added characters and returns the registration number (CharaID), not the character number (NO).

!!! hint "Hint"

    Supports both command syntax (`GETCSVNOBYNAME "Example Name"`) and expression syntax (`LOCAL = GETCSVNOBYNAME("Example Name")`). When called as a command, the result is stored in `RESULT`. Lookup is O(1) complexity.

!!! example "Example"
    ``` { title Chara0.csv }
    番号,0
    名前,絵夢 江良
    呼び名,江良
    ```

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        LOCAL = GETCSVNOBYNAME("絵夢 江良")
        PRINTFORMW Number={LOCAL} CallNameNumber={GETCSVNOBYCALLNAME("江良")}
    ```
    ``` title="Result"
    Number=0 CallNameNumber=0
    ```

### See Also
- [CSVNAME Series](CSVNAME.en.md) — Get name from number (inverse operation)
- [FINDCHARA](FINDCHARA.en.md) — Search from added characters
