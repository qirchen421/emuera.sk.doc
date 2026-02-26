---
hide:
  - toc
---

# XML_REPLACE Functions

| Function name                                                                    | Arguments                                      | Return |
| :------------------------------------------------------------------------------ | :-------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_REPLACE`](./XML_REPLACE.md)        | `any`, `string`                               | `int`  |
|                                                                                 | `int`, `string`, `string`(, `int`)           | `int`  |
|                                                                                 | `ref` `string`, `string`, `string`(, `int`)  | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_REPLACE_BYNAME`](./XML_REPLACE.md) | `string`, `string`, `string`(, `int`)        | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_REPLACE xmlId, newXml
    2. int XML_REPLACE xmlId, xpath, newXml(, doSetAll)
    3. int XML_REPLACE ref xml, xpath, newXml(, doSetAll)
    4. int XML_REPLACE_BYNAME xmlName, xpath, newXml(, doSetAll)
    ```
    Selects nodes from `xml` using `xpath` and overwrites matching nodes with `newXml` ([About XPath](https://www.octoparse.com/blog/xpath-introduction)).  
    If `doSetAll` is `0` or omitted, and the match count is 1 or more, overwriting is not performed. Returns the match count on success. Returns `0` on failure.

    1. Overwrites the root node of the [`XmlDocument`](https://docs.microsoft.com/en-us/dotnet/api/system.xml.xmldocument) stored with `xmlId` with `newXml`. Returns `-1` if the `XmlDocument` does not exist. If `xmlId` is an integer, it is converted to string ([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29)).
    2. Uses the string conversion of `xmlId` (`TOSTR`) as a key to select nodes from the stored `XmlDocument`. Returns `-1` if the `XmlDocument` does not exist.
    3. Selects nodes from `xml` and assigns the result to `xml`. `xml` must be a variable.
    4. Uses `xmlName` as a key to select nodes from the stored `XmlDocument`. Returns `-1` if the `XmlDocument` does not exist.

    !!! warning "Warning"

        This does not obtain actual `XmlNode` instances, so using `//` at the beginning of `xpath` has no meaning.

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS xml = "<xml/>"

        XML_DOCUMENT 0, xml
        PRINTFORML {XML_REPLACE(0, "<xml><boy/></xml>")} -> %XML_TOSTR(0)%
        PRINTFORML {XML_REPLACE(0, "/xml/boy", "<girl/>")} -> %XML_TOSTR(0)%

        ONEINPUT
    ``` 
    ``` title="Result"
    1 -> <xml><boy /></xml>
    1 -> <xml><girl /></xml>
    ```
