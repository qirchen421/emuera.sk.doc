---
hide:
  - toc
---

# XML_ADDATTRIBUTE Functions

| Function name                                                                              | Arguments                                                       | Return |
| :---------------------------------------------------------------------------------------- | :------------------------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_ADDATTRIBUTE`](./XML_ADDATTRIBUTE.md)        | `int`, `string`, `string`(, `string`, `int`, `int`)          | `int`  |
|                                                                                           | `ref` `string`, `string`, `string`(, `string`, `int`, `int`) | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_ADDATTRIBUTE_BYNAME`](./XML_ADDATTRIBUTE.md) | `string`, `string`, `string`(, `string`, `int`, `int`)        | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_ADDATTRIBUTE xmlId, xpath, attrName(, attrValue, methodType, doSetAll)
    2. int XML_ADDATTRIBUTE ref xml, xpath, attrName(, attrValue, methodType, doSetAll)
    3. int XML_ADDATTRIBUTE_BYNAME xmlName, xpath, attrName(, attrValue, methodType, doSetAll)
    ```
    Adds a new attribute `attrName=attrValue` to the specified `XML` based on attribute/element nodes selected by `xpath` ([About XPath](https://www.octoparse.com/blog/xpath-introduction)).  
    If `attrValue` is omitted, it becomes an empty string. If `doSetAll` is `0` or omitted, and the match count is 1 or more, addition is not performed.

    - If `methodType` is `0` or omitted, adds the attribute at the end of the selected element node's attribute list.
    - If `methodType` is `1`, adds the attribute before the selected attribute.
    - If `methodType` is `2`, adds the attribute after the selected attribute.

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

        PRINTFORML {XML_ADDATTRIBUTE(xml, "/xml", "foo")} -> %xml%

        XML_DOCUMENT 0, xml
        PRINTFORML {XML_ADDATTRIBUTE(0, "/xml/@foo", "id", "1", 1)} -> %XML_TOSTR(0)%

        ONEINPUT
    ``` 
    ``` title="Result"
    1 -> <xml foo="" />
    1 -> <xml id="1" foo="" />
    ```
