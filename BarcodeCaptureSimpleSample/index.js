"use strict";

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
var wt = (l, e, t) => e in l ? Mt(l, e, { enumerable: true, configurable: true, writable: true, value: t }) : l[e] = t;
var Q = (l, e) => {
  for (var t in e || (e = {}))
    ri.call(e, t) && wt(l, t, e[t]);
  if (ii)
    for (var t of ii(e))
      ur.call(e, t) && wt(l, t, e[t]);
  return l;
};
var Z = (l, e) => nr(l, sr(e));
var Lt = (l, e) => () => (e || l((e = { exports: {} }).exports, e), e.exports);
var dr = (l, e, t, a) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let o of lr(e))
      !ri.call(l, o) && o !== t && Mt(l, o, { get: () => e[o], enumerable: !(a = or(e, o)) || a.enumerable });
  return l;
};
var He = (l, e, t) => (t = l != null ? ar(cr(l)) : {}, dr(e || !l || !l.__esModule ? Mt(t, "default", { value: l, enumerable: true }) : t, l));
var c = (l, e, t) => (wt(l, typeof e != "symbol" ? e + "" : e, t), t);
var oi = Lt((ai, ni) => {
  (function(l) {
    var e;
    if (typeof define == "function" && define.amd && (define(l), e = true), typeof ai == "object" && (ni.exports = l(), e = true), !e) {
      var t = window.Cookies, a = window.Cookies = l();
      a.noConflict = function() {
        return window.Cookies = t, a;
      };
    }
  })(function() {
    function l() {
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
          S2 = l({ path: "/" }, o.defaults, S2), typeof S2.expires == "number" && (S2.expires = new Date(new Date() * 1 + S2.expires * 864e5)), S2.expires = S2.expires ? S2.expires.toUTCString() : "";
          try {
            var i = JSON.stringify(v2);
            /^[\{\[]/.test(i) && (v2 = i);
          } catch (s) {
          }
          v2 = a.write ? a.write(v2, p) : encodeURIComponent(String(v2)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), p = encodeURIComponent(String(p)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
          var r2 = "";
          for (var n in S2)
            !S2[n] || (r2 += "; " + n, S2[n] !== true && (r2 += "=" + S2[n].split(";")[0]));
          return document.cookie = p + "=" + v2 + r2;
        }
      }
      function f2(p, v2) {
        if (!(typeof document > "u")) {
          for (var S2 = {}, i = document.cookie ? document.cookie.split("; ") : [], r2 = 0; r2 < i.length; r2++) {
            var n = i[r2].split("="), s = n.slice(1).join("=");
            !v2 && s.charAt(0) === '"' && (s = s.slice(1, -1));
            try {
              var u2 = e(n[0]);
              if (s = (a.read || a)(s, u2) || e(s), v2)
                try {
                  s = JSON.parse(s);
                } catch (h2) {
                }
              if (S2[u2] = s, p === u2)
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
        d(p, "", l(v2, { expires: -1 }));
      }, o.defaults = {}, o.withConverter = t, o;
    }
    return t(function() {
    });
  });
});
var xt = Lt((Ie, Ge) => {
  (function(l, e) {
    "use strict";
    var t = "0.7.31", a = "", o = "?", d = "function", f2 = "undefined", p = "object", v2 = "string", S2 = "major", i = "model", r2 = "name", n = "type", s = "vendor", u2 = "version", h2 = "architecture", m = "console", b = "mobile", C = "tablet", _ = "smarttv", j2 = "wearable", B2 = "embedded", D2 = 255, y2 = "Amazon", A = "Apple", M2 = "ASUS", w2 = "BlackBerry", I2 = "Browser", E2 = "Chrome", L = "Edge", z = "Firefox", ce = "Google", Le = "Huawei", ve = "LG", vt = "Microsoft", Qt = "Motorola", We = "Opera", St = "Samsung", bt = "Sony", qt = "Xiaomi", Ct = "Zebra", Zt = "Facebook", tr = function(N2, P2) {
      var V2 = {};
      for (var H2 in N2)
        P2[H2] && P2[H2].length % 2 === 0 ? V2[H2] = P2[H2].concat(N2[H2]) : V2[H2] = N2[H2];
      return V2;
    }, Ue = function(N2) {
      for (var P2 = {}, V2 = 0; V2 < N2.length; V2++)
        P2[N2[V2].toUpperCase()] = N2[V2];
      return P2;
    }, $t = function(N2, P2) {
      return typeof N2 === v2 ? xe(P2).indexOf(xe(N2)) !== -1 : false;
    }, xe = function(N2) {
      return N2.toLowerCase();
    }, ir = function(N2) {
      return typeof N2 === v2 ? N2.replace(/[^\d\.]/g, a).split(".")[0] : e;
    }, At = function(N2, P2) {
      if (typeof N2 === v2)
        return N2 = N2.replace(/^\s\s*/, a).replace(/\s\s*$/, a), typeof P2 === f2 ? N2 : N2.substring(0, D2);
    }, _e = function(N2, P2) {
      for (var V2 = 0, H2, T, Be, F, De, ie; V2 < P2.length && !De; ) {
        var ei = P2[V2], ti = P2[V2 + 1];
        for (H2 = T = 0; H2 < ei.length && !De; )
          if (De = ei[H2++].exec(N2), De)
            for (Be = 0; Be < ti.length; Be++)
              ie = De[++T], F = ti[Be], typeof F === p && F.length > 0 ? F.length === 2 ? typeof F[1] == d ? this[F[0]] = F[1].call(this, ie) : this[F[0]] = F[1] : F.length === 3 ? typeof F[1] === d && !(F[1].exec && F[1].test) ? this[F[0]] = ie ? F[1].call(this, ie, F[2]) : e : this[F[0]] = ie ? ie.replace(F[1], F[2]) : e : F.length === 4 && (this[F[0]] = ie ? F[3].call(this, ie.replace(F[1], F[2])) : e) : this[F] = ie || e;
        V2 += 2;
      }
    }, yt = function(N2, P2) {
      for (var V2 in P2)
        if (typeof P2[V2] === p && P2[V2].length > 0) {
          for (var H2 = 0; H2 < P2[V2].length; H2++)
            if ($t(P2[V2][H2], N2))
              return V2 === o ? e : V2;
        } else if ($t(P2[V2], N2))
          return V2 === o ? e : V2;
      return N2;
    }, rr = { "1.0": "/8", "1.2": "/1", "1.3": "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }, Xt = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", "8.1": "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, Kt = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [u2, [r2, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [u2, [r2, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [r2, u2], [/opios[\/ ]+([\w\.]+)/i], [u2, [r2, We + " Mini"]], [/\bopr\/([\w\.]+)/i], [u2, [r2, We]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([-\w\.]+)/i, /(weibo)__([\d\.]+)/i], [r2, u2], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [u2, [r2, "UC" + I2]], [/\bqbcore\/([\w\.]+)/i], [u2, [r2, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [u2, [r2, "WeChat"]], [/konqueror\/([\w\.]+)/i], [u2, [r2, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [u2, [r2, "IE"]], [/yabrowser\/([\w\.]+)/i], [u2, [r2, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[r2, /(.+)/, "$1 Secure " + I2], u2], [/\bfocus\/([\w\.]+)/i], [u2, [r2, z + " Focus"]], [/\bopt\/([\w\.]+)/i], [u2, [r2, We + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [u2, [r2, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [u2, [r2, "Dolphin"]], [/coast\/([\w\.]+)/i], [u2, [r2, We + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [u2, [r2, "MIUI " + I2]], [/fxios\/([-\w\.]+)/i], [u2, [r2, z]], [/\bqihu|(qi?ho?o?|360)browser/i], [[r2, "360 " + I2]], [/(oculus|samsung|sailfish)browser\/([\w\.]+)/i], [[r2, /(.+)/, "$1 " + I2], u2], [/(comodo_dragon)\/([\w\.]+)/i], [[r2, /_/g, " "], u2], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [r2, u2], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i], [r2], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[r2, Zt], u2], [/safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [r2, u2], [/\bgsa\/([\w\.]+) .*safari\//i], [u2, [r2, "GSA"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [u2, [r2, E2 + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[r2, E2 + " WebView"], u2], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [u2, [r2, "Android " + I2]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [r2, u2], [/version\/([\w\.]+) .*mobile\/\w+ (safari)/i], [u2, [r2, "Mobile Safari"]], [/version\/([\w\.]+) .*(mobile ?safari|safari)/i], [u2, r2], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [r2, [u2, yt, rr]], [/(webkit|khtml)\/([\w\.]+)/i], [r2, u2], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[r2, "Netscape"], u2], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [u2, [r2, z + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i], [r2, u2]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[h2, "amd64"]], [/(ia32(?=;))/i], [[h2, xe]], [/((?:i[346]|x)86)[;\)]/i], [[h2, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[h2, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[h2, "armhf"]], [/windows (ce|mobile); ppc;/i], [[h2, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[h2, /ower/, a, xe]], [/(sun4\w)[;\)]/i], [[h2, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[h2, xe]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [i, [s, St], [n, C]], [/\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [i, [s, St], [n, b]], [/\((ip(?:hone|od)[\w ]*);/i], [i, [s, A], [n, b]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [i, [s, A], [n, C]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [i, [s, Le], [n, C]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}-[atu]?[ln][01259x][012359][an]?)\b(?!.+d\/s)/i], [i, [s, Le], [n, b]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[i, /_/g, " "], [s, qt], [n, b]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[i, /_/g, " "], [s, qt], [n, C]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [i, [s, "OPPO"], [n, b]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [i, [s, "Vivo"], [n, b]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [i, [s, "Realme"], [n, b]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [i, [s, Qt], [n, b]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [i, [s, Qt], [n, C]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [i, [s, ve], [n, C]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [i, [s, ve], [n, b]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [i, [s, "Lenovo"], [n, C]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[i, /_/g, " "], [s, "Nokia"], [n, b]], [/(pixel c)\b/i], [i, [s, ce], [n, C]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [i, [s, ce], [n, b]], [/droid.+ ([c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [i, [s, bt], [n, b]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[i, "Xperia Tablet"], [s, bt], [n, C]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [i, [s, "OnePlus"], [n, b]], [/(alexa)webm/i, /(kf[a-z]{2}wi)( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [i, [s, y2], [n, C]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[i, /(.+)/g, "Fire Phone $1"], [s, y2], [n, b]], [/(playbook);[-\w\),; ]+(rim)/i], [i, s, [n, C]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [i, [s, w2], [n, b]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [i, [s, M2], [n, C]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [i, [s, M2], [n, b]], [/(nexus 9)/i], [i, [s, "HTC"], [n, C]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic|sony)[-_ ]?([-\w]*)/i], [s, [i, /_/g, " "], [n, b]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [i, [s, "Acer"], [n, C]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [i, [s, "Meizu"], [n, b]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [i, [s, "Sharp"], [n, b]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [s, i, [n, b]], [/(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [s, i, [n, C]], [/(surface duo)/i], [i, [s, vt], [n, C]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [i, [s, "Fairphone"], [n, b]], [/(u304aa)/i], [i, [s, "AT&T"], [n, b]], [/\bsie-(\w*)/i], [i, [s, "Siemens"], [n, b]], [/\b(rct\w+) b/i], [i, [s, "RCA"], [n, C]], [/\b(venue[\d ]{2,7}) b/i], [i, [s, "Dell"], [n, C]], [/\b(q(?:mv|ta)\w+) b/i], [i, [s, "Verizon"], [n, C]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [i, [s, "Barnes & Noble"], [n, C]], [/\b(tm\d{3}\w+) b/i], [i, [s, "NuVision"], [n, C]], [/\b(k88) b/i], [i, [s, "ZTE"], [n, C]], [/\b(nx\d{3}j) b/i], [i, [s, "ZTE"], [n, b]], [/\b(gen\d{3}) b.+49h/i], [i, [s, "Swiss"], [n, b]], [/\b(zur\d{3}) b/i], [i, [s, "Swiss"], [n, C]], [/\b((zeki)?tb.*\b) b/i], [i, [s, "Zeki"], [n, C]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[s, "Dragon Touch"], i, [n, C]], [/\b(ns-?\w{0,9}) b/i], [i, [s, "Insignia"], [n, C]], [/\b((nxa|next)-?\w{0,9}) b/i], [i, [s, "NextBook"], [n, C]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[s, "Voice"], i, [n, b]], [/\b(lvtel\-)?(v1[12]) b/i], [[s, "LvTel"], i, [n, b]], [/\b(ph-1) /i], [i, [s, "Essential"], [n, b]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [i, [s, "Envizen"], [n, C]], [/\b(trio[-\w\. ]+) b/i], [i, [s, "MachSpeed"], [n, C]], [/\btu_(1491) b/i], [i, [s, "Rotor"], [n, C]], [/(shield[\w ]+) b/i], [i, [s, "Nvidia"], [n, C]], [/(sprint) (\w+)/i], [s, i, [n, b]], [/(kin\.[onetw]{3})/i], [[i, /\./g, " "], [s, vt], [n, b]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [i, [s, Ct], [n, C]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [i, [s, Ct], [n, b]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [s, i, [n, m]], [/droid.+; (shield) bui/i], [i, [s, "Nvidia"], [n, m]], [/(playstation [345portablevi]+)/i], [i, [s, bt], [n, m]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [i, [s, vt], [n, m]], [/smart-tv.+(samsung)/i], [s, [n, _]], [/hbbtv.+maple;(\d+)/i], [[i, /^/, "SmartTV"], [s, St], [n, _]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[s, ve], [n, _]], [/(apple) ?tv/i], [s, [i, A + " TV"], [n, _]], [/crkey/i], [[i, E2 + "cast"], [s, ce], [n, _]], [/droid.+aft(\w)( bui|\))/i], [i, [s, y2], [n, _]], [/\(dtv[\);].+(aquos)/i], [i, [s, "Sharp"], [n, _]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i], [[s, At], [i, At], [n, _]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[n, _]], [/((pebble))app/i], [s, i, [n, j2]], [/droid.+; (glass) \d/i], [i, [s, ce], [n, j2]], [/droid.+; (wt63?0{2,3})\)/i], [i, [s, Ct], [n, j2]], [/(quest( 2)?)/i], [i, [s, Zt], [n, j2]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [s, [n, B2]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [i, [n, b]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [i, [n, C]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[n, C]], [/(phone|mobile(?:[;\/]| safari)|pda(?=.+windows ce))/i], [[n, b]], [/(android[-\w\. ]{0,9});.+buil/i], [i, [s, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [u2, [r2, L + "HTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [u2, [r2, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i], [r2, u2], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [u2, r2]], os: [[/microsoft (windows) (vista|xp)/i], [r2, u2], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [r2, [u2, yt, Xt]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[r2, "Windows"], [u2, yt, Xt]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /cfnetwork\/.+darwin/i], [[u2, /_/g, "."], [r2, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[r2, "Mac OS"], [u2, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86)/i], [u2, r2], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [r2, u2], [/\(bb(10);/i], [u2, [r2, w2]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [u2, [r2, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [u2, [r2, z + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [u2, [r2, "webOS"]], [/crkey\/([\d\.]+)/i], [u2, [r2, E2 + "cast"]], [/(cros) [\w]+ ([\w\.]+\w)/i], [[r2, "Chromium OS"], u2], [/(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [r2, u2], [/(sunos) ?([\w\.\d]*)/i], [[r2, "Solaris"], u2], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i, /(unix) ?([\w\.]*)/i], [r2, u2]] }, X = function(N2, P2) {
      if (typeof N2 === p && (P2 = N2, N2 = e), !(this instanceof X))
        return new X(N2, P2).getResult();
      var V2 = N2 || (typeof l !== f2 && l.navigator && l.navigator.userAgent ? l.navigator.userAgent : a), H2 = P2 ? tr(Kt, P2) : Kt;
      return this.getBrowser = function() {
        var T = {};
        return T[r2] = e, T[u2] = e, _e.call(T, V2, H2.browser), T.major = ir(T.version), T;
      }, this.getCPU = function() {
        var T = {};
        return T[h2] = e, _e.call(T, V2, H2.cpu), T;
      }, this.getDevice = function() {
        var T = {};
        return T[s] = e, T[i] = e, T[n] = e, _e.call(T, V2, H2.device), T;
      }, this.getEngine = function() {
        var T = {};
        return T[r2] = e, T[u2] = e, _e.call(T, V2, H2.engine), T;
      }, this.getOS = function() {
        var T = {};
        return T[r2] = e, T[u2] = e, _e.call(T, V2, H2.os), T;
      }, this.getResult = function() {
        return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
      }, this.getUA = function() {
        return V2;
      }, this.setUA = function(T) {
        return V2 = typeof T === v2 && T.length > D2 ? At(T, D2) : T, this;
      }, this.setUA(V2), this;
    };
    X.VERSION = t, X.BROWSER = Ue([r2, u2, S2]), X.CPU = Ue([h2]), X.DEVICE = Ue([i, s, n, m, b, _, C, j2, B2]), X.ENGINE = X.OS = Ue([r2, u2]), typeof Ie !== f2 ? (typeof Ge !== f2 && Ge.exports && (Ie = Ge.exports = X), Ie.UAParser = X) : typeof define === d && define.amd ? define(function() {
      return X;
    }) : typeof l !== f2 && (l.UAParser = X);
    var Se = typeof l !== f2 && (l.jQuery || l.Zepto);
    if (Se && !Se.ua) {
      var Je = new X();
      Se.ua = Je.getResult(), Se.ua.get = function() {
        return Je.getUA();
      }, Se.ua.set = function(N2) {
        Je.setUA(N2);
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
    var l = function() {
      this.init();
    };
    l.prototype = { init: function() {
      var i = this || e;
      return i._counter = 1e3, i._html5AudioPool = [], i.html5PoolSize = 10, i._codecs = {}, i._howls = [], i._muted = false, i._volume = 1, i._canPlayEvent = "canplaythrough", i._navigator = typeof window < "u" && window.navigator ? window.navigator : null, i.masterGain = null, i.noAudio = false, i.usingWebAudio = true, i.autoSuspend = true, i.ctx = null, i.autoUnlock = true, i._setup(), i;
    }, volume: function(i) {
      var r2 = this || e;
      if (i = parseFloat(i), r2.ctx || S2(), typeof i < "u" && i >= 0 && i <= 1) {
        if (r2._volume = i, r2._muted)
          return r2;
        r2.usingWebAudio && r2.masterGain.gain.setValueAtTime(i, e.ctx.currentTime);
        for (var n = 0; n < r2._howls.length; n++)
          if (!r2._howls[n]._webAudio)
            for (var s = r2._howls[n]._getSoundIds(), u2 = 0; u2 < s.length; u2++) {
              var h2 = r2._howls[n]._soundById(s[u2]);
              h2 && h2._node && (h2._node.volume = h2._volume * i);
            }
        return r2;
      }
      return r2._volume;
    }, mute: function(i) {
      var r2 = this || e;
      r2.ctx || S2(), r2._muted = i, r2.usingWebAudio && r2.masterGain.gain.setValueAtTime(i ? 0 : r2._volume, e.ctx.currentTime);
      for (var n = 0; n < r2._howls.length; n++)
        if (!r2._howls[n]._webAudio)
          for (var s = r2._howls[n]._getSoundIds(), u2 = 0; u2 < s.length; u2++) {
            var h2 = r2._howls[n]._soundById(s[u2]);
            h2 && h2._node && (h2._node.muted = i ? true : h2._muted);
          }
      return r2;
    }, stop: function() {
      for (var i = this || e, r2 = 0; r2 < i._howls.length; r2++)
        i._howls[r2].stop();
      return i;
    }, unload: function() {
      for (var i = this || e, r2 = i._howls.length - 1; r2 >= 0; r2--)
        i._howls[r2].unload();
      return i.usingWebAudio && i.ctx && typeof i.ctx.close < "u" && (i.ctx.close(), i.ctx = null, S2()), i;
    }, codecs: function(i) {
      return (this || e)._codecs[i.replace(/^x-/, "")];
    }, _setup: function() {
      var i = this || e;
      if (i.state = i.ctx && i.ctx.state || "suspended", i._autoSuspend(), !i.usingWebAudio)
        if (typeof Audio < "u")
          try {
            var r2 = new Audio();
            typeof r2.oncanplaythrough > "u" && (i._canPlayEvent = "canplay");
          } catch (n) {
            i.noAudio = true;
          }
        else
          i.noAudio = true;
      try {
        var r2 = new Audio();
        r2.muted && (i.noAudio = true);
      } catch (n) {
      }
      return i.noAudio || i._setupCodecs(), i;
    }, _setupCodecs: function() {
      var i = this || e, r2 = null;
      try {
        r2 = typeof Audio < "u" ? new Audio() : null;
      } catch (_) {
        return i;
      }
      if (!r2 || typeof r2.canPlayType != "function")
        return i;
      var n = r2.canPlayType("audio/mpeg;").replace(/^no$/, ""), s = i._navigator ? i._navigator.userAgent : "", u2 = s.match(/OPR\/([0-6].)/g), h2 = u2 && parseInt(u2[0].split("/")[1], 10) < 33, m = s.indexOf("Safari") !== -1 && s.indexOf("Chrome") === -1, b = s.match(/Version\/(.*?) /), C = m && b && parseInt(b[1], 10) < 15;
      return i._codecs = { mp3: !!(!h2 && (n || r2.canPlayType("audio/mp3;").replace(/^no$/, ""))), mpeg: !!n, opus: !!r2.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""), ogg: !!r2.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), oga: !!r2.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), wav: !!(r2.canPlayType('audio/wav; codecs="1"') || r2.canPlayType("audio/wav")).replace(/^no$/, ""), aac: !!r2.canPlayType("audio/aac;").replace(/^no$/, ""), caf: !!r2.canPlayType("audio/x-caf;").replace(/^no$/, ""), m4a: !!(r2.canPlayType("audio/x-m4a;") || r2.canPlayType("audio/m4a;") || r2.canPlayType("audio/aac;")).replace(/^no$/, ""), m4b: !!(r2.canPlayType("audio/x-m4b;") || r2.canPlayType("audio/m4b;") || r2.canPlayType("audio/aac;")).replace(/^no$/, ""), mp4: !!(r2.canPlayType("audio/x-mp4;") || r2.canPlayType("audio/mp4;") || r2.canPlayType("audio/aac;")).replace(/^no$/, ""), weba: !!(!C && r2.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")), webm: !!(!C && r2.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")), dolby: !!r2.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""), flac: !!(r2.canPlayType("audio/x-flac;") || r2.canPlayType("audio/flac;")).replace(/^no$/, "") }, i;
    }, _unlockAudio: function() {
      var i = this || e;
      if (!(i._audioUnlocked || !i.ctx)) {
        i._audioUnlocked = false, i.autoUnlock = false, !i._mobileUnloaded && i.ctx.sampleRate !== 44100 && (i._mobileUnloaded = true, i.unload()), i._scratchBuffer = i.ctx.createBuffer(1, 1, 22050);
        var r2 = function(n) {
          for (; i._html5AudioPool.length < i.html5PoolSize; )
            try {
              var s = new Audio();
              s._unlocked = true, i._releaseHtml5Audio(s);
            } catch (_) {
              i.noAudio = true;
              break;
            }
          for (var u2 = 0; u2 < i._howls.length; u2++)
            if (!i._howls[u2]._webAudio)
              for (var h2 = i._howls[u2]._getSoundIds(), m = 0; m < h2.length; m++) {
                var b = i._howls[u2]._soundById(h2[m]);
                b && b._node && !b._node._unlocked && (b._node._unlocked = true, b._node.load());
              }
          i._autoResume();
          var C = i.ctx.createBufferSource();
          C.buffer = i._scratchBuffer, C.connect(i.ctx.destination), typeof C.start > "u" ? C.noteOn(0) : C.start(0), typeof i.ctx.resume == "function" && i.ctx.resume(), C.onended = function() {
            C.disconnect(0), i._audioUnlocked = true, document.removeEventListener("touchstart", r2, true), document.removeEventListener("touchend", r2, true), document.removeEventListener("click", r2, true), document.removeEventListener("keydown", r2, true);
            for (var _ = 0; _ < i._howls.length; _++)
              i._howls[_]._emit("unlock");
          };
        };
        return document.addEventListener("touchstart", r2, true), document.addEventListener("touchend", r2, true), document.addEventListener("click", r2, true), document.addEventListener("keydown", r2, true), i;
      }
    }, _obtainHtml5Audio: function() {
      var i = this || e;
      if (i._html5AudioPool.length)
        return i._html5AudioPool.pop();
      var r2 = new Audio().play();
      return r2 && typeof Promise < "u" && (r2 instanceof Promise || typeof r2.then == "function") && r2.catch(function() {
        console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.");
      }), new Audio();
    }, _releaseHtml5Audio: function(i) {
      var r2 = this || e;
      return i._unlocked && r2._html5AudioPool.push(i), r2;
    }, _autoSuspend: function() {
      var i = this;
      if (!(!i.autoSuspend || !i.ctx || typeof i.ctx.suspend > "u" || !e.usingWebAudio)) {
        for (var r2 = 0; r2 < i._howls.length; r2++)
          if (i._howls[r2]._webAudio) {
            for (var n = 0; n < i._howls[r2]._sounds.length; n++)
              if (!i._howls[r2]._sounds[n]._paused)
                return i;
          }
        return i._suspendTimer && clearTimeout(i._suspendTimer), i._suspendTimer = setTimeout(function() {
          if (!!i.autoSuspend) {
            i._suspendTimer = null, i.state = "suspending";
            var s = function() {
              i.state = "suspended", i._resumeAfterSuspend && (delete i._resumeAfterSuspend, i._autoResume());
            };
            i.ctx.suspend().then(s, s);
          }
        }, 3e4), i;
      }
    }, _autoResume: function() {
      var i = this;
      if (!(!i.ctx || typeof i.ctx.resume > "u" || !e.usingWebAudio))
        return i.state === "running" && i.ctx.state !== "interrupted" && i._suspendTimer ? (clearTimeout(i._suspendTimer), i._suspendTimer = null) : i.state === "suspended" || i.state === "running" && i.ctx.state === "interrupted" ? (i.ctx.resume().then(function() {
          i.state = "running";
          for (var r2 = 0; r2 < i._howls.length; r2++)
            i._howls[r2]._emit("resume");
        }), i._suspendTimer && (clearTimeout(i._suspendTimer), i._suspendTimer = null)) : i.state === "suspending" && (i._resumeAfterSuspend = true), i;
    } };
    var e = new l(), t = function(i) {
      var r2 = this;
      if (!i.src || i.src.length === 0) {
        console.error("An array of source files must be passed with any new Howl.");
        return;
      }
      r2.init(i);
    };
    t.prototype = { init: function(i) {
      var r2 = this;
      return e.ctx || S2(), r2._autoplay = i.autoplay || false, r2._format = typeof i.format != "string" ? i.format : [i.format], r2._html5 = i.html5 || false, r2._muted = i.mute || false, r2._loop = i.loop || false, r2._pool = i.pool || 5, r2._preload = typeof i.preload == "boolean" || i.preload === "metadata" ? i.preload : true, r2._rate = i.rate || 1, r2._sprite = i.sprite || {}, r2._src = typeof i.src != "string" ? i.src : [i.src], r2._volume = i.volume !== void 0 ? i.volume : 1, r2._xhr = { method: i.xhr && i.xhr.method ? i.xhr.method : "GET", headers: i.xhr && i.xhr.headers ? i.xhr.headers : null, withCredentials: i.xhr && i.xhr.withCredentials ? i.xhr.withCredentials : false }, r2._duration = 0, r2._state = "unloaded", r2._sounds = [], r2._endTimers = {}, r2._queue = [], r2._playLock = false, r2._onend = i.onend ? [{ fn: i.onend }] : [], r2._onfade = i.onfade ? [{ fn: i.onfade }] : [], r2._onload = i.onload ? [{ fn: i.onload }] : [], r2._onloaderror = i.onloaderror ? [{ fn: i.onloaderror }] : [], r2._onplayerror = i.onplayerror ? [{ fn: i.onplayerror }] : [], r2._onpause = i.onpause ? [{ fn: i.onpause }] : [], r2._onplay = i.onplay ? [{ fn: i.onplay }] : [], r2._onstop = i.onstop ? [{ fn: i.onstop }] : [], r2._onmute = i.onmute ? [{ fn: i.onmute }] : [], r2._onvolume = i.onvolume ? [{ fn: i.onvolume }] : [], r2._onrate = i.onrate ? [{ fn: i.onrate }] : [], r2._onseek = i.onseek ? [{ fn: i.onseek }] : [], r2._onunlock = i.onunlock ? [{ fn: i.onunlock }] : [], r2._onresume = [], r2._webAudio = e.usingWebAudio && !r2._html5, typeof e.ctx < "u" && e.ctx && e.autoUnlock && e._unlockAudio(), e._howls.push(r2), r2._autoplay && r2._queue.push({ event: "play", action: function() {
        r2.play();
      } }), r2._preload && r2._preload !== "none" && r2.load(), r2;
    }, load: function() {
      var i = this, r2 = null;
      if (e.noAudio) {
        i._emit("loaderror", null, "No audio support.");
        return;
      }
      typeof i._src == "string" && (i._src = [i._src]);
      for (var n = 0; n < i._src.length; n++) {
        var s, u2;
        if (i._format && i._format[n])
          s = i._format[n];
        else {
          if (u2 = i._src[n], typeof u2 != "string") {
            i._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
            continue;
          }
          s = /^data:audio\/([^;,]+);/i.exec(u2), s || (s = /\.([^.]+)$/.exec(u2.split("?", 1)[0])), s && (s = s[1].toLowerCase());
        }
        if (s || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'), s && e.codecs(s)) {
          r2 = i._src[n];
          break;
        }
      }
      if (!r2) {
        i._emit("loaderror", null, "No codec support for selected audio sources.");
        return;
      }
      return i._src = r2, i._state = "loading", window.location.protocol === "https:" && r2.slice(0, 5) === "http:" && (i._html5 = true, i._webAudio = false), new a(i), i._webAudio && d(i), i;
    }, play: function(i, r2) {
      var n = this, s = null;
      if (typeof i == "number")
        s = i, i = null;
      else {
        if (typeof i == "string" && n._state === "loaded" && !n._sprite[i])
          return null;
        if (typeof i > "u" && (i = "__default", !n._playLock)) {
          for (var u2 = 0, h2 = 0; h2 < n._sounds.length; h2++)
            n._sounds[h2]._paused && !n._sounds[h2]._ended && (u2++, s = n._sounds[h2]._id);
          u2 === 1 ? i = null : s = null;
        }
      }
      var m = s ? n._soundById(s) : n._inactiveSound();
      if (!m)
        return null;
      if (s && !i && (i = m._sprite || "__default"), n._state !== "loaded") {
        m._sprite = i, m._ended = false;
        var b = m._id;
        return n._queue.push({ event: "play", action: function() {
          n.play(b);
        } }), b;
      }
      if (s && !m._paused)
        return r2 || n._loadQueue("play"), m._id;
      n._webAudio && e._autoResume();
      var C = Math.max(0, m._seek > 0 ? m._seek : n._sprite[i][0] / 1e3), _ = Math.max(0, (n._sprite[i][0] + n._sprite[i][1]) / 1e3 - C), j2 = _ * 1e3 / Math.abs(m._rate), B2 = n._sprite[i][0] / 1e3, D2 = (n._sprite[i][0] + n._sprite[i][1]) / 1e3;
      m._sprite = i, m._ended = false;
      var y2 = function() {
        m._paused = false, m._seek = C, m._start = B2, m._stop = D2, m._loop = !!(m._loop || n._sprite[i][2]);
      };
      if (C >= D2) {
        n._ended(m);
        return;
      }
      var A = m._node;
      if (n._webAudio) {
        var M2 = function() {
          n._playLock = false, y2(), n._refreshBuffer(m);
          var L = m._muted || n._muted ? 0 : m._volume;
          A.gain.setValueAtTime(L, e.ctx.currentTime), m._playStart = e.ctx.currentTime, typeof A.bufferSource.start > "u" ? m._loop ? A.bufferSource.noteGrainOn(0, C, 86400) : A.bufferSource.noteGrainOn(0, C, _) : m._loop ? A.bufferSource.start(0, C, 86400) : A.bufferSource.start(0, C, _), j2 !== 1 / 0 && (n._endTimers[m._id] = setTimeout(n._ended.bind(n, m), j2)), r2 || setTimeout(function() {
            n._emit("play", m._id), n._loadQueue();
          }, 0);
        };
        e.state === "running" && e.ctx.state !== "interrupted" ? M2() : (n._playLock = true, n.once("resume", M2), n._clearTimer(m._id));
      } else {
        var w2 = function() {
          A.currentTime = C, A.muted = m._muted || n._muted || e._muted || A.muted, A.volume = m._volume * e.volume(), A.playbackRate = m._rate;
          try {
            var L = A.play();
            if (L && typeof Promise < "u" && (L instanceof Promise || typeof L.then == "function") ? (n._playLock = true, y2(), L.then(function() {
              n._playLock = false, A._unlocked = true, r2 ? n._loadQueue() : n._emit("play", m._id);
            }).catch(function() {
              n._playLock = false, n._emit("playerror", m._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."), m._ended = true, m._paused = true;
            })) : r2 || (n._playLock = false, y2(), n._emit("play", m._id)), A.playbackRate = m._rate, A.paused) {
              n._emit("playerror", m._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
              return;
            }
            i !== "__default" || m._loop ? n._endTimers[m._id] = setTimeout(n._ended.bind(n, m), j2) : (n._endTimers[m._id] = function() {
              n._ended(m), A.removeEventListener("ended", n._endTimers[m._id], false);
            }, A.addEventListener("ended", n._endTimers[m._id], false));
          } catch (z) {
            n._emit("playerror", m._id, z);
          }
        };
        A.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" && (A.src = n._src, A.load());
        var I2 = window && window.ejecta || !A.readyState && e._navigator.isCocoonJS;
        if (A.readyState >= 3 || I2)
          w2();
        else {
          n._playLock = true, n._state = "loading";
          var E2 = function() {
            n._state = "loaded", w2(), A.removeEventListener(e._canPlayEvent, E2, false);
          };
          A.addEventListener(e._canPlayEvent, E2, false), n._clearTimer(m._id);
        }
      }
      return m._id;
    }, pause: function(i) {
      var r2 = this;
      if (r2._state !== "loaded" || r2._playLock)
        return r2._queue.push({ event: "pause", action: function() {
          r2.pause(i);
        } }), r2;
      for (var n = r2._getSoundIds(i), s = 0; s < n.length; s++) {
        r2._clearTimer(n[s]);
        var u2 = r2._soundById(n[s]);
        if (u2 && !u2._paused && (u2._seek = r2.seek(n[s]), u2._rateSeek = 0, u2._paused = true, r2._stopFade(n[s]), u2._node))
          if (r2._webAudio) {
            if (!u2._node.bufferSource)
              continue;
            typeof u2._node.bufferSource.stop > "u" ? u2._node.bufferSource.noteOff(0) : u2._node.bufferSource.stop(0), r2._cleanBuffer(u2._node);
          } else
            (!isNaN(u2._node.duration) || u2._node.duration === 1 / 0) && u2._node.pause();
        arguments[1] || r2._emit("pause", u2 ? u2._id : null);
      }
      return r2;
    }, stop: function(i, r2) {
      var n = this;
      if (n._state !== "loaded" || n._playLock)
        return n._queue.push({ event: "stop", action: function() {
          n.stop(i);
        } }), n;
      for (var s = n._getSoundIds(i), u2 = 0; u2 < s.length; u2++) {
        n._clearTimer(s[u2]);
        var h2 = n._soundById(s[u2]);
        h2 && (h2._seek = h2._start || 0, h2._rateSeek = 0, h2._paused = true, h2._ended = true, n._stopFade(s[u2]), h2._node && (n._webAudio ? h2._node.bufferSource && (typeof h2._node.bufferSource.stop > "u" ? h2._node.bufferSource.noteOff(0) : h2._node.bufferSource.stop(0), n._cleanBuffer(h2._node)) : (!isNaN(h2._node.duration) || h2._node.duration === 1 / 0) && (h2._node.currentTime = h2._start || 0, h2._node.pause(), h2._node.duration === 1 / 0 && n._clearSound(h2._node))), r2 || n._emit("stop", h2._id));
      }
      return n;
    }, mute: function(i, r2) {
      var n = this;
      if (n._state !== "loaded" || n._playLock)
        return n._queue.push({ event: "mute", action: function() {
          n.mute(i, r2);
        } }), n;
      if (typeof r2 > "u")
        if (typeof i == "boolean")
          n._muted = i;
        else
          return n._muted;
      for (var s = n._getSoundIds(r2), u2 = 0; u2 < s.length; u2++) {
        var h2 = n._soundById(s[u2]);
        h2 && (h2._muted = i, h2._interval && n._stopFade(h2._id), n._webAudio && h2._node ? h2._node.gain.setValueAtTime(i ? 0 : h2._volume, e.ctx.currentTime) : h2._node && (h2._node.muted = e._muted ? true : i), n._emit("mute", h2._id));
      }
      return n;
    }, volume: function() {
      var i = this, r2 = arguments, n, s;
      if (r2.length === 0)
        return i._volume;
      if (r2.length === 1 || r2.length === 2 && typeof r2[1] > "u") {
        var u2 = i._getSoundIds(), h2 = u2.indexOf(r2[0]);
        h2 >= 0 ? s = parseInt(r2[0], 10) : n = parseFloat(r2[0]);
      } else
        r2.length >= 2 && (n = parseFloat(r2[0]), s = parseInt(r2[1], 10));
      var m;
      if (typeof n < "u" && n >= 0 && n <= 1) {
        if (i._state !== "loaded" || i._playLock)
          return i._queue.push({ event: "volume", action: function() {
            i.volume.apply(i, r2);
          } }), i;
        typeof s > "u" && (i._volume = n), s = i._getSoundIds(s);
        for (var b = 0; b < s.length; b++)
          m = i._soundById(s[b]), m && (m._volume = n, r2[2] || i._stopFade(s[b]), i._webAudio && m._node && !m._muted ? m._node.gain.setValueAtTime(n, e.ctx.currentTime) : m._node && !m._muted && (m._node.volume = n * e.volume()), i._emit("volume", m._id));
      } else
        return m = s ? i._soundById(s) : i._sounds[0], m ? m._volume : 0;
      return i;
    }, fade: function(i, r2, n, s) {
      var u2 = this;
      if (u2._state !== "loaded" || u2._playLock)
        return u2._queue.push({ event: "fade", action: function() {
          u2.fade(i, r2, n, s);
        } }), u2;
      i = Math.min(Math.max(0, parseFloat(i)), 1), r2 = Math.min(Math.max(0, parseFloat(r2)), 1), n = parseFloat(n), u2.volume(i, s);
      for (var h2 = u2._getSoundIds(s), m = 0; m < h2.length; m++) {
        var b = u2._soundById(h2[m]);
        if (b) {
          if (s || u2._stopFade(h2[m]), u2._webAudio && !b._muted) {
            var C = e.ctx.currentTime, _ = C + n / 1e3;
            b._volume = i, b._node.gain.setValueAtTime(i, C), b._node.gain.linearRampToValueAtTime(r2, _);
          }
          u2._startFadeInterval(b, i, r2, n, h2[m], typeof s > "u");
        }
      }
      return u2;
    }, _startFadeInterval: function(i, r2, n, s, u2, h2) {
      var m = this, b = r2, C = n - r2, _ = Math.abs(C / 0.01), j2 = Math.max(4, _ > 0 ? s / _ : s), B2 = Date.now();
      i._fadeTo = n, i._interval = setInterval(function() {
        var D2 = (Date.now() - B2) / s;
        B2 = Date.now(), b += C * D2, b = Math.round(b * 100) / 100, C < 0 ? b = Math.max(n, b) : b = Math.min(n, b), m._webAudio ? i._volume = b : m.volume(b, i._id, true), h2 && (m._volume = b), (n < r2 && b <= n || n > r2 && b >= n) && (clearInterval(i._interval), i._interval = null, i._fadeTo = null, m.volume(n, i._id), m._emit("fade", i._id));
      }, j2);
    }, _stopFade: function(i) {
      var r2 = this, n = r2._soundById(i);
      return n && n._interval && (r2._webAudio && n._node.gain.cancelScheduledValues(e.ctx.currentTime), clearInterval(n._interval), n._interval = null, r2.volume(n._fadeTo, i), n._fadeTo = null, r2._emit("fade", i)), r2;
    }, loop: function() {
      var i = this, r2 = arguments, n, s, u2;
      if (r2.length === 0)
        return i._loop;
      if (r2.length === 1)
        if (typeof r2[0] == "boolean")
          n = r2[0], i._loop = n;
        else
          return u2 = i._soundById(parseInt(r2[0], 10)), u2 ? u2._loop : false;
      else
        r2.length === 2 && (n = r2[0], s = parseInt(r2[1], 10));
      for (var h2 = i._getSoundIds(s), m = 0; m < h2.length; m++)
        u2 = i._soundById(h2[m]), u2 && (u2._loop = n, i._webAudio && u2._node && u2._node.bufferSource && (u2._node.bufferSource.loop = n, n && (u2._node.bufferSource.loopStart = u2._start || 0, u2._node.bufferSource.loopEnd = u2._stop, i.playing(h2[m]) && (i.pause(h2[m], true), i.play(h2[m], true)))));
      return i;
    }, rate: function() {
      var i = this, r2 = arguments, n, s;
      if (r2.length === 0)
        s = i._sounds[0]._id;
      else if (r2.length === 1) {
        var u2 = i._getSoundIds(), h2 = u2.indexOf(r2[0]);
        h2 >= 0 ? s = parseInt(r2[0], 10) : n = parseFloat(r2[0]);
      } else
        r2.length === 2 && (n = parseFloat(r2[0]), s = parseInt(r2[1], 10));
      var m;
      if (typeof n == "number") {
        if (i._state !== "loaded" || i._playLock)
          return i._queue.push({ event: "rate", action: function() {
            i.rate.apply(i, r2);
          } }), i;
        typeof s > "u" && (i._rate = n), s = i._getSoundIds(s);
        for (var b = 0; b < s.length; b++)
          if (m = i._soundById(s[b]), m) {
            i.playing(s[b]) && (m._rateSeek = i.seek(s[b]), m._playStart = i._webAudio ? e.ctx.currentTime : m._playStart), m._rate = n, i._webAudio && m._node && m._node.bufferSource ? m._node.bufferSource.playbackRate.setValueAtTime(n, e.ctx.currentTime) : m._node && (m._node.playbackRate = n);
            var C = i.seek(s[b]), _ = (i._sprite[m._sprite][0] + i._sprite[m._sprite][1]) / 1e3 - C, j2 = _ * 1e3 / Math.abs(m._rate);
            (i._endTimers[s[b]] || !m._paused) && (i._clearTimer(s[b]), i._endTimers[s[b]] = setTimeout(i._ended.bind(i, m), j2)), i._emit("rate", m._id);
          }
      } else
        return m = i._soundById(s), m ? m._rate : i._rate;
      return i;
    }, seek: function() {
      var i = this, r2 = arguments, n, s;
      if (r2.length === 0)
        i._sounds.length && (s = i._sounds[0]._id);
      else if (r2.length === 1) {
        var u2 = i._getSoundIds(), h2 = u2.indexOf(r2[0]);
        h2 >= 0 ? s = parseInt(r2[0], 10) : i._sounds.length && (s = i._sounds[0]._id, n = parseFloat(r2[0]));
      } else
        r2.length === 2 && (n = parseFloat(r2[0]), s = parseInt(r2[1], 10));
      if (typeof s > "u")
        return 0;
      if (typeof n == "number" && (i._state !== "loaded" || i._playLock))
        return i._queue.push({ event: "seek", action: function() {
          i.seek.apply(i, r2);
        } }), i;
      var m = i._soundById(s);
      if (m)
        if (typeof n == "number" && n >= 0) {
          var b = i.playing(s);
          b && i.pause(s, true), m._seek = n, m._ended = false, i._clearTimer(s), !i._webAudio && m._node && !isNaN(m._node.duration) && (m._node.currentTime = n);
          var C = function() {
            b && i.play(s, true), i._emit("seek", s);
          };
          if (b && !i._webAudio) {
            var _ = function() {
              i._playLock ? setTimeout(_, 0) : C();
            };
            setTimeout(_, 0);
          } else
            C();
        } else if (i._webAudio) {
          var j2 = i.playing(s) ? e.ctx.currentTime - m._playStart : 0, B2 = m._rateSeek ? m._rateSeek - m._seek : 0;
          return m._seek + (B2 + j2 * Math.abs(m._rate));
        } else
          return m._node.currentTime;
      return i;
    }, playing: function(i) {
      var r2 = this;
      if (typeof i == "number") {
        var n = r2._soundById(i);
        return n ? !n._paused : false;
      }
      for (var s = 0; s < r2._sounds.length; s++)
        if (!r2._sounds[s]._paused)
          return true;
      return false;
    }, duration: function(i) {
      var r2 = this, n = r2._duration, s = r2._soundById(i);
      return s && (n = r2._sprite[s._sprite][1] / 1e3), n;
    }, state: function() {
      return this._state;
    }, unload: function() {
      for (var i = this, r2 = i._sounds, n = 0; n < r2.length; n++)
        r2[n]._paused || i.stop(r2[n]._id), i._webAudio || (i._clearSound(r2[n]._node), r2[n]._node.removeEventListener("error", r2[n]._errorFn, false), r2[n]._node.removeEventListener(e._canPlayEvent, r2[n]._loadFn, false), r2[n]._node.removeEventListener("ended", r2[n]._endFn, false), e._releaseHtml5Audio(r2[n]._node)), delete r2[n]._node, i._clearTimer(r2[n]._id);
      var s = e._howls.indexOf(i);
      s >= 0 && e._howls.splice(s, 1);
      var u2 = true;
      for (n = 0; n < e._howls.length; n++)
        if (e._howls[n]._src === i._src || i._src.indexOf(e._howls[n]._src) >= 0) {
          u2 = false;
          break;
        }
      return o && u2 && delete o[i._src], e.noAudio = false, i._state = "unloaded", i._sounds = [], i = null, null;
    }, on: function(i, r2, n, s) {
      var u2 = this, h2 = u2["_on" + i];
      return typeof r2 == "function" && h2.push(s ? { id: n, fn: r2, once: s } : { id: n, fn: r2 }), u2;
    }, off: function(i, r2, n) {
      var s = this, u2 = s["_on" + i], h2 = 0;
      if (typeof r2 == "number" && (n = r2, r2 = null), r2 || n)
        for (h2 = 0; h2 < u2.length; h2++) {
          var m = n === u2[h2].id;
          if (r2 === u2[h2].fn && m || !r2 && m) {
            u2.splice(h2, 1);
            break;
          }
        }
      else if (i)
        s["_on" + i] = [];
      else {
        var b = Object.keys(s);
        for (h2 = 0; h2 < b.length; h2++)
          b[h2].indexOf("_on") === 0 && Array.isArray(s[b[h2]]) && (s[b[h2]] = []);
      }
      return s;
    }, once: function(i, r2, n) {
      var s = this;
      return s.on(i, r2, n, 1), s;
    }, _emit: function(i, r2, n) {
      for (var s = this, u2 = s["_on" + i], h2 = u2.length - 1; h2 >= 0; h2--)
        (!u2[h2].id || u2[h2].id === r2 || i === "load") && (setTimeout(function(m) {
          m.call(this, r2, n);
        }.bind(s, u2[h2].fn), 0), u2[h2].once && s.off(i, u2[h2].fn, u2[h2].id));
      return s._loadQueue(i), s;
    }, _loadQueue: function(i) {
      var r2 = this;
      if (r2._queue.length > 0) {
        var n = r2._queue[0];
        n.event === i && (r2._queue.shift(), r2._loadQueue()), i || n.action();
      }
      return r2;
    }, _ended: function(i) {
      var r2 = this, n = i._sprite;
      if (!r2._webAudio && i._node && !i._node.paused && !i._node.ended && i._node.currentTime < i._stop)
        return setTimeout(r2._ended.bind(r2, i), 100), r2;
      var s = !!(i._loop || r2._sprite[n][2]);
      if (r2._emit("end", i._id), !r2._webAudio && s && r2.stop(i._id, true).play(i._id), r2._webAudio && s) {
        r2._emit("play", i._id), i._seek = i._start || 0, i._rateSeek = 0, i._playStart = e.ctx.currentTime;
        var u2 = (i._stop - i._start) * 1e3 / Math.abs(i._rate);
        r2._endTimers[i._id] = setTimeout(r2._ended.bind(r2, i), u2);
      }
      return r2._webAudio && !s && (i._paused = true, i._ended = true, i._seek = i._start || 0, i._rateSeek = 0, r2._clearTimer(i._id), r2._cleanBuffer(i._node), e._autoSuspend()), !r2._webAudio && !s && r2.stop(i._id, true), r2;
    }, _clearTimer: function(i) {
      var r2 = this;
      if (r2._endTimers[i]) {
        if (typeof r2._endTimers[i] != "function")
          clearTimeout(r2._endTimers[i]);
        else {
          var n = r2._soundById(i);
          n && n._node && n._node.removeEventListener("ended", r2._endTimers[i], false);
        }
        delete r2._endTimers[i];
      }
      return r2;
    }, _soundById: function(i) {
      for (var r2 = this, n = 0; n < r2._sounds.length; n++)
        if (i === r2._sounds[n]._id)
          return r2._sounds[n];
      return null;
    }, _inactiveSound: function() {
      var i = this;
      i._drain();
      for (var r2 = 0; r2 < i._sounds.length; r2++)
        if (i._sounds[r2]._ended)
          return i._sounds[r2].reset();
      return new a(i);
    }, _drain: function() {
      var i = this, r2 = i._pool, n = 0, s = 0;
      if (!(i._sounds.length < r2)) {
        for (s = 0; s < i._sounds.length; s++)
          i._sounds[s]._ended && n++;
        for (s = i._sounds.length - 1; s >= 0; s--) {
          if (n <= r2)
            return;
          i._sounds[s]._ended && (i._webAudio && i._sounds[s]._node && i._sounds[s]._node.disconnect(0), i._sounds.splice(s, 1), n--);
        }
      }
    }, _getSoundIds: function(i) {
      var r2 = this;
      if (typeof i > "u") {
        for (var n = [], s = 0; s < r2._sounds.length; s++)
          n.push(r2._sounds[s]._id);
        return n;
      } else
        return [i];
    }, _refreshBuffer: function(i) {
      var r2 = this;
      return i._node.bufferSource = e.ctx.createBufferSource(), i._node.bufferSource.buffer = o[r2._src], i._panner ? i._node.bufferSource.connect(i._panner) : i._node.bufferSource.connect(i._node), i._node.bufferSource.loop = i._loop, i._loop && (i._node.bufferSource.loopStart = i._start || 0, i._node.bufferSource.loopEnd = i._stop || 0), i._node.bufferSource.playbackRate.setValueAtTime(i._rate, e.ctx.currentTime), r2;
    }, _cleanBuffer: function(i) {
      var r2 = this, n = e._navigator && e._navigator.vendor.indexOf("Apple") >= 0;
      if (e._scratchBuffer && i.bufferSource && (i.bufferSource.onended = null, i.bufferSource.disconnect(0), n))
        try {
          i.bufferSource.buffer = e._scratchBuffer;
        } catch (s) {
        }
      return i.bufferSource = null, r2;
    }, _clearSound: function(i) {
      var r2 = /MSIE |Trident\//.test(e._navigator && e._navigator.userAgent);
      r2 || (i.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
    } };
    var a = function(i) {
      this._parent = i, this.init();
    };
    a.prototype = { init: function() {
      var i = this, r2 = i._parent;
      return i._muted = r2._muted, i._loop = r2._loop, i._volume = r2._volume, i._rate = r2._rate, i._seek = 0, i._paused = true, i._ended = true, i._sprite = "__default", i._id = ++e._counter, r2._sounds.push(i), i.create(), i;
    }, create: function() {
      var i = this, r2 = i._parent, n = e._muted || i._muted || i._parent._muted ? 0 : i._volume;
      return r2._webAudio ? (i._node = typeof e.ctx.createGain > "u" ? e.ctx.createGainNode() : e.ctx.createGain(), i._node.gain.setValueAtTime(n, e.ctx.currentTime), i._node.paused = true, i._node.connect(e.masterGain)) : e.noAudio || (i._node = e._obtainHtml5Audio(), i._errorFn = i._errorListener.bind(i), i._node.addEventListener("error", i._errorFn, false), i._loadFn = i._loadListener.bind(i), i._node.addEventListener(e._canPlayEvent, i._loadFn, false), i._endFn = i._endListener.bind(i), i._node.addEventListener("ended", i._endFn, false), i._node.src = r2._src, i._node.preload = r2._preload === true ? "auto" : r2._preload, i._node.volume = n * e.volume(), i._node.load()), i;
    }, reset: function() {
      var i = this, r2 = i._parent;
      return i._muted = r2._muted, i._loop = r2._loop, i._volume = r2._volume, i._rate = r2._rate, i._seek = 0, i._rateSeek = 0, i._paused = true, i._ended = true, i._sprite = "__default", i._id = ++e._counter, i;
    }, _errorListener: function() {
      var i = this;
      i._parent._emit("loaderror", i._id, i._node.error ? i._node.error.code : 0), i._node.removeEventListener("error", i._errorFn, false);
    }, _loadListener: function() {
      var i = this, r2 = i._parent;
      r2._duration = Math.ceil(i._node.duration * 10) / 10, Object.keys(r2._sprite).length === 0 && (r2._sprite = { __default: [0, r2._duration * 1e3] }), r2._state !== "loaded" && (r2._state = "loaded", r2._emit("load"), r2._loadQueue()), i._node.removeEventListener(e._canPlayEvent, i._loadFn, false);
    }, _endListener: function() {
      var i = this, r2 = i._parent;
      r2._duration === 1 / 0 && (r2._duration = Math.ceil(i._node.duration * 10) / 10, r2._sprite.__default[1] === 1 / 0 && (r2._sprite.__default[1] = r2._duration * 1e3), r2._ended(i)), i._node.removeEventListener("ended", i._endFn, false);
    } };
    var o = {}, d = function(i) {
      var r2 = i._src;
      if (o[r2]) {
        i._duration = o[r2].duration, v2(i);
        return;
      }
      if (/^data:[^;]+;base64,/.test(r2)) {
        for (var n = atob(r2.split(",")[1]), s = new Uint8Array(n.length), u2 = 0; u2 < n.length; ++u2)
          s[u2] = n.charCodeAt(u2);
        p(s.buffer, i);
      } else {
        var h2 = new XMLHttpRequest();
        h2.open(i._xhr.method, r2, true), h2.withCredentials = i._xhr.withCredentials, h2.responseType = "arraybuffer", i._xhr.headers && Object.keys(i._xhr.headers).forEach(function(m) {
          h2.setRequestHeader(m, i._xhr.headers[m]);
        }), h2.onload = function() {
          var m = (h2.status + "")[0];
          if (m !== "0" && m !== "2" && m !== "3") {
            i._emit("loaderror", null, "Failed loading audio file with status: " + h2.status + ".");
            return;
          }
          p(h2.response, i);
        }, h2.onerror = function() {
          i._webAudio && (i._html5 = true, i._webAudio = false, i._sounds = [], delete o[r2], i.load());
        }, f2(h2);
      }
    }, f2 = function(i) {
      try {
        i.send();
      } catch (r2) {
        i.onerror();
      }
    }, p = function(i, r2) {
      var n = function() {
        r2._emit("loaderror", null, "Decoding audio data failed.");
      }, s = function(u2) {
        u2 && r2._sounds.length > 0 ? (o[r2._src] = u2, v2(r2, u2)) : n();
      };
      typeof Promise < "u" && e.ctx.decodeAudioData.length === 1 ? e.ctx.decodeAudioData(i).then(s).catch(n) : e.ctx.decodeAudioData(i, s, n);
    }, v2 = function(i, r2) {
      r2 && !i._duration && (i._duration = r2.duration), Object.keys(i._sprite).length === 0 && (i._sprite = { __default: [0, i._duration * 1e3] }), i._state !== "loaded" && (i._state = "loaded", i._emit("load"), i._loadQueue());
    }, S2 = function() {
      if (!!e.usingWebAudio) {
        try {
          typeof AudioContext < "u" ? e.ctx = new AudioContext() : typeof webkitAudioContext < "u" ? e.ctx = new webkitAudioContext() : e.usingWebAudio = false;
        } catch (u2) {
          e.usingWebAudio = false;
        }
        e.ctx || (e.usingWebAudio = false);
        var i = /iP(hone|od|ad)/.test(e._navigator && e._navigator.platform), r2 = e._navigator && e._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), n = r2 ? parseInt(r2[1], 10) : null;
        if (i && n && n < 9) {
          var s = /safari/.test(e._navigator && e._navigator.userAgent.toLowerCase());
          e._navigator && !s && (e.usingWebAudio = false);
        }
        e.usingWebAudio && (e.masterGain = typeof e.ctx.createGain > "u" ? e.ctx.createGainNode() : e.ctx.createGain(), e.masterGain.gain.setValueAtTime(e._muted ? 0 : e._volume, e.ctx.currentTime), e.masterGain.connect(e.ctx.destination)), e._setup();
      }
    };
    typeof define == "function" && define.amd && define([], function() {
      return { Howler: e, Howl: t };
    }), typeof ct < "u" && (ct.Howler = e, ct.Howl = t), typeof global < "u" ? (global.HowlerGlobal = l, global.Howler = e, global.Howl = t, global.Sound = a) : typeof window < "u" && (window.HowlerGlobal = l, window.Howler = e, window.Howl = t, window.Sound = a);
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
            p._stereo = e, p._pos = [e, 0, 0], p._node && (p._pannerAttr.panningModel = "equalpower", (!p._panner || !p._panner.pan) && l(p, o), o === "spatial" ? typeof p._panner.positionX < "u" ? (p._panner.positionX.setValueAtTime(e, Howler.ctx.currentTime), p._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime), p._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : p._panner.setPosition(e, 0, 0) : p._panner.pan.setValueAtTime(e, Howler.ctx.currentTime)), a._emit("stereo", p._id);
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
            v2._pos = [e, t, a], v2._node && ((!v2._panner || v2._panner.pan) && l(v2, "spatial"), typeof v2._panner.positionX < "u" ? (v2._panner.positionX.setValueAtTime(e, Howler.ctx.currentTime), v2._panner.positionY.setValueAtTime(t, Howler.ctx.currentTime), v2._panner.positionZ.setValueAtTime(a, Howler.ctx.currentTime)) : v2._panner.setPosition(e, t, a)), d._emit("pos", v2._id);
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
            v2._orientation = [e, t, a], v2._node && (v2._panner || (v2._pos || (v2._pos = d._pos || [0, 0, -0.5]), l(v2, "spatial")), typeof v2._panner.orientationX < "u" ? (v2._panner.orientationX.setValueAtTime(e, Howler.ctx.currentTime), v2._panner.orientationY.setValueAtTime(t, Howler.ctx.currentTime), v2._panner.orientationZ.setValueAtTime(a, Howler.ctx.currentTime)) : v2._panner.setOrientation(e, t, a)), d._emit("orientation", v2._id);
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
          S2 ? (S2.coneInnerAngle = v2.coneInnerAngle, S2.coneOuterAngle = v2.coneOuterAngle, S2.coneOuterGain = v2.coneOuterGain, S2.distanceModel = v2.distanceModel, S2.maxDistance = v2.maxDistance, S2.refDistance = v2.refDistance, S2.rolloffFactor = v2.rolloffFactor, S2.panningModel = v2.panningModel) : (d._pos || (d._pos = e._pos || [0, 0, -0.5]), l(d, "spatial"));
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
    var l = function(e, t) {
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
    function p(s, u2, h2) {
      let m = s[u2[0]];
      return m == null ? false : u2.length === 1 ? typeof m === h2 : (typeof m == "function" || typeof m == "object") && p(m, u2.slice(1), h2);
    }
    function v2(s) {
      return s.name === "iOS" && s.version != null && ["11.2.2", "11.2.5", "11.2.6"].includes(s.version);
    }
    let S2 = true, i = true, r2 = [];
    location.protocol.startsWith("http") || (r2.push("httpProtocol"), S2 = i = false), p(window, ["isSecureContext"], "boolean") && !window.isSecureContext && r2.push("secureContext"), !p(navigator, ["mediaDevices", "getUserMedia"], "function") && !p(navigator, ["enumerateDevices"], "function") && !p(window, ["MediaStreamTrack", "getSources"], "function") && (r2.push("mediaDevices"), S2 = false), p(window, ["Worker"], "function") || (r2.push("webWorkers"), S2 = i = false), p(window, ["WebAssembly"], "object") || (r2.push("webAssembly"), S2 = i = false), p(window, ["Blob"], "function") || (r2.push("blob"), S2 = i = false), p(window, ["URL", "createObjectURL"], "function") || (r2.push("urlObject"), S2 = i = false), p(window, ["OffscreenCanvas"], "function") || r2.push("offscreenCanvas");
    try {
      if (!p(window, ["WebGLRenderingContext"], "function") || f2.canvas.getContext("webgl") == null && f2.canvas.getContext("experimental-webgl") == null)
        throw new Error();
    } catch (s) {
      r2.push("webGL");
    }
    let n = f2.userAgentInfo.getOS();
    return v2(n) && (r2.push("webAssemblyErrorFree"), S2 = i = false), { fullSupport: S2, scannerSupport: i, missingFeatures: r2 };
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
      let r2 = i.toString(16);
      return r2.length === 1 ? `0${r2}` : r2;
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
  let l;
  ((r2) => (r2.Debug = "debug", r2.Info = "info", r2.Warn = "warn", r2.Error = "error", r2.Quiet = "quiet"))(l = d.Level || (d.Level = {}));
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
function ci(l, e = location) {
  if (l += l.endsWith("/") ? "" : "/", /^https?:\/\//.test(l))
    return l;
  l = l.split("/").filter((a) => a.length > 0).join("/"), l = l === "" ? "/" : `/${l}/`;
  let t;
  return t = e.protocol === "file:" || e.origin === "null" ? `${e.href.split("/").slice(0, -1).join("/")}${l}` : `${e.origin}${l}`, t;
}
function pr(l) {
  return /^https?:\/\/(?:[^./]*\.)*cdn.jsdelivr.net\//.test(l) ? { result: true, cdnBaseURL: "https://cdn.jsdelivr.net/npm/" } : /^https?:\/\/(?:[^./]*\.)*unpkg.com\//.test(l) ? { result: true, cdnBaseURL: "https://unpkg.com/" } : { result: false, cdnBaseURL: "" };
}
function hr(l) {
  let t = /scandit-web-datacapture-[a-z]+/i.exec(l);
  return t ? t[0] : null;
}
function ui(l, e, t, a) {
  let o = e, d = pr(o);
  if (d.result) {
    let v2 = hr(o);
    v2 != null && (o = `${d.cdnBaseURL}${v2}@${l}/build/engine/`);
  }
  let f2 = "";
  a && (f2 += "-simd");
  let p = t.replace(".wasm", "");
  return d.result ? { jsURI: `${o}${p}${f2}.js`, wasmURI: `${o}${p}${f2}.wasm` } : { jsURI: `${o}${p}${f2}.js?v=${l}`, wasmURI: `${o}${p}${f2}.wasm?v=${l}` };
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
  let l = /* @__PURE__ */ new Map([["DeviceCaptureError", "AbortError"], ["NotSupportedError", "AbortError"], ["ScreenCaptureError", "AbortError"], ["TabCaptureError", "AbortError"], ["TypeError", "AbortError"], ["InvalidStateError", "NotAllowedError"], ["MediaDeviceFailedDueToShutdown", "NotAllowedError"], ["MediaDeviceKillSwitchOn", "NotAllowedError"], ["PermissionDeniedError", "NotAllowedError"], ["PermissionDismissedError", "NotAllowedError"], ["DevicesNotFoundError", "NotFoundError"], ["SourceUnavailableError", "NotReadableError"], ["TrackStartError", "NotReadableError"], ["ConstraintNotSatisfiedError", "OverconstrainedError"]]), e = ["rear", "back", "r\xFCck", "arri\xE8re", "trasera", "tr\xE1s", "traseira", "posteriore", "\u540E\u9762", "\u5F8C\u9762", "\u80CC\u9762", "\u540E\u7F6E", "\u5F8C\u7F6E", "\u80CC\u7F6E", "\u0437\u0430\u0434\u043D\u0435\u0439", "\u0627\u0644\u062E\u0644\u0641\u064A\u0629", "\uD6C4", "arka", "achterzijde", "\u0E2B\u0E25\u0E31\u0E07", "baksidan", "bagside", "sau", "bak", "tylny", "takakamera", "belakang", "\u05D0\u05D7\u05D5\u05E8\u05D9\u05EA", "\u03C0\u03AF\u03C3\u03C9", "spate", "h\xE1ts\xF3", "zadn\xED", "darrere", "zadn\xE1", "\u0437\u0430\u0434\u043D\u044F", "stra\u017Enja", "belakang", "\u092C\u0948\u0915"], t, a = false;
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
    A = y2.message === "Invalid constraint" ? "OverconstrainedError" : (M2 = l.get(y2.name)) != null ? M2 : y2.name, Object.defineProperty(y2, "name", { value: A });
  }
  function i(y2, A) {
    let M2;
    if (G.isDesktopDevice())
      M2 = D2.mainCameraForPositionOverridesOnDesktop.has(A) ? D2.mainCameraForPositionOverridesOnDesktop.get(A) : y2.find((w2) => w2.position === A);
    else {
      let w2 = y2.every((L) => L.label === ""), I2 = y2.every((L) => L.label !== ""), E2 = y2.length > 1 && !w2 && !I2;
      if (w2)
        M2 = y2[A === "userFacing" ? 0 : y2.length - 1];
      else if (E2) {
        let L = y2.filter((z) => z.position === A);
        L.length === 1 ? M2 = L[0] : L.length > 1 && (M2 = L[A === "userFacing" ? 0 : L.length - 1]);
      } else
        M2 = y2.filter((L) => L.position === A).sort((L, z) => L.label.localeCompare(z.label))[0];
    }
    return M2;
  }
  D2.getMainCameraForPosition = i;
  function r2(y2, A) {
    function M2(E2, L) {
      let z = D2.mainCameraForPositionOverridesOnDesktop.get(L);
      return z != null && E2.includes(z) && (E2 = E2.filter((ce) => ce !== z), E2.unshift(z)), E2;
    }
    let w2 = y2.filter((E2) => E2.position === "userFacing"), I2 = y2.filter((E2) => E2.position === "worldFacing");
    return G.isDesktopDevice() ? (w2 = M2(w2, "userFacing"), I2 = M2(I2, "worldFacing")) : y2.every((E2) => E2.label === "") ? I2.reverse() : (w2.sort((E2, L) => E2.label.localeCompare(L.label)), I2.sort((E2, L) => E2.label.localeCompare(L.label))), A === "userFacing" ? [...w2, ...I2] : [...I2, ...w2];
  }
  D2.sortCamerasForCameraPosition = r2;
  function n(y2, A) {
    let M2 = y2.getVideoTracks();
    if (M2.length > 0) {
      let w2 = M2[0], I2;
      typeof w2.getSettings == "function" && (I2 = w2.getSettings(), I2.facingMode != null && I2.facingMode.length > 0 && (A.position = I2.facingMode === "environment" ? "worldFacing" : "userFacing")), w2.label != null && w2.label.length > 0 && (A.label = w2.label);
    }
  }
  D2.adjustCameraFromMediaStream = n;
  function s(y2) {
    function A(w2, I2, E2) {
      var Le;
      if (D2.deviceIdToCameraObjects.has(w2.deviceId))
        return D2.deviceIdToCameraObjects.get(w2.deviceId);
      let L = (Le = w2.label) != null ? Le : "", z;
      return !G.isDesktopDevice() && E2.every((ve) => ve.label === "" && !D2.deviceIdToCameraObjects.has(ve.deviceId)) ? z = E2.length === 1 || I2 + 1 <= Math.floor(E2.length / 2) ? "userFacing" : "worldFacing" : z = v2(L) ? "worldFacing" : "userFacing", { position: z, label: L, deviceId: w2.deviceId };
    }
    let M2 = y2.map(A).map((w2) => (w2.deviceId !== "" && D2.deviceIdToCameraObjects.set(w2.deviceId, w2), w2)).filter((w2) => !/\b(?:ir|infrared)\b/i.test(w2.label)).filter((w2) => !D2.inaccessibleDeviceIds.has(w2.deviceId));
    if (!G.isDesktopDevice() && M2.length > 1 && !M2.some((w2) => w2.position === "worldFacing")) {
      let w2 = M2.length - 1, I2 = M2.map((E2) => {
        let L = /\b(\d+)mp?\b/i.exec(E2.label);
        return L != null ? Number.parseInt(L[1], 10) : Number.NaN;
      });
      I2.some((E2) => isNaN(E2)) || (w2 = I2.lastIndexOf(Math.max(...I2))), M2[w2].position = "worldFacing";
    }
    return M2;
  }
  async function u2() {
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
      for (let [I2, E2] of y2.entries()) {
        let L = D2.deviceIdToCameraObjects.get(E2.deviceId);
        if (L == null || L.label !== ((M2 = A[I2].label) != null ? M2 : ""))
          continue;
        let z = A[I2].deviceId;
        w2[L.deviceId] = z, D2.inaccessibleDeviceIds.has(L.deviceId) && D2.inaccessibleDeviceIds.add(z), L.deviceId = z, D2.deviceIdToCameraObjects.set(z, L);
      }
      g.log(g.Level.Debug, "Detected updated camera deviceId information and updated it accordingly", w2);
    }
  }
  async function m(y2 = false, A = false) {
    let M2 = G.checkBrowserCompatibility();
    if (!M2.fullSupport)
      throw new ue(M2);
    if (typeof navigator.mediaDevices.addEventListener == "function" ? navigator.mediaDevices.addEventListener("devicechange", p) : navigator.mediaDevices.ondevicechange = p, t == null || y2 || a) {
      a = false;
      let I2, E2 = t != null ? t : [];
      t = [];
      try {
        t = await B2(), A || (I2 = await u2(), I2 != null && (t = await B2())), g.log(g.Level.Debug, "Camera list (devices):", ...t), h2(E2, t);
      } catch (L) {
        throw S2(L), L;
      } finally {
        if (I2 != null)
          for (let L of I2.getVideoTracks())
            L.stop();
      }
    }
    let w2 = s(t);
    return g.log(g.Level.Debug, "Camera list (cameras): ", ...w2), [...w2];
  }
  D2.getCameras = m;
  async function b(y2) {
    return g.log(g.Level.Debug, "Attempt to access camera (parameters):", y2.video), new Promise((A, M2) => {
      window.setTimeout(() => {
        var w2;
        ((w2 = navigator.mediaDevices.getUserMedia(y2)) != null ? w2 : Promise.reject(new J({ name: "AbortError" }))).then(A).catch(M2);
      }, 0);
    });
  }
  function C(y2) {
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
  async function _(y2, A) {
    g.log(g.Level.Debug, "Attempt to access camera (camera):", A);
    let M2 = { audio: false, video: C(y2) };
    A.deviceId === "" ? M2.video.facingMode = { ideal: A.position === "worldFacing" ? "environment" : "user" } : M2.video.deviceId = { exact: A.deviceId };
    try {
      let w2 = await b(M2);
      return n(w2, A), w2;
    } catch (w2) {
      throw S2(w2), ["OverconstrainedError", "NotReadableError", "NotAllowedError"].includes(w2.name) || j2(A), w2;
    }
  }
  D2.accessCameraStream = _;
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
  async function l(t, a) {
    return Y.getCameras(t != null ? t : false, a != null ? a : false);
  }
  e.getCameras = l;
})(Ye || (Ye = {}));
var di = "data:audio/mp3;base64,//uwAAAAA8ROTJVigAB4icmSrFAAE/IjVfj6gAJ+RGq/H1AAADEN55555509PSUkYjEMQ5DCaBiMBmSoGPBh6QGGJAZo8BoDwGYJADEBmQbAAbMBcAJ0IIRQuFwuF8vm6aaaaaaCCH/9RcIubDkCgBQAzBOLL5cLhog3p////6BgTBFC4yZfTah/////WmYFwuBgTh///5cEDgnB8AMQ3nnnnnnT09JSRiMQxDkMJoGIwGZKgY8GHpAYYkBmjwGgPAZgkAMQGZBsABswFwAnQghFC4XC4Xy+bppppppoIIf/1Fwi5sOQKAFADME4svlwuGiDen////oGBMEULjJl9NqH////9aZgXC4GBOH///lwQOCcH7usq4IwABEoZUkABBACSAH6LQxWQ1ekTmN4ZafMA1wANy7UyDUPgZzK4WdA1sdhHQGm0eAcG0Uwxsang94vpi3jMEgeLBTM1nUEFdDatet8mwsLJddIZ0CIGTVYoADBkuf9NrJ1f3UsUMJtLy/dMOCTfrUURBBm/6mKA7P6lkcLj/z5mI2/+plE5/9TFgqrf/qYpFf/9v///9Z7////Weu6yrgjAAEShlSQAEEAJIAfotDFZDV6ROY3hlp8wDXAA3LtTINQ+BnMrhZ0DWx2EdAabR4BwbRTDGxqeD3i+mLeMwSB4sFMzWdQQV0Nq163ybCwsl10hnQIgZNVigAMGS5/02snV/dSxQwm0vL90w4JN+tRREEGb/qYoDs/qWRwuP/PmYjb/6mUTn/1MWCqt/+pikV//2////1nv///9Z57qrtSAAaAEOPo6q0VkVoBSMfBmZVHFMomra/sFv//+7IADwAEcXjR92KgAo4vGj7sVABRJeNFzHKLAiS8aLmOUWARYQFAEDoGXFeBv7iAZHHAGKwQLnD0RkkCKmpzOKUjUjUiy0nUlpOh2UUjSoc4VsAaFAMkgspOZb1de+/222v3lN9ikN8FBKOaa0lI/b/+32+TGsxIaGIRJknav9///1fSInqSWHRKS6v///6/nCEJvdVdqQADQAhx9HVWisitAKRj4MzKo4plE1bX9gt/iLCAoAgdAy4rwN/cQDI44AxWCBc4eiMkgRU1OZxSkakakWWk6ktJ0OyikaVDnCtgDQoBkkFlJzLerr33+221+8pvsUhvgoJRzTWkpH7f/2+3yY1mJDQxCJMk7V/v//+r6RE9SSw6JSXV////X84QhNqq9yGAAtDIPgN54cGQ0s4MLUdIZgz1qumUxddqEpWGZfQdAYAOR0btmDgYpm3SG6ec7wnc1aVs2dj+1bbTnyweolsigCR4Bd4UcqIoKbf1mlbVoekvRo/NT+yIW3Ci11PUfr6dTaC7b2fe/yLtUspAgFDuR53///+pvOkM14YR+pvt/+v6/koSLVV7kMABaGQfAbzw4MhpZwYWo6QzBnrVdMpi67UJSsMy+g6AwAcjo3bMHAxTNukN0853hO5q0rZs7H9q22nPlg9RLZFAEjwC7wo5URQU2/rNK2rQ9JejR+an9kQtuFFrqeo/X06m0F23s+9/kXapZSBAKHcjzv///9TedIZrwwj9Tfb/9f1/JQkVi7zplQAFIAgwMk9GmLaGUorLwS8iIOIgIHDACBpGPGPIQTeb9Ig1+zoNGAMN6Ijtv5KI3h0rZfrLVE0dZ6n/+7IAHwAEk3jRez2kEJJvGi9ntIIT3eU/7PqwQnu8p/2fVgg7IPUzJfLB65iPwTcgPIEeWDqpvvvo6N2qSs9T1fIxKtlg1Fg5Kkp6z7nWWdSqqUulspS3s9vkhqoBb8Kg7POv6///9vUQVqqgx7Xmf7f//rbyUN1Rd50yoACkAQYGSejTFtDKUVl4JeREHEQEDhgBA0jHjHkIJvN+kQa/Z0GjAGG9ER238lEbw6Vsv1lqiaOs9SdkHqZkvlg9cxH4JuQHkCPLB1U3330dG7VJWep6vkYlWywaiwclSU9Z9zrLOpVVKXS2Upb2e3yQ1UAt+FQdnnX9f//+3qIK1VQY9rzP9v//1t5KG6jmYd0IAA0gIAD4Llq2gAnFo8YQd9sJd67dV09LYmltad5GkSGPh80IAtg4NUiAWeV15W6FXRpnnczdM46C/SvZzut0SUNUjYiIywAAvA1QCg40iSbnTJdtr85/P3fO63YhxpWgiDUWgsOUjjzp+tq2+r+++jtYd2dURoFQ+LhSOZ0/Xrb/9T9Sz21xU3rrCIH1Zi9ev9/1atZ7aRwqb1nMw7oQABpAQAHwXLVtABOLR4wg77YS7126rp6WxNLa07yNIkMfD5oQBbBwapEAs8rryt0KujTPO5m6Zx0F+lezndbokoapGxERlgABeBqgFBxpEk3OmS7bX5z+fu+d1uxDjStBEGotBYcpHHnT9bVt9X999Haw7s6ojQKh8XCkczp+vW3/6n6lntripvXWEQPqzF69f7/q1az20jhU3rV7maZEAAWQDDArs+W/cFQBSysHAKdYWnzUwc2mlLOlivqupASYLMR//In/+7IAFQAEsHlRe4mkoJYPKi9xNJQSUeVF7hqSwko8qL3DUliIwQla+ytB9/jCGTwOk7YLCgqBZuy6Dc6/c4eQc0L4CDQAc0T4T5smsq7e5vm9np2bqoaspnmWgiEzoOAqU861fWtS6kamrTW703pasnfL4YpEzZ2sf+32//WnrnSY1XDcPXnP/r/q/baZjfd7maZEAAWQDDArs+W/cFQBSysHAKdYWnzUwc2mlLOlivqupASYLMR//ImIwQla+ytB9/jCGTwOk7YLCgqBZuy6Dc6/c4eQc0L4CDQAc0T4T5smsq7e5vm9np2bqoaspnmWgiEzoOAqU861fWtS6kamrTW703pasnfL4YpEzZ2sf+32//WnrnSY1XDcPXnP/r/q/baZjfdpycyVAATgBDA1ALqbMHAeBrYsAWWvHH2AywaA7BHvZmwaGmklUBEh5MPfAYCKjjZQRAGyw/4fwM8hGdB9J4CJscei+u5YLTImQ+QavAASY+iycWpPbNd999Hba+rMXrrCZ0W1StZar1utXOa91mj1O3XkCZ1SkCRAiy16n9Tfq//P+onVdYcXq02/9f9bf+P47nacnMlQAE4AQwNQC6mzBwHga2LAFlrxx9gMsGgOwR72ZsGhppJVARIeTD3wGAio42UEQBssP+H8DPIRnQfSeAibHHovruWC0yJkPkGrwAEmPosnFqT2zXfffR22vqzF66wmdFtUrWWq9brVzmvdZo9Tt15AmdUpAkQIstep/U36v/z/qJ1XWHF6tNv/X/W3/j+O543/+6UACbAYaztA4tsHCcKBx5S8EJ48ScsKkEaV3wtIwd45ACAQBij/+7IAFAAEt3hUfWKgApbvCo+sVABSgV9f+YoAAlAr6/8xQAAgAbKYoGDwWBIDlhrJuWqzTL9SbKMay9NzZaZstX1Hqz6AYYCxHFLl9Pf+tVapulmK7UWt9B61l8Neg3tQSZCrztaV88yFfW7oCbU6RmLPAOCwEggQQ0TqfapGrV//Uf9RC6EzDAiSHKL/////nREb//dKABNgMNZ2gcW2DhOFA48peCE8eJOWFSCNK74WkYO8cgBAIAxQQANlMUDB4LAkByw1k3LVZpl+pNlGNZem5stM2Wr6j1Z9AMMBYjily+nv/WqtU3SzFdqLW+g9ay+GvQb2oJMhV52tK+eZCvrd0BNqdIzFngHBYCQQIIaJ1PtUjVq//qP+ohdCZhgRJDlF/////zoi5C6lVAABQCoDYQD4ZCwVB9kTFKkiv9NQcExMLk3ipgtxrzPf8LZgdNYHsgYIPgbIgAEXEAwCgpAie4XVi5BaBlBUxSQfMO7yfQPFcsGReNjIgX0QvmASaIgQc3SJkgpqr+myNNNNJSSX/n1Hw/4CgwqkXN3qSMTVX//U2skkQuTq9JJEy/+ybvT6p1IjCCpfiL/+SuQupVQAAUAqA2EA+GQsFQfZExSpIr/TUHBMTC5N4qYLca8z3/C2YHTWB7IGCD4GyIABFxAMAoKQInuF1YuQWgZQVMUkHzDu8n0DxXLBkXjYyIF9EL5gEmiIEHN0iZIKaq/psjTTTSUkl/59R8P+AoMKpFzd6kjE1V//1NrJJELk6vSSRMv/sm70+qdSIwgqX4i//klMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+7IAAA/wAABpBwAACAAADSDgAAEAAAGkAAAAIAAANIAAAARMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=";
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
var gr = ((o) => (o.WidthAndHeight = "widthAndHeight", o.WidthAndAspectRatio = "widthAndAspectRatio", o.HeightAndAspectRatio = "heightAndAspectRatio", o.ShorterDimensionAndAspectRatio = "shorterDimensionAndAspectRatio", o))(gr || {});
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
var fr = ((p) => (p.None = "none", p.Horizontal = "horizontal", p.LeftToRight = "leftToRight", p.RightToLeft = "rightToLeft", p.Vertical = "vertical", p.TopToBottom = "topToBottom", p.BottomToTop = "bottomToTop", p))(fr || {});
var vr = ((t) => (t.Minimal = "minimal", t.Extended = "extended", t))(vr || {});
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
var Sr = ((t) => (t.Rounded = "rounded", t.Square = "square", t))(Sr || {});
var br = ((t) => (t.Light = "light", t.Bold = "bold", t))(br || {});
var Cr = ((e) => (e.Animated = "animated", e))(Cr || {});
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
function Ar(l) {
  var e;
  return { Camera: { Settings: { preferredResolution: l.Camera.Settings.preferredResolution, zoomFactor: l.Camera.Settings.zoomFactor, zoomGestureZoomFactor: l.Camera.Settings.zoomGestureZoomFactor, focusGestureStrategy: l.Camera.Settings.focusGestureStrategy }, defaultPosition: (e = l.Camera.defaultPosition) != null ? e : null, availablePositions: l.Camera.availablePositions }, SingleImageUploader: { Settings: { iconElement: document.createRange().createContextualFragment(l.SingleImageUploader.Settings.iconElement).firstElementChild, informationElement: document.createRange().createContextualFragment(l.SingleImageUploader.Settings.informationElement).firstElementChild, buttonElement: document.createRange().createContextualFragment(l.SingleImageUploader.Settings.buttonElement).firstElementChild, containerStyle: l.SingleImageUploader.Settings.containerStyle, iconStyle: l.SingleImageUploader.Settings.iconStyle, informationStyle: l.SingleImageUploader.Settings.informationStyle, buttonStyle: l.SingleImageUploader.Settings.buttonStyle } }, DataCaptureView: { scanAreaMargins: me.fromJSON(JSON.parse(l.DataCaptureView.scanAreaMargins)), pointOfInterest: se.fromJSON(JSON.parse(l.DataCaptureView.pointOfInterest)), logoStyle: l.DataCaptureView.logoStyle, logoAnchor: l.DataCaptureView.logoAnchor, logoOffset: se.fromJSON(JSON.parse(l.DataCaptureView.logoOffset)), focusGesture: It.fromJSON(JSON.parse(l.DataCaptureView.focusGesture)), zoomGesture: Et.fromJSON(JSON.parse(l.DataCaptureView.zoomGesture)), cameraRecoveryText: l.DataCaptureView.cameraRecoveryText }, LaserlineViewfinder: Object.keys(l.LaserlineViewfinder.styles).reduce((t, a) => {
    let o = l.LaserlineViewfinder.styles[a];
    return t.styles[a] = { width: R.fromJSON(JSON.parse(o.width)), enabledColor: W.fromJSON(o.enabledColor), disabledColor: W.fromJSON(o.disabledColor), style: o.style }, t;
  }, { defaultStyle: l.LaserlineViewfinder.defaultStyle, styles: {} }), RectangularViewfinder: Object.keys(l.RectangularViewfinder.styles).reduce((t, a) => {
    let o = l.RectangularViewfinder.styles[a];
    return t.styles[a] = { size: q.fromJSON(JSON.parse(o.size)), color: W.fromJSON(o.color), style: o.style, lineStyle: o.lineStyle, dimming: Number.parseFloat(o.dimming.toString()), animation: Ae.fromJSON(JSON.parse(o.animation)) }, t;
  }, { defaultStyle: l.RectangularViewfinder.defaultStyle, styles: {} }), AimerViewfinder: { frameColor: W.fromJSON(l.AimerViewfinder.frameColor), dotColor: W.fromJSON(l.AimerViewfinder.dotColor) }, Brush: { fillColor: W.fromJSON(l.Brush.fillColor), strokeColor: W.fromJSON(l.Brush.strokeColor), strokeWidth: l.Brush.strokeWidth } };
}
var x = Ar({ DataCaptureView: { focusGesture: "null", zoomGesture: "null", logoAnchor: "bottomRight", logoStyle: "extended", logoOffset: JSON.stringify({ x: { value: 0, unit: "fraction" }, y: { value: 0, unit: "fraction" } }), pointOfInterest: JSON.stringify({ x: { value: 0.5, unit: "fraction" }, y: { value: 0.5, unit: "fraction" } }), scanAreaMargins: JSON.stringify({ left: { value: 0, unit: "fraction" }, right: { value: 0, unit: "fraction" }, top: { value: 0, unit: "fraction" }, bottom: { value: 0, unit: "fraction" } }), cameraRecoveryText: "Tap/click to resume scanning" }, Camera: { Settings: { preferredResolution: "auto", zoomFactor: 1, focusGestureStrategy: "manualUntilCapture", zoomGestureZoomFactor: 2 }, defaultPosition: "worldFacing", availablePositions: ["worldFacing", "userFacing"] }, SingleImageUploader: { Settings: { iconElement: atob(mi), informationElement: "<p>Analyze an image from your device.</p>", buttonElement: "<div>Choose an Image</div>", containerStyle: { backgroundColor: "#FFFFFF" }, iconStyle: { fill: "#121619" }, informationStyle: { color: "#121619", marginBottom: "2em" }, buttonStyle: { color: "#FFFFFF", backgroundColor: "#121619", fontWeight: "bold", padding: "1.25em", width: "12em", textAlign: "center", textTransform: "uppercase" } } }, LaserlineViewfinder: { defaultStyle: "animated", styles: { animated: { width: JSON.stringify({ unit: "fraction", value: 0.8 }), enabledColor: "#FFFFFFFF", disabledColor: "#00000000", style: "animated" } } }, AimerViewfinder: { frameColor: "#FFFFFFFF", dotColor: "#FFFFFFCC" }, RectangularViewfinder: { defaultStyle: "rounded", styles: { rounded: { size: JSON.stringify({ aspect: 1, shorterDimension: { unit: "fraction", value: 0.75 } }), color: "#FFFFFFFF", style: "rounded", lineStyle: "light", dimming: 0, animation: JSON.stringify({ looping: true }) }, square: { size: JSON.stringify({ aspect: 1, shorterDimension: { unit: "fraction", value: 0.75 } }), color: "#FFFFFFFF", style: "square", lineStyle: "light", dimming: 0, animation: JSON.stringify({ looping: true }) } } }, Brush: { fillColor: "#00000000", strokeColor: "#00000000", strokeWidth: 0 } });
var ee = { CONTAINER_CLASS_NAME: "scandit-container", PAINTBOARD_CLASS_NAME: "scandit-paintboard", CONTROLS_CLASS_NAME: "scandit-controls", CONTROL_WIDGET_CLASS_NAME: "scandit-control-widget", MIRRORED_CLASS_NAME: "scandit-mirrored", CAMERA_RECOVERY_CLASS_NAME: "scandit-camera-recovery", ERROR_CLASS_NAME: "scandit-error", SINGLE_IMAGE_UPLOADER_CONTAINER_CLASS_NAME: "scandit-single-image-uploader-container" };
var Oe = ((o) => (o.On = "on", o.Off = "off", o.Starting = "starting", o.Stopping = "stopping", o))(Oe || {});
var Ot = ((t) => (t.On = "on", t.Off = "off", t))(Ot || {});
var Nt = ((t) => (t.WorldFacing = "worldFacing", t.UserFacing = "userFacing", t))(Nt || {});
var vi = ((o) => (o.Auto = "auto", o.HD = "hd", o.FullHD = "fullHd", o.UHD4K = "uhd4k", o))(vi || {});
var yr = ((o) => (o.None = "none", o.Manual = "manual", o.ManualUntilCapture = "manualUntilCapture", o.AutoOnLocation = "autoOnLocation", o))(yr || {});
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
  function l() {
    let t = "6.15.2";
    if (t == null)
      throw new J({ name: "Invalid library version", message: "Library version is not defined or empty." });
    return t;
  }
  e.sdkVersion = l;
})(Xe || (Xe = {}));
var K = [];
var Ai = function() {
  return K.some(function(l) {
    return l.activeTargets.length > 0;
  });
};
var yi = function() {
  return K.some(function(l) {
    return l.skippedTargets.length > 0;
  });
};
var wi = "ResizeObserver loop completed with undelivered notifications.";
var Mi = function() {
  var l;
  typeof ErrorEvent == "function" ? l = new ErrorEvent("error", { message: wi }) : (l = document.createEvent("Event"), l.initEvent("error", false, false), l.message = wi), window.dispatchEvent(l);
};
var he;
(function(l) {
  l.BORDER_BOX = "border-box", l.CONTENT_BOX = "content-box", l.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
})(he || (he = {}));
var te = function(l) {
  return Object.freeze(l);
};
var Rt = function() {
  function l(e, t) {
    this.inlineSize = e, this.blockSize = t, te(this);
  }
  return l;
}();
var Pt = function() {
  function l(e, t, a, o) {
    return this.x = e, this.y = t, this.width = a, this.height = o, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, te(this);
  }
  return l.prototype.toJSON = function() {
    var e = this, t = e.x, a = e.y, o = e.top, d = e.right, f2 = e.bottom, p = e.left, v2 = e.width, S2 = e.height;
    return { x: t, y: a, top: o, right: d, bottom: f2, left: p, width: v2, height: S2 };
  }, l.fromRect = function(e) {
    return new l(e.x, e.y, e.width, e.height);
  }, l;
}();
var Ve = function(l) {
  return l instanceof SVGElement && "getBBox" in l;
};
var Ke = function(l) {
  if (Ve(l)) {
    var e = l.getBBox(), t = e.width, a = e.height;
    return !t && !a;
  }
  var o = l, d = o.offsetWidth, f2 = o.offsetHeight;
  return !(d || f2 || l.getClientRects().length);
};
var zt = function(l) {
  var e, t;
  if (l instanceof Element)
    return true;
  var a = (t = (e = l) === null || e === void 0 ? void 0 : e.ownerDocument) === null || t === void 0 ? void 0 : t.defaultView;
  return !!(a && l instanceof a.Element);
};
var Li = function(l) {
  switch (l.tagName) {
    case "INPUT":
      if (l.type !== "image")
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
var wr = /^tb|vertical/;
var Mr = /msie|trident/i.test(ge.navigator && ge.navigator.userAgent);
var ae = function(l) {
  return parseFloat(l || "0");
};
var ye = function(l, e, t) {
  return l === void 0 && (l = 0), e === void 0 && (e = 0), t === void 0 && (t = false), new Rt((t ? e : l) || 0, (t ? l : e) || 0);
};
var _i = te({ devicePixelContentBoxSize: ye(), borderBoxSize: ye(), contentBoxSize: ye(), contentRect: new Pt(0, 0, 0, 0) });
var jt = function(l, e) {
  if (e === void 0 && (e = false), et.has(l) && !e)
    return et.get(l);
  if (Ke(l))
    return et.set(l, _i), _i;
  var t = getComputedStyle(l), a = Ve(l) && l.ownerSVGElement && l.getBBox(), o = !Mr && t.boxSizing === "border-box", d = wr.test(t.writingMode || ""), f2 = !a && xi.test(t.overflowY || ""), p = !a && xi.test(t.overflowX || ""), v2 = a ? 0 : ae(t.paddingTop), S2 = a ? 0 : ae(t.paddingRight), i = a ? 0 : ae(t.paddingBottom), r2 = a ? 0 : ae(t.paddingLeft), n = a ? 0 : ae(t.borderTopWidth), s = a ? 0 : ae(t.borderRightWidth), u2 = a ? 0 : ae(t.borderBottomWidth), h2 = a ? 0 : ae(t.borderLeftWidth), m = r2 + S2, b = v2 + i, C = h2 + s, _ = n + u2, j2 = p ? l.offsetHeight - _ - l.clientHeight : 0, B2 = f2 ? l.offsetWidth - C - l.clientWidth : 0, D2 = o ? m + C : 0, y2 = o ? b + _ : 0, A = a ? a.width : ae(t.width) - D2 - B2, M2 = a ? a.height : ae(t.height) - y2 - j2, w2 = A + m + B2 + C, I2 = M2 + b + j2 + _, E2 = te({ devicePixelContentBoxSize: ye(Math.round(A * devicePixelRatio), Math.round(M2 * devicePixelRatio), d), borderBoxSize: ye(w2, I2, d), contentBoxSize: ye(A, M2, d), contentRect: new Pt(r2, v2, A, M2) });
  return et.set(l, E2), E2;
};
var tt = function(l, e, t) {
  var a = jt(l, t), o = a.borderBoxSize, d = a.contentBoxSize, f2 = a.devicePixelContentBoxSize;
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
  function l(e) {
    var t = jt(e);
    this.target = e, this.contentRect = t.contentRect, this.borderBoxSize = te([t.borderBoxSize]), this.contentBoxSize = te([t.contentBoxSize]), this.devicePixelContentBoxSize = te([t.devicePixelContentBoxSize]);
  }
  return l;
}();
var it = function(l) {
  if (Ke(l))
    return 1 / 0;
  for (var e = 0, t = l.parentNode; t; )
    e += 1, t = t.parentNode;
  return e;
};
var Di = function() {
  var l = 1 / 0, e = [];
  K.forEach(function(f2) {
    if (f2.activeTargets.length !== 0) {
      var p = [];
      f2.activeTargets.forEach(function(S2) {
        var i = new Ft(S2.target), r2 = it(S2.target);
        p.push(i), S2.lastReportedSize = tt(S2.target, S2.observedBox), r2 < l && (l = r2);
      }), e.push(function() {
        f2.callback.call(f2.observer, p, f2.observer);
      }), f2.activeTargets.splice(0, f2.activeTargets.length);
    }
  });
  for (var t = 0, a = e; t < a.length; t++) {
    var o = a[t];
    o();
  }
  return l;
};
var Wt = function(l) {
  K.forEach(function(t) {
    t.activeTargets.splice(0, t.activeTargets.length), t.skippedTargets.splice(0, t.skippedTargets.length), t.observationTargets.forEach(function(o) {
      o.isActive() && (it(o.target) > l ? t.activeTargets.push(o) : t.skippedTargets.push(o));
    });
  });
};
var Ii = function() {
  var l = 0;
  for (Wt(l); Ai(); )
    l = Di(), Wt(l);
  return yi() && Mi(), l > 0;
};
var Ut;
var Ei = [];
var Lr = function() {
  return Ei.splice(0).forEach(function(l) {
    return l();
  });
};
var Oi = function(l) {
  if (!Ut) {
    var e = 0, t = document.createTextNode(""), a = { characterData: true };
    new MutationObserver(function() {
      return Lr();
    }).observe(t, a), Ut = function() {
      t.textContent = "" + (e ? e-- : e++);
    };
  }
  Ei.push(l), Ut();
};
var Ni = function(l) {
  Oi(function() {
    requestAnimationFrame(l);
  });
};
var rt = 0;
var xr = function() {
  return !!rt;
};
var _r = 250;
var Dr = { attributes: true, characterData: true, childList: true, subtree: true };
var Vi = ["resize", "load", "transitionend", "animationend", "animationstart", "animationiteration", "keyup", "keydown", "mouseup", "mousedown", "mouseover", "mouseout", "blur", "focus"];
var Ti = function(l) {
  return l === void 0 && (l = 0), Date.now() + l;
};
var Jt = false;
var Ir = function() {
  function l() {
    var e = this;
    this.stopped = true, this.listener = function() {
      return e.schedule();
    };
  }
  return l.prototype.run = function(e) {
    var t = this;
    if (e === void 0 && (e = _r), !Jt) {
      Jt = true;
      var a = Ti(e);
      Ni(function() {
        var o = false;
        try {
          o = Ii();
        } finally {
          if (Jt = false, e = a - Ti(), !xr())
            return;
          o ? t.run(1e3) : e > 0 ? t.run(e) : t.start();
        }
      });
    }
  }, l.prototype.schedule = function() {
    this.stop(), this.run();
  }, l.prototype.observe = function() {
    var e = this, t = function() {
      return e.observer && e.observer.observe(document.body, Dr);
    };
    document.body ? t() : ge.addEventListener("DOMContentLoaded", t);
  }, l.prototype.start = function() {
    var e = this;
    this.stopped && (this.stopped = false, this.observer = new MutationObserver(this.listener), this.observe(), Vi.forEach(function(t) {
      return ge.addEventListener(t, e.listener, true);
    }));
  }, l.prototype.stop = function() {
    var e = this;
    this.stopped || (this.observer && this.observer.disconnect(), Vi.forEach(function(t) {
      return ge.removeEventListener(t, e.listener, true);
    }), this.stopped = true);
  }, l;
}();
var at = new Ir();
var Bt = function(l) {
  !rt && l > 0 && at.start(), rt += l, !rt && at.stop();
};
var Er = function(l) {
  return !Ve(l) && !Li(l) && getComputedStyle(l).display === "inline";
};
var ki = function() {
  function l(e, t) {
    this.target = e, this.observedBox = t || he.CONTENT_BOX, this.lastReportedSize = { inlineSize: 0, blockSize: 0 };
  }
  return l.prototype.isActive = function() {
    var e = tt(this.target, this.observedBox, true);
    return Er(this.target) && (this.lastReportedSize = e), this.lastReportedSize.inlineSize !== e.inlineSize || this.lastReportedSize.blockSize !== e.blockSize;
  }, l;
}();
var Ri = function() {
  function l(e, t) {
    this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = e, this.callback = t;
  }
  return l;
}();
var nt = /* @__PURE__ */ new WeakMap();
var Pi = function(l, e) {
  for (var t = 0; t < l.length; t += 1)
    if (l[t].target === e)
      return t;
  return -1;
};
var Te = function() {
  function l() {
  }
  return l.connect = function(e, t) {
    var a = new Ri(e, t);
    nt.set(e, a);
  }, l.observe = function(e, t, a) {
    var o = nt.get(e), d = o.observationTargets.length === 0;
    Pi(o.observationTargets, t) < 0 && (d && K.push(o), o.observationTargets.push(new ki(t, a && a.box)), Bt(1), at.schedule());
  }, l.unobserve = function(e, t) {
    var a = nt.get(e), o = Pi(a.observationTargets, t), d = a.observationTargets.length === 1;
    o >= 0 && (d && K.splice(K.indexOf(a), 1), a.observationTargets.splice(o, 1), Bt(-1));
  }, l.disconnect = function(e) {
    var t = this, a = nt.get(e);
    a.observationTargets.slice().forEach(function(o) {
      return t.unobserve(e, o.target);
    }), a.activeTargets.splice(0, a.activeTargets.length);
  }, l;
}();
var Ht = function() {
  function l(e) {
    if (arguments.length === 0)
      throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
    if (typeof e != "function")
      throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
    Te.connect(this, e);
  }
  return l.prototype.observe = function(e, t) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!zt(e))
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
    Te.observe(this, e, t);
  }, l.prototype.unobserve = function(e) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!zt(e))
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
    Te.unobserve(this, e);
  }, l.prototype.disconnect = function() {
    Te.disconnect(this);
  }, l.toString = function() {
    return "function ResizeObserver () { [polyfill code] }";
  }, l;
}();
function ot(l) {
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
var Or = ((S2) => (S2.TopLeft = "topLeft", S2.TopCenter = "topCenter", S2.TopRight = "topRight", S2.CenterLeft = "centerLeft", S2.Center = "center", S2.CenterRight = "centerRight", S2.BottomLeft = "bottomLeft", S2.BottomCenter = "bottomCenter", S2.BottomRight = "bottomRight", S2))(Or || {});
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
    var i, r2, n, s, u2, h2, m;
    if (this.singleImageUploaderPaintboardElement == null)
      return;
    this.singleImageUploaderPaintboardElement.textContent = "";
    let t = document.createElement("div");
    t.className = $.SINGLE_IMAGE_UPLOADER_CONTAINER_CLASS_NAME, Object.assign(t.style, x.SingleImageUploader.Settings.containerStyle, e.containerStyle), this.singleImageUploaderPaintboardElement.append(t);
    let a = (i = e.iconElement) != null ? i : x.SingleImageUploader.Settings.iconElement;
    Object.assign(a.style, x.SingleImageUploader.Settings.iconStyle, e.iconStyle), a.style.maxWidth = "100px", a.style.maxHeight = "100px", t.append(a);
    let o = (r2 = e.informationElement) != null ? r2 : x.SingleImageUploader.Settings.informationElement;
    Object.assign(o.style, x.SingleImageUploader.Settings.informationStyle, e.informationStyle), t.append(o);
    let d = document.createElement("label"), f2 = document.createElement("input");
    f2.type = "file", f2.accept = "image/*", f2.addEventListener("change", ((n = this._context) == null ? void 0 : n.frameSource).onUploadedFile.bind((s = this._context) == null ? void 0 : s.frameSource));
    let p = (b) => {
      var C, _;
      ((_ = (C = this._context) == null ? void 0 : C.frameSource) == null ? void 0 : _.getCurrentState()) !== "starting" && b.preventDefault();
    };
    f2.addEventListener("click", p), f2.addEventListener("keydown", p), d.append(f2);
    let v2 = (u2 = e.buttonElement) != null ? u2 : x.SingleImageUploader.Settings.buttonElement;
    Object.assign(v2.style, x.SingleImageUploader.Settings.buttonStyle, e.buttonStyle), v2.style.opacity = ((m = (h2 = this._context) == null ? void 0 : h2.frameSource) == null ? void 0 : m.getCurrentState()) === "starting" ? "1" : "0.3", d.append(v2), t.append(d);
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
var je = class {
  constructor(e) {
    c(this, "type");
    this.type = e;
  }
  static get defaultVibration() {
    return new je("default");
  }
  toJSONObject() {
    return { type: this.type };
  }
  vibrate() {
    var t, a, o;
    ((o = (a = (t = navigator.vibrate) != null ? t : navigator.webkitVibrate) != null ? a : navigator.mozVibrate) != null ? o : navigator.msVibrate).call(navigator, 300);
  }
};
var Fe = class {
  constructor(e) {
    c(this, "audio");
    c(this, "resource", null);
    this.resource = e, this.resource != null && (this.audio = new Fi.Howl({ src: this.resource }));
  }
  static get defaultSound() {
    return new Fe(di);
  }
  toJSONObject() {
    return this.resource !== null ? { resource: this.resource } : {};
  }
  play() {
    this.audio != null && this.audio.play();
  }
};
var ut = class {
  constructor(e, t) {
    c(this, "_vibration", null);
    c(this, "_sound", null);
    this._vibration = e, this._sound = t;
  }
  static get defaultFeedback() {
    return new ut(je.defaultVibration, Fe.defaultSound);
  }
  get vibration() {
    return this._vibration;
  }
  get sound() {
    return this._sound;
  }
  emit() {
    this.sound && this.sound.play(), this.vibration && this.vibration.vibrate();
  }
  toJSONObject() {
    let e = {};
    return this.sound !== null && (e.sound = this.sound.toJSONObject()), this.vibration !== null && (e.vibration = this.vibration.toJSONObject()), e;
  }
};
async function Nr(l, e) {
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
    }, l, e);
  }));
}
function Do(l, e) {
  let t = { width: l.width, height: l.height, isFrameSourceMirrored: l.isFrameSourceMirrored, getData: async () => (await e.requestFrameData(l.frameId)).data };
  return t.toBlob = Nr.bind(t), t;
}
var Oo = { type: "none" };
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
var es = { type: "none" };
var qi = class {
  constructor(e, t) {
    c(this, "type", "rectangular");
    c(this, "_style");
    c(this, "_lineStyle");
    c(this, "_dimming");
    c(this, "_animation");
    c(this, "_sizeWithUnitAndAspect");
    c(this, "color");
    let a = e != null ? e : x.RectangularViewfinder.defaultStyle;
    this._style = x.RectangularViewfinder.styles[a].style, this._lineStyle = x.RectangularViewfinder.styles[a].lineStyle, this._dimming = x.RectangularViewfinder.styles[a].dimming, this._animation = x.RectangularViewfinder.styles[a].animation, this.color = x.RectangularViewfinder.styles[a].color, this._sizeWithUnitAndAspect = x.RectangularViewfinder.styles[a].size, t !== void 0 && (this._lineStyle = t);
  }
  get sizeWithUnitAndAspect() {
    return this._sizeWithUnitAndAspect;
  }
  get style() {
    return this._style;
  }
  get lineStyle() {
    return this._lineStyle;
  }
  get dimming() {
    return this._dimming;
  }
  set dimming(e) {
    this._dimming = e;
  }
  get animation() {
    return this._animation;
  }
  set animation(e) {
    this._animation = e;
  }
  setSize(e) {
    this._sizeWithUnitAndAspect = q.sizeWithWidthAndHeight(e);
  }
  setWidthAndAspectRatio(e, t) {
    this._sizeWithUnitAndAspect = q.sizeWithWidthAndAspectRatio(e, t);
  }
  setHeightAndAspectRatio(e, t) {
    this._sizeWithUnitAndAspect = q.sizeWithHeightAndAspectRatio(e, t);
  }
  setShorterDimensionAndAspectRatio(e, t) {
    this._sizeWithUnitAndAspect = q.sizeWithShorterDimensionAndAspectRatio(new R(e, "fraction"), t);
  }
  toJSONObject() {
    return { type: this.type, color: this.color.toJSON(), style: this.style, lineStyle: this.lineStyle, dimming: this.dimming, animation: this.animation ? this.animation.toJSONObject() : null, size: this.sizeWithUnitAndAspect.toJSONObject() };
  }
};
function $i(l, e, t, a) {
  async function o(S2) {
    try {
      let r2 = await (S2 != null ? S2 : await v2(true)).arrayBuffer(), n = await self.WebAssembly.instantiate(r2, l);
      a(n.instance, n.module);
    } catch (i) {
      g.log(g.Level.Error, i), g.log(g.Level.Error, `Couldn't instantiate Scandit SDK DataCapture library at ${e}, did you configure the path for it correctly?`);
    }
  }
  async function d() {
    let S2 = await v2(false);
    try {
      let i = await self.WebAssembly.instantiateStreaming(S2, l);
      a(i.instance, i.module);
    } catch (i) {
      return g.log(g.Level.Warn, i), g.log(g.Level.Warn, "WebAssembly streaming compile failed. Falling back to ArrayBuffer instantiation (this will make things slower)"), o(S2.bodyUsed ? void 0 : S2);
    }
  }
  function f2(S2) {
    return [...new Uint8Array(S2)].map((i) => {
      let r2 = i.toString(16);
      return r2.length === 1 ? `0${r2}` : r2;
    }).join("");
  }
  function p(S2) {
    typeof crypto.subtle.digest == "function" ? crypto.subtle.digest("SHA-256", S2).then((i) => {
      let r2 = f2(i);
      t || g.log(g.Level.Warn, "The library hash is not defined or empty, cannot correctly verify integrity."), r2 !== t && g.log(g.Level.Warn, `The Scandit Data Capture library WASM file found at ${e} seems invalid: expected file hash doesn't match (received: ${r2}, expected: ${t}). Please ensure the correct Scandit Data Capture file (with correct version) is retrieved.`);
    }).catch(() => {
    }) : g.log(g.Level.Warn, `Insecure context (see https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts): The hash of the Scandit Data Capture library WASM file found at ${e} could not be verified`);
  }
  async function v2(S2) {
    return new Promise((i, r2) => {
      fetch(e).then((n) => {
        n.ok ? (n.clone().arrayBuffer().then((s) => {
          S2 && i(n), p(s);
        }).catch((s) => {
          S2 && r2(s);
        }), S2 || i(n)) : r2(new Error("HTTP status code is not ok"));
      }).catch((n) => {
        r2(n);
      });
    });
  }
  typeof self.WebAssembly.instantiateStreaming == "function" ? d() : o();
}
async function Xi(l) {
  let e, { preloading: t } = l, a = Promise.resolve(), o = false, d = false;
  async function f2() {
    let S2 = "FILE_DATA", i, r2, n;
    function s() {
      r2.result.close(), n.result.close(), i(0);
    }
    function u2() {
      try {
        let h2 = [], m = r2.result.transaction(S2, "readonly");
        m.onerror = s;
        let b = m.objectStore(S2).openCursor();
        b.onsuccess = () => {
          let C = b.result;
          if (C == null)
            try {
              let _ = 0, j2 = n.result.transaction(S2, "readwrite"), B2 = j2.objectStore(S2);
              j2.onerror = s, j2.oncomplete = () => {
                r2.result.close(), n.result.close(), i(_);
              };
              for (let D2 of h2) {
                let y2 = B2.count(D2.primaryKey);
                y2.onsuccess = () => {
                  y2.result === 0 && (++_, B2.add(D2.value, D2.primaryKey));
                };
              }
            } catch (_) {
              s.call({ error: _ });
            }
          else
            h2.push({ value: C.value, primaryKey: C.primaryKey.toString().replace(`${l.writableDataPathPreload}/`, `${l.writableDataPathStandard}/`) }), C.continue();
        }, b.onerror = s;
      } catch (h2) {
        s.call({ error: h2 });
      }
    }
    return new Promise((h2) => {
      i = h2, r2 = indexedDB.open(l.writableDataPathPreload), r2.onupgradeneeded = () => {
        try {
          r2.result.createObjectStore(S2);
        } catch (m) {
        }
      }, r2.onsuccess = () => {
        if (!Array.from(r2.result.objectStoreNames).includes(S2)) {
          h2(0);
          return;
        }
        n = indexedDB.open(l.writableDataPathStandard), n.onupgradeneeded = () => {
          try {
            n.result.createObjectStore(S2);
          } catch (m) {
          }
        }, n.onsuccess = () => {
          u2();
        }, n.onblocked = n.onerror = s;
      }, r2.onblocked = r2.onerror = s;
    });
  }
  async function p(S2, i) {
    if (e != null)
      return o = true, new Promise((r2, n) => {
        (!t && S2 ? f2() : Promise.resolve(0)).then((s) => {
          if (!t && S2 && !i && s === 0) {
            o = false, r2();
            return;
          }
          e(S2, (u2) => {
            if (o = false, u2 != null) {
              n(u2);
              return;
            }
            r2();
          });
        }).catch(n);
      });
  }
  async function v2(S2, i = false, r2 = false) {
    return (!d || r2) && (o ? (d = true, a = a.then(async () => (d = false, p(S2, i)))) : a = p(S2, i)), a;
  }
  e = FS.syncfs, FS.syncfs = (S2, i) => {
    let r2 = i;
    i = (n) => {
      r2(n);
    }, v2(S2).then(i).catch(i);
  };
  try {
    FS.mkdir(l.writableDataPath);
  } catch (S2) {
    if (S2.code !== "EEXIST")
      return e = void 0, Promise.reject(S2);
  }
  return FS.mount(IDBFS, {}, l.writableDataPath), v2(true, true);
}
async function Yt(l, e, t, a) {
  return new Promise((o, d) => {
    l().then(o).catch((f2) => {
      let p = e * 2;
      if (p > t) {
        d(f2);
        return;
      }
      a(f2), setTimeout(() => {
        Yt(l, p, t, a).then(o).catch(d);
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
    let S2, i, r2 = new Promise((D2, y2) => {
      S2 = D2, i = y2;
    }), n = () => {
      d && o && (s.apply(this), this.moduleHandler.get().callMain(), S2());
    };
    function s() {
      let D2 = this.moduleHandler.get(), y2 = D2.DataDecoding.extend("DataDecoding", { decode(M2, w2) {
        try {
          let I2 = JSON.parse(w2), E2 = [];
          for (let L of I2) {
            let z = new TextDecoder(L.ianaName, { fatal: true });
            E2.push(z.decode(M2.slice(L.startIndex, L.endIndex)));
          }
          return E2.join("");
        } catch (I2) {
          return "";
        }
      } }), A = new y2();
      D2.setDataDecoding(A);
    }
    let u2 = Xe.sdkVersion();
    if (u2 === "")
      throw new J({ name: "Invalid library version", message: "Library version is not defined or empty, cannot generate proper path to library files." });
    let h2 = false, m = ui(u2, e, this.getWasmCoreFileName(), h2), { jsURI: b } = m, { wasmURI: C } = m;
    this.moduleHandler.set({ canvas: (B2 = this.workerFunctions.getOffscreenCanvas()) != null ? B2 : { getContext: () => null }, instantiateWasm: (D2, y2) => ($i(D2, C, this.getWasmCoreExpectedHash(), y2), {}), dynamicLibraries: this.getWasmDynamicLibraries(C), noInitialRun: true, preRun: [async () => {
      try {
        await Xi({ writableDataPathPreload: f2, writableDataPathStandard: p, writableDataPath: this.writableDataPath, preloading: a });
      } catch (D2) {
        g.log(g.Level.Debug, "No IndexedDB support, some data will not be persisted:", D2);
      }
      d = true, n();
    }], onRuntimeInitialized: () => {
      o = true, n();
    } });
    async function _(D2) {
      var A;
      async function y2() {
        return importScripts(D2);
      }
      try {
        await Yt(y2, 250, 4e3, (w2) => {
          g.log(g.Level.Warn, w2), g.log(g.Level.Warn, `Couldn't retrieve Scandit Data Capture library at ${D2}, retrying...`);
        });
        let M2 = (A = self.SDC_WASM_JS_VERSION) != null ? A : "undefined";
        return M2 !== u2 && g.log(g.Level.Warn, `The Scandit Data Capture library JS file found at ${D2} seems invalid: expected version doesn't match (received: ${M2}, expected: ${u2}). Please ensure the correct Scandit Data Capture file (with correct version) is retrieved.`), true;
      } catch (M2) {
        return g.log(g.Level.Error, M2), false;
      }
    }
    return await _(b) || i(`Couldn't retrieve Scandit Data Capture library at ${b}, did you configure the path for it correctly?`), r2;
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
var Fr = "js/worker.js";
var Ki = Fr;
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
var ms = new ht(self, { get: () => self.Module, set: (l) => {
  self.Module = l;
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
async function ys(l) {
  var a, o;
  if (ft !== "unconfigured" && gt != null)
    return gt;
  let e = Z(Q({}, l), { libraryLocation: ci((a = l.libraryLocation) != null ? a : "/"), logLevel: (o = l.logLevel) != null ? o : g.Level.Debug });
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
    throw Wr(), d;
  }), gt;
}
function Wr() {
  ft = "unconfigured";
}
var export_UAParser = mr.default;

// ../../scandit-web-datacapture-barcode/build/js/index.js
var j = Object.create;
var W2 = Object.defineProperty;
var e1 = Object.defineProperties;
var t1 = Object.getOwnPropertyDescriptor;
var a1 = Object.getOwnPropertyDescriptors;
var r1 = Object.getOwnPropertyNames;
var G2 = Object.getOwnPropertySymbols;
var i1 = Object.getPrototypeOf;
var q2 = Object.prototype.hasOwnProperty;
var o1 = Object.prototype.propertyIsEnumerable;
var M = (i, e, t) => e in i ? W2(i, e, { enumerable: true, configurable: true, writable: true, value: t }) : i[e] = t;
var J2 = (i, e) => {
  for (var t in e || (e = {}))
    q2.call(e, t) && M(i, t, e[t]);
  if (G2)
    for (var t of G2(e))
      o1.call(e, t) && M(i, t, e[t]);
  return i;
};
var E = (i, e) => e1(i, a1(e));
var s1 = (i, e) => () => (e || i((e = { exports: {} }).exports, e), e.exports);
var n1 = (i, e, t, a) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let o of r1(e))
      !q2.call(i, o) && o !== t && W2(i, o, { get: () => e[o], enumerable: !(a = t1(e, o)) || a.enumerable });
  return i;
};
var l1 = (i, e, t) => (t = i != null ? j(i1(i)) : {}, n1(e || !i || !i.__esModule ? W2(t, "default", { value: i, enumerable: true }) : t, i));
var r = (i, e, t) => (M(i, typeof e != "symbol" ? e + "" : e, t), t);
var V = s1((E1, U2) => {
  "use strict";
  var m1 = Object.prototype.hasOwnProperty, p = "~";
  function A() {
  }
  Object.create && (A.prototype = /* @__PURE__ */ Object.create(null), new A().__proto__ || (p = false));
  function p1(i, e, t) {
    this.fn = i, this.context = e, this.once = t || false;
  }
  function K2(i, e, t, a, o) {
    if (typeof t != "function")
      throw new TypeError("The listener must be a function");
    var l = new p1(t, a || i, o), n = p ? p + e : e;
    return i._events[n] ? i._events[n].fn ? i._events[n] = [i._events[n], l] : i._events[n].push(l) : (i._events[n] = l, i._eventsCount++), i;
  }
  function T(i, e) {
    --i._eventsCount === 0 ? i._events = new A() : delete i._events[e];
  }
  function m() {
    this._events = new A(), this._eventsCount = 0;
  }
  m.prototype.eventNames = function() {
    var e = [], t, a;
    if (this._eventsCount === 0)
      return e;
    for (a in t = this._events)
      m1.call(t, a) && e.push(p ? a.slice(1) : a);
    return Object.getOwnPropertySymbols ? e.concat(Object.getOwnPropertySymbols(t)) : e;
  };
  m.prototype.listeners = function(e) {
    var t = p ? p + e : e, a = this._events[t];
    if (!a)
      return [];
    if (a.fn)
      return [a.fn];
    for (var o = 0, l = a.length, n = new Array(l); o < l; o++)
      n[o] = a[o].fn;
    return n;
  };
  m.prototype.listenerCount = function(e) {
    var t = p ? p + e : e, a = this._events[t];
    return a ? a.fn ? 1 : a.length : 0;
  };
  m.prototype.emit = function(e, t, a, o, l, n) {
    var b = p ? p + e : e;
    if (!this._events[b])
      return false;
    var s = this._events[b], g2 = arguments.length, C, c2;
    if (s.fn) {
      switch (s.once && this.removeListener(e, s.fn, void 0, true), g2) {
        case 1:
          return s.fn.call(s.context), true;
        case 2:
          return s.fn.call(s.context, t), true;
        case 3:
          return s.fn.call(s.context, t, a), true;
        case 4:
          return s.fn.call(s.context, t, a, o), true;
        case 5:
          return s.fn.call(s.context, t, a, o, l), true;
        case 6:
          return s.fn.call(s.context, t, a, o, l, n), true;
      }
      for (c2 = 1, C = new Array(g2 - 1); c2 < g2; c2++)
        C[c2 - 1] = arguments[c2];
      s.fn.apply(s.context, C);
    } else {
      var Y2 = s.length, R2;
      for (c2 = 0; c2 < Y2; c2++)
        switch (s[c2].once && this.removeListener(e, s[c2].fn, void 0, true), g2) {
          case 1:
            s[c2].fn.call(s[c2].context);
            break;
          case 2:
            s[c2].fn.call(s[c2].context, t);
            break;
          case 3:
            s[c2].fn.call(s[c2].context, t, a);
            break;
          case 4:
            s[c2].fn.call(s[c2].context, t, a, o);
            break;
          default:
            if (!C)
              for (R2 = 1, C = new Array(g2 - 1); R2 < g2; R2++)
                C[R2 - 1] = arguments[R2];
            s[c2].fn.apply(s[c2].context, C);
        }
    }
    return true;
  };
  m.prototype.on = function(e, t, a) {
    return K2(this, e, t, a, false);
  };
  m.prototype.once = function(e, t, a) {
    return K2(this, e, t, a, true);
  };
  m.prototype.removeListener = function(e, t, a, o) {
    var l = p ? p + e : e;
    if (!this._events[l])
      return this;
    if (!t)
      return T(this, l), this;
    var n = this._events[l];
    if (n.fn)
      n.fn === t && (!o || n.once) && (!a || n.context === a) && T(this, l);
    else {
      for (var b = 0, s = [], g2 = n.length; b < g2; b++)
        (n[b].fn !== t || o && !n[b].once || a && n[b].context !== a) && s.push(n[b]);
      s.length ? this._events[l] = s.length === 1 ? s[0] : s : T(this, l);
    }
    return this;
  };
  m.prototype.removeAllListeners = function(e) {
    var t;
    return e ? (t = p ? p + e : e, this._events[t] && T(this, t)) : (this._events = new A(), this._eventsCount = 0), this;
  };
  m.prototype.off = m.prototype.removeListener;
  m.prototype.addListener = m.prototype.on;
  m.prefixed = p;
  m.EventEmitter = m;
  typeof U2 < "u" && (U2.exports = m);
});
var Q2 = ((d) => (d.EAN13UPCA = "ean13Upca", d.UPCE = "upce", d.EAN8 = "ean8", d.Code39 = "code39", d.Code93 = "code93", d.Code128 = "code128", d.Code11 = "code11", d.Code25 = "code25", d.Codabar = "codabar", d.InterleavedTwoOfFive = "interleavedTwoOfFive", d.MSIPlessey = "msiPlessey", d.QR = "qr", d.DataMatrix = "dataMatrix", d.Aztec = "aztec", d.MaxiCode = "maxicode", d.DotCode = "dotcode", d.KIX = "kix", d.RM4SCC = "rm4scc", d.GS1Databar = "databar", d.GS1DatabarExpanded = "databarExpanded", d.GS1DatabarLimited = "databarLimited", d.PDF417 = "pdf417", d.MicroPDF417 = "microPdf417", d.MicroQR = "microQr", d.Code32 = "code32", d.Lapa4SC = "lapa4sc", d.IATATwoOfFive = "iata2of5", d.MatrixTwoOfFive = "matrix2of5", d.USPSIntelligentMail = "uspsIntelligentMail", d))(Q2 || {});
var d1 = ((a) => (a.A = "A", a.B = "B", a.C = "C", a))(d1 || {});
var v = class {
  constructor(e) {
    r(this, "_identifier");
    r(this, "_readableName");
    r(this, "_isAvailable");
    r(this, "_isColorInvertible");
    r(this, "_activeSymbolCountRange");
    r(this, "_defaultSymbolCountRange");
    r(this, "_supportedExtensions");
    if (!!e)
      return v.all[v.all.findIndex((t) => t.identifier === e)];
  }
  static get all() {
    return this.defaults().SymbologyDescriptions;
  }
  get identifier() {
    return this._identifier;
  }
  get symbology() {
    return this.identifier;
  }
  get readableName() {
    return this._readableName;
  }
  get isAvailable() {
    return this._isAvailable;
  }
  get isColorInvertible() {
    return this._isColorInvertible;
  }
  get activeSymbolCountRange() {
    return this._activeSymbolCountRange;
  }
  get defaultSymbolCountRange() {
    return this._defaultSymbolCountRange;
  }
  get supportedExtensions() {
    return [...this._supportedExtensions];
  }
  static fromJSON(e) {
    let t = new v();
    return t._identifier = e.identifier, t._readableName = e.readableName, t._isAvailable = e.isAvailable, t._isColorInvertible = e.isColorInvertible, t._activeSymbolCountRange = N.fromJSON(e.activeSymbolCountRange), t._defaultSymbolCountRange = N.fromJSON(e.defaultSymbolCountRange), t._supportedExtensions = new Set(e.supportedExtensions), t;
  }
  static forIdentifier(e) {
    return v.all.findIndex((a) => a.identifier === e) === -1 ? null : new v(e);
  }
};
var O2 = v;
r(O2, "defaults");
var B = class {
  constructor() {
    r(this, "_symbology");
    r(this, "extensions");
    r(this, "isEnabled");
    r(this, "isColorInvertedEnabled");
    r(this, "checksums");
    r(this, "activeSymbolCounts");
  }
  get symbology() {
    return this._symbology;
  }
  get enabledExtensions() {
    return [...this.extensions];
  }
  static fromJSON(e) {
    let t = new B();
    return t.extensions = new Set(e.extensions), t.isEnabled = e.enabled, t.isColorInvertedEnabled = e.colorInvertedEnabled, t.checksums = new Set(e.checksums), t.activeSymbolCounts = e.activeSymbolCounts, t;
  }
  setExtensionEnabled(e, t) {
    t ? this.extensions.add(e) : this.extensions.delete(e);
  }
  toJSONObject() {
    return { activeSymbolCounts: this.activeSymbolCounts, checksums: [...this.checksums], colorInvertedEnabled: this.isColorInvertedEnabled, enabled: this.isEnabled, extensions: [...this.extensions] };
  }
};
var c1 = ((s) => (s.Mod10 = "mod10", s.Mod11 = "mod11", s.Mod16 = "mod16", s.Mod43 = "mod43", s.Mod47 = "mod47", s.Mod103 = "mod103", s.Mod10AndMod11 = "mod1110", s.Mod10AndMod10 = "mod1010", s))(c1 || {});
var I = class {
  constructor() {
    r(this, "_ianaName");
    r(this, "_startIndex");
    r(this, "_endIndex");
  }
  get ianaName() {
    return this._ianaName;
  }
  get startIndex() {
    return this._startIndex;
  }
  get endIndex() {
    return this._endIndex;
  }
  static fromJSON(e) {
    let t = new I();
    return t._ianaName = e.ianaName, t._startIndex = e.startIndex, t._endIndex = e.endIndex, t;
  }
};
var u1 = ((n) => (n.None = "none", n.Unknown = "unknown", n.Linked = "linked", n.GS1TypeA = "gs1TypeA", n.GS1TypeB = "gs1TypeB", n.GS1TypeC = "gs1TypeC", n))(u1 || {});
var N = class {
  constructor() {
    r(this, "_minimum");
    r(this, "_maximum");
    r(this, "_step");
  }
  get minimum() {
    return this._minimum;
  }
  get maximum() {
    return this._maximum;
  }
  get step() {
    return this._step;
  }
  get isFixed() {
    return this.minimum === this.maximum || this.step <= 0;
  }
  static fromJSON(e) {
    let t = new N();
    return t._minimum = e.minimum, t._maximum = e.maximum, t._step = e.step, t;
  }
  toJSONObject() {
    return { maximum: this.maximum, minimum: this.minimum, step: this.step };
  }
};
var h = class {
  constructor() {
    r(this, "_symbology");
    r(this, "_data");
    r(this, "_rawData");
    r(this, "_compositeData");
    r(this, "_compositeRawData");
    r(this, "_addOnData");
    r(this, "_encodingRanges");
    r(this, "_location");
    r(this, "_isGS1DataCarrier");
    r(this, "_compositeFlag");
    r(this, "_isColorInverted");
    r(this, "_symbolCount");
    r(this, "_frameID");
  }
  get symbology() {
    return this._symbology;
  }
  get data() {
    return this._data;
  }
  get rawData() {
    return this._rawData;
  }
  get compositeData() {
    return this._compositeData;
  }
  get compositeRawData() {
    return this._compositeRawData;
  }
  get addOnData() {
    return this._addOnData;
  }
  get encodingRanges() {
    return this._encodingRanges;
  }
  get location() {
    return this._location;
  }
  get isGS1DataCarrier() {
    return this._isGS1DataCarrier;
  }
  get compositeFlag() {
    return this._compositeFlag;
  }
  get isColorInverted() {
    return this._isColorInverted;
  }
  get symbolCount() {
    return this._symbolCount;
  }
  get frameID() {
    return this._frameID;
  }
  static fromJSON(e) {
    var a;
    let t = new h();
    return t._symbology = e.symbology, t._data = e.data, t._rawData = e.rawData, t._compositeData = e.compositeData, t._compositeRawData = e.compositeRawData, t._addOnData = (a = e.addOnData) != null ? a : null, t._isGS1DataCarrier = e.isGS1DataCarrier, t._compositeFlag = e.compositeFlag, t._isColorInverted = e.isColorInverted, t._symbolCount = e.symbolCount, t._frameID = e.frameId, t._encodingRanges = e.encodingRanges.map(I.fromJSON), t._location = be.fromJSON(e.location), t;
  }
};
var k2 = class {
  constructor() {
    r(this, "_location");
    r(this, "_frameID");
  }
  get location() {
    return this._location;
  }
  get frameID() {
    return this._frameID;
  }
  static fromJSON(e) {
    let t = new k2();
    return t._location = be.fromJSON(e.location), t._frameID = e.frameId, t;
  }
};
var H = l1(V(), 1);
var b1 = URL.createObjectURL(new Blob([new Uint8Array([40, 40, 41, 61, 62, 123, 118, 97, 114, 32, 36, 61, 79, 98, 106, 101, 99, 116, 46, 100, 101, 102, 105, 110, 101, 80, 114, 111, 112, 101, 114, 116, 121, 59, 118, 97, 114, 32, 122, 61, 40, 101, 44, 116, 44, 114, 41, 61, 62, 116, 32, 105, 110, 32, 101, 63, 36, 40, 101, 44, 116, 44, 123, 101, 110, 117, 109, 101, 114, 97, 98, 108, 101, 58, 33, 48, 44, 99, 111, 110, 102, 105, 103, 117, 114, 97, 98, 108, 101, 58, 33, 48, 44, 119, 114, 105, 116, 97, 98, 108, 101, 58, 33, 48, 44, 118, 97, 108, 117, 101, 58, 114, 125, 41, 58, 101, 91, 116, 93, 61, 114, 59, 118, 97, 114, 32, 77, 61, 40, 101, 44, 116, 44, 114, 41, 61, 62, 40, 122, 40, 101, 44, 116, 121, 112, 101, 111, 102, 32, 116, 33, 61, 34, 115, 121, 109, 98, 111, 108, 34, 63, 116, 43, 34, 34, 58, 116, 44, 114, 41, 44, 114, 41, 59, 118, 97, 114, 32, 106, 61, 79, 98, 106, 101, 99, 116, 46, 100, 101, 102, 105, 110, 101, 80, 114, 111, 112, 101, 114, 116, 121, 59, 118, 97, 114, 32, 85, 61, 40, 101, 44, 116, 44, 114, 41, 61, 62, 116, 32, 105, 110, 32, 101, 63, 106, 40, 101, 44, 116, 44, 123, 101, 110, 117, 109, 101, 114, 97, 98, 108, 101, 58, 33, 48, 44, 99, 111, 110, 102, 105, 103, 117, 114, 97, 98, 108, 101, 58, 33, 48, 44, 119, 114, 105, 116, 97, 98, 108, 101, 58, 33, 48, 44, 118, 97, 108, 117, 101, 58, 114, 125, 41, 58, 101, 91, 116, 93, 61, 114, 59, 118, 97, 114, 32, 112, 61, 40, 101, 44, 116, 44, 114, 41, 61, 62, 40, 85, 40, 101, 44, 116, 121, 112, 101, 111, 102, 32, 116, 33, 61, 34, 115, 121, 109, 98, 111, 108, 34, 63, 116, 43, 34, 34, 58, 116, 44, 114, 41, 44, 114, 41, 44, 99, 59, 40, 101, 61, 62, 123, 108, 101, 116, 32, 116, 59, 40, 111, 61, 62, 40, 111, 46, 68, 101, 98, 117, 103, 61, 34, 100, 101, 98, 117, 103, 34, 44, 111, 46, 73, 110, 102, 111, 61, 34, 105, 110, 102, 111, 34, 44, 111, 46, 87, 97, 114, 110, 61, 34, 119, 97, 114, 110, 34, 44, 111, 46, 69, 114, 114, 111, 114, 61, 34, 101, 114, 114, 111, 114, 34, 44, 111, 46, 81, 117, 105, 101, 116, 61, 34, 113, 117, 105, 101, 116, 34, 41, 41, 40, 116, 61, 101, 46, 76, 101, 118, 101, 108, 124, 124, 40, 101, 46, 76, 101, 118, 101, 108, 61, 123, 125, 41, 41, 59, 108, 101, 116, 32, 114, 61, 110, 101, 119, 32, 77, 97, 112, 40, 91, 91, 34, 100, 101, 98, 117, 103, 34, 44, 49, 93, 44, 91, 34, 105, 110, 102, 111, 34, 44, 50, 93, 44, 91, 34, 119, 97, 114, 110, 34, 44, 51, 93, 44, 91, 34, 101, 114, 114, 111, 114, 34, 44, 52, 93, 44, 91, 34, 113, 117, 105, 101, 116, 34, 44, 53, 93, 93, 41, 44, 115, 61, 34, 100, 101, 98, 117, 103, 34, 59, 102, 117, 110, 99, 116, 105, 111, 110, 32, 97, 40, 111, 41, 123, 115, 61, 111, 125, 101, 46, 115, 101, 116, 76, 101, 118, 101, 108, 61, 97, 59, 102, 117, 110, 99, 116, 105, 111, 110, 32, 100, 40, 111, 44, 46, 46, 46, 104, 41, 123, 105, 102, 40, 33, 40, 114, 46, 103, 101, 116, 40, 115, 41, 62, 114, 46, 103, 101, 116, 40, 111, 41, 41, 41, 115, 119, 105, 116, 99, 104, 40, 111, 41, 123, 99, 97, 115, 101, 34, 100, 101, 98, 117, 103, 34, 58, 99, 111, 110, 115, 111, 108, 101, 46, 100, 101, 98, 117, 103, 40, 46, 46, 46, 104, 41, 59, 98, 114, 101, 97, 107, 59, 99, 97, 115, 101, 34, 105, 110, 102, 111, 34, 58, 99, 111, 110, 115, 111, 108, 101, 46, 108, 111, 103, 40, 46, 46, 46, 104, 41, 59, 98, 114, 101, 97, 107, 59, 99, 97, 115, 101, 34, 119, 97, 114, 110, 34, 58, 99, 111, 110, 115, 111, 108, 101, 46, 119, 97, 114, 110, 40, 46, 46, 46, 104, 41, 59, 98, 114, 101, 97, 107, 59, 99, 97, 115, 101, 34, 101, 114, 114, 111, 114, 34, 58, 99, 111, 110, 115, 111, 108, 101, 46, 101, 114, 114, 111, 114, 40, 46, 46, 46, 104, 41, 59, 98, 114, 101, 97, 107, 59, 100, 101, 102, 97, 117, 108, 116, 58, 98, 114, 101, 97, 107, 125, 125, 101, 46, 108, 111, 103, 61, 100, 125, 41, 40, 99, 124, 124, 40, 99, 61, 123, 125, 41, 41, 59, 102, 117, 110, 99, 116, 105, 111, 110, 32, 72, 40, 101, 44, 116, 44, 114, 44, 115, 41, 123, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 97, 40, 105, 41, 123, 116, 114, 121, 123, 108, 101, 116, 32, 108, 61, 97, 119, 97, 105, 116, 40, 105, 33, 61, 110, 117, 108, 108, 63, 105, 58, 97, 119, 97, 105, 116, 32, 119, 40, 33, 48, 41, 41, 46, 97, 114, 114, 97, 121, 66, 117, 102, 102, 101, 114, 40, 41, 44, 110, 61, 97, 119, 97, 105, 116, 32, 115, 101, 108, 102, 46, 87, 101, 98, 65, 115, 115, 101, 109, 98, 108, 121, 46, 105, 110, 115, 116, 97, 110, 116, 105, 97, 116, 101, 40, 108, 44, 101, 41, 59, 115, 40, 110, 46, 105, 110, 115, 116, 97, 110, 99, 101, 44, 110, 46, 109, 111, 100, 117, 108, 101, 41, 125, 99, 97, 116, 99, 104, 40, 108, 41, 123, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 69, 114, 114, 111, 114, 44, 108, 41, 44, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 69, 114, 114, 111, 114, 44, 96, 67, 111, 117, 108, 100, 110, 39, 116, 32, 105, 110, 115, 116, 97, 110, 116, 105, 97, 116, 101, 32, 83, 99, 97, 110, 100, 105, 116, 32, 83, 68, 75, 32, 68, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 32, 108, 105, 98, 114, 97, 114, 121, 32, 97, 116, 32, 36, 123, 116, 125, 44, 32, 100, 105, 100, 32, 121, 111, 117, 32, 99, 111, 110, 102, 105, 103, 117, 114, 101, 32, 116, 104, 101, 32, 112, 97, 116, 104, 32, 102, 111, 114, 32, 105, 116, 32, 99, 111, 114, 114, 101, 99, 116, 108, 121, 63, 96, 41, 125, 125, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 100, 40, 41, 123, 108, 101, 116, 32, 105, 61, 97, 119, 97, 105, 116, 32, 119, 40, 33, 49, 41, 59, 116, 114, 121, 123, 108, 101, 116, 32, 108, 61, 97, 119, 97, 105, 116, 32, 115, 101, 108, 102, 46, 87, 101, 98, 65, 115, 115, 101, 109, 98, 108, 121, 46, 105, 110, 115, 116, 97, 110, 116, 105, 97, 116, 101, 83, 116, 114, 101, 97, 109, 105, 110, 103, 40, 105, 44, 101, 41, 59, 115, 40, 108, 46, 105, 110, 115, 116, 97, 110, 99, 101, 44, 108, 46, 109, 111, 100, 117, 108, 101, 41, 125, 99, 97, 116, 99, 104, 40, 108, 41, 123, 114, 101, 116, 117, 114, 110, 32, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 87, 97, 114, 110, 44, 108, 41, 44, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 87, 97, 114, 110, 44, 34, 87, 101, 98, 65, 115, 115, 101, 109, 98, 108, 121, 32, 115, 116, 114, 101, 97, 109, 105, 110, 103, 32, 99, 111, 109, 112, 105, 108, 101, 32, 102, 97, 105, 108, 101, 100, 46, 32, 70, 97, 108, 108, 105, 110, 103, 32, 98, 97, 99, 107, 32, 116, 111, 32, 65, 114, 114, 97, 121, 66, 117, 102, 102, 101, 114, 32, 105, 110, 115, 116, 97, 110, 116, 105, 97, 116, 105, 111, 110, 32, 40, 116, 104, 105, 115, 32, 119, 105, 108, 108, 32, 109, 97, 107, 101, 32, 116, 104, 105, 110, 103, 115, 32, 115, 108, 111, 119, 101, 114, 41, 34, 41, 44, 97, 40, 105, 46, 98, 111, 100, 121, 85, 115, 101, 100, 63, 118, 111, 105, 100, 32, 48, 58, 105, 41, 125, 125, 102, 117, 110, 99, 116, 105, 111, 110, 32, 111, 40, 105, 41, 123, 114, 101, 116, 117, 114, 110, 91, 46, 46, 46, 110, 101, 119, 32, 85, 105, 110, 116, 56, 65, 114, 114, 97, 121, 40, 105, 41, 93, 46, 109, 97, 112, 40, 108, 61, 62, 123, 108, 101, 116, 32, 110, 61, 108, 46, 116, 111, 83, 116, 114, 105, 110, 103, 40, 49, 54, 41, 59, 114, 101, 116, 117, 114, 110, 32, 110, 46, 108, 101, 110, 103, 116, 104, 61, 61, 61, 49, 63, 96, 48, 36, 123, 110, 125, 96, 58, 110, 125, 41, 46, 106, 111, 105, 110, 40, 34, 34, 41, 125, 102, 117, 110, 99, 116, 105, 111, 110, 32, 104, 40, 105, 41, 123, 116, 121, 112, 101, 111, 102, 32, 99, 114, 121, 112, 116, 111, 46, 115, 117, 98, 116, 108, 101, 46, 100, 105, 103, 101, 115, 116, 61, 61, 34, 102, 117, 110, 99, 116, 105, 111, 110, 34, 63, 99, 114, 121, 112, 116, 111, 46, 115, 117, 98, 116, 108, 101, 46, 100, 105, 103, 101, 115, 116, 40, 34, 83, 72, 65, 45, 50, 53, 54, 34, 44, 105, 41, 46, 116, 104, 101, 110, 40, 108, 61, 62, 123, 108, 101, 116, 32, 110, 61, 111, 40, 108, 41, 59, 114, 124, 124, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 87, 97, 114, 110, 44, 34, 84, 104, 101, 32, 108, 105, 98, 114, 97, 114, 121, 32, 104, 97, 115, 104, 32, 105, 115, 32, 110, 111, 116, 32, 100, 101, 102, 105, 110, 101, 100, 32, 111, 114, 32, 101, 109, 112, 116, 121, 44, 32, 99, 97, 110, 110, 111, 116, 32, 99, 111, 114, 114, 101, 99, 116, 108, 121, 32, 118, 101, 114, 105, 102, 121, 32, 105, 110, 116, 101, 103, 114, 105, 116, 121, 46, 34, 41, 44, 110, 33, 61, 61, 114, 38, 38, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 87, 97, 114, 110, 44, 96, 84, 104, 101, 32, 83, 99, 97, 110, 100, 105, 116, 32, 68, 97, 116, 97, 32, 67, 97, 112, 116, 117, 114, 101, 32, 108, 105, 98, 114, 97, 114, 121, 32, 87, 65, 83, 77, 32, 102, 105, 108, 101, 32, 102, 111, 117, 110, 100, 32, 97, 116, 32, 36, 123, 116, 125, 32, 115, 101, 101, 109, 115, 32, 105, 110, 118, 97, 108, 105, 100, 58, 32, 101, 120, 112, 101, 99, 116, 101, 100, 32, 102, 105, 108, 101, 32, 104, 97, 115, 104, 32, 100, 111, 101, 115, 110, 39, 116, 32, 109, 97, 116, 99, 104, 32, 40, 114, 101, 99, 101, 105, 118, 101, 100, 58, 32, 36, 123, 110, 125, 44, 32, 101, 120, 112, 101, 99, 116, 101, 100, 58, 32, 36, 123, 114, 125, 41, 46, 32, 80, 108, 101, 97, 115, 101, 32, 101, 110, 115, 117, 114, 101, 32, 116, 104, 101, 32, 99, 111, 114, 114, 101, 99, 116, 32, 83, 99, 97, 110, 100, 105, 116, 32, 68, 97, 116, 97, 32, 67, 97, 112, 116, 117, 114, 101, 32, 102, 105, 108, 101, 32, 40, 119, 105, 116, 104, 32, 99, 111, 114, 114, 101, 99, 116, 32, 118, 101, 114, 115, 105, 111, 110, 41, 32, 105, 115, 32, 114, 101, 116, 114, 105, 101, 118, 101, 100, 46, 96, 41, 125, 41, 46, 99, 97, 116, 99, 104, 40, 40, 41, 61, 62, 123, 125, 41, 58, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 87, 97, 114, 110, 44, 96, 73, 110, 115, 101, 99, 117, 114, 101, 32, 99, 111, 110, 116, 101, 120, 116, 32, 40, 115, 101, 101, 32, 104, 116, 116, 112, 115, 58, 47, 47, 100, 101, 118, 101, 108, 111, 112, 101, 114, 46, 109, 111, 122, 105, 108, 108, 97, 46, 111, 114, 103, 47, 101, 110, 45, 85, 83, 47, 100, 111, 99, 115, 47, 87, 101, 98, 47, 83, 101, 99, 117, 114, 105, 116, 121, 47, 83, 101, 99, 117, 114, 101, 95, 67, 111, 110, 116, 101, 120, 116, 115, 41, 58, 32, 84, 104, 101, 32, 104, 97, 115, 104, 32, 111, 102, 32, 116, 104, 101, 32, 83, 99, 97, 110, 100, 105, 116, 32, 68, 97, 116, 97, 32, 67, 97, 112, 116, 117, 114, 101, 32, 108, 105, 98, 114, 97, 114, 121, 32, 87, 65, 83, 77, 32, 102, 105, 108, 101, 32, 102, 111, 117, 110, 100, 32, 97, 116, 32, 36, 123, 116, 125, 32, 99, 111, 117, 108, 100, 32, 110, 111, 116, 32, 98, 101, 32, 118, 101, 114, 105, 102, 105, 101, 100, 96, 41, 125, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 119, 40, 105, 41, 123, 114, 101, 116, 117, 114, 110, 32, 110, 101, 119, 32, 80, 114, 111, 109, 105, 115, 101, 40, 40, 108, 44, 110, 41, 61, 62, 123, 102, 101, 116, 99, 104, 40, 116, 41, 46, 116, 104, 101, 110, 40, 117, 61, 62, 123, 117, 46, 111, 107, 63, 40, 117, 46, 99, 108, 111, 110, 101, 40, 41, 46, 97, 114, 114, 97, 121, 66, 117, 102, 102, 101, 114, 40, 41, 46, 116, 104, 101, 110, 40, 103, 61, 62, 123, 105, 38, 38, 108, 40, 117, 41, 44, 104, 40, 103, 41, 125, 41, 46, 99, 97, 116, 99, 104, 40, 103, 61, 62, 123, 105, 38, 38, 110, 40, 103, 41, 125, 41, 44, 105, 124, 124, 108, 40, 117, 41, 41, 58, 110, 40, 110, 101, 119, 32, 69, 114, 114, 111, 114, 40, 34, 72, 84, 84, 80, 32, 115, 116, 97, 116, 117, 115, 32, 99, 111, 100, 101, 32, 105, 115, 32, 110, 111, 116, 32, 111, 107, 34, 41, 41, 125, 41, 46, 99, 97, 116, 99, 104, 40, 117, 61, 62, 123, 110, 40, 117, 41, 125, 41, 125, 41, 125, 116, 121, 112, 101, 111, 102, 32, 115, 101, 108, 102, 46, 87, 101, 98, 65, 115, 115, 101, 109, 98, 108, 121, 46, 105, 110, 115, 116, 97, 110, 116, 105, 97, 116, 101, 83, 116, 114, 101, 97, 109, 105, 110, 103, 61, 61, 34, 102, 117, 110, 99, 116, 105, 111, 110, 34, 63, 100, 40, 41, 58, 97, 40, 41, 125, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 86, 40, 101, 41, 123, 108, 101, 116, 32, 116, 44, 123, 112, 114, 101, 108, 111, 97, 100, 105, 110, 103, 58, 114, 125, 61, 101, 44, 115, 61, 80, 114, 111, 109, 105, 115, 101, 46, 114, 101, 115, 111, 108, 118, 101, 40, 41, 44, 97, 61, 33, 49, 44, 100, 61, 33, 49, 59, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 111, 40, 41, 123, 108, 101, 116, 32, 105, 61, 34, 70, 73, 76, 69, 95, 68, 65, 84, 65, 34, 44, 108, 44, 110, 44, 117, 59, 102, 117, 110, 99, 116, 105, 111, 110, 32, 103, 40, 41, 123, 110, 46, 114, 101, 115, 117, 108, 116, 46, 99, 108, 111, 115, 101, 40, 41, 44, 117, 46, 114, 101, 115, 117, 108, 116, 46, 99, 108, 111, 115, 101, 40, 41, 44, 108, 40, 48, 41, 125, 102, 117, 110, 99, 116, 105, 111, 110, 32, 121, 40, 41, 123, 116, 114, 121, 123, 108, 101, 116, 32, 98, 61, 91, 93, 44, 68, 61, 110, 46, 114, 101, 115, 117, 108, 116, 46, 116, 114, 97, 110, 115, 97, 99, 116, 105, 111, 110, 40, 105, 44, 34, 114, 101, 97, 100, 111, 110, 108, 121, 34, 41, 59, 68, 46, 111, 110, 101, 114, 114, 111, 114, 61, 103, 59, 108, 101, 116, 32, 83, 61, 68, 46, 111, 98, 106, 101, 99, 116, 83, 116, 111, 114, 101, 40, 105, 41, 46, 111, 112, 101, 110, 67, 117, 114, 115, 111, 114, 40, 41, 59, 83, 46, 111, 110, 115, 117, 99, 99, 101, 115, 115, 61, 40, 41, 61, 62, 123, 108, 101, 116, 32, 107, 61, 83, 46, 114, 101, 115, 117, 108, 116, 59, 105, 102, 40, 107, 61, 61, 110, 117, 108, 108, 41, 116, 114, 121, 123, 108, 101, 116, 32, 76, 61, 48, 44, 109, 61, 117, 46, 114, 101, 115, 117, 108, 116, 46, 116, 114, 97, 110, 115, 97, 99, 116, 105, 111, 110, 40, 105, 44, 34, 114, 101, 97, 100, 119, 114, 105, 116, 101, 34, 41, 44, 102, 61, 109, 46, 111, 98, 106, 101, 99, 116, 83, 116, 111, 114, 101, 40, 105, 41, 59, 109, 46, 111, 110, 101, 114, 114, 111, 114, 61, 103, 44, 109, 46, 111, 110, 99, 111, 109, 112, 108, 101, 116, 101, 61, 40, 41, 61, 62, 123, 110, 46, 114, 101, 115, 117, 108, 116, 46, 99, 108, 111, 115, 101, 40, 41, 44, 117, 46, 114, 101, 115, 117, 108, 116, 46, 99, 108, 111, 115, 101, 40, 41, 44, 108, 40, 76, 41, 125, 59, 102, 111, 114, 40, 108, 101, 116, 32, 118, 32, 111, 102, 32, 98, 41, 123, 108, 101, 116, 32, 67, 61, 102, 46, 99, 111, 117, 110, 116, 40, 118, 46, 112, 114, 105, 109, 97, 114, 121, 75, 101, 121, 41, 59, 67, 46, 111, 110, 115, 117, 99, 99, 101, 115, 115, 61, 40, 41, 61, 62, 123, 67, 46, 114, 101, 115, 117, 108, 116, 61, 61, 61, 48, 38, 38, 40, 43, 43, 76, 44, 102, 46, 97, 100, 100, 40, 118, 46, 118, 97, 108, 117, 101, 44, 118, 46, 112, 114, 105, 109, 97, 114, 121, 75, 101, 121, 41, 41, 125, 125, 125, 99, 97, 116, 99, 104, 40, 76, 41, 123, 103, 46, 99, 97, 108, 108, 40, 123, 101, 114, 114, 111, 114, 58, 76, 125, 41, 125, 101, 108, 115, 101, 32, 98, 46, 112, 117, 115, 104, 40, 123, 118, 97, 108, 117, 101, 58, 107, 46, 118, 97, 108, 117, 101, 44, 112, 114, 105, 109, 97, 114, 121, 75, 101, 121, 58, 107, 46, 112, 114, 105, 109, 97, 114, 121, 75, 101, 121, 46, 116, 111, 83, 116, 114, 105, 110, 103, 40, 41, 46, 114, 101, 112, 108, 97, 99, 101, 40, 96, 36, 123, 101, 46, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 80, 114, 101, 108, 111, 97, 100, 125, 47, 96, 44, 96, 36, 123, 101, 46, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 83, 116, 97, 110, 100, 97, 114, 100, 125, 47, 96, 41, 125, 41, 44, 107, 46, 99, 111, 110, 116, 105, 110, 117, 101, 40, 41, 125, 44, 83, 46, 111, 110, 101, 114, 114, 111, 114, 61, 103, 125, 99, 97, 116, 99, 104, 40, 98, 41, 123, 103, 46, 99, 97, 108, 108, 40, 123, 101, 114, 114, 111, 114, 58, 98, 125, 41, 125, 125, 114, 101, 116, 117, 114, 110, 32, 110, 101, 119, 32, 80, 114, 111, 109, 105, 115, 101, 40, 98, 61, 62, 123, 108, 61, 98, 44, 110, 61, 105, 110, 100, 101, 120, 101, 100, 68, 66, 46, 111, 112, 101, 110, 40, 101, 46, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 80, 114, 101, 108, 111, 97, 100, 41, 44, 110, 46, 111, 110, 117, 112, 103, 114, 97, 100, 101, 110, 101, 101, 100, 101, 100, 61, 40, 41, 61, 62, 123, 116, 114, 121, 123, 110, 46, 114, 101, 115, 117, 108, 116, 46, 99, 114, 101, 97, 116, 101, 79, 98, 106, 101, 99, 116, 83, 116, 111, 114, 101, 40, 105, 41, 125, 99, 97, 116, 99, 104, 40, 68, 41, 123, 125, 125, 44, 110, 46, 111, 110, 115, 117, 99, 99, 101, 115, 115, 61, 40, 41, 61, 62, 123, 105, 102, 40, 33, 65, 114, 114, 97, 121, 46, 102, 114, 111, 109, 40, 110, 46, 114, 101, 115, 117, 108, 116, 46, 111, 98, 106, 101, 99, 116, 83, 116, 111, 114, 101, 78, 97, 109, 101, 115, 41, 46, 105, 110, 99, 108, 117, 100, 101, 115, 40, 105, 41, 41, 123, 98, 40, 48, 41, 59, 114, 101, 116, 117, 114, 110, 125, 117, 61, 105, 110, 100, 101, 120, 101, 100, 68, 66, 46, 111, 112, 101, 110, 40, 101, 46, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 83, 116, 97, 110, 100, 97, 114, 100, 41, 44, 117, 46, 111, 110, 117, 112, 103, 114, 97, 100, 101, 110, 101, 101, 100, 101, 100, 61, 40, 41, 61, 62, 123, 116, 114, 121, 123, 117, 46, 114, 101, 115, 117, 108, 116, 46, 99, 114, 101, 97, 116, 101, 79, 98, 106, 101, 99, 116, 83, 116, 111, 114, 101, 40, 105, 41, 125, 99, 97, 116, 99, 104, 40, 68, 41, 123, 125, 125, 44, 117, 46, 111, 110, 115, 117, 99, 99, 101, 115, 115, 61, 40, 41, 61, 62, 123, 121, 40, 41, 125, 44, 117, 46, 111, 110, 98, 108, 111, 99, 107, 101, 100, 61, 117, 46, 111, 110, 101, 114, 114, 111, 114, 61, 103, 125, 44, 110, 46, 111, 110, 98, 108, 111, 99, 107, 101, 100, 61, 110, 46, 111, 110, 101, 114, 114, 111, 114, 61, 103, 125, 41, 125, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 104, 40, 105, 44, 108, 41, 123, 105, 102, 40, 116, 33, 61, 110, 117, 108, 108, 41, 114, 101, 116, 117, 114, 110, 32, 97, 61, 33, 48, 44, 110, 101, 119, 32, 80, 114, 111, 109, 105, 115, 101, 40, 40, 110, 44, 117, 41, 61, 62, 123, 40, 33, 114, 38, 38, 105, 63, 111, 40, 41, 58, 80, 114, 111, 109, 105, 115, 101, 46, 114, 101, 115, 111, 108, 118, 101, 40, 48, 41, 41, 46, 116, 104, 101, 110, 40, 103, 61, 62, 123, 105, 102, 40, 33, 114, 38, 38, 105, 38, 38, 33, 108, 38, 38, 103, 61, 61, 61, 48, 41, 123, 97, 61, 33, 49, 44, 110, 40, 41, 59, 114, 101, 116, 117, 114, 110, 125, 116, 40, 105, 44, 121, 61, 62, 123, 105, 102, 40, 97, 61, 33, 49, 44, 121, 33, 61, 110, 117, 108, 108, 41, 123, 117, 40, 121, 41, 59, 114, 101, 116, 117, 114, 110, 125, 110, 40, 41, 125, 41, 125, 41, 46, 99, 97, 116, 99, 104, 40, 117, 41, 125, 41, 125, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 119, 40, 105, 44, 108, 61, 33, 49, 44, 110, 61, 33, 49, 41, 123, 114, 101, 116, 117, 114, 110, 40, 33, 100, 124, 124, 110, 41, 38, 38, 40, 97, 63, 40, 100, 61, 33, 48, 44, 115, 61, 115, 46, 116, 104, 101, 110, 40, 97, 115, 121, 110, 99, 40, 41, 61, 62, 40, 100, 61, 33, 49, 44, 104, 40, 105, 44, 108, 41, 41, 41, 41, 58, 115, 61, 104, 40, 105, 44, 108, 41, 41, 44, 115, 125, 116, 61, 70, 83, 46, 115, 121, 110, 99, 102, 115, 44, 70, 83, 46, 115, 121, 110, 99, 102, 115, 61, 40, 105, 44, 108, 41, 61, 62, 123, 108, 101, 116, 32, 110, 61, 108, 59, 108, 61, 117, 61, 62, 123, 110, 40, 117, 41, 125, 44, 119, 40, 105, 41, 46, 116, 104, 101, 110, 40, 108, 41, 46, 99, 97, 116, 99, 104, 40, 108, 41, 125, 59, 116, 114, 121, 123, 70, 83, 46, 109, 107, 100, 105, 114, 40, 101, 46, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 41, 125, 99, 97, 116, 99, 104, 40, 105, 41, 123, 105, 102, 40, 105, 46, 99, 111, 100, 101, 33, 61, 61, 34, 69, 69, 88, 73, 83, 84, 34, 41, 114, 101, 116, 117, 114, 110, 32, 116, 61, 118, 111, 105, 100, 32, 48, 44, 80, 114, 111, 109, 105, 115, 101, 46, 114, 101, 106, 101, 99, 116, 40, 105, 41, 125, 114, 101, 116, 117, 114, 110, 32, 70, 83, 46, 109, 111, 117, 110, 116, 40, 73, 68, 66, 70, 83, 44, 123, 125, 44, 101, 46, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 41, 44, 119, 40, 33, 48, 44, 33, 48, 41, 125, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 78, 40, 101, 44, 116, 44, 114, 44, 115, 41, 123, 114, 101, 116, 117, 114, 110, 32, 110, 101, 119, 32, 80, 114, 111, 109, 105, 115, 101, 40, 40, 97, 44, 100, 41, 61, 62, 123, 101, 40, 41, 46, 116, 104, 101, 110, 40, 97, 41, 46, 99, 97, 116, 99, 104, 40, 111, 61, 62, 123, 108, 101, 116, 32, 104, 61, 116, 42, 50, 59, 105, 102, 40, 104, 62, 114, 41, 123, 100, 40, 111, 41, 59, 114, 101, 116, 117, 114, 110, 125, 115, 40, 111, 41, 44, 115, 101, 116, 84, 105, 109, 101, 111, 117, 116, 40, 40, 41, 61, 62, 123, 78, 40, 101, 44, 104, 44, 114, 44, 115, 41, 46, 116, 104, 101, 110, 40, 97, 41, 46, 99, 97, 116, 99, 104, 40, 100, 41, 125, 44, 116, 41, 125, 41, 125, 41, 125, 118, 97, 114, 32, 82, 61, 99, 108, 97, 115, 115, 32, 101, 120, 116, 101, 110, 100, 115, 32, 69, 114, 114, 111, 114, 123, 99, 111, 110, 115, 116, 114, 117, 99, 116, 111, 114, 40, 101, 61, 123, 125, 41, 123, 115, 117, 112, 101, 114, 40, 101, 46, 109, 101, 115, 115, 97, 103, 101, 41, 44, 112, 40, 116, 104, 105, 115, 44, 34, 110, 97, 109, 101, 34, 41, 44, 112, 40, 116, 104, 105, 115, 44, 34, 109, 101, 115, 115, 97, 103, 101, 34, 41, 44, 79, 98, 106, 101, 99, 116, 46, 115, 101, 116, 80, 114, 111, 116, 111, 116, 121, 112, 101, 79, 102, 40, 116, 104, 105, 115, 44, 82, 46, 112, 114, 111, 116, 111, 116, 121, 112, 101, 41, 44, 116, 121, 112, 101, 111, 102, 32, 101, 46, 110, 97, 109, 101, 61, 61, 34, 115, 116, 114, 105, 110, 103, 34, 38, 38, 40, 116, 104, 105, 115, 46, 110, 97, 109, 101, 61, 101, 46, 110, 97, 109, 101, 41, 125, 125, 44, 80, 59, 40, 101, 61, 62, 123, 102, 117, 110, 99, 116, 105, 111, 110, 32, 116, 40, 41, 123, 108, 101, 116, 32, 114, 61, 34, 54, 46, 49, 53, 46, 50, 34, 59, 105, 102, 40, 114, 61, 61, 110, 117, 108, 108, 41, 116, 104, 114, 111, 119, 32, 110, 101, 119, 32, 82, 40, 123, 110, 97, 109, 101, 58, 34, 73, 110, 118, 97, 108, 105, 100, 32, 108, 105, 98, 114, 97, 114, 121, 32, 118, 101, 114, 115, 105, 111, 110, 34, 44, 109, 101, 115, 115, 97, 103, 101, 58, 34, 76, 105, 98, 114, 97, 114, 121, 32, 118, 101, 114, 115, 105, 111, 110, 32, 105, 115, 32, 110, 111, 116, 32, 100, 101, 102, 105, 110, 101, 100, 32, 111, 114, 32, 101, 109, 112, 116, 121, 46, 34, 125, 41, 59, 114, 101, 116, 117, 114, 110, 32, 114, 125, 101, 46, 115, 100, 107, 86, 101, 114, 115, 105, 111, 110, 61, 116, 125, 41, 40, 80, 124, 124, 40, 80, 61, 123, 125, 41, 41, 59, 102, 117, 110, 99, 116, 105, 111, 110, 32, 74, 40, 101, 41, 123, 114, 101, 116, 117, 114, 110, 47, 94, 104, 116, 116, 112, 115, 63, 58, 92, 47, 92, 47, 40, 63, 58, 91, 94, 46, 47, 93, 42, 92, 46, 41, 42, 99, 100, 110, 46, 106, 115, 100, 101, 108, 105, 118, 114, 46, 110, 101, 116, 92, 47, 47, 46, 116, 101, 115, 116, 40, 101, 41, 63, 123, 114, 101, 115, 117, 108, 116, 58, 33, 48, 44, 99, 100, 110, 66, 97, 115, 101, 85, 82, 76, 58, 34, 104, 116, 116, 112, 115, 58, 47, 47, 99, 100, 110, 46, 106, 115, 100, 101, 108, 105, 118, 114, 46, 110, 101, 116, 47, 110, 112, 109, 47, 34, 125, 58, 47, 94, 104, 116, 116, 112, 115, 63, 58, 92, 47, 92, 47, 40, 63, 58, 91, 94, 46, 47, 93, 42, 92, 46, 41, 42, 117, 110, 112, 107, 103, 46, 99, 111, 109, 92, 47, 47, 46, 116, 101, 115, 116, 40, 101, 41, 63, 123, 114, 101, 115, 117, 108, 116, 58, 33, 48, 44, 99, 100, 110, 66, 97, 115, 101, 85, 82, 76, 58, 34, 104, 116, 116, 112, 115, 58, 47, 47, 117, 110, 112, 107, 103, 46, 99, 111, 109, 47, 34, 125, 58, 123, 114, 101, 115, 117, 108, 116, 58, 33, 49, 44, 99, 100, 110, 66, 97, 115, 101, 85, 82, 76, 58, 34, 34, 125, 125, 102, 117, 110, 99, 116, 105, 111, 110, 32, 113, 40, 101, 41, 123, 108, 101, 116, 32, 116, 61, 47, 115, 99, 97, 110, 100, 105, 116, 45, 119, 101, 98, 45, 100, 97, 116, 97, 99, 97, 112, 116, 117, 114, 101, 45, 91, 97, 45, 122, 93, 43, 47, 105, 46, 101, 120, 101, 99, 40, 101, 41, 59, 114, 101, 116, 117, 114, 110, 32, 116, 63, 116, 91, 48, 93, 58, 110, 117, 108, 108, 125, 102, 117, 110, 99, 116, 105, 111, 110, 32, 75, 40, 101, 44, 116, 44, 114, 44, 115, 41, 123, 108, 101, 116, 32, 97, 61, 116, 44, 100, 61, 74, 40, 97, 41, 59, 105, 102, 40, 100, 46, 114, 101, 115, 117, 108, 116, 41, 123, 108, 101, 116, 32, 119, 61, 113, 40, 97, 41, 59, 119, 33, 61, 110, 117, 108, 108, 38, 38, 40, 97, 61, 96, 36, 123, 100, 46, 99, 100, 110, 66, 97, 115, 101, 85, 82, 76, 125, 36, 123, 119, 125, 64, 36, 123, 101, 125, 47, 98, 117, 105, 108, 100, 47, 101, 110, 103, 105, 110, 101, 47, 96, 41, 125, 108, 101, 116, 32, 111, 61, 34, 34, 59, 115, 38, 38, 40, 111, 43, 61, 34, 45, 115, 105, 109, 100, 34, 41, 59, 108, 101, 116, 32, 104, 61, 114, 46, 114, 101, 112, 108, 97, 99, 101, 40, 34, 46, 119, 97, 115, 109, 34, 44, 34, 34, 41, 59, 114, 101, 116, 117, 114, 110, 32, 100, 46, 114, 101, 115, 117, 108, 116, 63, 123, 106, 115, 85, 82, 73, 58, 96, 36, 123, 97, 125, 36, 123, 104, 125, 36, 123, 111, 125, 46, 106, 115, 96, 44, 119, 97, 115, 109, 85, 82, 73, 58, 96, 36, 123, 97, 125, 36, 123, 104, 125, 36, 123, 111, 125, 46, 119, 97, 115, 109, 96, 125, 58, 123, 106, 115, 85, 82, 73, 58, 96, 36, 123, 97, 125, 36, 123, 104, 125, 36, 123, 111, 125, 46, 106, 115, 63, 118, 61, 36, 123, 101, 125, 96, 44, 119, 97, 115, 109, 85, 82, 73, 58, 96, 36, 123, 97, 125, 36, 123, 104, 125, 36, 123, 111, 125, 46, 119, 97, 115, 109, 63, 118, 61, 36, 123, 101, 125, 96, 125, 125, 118, 97, 114, 32, 73, 61, 99, 108, 97, 115, 115, 123, 99, 111, 110, 115, 116, 114, 117, 99, 116, 111, 114, 40, 101, 44, 116, 41, 123, 116, 104, 105, 115, 46, 109, 111, 100, 117, 108, 101, 72, 97, 110, 100, 108, 101, 114, 61, 101, 44, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 70, 117, 110, 99, 116, 105, 111, 110, 115, 61, 116, 44, 112, 40, 116, 104, 105, 115, 44, 34, 108, 97, 115, 116, 85, 115, 101, 100, 77, 111, 100, 117, 108, 101, 77, 105, 114, 114, 111, 114, 65, 120, 105, 115, 34, 41, 44, 112, 40, 116, 104, 105, 115, 44, 34, 77, 65, 88, 95, 78, 85, 77, 66, 69, 82, 95, 79, 70, 95, 73, 77, 65, 71, 69, 83, 95, 73, 78, 95, 70, 82, 65, 77, 69, 95, 68, 65, 84, 65, 95, 80, 79, 79, 76, 34, 44, 49, 48, 41, 44, 112, 40, 116, 104, 105, 115, 44, 34, 108, 105, 98, 114, 97, 114, 121, 76, 111, 97, 100, 105, 110, 103, 80, 114, 111, 109, 105, 115, 101, 34, 41, 44, 112, 40, 116, 104, 105, 115, 44, 34, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 34, 41, 44, 112, 40, 116, 104, 105, 115, 44, 34, 114, 101, 115, 111, 117, 114, 99, 101, 80, 97, 116, 104, 34, 41, 44, 112, 40, 116, 104, 105, 115, 44, 34, 95, 105, 115, 68, 114, 97, 119, 76, 111, 111, 112, 82, 117, 110, 110, 105, 110, 103, 34, 44, 33, 49, 41, 44, 112, 40, 116, 104, 105, 115, 44, 34, 114, 101, 100, 114, 97, 119, 73, 110, 116, 101, 114, 118, 97, 108, 34, 44, 49, 101, 51, 47, 51, 48, 41, 44, 112, 40, 116, 104, 105, 115, 44, 34, 114, 101, 100, 114, 97, 119, 82, 101, 113, 117, 101, 115, 116, 115, 34, 44, 91, 93, 41, 44, 112, 40, 116, 104, 105, 115, 44, 34, 108, 111, 111, 112, 84, 105, 109, 101, 111, 117, 116, 73, 100, 34, 41, 44, 112, 40, 116, 104, 105, 115, 44, 34, 99, 111, 110, 116, 101, 120, 116, 34, 41, 44, 112, 40, 116, 104, 105, 115, 44, 34, 99, 111, 110, 116, 101, 120, 116, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 34, 41, 44, 112, 40, 116, 104, 105, 115, 44, 34, 105, 109, 97, 103, 101, 70, 114, 97, 109, 101, 83, 111, 117, 114, 99, 101, 34, 41, 44, 112, 40, 116, 104, 105, 115, 44, 34, 118, 105, 101, 119, 34, 41, 44, 112, 40, 116, 104, 105, 115, 44, 34, 108, 97, 115, 116, 70, 114, 97, 109, 101, 67, 111, 117, 110, 116, 101, 114, 34, 44, 45, 49, 41, 44, 112, 40, 116, 104, 105, 115, 44, 34, 102, 114, 97, 109, 101, 68, 97, 116, 97, 80, 111, 111, 108, 34, 44, 110, 101, 119, 32, 77, 97, 112, 41, 125, 103, 101, 116, 32, 77, 111, 100, 117, 108, 101, 40, 41, 123, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 109, 111, 100, 117, 108, 101, 72, 97, 110, 100, 108, 101, 114, 46, 103, 101, 116, 40, 41, 125, 108, 111, 97, 100, 76, 105, 98, 114, 97, 114, 121, 40, 101, 41, 123, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 108, 105, 98, 114, 97, 114, 121, 76, 111, 97, 100, 105, 110, 103, 80, 114, 111, 109, 105, 115, 101, 33, 61, 110, 117, 108, 108, 63, 116, 104, 105, 115, 46, 108, 105, 98, 114, 97, 114, 121, 76, 111, 97, 100, 105, 110, 103, 80, 114, 111, 109, 105, 115, 101, 58, 40, 116, 104, 105, 115, 46, 108, 105, 98, 114, 97, 114, 121, 76, 111, 97, 100, 105, 110, 103, 80, 114, 111, 109, 105, 115, 101, 61, 116, 104, 105, 115, 46, 115, 101, 116, 117, 112, 40, 101, 46, 108, 105, 98, 114, 97, 114, 121, 76, 111, 99, 97, 116, 105, 111, 110, 44, 101, 46, 108, 111, 99, 97, 116, 105, 111, 110, 80, 97, 116, 104, 44, 101, 46, 112, 114, 101, 108, 111, 97, 100, 69, 110, 103, 105, 110, 101, 41, 44, 116, 104, 105, 115, 46, 108, 105, 98, 114, 97, 114, 121, 76, 111, 97, 100, 105, 110, 103, 80, 114, 111, 109, 105, 115, 101, 41, 125, 99, 114, 101, 97, 116, 101, 67, 111, 110, 116, 101, 120, 116, 40, 101, 41, 123, 108, 101, 116, 32, 116, 61, 116, 104, 105, 115, 46, 103, 101, 116, 77, 111, 100, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 115, 40, 41, 59, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 61, 110, 101, 119, 32, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 68, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 67, 111, 110, 116, 101, 120, 116, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 40, 116, 104, 105, 115, 46, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 44, 101, 46, 100, 101, 118, 105, 99, 101, 73, 100, 44, 101, 46, 99, 111, 110, 116, 101, 120, 116, 46, 100, 101, 118, 105, 99, 101, 78, 97, 109, 101, 44, 101, 46, 100, 111, 109, 97, 105, 110, 44, 116, 44, 101, 46, 100, 101, 108, 97, 121, 101, 100, 82, 101, 103, 105, 115, 116, 114, 97, 116, 105, 111, 110, 44, 101, 46, 104, 105, 103, 104, 69, 110, 100, 66, 108, 117, 114, 114, 121, 82, 101, 99, 111, 103, 110, 105, 116, 105, 111, 110, 44, 116, 104, 105, 115, 46, 114, 101, 115, 111, 117, 114, 99, 101, 80, 97, 116, 104, 41, 59, 108, 101, 116, 32, 114, 61, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 46, 99, 111, 110, 116, 101, 120, 116, 70, 114, 111, 109, 74, 115, 111, 110, 40, 74, 83, 79, 78, 46, 115, 116, 114, 105, 110, 103, 105, 102, 121, 40, 101, 46, 99, 111, 110, 116, 101, 120, 116, 41, 41, 44, 115, 61, 114, 46, 103, 101, 116, 86, 105, 101, 119, 40, 41, 59, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 61, 114, 46, 103, 101, 116, 67, 111, 110, 116, 101, 120, 116, 40, 41, 59, 108, 101, 116, 32, 97, 61, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 68, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 67, 111, 110, 116, 101, 120, 116, 76, 105, 115, 116, 101, 110, 101, 114, 46, 101, 120, 116, 101, 110, 100, 40, 34, 68, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 67, 111, 110, 116, 101, 120, 116, 76, 105, 115, 116, 101, 110, 101, 114, 34, 44, 123, 100, 105, 100, 67, 104, 97, 110, 103, 101, 83, 116, 97, 116, 117, 115, 58, 40, 111, 44, 104, 41, 61, 62, 123, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 68, 105, 100, 67, 104, 97, 110, 103, 101, 83, 116, 97, 116, 117, 115, 40, 74, 83, 79, 78, 46, 112, 97, 114, 115, 101, 40, 104, 46, 116, 111, 74, 115, 111, 110, 40, 41, 41, 41, 125, 44, 100, 105, 100, 83, 116, 97, 114, 116, 79, 98, 115, 101, 114, 118, 105, 110, 103, 67, 111, 110, 116, 101, 120, 116, 58, 40, 41, 61, 62, 123, 116, 104, 105, 115, 46, 100, 105, 100, 83, 116, 97, 114, 116, 79, 98, 115, 101, 114, 118, 105, 110, 103, 67, 111, 110, 116, 101, 120, 116, 40, 41, 125, 125, 41, 44, 100, 61, 110, 101, 119, 32, 97, 59, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 46, 97, 100, 100, 76, 105, 115, 116, 101, 110, 101, 114, 40, 100, 41, 44, 100, 46, 100, 101, 108, 101, 116, 101, 40, 41, 44, 116, 104, 105, 115, 46, 115, 101, 116, 86, 105, 101, 119, 40, 115, 41, 125, 103, 101, 116, 77, 111, 100, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 115, 40, 41, 123, 114, 101, 116, 117, 114, 110, 32, 110, 101, 119, 32, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 86, 101, 99, 116, 111, 114, 68, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 125, 115, 101, 116, 70, 114, 97, 109, 101, 83, 111, 117, 114, 99, 101, 40, 101, 41, 123, 118, 97, 114, 32, 116, 59, 116, 104, 105, 115, 46, 108, 97, 115, 116, 85, 115, 101, 100, 77, 111, 100, 117, 108, 101, 77, 105, 114, 114, 111, 114, 65, 120, 105, 115, 61, 116, 104, 105, 115, 46, 109, 97, 112, 77, 105, 114, 114, 111, 114, 65, 120, 105, 115, 79, 110, 77, 111, 100, 117, 108, 101, 40, 101, 41, 44, 40, 116, 61, 116, 104, 105, 115, 46, 105, 109, 97, 103, 101, 70, 114, 97, 109, 101, 83, 111, 117, 114, 99, 101, 41, 61, 61, 110, 117, 108, 108, 124, 124, 116, 46, 100, 101, 108, 101, 116, 101, 40, 41, 44, 116, 104, 105, 115, 46, 105, 109, 97, 103, 101, 70, 114, 97, 109, 101, 83, 111, 117, 114, 99, 101, 61, 110, 101, 119, 32, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 73, 109, 97, 103, 101, 66, 117, 102, 102, 101, 114, 70, 114, 97, 109, 101, 83, 111, 117, 114, 99, 101, 40, 116, 104, 105, 115, 46, 108, 97, 115, 116, 85, 115, 101, 100, 77, 111, 100, 117, 108, 101, 77, 105, 114, 114, 111, 114, 65, 120, 105, 115, 41, 44, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 46, 115, 101, 116, 70, 114, 97, 109, 101, 83, 111, 117, 114, 99, 101, 40, 116, 104, 105, 115, 46, 105, 109, 97, 103, 101, 70, 114, 97, 109, 101, 83, 111, 117, 114, 99, 101, 41, 125, 112, 114, 111, 99, 101, 115, 115, 70, 114, 97, 109, 101, 40, 101, 41, 123, 118, 97, 114, 32, 116, 59, 105, 102, 40, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 61, 61, 110, 117, 108, 108, 41, 114, 101, 116, 117, 114, 110, 123, 112, 97, 121, 108, 111, 97, 100, 58, 101, 44, 116, 114, 97, 110, 115, 102, 101, 114, 97, 98, 108, 101, 115, 58, 91, 101, 46, 100, 97, 116, 97, 46, 98, 117, 102, 102, 101, 114, 93, 125, 59, 108, 101, 116, 32, 114, 61, 101, 46, 100, 97, 116, 97, 44, 115, 61, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 97, 108, 108, 111, 99, 97, 116, 101, 85, 105, 110, 116, 56, 65, 114, 114, 97, 121, 40, 114, 46, 98, 121, 116, 101, 76, 101, 110, 103, 116, 104, 41, 59, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 72, 69, 65, 80, 85, 56, 46, 115, 101, 116, 40, 114, 44, 115, 41, 44, 40, 116, 61, 116, 104, 105, 115, 46, 105, 109, 97, 103, 101, 70, 114, 97, 109, 101, 83, 111, 117, 114, 99, 101, 41, 61, 61, 110, 117, 108, 108, 124, 124, 116, 46, 111, 117, 116, 112, 117, 116, 70, 114, 97, 109, 101, 40, 115, 44, 101, 46, 119, 105, 100, 116, 104, 44, 101, 46, 104, 101, 105, 103, 104, 116, 44, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 73, 109, 97, 103, 101, 66, 117, 102, 102, 101, 114, 70, 111, 114, 109, 97, 116, 46, 82, 103, 98, 97, 56, 56, 56, 56, 41, 44, 123, 112, 97, 121, 108, 111, 97, 100, 58, 101, 44, 116, 114, 97, 110, 115, 102, 101, 114, 97, 98, 108, 101, 115, 58, 91, 101, 46, 100, 97, 116, 97, 46, 98, 117, 102, 102, 101, 114, 93, 125, 125, 117, 112, 100, 97, 116, 101, 67, 111, 110, 116, 101, 120, 116, 40, 101, 41, 123, 105, 102, 40, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 33, 61, 110, 117, 108, 108, 38, 38, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 33, 61, 110, 117, 108, 108, 41, 123, 108, 101, 116, 32, 116, 61, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 46, 117, 112, 100, 97, 116, 101, 67, 111, 110, 116, 101, 120, 116, 70, 114, 111, 109, 74, 115, 111, 110, 40, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 44, 116, 104, 105, 115, 46, 118, 105, 101, 119, 44, 74, 83, 79, 78, 46, 115, 116, 114, 105, 110, 103, 105, 102, 121, 40, 101, 46, 99, 111, 110, 116, 101, 120, 116, 41, 41, 59, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 61, 116, 46, 103, 101, 116, 67, 111, 110, 116, 101, 120, 116, 40, 41, 59, 108, 101, 116, 32, 114, 61, 116, 46, 103, 101, 116, 86, 105, 101, 119, 40, 41, 59, 114, 33, 61, 110, 117, 108, 108, 38, 38, 101, 46, 118, 105, 101, 119, 33, 61, 110, 117, 108, 108, 38, 38, 114, 46, 115, 101, 116, 86, 105, 101, 119, 83, 105, 122, 101, 40, 101, 46, 118, 105, 101, 119, 46, 119, 105, 100, 116, 104, 44, 101, 46, 118, 105, 101, 119, 46, 104, 101, 105, 103, 104, 116, 41, 44, 116, 104, 105, 115, 46, 115, 101, 116, 86, 105, 101, 119, 40, 114, 41, 44, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 68, 101, 98, 117, 103, 44, 34, 99, 111, 110, 116, 101, 120, 116, 32, 117, 112, 100, 97, 116, 101, 100, 34, 44, 101, 41, 125, 125, 114, 101, 112, 111, 114, 116, 67, 97, 109, 101, 114, 97, 80, 114, 111, 112, 101, 114, 116, 105, 101, 115, 40, 101, 41, 123, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 46, 115, 101, 116, 67, 97, 109, 101, 114, 97, 80, 114, 111, 112, 101, 114, 116, 105, 101, 115, 40, 101, 46, 100, 101, 118, 105, 99, 101, 73, 100, 44, 101, 46, 105, 115, 70, 114, 111, 110, 116, 70, 97, 99, 105, 110, 103, 44, 101, 46, 104, 97, 115, 65, 117, 116, 111, 102, 111, 99, 117, 115, 41, 125, 100, 105, 115, 112, 111, 115, 101, 40, 41, 123, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 46, 100, 105, 115, 112, 111, 115, 101, 40, 41, 125, 101, 120, 116, 114, 97, 99, 116, 67, 101, 110, 116, 97, 117, 114, 117, 115, 76, 105, 99, 101, 110, 115, 101, 40, 101, 41, 123, 114, 101, 116, 117, 114, 110, 123, 112, 97, 121, 108, 111, 97, 100, 58, 123, 99, 101, 110, 116, 97, 117, 114, 117, 115, 58, 123, 108, 105, 99, 101, 110, 115, 101, 75, 101, 121, 58, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 76, 105, 99, 101, 110, 115, 101, 85, 116, 105, 108, 115, 46, 103, 101, 116, 66, 108, 105, 110, 107, 73, 100, 76, 105, 99, 101, 110, 115, 101, 75, 101, 121, 40, 101, 41, 125, 125, 125, 125, 99, 111, 110, 118, 101, 114, 116, 84, 111, 76, 111, 97, 100, 97, 98, 108, 101, 70, 114, 97, 109, 101, 68, 97, 116, 97, 40, 101, 41, 123, 108, 101, 116, 32, 116, 61, 116, 104, 105, 115, 46, 103, 101, 116, 78, 101, 120, 116, 70, 114, 97, 109, 101, 73, 100, 40, 41, 59, 116, 104, 105, 115, 46, 102, 114, 97, 109, 101, 68, 97, 116, 97, 80, 111, 111, 108, 46, 115, 101, 116, 40, 116, 44, 110, 101, 119, 32, 85, 105, 110, 116, 56, 67, 108, 97, 109, 112, 101, 100, 65, 114, 114, 97, 121, 40, 101, 46, 103, 101, 116, 70, 114, 97, 109, 101, 68, 97, 116, 97, 40, 41, 41, 41, 59, 108, 101, 116, 32, 114, 61, 116, 104, 105, 115, 46, 108, 97, 115, 116, 85, 115, 101, 100, 77, 111, 100, 117, 108, 101, 77, 105, 114, 114, 111, 114, 65, 120, 105, 115, 33, 61, 110, 117, 108, 108, 63, 116, 104, 105, 115, 46, 108, 97, 115, 116, 85, 115, 101, 100, 77, 111, 100, 117, 108, 101, 77, 105, 114, 114, 111, 114, 65, 120, 105, 115, 33, 61, 61, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 65, 120, 105, 115, 46, 78, 111, 110, 101, 58, 33, 49, 59, 114, 101, 116, 117, 114, 110, 123, 102, 114, 97, 109, 101, 73, 100, 58, 116, 44, 119, 105, 100, 116, 104, 58, 101, 46, 103, 101, 116, 87, 105, 100, 116, 104, 40, 41, 44, 104, 101, 105, 103, 104, 116, 58, 101, 46, 103, 101, 116, 72, 101, 105, 103, 104, 116, 40, 41, 44, 105, 115, 70, 114, 97, 109, 101, 83, 111, 117, 114, 99, 101, 77, 105, 114, 114, 111, 114, 101, 100, 58, 114, 125, 125, 114, 101, 113, 117, 101, 115, 116, 70, 114, 97, 109, 101, 68, 97, 116, 97, 40, 101, 41, 123, 108, 101, 116, 32, 116, 61, 116, 104, 105, 115, 46, 102, 114, 97, 109, 101, 68, 97, 116, 97, 80, 111, 111, 108, 46, 103, 101, 116, 40, 101, 41, 59, 114, 101, 116, 117, 114, 110, 32, 116, 61, 61, 110, 117, 108, 108, 63, 123, 112, 97, 121, 108, 111, 97, 100, 58, 123, 100, 97, 116, 97, 58, 110, 117, 108, 108, 125, 125, 58, 123, 112, 97, 121, 108, 111, 97, 100, 58, 123, 100, 97, 116, 97, 58, 116, 125, 44, 116, 114, 97, 110, 115, 102, 101, 114, 97, 98, 108, 101, 115, 58, 91, 116, 46, 98, 117, 102, 102, 101, 114, 93, 125, 125, 100, 101, 108, 101, 116, 101, 70, 114, 97, 109, 101, 68, 97, 116, 97, 40, 101, 41, 123, 116, 104, 105, 115, 46, 102, 114, 97, 109, 101, 68, 97, 116, 97, 80, 111, 111, 108, 46, 100, 101, 108, 101, 116, 101, 40, 101, 41, 125, 103, 101, 116, 78, 101, 120, 116, 70, 114, 97, 109, 101, 73, 100, 40, 41, 123, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 108, 97, 115, 116, 70, 114, 97, 109, 101, 67, 111, 117, 110, 116, 101, 114, 43, 43, 44, 116, 104, 105, 115, 46, 108, 97, 115, 116, 70, 114, 97, 109, 101, 67, 111, 117, 110, 116, 101, 114, 62, 61, 116, 104, 105, 115, 46, 77, 65, 88, 95, 78, 85, 77, 66, 69, 82, 95, 79, 70, 95, 73, 77, 65, 71, 69, 83, 95, 73, 78, 95, 70, 82, 65, 77, 69, 95, 68, 65, 84, 65, 95, 80, 79, 79, 76, 38, 38, 40, 116, 104, 105, 115, 46, 108, 97, 115, 116, 70, 114, 97, 109, 101, 67, 111, 117, 110, 116, 101, 114, 61, 48, 41, 44, 116, 104, 105, 115, 46, 108, 97, 115, 116, 70, 114, 97, 109, 101, 67, 111, 117, 110, 116, 101, 114, 125, 115, 101, 116, 86, 105, 101, 119, 40, 101, 41, 123, 116, 104, 105, 115, 46, 118, 105, 101, 119, 61, 101, 44, 116, 104, 105, 115, 46, 115, 101, 116, 86, 105, 101, 119, 82, 101, 102, 114, 101, 115, 104, 72, 97, 110, 100, 108, 101, 114, 40, 101, 41, 44, 101, 61, 61, 110, 117, 108, 108, 38, 38, 40, 116, 104, 105, 115, 46, 105, 115, 68, 114, 97, 119, 76, 111, 111, 112, 82, 117, 110, 110, 105, 110, 103, 61, 33, 49, 44, 116, 104, 105, 115, 46, 115, 101, 110, 100, 86, 105, 101, 119, 82, 101, 102, 114, 101, 115, 104, 67, 111, 109, 109, 97, 110, 100, 115, 40, 91, 93, 41, 41, 125, 99, 111, 110, 116, 101, 120, 116, 68, 105, 100, 67, 104, 97, 110, 103, 101, 83, 116, 97, 116, 117, 115, 40, 101, 41, 123, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 70, 117, 110, 99, 116, 105, 111, 110, 115, 46, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 40, 123, 116, 121, 112, 101, 58, 34, 99, 111, 110, 116, 101, 120, 116, 68, 105, 100, 67, 104, 97, 110, 103, 101, 83, 116, 97, 116, 117, 115, 34, 44, 112, 97, 121, 108, 111, 97, 100, 58, 101, 125, 41, 125, 100, 105, 100, 83, 116, 97, 114, 116, 79, 98, 115, 101, 114, 118, 105, 110, 103, 67, 111, 110, 116, 101, 120, 116, 40, 41, 123, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 70, 117, 110, 99, 116, 105, 111, 110, 115, 46, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 40, 123, 116, 121, 112, 101, 58, 34, 100, 105, 100, 83, 116, 97, 114, 116, 79, 98, 115, 101, 114, 118, 105, 110, 103, 67, 111, 110, 116, 101, 120, 116, 34, 125, 41, 125, 115, 101, 116, 86, 105, 101, 119, 82, 101, 102, 114, 101, 115, 104, 72, 97, 110, 100, 108, 101, 114, 40, 101, 41, 123, 105, 102, 40, 101, 61, 61, 110, 117, 108, 108, 124, 124, 101, 46, 105, 115, 86, 105, 101, 119, 82, 101, 102, 114, 101, 115, 104, 72, 97, 110, 100, 108, 101, 114, 83, 101, 116, 41, 114, 101, 116, 117, 114, 110, 59, 108, 101, 116, 32, 116, 61, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 78, 101, 101, 100, 115, 82, 101, 100, 114, 97, 119, 68, 101, 108, 101, 103, 97, 116, 101, 46, 101, 120, 116, 101, 110, 100, 40, 34, 78, 101, 101, 100, 115, 82, 101, 100, 114, 97, 119, 68, 101, 108, 101, 103, 97, 116, 101, 34, 44, 123, 115, 101, 116, 78, 101, 101, 100, 115, 82, 101, 100, 114, 97, 119, 73, 110, 58, 116, 104, 105, 115, 46, 115, 99, 104, 101, 100, 117, 108, 101, 82, 101, 100, 114, 97, 119, 46, 98, 105, 110, 100, 40, 116, 104, 105, 115, 44, 101, 41, 125, 41, 44, 114, 61, 110, 101, 119, 32, 116, 59, 101, 46, 115, 101, 116, 78, 101, 101, 100, 115, 82, 101, 100, 114, 97, 119, 68, 101, 108, 101, 103, 97, 116, 101, 40, 114, 41, 44, 101, 46, 105, 115, 86, 105, 101, 119, 82, 101, 102, 114, 101, 115, 104, 72, 97, 110, 100, 108, 101, 114, 83, 101, 116, 61, 33, 48, 125, 115, 99, 104, 101, 100, 117, 108, 101, 82, 101, 100, 114, 97, 119, 40, 101, 44, 116, 41, 123, 116, 104, 105, 115, 46, 97, 100, 100, 82, 101, 100, 114, 97, 119, 82, 101, 113, 117, 101, 115, 116, 40, 116, 41, 44, 116, 104, 105, 115, 46, 105, 115, 68, 114, 97, 119, 76, 111, 111, 112, 82, 117, 110, 110, 105, 110, 103, 124, 124, 116, 104, 105, 115, 46, 115, 116, 97, 114, 116, 68, 114, 97, 119, 76, 111, 111, 112, 40, 101, 41, 125, 103, 101, 116, 32, 105, 115, 68, 114, 97, 119, 76, 111, 111, 112, 82, 117, 110, 110, 105, 110, 103, 40, 41, 123, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 95, 105, 115, 68, 114, 97, 119, 76, 111, 111, 112, 82, 117, 110, 110, 105, 110, 103, 125, 115, 101, 116, 32, 105, 115, 68, 114, 97, 119, 76, 111, 111, 112, 82, 117, 110, 110, 105, 110, 103, 40, 101, 41, 123, 116, 104, 105, 115, 46, 95, 105, 115, 68, 114, 97, 119, 76, 111, 111, 112, 82, 117, 110, 110, 105, 110, 103, 61, 101, 44, 33, 101, 38, 38, 116, 121, 112, 101, 111, 102, 32, 116, 104, 105, 115, 46, 108, 111, 111, 112, 84, 105, 109, 101, 111, 117, 116, 73, 100, 61, 61, 34, 110, 117, 109, 98, 101, 114, 34, 38, 38, 40, 99, 108, 101, 97, 114, 84, 105, 109, 101, 111, 117, 116, 40, 116, 104, 105, 115, 46, 108, 111, 111, 112, 84, 105, 109, 101, 111, 117, 116, 73, 100, 41, 44, 116, 104, 105, 115, 46, 108, 111, 111, 112, 84, 105, 109, 101, 111, 117, 116, 73, 100, 61, 118, 111, 105, 100, 32, 48, 41, 125, 97, 100, 100, 82, 101, 100, 114, 97, 119, 82, 101, 113, 117, 101, 115, 116, 40, 101, 41, 123, 116, 104, 105, 115, 46, 114, 101, 100, 114, 97, 119, 82, 101, 113, 117, 101, 115, 116, 115, 46, 112, 117, 115, 104, 40, 77, 97, 116, 104, 46, 114, 111, 117, 110, 100, 40, 112, 101, 114, 102, 111, 114, 109, 97, 110, 99, 101, 46, 110, 111, 119, 40, 41, 41, 43, 101, 41, 44, 116, 104, 105, 115, 46, 114, 101, 100, 114, 97, 119, 82, 101, 113, 117, 101, 115, 116, 115, 46, 115, 111, 114, 116, 40, 40, 116, 44, 114, 41, 61, 62, 116, 45, 114, 41, 125, 115, 116, 97, 114, 116, 68, 114, 97, 119, 76, 111, 111, 112, 40, 101, 41, 123, 116, 104, 105, 115, 46, 105, 115, 68, 114, 97, 119, 76, 111, 111, 112, 82, 117, 110, 110, 105, 110, 103, 61, 33, 48, 59, 108, 101, 116, 32, 116, 61, 97, 61, 62, 116, 104, 105, 115, 46, 114, 101, 100, 114, 97, 119, 82, 101, 113, 117, 101, 115, 116, 115, 46, 108, 101, 110, 103, 116, 104, 62, 48, 38, 38, 116, 104, 105, 115, 46, 114, 101, 100, 114, 97, 119, 82, 101, 113, 117, 101, 115, 116, 115, 91, 48, 93, 60, 61, 97, 44, 114, 61, 97, 61, 62, 123, 102, 111, 114, 40, 59, 116, 104, 105, 115, 46, 114, 101, 100, 114, 97, 119, 82, 101, 113, 117, 101, 115, 116, 115, 46, 108, 101, 110, 103, 116, 104, 62, 48, 38, 38, 116, 104, 105, 115, 46, 114, 101, 100, 114, 97, 119, 82, 101, 113, 117, 101, 115, 116, 115, 91, 48, 93, 60, 61, 97, 59, 41, 116, 104, 105, 115, 46, 114, 101, 100, 114, 97, 119, 82, 101, 113, 117, 101, 115, 116, 115, 46, 115, 104, 105, 102, 116, 40, 41, 125, 44, 115, 61, 40, 41, 61, 62, 123, 116, 104, 105, 115, 46, 108, 111, 111, 112, 84, 105, 109, 101, 111, 117, 116, 73, 100, 61, 115, 101, 116, 84, 105, 109, 101, 111, 117, 116, 40, 40, 41, 61, 62, 123, 105, 102, 40, 33, 116, 104, 105, 115, 46, 105, 115, 68, 114, 97, 119, 76, 111, 111, 112, 82, 117, 110, 110, 105, 110, 103, 41, 114, 101, 116, 117, 114, 110, 59, 108, 101, 116, 32, 97, 61, 112, 101, 114, 102, 111, 114, 109, 97, 110, 99, 101, 46, 110, 111, 119, 40, 41, 59, 116, 40, 97, 41, 38, 38, 40, 114, 40, 97, 41, 44, 101, 46, 100, 114, 97, 119, 40, 41, 44, 116, 104, 105, 115, 46, 115, 101, 110, 100, 86, 105, 101, 119, 82, 101, 102, 114, 101, 115, 104, 67, 111, 109, 109, 97, 110, 100, 115, 40, 74, 83, 79, 78, 46, 112, 97, 114, 115, 101, 40, 101, 46, 103, 101, 116, 68, 114, 97, 119, 67, 111, 109, 109, 97, 110, 100, 115, 40, 41, 41, 41, 41, 44, 115, 40, 41, 125, 44, 116, 104, 105, 115, 46, 114, 101, 100, 114, 97, 119, 73, 110, 116, 101, 114, 118, 97, 108, 41, 125, 59, 115, 40, 41, 125, 115, 101, 110, 100, 86, 105, 101, 119, 82, 101, 102, 114, 101, 115, 104, 67, 111, 109, 109, 97, 110, 100, 115, 40, 101, 41, 123, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 70, 117, 110, 99, 116, 105, 111, 110, 115, 46, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 40, 123, 116, 121, 112, 101, 58, 34, 100, 114, 97, 119, 34, 44, 112, 97, 121, 108, 111, 97, 100, 58, 101, 125, 41, 125, 103, 101, 116, 87, 97, 115, 109, 68, 121, 110, 97, 109, 105, 99, 76, 105, 98, 114, 97, 114, 105, 101, 115, 40, 101, 41, 123, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 103, 101, 116, 87, 97, 115, 109, 83, 105, 100, 101, 77, 111, 100, 117, 108, 101, 70, 105, 108, 101, 78, 97, 109, 101, 40, 41, 61, 61, 110, 117, 108, 108, 63, 91, 93, 58, 91, 96, 36, 123, 101, 46, 114, 101, 112, 108, 97, 99, 101, 40, 47, 91, 94, 47, 93, 43, 92, 46, 119, 97, 115, 109, 40, 92, 63, 46, 43, 41, 63, 47, 44, 34, 34, 41, 125, 36, 123, 116, 104, 105, 115, 46, 103, 101, 116, 87, 97, 115, 109, 83, 105, 100, 101, 77, 111, 100, 117, 108, 101, 70, 105, 108, 101, 78, 97, 109, 101, 40, 41, 125, 96, 93, 125, 103, 101, 116, 87, 97, 115, 109, 67, 111, 114, 101, 69, 120, 112, 101, 99, 116, 101, 100, 72, 97, 115, 104, 40, 41, 123, 114, 101, 116, 117, 114, 110, 34, 34, 125, 103, 101, 116, 87, 97, 115, 109, 67, 111, 114, 101, 70, 105, 108, 101, 78, 97, 109, 101, 40, 41, 123, 114, 101, 116, 117, 114, 110, 34, 34, 125, 103, 101, 116, 87, 97, 115, 109, 83, 105, 100, 101, 77, 111, 100, 117, 108, 101, 70, 105, 108, 101, 78, 97, 109, 101, 40, 41, 123, 114, 101, 116, 117, 114, 110, 34, 34, 125, 97, 115, 121, 110, 99, 32, 115, 101, 116, 117, 112, 40, 101, 44, 116, 44, 114, 41, 123, 118, 97, 114, 32, 115, 59, 108, 101, 116, 32, 97, 61, 33, 49, 44, 100, 61, 33, 49, 44, 111, 61, 34, 47, 115, 99, 97, 110, 100, 105, 116, 95, 115, 121, 110, 99, 95, 102, 111, 108, 100, 101, 114, 95, 112, 114, 101, 108, 111, 97, 100, 34, 44, 104, 61, 34, 47, 115, 99, 97, 110, 100, 105, 116, 95, 115, 121, 110, 99, 95, 102, 111, 108, 100, 101, 114, 34, 44, 119, 61, 34, 114, 101, 115, 111, 117, 114, 99, 101, 115, 34, 59, 116, 104, 105, 115, 46, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 61, 114, 63, 111, 58, 104, 44, 116, 104, 105, 115, 46, 114, 101, 115, 111, 117, 114, 99, 101, 80, 97, 116, 104, 61, 96, 36, 123, 101, 125, 36, 123, 119, 125, 47, 96, 44, 115, 101, 108, 102, 46, 112, 97, 116, 104, 61, 116, 59, 108, 101, 116, 32, 105, 44, 108, 44, 110, 61, 110, 101, 119, 32, 80, 114, 111, 109, 105, 115, 101, 40, 40, 109, 44, 102, 41, 61, 62, 123, 105, 61, 109, 44, 108, 61, 102, 125, 41, 44, 117, 61, 40, 41, 61, 62, 123, 100, 38, 38, 97, 38, 38, 40, 103, 46, 97, 112, 112, 108, 121, 40, 116, 104, 105, 115, 41, 44, 116, 104, 105, 115, 46, 109, 111, 100, 117, 108, 101, 72, 97, 110, 100, 108, 101, 114, 46, 103, 101, 116, 40, 41, 46, 99, 97, 108, 108, 77, 97, 105, 110, 40, 41, 44, 105, 40, 41, 41, 125, 59, 102, 117, 110, 99, 116, 105, 111, 110, 32, 103, 40, 41, 123, 108, 101, 116, 32, 109, 61, 116, 104, 105, 115, 46, 109, 111, 100, 117, 108, 101, 72, 97, 110, 100, 108, 101, 114, 46, 103, 101, 116, 40, 41, 44, 102, 61, 109, 46, 68, 97, 116, 97, 68, 101, 99, 111, 100, 105, 110, 103, 46, 101, 120, 116, 101, 110, 100, 40, 34, 68, 97, 116, 97, 68, 101, 99, 111, 100, 105, 110, 103, 34, 44, 123, 100, 101, 99, 111, 100, 101, 40, 67, 44, 70, 41, 123, 116, 114, 121, 123, 108, 101, 116, 32, 95, 61, 74, 83, 79, 78, 46, 112, 97, 114, 115, 101, 40, 70, 41, 44, 84, 61, 91, 93, 59, 102, 111, 114, 40, 108, 101, 116, 32, 87, 32, 111, 102, 32, 95, 41, 123, 108, 101, 116, 32, 66, 61, 110, 101, 119, 32, 84, 101, 120, 116, 68, 101, 99, 111, 100, 101, 114, 40, 87, 46, 105, 97, 110, 97, 78, 97, 109, 101, 44, 123, 102, 97, 116, 97, 108, 58, 33, 48, 125, 41, 59, 84, 46, 112, 117, 115, 104, 40, 66, 46, 100, 101, 99, 111, 100, 101, 40, 67, 46, 115, 108, 105, 99, 101, 40, 87, 46, 115, 116, 97, 114, 116, 73, 110, 100, 101, 120, 44, 87, 46, 101, 110, 100, 73, 110, 100, 101, 120, 41, 41, 41, 125, 114, 101, 116, 117, 114, 110, 32, 84, 46, 106, 111, 105, 110, 40, 34, 34, 41, 125, 99, 97, 116, 99, 104, 40, 95, 41, 123, 114, 101, 116, 117, 114, 110, 34, 34, 125, 125, 125, 41, 44, 118, 61, 110, 101, 119, 32, 102, 59, 109, 46, 115, 101, 116, 68, 97, 116, 97, 68, 101, 99, 111, 100, 105, 110, 103, 40, 118, 41, 125, 108, 101, 116, 32, 121, 61, 80, 46, 115, 100, 107, 86, 101, 114, 115, 105, 111, 110, 40, 41, 59, 105, 102, 40, 121, 61, 61, 61, 34, 34, 41, 116, 104, 114, 111, 119, 32, 110, 101, 119, 32, 82, 40, 123, 110, 97, 109, 101, 58, 34, 73, 110, 118, 97, 108, 105, 100, 32, 108, 105, 98, 114, 97, 114, 121, 32, 118, 101, 114, 115, 105, 111, 110, 34, 44, 109, 101, 115, 115, 97, 103, 101, 58, 34, 76, 105, 98, 114, 97, 114, 121, 32, 118, 101, 114, 115, 105, 111, 110, 32, 105, 115, 32, 110, 111, 116, 32, 100, 101, 102, 105, 110, 101, 100, 32, 111, 114, 32, 101, 109, 112, 116, 121, 44, 32, 99, 97, 110, 110, 111, 116, 32, 103, 101, 110, 101, 114, 97, 116, 101, 32, 112, 114, 111, 112, 101, 114, 32, 112, 97, 116, 104, 32, 116, 111, 32, 108, 105, 98, 114, 97, 114, 121, 32, 102, 105, 108, 101, 115, 46, 34, 125, 41, 59, 108, 101, 116, 32, 98, 61, 33, 49, 44, 68, 61, 75, 40, 121, 44, 101, 44, 116, 104, 105, 115, 46, 103, 101, 116, 87, 97, 115, 109, 67, 111, 114, 101, 70, 105, 108, 101, 78, 97, 109, 101, 40, 41, 44, 98, 41, 44, 123, 106, 115, 85, 82, 73, 58, 83, 125, 61, 68, 44, 123, 119, 97, 115, 109, 85, 82, 73, 58, 107, 125, 61, 68, 59, 116, 104, 105, 115, 46, 109, 111, 100, 117, 108, 101, 72, 97, 110, 100, 108, 101, 114, 46, 115, 101, 116, 40, 123, 99, 97, 110, 118, 97, 115, 58, 40, 115, 61, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 70, 117, 110, 99, 116, 105, 111, 110, 115, 46, 103, 101, 116, 79, 102, 102, 115, 99, 114, 101, 101, 110, 67, 97, 110, 118, 97, 115, 40, 41, 41, 33, 61, 110, 117, 108, 108, 63, 115, 58, 123, 103, 101, 116, 67, 111, 110, 116, 101, 120, 116, 58, 40, 41, 61, 62, 110, 117, 108, 108, 125, 44, 105, 110, 115, 116, 97, 110, 116, 105, 97, 116, 101, 87, 97, 115, 109, 58, 40, 109, 44, 102, 41, 61, 62, 40, 72, 40, 109, 44, 107, 44, 116, 104, 105, 115, 46, 103, 101, 116, 87, 97, 115, 109, 67, 111, 114, 101, 69, 120, 112, 101, 99, 116, 101, 100, 72, 97, 115, 104, 40, 41, 44, 102, 41, 44, 123, 125, 41, 44, 100, 121, 110, 97, 109, 105, 99, 76, 105, 98, 114, 97, 114, 105, 101, 115, 58, 116, 104, 105, 115, 46, 103, 101, 116, 87, 97, 115, 109, 68, 121, 110, 97, 109, 105, 99, 76, 105, 98, 114, 97, 114, 105, 101, 115, 40, 107, 41, 44, 110, 111, 73, 110, 105, 116, 105, 97, 108, 82, 117, 110, 58, 33, 48, 44, 112, 114, 101, 82, 117, 110, 58, 91, 97, 115, 121, 110, 99, 40, 41, 61, 62, 123, 116, 114, 121, 123, 97, 119, 97, 105, 116, 32, 86, 40, 123, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 80, 114, 101, 108, 111, 97, 100, 58, 111, 44, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 83, 116, 97, 110, 100, 97, 114, 100, 58, 104, 44, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 58, 116, 104, 105, 115, 46, 119, 114, 105, 116, 97, 98, 108, 101, 68, 97, 116, 97, 80, 97, 116, 104, 44, 112, 114, 101, 108, 111, 97, 100, 105, 110, 103, 58, 114, 125, 41, 125, 99, 97, 116, 99, 104, 40, 109, 41, 123, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 68, 101, 98, 117, 103, 44, 34, 78, 111, 32, 73, 110, 100, 101, 120, 101, 100, 68, 66, 32, 115, 117, 112, 112, 111, 114, 116, 44, 32, 115, 111, 109, 101, 32, 100, 97, 116, 97, 32, 119, 105, 108, 108, 32, 110, 111, 116, 32, 98, 101, 32, 112, 101, 114, 115, 105, 115, 116, 101, 100, 58, 34, 44, 109, 41, 125, 100, 61, 33, 48, 44, 117, 40, 41, 125, 93, 44, 111, 110, 82, 117, 110, 116, 105, 109, 101, 73, 110, 105, 116, 105, 97, 108, 105, 122, 101, 100, 58, 40, 41, 61, 62, 123, 97, 61, 33, 48, 44, 117, 40, 41, 125, 125, 41, 59, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 76, 40, 109, 41, 123, 118, 97, 114, 32, 102, 59, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 118, 40, 41, 123, 114, 101, 116, 117, 114, 110, 32, 105, 109, 112, 111, 114, 116, 83, 99, 114, 105, 112, 116, 115, 40, 109, 41, 125, 116, 114, 121, 123, 97, 119, 97, 105, 116, 32, 78, 40, 118, 44, 50, 53, 48, 44, 52, 101, 51, 44, 70, 61, 62, 123, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 87, 97, 114, 110, 44, 70, 41, 44, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 87, 97, 114, 110, 44, 96, 67, 111, 117, 108, 100, 110, 39, 116, 32, 114, 101, 116, 114, 105, 101, 118, 101, 32, 83, 99, 97, 110, 100, 105, 116, 32, 68, 97, 116, 97, 32, 67, 97, 112, 116, 117, 114, 101, 32, 108, 105, 98, 114, 97, 114, 121, 32, 97, 116, 32, 36, 123, 109, 125, 44, 32, 114, 101, 116, 114, 121, 105, 110, 103, 46, 46, 46, 96, 41, 125, 41, 59, 108, 101, 116, 32, 67, 61, 40, 102, 61, 115, 101, 108, 102, 46, 83, 68, 67, 95, 87, 65, 83, 77, 95, 74, 83, 95, 86, 69, 82, 83, 73, 79, 78, 41, 33, 61, 110, 117, 108, 108, 63, 102, 58, 34, 117, 110, 100, 101, 102, 105, 110, 101, 100, 34, 59, 114, 101, 116, 117, 114, 110, 32, 67, 33, 61, 61, 121, 38, 38, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 87, 97, 114, 110, 44, 96, 84, 104, 101, 32, 83, 99, 97, 110, 100, 105, 116, 32, 68, 97, 116, 97, 32, 67, 97, 112, 116, 117, 114, 101, 32, 108, 105, 98, 114, 97, 114, 121, 32, 74, 83, 32, 102, 105, 108, 101, 32, 102, 111, 117, 110, 100, 32, 97, 116, 32, 36, 123, 109, 125, 32, 115, 101, 101, 109, 115, 32, 105, 110, 118, 97, 108, 105, 100, 58, 32, 101, 120, 112, 101, 99, 116, 101, 100, 32, 118, 101, 114, 115, 105, 111, 110, 32, 100, 111, 101, 115, 110, 39, 116, 32, 109, 97, 116, 99, 104, 32, 40, 114, 101, 99, 101, 105, 118, 101, 100, 58, 32, 36, 123, 67, 125, 44, 32, 101, 120, 112, 101, 99, 116, 101, 100, 58, 32, 36, 123, 121, 125, 41, 46, 32, 80, 108, 101, 97, 115, 101, 32, 101, 110, 115, 117, 114, 101, 32, 116, 104, 101, 32, 99, 111, 114, 114, 101, 99, 116, 32, 83, 99, 97, 110, 100, 105, 116, 32, 68, 97, 116, 97, 32, 67, 97, 112, 116, 117, 114, 101, 32, 102, 105, 108, 101, 32, 40, 119, 105, 116, 104, 32, 99, 111, 114, 114, 101, 99, 116, 32, 118, 101, 114, 115, 105, 111, 110, 41, 32, 105, 115, 32, 114, 101, 116, 114, 105, 101, 118, 101, 100, 46, 96, 41, 44, 33, 48, 125, 99, 97, 116, 99, 104, 40, 67, 41, 123, 114, 101, 116, 117, 114, 110, 32, 99, 46, 108, 111, 103, 40, 99, 46, 76, 101, 118, 101, 108, 46, 69, 114, 114, 111, 114, 44, 67, 41, 44, 33, 49, 125, 125, 114, 101, 116, 117, 114, 110, 32, 97, 119, 97, 105, 116, 32, 76, 40, 83, 41, 124, 124, 108, 40, 96, 67, 111, 117, 108, 100, 110, 39, 116, 32, 114, 101, 116, 114, 105, 101, 118, 101, 32, 83, 99, 97, 110, 100, 105, 116, 32, 68, 97, 116, 97, 32, 67, 97, 112, 116, 117, 114, 101, 32, 108, 105, 98, 114, 97, 114, 121, 32, 97, 116, 32, 36, 123, 83, 125, 44, 32, 100, 105, 100, 32, 121, 111, 117, 32, 99, 111, 110, 102, 105, 103, 117, 114, 101, 32, 116, 104, 101, 32, 112, 97, 116, 104, 32, 102, 111, 114, 32, 105, 116, 32, 99, 111, 114, 114, 101, 99, 116, 108, 121, 63, 96, 41, 44, 110, 125, 109, 97, 112, 77, 105, 114, 114, 111, 114, 65, 120, 105, 115, 79, 110, 77, 111, 100, 117, 108, 101, 40, 101, 41, 123, 115, 119, 105, 116, 99, 104, 40, 101, 41, 123, 99, 97, 115, 101, 34, 78, 111, 110, 101, 34, 58, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 65, 120, 105, 115, 46, 78, 111, 110, 101, 59, 99, 97, 115, 101, 34, 88, 34, 58, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 65, 120, 105, 115, 46, 88, 59, 99, 97, 115, 101, 34, 89, 34, 58, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 65, 120, 105, 115, 46, 89, 59, 100, 101, 102, 97, 117, 108, 116, 58, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 65, 120, 105, 115, 46, 78, 111, 110, 101, 125, 125, 125, 59, 102, 117, 110, 99, 116, 105, 111, 110, 32, 88, 40, 101, 41, 123, 99, 111, 110, 115, 111, 108, 101, 46, 119, 97, 114, 110, 40, 34, 82, 101, 97, 99, 104, 101, 100, 32, 117, 110, 101, 120, 112, 101, 99, 116, 101, 100, 32, 99, 97, 115, 101, 34, 41, 125, 118, 97, 114, 32, 65, 61, 99, 108, 97, 115, 115, 123, 99, 111, 110, 115, 116, 114, 117, 99, 116, 111, 114, 40, 101, 44, 116, 41, 123, 112, 40, 116, 104, 105, 115, 44, 34, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 34, 41, 44, 112, 40, 116, 104, 105, 115, 44, 34, 119, 111, 114, 107, 101, 114, 83, 101, 108, 102, 34, 41, 44, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 83, 101, 108, 102, 61, 101, 44, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 61, 110, 101, 119, 32, 73, 40, 116, 44, 123, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 58, 116, 104, 105, 115, 46, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 46, 98, 105, 110, 100, 40, 116, 104, 105, 115, 41, 44, 103, 101, 116, 79, 102, 102, 115, 99, 114, 101, 101, 110, 67, 97, 110, 118, 97, 115, 58, 116, 104, 105, 115, 46, 103, 101, 116, 79, 102, 102, 115, 99, 114, 101, 101, 110, 67, 97, 110, 118, 97, 115, 46, 98, 105, 110, 100, 40, 116, 104, 105, 115, 41, 125, 41, 44, 116, 104, 105, 115, 46, 108, 105, 115, 116, 101, 110, 84, 111, 77, 101, 115, 115, 97, 103, 101, 115, 40, 41, 125, 108, 105, 115, 116, 101, 110, 84, 111, 77, 101, 115, 115, 97, 103, 101, 115, 40, 41, 123, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 83, 101, 108, 102, 46, 111, 110, 109, 101, 115, 115, 97, 103, 101, 61, 116, 104, 105, 115, 46, 111, 110, 77, 101, 115, 115, 97, 103, 101, 46, 98, 105, 110, 100, 40, 116, 104, 105, 115, 41, 125, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 40, 101, 44, 116, 41, 123, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 83, 101, 108, 102, 46, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 40, 101, 44, 116, 33, 61, 110, 117, 108, 108, 63, 116, 58, 91, 93, 41, 125, 103, 101, 116, 79, 102, 102, 115, 99, 114, 101, 101, 110, 67, 97, 110, 118, 97, 115, 40, 41, 123, 105, 102, 40, 116, 121, 112, 101, 111, 102, 32, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 83, 101, 108, 102, 46, 79, 102, 102, 115, 99, 114, 101, 101, 110, 67, 97, 110, 118, 97, 115, 61, 61, 34, 102, 117, 110, 99, 116, 105, 111, 110, 34, 41, 114, 101, 116, 117, 114, 110, 32, 110, 101, 119, 32, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 83, 101, 108, 102, 46, 79, 102, 102, 115, 99, 114, 101, 101, 110, 67, 97, 110, 118, 97, 115, 40, 51, 50, 44, 51, 50, 41, 125, 104, 97, 115, 80, 97, 121, 108, 111, 97, 100, 40, 101, 41, 123, 114, 101, 116, 117, 114, 110, 32, 101, 33, 61, 61, 110, 117, 108, 108, 38, 38, 116, 121, 112, 101, 111, 102, 32, 101, 61, 61, 34, 111, 98, 106, 101, 99, 116, 34, 38, 38, 34, 112, 97, 121, 108, 111, 97, 100, 34, 105, 110, 32, 101, 125, 104, 97, 115, 84, 114, 97, 110, 115, 102, 101, 114, 97, 98, 108, 101, 115, 40, 101, 41, 123, 114, 101, 116, 117, 114, 110, 32, 101, 33, 61, 61, 110, 117, 108, 108, 38, 38, 116, 121, 112, 101, 111, 102, 32, 101, 61, 61, 34, 111, 98, 106, 101, 99, 116, 34, 38, 38, 34, 116, 114, 97, 110, 115, 102, 101, 114, 97, 98, 108, 101, 115, 34, 105, 110, 32, 101, 38, 38, 65, 114, 114, 97, 121, 46, 105, 115, 65, 114, 114, 97, 121, 40, 101, 46, 116, 114, 97, 110, 115, 102, 101, 114, 97, 98, 108, 101, 115, 41, 125, 97, 115, 121, 110, 99, 32, 114, 101, 115, 112, 111, 110, 100, 87, 105, 116, 104, 40, 101, 44, 116, 44, 114, 41, 123, 108, 101, 116, 32, 115, 61, 110, 117, 108, 108, 44, 97, 59, 116, 114, 121, 123, 97, 61, 114, 40, 41, 44, 97, 32, 105, 110, 115, 116, 97, 110, 99, 101, 111, 102, 32, 80, 114, 111, 109, 105, 115, 101, 38, 38, 40, 97, 61, 97, 119, 97, 105, 116, 32, 97, 41, 125, 99, 97, 116, 99, 104, 40, 111, 41, 123, 97, 61, 118, 111, 105, 100, 32, 48, 44, 115, 61, 116, 121, 112, 101, 111, 102, 32, 111, 46, 116, 111, 83, 116, 114, 105, 110, 103, 61, 61, 34, 102, 117, 110, 99, 116, 105, 111, 110, 34, 63, 111, 46, 116, 111, 83, 116, 114, 105, 110, 103, 40, 41, 58, 34, 117, 110, 107, 110, 111, 119, 32, 101, 114, 114, 111, 114, 34, 125, 108, 101, 116, 32, 100, 61, 123, 116, 121, 112, 101, 58, 34, 119, 111, 114, 107, 101, 114, 84, 97, 115, 107, 73, 100, 34, 44, 99, 111, 109, 109, 97, 110, 100, 58, 101, 44, 105, 100, 58, 116, 44, 112, 97, 121, 108, 111, 97, 100, 58, 116, 104, 105, 115, 46, 104, 97, 115, 80, 97, 121, 108, 111, 97, 100, 40, 97, 41, 63, 97, 46, 112, 97, 121, 108, 111, 97, 100, 58, 118, 111, 105, 100, 32, 48, 125, 59, 115, 33, 61, 110, 117, 108, 108, 38, 38, 40, 100, 46, 101, 114, 114, 111, 114, 61, 115, 41, 44, 116, 104, 105, 115, 46, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 40, 100, 44, 116, 104, 105, 115, 46, 104, 97, 115, 84, 114, 97, 110, 115, 102, 101, 114, 97, 98, 108, 101, 115, 40, 97, 41, 63, 97, 46, 116, 114, 97, 110, 115, 102, 101, 114, 97, 98, 108, 101, 115, 58, 91, 93, 41, 125, 111, 110, 77, 101, 115, 115, 97, 103, 101, 40, 101, 41, 123, 115, 119, 105, 116, 99, 104, 40, 101, 46, 100, 97, 116, 97, 46, 99, 111, 109, 109, 97, 110, 100, 41, 123, 99, 97, 115, 101, 34, 108, 111, 97, 100, 76, 105, 98, 114, 97, 114, 121, 34, 58, 123, 108, 101, 116, 123, 100, 97, 116, 97, 58, 116, 125, 61, 101, 59, 116, 104, 105, 115, 46, 114, 101, 115, 112, 111, 110, 100, 87, 105, 116, 104, 40, 101, 46, 100, 97, 116, 97, 46, 99, 111, 109, 109, 97, 110, 100, 44, 116, 46, 105, 100, 44, 40, 41, 61, 62, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 108, 111, 97, 100, 76, 105, 98, 114, 97, 114, 121, 40, 123, 108, 105, 98, 114, 97, 114, 121, 76, 111, 99, 97, 116, 105, 111, 110, 58, 116, 46, 108, 105, 98, 114, 97, 114, 121, 76, 111, 99, 97, 116, 105, 111, 110, 44, 108, 111, 99, 97, 116, 105, 111, 110, 80, 97, 116, 104, 58, 116, 46, 108, 111, 99, 97, 116, 105, 111, 110, 80, 97, 116, 104, 44, 112, 114, 101, 108, 111, 97, 100, 69, 110, 103, 105, 110, 101, 58, 116, 46, 112, 114, 101, 108, 111, 97, 100, 69, 110, 103, 105, 110, 101, 125, 41, 41, 125, 98, 114, 101, 97, 107, 59, 99, 97, 115, 101, 34, 99, 114, 101, 97, 116, 101, 67, 111, 110, 116, 101, 120, 116, 34, 58, 123, 108, 101, 116, 123, 100, 97, 116, 97, 58, 116, 125, 61, 101, 59, 116, 104, 105, 115, 46, 114, 101, 115, 112, 111, 110, 100, 87, 105, 116, 104, 40, 101, 46, 100, 97, 116, 97, 46, 99, 111, 109, 109, 97, 110, 100, 44, 116, 46, 105, 100, 44, 40, 41, 61, 62, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 99, 114, 101, 97, 116, 101, 67, 111, 110, 116, 101, 120, 116, 40, 123, 99, 111, 110, 116, 101, 120, 116, 58, 116, 46, 99, 111, 110, 116, 101, 120, 116, 44, 100, 101, 118, 105, 99, 101, 73, 100, 58, 116, 46, 100, 101, 118, 105, 99, 101, 73, 100, 44, 100, 111, 109, 97, 105, 110, 58, 116, 46, 100, 111, 109, 97, 105, 110, 44, 100, 101, 108, 97, 121, 101, 100, 82, 101, 103, 105, 115, 116, 114, 97, 116, 105, 111, 110, 58, 116, 46, 100, 101, 108, 97, 121, 101, 100, 82, 101, 103, 105, 115, 116, 114, 97, 116, 105, 111, 110, 44, 104, 105, 103, 104, 69, 110, 100, 66, 108, 117, 114, 114, 121, 82, 101, 99, 111, 103, 110, 105, 116, 105, 111, 110, 58, 116, 46, 104, 105, 103, 104, 69, 110, 100, 66, 108, 117, 114, 114, 121, 82, 101, 99, 111, 103, 110, 105, 116, 105, 111, 110, 125, 41, 41, 125, 98, 114, 101, 97, 107, 59, 99, 97, 115, 101, 34, 115, 101, 116, 70, 114, 97, 109, 101, 83, 111, 117, 114, 99, 101, 34, 58, 123, 108, 101, 116, 123, 100, 97, 116, 97, 58, 116, 125, 61, 101, 59, 116, 104, 105, 115, 46, 114, 101, 115, 112, 111, 110, 100, 87, 105, 116, 104, 40, 101, 46, 100, 97, 116, 97, 46, 99, 111, 109, 109, 97, 110, 100, 44, 116, 46, 105, 100, 44, 40, 41, 61, 62, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 115, 101, 116, 70, 114, 97, 109, 101, 83, 111, 117, 114, 99, 101, 40, 116, 46, 109, 105, 114, 114, 111, 114, 65, 120, 105, 115, 41, 41, 125, 98, 114, 101, 97, 107, 59, 99, 97, 115, 101, 34, 112, 114, 111, 99, 101, 115, 115, 70, 114, 97, 109, 101, 34, 58, 123, 108, 101, 116, 123, 100, 97, 116, 97, 58, 116, 125, 61, 101, 59, 116, 104, 105, 115, 46, 114, 101, 115, 112, 111, 110, 100, 87, 105, 116, 104, 40, 116, 46, 99, 111, 109, 109, 97, 110, 100, 44, 116, 46, 105, 100, 44, 40, 41, 61, 62, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 112, 114, 111, 99, 101, 115, 115, 70, 114, 97, 109, 101, 40, 123, 100, 97, 116, 97, 58, 116, 46, 100, 97, 116, 97, 44, 119, 105, 100, 116, 104, 58, 116, 46, 119, 105, 100, 116, 104, 44, 104, 101, 105, 103, 104, 116, 58, 116, 46, 104, 101, 105, 103, 104, 116, 125, 41, 41, 59, 98, 114, 101, 97, 107, 125, 99, 97, 115, 101, 34, 114, 101, 113, 117, 101, 115, 116, 70, 114, 97, 109, 101, 68, 97, 116, 97, 34, 58, 123, 108, 101, 116, 123, 100, 97, 116, 97, 58, 116, 125, 61, 101, 59, 116, 104, 105, 115, 46, 114, 101, 115, 112, 111, 110, 100, 87, 105, 116, 104, 40, 116, 46, 99, 111, 109, 109, 97, 110, 100, 44, 116, 46, 105, 100, 44, 40, 41, 61, 62, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 114, 101, 113, 117, 101, 115, 116, 70, 114, 97, 109, 101, 68, 97, 116, 97, 40, 116, 46, 102, 114, 97, 109, 101, 73, 100, 41, 41, 59, 98, 114, 101, 97, 107, 125, 99, 97, 115, 101, 34, 100, 101, 108, 101, 116, 101, 70, 114, 97, 109, 101, 68, 97, 116, 97, 34, 58, 123, 108, 101, 116, 123, 100, 97, 116, 97, 58, 116, 125, 61, 101, 59, 116, 104, 105, 115, 46, 114, 101, 115, 112, 111, 110, 100, 87, 105, 116, 104, 40, 116, 46, 99, 111, 109, 109, 97, 110, 100, 44, 116, 46, 105, 100, 44, 40, 41, 61, 62, 123, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 100, 101, 108, 101, 116, 101, 70, 114, 97, 109, 101, 68, 97, 116, 97, 40, 116, 46, 102, 114, 97, 109, 101, 73, 100, 41, 125, 41, 59, 98, 114, 101, 97, 107, 125, 99, 97, 115, 101, 34, 117, 112, 100, 97, 116, 101, 67, 111, 110, 116, 101, 120, 116, 34, 58, 123, 108, 101, 116, 123, 100, 97, 116, 97, 58, 116, 125, 61, 101, 59, 116, 104, 105, 115, 46, 114, 101, 115, 112, 111, 110, 100, 87, 105, 116, 104, 40, 101, 46, 100, 97, 116, 97, 46, 99, 111, 109, 109, 97, 110, 100, 44, 116, 46, 105, 100, 44, 40, 41, 61, 62, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 117, 112, 100, 97, 116, 101, 67, 111, 110, 116, 101, 120, 116, 40, 116, 41, 41, 125, 98, 114, 101, 97, 107, 59, 99, 97, 115, 101, 34, 100, 105, 115, 112, 111, 115, 101, 34, 58, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 100, 105, 115, 112, 111, 115, 101, 40, 41, 59, 98, 114, 101, 97, 107, 59, 99, 97, 115, 101, 34, 114, 101, 112, 111, 114, 116, 67, 97, 109, 101, 114, 97, 80, 114, 111, 112, 101, 114, 116, 105, 101, 115, 34, 58, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 114, 101, 112, 111, 114, 116, 67, 97, 109, 101, 114, 97, 80, 114, 111, 112, 101, 114, 116, 105, 101, 115, 40, 101, 46, 100, 97, 116, 97, 41, 59, 98, 114, 101, 97, 107, 59, 99, 97, 115, 101, 34, 115, 101, 116, 76, 111, 103, 76, 101, 118, 101, 108, 34, 58, 99, 46, 115, 101, 116, 76, 101, 118, 101, 108, 40, 101, 46, 100, 97, 116, 97, 46, 108, 101, 118, 101, 108, 41, 59, 98, 114, 101, 97, 107, 59, 99, 97, 115, 101, 34, 101, 120, 116, 114, 97, 99, 116, 67, 101, 110, 116, 97, 117, 114, 117, 115, 76, 105, 99, 101, 110, 115, 101, 34, 58, 123, 108, 101, 116, 123, 100, 97, 116, 97, 58, 116, 125, 61, 101, 59, 116, 104, 105, 115, 46, 114, 101, 115, 112, 111, 110, 100, 87, 105, 116, 104, 40, 101, 46, 100, 97, 116, 97, 46, 99, 111, 109, 109, 97, 110, 100, 44, 116, 46, 105, 100, 44, 40, 41, 61, 62, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 101, 120, 116, 114, 97, 99, 116, 67, 101, 110, 116, 97, 117, 114, 117, 115, 76, 105, 99, 101, 110, 115, 101, 40, 116, 46, 108, 105, 99, 101, 110, 115, 101, 75, 101, 121, 41, 41, 125, 98, 114, 101, 97, 107, 59, 100, 101, 102, 97, 117, 108, 116, 58, 114, 101, 116, 117, 114, 110, 32, 88, 40, 101, 46, 100, 97, 116, 97, 41, 44, 33, 49, 125, 114, 101, 116, 117, 114, 110, 33, 48, 125, 125, 44, 89, 61, 110, 101, 119, 32, 65, 40, 115, 101, 108, 102, 44, 123, 103, 101, 116, 58, 40, 41, 61, 62, 115, 101, 108, 102, 46, 77, 111, 100, 117, 108, 101, 44, 115, 101, 116, 58, 101, 61, 62, 123, 115, 101, 108, 102, 46, 77, 111, 100, 117, 108, 101, 61, 101, 125, 125, 41, 59, 118, 97, 114, 32, 120, 61, 99, 108, 97, 115, 115, 32, 101, 120, 116, 101, 110, 100, 115, 32, 73, 123, 99, 111, 110, 115, 116, 114, 117, 99, 116, 111, 114, 40, 114, 44, 115, 41, 123, 115, 117, 112, 101, 114, 40, 114, 44, 115, 41, 59, 77, 40, 116, 104, 105, 115, 44, 34, 98, 97, 114, 99, 111, 100, 101, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 34, 41, 125, 99, 114, 101, 97, 116, 101, 66, 108, 117, 114, 114, 121, 84, 97, 98, 108, 101, 40, 114, 41, 123, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 66, 108, 117, 114, 114, 121, 84, 97, 98, 108, 101, 67, 114, 101, 97, 116, 111, 114, 46, 99, 114, 101, 97, 116, 101, 84, 97, 98, 108, 101, 115, 40, 116, 104, 105, 115, 46, 99, 111, 110, 116, 101, 120, 116, 44, 114, 41, 44, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 70, 117, 110, 99, 116, 105, 111, 110, 115, 46, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 40, 123, 116, 121, 112, 101, 58, 34, 99, 114, 101, 97, 116, 101, 66, 108, 117, 114, 114, 121, 84, 97, 98, 108, 101, 82, 101, 115, 117, 108, 116, 34, 44, 112, 97, 121, 108, 111, 97, 100, 58, 123, 115, 121, 109, 98, 111, 108, 111, 103, 121, 58, 114, 125, 125, 41, 125, 103, 101, 116, 77, 111, 100, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 115, 40, 41, 123, 116, 104, 105, 115, 46, 98, 97, 114, 99, 111, 100, 101, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 61, 110, 101, 119, 32, 69, 40, 116, 104, 105, 115, 44, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 44, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 70, 117, 110, 99, 116, 105, 111, 110, 115, 41, 59, 108, 101, 116, 32, 114, 61, 115, 117, 112, 101, 114, 46, 103, 101, 116, 77, 111, 100, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 115, 40, 41, 59, 114, 101, 116, 117, 114, 110, 32, 114, 46, 112, 117, 115, 104, 95, 98, 97, 99, 107, 40, 116, 104, 105, 115, 46, 98, 97, 114, 99, 111, 100, 101, 67, 97, 112, 116, 117, 114, 101, 77, 111, 100, 101, 46, 103, 101, 116, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 40, 41, 41, 44, 114, 125, 103, 101, 116, 87, 97, 115, 109, 83, 105, 100, 101, 77, 111, 100, 117, 108, 101, 70, 105, 108, 101, 78, 97, 109, 101, 40, 41, 123, 114, 101, 116, 117, 114, 110, 34, 34, 125, 103, 101, 116, 87, 97, 115, 109, 67, 111, 114, 101, 70, 105, 108, 101, 78, 97, 109, 101, 40, 41, 123, 114, 101, 116, 117, 114, 110, 34, 115, 99, 97, 110, 100, 105, 116, 45, 100, 97, 116, 97, 99, 97, 112, 116, 117, 114, 101, 45, 115, 100, 107, 45, 98, 97, 114, 99, 111, 100, 101, 46, 119, 97, 115, 109, 34, 125, 103, 101, 116, 87, 97, 115, 109, 67, 111, 114, 101, 69, 120, 112, 101, 99, 116, 101, 100, 72, 97, 115, 104, 40, 41, 123, 114, 101, 116, 117, 114, 110, 34, 100, 99, 57, 53, 55, 100, 99, 53, 49, 55, 57, 57, 97, 97, 102, 49, 97, 102, 99, 102, 53, 98, 56, 54, 101, 55, 100, 49, 52, 55, 51, 101, 101, 99, 57, 56, 56, 57, 99, 51, 55, 52, 99, 55, 55, 52, 99, 55, 52, 97, 52, 102, 101, 51, 98, 100, 98, 52, 48, 97, 55, 101, 99, 55, 34, 125, 125, 44, 69, 61, 99, 108, 97, 115, 115, 123, 99, 111, 110, 115, 116, 114, 117, 99, 116, 111, 114, 40, 116, 44, 114, 44, 115, 41, 123, 77, 40, 116, 104, 105, 115, 44, 34, 98, 97, 114, 99, 111, 100, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 34, 41, 59, 77, 40, 116, 104, 105, 115, 44, 34, 108, 105, 115, 116, 101, 110, 101, 114, 83, 101, 116, 34, 44, 33, 49, 41, 59, 77, 40, 116, 104, 105, 115, 44, 34, 99, 111, 114, 101, 69, 110, 103, 105, 110, 101, 34, 41, 59, 77, 40, 116, 104, 105, 115, 44, 34, 77, 111, 100, 117, 108, 101, 34, 41, 59, 77, 40, 116, 104, 105, 115, 44, 34, 119, 111, 114, 107, 101, 114, 70, 117, 110, 99, 116, 105, 111, 110, 115, 34, 41, 59, 116, 104, 105, 115, 46, 99, 111, 114, 101, 69, 110, 103, 105, 110, 101, 61, 116, 44, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 61, 114, 44, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 70, 117, 110, 99, 116, 105, 111, 110, 115, 61, 115, 44, 116, 104, 105, 115, 46, 115, 101, 116, 117, 112, 40, 41, 125, 115, 101, 116, 117, 112, 40, 41, 123, 108, 101, 116, 32, 116, 61, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 66, 97, 114, 99, 111, 100, 101, 67, 97, 112, 116, 117, 114, 101, 76, 105, 115, 116, 101, 110, 101, 114, 46, 101, 120, 116, 101, 110, 100, 40, 34, 66, 97, 114, 99, 111, 100, 101, 67, 97, 112, 116, 117, 114, 101, 76, 105, 115, 116, 101, 110, 101, 114, 34, 44, 123, 100, 105, 100, 83, 99, 97, 110, 58, 40, 97, 44, 100, 44, 111, 41, 61, 62, 123, 116, 104, 105, 115, 46, 100, 105, 100, 83, 99, 97, 110, 40, 100, 44, 111, 41, 125, 44, 100, 105, 100, 85, 112, 100, 97, 116, 101, 83, 101, 115, 115, 105, 111, 110, 58, 40, 97, 44, 100, 41, 61, 62, 123, 116, 104, 105, 115, 46, 100, 105, 100, 85, 112, 100, 97, 116, 101, 83, 101, 115, 115, 105, 111, 110, 40, 100, 41, 125, 125, 41, 44, 114, 61, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 70, 101, 101, 100, 98, 97, 99, 107, 46, 101, 120, 116, 101, 110, 100, 40, 34, 70, 101, 101, 100, 98, 97, 99, 107, 34, 44, 123, 101, 109, 105, 116, 58, 40, 41, 61, 62, 123, 116, 104, 105, 115, 46, 115, 117, 99, 99, 101, 115, 115, 70, 101, 101, 100, 98, 97, 99, 107, 40, 41, 125, 125, 41, 44, 115, 61, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 66, 97, 114, 99, 111, 100, 101, 67, 97, 112, 116, 117, 114, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 76, 105, 115, 116, 101, 110, 101, 114, 46, 101, 120, 116, 101, 110, 100, 40, 34, 66, 97, 114, 99, 111, 100, 101, 67, 97, 112, 116, 117, 114, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 76, 105, 115, 116, 101, 110, 101, 114, 34, 44, 123, 111, 110, 77, 111, 100, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 97, 116, 105, 111, 110, 70, 105, 110, 105, 115, 104, 101, 100, 58, 40, 97, 44, 100, 41, 61, 62, 123, 116, 104, 105, 115, 46, 108, 105, 115, 116, 101, 110, 101, 114, 83, 101, 116, 124, 124, 40, 100, 46, 97, 100, 100, 76, 105, 115, 116, 101, 110, 101, 114, 40, 110, 101, 119, 32, 116, 44, 49, 41, 44, 100, 46, 115, 101, 116, 83, 117, 99, 99, 101, 115, 115, 70, 101, 101, 100, 98, 97, 99, 107, 40, 110, 101, 119, 32, 114, 41, 44, 116, 104, 105, 115, 46, 108, 105, 115, 116, 101, 110, 101, 114, 83, 101, 116, 61, 33, 48, 41, 125, 44, 111, 110, 77, 111, 100, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 97, 116, 105, 111, 110, 83, 116, 97, 114, 116, 101, 100, 40, 41, 123, 125, 44, 111, 110, 83, 101, 116, 116, 105, 110, 103, 115, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 97, 116, 105, 111, 110, 83, 116, 97, 114, 116, 101, 100, 40, 41, 123, 125, 44, 111, 110, 83, 101, 116, 116, 105, 110, 103, 115, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 97, 116, 105, 111, 110, 70, 105, 110, 105, 115, 104, 101, 100, 40, 41, 123, 125, 125, 41, 59, 116, 104, 105, 115, 46, 98, 97, 114, 99, 111, 100, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 61, 110, 101, 119, 32, 116, 104, 105, 115, 46, 77, 111, 100, 117, 108, 101, 46, 66, 97, 114, 99, 111, 100, 101, 67, 97, 112, 116, 117, 114, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 44, 116, 104, 105, 115, 46, 98, 97, 114, 99, 111, 100, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 46, 115, 101, 116, 76, 105, 115, 116, 101, 110, 101, 114, 40, 110, 101, 119, 32, 115, 41, 125, 100, 105, 100, 83, 99, 97, 110, 40, 116, 44, 114, 41, 123, 108, 101, 116, 32, 115, 61, 116, 104, 105, 115, 46, 99, 111, 114, 101, 69, 110, 103, 105, 110, 101, 46, 99, 111, 110, 118, 101, 114, 116, 84, 111, 76, 111, 97, 100, 97, 98, 108, 101, 70, 114, 97, 109, 101, 68, 97, 116, 97, 40, 114, 41, 59, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 70, 117, 110, 99, 116, 105, 111, 110, 115, 46, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 40, 123, 116, 121, 112, 101, 58, 34, 98, 97, 114, 99, 111, 100, 101, 67, 97, 112, 116, 117, 114, 101, 68, 105, 100, 83, 99, 97, 110, 34, 44, 112, 97, 121, 108, 111, 97, 100, 58, 123, 115, 101, 115, 115, 105, 111, 110, 58, 74, 83, 79, 78, 46, 112, 97, 114, 115, 101, 40, 116, 46, 116, 111, 74, 115, 111, 110, 40, 41, 41, 44, 102, 114, 97, 109, 101, 68, 97, 116, 97, 58, 115, 125, 125, 41, 125, 100, 105, 100, 85, 112, 100, 97, 116, 101, 83, 101, 115, 115, 105, 111, 110, 40, 116, 41, 123, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 70, 117, 110, 99, 116, 105, 111, 110, 115, 46, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 40, 123, 116, 121, 112, 101, 58, 34, 98, 97, 114, 99, 111, 100, 101, 67, 97, 112, 116, 117, 114, 101, 68, 105, 100, 85, 112, 100, 97, 116, 101, 83, 101, 115, 115, 105, 111, 110, 34, 44, 112, 97, 121, 108, 111, 97, 100, 58, 74, 83, 79, 78, 46, 112, 97, 114, 115, 101, 40, 116, 46, 116, 111, 74, 115, 111, 110, 40, 41, 41, 125, 41, 125, 115, 117, 99, 99, 101, 115, 115, 70, 101, 101, 100, 98, 97, 99, 107, 40, 41, 123, 116, 104, 105, 115, 46, 119, 111, 114, 107, 101, 114, 70, 117, 110, 99, 116, 105, 111, 110, 115, 46, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 40, 123, 116, 121, 112, 101, 58, 34, 115, 117, 99, 99, 101, 115, 115, 70, 101, 101, 100, 98, 97, 99, 107, 34, 125, 41, 125, 103, 101, 116, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 40, 41, 123, 114, 101, 116, 117, 114, 110, 32, 116, 104, 105, 115, 46, 98, 97, 114, 99, 111, 100, 101, 68, 101, 115, 101, 114, 105, 97, 108, 105, 122, 101, 114, 125, 125, 59, 118, 97, 114, 32, 79, 61, 99, 108, 97, 115, 115, 32, 101, 120, 116, 101, 110, 100, 115, 32, 65, 123, 99, 111, 110, 115, 116, 114, 117, 99, 116, 111, 114, 40, 116, 44, 114, 41, 123, 115, 117, 112, 101, 114, 40, 116, 44, 114, 41, 44, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 61, 110, 101, 119, 32, 120, 40, 114, 44, 123, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 58, 116, 104, 105, 115, 46, 112, 111, 115, 116, 77, 101, 115, 115, 97, 103, 101, 46, 98, 105, 110, 100, 40, 116, 104, 105, 115, 41, 44, 103, 101, 116, 79, 102, 102, 115, 99, 114, 101, 101, 110, 67, 97, 110, 118, 97, 115, 58, 116, 104, 105, 115, 46, 103, 101, 116, 79, 102, 102, 115, 99, 114, 101, 101, 110, 67, 97, 110, 118, 97, 115, 46, 98, 105, 110, 100, 40, 116, 104, 105, 115, 41, 125, 41, 125, 111, 110, 77, 101, 115, 115, 97, 103, 101, 40, 116, 41, 123, 114, 101, 116, 117, 114, 110, 32, 116, 46, 100, 97, 116, 97, 46, 99, 111, 109, 109, 97, 110, 100, 61, 61, 61, 34, 99, 114, 101, 97, 116, 101, 66, 108, 117, 114, 114, 121, 84, 97, 98, 108, 101, 34, 63, 40, 116, 104, 105, 115, 46, 100, 97, 116, 97, 67, 97, 112, 116, 117, 114, 101, 73, 110, 115, 116, 97, 110, 99, 101, 46, 99, 114, 101, 97, 116, 101, 66, 108, 117, 114, 114, 121, 84, 97, 98, 108, 101, 40, 116, 46, 100, 97, 116, 97, 46, 115, 121, 109, 98, 111, 108, 111, 103, 121, 41, 44, 33, 48, 41, 58, 115, 117, 112, 101, 114, 46, 111, 110, 77, 101, 115, 115, 97, 103, 101, 40, 116, 41, 125, 125, 44, 110, 101, 61, 110, 101, 119, 32, 79, 40, 115, 101, 108, 102, 44, 123, 103, 101, 116, 58, 40, 41, 61, 62, 115, 101, 108, 102, 46, 77, 111, 100, 117, 108, 101, 44, 115, 101, 116, 58, 101, 61, 62, 123, 115, 101, 108, 102, 46, 77, 111, 100, 117, 108, 101, 61, 101, 125, 125, 41, 59, 125, 41, 40, 41, 59, 10])], { type: "text/javascript" }));
var $2 = b1;
var S = class extends er {
  static async create(t) {
    var o, l;
    let a = new S(t.libraryLocation, (o = t.preloadEngine) != null ? o : false);
    return a.workerCommand("setLogLevel", { level: (l = t.logLevel) != null ? l : g.Level.Debug }), await a.load(), a;
  }
  get dataCaptureWorker() {
    var t;
    return this._dataCaptureWorker = (t = this._dataCaptureWorker) != null ? t : new Worker($2, { name: `SDCLoader ${this.isPreloadEngine ? " (preload)" : ""}` }), this._dataCaptureWorker;
  }
  async workerCommand(t, a, o) {
    return new Promise((l, n) => {
      let b = this.workerCommandId++;
      this.workerTasks.set(b, { resolve: l, reject: n });
      let s = E(J2({}, a), { command: t, id: b });
      this.dataCaptureWorker.postMessage(s, o);
    });
  }
};
var u = class {
  constructor(e) {
    r(this, "eventEmitter", new H.EventEmitter());
    r(this, "licenseKey");
    r(this, "preload");
    r(this, "libraryLocation");
    r(this, "logLevel");
    r(this, "queuedBlurryRecognitionSymbologies", [...u.availableBlurryRecognitionSymbologies.values()]);
    r(this, "readyBlurryRecognitionSymbologies", /* @__PURE__ */ new Set());
    r(this, "dataCaptureWorker");
    r(this, "context");
    this.licenseKey = e.licenseKey, this.libraryLocation = e.libraryLocation, this.preload = e.preload, this.logLevel = e.logLevel;
  }
  static async create(e) {
    let t = G.userAgentInfo.getBrowser().name;
    if (t != null && t.includes("Edge")) {
      let a = new Worker(URL.createObjectURL(new Blob([`(function ${u.workerIndexedDBSupportTestFunction.toString()})()`], { type: "text/javascript" })));
      return new Promise((o) => {
        a.onmessage = (l) => {
          a.terminate(), o(new u(E(J2({}, e), { preload: l.data })));
        };
      });
    }
    return new u(E(J2({}, e), { preload: true }));
  }
  static workerIndexedDBSupportTestFunction() {
    try {
      indexedDB.deleteDatabase("scandit_indexeddb_support_test"), postMessage(true);
    } catch (e) {
      postMessage(false);
    }
  }
  async prepareBlurryTables(e) {
    let t = true;
    if (this.preload)
      try {
        t = await this.checkBlurryTablesAlreadyAvailable(e);
      } catch (a) {
        console.error(a);
      }
    t ? (this.queuedBlurryRecognitionSymbologies = [], this.readyBlurryRecognitionSymbologies = new Set(u.availableBlurryRecognitionSymbologies), this.eventEmitter.emit("blurryTablesUpdate", new Set(this.readyBlurryRecognitionSymbologies))) : (this.dataCaptureWorker = await S.create({ libraryLocation: this.libraryLocation, preloadEngine: true, logLevel: this.logLevel }), this.dataCaptureWorker.addWorkerListener(this.dataCaptureWorkerOnMessage.bind(this)), this.context = new Tt(this.licenseKey, { dataCaptureInstance: this.dataCaptureWorker, delayedRegistration: true, highEndBlurryRecognition: e }), await this.context.initialize(false), this.context.addListener({ didStartObservingContext: () => {
      this.createNextBlurryTableSymbology();
    } }));
  }
  on(e, t) {
    e === "blurryTablesUpdate" && (this.readyBlurryRecognitionSymbologies.size === u.availableBlurryRecognitionSymbologies.size ? t(this.readyBlurryRecognitionSymbologies) : this.eventEmitter.on(e, t));
  }
  updateBlurryRecognitionPriority(e) {
    let t = [...this.queuedBlurryRecognitionSymbologies];
    for (let a of this.getEnabledSymbologies(e)) {
      let o = t.indexOf(a);
      o !== -1 && t.unshift(t.splice(o, 1)[0]);
    }
    this.queuedBlurryRecognitionSymbologies = t;
  }
  isBlurryRecognitionAvailable(e) {
    return this.getEnabledSymbologies(e).every((a) => this.readyBlurryRecognitionSymbologies.has(a));
  }
  getEnabledSymbologies(e) {
    return [...u.availableBlurryRecognitionSymbologies.values()].filter((t) => e.enabledSymbologies.includes(t));
  }
  createNextBlurryTableSymbology() {
    let e;
    do
      e = this.queuedBlurryRecognitionSymbologies.shift();
    while (e != null && this.readyBlurryRecognitionSymbologies.has(e));
    e != null && this.dataCaptureWorker.workerCommand("createBlurryTable", { symbology: e });
  }
  async checkBlurryTablesAlreadyAvailable(e) {
    return new Promise((t) => {
      let a = indexedDB.open(u.writableDataPath);
      function o() {
        a.result.close(), t(false);
      }
      a.onupgradeneeded = () => {
        try {
          a.result.createObjectStore(u.fsObjectStoreName);
        } catch (l) {
        }
      }, a.onsuccess = () => {
        try {
          let l = a.result.transaction(u.fsObjectStoreName, "readonly");
          l.onerror = o;
          let n = l.objectStore(u.fsObjectStoreName).getAllKeys();
          n.onsuccess = () => {
            if (a.result.close(), (e ? u.highEndBlurryTableFiles : u.defaultBlurryTableFiles).every((b) => n.result.includes(b))) {
              t(true);
              return;
            }
            t(false);
          }, n.onerror = o;
        } catch (l) {
          o.call({ error: l });
        }
      }, a.onblocked = a.onerror = o;
    });
  }
  dataCaptureWorkerOnMessage(e) {
    if (e.type === "createBlurryTableResult") {
      let { symbology: t } = e.payload;
      this.readyBlurryRecognitionSymbologies.add(t), ["ean8", "ean13Upca", "upce"].includes(t) ? (this.readyBlurryRecognitionSymbologies.add("ean13Upca"), this.readyBlurryRecognitionSymbologies.add("ean8"), this.readyBlurryRecognitionSymbologies.add("upce")) : ["code32", "code39"].includes(t) && (this.readyBlurryRecognitionSymbologies.add("code32"), this.readyBlurryRecognitionSymbologies.add("code39")), this.eventEmitter.emit("blurryTablesUpdate", new Set(this.readyBlurryRecognitionSymbologies)), this.readyBlurryRecognitionSymbologies.size === u.availableBlurryRecognitionSymbologies.size ? setTimeout(async () => {
        this.context && await this.context.dispose(), this.dataCaptureWorker.terminateDataCaptureWorker();
      }, 250) : this.createNextBlurryTableSymbology();
    }
  }
};
var y = u;
r(y, "writableDataPath", "/scandit_sync_folder_preload"), r(y, "fsObjectStoreName", "FILE_DATA"), r(y, "defaultBlurryTableFiles", ["/606674e04e9da6f3ff049665e249a2d3.scandit", "/05ccc70dd555fe1dd48784bd0cf8e386.scandit", "/c5f9e9352415c38c40498e5e95dadfe7.scandit", "/977fe759fdd7cdfe10730e7c6a313cf1.scandit", "/1537c55cf10f0541c82353754f4c64fd.scandit", "/975d994615bcffd9b2a73fa3a678eab0.scandit", "/dd1689816469f85afcf8474667d8f03d.scandit", "/8f244e6545292e588c1df97a086c6c1b.scandit", "/a575dcaf6e5494a4fcc1ab4acde73ec8.scandit", "/dabb5674b7672c4942b526b140087d72.scandit", "/515813776005b3f7f83a2f1dda0c3512.scandit", "/1803599e0a639ac73d4fa17406f626d0.scandit", "/1c853515cb625cb5599ffbc55d49660b.scandit", "/02f134be7444abe8670302d63154ee12.scandit", "/f66d20444d640fb5696ad1fd84844da1.scandit", "/cda0058badf2e2826f38e015b4bc2086.scandit", "/a7f53b46cfafa92cda842f8e5552fe94.scandit", "/520af862bc387cbcd123bf4f6c0a2309.scandit", "/fe5dee8bc5034b58510f0525996d3fd1.scandit", "/6fa9155af734f2c952b17414e455dd9d.scandit", "/b43dfae194695c822dfccba33ff2c86d.scandit"].map((e) => `${u.writableDataPath}${e}`)), r(y, "highEndBlurryTableFiles", ["/1874dc4934d21603e5d9a5ae43a778e4.scandit", "/63c129cdcf76aea7d93d5be187fe2538.scandit", "/115d22696b705b9981072313d6be73ea.scandit", "/4608867660a119fc208c2e2d9cb324a5.scandit", "/d17c176dc829d0963c15e161a80e5494.scandit", "/5323ad9f4f68808ccbccf152360d858b.scandit", "/280fc47c520d4da71bd7b46e800bf56d.scandit", "/285e85aaef2ce3fc3e02bd3a122c88a3.scandit", "/c511cd547c936a071b8d02714716e1ca.scandit", "/4957f614000cb4e1c37230ddf6ae2695.scandit", "/32b179628cb7fe9f7b9ec76f05f71843.scandit", "/064d712f2a6804bf7eadcb4b03aac94b.scandit", "/148896f408d127c37065bd889e097a48.scandit", "/99f6c6df8988e4fa954ca95fc96d417a.scandit", "/85502aef6aded3d4278bd979c10ad55e.scandit", "/24b31e817a962593346bc5bedfecfd42.scandit", "/13034b70bf6c595a3ae6df6d6ee1d6a4.scandit", "/4cb12590b4dac0ac0f8724b8aa45b75d.scandit", "/b3dfd3876ce0f8413c5069d87f8e8795.scandit", "/40d900c40fd427d6cc7ea1418209a293.scandit", "/feb5b253b7b4a9a210058f7cafa38461.scandit", "/aabd7f1b722807e223293dfaf212be23.scandit", "/2a9858ec9bba816cdfbdf1b14c8719a9.scandit", "/d8011fc47cc6aec6b172aae4af4fdd9b.scandit", "/e8747cf80b9ff066ca5026a8ca092b09.scandit", "/5fdf50ec8f84271ea21dd77be8d44872.scandit", "/661b785b69d6ca90e9d1ea8ab542b59f.scandit", "/07fa32ccbca1132b1d4799883e98b39a.scandit", "/5603271a54266a81ca40966e66e97265.scandit", "/d623ba3aa0c43fb3fc1c7be7aa2c69d2.scandit", "/bb770ea7325ee07808a318a236f2ec00.scandit", "/c4ddab70bcfb9e88bd75786459211217.scandit", "/9097adb842cd84073fd834d83520e3d3.scandit", "/642f7fb3cf1b48a7391c2ac0358f2bc2.scandit", "/a29f17de80be594245277fc418bf6a28.scandit", "/5295187c71b6c414d89f41909a92d74e.scandit", "/9dd44ec739d98429fc5fbdafb0127c43.scandit", "/7bc6d7c115ffb99739447c56e1faa181.scandit", "/2e84c1f83144a30ce5e3384766cd0918.scandit", "/be65a2a8af180ba9461b4607de385afe.scandit", "/8507e094c3e139c87cdba48291e5b888.scandit", "/06c61f29f834fa28b36700587e777f89.scandit"].map((e) => `${u.writableDataPath}${e}`)), r(y, "availableBlurryRecognitionSymbologies", /* @__PURE__ */ new Set(["ean13Upca", "ean8", "code32", "code39", "code128", "code93", "interleavedTwoOfFive", "msiPlessey", "codabar", "upce"]));
var D = class {
  constructor() {
    r(this, "success", ut.defaultFeedback);
  }
  static get default() {
    return new D();
  }
  toJSONObject() {
    return { success: this.success.toJSONObject() };
  }
};
var x2 = class {
  constructor() {
    r(this, "_newlyRecognizedBarcodes");
    r(this, "_newlyLocalizedBarcodes");
    r(this, "_frameSequenceID");
  }
  get newlyRecognizedBarcodes() {
    return this._newlyRecognizedBarcodes;
  }
  get newlyLocalizedBarcodes() {
    return this._newlyLocalizedBarcodes;
  }
  get frameSequenceID() {
    return this._frameSequenceID;
  }
  static fromJSON(e) {
    let t = new x2();
    return t._newlyRecognizedBarcodes = e.newlyRecognizedBarcodes.map((a) => h.fromJSON(a)), t._newlyLocalizedBarcodes = e.newlyLocalizedBarcodes.map((a) => k2.fromJSON(a)), t._frameSequenceID = e.frameSequenceId, t;
  }
};
var P = class {
  constructor() {
    r(this, "type", "barcodeCapture");
    r(this, "_isEnabled", true);
    r(this, "_feedback", D.default);
    r(this, "settings");
    r(this, "_context", null);
    r(this, "listeners", []);
    r(this, "allowedRemainingWorkerMessages", /* @__PURE__ */ new Set());
    r(this, "workerMessageListener", this.onWorkerMessage.bind(this));
  }
  isEnabled() {
    return this._isEnabled;
  }
  async setEnabled(e) {
    this._isEnabled = e, await this.notifyContext();
  }
  get context() {
    return this._context;
  }
  get feedback() {
    return this._feedback;
  }
  set feedback(e) {
    this._feedback = e, this.notifyContext();
  }
  static get recommendedCameraSettings() {
    return new ne();
  }
  static async forContext(e, t) {
    let a = new P();
    return a.settings = t, e && await e.addMode(a), a;
  }
  async applySettings(e) {
    return this.settings = e, this.notifyContext();
  }
  addListener(e) {
    this.listeners.includes(e) || this.listeners.push(e);
  }
  removeListener(e) {
    !this.listeners.includes(e) || this.listeners.splice(this.listeners.indexOf(e), 1);
  }
  attachedToContext(e) {
    this._context = e, this._context.subscribeToWorkerMessages(this.workerMessageListener);
  }
  detachedFromContext() {
    var e;
    (e = this._context) == null || e.unsubscribeToWorkerMessages(this.workerMessageListener), this._context = null;
  }
  sendClearFrameDataRequest(e) {
    setTimeout(() => {
      var t;
      (t = this.context) == null || t.workerCommand("deleteFrameData", { frameId: e });
    }, 0);
  }
  async onWorkerMessage(e) {
    switch (e.type) {
      case "barcodeCaptureDidScan":
        {
          let t = x2.fromJSON(e.payload.session), { frameData: a } = e.payload;
          if (!this._isEnabled) {
            this.sendClearFrameDataRequest(a.frameId), this.allowedRemainingWorkerMessages.clear();
            return;
          }
          try {
            for (let o of this.listeners)
              if (o.didScan) {
                let l = o.didScan(this, t, Do(a, this.context));
                l instanceof Promise && await l;
              }
          } finally {
            this.sendClearFrameDataRequest(a.frameId);
          }
          this._isEnabled || (this.allowedRemainingWorkerMessages = /* @__PURE__ */ new Set(["barcodeCaptureDidUpdateSession", "successFeedback"]));
        }
        break;
      case "barcodeCaptureDidUpdateSession":
        {
          let t = x2.fromJSON(e.payload);
          if (!this._isEnabled && !this.allowedRemainingWorkerMessages.has(e.type))
            return;
          this.allowedRemainingWorkerMessages.delete(e.type);
          for (let a of this.listeners)
            a.didUpdateSession && a.didUpdateSession(this, t);
          this._isEnabled || (this.allowedRemainingWorkerMessages = /* @__PURE__ */ new Set(["successFeedback"]));
        }
        break;
      case "successFeedback":
        {
          if (!this._isEnabled && !this.allowedRemainingWorkerMessages.has(e.type))
            return;
          this.allowedRemainingWorkerMessages.delete(e.type), this.feedback.success.emit();
        }
        break;
    }
  }
  async notifyContext() {
    if (this.context)
      return this.context.update();
  }
  toJSONObject() {
    return { type: this.type, enabled: this._isEnabled, feedback: this.feedback.toJSONObject(), settings: this.settings.toJSONObject() };
  }
};
var x1 = (i) => ({ SymbologySettings: Object.keys(i.SymbologySettings).reduce((e, t) => (e[t] = B.fromJSON(JSON.parse(i.SymbologySettings[t])), e), {}), SymbologyDescriptions: i.SymbologyDescriptions.map((e) => O2.fromJSON(JSON.parse(e))), CompositeTypeDescriptions: i.CompositeTypeDescriptions.map((e) => JSON.parse(e)), BarcodeCapture: { BarcodeCaptureOverlay: { defaultStyle: i.BarcodeCapture.BarcodeCaptureOverlay.defaultStyle, DefaultBrush: { fillColor: W.fromJSON(i.BarcodeCapture.BarcodeCaptureOverlay.DefaultBrush.fillColor), strokeColor: W.fromJSON(i.BarcodeCapture.BarcodeCaptureOverlay.DefaultBrush.strokeColor), strokeWidth: i.BarcodeCapture.BarcodeCaptureOverlay.DefaultBrush.strokeWidth }, styles: Object.fromEntries(Object.keys(i.BarcodeCapture.BarcodeCaptureOverlay.styles).map((e) => [e, { DefaultBrush: { fillColor: W.fromJSON(i.BarcodeCapture.BarcodeCaptureOverlay.styles[e].DefaultBrush.fillColor), strokeColor: W.fromJSON(i.BarcodeCapture.BarcodeCaptureOverlay.styles[e].DefaultBrush.strokeColor), strokeWidth: i.BarcodeCapture.BarcodeCaptureOverlay.styles[e].DefaultBrush.strokeWidth } }])) }, BarcodeCaptureSettings: { codeDuplicateFilter: i.BarcodeCapture.BarcodeCaptureSettings.codeDuplicateFilter }, RecommendedCameraSettings: ne.fromJSON(i.BarcodeCapture.RecommendedCameraSettings) }, BarcodeTracking: { RecommendedCameraSettings: ne.fromJSON(i.BarcodeTracking.RecommendedCameraSettings), BarcodeTrackingBasicOverlay: { DefaultBrush: { fillColor: W.fromJSON(i.BarcodeTracking.BarcodeTrackingBasicOverlay.DefaultBrush.fillColor), strokeColor: W.fromJSON(i.BarcodeTracking.BarcodeTrackingBasicOverlay.DefaultBrush.strokeColor), strokeWidth: i.BarcodeTracking.BarcodeTrackingBasicOverlay.DefaultBrush.strokeWidth } } }, SparkCapture: { SparkCaptureSettings: { codeDuplicateFilter: i.SparkCapture.SparkCaptureSettings.codeDuplicateFilter } } });
var f = x1({ BarcodeCapture: { BarcodeCaptureSettings: { codeDuplicateFilter: 0 }, BarcodeCaptureOverlay: { defaultStyle: "frame", DefaultBrush: { fillColor: "#00000000", strokeColor: "#FFFFFFFF", strokeWidth: 3 }, styles: { frame: { DefaultBrush: { fillColor: "#00000000", strokeColor: "#FFFFFFFF", strokeWidth: 3 } } } }, RecommendedCameraSettings: { zoomFactor: 1, zoomGestureZoomFactor: 2, focusGestureStrategy: "manualUntilCapture", preferredResolution: "auto" } }, SymbologySettings: { ean13Upca: JSON.stringify({ activeSymbolCounts: [12], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), ean8: JSON.stringify({ activeSymbolCounts: [8], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), upce: JSON.stringify({ activeSymbolCounts: [6], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), code128: JSON.stringify({ activeSymbolCounts: [40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: ["strip_leading_fnc1"] }), code39: JSON.stringify({ activeSymbolCounts: [40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), code93: JSON.stringify({ activeSymbolCounts: [40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), interleavedTwoOfFive: JSON.stringify({ activeSymbolCounts: [40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), qr: JSON.stringify({ activeSymbolCounts: [], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), dataMatrix: JSON.stringify({ activeSymbolCounts: [], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: ["strip_leading_fnc1"] }), pdf417: JSON.stringify({ activeSymbolCounts: [], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), msiPlessey: JSON.stringify({ activeSymbolCounts: [32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), databar: JSON.stringify({ activeSymbolCounts: [2], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), databarExpanded: JSON.stringify({ activeSymbolCounts: [], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), codabar: JSON.stringify({ activeSymbolCounts: [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), aztec: JSON.stringify({ activeSymbolCounts: [], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), maxicode: JSON.stringify({ activeSymbolCounts: [], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), code11: JSON.stringify({ activeSymbolCounts: [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7], checksums: ["mod11"], colorInvertedEnabled: false, enabled: false, extensions: [] }), databarLimited: JSON.stringify({ activeSymbolCounts: [1], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), code25: JSON.stringify({ activeSymbolCounts: [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), microPdf417: JSON.stringify({ activeSymbolCounts: [], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), rm4scc: JSON.stringify({ activeSymbolCounts: [24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), kix: JSON.stringify({ activeSymbolCounts: [24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), dotcode: JSON.stringify({ activeSymbolCounts: [], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), microQr: JSON.stringify({ activeSymbolCounts: [], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), code32: JSON.stringify({ activeSymbolCounts: [8], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), lapa4sc: JSON.stringify({ activeSymbolCounts: [16], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), iata2of5: JSON.stringify({ activeSymbolCounts: [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), matrix2of5: JSON.stringify({ activeSymbolCounts: [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }), uspsIntelligentMail: JSON.stringify({ activeSymbolCounts: [65], checksums: [], colorInvertedEnabled: false, enabled: false, extensions: [] }) }, BarcodeTracking: { RecommendedCameraSettings: { zoomFactor: 1, zoomGestureZoomFactor: 1, focusGestureStrategy: "none", preferredResolution: "fullHd" }, BarcodeTrackingBasicOverlay: { DefaultBrush: { fillColor: "#00000000", strokeColor: "#FFFFFFFF", strokeWidth: 3 } } }, CompositeTypeDescriptions: [JSON.stringify({ symbologies: ["ean8", "ean13Upca", "microPdf417", "databarLimited", "upce", "databar", "databarExpanded"], types: ["A"] }), JSON.stringify({ symbologies: ["ean8", "ean13Upca", "microPdf417", "databarLimited", "upce", "databar", "databarExpanded"], types: ["B"] }), JSON.stringify({ symbologies: ["code128", "pdf417"], types: ["C"] })], SparkCapture: { SparkCaptureSettings: { codeDuplicateFilter: 1e3 } }, SymbologyDescriptions: [JSON.stringify({ activeSymbolCountRange: { maximum: 12, minimum: 12, step: 1 }, defaultSymbolCountRange: { maximum: 12, minimum: 12, step: 1 }, identifier: "ean13Upca", isAvailable: true, isColorInvertible: true, readableName: "EAN-13/UPC-A", supportedChecksums: [], supportedExtensions: ["two_digit_add_on", "strict", "remove_leading_upca_zero", "relaxed_sharp_quiet_zone_check", "five_digit_add_on"] }), JSON.stringify({ activeSymbolCountRange: { maximum: 8, minimum: 8, step: 1 }, defaultSymbolCountRange: { maximum: 8, minimum: 8, step: 1 }, identifier: "ean8", isAvailable: true, isColorInvertible: true, readableName: "EAN-8", supportedChecksums: [], supportedExtensions: ["two_digit_add_on", "strict", "relaxed_sharp_quiet_zone_check", "five_digit_add_on"] }), JSON.stringify({ activeSymbolCountRange: { maximum: 6, minimum: 6, step: 1 }, defaultSymbolCountRange: { maximum: 6, minimum: 6, step: 1 }, identifier: "upce", isAvailable: true, isColorInvertible: true, readableName: "UPC-E", supportedChecksums: [], supportedExtensions: ["two_digit_add_on", "strict", "return_as_upca", "remove_leading_upca_zero", "five_digit_add_on"] }), JSON.stringify({ activeSymbolCountRange: { maximum: 50, minimum: 4, step: 1 }, defaultSymbolCountRange: { maximum: 40, minimum: 6, step: 1 }, identifier: "code128", isAvailable: true, isColorInvertible: true, readableName: "Code 128", supportedChecksums: [], supportedExtensions: ["strict"] }), JSON.stringify({ activeSymbolCountRange: { maximum: 50, minimum: 3, step: 1 }, defaultSymbolCountRange: { maximum: 40, minimum: 6, step: 1 }, identifier: "code39", isAvailable: true, isColorInvertible: true, readableName: "Code 39", supportedChecksums: ["mod43"], supportedExtensions: ["strict", "relaxed_sharp_quiet_zone_check", "full_ascii"] }), JSON.stringify({ activeSymbolCountRange: { maximum: 60, minimum: 5, step: 1 }, defaultSymbolCountRange: { maximum: 40, minimum: 6, step: 1 }, identifier: "code93", isAvailable: true, isColorInvertible: false, readableName: "Code 93", supportedChecksums: [], supportedExtensions: ["strict"] }), JSON.stringify({ activeSymbolCountRange: { maximum: 50, minimum: 4, step: 2 }, defaultSymbolCountRange: { maximum: 40, minimum: 6, step: 2 }, identifier: "interleavedTwoOfFive", isAvailable: true, isColorInvertible: false, readableName: "Interleaved Two of Five", supportedChecksums: [], supportedExtensions: ["strict"] }), JSON.stringify({ activeSymbolCountRange: { maximum: 0, minimum: 0, step: 0 }, defaultSymbolCountRange: { maximum: 0, minimum: 0, step: 0 }, identifier: "qr", isAvailable: true, isColorInvertible: true, readableName: "QR Code", supportedChecksums: [], supportedExtensions: ["guess_encoding"] }), JSON.stringify({ activeSymbolCountRange: { maximum: 0, minimum: 0, step: 0 }, defaultSymbolCountRange: { maximum: 0, minimum: 0, step: 0 }, identifier: "dataMatrix", isAvailable: true, isColorInvertible: true, readableName: "Data Matrix", supportedChecksums: [], supportedExtensions: ["direct_part_marking_mode"] }), JSON.stringify({ activeSymbolCountRange: { maximum: 0, minimum: 0, step: 0 }, defaultSymbolCountRange: { maximum: 0, minimum: 0, step: 0 }, identifier: "pdf417", isAvailable: true, isColorInvertible: false, readableName: "PDF417", supportedChecksums: [], supportedExtensions: [] }), JSON.stringify({ activeSymbolCountRange: { maximum: 32, minimum: 3, step: 1 }, defaultSymbolCountRange: { maximum: 32, minimum: 6, step: 1 }, identifier: "msiPlessey", isAvailable: true, isColorInvertible: false, readableName: "MSI Plessey", supportedChecksums: ["mod11", "mod1010", "mod1110"], supportedExtensions: ["strict"] }), JSON.stringify({ activeSymbolCountRange: { maximum: 2, minimum: 2, step: 1 }, defaultSymbolCountRange: { maximum: 2, minimum: 2, step: 1 }, identifier: "databar", isAvailable: true, isColorInvertible: false, readableName: "GS1 DataBar 14", supportedChecksums: [], supportedExtensions: ["strict"] }), JSON.stringify({ activeSymbolCountRange: { maximum: 0, minimum: 0, step: 0 }, defaultSymbolCountRange: { maximum: 0, minimum: 0, step: 0 }, identifier: "databarExpanded", isAvailable: true, isColorInvertible: false, readableName: "GS1 DataBar Expanded", supportedChecksums: [], supportedExtensions: ["strict"] }), JSON.stringify({ activeSymbolCountRange: { maximum: 34, minimum: 3, step: 1 }, defaultSymbolCountRange: { maximum: 20, minimum: 7, step: 1 }, identifier: "codabar", isAvailable: true, isColorInvertible: false, readableName: "Codabar", supportedChecksums: ["mod11", "mod16"], supportedExtensions: ["strict"] }), JSON.stringify({ activeSymbolCountRange: { maximum: 0, minimum: 0, step: 0 }, defaultSymbolCountRange: { maximum: 0, minimum: 0, step: 0 }, identifier: "aztec", isAvailable: true, isColorInvertible: false, readableName: "Aztec", supportedChecksums: [], supportedExtensions: [] }), JSON.stringify({ activeSymbolCountRange: { maximum: 0, minimum: 0, step: 0 }, defaultSymbolCountRange: { maximum: 0, minimum: 0, step: 0 }, identifier: "maxicode", isAvailable: true, isColorInvertible: false, readableName: "MaxiCode", supportedChecksums: [], supportedExtensions: [] }), JSON.stringify({ activeSymbolCountRange: { maximum: 34, minimum: 5, step: 1 }, defaultSymbolCountRange: { maximum: 20, minimum: 7, step: 1 }, identifier: "code11", isAvailable: true, isColorInvertible: false, readableName: "Code 11", supportedChecksums: ["mod11"], supportedExtensions: ["strict"] }), JSON.stringify({ activeSymbolCountRange: { maximum: 1, minimum: 1, step: 1 }, defaultSymbolCountRange: { maximum: 1, minimum: 1, step: 1 }, identifier: "databarLimited", isAvailable: true, isColorInvertible: false, readableName: "GS1 DataBar Limited", supportedChecksums: [], supportedExtensions: ["strict"] }), JSON.stringify({ activeSymbolCountRange: { maximum: 32, minimum: 3, step: 1 }, defaultSymbolCountRange: { maximum: 20, minimum: 7, step: 1 }, identifier: "code25", isAvailable: true, isColorInvertible: false, readableName: "Code 25", supportedChecksums: [], supportedExtensions: ["strict"] }), JSON.stringify({ activeSymbolCountRange: { maximum: 0, minimum: 0, step: 0 }, defaultSymbolCountRange: { maximum: 0, minimum: 0, step: 0 }, identifier: "microPdf417", isAvailable: true, isColorInvertible: false, readableName: "MicroPDF417", supportedChecksums: [], supportedExtensions: [] }), JSON.stringify({ activeSymbolCountRange: { maximum: 50, minimum: 4, step: 1 }, defaultSymbolCountRange: { maximum: 24, minimum: 7, step: 1 }, identifier: "rm4scc", isAvailable: true, isColorInvertible: false, readableName: "RM4SCC", supportedChecksums: [], supportedExtensions: [] }), JSON.stringify({ activeSymbolCountRange: { maximum: 50, minimum: 4, step: 1 }, defaultSymbolCountRange: { maximum: 24, minimum: 7, step: 1 }, identifier: "kix", isAvailable: true, isColorInvertible: false, readableName: "KIX", supportedChecksums: [], supportedExtensions: [] }), JSON.stringify({ activeSymbolCountRange: { maximum: 0, minimum: 0, step: 0 }, defaultSymbolCountRange: { maximum: 0, minimum: 0, step: 0 }, identifier: "dotcode", isAvailable: true, isColorInvertible: true, readableName: "DotCode", supportedChecksums: [], supportedExtensions: [] }), JSON.stringify({ activeSymbolCountRange: { maximum: 0, minimum: 0, step: 0 }, defaultSymbolCountRange: { maximum: 0, minimum: 0, step: 0 }, identifier: "microQr", isAvailable: true, isColorInvertible: true, readableName: "Micro QR", supportedChecksums: [], supportedExtensions: [] }), JSON.stringify({ activeSymbolCountRange: { maximum: 8, minimum: 8, step: 1 }, defaultSymbolCountRange: { maximum: 8, minimum: 8, step: 1 }, identifier: "code32", isAvailable: true, isColorInvertible: false, readableName: "Code 32", supportedChecksums: [], supportedExtensions: ["strict"] }), JSON.stringify({ activeSymbolCountRange: { maximum: 16, minimum: 16, step: 1 }, defaultSymbolCountRange: { maximum: 16, minimum: 16, step: 1 }, identifier: "lapa4sc", isAvailable: true, isColorInvertible: false, readableName: "LAPA4SC", supportedChecksums: [], supportedExtensions: [] }), JSON.stringify({ activeSymbolCountRange: { maximum: 32, minimum: 3, step: 1 }, defaultSymbolCountRange: { maximum: 20, minimum: 7, step: 1 }, identifier: "iata2of5", isAvailable: true, isColorInvertible: false, readableName: "IATA 2 of 5", supportedChecksums: ["mod1010"], supportedExtensions: ["strict"] }), JSON.stringify({ activeSymbolCountRange: { maximum: 32, minimum: 3, step: 1 }, defaultSymbolCountRange: { maximum: 20, minimum: 7, step: 1 }, identifier: "matrix2of5", isAvailable: true, isColorInvertible: false, readableName: "Matrix 2 of 5", supportedChecksums: [], supportedExtensions: ["strict"] }), JSON.stringify({ activeSymbolCountRange: { maximum: 65, minimum: 65, step: 1 }, defaultSymbolCountRange: { maximum: 65, minimum: 65, step: 1 }, identifier: "uspsIntelligentMail", isAvailable: true, isColorInvertible: false, readableName: "USPS Intelligent Mail", supportedChecksums: [], supportedExtensions: [] })] });
O2.defaults = () => ({ SymbologyDescriptions: f.SymbologyDescriptions });
var N1 = ((e) => (e.Frame = "frame", e))(N1 || {});
var w = class {
  constructor() {
    r(this, "type", "barcodeCapture");
    r(this, "_style", f.BarcodeCapture.BarcodeCaptureOverlay.defaultStyle);
    r(this, "barcodeCapture");
    r(this, "_shouldShowScanAreaGuides", false);
    r(this, "_viewfinder", null);
    r(this, "_brush");
  }
  get style() {
    return this._style;
  }
  getBrush() {
    return this._brush;
  }
  async setBrush(e) {
    this._brush = e, await this.barcodeCapture.notifyContext();
  }
  getViewfinder() {
    return this._viewfinder;
  }
  async setViewfinder(e) {
    this._viewfinder = e, await this.barcodeCapture.notifyContext();
  }
  shouldShowScanAreaGuides() {
    return this._shouldShowScanAreaGuides;
  }
  async setShouldShowScanAreaGuides(e) {
    this._shouldShowScanAreaGuides = e, await this.barcodeCapture.notifyContext();
  }
  static withBarcodeCapture(e) {
    return w.withBarcodeCaptureForView(e, null);
  }
  static withBarcodeCaptureForView(e, t) {
    return w.withBarcodeCaptureForViewWithStyle(e, t, f.BarcodeCapture.BarcodeCaptureOverlay.defaultStyle);
  }
  static async withBarcodeCaptureForViewWithStyle(e, t, a) {
    let o = new w();
    return o.barcodeCapture = e, o._style = a, await o.setBrush(new mt(f.BarcodeCapture.BarcodeCaptureOverlay.styles[o.style].DefaultBrush.fillColor, f.BarcodeCapture.BarcodeCaptureOverlay.styles[o.style].DefaultBrush.strokeColor, f.BarcodeCapture.BarcodeCaptureOverlay.styles[o.style].DefaultBrush.strokeWidth)), t && await t.addOverlay(o), o;
  }
  toJSONObject() {
    var e, t;
    return { type: this.type, brush: this._brush.toJSONObject(), drawLocalizedOnlyBarcodes: false, shouldShowScanAreaGuides: this._shouldShowScanAreaGuides, viewfinder: (t = (e = this._viewfinder) == null ? void 0 : e.toJSONObject()) != null ? t : es, style: this.style };
  }
};
var Z2 = class {
  constructor() {
    r(this, "codeDuplicateFilter", f.BarcodeCapture.BarcodeCaptureSettings.codeDuplicateFilter);
    r(this, "locationSelection", null);
    r(this, "enabledCompositeTypes", []);
    r(this, "properties", {});
    r(this, "symbologies", {});
  }
  get compositeTypeDescriptions() {
    return f.CompositeTypeDescriptions.reduce((e, t) => (e[t.types[0]] = t, e), {});
  }
  get enabledSymbologies() {
    return Object.keys(this.symbologies).filter((e) => this.symbologies[e].isEnabled);
  }
  settingsForSymbology(e) {
    if (!this.symbologies[e]) {
      let t = f.SymbologySettings[e];
      t._symbology = e, this.symbologies[e] = t;
    }
    return this.symbologies[e];
  }
  setProperty(e, t) {
    this.properties[e] = t;
  }
  getProperty(e) {
    return this.properties[e];
  }
  enableSymbologies(e) {
    for (let t of e)
      this.enableSymbology(t, true);
  }
  enableSymbology(e, t) {
    this.settingsForSymbology(e).isEnabled = t;
  }
  enableSymbologiesForCompositeTypes(e) {
    for (let t of e)
      this.enableSymbologies(this.compositeTypeDescriptions[t].symbologies);
  }
  toJSONObject() {
    return { codeDuplicateFilter: this.codeDuplicateFilter, enabledCompositeTypes: this.enabledCompositeTypes, locationSelection: this.locationSelection ? this.locationSelection.toJSONObject() : Oo, properties: this.properties, symbologies: Object.keys(this.symbologies).reduce((e, t) => (e[t] = this.symbologies[t].toJSONObject(), e), {}) };
  }
};
function c0(i) {
  return { moduleName: "BarcodeCapture", load: async (e) => {
    var a;
    return D1(e, (a = i == null ? void 0 : i.highEndBlurryRecognition) != null ? a : false).catch((o) => {
      g.log(g.Level.Warn, "Error while generating blurry recognition tables:", o);
    }), await S.create(e);
  } };
}
async function D1(i, e = false) {
  var a;
  (await y.create({ licenseKey: i.licenseKey, logLevel: (a = i.logLevel) != null ? a : g.Level.Debug, libraryLocation: i.libraryLocation })).prepareBlurryTables(e).catch((o) => {
    g.log(g.Level.Warn, o);
  });
}

// index.ts
async function run() {
  await ys({
    licenseKey: "YOUR_LICENSE_KEY_HERE",
    libraryLocation: new URL("library/engine/", document.baseURI).toString(),
    moduleLoaders: [c0({ highEndBlurryRecognition: false })]
  });
  const context = await Tt.create();
  const camera = pe.default;
  await context.setFrameSource(camera);
  const settings = new Z2();
  settings.enableSymbologies([
    Q2.EAN13UPCA,
    Q2.EAN8,
    Q2.UPCE,
    Q2.QR,
    Q2.DataMatrix,
    Q2.Code39,
    Q2.Code128,
    Q2.InterleavedTwoOfFive
  ]);
  const symbologySettings = settings.settingsForSymbology(Q2.Code39);
  symbologySettings.activeSymbolCounts = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const barcodeCapture = await P.forContext(context, settings);
  await barcodeCapture.setEnabled(false);
  barcodeCapture.addListener({
    didScan: async (barcodeCaptureMode, session) => {
      var _a;
      await barcodeCaptureOverlay.setViewfinder(null);
      await barcodeCapture.setEnabled(false);
      const barcode = session.newlyRecognizedBarcodes[0];
      const symbology = new O2(barcode.symbology);
      showResult(`Scanned: ${(_a = barcode.data) != null ? _a : ""} (${symbology.readableName})`);
    }
  });
  const view = await O.forContext(context);
  view.connectToElement(document.getElementById("data-capture-view"));
  view.addControl(new ze());
  const barcodeCaptureOverlay = await w.withBarcodeCaptureForViewWithStyle(barcodeCapture, view, N1.Frame);
  const viewfinder = new qi(Sr.Square, br.Light);
  await barcodeCaptureOverlay.setViewfinder(viewfinder);
  await camera.switchToDesiredState(Oe.On);
  await barcodeCapture.setEnabled(true);
  function showResult(result) {
    const resultElement = document.createElement("div");
    resultElement.className = "result";
    resultElement.innerHTML = `<p class="result-text"></p><button onclick="continueScanning()">OK</button>`;
    resultElement.querySelector(".result-text").textContent = result;
    document.querySelector("#data-capture-view").append(resultElement);
  }
  window.continueScanning = async function continueScanning() {
    for (const r2 of document.querySelectorAll(".result"))
      r2.remove();
    await barcodeCapture.setEnabled(true);
    await barcodeCaptureOverlay.setViewfinder(viewfinder);
  };
}
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
//# sourceMappingURL=index.js.map
