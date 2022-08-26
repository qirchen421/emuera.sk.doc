(function () {
    const LeftRight = {
        scope: 'meta keyword',
        match: /LEFT\b|RIGHT\b/,
    }
    const Keyword = {
        scope: 'keyword',
        match: /S?IF\b|ELSE(IF)?\b|ENDIF\b|WHILE\b|DO\b|LOOP\b|WEND\b|SELECECASE\b|ENDSELECT\b|CASE(ELSE)?\b|FOR\b|NEXT\b|RETURNF?\b|CATCH\b|ENDCATCH\b|FUNC\b|ENDFUNC\b|REND\b|REPEAT\b/,
    }
    const ApiType = {
        scope: 'type',
        match: /int\b|string\b/,
    }
    const BuildIn = {
        scope: 'built_in',
        match: /(PRINTV|PRINTVL|PRINTVW|PRINTVK|PRINTVKL|PRINTVKW|PRINTVD|PRINTVDL|PRINTVDW|PRINTS|PRINTSL|PRINTSW|PRINTSK|PRINTSKL|PRINTSKW|PRINTSD|PRINTSDL|PRINTSDW|PRINTFORMS|PRINTFORMSL|PRINTFORMSW|PRINTFORMSK|PRINTFORMSKL|PRINTFORMSKW|PRINTFORMSD|PRINTFORMSDL|PRINTFORMSDW|PRINTSINGLEV|PRINTSINGLEVK|PRINTSINGLEVD|PRINTSINGLES|PRINTSINGLESK|PRINTSINGLESD|PRINTSINGLEFORMS|PRINTSINGLEFORMSK|PRINTSINGLEFORMSD|PRINTBUTTON|PRINTBUTTONC|PRINTBUTTONLC|PRINT_ABL|PRINT_TALENT|PRINT_MARK|PRINT_EXP|PRINT_PALAM|PRINT_ITEM|PRINT_SHOPITEM|UPCHECK|DRAWLINE|CLEARLINE|PRINT_IMG|PRINT_RECT|PRINT_SPACE|SETCOLOR|SETCOLOR|RESETCOLOR|SETBGCOLOR|SETBGCOLOR|RESETBGCOLOR|GETCOLOR|GETDEFCOLOR|GETBGCOLOR|GETDEFBGCOLOR|GETFOCUSCOLOR|FONTBOLD|FONTITALIC|FONTREGULAR|FONTSTYLE|GETSTYLE|CHKFONT|SETFONT|GETFONT|FORCEKANA|ALIGNMENT|CURRENTALIGN|REDRAW|CURRENTREDRAW|PRINTCPERLINE|LINEISEMPTY|BARSTR|MONEYSTR|SKIPDISP|ISSKIP|MOUSESKIP|TOUPPER|TOLOWER|TOHALF|TOFULL|TOSTR|ISNUMERIC|TOINT|STRLENS|STRLENSU|SUBSTRING|SUBSTRINGU|CHARATU|STRFIND|STRFINDU|STRCOUNT|SPLIT|REPLACE|UNICODE|POWER|ABS|SIGN|SQRT|GETBIT|MAX|MIN|LIMIT|INRANGE|SETBIT|CLEARBIT|INVERTBIT|ADDCHARA|DELCHARA|SWAPCHARA|SORTCHARA|GETCHARA|ADDDEFCHARA|ADDVOIDCHARA|DELALLCHARA|PICKUPCHARA|EXISTCSV|FINDCHARA|FINDLASTCHARA|COPYCHARA|ADDCOPYCHARA|VARSIZE|RESETDATA|RESETGLOBAL|RESET_STAIN|SWAP|CSVNAME|CSVCALLNAME|CSVNICKNAME|CSVMASTERNAME|CSVBASE|CSVCSTR|CSVABL|CSVTALENT|CSVMARK|CSVEXP|CSVRELATION|CSVJUEL|CSVEQUIP|CSVCFLAG|GETNUM|GETPALAMLV|GETEXPLV|FINDELEMENT|FINDLASTELEMENT|VARSET|CVARSET|ARRAYSHIFT|ARRAYREMOVE|ARRAYSORT|ARRAYCOPY|CUPCHECK|SAVEDATA|LOADDATA|DELDATA|CHKDATA|SAVENOS|SAVEGLOBAL|LOADGLOBAL|OUTPUTLOG|SAVECHARA|LOADCHARA|CHKCHARADATA|FIND_CHARADATA|GETTIME|GETMILLISECOND|GETSECOND|FORCEWAIT|INPUT|TINPUT|TINPUTS|TWAIT|ONEINPUT|TONEINPUT|TONEINPUTS|WAITANYKEY|BREAK|CONTINUE|RANDOMIZE|DUMPRAND|INITRAND|BEGIN|CALLTRAIN|DOTRAIN|RETURN|RETURNF|DEBUGCLEAR|ASSERT|TOOLTIP_SETCOLOR|TOOLTIP_SETDELAY|HTML_PRINT|HTML_TAGSPLIT|CLEARTEXTBOX|STOPCALLTRAIN|TIMES|BAR|BARL|SAVEGAME|LOADGAME|WAIT|RESTART|QUIT|GETTIMES|RAND|CBRT|LOG|LOG10|EXPONENT|SUMARRAY|MATCH|MAXARRAY|MINARRAY|SUMCARRAY|CMATCH|MAXCARRAY|MINCARRAY|GROUPMATCH|NOSAMES|ALLSAMES|MESSKIP|CONVERT|COLOR_FROMNAME|COLOR_FROMRGB|INRANGEARRAY|INRANGECARRAY|GETLINESTR|PRINTCLENGTH|STRFORM|GETCONFIG|GETCONFIGS|HTML_POPPRINTINGSTR|HTML_GETPRINTEDSTR|HTML_ESCAPE|HTML_TOPLAINTEXT|TOOLTIP_SETDURATION|AWAIT|STRJOIN|GETKEY|GETKEYTRIGGERED|MOUSEX|MOUSEY|ISACTIVE|SAVETEXT|LOADTEXT|SPRITECREATED|SPRITEWIDTH|SPRITEHEIGHT|SPRITEPOSX|SPRITEPOSY|SPRITESETPOS|SPRITEMOVE|ARRAYMSORT|CLIENTWIDTH|CLIENTHEIGHT|GCREATED|GWIDTH|GHEIGHT|GGETCOLOR|GCREATE|GCREATEFROMFILE|GDISPOSE|GCLEAR|GFILLRECTANGLE|GDRAWSPRITE|GSETCOLOR|GDRAWG|GDRAWGWITHMASK|GSETBRUSH|GSETFONT|GSETPEN|GSAVE|GLOAD|SPRITECREATE|SPRITEANIMECREATE|SPRITEANIMEADDFRAME|SPRITEDISPOSE|SPRITEGETCOLOR|CBGSETG|CBGSETSPRITE|CBGCLEAR|CBGREMOVERANGE|CBGSETBUTTONSPRITE|CBGCLEARBUTTON|CBGSETBMAPG|CBGREMOVEBMAP|INPUTMOUSEKEY|SETANIMETIMER|HTML_STRINGLEN|HTML_SUBSTRING|REGEXPMATCH|ISDEFINED|EXISTVAR|ENUM(FUNC|VAR|MACRO)(BEGINS|ENDS)?WITH|GETVARS?|SETVAR|VARSETEX|ARRAYMSORTEX|QUIT_AND_RESTART|FORCE_QUIT|FORCE_QUIT_AND_RESTART|FORCE_BEGIN|EXISTFUNCTION|ENUMFILES|GDRAWTEXT|GGETFONT|GGETFONTSIZE|GGETFONTSTYLE|GGETTEXTSIZE|GDRAWGWITHROTATE|PLAYSOUND|STOPSOUND|PLAYBGM|STOPBGM|EXISTSOUND|SETSOUNDVOLUME|SETBGMVOLUME|XML_DOCUMENT|XML_RELEASE|XML_EXIST|XML_GET(_BYNAME)?|XML_SET(_BYNAME)?|XML_TOSTR|XML_ADDNODE(_BYNAME)?|XML_REMOVENODE(_BYNAME)?|XML_REPLACE(_BYNAME)?|XML_ADDATTRIBUTE(_BYNAME)?|XML_REMOVEATTRIBUTE(_BYNAME)?|MAP_CREATE|MAP_EXIST|MAP_RELEASE|MAP_GET|MAP_HAS|MAP_SET|MAP_REMOVE|MAP_SIZE|MAP_CLEAR|MAP_GETKEYS|MAP_TOXML|MAP_FROMXML|EXISTFILE|UPDATECHECK|GETMEMORYUSAGE|CLEARMEMORY|(G|S)ETTEXTBOX)\b/,
    }
    const BuildInVar = {
        scope: 'variable.language',
        match: /(DAY|MONEY|ITEM|FLAG|TFLAG|UP|PALAMLV|EXPLV|EJAC|DOWN|RESULT|COUNT|TARGET|ASSI|MASTER|NOITEM|LOSEBASE|SELECTCOM|ASSIPLAY|PREVCOM|TIME|ITEMSALES|PLAYER|NEXTCOM|PBAND|BOUGHT|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|GLOBAL|RANDDATA|SAVESTR|TSTR|STR|RESULTS|GLOBALS|SAVEDATA_TEXT|ISASSI|NO|BASE|MAXBASE|ABL|TALENT|EXP|MARK|PALAM|SOURCE|EX|CFLAG|JUEL|RELATION|EQUIP|TEQUIP|STAIN|GOTJUEL|NOWEX|DOWNBASE|CUP|CDOWN|TCVAR|NAME|CALLNAME|NICKNAME|MASTERNAME|CSTR|CDFLAG|DITEMTYPE|DA|DB|DC|DD|DE|TA|TB|ITEMPRICE|ABLNAME|TALENTNAME|EXPNAME|MARKNAME|PALAMNAME|ITEMNAME|TRAINNAME|BASENAME|SOURCENAME|EXNAME|EQUIPNAME|TEQUIPNAME|FLAGNAME|TFLAGNAME|CFLAGNAME|TCVARNAME|CSTRNAME|STAINNAME|CDFLAGNAME1|CDFLAGNAME2|STRNAME|TSTRNAME|SAVESTRNAME|GLOBALNAME|GLOBALSNAME|GAMEBASE_AUTHER|GAMEBASE_AUTHOR|GAMEBASE_INFO|GAMEBASE_YEAR|GAMEBASE_TITLE|GAMEBASE_GAMECODE|GAMEBASE_VERSION|GAMEBASE_ALLOWVERSION|GAMEBASE_DEFAULTCHARA|GAMEBASE_NOITEM|RAND|CHARANUM|LASTLOAD_TEXT|LASTLOAD_VERSION|LASTLOAD_NO|LINECOUNT|ISTIMEOUT|__INT_MAX__|__INT_MIN__|EMUERA_VERSION|WINDOW_TITLE|MONEYLABEL|DRAWLINESTR|__FILE__|__FUNCTION__|__LINE__|LOCAL|ARG|LOCALS|ARGS)\b/,
    }
    const PreProcessor = {
        begin: [
            /#/,
            /DIMS?\b|ONLY\b|FUNCTIONS?\b|LOCALS?SIZE\b|DEFINE\b/
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
        match: /CONST\b|(SAVE|CHARA)DATA\b|GLOBAL\b|REF\b|DYNAMIC\b/,
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
    const Comment = {
        scope: 'comment',
        begin: /;/,
        end: /$/,
    }
    const SpecialComment = {
        scope: 'keyword',
        match: /^\s*;(!|#);/,
    }
    const SpecialMacro = {
        begin: [
            /^\s*(;(!|#);\s*)?\[/,
            /\s*(ELSE(?:IF)?|IF(?:_N?DEBUG)?|ENDIF)/,
            /\]/,
        ],
        beginScope: {
            2: "keyword",
        },
    }
    const QuotedComment = {
        begin: [
            /^\s*(;(!|#);\s*)?\[/,
            /SKIPSTART/,
            /\]/,
        ],
        beginScope: {
            2: "keyword",
        },
        scope: 'comment',
        end: [
            /^\s*(;(!|#);\s*)?\[/,
            /SKIPEND/,
            /\]/,
        ],
        endScope: {
            2: "keyword",
        },
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
        begin: /PRINTFORMS?(K|D)?(L|W)?\b|PRINTSINGLEFORMS?(K|D)?\b|PRINTFORM(C|LC)?(K|D)?\b|PRINTPLAINFORM\b|DRAWLINEFORM\b|STRLENFORM\b|STRLENFORMU\b|ENCODETOUNI\b|THROW\b|GOTOFORM\b|TRYGOTOFORM\b|DEBUGPRINTFORM\b|DEBUGPRINTFORML\b|REUSELASTLINE\b/,
        beginScope: 'built_in',
        contains: [FormStringEol],
    }
    const FormFuncCommand = {
        begin: /JUMPFORM\b|CALLFORM\b|TRYJUMPFORM\b|TRYCALLFORM\b|CALLFORMF\b|TRYCJUMPFORM\b|TRYCCALLFORM\b/,
        beginScope: 'keyword',
        end: /[,(]|$/,
        endScope: "operator",
        contains: [FormStringFuncName],
    }
    const PlainTextPrint = {
        begin: /(PRINTSINGLE(?:K|D)?|PRINTPLAIN|PRINT(?:L?C)(?:K|D)?|PRINT(?:K|D)?(?:L|W)?|DATA|CUSTOMDRAWLINE|SETCOLORBYNAME|SETBGCOLORBYNAME|STRLENU?|ESCAPE|DEBUGPRINTL?)\b/,
        beginScope: 'built_in',
        end: /\n|$/,
        scope: 'string',
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
        begin: /RETURNFORM\b/,
        beginScope: 'built_in',
        contains: [Comma, FormStringReturn],
    }

    const PlaceHolderContains = [LeftRight, MethodCall, Keyword, BuildIn, BuildInVar, Identifier, String, Number, AtFormString, OperatorExceptMod, PunctuationExceptRB]
    StrPlaceHolder.contains = PlaceHolderContains;
    IntPlaceHolder.contains = PlaceHolderContains;
    const ErhRoot = [QuotedComment, SpecialMacro, SpecialComment, Comment, Descriptor, Keyword, Identifier, String, Number, AtFormString, PreProcessor, Operator, Punctuation];
    const ErbRoot = [QuotedComment, SpecialMacro, SpecialComment, Comment, FuncDefine, Descriptor, FormEolCommand, FormFuncCommand, ReturnCommand, PlainTextPrint, FuncCall, MethodCall, Keyword, BuildIn, BuildInVar, Identifier, String, Number, AtFormString, PreProcessor, Operator, Punctuation];
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
(function(){
    const CSVItem = {
        begin:/[^,;]/,
        end:/(?=,|;|\n|$)/,
        scope:'string',
    };
    const CSVComment = {
        begin:/;/,
        end:/\n|$/,
        scope:'comment',
    };
    hljs.registerLanguage("csv", function (_hljs) {
        return {
            name: "CSV",
            case_insensitive: false,
            unicodeRegex: true,
            disableAutodetect: true,
            contains: [CSVComment, CSVItem],
        }
    });
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
    document.querySelectorAll('div#language-csv pre code').forEach((el) => {
        el.innerHTML = hljs.highlight(el.innerText, {
            language: 'csv'
        }).value
    });
})
