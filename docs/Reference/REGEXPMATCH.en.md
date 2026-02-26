---
hide:
  - toc
---

# REGEXPMATCH

| Function name                                                         | Arguments                                            | Return |
| :------------------------------------------------------------------- | :-------------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`REGEXPMATCH`](./REGEXPMATCH.md)   | `string`, `string`(, `int`)                         | `int`  |
|                                                                        | `string`, `string`, `ref` `int`, `ref` `string[]`   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int REGEXPMATCH str, pattern(, output)
    2. int REGEXPMATCH str, pattern, ref groupCount, ref matches
    ```
    
    Returns the number of matches if `str` matches the regex pattern `pattern`. Returns 0 if no match.  
    
    1. If `output` is a non-zero integer (default is `0`), assigns the number of match groups to `RESULT:1` and each match result to `RESULTS` (total: "groupCount" × "returnValue").  
    
    2. Assigns the number of match groups to `groupCount` and each match result to `matches` (total: "groupCount" × "returnValue").  

!!! hint "Hint"

    Supported as both command and expression function.

!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM groupCount
        #DIMS matches, 10
        #DIM i
        #DIM j
        #DIM count

        REGEXPMATCH "Apple Banana Car", "(.{2})\\b"
        PRINTFORML Number of matches:{RESULT}
        count = REGEXPMATCH("Apple Banana Car", ".(.{2})\\b", groupCount, matches)
        PRINTFORML Number of matches:{count} Group count:{groupCount}
        FOR i, 0, count
            PRINTFORML Result {i+1}:
            FOR j, 0, groupCount
                PRINTFORM Group {j}:%matches:(i*groupCount+j)% 
            NEXT
            PRINTL
        NEXT
        
        ONEINPUT
        
    ``` 
    ``` title="Result"
    Number of matches:3
    Number of matches:3 Group count:2
    Result 1:
    Group 0:ple Group 1:le 
    Result 2:
    Group 0:ana Group 1:na 
    Result 3:
    Group 0:Car Group 1:ar 
    ```
