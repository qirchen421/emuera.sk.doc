---
hide:
  - toc
---

# XML_ADDNODE Functions

| Function name                                                                      | Arguments                                             | Return |
| :-------------------------------------------------------------------------------- | :--------------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_ADDNODE`](./XML_ADDNODE.en.md)        | `int`, `string`, `string`(, `int`, `int`)           | `int`  |
|                                                                                   | `ref` `string`, `string`, `string`(, `int`, `int`) | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_ADDNODE_BYNAME`](./XML_ADDNODE.en.md) | `string`, `string`, `string`(, `int`, `int`)       | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_ADDNODE xmlId, xpath, nodeXml(, methodType, doSetAll)
    2. int XML_ADDNODE ref xml, xpath, nodeXml(, methodType, doSetAll)
    3. int XML_ADDNODE_BYNAME xmlName, xpath, nodeXml(, methodType, doSetAll)
    ```
    Adds nodes to the specified `XML` based on element nodes selected by `xpath` ([About XPath](https://www.octoparse.com/blog/xpath-introduction)).  
    If `doSetAll` is `0` or omitted, and the match count is 1 or more, addition is not performed.

    - If `methodType` is `0` or omitted, uses the selected element node as the parent node and adds `nodeXml` as the last child node.
    - If `methodType` is `1`, adds `nodeXml` as a sibling node before the selected element node (not the root node).
    - If `methodType` is `2`, adds `nodeXml` as a sibling node after the selected element node (not the root node).

    Returns the match count on success. Returns `0` on failure.
    
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
        #DIMS xml = "<xml/>"

        PRINTFORML {XML_ADDNODE(xml, "/xml", "<child/>")} -> %xml%

        XML_DOCUMENT 0, xml

        PRINTFORML {XML_ADDNODE(0, "/xml/child", "<brother/>", 1)}
        PRINTSL XML_TOSTR(0)

        ONEINPUT
    ``` 
    ``` title="Result"
    1 -> <xml><child /></xml>
    1
    <xml><brother /><child /></xml>
    ```
