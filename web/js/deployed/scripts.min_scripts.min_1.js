(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ? factory(global, true) : function(w) {
            if (!w.document) {
                throw new Error("jQuery requires a window with a document");
            }
            return factory(w);
        };
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    var arr = [];
    var slice = arr.slice;
    var concat = arr.concat;
    var push = arr.push;
    var indexOf = arr.indexOf;
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var support = {};
    var document = window.document, version = "2.1.4", jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
    }, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function(all, letter) {
        return letter.toUpperCase();
    };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: "",
        length: 0,
        toArray: function() {
            return slice.call(this);
        },
        get: function(num) {
            return num != null ? num < 0 ? this[num + this.length] : this[num] : slice.call(this);
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            ret.prevObject = this;
            ret.context = this.context;
            return ret;
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args);
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(i) {
            var len = this.length, j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [ this[j] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: push,
        sort: arr.sort,
        splice: arr.splice
    };
    jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {};
            i++;
        }
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {};
        }
        if (i === length) {
            target = this;
            i--;
        }
        for (;i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];
                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }
                        target[name] = jQuery.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };
    jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: true,
        error: function(msg) {
            throw new Error(msg);
        },
        noop: function() {},
        isFunction: function(obj) {
            return jQuery.type(obj) === "function";
        },
        isArray: Array.isArray,
        isWindow: function(obj) {
            return obj != null && obj === obj.window;
        },
        isNumeric: function(obj) {
            return !jQuery.isArray(obj) && obj - parseFloat(obj) + 1 >= 0;
        },
        isPlainObject: function(obj) {
            if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                return false;
            }
            if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
            return true;
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        },
        type: function(obj) {
            if (obj == null) {
                return obj + "";
            }
            return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
        },
        globalEval: function(code) {
            var script, indirect = eval;
            code = jQuery.trim(code);
            if (code) {
                if (code.indexOf("use strict") === 1) {
                    script = document.createElement("script");
                    script.text = code;
                    document.head.appendChild(script).parentNode.removeChild(script);
                } else {
                    indirect(code);
                }
            }
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        each: function(obj, callback, args) {
            var value, i = 0, length = obj.length, isArray = isArraylike(obj);
            if (args) {
                if (isArray) {
                    for (;i < length; i++) {
                        value = callback.apply(obj[i], args);
                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.apply(obj[i], args);
                        if (value === false) {
                            break;
                        }
                    }
                }
            } else {
                if (isArray) {
                    for (;i < length; i++) {
                        value = callback.call(obj[i], i, obj[i]);
                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.call(obj[i], i, obj[i]);
                        if (value === false) {
                            break;
                        }
                    }
                }
            }
            return obj;
        },
        trim: function(text) {
            return text == null ? "" : (text + "").replace(rtrim, "");
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            if (arr != null) {
                if (isArraylike(Object(arr))) {
                    jQuery.merge(ret, typeof arr === "string" ? [ arr ] : arr);
                } else {
                    push.call(ret, arr);
                }
            }
            return ret;
        },
        inArray: function(elem, arr, i) {
            return arr == null ? -1 : indexOf.call(arr, elem, i);
        },
        merge: function(first, second) {
            var len = +second.length, j = 0, i = first.length;
            for (;j < len; j++) {
                first[i++] = second[j];
            }
            first.length = i;
            return first;
        },
        grep: function(elems, callback, invert) {
            var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
            for (;i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                    matches.push(elems[i]);
                }
            }
            return matches;
        },
        map: function(elems, callback, arg) {
            var value, i = 0, length = elems.length, isArray = isArraylike(elems), ret = [];
            if (isArray) {
                for (;i < length; i++) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value);
                    }
                }
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value);
                    }
                }
            }
            return concat.apply([], ret);
        },
        guid: 1,
        proxy: function(fn, context) {
            var tmp, args, proxy;
            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp;
            }
            if (!jQuery.isFunction(fn)) {
                return undefined;
            }
            args = slice.call(arguments, 2);
            proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            };
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;
            return proxy;
        },
        now: Date.now,
        support: support
    });
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    function isArraylike(obj) {
        var length = "length" in obj && obj.length, type = jQuery.type(obj);
        if (type === "function" || jQuery.isWindow(obj)) {
            return false;
        }
        if (obj.nodeType === 1 && length) {
            return true;
        }
        return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
    }
    var Sizzle = function(window) {
        var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function(a, b) {
            if (a === b) {
                hasDuplicate = true;
            }
            return 0;
        }, MAX_NEGATIVE = 1 << 31, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = function(list, elem) {
            var i = 0, len = list.length;
            for (;i < len; i++) {
                if (list[i] === elem) {
                    return i;
                }
            }
            return -1;
        }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + ".*" + ")\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            ID: new RegExp("^#(" + characterEncoding + ")"),
            CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
            TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + booleans + ")$", "i"),
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = /'|\\/g, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 65536;
            return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
        }, unloadHandler = function() {
            setDocument();
        };
        try {
            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
            arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els));
                } : function(target, els) {
                    var j = target.length, i = 0;
                    while (target[j++] = els[i++]) {}
                    target.length = j - 1;
                }
            };
        }
        function Sizzle(selector, context, results, seed) {
            var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
            if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                setDocument(context);
            }
            context = context || document;
            results = results || [];
            nodeType = context.nodeType;
            if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
                return results;
            }
            if (!seed && documentIsHTML) {
                if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
                    if (m = match[1]) {
                        if (nodeType === 9) {
                            elem = context.getElementById(m);
                            if (elem && elem.parentNode) {
                                if (elem.id === m) {
                                    results.push(elem);
                                    return results;
                                }
                            } else {
                                return results;
                            }
                        } else {
                            if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                                results.push(elem);
                                return results;
                            }
                        }
                    } else if (match[2]) {
                        push.apply(results, context.getElementsByTagName(selector));
                        return results;
                    } else if ((m = match[3]) && support.getElementsByClassName) {
                        push.apply(results, context.getElementsByClassName(m));
                        return results;
                    }
                }
                if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    nid = old = expando;
                    newContext = context;
                    newSelector = nodeType !== 1 && selector;
                    if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                        groups = tokenize(selector);
                        if (old = context.getAttribute("id")) {
                            nid = old.replace(rescape, "\\$&");
                        } else {
                            context.setAttribute("id", nid);
                        }
                        nid = "[id='" + nid + "'] ";
                        i = groups.length;
                        while (i--) {
                            groups[i] = nid + toSelector(groups[i]);
                        }
                        newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                        newSelector = groups.join(",");
                    }
                    if (newSelector) {
                        try {
                            push.apply(results, newContext.querySelectorAll(newSelector));
                            return results;
                        } catch (qsaError) {} finally {
                            if (!old) {
                                context.removeAttribute("id");
                            }
                        }
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }
        function createCache() {
            var keys = [];
            function cache(key, value) {
                if (keys.push(key + " ") > Expr.cacheLength) {
                    delete cache[keys.shift()];
                }
                return cache[key + " "] = value;
            }
            return cache;
        }
        function markFunction(fn) {
            fn[expando] = true;
            return fn;
        }
        function assert(fn) {
            var div = document.createElement("div");
            try {
                return !!fn(div);
            } catch (e) {
                return false;
            } finally {
                if (div.parentNode) {
                    div.parentNode.removeChild(div);
                }
                div = null;
            }
        }
        function addHandle(attrs, handler) {
            var arr = attrs.split("|"), i = attrs.length;
            while (i--) {
                Expr.attrHandle[arr[i]] = handler;
            }
        }
        function siblingCheck(a, b) {
            var cur = b && a, diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff) {
                return diff;
            }
            if (cur) {
                while (cur = cur.nextSibling) {
                    if (cur === b) {
                        return -1;
                    }
                }
            }
            return a ? 1 : -1;
        }
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === type;
            };
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return (name === "input" || name === "button") && elem.type === type;
            };
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                argument = +argument;
                return markFunction(function(seed, matches) {
                    var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
                    while (i--) {
                        if (seed[j = matchIndexes[i]]) {
                            seed[j] = !(matches[j] = seed[j]);
                        }
                    }
                });
            });
        }
        function testContext(context) {
            return context && typeof context.getElementsByTagName !== "undefined" && context;
        }
        support = Sizzle.support = {};
        isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false;
        };
        setDocument = Sizzle.setDocument = function(node) {
            var hasCompare, parent, doc = node ? node.ownerDocument || node : preferredDoc;
            if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                return document;
            }
            document = doc;
            docElem = doc.documentElement;
            parent = doc.defaultView;
            if (parent && parent !== parent.top) {
                if (parent.addEventListener) {
                    parent.addEventListener("unload", unloadHandler, false);
                } else if (parent.attachEvent) {
                    parent.attachEvent("onunload", unloadHandler);
                }
            }
            documentIsHTML = !isXML(doc);
            support.attributes = assert(function(div) {
                div.className = "i";
                return !div.getAttribute("className");
            });
            support.getElementsByTagName = assert(function(div) {
                div.appendChild(doc.createComment(""));
                return !div.getElementsByTagName("*").length;
            });
            support.getElementsByClassName = rnative.test(doc.getElementsByClassName);
            support.getById = assert(function(div) {
                docElem.appendChild(div).id = expando;
                return !doc.getElementsByName || !doc.getElementsByName(expando).length;
            });
            if (support.getById) {
                Expr.find["ID"] = function(id, context) {
                    if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                        var m = context.getElementById(id);
                        return m && m.parentNode ? [ m ] : [];
                    }
                };
                Expr.filter["ID"] = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        return elem.getAttribute("id") === attrId;
                    };
                };
            } else {
                delete Expr.find["ID"];
                Expr.filter["ID"] = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                        return node && node.value === attrId;
                    };
                };
            }
            Expr.find["TAG"] = support.getElementsByTagName ? function(tag, context) {
                if (typeof context.getElementsByTagName !== "undefined") {
                    return context.getElementsByTagName(tag);
                } else if (support.qsa) {
                    return context.querySelectorAll(tag);
                }
            } : function(tag, context) {
                var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                if (tag === "*") {
                    while (elem = results[i++]) {
                        if (elem.nodeType === 1) {
                            tmp.push(elem);
                        }
                    }
                    return tmp;
                }
                return results;
            };
            Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
                if (documentIsHTML) {
                    return context.getElementsByClassName(className);
                }
            };
            rbuggyMatches = [];
            rbuggyQSA = [];
            if (support.qsa = rnative.test(doc.querySelectorAll)) {
                assert(function(div) {
                    docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\f]' msallowcapture=''>" + "<option selected=''></option></select>";
                    if (div.querySelectorAll("[msallowcapture^='']").length) {
                        rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                    }
                    if (!div.querySelectorAll("[selected]").length) {
                        rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                    }
                    if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
                        rbuggyQSA.push("~=");
                    }
                    if (!div.querySelectorAll(":checked").length) {
                        rbuggyQSA.push(":checked");
                    }
                    if (!div.querySelectorAll("a#" + expando + "+*").length) {
                        rbuggyQSA.push(".#.+[+~]");
                    }
                });
                assert(function(div) {
                    var input = doc.createElement("input");
                    input.setAttribute("type", "hidden");
                    div.appendChild(input).setAttribute("name", "D");
                    if (div.querySelectorAll("[name=d]").length) {
                        rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
                    }
                    if (!div.querySelectorAll(":enabled").length) {
                        rbuggyQSA.push(":enabled", ":disabled");
                    }
                    div.querySelectorAll("*,:x");
                    rbuggyQSA.push(",.*:");
                });
            }
            if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
                assert(function(div) {
                    support.disconnectedMatch = matches.call(div, "div");
                    matches.call(div, "[s!='']:x");
                    rbuggyMatches.push("!=", pseudos);
                });
            }
            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
            rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
            hasCompare = rnative.test(docElem.compareDocumentPosition);
            contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
                return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
            } : function(a, b) {
                if (b) {
                    while (b = b.parentNode) {
                        if (b === a) {
                            return true;
                        }
                    }
                }
                return false;
            };
            sortOrder = hasCompare ? function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                if (compare) {
                    return compare;
                }
                compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
                if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
                    if (a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                        return -1;
                    }
                    if (b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                        return 1;
                    }
                    return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                }
                return compare & 4 ? -1 : 1;
            } : function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [ a ], bp = [ b ];
                if (!aup || !bup) {
                    return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                } else if (aup === bup) {
                    return siblingCheck(a, b);
                }
                cur = a;
                while (cur = cur.parentNode) {
                    ap.unshift(cur);
                }
                cur = b;
                while (cur = cur.parentNode) {
                    bp.unshift(cur);
                }
                while (ap[i] === bp[i]) {
                    i++;
                }
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
            };
            return doc;
        };
        Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements);
        };
        Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem);
            }
            expr = expr.replace(rattributeQuotes, "='$1']");
            if (support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
                try {
                    var ret = matches.call(elem, expr);
                    if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
                        return ret;
                    }
                } catch (e) {}
            }
            return Sizzle(expr, document, null, [ elem ]).length > 0;
        };
        Sizzle.contains = function(context, elem) {
            if ((context.ownerDocument || context) !== document) {
                setDocument(context);
            }
            return contains(context, elem);
        };
        Sizzle.attr = function(elem, name) {
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem);
            }
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
            return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        };
        Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        };
        Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i = 0;
            hasDuplicate = !support.detectDuplicates;
            sortInput = !support.sortStable && results.slice(0);
            results.sort(sortOrder);
            if (hasDuplicate) {
                while (elem = results[i++]) {
                    if (elem === results[i]) {
                        j = duplicates.push(i);
                    }
                }
                while (j--) {
                    results.splice(duplicates[j], 1);
                }
            }
            sortInput = null;
            return results;
        };
        getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (!nodeType) {
                while (node = elem[i++]) {
                    ret += getText(node);
                }
            } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                if (typeof elem.textContent === "string") {
                    return elem.textContent;
                } else {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                        ret += getText(elem);
                    }
                }
            } else if (nodeType === 3 || nodeType === 4) {
                return elem.nodeValue;
            }
            return ret;
        };
        Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: true
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: true
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(match) {
                    match[1] = match[1].replace(runescape, funescape);
                    match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
                    if (match[2] === "~=") {
                        match[3] = " " + match[3] + " ";
                    }
                    return match.slice(0, 4);
                },
                CHILD: function(match) {
                    match[1] = match[1].toLowerCase();
                    if (match[1].slice(0, 3) === "nth") {
                        if (!match[3]) {
                            Sizzle.error(match[0]);
                        }
                        match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                        match[5] = +(match[7] + match[8] || match[3] === "odd");
                    } else if (match[3]) {
                        Sizzle.error(match[0]);
                    }
                    return match;
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[6] && match[2];
                    if (matchExpr["CHILD"].test(match[0])) {
                        return null;
                    }
                    if (match[3]) {
                        match[2] = match[4] || match[5] || "";
                    } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                        match[0] = match[0].slice(0, excess);
                        match[2] = unquoted.slice(0, excess);
                    }
                    return match.slice(0, 3);
                }
            },
            filter: {
                TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return nodeNameSelector === "*" ? function() {
                        return true;
                    } : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
                    });
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        if (result == null) {
                            return operator === "!=";
                        }
                        if (!operator) {
                            return true;
                        }
                        result += "";
                        return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
                    };
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = type.slice(0, 3) !== "nth", forward = type.slice(-4) !== "last", ofType = what === "of-type";
                    return first === 1 && last === 0 ? function(elem) {
                        return !!elem.parentNode;
                    } : function(elem, context, xml) {
                        var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType;
                        if (parent) {
                            if (simple) {
                                while (dir) {
                                    node = elem;
                                    while (node = node[dir]) {
                                        if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                                            return false;
                                        }
                                    }
                                    start = dir = type === "only" && !start && "nextSibling";
                                }
                                return true;
                            }
                            start = [ forward ? parent.firstChild : parent.lastChild ];
                            if (forward && useCache) {
                                outerCache = parent[expando] || (parent[expando] = {});
                                cache = outerCache[type] || [];
                                nodeIndex = cache[0] === dirruns && cache[1];
                                diff = cache[0] === dirruns && cache[2];
                                node = nodeIndex && parent.childNodes[nodeIndex];
                                while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                                    if (node.nodeType === 1 && ++diff && node === elem) {
                                        outerCache[type] = [ dirruns, nodeIndex, diff ];
                                        break;
                                    }
                                }
                            } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                                diff = cache[1];
                            } else {
                                while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                                        if (useCache) {
                                            (node[expando] || (node[expando] = {}))[type] = [ dirruns, diff ];
                                        }
                                        if (node === elem) {
                                            break;
                                        }
                                    }
                                }
                            }
                            diff -= last;
                            return diff === first || diff % first === 0 && diff / first >= 0;
                        }
                    };
                },
                PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    if (fn[expando]) {
                        return fn(argument);
                    }
                    if (fn.length > 1) {
                        args = [ pseudo, pseudo, "", argument ];
                        return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                            var idx, matched = fn(seed, argument), i = matched.length;
                            while (i--) {
                                idx = indexOf(seed, matched[i]);
                                seed[idx] = !(matches[idx] = matched[i]);
                            }
                        }) : function(elem) {
                            return fn(elem, 0, args);
                        };
                    }
                    return fn;
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
                        while (i--) {
                            if (elem = unmatched[i]) {
                                seed[i] = !(matches[i] = elem);
                            }
                        }
                    }) : function(elem, context, xml) {
                        input[0] = elem;
                        matcher(input, null, xml, results);
                        input[0] = null;
                        return !results.pop();
                    };
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                contains: markFunction(function(text) {
                    text = text.replace(runescape, funescape);
                    return function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                lang: markFunction(function(lang) {
                    if (!ridentifier.test(lang || "")) {
                        Sizzle.error("unsupported lang: " + lang);
                    }
                    lang = lang.replace(runescape, funescape).toLowerCase();
                    return function(elem) {
                        var elemLang;
                        do {
                            if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                                elemLang = elemLang.toLowerCase();
                                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                            }
                        } while ((elem = elem.parentNode) && elem.nodeType === 1);
                        return false;
                    };
                }),
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                root: function(elem) {
                    return elem === docElem;
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                enabled: function(elem) {
                    return elem.disabled === false;
                },
                disabled: function(elem) {
                    return elem.disabled === true;
                },
                checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
                },
                selected: function(elem) {
                    if (elem.parentNode) {
                        elem.parentNode.selectedIndex;
                    }
                    return elem.selected === true;
                },
                empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                        if (elem.nodeType < 6) {
                            return false;
                        }
                    }
                    return true;
                },
                parent: function(elem) {
                    return !Expr.pseudos["empty"](elem);
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName);
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName);
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === "button" || name === "button";
                },
                text: function(elem) {
                    var attr;
                    return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
                },
                first: createPositionalPseudo(function() {
                    return [ 0 ];
                }),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [ length - 1 ];
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [ argument < 0 ? argument + length : argument ];
                }),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    var i = 0;
                    for (;i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    var i = 1;
                    for (;i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (;--i >= 0; ) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (;++i < length; ) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                })
            }
        };
        Expr.pseudos["nth"] = Expr.pseudos["eq"];
        for (i in {
            radio: true,
            checkbox: true,
            file: true,
            password: true,
            image: true
        }) {
            Expr.pseudos[i] = createInputPseudo(i);
        }
        for (i in {
            submit: true,
            reset: true
        }) {
            Expr.pseudos[i] = createButtonPseudo(i);
        }
        function setFilters() {}
        setFilters.prototype = Expr.filters = Expr.pseudos;
        Expr.setFilters = new setFilters();
        tokenize = Sizzle.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) {
                return parseOnly ? 0 : cached.slice(0);
            }
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
                if (!matched || (match = rcomma.exec(soFar))) {
                    if (match) {
                        soFar = soFar.slice(match[0].length) || soFar;
                    }
                    groups.push(tokens = []);
                }
                matched = false;
                if (match = rcombinators.exec(soFar)) {
                    matched = match.shift();
                    tokens.push({
                        value: matched,
                        type: match[0].replace(rtrim, " ")
                    });
                    soFar = soFar.slice(matched.length);
                }
                for (type in Expr.filter) {
                    if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            type: type,
                            matches: match
                        });
                        soFar = soFar.slice(matched.length);
                    }
                }
                if (!matched) {
                    break;
                }
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        };
        function toSelector(tokens) {
            var i = 0, len = tokens.length, selector = "";
            for (;i < len; i++) {
                selector += tokens[i].value;
            }
            return selector;
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir, checkNonElements = base && dir === "parentNode", doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                while (elem = elem[dir]) {
                    if (elem.nodeType === 1 || checkNonElements) {
                        return matcher(elem, context, xml);
                    }
                }
            } : function(elem, context, xml) {
                var oldCache, outerCache, newCache = [ dirruns, doneName ];
                if (xml) {
                    while (elem = elem[dir]) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            if (matcher(elem, context, xml)) {
                                return true;
                            }
                        }
                    }
                } else {
                    while (elem = elem[dir]) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            outerCache = elem[expando] || (elem[expando] = {});
                            if ((oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                                return newCache[2] = oldCache[2];
                            } else {
                                outerCache[dir] = newCache;
                                if (newCache[2] = matcher(elem, context, xml)) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            };
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                var i = matchers.length;
                while (i--) {
                    if (!matchers[i](elem, context, xml)) {
                        return false;
                    }
                }
                return true;
            } : matchers[0];
        }
        function multipleContexts(selector, contexts, results) {
            var i = 0, len = contexts.length;
            for (;i < len; i++) {
                Sizzle(selector, contexts[i], results);
            }
            return results;
        }
        function condense(unmatched, map, filter, context, xml) {
            var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
            for (;i < len; i++) {
                if (elem = unmatched[i]) {
                    if (!filter || filter(elem, context, xml)) {
                        newUnmatched.push(elem);
                        if (mapped) {
                            map.push(i);
                        }
                    }
                }
            }
            return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) {
                postFilter = setMatcher(postFilter);
            }
            if (postFinder && !postFinder[expando]) {
                postFinder = setMatcher(postFinder, postSelector);
            }
            return markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [ context ] : context, []), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher) {
                    matcher(matcherIn, matcherOut, context, xml);
                }
                if (postFilter) {
                    temp = condense(matcherOut, postMap);
                    postFilter(temp, [], context, xml);
                    i = temp.length;
                    while (i--) {
                        if (elem = temp[i]) {
                            matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                        }
                    }
                }
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            temp = [];
                            i = matcherOut.length;
                            while (i--) {
                                if (elem = matcherOut[i]) {
                                    temp.push(matcherIn[i] = elem);
                                }
                            }
                            postFinder(null, matcherOut = [], temp, xml);
                        }
                        i = matcherOut.length;
                        while (i--) {
                            if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                                seed[temp] = !(results[temp] = elem);
                            }
                        }
                    }
                } else {
                    matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
                    if (postFinder) {
                        postFinder(null, results, matcherOut, xml);
                    } else {
                        push.apply(results, matcherOut);
                    }
                }
            });
        }
        function matcherFromTokens(tokens) {
            var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext;
            }, implicitRelative, true), matchAnyContext = addCombinator(function(elem) {
                return indexOf(checkContext, elem) > -1;
            }, implicitRelative, true), matchers = [ function(elem, context, xml) {
                var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                checkContext = null;
                return ret;
            } ];
            for (;i < len; i++) {
                if (matcher = Expr.relative[tokens[i].type]) {
                    matchers = [ addCombinator(elementMatcher(matchers), matcher) ];
                } else {
                    matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                    if (matcher[expando]) {
                        j = ++i;
                        for (;j < len; j++) {
                            if (Expr.relative[tokens[j].type]) {
                                break;
                            }
                        }
                        return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                            value: tokens[i - 2].type === " " ? "*" : ""
                        })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
                    }
                    matchers.push(matcher);
                }
            }
            return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
                var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find["TAG"]("*", outermost), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || .1, len = elems.length;
                if (outermost) {
                    outermostContext = context !== document && context;
                }
                for (;i !== len && (elem = elems[i]) != null; i++) {
                    if (byElement && elem) {
                        j = 0;
                        while (matcher = elementMatchers[j++]) {
                            if (matcher(elem, context, xml)) {
                                results.push(elem);
                                break;
                            }
                        }
                        if (outermost) {
                            dirruns = dirrunsUnique;
                        }
                    }
                    if (bySet) {
                        if (elem = !matcher && elem) {
                            matchedCount--;
                        }
                        if (seed) {
                            unmatched.push(elem);
                        }
                    }
                }
                matchedCount += i;
                if (bySet && i !== matchedCount) {
                    j = 0;
                    while (matcher = setMatchers[j++]) {
                        matcher(unmatched, setMatched, context, xml);
                    }
                    if (seed) {
                        if (matchedCount > 0) {
                            while (i--) {
                                if (!(unmatched[i] || setMatched[i])) {
                                    setMatched[i] = pop.call(results);
                                }
                            }
                        }
                        setMatched = condense(setMatched);
                    }
                    push.apply(results, setMatched);
                    if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
                        Sizzle.uniqueSort(results);
                    }
                }
                if (outermost) {
                    dirruns = dirrunsUnique;
                    outermostContext = contextBackup;
                }
                return unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        compile = Sizzle.compile = function(selector, match) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
                if (!match) {
                    match = tokenize(selector);
                }
                i = match.length;
                while (i--) {
                    cached = matcherFromTokens(match[i]);
                    if (cached[expando]) {
                        setMatchers.push(cached);
                    } else {
                        elementMatchers.push(cached);
                    }
                }
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
                cached.selector = selector;
            }
            return cached;
        };
        select = Sizzle.select = function(selector, context, results, seed) {
            var i, tokens, token, type, find, compiled = typeof selector === "function" && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            results = results || [];
            if (match.length === 1) {
                tokens = match[0] = match[0].slice(0);
                if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                    context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                    if (!context) {
                        return results;
                    } else if (compiled) {
                        context = context.parentNode;
                    }
                    selector = selector.slice(tokens.shift().value.length);
                }
                i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                while (i--) {
                    token = tokens[i];
                    if (Expr.relative[type = token.type]) {
                        break;
                    }
                    if (find = Expr.find[type]) {
                        if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
                            tokens.splice(i, 1);
                            selector = seed.length && toSelector(tokens);
                            if (!selector) {
                                push.apply(results, seed);
                                return results;
                            }
                            break;
                        }
                    }
                }
            }
            (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context);
            return results;
        };
        support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
        support.detectDuplicates = !!hasDuplicate;
        setDocument();
        support.sortDetached = assert(function(div1) {
            return div1.compareDocumentPosition(document.createElement("div")) & 1;
        });
        if (!assert(function(div) {
            div.innerHTML = "<a href='#'></a>";
            return div.firstChild.getAttribute("href") === "#";
        })) {
            addHandle("type|href|height|width", function(elem, name, isXML) {
                if (!isXML) {
                    return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
                }
            });
        }
        if (!support.attributes || !assert(function(div) {
            div.innerHTML = "<input/>";
            div.firstChild.setAttribute("value", "");
            return div.firstChild.getAttribute("value") === "";
        })) {
            addHandle("value", function(elem, name, isXML) {
                if (!isXML && elem.nodeName.toLowerCase() === "input") {
                    return elem.defaultValue;
                }
            });
        }
        if (!assert(function(div) {
            return div.getAttribute("disabled") == null;
        })) {
            addHandle(booleans, function(elem, name, isXML) {
                var val;
                if (!isXML) {
                    return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
                }
            });
        }
        return Sizzle;
    }(window);
    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
    var rneedsContext = jQuery.expr.match.needsContext;
    var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
    var risSimple = /^.[^:#\[\.,]*$/;
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function(elem, i) {
                return !!qualifier.call(elem, i, elem) !== not;
            });
        }
        if (qualifier.nodeType) {
            return jQuery.grep(elements, function(elem) {
                return elem === qualifier !== not;
            });
        }
        if (typeof qualifier === "string") {
            if (risSimple.test(qualifier)) {
                return jQuery.filter(qualifier, elements, not);
            }
            qualifier = jQuery.filter(qualifier, elements);
        }
        return jQuery.grep(elements, function(elem) {
            return indexOf.call(qualifier, elem) >= 0 !== not;
        });
    }
    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        if (not) {
            expr = ":not(" + expr + ")";
        }
        return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [ elem ] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
            return elem.nodeType === 1;
        }));
    };
    jQuery.fn.extend({
        find: function(selector) {
            var i, len = this.length, ret = [], self = this;
            if (typeof selector !== "string") {
                return this.pushStack(jQuery(selector).filter(function() {
                    for (i = 0; i < len; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true;
                        }
                    }
                }));
            }
            for (i = 0; i < len; i++) {
                jQuery.find(selector, self[i], ret);
            }
            ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
            ret.selector = this.selector ? this.selector + " " + selector : selector;
            return ret;
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], false));
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], true));
        },
        is: function(selector) {
            return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
        }
    });
    var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, init = jQuery.fn.init = function(selector, context) {
        var match, elem;
        if (!selector) {
            return this;
        }
        if (typeof selector === "string") {
            if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
                match = [ null, selector, null ];
            } else {
                match = rquickExpr.exec(selector);
            }
            if (match && (match[1] || !context)) {
                if (match[1]) {
                    context = context instanceof jQuery ? context[0] : context;
                    jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
                    if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                        for (match in context) {
                            if (jQuery.isFunction(this[match])) {
                                this[match](context[match]);
                            } else {
                                this.attr(match, context[match]);
                            }
                        }
                    }
                    return this;
                } else {
                    elem = document.getElementById(match[2]);
                    if (elem && elem.parentNode) {
                        this.length = 1;
                        this[0] = elem;
                    }
                    this.context = document;
                    this.selector = selector;
                    return this;
                }
            } else if (!context || context.jquery) {
                return (context || rootjQuery).find(selector);
            } else {
                return this.constructor(context).find(selector);
            }
        } else if (selector.nodeType) {
            this.context = this[0] = selector;
            this.length = 1;
            return this;
        } else if (jQuery.isFunction(selector)) {
            return typeof rootjQuery.ready !== "undefined" ? rootjQuery.ready(selector) : selector(jQuery);
        }
        if (selector.selector !== undefined) {
            this.selector = selector.selector;
            this.context = selector.context;
        }
        return jQuery.makeArray(selector, this);
    };
    init.prototype = jQuery.fn;
    rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
    };
    jQuery.extend({
        dir: function(elem, dir, until) {
            var matched = [], truncate = until !== undefined;
            while ((elem = elem[dir]) && elem.nodeType !== 9) {
                if (elem.nodeType === 1) {
                    if (truncate && jQuery(elem).is(until)) {
                        break;
                    }
                    matched.push(elem);
                }
            }
            return matched;
        },
        sibling: function(n, elem) {
            var matched = [];
            for (;n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    matched.push(n);
                }
            }
            return matched;
        }
    });
    jQuery.fn.extend({
        has: function(target) {
            var targets = jQuery(target, this), l = targets.length;
            return this.filter(function() {
                var i = 0;
                for (;i < l; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },
        closest: function(selectors, context) {
            var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
            for (;i < l; i++) {
                for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                    if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
                        matched.push(cur);
                        break;
                    }
                }
            }
            return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
        },
        index: function(elem) {
            if (!elem) {
                return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            }
            if (typeof elem === "string") {
                return indexOf.call(jQuery(elem), this[0]);
            }
            return indexOf.call(this, elem.jquery ? elem[0] : elem);
        },
        add: function(selector, context) {
            return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))));
        },
        addBack: function(selector) {
            return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
        }
    });
    function sibling(cur, dir) {
        while ((cur = cur[dir]) && cur.nodeType !== 1) {}
        return cur;
    }
    jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function(elem) {
            return elem.contentDocument || jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var matched = jQuery.map(this, fn, until);
            if (name.slice(-5) !== "Until") {
                selector = until;
            }
            if (selector && typeof selector === "string") {
                matched = jQuery.filter(selector, matched);
            }
            if (this.length > 1) {
                if (!guaranteedUnique[name]) {
                    jQuery.unique(matched);
                }
                if (rparentsprev.test(name)) {
                    matched.reverse();
                }
            }
            return this.pushStack(matched);
        };
    });
    var rnotwhite = /\S+/g;
    var optionsCache = {};
    function createOptions(options) {
        var object = optionsCache[options] = {};
        jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
            object[flag] = true;
        });
        return object;
    }
    jQuery.Callbacks = function(options) {
        options = typeof options === "string" ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
        var memory, fired, firing, firingStart, firingLength, firingIndex, list = [], stack = !options.once && [], fire = function(data) {
            memory = options.memory && data;
            fired = true;
            firingIndex = firingStart || 0;
            firingStart = 0;
            firingLength = list.length;
            firing = true;
            for (;list && firingIndex < firingLength; firingIndex++) {
                if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                    memory = false;
                    break;
                }
            }
            firing = false;
            if (list) {
                if (stack) {
                    if (stack.length) {
                        fire(stack.shift());
                    }
                } else if (memory) {
                    list = [];
                } else {
                    self.disable();
                }
            }
        }, self = {
            add: function() {
                if (list) {
                    var start = list.length;
                    (function add(args) {
                        jQuery.each(args, function(_, arg) {
                            var type = jQuery.type(arg);
                            if (type === "function") {
                                if (!options.unique || !self.has(arg)) {
                                    list.push(arg);
                                }
                            } else if (arg && arg.length && type !== "string") {
                                add(arg);
                            }
                        });
                    })(arguments);
                    if (firing) {
                        firingLength = list.length;
                    } else if (memory) {
                        firingStart = start;
                        fire(memory);
                    }
                }
                return this;
            },
            remove: function() {
                if (list) {
                    jQuery.each(arguments, function(_, arg) {
                        var index;
                        while ((index = jQuery.inArray(arg, list, index)) > -1) {
                            list.splice(index, 1);
                            if (firing) {
                                if (index <= firingLength) {
                                    firingLength--;
                                }
                                if (index <= firingIndex) {
                                    firingIndex--;
                                }
                            }
                        }
                    });
                }
                return this;
            },
            has: function(fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
            },
            empty: function() {
                list = [];
                firingLength = 0;
                return this;
            },
            disable: function() {
                list = stack = memory = undefined;
                return this;
            },
            disabled: function() {
                return !list;
            },
            lock: function() {
                stack = undefined;
                if (!memory) {
                    self.disable();
                }
                return this;
            },
            locked: function() {
                return !stack;
            },
            fireWith: function(context, args) {
                if (list && (!fired || stack)) {
                    args = args || [];
                    args = [ context, args.slice ? args.slice() : args ];
                    if (firing) {
                        stack.push(args);
                    } else {
                        fire(args);
                    }
                }
                return this;
            },
            fire: function() {
                self.fireWith(this, arguments);
                return this;
            },
            fired: function() {
                return !!fired;
            }
        };
        return self;
    };
    jQuery.extend({
        Deferred: function(func) {
            var tuples = [ [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ], [ "notify", "progress", jQuery.Callbacks("memory") ] ], state = "pending", promise = {
                state: function() {
                    return state;
                },
                always: function() {
                    deferred.done(arguments).fail(arguments);
                    return this;
                },
                then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var fn = jQuery.isFunction(fns[i]) && fns[i];
                            deferred[tuple[1]](function() {
                                var returned = fn && fn.apply(this, arguments);
                                if (returned && jQuery.isFunction(returned.promise)) {
                                    returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
                                } else {
                                    newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments);
                                }
                            });
                        });
                        fns = null;
                    }).promise();
                },
                promise: function(obj) {
                    return obj != null ? jQuery.extend(obj, promise) : promise;
                }
            }, deferred = {};
            promise.pipe = promise.then;
            jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2], stateString = tuple[3];
                promise[tuple[1]] = list.add;
                if (stateString) {
                    list.add(function() {
                        state = stateString;
                    }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
                }
                deferred[tuple[0]] = function() {
                    deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
                    return this;
                };
                deferred[tuple[0] + "With"] = list.fireWith;
            });
            promise.promise(deferred);
            if (func) {
                func.call(deferred, deferred);
            }
            return deferred;
        },
        when: function(subordinate) {
            var i = 0, resolveValues = slice.call(arguments), length = resolveValues.length, remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = remaining === 1 ? subordinate : jQuery.Deferred(), updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this;
                    values[i] = arguments.length > 1 ? slice.call(arguments) : value;
                    if (values === progressValues) {
                        deferred.notifyWith(contexts, values);
                    } else if (!--remaining) {
                        deferred.resolveWith(contexts, values);
                    }
                };
            }, progressValues, progressContexts, resolveContexts;
            if (length > 1) {
                progressValues = new Array(length);
                progressContexts = new Array(length);
                resolveContexts = new Array(length);
                for (;i < length; i++) {
                    if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                        resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
                    } else {
                        --remaining;
                    }
                }
            }
            if (!remaining) {
                deferred.resolveWith(resolveContexts, resolveValues);
            }
            return deferred.promise();
        }
    });
    var readyList;
    jQuery.fn.ready = function(fn) {
        jQuery.ready.promise().done(fn);
        return this;
    };
    jQuery.extend({
        isReady: false,
        readyWait: 1,
        holdReady: function(hold) {
            if (hold) {
                jQuery.readyWait++;
            } else {
                jQuery.ready(true);
            }
        },
        ready: function(wait) {
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return;
            }
            jQuery.isReady = true;
            if (wait !== true && --jQuery.readyWait > 0) {
                return;
            }
            readyList.resolveWith(document, [ jQuery ]);
            if (jQuery.fn.triggerHandler) {
                jQuery(document).triggerHandler("ready");
                jQuery(document).off("ready");
            }
        }
    });
    function completed() {
        document.removeEventListener("DOMContentLoaded", completed, false);
        window.removeEventListener("load", completed, false);
        jQuery.ready();
    }
    jQuery.ready.promise = function(obj) {
        if (!readyList) {
            readyList = jQuery.Deferred();
            if (document.readyState === "complete") {
                setTimeout(jQuery.ready);
            } else {
                document.addEventListener("DOMContentLoaded", completed, false);
                window.addEventListener("load", completed, false);
            }
        }
        return readyList.promise(obj);
    };
    jQuery.ready.promise();
    var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0, len = elems.length, bulk = key == null;
        if (jQuery.type(key) === "object") {
            chainable = true;
            for (i in key) {
                jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
            }
        } else if (value !== undefined) {
            chainable = true;
            if (!jQuery.isFunction(value)) {
                raw = true;
            }
            if (bulk) {
                if (raw) {
                    fn.call(elems, value);
                    fn = null;
                } else {
                    bulk = fn;
                    fn = function(elem, key, value) {
                        return bulk.call(jQuery(elem), value);
                    };
                }
            }
            if (fn) {
                for (;i < len; i++) {
                    fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
                }
            }
        }
        return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
    };
    jQuery.acceptData = function(owner) {
        return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
    };
    function Data() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {};
            }
        });
        this.expando = jQuery.expando + Data.uid++;
    }
    Data.uid = 1;
    Data.accepts = jQuery.acceptData;
    Data.prototype = {
        key: function(owner) {
            if (!Data.accepts(owner)) {
                return 0;
            }
            var descriptor = {}, unlock = owner[this.expando];
            if (!unlock) {
                unlock = Data.uid++;
                try {
                    descriptor[this.expando] = {
                        value: unlock
                    };
                    Object.defineProperties(owner, descriptor);
                } catch (e) {
                    descriptor[this.expando] = unlock;
                    jQuery.extend(owner, descriptor);
                }
            }
            if (!this.cache[unlock]) {
                this.cache[unlock] = {};
            }
            return unlock;
        },
        set: function(owner, data, value) {
            var prop, unlock = this.key(owner), cache = this.cache[unlock];
            if (typeof data === "string") {
                cache[data] = value;
            } else {
                if (jQuery.isEmptyObject(cache)) {
                    jQuery.extend(this.cache[unlock], data);
                } else {
                    for (prop in data) {
                        cache[prop] = data[prop];
                    }
                }
            }
            return cache;
        },
        get: function(owner, key) {
            var cache = this.cache[this.key(owner)];
            return key === undefined ? cache : cache[key];
        },
        access: function(owner, key, value) {
            var stored;
            if (key === undefined || key && typeof key === "string" && value === undefined) {
                stored = this.get(owner, key);
                return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key));
            }
            this.set(owner, key, value);
            return value !== undefined ? value : key;
        },
        remove: function(owner, key) {
            var i, name, camel, unlock = this.key(owner), cache = this.cache[unlock];
            if (key === undefined) {
                this.cache[unlock] = {};
            } else {
                if (jQuery.isArray(key)) {
                    name = key.concat(key.map(jQuery.camelCase));
                } else {
                    camel = jQuery.camelCase(key);
                    if (key in cache) {
                        name = [ key, camel ];
                    } else {
                        name = camel;
                        name = name in cache ? [ name ] : name.match(rnotwhite) || [];
                    }
                }
                i = name.length;
                while (i--) {
                    delete cache[name[i]];
                }
            }
        },
        hasData: function(owner) {
            return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {});
        },
        discard: function(owner) {
            if (owner[this.expando]) {
                delete this.cache[owner[this.expando]];
            }
        }
    };
    var data_priv = new Data();
    var data_user = new Data();
    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /([A-Z])/g;
    function dataAttr(elem, key, data) {
        var name;
        if (data === undefined && elem.nodeType === 1) {
            name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            data = elem.getAttribute(name);
            if (typeof data === "string") {
                try {
                    data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                } catch (e) {}
                data_user.set(elem, key, data);
            } else {
                data = undefined;
            }
        }
        return data;
    }
    jQuery.extend({
        hasData: function(elem) {
            return data_user.hasData(elem) || data_priv.hasData(elem);
        },
        data: function(elem, name, data) {
            return data_user.access(elem, name, data);
        },
        removeData: function(elem, name) {
            data_user.remove(elem, name);
        },
        _data: function(elem, name, data) {
            return data_priv.access(elem, name, data);
        },
        _removeData: function(elem, name) {
            data_priv.remove(elem, name);
        }
    });
    jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            if (key === undefined) {
                if (this.length) {
                    data = data_user.get(elem);
                    if (elem.nodeType === 1 && !data_priv.get(elem, "hasDataAttrs")) {
                        i = attrs.length;
                        while (i--) {
                            if (attrs[i]) {
                                name = attrs[i].name;
                                if (name.indexOf("data-") === 0) {
                                    name = jQuery.camelCase(name.slice(5));
                                    dataAttr(elem, name, data[name]);
                                }
                            }
                        }
                        data_priv.set(elem, "hasDataAttrs", true);
                    }
                }
                return data;
            }
            if (typeof key === "object") {
                return this.each(function() {
                    data_user.set(this, key);
                });
            }
            return access(this, function(value) {
                var data, camelKey = jQuery.camelCase(key);
                if (elem && value === undefined) {
                    data = data_user.get(elem, key);
                    if (data !== undefined) {
                        return data;
                    }
                    data = data_user.get(elem, camelKey);
                    if (data !== undefined) {
                        return data;
                    }
                    data = dataAttr(elem, camelKey, undefined);
                    if (data !== undefined) {
                        return data;
                    }
                    return;
                }
                this.each(function() {
                    var data = data_user.get(this, camelKey);
                    data_user.set(this, camelKey, value);
                    if (key.indexOf("-") !== -1 && data !== undefined) {
                        data_user.set(this, key, value);
                    }
                });
            }, null, value, arguments.length > 1, null, true);
        },
        removeData: function(key) {
            return this.each(function() {
                data_user.remove(this, key);
            });
        }
    });
    jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            if (elem) {
                type = (type || "fx") + "queue";
                queue = data_priv.get(elem, type);
                if (data) {
                    if (!queue || jQuery.isArray(data)) {
                        queue = data_priv.access(elem, type, jQuery.makeArray(data));
                    } else {
                        queue.push(data);
                    }
                }
                return queue || [];
            }
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
                jQuery.dequeue(elem, type);
            };
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--;
            }
            if (fn) {
                if (type === "fx") {
                    queue.unshift("inprogress");
                }
                delete hooks.stop;
                fn.call(elem, next, hooks);
            }
            if (!startLength && hooks) {
                hooks.empty.fire();
            }
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return data_priv.get(elem, key) || data_priv.access(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    data_priv.remove(elem, [ type + "queue", key ]);
                })
            });
        }
    });
    jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--;
            }
            if (arguments.length < setter) {
                return jQuery.queue(this[0], type);
            }
            return data === undefined ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type);
                if (type === "fx" && queue[0] !== "inprogress") {
                    jQuery.dequeue(this, type);
                }
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                if (!--count) {
                    defer.resolveWith(elements, [ elements ]);
                }
            };
            if (typeof type !== "string") {
                obj = type;
                type = undefined;
            }
            type = type || "fx";
            while (i--) {
                tmp = data_priv.get(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve);
                }
            }
            resolve();
            return defer.promise(obj);
        }
    });
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
    var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
    var isHidden = function(elem, el) {
        elem = el || elem;
        return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
    };
    var rcheckableType = /^(?:checkbox|radio)$/i;
    (function() {
        var fragment = document.createDocumentFragment(), div = fragment.appendChild(document.createElement("div")), input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("checked", "checked");
        input.setAttribute("name", "t");
        div.appendChild(input);
        support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
    })();
    var strundefined = typeof undefined;
    support.focusinBubbles = "onfocusin" in window;
    var rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    function returnTrue() {
        return true;
    }
    function returnFalse() {
        return false;
    }
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.get(elem);
            if (!elemData) {
                return;
            }
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }
            if (!(events = elemData.events)) {
                events = elemData.events = {};
            }
            if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function(e) {
                    return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
                };
            }
            types = (types || "").match(rnotwhite) || [ "" ];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                if (!type) {
                    continue;
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                special = jQuery.event.special[type] || {};
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);
                if (!(handlers = events[type])) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false);
                        }
                    }
                }
                if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj);
                } else {
                    handlers.push(handleObj);
                }
                jQuery.event.global[type] = true;
            }
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.hasData(elem) && data_priv.get(elem);
            if (!elemData || !(events = elemData.events)) {
                return;
            }
            types = (types || "").match(rnotwhite) || [ "" ];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true);
                    }
                    continue;
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                handlers = events[type] || [];
                tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
                origCount = j = handlers.length;
                while (j--) {
                    handleObj = handlers[j];
                    if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                        handlers.splice(j, 1);
                        if (handleObj.selector) {
                            handlers.delegateCount--;
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj);
                        }
                    }
                }
                if (origCount && !handlers.length) {
                    if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle);
                    }
                    delete events[type];
                }
            }
            if (jQuery.isEmptyObject(events)) {
                delete elemData.handle;
                data_priv.remove(elem, "events");
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [ elem || document ], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            cur = tmp = elem = elem || document;
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return;
            }
            if (type.indexOf(".") >= 0) {
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;
            event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            event.result = undefined;
            if (!event.target) {
                event.target = elem;
            }
            data = data == null ? [ event ] : jQuery.makeArray(data, [ event ]);
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                return;
            }
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) {
                    cur = cur.parentNode;
                }
                for (;cur; cur = cur.parentNode) {
                    eventPath.push(cur);
                    tmp = cur;
                }
                if (tmp === (elem.ownerDocument || document)) {
                    eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
            }
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                event.type = i > 1 ? bubbleType : special.bindType || type;
                handle = (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle");
                if (handle) {
                    handle.apply(cur, data);
                }
                handle = ontype && cur[ontype];
                if (handle && handle.apply && jQuery.acceptData(cur)) {
                    event.result = handle.apply(cur, data);
                    if (event.result === false) {
                        event.preventDefault();
                    }
                }
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented()) {
                if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && jQuery.acceptData(elem)) {
                    if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
                        tmp = elem[ontype];
                        if (tmp) {
                            elem[ontype] = null;
                        }
                        jQuery.event.triggered = type;
                        elem[type]();
                        jQuery.event.triggered = undefined;
                        if (tmp) {
                            elem[ontype] = tmp;
                        }
                    }
                }
            }
            return event.result;
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i, j, ret, matched, handleObj, handlerQueue = [], args = slice.call(arguments), handlers = (data_priv.get(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            args[0] = event;
            event.delegateTarget = this;
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return;
            }
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                event.currentTarget = matched.elem;
                j = 0;
                while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
                    if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
                        event.handleObj = handleObj;
                        event.data = handleObj.data;
                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                        if (ret !== undefined) {
                            if ((event.result = ret) === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }
            if (special.postDispatch) {
                special.postDispatch.call(this, event);
            }
            return event.result;
        },
        handlers: function(event, handlers) {
            var i, matches, sel, handleObj, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {
                for (;cur !== this; cur = cur.parentNode || this) {
                    if (cur.disabled !== true || event.type !== "click") {
                        matches = [];
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];
                            sel = handleObj.selector + " ";
                            if (matches[sel] === undefined) {
                                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [ cur ]).length;
                            }
                            if (matches[sel]) {
                                matches.push(handleObj);
                            }
                        }
                        if (matches.length) {
                            handlerQueue.push({
                                elem: cur,
                                handlers: matches
                            });
                        }
                    }
                }
            }
            if (delegateCount < handlers.length) {
                handlerQueue.push({
                    elem: this,
                    handlers: handlers.slice(delegateCount)
                });
            }
            return handlerQueue;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                if (event.which == null) {
                    event.which = original.charCode != null ? original.charCode : original.keyCode;
                }
                return event;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var eventDoc, doc, body, button = original.button;
                if (event.pageX == null && original.clientX != null) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;
                    event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                    event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
                }
                if (!event.which && button !== undefined) {
                    event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
                }
                return event;
            }
        },
        fix: function(event) {
            if (event[jQuery.expando]) {
                return event;
            }
            var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
            if (!fixHook) {
                this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
            }
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
            event = new jQuery.Event(originalEvent);
            i = copy.length;
            while (i--) {
                prop = copy[i];
                event[prop] = originalEvent[prop];
            }
            if (!event.target) {
                event.target = document;
            }
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode;
            }
            return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },
        special: {
            load: {
                noBubble: true
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) {
                        this.focus();
                        return false;
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === safeActiveElement() && this.blur) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
                        this.click();
                        return false;
                    }
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    if (event.result !== undefined && event.originalEvent) {
                        event.originalEvent.returnValue = event.result;
                    }
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: true,
                originalEvent: {}
            });
            if (bubble) {
                jQuery.event.trigger(e, null, elem);
            } else {
                jQuery.event.dispatch.call(elem, e);
            }
            if (e.isDefaultPrevented()) {
                event.preventDefault();
            }
        }
    };
    jQuery.removeEvent = function(elem, type, handle) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle, false);
        }
    };
    jQuery.Event = function(src, props) {
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
        }
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;
        } else {
            this.type = src;
        }
        if (props) {
            jQuery.extend(this, props);
        }
        this.timeStamp = src && src.timeStamp || jQuery.now();
        this[jQuery.expando] = true;
    };
    jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue;
            if (e && e.preventDefault) {
                e.preventDefault();
            }
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue;
            if (e && e.stopPropagation) {
                e.stopPropagation();
            }
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue;
            if (e && e.stopImmediatePropagation) {
                e.stopImmediatePropagation();
            }
            this.stopPropagation();
        }
    };
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                if (!related || related !== target && !jQuery.contains(target, related)) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix;
                }
                return ret;
            }
        };
    });
    if (!support.focusinBubbles) {
        jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function(orig, fix) {
            var handler = function(event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
            };
            jQuery.event.special[fix] = {
                setup: function() {
                    var doc = this.ownerDocument || this, attaches = data_priv.access(doc, fix);
                    if (!attaches) {
                        doc.addEventListener(orig, handler, true);
                    }
                    data_priv.access(doc, fix, (attaches || 0) + 1);
                },
                teardown: function() {
                    var doc = this.ownerDocument || this, attaches = data_priv.access(doc, fix) - 1;
                    if (!attaches) {
                        doc.removeEventListener(orig, handler, true);
                        data_priv.remove(doc, fix);
                    } else {
                        data_priv.access(doc, fix, attaches);
                    }
                }
            };
        });
    }
    jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var origFn, type;
            if (typeof types === "object") {
                if (typeof selector !== "string") {
                    data = data || selector;
                    selector = undefined;
                }
                for (type in types) {
                    this.on(type, selector, data, types[type], one);
                }
                return this;
            }
            if (data == null && fn == null) {
                fn = selector;
                data = selector = undefined;
            } else if (fn == null) {
                if (typeof selector === "string") {
                    fn = data;
                    data = undefined;
                } else {
                    fn = data;
                    data = selector;
                    selector = undefined;
                }
            }
            if (fn === false) {
                fn = returnFalse;
            } else if (!fn) {
                return this;
            }
            if (one === 1) {
                origFn = fn;
                fn = function(event) {
                    jQuery().off(event);
                    return origFn.apply(this, arguments);
                };
                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
            }
            return this.each(function() {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
                return this;
            }
            if (typeof types === "object") {
                for (type in types) {
                    this.off(type, selector, types[type]);
                }
                return this;
            }
            if (selector === false || typeof selector === "function") {
                fn = selector;
                selector = undefined;
            }
            if (fn === false) {
                fn = returnFalse;
            }
            return this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            if (elem) {
                return jQuery.event.trigger(type, data, elem, true);
            }
        }
    });
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /^$|\/(?:java|ecma)script/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, wrapMap = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
    }
    function disableScript(elem) {
        elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
        return elem;
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        if (match) {
            elem.type = match[1];
        } else {
            elem.removeAttribute("type");
        }
        return elem;
    }
    function setGlobalEval(elems, refElements) {
        var i = 0, l = elems.length;
        for (;i < l; i++) {
            data_priv.set(elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval"));
        }
    }
    function cloneCopyEvent(src, dest) {
        var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
        if (dest.nodeType !== 1) {
            return;
        }
        if (data_priv.hasData(src)) {
            pdataOld = data_priv.access(src);
            pdataCur = data_priv.set(dest, pdataOld);
            events = pdataOld.events;
            if (events) {
                delete pdataCur.handle;
                pdataCur.events = {};
                for (type in events) {
                    for (i = 0, l = events[type].length; i < l; i++) {
                        jQuery.event.add(dest, type, events[type][i]);
                    }
                }
            }
        }
        if (data_user.hasData(src)) {
            udataOld = data_user.access(src);
            udataCur = jQuery.extend({}, udataOld);
            data_user.set(dest, udataCur);
        }
    }
    function getAll(context, tag) {
        var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
        return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([ context ], ret) : ret;
    }
    function fixInput(src, dest) {
        var nodeName = dest.nodeName.toLowerCase();
        if (nodeName === "input" && rcheckableType.test(src.type)) {
            dest.checked = src.checked;
        } else if (nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue;
        }
    }
    jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = jQuery.contains(elem.ownerDocument, elem);
            if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                destElements = getAll(clone);
                srcElements = getAll(elem);
                for (i = 0, l = srcElements.length; i < l; i++) {
                    fixInput(srcElements[i], destElements[i]);
                }
            }
            if (dataAndEvents) {
                if (deepDataAndEvents) {
                    srcElements = srcElements || getAll(elem);
                    destElements = destElements || getAll(clone);
                    for (i = 0, l = srcElements.length; i < l; i++) {
                        cloneCopyEvent(srcElements[i], destElements[i]);
                    }
                } else {
                    cloneCopyEvent(elem, clone);
                }
            }
            destElements = getAll(clone, "script");
            if (destElements.length > 0) {
                setGlobalEval(destElements, !inPage && getAll(elem, "script"));
            }
            return clone;
        },
        buildFragment: function(elems, context, scripts, selection) {
            var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length;
            for (;i < l; i++) {
                elem = elems[i];
                if (elem || elem === 0) {
                    if (jQuery.type(elem) === "object") {
                        jQuery.merge(nodes, elem.nodeType ? [ elem ] : elem);
                    } else if (!rhtml.test(elem)) {
                        nodes.push(context.createTextNode(elem));
                    } else {
                        tmp = tmp || fragment.appendChild(context.createElement("div"));
                        tag = (rtagName.exec(elem) || [ "", "" ])[1].toLowerCase();
                        wrap = wrapMap[tag] || wrapMap._default;
                        tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
                        j = wrap[0];
                        while (j--) {
                            tmp = tmp.lastChild;
                        }
                        jQuery.merge(nodes, tmp.childNodes);
                        tmp = fragment.firstChild;
                        tmp.textContent = "";
                    }
                }
            }
            fragment.textContent = "";
            i = 0;
            while (elem = nodes[i++]) {
                if (selection && jQuery.inArray(elem, selection) !== -1) {
                    continue;
                }
                contains = jQuery.contains(elem.ownerDocument, elem);
                tmp = getAll(fragment.appendChild(elem), "script");
                if (contains) {
                    setGlobalEval(tmp);
                }
                if (scripts) {
                    j = 0;
                    while (elem = tmp[j++]) {
                        if (rscriptType.test(elem.type || "")) {
                            scripts.push(elem);
                        }
                    }
                }
            }
            return fragment;
        },
        cleanData: function(elems) {
            var data, elem, type, key, special = jQuery.event.special, i = 0;
            for (;(elem = elems[i]) !== undefined; i++) {
                if (jQuery.acceptData(elem)) {
                    key = elem[data_priv.expando];
                    if (key && (data = data_priv.cache[key])) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[type]) {
                                    jQuery.event.remove(elem, type);
                                } else {
                                    jQuery.removeEvent(elem, type, data.handle);
                                }
                            }
                        }
                        if (data_priv.cache[key]) {
                            delete data_priv.cache[key];
                        }
                    }
                }
                delete data_user.cache[elem[data_user.expando]];
            }
        }
    });
    jQuery.fn.extend({
        text: function(value) {
            return access(this, function(value) {
                return value === undefined ? jQuery.text(this) : this.empty().each(function() {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        this.textContent = value;
                    }
                });
            }, null, value, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this);
                }
            });
        },
        after: function() {
            return this.domManip(arguments, function(elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                }
            });
        },
        remove: function(selector, keepData) {
            var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0;
            for (;(elem = elems[i]) != null; i++) {
                if (!keepData && elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem));
                }
                if (elem.parentNode) {
                    if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
                        setGlobalEval(getAll(elem, "script"));
                    }
                    elem.parentNode.removeChild(elem);
                }
            }
            return this;
        },
        empty: function() {
            var elem, i = 0;
            for (;(elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem, false));
                    elem.textContent = "";
                }
            }
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {}, i = 0, l = this.length;
                if (value === undefined && elem.nodeType === 1) {
                    return elem.innerHTML;
                }
                if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || [ "", "" ])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (;i < l; i++) {
                            elem = this[i] || {};
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(getAll(elem, false));
                                elem.innerHTML = value;
                            }
                        }
                        elem = 0;
                    } catch (e) {}
                }
                if (elem) {
                    this.empty().append(value);
                }
            }, null, value, arguments.length);
        },
        replaceWith: function() {
            var arg = arguments[0];
            this.domManip(arguments, function(elem) {
                arg = this.parentNode;
                jQuery.cleanData(getAll(this));
                if (arg) {
                    arg.replaceChild(elem, this);
                }
            });
            return arg && (arg.length || arg.nodeType) ? this : this.remove();
        },
        detach: function(selector) {
            return this.remove(selector, true);
        },
        domManip: function(args, callback) {
            args = concat.apply([], args);
            var fragment, first, scripts, hasScripts, node, doc, i = 0, l = this.length, set = this, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
            if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
                return this.each(function(index) {
                    var self = set.eq(index);
                    if (isFunction) {
                        args[0] = value.call(this, index, self.html());
                    }
                    self.domManip(args, callback);
                });
            }
            if (l) {
                fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
                first = fragment.firstChild;
                if (fragment.childNodes.length === 1) {
                    fragment = first;
                }
                if (first) {
                    scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                    hasScripts = scripts.length;
                    for (;i < l; i++) {
                        node = fragment;
                        if (i !== iNoClone) {
                            node = jQuery.clone(node, true, true);
                            if (hasScripts) {
                                jQuery.merge(scripts, getAll(node, "script"));
                            }
                        }
                        callback.call(this[i], node, i);
                    }
                    if (hasScripts) {
                        doc = scripts[scripts.length - 1].ownerDocument;
                        jQuery.map(scripts, restoreScript);
                        for (i = 0; i < hasScripts; i++) {
                            node = scripts[i];
                            if (rscriptType.test(node.type || "") && !data_priv.access(node, "globalEval") && jQuery.contains(doc, node)) {
                                if (node.src) {
                                    if (jQuery._evalUrl) {
                                        jQuery._evalUrl(node.src);
                                    }
                                } else {
                                    jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
                                }
                            }
                        }
                    }
                }
            }
            return this;
        }
    });
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0;
            for (;i <= last; i++) {
                elems = i === last ? this : this.clone(true);
                jQuery(insert[i])[original](elems);
                push.apply(ret, elems.get());
            }
            return this.pushStack(ret);
        };
    });
    var iframe, elemdisplay = {};
    function actualDisplay(name, doc) {
        var style, elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? style.display : jQuery.css(elem[0], "display");
        elem.detach();
        return display;
    }
    function defaultDisplay(nodeName) {
        var doc = document, display = elemdisplay[nodeName];
        if (!display) {
            display = actualDisplay(nodeName, doc);
            if (display === "none" || !display) {
                iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
                doc = iframe[0].contentDocument;
                doc.write();
                doc.close();
                display = actualDisplay(nodeName, doc);
                iframe.detach();
            }
            elemdisplay[nodeName] = display;
        }
        return display;
    }
    var rmargin = /^margin/;
    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
    var getStyles = function(elem) {
        if (elem.ownerDocument.defaultView.opener) {
            return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
        }
        return window.getComputedStyle(elem, null);
    };
    function curCSS(elem, name, computed) {
        var width, minWidth, maxWidth, ret, style = elem.style;
        computed = computed || getStyles(elem);
        if (computed) {
            ret = computed.getPropertyValue(name) || computed[name];
        }
        if (computed) {
            if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                ret = jQuery.style(elem, name);
            }
            if (rnumnonpx.test(ret) && rmargin.test(name)) {
                width = style.width;
                minWidth = style.minWidth;
                maxWidth = style.maxWidth;
                style.minWidth = style.maxWidth = style.width = ret;
                ret = computed.width;
                style.width = width;
                style.minWidth = minWidth;
                style.maxWidth = maxWidth;
            }
        }
        return ret !== undefined ? ret + "" : ret;
    }
    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function() {
                if (conditionFn()) {
                    delete this.get;
                    return;
                }
                return (this.get = hookFn).apply(this, arguments);
            }
        };
    }
    (function() {
        var pixelPositionVal, boxSizingReliableVal, docElem = document.documentElement, container = document.createElement("div"), div = document.createElement("div");
        if (!div.style) {
            return;
        }
        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";
        container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" + "position:absolute";
        container.appendChild(div);
        function computePixelPositionAndBoxSizingReliable() {
            div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" + "box-sizing:border-box;display:block;margin-top:1%;top:1%;" + "border:1px;padding:1px;width:4px;position:absolute";
            div.innerHTML = "";
            docElem.appendChild(container);
            var divStyle = window.getComputedStyle(div, null);
            pixelPositionVal = divStyle.top !== "1%";
            boxSizingReliableVal = divStyle.width === "4px";
            docElem.removeChild(container);
        }
        if (window.getComputedStyle) {
            jQuery.extend(support, {
                pixelPosition: function() {
                    computePixelPositionAndBoxSizingReliable();
                    return pixelPositionVal;
                },
                boxSizingReliable: function() {
                    if (boxSizingReliableVal == null) {
                        computePixelPositionAndBoxSizingReliable();
                    }
                    return boxSizingReliableVal;
                },
                reliableMarginRight: function() {
                    var ret, marginDiv = div.appendChild(document.createElement("div"));
                    marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
                    marginDiv.style.marginRight = marginDiv.style.width = "0";
                    div.style.width = "1px";
                    docElem.appendChild(container);
                    ret = !parseFloat(window.getComputedStyle(marginDiv, null).marginRight);
                    docElem.removeChild(container);
                    div.removeChild(marginDiv);
                    return ret;
                }
            });
        }
    })();
    jQuery.swap = function(elem, options, callback, args) {
        var ret, name, old = {};
        for (name in options) {
            old[name] = elem.style[name];
            elem.style[name] = options[name];
        }
        ret = callback.apply(elem, args || []);
        for (name in options) {
            elem.style[name] = old[name];
        }
        return ret;
    };
    var rdisplayswap = /^(none|table(?!-c[ea]).+)/, rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"), rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"), cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
    }, cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];
    function vendorPropName(style, name) {
        if (name in style) {
            return name;
        }
        var capName = name[0].toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length;
        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in style) {
                return name;
            }
        }
        return origName;
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0, val = 0;
        for (;i < 4; i += 2) {
            if (extra === "margin") {
                val += jQuery.css(elem, extra + cssExpand[i], true, styles);
            }
            if (isBorderBox) {
                if (extra === "content") {
                    val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                }
                if (extra !== "margin") {
                    val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            } else {
                val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                if (extra !== "padding") {
                    val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            }
        }
        return val;
    }
    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = true, val = name === "width" ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
        if (val <= 0 || val == null) {
            val = curCSS(elem, name, styles);
            if (val < 0 || val == null) {
                val = elem.style[name];
            }
            if (rnumnonpx.test(val)) {
                return val;
            }
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
            val = parseFloat(val) || 0;
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
    }
    function showHide(elements, show) {
        var display, elem, hidden, values = [], index = 0, length = elements.length;
        for (;index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }
            values[index] = data_priv.get(elem, "olddisplay");
            display = elem.style.display;
            if (show) {
                if (!values[index] && display === "none") {
                    elem.style.display = "";
                }
                if (elem.style.display === "" && isHidden(elem)) {
                    values[index] = data_priv.access(elem, "olddisplay", defaultDisplay(elem.nodeName));
                }
            } else {
                hidden = isHidden(elem);
                if (display !== "none" || !hidden) {
                    data_priv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
                }
            }
        }
        for (index = 0; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }
            if (!show || elem.style.display === "none" || elem.style.display === "") {
                elem.style.display = show ? values[index] || "" : "none";
            }
        }
        return elements;
    }
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: true,
            fillOpacity: true,
            flexGrow: true,
            flexShrink: true,
            fontWeight: true,
            lineHeight: true,
            opacity: true,
            order: true,
            orphans: true,
            widows: true,
            zIndex: true,
            zoom: true
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return;
            }
            var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (value !== undefined) {
                type = typeof value;
                if (type === "string" && (ret = rrelNum.exec(value))) {
                    value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
                    type = "number";
                }
                if (value == null || value !== value) {
                    return;
                }
                if (type === "number" && !jQuery.cssNumber[origName]) {
                    value += "px";
                }
                if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                    style[name] = "inherit";
                }
                if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
                    style[name] = value;
                }
            } else {
                if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret;
                }
                return style[name];
            }
        },
        css: function(elem, name, extra, styles) {
            var val, num, hooks, origName = jQuery.camelCase(name);
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (hooks && "get" in hooks) {
                val = hooks.get(elem, true, extra);
            }
            if (val === undefined) {
                val = curCSS(elem, name, styles);
            }
            if (val === "normal" && name in cssNormalTransform) {
                val = cssNormalTransform[name];
            }
            if (extra === "" || extra) {
                num = parseFloat(val);
                return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
            }
            return val;
        }
    });
    jQuery.each([ "height", "width" ], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                if (computed) {
                    return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? jQuery.swap(elem, cssShow, function() {
                        return getWidthOrHeight(elem, name, extra);
                    }) : getWidthOrHeight(elem, name, extra);
                }
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles) : 0);
            }
        };
    });
    jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
        if (computed) {
            return jQuery.swap(elem, {
                display: "inline-block"
            }, curCSS, [ elem, "marginRight" ]);
        }
    });
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                var i = 0, expanded = {}, parts = typeof value === "string" ? value.split(" ") : [ value ];
                for (;i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                }
                return expanded;
            }
        };
        if (!rmargin.test(prefix)) {
            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
        }
    });
    jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len, map = {}, i = 0;
                if (jQuery.isArray(name)) {
                    styles = getStyles(elem);
                    len = name.length;
                    for (;i < len; i++) {
                        map[name[i]] = jQuery.css(elem, name[i], false, styles);
                    }
                    return map;
                }
                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function() {
            return showHide(this, true);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state) {
            if (typeof state === "boolean") {
                return state ? this.show() : this.hide();
            }
            return this.each(function() {
                if (isHidden(this)) {
                    jQuery(this).show();
                } else {
                    jQuery(this).hide();
                }
            });
        }
    });
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    jQuery.Tween = Tween;
    Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || "swing";
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            if (this.options.duration) {
                this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
            } else {
                this.pos = eased = percent;
            }
            this.now = (this.end - this.start) * eased + this.start;
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }
            if (hooks && hooks.set) {
                hooks.set(this);
            } else {
                Tween.propHooks._default.set(this);
            }
            return this;
        }
    };
    Tween.prototype.init.prototype = Tween.prototype;
    Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
                    return tween.elem[tween.prop];
                }
                result = jQuery.css(tween.elem, tween.prop, "");
                return !result || result === "auto" ? 0 : result;
            },
            set: function(tween) {
                if (jQuery.fx.step[tween.prop]) {
                    jQuery.fx.step[tween.prop](tween);
                } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
                    jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                } else {
                    tween.elem[tween.prop] = tween.now;
                }
            }
        }
    };
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now;
            }
        }
    };
    jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2;
        }
    };
    jQuery.fx = Tween.prototype.init;
    jQuery.fx.step = {};
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"), rrun = /queueHooks$/, animationPrefilters = [ defaultPrefilter ], tweeners = {
        "*": [ function(prop, value) {
            var tween = this.createTween(prop, value), target = tween.cur(), parts = rfxnum.exec(value), unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"), start = (jQuery.cssNumber[prop] || unit !== "px" && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)), scale = 1, maxIterations = 20;
            if (start && start[3] !== unit) {
                unit = unit || start[3];
                parts = parts || [];
                start = +target || 1;
                do {
                    scale = scale || ".5";
                    start = start / scale;
                    jQuery.style(tween.elem, prop, start + unit);
                } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
            }
            if (parts) {
                start = tween.start = +start || +target || 0;
                tween.unit = unit;
                tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2];
            }
            return tween;
        } ]
    };
    function createFxNow() {
        setTimeout(function() {
            fxNow = undefined;
        });
        return fxNow = jQuery.now();
    }
    function genFx(type, includeWidth) {
        var which, i = 0, attrs = {
            height: type
        };
        includeWidth = includeWidth ? 1 : 0;
        for (;i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type;
        }
        if (includeWidth) {
            attrs.opacity = attrs.width = type;
        }
        return attrs;
    }
    function createTween(value, prop, animation) {
        var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length;
        for (;index < length; index++) {
            if (tween = collection[index].call(animation, prop, value)) {
                return tween;
            }
        }
    }
    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = data_priv.get(elem, "fxshow");
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                    if (!hooks.unqueued) {
                        oldfire();
                    }
                };
            }
            hooks.unqueued++;
            anim.always(function() {
                anim.always(function() {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, "fx").length) {
                        hooks.empty.fire();
                    }
                });
            });
        }
        if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
            opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
            display = jQuery.css(elem, "display");
            checkDisplay = display === "none" ? data_priv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;
            if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
                style.display = "inline-block";
            }
        }
        if (opts.overflow) {
            style.overflow = "hidden";
            anim.always(function() {
                style.overflow = opts.overflow[0];
                style.overflowX = opts.overflow[1];
                style.overflowY = opts.overflow[2];
            });
        }
        for (prop in props) {
            value = props[prop];
            if (rfxtypes.exec(value)) {
                delete props[prop];
                toggle = toggle || value === "toggle";
                if (value === (hidden ? "hide" : "show")) {
                    if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                        hidden = true;
                    } else {
                        continue;
                    }
                }
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
            } else {
                display = undefined;
            }
        }
        if (!jQuery.isEmptyObject(orig)) {
            if (dataShow) {
                if ("hidden" in dataShow) {
                    hidden = dataShow.hidden;
                }
            } else {
                dataShow = data_priv.access(elem, "fxshow", {});
            }
            if (toggle) {
                dataShow.hidden = !hidden;
            }
            if (hidden) {
                jQuery(elem).show();
            } else {
                anim.done(function() {
                    jQuery(elem).hide();
                });
            }
            anim.done(function() {
                var prop;
                data_priv.remove(elem, "fxshow");
                for (prop in orig) {
                    jQuery.style(elem, prop, orig[prop]);
                }
            });
            for (prop in orig) {
                tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
                if (!(prop in dataShow)) {
                    dataShow[prop] = tween.start;
                    if (hidden) {
                        tween.end = tween.start;
                        tween.start = prop === "width" || prop === "height" ? 1 : 0;
                    }
                }
            }
        } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
            style.display = display;
        }
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) {
            name = jQuery.camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (jQuery.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0];
            }
            if (index !== name) {
                props[name] = value;
                delete props[index];
            }
            hooks = jQuery.cssHooks[name];
            if (hooks && "expand" in hooks) {
                value = hooks.expand(value);
                delete props[name];
                for (index in value) {
                    if (!(index in props)) {
                        props[index] = value[index];
                        specialEasing[index] = easing;
                    }
                }
            } else {
                specialEasing[name] = easing;
            }
        }
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem;
        }), tick = function() {
            if (stopped) {
                return false;
            }
            var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length;
            for (;index < length; index++) {
                animation.tweens[index].run(percent);
            }
            deferred.notifyWith(elem, [ animation, percent, remaining ]);
            if (percent < 1 && length) {
                return remaining;
            } else {
                deferred.resolveWith(elem, [ animation ]);
                return false;
            }
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(true, {
                specialEasing: {}
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                animation.tweens.push(tween);
                return tween;
            },
            stop: function(gotoEnd) {
                var index = 0, length = gotoEnd ? animation.tweens.length : 0;
                if (stopped) {
                    return this;
                }
                stopped = true;
                for (;index < length; index++) {
                    animation.tweens[index].run(1);
                }
                if (gotoEnd) {
                    deferred.resolveWith(elem, [ animation, gotoEnd ]);
                } else {
                    deferred.rejectWith(elem, [ animation, gotoEnd ]);
                }
                return this;
            }
        }), props = animation.props;
        propFilter(props, animation.opts.specialEasing);
        for (;index < length; index++) {
            result = animationPrefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
                return result;
            }
        }
        jQuery.map(props, createTween, animation);
        if (jQuery.isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation);
        }
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        }));
        return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    }
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            if (jQuery.isFunction(props)) {
                callback = props;
                props = [ "*" ];
            } else {
                props = props.split(" ");
            }
            var prop, index = 0, length = props.length;
            for (;index < length; index++) {
                prop = props[index];
                tweeners[prop] = tweeners[prop] || [];
                tweeners[prop].unshift(callback);
            }
        },
        prefilter: function(callback, prepend) {
            if (prepend) {
                animationPrefilters.unshift(callback);
            } else {
                animationPrefilters.push(callback);
            }
        }
    });
    jQuery.speed = function(speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
        if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx";
        }
        opt.old = opt.complete;
        opt.complete = function() {
            if (jQuery.isFunction(opt.old)) {
                opt.old.call(this);
            }
            if (opt.queue) {
                jQuery.dequeue(this, opt.queue);
            }
        };
        return opt;
    };
    jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                if (empty || data_priv.get(this, "finish")) {
                    anim.stop(true);
                }
            };
            doAnimation.finish = doAnimation;
            return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd);
            };
            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if (clearQueue && type !== false) {
                this.queue(type || "fx", []);
            }
            return this.each(function() {
                var dequeue = true, index = type != null && type + "queueHooks", timers = jQuery.timers, data = data_priv.get(this);
                if (index) {
                    if (data[index] && data[index].stop) {
                        stopQueue(data[index]);
                    }
                } else {
                    for (index in data) {
                        if (data[index] && data[index].stop && rrun.test(index)) {
                            stopQueue(data[index]);
                        }
                    }
                }
                for (index = timers.length; index--; ) {
                    if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                        timers[index].anim.stop(gotoEnd);
                        dequeue = false;
                        timers.splice(index, 1);
                    }
                }
                if (dequeue || !gotoEnd) {
                    jQuery.dequeue(this, type);
                }
            });
        },
        finish: function(type) {
            if (type !== false) {
                type = type || "fx";
            }
            return this.each(function() {
                var index, data = data_priv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                data.finish = true;
                jQuery.queue(this, type, []);
                if (hooks && hooks.stop) {
                    hooks.stop.call(this, true);
                }
                for (index = timers.length; index--; ) {
                    if (timers[index].elem === this && timers[index].queue === type) {
                        timers[index].anim.stop(true);
                        timers.splice(index, 1);
                    }
                }
                for (index = 0; index < length; index++) {
                    if (queue[index] && queue[index].finish) {
                        queue[index].finish.call(this);
                    }
                }
                delete data.finish;
            });
        }
    });
    jQuery.each([ "toggle", "show", "hide" ], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
        };
    });
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    });
    jQuery.timers = [];
    jQuery.fx.tick = function() {
        var timer, i = 0, timers = jQuery.timers;
        fxNow = jQuery.now();
        for (;i < timers.length; i++) {
            timer = timers[i];
            if (!timer() && timers[i] === timer) {
                timers.splice(i--, 1);
            }
        }
        if (!timers.length) {
            jQuery.fx.stop();
        }
        fxNow = undefined;
    };
    jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer);
        if (timer()) {
            jQuery.fx.start();
        } else {
            jQuery.timers.pop();
        }
    };
    jQuery.fx.interval = 13;
    jQuery.fx.start = function() {
        if (!timerId) {
            timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
        }
    };
    jQuery.fx.stop = function() {
        clearInterval(timerId);
        timerId = null;
    };
    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    jQuery.fn.delay = function(time, type) {
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";
        return this.queue(type, function(next, hooks) {
            var timeout = setTimeout(next, time);
            hooks.stop = function() {
                clearTimeout(timeout);
            };
        });
    };
    (function() {
        var input = document.createElement("input"), select = document.createElement("select"), opt = select.appendChild(document.createElement("option"));
        input.type = "checkbox";
        support.checkOn = input.value !== "";
        support.optSelected = opt.selected;
        select.disabled = true;
        support.optDisabled = !opt.disabled;
        input = document.createElement("input");
        input.value = "t";
        input.type = "radio";
        support.radioValue = input.value === "t";
    })();
    var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        }
    });
    jQuery.extend({
        attr: function(elem, name, value) {
            var hooks, ret, nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            if (typeof elem.getAttribute === strundefined) {
                return jQuery.prop(elem, name, value);
            }
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
            }
            if (value !== undefined) {
                if (value === null) {
                    jQuery.removeAttr(elem, name);
                } else if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                } else {
                    elem.setAttribute(name, value + "");
                    return value;
                }
            } else if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            } else {
                ret = jQuery.find.attr(elem, name);
                return ret == null ? undefined : ret;
            }
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0, attrNames = value && value.match(rnotwhite);
            if (attrNames && elem.nodeType === 1) {
                while (name = attrNames[i++]) {
                    propName = jQuery.propFix[name] || name;
                    if (jQuery.expr.match.bool.test(name)) {
                        elem[propName] = false;
                    }
                    elem.removeAttribute(name);
                }
            }
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            }
        }
    });
    boolHook = {
        set: function(elem, value, name) {
            if (value === false) {
                jQuery.removeAttr(elem, name);
            } else {
                elem.setAttribute(name, name);
            }
            return name;
        }
    };
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = function(elem, name, isXML) {
            var ret, handle;
            if (!isXML) {
                handle = attrHandle[name];
                attrHandle[name] = ret;
                ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
                attrHandle[name] = handle;
            }
            return ret;
        };
    });
    var rfocusable = /^(?:input|select|textarea|button)$/i;
    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            return this.each(function() {
                delete this[jQuery.propFix[name] || name];
            });
        }
    });
    jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
            if (notxml) {
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name];
            }
            if (value !== undefined) {
                return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : elem[name] = value;
            } else {
                return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null ? ret : elem[name];
            }
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    return elem.hasAttribute("tabindex") || rfocusable.test(elem.nodeName) || elem.href ? elem.tabIndex : -1;
                }
            }
        }
    });
    if (!support.optSelected) {
        jQuery.propHooks.selected = {
            get: function(elem) {
                var parent = elem.parentNode;
                if (parent && parent.parentNode) {
                    parent.parentNode.selectedIndex;
                }
                return null;
            }
        };
    }
    jQuery.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        jQuery.propFix[this.toLowerCase()] = this;
    });
    var rclass = /[\t\r\n\f]/g;
    jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, proceed = typeof value === "string" && value, i = 0, len = this.length;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, this.className));
                });
            }
            if (proceed) {
                classes = (value || "").match(rnotwhite) || [];
                for (;i < len; i++) {
                    elem = this[i];
                    cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ");
                    if (cur) {
                        j = 0;
                        while (clazz = classes[j++]) {
                            if (cur.indexOf(" " + clazz + " ") < 0) {
                                cur += clazz + " ";
                            }
                        }
                        finalValue = jQuery.trim(cur);
                        if (elem.className !== finalValue) {
                            elem.className = finalValue;
                        }
                    }
                }
            }
            return this;
        },
        removeClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, proceed = arguments.length === 0 || typeof value === "string" && value, i = 0, len = this.length;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, this.className));
                });
            }
            if (proceed) {
                classes = (value || "").match(rnotwhite) || [];
                for (;i < len; i++) {
                    elem = this[i];
                    cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "");
                    if (cur) {
                        j = 0;
                        while (clazz = classes[j++]) {
                            while (cur.indexOf(" " + clazz + " ") >= 0) {
                                cur = cur.replace(" " + clazz + " ", " ");
                            }
                        }
                        finalValue = value ? jQuery.trim(cur) : "";
                        if (elem.className !== finalValue) {
                            elem.className = finalValue;
                        }
                    }
                }
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            if (typeof stateVal === "boolean" && type === "string") {
                return stateVal ? this.addClass(value) : this.removeClass(value);
            }
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
                });
            }
            return this.each(function() {
                if (type === "string") {
                    var className, i = 0, self = jQuery(this), classNames = value.match(rnotwhite) || [];
                    while (className = classNames[i++]) {
                        if (self.hasClass(className)) {
                            self.removeClass(className);
                        } else {
                            self.addClass(className);
                        }
                    }
                } else if (type === strundefined || type === "boolean") {
                    if (this.className) {
                        data_priv.set(this, "__className__", this.className);
                    }
                    this.className = this.className || value === false ? "" : data_priv.get(this, "__className__") || "";
                }
            });
        },
        hasClass: function(selector) {
            var className = " " + selector + " ", i = 0, l = this.length;
            for (;i < l; i++) {
                if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
                    return true;
                }
            }
            return false;
        }
    });
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                    if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                        return ret;
                    }
                    ret = elem.value;
                    return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
                }
                return;
            }
            isFunction = jQuery.isFunction(value);
            return this.each(function(i) {
                var val;
                if (this.nodeType !== 1) {
                    return;
                }
                if (isFunction) {
                    val = value.call(this, i, jQuery(this).val());
                } else {
                    val = value;
                }
                if (val == null) {
                    val = "";
                } else if (typeof val === "number") {
                    val += "";
                } else if (jQuery.isArray(val)) {
                    val = jQuery.map(val, function(value) {
                        return value == null ? "" : value + "";
                    });
                }
                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                    this.value = val;
                }
            });
        }
    });
    jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return val != null ? val : jQuery.trim(jQuery.text(elem));
                }
            },
            select: {
                get: function(elem) {
                    var value, option, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one" || index < 0, values = one ? null : [], max = one ? index + 1 : options.length, i = index < 0 ? max : one ? index : 0;
                    for (;i < max; i++) {
                        option = options[i];
                        if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                            value = jQuery(option).val();
                            if (one) {
                                return value;
                            }
                            values.push(value);
                        }
                    }
                    return values;
                },
                set: function(elem, value) {
                    var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
                    while (i--) {
                        option = options[i];
                        if (option.selected = jQuery.inArray(option.value, values) >= 0) {
                            optionSet = true;
                        }
                    }
                    if (!optionSet) {
                        elem.selectedIndex = -1;
                    }
                    return values;
                }
            }
        }
    });
    jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                if (jQuery.isArray(value)) {
                    return elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0;
                }
            }
        };
        if (!support.checkOn) {
            jQuery.valHooks[this].get = function(elem) {
                return elem.getAttribute("value") === null ? "on" : elem.value;
            };
        }
    });
    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
    });
    jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        }
    });
    var nonce = jQuery.now();
    var rquery = /\?/;
    jQuery.parseJSON = function(data) {
        return JSON.parse(data + "");
    };
    jQuery.parseXML = function(data) {
        var xml, tmp;
        if (!data || typeof data !== "string") {
            return null;
        }
        try {
            tmp = new DOMParser();
            xml = tmp.parseFromString(data, "text/xml");
        } catch (e) {
            xml = undefined;
        }
        if (!xml || xml.getElementsByTagName("parsererror").length) {
            jQuery.error("Invalid XML: " + data);
        }
        return xml;
    };
    var rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), ajaxLocation = window.location.href, ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
            if (jQuery.isFunction(func)) {
                while (dataType = dataTypes[i++]) {
                    if (dataType[0] === "+") {
                        dataType = dataType.slice(1) || "*";
                        (structure[dataType] = structure[dataType] || []).unshift(func);
                    } else {
                        (structure[dataType] = structure[dataType] || []).push(func);
                    }
                }
            }
        };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        var inspected = {}, seekingTransport = structure === transports;
        function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                    options.dataTypes.unshift(dataTypeOrTransport);
                    inspect(dataTypeOrTransport);
                    return false;
                } else if (seekingTransport) {
                    return !(selected = dataTypeOrTransport);
                }
            });
            return selected;
        }
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep);
        }
        return target;
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
        }
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
            }
        }
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
        } else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }
            finalDataType = finalDataType || firstDataType;
        }
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv];
            }
        }
        current = dataTypes.shift();
        while (current) {
            if (s.responseFields[current]) {
                jqXHR[s.responseFields[current]] = response;
            }
            if (!prev && isSuccess && s.dataFilter) {
                response = s.dataFilter(response, s.dataType);
            }
            prev = current;
            current = dataTypes.shift();
            if (current) {
                if (current === "*") {
                    current = prev;
                } else if (prev !== "*" && prev !== current) {
                    conv = converters[prev + " " + current] || converters["* " + current];
                    if (!conv) {
                        for (conv2 in converters) {
                            tmp = conv2.split(" ");
                            if (tmp[1] === current) {
                                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                                if (conv) {
                                    if (conv === true) {
                                        conv = converters[conv2];
                                    } else if (converters[conv2] !== true) {
                                        current = tmp[0];
                                        dataTypes.unshift(tmp[1]);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    if (conv !== true) {
                        if (conv && s["throws"]) {
                            response = conv(response);
                        } else {
                            try {
                                response = conv(response);
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                };
                            }
                        }
                    }
                }
            }
        }
        return {
            state: "success",
            data: response
        };
    }
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": true,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: true,
                context: true
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }
            options = options || {};
            var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = "canceled", jqXHR = {
                readyState: 0,
                getResponseHeader: function(key) {
                    var match;
                    if (state === 2) {
                        if (!responseHeaders) {
                            responseHeaders = {};
                            while (match = rheaders.exec(responseHeadersString)) {
                                responseHeaders[match[1].toLowerCase()] = match[2];
                            }
                        }
                        match = responseHeaders[key.toLowerCase()];
                    }
                    return match == null ? null : match;
                },
                getAllResponseHeaders: function() {
                    return state === 2 ? responseHeadersString : null;
                },
                setRequestHeader: function(name, value) {
                    var lname = name.toLowerCase();
                    if (!state) {
                        name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                        requestHeaders[name] = value;
                    }
                    return this;
                },
                overrideMimeType: function(type) {
                    if (!state) {
                        s.mimeType = type;
                    }
                    return this;
                },
                statusCode: function(map) {
                    var code;
                    if (map) {
                        if (state < 2) {
                            for (code in map) {
                                statusCode[code] = [ statusCode[code], map[code] ];
                            }
                        } else {
                            jqXHR.always(map[jqXHR.status]);
                        }
                    }
                    return this;
                },
                abort: function(statusText) {
                    var finalText = statusText || strAbort;
                    if (transport) {
                        transport.abort(finalText);
                    }
                    done(0, finalText);
                    return this;
                }
            };
            deferred.promise(jqXHR).complete = completeDeferred.add;
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;
            s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
            s.type = options.method || options.type || s.method || s.type;
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [ "" ];
            if (s.crossDomain == null) {
                parts = rurl.exec(s.url.toLowerCase());
                s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? "80" : "443")) !== (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443"))));
            }
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (state === 2) {
                return jqXHR;
            }
            fireGlobals = jQuery.event && s.global;
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
            }
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            cacheURL = s.url;
            if (!s.hasContent) {
                if (s.data) {
                    cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data;
                    delete s.data;
                }
                if (s.cache === false) {
                    s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
                }
            }
            if (s.ifModified) {
                if (jQuery.lastModified[cacheURL]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                }
                if (jQuery.etag[cacheURL]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
                }
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType);
            }
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i]);
            }
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
                return jqXHR.abort();
            }
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) {
                jqXHR[i](s[i]);
            }
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) {
                done(-1, "No Transport");
            } else {
                jqXHR.readyState = 1;
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [ jqXHR, s ]);
                }
                if (s.async && s.timeout > 0) {
                    timeoutTimer = setTimeout(function() {
                        jqXHR.abort("timeout");
                    }, s.timeout);
                }
                try {
                    state = 1;
                    transport.send(requestHeaders, done);
                } catch (e) {
                    if (state < 2) {
                        done(-1, e);
                    } else {
                        throw e;
                    }
                }
            }
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                if (state === 2) {
                    return;
                }
                state = 2;
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                }
                transport = undefined;
                responseHeadersString = headers || "";
                jqXHR.readyState = status > 0 ? 4 : 0;
                isSuccess = status >= 200 && status < 300 || status === 304;
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses);
                }
                response = ajaxConvert(s, response, jqXHR, isSuccess);
                if (isSuccess) {
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            jQuery.lastModified[cacheURL] = modified;
                        }
                        modified = jqXHR.getResponseHeader("etag");
                        if (modified) {
                            jQuery.etag[cacheURL] = modified;
                        }
                    }
                    if (status === 204 || s.type === "HEAD") {
                        statusText = "nocontent";
                    } else if (status === 304) {
                        statusText = "notmodified";
                    } else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                } else {
                    error = statusText;
                    if (status || !statusText) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0;
                        }
                    }
                }
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]);
                } else {
                    deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]);
                }
                jqXHR.statusCode(statusCode);
                statusCode = undefined;
                if (fireGlobals) {
                    globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [ jqXHR, s, isSuccess ? success : error ]);
                }
                completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]);
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]);
                    if (!--jQuery.active) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }
            return jqXHR;
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        }
    });
    jQuery.each([ "get", "post" ], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }
            return jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    });
    jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: false,
            global: false,
            "throws": true
        });
    };
    jQuery.fn.extend({
        wrapAll: function(html) {
            var wrap;
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapAll(html.call(this, i));
                });
            }
            if (this[0]) {
                wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }
                wrap.map(function() {
                    var elem = this;
                    while (elem.firstElementChild) {
                        elem = elem.firstElementChild;
                    }
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapInner(html.call(this, i));
                });
            }
            return this.each(function() {
                var self = jQuery(this), contents = self.contents();
                if (contents.length) {
                    contents.wrapAll(html);
                } else {
                    self.append(html);
                }
            });
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                if (!jQuery.nodeName(this, "body")) {
                    jQuery(this).replaceWith(this.childNodes);
                }
            }).end();
        }
    });
    jQuery.expr.filters.hidden = function(elem) {
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
    };
    jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem);
    };
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) {
            jQuery.each(obj, function(i, v) {
                if (traditional || rbracket.test(prefix)) {
                    add(prefix, v);
                } else {
                    buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
                }
            });
        } else if (!traditional && jQuery.type(obj) === "object") {
            for (name in obj) {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }
        } else {
            add(prefix, obj);
        }
    }
    jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, value) {
            value = jQuery.isFunction(value) ? value() : value == null ? "" : value;
            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
        if (traditional === undefined) {
            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
        }
        if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
            jQuery.each(a, function() {
                add(this.name, this.value);
            });
        } else {
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }
        return s.join("&").replace(r20, "+");
    };
    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    });
    jQuery.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest();
        } catch (e) {}
    };
    var xhrId = 0, xhrCallbacks = {}, xhrSuccessStatus = {
        0: 200,
        1223: 204
    }, xhrSupported = jQuery.ajaxSettings.xhr();
    if (window.attachEvent) {
        window.attachEvent("onunload", function() {
            for (var key in xhrCallbacks) {
                xhrCallbacks[key]();
            }
        });
    }
    support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
    support.ajax = xhrSupported = !!xhrSupported;
    jQuery.ajaxTransport(function(options) {
        var callback;
        if (support.cors || xhrSupported && !options.crossDomain) {
            return {
                send: function(headers, complete) {
                    var i, xhr = options.xhr(), id = ++xhrId;
                    xhr.open(options.type, options.url, options.async, options.username, options.password);
                    if (options.xhrFields) {
                        for (i in options.xhrFields) {
                            xhr[i] = options.xhrFields[i];
                        }
                    }
                    if (options.mimeType && xhr.overrideMimeType) {
                        xhr.overrideMimeType(options.mimeType);
                    }
                    if (!options.crossDomain && !headers["X-Requested-With"]) {
                        headers["X-Requested-With"] = "XMLHttpRequest";
                    }
                    for (i in headers) {
                        xhr.setRequestHeader(i, headers[i]);
                    }
                    callback = function(type) {
                        return function() {
                            if (callback) {
                                delete xhrCallbacks[id];
                                callback = xhr.onload = xhr.onerror = null;
                                if (type === "abort") {
                                    xhr.abort();
                                } else if (type === "error") {
                                    complete(xhr.status, xhr.statusText);
                                } else {
                                    complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, typeof xhr.responseText === "string" ? {
                                        text: xhr.responseText
                                    } : undefined, xhr.getAllResponseHeaders());
                                }
                            }
                        };
                    };
                    xhr.onload = callback();
                    xhr.onerror = callback("error");
                    callback = xhrCallbacks[id] = callback("abort");
                    try {
                        xhr.send(options.hasContent && options.data || null);
                    } catch (e) {
                        if (callback) {
                            throw e;
                        }
                    }
                },
                abort: function() {
                    if (callback) {
                        callback();
                    }
                }
            };
        }
    });
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });
    jQuery.ajaxPrefilter("script", function(s) {
        if (s.cache === undefined) {
            s.cache = false;
        }
        if (s.crossDomain) {
            s.type = "GET";
        }
    });
    jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, callback;
            return {
                send: function(_, complete) {
                    script = jQuery("<script>").prop({
                        async: true,
                        charset: s.scriptCharset,
                        src: s.url
                    }).on("load error", callback = function(evt) {
                        script.remove();
                        callback = null;
                        if (evt) {
                            complete(evt.type === "error" ? 404 : 200, evt.type);
                        }
                    });
                    document.head.appendChild(script[0]);
                },
                abort: function() {
                    if (callback) {
                        callback();
                    }
                }
            };
        }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            this[callback] = true;
            return callback;
        }
    });
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        if (jsonProp || s.dataTypes[0] === "jsonp") {
            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
            if (jsonProp) {
                s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            } else if (s.jsonp !== false) {
                s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
            }
            s.converters["script json"] = function() {
                if (!responseContainer) {
                    jQuery.error(callbackName + " was not called");
                }
                return responseContainer[0];
            };
            s.dataTypes[0] = "json";
            overwritten = window[callbackName];
            window[callbackName] = function() {
                responseContainer = arguments;
            };
            jqXHR.always(function() {
                window[callbackName] = overwritten;
                if (s[callbackName]) {
                    s.jsonpCallback = originalSettings.jsonpCallback;
                    oldCallbacks.push(callbackName);
                }
                if (responseContainer && jQuery.isFunction(overwritten)) {
                    overwritten(responseContainer[0]);
                }
                responseContainer = overwritten = undefined;
            });
            return "script";
        }
    });
    jQuery.parseHTML = function(data, context, keepScripts) {
        if (!data || typeof data !== "string") {
            return null;
        }
        if (typeof context === "boolean") {
            keepScripts = context;
            context = false;
        }
        context = context || document;
        var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
        if (parsed) {
            return [ context.createElement(parsed[1]) ];
        }
        parsed = jQuery.buildFragment([ data ], context, scripts);
        if (scripts && scripts.length) {
            jQuery(scripts).remove();
        }
        return jQuery.merge([], parsed.childNodes);
    };
    var _load = jQuery.fn.load;
    jQuery.fn.load = function(url, params, callback) {
        if (typeof url !== "string" && _load) {
            return _load.apply(this, arguments);
        }
        var selector, type, response, self = this, off = url.indexOf(" ");
        if (off >= 0) {
            selector = jQuery.trim(url.slice(off));
            url = url.slice(0, off);
        }
        if (jQuery.isFunction(params)) {
            callback = params;
            params = undefined;
        } else if (params && typeof params === "object") {
            type = "POST";
        }
        if (self.length > 0) {
            jQuery.ajax({
                url: url,
                type: type,
                dataType: "html",
                data: params
            }).done(function(responseText) {
                response = arguments;
                self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
            }).complete(callback && function(jqXHR, status) {
                self.each(callback, response || [ jqXHR.responseText, status, jqXHR ]);
            });
        }
        return this;
    };
    jQuery.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
        };
    });
    jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    };
    var docElem = window.document.documentElement;
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }
    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
            if (position === "static") {
                elem.style.position = "relative";
            }
            curOffset = curElem.offset();
            curCSSTop = jQuery.css(elem, "top");
            curCSSLeft = jQuery.css(elem, "left");
            calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;
            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0;
            }
            if (jQuery.isFunction(options)) {
                options = options.call(elem, i, curOffset);
            }
            if (options.top != null) {
                props.top = options.top - curOffset.top + curTop;
            }
            if (options.left != null) {
                props.left = options.left - curOffset.left + curLeft;
            }
            if ("using" in options) {
                options.using.call(elem, props);
            } else {
                curElem.css(props);
            }
        }
    };
    jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length) {
                return options === undefined ? this : this.each(function(i) {
                    jQuery.offset.setOffset(this, options, i);
                });
            }
            var docElem, win, elem = this[0], box = {
                top: 0,
                left: 0
            }, doc = elem && elem.ownerDocument;
            if (!doc) {
                return;
            }
            docElem = doc.documentElement;
            if (!jQuery.contains(docElem, elem)) {
                return box;
            }
            if (typeof elem.getBoundingClientRect !== strundefined) {
                box = elem.getBoundingClientRect();
            }
            win = getWindow(doc);
            return {
                top: box.top + win.pageYOffset - docElem.clientTop,
                left: box.left + win.pageXOffset - docElem.clientLeft
            };
        },
        position: function() {
            if (!this[0]) {
                return;
            }
            var offsetParent, offset, elem = this[0], parentOffset = {
                top: 0,
                left: 0
            };
            if (jQuery.css(elem, "position") === "fixed") {
                offset = elem.getBoundingClientRect();
            } else {
                offsetParent = this.offsetParent();
                offset = this.offset();
                if (!jQuery.nodeName(offsetParent[0], "html")) {
                    parentOffset = offsetParent.offset();
                }
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
                parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
            }
            return {
                top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
            };
        },
        offsetParent: function() {
            return this.map(function() {
                var offsetParent = this.offsetParent || docElem;
                while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent || docElem;
            });
        }
    });
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = "pageYOffset" === prop;
        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win = getWindow(elem);
                if (val === undefined) {
                    return win ? win[prop] : elem[method];
                }
                if (win) {
                    win.scrollTo(!top ? val : window.pageXOffset, top ? val : window.pageYOffset);
                } else {
                    elem[method] = val;
                }
            }, method, val, arguments.length, null);
        };
    });
    jQuery.each([ "top", "left" ], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            if (computed) {
                computed = curCSS(elem, prop);
                return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
            }
        });
    });
    jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
                return access(this, function(elem, type, value) {
                    var doc;
                    if (jQuery.isWindow(elem)) {
                        return elem.document.documentElement["client" + name];
                    }
                    if (elem.nodeType === 9) {
                        doc = elem.documentElement;
                        return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
                    }
                    return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : undefined, chainable, null);
            };
        });
    });
    jQuery.fn.size = function() {
        return this.length;
    };
    jQuery.fn.andSelf = jQuery.fn.addBack;
    if (typeof define === "function" && define.amd) {
        define("jquery", [], function() {
            return jQuery;
        });
    }
    var _jQuery = window.jQuery, _$ = window.$;
    jQuery.noConflict = function(deep) {
        if (window.$ === jQuery) {
            window.$ = _$;
        }
        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }
        return jQuery;
    };
    if (typeof noGlobal === strundefined) {
        window.jQuery = window.$ = jQuery;
    }
    return jQuery;
});

