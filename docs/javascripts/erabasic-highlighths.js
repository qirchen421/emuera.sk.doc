(function () {
    const LeftRight = {
        scope: 'built_in',
        match: /LEFT|RIGHT/,
    }
    const Keyword = {
        scope: 'keyword',
        match: /IF|ELSE(IF)?|ENDIF|WHILE|DO|LOOP|WEND|SELECECASE|ENDSELECT|CASE(ELSE)?|FOR|NEXT|RETURNF?|CATCH|ENDCATCH|FUNC|ENDFUNC/,
    }
    const ApiType = {
        scope: 'type',
        match: /int|string/,
    }
    const BuildIn = {
        scope: 'built_in',
        match: /PRINT(V|S)?(K|D)?(L|W)?|PRINTDATA(K|D)?(L|W)?|PRINTSINGLE(V|S)?(K|D)|PRINT(C|LC)?(K|D)?|PRINTBUTTON(C|LC)?|PRINT_ABL|PRINT_TALENT|PRINT_MARK|PRINT_EXP|PRINT_PALAM|PRINT_ITEM|PRINT_SHOPITEM|UPCHECK|DRAWLINE|CLEARLINE|PRINT_IMG|PRINT_RECT|PRINT_SPACE|SETCOLOR|SETCOLOR|RESETCOLOR|SETBGCOLOR|SETBGCOLOR|RESETBGCOLOR|GETCOLOR|GETDEFCOLOR|GETBGCOLOR|GETDEFBGCOLOR|GETFOCUSCOLOR|FONTBOLD|FONTITALIC|FONTREGULAR|FONTSTYLE|GETSTYLE|CHKFONT|SETFONT|GETFONT|FORCEKANA|ALIGNMENT|CURRENTALIGN|REDRAW|CURRENTREDRAW|PRINTCPERLINE|LINEISEMPTY|BARSTR|MONEYSTR|SKIPDISP|ISSKIP|MOUSESKIP|TOUPPER|TOLOWER|TOHALF|TOFULL|TOSTR|ISNUMERIC|TOINT|STRLENS|STRLENSU|SUBSTRING|SUBSTRINGU|CHARATU|STRFIND|STRFINDU|STRCOUNT|SPLIT|REPLACE|UNICODE|POWER|ABS|SIGN|SQRT|GETBIT|MAX|MIN|LIMIT|INRANGE|SETBIT|CLEARBIT|INVERTBIT|ADDCHARA|DELCHARA|SWAPCHARA|SORTCHARA|GETCHARA|ADDDEFCHARA|ADDVOIDCHARA|DELALLCHARA|PICKUPCHARA|EXISTCSV|FINDCHARA|FINDLASTCHARA|COPYCHARA|ADDCOPYCHARA|VARSIZE|RESETDATA|RESETGLOBAL|RESET_STAIN|SWAP|CSVNAME|CSVCALLNAME|CSVNICKNAME|CSVMASTERNAME|CSVBASE|CSVCSTR|CSVABL|CSVTALENT|CSVMARK|CSVEXP|CSVRELATION|CSVJUEL|CSVEQUIP|CSVCFLAG|GETNUM|GETPALAMLV|GETEXPLV|FINDELEMENT|FINDLASTELEMENT|VARSET|CVARSET|ARRAYSHIFT|ARRAYREMOVE|ARRAYSORT|ARRAYCOPY|CUPCHECK|SAVEDATA|LOADDATA|DELDATA|CHKDATA|SAVENOS|SAVEGLOBAL|LOADGLOBAL|OUTPUTLOG|SAVECHARA|LOADCHARA|CHKCHARADATA|FIND_CHARADATA|GETTIME|GETMILLISECOND|GETSECOND|FORCEWAIT|INPUT|TINPUT|TINPUTS|TWAIT|ONEINPUT|TONEINPUT|TONEINPUTS|WAITANYKEY|BREAK|CONTINUE|RANDOMIZE|DUMPRAND|INITRAND|BEGIN|CALLTRAIN|DOTRAIN|GOTO|TRYGOTO|DEBUGCLEAR|ASSERT|TOOLTIP_SETCOLOR|TOOLTIP_SETDELAY|HTML_PRINT|HTML_TAGSPLIT|CLEARTEXTBOX|STOPCALLTRAIN|TIMES|BAR|BARL|SAVEGAME|LOADGAME|WAIT|RESTART|QUIT|GETTIMES|RAND|CBRT|LOG|LOG10|EXPONENT|SUMARRAY|MATCH|MAXARRAY|MINARRAY|SUMCARRAY|CMATCH|MAXCARRAY|MINCARRAY|GROUPMATCH|NOSAMES|ALLSAMES|MESSKIP|CONVERT|COLOR_FROMNAME|COLOR_FROMRGB|INRANGEARRAY|INRANGECARRAY|GETLINESTR|PRINTCLENGTH|STRFORM|GETCONFIG|GETCONFIGS|HTML_POPPRINTINGSTR|HTML_GETPRINTEDSTR|HTML_ESCAPE|HTML_TOPLAINTEXT|TOOLTIP_SETDURATION|AWAIT|STRJOIN|GETKEY|GETKEYTRIGGERED|MOUSEX|MOUSEY|ISACTIVE|SAVETEXT|LOADTEXT|SPRITECREATED|SPRITEWIDTH|SPRITEHEIGHT|SPRITEPOSX|SPRITEPOSY|SPRITESETPOS|SPRITEMOVE|ARRAYMSORT|CLIENTWIDTH|CLIENTHEIGHT|GCREATED|GWIDTH|GHEIGHT|GGETCOLOR|GCREATE|GCREATEFROMFILE|GDISPOSE|GCLEAR|GFILLRECTANGLE|GDRAWSPRITE|GSETCOLOR|GDRAWG|GDRAWGWITHMASK|GSETBRUSH|GSETFONT|GSETPEN|GSAVE|GLOAD|SPRITECREATE|SPRITEANIMECREATE|SPRITEANIMEADDFRAME|SPRITEDISPOSE|SPRITEGETCOLOR|CBGSETG|CBGSETSPRITE|CBGCLEAR|CBGREMOVERANGE|CBGSETBUTTONSPRITE|CBGCLEARBUTTON|CBGSETBMAPG|CBGREMOVEBMAP|INPUTMOUSEKEY|SETANIMETIMER|HTML_STRINGLEN|HTML_SUBSTRING|REGEXPMATCH|ISDEFINED|EXISTVAR|ENUM(FUNC|VAR|MACRO)(BEGINS|ENDS)?WITH|GETVARS?|SETVAR|VARSETEX|ARRAYMSORTEX|QUIT_AND_RESTART|FORCE_QUIT|FORCE_QUIT_AND_RESTART|FORCE_BEGIN|EXISTFUNCTION|TRYCALLF|TRYCALLFORMF|GDRAWTEXT|GGETFONT|GGETFONTSIZE|GGETFONTSTYLE|GGETTEXTSIZE|GDRAWGWITHROTATE|PLAYSOUND|STOPSOUND|PLAYBGM|STOPBGM|EXISTSOUND|SETSOUNDVOLUME|SETBGMVOLUME|XML_DOCUMENT|XML_RELEASE|XML_EXIST|XML_GET|XML_SET|XML_TOSTR|XML_ADDNODE|XML_REMOVENODE|XML_REPLACE|XML_ADDATTRIBUTE|XML_REMOVEATTRIBUTE|MAP_CREATE|MAP_EXIST|MAP_RELEASE|MAP_GET|MAP_HAS|MAP_SET|MAP_REMOVE|MAP_SIZE|MAP_CLEAR|MAP_GETKEYS|MAP_TOXML|MAP_FROMXML|EXISTFILE|UPDATECHECK|GETMEMORYUSAGE|CLEARMEMORY/,
    }
    const BuildInVar = {
        scope: 'variable.language',
        match: /RESULTS?|[A-Z]|COUNT|DAY|TIME|MONEY|MASTER|TARGET|ASSI|PLAYER|ASSIPLAY|SELECTCOM|PREVCOM|NEXTCOM|LOSEBASE|UP|DOWN|PALAMLV|EXPLV|EJAC|FLAG|TFLAG|ITEM|ITEMSALES|BOUGHT|PBAND|CHARANUM|RAND|STR|SAVESTR|NO|ISASSI|NAME|CALLNAME|BASE|MAXBASE|ABL|TALENT|EXP|MARK|RELATION|JUEL|CFLAG|EQUIP|TEQUIP|PALAM|STAIN|EX|SOURCE|NOWEX|GOTJUEL|ABLNAME|TALENTNAME|EXPNAME|MARKNAME|PALAMNAME|ITEMNAME|NOITEM|LOCALS?|ARGS?|GLOBALS?|LINECOUNT|ISTIMEOUT|__INT_MAX__|__INT_MIN__|RANDDATA|TSTR|DA|DB|DC|DD|DE|DITEMTYPE|TA|TB|NICKNAME|MASTERNAME|DOWNBASE|CUP|CDOWN|TCVAR|CSTR|CDFLAG|ITEMPRICE|TRAINNAME|BASENAME|EQUIPNAME|TEQUIPNAME|STAINNAME|EXNAME|SOURCENAME|FLAGNAME|TFLAGNAME|CFLAGNAME|TCVARNAME|STRNAME|TSTRNAME|CSTRNAME|SAVESTRNAME|CDFLAGNAME1|CDFLAGNAME2|GLOBALNAME|GLOBALSNAME|GAMEBASE_AUTHOR|GAMEBASE_INFO|GAMEBASE_YEAR|GAMEBASE_TITLE|GAMEBASE_GAMECODE|GAMEBASE_VERSION|GAMEBASE_ALLOWVERSION|GAMEBASE_DEFAULTCHARA|GAMEBASE_NOITEM|WINDOW_TITLE|MONEYLABEL|DRAWLINESTR|LASTLOAD_VERSION|LASTLOAD_NO|LASTLOAD_TEXT|SAVEDATA_TEXT/,
    }
    const PreProcessor = {
        begin: [
            /#/,
            /DIMS?|ONLY|FUNCTIONS?|LOCALS?SIZE|DEFINE/
        ],
        beginScope: {
            1: "punctuation",
            2: "type",
        },
    }
    const FuncDefine = {
        begin: [
            /@/,
            /(?!\d)[^\x00-\x2f\x3a-\x40\x5b-\x5e\x60\x7b-\x7e]+/
        ],
        beginScope: {
            1: "punctuation",
            2: "title.function",
        },
    }
    const Descriptor = {
        scope: 'meta keyword',
        match: /CONST|(SAVE|CHARA)DATA|GLOBAL|REF/,
    };
    const Identifier = {
        scope: 'title',
        match: /(?!\d)[^\x00-\x2f\x3a-\x40\x5b-\x5e\x60\x7b-\x7e]+/,
    };
    const FuncCall = {
        begin: [
            /CALLF?/,
            /[^\n\S]*/,
            /(?!\d)[^\x00-\x2f\x3a-\x40\x5b-\x5e\x60\x7b-\x7e]+/,
        ],
        beginScope: {
            1: "keyword",
            3: "title.function.invoke",
        },
    }
    const MethodCall = {
        begin: [
            /(?!\d)[^\x00-\x2f\x3a-\x40\x5b-\x5e\x60\x7b-\x7e]+/,
            /[^\n\S]*/,
            /\(/,
        ],
        beginScope: {
            1: "title.function.invoke",
            3: "punctuation",
        },
    }
    const Number = {
        scope: 'number',
        match: /0[xX][0-9a-fA-F]+|0[bB][01]+|\d+(?:[eEpP]\d+)?/,
    };
    const StringChar = {
        match: /[^\\"]+/
    }
    const EscapeChar = {
        scope: 'char.escape',
        match: /\\./
    }
    const String = {
        scope: 'string',
        begin: /"/,
        end: /"/,
        contains: [StringChar, EscapeChar],
    };
    const SkipComment = {
        scope: 'comment',
        begin: /;/,
        end: /$/,
    }
    const Operator = {
        scope: 'operator',
        match: /<<|>>|==|!=|<=|>=|<|>|&&?|\|\|?|\^\^?|!&|!\\|!|~|&|\||\^|[+\-*/&|%']?=|--?|\+\+?|\*|\/|%|\?|#|:|,/,
    };
    const OperatorExceptMod = {
        scope: 'operator',
        match: /<<|>>|==|!=|<=|>=|<|>|&&?|\|\|?|\^\^?|!&|!\\|!|~|&|\||\^|[+\-*/&|%']?=|--?|\+\+?|\*|\/|\?|#|:|,/,
    };
    const Punctuation = {
        scope: 'punctuation',
        match: /\(|\)|\{|\}/,
    };
    const PunctuationExceptRB = {
        scope: 'punctuation',
        match: /\(|\)|\{/,
    };
    const StrPlaceHolder = {
        begin: /%/,
        beginScope: "doctag",
        end: /%/,
        endScope: "doctag",
    };
    const IntPlaceHolder = {
        begin: /\{/,
        beginScope: "doctag",
        end: /\}/,
        endScope: "doctag",
    };
    const AtFormStringChar = {
        match: /[^\\"{%]+/,
    }
    const AtFormString = {
        scope: 'string',
        begin: /@"/,
        end: /"/,
        contains: [StrPlaceHolder, IntPlaceHolder, EscapeChar, AtFormStringChar],
    };
    const FormStringFuncNameChar = {
        match: /[^\\{%\n,(]+/,
    }
    const FormStringFuncName = {
        scope: 'title.function.invoke',
        begin: /./,
        endsParent: true,
        contains: [StrPlaceHolder, IntPlaceHolder, EscapeChar, FormStringFuncNameChar],
    };
    const FormStringEolChar = {
        match: /[^\\{%\n]+/,
    }
    const FormStringEol = {
        scope: 'string',
        begin: /./,
        end: /$/,
        excludeEnd: true,
        contains: [StrPlaceHolder, IntPlaceHolder, EscapeChar, FormStringEolChar],
    };
    const FormEolCommand = {
        begin: [
            /PRINTFORMS?(K|D)?(L|W)?|PRINTSINGLEFORMS?(K|D)?|PRINTFORM(C|LC)?(K|D)?|PRINTPLAINFORM|DRAWLINEFORM|STRLENFORM|STRLENFORMU|ENCODETOUNI|THROW|GOTOFORM|TRYGOTOFORM|DEBUGPRINTFORM|DEBUGPRINTFORML|REUSELASTLINE/,
            / /,
        ],
        beginScope: {
            1: 'built_in'
        },
        contains: [FormStringEol],
    }
    const FormFuncCommand = {
        begin: [
            /JUMPFORM|CALLFORM|TRYJUMPFORM|TRYCALLFORM|CALLFORMF|TRYCJUMPFORM|TRYCCALLFORM/,
            / /,
        ],
        beginScope: {
            1: 'keyword'
        },
        end: /[,(]|$/,
        endScope: "operator",
        contains: [FormStringFuncName],
    }
    const FormStringReturnChar = {
        match: /[^\\{%\n,]+/,
    }
    const FormStringReturn = {
        scope: 'string',
        begin: /[^,\n]/,
        contains: [StrPlaceHolder, IntPlaceHolder, EscapeChar, FormStringReturnChar],
    };
    const Comma = {
        scope: 'operator',
        match: /,/,
    }
    const ReturnCommand = {
        begin: [
            /RETURNFORM/,
            / /,
        ],
        beginScope: {
            1: 'built_in'
        },
        contains: [Comma, FormStringReturn],
    }

    const PlaceHolderContains = [LeftRight, Keyword, BuildIn, BuildInVar, Identifier, String, Number, AtFormString, OperatorExceptMod, PunctuationExceptRB]
    StrPlaceHolder.contains = PlaceHolderContains;
    IntPlaceHolder.contains = PlaceHolderContains;
    const ErhRoot = [SkipComment, Descriptor, Keyword, Identifier, String, Number, AtFormString, PreProcessor, Operator, Punctuation];
    const ErbRoot = [SkipComment, FuncDefine, Descriptor, FormEolCommand, FormFuncCommand, ReturnCommand, FuncCall, MethodCall, Keyword, BuildIn, BuildInVar, Identifier, String, Number, AtFormString, PreProcessor, Operator, Punctuation];
    const ErbAPIRoot = [BuildIn, ApiType, Identifier, Operator, Punctuation, Number];
    const GetRule = function (case_insensitive, erh) {
        return function (_hljs) {
            return {
                name: "EraBasic",
                case_insensitive: case_insensitive,
                unicodeRegex: true,
                disableAutodetect: true,
                contains: erh===undefined ? ErbAPIRoot : (erh? ErhRoot : ErbRoot),
            }
        }
    };
    hljs.registerLanguage("erh", GetRule(false, true));
    hljs.registerLanguage("erb", GetRule(false, false));
    hljs.registerLanguage("erhi", GetRule(true, true));
    hljs.registerLanguage("erbi", GetRule(true, false));
    hljs.registerLanguage("erbapi", GetRule(false));
})();

document$.subscribe(() => {
    document.querySelectorAll('div#language-erh pre code').forEach((el) => {
        el.innerHTML = hljs.highlight(el.innerText, {
            language: 'erh'
        }).value
    });
    document.querySelectorAll('div#language-erb pre code').forEach((el) => {
        el.innerHTML = hljs.highlight(el.innerText, {
            language: 'erb'
        }).value
    });
    document.querySelectorAll('div#language-erhi pre code').forEach((el) => {
        el.innerHTML = hljs.highlight(el.innerText, {
            language: 'erhi'
        }).value
    });
    document.querySelectorAll('div#language-erhi pre code').forEach((el) => {
        el.innerHTML = hljs.highlight(el.innerText, {
            language: 'erhi'
        }).value
    });
    document.querySelectorAll('div#language-erbapi pre code').forEach((el) => {
        el.innerHTML = hljs.highlight(el.innerText, {
            language: 'erbapi'
        }).value
    });
})
