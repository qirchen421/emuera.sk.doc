---
hide:
  - toc
---

# XML_SET Functions

| Function name                                                    | Arguments                                             | Return |
| :--------------------------------------------------------------- | :--------------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_SET`](./XML_SET.en.md)        | `int`, `string`, `string`(, `int`, `int`)           | `int`  |
|                                                                  | `ref` `string`, `string`, `string`(, `int`, `int`) | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_SET_BYNAME`](./XML_SET.en.md) | `string`, `string`, `string`(, `int`, `int`)       | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_SET xmlId, xpath, value(, doSetAll, outputType)
    2. int XML_SET ref xml, xpath, value(, doSetAll, outputType)
    3. int XML_SET_BYNAME xmlName, xpath, value(, doSetAll, outputType)
    ```
    Selects nodes from `xml` using `xpath`, assigns `value` to matching nodes, and returns the match count ([About XPath](https://www.octoparse.com/blog/xpath-introduction)).  
    If `doSetAll` is `0` or omitted, and the match count is 1 or more, assignment is not performed. Returns `0` on failure.
    
    1. Uses the string conversion of `xmlId` ([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29)) as a key to select nodes from the stored [`XmlDocument`](https://docs.microsoft.com/en-us/dotnet/api/system.xml.xmldocument). Returns `-1` if the `XmlDocument` does not exist.
    2. Selects nodes from `xml` and assigns the result to `xml`. `xml` must be a variable.
    3. Uses `xmlName` as a key to select nodes from the stored `XmlDocument`. Returns `-1` if the `XmlDocument` does not exist.

    The value of `outputType` determines the assignment result:
    - `1`: Node's `InnerText`
    - `2`: Node's `InnerXml`
    - Other or omitted: Node's `Value`

    !!! warning "Warning"

        This does not obtain actual `XmlNode` instances, so using `//` at the beginning of `xpath` has no meaning.

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS xml = "<test><file name='A.txt'>InnerText content A</file><a>A</a></test>"

        ; Search directly from string
        PRINTFORML Match count: {XML_SET(xml, "/test/*", "B", 1, 1)}
        PRINTSL xml
        XML_DOCUMENT 0, xml

        ; Search from XmlDocument
        PRINTFORML Match count: {XML_SET(0, "/test/file/@name", "X.xml")}
        XML_GET 0, "/test/file/@name", 1
        PRINTSL RESULTS

        ONEINPUT
    ``` 
    ``` title="Result"
    Match count: 2
    <test><file name="A.txt">B</file><a>B</a></test>
    Match count: 1
    X.xml
    ```