!function($) {
    "use strict";
    var FOUNDATION_VERSION = "6.1.1";
    var Foundation = {
        version: FOUNDATION_VERSION,
        _plugins: {},
        _uuids: [],
        _activePlugins: {},
        rtl: function() {
            return $("html").attr("dir") === "rtl";
        },
        plugin: function(plugin, name) {
            var className = name || functionName(plugin);
            var attrName = hyphenate(className);
            this._plugins[attrName] = this[className] = plugin;
        },
        registerPlugin: function(plugin, name) {
            var pluginName = name ? hyphenate(name) : functionName(plugin.constructor).toLowerCase();
            plugin.uuid = this.GetYoDigits(6, pluginName);
            if (!plugin.$element.attr("data-" + pluginName)) {
                plugin.$element.attr("data-" + pluginName, plugin.uuid);
            }
            if (!plugin.$element.data("zfPlugin")) {
                plugin.$element.data("zfPlugin", plugin);
            }
            plugin.$element.trigger("init.zf." + pluginName);
            this._uuids.push(plugin.uuid);
            return;
        },
        unregisterPlugin: function(plugin) {
            var pluginName = hyphenate(functionName(plugin.$element.data("zfPlugin").constructor));
            this._uuids.splice(this._uuids.indexOf(plugin.uuid), 1);
            plugin.$element.removeAttr("data-" + pluginName).removeData("zfPlugin").trigger("destroyed.zf." + pluginName);
            for (var prop in plugin) {
                plugin[prop] = null;
            }
            return;
        },
        reInit: function(plugins) {
            var isJQ = plugins instanceof $;
            try {
                if (isJQ) {
                    plugins.each(function() {
                        $(this).data("zfPlugin")._init();
                    });
                } else {
                    var type = typeof plugins, _this = this, fns = {
                        object: function(plgs) {
                            plgs.forEach(function(p) {
                                $("[data-" + p + "]").foundation("_init");
                            });
                        },
                        string: function() {
                            $("[data-" + plugins + "]").foundation("_init");
                        },
                        undefined: function() {
                            this["object"](Object.keys(_this._plugins));
                        }
                    };
                    fns[type](plugins);
                }
            } catch (err) {
                console.error(err);
            } finally {
                return plugins;
            }
        },
        GetYoDigits: function(length, namespace) {
            length = length || 6;
            return Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1) + (namespace ? "-" + namespace : "");
        },
        reflow: function(elem, plugins) {
            if (typeof plugins === "undefined") {
                plugins = Object.keys(this._plugins);
            } else if (typeof plugins === "string") {
                plugins = [ plugins ];
            }
            var _this = this;
            $.each(plugins, function(i, name) {
                var plugin = _this._plugins[name];
                var $elem = $(elem).find("[data-" + name + "]").addBack("[data-" + name + "]");
                $elem.each(function() {
                    var $el = $(this), opts = {};
                    if ($el.data("zfPlugin")) {
                        console.warn("Tried to initialize " + name + " on an element that already has a Foundation plugin.");
                        return;
                    }
                    if ($el.attr("data-options")) {
                        var thing = $el.attr("data-options").split(";").forEach(function(e, i) {
                            var opt = e.split(":").map(function(el) {
                                return el.trim();
                            });
                            if (opt[0]) opts[opt[0]] = parseValue(opt[1]);
                        });
                    }
                    try {
                        $el.data("zfPlugin", new plugin($(this), opts));
                    } catch (er) {
                        console.error(er);
                    } finally {
                        return;
                    }
                });
            });
        },
        getFnName: functionName,
        transitionend: function($elem) {
            var transitions = {
                transition: "transitionend",
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend"
            };
            var elem = document.createElement("div"), end;
            for (var t in transitions) {
                if (typeof elem.style[t] !== "undefined") {
                    end = transitions[t];
                }
            }
            if (end) {
                return end;
            } else {
                end = setTimeout(function() {
                    $elem.triggerHandler("transitionend", [ $elem ]);
                }, 1);
                return "transitionend";
            }
        }
    };
    Foundation.util = {
        throttle: function(func, delay) {
            var timer = null;
            return function() {
                var context = this, args = arguments;
                if (timer === null) {
                    timer = setTimeout(function() {
                        func.apply(context, args);
                        timer = null;
                    }, delay);
                }
            };
        }
    };
    var foundation = function(method) {
        var type = typeof method, $meta = $("meta.foundation-mq"), $noJS = $(".no-js");
        if (!$meta.length) {
            $('<meta class="foundation-mq">').appendTo(document.head);
        }
        if ($noJS.length) {
            $noJS.removeClass("no-js");
        }
        if (type === "undefined") {
            Foundation.MediaQuery._init();
            Foundation.reflow(this);
        } else if (type === "string") {
            var args = Array.prototype.slice.call(arguments, 1);
            var plugClass = this.data("zfPlugin");
            if (plugClass !== undefined && plugClass[method] !== undefined) {
                if (this.length === 1) {
                    plugClass[method].apply(plugClass, args);
                } else {
                    this.each(function(i, el) {
                        plugClass[method].apply($(el).data("zfPlugin"), args);
                    });
                }
            } else {
                throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (plugClass ? functionName(plugClass) : "this element") + ".");
            }
        } else {
            throw new TypeError("We're sorry, '" + type + "' is not a valid parameter. You must use a string representing the method you wish to invoke.");
        }
        return this;
    };
    window.Foundation = Foundation;
    $.fn.foundation = foundation;
    (function() {
        if (!Date.now || !window.Date.now) window.Date.now = Date.now = function() {
            return new Date().getTime();
        };
        var vendors = [ "webkit", "moz" ];
        for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
            var vp = vendors[i];
            window.requestAnimationFrame = window[vp + "RequestAnimationFrame"];
            window.cancelAnimationFrame = window[vp + "CancelAnimationFrame"] || window[vp + "CancelRequestAnimationFrame"];
        }
        if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
            var lastTime = 0;
            window.requestAnimationFrame = function(callback) {
                var now = Date.now();
                var nextTime = Math.max(lastTime + 16, now);
                return setTimeout(function() {
                    callback(lastTime = nextTime);
                }, nextTime - now);
            };
            window.cancelAnimationFrame = clearTimeout;
        }
        if (!window.performance || !window.performance.now) {
            window.performance = {
                start: Date.now(),
                now: function() {
                    return Date.now() - this.start;
                }
            };
        }
    })();
    if (!Function.prototype.bind) {
        Function.prototype.bind = function(oThis) {
            if (typeof this !== "function") {
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }
            var aArgs = Array.prototype.slice.call(arguments, 1), fToBind = this, fNOP = function() {}, fBound = function() {
                return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
            };
            if (this.prototype) {
                fNOP.prototype = this.prototype;
            }
            fBound.prototype = new fNOP();
            return fBound;
        };
    }
    function functionName(fn) {
        if (Function.prototype.name === undefined) {
            var funcNameRegex = /function\s([^(]{1,})\(/;
            var results = funcNameRegex.exec(fn.toString());
            return results && results.length > 1 ? results[1].trim() : "";
        } else if (fn.prototype === undefined) {
            return fn.constructor.name;
        } else {
            return fn.prototype.constructor.name;
        }
    }
    function parseValue(str) {
        if (/true/.test(str)) return true; else if (/false/.test(str)) return false; else if (!isNaN(str * 1)) return parseFloat(str);
        return str;
    }
    function hyphenate(str) {
        return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    }
}(jQuery);

!function(Foundation, window) {
    var ImNotTouchingYou = function(element, parent, lrOnly, tbOnly) {
        var eleDims = GetDimensions(element), top, bottom, left, right;
        if (parent) {
            var parDims = GetDimensions(parent);
            bottom = eleDims.offset.top + eleDims.height <= parDims.height + parDims.offset.top;
            top = eleDims.offset.top >= parDims.offset.top;
            left = eleDims.offset.left >= parDims.offset.left;
            right = eleDims.offset.left + eleDims.width <= parDims.width;
        } else {
            bottom = eleDims.offset.top + eleDims.height <= eleDims.windowDims.height + eleDims.windowDims.offset.top;
            top = eleDims.offset.top >= eleDims.windowDims.offset.top;
            left = eleDims.offset.left >= eleDims.windowDims.offset.left;
            right = eleDims.offset.left + eleDims.width <= eleDims.windowDims.width;
        }
        var allDirs = [ bottom, top, left, right ];
        if (lrOnly) {
            return left === right === true;
        }
        if (tbOnly) {
            return top === bottom === true;
        }
        return allDirs.indexOf(false) === -1;
    };
    var GetDimensions = function(elem, test) {
        elem = elem.length ? elem[0] : elem;
        if (elem === window || elem === document) {
            throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");
        }
        var rect = elem.getBoundingClientRect(), parRect = elem.parentNode.getBoundingClientRect(), winRect = document.body.getBoundingClientRect(), winY = window.pageYOffset, winX = window.pageXOffset;
        return {
            width: rect.width,
            height: rect.height,
            offset: {
                top: rect.top + winY,
                left: rect.left + winX
            },
            parentDims: {
                width: parRect.width,
                height: parRect.height,
                offset: {
                    top: parRect.top + winY,
                    left: parRect.left + winX
                }
            },
            windowDims: {
                width: winRect.width,
                height: winRect.height,
                offset: {
                    top: winY,
                    left: winX
                }
            }
        };
    };
    var GetOffsets = function(element, anchor, position, vOffset, hOffset, isOverflow) {
        var $eleDims = GetDimensions(element), $anchorDims = anchor ? GetDimensions(anchor) : null;
        switch (position) {
          case "top":
            return {
                left: $anchorDims.offset.left,
                top: $anchorDims.offset.top - ($eleDims.height + vOffset)
            };
            break;

          case "left":
            return {
                left: $anchorDims.offset.left - ($eleDims.width + hOffset),
                top: $anchorDims.offset.top
            };
            break;

          case "right":
            return {
                left: $anchorDims.offset.left + $anchorDims.width + hOffset,
                top: $anchorDims.offset.top
            };
            break;

          case "center top":
            return {
                left: $anchorDims.offset.left + $anchorDims.width / 2 - $eleDims.width / 2,
                top: $anchorDims.offset.top - ($eleDims.height + vOffset)
            };
            break;

          case "center bottom":
            return {
                left: isOverflow ? hOffset : $anchorDims.offset.left + $anchorDims.width / 2 - $eleDims.width / 2,
                top: $anchorDims.offset.top + $anchorDims.height + vOffset
            };
            break;

          case "center left":
            return {
                left: $anchorDims.offset.left - ($eleDims.width + hOffset),
                top: $anchorDims.offset.top + $anchorDims.height / 2 - $eleDims.height / 2
            };
            break;

          case "center right":
            return {
                left: $anchorDims.offset.left + $anchorDims.width + hOffset + 1,
                top: $anchorDims.offset.top + $anchorDims.height / 2 - $eleDims.height / 2
            };
            break;

          case "center":
            return {
                left: $eleDims.windowDims.offset.left + $eleDims.windowDims.width / 2 - $eleDims.width / 2,
                top: $eleDims.windowDims.offset.top + $eleDims.windowDims.height / 2 - $eleDims.height / 2
            };
            break;

          case "reveal":
            return {
                left: ($eleDims.windowDims.width - $eleDims.width) / 2,
                top: $eleDims.windowDims.offset.top + vOffset
            };

          case "reveal full":
            return {
                left: $eleDims.windowDims.offset.left,
                top: $eleDims.windowDims.offset.top
            };
            break;

          default:
            return {
                left: $anchorDims.offset.left,
                top: $anchorDims.offset.top + $anchorDims.height + vOffset
            };
        }
    };
    Foundation.Box = {
        ImNotTouchingYou: ImNotTouchingYou,
        GetDimensions: GetDimensions,
        GetOffsets: GetOffsets
    };
}(window.Foundation, window);

!function($, Foundation) {
    "use strict";
    Foundation.Keyboard = {};
    var keyCodes = {
        9: "TAB",
        13: "ENTER",
        27: "ESCAPE",
        32: "SPACE",
        37: "ARROW_LEFT",
        38: "ARROW_UP",
        39: "ARROW_RIGHT",
        40: "ARROW_DOWN"
    };
    var keys = function(kcs) {
        var k = {};
        for (var kc in kcs) k[kcs[kc]] = kcs[kc];
        return k;
    }(keyCodes);
    Foundation.Keyboard.keys = keys;
    var parseKey = function(event) {
        var key = keyCodes[event.which || event.keyCode] || String.fromCharCode(event.which).toUpperCase();
        if (event.shiftKey) key = "SHIFT_" + key;
        if (event.ctrlKey) key = "CTRL_" + key;
        if (event.altKey) key = "ALT_" + key;
        return key;
    };
    Foundation.Keyboard.parseKey = parseKey;
    var commands = {};
    var handleKey = function(event, component, functions) {
        var commandList = commands[component], keyCode = parseKey(event), cmds, command, fn;
        if (!commandList) return console.warn("Component not defined!");
        if (typeof commandList.ltr === "undefined") {
            cmds = commandList;
        } else {
            if (Foundation.rtl()) cmds = $.extend({}, commandList.ltr, commandList.rtl); else cmds = $.extend({}, commandList.rtl, commandList.ltr);
        }
        command = cmds[keyCode];
        fn = functions[command];
        if (fn && typeof fn === "function") {
            fn.apply();
            if (functions.handled || typeof functions.handled === "function") {
                functions.handled.apply();
            }
        } else {
            if (functions.unhandled || typeof functions.unhandled === "function") {
                functions.unhandled.apply();
            }
        }
    };
    Foundation.Keyboard.handleKey = handleKey;
    var findFocusable = function($element) {
        return $element.find("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter(function() {
            if (!$(this).is(":visible") || $(this).attr("tabindex") < 0) {
                return false;
            }
            return true;
        });
    };
    Foundation.Keyboard.findFocusable = findFocusable;
    var register = function(componentName, cmds) {
        commands[componentName] = cmds;
    };
    Foundation.Keyboard.register = register;
}(jQuery, window.Foundation);

