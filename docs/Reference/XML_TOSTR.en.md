---
hide:
  - toc
---

# XML_TOSTR

| Function name                                                 | Arguments | Return   |
| :------------------------------------------------------------ | :-------- | :------- |
| ![](../assets/images/IconEM.webp)[`XML_TOSTR`](./XML_TOSTR.en.md) | `any`     | `string` |


!!! info "API"

    ```  { #language-erbapi }
    string XML_TOSTR xmlId
    ```
    Returns the content of the [`XmlDocument`](https://docs.microsoft.com/en-us/dotnet/api/system.xml.xmldocument) stored with `xmlId`. If `xmlId` is an integer, it is converted to string ([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29)).

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        XML_DOCUMENT 0, "<xml/>"

        PRINTSL XML_TOSTR(0)

        ONEINPUT
    ``` 
    ``` title="Result"
    <xml />
    ```
