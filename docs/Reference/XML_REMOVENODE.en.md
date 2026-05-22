---
hide:
  - toc
---

# XML_REMOVENODE Functions

| Function name                                                                          | Arguments                            | Return |
| :------------------------------------------------------------------------------------ | :---------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_REMOVENODE`](./XML_REMOVENODE.en.md)        | `int`, `string`(, `int`)            | `int`  |
|                                                                                       | `ref` `string`, `string`(, `int`)   | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_REMOVENODE_BYNAME`](./XML_REMOVENODE.en.md) | `string`, `string`(, `int`)         | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_REMOVENODE xmlId, xpath(, doSetAll)
    2. int XML_REMOVENODE ref xml, xpath(, doSetAll)
    3. int XML_REMOVENODE_BYNAME xmlName, xpath(, doSetAll)
    ```
    Removes element nodes selected by `xpath` from the specified `XML` (root node is invalid) ([About XPath](https://www.octoparse.com/blog/xpath-introduction)).  
    If `doSetAll` is `0` or omitted, and the match count is 1 or more, removal is not performed. Returns the match count on success. Returns `0` on failure.
    
    1. Uses the string conversion of `xmlId` ([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29)) as a key to select nodes from the stored [`XmlDocument`](https://docs.microsoft.com/en-us/dotnet/api/system.xml.xmldocument). Returns `-1` if the `XmlDocument` does not exist.
    2. Selects nodes from `xml` and assigns the result to `xml`. `xml` must be a variable.
    3. Uses `xmlName` as a key to select nodes from the stored `XmlDocument`. Returns `-1` if the `XmlDocument` does not exist.

    !!! warning "Warning"

        This does not obtain actual `XmlNode` instances, so using `//` at the beginning of `xpath` has no meaning.

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS xml = "<xml><brother/><brother/><sister/></xml>"

        XML_DOCUMENT 0, xml
        PRINTFORML {XML_REMOVENODE(xml, "/xml/brother", 1)} -> %xml%

        PRINTFORML {XML_REMOVENODE(0, "/xml/sister", 1)}
        PRINTSL XML_TOSTR(0)

        ONEINPUT
    ``` 
    ``` title="Result"
    2 -> <xml><sister /></xml>
    1
    <xml><brother /><brother /></xml>
    ```