!function($, Foundation) {
    var defaultQueries = {
        "default": "only screen",
        landscape: "only screen and (orientation: landscape)",
        portrait: "only screen and (orientation: portrait)",
        retina: "only screen and (-webkit-min-device-pixel-ratio: 2)," + "only screen and (min--moz-device-pixel-ratio: 2)," + "only screen and (-o-min-device-pixel-ratio: 2/1)," + "only screen and (min-device-pixel-ratio: 2)," + "only screen and (min-resolution: 192dpi)," + "only screen and (min-resolution: 2dppx)"
    };
    var MediaQuery = {
        queries: [],
        current: "",
        atLeast: function(size) {
            var query = this.get(size);
            if (query) {
                return window.matchMedia(query).matches;
            }
            return false;
        },
        get: function(size) {
            for (var i in this.queries) {
                var query = this.queries[i];
                if (size === query.name) return query.value;
            }
            return null;
        },
        _init: function() {
            var self = this;
            var extractedStyles = $(".foundation-mq").css("font-family");
            var namedQueries;
            namedQueries = parseStyleToObject(extractedStyles);
            for (var key in namedQueries) {
                self.queries.push({
                    name: key,
                    value: "only screen and (min-width: " + namedQueries[key] + ")"
                });
            }
            this.current = this._getCurrentSize();
            this._watcher();
        },
        _getCurrentSize: function() {
            var matched;
            for (var i in this.queries) {
                var query = this.queries[i];
                if (window.matchMedia(query.value).matches) {
                    matched = query;
                }
            }
            if (typeof matched === "object") {
                return matched.name;
            } else {
                return matched;
            }
        },
        _watcher: function() {
            var _this = this;
            $(window).on("resize.zf.mediaquery", function() {
                var newSize = _this._getCurrentSize();
                if (newSize !== _this.current) {
                    $(window).trigger("changed.zf.mediaquery", [ newSize, _this.current ]);
                    _this.current = newSize;
                }
            });
        }
    };
    Foundation.MediaQuery = MediaQuery;
    window.matchMedia || (window.matchMedia = function() {
        "use strict";
        var styleMedia = window.styleMedia || window.media;
        if (!styleMedia) {
            var style = document.createElement("style"), script = document.getElementsByTagName("script")[0], info = null;
            style.type = "text/css";
            style.id = "matchmediajs-test";
            script.parentNode.insertBefore(style, script);
            info = "getComputedStyle" in window && window.getComputedStyle(style, null) || style.currentStyle;
            styleMedia = {
                matchMedium: function(media) {
                    var text = "@media " + media + "{ #matchmediajs-test { width: 1px; } }";
                    if (style.styleSheet) {
                        style.styleSheet.cssText = text;
                    } else {
                        style.textContent = text;
                    }
                    return info.width === "1px";
                }
            };
        }
        return function(media) {
            return {
                matches: styleMedia.matchMedium(media || "all"),
                media: media || "all"
            };
        };
    }());
    function parseStyleToObject(str) {
        var styleObject = {};
        if (typeof str !== "string") {
            return styleObject;
        }
        str = str.trim().slice(1, -1);
        if (!str) {
            return styleObject;
        }
        styleObject = str.split("&").reduce(function(ret, param) {
            var parts = param.replace(/\+/g, " ").split("=");
            var key = parts[0];
            var val = parts[1];
            key = decodeURIComponent(key);
            val = val === undefined ? null : decodeURIComponent(val);
            if (!ret.hasOwnProperty(key)) {
                ret[key] = val;
            } else if (Array.isArray(ret[key])) {
                ret[key].push(val);
            } else {
                ret[key] = [ ret[key], val ];
            }
            return ret;
        }, {});
        return styleObject;
    }
}(jQuery, Foundation);

