! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.scrollSnap = e() } }(function() {
    return function e(t, n, o) {
        function r(u, l) {
            if (!n[u]) {
                if (!t[u]) {
                    var d = "function" == typeof require && require;
                    if (!l && d) return d(u, !0);
                    if (i) return i(u, !0);
                    var a = new Error("Cannot find module '" + u + "'");
                    throw a.code = "MODULE_NOT_FOUND", a }
                var s = n[u] = { exports: {} };
                t[u][0].call(s.exports, function(e) {
                    var n = t[u][1][e];
                    return r(n ? n : e) }, s, s.exports, e, t, n, o) }
            return n[u].exports }
        for (var i = "function" == typeof require && require, u = 0; u < o.length; u++) r(o[u]);
        return r }({ 1: [function(e, t, n) { "use strict";
            Object.defineProperty(n, "__esModule", { value: !0 });
            var o = null,
                r = !1,
                i = null,
                u = null,
                l = null,
                d = null,
                a = null,
                s = n.init = function() {
                    var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                    return h(e) === !1 ? !1 : e.detectMobile === !0 && f() === !0 ? !1 : (l = e, window.addEventListener("resize", x), c(l)) },
                c = function(e) { d = g(), a = [];
                    for (var t = 0; t < e.elements.length; ++t) {
                        var n = e.elements[t],
                            r = p(n, d, t);
                        a.push(r) }
                    var i = d.width >= e.minWidth && d.height >= e.minHeight,
                        u = d.width < e.minWidth || d.height < e.minHeight;
                    return i !== !0 || o !== !1 && null !== o ? u !== !0 || o !== !0 && null !== o ? void 0 : P(e) : y(e) },
                f = function() {
                    return /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || window.opera) },
                m = function(e, t, n, o) {
                    return e /= o, -n * e * (e - 2) + t },
                v = function(e, t) {
                    return 0 > e && (e = 0), e > t - 1 && (e = t - 1), e },
                h = function() {
                    var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                    return null == e.elements ? (console.error("Elements missing: opts.elements"), !1) : null == e.minWidth || e.minWidth < 0 ? (console.error("Property missing or not a number: opts.minWidth"), !1) : null == e.minHeight || e.minHeight < 0 ? (console.error("Property missing or not a number: opts.minHeight"), !1) : (e.detectMobile !== !1 && (e.detectMobile = !0), (null == e.duration || e.duration < 0) && (e.duration = 20), null == e.timing && (e.timing = m), e.keyboard !== !1 && (e.keyboard = !0), !0) },
                g = function() {
                    var e = document.body.getBoundingClientRect(),
                        t = { width: window.innerWidth, height: window.innerHeight };
                    return { top: -1 * e.top, maxTop: e.height - t.height, bottom: -1 * e.top + t.height, width: t.width, height: t.height } },
                p = function(e, t, n) {
                    if (null == e) return !1;
                    var o = { index: n, active: !1, top: e.offsetTop, bottom: e.offsetTop + e.offsetHeight, height: e.offsetHeight, dom: e };
                    return o.visiblePercentage = b(o, t).vP, o },
                b = function(e, t) {
                    var n = 0,
                        o = 0,
                        r = 0,
                        i = 0;
                    return n = t.top > e.top ? t.top : e.top, o = t.bottom > e.bottom ? e.bottom : t.bottom, r = o - n, i = 100 / e.height * r, 0 > r && (r = 0), 0 > i && (i = 0), { vH: r, vP: i } },
                w = function(e, t) {
                    function n() {
                        var e = s - m(d, 0, c, f);
                        document.body.scrollTop = e, document.documentElement.scrollTop = e, d >= f || document.body.scrollTop === t.maxTop && 0 !== d ? r = !1 : (d++, requestAnimationFrame(n)) }
                    for (var o = e.dom, i = 0; i < a.length; ++i) {
                        var u = a[i];
                        u.dom.classList.remove("active"), u.active = !1 }
                    o.classList.add("active"), e.active = !0;
                    var d = 0,
                        s = -document.body.getBoundingClientRect().top,
                        c = s - e.top,
                        f = l.duration,
                        m = l.timing;
                    return n(), !0 },
                y = function(e) { o = !0, window.addEventListener("wheel", L), e.keyboard === !0 && document.body.addEventListener("keydown", T);
                    for (var t = 0; t < a.length; ++t) a[t].dom.classList.remove("active");
                    return H() },
                P = function(e) { o = !1, window.removeEventListener("wheel", L), e.keyboard === !0 && document.body.removeEventListener("keydown", T);
                    for (var t = 0; t < a.length; ++t) a[t].dom.classList.add("active");
                    return !0 },
                T = function(e) {
                    var t = e.keyCode,
                        n = 0;
                    if (38 !== t && 40 !== t) return !0;
                    if (r === !0) return !1;
                    r = !0;
                    for (var o = 0; o < a.length; ++o) a[o].active === !0 && (n = o);
                    return 38 === t ? n += -1 : 40 === t && (n += 1), n = v(n, a.length), w(a[n], d), e.preventDefault(), !1 },
                x = function() {
                    return clearTimeout(u), u = setTimeout(function() {
                        return s(l) }, 200), !0 },
                L = function(e) {
                    return r === !0 ? !1 : (clearTimeout(i), i = setTimeout(function() {
                        return E(e) }, 200), !0) },
                E = function(e) { r = !0;
                    var t = 0,
                        n = {},
                        o = null,
                        i = 9.807; "wheel" === e.type && (t = e.deltaY), t = t > 0 ? 1 : -1, d = g(), a = [];
                    for (var u = 0; u < l.elements.length; ++u) {
                        var s = l.elements[u],
                            c = p(s, d, u);
                        a.push(c), (null == n.visiblePercentage || c.visiblePercentage > n.visiblePercentage) && (n = c) }
                    o = n.index + t, o = v(o, a.length), a[o].visiblePercentage *= i;
                    for (var u = 0; u < a.length; ++u) {
                        var c = a[u];
                        c.visiblePercentage > n.visiblePercentage && (n = c) }
                    return w(n, d) },
                H = function() { r = !0;
                    for (var e = null, t = 0; t < l.elements.length; ++t) {
                        var n = a[t];
                        d.top >= n.top && (e = n) }
                    return w(e, d) } }, {}] }, {}, [1])(1) });
