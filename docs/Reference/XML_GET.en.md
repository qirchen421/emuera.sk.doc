---
hide:
  - toc
---

# XML_GET Functions

| Function name                                                    | Arguments                                            | Return |
| :--------------------------------------------------------------- | :--------------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_GET`](./XML_GET.en.md)        | `any`, `string`(, `int`, `int`)                     | `int`  |
|                                                                  | `any`, `string`, `ref` `string[]`(, `int`)          | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_GET_BYNAME`](./XML_GET.en.md) | `string`, `string`(, `int`, `int`)                  | `int`  |
|                                                                  | `string`, `string`, `ref` `string[]`(, `int`)        | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_GET xml, xpath(, doOutput, outputType)
    2. int XML_GET xml, xpath, ref outputArray(, outputType)
    3. int XML_GET_BYNAME xmlName, xpath(, doOutput, outputType)
    4. int XML_GET_BYNAME xmlName, xpath, ref outputArray(, outputType)
    ```
    Selects nodes from `xml` (`xmlName`) using `xpath` and returns the number of matches ([About XPath](https://www.octoparse.com/blog/xpath-introduction)).

    For forms 1 and 2: If `xml` is a string, nodes are selected from its content. If `xml` is an integer, it is converted to string ([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29)) and used as a key to select nodes from the stored [`XmlDocument`](https://docs.microsoft.com/en-us/dotnet/api/system.xml.xmldocument). Returns `-1` if the `XmlDocument` does not exist.

    For forms 3 and 4: Selects nodes from the stored `XmlDocument` using `xmlName` as the key.

    Note:
    - Forms 1 and 3: If `doOutput` is `0` or omitted, only the match count is returned. Otherwise, the matches are assigned to `RESULTS`.
    - Forms 2 and 4: The matches are assigned to `outputArray`.

    The value of `outputType` determines the assignment result:
    - `1`: Node's `InnerText`
    - `2`: Node's `InnerXml`
    - `3`: Node's `OuterXml`
    - `4`: Node's `Name`
    - Other or omitted: Node's `Value`

    !!! warning "Warning"

        This does not obtain actual `XmlNode` instances, so using `//` at the beginning of `xpath` has no meaning.

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS xml = "<test><dir readonly='false'><file name='A.txt'>InnerText content A</file></dir><file name='B.txt'>InnerText content B</file></test>"
        #DIMS nodes, 10
        XML_DOCUMENT 0, xml

        ; Search directly from string
        PRINTFORML Match count: {XML_GET(xml, "/test//file", 1, 3)}
        PRINTFORML InnerXml(1): %RESULTS:0%
        PRINTFORML InnerXml(2): %RESULTS:1%

        ; Search from XmlDocument
        PRINTFORML Match count: {XML_GET(0, "/test//file/@name", 1)}
        PRINTFORML Value(1): %RESULTS:0%
        PRINTFORML Value(2): %RESULTS:1%
        PRINTFORML Match count: {XML_GET(0, "/test/dir/*[1]", nodes, 1)}
        PRINTFORML InnerText: %nodes:0%

        ONEINPUT
    ``` 
    ``` title="Result"
    Match count: 2
    InnerXml(1): <file name="A.txt">InnerText content A</file>
    InnerXml(2): <file name="B.txt">InnerText content B</file>
    Match count: 2
    Value(1): A.txt
    Value(2): B.txt
    Match count: 1
    InnerText: InnerText content A
    ```
