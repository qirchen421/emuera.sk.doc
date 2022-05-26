(function () {
    const LeftRight = {
        scope: 'built_in',
        match: /LEFT\b|RIGHT\b/,
    }
    const Keyword = {
        scope: 'keyword',
        match: /S?IF\b|ELSE(IF)?\b|ENDIF\b|WHILE\b|DO\b|LOOP\b|WEND\b|SELECECASE\b|ENDSELECT\b|CASE(ELSE)?\b|FOR\b|NEXT\b|RETURNF?\b|CATCH\b|ENDCATCH\b|FUNC\b|ENDFUNC\b/,
    }
    const ApiType = {
        scope: 'type',
        match: /int\b|string\b/,
    }
    const BuildIn = {
        scope: 'built_in',
        match: /PRINT(V|S)?(K|D)?(L|W)?\b|PRINTDATA(K|D)?(L|W)?\b|PRINTSINGLE(V|S)?(K|D)\b|PRINT(C|LC)?(K|D)?\b|PRINTBUTTON(C|LC)?\b|PRINT_ABL\b|PRINT_TALENT\b|PRINT_MARK\b|PRINT_EXP\b|PRINT_PALAM\b|PRINT_ITEM\b|PRINT_SHOPITEM\b|UPCHECK\b|DRAWLINE\b|CLEARLINE\b|PRINT_IMG\b|PRINT_RECT\b|PRINT_SPACE\b|SETCOLOR\b|SETCOLOR\b|RESETCOLOR\b|SETBGCOLOR\b|SETBGCOLOR\b|RESETBGCOLOR\b|GETCOLOR\b|GETDEFCOLOR\b|GETBGCOLOR\b|GETDEFBGCOLOR\b|GETFOCUSCOLOR\b|FONTBOLD\b|FONTITALIC\b|FONTREGULAR\b|FONTSTYLE\b|GETSTYLE\b|CHKFONT\b|SETFONT\b|GETFONT\b|FORCEKANA\b|ALIGNMENT\b|CURRENTALIGN\b|REDRAW\b|CURRENTREDRAW\b|PRINTCPERLINE\b|LINEISEMPTY\b|BARSTR\b|MONEYSTR\b|SKIPDISP\b|ISSKIP\b|MOUSESKIP\b|TOUPPER\b|TOLOWER\b|TOHALF\b|TOFULL\b|TOSTR\b|ISNUMERIC\b|TOINT\b|STRLENS\b|STRLENSU\b|SUBSTRING\b|SUBSTRINGU\b|CHARATU\b|STRFIND\b|STRFINDU\b|STRCOUNT\b|SPLIT\b|REPLACE\b|UNICODE\b|POWER\b|ABS\b|SIGN\b|SQRT\b|GETBIT\b|MAX\b|MIN\b|LIMIT\b|INRANGE\b|SETBIT\b|CLEARBIT\b|INVERTBIT\b|ADDCHARA\b|DELCHARA\b|SWAPCHARA\b|SORTCHARA\b|GETCHARA\b|ADDDEFCHARA\b|ADDVOIDCHARA\b|DELALLCHARA\b|PICKUPCHARA\b|EXISTCSV\b|FINDCHARA\b|FINDLASTCHARA\b|COPYCHARA\b|ADDCOPYCHARA\b|VARSIZE\b|RESETDATA\b|RESETGLOBAL\b|RESET_STAIN\b|SWAP\b|CSVNAME\b|CSVCALLNAME\b|CSVNICKNAME\b|CSVMASTERNAME\b|CSVBASE\b|CSVCSTR\b|CSVABL\b|CSVTALENT\b|CSVMARK\b|CSVEXP\b|CSVRELATION\b|CSVJUEL\b|CSVEQUIP\b|CSVCFLAG\b|GETNUM\b|GETPALAMLV\b|GETEXPLV\b|FINDELEMENT\b|FINDLASTELEMENT\b|VARSET\b|CVARSET\b|ARRAYSHIFT\b|ARRAYREMOVE\b|ARRAYSORT\b|ARRAYCOPY\b|CUPCHECK\b|SAVEDATA\b|LOADDATA\b|DELDATA\b|CHKDATA\b|SAVENOS\b|SAVEGLOBAL\b|LOADGLOBAL\b|OUTPUTLOG\b|SAVECHARA\b|LOADCHARA\b|CHKCHARADATA\b|FIND_CHARADATA\b|GETTIME\b|GETMILLISECOND\b|GETSECOND\b|FORCEWAIT\b|INPUT\b|TINPUT\b|TINPUTS\b|TWAIT\b|ONEINPUT\b|TONEINPUT\b|TONEINPUTS\b|WAITANYKEY\b|BREAK\b|CONTINUE\b|RANDOMIZE\b|DUMPRAND\b|INITRAND\b|BEGIN\b|CALLTRAIN\b|DOTRAIN\b|GOTO\b|TRYGOTO\b|DEBUGCLEAR\b|ASSERT\b|TOOLTIP_SETCOLOR\b|TOOLTIP_SETDELAY\b|HTML_PRINT\b|HTML_TAGSPLIT\b|CLEARTEXTBOX\b|STOPCALLTRAIN\b|TIMES\b|BAR\b|BARL\b|SAVEGAME\b|LOADGAME\b|WAIT\b|RESTART\b|QUIT\b|GETTIMES\b|RAND\b|CBRT\b|LOG\b|LOG10\b|EXPONENT\b|SUMARRAY\b|MATCH\b|MAXARRAY\b|MINARRAY\b|SUMCARRAY\b|CMATCH\b|MAXCARRAY\b|MINCARRAY\b|GROUPMATCH\b|NOSAMES\b|ALLSAMES\b|MESSKIP\b|CONVERT\b|COLOR_FROMNAME\b|COLOR_FROMRGB\b|INRANGEARRAY\b|INRANGECARRAY\b|GETLINESTR\b|PRINTCLENGTH\b|STRFORM\b|GETCONFIG\b|GETCONFIGS\b|HTML_POPPRINTINGSTR\b|HTML_GETPRINTEDSTR\b|HTML_ESCAPE\b|HTML_TOPLAINTEXT\b|TOOLTIP_SETDURATION\b|AWAIT\b|STRJOIN\b|GETKEY\b|GETKEYTRIGGERED\b|MOUSEX\b|MOUSEY\b|ISACTIVE\b|SAVETEXT\b|LOADTEXT\b|SPRITECREATED\b|SPRITEWIDTH\b|SPRITEHEIGHT\b|SPRITEPOSX\b|SPRITEPOSY\b|SPRITESETPOS\b|SPRITEMOVE\b|ARRAYMSORT\b|CLIENTWIDTH\b|CLIENTHEIGHT\b|GCREATED\b|GWIDTH\b|GHEIGHT\b|GGETCOLOR\b|GCREATE\b|GCREATEFROMFILE\b|GDISPOSE\b|GCLEAR\b|GFILLRECTANGLE\b|GDRAWSPRITE\b|GSETCOLOR\b|GDRAWG\b|GDRAWGWITHMASK\b|GSETBRUSH\b|GSETFONT\b|GSETPEN\b|GSAVE\b|GLOAD\b|SPRITECREATE\b|SPRITEANIMECREATE\b|SPRITEANIMEADDFRAME\b|SPRITEDISPOSE\b|SPRITEGETCOLOR\b|CBGSETG\b|CBGSETSPRITE\b|CBGCLEAR\b|CBGREMOVERANGE\b|CBGSETBUTTONSPRITE\b|CBGCLEARBUTTON\b|CBGSETBMAPG\b|CBGREMOVEBMAP\b|INPUTMOUSEKEY\b|SETANIMETIMER\b|HTML_STRINGLEN\b|HTML_SUBSTRING\b|REGEXPMATCH\b|ISDEFINED\b|EXISTVAR\b|ENUM(FUNC|VAR|MACRO)(BEGINS|ENDS)?WITH\b|GETVARS?\b|SETVAR\b|VARSETEX\b|ARRAYMSORTEX\b|QUIT_AND_RESTART\b|FORCE_QUIT\b|FORCE_QUIT_AND_RESTART\b|FORCE_BEGIN\b|EXISTFUNCTION\b|TRYCALLF\b|TRYCALLFORMF\b|GDRAWTEXT\b|GGETFONT\b|GGETFONTSIZE\b|GGETFONTSTYLE\b|GGETTEXTSIZE\b|GDRAWGWITHROTATE\b|PLAYSOUND\b|STOPSOUND\b|PLAYBGM\b|STOPBGM\b|EXISTSOUND\b|SETSOUNDVOLUME\b|SETBGMVOLUME\b|XML_DOCUMENT\b|XML_RELEASE\b|XML_EXIST\b|XML_GET\b|XML_SET\b|XML_TOSTR\b|XML_ADDNODE\b|XML_REMOVENODE\b|XML_REPLACE\b|XML_ADDATTRIBUTE\b|XML_REMOVEATTRIBUTE\b|MAP_CREATE\b|MAP_EXIST\b|MAP_RELEASE\b|MAP_GET\b|MAP_HAS\b|MAP_SET\b|MAP_REMOVE\b|MAP_SIZE\b|MAP_CLEAR\b|MAP_GETKEYS\b|MAP_TOXML\b|MAP_FROMXML\b|EXISTFILE\b|UPDATECHECK\b|GETMEMORYUSAGE\b|CLEARMEMORY\b/,
    }
    const BuildInVar = {
        scope: 'variable.language',
        match: /RESULTS?\b|[A-Z]\b|COUNT\b|DAY\b|TIME\b|MONEY\b|MASTER\b|TARGET\b|ASSI\b|PLAYER\b|ASSIPLAY\b|SELECTCOM\b|PREVCOM\b|NEXTCOM\b|LOSEBASE\b|UP\b|DOWN\b|PALAMLV\b|EXPLV\b|EJAC\b|FLAG\b|TFLAG\b|ITEM\b|ITEMSALES\b|BOUGHT\b|PBAND\b|CHARANUM\b|RAND\b|STR\b|SAVESTR\b|NO\b|ISASSI\b|NAME\b|CALLNAME\b|BASE\b|MAXBASE\b|ABL\b|TALENT\b|EXP\b|MARK\b|RELATION\b|JUEL\b|CFLAG\b|EQUIP\b|TEQUIP\b|PALAM\b|STAIN\b|EX\b|SOURCE\b|NOWEX\b|GOTJUEL\b|ABLNAME\b|TALENTNAME\b|EXPNAME\b|MARKNAME\b|PALAMNAME\b|ITEMNAME\b|NOITEM\b|LOCALS?\b|ARGS?\b|GLOBALS?\b|LINECOUNT\b|ISTIMEOUT\b|__INT_MAX__\b|__INT_MIN__\b|RANDDATA\b|TSTR\b|DA\b|DB\b|DC\b|DD\b|DE\b|DITEMTYPE\b|TA\b|TB\b|NICKNAME\b|MASTERNAME\b|DOWNBASE\b|CUP\b|CDOWN\b|TCVAR\b|CSTR\b|CDFLAG\b|ITEMPRICE\b|TRAINNAME\b|BASENAME\b|EQUIPNAME\b|TEQUIPNAME\b|STAINNAME\b|EXNAME\b|SOURCENAME\b|FLAGNAME\b|TFLAGNAME\b|CFLAGNAME\b|TCVARNAME\b|STRNAME\b|TSTRNAME\b|CSTRNAME\b|SAVESTRNAME\b|CDFLAGNAME1\b|CDFLAGNAME2\b|GLOBALNAME\b|GLOBALSNAME\b|GAMEBASE_AUTHOR\b|GAMEBASE_INFO\b|GAMEBASE_YEAR\b|GAMEBASE_TITLE\b|GAMEBASE_GAMECODE\b|GAMEBASE_VERSION\b|GAMEBASE_ALLOWVERSION\b|GAMEBASE_DEFAULTCHARA\b|GAMEBASE_NOITEM\b|WINDOW_TITLE\b|MONEYLABEL\b|DRAWLINESTR\b|LASTLOAD_VERSION\b|LASTLOAD_NO\b|LASTLOAD_TEXT\b|SAVEDATA_TEXT\b/,
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
        match: /CONST\b|(SAVE|CHARA)DATA\b|GLOBAL\b|REF\b/,
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