!function($, Foundation) {
    var initClasses = [ "mui-enter", "mui-leave" ];
    var activeClasses = [ "mui-enter-active", "mui-leave-active" ];
    function animate(isIn, element, animation, cb) {
        element = $(element).eq(0);
        if (!element.length) return;
        var initClass = isIn ? initClasses[0] : initClasses[1];
        var activeClass = isIn ? activeClasses[0] : activeClasses[1];
        reset();
        element.addClass(animation).css("transition", "none");
        requestAnimationFrame(function() {
            element.addClass(initClass);
            if (isIn) element.show();
        });
        requestAnimationFrame(function() {
            element[0].offsetWidth;
            element.css("transition", "");
            element.addClass(activeClass);
        });
        element.one(Foundation.transitionend(element), finish);
        function finish() {
            if (!isIn) element.hide();
            reset();
            if (cb) cb.apply(element);
        }
        function reset() {
            element[0].style.transitionDuration = 0;
            element.removeClass(initClass + " " + activeClass + " " + animation);
        }
    }
    var Motion = {
        animateIn: function(element, animation, cb) {
            animate(true, element, animation, cb);
        },
        animateOut: function(element, animation, cb) {
            animate(false, element, animation, cb);
        }
    };
    var Move = function(duration, elem, fn) {
        var anim, prog, start = null;
        function move(ts) {
            if (!start) start = window.performance.now();
            prog = ts - start;
            fn.apply(elem);
            if (prog < duration) {
                anim = window.requestAnimationFrame(move, elem);
            } else {
                window.cancelAnimationFrame(anim);
                elem.trigger("finished.zf.animate", [ elem ]).triggerHandler("finished.zf.animate", [ elem ]);
            }
        }
        anim = window.requestAnimationFrame(move);
    };
    Foundation.Move = Move;
    Foundation.Motion = Motion;
}(jQuery, Foundation);

!function($, Foundation) {
    "use strict";
    Foundation.Nest = {
        Feather: function(menu, type) {
            menu.attr("role", "menubar");
            type = type || "zf";
            var items = menu.find("li").attr({
                role: "menuitem"
            }), subMenuClass = "is-" + type + "-submenu", subItemClass = subMenuClass + "-item", hasSubClass = "is-" + type + "-submenu-parent";
            menu.find("a:first").attr("tabindex", 0);
            items.each(function() {
                var $item = $(this), $sub = $item.children("ul");
                if ($sub.length) {
                    $item.addClass("has-submenu " + hasSubClass).attr({
                        "aria-haspopup": true,
                        "aria-selected": false,
                        "aria-expanded": false,
                        "aria-label": $item.children("a:first").text()
                    });
                    $sub.addClass("submenu " + subMenuClass).attr({
                        "data-submenu": "",
                        "aria-hidden": true,
                        role: "menu"
                    });
                }
                if ($item.parent("[data-submenu]").length) {
                    $item.addClass("is-submenu-item " + subItemClass);
                }
            });
            return;
        },
        Burn: function(menu, type) {
            var items = menu.find("li").removeAttr("tabindex"), subMenuClass = "is-" + type + "-submenu", subItemClass = subMenuClass + "-item", hasSubClass = "is-" + type + "-submenu-parent";
            menu.find("*").removeClass(subMenuClass + " " + subItemClass + " " + hasSubClass + " has-submenu is-submenu-item submenu is-active").removeAttr("data-submenu").css("display", "");
        }
    };
}(jQuery, window.Foundation);

!function($, Foundation) {
    "use strict";
    var Timer = function(elem, options, cb) {
        var _this = this, duration = options.duration, nameSpace = Object.keys(elem.data())[0] || "timer", remain = -1, start, timer;
        this.restart = function() {
            remain = -1;
            clearTimeout(timer);
            this.start();
        };
        this.start = function() {
            clearTimeout(timer);
            remain = remain <= 0 ? duration : remain;
            elem.data("paused", false);
            start = Date.now();
            timer = setTimeout(function() {
                if (options.infinite) {
                    _this.restart();
                }
                cb();
            }, remain);
            elem.trigger("timerstart.zf." + nameSpace);
        };
        this.pause = function() {
            clearTimeout(timer);
            elem.data("paused", true);
            var end = Date.now();
            remain = remain - (end - start);
            elem.trigger("timerpaused.zf." + nameSpace);
        };
    };
    var onImagesLoaded = function(images, callback) {
        var self = this, unloaded = images.length;
        if (unloaded === 0) {
            callback();
        }
        var singleImageLoaded = function() {
            unloaded--;
            if (unloaded === 0) {
                callback();
            }
        };
        images.each(function() {
            if (this.complete) {
                singleImageLoaded();
            } else if (typeof this.naturalWidth !== "undefined" && this.naturalWidth > 0) {
                singleImageLoaded();
            } else {
                $(this).one("load", function() {
                    singleImageLoaded();
                });
            }
        });
    };
    Foundation.Timer = Timer;
    Foundation.onImagesLoaded = onImagesLoaded;
}(jQuery, window.Foundation);

(function($) {
    $.spotSwipe = {
        version: "1.0.0",
        enabled: "ontouchstart" in document.documentElement,
        preventDefault: false,
        moveThreshold: 75,
        timeThreshold: 200
    };
    var startPosX, startPosY, startTime, elapsedTime, isMoving = false;
    function onTouchEnd() {
        this.removeEventListener("touchmove", onTouchMove);
        this.removeEventListener("touchend", onTouchEnd);
        isMoving = false;
    }
    function onTouchMove(e) {
        if ($.spotSwipe.preventDefault) {
            e.preventDefault();
        }
        if (isMoving) {
            var x = e.touches[0].pageX;
            var y = e.touches[0].pageY;
            var dx = startPosX - x;
            var dy = startPosY - y;
            var dir;
            elapsedTime = new Date().getTime() - startTime;
            if (Math.abs(dx) >= $.spotSwipe.moveThreshold && elapsedTime <= $.spotSwipe.timeThreshold) {
                dir = dx > 0 ? "left" : "right";
            }
            if (dir) {
                e.preventDefault();
                onTouchEnd.call(this);
                $(this).trigger("swipe", dir).trigger("swipe" + dir);
            }
        }
    }
    function onTouchStart(e) {
        if (e.touches.length == 1) {
            startPosX = e.touches[0].pageX;
            startPosY = e.touches[0].pageY;
            isMoving = true;
            startTime = new Date().getTime();
            this.addEventListener("touchmove", onTouchMove, false);
            this.addEventListener("touchend", onTouchEnd, false);
        }
    }
    function init() {
        this.addEventListener && this.addEventListener("touchstart", onTouchStart, false);
    }
    function teardown() {
        this.removeEventListener("touchstart", onTouchStart);
    }
    $.event.special.swipe = {
        setup: init
    };
    $.each([ "left", "up", "down", "right" ], function() {
        $.event.special["swipe" + this] = {
            setup: function() {
                $(this).on("swipe", $.noop);
            }
        };
    });
})(jQuery);

!function($) {
    $.fn.addTouch = function() {
        this.each(function(i, el) {
            $(el).bind("touchstart touchmove touchend touchcancel", function() {
                handleTouch(event);
            });
        });
        var handleTouch = function(event) {
            var touches = event.changedTouches, first = touches[0], eventTypes = {
                touchstart: "mousedown",
                touchmove: "mousemove",
                touchend: "mouseup"
            }, type = eventTypes[event.type];
            var simulatedEvent = document.createEvent("MouseEvent");
            simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0, null);
            first.target.dispatchEvent(simulatedEvent);
        };
    };
}(jQuery);

!function(Foundation, $) {
    "use strict";
    $(document).on("click.zf.trigger", "[data-open]", function() {
        var id = $(this).data("open");
        $("#" + id).triggerHandler("open.zf.trigger", [ $(this) ]);
    });
    $(document).on("click.zf.trigger", "[data-close]", function() {
        var id = $(this).data("close");
        if (id) {
            $("#" + id).triggerHandler("close.zf.trigger", [ $(this) ]);
        } else {
            $(this).trigger("close.zf.trigger");
        }
    });
    $(document).on("click.zf.trigger", "[data-toggle]", function() {
        var id = $(this).data("toggle");
        $("#" + id).triggerHandler("toggle.zf.trigger", [ $(this) ]);
    });
    $(document).on("close.zf.trigger", "[data-closable]", function() {
        var animation = $(this).data("closable") || "fade-out";
        if (Foundation.Motion) {
            Foundation.Motion.animateOut($(this), animation, function() {
                $(this).trigger("closed.zf");
            });
        } else {
            $(this).fadeOut().trigger("closed.zf");
        }
    });
    var MutationObserver = function() {
        var prefixes = [ "WebKit", "Moz", "O", "Ms", "" ];
        for (var i = 0; i < prefixes.length; i++) {
            if (prefixes[i] + "MutationObserver" in window) {
                return window[prefixes[i] + "MutationObserver"];
            }
        }
        return false;
    }();
    var checkListeners = function() {
        eventsListener();
        resizeListener();
        scrollListener();
        closemeListener();
    };
    $(window).load(function() {
        checkListeners();
    });
    var closemeListener = function(pluginName) {
        var yetiBoxes = $("[data-yeti-box]"), plugNames = [ "dropdown", "tooltip", "reveal" ];
        if (pluginName) {
            if (typeof pluginName === "string") {
                plugNames.push(pluginName);
            } else if (typeof pluginName === "object" && typeof pluginName[0] === "string") {
                plugNames.concat(pluginName);
            } else {
                console.error("Plugin names must be strings");
            }
        }
        if (yetiBoxes.length) {
            var listeners = plugNames.map(function(name) {
                return "closeme.zf." + name;
            }).join(" ");
            $(window).off(listeners).on(listeners, function(e, pluginId) {
                var plugin = e.namespace.split(".")[0];
                var plugins = $("[data-" + plugin + "]").not('[data-yeti-box="' + pluginId + '"]');
                plugins.each(function() {
                    var _this = $(this);
                    _this.triggerHandler("close.zf.trigger", [ _this ]);
                });
            });
        }
    };
    var resizeListener = function(debounce) {
        var timer, $nodes = $("[data-resize]");
        if ($nodes.length) {
            $(window).off("resize.zf.trigger").on("resize.zf.trigger", function(e) {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(function() {
                    if (!MutationObserver) {
                        $nodes.each(function() {
                            $(this).triggerHandler("resizeme.zf.trigger");
                        });
                    }
                    $nodes.attr("data-events", "resize");
                }, debounce || 10);
            });
        }
    };
    var scrollListener = function(debounce) {
        var timer, $nodes = $("[data-scroll]");
        if ($nodes.length) {
            $(window).off("scroll.zf.trigger").on("scroll.zf.trigger", function(e) {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(function() {
                    if (!MutationObserver) {
                        $nodes.each(function() {
                            $(this).triggerHandler("scrollme.zf.trigger");
                        });
                    }
                    $nodes.attr("data-events", "scroll");
                }, debounce || 10);
            });
        }
    };
    var eventsListener = function() {
        if (!MutationObserver) {
            return false;
        }
        var nodes = document.querySelectorAll("[data-resize], [data-scroll], [data-mutate]");
        var listeningElementsMutation = function(mutationRecordsList) {
            var $target = $(mutationRecordsList[0].target);
            switch ($target.attr("data-events")) {
              case "resize":
                $target.triggerHandler("resizeme.zf.trigger", [ $target ]);
                break;

              case "scroll":
                $target.triggerHandler("scrollme.zf.trigger", [ $target, window.pageYOffset ]);
                break;

              default:
                return false;
            }
        };
        if (nodes.length) {
            for (var i = 0; i <= nodes.length - 1; i++) {
                var elementObserver = new MutationObserver(listeningElementsMutation);
                elementObserver.observe(nodes[i], {
                    attributes: true,
                    childList: false,
                    characterData: false,
                    subtree: false,
                    attributeFilter: [ "data-events" ]
                });
            }
        }
    };
    Foundation.IHearYou = checkListeners;
}(window.Foundation, window.jQuery);

!function(Foundation, $) {
    "use strict";
    function Abide(element, options) {
        this.$element = element;
        this.options = $.extend({}, Abide.defaults, this.$element.data(), options);
        this._init();
        Foundation.registerPlugin(this, "Abide");
    }
    Abide.defaults = {
        validateOn: "fieldChange",
        labelErrorClass: "is-invalid-label",
        inputErrorClass: "is-invalid-input",
        formErrorSelector: ".form-error",
        formErrorClass: "is-visible",
        liveValidate: false,
        patterns: {
            alpha: /^[a-zA-Z]+$/,
            alpha_numeric: /^[a-zA-Z0-9]+$/,
            integer: /^[-+]?\d+$/,
            number: /^[-+]?\d*(?:[\.\,]\d+)?$/,
            card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
            cvv: /^([0-9]){3,4}$/,
            email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
            url: /^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
            domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,
            datetime: /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
            date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
            time: /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
            dateISO: /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
            month_day_year: /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
            day_month_year: /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,
            color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
        },
        validators: {
            equalTo: function(el, required, parent) {
                return $("#" + el.attr("data-equalto")).val() === el.val();
            }
        }
    };
    Abide.prototype._init = function() {
        this.$inputs = this.$element.find("input, textarea, select").not("[data-abide-ignore]");
        this._events();
    };
    Abide.prototype._events = function() {
        var _this = this;
        this.$element.off(".abide").on("reset.zf.abide", function(e) {
            _this.resetForm();
        }).on("submit.zf.abide", function(e) {
            return _this.validateForm();
        });
        if (this.options.validateOn === "fieldChange") {
            this.$inputs.off("change.zf.abide").on("change.zf.abide", function(e) {
                _this.validateInput($(this));
            });
        }
        if (this.options.liveValidate) {
            this.$inputs.off("input.zf.abide").on("input.zf.abide", function(e) {
                _this.validateInput($(this));
            });
        }
    }, Abide.prototype._reflow = function() {
        this._init();
    };
    Abide.prototype.requiredCheck = function($el) {
        if (!$el.attr("required")) return true;
        var isGood = true;
        switch ($el[0].type) {
          case "checkbox":
          case "radio":
            isGood = $el[0].checked;
            break;

          case "select":
          case "select-one":
          case "select-multiple":
            var opt = $el.find("option:selected");
            if (!opt.length || !opt.val()) isGood = false;
            break;

          default:
            if (!$el.val() || !$el.val().length) isGood = false;
        }
        return isGood;
    };
    Abide.prototype.findFormError = function($el) {
        var $error = $el.siblings(this.options.formErrorSelector);
        if (!$error.length) {
            $error = $el.parent().find(this.options.formErrorSelector);
        }
        return $error;
    };
    Abide.prototype.findLabel = function($el) {
        var $label = this.$element.find('label[for="' + $el[0].id + '"]');
        if (!$label.length) {
            return $el.closest("label");
        }
        return $label;
    };
    Abide.prototype.addErrorClasses = function($el) {
        var $label = this.findLabel($el), $formError = this.findFormError($el);
        if ($label.length) {
            $label.addClass(this.options.labelErrorClass);
        }
        if ($formError.length) {
            $formError.addClass(this.options.formErrorClass);
        }
        $el.addClass(this.options.inputErrorClass).attr("data-invalid", "");
    };
    Abide.prototype.removeErrorClasses = function($el) {
        var $label = this.findLabel($el), $formError = this.findFormError($el);
        if ($label.length) {
            $label.removeClass(this.options.labelErrorClass);
        }
        if ($formError.length) {
            $formError.removeClass(this.options.formErrorClass);
        }
        $el.removeClass(this.options.inputErrorClass).removeAttr("data-invalid");
    };
    Abide.prototype.validateInput = function($el) {
        var clearRequire = this.requiredCheck($el), validated = false, customValidator = true, validator = $el.attr("data-validator"), equalTo = true;
        switch ($el[0].type) {
          case "radio":
            validated = this.validateRadio($el.attr("name"));
            break;

          case "checkbox":
            validated = clearRequire;
            break;

          case "select":
          case "select-one":
          case "select-multiple":
            validated = clearRequire;
            break;

          default:
            validated = this.validateText($el);
        }
        if (validator) {
            customValidator = this.matchValidation($el, validator, $el.attr("required"));
        }
        if ($el.attr("data-equalto")) {
            equalTo = this.options.validators.equalTo($el);
        }
        var goodToGo = [ clearRequire, validated, customValidator, equalTo ].indexOf(false) === -1, message = (goodToGo ? "valid" : "invalid") + ".zf.abide";
        this[goodToGo ? "removeErrorClasses" : "addErrorClasses"]($el);
        $el.trigger(message, $el[0]);
        return goodToGo;
    };
    Abide.prototype.validateForm = function() {
        var acc = [], _this = this;
        this.$inputs.each(function() {
            acc.push(_this.validateInput($(this)));
        });
        var noError = acc.indexOf(false) === -1;
        this.$element.find("[data-abide-error]").css("display", noError ? "none" : "block");
        this.$element.trigger((noError ? "formvalid" : "forminvalid") + ".zf.abide", [ this.$element ]);
        return noError;
    };
    Abide.prototype.validateText = function($el, pattern) {
        pattern = pattern || $el.attr("pattern") || $el.attr("type");
        var inputText = $el.val();
        return inputText.length ? this.options.patterns.hasOwnProperty(pattern) ? this.options.patterns[pattern].test(inputText) : pattern && pattern !== $el.attr("type") ? new RegExp(pattern).test(inputText) : true : true;
    };
    Abide.prototype.validateRadio = function(groupName) {
        var $group = this.$element.find(':radio[name="' + groupName + '"]'), counter = [], _this = this;
        $group.each(function() {
            var rdio = $(this), clear = _this.requiredCheck(rdio);
            counter.push(clear);
            if (clear) _this.removeErrorClasses(rdio);
        });
        return counter.indexOf(false) === -1;
    };
    Abide.prototype.matchValidation = function($el, validators, required) {
        var _this = this;
        required = required ? true : false;
        var clear = validators.split(" ").map(function(v) {
            return _this.options.validators[v]($el, required, $el.parent());
        });
        return clear.indexOf(false) === -1;
    };
    Abide.prototype.resetForm = function() {
        var $form = this.$element, opts = this.options;
        $("." + opts.labelErrorClass, $form).not("small").removeClass(opts.labelErrorClass);
        $("." + opts.inputErrorClass, $form).not("small").removeClass(opts.inputErrorClass);
        $(opts.formErrorSelector + "." + opts.formErrorClass).removeClass(opts.formErrorClass);
        $form.find("[data-abide-error]").css("display", "none");
        $(":input", $form).not(":button, :submit, :reset, :hidden, [data-abide-ignore]").val("").removeAttr("data-invalid");
        $form.trigger("formreset.zf.abide", [ $form ]);
    };
    Abide.prototype.destroy = function() {
        var _this = this;
        this.$element.off(".abide").find("[data-abide-error]").css("display", "none");
        this.$inputs.off(".abide").each(function() {
            _this.removeErrorClasses($(this));
        });
        Foundation.unregisterPlugin(this);
    };
    Foundation.plugin(Abide, "Abide");
    if (typeof module !== "undefined" && typeof module.exports !== "undefined") module.exports = Abide;
    if (typeof define === "function") define([ "foundation" ], function() {
        return Abide;
    });
}(Foundation, jQuery);

