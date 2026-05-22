---
hide:
  - toc
---

# XML_DOCUMENT Management

| Function name                                                     | Arguments       | Return |
| :--------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_DOCUMENT`](./XML_MANAGE.en.md) | `any`, `string` | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_RELEASE`](./XML_MANAGE.en.md)  | `any`           | `1`    |
| ![](../assets/images/IconEM.webp)[`XML_EXIST`](./XML_MANAGE.en.md)    | `any`           | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int XML_DOCUMENT xmlId, xmlContent
    1 XML_RELEASE xmlId
    int XML_EXIST xmlId
    ```

    Functions for creating, deleting, and checking existence of [`XmlDocument`](https://docs.microsoft.com/en-us/dotnet/api/system.xml.xmldocument). If `xmlId` is an integer, it is converted to string ([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29)).
    
    - `XML_DOCUMENT`: Parses `xmlContent` and saves it as an `XmlDocument`. Returns `0` if an `XmlDocument` already exists for `xmlId`. Returns `1` on success.
    - `XML_RELEASE`: Deletes the `XmlDocument` associated with `xmlId`.
    - `XML_EXIST`: Checks if an `XmlDocument` exists for `xmlId`. Returns `1` if it exists, `0` otherwise.

    !!! warning "Warning"

        See "[`XML`, `MAP`, `DataTable` Save Function](./README.md#xmlmapdatatable)" to save created `XmlDocument` to save file. They are automatically deleted when "Return to Title Screen" or [`RESETDATA`](https://osdn.net/projects/emuera/wiki/excom#h5-RESETDATA) is called.

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        PRINTFORML Existence of XmlDocument 0: {XML_EXIST(0)}
        XML_DOCUMENT 0, "<xml/>"
        PRINTSL RESULT ? "Success" # "Already exists"
        XML_DOCUMENT 0, "<xml/>"
        PRINTSL RESULT ? "Success" # "Already exists"

        RESETDATA ; All XmlDocuments are automatically deleted

        XML_DOCUMENT 0, "<xml/>"
        PRINTSL RESULT ? "Success" # "Already exists"
        PRINTFORML Existence of XmlDocument 0: {XML_EXIST(0)}
        XML_RELEASE 0
        PRINTFORML Existence of XmlDocument 0: {XML_EXIST(0)}

        ONEINPUT
    ``` 
    ``` title="Result"
    Existence of XmlDocument 0: 0
    Success
    Already exists
    Success
    Existence of XmlDocument 0: 1
    Existence of XmlDocument 0: 0
    ```
