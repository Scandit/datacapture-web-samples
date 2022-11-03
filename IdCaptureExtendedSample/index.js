var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// node_modules/dompurify/dist/purify.js
var require_purify = __commonJS({
  "node_modules/dompurify/dist/purify.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.DOMPurify = factory());
    })(exports, function() {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
          return typeof obj2;
        } : function(obj2) {
          return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        }, _typeof(obj);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _construct(Parent, args, Class) {
        if (_isNativeReflectConstruct()) {
          _construct = Reflect.construct;
        } else {
          _construct = function _construct2(Parent2, args2, Class2) {
            var a = [null];
            a.push.apply(a, args2);
            var Constructor = Function.bind.apply(Parent2, a);
            var instance = new Constructor();
            if (Class2)
              _setPrototypeOf(instance, Class2.prototype);
            return instance;
          };
        }
        return _construct.apply(null, arguments);
      }
      function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
      }
      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr))
          return _arrayLikeToArray(arr);
      }
      function _iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
          return Array.from(iter);
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o)
          return;
        if (typeof o === "string")
          return _arrayLikeToArray(o, minLen);
        var n2 = Object.prototype.toString.call(o).slice(8, -1);
        if (n2 === "Object" && o.constructor)
          n2 = o.constructor.name;
        if (n2 === "Map" || n2 === "Set")
          return Array.from(o);
        if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
          return _arrayLikeToArray(o, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length)
          len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++)
          arr2[i] = arr[i];
        return arr2;
      }
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var hasOwnProperty = Object.hasOwnProperty, setPrototypeOf = Object.setPrototypeOf, isFrozen = Object.isFrozen, getPrototypeOf = Object.getPrototypeOf, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
      var freeze = Object.freeze, seal = Object.seal, create = Object.create;
      var _ref = typeof Reflect !== "undefined" && Reflect, apply = _ref.apply, construct = _ref.construct;
      if (!apply) {
        apply = function apply2(fun, thisValue, args) {
          return fun.apply(thisValue, args);
        };
      }
      if (!freeze) {
        freeze = function freeze2(x3) {
          return x3;
        };
      }
      if (!seal) {
        seal = function seal2(x3) {
          return x3;
        };
      }
      if (!construct) {
        construct = function construct2(Func, args) {
          return _construct(Func, _toConsumableArray(args));
        };
      }
      var arrayForEach = unapply(Array.prototype.forEach);
      var arrayPop = unapply(Array.prototype.pop);
      var arrayPush = unapply(Array.prototype.push);
      var stringToLowerCase = unapply(String.prototype.toLowerCase);
      var stringMatch = unapply(String.prototype.match);
      var stringReplace = unapply(String.prototype.replace);
      var stringIndexOf = unapply(String.prototype.indexOf);
      var stringTrim = unapply(String.prototype.trim);
      var regExpTest = unapply(RegExp.prototype.test);
      var typeErrorCreate = unconstruct(TypeError);
      function unapply(func) {
        return function(thisArg) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          return apply(func, thisArg, args);
        };
      }
      function unconstruct(func) {
        return function() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          return construct(func, args);
        };
      }
      function addToSet(set, array, transformCaseFunc) {
        transformCaseFunc = transformCaseFunc ? transformCaseFunc : stringToLowerCase;
        if (setPrototypeOf) {
          setPrototypeOf(set, null);
        }
        var l2 = array.length;
        while (l2--) {
          var element = array[l2];
          if (typeof element === "string") {
            var lcElement = transformCaseFunc(element);
            if (lcElement !== element) {
              if (!isFrozen(array)) {
                array[l2] = lcElement;
              }
              element = lcElement;
            }
          }
          set[element] = true;
        }
        return set;
      }
      function clone(object) {
        var newObject = create(null);
        var property;
        for (property in object) {
          if (apply(hasOwnProperty, object, [property])) {
            newObject[property] = object[property];
          }
        }
        return newObject;
      }
      function lookupGetter(object, prop) {
        while (object !== null) {
          var desc = getOwnPropertyDescriptor(object, prop);
          if (desc) {
            if (desc.get) {
              return unapply(desc.get);
            }
            if (typeof desc.value === "function") {
              return unapply(desc.value);
            }
          }
          object = getPrototypeOf(object);
        }
        function fallbackValue(element) {
          console.warn("fallback value for", element);
          return null;
        }
        return fallbackValue;
      }
      var html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
      var svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
      var svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
      var svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "fedropshadow", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
      var mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover"]);
      var mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
      var text = freeze(["#text"]);
      var html = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]);
      var svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
      var mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
      var xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
      var MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
      var ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
      var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/);
      var ARIA_ATTR = seal(/^aria-[\-\w]+$/);
      var IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i);
      var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
      var ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g);
      var DOCTYPE_NAME = seal(/^html$/i);
      var getGlobal = function getGlobal2() {
        return typeof window === "undefined" ? null : window;
      };
      var _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, document2) {
        if (_typeof(trustedTypes) !== "object" || typeof trustedTypes.createPolicy !== "function") {
          return null;
        }
        var suffix = null;
        var ATTR_NAME = "data-tt-policy-suffix";
        if (document2.currentScript && document2.currentScript.hasAttribute(ATTR_NAME)) {
          suffix = document2.currentScript.getAttribute(ATTR_NAME);
        }
        var policyName = "dompurify" + (suffix ? "#" + suffix : "");
        try {
          return trustedTypes.createPolicy(policyName, {
            createHTML: function createHTML(html2) {
              return html2;
            }
          });
        } catch (_2) {
          console.warn("TrustedTypes policy " + policyName + " could not be created.");
          return null;
        }
      };
      function createDOMPurify() {
        var window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
        var DOMPurify = function DOMPurify2(root) {
          return createDOMPurify(root);
        };
        DOMPurify.version = "2.3.9";
        DOMPurify.removed = [];
        if (!window2 || !window2.document || window2.document.nodeType !== 9) {
          DOMPurify.isSupported = false;
          return DOMPurify;
        }
        var originalDocument = window2.document;
        var document2 = window2.document;
        var DocumentFragment = window2.DocumentFragment, HTMLTemplateElement = window2.HTMLTemplateElement, Node = window2.Node, Element2 = window2.Element, NodeFilter = window2.NodeFilter, _window$NamedNodeMap = window2.NamedNodeMap, NamedNodeMap = _window$NamedNodeMap === void 0 ? window2.NamedNodeMap || window2.MozNamedAttrMap : _window$NamedNodeMap, HTMLFormElement = window2.HTMLFormElement, DOMParser = window2.DOMParser, trustedTypes = window2.trustedTypes;
        var ElementPrototype = Element2.prototype;
        var cloneNode = lookupGetter(ElementPrototype, "cloneNode");
        var getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
        var getChildNodes = lookupGetter(ElementPrototype, "childNodes");
        var getParentNode = lookupGetter(ElementPrototype, "parentNode");
        if (typeof HTMLTemplateElement === "function") {
          var template = document2.createElement("template");
          if (template.content && template.content.ownerDocument) {
            document2 = template.content.ownerDocument;
          }
        }
        var trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, originalDocument);
        var emptyHTML = trustedTypesPolicy ? trustedTypesPolicy.createHTML("") : "";
        var _document = document2, implementation = _document.implementation, createNodeIterator = _document.createNodeIterator, createDocumentFragment = _document.createDocumentFragment, getElementsByTagName = _document.getElementsByTagName;
        var importNode = originalDocument.importNode;
        var documentMode = {};
        try {
          documentMode = clone(document2).documentMode ? document2.documentMode : {};
        } catch (_2) {
        }
        var hooks = {};
        DOMPurify.isSupported = typeof getParentNode === "function" && implementation && typeof implementation.createHTMLDocument !== "undefined" && documentMode !== 9;
        var MUSTACHE_EXPR$1 = MUSTACHE_EXPR, ERB_EXPR$1 = ERB_EXPR, DATA_ATTR$1 = DATA_ATTR, ARIA_ATTR$1 = ARIA_ATTR, IS_SCRIPT_OR_DATA$1 = IS_SCRIPT_OR_DATA, ATTR_WHITESPACE$1 = ATTR_WHITESPACE;
        var IS_ALLOWED_URI$1 = IS_ALLOWED_URI;
        var ALLOWED_TAGS = null;
        var DEFAULT_ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray(html$1), _toConsumableArray(svg$1), _toConsumableArray(svgFilters), _toConsumableArray(mathMl$1), _toConsumableArray(text)));
        var ALLOWED_ATTR = null;
        var DEFAULT_ALLOWED_ATTR = addToSet({}, [].concat(_toConsumableArray(html), _toConsumableArray(svg), _toConsumableArray(mathMl), _toConsumableArray(xml)));
        var CUSTOM_ELEMENT_HANDLING = Object.seal(Object.create(null, {
          tagNameCheck: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: null
          },
          attributeNameCheck: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: null
          },
          allowCustomizedBuiltInElements: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: false
          }
        }));
        var FORBID_TAGS = null;
        var FORBID_ATTR = null;
        var ALLOW_ARIA_ATTR = true;
        var ALLOW_DATA_ATTR = true;
        var ALLOW_UNKNOWN_PROTOCOLS = false;
        var SAFE_FOR_TEMPLATES = false;
        var WHOLE_DOCUMENT = false;
        var SET_CONFIG = false;
        var FORCE_BODY = false;
        var RETURN_DOM = false;
        var RETURN_DOM_FRAGMENT = false;
        var RETURN_TRUSTED_TYPE = false;
        var SANITIZE_DOM = true;
        var KEEP_CONTENT = true;
        var IN_PLACE = false;
        var USE_PROFILES = {};
        var FORBID_CONTENTS = null;
        var DEFAULT_FORBID_CONTENTS = addToSet({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
        var DATA_URI_TAGS = null;
        var DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
        var URI_SAFE_ATTRIBUTES = null;
        var DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
        var MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
        var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
        var HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
        var NAMESPACE = HTML_NAMESPACE;
        var IS_EMPTY_INPUT = false;
        var PARSER_MEDIA_TYPE;
        var SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
        var DEFAULT_PARSER_MEDIA_TYPE = "text/html";
        var transformCaseFunc;
        var CONFIG = null;
        var formElement = document2.createElement("form");
        var isRegexOrFunction = function isRegexOrFunction2(testValue) {
          return testValue instanceof RegExp || testValue instanceof Function;
        };
        var _parseConfig = function _parseConfig2(cfg) {
          if (CONFIG && CONFIG === cfg) {
            return;
          }
          if (!cfg || _typeof(cfg) !== "object") {
            cfg = {};
          }
          cfg = clone(cfg);
          PARSER_MEDIA_TYPE = SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? PARSER_MEDIA_TYPE = DEFAULT_PARSER_MEDIA_TYPE : PARSER_MEDIA_TYPE = cfg.PARSER_MEDIA_TYPE;
          transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? function(x3) {
            return x3;
          } : stringToLowerCase;
          ALLOWED_TAGS = "ALLOWED_TAGS" in cfg ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
          ALLOWED_ATTR = "ALLOWED_ATTR" in cfg ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
          URI_SAFE_ATTRIBUTES = "ADD_URI_SAFE_ATTR" in cfg ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
          DATA_URI_TAGS = "ADD_DATA_URI_TAGS" in cfg ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
          FORBID_CONTENTS = "FORBID_CONTENTS" in cfg ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
          FORBID_TAGS = "FORBID_TAGS" in cfg ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
          FORBID_ATTR = "FORBID_ATTR" in cfg ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
          USE_PROFILES = "USE_PROFILES" in cfg ? cfg.USE_PROFILES : false;
          ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
          ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
          ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
          SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
          WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
          RETURN_DOM = cfg.RETURN_DOM || false;
          RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
          RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
          FORCE_BODY = cfg.FORCE_BODY || false;
          SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
          KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
          IN_PLACE = cfg.IN_PLACE || false;
          IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI$1;
          NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
          if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
            CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
          }
          if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
            CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
          }
          if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") {
            CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
          }
          if (SAFE_FOR_TEMPLATES) {
            ALLOW_DATA_ATTR = false;
          }
          if (RETURN_DOM_FRAGMENT) {
            RETURN_DOM = true;
          }
          if (USE_PROFILES) {
            ALLOWED_TAGS = addToSet({}, _toConsumableArray(text));
            ALLOWED_ATTR = [];
            if (USE_PROFILES.html === true) {
              addToSet(ALLOWED_TAGS, html$1);
              addToSet(ALLOWED_ATTR, html);
            }
            if (USE_PROFILES.svg === true) {
              addToSet(ALLOWED_TAGS, svg$1);
              addToSet(ALLOWED_ATTR, svg);
              addToSet(ALLOWED_ATTR, xml);
            }
            if (USE_PROFILES.svgFilters === true) {
              addToSet(ALLOWED_TAGS, svgFilters);
              addToSet(ALLOWED_ATTR, svg);
              addToSet(ALLOWED_ATTR, xml);
            }
            if (USE_PROFILES.mathMl === true) {
              addToSet(ALLOWED_TAGS, mathMl$1);
              addToSet(ALLOWED_ATTR, mathMl);
              addToSet(ALLOWED_ATTR, xml);
            }
          }
          if (cfg.ADD_TAGS) {
            if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
              ALLOWED_TAGS = clone(ALLOWED_TAGS);
            }
            addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
          }
          if (cfg.ADD_ATTR) {
            if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
              ALLOWED_ATTR = clone(ALLOWED_ATTR);
            }
            addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
          }
          if (cfg.ADD_URI_SAFE_ATTR) {
            addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
          }
          if (cfg.FORBID_CONTENTS) {
            if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
              FORBID_CONTENTS = clone(FORBID_CONTENTS);
            }
            addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
          }
          if (KEEP_CONTENT) {
            ALLOWED_TAGS["#text"] = true;
          }
          if (WHOLE_DOCUMENT) {
            addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
          }
          if (ALLOWED_TAGS.table) {
            addToSet(ALLOWED_TAGS, ["tbody"]);
            delete FORBID_TAGS.tbody;
          }
          if (freeze) {
            freeze(cfg);
          }
          CONFIG = cfg;
        };
        var MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ["mi", "mo", "mn", "ms", "mtext"]);
        var HTML_INTEGRATION_POINTS = addToSet({}, ["foreignobject", "desc", "title", "annotation-xml"]);
        var COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
        var ALL_SVG_TAGS = addToSet({}, svg$1);
        addToSet(ALL_SVG_TAGS, svgFilters);
        addToSet(ALL_SVG_TAGS, svgDisallowed);
        var ALL_MATHML_TAGS = addToSet({}, mathMl$1);
        addToSet(ALL_MATHML_TAGS, mathMlDisallowed);
        var _checkValidNamespace = function _checkValidNamespace2(element) {
          var parent = getParentNode(element);
          if (!parent || !parent.tagName) {
            parent = {
              namespaceURI: HTML_NAMESPACE,
              tagName: "template"
            };
          }
          var tagName = stringToLowerCase(element.tagName);
          var parentTagName = stringToLowerCase(parent.tagName);
          if (element.namespaceURI === SVG_NAMESPACE) {
            if (parent.namespaceURI === HTML_NAMESPACE) {
              return tagName === "svg";
            }
            if (parent.namespaceURI === MATHML_NAMESPACE) {
              return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
            }
            return Boolean(ALL_SVG_TAGS[tagName]);
          }
          if (element.namespaceURI === MATHML_NAMESPACE) {
            if (parent.namespaceURI === HTML_NAMESPACE) {
              return tagName === "math";
            }
            if (parent.namespaceURI === SVG_NAMESPACE) {
              return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
            }
            return Boolean(ALL_MATHML_TAGS[tagName]);
          }
          if (element.namespaceURI === HTML_NAMESPACE) {
            if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
              return false;
            }
            if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
              return false;
            }
            return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
          }
          return false;
        };
        var _forceRemove = function _forceRemove2(node) {
          arrayPush(DOMPurify.removed, {
            element: node
          });
          try {
            node.parentNode.removeChild(node);
          } catch (_2) {
            try {
              node.outerHTML = emptyHTML;
            } catch (_3) {
              node.remove();
            }
          }
        };
        var _removeAttribute = function _removeAttribute2(name, node) {
          try {
            arrayPush(DOMPurify.removed, {
              attribute: node.getAttributeNode(name),
              from: node
            });
          } catch (_2) {
            arrayPush(DOMPurify.removed, {
              attribute: null,
              from: node
            });
          }
          node.removeAttribute(name);
          if (name === "is" && !ALLOWED_ATTR[name]) {
            if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
              try {
                _forceRemove(node);
              } catch (_2) {
              }
            } else {
              try {
                node.setAttribute(name, "");
              } catch (_2) {
              }
            }
          }
        };
        var _initDocument = function _initDocument2(dirty) {
          var doc;
          var leadingWhitespace;
          if (FORCE_BODY) {
            dirty = "<remove></remove>" + dirty;
          } else {
            var matches = stringMatch(dirty, /^[\r\n\t ]+/);
            leadingWhitespace = matches && matches[0];
          }
          if (PARSER_MEDIA_TYPE === "application/xhtml+xml") {
            dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
          }
          var dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
          if (NAMESPACE === HTML_NAMESPACE) {
            try {
              doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
            } catch (_2) {
            }
          }
          if (!doc || !doc.documentElement) {
            doc = implementation.createDocument(NAMESPACE, "template", null);
            try {
              doc.documentElement.innerHTML = IS_EMPTY_INPUT ? "" : dirtyPayload;
            } catch (_2) {
            }
          }
          var body = doc.body || doc.documentElement;
          if (dirty && leadingWhitespace) {
            body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
          }
          if (NAMESPACE === HTML_NAMESPACE) {
            return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
          }
          return WHOLE_DOCUMENT ? doc.documentElement : body;
        };
        var _createIterator = function _createIterator2(root) {
          return createNodeIterator.call(root.ownerDocument || root, root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT, null, false);
        };
        var _isClobbered = function _isClobbered2(elm) {
          return elm instanceof HTMLFormElement && (typeof elm.nodeName !== "string" || typeof elm.textContent !== "string" || typeof elm.removeChild !== "function" || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== "function" || typeof elm.setAttribute !== "function" || typeof elm.namespaceURI !== "string" || typeof elm.insertBefore !== "function");
        };
        var _isNode = function _isNode2(object) {
          return _typeof(Node) === "object" ? object instanceof Node : object && _typeof(object) === "object" && typeof object.nodeType === "number" && typeof object.nodeName === "string";
        };
        var _executeHook = function _executeHook2(entryPoint, currentNode, data) {
          if (!hooks[entryPoint]) {
            return;
          }
          arrayForEach(hooks[entryPoint], function(hook) {
            hook.call(DOMPurify, currentNode, data, CONFIG);
          });
        };
        var _sanitizeElements = function _sanitizeElements2(currentNode) {
          var content;
          _executeHook("beforeSanitizeElements", currentNode, null);
          if (_isClobbered(currentNode)) {
            _forceRemove(currentNode);
            return true;
          }
          if (regExpTest(/[\u0080-\uFFFF]/, currentNode.nodeName)) {
            _forceRemove(currentNode);
            return true;
          }
          var tagName = transformCaseFunc(currentNode.nodeName);
          _executeHook("uponSanitizeElement", currentNode, {
            tagName,
            allowedTags: ALLOWED_TAGS
          });
          if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && (!_isNode(currentNode.content) || !_isNode(currentNode.content.firstElementChild)) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
            _forceRemove(currentNode);
            return true;
          }
          if (tagName === "select" && regExpTest(/<template/i, currentNode.innerHTML)) {
            _forceRemove(currentNode);
            return true;
          }
          if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
            if (!FORBID_TAGS[tagName] && _basicCustomElementTest(tagName)) {
              if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName))
                return false;
              if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName))
                return false;
            }
            if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
              var parentNode = getParentNode(currentNode) || currentNode.parentNode;
              var childNodes = getChildNodes(currentNode) || currentNode.childNodes;
              if (childNodes && parentNode) {
                var childCount = childNodes.length;
                for (var i = childCount - 1; i >= 0; --i) {
                  parentNode.insertBefore(cloneNode(childNodes[i], true), getNextSibling(currentNode));
                }
              }
            }
            _forceRemove(currentNode);
            return true;
          }
          if (currentNode instanceof Element2 && !_checkValidNamespace(currentNode)) {
            _forceRemove(currentNode);
            return true;
          }
          if ((tagName === "noscript" || tagName === "noembed") && regExpTest(/<\/no(script|embed)/i, currentNode.innerHTML)) {
            _forceRemove(currentNode);
            return true;
          }
          if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
            content = currentNode.textContent;
            content = stringReplace(content, MUSTACHE_EXPR$1, " ");
            content = stringReplace(content, ERB_EXPR$1, " ");
            if (currentNode.textContent !== content) {
              arrayPush(DOMPurify.removed, {
                element: currentNode.cloneNode()
              });
              currentNode.textContent = content;
            }
          }
          _executeHook("afterSanitizeElements", currentNode, null);
          return false;
        };
        var _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
          if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
            return false;
          }
          if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR$1, lcName))
            ;
          else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$1, lcName))
            ;
          else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
            if (_basicCustomElementTest(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value)))
              ;
            else {
              return false;
            }
          } else if (URI_SAFE_ATTRIBUTES[lcName])
            ;
          else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE$1, "")))
            ;
          else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag])
            ;
          else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$1, stringReplace(value, ATTR_WHITESPACE$1, "")))
            ;
          else if (!value)
            ;
          else {
            return false;
          }
          return true;
        };
        var _basicCustomElementTest = function _basicCustomElementTest2(tagName) {
          return tagName.indexOf("-") > 0;
        };
        var _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
          var attr;
          var value;
          var lcName;
          var l2;
          _executeHook("beforeSanitizeAttributes", currentNode, null);
          var attributes = currentNode.attributes;
          if (!attributes) {
            return;
          }
          var hookEvent = {
            attrName: "",
            attrValue: "",
            keepAttr: true,
            allowedAttributes: ALLOWED_ATTR
          };
          l2 = attributes.length;
          while (l2--) {
            attr = attributes[l2];
            var _attr = attr, name = _attr.name, namespaceURI = _attr.namespaceURI;
            value = name === "value" ? attr.value : stringTrim(attr.value);
            lcName = transformCaseFunc(name);
            hookEvent.attrName = lcName;
            hookEvent.attrValue = value;
            hookEvent.keepAttr = true;
            hookEvent.forceKeepAttr = void 0;
            _executeHook("uponSanitizeAttribute", currentNode, hookEvent);
            value = hookEvent.attrValue;
            if (hookEvent.forceKeepAttr) {
              continue;
            }
            _removeAttribute(name, currentNode);
            if (!hookEvent.keepAttr) {
              continue;
            }
            if (regExpTest(/\/>/i, value)) {
              _removeAttribute(name, currentNode);
              continue;
            }
            if (SAFE_FOR_TEMPLATES) {
              value = stringReplace(value, MUSTACHE_EXPR$1, " ");
              value = stringReplace(value, ERB_EXPR$1, " ");
            }
            var lcTag = transformCaseFunc(currentNode.nodeName);
            if (!_isValidAttribute(lcTag, lcName, value)) {
              continue;
            }
            try {
              if (namespaceURI) {
                currentNode.setAttributeNS(namespaceURI, name, value);
              } else {
                currentNode.setAttribute(name, value);
              }
              arrayPop(DOMPurify.removed);
            } catch (_2) {
            }
          }
          _executeHook("afterSanitizeAttributes", currentNode, null);
        };
        var _sanitizeShadowDOM = function _sanitizeShadowDOM2(fragment) {
          var shadowNode;
          var shadowIterator = _createIterator(fragment);
          _executeHook("beforeSanitizeShadowDOM", fragment, null);
          while (shadowNode = shadowIterator.nextNode()) {
            _executeHook("uponSanitizeShadowNode", shadowNode, null);
            if (_sanitizeElements(shadowNode)) {
              continue;
            }
            if (shadowNode.content instanceof DocumentFragment) {
              _sanitizeShadowDOM2(shadowNode.content);
            }
            _sanitizeAttributes(shadowNode);
          }
          _executeHook("afterSanitizeShadowDOM", fragment, null);
        };
        DOMPurify.sanitize = function(dirty, cfg) {
          var body;
          var importedNode;
          var currentNode;
          var oldNode;
          var returnNode;
          IS_EMPTY_INPUT = !dirty;
          if (IS_EMPTY_INPUT) {
            dirty = "<!-->";
          }
          if (typeof dirty !== "string" && !_isNode(dirty)) {
            if (typeof dirty.toString !== "function") {
              throw typeErrorCreate("toString is not a function");
            } else {
              dirty = dirty.toString();
              if (typeof dirty !== "string") {
                throw typeErrorCreate("dirty is not a string, aborting");
              }
            }
          }
          if (!DOMPurify.isSupported) {
            if (_typeof(window2.toStaticHTML) === "object" || typeof window2.toStaticHTML === "function") {
              if (typeof dirty === "string") {
                return window2.toStaticHTML(dirty);
              }
              if (_isNode(dirty)) {
                return window2.toStaticHTML(dirty.outerHTML);
              }
            }
            return dirty;
          }
          if (!SET_CONFIG) {
            _parseConfig(cfg);
          }
          DOMPurify.removed = [];
          if (typeof dirty === "string") {
            IN_PLACE = false;
          }
          if (IN_PLACE) {
            if (dirty.nodeName) {
              var tagName = transformCaseFunc(dirty.nodeName);
              if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
                throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
              }
            }
          } else if (dirty instanceof Node) {
            body = _initDocument("<!---->");
            importedNode = body.ownerDocument.importNode(dirty, true);
            if (importedNode.nodeType === 1 && importedNode.nodeName === "BODY") {
              body = importedNode;
            } else if (importedNode.nodeName === "HTML") {
              body = importedNode;
            } else {
              body.appendChild(importedNode);
            }
          } else {
            if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && dirty.indexOf("<") === -1) {
              return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
            }
            body = _initDocument(dirty);
            if (!body) {
              return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
            }
          }
          if (body && FORCE_BODY) {
            _forceRemove(body.firstChild);
          }
          var nodeIterator = _createIterator(IN_PLACE ? dirty : body);
          while (currentNode = nodeIterator.nextNode()) {
            if (currentNode.nodeType === 3 && currentNode === oldNode) {
              continue;
            }
            if (_sanitizeElements(currentNode)) {
              continue;
            }
            if (currentNode.content instanceof DocumentFragment) {
              _sanitizeShadowDOM(currentNode.content);
            }
            _sanitizeAttributes(currentNode);
            oldNode = currentNode;
          }
          oldNode = null;
          if (IN_PLACE) {
            return dirty;
          }
          if (RETURN_DOM) {
            if (RETURN_DOM_FRAGMENT) {
              returnNode = createDocumentFragment.call(body.ownerDocument);
              while (body.firstChild) {
                returnNode.appendChild(body.firstChild);
              }
            } else {
              returnNode = body;
            }
            if (ALLOWED_ATTR.shadowroot) {
              returnNode = importNode.call(originalDocument, returnNode, true);
            }
            return returnNode;
          }
          var serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
          if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
            serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
          }
          if (SAFE_FOR_TEMPLATES) {
            serializedHTML = stringReplace(serializedHTML, MUSTACHE_EXPR$1, " ");
            serializedHTML = stringReplace(serializedHTML, ERB_EXPR$1, " ");
          }
          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
        };
        DOMPurify.setConfig = function(cfg) {
          _parseConfig(cfg);
          SET_CONFIG = true;
        };
        DOMPurify.clearConfig = function() {
          CONFIG = null;
          SET_CONFIG = false;
        };
        DOMPurify.isValidAttribute = function(tag, attr, value) {
          if (!CONFIG) {
            _parseConfig({});
          }
          var lcTag = transformCaseFunc(tag);
          var lcName = transformCaseFunc(attr);
          return _isValidAttribute(lcTag, lcName, value);
        };
        DOMPurify.addHook = function(entryPoint, hookFunction) {
          if (typeof hookFunction !== "function") {
            return;
          }
          hooks[entryPoint] = hooks[entryPoint] || [];
          arrayPush(hooks[entryPoint], hookFunction);
        };
        DOMPurify.removeHook = function(entryPoint) {
          if (hooks[entryPoint]) {
            return arrayPop(hooks[entryPoint]);
          }
        };
        DOMPurify.removeHooks = function(entryPoint) {
          if (hooks[entryPoint]) {
            hooks[entryPoint] = [];
          }
        };
        DOMPurify.removeAllHooks = function() {
          hooks = {};
        };
        return DOMPurify;
      }
      var purify = createDOMPurify();
      return purify;
    });
  }
});

// ../../scandit-web-datacapture-core/build/js/index.js
var ar = Object.create;
var Mt = Object.defineProperty;
var nr = Object.defineProperties;
var or = Object.getOwnPropertyDescriptor;
var sr = Object.getOwnPropertyDescriptors;
var lr = Object.getOwnPropertyNames;
var ii = Object.getOwnPropertySymbols;
var cr = Object.getPrototypeOf;
var ri = Object.prototype.hasOwnProperty;
var ur = Object.prototype.propertyIsEnumerable;
var wt = (l2, e, t) => e in l2 ? Mt(l2, e, { enumerable: true, configurable: true, writable: true, value: t }) : l2[e] = t;
var Q = (l2, e) => {
  for (var t in e || (e = {}))
    ri.call(e, t) && wt(l2, t, e[t]);
  if (ii)
    for (var t of ii(e))
      ur.call(e, t) && wt(l2, t, e[t]);
  return l2;
};
var Z = (l2, e) => nr(l2, sr(e));
var Lt = (l2, e) => () => (e || l2((e = { exports: {} }).exports, e), e.exports);
var dr = (l2, e, t, a) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let o of lr(e))
      !ri.call(l2, o) && o !== t && Mt(l2, o, { get: () => e[o], enumerable: !(a = or(e, o)) || a.enumerable });
  return l2;
};
var He = (l2, e, t) => (t = l2 != null ? ar(cr(l2)) : {}, dr(e || !l2 || !l2.__esModule ? Mt(t, "default", { value: l2, enumerable: true }) : t, l2));
var c = (l2, e, t) => (wt(l2, typeof e != "symbol" ? e + "" : e, t), t);
var oi = Lt((ai, ni) => {
  (function(l2) {
    var e;
    if (typeof define == "function" && define.amd && (define(l2), e = true), typeof ai == "object" && (ni.exports = l2(), e = true), !e) {
      var t = window.Cookies, a = window.Cookies = l2();
      a.noConflict = function() {
        return window.Cookies = t, a;
      };
    }
  })(function() {
    function l2() {
      for (var a = 0, o = {}; a < arguments.length; a++) {
        var d = arguments[a];
        for (var f2 in d)
          o[f2] = d[f2];
      }
      return o;
    }
    function e(a) {
      return a.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
    }
    function t(a) {
      function o() {
      }
      function d(p, v2, S2) {
        if (!(typeof document > "u")) {
          S2 = l2({ path: "/" }, o.defaults, S2), typeof S2.expires == "number" && (S2.expires = new Date(new Date() * 1 + S2.expires * 864e5)), S2.expires = S2.expires ? S2.expires.toUTCString() : "";
          try {
            var i = JSON.stringify(v2);
            /^[\{\[]/.test(i) && (v2 = i);
          } catch (s2) {
          }
          v2 = a.write ? a.write(v2, p) : encodeURIComponent(String(v2)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), p = encodeURIComponent(String(p)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
          var r = "";
          for (var n2 in S2)
            !S2[n2] || (r += "; " + n2, S2[n2] !== true && (r += "=" + S2[n2].split(";")[0]));
          return document.cookie = p + "=" + v2 + r;
        }
      }
      function f2(p, v2) {
        if (!(typeof document > "u")) {
          for (var S2 = {}, i = document.cookie ? document.cookie.split("; ") : [], r = 0; r < i.length; r++) {
            var n2 = i[r].split("="), s2 = n2.slice(1).join("=");
            !v2 && s2.charAt(0) === '"' && (s2 = s2.slice(1, -1));
            try {
              var u = e(n2[0]);
              if (s2 = (a.read || a)(s2, u) || e(s2), v2)
                try {
                  s2 = JSON.parse(s2);
                } catch (h2) {
                }
              if (S2[u] = s2, p === u)
                break;
            } catch (h2) {
            }
          }
          return p ? S2[p] : S2;
        }
      }
      return o.set = d, o.get = function(p) {
        return f2(p, false);
      }, o.getJSON = function(p) {
        return f2(p, true);
      }, o.remove = function(p, v2) {
        d(p, "", l2(v2, { expires: -1 }));
      }, o.defaults = {}, o.withConverter = t, o;
    }
    return t(function() {
    });
  });
});
var xt = Lt((Ie, Ge) => {
  (function(l2, e) {
    "use strict";
    var t = "0.7.31", a = "", o = "?", d = "function", f2 = "undefined", p = "object", v2 = "string", S2 = "major", i = "model", r = "name", n2 = "type", s2 = "vendor", u = "version", h2 = "architecture", m2 = "console", b2 = "mobile", C2 = "tablet", _2 = "smarttv", j2 = "wearable", B2 = "embedded", D2 = 255, y2 = "Amazon", A = "Apple", M2 = "ASUS", w2 = "BlackBerry", I2 = "Browser", E = "Chrome", L2 = "Edge", z2 = "Firefox", ce = "Google", Le = "Huawei", ve = "LG", vt = "Microsoft", Qt = "Motorola", We = "Opera", St = "Samsung", bt = "Sony", qt = "Xiaomi", Ct = "Zebra", Zt = "Facebook", tr = function(N, P2) {
      var V2 = {};
      for (var H2 in N)
        P2[H2] && P2[H2].length % 2 === 0 ? V2[H2] = P2[H2].concat(N[H2]) : V2[H2] = N[H2];
      return V2;
    }, Ue = function(N) {
      for (var P2 = {}, V2 = 0; V2 < N.length; V2++)
        P2[N[V2].toUpperCase()] = N[V2];
      return P2;
    }, $t = function(N, P2) {
      return typeof N === v2 ? xe(P2).indexOf(xe(N)) !== -1 : false;
    }, xe = function(N) {
      return N.toLowerCase();
    }, ir = function(N) {
      return typeof N === v2 ? N.replace(/[^\d\.]/g, a).split(".")[0] : e;
    }, At = function(N, P2) {
      if (typeof N === v2)
        return N = N.replace(/^\s\s*/, a).replace(/\s\s*$/, a), typeof P2 === f2 ? N : N.substring(0, D2);
    }, _e = function(N, P2) {
      for (var V2 = 0, H2, T2, Be, F2, De, ie2; V2 < P2.length && !De; ) {
        var ei = P2[V2], ti = P2[V2 + 1];
        for (H2 = T2 = 0; H2 < ei.length && !De; )
          if (De = ei[H2++].exec(N), De)
            for (Be = 0; Be < ti.length; Be++)
              ie2 = De[++T2], F2 = ti[Be], typeof F2 === p && F2.length > 0 ? F2.length === 2 ? typeof F2[1] == d ? this[F2[0]] = F2[1].call(this, ie2) : this[F2[0]] = F2[1] : F2.length === 3 ? typeof F2[1] === d && !(F2[1].exec && F2[1].test) ? this[F2[0]] = ie2 ? F2[1].call(this, ie2, F2[2]) : e : this[F2[0]] = ie2 ? ie2.replace(F2[1], F2[2]) : e : F2.length === 4 && (this[F2[0]] = ie2 ? F2[3].call(this, ie2.replace(F2[1], F2[2])) : e) : this[F2] = ie2 || e;
        V2 += 2;
      }
    }, yt = function(N, P2) {
      for (var V2 in P2)
        if (typeof P2[V2] === p && P2[V2].length > 0) {
          for (var H2 = 0; H2 < P2[V2].length; H2++)
            if ($t(P2[V2][H2], N))
              return V2 === o ? e : V2;
        } else if ($t(P2[V2], N))
          return V2 === o ? e : V2;
      return N;
    }, rr = { "1.0": "/8", "1.2": "/1", "1.3": "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }, Xt = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", "8.1": "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, Kt = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [u, [r, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [u, [r, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [r, u], [/opios[\/ ]+([\w\.]+)/i], [u, [r, We + " Mini"]], [/\bopr\/([\w\.]+)/i], [u, [r, We]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([-\w\.]+)/i, /(weibo)__([\d\.]+)/i], [r, u], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [u, [r, "UC" + I2]], [/\bqbcore\/([\w\.]+)/i], [u, [r, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [u, [r, "WeChat"]], [/konqueror\/([\w\.]+)/i], [u, [r, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [u, [r, "IE"]], [/yabrowser\/([\w\.]+)/i], [u, [r, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[r, /(.+)/, "$1 Secure " + I2], u], [/\bfocus\/([\w\.]+)/i], [u, [r, z2 + " Focus"]], [/\bopt\/([\w\.]+)/i], [u, [r, We + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [u, [r, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [u, [r, "Dolphin"]], [/coast\/([\w\.]+)/i], [u, [r, We + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [u, [r, "MIUI " + I2]], [/fxios\/([-\w\.]+)/i], [u, [r, z2]], [/\bqihu|(qi?ho?o?|360)browser/i], [[r, "360 " + I2]], [/(oculus|samsung|sailfish)browser\/([\w\.]+)/i], [[r, /(.+)/, "$1 " + I2], u], [/(comodo_dragon)\/([\w\.]+)/i], [[r, /_/g, " "], u], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [r, u], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i], [r], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[r, Zt], u], [/safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [r, u], [/\bgsa\/([\w\.]+) .*safari\//i], [u, [r, "GSA"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [u, [r, E + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[r, E + " WebView"], u], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [u, [r, "Android " + I2]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [r, u], [/version\/([\w\.]+) .*mobile\/\w+ (safari)/i], [u, [r, "Mobile Safari"]], [/version\/([\w\.]+) .*(mobile ?safari|safari)/i], [u, r], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [r, [u, yt, rr]], [/(webkit|khtml)\/([\w\.]+)/i], [r, u], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[r, "Netscape"], u], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [u, [r, z2 + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i], [r, u]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[h2, "amd64"]], [/(ia32(?=;))/i], [[h2, xe]], [/((?:i[346]|x)86)[;\)]/i], [[h2, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[h2, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[h2, "armhf"]], [/windows (ce|mobile); ppc;/i], [[h2, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[h2, /ower/, a, xe]], [/(sun4\w)[;\)]/i], [[h2, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[h2, xe]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [i, [s2, St], [n2, C2]], [/\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [i, [s2, St], [n2, b2]], [/\((ip(?:hone|od)[\w ]*);/i], [i, [s2, A], [n2, b2]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [i, [s2, A], [n2, C2]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [i, [s2, Le], [n2, C2]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}-[atu]?[ln][01259x][012359][an]?)\b(?!.+d\/s)/i], [i, [s2, Le], [n2, b2]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[i, /_/g, " "], [s2, qt], [n2, b2]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[i, /_/g, " "], [s2, qt], [n2, C2]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [i, [s2, "OPPO"], [n2, b2]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [i, [s2, "Vivo"], [n2, b2]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [i, [s2, "Realme"], [n2, b2]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [i, [s2, Qt], [n2, b2]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [i, [s2, Qt], [n2, C2]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [i, [s2, ve], [n2, C2]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [i, [s2, ve], [n2, b2]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [i, [s2, "Lenovo"], [n2, C2]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[i, /_/g, " "], [s2, "Nokia"], [n2, b2]], [/(pixel c)\b/i], [i, [s2, ce], [n2, C2]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [i, [s2, ce], [n2, b2]], [/droid.+ ([c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [i, [s2, bt], [n2, b2]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[i, "Xperia Tablet"], [s2, bt], [n2, C2]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [i, [s2, "OnePlus"], [n2, b2]], [/(alexa)webm/i, /(kf[a-z]{2}wi)( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [i, [s2, y2], [n2, C2]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[i, /(.+)/g, "Fire Phone $1"], [s2, y2], [n2, b2]], [/(playbook);[-\w\),; ]+(rim)/i], [i, s2, [n2, C2]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [i, [s2, w2], [n2, b2]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [i, [s2, M2], [n2, C2]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [i, [s2, M2], [n2, b2]], [/(nexus 9)/i], [i, [s2, "HTC"], [n2, C2]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic|sony)[-_ ]?([-\w]*)/i], [s2, [i, /_/g, " "], [n2, b2]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [i, [s2, "Acer"], [n2, C2]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [i, [s2, "Meizu"], [n2, b2]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [i, [s2, "Sharp"], [n2, b2]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [s2, i, [n2, b2]], [/(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [s2, i, [n2, C2]], [/(surface duo)/i], [i, [s2, vt], [n2, C2]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [i, [s2, "Fairphone"], [n2, b2]], [/(u304aa)/i], [i, [s2, "AT&T"], [n2, b2]], [/\bsie-(\w*)/i], [i, [s2, "Siemens"], [n2, b2]], [/\b(rct\w+) b/i], [i, [s2, "RCA"], [n2, C2]], [/\b(venue[\d ]{2,7}) b/i], [i, [s2, "Dell"], [n2, C2]], [/\b(q(?:mv|ta)\w+) b/i], [i, [s2, "Verizon"], [n2, C2]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [i, [s2, "Barnes & Noble"], [n2, C2]], [/\b(tm\d{3}\w+) b/i], [i, [s2, "NuVision"], [n2, C2]], [/\b(k88) b/i], [i, [s2, "ZTE"], [n2, C2]], [/\b(nx\d{3}j) b/i], [i, [s2, "ZTE"], [n2, b2]], [/\b(gen\d{3}) b.+49h/i], [i, [s2, "Swiss"], [n2, b2]], [/\b(zur\d{3}) b/i], [i, [s2, "Swiss"], [n2, C2]], [/\b((zeki)?tb.*\b) b/i], [i, [s2, "Zeki"], [n2, C2]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[s2, "Dragon Touch"], i, [n2, C2]], [/\b(ns-?\w{0,9}) b/i], [i, [s2, "Insignia"], [n2, C2]], [/\b((nxa|next)-?\w{0,9}) b/i], [i, [s2, "NextBook"], [n2, C2]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[s2, "Voice"], i, [n2, b2]], [/\b(lvtel\-)?(v1[12]) b/i], [[s2, "LvTel"], i, [n2, b2]], [/\b(ph-1) /i], [i, [s2, "Essential"], [n2, b2]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [i, [s2, "Envizen"], [n2, C2]], [/\b(trio[-\w\. ]+) b/i], [i, [s2, "MachSpeed"], [n2, C2]], [/\btu_(1491) b/i], [i, [s2, "Rotor"], [n2, C2]], [/(shield[\w ]+) b/i], [i, [s2, "Nvidia"], [n2, C2]], [/(sprint) (\w+)/i], [s2, i, [n2, b2]], [/(kin\.[onetw]{3})/i], [[i, /\./g, " "], [s2, vt], [n2, b2]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [i, [s2, Ct], [n2, C2]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [i, [s2, Ct], [n2, b2]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [s2, i, [n2, m2]], [/droid.+; (shield) bui/i], [i, [s2, "Nvidia"], [n2, m2]], [/(playstation [345portablevi]+)/i], [i, [s2, bt], [n2, m2]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [i, [s2, vt], [n2, m2]], [/smart-tv.+(samsung)/i], [s2, [n2, _2]], [/hbbtv.+maple;(\d+)/i], [[i, /^/, "SmartTV"], [s2, St], [n2, _2]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[s2, ve], [n2, _2]], [/(apple) ?tv/i], [s2, [i, A + " TV"], [n2, _2]], [/crkey/i], [[i, E + "cast"], [s2, ce], [n2, _2]], [/droid.+aft(\w)( bui|\))/i], [i, [s2, y2], [n2, _2]], [/\(dtv[\);].+(aquos)/i], [i, [s2, "Sharp"], [n2, _2]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i], [[s2, At], [i, At], [n2, _2]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[n2, _2]], [/((pebble))app/i], [s2, i, [n2, j2]], [/droid.+; (glass) \d/i], [i, [s2, ce], [n2, j2]], [/droid.+; (wt63?0{2,3})\)/i], [i, [s2, Ct], [n2, j2]], [/(quest( 2)?)/i], [i, [s2, Zt], [n2, j2]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [s2, [n2, B2]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [i, [n2, b2]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [i, [n2, C2]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[n2, C2]], [/(phone|mobile(?:[;\/]| safari)|pda(?=.+windows ce))/i], [[n2, b2]], [/(android[-\w\. ]{0,9});.+buil/i], [i, [s2, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [u, [r, L2 + "HTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [u, [r, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i], [r, u], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [u, r]], os: [[/microsoft (windows) (vista|xp)/i], [r, u], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [r, [u, yt, Xt]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[r, "Windows"], [u, yt, Xt]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /cfnetwork\/.+darwin/i], [[u, /_/g, "."], [r, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[r, "Mac OS"], [u, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86)/i], [u, r], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [r, u], [/\(bb(10);/i], [u, [r, w2]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [u, [r, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [u, [r, z2 + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [u, [r, "webOS"]], [/crkey\/([\d\.]+)/i], [u, [r, E + "cast"]], [/(cros) [\w]+ ([\w\.]+\w)/i], [[r, "Chromium OS"], u], [/(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [r, u], [/(sunos) ?([\w\.\d]*)/i], [[r, "Solaris"], u], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i, /(unix) ?([\w\.]*)/i], [r, u]] }, X2 = function(N, P2) {
      if (typeof N === p && (P2 = N, N = e), !(this instanceof X2))
        return new X2(N, P2).getResult();
      var V2 = N || (typeof l2 !== f2 && l2.navigator && l2.navigator.userAgent ? l2.navigator.userAgent : a), H2 = P2 ? tr(Kt, P2) : Kt;
      return this.getBrowser = function() {
        var T2 = {};
        return T2[r] = e, T2[u] = e, _e.call(T2, V2, H2.browser), T2.major = ir(T2.version), T2;
      }, this.getCPU = function() {
        var T2 = {};
        return T2[h2] = e, _e.call(T2, V2, H2.cpu), T2;
      }, this.getDevice = function() {
        var T2 = {};
        return T2[s2] = e, T2[i] = e, T2[n2] = e, _e.call(T2, V2, H2.device), T2;
      }, this.getEngine = function() {
        var T2 = {};
        return T2[r] = e, T2[u] = e, _e.call(T2, V2, H2.engine), T2;
      }, this.getOS = function() {
        var T2 = {};
        return T2[r] = e, T2[u] = e, _e.call(T2, V2, H2.os), T2;
      }, this.getResult = function() {
        return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
      }, this.getUA = function() {
        return V2;
      }, this.setUA = function(T2) {
        return V2 = typeof T2 === v2 && T2.length > D2 ? At(T2, D2) : T2, this;
      }, this.setUA(V2), this;
    };
    X2.VERSION = t, X2.BROWSER = Ue([r, u, S2]), X2.CPU = Ue([h2]), X2.DEVICE = Ue([i, s2, n2, m2, b2, _2, C2, j2, B2]), X2.ENGINE = X2.OS = Ue([r, u]), typeof Ie !== f2 ? (typeof Ge !== f2 && Ge.exports && (Ie = Ge.exports = X2), Ie.UAParser = X2) : typeof define === d && define.amd ? define(function() {
      return X2;
    }) : typeof l2 !== f2 && (l2.UAParser = X2);
    var Se = typeof l2 !== f2 && (l2.jQuery || l2.Zepto);
    if (Se && !Se.ua) {
      var Je = new X2();
      Se.ua = Je.getResult(), Se.ua.get = function() {
        return Je.getUA();
      }, Se.ua.set = function(N) {
        Je.setUA(N);
        var P2 = Je.getResult();
        for (var V2 in P2)
          Se.ua[V2] = P2[V2];
      };
    }
  })(typeof window == "object" ? window : Ie);
});
var ji = Lt((ct) => {
  (function() {
    "use strict";
    var l2 = function() {
      this.init();
    };
    l2.prototype = { init: function() {
      var i = this || e;
      return i._counter = 1e3, i._html5AudioPool = [], i.html5PoolSize = 10, i._codecs = {}, i._howls = [], i._muted = false, i._volume = 1, i._canPlayEvent = "canplaythrough", i._navigator = typeof window < "u" && window.navigator ? window.navigator : null, i.masterGain = null, i.noAudio = false, i.usingWebAudio = true, i.autoSuspend = true, i.ctx = null, i.autoUnlock = true, i._setup(), i;
    }, volume: function(i) {
      var r = this || e;
      if (i = parseFloat(i), r.ctx || S2(), typeof i < "u" && i >= 0 && i <= 1) {
        if (r._volume = i, r._muted)
          return r;
        r.usingWebAudio && r.masterGain.gain.setValueAtTime(i, e.ctx.currentTime);
        for (var n2 = 0; n2 < r._howls.length; n2++)
          if (!r._howls[n2]._webAudio)
            for (var s2 = r._howls[n2]._getSoundIds(), u = 0; u < s2.length; u++) {
              var h2 = r._howls[n2]._soundById(s2[u]);
              h2 && h2._node && (h2._node.volume = h2._volume * i);
            }
        return r;
      }
      return r._volume;
    }, mute: function(i) {
      var r = this || e;
      r.ctx || S2(), r._muted = i, r.usingWebAudio && r.masterGain.gain.setValueAtTime(i ? 0 : r._volume, e.ctx.currentTime);
      for (var n2 = 0; n2 < r._howls.length; n2++)
        if (!r._howls[n2]._webAudio)
          for (var s2 = r._howls[n2]._getSoundIds(), u = 0; u < s2.length; u++) {
            var h2 = r._howls[n2]._soundById(s2[u]);
            h2 && h2._node && (h2._node.muted = i ? true : h2._muted);
          }
      return r;
    }, stop: function() {
      for (var i = this || e, r = 0; r < i._howls.length; r++)
        i._howls[r].stop();
      return i;
    }, unload: function() {
      for (var i = this || e, r = i._howls.length - 1; r >= 0; r--)
        i._howls[r].unload();
      return i.usingWebAudio && i.ctx && typeof i.ctx.close < "u" && (i.ctx.close(), i.ctx = null, S2()), i;
    }, codecs: function(i) {
      return (this || e)._codecs[i.replace(/^x-/, "")];
    }, _setup: function() {
      var i = this || e;
      if (i.state = i.ctx && i.ctx.state || "suspended", i._autoSuspend(), !i.usingWebAudio)
        if (typeof Audio < "u")
          try {
            var r = new Audio();
            typeof r.oncanplaythrough > "u" && (i._canPlayEvent = "canplay");
          } catch (n2) {
            i.noAudio = true;
          }
        else
          i.noAudio = true;
      try {
        var r = new Audio();
        r.muted && (i.noAudio = true);
      } catch (n2) {
      }
      return i.noAudio || i._setupCodecs(), i;
    }, _setupCodecs: function() {
      var i = this || e, r = null;
      try {
        r = typeof Audio < "u" ? new Audio() : null;
      } catch (_2) {
        return i;
      }
      if (!r || typeof r.canPlayType != "function")
        return i;
      var n2 = r.canPlayType("audio/mpeg;").replace(/^no$/, ""), s2 = i._navigator ? i._navigator.userAgent : "", u = s2.match(/OPR\/([0-6].)/g), h2 = u && parseInt(u[0].split("/")[1], 10) < 33, m2 = s2.indexOf("Safari") !== -1 && s2.indexOf("Chrome") === -1, b2 = s2.match(/Version\/(.*?) /), C2 = m2 && b2 && parseInt(b2[1], 10) < 15;
      return i._codecs = { mp3: !!(!h2 && (n2 || r.canPlayType("audio/mp3;").replace(/^no$/, ""))), mpeg: !!n2, opus: !!r.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""), ogg: !!r.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), oga: !!r.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), wav: !!(r.canPlayType('audio/wav; codecs="1"') || r.canPlayType("audio/wav")).replace(/^no$/, ""), aac: !!r.canPlayType("audio/aac;").replace(/^no$/, ""), caf: !!r.canPlayType("audio/x-caf;").replace(/^no$/, ""), m4a: !!(r.canPlayType("audio/x-m4a;") || r.canPlayType("audio/m4a;") || r.canPlayType("audio/aac;")).replace(/^no$/, ""), m4b: !!(r.canPlayType("audio/x-m4b;") || r.canPlayType("audio/m4b;") || r.canPlayType("audio/aac;")).replace(/^no$/, ""), mp4: !!(r.canPlayType("audio/x-mp4;") || r.canPlayType("audio/mp4;") || r.canPlayType("audio/aac;")).replace(/^no$/, ""), weba: !!(!C2 && r.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")), webm: !!(!C2 && r.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")), dolby: !!r.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""), flac: !!(r.canPlayType("audio/x-flac;") || r.canPlayType("audio/flac;")).replace(/^no$/, "") }, i;
    }, _unlockAudio: function() {
      var i = this || e;
      if (!(i._audioUnlocked || !i.ctx)) {
        i._audioUnlocked = false, i.autoUnlock = false, !i._mobileUnloaded && i.ctx.sampleRate !== 44100 && (i._mobileUnloaded = true, i.unload()), i._scratchBuffer = i.ctx.createBuffer(1, 1, 22050);
        var r = function(n2) {
          for (; i._html5AudioPool.length < i.html5PoolSize; )
            try {
              var s2 = new Audio();
              s2._unlocked = true, i._releaseHtml5Audio(s2);
            } catch (_2) {
              i.noAudio = true;
              break;
            }
          for (var u = 0; u < i._howls.length; u++)
            if (!i._howls[u]._webAudio)
              for (var h2 = i._howls[u]._getSoundIds(), m2 = 0; m2 < h2.length; m2++) {
                var b2 = i._howls[u]._soundById(h2[m2]);
                b2 && b2._node && !b2._node._unlocked && (b2._node._unlocked = true, b2._node.load());
              }
          i._autoResume();
          var C2 = i.ctx.createBufferSource();
          C2.buffer = i._scratchBuffer, C2.connect(i.ctx.destination), typeof C2.start > "u" ? C2.noteOn(0) : C2.start(0), typeof i.ctx.resume == "function" && i.ctx.resume(), C2.onended = function() {
            C2.disconnect(0), i._audioUnlocked = true, document.removeEventListener("touchstart", r, true), document.removeEventListener("touchend", r, true), document.removeEventListener("click", r, true), document.removeEventListener("keydown", r, true);
            for (var _2 = 0; _2 < i._howls.length; _2++)
              i._howls[_2]._emit("unlock");
          };
        };
        return document.addEventListener("touchstart", r, true), document.addEventListener("touchend", r, true), document.addEventListener("click", r, true), document.addEventListener("keydown", r, true), i;
      }
    }, _obtainHtml5Audio: function() {
      var i = this || e;
      if (i._html5AudioPool.length)
        return i._html5AudioPool.pop();
      var r = new Audio().play();
      return r && typeof Promise < "u" && (r instanceof Promise || typeof r.then == "function") && r.catch(function() {
        console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.");
      }), new Audio();
    }, _releaseHtml5Audio: function(i) {
      var r = this || e;
      return i._unlocked && r._html5AudioPool.push(i), r;
    }, _autoSuspend: function() {
      var i = this;
      if (!(!i.autoSuspend || !i.ctx || typeof i.ctx.suspend > "u" || !e.usingWebAudio)) {
        for (var r = 0; r < i._howls.length; r++)
          if (i._howls[r]._webAudio) {
            for (var n2 = 0; n2 < i._howls[r]._sounds.length; n2++)
              if (!i._howls[r]._sounds[n2]._paused)
                return i;
          }
        return i._suspendTimer && clearTimeout(i._suspendTimer), i._suspendTimer = setTimeout(function() {
          if (!!i.autoSuspend) {
            i._suspendTimer = null, i.state = "suspending";
            var s2 = function() {
              i.state = "suspended", i._resumeAfterSuspend && (delete i._resumeAfterSuspend, i._autoResume());
            };
            i.ctx.suspend().then(s2, s2);
          }
        }, 3e4), i;
      }
    }, _autoResume: function() {
      var i = this;
      if (!(!i.ctx || typeof i.ctx.resume > "u" || !e.usingWebAudio))
        return i.state === "running" && i.ctx.state !== "interrupted" && i._suspendTimer ? (clearTimeout(i._suspendTimer), i._suspendTimer = null) : i.state === "suspended" || i.state === "running" && i.ctx.state === "interrupted" ? (i.ctx.resume().then(function() {
          i.state = "running";
          for (var r = 0; r < i._howls.length; r++)
            i._howls[r]._emit("resume");
        }), i._suspendTimer && (clearTimeout(i._suspendTimer), i._suspendTimer = null)) : i.state === "suspending" && (i._resumeAfterSuspend = true), i;
    } };
    var e = new l2(), t = function(i) {
      var r = this;
      if (!i.src || i.src.length === 0) {
        console.error("An array of source files must be passed with any new Howl.");
        return;
      }
      r.init(i);
    };
    t.prototype = { init: function(i) {
      var r = this;
      return e.ctx || S2(), r._autoplay = i.autoplay || false, r._format = typeof i.format != "string" ? i.format : [i.format], r._html5 = i.html5 || false, r._muted = i.mute || false, r._loop = i.loop || false, r._pool = i.pool || 5, r._preload = typeof i.preload == "boolean" || i.preload === "metadata" ? i.preload : true, r._rate = i.rate || 1, r._sprite = i.sprite || {}, r._src = typeof i.src != "string" ? i.src : [i.src], r._volume = i.volume !== void 0 ? i.volume : 1, r._xhr = { method: i.xhr && i.xhr.method ? i.xhr.method : "GET", headers: i.xhr && i.xhr.headers ? i.xhr.headers : null, withCredentials: i.xhr && i.xhr.withCredentials ? i.xhr.withCredentials : false }, r._duration = 0, r._state = "unloaded", r._sounds = [], r._endTimers = {}, r._queue = [], r._playLock = false, r._onend = i.onend ? [{ fn: i.onend }] : [], r._onfade = i.onfade ? [{ fn: i.onfade }] : [], r._onload = i.onload ? [{ fn: i.onload }] : [], r._onloaderror = i.onloaderror ? [{ fn: i.onloaderror }] : [], r._onplayerror = i.onplayerror ? [{ fn: i.onplayerror }] : [], r._onpause = i.onpause ? [{ fn: i.onpause }] : [], r._onplay = i.onplay ? [{ fn: i.onplay }] : [], r._onstop = i.onstop ? [{ fn: i.onstop }] : [], r._onmute = i.onmute ? [{ fn: i.onmute }] : [], r._onvolume = i.onvolume ? [{ fn: i.onvolume }] : [], r._onrate = i.onrate ? [{ fn: i.onrate }] : [], r._onseek = i.onseek ? [{ fn: i.onseek }] : [], r._onunlock = i.onunlock ? [{ fn: i.onunlock }] : [], r._onresume = [], r._webAudio = e.usingWebAudio && !r._html5, typeof e.ctx < "u" && e.ctx && e.autoUnlock && e._unlockAudio(), e._howls.push(r), r._autoplay && r._queue.push({ event: "play", action: function() {
        r.play();
      } }), r._preload && r._preload !== "none" && r.load(), r;
    }, load: function() {
      var i = this, r = null;
      if (e.noAudio) {
        i._emit("loaderror", null, "No audio support.");
        return;
      }
      typeof i._src == "string" && (i._src = [i._src]);
      for (var n2 = 0; n2 < i._src.length; n2++) {
        var s2, u;
        if (i._format && i._format[n2])
          s2 = i._format[n2];
        else {
          if (u = i._src[n2], typeof u != "string") {
            i._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
            continue;
          }
          s2 = /^data:audio\/([^;,]+);/i.exec(u), s2 || (s2 = /\.([^.]+)$/.exec(u.split("?", 1)[0])), s2 && (s2 = s2[1].toLowerCase());
        }
        if (s2 || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'), s2 && e.codecs(s2)) {
          r = i._src[n2];
          break;
        }
      }
      if (!r) {
        i._emit("loaderror", null, "No codec support for selected audio sources.");
        return;
      }
      return i._src = r, i._state = "loading", window.location.protocol === "https:" && r.slice(0, 5) === "http:" && (i._html5 = true, i._webAudio = false), new a(i), i._webAudio && d(i), i;
    }, play: function(i, r) {
      var n2 = this, s2 = null;
      if (typeof i == "number")
        s2 = i, i = null;
      else {
        if (typeof i == "string" && n2._state === "loaded" && !n2._sprite[i])
          return null;
        if (typeof i > "u" && (i = "__default", !n2._playLock)) {
          for (var u = 0, h2 = 0; h2 < n2._sounds.length; h2++)
            n2._sounds[h2]._paused && !n2._sounds[h2]._ended && (u++, s2 = n2._sounds[h2]._id);
          u === 1 ? i = null : s2 = null;
        }
      }
      var m2 = s2 ? n2._soundById(s2) : n2._inactiveSound();
      if (!m2)
        return null;
      if (s2 && !i && (i = m2._sprite || "__default"), n2._state !== "loaded") {
        m2._sprite = i, m2._ended = false;
        var b2 = m2._id;
        return n2._queue.push({ event: "play", action: function() {
          n2.play(b2);
        } }), b2;
      }
      if (s2 && !m2._paused)
        return r || n2._loadQueue("play"), m2._id;
      n2._webAudio && e._autoResume();
      var C2 = Math.max(0, m2._seek > 0 ? m2._seek : n2._sprite[i][0] / 1e3), _2 = Math.max(0, (n2._sprite[i][0] + n2._sprite[i][1]) / 1e3 - C2), j2 = _2 * 1e3 / Math.abs(m2._rate), B2 = n2._sprite[i][0] / 1e3, D2 = (n2._sprite[i][0] + n2._sprite[i][1]) / 1e3;
      m2._sprite = i, m2._ended = false;
      var y2 = function() {
        m2._paused = false, m2._seek = C2, m2._start = B2, m2._stop = D2, m2._loop = !!(m2._loop || n2._sprite[i][2]);
      };
      if (C2 >= D2) {
        n2._ended(m2);
        return;
      }
      var A = m2._node;
      if (n2._webAudio) {
        var M2 = function() {
          n2._playLock = false, y2(), n2._refreshBuffer(m2);
          var L2 = m2._muted || n2._muted ? 0 : m2._volume;
          A.gain.setValueAtTime(L2, e.ctx.currentTime), m2._playStart = e.ctx.currentTime, typeof A.bufferSource.start > "u" ? m2._loop ? A.bufferSource.noteGrainOn(0, C2, 86400) : A.bufferSource.noteGrainOn(0, C2, _2) : m2._loop ? A.bufferSource.start(0, C2, 86400) : A.bufferSource.start(0, C2, _2), j2 !== 1 / 0 && (n2._endTimers[m2._id] = setTimeout(n2._ended.bind(n2, m2), j2)), r || setTimeout(function() {
            n2._emit("play", m2._id), n2._loadQueue();
          }, 0);
        };
        e.state === "running" && e.ctx.state !== "interrupted" ? M2() : (n2._playLock = true, n2.once("resume", M2), n2._clearTimer(m2._id));
      } else {
        var w2 = function() {
          A.currentTime = C2, A.muted = m2._muted || n2._muted || e._muted || A.muted, A.volume = m2._volume * e.volume(), A.playbackRate = m2._rate;
          try {
            var L2 = A.play();
            if (L2 && typeof Promise < "u" && (L2 instanceof Promise || typeof L2.then == "function") ? (n2._playLock = true, y2(), L2.then(function() {
              n2._playLock = false, A._unlocked = true, r ? n2._loadQueue() : n2._emit("play", m2._id);
            }).catch(function() {
              n2._playLock = false, n2._emit("playerror", m2._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."), m2._ended = true, m2._paused = true;
            })) : r || (n2._playLock = false, y2(), n2._emit("play", m2._id)), A.playbackRate = m2._rate, A.paused) {
              n2._emit("playerror", m2._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
              return;
            }
            i !== "__default" || m2._loop ? n2._endTimers[m2._id] = setTimeout(n2._ended.bind(n2, m2), j2) : (n2._endTimers[m2._id] = function() {
              n2._ended(m2), A.removeEventListener("ended", n2._endTimers[m2._id], false);
            }, A.addEventListener("ended", n2._endTimers[m2._id], false));
          } catch (z2) {
            n2._emit("playerror", m2._id, z2);
          }
        };
        A.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" && (A.src = n2._src, A.load());
        var I2 = window && window.ejecta || !A.readyState && e._navigator.isCocoonJS;
        if (A.readyState >= 3 || I2)
          w2();
        else {
          n2._playLock = true, n2._state = "loading";
          var E = function() {
            n2._state = "loaded", w2(), A.removeEventListener(e._canPlayEvent, E, false);
          };
          A.addEventListener(e._canPlayEvent, E, false), n2._clearTimer(m2._id);
        }
      }
      return m2._id;
    }, pause: function(i) {
      var r = this;
      if (r._state !== "loaded" || r._playLock)
        return r._queue.push({ event: "pause", action: function() {
          r.pause(i);
        } }), r;
      for (var n2 = r._getSoundIds(i), s2 = 0; s2 < n2.length; s2++) {
        r._clearTimer(n2[s2]);
        var u = r._soundById(n2[s2]);
        if (u && !u._paused && (u._seek = r.seek(n2[s2]), u._rateSeek = 0, u._paused = true, r._stopFade(n2[s2]), u._node))
          if (r._webAudio) {
            if (!u._node.bufferSource)
              continue;
            typeof u._node.bufferSource.stop > "u" ? u._node.bufferSource.noteOff(0) : u._node.bufferSource.stop(0), r._cleanBuffer(u._node);
          } else
            (!isNaN(u._node.duration) || u._node.duration === 1 / 0) && u._node.pause();
        arguments[1] || r._emit("pause", u ? u._id : null);
      }
      return r;
    }, stop: function(i, r) {
      var n2 = this;
      if (n2._state !== "loaded" || n2._playLock)
        return n2._queue.push({ event: "stop", action: function() {
          n2.stop(i);
        } }), n2;
      for (var s2 = n2._getSoundIds(i), u = 0; u < s2.length; u++) {
        n2._clearTimer(s2[u]);
        var h2 = n2._soundById(s2[u]);
        h2 && (h2._seek = h2._start || 0, h2._rateSeek = 0, h2._paused = true, h2._ended = true, n2._stopFade(s2[u]), h2._node && (n2._webAudio ? h2._node.bufferSource && (typeof h2._node.bufferSource.stop > "u" ? h2._node.bufferSource.noteOff(0) : h2._node.bufferSource.stop(0), n2._cleanBuffer(h2._node)) : (!isNaN(h2._node.duration) || h2._node.duration === 1 / 0) && (h2._node.currentTime = h2._start || 0, h2._node.pause(), h2._node.duration === 1 / 0 && n2._clearSound(h2._node))), r || n2._emit("stop", h2._id));
      }
      return n2;
    }, mute: function(i, r) {
      var n2 = this;
      if (n2._state !== "loaded" || n2._playLock)
        return n2._queue.push({ event: "mute", action: function() {
          n2.mute(i, r);
        } }), n2;
      if (typeof r > "u")
        if (typeof i == "boolean")
          n2._muted = i;
        else
          return n2._muted;
      for (var s2 = n2._getSoundIds(r), u = 0; u < s2.length; u++) {
        var h2 = n2._soundById(s2[u]);
        h2 && (h2._muted = i, h2._interval && n2._stopFade(h2._id), n2._webAudio && h2._node ? h2._node.gain.setValueAtTime(i ? 0 : h2._volume, e.ctx.currentTime) : h2._node && (h2._node.muted = e._muted ? true : i), n2._emit("mute", h2._id));
      }
      return n2;
    }, volume: function() {
      var i = this, r = arguments, n2, s2;
      if (r.length === 0)
        return i._volume;
      if (r.length === 1 || r.length === 2 && typeof r[1] > "u") {
        var u = i._getSoundIds(), h2 = u.indexOf(r[0]);
        h2 >= 0 ? s2 = parseInt(r[0], 10) : n2 = parseFloat(r[0]);
      } else
        r.length >= 2 && (n2 = parseFloat(r[0]), s2 = parseInt(r[1], 10));
      var m2;
      if (typeof n2 < "u" && n2 >= 0 && n2 <= 1) {
        if (i._state !== "loaded" || i._playLock)
          return i._queue.push({ event: "volume", action: function() {
            i.volume.apply(i, r);
          } }), i;
        typeof s2 > "u" && (i._volume = n2), s2 = i._getSoundIds(s2);
        for (var b2 = 0; b2 < s2.length; b2++)
          m2 = i._soundById(s2[b2]), m2 && (m2._volume = n2, r[2] || i._stopFade(s2[b2]), i._webAudio && m2._node && !m2._muted ? m2._node.gain.setValueAtTime(n2, e.ctx.currentTime) : m2._node && !m2._muted && (m2._node.volume = n2 * e.volume()), i._emit("volume", m2._id));
      } else
        return m2 = s2 ? i._soundById(s2) : i._sounds[0], m2 ? m2._volume : 0;
      return i;
    }, fade: function(i, r, n2, s2) {
      var u = this;
      if (u._state !== "loaded" || u._playLock)
        return u._queue.push({ event: "fade", action: function() {
          u.fade(i, r, n2, s2);
        } }), u;
      i = Math.min(Math.max(0, parseFloat(i)), 1), r = Math.min(Math.max(0, parseFloat(r)), 1), n2 = parseFloat(n2), u.volume(i, s2);
      for (var h2 = u._getSoundIds(s2), m2 = 0; m2 < h2.length; m2++) {
        var b2 = u._soundById(h2[m2]);
        if (b2) {
          if (s2 || u._stopFade(h2[m2]), u._webAudio && !b2._muted) {
            var C2 = e.ctx.currentTime, _2 = C2 + n2 / 1e3;
            b2._volume = i, b2._node.gain.setValueAtTime(i, C2), b2._node.gain.linearRampToValueAtTime(r, _2);
          }
          u._startFadeInterval(b2, i, r, n2, h2[m2], typeof s2 > "u");
        }
      }
      return u;
    }, _startFadeInterval: function(i, r, n2, s2, u, h2) {
      var m2 = this, b2 = r, C2 = n2 - r, _2 = Math.abs(C2 / 0.01), j2 = Math.max(4, _2 > 0 ? s2 / _2 : s2), B2 = Date.now();
      i._fadeTo = n2, i._interval = setInterval(function() {
        var D2 = (Date.now() - B2) / s2;
        B2 = Date.now(), b2 += C2 * D2, b2 = Math.round(b2 * 100) / 100, C2 < 0 ? b2 = Math.max(n2, b2) : b2 = Math.min(n2, b2), m2._webAudio ? i._volume = b2 : m2.volume(b2, i._id, true), h2 && (m2._volume = b2), (n2 < r && b2 <= n2 || n2 > r && b2 >= n2) && (clearInterval(i._interval), i._interval = null, i._fadeTo = null, m2.volume(n2, i._id), m2._emit("fade", i._id));
      }, j2);
    }, _stopFade: function(i) {
      var r = this, n2 = r._soundById(i);
      return n2 && n2._interval && (r._webAudio && n2._node.gain.cancelScheduledValues(e.ctx.currentTime), clearInterval(n2._interval), n2._interval = null, r.volume(n2._fadeTo, i), n2._fadeTo = null, r._emit("fade", i)), r;
    }, loop: function() {
      var i = this, r = arguments, n2, s2, u;
      if (r.length === 0)
        return i._loop;
      if (r.length === 1)
        if (typeof r[0] == "boolean")
          n2 = r[0], i._loop = n2;
        else
          return u = i._soundById(parseInt(r[0], 10)), u ? u._loop : false;
      else
        r.length === 2 && (n2 = r[0], s2 = parseInt(r[1], 10));
      for (var h2 = i._getSoundIds(s2), m2 = 0; m2 < h2.length; m2++)
        u = i._soundById(h2[m2]), u && (u._loop = n2, i._webAudio && u._node && u._node.bufferSource && (u._node.bufferSource.loop = n2, n2 && (u._node.bufferSource.loopStart = u._start || 0, u._node.bufferSource.loopEnd = u._stop, i.playing(h2[m2]) && (i.pause(h2[m2], true), i.play(h2[m2], true)))));
      return i;
    }, rate: function() {
      var i = this, r = arguments, n2, s2;
      if (r.length === 0)
        s2 = i._sounds[0]._id;
      else if (r.length === 1) {
        var u = i._getSoundIds(), h2 = u.indexOf(r[0]);
        h2 >= 0 ? s2 = parseInt(r[0], 10) : n2 = parseFloat(r[0]);
      } else
        r.length === 2 && (n2 = parseFloat(r[0]), s2 = parseInt(r[1], 10));
      var m2;
      if (typeof n2 == "number") {
        if (i._state !== "loaded" || i._playLock)
          return i._queue.push({ event: "rate", action: function() {
            i.rate.apply(i, r);
          } }), i;
        typeof s2 > "u" && (i._rate = n2), s2 = i._getSoundIds(s2);
        for (var b2 = 0; b2 < s2.length; b2++)
          if (m2 = i._soundById(s2[b2]), m2) {
            i.playing(s2[b2]) && (m2._rateSeek = i.seek(s2[b2]), m2._playStart = i._webAudio ? e.ctx.currentTime : m2._playStart), m2._rate = n2, i._webAudio && m2._node && m2._node.bufferSource ? m2._node.bufferSource.playbackRate.setValueAtTime(n2, e.ctx.currentTime) : m2._node && (m2._node.playbackRate = n2);
            var C2 = i.seek(s2[b2]), _2 = (i._sprite[m2._sprite][0] + i._sprite[m2._sprite][1]) / 1e3 - C2, j2 = _2 * 1e3 / Math.abs(m2._rate);
            (i._endTimers[s2[b2]] || !m2._paused) && (i._clearTimer(s2[b2]), i._endTimers[s2[b2]] = setTimeout(i._ended.bind(i, m2), j2)), i._emit("rate", m2._id);
          }
      } else
        return m2 = i._soundById(s2), m2 ? m2._rate : i._rate;
      return i;
    }, seek: function() {
      var i = this, r = arguments, n2, s2;
      if (r.length === 0)
        i._sounds.length && (s2 = i._sounds[0]._id);
      else if (r.length === 1) {
        var u = i._getSoundIds(), h2 = u.indexOf(r[0]);
        h2 >= 0 ? s2 = parseInt(r[0], 10) : i._sounds.length && (s2 = i._sounds[0]._id, n2 = parseFloat(r[0]));
      } else
        r.length === 2 && (n2 = parseFloat(r[0]), s2 = parseInt(r[1], 10));
      if (typeof s2 > "u")
        return 0;
      if (typeof n2 == "number" && (i._state !== "loaded" || i._playLock))
        return i._queue.push({ event: "seek", action: function() {
          i.seek.apply(i, r);
        } }), i;
      var m2 = i._soundById(s2);
      if (m2)
        if (typeof n2 == "number" && n2 >= 0) {
          var b2 = i.playing(s2);
          b2 && i.pause(s2, true), m2._seek = n2, m2._ended = false, i._clearTimer(s2), !i._webAudio && m2._node && !isNaN(m2._node.duration) && (m2._node.currentTime = n2);
          var C2 = function() {
            b2 && i.play(s2, true), i._emit("seek", s2);
          };
          if (b2 && !i._webAudio) {
            var _2 = function() {
              i._playLock ? setTimeout(_2, 0) : C2();
            };
            setTimeout(_2, 0);
          } else
            C2();
        } else if (i._webAudio) {
          var j2 = i.playing(s2) ? e.ctx.currentTime - m2._playStart : 0, B2 = m2._rateSeek ? m2._rateSeek - m2._seek : 0;
          return m2._seek + (B2 + j2 * Math.abs(m2._rate));
        } else
          return m2._node.currentTime;
      return i;
    }, playing: function(i) {
      var r = this;
      if (typeof i == "number") {
        var n2 = r._soundById(i);
        return n2 ? !n2._paused : false;
      }
      for (var s2 = 0; s2 < r._sounds.length; s2++)
        if (!r._sounds[s2]._paused)
          return true;
      return false;
    }, duration: function(i) {
      var r = this, n2 = r._duration, s2 = r._soundById(i);
      return s2 && (n2 = r._sprite[s2._sprite][1] / 1e3), n2;
    }, state: function() {
      return this._state;
    }, unload: function() {
      for (var i = this, r = i._sounds, n2 = 0; n2 < r.length; n2++)
        r[n2]._paused || i.stop(r[n2]._id), i._webAudio || (i._clearSound(r[n2]._node), r[n2]._node.removeEventListener("error", r[n2]._errorFn, false), r[n2]._node.removeEventListener(e._canPlayEvent, r[n2]._loadFn, false), r[n2]._node.removeEventListener("ended", r[n2]._endFn, false), e._releaseHtml5Audio(r[n2]._node)), delete r[n2]._node, i._clearTimer(r[n2]._id);
      var s2 = e._howls.indexOf(i);
      s2 >= 0 && e._howls.splice(s2, 1);
      var u = true;
      for (n2 = 0; n2 < e._howls.length; n2++)
        if (e._howls[n2]._src === i._src || i._src.indexOf(e._howls[n2]._src) >= 0) {
          u = false;
          break;
        }
      return o && u && delete o[i._src], e.noAudio = false, i._state = "unloaded", i._sounds = [], i = null, null;
    }, on: function(i, r, n2, s2) {
      var u = this, h2 = u["_on" + i];
      return typeof r == "function" && h2.push(s2 ? { id: n2, fn: r, once: s2 } : { id: n2, fn: r }), u;
    }, off: function(i, r, n2) {
      var s2 = this, u = s2["_on" + i], h2 = 0;
      if (typeof r == "number" && (n2 = r, r = null), r || n2)
        for (h2 = 0; h2 < u.length; h2++) {
          var m2 = n2 === u[h2].id;
          if (r === u[h2].fn && m2 || !r && m2) {
            u.splice(h2, 1);
            break;
          }
        }
      else if (i)
        s2["_on" + i] = [];
      else {
        var b2 = Object.keys(s2);
        for (h2 = 0; h2 < b2.length; h2++)
          b2[h2].indexOf("_on") === 0 && Array.isArray(s2[b2[h2]]) && (s2[b2[h2]] = []);
      }
      return s2;
    }, once: function(i, r, n2) {
      var s2 = this;
      return s2.on(i, r, n2, 1), s2;
    }, _emit: function(i, r, n2) {
      for (var s2 = this, u = s2["_on" + i], h2 = u.length - 1; h2 >= 0; h2--)
        (!u[h2].id || u[h2].id === r || i === "load") && (setTimeout(function(m2) {
          m2.call(this, r, n2);
        }.bind(s2, u[h2].fn), 0), u[h2].once && s2.off(i, u[h2].fn, u[h2].id));
      return s2._loadQueue(i), s2;
    }, _loadQueue: function(i) {
      var r = this;
      if (r._queue.length > 0) {
        var n2 = r._queue[0];
        n2.event === i && (r._queue.shift(), r._loadQueue()), i || n2.action();
      }
      return r;
    }, _ended: function(i) {
      var r = this, n2 = i._sprite;
      if (!r._webAudio && i._node && !i._node.paused && !i._node.ended && i._node.currentTime < i._stop)
        return setTimeout(r._ended.bind(r, i), 100), r;
      var s2 = !!(i._loop || r._sprite[n2][2]);
      if (r._emit("end", i._id), !r._webAudio && s2 && r.stop(i._id, true).play(i._id), r._webAudio && s2) {
        r._emit("play", i._id), i._seek = i._start || 0, i._rateSeek = 0, i._playStart = e.ctx.currentTime;
        var u = (i._stop - i._start) * 1e3 / Math.abs(i._rate);
        r._endTimers[i._id] = setTimeout(r._ended.bind(r, i), u);
      }
      return r._webAudio && !s2 && (i._paused = true, i._ended = true, i._seek = i._start || 0, i._rateSeek = 0, r._clearTimer(i._id), r._cleanBuffer(i._node), e._autoSuspend()), !r._webAudio && !s2 && r.stop(i._id, true), r;
    }, _clearTimer: function(i) {
      var r = this;
      if (r._endTimers[i]) {
        if (typeof r._endTimers[i] != "function")
          clearTimeout(r._endTimers[i]);
        else {
          var n2 = r._soundById(i);
          n2 && n2._node && n2._node.removeEventListener("ended", r._endTimers[i], false);
        }
        delete r._endTimers[i];
      }
      return r;
    }, _soundById: function(i) {
      for (var r = this, n2 = 0; n2 < r._sounds.length; n2++)
        if (i === r._sounds[n2]._id)
          return r._sounds[n2];
      return null;
    }, _inactiveSound: function() {
      var i = this;
      i._drain();
      for (var r = 0; r < i._sounds.length; r++)
        if (i._sounds[r]._ended)
          return i._sounds[r].reset();
      return new a(i);
    }, _drain: function() {
      var i = this, r = i._pool, n2 = 0, s2 = 0;
      if (!(i._sounds.length < r)) {
        for (s2 = 0; s2 < i._sounds.length; s2++)
          i._sounds[s2]._ended && n2++;
        for (s2 = i._sounds.length - 1; s2 >= 0; s2--) {
          if (n2 <= r)
            return;
          i._sounds[s2]._ended && (i._webAudio && i._sounds[s2]._node && i._sounds[s2]._node.disconnect(0), i._sounds.splice(s2, 1), n2--);
        }
      }
    }, _getSoundIds: function(i) {
      var r = this;
      if (typeof i > "u") {
        for (var n2 = [], s2 = 0; s2 < r._sounds.length; s2++)
          n2.push(r._sounds[s2]._id);
        return n2;
      } else
        return [i];
    }, _refreshBuffer: function(i) {
      var r = this;
      return i._node.bufferSource = e.ctx.createBufferSource(), i._node.bufferSource.buffer = o[r._src], i._panner ? i._node.bufferSource.connect(i._panner) : i._node.bufferSource.connect(i._node), i._node.bufferSource.loop = i._loop, i._loop && (i._node.bufferSource.loopStart = i._start || 0, i._node.bufferSource.loopEnd = i._stop || 0), i._node.bufferSource.playbackRate.setValueAtTime(i._rate, e.ctx.currentTime), r;
    }, _cleanBuffer: function(i) {
      var r = this, n2 = e._navigator && e._navigator.vendor.indexOf("Apple") >= 0;
      if (e._scratchBuffer && i.bufferSource && (i.bufferSource.onended = null, i.bufferSource.disconnect(0), n2))
        try {
          i.bufferSource.buffer = e._scratchBuffer;
        } catch (s2) {
        }
      return i.bufferSource = null, r;
    }, _clearSound: function(i) {
      var r = /MSIE |Trident\//.test(e._navigator && e._navigator.userAgent);
      r || (i.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
    } };
    var a = function(i) {
      this._parent = i, this.init();
    };
    a.prototype = { init: function() {
      var i = this, r = i._parent;
      return i._muted = r._muted, i._loop = r._loop, i._volume = r._volume, i._rate = r._rate, i._seek = 0, i._paused = true, i._ended = true, i._sprite = "__default", i._id = ++e._counter, r._sounds.push(i), i.create(), i;
    }, create: function() {
      var i = this, r = i._parent, n2 = e._muted || i._muted || i._parent._muted ? 0 : i._volume;
      return r._webAudio ? (i._node = typeof e.ctx.createGain > "u" ? e.ctx.createGainNode() : e.ctx.createGain(), i._node.gain.setValueAtTime(n2, e.ctx.currentTime), i._node.paused = true, i._node.connect(e.masterGain)) : e.noAudio || (i._node = e._obtainHtml5Audio(), i._errorFn = i._errorListener.bind(i), i._node.addEventListener("error", i._errorFn, false), i._loadFn = i._loadListener.bind(i), i._node.addEventListener(e._canPlayEvent, i._loadFn, false), i._endFn = i._endListener.bind(i), i._node.addEventListener("ended", i._endFn, false), i._node.src = r._src, i._node.preload = r._preload === true ? "auto" : r._preload, i._node.volume = n2 * e.volume(), i._node.load()), i;
    }, reset: function() {
      var i = this, r = i._parent;
      return i._muted = r._muted, i._loop = r._loop, i._volume = r._volume, i._rate = r._rate, i._seek = 0, i._rateSeek = 0, i._paused = true, i._ended = true, i._sprite = "__default", i._id = ++e._counter, i;
    }, _errorListener: function() {
      var i = this;
      i._parent._emit("loaderror", i._id, i._node.error ? i._node.error.code : 0), i._node.removeEventListener("error", i._errorFn, false);
    }, _loadListener: function() {
      var i = this, r = i._parent;
      r._duration = Math.ceil(i._node.duration * 10) / 10, Object.keys(r._sprite).length === 0 && (r._sprite = { __default: [0, r._duration * 1e3] }), r._state !== "loaded" && (r._state = "loaded", r._emit("load"), r._loadQueue()), i._node.removeEventListener(e._canPlayEvent, i._loadFn, false);
    }, _endListener: function() {
      var i = this, r = i._parent;
      r._duration === 1 / 0 && (r._duration = Math.ceil(i._node.duration * 10) / 10, r._sprite.__default[1] === 1 / 0 && (r._sprite.__default[1] = r._duration * 1e3), r._ended(i)), i._node.removeEventListener("ended", i._endFn, false);
    } };
    var o = {}, d = function(i) {
      var r = i._src;
      if (o[r]) {
        i._duration = o[r].duration, v2(i);
        return;
      }
      if (/^data:[^;]+;base64,/.test(r)) {
        for (var n2 = atob(r.split(",")[1]), s2 = new Uint8Array(n2.length), u = 0; u < n2.length; ++u)
          s2[u] = n2.charCodeAt(u);
        p(s2.buffer, i);
      } else {
        var h2 = new XMLHttpRequest();
        h2.open(i._xhr.method, r, true), h2.withCredentials = i._xhr.withCredentials, h2.responseType = "arraybuffer", i._xhr.headers && Object.keys(i._xhr.headers).forEach(function(m2) {
          h2.setRequestHeader(m2, i._xhr.headers[m2]);
        }), h2.onload = function() {
          var m2 = (h2.status + "")[0];
          if (m2 !== "0" && m2 !== "2" && m2 !== "3") {
            i._emit("loaderror", null, "Failed loading audio file with status: " + h2.status + ".");
            return;
          }
          p(h2.response, i);
        }, h2.onerror = function() {
          i._webAudio && (i._html5 = true, i._webAudio = false, i._sounds = [], delete o[r], i.load());
        }, f2(h2);
      }
    }, f2 = function(i) {
      try {
        i.send();
      } catch (r) {
        i.onerror();
      }
    }, p = function(i, r) {
      var n2 = function() {
        r._emit("loaderror", null, "Decoding audio data failed.");
      }, s2 = function(u) {
        u && r._sounds.length > 0 ? (o[r._src] = u, v2(r, u)) : n2();
      };
      typeof Promise < "u" && e.ctx.decodeAudioData.length === 1 ? e.ctx.decodeAudioData(i).then(s2).catch(n2) : e.ctx.decodeAudioData(i, s2, n2);
    }, v2 = function(i, r) {
      r && !i._duration && (i._duration = r.duration), Object.keys(i._sprite).length === 0 && (i._sprite = { __default: [0, i._duration * 1e3] }), i._state !== "loaded" && (i._state = "loaded", i._emit("load"), i._loadQueue());
    }, S2 = function() {
      if (!!e.usingWebAudio) {
        try {
          typeof AudioContext < "u" ? e.ctx = new AudioContext() : typeof webkitAudioContext < "u" ? e.ctx = new webkitAudioContext() : e.usingWebAudio = false;
        } catch (u) {
          e.usingWebAudio = false;
        }
        e.ctx || (e.usingWebAudio = false);
        var i = /iP(hone|od|ad)/.test(e._navigator && e._navigator.platform), r = e._navigator && e._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), n2 = r ? parseInt(r[1], 10) : null;
        if (i && n2 && n2 < 9) {
          var s2 = /safari/.test(e._navigator && e._navigator.userAgent.toLowerCase());
          e._navigator && !s2 && (e.usingWebAudio = false);
        }
        e.usingWebAudio && (e.masterGain = typeof e.ctx.createGain > "u" ? e.ctx.createGainNode() : e.ctx.createGain(), e.masterGain.gain.setValueAtTime(e._muted ? 0 : e._volume, e.ctx.currentTime), e.masterGain.connect(e.ctx.destination)), e._setup();
      }
    };
    typeof define == "function" && define.amd && define([], function() {
      return { Howler: e, Howl: t };
    }), typeof ct < "u" && (ct.Howler = e, ct.Howl = t), typeof global < "u" ? (global.HowlerGlobal = l2, global.Howler = e, global.Howl = t, global.Sound = a) : typeof window < "u" && (window.HowlerGlobal = l2, window.Howler = e, window.Howl = t, window.Sound = a);
  })();
  (function() {
    "use strict";
    HowlerGlobal.prototype._pos = [0, 0, 0], HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0], HowlerGlobal.prototype.stereo = function(e) {
      var t = this;
      if (!t.ctx || !t.ctx.listener)
        return t;
      for (var a = t._howls.length - 1; a >= 0; a--)
        t._howls[a].stereo(e);
      return t;
    }, HowlerGlobal.prototype.pos = function(e, t, a) {
      var o = this;
      if (!o.ctx || !o.ctx.listener)
        return o;
      if (t = typeof t != "number" ? o._pos[1] : t, a = typeof a != "number" ? o._pos[2] : a, typeof e == "number")
        o._pos = [e, t, a], typeof o.ctx.listener.positionX < "u" ? (o.ctx.listener.positionX.setTargetAtTime(o._pos[0], Howler.ctx.currentTime, 0.1), o.ctx.listener.positionY.setTargetAtTime(o._pos[1], Howler.ctx.currentTime, 0.1), o.ctx.listener.positionZ.setTargetAtTime(o._pos[2], Howler.ctx.currentTime, 0.1)) : o.ctx.listener.setPosition(o._pos[0], o._pos[1], o._pos[2]);
      else
        return o._pos;
      return o;
    }, HowlerGlobal.prototype.orientation = function(e, t, a, o, d, f2) {
      var p = this;
      if (!p.ctx || !p.ctx.listener)
        return p;
      var v2 = p._orientation;
      if (t = typeof t != "number" ? v2[1] : t, a = typeof a != "number" ? v2[2] : a, o = typeof o != "number" ? v2[3] : o, d = typeof d != "number" ? v2[4] : d, f2 = typeof f2 != "number" ? v2[5] : f2, typeof e == "number")
        p._orientation = [e, t, a, o, d, f2], typeof p.ctx.listener.forwardX < "u" ? (p.ctx.listener.forwardX.setTargetAtTime(e, Howler.ctx.currentTime, 0.1), p.ctx.listener.forwardY.setTargetAtTime(t, Howler.ctx.currentTime, 0.1), p.ctx.listener.forwardZ.setTargetAtTime(a, Howler.ctx.currentTime, 0.1), p.ctx.listener.upX.setTargetAtTime(o, Howler.ctx.currentTime, 0.1), p.ctx.listener.upY.setTargetAtTime(d, Howler.ctx.currentTime, 0.1), p.ctx.listener.upZ.setTargetAtTime(f2, Howler.ctx.currentTime, 0.1)) : p.ctx.listener.setOrientation(e, t, a, o, d, f2);
      else
        return v2;
      return p;
    }, Howl.prototype.init = function(e) {
      return function(t) {
        var a = this;
        return a._orientation = t.orientation || [1, 0, 0], a._stereo = t.stereo || null, a._pos = t.pos || null, a._pannerAttr = { coneInnerAngle: typeof t.coneInnerAngle < "u" ? t.coneInnerAngle : 360, coneOuterAngle: typeof t.coneOuterAngle < "u" ? t.coneOuterAngle : 360, coneOuterGain: typeof t.coneOuterGain < "u" ? t.coneOuterGain : 0, distanceModel: typeof t.distanceModel < "u" ? t.distanceModel : "inverse", maxDistance: typeof t.maxDistance < "u" ? t.maxDistance : 1e4, panningModel: typeof t.panningModel < "u" ? t.panningModel : "HRTF", refDistance: typeof t.refDistance < "u" ? t.refDistance : 1, rolloffFactor: typeof t.rolloffFactor < "u" ? t.rolloffFactor : 1 }, a._onstereo = t.onstereo ? [{ fn: t.onstereo }] : [], a._onpos = t.onpos ? [{ fn: t.onpos }] : [], a._onorientation = t.onorientation ? [{ fn: t.onorientation }] : [], e.call(this, t);
      };
    }(Howl.prototype.init), Howl.prototype.stereo = function(e, t) {
      var a = this;
      if (!a._webAudio)
        return a;
      if (a._state !== "loaded")
        return a._queue.push({ event: "stereo", action: function() {
          a.stereo(e, t);
        } }), a;
      var o = typeof Howler.ctx.createStereoPanner > "u" ? "spatial" : "stereo";
      if (typeof t > "u")
        if (typeof e == "number")
          a._stereo = e, a._pos = [e, 0, 0];
        else
          return a._stereo;
      for (var d = a._getSoundIds(t), f2 = 0; f2 < d.length; f2++) {
        var p = a._soundById(d[f2]);
        if (p)
          if (typeof e == "number")
            p._stereo = e, p._pos = [e, 0, 0], p._node && (p._pannerAttr.panningModel = "equalpower", (!p._panner || !p._panner.pan) && l2(p, o), o === "spatial" ? typeof p._panner.positionX < "u" ? (p._panner.positionX.setValueAtTime(e, Howler.ctx.currentTime), p._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime), p._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : p._panner.setPosition(e, 0, 0) : p._panner.pan.setValueAtTime(e, Howler.ctx.currentTime)), a._emit("stereo", p._id);
          else
            return p._stereo;
      }
      return a;
    }, Howl.prototype.pos = function(e, t, a, o) {
      var d = this;
      if (!d._webAudio)
        return d;
      if (d._state !== "loaded")
        return d._queue.push({ event: "pos", action: function() {
          d.pos(e, t, a, o);
        } }), d;
      if (t = typeof t != "number" ? 0 : t, a = typeof a != "number" ? -0.5 : a, typeof o > "u")
        if (typeof e == "number")
          d._pos = [e, t, a];
        else
          return d._pos;
      for (var f2 = d._getSoundIds(o), p = 0; p < f2.length; p++) {
        var v2 = d._soundById(f2[p]);
        if (v2)
          if (typeof e == "number")
            v2._pos = [e, t, a], v2._node && ((!v2._panner || v2._panner.pan) && l2(v2, "spatial"), typeof v2._panner.positionX < "u" ? (v2._panner.positionX.setValueAtTime(e, Howler.ctx.currentTime), v2._panner.positionY.setValueAtTime(t, Howler.ctx.currentTime), v2._panner.positionZ.setValueAtTime(a, Howler.ctx.currentTime)) : v2._panner.setPosition(e, t, a)), d._emit("pos", v2._id);
          else
            return v2._pos;
      }
      return d;
    }, Howl.prototype.orientation = function(e, t, a, o) {
      var d = this;
      if (!d._webAudio)
        return d;
      if (d._state !== "loaded")
        return d._queue.push({ event: "orientation", action: function() {
          d.orientation(e, t, a, o);
        } }), d;
      if (t = typeof t != "number" ? d._orientation[1] : t, a = typeof a != "number" ? d._orientation[2] : a, typeof o > "u")
        if (typeof e == "number")
          d._orientation = [e, t, a];
        else
          return d._orientation;
      for (var f2 = d._getSoundIds(o), p = 0; p < f2.length; p++) {
        var v2 = d._soundById(f2[p]);
        if (v2)
          if (typeof e == "number")
            v2._orientation = [e, t, a], v2._node && (v2._panner || (v2._pos || (v2._pos = d._pos || [0, 0, -0.5]), l2(v2, "spatial")), typeof v2._panner.orientationX < "u" ? (v2._panner.orientationX.setValueAtTime(e, Howler.ctx.currentTime), v2._panner.orientationY.setValueAtTime(t, Howler.ctx.currentTime), v2._panner.orientationZ.setValueAtTime(a, Howler.ctx.currentTime)) : v2._panner.setOrientation(e, t, a)), d._emit("orientation", v2._id);
          else
            return v2._orientation;
      }
      return d;
    }, Howl.prototype.pannerAttr = function() {
      var e = this, t = arguments, a, o, d;
      if (!e._webAudio)
        return e;
      if (t.length === 0)
        return e._pannerAttr;
      if (t.length === 1)
        if (typeof t[0] == "object")
          a = t[0], typeof o > "u" && (a.pannerAttr || (a.pannerAttr = { coneInnerAngle: a.coneInnerAngle, coneOuterAngle: a.coneOuterAngle, coneOuterGain: a.coneOuterGain, distanceModel: a.distanceModel, maxDistance: a.maxDistance, refDistance: a.refDistance, rolloffFactor: a.rolloffFactor, panningModel: a.panningModel }), e._pannerAttr = { coneInnerAngle: typeof a.pannerAttr.coneInnerAngle < "u" ? a.pannerAttr.coneInnerAngle : e._coneInnerAngle, coneOuterAngle: typeof a.pannerAttr.coneOuterAngle < "u" ? a.pannerAttr.coneOuterAngle : e._coneOuterAngle, coneOuterGain: typeof a.pannerAttr.coneOuterGain < "u" ? a.pannerAttr.coneOuterGain : e._coneOuterGain, distanceModel: typeof a.pannerAttr.distanceModel < "u" ? a.pannerAttr.distanceModel : e._distanceModel, maxDistance: typeof a.pannerAttr.maxDistance < "u" ? a.pannerAttr.maxDistance : e._maxDistance, refDistance: typeof a.pannerAttr.refDistance < "u" ? a.pannerAttr.refDistance : e._refDistance, rolloffFactor: typeof a.pannerAttr.rolloffFactor < "u" ? a.pannerAttr.rolloffFactor : e._rolloffFactor, panningModel: typeof a.pannerAttr.panningModel < "u" ? a.pannerAttr.panningModel : e._panningModel });
        else
          return d = e._soundById(parseInt(t[0], 10)), d ? d._pannerAttr : e._pannerAttr;
      else
        t.length === 2 && (a = t[0], o = parseInt(t[1], 10));
      for (var f2 = e._getSoundIds(o), p = 0; p < f2.length; p++)
        if (d = e._soundById(f2[p]), d) {
          var v2 = d._pannerAttr;
          v2 = { coneInnerAngle: typeof a.coneInnerAngle < "u" ? a.coneInnerAngle : v2.coneInnerAngle, coneOuterAngle: typeof a.coneOuterAngle < "u" ? a.coneOuterAngle : v2.coneOuterAngle, coneOuterGain: typeof a.coneOuterGain < "u" ? a.coneOuterGain : v2.coneOuterGain, distanceModel: typeof a.distanceModel < "u" ? a.distanceModel : v2.distanceModel, maxDistance: typeof a.maxDistance < "u" ? a.maxDistance : v2.maxDistance, refDistance: typeof a.refDistance < "u" ? a.refDistance : v2.refDistance, rolloffFactor: typeof a.rolloffFactor < "u" ? a.rolloffFactor : v2.rolloffFactor, panningModel: typeof a.panningModel < "u" ? a.panningModel : v2.panningModel };
          var S2 = d._panner;
          S2 ? (S2.coneInnerAngle = v2.coneInnerAngle, S2.coneOuterAngle = v2.coneOuterAngle, S2.coneOuterGain = v2.coneOuterGain, S2.distanceModel = v2.distanceModel, S2.maxDistance = v2.maxDistance, S2.refDistance = v2.refDistance, S2.rolloffFactor = v2.rolloffFactor, S2.panningModel = v2.panningModel) : (d._pos || (d._pos = e._pos || [0, 0, -0.5]), l2(d, "spatial"));
        }
      return e;
    }, Sound.prototype.init = function(e) {
      return function() {
        var t = this, a = t._parent;
        t._orientation = a._orientation, t._stereo = a._stereo, t._pos = a._pos, t._pannerAttr = a._pannerAttr, e.call(this), t._stereo ? a.stereo(t._stereo) : t._pos && a.pos(t._pos[0], t._pos[1], t._pos[2], t._id);
      };
    }(Sound.prototype.init), Sound.prototype.reset = function(e) {
      return function() {
        var t = this, a = t._parent;
        return t._orientation = a._orientation, t._stereo = a._stereo, t._pos = a._pos, t._pannerAttr = a._pannerAttr, t._stereo ? a.stereo(t._stereo) : t._pos ? a.pos(t._pos[0], t._pos[1], t._pos[2], t._id) : t._panner && (t._panner.disconnect(0), t._panner = void 0, a._refreshBuffer(t)), e.call(this);
      };
    }(Sound.prototype.reset);
    var l2 = function(e, t) {
      t = t || "spatial", t === "spatial" ? (e._panner = Howler.ctx.createPanner(), e._panner.coneInnerAngle = e._pannerAttr.coneInnerAngle, e._panner.coneOuterAngle = e._pannerAttr.coneOuterAngle, e._panner.coneOuterGain = e._pannerAttr.coneOuterGain, e._panner.distanceModel = e._pannerAttr.distanceModel, e._panner.maxDistance = e._pannerAttr.maxDistance, e._panner.refDistance = e._pannerAttr.refDistance, e._panner.rolloffFactor = e._pannerAttr.rolloffFactor, e._panner.panningModel = e._pannerAttr.panningModel, typeof e._panner.positionX < "u" ? (e._panner.positionX.setValueAtTime(e._pos[0], Howler.ctx.currentTime), e._panner.positionY.setValueAtTime(e._pos[1], Howler.ctx.currentTime), e._panner.positionZ.setValueAtTime(e._pos[2], Howler.ctx.currentTime)) : e._panner.setPosition(e._pos[0], e._pos[1], e._pos[2]), typeof e._panner.orientationX < "u" ? (e._panner.orientationX.setValueAtTime(e._orientation[0], Howler.ctx.currentTime), e._panner.orientationY.setValueAtTime(e._orientation[1], Howler.ctx.currentTime), e._panner.orientationZ.setValueAtTime(e._orientation[2], Howler.ctx.currentTime)) : e._panner.setOrientation(e._orientation[0], e._orientation[1], e._orientation[2])) : (e._panner = Howler.ctx.createStereoPanner(), e._panner.pan.setValueAtTime(e._stereo, Howler.ctx.currentTime)), e._panner.connect(e._node), e._paused || e._parent.pause(e._id, true).play(e._id, true);
    };
  })();
});
var J = class extends Error {
  constructor(t = {}) {
    super(t.message);
    c(this, "name");
    c(this, "message");
    Object.setPrototypeOf(this, J.prototype), typeof t.name == "string" && (this.name = t.name);
  }
};
var si = He(oi(), 1);
var li = He(xt(), 1);
var _t = ((i) => (i.Blob = "blob", i.MediaDevices = "mediaDevices", i.OffscreenCanvas = "offscreenCanvas", i.HttpProtocol = "httpProtocol", i.SecureContext = "secureContext", i.UrlObject = "urlObject", i.WebWorkers = "webWorkers", i.WebAssembly = "webAssembly", i.WebAssemblyErrorFree = "webAssemblyErrorFree", i.WebGL = "webGL", i))(_t || {});
var mr = He(xt(), 1);
var G;
((f2) => {
  f2.userAgentInfo = new li.default(navigator.userAgent), f2.canvas = document.createElement("canvas");
  function t() {
    var S2;
    if ("orientation" in window)
      return false;
    let p = "(any-pointer: coarse)", v2 = (S2 = window.matchMedia) == null ? void 0 : S2.call(window, p);
    return navigator.maxTouchPoints === 0 || (v2 == null ? void 0 : v2.media) === p && !(v2 != null && v2.matches);
  }
  f2.isDesktopDevice = t;
  function a() {
    function p(s2, u, h2) {
      let m2 = s2[u[0]];
      return m2 == null ? false : u.length === 1 ? typeof m2 === h2 : (typeof m2 == "function" || typeof m2 == "object") && p(m2, u.slice(1), h2);
    }
    function v2(s2) {
      return s2.name === "iOS" && s2.version != null && ["11.2.2", "11.2.5", "11.2.6"].includes(s2.version);
    }
    let S2 = true, i = true, r = [];
    location.protocol.startsWith("http") || (r.push("httpProtocol"), S2 = i = false), p(window, ["isSecureContext"], "boolean") && !window.isSecureContext && r.push("secureContext"), !p(navigator, ["mediaDevices", "getUserMedia"], "function") && !p(navigator, ["enumerateDevices"], "function") && !p(window, ["MediaStreamTrack", "getSources"], "function") && (r.push("mediaDevices"), S2 = false), p(window, ["Worker"], "function") || (r.push("webWorkers"), S2 = i = false), p(window, ["WebAssembly"], "object") || (r.push("webAssembly"), S2 = i = false), p(window, ["Blob"], "function") || (r.push("blob"), S2 = i = false), p(window, ["URL", "createObjectURL"], "function") || (r.push("urlObject"), S2 = i = false), p(window, ["OffscreenCanvas"], "function") || r.push("offscreenCanvas");
    try {
      if (!p(window, ["WebGLRenderingContext"], "function") || f2.canvas.getContext("webgl") == null && f2.canvas.getContext("experimental-webgl") == null)
        throw new Error();
    } catch (s2) {
      r.push("webGL");
    }
    let n2 = f2.userAgentInfo.getOS();
    return v2(n2) && (r.push("webAssemblyErrorFree"), S2 = i = false), { fullSupport: S2, scannerSupport: i, missingFeatures: r };
  }
  f2.checkBrowserCompatibility = a;
  function o() {
    let p = "scandit-device-id", v2 = localStorage.getItem(p);
    if (v2 != null && v2 !== "")
      return v2;
    if (v2 = si.default.get(p), v2 != null && v2 !== "")
      return localStorage.setItem(p, v2), v2;
    let S2 = new Uint8Array(20);
    return crypto.getRandomValues(S2), v2 = [...S2].map((i) => {
      let r = i.toString(16);
      return r.length === 1 ? `0${r}` : r;
    }).join(""), localStorage.setItem(p, v2), v2;
  }
  f2.getDeviceId = o;
  function d(p) {
    return p instanceof HTMLElement || p != null && typeof p == "object" && typeof p.tagName == "string";
  }
  f2.isValidHTMLElement = d;
})(G || (G = {}));
var g;
((d) => {
  let l2;
  ((r) => (r.Debug = "debug", r.Info = "info", r.Warn = "warn", r.Error = "error", r.Quiet = "quiet"))(l2 = d.Level || (d.Level = {}));
  let e = /* @__PURE__ */ new Map([["debug", 1], ["info", 2], ["warn", 3], ["error", 4], ["quiet", 5]]), t = "debug";
  function a(f2) {
    t = f2;
  }
  d.setLevel = a;
  function o(f2, ...p) {
    if (!(e.get(t) > e.get(f2)))
      switch (f2) {
        case "debug":
          console.debug(...p);
          break;
        case "info":
          console.log(...p);
          break;
        case "warn":
          console.warn(...p);
          break;
        case "error":
          console.error(...p);
          break;
        default:
          break;
      }
  }
  d.log = o;
})(g || (g = {}));
function ci(l2, e = location) {
  if (l2 += l2.endsWith("/") ? "" : "/", /^https?:\/\//.test(l2))
    return l2;
  l2 = l2.split("/").filter((a) => a.length > 0).join("/"), l2 = l2 === "" ? "/" : `/${l2}/`;
  let t;
  return t = e.protocol === "file:" || e.origin === "null" ? `${e.href.split("/").slice(0, -1).join("/")}${l2}` : `${e.origin}${l2}`, t;
}
function ui(l2, e, t, a) {
  let o = false, d = "scandit-web-datacapture-core";
  if (!d)
    throw new Error("No package name, cannot generate library location");
  /^https?:\/\/([^./]*\.)*cdn.jsdelivr.net\//.test(e) ? (e = `https://cdn.jsdelivr.net/npm/${d}@${l2}/build/engine/`, o = true) : /^https?:\/\/([^./]*\.)*unpkg.com\//.test(e) && (e = `https://unpkg.com/${d}@${l2}/build/engine/`, o = true);
  let f2 = "";
  a && (f2 += "-simd");
  let p = t.replace(".wasm", "");
  return o ? { jsURI: `${e}${p}${f2}.js`, wasmURI: `${e}${p}${f2}.wasm` } : { jsURI: `${e}${p}${f2}.js?v=${l2}`, wasmURI: `${e}${p}${f2}.wasm?v=${l2}` };
}
var ue = class extends J {
  constructor(t) {
    super({ name: "UnsupportedBrowserError", message: `This OS / browser has one or more missing features preventing it from working correctly (${t.missingFeatures.join(", ")})` });
    c(this, "data");
    this.data = t;
  }
};
var Y;
((D2) => {
  let l2 = /* @__PURE__ */ new Map([["DeviceCaptureError", "AbortError"], ["NotSupportedError", "AbortError"], ["ScreenCaptureError", "AbortError"], ["TabCaptureError", "AbortError"], ["TypeError", "AbortError"], ["InvalidStateError", "NotAllowedError"], ["MediaDeviceFailedDueToShutdown", "NotAllowedError"], ["MediaDeviceKillSwitchOn", "NotAllowedError"], ["PermissionDeniedError", "NotAllowedError"], ["PermissionDismissedError", "NotAllowedError"], ["DevicesNotFoundError", "NotFoundError"], ["SourceUnavailableError", "NotReadableError"], ["TrackStartError", "NotReadableError"], ["ConstraintNotSatisfiedError", "OverconstrainedError"]]), e = ["rear", "back", "r\xFCck", "arri\xE8re", "trasera", "tr\xE1s", "traseira", "posteriore", "\u540E\u9762", "\u5F8C\u9762", "\u80CC\u9762", "\u540E\u7F6E", "\u5F8C\u7F6E", "\u80CC\u7F6E", "\u0437\u0430\u0434\u043D\u0435\u0439", "\u0627\u0644\u062E\u0644\u0641\u064A\u0629", "\uD6C4", "arka", "achterzijde", "\u0E2B\u0E25\u0E31\u0E07", "baksidan", "bagside", "sau", "bak", "tylny", "takakamera", "belakang", "\u05D0\u05D7\u05D5\u05E8\u05D9\u05EA", "\u03C0\u03AF\u03C3\u03C9", "spate", "h\xE1ts\xF3", "zadn\xED", "darrere", "zadn\xE1", "\u0437\u0430\u0434\u043D\u044F", "stra\u017Enja", "belakang", "\u092C\u0948\u0915"], t, a = false;
  D2.mainCameraForPositionOverridesOnDesktop = /* @__PURE__ */ new Map(), D2.deviceIdToCameraObjects = /* @__PURE__ */ new Map(), D2.inaccessibleDeviceIds = /* @__PURE__ */ new Set();
  function p() {
    a = true;
  }
  function v2(y2) {
    let A = y2.toLowerCase();
    return e.some((M2) => A.includes(M2));
  }
  function S2(y2) {
    var M2;
    let A;
    A = y2.message === "Invalid constraint" ? "OverconstrainedError" : (M2 = l2.get(y2.name)) != null ? M2 : y2.name, Object.defineProperty(y2, "name", { value: A });
  }
  function i(y2, A) {
    let M2;
    if (G.isDesktopDevice())
      M2 = D2.mainCameraForPositionOverridesOnDesktop.has(A) ? D2.mainCameraForPositionOverridesOnDesktop.get(A) : y2.find((w2) => w2.position === A);
    else {
      let w2 = y2.every((L2) => L2.label === ""), I2 = y2.every((L2) => L2.label !== ""), E = y2.length > 1 && !w2 && !I2;
      if (w2)
        M2 = y2[A === "userFacing" ? 0 : y2.length - 1];
      else if (E) {
        let L2 = y2.filter((z2) => z2.position === A);
        L2.length === 1 ? M2 = L2[0] : L2.length > 1 && (M2 = L2[A === "userFacing" ? 0 : L2.length - 1]);
      } else
        M2 = y2.filter((L2) => L2.position === A).sort((L2, z2) => L2.label.localeCompare(z2.label))[0];
    }
    return M2;
  }
  D2.getMainCameraForPosition = i;
  function r(y2, A) {
    function M2(E, L2) {
      let z2 = D2.mainCameraForPositionOverridesOnDesktop.get(L2);
      return z2 != null && E.includes(z2) && (E = E.filter((ce) => ce !== z2), E.unshift(z2)), E;
    }
    let w2 = y2.filter((E) => E.position === "userFacing"), I2 = y2.filter((E) => E.position === "worldFacing");
    return G.isDesktopDevice() ? (w2 = M2(w2, "userFacing"), I2 = M2(I2, "worldFacing")) : y2.every((E) => E.label === "") ? I2.reverse() : (w2.sort((E, L2) => E.label.localeCompare(L2.label)), I2.sort((E, L2) => E.label.localeCompare(L2.label))), A === "userFacing" ? [...w2, ...I2] : [...I2, ...w2];
  }
  D2.sortCamerasForCameraPosition = r;
  function n2(y2, A) {
    let M2 = y2.getVideoTracks();
    if (M2.length > 0) {
      let w2 = M2[0], I2;
      typeof w2.getSettings == "function" && (I2 = w2.getSettings(), I2.facingMode != null && I2.facingMode.length > 0 && (A.position = I2.facingMode === "environment" ? "worldFacing" : "userFacing")), w2.label != null && w2.label.length > 0 && (A.label = w2.label);
    }
  }
  D2.adjustCameraFromMediaStream = n2;
  function s2(y2) {
    function A(w2, I2, E) {
      var Le;
      if (D2.deviceIdToCameraObjects.has(w2.deviceId))
        return D2.deviceIdToCameraObjects.get(w2.deviceId);
      let L2 = (Le = w2.label) != null ? Le : "", z2;
      return !G.isDesktopDevice() && E.every((ve) => ve.label === "" && !D2.deviceIdToCameraObjects.has(ve.deviceId)) ? z2 = E.length === 1 || I2 + 1 <= Math.floor(E.length / 2) ? "userFacing" : "worldFacing" : z2 = v2(L2) ? "worldFacing" : "userFacing", { position: z2, label: L2, deviceId: w2.deviceId };
    }
    let M2 = y2.map(A).map((w2) => (w2.deviceId !== "" && D2.deviceIdToCameraObjects.set(w2.deviceId, w2), w2)).filter((w2) => !/\b(?:ir|infrared)\b/i.test(w2.label)).filter((w2) => !D2.inaccessibleDeviceIds.has(w2.deviceId));
    if (!G.isDesktopDevice() && M2.length > 1 && !M2.some((w2) => w2.position === "worldFacing")) {
      let w2 = M2.length - 1, I2 = M2.map((E) => {
        let L2 = /\b(\d+)mp?\b/i.exec(E.label);
        return L2 != null ? Number.parseInt(L2[1], 10) : Number.NaN;
      });
      I2.some((E) => isNaN(E)) || (w2 = I2.lastIndexOf(Math.max(...I2))), M2[w2].position = "worldFacing";
    }
    return M2;
  }
  async function u() {
    if (t != null && t.length > 0 && t.every((y2) => y2.label === "" && !D2.deviceIdToCameraObjects.has(y2.deviceId)))
      try {
        return await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      } catch (y2) {
      }
  }
  function h2(y2, A) {
    var M2;
    if (A.length > 0 && y2.length === A.length && !A.every((w2, I2) => y2[I2].deviceId === w2.deviceId)) {
      let w2 = {};
      for (let [I2, E] of y2.entries()) {
        let L2 = D2.deviceIdToCameraObjects.get(E.deviceId);
        if (L2 == null || L2.label !== ((M2 = A[I2].label) != null ? M2 : ""))
          continue;
        let z2 = A[I2].deviceId;
        w2[L2.deviceId] = z2, D2.inaccessibleDeviceIds.has(L2.deviceId) && D2.inaccessibleDeviceIds.add(z2), L2.deviceId = z2, D2.deviceIdToCameraObjects.set(z2, L2);
      }
      g.log(g.Level.Debug, "Detected updated camera deviceId information and updated it accordingly", w2);
    }
  }
  async function m2(y2 = false, A = false) {
    let M2 = G.checkBrowserCompatibility();
    if (!M2.fullSupport)
      throw new ue(M2);
    if (typeof navigator.mediaDevices.addEventListener == "function" ? navigator.mediaDevices.addEventListener("devicechange", p) : navigator.mediaDevices.ondevicechange = p, t == null || y2 || a) {
      a = false;
      let I2, E = t != null ? t : [];
      t = [];
      try {
        t = await B2(), A || (I2 = await u(), I2 != null && (t = await B2())), g.log(g.Level.Debug, "Camera list (devices):", ...t), h2(E, t);
      } catch (L2) {
        throw S2(L2), L2;
      } finally {
        if (I2 != null)
          for (let L2 of I2.getVideoTracks())
            L2.stop();
      }
    }
    let w2 = s2(t);
    return g.log(g.Level.Debug, "Camera list (cameras): ", ...w2), [...w2];
  }
  D2.getCameras = m2;
  async function b2(y2) {
    return g.log(g.Level.Debug, "Attempt to access camera (parameters):", y2.video), new Promise((A, M2) => {
      window.setTimeout(() => {
        var w2;
        ((w2 = navigator.mediaDevices.getUserMedia(y2)) != null ? w2 : Promise.reject(new J({ name: "AbortError" }))).then(A).catch(M2);
      }, 0);
    });
  }
  function C2(y2) {
    let A = { resizeMode: "none" };
    switch (y2) {
      case 0:
        return Z(Q({}, A), { width: { min: 3200, ideal: 3840, max: 4096 }, height: { min: 1800, ideal: 2160, max: 2400 } });
      case 1:
        return Z(Q({}, A), { width: { min: 1400, ideal: 1920, max: 2160 }, height: { min: 900, ideal: 1080, max: 1440 } });
      case 2:
        return Z(Q({}, A), { width: { min: 960, ideal: 1280, max: 1440 }, height: { min: 480, ideal: 720, max: 960 } });
      case 3:
        return Z(Q({}, A), { width: { min: 640, ideal: 640, max: 800 }, height: { min: 480, ideal: 480, max: 600 } });
      case 4:
      default:
        return {};
    }
  }
  async function _2(y2, A) {
    g.log(g.Level.Debug, "Attempt to access camera (camera):", A);
    let M2 = { audio: false, video: C2(y2) };
    A.deviceId === "" ? M2.video.facingMode = { ideal: A.position === "worldFacing" ? "environment" : "user" } : M2.video.deviceId = { exact: A.deviceId };
    try {
      let w2 = await b2(M2);
      return n2(w2, A), w2;
    } catch (w2) {
      throw S2(w2), ["OverconstrainedError", "NotReadableError", "NotAllowedError"].includes(w2.name) || j2(A), w2;
    }
  }
  D2.accessCameraStream = _2;
  function j2(y2) {
    y2.deviceId !== "" && (g.log(g.Level.Debug, "Camera marked to be inaccessible:", y2), D2.inaccessibleDeviceIds.add(y2.deviceId));
  }
  D2.markCameraAsInaccessible = j2;
  async function B2() {
    let y2;
    if (typeof navigator.enumerateDevices == "function")
      y2 = await navigator.enumerateDevices();
    else if (typeof navigator.mediaDevices == "object" && typeof navigator.mediaDevices.enumerateDevices == "function")
      y2 = await navigator.mediaDevices.enumerateDevices();
    else
      throw new ue({ fullSupport: false, scannerSupport: true, missingFeatures: ["mediaDevices"] });
    return y2.filter((A) => A.kind === "videoinput");
  }
})(Y || (Y = {}));
var Ye;
((e) => {
  async function l2(t, a) {
    return Y.getCameras(t != null ? t : false, a != null ? a : false);
  }
  e.getCameras = l2;
})(Ye || (Ye = {}));
var mi = "PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU4IDEwSDI4LjZMMjIuOS41QTEgMSAwIDAgMCAyMiAwSDJhMiAyIDAgMCAwLTIgMnY0NmE2IDYgMCAwIDAgNiA2aDQ4YTYgNiAwIDAgMCA2LTZWMTJhMiAyIDAgMCAwLTItMlptLTM3LjUgOGE0LjUgNC41IDAgMSAxIDAgOSA0LjUgNC41IDAgMCAxIDAtOVptMjcuNCAyNy41YTEgMSAwIDAgMS0uOS41SDEzYTEgMSAwIDAgMS0uOC0xLjVsNy0xMWExIDEgMCAwIDEgMS42LS4xbDUgNiA5LjQtMTVhMSAxIDAgMCAxIDEuMy0uM2wuNC40IDExIDIwYTEgMSAwIDAgMSAwIDFaIi8+PC9zdmc+";
var pi = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjQuNjIgMTIuMjIiPjxwYXRoIGQ9Ik0xMDEuNTUuOTFhMi4yOCAyLjI4IDAgMCAwLTEuOTcgMS43MSAyLjcyIDIuNzIgMCAwIDAgMCAxLjExIDIuNDIgMi40MiAwIDAgMCAxLjI0IDEuNTRjLjQ2LjIzLjUuMjQgMS43OS4yNmwxLjE1LjAyLjIyLjFhMS41MSAxLjUxIDAgMCAxIC44IDEuNyAxLjQxIDEuNDEgMCAwIDEtMS4wNiAxLjA4Yy0uMTIuMDMtLjguMDQtMi4wOS4wNGE3Ljc0IDcuNzQgMCAwIDAtMS45My4wNSAzLjE5IDMuMTkgMCAwIDAgLjAxLjc3IDE0LjY5IDE0LjY5IDAgMCAwIDIuMS4wM2wyLjA4LS4wMS4yNi0uMWEyLjI3IDIuMjcgMCAwIDAgMS41LTEuNzQgMi41NSAyLjU1IDAgMCAwLS4wOC0xLjIgMi40IDIuNCAwIDAgMC0xLjE0LTEuMzZjLS40Ni0uMjItLjU1LS4yMy0xLjY1LS4yMy0xLjMyIDAtMS41My0uMDYtMS45NS0uNDdhMS40OCAxLjQ4IDAgMCAxLS40NS0uOTQgMS40MyAxLjQzIDAgMCAxIC45NC0xLjRjLjItLjA4LjItLjA4IDIuMDktLjFsMS45LS4wMXYtLjQxYy4wMi0uMzEgMC0uNDItLjAyLS40NC0uMDYtLjA0LTMuNDMtLjAzLTMuNzQgMFptMjAuMDIuMTFjLS4zNCAxLjI0LTIuMiA4LjI3LTIuMTkgOC4yOGExLjg2IDEuODYgMCAwIDAgLjQ0LjAzYy4zOCAwIC40MyAwIC40NC0uMDZsMS0zLjcyLjk4LTMuNyAxIDMuNjcgMSAzLjc1YzAgLjAzLjA2LjA2LjQ1LjA2aC40NWwtLjAyLS4xYy0uMDQtLjE1LTIuMTMtOC0yLjE5LTguMThsLS4wNS0uMTdoLTEuMjdsLS4wNC4xNFptOC4yMyA0LjA4VjkuM2guODNsLjAyLTMuNzcuMDEtMy43NyAyLjIgMy43NyAyLjIgMy43Ny41Mi4wMS41Mi4wMVY1LjEyTDEzNi4wOS45aC0uODZsLS4wMiAzLjQzLS4wMiAzLjQ0LTIuMDItMy40NEwxMzEuMTYuOWwtLjY5LS4wMWgtLjY4Wk0xNTIuNzkuOTNjLS4wMy4wNy0uMDMgOC4yOCAwIDguMzUuMDEuMDQuMDguMDUuNDMuMDVoLjRWLjg4aC0uNGMtLjM1IDAtLjQyLjAxLS40My4wNVptNS4yMi4zNnYuNDJoMi44NHYzLjhsLjAyIDMuOGguMzhhMS4wNSAxLjA1IDAgMCAwIC40Mi0uMDJjLjA0LS4wNC4wNC0uNjMuMDQtMy44MVYxLjdoMi44Vi44OGgtNi41Wk0xMTEuODUuOTZhMy4yNyAzLjI3IDAgMCAwLTIuMDQgMS42NCA0Ljk4IDQuOTggMCAwIDAtLjU1IDEuNzkgOC4yNCA4LjI0IDAgMCAwIC4wOCAyLjA2IDMuMzUgMy4zNSAwIDAgMCAyLjI4IDIuNzkgNy44NSA3Ljg1IDAgMCAwIDIuMS4wN2gxLjgzbC4wMS0uNDIuMDEtLjQyaC0xLjcxYy0xLjkgMC0xLjk0IDAtMi4zNS0uMjFhMi44NSAyLjg1IDAgMCAxLTEuMzUtMi4xIDcuMTcgNy4xNyAwIDAgMS0uMDMtMS43NyAzLjA4IDMuMDggMCAwIDEgMS43LTIuNTNjLjE4LS4wNy4yMS0uMDcgMS45NC0uMWgxLjc1Vi45MmgtMS43NGExNS45NyAxNS45NyAwIDAgMC0xLjkzLjA0Wm0yOS41NyA0LjE1djQuMmwxLjguMDFhOS41NiA5LjU2IDAgMCAwIDIuNjQtLjEzYzEuNTgtLjQ1IDIuNDktMi4xIDIuNDEtNC4zOGE0LjMxIDQuMzEgMCAwIDAtLjQzLTEuODYgMy43NiAzLjc2IDAgMCAwLTEuODctMS44NGMtLjUtLjE5LS41OC0uMi0yLjY2LS4yaC0xLjl2NC4yWm0zLjc5LTMuM2EyLjgxIDIuODEgMCAwIDEgMi4wNCAyLjA1IDMuNDkgMy40OSAwIDAgMSAuMTYgMS4zNkE0LjQ4IDQuNDggMCAwIDEgMTQ3IDcuMWEyLjIzIDIuMjMgMCAwIDEtMS4wNSAxLjEzYy0uNDUuMjItLjQ2LjIyLTIuMTUuMjRoLTEuNTN2LTYuN2gxLjM2Yy44IDAgMS40NS4wMiAxLjU4LjA0WiIgZmlsbD0iIzEyMTYxOSIgc3Ryb2tlPSIjMTIxNjE5IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iLjIiLz48cGF0aCBkPSJNNS45IDIuOTRoMS4xN2EzLjI3IDMuMjcgMCAwIDAtLjI5LTEuMzJBMi41NyAyLjU3IDAgMCAwIDYuMDUuNyAzIDMgMCAwIDAgNC45OC4xNyA0Ljk2IDQuOTYgMCAwIDAgMy42NSAwYTQuNzYgNC43NiAwIDAgMC0xLjI0LjE3IDMuNDEgMy40MSAwIDAgMC0xLjA4LjQ5IDIuNSAyLjUgMCAwIDAtLjc2Ljg0QTIuNDYgMi40NiAwIDAgMCAuMyAyLjcyYTIuMDMgMi4wMyAwIDAgMCAuMjUgMS4wNiAyLjA2IDIuMDYgMCAwIDAgLjY4LjY5IDMuOTMgMy45MyAwIDAgMCAuOTUuNDNxLjUzLjE2IDEuMDkuMjhsMS4wOC4yNGE0Ljk1IDQuOTUgMCAwIDEgLjk2LjMgMS44NiAxLjg2IDAgMCAxIC42OC41IDEuMTcgMS4xNyAwIDAgMSAuMjUuNzcgMS41MiAxLjUyIDAgMCAxLS4yMS44NCAxLjUxIDEuNTEgMCAwIDEtLjU1LjUgMi40NyAyLjQ3IDAgMCAxLS43Ni4yOCA0LjYxIDQuNjEgMCAwIDEtLjgzLjA3IDMuOTcgMy45NyAwIDAgMS0xLjAyLS4xMyAyLjUyIDIuNTIgMCAwIDEtLjg2LS40IDIuMDcgMi4wNyAwIDAgMS0uNi0uNyAyLjEgMi4xIDAgMCAxLS4yMy0xSDBBMy4yNiAzLjI2IDAgMCAwIC4zIDcuOWEyLjggMi44IDAgMCAwIC44NCAxLjAxIDMuNjQgMy42NCAwIDAgMCAxLjIyLjYgNS40NCA1LjQ0IDAgMCAwIDEuNDguMiA1LjY0IDUuNjQgMCAwIDAgMS4yOC0uMTYgMy43IDMuNyAwIDAgMCAxLjE2LS40OCAyLjczIDIuNzMgMCAwIDAgLjg1LS44NiAyLjMzIDIuMzMgMCAwIDAgLjMzLTEuMjYgMi4zMyAyLjMzIDAgMCAwLS4yNS0xLjE1IDIuMjYgMi4yNiAwIDAgMC0uNjgtLjc1IDMuNTggMy41OCAwIDAgMC0uOTUtLjQ4cS0uNTQtLjE4LTEuMDktLjN0LTEuMDgtLjI0YTUuNjggNS42OCAwIDAgMS0uOTYtLjI4IDEuODggMS44OCAwIDAgMS0uNjgtLjQ0Ljk3Ljk3IDAgMCAxLS4yNS0uNyAxLjUgMS41IDAgMCAxIC4xNy0uNzUgMS4zNiAxLjM2IDAgMCAxIC40Ny0uNSAyLjA0IDIuMDQgMCAwIDEgLjY3LS4yNSAzLjc4IDMuNzggMCAwIDEgLjc3LS4wOCAyLjYyIDIuNjIgMCAwIDEgMS41OC40NSAxLjkzIDEuOTMgMCAwIDEgLjcyIDEuNDVabTkuMzkgMmgxLjE0YTIuNjYgMi42NiAwIDAgMC0uMzEtMS4wNCAyLjMgMi4zIDAgMCAwLS42My0uNzIgMi42MSAyLjYxIDAgMCAwLS44OS0uNDIgNC4wNiA0LjA2IDAgMCAwLTEuMDctLjE0IDMuMjUgMy4yNSAwIDAgMC0xLjM5LjI4IDIuNzggMi43OCAwIDAgMC0xIC43NyAzLjI2IDMuMjYgMCAwIDAtLjU5IDEuMTQgNC45MyA0LjkzIDAgMCAwLS4yIDEuNDIgNC41MyA0LjUzIDAgMCAwIC4yIDEuMzggMy4wNCAzLjA0IDAgMCAwIC42IDEuMDkgMi42MyAyLjYzIDAgMCAwIDEgLjcgMy41IDMuNSAwIDAgMCAxLjM1LjI0IDIuOTIgMi45MiAwIDAgMCAyLjA0LS42NyAzLjEgMy4xIDAgMCAwIC45My0xLjkzaC0xLjEzYTEuOTQgMS45NCAwIDAgMS0uNTcgMS4yMSAxLjggMS44IDAgMCAxLTEuMjguNDMgMS44MyAxLjgzIDAgMCAxLS45LS4yIDEuNzUgMS43NSAwIDAgMS0uNi0uNTYgMi40NCAyLjQ0IDAgMCAxLS4zNS0uNzggMy43NCAzLjc0IDAgMCAxLS4xMS0uOTEgNC41NyA0LjU3IDAgMCAxIC4xLS45OSAyLjQ2IDIuNDYgMCAwIDEgLjM1LS44NCAxLjc4IDEuNzggMCAwIDEgLjY0LS41OCAyLjA2IDIuMDYgMCAwIDEgMS0uMjIgMS42OCAxLjY4IDAgMCAxIDEuMTIuMzUgMS42OCAxLjY4IDAgMCAxIC41NS45OVpNMjUuNiA5LjQ4YTEuNTYgMS41NiAwIDAgMS0uOC4xNy45NS45NSAwIDAgMS0uNjgtLjI1IDEuMDQgMS4wNCAwIDAgMS0uMjUtLjc4IDIuNjQgMi42NCAwIDAgMS0xLjA2Ljc4IDMuNSAzLjUgMCAwIDEtMS4zLjI1IDMuNSAzLjUgMCAwIDEtLjg3LS4xIDIuMDEgMi4wMSAwIDAgMS0uNy0uMzMgMS41NiAxLjU2IDAgMCAxLS40OC0uNTggMS45NSAxLjk1IDAgMCAxLS4xNy0uODYgMS45NyAxLjk3IDAgMCAxIC4yLS45NCAxLjcgMS43IDAgMCAxIC41LS41OSAyLjM1IDIuMzUgMCAwIDEgLjczLS4zNXEuNC0uMTEuODQtLjIuNDUtLjA4Ljg2LS4xM2E0LjgyIDQuODIgMCAwIDAgLjcyLS4xMyAxLjIgMS4yIDAgMCAwIC41LS4yNS42LjYgMCAwIDAgLjE4LS40NyAxLjEgMS4xIDAgMCAwLS4xNC0uNTkuOTQuOTQgMCAwIDAtLjM1LS4zMyAxLjQzIDEuNDMgMCAwIDAtLjQ4LS4xNiAzLjYzIDMuNjMgMCAwIDAtLjUzLS4wNCAyLjM0IDIuMzQgMCAwIDAtMS4xNy4yNyAxLjEzIDEuMTMgMCAwIDAtLjUgMWgtMS4xYTIuMzkgMi4zOSAwIDAgMSAuMjYtMS4wNSAxLjk3IDEuOTcgMCAwIDEgLjYyLS43IDIuNjIgMi42MiAwIDAgMSAuOS0uMzggNC43IDQuNyAwIDAgMSAxLjA3LS4xMiA2LjMgNi4zIDAgMCAxIC45LjA3IDIuMzYgMi4zNiAwIDAgMSAuOC4yNiAxLjU2IDEuNTYgMCAwIDEgLjYuNTcgMS44MSAxLjgxIDAgMCAxIC4yMS45NXYzLjQ1YTIuNTkgMi41OSAwIDAgMCAuMDUuNThxLjA0LjE5LjMuMTlhMS4xIDEuMSAwIDAgMCAuMzQtLjA3Wm0tMS44LTMuNDVhMS4zOCAxLjM4IDAgMCAxLS41NC4yM3EtLjMzLjA3LS43LjEydC0uNzUuMWEyLjc1IDIuNzUgMCAwIDAtLjY4LjE4IDEuMjMgMS4yMyAwIDAgMC0uNDguMzcgMS4wNCAxLjA0IDAgMCAwLS4yLjY2LjkuOSAwIDAgMCAuMTIuNDYuOTIuOTIgMCAwIDAgLjI4LjMgMS4yIDEuMiAwIDAgMCAuNDEuMTggMi4yNyAyLjI3IDAgMCAwIC41LjA1IDIuNjIgMi42MiAwIDAgMCAuOTMtLjE1IDEuOTcgMS45NyAwIDAgMCAuNjQtLjM4IDEuNDkgMS40OSAwIDAgMCAuMzctLjUgMS4yNSAxLjI1IDAgMCAwIC4xMS0uNVptNC43OC0zLjI1VjkuNWgxLjFWNS43YTIuNzIgMi43MiAwIDAgMSAuMTItLjg0IDEuOSAxLjkgMCAwIDEgLjM3LS42NiAxLjY1IDEuNjUgMCAwIDEgLjYyLS40NSAyLjI1IDIuMjUgMCAwIDEgLjg4LS4xNSAxLjM1IDEuMzUgMCAwIDEgMSAuMzYgMS4zMyAxLjMzIDAgMCAxIC4zNi45OVY5LjVoMS4xVjUuMDhhNC4xNiA0LjE2IDAgMCAwLS4xLTEgMS44OCAxLjg4IDAgMCAwLS40LS43NyAxLjgyIDEuODIgMCAwIDAtLjctLjUgMi45MiAyLjkyIDAgMCAwLTEuMS0uMTggMi4zMyAyLjMzIDAgMCAwLTIuMTkgMS4yMmgtLjAzVjIuNzhabTkuMTggMFY5LjVoMS4xVjUuN2EyLjcyIDIuNzIgMCAwIDEgLjEyLS44NCAxLjkgMS45IDAgMCAxIC4zNy0uNjYgMS42NSAxLjY1IDAgMCAxIC42Mi0uNDUgMi4yNSAyLjI1IDAgMCAxIC44OC0uMTUgMS4zNSAxLjM1IDAgMCAxIDEgLjM3IDEuMzMgMS4zMyAwIDAgMSAuMzYuOThWOS41aDEuMVY1LjA4YTQuMTYgNC4xNiAwIDAgMC0uMS0xIDEuODggMS44OCAwIDAgMC0uNC0uNzcgMS44MiAxLjgyIDAgMCAwLS43LS41IDIuOTIgMi45MiAwIDAgMC0xLjEtLjE4IDIuMzMgMi4zMyAwIDAgMC0yLjE5IDEuMjJoLS4wM1YyLjc4Wm0xMC4zNC0xLjJWLjIxaC0xLjF2MS4zNVptLTEuMSAxLjJWOS41aDEuMVYyLjc4Wm00Ljc3IDBWOS41aDEuMVY1LjdhMi43MiAyLjcyIDAgMCAxIC4xMy0uODQgMS45IDEuOSAwIDAgMSAuMzctLjY2IDEuNjUgMS42NSAwIDAgMSAuNjItLjQ1IDIuMjUgMi4yNSAwIDAgMSAuODctLjE1IDEuMzUgMS4zNSAwIDAgMSAxIC4zNiAxLjMzIDEuMzMgMCAwIDEgLjM3Ljk5VjkuNWgxLjFWNS4wOGE0LjE2IDQuMTYgMCAwIDAtLjExLTEgMS44OCAxLjg4IDAgMCAwLS4zOS0uNzcgMS44MiAxLjgyIDAgMCAwLS43MS0uNSAyLjkyIDIuOTIgMCAwIDAtMS4xLS4xOCAyLjMzIDIuMzMgMCAwIDAtMi4xOSAxLjIyaC0uMDJWMi43OFptMTQuOTggNi4xNVYyLjc4aC0xLjA0di45NmgtLjAxYTEuOTcgMS45NyAwIDAgMC0uODQtLjg0IDIuNDggMi40OCAwIDAgMC0xLjE3LS4yOCAzIDMgMCAwIDAtMS40Ni4zNCAyLjg1IDIuODUgMCAwIDAtLjk3Ljg0IDMuMzUgMy4zNSAwIDAgMC0uNTIgMS4xNSA1LjEgNS4xIDAgMCAwLS4xNSAxLjIyIDQuNDUgNC40NSAwIDAgMCAuMTkgMS4zMSAzLjEzIDMuMTMgMCAwIDAgLjU2IDEuMDggMi43NSAyLjc1IDAgMCAwIC45NC43MyAyLjk2IDIuOTYgMCAwIDAgMS4zMS4yOCAyLjY5IDIuNjkgMCAwIDAgMS4yMy0uMyAxLjg2IDEuODYgMCAwIDAgLjg2LS45MWguMDN2LjQ0YTQuNDcgNC40NyAwIDAgMS0uMTIgMS4wMyAyLjE1IDIuMTUgMCAwIDEtLjM1LjggMS43MyAxLjczIDAgMCAxLS42My41MiAyLjA1IDIuMDUgMCAwIDEtLjkyLjE5IDIuOTggMi45OCAwIDAgMS0uNTctLjA2IDIuMDggMi4wOCAwIDAgMS0uNTUtLjIgMS4zOCAxLjM4IDAgMCAxLS40My0uMzMuODIuODIgMCAwIDEtLjItLjVoLTEuMWExLjc0IDEuNzQgMCAwIDAgLjMuOTIgMi4wNiAyLjA2IDAgMCAwIC42NS42IDIuOTMgMi45MyAwIDAgMCAuODkuMzUgNC41NyA0LjU3IDAgMCAwIC45NS4xQTMuMDcgMy4wNyAwIDAgMCA2NiAxMS40YTMuNTQgMy41NCAwIDAgMCAuNzYtMi40N1ptLTMuMS0uMzNhMS42OSAxLjY5IDAgMCAxLS45LS4yMiAxLjc2IDEuNzYgMCAwIDEtLjYtLjYgMi41OSAyLjU5IDAgMCAxLS4zLS44MyA0LjYzIDQuNjMgMCAwIDEtLjEtLjkxIDMuOCAzLjggMCAwIDEgLjExLS45MiAyLjI5IDIuMjkgMCAwIDEgLjM1LS43OCAxLjc3IDEuNzcgMCAwIDEgLjYyLS41NCAxLjkgMS45IDAgMCAxIC45MS0uMiAxLjc1IDEuNzUgMCAwIDEgLjg5LjIgMS43MiAxLjcyIDAgMCAxIC41OS41NiAyLjQzIDIuNDMgMCAwIDEgLjMzLjc3IDMuNjggMy42OCAwIDAgMSAuMS44NyA0LjA2IDQuMDYgMCAwIDEtLjExLjk0IDIuNzMgMi43MyAwIDAgMS0uMzUuODQgMS44MSAxLjgxIDAgMCAxLS42MS42IDEuOCAxLjggMCAwIDEtLjkzLjIyWk03NS45Ny4yMlY5LjVoMS4xdi0uOWguMDNhMS43OCAxLjc4IDAgMCAwIC40NS41IDIuMzYgMi4zNiAwIDAgMCAuNTYuMzIgMy4wNyAzLjA3IDAgMCAwIC42LjE3IDMuMzIgMy4zMiAwIDAgMCAuNTUuMDUgMy4xMiAzLjEyIDAgMCAwIDEuMzYtLjI3IDIuNyAyLjcgMCAwIDAgLjk2LS43NCAzLjE4IDMuMTggMCAwIDAgLjU3LTEuMTIgNC43NCA0Ljc0IDAgMCAwIC4yLTEuMzUgNC42IDQuNiAwIDAgMC0uMi0xLjM1IDMuNDIgMy40MiAwIDAgMC0uNTgtMS4xMyAyLjc2IDIuNzYgMCAwIDAtLjk2LS43NyAzLjAzIDMuMDMgMCAwIDAtMS4zNi0uMjkgMy4yIDMuMiAwIDAgMC0xLjI5LjI2IDEuNjUgMS42NSAwIDAgMC0uODYuODFoLS4wMlYuMjJabTUuMiA1Ljg2YTQuNDIgNC40MiAwIDAgMS0uMS45NyAyLjU0IDIuNTQgMCAwIDEtLjM0LjgzIDEuNzggMS43OCAwIDAgMS0uNjEuNTggMS44OSAxLjg5IDAgMCAxLS45Ni4yMiAyLjA1IDIuMDUgMCAwIDEtLjk3LS4yMSAxLjkgMS45IDAgMCAxLS42Ni0uNTcgMi4zNyAyLjM3IDAgMCAxLS4zNy0uOCAzLjg3IDMuODcgMCAwIDEtLjEyLS45NiAzLjkgMy45IDAgMCAxIC4xMS0uOTMgMi40MiAyLjQyIDAgMCAxIC4zNi0uOCAxLjkgMS45IDAgMCAxIC42NC0uNTkgMS45IDEuOSAwIDAgMSAuOTUtLjIyIDEuOTcgMS45NyAwIDAgMSAuOTMuMiAxLjg1IDEuODUgMCAwIDEgLjY1LjU3IDIuNDcgMi40NyAwIDAgMSAuMzcuOCAzLjQ0IDMuNDQgMCAwIDEgLjEyLjkxWm03LjA2IDQuMzJhNy4wMyA3LjAzIDAgMCAxLS4zOC44NCAyLjI3IDIuMjcgMCAwIDEtLjQyLjU1IDEuNDEgMS40MSAwIDAgMS0uNS4zMSAxLjk1IDEuOTUgMCAwIDEtLjY1LjEgMi45NSAyLjk1IDAgMCAxLS4zOS0uMDMgMS44NCAxLjg0IDAgMCAxLS4zNy0uMDl2LTEuMDJhMS44NiAxLjg2IDAgMCAwIC4zMy4xMSAxLjQgMS40IDAgMCAwIC4zMi4wNS45NS45NSAwIDAgMCAuNTYtLjE2IDEgMSAwIDAgMCAuMzQtLjQ2bC40Ni0xLjE0LTIuNjctNi42OGgxLjI1bDEuOTcgNS41aC4wMkw5MCAyLjc4aDEuMTdaIiBmaWxsPSIjMTIxNjE5Ii8+PC9zdmc+";
var re = class {
  constructor(e, t) {
    c(this, "_x");
    c(this, "_y");
    this._x = e, this._y = t;
  }
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  static fromJSON(e) {
    return new re(e.x, e.y);
  }
  toJSONObject() {
    return { x: this.x, y: this.y };
  }
};
var be = class {
  constructor(e, t, a, o) {
    c(this, "_topLeft");
    c(this, "_topRight");
    c(this, "_bottomRight");
    c(this, "_bottomLeft");
    this._topLeft = e, this._topRight = t, this._bottomRight = a, this._bottomLeft = o;
  }
  get topLeft() {
    return this._topLeft;
  }
  get topRight() {
    return this._topRight;
  }
  get bottomRight() {
    return this._bottomRight;
  }
  get bottomLeft() {
    return this._bottomLeft;
  }
  static fromJSON(e) {
    return new be(re.fromJSON(e.topLeft), re.fromJSON(e.topRight), re.fromJSON(e.bottomRight), re.fromJSON(e.bottomLeft));
  }
  toJSONObject() {
    return { topLeft: this.topLeft.toJSONObject(), topRight: this.topRight.toJSONObject(), bottomLeft: this.bottomLeft.toJSONObject(), bottomRight: this.bottomRight.toJSONObject() };
  }
};
var Dt = ((t) => (t.Pixel = "pixel", t.Fraction = "fraction", t))(Dt || {});
var R = class {
  constructor(e, t) {
    c(this, "_value");
    c(this, "_unit");
    this._value = e, this._unit = t;
  }
  get value() {
    return this._value;
  }
  get unit() {
    return this._unit;
  }
  static fromJSON(e) {
    return new R(e.value, e.unit);
  }
  toJSONObject() {
    return { unit: this.unit, value: this.value };
  }
};
var se = class {
  constructor(e, t) {
    c(this, "_x");
    c(this, "_y");
    this._x = e, this._y = t;
  }
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  static fromJSON(e) {
    return new se(R.fromJSON(e.x), R.fromJSON(e.y));
  }
  static get zero() {
    return new se(new R(0, "pixel"), new R(0, "pixel"));
  }
  toJSONObject() {
    return { x: this.x.toJSONObject(), y: this.y.toJSONObject() };
  }
};
var de = class {
  constructor(e, t) {
    c(this, "_width");
    c(this, "_height");
    this._width = e, this._height = t;
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  isSameAs(e) {
    return JSON.stringify(this.toJSONObject()) === JSON.stringify(e.toJSONObject());
  }
  toJSONObject() {
    return { width: this.width.toJSONObject(), height: this.height.toJSONObject() };
  }
  static fromJSON(e) {
    return new de(R.fromJSON(e.width), R.fromJSON(e.height));
  }
};
var Ce = class {
  constructor(e, t) {
    c(this, "_width");
    c(this, "_height");
    this._width = e, this._height = t;
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  static fromJSON(e) {
    return new Ce(e.width, e.height);
  }
  toJSONObject() {
    return { height: this.height, width: this.width };
  }
};
var Ee = class {
  constructor(e, t) {
    c(this, "_size");
    c(this, "_aspect");
    this._size = e, this._aspect = t;
  }
  get size() {
    return this._size;
  }
  get aspect() {
    return this._aspect;
  }
};
var pr = ((o) => (o.WidthAndHeight = "widthAndHeight", o.WidthAndAspectRatio = "widthAndAspectRatio", o.HeightAndAspectRatio = "heightAndAspectRatio", o.ShorterDimensionAndAspectRatio = "shorterDimensionAndAspectRatio", o))(pr || {});
var q = class {
  constructor() {
    c(this, "_widthAndHeight");
    c(this, "_widthAndAspectRatio");
    c(this, "_heightAndAspectRatio");
    c(this, "_shorterDimensionAndAspectRatio", null);
  }
  get widthAndHeight() {
    return this._widthAndHeight;
  }
  get widthAndAspectRatio() {
    return this._widthAndAspectRatio;
  }
  get heightAndAspectRatio() {
    return this._heightAndAspectRatio;
  }
  get shorterDimensionAndAspectRatio() {
    return this._shorterDimensionAndAspectRatio;
  }
  get sizingMode() {
    return this.widthAndAspectRatio ? "widthAndAspectRatio" : this.heightAndAspectRatio ? "heightAndAspectRatio" : this.shorterDimensionAndAspectRatio ? "shorterDimensionAndAspectRatio" : "widthAndHeight";
  }
  static sizeWithWidthAndHeight(e) {
    let t = new q();
    return t._widthAndHeight = e, t;
  }
  static sizeWithWidthAndAspectRatio(e, t) {
    let a = new q();
    return a._widthAndAspectRatio = new Ee(e, t), a;
  }
  static sizeWithHeightAndAspectRatio(e, t) {
    let a = new q();
    return a._heightAndAspectRatio = new Ee(e, t), a;
  }
  static sizeWithShorterDimensionAndAspectRatio(e, t) {
    let a = new q();
    return a._shorterDimensionAndAspectRatio = new Ee(e, t), a;
  }
  static fromJSON(e) {
    if (e.width && e.height)
      return this.sizeWithWidthAndHeight(new de(R.fromJSON(e.width), R.fromJSON(e.height)));
    if (e.width && typeof e.aspect == "number")
      return this.sizeWithWidthAndAspectRatio(R.fromJSON(e.width), e.aspect);
    if (e.height && typeof e.aspect == "number")
      return this.sizeWithHeightAndAspectRatio(R.fromJSON(e.height), e.aspect);
    if (e.shorterDimension && typeof e.aspect == "number")
      return this.sizeWithShorterDimensionAndAspectRatio(R.fromJSON(e.shorterDimension), e.aspect);
    throw new Error(`SizeWithUnitAndAspectJSON is malformed: ${JSON.stringify(e)}`);
  }
  toJSONObject() {
    switch (this.sizingMode) {
      case "widthAndAspectRatio":
        return { width: this.widthAndAspectRatio.size.toJSONObject(), aspect: this.widthAndAspectRatio.aspect };
      case "heightAndAspectRatio":
        return { height: this.heightAndAspectRatio.size.toJSONObject(), aspect: this.heightAndAspectRatio.aspect };
      case "shorterDimensionAndAspectRatio":
        return { shorterDimension: this.shorterDimensionAndAspectRatio.size.toJSONObject(), aspect: this.shorterDimensionAndAspectRatio.aspect };
      default:
        return { width: this.widthAndHeight.width.toJSONObject(), height: this.widthAndHeight.height.toJSONObject() };
    }
  }
};
var me = class {
  constructor(e, t, a, o) {
    c(this, "_left");
    c(this, "_right");
    c(this, "_top");
    c(this, "_bottom");
    this._left = e, this._top = t, this._right = a, this._bottom = o;
  }
  get left() {
    return this._left;
  }
  get right() {
    return this._right;
  }
  get top() {
    return this._top;
  }
  get bottom() {
    return this._bottom;
  }
  static fromJSON(e) {
    return new me(R.fromJSON(e.left), R.fromJSON(e.top), R.fromJSON(e.right), R.fromJSON(e.bottom));
  }
  static get zero() {
    return new me(new R(0, "pixel"), new R(0, "pixel"), new R(0, "pixel"), new R(0, "pixel"));
  }
  toJSONObject() {
    return { left: this.left.toJSONObject(), right: this.right.toJSONObject(), top: this.top.toJSONObject(), bottom: this.bottom.toJSONObject() };
  }
};
var W = class {
  constructor(e) {
    c(this, "hexadecimalString");
    this.hexadecimalString = e;
  }
  get redComponent() {
    return this.hexadecimalString.slice(0, 2);
  }
  get greenComponent() {
    return this.hexadecimalString.slice(2, 4);
  }
  get blueComponent() {
    return this.hexadecimalString.slice(4, 6);
  }
  get alphaComponent() {
    return this.hexadecimalString.slice(6, 8);
  }
  get red() {
    return W.hexToNumber(this.redComponent);
  }
  get green() {
    return W.hexToNumber(this.greenComponent);
  }
  get blue() {
    return W.hexToNumber(this.blueComponent);
  }
  get alpha() {
    return W.hexToNumber(this.alphaComponent);
  }
  static fromHex(e) {
    return new W(W.normalizeHex(e));
  }
  static fromRGBA(e, t, a, o = 1) {
    let d = [e, t, a, this.normalizeAlpha(o)].reduce((f2, p) => f2 + this.numberToHex(p), "");
    return new W(d);
  }
  static hexToNumber(e) {
    return Number.parseInt(e, 16);
  }
  static fromJSON(e) {
    return W.fromHex(e);
  }
  static numberToHex(e) {
    e = Math.round(e);
    let t = e.toString(16);
    return t.length === 1 && (t = `0${t}`), t.toUpperCase();
  }
  static normalizeHex(e) {
    return e.startsWith("#") && (e = e.slice(1)), e.length < 6 && (e = e.split("").map((t) => t + t).join("")), e.length === 6 && (e += "FF"), e.toUpperCase();
  }
  static normalizeAlpha(e) {
    return e > 0 && e <= 1 ? 255 * e : e;
  }
  withAlpha(e) {
    let t = this.hexadecimalString.slice(0, 6) + W.numberToHex(W.normalizeAlpha(e));
    return W.fromHex(t);
  }
  toJSON() {
    return this.hexadecimalString;
  }
};
var fi = ((d) => (d.Unknown = "unknown", d.Portrait = "portrait", d.PortraitUpsideDown = "portraitUpsideDown", d.LandscapeRight = "landscapeRight", d.LandscapeLeft = "landscapeLeft", d))(fi || {});
var hr = ((p) => (p.None = "none", p.Horizontal = "horizontal", p.LeftToRight = "leftToRight", p.RightToLeft = "rightToLeft", p.Vertical = "vertical", p.TopToBottom = "topToBottom", p.BottomToTop = "bottomToTop", p))(hr || {});
var gr = ((t) => (t.Minimal = "minimal", t.Extended = "extended", t))(gr || {});
var Qe = class {
  constructor() {
    c(this, "type", "tapToFocus");
  }
  toJSONObject() {
    return { type: this.type };
  }
};
var qe = class {
  constructor() {
    c(this, "type", "swipeToZoom");
  }
  toJSONObject() {
    return { type: this.type };
  }
};
var fr = ((t) => (t.Rounded = "rounded", t.Square = "square", t))(fr || {});
var vr = ((t) => (t.Light = "light", t.Bold = "bold", t))(vr || {});
var Sr = ((e) => (e.Animated = "animated", e))(Sr || {});
var Ae = class {
  constructor(e) {
    c(this, "_isLooping", false);
    this._isLooping = e;
  }
  static fromJSON(e) {
    return e === null ? null : new Ae(e.looping);
  }
  get isLooping() {
    return this._isLooping;
  }
  toJSONObject() {
    return { looping: this.isLooping };
  }
};
var It = class {
  static fromJSON(e) {
    return (e == null ? void 0 : e.type) === "tapToFocus" ? new Qe() : null;
  }
};
var Et = class {
  static fromJSON(e) {
    return (e == null ? void 0 : e.type) === "swipeToZoom" ? new qe() : null;
  }
};
function br(l2) {
  var e;
  return { Camera: { Settings: { preferredResolution: l2.Camera.Settings.preferredResolution, zoomFactor: l2.Camera.Settings.zoomFactor, zoomGestureZoomFactor: l2.Camera.Settings.zoomGestureZoomFactor, focusGestureStrategy: l2.Camera.Settings.focusGestureStrategy }, defaultPosition: (e = l2.Camera.defaultPosition) != null ? e : null, availablePositions: l2.Camera.availablePositions }, SingleImageUploader: { Settings: { iconElement: document.createRange().createContextualFragment(l2.SingleImageUploader.Settings.iconElement).firstElementChild, informationElement: document.createRange().createContextualFragment(l2.SingleImageUploader.Settings.informationElement).firstElementChild, buttonElement: document.createRange().createContextualFragment(l2.SingleImageUploader.Settings.buttonElement).firstElementChild, containerStyle: l2.SingleImageUploader.Settings.containerStyle, iconStyle: l2.SingleImageUploader.Settings.iconStyle, informationStyle: l2.SingleImageUploader.Settings.informationStyle, buttonStyle: l2.SingleImageUploader.Settings.buttonStyle } }, DataCaptureView: { scanAreaMargins: me.fromJSON(JSON.parse(l2.DataCaptureView.scanAreaMargins)), pointOfInterest: se.fromJSON(JSON.parse(l2.DataCaptureView.pointOfInterest)), logoStyle: l2.DataCaptureView.logoStyle, logoAnchor: l2.DataCaptureView.logoAnchor, logoOffset: se.fromJSON(JSON.parse(l2.DataCaptureView.logoOffset)), focusGesture: It.fromJSON(JSON.parse(l2.DataCaptureView.focusGesture)), zoomGesture: Et.fromJSON(JSON.parse(l2.DataCaptureView.zoomGesture)), cameraRecoveryText: l2.DataCaptureView.cameraRecoveryText }, LaserlineViewfinder: Object.keys(l2.LaserlineViewfinder.styles).reduce((t, a) => {
    let o = l2.LaserlineViewfinder.styles[a];
    return t.styles[a] = { width: R.fromJSON(JSON.parse(o.width)), enabledColor: W.fromJSON(o.enabledColor), disabledColor: W.fromJSON(o.disabledColor), style: o.style }, t;
  }, { defaultStyle: l2.LaserlineViewfinder.defaultStyle, styles: {} }), RectangularViewfinder: Object.keys(l2.RectangularViewfinder.styles).reduce((t, a) => {
    let o = l2.RectangularViewfinder.styles[a];
    return t.styles[a] = { size: q.fromJSON(JSON.parse(o.size)), color: W.fromJSON(o.color), style: o.style, lineStyle: o.lineStyle, dimming: Number.parseFloat(o.dimming.toString()), animation: Ae.fromJSON(JSON.parse(o.animation)) }, t;
  }, { defaultStyle: l2.RectangularViewfinder.defaultStyle, styles: {} }), AimerViewfinder: { frameColor: W.fromJSON(l2.AimerViewfinder.frameColor), dotColor: W.fromJSON(l2.AimerViewfinder.dotColor) }, Brush: { fillColor: W.fromJSON(l2.Brush.fillColor), strokeColor: W.fromJSON(l2.Brush.strokeColor), strokeWidth: l2.Brush.strokeWidth } };
}
var x = br({ DataCaptureView: { focusGesture: "null", zoomGesture: "null", logoAnchor: "bottomRight", logoStyle: "extended", logoOffset: JSON.stringify({ x: { value: 0, unit: "fraction" }, y: { value: 0, unit: "fraction" } }), pointOfInterest: JSON.stringify({ x: { value: 0.5, unit: "fraction" }, y: { value: 0.5, unit: "fraction" } }), scanAreaMargins: JSON.stringify({ left: { value: 0, unit: "fraction" }, right: { value: 0, unit: "fraction" }, top: { value: 0, unit: "fraction" }, bottom: { value: 0, unit: "fraction" } }), cameraRecoveryText: "Tap/click to resume scanning" }, Camera: { Settings: { preferredResolution: "auto", zoomFactor: 1, focusGestureStrategy: "manualUntilCapture", zoomGestureZoomFactor: 2 }, defaultPosition: "worldFacing", availablePositions: ["worldFacing", "userFacing"] }, SingleImageUploader: { Settings: { iconElement: atob(mi), informationElement: "<p>Analyze an image from your device.</p>", buttonElement: "<div>Choose an Image</div>", containerStyle: { backgroundColor: "#FFFFFF" }, iconStyle: { fill: "#121619" }, informationStyle: { color: "#121619", marginBottom: "2em" }, buttonStyle: { color: "#FFFFFF", backgroundColor: "#121619", fontWeight: "bold", padding: "1.25em", width: "12em", textAlign: "center", textTransform: "uppercase" } } }, LaserlineViewfinder: { defaultStyle: "animated", styles: { animated: { width: JSON.stringify({ unit: "fraction", value: 0.8 }), enabledColor: "#FFFFFFFF", disabledColor: "#00000000", style: "animated" } } }, AimerViewfinder: { frameColor: "#FFFFFFFF", dotColor: "#FFFFFFCC" }, RectangularViewfinder: { defaultStyle: "rounded", styles: { rounded: { size: JSON.stringify({ aspect: 1, shorterDimension: { unit: "fraction", value: 0.75 } }), color: "#FFFFFFFF", style: "rounded", lineStyle: "light", dimming: 0, animation: JSON.stringify({ looping: true }) }, square: { size: JSON.stringify({ aspect: 1, shorterDimension: { unit: "fraction", value: 0.75 } }), color: "#FFFFFFFF", style: "square", lineStyle: "light", dimming: 0, animation: JSON.stringify({ looping: true }) } } }, Brush: { fillColor: "#00000000", strokeColor: "#00000000", strokeWidth: 0 } });
var ee = { CONTAINER_CLASS_NAME: "scandit-container", PAINTBOARD_CLASS_NAME: "scandit-paintboard", CONTROLS_CLASS_NAME: "scandit-controls", CONTROL_WIDGET_CLASS_NAME: "scandit-control-widget", MIRRORED_CLASS_NAME: "scandit-mirrored", CAMERA_RECOVERY_CLASS_NAME: "scandit-camera-recovery", ERROR_CLASS_NAME: "scandit-error", SINGLE_IMAGE_UPLOADER_CONTAINER_CLASS_NAME: "scandit-single-image-uploader-container" };
var Oe = ((o) => (o.On = "on", o.Off = "off", o.Starting = "starting", o.Stopping = "stopping", o))(Oe || {});
var Ot = ((t) => (t.On = "on", t.Off = "off", t))(Ot || {});
var Nt = ((t) => (t.WorldFacing = "worldFacing", t.UserFacing = "userFacing", t))(Nt || {});
var vi = ((o) => (o.Auto = "auto", o.HD = "hd", o.FullHD = "fullHd", o.UHD4K = "uhd4k", o))(vi || {});
var Cr = ((o) => (o.None = "none", o.Manual = "manual", o.ManualUntilCapture = "manualUntilCapture", o.AutoOnLocation = "autoOnLocation", o))(Cr || {});
var ne = class {
  constructor(e) {
    c(this, "preferredResolution", x.Camera.Settings.preferredResolution);
    c(this, "zoomFactor", x.Camera.Settings.zoomFactor);
    c(this, "zoomGestureZoomFactor", x.Camera.Settings.zoomGestureZoomFactor);
    c(this, "focus", { focusGestureStrategy: x.Camera.Settings.focusGestureStrategy });
    if (e != null)
      for (let t of Object.getOwnPropertyNames(e))
        this[t] = e[t];
  }
  get focusGestureStrategy() {
    return this.focus.focusGestureStrategy;
  }
  set focusGestureStrategy(e) {
    this.focus.focusGestureStrategy = e;
  }
  static fromJSON(e) {
    let t = new ne();
    return t.preferredResolution = e.preferredResolution, t.zoomFactor = e.zoomFactor, t.zoomGestureZoomFactor = e.zoomGestureZoomFactor, t.focusGestureStrategy = e.focusGestureStrategy, t;
  }
  setProperty(e, t) {
    this[e] = t;
  }
  getProperty(e) {
    return this[e];
  }
  toJSONObject() {
    let e = { preferredResolution: this.preferredResolution, zoomFactor: this.zoomFactor, zoomGestureZoomFactor: this.zoomGestureZoomFactor, focus: { focusGestureStrategy: this.focus.focusGestureStrategy } }, t = {};
    for (let a of Object.keys(this))
      [...Object.keys(e), "focusGestureStrategy"].includes(a) || (t[a] = this[a]);
    return Q(Q({}, e), t);
  }
};
var U = class {
  constructor() {
    c(this, "listeners", /* @__PURE__ */ new Map());
    c(this, "selectedCamera");
    c(this, "activeCamera");
    c(this, "activeCameraSettings");
    c(this, "gui");
    c(this, "videoElement");
    c(this, "mirrorImageOverrides", /* @__PURE__ */ new Map());
    c(this, "triggerFatalError");
    c(this, "postStreamInitializationListener", this.postStreamInitialization.bind(this));
    c(this, "videoResizeListener", this.handleVideoResize.bind(this));
    c(this, "videoTrackEndedListener", this.videoTrackEndedRecovery.bind(this));
    c(this, "videoTrackMuteListener", this.videoTrackMuteRecovery.bind(this));
    c(this, "triggerManualFocusListener", this.triggerManualFocus.bind(this));
    c(this, "triggerZoomStartListener", this.triggerZoomStart.bind(this));
    c(this, "triggerZoomMoveListener", this.triggerZoomMove.bind(this));
    c(this, "checkCameraVideoStreamAccessIfVisibleListener", this.checkCameraVideoStreamAccessIfVisible.bind(this));
    c(this, "cameraPosition");
    c(this, "selectedCameraSettings");
    c(this, "mediaTrackCapabilities");
    c(this, "mediaTrackCapabilitiesPromise");
    c(this, "mediaTrackCapabilitiesPromiseResolver");
    c(this, "cameraAccessTimeout");
    c(this, "cameraAccessRejectCallback");
    c(this, "videoMetadataCheckInterval");
    c(this, "getCapabilitiesTimeout");
    c(this, "autofocusInterval");
    c(this, "manualToAutofocusResumeTimeout");
    c(this, "manualFocusWaitTimeout");
    c(this, "torchToggleEnabled");
    c(this, "tapToFocusEnabled");
    c(this, "pinchToZoomEnabled");
    c(this, "pinchToZoomDistance");
    c(this, "pinchToZoomInitialZoom");
    c(this, "torchEnabled");
    c(this, "cameraInitializationPromise");
    c(this, "abortedCameraInitializationResolveCallback");
    c(this, "cameraSetupPromise");
    c(this, "_mediaStream");
    c(this, "canvas");
    c(this, "_canvasWebGLContext");
    c(this, "_canvas2dContext");
    c(this, "_imageData");
    this.cameraPosition = "worldFacing", this.gui = { isCameraRecoveryVisible: () => false, setCameraRecoveryVisible: () => {
    } }, this.videoElement = document.createElement("video"), this.canvas = document.createElement("canvas"), this.canvas.addEventListener("webglcontextlost", this.handleWebGLContextLost.bind(this));
  }
  get mediaStream() {
    return this._mediaStream;
  }
  set mediaStream(e) {
    this._mediaStream = e, e && (this.mediaTrackCapabilitiesPromise = new Promise((t) => {
      this.mediaTrackCapabilitiesPromiseResolver = t;
    }));
  }
  set imageData(e) {
    this._imageData = e;
  }
  async waitForCapabilities() {
    var e;
    return (e = this.mediaTrackCapabilitiesPromise) != null ? e : Promise.resolve();
  }
  static instance() {
    return U._instance == null && (U._instance = new U()), U._instance;
  }
  setInteractionOptions(e, t, a) {
    this.torchToggleEnabled = e, this.tapToFocusEnabled = t, this.pinchToZoomEnabled = a;
  }
  isTapToFocusEnabled() {
    return this.tapToFocusEnabled;
  }
  setTapToFocusEnabled(e) {
    this.tapToFocusEnabled = e, this.mediaStream && (this.tapToFocusEnabled ? this.enableTapToFocusListeners() : this.disableTapToFocusListeners());
  }
  isPinchToZoomEnabled() {
    return this.pinchToZoomEnabled;
  }
  setPinchToZoomEnabled(e) {
    this.pinchToZoomEnabled = e, this.mediaStream && (this.pinchToZoomEnabled ? this.enablePinchToZoomListeners() : this.disablePinchToZoomListeners());
  }
  setInitialCameraPosition(e) {
    this.cameraPosition = e;
  }
  async setCameraPosition(e) {
    var a;
    this.setInitialCameraPosition(e);
    let t = Y.getMainCameraForPosition(await Y.getCameras(), e);
    if (t && t.deviceId !== ((a = this.selectedCamera) == null ? void 0 : a.deviceId))
      return this.initializeCameraWithSettings(t, this.selectedCameraSettings);
  }
  setSelectedCamera(e) {
    this.selectedCamera = e;
  }
  setSelectedCameraSettings(e) {
    this.selectedCameraSettings = e;
  }
  async setupCameras() {
    return this.cameraSetupPromise ? this.cameraSetupPromise : (this.cameraSetupPromise = this.setupCamerasAndStream(), this.cameraSetupPromise);
  }
  async stopStream(e = false) {
    if (this.activeCamera && (this.activeCamera.currentResolution = void 0), this.activeCamera = void 0, this.mediaStream)
      return g.log(g.Level.Debug, `Stop camera video stream access${e ? " (abort access detection)" : ""}:`, this.mediaStream), document.removeEventListener("visibilitychange", this.checkCameraVideoStreamAccessIfVisibleListener), window.clearTimeout(this.cameraAccessTimeout), window.clearInterval(this.videoMetadataCheckInterval), window.clearTimeout(this.getCapabilitiesTimeout), window.clearTimeout(this.manualFocusWaitTimeout), window.clearTimeout(this.manualToAutofocusResumeTimeout), window.clearInterval(this.autofocusInterval), this.videoElement.pause(), new Promise((t) => {
        setTimeout(() => {
          var a, o;
          (a = this.mediaStream) == null || a.getVideoTracks().forEach((d) => {
            d.removeEventListener("ended", this.videoTrackEndedListener), d.stop();
          }), this.videoElement.srcObject = null, this.mediaStream = void 0, this.mediaTrackCapabilities = void 0, this.mediaTrackCapabilitiesPromise = void 0, this.mediaTrackCapabilitiesPromiseResolver = void 0, e || (o = this.abortedCameraInitializationResolveCallback) == null || o.call(this), t();
        }, 0);
      });
  }
  async applyCameraSettings(e) {
    if (this.selectedCameraSettings = e, this.activeCamera == null)
      throw new J(U.noCameraErrorParameters);
    return this.initializeCameraWithSettings(this.activeCamera, e);
  }
  async reinitializeCamera() {
    if (this.activeCamera == null)
      g.log(g.Level.Debug, "Camera reinitialization delayed");
    else {
      g.log(g.Level.Debug, "Reinitialize camera:", this.activeCamera);
      try {
        await this.initializeCameraWithSettings(this.activeCamera, this.activeCameraSettings);
      } catch (e) {
        throw g.log(g.Level.Warn, "Couldn't access camera:", this.activeCamera, e), this.emit("cameraAccessError", e), e;
      }
    }
  }
  async initializeCameraWithSettings(e, t) {
    return this.cameraInitializationPromise && await this.cameraInitializationPromise, this.setSelectedCamera(e), this.selectedCameraSettings = this.activeCameraSettings = t, this.cameraInitializationPromise = this.initializeCameraAndCheckUpdatedSettings(e), this.cameraInitializationPromise;
  }
  async setTorchEnabled(e) {
    var t;
    if (this.mediaStream && ((t = this.mediaTrackCapabilities) == null ? void 0 : t.torch) === true) {
      this.torchEnabled = e;
      let a = this.mediaStream.getVideoTracks();
      a.length > 0 && typeof a[0].applyConstraints == "function" && await a[0].applyConstraints({ advanced: [{ torch: e }] });
    }
  }
  async toggleTorch() {
    this.torchEnabled = !this.torchEnabled, await this.setTorchEnabled(this.torchEnabled);
  }
  async setZoom(e) {
    var t;
    if (!!this.mediaStream && (await this.waitForCapabilities(), (t = this.mediaTrackCapabilities) != null && t.zoom)) {
      let a = this.mediaStream.getVideoTracks();
      if (a.length > 0 && typeof a[0].applyConstraints == "function") {
        let o = Math.max(this.mediaTrackCapabilities.zoom.min, Math.min(e, this.mediaTrackCapabilities.zoom.max));
        await a[0].applyConstraints({ advanced: [{ zoom: o }] });
      }
    }
  }
  async isTorchAvailable() {
    var e;
    return this.mediaStream ? (await this.waitForCapabilities(), ((e = this.mediaTrackCapabilities) == null ? void 0 : e.torch) === true) : false;
  }
  isMirrorImageEnabled() {
    if (this.selectedCamera && this.activeCamera) {
      let e = this.mirrorImageOverrides.get(this.activeCamera);
      return e != null ? e : this.activeCamera.position === "userFacing";
    }
    return false;
  }
  setMirrorImageEnabled(e, t) {
    this.selectedCamera && (e ? this.videoElement.classList.add(U.MIRRORED_CLASS_NAME) : this.videoElement.classList.remove(U.MIRRORED_CLASS_NAME), t && this.mirrorImageOverrides.set(this.selectedCamera, e));
  }
  addListener(e, t) {
    var o;
    let a = (o = this.listeners.get(e)) != null ? o : [];
    a.includes(t) || this.listeners.set(e, [...a, t]);
  }
  removeListener(e, t) {
    var d;
    let o = ((d = this.listeners.get(e)) != null ? d : []).filter((f2) => f2 !== t);
    this.listeners.set(e, o);
  }
  async playVideo() {
    return new Promise((e) => {
      let t = this.videoElement.play();
      t ? t.then(e).catch(() => {
        e();
      }) : e();
    });
  }
  isVideoAndContextStateValid() {
    return this.videoElement.readyState === 4 && this.videoElement.videoWidth > 2 && this.videoElement.videoHeight > 2 && this.canvas.width > 2 && this.canvas.height > 2;
  }
  captureImage() {
    var e;
    if (((e = this.mediaStream) == null ? void 0 : e.active) != null) {
      if (this.canvasWebGLContext != null) {
        if (!this.isVideoAndContextStateValid() || this.canvasWebGLContext.drawingBufferWidth <= 2 || this.canvasWebGLContext.drawingBufferHeight <= 2)
          return null;
        let t = this.canvasWebGLContext.drawingBufferWidth * this.canvasWebGLContext.drawingBufferHeight * 4;
        if ((this._imageData == null || this._imageData.byteLength !== t) && (this._imageData = new Uint8ClampedArray(t)), this.canvasWebGLContext.texImage2D(this.canvasWebGLContext.TEXTURE_2D, 0, this.canvasWebGLContext.RGBA, this.canvasWebGLContext.RGBA, this.canvasWebGLContext.UNSIGNED_BYTE, this.videoElement), this.canvasWebGLContext.readPixels(0, 0, this.canvasWebGLContext.drawingBufferWidth, this.canvasWebGLContext.drawingBufferHeight, this.canvasWebGLContext.RGBA, this.canvasWebGLContext.UNSIGNED_BYTE, this._imageData), this._imageData[3] !== 255) {
          if (g.log(g.Level.Warn, "Detected incorrect GPU accelerated WebGL image processing, switching to canvas mode"), this._canvasWebGLContext = void 0, this.canvas2dContext != null)
            return this.captureImage();
        } else {
          let a = this._imageData;
          return this._imageData = void 0, { data: a, width: this.canvasWebGLContext.drawingBufferWidth, height: this.canvasWebGLContext.drawingBufferHeight };
        }
      } else if (this.canvas2dContext != null) {
        if (!this.isVideoAndContextStateValid())
          return null;
        this.canvas2dContext.drawImage(this.videoElement, 0, 0);
        let { width: t } = this.canvas, { height: a } = this.canvas;
        return { data: this.canvas2dContext.getImageData(0, 0, t, a).data, width: t, height: a };
      }
    }
    return null;
  }
  async recoverStreamIfNeeded() {
    var t, a;
    let e = (t = this.mediaStream) == null ? void 0 : t.getVideoTracks();
    ((a = e == null ? void 0 : e[0]) == null ? void 0 : a.readyState) === "ended" && await this.reinitializeCamera();
  }
  async setupCamerasAndStream() {
    var e, t;
    try {
      let a;
      this.selectedCamera == null && (a = await this.accessInitialCamera());
      let o = await Y.getCameras(false, true), d = (t = (e = this.mediaStream) == null ? void 0 : e.getVideoTracks()[0]) == null ? void 0 : t.getSettings().deviceId;
      if (this.mediaStream && a) {
        let f2 = o.length === 1 ? o[0] : o.find((p) => p.deviceId === d || p.label !== "" && p.label === (a == null ? void 0 : a.label));
        if (f2) {
          if (Y.adjustCameraFromMediaStream(this.mediaStream, f2), G.isDesktopDevice() && (Y.mainCameraForPositionOverridesOnDesktop.set(this.cameraPosition, f2), Y.mainCameraForPositionOverridesOnDesktop.set(f2.position, f2)), o.length === 1 || Y.getMainCameraForPosition(o, this.cameraPosition) === f2) {
            g.log(g.Level.Debug, "Initial camera access was correct (main camera), keep camera:", f2), this.setSelectedCamera(f2), this.updateActiveCameraCurrentResolution(f2), await this.recoverStreamIfNeeded();
            return;
          }
          g.log(g.Level.Debug, "Initial camera access was incorrect (not main camera), change camera", Z(Q({}, a), { deviceId: d }));
        } else
          g.log(g.Level.Debug, "Initial camera access was incorrect (unknown camera), change camera", Z(Q({}, a), { deviceId: d }));
      }
      if (this.selectedCamera == null) {
        await this.accessAutoselectedCamera(o);
        return;
      }
      await this.initializeCameraWithSettings(this.selectedCamera, this.selectedCameraSettings);
      return;
    } finally {
      this.cameraSetupPromise = void 0;
    }
  }
  getInitialCameraResolutionConstraint() {
    var t;
    let e;
    switch ((t = this.activeCameraSettings) == null ? void 0 : t.preferredResolution) {
      case "uhd4k":
        e = 0;
        break;
      case "fullHd":
        e = 1;
        break;
      case "hd":
      default:
        e = 2;
        break;
    }
    return e;
  }
  async accessAutoselectedCamera(e) {
    e = Y.sortCamerasForCameraPosition(e, this.cameraPosition);
    let t = e.shift();
    for (; t; )
      try {
        await this.initializeCameraWithSettings(t, this.selectedCameraSettings);
        return;
      } catch (a) {
        if (this.setSelectedCamera(), e.length > 0) {
          g.log(g.Level.Warn, "Couldn't access camera:", t, a), t = e.shift();
          continue;
        }
        throw a;
      }
    throw new J(U.noCameraErrorParameters);
  }
  async accessInitialCamera() {
    let e = { position: this.cameraPosition, deviceId: "", label: "" };
    try {
      await this.initializeCameraWithSettings(e, this.selectedCameraSettings);
    } catch (t) {
    } finally {
      this.setSelectedCamera();
    }
    return e;
  }
  updateActiveCameraCurrentResolution(e) {
    this.videoElement.videoWidth > 2 && this.videoElement.videoHeight > 2 && (e.currentResolution = { width: this.videoElement.videoWidth, height: this.videoElement.videoHeight }), e.deviceId !== "" && (this.activeCamera = e, this.setMirrorImageEnabled(this.isMirrorImageEnabled(), false));
  }
  postStreamInitialization() {
    window.clearTimeout(this.getCapabilitiesTimeout), this.getCapabilitiesTimeout = window.setTimeout(() => {
      this.storeStreamCapabilities(), this.setupAutofocus();
    }, U.getCapabilitiesTimeoutMs);
  }
  handleVideoResize() {
    if (!(this.videoElement.videoWidth <= 2 || this.videoElement.videoHeight <= 2)) {
      if (this.activeCamera && this.updateActiveCameraCurrentResolution(this.activeCamera), this.canvasWebGLContext != null) {
        if (this.canvas.width === this.videoElement.videoWidth && this.canvas.height === this.videoElement.videoHeight)
          return;
        this.canvas.width = this.videoElement.videoWidth, this.canvas.height = this.videoElement.videoHeight, this.canvasWebGLContext.viewport(0, 0, this.canvasWebGLContext.drawingBufferWidth, this.canvasWebGLContext.drawingBufferHeight);
      } else if (this.canvas2dContext != null) {
        if (this.canvas.width === this.videoElement.videoWidth && this.canvas.height === this.videoElement.videoHeight)
          return;
        this.canvas.width = this.videoElement.videoWidth, this.canvas.height = this.videoElement.videoHeight;
      }
    }
  }
  checkCameraVideoStreamAccessIfVisible() {
    document.visibilityState === "visible" && (g.log(g.Level.Debug, "Page is visible again, waiting for camera video stream start..."), document.removeEventListener("visibilitychange", this.checkCameraVideoStreamAccessIfVisibleListener), this.setCameraAccessTimeout());
  }
  async videoTrackEndedRecovery() {
    if (document.visibilityState !== "visible")
      g.log(g.Level.Debug, "Page is currently not visible, delay camera reinitialization until visible"), document.addEventListener("visibilitychange", this.checkCameraVideoStreamAccessIfVisibleListener);
    else
      try {
        g.log(g.Level.Debug, 'Detected video track "ended" event, try to reinitialize camera'), await this.reinitializeCamera();
      } catch (e) {
      }
  }
  videoTrackMuteRecovery(e) {
    if (this.videoElement.onloadeddata != null) {
      g.log(g.Level.Debug, `Detected video track "${e.type}" event, delay camera video stream access detection`), this.setCameraAccessTimeout();
      return;
    }
    let t = e.type === "mute";
    t !== this.gui.isCameraRecoveryVisible() && (g.log(g.Level.Debug, `Detected video track "${e.type}" event, ${t ? "enable" : "disable"} camera recovery`), this.gui.setCameraRecoveryVisible(t));
  }
  handleWebGLContextLost() {
    g.log(g.Level.Warn, "WebGL context has been lost, restoring..."), this._canvasWebGLContext = void 0, this.canvasWebGLContext ? (this.handleVideoResize(), g.log(g.Level.Warn, "WebGL context restored")) : g.log(g.Level.Error, "WebGL context restore failed");
  }
  async triggerManualFocusForContinuous() {
    var a;
    if (!this.mediaStream)
      return;
    this.manualToAutofocusResumeTimeout = window.setTimeout(async () => {
      await this.triggerFocusMode("continuous");
    }, U.manualToAutofocusResumeTimeoutMs);
    let e = true, t = this.mediaStream.getVideoTracks();
    t.length > 0 && typeof t[0].getConstraints == "function" && (e = ((a = t[0].getConstraints().advanced) == null ? void 0 : a.some((o) => o.focusMode === "manual")) === true), e ? (await this.triggerFocusMode("continuous"), this.manualFocusWaitTimeout = window.setTimeout(async () => {
      await this.triggerFocusMode("manual");
    }, U.manualFocusWaitTimeoutMs)) : await this.triggerFocusMode("manual");
  }
  async triggerManualFocusForSingleShot() {
    window.clearInterval(this.autofocusInterval), this.manualToAutofocusResumeTimeout = window.setTimeout(() => {
      this.autofocusInterval = window.setInterval(this.triggerAutoFocus.bind(this), U.autofocusIntervalMs);
    }, U.manualToAutofocusResumeTimeoutMs);
    try {
      await this.triggerFocusMode("single-shot");
    } catch (e) {
    }
  }
  async triggerManualFocus(e) {
    if (e) {
      if (e.preventDefault(), e.type === "touchend" && e.touches.length > 0)
        return;
      if (this.pinchToZoomDistance != null) {
        this.pinchToZoomDistance = void 0;
        return;
      }
    }
    if (window.clearTimeout(this.manualFocusWaitTimeout), window.clearTimeout(this.manualToAutofocusResumeTimeout), this.mediaStream && this.mediaTrackCapabilities) {
      let t = this.mediaTrackCapabilities.focusMode;
      Array.isArray(t) && t.includes("single-shot") && (t.includes("continuous") && t.includes("manual") ? await this.triggerManualFocusForContinuous() : t.includes("continuous") || await this.triggerManualFocusForSingleShot());
    }
  }
  triggerZoomStart(e) {
    var t;
    if ((e == null ? void 0 : e.touches.length) === 2 && (e.preventDefault(), this.pinchToZoomDistance = Math.hypot((e.touches[1].screenX - e.touches[0].screenX) / screen.width, (e.touches[1].screenY - e.touches[0].screenY) / screen.height), this.mediaStream && ((t = this.mediaTrackCapabilities) == null ? void 0 : t.zoom))) {
      let a = this.mediaStream.getVideoTracks();
      if (a.length > 0 && typeof a[0].getConstraints == "function") {
        this.pinchToZoomInitialZoom = this.mediaTrackCapabilities.zoom.min;
        let o = a[0].getConstraints();
        if (o.advanced) {
          let d = o.advanced.find((f2) => "zoom" in f2);
          (d == null ? void 0 : d.zoom) != null && (this.pinchToZoomInitialZoom = d.zoom);
        }
      }
    }
  }
  async triggerZoomMove(e) {
    this.pinchToZoomDistance == null || (e == null ? void 0 : e.touches.length) !== 2 || e.preventDefault();
  }
  storeStreamCapabilities() {
    var e;
    if (this.mediaStream) {
      let t = this.mediaStream.getVideoTracks();
      t.length > 0 && typeof t[0].getCapabilities == "function" && (this.mediaTrackCapabilities = t[0].getCapabilities()), this.mediaTrackCapabilitiesPromiseResolver && this.mediaTrackCapabilitiesPromiseResolver();
    }
    this.activeCamera && this.reportCameraProperties(this.activeCamera.deviceId, this.activeCamera.position, ((e = this.mediaTrackCapabilities) == null ? void 0 : e.focusMode) == null || this.mediaTrackCapabilities.focusMode.includes("continuous"));
  }
  reportCameraProperties(e, t, a = true) {
    this.emit("cameraProperties", { deviceId: e, isFrontFacing: t === "userFacing", hasAutofocus: a });
  }
  setupAutofocus() {
    if (window.clearTimeout(this.manualFocusWaitTimeout), window.clearTimeout(this.manualToAutofocusResumeTimeout), this.mediaStream && this.mediaTrackCapabilities) {
      let e = this.mediaTrackCapabilities.focusMode;
      Array.isArray(e) && !e.includes("continuous") && e.includes("single-shot") && (window.clearInterval(this.autofocusInterval), this.autofocusInterval = window.setInterval(this.triggerAutoFocus.bind(this), U.autofocusIntervalMs));
    }
  }
  async triggerAutoFocus() {
    await this.triggerFocusMode("single-shot");
  }
  async triggerFocusMode(e) {
    if (this.mediaStream) {
      let t = this.mediaStream.getVideoTracks();
      if (t.length > 0 && typeof t[0].applyConstraints == "function")
        try {
          await t[0].applyConstraints({ advanced: [{ focusMode: e }] });
        } catch (a) {
        }
    }
  }
  enableTapToFocusListeners() {
    for (let e of ["touchend", "mousedown"])
      this.videoElement.addEventListener(e, this.triggerManualFocusListener);
  }
  enablePinchToZoomListeners() {
    this.videoElement.addEventListener("touchstart", this.triggerZoomStartListener), this.videoElement.addEventListener("touchmove", this.triggerZoomMoveListener);
  }
  disableTapToFocusListeners() {
    for (let e of ["touchend", "mousedown"])
      this.videoElement.removeEventListener(e, this.triggerManualFocusListener);
  }
  disablePinchToZoomListeners() {
    this.videoElement.removeEventListener("touchstart", this.triggerZoomStartListener), this.videoElement.removeEventListener("touchmove", this.triggerZoomMoveListener);
  }
  async initializeCameraAndCheckUpdatedSettings(e) {
    try {
      if (await this.initializeCamera(e), this.selectedCameraSettings !== this.activeCameraSettings && (this.selectedCameraSettings == null || this.activeCameraSettings == null || Object.keys(this.selectedCameraSettings).some((t) => this.selectedCameraSettings[t] !== this.activeCameraSettings[t]))) {
        this.activeCameraSettings = this.selectedCameraSettings, await this.initializeCameraAndCheckUpdatedSettings(e);
        return;
      }
      this.activeCameraSettings && this.activeCameraSettings.zoomFactor > 1 && await this.setZoom(this.activeCameraSettings.zoomFactor);
    } finally {
      this.cameraInitializationPromise = void 0;
    }
  }
  async handleCameraInitializationError(e, t, a) {
    if (!["OverconstrainedError", "NotReadableError"].includes(a.name) || a.name === "NotReadableError" && t === 4)
      throw g.log(g.Level.Debug, "Camera video stream access failure (unrecoverable error)", e, a), a.name !== "NotAllowedError" && Y.markCameraAsInaccessible(e), a;
    if (a.name === "OverconstrainedError" && t === 4) {
      if (e.deviceId === "")
        throw g.log(g.Level.Warn, "Camera video stream access failure (no camera with such type error)", e, a), a;
      g.log(g.Level.Warn, "Detected non-existent deviceId error, attempt to find and reaccess updated camera", e, a);
      let o = e.deviceId;
      if (await Y.getCameras(true), o === e.deviceId)
        throw g.log(g.Level.Warn, "Camera video stream access failure (updated camera not found after non-existent deviceId error)", e, a), Y.markCameraAsInaccessible(e), a;
      return g.log(g.Level.Warn, "Updated camera found (recovered from non-existent deviceId error), attempt to access it", e), this.initializeCamera(e);
    }
    return this.initializeCamera(e, t + 1);
  }
  async initializeCamera(e, t) {
    if (this.gui.setCameraRecoveryVisible(false), e == null)
      throw new J(U.noCameraErrorParameters);
    await this.stopStream(), this.torchEnabled = false, t = t != null ? t : this.getInitialCameraResolutionConstraint();
    try {
      let a = await Y.accessCameraStream(t, e);
      if (g.log(g.Level.Debug, "Camera accessed, waiting for camera video stream start..."), typeof a.getTracks()[0].getSettings == "function") {
        let o = a.getTracks()[0].getSettings();
        if (o.width != null && o.height != null && (o.width === 2 || o.height === 2)) {
          if (g.log(g.Level.Debug, "Camera video stream access failure (invalid video metadata):", e), t === 4)
            throw new J(U.notReadableErrorParameters);
          return this.initializeCamera(e, t + 1);
        }
      }
      this.mediaStream = a;
      for (let o of this.mediaStream.getVideoTracks())
        o.addEventListener("ended", this.videoTrackEndedListener), o.addEventListener("mute", this.videoTrackMuteListener), o.addEventListener("unmute", this.videoTrackMuteListener);
      try {
        await this.setupCameraStreamVideo(e, a);
      } catch (o) {
        if (t === 4)
          throw o;
        return this.initializeCamera(e, t + 1);
      }
    } catch (a) {
      return this.handleCameraInitializationError(e, t, a);
    }
  }
  setCameraAccessTimeout() {
    window.clearTimeout(this.cameraAccessTimeout), this.cameraAccessTimeout = window.setTimeout(async () => {
      var e;
      document.visibilityState !== "visible" ? (g.log(g.Level.Debug, "Page is currently not visible, delay camera video stream access detection"), document.addEventListener("visibilitychange", this.checkCameraVideoStreamAccessIfVisibleListener)) : (await this.stopStream(true), (e = this.cameraAccessRejectCallback) == null || e.call(this, new J(U.notReadableErrorParameters)));
    }, U.cameraAccessTimeoutMs);
  }
  async checkCameraAccess(e) {
    return new Promise((t, a) => {
      this.cameraAccessRejectCallback = (o) => {
        g.log(g.Level.Debug, "Camera video stream access failure (video data load timeout):", e), this.gui.setCameraRecoveryVisible(true), a(o);
      }, this.setCameraAccessTimeout();
    });
  }
  async checkVideoMetadata(e) {
    return new Promise((t, a) => {
      this.videoElement.onloadeddata = () => {
        if (this.videoElement.onloadeddata = null, window.clearTimeout(this.cameraAccessTimeout), this.videoElement.videoWidth > 2 && this.videoElement.videoHeight > 2 && this.videoElement.currentTime > 0) {
          this.updateActiveCameraCurrentResolution(e), g.log(g.Level.Debug, "Camera video stream access success:", e), t();
          return;
        }
        let o = performance.now();
        window.clearInterval(this.videoMetadataCheckInterval), this.videoMetadataCheckInterval = window.setInterval(async () => {
          if (this.videoElement.videoWidth <= 2 || this.videoElement.videoHeight <= 2 || this.videoElement.currentTime === 0) {
            if (performance.now() - o > U.videoMetadataCheckTimeoutMs) {
              g.log(g.Level.Warn, "Camera video stream access failure (valid video metadata timeout):", e), window.clearInterval(this.videoMetadataCheckInterval), await this.stopStream(true), a(new J(U.notReadableErrorParameters));
              return;
            }
            return;
          }
          window.clearInterval(this.videoMetadataCheckInterval), this.updateActiveCameraCurrentResolution(e), g.log(g.Level.Debug, "Camera video stream access success:", e), t();
        }, U.videoMetadataCheckIntervalMs);
      };
    });
  }
  async setupCameraStreamVideo(e, t) {
    this.videoElement.addEventListener("loadedmetadata", this.postStreamInitializationListener), this.videoElement.addEventListener("resize", this.videoResizeListener), this.tapToFocusEnabled && this.enableTapToFocusListeners(), this.pinchToZoomEnabled && this.enablePinchToZoomListeners();
    let a = Promise.race([this.checkCameraAccess(e), this.checkVideoMetadata(e), new Promise((o) => {
      this.abortedCameraInitializationResolveCallback = o;
    })]);
    return this.videoElement.srcObject = t, this.videoElement.load(), await this.playVideo(), this.handleVideoResize(), this.reportCameraProperties(e.deviceId, e.position), a;
  }
  get canvas2dContext() {
    return this._canvas2dContext || (this._canvas2dContext = this.canvas.getContext("2d"), this.handleVideoResize()), this._canvas2dContext;
  }
  get canvasWebGLContext() {
    var e;
    if (!this._canvas2dContext && !this._canvasWebGLContext) {
      let t = (e = this.canvas.getContext("webgl", { alpha: false, antialias: false })) != null ? e : this.canvas.getContext("experimental-webgl", { alpha: false, antialias: false });
      if (t != null) {
        let a = t.createTexture();
        t.bindTexture(t.TEXTURE_2D, a);
        let o = t.createFramebuffer();
        t.bindFramebuffer(t.FRAMEBUFFER, o), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, a, 0), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), this._canvasWebGLContext = t, this.handleVideoResize();
      }
    }
    return this._canvasWebGLContext;
  }
  emit(e, t) {
    if (this.listeners.has(e))
      for (let a of this.listeners.get(e))
        a(t);
  }
};
var k = U;
c(k, "cameraAccessTimeoutMs", 4e3), c(k, "videoMetadataCheckTimeoutMs", 4e3), c(k, "videoMetadataCheckIntervalMs", 50), c(k, "getCapabilitiesTimeoutMs", 500), c(k, "autofocusIntervalMs", 1500), c(k, "manualToAutofocusResumeTimeoutMs", 5e3), c(k, "manualFocusWaitTimeoutMs", 400), c(k, "noCameraErrorParameters", { name: "NoCameraAvailableError", message: "No camera available" }), c(k, "notReadableErrorParameters", { name: "NotReadableError", message: "Could not initialize camera correctly" }), c(k, "MIRRORED_CLASS_NAME", ee.MIRRORED_CLASS_NAME), c(k, "_instance");
var pe = class {
  constructor(e) {
    c(this, "label");
    c(this, "deviceId");
    c(this, "position");
    c(this, "currentResolution");
    c(this, "cameraManager");
    c(this, "type", "camera");
    c(this, "webGLContextLostListener");
    c(this, "_currentState", "off");
    c(this, "settings", new ne());
    c(this, "_desiredTorchState", "off");
    c(this, "_desiredState", "off");
    c(this, "listeners", []);
    c(this, "_context", null);
    c(this, "_desiredMirrorImageEnabled");
    c(this, "_lastCaptureRequestAnimationFrame", 0);
    this.cameraManager = e != null ? e : k.instance();
  }
  static get default() {
    let e = new pe();
    return e.position = "worldFacing", e;
  }
  static atPosition(e) {
    if (x.Camera.availablePositions.includes(e)) {
      let t = new pe();
      return t.position = e, t;
    }
    return g.log(g.Level.Warn, `invalid CameraPosition: "${e}"`), null;
  }
  get desiredState() {
    return this._desiredState;
  }
  async switchToDesiredState(e) {
    if (e === "on") {
      if (this.currentState === "on" || this.currentState === "starting")
        return;
    } else if (this.currentState === "off" || this.currentState === "stopping")
      return;
    if (this._desiredState = e, e === "on") {
      this.currentState = "starting";
      try {
        await this.setupCamera(), this.currentState = "on";
      } catch (t) {
        throw g.log(g.Level.Error, t), this.currentState = "off", t;
      }
    } else
      this.currentState = "stopping", await this.cameraManager.stopStream(), this.currentState = "off", await this.setDesiredTorchState("off");
  }
  getDesiredTorchState() {
    return this._desiredTorchState;
  }
  async setDesiredTorchState(e) {
    this._desiredTorchState = e, await this.cameraManager.setTorchEnabled(this._desiredTorchState === "on"), await this.notifyContext({ type: "torchState", newValue: this._desiredTorchState });
  }
  async isTorchAvailable() {
    return this.cameraManager.isTorchAvailable();
  }
  addListener(e) {
    e != null && (this.listeners.includes(e) || this.listeners.push(e));
  }
  removeListener(e) {
    e != null && (!this.listeners.includes(e) || this.listeners.splice(this.listeners.indexOf(e), 1));
  }
  async applySettings(e) {
    if (this.settings = new ne(e), this.currentState === "on") {
      let t = this.cameraManager.activeCameraSettings;
      (t == null ? void 0 : t.preferredResolution) !== this.settings.preferredResolution && await this.cameraManager.applyCameraSettings(this.settings), await this.cameraManager.setZoom(this.settings.zoomFactor);
    }
    return this.notifyContext({ type: "cameraSettings", newValue: this.settings });
  }
  toJSONObject() {
    return { type: this.type, position: this.position, settings: this.settings.toJSONObject(), desiredState: this.desiredState, desiredTorchState: this._desiredTorchState };
  }
  getMirrorImageEnabled() {
    var e;
    return (e = this._desiredMirrorImageEnabled) != null ? e : this.cameraManager.isMirrorImageEnabled();
  }
  async setMirrorImageEnabled(e) {
    this._desiredMirrorImageEnabled = e, this.cameraManager.setMirrorImageEnabled(e, true), this.context && await this.context.setFrameSource(this);
  }
  get context() {
    return this._context;
  }
  set context(e) {
    this._context = e, this._context && this.currentState === "on" && this.startSendingCapturesToWorker();
  }
  async setupCamera() {
    if (this.deviceId) {
      let t = (await Ye.getCameras()).find((a) => a.deviceId === this.deviceId);
      t && (this.cameraManager.selectedCamera = t);
    } else
      this.cameraManager.setInitialCameraPosition(this.position);
    this.cameraManager.setSelectedCameraSettings(this.settings), await this.cameraManager.setupCameras(), typeof this._desiredMirrorImageEnabled == "boolean" ? this.cameraManager.setMirrorImageEnabled(this._desiredMirrorImageEnabled, true) : this.cameraManager.setMirrorImageEnabled(this.cameraManager.isMirrorImageEnabled(), false), this.context && await this.context.setFrameSource(this), this.cameraManager.activeCamera && (this.label = this.cameraManager.activeCamera.label, this.position = this.cameraManager.activeCamera.position, this.deviceId = this.cameraManager.activeCamera.deviceId, this.currentResolution = this.cameraManager.activeCamera.currentResolution);
  }
  set currentState(e) {
    e !== this._currentState && (this._currentState = e, this.notifyListeners(), this.notifyContext({ type: "frameSourceState", newValue: e }).then(() => {
      e === "on" && this.startSendingCapturesToWorker();
    }).catch(() => {
      g.log(g.Level.Warn, "Error while notifying context about new state of Camera");
    }));
  }
  get currentState() {
    return this._currentState;
  }
  getCurrentState() {
    return this._currentState;
  }
  async notifyContext(e) {
    if (this.context)
      return this.context.update([e]);
  }
  notifyListeners() {
    for (let e of this.listeners)
      e.didChangeState && e.didChangeState(this, this.currentState);
  }
  startSendingCapturesToWorker() {
    this._lastCaptureRequestAnimationFrame && cancelAnimationFrame(this._lastCaptureRequestAnimationFrame);
    let e = t.bind(this);
    function t() {
      if (this.currentState === "on") {
        let a;
        try {
          a = this.cameraManager.captureImage();
        } catch (o) {
          g.log(g.Level.Warn, o == null ? void 0 : o.message);
        }
        this.context && (a ? this.context.sendFrameToProcessor(a).then((o) => {
          o && (this.cameraManager.imageData = o.data), this._lastCaptureRequestAnimationFrame = requestAnimationFrame(e);
        }) : this._lastCaptureRequestAnimationFrame = requestAnimationFrame(e));
      }
    }
    e();
  }
};
var oe = class {
  constructor() {
    c(this, "_message");
    c(this, "_code");
    c(this, "_isValid");
  }
  static fromJSON(e) {
    let t = new oe();
    return t._code = e.code, t._message = e.message, t._isValid = e.isValid, t;
  }
  get message() {
    return this._message;
  }
  get code() {
    return this._code;
  }
  get isValid() {
    return this._isValid;
  }
};
var Vt = ((a) => (a.None = "None", a.X = "X", a.Y = "Y", a))(Vt || {});
var Ze = class {
  constructor() {
  }
  setProperty(e, t) {
    this[e] = t;
  }
  getProperty(e) {
    return this[e];
  }
  toJSONObject() {
    return Object.keys(this).reduce((e, t) => (e[t] = this.getProperty(t), e), {});
  }
};
var Si;
var bi;
var Ci;
var Ne = class {
  constructor(e, t) {
    c(this, "framework", "web");
    c(this, "runtimeEnvironment", { deviceOS: (Si = G.userAgentInfo.getOS().name) != null ? Si : "", browser: (bi = G.userAgentInfo.getBrowser().name) != null ? bi : "", browserVersion: (Ci = G.userAgentInfo.getBrowser().version) != null ? Ci : "" });
    c(this, "settings", new Ze());
    c(this, "licenseKey");
    c(this, "deviceName");
    c(this, "_frameSource", null);
    c(this, "_view", null);
    c(this, "modes", []);
    c(this, "components", []);
    c(this, "listeners", []);
    c(this, "cameraPropertiesReportListener", this.reportCameraProperties.bind(this));
    c(this, "cameraAccessErrorListener", this.onCameraAccessError.bind(this));
    c(this, "onWorkerMessageListener", this.onWorkerMessage.bind(this));
    c(this, "dataCaptureInstance");
    c(this, "delayedRegistration");
    c(this, "highEndBlurryRecognition");
    var a, o, d, f2;
    this.licenseKey = e, this.deviceName = (a = t.deviceName) != null ? a : "", this.dataCaptureInstance = (o = t.dataCaptureInstance) != null ? o : $e, this.delayedRegistration = (d = t.delayedRegistration) != null ? d : false, this.highEndBlurryRecognition = (f2 = t.highEndBlurryRecognition) != null ? f2 : false;
  }
  getView() {
    return this._view;
  }
  async setView(e) {
    return this._view = e, this.update();
  }
  get frameSource() {
    return this._frameSource;
  }
  static async create() {
    return Ne.createWithOptions({});
  }
  static async createWithOptions(e) {
    var a;
    let t = new Ne((a = e.licenseKey) != null ? a : kt, { deviceName: e.deviceName });
    return e.settings != null && await t.applySettings(e.settings), await t.initialize(), t;
  }
  async setFrameSource(e) {
    this._frameSource !== null && (this._frameSource.context = null), this._frameSource = e != null ? e : null, e && (e.context = this, await this.workerCommand("setFrameSource", { mirrorAxis: this.getMirrorAxisForFrameSource(e) })), await this.update([{ type: "frameSourceState", newValue: this.frameSource }]);
  }
  addListener(e) {
    this.listeners.includes(e) || this.listeners.push(e);
  }
  removeListener(e) {
    !this.listeners.includes(e) || this.listeners.splice(this.listeners.indexOf(e), 1);
  }
  async addMode(e) {
    this.modes.includes(e) || (this.modes.push(e), e.attachedToContext(this), await this.update());
  }
  async removeMode(e) {
    this.modes.includes(e) && (this.modes.splice(this.modes.indexOf(e), 1), e.detachedFromContext(), await this.update());
  }
  async removeAllModes() {
    for (; this.modes.length > 0; )
      await this.removeMode(this.modes[0]);
  }
  async dispose() {
    k.instance().removeListener("cameraProperties", this.cameraPropertiesReportListener), k.instance().removeListener("cameraAccessError", this.cameraAccessErrorListener), await this.workerCommand("dispose", {});
  }
  async applySettings(e) {
    this.settings = e, await this.update();
  }
  async initialize(e = true) {
    await this.workerCommand("createContext", { context: this.toJSONObject(), deviceId: Ne.deviceID, domain: window.location.hostname, delayedRegistration: this.delayedRegistration, highEndBlurryRecognition: this.highEndBlurryRecognition }), this.subscribeToWorkerMessages(this.onWorkerMessageListener), e && this.subscribeToCameraManagerEvents();
  }
  get workerCommand() {
    return this.dataCaptureInstance.workerCommand.bind(this.dataCaptureInstance);
  }
  async requestFrameData(e) {
    return this.workerCommand("requestFrameData", { frameId: e });
  }
  async sendFrameToProcessor(e) {
    return this.workerCommand("processFrame", e, [e.data.buffer]);
  }
  onWorkerMessage(e) {
    if (e.type === "contextDidChangeStatus") {
      e.payload.isValid || g.log(g.Level.Error, e.payload);
      for (let t of this.listeners)
        t.didChangeStatus && t.didChangeStatus(this, oe.fromJSON(e.payload));
    }
    if (e.type === "didStartObservingContext")
      for (let t of this.listeners)
        t.didStartObservingContext && t.didStartObservingContext(this);
  }
  subscribeToCameraManagerEvents() {
    k.instance().addListener("cameraProperties", this.cameraPropertiesReportListener), k.instance().addListener("cameraAccessError", this.cameraAccessErrorListener);
  }
  async reportCameraProperties(e) {
    return this.workerCommand("reportCameraProperties", e);
  }
  onCameraAccessError(e) {
    for (let t of this.listeners)
      t.didChangeStatus && t.didChangeStatus(this, oe.fromJSON({ code: 33794, isValid: true, message: e.toString() }));
  }
  async update(e = []) {
    var t, a;
    await this.updateContext();
    for (let o of e)
      o.type === "frameSourceState" ? await ((t = this._view) == null ? void 0 : t.onFrameSourceChange(this.frameSource)) : o.type === "singleImageModeUploaderSettings" && ((a = this._view) == null || a.onSingleImageUploaderSettingsChange(o.newValue));
  }
  async updateContext() {
    await this.workerCommand("updateContext", Q({ context: this.toJSONObject() }, this.getViewWidthAndHeight())).catch((e) => {
      g.log(g.Level.Warn, "Error while updating context:", e);
    });
  }
  getViewWidthAndHeight() {
    return this._view != null ? { view: { width: this._view.width, height: this._view.height } } : { view: null };
  }
  getMirrorAxisForFrameSource(e) {
    let t = "None";
    return e.type === "camera" && e.getMirrorImageEnabled() && (t = "Y"), t;
  }
  async addComponent(e) {
    if (!this.components.includes(e))
      return this.components.push(e), e._context = this, this.update();
  }
  subscribeToWorkerMessages(e) {
    this.dataCaptureInstance.addWorkerListener(e);
  }
  unsubscribeToWorkerMessages(e) {
    this.dataCaptureInstance.removeWorkerListener(e);
  }
  toJSONObject() {
    var e, t;
    return Z(Q({ licenseKey: this.licenseKey, framework: this.framework, deviceName: this.deviceName }, this.runtimeEnvironment), { modes: this.modes.map((a) => a.toJSONObject()), components: this.components.map((a) => a.toJSONObject()), frameSource: this.frameSource ? this.frameSource.toJSONObject() : null, settings: this.settings.toJSONObject(), view: (t = (e = this._view) == null ? void 0 : e.toJSONObject()) != null ? t : null });
  }
};
var Tt = Ne;
c(Tt, "deviceID", G.getDeviceId());
var Xe;
((e) => {
  function l2() {
    let t = "6.15.0";
    if (t == null)
      throw new J({ name: "Invalid library version", message: "Library version is not defined or empty." });
    return t;
  }
  e.sdkVersion = l2;
})(Xe || (Xe = {}));
var K = [];
var Ai = function() {
  return K.some(function(l2) {
    return l2.activeTargets.length > 0;
  });
};
var yi = function() {
  return K.some(function(l2) {
    return l2.skippedTargets.length > 0;
  });
};
var wi = "ResizeObserver loop completed with undelivered notifications.";
var Mi = function() {
  var l2;
  typeof ErrorEvent == "function" ? l2 = new ErrorEvent("error", { message: wi }) : (l2 = document.createEvent("Event"), l2.initEvent("error", false, false), l2.message = wi), window.dispatchEvent(l2);
};
var he;
(function(l2) {
  l2.BORDER_BOX = "border-box", l2.CONTENT_BOX = "content-box", l2.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
})(he || (he = {}));
var te = function(l2) {
  return Object.freeze(l2);
};
var Rt = function() {
  function l2(e, t) {
    this.inlineSize = e, this.blockSize = t, te(this);
  }
  return l2;
}();
var Pt = function() {
  function l2(e, t, a, o) {
    return this.x = e, this.y = t, this.width = a, this.height = o, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, te(this);
  }
  return l2.prototype.toJSON = function() {
    var e = this, t = e.x, a = e.y, o = e.top, d = e.right, f2 = e.bottom, p = e.left, v2 = e.width, S2 = e.height;
    return { x: t, y: a, top: o, right: d, bottom: f2, left: p, width: v2, height: S2 };
  }, l2.fromRect = function(e) {
    return new l2(e.x, e.y, e.width, e.height);
  }, l2;
}();
var Ve = function(l2) {
  return l2 instanceof SVGElement && "getBBox" in l2;
};
var Ke = function(l2) {
  if (Ve(l2)) {
    var e = l2.getBBox(), t = e.width, a = e.height;
    return !t && !a;
  }
  var o = l2, d = o.offsetWidth, f2 = o.offsetHeight;
  return !(d || f2 || l2.getClientRects().length);
};
var zt = function(l2) {
  var e, t;
  if (l2 instanceof Element)
    return true;
  var a = (t = (e = l2) === null || e === void 0 ? void 0 : e.ownerDocument) === null || t === void 0 ? void 0 : t.defaultView;
  return !!(a && l2 instanceof a.Element);
};
var Li = function(l2) {
  switch (l2.tagName) {
    case "INPUT":
      if (l2.type !== "image")
        break;
    case "VIDEO":
    case "AUDIO":
    case "EMBED":
    case "OBJECT":
    case "CANVAS":
    case "IFRAME":
    case "IMG":
      return true;
  }
  return false;
};
var ge = typeof window < "u" ? window : {};
var et = /* @__PURE__ */ new WeakMap();
var xi = /auto|scroll/;
var Ar = /^tb|vertical/;
var yr = /msie|trident/i.test(ge.navigator && ge.navigator.userAgent);
var ae = function(l2) {
  return parseFloat(l2 || "0");
};
var ye = function(l2, e, t) {
  return l2 === void 0 && (l2 = 0), e === void 0 && (e = 0), t === void 0 && (t = false), new Rt((t ? e : l2) || 0, (t ? l2 : e) || 0);
};
var _i = te({ devicePixelContentBoxSize: ye(), borderBoxSize: ye(), contentBoxSize: ye(), contentRect: new Pt(0, 0, 0, 0) });
var jt = function(l2, e) {
  if (e === void 0 && (e = false), et.has(l2) && !e)
    return et.get(l2);
  if (Ke(l2))
    return et.set(l2, _i), _i;
  var t = getComputedStyle(l2), a = Ve(l2) && l2.ownerSVGElement && l2.getBBox(), o = !yr && t.boxSizing === "border-box", d = Ar.test(t.writingMode || ""), f2 = !a && xi.test(t.overflowY || ""), p = !a && xi.test(t.overflowX || ""), v2 = a ? 0 : ae(t.paddingTop), S2 = a ? 0 : ae(t.paddingRight), i = a ? 0 : ae(t.paddingBottom), r = a ? 0 : ae(t.paddingLeft), n2 = a ? 0 : ae(t.borderTopWidth), s2 = a ? 0 : ae(t.borderRightWidth), u = a ? 0 : ae(t.borderBottomWidth), h2 = a ? 0 : ae(t.borderLeftWidth), m2 = r + S2, b2 = v2 + i, C2 = h2 + s2, _2 = n2 + u, j2 = p ? l2.offsetHeight - _2 - l2.clientHeight : 0, B2 = f2 ? l2.offsetWidth - C2 - l2.clientWidth : 0, D2 = o ? m2 + C2 : 0, y2 = o ? b2 + _2 : 0, A = a ? a.width : ae(t.width) - D2 - B2, M2 = a ? a.height : ae(t.height) - y2 - j2, w2 = A + m2 + B2 + C2, I2 = M2 + b2 + j2 + _2, E = te({ devicePixelContentBoxSize: ye(Math.round(A * devicePixelRatio), Math.round(M2 * devicePixelRatio), d), borderBoxSize: ye(w2, I2, d), contentBoxSize: ye(A, M2, d), contentRect: new Pt(r, v2, A, M2) });
  return et.set(l2, E), E;
};
var tt = function(l2, e, t) {
  var a = jt(l2, t), o = a.borderBoxSize, d = a.contentBoxSize, f2 = a.devicePixelContentBoxSize;
  switch (e) {
    case he.DEVICE_PIXEL_CONTENT_BOX:
      return f2;
    case he.BORDER_BOX:
      return o;
    default:
      return d;
  }
};
var Ft = function() {
  function l2(e) {
    var t = jt(e);
    this.target = e, this.contentRect = t.contentRect, this.borderBoxSize = te([t.borderBoxSize]), this.contentBoxSize = te([t.contentBoxSize]), this.devicePixelContentBoxSize = te([t.devicePixelContentBoxSize]);
  }
  return l2;
}();
var it = function(l2) {
  if (Ke(l2))
    return 1 / 0;
  for (var e = 0, t = l2.parentNode; t; )
    e += 1, t = t.parentNode;
  return e;
};
var Di = function() {
  var l2 = 1 / 0, e = [];
  K.forEach(function(f2) {
    if (f2.activeTargets.length !== 0) {
      var p = [];
      f2.activeTargets.forEach(function(S2) {
        var i = new Ft(S2.target), r = it(S2.target);
        p.push(i), S2.lastReportedSize = tt(S2.target, S2.observedBox), r < l2 && (l2 = r);
      }), e.push(function() {
        f2.callback.call(f2.observer, p, f2.observer);
      }), f2.activeTargets.splice(0, f2.activeTargets.length);
    }
  });
  for (var t = 0, a = e; t < a.length; t++) {
    var o = a[t];
    o();
  }
  return l2;
};
var Wt = function(l2) {
  K.forEach(function(t) {
    t.activeTargets.splice(0, t.activeTargets.length), t.skippedTargets.splice(0, t.skippedTargets.length), t.observationTargets.forEach(function(o) {
      o.isActive() && (it(o.target) > l2 ? t.activeTargets.push(o) : t.skippedTargets.push(o));
    });
  });
};
var Ii = function() {
  var l2 = 0;
  for (Wt(l2); Ai(); )
    l2 = Di(), Wt(l2);
  return yi() && Mi(), l2 > 0;
};
var Ut;
var Ei = [];
var wr = function() {
  return Ei.splice(0).forEach(function(l2) {
    return l2();
  });
};
var Oi = function(l2) {
  if (!Ut) {
    var e = 0, t = document.createTextNode(""), a = { characterData: true };
    new MutationObserver(function() {
      return wr();
    }).observe(t, a), Ut = function() {
      t.textContent = "" + (e ? e-- : e++);
    };
  }
  Ei.push(l2), Ut();
};
var Ni = function(l2) {
  Oi(function() {
    requestAnimationFrame(l2);
  });
};
var rt = 0;
var Mr = function() {
  return !!rt;
};
var Lr = 250;
var xr = { attributes: true, characterData: true, childList: true, subtree: true };
var Vi = ["resize", "load", "transitionend", "animationend", "animationstart", "animationiteration", "keyup", "keydown", "mouseup", "mousedown", "mouseover", "mouseout", "blur", "focus"];
var Ti = function(l2) {
  return l2 === void 0 && (l2 = 0), Date.now() + l2;
};
var Jt = false;
var _r = function() {
  function l2() {
    var e = this;
    this.stopped = true, this.listener = function() {
      return e.schedule();
    };
  }
  return l2.prototype.run = function(e) {
    var t = this;
    if (e === void 0 && (e = Lr), !Jt) {
      Jt = true;
      var a = Ti(e);
      Ni(function() {
        var o = false;
        try {
          o = Ii();
        } finally {
          if (Jt = false, e = a - Ti(), !Mr())
            return;
          o ? t.run(1e3) : e > 0 ? t.run(e) : t.start();
        }
      });
    }
  }, l2.prototype.schedule = function() {
    this.stop(), this.run();
  }, l2.prototype.observe = function() {
    var e = this, t = function() {
      return e.observer && e.observer.observe(document.body, xr);
    };
    document.body ? t() : ge.addEventListener("DOMContentLoaded", t);
  }, l2.prototype.start = function() {
    var e = this;
    this.stopped && (this.stopped = false, this.observer = new MutationObserver(this.listener), this.observe(), Vi.forEach(function(t) {
      return ge.addEventListener(t, e.listener, true);
    }));
  }, l2.prototype.stop = function() {
    var e = this;
    this.stopped || (this.observer && this.observer.disconnect(), Vi.forEach(function(t) {
      return ge.removeEventListener(t, e.listener, true);
    }), this.stopped = true);
  }, l2;
}();
var at = new _r();
var Bt = function(l2) {
  !rt && l2 > 0 && at.start(), rt += l2, !rt && at.stop();
};
var Dr = function(l2) {
  return !Ve(l2) && !Li(l2) && getComputedStyle(l2).display === "inline";
};
var ki = function() {
  function l2(e, t) {
    this.target = e, this.observedBox = t || he.CONTENT_BOX, this.lastReportedSize = { inlineSize: 0, blockSize: 0 };
  }
  return l2.prototype.isActive = function() {
    var e = tt(this.target, this.observedBox, true);
    return Dr(this.target) && (this.lastReportedSize = e), this.lastReportedSize.inlineSize !== e.inlineSize || this.lastReportedSize.blockSize !== e.blockSize;
  }, l2;
}();
var Ri = function() {
  function l2(e, t) {
    this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = e, this.callback = t;
  }
  return l2;
}();
var nt = /* @__PURE__ */ new WeakMap();
var Pi = function(l2, e) {
  for (var t = 0; t < l2.length; t += 1)
    if (l2[t].target === e)
      return t;
  return -1;
};
var Te = function() {
  function l2() {
  }
  return l2.connect = function(e, t) {
    var a = new Ri(e, t);
    nt.set(e, a);
  }, l2.observe = function(e, t, a) {
    var o = nt.get(e), d = o.observationTargets.length === 0;
    Pi(o.observationTargets, t) < 0 && (d && K.push(o), o.observationTargets.push(new ki(t, a && a.box)), Bt(1), at.schedule());
  }, l2.unobserve = function(e, t) {
    var a = nt.get(e), o = Pi(a.observationTargets, t), d = a.observationTargets.length === 1;
    o >= 0 && (d && K.splice(K.indexOf(a), 1), a.observationTargets.splice(o, 1), Bt(-1));
  }, l2.disconnect = function(e) {
    var t = this, a = nt.get(e);
    a.observationTargets.slice().forEach(function(o) {
      return t.unobserve(e, o.target);
    }), a.activeTargets.splice(0, a.activeTargets.length);
  }, l2;
}();
var Ht = function() {
  function l2(e) {
    if (arguments.length === 0)
      throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
    if (typeof e != "function")
      throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
    Te.connect(this, e);
  }
  return l2.prototype.observe = function(e, t) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!zt(e))
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
    Te.observe(this, e, t);
  }, l2.prototype.unobserve = function(e) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!zt(e))
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
    Te.unobserve(this, e);
  }, l2.prototype.disconnect = function() {
    Te.disconnect(this);
  }, l2.toString = function() {
    return "function ResizeObserver () { [polyfill code] }";
  }, l2;
}();
function ot(l2) {
  console.warn("Reached unexpected case");
}
var Gt = class {
  constructor(e) {
    this.canvas = e;
    c(this, "_context");
    c(this, "resizeObserver");
    c(this, "isNextDrawPending", false);
    c(this, "latestCommands", []);
  }
  get context() {
    return this._context || (this._context = this.canvas.getContext("2d")), this._context;
  }
  draw(e) {
    if (this.latestCommands = e, !this.isCanvasReady()) {
      this.postponeDraw();
      return;
    }
    this.isNextDrawPending || (this.isNextDrawPending = true, requestAnimationFrame(() => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let t of this.latestCommands)
        this.drawSingleCommand(t);
      this.isNextDrawPending = false;
    }));
  }
  postponeDraw() {
    this.setCanvasObserver();
  }
  isCanvasReady() {
    return this.canvas.width > 0 && this.canvas.height > 0;
  }
  setCanvasObserver() {
    this.resizeObserver || (this.resizeObserver = new Gt.ResizeObserver(() => {
      !this.isCanvasReady() || this.latestCommands.length === 0 || (this.draw(this.latestCommands), this.latestCommands = []);
    }), this.resizeObserver.observe(this.canvas));
  }
  drawSingleCommand(e) {
    switch (e.command) {
      case "beginPath":
        this.beginPath();
        break;
      case "closePath":
        this.closePath();
        break;
      case "setStrokeColor":
        this.setStrokeColor(e.args);
        break;
      case "setFillColor":
        this.setFillColor(e.args);
        break;
      case "fill":
        this.fill();
        break;
      case "stroke":
        this.stroke();
        break;
      case "addCircle":
        this.addCircle(e.args);
        break;
      case "addLine":
        this.addLine(e.args);
        break;
      case "lineTo":
        this.lineTo(e.args);
        break;
      case "moveTo":
        this.moveTo(e.args);
        break;
      case "addRect":
        this.addRectangle(e.args);
        break;
      case "addRoundedRect":
        this.addRoundedRectangle(e.args);
        break;
      case "setStrokeWidth":
        this.setStrokeWidth(e.args);
        break;
      case "addArc":
        this.addArc(e.args);
        break;
      case "bezierTo":
        this.bezierTo(e.args);
        break;
      case "saveState":
        this.saveState();
        break;
      case "restoreState":
        this.restoreState();
        break;
      case "translate":
        this.translate(e.args);
        break;
      default:
        ot(e);
    }
  }
  beginPath() {
    this.context.beginPath();
  }
  closePath() {
    this.context.closePath();
  }
  setStrokeColor(e) {
    this.context.strokeStyle = this.colorToRgbaString(e.color);
  }
  setFillColor(e) {
    this.context.fillStyle = this.colorToRgbaString(e.color);
  }
  fill() {
    this.context.fill("nonzero");
  }
  stroke() {
    this.context.stroke();
  }
  addLine(e) {
    this.context.moveTo(e.start.x, e.start.y), this.context.lineTo(e.end.x, e.end.y);
  }
  lineTo(e) {
    this.context.lineTo(e.point.x, e.point.y);
  }
  moveTo(e) {
    this.context.moveTo(e.point.x, e.point.y);
  }
  addRectangle(e) {
    this.context.rect(e.origin.x, e.origin.y, e.size.width, e.size.height);
  }
  addRoundedRectangle(e) {
    let { origin: t } = e, { radius: a } = e, { size: o } = e;
    this.context.moveTo(t.x + a, t.y), this.context.lineTo(t.x + o.width - a, t.y), this.context.quadraticCurveTo(t.x + o.width, t.y, t.x + o.width, t.y + a), this.context.lineTo(t.x + o.width, t.y + o.height - a), this.context.quadraticCurveTo(t.x + o.width, t.y + o.height, t.x + o.width - a, t.y + o.height), this.context.lineTo(t.x + a, t.y + o.height), this.context.quadraticCurveTo(t.x, t.y + o.height, t.x, t.y + o.height - a), this.context.lineTo(t.x, t.y + a), this.context.quadraticCurveTo(t.x, t.y, t.x + a, t.y), this.context.closePath();
  }
  setStrokeWidth(e) {
    this.context.lineWidth = e.width;
  }
  addArc(e) {
    this.context.arc(e.center.x, e.center.y, e.radius, e.startAngle, e.endAngle, e.counterclockwise);
  }
  addCircle(e) {
    this.context.arc(e.center.x, e.center.y, e.radius, 0, Math.PI * 2);
  }
  bezierTo(e) {
    this.context.bezierCurveTo(e.firstControlPoint.x, e.firstControlPoint.y, e.secondControlPoint.x, e.secondControlPoint.y, e.endPoint.x, e.endPoint.y);
  }
  saveState() {
    this.context.save();
  }
  restoreState() {
    this.context.restore();
  }
  translate(e) {
    this.context.translate(e.distance.x, e.distance.y);
  }
  colorToRgbaString(e) {
    return `rgba(${e.r},${e.g},${e.b},${e.a})`;
  }
};
var ke = Gt;
c(ke, "ResizeObserver", window.ResizeObserver);
var fe = class {
  constructor(e) {
    c(this, "element");
    c(this, "resizeObserver");
    c(this, "onStateChangedListener");
    c(this, "cachedDOMRect");
    this.element = e, this.setupListener(), this.cacheDOMRect();
  }
  get width() {
    return this.cachedDOMRect.width;
  }
  get height() {
    return this.cachedDOMRect.height;
  }
  static areEquivalentJSONStates(e, t) {
    return !e || !t ? false : e.size.isSameAs(t.size) && e.visible === t.visible;
  }
  onStateChanged(e) {
    this.onStateChangedListener = e;
  }
  toJSONObject() {
    return { size: new de(new R(this.width, "pixel"), new R(this.height, "pixel")), visible: this.isVisible() };
  }
  isSameAs(e) {
    return fe.areEquivalentJSONStates(this.toJSONObject(), e.toJSONObject());
  }
  isVisible() {
    return this.width > 0 && this.height > 0 || this.element.getClientRects().length > 0;
  }
  setupListener() {
    this.resizeObserver = new ResizeObserver(this.onSizeChange.bind(this)), this.resizeObserver.observe(this.element);
  }
  onSizeChange(e) {
    this.cacheDOMRect(e), this.onStateChangedListener && this.onStateChangedListener();
  }
  cacheDOMRect(e) {
    let t;
    Array.isArray(e) && e.length > 0 && (t = e[0].contentRect), t == null && (t = this.element.getBoundingClientRect()), this.cachedDOMRect = t;
  }
};
var st = class {
  constructor(e, t) {
    this.control = e;
    c(this, "domHost");
    c(this, "state", Re.Idle);
    c(this, "button");
    c(this, "isHover", false);
    c(this, "onTouchStartListener");
    c(this, "onMouseEnterListener");
    c(this, "onMouseLeaveListener");
    c(this, "onClickListener");
    this.domHost = t, this.onTouchStartListener = this.onTouchStart.bind(this), this.onMouseEnterListener = this.onMouseEnter.bind(this), this.onMouseLeaveListener = this.onMouseLeave.bind(this), this.onClickListener = this.onClick.bind(this);
  }
  get frameSource() {
    var e, t;
    return (t = (e = this.control.view) == null ? void 0 : e.getContext()) == null ? void 0 : t.frameSource;
  }
  get context() {
    var e;
    return (e = this.control.view) == null ? void 0 : e.getContext();
  }
  async install() {
    !this.button || (await this.canShow() ? (this.updateButtonBackground(this.button, this.getImageFromState()), this.show()) : this.hide());
  }
  hide() {
    this.button && (this.button.style.display = "none");
  }
  show() {
    this.button && (this.button.style.display = "block");
  }
  setupButton() {
    let e = document.createElement("button");
    return e.type = "button", e.style.display = "none", e.className = `scandit-control-widget scandit-control-widget-${this.control.type}`, this.updateButtonBackground(e, this.getImageFromState()), this.domHost.append(e), e.addEventListener("mouseenter", this.onMouseEnterListener), e.addEventListener("mouseleave", this.onMouseLeaveListener), G.isDesktopDevice() || e.addEventListener("touchstart", this.onTouchStartListener), e.addEventListener("click", this.onClickListener), this.button = e;
  }
  onTouchStart() {
    var e, t;
    (e = this.button) == null || e.removeEventListener("mouseenter", this.onMouseEnterListener), (t = this.button) == null || t.removeEventListener("mouseleave", this.onMouseLeaveListener);
  }
  onMouseEnter() {
    this.isHover = true, this.updateButtonBackground(this.button, this.getImageFromState());
  }
  onMouseLeave() {
    this.isHover = false, this.updateButtonBackground(this.button, this.getImageFromState());
  }
  onClick() {
    this.state = this.state === Re.Pressed ? Re.Idle : Re.Pressed, this.buttonClicked(), this.updateButtonBackground(this.button, this.getImageFromState());
  }
  updateButtonBackground(e, t) {
    t != null && (e.style.backgroundImage = `url(${t})`);
  }
  remove(e = false) {
    e && this.button ? (this.button.removeEventListener("mouseenter", this.onMouseEnterListener), this.button.removeEventListener("mouseleave", this.onMouseLeaveListener), this.button.removeEventListener("touchstart", this.onTouchStartListener), this.button.removeEventListener("click", this.onClickListener), this.button.remove(), this.isHover = false, this.button = void 0) : this.hide();
  }
};
var lt = class extends st {
  constructor(e, t) {
    super(e, t), this.setup();
  }
  setup() {
    if (this.control.torchOffImage == null && this.control.torchOnImage == null) {
      g.log(g.Level.Warn, "TorchSwitchControl icon is not set or is empty, the control will not be rendered.");
      return;
    }
    this.button = this.setupButton();
  }
  async canShow() {
    return this.isTorchAvailable();
  }
  async isTorchAvailable() {
    var t;
    let e = (t = this.frameSource) == null ? void 0 : t.toJSONObject();
    return e && e.type === "camera" ? this.frameSource.isTorchAvailable() : false;
  }
  retrieveTorchState() {
    var t;
    let e = (t = this.frameSource) == null ? void 0 : t.toJSONObject();
    return e && e.type === "camera" ? this.frameSource.getDesiredTorchState() : "off";
  }
  getImageFromState() {
    return this.retrieveTorchState() === "on" ? this.isHover ? this.control.torchOnPressedImage : this.control.torchOnImage : this.isHover ? this.control.torchOffPressedImage : this.control.torchOffImage;
  }
  async buttonClicked() {
    await this.frameSource.setDesiredTorchState(this.retrieveTorchState() === "on" ? "off" : "on");
  }
};
var Re = ((t) => (t.Idle = "idle", t.Pressed = "pressed", t))(Re || {});
var le = class extends st {
  constructor(t, a) {
    super(t, a);
    c(this, "isTransitioning");
    this.setup();
  }
  static get Camera() {
    return pe;
  }
  static get CameraAccess() {
    return Y;
  }
  setup() {
    if (this.control.idleImage == null) {
      g.log(g.Level.Warn, "CameraSwitchControl idle icon is not set or is empty, the control will not be rendered.");
      return;
    }
    this.button = this.setupButton();
  }
  async canShow() {
    return (await le.CameraAccess.getCameras()).length > 1;
  }
  getImageFromState() {
    return this.isHover ? this.control.pressedImage : this.control.idleImage;
  }
  async buttonClicked() {
    if (this.isTransitioning)
      return;
    let t = await this.getNextDeviceCamera();
    t && await this.switchCameras(t);
  }
  async getNextDeviceCamera() {
    var f2, p;
    let t = await le.CameraAccess.getCameras(), a = this.frameSource, o = (f2 = a == null ? void 0 : a.cameraManager.activeCamera) == null ? void 0 : f2.deviceId, d = t.findIndex((v2) => v2.deviceId === o);
    return d > -1 ? (p = t[d + 1]) != null ? p : t[0] : t.length > 0 ? t[0] : null;
  }
  async switchCameras(t) {
    var d;
    this.isTransitioning = true;
    let a = this.frameSource;
    a && await a.switchToDesiredState("off");
    let o = new le.Camera();
    o.deviceId = t.deviceId, await o.applySettings(new ne(a.settings)), await o.switchToDesiredState("on"), await ((d = this.context) == null ? void 0 : d.setFrameSource(o)), this.isTransitioning = false;
  }
};
function zi() {
  return `
    .${O.CONTAINER_CLASS_NAME} {
      display: flex;
      /* Without this the flex child overflows its parent on Chrome mobile: */
      flex-direction: column;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .${O.PAINTBOARD_CLASS_NAME} {
      position: relative;
      width: 100%;
      height: 100%;
      min-width: 1px;
      min-height: 1px;
      background-color: black;
    }

    .${O.PAINTBOARD_CLASS_NAME} video {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .${O.PAINTBOARD_CLASS_NAME} .${O.MIRRORED_CLASS_NAME} {
      transform: scale(-1, 1);
    }

    .${O.PAINTBOARD_CLASS_NAME} .${O.CAMERA_RECOVERY_CLASS_NAME} {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 5;
      cursor: pointer;
      background-color: #000;
      color: #fff;
    }

    .${O.PAINTBOARD_CLASS_NAME} .${O.ERROR_CLASS_NAME} {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      z-index: 6;
      color: white;
      background-color: rgba(0,0,0,0.5);
    }

    .${O.PAINTBOARD_CLASS_NAME} .${O.CAMERA_RECOVERY_CLASS_NAME}[hidden],
    .${O.PAINTBOARD_CLASS_NAME} .${O.ERROR_CLASS_NAME}[hidden] {
      display: none;
    }

    .${O.PAINTBOARD_CLASS_NAME} canvas {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: cover;
    }

    .${O.PAINTBOARD_CLASS_NAME} .${O.CONTROLS_CLASS_NAME} {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
    }

    .${O.PAINTBOARD_CLASS_NAME} .${O.CONTROL_WIDGET_CLASS_NAME}-${Pe.CLASS_NAME} {
      position: absolute;
      top: 24px;
      left: 16px;
    }

    .${O.PAINTBOARD_CLASS_NAME} .${O.CONTROL_WIDGET_CLASS_NAME}-${ze.CLASS_NAME} {
      position: absolute;
      top: 24px;
      right: 16px;
    }

    .${O.PAINTBOARD_CLASS_NAME} .${O.SINGLE_IMAGE_UPLOADER_CONTAINER_CLASS_NAME} {
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    .${O.PAINTBOARD_CLASS_NAME} .${O.SINGLE_IMAGE_UPLOADER_CONTAINER_CLASS_NAME} label {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .${O.PAINTBOARD_CLASS_NAME} .${O.SINGLE_IMAGE_UPLOADER_CONTAINER_CLASS_NAME} label input[type="file"] {
      position: absolute;
      top: -9999px;
    }

    .${O.PAINTBOARD_CLASS_NAME} .${O.SINGLE_IMAGE_UPLOADER_CONTAINER_CLASS_NAME} label button {
      pointer-events: none;
    }

    .${O.CONTROL_WIDGET_CLASS_NAME} {
      width: 32px;
      height: 32px;
      background-color: transparent;
      background-repeat: no-repeat;
      border: none;
      cursor: pointer;
    }

    .${O.CONTROL_WIDGET_CLASS_NAME} + .${O.CONTROL_WIDGET_CLASS_NAME} {
      margin-left: 16px;
    }
  `;
}
typeof window.ResizeObserver != "function" && (window.ResizeObserver = Ht);
var Ir = ((S2) => (S2.TopLeft = "topLeft", S2.TopCenter = "topCenter", S2.TopRight = "topRight", S2.CenterLeft = "centerLeft", S2.Center = "center", S2.CenterRight = "centerRight", S2.BottomLeft = "bottomLeft", S2.BottomCenter = "bottomCenter", S2.BottomRight = "bottomRight", S2))(Ir || {});
var $ = class {
  constructor() {
    c(this, "_scanAreaMargins", x.DataCaptureView.scanAreaMargins);
    c(this, "_pointOfInterest", x.DataCaptureView.pointOfInterest);
    c(this, "_logoStyle", x.DataCaptureView.logoStyle);
    c(this, "_logoAnchor", x.DataCaptureView.logoAnchor);
    c(this, "_logoOffset", x.DataCaptureView.logoOffset);
    c(this, "focusGesture", x.DataCaptureView.focusGesture);
    c(this, "zoomGesture", x.DataCaptureView.zoomGesture);
    c(this, "_cameraRecoveryText", x.DataCaptureView.cameraRecoveryText);
    c(this, "_context", null);
    c(this, "overlays", []);
    c(this, "controls", []);
    c(this, "controlWidgets", /* @__PURE__ */ new WeakMap());
    c(this, "containerElement");
    c(this, "cameraPaintboardElement");
    c(this, "singleImageUploaderPaintboardElement");
    c(this, "videoElement");
    c(this, "visibilityListener");
    c(this, "videoPauseListener");
    c(this, "cameraRecoveryListener");
    c(this, "controlsElement");
    c(this, "cameraRecoveryElement");
    c(this, "errorElement");
    c(this, "canvasElement");
    c(this, "_canvasDrawer");
    c(this, "listeners", []);
    c(this, "htmlElement");
    c(this, "htmlElementState");
    c(this, "lastHtmlElementState");
    c(this, "isVideoElementDetached", false);
  }
  static async forContext(e) {
    let t = new $();
    return await t.setContext(e), t;
  }
  getContext() {
    return this._context;
  }
  async setContext(e) {
    var t;
    if (this._context = e, e) {
      if (this.overlays.length > 0 && this.privateContext.modes.length === 0)
        throw new Error(["Cannot assign this view to this context. This view has overlays but the context does not have any mode attached matching these overlays.", "Remove the overlays first before attaching the view to the context, or add the corresponding mode to the context before attaching this view."].join(" "));
      await e.setView(this), this.privateContext.subscribeToWorkerMessages(this.onWorkerMessage.bind(this)), (t = this._context) != null && t.frameSource && await this.onFrameSourceChange(this._context.frameSource);
    }
  }
  get scanAreaMargins() {
    return this._scanAreaMargins;
  }
  set scanAreaMargins(e) {
    this._scanAreaMargins = e, this.privateContext.update();
  }
  get pointOfInterest() {
    return this._pointOfInterest;
  }
  set pointOfInterest(e) {
    this._pointOfInterest = e, this.privateContext.update();
  }
  get logoStyle() {
    return this._logoStyle;
  }
  set logoStyle(e) {
    this._logoStyle = e, this.privateContext.update();
  }
  get logoAnchor() {
    return this._logoAnchor;
  }
  set logoAnchor(e) {
    this._logoAnchor = e, this.privateContext.update();
  }
  get logoOffset() {
    return this._logoOffset;
  }
  set logoOffset(e) {
    this._logoOffset = e, this.privateContext.update();
  }
  get cameraRecoveryText() {
    return this._cameraRecoveryText;
  }
  set cameraRecoveryText(e) {
    this._cameraRecoveryText = e, this.cameraRecoveryElement.textContent = e;
  }
  connectToElement(e) {
    this.setupHtmlElement(e), this.setupHtmlElementVisibility(), this.htmlElementDidChange();
  }
  async addOverlay(e) {
    this.overlays.includes(e) || (this.overlays.push(e), await this.privateContext.update([{ type: "addOverlay", newValue: e }]));
  }
  async removeOverlay(e) {
    !this.overlays.includes(e) || (this.overlays.splice(this.overlays.indexOf(e), 1), await this.privateContext.update([{ type: "removeOverlay", newValue: e }]));
  }
  addListener(e) {
    this.listeners.includes(e) || this.listeners.push(e);
  }
  removeListener(e) {
    this.listeners.includes(e) && this.listeners.splice(this.listeners.indexOf(e), 1);
  }
  viewPointForFramePoint(e) {
    let t = { width: this.htmlElementState.width, height: this.htmlElementState.height }, a = { width: this.videoElement.videoWidth, height: this.videoElement.videoHeight }, o = t.width / t.height, d = a.width / a.height, f2;
    f2 = o > d ? t.width / a.width : t.height / a.height;
    let p = { x: e.x * f2, y: e.y * f2 }, v2 = (a.width * f2 - t.width) / 2, S2 = (a.height * f2 - t.height) / 2;
    return new re(p.x - v2, p.y - S2);
  }
  viewQuadrilateralForFrameQuadrilateral(e) {
    let t = this.viewPointForFramePoint(e.topLeft), a = this.viewPointForFramePoint(e.topRight), o = this.viewPointForFramePoint(e.bottomLeft), d = this.viewPointForFramePoint(e.bottomRight);
    return new be(t, a, d, o);
  }
  addControl(e) {
    this.controls.includes(e) || (e.view = this, this.controls.push(e), this.controlsUpdated(), this.privateContext.update([{ type: "addControl", newValue: e }]));
  }
  removeControl(e) {
    if (this.controls.includes(e)) {
      e.view = null;
      let t = this.controls.splice(this.controls.indexOf(e), 1);
      this.getControlWidget(t[0]).remove(true), this.controlsUpdated(), this.privateContext.update([{ type: "removeControl", newValue: e }]);
    }
  }
  toJSONObject() {
    var e;
    return { scanAreaMargins: this.scanAreaMargins.toJSONObject(), pointOfInterest: this.pointOfInterest.toJSONObject(), logoAnchor: this.logoAnchor, logoOffset: this.logoOffset.toJSONObject(), logoHidden: (e = this.logoHidden) != null ? e : false, logoStyle: this.logoStyle, overlays: this.overlays.map((t) => t.toJSONObject()), controls: this.controls.map((t) => t.toJSONObject()), focusGesture: this.focusGesture ? this.focusGesture.toJSONObject() : null, zoomGesture: this.zoomGesture ? this.zoomGesture.toJSONObject() : null };
  }
  isCameraRecoveryVisible() {
    return !this.cameraRecoveryElement.hidden;
  }
  setCameraRecoveryVisible(e) {
    this.cameraRecoveryElement.hidden = !e;
  }
  setupHtmlElement(e) {
    this.createStyles(), this.htmlElement = e;
    let t = `
      <div class="${$.CONTAINER_CLASS_NAME}">
        <div class="${$.PAINTBOARD_CLASS_NAME}" data-js-id="camera-paintboard">
          <video autoplay="autoplay" playsinline="true" muted="muted"></video>
          <canvas></canvas>
          <div class="${$.CONTROLS_CLASS_NAME}"></div>
          <div class="${$.CAMERA_RECOVERY_CLASS_NAME}" hidden>${this.cameraRecoveryText}</div>
          <div class="${$.ERROR_CLASS_NAME}" hidden></div>
        </div>
        <div class="${$.PAINTBOARD_CLASS_NAME}" data-js-id="singleimage-paintboard"></div>
      </div>
    `;
    this.htmlElement.innerHTML = t, this.containerElement = this.htmlElement.querySelector(`.${$.CONTAINER_CLASS_NAME}`), this.cameraPaintboardElement = this.containerElement.querySelector('[data-js-id="camera-paintboard"]'), this.videoElement = this.cameraPaintboardElement.querySelector("video"), this.canvasElement = this.cameraPaintboardElement.querySelector("canvas"), this.controlsElement = this.cameraPaintboardElement.querySelector(`.${$.CONTROLS_CLASS_NAME}`), this.cameraRecoveryElement = this.cameraPaintboardElement.querySelector(`.${$.CAMERA_RECOVERY_CLASS_NAME}`), this.errorElement = this.cameraPaintboardElement.querySelector(`.${$.ERROR_CLASS_NAME}`), this.singleImageUploaderPaintboardElement = this.containerElement.querySelector('[data-js-id="singleimage-paintboard"]'), this.videoPauseListener = this.handleVideoPause.bind(this), this.videoElement.addEventListener("pause", this.videoPauseListener), this.visibilityListener = this.checkAndRecoverPlayback.bind(this), document.addEventListener("visibilitychange", this.visibilityListener), this.cameraRecoveryListener = this.cameraRecovery.bind(this);
    for (let a of ["touchend", "mousedown"])
      this.cameraRecoveryElement.addEventListener(a, this.cameraRecoveryListener);
    this.htmlElementState = new fe(this.htmlElement), this.htmlElementState.onStateChanged(this.htmlElementDidChange.bind(this));
  }
  setupHtmlElementSingleImageUploaderChildren(e) {
    var i, r, n2, s2, u, h2, m2;
    if (this.singleImageUploaderPaintboardElement == null)
      return;
    this.singleImageUploaderPaintboardElement.textContent = "";
    let t = document.createElement("div");
    t.className = $.SINGLE_IMAGE_UPLOADER_CONTAINER_CLASS_NAME, Object.assign(t.style, x.SingleImageUploader.Settings.containerStyle, e.containerStyle), this.singleImageUploaderPaintboardElement.append(t);
    let a = (i = e.iconElement) != null ? i : x.SingleImageUploader.Settings.iconElement;
    Object.assign(a.style, x.SingleImageUploader.Settings.iconStyle, e.iconStyle), a.style.maxWidth = "100px", a.style.maxHeight = "100px", t.append(a);
    let o = (r = e.informationElement) != null ? r : x.SingleImageUploader.Settings.informationElement;
    Object.assign(o.style, x.SingleImageUploader.Settings.informationStyle, e.informationStyle), t.append(o);
    let d = document.createElement("label"), f2 = document.createElement("input");
    f2.type = "file", f2.accept = "image/*", f2.addEventListener("change", ((n2 = this._context) == null ? void 0 : n2.frameSource).onUploadedFile.bind((s2 = this._context) == null ? void 0 : s2.frameSource));
    let p = (b2) => {
      var C2, _2;
      ((_2 = (C2 = this._context) == null ? void 0 : C2.frameSource) == null ? void 0 : _2.getCurrentState()) !== "starting" && b2.preventDefault();
    };
    f2.addEventListener("click", p), f2.addEventListener("keydown", p), d.append(f2);
    let v2 = (u = e.buttonElement) != null ? u : x.SingleImageUploader.Settings.buttonElement;
    Object.assign(v2.style, x.SingleImageUploader.Settings.buttonStyle, e.buttonStyle), v2.style.opacity = ((m2 = (h2 = this._context) == null ? void 0 : h2.frameSource) == null ? void 0 : m2.getCurrentState()) === "starting" ? "1" : "0.3", d.append(v2), t.append(d);
    let S2 = document.createRange().createContextualFragment(atob(pi)).firstElementChild;
    S2.style.position = "absolute", S2.style.bottom = "1em", S2.style.right = "1em", S2.style.width = "10em", t.append(S2);
  }
  setupHtmlElementVisibility(e) {
    this.cameraPaintboardElement != null && (this.cameraPaintboardElement.hidden = e !== "camera"), this.singleImageUploaderPaintboardElement != null && (this.singleImageUploaderPaintboardElement.hidden = e !== "singleImageUploader");
  }
  createStyles() {
    if (document.querySelector("style[scandit]") === null) {
      let e = document.createElement("style");
      e.setAttribute("scandit", "data-capture-sdk"), e.innerHTML = zi(), document.head.append(e);
    }
  }
  htmlElementDidChange() {
    let e = this.htmlElementState.toJSONObject();
    if (!fe.areEquivalentJSONStates(this.lastHtmlElementState, e)) {
      this.privateContext.update([{ type: "viewChange", newValue: this.htmlElementState.toJSONObject() }]), this.lastHtmlElementState = e, this.updateCanvasSizeAttributes(), this.handleVideoDisplay(e.visible);
      for (let t of this.listeners)
        t.didChangeSize && t.didChangeSize(this, new Ce(e.size.width.value, e.size.height.value), window.innerHeight < window.innerWidth ? "landscapeLeft" : "portrait");
    }
  }
  handleVideoDisplay(e) {
    !e && !this.isVideoElementDetached ? (this.videoElement.width = this.videoElement.height = 0, this.videoElement.style.opacity = "0", document.body.append(this.videoElement), this.isVideoElementDetached = true) : e && this.isVideoElementDetached && (this.cameraPaintboardElement.insertAdjacentElement("afterbegin", this.videoElement), this.isVideoElementDetached = false, this.videoElement.removeAttribute("width"), this.videoElement.removeAttribute("height"), this.videoElement.style.removeProperty("opacity"));
  }
  onWorkerMessage(e) {
    if (e.type === "draw")
      this.drawEngineCommands(e.payload);
    else if (e.type === "contextDidChangeStatus") {
      let t = oe.fromJSON(e.payload);
      t.isValid || this.displayError(t);
    }
  }
  drawEngineCommands(e) {
    this.canvasDrawer.draw(e);
  }
  displayError(e) {
    this.errorElement.textContent = `Error ${e.code}: ${e.message}`, this.errorElement.hidden = false;
  }
  clearError() {
    this.errorElement.textContent = "", this.errorElement.hidden = true;
  }
  get width() {
    return this.htmlElementState != null ? Math.round(this.htmlElementState.width) : 0;
  }
  get height() {
    return this.htmlElementState != null ? Math.round(this.htmlElementState.height) : 0;
  }
  get canvasDrawer() {
    return this._canvasDrawer || (this._canvasDrawer = new ke(this.canvasElement)), this._canvasDrawer;
  }
  get privateContext() {
    return this._context;
  }
  controlsUpdated() {
    this.redrawControls(), this.privateContext.update();
  }
  redrawControls() {
    var e;
    for (let t of this.controls) {
      let a = this.getControlWidget(t), o = (e = this._context) == null ? void 0 : e.frameSource;
      o == null || o.desiredState === "off" || o.desiredState === "stopping" ? a.remove() : a.install();
    }
  }
  getControlWidget(e) {
    let t = this.controlWidgets.get(e);
    if (t)
      return t;
    let { type: a } = e;
    switch (a) {
      case "torch": {
        let o = new lt(e, this.controlsElement);
        return this.controlWidgets.set(e, o), o;
      }
      case "camera": {
        let o = new le(e, this.controlsElement);
        return this.controlWidgets.set(e, o), o;
      }
    }
  }
  async onFrameSourceChange(e) {
    let t = e == null ? void 0 : e.type;
    if (this.setupHtmlElementVisibility(t), t === "camera")
      switch (e == null ? void 0 : e.getCurrentState()) {
        case "stopping":
          return;
        case "starting":
          if (!this.htmlElement) {
            g.log(g.Level.Error, "cannot set frame source stream before connecting view to an HTML element");
            return;
          }
          k.instance().videoElement = this.videoElement, k.instance().gui.isCameraRecoveryVisible = this.isCameraRecoveryVisible.bind(this), k.instance().gui.setCameraRecoveryVisible = this.setCameraRecoveryVisible.bind(this);
          return;
        case "off":
          this.redrawControls();
          return;
        case "on":
          await k.instance().waitForCapabilities(), this.redrawControls();
      }
    else
      t === "singleImageUploader" && this.setupHtmlElementSingleImageUploaderChildren(e.settings);
  }
  onSingleImageUploaderSettingsChange(e) {
    this.setupHtmlElementSingleImageUploaderChildren(e);
  }
  handleVideoPause() {
    k.instance().playVideo();
  }
  async checkAndRecoverPlayback() {
    var t;
    let e = this.videoElement.srcObject;
    if (document.visibilityState === "visible" && k.instance().activeCamera != null && this.videoElement.srcObject != null)
      if (!e.active || ((t = e.getVideoTracks()[0]) == null ? void 0 : t.muted))
        try {
          g.log(g.Level.Debug, 'Detected visibility change ("visible") event with inactive video source, try to reinitialize camera'), await k.instance().reinitializeCamera();
        } catch (a) {
        }
      else
        g.log(g.Level.Debug, 'Detected visibility change ("visible") event with active video source, replay video'), k.instance().playVideo();
  }
  async cameraRecovery(e) {
    e.preventDefault(), k.instance().activeCamera = k.instance().selectedCamera, await k.instance().reinitializeCamera();
  }
  updateCanvasSizeAttributes() {
    this.canvasElement.width = this.width, this.canvasElement.height = this.height;
  }
};
var O = $;
c(O, "CONTAINER_CLASS_NAME", ee.CONTAINER_CLASS_NAME), c(O, "PAINTBOARD_CLASS_NAME", ee.PAINTBOARD_CLASS_NAME), c(O, "CONTROLS_CLASS_NAME", ee.CONTROLS_CLASS_NAME), c(O, "CONTROL_WIDGET_CLASS_NAME", ee.CONTROL_WIDGET_CLASS_NAME), c(O, "MIRRORED_CLASS_NAME", ee.MIRRORED_CLASS_NAME), c(O, "CAMERA_RECOVERY_CLASS_NAME", ee.CAMERA_RECOVERY_CLASS_NAME), c(O, "ERROR_CLASS_NAME", ee.ERROR_CLASS_NAME), c(O, "SINGLE_IMAGE_UPLOADER_CONTAINER_CLASS_NAME", ee.SINGLE_IMAGE_UPLOADER_CONTAINER_CLASS_NAME);
var Fi = He(ji(), 1);
async function Er(l2, e) {
  let t = document.createElement("canvas");
  t.width = this.width, t.height = this.height;
  let a = t.getContext("2d");
  if (!a)
    throw new Error("Could not get 2d context from an HTMLCanvasElement");
  let o = await this.getData();
  return o == null ? null : (a.putImageData(new ImageData(o, this.width, this.height), 0, 0), new Promise((d, f2) => {
    t.toBlob((p) => {
      if (p === null) {
        f2(new Error("Could not create Blob object from canvas"));
        return;
      }
      d(p);
    }, l2, e);
  }));
}
function xo(l2, e) {
  let t = { width: l2.width, height: l2.height, isFrameSourceMirrored: l2.isFrameSourceMirrored, getData: async () => (await e.requestFrameData(l2.frameId)).data };
  return t.toBlob = Er.bind(t), t;
}
var Ui = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+SWNvbnMgLyBXaXRoIFNoYWRvdyAvIENsaWNrZWQgLyBDYW1lcmEgUm90YXRlIEJhY2s8L3RpdGxlPgogICAgPGRlZnM+CiAgICAgICAgPGZpbHRlciB4PSItMTA2LjMlIiB5PSItMTA2LjIlIiB3aWR0aD0iMzEyLjUlIiBoZWlnaHQ9IjMxMi41JSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBpZD0iZmlsdGVyLTEiPgogICAgICAgICAgICA8ZmVPZmZzZXQgZHg9IjAiIGR5PSIwIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIj48L2ZlT2Zmc2V0PgogICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSI0IiBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiPjwvZmVHYXVzc2lhbkJsdXI+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwLjEwNTg4MjM1MyAgIDAgMCAwIDAgMC4xMjU0OTAxOTYgICAwIDAgMCAwIDAuMTQ5MDE5NjA4ICAwIDAgMCAwLjMyIDAiIHR5cGU9Im1hdHJpeCIgaW49InNoYWRvd0JsdXJPdXRlcjEiIHJlc3VsdD0ic2hhZG93TWF0cml4T3V0ZXIxIj48L2ZlQ29sb3JNYXRyaXg+CiAgICAgICAgICAgIDxmZU1lcmdlPgogICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSJzaGFkb3dNYXRyaXhPdXRlcjEiPjwvZmVNZXJnZU5vZGU+CiAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49IlNvdXJjZUdyYXBoaWMiPjwvZmVNZXJnZU5vZGU+CiAgICAgICAgICAgIDwvZmVNZXJnZT4KICAgICAgICA8L2ZpbHRlcj4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJJY29ucy0vLVdpdGgtU2hhZG93LS8tQ2xpY2tlZC0vLUNhbWVyYS1Sb3RhdGUtQmFjayIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHJlY3QgaWQ9IkJnIiBmaWxsPSIjRkZGRkZGIiBvcGFjaXR5PSIwIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiPjwvcmVjdD4KICAgICAgICA8ZyBpZD0iY2FtZXJhLXJvdGF0ZSIgZmlsdGVyPSJ1cmwoI2ZpbHRlci0xKSIgb3BhY2l0eT0iMC42Mzk5OTk5ODYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLjAwMDAwMCwgMTIuMDAwMDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC0xMi4wMDAwMDAsIC0xMi4wMDAwMDApIHRyYW5zbGF0ZSg0LjAwMDAwMCwgNC4wMDAwMDApIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiI+CiAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iUGF0aCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjAwMDAwMCwgMTQuMDAwMDAwKSBzY2FsZSgxLCAtMSkgcm90YXRlKC0zNjAuMDAwMDAwKSB0cmFuc2xhdGUoLTQuMDAwMDAwLCAtMTQuMDAwMDAwKSAiIHBvaW50cz0iMyAxMiA1IDE0IDMgMTYiPjwvcG9seWxpbmU+CiAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwiIGN4PSI4IiBjeT0iOCIgcj0iMiI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04LDMgTDE0LDMgQzE1LjEwNDU2OTUsMyAxNiwzLjg5NTQzMDUgMTYsNSBMMTYsMTIgQzE2LDEzLjEwNDU2OTUgMTUuMTA0NTY5NSwxNCAxNCwxNCBMMTIsMTQgTDEyLDE0IiBpZD0iUGF0aC0yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLjAwMDAwMCwgOC41MDAwMDApIHNjYWxlKDEsIC0xKSB0cmFuc2xhdGUoLTEyLjAwMDAwMCwgLTguNTAwMDAwKSAiPjwvcGF0aD4KICAgICAgICAgICAgPHBvbHlsaW5lIGlkPSJQYXRoIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLjAwMDAwMCwgMy4wMDAwMDApIHJvdGF0ZSgtMTgwLjAwMDAwMCkgdHJhbnNsYXRlKC0xMi4wMDAwMDAsIC0zLjAwMDAwMCkgIiBwb2ludHM9IjExIDEgMTMgMyAxMSA1Ij48L3BvbHlsaW5lPgogICAgICAgICAgICA8cGF0aCBkPSJNNCwxNCBMMiwxNCBDMC44OTU0MzA1LDE0IDEuMzUyNzA3NWUtMTYsMTMuMTA0NTY5NSAwLDEyIEwwLDUgQy0xLjM1MjcwNzVlLTE2LDMuODk1NDMwNSAwLjg5NTQzMDUsMyAyLDMgTDIuNSwzIEMzLjMyODQyNzEyLDMgNCwyLjMyODQyNzEyIDQsMS41IEM0LDAuNjcxNTcyODc1IDQuNjcxNTcyODgsMS41MjE3OTU5NGUtMTYgNS41LDAgTDEwLDAgTDEwLDAiIGlkPSJQYXRoLTIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+";
var Ji = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+SWNvbnMgLyBXaXRoIFNoYWRvdyAvIE5vcm1hbCAvIENhbWVyYSBSb3RhdGUgQmFjazwvdGl0bGU+CiAgICA8ZGVmcz4KICAgICAgICA8ZmlsdGVyIHg9Ii0xMDYuMyUiIHk9Ii0xMDYuMiUiIHdpZHRoPSIzMTIuNSUiIGhlaWdodD0iMzEyLjUlIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIGlkPSJmaWx0ZXItMSI+CiAgICAgICAgICAgIDxmZU9mZnNldCBkeD0iMCIgZHk9IjAiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiPjwvZmVPZmZzZXQ+CiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjQiIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiIHJlc3VsdD0ic2hhZG93Qmx1ck91dGVyMSI+PC9mZUdhdXNzaWFuQmx1cj4KICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAuMTA1ODgyMzUzICAgMCAwIDAgMCAwLjEyNTQ5MDE5NiAgIDAgMCAwIDAgMC4xNDkwMTk2MDggIDAgMCAwIDAuMzIgMCIgdHlwZT0ibWF0cml4IiBpbj0ic2hhZG93Qmx1ck91dGVyMSIgcmVzdWx0PSJzaGFkb3dNYXRyaXhPdXRlcjEiPjwvZmVDb2xvck1hdHJpeD4KICAgICAgICAgICAgPGZlTWVyZ2U+CiAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49InNoYWRvd01hdHJpeE91dGVyMSI+PC9mZU1lcmdlTm9kZT4KICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyI+PC9mZU1lcmdlTm9kZT4KICAgICAgICAgICAgPC9mZU1lcmdlPgogICAgICAgIDwvZmlsdGVyPgogICAgPC9kZWZzPgogICAgPGcgaWQ9Ikljb25zLS8tV2l0aC1TaGFkb3ctLy1Ob3JtYWwtLy1DYW1lcmEtUm90YXRlLUJhY2siIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxyZWN0IGlkPSJCZyIgZmlsbD0iI0ZGRkZGRiIgb3BhY2l0eT0iMCIgeD0iMCIgeT0iMCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48L3JlY3Q+CiAgICAgICAgPGcgaWQ9ImNhbWVyYS1yb3RhdGUiIGZpbHRlcj0idXJsKCNmaWx0ZXItMSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLjAwMDAwMCwgMTIuMDAwMDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC0xMi4wMDAwMDAsIC0xMi4wMDAwMDApIHRyYW5zbGF0ZSg0LjAwMDAwMCwgNC4wMDAwMDApIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiI+CiAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iUGF0aCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjAwMDAwMCwgMTQuMDAwMDAwKSBzY2FsZSgxLCAtMSkgcm90YXRlKC0zNjAuMDAwMDAwKSB0cmFuc2xhdGUoLTQuMDAwMDAwLCAtMTQuMDAwMDAwKSAiIHBvaW50cz0iMyAxMiA1IDE0IDMgMTYiPjwvcG9seWxpbmU+CiAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwiIGN4PSI4IiBjeT0iOCIgcj0iMiI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04LDMgTDE0LDMgQzE1LjEwNDU2OTUsMyAxNiwzLjg5NTQzMDUgMTYsNSBMMTYsMTIgQzE2LDEzLjEwNDU2OTUgMTUuMTA0NTY5NSwxNCAxNCwxNCBMMTIsMTQgTDEyLDE0IiBpZD0iUGF0aC0yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLjAwMDAwMCwgOC41MDAwMDApIHNjYWxlKDEsIC0xKSB0cmFuc2xhdGUoLTEyLjAwMDAwMCwgLTguNTAwMDAwKSAiPjwvcGF0aD4KICAgICAgICAgICAgPHBvbHlsaW5lIGlkPSJQYXRoIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLjAwMDAwMCwgMy4wMDAwMDApIHJvdGF0ZSgtMTgwLjAwMDAwMCkgdHJhbnNsYXRlKC0xMi4wMDAwMDAsIC0zLjAwMDAwMCkgIiBwb2ludHM9IjExIDEgMTMgMyAxMSA1Ij48L3BvbHlsaW5lPgogICAgICAgICAgICA8cGF0aCBkPSJNNCwxNCBMMiwxNCBDMC44OTU0MzA1LDE0IDEuMzUyNzA3NWUtMTYsMTMuMTA0NTY5NSAwLDEyIEwwLDUgQy0xLjM1MjcwNzVlLTE2LDMuODk1NDMwNSAwLjg5NTQzMDUsMyAyLDMgTDIuNSwzIEMzLjMyODQyNzEyLDMgNCwyLjMyODQyNzEyIDQsMS41IEM0LDAuNjcxNTcyODc1IDQuNjcxNTcyODgsMS41MjE3OTU5NGUtMTYgNS41LDAgTDEwLDAgTDEwLDAiIGlkPSJQYXRoLTIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+";
var Bi = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiCiAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPGRlZnM+CiAgICAgICAgPGZpbHRlciB4PSItMTIxLjUlIiB5PSItODguOSUiIHdpZHRoPSIzNDMlIiBoZWlnaHQ9IjI3Ny44JSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBpZD0icHJlZml4X19hIj4KICAgICAgICAgICAgPGZlT2Zmc2V0IGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiLz4KICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iNCIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIi8+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwLjEwNTg4MjM1MyAwIDAgMCAwIDAuMTI1NDkwMTk2IDAgMCAwIDAgMC4xNDkwMTk2MDggMCAwIDAgMC4zMiAwIiBpbj0ic2hhZG93Qmx1ck91dGVyMSIgcmVzdWx0PSJzaGFkb3dNYXRyaXhPdXRlcjEiLz4KICAgICAgICAgICAgPGZlTWVyZ2U+CiAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49InNoYWRvd01hdHJpeE91dGVyMSIvPgogICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSJTb3VyY2VHcmFwaGljIi8+CiAgICAgICAgICAgIDwvZmVNZXJnZT4KICAgICAgICA8L2ZpbHRlcj4KICAgIDwvZGVmcz4KICAgIDxnIGZpbHRlcj0idXJsKCNwcmVmaXhfX2EpIiBvcGFjaXR5PSIuNjQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuNzQyIDMpIiBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgIDxwYXRoIGQ9Ik00LjIyMyAxNy45NDZhLjc1Ljc1IDAgMDEtLjQ1Ni0uODNMNS4xMDUgOS43NWgtMy42YS43NS43NSAwIDAxLS43MjctLjk0NmwxLjE4My00LjMzNUwuMjIgMi43MjhhLjc1Ljc1IDAgMTExLjA2LTEuMDYybDExLjY2OCAxMS42NjhhLjc1Ljc1IDAgMDEtMS4wNiAxLjA2TDkuMTQgMTEuNjQ2bC00LjAxMyA2LjAyYS43NS43NSAwIDAxLS45MDQuMjh6TTEwLjgzOCA5LjFMMi44NzIgMS4xMzVsLjE1OS0uNThBLjc1Ljc1IDAgMDEzLjc1NSAwaDUuMjVhLjc1Ljc1IDAgMDEuNzIyLjk1OUw4LjQ5OSA1LjI1aDMuNTA1YS43NS43NSAwIDAxLjYyNiAxLjE2N2wtMS43OSAyLjY4NGgtLjAwMnoiLz4KICAgIDwvZz4KPC9zdmc+";
var Hi = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiCiAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPGRlZnM+CiAgICAgICAgPGZpbHRlciB4PSItMTE0LjMlIiB5PSItODguOSUiIHdpZHRoPSIzMjguNiUiIGhlaWdodD0iMjc3LjglIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIGlkPSJwcmVmaXhfX2EiPgogICAgICAgICAgICA8ZmVPZmZzZXQgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSIvPgogICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSI0IiBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiLz4KICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAuMTA1ODgyMzUzIDAgMCAwIDAgMC4xMjU0OTAxOTYgMCAwIDAgMCAwLjE0OTAxOTYwOCAwIDAgMCAwLjMyIDAiIGluPSJzaGFkb3dCbHVyT3V0ZXIxIiByZXN1bHQ9InNoYWRvd01hdHJpeE91dGVyMSIvPgogICAgICAgICAgICA8ZmVNZXJnZT4KICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0ic2hhZG93TWF0cml4T3V0ZXIxIi8+CiAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49IlNvdXJjZUdyYXBoaWMiLz4KICAgICAgICAgICAgPC9mZU1lcmdlPgogICAgICAgIDwvZmlsdGVyPgogICAgPC9kZWZzPgogICAgPGcgZmlsdGVyPSJ1cmwoI3ByZWZpeF9fYSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMgMykiIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgPHBhdGggZD0iTTQuOTY2IDE3Ljk0NmEuNzUuNzUgMCAwMS0uNDU3LS44M0w1Ljg0OCA5Ljc1aC0zLjZhLjc1Ljc1IDAgMDEtLjcyNy0uOTQ2bDEuMTgyLTQuMzM1LTEuNzQtMS43NGEuNzUuNzUgMCAxMTEuMDYtMS4wNjJMMTMuNjkgMTMuMzM0YS43NS43NSAwIDAxLTEuMDYxIDEuMDZsLTIuNzQ4LTIuNzQ4LTQuMDEyIDYuMDJhLjc1Ljc1IDAgMDEtLjkwNC4yOHpNMTEuNTggOS4xTDMuNjE0IDEuMTM1bC4xNi0uNThBLjc1Ljc1IDAgMDE0LjQ5NiAwaDUuMjVhLjc1Ljc1IDAgMDEuNzIyLjk1OUw5LjI0MiA1LjI1aDMuNTA0YS43NS43NSAwIDAxLjYyNyAxLjE2N2wtMS43OSAyLjY4NGgtLjAwMnoiLz4KICAgIDwvZz4KPC9zdmc+";
var Gi = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiCiAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPGRlZnM+CiAgICAgICAgPGZpbHRlciB4PSItMTMzLjMlIiB5PSItODguOSUiIHdpZHRoPSIzNjYuNiUiIGhlaWdodD0iMjc3LjglIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIGlkPSJwcmVmaXhfX2EiPgogICAgICAgICAgICA8ZmVPZmZzZXQgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSIvPgogICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSI0IiBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiLz4KICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAuMTA1ODgyMzUzIDAgMCAwIDAgMC4xMjU0OTAxOTYgMCAwIDAgMCAwLjE0OTAxOTYwOCAwIDAgMCAwLjMyIDAiIGluPSJzaGFkb3dCbHVyT3V0ZXIxIiByZXN1bHQ9InNoYWRvd01hdHJpeE91dGVyMSIvPgogICAgICAgICAgICA8ZmVNZXJnZT4KICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0ic2hhZG93TWF0cml4T3V0ZXIxIi8+CiAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49IlNvdXJjZUdyYXBoaWMiLz4KICAgICAgICAgICAgPC9mZU1lcmdlPgogICAgICAgIDwvZmlsdGVyPgogICAgPC9kZWZzPgogICAgPGcgZmlsdGVyPSJ1cmwoI3ByZWZpeF9fYSkiIG9wYWNpdHk9Ii42NCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNC41IDMpIiBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgIDxwYXRoIGQ9Ik0xMS4yNSA1LjI1SDcuNzQ1TDguOTcyLjk1NkEuNzUuNzUgMCAwMDguMjUgMEgzYS43NS43NSAwIDAwLS43MjQuNTUzbC0yLjI1IDguMjVhLjc1Ljc1IDAgMDAuNzI0Ljk0N2gzLjZsLTEuMzM4IDcuMzY2YS43NS43NSAwIDAwMS4zNjMuNTVsNy41LTExLjI1YS43NS43NSAwIDAwLS42MjUtMS4xNjZ6Ii8+CiAgICA8L2c+Cjwvc3ZnPg==";
var Yi = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiCiAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPGRlZnM+CiAgICAgICAgPGZpbHRlciB4PSItMTMzLjMlIiB5PSItODguOSUiIHdpZHRoPSIzNjYuNiUiIGhlaWdodD0iMjc3LjglIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIGlkPSJwcmVmaXhfX2EiPgogICAgICAgICAgICA8ZmVPZmZzZXQgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSIvPgogICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSI0IiBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiLz4KICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAuMTA1ODgyMzUzIDAgMCAwIDAgMC4xMjU0OTAxOTYgMCAwIDAgMCAwLjE0OTAxOTYwOCAwIDAgMCAwLjMyIDAiIGluPSJzaGFkb3dCbHVyT3V0ZXIxIiByZXN1bHQ9InNoYWRvd01hdHJpeE91dGVyMSIvPgogICAgICAgICAgICA8ZmVNZXJnZT4KICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0ic2hhZG93TWF0cml4T3V0ZXIxIi8+CiAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49IlNvdXJjZUdyYXBoaWMiLz4KICAgICAgICAgICAgPC9mZU1lcmdlPgogICAgICAgIDwvZmlsdGVyPgogICAgPC9kZWZzPgogICAgPGcgZmlsdGVyPSJ1cmwoI3ByZWZpeF9fYSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuNSAzKSIgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICA8cGF0aCBkPSJNMTEuMjUgNS4yNUg3Ljc0NUw4Ljk3Mi45NTZBLjc1Ljc1IDAgMDA4LjI1IDBIM2EuNzUuNzUgMCAwMC0uNzI0LjU1M2wtMi4yNSA4LjI1YS43NS43NSAwIDAwLjcyNC45NDdoMy42bC0xLjMzOCA3LjM2NmEuNzUuNzUgMCAwMDEuMzYzLjU1bDcuNS0xMS4yNWEuNzUuNzUgMCAwMC0uNjI1LTEuMTY2eiIvPgogICAgPC9nPgo8L3N2Zz4=";
var Pe = class {
  constructor() {
    c(this, "type", "torch");
    c(this, "view", null);
    c(this, "icon", { on: { idle: Yi, pressed: Gi }, off: { idle: Hi, pressed: Bi } });
  }
  get torchOffImage() {
    return this.icon.off.idle;
  }
  set torchOffImage(e) {
    var t;
    this.icon.off.idle = e, (t = this.view) == null || t.controlsUpdated();
  }
  get torchOffPressedImage() {
    return this.icon.off.pressed;
  }
  set torchOffPressedImage(e) {
    var t;
    this.icon.off.pressed = e, (t = this.view) == null || t.controlsUpdated();
  }
  get torchOnImage() {
    return this.icon.on.idle;
  }
  set torchOnImage(e) {
    var t;
    this.icon.on.idle = e, (t = this.view) == null || t.controlsUpdated();
  }
  get torchOnPressedImage() {
    return this.icon.on.pressed;
  }
  set torchOnPressedImage(e) {
    var t;
    this.icon.on.pressed = e, (t = this.view) == null || t.controlsUpdated();
  }
  toJSONObject() {
    return { type: this.type };
  }
};
c(Pe, "CLASS_NAME", "torch");
var ze = class {
  constructor() {
    c(this, "type", "camera");
    c(this, "view", null);
    c(this, "icon", { idle: Ji, pressed: Ui });
  }
  get idleImage() {
    return this.icon.idle;
  }
  set idleImage(e) {
    var t;
    this.icon.idle = e, (t = this.view) == null || t.controlsUpdated();
  }
  get pressedImage() {
    return this.icon.pressed;
  }
  set pressedImage(e) {
    var t;
    this.icon.pressed = e, (t = this.view) == null || t.controlsUpdated();
  }
  toJSONObject() {
    return { type: this.type };
  }
};
c(ze, "CLASS_NAME", "camera");
var mt = class {
  constructor(e = x.Brush.fillColor, t = x.Brush.strokeColor, a = x.Brush.strokeWidth) {
    c(this, "fill");
    c(this, "stroke");
    this.fill = { color: e }, this.stroke = { color: t, width: a };
  }
  static get transparent() {
    let e = W.fromRGBA(255, 255, 255, 0);
    return new mt(e, e, 0);
  }
  get fillColor() {
    return this.fill.color;
  }
  get strokeColor() {
    return this.stroke.color;
  }
  get strokeWidth() {
    return this.stroke.width;
  }
  toJSONObject() {
    return { fill: { color: this.fillColor.toJSON() }, stroke: { width: this.strokeWidth, color: this.strokeColor.toJSON() } };
  }
};
function $i(l2, e, t, a) {
  async function o(S2) {
    try {
      let r = await (S2 != null ? S2 : await v2(true)).arrayBuffer(), n2 = await self.WebAssembly.instantiate(r, l2);
      a(n2.instance, n2.module);
    } catch (i) {
      g.log(g.Level.Error, i), g.log(g.Level.Error, `Couldn't instantiate Scandit SDK DataCapture library at ${e}, did you configure the path for it correctly?`);
    }
  }
  async function d() {
    let S2 = await v2(false);
    try {
      let i = await self.WebAssembly.instantiateStreaming(S2, l2);
      a(i.instance, i.module);
    } catch (i) {
      return g.log(g.Level.Warn, i), g.log(g.Level.Warn, "WebAssembly streaming compile failed. Falling back to ArrayBuffer instantiation (this will make things slower)"), o(S2.bodyUsed ? void 0 : S2);
    }
  }
  function f2(S2) {
    return [...new Uint8Array(S2)].map((i) => {
      let r = i.toString(16);
      return r.length === 1 ? `0${r}` : r;
    }).join("");
  }
  function p(S2) {
    typeof crypto.subtle.digest == "function" ? crypto.subtle.digest("SHA-256", S2).then((i) => {
      let r = f2(i);
      t || g.log(g.Level.Warn, "The library hash is not defined or empty, cannot correctly verify integrity."), r !== t && g.log(g.Level.Warn, `The Scandit Data Capture library WASM file found at ${e} seems invalid: expected file hash doesn't match (received: ${r}, expected: ${t}). Please ensure the correct Scandit Data Capture file (with correct version) is retrieved.`);
    }).catch(() => {
    }) : g.log(g.Level.Warn, `Insecure context (see https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts): The hash of the Scandit Data Capture library WASM file found at ${e} could not be verified`);
  }
  async function v2(S2) {
    return new Promise((i, r) => {
      fetch(e).then((n2) => {
        n2.ok ? (n2.clone().arrayBuffer().then((s2) => {
          S2 && i(n2), p(s2);
        }).catch((s2) => {
          S2 && r(s2);
        }), S2 || i(n2)) : r(new Error("HTTP status code is not ok"));
      }).catch((n2) => {
        r(n2);
      });
    });
  }
  typeof self.WebAssembly.instantiateStreaming == "function" ? d() : o();
}
async function Xi(l2) {
  let e, { preloading: t } = l2, a = Promise.resolve(), o = false, d = false;
  async function f2() {
    let S2 = "FILE_DATA", i, r, n2;
    function s2() {
      r.result.close(), n2.result.close(), i(0);
    }
    function u() {
      try {
        let h2 = [], m2 = r.result.transaction(S2, "readonly");
        m2.onerror = s2;
        let b2 = m2.objectStore(S2).openCursor();
        b2.onsuccess = () => {
          let C2 = b2.result;
          if (C2 == null)
            try {
              let _2 = 0, j2 = n2.result.transaction(S2, "readwrite"), B2 = j2.objectStore(S2);
              j2.onerror = s2, j2.oncomplete = () => {
                r.result.close(), n2.result.close(), i(_2);
              };
              for (let D2 of h2) {
                let y2 = B2.count(D2.primaryKey);
                y2.onsuccess = () => {
                  y2.result === 0 && (++_2, B2.add(D2.value, D2.primaryKey));
                };
              }
            } catch (_2) {
              s2.call({ error: _2 });
            }
          else
            h2.push({ value: C2.value, primaryKey: C2.primaryKey.toString().replace(`${l2.writableDataPathPreload}/`, `${l2.writableDataPathStandard}/`) }), C2.continue();
        }, b2.onerror = s2;
      } catch (h2) {
        s2.call({ error: h2 });
      }
    }
    return new Promise((h2) => {
      i = h2, r = indexedDB.open(l2.writableDataPathPreload), r.onupgradeneeded = () => {
        try {
          r.result.createObjectStore(S2);
        } catch (m2) {
        }
      }, r.onsuccess = () => {
        if (!Array.from(r.result.objectStoreNames).includes(S2)) {
          h2(0);
          return;
        }
        n2 = indexedDB.open(l2.writableDataPathStandard), n2.onupgradeneeded = () => {
          try {
            n2.result.createObjectStore(S2);
          } catch (m2) {
          }
        }, n2.onsuccess = () => {
          u();
        }, n2.onblocked = n2.onerror = s2;
      }, r.onblocked = r.onerror = s2;
    });
  }
  async function p(S2, i) {
    if (e != null)
      return o = true, new Promise((r, n2) => {
        (!t && S2 ? f2() : Promise.resolve(0)).then((s2) => {
          if (!t && S2 && !i && s2 === 0) {
            o = false, r();
            return;
          }
          e(S2, (u) => {
            if (o = false, u != null) {
              n2(u);
              return;
            }
            r();
          });
        }).catch(n2);
      });
  }
  async function v2(S2, i = false, r = false) {
    return (!d || r) && (o ? (d = true, a = a.then(async () => (d = false, p(S2, i)))) : a = p(S2, i)), a;
  }
  e = FS.syncfs, FS.syncfs = (S2, i) => {
    let r = i;
    i = (n2) => {
      r(n2);
    }, v2(S2).then(i).catch(i);
  };
  try {
    FS.mkdir(l2.writableDataPath);
  } catch (S2) {
    if (S2.code !== "EEXIST")
      return e = void 0, Promise.reject(S2);
  }
  return FS.mount(IDBFS, {}, l2.writableDataPath), v2(true, true);
}
async function Yt(l2, e, t, a) {
  return new Promise((o, d) => {
    l2().then(o).catch((f2) => {
      let p = e * 2;
      if (p > t) {
        d(f2);
        return;
      }
      a(f2), setTimeout(() => {
        Yt(l2, p, t, a).then(o).catch(d);
      }, e);
    });
  });
}
var pt = class {
  constructor(e, t) {
    this.moduleHandler = e;
    this.workerFunctions = t;
    c(this, "lastUsedModuleMirrorAxis");
    c(this, "MAX_NUMBER_OF_IMAGES_IN_FRAME_DATA_POOL", 10);
    c(this, "libraryLoadingPromise");
    c(this, "writableDataPath");
    c(this, "resourcePath");
    c(this, "_isDrawLoopRunning", false);
    c(this, "redrawInterval", 1e3 / 30);
    c(this, "redrawRequests", []);
    c(this, "loopTimeoutId");
    c(this, "context");
    c(this, "contextDeserializer");
    c(this, "imageFrameSource");
    c(this, "view");
    c(this, "lastFrameCounter", -1);
    c(this, "frameDataPool", /* @__PURE__ */ new Map());
  }
  get Module() {
    return this.moduleHandler.get();
  }
  loadLibrary(e) {
    return this.libraryLoadingPromise != null ? this.libraryLoadingPromise : (this.libraryLoadingPromise = this.setup(e.libraryLocation, e.locationPath, e.preloadEngine), this.libraryLoadingPromise);
  }
  createContext(e) {
    let t = this.getModeDeserializers();
    this.contextDeserializer = new this.Module.DataCaptureContextDeserializer(this.writableDataPath, e.deviceId, e.context.deviceName, e.domain, t, e.delayedRegistration, e.highEndBlurryRecognition, this.resourcePath);
    let a = this.contextDeserializer.contextFromJson(JSON.stringify(e.context)), o = a.getView();
    this.context = a.getContext();
    let d = this.Module.DataCaptureContextListener.extend("DataCaptureContextListener", { didChangeStatus: (p, v2) => {
      this.contextDidChangeStatus(JSON.parse(v2.toJson()));
    }, didStartObservingContext: () => {
      this.didStartObservingContext();
    } }), f2 = new d();
    this.context.addListener(f2), f2.delete(), this.setView(o);
  }
  getModeDeserializers() {
    return new this.Module.VectorDataCaptureModeDeserializer();
  }
  setFrameSource(e) {
    var t;
    this.lastUsedModuleMirrorAxis = this.mapMirrorAxisOnModule(e), (t = this.imageFrameSource) == null || t.delete(), this.imageFrameSource = new this.Module.ImageBufferFrameSource(this.lastUsedModuleMirrorAxis), this.context.setFrameSource(this.imageFrameSource);
  }
  processFrame(e) {
    var o;
    if (this.context == null)
      return { payload: e, transferables: [e.data.buffer] };
    let t = e.data, a = this.Module.allocateUint8Array(t.byteLength);
    return this.Module.HEAPU8.set(t, a), (o = this.imageFrameSource) == null || o.outputFrame(a, e.width, e.height, this.Module.ImageBufferFormat.Rgba8888), { payload: e, transferables: [e.data.buffer] };
  }
  updateContext(e) {
    if (this.context != null && this.contextDeserializer != null) {
      let t = this.contextDeserializer.updateContextFromJson(this.context, this.view, JSON.stringify(e.context));
      this.context = t.getContext();
      let a = t.getView();
      a != null && e.view != null && a.setViewSize(e.view.width, e.view.height), this.setView(a), g.log(g.Level.Debug, "context updated", e);
    }
  }
  reportCameraProperties(e) {
    this.context.setCameraProperties(e.deviceId, e.isFrontFacing, e.hasAutofocus);
  }
  dispose() {
    this.context.dispose();
  }
  extractCentaurusLicense(e) {
    return { payload: { centaurus: { licenseKey: this.Module.LicenseUtils.getBlinkIdLicenseKey(e) } } };
  }
  convertToLoadableFrameData(e) {
    let t = this.getNextFrameId();
    this.frameDataPool.set(t, new Uint8ClampedArray(e.getFrameData()));
    let a = this.lastUsedModuleMirrorAxis != null ? this.lastUsedModuleMirrorAxis !== this.Module.Axis.None : false;
    return { frameId: t, width: e.getWidth(), height: e.getHeight(), isFrameSourceMirrored: a };
  }
  requestFrameData(e) {
    let t = this.frameDataPool.get(e);
    return t == null ? { payload: { data: null } } : { payload: { data: t }, transferables: [t.buffer] };
  }
  deleteFrameData(e) {
    this.frameDataPool.delete(e);
  }
  getNextFrameId() {
    return this.lastFrameCounter++, this.lastFrameCounter >= this.MAX_NUMBER_OF_IMAGES_IN_FRAME_DATA_POOL && (this.lastFrameCounter = 0), this.lastFrameCounter;
  }
  setView(e) {
    this.view = e, this.setViewRefreshHandler(e), e == null && (this.isDrawLoopRunning = false, this.sendViewRefreshCommands([]));
  }
  contextDidChangeStatus(e) {
    this.workerFunctions.postMessage({ type: "contextDidChangeStatus", payload: e });
  }
  didStartObservingContext() {
    this.workerFunctions.postMessage({ type: "didStartObservingContext" });
  }
  setViewRefreshHandler(e) {
    if (e == null || e.isViewRefreshHandlerSet)
      return;
    let t = this.Module.NeedsRedrawDelegate.extend("NeedsRedrawDelegate", { setNeedsRedrawIn: this.scheduleRedraw.bind(this, e) }), a = new t();
    e.setNeedsRedrawDelegate(a), e.isViewRefreshHandlerSet = true;
  }
  scheduleRedraw(e, t) {
    this.addRedrawRequest(t), this.isDrawLoopRunning || this.startDrawLoop(e);
  }
  get isDrawLoopRunning() {
    return this._isDrawLoopRunning;
  }
  set isDrawLoopRunning(e) {
    this._isDrawLoopRunning = e, !e && typeof this.loopTimeoutId == "number" && (clearTimeout(this.loopTimeoutId), this.loopTimeoutId = void 0);
  }
  addRedrawRequest(e) {
    this.redrawRequests.push(Math.round(performance.now()) + e), this.redrawRequests.sort((t, a) => t - a);
  }
  startDrawLoop(e) {
    this.isDrawLoopRunning = true;
    let t = (d) => this.redrawRequests.length > 0 && this.redrawRequests[0] <= d, a = (d) => {
      for (; this.redrawRequests.length > 0 && this.redrawRequests[0] <= d; )
        this.redrawRequests.shift();
    }, o = () => {
      this.loopTimeoutId = setTimeout(() => {
        if (!this.isDrawLoopRunning)
          return;
        let d = performance.now();
        t(d) && (a(d), e.draw(), this.sendViewRefreshCommands(JSON.parse(e.getDrawCommands()))), o();
      }, this.redrawInterval);
    };
    o();
  }
  sendViewRefreshCommands(e) {
    this.workerFunctions.postMessage({ type: "draw", payload: e });
  }
  getWasmDynamicLibraries(e) {
    return this.getWasmSideModuleFileName() == null ? [] : [`${e.replace(/[^/]+\.wasm(\?.+)?/, "")}${this.getWasmSideModuleFileName()}`];
  }
  getWasmCoreExpectedHash() {
    return "";
  }
  getWasmCoreFileName() {
    return "";
  }
  getWasmSideModuleFileName() {
    return "";
  }
  async setup(e, t, a) {
    var B2;
    let o = false, d = false, f2 = "/scandit_sync_folder_preload", p = "/scandit_sync_folder", v2 = "resources";
    this.writableDataPath = a ? f2 : p, this.resourcePath = `${e}${v2}/`, self.path = t;
    let S2, i, r = new Promise((D2, y2) => {
      S2 = D2, i = y2;
    }), n2 = () => {
      d && o && (s2.apply(this), this.moduleHandler.get().callMain(), S2());
    };
    function s2() {
      let D2 = this.moduleHandler.get(), y2 = D2.DataDecoding.extend("DataDecoding", { decode(M2, w2) {
        try {
          let I2 = JSON.parse(w2), E = [];
          for (let L2 of I2) {
            let z2 = new TextDecoder(L2.ianaName, { fatal: true });
            E.push(z2.decode(M2.slice(L2.startIndex, L2.endIndex)));
          }
          return E.join("");
        } catch (I2) {
          return "";
        }
      } }), A = new y2();
      D2.setDataDecoding(A);
    }
    let u = Xe.sdkVersion();
    if (u === "")
      throw new J({ name: "Invalid library version", message: "Library version is not defined or empty, cannot generate proper path to library files." });
    let h2 = false, m2 = ui(u, e, this.getWasmCoreFileName(), h2), { jsURI: b2 } = m2, { wasmURI: C2 } = m2;
    this.moduleHandler.set({ canvas: (B2 = this.workerFunctions.getOffscreenCanvas()) != null ? B2 : { getContext: () => null }, instantiateWasm: (D2, y2) => ($i(D2, C2, this.getWasmCoreExpectedHash(), y2), {}), dynamicLibraries: this.getWasmDynamicLibraries(C2), noInitialRun: true, preRun: [async () => {
      try {
        await Xi({ writableDataPathPreload: f2, writableDataPathStandard: p, writableDataPath: this.writableDataPath, preloading: a });
      } catch (D2) {
        g.log(g.Level.Debug, "No IndexedDB support, some data will not be persisted:", D2);
      }
      d = true, n2();
    }], onRuntimeInitialized: () => {
      o = true, n2();
    } });
    async function _2(D2) {
      var A;
      async function y2() {
        return importScripts(D2);
      }
      try {
        await Yt(y2, 250, 4e3, (w2) => {
          g.log(g.Level.Warn, w2), g.log(g.Level.Warn, `Couldn't retrieve Scandit Data Capture library at ${D2}, retrying...`);
        });
        let M2 = (A = self.SDC_WASM_JS_VERSION) != null ? A : "undefined";
        return M2 !== u && g.log(g.Level.Warn, `The Scandit Data Capture library JS file found at ${D2} seems invalid: expected version doesn't match (received: ${M2}, expected: ${u}). Please ensure the correct Scandit Data Capture file (with correct version) is retrieved.`), true;
      } catch (M2) {
        return g.log(g.Level.Error, M2), false;
      }
    }
    return await _2(b2) || i(`Couldn't retrieve Scandit Data Capture library at ${b2}, did you configure the path for it correctly?`), r;
  }
  mapMirrorAxisOnModule(e) {
    switch (e) {
      case "None":
        return this.Module.Axis.None;
      case "X":
        return this.Module.Axis.X;
      case "Y":
        return this.Module.Axis.Y;
      default:
        return this.Module.Axis.None;
    }
  }
};
var zr = "js/worker.js";
var Ki = zr;
var ht = class {
  constructor(e, t) {
    c(this, "dataCaptureInstance");
    c(this, "workerSelf");
    this.workerSelf = e, this.dataCaptureInstance = new pt(t, { postMessage: this.postMessage.bind(this), getOffscreenCanvas: this.getOffscreenCanvas.bind(this) }), this.listenToMessages();
  }
  listenToMessages() {
    this.workerSelf.onmessage = this.onMessage.bind(this);
  }
  postMessage(e, t) {
    this.workerSelf.postMessage(e, t != null ? t : []);
  }
  getOffscreenCanvas() {
    if (typeof this.workerSelf.OffscreenCanvas == "function")
      return new this.workerSelf.OffscreenCanvas(32, 32);
  }
  hasPayload(e) {
    return e !== null && typeof e == "object" && "payload" in e;
  }
  hasTransferables(e) {
    return e !== null && typeof e == "object" && "transferables" in e && Array.isArray(e.transferables);
  }
  async respondWith(e, t, a) {
    let o = null, d;
    try {
      d = a(), d instanceof Promise && (d = await d);
    } catch (p) {
      d = void 0, o = typeof p.toString == "function" ? p.toString() : "unknow error";
    }
    let f2 = { type: "workerTaskId", command: e, id: t, payload: this.hasPayload(d) ? d.payload : void 0 };
    o != null && (f2.error = o), this.postMessage(f2, this.hasTransferables(d) ? d.transferables : []);
  }
  onMessage(e) {
    switch (e.data.command) {
      case "loadLibrary":
        {
          let { data: t } = e;
          this.respondWith(e.data.command, t.id, () => this.dataCaptureInstance.loadLibrary({ libraryLocation: t.libraryLocation, locationPath: t.locationPath, preloadEngine: t.preloadEngine }));
        }
        break;
      case "createContext":
        {
          let { data: t } = e;
          this.respondWith(e.data.command, t.id, () => this.dataCaptureInstance.createContext({ context: t.context, deviceId: t.deviceId, domain: t.domain, delayedRegistration: t.delayedRegistration, highEndBlurryRecognition: t.highEndBlurryRecognition }));
        }
        break;
      case "setFrameSource":
        {
          let { data: t } = e;
          this.respondWith(e.data.command, t.id, () => this.dataCaptureInstance.setFrameSource(t.mirrorAxis));
        }
        break;
      case "processFrame": {
        let { data: t } = e;
        this.respondWith(t.command, t.id, () => this.dataCaptureInstance.processFrame({ data: t.data, width: t.width, height: t.height }));
        break;
      }
      case "requestFrameData": {
        let { data: t } = e;
        this.respondWith(t.command, t.id, () => this.dataCaptureInstance.requestFrameData(t.frameId));
        break;
      }
      case "deleteFrameData": {
        let { data: t } = e;
        this.respondWith(t.command, t.id, () => {
          this.dataCaptureInstance.deleteFrameData(t.frameId);
        });
        break;
      }
      case "updateContext":
        {
          let { data: t } = e;
          this.respondWith(e.data.command, t.id, () => this.dataCaptureInstance.updateContext(t));
        }
        break;
      case "dispose":
        this.dataCaptureInstance.dispose();
        break;
      case "reportCameraProperties":
        this.dataCaptureInstance.reportCameraProperties(e.data);
        break;
      case "setLogLevel":
        g.setLevel(e.data.level);
        break;
      case "extractCentaurusLicense":
        {
          let { data: t } = e;
          this.respondWith(e.data.command, t.id, () => this.dataCaptureInstance.extractCentaurusLicense(t.licenseKey));
        }
        break;
      default:
        return ot(e.data), false;
    }
    return true;
  }
};
var us = new ht(self, { get: () => self.Module, set: (l2) => {
  self.Module = l2;
} });
var er = class {
  constructor(e, t) {
    c(this, "_dataCaptureWorker");
    c(this, "libraryLocation");
    c(this, "isPreloadEngine");
    c(this, "workerCommandId", 1);
    c(this, "workerTasks", /* @__PURE__ */ new Map());
    c(this, "workerListeners", []);
    c(this, "workerMessageListener");
    this.libraryLocation = e, this.isPreloadEngine = t, this.workerMessageListener = this.onWorkerMessage.bind(this), this.dataCaptureWorker.addEventListener("message", this.workerMessageListener);
  }
  static async create(e) {
    var a, o;
    let t = new this(e.libraryLocation, (a = e.preloadEngine) != null ? a : false);
    return await t.workerCommand("setLogLevel", { level: (o = e.logLevel) != null ? o : g.Level.Debug }), await t.load(), t;
  }
  async load() {
    return this.workerCommand("loadLibrary", { libraryLocation: this.libraryLocation, locationPath: window.location.pathname, preloadEngine: this.isPreloadEngine });
  }
  async workerCommand(e, t, a) {
    return new Promise((o, d) => {
      let f2 = this.workerCommandId++;
      this.workerTasks.set(f2, { resolve: o, reject: d });
      let p = Z(Q({}, t), { command: e, id: f2 });
      this.dataCaptureWorker.postMessage(p, a);
    });
  }
  get dataCaptureWorker() {
    var e;
    return this._dataCaptureWorker = (e = this._dataCaptureWorker) != null ? e : new Worker(Ki), this._dataCaptureWorker;
  }
  async terminateDataCaptureWorker() {
    var e, t;
    await this.workerCommand("dispose", {}), (e = this._dataCaptureWorker) == null || e.removeEventListener("message", this.workerMessageListener), (t = this._dataCaptureWorker) == null || t.terminate(), this._dataCaptureWorker = void 0;
  }
  addWorkerListener(e) {
    this.workerListeners.push(e);
  }
  removeWorkerListener(e) {
    !this.workerListeners.includes(e) || this.workerListeners.splice(this.workerListeners.indexOf(e), 1);
  }
  onWorkerMessage(e) {
    let t = e.data;
    if (t.type === "workerTaskId" && typeof t.id == "number") {
      let { id: a } = t, o = this.workerTasks.get(a);
      t.error != null ? o == null || o.reject(t) : o == null || o.resolve(t.payload), this.workerTasks.delete(a);
    } else
      for (let a of this.workerListeners)
        a(t);
  }
};
var ft = "unconfigured";
var gt;
var kt;
var $e;
async function Cs(l2) {
  var a, o;
  if (ft !== "unconfigured" && gt != null)
    return gt;
  let e = Z(Q({}, l2), { libraryLocation: ci((a = l2.libraryLocation) != null ? a : "/"), logLevel: (o = l2.logLevel) != null ? o : g.Level.Debug });
  kt = e.licenseKey, g.setLevel(e.logLevel);
  async function t() {
    if (ft = "started", e.licenseKey == null || e.licenseKey.trim().length < 64)
      throw new J({ name: "NoLicenseKeyError", message: "No license key provided" });
    let d = G.checkBrowserCompatibility();
    if (!d.fullSupport && !d.scannerSupport)
      throw new ue(d);
    if (e.moduleLoaders.length !== 1)
      throw new J({ name: "InvalidModuleLoader", message: `Exactly one module loader must be passed to configure(). ${e.moduleLoaders.length} received.` });
    let [f2] = e.moduleLoaders;
    $e = await f2.load(e), ft = "done";
  }
  return gt = t().catch((d) => {
    throw jr(), d;
  }), gt;
}
function jr() {
  ft = "unconfigured";
}
var export_UAParser = mr.default;

// ../../scandit-web-datacapture-id/build/js/index.js
var U0 = Object.defineProperty;
var v0 = Object.defineProperties;
var P0 = Object.getOwnPropertyDescriptors;
var q1 = Object.getOwnPropertySymbols;
var F0 = Object.prototype.hasOwnProperty;
var w0 = Object.prototype.propertyIsEnumerable;
var J1 = (e, t, i) => t in e ? U0(e, t, { enumerable: true, configurable: true, writable: true, value: i }) : e[t] = i;
var h = (e, t) => {
  for (var i in t || (t = {}))
    F0.call(t, i) && J1(e, i, t[i]);
  if (q1)
    for (var i of q1(t))
      w0.call(t, i) && J1(e, i, t[i]);
  return e;
};
var O2 = (e, t) => v0(e, P0(t));
var n = (e, t, i) => (J1(e, typeof t != "symbol" ? t + "" : t, i), i);
function l1(e, t, i, r) {
  function a(o) {
    return o instanceof i ? o : new i(function(d) {
      d(o);
    });
  }
  return new (i || (i = Promise))(function(o, d) {
    function R2(N) {
      try {
        U2(r.next(N));
      } catch (E) {
        d(E);
      }
    }
    function A(N) {
      try {
        U2(r.throw(N));
      } catch (E) {
        d(E);
      }
    }
    function U2(N) {
      N.done ? o(N.value) : a(N.value).then(R2, A);
    }
    U2((r = r.apply(e, t || [])).next());
  });
}
var B1 = 0;
function k0() {
  let e = B1;
  return B1 = B1 + 1, e;
}
var m = class {
  constructor(t) {
    this.action = t, this.messageID = k0();
  }
};
var V = class extends m {
  constructor(t, i) {
    super(V.action), this.wasmModuleName = t.wasmModuleName, this.licenseKey = t.licenseKey, this.userId = i, this.registerLoadCallback = t.loadProgressCallback !== null, this.allowHelloMessage = t.allowHelloMessage, this.engineLocation = t.engineLocation, this.wasmType = t.wasmType, this.numberOfWorkers = t.numberOfWorkers;
  }
};
V.action = "init";
var j;
(function(e) {
  e[e.Any = 0] = "Any", e[e.Recognizer = 1] = "Recognizer", e[e.RecognizerSettings = 2] = "RecognizerSettings", e[e.Callback = 3] = "Callback";
})(j || (j = {}));
var z = class extends m {
  constructor(t, i) {
    super(z.action), this.className = t, this.params = i;
  }
};
z.action = "createNewNativeObject";
var K2 = class extends m {
  constructor(t, i, r) {
    super(K2.action), this.recognizerHandles = t, this.allowMultipleResults = i, this.registeredMetadataCallbacks = r;
  }
};
K2.action = "createRecognizerRunner";
var x2 = class extends m {
  constructor(t, i) {
    super(x2.action), this.recognizerHandles = t, this.allowMultipleResults = i;
  }
};
x2.action = "reconfigureRecognizerRunner";
var H = class extends m {
  constructor() {
    super(H.action);
  }
};
H.action = "deleteRecognizerRunner";
var M = class extends m {
  constructor(t, i, r) {
    super(M.action), this.objectHandle = t, this.methodName = i, this.params = r;
  }
};
M.action = "invokeObject";
var Z2 = class extends m {
  constructor(t) {
    super(Z2.action), this.frame = t;
  }
  getTransferrables() {
    return [this.frame.imageData.data.buffer];
  }
};
Z2.action = "processImage";
var Y2 = class extends m {
  constructor(t) {
    super(Y2.action), this.hardReset = t;
  }
};
Y2.action = "resetRecognizers";
var W1 = class {
  constructor() {
    this.onDebugText = false, this.onDetectionFailed = false, this.onQuadDetection = false, this.onPointsDetection = false, this.onFirstSideResult = false, this.onGlare = false;
  }
};
var Q2 = class extends m {
  constructor(t) {
    super(Q2.action), this.registeredMetadataCallbacks = t;
  }
};
Q2.action = "registerMetadataCallbacks";
var X = class extends m {
  constructor(t) {
    super(X.action), this.detectionOnlyMode = t;
  }
};
X.action = "setDetectionOnly";
var q2 = class extends m {
  constructor(t) {
    super(q2.action), this.callbackNonEmpty = t;
  }
};
q2.action = "setClearTimeoutCallback";
var $2 = class extends m {
  constructor(t) {
    super($2.action), this.cameraPreviewMirrored = t;
  }
};
$2.action = "setCameraPreviewMirrored";
var y = class extends m {
  constructor(t) {
    super(y.action), this.userId = t;
  }
};
y.action = "getProductIntegrationInfo";
var g2;
(function(e) {
  e[e.onDebugText = 0] = "onDebugText", e[e.onDetectionFailed = 1] = "onDetectionFailed", e[e.onQuadDetection = 2] = "onQuadDetection", e[e.onPointsDetection = 3] = "onPointsDetection", e[e.onFirstSideResult = 4] = "onFirstSideResult", e[e.clearTimeoutCallback = 5] = "clearTimeoutCallback", e[e.onGlare = 6] = "onGlare", e[e.recognizerCallback = 7] = "recognizerCallback";
})(g2 || (g2 = {}));
var V1;
(function(e) {
  e.Basic = "BASIC", e.Advanced = "ADVANCED", e.AdvancedWithThreads = "ADVANCED_WITH_THREADS";
})(V1 || (V1 = {}));
var G0 = "BlinkIDWasmSDK";
function T(e, t) {
  return (i) => {
    let r = i;
    r.success ? e() : t(r.error);
  };
}
function J2(e, t) {
  return (i) => {
    let r = i;
    r.success ? e(i) : t(r.error);
  };
}
function J0(e) {
  let t = [];
  for (let i of e) {
    let r = j.Any;
    i instanceof C1 && (r = j.Recognizer, i = i.getRemoteObjectHandle()), t.push({ parameter: i, type: r });
  }
  return t;
}
var C1 = class {
  constructor(t, i, r) {
    this.wasmSDKWorker = t, this.objectHandle = r, this.recognizerName = i, this.callbacks = /* @__PURE__ */ new Map();
  }
  getRemoteObjectHandle() {
    return this.objectHandle;
  }
  currentSettings() {
    return new Promise((t, i) => {
      if (this.objectHandle < 0) {
        i("Invalid object handle: " + this.objectHandle.toString());
        return;
      }
      let r = new M(this.objectHandle, "currentSettings", []), a = J2((o) => {
        t(o.result);
      }, i);
      this.wasmSDKWorker.postMessage(r, a);
    });
  }
  toSignedJSON() {
    return new Promise((t, i) => {
      if (this.objectHandle < 0) {
        i("Invalid object handle: " + this.objectHandle.toString());
        return;
      }
      let r = new M(this.objectHandle, "toSignedJSON", []), a = J2((o) => {
        t(o.result);
      }, i);
      this.wasmSDKWorker.postMessage(r, a);
    });
  }
  clearAllCallbacks() {
    this.callbacks.clear(), this.wasmSDKWorker.unregisterRecognizerCallbacks(this.objectHandle);
  }
  removeFunctions(t) {
    this.clearAllCallbacks();
    let i = Object.keys(t), r = false;
    for (let a of i) {
      let o = t[a];
      if (typeof o == "function") {
        this.callbacks.set(a, o);
        let d = { parameter: { recognizerHandle: this.objectHandle, callbackName: a }, type: j.Callback };
        t[a] = d, r = true;
      }
    }
    return r && this.wasmSDKWorker.registerRecognizerCallbacks(this.objectHandle, this), t;
  }
  updateSettings(t) {
    return new Promise((i, r) => {
      if (this.objectHandle < 0) {
        r("Invalid object handle: " + this.objectHandle.toString());
        return;
      }
      let a = new M(this.objectHandle, "updateSettings", [{ parameter: this.removeFunctions(t), type: j.RecognizerSettings }]), o = T(i, r);
      this.wasmSDKWorker.postMessage(a, o);
    });
  }
  invokeCallback(t, i) {
    let r = this.callbacks.get(t);
    r !== void 0 ? r(...i) : console.warn("Cannot find callback", t);
  }
  getResult() {
    return new Promise((t, i) => {
      if (this.objectHandle < 0) {
        i("Invalid object handle: " + this.objectHandle.toString());
        return;
      }
      let r = new M(this.objectHandle, "getResult", []), a = J2((o) => {
        t(o.result);
      }, i);
      this.wasmSDKWorker.postMessage(r, a);
    });
  }
  delete() {
    return new Promise((t, i) => {
      if (this.objectHandle < 0) {
        i("Invalid object handle: " + this.objectHandle.toString());
        return;
      }
      this.clearAllCallbacks();
      let r = new M(this.objectHandle, "delete", []), a = T(() => {
        this.objectHandle = -1, t();
      }, i);
      this.wasmSDKWorker.postMessage(r, a);
    });
  }
};
function N0(e) {
  let t = new W1();
  return t.onDebugText = !!e.onDebugText, t.onDetectionFailed = !!e.onDetectionFailed, t.onPointsDetection = !!e.onPointsDetection, t.onQuadDetection = !!e.onQuadDetection, t.onFirstSideResult = !!e.onFirstSideResult, t.onGlare = !!e.onGlare, t;
}
var j1 = class {
  constructor(t) {
    this.deleted = false, this.wasmSDKWorker = t;
  }
  processImage(t) {
    return new Promise((i, r) => {
      if (this.deleted) {
        r("Recognizer runner is deleted. It cannot be used anymore!");
        return;
      }
      let a = new Z2(t), o = J2((d) => {
        let R2 = d.recognitionState;
        i(R2);
      }, r);
      this.wasmSDKWorker.postTransferrableMessage(a, o);
    });
  }
  reconfigureRecognizers(t, i) {
    return new Promise((r, a) => {
      if (this.deleted) {
        a("Recognizer runner is deleted. It cannot be used anymore!");
        return;
      }
      let o = R0(t), d = new x2(o, i), R2 = T(r, a);
      this.wasmSDKWorker.postMessage(d, R2);
    });
  }
  setMetadataCallbacks(t) {
    return new Promise((i, r) => {
      let a = new Q2(N0(t)), o = T(i, r);
      this.wasmSDKWorker.postMessageAndRegisterCallbacks(a, t, o);
    });
  }
  resetRecognizers(t) {
    return new Promise((i, r) => {
      let a = new Y2(t), o = T(i, r);
      this.wasmSDKWorker.postMessage(a, o);
    });
  }
  setDetectionOnlyMode(t) {
    return new Promise((i, r) => {
      let a = new X(t), o = T(i, r);
      this.wasmSDKWorker.postMessage(a, o);
    });
  }
  setClearTimeoutCallback(t) {
    return new Promise((i, r) => {
      let a = new q2(t !== null), o = T(i, r);
      this.wasmSDKWorker.registerClearTimeoutCallback(t), this.wasmSDKWorker.postMessage(a, o);
    });
  }
  setCameraPreviewMirrored(t) {
    return new Promise((i, r) => {
      let a = new $2(t), o = T(i, r);
      this.wasmSDKWorker.postMessage(a, o);
    });
  }
  delete() {
    return this.deleted ? Promise.reject("Recognizer runner is already deleted.") : new Promise((t, i) => {
      let r = new H(), a = T(() => {
        this.deleted = true, t();
      }, i);
      this.wasmSDKWorker.postMessage(r, a);
    });
  }
};
function R0(e) {
  let t = [];
  for (let i of e)
    t.push(i.getRemoteObjectHandle());
  return t;
}
var z1 = class {
  constructor(t) {
    this.wasmSDKWorker = t;
  }
  createRecognizerRunner(t, i = false, r = {}) {
    return new Promise((a, o) => {
      let d = R0(t), R2 = new K2(d, i, N0(r)), A = T(() => {
        a(new j1(this.wasmSDKWorker));
      }, o);
      this.wasmSDKWorker.postMessageAndRegisterCallbacks(R2, r, A);
    });
  }
  newRecognizer(t, ...i) {
    return new Promise((r, a) => {
      let o = new z(t, J0(i)), d = J2((R2) => {
        let A = new C1(this.wasmSDKWorker, t, R2.objectHandle);
        r(A);
      }, a);
      this.wasmSDKWorker.postMessage(o, d);
    });
  }
};
var o1 = class {
  constructor(t, i, r, a) {
    this.eventHandlers = {}, this.metadataCallbacks = {}, this.clearTimeoutCallback = null, this.loadedWasmType = V1.Basic, this.mbWasmWorker = t, this.mbWasmWorker.onmessage = (o) => {
      this.handleWorkerEvent(o);
    }, this.mbWasmWorker.onerror = () => {
      a("Problem during initialization of worker file!");
    }, this.mbWasmModule = new z1(this), this.loadCallback = i, this.recognizersWithCallbacks = /* @__PURE__ */ new Map(), this.userId = r, this.showOverlay = false;
  }
  postMessage(t, i) {
    this.eventHandlers[t.messageID] = i, this.mbWasmWorker.postMessage(t);
  }
  postTransferrableMessage(t, i) {
    this.eventHandlers[t.messageID] = i, this.mbWasmWorker.postMessage(t, t.getTransferrables());
  }
  postMessageAndRegisterCallbacks(t, i, r) {
    this.eventHandlers[t.messageID] = r, this.metadataCallbacks = i, this.mbWasmWorker.postMessage(t);
  }
  registerClearTimeoutCallback(t) {
    this.clearTimeoutCallback = t;
  }
  registerRecognizerCallbacks(t, i) {
    this.recognizersWithCallbacks.set(t, i);
  }
  unregisterRecognizerCallbacks(t) {
    this.recognizersWithCallbacks.delete(t);
  }
  delete() {
    this.mbWasmWorker.terminate();
  }
  getProductIntegrationInfo() {
    return new Promise((t, i) => {
      let r = new y(this.userId), a = J2((o) => {
        t(o.result);
      }, i);
      this.postMessage(r, a);
    });
  }
  handleWorkerEvent(t) {
    if ("isCallbackMessage" in t.data) {
      let i = t.data;
      switch (i.callbackType) {
        case g2.onDebugText:
          typeof this.metadataCallbacks.onDebugText == "function" && this.metadataCallbacks.onDebugText(i.callbackParameters[0]);
          break;
        case g2.onDetectionFailed:
          typeof this.metadataCallbacks.onDetectionFailed == "function" && this.metadataCallbacks.onDetectionFailed();
          break;
        case g2.onPointsDetection:
          typeof this.metadataCallbacks.onPointsDetection == "function" && this.metadataCallbacks.onPointsDetection(i.callbackParameters[0]);
          break;
        case g2.onQuadDetection:
          typeof this.metadataCallbacks.onQuadDetection == "function" && this.metadataCallbacks.onQuadDetection(i.callbackParameters[0]);
          break;
        case g2.onFirstSideResult:
          typeof this.metadataCallbacks.onFirstSideResult == "function" && this.metadataCallbacks.onFirstSideResult();
          break;
        case g2.clearTimeoutCallback:
          this.clearTimeoutCallback && typeof this.clearTimeoutCallback.onClearTimeout == "function" && this.clearTimeoutCallback.onClearTimeout();
          break;
        case g2.onGlare:
          typeof this.metadataCallbacks.onGlare == "function" && this.metadataCallbacks.onGlare(i.callbackParameters[0]);
          break;
        case g2.recognizerCallback: {
          let r = i.callbackParameters.shift(), a = this.recognizersWithCallbacks.get(r.recognizerHandle);
          a !== void 0 ? a.invokeCallback(r.callbackName, i.callbackParameters) : console.warn("Cannot find recognizer to deliver callback message. Maybe it's destroyed?", r);
          break;
        }
        default:
          throw new Error(`Unknown callback type: ${g2[i.callbackType]}`);
      }
    } else if ("isLoadProgressMessage" in t.data) {
      let i = t.data;
      typeof this.loadCallback == "function" && this.loadCallback(i.progress);
    } else {
      let i = t.data, r = this.eventHandlers[i.messageID];
      delete this.eventHandlers[i.messageID], r(i);
    }
  }
  static createWasmWorker(t, i, r) {
    return l1(this, void 0, void 0, function* () {
      return new Promise((a, o) => {
        let d = new o1(t, i.loadProgressCallback, r, o), R2 = new V(i, r), A = J2((U2) => {
          let N = U2;
          d.showOverlay = N.showOverlay, d.loadedWasmType = N.wasmType, a(d);
        }, (U2) => {
          d && typeof d.delete == "function" && d.delete(), o(U2);
        });
        d.postMessage(R2, A);
      });
    });
  }
};
var D = class {
  constructor(t, i) {
    if (!t.code || !t.message)
      throw new Error("Instance of SDKError is required to have code and message.");
    this.message = t.message, this.code = t.code, this.details = i;
  }
};
var c2;
(function(e) {
  e.WORKER_WASM_LOAD_FAILURE = "WORKER_WASM_LOAD_FAILURE", e.WORKER_WASM_INIT_MISSING = "WORKER_WASM_INIT_MISSING", e.WORKER_FUNCTION_INVOKE_FAILURE = "WORKER_FUNCTION_INVOKE_FAILURE", e.WORKER_RECOGNIZER_CREATION_FAILURE = "WORKER_RECOGNIZER_CREATION_FAILURE", e.WORKER_RUNNER_EXISTS = "WORKER_RUNNER_EXISTS", e.WORKER_RUNNER_CREATION_FAILURE = "WORKER_RUNNER_CREATION_FAILURE", e.WORKER_RUNNER_MISSING = "WORKER_RUNNER_MISSING", e.WORKER_RUNNER_RECONFIGURE_FAILURE = "WORKER_RUNNER_RECONFIGURE_FAILURE", e.WORKER_RUNNER_DELETED = "WORKER_RUNNER_DELETED", e.WORKER_RUNNER_DELETE_FAILURE = "WORKER_RUNNER_DELETE_FAILURE", e.WORKER_OBJECT_INVOKE_FAILURE = "WORKER_OBJECT_INVOKE_FAILURE", e.WORKER_IMAGE_PROCESS_FAILURE = "WORKER_IMAGE_PROCESS_FAILURE", e.WORKER_HANDLE_UNDEFINED = "WORKER_HANDLE_UNDEFINED", e.WORKER_MESSAGE_ACTION_UNKNOWN = "WORKER_MESSAGE_ACTION_UNKNOWN", e.WORKER_LICENSE_UNLOCK_ERROR = "WORKER_LICENSE_UNLOCK_ERROR", e.WORKER_INTEGRATION_INFO_FAILURE = "WORKER_INTEGRATION_INFO_FAILURE", e.LOCAL_SDK_RUNNER_MISSING = "LOCAL_SDK_RUNNER_MISSING", e.LOCAL_SDK_RUNNER_EMPTY = "LOCAL_SDK_RUNNER_EMPTY", e.LICENSE_UNLOCK_ERROR = "LICENSE_UNLOCK_ERROR", e.FRAME_CAPTURE_SVG_UNSUPPORTED = "FRAME_CAPTURE_SVG_UNSUPPORTED", e.FRAME_CAPTURE_CANVAS_MISSING = "FRAME_CAPTURE_CANVAS_MISSING", e.SDK_WASM_SETTINGS_MISSING = "SDK_WASM_SETTINGS_MISSING", e.SDK_LICENSE_KEY_MISSING = "SDK_LICENSE_KEY_MISSING", e.SDK_WASM_MODULE_NAME_MISSING = "SDK_WASM_MODULE_NAME_MISSING", e.SDK_ENGINE_LOCATION_INVALID = "SDK_ENGINE_LOCATION_INVALID", e.SDK_WORKER_LOCATION_INVALID = "SDK_WORKER_LOCATION_INVALID", e.SDK_MISSING = "SDK_MISSING", e.SDK_RECOGNIZERS_MISSING = "SDK_RECOGNIZERS_MISSING", e.VIDEO_RECOGNIZER_ELEMENT_MISSING = "VIDEO_RECOGNIZER_ELEMENT_MISSING", e.VIDEO_RECOGNIZER_CAMERA_MISSING = "VIDEO_RECOGNIZER_CAMERA_MISSING", e.VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED = "VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED", e.VIDEO_RECOGNIZER_CAMERA_UNAVAILABLE = "VIDEO_RECOGNIZER_CAMERA_UNAVAILABLE", e.VIDEO_RECOGNIZER_CAMERA_IN_USE = "VIDEO_RECOGNIZER_CAMERA_IN_USE", e.VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED = "VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED", e.VIDEO_RECOGNIZER_FEED_RELEASED = "VIDEO_RECOGNIZER_FEED_RELEASED", e.VIDEO_RECOGNIZER_FEED_NOT_PAUSED = "VIDEO_RECOGNIZER_FEED_NOT_PAUSED", e.VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED = "VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED", e.VIDEO_RECOGNIZER_FEED_PAUSED = "VIDEO_RECOGNIZER_FEED_PAUSED", e.VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE = "VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE", e.VIDEO_RECOGNIZER_FEED_MISSING = "VIDEO_RECOGNIZER_FEED_MISSING";
})(c2 || (c2 = {}));
var I;
(function(e) {
  e.WORKER_HANDLE_UNDEFINED = "Cannot find object with handle: undefined", e.WORKER_WASM_LOAD_FAILURE = "Failed to load WASM in web worker!", e.WORKER_WASM_INIT_MISSING = "WASM module is not initialized!", e.WORKER_FUNCTION_INVOKE_FAILURE = "Failed to invoke function!", e.WORKER_RECOGNIZER_CREATION_FAILURE = "Failed to create new recognizer!", e.WORKER_RUNNER_EXISTS = "Recognizer runner is already created! Multiple instances are not allowed!", e.WORKER_RUNNER_CREATION_FAILURE = "Failed to create new recognizer runner!", e.WORKER_RUNNER_MISSING = "Recognizer runner is not created! There is nothing to reconfigure!", e.WORKER_RUNNER_RECONFIGURE_FAILURE = "Failed to reconfigure recognizer runner!", e.WORKER_RUNNER_DELETED = "Recognizer runner is already deleted!", e.WORKER_RUNNER_DELETE_FAILURE = "Failed to delete recognizer runner!", e.WORKER_OBJECT_INVOKE_FAILURE = "Failed to invoke object!", e.WORKER_IMAGE_PROCESS_FAILURE = "Recognizer runner is not initialized! Cannot process image!", e.WORKER_INTEGRATION_INFO_FAILURE = "Failed to get product integration info!", e.LOCAL_SDK_RUNNER_MISSING = "Property nativeRecognizerRunner is not available!", e.LOCAL_SDK_RUNNER_EMPTY = "Native RecognizerRunner cannot be empty!", e.LICENSE_TOKEN_STATE_INCORRECT = "Internal error (Incorrect token state)", e.LICENSE_PAYLOAD_VERIFICATION_FAILED = "Failed to verify server permission's digital signature!", e.LICENSE_PAYLOAD_CORRUPTED = "Server permission payload is corrupted!", e.LICENSE_PERMISSION_EXPIRED = "Internal error (server permission expired)", e.LICENSE_REMOTE_LOCKED = "Provided license key has been remotely locked. Please contact support for more information!", e.FRAME_CAPTURE_SVG_UNSUPPORTED = "Recognition of SVG elements not supported!", e.FRAME_CAPTURE_CANVAS_MISSING = "Could not get canvas 2d context!", e.SDK_WASM_SETTINGS_MISSING = "Missing WASM load settings!", e.SDK_LICENSE_KEY_MISSING = "Missing license key!", e.SDK_WASM_MODULE_NAME_MISSING = "Missing WASM module name!", e.SDK_ENGINE_LOCATION_INVALID = "Setting property 'engineLocation' must be a string!", e.SDK_WORKER_LOCATION_INVALID = "Setting property 'workerLocation' must be a string!", e.SDK_MISSING = "SDK is not provided!", e.SDK_RECOGNIZERS_MISSING = "To create RecognizerRunner at least 1 recognizer is required.", e.VIDEO_RECOGNIZER_ELEMENT_MISSING = "Video element, i.e. camera feed is not provided!", e.VIDEO_RECOGNIZER_CAMERA_MISSING = "Camera not found!", e.VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED = "Camera not allowed!", e.VIDEO_RECOGNIZER_CAMERA_UNAVAILABLE = "Camera not available!", e.VIDEO_RECOGNIZER_CAMERA_IN_USE = "Camera in use!", e.VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED = "Media devices not supported by browser.", e.VIDEO_RECOGNIZER_FEED_RELEASED = "The associated video feed has been released!", e.VIDEO_RECOGNIZER_FEED_NOT_PAUSED = "The associated video feed is not paused. Use resumeRecognition instead!", e.VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED = "The play() request was interrupted or prevented by browser security rules!", e.VIDEO_RECOGNIZER_FEED_PAUSED = "Cannot resume recognition while video feed is paused! Use recognize or startRecognition", e.VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE = "Could not reset recognizers!", e.VIDEO_RECOGNIZER_FEED_MISSING = "Missing video feed!";
})(I || (I = {}));
var ie = { feedMissing: { message: I.VIDEO_RECOGNIZER_FEED_MISSING, code: c2.VIDEO_RECOGNIZER_FEED_MISSING }, recognizersResetFailure: { message: I.VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE, code: c2.VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE }, feedPaused: { message: I.VIDEO_RECOGNIZER_FEED_PAUSED, code: c2.VIDEO_RECOGNIZER_FEED_PAUSED }, playRequestInterrupted: { message: I.VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED, code: c2.VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED }, videoFeedNotPaused: { message: I.VIDEO_RECOGNIZER_FEED_NOT_PAUSED, code: c2.VIDEO_RECOGNIZER_FEED_NOT_PAUSED }, videoFeedReleased: { message: I.VIDEO_RECOGNIZER_FEED_RELEASED, code: c2.VIDEO_RECOGNIZER_FEED_RELEASED }, mediaDevicesUnsupported: { code: c2.VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED, message: I.VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED }, cameraMissing: { code: c2.VIDEO_RECOGNIZER_CAMERA_MISSING, message: I.VIDEO_RECOGNIZER_CAMERA_MISSING }, elementMissing: { message: I.VIDEO_RECOGNIZER_ELEMENT_MISSING, code: c2.VIDEO_RECOGNIZER_ELEMENT_MISSING } };
var P = { wasmSettingsMissing: { message: I.SDK_WASM_SETTINGS_MISSING, code: c2.SDK_WASM_SETTINGS_MISSING }, licenseKeyMissing: { message: I.SDK_LICENSE_KEY_MISSING, code: c2.SDK_LICENSE_KEY_MISSING }, wasmModuleNameMissing: { message: I.SDK_WASM_MODULE_NAME_MISSING, code: c2.SDK_WASM_MODULE_NAME_MISSING }, engineLocationInvalid: { message: I.SDK_ENGINE_LOCATION_INVALID, code: c2.SDK_ENGINE_LOCATION_INVALID }, workerLocationInvalid: { message: I.SDK_WORKER_LOCATION_INVALID, code: c2.SDK_WORKER_LOCATION_INVALID }, missing: { message: I.SDK_MISSING, code: c2.SDK_MISSING }, recognizersMissing: { message: I.SDK_RECOGNIZERS_MISSING, code: c2.SDK_RECOGNIZERS_MISSING } };
var re2 = { svgUnsupported: { message: I.FRAME_CAPTURE_SVG_UNSUPPORTED, code: c2.FRAME_CAPTURE_SVG_UNSUPPORTED }, canvasMissing: { message: I.FRAME_CAPTURE_CANVAS_MISSING, code: c2.FRAME_CAPTURE_CANVAS_MISSING } };
var se2 = { licenseTokenStateIncorrect: { code: c2.LICENSE_UNLOCK_ERROR, message: I.LICENSE_TOKEN_STATE_INCORRECT }, licensePayloadVerificationFailed: { code: c2.LICENSE_UNLOCK_ERROR, message: I.LICENSE_PAYLOAD_VERIFICATION_FAILED }, licensePayloadCorrupted: { code: c2.LICENSE_UNLOCK_ERROR, message: I.LICENSE_PAYLOAD_CORRUPTED }, licensePermissionExpired: { code: c2.LICENSE_UNLOCK_ERROR, message: I.LICENSE_PERMISSION_EXPIRED }, licenseRemoteLocked: { code: c2.LICENSE_UNLOCK_ERROR, message: I.LICENSE_REMOTE_LOCKED }, licenseNetworkError: { code: c2.LICENSE_UNLOCK_ERROR }, licenseInvalid: { code: c2.LICENSE_UNLOCK_ERROR } };
var ae2 = { runnerMissing: { message: I.LOCAL_SDK_RUNNER_MISSING, code: c2.LOCAL_SDK_RUNNER_MISSING }, runnerEmpty: { message: I.LOCAL_SDK_RUNNER_EMPTY, code: c2.LOCAL_SDK_RUNNER_EMPTY } };
var ne2 = { imageProcessFailure: { message: I.WORKER_IMAGE_PROCESS_FAILURE, code: c2.WORKER_IMAGE_PROCESS_FAILURE }, objectInvokeFailure: { message: I.WORKER_OBJECT_INVOKE_FAILURE, code: c2.WORKER_OBJECT_INVOKE_FAILURE }, runnerDeleteFailure: { message: I.WORKER_RUNNER_DELETE_FAILURE, code: c2.WORKER_RUNNER_DELETE_FAILURE }, runnerDeleted: { message: I.WORKER_RUNNER_DELETED, code: c2.WORKER_RUNNER_DELETED }, runnerReconfigureFailure: { message: I.WORKER_RUNNER_RECONFIGURE_FAILURE, code: c2.WORKER_RUNNER_RECONFIGURE_FAILURE }, runnerMissing: { message: I.WORKER_RUNNER_MISSING, code: c2.WORKER_RUNNER_MISSING }, runnerCreationFailure: { message: I.WORKER_RUNNER_CREATION_FAILURE, code: c2.WORKER_RUNNER_CREATION_FAILURE }, runnerExists: { message: I.WORKER_RUNNER_EXISTS, code: c2.WORKER_RUNNER_EXISTS }, recognizerCreationFailure: { message: I.WORKER_RECOGNIZER_CREATION_FAILURE, code: c2.WORKER_RECOGNIZER_CREATION_FAILURE }, functionInvokeFailure: { message: I.WORKER_FUNCTION_INVOKE_FAILURE, code: c2.WORKER_FUNCTION_INVOKE_FAILURE }, wasmInitMissing: { message: I.WORKER_WASM_INIT_MISSING, code: c2.WORKER_WASM_INIT_MISSING }, wasmLoadFailure: { message: I.WORKER_WASM_LOAD_FAILURE, code: c2.WORKER_WASM_LOAD_FAILURE }, handleUndefined: { message: I.WORKER_HANDLE_UNDEFINED, code: c2.WORKER_HANDLE_UNDEFINED }, integrationInfoFailure: { message: I.WORKER_INTEGRATION_INFO_FAILURE, code: c2.WORKER_INTEGRATION_INFO_FAILURE } };
var $1;
(function(e) {
  e[e.BackFacingCamera = 0] = "BackFacingCamera", e[e.FrontFacingCamera = 1] = "FrontFacingCamera";
})($1 || ($1 = {}));
var g1;
(function(e) {
  e[e.RotatedLeft90 = 0] = "RotatedLeft90", e[e.NoRotation = 1] = "NoRotation", e[e.RotatedRight90 = 2] = "RotatedRight90", e[e.Rotated180 = 3] = "Rotated180";
})(g1 || (g1 = {}));
var b;
(function(e) {
  e[e.Empty = 0] = "Empty", e[e.Uncertain = 1] = "Uncertain", e[e.Valid = 2] = "Valid", e[e.StageValid = 3] = "StageValid";
})(b || (b = {}));
var b1 = class {
  constructor(t, i, r) {
    this.imageData = t, this.orientation = i, this.videoFrame = r;
  }
};
var y1;
(function(e) {
  e[e.Invalid = 0] = "Invalid", e[e.RequiresServerPermission = 1] = "RequiresServerPermission", e[e.Valid = 2] = "Valid";
})(y1 || (y1 = {}));
var e0;
(function(e) {
  e.LicenseTokenStateInvalid = "LICENSE_TOKEN_STATE_INVALID", e.NetworkError = "NETWORK_ERROR", e.RemoteLock = "REMOTE_LOCK", e.PermissionExpired = "PERMISSION_EXPIRED", e.PayloadCorrupted = "PAYLOAD_CORRUPTED", e.PayloadSignatureVerificationFailed = "PAYLOAD_SIGNATURE_VERIFICATION_FAILED", e.IncorrectTokenState = "INCORRECT_TOKEN_STATE";
})(e0 || (e0 = {}));
var t0;
(function(e) {
  e[e.Ok = 0] = "Ok", e[e.NetworkError = 1] = "NetworkError", e[e.RemoteLock = 2] = "RemoteLock", e[e.PermissionExpired = 3] = "PermissionExpired", e[e.PayloadCorrupted = 4] = "PayloadCorrupted", e[e.PayloadSignatureVerificationFailed = 5] = "PayloadSignatureVerificationFailed", e[e.IncorrectTokenState = 6] = "IncorrectTokenState";
})(t0 || (t0 = {}));
var L1;
(function(e) {
  e[e.Fail = 0] = "Fail", e[e.Success = 1] = "Success", e[e.CameraTooHigh = 2] = "CameraTooHigh", e[e.FallbackSuccess = 3] = "FallbackSuccess", e[e.Partial = 4] = "Partial", e[e.CameraAtAngle = 5] = "CameraAtAngle", e[e.CameraTooNear = 6] = "CameraTooNear", e[e.DocumentTooCloseToEdge = 7] = "DocumentTooCloseToEdge";
})(L1 || (L1 = {}));
var i0;
(function(e) {
  e.MediaDevicesNotSupported = "MediaDevicesNotSupported", e.CameraNotFound = "CameraNotFound", e.CameraNotAllowed = "CameraNotAllowed", e.CameraInUse = "CameraInUse", e.CameraNotAvailable = "CameraNotAvailable", e.VideoElementNotProvided = "VideoElementNotProvided";
})(i0 || (i0 = {}));
var r0;
(function(e) {
  e[e.Recognition = 0] = "Recognition", e[e.RecognitionTest = 1] = "RecognitionTest", e[e.DetectionTest = 2] = "DetectionTest";
})(r0 || (r0 = {}));
var T1 = class {
  constructor(t) {
    if (this.allowHelloMessage = true, this.engineLocation = "", this.workerLocation = "", this.wasmType = null, this.numberOfWorkers = null, this.loadProgressCallback = null, this.wasmModuleName = G0, !t)
      throw new D(P.licenseKeyMissing);
    this.licenseKey = t;
  }
};
function s0() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (e) => (e ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> e / 4).toString(16));
}
function B0() {
  try {
    let e = localStorage.getItem("mb-user-id");
    return e === null && (e = s0(), localStorage.setItem("mb-user-id", e)), e;
  } catch (e) {
    return s0();
  }
}
function S0(e) {
  return l1(this, void 0, void 0, function* () {
    return new Promise((t, i) => {
      if (!e || typeof e != "object") {
        i(new D(P.wasmSettingsMissing));
        return;
      }
      if (typeof e.licenseKey != "string") {
        i(new D(P.licenseKeyMissing));
        return;
      }
      if (!e.wasmModuleName) {
        i(new D(P.wasmModuleNameMissing));
        return;
      }
      if (typeof e.engineLocation != "string") {
        i(new D(P.engineLocationInvalid));
        return;
      }
      if (typeof e.workerLocation != "string") {
        i(new D(P.workerLocationInvalid));
        return;
      }
      let r = B0();
      try {
        let a = `/resources/${e.wasmModuleName}.worker.min.js`, o = window.location.origin + a, d = e.workerLocation || o;
        e.allowHelloMessage && console.log("Worker location is:", d);
        let R2 = new Worker(d);
        o1.createWasmWorker(R2, e, r).then((A) => {
          t(A);
        }, i);
      } catch (a) {
        i(a);
      }
    });
  });
}
function h0(e, t, i = false, r = {}) {
  return l1(this, void 0, void 0, function* () {
    if (typeof e != "object")
      throw new D(P.missing);
    if (typeof t != "object" || t.length < 1)
      throw new D(P.recognizersMissing);
    return e.mbWasmModule.createRecognizerRunner(t, i, r);
  });
}
var a0;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.QR_CODE = 1] = "QR_CODE", e[e.DATA_MATRIX = 2] = "DATA_MATRIX", e[e.UPC_E = 3] = "UPC_E", e[e.UPC_A = 4] = "UPC_A", e[e.EAN_8 = 5] = "EAN_8", e[e.EAN_13 = 6] = "EAN_13", e[e.CODE_128 = 7] = "CODE_128", e[e.CODE_39 = 8] = "CODE_39", e[e.ITF = 9] = "ITF", e[e.AZTEC_BARCODE = 10] = "AZTEC_BARCODE", e[e.PDF417_BARCODE = 11] = "PDF417_BARCODE";
})(a0 || (a0 = {}));
var n0;
(function(e) {
  e[e.None = 0] = "None", e[e.ImageOnly = 1] = "ImageOnly", e[e.ResultFieldsOnly = 2] = "ResultFieldsOnly", e[e.FullResult = 3] = "FullResult";
})(n0 || (n0 = {}));
var M1 = class {
  constructor() {
    this.enableMrzId = true, this.enableMrzPassport = true, this.enableMrzVisa = true, this.enablePhotoId = true, this.enableBarcodeId = true, this.enableFullDocumentRecognition = true;
  }
};
var o0;
(function(e) {
  e[e.DocumentType = 0] = "DocumentType", e[e.StandardVersionNumber = 1] = "StandardVersionNumber", e[e.CustomerFamilyName = 2] = "CustomerFamilyName", e[e.CustomerFirstName = 3] = "CustomerFirstName", e[e.CustomerFullName = 4] = "CustomerFullName", e[e.DateOfBirth = 5] = "DateOfBirth", e[e.Sex = 6] = "Sex", e[e.EyeColor = 7] = "EyeColor", e[e.AddressStreet = 8] = "AddressStreet", e[e.AddressCity = 9] = "AddressCity", e[e.AddressJurisdictionCode = 10] = "AddressJurisdictionCode", e[e.AddressPostalCode = 11] = "AddressPostalCode", e[e.FullAddress = 12] = "FullAddress", e[e.Height = 13] = "Height", e[e.HeightIn = 14] = "HeightIn", e[e.HeightCm = 15] = "HeightCm", e[e.CustomerMiddleName = 16] = "CustomerMiddleName", e[e.HairColor = 17] = "HairColor", e[e.NameSuffix = 18] = "NameSuffix", e[e.AKAFullName = 19] = "AKAFullName", e[e.AKAFamilyName = 20] = "AKAFamilyName", e[e.AKAGivenName = 21] = "AKAGivenName", e[e.AKASuffixName = 22] = "AKASuffixName", e[e.WeightRange = 23] = "WeightRange", e[e.WeightPounds = 24] = "WeightPounds", e[e.WeightKilograms = 25] = "WeightKilograms", e[e.CustomerIdNumber = 26] = "CustomerIdNumber", e[e.FamilyNameTruncation = 27] = "FamilyNameTruncation", e[e.FirstNameTruncation = 28] = "FirstNameTruncation", e[e.MiddleNameTruncation = 29] = "MiddleNameTruncation", e[e.PlaceOfBirth = 30] = "PlaceOfBirth", e[e.AddressStreet2 = 31] = "AddressStreet2", e[e.RaceEthnicity = 32] = "RaceEthnicity", e[e.NamePrefix = 33] = "NamePrefix", e[e.CountryIdentification = 34] = "CountryIdentification", e[e.ResidenceStreetAddress = 35] = "ResidenceStreetAddress", e[e.ResidenceStreetAddress2 = 36] = "ResidenceStreetAddress2", e[e.ResidenceCity = 37] = "ResidenceCity", e[e.ResidenceJurisdictionCode = 38] = "ResidenceJurisdictionCode", e[e.ResidencePostalCode = 39] = "ResidencePostalCode", e[e.ResidenceFullAddress = 40] = "ResidenceFullAddress", e[e.Under18 = 41] = "Under18", e[e.Under19 = 42] = "Under19", e[e.Under21 = 43] = "Under21", e[e.SocialSecurityNumber = 44] = "SocialSecurityNumber", e[e.AKASocialSecurityNumber = 45] = "AKASocialSecurityNumber", e[e.AKAMiddleName = 46] = "AKAMiddleName", e[e.AKAPrefixName = 47] = "AKAPrefixName", e[e.OrganDonor = 48] = "OrganDonor", e[e.Veteran = 49] = "Veteran", e[e.AKADateOfBirth = 50] = "AKADateOfBirth", e[e.IssuerIdentificationNumber = 51] = "IssuerIdentificationNumber", e[e.DocumentExpirationDate = 52] = "DocumentExpirationDate", e[e.JurisdictionVersionNumber = 53] = "JurisdictionVersionNumber", e[e.JurisdictionVehicleClass = 54] = "JurisdictionVehicleClass", e[e.JurisdictionRestrictionCodes = 55] = "JurisdictionRestrictionCodes", e[e.JurisdictionEndorsementCodes = 56] = "JurisdictionEndorsementCodes", e[e.DocumentIssueDate = 57] = "DocumentIssueDate", e[e.FederalCommercialVehicleCodes = 58] = "FederalCommercialVehicleCodes", e[e.IssuingJurisdiction = 59] = "IssuingJurisdiction", e[e.StandardVehicleClassification = 60] = "StandardVehicleClassification", e[e.IssuingJurisdictionName = 61] = "IssuingJurisdictionName", e[e.StandardEndorsementCode = 62] = "StandardEndorsementCode", e[e.StandardRestrictionCode = 63] = "StandardRestrictionCode", e[e.JurisdictionVehicleClassificationDescription = 64] = "JurisdictionVehicleClassificationDescription", e[e.JurisdictionEndorsmentCodeDescription = 65] = "JurisdictionEndorsmentCodeDescription", e[e.JurisdictionRestrictionCodeDescription = 66] = "JurisdictionRestrictionCodeDescription", e[e.InventoryControlNumber = 67] = "InventoryControlNumber", e[e.CardRevisionDate = 68] = "CardRevisionDate", e[e.DocumentDiscriminator = 69] = "DocumentDiscriminator", e[e.LimitedDurationDocument = 70] = "LimitedDurationDocument", e[e.AuditInformation = 71] = "AuditInformation", e[e.ComplianceType = 72] = "ComplianceType", e[e.IssueTimestamp = 73] = "IssueTimestamp", e[e.PermitExpirationDate = 74] = "PermitExpirationDate", e[e.PermitIdentifier = 75] = "PermitIdentifier", e[e.PermitIssueDate = 76] = "PermitIssueDate", e[e.NumberOfDuplicates = 77] = "NumberOfDuplicates", e[e.HAZMATExpirationDate = 78] = "HAZMATExpirationDate", e[e.MedicalIndicator = 79] = "MedicalIndicator", e[e.NonResident = 80] = "NonResident", e[e.UniqueCustomerId = 81] = "UniqueCustomerId", e[e.DataDiscriminator = 82] = "DataDiscriminator", e[e.DocumentExpirationMonth = 83] = "DocumentExpirationMonth", e[e.DocumentNonexpiring = 84] = "DocumentNonexpiring", e[e.SecurityVersion = 85] = "SecurityVersion", e[e.Count = 86] = "Count";
})(o0 || (o0 = {}));
var l0;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.ALBANIA = 1] = "ALBANIA", e[e.ALGERIA = 2] = "ALGERIA", e[e.ARGENTINA = 3] = "ARGENTINA", e[e.AUSTRALIA = 4] = "AUSTRALIA", e[e.AUSTRIA = 5] = "AUSTRIA", e[e.AZERBAIJAN = 6] = "AZERBAIJAN", e[e.BAHRAIN = 7] = "BAHRAIN", e[e.BANGLADESH = 8] = "BANGLADESH", e[e.BELGIUM = 9] = "BELGIUM", e[e.BOSNIA_AND_HERZEGOVINA = 10] = "BOSNIA_AND_HERZEGOVINA", e[e.BRUNEI = 11] = "BRUNEI", e[e.BULGARIA = 12] = "BULGARIA", e[e.CAMBODIA = 13] = "CAMBODIA", e[e.CANADA = 14] = "CANADA", e[e.CHILE = 15] = "CHILE", e[e.COLOMBIA = 16] = "COLOMBIA", e[e.COSTA_RICA = 17] = "COSTA_RICA", e[e.CROATIA = 18] = "CROATIA", e[e.CYPRUS = 19] = "CYPRUS", e[e.CZECHIA = 20] = "CZECHIA", e[e.DENMARK = 21] = "DENMARK", e[e.DOMINICAN_REPUBLIC = 22] = "DOMINICAN_REPUBLIC", e[e.EGYPT = 23] = "EGYPT", e[e.ESTONIA = 24] = "ESTONIA", e[e.FINLAND = 25] = "FINLAND", e[e.FRANCE = 26] = "FRANCE", e[e.GEORGIA = 27] = "GEORGIA", e[e.GERMANY = 28] = "GERMANY", e[e.GHANA = 29] = "GHANA", e[e.GREECE = 30] = "GREECE", e[e.GUATEMALA = 31] = "GUATEMALA", e[e.HONG_KONG = 32] = "HONG_KONG", e[e.HUNGARY = 33] = "HUNGARY", e[e.INDIA = 34] = "INDIA", e[e.INDONESIA = 35] = "INDONESIA", e[e.IRELAND = 36] = "IRELAND", e[e.ISRAEL = 37] = "ISRAEL", e[e.ITALY = 38] = "ITALY", e[e.JORDAN = 39] = "JORDAN", e[e.KAZAKHSTAN = 40] = "KAZAKHSTAN", e[e.KENYA = 41] = "KENYA", e[e.KOSOVO = 42] = "KOSOVO", e[e.KUWAIT = 43] = "KUWAIT", e[e.LATVIA = 44] = "LATVIA", e[e.LITHUANIA = 45] = "LITHUANIA", e[e.MALAYSIA = 46] = "MALAYSIA", e[e.MALDIVES = 47] = "MALDIVES", e[e.MALTA = 48] = "MALTA", e[e.MAURITIUS = 49] = "MAURITIUS", e[e.MEXICO = 50] = "MEXICO", e[e.MOROCCO = 51] = "MOROCCO", e[e.NETHERLANDS = 52] = "NETHERLANDS", e[e.NEW_ZEALAND = 53] = "NEW_ZEALAND", e[e.NIGERIA = 54] = "NIGERIA", e[e.PAKISTAN = 55] = "PAKISTAN", e[e.PANAMA = 56] = "PANAMA", e[e.PARAGUAY = 57] = "PARAGUAY", e[e.PHILIPPINES = 58] = "PHILIPPINES", e[e.POLAND = 59] = "POLAND", e[e.PORTUGAL = 60] = "PORTUGAL", e[e.PUERTO_RICO = 61] = "PUERTO_RICO", e[e.QATAR = 62] = "QATAR", e[e.ROMANIA = 63] = "ROMANIA", e[e.RUSSIA = 64] = "RUSSIA", e[e.SAUDI_ARABIA = 65] = "SAUDI_ARABIA", e[e.SERBIA = 66] = "SERBIA", e[e.SINGAPORE = 67] = "SINGAPORE", e[e.SLOVAKIA = 68] = "SLOVAKIA", e[e.SLOVENIA = 69] = "SLOVENIA", e[e.SOUTH_AFRICA = 70] = "SOUTH_AFRICA", e[e.SPAIN = 71] = "SPAIN", e[e.SWEDEN = 72] = "SWEDEN", e[e.SWITZERLAND = 73] = "SWITZERLAND", e[e.TAIWAN = 74] = "TAIWAN", e[e.THAILAND = 75] = "THAILAND", e[e.TUNISIA = 76] = "TUNISIA", e[e.TURKEY = 77] = "TURKEY", e[e.UAE = 78] = "UAE", e[e.UGANDA = 79] = "UGANDA", e[e.UK = 80] = "UK", e[e.UKRAINE = 81] = "UKRAINE", e[e.USA = 82] = "USA", e[e.VIETNAM = 83] = "VIETNAM", e[e.BRAZIL = 84] = "BRAZIL", e[e.NORWAY = 85] = "NORWAY", e[e.OMAN = 86] = "OMAN", e[e.ECUADOR = 87] = "ECUADOR", e[e.EL_SALVADOR = 88] = "EL_SALVADOR", e[e.SRI_LANKA = 89] = "SRI_LANKA", e[e.PERU = 90] = "PERU", e[e.URUGUAY = 91] = "URUGUAY", e[e.BAHAMAS = 92] = "BAHAMAS", e[e.BERMUDA = 93] = "BERMUDA", e[e.BOLIVIA = 94] = "BOLIVIA", e[e.CHINA = 95] = "CHINA", e[e.EUROPEAN_UNION = 96] = "EUROPEAN_UNION", e[e.HAITI = 97] = "HAITI", e[e.HONDURAS = 98] = "HONDURAS", e[e.ICELAND = 99] = "ICELAND", e[e.JAPAN = 100] = "JAPAN", e[e.LUXEMBOURG = 101] = "LUXEMBOURG", e[e.MONTENEGRO = 102] = "MONTENEGRO", e[e.NICARAGUA = 103] = "NICARAGUA", e[e.SOUTH_KOREA = 104] = "SOUTH_KOREA", e[e.VENEZUELA = 105] = "VENEZUELA", e[e.AFGHANISTAN = 106] = "AFGHANISTAN", e[e.ALAND_ISLANDS = 107] = "ALAND_ISLANDS", e[e.AMERICAN_SAMOA = 108] = "AMERICAN_SAMOA", e[e.ANDORRA = 109] = "ANDORRA", e[e.ANGOLA = 110] = "ANGOLA", e[e.ANGUILLA = 111] = "ANGUILLA", e[e.ANTARCTICA = 112] = "ANTARCTICA", e[e.ANTIGUA_AND_BARBUDA = 113] = "ANTIGUA_AND_BARBUDA", e[e.ARMENIA = 114] = "ARMENIA", e[e.ARUBA = 115] = "ARUBA", e[e.BAILIWICK_OF_GUERNSEY = 116] = "BAILIWICK_OF_GUERNSEY", e[e.BAILIWICK_OF_JERSEY = 117] = "BAILIWICK_OF_JERSEY", e[e.BARBADOS = 118] = "BARBADOS", e[e.BELARUS = 119] = "BELARUS", e[e.BELIZE = 120] = "BELIZE", e[e.BENIN = 121] = "BENIN", e[e.BHUTAN = 122] = "BHUTAN", e[e.BONAIRE_SAINT_EUSTATIUS_AND_SABA = 123] = "BONAIRE_SAINT_EUSTATIUS_AND_SABA", e[e.BOTSWANA = 124] = "BOTSWANA", e[e.BOUVET_ISLAND = 125] = "BOUVET_ISLAND", e[e.BRITISH_INDIAN_OCEAN_TERRITORY = 126] = "BRITISH_INDIAN_OCEAN_TERRITORY", e[e.BURKINA_FASO = 127] = "BURKINA_FASO", e[e.BURUNDI = 128] = "BURUNDI", e[e.CAMEROON = 129] = "CAMEROON", e[e.CAPE_VERDE = 130] = "CAPE_VERDE", e[e.CARIBBEAN_NETHERLANDS = 131] = "CARIBBEAN_NETHERLANDS", e[e.CAYMAN_ISLANDS = 132] = "CAYMAN_ISLANDS", e[e.CENTRAL_AFRICAN_REPUBLIC = 133] = "CENTRAL_AFRICAN_REPUBLIC", e[e.CHAD = 134] = "CHAD", e[e.CHRISTMAS_ISLAND = 135] = "CHRISTMAS_ISLAND", e[e.COCOS_ISLANDS = 136] = "COCOS_ISLANDS", e[e.COMOROS = 137] = "COMOROS", e[e.CONGO = 138] = "CONGO", e[e.COOK_ISLANDS = 139] = "COOK_ISLANDS", e[e.CUBA = 140] = "CUBA", e[e.CURACAO = 141] = "CURACAO", e[e.DEMOCRATIC_REPUBLIC_OF_THE_CONGO = 142] = "DEMOCRATIC_REPUBLIC_OF_THE_CONGO", e[e.DJIBOUTI = 143] = "DJIBOUTI", e[e.DOMINICA = 144] = "DOMINICA", e[e.EAST_TIMOR = 145] = "EAST_TIMOR", e[e.EQUATORIAL_GUINEA = 146] = "EQUATORIAL_GUINEA", e[e.ERITREA = 147] = "ERITREA", e[e.ETHIOPIA = 148] = "ETHIOPIA", e[e.FALKLAND_ISLANDS = 149] = "FALKLAND_ISLANDS", e[e.FAROE_ISLANDS = 150] = "FAROE_ISLANDS", e[e.FEDERATED_STATES_OF_MICRONESIA = 151] = "FEDERATED_STATES_OF_MICRONESIA", e[e.FIJI = 152] = "FIJI", e[e.FRENCH_GUIANA = 153] = "FRENCH_GUIANA", e[e.FRENCH_POLYNESIA = 154] = "FRENCH_POLYNESIA", e[e.FRENCH_SOUTHERN_TERRITORIES = 155] = "FRENCH_SOUTHERN_TERRITORIES", e[e.GABON = 156] = "GABON", e[e.GAMBIA = 157] = "GAMBIA", e[e.GIBRALTAR = 158] = "GIBRALTAR", e[e.GREENLAND = 159] = "GREENLAND", e[e.GRENADA = 160] = "GRENADA", e[e.GUADELOUPE = 161] = "GUADELOUPE", e[e.GUAM = 162] = "GUAM", e[e.GUINEA = 163] = "GUINEA", e[e.GUINEA_BISSAU = 164] = "GUINEA_BISSAU", e[e.GUYANA = 165] = "GUYANA", e[e.HEARD_ISLAND_AND_MCDONALD_ISLANDS = 166] = "HEARD_ISLAND_AND_MCDONALD_ISLANDS", e[e.IRAN = 167] = "IRAN", e[e.IRAQ = 168] = "IRAQ", e[e.ISLE_OF_MAN = 169] = "ISLE_OF_MAN", e[e.IVORY_COAST = 170] = "IVORY_COAST", e[e.JAMAICA = 171] = "JAMAICA", e[e.KIRIBATI = 172] = "KIRIBATI", e[e.KYRGYZSTAN = 173] = "KYRGYZSTAN", e[e.LAOS = 174] = "LAOS", e[e.LEBANON = 175] = "LEBANON", e[e.LESOTHO = 176] = "LESOTHO", e[e.LIBERIA = 177] = "LIBERIA", e[e.LIBYA = 178] = "LIBYA", e[e.LIECHTENSTEIN = 179] = "LIECHTENSTEIN", e[e.MACAU = 180] = "MACAU", e[e.MADAGASCAR = 181] = "MADAGASCAR", e[e.MALAWI = 182] = "MALAWI", e[e.MALI = 183] = "MALI", e[e.MARSHALL_ISLANDS = 184] = "MARSHALL_ISLANDS", e[e.MARTINIQUE = 185] = "MARTINIQUE", e[e.MAURITANIA = 186] = "MAURITANIA", e[e.MAYOTTE = 187] = "MAYOTTE", e[e.MOLDOVA = 188] = "MOLDOVA", e[e.MONACO = 189] = "MONACO", e[e.MONGOLIA = 190] = "MONGOLIA", e[e.MONTSERRAT = 191] = "MONTSERRAT", e[e.MOZAMBIQUE = 192] = "MOZAMBIQUE", e[e.MYANMAR = 193] = "MYANMAR", e[e.NAMIBIA = 194] = "NAMIBIA", e[e.NAURU = 195] = "NAURU", e[e.NEPAL = 196] = "NEPAL", e[e.NEW_CALEDONIA = 197] = "NEW_CALEDONIA", e[e.NIGER = 198] = "NIGER", e[e.NIUE = 199] = "NIUE", e[e.NORFOLK_ISLAND = 200] = "NORFOLK_ISLAND", e[e.NORTHERN_CYPRUS = 201] = "NORTHERN_CYPRUS", e[e.NORTHERN_MARIANA_ISLANDS = 202] = "NORTHERN_MARIANA_ISLANDS", e[e.NORTH_KOREA = 203] = "NORTH_KOREA", e[e.NORTH_MACEDONIA = 204] = "NORTH_MACEDONIA", e[e.PALAU = 205] = "PALAU", e[e.PALESTINE = 206] = "PALESTINE", e[e.PAPUA_NEW_GUINEA = 207] = "PAPUA_NEW_GUINEA", e[e.PITCAIRN = 208] = "PITCAIRN", e[e.REUNION = 209] = "REUNION", e[e.RWANDA = 210] = "RWANDA", e[e.SAINT_BARTHELEMY = 211] = "SAINT_BARTHELEMY", e[e.SAINT_HELENA_ASCENSION_AND_TRISTIAN_DA_CUNHA = 212] = "SAINT_HELENA_ASCENSION_AND_TRISTIAN_DA_CUNHA", e[e.SAINT_KITTS_AND_NEVIS = 213] = "SAINT_KITTS_AND_NEVIS", e[e.SAINT_LUCIA = 214] = "SAINT_LUCIA", e[e.SAINT_MARTIN = 215] = "SAINT_MARTIN", e[e.SAINT_PIERRE_AND_MIQUELON = 216] = "SAINT_PIERRE_AND_MIQUELON", e[e.SAINT_VINCENT_AND_THE_GRENADINES = 217] = "SAINT_VINCENT_AND_THE_GRENADINES", e[e.SAMOA = 218] = "SAMOA", e[e.SAN_MARINO = 219] = "SAN_MARINO", e[e.SAO_TOME_AND_PRINCIPE = 220] = "SAO_TOME_AND_PRINCIPE", e[e.SENEGAL = 221] = "SENEGAL", e[e.SEYCHELLES = 222] = "SEYCHELLES", e[e.SIERRA_LEONE = 223] = "SIERRA_LEONE", e[e.SINT_MAARTEN = 224] = "SINT_MAARTEN", e[e.SOLOMON_ISLANDS = 225] = "SOLOMON_ISLANDS", e[e.SOMALIA = 226] = "SOMALIA", e[e.SOUTH_GEORGIA_AND_THE_SOUTH_SANDWICH_ISLANDS = 227] = "SOUTH_GEORGIA_AND_THE_SOUTH_SANDWICH_ISLANDS", e[e.SOUTH_SUDAN = 228] = "SOUTH_SUDAN", e[e.SUDAN = 229] = "SUDAN", e[e.SURINAME = 230] = "SURINAME", e[e.SVALBARD_AND_JAN_MAYEN = 231] = "SVALBARD_AND_JAN_MAYEN", e[e.ESWATINI = 232] = "ESWATINI", e[e.SYRIA = 233] = "SYRIA", e[e.TAJIKISTAN = 234] = "TAJIKISTAN", e[e.TANZANIA = 235] = "TANZANIA", e[e.TOGO = 236] = "TOGO", e[e.TOKELAU = 237] = "TOKELAU", e[e.TONGA = 238] = "TONGA", e[e.TRINIDAD_AND_TOBAGO = 239] = "TRINIDAD_AND_TOBAGO", e[e.TURKMENISTAN = 240] = "TURKMENISTAN", e[e.TURKS_AND_CAICOS_ISLANDS = 241] = "TURKS_AND_CAICOS_ISLANDS", e[e.TUVALU = 242] = "TUVALU", e[e.UNITED_STATES_MINOR_OUTLYING_ISLANDS = 243] = "UNITED_STATES_MINOR_OUTLYING_ISLANDS", e[e.UZBEKISTAN = 244] = "UZBEKISTAN", e[e.VANUATU = 245] = "VANUATU", e[e.VATICAN_CITY = 246] = "VATICAN_CITY", e[e.VIRGIN_ISLANDS_BRITISH = 247] = "VIRGIN_ISLANDS_BRITISH", e[e.VIRGIN_ISLANDS_US = 248] = "VIRGIN_ISLANDS_US", e[e.WALLIS_AND_FUTUNA = 249] = "WALLIS_AND_FUTUNA", e[e.WESTERN_SAHARA = 250] = "WESTERN_SAHARA", e[e.YEMEN = 251] = "YEMEN", e[e.YUGOSLAVIA = 252] = "YUGOSLAVIA", e[e.ZAMBIA = 253] = "ZAMBIA", e[e.ZIMBABWE = 254] = "ZIMBABWE", e[e.COUNT = 255] = "COUNT";
})(l0 || (l0 = {}));
var s;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.ALABAMA = 1] = "ALABAMA", e[e.ALASKA = 2] = "ALASKA", e[e.ALBERTA = 3] = "ALBERTA", e[e.ARIZONA = 4] = "ARIZONA", e[e.ARKANSAS = 5] = "ARKANSAS", e[e.AUSTRALIAN_CAPITAL_TERRITORY = 6] = "AUSTRALIAN_CAPITAL_TERRITORY", e[e.BRITISH_COLUMBIA = 7] = "BRITISH_COLUMBIA", e[e.CALIFORNIA = 8] = "CALIFORNIA", e[e.COLORADO = 9] = "COLORADO", e[e.CONNECTICUT = 10] = "CONNECTICUT", e[e.DELAWARE = 11] = "DELAWARE", e[e.DISTRICT_OF_COLUMBIA = 12] = "DISTRICT_OF_COLUMBIA", e[e.FLORIDA = 13] = "FLORIDA", e[e.GEORGIA = 14] = "GEORGIA", e[e.HAWAII = 15] = "HAWAII", e[e.IDAHO = 16] = "IDAHO", e[e.ILLINOIS = 17] = "ILLINOIS", e[e.INDIANA = 18] = "INDIANA", e[e.IOWA = 19] = "IOWA", e[e.KANSAS = 20] = "KANSAS", e[e.KENTUCKY = 21] = "KENTUCKY", e[e.LOUISIANA = 22] = "LOUISIANA", e[e.MAINE = 23] = "MAINE", e[e.MANITOBA = 24] = "MANITOBA", e[e.MARYLAND = 25] = "MARYLAND", e[e.MASSACHUSETTS = 26] = "MASSACHUSETTS", e[e.MICHIGAN = 27] = "MICHIGAN", e[e.MINNESOTA = 28] = "MINNESOTA", e[e.MISSISSIPPI = 29] = "MISSISSIPPI", e[e.MISSOURI = 30] = "MISSOURI", e[e.MONTANA = 31] = "MONTANA", e[e.NEBRASKA = 32] = "NEBRASKA", e[e.NEVADA = 33] = "NEVADA", e[e.NEW_BRUNSWICK = 34] = "NEW_BRUNSWICK", e[e.NEW_HAMPSHIRE = 35] = "NEW_HAMPSHIRE", e[e.NEW_JERSEY = 36] = "NEW_JERSEY", e[e.NEW_MEXICO = 37] = "NEW_MEXICO", e[e.NEW_SOUTH_WALES = 38] = "NEW_SOUTH_WALES", e[e.NEW_YORK = 39] = "NEW_YORK", e[e.NORTHERN_TERRITORY = 40] = "NORTHERN_TERRITORY", e[e.NORTH_CAROLINA = 41] = "NORTH_CAROLINA", e[e.NORTH_DAKOTA = 42] = "NORTH_DAKOTA", e[e.NOVA_SCOTIA = 43] = "NOVA_SCOTIA", e[e.OHIO = 44] = "OHIO", e[e.OKLAHOMA = 45] = "OKLAHOMA", e[e.ONTARIO = 46] = "ONTARIO", e[e.OREGON = 47] = "OREGON", e[e.PENNSYLVANIA = 48] = "PENNSYLVANIA", e[e.QUEBEC = 49] = "QUEBEC", e[e.QUEENSLAND = 50] = "QUEENSLAND", e[e.RHODE_ISLAND = 51] = "RHODE_ISLAND", e[e.SASKATCHEWAN = 52] = "SASKATCHEWAN", e[e.SOUTH_AUSTRALIA = 53] = "SOUTH_AUSTRALIA", e[e.SOUTH_CAROLINA = 54] = "SOUTH_CAROLINA", e[e.SOUTH_DAKOTA = 55] = "SOUTH_DAKOTA", e[e.TASMANIA = 56] = "TASMANIA", e[e.TENNESSEE = 57] = "TENNESSEE", e[e.TEXAS = 58] = "TEXAS", e[e.UTAH = 59] = "UTAH", e[e.VERMONT = 60] = "VERMONT", e[e.VICTORIA = 61] = "VICTORIA", e[e.VIRGINIA = 62] = "VIRGINIA", e[e.WASHINGTON = 63] = "WASHINGTON", e[e.WESTERN_AUSTRALIA = 64] = "WESTERN_AUSTRALIA", e[e.WEST_VIRGINIA = 65] = "WEST_VIRGINIA", e[e.WISCONSIN = 66] = "WISCONSIN", e[e.WYOMING = 67] = "WYOMING", e[e.YUKON = 68] = "YUKON", e[e.CIUDAD_DE_MEXICO = 69] = "CIUDAD_DE_MEXICO", e[e.JALISCO = 70] = "JALISCO", e[e.NEWFOUNDLAND_AND_LABRADOR = 71] = "NEWFOUNDLAND_AND_LABRADOR", e[e.NUEVO_LEON = 72] = "NUEVO_LEON", e[e.BAJA_CALIFORNIA = 73] = "BAJA_CALIFORNIA", e[e.CHIHUAHUA = 74] = "CHIHUAHUA", e[e.GUANAJUATO = 75] = "GUANAJUATO", e[e.GUERRERO = 76] = "GUERRERO", e[e.MEXICO = 77] = "MEXICO", e[e.MICHOACAN = 78] = "MICHOACAN", e[e.NEW_YORK_CITY = 79] = "NEW_YORK_CITY", e[e.TAMAULIPAS = 80] = "TAMAULIPAS", e[e.VERACRUZ = 81] = "VERACRUZ", e[e.CHIAPAS = 82] = "CHIAPAS", e[e.COAHUILA = 83] = "COAHUILA", e[e.DURANGO = 84] = "DURANGO", e[e.GUERRERO_COCULA = 85] = "GUERRERO_COCULA", e[e.GUERRERO_JUCHITAN = 86] = "GUERRERO_JUCHITAN", e[e.GUERRERO_TEPECOACUILCO = 87] = "GUERRERO_TEPECOACUILCO", e[e.GUERRERO_TLACOAPA = 88] = "GUERRERO_TLACOAPA", e[e.GUJARAT = 89] = "GUJARAT", e[e.HIDALGO = 90] = "HIDALGO", e[e.KARNATAKA = 91] = "KARNATAKA", e[e.KERALA = 92] = "KERALA", e[e.KHYBER_PAKHTUNKHWA = 93] = "KHYBER_PAKHTUNKHWA", e[e.MADHYA_PRADESH = 94] = "MADHYA_PRADESH", e[e.MAHARASHTRA = 95] = "MAHARASHTRA", e[e.MORELOS = 96] = "MORELOS", e[e.NAYARIT = 97] = "NAYARIT", e[e.OAXACA = 98] = "OAXACA", e[e.PUEBLA = 99] = "PUEBLA", e[e.PUNJAB = 100] = "PUNJAB", e[e.QUERETARO = 101] = "QUERETARO", e[e.SAN_LUIS_POTOSI = 102] = "SAN_LUIS_POTOSI", e[e.SINALOA = 103] = "SINALOA", e[e.SONORA = 104] = "SONORA", e[e.TABASCO = 105] = "TABASCO", e[e.TAMIL_NADU = 106] = "TAMIL_NADU", e[e.YUCATAN = 107] = "YUCATAN", e[e.ZACATECAS = 108] = "ZACATECAS", e[e.AGUASCALIENTES = 109] = "AGUASCALIENTES", e[e.BAJA_CALIFORNIA_SUR = 110] = "BAJA_CALIFORNIA_SUR", e[e.CAMPECHE = 111] = "CAMPECHE", e[e.COLIMA = 112] = "COLIMA", e[e.QUINTANA_ROO_BENITO_JUAREZ = 113] = "QUINTANA_ROO_BENITO_JUAREZ", e[e.UINTANA_ROO = 114] = "UINTANA_ROO", e[e.QUINTANA_ROO_SOLIDARIDAD = 115] = "QUINTANA_ROO_SOLIDARIDAD", e[e.TLAXCALA = 116] = "TLAXCALA", e[e.QUINTANA_ROO_COZUMEL = 117] = "QUINTANA_ROO_COZUMEL", e[e.COUNT = 118] = "COUNT";
})(s || (s = {}));
var l;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.CONSULAR_ID = 1] = "CONSULAR_ID", e[e.DL = 2] = "DL", e[e.DL_PUBLIC_SERVICES_CARD = 3] = "DL_PUBLIC_SERVICES_CARD", e[e.EMPLOYMENT_PASS = 4] = "EMPLOYMENT_PASS", e[e.FIN_CARD = 5] = "FIN_CARD", e[e.ID = 6] = "ID", e[e.MULTIPURPOSE_ID = 7] = "MULTIPURPOSE_ID", e[e.MyKad = 8] = "MyKad", e[e.MyKid = 9] = "MyKid", e[e.MyPR = 10] = "MyPR", e[e.MyTentera = 11] = "MyTentera", e[e.PAN_CARD = 12] = "PAN_CARD", e[e.PROFESSIONAL_ID = 13] = "PROFESSIONAL_ID", e[e.PUBLIC_SERVICES_CARD = 14] = "PUBLIC_SERVICES_CARD", e[e.RESIDENCE_PERMIT = 15] = "RESIDENCE_PERMIT", e[e.RESIDENT_ID = 16] = "RESIDENT_ID", e[e.TEMPORARY_RESIDENCE_PERMIT = 17] = "TEMPORARY_RESIDENCE_PERMIT", e[e.VOTER_ID = 18] = "VOTER_ID", e[e.WORK_PERMIT = 19] = "WORK_PERMIT", e[e.iKAD = 20] = "iKAD", e[e.MILITARY_ID = 21] = "MILITARY_ID", e[e.MyKAS = 22] = "MyKAS", e[e.SOCIAL_SECURITY_CARD = 23] = "SOCIAL_SECURITY_CARD", e[e.HEALTH_INSURANCE_CARD = 24] = "HEALTH_INSURANCE_CARD", e[e.PASSPORT = 25] = "PASSPORT", e[e.S_PASS = 26] = "S_PASS", e[e.ADDRESS_CARD = 27] = "ADDRESS_CARD", e[e.ALIEN_ID = 28] = "ALIEN_ID", e[e.ALIEN_PASSPORT = 29] = "ALIEN_PASSPORT", e[e.GREEN_CARD = 30] = "GREEN_CARD", e[e.MINORS_ID = 31] = "MINORS_ID", e[e.POSTAL_ID = 32] = "POSTAL_ID", e[e.PROFESSIONAL_DL = 33] = "PROFESSIONAL_DL", e[e.TAX_ID = 34] = "TAX_ID", e[e.WEAPON_PERMIT = 35] = "WEAPON_PERMIT", e[e.VISA = 36] = "VISA", e[e.BORDER_CROSSING_CARD = 37] = "BORDER_CROSSING_CARD", e[e.DRIVER_CARD = 38] = "DRIVER_CARD", e[e.GLOBAL_ENTRY_CARD = 39] = "GLOBAL_ENTRY_CARD", e[e.MyPolis = 40] = "MyPolis", e[e.NEXUS_CARD = 41] = "NEXUS_CARD", e[e.PASSPORT_CARD = 42] = "PASSPORT_CARD", e[e.PROOF_OF_AGE_CARD = 43] = "PROOF_OF_AGE_CARD", e[e.REFUGEE_ID = 44] = "REFUGEE_ID", e[e.TRIBAL_ID = 45] = "TRIBAL_ID", e[e.VETERAN_ID = 46] = "VETERAN_ID", e[e.CITIZENSHIP_CERTIFICATE = 47] = "CITIZENSHIP_CERTIFICATE", e[e.MY_NUMBER_CARD = 48] = "MY_NUMBER_CARD", e[e.CONSULAR_PASSPORT = 49] = "CONSULAR_PASSPORT", e[e.MINORS_PASSPORT = 50] = "MINORS_PASSPORT", e[e.MINORS_PUBLIC_SERVICES_CARD = 51] = "MINORS_PUBLIC_SERVICES_CARD", e[e.COUNT = 52] = "COUNT";
})(l || (l = {}));
var u0;
(function(e) {
  e[e.NotAvailable = 0] = "NotAvailable", e[e.BlackAndWhite = 1] = "BlackAndWhite", e[e.Color = 2] = "Color";
})(u0 || (u0 = {}));
var c0;
(function(e) {
  e[e.NotAvailable = 0] = "NotAvailable", e[e.NotDetected = 1] = "NotDetected", e[e.Detected = 2] = "Detected";
})(c0 || (c0 = {}));
var d0;
(function(e) {
  e[e.Success = 0] = "Success", e[e.DetectionFailed = 1] = "DetectionFailed", e[e.ImagePreprocessingFailed = 2] = "ImagePreprocessingFailed", e[e.StabilityTestFailed = 3] = "StabilityTestFailed", e[e.ScanningWrongSide = 4] = "ScanningWrongSide", e[e.FieldIdentificationFailed = 5] = "FieldIdentificationFailed", e[e.MandatoryFieldMissing = 6] = "MandatoryFieldMissing", e[e.InvalidCharactersFound = 7] = "InvalidCharactersFound", e[e.ImageReturnFailed = 8] = "ImageReturnFailed", e[e.BarcodeRecognitionFailed = 9] = "BarcodeRecognitionFailed", e[e.MrzParsingFailed = 10] = "MrzParsingFailed", e[e.ClassFiltered = 11] = "ClassFiltered", e[e.UnsupportedClass = 12] = "UnsupportedClass", e[e.UnsupportedByLicense = 13] = "UnsupportedByLicense", e[e.AwaitingOtherSide = 14] = "AwaitingOtherSide", e[e.Count = 15] = "Count";
})(d0 || (d0 = {}));
var I0;
(function(e) {
  e[e.None = 0] = "None", e[e.MrzId = 1] = "MrzId", e[e.MrzVisa = 2] = "MrzVisa", e[e.MrzPassport = 3] = "MrzPassport", e[e.PhotoId = 4] = "PhotoId", e[e.FullRecognition = 5] = "FullRecognition", e[e.BarcodeId = 6] = "BarcodeId", e[e.Count = 7] = "Count";
})(I0 || (I0 = {}));
function O0(e) {
  return l1(this, void 0, void 0, function* () {
    return e.mbWasmModule.newRecognizer("BlinkIdRecognizer");
  });
}
function E0(e) {
  return l1(this, void 0, void 0, function* () {
    return e.mbWasmModule.newRecognizer("BlinkIdCombinedRecognizer");
  });
}
var A0;
(function(e) {
  e[e.None = 0] = "None", e[e.AAMVACompliant = 1] = "AAMVACompliant", e[e.ArgentinaID = 2] = "ArgentinaID", e[e.ArgentinaAlienID = 3] = "ArgentinaAlienID", e[e.ArgentinaDL = 4] = "ArgentinaDL", e[e.ColombiaID = 5] = "ColombiaID", e[e.ColombiaDL = 6] = "ColombiaDL", e[e.NigeriaVoterID = 7] = "NigeriaVoterID", e[e.NigeriaDL = 8] = "NigeriaDL", e[e.PanamaID = 9] = "PanamaID", e[e.SouthAfricaID = 10] = "SouthAfricaID";
})(A0 || (A0 = {}));
function K1(e) {
  return typeof e == "object" && e != null;
}
function W0(e) {
  return K1(e) && Object.prototype.hasOwnProperty.call(e, "code") && Object.values(c2).includes(e.code);
}
var H1 = /* @__PURE__ */ new Map();
H1.set([77, 105, 99, 114, 111, 98, 108, 105, 110, 107], "Scandit");
H1.set([66, 108, 105, 110, 107, 73, 68], "ID Capture");
var B = class {
  constructor() {
    n(this, "licenseKey");
    n(this, "wasmSDK");
  }
  static async load(t) {
    let i = new B();
    try {
      await i.initCentaurus(t);
    } catch (r) {
      if (W0(r)) {
        if (r.code === c2.LICENSE_UNLOCK_ERROR)
          throw new J({ message: "Invalid license key. Platform or domain may be incorrect.", name: "IdCaptureLoadingError" });
        if (r.code === c2.SDK_LICENSE_KEY_MISSING)
          throw new J({ message: "Invalid license key (sub-part is missing).", name: "IdCaptureLoadingError" });
      }
      throw new J({ message: B.replaceCentaurusMentions(K1(r) ? r.message : "(no message)", H1), name: "IdCaptureLoadingError" });
    }
    return i;
  }
  static replaceCentaurusMentions(t, i) {
    return typeof t == "string" ? [...i.entries()].reduce((r, [a, o]) => {
      let d = a.map((R2) => String.fromCodePoint(R2)).join("");
      return r.replace(new RegExp(d, "gi"), o);
    }, t) : "(no message)";
  }
  async initCentaurus(t) {
    this.licenseKey = t.licenseKey;
    let i = new T1(t.licenseKey);
    i.engineLocation = t.libraryLocation;
    let r = new URL("Centaurus.worker.min.js", t.libraryLocation).toString(), a = new Blob([`importScripts("${r}");`], { type: "text/javascript" });
    i.workerLocation = URL.createObjectURL(a), i.allowHelloMessage = false, i.wasmModuleName = "Centaurus", this.wasmSDK = await S0(i);
  }
};
var V0 = URL.createObjectURL(new Blob([new Uint8Array([40, 40, 41, 61, 62, 123, 118, 97, 114, 32, 36, 61, 79, 98, 106, 101, 99, 116, 46, 100, 101, 102, 105, 110, 101, 80, 114, 111, 112, 101, 114, 116, 121, 59, 118, 97, 114, 32, 86, 61, 40, 101, 44, 116, 44, 114, 41, 61, 62, 116, 32, 105, 110, 32, 101, 63, 36, 40, 101, 44, 116, 44, 123, 101, 110, 117, 109, 101, 114, 97, 98, 108, 101, 58, 33, 48, 44, 99, 111, 110, 102, 105, 103, 117, 114, 97, 98, 108, 101, 58, 33, 48, 44, 119, 114, 105, 116, 97, 98, 108, 101, 58, 33, 48, 44, 118, 97, 108, 117, 101, 58, 114, 125, 41, 58, 101, 91, 116, 93, 61, 114, 59, 118, 97, 114, 32, 103, 61, 40, 101, 44, 116, 44, 114, 41, 61, 62, 40, 86, 40, 101, 44, 116, 121, 112, 101, 111, 102, 32, 116, 33, 61, 34, 115, 121, 109, 98, 111, 108, 34, 63, 116, 43, 34, 34, 58, 116, 44, 114, 41, 44, 114, 41, 59, 118, 97, 114, 32, 72, 61, 79, 98, 106, 101, 99, 116, 46, 100, 101, 102, 105, 110, 101, 80, 114, 111, 112, 101, 114, 116, 121, 59, 118, 97, 114, 32, 74, 61, 40, 101, 44, 116, 44, 114, 41, 61, 62, 116, 32, 105, 110, 32, 101, 63, 72, 40, 101, 44, 116, 44, 123, 101, 110, 117, 109, 101, 114, 97, 98, 108, 101, 58, 33, 48, 44, 99, 111, 110, 102, 105, 103, 117, 114, 97, 98, 108, 101, 58, 33, 48, 44, 119, 114, 105, 116, 97, 98, 108, 101, 58, 33, 48, 44, 118, 97, 108, 117, 101, 58, 114, 125, 41, 58, 101, 91, 116, 93, 61, 114, 59, 118, 97, 114, 32, 109, 61, 40, 101, 44, 116, 44, 114, 41, 61, 62, 40, 74, 40, 101, 44, 116, 121, 112, 101, 111, 102, 32, 116, 33, 61, 34, 115, 121, 109, 98, 111, 108, 34, 63, 116, 43, 34, 34, 58, 116, 44, 114, 41, 44, 114, 41, 44, 99, 59, 40, 101, 61, 62, 123, 108, 101, 116, 32, 116, 59, 40, 100, 61, 62, 40, 100, 46, 68, 101, 98, 117, 103, 61, 34, 100, 101, 98, 117, 103, 34, 44, 100, 46, 73, 110, 102, 111, 61, 34, 105, 110, 102, 111, 34, 44, 100, 46, 87, 97, 114, 110, 61, 34, 119, 97, 114, 110, 34, 44, 100, 46, 69, 114, 114, 111, 114, 61, 34, 101, 114, 114, 111, 114, 34, 44, 100, 46, 81, 117, 105, 101, 116, 61, 34, 113, 117, 105, 101, 116, 34, 41, 41, 40, 116, 61, 101, 46, 76, 101, 118, 101, 108, 124, 124, 40, 101, 46, 76, 101, 118, 101, 108, 61, 123, 125, 41, 41, 59, 108, 101, 116, 32, 114, 61, 110, 101, 119, 32, 77, 97, 112, 40, 91, 91, 34, 100, 101, 98, 117, 103, 34, 44, 49, 93, 44, 91, 34, 105, 110, 102, 111, 34, 44, 50, 93, 44, 91, 34, 119, 97, 114, 110, 34, 44, 51, 93, 44, 91, 34, 101, 114, 114, 111, 114, 34, 44, 52, 93, 44, 91, 34, 113, 117, 105, 101, 116, 34, 44, 53, 93, 93, 41, 44, 105, 61, 34, 100, 101, 98, 117, 103, 34, 59, 102, 117, 110, 99, 116, 105, 111, 110, 32, 97, 40, 100, 41, 123, 105, 61, 100, 125, 101, 46, 115, 101, 116, 76, 101, 118, 101, 108, 61, 97, 59, 102, 117, 110, 99, 116, 105, 111, 110, 32, 111, 40, 100, 44, 46, 46, 46, 110, 41, 123, 105, 102, 40, 33, 40, 114, 46, 103, 101, 116, 40, 105, 41, 62, 114, 46, 103, 101, 116, 40, 100, 41, 41, 41, 115, 119, 105, 116, 99, 104, 40, 100, 41, 123, 99, 97, 115, 101, 34, 100, 101, 98, 117, 103, 34, 58, 99, 111, 110, 115, 111, 108, 101, 46, 100, 101, 98, 117, 103, 40, 46, 46, 46, 110, 41, 59, 98, 114, 101, 97, 107, 59, 99, 97, 115, 101, 34, 105, 110, 102, 111, 34, 58, 99, 111, 110, 115, 111, 108, 101, 46, 108, 111, 103, 40, 46, 46, 46, 110, 41, 59, 98, 114, 101, 97, 107, 59, 99, 97, 115, 101, 34, 119, 97, 114, 110, 34, 58, 99, 111, 110, 115, 111, 108, 101, 46, 119, 97, 114, 110, 40, 46, 46, 46, 110, 41, 59, 98, 114, 101, 97, 107, 59, 99, 97, 115, 101, 34, 101, 114, 114, 111, 114, 34, 58, 99, 111, 110, 115, 111, 108, 101, 46, 101, 114, 114, 111, 114, 40, 46, 46, 46, 110, 41, 59, 98, 114, 101, 97, 107, 59, 100, 101, 102, 97, 117, 108, 116, 58, 98, 114, 101, 97, 107, 125, 125, 101, 46, 108, 111, 103, 61, 111, 125, 41, 40, 99, 124, 124, 40, 99, 61, 123, 125, 41, 41, 59, 102, 117, 110, 99, 116, 105, 111, 110, 32, 85, 40, 101, 44, 116, 44, 114, 44, 105, 41, 123, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 97, 40, 115, 41, 123, 116, 114, 121, 123, 108, 101, 116, 32, 108, 61, 97, 119, 97, 105, 116, 40, 115, 33, 61, 110, 117, 108, 108, 63, 115, 58, 97, 119, 97, 105, 116, 32, 104, 40, 33, 48, 41, 41, 46, 97, 114, 114, 97, 121, 66, 117, 102, 102, 101, 114, 40, 41, 44, 117, 61, 97, 119, 97, 105, 116, 32, 115, 101, 108, 102, 46, 87, 101, 98, 65, 115, 115, 101, 109, 98, 108, 121, 46, 105, 110, 115, 116, 97, 110, 116, 105, 97, 116, 101, 40, 108, 44, 101, 41, 59, 105, 40, 117, 46, 105, 110, 115, 116, 97, 110, 99, 101, 44, 117, 46, 109, 111, 100, 117, 108, 101, 41, 125, 99, 97, 116, 99, 104, 40, 108, 41, 123, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 69, 114, 114, 111, 114, 44, 108, 41, 44, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 69, 114, 114, 111, 114, 44, 96, 67, 111, 117, 108, 100, 110, 39, 116, 32, 105, 110, 115, 116, 97, 110, 116, 105, 97, 116, 101, 32, 83, 99, 97, 110, 100, 105, 116, 32, 83, 68, 75, 32, 68, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 32, 108, 105, 98, 114, 97, 114, 121, 32, 97, 116, 32, 36, 123, 116, 125, 44, 32, 100, 105, 100, 32, 121, 111, 117, 32, 99, 111, 110, 102, 105, 103, 117, 114, 101, 32, 116, 104, 101, 32, 112, 97, 116, 104, 32, 102, 111, 114, 32, 105, 116, 32, 99, 111, 114, 114, 101, 99, 116, 108, 121, 63, 96, 41, 125, 125, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 111, 40, 41, 123, 108, 101, 116, 32, 115, 61, 97, 119, 97, 105, 116, 32, 104, 40, 33, 49, 41, 59, 116, 114, 121, 123, 108, 101, 116, 32, 108, 61, 97, 119, 97, 105, 116, 32, 115, 101, 108, 102, 46, 87, 101, 98, 65, 115, 115, 101, 109, 98, 108, 121, 46, 105, 110, 115, 116, 97, 110, 116, 105, 97, 116, 101, 83, 116, 114, 101, 97, 109, 105, 110, 103, 40, 115, 44, 101, 41, 59, 105, 40, 108, 46, 105, 110, 115, 116, 97, 110, 99, 101, 44, 108, 46, 109, 111, 100, 117, 108, 101, 41, 125, 99, 97, 116, 99, 104, 40, 108, 41, 123, 114, 101, 116, 117, 114, 110, 32, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 87, 97, 114, 110, 44, 108, 41, 44, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 87, 97, 114, 110, 44, 34, 87, 101, 98, 65, 115, 115, 101, 109, 98, 108, 121, 32, 115, 116, 114, 101, 97, 109, 105, 110, 103, 32, 99, 111, 109, 112, 105, 108, 101, 32, 102, 97, 105, 108, 101, 100, 46, 32, 70, 97, 108, 108, 105, 110, 103, 32, 98, 97, 99, 107, 32, 116, 111, 32, 65, 114, 114, 97, 121, 66, 117, 102, 102, 101, 114, 32, 105, 110, 115, 116, 97, 110, 116, 105, 97, 116, 105, 111, 110, 32, 40, 116, 104, 105, 115, 32, 119, 105, 108, 108, 32, 109, 97, 107, 101, 32, 116, 104, 105, 110, 103, 115, 32, 115, 108, 111, 119, 101, 114, 41, 34, 41, 44, 97, 40, 115, 46, 98, 111, 100, 121, 85, 115, 101, 100, 63, 118, 111, 105, 100, 32, 48, 58, 115, 41, 125, 125, 102, 117, 110, 99, 116, 105, 111, 110, 32, 100, 40, 115, 41, 123, 114, 101, 116, 117, 114, 110, 91, 46, 46, 46, 110, 101, 119, 32, 85, 105, 110, 116, 56, 65, 114, 114, 97, 121, 40, 115, 41, 93, 46, 109, 97, 112, 40, 108, 61, 62, 123, 108, 101, 116, 32, 117, 61, 108, 46, 116, 111, 83, 116, 114, 105, 110, 103, 40, 49, 54, 41, 59, 114, 101, 116, 117, 114, 110, 32, 117, 46, 108, 101, 110, 103, 116, 104, 61, 61, 61, 49, 63, 96, 48, 36, 123, 117, 125, 96, 58, 117, 125, 41, 46, 106, 111, 105, 110, 40, 34, 34, 41, 125, 102, 117, 110, 99, 116, 105, 111, 110, 32, 110, 40, 115, 41, 123, 116, 121, 112, 101, 111, 102, 32, 99, 114, 121, 112, 116, 111, 46, 115, 117, 98, 116, 108, 101, 46, 100, 105, 103, 101, 115, 116, 61, 61, 34, 102, 117, 110, 99, 116, 105, 111, 110, 34, 63, 99, 114, 121, 112, 116, 111, 46, 115, 117, 98, 116, 108, 101, 46, 100, 105, 103, 101, 115, 116, 40, 34, 83, 72, 65, 45, 50, 53, 54, 34, 44, 115, 41, 46, 116, 104, 101, 110, 40, 108, 61, 62, 123, 108, 101, 116, 32, 117, 61, 100, 40, 108, 41, 59, 114, 124, 124, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 87, 97, 114, 110, 44, 34, 84, 104, 101, 32, 108, 105, 98, 114, 97, 114, 121, 32, 104, 97, 115, 104, 32, 105, 115, 32, 110, 111, 116, 32, 100, 101, 102, 105, 110, 101, 100, 32, 111, 114, 32, 101, 109, 112, 116, 121, 44, 32, 99, 97, 110, 110, 111, 116, 32, 99, 111, 114, 114, 101, 99, 116, 108, 121, 32, 118, 101, 114, 105, 102, 121, 32, 105, 110, 116, 101, 103, 114, 105, 116, 121, 46, 34, 41, 44, 117, 33, 61, 61, 114, 38, 38, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 87, 97, 114, 110, 44, 96, 84, 104, 101, 32, 83, 99, 97, 110, 100, 105, 116, 32, 68, 97, 116, 97, 32, 67, 97, 112, 116, 117, 114, 101, 32, 108, 105, 98, 114, 97, 114, 121, 32, 87, 65, 83, 77, 32, 102, 105, 108, 101, 32, 102, 111, 117, 110, 100, 32, 97, 116, 32, 36, 123, 116, 125, 32, 115, 101, 101, 109, 115, 32, 105, 110, 118, 97, 108, 105, 100, 58, 32, 101, 120, 112, 101, 99, 116, 101, 100, 32, 102, 105, 108, 101, 32, 104, 97, 115, 104, 32, 100, 111, 101, 115, 110, 39, 116, 32, 109, 97, 116, 99, 104, 32, 40, 114, 101, 99, 101, 105, 118, 101, 100, 58, 32, 36, 123, 117, 125, 44, 32, 101, 120, 112, 101, 99, 116, 101, 100, 58, 32, 36, 123, 114, 125, 41, 46, 32, 80, 108, 101, 97, 115, 101, 32, 101, 110, 115, 117, 114, 101, 32, 116, 104, 101, 32, 99, 111, 114, 114, 101, 99, 116, 32, 83, 99, 97, 110, 100, 105, 116, 32, 68, 97, 116, 97, 32, 67, 97, 112, 116, 117, 114, 101, 32, 102, 105, 108, 101, 32, 40, 119, 105, 116, 104, 32, 99, 111, 114, 114, 101, 99, 116, 32, 118, 101, 114, 115, 105, 111, 110, 41, 32, 105, 115, 32, 114, 101, 116, 114, 105, 101, 118, 101, 100, 46, 96, 41, 125, 41, 46, 99, 97, 116, 99, 104, 40, 40, 41, 61, 62, 123, 125, 41, 58, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 87, 97, 114, 110, 44, 96, 73, 110, 115, 101, 99, 117, 114, 101, 32, 99, 111, 110, 116, 101, 120, 116, 32, 40, 115, 101, 101, 32, 104, 116, 116, 112, 115, 58, 47, 47, 100, 101, 118, 101, 108, 111, 112, 101, 114, 46, 109, 111, 122, 105, 108, 108, 97, 46, 111, 114, 103, 47, 101, 110, 45, 85, 83, 47, 100, 111, 99, 115, 47, 87, 101, 98, 47, 83, 101, 99, 117, 114, 105, 116, 121, 47, 83, 101, 99, 117, 114, 101, 95, 67, 111, 110, 116, 101, 120, 116, 115, 41, 58, 32, 84, 104, 101, 32, 104, 97, 115, 104, 32, 111, 102, 32, 116, 104, 101, 32, 83, 99, 97, 110, 100, 105, 116, 32, 68, 97, 116, 97, 32, 67, 97, 112, 116, 117, 114, 101, 32, 108, 105, 98, 114, 97, 114, 121, 32, 87, 65, 83, 77, 32, 102, 105, 108, 101, 32, 102, 111, 117, 110, 100, 32, 97, 116, 32, 36, 123, 116, 125, 32, 99, 111, 117, 108, 100, 32, 110, 111, 116, 32, 98, 101, 32, 118, 101, 114, 105, 102, 105, 101, 100, 96, 41, 125, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 104, 40, 115, 41, 123, 114, 101, 116, 117, 114, 110, 32, 110, 101, 119, 32, 80, 114, 111, 109, 105, 115, 101, 40, 40, 108, 44, 117, 41, 61, 62, 123, 102, 101, 116, 99, 104, 40, 116, 41, 46, 116, 104, 101, 110, 40, 112, 61, 62, 123, 112, 46, 111, 107, 63, 40, 112, 46, 99, 108, 111, 110, 101, 40, 41, 46, 97, 114, 114, 97, 121, 66, 117, 102, 102, 101, 114, 40, 41, 46, 116, 104, 101, 110, 40, 67, 61, 62, 123, 115, 38, 38, 108, 40, 112, 41, 44, 110, 40, 67, 41, 125, 41, 46, 99, 97, 116, 99, 104, 40, 67, 61, 62, 123, 115, 38, 38, 117, 40, 67, 41, 125, 41, 44, 115, 124, 124, 108, 40, 112, 41, 41, 58, 117, 40, 110, 101, 119, 32, 69, 114, 114, 111, 114, 40, 34, 72, 84, 84, 80, 32, 115, 116, 97, 116, 117, 115, 32, 99, 111, 100, 101, 32, 105, 115, 32, 110, 111, 116, 32, 111, 107, 34, 41, 41, 125, 41, 46, 99, 97, 116, 99, 104, 40, 112, 61, 62, 123, 117, 40, 112, 41, 125, 41, 125, 41, 125, 116, 121, 112, 101, 111, 102, 32, 115, 101, 108, 102, 46, 87, 101, 98, 65, 115, 115, 101, 109, 98, 108, 121, 46, 105, 110, 115, 116, 97, 110, 116, 105, 97, 116, 101, 83, 116, 114, 101, 97, 109, 105, 110, 103, 61, 61, 34, 102, 117, 110, 99, 116, 105, 111, 110, 34, 63, 111, 40, 41, 58, 97, 40, 41, 125, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 66, 40, 101, 41, 123, 108, 101, 116, 32, 116, 44, 123, 112, 114, 101, 108, 111, 97, 100, 105, 110, 103, 58, 114, 125, 61, 101, 44, 105, 61, 80, 114, 111, 109, 105, 115, 101, 46, 114, 101, 115, 111, 108, 118, 101, 40, 41, 44, 97, 61, 33, 49, 44, 111, 61, 33, 49, 59, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 100, 40, 41, 123, 108, 101, 116, 32, 115, 61, 34, 70, 73, 76, 69, 95, 68, 65, 84, 65, 34, 44, 108, 44, 117, 44, 112, 59, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 40, 41, 123, 117, 46, 114, 101, 115, 117, 108, 116, 46, 99, 108, 111, 115, 101, 40, 41, 44, 112, 46, 114, 101, 115, 117, 108, 116, 46, 99, 108, 111, 115, 101, 40, 41, 44, 108, 40, 48, 41, 125, 102, 117, 110, 99, 116, 105, 111, 110, 32, 119, 40, 41, 123, 116, 114, 121, 123, 108, 101, 116, 32, 98, 61, 91, 93, 44, 68, 61, 117, 46, 114, 101, 115, 117, 108, 116, 46, 116, 114, 97, 110, 115, 97, 99, 116, 105, 111, 110, 40, 115, 44, 34, 114, 101, 97, 100, 111, 110, 108, 121, 34, 41, 59, 68, 46, 111, 110, 101, 114, 114, 111, 114, 61, 67, 59, 108, 101, 116, 32, 83, 61, 68, 46, 111, 98, 106, 101, 99, 116, 83, 116, 111, 114, 101, 40, 115, 41, 46, 111, 112, 101, 110, 67, 117, 114, 115, 111, 114, 40, 41, 59, 83, 46, 111, 110, 115, 117, 99, 99, 101, 115, 115, 61, 40, 41, 61, 62, 123, 108, 101, 116, 32, 77, 61, 83, 46, 114, 101, 115, 117, 108, 116, 59, 105, 102, 40, 77, 61, 61, 110, 117, 108, 108, 41, 116, 114, 121, 123, 108, 101, 116, 32, 76, 61, 48, 44, 102, 61, 112, 46, 114, 101, 115, 117, 108, 116, 46, 116, 114, 97, 110, 115, 97, 99, 116, 105, 111, 110, 40, 115, 44, 34, 114, 101, 97, 100, 119, 114, 105, 116, 101, 34, 41, 44, 121, 61, 102, 46, 111, 98, 106, 101, 99, 116, 83, 116, 111, 114, 101, 40, 115, 41, 59, 102, 46, 111, 110, 101, 114, 114, 111, 114, 61, 67, 44, 102, 46, 111, 110, 99, 111, 109, 112, 108, 101, 116, 101, 61, 40, 41, 61, 62, 123, 117, 46, 114, 101, 115, 117, 108, 116, 46, 99, 108, 111, 115, 101, 40, 41, 44, 112, 46, 114, 101, 115, 117, 108, 116, 46, 99, 108, 111, 115, 101, 40, 41, 44, 108, 40, 76, 41, 125, 59, 102, 111, 114, 40, 108, 101, 116, 32, 107, 32, 111, 102, 32, 98, 41, 123, 108, 101, 116, 32, 118, 61, 121, 46, 99, 111, 117, 110, 116, 40, 107, 46, 112, 114, 105, 109, 97, 114, 121, 75, 101, 121, 41, 59, 118, 46, 111, 110, 115, 117, 99, 99, 101, 115, 115, 61, 40, 41, 61, 62, 123, 118, 46, 114, 101, 115, 117, 108, 116, 61, 61, 61, 48, 38, 38, 40, 43, 43, 76, 44, 121, 46, 97, 100, 100, 40, 107, 46, 118, 97, 108, 117, 101, 44, 107, 46, 112, 114, 105, 109, 97, 114, 121, 75, 101, 121, 41, 41, 125, 125, 125, 99, 97, 116, 99, 104, 40, 76, 41, 123, 67, 46, 99, 97, 108, 108, 40, 123, 101, 114, 114, 111, 114, 58, 76, 125, 41, 125, 101, 108, 115, 101, 32, 98, 46, 112, 117, 115, 104, 40, 123, 118, 97, 108, 117, 101, 58, 77, 46, 118, 97, 108, 117, 101, 44, 112, 114, 105, 109, 97, 114, 121, 75, 101, 121, 58, 77, 46, 112, 114, 105, 109, 97, 114, 121, 75, 101, 121, 46, 116, 111, 83, 116, 114, 105, 110, 103, 40, 41, 46, 114, 101, 112, 108, 97, 99, 101, 40, 96, 36, 123, 101, 46, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 80, 114, 101, 108, 111, 97, 100, 125, 47, 96, 44, 96, 36, 123, 101, 46, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 83, 116, 97, 110, 100, 97, 114, 100, 125, 47, 96, 41, 125, 41, 44, 77, 46, 99, 111, 110, 116, 105, 110, 117, 101, 40, 41, 125, 44, 83, 46, 111, 110, 101, 114, 114, 111, 114, 61, 67, 125, 99, 97, 116, 99, 104, 40, 98, 41, 123, 67, 46, 99, 97, 108, 108, 40, 123, 101, 114, 114, 111, 114, 58, 98, 125, 41, 125, 125, 114, 101, 116, 117, 114, 110, 32, 110, 101, 119, 32, 80, 114, 111, 109, 105, 115, 101, 40, 98, 61, 62, 123, 108, 61, 98, 44, 117, 61, 105, 110, 100, 101, 120, 101, 100, 68, 66, 46, 111, 112, 101, 110, 40, 101, 46, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 80, 114, 101, 108, 111, 97, 100, 41, 44, 117, 46, 111, 110, 117, 112, 103, 114, 97, 100, 101, 110, 101, 101, 100, 101, 100, 61, 40, 41, 61, 62, 123, 116, 114, 121, 123, 117, 46, 114, 101, 115, 117, 108, 116, 46, 99, 114, 101, 97, 116, 101, 79, 98, 106, 101, 99, 116, 83, 116, 111, 114, 101, 40, 115, 41, 125, 99, 97, 116, 99, 104, 40, 68, 41, 123, 125, 125, 44, 117, 46, 111, 110, 115, 117, 99, 99, 101, 115, 115, 61, 40, 41, 61, 62, 123, 105, 102, 40, 33, 65, 114, 114, 97, 121, 46, 102, 114, 111, 109, 40, 117, 46, 114, 101, 115, 117, 108, 116, 46, 111, 98, 106, 101, 99, 116, 83, 116, 111, 114, 101, 78, 97, 109, 101, 115, 41, 46, 105, 110, 99, 108, 117, 100, 101, 115, 40, 115, 41, 41, 123, 98, 40, 48, 41, 59, 114, 101, 116, 117, 114, 110, 125, 112, 61, 105, 110, 100, 101, 120, 101, 100, 68, 66, 46, 111, 112, 101, 110, 40, 101, 46, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 83, 116, 97, 110, 100, 97, 114, 100, 41, 44, 112, 46, 111, 110, 117, 112, 103, 114, 97, 100, 101, 110, 101, 101, 100, 101, 100, 61, 40, 41, 61, 62, 123, 116, 114, 121, 123, 112, 46, 114, 101, 115, 117, 108, 116, 46, 99, 114, 101, 97, 116, 101, 79, 98, 106, 101, 99, 116, 83, 116, 111, 114, 101, 40, 115, 41, 125, 99, 97, 116, 99, 104, 40, 68, 41, 123, 125, 125, 44, 112, 46, 111, 110, 115, 117, 99, 99, 101, 115, 115, 61, 40, 41, 61, 62, 123, 119, 40, 41, 125, 44, 112, 46, 111, 110, 98, 108, 111, 99, 107, 101, 100, 61, 112, 46, 111, 110, 101, 114, 114, 111, 114, 61, 67, 125, 44, 117, 46, 111, 110, 98, 108, 111, 99, 107, 101, 100, 61, 117, 46, 111, 110, 101, 114, 114, 111, 114, 61, 67, 125, 41, 125, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 110, 40, 115, 44, 108, 41, 123, 105, 102, 40, 116, 33, 61, 110, 117, 108, 108, 41, 114, 101, 116, 117, 114, 110, 32, 97, 61, 33, 48, 44, 110, 101, 119, 32, 80, 114, 111, 109, 105, 115, 101, 40, 40, 117, 44, 112, 41, 61, 62, 123, 40, 33, 114, 38, 38, 115, 63, 100, 40, 41, 58, 80, 114, 111, 109, 105, 115, 101, 46, 114, 101, 115, 111, 108, 118, 101, 40, 48, 41, 41, 46, 116, 104, 101, 110, 40, 67, 61, 62, 123, 105, 102, 40, 33, 114, 38, 38, 115, 38, 38, 33, 108, 38, 38, 67, 61, 61, 61, 48, 41, 123, 97, 61, 33, 49, 44, 117, 40, 41, 59, 114, 101, 116, 117, 114, 110, 125, 116, 40, 115, 44, 119, 61, 62, 123, 105, 102, 40, 97, 61, 33, 49, 44, 119, 33, 61, 110, 117, 108, 108, 41, 123, 112, 40, 119, 41, 59, 114, 101, 116, 117, 114, 110, 125, 117, 40, 41, 125, 41, 125, 41, 46, 99, 97, 116, 99, 104, 40, 112, 41, 125, 41, 125, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 104, 40, 115, 44, 108, 61, 33, 49, 44, 117, 61, 33, 49, 41, 123, 114, 101, 116, 117, 114, 110, 40, 33, 111, 124, 124, 117, 41, 38, 38, 40, 97, 63, 40, 111, 61, 33, 48, 44, 105, 61, 105, 46, 116, 104, 101, 110, 40, 97, 115, 121, 110, 99, 40, 41, 61, 62, 40, 111, 61, 33, 49, 44, 110, 40, 115, 44, 108, 41, 41, 41, 41, 58, 105, 61, 110, 40, 115, 44, 108, 41, 41, 44, 105, 125, 116, 61, 70, 83, 46, 115, 121, 110, 99, 102, 115, 44, 70, 83, 46, 115, 121, 110, 99, 102, 115, 61, 40, 115, 44, 108, 41, 61, 62, 123, 108, 101, 116, 32, 117, 61, 108, 59, 108, 61, 112, 61, 62, 123, 117, 40, 112, 41, 125, 44, 104, 40, 115, 41, 46, 116, 104, 101, 110, 40, 108, 41, 46, 99, 97, 116, 99, 104, 40, 108, 41, 125, 59, 116, 114, 121, 123, 70, 83, 46, 109, 107, 100, 105, 114, 40, 101, 46, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 41, 125, 99, 97, 116, 99, 104, 40, 115, 41, 123, 105, 102, 40, 115, 46, 99, 111, 100, 101, 33, 61, 61, 34, 69, 69, 88, 73, 83, 84, 34, 41, 114, 101, 116, 117, 114, 110, 32, 116, 61, 118, 111, 105, 100, 32, 48, 44, 80, 114, 111, 109, 105, 115, 101, 46, 114, 101, 106, 101, 99, 116, 40, 115, 41, 125, 114, 101, 116, 117, 114, 110, 32, 70, 83, 46, 109, 111, 117, 110, 116, 40, 73, 68, 66, 70, 83, 44, 123, 125, 44, 101, 46, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 41, 44, 104, 40, 33, 48, 44, 33, 48, 41, 125, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 84, 40, 101, 44, 116, 44, 114, 44, 105, 41, 123, 114, 101, 116, 117, 114, 110, 32, 110, 101, 119, 32, 80, 114, 111, 109, 105, 115, 101, 40, 40, 97, 44, 111, 41, 61, 62, 123, 101, 40, 41, 46, 116, 104, 101, 110, 40, 97, 41, 46, 99, 97, 116, 99, 104, 40, 100, 61, 62, 123, 108, 101, 116, 32, 110, 61, 116, 42, 50, 59, 105, 102, 40, 110, 62, 114, 41, 123, 111, 40, 100, 41, 59, 114, 101, 116, 117, 114, 110, 125, 105, 40, 100, 41, 44, 115, 101, 116, 84, 105, 109, 101, 111, 117, 116, 40, 40, 41, 61, 62, 123, 84, 40, 101, 44, 110, 44, 114, 44, 105, 41, 46, 116, 104, 101, 110, 40, 97, 41, 46, 99, 97, 116, 99, 104, 40, 111, 41, 125, 44, 116, 41, 125, 41, 125, 41, 125, 118, 97, 114, 32, 87, 61, 99, 108, 97, 115, 115, 32, 101, 120, 116, 101, 110, 100, 115, 32, 69, 114, 114, 111, 114, 123, 99, 111, 110, 115, 116, 114, 117, 99, 116, 111, 114, 40, 101, 61, 123, 125, 41, 123, 115, 117, 112, 101, 114, 40, 101, 46, 109, 101, 115, 115, 97, 103, 101, 41, 44, 109, 40, 116, 104, 105, 115, 44, 34, 110, 97, 109, 101, 34, 41, 44, 109, 40, 116, 104, 105, 115, 44, 34, 109, 101, 115, 115, 97, 103, 101, 34, 41, 44, 79, 98, 106, 101, 99, 116, 46, 115, 101, 116, 80, 114, 111, 116, 111, 116, 121, 112, 101, 79, 102, 40, 116, 104, 105, 115, 44, 87, 46, 112, 114, 111, 116, 111, 116, 121, 112, 101, 41, 44, 116, 121, 112, 101, 111, 102, 32, 101, 46, 110, 97, 109, 101, 61, 61, 34, 115, 116, 114, 105, 110, 103, 34, 38, 38, 40, 116, 104, 105, 115, 46, 110, 97, 109, 101, 61, 101, 46, 110, 97, 109, 101, 41, 125, 125, 44, 80, 59, 40, 101, 61, 62, 123, 102, 117, 110, 99, 116, 105, 111, 110, 32, 116, 40, 41, 123, 108, 101, 116, 32, 114, 61, 34, 54, 46, 49, 53, 46, 48, 34, 59, 105, 102, 40, 114, 61, 61, 110, 117, 108, 108, 41, 116, 104, 114, 111, 119, 32, 110, 101, 119, 32, 87, 40, 123, 110, 97, 109, 101, 58, 34, 73, 110, 118, 97, 108, 105, 100, 32, 108, 105, 98, 114, 97, 114, 121, 32, 118, 101, 114, 115, 105, 111, 110, 34, 44, 109, 101, 115, 115, 97, 103, 101, 58, 34, 76, 105, 98, 114, 97, 114, 121, 32, 118, 101, 114, 115, 105, 111, 110, 32, 105, 115, 32, 110, 111, 116, 32, 100, 101, 102, 105, 110, 101, 100, 32, 111, 114, 32, 101, 109, 112, 116, 121, 46, 34, 125, 41, 59, 114, 101, 116, 117, 114, 110, 32, 114, 125, 101, 46, 115, 100, 107, 86, 101, 114, 115, 105, 111, 110, 61, 116, 125, 41, 40, 80, 124, 124, 40, 80, 61, 123, 125, 41, 41, 59, 102, 117, 110, 99, 116, 105, 111, 110, 32, 113, 40, 101, 44, 116, 44, 114, 44, 105, 41, 123, 108, 101, 116, 32, 97, 61, 33, 49, 44, 111, 61, 34, 115, 99, 97, 110, 100, 105, 116, 45, 119, 101, 98, 45, 100, 97, 116, 97, 99, 97, 112, 116, 117, 114, 101, 45, 99, 111, 114, 101, 34, 59, 105, 102, 40, 33, 111, 41, 116, 104, 114, 111, 119, 32, 110, 101, 119, 32, 69, 114, 114, 111, 114, 40, 34, 78, 111, 32, 112, 97, 99, 107, 97, 103, 101, 32, 110, 97, 109, 101, 44, 32, 99, 97, 110, 110, 111, 116, 32, 103, 101, 110, 101, 114, 97, 116, 101, 32, 108, 105, 98, 114, 97, 114, 121, 32, 108, 111, 99, 97, 116, 105, 111, 110, 34, 41, 59, 47, 94, 104, 116, 116, 112, 115, 63, 58, 92, 47, 92, 47, 40, 91, 94, 46, 47, 93, 42, 92, 46, 41, 42, 99, 100, 110, 46, 106, 115, 100, 101, 108, 105, 118, 114, 46, 110, 101, 116, 92, 47, 47, 46, 116, 101, 115, 116, 40, 116, 41, 63, 40, 116, 61, 96, 104, 116, 116, 112, 115, 58, 47, 47, 99, 100, 110, 46, 106, 115, 100, 101, 108, 105, 118, 114, 46, 110, 101, 116, 47, 110, 112, 109, 47, 36, 123, 111, 125, 64, 36, 123, 101, 125, 47, 98, 117, 105, 108, 100, 47, 101, 110, 103, 105, 110, 101, 47, 96, 44, 97, 61, 33, 48, 41, 58, 47, 94, 104, 116, 116, 112, 115, 63, 58, 92, 47, 92, 47, 40, 91, 94, 46, 47, 93, 42, 92, 46, 41, 42, 117, 110, 112, 107, 103, 46, 99, 111, 109, 92, 47, 47, 46, 116, 101, 115, 116, 40, 116, 41, 38, 38, 40, 116, 61, 96, 104, 116, 116, 112, 115, 58, 47, 47, 117, 110, 112, 107, 103, 46, 99, 111, 109, 47, 36, 123, 111, 125, 64, 36, 123, 101, 125, 47, 98, 117, 105, 108, 100, 47, 101, 110, 103, 105, 110, 101, 47, 96, 44, 97, 61, 33, 48, 41, 59, 108, 101, 116, 32, 100, 61, 34, 34, 59, 105, 38, 38, 40, 100, 43, 61, 34, 45, 115, 105, 109, 100, 34, 41, 59, 108, 101, 116, 32, 110, 61, 114, 46, 114, 101, 112, 108, 97, 99, 101, 40, 34, 46, 119, 97, 115, 109, 34, 44, 34, 34, 41, 59, 114, 101, 116, 117, 114, 110, 32, 97, 63, 123, 106, 115, 85, 82, 73, 58, 96, 36, 123, 116, 125, 36, 123, 110, 125, 36, 123, 100, 125, 46, 106, 115, 96, 44, 119, 97, 115, 109, 85, 82, 73, 58, 96, 36, 123, 116, 125, 36, 123, 110, 125, 36, 123, 100, 125, 46, 119, 97, 115, 109, 96, 125, 58, 123, 106, 115, 85, 82, 73, 58, 96, 36, 123, 116, 125, 36, 123, 110, 125, 36, 123, 100, 125, 46, 106, 115, 63, 118, 61, 36, 123, 101, 125, 96, 44, 119, 97, 115, 109, 85, 82, 73, 58, 96, 36, 123, 116, 125, 36, 123, 110, 125, 36, 123, 100, 125, 46, 119, 97, 115, 109, 63, 118, 61, 36, 123, 101, 125, 96, 125, 125, 118, 97, 114, 32, 65, 61, 99, 108, 97, 115, 115, 123, 99, 111, 110, 115, 116, 114, 117, 99, 116, 111, 114, 40, 101, 44, 116, 41, 123, 116, 104, 105, 115, 46, 109, 111, 100, 117, 108, 101, 72, 97, 110, 100, 108, 101, 114, 61, 101, 44, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 70, 117, 110, 99, 116, 105, 111, 110, 115, 61, 116, 44, 109, 40, 116, 104, 105, 115, 44, 34, 108, 97, 115, 116, 85, 115, 101, 100, 77, 111, 100, 117, 108, 101, 77, 105, 114, 114, 111, 114, 65, 120, 105, 115, 34, 41, 44, 109, 40, 116, 104, 105, 115, 44, 34, 77, 65, 88, 95, 78, 85, 77, 66, 69, 82, 95, 79, 70, 95, 73, 77, 65, 71, 69, 83, 95, 73, 78, 95, 70, 82, 65, 77, 69, 95, 68, 65, 84, 65, 95, 80, 79, 79, 76, 34, 44, 49, 48, 41, 44, 109, 40, 116, 104, 105, 115, 44, 34, 108, 105, 98, 114, 97, 114, 121, 76, 111, 97, 100, 105, 110, 103, 80, 114, 111, 109, 105, 115, 101, 34, 41, 44, 109, 40, 116, 104, 105, 115, 44, 34, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 34, 41, 44, 109, 40, 116, 104, 105, 115, 44, 34, 114, 101, 115, 111, 117, 114, 99, 101, 80, 97, 116, 104, 34, 41, 44, 109, 40, 116, 104, 105, 115, 44, 34, 95, 105, 115, 68, 114, 97, 119, 76, 111, 111, 112, 82, 117, 110, 110, 105, 110, 103, 34, 44, 33, 49, 41, 44, 109, 40, 116, 104, 105, 115, 44, 34, 114, 101, 100, 114, 97, 119, 73, 110, 116, 101, 114, 118, 97, 108, 34, 44, 49, 101, 51, 47, 51, 48, 41, 44, 109, 40, 116, 104, 105, 115, 44, 34, 114, 101, 100, 114, 97, 119, 82, 101, 113, 117, 101, 115, 116, 115, 34, 44, 91, 93, 41, 44, 109, 40, 116, 104, 105, 115, 44, 34, 108, 111, 111, 112, 84, 105, 109, 101, 111, 117, 116, 73, 100, 34, 41, 44, 109, 40, 116, 104, 105, 115, 44, 34, 99, 111, 110, 116, 101, 120, 116, 34, 41, 44, 109, 40, 116, 104, 105, 115, 44, 34, 99, 111, 110, 116, 101, 120, 116, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 34, 41, 44, 109, 40, 116, 104, 105, 115, 44, 34, 105, 109, 97, 103, 101, 70, 114, 97, 109, 101, 83, 111, 117, 114, 99, 101, 34, 41, 44, 109, 40, 116, 104, 105, 115, 44, 34, 118, 105, 101, 119, 34, 41, 44, 109, 40, 116, 104, 105, 115, 44, 34, 108, 97, 115, 116, 70, 114, 97, 109, 101, 67, 111, 117, 110, 116, 101, 114, 34, 44, 45, 49, 41, 44, 109, 40, 116, 104, 105, 115, 44, 34, 102, 114, 97, 109, 101, 68, 97, 116, 97, 80, 111, 111, 108, 34, 44, 110, 101, 119, 32, 77, 97, 112, 41, 125, 103, 101, 116, 32, 77, 111, 100, 117, 108, 101, 40, 41, 123, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 109, 111, 100, 117, 108, 101, 72, 97, 110, 100, 108, 101, 114, 46, 103, 101, 116, 40, 41, 125, 108, 111, 97, 100, 76, 105, 98, 114, 97, 114, 121, 40, 101, 41, 123, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 108, 105, 98, 114, 97, 114, 121, 76, 111, 97, 100, 105, 110, 103, 80, 114, 111, 109, 105, 115, 101, 33, 61, 110, 117, 108, 108, 63, 116, 104, 105, 115, 46, 108, 105, 98, 114, 97, 114, 121, 76, 111, 97, 100, 105, 110, 103, 80, 114, 111, 109, 105, 115, 101, 58, 40, 116, 104, 105, 115, 46, 108, 105, 98, 114, 97, 114, 121, 76, 111, 97, 100, 105, 110, 103, 80, 114, 111, 109, 105, 115, 101, 61, 116, 104, 105, 115, 46, 115, 101, 116, 117, 112, 40, 101, 46, 108, 105, 98, 114, 97, 114, 121, 76, 111, 99, 97, 116, 105, 111, 110, 44, 101, 46, 108, 111, 99, 97, 116, 105, 111, 110, 80, 97, 116, 104, 44, 101, 46, 112, 114, 101, 108, 111, 97, 100, 69, 110, 103, 105, 110, 101, 41, 44, 116, 104, 105, 115, 46, 108, 105, 98, 114, 97, 114, 121, 76, 111, 97, 100, 105, 110, 103, 80, 114, 111, 109, 105, 115, 101, 41, 125, 99, 114, 101, 97, 116, 101, 67, 111, 110, 116, 101, 120, 116, 40, 101, 41, 123, 108, 101, 116, 32, 116, 61, 116, 104, 105, 115, 46, 103, 101, 116, 77, 111, 100, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 115, 40, 41, 59, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 61, 110, 101, 119, 32, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 68, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 67, 111, 110, 116, 101, 120, 116, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 40, 116, 104, 105, 115, 46, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 44, 101, 46, 100, 101, 118, 105, 99, 101, 73, 100, 44, 101, 46, 99, 111, 110, 116, 101, 120, 116, 46, 100, 101, 118, 105, 99, 101, 78, 97, 109, 101, 44, 101, 46, 100, 111, 109, 97, 105, 110, 44, 116, 44, 101, 46, 100, 101, 108, 97, 121, 101, 100, 82, 101, 103, 105, 115, 116, 114, 97, 116, 105, 111, 110, 44, 101, 46, 104, 105, 103, 104, 69, 110, 100, 66, 108, 117, 114, 114, 121, 82, 101, 99, 111, 103, 110, 105, 116, 105, 111, 110, 44, 116, 104, 105, 115, 46, 114, 101, 115, 111, 117, 114, 99, 101, 80, 97, 116, 104, 41, 59, 108, 101, 116, 32, 114, 61, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 46, 99, 111, 110, 116, 101, 120, 116, 70, 114, 111, 109, 74, 115, 111, 110, 40, 74, 83, 79, 78, 46, 115, 116, 114, 105, 110, 103, 105, 102, 121, 40, 101, 46, 99, 111, 110, 116, 101, 120, 116, 41, 41, 44, 105, 61, 114, 46, 103, 101, 116, 86, 105, 101, 119, 40, 41, 59, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 61, 114, 46, 103, 101, 116, 67, 111, 110, 116, 101, 120, 116, 40, 41, 59, 108, 101, 116, 32, 97, 61, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 68, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 67, 111, 110, 116, 101, 120, 116, 76, 105, 115, 116, 101, 110, 101, 114, 46, 101, 120, 116, 101, 110, 100, 40, 34, 68, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 67, 111, 110, 116, 101, 120, 116, 76, 105, 115, 116, 101, 110, 101, 114, 34, 44, 123, 100, 105, 100, 67, 104, 97, 110, 103, 101, 83, 116, 97, 116, 117, 115, 58, 40, 100, 44, 110, 41, 61, 62, 123, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 68, 105, 100, 67, 104, 97, 110, 103, 101, 83, 116, 97, 116, 117, 115, 40, 74, 83, 79, 78, 46, 112, 97, 114, 115, 101, 40, 110, 46, 116, 111, 74, 115, 111, 110, 40, 41, 41, 41, 125, 44, 100, 105, 100, 83, 116, 97, 114, 116, 79, 98, 115, 101, 114, 118, 105, 110, 103, 67, 111, 110, 116, 101, 120, 116, 58, 40, 41, 61, 62, 123, 116, 104, 105, 115, 46, 100, 105, 100, 83, 116, 97, 114, 116, 79, 98, 115, 101, 114, 118, 105, 110, 103, 67, 111, 110, 116, 101, 120, 116, 40, 41, 125, 125, 41, 44, 111, 61, 110, 101, 119, 32, 97, 59, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 46, 97, 100, 100, 76, 105, 115, 116, 101, 110, 101, 114, 40, 111, 41, 44, 111, 46, 100, 101, 108, 101, 116, 101, 40, 41, 44, 116, 104, 105, 115, 46, 115, 101, 116, 86, 105, 101, 119, 40, 105, 41, 125, 103, 101, 116, 77, 111, 100, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 115, 40, 41, 123, 114, 101, 116, 117, 114, 110, 32, 110, 101, 119, 32, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 86, 101, 99, 116, 111, 114, 68, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 125, 115, 101, 116, 70, 114, 97, 109, 101, 83, 111, 117, 114, 99, 101, 40, 101, 41, 123, 118, 97, 114, 32, 116, 59, 116, 104, 105, 115, 46, 108, 97, 115, 116, 85, 115, 101, 100, 77, 111, 100, 117, 108, 101, 77, 105, 114, 114, 111, 114, 65, 120, 105, 115, 61, 116, 104, 105, 115, 46, 109, 97, 112, 77, 105, 114, 114, 111, 114, 65, 120, 105, 115, 79, 110, 77, 111, 100, 117, 108, 101, 40, 101, 41, 44, 40, 116, 61, 116, 104, 105, 115, 46, 105, 109, 97, 103, 101, 70, 114, 97, 109, 101, 83, 111, 117, 114, 99, 101, 41, 61, 61, 110, 117, 108, 108, 124, 124, 116, 46, 100, 101, 108, 101, 116, 101, 40, 41, 44, 116, 104, 105, 115, 46, 105, 109, 97, 103, 101, 70, 114, 97, 109, 101, 83, 111, 117, 114, 99, 101, 61, 110, 101, 119, 32, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 73, 109, 97, 103, 101, 66, 117, 102, 102, 101, 114, 70, 114, 97, 109, 101, 83, 111, 117, 114, 99, 101, 40, 116, 104, 105, 115, 46, 108, 97, 115, 116, 85, 115, 101, 100, 77, 111, 100, 117, 108, 101, 77, 105, 114, 114, 111, 114, 65, 120, 105, 115, 41, 44, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 46, 115, 101, 116, 70, 114, 97, 109, 101, 83, 111, 117, 114, 99, 101, 40, 116, 104, 105, 115, 46, 105, 109, 97, 103, 101, 70, 114, 97, 109, 101, 83, 111, 117, 114, 99, 101, 41, 125, 112, 114, 111, 99, 101, 115, 115, 70, 114, 97, 109, 101, 40, 101, 41, 123, 118, 97, 114, 32, 116, 59, 105, 102, 40, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 61, 61, 110, 117, 108, 108, 41, 114, 101, 116, 117, 114, 110, 123, 112, 97, 121, 108, 111, 97, 100, 58, 101, 44, 116, 114, 97, 110, 115, 102, 101, 114, 97, 98, 108, 101, 115, 58, 91, 101, 46, 100, 97, 116, 97, 46, 98, 117, 102, 102, 101, 114, 93, 125, 59, 108, 101, 116, 32, 114, 61, 101, 46, 100, 97, 116, 97, 44, 105, 61, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 97, 108, 108, 111, 99, 97, 116, 101, 85, 105, 110, 116, 56, 65, 114, 114, 97, 121, 40, 114, 46, 98, 121, 116, 101, 76, 101, 110, 103, 116, 104, 41, 59, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 72, 69, 65, 80, 85, 56, 46, 115, 101, 116, 40, 114, 44, 105, 41, 44, 40, 116, 61, 116, 104, 105, 115, 46, 105, 109, 97, 103, 101, 70, 114, 97, 109, 101, 83, 111, 117, 114, 99, 101, 41, 61, 61, 110, 117, 108, 108, 124, 124, 116, 46, 111, 117, 116, 112, 117, 116, 70, 114, 97, 109, 101, 40, 105, 44, 101, 46, 119, 105, 100, 116, 104, 44, 101, 46, 104, 101, 105, 103, 104, 116, 44, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 73, 109, 97, 103, 101, 66, 117, 102, 102, 101, 114, 70, 111, 114, 109, 97, 116, 46, 82, 103, 98, 97, 56, 56, 56, 56, 41, 44, 123, 112, 97, 121, 108, 111, 97, 100, 58, 101, 44, 116, 114, 97, 110, 115, 102, 101, 114, 97, 98, 108, 101, 115, 58, 91, 101, 46, 100, 97, 116, 97, 46, 98, 117, 102, 102, 101, 114, 93, 125, 125, 117, 112, 100, 97, 116, 101, 67, 111, 110, 116, 101, 120, 116, 40, 101, 41, 123, 105, 102, 40, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 33, 61, 110, 117, 108, 108, 38, 38, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 33, 61, 110, 117, 108, 108, 41, 123, 108, 101, 116, 32, 116, 61, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 46, 117, 112, 100, 97, 116, 101, 67, 111, 110, 116, 101, 120, 116, 70, 114, 111, 109, 74, 115, 111, 110, 40, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 44, 116, 104, 105, 115, 46, 118, 105, 101, 119, 44, 74, 83, 79, 78, 46, 115, 116, 114, 105, 110, 103, 105, 102, 121, 40, 101, 46, 99, 111, 110, 116, 101, 120, 116, 41, 41, 59, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 61, 116, 46, 103, 101, 116, 67, 111, 110, 116, 101, 120, 116, 40, 41, 59, 108, 101, 116, 32, 114, 61, 116, 46, 103, 101, 116, 86, 105, 101, 119, 40, 41, 59, 114, 33, 61, 110, 117, 108, 108, 38, 38, 101, 46, 118, 105, 101, 119, 33, 61, 110, 117, 108, 108, 38, 38, 114, 46, 115, 101, 116, 86, 105, 101, 119, 83, 105, 122, 101, 40, 101, 46, 118, 105, 101, 119, 46, 119, 105, 100, 116, 104, 44, 101, 46, 118, 105, 101, 119, 46, 104, 101, 105, 103, 104, 116, 41, 44, 116, 104, 105, 115, 46, 115, 101, 116, 86, 105, 101, 119, 40, 114, 41, 44, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 68, 101, 98, 117, 103, 44, 34, 99, 111, 110, 116, 101, 120, 116, 32, 117, 112, 100, 97, 116, 101, 100, 34, 44, 101, 41, 125, 125, 114, 101, 112, 111, 114, 116, 67, 97, 109, 101, 114, 97, 80, 114, 111, 112, 101, 114, 116, 105, 101, 115, 40, 101, 41, 123, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 46, 115, 101, 116, 67, 97, 109, 101, 114, 97, 80, 114, 111, 112, 101, 114, 116, 105, 101, 115, 40, 101, 46, 100, 101, 118, 105, 99, 101, 73, 100, 44, 101, 46, 105, 115, 70, 114, 111, 110, 116, 70, 97, 99, 105, 110, 103, 44, 101, 46, 104, 97, 115, 65, 117, 116, 111, 102, 111, 99, 117, 115, 41, 125, 100, 105, 115, 112, 111, 115, 101, 40, 41, 123, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 46, 100, 105, 115, 112, 111, 115, 101, 40, 41, 125, 101, 120, 116, 114, 97, 99, 116, 67, 101, 110, 116, 97, 117, 114, 117, 115, 76, 105, 99, 101, 110, 115, 101, 40, 101, 41, 123, 114, 101, 116, 117, 114, 110, 123, 112, 97, 121, 108, 111, 97, 100, 58, 123, 99, 101, 110, 116, 97, 117, 114, 117, 115, 58, 123, 108, 105, 99, 101, 110, 115, 101, 75, 101, 121, 58, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 76, 105, 99, 101, 110, 115, 101, 85, 116, 105, 108, 115, 46, 103, 101, 116, 66, 108, 105, 110, 107, 73, 100, 76, 105, 99, 101, 110, 115, 101, 75, 101, 121, 40, 101, 41, 125, 125, 125, 125, 99, 111, 110, 118, 101, 114, 116, 84, 111, 76, 111, 97, 100, 97, 98, 108, 101, 70, 114, 97, 109, 101, 68, 97, 116, 97, 40, 101, 41, 123, 108, 101, 116, 32, 116, 61, 116, 104, 105, 115, 46, 103, 101, 116, 78, 101, 120, 116, 70, 114, 97, 109, 101, 73, 100, 40, 41, 59, 116, 104, 105, 115, 46, 102, 114, 97, 109, 101, 68, 97, 116, 97, 80, 111, 111, 108, 46, 115, 101, 116, 40, 116, 44, 110, 101, 119, 32, 85, 105, 110, 116, 56, 67, 108, 97, 109, 112, 101, 100, 65, 114, 114, 97, 121, 40, 101, 46, 103, 101, 116, 70, 114, 97, 109, 101, 68, 97, 116, 97, 40, 41, 41, 41, 59, 108, 101, 116, 32, 114, 61, 116, 104, 105, 115, 46, 108, 97, 115, 116, 85, 115, 101, 100, 77, 111, 100, 117, 108, 101, 77, 105, 114, 114, 111, 114, 65, 120, 105, 115, 33, 61, 110, 117, 108, 108, 63, 116, 104, 105, 115, 46, 108, 97, 115, 116, 85, 115, 101, 100, 77, 111, 100, 117, 108, 101, 77, 105, 114, 114, 111, 114, 65, 120, 105, 115, 33, 61, 61, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 65, 120, 105, 115, 46, 78, 111, 110, 101, 58, 33, 49, 59, 114, 101, 116, 117, 114, 110, 123, 102, 114, 97, 109, 101, 73, 100, 58, 116, 44, 119, 105, 100, 116, 104, 58, 101, 46, 103, 101, 116, 87, 105, 100, 116, 104, 40, 41, 44, 104, 101, 105, 103, 104, 116, 58, 101, 46, 103, 101, 116, 72, 101, 105, 103, 104, 116, 40, 41, 44, 105, 115, 70, 114, 97, 109, 101, 83, 111, 117, 114, 99, 101, 77, 105, 114, 114, 111, 114, 101, 100, 58, 114, 125, 125, 114, 101, 113, 117, 101, 115, 116, 70, 114, 97, 109, 101, 68, 97, 116, 97, 40, 101, 41, 123, 108, 101, 116, 32, 116, 61, 116, 104, 105, 115, 46, 102, 114, 97, 109, 101, 68, 97, 116, 97, 80, 111, 111, 108, 46, 103, 101, 116, 40, 101, 41, 59, 114, 101, 116, 117, 114, 110, 32, 116, 61, 61, 110, 117, 108, 108, 63, 123, 112, 97, 121, 108, 111, 97, 100, 58, 123, 100, 97, 116, 97, 58, 110, 117, 108, 108, 125, 125, 58, 123, 112, 97, 121, 108, 111, 97, 100, 58, 123, 100, 97, 116, 97, 58, 116, 125, 44, 116, 114, 97, 110, 115, 102, 101, 114, 97, 98, 108, 101, 115, 58, 91, 116, 46, 98, 117, 102, 102, 101, 114, 93, 125, 125, 100, 101, 108, 101, 116, 101, 70, 114, 97, 109, 101, 68, 97, 116, 97, 40, 101, 41, 123, 116, 104, 105, 115, 46, 102, 114, 97, 109, 101, 68, 97, 116, 97, 80, 111, 111, 108, 46, 100, 101, 108, 101, 116, 101, 40, 101, 41, 125, 103, 101, 116, 78, 101, 120, 116, 70, 114, 97, 109, 101, 73, 100, 40, 41, 123, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 108, 97, 115, 116, 70, 114, 97, 109, 101, 67, 111, 117, 110, 116, 101, 114, 43, 43, 44, 116, 104, 105, 115, 46, 108, 97, 115, 116, 70, 114, 97, 109, 101, 67, 111, 117, 110, 116, 101, 114, 62, 61, 116, 104, 105, 115, 46, 77, 65, 88, 95, 78, 85, 77, 66, 69, 82, 95, 79, 70, 95, 73, 77, 65, 71, 69, 83, 95, 73, 78, 95, 70, 82, 65, 77, 69, 95, 68, 65, 84, 65, 95, 80, 79, 79, 76, 38, 38, 40, 116, 104, 105, 115, 46, 108, 97, 115, 116, 70, 114, 97, 109, 101, 67, 111, 117, 110, 116, 101, 114, 61, 48, 41, 44, 116, 104, 105, 115, 46, 108, 97, 115, 116, 70, 114, 97, 109, 101, 67, 111, 117, 110, 116, 101, 114, 125, 115, 101, 116, 86, 105, 101, 119, 40, 101, 41, 123, 116, 104, 105, 115, 46, 118, 105, 101, 119, 61, 101, 44, 116, 104, 105, 115, 46, 115, 101, 116, 86, 105, 101, 119, 82, 101, 102, 114, 101, 115, 104, 72, 97, 110, 100, 108, 101, 114, 40, 101, 41, 44, 101, 61, 61, 110, 117, 108, 108, 38, 38, 40, 116, 104, 105, 115, 46, 105, 115, 68, 114, 97, 119, 76, 111, 111, 112, 82, 117, 110, 110, 105, 110, 103, 61, 33, 49, 44, 116, 104, 105, 115, 46, 115, 101, 110, 100, 86, 105, 101, 119, 82, 101, 102, 114, 101, 115, 104, 67, 111, 109, 109, 97, 110, 100, 115, 40, 91, 93, 41, 41, 125, 99, 111, 110, 116, 101, 120, 116, 68, 105, 100, 67, 104, 97, 110, 103, 101, 83, 116, 97, 116, 117, 115, 40, 101, 41, 123, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 70, 117, 110, 99, 116, 105, 111, 110, 115, 46, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 40, 123, 116, 121, 112, 101, 58, 34, 99, 111, 110, 116, 101, 120, 116, 68, 105, 100, 67, 104, 97, 110, 103, 101, 83, 116, 97, 116, 117, 115, 34, 44, 112, 97, 121, 108, 111, 97, 100, 58, 101, 125, 41, 125, 100, 105, 100, 83, 116, 97, 114, 116, 79, 98, 115, 101, 114, 118, 105, 110, 103, 67, 111, 110, 116, 101, 120, 116, 40, 41, 123, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 70, 117, 110, 99, 116, 105, 111, 110, 115, 46, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 40, 123, 116, 121, 112, 101, 58, 34, 100, 105, 100, 83, 116, 97, 114, 116, 79, 98, 115, 101, 114, 118, 105, 110, 103, 67, 111, 110, 116, 101, 120, 116, 34, 125, 41, 125, 115, 101, 116, 86, 105, 101, 119, 82, 101, 102, 114, 101, 115, 104, 72, 97, 110, 100, 108, 101, 114, 40, 101, 41, 123, 105, 102, 40, 101, 61, 61, 110, 117, 108, 108, 124, 124, 101, 46, 105, 115, 86, 105, 101, 119, 82, 101, 102, 114, 101, 115, 104, 72, 97, 110, 100, 108, 101, 114, 83, 101, 116, 41, 114, 101, 116, 117, 114, 110, 59, 108, 101, 116, 32, 116, 61, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 78, 101, 101, 100, 115, 82, 101, 100, 114, 97, 119, 68, 101, 108, 101, 103, 97, 116, 101, 46, 101, 120, 116, 101, 110, 100, 40, 34, 78, 101, 101, 100, 115, 82, 101, 100, 114, 97, 119, 68, 101, 108, 101, 103, 97, 116, 101, 34, 44, 123, 115, 101, 116, 78, 101, 101, 100, 115, 82, 101, 100, 114, 97, 119, 73, 110, 58, 116, 104, 105, 115, 46, 115, 99, 104, 101, 100, 117, 108, 101, 82, 101, 100, 114, 97, 119, 46, 98, 105, 110, 100, 40, 116, 104, 105, 115, 44, 101, 41, 125, 41, 44, 114, 61, 110, 101, 119, 32, 116, 59, 101, 46, 115, 101, 116, 78, 101, 101, 100, 115, 82, 101, 100, 114, 97, 119, 68, 101, 108, 101, 103, 97, 116, 101, 40, 114, 41, 44, 101, 46, 105, 115, 86, 105, 101, 119, 82, 101, 102, 114, 101, 115, 104, 72, 97, 110, 100, 108, 101, 114, 83, 101, 116, 61, 33, 48, 125, 115, 99, 104, 101, 100, 117, 108, 101, 82, 101, 100, 114, 97, 119, 40, 101, 44, 116, 41, 123, 116, 104, 105, 115, 46, 97, 100, 100, 82, 101, 100, 114, 97, 119, 82, 101, 113, 117, 101, 115, 116, 40, 116, 41, 44, 116, 104, 105, 115, 46, 105, 115, 68, 114, 97, 119, 76, 111, 111, 112, 82, 117, 110, 110, 105, 110, 103, 124, 124, 116, 104, 105, 115, 46, 115, 116, 97, 114, 116, 68, 114, 97, 119, 76, 111, 111, 112, 40, 101, 41, 125, 103, 101, 116, 32, 105, 115, 68, 114, 97, 119, 76, 111, 111, 112, 82, 117, 110, 110, 105, 110, 103, 40, 41, 123, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 95, 105, 115, 68, 114, 97, 119, 76, 111, 111, 112, 82, 117, 110, 110, 105, 110, 103, 125, 115, 101, 116, 32, 105, 115, 68, 114, 97, 119, 76, 111, 111, 112, 82, 117, 110, 110, 105, 110, 103, 40, 101, 41, 123, 116, 104, 105, 115, 46, 95, 105, 115, 68, 114, 97, 119, 76, 111, 111, 112, 82, 117, 110, 110, 105, 110, 103, 61, 101, 44, 33, 101, 38, 38, 116, 121, 112, 101, 111, 102, 32, 116, 104, 105, 115, 46, 108, 111, 111, 112, 84, 105, 109, 101, 111, 117, 116, 73, 100, 61, 61, 34, 110, 117, 109, 98, 101, 114, 34, 38, 38, 40, 99, 108, 101, 97, 114, 84, 105, 109, 101, 111, 117, 116, 40, 116, 104, 105, 115, 46, 108, 111, 111, 112, 84, 105, 109, 101, 111, 117, 116, 73, 100, 41, 44, 116, 104, 105, 115, 46, 108, 111, 111, 112, 84, 105, 109, 101, 111, 117, 116, 73, 100, 61, 118, 111, 105, 100, 32, 48, 41, 125, 97, 100, 100, 82, 101, 100, 114, 97, 119, 82, 101, 113, 117, 101, 115, 116, 40, 101, 41, 123, 116, 104, 105, 115, 46, 114, 101, 100, 114, 97, 119, 82, 101, 113, 117, 101, 115, 116, 115, 46, 112, 117, 115, 104, 40, 77, 97, 116, 104, 46, 114, 111, 117, 110, 100, 40, 112, 101, 114, 102, 111, 114, 109, 97, 110, 99, 101, 46, 110, 111, 119, 40, 41, 41, 43, 101, 41, 44, 116, 104, 105, 115, 46, 114, 101, 100, 114, 97, 119, 82, 101, 113, 117, 101, 115, 116, 115, 46, 115, 111, 114, 116, 40, 40, 116, 44, 114, 41, 61, 62, 116, 45, 114, 41, 125, 115, 116, 97, 114, 116, 68, 114, 97, 119, 76, 111, 111, 112, 40, 101, 41, 123, 116, 104, 105, 115, 46, 105, 115, 68, 114, 97, 119, 76, 111, 111, 112, 82, 117, 110, 110, 105, 110, 103, 61, 33, 48, 59, 108, 101, 116, 32, 116, 61, 97, 61, 62, 116, 104, 105, 115, 46, 114, 101, 100, 114, 97, 119, 82, 101, 113, 117, 101, 115, 116, 115, 46, 108, 101, 110, 103, 116, 104, 62, 48, 38, 38, 116, 104, 105, 115, 46, 114, 101, 100, 114, 97, 119, 82, 101, 113, 117, 101, 115, 116, 115, 91, 48, 93, 60, 61, 97, 44, 114, 61, 97, 61, 62, 123, 102, 111, 114, 40, 59, 116, 104, 105, 115, 46, 114, 101, 100, 114, 97, 119, 82, 101, 113, 117, 101, 115, 116, 115, 46, 108, 101, 110, 103, 116, 104, 62, 48, 38, 38, 116, 104, 105, 115, 46, 114, 101, 100, 114, 97, 119, 82, 101, 113, 117, 101, 115, 116, 115, 91, 48, 93, 60, 61, 97, 59, 41, 116, 104, 105, 115, 46, 114, 101, 100, 114, 97, 119, 82, 101, 113, 117, 101, 115, 116, 115, 46, 115, 104, 105, 102, 116, 40, 41, 125, 44, 105, 61, 40, 41, 61, 62, 123, 116, 104, 105, 115, 46, 108, 111, 111, 112, 84, 105, 109, 101, 111, 117, 116, 73, 100, 61, 115, 101, 116, 84, 105, 109, 101, 111, 117, 116, 40, 40, 41, 61, 62, 123, 105, 102, 40, 33, 116, 104, 105, 115, 46, 105, 115, 68, 114, 97, 119, 76, 111, 111, 112, 82, 117, 110, 110, 105, 110, 103, 41, 114, 101, 116, 117, 114, 110, 59, 108, 101, 116, 32, 97, 61, 112, 101, 114, 102, 111, 114, 109, 97, 110, 99, 101, 46, 110, 111, 119, 40, 41, 59, 116, 40, 97, 41, 38, 38, 40, 114, 40, 97, 41, 44, 101, 46, 100, 114, 97, 119, 40, 41, 44, 116, 104, 105, 115, 46, 115, 101, 110, 100, 86, 105, 101, 119, 82, 101, 102, 114, 101, 115, 104, 67, 111, 109, 109, 97, 110, 100, 115, 40, 74, 83, 79, 78, 46, 112, 97, 114, 115, 101, 40, 101, 46, 103, 101, 116, 68, 114, 97, 119, 67, 111, 109, 109, 97, 110, 100, 115, 40, 41, 41, 41, 41, 44, 105, 40, 41, 125, 44, 116, 104, 105, 115, 46, 114, 101, 100, 114, 97, 119, 73, 110, 116, 101, 114, 118, 97, 108, 41, 125, 59, 105, 40, 41, 125, 115, 101, 110, 100, 86, 105, 101, 119, 82, 101, 102, 114, 101, 115, 104, 67, 111, 109, 109, 97, 110, 100, 115, 40, 101, 41, 123, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 70, 117, 110, 99, 116, 105, 111, 110, 115, 46, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 40, 123, 116, 121, 112, 101, 58, 34, 100, 114, 97, 119, 34, 44, 112, 97, 121, 108, 111, 97, 100, 58, 101, 125, 41, 125, 103, 101, 116, 87, 97, 115, 109, 68, 121, 110, 97, 109, 105, 99, 76, 105, 98, 114, 97, 114, 105, 101, 115, 40, 101, 41, 123, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 103, 101, 116, 87, 97, 115, 109, 83, 105, 100, 101, 77, 111, 100, 117, 108, 101, 70, 105, 108, 101, 78, 97, 109, 101, 40, 41, 61, 61, 110, 117, 108, 108, 63, 91, 93, 58, 91, 96, 36, 123, 101, 46, 114, 101, 112, 108, 97, 99, 101, 40, 47, 91, 94, 47, 93, 43, 92, 46, 119, 97, 115, 109, 40, 92, 63, 46, 43, 41, 63, 47, 44, 34, 34, 41, 125, 36, 123, 116, 104, 105, 115, 46, 103, 101, 116, 87, 97, 115, 109, 83, 105, 100, 101, 77, 111, 100, 117, 108, 101, 70, 105, 108, 101, 78, 97, 109, 101, 40, 41, 125, 96, 93, 125, 103, 101, 116, 87, 97, 115, 109, 67, 111, 114, 101, 69, 120, 112, 101, 99, 116, 101, 100, 72, 97, 115, 104, 40, 41, 123, 114, 101, 116, 117, 114, 110, 34, 34, 125, 103, 101, 116, 87, 97, 115, 109, 67, 111, 114, 101, 70, 105, 108, 101, 78, 97, 109, 101, 40, 41, 123, 114, 101, 116, 117, 114, 110, 34, 34, 125, 103, 101, 116, 87, 97, 115, 109, 83, 105, 100, 101, 77, 111, 100, 117, 108, 101, 70, 105, 108, 101, 78, 97, 109, 101, 40, 41, 123, 114, 101, 116, 117, 114, 110, 34, 34, 125, 97, 115, 121, 110, 99, 32, 115, 101, 116, 117, 112, 40, 101, 44, 116, 44, 114, 41, 123, 118, 97, 114, 32, 105, 59, 108, 101, 116, 32, 97, 61, 33, 49, 44, 111, 61, 33, 49, 44, 100, 61, 34, 47, 115, 99, 97, 110, 100, 105, 116, 95, 115, 121, 110, 99, 95, 102, 111, 108, 100, 101, 114, 95, 112, 114, 101, 108, 111, 97, 100, 34, 44, 110, 61, 34, 47, 115, 99, 97, 110, 100, 105, 116, 95, 115, 121, 110, 99, 95, 102, 111, 108, 100, 101, 114, 34, 44, 104, 61, 34, 114, 101, 115, 111, 117, 114, 99, 101, 115, 34, 59, 116, 104, 105, 115, 46, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 61, 114, 63, 100, 58, 110, 44, 116, 104, 105, 115, 46, 114, 101, 115, 111, 117, 114, 99, 101, 80, 97, 116, 104, 61, 96, 36, 123, 101, 125, 36, 123, 104, 125, 47, 96, 44, 115, 101, 108, 102, 46, 112, 97, 116, 104, 61, 116, 59, 108, 101, 116, 32, 115, 44, 108, 44, 117, 61, 110, 101, 119, 32, 80, 114, 111, 109, 105, 115, 101, 40, 40, 102, 44, 121, 41, 61, 62, 123, 115, 61, 102, 44, 108, 61, 121, 125, 41, 44, 112, 61, 40, 41, 61, 62, 123, 111, 38, 38, 97, 38, 38, 40, 67, 46, 97, 112, 112, 108, 121, 40, 116, 104, 105, 115, 41, 44, 116, 104, 105, 115, 46, 109, 111, 100, 117, 108, 101, 72, 97, 110, 100, 108, 101, 114, 46, 103, 101, 116, 40, 41, 46, 99, 97, 108, 108, 77, 97, 105, 110, 40, 41, 44, 115, 40, 41, 41, 125, 59, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 40, 41, 123, 108, 101, 116, 32, 102, 61, 116, 104, 105, 115, 46, 109, 111, 100, 117, 108, 101, 72, 97, 110, 100, 108, 101, 114, 46, 103, 101, 116, 40, 41, 44, 121, 61, 102, 46, 68, 97, 116, 97, 68, 101, 99, 111, 100, 105, 110, 103, 46, 101, 120, 116, 101, 110, 100, 40, 34, 68, 97, 116, 97, 68, 101, 99, 111, 100, 105, 110, 103, 34, 44, 123, 100, 101, 99, 111, 100, 101, 40, 118, 44, 70, 41, 123, 116, 114, 121, 123, 108, 101, 116, 32, 95, 61, 74, 83, 79, 78, 46, 112, 97, 114, 115, 101, 40, 70, 41, 44, 78, 61, 91, 93, 59, 102, 111, 114, 40, 108, 101, 116, 32, 82, 32, 111, 102, 32, 95, 41, 123, 108, 101, 116, 32, 106, 61, 110, 101, 119, 32, 84, 101, 120, 116, 68, 101, 99, 111, 100, 101, 114, 40, 82, 46, 105, 97, 110, 97, 78, 97, 109, 101, 44, 123, 102, 97, 116, 97, 108, 58, 33, 48, 125, 41, 59, 78, 46, 112, 117, 115, 104, 40, 106, 46, 100, 101, 99, 111, 100, 101, 40, 118, 46, 115, 108, 105, 99, 101, 40, 82, 46, 115, 116, 97, 114, 116, 73, 110, 100, 101, 120, 44, 82, 46, 101, 110, 100, 73, 110, 100, 101, 120, 41, 41, 41, 125, 114, 101, 116, 117, 114, 110, 32, 78, 46, 106, 111, 105, 110, 40, 34, 34, 41, 125, 99, 97, 116, 99, 104, 40, 95, 41, 123, 114, 101, 116, 117, 114, 110, 34, 34, 125, 125, 125, 41, 44, 107, 61, 110, 101, 119, 32, 121, 59, 102, 46, 115, 101, 116, 68, 97, 116, 97, 68, 101, 99, 111, 100, 105, 110, 103, 40, 107, 41, 125, 108, 101, 116, 32, 119, 61, 80, 46, 115, 100, 107, 86, 101, 114, 115, 105, 111, 110, 40, 41, 59, 105, 102, 40, 119, 61, 61, 61, 34, 34, 41, 116, 104, 114, 111, 119, 32, 110, 101, 119, 32, 87, 40, 123, 110, 97, 109, 101, 58, 34, 73, 110, 118, 97, 108, 105, 100, 32, 108, 105, 98, 114, 97, 114, 121, 32, 118, 101, 114, 115, 105, 111, 110, 34, 44, 109, 101, 115, 115, 97, 103, 101, 58, 34, 76, 105, 98, 114, 97, 114, 121, 32, 118, 101, 114, 115, 105, 111, 110, 32, 105, 115, 32, 110, 111, 116, 32, 100, 101, 102, 105, 110, 101, 100, 32, 111, 114, 32, 101, 109, 112, 116, 121, 44, 32, 99, 97, 110, 110, 111, 116, 32, 103, 101, 110, 101, 114, 97, 116, 101, 32, 112, 114, 111, 112, 101, 114, 32, 112, 97, 116, 104, 32, 116, 111, 32, 108, 105, 98, 114, 97, 114, 121, 32, 102, 105, 108, 101, 115, 46, 34, 125, 41, 59, 108, 101, 116, 32, 98, 61, 33, 49, 44, 68, 61, 113, 40, 119, 44, 101, 44, 116, 104, 105, 115, 46, 103, 101, 116, 87, 97, 115, 109, 67, 111, 114, 101, 70, 105, 108, 101, 78, 97, 109, 101, 40, 41, 44, 98, 41, 44, 123, 106, 115, 85, 82, 73, 58, 83, 125, 61, 68, 44, 123, 119, 97, 115, 109, 85, 82, 73, 58, 77, 125, 61, 68, 59, 116, 104, 105, 115, 46, 109, 111, 100, 117, 108, 101, 72, 97, 110, 100, 108, 101, 114, 46, 115, 101, 116, 40, 123, 99, 97, 110, 118, 97, 115, 58, 40, 105, 61, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 70, 117, 110, 99, 116, 105, 111, 110, 115, 46, 103, 101, 116, 79, 102, 102, 115, 99, 114, 101, 101, 110, 67, 97, 110, 118, 97, 115, 40, 41, 41, 33, 61, 110, 117, 108, 108, 63, 105, 58, 123, 103, 101, 116, 67, 111, 110, 116, 101, 120, 116, 58, 40, 41, 61, 62, 110, 117, 108, 108, 125, 44, 105, 110, 115, 116, 97, 110, 116, 105, 97, 116, 101, 87, 97, 115, 109, 58, 40, 102, 44, 121, 41, 61, 62, 40, 85, 40, 102, 44, 77, 44, 116, 104, 105, 115, 46, 103, 101, 116, 87, 97, 115, 109, 67, 111, 114, 101, 69, 120, 112, 101, 99, 116, 101, 100, 72, 97, 115, 104, 40, 41, 44, 121, 41, 44, 123, 125, 41, 44, 100, 121, 110, 97, 109, 105, 99, 76, 105, 98, 114, 97, 114, 105, 101, 115, 58, 116, 104, 105, 115, 46, 103, 101, 116, 87, 97, 115, 109, 68, 121, 110, 97, 109, 105, 99, 76, 105, 98, 114, 97, 114, 105, 101, 115, 40, 77, 41, 44, 110, 111, 73, 110, 105, 116, 105, 97, 108, 82, 117, 110, 58, 33, 48, 44, 112, 114, 101, 82, 117, 110, 58, 91, 97, 115, 121, 110, 99, 40, 41, 61, 62, 123, 116, 114, 121, 123, 97, 119, 97, 105, 116, 32, 66, 40, 123, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 80, 114, 101, 108, 111, 97, 100, 58, 100, 44, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 83, 116, 97, 110, 100, 97, 114, 100, 58, 110, 44, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 58, 116, 104, 105, 115, 46, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 44, 112, 114, 101, 108, 111, 97, 100, 105, 110, 103, 58, 114, 125, 41, 125, 99, 97, 116, 99, 104, 40, 102, 41, 123, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 68, 101, 98, 117, 103, 44, 34, 78, 111, 32, 73, 110, 100, 101, 120, 101, 100, 68, 66, 32, 115, 117, 112, 112, 111, 114, 116, 44, 32, 115, 111, 109, 101, 32, 100, 97, 116, 97, 32, 119, 105, 108, 108, 32, 110, 111, 116, 32, 98, 101, 32, 112, 101, 114, 115, 105, 115, 116, 101, 100, 58, 34, 44, 102, 41, 125, 111, 61, 33, 48, 44, 112, 40, 41, 125, 93, 44, 111, 110, 82, 117, 110, 116, 105, 109, 101, 73, 110, 105, 116, 105, 97, 108, 105, 122, 101, 100, 58, 40, 41, 61, 62, 123, 97, 61, 33, 48, 44, 112, 40, 41, 125, 125, 41, 59, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 76, 40, 102, 41, 123, 118, 97, 114, 32, 121, 59, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 107, 40, 41, 123, 114, 101, 116, 117, 114, 110, 32, 105, 109, 112, 111, 114, 116, 83, 99, 114, 105, 112, 116, 115, 40, 102, 41, 125, 116, 114, 121, 123, 97, 119, 97, 105, 116, 32, 84, 40, 107, 44, 50, 53, 48, 44, 52, 101, 51, 44, 70, 61, 62, 123, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 87, 97, 114, 110, 44, 70, 41, 44, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 87, 97, 114, 110, 44, 96, 67, 111, 117, 108, 100, 110, 39, 116, 32, 114, 101, 116, 114, 105, 101, 118, 101, 32, 83, 99, 97, 110, 100, 105, 116, 32, 68, 97, 116, 97, 32, 67, 97, 112, 116, 117, 114, 101, 32, 108, 105, 98, 114, 97, 114, 121, 32, 97, 116, 32, 36, 123, 102, 125, 44, 32, 114, 101, 116, 114, 121, 105, 110, 103, 46, 46, 46, 96, 41, 125, 41, 59, 108, 101, 116, 32, 118, 61, 40, 121, 61, 115, 101, 108, 102, 46, 83, 68, 67, 95, 87, 65, 83, 77, 95, 74, 83, 95, 86, 69, 82, 83, 73, 79, 78, 41, 33, 61, 110, 117, 108, 108, 63, 121, 58, 34, 117, 110, 100, 101, 102, 105, 110, 101, 100, 34, 59, 114, 101, 116, 117, 114, 110, 32, 118, 33, 61, 61, 119, 38, 38, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 87, 97, 114, 110, 44, 96, 84, 104, 101, 32, 83, 99, 97, 110, 100, 105, 116, 32, 68, 97, 116, 97, 32, 67, 97, 112, 116, 117, 114, 101, 32, 108, 105, 98, 114, 97, 114, 121, 32, 74, 83, 32, 102, 105, 108, 101, 32, 102, 111, 117, 110, 100, 32, 97, 116, 32, 36, 123, 102, 125, 32, 115, 101, 101, 109, 115, 32, 105, 110, 118, 97, 108, 105, 100, 58, 32, 101, 120, 112, 101, 99, 116, 101, 100, 32, 118, 101, 114, 115, 105, 111, 110, 32, 100, 111, 101, 115, 110, 39, 116, 32, 109, 97, 116, 99, 104, 32, 40, 114, 101, 99, 101, 105, 118, 101, 100, 58, 32, 36, 123, 118, 125, 44, 32, 101, 120, 112, 101, 99, 116, 101, 100, 58, 32, 36, 123, 119, 125, 41, 46, 32, 80, 108, 101, 97, 115, 101, 32, 101, 110, 115, 117, 114, 101, 32, 116, 104, 101, 32, 99, 111, 114, 114, 101, 99, 116, 32, 83, 99, 97, 110, 100, 105, 116, 32, 68, 97, 116, 97, 32, 67, 97, 112, 116, 117, 114, 101, 32, 102, 105, 108, 101, 32, 40, 119, 105, 116, 104, 32, 99, 111, 114, 114, 101, 99, 116, 32, 118, 101, 114, 115, 105, 111, 110, 41, 32, 105, 115, 32, 114, 101, 116, 114, 105, 101, 118, 101, 100, 46, 96, 41, 44, 33, 48, 125, 99, 97, 116, 99, 104, 40, 118, 41, 123, 114, 101, 116, 117, 114, 110, 32, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 69, 114, 114, 111, 114, 44, 118, 41, 44, 33, 49, 125, 125, 114, 101, 116, 117, 114, 110, 32, 97, 119, 97, 105, 116, 32, 76, 40, 83, 41, 124, 124, 108, 40, 96, 67, 111, 117, 108, 100, 110, 39, 116, 32, 114, 101, 116, 114, 105, 101, 118, 101, 32, 83, 99, 97, 110, 100, 105, 116, 32, 68, 97, 116, 97, 32, 67, 97, 112, 116, 117, 114, 101, 32, 108, 105, 98, 114, 97, 114, 121, 32, 97, 116, 32, 36, 123, 83, 125, 44, 32, 100, 105, 100, 32, 121, 111, 117, 32, 99, 111, 110, 102, 105, 103, 117, 114, 101, 32, 116, 104, 101, 32, 112, 97, 116, 104, 32, 102, 111, 114, 32, 105, 116, 32, 99, 111, 114, 114, 101, 99, 116, 108, 121, 63, 96, 41, 44, 117, 125, 109, 97, 112, 77, 105, 114, 114, 111, 114, 65, 120, 105, 115, 79, 110, 77, 111, 100, 117, 108, 101, 40, 101, 41, 123, 115, 119, 105, 116, 99, 104, 40, 101, 41, 123, 99, 97, 115, 101, 34, 78, 111, 110, 101, 34, 58, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 65, 120, 105, 115, 46, 78, 111, 110, 101, 59, 99, 97, 115, 101, 34, 88, 34, 58, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 65, 120, 105, 115, 46, 88, 59, 99, 97, 115, 101, 34, 89, 34, 58, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 65, 120, 105, 115, 46, 89, 59, 100, 101, 102, 97, 117, 108, 116, 58, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 65, 120, 105, 115, 46, 78, 111, 110, 101, 125, 125, 125, 59, 102, 117, 110, 99, 116, 105, 111, 110, 32, 75, 40, 101, 41, 123, 99, 111, 110, 115, 111, 108, 101, 46, 119, 97, 114, 110, 40, 34, 82, 101, 97, 99, 104, 101, 100, 32, 117, 110, 101, 120, 112, 101, 99, 116, 101, 100, 32, 99, 97, 115, 101, 34, 41, 125, 118, 97, 114, 32, 69, 61, 99, 108, 97, 115, 115, 123, 99, 111, 110, 115, 116, 114, 117, 99, 116, 111, 114, 40, 101, 44, 116, 41, 123, 109, 40, 116, 104, 105, 115, 44, 34, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 34, 41, 44, 109, 40, 116, 104, 105, 115, 44, 34, 119, 111, 114, 107, 101, 114, 83, 101, 108, 102, 34, 41, 44, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 83, 101, 108, 102, 61, 101, 44, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 61, 110, 101, 119, 32, 65, 40, 116, 44, 123, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 58, 116, 104, 105, 115, 46, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 46, 98, 105, 110, 100, 40, 116, 104, 105, 115, 41, 44, 103, 101, 116, 79, 102, 102, 115, 99, 114, 101, 101, 110, 67, 97, 110, 118, 97, 115, 58, 116, 104, 105, 115, 46, 103, 101, 116, 79, 102, 102, 115, 99, 114, 101, 101, 110, 67, 97, 110, 118, 97, 115, 46, 98, 105, 110, 100, 40, 116, 104, 105, 115, 41, 125, 41, 44, 116, 104, 105, 115, 46, 108, 105, 115, 116, 101, 110, 84, 111, 77, 101, 115, 115, 97, 103, 101, 115, 40, 41, 125, 108, 105, 115, 116, 101, 110, 84, 111, 77, 101, 115, 115, 97, 103, 101, 115, 40, 41, 123, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 83, 101, 108, 102, 46, 111, 110, 109, 101, 115, 115, 97, 103, 101, 61, 116, 104, 105, 115, 46, 111, 110, 77, 101, 115, 115, 97, 103, 101, 46, 98, 105, 110, 100, 40, 116, 104, 105, 115, 41, 125, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 40, 101, 44, 116, 41, 123, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 83, 101, 108, 102, 46, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 40, 101, 44, 116, 33, 61, 110, 117, 108, 108, 63, 116, 58, 91, 93, 41, 125, 103, 101, 116, 79, 102, 102, 115, 99, 114, 101, 101, 110, 67, 97, 110, 118, 97, 115, 40, 41, 123, 105, 102, 40, 116, 121, 112, 101, 111, 102, 32, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 83, 101, 108, 102, 46, 79, 102, 102, 115, 99, 114, 101, 101, 110, 67, 97, 110, 118, 97, 115, 61, 61, 34, 102, 117, 110, 99, 116, 105, 111, 110, 34, 41, 114, 101, 116, 117, 114, 110, 32, 110, 101, 119, 32, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 83, 101, 108, 102, 46, 79, 102, 102, 115, 99, 114, 101, 101, 110, 67, 97, 110, 118, 97, 115, 40, 51, 50, 44, 51, 50, 41, 125, 104, 97, 115, 80, 97, 121, 108, 111, 97, 100, 40, 101, 41, 123, 114, 101, 116, 117, 114, 110, 32, 101, 33, 61, 61, 110, 117, 108, 108, 38, 38, 116, 121, 112, 101, 111, 102, 32, 101, 61, 61, 34, 111, 98, 106, 101, 99, 116, 34, 38, 38, 34, 112, 97, 121, 108, 111, 97, 100, 34, 105, 110, 32, 101, 125, 104, 97, 115, 84, 114, 97, 110, 115, 102, 101, 114, 97, 98, 108, 101, 115, 40, 101, 41, 123, 114, 101, 116, 117, 114, 110, 32, 101, 33, 61, 61, 110, 117, 108, 108, 38, 38, 116, 121, 112, 101, 111, 102, 32, 101, 61, 61, 34, 111, 98, 106, 101, 99, 116, 34, 38, 38, 34, 116, 114, 97, 110, 115, 102, 101, 114, 97, 98, 108, 101, 115, 34, 105, 110, 32, 101, 38, 38, 65, 114, 114, 97, 121, 46, 105, 115, 65, 114, 114, 97, 121, 40, 101, 46, 116, 114, 97, 110, 115, 102, 101, 114, 97, 98, 108, 101, 115, 41, 125, 97, 115, 121, 110, 99, 32, 114, 101, 115, 112, 111, 110, 100, 87, 105, 116, 104, 40, 101, 44, 116, 44, 114, 41, 123, 108, 101, 116, 32, 105, 61, 110, 117, 108, 108, 44, 97, 59, 116, 114, 121, 123, 97, 61, 114, 40, 41, 44, 97, 32, 105, 110, 115, 116, 97, 110, 99, 101, 111, 102, 32, 80, 114, 111, 109, 105, 115, 101, 38, 38, 40, 97, 61, 97, 119, 97, 105, 116, 32, 97, 41, 125, 99, 97, 116, 99, 104, 40, 100, 41, 123, 97, 61, 118, 111, 105, 100, 32, 48, 44, 105, 61, 116, 121, 112, 101, 111, 102, 32, 100, 46, 116, 111, 83, 116, 114, 105, 110, 103, 61, 61, 34, 102, 117, 110, 99, 116, 105, 111, 110, 34, 63, 100, 46, 116, 111, 83, 116, 114, 105, 110, 103, 40, 41, 58, 34, 117, 110, 107, 110, 111, 119, 32, 101, 114, 114, 111, 114, 34, 125, 108, 101, 116, 32, 111, 61, 123, 116, 121, 112, 101, 58, 34, 119, 111, 114, 107, 101, 114, 84, 97, 115, 107, 73, 100, 34, 44, 99, 111, 109, 109, 97, 110, 100, 58, 101, 44, 105, 100, 58, 116, 44, 112, 97, 121, 108, 111, 97, 100, 58, 116, 104, 105, 115, 46, 104, 97, 115, 80, 97, 121, 108, 111, 97, 100, 40, 97, 41, 63, 97, 46, 112, 97, 121, 108, 111, 97, 100, 58, 118, 111, 105, 100, 32, 48, 125, 59, 105, 33, 61, 110, 117, 108, 108, 38, 38, 40, 111, 46, 101, 114, 114, 111, 114, 61, 105, 41, 44, 116, 104, 105, 115, 46, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 40, 111, 44, 116, 104, 105, 115, 46, 104, 97, 115, 84, 114, 97, 110, 115, 102, 101, 114, 97, 98, 108, 101, 115, 40, 97, 41, 63, 97, 46, 116, 114, 97, 110, 115, 102, 101, 114, 97, 98, 108, 101, 115, 58, 91, 93, 41, 125, 111, 110, 77, 101, 115, 115, 97, 103, 101, 40, 101, 41, 123, 115, 119, 105, 116, 99, 104, 40, 101, 46, 100, 97, 116, 97, 46, 99, 111, 109, 109, 97, 110, 100, 41, 123, 99, 97, 115, 101, 34, 108, 111, 97, 100, 76, 105, 98, 114, 97, 114, 121, 34, 58, 123, 108, 101, 116, 123, 100, 97, 116, 97, 58, 116, 125, 61, 101, 59, 116, 104, 105, 115, 46, 114, 101, 115, 112, 111, 110, 100, 87, 105, 116, 104, 40, 101, 46, 100, 97, 116, 97, 46, 99, 111, 109, 109, 97, 110, 100, 44, 116, 46, 105, 100, 44, 40, 41, 61, 62, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 108, 111, 97, 100, 76, 105, 98, 114, 97, 114, 121, 40, 123, 108, 105, 98, 114, 97, 114, 121, 76, 111, 99, 97, 116, 105, 111, 110, 58, 116, 46, 108, 105, 98, 114, 97, 114, 121, 76, 111, 99, 97, 116, 105, 111, 110, 44, 108, 111, 99, 97, 116, 105, 111, 110, 80, 97, 116, 104, 58, 116, 46, 108, 111, 99, 97, 116, 105, 111, 110, 80, 97, 116, 104, 44, 112, 114, 101, 108, 111, 97, 100, 69, 110, 103, 105, 110, 101, 58, 116, 46, 112, 114, 101, 108, 111, 97, 100, 69, 110, 103, 105, 110, 101, 125, 41, 41, 125, 98, 114, 101, 97, 107, 59, 99, 97, 115, 101, 34, 99, 114, 101, 97, 116, 101, 67, 111, 110, 116, 101, 120, 116, 34, 58, 123, 108, 101, 116, 123, 100, 97, 116, 97, 58, 116, 125, 61, 101, 59, 116, 104, 105, 115, 46, 114, 101, 115, 112, 111, 110, 100, 87, 105, 116, 104, 40, 101, 46, 100, 97, 116, 97, 46, 99, 111, 109, 109, 97, 110, 100, 44, 116, 46, 105, 100, 44, 40, 41, 61, 62, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 99, 114, 101, 97, 116, 101, 67, 111, 110, 116, 101, 120, 116, 40, 123, 99, 111, 110, 116, 101, 120, 116, 58, 116, 46, 99, 111, 110, 116, 101, 120, 116, 44, 100, 101, 118, 105, 99, 101, 73, 100, 58, 116, 46, 100, 101, 118, 105, 99, 101, 73, 100, 44, 100, 111, 109, 97, 105, 110, 58, 116, 46, 100, 111, 109, 97, 105, 110, 44, 100, 101, 108, 97, 121, 101, 100, 82, 101, 103, 105, 115, 116, 114, 97, 116, 105, 111, 110, 58, 116, 46, 100, 101, 108, 97, 121, 101, 100, 82, 101, 103, 105, 115, 116, 114, 97, 116, 105, 111, 110, 44, 104, 105, 103, 104, 69, 110, 100, 66, 108, 117, 114, 114, 121, 82, 101, 99, 111, 103, 110, 105, 116, 105, 111, 110, 58, 116, 46, 104, 105, 103, 104, 69, 110, 100, 66, 108, 117, 114, 114, 121, 82, 101, 99, 111, 103, 110, 105, 116, 105, 111, 110, 125, 41, 41, 125, 98, 114, 101, 97, 107, 59, 99, 97, 115, 101, 34, 115, 101, 116, 70, 114, 97, 109, 101, 83, 111, 117, 114, 99, 101, 34, 58, 123, 108, 101, 116, 123, 100, 97, 116, 97, 58, 116, 125, 61, 101, 59, 116, 104, 105, 115, 46, 114, 101, 115, 112, 111, 110, 100, 87, 105, 116, 104, 40, 101, 46, 100, 97, 116, 97, 46, 99, 111, 109, 109, 97, 110, 100, 44, 116, 46, 105, 100, 44, 40, 41, 61, 62, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 115, 101, 116, 70, 114, 97, 109, 101, 83, 111, 117, 114, 99, 101, 40, 116, 46, 109, 105, 114, 114, 111, 114, 65, 120, 105, 115, 41, 41, 125, 98, 114, 101, 97, 107, 59, 99, 97, 115, 101, 34, 112, 114, 111, 99, 101, 115, 115, 70, 114, 97, 109, 101, 34, 58, 123, 108, 101, 116, 123, 100, 97, 116, 97, 58, 116, 125, 61, 101, 59, 116, 104, 105, 115, 46, 114, 101, 115, 112, 111, 110, 100, 87, 105, 116, 104, 40, 116, 46, 99, 111, 109, 109, 97, 110, 100, 44, 116, 46, 105, 100, 44, 40, 41, 61, 62, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 112, 114, 111, 99, 101, 115, 115, 70, 114, 97, 109, 101, 40, 123, 100, 97, 116, 97, 58, 116, 46, 100, 97, 116, 97, 44, 119, 105, 100, 116, 104, 58, 116, 46, 119, 105, 100, 116, 104, 44, 104, 101, 105, 103, 104, 116, 58, 116, 46, 104, 101, 105, 103, 104, 116, 125, 41, 41, 59, 98, 114, 101, 97, 107, 125, 99, 97, 115, 101, 34, 114, 101, 113, 117, 101, 115, 116, 70, 114, 97, 109, 101, 68, 97, 116, 97, 34, 58, 123, 108, 101, 116, 123, 100, 97, 116, 97, 58, 116, 125, 61, 101, 59, 116, 104, 105, 115, 46, 114, 101, 115, 112, 111, 110, 100, 87, 105, 116, 104, 40, 116, 46, 99, 111, 109, 109, 97, 110, 100, 44, 116, 46, 105, 100, 44, 40, 41, 61, 62, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 114, 101, 113, 117, 101, 115, 116, 70, 114, 97, 109, 101, 68, 97, 116, 97, 40, 116, 46, 102, 114, 97, 109, 101, 73, 100, 41, 41, 59, 98, 114, 101, 97, 107, 125, 99, 97, 115, 101, 34, 100, 101, 108, 101, 116, 101, 70, 114, 97, 109, 101, 68, 97, 116, 97, 34, 58, 123, 108, 101, 116, 123, 100, 97, 116, 97, 58, 116, 125, 61, 101, 59, 116, 104, 105, 115, 46, 114, 101, 115, 112, 111, 110, 100, 87, 105, 116, 104, 40, 116, 46, 99, 111, 109, 109, 97, 110, 100, 44, 116, 46, 105, 100, 44, 40, 41, 61, 62, 123, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 100, 101, 108, 101, 116, 101, 70, 114, 97, 109, 101, 68, 97, 116, 97, 40, 116, 46, 102, 114, 97, 109, 101, 73, 100, 41, 125, 41, 59, 98, 114, 101, 97, 107, 125, 99, 97, 115, 101, 34, 117, 112, 100, 97, 116, 101, 67, 111, 110, 116, 101, 120, 116, 34, 58, 123, 108, 101, 116, 123, 100, 97, 116, 97, 58, 116, 125, 61, 101, 59, 116, 104, 105, 115, 46, 114, 101, 115, 112, 111, 110, 100, 87, 105, 116, 104, 40, 101, 46, 100, 97, 116, 97, 46, 99, 111, 109, 109, 97, 110, 100, 44, 116, 46, 105, 100, 44, 40, 41, 61, 62, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 117, 112, 100, 97, 116, 101, 67, 111, 110, 116, 101, 120, 116, 40, 116, 41, 41, 125, 98, 114, 101, 97, 107, 59, 99, 97, 115, 101, 34, 100, 105, 115, 112, 111, 115, 101, 34, 58, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 100, 105, 115, 112, 111, 115, 101, 40, 41, 59, 98, 114, 101, 97, 107, 59, 99, 97, 115, 101, 34, 114, 101, 112, 111, 114, 116, 67, 97, 109, 101, 114, 97, 80, 114, 111, 112, 101, 114, 116, 105, 101, 115, 34, 58, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 114, 101, 112, 111, 114, 116, 67, 97, 109, 101, 114, 97, 80, 114, 111, 112, 101, 114, 116, 105, 101, 115, 40, 101, 46, 100, 97, 116, 97, 41, 59, 98, 114, 101, 97, 107, 59, 99, 97, 115, 101, 34, 115, 101, 116, 76, 111, 103, 76, 101, 118, 101, 108, 34, 58, 99, 46, 115, 101, 116, 76, 101, 118, 101, 108, 40, 101, 46, 100, 97, 116, 97, 46, 108, 101, 118, 101, 108, 41, 59, 98, 114, 101, 97, 107, 59, 99, 97, 115, 101, 34, 101, 120, 116, 114, 97, 99, 116, 67, 101, 110, 116, 97, 117, 114, 117, 115, 76, 105, 99, 101, 110, 115, 101, 34, 58, 123, 108, 101, 116, 123, 100, 97, 116, 97, 58, 116, 125, 61, 101, 59, 116, 104, 105, 115, 46, 114, 101, 115, 112, 111, 110, 100, 87, 105, 116, 104, 40, 101, 46, 100, 97, 116, 97, 46, 99, 111, 109, 109, 97, 110, 100, 44, 116, 46, 105, 100, 44, 40, 41, 61, 62, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 101, 120, 116, 114, 97, 99, 116, 67, 101, 110, 116, 97, 117, 114, 117, 115, 76, 105, 99, 101, 110, 115, 101, 40, 116, 46, 108, 105, 99, 101, 110, 115, 101, 75, 101, 121, 41, 41, 125, 98, 114, 101, 97, 107, 59, 100, 101, 102, 97, 117, 108, 116, 58, 114, 101, 116, 117, 114, 110, 32, 75, 40, 101, 46, 100, 97, 116, 97, 41, 44, 33, 49, 125, 114, 101, 116, 117, 114, 110, 33, 48, 125, 125, 44, 89, 61, 110, 101, 119, 32, 69, 40, 115, 101, 108, 102, 44, 123, 103, 101, 116, 58, 40, 41, 61, 62, 115, 101, 108, 102, 46, 77, 111, 100, 117, 108, 101, 44, 115, 101, 116, 58, 101, 61, 62, 123, 115, 101, 108, 102, 46, 77, 111, 100, 117, 108, 101, 61, 101, 125, 125, 41, 59, 118, 97, 114, 32, 73, 61, 99, 108, 97, 115, 115, 123, 99, 111, 110, 115, 116, 114, 117, 99, 116, 111, 114, 40, 41, 123, 103, 40, 116, 104, 105, 115, 44, 34, 112, 114, 111, 109, 105, 115, 101, 34, 41, 59, 103, 40, 116, 104, 105, 115, 44, 34, 114, 101, 115, 111, 108, 118, 101, 34, 41, 59, 103, 40, 116, 104, 105, 115, 44, 34, 114, 101, 106, 101, 99, 116, 34, 41, 59, 116, 104, 105, 115, 46, 112, 114, 111, 109, 105, 115, 101, 61, 110, 101, 119, 32, 80, 114, 111, 109, 105, 115, 101, 40, 40, 116, 44, 114, 41, 61, 62, 123, 116, 104, 105, 115, 46, 114, 101, 106, 101, 99, 116, 61, 114, 44, 116, 104, 105, 115, 46, 114, 101, 115, 111, 108, 118, 101, 61, 116, 125, 41, 125, 125, 59, 118, 97, 114, 32, 120, 61, 99, 108, 97, 115, 115, 32, 101, 120, 116, 101, 110, 100, 115, 32, 65, 123, 99, 111, 110, 115, 116, 114, 117, 99, 116, 111, 114, 40, 114, 44, 105, 41, 123, 115, 117, 112, 101, 114, 40, 114, 44, 105, 41, 59, 103, 40, 116, 104, 105, 115, 44, 34, 105, 100, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 34, 41, 59, 103, 40, 116, 104, 105, 115, 44, 34, 108, 97, 115, 116, 73, 100, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 83, 101, 114, 105, 97, 108, 105, 122, 101, 100, 83, 101, 116, 116, 105, 110, 103, 115, 34, 41, 125, 112, 114, 111, 99, 101, 115, 115, 70, 114, 97, 109, 101, 40, 114, 41, 123, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 46, 105, 115, 67, 101, 110, 116, 97, 117, 114, 117, 115, 80, 114, 111, 99, 101, 115, 115, 105, 110, 103, 70, 114, 97, 109, 101, 40, 41, 63, 123, 112, 97, 121, 108, 111, 97, 100, 58, 114, 44, 116, 114, 97, 110, 115, 102, 101, 114, 97, 98, 108, 101, 115, 58, 91, 114, 46, 100, 97, 116, 97, 46, 98, 117, 102, 102, 101, 114, 93, 125, 58, 115, 117, 112, 101, 114, 46, 112, 114, 111, 99, 101, 115, 115, 70, 114, 97, 109, 101, 40, 114, 41, 125, 117, 112, 100, 97, 116, 101, 67, 111, 110, 116, 101, 120, 116, 40, 114, 41, 123, 105, 102, 40, 115, 117, 112, 101, 114, 46, 117, 112, 100, 97, 116, 101, 67, 111, 110, 116, 101, 120, 116, 40, 114, 41, 44, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 33, 61, 110, 117, 108, 108, 38, 38, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 33, 61, 110, 117, 108, 108, 41, 123, 108, 101, 116, 32, 105, 61, 114, 46, 99, 111, 110, 116, 101, 120, 116, 46, 109, 111, 100, 101, 115, 46, 102, 105, 110, 100, 40, 97, 61, 62, 97, 46, 116, 121, 112, 101, 61, 61, 61, 34, 105, 100, 67, 97, 112, 116, 117, 114, 101, 34, 41, 59, 105, 102, 40, 105, 41, 123, 108, 101, 116, 32, 97, 61, 74, 83, 79, 78, 46, 115, 116, 114, 105, 110, 103, 105, 102, 121, 40, 105, 46, 115, 101, 116, 116, 105, 110, 103, 115, 41, 59, 116, 104, 105, 115, 46, 108, 97, 115, 116, 73, 100, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 83, 101, 114, 105, 97, 108, 105, 122, 101, 100, 83, 101, 116, 116, 105, 110, 103, 115, 33, 61, 61, 34, 34, 38, 38, 97, 33, 61, 61, 116, 104, 105, 115, 46, 108, 97, 115, 116, 73, 100, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 83, 101, 114, 105, 97, 108, 105, 122, 101, 100, 83, 101, 116, 116, 105, 110, 103, 115, 38, 38, 116, 104, 105, 115, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 46, 114, 101, 99, 114, 101, 97, 116, 101, 40, 41, 44, 116, 104, 105, 115, 46, 108, 97, 115, 116, 73, 100, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 83, 101, 114, 105, 97, 108, 105, 122, 101, 100, 83, 101, 116, 116, 105, 110, 103, 115, 61, 97, 125, 125, 125, 105, 100, 67, 97, 112, 116, 117, 114, 101, 83, 101, 116, 76, 97, 115, 116, 82, 101, 115, 117, 108, 116, 40, 114, 41, 123, 116, 104, 105, 115, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 46, 115, 101, 116, 76, 97, 115, 116, 82, 101, 115, 117, 108, 116, 40, 114, 41, 125, 105, 100, 67, 97, 112, 116, 117, 114, 101, 83, 101, 116, 76, 97, 115, 116, 69, 114, 114, 111, 114, 40, 114, 41, 123, 116, 104, 105, 115, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 46, 115, 101, 116, 76, 97, 115, 116, 69, 114, 114, 111, 114, 40, 114, 41, 125, 105, 100, 67, 97, 112, 116, 117, 114, 101, 83, 101, 116, 76, 97, 115, 116, 76, 111, 99, 97, 108, 105, 122, 101, 100, 73, 100, 40, 114, 41, 123, 116, 104, 105, 115, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 46, 115, 101, 116, 76, 97, 115, 116, 76, 111, 99, 97, 108, 105, 122, 101, 100, 73, 100, 40, 114, 41, 125, 97, 115, 121, 110, 99, 32, 105, 100, 67, 97, 112, 116, 117, 114, 101, 82, 101, 115, 101, 116, 40, 41, 123, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 46, 114, 101, 115, 101, 116, 40, 41, 125, 105, 100, 67, 97, 112, 116, 117, 114, 101, 70, 114, 97, 109, 101, 80, 114, 111, 99, 101, 115, 115, 101, 100, 40, 41, 123, 116, 104, 105, 115, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 46, 114, 101, 115, 111, 108, 118, 101, 76, 97, 115, 116, 70, 114, 97, 109, 101, 80, 114, 111, 99, 101, 115, 115, 68, 101, 102, 101, 114, 114, 101, 100, 40, 41, 125, 105, 100, 67, 97, 112, 116, 117, 114, 101, 86, 101, 114, 105, 102, 121, 65, 97, 109, 118, 97, 67, 97, 112, 116, 117, 114, 101, 40, 114, 41, 123, 114, 101, 116, 117, 114, 110, 123, 112, 97, 121, 108, 111, 97, 100, 58, 123, 114, 101, 115, 117, 108, 116, 58, 116, 104, 105, 115, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 86, 101, 114, 105, 102, 121, 65, 97, 109, 118, 97, 67, 97, 112, 116, 117, 114, 101, 40, 114, 41, 125, 125, 125, 103, 101, 116, 77, 111, 100, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 115, 40, 41, 123, 116, 104, 105, 115, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 61, 110, 101, 119, 32, 122, 40, 116, 104, 105, 115, 44, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 44, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 70, 117, 110, 99, 116, 105, 111, 110, 115, 41, 59, 108, 101, 116, 32, 114, 61, 115, 117, 112, 101, 114, 46, 103, 101, 116, 77, 111, 100, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 115, 40, 41, 59, 114, 101, 116, 117, 114, 110, 32, 114, 46, 112, 117, 115, 104, 95, 98, 97, 99, 107, 40, 116, 104, 105, 115, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 46, 103, 101, 116, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 40, 41, 41, 44, 114, 125, 103, 101, 116, 87, 97, 115, 109, 83, 105, 100, 101, 77, 111, 100, 117, 108, 101, 70, 105, 108, 101, 78, 97, 109, 101, 40, 41, 123, 114, 101, 116, 117, 114, 110, 34, 34, 125, 103, 101, 116, 87, 97, 115, 109, 67, 111, 114, 101, 70, 105, 108, 101, 78, 97, 109, 101, 40, 41, 123, 114, 101, 116, 117, 114, 110, 34, 115, 99, 97, 110, 100, 105, 116, 45, 100, 97, 116, 97, 99, 97, 112, 116, 117, 114, 101, 45, 115, 100, 107, 45, 105, 100, 46, 119, 97, 115, 109, 34, 125, 103, 101, 116, 87, 97, 115, 109, 67, 111, 114, 101, 69, 120, 112, 101, 99, 116, 101, 100, 72, 97, 115, 104, 40, 41, 123, 114, 101, 116, 117, 114, 110, 34, 98, 102, 52, 51, 57, 97, 48, 98, 52, 102, 102, 100, 56, 52, 98, 99, 99, 100, 52, 56, 101, 102, 50, 50, 49, 102, 53, 57, 55, 54, 48, 48, 53, 101, 49, 54, 52, 99, 54, 55, 53, 97, 53, 48, 99, 50, 101, 48, 102, 57, 49, 49, 54, 56, 51, 49, 50, 48, 100, 99, 57, 98, 49, 56, 34, 125, 125, 44, 122, 61, 99, 108, 97, 115, 115, 123, 99, 111, 110, 115, 116, 114, 117, 99, 116, 111, 114, 40, 116, 44, 114, 44, 105, 41, 123, 103, 40, 116, 104, 105, 115, 44, 34, 105, 100, 67, 97, 112, 116, 117, 114, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 34, 41, 59, 103, 40, 116, 104, 105, 115, 44, 34, 105, 100, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 34, 41, 59, 103, 40, 116, 104, 105, 115, 44, 34, 108, 105, 115, 116, 101, 110, 101, 114, 83, 101, 116, 34, 44, 33, 49, 41, 59, 103, 40, 116, 104, 105, 115, 44, 34, 108, 97, 115, 116, 82, 101, 115, 117, 108, 116, 34, 44, 34, 34, 41, 59, 103, 40, 116, 104, 105, 115, 44, 34, 108, 97, 115, 116, 69, 114, 114, 111, 114, 34, 44, 34, 34, 41, 59, 103, 40, 116, 104, 105, 115, 44, 34, 108, 97, 115, 116, 76, 111, 99, 97, 108, 105, 122, 101, 100, 73, 100, 34, 44, 34, 34, 41, 59, 103, 40, 116, 104, 105, 115, 44, 34, 114, 101, 115, 101, 116, 82, 101, 113, 117, 101, 115, 116, 68, 101, 102, 101, 114, 114, 101, 100, 34, 41, 59, 103, 40, 116, 104, 105, 115, 44, 34, 112, 114, 111, 99, 101, 115, 115, 70, 114, 97, 109, 101, 68, 101, 102, 101, 114, 114, 101, 100, 34, 41, 59, 103, 40, 116, 104, 105, 115, 44, 34, 99, 111, 114, 101, 69, 110, 103, 105, 110, 101, 34, 41, 59, 103, 40, 116, 104, 105, 115, 44, 34, 77, 111, 100, 117, 108, 101, 34, 41, 59, 103, 40, 116, 104, 105, 115, 44, 34, 119, 111, 114, 107, 101, 114, 70, 117, 110, 99, 116, 105, 111, 110, 115, 34, 41, 59, 116, 104, 105, 115, 46, 99, 111, 114, 101, 69, 110, 103, 105, 110, 101, 61, 116, 44, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 61, 114, 44, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 70, 117, 110, 99, 116, 105, 111, 110, 115, 61, 105, 44, 116, 104, 105, 115, 46, 115, 101, 116, 117, 112, 40, 41, 125, 115, 101, 116, 76, 97, 115, 116, 82, 101, 115, 117, 108, 116, 40, 116, 41, 123, 116, 104, 105, 115, 46, 108, 97, 115, 116, 82, 101, 115, 117, 108, 116, 61, 116, 125, 115, 101, 116, 76, 97, 115, 116, 69, 114, 114, 111, 114, 40, 116, 41, 123, 116, 104, 105, 115, 46, 108, 97, 115, 116, 69, 114, 114, 111, 114, 61, 116, 125, 115, 101, 116, 76, 97, 115, 116, 76, 111, 99, 97, 108, 105, 122, 101, 100, 73, 100, 40, 116, 41, 123, 116, 104, 105, 115, 46, 108, 97, 115, 116, 76, 111, 99, 97, 108, 105, 122, 101, 100, 73, 100, 61, 116, 125, 97, 115, 121, 110, 99, 32, 114, 101, 115, 101, 116, 40, 41, 123, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 114, 101, 115, 101, 116, 82, 101, 113, 117, 101, 115, 116, 68, 101, 102, 101, 114, 114, 101, 100, 61, 110, 101, 119, 32, 73, 44, 116, 104, 105, 115, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 46, 114, 101, 115, 101, 116, 40, 41, 44, 116, 104, 105, 115, 46, 114, 101, 115, 101, 116, 82, 101, 113, 117, 101, 115, 116, 68, 101, 102, 101, 114, 114, 101, 100, 46, 112, 114, 111, 109, 105, 115, 101, 125, 114, 101, 115, 111, 108, 118, 101, 76, 97, 115, 116, 70, 114, 97, 109, 101, 80, 114, 111, 99, 101, 115, 115, 68, 101, 102, 101, 114, 114, 101, 100, 40, 41, 123, 118, 97, 114, 32, 116, 59, 40, 116, 61, 116, 104, 105, 115, 46, 112, 114, 111, 99, 101, 115, 115, 70, 114, 97, 109, 101, 68, 101, 102, 101, 114, 114, 101, 100, 41, 61, 61, 110, 117, 108, 108, 124, 124, 116, 46, 114, 101, 115, 111, 108, 118, 101, 40, 41, 44, 116, 104, 105, 115, 46, 112, 114, 111, 99, 101, 115, 115, 70, 114, 97, 109, 101, 68, 101, 102, 101, 114, 114, 101, 100, 61, 118, 111, 105, 100, 32, 48, 125, 105, 115, 67, 101, 110, 116, 97, 117, 114, 117, 115, 80, 114, 111, 99, 101, 115, 115, 105, 110, 103, 70, 114, 97, 109, 101, 40, 41, 123, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 112, 114, 111, 99, 101, 115, 115, 70, 114, 97, 109, 101, 68, 101, 102, 101, 114, 114, 101, 100, 33, 61, 110, 117, 108, 108, 125, 105, 100, 67, 97, 112, 116, 117, 114, 101, 86, 101, 114, 105, 102, 121, 65, 97, 109, 118, 97, 67, 97, 112, 116, 117, 114, 101, 40, 116, 41, 123, 108, 101, 116, 32, 105, 61, 110, 101, 119, 32, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 65, 97, 109, 118, 97, 86, 105, 122, 66, 97, 114, 99, 111, 100, 101, 67, 111, 109, 112, 97, 114, 105, 115, 111, 110, 86, 101, 114, 105, 102, 105, 101, 114, 40, 41, 46, 118, 101, 114, 105, 102, 121, 40, 74, 83, 79, 78, 46, 115, 116, 114, 105, 110, 103, 105, 102, 121, 40, 116, 41, 41, 59, 114, 101, 116, 117, 114, 110, 32, 74, 83, 79, 78, 46, 112, 97, 114, 115, 101, 40, 105, 46, 116, 111, 74, 115, 111, 110, 40, 41, 41, 125, 115, 101, 116, 117, 112, 40, 41, 123, 108, 101, 116, 32, 116, 61, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 73, 100, 67, 97, 112, 116, 117, 114, 101, 76, 105, 115, 116, 101, 110, 101, 114, 46, 101, 120, 116, 101, 110, 100, 40, 34, 73, 100, 67, 97, 112, 116, 117, 114, 101, 76, 105, 115, 116, 101, 110, 101, 114, 34, 44, 123, 111, 110, 73, 100, 67, 97, 112, 116, 117, 114, 101, 100, 58, 40, 110, 44, 104, 44, 115, 41, 61, 62, 123, 116, 104, 105, 115, 46, 112, 111, 115, 116, 73, 100, 67, 97, 112, 116, 117, 114, 101, 67, 97, 108, 108, 98, 97, 99, 107, 40, 34, 105, 100, 67, 97, 112, 116, 117, 114, 101, 68, 105, 100, 67, 97, 112, 116, 117, 114, 101, 73, 100, 34, 44, 104, 44, 115, 41, 125, 44, 111, 110, 73, 100, 76, 111, 99, 97, 108, 105, 122, 101, 100, 58, 40, 110, 44, 104, 44, 115, 41, 61, 62, 123, 116, 104, 105, 115, 46, 112, 111, 115, 116, 73, 100, 67, 97, 112, 116, 117, 114, 101, 67, 97, 108, 108, 98, 97, 99, 107, 40, 34, 105, 100, 67, 97, 112, 116, 117, 114, 101, 68, 105, 100, 76, 111, 99, 97, 108, 105, 122, 101, 73, 100, 34, 44, 104, 44, 115, 41, 125, 44, 111, 110, 73, 100, 82, 101, 106, 101, 99, 116, 101, 100, 58, 40, 110, 44, 104, 44, 115, 41, 61, 62, 123, 116, 104, 105, 115, 46, 112, 111, 115, 116, 73, 100, 67, 97, 112, 116, 117, 114, 101, 67, 97, 108, 108, 98, 97, 99, 107, 40, 34, 105, 100, 67, 97, 112, 116, 117, 114, 101, 68, 105, 100, 82, 101, 106, 101, 99, 116, 73, 100, 34, 44, 104, 44, 115, 41, 125, 125, 41, 44, 114, 61, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 73, 100, 67, 97, 112, 116, 117, 114, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 76, 105, 115, 116, 101, 110, 101, 114, 46, 101, 120, 116, 101, 110, 100, 40, 34, 73, 100, 67, 97, 112, 116, 117, 114, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 76, 105, 115, 116, 101, 110, 101, 114, 34, 44, 123, 111, 110, 77, 111, 100, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 97, 116, 105, 111, 110, 70, 105, 110, 105, 115, 104, 101, 100, 58, 40, 110, 44, 104, 41, 61, 62, 123, 105, 102, 40, 33, 116, 104, 105, 115, 46, 108, 105, 115, 116, 101, 110, 101, 114, 83, 101, 116, 41, 123, 108, 101, 116, 32, 115, 61, 110, 101, 119, 32, 116, 59, 104, 46, 97, 100, 100, 76, 105, 115, 116, 101, 110, 101, 114, 40, 115, 41, 44, 115, 46, 100, 101, 108, 101, 116, 101, 40, 41, 44, 116, 104, 105, 115, 46, 108, 105, 115, 116, 101, 110, 101, 114, 83, 101, 116, 61, 33, 48, 125, 125, 44, 111, 110, 77, 111, 100, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 97, 116, 105, 111, 110, 83, 116, 97, 114, 116, 101, 100, 40, 41, 123, 125, 44, 111, 110, 83, 101, 116, 116, 105, 110, 103, 115, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 97, 116, 105, 111, 110, 83, 116, 97, 114, 116, 101, 100, 40, 41, 123, 125, 44, 111, 110, 83, 101, 116, 116, 105, 110, 103, 115, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 97, 116, 105, 111, 110, 70, 105, 110, 105, 115, 104, 101, 100, 40, 41, 123, 125, 125, 41, 44, 105, 61, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 73, 100, 67, 97, 112, 116, 117, 114, 101, 66, 97, 99, 107, 101, 110, 100, 46, 101, 120, 116, 101, 110, 100, 40, 34, 73, 100, 67, 97, 112, 116, 117, 114, 101, 66, 97, 99, 107, 101, 110, 100, 34, 44, 123, 103, 101, 116, 76, 97, 115, 116, 69, 114, 114, 111, 114, 58, 40, 41, 61, 62, 116, 104, 105, 115, 46, 108, 97, 115, 116, 69, 114, 114, 111, 114, 44, 103, 101, 116, 76, 97, 115, 116, 82, 101, 115, 117, 108, 116, 58, 40, 41, 61, 62, 116, 104, 105, 115, 46, 108, 97, 115, 116, 82, 101, 115, 117, 108, 116, 44, 103, 101, 116, 76, 111, 99, 97, 108, 105, 122, 101, 100, 79, 110, 108, 121, 73, 100, 58, 40, 41, 61, 62, 116, 104, 105, 115, 46, 108, 97, 115, 116, 76, 111, 99, 97, 108, 105, 122, 101, 100, 73, 100, 44, 112, 114, 111, 99, 101, 115, 115, 70, 114, 97, 109, 101, 58, 97, 115, 121, 110, 99, 40, 110, 44, 104, 44, 115, 41, 61, 62, 123, 108, 101, 116, 32, 108, 61, 110, 101, 119, 32, 85, 105, 110, 116, 56, 67, 108, 97, 109, 112, 101, 100, 65, 114, 114, 97, 121, 40, 110, 46, 108, 101, 110, 103, 116, 104, 41, 59, 114, 101, 116, 117, 114, 110, 32, 108, 46, 115, 101, 116, 40, 110, 41, 44, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 70, 117, 110, 99, 116, 105, 111, 110, 115, 46, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 40, 123, 116, 121, 112, 101, 58, 34, 105, 100, 67, 97, 112, 116, 117, 114, 101, 70, 111, 114, 119, 97, 114, 100, 70, 114, 97, 109, 101, 34, 44, 112, 97, 121, 108, 111, 97, 100, 58, 123, 100, 97, 116, 97, 58, 108, 44, 119, 105, 100, 116, 104, 58, 104, 44, 104, 101, 105, 103, 104, 116, 58, 115, 125, 125, 44, 91, 108, 46, 98, 117, 102, 102, 101, 114, 93, 41, 44, 116, 104, 105, 115, 46, 112, 114, 111, 99, 101, 115, 115, 70, 114, 97, 109, 101, 68, 101, 102, 101, 114, 114, 101, 100, 61, 110, 101, 119, 32, 73, 44, 116, 104, 105, 115, 46, 112, 114, 111, 99, 101, 115, 115, 70, 114, 97, 109, 101, 68, 101, 102, 101, 114, 114, 101, 100, 46, 112, 114, 111, 109, 105, 115, 101, 125, 44, 114, 101, 115, 101, 116, 58, 40, 41, 61, 62, 123, 118, 97, 114, 32, 110, 59, 116, 104, 105, 115, 46, 108, 97, 115, 116, 69, 114, 114, 111, 114, 61, 116, 104, 105, 115, 46, 108, 97, 115, 116, 82, 101, 115, 117, 108, 116, 61, 116, 104, 105, 115, 46, 108, 97, 115, 116, 76, 111, 99, 97, 108, 105, 122, 101, 100, 73, 100, 61, 34, 34, 44, 40, 110, 61, 116, 104, 105, 115, 46, 114, 101, 115, 101, 116, 82, 101, 113, 117, 101, 115, 116, 68, 101, 102, 101, 114, 114, 101, 100, 41, 61, 61, 110, 117, 108, 108, 124, 124, 110, 46, 114, 101, 115, 111, 108, 118, 101, 40, 41, 44, 116, 104, 105, 115, 46, 114, 101, 115, 101, 116, 82, 101, 113, 117, 101, 115, 116, 68, 101, 102, 101, 114, 114, 101, 100, 61, 118, 111, 105, 100, 32, 48, 125, 44, 117, 112, 100, 97, 116, 101, 83, 101, 116, 116, 105, 110, 103, 115, 40, 110, 41, 123, 125, 125, 41, 44, 97, 61, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 73, 100, 67, 97, 112, 116, 117, 114, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 72, 101, 108, 112, 101, 114, 46, 101, 120, 116, 101, 110, 100, 40, 34, 73, 100, 67, 97, 112, 116, 117, 114, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 72, 101, 108, 112, 101, 114, 34, 44, 123, 99, 114, 101, 97, 116, 101, 77, 111, 100, 101, 58, 40, 110, 44, 104, 41, 61, 62, 123, 116, 104, 105, 115, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 33, 61, 110, 117, 108, 108, 38, 38, 116, 104, 105, 115, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 46, 100, 101, 108, 101, 116, 101, 40, 41, 59, 108, 101, 116, 32, 115, 61, 110, 101, 119, 32, 105, 59, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 61, 110, 101, 119, 32, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 73, 100, 67, 97, 112, 116, 117, 114, 101, 40, 110, 44, 115, 44, 104, 41, 44, 115, 46, 100, 101, 108, 101, 116, 101, 40, 41, 44, 116, 104, 105, 115, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 125, 125, 41, 44, 111, 61, 110, 101, 119, 32, 97, 59, 116, 104, 105, 115, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 61, 110, 101, 119, 32, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 73, 100, 67, 97, 112, 116, 117, 114, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 40, 111, 41, 44, 111, 46, 100, 101, 108, 101, 116, 101, 40, 41, 59, 108, 101, 116, 32, 100, 61, 110, 101, 119, 32, 114, 59, 116, 104, 105, 115, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 46, 115, 101, 116, 76, 105, 115, 116, 101, 110, 101, 114, 40, 100, 41, 44, 100, 46, 100, 101, 108, 101, 116, 101, 40, 41, 125, 112, 111, 115, 116, 73, 100, 67, 97, 112, 116, 117, 114, 101, 67, 97, 108, 108, 98, 97, 99, 107, 40, 116, 44, 114, 44, 105, 41, 123, 108, 101, 116, 32, 97, 61, 116, 104, 105, 115, 46, 99, 111, 114, 101, 69, 110, 103, 105, 110, 101, 46, 99, 111, 110, 118, 101, 114, 116, 84, 111, 76, 111, 97, 100, 97, 98, 108, 101, 70, 114, 97, 109, 101, 68, 97, 116, 97, 40, 105, 41, 59, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 70, 117, 110, 99, 116, 105, 111, 110, 115, 46, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 40, 123, 116, 121, 112, 101, 58, 116, 44, 112, 97, 121, 108, 111, 97, 100, 58, 123, 115, 101, 115, 115, 105, 111, 110, 58, 74, 83, 79, 78, 46, 112, 97, 114, 115, 101, 40, 114, 46, 116, 111, 74, 115, 111, 110, 40, 41, 41, 44, 102, 114, 97, 109, 101, 68, 97, 116, 97, 58, 97, 125, 125, 41, 125, 103, 101, 116, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 40, 41, 123, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 125, 114, 101, 99, 114, 101, 97, 116, 101, 40, 41, 123, 118, 97, 114, 32, 116, 44, 114, 59, 116, 104, 105, 115, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 46, 100, 101, 108, 101, 116, 101, 40, 41, 44, 116, 104, 105, 115, 46, 108, 97, 115, 116, 69, 114, 114, 111, 114, 61, 34, 34, 44, 116, 104, 105, 115, 46, 108, 97, 115, 116, 76, 111, 99, 97, 108, 105, 122, 101, 100, 73, 100, 61, 34, 34, 44, 116, 104, 105, 115, 46, 108, 97, 115, 116, 82, 101, 115, 117, 108, 116, 61, 34, 34, 44, 40, 116, 61, 116, 104, 105, 115, 46, 114, 101, 115, 101, 116, 82, 101, 113, 117, 101, 115, 116, 68, 101, 102, 101, 114, 114, 101, 100, 41, 61, 61, 110, 117, 108, 108, 124, 124, 116, 46, 114, 101, 115, 111, 108, 118, 101, 40, 41, 44, 40, 114, 61, 116, 104, 105, 115, 46, 112, 114, 111, 99, 101, 115, 115, 70, 114, 97, 109, 101, 68, 101, 102, 101, 114, 114, 101, 100, 41, 61, 61, 110, 117, 108, 108, 124, 124, 114, 46, 114, 101, 115, 111, 108, 118, 101, 40, 41, 44, 116, 104, 105, 115, 46, 114, 101, 115, 101, 116, 82, 101, 113, 117, 101, 115, 116, 68, 101, 102, 101, 114, 114, 101, 100, 61, 118, 111, 105, 100, 32, 48, 44, 116, 104, 105, 115, 46, 112, 114, 111, 99, 101, 115, 115, 70, 114, 97, 109, 101, 68, 101, 102, 101, 114, 114, 101, 100, 61, 118, 111, 105, 100, 32, 48, 44, 116, 104, 105, 115, 46, 108, 105, 115, 116, 101, 110, 101, 114, 83, 101, 116, 61, 33, 49, 44, 116, 104, 105, 115, 46, 115, 101, 116, 117, 112, 40, 41, 125, 125, 59, 118, 97, 114, 32, 79, 61, 99, 108, 97, 115, 115, 32, 101, 120, 116, 101, 110, 100, 115, 32, 69, 123, 99, 111, 110, 115, 116, 114, 117, 99, 116, 111, 114, 40, 116, 44, 114, 41, 123, 115, 117, 112, 101, 114, 40, 116, 44, 114, 41, 44, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 61, 110, 101, 119, 32, 120, 40, 114, 44, 123, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 58, 116, 104, 105, 115, 46, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 46, 98, 105, 110, 100, 40, 116, 104, 105, 115, 41, 44, 103, 101, 116, 79, 102, 102, 115, 99, 114, 101, 101, 110, 67, 97, 110, 118, 97, 115, 58, 116, 104, 105, 115, 46, 103, 101, 116, 79, 102, 102, 115, 99, 114, 101, 101, 110, 67, 97, 110, 118, 97, 115, 46, 98, 105, 110, 100, 40, 116, 104, 105, 115, 41, 125, 41, 125, 97, 115, 121, 110, 99, 32, 114, 101, 115, 112, 111, 110, 100, 87, 105, 116, 104, 40, 116, 44, 114, 44, 105, 41, 123, 108, 101, 116, 32, 97, 61, 110, 117, 108, 108, 44, 111, 59, 116, 114, 121, 123, 111, 61, 105, 40, 41, 44, 111, 32, 105, 110, 115, 116, 97, 110, 99, 101, 111, 102, 32, 80, 114, 111, 109, 105, 115, 101, 38, 38, 40, 111, 61, 97, 119, 97, 105, 116, 32, 111, 41, 125, 99, 97, 116, 99, 104, 40, 110, 41, 123, 111, 61, 118, 111, 105, 100, 32, 48, 44, 97, 61, 116, 121, 112, 101, 111, 102, 32, 110, 46, 116, 111, 83, 116, 114, 105, 110, 103, 61, 61, 34, 102, 117, 110, 99, 116, 105, 111, 110, 34, 63, 110, 46, 116, 111, 83, 116, 114, 105, 110, 103, 40, 41, 58, 34, 117, 110, 107, 110, 111, 119, 32, 101, 114, 114, 111, 114, 34, 125, 108, 101, 116, 32, 100, 61, 123, 116, 121, 112, 101, 58, 34, 119, 111, 114, 107, 101, 114, 84, 97, 115, 107, 73, 100, 34, 44, 99, 111, 109, 109, 97, 110, 100, 58, 116, 44, 105, 100, 58, 114, 44, 112, 97, 121, 108, 111, 97, 100, 58, 116, 104, 105, 115, 46, 104, 97, 115, 80, 97, 121, 108, 111, 97, 100, 40, 111, 41, 63, 111, 46, 112, 97, 121, 108, 111, 97, 100, 58, 118, 111, 105, 100, 32, 48, 125, 59, 97, 33, 61, 110, 117, 108, 108, 38, 38, 40, 100, 46, 101, 114, 114, 111, 114, 61, 97, 41, 44, 116, 104, 105, 115, 46, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 40, 100, 44, 116, 104, 105, 115, 46, 104, 97, 115, 84, 114, 97, 110, 115, 102, 101, 114, 97, 98, 108, 101, 115, 40, 111, 41, 63, 111, 46, 116, 114, 97, 110, 115, 102, 101, 114, 97, 98, 108, 101, 115, 58, 91, 93, 41, 125, 111, 110, 77, 101, 115, 115, 97, 103, 101, 40, 116, 41, 123, 115, 119, 105, 116, 99, 104, 40, 116, 46, 100, 97, 116, 97, 46, 99, 111, 109, 109, 97, 110, 100, 41, 123, 99, 97, 115, 101, 34, 105, 100, 67, 97, 112, 116, 117, 114, 101, 83, 101, 116, 76, 97, 115, 116, 82, 101, 115, 117, 108, 116, 34, 58, 123, 108, 101, 116, 123, 100, 97, 116, 97, 58, 114, 125, 61, 116, 59, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 83, 101, 116, 76, 97, 115, 116, 82, 101, 115, 117, 108, 116, 40, 114, 46, 114, 101, 115, 117, 108, 116, 41, 44, 33, 48, 125, 99, 97, 115, 101, 34, 105, 100, 67, 97, 112, 116, 117, 114, 101, 83, 101, 116, 76, 97, 115, 116, 69, 114, 114, 111, 114, 34, 58, 123, 108, 101, 116, 123, 100, 97, 116, 97, 58, 114, 125, 61, 116, 59, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 83, 101, 116, 76, 97, 115, 116, 69, 114, 114, 111, 114, 40, 114, 46, 101, 114, 114, 111, 114, 41, 44, 33, 48, 125, 99, 97, 115, 101, 34, 105, 100, 67, 97, 112, 116, 117, 114, 101, 83, 101, 116, 76, 97, 115, 116, 76, 111, 99, 97, 108, 105, 122, 101, 100, 73, 100, 34, 58, 123, 108, 101, 116, 123, 100, 97, 116, 97, 58, 114, 125, 61, 116, 59, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 83, 101, 116, 76, 97, 115, 116, 76, 111, 99, 97, 108, 105, 122, 101, 100, 73, 100, 40, 114, 46, 108, 111, 99, 97, 108, 105, 122, 101, 100, 73, 100, 41, 44, 33, 48, 125, 99, 97, 115, 101, 34, 105, 100, 67, 97, 112, 116, 117, 114, 101, 82, 101, 115, 101, 116, 34, 58, 123, 108, 101, 116, 123, 100, 97, 116, 97, 58, 114, 125, 61, 116, 59, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 114, 101, 115, 112, 111, 110, 100, 87, 105, 116, 104, 40, 114, 46, 99, 111, 109, 109, 97, 110, 100, 44, 114, 46, 105, 100, 44, 97, 115, 121, 110, 99, 40, 41, 61, 62, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 82, 101, 115, 101, 116, 40, 41, 41, 44, 33, 48, 125, 99, 97, 115, 101, 34, 105, 100, 67, 97, 112, 116, 117, 114, 101, 70, 114, 97, 109, 101, 80, 114, 111, 99, 101, 115, 115, 101, 100, 34, 58, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 70, 114, 97, 109, 101, 80, 114, 111, 99, 101, 115, 115, 101, 100, 40, 41, 44, 33, 48, 59, 99, 97, 115, 101, 34, 105, 100, 67, 97, 112, 116, 117, 114, 101, 86, 101, 114, 105, 102, 121, 65, 97, 109, 118, 97, 67, 97, 112, 116, 117, 114, 101, 34, 58, 123, 108, 101, 116, 123, 100, 97, 116, 97, 58, 114, 125, 61, 116, 59, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 114, 101, 115, 112, 111, 110, 100, 87, 105, 116, 104, 40, 114, 46, 99, 111, 109, 109, 97, 110, 100, 44, 114, 46, 105, 100, 44, 40, 41, 61, 62, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 105, 100, 67, 97, 112, 116, 117, 114, 101, 86, 101, 114, 105, 102, 121, 65, 97, 109, 118, 97, 67, 97, 112, 116, 117, 114, 101, 40, 114, 46, 99, 97, 112, 116, 117, 114, 101, 100, 73, 100, 41, 41, 44, 33, 48, 125, 100, 101, 102, 97, 117, 108, 116, 58, 114, 101, 116, 117, 114, 110, 32, 115, 117, 112, 101, 114, 46, 111, 110, 77, 101, 115, 115, 97, 103, 101, 40, 116, 41, 125, 125, 125, 44, 110, 101, 61, 110, 101, 119, 32, 79, 40, 115, 101, 108, 102, 44, 123, 103, 101, 116, 58, 40, 41, 61, 62, 115, 101, 108, 102, 46, 77, 111, 100, 117, 108, 101, 44, 115, 101, 116, 58, 101, 61, 62, 123, 115, 101, 108, 102, 46, 77, 111, 100, 117, 108, 101, 61, 101, 125, 125, 41, 59, 125, 41, 40, 41, 59, 10])], { type: "text/javascript" }));
var p0 = V0;
var e1 = class extends er {
  static async create(i) {
    var a, o;
    let r = new e1(i.libraryLocation, (a = i.preloadEngine) != null ? a : false);
    return r.workerCommand("setLogLevel", { level: (o = i.logLevel) != null ? o : g.Level.Debug }), await r.load(), r;
  }
  get dataCaptureWorker() {
    var i;
    return this._dataCaptureWorker = (i = this._dataCaptureWorker) != null ? i : new Worker(p0, { name: `SDCLoader ${this.isPreloadEngine ? " (preload)" : ""}` }), this._dataCaptureWorker;
  }
  async workerCommand(i, r, a) {
    return new Promise((o, d) => {
      let R2 = this.workerCommandId++;
      this.workerTasks.set(R2, { resolve: o, reject: d });
      let A = O2(h({}, r), { command: i, id: R2 });
      this.dataCaptureWorker.postMessage(A, a);
    });
  }
};
var K0 = ((E) => (E.AAMVABarcodeResult = "aamvaBarcodeResult", E.ArgentinaIdBarcodeResult = "argentinaIdBarcodeResult", E.ChinaMainlandTravelPermitMrzResult = "chinaMainlandTravelPermitMrzResult", E.ChinaExitEntryPermitMrzResult = "chinaExitEntryPermitMrzResult", E.ColombiaIdBarcodeResult = "colombiaIdBarcodeResult", E.ColombiaDlBarcodeResult = "colombiaDlBarcodeResult", E.MRZResult = "mrzResult", E.SouthAfricaDlBarcodeResult = "southAfricaDlBarcodeResult", E.SouthAfricaIdBarcodeResult = "southAfricaIdBarcodeResult", E.USUniformedServicesBarcodeResult = "usUniformedServicesBarcodeResult", E.VIZResult = "vizResult", E))(K0 || {});
var Z1 = ((u) => (u.None = "none", u.ConsularId = "consularId", u.DrivingLicense = "drivingLicense", u.DrivingLicensePublicServicesCard = "drivingLicensePublicServicesCard", u.EmploymentPass = "employmentPass", u.FinCard = "finCard", u.Id = "id", u.MultipurposeId = "multipurposeId", u.MyKad = "myKad", u.MyKid = "myKid", u.MyPR = "myPr", u.MyTentera = "myTentera", u.PanCard = "panCard", u.ProfessionalId = "professionalId", u.PublicServicesCard = "publicServicesCard", u.ResidencePermit = "residencePermit", u.ResidentId = "residentId", u.TemporaryResidencePermit = "temporaryResidencePermit", u.VoterId = "voterId", u.WorkPermit = "workPermit", u.IKad = "iKad", u.MilitaryId = "militaryId", u.MyKas = "myKas", u.SocialSecurityCard = "socialSecurityCard", u.HealthInsuranceCard = "healthInsuranceCard", u.Passport = "passport", u.Visa = "visa", u.SPass = "sPass", u.AddressCard = "addressCard", u.AlienId = "alienId", u.AlienPassport = "alienPassport", u.GreenCard = "greenCard", u.MinorsId = "minorsId", u.PostalId = "postalId", u.ProfessionalDl = "professionalDl", u.TaxId = "taxId", u.WeaponPermit = "weaponPermit", u.BorderCrossingCard = "borderCrossingCard", u.DriverCard = "driverCard", u.GlobalEntryCard = "globalEntryCard", u.MyPolis = "myPolis", u.NexusCard = "nexusCard", u.PassportCard = "passportCard", u.ProofOfAgeCard = "proofOfAgeCard", u.RefugeeId = "refugeeId", u.TribalId = "tribalId", u.VeteranId = "veteranId", u.CitizenshipCertificate = "citizenshipCertificate", u.MyNumberCard = "myNumberCard", u.MinorsPassport = "minorsPassport", u.MinorsPublicServicesCard = "minorsPublicServicesCard", u.DiplomaticPassport = "diplomaticPassport", u))(Z1 || {});
var x0 = ((p) => (p.AAMVABarcode = "aamvaBarcode", p.ArgentinaIdBarcode = "argentinaIdBarcode", p.ChinaMainlandTravelPermitMRZ = "chinaMainlandTravelPermitMrz", p.ChinaExitEntryPermitMRZ = "chinaExitEntryPermitMrz", p.ColombiaDlBarcode = "colombiaDlBarcode", p.ColombiaIdBarcode = "colombiaIdBarcode", p.DLVIZ = "dlViz", p.IdCardMRZ = "idCardMrz", p.IdCardVIZ = "idCardViz", p.PassportMRZ = "passportMrz", p.SouthAfricaDlBarcode = "southAfricaDlBarcode", p.SouthAfricaIdBarcode = "southAfricaIdBarcode", p.SwissDLMRZ = "swissDlMrz", p.USUSIdBarcode = "usUsIdBarcode", p.VisaMRZ = "visaMrz", p))(x0 || {});
var v1 = ((i) => (i.FrontOnly = "frontOnly", i.FrontAndBack = "frontAndBack", i))(v1 || {});
var m0 = ((r) => (r.Face = "face", r.IdFront = "idFront", r.IdBack = "idBack", r))(m0 || {});
var _0 = ((A) => (A.TD1 = "td1", A.TD2 = "td2", A.TD3 = "td3", A.MRVa = "mrvA", A.VIZ = "viz", A.PDF417 = "pdf417", A.Auto = "auto", A.None = "none", A))(_0 || {});
var D0 = ((i) => (i.Rounded = "rounded", i.Square = "square", i))(D0 || {});
var f0 = ((i) => (i.Light = "light", i.Bold = "bold", i))(f0 || {});
var H0 = ((r) => (r.Passed = "Passed", r.Skipped = "Skipped", r.Failed = "Failed", r))(H0 || {});
var S = class {
  constructor() {
    n(this, "json", {});
  }
  get day() {
    return this.json.day;
  }
  get month() {
    return this.json.month;
  }
  get year() {
    return this.json.year;
  }
  static fromJSON(t) {
    if (t == null)
      return null;
    let i = new S();
    return i.json = t, i;
  }
  toJSONObject() {
    return { day: this.day, month: this.month, year: this.year };
  }
};
var u1 = class {
  constructor() {
    n(this, "json");
  }
  get dateOfExpiry() {
    var t;
    return (t = S.fromJSON(this.json.dateOfExpiry)) != null ? t : new S();
  }
  get codes() {
    return this.json.codes;
  }
  static fromJSON(t) {
    if (t === null)
      return null;
    let i = new u1();
    return i.json = t, i;
  }
  toJSONObject() {
    return { codes: this.codes, dateOfExpiry: this.dateOfExpiry.toJSONObject() };
  }
};
var c1 = class {
  constructor() {
    n(this, "json");
  }
  get vehicleCode() {
    return this.json.vehicleCode;
  }
  get vehicleRestriction() {
    return this.json.vehicleRestriction;
  }
  get dateOfIssue() {
    var t;
    return (t = S.fromJSON(this.json.dateOfIssue)) != null ? t : new S();
  }
  static fromJSON(t) {
    if (t === null)
      return null;
    let i = new c1();
    return i.json = t, i;
  }
  toJSONObject() {
    return { dateOfIssue: this.dateOfIssue.toJSONObject(), vehicleCode: this.vehicleCode, vehicleRestriction: this.vehicleRestriction };
  }
};
var _ = class {
  constructor() {
    n(this, "json");
  }
  get firstName() {
    return this.json.firstName;
  }
  get lastName() {
    return this.json.lastName;
  }
  get fullName() {
    return this.json.fullName;
  }
  get sex() {
    return this.json.sex;
  }
  get dateOfBirth() {
    return S.fromJSON(this.json.dateOfBirth);
  }
  get nationality() {
    return this.json.nationality;
  }
  get address() {
    return this.json.address;
  }
  get documentType() {
    return this.json.documentType;
  }
  get issuingCountryIso() {
    return this.json.issuingCountryIso;
  }
  get issuingCountry() {
    return this.json.issuingCountry;
  }
  get documentNumber() {
    return this.json.documentNumber;
  }
  get dateOfExpiry() {
    return S.fromJSON(this.json.dateOfExpiry);
  }
  get dateOfIssue() {
    return S.fromJSON(this.json.dateOfIssue);
  }
  toJSONObject() {
    return { firstName: this.firstName, lastName: this.lastName, fullName: this.fullName, sex: this.sex, dateOfBirth: this.dateOfBirth ? this.dateOfBirth.toJSONObject() : null, nationality: this.nationality, address: this.address, documentType: this.documentType, issuingCountryIso: this.issuingCountryIso, issuingCountry: this.issuingCountry, documentNumber: this.documentNumber, dateOfExpiry: this.dateOfExpiry ? this.dateOfExpiry.toJSONObject() : null, dateOfIssue: this.dateOfIssue ? this.dateOfIssue.toJSONObject() : null };
  }
};
var F = class {
  constructor() {
    n(this, "json");
    n(this, "_aamvaBarcodeResult");
    n(this, "_argentinaIdBarcodeResult");
    n(this, "_chinaMainlandTravelPermitMrzResult");
    n(this, "_chinaExitEntryPermitMrzResult");
    n(this, "_colombiaIdBarcodeResult");
    n(this, "_colombiaDlBarcodeResult");
    n(this, "_mrzResult");
    n(this, "_southAfricaIdBarcodeResult");
    n(this, "_southAfricaDlBarcodeResult");
    n(this, "_usUniformedServicesBarcodeResult");
    n(this, "_vizResult");
    n(this, "_imageInfo");
  }
  get capturedResultTypes() {
    return this.json.capturedResultTypes;
  }
  get aamvaBarcodeResult() {
    var t;
    return this._aamvaBarcodeResult == null && this.json.aamvaBarcodeResult != null && (this._aamvaBarcodeResult = I1.fromJSON(this.json.aamvaBarcodeResult)), (t = this._aamvaBarcodeResult) != null ? t : null;
  }
  get argentinaIdBarcodeResult() {
    var t;
    return this._argentinaIdBarcodeResult == null && this.json.argentinaIdBarcodeResult != null && (this._argentinaIdBarcodeResult = S1.fromJSON(this.json.argentinaIdBarcodeResult)), (t = this._argentinaIdBarcodeResult) != null ? t : null;
  }
  get chinaMainlandTravelPermitMrzResult() {
    var t;
    return this._chinaMainlandTravelPermitMrzResult == null && this.json.chinaMainlandTravelPermitMrzResult != null && (this._chinaMainlandTravelPermitMrzResult = h1.fromJSON(this.json.chinaMainlandTravelPermitMrzResult)), (t = this._chinaMainlandTravelPermitMrzResult) != null ? t : null;
  }
  get chinaExitEntryPermitMrzResult() {
    var t;
    return this._chinaExitEntryPermitMrzResult == null && this.json.chinaExitEntryPermitMrzResult != null && (this._chinaExitEntryPermitMrzResult = O1.fromJSON(this.json.chinaExitEntryPermitMrzResult)), (t = this._chinaExitEntryPermitMrzResult) != null ? t : null;
  }
  get colombiaIdBarcodeResult() {
    var t;
    return this._colombiaIdBarcodeResult == null && this.json.colombiaIdBarcodeResult != null && (this._colombiaIdBarcodeResult = E1.fromJSON(this.json.colombiaIdBarcodeResult)), (t = this._colombiaIdBarcodeResult) != null ? t : null;
  }
  get colombiaDlBarcodeResult() {
    var t;
    return this._colombiaDlBarcodeResult == null && this.json.colombiaDlBarcodeResult != null && (this._colombiaDlBarcodeResult = p1.fromJSON(this.json.colombiaDlBarcodeResult)), (t = this._colombiaDlBarcodeResult) != null ? t : null;
  }
  get mrzResult() {
    var t;
    return this._mrzResult == null && this.json.mrzResult != null && (this._mrzResult = A1.fromJSON(this.json.mrzResult)), (t = this._mrzResult) != null ? t : null;
  }
  get southAfricaIdBarcodeResult() {
    var t;
    return this._southAfricaIdBarcodeResult == null && this.json.southAfricaIdBarcodeResult != null && (this._southAfricaIdBarcodeResult = m1.fromJSON(this.json.southAfricaIdBarcodeResult)), (t = this._southAfricaIdBarcodeResult) != null ? t : null;
  }
  get southAfricaDlBarcodeResult() {
    var t;
    return this._southAfricaDlBarcodeResult == null && this.json.southAfricaDlBarcodeResult != null && (this._southAfricaDlBarcodeResult = _1.fromJSON(this.json.southAfricaDlBarcodeResult)), (t = this._southAfricaDlBarcodeResult) != null ? t : null;
  }
  get usUniformedServicesBarcodeResult() {
    var t;
    if (this._usUniformedServicesBarcodeResult == null && this.json.usUniformedServicesBarcodeResult != null) {
      let i = N1.fromJSON;
      this._usUniformedServicesBarcodeResult = i(this.json.usUniformedServicesBarcodeResult);
    }
    return (t = this._usUniformedServicesBarcodeResult) != null ? t : null;
  }
  get vizResult() {
    var t;
    return this._vizResult == null && this.json.vizResult != null && (this._vizResult = R1.fromJSON(this.json.vizResult)), (t = this._vizResult) != null ? t : null;
  }
  idImageOfType(t) {
    return this.json.imageInfo == null ? null : this.json.imageInfo[t];
  }
  get imageInfo() {
    var t;
    return this._imageInfo == null && this.json.imageInfo != null && (this._imageInfo = d1.fromJSON(this.json.imageInfo)), (t = this._imageInfo) != null ? t : null;
  }
  get documentType() {
    var t, i;
    return (i = (t = this.vizResult) == null ? void 0 : t.documentType) != null ? i : "none";
  }
  static fromJSON(t) {
    let i = new F();
    return i.json = t, i;
  }
  toJSONObject() {
    return { capturedResultTypes: this.capturedResultTypes, imageInfo: this.imageInfo ? this.imageInfo.toJSONObject() : null, aamvaBarcodeResult: this.aamvaBarcodeResult ? this.aamvaBarcodeResult.toJSONObject() : null, argentinaIdBarcodeResult: this.argentinaIdBarcodeResult ? this.argentinaIdBarcodeResult.toJSONObject() : null, chinaMainlandTravelPermitMrzResult: this.chinaMainlandTravelPermitMrzResult ? this.chinaMainlandTravelPermitMrzResult.toJSONObject() : null, chinaExitEntryPermitMrzResult: this.chinaExitEntryPermitMrzResult ? this.chinaExitEntryPermitMrzResult.toJSONObject() : null, colombiaIdBarcodeResult: this.colombiaIdBarcodeResult ? this.colombiaIdBarcodeResult.toJSONObject() : null, colombiaDlBarcodeResult: this.colombiaDlBarcodeResult ? this.colombiaDlBarcodeResult.toJSONObject() : null, mrzResult: this.mrzResult ? this.mrzResult.toJSONObject() : null, southAfricaDlBarcodeResult: this.southAfricaDlBarcodeResult ? this.southAfricaDlBarcodeResult.toJSONObject() : null, southAfricaIdBarcodeResult: this.southAfricaIdBarcodeResult ? this.southAfricaIdBarcodeResult.toJSONObject() : null, usUniformedServicesBarcodeResult: this.usUniformedServicesBarcodeResult ? this.usUniformedServicesBarcodeResult.toJSONObject() : null, vizResult: this.vizResult ? this.vizResult.toJSONObject() : null };
  }
};
var d1 = class {
  constructor() {
    n(this, "json");
  }
  get face() {
    return this.json.face;
  }
  get idBack() {
    return this.json.idBack;
  }
  get idFront() {
    return this.json.idFront;
  }
  static fromJSON(t) {
    let i = new d1();
    return i.json = t, i;
  }
  toJSONObject() {
    return { face: this.face, idBack: this.idBack, idFront: this.idFront };
  }
};
var I1 = class extends _ {
  get aamvaVersion() {
    return this.json.aamvaVersion;
  }
  get aliasFamilyName() {
    return this.json.aliasFamilyName;
  }
  get aliasGivenName() {
    return this.json.aliasGivenName;
  }
  get aliasSuffixName() {
    return this.json.aliasSuffixName;
  }
  get driverNamePrefix() {
    return this.json.driverNamePrefix;
  }
  get driverNameSuffix() {
    return this.json.driverNameSuffix;
  }
  get endorsementsCode() {
    return this.json.endorsementsCode;
  }
  get eyeColor() {
    return this.json.eyeColor;
  }
  get firstNameTruncation() {
    return this.json.firstNameTruncation;
  }
  get hairColor() {
    return this.json.hairColor;
  }
  get heightCm() {
    return this.json.heightCm;
  }
  get heightInch() {
    return this.json.heightInch;
  }
  get iIN() {
    return this.json.iin;
  }
  get issuingJurisdiction() {
    return this.json.issuingJurisdiction;
  }
  get issuingJurisdictionIso() {
    return this.json.issuingJurisdictionIso;
  }
  get jurisdictionVersion() {
    return this.json.jurisdictionVersion;
  }
  get lastNameTruncation() {
    return this.json.lastNameTruncation;
  }
  get middleName() {
    return this.json.middleName;
  }
  get middleNameTruncation() {
    return this.json.middleNameTruncation;
  }
  get placeOfBirth() {
    return this.json.placeOfBirth;
  }
  get race() {
    return this.json.race;
  }
  get restrictionsCode() {
    return this.json.restrictionsCode;
  }
  get vehicleClass() {
    return this.json.vehicleClass;
  }
  get weightKg() {
    return this.json.weightKg;
  }
  get weightLbs() {
    return this.json.weightLbs;
  }
  get cardRevisionDate() {
    return S.fromJSON(this.json.cardRevisionDate);
  }
  get documentDiscriminatorNumber() {
    return this.json.documentDiscriminatorNumber;
  }
  get barcodeDataElements() {
    return this.json.barcodeDataElements;
  }
  static fromJSON(i) {
    let r = new I1();
    return r.json = i, r;
  }
  toJSONObject() {
    return O2(h({}, super.toJSONObject()), { aamvaVersion: this.aamvaVersion, aliasFamilyName: this.aliasFamilyName, aliasGivenName: this.aliasGivenName, aliasSuffixName: this.aliasSuffixName, cardRevisionDate: this.cardRevisionDate ? this.cardRevisionDate.toJSONObject() : null, documentDiscriminatorNumber: this.documentDiscriminatorNumber, driverNamePrefix: this.driverNamePrefix, driverNameSuffix: this.driverNameSuffix, endorsementsCode: this.endorsementsCode, eyeColor: this.eyeColor, firstNameTruncation: this.firstNameTruncation, hairColor: this.hairColor, heightCm: this.heightCm, heightInch: this.heightInch, iin: this.iIN, issuingJurisdiction: this.issuingJurisdiction, issuingJurisdictionIso: this.issuingJurisdictionIso, jurisdictionVersion: this.jurisdictionVersion, lastNameTruncation: this.lastNameTruncation, middleName: this.middleName, middleNameTruncation: this.middleNameTruncation, placeOfBirth: this.placeOfBirth, race: this.race, restrictionsCode: this.restrictionsCode, vehicleClass: this.vehicleClass, weightKg: this.weightKg, weightLbs: this.weightLbs, barcodeDataElements: this.barcodeDataElements });
  }
};
var A1 = class extends _ {
  get documentCode() {
    return this.json.documentCode;
  }
  get namesAreTruncated() {
    return this.json.namesAreTruncated;
  }
  get optional() {
    return this.json.optional;
  }
  get optional1() {
    return this.json.optional1;
  }
  get capturedMrz() {
    return this.json.capturedMrz;
  }
  static fromJSON(i) {
    let r = new A1();
    return r.json = i, r;
  }
  toJSONObject() {
    return O2(h({}, super.toJSONObject()), { documentCode: this.documentCode, namesAreTruncated: this.namesAreTruncated, optional: this.optional, optional1: this.optional1, capturedMrz: this.capturedMrz });
  }
};
var N1 = class extends _ {
  get bloodType() {
    return this.json.bloodType;
  }
  get branchOfService() {
    return this.json.branchOfService;
  }
  get champusEffectiveDate() {
    return S.fromJSON(this.json.champusEffectiveDate);
  }
  get champusExpiryDate() {
    return S.fromJSON(this.json.champusExpiryDate);
  }
  get civilianHealthCareFlagCode() {
    return this.json.civilianHealthCareFlagCode;
  }
  get civilianHealthCareFlagDescription() {
    return this.json.civilianHealthCareFlagDescription;
  }
  get commissaryFlagCode() {
    return this.json.commissaryFlagCode;
  }
  get commissaryFlagDescription() {
    return this.json.commissaryFlagDescription;
  }
  get deersDependentSuffixCode() {
    return this.json.deersDependentSuffixCode;
  }
  get deersDependentSuffixDescription() {
    return this.json.deersDependentSuffixDescription;
  }
  get directCareFlagCode() {
    return this.json.directCareFlagCode;
  }
  get directCareFlagDescription() {
    return this.json.directCareFlagDescription;
  }
  get exchangeFlagCode() {
    return this.json.exchangeFlagCode;
  }
  get exchangeFlagDescription() {
    return this.json.exchangeFlagDescription;
  }
  get eyeColor() {
    return this.json.eyeColor;
  }
  get familySequenceNumber() {
    return this.json.familySequenceNumber;
  }
  get formNumber() {
    return this.json.formNumber;
  }
  get genevaConventionCategory() {
    return this.json.genevaConventionCategory;
  }
  get hairColor() {
    return this.json.hairColor;
  }
  get height() {
    return this.json.height;
  }
  get jpegData() {
    return this.json.jpegData;
  }
  get mwrFlagCode() {
    return this.json.mwrFlagCode;
  }
  get mwrFlagDescription() {
    return this.json.mwrFlagDescription;
  }
  get payGrade() {
    return this.json.payGrade;
  }
  get personDesignatorDocument() {
    return this.json.personDesignatorDocument;
  }
  get rank() {
    return this.json.rank;
  }
  get relationshipCode() {
    return this.json.relationshipCode;
  }
  get relationshipDescription() {
    return this.json.relationshipDescription;
  }
  get securityCode() {
    return this.json.securityCode;
  }
  get serviceCode() {
    return this.json.serviceCode;
  }
  get sponsorFlag() {
    return this.json.sponsorFlag;
  }
  get sponsorName() {
    return this.json.sponsorName;
  }
  get sponsorPersonDesignatorIdentifier() {
    return this.json.sponsorPersonDesignatorIdentifier;
  }
  get statusCode() {
    return this.json.statusCode;
  }
  get statusCodeDescription() {
    return this.json.statusCodeDescription;
  }
  get version() {
    return this.json.version;
  }
  get weight() {
    return this.json.weight;
  }
  static fromJSON(i) {
    let r = new N1();
    return r.json = i, r;
  }
  toJSONObject() {
    var i;
    return O2(h({}, super.toJSONObject()), { bloodType: this.bloodType, branchOfService: this.branchOfService, champusEffectiveDate: this.champusEffectiveDate ? this.champusEffectiveDate.toJSONObject() : null, champusExpiryDate: this.champusExpiryDate ? this.champusExpiryDate.toJSONObject() : null, civilianHealthCareFlagCode: this.civilianHealthCareFlagCode, civilianHealthCareFlagDescription: this.civilianHealthCareFlagDescription, commissaryFlagCode: this.commissaryFlagCode, commissaryFlagDescription: this.commissaryFlagDescription, deersDependentSuffixCode: this.deersDependentSuffixCode, deersDependentSuffixDescription: this.deersDependentSuffixDescription, directCareFlagCode: this.directCareFlagCode, directCareFlagDescription: this.directCareFlagDescription, exchangeFlagCode: this.exchangeFlagCode, exchangeFlagDescription: this.exchangeFlagDescription, eyeColor: this.eyeColor, familySequenceNumber: this.familySequenceNumber, formNumber: this.formNumber, genevaConventionCategory: this.genevaConventionCategory, hairColor: this.hairColor, height: this.height, jpegData: (i = this.jpegData) != null ? i : "", mwrFlagCode: this.mwrFlagCode, mwrFlagDescription: this.mwrFlagDescription, payGrade: this.payGrade, personDesignatorDocument: this.personDesignatorDocument, rank: this.rank, relationshipCode: this.relationshipCode, relationshipDescription: this.relationshipDescription, securityCode: this.securityCode, serviceCode: this.serviceCode, sponsorFlag: this.sponsorFlag, sponsorPersonDesignatorIdentifier: this.sponsorPersonDesignatorIdentifier, sponsorName: this.sponsorName, statusCode: this.statusCode, statusCodeDescription: this.statusCodeDescription, version: this.version, weight: this.weight });
  }
};
var R1 = class extends _ {
  get additionalAddressInformation() {
    return this.json.additionalAddressInformation;
  }
  get additionalNameInformation() {
    return this.json.additionalNameInformation;
  }
  get documentAdditionalNumber() {
    return this.json.documentAdditionalNumber;
  }
  get employer() {
    return this.json.employer;
  }
  get issuingAuthority() {
    return this.json.issuingAuthority;
  }
  get issuingJurisdiction() {
    return this.json.issuingJurisdiction;
  }
  get issuingJurisdictionIso() {
    return this.json.issuingJurisdictionIso;
  }
  get maritalStatus() {
    return this.json.maritalStatus;
  }
  get personalIdNumber() {
    return this.json.personalIdNumber;
  }
  get placeOfBirth() {
    return this.json.placeOfBirth;
  }
  get profession() {
    return this.json.profession;
  }
  get race() {
    return this.json.race;
  }
  get religion() {
    return this.json.religion;
  }
  get residentialStatus() {
    return this.json.residentialStatus;
  }
  get capturedSides() {
    return this.json.capturedSides;
  }
  get isBackSideCaptureSupported() {
    return this.json.isBackSideCaptureSupported;
  }
  static fromJSON(i) {
    let r = new R1();
    return r.json = i, r;
  }
  toJSONObject() {
    return O2(h({}, super.toJSONObject()), { additionalAddressInformation: this.additionalAddressInformation, additionalNameInformation: this.additionalNameInformation, documentAdditionalNumber: this.documentAdditionalNumber, employer: this.employer, issuingAuthority: this.issuingAuthority, issuingJurisdiction: this.issuingJurisdiction, issuingJurisdictionIso: this.issuingJurisdictionIso, maritalStatus: this.maritalStatus, personalIdNumber: this.personalIdNumber, placeOfBirth: this.placeOfBirth, profession: this.profession, race: this.race, religion: this.religion, residentialStatus: this.residentialStatus, capturedSides: this.capturedSides, isBackSideCaptureSupported: this.isBackSideCaptureSupported });
  }
};
var S1 = class extends _ {
  get personalIdNumber() {
    return this.json.personalIdNumber;
  }
  get documentCopy() {
    return this.json.documentCopy;
  }
  static fromJSON(i) {
    let r = new S1();
    return r.json = i, r;
  }
  toJSONObject() {
    return O2(h({}, super.toJSONObject()), { documentCopy: this.documentCopy, personalIdNumber: this.personalIdNumber });
  }
};
var h1 = class extends _ {
  get documentCode() {
    return this.json.documentCode;
  }
  get capturedMrz() {
    return this.json.capturedMrz;
  }
  get personalIdNumber() {
    return this.json.personalIdNumber;
  }
  get renewalTimes() {
    return this.json.renewalTimes;
  }
  get gbkName() {
    return this.json.gbkName;
  }
  get omittedCharacterCountInGBKName() {
    return this.json.omittedCharacterCountInGBKName;
  }
  get omittedNameCount() {
    return this.json.omittedNameCount;
  }
  get issuingAuthorityCode() {
    var i;
    return (i = this.json.issuingAuthorityCode) != null ? i : null;
  }
  static fromJSON(i) {
    let r = new h1();
    return r.json = i, r;
  }
  toJSONObject() {
    return O2(h({}, super.toJSONObject()), { documentCode: this.documentCode, capturedMrz: this.capturedMrz, personalIdNumber: this.personalIdNumber, renewalTimes: this.renewalTimes, gbkName: this.gbkName, omittedCharacterCountInGBKName: this.omittedCharacterCountInGBKName, omittedNameCount: this.omittedNameCount, issuingAuthorityCode: this.issuingAuthorityCode });
  }
};
var O1 = class extends _ {
  get documentCode() {
    return this.json.documentCode;
  }
  get capturedMrz() {
    return this.json.capturedMrz;
  }
  static fromJSON(i) {
    let r = new O1();
    return r.json = i, r;
  }
  toJSONObject() {
    return O2(h({}, super.toJSONObject()), { documentCode: this.documentCode, capturedMrz: this.capturedMrz });
  }
};
var E1 = class extends _ {
  get bloodType() {
    return this.json.bloodType;
  }
  static fromJSON(i) {
    let r = new E1();
    return r.json = i, r;
  }
  toJSONObject() {
    return O2(h({}, super.toJSONObject()), { bloodType: this.bloodType });
  }
};
var p1 = class extends _ {
  get categories() {
    return this.json.categories;
  }
  get identificationType() {
    return this.json.identificationType;
  }
  static fromJSON(i) {
    let r = new p1();
    return r.json = i, r;
  }
  toJSONObject() {
    return O2(h({}, super.toJSONObject()), { categories: this.categories, identificationType: this.identificationType });
  }
};
var m1 = class extends _ {
  get countryOfBirth() {
    return this.json.countryOfBirth;
  }
  get countryOfBirthIso() {
    return this.json.countryOfBirthIso;
  }
  get citizenshipStatus() {
    return this.json.citizenshipStatus;
  }
  get personalIdNumber() {
    return this.json.personalIdNumber;
  }
  static fromJSON(i) {
    let r = new m1();
    return r.json = i, r;
  }
  toJSONObject() {
    return O2(h({}, super.toJSONObject()), { countryOfBirth: this.countryOfBirth, countryOfBirthIso: this.countryOfBirthIso, citizenshipStatus: this.citizenshipStatus, personalIdNumber: this.personalIdNumber });
  }
};
var _1 = class extends _ {
  get version() {
    return this.json.version;
  }
  get licenseCountryOfIssue() {
    return this.json.licenseCountryOfIssue;
  }
  get personalIdNumber() {
    return this.json.personalIdNumber;
  }
  get personalIdNumberType() {
    return this.json.personalIdNumberType;
  }
  get documentCopy() {
    return this.json.documentCopy;
  }
  get driverRestrictionCodes() {
    return this.json.driverRestrictionCodes;
  }
  get professionalDrivingPermit() {
    return u1.fromJSON(this.json.professionalDrivingPermit);
  }
  get vehicleRestrictions() {
    return this.json.vehicleRestrictions.map((i) => c1.fromJSON(i)).filter((i) => i != null);
  }
  static fromJSON(i) {
    let r = new _1();
    return r.json = i, r;
  }
  toJSONObject() {
    return O2(h({}, super.toJSONObject()), { version: this.version, licenseCountryOfIssue: this.licenseCountryOfIssue, personalIdNumber: this.personalIdNumber, personalIdNumberType: this.personalIdNumberType, documentCopy: this.documentCopy, driverRestrictionCodes: this.driverRestrictionCodes, professionalDrivingPermit: this.professionalDrivingPermit ? this.professionalDrivingPermit.toJSONObject() : null, vehicleRestrictions: this.vehicleRestrictions.map((i) => i.toJSONObject()) });
  }
};
var w = class {
  constructor() {
    n(this, "_location");
  }
  get location() {
    return this._location;
  }
  static fromJSON(t) {
    let i = new w();
    return t.location != null && (i._location = be.fromJSON(t.location)), i;
  }
  toJSONObject() {
    return { location: this.location.toJSONObject() };
  }
};
var t1 = class {
  constructor() {
    n(this, "_location");
  }
  get location() {
    return this._location;
  }
  static fromJSON(t) {
    let i = new t1();
    return t.location != null && (i._location = be.fromJSON(t.location)), i;
  }
  toJSONObject() {
    return { location: this.location.toJSONObject() };
  }
};
var Y0 = (e) => ({ IdCapture: { RecommendedCameraSettings: ne.fromJSON(e.IdCapture.RecommendedCameraSettings), IdCaptureOverlayDefaults: { defaultCapturedBrush: { fillColor: W.fromJSON(e.IdCapture.IdCaptureOverlayDefaults.defaultCapturedBrush.fillColor), strokeColor: W.fromJSON(e.IdCapture.IdCaptureOverlayDefaults.defaultCapturedBrush.strokeColor), strokeWidth: e.IdCapture.IdCaptureOverlayDefaults.defaultCapturedBrush.strokeWidth }, defaultLocalizedBrush: { fillColor: W.fromJSON(e.IdCapture.IdCaptureOverlayDefaults.defaultLocalizedBrush.fillColor), strokeColor: W.fromJSON(e.IdCapture.IdCaptureOverlayDefaults.defaultLocalizedBrush.strokeColor), strokeWidth: e.IdCapture.IdCaptureOverlayDefaults.defaultLocalizedBrush.strokeWidth }, defaultRejectedBrush: { fillColor: W.fromJSON(e.IdCapture.IdCaptureOverlayDefaults.defaultRejectedBrush.fillColor), strokeColor: W.fromJSON(e.IdCapture.IdCaptureOverlayDefaults.defaultRejectedBrush.strokeColor), strokeWidth: e.IdCapture.IdCaptureOverlayDefaults.defaultRejectedBrush.strokeWidth } } } });
var f = Y0({ IdCapture: { RecommendedCameraSettings: { zoomFactor: 1, zoomGestureZoomFactor: 2, focusGestureStrategy: "manualUntilCapture", preferredResolution: "fullHd" }, IdCaptureOverlayDefaults: { defaultCapturedBrush: { fillColor: "#00000000", strokeColor: "#FFFFFFFF", strokeWidth: 3 }, defaultLocalizedBrush: { fillColor: "#00000000", strokeColor: "#FFFFFFFF", strokeWidth: 3 }, defaultRejectedBrush: { fillColor: "#00000000", strokeColor: "#FFFFFFFF", strokeWidth: 3 } } } });
var L = class {
  constructor() {
    n(this, "_type");
    n(this, "_message");
  }
  static create(t) {
    let i = new L();
    return t && (i._type = t.type, i._message = t.message), i;
  }
  get type() {
    return this._type;
  }
  get message() {
    return this._message;
  }
  static fromJSON(t) {
    let i = new L();
    return i._type = t.type, i._message = t.message, i;
  }
};
var r1 = class {
  constructor() {
    n(this, "_newlyCapturedId");
    n(this, "_frameSequenceId");
    n(this, "_localizedOnlyId");
    n(this, "_newlyRejectedId");
    n(this, "_error");
  }
  get newlyCapturedId() {
    return this._newlyCapturedId;
  }
  get frameSequenceId() {
    return this._frameSequenceId;
  }
  get localizedOnlyId() {
    return this._localizedOnlyId;
  }
  get newlyRejectedId() {
    return this._newlyRejectedId;
  }
  static fromJSON(t) {
    let i = new r1();
    return t.newlyCapturedId && (i._newlyCapturedId = F.fromJSON(t.newlyCapturedId)), t.localizedOnlyId && (i._localizedOnlyId = w.fromJSON(t.localizedOnlyId)), t.newlyRejectedId && (i._newlyRejectedId = t1.fromJSON(t.newlyRejectedId)), i._frameSequenceId = t.frameSequenceId, i._error = t.error != null ? L.fromJSON(t.error) : null, i;
  }
};
var Q0 = { [s.NONE]: null, [s.COUNT]: null, [s.AUSTRALIAN_CAPITAL_TERRITORY]: "Australian Capital Territory", [s.NEW_SOUTH_WALES]: "New South Wales", [s.NORTHERN_TERRITORY]: "Northern Territory", [s.QUEENSLAND]: "Queensland", [s.SOUTH_AUSTRALIA]: "South Australia", [s.TASMANIA]: "Tasmania", [s.WESTERN_AUSTRALIA]: "Western Australia", [s.VICTORIA]: "Victoria", [s.ALBERTA]: "Alberta", [s.BRITISH_COLUMBIA]: "British Columbia", [s.MANITOBA]: "Manitoba", [s.NEW_BRUNSWICK]: "New Brunswick", [s.NEWFOUNDLAND_AND_LABRADOR]: "Newfoundland and Labrador", [s.NOVA_SCOTIA]: "Nova Scotia", [s.QUEBEC]: "Quebec", [s.SASKATCHEWAN]: "Saskatchewan", [s.GUJARAT]: "Gujarat", [s.KARNATAKA]: "Karnataka", [s.KERALA]: "Kerala", [s.MADHYA_PRADESH]: "Madhya Pradesh", [s.MAHARASHTRA]: "Maharashtra", [s.PUNJAB]: "Punjab", [s.TAMIL_NADU]: "Tamil Nadu", [s.AGUASCALIENTES]: "Aguascalientes", [s.BAJA_CALIFORNIA]: "Baja California", [s.BAJA_CALIFORNIA_SUR]: "Baja California Sur", [s.CAMPECHE]: "Campeche", [s.CHIAPAS]: "Chiapas", [s.CHIHUAHUA]: "Chihuahua", [s.CIUDAD_DE_MEXICO]: "Mexico City", [s.COAHUILA]: "Coahuila", [s.COLIMA]: "Colima", [s.DURANGO]: "Durango", [s.GUANAJUATO]: "Guanajuato", [s.GUERRERO]: "Guerrero", [s.GUERRERO_COCULA]: "Cocula, Guerrero", [s.GUERRERO_JUCHITAN]: "Juchit\xE1n, Guerrero", [s.GUERRERO_TEPECOACUILCO]: "Tepecoacuilco de Trujano, Guerrero", [s.GUERRERO_TLACOAPA]: "Tlacoapa, Guerrero", [s.HIDALGO]: "Hidalgo", [s.JALISCO]: "Jalisco", [s.MEXICO]: "M\xE9xico", [s.MICHOACAN]: "Michoac\xE1n", [s.MORELOS]: "Morelos", [s.NAYARIT]: "Nayarit", [s.NUEVO_LEON]: "Nuevo Le\xF3n", [s.OAXACA]: "Oaxaca", [s.PUEBLA]: "Puebla", [s.UINTANA_ROO]: "Quintana Roo", [s.QUINTANA_ROO_BENITO_JUAREZ]: "Benito Ju\xE1rez, Quintana Roo", [s.QUINTANA_ROO_SOLIDARIDAD]: "Solidaridad, Quintana Roo", [s.QUINTANA_ROO_COZUMEL]: "Cozumel, Quintana Roo", [s.QUERETARO]: "Quer\xE9taro", [s.SAN_LUIS_POTOSI]: "San Luis Potos\xED", [s.SINALOA]: "Sinaloa", [s.SONORA]: "Sonora", [s.TABASCO]: "Tabasco", [s.TAMAULIPAS]: "Tamaulipas", [s.TLAXCALA]: "Tlaxcala", [s.VERACRUZ]: "Veracruz", [s.YUCATAN]: "Yucatan", [s.ZACATECAS]: "Zacatecas", [s.KHYBER_PAKHTUNKHWA]: "Khyber Pakhtunkhwa", [s.ALABAMA]: "Alabama", [s.ALASKA]: "Alaska", [s.ARIZONA]: "Arizona", [s.ARKANSAS]: "Arkansas", [s.CALIFORNIA]: "California", [s.COLORADO]: "Colorado", [s.CONNECTICUT]: "Connecticut", [s.DELAWARE]: "Delaware", [s.DISTRICT_OF_COLUMBIA]: "District of Columbia", [s.FLORIDA]: "Florida", [s.GEORGIA]: "Georgia", [s.HAWAII]: "Hawaii", [s.IDAHO]: "Idaho", [s.ILLINOIS]: "Illinois", [s.INDIANA]: "Indiana", [s.IOWA]: "Iowa", [s.KANSAS]: "Kansas", [s.KENTUCKY]: "Kentucky", [s.LOUISIANA]: "Louisiana", [s.MAINE]: "Maine", [s.MARYLAND]: "Maryland", [s.MASSACHUSETTS]: "Massachusetts", [s.MICHIGAN]: "Michigan", [s.MINNESOTA]: "Minnesota", [s.MISSISSIPPI]: "Mississippi", [s.MISSOURI]: "Missouri", [s.MONTANA]: "Montana", [s.NEBRASKA]: "Nebraska", [s.NEVADA]: "Nevada", [s.NEW_HAMPSHIRE]: "New Hampshire", [s.NEW_JERSEY]: "New Jersey", [s.NEW_MEXICO]: "New Mexico", [s.NEW_YORK]: "New York", [s.NEW_YORK_CITY]: "New York City", [s.NORTH_CAROLINA]: "North Carolina", [s.NORTH_DAKOTA]: "North Dakota", [s.OHIO]: "Ohio", [s.OKLAHOMA]: "Oklahoma", [s.ONTARIO]: "Ontario", [s.OREGON]: "Oregon", [s.PENNSYLVANIA]: "Pennsylvania", [s.RHODE_ISLAND]: "Rhode Island", [s.SOUTH_CAROLINA]: "South Carolina", [s.SOUTH_DAKOTA]: "South Dakota", [s.TENNESSEE]: "Tennessee", [s.TEXAS]: "Texas", [s.UTAH]: "Utah", [s.VERMONT]: "Vermont", [s.VIRGINIA]: "Virginia", [s.WASHINGTON]: "Washington", [s.WEST_VIRGINIA]: "West Virginia", [s.WISCONSIN]: "Wisconsin", [s.WYOMING]: "Wyoming", [s.YUKON]: "Yukon" };
function g0(e) {
  return Q0[e];
}
var C = class {
  static convertResultFromSimpleRecognizer(t) {
    return new Y1().convertResult(t);
  }
  static convertResultFromCombinedRecognizer(t) {
    return new Q1().convertResult(t);
  }
  convertResult(t) {
    return t == null || t.state === b.Empty ? null : F.fromJSON({ capturedResultTypes: [], mrzResult: null, vizResult: this.getVizData(t), aamvaBarcodeResult: null, argentinaIdBarcodeResult: null, chinaMainlandTravelPermitMrzResult: null, chinaExitEntryPermitMrzResult: null, colombiaIdBarcodeResult: null, colombiaDlBarcodeResult: null, southAfricaDlBarcodeResult: null, southAfricaIdBarcodeResult: null, usUniformedServicesBarcodeResult: null, imageInfo: this.getImageData(t) });
  }
  convertDate(t) {
    return t.successfullyParsed ? S.fromJSON({ day: t.day, month: t.month, year: t.year }) : null;
  }
  centaurusDocumentTypeToIdCaptureDocumentType(t) {
    switch (t) {
      case l.NONE:
      case l.COUNT:
        return "none";
      case l.CONSULAR_ID:
        return "consularId";
      case l.DL:
        return "drivingLicense";
      case l.DL_PUBLIC_SERVICES_CARD:
        return "drivingLicensePublicServicesCard";
      case l.EMPLOYMENT_PASS:
        return "employmentPass";
      case l.FIN_CARD:
        return "finCard";
      case l.ID:
        return "id";
      case l.MULTIPURPOSE_ID:
        return "multipurposeId";
      case l.MyKad:
        return "myKad";
      case l.MyKid:
        return "myKid";
      case l.MyPR:
        return "myPr";
      case l.MyTentera:
        return "myTentera";
      case l.PAN_CARD:
        return "panCard";
      case l.PROFESSIONAL_ID:
        return "professionalId";
      case l.PUBLIC_SERVICES_CARD:
        return "publicServicesCard";
      case l.RESIDENCE_PERMIT:
        return "residencePermit";
      case l.RESIDENT_ID:
        return "residentId";
      case l.TEMPORARY_RESIDENCE_PERMIT:
        return "temporaryResidencePermit";
      case l.VOTER_ID:
        return "voterId";
      case l.WORK_PERMIT:
        return "workPermit";
      case l.iKAD:
        return "iKad";
      case l.MILITARY_ID:
        return "militaryId";
      case l.MyKAS:
        return "myKas";
      case l.SOCIAL_SECURITY_CARD:
        return "socialSecurityCard";
      case l.HEALTH_INSURANCE_CARD:
        return "healthInsuranceCard";
      case l.PASSPORT:
        return "passport";
      case l.S_PASS:
        return "sPass";
      case l.ADDRESS_CARD:
        return "addressCard";
      case l.ALIEN_ID:
        return "alienId";
      case l.ALIEN_PASSPORT:
        return "alienPassport";
      case l.GREEN_CARD:
        return "greenCard";
      case l.MINORS_ID:
        return "minorsId";
      case l.POSTAL_ID:
        return "postalId";
      case l.PROFESSIONAL_DL:
        return "professionalDl";
      case l.TAX_ID:
        return "taxId";
      case l.WEAPON_PERMIT:
        return "weaponPermit";
      case l.VISA:
        return "visa";
      case l.BORDER_CROSSING_CARD:
        return "borderCrossingCard";
      case l.DRIVER_CARD:
        return "driverCard";
      case l.GLOBAL_ENTRY_CARD:
        return "globalEntryCard";
      case l.MyPolis:
        return "myPolis";
      case l.NEXUS_CARD:
        return "nexusCard";
      case l.PASSPORT_CARD:
        return "passportCard";
      case l.PROOF_OF_AGE_CARD:
        return "proofOfAgeCard";
      case l.REFUGEE_ID:
        return "refugeeId";
      case l.TRIBAL_ID:
        return "tribalId";
      case l.VETERAN_ID:
        return "veteranId";
      case l.CITIZENSHIP_CERTIFICATE:
        return "citizenshipCertificate";
      case l.MY_NUMBER_CARD:
        return "myNumberCard";
      case l.MINORS_PASSPORT:
        return "minorsPassport";
      case l.MINORS_PUBLIC_SERVICES_CARD:
        return "minorsPublicServicesCard";
      case l.CONSULAR_PASSPORT:
        return "diplomaticPassport";
    }
  }
  extractVizData(t, i) {
    var r, a;
    return { firstName: i.firstName, lastName: i.lastName, fullName: i.fullName, sex: i.sex, dateOfBirth: this.convertDate(i.dateOfBirth), nationality: i.nationality, address: i.address, documentType: this.centaurusDocumentTypeToIdCaptureDocumentType(t.documentType), issuingCountryIso: (r = t.isoAlpha3CountryCode) != null ? r : null, issuingCountry: (a = t.countryName) != null ? a : null, documentNumber: i.documentNumber, dateOfExpiry: this.convertDate(i.dateOfExpiry), dateOfIssue: this.convertDate(i.dateOfIssue), additionalAddressInformation: i.additionalAddressInformation, additionalNameInformation: i.additionalNameInformation, documentAdditionalNumber: i.documentAdditionalNumber, employer: i.employer, issuingAuthority: i.issuingAuthority, maritalStatus: i.maritalStatus, personalIdNumber: i.personalIdNumber, placeOfBirth: i.placeOfBirth, profession: i.profession, race: i.race, religion: i.religion, residentialStatus: i.residentialStatus, issuingJurisdiction: g0(t.region), issuingJurisdictionIso: null };
  }
  static concatenateReducer(t, i) {
    return t + String.fromCharCode(i);
  }
};
var Y1 = class extends C {
  getVizData(t) {
    return O2(h({}, this.extractVizData(t.classInfo, t.viz)), { capturedSides: "frontOnly", isBackSideCaptureSupported: false });
  }
  getImageData(t) {
    return { face: t.faceImage.encodedImage ? btoa(t.faceImage.encodedImage.reduce(C.concatenateReducer, "")) : null, idFront: t.fullDocumentImage.encodedImage ? btoa(t.fullDocumentImage.encodedImage.reduce(C.concatenateReducer, "")) : null, idBack: null };
  }
};
var Q1 = class extends C {
  isAamvaDrivingLicense(t) {
    if (t == null)
      return false;
    let i = t.documentType === "drivingLicense", r = typeof t.issuingCountryIso == "string" && ["USA", "MEX", "CAN"].includes(t.issuingCountryIso);
    return i && r;
  }
  getVizData(t) {
    let i = this.extractVizData(t.classInfo, t.frontViz), r = "backViz" in t && !t.backViz.empty, a = t.state === b.StageValid && t.scanningFirstSideDone || !t.backViz.empty, o = t.state === b.Valid && t.scanningFirstSideDone ? "frontAndBack" : "frontOnly", d = O2(h({}, i), { capturedSides: o, isBackSideCaptureSupported: a });
    if (!r)
      return d;
    let R2 = ["firstName", "lastName", "fullName", "sex", "nationality", "address", "documentNumber", "additionalAddressInformation", "additionalNameInformation", "documentAdditionalNumber", "employer", "issuingAuthority", "maritalStatus", "personalIdNumber", "placeOfBirth", "profession", "race", "religion", "residentialStatus"], A = t.backViz;
    for (let N of R2) {
      let E = d[N] == null || d[N] === "", M0 = N in A && typeof A[N] == "string" && A[N].length > 0;
      E && M0 && (d[N] = A[N]);
    }
    let U2 = ["dateOfBirth", "dateOfExpiry", "dateOfIssue"];
    for (let N of U2)
      d[N] instanceof S || (d[N] = this.convertDate(A[N]));
    return d;
  }
  getImageData(t) {
    return { face: t.faceImage.encodedImage ? btoa(t.faceImage.encodedImage.reduce(C.concatenateReducer, "")) : null, idFront: t.fullDocumentFrontImage.encodedImage ? btoa(t.fullDocumentFrontImage.encodedImage.reduce(C.concatenateReducer, "")) : null, idBack: t.fullDocumentBackImage.encodedImage ? btoa(t.fullDocumentBackImage.encodedImage.reduce(C.concatenateReducer, "")) : null };
  }
};
var P1 = class {
  constructor(t) {
    n(this, "recognizer");
    this.recognizer = t;
  }
};
var F1 = class extends P1 {
  async processResult(t) {
    if (t === b.Valid) {
      let i = await this.recognizer.getResult();
      return C.convertResultFromSimpleRecognizer(i);
    }
    return null;
  }
};
var w1 = class extends P1 {
  async processResult(t) {
    if (t === b.Valid || t === b.StageValid) {
      let i = await this.recognizer.getResult();
      return C.convertResultFromCombinedRecognizer(i);
    }
    return null;
  }
};
var v = class {
  constructor(t, i) {
    n(this, "idCapture");
    n(this, "idCaptureSettings");
    n(this, "centaurusWasmSDK");
    n(this, "isProcessing", false);
    n(this, "_lastError", null);
    n(this, "_lastResult", null);
    n(this, "configuringRecognizersPromise");
    n(this, "recognizer");
    n(this, "resultProcessor");
    n(this, "isDocumentInFrame", false);
    this.idCapture = t, this.centaurusWasmSDK = i;
  }
  async dispose() {
    var t;
    (t = v.recognizerRunner) == null || t.delete(), v.recognizerRunner = void 0, await this.recognizer.delete();
  }
  async configureRecognizers(t) {
    if (v.recognizerRunner != null)
      throw new J({ name: "MULTIPLE_RECOGNIZER_RUNNER", message: "A RecognizerRunner already exists, but it must be a singleton" });
    return this.configuringRecognizersPromise || (this.configuringRecognizersPromise = this.doConfigureRecognizers(t)), this.configuringRecognizersPromise;
  }
  async doConfigureRecognizers(t) {
    this.recognizer = await (t.supportedSides === "frontAndBack" ? E0(this.centaurusWasmSDK) : O0(this.centaurusWasmSDK));
    let i = await this.recognizer.currentSettings();
    i.returnFullDocumentImage = t.getShouldPassImageTypeToResult("idFront"), i.returnEncodedFullDocumentImage = t.getShouldPassImageTypeToResult("idFront"), i.returnFaceImage = t.getShouldPassImageTypeToResult("face"), i.returnEncodedFaceImage = t.getShouldPassImageTypeToResult("face");
    let r = new M1();
    r.enableMrzId = false, r.enableMrzPassport = false, r.enableMrzVisa = false, r.enablePhotoId = false, r.enableBarcodeId = false, r.enableFullDocumentRecognition = true, i.recognitionModeFilter = r;
    try {
      await this.recognizer.updateSettings(i);
    } catch (a) {
      g.log(g.Level.Warn, `Error while applying new settings on recognizer object, some features might not work. (error text: ${a == null ? void 0 : a.toString()})`);
    }
    v.recognizerRunner = await h0(this.centaurusWasmSDK, [this.recognizer], false, this), this.resultProcessor = t.supportedSides === "frontAndBack" ? new w1(this.recognizer) : new F1(this.recognizer);
  }
  onQuadDetection(t) {
    if (t.detectionStatus === L1.Success) {
      this.isDocumentInFrame = true;
      let i = w.fromJSON({ location: t });
      this.idCapture.reportLastLocalizedId(i);
    } else
      this.isDocumentInFrame = false, this.idCapture.reportLastLocalizedId(null);
  }
  set lastError(t) {
    t !== this._lastError && this.idCapture.reportLastError(t), this._lastError = t;
  }
  getLastError() {
    return this._lastError;
  }
  set lastResult(t) {
    this._lastResult = t, this.idCapture.reportLastResult(t);
  }
  get lastResult() {
    return this._lastResult;
  }
  async reset() {
    var t;
    await ((t = v.recognizerRunner) == null ? void 0 : t.resetRecognizers(true)), this._lastResult = null, this._lastError = null;
  }
  async processFrame(t) {
    if (!(this.isProcessing || v.recognizerRunner == null)) {
      this.isProcessing = true, await this.configuringRecognizersPromise;
      try {
        await this.recognize(t), this.lastError = null;
      } finally {
        this.isProcessing = false;
      }
    }
  }
  async recognize(t) {
    let i = new b1(O2(h({}, t), { colorSpace: "srgb" }), g1.NoRotation, false), r;
    try {
      r = await v.recognizerRunner.processImage(i);
    } catch (o) {
      let d = o instanceof D ? `Processing frame failed: ${o.message} (code=${o.code})` : `Processing frame failed: ${o instanceof Error ? o.message : "unknown error"}`;
      throw this.lastError = { type: "undefined", message: d }, L.create(this.getLastError());
    }
    let a = await this.resultProcessor.processResult(r);
    this.lastResult = this.isDocumentInFrame && a != null ? a : null;
  }
};
var s1 = v;
n(s1, "recognizerRunner");
var k1 = class {
  constructor() {
    n(this, "type", "idCapture");
    n(this, "_isEnabled", true);
    n(this, "settings");
    n(this, "_context", null);
    n(this, "listeners", []);
    n(this, "_centaurusConnector", new s1(this, k2.wasmSDK));
    n(this, "workerMessageListener", this.onWorkerMessage.bind(this));
    if (k2 != null)
      this._centaurusConnector = new s1(this, k2.wasmSDK);
    else
      throw new J({ name: "Misconfiguration error", message: 'Attempted to instantiate IdCapture but the idCaptureLoader has not been called. Did you forget to call it in "configure()"?' });
  }
  static async forContext(t, i) {
    let r = new k1();
    r.settings = i;
    try {
      await r._centaurusConnector.configureRecognizers(r.settings);
    } catch (a) {
      throw a instanceof J && a.name === "MULTIPLE_RECOGNIZER_RUNNER" && g.log(g.Level.Error, "The newly created IdCapture mode is invalid, an existing IdCapture mode is still attached to the context and must be removed first."), a;
    }
    return t && await t.addMode(r), r;
  }
  addListener(t) {
    this.listeners.includes(t) || this.listeners.push(t);
  }
  removeListener(t) {
    !this.listeners.includes(t) || this.listeners.splice(this.listeners.indexOf(t), 1);
  }
  isEnabled() {
    return this._isEnabled;
  }
  async setEnabled(t) {
    this._isEnabled = t, await this.didChange();
  }
  get context() {
    return this._context;
  }
  static get recommendedCameraSettings() {
    return new ne(f.IdCapture.RecommendedCameraSettings);
  }
  async reset() {
    this.context && (await this._centaurusConnector.reset(), await this.context.workerCommand("idCaptureReset", {}));
  }
  attachedToContext(t) {
    this._context = t, this._context.subscribeToWorkerMessages(this.workerMessageListener);
  }
  detachedFromContext() {
    var t;
    (t = this._context) == null || t.unsubscribeToWorkerMessages(this.workerMessageListener), this._context = null, this.dispose();
  }
  async dispose() {
    this.listeners = [], await this._centaurusConnector.dispose(), this._centaurusConnector = null;
  }
  async didChange() {
    if (this.context)
      return this.context.update();
  }
  async onWorkerMessage(t) {
    var i;
    switch (t.type) {
      case "idCaptureForwardFrame":
        try {
          await this._centaurusConnector.processFrame(t.payload);
        } catch (r) {
          r instanceof L ? (g.log(g.Level.Debug, r.message), this.triggerErrorListener(r)) : (g.log(g.Level.Debug, "Error while processing incoming frame from SDC", r), this.triggerErrorListener(L.create({ type: "undefined", message: "Error while processing a frame" })));
        }
        (i = this.context) == null || i.workerCommand("idCaptureFrameProcessed", {});
        break;
      case "idCaptureDidCaptureId":
        this.triggerListenersForResult("didCaptureId", t.payload);
        break;
      case "idCaptureDidRejectId":
        this.triggerListenersForResult("didRejectId", t.payload);
        break;
      case "idCaptureDidLocalizeId":
        this.triggerListenersForResult("didLocalizeId", t.payload);
        break;
    }
  }
  sendClearFrameDataRequest(t) {
    setTimeout(() => {
      var i;
      (i = this.context) == null || i.workerCommand("deleteFrameData", { frameId: t });
    }, 0);
  }
  async triggerListenersForResult(t, i) {
    let { frameData: r } = i;
    if (!this._isEnabled) {
      this.sendClearFrameDataRequest(r.frameId);
      return;
    }
    let a = r1.fromJSON(i.session);
    try {
      for (let o of this.listeners)
        if (typeof o[t] == "function") {
          let d = o[t](this, a, xo(r, this.context));
          d instanceof Promise && await d;
        }
    } finally {
      this.sendClearFrameDataRequest(r.frameId);
    }
  }
  triggerErrorListener(t) {
    if (!!this._isEnabled)
      for (let i of this.listeners)
        typeof i.didFailWithError == "function" && i.didFailWithError(this, t, null);
  }
  reportLastResult(t) {
    this.context && this.context.workerCommand("idCaptureSetLastResult", { result: t != null ? JSON.stringify(t.toJSONObject()) : "" });
  }
  reportLastError(t) {
    this.context && this.context.workerCommand("idCaptureSetLastError", { error: t != null ? JSON.stringify(t) : "" });
  }
  reportLastLocalizedId(t) {
    this.context && this.context.workerCommand("idCaptureSetLastLocalizedId", { localizedId: t != null ? JSON.stringify(t.toJSONObject()) : "" });
  }
  toJSONObject() {
    return { enabled: this._isEnabled, type: this.type, settings: this.settings.toJSONObject() };
  }
};
var D1 = class {
  constructor() {
    n(this, "type", "idCapture");
    n(this, "idCapture");
    n(this, "_idLayout", "auto");
    n(this, "_idLayoutStyle", "rounded");
    n(this, "_defaultCapturedBrush", new mt(f.IdCapture.IdCaptureOverlayDefaults.defaultCapturedBrush.fillColor, f.IdCapture.IdCaptureOverlayDefaults.defaultCapturedBrush.strokeColor, f.IdCapture.IdCaptureOverlayDefaults.defaultCapturedBrush.strokeWidth));
    n(this, "_defaultLocalizedBrush", new mt(f.IdCapture.IdCaptureOverlayDefaults.defaultLocalizedBrush.fillColor, f.IdCapture.IdCaptureOverlayDefaults.defaultLocalizedBrush.strokeColor, f.IdCapture.IdCaptureOverlayDefaults.defaultLocalizedBrush.strokeWidth));
    n(this, "_defaultRejectedBrush", new mt(f.IdCapture.IdCaptureOverlayDefaults.defaultRejectedBrush.fillColor, f.IdCapture.IdCaptureOverlayDefaults.defaultRejectedBrush.strokeColor, f.IdCapture.IdCaptureOverlayDefaults.defaultRejectedBrush.strokeWidth));
    n(this, "_capturedBrush", this._defaultCapturedBrush);
    n(this, "_localizedBrush", this._defaultLocalizedBrush);
    n(this, "_rejectedBrush", this._defaultRejectedBrush);
    n(this, "_idLayoutLineStyle", "light");
  }
  static withIdCapture(t) {
    return D1.withIdCaptureForView(t, null);
  }
  static async withIdCaptureForView(t, i) {
    let r = new D1();
    return r.idCapture = t, await r.setCapturedBrush(r.defaultCapturedBrush), await r.setLocalizedBrush(r.defaultLocalizedBrush), await r.setRejectedBrush(r.defaultRejectedBrush), i && await i.addOverlay(r), r;
  }
  setIdLayout(t) {
    this._idLayout = t, this.idCapture.didChange();
  }
  get idLayoutStyle() {
    return this._idLayoutStyle;
  }
  set idLayoutStyle(t) {
    this._idLayoutStyle = t, this.idCapture.didChange();
  }
  get idLayoutLineStyle() {
    return this._idLayoutLineStyle;
  }
  set idLayoutLineStyle(t) {
    this._idLayoutLineStyle = t, this.idCapture.didChange();
  }
  getCapturedBrush() {
    return this._capturedBrush;
  }
  async setCapturedBrush(t) {
    this._capturedBrush = t, await this.idCapture.didChange();
  }
  getLocalizedBrush() {
    return this._localizedBrush;
  }
  async setLocalizedBrush(t) {
    this._localizedBrush = t, await this.idCapture.didChange();
  }
  getRejectedBrush() {
    return this._rejectedBrush;
  }
  async setRejectedBrush(t) {
    this._rejectedBrush = t, await this.idCapture.didChange();
  }
  get defaultCapturedBrush() {
    return this._defaultCapturedBrush;
  }
  get defaultLocalizedBrush() {
    return this._defaultLocalizedBrush;
  }
  get defaultRejectedBrush() {
    return this._defaultRejectedBrush;
  }
  toJSONObject() {
    return { type: this.type, idLayout: this._idLayout, idLayoutStyle: this.idLayoutStyle, idLayoutLineStyle: this.idLayoutLineStyle, capturedBrush: this._capturedBrush.toJSONObject(), localizedBrush: this._localizedBrush.toJSONObject(), rejectedBrush: this._rejectedBrush.toJSONObject() };
  }
};
var T0 = class {
  constructor() {
    n(this, "properties", {});
    n(this, "imageToResult", {});
    n(this, "supportedDocuments", []);
    n(this, "supportedSides", "frontOnly");
  }
  setProperty(t, i) {
    this.properties[t] = i;
  }
  getProperty(t) {
    return this.properties[t];
  }
  setShouldPassImageTypeToResult(t, i) {
    this.imageToResult[t] = i;
  }
  getShouldPassImageTypeToResult(t) {
    var i;
    return (i = this.imageToResult[t]) != null ? i : false;
  }
  toJSONObject() {
    var t;
    return { licenseKey: (t = k2.licenseKey) != null ? t : "", licensee: "", supportedDocuments: this.supportedDocuments, imageToResult: this.imageToResult, supportedSides: this.supportedSides, properties: this.properties };
  }
};
var k2;
function ut() {
  return { moduleName: "BarcodeCapture", load: async (e) => {
    var i;
    n1 = await e1.create(e);
    let t = await n1.workerCommand("extractCentaurusLicense", { licenseKey: e.licenseKey });
    return k2 = await B.load({ libraryLocation: `${e.libraryLocation}idcapture/`, licenseKey: t.centaurus.licenseKey, logLevel: (i = e.logLevel) != null ? i : g.Level.Debug }), n1;
  } };
}
var n1;

// ui.ts
var import_dompurify = __toESM(require_purify(), 1);
var elements = {
  dataCaptureView: document.getElementById("data-capture-view"),
  selector: document.getElementById("selector"),
  alert: document.getElementById("alert"),
  result: document.getElementById("result"),
  resultContent: document.getElementById("result-content"),
  resultHeader: document.getElementById("result-header"),
  resultFooter: document.getElementById("result-footer")
};
function getSelectedMode() {
  return elements.selector.querySelector("button.active").dataset.mode;
}
function onModeSwitched(buttonElement) {
  var _a;
  (_a = elements.selector.querySelector("button.active")) == null ? void 0 : _a.classList.remove("active");
  buttonElement.classList.add("active");
}
function confirmScanningBackside(capturedId) {
  elements.alert.innerHTML = `
    <p>This document has additional data on the back of the card.</p>
    <div>
      <button skip>Skip</button>
      <button onclick="window.dispatchAction('SCAN_BACKSIDE')">Scan</button>
    </div>
  `;
  const skipButton = elements.alert.querySelector("button[skip]");
  skipButton.addEventListener("click", () => {
    window.dispatchAction("SKIP_BACKSIDE" /* SKIP_BACKSIDE */, capturedId);
  });
  elements.alert.removeAttribute("hidden");
}
function showWarning(text) {
  elements.alert.innerHTML = `
    <p>${(0, import_dompurify.sanitize)(text)}</p>
    <div class="single">
      <button onclick="window.dispatchAction('CLOSE_WARNING')">Close</button>
    </div>
  `;
  elements.alert.removeAttribute("hidden");
}
function showResult(capturedId) {
  var _a;
  function f2(value) {
    if (value == null || value === "") {
      return "<i>empty</i>";
    }
    if (value instanceof S) {
      if (value.day && value.month && value.year) {
        return `${value.year}-${value.month}-${value.day}`;
      }
      return "<i>empty</i>";
    }
    if (value instanceof u1) {
      return `<div>
          <p class="label">Codes</p><p>${f2(value.codes)}</p>
          <p class="label">Date of Expiry</p><p>${f2(value.dateOfExpiry)}</p>
        </div>`;
    }
    if (value instanceof c1) {
      return `<div>
          <p class="label">Vehicle Code</p><p>${f2(value.vehicleCode)}</p>
          <p class="label">Vehicle Restriction</p><p>${f2(value.vehicleRestriction)}</p>
          <p class="label">Date of Issue</p><p>${f2(value.dateOfIssue)}</p>
        </div>`;
    }
    if (Array.isArray(value)) {
      return value.map((element) => f2(element)).join("<br>");
    }
    return (0, import_dompurify.sanitize)(value);
  }
  let result = "";
  let header = "";
  function commonFields(data) {
    result += `<p class="label">First Name</p><p>${f2(data.firstName)}</p>`;
    result += `<p class="label">Last Name</p><p>${f2(data.lastName)}</p>`;
    result += `<p class="label">Full Name</p><p>${f2(data.fullName)}</p>`;
    result += `<p class="label">Sex</p><p>${f2(data.sex)}</p>`;
    result += `<p class="label">Date of Birth</p><p>${f2(data.dateOfBirth)}</p>`;
    result += `<p class="label">Nationality</p><p>${f2(data.nationality)}</p>`;
    result += `<p class="label">Address</p><p>${f2(data.address)}</p>`;
    result += `<p class="label">Document Type</p><p>${f2(data.documentType)}</p>`;
    result += `<p class="label">Issuing Country ISO</p><p>${f2(data.issuingCountryIso)}</p>`;
    result += `<p class="label">Issuing Country</p><p>${f2(data.issuingCountry)}</p>`;
    result += `<p class="label">Document Number</p><p>${f2(data.documentNumber)}</p>`;
    result += `<p class="label">Date of Expiry</p><p>${f2(data.dateOfExpiry)}</p>`;
    result += `<p class="label">Date of Issue</p><p>${f2(data.dateOfIssue)}</p>`;
  }
  if (capturedId.idImageOfType(m0.Face) != null) {
    result += `<p class="label">Face</p>`;
    result += `<img src="data:image/png;base64,${(_a = capturedId.idImageOfType(m0.Face)) != null ? _a : ""}" />`;
  }
  if (capturedId.aamvaBarcodeResult) {
    header = "Aamva Barcode Result";
    commonFields(capturedId.aamvaBarcodeResult);
    result += `<p class="label">AAMVA Version</p><p>${f2(capturedId.aamvaBarcodeResult.aamvaVersion)}</p>`;
    result += `<p class="label">Alias Family Name</p><p>${f2(capturedId.aamvaBarcodeResult.aliasFamilyName)}</p>`;
    result += `<p class="label">Alias Given Name</p><p>${f2(capturedId.aamvaBarcodeResult.aliasGivenName)}</p>`;
    result += `<p class="label">Alias Suffix Name</p><p>${f2(capturedId.aamvaBarcodeResult.aliasSuffixName)}</p>`;
    result += `<p class="label">Driver Name Prefix</p><p>${f2(capturedId.aamvaBarcodeResult.driverNamePrefix)}</p>`;
    result += `<p class="label">Driver Name Suffix</p><p>${f2(capturedId.aamvaBarcodeResult.driverNameSuffix)}</p>`;
    result += `<p class="label">Endorsements Code</p><p>${f2(capturedId.aamvaBarcodeResult.endorsementsCode)}</p>`;
    result += `<p class="label">Eye Color</p><p>${f2(capturedId.aamvaBarcodeResult.eyeColor)}</p>`;
    result += `<p class="label">First Name Truncation</p><p>${f2(capturedId.aamvaBarcodeResult.firstNameTruncation)}</p>`;
    result += `<p class="label">Hair Color</p><p>${f2(capturedId.aamvaBarcodeResult.hairColor)}</p>`;
    result += `<p class="label">Height CM</p><p>${f2(capturedId.aamvaBarcodeResult.heightCm)}</p>`;
    result += `<p class="label">Height Inch</p><p>${f2(capturedId.aamvaBarcodeResult.heightInch)}</p>`;
    result += `<p class="label">I In</p><p>${f2(capturedId.aamvaBarcodeResult.iIN)}</p>`;
    result += `<p class="label">Issuing Jurisdiction</p><p>${f2(capturedId.aamvaBarcodeResult.issuingJurisdiction)}</p>`;
    result += `<p class="label">Issuing Jurisdiction ISO</p><p>${f2(capturedId.aamvaBarcodeResult.issuingJurisdictionIso)}</p>`;
    result += `<p class="label">Jurisdiction Version</p><p>${f2(capturedId.aamvaBarcodeResult.jurisdictionVersion)}</p>`;
    result += `<p class="label">Last Name Truncation</p><p>${f2(capturedId.aamvaBarcodeResult.lastNameTruncation)}</p>`;
    result += `<p class="label">Middle Name</p><p>${f2(capturedId.aamvaBarcodeResult.middleName)}</p>`;
    result += `<p class="label">Middle Name Truncation</p><p>${f2(capturedId.aamvaBarcodeResult.middleNameTruncation)}</p>`;
    result += `<p class="label">Place Of Birth</p><p>${f2(capturedId.aamvaBarcodeResult.placeOfBirth)}</p>`;
    result += `<p class="label">Race</p><p>${f2(capturedId.aamvaBarcodeResult.race)}</p>`;
    result += `<p class="label">Restrictions Code</p><p>${f2(capturedId.aamvaBarcodeResult.restrictionsCode)}</p>`;
    result += `<p class="label">Vehicle Class</p><p>${f2(capturedId.aamvaBarcodeResult.vehicleClass)}</p>`;
    result += `<p class="label">Weight Kg</p><p>${f2(capturedId.aamvaBarcodeResult.weightKg)}</p>`;
    result += `<p class="label">Weight Lbs</p><p>${f2(capturedId.aamvaBarcodeResult.weightLbs)}</p>`;
    result += `<p class="label">Card Revision Date</p><p>${f2(capturedId.aamvaBarcodeResult.cardRevisionDate)}</p>`;
    result += `<p class="label">Document Discriminator Number</p><p>${f2(capturedId.aamvaBarcodeResult.documentDiscriminatorNumber)}</p>`;
    result += `<p class="label">Barcode Data Elements</p><p>${f2(capturedId.aamvaBarcodeResult.barcodeDataElements)}</p>`;
  }
  if (capturedId.argentinaIdBarcodeResult) {
    header = "Argentinian ID Barcode Result";
    commonFields(capturedId.argentinaIdBarcodeResult);
    result += `<p class="label">Personal Id Number</p><p>${f2(capturedId.argentinaIdBarcodeResult.personalIdNumber)}</p>`;
    result += `<p class="label">Document Copy</p><p>${f2(capturedId.argentinaIdBarcodeResult.documentCopy)}</p>`;
  }
  if (capturedId.chinaMainlandTravelPermitMrzResult) {
    header = "China Mainland Travel Permit MRZ Result";
    result += `<p class="label">Document Code</p><p>${f2(capturedId.chinaMainlandTravelPermitMrzResult.documentCode)}</p>`;
    result += `<p class="label">Captured MRZ</p><p>${f2(capturedId.chinaMainlandTravelPermitMrzResult.capturedMrz)}</p>`;
    result += `<p class="label">Personal ID Number</p><p>${f2(capturedId.chinaMainlandTravelPermitMrzResult.personalIdNumber)}</p>`;
    result += `<p class="label">Renewal times</p><p>${f2(capturedId.chinaMainlandTravelPermitMrzResult.renewalTimes)}</p>`;
    result += `<p class="label">GBK Name</p><p>${f2(capturedId.chinaMainlandTravelPermitMrzResult.gbkName)}</p>`;
    result += `<p class="label">Omitted Character Count In GBK Name</p><p>${f2(capturedId.chinaMainlandTravelPermitMrzResult.omittedCharacterCountInGBKName)}</p>`;
    result += `<p class="label">Omitted Name Count</p><p>${f2(capturedId.chinaMainlandTravelPermitMrzResult.omittedNameCount)}</p>`;
    result += `<p class="label">Issuing Authority Code</p><p>${f2(capturedId.chinaMainlandTravelPermitMrzResult.issuingAuthorityCode)}</p>`;
  }
  if (capturedId.chinaExitEntryPermitMrzResult) {
    header = "China Exit-Entry Permit MRZ Result";
    result += `<p class="label">Document Code</p><p>${f2(capturedId.chinaExitEntryPermitMrzResult.documentCode)}</p>`;
    result += `<p class="label">Captured MRZ</p><p>${f2(capturedId.chinaExitEntryPermitMrzResult.capturedMrz)}</p>`;
  }
  if (capturedId.colombiaIdBarcodeResult) {
    header = "Columbian ID Barcode Result";
    commonFields(capturedId.colombiaIdBarcodeResult);
    result += `<p class="label">Blood Type</p><p>${f2(capturedId.colombiaIdBarcodeResult.bloodType)}</p>`;
  }
  if (capturedId.colombiaDlBarcodeResult) {
    header = "Columbian Driver License Barcode Result";
    commonFields(capturedId.colombiaDlBarcodeResult);
    result += `
      <p class="label">Identification Type</p>
      <p>${f2(capturedId.colombiaDlBarcodeResult.identificationType)}</p>
    `;
    result += `<p class="label">Categories</p><p>${f2(capturedId.colombiaDlBarcodeResult.categories)}</p>`;
  }
  if (capturedId.mrzResult) {
    header = "MRZ Result";
    commonFields(capturedId.mrzResult);
    result += `<p class="label">Document Code</p><p>${f2(capturedId.mrzResult.documentCode)}</p>`;
    result += `<p class="label">Names Are Truncated</p><p>${f2(capturedId.mrzResult.namesAreTruncated)}</p>`;
    result += `<p class="label">Optional</p><p>${f2(capturedId.mrzResult.optional)}</p>`;
    result += `<p class="label">Optional1</p><p>${f2(capturedId.mrzResult.optional1)}</p>`;
    result += `<p class="label">Captured Mrz</p><p>${f2(capturedId.mrzResult.capturedMrz)}</p>`;
  }
  if (capturedId.southAfricaIdBarcodeResult) {
    header = "South African ID Barcode Result";
    commonFields(capturedId.southAfricaIdBarcodeResult);
    result += `<p class="label">Country Of Birth</p><p>${f2(capturedId.southAfricaIdBarcodeResult.countryOfBirth)}</p>`;
    result += `<p class="label">Country Of Birth Iso</p><p>${f2(capturedId.southAfricaIdBarcodeResult.countryOfBirthIso)}</p>`;
    result += `<p class="label">Citizenship Status</p><p>${f2(capturedId.southAfricaIdBarcodeResult.citizenshipStatus)}</p>`;
    result += `<p class="label">Personal Id Number</p><p>${f2(capturedId.southAfricaIdBarcodeResult.personalIdNumber)}</p>`;
  }
  if (capturedId.southAfricaDlBarcodeResult) {
    header = "South African Driver License Barcode Result";
    commonFields(capturedId.southAfricaDlBarcodeResult);
    result += `<p class="label">Version</p><p>${f2(capturedId.southAfricaDlBarcodeResult.version)}</p>`;
    result += `<p class="label">License Country Of Issue</p><p>${f2(capturedId.southAfricaDlBarcodeResult.licenseCountryOfIssue)}</p>`;
    result += `<p class="label">Personal Id Number</p><p>${f2(capturedId.southAfricaDlBarcodeResult.personalIdNumber)}</p>`;
    result += `<p class="label">Personal Id Number Type</p><p>${f2(capturedId.southAfricaDlBarcodeResult.personalIdNumberType)}</p>`;
    result += `<p class="label">Document Copy</p><p>${f2(capturedId.southAfricaDlBarcodeResult.documentCopy)}</p>`;
    result += `<p class="label">Driver Restriction Codes</p><p>${f2(capturedId.southAfricaDlBarcodeResult.driverRestrictionCodes)}</p>`;
    result += `<p class="label">Professional Driving Permit</p><p>${f2(capturedId.southAfricaDlBarcodeResult.professionalDrivingPermit)}</p>`;
    result += `<p class="label">Vehicle Restrictions</p><p>${f2(capturedId.southAfricaDlBarcodeResult.vehicleRestrictions)}</p>`;
  }
  if (capturedId.usUniformedServicesBarcodeResult) {
    header = "US Uniformed Services Barcode Result";
    commonFields(capturedId.usUniformedServicesBarcodeResult);
    result += `<p class="label">Blood Type</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.bloodType)}</p>`;
    result += `<p class="label">Branch Of Service</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.branchOfService)}</p>`;
    result += `<p class="label">Champus Effective Date</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.champusEffectiveDate)}</p>`;
    result += `<p class="label">Champus Expiry Date</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.champusExpiryDate)}</p>`;
    result += `<p class="label">Civilian Health Care Flag Code</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.civilianHealthCareFlagCode)}</p>`;
    result += `<p class="label">Civilian Health Care Flag Description</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.civilianHealthCareFlagDescription)}</p>`;
    result += `<p class="label">Commissary Flag Code</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.commissaryFlagCode)}</p>`;
    result += `<p class="label">Commissary Flag Description</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.commissaryFlagDescription)}</p>`;
    result += `<p class="label">Deers Dependent Suffix Code</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.deersDependentSuffixCode)}</p>`;
    result += `<p class="label">Deers Dependent Suffix Description</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.deersDependentSuffixDescription)}</p>`;
    result += `<p class="label">Direct Care Flag Code</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.directCareFlagCode)}</p>`;
    result += `<p class="label">Direct Care Flag Description</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.directCareFlagDescription)}</p>`;
    result += `<p class="label">Exchange Flag Code</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.exchangeFlagCode)}</p>`;
    result += `<p class="label">Exchange Flag Description</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.exchangeFlagDescription)}</p>`;
    result += `<p class="label">Eye Color</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.eyeColor)}</p>`;
    result += `<p class="label">Family Sequence Number</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.familySequenceNumber)}</p>`;
    result += `<p class="label">Form Number</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.formNumber)}</p>`;
    result += `<p class="label">Geneva Convention Category</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.genevaConventionCategory)}</p>`;
    result += `<p class="label">Hair Color</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.hairColor)}</p>`;
    result += `<p class="label">Height</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.height)}</p>`;
    result += `<p class="label">Jpeg Data</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.jpegData)}</p>`;
    result += `<p class="label">Mwr Flag Code</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.mwrFlagCode)}</p>`;
    result += `<p class="label">Mwr Flag Description</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.mwrFlagDescription)}</p>`;
    result += `<p class="label">Pay Grade</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.payGrade)}</p>`;
    result += `<p class="label">Person Designator Document</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.personDesignatorDocument)}</p>`;
    result += `<p class="label">Rank</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.rank)}</p>`;
    result += `<p class="label">Relationship Code</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.relationshipCode)}</p>`;
    result += `<p class="label">Relationship Description</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.relationshipDescription)}</p>`;
    result += `<p class="label">Security Code</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.securityCode)}</p>`;
    result += `<p class="label">Service Code</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.serviceCode)}</p>`;
    result += `<p class="label">Sponsor Flag</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.sponsorFlag)}</p>`;
    result += `<p class="label">Sponsor Name</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.sponsorName)}</p>`;
    result += `<p class="label">Sponsor Person Designator Identifier</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.sponsorPersonDesignatorIdentifier)}</p>`;
    result += `<p class="label">Status Code</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.statusCode)}</p>`;
    result += `<p class="label">Status Code Description</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.statusCodeDescription)}</p>`;
    result += `<p class="label">Version</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.version)}</p>`;
    result += `<p class="label">Weight</p><p>${f2(capturedId.usUniformedServicesBarcodeResult.weight)}</p>`;
  }
  if (capturedId.vizResult) {
    header = "VIZ Result";
    commonFields(capturedId.vizResult);
    result += `<p class="label">Additional Address Information</p><p>${f2(capturedId.vizResult.additionalAddressInformation)}</p>`;
    result += `<p class="label">Additional Name Information</p><p>${f2(capturedId.vizResult.additionalNameInformation)}</p>`;
    result += `<p class="label">Document Additional Number</p><p>${f2(capturedId.vizResult.documentAdditionalNumber)}</p>`;
    result += `<p class="label">Employer</p><p>${f2(capturedId.vizResult.employer)}</p>`;
    result += `<p class="label">Issuing Authority</p><p>${f2(capturedId.vizResult.issuingAuthority)}</p>`;
    result += `<p class="label">Issuing Jurisdiction</p><p>${f2(capturedId.vizResult.issuingJurisdiction)}</p>`;
    result += `<p class="label">Marital Status</p><p>${f2(capturedId.vizResult.maritalStatus)}</p>`;
    result += `<p class="label">Personal Id Number</p><p>${f2(capturedId.vizResult.personalIdNumber)}</p>`;
    result += `<p class="label">Place Of Birth</p><p>${f2(capturedId.vizResult.placeOfBirth)}</p>`;
    result += `<p class="label">Profession</p><p>${f2(capturedId.vizResult.profession)}</p>`;
    result += `<p class="label">Race</p><p>${f2(capturedId.vizResult.race)}</p>`;
    result += `<p class="label">Religion</p><p>${f2(capturedId.vizResult.religion)}</p>`;
    result += `<p class="label">Residential Status</p><p>${f2(capturedId.vizResult.residentialStatus)}</p>`;
    result += `<p class="label">Captured Sides</p><p>${f2(capturedId.vizResult.capturedSides)}</p>`;
    result += `<p class="label">Is Back Side Capture Supported</p><p>${f2(capturedId.vizResult.isBackSideCaptureSupported)}</p>`;
  }
  elements.resultContent.innerHTML = result;
  elements.resultHeader.innerHTML = header;
  elements.result.removeAttribute("hidden");
  elements.resultContent.scrollTop = 0;
}
function closeDialog() {
  elements.alert.setAttribute("hidden", "true");
}
function closeResults() {
  elements.result.setAttribute("hidden", "true");
}

// index.ts
var LICENSE_KEY = "YOUR_LICENSE_KEY_HERE";
var context;
var idCapture;
var view;
var overlay;
var camera;
var currentMode;
var supportedDocumentsByMode = {
  barcode: [
    x0.AAMVABarcode,
    x0.ColombiaIdBarcode,
    x0.ColombiaDlBarcode,
    x0.USUSIdBarcode,
    x0.ArgentinaIdBarcode,
    x0.SouthAfricaDlBarcode,
    x0.SouthAfricaIdBarcode
  ],
  mrz: [
    x0.VisaMRZ,
    x0.PassportMRZ,
    x0.SwissDLMRZ,
    x0.IdCardMRZ,
    x0.ChinaMainlandTravelPermitMRZ,
    x0.ChinaExitEntryPermitMRZ
  ],
  viz: [x0.DLVIZ, x0.IdCardVIZ]
};
async function applyNewMode(mode) {
  currentMode = mode;
  await context.removeMode(idCapture);
  const settings = new T0();
  settings.supportedDocuments = supportedDocumentsByMode[mode];
  if (mode === "viz") {
    settings.supportedSides = v1.FrontAndBack;
    settings.setShouldPassImageTypeToResult(m0.Face, true);
  }
  idCapture = await k1.forContext(context, settings);
  idCapture.addListener({
    didCaptureId: async (idCaptureInstance, session) => {
      var _a;
      await idCapture.setEnabled(false);
      const capturedId = session.newlyCapturedId;
      if (!capturedId) {
        return;
      }
      if (((_a = capturedId.vizResult) == null ? void 0 : _a.isBackSideCaptureSupported) === true) {
        if (capturedId.vizResult.capturedSides === v1.FrontAndBack) {
          showResult(capturedId);
          void idCapture.reset();
        } else {
          confirmScanningBackside(capturedId);
        }
      } else {
        showResult(capturedId);
        void idCapture.reset();
      }
    },
    didRejectId: async () => {
      await idCapture.setEnabled(false);
      showWarning("Document type not supported.");
    }
  });
  await view.removeOverlay(overlay);
  overlay = await D1.withIdCaptureForView(idCapture, view);
}
async function run() {
  await Cs({
    licenseKey: LICENSE_KEY,
    libraryLocation: new URL("library/engine/", document.baseURI).toString(),
    moduleLoaders: [ut()]
  });
  context = await Tt.create();
  camera = pe.default;
  const settings = k1.recommendedCameraSettings;
  await camera.applySettings(settings);
  await context.setFrameSource(camera);
  view = await O.forContext(context);
  view.connectToElement(elements.dataCaptureView);
  view.addControl(new ze());
  currentMode = getSelectedMode();
  await applyNewMode(currentMode);
  await idCapture.setEnabled(false);
  await camera.switchToDesiredState(Oe.On);
  await idCapture.setEnabled(true);
}
window.dispatchAction = async (...arguments_) => {
  const [action] = arguments_;
  switch (action) {
    case "SWITCH_MODE" /* SWITCH_MODE */:
      {
        const [, mode, buttonElement] = arguments_;
        if (mode === currentMode) {
          return;
        }
        onModeSwitched(buttonElement);
        await applyNewMode(mode);
      }
      break;
    case "CLOSE_RESULT" /* CLOSE_RESULT */:
      closeResults();
      await idCapture.setEnabled(true);
      break;
    case "CLOSE_WARNING" /* CLOSE_WARNING */:
      closeDialog();
      await idCapture.setEnabled(true);
      break;
    case "SCAN_BACKSIDE" /* SCAN_BACKSIDE */:
      await idCapture.setEnabled(true);
      closeDialog();
      break;
    case "SKIP_BACKSIDE" /* SKIP_BACKSIDE */: {
      closeDialog();
      const [, capturedId] = arguments_;
      showResult(capturedId);
      void idCapture.reset();
      break;
    }
  }
};
run().catch((error) => {
  console.error(error);
  alert(error);
});
/*!
 *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
 *  
 *  howler.js v2.2.3
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
/*!
 *  howler.js v2.2.3
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
/*! ****************************************************************************
Copyright (c) Microblink. All rights reserved.

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
***************************************************************************** */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/*! @license DOMPurify 2.3.9 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.3.9/LICENSE */
//# sourceMappingURL=index.js.map