!function($, Foundation) {
    "use strict";
    function Accordion(element, options) {
        this.$element = element;
        this.options = $.extend({}, Accordion.defaults, this.$element.data(), options);
        this._init();
        Foundation.registerPlugin(this, "Accordion");
        Foundation.Keyboard.register("Accordion", {
            ENTER: "toggle",
            SPACE: "toggle",
            ARROW_DOWN: "next",
            ARROW_UP: "previous"
        });
    }
    Accordion.defaults = {
        slideSpeed: 250,
        multiExpand: false,
        allowAllClosed: false
    };
    Accordion.prototype._init = function() {
        this.$element.attr("role", "tablist");
        this.$tabs = this.$element.children("li");
        if (this.$tabs.length == 0) {
            this.$tabs = this.$element.children("[data-accordion-item]");
        }
        this.$tabs.each(function(idx, el) {
            var $el = $(el), $content = $el.find("[data-tab-content]"), id = $content[0].id || Foundation.GetYoDigits(6, "accordion"), linkId = el.id || id + "-label";
            $el.find("a:first").attr({
                "aria-controls": id,
                role: "tab",
                id: linkId,
                "aria-expanded": false,
                "aria-selected": false
            });
            $content.attr({
                role: "tabpanel",
                "aria-labelledby": linkId,
                "aria-hidden": true,
                id: id
            });
        });
        var $initActive = this.$element.find(".is-active").children("[data-tab-content]");
        if ($initActive.length) {
            this.down($initActive, true);
        }
        this._events();
    };
    Accordion.prototype._events = function() {
        var _this = this;
        this.$tabs.each(function() {
            var $elem = $(this);
            var $tabContent = $elem.children("[data-tab-content]");
            if ($tabContent.length) {
                $elem.children("a").off("click.zf.accordion keydown.zf.accordion").on("click.zf.accordion", function(e) {
                    e.preventDefault();
                    if ($elem.hasClass("is-active")) {
                        if (_this.options.allowAllClosed || $elem.siblings().hasClass("is-active")) {
                            _this.up($tabContent);
                        }
                    } else {
                        _this.down($tabContent);
                    }
                }).on("keydown.zf.accordion", function(e) {
                    Foundation.Keyboard.handleKey(e, "Accordion", {
                        toggle: function() {
                            _this.toggle($tabContent);
                        },
                        next: function() {
                            $elem.next().find("a").focus().trigger("click.zf.accordion");
                        },
                        previous: function() {
                            $elem.prev().find("a").focus().trigger("click.zf.accordion");
                        },
                        handled: function() {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    });
                });
            }
        });
    };
    Accordion.prototype.toggle = function($target) {
        if ($target.parent().hasClass("is-active")) {
            if (this.options.allowAllClosed || $target.parent().siblings().hasClass("is-active")) {
                this.up($target);
            } else {
                return;
            }
        } else {
            this.down($target);
        }
    };
    Accordion.prototype.down = function($target, firstTime) {
        var _this = this;
        if (!this.options.multiExpand && !firstTime) {
            var $currentActive = this.$element.find(".is-active").children("[data-tab-content]");
            if ($currentActive.length) {
                this.up($currentActive);
            }
        }
        $target.attr("aria-hidden", false).parent("[data-tab-content]").addBack().parent().addClass("is-active");
        $target.slideDown(_this.options.slideSpeed);
        $("#" + $target.attr("aria-labelledby")).attr({
            "aria-expanded": true,
            "aria-selected": true
        });
        this.$element.trigger("down.zf.accordion", [ $target ]);
    };
    Accordion.prototype.up = function($target) {
        var $aunts = $target.parent().siblings(), _this = this;
        var canClose = this.options.multiExpand ? $aunts.hasClass("is-active") : $target.parent().hasClass("is-active");
        if (!this.options.allowAllClosed && !canClose) {
            return;
        }
        $target.slideUp(_this.options.slideSpeed);
        $target.attr("aria-hidden", true).parent().removeClass("is-active");
        $("#" + $target.attr("aria-labelledby")).attr({
            "aria-expanded": false,
            "aria-selected": false
        });
        this.$element.trigger("up.zf.accordion", [ $target ]);
    };
    Accordion.prototype.destroy = function() {
        this.$element.find("[data-tab-content]").slideUp(0).css("display", "");
        this.$element.find("a").off(".zf.accordion");
        Foundation.unregisterPlugin(this);
    };
    Foundation.plugin(Accordion, "Accordion");
}(jQuery, window.Foundation);

!function($) {
    "use strict";
    function AccordionMenu(element, options) {
        this.$element = element;
        this.options = $.extend({}, AccordionMenu.defaults, this.$element.data(), options);
        Foundation.Nest.Feather(this.$element, "accordion");
        this._init();
        Foundation.registerPlugin(this, "AccordionMenu");
        Foundation.Keyboard.register("AccordionMenu", {
            ENTER: "toggle",
            SPACE: "toggle",
            ARROW_RIGHT: "open",
            ARROW_UP: "up",
            ARROW_DOWN: "down",
            ARROW_LEFT: "close",
            ESCAPE: "closeAll",
            TAB: "down",
            SHIFT_TAB: "up"
        });
    }
    AccordionMenu.defaults = {
        slideSpeed: 250,
        multiOpen: true
    };
    AccordionMenu.prototype._init = function() {
        this.$element.find("[data-submenu]").not(".is-active").slideUp(0);
        this.$element.attr({
            role: "tablist",
            "aria-multiselectable": this.options.multiOpen
        });
        this.$menuLinks = this.$element.find(".has-submenu");
        this.$menuLinks.each(function() {
            var linkId = this.id || Foundation.GetYoDigits(6, "acc-menu-link"), $elem = $(this), $sub = $elem.children("[data-submenu]"), subId = $sub[0].id || Foundation.GetYoDigits(6, "acc-menu"), isActive = $sub.hasClass("is-active");
            $elem.attr({
                "aria-controls": subId,
                "aria-expanded": isActive,
                "aria-selected": false,
                role: "tab",
                id: linkId
            });
            $sub.attr({
                "aria-labelledby": linkId,
                "aria-hidden": !isActive,
                role: "tabpanel",
                id: subId
            });
        });
        var initPanes = this.$element.find(".is-active");
        if (initPanes.length) {
            var _this = this;
            initPanes.each(function() {
                _this.down($(this));
            });
        }
        this._events();
    };
    AccordionMenu.prototype._events = function() {
        var _this = this;
        this.$element.find("li").each(function() {
            var $submenu = $(this).children("[data-submenu]");
            if ($submenu.length) {
                $(this).children("a").off("click.zf.accordionmenu").on("click.zf.accordionmenu", function(e) {
                    e.preventDefault();
                    _this.toggle($submenu);
                });
            }
        }).on("keydown.zf.accordionmenu", function(e) {
            var $element = $(this), $elements = $element.parent("ul").children("li"), $prevElement, $nextElement, $target = $element.children("[data-submenu]");
            $elements.each(function(i) {
                if ($(this).is($element)) {
                    $prevElement = $elements.eq(Math.max(0, i - 1));
                    $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1));
                    if ($(this).children("[data-submenu]:visible").length) {
                        $nextElement = $element.find("li:first-child");
                    }
                    if ($(this).is(":first-child")) {
                        $prevElement = $element.parents("li").first();
                    } else if ($prevElement.children("[data-submenu]:visible").length) {
                        $prevElement = $prevElement.find("li:last-child");
                    }
                    if ($(this).is(":last-child")) {
                        $nextElement = $element.parents("li").first().next("li");
                    }
                    return;
                }
            });
            Foundation.Keyboard.handleKey(e, "AccordionMenu", {
                open: function() {
                    if ($target.is(":hidden")) {
                        _this.down($target);
                        $target.find("li").first().focus();
                    }
                },
                close: function() {
                    if ($target.length && !$target.is(":hidden")) {
                        _this.up($target);
                    } else if ($element.parent("[data-submenu]").length) {
                        _this.up($element.parent("[data-submenu]"));
                        $element.parents("li").first().focus();
                    }
                },
                up: function() {
                    $prevElement.focus();
                },
                down: function() {
                    $nextElement.focus();
                },
                toggle: function() {
                    if ($element.children("[data-submenu]").length) {
                        _this.toggle($element.children("[data-submenu]"));
                    }
                },
                closeAll: function() {
                    _this.hideAll();
                },
                handled: function() {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            });
        });
    };
    AccordionMenu.prototype.hideAll = function() {
        this.$element.find("[data-submenu]").slideUp(this.options.slideSpeed);
    };
    AccordionMenu.prototype.toggle = function($target) {
        if (!$target.is(":animated")) {
            if (!$target.is(":hidden")) {
                this.up($target);
            } else {
                this.down($target);
            }
        }
    };
    AccordionMenu.prototype.down = function($target) {
        var _this = this;
        if (!this.options.multiOpen) {
            this.up(this.$element.find(".is-active").not($target.parentsUntil(this.$element).add($target)));
        }
        $target.addClass("is-active").attr({
            "aria-hidden": false
        }).parent(".has-submenu").attr({
            "aria-expanded": true,
            "aria-selected": true
        });
        Foundation.Move(this.options.slideSpeed, $target, function() {
            $target.slideDown(_this.options.slideSpeed);
        });
        this.$element.trigger("down.zf.accordionMenu", [ $target ]);
    };
    AccordionMenu.prototype.up = function($target) {
        var _this = this;
        Foundation.Move(this.options.slideSpeed, $target, function() {
            $target.slideUp(_this.options.slideSpeed);
        });
        $target.attr("aria-hidden", true).find("[data-submenu]").slideUp(0).attr("aria-hidden", true).end().parent(".has-submenu").attr({
            "aria-expanded": false,
            "aria-selected": false
        });
        this.$element.trigger("up.zf.accordionMenu", [ $target ]);
    };
    AccordionMenu.prototype.destroy = function() {
        this.$element.find("[data-submenu]").slideDown(0).css("display", "");
        this.$element.find("a").off("click.zf.accordionMenu");
        Foundation.Nest.Burn(this.$element, "accordion");
        Foundation.unregisterPlugin(this);
    };
    Foundation.plugin(AccordionMenu, "AccordionMenu");
}(jQuery, window.Foundation);

!function($, Foundation) {
    "use strict";
    function Drilldown(element, options) {
        this.$element = element;
        this.options = $.extend({}, Drilldown.defaults, this.$element.data(), options);
        Foundation.Nest.Feather(this.$element, "drilldown");
        this._init();
        Foundation.registerPlugin(this, "Drilldown");
        Foundation.Keyboard.register("Drilldown", {
            ENTER: "open",
            SPACE: "open",
            ARROW_RIGHT: "next",
            ARROW_UP: "up",
            ARROW_DOWN: "down",
            ARROW_LEFT: "previous",
            ESCAPE: "close",
            TAB: "down",
            SHIFT_TAB: "up"
        });
    }
    Drilldown.defaults = {
        backButton: '<li class="js-drilldown-back"><a>Back</a></li>',
        wrapper: "<div></div>",
        closeOnClick: false
    };
    Drilldown.prototype._init = function() {
        this.$submenuAnchors = this.$element.find("li.has-submenu");
        this.$submenus = this.$submenuAnchors.children("[data-submenu]");
        this.$menuItems = this.$element.find("li").not(".js-drilldown-back").attr("role", "menuitem");
        this._prepareMenu();
        this._keyboardEvents();
    };
    Drilldown.prototype._prepareMenu = function() {
        var _this = this;
        this.$submenuAnchors.each(function() {
            var $sub = $(this);
            var $link = $sub.find("a:first");
            $link.data("savedHref", $link.attr("href")).removeAttr("href");
            $sub.children("[data-submenu]").attr({
                "aria-hidden": true,
                tabindex: 0,
                role: "menu"
            });
            _this._events($sub);
        });
        this.$submenus.each(function() {
            var $menu = $(this), $back = $menu.find(".js-drilldown-back");
            if (!$back.length) {
                $menu.prepend(_this.options.backButton);
            }
            _this._back($menu);
        });
        if (!this.$element.parent().hasClass("is-drilldown")) {
            this.$wrapper = $(this.options.wrapper).addClass("is-drilldown").css(this._getMaxDims());
            this.$element.wrap(this.$wrapper);
        }
    };
    Drilldown.prototype._events = function($elem) {
        var _this = this;
        $elem.off("click.zf.drilldown").on("click.zf.drilldown", function(e) {
            if ($(e.target).parentsUntil("ul", "li").hasClass("is-drilldown-submenu-parent")) {
                e.stopImmediatePropagation();
                e.preventDefault();
            }
            _this._show($elem);
            if (_this.options.closeOnClick) {
                var $body = $("body").not(_this.$wrapper);
                $body.off(".zf.drilldown").on("click.zf.drilldown", function(e) {
                    e.preventDefault();
                    _this._hideAll();
                    $body.off(".zf.drilldown");
                });
            }
        });
    };
    Drilldown.prototype._keyboardEvents = function() {
        var _this = this;
        this.$menuItems.add(this.$element.find(".js-drilldown-back")).on("keydown.zf.drilldown", function(e) {
            var $element = $(this), $elements = $element.parent("ul").children("li"), $prevElement, $nextElement;
            $elements.each(function(i) {
                if ($(this).is($element)) {
                    $prevElement = $elements.eq(Math.max(0, i - 1));
                    $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1));
                    return;
                }
            });
            Foundation.Keyboard.handleKey(e, "Drilldown", {
                next: function() {
                    if ($element.is(_this.$submenuAnchors)) {
                        _this._show($element);
                        $element.on(Foundation.transitionend($element), function() {
                            $element.find("ul li").filter(_this.$menuItems).first().focus();
                        });
                    }
                },
                previous: function() {
                    _this._hide($element.parent("ul"));
                    $element.parent("ul").on(Foundation.transitionend($element), function() {
                        setTimeout(function() {
                            $element.parent("ul").parent("li").focus();
                        }, 1);
                    });
                },
                up: function() {
                    $prevElement.focus();
                },
                down: function() {
                    $nextElement.focus();
                },
                close: function() {
                    _this._back();
                },
                open: function() {
                    if (!$element.is(_this.$menuItems)) {
                        _this._hide($element.parent("ul"));
                        setTimeout(function() {
                            $element.parent("ul").parent("li").focus();
                        }, 1);
                    } else if ($element.is(_this.$submenuAnchors)) {
                        _this._show($element);
                        setTimeout(function() {
                            $element.find("ul li").filter(_this.$menuItems).first().focus();
                        }, 1);
                    }
                },
                handled: function() {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            });
        });
    };
    Drilldown.prototype._hideAll = function() {
        var $elem = this.$element.find(".is-drilldown-sub.is-active").addClass("is-closing");
        $elem.one(Foundation.transitionend($elem), function(e) {
            $elem.removeClass("is-active is-closing");
        });
        this.$element.trigger("closed.zf.drilldown");
    };
    Drilldown.prototype._back = function($elem) {
        var _this = this;
        $elem.off("click.zf.drilldown");
        $elem.children(".js-drilldown-back").on("click.zf.drilldown", function(e) {
            e.stopImmediatePropagation();
            _this._hide($elem);
        });
    };
    Drilldown.prototype._menuLinkEvents = function() {
        var _this = this;
        this.$menuItems.not(".has-submenu").off("click.zf.drilldown").on("click.zf.drilldown", function(e) {
            setTimeout(function() {
                _this._hideAll();
            }, 0);
        });
    };
    Drilldown.prototype._show = function($elem) {
        $elem.children("[data-submenu]").addClass("is-active");
        this.$element.trigger("open.zf.drilldown", [ $elem ]);
    };
    Drilldown.prototype._hide = function($elem) {
        var _this = this;
        $elem.addClass("is-closing").one(Foundation.transitionend($elem), function() {
            $elem.removeClass("is-active is-closing");
        });
        $elem.trigger("hide.zf.drilldown", [ $elem ]);
    };
    Drilldown.prototype._getMaxDims = function() {
        var max = 0, result = {};
        this.$submenus.add(this.$element).each(function() {
            var numOfElems = $(this).children("li").length;
            max = numOfElems > max ? numOfElems : max;
        });
        result.height = max * this.$menuItems[0].getBoundingClientRect().height + "px";
        result.width = this.$element[0].getBoundingClientRect().width + "px";
        return result;
    };
    Drilldown.prototype.destroy = function() {
        this._hideAll();
        Foundation.Nest.Burn(this.$element, "drilldown");
        this.$element.unwrap().find(".js-drilldown-back").remove().end().find(".is-active, .is-closing, .is-drilldown-sub").removeClass("is-active is-closing is-drilldown-sub").end().find("[data-submenu]").removeAttr("aria-hidden tabindex role").off(".zf.drilldown").end().off("zf.drilldown");
        this.$element.find("a").each(function() {
            var $link = $(this);
            if ($link.data("savedHref")) {
                $link.attr("href", $link.data("savedHref")).removeData("savedHref");
            } else {
                return;
            }
        });
        Foundation.unregisterPlugin(this);
    };
    Foundation.plugin(Drilldown, "Drilldown");
}(jQuery, window.Foundation);

!function($, Foundation) {
    "use strict";
    function Dropdown(element, options) {
        this.$element = element;
        this.options = $.extend({}, Dropdown.defaults, this.$element.data(), options);
        this._init();
        Foundation.registerPlugin(this, "Dropdown");
        Foundation.Keyboard.register("Dropdown", {
            ENTER: "open",
            SPACE: "open",
            ESCAPE: "close",
            TAB: "tab_forward",
            SHIFT_TAB: "tab_backward"
        });
    }
    Dropdown.defaults = {
        hoverDelay: 250,
        hover: false,
        hoverPane: false,
        vOffset: 1,
        hOffset: 1,
        positionClass: "",
        trapFocus: false,
        autoFocus: false,
        closeOnClick: false
    };
    Dropdown.prototype._init = function() {
        var $id = this.$element.attr("id");
        this.$anchor = $('[data-toggle="' + $id + '"]') || $('[data-open="' + $id + '"]');
        this.$anchor.attr({
            "aria-controls": $id,
            "data-is-focus": false,
            "data-yeti-box": $id,
            "aria-haspopup": true,
            "aria-expanded": false
        });
        this.options.positionClass = this.getPositionClass();
        this.counter = 4;
        this.usedPositions = [];
        this.$element.attr({
            "aria-hidden": "true",
            "data-yeti-box": $id,
            "data-resize": $id,
            "aria-labelledby": this.$anchor[0].id || Foundation.GetYoDigits(6, "dd-anchor")
        });
        this._events();
    };
    Dropdown.prototype.getPositionClass = function() {
        var position = this.$element[0].className.match(/(top|left|right)/g);
        position = position ? position[0] : "";
        return position;
    };
    Dropdown.prototype._reposition = function(position) {
        this.usedPositions.push(position ? position : "bottom");
        if (!position && this.usedPositions.indexOf("top") < 0) {
            this.$element.addClass("top");
        } else if (position === "top" && this.usedPositions.indexOf("bottom") < 0) {
            this.$element.removeClass(position);
        } else if (position === "left" && this.usedPositions.indexOf("right") < 0) {
            this.$element.removeClass(position).addClass("right");
        } else if (position === "right" && this.usedPositions.indexOf("left") < 0) {
            this.$element.removeClass(position).addClass("left");
        } else if (!position && this.usedPositions.indexOf("top") > -1 && this.usedPositions.indexOf("left") < 0) {
            this.$element.addClass("left");
        } else if (position === "top" && this.usedPositions.indexOf("bottom") > -1 && this.usedPositions.indexOf("left") < 0) {
            this.$element.removeClass(position).addClass("left");
        } else if (position === "left" && this.usedPositions.indexOf("right") > -1 && this.usedPositions.indexOf("bottom") < 0) {
            this.$element.removeClass(position);
        } else if (position === "right" && this.usedPositions.indexOf("left") > -1 && this.usedPositions.indexOf("bottom") < 0) {
            this.$element.removeClass(position);
        } else {
            this.$element.removeClass(position);
        }
        this.classChanged = true;
        this.counter--;
    };
    Dropdown.prototype._setPosition = function() {
        if (this.$anchor.attr("aria-expanded") === "false") {
            return false;
        }
        var position = this.getPositionClass(), $eleDims = Foundation.Box.GetDimensions(this.$element), $anchorDims = Foundation.Box.GetDimensions(this.$anchor), _this = this, direction = position === "left" ? "left" : position === "right" ? "left" : "top", param = direction === "top" ? "height" : "width", offset = param === "height" ? this.options.vOffset : this.options.hOffset;
        if ($eleDims.width >= $eleDims.windowDims.width || !this.counter && !Foundation.Box.ImNotTouchingYou(this.$element)) {
            this.$element.offset(Foundation.Box.GetOffsets(this.$element, this.$anchor, "center bottom", this.options.vOffset, this.options.hOffset, true)).css({
                width: $eleDims.windowDims.width - this.options.hOffset * 2,
                height: "auto"
            });
            this.classChanged = true;
            return false;
        }
        this.$element.offset(Foundation.Box.GetOffsets(this.$element, this.$anchor, position, this.options.vOffset, this.options.hOffset));
        while (!Foundation.Box.ImNotTouchingYou(this.$element) && this.counter) {
            this._reposition(position);
            this._setPosition();
        }
    };
    Dropdown.prototype._events = function() {
        var _this = this;
        this.$element.on({
            "open.zf.trigger": this.open.bind(this),
            "close.zf.trigger": this.close.bind(this),
            "toggle.zf.trigger": this.toggle.bind(this),
            "resizeme.zf.trigger": this._setPosition.bind(this)
        });
        if (this.options.hover) {
            this.$anchor.off("mouseenter.zf.dropdown mouseleave.zf.dropdown").on("mouseenter.zf.dropdown", function() {
                clearTimeout(_this.timeout);
                _this.timeout = setTimeout(function() {
                    _this.open();
                    _this.$anchor.data("hover", true);
                }, _this.options.hoverDelay);
            }).on("mouseleave.zf.dropdown", function() {
                clearTimeout(_this.timeout);
                _this.timeout = setTimeout(function() {
                    _this.close();
                    _this.$anchor.data("hover", false);
                }, _this.options.hoverDelay);
            });
            if (this.options.hoverPane) {
                this.$element.off("mouseenter.zf.dropdown mouseleave.zf.dropdown").on("mouseenter.zf.dropdown", function() {
                    clearTimeout(_this.timeout);
                }).on("mouseleave.zf.dropdown", function() {
                    clearTimeout(_this.timeout);
                    _this.timeout = setTimeout(function() {
                        _this.close();
                        _this.$anchor.data("hover", false);
                    }, _this.options.hoverDelay);
                });
            }
        }
        this.$anchor.add(this.$element).on("keydown.zf.dropdown", function(e) {
            var $target = $(this), visibleFocusableElements = Foundation.Keyboard.findFocusable(_this.$element);
            Foundation.Keyboard.handleKey(e, "Dropdown", {
                tab_forward: function() {
                    if (_this.$element.find(":focus").is(visibleFocusableElements.eq(-1))) {
                        if (_this.options.trapFocus) {
                            visibleFocusableElements.eq(0).focus();
                            e.preventDefault();
                        } else {
                            _this.close();
                        }
                    }
                },
                tab_backward: function() {
                    if (_this.$element.find(":focus").is(visibleFocusableElements.eq(0)) || _this.$element.is(":focus")) {
                        if (_this.options.trapFocus) {
                            visibleFocusableElements.eq(-1).focus();
                            e.preventDefault();
                        } else {
                            _this.close();
                        }
                    }
                },
                open: function() {
                    if ($target.is(_this.$anchor)) {
                        _this.open();
                        _this.$element.attr("tabindex", -1).focus();
                        e.preventDefault();
                    }
                },
                close: function() {
                    _this.close();
                    _this.$anchor.focus();
                }
            });
        });
    };
    Dropdown.prototype._addBodyHandler = function() {
        var $body = $(document.body).not(this.$element), _this = this;
        $body.off("click.zf.dropdown").on("click.zf.dropdown", function(e) {
            if (_this.$anchor.is(e.target) || _this.$anchor.find(e.target).length) {
                return;
            }
            if (_this.$element.find(e.target).length) {
                return;
            }
            _this.close();
            $body.off("click.zf.dropdown");
        });
    };
    Dropdown.prototype.open = function() {
        this.$element.trigger("closeme.zf.dropdown", this.$element.attr("id"));
        this.$anchor.addClass("hover").attr({
            "aria-expanded": true
        });
        this._setPosition();
        this.$element.addClass("is-open").attr({
            "aria-hidden": false
        });
        if (this.options.autoFocus) {
            var $focusable = Foundation.Keyboard.findFocusable(this.$element);
            if ($focusable.length) {
                $focusable.eq(0).focus();
            }
        }
        if (this.options.closeOnClick) {
            this._addBodyHandler();
        }
        this.$element.trigger("show.zf.dropdown", [ this.$element ]);
    };
    Dropdown.prototype.close = function() {
        if (!this.$element.hasClass("is-open")) {
            return false;
        }
        this.$element.removeClass("is-open").attr({
            "aria-hidden": true
        });
        this.$anchor.removeClass("hover").attr("aria-expanded", false);
        if (this.classChanged) {
            var curPositionClass = this.getPositionClass();
            if (curPositionClass) {
                this.$element.removeClass(curPositionClass);
            }
            this.$element.addClass(this.options.positionClass).css({
                height: "",
                width: ""
            });
            this.classChanged = false;
            this.counter = 4;
            this.usedPositions.length = 0;
        }
        this.$element.trigger("hide.zf.dropdown", [ this.$element ]);
    };
    Dropdown.prototype.toggle = function() {
        if (this.$element.hasClass("is-open")) {
            if (this.$anchor.data("hover")) return;
            this.close();
        } else {
            this.open();
        }
    };
    Dropdown.prototype.destroy = function() {
        this.$element.off(".zf.trigger").hide();
        this.$anchor.off(".zf.dropdown");
        Foundation.unregisterPlugin(this);
    };
    Foundation.plugin(Dropdown, "Dropdown");
}(jQuery, window.Foundation);

!function($, Foundation) {
    "use strict";
    function DropdownMenu(element, options) {
        this.$element = element;
        this.options = $.extend({}, DropdownMenu.defaults, this.$element.data(), options);
        Foundation.Nest.Feather(this.$element, "dropdown");
        this._init();
        Foundation.registerPlugin(this, "DropdownMenu");
        Foundation.Keyboard.register("DropdownMenu", {
            ENTER: "open",
            SPACE: "open",
            ARROW_RIGHT: "next",
            ARROW_UP: "up",
            ARROW_DOWN: "down",
            ARROW_LEFT: "previous",
            ESCAPE: "close"
        });
    }
    DropdownMenu.defaults = {
        disableHover: false,
        autoclose: true,
        hoverDelay: 50,
        clickOpen: false,
        closingTime: 500,
        alignment: "left",
        closeOnClick: true,
        verticalClass: "vertical",
        rightClass: "align-right",
        forceFollow: true
    };
    DropdownMenu.prototype._init = function() {
        var subs = this.$element.find("li.is-dropdown-submenu-parent");
        this.$element.children(".is-dropdown-submenu-parent").children(".is-dropdown-submenu").addClass("first-sub");
        this.$menuItems = this.$element.find('[role="menuitem"]');
        this.$tabs = this.$element.children('[role="menuitem"]');
        this.isVert = this.$element.hasClass(this.options.verticalClass);
        this.$tabs.find("ul.is-dropdown-submenu").addClass(this.options.verticalClass);
        if (this.$element.hasClass(this.options.rightClass) || this.options.alignment === "right") {
            this.options.alignment = "right";
            subs.addClass("is-left-arrow opens-left");
        } else {
            subs.addClass("is-right-arrow opens-right");
        }
        if (!this.isVert) {
            this.$tabs.filter(".is-dropdown-submenu-parent").removeClass("is-right-arrow is-left-arrow opens-right opens-left").addClass("is-down-arrow");
        }
        this.changed = false;
        this._events();
    };
    DropdownMenu.prototype._events = function() {
        var _this = this, hasTouch = "ontouchstart" in window || typeof window.ontouchstart !== "undefined", parClass = "is-dropdown-submenu-parent", delay;
        if (this.options.clickOpen || hasTouch) {
            this.$menuItems.on("click.zf.dropdownmenu touchstart.zf.dropdownmenu", function(e) {
                var $elem = $(e.target).parentsUntil("ul", "." + parClass), hasSub = $elem.hasClass(parClass), hasClicked = $elem.attr("data-is-click") === "true", $sub = $elem.children(".is-dropdown-submenu");
                if (hasSub) {
                    if (hasClicked) {
                        if (!_this.options.closeOnClick || !_this.options.clickOpen && !hasTouch || _this.options.forceFollow && hasTouch) {
                            return;
                        } else {
                            e.stopImmediatePropagation();
                            e.preventDefault();
                            _this._hide($elem);
                        }
                    } else {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        _this._show($elem.children(".is-dropdown-submenu"));
                        $elem.add($elem.parentsUntil(_this.$element, "." + parClass)).attr("data-is-click", true);
                    }
                } else {
                    return;
                }
            });
        }
        if (!this.options.disableHover) {
            this.$menuItems.on("mouseenter.zf.dropdownmenu", function(e) {
                e.stopImmediatePropagation();
                var $elem = $(this), hasSub = $elem.hasClass(parClass);
                if (hasSub) {
                    clearTimeout(delay);
                    delay = setTimeout(function() {
                        _this._show($elem.children(".is-dropdown-submenu"));
                    }, _this.options.hoverDelay);
                }
            }).on("mouseleave.zf.dropdownmenu", function(e) {
                var $elem = $(this), hasSub = $elem.hasClass(parClass);
                if (hasSub && _this.options.autoclose) {
                    if ($elem.attr("data-is-click") === "true" && _this.options.clickOpen) {
                        return false;
                    }
                    delay = setTimeout(function() {
                        _this._hide($elem);
                    }, _this.options.closingTime);
                }
            });
        }
        this.$menuItems.on("keydown.zf.dropdownmenu", function(e) {
            var $element = $(e.target).parentsUntil("ul", '[role="menuitem"]'), isTab = _this.$tabs.index($element) > -1, $elements = isTab ? _this.$tabs : $element.siblings("li").add($element), $prevElement, $nextElement;
            $elements.each(function(i) {
                if ($(this).is($element)) {
                    $prevElement = $elements.eq(i - 1);
                    $nextElement = $elements.eq(i + 1);
                    return;
                }
            });
            var nextSibling = function() {
                if (!$element.is(":last-child")) $nextElement.children("a:first").focus();
            }, prevSibling = function() {
                $prevElement.children("a:first").focus();
            }, openSub = function() {
                var $sub = $element.children("ul.is-dropdown-submenu");
                if ($sub.length) {
                    _this._show($sub);
                    $element.find("li > a:first").focus();
                } else {
                    return;
                }
            }, closeSub = function() {
                var close = $element.parent("ul").parent("li");
                close.children("a:first").focus();
                _this._hide(close);
            };
            var functions = {
                open: openSub,
                close: function() {
                    _this._hide(_this.$element);
                    _this.$menuItems.find("a:first").focus();
                },
                handled: function() {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            };
            if (isTab) {
                if (_this.vertical) {
                    if (_this.options.alignment === "left") {
                        $.extend(functions, {
                            down: nextSibling,
                            up: prevSibling,
                            next: openSub,
                            previous: closeSub
                        });
                    } else {
                        $.extend(functions, {
                            down: nextSibling,
                            up: prevSibling,
                            next: closeSub,
                            previous: openSub
                        });
                    }
                } else {
                    $.extend(functions, {
                        next: nextSibling,
                        previous: prevSibling,
                        down: openSub,
                        up: closeSub
                    });
                }
            } else {
                if (_this.options.alignment === "left") {
                    $.extend(functions, {
                        next: openSub,
                        previous: closeSub,
                        down: nextSibling,
                        up: prevSibling
                    });
                } else {
                    $.extend(functions, {
                        next: closeSub,
                        previous: openSub,
                        down: nextSibling,
                        up: prevSibling
                    });
                }
            }
            Foundation.Keyboard.handleKey(e, "DropdownMenu", functions);
        });
    };
    DropdownMenu.prototype._addBodyHandler = function() {
        var $body = $(document.body), _this = this;
        $body.off("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu").on("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu", function(e) {
            var $link = _this.$element.find(e.target);
            if ($link.length) {
                return;
            }
            _this._hide();
            $body.off("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu");
        });
    };
    DropdownMenu.prototype._show = function($sub) {
        var idx = this.$tabs.index(this.$tabs.filter(function(i, el) {
            return $(el).find($sub).length > 0;
        }));
        var $sibs = $sub.parent("li.is-dropdown-submenu-parent").siblings("li.is-dropdown-submenu-parent");
        this._hide($sibs, idx);
        $sub.css("visibility", "hidden").addClass("js-dropdown-active").attr({
            "aria-hidden": false
        }).parent("li.is-dropdown-submenu-parent").addClass("is-active").attr({
            "aria-selected": true,
            "aria-expanded": true
        });
        var clear = Foundation.Box.ImNotTouchingYou($sub, null, true);
        if (!clear) {
            var oldClass = this.options.alignment === "left" ? "-right" : "-left", $parentLi = $sub.parent(".is-dropdown-submenu-parent");
            $parentLi.removeClass("opens" + oldClass).addClass("opens-" + this.options.alignment);
            clear = Foundation.Box.ImNotTouchingYou($sub, null, true);
            if (!clear) {
                $parentLi.removeClass("opens-" + this.options.alignment).addClass("opens-inner");
            }
            this.changed = true;
        }
        $sub.css("visibility", "");
        if (this.options.closeOnClick) {
            this._addBodyHandler();
        }
        this.$element.trigger("show.zf.dropdownmenu", [ $sub ]);
    };
    DropdownMenu.prototype._hide = function($elem, idx) {
        var $toClose;
        if ($elem && $elem.length) {
            $toClose = $elem;
        } else if (idx !== undefined) {
            $toClose = this.$tabs.not(function(i, el) {
                return i === idx;
            });
        } else {
            $toClose = this.$element;
        }
        var somethingToClose = $toClose.hasClass("is-active") || $toClose.find(".is-active").length > 0;
        if (somethingToClose) {
            $toClose.find("li.is-active").add($toClose).attr({
                "aria-selected": false,
                "aria-expanded": false,
                "data-is-click": false
            }).removeClass("is-active");
            $toClose.find("ul.js-dropdown-active").attr({
                "aria-hidden": true
            }).removeClass("js-dropdown-active");
            if (this.changed || $toClose.find("opens-inner").length) {
                var oldClass = this.options.alignment === "left" ? "right" : "left";
                $toClose.find("li.is-dropdown-submenu-parent").add($toClose).removeClass("opens-inner opens-" + this.options.alignment).addClass("opens-" + oldClass);
                this.changed = false;
            }
            this.$element.trigger("hide.zf.dropdownmenu", [ $toClose ]);
        }
    };
    DropdownMenu.prototype.destroy = function() {
        this.$menuItems.off(".zf.dropdownmenu").removeAttr("data-is-click").removeClass("is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner");
        Foundation.Nest.Burn(this.$element, "dropdown");
        Foundation.unregisterPlugin(this);
    };
    Foundation.plugin(DropdownMenu, "DropdownMenu");
}(jQuery, window.Foundation);

!function(Foundation, $) {
    "use strict";
    function Equalizer(element, options) {
        this.$element = element;
        this.options = $.extend({}, Equalizer.defaults, this.$element.data(), options);
        this._init();
        Foundation.registerPlugin(this, "Equalizer");
    }
    Equalizer.defaults = {
        equalizeOnStack: true,
        equalizeByRow: false,
        equalizeOn: ""
    };
    Equalizer.prototype._init = function() {
        var eqId = this.$element.attr("data-equalizer") || "";
        var $watched = this.$element.find('[data-equalizer-watch="' + eqId + '"]');
        this.$watched = $watched.length ? $watched : this.$element.find("[data-equalizer-watch]");
        this.$element.attr("data-resize", eqId || Foundation.GetYoDigits(6, "eq"));
        this.hasNested = this.$element.find("[data-equalizer]").length > 0;
        this.isNested = this.$element.parentsUntil(document.body, "[data-equalizer]").length > 0;
        this.isOn = false;
        var imgs = this.$element.find("img");
        var tooSmall;
        if (this.options.equalizeOn) {
            tooSmall = this._checkMQ();
            $(window).on("changed.zf.mediaquery", this._checkMQ.bind(this));
        } else {
            this._events();
        }
        if (tooSmall !== undefined && tooSmall === false || tooSmall === undefined) {
            if (imgs.length) {
                Foundation.onImagesLoaded(imgs, this._reflow.bind(this));
            } else {
                this._reflow();
            }
        }
    };
    Equalizer.prototype._pauseEvents = function() {
        this.isOn = false;
        this.$element.off(".zf.equalizer resizeme.zf.trigger");
    };
    Equalizer.prototype._events = function() {
        var _this = this;
        this._pauseEvents();
        if (this.hasNested) {
            this.$element.on("postequalized.zf.equalizer", function(e) {
                if (e.target !== _this.$element[0]) {
                    _this._reflow();
                }
            });
        } else {
            this.$element.on("resizeme.zf.trigger", this._reflow.bind(this));
        }
        this.isOn = true;
    };
    Equalizer.prototype._checkMQ = function() {
        var tooSmall = !Foundation.MediaQuery.atLeast(this.options.equalizeOn);
        if (tooSmall) {
            if (this.isOn) {
                this._pauseEvents();
                this.$watched.css("height", "auto");
            }
        } else {
            if (!this.isOn) {
                this._events();
            }
        }
        return tooSmall;
    };
    Equalizer.prototype._killswitch = function() {
        return;
    };
    Equalizer.prototype._reflow = function() {
        if (!this.options.equalizeOnStack) {
            if (this._isStacked()) {
                this.$watched.css("height", "auto");
                return false;
            }
        }
        if (this.options.equalizeByRow) {
            this.getHeightsByRow(this.applyHeightByRow.bind(this));
        } else {
            this.getHeights(this.applyHeight.bind(this));
        }
    };
    Equalizer.prototype._isStacked = function() {
        return this.$watched[0].offsetTop !== this.$watched[1].offsetTop;
    };
    Equalizer.prototype.getHeights = function(cb) {
        var heights = [];
        for (var i = 0, len = this.$watched.length; i < len; i++) {
            this.$watched[i].style.height = "auto";
            heights.push(this.$watched[i].offsetHeight);
        }
        cb(heights);
    };
    Equalizer.prototype.getHeightsByRow = function(cb) {
        var lastElTopOffset = this.$watched.first().offset().top, groups = [], group = 0;
        groups[group] = [];
        for (var i = 0, len = this.$watched.length; i < len; i++) {
            this.$watched[i].style.height = "auto";
            var elOffsetTop = $(this.$watched[i]).offset().top;
            if (elOffsetTop != lastElTopOffset) {
                group++;
                groups[group] = [];
                lastElTopOffset = elOffsetTop;
            }
            groups[group].push([ this.$watched[i], this.$watched[i].offsetHeight ]);
        }
        for (var i = 0, len = groups.length; i < len; i++) {
            var heights = $(groups[i]).map(function() {
                return this[1];
            }).get();
            var max = Math.max.apply(null, heights);
            groups[i].push(max);
        }
        cb(groups);
    };
    Equalizer.prototype.applyHeight = function(heights) {
        var max = Math.max.apply(null, heights);
        this.$element.trigger("preequalized.zf.equalizer");
        this.$watched.css("height", max);
        this.$element.trigger("postequalized.zf.equalizer");
    };
    Equalizer.prototype.applyHeightByRow = function(groups) {
        this.$element.trigger("preequalized.zf.equalizer");
        for (var i = 0, len = groups.length; i < len; i++) {
            var groupsILength = groups[i].length, max = groups[i][groupsILength - 1];
            if (groupsILength <= 2) {
                $(groups[i][0][0]).css({
                    height: "auto"
                });
                continue;
            }
            this.$element.trigger("preequalizedrow.zf.equalizer");
            for (var j = 0, lenJ = groupsILength - 1; j < lenJ; j++) {
                $(groups[i][j][0]).css({
                    height: max
                });
            }
            this.$element.trigger("postequalizedrow.zf.equalizer");
        }
        this.$element.trigger("postequalized.zf.equalizer");
    };
    Equalizer.prototype.destroy = function() {
        this._pauseEvents();
        this.$watched.css("height", "auto");
        Foundation.unregisterPlugin(this);
    };
    Foundation.plugin(Equalizer, "Equalizer");
    if (typeof module !== "undefined" && typeof module.exports !== "undefined") module.exports = Equalizer;
    if (typeof define === "function") define([ "foundation" ], function() {
        return Equalizer;
    });
}(Foundation, jQuery);

!function(Foundation, $) {
    "use strict";
    function Interchange(element, options) {
        this.$element = element;
        this.options = $.extend({}, Interchange.defaults, options);
        this.rules = [];
        this.currentPath = "";
        this._init();
        this._events();
        Foundation.registerPlugin(this, "Interchange");
    }
    Interchange.defaults = {
        rules: null
    };
    Interchange.SPECIAL_QUERIES = {
        landscape: "screen and (orientation: landscape)",
        portrait: "screen and (orientation: portrait)",
        retina: "only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)"
    };
    Interchange.prototype._init = function() {
        this._addBreakpoints();
        this._generateRules();
        this._reflow();
    };
    Interchange.prototype._events = function() {
        $(window).on("resize.zf.interchange", Foundation.util.throttle(this._reflow.bind(this), 50));
    };
    Interchange.prototype._reflow = function() {
        var match;
        for (var i in this.rules) {
            var rule = this.rules[i];
            if (window.matchMedia(rule.query).matches) {
                match = rule;
            }
        }
        if (match) {
            this.replace(match.path);
        }
    };
    Interchange.prototype._addBreakpoints = function() {
        for (var i in Foundation.MediaQuery.queries) {
            var query = Foundation.MediaQuery.queries[i];
            Interchange.SPECIAL_QUERIES[query.name] = query.value;
        }
    };
    Interchange.prototype._generateRules = function() {
        var rulesList = [];
        var rules;
        if (this.options.rules) {
            rules = this.options.rules;
        } else {
            rules = this.$element.data("interchange").match(/\[.*?\]/g);
        }
        for (var i in rules) {
            var rule = rules[i].slice(1, -1).split(", ");
            var path = rule.slice(0, -1).join("");
            var query = rule[rule.length - 1];
            if (Interchange.SPECIAL_QUERIES[query]) {
                query = Interchange.SPECIAL_QUERIES[query];
            }
            rulesList.push({
                path: path,
                query: query
            });
        }
        this.rules = rulesList;
    };
    Interchange.prototype.replace = function(path) {
        if (this.currentPath === path) return;
        var _this = this;
        if (this.$element[0].nodeName === "IMG") {
            this.$element.attr("src", path).load(function() {
                _this.currentPath = path;
            });
        } else if (path.match(/\.(gif|jpg|jpeg|tiff|png)([?#].*)?/i)) {
            this.$element.css({
                "background-image": "url(" + path + ")"
            });
        } else {
            $.get(path, function(response) {
                _this.$element.html(response);
                $(response).foundation();
                _this.currentPath = path;
            });
        }
        this.$element.trigger("replaced.zf.interchange");
    };
    Interchange.prototype.destroy = function() {};
    Foundation.plugin(Interchange, "Interchange");
    if (typeof module !== "undefined" && typeof module.exports !== "undefined") module.exports = Interchange;
    if (typeof define === "function") define([ "foundation" ], function() {
        return Interchange;
    });
}(Foundation, jQuery);

!function(Foundation, $) {
    "use strict";
    function Magellan(element, options) {
        this.$element = element;
        this.options = $.extend({}, Magellan.defaults, this.$element.data(), options);
        this._init();
        Foundation.registerPlugin(this, "Magellan");
    }
    Magellan.defaults = {
        animationDuration: 500,
        animationEasing: "linear",
        threshold: 50,
        activeClass: "active",
        deepLinking: false,
        barOffset: 0
    };
    Magellan.prototype._init = function() {
        var id = this.$element[0].id || Foundation.GetYoDigits(6, "magellan"), _this = this;
        this.$targets = $("[data-magellan-target]");
        this.$links = this.$element.find("a");
        this.$element.attr({
            "data-resize": id,
            "data-scroll": id,
            id: id
        });
        this.$active = $();
        this.scrollPos = parseInt(window.pageYOffset, 10);
        this._events();
    };
    Magellan.prototype.calcPoints = function() {
        var _this = this, body = document.body, html = document.documentElement;
        this.points = [];
        this.winHeight = Math.round(Math.max(window.innerHeight, html.clientHeight));
        this.docHeight = Math.round(Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight));
        this.$targets.each(function() {
            var $tar = $(this), pt = Math.round($tar.offset().top - _this.options.threshold);
            $tar.targetPoint = pt;
            _this.points.push(pt);
        });
    };
    Magellan.prototype._events = function() {
        var _this = this, $body = $("html, body"), opts = {
            duration: _this.options.animationDuration,
            easing: _this.options.animationEasing
        };
        $(window).one("load", function() {
            _this.calcPoints();
            _this._updateActive();
        });
        this.$element.on({
            "resizeme.zf.trigger": this.reflow.bind(this),
            "scrollme.zf.trigger": this._updateActive.bind(this)
        }).on("click.zf.magellan", 'a[href^="#"]', function(e) {
            e.preventDefault();
            var arrival = this.getAttribute("href"), scrollPos = $(arrival).offset().top - _this.options.threshold / 2 - _this.options.barOffset;
            $body.stop(true).animate({
                scrollTop: scrollPos
            }, opts);
        });
    };
    Magellan.prototype.reflow = function() {
        this.calcPoints();
        this._updateActive();
    };
    Magellan.prototype._updateActive = function() {
        var winPos = parseInt(window.pageYOffset, 10), curIdx;
        if (winPos + this.winHeight === this.docHeight) {
            curIdx = this.points.length - 1;
        } else if (winPos < this.points[0]) {
            curIdx = 0;
        } else {
            var isDown = this.scrollPos < winPos, _this = this, curVisible = this.points.filter(function(p, i) {
                return isDown ? p <= winPos : p - _this.options.threshold <= winPos;
            });
            curIdx = curVisible.length ? curVisible.length - 1 : 0;
        }
        this.$active.removeClass(this.options.activeClass);
        this.$active = this.$links.eq(curIdx).addClass(this.options.activeClass);
        if (this.options.deepLinking) {
            var hash = this.$active[0].getAttribute("href");
            if (window.history.pushState) {
                window.history.pushState(null, null, hash);
            } else {
                window.location.hash = hash;
            }
        }
        this.scrollPos = winPos;
        this.$element.trigger("update.zf.magellan", [ this.$active ]);
    };
    Magellan.prototype.destroy = function() {
        this.$element.off(".zf.trigger .zf.magellan").find("." + this.options.activeClass).removeClass(this.options.activeClass);
        if (this.options.deepLinking) {
            var hash = this.$active[0].getAttribute("href");
            window.location.hash.replace(hash, "");
        }
        Foundation.unregisterPlugin(this);
    };
    Foundation.plugin(Magellan, "Magellan");
    if (typeof module !== "undefined" && typeof module.exports !== "undefined") module.exports = Magellan;
    if (typeof define === "function") define([ "foundation" ], function() {
        return Magellan;
    });
}(Foundation, jQuery);

!function($, Foundation) {
    "use strict";
    function OffCanvas(element, options) {
        this.$element = element;
        this.options = $.extend({}, OffCanvas.defaults, this.$element.data(), options);
        this.$lastTrigger = $();
        this._init();
        this._events();
        Foundation.registerPlugin(this, "OffCanvas");
    }
    OffCanvas.defaults = {
        closeOnClick: true,
        transitionTime: 0,
        position: "left",
        forceTop: true,
        isRevealed: false,
        revealOn: null,
        autoFocus: true,
        revealClass: "reveal-for-",
        trapFocus: false
    };
    OffCanvas.prototype._init = function() {
        var id = this.$element.attr("id");
        this.$element.attr("aria-hidden", "true");
        $(document).find('[data-open="' + id + '"], [data-close="' + id + '"], [data-toggle="' + id + '"]').attr("aria-expanded", "false").attr("aria-controls", id);
        if (this.options.closeOnClick) {
            if ($(".js-off-canvas-exit").length) {
                this.$exiter = $(".js-off-canvas-exit");
            } else {
                var exiter = document.createElement("div");
                exiter.setAttribute("class", "js-off-canvas-exit");
                $("[data-off-canvas-content]").append(exiter);
                this.$exiter = $(exiter);
            }
        }
        this.options.isRevealed = this.options.isRevealed || new RegExp(this.options.revealClass, "g").test(this.$element[0].className);
        if (this.options.isRevealed) {
            this.options.revealOn = this.options.revealOn || this.$element[0].className.match(/(reveal-for-medium|reveal-for-large)/g)[0].split("-")[2];
            this._setMQChecker();
        }
        if (!this.options.transitionTime) {
            this.options.transitionTime = parseFloat(window.getComputedStyle($("[data-off-canvas-wrapper]")[0]).transitionDuration) * 1e3;
        }
    };
    OffCanvas.prototype._events = function() {
        this.$element.off(".zf.trigger .zf.offcanvas").on({
            "open.zf.trigger": this.open.bind(this),
            "close.zf.trigger": this.close.bind(this),
            "toggle.zf.trigger": this.toggle.bind(this),
            "keydown.zf.offcanvas": this._handleKeyboard.bind(this)
        });
        if (this.$exiter.length) {
            var _this = this;
            this.$exiter.on({
                "click.zf.offcanvas": this.close.bind(this)
            });
        }
    };
    OffCanvas.prototype._setMQChecker = function() {
        var _this = this;
        $(window).on("changed.zf.mediaquery", function() {
            if (Foundation.MediaQuery.atLeast(_this.options.revealOn)) {
                _this.reveal(true);
            } else {
                _this.reveal(false);
            }
        }).one("load.zf.offcanvas", function() {
            if (Foundation.MediaQuery.atLeast(_this.options.revealOn)) {
                _this.reveal(true);
            }
        });
    };
    OffCanvas.prototype.reveal = function(isRevealed) {
        var $closer = this.$element.find("[data-close]");
        if (isRevealed) {
            this.close();
            this.isRevealed = true;
            this.$element.off("open.zf.trigger toggle.zf.trigger");
            if ($closer.length) {
                $closer.hide();
            }
        } else {
            this.isRevealed = false;
            this.$element.on({
                "open.zf.trigger": this.open.bind(this),
                "toggle.zf.trigger": this.toggle.bind(this)
            });
            if ($closer.length) {
                $closer.show();
            }
        }
    };
    OffCanvas.prototype.open = function(event, trigger) {
        if (this.$element.hasClass("is-open") || this.isRevealed) {
            return;
        }
        var _this = this, $body = $(document.body);
        $("body").scrollTop(0);
        Foundation.Move(this.options.transitionTime, this.$element, function() {
            $("[data-off-canvas-wrapper]").addClass("is-off-canvas-open is-open-" + _this.options.position);
            _this.$element.addClass("is-open");
        });
        this.$element.attr("aria-hidden", "false").trigger("opened.zf.offcanvas");
        if (trigger) {
            this.$lastTrigger = trigger.attr("aria-expanded", "true");
        }
        if (this.options.autoFocus) {
            this.$element.one("finished.zf.animate", function() {
                _this.$element.find("a, button").eq(0).focus();
            });
        }
        if (this.options.trapFocus) {
            $("[data-off-canvas-content]").attr("tabindex", "-1");
            this._trapFocus();
        }
    };
    OffCanvas.prototype._trapFocus = function() {
        var focusable = Foundation.Keyboard.findFocusable(this.$element), first = focusable.eq(0), last = focusable.eq(-1);
        focusable.off(".zf.offcanvas").on("keydown.zf.offcanvas", function(e) {
            if (e.which === 9 || e.keycode === 9) {
                if (e.target === last[0] && !e.shiftKey) {
                    e.preventDefault();
                    first.focus();
                }
                if (e.target === first[0] && e.shiftKey) {
                    e.preventDefault();
                    last.focus();
                }
            }
        });
    };
    OffCanvas.prototype.close = function(cb) {
        if (!this.$element.hasClass("is-open") || this.isRevealed) {
            return;
        }
        var _this = this;
        $("[data-off-canvas-wrapper]").removeClass("is-off-canvas-open is-open-" + _this.options.position);
        _this.$element.removeClass("is-open");
        this.$element.attr("aria-hidden", "true").trigger("closed.zf.offcanvas");
        this.$lastTrigger.attr("aria-expanded", "false");
        if (this.options.trapFocus) {
            $("[data-off-canvas-content]").removeAttr("tabindex");
        }
    };
    OffCanvas.prototype.toggle = function(event, trigger) {
        if (this.$element.hasClass("is-open")) {
            this.close(event, trigger);
        } else {
            this.open(event, trigger);
        }
    };
    OffCanvas.prototype._handleKeyboard = function(event) {
        if (event.which !== 27) return;
        event.stopPropagation();
        event.preventDefault();
        this.close();
        this.$lastTrigger.focus();
    };
    OffCanvas.prototype.destroy = function() {
        this.close();
        this.$element.off(".zf.trigger .zf.offcanvas");
        this.$exiter.off(".zf.offcanvas");
        Foundation.unregisterPlugin(this);
    };
    Foundation.plugin(OffCanvas, "OffCanvas");
}(jQuery, Foundation);

!function($, Foundation) {
    "use strict";
    function Orbit(element, options) {
        this.$element = element;
        this.options = $.extend({}, Orbit.defaults, this.$element.data(), options);
        this._init();
        Foundation.registerPlugin(this, "Orbit");
        Foundation.Keyboard.register("Orbit", {
            ltr: {
                ARROW_RIGHT: "next",
                ARROW_LEFT: "previous"
            },
            rtl: {
                ARROW_LEFT: "next",
                ARROW_RIGHT: "previous"
            }
        });
    }
    Orbit.defaults = {
        bullets: true,
        navButtons: true,
        animInFromRight: "slide-in-right",
        animOutToRight: "slide-out-right",
        animInFromLeft: "slide-in-left",
        animOutToLeft: "slide-out-left",
        autoPlay: true,
        timerDelay: 5e3,
        infiniteWrap: true,
        swipe: true,
        pauseOnHover: true,
        accessible: true,
        containerClass: "orbit-container",
        slideClass: "orbit-slide",
        boxOfBullets: "orbit-bullets",
        nextClass: "orbit-next",
        prevClass: "orbit-previous",
        useMUI: true
    };
    Orbit.prototype._init = function() {
        this.$wrapper = this.$element.find("." + this.options.containerClass);
        this.$slides = this.$element.find("." + this.options.slideClass);
        var $images = this.$element.find("img"), initActive = this.$slides.filter(".is-active");
        if (!initActive.length) {
            this.$slides.eq(0).addClass("is-active");
        }
        if (!this.options.useMUI) {
            this.$slides.addClass("no-motionui");
        }
        if ($images.length) {
            Foundation.onImagesLoaded($images, this._prepareForOrbit.bind(this));
        } else {
            this._prepareForOrbit();
        }
        if (this.options.bullets) {
            this._loadBullets();
        }
        this._events();
        if (this.options.autoPlay) {
            this.geoSync();
        }
        if (this.options.accessible) {
            this.$wrapper.attr("tabindex", 0);
        }
    };
    Orbit.prototype._loadBullets = function() {
        this.$bullets = this.$element.find("." + this.options.boxOfBullets).find("button");
    };
    Orbit.prototype.geoSync = function() {
        var _this = this;
        this.timer = new Foundation.Timer(this.$element, {
            duration: this.options.timerDelay,
            infinite: false
        }, function() {
            _this.changeSlide(true);
        });
        this.timer.start();
    };
    Orbit.prototype._prepareForOrbit = function() {
        var _this = this;
        this._setWrapperHeight(function(max) {
            _this._setSlideHeight(max);
        });
    };
    Orbit.prototype._setWrapperHeight = function(cb) {
        var max = 0, temp, counter = 0;
        this.$slides.each(function() {
            temp = this.getBoundingClientRect().height;
            $(this).attr("data-slide", counter);
            if (counter) {
                $(this).css({
                    position: "relative",
                    display: "none"
                });
            }
            max = temp > max ? temp : max;
            counter++;
        });
        if (counter === this.$slides.length) {
            this.$wrapper.css({
                height: max
            });
            cb(max);
        }
    };
    Orbit.prototype._setSlideHeight = function(height) {
        this.$slides.each(function() {
            $(this).css("max-height", height);
        });
    };
    Orbit.prototype._events = function() {
        var _this = this;
        if (this.options.swipe) {
            this.$slides.off("swipeleft.zf.orbit swiperight.zf.orbit").on("swipeleft.zf.orbit", function(e) {
                e.preventDefault();
                _this.changeSlide(true);
            }).on("swiperight.zf.orbit", function(e) {
                e.preventDefault();
                _this.changeSlide(false);
            });
        }
        if (this.options.autoPlay) {
            this.$slides.on("click.zf.orbit", function() {
                _this.$element.data("clickedOn", _this.$element.data("clickedOn") ? false : true);
                _this.timer[_this.$element.data("clickedOn") ? "pause" : "start"]();
            });
            if (this.options.pauseOnHover) {
                this.$element.on("mouseenter.zf.orbit", function() {
                    _this.timer.pause();
                }).on("mouseleave.zf.orbit", function() {
                    if (!_this.$element.data("clickedOn")) {
                        _this.timer.start();
                    }
                });
            }
        }
        if (this.options.navButtons) {
            var $controls = this.$element.find("." + this.options.nextClass + ", ." + this.options.prevClass);
            $controls.attr("tabindex", 0).on("click.zf.orbit touchend.zf.orbit", function() {
                _this.changeSlide($(this).hasClass(_this.options.nextClass));
            });
        }
        if (this.options.bullets) {
            this.$bullets.on("click.zf.orbit touchend.zf.orbit", function() {
                if (/is-active/g.test(this.className)) {
                    return false;
                }
                var idx = $(this).data("slide"), ltr = idx > _this.$slides.filter(".is-active").data("slide"), $slide = _this.$slides.eq(idx);
                _this.changeSlide(ltr, $slide, idx);
            });
        }
        this.$wrapper.add(this.$bullets).on("keydown.zf.orbit", function(e) {
            Foundation.Keyboard.handleKey(e, "Orbit", {
                next: function() {
                    _this.changeSlide(true);
                },
                previous: function() {
                    _this.changeSlide(false);
                },
                handled: function() {
                    if ($(e.target).is(_this.$bullets)) {
                        _this.$bullets.filter(".is-active").focus();
                    }
                }
            });
        });
    };
    Orbit.prototype.changeSlide = function(isLTR, chosenSlide, idx) {
        var $curSlide = this.$slides.filter(".is-active").eq(0);
        if (/mui/g.test($curSlide[0].className)) {
            return false;
        }
        var $firstSlide = this.$slides.first(), $lastSlide = this.$slides.last(), dirIn = isLTR ? "Right" : "Left", dirOut = isLTR ? "Left" : "Right", _this = this, $newSlide;
        if (!chosenSlide) {
            $newSlide = isLTR ? this.options.infiniteWrap ? $curSlide.next("." + this.options.slideClass).length ? $curSlide.next("." + this.options.slideClass) : $firstSlide : $curSlide.next("." + this.options.slideClass) : this.options.infiniteWrap ? $curSlide.prev("." + this.options.slideClass).length ? $curSlide.prev("." + this.options.slideClass) : $lastSlide : $curSlide.prev("." + this.options.slideClass);
        } else {
            $newSlide = chosenSlide;
        }
        if ($newSlide.length) {
            if (this.options.bullets) {
                idx = idx || this.$slides.index($newSlide);
                this._updateBullets(idx);
            }
            if (this.options.useMUI) {
                Foundation.Motion.animateIn($newSlide.addClass("is-active").css({
                    position: "absolute",
                    top: 0
                }), this.options["animInFrom" + dirIn], function() {
                    $newSlide.css({
                        position: "relative",
                        display: "block"
                    }).attr("aria-live", "polite");
                });
                Foundation.Motion.animateOut($curSlide.removeClass("is-active"), this.options["animOutTo" + dirOut], function() {
                    $curSlide.removeAttr("aria-live");
                    if (_this.options.autoPlay) {
                        _this.timer.restart();
                    }
                });
            } else {
                $curSlide.removeClass("is-active is-in").removeAttr("aria-live").hide();
                $newSlide.addClass("is-active is-in").attr("aria-live", "polite").show();
                if (this.options.autoPlay) {
                    this.timer.restart();
                }
            }
            this.$element.trigger("slidechange.zf.orbit", [ $newSlide ]);
        }
    };
    Orbit.prototype._updateBullets = function(idx) {
        var $oldBullet = this.$element.find("." + this.options.boxOfBullets).find(".is-active").removeClass("is-active").blur(), span = $oldBullet.find("span:last").detach(), $newBullet = this.$bullets.eq(idx).addClass("is-active").append(span);
    };
    Orbit.prototype.destroy = function() {
        delete this.timer;
        this.$element.off(".zf.orbit").find("*").off(".zf.orbit").end().hide();
        Foundation.unregisterPlugin(this);
    };
    Foundation.plugin(Orbit, "Orbit");
}(jQuery, window.Foundation);

!function(Foundation, $) {
    "use strict";
    var MenuPlugins = {
        dropdown: {
            cssClass: "dropdown",
            plugin: Foundation._plugins["dropdown-menu"] || null
        },
        drilldown: {
            cssClass: "drilldown",
            plugin: Foundation._plugins["drilldown"] || null
        },
        accordion: {
            cssClass: "accordion-menu",
            plugin: Foundation._plugins["accordion-menu"] || null
        }
    };
    var phMedia = {
        small: "(min-width: 0px)",
        medium: "(min-width: 640px)"
    };
    function ResponsiveMenu(element) {
        this.$element = $(element);
        this.rules = this.$element.data("responsive-menu");
        this.currentMq = null;
        this.currentPlugin = null;
        this._init();
        this._events();
        Foundation.registerPlugin(this, "ResponsiveMenu");
    }
    ResponsiveMenu.defaults = {};
    ResponsiveMenu.prototype._init = function() {
        var rulesTree = {};
        var rules = this.rules.split(" ");
        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i].split("-");
            var ruleSize = rule.length > 1 ? rule[0] : "small";
            var rulePlugin = rule.length > 1 ? rule[1] : rule[0];
            if (MenuPlugins[rulePlugin] !== null) {
                rulesTree[ruleSize] = MenuPlugins[rulePlugin];
            }
        }
        this.rules = rulesTree;
        if (!$.isEmptyObject(rulesTree)) {
            this._checkMediaQueries();
        }
    };
    ResponsiveMenu.prototype._events = function() {
        var _this = this;
        $(window).on("changed.zf.mediaquery", function() {
            _this._checkMediaQueries();
        });
    };
    ResponsiveMenu.prototype._checkMediaQueries = function() {
        var matchedMq, _this = this;
        $.each(this.rules, function(key) {
            if (Foundation.MediaQuery.atLeast(key)) {
                matchedMq = key;
            }
        });
        if (!matchedMq) return;
        if (this.currentPlugin instanceof this.rules[matchedMq].plugin) return;
        $.each(MenuPlugins, function(key, value) {
            _this.$element.removeClass(value.cssClass);
        });
        this.$element.addClass(this.rules[matchedMq].cssClass);
        if (this.currentPlugin) this.currentPlugin.destroy();
        this.currentPlugin = new this.rules[matchedMq].plugin(this.$element, {});
    };
    ResponsiveMenu.prototype.destroy = function() {
        this.currentPlugin.destroy();
        $(window).off(".zf.ResponsiveMenu");
        Foundation.unregisterPlugin(this);
    };
    Foundation.plugin(ResponsiveMenu, "ResponsiveMenu");
}(Foundation, jQuery);

!function($, Foundation) {
    "use strict";
    function ResponsiveToggle(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, ResponsiveToggle.defaults, this.$element.data(), options);
        this._init();
        this._events();
        Foundation.registerPlugin(this, "ResponsiveToggle");
    }
    ResponsiveToggle.defaults = {
        hideFor: "medium"
    };
    ResponsiveToggle.prototype._init = function() {
        var targetID = this.$element.data("responsive-toggle");
        if (!targetID) {
            console.error("Your tab bar needs an ID of a Menu as the value of data-tab-bar.");
        }
        this.$targetMenu = $("#" + targetID);
        this.$toggler = this.$element.find("[data-toggle]");
        this._update();
    };
    ResponsiveToggle.prototype._events = function() {
        var _this = this;
        $(window).on("changed.zf.mediaquery", this._update.bind(this));
        this.$toggler.on("click.zf.responsiveToggle", this.toggleMenu.bind(this));
    };
    ResponsiveToggle.prototype._update = function() {
        if (!Foundation.MediaQuery.atLeast(this.options.hideFor)) {
            this.$element.show();
            this.$targetMenu.hide();
        } else {
            this.$element.hide();
            this.$targetMenu.show();
        }
    };
    ResponsiveToggle.prototype.toggleMenu = function() {
        if (!Foundation.MediaQuery.atLeast(this.options.hideFor)) {
            this.$targetMenu.toggle(0);
            this.$element.trigger("toggled.zf.responsiveToggle");
        }
    };
    ResponsiveToggle.prototype.destroy = function() {};
    Foundation.plugin(ResponsiveToggle, "ResponsiveToggle");
}(jQuery, Foundation);

!function(Foundation, $) {
    "use strict";
    function Reveal(element, options) {
        this.$element = element;
        this.options = $.extend({}, Reveal.defaults, this.$element.data(), options);
        this._init();
        Foundation.registerPlugin(this, "Reveal");
        Foundation.Keyboard.register("Reveal", {
            ENTER: "open",
            SPACE: "open",
            ESCAPE: "close",
            TAB: "tab_forward",
            SHIFT_TAB: "tab_backward"
        });
    }
    Reveal.defaults = {
        animationIn: "",
        animationOut: "",
        showDelay: 0,
        hideDelay: 0,
        closeOnClick: true,
        closeOnEsc: true,
        multipleOpened: false,
        vOffset: 100,
        hOffset: 0,
        fullScreen: false,
        btmOffsetPct: 10,
        overlay: true,
        resetOnClose: false
    };
    Reveal.prototype._init = function() {
        this.id = this.$element.attr("id");
        this.isActive = false;
        this.$anchor = $('[data-open="' + this.id + '"]').length ? $('[data-open="' + this.id + '"]') : $('[data-toggle="' + this.id + '"]');
        if (this.$anchor.length) {
            var anchorId = this.$anchor[0].id || Foundation.GetYoDigits(6, "reveal");
            this.$anchor.attr({
                "aria-controls": this.id,
                id: anchorId,
                "aria-haspopup": true,
                tabindex: 0
            });
            this.$element.attr({
                "aria-labelledby": anchorId
            });
        }
        if (this.options.fullScreen || this.$element.hasClass("full")) {
            this.options.fullScreen = true;
            this.options.overlay = false;
        }
        if (this.options.overlay && !this.$overlay) {
            this.$overlay = this._makeOverlay(this.id);
        }
        this.$element.attr({
            role: "dialog",
            "aria-hidden": true,
            "data-yeti-box": this.id,
            "data-resize": this.id
        });
        this._events();
    };
    Reveal.prototype._makeOverlay = function(id) {
        var $overlay = $("<div></div>").addClass("reveal-overlay").attr({
            tabindex: -1,
            "aria-hidden": true
        }).appendTo("body");
        if (this.options.closeOnClick) {
            $overlay.attr({
                "data-close": id
            });
        }
        return $overlay;
    };
    Reveal.prototype._events = function() {
        var _this = this;
        this.$element.on({
            "open.zf.trigger": this.open.bind(this),
            "close.zf.trigger": this.close.bind(this),
            "toggle.zf.trigger": this.toggle.bind(this),
            "resizeme.zf.trigger": function() {
                if (_this.$element.is(":visible")) {
                    _this._setPosition(function() {});
                }
            }
        });
        if (this.$anchor.length) {
            this.$anchor.on("keydown.zf.reveal", function(e) {
                if (e.which === 13 || e.which === 32) {
                    e.stopPropagation();
                    e.preventDefault();
                    _this.open();
                }
            });
        }
        if (this.options.closeOnClick && this.options.overlay) {
            this.$overlay.off(".zf.reveal").on("click.zf.reveal", this.close.bind(this));
        }
    };
    Reveal.prototype._setPosition = function(cb) {
        var eleDims = Foundation.Box.GetDimensions(this.$element);
        var elePos = this.options.fullScreen ? "reveal full" : eleDims.height >= .5 * eleDims.windowDims.height ? "reveal" : "center";
        if (elePos === "reveal full") {
            this.$element.offset(Foundation.Box.GetOffsets(this.$element, null, elePos, this.options.vOffset)).css({
                height: eleDims.windowDims.height,
                width: eleDims.windowDims.width
            });
        } else if (!Foundation.MediaQuery.atLeast("medium") || !Foundation.Box.ImNotTouchingYou(this.$element, null, true, false)) {
            this.$element.css({
                width: eleDims.windowDims.width - this.options.hOffset * 2
            }).offset(Foundation.Box.GetOffsets(this.$element, null, "center", this.options.vOffset, this.options.hOffset));
            this.changedSize = true;
        } else {
            this.$element.css({
                "max-height": eleDims.windowDims.height - this.options.vOffset * (this.options.btmOffsetPct / 100 + 1),
                width: ""
            }).offset(Foundation.Box.GetOffsets(this.$element, null, elePos, this.options.vOffset));
        }
        cb();
    };
    Reveal.prototype.open = function() {
        var _this = this;
        this.isActive = true;
        this.$element.css({
            visibility: "hidden"
        }).show().scrollTop(0);
        this._setPosition(function() {
            _this.$element.hide().css({
                visibility: ""
            });
            if (!_this.options.multipleOpened) {
                _this.$element.trigger("closeme.zf.reveal", _this.id);
            }
            if (_this.options.animationIn) {
                if (_this.options.overlay) {
                    Foundation.Motion.animateIn(_this.$overlay, "fade-in", function() {
                        Foundation.Motion.animateIn(_this.$element, _this.options.animationIn, function() {
                            _this.focusableElements = Foundation.Keyboard.findFocusable(_this.$element);
                        });
                    });
                } else {
                    Foundation.Motion.animateIn(_this.$element, _this.options.animationIn, function() {
                        _this.focusableElements = Foundation.Keyboard.findFocusable(_this.$element);
                    });
                }
            } else {
                if (_this.options.overlay) {
                    _this.$overlay.show(0, function() {
                        _this.$element.show(_this.options.showDelay, function() {});
                    });
                } else {
                    _this.$element.show(_this.options.showDelay, function() {});
                }
            }
        });
        this.$element.attr({
            "aria-hidden": false
        }).attr("tabindex", -1).focus().trigger("open.zf.reveal");
        $("body").addClass("is-reveal-open").attr({
            "aria-hidden": this.options.overlay || this.options.fullScreen ? true : false
        });
        setTimeout(function() {
            _this._extraHandlers();
        }, 0);
    };
    Reveal.prototype._extraHandlers = function() {
        var _this = this;
        this.focusableElements = Foundation.Keyboard.findFocusable(this.$element);
        if (!this.options.overlay && this.options.closeOnClick && !this.options.fullScreen) {
            $("body").on("click.zf.reveal", function(e) {
                _this.close();
            });
        }
        if (this.options.closeOnEsc) {
            $(window).on("keydown.zf.reveal", function(e) {
                Foundation.Keyboard.handleKey(e, "Reveal", {
                    close: function() {
                        if (_this.options.closeOnEsc) {
                            _this.close();
                            _this.$anchor.focus();
                        }
                    }
                });
                if (_this.focusableElements.length === 0) {
                    e.preventDefault();
                }
            });
        }
        this.$element.on("keydown.zf.reveal", function(e) {
            var $target = $(this);
            Foundation.Keyboard.handleKey(e, "Reveal", {
                tab_forward: function() {
                    if (_this.$element.find(":focus").is(_this.focusableElements.eq(-1))) {
                        _this.focusableElements.eq(0).focus();
                        e.preventDefault();
                    }
                },
                tab_backward: function() {
                    if (_this.$element.find(":focus").is(_this.focusableElements.eq(0)) || _this.$element.is(":focus")) {
                        _this.focusableElements.eq(-1).focus();
                        e.preventDefault();
                    }
                },
                open: function() {
                    if (_this.$element.find(":focus").is(_this.$element.find("[data-close]"))) {
                        setTimeout(function() {
                            _this.$anchor.focus();
                        }, 1);
                    } else if ($target.is(_this.focusableElements)) {
                        _this.open();
                    }
                },
                close: function() {
                    if (_this.options.closeOnEsc) {
                        _this.close();
                        _this.$anchor.focus();
                    }
                }
            });
        });
    };
    Reveal.prototype.close = function() {
        if (!this.isActive || !this.$element.is(":visible")) {
            return false;
        }
        var _this = this;
        if (this.options.animationOut) {
            Foundation.Motion.animateOut(this.$element, this.options.animationOut, function() {
                if (_this.options.overlay) {
                    Foundation.Motion.animateOut(_this.$overlay, "fade-out", function() {});
                }
            });
        } else {
            this.$element.hide(_this.options.hideDelay, function() {
                if (_this.options.overlay) {
                    _this.$overlay.hide(0, function() {});
                }
            });
        }
        if (this.options.closeOnEsc) {
            $(window).off("keydown.zf.reveal");
        }
        if (!this.options.overlay && this.options.closeOnClick) {
            $("body").off("click.zf.reveal");
        }
        this.$element.off("keydown.zf.reveal");
        if (this.changedSize) {
            this.$element.css({
                height: "",
                width: ""
            });
        }
        $("body").removeClass("is-reveal-open").attr({
            "aria-hidden": false,
            tabindex: ""
        });
        if (this.options.resetOnClose) {
            this.$element.html(this.$element.html());
        }
        this.isActive = false;
        this.$element.attr({
            "aria-hidden": true
        }).trigger("closed.zf.reveal");
    };
    Reveal.prototype.toggle = function() {
        if (this.isActive) {
            this.close();
        } else {
            this.open();
        }
    };
    Reveal.prototype.destroy = function() {
        if (this.options.overlay) {
            this.$overlay.hide().off().remove();
        }
        this.$element.hide();
        this.$anchor.off();
        Foundation.unregisterPlugin(this);
    };
    Foundation.plugin(Reveal, "Reveal");
    if (typeof module !== "undefined" && typeof module.exports !== "undefined") module.exports = Reveal;
    if (typeof define === "function") define([ "foundation" ], function() {
        return Reveal;
    });
}(Foundation, jQuery);

!function($, Foundation) {
    "use strict";
    function Slider(element, options) {
        this.$element = element;
        this.options = $.extend({}, Slider.defaults, this.$element.data(), options);
        this._init();
        Foundation.registerPlugin(this, "Slider");
        Foundation.Keyboard.register("Slider", {
            ltr: {
                ARROW_RIGHT: "increase",
                ARROW_UP: "increase",
                ARROW_DOWN: "decrease",
                ARROW_LEFT: "decrease",
                SHIFT_ARROW_RIGHT: "increase_fast",
                SHIFT_ARROW_UP: "increase_fast",
                SHIFT_ARROW_DOWN: "decrease_fast",
                SHIFT_ARROW_LEFT: "decrease_fast"
            },
            rtl: {
                ARROW_LEFT: "increase",
                ARROW_RIGHT: "decrease",
                SHIFT_ARROW_LEFT: "increase_fast",
                SHIFT_ARROW_RIGHT: "decrease_fast"
            }
        });
    }
    Slider.defaults = {
        start: 0,
        end: 100,
        step: 1,
        initialStart: 0,
        initialEnd: 100,
        binding: false,
        clickSelect: true,
        vertical: false,
        draggable: true,
        disabled: false,
        doubleSided: false,
        decimal: 2,
        moveTime: 200,
        disabledClass: "disabled"
    };
    Slider.prototype._init = function() {
        this.inputs = this.$element.find("input");
        this.handles = this.$element.find("[data-slider-handle]");
        this.$handle = this.handles.eq(0);
        this.$input = this.inputs.length ? this.inputs.eq(0) : $("#" + this.$handle.attr("aria-controls"));
        this.$fill = this.$element.find("[data-slider-fill]").css(this.options.vertical ? "height" : "width", 0);
        var isDbl = false, _this = this;
        if (this.options.disabled || this.$element.hasClass(this.options.disabledClass)) {
            this.options.disabled = true;
            this.$element.addClass(this.options.disabledClass);
        }
        if (!this.inputs.length) {
            this.inputs = $().add(this.$input);
            this.options.binding = true;
        }
        this._setInitAttr(0);
        this._events(this.$handle);
        if (this.handles[1]) {
            this.options.doubleSided = true;
            this.$handle2 = this.handles.eq(1);
            this.$input2 = this.inputs.length > 1 ? this.inputs.eq(1) : $("#" + this.$handle2.attr("aria-controls"));
            if (!this.inputs[1]) {
                this.inputs = this.inputs.add(this.$input2);
            }
            isDbl = true;
            this._setHandlePos(this.$handle, this.options.initialStart, true, function() {
                _this._setHandlePos(_this.$handle2, _this.options.initialEnd);
            });
            this._setInitAttr(1);
            this._events(this.$handle2);
        }
        if (!isDbl) {
            this._setHandlePos(this.$handle, this.options.initialStart, true);
        }
    };
    Slider.prototype._setHandlePos = function($hndl, location, noInvert, cb) {
        location = parseFloat(location);
        if (location < this.options.start) {
            location = this.options.start;
        } else if (location > this.options.end) {
            location = this.options.end;
        }
        var isDbl = this.options.doubleSided, callback = cb || null;
        if (isDbl) {
            if (this.handles.index($hndl) === 0) {
                var h2Val = parseFloat(this.$handle2.attr("aria-valuenow"));
                location = location >= h2Val ? h2Val - this.options.step : location;
            } else {
                var h1Val = parseFloat(this.$handle.attr("aria-valuenow"));
                location = location <= h1Val ? h1Val + this.options.step : location;
            }
        }
        if (this.options.vertical && !noInvert) {
            location = this.options.end - location;
        }
        var _this = this, vert = this.options.vertical, hOrW = vert ? "height" : "width", lOrT = vert ? "top" : "left", halfOfHandle = $hndl[0].getBoundingClientRect()[hOrW] / 2, elemDim = this.$element[0].getBoundingClientRect()[hOrW], pctOfBar = percent(location, this.options.end).toFixed(2), pxToMove = (elemDim - halfOfHandle) * pctOfBar, movement = (percent(pxToMove, elemDim) * 100).toFixed(this.options.decimal), location = location > 0 ? parseFloat(location.toFixed(this.options.decimal)) : 0, anim, prog, start = null, css = {};
        this._setValues($hndl, location);
        if (this.options.doubleSided) {
            var isLeftHndl = this.handles.index($hndl) === 0, dim, idx = this.handles.index($hndl);
            if (isLeftHndl) {
                css[lOrT] = (pctOfBar > 0 ? pctOfBar * 100 : 0) + "%";
                dim = ((percent(this.$handle2.position()[lOrT] + halfOfHandle, elemDim) - parseFloat(pctOfBar)) * 100).toFixed(this.options.decimal) + "%";
                css["min-" + hOrW] = dim;
                if (cb && typeof cb === "function") {
                    cb();
                }
            } else {
                var handleLeft = parseFloat(this.$handle[0].style.left);
                location = (location < 100 ? location : 100) - (!isNaN(handleLeft) ? handleLeft : this.options.end - location);
                css["min-" + hOrW] = location + "%";
            }
        }
        this.$element.one("finished.zf.animate", function() {
            _this.animComplete = true;
            _this.$element.trigger("moved.zf.slider", [ $hndl ]);
        });
        var moveTime = _this.$element.data("dragging") ? 1e3 / 60 : _this.options.moveTime;
        Foundation.Move(moveTime, $hndl, function() {
            $hndl.css(lOrT, movement + "%");
            if (!_this.options.doubleSided) {
                _this.$fill.css(hOrW, pctOfBar * 100 + "%");
            } else {
                _this.$fill.css(css);
            }
        });
    };
    Slider.prototype._setInitAttr = function(idx) {
        var id = this.inputs.eq(idx).attr("id") || Foundation.GetYoDigits(6, "slider");
        this.inputs.eq(idx).attr({
            id: id,
            max: this.options.end,
            min: this.options.start
        });
        this.handles.eq(idx).attr({
            role: "slider",
            "aria-controls": id,
            "aria-valuemax": this.options.end,
            "aria-valuemin": this.options.start,
            "aria-valuenow": idx === 0 ? this.options.initialStart : this.options.initialEnd,
            "aria-orientation": this.options.vertical ? "vertical" : "horizontal",
            tabindex: 0
        });
    };
    Slider.prototype._setValues = function($handle, val) {
        var idx = this.options.doubleSided ? this.handles.index($handle) : 0;
        this.inputs.eq(idx).val(val);
        $handle.attr("aria-valuenow", val);
    };
    Slider.prototype._handleEvent = function(e, $handle, val) {
        var value, hasVal;
        if (!val) {
            e.preventDefault();
            var _this = this, vertical = this.options.vertical, param = vertical ? "height" : "width", direction = vertical ? "top" : "left", pageXY = vertical ? e.pageY : e.pageX, halfOfHandle = this.$handle[0].getBoundingClientRect()[param] / 2, barDim = this.$element[0].getBoundingClientRect()[param], barOffset = this.$element.offset()[direction] - pageXY, barXY = barOffset > 0 ? -halfOfHandle : barOffset - halfOfHandle < -barDim ? barDim : Math.abs(barOffset), offsetPct = percent(barXY, barDim);
            value = (this.options.end - this.options.start) * offsetPct;
            hasVal = false;
            if (!$handle) {
                var firstHndlPos = absPosition(this.$handle, direction, barXY, param), secndHndlPos = absPosition(this.$handle2, direction, barXY, param);
                $handle = firstHndlPos <= secndHndlPos ? this.$handle : this.$handle2;
            }
        } else {
            value = val;
            hasVal = true;
        }
        this._setHandlePos($handle, value, hasVal);
    };
    Slider.prototype._events = function($handle) {
        if (this.options.disabled) {
            return false;
        }
        var _this = this, curHandle, timer;
        this.inputs.off("change.zf.slider").on("change.zf.slider", function(e) {
            var idx = _this.inputs.index($(this));
            _this._handleEvent(e, _this.handles.eq(idx), $(this).val());
        });
        if (this.options.clickSelect) {
            this.$element.off("click.zf.slider").on("click.zf.slider", function(e) {
                if (_this.$element.data("dragging")) {
                    return false;
                }
                _this.animComplete = false;
                if (_this.options.doubleSided) {
                    _this._handleEvent(e);
                } else {
                    _this._handleEvent(e, _this.$handle);
                }
            });
        }
        if (this.options.draggable) {
            this.handles.addTouch();
            var $body = $("body");
            $handle.off("mousedown.zf.slider").on("mousedown.zf.slider", function(e) {
                $handle.addClass("is-dragging");
                _this.$fill.addClass("is-dragging");
                _this.$element.data("dragging", true);
                _this.animComplete = false;
                curHandle = $(e.currentTarget);
                $body.on("mousemove.zf.slider", function(e) {
                    e.preventDefault();
                    _this._handleEvent(e, curHandle);
                }).on("mouseup.zf.slider", function(e) {
                    _this.animComplete = true;
                    _this._handleEvent(e, curHandle);
                    $handle.removeClass("is-dragging");
                    _this.$fill.removeClass("is-dragging");
                    _this.$element.data("dragging", false);
                    $body.off("mousemove.zf.slider mouseup.zf.slider");
                });
            });
        }
        $handle.off("keydown.zf.slider").on("keydown.zf.slider", function(e) {
            var idx = _this.options.doubleSided ? _this.handles.index($(this)) : 0, oldValue = parseFloat(_this.inputs.eq(idx).val()), newValue;
            var _$handle = $(this);
            Foundation.Keyboard.handleKey(e, "Slider", {
                decrease: function() {
                    newValue = oldValue - _this.options.step;
                },
                increase: function() {
                    newValue = oldValue + _this.options.step;
                },
                decrease_fast: function() {
                    newValue = oldValue - _this.options.step * 10;
                },
                increase_fast: function() {
                    newValue = oldValue + _this.options.step * 10;
                },
                handled: function() {
                    e.preventDefault();
                    _this._setHandlePos(_$handle, newValue, true);
                }
            });
        });
    };
    Slider.prototype.destroy = function() {
        this.handles.off(".zf.slider");
        this.inputs.off(".zf.slider");
        this.$element.off(".zf.slider");
        Foundation.unregisterPlugin(this);
    };
    Foundation.plugin(Slider, "Slider");
    function percent(frac, num) {
        return frac / num;
    }
    function absPosition($handle, dir, clickPos, param) {
        return Math.abs($handle.position()[dir] + $handle[param]() / 2 - clickPos);
    }
}(jQuery, window.Foundation);

!function($, Foundation) {
    "use strict";
    function Sticky(element, options) {
        this.$element = element;
        this.options = $.extend({}, Sticky.defaults, this.$element.data(), options);
        this._init();
        Foundation.registerPlugin(this, "Sticky");
    }
    Sticky.defaults = {
        container: "<div data-sticky-container></div>",
        stickTo: "top",
        anchor: "",
        topAnchor: "",
        btmAnchor: "",
        marginTop: 1,
        marginBottom: 1,
        stickyOn: "medium",
        stickyClass: "sticky",
        containerClass: "sticky-container",
        checkEvery: -1
    };
    Sticky.prototype._init = function() {
        var $parent = this.$element.parent("[data-sticky-container]"), id = this.$element[0].id || Foundation.GetYoDigits(6, "sticky"), _this = this;
        if (!$parent.length) {
            this.wasWrapped = true;
        }
        this.$container = $parent.length ? $parent : $(this.options.container).wrapInner(this.$element);
        this.$container.addClass(this.options.containerClass);
        this.$element.addClass(this.options.stickyClass).attr({
            "data-resize": id
        });
        this.scrollCount = this.options.checkEvery;
        this.isStuck = false;
        if (this.options.anchor !== "") {
            this.$anchor = $("#" + this.options.anchor);
        } else {
            this._parsePoints();
        }
        this._setSizes(function() {
            _this._calc(false);
        });
        this._events(id.split("-").reverse().join("-"));
    };
    Sticky.prototype._parsePoints = function() {
        var top = this.options.topAnchor, btm = this.options.btmAnchor, pts = [ top, btm ], breaks = {};
        if (top && btm) {
            for (var i = 0, len = pts.length; i < len && pts[i]; i++) {
                var pt;
                if (typeof pts[i] === "number") {
                    pt = pts[i];
                } else {
                    var place = pts[i].split(":"), anchor = $("#" + place[0]);
                    pt = anchor.offset().top;
                    if (place[1] && place[1].toLowerCase() === "bottom") {
                        pt += anchor[0].getBoundingClientRect().height;
                    }
                }
                breaks[i] = pt;
            }
        } else {
            breaks = {
                0: 1,
                1: document.documentElement.scrollHeight
            };
        }
        this.points = breaks;
        return;
    };
    Sticky.prototype._events = function(id) {
        var _this = this, scrollListener = this.scrollListener = "scroll.zf." + id;
        if (this.isOn) {
            return;
        }
        if (this.canStick) {
            this.isOn = true;
            $(window).off(scrollListener).on(scrollListener, function(e) {
                if (_this.scrollCount === 0) {
                    _this.scrollCount = _this.options.checkEvery;
                    _this._setSizes(function() {
                        _this._calc(false, window.pageYOffset);
                    });
                } else {
                    _this.scrollCount--;
                    _this._calc(false, window.pageYOffset);
                }
            });
        }
        this.$element.off("resizeme.zf.trigger").on("resizeme.zf.trigger", function(e, el) {
            _this._setSizes(function() {
                _this._calc(false);
                if (_this.canStick) {
                    if (!_this.isOn) {
                        _this._events(id);
                    }
                } else if (_this.isOn) {
                    _this._pauseListeners(scrollListener);
                }
            });
        });
    };
    Sticky.prototype._pauseListeners = function(scrollListener) {
        this.isOn = false;
        $(window).off(scrollListener);
        this.$element.trigger("pause.zf.sticky");
    };
    Sticky.prototype._calc = function(checkSizes, scroll) {
        if (checkSizes) {
            this._setSizes();
        }
        if (!this.canStick) {
            if (this.isStuck) {
                this._removeSticky(true);
            }
            return false;
        }
        if (!scroll) {
            scroll = window.pageYOffset;
        }
        if (scroll >= this.topPoint) {
            if (scroll <= this.bottomPoint) {
                if (!this.isStuck) {
                    this._setSticky();
                }
            } else {
                if (this.isStuck) {
                    this._removeSticky(false);
                }
            }
        } else {
            if (this.isStuck) {
                this._removeSticky(true);
            }
        }
    };
    Sticky.prototype._setSticky = function() {
        var stickTo = this.options.stickTo, mrgn = stickTo === "top" ? "marginTop" : "marginBottom", notStuckTo = stickTo === "top" ? "bottom" : "top", css = {};
        css[mrgn] = this.options[mrgn] + "em";
        css[stickTo] = 0;
        css[notStuckTo] = "auto";
        css["left"] = this.$container.offset().left + parseInt(window.getComputedStyle(this.$container[0])["padding-left"], 10);
        this.isStuck = true;
        this.$element.removeClass("is-anchored is-at-" + notStuckTo).addClass("is-stuck is-at-" + stickTo).css(css).trigger("sticky.zf.stuckto:" + stickTo);
    };
    Sticky.prototype._removeSticky = function(isTop) {
        var stickTo = this.options.stickTo, stickToTop = stickTo === "top", css = {}, anchorPt = (this.points ? this.points[1] - this.points[0] : this.anchorHeight) - this.elemHeight, mrgn = stickToTop ? "marginTop" : "marginBottom", notStuckTo = stickToTop ? "bottom" : "top", topOrBottom = isTop ? "top" : "bottom";
        css[mrgn] = 0;
        if (isTop && !stickToTop || stickToTop && !isTop) {
            css[stickTo] = anchorPt;
            css[notStuckTo] = 0;
        } else {
            css[stickTo] = 0;
            css[notStuckTo] = anchorPt;
        }
        css["left"] = "";
        this.isStuck = false;
        this.$element.removeClass("is-stuck is-at-" + stickTo).addClass("is-anchored is-at-" + topOrBottom).css(css).trigger("sticky.zf.unstuckfrom:" + topOrBottom);
    };
    Sticky.prototype._setSizes = function(cb) {
        this.canStick = Foundation.MediaQuery.atLeast(this.options.stickyOn);
        if (!this.canStick) {
            cb();
        }
        var _this = this, newElemWidth = this.$container[0].getBoundingClientRect().width, comp = window.getComputedStyle(this.$container[0]), pdng = parseInt(comp["padding-right"], 10);
        if (this.$anchor && this.$anchor.length) {
            this.anchorHeight = this.$anchor[0].getBoundingClientRect().height;
        } else {
            this._parsePoints();
        }
        this.$element.css({
            "max-width": newElemWidth - pdng + "px"
        });
        var newContainerHeight = this.$element[0].getBoundingClientRect().height || this.containerHeight;
        this.containerHeight = newContainerHeight;
        this.$container.css({
            height: newContainerHeight
        });
        this.elemHeight = newContainerHeight;
        if (this.isStuck) {
            this.$element.css({
                left: this.$container.offset().left + parseInt(comp["padding-left"], 10)
            });
        }
        this._setBreakPoints(newContainerHeight, function() {
            if (cb) {
                cb();
            }
        });
    };
    Sticky.prototype._setBreakPoints = function(elemHeight, cb) {
        if (!this.canStick) {
            if (cb) {
                cb();
            } else {
                return false;
            }
        }
        var mTop = emCalc(this.options.marginTop), mBtm = emCalc(this.options.marginBottom), topPoint = this.points ? this.points[0] : this.$anchor.offset().top, bottomPoint = this.points ? this.points[1] : topPoint + this.anchorHeight, winHeight = window.innerHeight;
        if (this.options.stickTo === "top") {
            topPoint -= mTop;
            bottomPoint -= elemHeight + mTop;
        } else if (this.options.stickTo === "bottom") {
            topPoint -= winHeight - (elemHeight + mBtm);
            bottomPoint -= winHeight - mBtm;
        } else {}
        this.topPoint = topPoint;
        this.bottomPoint = bottomPoint;
        if (cb) {
            cb();
        }
    };
    Sticky.prototype.destroy = function() {
        this._removeSticky(true);
        this.$element.removeClass(this.options.stickyClass + " is-anchored is-at-top").css({
            height: "",
            top: "",
            bottom: "",
            "max-width": ""
        }).off("resizeme.zf.trigger");
        this.$anchor.off("change.zf.sticky");
        $(window).off(this.scrollListener);
        if (this.wasWrapped) {
            this.$element.unwrap();
        } else {
            this.$container.removeClass(this.options.containerClass).css({
                height: ""
            });
        }
        Foundation.unregisterPlugin(this);
    };
    function emCalc(em) {
        return parseInt(window.getComputedStyle(document.body, null).fontSize, 10) * em;
    }
    Foundation.plugin(Sticky, "Sticky");
}(jQuery, window.Foundation);

!function($, Foundation) {
    "use strict";
    function Tabs(element, options) {
        this.$element = element;
        this.options = $.extend({}, Tabs.defaults, this.$element.data(), options);
        this._init();
        Foundation.registerPlugin(this, "Tabs");
        Foundation.Keyboard.register("Tabs", {
            ENTER: "open",
            SPACE: "open",
            ARROW_RIGHT: "next",
            ARROW_UP: "previous",
            ARROW_DOWN: "next",
            ARROW_LEFT: "previous"
        });
    }
    Tabs.defaults = {
        autoFocus: false,
        wrapOnKeys: true,
        matchHeight: false,
        linkClass: "tabs-title",
        panelClass: "tabs-panel"
    };
    Tabs.prototype._init = function() {
        var _this = this;
        this.$tabTitles = this.$element.find("." + this.options.linkClass);
        this.$tabContent = $('[data-tabs-content="' + this.$element[0].id + '"]');
        this.$tabTitles.each(function() {
            var $elem = $(this), $link = $elem.find("a"), isActive = $elem.hasClass("is-active"), hash = $link.attr("href").slice(1), linkId = hash + "-label", $tabContent = $(hash);
            $elem.attr({
                role: "presentation"
            });
            $link.attr({
                role: "tab",
                "aria-controls": hash,
                "aria-selected": isActive,
                id: linkId
            });
            $tabContent.attr({
                role: "tabpanel",
                "aria-hidden": !isActive,
                "aria-labelledby": linkId
            });
            if (isActive && _this.options.autoFocus) {
                $link.focus();
            }
        });
        if (this.options.matchHeight) {
            var $images = this.$tabContent.find("img");
            if ($images.length) {
                Foundation.onImagesLoaded($images, this._setHeight.bind(this));
            } else {
                this._setHeight();
            }
        }
        this._events();
    };
    Tabs.prototype._events = function() {
        this._addKeyHandler();
        this._addClickHandler();
        if (this.options.matchHeight) {
            $(window).on("changed.zf.mediaquery", this._setHeight.bind(this));
        }
    };
    Tabs.prototype._addClickHandler = function() {
        var _this = this;
        this.$element.off("click.zf.tabs").on("click.zf.tabs", "." + this.options.linkClass, function(e) {
            e.preventDefault();
            e.stopPropagation();
            if ($(this).hasClass("is-active")) {
                return;
            }
            _this._handleTabChange($(this));
        });
    };
    Tabs.prototype._addKeyHandler = function() {
        var _this = this;
        var $firstTab = _this.$element.find("li:first-of-type");
        var $lastTab = _this.$element.find("li:last-of-type");
        this.$tabTitles.off("keydown.zf.tabs").on("keydown.zf.tabs", function(e) {
            if (e.which === 9) return;
            e.stopPropagation();
            e.preventDefault();
            var $element = $(this), $elements = $element.parent("ul").children("li"), $prevElement, $nextElement;
            $elements.each(function(i) {
                if ($(this).is($element)) {
                    if (_this.options.wrapOnKeys) {
                        $prevElement = i === 0 ? $elements.last() : $elements.eq(i - 1);
                        $nextElement = i === $elements.length - 1 ? $elements.first() : $elements.eq(i + 1);
                    } else {
                        $prevElement = $elements.eq(Math.max(0, i - 1));
                        $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1));
                    }
                    return;
                }
            });
            Foundation.Keyboard.handleKey(e, "Tabs", {
                open: function() {
                    $element.find('[role="tab"]').focus();
                    _this._handleTabChange($element);
                },
                previous: function() {
                    $prevElement.find('[role="tab"]').focus();
                    _this._handleTabChange($prevElement);
                },
                next: function() {
                    $nextElement.find('[role="tab"]').focus();
                    _this._handleTabChange($nextElement);
                }
            });
        });
    };
    Tabs.prototype._handleTabChange = function($target) {
        var $tabLink = $target.find('[role="tab"]'), hash = $tabLink.attr("href"), $targetContent = $(hash), $oldTab = this.$element.find("." + this.options.linkClass + ".is-active").removeClass("is-active").find('[role="tab"]').attr({
            "aria-selected": "false"
        }).attr("href");
        $($oldTab).removeClass("is-active").attr({
            "aria-hidden": "true"
        });
        $target.addClass("is-active");
        $tabLink.attr({
            "aria-selected": "true"
        });
        $targetContent.addClass("is-active").attr({
            "aria-hidden": "false"
        });
        this.$element.trigger("change.zf.tabs", [ $target ]);
    };
    Tabs.prototype.selectTab = function(elem) {
        var idStr;
        if (typeof elem === "object") {
            idStr = elem[0].id;
        } else {
            idStr = elem;
        }
        if (idStr.indexOf("#") < 0) {
            idStr = "#" + idStr;
        }
        var $target = this.$tabTitles.find('[href="' + idStr + '"]').parent("." + this.options.linkClass);
        this._handleTabChange($target);
    };
    Tabs.prototype._setHeight = function() {
        var max = 0;
        this.$tabContent.find("." + this.options.panelClass).css("height", "").each(function() {
            var panel = $(this), isActive = panel.hasClass("is-active");
            if (!isActive) {
                panel.css({
                    visibility: "hidden",
                    display: "block"
                });
            }
            var temp = this.getBoundingClientRect().height;
            if (!isActive) {
                panel.css({
                    visibility: "",
                    display: ""
                });
            }
            max = temp > max ? temp : max;
        }).css("height", max + "px");
    };
    Tabs.prototype.destroy = function() {
        this.$element.find("." + this.options.linkClass).off(".zf.tabs").hide().end().find("." + this.options.panelClass).hide();
        if (this.options.matchHeight) {
            $(window).off("changed.zf.mediaquery");
        }
        Foundation.unregisterPlugin(this);
    };
    Foundation.plugin(Tabs, "Tabs");
    function checkClass($elem) {
        return $elem.hasClass("is-active");
    }
}(jQuery, window.Foundation);

!function(Foundation, $) {
    "use strict";
    function Toggler(element, options) {
        this.$element = element;
        this.options = $.extend({}, Toggler.defaults, element.data(), options);
        this.className = "";
        this._init();
        this._events();
        Foundation.registerPlugin(this, "Toggler");
    }
    Toggler.defaults = {
        animate: false
    };
    Toggler.prototype._init = function() {
        var input;
        if (this.options.animate) {
            input = this.options.animate.split(" ");
            this.animationIn = input[0];
            this.animationOut = input[1] || null;
        } else {
            input = this.$element.data("toggler");
            this.className = input[0] === "." ? input.slice(1) : input;
        }
        var id = this.$element[0].id;
        $('[data-open="' + id + '"], [data-close="' + id + '"], [data-toggle="' + id + '"]').attr("aria-controls", id);
        this.$element.attr("aria-expanded", this.$element.is(":hidden") ? false : true);
    };
    Toggler.prototype._events = function() {
        this.$element.off("toggle.zf.trigger").on("toggle.zf.trigger", this.toggle.bind(this));
    };
    Toggler.prototype.toggle = function() {
        this[this.options.animate ? "_toggleAnimate" : "_toggleClass"]();
    };
    Toggler.prototype._toggleClass = function() {
        this.$element.toggleClass(this.className);
        var isOn = this.$element.hasClass(this.className);
        if (isOn) {
            this.$element.trigger("on.zf.toggler");
        } else {
            this.$element.trigger("off.zf.toggler");
        }
        this._updateARIA(isOn);
    };
    Toggler.prototype._toggleAnimate = function() {
        var _this = this;
        if (this.$element.is(":hidden")) {
            Foundation.Motion.animateIn(this.$element, this.animationIn, function() {
                this.trigger("on.zf.toggler");
                _this._updateARIA(true);
            });
        } else {
            Foundation.Motion.animateOut(this.$element, this.animationOut, function() {
                this.trigger("off.zf.toggler");
                _this._updateARIA(false);
            });
        }
    };
    Toggler.prototype._updateARIA = function(isOn) {
        this.$element.attr("aria-expanded", isOn ? true : false);
    };
    Toggler.prototype.destroy = function() {
        this.$element.off(".zf.toggler");
        Foundation.unregisterPlugin(this);
    };
    Foundation.plugin(Toggler, "Toggler");
    if (typeof module !== "undefined" && typeof module.exports !== "undefined") module.exports = Toggler;
    if (typeof define === "function") define([ "foundation" ], function() {
        return Toggler;
    });
}(Foundation, jQuery);

!function($, document, Foundation) {
    "use strict";
    function Tooltip(element, options) {
        this.$element = element;
        this.options = $.extend({}, Tooltip.defaults, this.$element.data(), options);
        this.isActive = false;
        this.isClick = false;
        this._init();
        Foundation.registerPlugin(this, "Tooltip");
    }
    Tooltip.defaults = {
        disableForTouch: false,
        hoverDelay: 200,
        fadeInDuration: 150,
        fadeOutDuration: 150,
        disableHover: false,
        templateClasses: "",
        tooltipClass: "tooltip",
        triggerClass: "has-tip",
        showOn: "small",
        template: "",
        tipText: "",
        touchCloseText: "Tap to close.",
        clickOpen: true,
        positionClass: "",
        vOffset: 10,
        hOffset: 12
    };
    Tooltip.prototype._init = function() {
        var elemId = this.$element.attr("aria-describedby") || Foundation.GetYoDigits(6, "tooltip");
        this.options.positionClass = this._getPositionClass(this.$element);
        this.options.tipText = this.options.tipText || this.$element.attr("title");
        this.template = this.options.template ? $(this.options.template) : this._buildTemplate(elemId);
        this.template.appendTo(document.body).text(this.options.tipText).hide();
        this.$element.attr({
            title: "",
            "aria-describedby": elemId,
            "data-yeti-box": elemId,
            "data-toggle": elemId,
            "data-resize": elemId
        }).addClass(this.triggerClass);
        this.usedPositions = [];
        this.counter = 4;
        this.classChanged = false;
        this._events();
    };
    Tooltip.prototype._getPositionClass = function(element) {
        if (!element) {
            return "";
        }
        var position = element[0].className.match(/(top|left|right)/g);
        position = position ? position[0] : "";
        return position;
    };
    Tooltip.prototype._buildTemplate = function(id) {
        var templateClasses = (this.options.tooltipClass + " " + this.options.positionClass).trim();
        var $template = $("<div></div>").addClass(templateClasses).attr({
            role: "tooltip",
            "aria-hidden": true,
            "data-is-active": false,
            "data-is-focus": false,
            id: id
        });
        return $template;
    };
    Tooltip.prototype._reposition = function(position) {
        this.usedPositions.push(position ? position : "bottom");
        if (!position && this.usedPositions.indexOf("top") < 0) {
            this.template.addClass("top");
        } else if (position === "top" && this.usedPositions.indexOf("bottom") < 0) {
            this.template.removeClass(position);
        } else if (position === "left" && this.usedPositions.indexOf("right") < 0) {
            this.template.removeClass(position).addClass("right");
        } else if (position === "right" && this.usedPositions.indexOf("left") < 0) {
            this.template.removeClass(position).addClass("left");
        } else if (!position && this.usedPositions.indexOf("top") > -1 && this.usedPositions.indexOf("left") < 0) {
            this.template.addClass("left");
        } else if (position === "top" && this.usedPositions.indexOf("bottom") > -1 && this.usedPositions.indexOf("left") < 0) {
            this.template.removeClass(position).addClass("left");
        } else if (position === "left" && this.usedPositions.indexOf("right") > -1 && this.usedPositions.indexOf("bottom") < 0) {
            this.template.removeClass(position);
        } else if (position === "right" && this.usedPositions.indexOf("left") > -1 && this.usedPositions.indexOf("bottom") < 0) {
            this.template.removeClass(position);
        } else {
            this.template.removeClass(position);
        }
        this.classChanged = true;
        this.counter--;
    };
    Tooltip.prototype._setPosition = function() {
        var position = this._getPositionClass(this.template), $tipDims = Foundation.Box.GetDimensions(this.template), $anchorDims = Foundation.Box.GetDimensions(this.$element), direction = position === "left" ? "left" : position === "right" ? "left" : "top", param = direction === "top" ? "height" : "width", offset = param === "height" ? this.options.vOffset : this.options.hOffset, _this = this;
        if ($tipDims.width >= $tipDims.windowDims.width || !this.counter && !Foundation.Box.ImNotTouchingYou(this.template)) {
            this.template.offset(Foundation.Box.GetOffsets(this.template, this.$element, "center bottom", this.options.vOffset, this.options.hOffset, true)).css({
                width: $anchorDims.windowDims.width - this.options.hOffset * 2,
                height: "auto"
            });
            return false;
        }
        this.template.offset(Foundation.Box.GetOffsets(this.template, this.$element, "center " + (position || "bottom"), this.options.vOffset, this.options.hOffset));
        while (!Foundation.Box.ImNotTouchingYou(this.template) && this.counter) {
            this._reposition(position);
            this._setPosition();
        }
    };
    Tooltip.prototype.show = function() {
        if (this.options.showOn !== "all" && !Foundation.MediaQuery.atLeast(this.options.showOn)) {
            return false;
        }
        var _this = this;
        this.template.css("visibility", "hidden").show();
        this._setPosition();
        this.$element.trigger("closeme.zf.tooltip", this.template.attr("id"));
        this.template.attr({
            "data-is-active": true,
            "aria-hidden": false
        });
        _this.isActive = true;
        this.template.stop().hide().css("visibility", "").fadeIn(this.options.fadeInDuration, function() {});
        this.$element.trigger("show.zf.tooltip");
    };
    Tooltip.prototype.hide = function() {
        var _this = this;
        this.template.stop().attr({
            "aria-hidden": true,
            "data-is-active": false
        }).fadeOut(this.options.fadeOutDuration, function() {
            _this.isActive = false;
            _this.isClick = false;
            if (_this.classChanged) {
                _this.template.removeClass(_this._getPositionClass(_this.template)).addClass(_this.options.positionClass);
                _this.usedPositions = [];
                _this.counter = 4;
                _this.classChanged = false;
            }
        });
        this.$element.trigger("hide.zf.tooltip");
    };
    Tooltip.prototype._events = function() {
        var _this = this;
        var $template = this.template;
        var isFocus = false;
        if (!this.options.disableHover) {
            this.$element.on("mouseenter.zf.tooltip", function(e) {
                if (!_this.isActive) {
                    _this.timeout = setTimeout(function() {
                        _this.show();
                    }, _this.options.hoverDelay);
                }
            }).on("mouseleave.zf.tooltip", function(e) {
                clearTimeout(_this.timeout);
                if (!isFocus || !_this.isClick && _this.options.clickOpen) {
                    _this.hide();
                }
            });
        }
        if (this.options.clickOpen) {
            this.$element.on("mousedown.zf.tooltip", function(e) {
                e.stopImmediatePropagation();
                if (_this.isClick) {
                    _this.hide();
                } else {
                    _this.isClick = true;
                    if ((_this.options.disableHover || !_this.$element.attr("tabindex")) && !_this.isActive) {
                        _this.show();
                    }
                }
            });
        }
        if (!this.options.disableForTouch) {
            this.$element.on("tap.zf.tooltip touchend.zf.tooltip", function(e) {
                _this.isActive ? _this.hide() : _this.show();
            });
        }
        this.$element.on({
            "close.zf.trigger": this.hide.bind(this)
        });
        this.$element.on("focus.zf.tooltip", function(e) {
            isFocus = true;
            if (_this.isClick) {
                return false;
            } else {
                _this.show();
            }
        }).on("focusout.zf.tooltip", function(e) {
            isFocus = false;
            _this.isClick = false;
            _this.hide();
        }).on("resizeme.zf.trigger", function() {
            if (_this.isActive) {
                _this._setPosition();
            }
        });
    };
    Tooltip.prototype.toggle = function() {
        if (this.isActive) {
            this.hide();
        } else {
            this.show();
        }
    };
    Tooltip.prototype.destroy = function() {
        this.$element.attr("title", this.template.text()).off(".zf.trigger .zf.tootip").removeAttr("aria-describedby").removeAttr("data-yeti-box").removeAttr("data-toggle").removeAttr("data-resize");
        this.template.remove();
        Foundation.unregisterPlugin(this);
    };
    Foundation.plugin(Tooltip, "Tooltip");
}(jQuery, window.document, window.Foundation);

(function(CMS) {
    CMS.environment = {
        TOUCH_DOWN_EVENT_NAME: "mousedown touchstart",
        TOUCH_UP_EVENT_NAME: "mouseup touchend",
        TOUCH_MOVE_EVENT_NAME: "mousemove touchmove",
        TOUCH_DOUBLE_TAB_EVENT_NAME: "dblclick dbltap",
        isAndroid: function() {
            return navigator.userAgent.match(/Android/i);
        },
        isBlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        isIOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        isOpera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        isWindows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        isMobile: function() {
            if (CMS.environment.isAndroid() || CMS.environment.isBlackBerry() || CMS.environment.isIOS() || CMS.environment.isOpera() || CMS.environment.isWindows()) {
                return true;
            }
            return false;
        }
    };
})(window.CMS = window.CMS || {});

(function(CMS) {
    CMS.Supports = {
        touch: "ontouchstart" in document.documentElement || (window.DocumentTouch && document instanceof DocumentTouch ? true : false),
        touch2: "onorientationchange" in window && "ontouchstart" in window ? true : false,
        isAndroidNativeBrowser: function() {
            var ua = navigator.userAgent.toLowerCase();
            return ua.indexOf("android") != -1 && ua.indexOf("mobile") != -1 && ua.indexOf("chrome") == -1;
        }(),
        viewportW: function() {
            var a = document.documentElement.clientWidth, b = window.innerWidth;
            return a < b ? b : a;
        },
        viewportH: function() {
            var a = document.documentElement.clientHeight, b = window.innerHeight;
            return a < b ? b : a;
        }
    };
})(window.CMS = window.CMS || {});

(function(window) {
    if (!window.console) {
        console = {};
    }
    var funcs = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","), stub = function() {};
    for (var i = 0; i < funcs.length; i++) {
        if (!console[funcs[i]]) {
            console[funcs[i]] = stub;
        }
    }
})(window);

Function.prototype.debounce = function(milliseconds) {
    var baseFunction = this, timer = null, wait = milliseconds;
    return function() {
        var self = this, args = arguments;
        function complete() {
            baseFunction.apply(self, args);
            timer = null;
        }
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(complete, wait);
    };
};

Function.prototype.throttle = function(milliseconds) {
    var baseFunction = this, lastEventTimestamp = null, limit = milliseconds;
    return function() {
        var self = this, args = arguments, now = Date.now();
        if (!lastEventTimestamp || now - lastEventTimestamp >= limit) {
            lastEventTimestamp = now;
            baseFunction.apply(self, args);
        }
    };
};

var notifications = window.notifications || {};

(function($, f) {
    "use strict";
    var events = {
        eventListeners: [],
        addListener: function(type, handler, destroyOnUse) {
            if (!events.listenerExists(type, handler)) {
                events.eventListeners.push({
                    destroyOnUse: destroyOnUse,
                    handler: handler,
                    type: type
                });
            }
        },
        listenerExists: function(type, handler) {
            var listener = {};
            for (var i = 0, n = events.eventListeners.length; i < n; i += 1) {
                listener = events.eventListeners[i];
                if (type === listener.type && handler === listener.handler) {
                    return true;
                }
            }
            return false;
        },
        removeListener: function(type, handler) {
            var listener = {};
            for (var i = 0, n = events.eventListeners.length; i < n; i += 1) {
                listener = events.eventListeners[i];
                if (type === listener.type && handler === listener.handler) {
                    events.eventListeners.splice(i, 1);
                    return;
                }
            }
        },
        sendNotification: function(type, params) {
            var listener = {};
            var handler;
            for (var i = events.eventListeners.length - 1; i >= 0; i -= 1) {
                listener = events.eventListeners[i];
                if (type === listener.type) {
                    handler = listener.handler;
                    if (listener.destroyOnUse) {
                        events.removeListener(listener.type, listener.handler);
                    }
                    handler(params);
                }
            }
        }
    };
    window.notifications = {
        sendNotification: function(type, params) {
            events.sendNotification(type, params);
        },
        addListener: function(type, handler, destroyOnUse) {
            if (destroyOnUse !== true) {
                destroyOnUse = false;
            }
            events.addListener(type, handler, destroyOnUse);
        },
        removeListener: function(type, handler) {
            events.removeListener(type, handler);
        },
        WINDOW_RESIZE: "WINDOW_RESIZE"
    };
})(window.CMS = window.CMS || {}, jQuery);

(function($, sr) {
    var debounce = function(func, threshold, execAsap) {
        var timeout;
        return function debounced() {
            var obj = this, args = arguments;
            function delayed() {
                if (!execAsap) {
                    func.apply(obj, args);
                }
                timeout = null;
            }
            if (timeout) {
                clearTimeout(timeout);
            } else if (execAsap) {
                func.apply(obj, args);
            }
            timeout = setTimeout(delayed, threshold || 100);
        };
    };
    jQuery.fn[sr] = function(fn) {
        return fn ? this.bind("resize", debounce(fn)) : this.trigger(sr);
    };
})(jQuery, "smartresize");

(function(win) {
    var doc = win.document;
    if (!win.navigator.standalone && !location.hash && win.addEventListener) {
        win.scrollTo(0, 1);
        var scrollTop = 1, getScrollTop = function() {
            return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
        }, bodycheck = setInterval(function() {
            if (doc.body) {
                clearInterval(bodycheck);
                scrollTop = getScrollTop();
                win.scrollTo(0, scrollTop === 1 ? 0 : 1);
            }
        }, 15);
        win.addEventListener("load", function() {
            setTimeout(function() {
                if (getScrollTop() < 20) {
                    win.scrollTo(0, scrollTop === 1 ? 0 : 1);
                }
            }, 0);
        }, false);
    }
})(this);

(function($) {
    "use strict";
    var UNDETERMINED_SCROLLOFFSET = -1;
    var IAS = function($element, options) {
        this.itemsContainerSelector = options.container;
        this.itemSelector = options.item;
        this.nextSelector = options.next;
        this.paginationSelector = options.pagination;
        this.$scrollContainer = $element;
        this.$container = window === $element.get(0) ? $(document) : $element;
        this.defaultDelay = options.delay;
        this.negativeMargin = options.negativeMargin;
        this.nextUrl = null;
        this.isBound = false;
        this.isPaused = false;
        this.isInitialized = false;
        this.listeners = {
            next: new IASCallbacks(),
            load: new IASCallbacks(),
            loaded: new IASCallbacks(),
            render: new IASCallbacks(),
            rendered: new IASCallbacks(),
            scroll: new IASCallbacks(),
            noneLeft: new IASCallbacks(),
            ready: new IASCallbacks()
        };
        this.extensions = [];
        this.scrollHandler = function() {
            if (!this.isBound || this.isPaused) {
                return;
            }
            var currentScrollOffset = this.getCurrentScrollOffset(this.$scrollContainer), scrollThreshold = this.getScrollThreshold();
            if (UNDETERMINED_SCROLLOFFSET == scrollThreshold) {
                return;
            }
            this.fire("scroll", [ currentScrollOffset, scrollThreshold ]);
            if (currentScrollOffset >= scrollThreshold) {
                this.next();
            }
        };
        this.getItemsContainer = function() {
            return $(this.itemsContainerSelector);
        };
        this.getLastItem = function() {
            return $(this.itemSelector, this.getItemsContainer().get(0)).last();
        };
        this.getFirstItem = function() {
            return $(this.itemSelector, this.getItemsContainer().get(0)).first();
        };
        this.getScrollThreshold = function(negativeMargin) {
            var $lastElement;
            negativeMargin = negativeMargin || this.negativeMargin;
            negativeMargin = negativeMargin >= 0 ? negativeMargin * -1 : negativeMargin;
            $lastElement = this.getLastItem();
            if (0 === $lastElement.length) {
                return UNDETERMINED_SCROLLOFFSET;
            }
            return $lastElement.offset().top + $lastElement.height() + negativeMargin;
        };
        this.getCurrentScrollOffset = function($container) {
            var scrollTop = 0, containerHeight = $container.height();
            if (window === $container.get(0)) {
                scrollTop = $container.scrollTop();
            } else {
                scrollTop = $container.offset().top;
            }
            if (navigator.platform.indexOf("iPhone") != -1 || navigator.platform.indexOf("iPod") != -1) {
                containerHeight += 80;
            }
            return scrollTop + containerHeight;
        };
        this.getNextUrl = function(container) {
            container = container || this.$container;
            return $(this.nextSelector, container).last().attr("href");
        };
        this.load = function(url, callback, delay) {
            var self = this, $itemContainer, items = [], timeStart = +new Date(), timeDiff;
            delay = delay || this.defaultDelay;
            var loadEvent = {
                url: url
            };
            self.fire("load", [ loadEvent ]);
            return $.get(loadEvent.url, null, $.proxy(function(data) {
                $itemContainer = $(this.itemsContainerSelector, data).eq(0);
                if (0 === $itemContainer.length) {
                    $itemContainer = $(data).filter(this.itemsContainerSelector).eq(0);
                }
                if ($itemContainer) {
                    $itemContainer.find(this.itemSelector).each(function() {
                        items.push(this);
                    });
                }
                self.fire("loaded", [ data, items ]);
                if (callback) {
                    timeDiff = +new Date() - timeStart;
                    if (timeDiff < delay) {
                        setTimeout(function() {
                            callback.call(self, data, items);
                        }, delay - timeDiff);
                    } else {
                        callback.call(self, data, items);
                    }
                }
            }, self), "html");
        };
        this.render = function(items, callback) {
            var self = this, $lastItem = this.getLastItem(), count = 0;
            var promise = this.fire("render", [ items ]);
            promise.done(function() {
                $(items).hide();
                $lastItem.after(items);
                $(items).fadeIn(400, function() {
                    if (++count < items.length) {
                        return;
                    }
                    self.fire("rendered", [ items ]);
                    if (callback) {
                        callback();
                    }
                });
            });
        };
        this.hidePagination = function() {
            if (this.paginationSelector) {
                $(this.paginationSelector, this.$container).hide();
            }
        };
        this.restorePagination = function() {
            if (this.paginationSelector) {
                $(this.paginationSelector, this.$container).show();
            }
        };
        this.throttle = function(callback, delay) {
            var lastExecutionTime = 0, wrapper, timerId;
            wrapper = function() {
                var that = this, args = arguments, diff = +new Date() - lastExecutionTime;
                function execute() {
                    lastExecutionTime = +new Date();
                    callback.apply(that, args);
                }
                if (!timerId) {
                    execute();
                } else {
                    clearTimeout(timerId);
                }
                if (diff > delay) {
                    execute();
                } else {
                    timerId = setTimeout(execute, delay);
                }
            };
            if ($.guid) {
                wrapper.guid = callback.guid = callback.guid || $.guid++;
            }
            return wrapper;
        };
        this.fire = function(event, args) {
            return this.listeners[event].fireWith(this, args);
        };
        this.pause = function() {
            this.isPaused = true;
        };
        this.resume = function() {
            this.isPaused = false;
        };
        return this;
    };
    IAS.prototype.initialize = function() {
        if (this.isInitialized) {
            return false;
        }
        var supportsOnScroll = !!("onscroll" in this.$scrollContainer.get(0)), currentScrollOffset = this.getCurrentScrollOffset(this.$scrollContainer), scrollThreshold = this.getScrollThreshold();
        if (!supportsOnScroll) {
            return false;
        }
        this.hidePagination();
        this.bind();
        this.fire("ready");
        this.nextUrl = this.getNextUrl();
        if (currentScrollOffset >= scrollThreshold) {
            this.next();
            this.one("rendered", function() {
                this.isInitialized = true;
            });
        } else {
            this.isInitialized = true;
        }
        return this;
    };
    IAS.prototype.reinitialize = function() {
        this.isInitialized = false;
        this.unbind();
        this.initialize();
    };
    IAS.prototype.bind = function() {
        if (this.isBound) {
            return;
        }
        this.$scrollContainer.on("scroll", $.proxy(this.throttle(this.scrollHandler, 150), this));
        for (var i = 0, l = this.extensions.length; i < l; i++) {
            this.extensions[i].bind(this);
        }
        this.isBound = true;
        this.resume();
    };
    IAS.prototype.unbind = function() {
        if (!this.isBound) {
            return;
        }
        this.$scrollContainer.off("scroll", this.scrollHandler);
        for (var i = 0, l = this.extensions.length; i < l; i++) {
            if (typeof this.extensions[i]["unbind"] != "undefined") {
                this.extensions[i].unbind(this);
            }
        }
        this.isBound = false;
    };
    IAS.prototype.destroy = function() {
        this.unbind();
        this.$scrollContainer.data("ias", null);
    };
    IAS.prototype.on = function(event, callback, priority) {
        if (typeof this.listeners[event] == "undefined") {
            throw new Error('There is no event called "' + event + '"');
        }
        priority = priority || 0;
        this.listeners[event].add($.proxy(callback, this), priority);
        return this;
    };
    IAS.prototype.one = function(event, callback) {
        var self = this;
        var remover = function() {
            self.off(event, callback);
            self.off(event, remover);
        };
        this.on(event, callback);
        this.on(event, remover);
        return this;
    };
    IAS.prototype.off = function(event, callback) {
        if (typeof this.listeners[event] == "undefined") {
            throw new Error('There is no event called "' + event + '"');
        }
        this.listeners[event].remove(callback);
        return this;
    };
    IAS.prototype.next = function() {
        var url = this.nextUrl, self = this;
        this.pause();
        if (!url) {
            this.fire("noneLeft", [ this.getLastItem() ]);
            this.listeners["noneLeft"].disable();
            self.resume();
            return false;
        }
        var promise = this.fire("next", [ url ]);
        promise.done(function() {
            self.load(url, function(data, items) {
                self.render(items, function() {
                    self.nextUrl = self.getNextUrl(data);
                    self.resume();
                });
            });
        });
        promise.fail(function() {
            self.resume();
        });
        return true;
    };
    IAS.prototype.extension = function(extension) {
        if (typeof extension["bind"] == "undefined") {
            throw new Error('Extension doesn\'t have required method "bind"');
        }
        if (typeof extension["initialize"] != "undefined") {
            extension.initialize(this);
        }
        this.extensions.push(extension);
        if (this.isInitialized) {
            this.reinitialize();
        }
        return this;
    };
    $.ias = function(option) {
        var $window = $(window);
        return $window.ias.apply($window, arguments);
    };
    $.fn.ias = function(option) {
        var args = Array.prototype.slice.call(arguments);
        var retval = this;
        this.each(function() {
            var $this = $(this), instance = $this.data("ias"), options = $.extend({}, $.fn.ias.defaults, $this.data(), typeof option == "object" && option);
            if (!instance) {
                $this.data("ias", instance = new IAS($this, options));
                $(document).ready($.proxy(instance.initialize, instance));
            }
            if (typeof option === "string") {
                if (typeof instance[option] !== "function") {
                    throw new Error('There is no method called "' + option + '"');
                }
                args.shift();
                instance[option].apply(instance, args);
            }
            retval = instance;
        });
        return retval;
    };
    $.fn.ias.defaults = {
        item: ".item",
        container: ".listing",
        next: ".next",
        pagination: false,
        delay: 600,
        negativeMargin: 10
    };
})(jQuery);

var IASCallbacks = function() {
    this.list = [];
    this.fireStack = [];
    this.isFiring = false;
    this.isDisabled = false;
    this.fire = function(args) {
        var context = args[0], deferred = args[1], callbackArguments = args[2];
        this.isFiring = true;
        for (var i = 0, l = this.list.length; i < l; i++) {
            if (this.list[i] != undefined) {
                if (false === this.list[i].fn.apply(context, callbackArguments)) {
                    deferred.reject();
                    break;
                }
            }
        }
        this.isFiring = false;
        deferred.resolve();
        if (this.fireStack.length) {
            this.fire(this.fireStack.shift());
        }
    };
    this.inList = function(callback, index) {
        index = index || 0;
        for (var i = index, length = this.list.length; i < length; i++) {
            if (this.list[i].fn === callback || callback.guid && this.list[i].fn.guid && callback.guid === this.list[i].fn.guid) {
                return i;
            }
        }
        return -1;
    };
    return this;
};

IASCallbacks.prototype = {
    add: function(callback, priority) {
        var callbackObject = {
            fn: callback,
            priority: priority
        };
        priority = priority || 0;
        for (var i = 0, length = this.list.length; i < length; i++) {
            if (priority > this.list[i].priority) {
                this.list.splice(i, 0, callbackObject);
                return this;
            }
        }
        this.list.push(callbackObject);
        return this;
    },
    remove: function(callback) {
        var index = 0;
        while ((index = this.inList(callback, index)) > -1) {
            this.list.splice(index, 1);
        }
        return this;
    },
    has: function(callback) {
        return this.inList(callback) > -1;
    },
    fireWith: function(context, args) {
        var deferred = jQuery.Deferred();
        if (this.isDisabled) {
            return deferred.reject();
        }
        args = args || [];
        args = [ context, deferred, args.slice ? args.slice() : args ];
        if (this.isFiring) {
            this.fireStack.push(args);
        } else {
            this.fire(args);
        }
        return deferred;
    },
    disable: function() {
        this.isDisabled = true;
    },
    enable: function() {
        this.isDisabled = false;
    }
};

var IASSpinnerExtension = function(options) {
    options = jQuery.extend({}, this.defaults, options);
    this.ias = null;
    this.uid = new Date().getTime();
    this.src = options.src;
    this.html = options.html.replace("{src}", this.src);
    this.showSpinner = function() {
        var $spinner = this.getSpinner() || this.createSpinner(), $lastItem = this.ias.getLastItem();
        $lastItem.after($spinner);
        $spinner.fadeIn();
    };
    this.showSpinnerBefore = function() {
        var $spinner = this.getSpinner() || this.createSpinner(), $firstItem = this.ias.getFirstItem();
        $firstItem.before($spinner);
        $spinner.fadeIn();
    };
    this.removeSpinner = function() {
        if (this.hasSpinner()) {
            this.getSpinner().remove();
        }
    };
    this.getSpinner = function() {
        var $spinner = jQuery("#ias_spinner_" + this.uid);
        if ($spinner.length > 0) {
            return $spinner;
        }
        return false;
    };
    this.hasSpinner = function() {
        var $spinner = jQuery("#ias_spinner_" + this.uid);
        return $spinner.length > 0;
    };
    this.createSpinner = function() {
        var $spinner = jQuery(this.html).attr("id", "ias_spinner_" + this.uid);
        $spinner.hide();
        return $spinner;
    };
    return this;
};

IASSpinnerExtension.prototype.bind = function(ias) {
    this.ias = ias;
    ias.on("next", jQuery.proxy(this.showSpinner, this));
    ias.on("render", jQuery.proxy(this.removeSpinner, this));
    try {
        ias.on("prev", jQuery.proxy(this.showSpinnerBefore, this));
    } catch (exception) {}
};

IASSpinnerExtension.prototype.unbind = function(ias) {
    ias.off("next", this.showSpinner);
    ias.off("render", this.removeSpinner);
    try {
        ias.off("prev", this.showSpinnerBefore);
    } catch (exception) {}
};

IASSpinnerExtension.prototype.defaults = {
    src: "data:image/gif;base64,R0lGODlhEAAQAPQAAP///wAAAPDw8IqKiuDg4EZGRnp6egAAAFhYWCQkJKysrL6+vhQUFJycnAQEBDY2NmhoaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFdyAgAgIJIeWoAkRCCMdBkKtIHIngyMKsErPBYbADpkSCwhDmQCBethRB6Vj4kFCkQPG4IlWDgrNRIwnO4UKBXDufzQvDMaoSDBgFb886MiQadgNABAokfCwzBA8LCg0Egl8jAggGAA1kBIA1BAYzlyILczULC2UhACH5BAkKAAAALAAAAAAQABAAAAV2ICACAmlAZTmOREEIyUEQjLKKxPHADhEvqxlgcGgkGI1DYSVAIAWMx+lwSKkICJ0QsHi9RgKBwnVTiRQQgwF4I4UFDQQEwi6/3YSGWRRmjhEETAJfIgMFCnAKM0KDV4EEEAQLiF18TAYNXDaSe3x6mjidN1s3IQAh+QQJCgAAACwAAAAAEAAQAAAFeCAgAgLZDGU5jgRECEUiCI+yioSDwDJyLKsXoHFQxBSHAoAAFBhqtMJg8DgQBgfrEsJAEAg4YhZIEiwgKtHiMBgtpg3wbUZXGO7kOb1MUKRFMysCChAoggJCIg0GC2aNe4gqQldfL4l/Ag1AXySJgn5LcoE3QXI3IQAh+QQJCgAAACwAAAAAEAAQAAAFdiAgAgLZNGU5joQhCEjxIssqEo8bC9BRjy9Ag7GILQ4QEoE0gBAEBcOpcBA0DoxSK/e8LRIHn+i1cK0IyKdg0VAoljYIg+GgnRrwVS/8IAkICyosBIQpBAMoKy9dImxPhS+GKkFrkX+TigtLlIyKXUF+NjagNiEAIfkECQoAAAAsAAAAABAAEAAABWwgIAICaRhlOY4EIgjH8R7LKhKHGwsMvb4AAy3WODBIBBKCsYA9TjuhDNDKEVSERezQEL0WrhXucRUQGuik7bFlngzqVW9LMl9XWvLdjFaJtDFqZ1cEZUB0dUgvL3dgP4WJZn4jkomWNpSTIyEAIfkECQoAAAAsAAAAABAAEAAABX4gIAICuSxlOY6CIgiD8RrEKgqGOwxwUrMlAoSwIzAGpJpgoSDAGifDY5kopBYDlEpAQBwevxfBtRIUGi8xwWkDNBCIwmC9Vq0aiQQDQuK+VgQPDXV9hCJjBwcFYU5pLwwHXQcMKSmNLQcIAExlbH8JBwttaX0ABAcNbWVbKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICSRBlOY7CIghN8zbEKsKoIjdFzZaEgUBHKChMJtRwcWpAWoWnifm6ESAMhO8lQK0EEAV3rFopIBCEcGwDKAqPh4HUrY4ICHH1dSoTFgcHUiZjBhAJB2AHDykpKAwHAwdzf19KkASIPl9cDgcnDkdtNwiMJCshACH5BAkKAAAALAAAAAAQABAAAAV3ICACAkkQZTmOAiosiyAoxCq+KPxCNVsSMRgBsiClWrLTSWFoIQZHl6pleBh6suxKMIhlvzbAwkBWfFWrBQTxNLq2RG2yhSUkDs2b63AYDAoJXAcFRwADeAkJDX0AQCsEfAQMDAIPBz0rCgcxky0JRWE1AmwpKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICKZzkqJ4nQZxLqZKv4NqNLKK2/Q4Ek4lFXChsg5ypJjs1II3gEDUSRInEGYAw6B6zM4JhrDAtEosVkLUtHA7RHaHAGJQEjsODcEg0FBAFVgkQJQ1pAwcDDw8KcFtSInwJAowCCA6RIwqZAgkPNgVpWndjdyohACH5BAkKAAAALAAAAAAQABAAAAV5ICACAimc5KieLEuUKvm2xAKLqDCfC2GaO9eL0LABWTiBYmA06W6kHgvCqEJiAIJiu3gcvgUsscHUERm+kaCxyxa+zRPk0SgJEgfIvbAdIAQLCAYlCj4DBw0IBQsMCjIqBAcPAooCBg9pKgsJLwUFOhCZKyQDA3YqIQAh+QQJCgAAACwAAAAAEAAQAAAFdSAgAgIpnOSonmxbqiThCrJKEHFbo8JxDDOZYFFb+A41E4H4OhkOipXwBElYITDAckFEOBgMQ3arkMkUBdxIUGZpEb7kaQBRlASPg0FQQHAbEEMGDSVEAA1QBhAED1E0NgwFAooCDWljaQIQCE5qMHcNhCkjIQAh+QQJCgAAACwAAAAAEAAQAAAFeSAgAgIpnOSoLgxxvqgKLEcCC65KEAByKK8cSpA4DAiHQ/DkKhGKh4ZCtCyZGo6F6iYYPAqFgYy02xkSaLEMV34tELyRYNEsCQyHlvWkGCzsPgMCEAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqYYwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA==",
    html: '<div class="ias-spinner" style="text-align: center;"><img src="{src}"/></div>'
};

var IASNoneLeftExtension = function(options) {
    options = jQuery.extend({}, this.defaults, options);
    this.ias = null;
    this.uid = new Date().getTime();
    this.html = options.html.replace("{text}", options.text);
    this.showNoneLeft = function() {
        var $element = jQuery(this.html).attr("id", "ias_noneleft_" + this.uid), $lastItem = this.ias.getLastItem();
        $lastItem.after($element);
        $element.fadeIn();
    };
    return this;
};

IASNoneLeftExtension.prototype.bind = function(ias) {
    this.ias = ias;
    ias.on("noneLeft", jQuery.proxy(this.showNoneLeft, this));
};

IASNoneLeftExtension.prototype.unbind = function(ias) {
    ias.off("noneLeft", this.showNoneLeft);
};

IASNoneLeftExtension.prototype.defaults = {
    text: "You reached the end.",
    html: '<div class="ias-noneleft" style="text-align: center;">{text}</div>'
};

(function(CMS, $, window, document, undefined) {
    "use strict";
    $(function() {
        CMS.Config.init();
    });
    CMS.Config = {
        $body: $(document.body),
        init: function() {
            CMS.foundationConfig.init();
            CMS.UI.init();
            CMS.windowResize.init();
            if (CMS.Supports.touch) {
                CMS.touch.init();
            }
            if (CMS.environment.isMobile()) {
                CMS.mobileSpecific.init();
            }
            $(window).load(function() {});
        }
    };
    CMS.foundationConfig = {
        init: function() {
            $(document).foundation();
            CMS.foundationOverrides.init();
        }
    };
    CMS.foundationOverrides = {
        init: function() {}
    };
    CMS.UI = {
        init: function() {
            CMS.Forms.ajaxSubmittedForm("#contactform", "#contactFormBtn");
            CMS.Forms.ajaxSubmittedForm("#add_comment_form", "#submitCommentBtn");
            CMS.Forms.setupFilters();
        }
    };
    CMS.Forms = {
        setupFilters: function() {
            $("#resetFilters").change(function() {
                var checkboxes = $(this).closest("form").find(":checkbox").not(this);
                checkboxes.removeAttr("checked");
            });
        },
        ajaxSubmittedForm: function(formId, formSubmitBtnId) {
            var formElement = $(formId);
            var btnElement = $(formSubmitBtnId);
            if (formElement.length > 0) {
                btnElement.on("click", function(e) {
                    e.preventDefault();
                    var formData = formElement.serializeArray();
                    formData.push({
                        name: "isAjax",
                        value: "true"
                    });
                    var formAction = formElement.attr("action");
                    $.post(formAction, formData, function(responce) {
                        $(".formError").remove();
                        $("label.error").removeClass("error");
                        if (responce.hasErrors === false) {
                            formElement.trigger("reset");
                            formElement.html("<p>" + responce.formMessage + "</p>");
                        } else {
                            if (responce.errors !== null) {
                                var errorArray = responce.errors;
                                $.each(errorArray, function(key, val) {
                                    $(formId + "_" + key).addClass("error");
                                    $(formId + "_" + key).after($('<small class="formError error">' + val[0] + "</small>").hide());
                                });
                            }
                            $('<small class="formError error">' + responce.formMessage + "</small>").hide().insertAfter(btnElement);
                            $(".formError").fadeIn(200);
                        }
                    });
                });
            }
        }
    };
    CMS.touch = {
        init: function() {}
    };
    CMS.mobileSpecific = {
        init: function() {}
    };
    CMS.windowResize = {
        init: function() {
            $(window).smartresize(function() {
                notifications.sendNotification(notifications.WINDOW_RESIZE);
                $(".orbit-container").css("height", "auto");
                $(".orbit-slide").css("max-height", "none");
                $(".orbit").foundation();
            });
        }
    };
    CMS.sampleTest = {
        simpleTest: function(projectName) {
            this.projectName = projectName;
            return this.projectName + " is starting. Welcome!";
        }
    };
})(window.CMS = window.CMS || {}, jQuery, window, document);
//# sourceMappingURL=scripts.min.js.map