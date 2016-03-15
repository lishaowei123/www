!function (t, e) {
    function i(t) {
        var e = t.length, i = ht.type(t);
        return ht.isWindow(t) ? !1 : 1 === t.nodeType && e ? !0 : "array" === i || "function" !== i && (0 === e || "number" == typeof e && e > 0 && e - 1 in t)
    }

    function n(t) {
        var e = Dt[t] = {};
        return ht.each(t.match(dt) || [], function (t, i) {
            e[i] = !0
        }), e
    }

    function s(t, i, n, s) {
        if (ht.acceptData(t)) {
            var r, o, a = ht.expando, l = t.nodeType, c = l ? ht.cache : t, h = l ? t[a] : t[a] && a;
            if (h && c[h] && (s || c[h].data) || n !== e || "string" != typeof i)return h || (h = l ? t[a] = et.pop() || ht.guid++ : a), c[h] || (c[h] = l ? {} : {toJSON: ht.noop}), ("object" == typeof i || "function" == typeof i) && (s ? c[h] = ht.extend(c[h], i) : c[h].data = ht.extend(c[h].data, i)), o = c[h], s || (o.data || (o.data = {}), o = o.data), n !== e && (o[ht.camelCase(i)] = n), "string" == typeof i ? (r = o[i], null == r && (r = o[ht.camelCase(i)])) : r = o, r
        }
    }

    function r(t, e, i) {
        if (ht.acceptData(t)) {
            var n, s, r = t.nodeType, o = r ? ht.cache : t, l = r ? t[ht.expando] : ht.expando;
            if (o[l]) {
                if (e && (n = i ? o[l] : o[l].data)) {
                    ht.isArray(e) ? e = e.concat(ht.map(e, ht.camelCase)) : e in n ? e = [e] : (e = ht.camelCase(e), e = e in n ? [e] : e.split(" ")), s = e.length;
                    for (; s--;)delete n[e[s]];
                    if (i ? !a(n) : !ht.isEmptyObject(n))return
                }
                (i || (delete o[l].data, a(o[l]))) && (r ? ht.cleanData([t], !0) : ht.support.deleteExpando || o != o.window ? delete o[l] : o[l] = null)
            }
        }
    }

    function o(t, i, n) {
        if (n === e && 1 === t.nodeType) {
            var s = "data-" + i.replace(St, "-$1").toLowerCase();
            if (n = t.getAttribute(s), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : Tt.test(n) ? ht.parseJSON(n) : n
                } catch (r) {
                }
                ht.data(t, i, n)
            } else n = e
        }
        return n
    }

    function a(t) {
        var e;
        for (e in t)if (("data" !== e || !ht.isEmptyObject(t[e])) && "toJSON" !== e)return !1;
        return !0
    }

    function l() {
        return !0
    }

    function c() {
        return !1
    }

    function h() {
        try {
            return G.activeElement
        } catch (t) {
        }
    }

    function u(t, e) {
        do t = t[e]; while (t && 1 !== t.nodeType);
        return t
    }

    function d(t, e, i) {
        if (ht.isFunction(e))return ht.grep(t, function (t, n) {
            return !!e.call(t, n, t) !== i
        });
        if (e.nodeType)return ht.grep(t, function (t) {
            return t === e !== i
        });
        if ("string" == typeof e) {
            if (Wt.test(e))return ht.filter(e, t, i);
            e = ht.filter(e, t)
        }
        return ht.grep(t, function (t) {
            return ht.inArray(t, e) >= 0 !== i
        })
    }

    function p(t) {
        var e = Ut.split("|"), i = t.createDocumentFragment();
        if (i.createElement)for (; e.length;)i.createElement(e.pop());
        return i
    }

    function f(t, e) {
        return ht.nodeName(t, "table") && ht.nodeName(1 === e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
    }

    function m(t) {
        return t.type = (null !== ht.find.attr(t, "type")) + "/" + t.type, t
    }

    function g(t) {
        var e = se.exec(t.type);
        return e ? t.type = e[1] : t.removeAttribute("type"), t
    }

    function v(t, e) {
        for (var i, n = 0; null != (i = t[n]); n++)ht._data(i, "globalEval", !e || ht._data(e[n], "globalEval"))
    }

    function _(t, e) {
        if (1 === e.nodeType && ht.hasData(t)) {
            var i, n, s, r = ht._data(t), o = ht._data(e, r), a = r.events;
            if (a) {
                delete o.handle, o.events = {};
                for (i in a)for (n = 0, s = a[i].length; s > n; n++)ht.event.add(e, i, a[i][n])
            }
            o.data && (o.data = ht.extend({}, o.data))
        }
    }

    function y(t, e) {
        var i, n, s;
        if (1 === e.nodeType) {
            if (i = e.nodeName.toLowerCase(), !ht.support.noCloneEvent && e[ht.expando]) {
                s = ht._data(e);
                for (n in s.events)ht.removeEvent(e, n, s.handle);
                e.removeAttribute(ht.expando)
            }
            "script" === i && e.text !== t.text ? (m(e).text = t.text, g(e)) : "object" === i ? (e.parentNode && (e.outerHTML = t.outerHTML), ht.support.html5Clone && t.innerHTML && !ht.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === i && ee.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === i ? e.defaultSelected = e.selected = t.defaultSelected : ("input" === i || "textarea" === i) && (e.defaultValue = t.defaultValue)
        }
    }

    function b(t, i) {
        var n, s, r = 0, o = typeof t.getElementsByTagName !== K ? t.getElementsByTagName(i || "*") : typeof t.querySelectorAll !== K ? t.querySelectorAll(i || "*") : e;
        if (!o)for (o = [], n = t.childNodes || t; null != (s = n[r]); r++)!i || ht.nodeName(s, i) ? o.push(s) : ht.merge(o, b(s, i));
        return i === e || i && ht.nodeName(t, i) ? ht.merge([t], o) : o
    }

    function w(t) {
        ee.test(t.type) && (t.defaultChecked = t.checked)
    }

    function x(t, e) {
        if (e in t)return e;
        for (var i = e.charAt(0).toUpperCase() + e.slice(1), n = e, s = Ce.length; s--;)if (e = Ce[s] + i, e in t)return e;
        return n
    }

    function k(t, e) {
        return t = e || t, "none" === ht.css(t, "display") || !ht.contains(t.ownerDocument, t)
    }

    function C(t, e) {
        for (var i, n, s, r = [], o = 0, a = t.length; a > o; o++)n = t[o], n.style && (r[o] = ht._data(n, "olddisplay"), i = n.style.display, e ? (r[o] || "none" !== i || (n.style.display = ""), "" === n.style.display && k(n) && (r[o] = ht._data(n, "olddisplay", M(n.nodeName)))) : r[o] || (s = k(n), (i && "none" !== i || !s) && ht._data(n, "olddisplay", s ? i : ht.css(n, "display"))));
        for (o = 0; a > o; o++)n = t[o], n.style && (e && "none" !== n.style.display && "" !== n.style.display || (n.style.display = e ? r[o] || "" : "none"));
        return t
    }

    function D(t, e, i) {
        var n = ve.exec(e);
        return n ? Math.max(0, n[1] - (i || 0)) + (n[2] || "px") : e
    }

    function T(t, e, i, n, s) {
        for (var r = i === (n ? "border" : "content") ? 4 : "width" === e ? 1 : 0, o = 0; 4 > r; r += 2)"margin" === i && (o += ht.css(t, i + ke[r], !0, s)), n ? ("content" === i && (o -= ht.css(t, "padding" + ke[r], !0, s)), "margin" !== i && (o -= ht.css(t, "border" + ke[r] + "Width", !0, s))) : (o += ht.css(t, "padding" + ke[r], !0, s), "padding" !== i && (o += ht.css(t, "border" + ke[r] + "Width", !0, s)));
        return o
    }

    function S(t, e, i) {
        var n = !0, s = "width" === e ? t.offsetWidth : t.offsetHeight, r = he(t), o = ht.support.boxSizing && "border-box" === ht.css(t, "boxSizing", !1, r);
        if (0 >= s || null == s) {
            if (s = ue(t, e, r), (0 > s || null == s) && (s = t.style[e]), _e.test(s))return s;
            n = o && (ht.support.boxSizingReliable || s === t.style[e]), s = parseFloat(s) || 0
        }
        return s + T(t, e, i || (o ? "border" : "content"), n, r) + "px"
    }

    function M(t) {
        var e = G, i = be[t];
        return i || (i = F(t, e), "none" !== i && i || (ce = (ce || ht("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(e.documentElement), e = (ce[0].contentWindow || ce[0].contentDocument).document, e.write("<!doctype html><html><body>"), e.close(), i = F(t, e), ce.detach()), be[t] = i), i
    }

    function F(t, e) {
        var i = ht(e.createElement(t)).appendTo(e.body), n = ht.css(i[0], "display");
        return i.remove(), n
    }

    function E(t, e, i, n) {
        var s;
        if (ht.isArray(e))ht.each(e, function (e, s) {
            i || Te.test(t) ? n(t, s) : E(t + "[" + ("object" == typeof s ? e : "") + "]", s, i, n)
        }); else if (i || "object" !== ht.type(e))n(t, e); else for (s in e)E(t + "[" + s + "]", e[s], i, n)
    }

    function I(t) {
        return function (e, i) {
            "string" != typeof e && (i = e, e = "*");
            var n, s = 0, r = e.toLowerCase().match(dt) || [];
            if (ht.isFunction(i))for (; n = r[s++];)"+" === n[0] ? (n = n.slice(1) || "*", (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i)
        }
    }

    function A(t, e, i, n) {
        function s(a) {
            var l;
            return r[a] = !0, ht.each(t[a] || [], function (t, a) {
                var c = a(e, i, n);
                return "string" != typeof c || o || r[c] ? o ? !(l = c) : void 0 : (e.dataTypes.unshift(c), s(c), !1)
            }), l
        }

        var r = {}, o = t === qe;
        return s(e.dataTypes[0]) || !r["*"] && s("*")
    }

    function P(t, i) {
        var n, s, r = ht.ajaxSettings.flatOptions || {};
        for (s in i)i[s] !== e && ((r[s] ? t : n || (n = {}))[s] = i[s]);
        return n && ht.extend(!0, t, n), t
    }

    function N(t, i, n) {
        for (var s, r, o, a, l = t.contents, c = t.dataTypes; "*" === c[0];)c.shift(), r === e && (r = t.mimeType || i.getResponseHeader("Content-Type"));
        if (r)for (a in l)if (l[a] && l[a].test(r)) {
            c.unshift(a);
            break
        }
        if (c[0] in n)o = c[0]; else {
            for (a in n) {
                if (!c[0] || t.converters[a + " " + c[0]]) {
                    o = a;
                    break
                }
                s || (s = a)
            }
            o = o || s
        }
        return o ? (o !== c[0] && c.unshift(o), n[o]) : void 0
    }

    function $(t, e, i, n) {
        var s, r, o, a, l, c = {}, h = t.dataTypes.slice();
        if (h[1])for (o in t.converters)c[o.toLowerCase()] = t.converters[o];
        for (r = h.shift(); r;)if (t.responseFields[r] && (i[t.responseFields[r]] = e), !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = r, r = h.shift())if ("*" === r)r = l; else if ("*" !== l && l !== r) {
            if (o = c[l + " " + r] || c["* " + r], !o)for (s in c)if (a = s.split(" "), a[1] === r && (o = c[l + " " + a[0]] || c["* " + a[0]])) {
                o === !0 ? o = c[s] : c[s] !== !0 && (r = a[0], h.unshift(a[1]));
                break
            }
            if (o !== !0)if (o && t["throws"])e = o(e); else try {
                e = o(e)
            } catch (u) {
                return {state: "parsererror", error: o ? u : "No conversion from " + l + " to " + r}
            }
        }
        return {state: "success", data: e}
    }

    function O() {
        try {
            return new t.XMLHttpRequest
        } catch (e) {
        }
    }

    function z() {
        try {
            return new t.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {
        }
    }

    function j() {
        return setTimeout(function () {
            Qe = e
        }), Qe = ht.now()
    }

    function H(t, e, i) {
        for (var n, s = (si[e] || []).concat(si["*"]), r = 0, o = s.length; o > r; r++)if (n = s[r].call(i, e, t))return n
    }

    function R(t, e, i) {
        var n, s, r = 0, o = ni.length, a = ht.Deferred().always(function () {
            delete l.elem
        }), l = function () {
            if (s)return !1;
            for (var e = Qe || j(), i = Math.max(0, c.startTime + c.duration - e), n = i / c.duration || 0, r = 1 - n, o = 0, l = c.tweens.length; l > o; o++)c.tweens[o].run(r);
            return a.notifyWith(t, [c, r, i]), 1 > r && l ? i : (a.resolveWith(t, [c]), !1)
        }, c = a.promise({
            elem: t,
            props: ht.extend({}, e),
            opts: ht.extend(!0, {specialEasing: {}}, i),
            originalProperties: e,
            originalOptions: i,
            startTime: Qe || j(),
            duration: i.duration,
            tweens: [],
            createTween: function (e, i) {
                var n = ht.Tween(t, c.opts, e, i, c.opts.specialEasing[e] || c.opts.easing);
                return c.tweens.push(n), n
            },
            stop: function (e) {
                var i = 0, n = e ? c.tweens.length : 0;
                if (s)return this;
                for (s = !0; n > i; i++)c.tweens[i].run(1);
                return e ? a.resolveWith(t, [c, e]) : a.rejectWith(t, [c, e]), this
            }
        }), h = c.props;
        for (L(h, c.opts.specialEasing); o > r; r++)if (n = ni[r].call(c, t, h, c.opts))return n;
        return ht.map(h, H, c), ht.isFunction(c.opts.start) && c.opts.start.call(t, c), ht.fx.timer(ht.extend(l, {
            elem: t,
            anim: c,
            queue: c.opts.queue
        })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
    }

    function L(t, e) {
        var i, n, s, r, o;
        for (i in t)if (n = ht.camelCase(i), s = e[n], r = t[i], ht.isArray(r) && (s = r[1], r = t[i] = r[0]), i !== n && (t[n] = r, delete t[i]), o = ht.cssHooks[n], o && "expand" in o) {
            r = o.expand(r), delete t[n];
            for (i in r)i in t || (t[i] = r[i], e[i] = s)
        } else e[n] = s
    }

    function W(t, e, i) {
        var n, s, r, o, a, l, c = this, h = {}, u = t.style, d = t.nodeType && k(t), p = ht._data(t, "fxshow");
        i.queue || (a = ht._queueHooks(t, "fx"), null == a.unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function () {
            a.unqueued || l()
        }), a.unqueued++, c.always(function () {
            c.always(function () {
                a.unqueued--, ht.queue(t, "fx").length || a.empty.fire()
            })
        })), 1 === t.nodeType && ("height" in e || "width" in e) && (i.overflow = [u.overflow, u.overflowX, u.overflowY], "inline" === ht.css(t, "display") && "none" === ht.css(t, "float") && (ht.support.inlineBlockNeedsLayout && "inline" !== M(t.nodeName) ? u.zoom = 1 : u.display = "inline-block")), i.overflow && (u.overflow = "hidden", ht.support.shrinkWrapBlocks || c.always(function () {
            u.overflow = i.overflow[0], u.overflowX = i.overflow[1], u.overflowY = i.overflow[2]
        }));
        for (n in e)if (s = e[n], ti.exec(s)) {
            if (delete e[n], r = r || "toggle" === s, s === (d ? "hide" : "show"))continue;
            h[n] = p && p[n] || ht.style(t, n)
        }
        if (!ht.isEmptyObject(h)) {
            p ? "hidden" in p && (d = p.hidden) : p = ht._data(t, "fxshow", {}), r && (p.hidden = !d), d ? ht(t).show() : c.done(function () {
                ht(t).hide()
            }), c.done(function () {
                var e;
                ht._removeData(t, "fxshow");
                for (e in h)ht.style(t, e, h[e])
            });
            for (n in h)o = H(d ? p[n] : 0, n, c), n in p || (p[n] = o.start, d && (o.end = o.start, o.start = "width" === n || "height" === n ? 1 : 0))
        }
    }

    function q(t, e, i, n, s) {
        return new q.prototype.init(t, e, i, n, s)
    }

    function B(t, e) {
        var i, n = {height: t}, s = 0;
        for (e = e ? 1 : 0; 4 > s; s += 2 - e)i = ke[s], n["margin" + i] = n["padding" + i] = t;
        return e && (n.opacity = n.width = t), n
    }

    function V(t) {
        return ht.isWindow(t) ? t : 9 === t.nodeType ? t.defaultView || t.parentWindow : !1
    }

    var U, Y, K = typeof e, X = t.location, G = t.document, Z = G.documentElement, Q = t.jQuery, J = t.$, tt = {}, et = [], it = "1.10.2", nt = et.concat, st = et.push, rt = et.slice, ot = et.indexOf, at = tt.toString, lt = tt.hasOwnProperty, ct = it.trim, ht = function (t, e) {
        return new ht.fn.init(t, e, Y)
    }, ut = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, dt = /\S+/g, pt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ft = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, mt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, gt = /^[\],:{}\s]*$/, vt = /(?:^|:|,)(?:\s*\[)+/g, _t = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, yt = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, bt = /^-ms-/, wt = /-([\da-z])/gi, xt = function (t, e) {
        return e.toUpperCase()
    }, kt = function (t) {
        (G.addEventListener || "load" === t.type || "complete" === G.readyState) && (Ct(), ht.ready())
    }, Ct = function () {
        G.addEventListener ? (G.removeEventListener("DOMContentLoaded", kt, !1), t.removeEventListener("load", kt, !1)) : (G.detachEvent("onreadystatechange", kt), t.detachEvent("onload", kt))
    };
    ht.fn = ht.prototype = {
        jquery: it, constructor: ht, init: function (t, i, n) {
            var s, r;
            if (!t)return this;
            if ("string" == typeof t) {
                if (s = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : ft.exec(t), !s || !s[1] && i)return !i || i.jquery ? (i || n).find(t) : this.constructor(i).find(t);
                if (s[1]) {
                    if (i = i instanceof ht ? i[0] : i, ht.merge(this, ht.parseHTML(s[1], i && i.nodeType ? i.ownerDocument || i : G, !0)), mt.test(s[1]) && ht.isPlainObject(i))for (s in i)ht.isFunction(this[s]) ? this[s](i[s]) : this.attr(s, i[s]);
                    return this
                }
                if (r = G.getElementById(s[2]), r && r.parentNode) {
                    if (r.id !== s[2])return n.find(t);
                    this.length = 1, this[0] = r
                }
                return this.context = G, this.selector = t, this
            }
            return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : ht.isFunction(t) ? n.ready(t) : (t.selector !== e && (this.selector = t.selector, this.context = t.context), ht.makeArray(t, this))
        }, selector: "", length: 0, toArray: function () {
            return rt.call(this)
        }, get: function (t) {
            return null == t ? this.toArray() : 0 > t ? this[this.length + t] : this[t]
        }, pushStack: function (t) {
            var e = ht.merge(this.constructor(), t);
            return e.prevObject = this, e.context = this.context, e
        }, each: function (t, e) {
            return ht.each(this, t, e)
        }, ready: function (t) {
            return ht.ready.promise().done(t), this
        }, slice: function () {
            return this.pushStack(rt.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (t) {
            var e = this.length, i = +t + (0 > t ? e : 0);
            return this.pushStack(i >= 0 && e > i ? [this[i]] : [])
        }, map: function (t) {
            return this.pushStack(ht.map(this, function (e, i) {
                return t.call(e, i, e)
            }))
        }, end: function () {
            return this.prevObject || this.constructor(null)
        }, push: st, sort: [].sort, splice: [].splice
    }, ht.fn.init.prototype = ht.fn, ht.extend = ht.fn.extend = function () {
        var t, i, n, s, r, o, a = arguments[0] || {}, l = 1, c = arguments.length, h = !1;
        for ("boolean" == typeof a && (h = a, a = arguments[1] || {}, l = 2), "object" == typeof a || ht.isFunction(a) || (a = {}), c === l && (a = this, --l); c > l; l++)if (null != (r = arguments[l]))for (s in r)t = a[s], n = r[s], a !== n && (h && n && (ht.isPlainObject(n) || (i = ht.isArray(n))) ? (i ? (i = !1, o = t && ht.isArray(t) ? t : []) : o = t && ht.isPlainObject(t) ? t : {}, a[s] = ht.extend(h, o, n)) : n !== e && (a[s] = n));
        return a
    }, ht.extend({
        expando: "jQuery" + (it + Math.random()).replace(/\D/g, ""), noConflict: function (e) {
            return t.$ === ht && (t.$ = J), e && t.jQuery === ht && (t.jQuery = Q), ht
        }, isReady: !1, readyWait: 1, holdReady: function (t) {
            t ? ht.readyWait++ : ht.ready(!0)
        }, ready: function (t) {
            if (t === !0 ? !--ht.readyWait : !ht.isReady) {
                if (!G.body)return setTimeout(ht.ready);
                ht.isReady = !0, t !== !0 && --ht.readyWait > 0 || (U.resolveWith(G, [ht]), ht.fn.trigger && ht(G).trigger("ready").off("ready"))
            }
        }, isFunction: function (t) {
            return "function" === ht.type(t)
        }, isArray: Array.isArray || function (t) {
            return "array" === ht.type(t)
        }, isWindow: function (t) {
            return null != t && t == t.window
        }, isNumeric: function (t) {
            return !isNaN(parseFloat(t)) && isFinite(t)
        }, type: function (t) {
            return null == t ? String(t) : "object" == typeof t || "function" == typeof t ? tt[at.call(t)] || "object" : typeof t
        }, isPlainObject: function (t) {
            var i;
            if (!t || "object" !== ht.type(t) || t.nodeType || ht.isWindow(t))return !1;
            try {
                if (t.constructor && !lt.call(t, "constructor") && !lt.call(t.constructor.prototype, "isPrototypeOf"))return !1
            } catch (n) {
                return !1
            }
            if (ht.support.ownLast)for (i in t)return lt.call(t, i);
            for (i in t);
            return i === e || lt.call(t, i)
        }, isEmptyObject: function (t) {
            var e;
            for (e in t)return !1;
            return !0
        }, error: function (t) {
            throw new Error(t)
        }, parseHTML: function (t, e, i) {
            if (!t || "string" != typeof t)return null;
            "boolean" == typeof e && (i = e, e = !1), e = e || G;
            var n = mt.exec(t), s = !i && [];
            return n ? [e.createElement(n[1])] : (n = ht.buildFragment([t], e, s), s && ht(s).remove(), ht.merge([], n.childNodes))
        }, parseJSON: function (e) {
            return t.JSON && t.JSON.parse ? t.JSON.parse(e) : null === e ? e : "string" == typeof e && (e = ht.trim(e), e && gt.test(e.replace(_t, "@").replace(yt, "]").replace(vt, ""))) ? new Function("return " + e)() : void ht.error("Invalid JSON: " + e)
        }, parseXML: function (i) {
            var n, s;
            if (!i || "string" != typeof i)return null;
            try {
                t.DOMParser ? (s = new DOMParser, n = s.parseFromString(i, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(i))
            } catch (r) {
                n = e
            }
            return n && n.documentElement && !n.getElementsByTagName("parsererror").length || ht.error("Invalid XML: " + i), n
        }, noop: function () {
        }, globalEval: function (e) {
            e && ht.trim(e) && (t.execScript || function (e) {
                t.eval.call(t, e)
            })(e)
        }, camelCase: function (t) {
            return t.replace(bt, "ms-").replace(wt, xt)
        }, nodeName: function (t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
        }, each: function (t, e, n) {
            var s, r = 0, o = t.length, a = i(t);
            if (n) {
                if (a)for (; o > r && (s = e.apply(t[r], n), s !== !1); r++); else for (r in t)if (s = e.apply(t[r], n), s === !1)break
            } else if (a)for (; o > r && (s = e.call(t[r], r, t[r]), s !== !1); r++); else for (r in t)if (s = e.call(t[r], r, t[r]), s === !1)break;
            return t
        }, trim: ct && !ct.call("\ufeff ") ? function (t) {
            return null == t ? "" : ct.call(t)
        } : function (t) {
            return null == t ? "" : (t + "").replace(pt, "")
        }, makeArray: function (t, e) {
            var n = e || [];
            return null != t && (i(Object(t)) ? ht.merge(n, "string" == typeof t ? [t] : t) : st.call(n, t)), n
        }, inArray: function (t, e, i) {
            var n;
            if (e) {
                if (ot)return ot.call(e, t, i);
                for (n = e.length, i = i ? 0 > i ? Math.max(0, n + i) : i : 0; n > i; i++)if (i in e && e[i] === t)return i
            }
            return -1
        }, merge: function (t, i) {
            var n = i.length, s = t.length, r = 0;
            if ("number" == typeof n)for (; n > r; r++)t[s++] = i[r]; else for (; i[r] !== e;)t[s++] = i[r++];
            return t.length = s, t
        }, grep: function (t, e, i) {
            var n, s = [], r = 0, o = t.length;
            for (i = !!i; o > r; r++)n = !!e(t[r], r), i !== n && s.push(t[r]);
            return s
        }, map: function (t, e, n) {
            var s, r = 0, o = t.length, a = i(t), l = [];
            if (a)for (; o > r; r++)s = e(t[r], r, n), null != s && (l[l.length] = s); else for (r in t)s = e(t[r], r, n), null != s && (l[l.length] = s);
            return nt.apply([], l)
        }, guid: 1, proxy: function (t, i) {
            var n, s, r;
            return "string" == typeof i && (r = t[i], i = t, t = r), ht.isFunction(t) ? (n = rt.call(arguments, 2), s = function () {
                return t.apply(i || this, n.concat(rt.call(arguments)))
            }, s.guid = t.guid = t.guid || ht.guid++, s) : e
        }, access: function (t, i, n, s, r, o, a) {
            var l = 0, c = t.length, h = null == n;
            if ("object" === ht.type(n)) {
                r = !0;
                for (l in n)ht.access(t, i, l, n[l], !0, o, a)
            } else if (s !== e && (r = !0, ht.isFunction(s) || (a = !0), h && (a ? (i.call(t, s), i = null) : (h = i, i = function (t, e, i) {
                    return h.call(ht(t), i)
                })), i))for (; c > l; l++)i(t[l], n, a ? s : s.call(t[l], l, i(t[l], n)));
            return r ? t : h ? i.call(t) : c ? i(t[0], n) : o
        }, now: function () {
            return (new Date).getTime()
        }, swap: function (t, e, i, n) {
            var s, r, o = {};
            for (r in e)o[r] = t.style[r], t.style[r] = e[r];
            s = i.apply(t, n || []);
            for (r in e)t.style[r] = o[r];
            return s
        }
    }), ht.ready.promise = function (e) {
        if (!U)if (U = ht.Deferred(), "complete" === G.readyState)setTimeout(ht.ready); else if (G.addEventListener)G.addEventListener("DOMContentLoaded", kt, !1), t.addEventListener("load", kt, !1); else {
            G.attachEvent("onreadystatechange", kt), t.attachEvent("onload", kt);
            var i = !1;
            try {
                i = null == t.frameElement && G.documentElement
            } catch (n) {
            }
            i && i.doScroll && !function s() {
                if (!ht.isReady) {
                    try {
                        i.doScroll("left")
                    } catch (t) {
                        return setTimeout(s, 50)
                    }
                    Ct(), ht.ready()
                }
            }()
        }
        return U.promise(e)
    }, ht.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (t, e) {
        tt["[object " + e + "]"] = e.toLowerCase()
    }), Y = ht(G), function (t, e) {
        function i(t, e, i, n) {
            var s, r, o, a, l, c, h, u, f, m;
            if ((e ? e.ownerDocument || e : R) !== A && I(e), e = e || A, i = i || [], !t || "string" != typeof t)return i;
            if (1 !== (a = e.nodeType) && 9 !== a)return [];
            if (N && !n) {
                if (s = yt.exec(t))if (o = s[1]) {
                    if (9 === a) {
                        if (r = e.getElementById(o), !r || !r.parentNode)return i;
                        if (r.id === o)return i.push(r), i
                    } else if (e.ownerDocument && (r = e.ownerDocument.getElementById(o)) && j(e, r) && r.id === o)return i.push(r), i
                } else {
                    if (s[2])return tt.apply(i, e.getElementsByTagName(t)), i;
                    if ((o = s[3]) && k.getElementsByClassName && e.getElementsByClassName)return tt.apply(i, e.getElementsByClassName(o)), i
                }
                if (k.qsa && (!$ || !$.test(t))) {
                    if (u = h = H, f = e, m = 9 === a && t, 1 === a && "object" !== e.nodeName.toLowerCase()) {
                        for (c = d(t), (h = e.getAttribute("id")) ? u = h.replace(xt, "\\$&") : e.setAttribute("id", u), u = "[id='" + u + "'] ", l = c.length; l--;)c[l] = u + p(c[l]);
                        f = pt.test(t) && e.parentNode || e, m = c.join(",")
                    }
                    if (m)try {
                        return tt.apply(i, f.querySelectorAll(m)), i
                    } catch (g) {
                    } finally {
                        h || e.removeAttribute("id")
                    }
                }
            }
            return w(t.replace(ct, "$1"), e, i, n)
        }

        function n() {
            function t(i, n) {
                return e.push(i += " ") > D.cacheLength && delete t[e.shift()], t[i] = n
            }

            var e = [];
            return t
        }

        function s(t) {
            return t[H] = !0, t
        }

        function r(t) {
            var e = A.createElement("div");
            try {
                return !!t(e)
            } catch (i) {
                return !1
            } finally {
                e.parentNode && e.parentNode.removeChild(e), e = null
            }
        }

        function o(t, e) {
            for (var i = t.split("|"), n = t.length; n--;)D.attrHandle[i[n]] = e
        }

        function a(t, e) {
            var i = e && t, n = i && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || X) - (~t.sourceIndex || X);
            if (n)return n;
            if (i)for (; i = i.nextSibling;)if (i === e)return -1;
            return t ? 1 : -1
        }

        function l(t) {
            return function (e) {
                var i = e.nodeName.toLowerCase();
                return "input" === i && e.type === t
            }
        }

        function c(t) {
            return function (e) {
                var i = e.nodeName.toLowerCase();
                return ("input" === i || "button" === i) && e.type === t
            }
        }

        function h(t) {
            return s(function (e) {
                return e = +e, s(function (i, n) {
                    for (var s, r = t([], i.length, e), o = r.length; o--;)i[s = r[o]] && (i[s] = !(n[s] = i[s]))
                })
            })
        }

        function u() {
        }

        function d(t, e) {
            var n, s, r, o, a, l, c, h = B[t + " "];
            if (h)return e ? 0 : h.slice(0);
            for (a = t, l = [], c = D.preFilter; a;) {
                (!n || (s = ut.exec(a))) && (s && (a = a.slice(s[0].length) || a), l.push(r = [])), n = !1, (s = dt.exec(a)) && (n = s.shift(), r.push({
                    value: n,
                    type: s[0].replace(ct, " ")
                }), a = a.slice(n.length));
                for (o in D.filter)!(s = vt[o].exec(a)) || c[o] && !(s = c[o](s)) || (n = s.shift(), r.push({
                    value: n,
                    type: o,
                    matches: s
                }), a = a.slice(n.length));
                if (!n)break
            }
            return e ? a.length : a ? i.error(t) : B(t, l).slice(0)
        }

        function p(t) {
            for (var e = 0, i = t.length, n = ""; i > e; e++)n += t[e].value;
            return n
        }

        function f(t, e, i) {
            var n = e.dir, s = i && "parentNode" === n, r = W++;
            return e.first ? function (e, i, r) {
                for (; e = e[n];)if (1 === e.nodeType || s)return t(e, i, r)
            } : function (e, i, o) {
                var a, l, c, h = L + " " + r;
                if (o) {
                    for (; e = e[n];)if ((1 === e.nodeType || s) && t(e, i, o))return !0
                } else for (; e = e[n];)if (1 === e.nodeType || s)if (c = e[H] || (e[H] = {}), (l = c[n]) && l[0] === h) {
                    if ((a = l[1]) === !0 || a === C)return a === !0
                } else if (l = c[n] = [h], l[1] = t(e, i, o) || C, l[1] === !0)return !0
            }
        }

        function m(t) {
            return t.length > 1 ? function (e, i, n) {
                for (var s = t.length; s--;)if (!t[s](e, i, n))return !1;
                return !0
            } : t[0]
        }

        function g(t, e, i, n, s) {
            for (var r, o = [], a = 0, l = t.length, c = null != e; l > a; a++)(r = t[a]) && (!i || i(r, n, s)) && (o.push(r), c && e.push(a));
            return o
        }

        function v(t, e, i, n, r, o) {
            return n && !n[H] && (n = v(n)), r && !r[H] && (r = v(r, o)), s(function (s, o, a, l) {
                var c, h, u, d = [], p = [], f = o.length, m = s || b(e || "*", a.nodeType ? [a] : a, []), v = !t || !s && e ? m : g(m, d, t, a, l), _ = i ? r || (s ? t : f || n) ? [] : o : v;
                if (i && i(v, _, a, l), n)for (c = g(_, p), n(c, [], a, l), h = c.length; h--;)(u = c[h]) && (_[p[h]] = !(v[p[h]] = u));
                if (s) {
                    if (r || t) {
                        if (r) {
                            for (c = [], h = _.length; h--;)(u = _[h]) && c.push(v[h] = u);
                            r(null, _ = [], c, l)
                        }
                        for (h = _.length; h--;)(u = _[h]) && (c = r ? it.call(s, u) : d[h]) > -1 && (s[c] = !(o[c] = u))
                    }
                } else _ = g(_ === o ? _.splice(f, _.length) : _), r ? r(null, o, _, l) : tt.apply(o, _)
            })
        }

        function _(t) {
            for (var e, i, n, s = t.length, r = D.relative[t[0].type], o = r || D.relative[" "], a = r ? 1 : 0, l = f(function (t) {
                return t === e
            }, o, !0), c = f(function (t) {
                return it.call(e, t) > -1
            }, o, !0), h = [function (t, i, n) {
                return !r && (n || i !== F) || ((e = i).nodeType ? l(t, i, n) : c(t, i, n))
            }]; s > a; a++)if (i = D.relative[t[a].type])h = [f(m(h), i)]; else {
                if (i = D.filter[t[a].type].apply(null, t[a].matches), i[H]) {
                    for (n = ++a; s > n && !D.relative[t[n].type]; n++);
                    return v(a > 1 && m(h), a > 1 && p(t.slice(0, a - 1).concat({value: " " === t[a - 2].type ? "*" : ""})).replace(ct, "$1"), i, n > a && _(t.slice(a, n)), s > n && _(t = t.slice(n)), s > n && p(t))
                }
                h.push(i)
            }
            return m(h)
        }

        function y(t, e) {
            var n = 0, r = e.length > 0, o = t.length > 0, a = function (s, a, l, c, h) {
                var u, d, p, f = [], m = 0, v = "0", _ = s && [], y = null != h, b = F, w = s || o && D.find.TAG("*", h && a.parentNode || a), x = L += null == b ? 1 : Math.random() || .1;
                for (y && (F = a !== A && a, C = n); null != (u = w[v]); v++) {
                    if (o && u) {
                        for (d = 0; p = t[d++];)if (p(u, a, l)) {
                            c.push(u);
                            break
                        }
                        y && (L = x, C = ++n)
                    }
                    r && ((u = !p && u) && m--, s && _.push(u))
                }
                if (m += v, r && v !== m) {
                    for (d = 0; p = e[d++];)p(_, f, a, l);
                    if (s) {
                        if (m > 0)for (; v--;)_[v] || f[v] || (f[v] = Q.call(c));
                        f = g(f)
                    }
                    tt.apply(c, f), y && !s && f.length > 0 && m + e.length > 1 && i.uniqueSort(c)
                }
                return y && (L = x, F = b), _
            };
            return r ? s(a) : a
        }

        function b(t, e, n) {
            for (var s = 0, r = e.length; r > s; s++)i(t, e[s], n);
            return n
        }

        function w(t, e, i, n) {
            var s, r, o, a, l, c = d(t);
            if (!n && 1 === c.length) {
                if (r = c[0] = c[0].slice(0), r.length > 2 && "ID" === (o = r[0]).type && k.getById && 9 === e.nodeType && N && D.relative[r[1].type]) {
                    if (e = (D.find.ID(o.matches[0].replace(kt, Ct), e) || [])[0], !e)return i;
                    t = t.slice(r.shift().value.length)
                }
                for (s = vt.needsContext.test(t) ? 0 : r.length; s-- && (o = r[s], !D.relative[a = o.type]);)if ((l = D.find[a]) && (n = l(o.matches[0].replace(kt, Ct), pt.test(r[0].type) && e.parentNode || e))) {
                    if (r.splice(s, 1), t = n.length && p(r), !t)return tt.apply(i, n), i;
                    break
                }
            }
            return M(t, c)(n, e, !N, i, pt.test(t)), i
        }

        var x, k, C, D, T, S, M, F, E, I, A, P, N, $, O, z, j, H = "sizzle" + -new Date, R = t.document, L = 0, W = 0, q = n(), B = n(), V = n(), U = !1, Y = function (t, e) {
            return t === e ? (U = !0, 0) : 0
        }, K = typeof e, X = 1 << 31, G = {}.hasOwnProperty, Z = [], Q = Z.pop, J = Z.push, tt = Z.push, et = Z.slice, it = Z.indexOf || function (t) {
                for (var e = 0, i = this.length; i > e; e++)if (this[e] === t)return e;
                return -1
            }, nt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", st = "[\\x20\\t\\r\\n\\f]", rt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ot = rt.replace("w", "w#"), at = "\\[" + st + "*(" + rt + ")" + st + "*(?:([*^$|!~]?=)" + st + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + ot + ")|)|)" + st + "*\\]", lt = ":(" + rt + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + at.replace(3, 8) + ")*)|.*)\\)|)", ct = new RegExp("^" + st + "+|((?:^|[^\\\\])(?:\\\\.)*)" + st + "+$", "g"), ut = new RegExp("^" + st + "*," + st + "*"), dt = new RegExp("^" + st + "*([>+~]|" + st + ")" + st + "*"), pt = new RegExp(st + "*[+~]"), ft = new RegExp("=" + st + "*([^\\]'\"]*)" + st + "*\\]", "g"), mt = new RegExp(lt), gt = new RegExp("^" + ot + "$"), vt = {
            ID: new RegExp("^#(" + rt + ")"),
            CLASS: new RegExp("^\\.(" + rt + ")"),
            TAG: new RegExp("^(" + rt.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + at),
            PSEUDO: new RegExp("^" + lt),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + st + "*(even|odd|(([+-]|)(\\d*)n|)" + st + "*(?:([+-]|)" + st + "*(\\d+)|))" + st + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + nt + ")$", "i"),
            needsContext: new RegExp("^" + st + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + st + "*((?:-\\d)?\\d*)" + st + "*\\)|)(?=[^-]|$)", "i")
        }, _t = /^[^{]+\{\s*\[native \w/, yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, bt = /^(?:input|select|textarea|button)$/i, wt = /^h\d$/i, xt = /'|\\/g, kt = new RegExp("\\\\([\\da-f]{1,6}" + st + "?|(" + st + ")|.)", "ig"), Ct = function (t, e, i) {
            var n = "0x" + e - 65536;
            return n !== n || i ? e : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
        };
        try {
            tt.apply(Z = et.call(R.childNodes), R.childNodes), Z[R.childNodes.length].nodeType
        } catch (Dt) {
            tt = {
                apply: Z.length ? function (t, e) {
                    J.apply(t, et.call(e))
                } : function (t, e) {
                    for (var i = t.length, n = 0; t[i++] = e[n++];);
                    t.length = i - 1
                }
            }
        }
        S = i.isXML = function (t) {
            var e = t && (t.ownerDocument || t).documentElement;
            return e ? "HTML" !== e.nodeName : !1
        }, k = i.support = {}, I = i.setDocument = function (t) {
            var e = t ? t.ownerDocument || t : R, i = e.defaultView;
            return e !== A && 9 === e.nodeType && e.documentElement ? (A = e, P = e.documentElement, N = !S(e), i && i.attachEvent && i !== i.top && i.attachEvent("onbeforeunload", function () {
                I()
            }), k.attributes = r(function (t) {
                return t.className = "i", !t.getAttribute("className")
            }), k.getElementsByTagName = r(function (t) {
                return t.appendChild(e.createComment("")), !t.getElementsByTagName("*").length
            }), k.getElementsByClassName = r(function (t) {
                return t.innerHTML = "<div class='a'></div><div class='a i'></div>", t.firstChild.className = "i", 2 === t.getElementsByClassName("i").length
            }), k.getById = r(function (t) {
                return P.appendChild(t).id = H, !e.getElementsByName || !e.getElementsByName(H).length
            }), k.getById ? (D.find.ID = function (t, e) {
                if (typeof e.getElementById !== K && N) {
                    var i = e.getElementById(t);
                    return i && i.parentNode ? [i] : []
                }
            }, D.filter.ID = function (t) {
                var e = t.replace(kt, Ct);
                return function (t) {
                    return t.getAttribute("id") === e
                }
            }) : (delete D.find.ID, D.filter.ID = function (t) {
                var e = t.replace(kt, Ct);
                return function (t) {
                    var i = typeof t.getAttributeNode !== K && t.getAttributeNode("id");
                    return i && i.value === e
                }
            }), D.find.TAG = k.getElementsByTagName ? function (t, e) {
                return typeof e.getElementsByTagName !== K ? e.getElementsByTagName(t) : void 0
            } : function (t, e) {
                var i, n = [], s = 0, r = e.getElementsByTagName(t);
                if ("*" === t) {
                    for (; i = r[s++];)1 === i.nodeType && n.push(i);
                    return n
                }
                return r
            }, D.find.CLASS = k.getElementsByClassName && function (t, e) {
                    return typeof e.getElementsByClassName !== K && N ? e.getElementsByClassName(t) : void 0
                }, O = [], $ = [], (k.qsa = _t.test(e.querySelectorAll)) && (r(function (t) {
                t.innerHTML = "<select><option selected=''></option></select>", t.querySelectorAll("[selected]").length || $.push("\\[" + st + "*(?:value|" + nt + ")"), t.querySelectorAll(":checked").length || $.push(":checked")
            }), r(function (t) {
                var i = e.createElement("input");
                i.setAttribute("type", "hidden"), t.appendChild(i).setAttribute("t", ""), t.querySelectorAll("[t^='']").length && $.push("[*^$]=" + st + "*(?:''|\"\")"), t.querySelectorAll(":enabled").length || $.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), $.push(",.*:")
            })), (k.matchesSelector = _t.test(z = P.webkitMatchesSelector || P.mozMatchesSelector || P.oMatchesSelector || P.msMatchesSelector)) && r(function (t) {
                k.disconnectedMatch = z.call(t, "div"), z.call(t, "[s!='']:x"), O.push("!=", lt)
            }), $ = $.length && new RegExp($.join("|")), O = O.length && new RegExp(O.join("|")), j = _t.test(P.contains) || P.compareDocumentPosition ? function (t, e) {
                var i = 9 === t.nodeType ? t.documentElement : t, n = e && e.parentNode;
                return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
            } : function (t, e) {
                if (e)for (; e = e.parentNode;)if (e === t)return !0;
                return !1
            }, Y = P.compareDocumentPosition ? function (t, i) {
                if (t === i)return U = !0, 0;
                var n = i.compareDocumentPosition && t.compareDocumentPosition && t.compareDocumentPosition(i);
                return n ? 1 & n || !k.sortDetached && i.compareDocumentPosition(t) === n ? t === e || j(R, t) ? -1 : i === e || j(R, i) ? 1 : E ? it.call(E, t) - it.call(E, i) : 0 : 4 & n ? -1 : 1 : t.compareDocumentPosition ? -1 : 1
            } : function (t, i) {
                var n, s = 0, r = t.parentNode, o = i.parentNode, l = [t], c = [i];
                if (t === i)return U = !0, 0;
                if (!r || !o)return t === e ? -1 : i === e ? 1 : r ? -1 : o ? 1 : E ? it.call(E, t) - it.call(E, i) : 0;
                if (r === o)return a(t, i);
                for (n = t; n = n.parentNode;)l.unshift(n);
                for (n = i; n = n.parentNode;)c.unshift(n);
                for (; l[s] === c[s];)s++;
                return s ? a(l[s], c[s]) : l[s] === R ? -1 : c[s] === R ? 1 : 0
            }, e) : A
        }, i.matches = function (t, e) {
            return i(t, null, null, e)
        }, i.matchesSelector = function (t, e) {
            if ((t.ownerDocument || t) !== A && I(t), e = e.replace(ft, "='$1']"), !(!k.matchesSelector || !N || O && O.test(e) || $ && $.test(e)))try {
                var n = z.call(t, e);
                if (n || k.disconnectedMatch || t.document && 11 !== t.document.nodeType)return n
            } catch (s) {
            }
            return i(e, A, null, [t]).length > 0
        }, i.contains = function (t, e) {
            return (t.ownerDocument || t) !== A && I(t), j(t, e)
        }, i.attr = function (t, i) {
            (t.ownerDocument || t) !== A && I(t);
            var n = D.attrHandle[i.toLowerCase()], s = n && G.call(D.attrHandle, i.toLowerCase()) ? n(t, i, !N) : e;
            return s === e ? k.attributes || !N ? t.getAttribute(i) : (s = t.getAttributeNode(i)) && s.specified ? s.value : null : s
        }, i.error = function (t) {
            throw new Error("Syntax error, unrecognized expression: " + t)
        }, i.uniqueSort = function (t) {
            var e, i = [], n = 0, s = 0;
            if (U = !k.detectDuplicates, E = !k.sortStable && t.slice(0), t.sort(Y), U) {
                for (; e = t[s++];)e === t[s] && (n = i.push(s));
                for (; n--;)t.splice(i[n], 1)
            }
            return t
        }, T = i.getText = function (t) {
            var e, i = "", n = 0, s = t.nodeType;
            if (s) {
                if (1 === s || 9 === s || 11 === s) {
                    if ("string" == typeof t.textContent)return t.textContent;
                    for (t = t.firstChild; t; t = t.nextSibling)i += T(t)
                } else if (3 === s || 4 === s)return t.nodeValue
            } else for (; e = t[n]; n++)i += T(e);
            return i
        }, D = i.selectors = {
            cacheLength: 50,
            createPseudo: s,
            match: vt,
            attrHandle: {},
            find: {},
            relative: {
                ">": {dir: "parentNode", first: !0},
                " ": {dir: "parentNode"},
                "+": {dir: "previousSibling", first: !0},
                "~": {dir: "previousSibling"}
            },
            preFilter: {
                ATTR: function (t) {
                    return t[1] = t[1].replace(kt, Ct), t[3] = (t[4] || t[5] || "").replace(kt, Ct), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                }, CHILD: function (t) {
                    return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || i.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && i.error(t[0]), t
                }, PSEUDO: function (t) {
                    var i, n = !t[5] && t[2];
                    return vt.CHILD.test(t[0]) ? null : (t[3] && t[4] !== e ? t[2] = t[4] : n && mt.test(n) && (i = d(n, !0)) && (i = n.indexOf(")", n.length - i) - n.length) && (t[0] = t[0].slice(0, i), t[2] = n.slice(0, i)), t.slice(0, 3))
                }
            },
            filter: {
                TAG: function (t) {
                    var e = t.replace(kt, Ct).toLowerCase();
                    return "*" === t ? function () {
                        return !0
                    } : function (t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e
                    }
                }, CLASS: function (t) {
                    var e = q[t + " "];
                    return e || (e = new RegExp("(^|" + st + ")" + t + "(" + st + "|$)")) && q(t, function (t) {
                            return e.test("string" == typeof t.className && t.className || typeof t.getAttribute !== K && t.getAttribute("class") || "")
                        })
                }, ATTR: function (t, e, n) {
                    return function (s) {
                        var r = i.attr(s, t);
                        return null == r ? "!=" === e : e ? (r += "", "=" === e ? r === n : "!=" === e ? r !== n : "^=" === e ? n && 0 === r.indexOf(n) : "*=" === e ? n && r.indexOf(n) > -1 : "$=" === e ? n && r.slice(-n.length) === n : "~=" === e ? (" " + r + " ").indexOf(n) > -1 : "|=" === e ? r === n || r.slice(0, n.length + 1) === n + "-" : !1) : !0
                    }
                }, CHILD: function (t, e, i, n, s) {
                    var r = "nth" !== t.slice(0, 3), o = "last" !== t.slice(-4), a = "of-type" === e;
                    return 1 === n && 0 === s ? function (t) {
                        return !!t.parentNode
                    } : function (e, i, l) {
                        var c, h, u, d, p, f, m = r !== o ? "nextSibling" : "previousSibling", g = e.parentNode, v = a && e.nodeName.toLowerCase(), _ = !l && !a;
                        if (g) {
                            if (r) {
                                for (; m;) {
                                    for (u = e; u = u[m];)if (a ? u.nodeName.toLowerCase() === v : 1 === u.nodeType)return !1;
                                    f = m = "only" === t && !f && "nextSibling"
                                }
                                return !0
                            }
                            if (f = [o ? g.firstChild : g.lastChild], o && _) {
                                for (h = g[H] || (g[H] = {}), c = h[t] || [], p = c[0] === L && c[1], d = c[0] === L && c[2], u = p && g.childNodes[p]; u = ++p && u && u[m] || (d = p = 0) || f.pop();)if (1 === u.nodeType && ++d && u === e) {
                                    h[t] = [L, p, d];
                                    break
                                }
                            } else if (_ && (c = (e[H] || (e[H] = {}))[t]) && c[0] === L)d = c[1]; else for (; (u = ++p && u && u[m] || (d = p = 0) || f.pop()) && ((a ? u.nodeName.toLowerCase() !== v : 1 !== u.nodeType) || !++d || (_ && ((u[H] || (u[H] = {}))[t] = [L, d]), u !== e)););
                            return d -= s, d === n || d % n === 0 && d / n >= 0
                        }
                    }
                }, PSEUDO: function (t, e) {
                    var n, r = D.pseudos[t] || D.setFilters[t.toLowerCase()] || i.error("unsupported pseudo: " + t);
                    return r[H] ? r(e) : r.length > 1 ? (n = [t, t, "", e], D.setFilters.hasOwnProperty(t.toLowerCase()) ? s(function (t, i) {
                        for (var n, s = r(t, e), o = s.length; o--;)n = it.call(t, s[o]), t[n] = !(i[n] = s[o])
                    }) : function (t) {
                        return r(t, 0, n)
                    }) : r
                }
            },
            pseudos: {
                not: s(function (t) {
                    var e = [], i = [], n = M(t.replace(ct, "$1"));
                    return n[H] ? s(function (t, e, i, s) {
                        for (var r, o = n(t, null, s, []), a = t.length; a--;)(r = o[a]) && (t[a] = !(e[a] = r))
                    }) : function (t, s, r) {
                        return e[0] = t, n(e, null, r, i), !i.pop()
                    }
                }), has: s(function (t) {
                    return function (e) {
                        return i(t, e).length > 0
                    }
                }), contains: s(function (t) {
                    return function (e) {
                        return (e.textContent || e.innerText || T(e)).indexOf(t) > -1
                    }
                }), lang: s(function (t) {
                    return gt.test(t || "") || i.error("unsupported lang: " + t), t = t.replace(kt, Ct).toLowerCase(), function (e) {
                        var i;
                        do if (i = N ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang"))return i = i.toLowerCase(), i === t || 0 === i.indexOf(t + "-"); while ((e = e.parentNode) && 1 === e.nodeType);
                        return !1
                    }
                }), target: function (e) {
                    var i = t.location && t.location.hash;
                    return i && i.slice(1) === e.id
                }, root: function (t) {
                    return t === P
                }, focus: function (t) {
                    return t === A.activeElement && (!A.hasFocus || A.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                }, enabled: function (t) {
                    return t.disabled === !1
                }, disabled: function (t) {
                    return t.disabled === !0
                }, checked: function (t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && !!t.checked || "option" === e && !!t.selected
                }, selected: function (t) {
                    return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                }, empty: function (t) {
                    for (t = t.firstChild; t; t = t.nextSibling)if (t.nodeName > "@" || 3 === t.nodeType || 4 === t.nodeType)return !1;
                    return !0
                }, parent: function (t) {
                    return !D.pseudos.empty(t)
                }, header: function (t) {
                    return wt.test(t.nodeName)
                }, input: function (t) {
                    return bt.test(t.nodeName)
                }, button: function (t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && "button" === t.type || "button" === e
                }, text: function (t) {
                    var e;
                    return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || e.toLowerCase() === t.type)
                }, first: h(function () {
                    return [0]
                }), last: h(function (t, e) {
                    return [e - 1]
                }), eq: h(function (t, e, i) {
                    return [0 > i ? i + e : i]
                }), even: h(function (t, e) {
                    for (var i = 0; e > i; i += 2)t.push(i);
                    return t
                }), odd: h(function (t, e) {
                    for (var i = 1; e > i; i += 2)t.push(i);
                    return t
                }), lt: h(function (t, e, i) {
                    for (var n = 0 > i ? i + e : i; --n >= 0;)t.push(n);
                    return t
                }), gt: h(function (t, e, i) {
                    for (var n = 0 > i ? i + e : i; ++n < e;)t.push(n);
                    return t
                })
            }
        }, D.pseudos.nth = D.pseudos.eq;
        for (x in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})D.pseudos[x] = l(x);
        for (x in{submit: !0, reset: !0})D.pseudos[x] = c(x);
        u.prototype = D.filters = D.pseudos, D.setFilters = new u, M = i.compile = function (t, e) {
            var i, n = [], s = [], r = V[t + " "];
            if (!r) {
                for (e || (e = d(t)), i = e.length; i--;)r = _(e[i]), r[H] ? n.push(r) : s.push(r);
                r = V(t, y(s, n))
            }
            return r
        }, k.sortStable = H.split("").sort(Y).join("") === H, k.detectDuplicates = U, I(), k.sortDetached = r(function (t) {
            return 1 & t.compareDocumentPosition(A.createElement("div"))
        }), r(function (t) {
            return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
        }) || o("type|href|height|width", function (t, e, i) {
            return i ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
        }), k.attributes && r(function (t) {
            return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
        }) || o("value", function (t, e, i) {
            return i || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue
        }), r(function (t) {
            return null == t.getAttribute("disabled")
        }) || o(nt, function (t, e, i) {
            var n;
            return i ? void 0 : (n = t.getAttributeNode(e)) && n.specified ? n.value : t[e] === !0 ? e.toLowerCase() : null
        }), ht.find = i, ht.expr = i.selectors, ht.expr[":"] = ht.expr.pseudos, ht.unique = i.uniqueSort, ht.text = i.getText, ht.isXMLDoc = i.isXML, ht.contains = i.contains
    }(t);
    var Dt = {};
    ht.Callbacks = function (t) {
        t = "string" == typeof t ? Dt[t] || n(t) : ht.extend({}, t);
        var i, s, r, o, a, l, c = [], h = !t.once && [], u = function (e) {
            for (s = t.memory && e, r = !0, a = l || 0, l = 0, o = c.length, i = !0; c && o > a; a++)if (c[a].apply(e[0], e[1]) === !1 && t.stopOnFalse) {
                s = !1;
                break
            }
            i = !1, c && (h ? h.length && u(h.shift()) : s ? c = [] : d.disable())
        }, d = {
            add: function () {
                if (c) {
                    var e = c.length;
                    !function n(e) {
                        ht.each(e, function (e, i) {
                            var s = ht.type(i);
                            "function" === s ? t.unique && d.has(i) || c.push(i) : i && i.length && "string" !== s && n(i)
                        })
                    }(arguments), i ? o = c.length : s && (l = e, u(s))
                }
                return this
            }, remove: function () {
                return c && ht.each(arguments, function (t, e) {
                    for (var n; (n = ht.inArray(e, c, n)) > -1;)c.splice(n, 1), i && (o >= n && o--, a >= n && a--)
                }), this
            }, has: function (t) {
                return t ? ht.inArray(t, c) > -1 : !(!c || !c.length)
            }, empty: function () {
                return c = [], o = 0, this
            }, disable: function () {
                return c = h = s = e, this
            }, disabled: function () {
                return !c
            }, lock: function () {
                return h = e, s || d.disable(), this
            }, locked: function () {
                return !h
            }, fireWith: function (t, e) {
                return !c || r && !h || (e = e || [], e = [t, e.slice ? e.slice() : e], i ? h.push(e) : u(e)), this
            }, fire: function () {
                return d.fireWith(this, arguments), this
            }, fired: function () {
                return !!r
            }
        };
        return d
    }, ht.extend({
        Deferred: function (t) {
            var e = [["resolve", "done", ht.Callbacks("once memory"), "resolved"], ["reject", "fail", ht.Callbacks("once memory"), "rejected"], ["notify", "progress", ht.Callbacks("memory")]], i = "pending", n = {
                state: function () {
                    return i
                }, always: function () {
                    return s.done(arguments).fail(arguments), this
                }, then: function () {
                    var t = arguments;
                    return ht.Deferred(function (i) {
                        ht.each(e, function (e, r) {
                            var o = r[0], a = ht.isFunction(t[e]) && t[e];
                            s[r[1]](function () {
                                var t = a && a.apply(this, arguments);
                                t && ht.isFunction(t.promise) ? t.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[o + "With"](this === n ? i.promise() : this, a ? [t] : arguments)
                            })
                        }), t = null
                    }).promise()
                }, promise: function (t) {
                    return null != t ? ht.extend(t, n) : n
                }
            }, s = {};
            return n.pipe = n.then, ht.each(e, function (t, r) {
                var o = r[2], a = r[3];
                n[r[1]] = o.add, a && o.add(function () {
                    i = a
                }, e[1 ^ t][2].disable, e[2][2].lock), s[r[0]] = function () {
                    return s[r[0] + "With"](this === s ? n : this, arguments), this
                }, s[r[0] + "With"] = o.fireWith
            }), n.promise(s), t && t.call(s, s), s
        }, when: function (t) {
            var e, i, n, s = 0, r = rt.call(arguments), o = r.length, a = 1 !== o || t && ht.isFunction(t.promise) ? o : 0, l = 1 === a ? t : ht.Deferred(), c = function (t, i, n) {
                return function (s) {
                    i[t] = this, n[t] = arguments.length > 1 ? rt.call(arguments) : s, n === e ? l.notifyWith(i, n) : --a || l.resolveWith(i, n)
                }
            };
            if (o > 1)for (e = new Array(o), i = new Array(o), n = new Array(o); o > s; s++)r[s] && ht.isFunction(r[s].promise) ? r[s].promise().done(c(s, n, r)).fail(l.reject).progress(c(s, i, e)) : --a;
            return a || l.resolveWith(n, r), l.promise()
        }
    }), ht.support = function (e) {
        var i, n, s, r, o, a, l, c, h, u = G.createElement("div");
        if (u.setAttribute("className", "t"), u.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", i = u.getElementsByTagName("*") || [], n = u.getElementsByTagName("a")[0], !n || !n.style || !i.length)return e;
        r = G.createElement("select"), a = r.appendChild(G.createElement("option")), s = u.getElementsByTagName("input")[0], n.style.cssText = "top:1px;float:left;opacity:.5", e.getSetAttribute = "t" !== u.className, e.leadingWhitespace = 3 === u.firstChild.nodeType, e.tbody = !u.getElementsByTagName("tbody").length, e.htmlSerialize = !!u.getElementsByTagName("link").length, e.style = /top/.test(n.getAttribute("style")), e.hrefNormalized = "/a" === n.getAttribute("href"), e.opacity = /^0.5/.test(n.style.opacity), e.cssFloat = !!n.style.cssFloat, e.checkOn = !!s.value, e.optSelected = a.selected, e.enctype = !!G.createElement("form").enctype, e.html5Clone = "<:nav></:nav>" !== G.createElement("nav").cloneNode(!0).outerHTML, e.inlineBlockNeedsLayout = !1, e.shrinkWrapBlocks = !1, e.pixelPosition = !1, e.deleteExpando = !0, e.noCloneEvent = !0, e.reliableMarginRight = !0, e.boxSizingReliable = !0, s.checked = !0, e.noCloneChecked = s.cloneNode(!0).checked, r.disabled = !0, e.optDisabled = !a.disabled;
        try {
            delete u.test
        } catch (d) {
            e.deleteExpando = !1
        }
        s = G.createElement("input"), s.setAttribute("value", ""), e.input = "" === s.getAttribute("value"), s.value = "t", s.setAttribute("type", "radio"), e.radioValue = "t" === s.value, s.setAttribute("checked", "t"), s.setAttribute("name", "t"), o = G.createDocumentFragment(), o.appendChild(s), e.appendChecked = s.checked, e.checkClone = o.cloneNode(!0).cloneNode(!0).lastChild.checked, u.attachEvent && (u.attachEvent("onclick", function () {
            e.noCloneEvent = !1
        }), u.cloneNode(!0).click());
        for (h in{
            submit: !0,
            change: !0,
            focusin: !0
        })u.setAttribute(l = "on" + h, "t"), e[h + "Bubbles"] = l in t || u.attributes[l].expando === !1;
        u.style.backgroundClip = "content-box", u.cloneNode(!0).style.backgroundClip = "", e.clearCloneStyle = "content-box" === u.style.backgroundClip;
        for (h in ht(e))break;
        return e.ownLast = "0" !== h, ht(function () {
            var i, n, s, r = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", o = G.getElementsByTagName("body")[0];
            o && (i = G.createElement("div"), i.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", o.appendChild(i).appendChild(u), u.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", s = u.getElementsByTagName("td"), s[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = 0 === s[0].offsetHeight, s[0].style.display = "", s[1].style.display = "none", e.reliableHiddenOffsets = c && 0 === s[0].offsetHeight, u.innerHTML = "", u.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", ht.swap(o, null != o.style.zoom ? {zoom: 1} : {}, function () {
                e.boxSizing = 4 === u.offsetWidth
            }), t.getComputedStyle && (e.pixelPosition = "1%" !== (t.getComputedStyle(u, null) || {}).top, e.boxSizingReliable = "4px" === (t.getComputedStyle(u, null) || {width: "4px"}).width, n = u.appendChild(G.createElement("div")), n.style.cssText = u.style.cssText = r, n.style.marginRight = n.style.width = "0", u.style.width = "1px", e.reliableMarginRight = !parseFloat((t.getComputedStyle(n, null) || {}).marginRight)), typeof u.style.zoom !== K && (u.innerHTML = "", u.style.cssText = r + "width:1px;padding:1px;display:inline;zoom:1", e.inlineBlockNeedsLayout = 3 === u.offsetWidth, u.style.display = "block", u.innerHTML = "<div></div>", u.firstChild.style.width = "5px", e.shrinkWrapBlocks = 3 !== u.offsetWidth, e.inlineBlockNeedsLayout && (o.style.zoom = 1)), o.removeChild(i), i = u = s = n = null)
        }), i = r = o = a = n = s = null, e
    }({});
    var Tt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, St = /([A-Z])/g;
    ht.extend({
        cache: {},
        noData: {applet: !0, embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
        hasData: function (t) {
            return t = t.nodeType ? ht.cache[t[ht.expando]] : t[ht.expando], !!t && !a(t)
        },
        data: function (t, e, i) {
            return s(t, e, i)
        },
        removeData: function (t, e) {
            return r(t, e)
        },
        _data: function (t, e, i) {
            return s(t, e, i, !0)
        },
        _removeData: function (t, e) {
            return r(t, e, !0)
        },
        acceptData: function (t) {
            if (t.nodeType && 1 !== t.nodeType && 9 !== t.nodeType)return !1;
            var e = t.nodeName && ht.noData[t.nodeName.toLowerCase()];
            return !e || e !== !0 && t.getAttribute("classid") === e
        }
    }), ht.fn.extend({
        data: function (t, i) {
            var n, s, r = null, a = 0, l = this[0];
            if (t === e) {
                if (this.length && (r = ht.data(l), 1 === l.nodeType && !ht._data(l, "parsedAttrs"))) {
                    for (n = l.attributes; a < n.length; a++)s = n[a].name, 0 === s.indexOf("data-") && (s = ht.camelCase(s.slice(5)), o(l, s, r[s]));
                    ht._data(l, "parsedAttrs", !0)
                }
                return r
            }
            return "object" == typeof t ? this.each(function () {
                ht.data(this, t)
            }) : arguments.length > 1 ? this.each(function () {
                ht.data(this, t, i)
            }) : l ? o(l, t, ht.data(l, t)) : null
        }, removeData: function (t) {
            return this.each(function () {
                ht.removeData(this, t)
            })
        }
    }), ht.extend({
        queue: function (t, e, i) {
            var n;
            return t ? (e = (e || "fx") + "queue", n = ht._data(t, e), i && (!n || ht.isArray(i) ? n = ht._data(t, e, ht.makeArray(i)) : n.push(i)), n || []) : void 0
        }, dequeue: function (t, e) {
            e = e || "fx";
            var i = ht.queue(t, e), n = i.length, s = i.shift(), r = ht._queueHooks(t, e), o = function () {
                ht.dequeue(t, e)
            };
            "inprogress" === s && (s = i.shift(), n--), s && ("fx" === e && i.unshift("inprogress"), delete r.stop, s.call(t, o, r)), !n && r && r.empty.fire()
        }, _queueHooks: function (t, e) {
            var i = e + "queueHooks";
            return ht._data(t, i) || ht._data(t, i, {
                    empty: ht.Callbacks("once memory").add(function () {
                        ht._removeData(t, e + "queue"), ht._removeData(t, i)
                    })
                })
        }
    }), ht.fn.extend({
        queue: function (t, i) {
            var n = 2;
            return "string" != typeof t && (i = t, t = "fx", n--), arguments.length < n ? ht.queue(this[0], t) : i === e ? this : this.each(function () {
                var e = ht.queue(this, t, i);
                ht._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && ht.dequeue(this, t)
            })
        }, dequeue: function (t) {
            return this.each(function () {
                ht.dequeue(this, t)
            })
        }, delay: function (t, e) {
            return t = ht.fx ? ht.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function (e, i) {
                var n = setTimeout(e, t);
                i.stop = function () {
                    clearTimeout(n)
                }
            })
        }, clearQueue: function (t) {
            return this.queue(t || "fx", [])
        }, promise: function (t, i) {
            var n, s = 1, r = ht.Deferred(), o = this, a = this.length, l = function () {
                --s || r.resolveWith(o, [o])
            };
            for ("string" != typeof t && (i = t, t = e), t = t || "fx"; a--;)n = ht._data(o[a], t + "queueHooks"), n && n.empty && (s++, n.empty.add(l));
            return l(), r.promise(i)
        }
    });
    var Mt, Ft, Et = /[\t\r\n\f]/g, It = /\r/g, At = /^(?:input|select|textarea|button|object)$/i, Pt = /^(?:a|area)$/i, Nt = /^(?:checked|selected)$/i, $t = ht.support.getSetAttribute, Ot = ht.support.input;
    ht.fn.extend({
        attr: function (t, e) {
            return ht.access(this, ht.attr, t, e, arguments.length > 1)
        }, removeAttr: function (t) {
            return this.each(function () {
                ht.removeAttr(this, t)
            })
        }, prop: function (t, e) {
            return ht.access(this, ht.prop, t, e, arguments.length > 1)
        }, removeProp: function (t) {
            return t = ht.propFix[t] || t, this.each(function () {
                try {
                    this[t] = e, delete this[t]
                } catch (i) {
                }
            })
        }, addClass: function (t) {
            var e, i, n, s, r, o = 0, a = this.length, l = "string" == typeof t && t;
            if (ht.isFunction(t))return this.each(function (e) {
                ht(this).addClass(t.call(this, e, this.className))
            });
            if (l)for (e = (t || "").match(dt) || []; a > o; o++)if (i = this[o], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(Et, " ") : " ")) {
                for (r = 0; s = e[r++];)n.indexOf(" " + s + " ") < 0 && (n += s + " ");
                i.className = ht.trim(n)
            }
            return this
        }, removeClass: function (t) {
            var e, i, n, s, r, o = 0, a = this.length, l = 0 === arguments.length || "string" == typeof t && t;
            if (ht.isFunction(t))return this.each(function (e) {
                ht(this).removeClass(t.call(this, e, this.className))
            });
            if (l)for (e = (t || "").match(dt) || []; a > o; o++)if (i = this[o], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(Et, " ") : "")) {
                for (r = 0; s = e[r++];)for (; n.indexOf(" " + s + " ") >= 0;)n = n.replace(" " + s + " ", " ");
                i.className = t ? ht.trim(n) : ""
            }
            return this
        }, toggleClass: function (t, e) {
            var i = typeof t;
            return "boolean" == typeof e && "string" === i ? e ? this.addClass(t) : this.removeClass(t) : this.each(ht.isFunction(t) ? function (i) {
                ht(this).toggleClass(t.call(this, i, this.className, e), e)
            } : function () {
                if ("string" === i)for (var e, n = 0, s = ht(this), r = t.match(dt) || []; e = r[n++];)s.hasClass(e) ? s.removeClass(e) : s.addClass(e); else(i === K || "boolean" === i) && (this.className && ht._data(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : ht._data(this, "__className__") || "")
            })
        }, hasClass: function (t) {
            for (var e = " " + t + " ", i = 0, n = this.length; n > i; i++)if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(Et, " ").indexOf(e) >= 0)return !0;
            return !1
        }, val: function (t) {
            var i, n, s, r = this[0];
            {
                if (arguments.length)return s = ht.isFunction(t), this.each(function (i) {
                    var r;
                    1 === this.nodeType && (r = s ? t.call(this, i, ht(this).val()) : t, null == r ? r = "" : "number" == typeof r ? r += "" : ht.isArray(r) && (r = ht.map(r, function (t) {
                        return null == t ? "" : t + ""
                    })), n = ht.valHooks[this.type] || ht.valHooks[this.nodeName.toLowerCase()], n && "set" in n && n.set(this, r, "value") !== e || (this.value = r))
                });
                if (r)return n = ht.valHooks[r.type] || ht.valHooks[r.nodeName.toLowerCase()], n && "get" in n && (i = n.get(r, "value")) !== e ? i : (i = r.value, "string" == typeof i ? i.replace(It, "") : null == i ? "" : i)
            }
        }
    }), ht.extend({
        valHooks: {
            option: {
                get: function (t) {
                    var e = ht.find.attr(t, "value");
                    return null != e ? e : t.text
                }
            }, select: {
                get: function (t) {
                    for (var e, i, n = t.options, s = t.selectedIndex, r = "select-one" === t.type || 0 > s, o = r ? null : [], a = r ? s + 1 : n.length, l = 0 > s ? a : r ? s : 0; a > l; l++)if (i = n[l], !(!i.selected && l !== s || (ht.support.optDisabled ? i.disabled : null !== i.getAttribute("disabled")) || i.parentNode.disabled && ht.nodeName(i.parentNode, "optgroup"))) {
                        if (e = ht(i).val(), r)return e;
                        o.push(e)
                    }
                    return o
                }, set: function (t, e) {
                    for (var i, n, s = t.options, r = ht.makeArray(e), o = s.length; o--;)n = s[o], (n.selected = ht.inArray(ht(n).val(), r) >= 0) && (i = !0);
                    return i || (t.selectedIndex = -1), r
                }
            }
        }, attr: function (t, i, n) {
            var s, r, o = t.nodeType;
            if (t && 3 !== o && 8 !== o && 2 !== o)return typeof t.getAttribute === K ? ht.prop(t, i, n) : (1 === o && ht.isXMLDoc(t) || (i = i.toLowerCase(), s = ht.attrHooks[i] || (ht.expr.match.bool.test(i) ? Ft : Mt)), n === e ? s && "get" in s && null !== (r = s.get(t, i)) ? r : (r = ht.find.attr(t, i), null == r ? e : r) : null !== n ? s && "set" in s && (r = s.set(t, n, i)) !== e ? r : (t.setAttribute(i, n + ""), n) : void ht.removeAttr(t, i))
        }, removeAttr: function (t, e) {
            var i, n, s = 0, r = e && e.match(dt);
            if (r && 1 === t.nodeType)for (; i = r[s++];)n = ht.propFix[i] || i, ht.expr.match.bool.test(i) ? Ot && $t || !Nt.test(i) ? t[n] = !1 : t[ht.camelCase("default-" + i)] = t[n] = !1 : ht.attr(t, i, ""), t.removeAttribute($t ? i : n)
        }, attrHooks: {
            type: {
                set: function (t, e) {
                    if (!ht.support.radioValue && "radio" === e && ht.nodeName(t, "input")) {
                        var i = t.value;
                        return t.setAttribute("type", e), i && (t.value = i), e
                    }
                }
            }
        }, propFix: {"for": "htmlFor", "class": "className"}, prop: function (t, i, n) {
            var s, r, o, a = t.nodeType;
            if (t && 3 !== a && 8 !== a && 2 !== a)return o = 1 !== a || !ht.isXMLDoc(t), o && (i = ht.propFix[i] || i, r = ht.propHooks[i]), n !== e ? r && "set" in r && (s = r.set(t, n, i)) !== e ? s : t[i] = n : r && "get" in r && null !== (s = r.get(t, i)) ? s : t[i]
        }, propHooks: {
            tabIndex: {
                get: function (t) {
                    var e = ht.find.attr(t, "tabindex");
                    return e ? parseInt(e, 10) : At.test(t.nodeName) || Pt.test(t.nodeName) && t.href ? 0 : -1
                }
            }
        }
    }), Ft = {
        set: function (t, e, i) {
            return e === !1 ? ht.removeAttr(t, i) : Ot && $t || !Nt.test(i) ? t.setAttribute(!$t && ht.propFix[i] || i, i) : t[ht.camelCase("default-" + i)] = t[i] = !0, i
        }
    }, ht.each(ht.expr.match.bool.source.match(/\w+/g), function (t, i) {
        var n = ht.expr.attrHandle[i] || ht.find.attr;
        ht.expr.attrHandle[i] = Ot && $t || !Nt.test(i) ? function (t, i, s) {
            var r = ht.expr.attrHandle[i], o = s ? e : (ht.expr.attrHandle[i] = e) != n(t, i, s) ? i.toLowerCase() : null;
            return ht.expr.attrHandle[i] = r, o
        } : function (t, i, n) {
            return n ? e : t[ht.camelCase("default-" + i)] ? i.toLowerCase() : null
        }
    }), Ot && $t || (ht.attrHooks.value = {
        set: function (t, e, i) {
            return ht.nodeName(t, "input") ? void(t.defaultValue = e) : Mt && Mt.set(t, e, i)
        }
    }), $t || (Mt = {
        set: function (t, i, n) {
            var s = t.getAttributeNode(n);
            return s || t.setAttributeNode(s = t.ownerDocument.createAttribute(n)), s.value = i += "", "value" === n || i === t.getAttribute(n) ? i : e
        }
    }, ht.expr.attrHandle.id = ht.expr.attrHandle.name = ht.expr.attrHandle.coords = function (t, i, n) {
        var s;
        return n ? e : (s = t.getAttributeNode(i)) && "" !== s.value ? s.value : null
    }, ht.valHooks.button = {
        get: function (t, i) {
            var n = t.getAttributeNode(i);
            return n && n.specified ? n.value : e
        }, set: Mt.set
    }, ht.attrHooks.contenteditable = {
        set: function (t, e, i) {
            Mt.set(t, "" === e ? !1 : e, i)
        }
    }, ht.each(["width", "height"], function (t, e) {
        ht.attrHooks[e] = {
            set: function (t, i) {
                return "" === i ? (t.setAttribute(e, "auto"), i) : void 0
            }
        }
    })), ht.support.hrefNormalized || ht.each(["href", "src"], function (t, e) {
        ht.propHooks[e] = {
            get: function (t) {
                return t.getAttribute(e, 4)
            }
        }
    }), ht.support.style || (ht.attrHooks.style = {
        get: function (t) {
            return t.style.cssText || e
        }, set: function (t, e) {
            return t.style.cssText = e + ""
        }
    }), ht.support.optSelected || (ht.propHooks.selected = {
        get: function (t) {
            var e = t.parentNode;
            return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
        }
    }), ht.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        ht.propFix[this.toLowerCase()] = this
    }), ht.support.enctype || (ht.propFix.enctype = "encoding"), ht.each(["radio", "checkbox"], function () {
        ht.valHooks[this] = {
            set: function (t, e) {
                return ht.isArray(e) ? t.checked = ht.inArray(ht(t).val(), e) >= 0 : void 0
            }
        }, ht.support.checkOn || (ht.valHooks[this].get = function (t) {
            return null === t.getAttribute("value") ? "on" : t.value
        })
    });
    var zt = /^(?:input|select|textarea)$/i, jt = /^key/, Ht = /^(?:mouse|contextmenu)|click/, Rt = /^(?:focusinfocus|focusoutblur)$/, Lt = /^([^.]*)(?:\.(.+)|)$/;
    ht.event = {
        global: {},
        add: function (t, i, n, s, r) {
            var o, a, l, c, h, u, d, p, f, m, g, v = ht._data(t);
            if (v) {
                for (n.handler && (c = n, n = c.handler, r = c.selector), n.guid || (n.guid = ht.guid++), (a = v.events) || (a = v.events = {}), (u = v.handle) || (u = v.handle = function (t) {
                    return typeof ht === K || t && ht.event.triggered === t.type ? e : ht.event.dispatch.apply(u.elem, arguments)
                }, u.elem = t), i = (i || "").match(dt) || [""], l = i.length; l--;)o = Lt.exec(i[l]) || [], f = g = o[1], m = (o[2] || "").split(".").sort(), f && (h = ht.event.special[f] || {}, f = (r ? h.delegateType : h.bindType) || f, h = ht.event.special[f] || {}, d = ht.extend({
                    type: f,
                    origType: g,
                    data: s,
                    handler: n,
                    guid: n.guid,
                    selector: r,
                    needsContext: r && ht.expr.match.needsContext.test(r),
                    namespace: m.join(".")
                }, c), (p = a[f]) || (p = a[f] = [], p.delegateCount = 0, h.setup && h.setup.call(t, s, m, u) !== !1 || (t.addEventListener ? t.addEventListener(f, u, !1) : t.attachEvent && t.attachEvent("on" + f, u))), h.add && (h.add.call(t, d), d.handler.guid || (d.handler.guid = n.guid)), r ? p.splice(p.delegateCount++, 0, d) : p.push(d), ht.event.global[f] = !0);
                t = null
            }
        },
        remove: function (t, e, i, n, s) {
            var r, o, a, l, c, h, u, d, p, f, m, g = ht.hasData(t) && ht._data(t);
            if (g && (h = g.events)) {
                for (e = (e || "").match(dt) || [""], c = e.length; c--;)if (a = Lt.exec(e[c]) || [], p = m = a[1], f = (a[2] || "").split(".").sort(), p) {
                    for (u = ht.event.special[p] || {}, p = (n ? u.delegateType : u.bindType) || p, d = h[p] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = r = d.length; r--;)o = d[r], !s && m !== o.origType || i && i.guid !== o.guid || a && !a.test(o.namespace) || n && n !== o.selector && ("**" !== n || !o.selector) || (d.splice(r, 1), o.selector && d.delegateCount--, u.remove && u.remove.call(t, o));
                    l && !d.length && (u.teardown && u.teardown.call(t, f, g.handle) !== !1 || ht.removeEvent(t, p, g.handle), delete h[p])
                } else for (p in h)ht.event.remove(t, p + e[c], i, n, !0);
                ht.isEmptyObject(h) && (delete g.handle, ht._removeData(t, "events"))
            }
        },
        trigger: function (i, n, s, r) {
            var o, a, l, c, h, u, d, p = [s || G], f = lt.call(i, "type") ? i.type : i, m = lt.call(i, "namespace") ? i.namespace.split(".") : [];
            if (l = u = s = s || G, 3 !== s.nodeType && 8 !== s.nodeType && !Rt.test(f + ht.event.triggered) && (f.indexOf(".") >= 0 && (m = f.split("."), f = m.shift(), m.sort()), a = f.indexOf(":") < 0 && "on" + f, i = i[ht.expando] ? i : new ht.Event(f, "object" == typeof i && i), i.isTrigger = r ? 2 : 3, i.namespace = m.join("."), i.namespace_re = i.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, i.result = e, i.target || (i.target = s), n = null == n ? [i] : ht.makeArray(n, [i]), h = ht.event.special[f] || {}, r || !h.trigger || h.trigger.apply(s, n) !== !1)) {
                if (!r && !h.noBubble && !ht.isWindow(s)) {
                    for (c = h.delegateType || f, Rt.test(c + f) || (l = l.parentNode); l; l = l.parentNode)p.push(l), u = l;
                    u === (s.ownerDocument || G) && p.push(u.defaultView || u.parentWindow || t)
                }
                for (d = 0; (l = p[d++]) && !i.isPropagationStopped();)i.type = d > 1 ? c : h.bindType || f, o = (ht._data(l, "events") || {})[i.type] && ht._data(l, "handle"), o && o.apply(l, n), o = a && l[a], o && ht.acceptData(l) && o.apply && o.apply(l, n) === !1 && i.preventDefault();
                if (i.type = f, !r && !i.isDefaultPrevented() && (!h._default || h._default.apply(p.pop(), n) === !1) && ht.acceptData(s) && a && s[f] && !ht.isWindow(s)) {
                    u = s[a], u && (s[a] = null), ht.event.triggered = f;
                    try {
                        s[f]()
                    } catch (g) {
                    }
                    ht.event.triggered = e, u && (s[a] = u)
                }
                return i.result
            }
        },
        dispatch: function (t) {
            t = ht.event.fix(t);
            var i, n, s, r, o, a = [], l = rt.call(arguments), c = (ht._data(this, "events") || {})[t.type] || [], h = ht.event.special[t.type] || {};
            if (l[0] = t, t.delegateTarget = this, !h.preDispatch || h.preDispatch.call(this, t) !== !1) {
                for (a = ht.event.handlers.call(this, t, c), i = 0; (r = a[i++]) && !t.isPropagationStopped();)for (t.currentTarget = r.elem, o = 0; (s = r.handlers[o++]) && !t.isImmediatePropagationStopped();)(!t.namespace_re || t.namespace_re.test(s.namespace)) && (t.handleObj = s, t.data = s.data, n = ((ht.event.special[s.origType] || {}).handle || s.handler).apply(r.elem, l), n !== e && (t.result = n) === !1 && (t.preventDefault(), t.stopPropagation()));
                return h.postDispatch && h.postDispatch.call(this, t), t.result
            }
        },
        handlers: function (t, i) {
            var n, s, r, o, a = [], l = i.delegateCount, c = t.target;
            if (l && c.nodeType && (!t.button || "click" !== t.type))for (; c != this; c = c.parentNode || this)if (1 === c.nodeType && (c.disabled !== !0 || "click" !== t.type)) {
                for (r = [], o = 0; l > o; o++)s = i[o], n = s.selector + " ", r[n] === e && (r[n] = s.needsContext ? ht(n, this).index(c) >= 0 : ht.find(n, this, null, [c]).length), r[n] && r.push(s);
                r.length && a.push({elem: c, handlers: r})
            }
            return l < i.length && a.push({elem: this, handlers: i.slice(l)}), a
        },
        fix: function (t) {
            if (t[ht.expando])return t;
            var e, i, n, s = t.type, r = t, o = this.fixHooks[s];
            for (o || (this.fixHooks[s] = o = Ht.test(s) ? this.mouseHooks : jt.test(s) ? this.keyHooks : {}), n = o.props ? this.props.concat(o.props) : this.props, t = new ht.Event(r), e = n.length; e--;)i = n[e], t[i] = r[i];
            return t.target || (t.target = r.srcElement || G), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey = !!t.metaKey, o.filter ? o.filter(t, r) : t
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (t, e) {
                return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (t, i) {
                var n, s, r, o = i.button, a = i.fromElement;
                return null == t.pageX && null != i.clientX && (s = t.target.ownerDocument || G, r = s.documentElement, n = s.body, t.pageX = i.clientX + (r && r.scrollLeft || n && n.scrollLeft || 0) - (r && r.clientLeft || n && n.clientLeft || 0), t.pageY = i.clientY + (r && r.scrollTop || n && n.scrollTop || 0) - (r && r.clientTop || n && n.clientTop || 0)), !t.relatedTarget && a && (t.relatedTarget = a === t.target ? i.toElement : a), t.which || o === e || (t.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), t
            }
        },
        special: {
            load: {noBubble: !0}, focus: {
                trigger: function () {
                    if (this !== h() && this.focus)try {
                        return this.focus(), !1
                    } catch (t) {
                    }
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    return this === h() && this.blur ? (this.blur(), !1) : void 0
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    return ht.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                }, _default: function (t) {
                    return ht.nodeName(t.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (t) {
                    t.result !== e && (t.originalEvent.returnValue = t.result)
                }
            }
        },
        simulate: function (t, e, i, n) {
            var s = ht.extend(new ht.Event, i, {type: t, isSimulated: !0, originalEvent: {}});
            n ? ht.event.trigger(s, null, e) : ht.event.dispatch.call(e, s), s.isDefaultPrevented() && i.preventDefault()
        }
    }, ht.removeEvent = G.removeEventListener ? function (t, e, i) {
        t.removeEventListener && t.removeEventListener(e, i, !1)
    } : function (t, e, i) {
        var n = "on" + e;
        t.detachEvent && (typeof t[n] === K && (t[n] = null), t.detachEvent(n, i))
    }, ht.Event = function (t, e) {
        return this instanceof ht.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || t.returnValue === !1 || t.getPreventDefault && t.getPreventDefault() ? l : c) : this.type = t, e && ht.extend(this, e), this.timeStamp = t && t.timeStamp || ht.now(), void(this[ht.expando] = !0)) : new ht.Event(t, e)
    }, ht.Event.prototype = {
        isDefaultPrevented: c,
        isPropagationStopped: c,
        isImmediatePropagationStopped: c,
        preventDefault: function () {
            var t = this.originalEvent;
            this.isDefaultPrevented = l, t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
        },
        stopPropagation: function () {
            var t = this.originalEvent;
            this.isPropagationStopped = l, t && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = l, this.stopPropagation()
        }
    }, ht.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (t, e) {
        ht.event.special[t] = {
            delegateType: e, bindType: e, handle: function (t) {
                var i, n = this, s = t.relatedTarget, r = t.handleObj;
                return (!s || s !== n && !ht.contains(n, s)) && (t.type = r.origType, i = r.handler.apply(this, arguments), t.type = e), i
            }
        }
    }), ht.support.submitBubbles || (ht.event.special.submit = {
        setup: function () {
            return ht.nodeName(this, "form") ? !1 : void ht.event.add(this, "click._submit keypress._submit", function (t) {
                var i = t.target, n = ht.nodeName(i, "input") || ht.nodeName(i, "button") ? i.form : e;
                n && !ht._data(n, "submitBubbles") && (ht.event.add(n, "submit._submit", function (t) {
                    t._submit_bubble = !0
                }), ht._data(n, "submitBubbles", !0))
            })
        }, postDispatch: function (t) {
            t._submit_bubble && (delete t._submit_bubble, this.parentNode && !t.isTrigger && ht.event.simulate("submit", this.parentNode, t, !0))
        }, teardown: function () {
            return ht.nodeName(this, "form") ? !1 : void ht.event.remove(this, "._submit")
        }
    }), ht.support.changeBubbles || (ht.event.special.change = {
        setup: function () {
            return zt.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ht.event.add(this, "propertychange._change", function (t) {
                "checked" === t.originalEvent.propertyName && (this._just_changed = !0)
            }), ht.event.add(this, "click._change", function (t) {
                this._just_changed && !t.isTrigger && (this._just_changed = !1), ht.event.simulate("change", this, t, !0)
            })), !1) : void ht.event.add(this, "beforeactivate._change", function (t) {
                var e = t.target;
                zt.test(e.nodeName) && !ht._data(e, "changeBubbles") && (ht.event.add(e, "change._change", function (t) {
                    !this.parentNode || t.isSimulated || t.isTrigger || ht.event.simulate("change", this.parentNode, t, !0)
                }), ht._data(e, "changeBubbles", !0))
            })
        }, handle: function (t) {
            var e = t.target;
            return this !== e || t.isSimulated || t.isTrigger || "radio" !== e.type && "checkbox" !== e.type ? t.handleObj.handler.apply(this, arguments) : void 0
        }, teardown: function () {
            return ht.event.remove(this, "._change"), !zt.test(this.nodeName)
        }
    }), ht.support.focusinBubbles || ht.each({focus: "focusin", blur: "focusout"}, function (t, e) {
        var i = 0, n = function (t) {
            ht.event.simulate(e, t.target, ht.event.fix(t), !0)
        };
        ht.event.special[e] = {
            setup: function () {
                0 === i++ && G.addEventListener(t, n, !0)
            }, teardown: function () {
                0 === --i && G.removeEventListener(t, n, !0)
            }
        }
    }), ht.fn.extend({
        on: function (t, i, n, s, r) {
            var o, a;
            if ("object" == typeof t) {
                "string" != typeof i && (n = n || i, i = e);
                for (o in t)this.on(o, i, n, t[o], r);
                return this
            }
            if (null == n && null == s ? (s = i, n = i = e) : null == s && ("string" == typeof i ? (s = n, n = e) : (s = n, n = i, i = e)), s === !1)s = c; else if (!s)return this;
            return 1 === r && (a = s, s = function (t) {
                return ht().off(t), a.apply(this, arguments)
            }, s.guid = a.guid || (a.guid = ht.guid++)), this.each(function () {
                ht.event.add(this, t, s, n, i)
            })
        }, one: function (t, e, i, n) {
            return this.on(t, e, i, n, 1)
        }, off: function (t, i, n) {
            var s, r;
            if (t && t.preventDefault && t.handleObj)return s = t.handleObj, ht(t.delegateTarget).off(s.namespace ? s.origType + "." + s.namespace : s.origType, s.selector, s.handler), this;
            if ("object" == typeof t) {
                for (r in t)this.off(r, i, t[r]);
                return this
            }
            return (i === !1 || "function" == typeof i) && (n = i, i = e), n === !1 && (n = c), this.each(function () {
                ht.event.remove(this, t, n, i)
            })
        }, trigger: function (t, e) {
            return this.each(function () {
                ht.event.trigger(t, e, this)
            })
        }, triggerHandler: function (t, e) {
            var i = this[0];
            return i ? ht.event.trigger(t, e, i, !0) : void 0
        }
    });
    var Wt = /^.[^:#\[\.,]*$/, qt = /^(?:parents|prev(?:Until|All))/, Bt = ht.expr.match.needsContext, Vt = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    ht.fn.extend({
        find: function (t) {
            var e, i = [], n = this, s = n.length;
            if ("string" != typeof t)return this.pushStack(ht(t).filter(function () {
                for (e = 0; s > e; e++)if (ht.contains(n[e], this))return !0
            }));
            for (e = 0; s > e; e++)ht.find(t, n[e], i);
            return i = this.pushStack(s > 1 ? ht.unique(i) : i), i.selector = this.selector ? this.selector + " " + t : t, i
        }, has: function (t) {
            var e, i = ht(t, this), n = i.length;
            return this.filter(function () {
                for (e = 0; n > e; e++)if (ht.contains(this, i[e]))return !0
            })
        }, not: function (t) {
            return this.pushStack(d(this, t || [], !0))
        }, filter: function (t) {
            return this.pushStack(d(this, t || [], !1))
        }, is: function (t) {
            return !!d(this, "string" == typeof t && Bt.test(t) ? ht(t) : t || [], !1).length
        }, closest: function (t, e) {
            for (var i, n = 0, s = this.length, r = [], o = Bt.test(t) || "string" != typeof t ? ht(t, e || this.context) : 0; s > n; n++)for (i = this[n]; i && i !== e; i = i.parentNode)if (i.nodeType < 11 && (o ? o.index(i) > -1 : 1 === i.nodeType && ht.find.matchesSelector(i, t))) {
                i = r.push(i);
                break
            }
            return this.pushStack(r.length > 1 ? ht.unique(r) : r)
        }, index: function (t) {
            return t ? "string" == typeof t ? ht.inArray(this[0], ht(t)) : ht.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (t, e) {
            var i = "string" == typeof t ? ht(t, e) : ht.makeArray(t && t.nodeType ? [t] : t), n = ht.merge(this.get(), i);
            return this.pushStack(ht.unique(n))
        }, addBack: function (t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }
    }), ht.each({
        parent: function (t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null;
        }, parents: function (t) {
            return ht.dir(t, "parentNode")
        }, parentsUntil: function (t, e, i) {
            return ht.dir(t, "parentNode", i)
        }, next: function (t) {
            return u(t, "nextSibling")
        }, prev: function (t) {
            return u(t, "previousSibling")
        }, nextAll: function (t) {
            return ht.dir(t, "nextSibling")
        }, prevAll: function (t) {
            return ht.dir(t, "previousSibling")
        }, nextUntil: function (t, e, i) {
            return ht.dir(t, "nextSibling", i)
        }, prevUntil: function (t, e, i) {
            return ht.dir(t, "previousSibling", i)
        }, siblings: function (t) {
            return ht.sibling((t.parentNode || {}).firstChild, t)
        }, children: function (t) {
            return ht.sibling(t.firstChild)
        }, contents: function (t) {
            return ht.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : ht.merge([], t.childNodes)
        }
    }, function (t, e) {
        ht.fn[t] = function (i, n) {
            var s = ht.map(this, e, i);
            return "Until" !== t.slice(-5) && (n = i), n && "string" == typeof n && (s = ht.filter(n, s)), this.length > 1 && (Vt[t] || (s = ht.unique(s)), qt.test(t) && (s = s.reverse())), this.pushStack(s)
        }
    }), ht.extend({
        filter: function (t, e, i) {
            var n = e[0];
            return i && (t = ":not(" + t + ")"), 1 === e.length && 1 === n.nodeType ? ht.find.matchesSelector(n, t) ? [n] : [] : ht.find.matches(t, ht.grep(e, function (t) {
                return 1 === t.nodeType
            }))
        }, dir: function (t, i, n) {
            for (var s = [], r = t[i]; r && 9 !== r.nodeType && (n === e || 1 !== r.nodeType || !ht(r).is(n));)1 === r.nodeType && s.push(r), r = r[i];
            return s
        }, sibling: function (t, e) {
            for (var i = []; t; t = t.nextSibling)1 === t.nodeType && t !== e && i.push(t);
            return i
        }
    });
    var Ut = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", Yt = / jQuery\d+="(?:null|\d+)"/g, Kt = new RegExp("<(?:" + Ut + ")[\\s/>]", "i"), Xt = /^\s+/, Gt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Zt = /<([\w:]+)/, Qt = /<tbody/i, Jt = /<|&#?\w+;/, te = /<(?:script|style|link)/i, ee = /^(?:checkbox|radio)$/i, ie = /checked\s*(?:[^=]|=\s*.checked.)/i, ne = /^$|\/(?:java|ecma)script/i, se = /^true\/(.*)/, re = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, oe = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: ht.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    }, ae = p(G), le = ae.appendChild(G.createElement("div"));
    oe.optgroup = oe.option, oe.tbody = oe.tfoot = oe.colgroup = oe.caption = oe.thead, oe.th = oe.td, ht.fn.extend({
        text: function (t) {
            return ht.access(this, function (t) {
                return t === e ? ht.text(this) : this.empty().append((this[0] && this[0].ownerDocument || G).createTextNode(t))
            }, null, t, arguments.length)
        }, append: function () {
            return this.domManip(arguments, function (t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = f(this, t);
                    e.appendChild(t)
                }
            })
        }, prepend: function () {
            return this.domManip(arguments, function (t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = f(this, t);
                    e.insertBefore(t, e.firstChild)
                }
            })
        }, before: function () {
            return this.domManip(arguments, function (t) {
                this.parentNode && this.parentNode.insertBefore(t, this)
            })
        }, after: function () {
            return this.domManip(arguments, function (t) {
                this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
            })
        }, remove: function (t, e) {
            for (var i, n = t ? ht.filter(t, this) : this, s = 0; null != (i = n[s]); s++)e || 1 !== i.nodeType || ht.cleanData(b(i)), i.parentNode && (e && ht.contains(i.ownerDocument, i) && v(b(i, "script")), i.parentNode.removeChild(i));
            return this
        }, empty: function () {
            for (var t, e = 0; null != (t = this[e]); e++) {
                for (1 === t.nodeType && ht.cleanData(b(t, !1)); t.firstChild;)t.removeChild(t.firstChild);
                t.options && ht.nodeName(t, "select") && (t.options.length = 0)
            }
            return this
        }, clone: function (t, e) {
            return t = null == t ? !1 : t, e = null == e ? t : e, this.map(function () {
                return ht.clone(this, t, e)
            })
        }, html: function (t) {
            return ht.access(this, function (t) {
                var i = this[0] || {}, n = 0, s = this.length;
                if (t === e)return 1 === i.nodeType ? i.innerHTML.replace(Yt, "") : e;
                if (!("string" != typeof t || te.test(t) || !ht.support.htmlSerialize && Kt.test(t) || !ht.support.leadingWhitespace && Xt.test(t) || oe[(Zt.exec(t) || ["", ""])[1].toLowerCase()])) {
                    t = t.replace(Gt, "<$1></$2>");
                    try {
                        for (; s > n; n++)i = this[n] || {}, 1 === i.nodeType && (ht.cleanData(b(i, !1)), i.innerHTML = t);
                        i = 0
                    } catch (r) {
                    }
                }
                i && this.empty().append(t)
            }, null, t, arguments.length)
        }, replaceWith: function () {
            var t = ht.map(this, function (t) {
                return [t.nextSibling, t.parentNode]
            }), e = 0;
            return this.domManip(arguments, function (i) {
                var n = t[e++], s = t[e++];
                s && (n && n.parentNode !== s && (n = this.nextSibling), ht(this).remove(), s.insertBefore(i, n))
            }, !0), e ? this : this.remove()
        }, detach: function (t) {
            return this.remove(t, !0)
        }, domManip: function (t, e, i) {
            t = nt.apply([], t);
            var n, s, r, o, a, l, c = 0, h = this.length, u = this, d = h - 1, p = t[0], f = ht.isFunction(p);
            if (f || !(1 >= h || "string" != typeof p || ht.support.checkClone) && ie.test(p))return this.each(function (n) {
                var s = u.eq(n);
                f && (t[0] = p.call(this, n, s.html())), s.domManip(t, e, i)
            });
            if (h && (l = ht.buildFragment(t, this[0].ownerDocument, !1, !i && this), n = l.firstChild, 1 === l.childNodes.length && (l = n), n)) {
                for (o = ht.map(b(l, "script"), m), r = o.length; h > c; c++)s = l, c !== d && (s = ht.clone(s, !0, !0), r && ht.merge(o, b(s, "script"))), e.call(this[c], s, c);
                if (r)for (a = o[o.length - 1].ownerDocument, ht.map(o, g), c = 0; r > c; c++)s = o[c], ne.test(s.type || "") && !ht._data(s, "globalEval") && ht.contains(a, s) && (s.src ? ht._evalUrl(s.src) : ht.globalEval((s.text || s.textContent || s.innerHTML || "").replace(re, "")));
                l = n = null
            }
            return this
        }
    }), ht.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (t, e) {
        ht.fn[t] = function (t) {
            for (var i, n = 0, s = [], r = ht(t), o = r.length - 1; o >= n; n++)i = n === o ? this : this.clone(!0), ht(r[n])[e](i), st.apply(s, i.get());
            return this.pushStack(s)
        }
    }), ht.extend({
        clone: function (t, e, i) {
            var n, s, r, o, a, l = ht.contains(t.ownerDocument, t);
            if (ht.support.html5Clone || ht.isXMLDoc(t) || !Kt.test("<" + t.nodeName + ">") ? r = t.cloneNode(!0) : (le.innerHTML = t.outerHTML, le.removeChild(r = le.firstChild)), !(ht.support.noCloneEvent && ht.support.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || ht.isXMLDoc(t)))for (n = b(r), a = b(t), o = 0; null != (s = a[o]); ++o)n[o] && y(s, n[o]);
            if (e)if (i)for (a = a || b(t), n = n || b(r), o = 0; null != (s = a[o]); o++)_(s, n[o]); else _(t, r);
            return n = b(r, "script"), n.length > 0 && v(n, !l && b(t, "script")), n = a = s = null, r
        }, buildFragment: function (t, e, i, n) {
            for (var s, r, o, a, l, c, h, u = t.length, d = p(e), f = [], m = 0; u > m; m++)if (r = t[m], r || 0 === r)if ("object" === ht.type(r))ht.merge(f, r.nodeType ? [r] : r); else if (Jt.test(r)) {
                for (a = a || d.appendChild(e.createElement("div")), l = (Zt.exec(r) || ["", ""])[1].toLowerCase(), h = oe[l] || oe._default, a.innerHTML = h[1] + r.replace(Gt, "<$1></$2>") + h[2], s = h[0]; s--;)a = a.lastChild;
                if (!ht.support.leadingWhitespace && Xt.test(r) && f.push(e.createTextNode(Xt.exec(r)[0])), !ht.support.tbody)for (r = "table" !== l || Qt.test(r) ? "<table>" !== h[1] || Qt.test(r) ? 0 : a : a.firstChild, s = r && r.childNodes.length; s--;)ht.nodeName(c = r.childNodes[s], "tbody") && !c.childNodes.length && r.removeChild(c);
                for (ht.merge(f, a.childNodes), a.textContent = ""; a.firstChild;)a.removeChild(a.firstChild);
                a = d.lastChild
            } else f.push(e.createTextNode(r));
            for (a && d.removeChild(a), ht.support.appendChecked || ht.grep(b(f, "input"), w), m = 0; r = f[m++];)if ((!n || -1 === ht.inArray(r, n)) && (o = ht.contains(r.ownerDocument, r), a = b(d.appendChild(r), "script"), o && v(a), i))for (s = 0; r = a[s++];)ne.test(r.type || "") && i.push(r);
            return a = null, d
        }, cleanData: function (t, e) {
            for (var i, n, s, r, o = 0, a = ht.expando, l = ht.cache, c = ht.support.deleteExpando, h = ht.event.special; null != (i = t[o]); o++)if ((e || ht.acceptData(i)) && (s = i[a], r = s && l[s])) {
                if (r.events)for (n in r.events)h[n] ? ht.event.remove(i, n) : ht.removeEvent(i, n, r.handle);
                l[s] && (delete l[s], c ? delete i[a] : typeof i.removeAttribute !== K ? i.removeAttribute(a) : i[a] = null, et.push(s))
            }
        }, _evalUrl: function (t) {
            return ht.ajax({url: t, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
        }
    }), ht.fn.extend({
        wrapAll: function (t) {
            if (ht.isFunction(t))return this.each(function (e) {
                ht(this).wrapAll(t.call(this, e))
            });
            if (this[0]) {
                var e = ht(t, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && e.insertBefore(this[0]), e.map(function () {
                    for (var t = this; t.firstChild && 1 === t.firstChild.nodeType;)t = t.firstChild;
                    return t
                }).append(this)
            }
            return this
        }, wrapInner: function (t) {
            return this.each(ht.isFunction(t) ? function (e) {
                ht(this).wrapInner(t.call(this, e))
            } : function () {
                var e = ht(this), i = e.contents();
                i.length ? i.wrapAll(t) : e.append(t)
            })
        }, wrap: function (t) {
            var e = ht.isFunction(t);
            return this.each(function (i) {
                ht(this).wrapAll(e ? t.call(this, i) : t)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                ht.nodeName(this, "body") || ht(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    var ce, he, ue, de = /alpha\([^)]*\)/i, pe = /opacity\s*=\s*([^)]*)/, fe = /^(top|right|bottom|left)$/, me = /^(none|table(?!-c[ea]).+)/, ge = /^margin/, ve = new RegExp("^(" + ut + ")(.*)$", "i"), _e = new RegExp("^(" + ut + ")(?!px)[a-z%]+$", "i"), ye = new RegExp("^([+-])=(" + ut + ")", "i"), be = {BODY: "block"}, we = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, xe = {
        letterSpacing: 0,
        fontWeight: 400
    }, ke = ["Top", "Right", "Bottom", "Left"], Ce = ["Webkit", "O", "Moz", "ms"];
    ht.fn.extend({
        css: function (t, i) {
            return ht.access(this, function (t, i, n) {
                var s, r, o = {}, a = 0;
                if (ht.isArray(i)) {
                    for (r = he(t), s = i.length; s > a; a++)o[i[a]] = ht.css(t, i[a], !1, r);
                    return o
                }
                return n !== e ? ht.style(t, i, n) : ht.css(t, i)
            }, t, i, arguments.length > 1)
        }, show: function () {
            return C(this, !0)
        }, hide: function () {
            return C(this)
        }, toggle: function (t) {
            return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function () {
                k(this) ? ht(this).show() : ht(this).hide()
            })
        }
    }), ht.extend({
        cssHooks: {
            opacity: {
                get: function (t, e) {
                    if (e) {
                        var i = ue(t, "opacity");
                        return "" === i ? "1" : i
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": ht.support.cssFloat ? "cssFloat" : "styleFloat"},
        style: function (t, i, n, s) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var r, o, a, l = ht.camelCase(i), c = t.style;
                if (i = ht.cssProps[l] || (ht.cssProps[l] = x(c, l)), a = ht.cssHooks[i] || ht.cssHooks[l], n === e)return a && "get" in a && (r = a.get(t, !1, s)) !== e ? r : c[i];
                if (o = typeof n, "string" === o && (r = ye.exec(n)) && (n = (r[1] + 1) * r[2] + parseFloat(ht.css(t, i)), o = "number"), !(null == n || "number" === o && isNaN(n) || ("number" !== o || ht.cssNumber[l] || (n += "px"), ht.support.clearCloneStyle || "" !== n || 0 !== i.indexOf("background") || (c[i] = "inherit"), a && "set" in a && (n = a.set(t, n, s)) === e)))try {
                    c[i] = n
                } catch (h) {
                }
            }
        },
        css: function (t, i, n, s) {
            var r, o, a, l = ht.camelCase(i);
            return i = ht.cssProps[l] || (ht.cssProps[l] = x(t.style, l)), a = ht.cssHooks[i] || ht.cssHooks[l], a && "get" in a && (o = a.get(t, !0, n)), o === e && (o = ue(t, i, s)), "normal" === o && i in xe && (o = xe[i]), "" === n || n ? (r = parseFloat(o), n === !0 || ht.isNumeric(r) ? r || 0 : o) : o
        }
    }), t.getComputedStyle ? (he = function (e) {
        return t.getComputedStyle(e, null)
    }, ue = function (t, i, n) {
        var s, r, o, a = n || he(t), l = a ? a.getPropertyValue(i) || a[i] : e, c = t.style;
        return a && ("" !== l || ht.contains(t.ownerDocument, t) || (l = ht.style(t, i)), _e.test(l) && ge.test(i) && (s = c.width, r = c.minWidth, o = c.maxWidth, c.minWidth = c.maxWidth = c.width = l, l = a.width, c.width = s, c.minWidth = r, c.maxWidth = o)), l
    }) : G.documentElement.currentStyle && (he = function (t) {
        return t.currentStyle
    }, ue = function (t, i, n) {
        var s, r, o, a = n || he(t), l = a ? a[i] : e, c = t.style;
        return null == l && c && c[i] && (l = c[i]), _e.test(l) && !fe.test(i) && (s = c.left, r = t.runtimeStyle, o = r && r.left, o && (r.left = t.currentStyle.left), c.left = "fontSize" === i ? "1em" : l, l = c.pixelLeft + "px", c.left = s, o && (r.left = o)), "" === l ? "auto" : l
    }), ht.each(["height", "width"], function (t, e) {
        ht.cssHooks[e] = {
            get: function (t, i, n) {
                return i ? 0 === t.offsetWidth && me.test(ht.css(t, "display")) ? ht.swap(t, we, function () {
                    return S(t, e, n)
                }) : S(t, e, n) : void 0
            }, set: function (t, i, n) {
                var s = n && he(t);
                return D(t, i, n ? T(t, e, n, ht.support.boxSizing && "border-box" === ht.css(t, "boxSizing", !1, s), s) : 0)
            }
        }
    }), ht.support.opacity || (ht.cssHooks.opacity = {
        get: function (t, e) {
            return pe.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
        }, set: function (t, e) {
            var i = t.style, n = t.currentStyle, s = ht.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "", r = n && n.filter || i.filter || "";
            i.zoom = 1, (e >= 1 || "" === e) && "" === ht.trim(r.replace(de, "")) && i.removeAttribute && (i.removeAttribute("filter"), "" === e || n && !n.filter) || (i.filter = de.test(r) ? r.replace(de, s) : r + " " + s)
        }
    }), ht(function () {
        ht.support.reliableMarginRight || (ht.cssHooks.marginRight = {
            get: function (t, e) {
                return e ? ht.swap(t, {display: "inline-block"}, ue, [t, "marginRight"]) : void 0
            }
        }), !ht.support.pixelPosition && ht.fn.position && ht.each(["top", "left"], function (t, e) {
            ht.cssHooks[e] = {
                get: function (t, i) {
                    return i ? (i = ue(t, e), _e.test(i) ? ht(t).position()[e] + "px" : i) : void 0
                }
            }
        })
    }), ht.expr && ht.expr.filters && (ht.expr.filters.hidden = function (t) {
        return t.offsetWidth <= 0 && t.offsetHeight <= 0 || !ht.support.reliableHiddenOffsets && "none" === (t.style && t.style.display || ht.css(t, "display"))
    }, ht.expr.filters.visible = function (t) {
        return !ht.expr.filters.hidden(t)
    }), ht.each({margin: "", padding: "", border: "Width"}, function (t, e) {
        ht.cssHooks[t + e] = {
            expand: function (i) {
                for (var n = 0, s = {}, r = "string" == typeof i ? i.split(" ") : [i]; 4 > n; n++)s[t + ke[n] + e] = r[n] || r[n - 2] || r[0];
                return s
            }
        }, ge.test(t) || (ht.cssHooks[t + e].set = D)
    });
    var De = /%20/g, Te = /\[\]$/, Se = /\r?\n/g, Me = /^(?:submit|button|image|reset|file)$/i, Fe = /^(?:input|select|textarea|keygen)/i;
    ht.fn.extend({
        serialize: function () {
            return ht.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var t = ht.prop(this, "elements");
                return t ? ht.makeArray(t) : this
            }).filter(function () {
                var t = this.type;
                return this.name && !ht(this).is(":disabled") && Fe.test(this.nodeName) && !Me.test(t) && (this.checked || !ee.test(t))
            }).map(function (t, e) {
                var i = ht(this).val();
                return null == i ? null : ht.isArray(i) ? ht.map(i, function (t) {
                    return {name: e.name, value: t.replace(Se, "\r\n")}
                }) : {name: e.name, value: i.replace(Se, "\r\n")}
            }).get()
        }
    }), ht.param = function (t, i) {
        var n, s = [], r = function (t, e) {
            e = ht.isFunction(e) ? e() : null == e ? "" : e, s[s.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
        };
        if (i === e && (i = ht.ajaxSettings && ht.ajaxSettings.traditional), ht.isArray(t) || t.jquery && !ht.isPlainObject(t))ht.each(t, function () {
            r(this.name, this.value)
        }); else for (n in t)E(n, t[n], i, r);
        return s.join("&").replace(De, "+")
    }, ht.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (t, e) {
        ht.fn[e] = function (t, i) {
            return arguments.length > 0 ? this.on(e, null, t, i) : this.trigger(e)
        }
    }), ht.fn.extend({
        hover: function (t, e) {
            return this.mouseenter(t).mouseleave(e || t)
        }, bind: function (t, e, i) {
            return this.on(t, null, e, i)
        }, unbind: function (t, e) {
            return this.off(t, null, e)
        }, delegate: function (t, e, i, n) {
            return this.on(e, t, i, n)
        }, undelegate: function (t, e, i) {
            return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i)
        }
    });
    var Ee, Ie, Ae = ht.now(), Pe = /\?/, Ne = /#.*$/, $e = /([?&])_=[^&]*/, Oe = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, ze = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, je = /^(?:GET|HEAD)$/, He = /^\/\//, Re = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Le = ht.fn.load, We = {}, qe = {}, Be = "*/".concat("*");
    try {
        Ie = X.href
    } catch (Ve) {
        Ie = G.createElement("a"), Ie.href = "", Ie = Ie.href
    }
    Ee = Re.exec(Ie.toLowerCase()) || [], ht.fn.load = function (t, i, n) {
        if ("string" != typeof t && Le)return Le.apply(this, arguments);
        var s, r, o, a = this, l = t.indexOf(" ");
        return l >= 0 && (s = t.slice(l, t.length), t = t.slice(0, l)), ht.isFunction(i) ? (n = i, i = e) : i && "object" == typeof i && (o = "POST"), a.length > 0 && ht.ajax({
            url: t,
            type: o,
            dataType: "html",
            data: i
        }).done(function (t) {
            r = arguments, a.html(s ? ht("<div>").append(ht.parseHTML(t)).find(s) : t)
        }).complete(n && function (t, e) {
                a.each(n, r || [t.responseText, e, t])
            }), this
    }, ht.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (t, e) {
        ht.fn[e] = function (t) {
            return this.on(e, t)
        }
    }), ht.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ie,
            type: "GET",
            isLocal: ze.test(Ee[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Be,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": !0, "text json": ht.parseJSON, "text xml": ht.parseXML},
            flatOptions: {url: !0, context: !0}
        },
        ajaxSetup: function (t, e) {
            return e ? P(P(t, ht.ajaxSettings), e) : P(ht.ajaxSettings, t)
        },
        ajaxPrefilter: I(We),
        ajaxTransport: I(qe),
        ajax: function (t, i) {
            function n(t, i, n, s) {
                var r, u, _, y, w, k = i;
                2 !== b && (b = 2, l && clearTimeout(l), h = e, a = s || "", x.readyState = t > 0 ? 4 : 0, r = t >= 200 && 300 > t || 304 === t, n && (y = N(d, x, n)), y = $(d, y, x, r), r ? (d.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (ht.lastModified[o] = w), w = x.getResponseHeader("etag"), w && (ht.etag[o] = w)), 204 === t || "HEAD" === d.type ? k = "nocontent" : 304 === t ? k = "notmodified" : (k = y.state, u = y.data, _ = y.error, r = !_)) : (_ = k, (t || !k) && (k = "error", 0 > t && (t = 0))), x.status = t, x.statusText = (i || k) + "", r ? m.resolveWith(p, [u, k, x]) : m.rejectWith(p, [x, k, _]), x.statusCode(v), v = e, c && f.trigger(r ? "ajaxSuccess" : "ajaxError", [x, d, r ? u : _]), g.fireWith(p, [x, k]), c && (f.trigger("ajaxComplete", [x, d]), --ht.active || ht.event.trigger("ajaxStop")))
            }

            "object" == typeof t && (i = t, t = e), i = i || {};
            var s, r, o, a, l, c, h, u, d = ht.ajaxSetup({}, i), p = d.context || d, f = d.context && (p.nodeType || p.jquery) ? ht(p) : ht.event, m = ht.Deferred(), g = ht.Callbacks("once memory"), v = d.statusCode || {}, _ = {}, y = {}, b = 0, w = "canceled", x = {
                readyState: 0,
                getResponseHeader: function (t) {
                    var e;
                    if (2 === b) {
                        if (!u)for (u = {}; e = Oe.exec(a);)u[e[1].toLowerCase()] = e[2];
                        e = u[t.toLowerCase()]
                    }
                    return null == e ? null : e
                },
                getAllResponseHeaders: function () {
                    return 2 === b ? a : null
                },
                setRequestHeader: function (t, e) {
                    var i = t.toLowerCase();
                    return b || (t = y[i] = y[i] || t, _[t] = e), this
                },
                overrideMimeType: function (t) {
                    return b || (d.mimeType = t), this
                },
                statusCode: function (t) {
                    var e;
                    if (t)if (2 > b)for (e in t)v[e] = [v[e], t[e]]; else x.always(t[x.status]);
                    return this
                },
                abort: function (t) {
                    var e = t || w;
                    return h && h.abort(e), n(0, e), this
                }
            };
            if (m.promise(x).complete = g.add, x.success = x.done, x.error = x.fail, d.url = ((t || d.url || Ie) + "").replace(Ne, "").replace(He, Ee[1] + "//"), d.type = i.method || i.type || d.method || d.type, d.dataTypes = ht.trim(d.dataType || "*").toLowerCase().match(dt) || [""], null == d.crossDomain && (s = Re.exec(d.url.toLowerCase()), d.crossDomain = !(!s || s[1] === Ee[1] && s[2] === Ee[2] && (s[3] || ("http:" === s[1] ? "80" : "443")) === (Ee[3] || ("http:" === Ee[1] ? "80" : "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = ht.param(d.data, d.traditional)), A(We, d, i, x), 2 === b)return x;
            c = d.global, c && 0 === ht.active++ && ht.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !je.test(d.type), o = d.url, d.hasContent || (d.data && (o = d.url += (Pe.test(o) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = $e.test(o) ? o.replace($e, "$1_=" + Ae++) : o + (Pe.test(o) ? "&" : "?") + "_=" + Ae++)), d.ifModified && (ht.lastModified[o] && x.setRequestHeader("If-Modified-Since", ht.lastModified[o]), ht.etag[o] && x.setRequestHeader("If-None-Match", ht.etag[o])), (d.data && d.hasContent && d.contentType !== !1 || i.contentType) && x.setRequestHeader("Content-Type", d.contentType), x.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Be + "; q=0.01" : "") : d.accepts["*"]);
            for (r in d.headers)x.setRequestHeader(r, d.headers[r]);
            if (d.beforeSend && (d.beforeSend.call(p, x, d) === !1 || 2 === b))return x.abort();
            w = "abort";
            for (r in{success: 1, error: 1, complete: 1})x[r](d[r]);
            if (h = A(qe, d, i, x)) {
                x.readyState = 1, c && f.trigger("ajaxSend", [x, d]), d.async && d.timeout > 0 && (l = setTimeout(function () {
                    x.abort("timeout")
                }, d.timeout));
                try {
                    b = 1, h.send(_, n)
                } catch (k) {
                    if (!(2 > b))throw k;
                    n(-1, k)
                }
            } else n(-1, "No Transport");
            return x
        },
        getJSON: function (t, e, i) {
            return ht.get(t, e, i, "json")
        },
        getScript: function (t, i) {
            return ht.get(t, e, i, "script")
        }
    }), ht.each(["get", "post"], function (t, i) {
        ht[i] = function (t, n, s, r) {
            return ht.isFunction(n) && (r = r || s, s = n, n = e), ht.ajax({
                url: t,
                type: i,
                dataType: r,
                data: n,
                success: s
            })
        }
    }), ht.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /(?:java|ecma)script/},
        converters: {
            "text script": function (t) {
                return ht.globalEval(t), t
            }
        }
    }), ht.ajaxPrefilter("script", function (t) {
        t.cache === e && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
    }), ht.ajaxTransport("script", function (t) {
        if (t.crossDomain) {
            var i, n = G.head || ht("head")[0] || G.documentElement;
            return {
                send: function (e, s) {
                    i = G.createElement("script"), i.async = !0, t.scriptCharset && (i.charset = t.scriptCharset), i.src = t.url, i.onload = i.onreadystatechange = function (t, e) {
                        (e || !i.readyState || /loaded|complete/.test(i.readyState)) && (i.onload = i.onreadystatechange = null, i.parentNode && i.parentNode.removeChild(i), i = null, e || s(200, "success"))
                    }, n.insertBefore(i, n.firstChild)
                }, abort: function () {
                    i && i.onload(e, !0)
                }
            }
        }
    });
    var Ue = [], Ye = /(=)\?(?=&|$)|\?\?/;
    ht.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var t = Ue.pop() || ht.expando + "_" + Ae++;
            return this[t] = !0, t
        }
    }), ht.ajaxPrefilter("json jsonp", function (i, n, s) {
        var r, o, a, l = i.jsonp !== !1 && (Ye.test(i.url) ? "url" : "string" == typeof i.data && !(i.contentType || "").indexOf("application/x-www-form-urlencoded") && Ye.test(i.data) && "data");
        return l || "jsonp" === i.dataTypes[0] ? (r = i.jsonpCallback = ht.isFunction(i.jsonpCallback) ? i.jsonpCallback() : i.jsonpCallback, l ? i[l] = i[l].replace(Ye, "$1" + r) : i.jsonp !== !1 && (i.url += (Pe.test(i.url) ? "&" : "?") + i.jsonp + "=" + r), i.converters["script json"] = function () {
            return a || ht.error(r + " was not called"), a[0]
        }, i.dataTypes[0] = "json", o = t[r], t[r] = function () {
            a = arguments
        }, s.always(function () {
            t[r] = o, i[r] && (i.jsonpCallback = n.jsonpCallback, Ue.push(r)), a && ht.isFunction(o) && o(a[0]), a = o = e
        }), "script") : void 0
    });
    var Ke, Xe, Ge = 0, Ze = t.ActiveXObject && function () {
            var t;
            for (t in Ke)Ke[t](e, !0)
        };
    ht.ajaxSettings.xhr = t.ActiveXObject ? function () {
        return !this.isLocal && O() || z()
    } : O, Xe = ht.ajaxSettings.xhr(), ht.support.cors = !!Xe && "withCredentials" in Xe, Xe = ht.support.ajax = !!Xe, Xe && ht.ajaxTransport(function (i) {
        if (!i.crossDomain || ht.support.cors) {
            var n;
            return {
                send: function (s, r) {
                    var o, a, l = i.xhr();
                    if (i.username ? l.open(i.type, i.url, i.async, i.username, i.password) : l.open(i.type, i.url, i.async), i.xhrFields)for (a in i.xhrFields)l[a] = i.xhrFields[a];
                    i.mimeType && l.overrideMimeType && l.overrideMimeType(i.mimeType), i.crossDomain || s["X-Requested-With"] || (s["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (a in s)l.setRequestHeader(a, s[a])
                    } catch (c) {
                    }
                    l.send(i.hasContent && i.data || null), n = function (t, s) {
                        var a, c, h, u;
                        try {
                            if (n && (s || 4 === l.readyState))if (n = e, o && (l.onreadystatechange = ht.noop, Ze && delete Ke[o]), s)4 !== l.readyState && l.abort(); else {
                                u = {}, a = l.status, c = l.getAllResponseHeaders(), "string" == typeof l.responseText && (u.text = l.responseText);
                                try {
                                    h = l.statusText
                                } catch (d) {
                                    h = ""
                                }
                                a || !i.isLocal || i.crossDomain ? 1223 === a && (a = 204) : a = u.text ? 200 : 404
                            }
                        } catch (p) {
                            s || r(-1, p)
                        }
                        u && r(a, h, u, c)
                    }, i.async ? 4 === l.readyState ? setTimeout(n) : (o = ++Ge, Ze && (Ke || (Ke = {}, ht(t).unload(Ze)), Ke[o] = n), l.onreadystatechange = n) : n()
                }, abort: function () {
                    n && n(e, !0)
                }
            }
        }
    });
    var Qe, Je, ti = /^(?:toggle|show|hide)$/, ei = new RegExp("^(?:([+-])=|)(" + ut + ")([a-z%]*)$", "i"), ii = /queueHooks$/, ni = [W], si = {
        "*": [function (t, e) {
            var i = this.createTween(t, e), n = i.cur(), s = ei.exec(e), r = s && s[3] || (ht.cssNumber[t] ? "" : "px"), o = (ht.cssNumber[t] || "px" !== r && +n) && ei.exec(ht.css(i.elem, t)), a = 1, l = 20;
            if (o && o[3] !== r) {
                r = r || o[3], s = s || [], o = +n || 1;
                do a = a || ".5", o /= a, ht.style(i.elem, t, o + r); while (a !== (a = i.cur() / n) && 1 !== a && --l)
            }
            return s && (o = i.start = +o || +n || 0, i.unit = r, i.end = s[1] ? o + (s[1] + 1) * s[2] : +s[2]), i
        }]
    };
    ht.Animation = ht.extend(R, {
        tweener: function (t, e) {
            ht.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
            for (var i, n = 0, s = t.length; s > n; n++)i = t[n], si[i] = si[i] || [], si[i].unshift(e)
        }, prefilter: function (t, e) {
            e ? ni.unshift(t) : ni.push(t)
        }
    }), ht.Tween = q, q.prototype = {
        constructor: q, init: function (t, e, i, n, s, r) {
            this.elem = t, this.prop = i, this.easing = s || "swing", this.options = e, this.start = this.now = this.cur(), this.end = n, this.unit = r || (ht.cssNumber[i] ? "" : "px")
        }, cur: function () {
            var t = q.propHooks[this.prop];
            return t && t.get ? t.get(this) : q.propHooks._default.get(this)
        }, run: function (t) {
            var e, i = q.propHooks[this.prop];
            return this.options.duration ? this.pos = e = ht.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : q.propHooks._default.set(this), this
        }
    }, q.prototype.init.prototype = q.prototype, q.propHooks = {
        _default: {
            get: function (t) {
                var e;
                return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = ht.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
            }, set: function (t) {
                ht.fx.step[t.prop] ? ht.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[ht.cssProps[t.prop]] || ht.cssHooks[t.prop]) ? ht.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
            }
        }
    }, q.propHooks.scrollTop = q.propHooks.scrollLeft = {
        set: function (t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
        }
    }, ht.each(["toggle", "show", "hide"], function (t, e) {
        var i = ht.fn[e];
        ht.fn[e] = function (t, n, s) {
            return null == t || "boolean" == typeof t ? i.apply(this, arguments) : this.animate(B(e, !0), t, n, s)
        }
    }), ht.fn.extend({
        fadeTo: function (t, e, i, n) {
            return this.filter(k).css("opacity", 0).show().end().animate({opacity: e}, t, i, n)
        }, animate: function (t, e, i, n) {
            var s = ht.isEmptyObject(t), r = ht.speed(e, i, n), o = function () {
                var e = R(this, ht.extend({}, t), r);
                (s || ht._data(this, "finish")) && e.stop(!0)
            };
            return o.finish = o, s || r.queue === !1 ? this.each(o) : this.queue(r.queue, o)
        }, stop: function (t, i, n) {
            var s = function (t) {
                var e = t.stop;
                delete t.stop, e(n)
            };
            return "string" != typeof t && (n = i, i = t, t = e), i && t !== !1 && this.queue(t || "fx", []), this.each(function () {
                var e = !0, i = null != t && t + "queueHooks", r = ht.timers, o = ht._data(this);
                if (i)o[i] && o[i].stop && s(o[i]); else for (i in o)o[i] && o[i].stop && ii.test(i) && s(o[i]);
                for (i = r.length; i--;)r[i].elem !== this || null != t && r[i].queue !== t || (r[i].anim.stop(n), e = !1, r.splice(i, 1));
                (e || !n) && ht.dequeue(this, t)
            })
        }, finish: function (t) {
            return t !== !1 && (t = t || "fx"), this.each(function () {
                var e, i = ht._data(this), n = i[t + "queue"], s = i[t + "queueHooks"], r = ht.timers, o = n ? n.length : 0;
                for (i.finish = !0, ht.queue(this, t, []), s && s.stop && s.stop.call(this, !0), e = r.length; e--;)r[e].elem === this && r[e].queue === t && (r[e].anim.stop(!0), r.splice(e, 1));
                for (e = 0; o > e; e++)n[e] && n[e].finish && n[e].finish.call(this);
                delete i.finish
            })
        }
    }), ht.each({
        slideDown: B("show"),
        slideUp: B("hide"),
        slideToggle: B("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (t, e) {
        ht.fn[t] = function (t, i, n) {
            return this.animate(e, t, i, n)
        }
    }), ht.speed = function (t, e, i) {
        var n = t && "object" == typeof t ? ht.extend({}, t) : {
            complete: i || !i && e || ht.isFunction(t) && t,
            duration: t,
            easing: i && e || e && !ht.isFunction(e) && e
        };
        return n.duration = ht.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in ht.fx.speeds ? ht.fx.speeds[n.duration] : ht.fx.speeds._default, (null == n.queue || n.queue === !0) && (n.queue = "fx"), n.old = n.complete, n.complete = function () {
            ht.isFunction(n.old) && n.old.call(this), n.queue && ht.dequeue(this, n.queue)
        }, n
    }, ht.easing = {
        linear: function (t) {
            return t
        }, swing: function (t) {
            return .5 - Math.cos(t * Math.PI) / 2
        }
    }, ht.timers = [], ht.fx = q.prototype.init, ht.fx.tick = function () {
        var t, i = ht.timers, n = 0;
        for (Qe = ht.now(); n < i.length; n++)t = i[n], t() || i[n] !== t || i.splice(n--, 1);
        i.length || ht.fx.stop(), Qe = e
    }, ht.fx.timer = function (t) {
        t() && ht.timers.push(t) && ht.fx.start()
    }, ht.fx.interval = 13, ht.fx.start = function () {
        Je || (Je = setInterval(ht.fx.tick, ht.fx.interval))
    }, ht.fx.stop = function () {
        clearInterval(Je), Je = null
    }, ht.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, ht.fx.step = {}, ht.expr && ht.expr.filters && (ht.expr.filters.animated = function (t) {
        return ht.grep(ht.timers, function (e) {
            return t === e.elem
        }).length
    }), ht.fn.offset = function (t) {
        if (arguments.length)return t === e ? this : this.each(function (e) {
            ht.offset.setOffset(this, t, e)
        });
        var i, n, s = {top: 0, left: 0}, r = this[0], o = r && r.ownerDocument;
        if (o)return i = o.documentElement, ht.contains(i, r) ? (typeof r.getBoundingClientRect !== K && (s = r.getBoundingClientRect()), n = V(o), {
            top: s.top + (n.pageYOffset || i.scrollTop) - (i.clientTop || 0),
            left: s.left + (n.pageXOffset || i.scrollLeft) - (i.clientLeft || 0)
        }) : s
    }, ht.offset = {
        setOffset: function (t, e, i) {
            var n = ht.css(t, "position");
            "static" === n && (t.style.position = "relative");
            var s, r, o = ht(t), a = o.offset(), l = ht.css(t, "top"), c = ht.css(t, "left"), h = ("absolute" === n || "fixed" === n) && ht.inArray("auto", [l, c]) > -1, u = {}, d = {};
            h ? (d = o.position(), s = d.top, r = d.left) : (s = parseFloat(l) || 0, r = parseFloat(c) || 0), ht.isFunction(e) && (e = e.call(t, i, a)), null != e.top && (u.top = e.top - a.top + s), null != e.left && (u.left = e.left - a.left + r), "using" in e ? e.using.call(t, u) : o.css(u)
        }
    }, ht.fn.extend({
        position: function () {
            if (this[0]) {
                var t, e, i = {top: 0, left: 0}, n = this[0];
                return "fixed" === ht.css(n, "position") ? e = n.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), ht.nodeName(t[0], "html") || (i = t.offset()), i.top += ht.css(t[0], "borderTopWidth", !0), i.left += ht.css(t[0], "borderLeftWidth", !0)), {
                    top: e.top - i.top - ht.css(n, "marginTop", !0),
                    left: e.left - i.left - ht.css(n, "marginLeft", !0)
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                for (var t = this.offsetParent || Z; t && !ht.nodeName(t, "html") && "static" === ht.css(t, "position");)t = t.offsetParent;
                return t || Z
            })
        }
    }), ht.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (t, i) {
        var n = /Y/.test(i);
        ht.fn[t] = function (s) {
            return ht.access(this, function (t, s, r) {
                var o = V(t);
                return r === e ? o ? i in o ? o[i] : o.document.documentElement[s] : t[s] : void(o ? o.scrollTo(n ? ht(o).scrollLeft() : r, n ? r : ht(o).scrollTop()) : t[s] = r)
            }, t, s, arguments.length, null)
        }
    }), ht.each({Height: "height", Width: "width"}, function (t, i) {
        ht.each({padding: "inner" + t, content: i, "": "outer" + t}, function (n, s) {
            ht.fn[s] = function (s, r) {
                var o = arguments.length && (n || "boolean" != typeof s), a = n || (s === !0 || r === !0 ? "margin" : "border");
                return ht.access(this, function (i, n, s) {
                    var r;
                    return ht.isWindow(i) ? i.document.documentElement["client" + t] : 9 === i.nodeType ? (r = i.documentElement, Math.max(i.body["scroll" + t], r["scroll" + t], i.body["offset" + t], r["offset" + t], r["client" + t])) : s === e ? ht.css(i, n, a) : ht.style(i, n, s, a)
                }, i, o ? s : e, o, null)
            }
        })
    }), ht.fn.size = function () {
        return this.length
    }, ht.fn.andSelf = ht.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = ht : (t.jQuery = t.$ = ht, "function" == typeof define && define.amd && define("jquery", [], function () {
        return ht
    }))
}(window), function () {
    var t = this, e = t._, i = {}, n = Array.prototype, s = Object.prototype, r = Function.prototype, o = n.push, a = n.slice, l = n.concat, c = s.toString, h = s.hasOwnProperty, u = n.forEach, d = n.map, p = n.reduce, f = n.reduceRight, m = n.filter, g = n.every, v = n.some, _ = n.indexOf, y = n.lastIndexOf, b = Array.isArray, w = Object.keys, x = r.bind, k = function (t) {
        return t instanceof k ? t : this instanceof k ? void(this._wrapped = t) : new k(t)
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = k), exports._ = k) : t._ = k, k.VERSION = "1.5.2";
    var C = k.each = k.forEach = function (t, e, n) {
        if (null != t)if (u && t.forEach === u)t.forEach(e, n); else if (t.length === +t.length) {
            for (var s = 0, r = t.length; r > s; s++)if (e.call(n, t[s], s, t) === i)return
        } else for (var o = k.keys(t), s = 0, r = o.length; r > s; s++)if (e.call(n, t[o[s]], o[s], t) === i)return
    };
    k.map = k.collect = function (t, e, i) {
        var n = [];
        return null == t ? n : d && t.map === d ? t.map(e, i) : (C(t, function (t, s, r) {
            n.push(e.call(i, t, s, r))
        }), n)
    };
    var D = "Reduce of empty array with no initial value";
    k.reduce = k.foldl = k.inject = function (t, e, i, n) {
        var s = arguments.length > 2;
        if (null == t && (t = []), p && t.reduce === p)return n && (e = k.bind(e, n)), s ? t.reduce(e, i) : t.reduce(e);
        if (C(t, function (t, r, o) {
                s ? i = e.call(n, i, t, r, o) : (i = t, s = !0)
            }), !s)throw new TypeError(D);
        return i
    }, k.reduceRight = k.foldr = function (t, e, i, n) {
        var s = arguments.length > 2;
        if (null == t && (t = []), f && t.reduceRight === f)return n && (e = k.bind(e, n)), s ? t.reduceRight(e, i) : t.reduceRight(e);
        var r = t.length;
        if (r !== +r) {
            var o = k.keys(t);
            r = o.length
        }
        if (C(t, function (a, l, c) {
                l = o ? o[--r] : --r, s ? i = e.call(n, i, t[l], l, c) : (i = t[l], s = !0)
            }), !s)throw new TypeError(D);
        return i
    }, k.find = k.detect = function (t, e, i) {
        var n;
        return T(t, function (t, s, r) {
            return e.call(i, t, s, r) ? (n = t, !0) : void 0
        }), n
    }, k.filter = k.select = function (t, e, i) {
        var n = [];
        return null == t ? n : m && t.filter === m ? t.filter(e, i) : (C(t, function (t, s, r) {
            e.call(i, t, s, r) && n.push(t)
        }), n)
    }, k.reject = function (t, e, i) {
        return k.filter(t, function (t, n, s) {
            return !e.call(i, t, n, s)
        }, i)
    }, k.every = k.all = function (t, e, n) {
        e || (e = k.identity);
        var s = !0;
        return null == t ? s : g && t.every === g ? t.every(e, n) : (C(t, function (t, r, o) {
            return (s = s && e.call(n, t, r, o)) ? void 0 : i
        }), !!s)
    };
    var T = k.some = k.any = function (t, e, n) {
        e || (e = k.identity);
        var s = !1;
        return null == t ? s : v && t.some === v ? t.some(e, n) : (C(t, function (t, r, o) {
            return s || (s = e.call(n, t, r, o)) ? i : void 0
        }), !!s)
    };
    k.contains = k.include = function (t, e) {
        return null == t ? !1 : _ && t.indexOf === _ ? -1 != t.indexOf(e) : T(t, function (t) {
            return t === e
        })
    }, k.invoke = function (t, e) {
        var i = a.call(arguments, 2), n = k.isFunction(e);
        return k.map(t, function (t) {
            return (n ? e : t[e]).apply(t, i)
        })
    }, k.pluck = function (t, e) {
        return k.map(t, function (t) {
            return t[e]
        })
    }, k.where = function (t, e, i) {
        return k.isEmpty(e) ? i ? void 0 : [] : k[i ? "find" : "filter"](t, function (t) {
            for (var i in e)if (e[i] !== t[i])return !1;
            return !0
        })
    }, k.findWhere = function (t, e) {
        return k.where(t, e, !0)
    }, k.max = function (t, e, i) {
        if (!e && k.isArray(t) && t[0] === +t[0] && t.length < 65535)return Math.max.apply(Math, t);
        if (!e && k.isEmpty(t))return -(1 / 0);
        var n = {computed: -(1 / 0), value: -(1 / 0)};
        return C(t, function (t, s, r) {
            var o = e ? e.call(i, t, s, r) : t;
            o > n.computed && (n = {value: t, computed: o})
        }), n.value
    }, k.min = function (t, e, i) {
        if (!e && k.isArray(t) && t[0] === +t[0] && t.length < 65535)return Math.min.apply(Math, t);
        if (!e && k.isEmpty(t))return 1 / 0;
        var n = {computed: 1 / 0, value: 1 / 0};
        return C(t, function (t, s, r) {
            var o = e ? e.call(i, t, s, r) : t;
            o < n.computed && (n = {value: t, computed: o})
        }), n.value
    }, k.shuffle = function (t) {
        var e, i = 0, n = [];
        return C(t, function (t) {
            e = k.random(i++), n[i - 1] = n[e], n[e] = t
        }), n
    }, k.sample = function (t, e, i) {
        return arguments.length < 2 || i ? t[k.random(t.length - 1)] : k.shuffle(t).slice(0, Math.max(0, e))
    };
    var S = function (t) {
        return k.isFunction(t) ? t : function (e) {
            return e[t]
        }
    };
    k.sortBy = function (t, e, i) {
        var n = S(e);
        return k.pluck(k.map(t, function (t, e, s) {
            return {value: t, index: e, criteria: n.call(i, t, e, s)}
        }).sort(function (t, e) {
            var i = t.criteria, n = e.criteria;
            if (i !== n) {
                if (i > n || void 0 === i)return 1;
                if (n > i || void 0 === n)return -1
            }
            return t.index - e.index
        }), "value")
    };
    var M = function (t) {
        return function (e, i, n) {
            var s = {}, r = null == i ? k.identity : S(i);
            return C(e, function (i, o) {
                var a = r.call(n, i, o, e);
                t(s, a, i)
            }), s
        }
    };
    k.groupBy = M(function (t, e, i) {
        (k.has(t, e) ? t[e] : t[e] = []).push(i)
    }), k.indexBy = M(function (t, e, i) {
        t[e] = i
    }), k.countBy = M(function (t, e) {
        k.has(t, e) ? t[e]++ : t[e] = 1
    }), k.sortedIndex = function (t, e, i, n) {
        i = null == i ? k.identity : S(i);
        for (var s = i.call(n, e), r = 0, o = t.length; o > r;) {
            var a = r + o >>> 1;
            i.call(n, t[a]) < s ? r = a + 1 : o = a
        }
        return r
    }, k.toArray = function (t) {
        return t ? k.isArray(t) ? a.call(t) : t.length === +t.length ? k.map(t, k.identity) : k.values(t) : []
    }, k.size = function (t) {
        return null == t ? 0 : t.length === +t.length ? t.length : k.keys(t).length
    }, k.first = k.head = k.take = function (t, e, i) {
        return null == t ? void 0 : null == e || i ? t[0] : a.call(t, 0, e)
    }, k.initial = function (t, e, i) {
        return a.call(t, 0, t.length - (null == e || i ? 1 : e))
    }, k.last = function (t, e, i) {
        return null == t ? void 0 : null == e || i ? t[t.length - 1] : a.call(t, Math.max(t.length - e, 0))
    }, k.rest = k.tail = k.drop = function (t, e, i) {
        return a.call(t, null == e || i ? 1 : e)
    }, k.compact = function (t) {
        return k.filter(t, k.identity)
    };
    var F = function (t, e, i) {
        return e && k.every(t, k.isArray) ? l.apply(i, t) : (C(t, function (t) {
            k.isArray(t) || k.isArguments(t) ? e ? o.apply(i, t) : F(t, e, i) : i.push(t)
        }), i)
    };
    k.flatten = function (t, e) {
        return F(t, e, [])
    }, k.without = function (t) {
        return k.difference(t, a.call(arguments, 1))
    }, k.uniq = k.unique = function (t, e, i, n) {
        k.isFunction(e) && (n = i, i = e, e = !1);
        var s = i ? k.map(t, i, n) : t, r = [], o = [];
        return C(s, function (i, n) {
            (e ? n && o[o.length - 1] === i : k.contains(o, i)) || (o.push(i), r.push(t[n]))
        }), r
    }, k.union = function () {
        return k.uniq(k.flatten(arguments, !0))
    }, k.intersection = function (t) {
        var e = a.call(arguments, 1);
        return k.filter(k.uniq(t), function (t) {
            return k.every(e, function (e) {
                return k.indexOf(e, t) >= 0
            })
        })
    }, k.difference = function (t) {
        var e = l.apply(n, a.call(arguments, 1));
        return k.filter(t, function (t) {
            return !k.contains(e, t)
        })
    }, k.zip = function () {
        for (var t = k.max(k.pluck(arguments, "length").concat(0)), e = new Array(t), i = 0; t > i; i++)e[i] = k.pluck(arguments, "" + i);
        return e
    }, k.object = function (t, e) {
        if (null == t)return {};
        for (var i = {}, n = 0, s = t.length; s > n; n++)e ? i[t[n]] = e[n] : i[t[n][0]] = t[n][1];
        return i
    }, k.indexOf = function (t, e, i) {
        if (null == t)return -1;
        var n = 0, s = t.length;
        if (i) {
            if ("number" != typeof i)return n = k.sortedIndex(t, e), t[n] === e ? n : -1;
            n = 0 > i ? Math.max(0, s + i) : i
        }
        if (_ && t.indexOf === _)return t.indexOf(e, i);
        for (; s > n; n++)if (t[n] === e)return n;
        return -1
    }, k.lastIndexOf = function (t, e, i) {
        if (null == t)return -1;
        var n = null != i;
        if (y && t.lastIndexOf === y)return n ? t.lastIndexOf(e, i) : t.lastIndexOf(e);
        for (var s = n ? i : t.length; s--;)if (t[s] === e)return s;
        return -1
    }, k.range = function (t, e, i) {
        arguments.length <= 1 && (e = t || 0, t = 0), i = arguments[2] || 1;
        for (var n = Math.max(Math.ceil((e - t) / i), 0), s = 0, r = new Array(n); n > s;)r[s++] = t, t += i;
        return r
    };
    var E = function () {
    };
    k.bind = function (t, e) {
        var i, n;
        if (x && t.bind === x)return x.apply(t, a.call(arguments, 1));
        if (!k.isFunction(t))throw new TypeError;
        return i = a.call(arguments, 2), n = function () {
            if (!(this instanceof n))return t.apply(e, i.concat(a.call(arguments)));
            E.prototype = t.prototype;
            var s = new E;
            E.prototype = null;
            var r = t.apply(s, i.concat(a.call(arguments)));
            return Object(r) === r ? r : s
        }
    }, k.partial = function (t) {
        var e = a.call(arguments, 1);
        return function () {
            return t.apply(this, e.concat(a.call(arguments)))
        }
    }, k.bindAll = function (t) {
        var e = a.call(arguments, 1);
        if (0 === e.length)throw new Error("bindAll must be passed function names");
        return C(e, function (e) {
            t[e] = k.bind(t[e], t)
        }), t
    }, k.memoize = function (t, e) {
        var i = {};
        return e || (e = k.identity), function () {
            var n = e.apply(this, arguments);
            return k.has(i, n) ? i[n] : i[n] = t.apply(this, arguments)
        }
    }, k.delay = function (t, e) {
        var i = a.call(arguments, 2);
        return setTimeout(function () {
            return t.apply(null, i)
        }, e)
    }, k.defer = function (t) {
        return k.delay.apply(k, [t, 1].concat(a.call(arguments, 1)))
    }, k.throttle = function (t, e, i) {
        var n, s, r, o = null, a = 0;
        i || (i = {});
        var l = function () {
            a = i.leading === !1 ? 0 : new Date, o = null, r = t.apply(n, s)
        };
        return function () {
            var c = new Date;
            a || i.leading !== !1 || (a = c);
            var h = e - (c - a);
            return n = this, s = arguments, 0 >= h ? (clearTimeout(o), o = null, a = c, r = t.apply(n, s)) : o || i.trailing === !1 || (o = setTimeout(l, h)), r
        }
    }, k.debounce = function (t, e, i) {
        var n, s, r, o, a;
        return function () {
            r = this, s = arguments, o = new Date;
            var l = function () {
                var c = new Date - o;
                e > c ? n = setTimeout(l, e - c) : (n = null, i || (a = t.apply(r, s)))
            }, c = i && !n;
            return n || (n = setTimeout(l, e)), c && (a = t.apply(r, s)), a
        }
    }, k.once = function (t) {
        var e, i = !1;
        return function () {
            return i ? e : (i = !0, e = t.apply(this, arguments), t = null, e)
        }
    }, k.wrap = function (t, e) {
        return function () {
            var i = [t];
            return o.apply(i, arguments), e.apply(this, i)
        }
    }, k.compose = function () {
        var t = arguments;
        return function () {
            for (var e = arguments, i = t.length - 1; i >= 0; i--)e = [t[i].apply(this, e)];
            return e[0]
        }
    }, k.after = function (t, e) {
        return function () {
            return --t < 1 ? e.apply(this, arguments) : void 0
        }
    }, k.keys = w || function (t) {
            if (t !== Object(t))throw new TypeError("Invalid object");
            var e = [];
            for (var i in t)k.has(t, i) && e.push(i);
            return e
        }, k.values = function (t) {
        for (var e = k.keys(t), i = e.length, n = new Array(i), s = 0; i > s; s++)n[s] = t[e[s]];
        return n
    }, k.pairs = function (t) {
        for (var e = k.keys(t), i = e.length, n = new Array(i), s = 0; i > s; s++)n[s] = [e[s], t[e[s]]];
        return n
    }, k.invert = function (t) {
        for (var e = {}, i = k.keys(t), n = 0, s = i.length; s > n; n++)e[t[i[n]]] = i[n];
        return e
    }, k.functions = k.methods = function (t) {
        var e = [];
        for (var i in t)k.isFunction(t[i]) && e.push(i);
        return e.sort()
    }, k.extend = function (t) {
        return C(a.call(arguments, 1), function (e) {
            if (e)for (var i in e)t[i] = e[i]
        }), t
    }, k.pick = function (t) {
        var e = {}, i = l.apply(n, a.call(arguments, 1));
        return C(i, function (i) {
            i in t && (e[i] = t[i])
        }), e
    }, k.omit = function (t) {
        var e = {}, i = l.apply(n, a.call(arguments, 1));
        for (var s in t)k.contains(i, s) || (e[s] = t[s]);
        return e
    }, k.defaults = function (t) {
        return C(a.call(arguments, 1), function (e) {
            if (e)for (var i in e)void 0 === t[i] && (t[i] = e[i])
        }), t
    }, k.clone = function (t) {
        return k.isObject(t) ? k.isArray(t) ? t.slice() : k.extend({}, t) : t
    }, k.tap = function (t, e) {
        return e(t), t
    };
    var I = function (t, e, i, n) {
        if (t === e)return 0 !== t || 1 / t == 1 / e;
        if (null == t || null == e)return t === e;
        t instanceof k && (t = t._wrapped), e instanceof k && (e = e._wrapped);
        var s = c.call(t);
        if (s != c.call(e))return !1;
        switch (s) {
            case"[object String]":
                return t == String(e);
            case"[object Number]":
                return t != +t ? e != +e : 0 == t ? 1 / t == 1 / e : t == +e;
            case"[object Date]":
            case"[object Boolean]":
                return +t == +e;
            case"[object RegExp]":
                return t.source == e.source && t.global == e.global && t.multiline == e.multiline && t.ignoreCase == e.ignoreCase
        }
        if ("object" != typeof t || "object" != typeof e)return !1;
        for (var r = i.length; r--;)if (i[r] == t)return n[r] == e;
        var o = t.constructor, a = e.constructor;
        if (o !== a && !(k.isFunction(o) && o instanceof o && k.isFunction(a) && a instanceof a))return !1;
        i.push(t), n.push(e);
        var l = 0, h = !0;
        if ("[object Array]" == s) {
            if (l = t.length, h = l == e.length)for (; l-- && (h = I(t[l], e[l], i, n)););
        } else {
            for (var u in t)if (k.has(t, u) && (l++, !(h = k.has(e, u) && I(t[u], e[u], i, n))))break;
            if (h) {
                for (u in e)if (k.has(e, u) && !l--)break;
                h = !l
            }
        }
        return i.pop(), n.pop(), h
    };
    k.isEqual = function (t, e) {
        return I(t, e, [], [])
    }, k.isEmpty = function (t) {
        if (null == t)return !0;
        if (k.isArray(t) || k.isString(t))return 0 === t.length;
        for (var e in t)if (k.has(t, e))return !1;
        return !0
    }, k.isElement = function (t) {
        return !(!t || 1 !== t.nodeType)
    }, k.isArray = b || function (t) {
            return "[object Array]" == c.call(t)
        }, k.isObject = function (t) {
        return t === Object(t)
    }, C(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (t) {
        k["is" + t] = function (e) {
            return c.call(e) == "[object " + t + "]"
        }
    }), k.isArguments(arguments) || (k.isArguments = function (t) {
        return !(!t || !k.has(t, "callee"))
    }), "function" != typeof/./ && (k.isFunction = function (t) {
        return "function" == typeof t
    }), k.isFinite = function (t) {
        return isFinite(t) && !isNaN(parseFloat(t))
    }, k.isNaN = function (t) {
        return k.isNumber(t) && t != +t
    }, k.isBoolean = function (t) {
        return t === !0 || t === !1 || "[object Boolean]" == c.call(t)
    }, k.isNull = function (t) {
        return null === t
    }, k.isUndefined = function (t) {
        return void 0 === t
    }, k.has = function (t, e) {
        return h.call(t, e)
    }, k.noConflict = function () {
        return t._ = e, this
    }, k.identity = function (t) {
        return t
    }, k.times = function (t, e, i) {
        for (var n = Array(Math.max(0, t)), s = 0; t > s; s++)n[s] = e.call(i, s);
        return n
    }, k.random = function (t, e) {
        return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
    };
    var A = {escape: {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;"}};
    A.unescape = k.invert(A.escape);
    var P = {
        escape: new RegExp("[" + k.keys(A.escape).join("") + "]", "g"),
        unescape: new RegExp("(" + k.keys(A.unescape).join("|") + ")", "g")
    };
    k.each(["escape", "unescape"], function (t) {
        k[t] = function (e) {
            return null == e ? "" : ("" + e).replace(P[t], function (e) {
                return A[t][e]
            })
        }
    }), k.result = function (t, e) {
        if (null == t)return void 0;
        var i = t[e];
        return k.isFunction(i) ? i.call(t) : i
    }, k.mixin = function (t) {
        C(k.functions(t), function (e) {
            var i = k[e] = t[e];
            k.prototype[e] = function () {
                var t = [this._wrapped];
                return o.apply(t, arguments), j.call(this, i.apply(k, t))
            }
        })
    };
    var N = 0;
    k.uniqueId = function (t) {
        var e = ++N + "";
        return t ? t + e : e
    }, k.templateSettings = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g};
    var $ = /(.)^/, O = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "	": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, z = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    k.template = function (t, e, i) {
        var n;
        i = k.defaults({}, i, k.templateSettings);
        var s = new RegExp([(i.escape || $).source, (i.interpolate || $).source, (i.evaluate || $).source].join("|") + "|$", "g"), r = 0, o = "__p+='";
        t.replace(s, function (e, i, n, s, a) {
            return o += t.slice(r, a).replace(z, function (t) {
                return "\\" + O[t]
            }), i && (o += "'+\n((__t=(" + i + "))==null?'':_.escape(__t))+\n'"), n && (o += "'+\n((__t=(" + n + "))==null?'':__t)+\n'"), s && (o += "';\n" + s + "\n__p+='"), r = a + e.length, e
        }), o += "';\n", i.variable || (o = "with(obj||{}){\n" + o + "}\n"), o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
        try {
            n = new Function(i.variable || "obj", "_", o)
        } catch (a) {
            throw a.source = o, a
        }
        if (e)return n(e, k);
        var l = function (t) {
            return n.call(this, t, k)
        };
        return l.source = "function(" + (i.variable || "obj") + "){\n" + o + "}", l
    }, k.chain = function (t) {
        return k(t).chain()
    };
    var j = function (t) {
        return this._chain ? k(t).chain() : t
    };
    k.mixin(k), C(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (t) {
        var e = n[t];
        k.prototype[t] = function () {
            var i = this._wrapped;
            return e.apply(i, arguments), "shift" != t && "splice" != t || 0 !== i.length || delete i[0], j.call(this, i)
        }
    }), C(["concat", "join", "slice"], function (t) {
        var e = n[t];
        k.prototype[t] = function () {
            return j.call(this, e.apply(this._wrapped, arguments))
        }
    }), k.extend(k.prototype, {
        chain: function () {
            return this._chain = !0, this
        }, value: function () {
            return this._wrapped
        }
    })
}.call(this), define("underscore", function (t) {
    return function () {
        var e;
        return e || t._
    }
}(this)), function () {
    var t, e = this, i = e.Backbone, n = [], s = (n.push, n.slice);
    n.splice;
    t = "undefined" != typeof exports ? exports : e.Backbone = {}, t.VERSION = "1.1.0";
    var r = e._;
    r || "undefined" == typeof require || (r = require("underscore")), t.$ = e.jQuery || e.Zepto || e.ender || e.$, t.noConflict = function () {
        return e.Backbone = i, this
    }, t.emulateHTTP = !1, t.emulateJSON = !1;
    var o = t.Events = {
        on: function (t, e, i) {
            if (!l(this, "on", t, [e, i]) || !e)return this;
            this._events || (this._events = {});
            var n = this._events[t] || (this._events[t] = []);
            return n.push({callback: e, context: i, ctx: i || this}), this
        }, once: function (t, e, i) {
            if (!l(this, "once", t, [e, i]) || !e)return this;
            var n = this, s = r.once(function () {
                n.off(t, s), e.apply(this, arguments)
            });
            return s._callback = e, this.on(t, s, i)
        }, off: function (t, e, i) {
            var n, s, o, a, c, h, u, d;
            if (!this._events || !l(this, "off", t, [e, i]))return this;
            if (!t && !e && !i)return this._events = {}, this;
            for (a = t ? [t] : r.keys(this._events), c = 0, h = a.length; h > c; c++)if (t = a[c], o = this._events[t]) {
                if (this._events[t] = n = [], e || i)for (u = 0, d = o.length; d > u; u++)s = o[u], (e && e !== s.callback && e !== s.callback._callback || i && i !== s.context) && n.push(s);
                n.length || delete this._events[t]
            }
            return this
        }, trigger: function (t) {
            if (!this._events)return this;
            var e = s.call(arguments, 1);
            if (!l(this, "trigger", t, e))return this;
            var i = this._events[t], n = this._events.all;
            return i && c(i, e), n && c(n, arguments), this
        }, stopListening: function (t, e, i) {
            var n = this._listeningTo;
            if (!n)return this;
            var s = !e && !i;
            i || "object" != typeof e || (i = this), t && ((n = {})[t._listenId] = t);
            for (var o in n)t = n[o], t.off(e, i, this), (s || r.isEmpty(t._events)) && delete this._listeningTo[o];
            return this
        }
    }, a = /\s+/, l = function (t, e, i, n) {
        if (!i)return !0;
        if ("object" == typeof i) {
            for (var s in i)t[e].apply(t, [s, i[s]].concat(n));
            return !1
        }
        if (a.test(i)) {
            for (var r = i.split(a), o = 0, l = r.length; l > o; o++)t[e].apply(t, [r[o]].concat(n));
            return !1
        }
        return !0
    }, c = function (t, e) {
        var i, n = -1, s = t.length, r = e[0], o = e[1], a = e[2];
        switch (e.length) {
            case 0:
                for (; ++n < s;)(i = t[n]).callback.call(i.ctx);
                return;
            case 1:
                for (; ++n < s;)(i = t[n]).callback.call(i.ctx, r);
                return;
            case 2:
                for (; ++n < s;)(i = t[n]).callback.call(i.ctx, r, o);
                return;
            case 3:
                for (; ++n < s;)(i = t[n]).callback.call(i.ctx, r, o, a);
                return;
            default:
                for (; ++n < s;)(i = t[n]).callback.apply(i.ctx, e)
        }
    }, h = {listenTo: "on", listenToOnce: "once"};
    r.each(h, function (t, e) {
        o[e] = function (e, i, n) {
            var s = this._listeningTo || (this._listeningTo = {}), o = e._listenId || (e._listenId = r.uniqueId("l"));
            return s[o] = e, n || "object" != typeof i || (n = this), e[t](i, n, this), this
        }
    }), o.bind = o.on, o.unbind = o.off, r.extend(t, o);
    var u = t.Model = function (t, e) {
        var i = t || {};
        e || (e = {}), this.cid = r.uniqueId("c"), this.attributes = {}, e.collection && (this.collection = e.collection), e.parse && (i = this.parse(i, e) || {}), i = r.defaults({}, i, r.result(this, "defaults")), this.set(i, e), this.changed = {}, this.initialize.apply(this, arguments)
    };
    r.extend(u.prototype, o, {
        changed: null, validationError: null, idAttribute: "id", initialize: function () {
        }, toJSON: function (t) {
            return r.clone(this.attributes)
        }, sync: function () {
            return t.sync.apply(this, arguments)
        }, get: function (t) {
            return this.attributes[t]
        }, escape: function (t) {
            return r.escape(this.get(t))
        }, has: function (t) {
            return null != this.get(t)
        }, set: function (t, e, i) {
            var n, s, o, a, l, c, h, u;
            if (null == t)return this;
            if ("object" == typeof t ? (s = t, i = e) : (s = {})[t] = e, i || (i = {}), !this._validate(s, i))return !1;
            o = i.unset, l = i.silent, a = [], c = this._changing, this._changing = !0, c || (this._previousAttributes = r.clone(this.attributes), this.changed = {}), u = this.attributes, h = this._previousAttributes, this.idAttribute in s && (this.id = s[this.idAttribute]);
            for (n in s)e = s[n], r.isEqual(u[n], e) || a.push(n), r.isEqual(h[n], e) ? delete this.changed[n] : this.changed[n] = e, o ? delete u[n] : u[n] = e;
            if (!l) {
                a.length && (this._pending = !0);
                for (var d = 0, p = a.length; p > d; d++)this.trigger("change:" + a[d], this, u[a[d]], i)
            }
            if (c)return this;
            if (!l)for (; this._pending;)this._pending = !1, this.trigger("change", this, i);
            return this._pending = !1, this._changing = !1, this
        }, unset: function (t, e) {
            return this.set(t, void 0, r.extend({}, e, {unset: !0}))
        }, clear: function (t) {
            var e = {};
            for (var i in this.attributes)e[i] = void 0;
            return this.set(e, r.extend({}, t, {unset: !0}))
        }, hasChanged: function (t) {
            return null == t ? !r.isEmpty(this.changed) : r.has(this.changed, t)
        }, changedAttributes: function (t) {
            if (!t)return this.hasChanged() ? r.clone(this.changed) : !1;
            var e, i = !1, n = this._changing ? this._previousAttributes : this.attributes;
            for (var s in t)r.isEqual(n[s], e = t[s]) || ((i || (i = {}))[s] = e);
            return i
        }, previous: function (t) {
            return null != t && this._previousAttributes ? this._previousAttributes[t] : null
        }, previousAttributes: function () {
            return r.clone(this._previousAttributes)
        }, fetch: function (t) {
            t = t ? r.clone(t) : {}, void 0 === t.parse && (t.parse = !0);
            var e = this, i = t.success;
            return t.success = function (n) {
                return e.set(e.parse(n, t), t) ? (i && i(e, n, t), void e.trigger("sync", e, n, t)) : !1
            }, O(this, t), this.sync("read", this, t)
        }, save: function (t, e, i) {
            var n, s, o, a = this.attributes;
            if (null == t || "object" == typeof t ? (n = t, i = e) : (n = {})[t] = e, i = r.extend({validate: !0}, i), n && !i.wait) {
                if (!this.set(n, i))return !1
            } else if (!this._validate(n, i))return !1;
            n && i.wait && (this.attributes = r.extend({}, a, n)), void 0 === i.parse && (i.parse = !0);
            var l = this, c = i.success;
            return i.success = function (t) {
                l.attributes = a;
                var e = l.parse(t, i);
                return i.wait && (e = r.extend(n || {}, e)), r.isObject(e) && !l.set(e, i) ? !1 : (c && c(l, t, i), void l.trigger("sync", l, t, i))
            }, O(this, i), s = this.isNew() ? "create" : i.patch ? "patch" : "update", "patch" === s && (i.attrs = n), o = this.sync(s, this, i), n && i.wait && (this.attributes = a), o
        }, destroy: function (t) {
            t = t ? r.clone(t) : {};
            var e = this, i = t.success, n = function () {
                e.trigger("destroy", e, e.collection, t)
            };
            if (t.success = function (s) {
                    (t.wait || e.isNew()) && n(), i && i(e, s, t), e.isNew() || e.trigger("sync", e, s, t)
                }, this.isNew())return t.success(), !1;
            O(this, t);
            var s = this.sync("delete", this, t);
            return t.wait || n(), s
        }, url: function () {
            var t = r.result(this, "urlRoot") || r.result(this.collection, "url") || $();
            return this.isNew() ? t : t + ("/" === t.charAt(t.length - 1) ? "" : "/") + encodeURIComponent(this.id)
        }, parse: function (t, e) {
            return t
        }, clone: function () {
            return new this.constructor(this.attributes)
        }, isNew: function () {
            return null == this.id
        }, isValid: function (t) {
            return this._validate({}, r.extend(t || {}, {validate: !0}))
        }, _validate: function (t, e) {
            if (!e.validate || !this.validate)return !0;
            t = r.extend({}, this.attributes, t);
            var i = this.validationError = this.validate(t, e) || null;
            return i ? (this.trigger("invalid", this, i, r.extend(e, {validationError: i})), !1) : !0
        }
    });
    var d = ["keys", "values", "pairs", "invert", "pick", "omit"];
    r.each(d, function (t) {
        u.prototype[t] = function () {
            var e = s.call(arguments);
            return e.unshift(this.attributes), r[t].apply(r, e)
        }
    });
    var p = t.Collection = function (t, e) {
        e || (e = {}), e.url && (this.url = e.url), e.model && (this.model = e.model), void 0 !== e.comparator && (this.comparator = e.comparator), this._reset(), this.initialize.apply(this, arguments), t && this.reset(t, r.extend({silent: !0}, e))
    }, f = {add: !0, remove: !0, merge: !0}, m = {add: !0, remove: !1};
    r.extend(p.prototype, o, {
        model: u, initialize: function () {
        }, toJSON: function (t) {
            return this.map(function (e) {
                return e.toJSON(t)
            })
        }, sync: function () {
            return t.sync.apply(this, arguments)
        }, add: function (t, e) {
            return this.set(t, r.extend({merge: !1}, e, m))
        }, remove: function (t, e) {
            var i = !r.isArray(t);
            t = i ? [t] : r.clone(t), e || (e = {});
            var n, s, o, a;
            for (n = 0, s = t.length; s > n; n++)a = t[n] = this.get(t[n]), a && (delete this._byId[a.id], delete this._byId[a.cid], o = this.indexOf(a), this.models.splice(o, 1), this.length--, e.silent || (e.index = o, a.trigger("remove", a, this, e)), this._removeReference(a));
            return i ? t[0] : t
        }, set: function (t, e) {
            e = r.defaults({}, e, f), e.parse && (t = this.parse(t, e));
            var i = !r.isArray(t);
            t = i ? t ? [t] : [] : r.clone(t);
            var n, s, o, a, l, c, h, d = e.at, p = this.model, m = this.comparator && null == d && e.sort !== !1, g = r.isString(this.comparator) ? this.comparator : null, v = [], _ = [], y = {}, b = e.add, w = e.merge, x = e.remove, k = !m && b && x ? [] : !1;
            for (n = 0, s = t.length; s > n; n++) {
                if (l = t[n], o = l instanceof u ? a = l : l[p.prototype.idAttribute], c = this.get(o))x && (y[c.cid] = !0), w && (l = l === a ? a.attributes : l, e.parse && (l = c.parse(l, e)), c.set(l, e), m && !h && c.hasChanged(g) && (h = !0)), t[n] = c; else if (b) {
                    if (a = t[n] = this._prepareModel(l, e), !a)continue;
                    v.push(a), a.on("all", this._onModelEvent, this), this._byId[a.cid] = a, null != a.id && (this._byId[a.id] = a)
                }
                k && k.push(c || a)
            }
            if (x) {
                for (n = 0, s = this.length; s > n; ++n)y[(a = this.models[n]).cid] || _.push(a);
                _.length && this.remove(_, e)
            }
            if (v.length || k && k.length)if (m && (h = !0), this.length += v.length, null != d)for (n = 0, s = v.length; s > n; n++)this.models.splice(d + n, 0, v[n]); else {
                k && (this.models.length = 0);
                var C = k || v;
                for (n = 0, s = C.length; s > n; n++)this.models.push(C[n])
            }
            if (h && this.sort({silent: !0}), !e.silent) {
                for (n = 0, s = v.length; s > n; n++)(a = v[n]).trigger("add", a, this, e);
                (h || k && k.length) && this.trigger("sort", this, e)
            }
            return i ? t[0] : t
        }, reset: function (t, e) {
            e || (e = {});
            for (var i = 0, n = this.models.length; n > i; i++)this._removeReference(this.models[i]);
            return e.previousModels = this.models, this._reset(), t = this.add(t, r.extend({silent: !0}, e)), e.silent || this.trigger("reset", this, e), t
        }, push: function (t, e) {
            return this.add(t, r.extend({at: this.length}, e))
        }, pop: function (t) {
            var e = this.at(this.length - 1);
            return this.remove(e, t), e
        }, unshift: function (t, e) {
            return this.add(t, r.extend({at: 0}, e))
        }, shift: function (t) {
            var e = this.at(0);
            return this.remove(e, t), e
        }, slice: function () {
            return s.apply(this.models, arguments)
        }, get: function (t) {
            return null == t ? void 0 : this._byId[t.id] || this._byId[t.cid] || this._byId[t]
        }, at: function (t) {
            return this.models[t]
        }, where: function (t, e) {
            return r.isEmpty(t) ? e ? void 0 : [] : this[e ? "find" : "filter"](function (e) {
                for (var i in t)if (t[i] !== e.get(i))return !1;
                return !0
            })
        }, findWhere: function (t) {
            return this.where(t, !0)
        }, sort: function (t) {
            if (!this.comparator)throw new Error("Cannot sort a set without a comparator");
            return t || (t = {}), r.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(r.bind(this.comparator, this)), t.silent || this.trigger("sort", this, t), this
        }, pluck: function (t) {
            return r.invoke(this.models, "get", t)
        }, fetch: function (t) {
            t = t ? r.clone(t) : {}, void 0 === t.parse && (t.parse = !0);
            var e = t.success, i = this;
            return t.success = function (n) {
                var s = t.reset ? "reset" : "set";
                i[s](n, t), e && e(i, n, t), i.trigger("sync", i, n, t)
            }, O(this, t), this.sync("read", this, t)
        }, create: function (t, e) {
            if (e = e ? r.clone(e) : {}, !(t = this._prepareModel(t, e)))return !1;
            e.wait || this.add(t, e);
            var i = this, n = e.success;
            return e.success = function (t, e, s) {
                s.wait && i.add(t, s), n && n(t, e, s)
            }, t.save(null, e), t
        }, parse: function (t, e) {
            return t
        }, clone: function () {
            return new this.constructor(this.models)
        }, _reset: function () {
            this.length = 0, this.models = [], this._byId = {}
        }, _prepareModel: function (t, e) {
            if (t instanceof u)return t.collection || (t.collection = this), t;
            e = e ? r.clone(e) : {}, e.collection = this;
            var i = new this.model(t, e);
            return i.validationError ? (this.trigger("invalid", this, i.validationError, e), !1) : i
        }, _removeReference: function (t) {
            this === t.collection && delete t.collection, t.off("all", this._onModelEvent, this)
        }, _onModelEvent: function (t, e, i, n) {
            ("add" !== t && "remove" !== t || i === this) && ("destroy" === t && this.remove(e, n), e && t === "change:" + e.idAttribute && (delete this._byId[e.previous(e.idAttribute)], null != e.id && (this._byId[e.id] = e)), this.trigger.apply(this, arguments))
        }
    });
    var g = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain"];
    r.each(g, function (t) {
        p.prototype[t] = function () {
            var e = s.call(arguments);
            return e.unshift(this.models), r[t].apply(r, e)
        }
    });
    var v = ["groupBy", "countBy", "sortBy"];
    r.each(v, function (t) {
        p.prototype[t] = function (e, i) {
            var n = r.isFunction(e) ? e : function (t) {
                return t.get(e)
            };
            return r[t](this.models, n, i)
        }
    });
    var _ = t.View = function (t) {
        this.cid = r.uniqueId("view"), t || (t = {}), r.extend(this, r.pick(t, b)), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
    }, y = /^(\S+)\s*(.*)$/, b = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
    r.extend(_.prototype, o, {
        tagName: "div", $: function (t) {
            return this.$el.find(t)
        }, initialize: function () {
        }, render: function () {
            return this
        }, remove: function () {
            return this.$el.remove(), this.stopListening(), this
        }, setElement: function (e, i) {
            return this.$el && this.undelegateEvents(), this.$el = e instanceof t.$ ? e : t.$(e), this.el = this.$el[0], i !== !1 && this.delegateEvents(), this
        }, delegateEvents: function (t) {
            if (!t && !(t = r.result(this, "events")))return this;
            this.undelegateEvents();
            for (var e in t) {
                var i = t[e];
                if (r.isFunction(i) || (i = this[t[e]]), i) {
                    var n = e.match(y), s = n[1], o = n[2];
                    i = r.bind(i, this), s += ".delegateEvents" + this.cid, "" === o ? this.$el.on(s, i) : this.$el.on(s, o, i)
                }
            }
            return this
        }, undelegateEvents: function () {
            return this.$el.off(".delegateEvents" + this.cid), this
        }, _ensureElement: function () {
            if (this.el)this.setElement(r.result(this, "el"), !1); else {
                var e = r.extend({}, r.result(this, "attributes"));
                this.id && (e.id = r.result(this, "id")), this.className && (e["class"] = r.result(this, "className"));
                var i = t.$("<" + r.result(this, "tagName") + ">").attr(e);
                this.setElement(i, !1)
            }
        }
    }), t.sync = function (e, i, n) {
        var s = x[e];
        r.defaults(n || (n = {}), {emulateHTTP: t.emulateHTTP, emulateJSON: t.emulateJSON});
        var o = {type: s, dataType: "json"};
        if (n.url || (o.url = r.result(i, "url") || $()), null != n.data || !i || "create" !== e && "update" !== e && "patch" !== e || (o.contentType = "application/json", o.data = JSON.stringify(n.attrs || i.toJSON(n))), n.emulateJSON && (o.contentType = "application/x-www-form-urlencoded", o.data = o.data ? {model: o.data} : {}), n.emulateHTTP && ("PUT" === s || "DELETE" === s || "PATCH" === s)) {
            o.type = "POST", n.emulateJSON && (o.data._method = s);
            var a = n.beforeSend;
            n.beforeSend = function (t) {
                return t.setRequestHeader("X-HTTP-Method-Override", s), a ? a.apply(this, arguments) : void 0
            }
        }
        "GET" === o.type || n.emulateJSON || (o.processData = !1), "PATCH" === o.type && w && (o.xhr = function () {
            return new ActiveXObject("Microsoft.XMLHTTP")
        });
        var l = n.xhr = t.ajax(r.extend(o, n));
        return i.trigger("request", i, l, n), l
    };
    var w = !("undefined" == typeof window || !window.ActiveXObject || window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent), x = {
        create: "POST",
        update: "PUT",
        patch: "PATCH",
        "delete": "DELETE",
        read: "GET"
    };
    t.ajax = function () {
        return t.$.ajax.apply(t.$, arguments)
    };
    var k = t.Router = function (t) {
        t || (t = {}), t.routes && (this.routes = t.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
    }, C = /\((.*?)\)/g, D = /(\(\?)?:\w+/g, T = /\*\w+/g, S = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    r.extend(k.prototype, o, {
        initialize: function () {
        }, route: function (e, i, n) {
            r.isRegExp(e) || (e = this._routeToRegExp(e)), r.isFunction(i) && (n = i, i = ""), n || (n = this[i]);
            var s = this;
            return t.history.route(e, function (r) {
                var o = s._extractParameters(e, r);
                n && n.apply(s, o), s.trigger.apply(s, ["route:" + i].concat(o)), s.trigger("route", i, o), t.history.trigger("route", s, i, o)
            }), this
        }, navigate: function (e, i) {
            return t.history.navigate(e, i), this
        }, _bindRoutes: function () {
            if (this.routes) {
                this.routes = r.result(this, "routes");
                for (var t, e = r.keys(this.routes); null != (t = e.pop());)this.route(t, this.routes[t])
            }
        }, _routeToRegExp: function (t) {
            return t = t.replace(S, "\\$&").replace(C, "(?:$1)?").replace(D, function (t, e) {
                return e ? t : "([^/]+)"
            }).replace(T, "(.*?)"), new RegExp("^" + t + "$")
        }, _extractParameters: function (t, e) {
            var i = t.exec(e).slice(1);
            return r.map(i, function (t) {
                return t ? decodeURIComponent(t) : null
            })
        }
    });
    var M = t.History = function () {
        this.handlers = [], r.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
    }, F = /^[#\/]|\s+$/g, E = /^\/+|\/+$/g, I = /msie [\w.]+/, A = /\/$/, P = /[?#].*$/;
    M.started = !1, r.extend(M.prototype, o, {
        interval: 50, getHash: function (t) {
            var e = (t || this).location.href.match(/#(.*)$/);
            return e ? e[1] : ""
        }, getFragment: function (t, e) {
            if (null == t)if (this._hasPushState || !this._wantsHashChange || e) {
                t = this.location.pathname;
                var i = this.root.replace(A, "");
                t.indexOf(i) || (t = t.slice(i.length))
            } else t = this.getHash();
            return t.replace(F, "")
        }, start: function (e) {
            if (M.started)throw new Error("Backbone.history has already been started");
            M.started = !0, this.options = r.extend({root: "/"}, this.options, e), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
            var i = this.getFragment(), n = document.documentMode, s = I.exec(navigator.userAgent.toLowerCase()) && (!n || 7 >= n);
            this.root = ("/" + this.root + "/").replace(E, "/"), s && this._wantsHashChange && (this.iframe = t.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(i)), this._hasPushState ? t.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !s ? t.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = i;
            var o = this.location, a = o.pathname.replace(/[^\/]$/, "$&/") === this.root;
            if (this._wantsHashChange && this._wantsPushState) {
                if (!this._hasPushState && !a)return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + this.location.search + "#" + this.fragment), !0;
                this._hasPushState && a && o.hash && (this.fragment = this.getHash().replace(F, ""), this.history.replaceState({}, document.title, this.root + this.fragment + o.search))
            }
            return this.options.silent ? void 0 : this.loadUrl()
        }, stop: function () {
            t.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), clearInterval(this._checkUrlInterval), M.started = !1
        }, route: function (t, e) {
            this.handlers.unshift({route: t, callback: e})
        }, checkUrl: function (t) {
            var e = this.getFragment();
            return e === this.fragment && this.iframe && (e = this.getFragment(this.getHash(this.iframe))), e === this.fragment ? !1 : (this.iframe && this.navigate(e), void this.loadUrl())
        }, loadUrl: function (t) {
            return t = this.fragment = this.getFragment(t), r.any(this.handlers, function (e) {
                return e.route.test(t) ? (e.callback(t), !0) : void 0
            })
        }, navigate: function (t, e) {
            if (!M.started)return !1;
            e && e !== !0 || (e = {trigger: !!e});
            var i = this.root + (t = this.getFragment(t || ""));
            if (t = t.replace(P, ""), this.fragment !== t) {
                if (this.fragment = t, "" === t && "/" !== i && (i = i.slice(0, -1)), this._hasPushState)this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, i); else {
                    if (!this._wantsHashChange)return this.location.assign(i);
                    this._updateHash(this.location, t, e.replace), this.iframe && t !== this.getFragment(this.getHash(this.iframe)) && (e.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, t, e.replace))
                }
                return e.trigger ? this.loadUrl(t) : void 0
            }
        }, _updateHash: function (t, e, i) {
            if (i) {
                var n = t.href.replace(/(javascript:|#).*$/, "");
                t.replace(n + "#" + e)
            } else t.hash = "#" + e
        }
    }), t.history = new M;
    var N = function (t, e) {
        var i, n = this;
        i = t && r.has(t, "constructor") ? t.constructor : function () {
            return n.apply(this, arguments)
        }, r.extend(i, n, e);
        var s = function () {
            this.constructor = i
        };
        return s.prototype = n.prototype, i.prototype = new s, t && r.extend(i.prototype, t), i.__super__ = n.prototype, i
    };
    u.extend = p.extend = k.extend = _.extend = M.extend = N;
    var $ = function () {
        throw new Error('A "url" property or function must be specified')
    }, O = function (t, e) {
        var i = e.error;
        e.error = function (n) {
            i && i(t, n, e), t.trigger("error", t, n, e)
        }
    };
    t.View = function (t) {
        return t.extend({
            constructor: function (e) {
                this.options = e || {}, t.apply(this, arguments)
            }
        })
    }(t.View)
}.call(this), define("backbone", ["underscore", "jquery"], function (t) {
    return function () {
        var e;
        return e || t.Backbone
    }
}(this)), function (t, e) {
    if ("function" == typeof define && define.amd)define("backbone.wreqr", ["backbone", "underscore"], function (t, i) {
        return e(t, i)
    }); else if ("undefined" != typeof exports) {
        var i = require("backbone"), n = require("underscore");
        module.exports = e(i, n)
    } else e(t.Backbone, t._)
}(this, function (t, e) {
    var i = t.Wreqr, n = t.Wreqr = {};
    return t.Wreqr.VERSION = "1.3.1", t.Wreqr.noConflict = function () {
        return t.Wreqr = i, this
    }, n.Handlers = function (t, e) {
        var i = function (t) {
            this.options = t, this._wreqrHandlers = {}, e.isFunction(this.initialize) && this.initialize(t)
        };
        return i.extend = t.Model.extend, e.extend(i.prototype, t.Events, {
            setHandlers: function (t) {
                e.each(t, function (t, i) {
                    var n = null;
                    e.isObject(t) && !e.isFunction(t) && (n = t.context, t = t.callback), this.setHandler(i, t, n)
                }, this)
            }, setHandler: function (t, e, i) {
                var n = {callback: e, context: i};
                this._wreqrHandlers[t] = n, this.trigger("handler:add", t, e, i)
            }, hasHandler: function (t) {
                return !!this._wreqrHandlers[t]
            }, getHandler: function (t) {
                var e = this._wreqrHandlers[t];
                if (e)return function () {
                    var t = Array.prototype.slice.apply(arguments);
                    return e.callback.apply(e.context, t)
                }
            }, removeHandler: function (t) {
                delete this._wreqrHandlers[t]
            }, removeAllHandlers: function () {
                this._wreqrHandlers = {}
            }
        }), i
    }(t, e), n.CommandStorage = function () {
        var i = function (t) {
            this.options = t, this._commands = {}, e.isFunction(this.initialize) && this.initialize(t)
        };
        return e.extend(i.prototype, t.Events, {
            getCommands: function (t) {
                var e = this._commands[t];
                return e || (e = {command: t, instances: []}, this._commands[t] = e), e
            }, addCommand: function (t, e) {
                var i = this.getCommands(t);
                i.instances.push(e)
            }, clearCommands: function (t) {
                var e = this.getCommands(t);
                e.instances = []
            }
        }), i
    }(), n.Commands = function (t) {
        return t.Handlers.extend({
            storageType: t.CommandStorage, constructor: function (e) {
                this.options = e || {}, this._initializeStorage(this.options), this.on("handler:add", this._executeCommands, this);
                var i = Array.prototype.slice.call(arguments);
                t.Handlers.prototype.constructor.apply(this, i)
            }, execute: function (t, e) {
                t = arguments[0], e = Array.prototype.slice.call(arguments, 1), this.hasHandler(t) ? this.getHandler(t).apply(this, e) : this.storage.addCommand(t, e)
            }, _executeCommands: function (t, i, n) {
                var s = this.storage.getCommands(t);
                e.each(s.instances, function (t) {
                    i.apply(n, t)
                }), this.storage.clearCommands(t)
            }, _initializeStorage: function (t) {
                var i, n = t.storageType || this.storageType;
                i = e.isFunction(n) ? new n : n, this.storage = i
            }
        })
    }(n), n.RequestResponse = function (t) {
        return t.Handlers.extend({
            request: function () {
                var t = arguments[0], e = Array.prototype.slice.call(arguments, 1);
                return this.hasHandler(t) ? this.getHandler(t).apply(this, e) : void 0
            }
        })
    }(n), n.EventAggregator = function (t, e) {
        var i = function () {
        };
        return i.extend = t.Model.extend, e.extend(i.prototype, t.Events), i
    }(t, e), n.Channel = function (i) {
        var n = function (e) {
            this.vent = new t.Wreqr.EventAggregator, this.reqres = new t.Wreqr.RequestResponse, this.commands = new t.Wreqr.Commands, this.channelName = e
        };
        return e.extend(n.prototype, {
            reset: function () {
                return this.vent.off(), this.vent.stopListening(), this.reqres.removeAllHandlers(), this.commands.removeAllHandlers(), this
            }, connectEvents: function (t, e) {
                return this._connect("vent", t, e), this
            }, connectCommands: function (t, e) {
                return this._connect("commands", t, e), this
            }, connectRequests: function (t, e) {
                return this._connect("reqres", t, e), this
            }, _connect: function (t, i, n) {
                if (i) {
                    n = n || this;
                    var s = "vent" === t ? "on" : "setHandler";
                    e.each(i, function (i, r) {
                        this[t][s](r, e.bind(i, n))
                    }, this)
                }
            }
        }), n
    }(n), n.radio = function (t) {
        var i = function () {
            this._channels = {}, this.vent = {}, this.commands = {}, this.reqres = {}, this._proxyMethods()
        };
        e.extend(i.prototype, {
            channel: function (t) {
                if (!t)throw new Error("Channel must receive a name");
                return this._getChannel(t)
            }, _getChannel: function (e) {
                var i = this._channels[e];
                return i || (i = new t.Channel(e), this._channels[e] = i), i
            }, _proxyMethods: function () {
                e.each(["vent", "commands", "reqres"], function (t) {
                    e.each(n[t], function (e) {
                        this[t][e] = s(this, t, e)
                    }, this)
                }, this)
            }
        });
        var n = {
            vent: ["on", "off", "trigger", "once", "stopListening", "listenTo", "listenToOnce"],
            commands: ["execute", "setHandler", "setHandlers", "removeHandler", "removeAllHandlers"],
            reqres: ["request", "setHandler", "setHandlers", "removeHandler", "removeAllHandlers"]
        }, s = function (t, e, i) {
            return function (n) {
                var s = t._getChannel(n)[e], r = Array.prototype.slice.call(arguments, 1);
                return s[i].apply(s, r)
            }
        };
        return new i
    }(n), t.Wreqr
}), function (t, e) {
    if ("object" == typeof exports) {
        var i = require("underscore"), n = require("backbone");
        module.exports = e(i, n)
    } else"function" == typeof define && define.amd && define("backbone.babysitter", ["underscore", "backbone"], e)
}(this, function (t, e) {
    "option strict";
    return e.ChildViewContainer = function (t, e) {
        var i = function (t) {
            this._views = {}, this._indexByModel = {}, this._indexByCustom = {}, this._updateLength(), e.each(t, this.add, this)
        };
        e.extend(i.prototype, {
            add: function (t, e) {
                var i = t.cid;
                return this._views[i] = t, t.model && (this._indexByModel[t.model.cid] = i), e && (this._indexByCustom[e] = i), this._updateLength(), this
            }, findByModel: function (t) {
                return this.findByModelCid(t.cid)
            }, findByModelCid: function (t) {
                var e = this._indexByModel[t];
                return this.findByCid(e)
            }, findByCustom: function (t) {
                var e = this._indexByCustom[t];
                return this.findByCid(e)
            }, findByIndex: function (t) {
                return e.values(this._views)[t]
            }, findByCid: function (t) {
                return this._views[t]
            }, remove: function (t) {
                var i = t.cid;
                return t.model && delete this._indexByModel[t.model.cid], e.any(this._indexByCustom, function (t, e) {
                    return t === i ? (delete this._indexByCustom[e], !0) : void 0
                }, this), delete this._views[i], this._updateLength(), this
            }, call: function (t) {
                this.apply(t, e.tail(arguments))
            }, apply: function (t, i) {
                e.each(this._views, function (n) {
                    e.isFunction(n[t]) && n[t].apply(n, i || [])
                })
            }, _updateLength: function () {
                this.length = e.size(this._views)
            }
        });
        var n = ["forEach", "each", "map", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "toArray", "first", "initial", "rest", "last", "without", "isEmpty", "pluck"];
        return e.each(n, function (t) {
            i.prototype[t] = function () {
                var i = e.values(this._views), n = [i].concat(e.toArray(arguments));
                return e[t].apply(e, n)
            }
        }), i
    }(e, t), e.ChildViewContainer
}), function (t, e) {
    if ("object" == typeof exports) {
        var i = require("underscore"), n = require("backbone"), s = require("backbone.wreqr"), r = require("backbone.babysitter");
        module.exports = e(i, n, s, r)
    } else"function" == typeof define && define.amd && define("marionette", ["underscore", "backbone", "backbone.wreqr", "backbone.babysitter"], e)
}(this, function (t, e) {
    (function (t, e, i) {
        function n(t) {
            return o.call(t)
        }

        function s(t, e) {
            var i = new Error(t);
            throw i.name = e || "Error", i
        }

        var r = {};
        e.Marionette = r, r.$ = e.$;
        var o = Array.prototype.slice;
        return r.extend = e.Model.extend, r.getOption = function (t, e) {
            if (t && e) {
                var i;
                return i = t.options && e in t.options && void 0 !== t.options[e] ? t.options[e] : t[e]
            }
        }, r.normalizeMethods = function (t) {
            var e, n = {};
            return i.each(t, function (t, s) {
                e = t, i.isFunction(e) || (e = this[e]), e && (n[s] = e)
            }, this), n
        }, r.triggerMethod = function () {
            function t(t, e, i) {
                return i.toUpperCase()
            }

            var e = /(^|:)(\w)/gi, n = function (n) {
                var s = "on" + n.replace(e, t), r = this[s];
                return i.isFunction(this.trigger) && this.trigger.apply(this, arguments), i.isFunction(r) ? r.apply(this, i.tail(arguments)) : void 0
            };
            return n
        }(), r.MonitorDOMRefresh = function (t) {
            function e(t) {
                t._isShown = !0, s(t)
            }

            function n(t) {
                t._isRendered = !0, s(t)
            }

            function s(t) {
                t._isShown && t._isRendered && r(t) && i.isFunction(t.triggerMethod) && t.triggerMethod("dom:refresh")
            }

            function r(e) {
                return t.contains(e.el)
            }

            return function (t) {
                t.listenTo(t, "show", function () {
                    e(t)
                }), t.listenTo(t, "render", function () {
                    n(t)
                })
            }
        }(document.documentElement), function (t) {
            function e(t, e, n, r) {
                var o = r.split(/\s+/);
                i.each(o, function (i) {
                    var r = t[i];
                    r || s("Method '" + i + "' was configured as an event handler, but does not exist."), t.listenTo(e, n, r, t)
                })
            }

            function n(t, e, i, n) {
                t.listenTo(e, i, n, t)
            }

            function r(t, e, n, s) {
                var r = s.split(/\s+/);
                i.each(r, function (i) {
                    var s = t[i];
                    t.stopListening(e, n, s, t)
                })
            }

            function o(t, e, i, n) {
                t.stopListening(e, i, n, t)
            }

            function a(t, e, n, s, r) {
                e && n && (i.isFunction(n) && (n = n.call(t)), i.each(n, function (n, o) {
                    i.isFunction(n) ? s(t, e, o, n) : r(t, e, o, n)
                }))
            }

            t.bindEntityEvents = function (t, i, s) {
                a(t, i, s, n, e)
            }, t.unbindEntityEvents = function (t, e, i) {
                a(t, e, i, o, r)
            }
        }(r), r.Callbacks = function () {
            this._deferred = r.$.Deferred(), this._callbacks = []
        }, i.extend(r.Callbacks.prototype, {
            add: function (t, e) {
                this._callbacks.push({cb: t, ctx: e}), this._deferred.done(function (i, n) {
                    e && (i = e), t.call(i, n)
                })
            }, run: function (t, e) {
                this._deferred.resolve(e, t)
            }, reset: function () {
                var t = this._callbacks;
                this._deferred = r.$.Deferred(), this._callbacks = [], i.each(t, function (t) {
                    this.add(t.cb, t.ctx)
                }, this)
            }
        }), r.Controller = function (t) {
            this.triggerMethod = r.triggerMethod, this.options = t || {}, i.isFunction(this.initialize) && this.initialize(this.options)
        }, r.Controller.extend = r.extend, i.extend(r.Controller.prototype, e.Events, {
            close: function () {
                this.stopListening(), this.triggerMethod("close"), this.unbind()
            }
        }), r.Region = function (t) {
            if (this.options = t || {}, this.el = r.getOption(this, "el"), !this.el) {
                var e = new Error("An 'el' must be specified for a region.");
                throw e.name = "NoElError", e
            }
            if (this.initialize) {
                var i = Array.prototype.slice.apply(arguments);
                this.initialize.apply(this, i)
            }
        }, i.extend(r.Region, {
            buildRegion: function (t, e) {
                var n = "string" == typeof t, s = "string" == typeof t.selector, r = "undefined" == typeof t.regionType, o = "function" == typeof t;
                if (!o && !n && !s)throw new Error("Region must be specified as a Region type, a selector string or an object with selector property");
                var a, l;
                n && (a = t), t.selector && (a = t.selector, delete t.selector), o && (l = t), !o && r && (l = e), t.regionType && (l = t.regionType, delete t.regionType), (n || o) && (t = {}), t.el = a;
                var c = new l(t);
                return t.parentEl && (c.getEl = function (e) {
                    var n = t.parentEl;
                    return i.isFunction(n) && (n = n()), n.find(e)
                }), c
            }
        }), i.extend(r.Region.prototype, e.Events, {
            show: function (t) {
                this.ensureEl();
                var e = t.isClosed || i.isUndefined(t.$el), n = t !== this.currentView;
                n && this.close(), t.render(), (n || e) && this.open(t), this.currentView = t, r.triggerMethod.call(this, "show", t), r.triggerMethod.call(t, "show")
            }, ensureEl: function () {
                this.$el && 0 !== this.$el.length || (this.$el = this.getEl(this.el))
            }, getEl: function (t) {
                return r.$(t)
            }, open: function (t) {
                this.$el.empty().append(t.el)
            }, close: function () {
                var t = this.currentView;
                t && !t.isClosed && (t.close ? t.close() : t.remove && t.remove(), r.triggerMethod.call(this, "close", t), delete this.currentView)
            }, attachView: function (t) {
                this.currentView = t
            }, reset: function () {
                this.close(), delete this.$el
            }
        }), r.Region.extend = r.extend, r.RegionManager = function (t) {
            var e = t.Controller.extend({
                constructor: function (e) {
                    this._regions = {}, t.Controller.prototype.constructor.call(this, e)
                }, addRegions: function (t, e) {
                    var n = {};
                    return i.each(t, function (t, s) {
                        "string" == typeof t && (t = {selector: t}), t.selector && (t = i.defaults({}, t, e));
                        var r = this.addRegion(s, t);
                        n[s] = r
                    }, this), n
                }, addRegion: function (e, n) {
                    var s, r = i.isObject(n), o = i.isString(n), a = !!n.selector;
                    return s = o || r && a ? t.Region.buildRegion(n, t.Region) : i.isFunction(n) ? t.Region.buildRegion(n, t.Region) : n, this._store(e, s), this.triggerMethod("region:add", e, s), s
                }, get: function (t) {
                    return this._regions[t]
                }, removeRegion: function (t) {
                    var e = this._regions[t];
                    this._remove(t, e)
                }, removeRegions: function () {
                    i.each(this._regions, function (t, e) {
                        this._remove(e, t)
                    }, this)
                }, closeRegions: function () {
                    i.each(this._regions, function (t, e) {
                        t.close()
                    }, this)
                }, close: function () {
                    this.removeRegions();
                    var e = Array.prototype.slice.call(arguments);
                    t.Controller.prototype.close.apply(this, e)
                }, _store: function (t, e) {
                    this._regions[t] = e, this._setLength()
                }, _remove: function (t, e) {
                    e.close(), delete this._regions[t], this._setLength(), this.triggerMethod("region:remove", t, e)
                }, _setLength: function () {
                    this.length = i.size(this._regions)
                }
            }), n = ["forEach", "each", "map", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "toArray", "first", "initial", "rest", "last", "without", "isEmpty", "pluck"];
            return i.each(n, function (t) {
                e.prototype[t] = function () {
                    var e = i.values(this._regions), n = [e].concat(i.toArray(arguments));
                    return i[t].apply(i, n)
                }
            }), e
        }(r), r.TemplateCache = function (t) {
            this.templateId = t
        }, i.extend(r.TemplateCache, {
            templateCaches: {}, get: function (t) {
                var e = this.templateCaches[t];
                return e || (e = new r.TemplateCache(t), this.templateCaches[t] = e), e.load()
            }, clear: function () {
                var t, e = n(arguments), i = e.length;
                if (i > 0)for (t = 0; i > t; t++)delete this.templateCaches[e[t]]; else this.templateCaches = {}
            }
        }), i.extend(r.TemplateCache.prototype, {
            load: function () {
                if (this.compiledTemplate)return this.compiledTemplate;
                var t = this.loadTemplate(this.templateId);
                return this.compiledTemplate = this.compileTemplate(t), this.compiledTemplate
            }, loadTemplate: function (t) {
                var e = r.$(t).html();
                return e && 0 !== e.length || s("Could not find template: '" + t + "'", "NoTemplateError"), e
            }, compileTemplate: function (t) {
                return i.template(t)
            }
        }), r.Renderer = {
            render: function (t, e) {
                if (!t) {
                    var i = new Error("Cannot render the template since it's false, null or undefined.");
                    throw i.name = "TemplateNotFoundError", i
                }
                var n;
                return (n = "function" == typeof t ? t : r.TemplateCache.get(t))(e)
            }
        }, r.View = e.View.extend({
            constructor: function (t) {
                i.bindAll(this, "render");
                var n = Array.prototype.slice.apply(arguments);
                this.options = i.extend({}, i.result(this, "options"), i.isFunction(t) ? t.call(this) : t), this.events = this.normalizeUIKeys(i.result(this, "events")), e.View.prototype.constructor.apply(this, n), r.MonitorDOMRefresh(this), this.listenTo(this, "show", this.onShowCalled, this)
            }, triggerMethod: r.triggerMethod, normalizeMethods: r.normalizeMethods, getTemplate: function () {
                return r.getOption(this, "template")
            }, mixinTemplateHelpers: function (t) {
                t = t || {};
                var e = r.getOption(this, "templateHelpers");
                return i.isFunction(e) && (e = e.call(this)), i.extend(t, e)
            }, normalizeUIKeys: function (t) {
                return "undefined" != typeof t ? (i.each(i.keys(t), function (e) {
                    var i = e.split("@ui.");
                    2 === i.length && (t[i[0] + this.ui[i[1]]] = t[e], delete t[e])
                }, this), t) : void 0
            }, configureTriggers: function () {
                if (this.triggers) {
                    var t = {}, e = this.normalizeUIKeys(i.result(this, "triggers"));
                    return i.each(e, function (e, n) {
                        var s = i.isObject(e), r = s ? e.event : e;
                        t[n] = function (t) {
                            if (t) {
                                var i = t.preventDefault, n = t.stopPropagation, o = s ? e.preventDefault : i, a = s ? e.stopPropagation : n;
                                o && i && i.apply(t), a && n && n.apply(t)
                            }
                            var l = {view: this, model: this.model, collection: this.collection};
                            this.triggerMethod(r, l)
                        }
                    }, this), t
                }
            }, delegateEvents: function (t) {
                this._delegateDOMEvents(t), r.bindEntityEvents(this, this.model, r.getOption(this, "modelEvents")), r.bindEntityEvents(this, this.collection, r.getOption(this, "collectionEvents"))
            }, _delegateDOMEvents: function (t) {
                t = t || this.events, i.isFunction(t) && (t = t.call(this));
                var n = {}, s = this.configureTriggers();
                i.extend(n, t, s), e.View.prototype.delegateEvents.call(this, n)
            }, undelegateEvents: function () {
                var t = Array.prototype.slice.call(arguments);
                e.View.prototype.undelegateEvents.apply(this, t), r.unbindEntityEvents(this, this.model, r.getOption(this, "modelEvents")), r.unbindEntityEvents(this, this.collection, r.getOption(this, "collectionEvents"))
            }, onShowCalled: function () {
            }, close: function () {
                if (!this.isClosed) {
                    var t = this.triggerMethod("before:close");
                    t !== !1 && (this.isClosed = !0, this.triggerMethod("close"), this.unbindUIElements(), this.remove())
                }
            }, bindUIElements: function () {
                if (this.ui) {
                    this._uiBindings || (this._uiBindings = this.ui);
                    var t = i.result(this, "_uiBindings");
                    this.ui = {}, i.each(i.keys(t), function (e) {
                        var i = t[e];
                        this.ui[e] = this.$(i)
                    }, this)
                }
            }, unbindUIElements: function () {
                this.ui && this._uiBindings && (i.each(this.ui, function (t, e) {
                    delete this.ui[e]
                }, this), this.ui = this._uiBindings, delete this._uiBindings)
            }
        }), r.ItemView = r.View.extend({
            constructor: function () {
                r.View.prototype.constructor.apply(this, n(arguments))
            }, serializeData: function () {
                var t = {};
                return this.model ? t = this.model.toJSON() : this.collection && (t = {items: this.collection.toJSON()}), t
            }, render: function () {
                this.isClosed = !1, this.triggerMethod("before:render", this), this.triggerMethod("item:before:render", this);
                var t = this.serializeData();
                t = this.mixinTemplateHelpers(t);
                var e = this.getTemplate(), i = r.Renderer.render(e, t);
                return this.$el.html(i), this.bindUIElements(), this.triggerMethod("render", this), this.triggerMethod("item:rendered", this), this
            }, close: function () {
                this.isClosed || (this.triggerMethod("item:before:close"), r.View.prototype.close.apply(this, n(arguments)), this.triggerMethod("item:closed"))
            }
        }), r.CollectionView = r.View.extend({
            itemViewEventPrefix: "itemview", constructor: function (t) {
                this._initChildViewStorage(), r.View.prototype.constructor.apply(this, n(arguments)), this._initialEvents(), this.initRenderBuffer()
            }, initRenderBuffer: function () {
                this.elBuffer = document.createDocumentFragment(), this._bufferedChildren = []
            }, startBuffering: function () {
                this.initRenderBuffer(), this.isBuffering = !0
            }, endBuffering: function () {
                this.isBuffering = !1, this.appendBuffer(this, this.elBuffer), this._triggerShowBufferedChildren(), this.initRenderBuffer()
            }, _triggerShowBufferedChildren: function () {
                this._isShown && (i.each(this._bufferedChildren, function (t) {
                    r.triggerMethod.call(t, "show")
                }), this._bufferedChildren = [])
            }, _initialEvents: function () {
                this.collection && (this.listenTo(this.collection, "add", this.addChildView, this), this.listenTo(this.collection, "remove", this.removeItemView, this), this.listenTo(this.collection, "reset", this.render, this))
            }, addChildView: function (t, e, i) {
                this.closeEmptyView();
                var n = this.getItemView(t), s = this.collection.indexOf(t);
                this.addItemView(t, n, s)
            }, onShowCalled: function () {
                this.children.each(function (t) {
                    r.triggerMethod.call(t, "show")
                })
            }, triggerBeforeRender: function () {
                this.triggerMethod("before:render", this), this.triggerMethod("collection:before:render", this)
            }, triggerRendered: function () {
                this.triggerMethod("render", this), this.triggerMethod("collection:rendered", this)
            }, render: function () {
                return this.isClosed = !1, this.triggerBeforeRender(), this._renderChildren(), this.triggerRendered(), this
            }, _renderChildren: function () {
                this.startBuffering(), this.closeEmptyView(), this.closeChildren(), this.isEmpty(this.collection) ? this.showEmptyView() : this.showCollection(), this.endBuffering()
            }, showCollection: function () {
                var t;
                this.collection.each(function (e, i) {
                    t = this.getItemView(e), this.addItemView(e, t, i)
                }, this)
            }, showEmptyView: function () {
                var t = this.getEmptyView();
                if (t && !this._showingEmptyView) {
                    this._showingEmptyView = !0;
                    var i = new e.Model;
                    this.addItemView(i, t, 0)
                }
            }, closeEmptyView: function () {
                this._showingEmptyView && (this.closeChildren(), delete this._showingEmptyView)
            }, getEmptyView: function () {
                return r.getOption(this, "emptyView")
            }, getItemView: function (t) {
                var e = r.getOption(this, "itemView");
                return e || s("An `itemView` must be specified", "NoItemViewError"), e
            }, addItemView: function (t, e, n) {
                var s = r.getOption(this, "itemViewOptions");
                i.isFunction(s) && (s = s.call(this, t, n));
                var o = this.buildItemView(t, e, s);
                return this.addChildViewEventForwarding(o), this.triggerMethod("before:item:added", o), this.children.add(o), this.renderItemView(o, n), this._isShown && !this.isBuffering && r.triggerMethod.call(o, "show"), this.triggerMethod("after:item:added", o), o
            }, addChildViewEventForwarding: function (t) {
                var e = r.getOption(this, "itemViewEventPrefix");
                this.listenTo(t, "all", function () {
                    var s = n(arguments), o = s[0], a = this.normalizeMethods(this.getItemEvents());
                    s[0] = e + ":" + o, s.splice(1, 0, t), "undefined" != typeof a && i.isFunction(a[o]) && a[o].apply(this, s), r.triggerMethod.apply(this, s)
                }, this)
            }, getItemEvents: function () {
                return i.isFunction(this.itemEvents) ? this.itemEvents.call(this) : this.itemEvents
            }, renderItemView: function (t, e) {
                t.render(), this.appendHtml(this, t, e)
            }, buildItemView: function (t, e, n) {
                var s = i.extend({model: t}, n);
                return new e(s)
            }, removeItemView: function (t) {
                var e = this.children.findByModel(t);
                this.removeChildView(e), this.checkEmpty()
            }, removeChildView: function (t) {
                t && (this.stopListening(t), t.close ? t.close() : t.remove && t.remove(), this.children.remove(t)), this.triggerMethod("item:removed", t)
            }, isEmpty: function (t) {
                return !this.collection || 0 === this.collection.length
            }, checkEmpty: function () {
                this.isEmpty(this.collection) && this.showEmptyView()
            }, appendBuffer: function (t, e) {
                t.$el.append(e)
            }, appendHtml: function (t, e, i) {
                t.isBuffering ? (t.elBuffer.appendChild(e.el), t._bufferedChildren.push(e)) : t.$el.append(e.el)
            }, _initChildViewStorage: function () {
                this.children = new e.ChildViewContainer
            }, close: function () {
                this.isClosed || (this.triggerMethod("collection:before:close"), this.closeChildren(), this.triggerMethod("collection:closed"), r.View.prototype.close.apply(this, n(arguments)))
            }, closeChildren: function () {
                this.children.each(function (t) {
                    this.removeChildView(t)
                }, this), this.checkEmpty()
            }
        }), r.CompositeView = r.CollectionView.extend({
            constructor: function () {
                r.CollectionView.prototype.constructor.apply(this, n(arguments))
            }, _initialEvents: function () {
                this.once("render", function () {
                    this.collection && (this.listenTo(this.collection, "add", this.addChildView, this), this.listenTo(this.collection, "remove", this.removeItemView, this), this.listenTo(this.collection, "reset", this._renderChildren, this))
                })
            }, getItemView: function (t) {
                var e = r.getOption(this, "itemView") || this.constructor;
                return e || s("An `itemView` must be specified", "NoItemViewError"), e
            }, serializeData: function () {
                var t = {};
                return this.model && (t = this.model.toJSON()), t
            }, render: function () {
                this.isRendered = !0, this.isClosed = !1, this.resetItemViewContainer(), this.triggerBeforeRender();
                var t = this.renderModel();
                return this.$el.html(t), this.bindUIElements(), this.triggerMethod("composite:model:rendered"), this._renderChildren(), this.triggerMethod("composite:rendered"), this.triggerRendered(), this
            }, _renderChildren: function () {
                this.isRendered && (this.triggerMethod("composite:collection:before:render"), r.CollectionView.prototype._renderChildren.call(this), this.triggerMethod("composite:collection:rendered"))
            }, renderModel: function () {
                var t = {};
                t = this.serializeData(), t = this.mixinTemplateHelpers(t);
                var e = this.getTemplate();
                return r.Renderer.render(e, t)
            }, appendBuffer: function (t, e) {
                var i = this.getItemViewContainer(t);
                i.append(e)
            }, appendHtml: function (t, e, i) {
                if (t.isBuffering)t.elBuffer.appendChild(e.el), t._bufferedChildren.push(e); else {
                    var n = this.getItemViewContainer(t);
                    n.append(e.el)
                }
            }, getItemViewContainer: function (t) {
                if ("$itemViewContainer" in t)return t.$itemViewContainer;
                var e, n = r.getOption(t, "itemViewContainer");
                if (n) {
                    var o = i.isFunction(n) ? n.call(this) : n;
                    e = t.$(o), e.length <= 0 && s("The specified `itemViewContainer` was not found: " + t.itemViewContainer, "ItemViewContainerMissingError")
                } else e = t.$el;
                return t.$itemViewContainer = e, e
            }, resetItemViewContainer: function () {
                this.$itemViewContainer && delete this.$itemViewContainer
            }
        }), r.Layout = r.ItemView.extend({
            regionType: r.Region, constructor: function (t) {
                t = t || {}, this._firstRender = !0, this._initializeRegions(t), r.ItemView.prototype.constructor.call(this, t)
            }, render: function () {
                this.isClosed && this._initializeRegions(), this._firstRender ? this._firstRender = !1 : this.isClosed || this._reInitializeRegions();
                var t = Array.prototype.slice.apply(arguments), e = r.ItemView.prototype.render.apply(this, t);
                return e
            }, close: function () {
                if (!this.isClosed) {
                    this.regionManager.close();
                    var t = Array.prototype.slice.apply(arguments);
                    r.ItemView.prototype.close.apply(this, t)
                }
            }, addRegion: function (t, e) {
                var i = {};
                return i[t] = e, this._buildRegions(i)[t]
            }, addRegions: function (t) {
                return this.regions = i.extend({}, this.regions, t), this._buildRegions(t)
            }, removeRegion: function (t) {
                return delete this.regions[t], this.regionManager.removeRegion(t)
            }, _buildRegions: function (t) {
                var e = this, i = {
                    regionType: r.getOption(this, "regionType"), parentEl: function () {
                        return e.$el
                    }
                };
                return this.regionManager.addRegions(t, i)
            }, _initializeRegions: function (t) {
                var e;
                this._initRegionManager(), e = i.isFunction(this.regions) ? this.regions(t) : this.regions || {}, this.addRegions(e)
            }, _reInitializeRegions: function () {
                this.regionManager.closeRegions(), this.regionManager.each(function (t) {
                    t.reset()
                })
            }, _initRegionManager: function () {
                this.regionManager = new r.RegionManager, this.listenTo(this.regionManager, "region:add", function (t, e) {
                    this[t] = e, this.trigger("region:add", t, e)
                }), this.listenTo(this.regionManager, "region:remove", function (t, e) {
                    delete this[t], this.trigger("region:remove", t, e)
                })
            }
        }), r.AppRouter = e.Router.extend({
            constructor: function (t) {
                e.Router.prototype.constructor.apply(this, n(arguments)), this.options = t || {};
                var i = r.getOption(this, "appRoutes"), s = this._getController();
                this.processAppRoutes(s, i)
            }, appRoute: function (t, e) {
                var i = this._getController();
                this._addAppRoute(i, t, e)
            }, processAppRoutes: function (t, e) {
                if (e) {
                    var n = i.keys(e).reverse();
                    i.each(n, function (i) {
                        this._addAppRoute(t, i, e[i])
                    }, this)
                }
            }, _getController: function () {
                return r.getOption(this, "controller")
            }, _addAppRoute: function (t, e, n) {
                var s = t[n];
                if (!s)throw new Error("Method '" + n + "' was not found on the controller");
                this.route(e, n, i.bind(s, t))
            }
        }), r.Application = function (t) {
            this._initRegionManager(), this._initCallbacks = new r.Callbacks, this.vent = new e.Wreqr.EventAggregator, this.commands = new e.Wreqr.Commands, this.reqres = new e.Wreqr.RequestResponse, this.submodules = {}, i.extend(this, t), this.triggerMethod = r.triggerMethod
        }, i.extend(r.Application.prototype, e.Events, {
            execute: function () {
                var t = Array.prototype.slice.apply(arguments);
                this.commands.execute.apply(this.commands, t)
            }, request: function () {
                var t = Array.prototype.slice.apply(arguments);
                return this.reqres.request.apply(this.reqres, t)
            }, addInitializer: function (t) {
                this._initCallbacks.add(t)
            }, start: function (t) {
                this.triggerMethod("initialize:before", t), this._initCallbacks.run(t, this), this.triggerMethod("initialize:after", t), this.triggerMethod("start", t)
            }, addRegions: function (t) {
                return this._regionManager.addRegions(t)
            }, closeRegions: function () {
                this._regionManager.closeRegions()
            }, removeRegion: function (t) {
                this._regionManager.removeRegion(t)
            }, getRegion: function (t) {
                return this._regionManager.get(t)
            }, module: function (t, e) {
                var i = r.Module;
                e && (i = e.moduleClass || i);
                var s = n(arguments);
                return s.unshift(this), i.create.apply(i, s)
            }, _initRegionManager: function () {
                this._regionManager = new r.RegionManager, this.listenTo(this._regionManager, "region:add", function (t, e) {
                    this[t] = e
                }), this.listenTo(this._regionManager, "region:remove", function (t, e) {
                    delete this[t]
                })
            }
        }), r.Application.extend = r.extend, r.Module = function (t, e, n) {
            this.moduleName = t, this.options = i.extend({}, this.options, n), this.initialize = n.initialize || this.initialize, this.submodules = {}, this._setupInitializersAndFinalizers(), this.app = e, this.startWithParent = !0, this.triggerMethod = r.triggerMethod, i.isFunction(this.initialize) && this.initialize(this.options, t, e)
        }, r.Module.extend = r.extend, i.extend(r.Module.prototype, e.Events, {
            initialize: function () {
            }, addInitializer: function (t) {
                this._initializerCallbacks.add(t)
            }, addFinalizer: function (t) {
                this._finalizerCallbacks.add(t)
            }, start: function (t) {
                this._isInitialized || (i.each(this.submodules, function (e) {
                    e.startWithParent && e.start(t)
                }), this.triggerMethod("before:start", t), this._initializerCallbacks.run(t, this), this._isInitialized = !0, this.triggerMethod("start", t))
            }, stop: function () {
                this._isInitialized && (this._isInitialized = !1, r.triggerMethod.call(this, "before:stop"), i.each(this.submodules, function (t) {
                    t.stop()
                }), this._finalizerCallbacks.run(void 0, this), this._initializerCallbacks.reset(), this._finalizerCallbacks.reset(), r.triggerMethod.call(this, "stop"))
            }, addDefinition: function (t, e) {
                this._runModuleDefinition(t, e)
            }, _runModuleDefinition: function (t, n) {
                if (t) {
                    var s = i.flatten([this, this.app, e, r, r.$, i, n]);
                    t.apply(this, s)
                }
            }, _setupInitializersAndFinalizers: function () {
                this._initializerCallbacks = new r.Callbacks, this._finalizerCallbacks = new r.Callbacks
            }
        }), i.extend(r.Module, {
            create: function (t, e, s) {
                var r = t, o = n(arguments);
                o.splice(0, 3), e = e.split(".");
                var a = e.length, l = [];
                return l[a - 1] = s, i.each(e, function (e, i) {
                    var n = r;
                    r = this._getModule(n, e, t, s), this._addModuleDefinition(n, r, l[i], o)
                }, this), r
            }, _getModule: function (t, e, n, s, o) {
                var a = r.Module, l = i.extend({}, s);
                s && (a = s.moduleClass || a);
                var c = t[e];
                return c || (c = new a(e, n, l), t[e] = c, t.submodules[e] = c), c
            }, _addModuleDefinition: function (t, e, n, s) {
                var r, o;
                i.isFunction(n) ? (r = n, o = !0) : i.isObject(n) ? (r = n.define, o = "undefined" != typeof n.startWithParent ? n.startWithParent : !0) : o = !0, r && e.addDefinition(r, s), e.startWithParent = e.startWithParent && o, e.startWithParent && !e.startWithParentIsConfigured && (e.startWithParentIsConfigured = !0, t.addInitializer(function (t) {
                    e.startWithParent && e.start(t)
                }))
            }
        }), r
    })(this, e, t);
    return e.Marionette
}), !function (t) {
    t(function () {
        t.support.transition = function () {
            var t = function () {
                var t, e = document.createElement("bootstrap"), i = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
                for (t in i)if (void 0 !== e.style[t])return i[t]
            }();
            return t && {end: t}
        }()
    })
}(window.jQuery), !function (t) {
    var e = '[data-dismiss="alert"]', i = function (i) {
        t(i).on("click", e, this.close)
    };
    i.prototype.close = function (e) {
        function i() {
            n.trigger("closed").remove()
        }

        var n, s = t(this), r = s.attr("data-target");
        r || (r = s.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, "")), n = t(r), e && e.preventDefault(), n.length || (n = s.hasClass("alert") ? s : s.parent()), n.trigger(e = t.Event("close")), e.isDefaultPrevented() || (n.removeClass("in"), t.support.transition && n.hasClass("fade") ? n.on(t.support.transition.end, i) : i())
    };
    var n = t.fn.alert;
    t.fn.alert = function (e) {
        return this.each(function () {
            var n = t(this), s = n.data("alert");
            s || n.data("alert", s = new i(this)), "string" == typeof e && s[e].call(n)
        })
    }, t.fn.alert.Constructor = i, t.fn.alert.noConflict = function () {
        return t.fn.alert = n, this
    }, t(document).on("click.alert.data-api", e, i.prototype.close)
}(window.jQuery), !function (t) {
    var e = function (e, i) {
        this.$element = t(e), this.options = t.extend({}, t.fn.button.defaults, i)
    };
    e.prototype.setState = function (t) {
        var e = "disabled", i = this.$element, n = i.data(), s = i.is("input") ? "val" : "html";
        t += "Text", n.resetText || i.data("resetText", i[s]()), i[s](n[t] || this.options[t]), setTimeout(function () {
            "loadingText" == t ? i.addClass(e).attr(e, e) : i.removeClass(e).removeAttr(e)
        }, 0)
    }, e.prototype.toggle = function () {
        var t = this.$element.closest('[data-toggle="buttons-radio"]');
        t && t.find(".active").removeClass("active"), this.$element.toggleClass("active")
    };
    var i = t.fn.button;
    t.fn.button = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("button"), r = "object" == typeof i && i;
            s || n.data("button", s = new e(this, r)), "toggle" == i ? s.toggle() : i && s.setState(i)
        })
    }, t.fn.button.defaults = {loadingText: "loading..."}, t.fn.button.Constructor = e, t.fn.button.noConflict = function () {
        return t.fn.button = i, this
    }, t(document).on("click.button.data-api", "[data-toggle^=button]", function (e) {
        var i = t(e.target);
        i.hasClass("btn") || (i = i.closest(".btn")), i.button("toggle")
    })
}(window.jQuery), !function (t) {
    var e = function (e, i) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, "hover" == this.options.pause && this.$element.on("mouseenter", t.proxy(this.pause, this)).on("mouseleave", t.proxy(this.cycle, this))
    };
    e.prototype = {
        cycle: function (e) {
            return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
        }, getActiveIndex: function () {
            return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
        }, to: function (e) {
            var i = this.getActiveIndex(), n = this;
            if (!(e > this.$items.length - 1 || 0 > e))return this.sliding ? this.$element.one("slid", function () {
                n.to(e)
            }) : i == e ? this.pause().cycle() : this.slide(e > i ? "next" : "prev", t(this.$items[e]))
        }, pause: function (e) {
            return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition.end && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), clearInterval(this.interval), this.interval = null, this
        }, next: function () {
            return this.sliding ? void 0 : this.slide("next")
        }, prev: function () {
            return this.sliding ? void 0 : this.slide("prev")
        }, slide: function (e, i) {
            var n, s = this.$element.find(".item.active"), r = i || s[e](), o = this.interval, a = "next" == e ? "left" : "right", l = "next" == e ? "first" : "last", c = this;
            if (this.sliding = !0, o && this.pause(), r = r.length ? r : this.$element.find(".item")[l](), n = t.Event("slide", {
                    relatedTarget: r[0],
                    direction: a
                }), !r.hasClass("active")) {
                if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function () {
                        var e = t(c.$indicators.children()[c.getActiveIndex()]);
                        e && e.addClass("active")
                    })), t.support.transition && this.$element.hasClass("slide")) {
                    if (this.$element.trigger(n), n.isDefaultPrevented())return;
                    r.addClass(e), r[0].offsetWidth, s.addClass(a), r.addClass(a), this.$element.one(t.support.transition.end, function () {
                        r.removeClass([e, a].join(" ")).addClass("active"), s.removeClass(["active", a].join(" ")), c.sliding = !1, setTimeout(function () {
                            c.$element.trigger("slid")
                        }, 0)
                    })
                } else {
                    if (this.$element.trigger(n), n.isDefaultPrevented())return;
                    s.removeClass("active"), r.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
                }
                return o && this.cycle(), this
            }
        }
    };
    var i = t.fn.carousel;
    t.fn.carousel = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("carousel"), r = t.extend({}, t.fn.carousel.defaults, "object" == typeof i && i), o = "string" == typeof i ? i : r.slide;
            s || n.data("carousel", s = new e(this, r)), "number" == typeof i ? s.to(i) : o ? s[o]() : r.interval && s.pause().cycle()
        })
    }, t.fn.carousel.defaults = {
        interval: 5e3,
        pause: "hover"
    }, t.fn.carousel.Constructor = e, t.fn.carousel.noConflict = function () {
        return t.fn.carousel = i, this
    }, t(document).on("click.carousel.data-api", "[data-slide], [data-slide-to]", function (e) {
        var i, n, s = t(this), r = t(s.attr("data-target") || (i = s.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "")), o = t.extend({}, r.data(), s.data());
        r.carousel(o),
        (n = s.attr("data-slide-to")) && r.data("carousel").pause().to(n).cycle(), e.preventDefault()
    })
}(window.jQuery), !function (t) {
    var e = function (e, i) {
        this.$element = t(e), this.options = t.extend({}, t.fn.collapse.defaults, i), this.options.parent && (this.$parent = t(this.options.parent)), this.options.toggle && this.toggle()
    };
    e.prototype = {
        constructor: e, dimension: function () {
            var t = this.$element.hasClass("width");
            return t ? "width" : "height"
        }, show: function () {
            var e, i, n, s;
            if (!this.transitioning && !this.$element.hasClass("in")) {
                if (e = this.dimension(), i = t.camelCase(["scroll", e].join("-")), n = this.$parent && this.$parent.find("> .accordion-group > .in"), n && n.length) {
                    if (s = n.data("collapse"), s && s.transitioning)return;
                    n.collapse("hide"), s || n.data("collapse", null)
                }
                this.$element[e](0), this.transition("addClass", t.Event("show"), "shown"), t.support.transition && this.$element[e](this.$element[0][i])
            }
        }, hide: function () {
            var e;
            !this.transitioning && this.$element.hasClass("in") && (e = this.dimension(), this.reset(this.$element[e]()), this.transition("removeClass", t.Event("hide"), "hidden"), this.$element[e](0))
        }, reset: function (t) {
            var e = this.dimension();
            return this.$element.removeClass("collapse")[e](t || "auto")[0].offsetWidth, this.$element[null !== t ? "addClass" : "removeClass"]("collapse"), this
        }, transition: function (e, i, n) {
            var s = this, r = function () {
                "show" == i.type && s.reset(), s.transitioning = 0, s.$element.trigger(n)
            };
            this.$element.trigger(i), i.isDefaultPrevented() || (this.transitioning = 1, this.$element[e]("in"), t.support.transition && this.$element.hasClass("collapse") ? this.$element.one(t.support.transition.end, r) : r())
        }, toggle: function () {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }
    };
    var i = t.fn.collapse;
    t.fn.collapse = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("collapse"), r = t.extend({}, t.fn.collapse.defaults, n.data(), "object" == typeof i && i);
            s || n.data("collapse", s = new e(this, r)), "string" == typeof i && s[i]()
        })
    }, t.fn.collapse.defaults = {toggle: !0}, t.fn.collapse.Constructor = e, t.fn.collapse.noConflict = function () {
        return t.fn.collapse = i, this
    }, t(document).on("click.collapse.data-api", "[data-toggle=collapse]", function (e) {
        var i, n = t(this), s = n.attr("data-target") || e.preventDefault() || (i = n.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""), r = t(s).data("collapse") ? "toggle" : n.data();
        n[t(s).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), t(s).collapse(r)
    })
}(window.jQuery), !function (t) {
    function e() {
        t(".dropdown-backdrop").remove(), t(n).each(function () {
            i(t(this)).removeClass("open")
        })
    }

    function i(e) {
        var i, n = e.attr("data-target");
        return n || (n = e.attr("href"), n = n && /#/.test(n) && n.replace(/.*(?=#[^\s]*$)/, "")), i = n && t(n), i && i.length || (i = e.parent()), i
    }

    var n = "[data-toggle=dropdown]", s = function (e) {
        var i = t(e).on("click.dropdown.data-api", this.toggle);
        t("html").on("click.dropdown.data-api", function () {
            i.parent().removeClass("open")
        })
    };
    s.prototype = {
        constructor: s, toggle: function (n) {
            var s, r, o = t(this);
            if (!o.is(".disabled, :disabled"))return s = i(o), r = s.hasClass("open"), e(), r || ("ontouchstart" in document.documentElement && t('<div class="dropdown-backdrop"/>').insertBefore(t(this)).on("click", e), s.toggleClass("open")), o.focus(), !1
        }, keydown: function (e) {
            var s, r, o, a, l;
            if (/(38|40|27)/.test(e.keyCode) && (s = t(this), e.preventDefault(), e.stopPropagation(), !s.is(".disabled, :disabled"))) {
                if (o = i(s), a = o.hasClass("open"), !a || a && 27 == e.keyCode)return 27 == e.which && o.find(n).focus(), s.click();
                r = t("[role=menu] li:not(.divider):visible a", o), r.length && (l = r.index(r.filter(":focus")), 38 == e.keyCode && l > 0 && l--, 40 == e.keyCode && l < r.length - 1 && l++, ~l || (l = 0), r.eq(l).focus())
            }
        }
    };
    var r = t.fn.dropdown;
    t.fn.dropdown = function (e) {
        return this.each(function () {
            var i = t(this), n = i.data("dropdown");
            n || i.data("dropdown", n = new s(this)), "string" == typeof e && n[e].call(i)
        })
    }, t.fn.dropdown.Constructor = s, t.fn.dropdown.noConflict = function () {
        return t.fn.dropdown = r, this
    }, t(document).on("click.dropdown.data-api", e).on("click.dropdown.data-api", ".dropdown form", function (t) {
        t.stopPropagation()
    }).on("click.dropdown.data-api", n, s.prototype.toggle).on("keydown.dropdown.data-api", n + ", [role=menu]", s.prototype.keydown)
}(window.jQuery), !function (t) {
    var e = function (e, i) {
        this.options = i, this.$element = t(e).delegate('[data-dismiss="modal"]', "click.dismiss.modal", t.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    e.prototype = {
        constructor: e, updateModalPosition: function () {
            var e = this;
            e.$element.css({
                "margin-top": function () {
                    return t(window).scrollTop()
                }
            })
        }, toggle: function () {
            return this[this.isShown ? "hide" : "show"]()
        }, show: function () {
            var e = this, i = t.Event("show");
            this.$element.trigger(i), this.isShown || i.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.backdrop(function () {
                var i = t.support.transition && e.$element.hasClass("fade");
                e.$element.parent().length || e.$element.appendTo(document.body), e.$element.show(), i && e.$element[0].offsetWidth, e.$element.addClass("in").attr("aria-hidden", !1), e.enforceFocus(), i ? e.$element.one(t.support.transition.end, function () {
                    e.$element.focus().trigger("shown")
                }) : e.$element.focus().trigger("shown")
            }), e.updateModalPosition())
        }, hide: function (e) {
            e && e.preventDefault();
            e = t.Event("hide"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), t(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), t.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal())
        }, enforceFocus: function () {
            var e = this;
            t(document).on("focusin.modal", function (t) {
                e.$element[0] === t.target || e.$element.has(t.target).length || e.$element.focus()
            })
        }, escape: function () {
            var t = this;
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function (e) {
                27 == e.which && t.hide()
            }) : this.isShown || this.$element.off("keyup.dismiss.modal")
        }, hideWithTransition: function () {
            var e = this, i = setTimeout(function () {
                e.$element.off(t.support.transition.end), e.hideModal()
            }, 500);
            this.$element.one(t.support.transition.end, function () {
                clearTimeout(i), e.hideModal()
            })
        }, hideModal: function () {
            var t = this;
            this.$element.hide(), this.backdrop(function () {
                t.removeBackdrop(), t.$element.trigger("hidden")
            })
        }, removeBackdrop: function () {
            this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
        }, backdrop: function (e) {
            var i = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var n = t.support.transition && i;
                if (this.$backdrop = t('<div class="modal-backdrop ' + i + '" />').appendTo(document.body), this.$backdrop.click("static" == this.options.backdrop ? t.proxy(this.$element[0].focus, this.$element[0]) : t.proxy(this.hide, this)), n && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e)return;
                n ? this.$backdrop.one(t.support.transition.end, e) : e()
            } else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(t.support.transition.end, e) : e()) : e && e()
        }
    };
    var i = t.fn.modal;
    t.fn.modal = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("modal"), r = t.extend({}, t.fn.modal.defaults, n.data(), "object" == typeof i && i);
            s || n.data("modal", s = new e(this, r)), "string" == typeof i ? s[i]() : r.show && s.show()
        })
    }, t.fn.modal.defaults = {
        backdrop: "static",
        keyboard: !0,
        show: !0
    }, t.fn.modal.Constructor = e, t.fn.modal.noConflict = function () {
        return t.fn.modal = i, this
    }, t(document).on("click.modal.data-api", '[data-toggle="modal"]', function (e) {
        var i = t(this), n = i.attr("href"), s = t(i.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, "")), r = s.data("modal") ? "toggle" : t.extend({remote: !/#/.test(n) && n}, s.data(), i.data());
        e.preventDefault(), s.modal(r).one("hide", function () {
            i.focus()
        })
    })
}(window.jQuery), !function (t) {
    var e = function (t, e) {
        this.init("tooltip", t, e)
    };
    e.prototype = {
        constructor: e, init: function (e, i, n) {
            var s, r, o, a, l;
            for (this.type = e, this.$element = t(i), this.options = this.getOptions(n), this.enabled = !0, o = this.options.trigger.split(" "), l = o.length; l--;)a = o[l], "click" == a ? this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)) : "manual" != a && (s = "hover" == a ? "mouseenter" : "focus", r = "hover" == a ? "mouseleave" : "blur", this.$element.on(s + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(r + "." + this.type, this.options.selector, t.proxy(this.leave, this)));
            this.options.selector ? this._options = t.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        }, getOptions: function (e) {
            return e = t.extend({}, t.fn[this.type].defaults, this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
                show: e.delay,
                hide: e.delay
            }), e
        }, enter: function (e) {
            var i, n = t.fn[this.type].defaults, s = {};
            return this._options && t.each(this._options, function (t, e) {
                n[t] != e && (s[t] = e)
            }, this), i = t(e.currentTarget)[this.type](s).data(this.type), i.options.delay && i.options.delay.show ? (clearTimeout(this.timeout), i.hoverState = "in", void(this.timeout = setTimeout(function () {
                "in" == i.hoverState && i.show()
            }, i.options.delay.show))) : i.show()
        }, leave: function (e) {
            var i = t(e.currentTarget)[this.type](this._options).data(this.type);
            return this.timeout && clearTimeout(this.timeout), i.options.delay && i.options.delay.hide ? (i.hoverState = "out", void(this.timeout = setTimeout(function () {
                "out" == i.hoverState && i.hide()
            }, i.options.delay.hide))) : i.hide()
        }, show: function () {
            var e, i, n, s, r, o, a = t.Event("show");
            if (this.hasContent() && this.enabled) {
                if (this.$element.trigger(a), a.isDefaultPrevented())return;
                switch (e = this.tip(), this.setContent(), this.options.animation && e.addClass("fade"), r = "function" == typeof this.options.placement ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement, e.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }), this.options.container ? e.appendTo(this.options.container) : e.insertAfter(this.$element), i = this.getPosition(), n = e[0].offsetWidth, s = e[0].offsetHeight, r) {
                    case"bottom":
                        o = {top: i.top + i.height, left: i.left + i.width / 2 - n / 2};
                        break;
                    case"top":
                        o = {top: i.top - s, left: i.left + i.width / 2 - n / 2};
                        break;
                    case"left":
                        o = {top: i.top + i.height / 2 - s / 2, left: i.left - n};
                        break;
                    case"right":
                        o = {top: i.top + i.height / 2 - s / 2, left: i.left + i.width}
                }
                this.applyPlacement(o, r), this.$element.trigger("shown")
            }
        }, applyPlacement: function (t, e) {
            var i, n, s, r, o = this.tip(), a = o[0].offsetWidth, l = o[0].offsetHeight;
            o.offset(t).addClass(e).addClass("in"), i = o[0].offsetWidth, n = o[0].offsetHeight, "top" == e && n != l && (t.top = t.top + l - n, r = !0), "bottom" == e || "top" == e ? (s = 0, t.left < 0 && (s = -2 * t.left, t.left = 0, o.offset(t), i = o[0].offsetWidth, n = o[0].offsetHeight), this.replaceArrow(s - a + i, i, "left")) : this.replaceArrow(n - l, n, "top"), r && o.offset(t)
        }, replaceArrow: function (t, e, i) {
            this.arrow().css(i, t ? 50 * (1 - t / e) + "%" : "")
        }, setContent: function () {
            var t = this.tip(), e = this.getTitle();
            t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
        }, hide: function () {
            function e() {
                var e = setTimeout(function () {
                    i.off(t.support.transition.end).detach()
                }, 500);
                i.one(t.support.transition.end, function () {
                    clearTimeout(e), i.detach()
                })
            }

            var i = this.tip(), n = t.Event("hide");
            return this.$element.trigger(n), n.isDefaultPrevented() ? void 0 : (i.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? e() : i.detach(), this.$element.trigger("hidden"), this)
        }, fixTitle: function () {
            var t = this.$element;
            (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
        }, hasContent: function () {
            return this.getTitle()
        }, getPosition: function () {
            var e = this.$element[0];
            return t.extend({}, "function" == typeof e.getBoundingClientRect ? e.getBoundingClientRect() : {
                width: e.offsetWidth,
                height: e.offsetHeight
            }, this.$element.offset())
        }, getTitle: function () {
            var t, e = this.$element, i = this.options;
            return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
        }, tip: function () {
            return this.$tip = this.$tip || t(this.options.template)
        }, arrow: function () {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        }, validate: function () {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        }, enable: function () {
            this.enabled = !0
        }, disable: function () {
            this.enabled = !1
        }, toggleEnabled: function () {
            this.enabled = !this.enabled
        }, toggle: function (e) {
            var i = e ? t(e.currentTarget)[this.type](this._options).data(this.type) : this;
            i.tip().hasClass("in") ? i.hide() : i.show()
        }, destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    };
    var i = t.fn.tooltip;
    t.fn.tooltip = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("tooltip"), r = "object" == typeof i && i;
            s || n.data("tooltip", s = new e(this, r)), "string" == typeof i && s[i]()
        })
    }, t.fn.tooltip.Constructor = e, t.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, t.fn.tooltip.noConflict = function () {
        return t.fn.tooltip = i, this
    }
}(window.jQuery), !function (t) {
    var e = function (t, e) {
        this.init("popover", t, e)
    };
    e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype, {
        constructor: e, setContent: function () {
            var t = this.tip(), e = this.getTitle(), i = this.getContent();
            t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content")[this.options.html ? "html" : "text"](i), t.removeClass("fade top bottom left right in")
        }, hasContent: function () {
            return this.getTitle() || this.getContent()
        }, getContent: function () {
            var t, e = this.$element, i = this.options;
            return t = ("function" == typeof i.content ? i.content.call(e[0]) : i.content) || e.attr("data-content")
        }, tip: function () {
            return this.$tip || (this.$tip = t(this.options.template)), this.$tip
        }, destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    });
    var i = t.fn.popover;
    t.fn.popover = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("popover"), r = "object" == typeof i && i;
            s || n.data("popover", s = new e(this, r)), "string" == typeof i && s[i]()
        })
    }, t.fn.popover.Constructor = e, t.fn.popover.defaults = t.extend({}, t.fn.tooltip.defaults, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), t.fn.popover.noConflict = function () {
        return t.fn.popover = i, this
    }
}(window.jQuery), !function (t) {
    function e(e, i) {
        var n, s = t.proxy(this.process, this), r = t(t(e).is("body") ? window : e);
        this.options = t.extend({}, t.fn.scrollspy.defaults, i), this.$scrollElement = r.on("scroll.scroll-spy.data-api", s), this.selector = (this.options.target || (n = t(e).attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = t("body"), this.refresh(), this.process()
    }

    e.prototype = {
        constructor: e, refresh: function () {
            var e, i = this;
            this.offsets = t([]), this.targets = t([]), e = this.$body.find(this.selector).map(function () {
                var e = t(this), n = e.data("target") || e.attr("href"), s = /^#\w/.test(n) && t(n);
                return s && s.length && [[s.position().top + (!t.isWindow(i.$scrollElement.get(0)) && i.$scrollElement.scrollTop()), n]] || null
            }).sort(function (t, e) {
                return t[0] - e[0]
            }).each(function () {
                i.offsets.push(this[0]), i.targets.push(this[1])
            })
        }, process: function () {
            var t, e = this.$scrollElement.scrollTop() + this.options.offset, i = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, n = i - this.$scrollElement.height(), s = this.offsets, r = this.targets, o = this.activeTarget;
            if (e >= n)return o != (t = r.last()[0]) && this.activate(t);
            for (t = s.length; t--;)o != r[t] && e >= s[t] && (!s[t + 1] || e <= s[t + 1]) && this.activate(r[t])
        }, activate: function (e) {
            var i, n;
            this.activeTarget = e, t(this.selector).parent(".active").removeClass("active"), n = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]', i = t(n).parent("li").addClass("active"), i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active")), i.trigger("activate")
        }
    };
    var i = t.fn.scrollspy;
    t.fn.scrollspy = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("scrollspy"), r = "object" == typeof i && i;
            s || n.data("scrollspy", s = new e(this, r)), "string" == typeof i && s[i]()
        })
    }, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.defaults = {offset: 10}, t.fn.scrollspy.noConflict = function () {
        return t.fn.scrollspy = i, this
    }, t(window).on("load", function () {
        t('[data-spy="scroll"]').each(function () {
            var e = t(this);
            e.scrollspy(e.data())
        })
    })
}(window.jQuery), !function (t) {
    var e = function (e) {
        this.element = t(e)
    };
    e.prototype = {
        constructor: e, show: function () {
            var e, i, n, s = this.element, r = s.closest("ul:not(.dropdown-menu)"), o = s.attr("data-target");
            o || (o = s.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, "")), s.parent("li").hasClass("active") || (e = r.find(".active:last a")[0], n = t.Event("show", {relatedTarget: e}), s.trigger(n), n.isDefaultPrevented() || (i = t(o), this.activate(s.parent("li"), r), this.activate(i, i.parent(), function () {
                s.trigger({type: "shown", relatedTarget: e})
            })))
        }, activate: function (e, i, n) {
            function s() {
                r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), e.addClass("active"), o ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active"), n && n()
            }

            var r = i.find("> .active"), o = n && t.support.transition && r.hasClass("fade");
            o ? r.one(t.support.transition.end, s) : s(), r.removeClass("in")
        }
    };
    var i = t.fn.tab;
    t.fn.tab = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("tab");
            s || n.data("tab", s = new e(this)), "string" == typeof i && s[i]()
        })
    }, t.fn.tab.Constructor = e, t.fn.tab.noConflict = function () {
        return t.fn.tab = i, this
    }, t(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
        e.preventDefault(), t(this).tab("show")
    })
}(window.jQuery), !function (t) {
    var e = function (e, i) {
        this.$element = t(e), this.options = t.extend({}, t.fn.typeahead.defaults, i), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.source = this.options.source, this.$menu = t(this.options.menu), this.shown = !1, this.listen()
    };
    e.prototype = {
        constructor: e, select: function () {
            var t = this.$menu.find(".active").attr("data-value");
            return this.$element.val(this.updater(t)).change(), this.hide()
        }, updater: function (t) {
            return t
        }, show: function () {
            var e = t.extend({}, this.$element.position(), {height: this.$element[0].offsetHeight});
            return this.$menu.insertAfter(this.$element).css({
                top: e.top + e.height,
                left: e.left
            }).show(), this.shown = !0, this
        }, hide: function () {
            return this.$menu.hide(), this.shown = !1, this
        }, lookup: function (e) {
            var i;
            return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (i = t.isFunction(this.source) ? this.source(this.query, t.proxy(this.process, this)) : this.source, i ? this.process(i) : this)
        }, process: function (e) {
            var i = this;
            return e = t.grep(e, function (t) {
                return i.matcher(t)
            }), e = this.sorter(e), e.length ? this.render(e.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
        }, matcher: function (t) {
            return ~t.toLowerCase().indexOf(this.query.toLowerCase())
        }, sorter: function (t) {
            for (var e, i = [], n = [], s = []; e = t.shift();)e.toLowerCase().indexOf(this.query.toLowerCase()) ? ~e.indexOf(this.query) ? n.push(e) : s.push(e) : i.push(e);
            return i.concat(n, s)
        }, highlighter: function (t) {
            var e = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return t.replace(new RegExp("(" + e + ")", "ig"), function (t, e) {
                return "<strong>" + e + "</strong>"
            })
        }, render: function (e) {
            var i = this;
            return e = t(e).map(function (e, n) {
                return e = t(i.options.item).attr("data-value", n), e.find("a").html(i.highlighter(n)), e[0]
            }), e.first().addClass("active"), this.$menu.html(e), this
        }, next: function (e) {
            var i = this.$menu.find(".active").removeClass("active"), n = i.next();
            n.length || (n = t(this.$menu.find("li")[0])), n.addClass("active")
        }, prev: function (t) {
            var e = this.$menu.find(".active").removeClass("active"), i = e.prev();
            i.length || (i = this.$menu.find("li").last()), i.addClass("active")
        }, listen: function () {
            this.$element.on("focus", t.proxy(this.focus, this)).on("blur", t.proxy(this.blur, this)).on("keypress", t.proxy(this.keypress, this)).on("keyup", t.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", t.proxy(this.keydown, this)), this.$menu.on("click", t.proxy(this.click, this)).on("mouseenter", "li", t.proxy(this.mouseenter, this)).on("mouseleave", "li", t.proxy(this.mouseleave, this))
        }, eventSupported: function (t) {
            var e = t in this.$element;
            return e || (this.$element.setAttribute(t, "return;"), e = "function" == typeof this.$element[t]), e
        }, move: function (t) {
            if (this.shown) {
                switch (t.keyCode) {
                    case 9:
                    case 13:
                    case 27:
                        t.preventDefault();
                        break;
                    case 38:
                        t.preventDefault(), this.prev();
                        break;
                    case 40:
                        t.preventDefault(), this.next()
                }
                t.stopPropagation()
            }
        }, keydown: function (e) {
            this.suppressKeyPressRepeat = ~t.inArray(e.keyCode, [40, 38, 9, 13, 27]), this.move(e)
        }, keypress: function (t) {
            this.suppressKeyPressRepeat || this.move(t)
        }, keyup: function (t) {
            switch (t.keyCode) {
                case 40:
                case 38:
                case 16:
                case 17:
                case 18:
                    break;
                case 9:
                case 13:
                    if (!this.shown)return;
                    this.select();
                    break;
                case 27:
                    if (!this.shown)return;
                    this.hide();
                    break;
                default:
                    this.lookup()
            }
            t.stopPropagation(), t.preventDefault()
        }, focus: function (t) {
            this.focused = !0
        }, blur: function (t) {
            this.focused = !1, !this.mousedover && this.shown && this.hide()
        }, click: function (t) {
            t.stopPropagation(), t.preventDefault(), this.select(), this.$element.focus()
        }, mouseenter: function (e) {
            this.mousedover = !0, this.$menu.find(".active").removeClass("active"), t(e.currentTarget).addClass("active")
        }, mouseleave: function (t) {
            this.mousedover = !1, !this.focused && this.shown && this.hide()
        }
    };
    var i = t.fn.typeahead;
    t.fn.typeahead = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("typeahead"), r = "object" == typeof i && i;
            s || n.data("typeahead", s = new e(this, r)), "string" == typeof i && s[i]()
        })
    }, t.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>',
        minLength: 1
    }, t.fn.typeahead.Constructor = e, t.fn.typeahead.noConflict = function () {
        return t.fn.typeahead = i, this
    }, t(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function (e) {
        var i = t(this);
        i.data("typeahead") || i.typeahead(i.data())
    })
}(window.jQuery), !function (t) {
    var e = function (e, i) {
        this.options = t.extend({}, t.fn.affix.defaults, i), this.$window = t(window).on("scroll.affix.data-api", t.proxy(this.checkPosition, this)).on("click.affix.data-api", t.proxy(function () {
            setTimeout(t.proxy(this.checkPosition, this), 1)
        }, this)), this.$element = t(e), this.checkPosition()
    };
    e.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var e, i = t(document).height(), n = this.$window.scrollTop(), s = this.$element.offset(), r = this.options.offset, o = r.bottom, a = r.top, l = "affix affix-top affix-bottom";
            "object" != typeof r && (o = a = r), "function" == typeof a && (a = r.top()), "function" == typeof o && (o = r.bottom()), e = null != this.unpin && n + this.unpin <= s.top ? !1 : null != o && s.top + this.$element.height() >= i - o ? "bottom" : null != a && a >= n ? "top" : !1, this.affixed !== e && (this.affixed = e, this.unpin = "bottom" == e ? s.top - n : null, this.$element.removeClass(l).addClass("affix" + (e ? "-" + e : "")))
        }
    };
    var i = t.fn.affix;
    t.fn.affix = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("affix"), r = "object" == typeof i && i;
            s || n.data("affix", s = new e(this, r)), "string" == typeof i && s[i]()
        })
    }, t.fn.affix.Constructor = e, t.fn.affix.defaults = {offset: 0}, t.fn.affix.noConflict = function () {
        return t.fn.affix = i, this
    }, t(window).on("load", function () {
        t('[data-spy="affix"]').each(function () {
            var e = t(this), i = e.data();
            i.offset = i.offset || {}, i.offsetBottom && (i.offset.bottom = i.offsetBottom), i.offsetTop && (i.offset.top = i.offsetTop), e.affix(i)
        })
    })
}(window.jQuery), define("bootstrap", ["jquery"], function () {
}), function (t) {
    var e = function (e, i) {
        if (this.$element = t(e), this.$note = t('<div class="alert"></div>'), this.options = t.extend(!0, {}, t.fn.notify.defaults, i, this.$element.data()), this.options.transition ? "fade" == this.options.transition ? this.$note.addClass("in").addClass(this.options.transition) : this.$note.addClass(this.options.transition) : this.$note.addClass("fade").addClass("in"), this.$note.addClass(this.options.type ? "alert-" + this.options.type : "alert-success"), this.options.message && ("string" == typeof this.options.message ? this.$note.html(this.options.message) : "object" == typeof this.options.message && (this.options.message.html ? this.$note.html(this.options.message.html) : this.options.message.text && this.$note.text(this.options.message.text))), this.options.closable) {
            var n = t('<a href="javascript:;" class="close pull-right">&times;</a>');
            t(n).on("click", t.proxy(onClose, this)), t(n).on("keydown", t.proxy(onClose, this)), this.$note.prepend(n), 0 === t(".notify-backdrop").length && t('<div class="notify-backdrop fade in"></div>').appendTo("body")
        }
        if (this.options.uncloseable)0 === t(".notify-backdrop").length && t('<div class="notify-backdrop fade in"></div>').appendTo("body"); else if (!this.options.closable) {
            var s = t(".notify-backdrop");
            s.length > 0 && s.remove()
        }
        return this
    };
    onClose = function (e) {
        if (e)if (e.preventDefault(), "keydown" === e.type) {
            if (13 !== e.keyCode)return
        } else if ("click" !== e.type)return;
        this.options.onClose(), t(this.$note).remove(), t(".notify-backdrop").remove(), this.options.onClosed()
    }, e.prototype.show = function () {
        this.options.fadeOut.enabled && this.$note.delay(this.options.fadeOut.delay || 2e3).fadeOut("slow", t.proxy(onClose, this)), this.$element.empty().append(this.$note), this.$note.alert(), this.$note.find(".close").focus()
    }, e.prototype.hide = function () {
        this.options.fadeOut.enabled ? this.$note.delay(this.options.fadeOut.delay || 2e3).fadeOut("slow", t.proxy(onClose, this)) : onClose.call(this)
    }, t.fn.notify = function (t) {
        return new e(this, t)
    }, t.fn.notify.defaults = {
        type: "success",
        closable: !0,
        transition: "fade",
        fadeOut: {enabled: !0},
        uncloseable: !1,
        message: null,
        onClose: function () {
        },
        onClosed: function () {
        }
    }
}(window.jQuery), define("notify", ["bootstrap"], function () {
}), define("core/utils", ["require", "jquery", "underscore", "notify"], function (t) {
    var e = t("jquery"), i = t("underscore");
    return t("notify"), {
        isFenxiao: function () {
            return window.location.search.indexOf("from=fenxiao") >= 0 || window.location.search.indexOf("from=fx") >= 0 || window.location.host.indexOf("fx") >= 0 || window.location.search.indexOf("from=fx_supplier") >= 0 || window.location.search.indexOf("from=fx_seller") >= 0
        },
        insertFenxiaoInto: function (t) {
            this.isFenxiao() ? t.is_fenxiao = !0 : t.is_fenxiao = !1
        },
        getFenxiaoType: function () {
            return window.location.search.indexOf("type=seller") >= 0 || window.location.search.indexOf("fx_seller") >= 0 || window.location.hash.indexOf("seller") >= 0 ? "seller" : window.location.search.indexOf("type=supplier") >= 0 || window.location.search.indexOf("fx_supplier") >= 0 || window.location.hash.indexOf("supplier") >= 0 ? "supplier" : ""
        },
        getFenxiaoTypeName: function () {
            var t = this.getFenxiaoType();
            return "seller" === t ? "分销商" : "supplier" === t ? "供货商" : ""
        },
        ajax: function (t, n) {
            var s = e.Deferred();
            "object" == typeof t && (n = t, t = void 0), n = i.defaults(n || {}, {dataType: "json"});
            var r, o, a = n.overrideBackboneSync;
            return a && (r = n.success, o = n.error, delete n.success, delete n.error, delete n.overrideBackboneSync), s.xhr = e.ajax(t, n).done(function (t) {
                void 0 !== t.errcode && (t.code = t.errcode, t.msg = t.errmsg), 0 === +t.code ? s.resolve(t.data, t) : void 0 === t.code ? s.resolve(t, t) : s.reject(t.msg, t)
            }).fail(function (t, e) {
                var i = 99999;
                e = e || "网络错误。", "parsererror" === e && (e = window._global.debug ? "JSON Parse Error" : "请求错误，请稍后重试"), "abort" === e && (i = -1), s.reject(e, {
                    code: i,
                    msg: e
                })
            }), a && s.done(function (t) {
                r && r(t)
            }).fail(function (t) {
                o && o(t)
            }), s
        },
        whenAll: function (t) {
            t = i.isArray(t) ? t : [].slice.call(arguments);
            var n = t.length, s = e.Deferred(), r = !1;
            return i.each(t, function (t) {
                t.fail(function () {
                    r = !0
                }).always(function () {
                    n--, 0 === n && (r ? s.reject() : s.resolve())
                })
            }), s.promise()
        },
        validMobile: function (t) {
            return /^((\+86)|(86))?(1)\d{10}$/.test("" + t)
        },
        validPhone: function (t) {
            return /^(\(\d{3,4}\)|\d{3,4}(-|\s)?)?\d{7,8}(-\d{1,4})?$/.test("" + t)
        },
        validPostalCode: function (t) {
            return /^\d{6}$/.test("" + t)
        },
        getFormData: function (t) {
            var i = t.serializeArray(), n = {};
            return e.map(i, function (t) {
                n[t.name] = t.value
            }), n
        },
        focus: function (t) {
            if (t) {
                var i = e(document).scrollLeft(), n = e(document).scrollTop();
                t.focus(), window.scrollTo(i, n)
            }
        },
        highlight: function (t, n) {
            if (2 === arguments.length) {
                var s = e(n), r = !1;
                s.find("a").each(function (n, s) {
                    var o = e(s), a = [];
                    o.attr("href").indexOf(t.params) >= 0 && !r ? (o.parents("li").first().addClass("active"), r = !0) : a.push(o), i.each(a, function (t) {
                        t.parents("li").removeClass("active")
                    })
                })
            }
        },
        parse: function (t, e) {
            if (e = e || {}, 0 === +t.code) {
                if (!i.isFunction(e.success))return t.data;
                e.success(t.data)
            } else {
                if (!i.isFunction(e.fail))return void this.errorNotify(t.msg);
                e.fail(t)
            }
        },
        userAborted: function (t) {
            return 0 === t.status || 0 === t.readyState
        },
        handleAjaxError: function (t) {
            var e = this;
            return function (n) {
                e.userAborted(n) || (t && i.isFunction(t) ? t(n) : e.errorNotify("出错啦，请重试。"))
            }
        },
        getStaticUrl: function (t, n) {
            var s = this;
            if (!i.isUndefined(t))return s.urlData = s.urlData || {}, s._titleMap = s._titleMap || {
                    homepage: "店铺主页",
                    usercenter: "会员主页",
                    history: "历史消息"
                }, s.urlData && s.urlData[t] ? n(s.urlData[t], s._titleMap[t]) : void e.getJSON(window._global.url.www + "/showcase/shop/url.json", {type: t}, function (e) {
                if (0 === +e.code) {
                    var i = s.urlData[t] = e.data.short_url;
                    n(i, s._titleMap[t])
                } else s.errorNotify(e.msg || "出错啦。")
            }).fail(function () {
                s.errorNotify("出错啦")
            })
        },
        onlyNumber: function (t, e) {
            var n = Number(t);
            if (!isNaN(n))return i.isUndefined(e) ? n : n.toFixed(e)
        },
        fetchTemplateData: function (t) {
            if (this._templateData)return this.clearNotify(), t(this._templateData), this._templateData;
            var i = this;
            e.getJSON(window._global.url.www + "/showcase/shop/defaultcategorytag.json", function (e) {
                return 0 === +e.code ? (i._templateData = e.data, i.clearNotify(), t(i._templateData), i._templateData) : void i.errorNotify("获取模板出错，重新试试看。")
            })
        },
        getTemplateData: function () {
            return this._templateData
        },
        myriadNum: function (t, e) {
            return e = e || "W", t > 1e4 ? (t / 1e4).toFixed(1) + e : t
        },
        isRetina: function () {
            return window.devicePixelRatio > 1
        }(),
        getTimestamp: function (t) {
            var e;
            return e = "string" == typeof t ? new Date(t) : "object" == typeof t ? t : new Date, Math.round(e / 1e3)
        },
        wbLength: function (t) {
            var i, n = 0, s = 0;
            if ("string" != typeof t)return !1;
            i = "" === e.trim(t) ? "" : t;
            var r = /http:\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gi;
            return i = i.replace(r, "我是一个超链接占位符"), i = i.replace(/[\x21-\x7f]/gi, function () {
                return s++, ""
            }), n = Math.ceil(i.length + s / 2)
        },
        getSelectedText: function (t) {
            return t ? "INPUT" !== t.tagName && "TEXTAREA" !== t.tagName ? "ERROR: Only Support input & textarea." : window.getSelection ? t.value.substr(t.selectionStart, t.selectionEnd - t.selectionStart) : document.selection.createRange().text : "ERROR: el(input or textarea) is need."
        },
        insertText: function (t, e) {
            if ("INPUT" === t.tagName || "TEXTAREA" === t.tagName)if (document.selection) {
                t.focus();
                var i = document.selection.createRange();
                i.text = e, i.collapse(), i.select()
            } else if (t.selectionStart || "0" == t.selectionStart) {
                var n = t.selectionStart, s = t.selectionEnd;
                t.value = t.value.substring(0, n) + e + t.value.substring(s, t.value.length), t.selectionStart = t.selectionEnd = n + e.length
            } else t.value += e
        },
        fullfillImage: function (t, e) {
            return t ? (e = e || "", t.match(/https?:\/\//i) ? t.match(window._global.url.imgqn) ? t + e : t : window._global.url.imgqn + "/" + t + e) : void 0
        },
        toggleBr: function (t, i) {
            var n = e.trim(t);
            return n ? n = "undefined" == typeof i || i ? n.replace(" ", "<br />") : n.replace("<br />", " ") : !1
        },
        successNotify: function (t, n, s) {
            s = s || {}, !i.isFunction(n) && i.isObject(n) && i.extend(s, n), this.ensureNotifyEle(), e(".js-notifications").notify({
                transition: "fade",
                closable: s.closeable || !1,
                message: t,
                type: "success",
                fadeOut: {enabled: i.isUndefined(s.fade) ? !0 : s.fade, delay: s.delay || 2e3},
                uncloseable: s.uncloseable || !1,
                onClosed: function () {
                    "function" == typeof n && n()
                }
            }).show()
        },
        clearNotify: function () {
            e(".js-notifications").empty(), e(".notify-backdrop").remove()
        },
        ensureNotifyEle: function () {
            e(".js-notifications").length <= 0 && e('<div class="js-notifications notifications"></div>').appendTo("body")
        },
        errorNotify: function (t, i, n) {
            this.ensureNotifyEle(), e(".js-notifications").notify({
                transition: "fade",
                closable: !0,
                message: t,
                type: "error",
                fadeOut: {enabled: n ? !0 : !1, delay: n},
                onClosed: function () {
                    "function" == typeof i && i()
                }
            }).show()
        },
        getParameterByName: function (t, e) {
            t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var i = "[\\?&]" + t + "=([^&#]*)", n = new RegExp(i), s = n.exec(e ? e : window.location.search);
            return null === s ? "" : decodeURIComponent(s[1].replace(/\+/g, " "))
        },
        getCurrentDay: function (t) {
            t = t || new Date;
            var e = t.getMonth() + 1;
            e = 1 === e.toString().length ? "0" + e : e;
            var i = t.getDate();
            return i = 1 === i.toString().length ? "0" + i : i, t.getFullYear() + "-" + e + "-" + i
        },
        getFullTime: function (t) {
            function e(t) {
                return 1 === t.toString().length ? "0" + t : t
            }

            t = t || new Date;
            var i = t.getMonth() + 1;
            i = e(i);
            var n = t.getDate();
            n = e(n);
            var s = t.getHours();
            s = e(s);
            var r = t.getMinutes();
            r = e(r);
            var o = t.getSeconds();
            return o = e(o), t.getFullYear() + "-" + i + "-" + n + " " + s + ":" + r + ":" + o
        },
        toggleButton: function (t, i) {
            var n = e(".form-actions .btn");
            n.each(i ? function () {
                e(this).button("reset")
            } : function () {
                var i = e(this);
                i.button(i.attr("onclick").indexOf(t) >= 0 ? "loading" : "disabling")
            })
        },
        getUrlParam: function (t, e) {
            var i = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"), n = "router" === e ? window.location.href : window.location.search, s = n.substr(1).match(i);
            return null !== s ? window.unescape(s[2]) : null
        },
        editUrlParam: function (t, e, i) {
            var n, s = window.location.href, r = window.location.search;
            if ("" !== r) {
                var o, a, l;
                if (o = r.search(t), -1 != o) {
                    a = r.substr(0, o), l = r.substr(o);
                    var c = l.search("&");
                    -1 != c ? (l = l.substr(c), n = window.location.pathname + a + t + "=" + e + l) : n = window.location.pathname + a + t + "=" + e
                } else n = s + "&" + t + "=" + e
            } else n = s + "?" + t + "=" + e;
            if ("" === e && i) {
                var h, u, d;
                if (h = n.indexOf(t), -1 != h) {
                    u = n.substr(0, h), d = n.substr(h);
                    var p = d.search("&");
                    -1 != p ? (d = d.substr(p + 1), n = u + d) : (u = n.substr(0, h - 1), n = u)
                }
            }
            return n
        },
        isIE6: function () {
            return e.browser.msie && "6.0" == e.browser.version ? !0 : !1
        },
        isIOS: function () {
            var t = /(iPad|iPhone|iPod)/gi;
            return t.test(navigator.userAgent)
        },
        isChrome: function () {
            return -1 !== window.navigator.userAgent.indexOf("Chrome") ? !0 : !1
        },
        trim: function (t) {
            return t.replace(/(^\s*)|(\s*$)/g, "")
        },
        lTrim: function (t) {
            return t.replace(/(^\s*)/g, "")
        },
        rTrim: function (t) {
            return t.replace(/(\s*$)/g, "")
        },
        isNumber: function (t) {
            var e = t.which ? t.which : t.keyCode;
            return 45 != e && 46 != e && 43 != e && e > 31 && (48 > e || e > 57) ? !1 : !0
        },
        getStrLength: function (t) {
            t = e.kdt.util.trim(t);
            var i = t.length;
            return i
        },
        calculateStrLength: function (t) {
            for (var e = 0, i = 0; i < t.length; i++)t.charCodeAt(i) > 255 ? e += 3 : e++;
            return e
        },
        substring4ChAndEn: function (t, i) {
            for (var n = t.substring(0, 2 * i); e.kdt.util.getStrLength(n) > i;)n = n.substring(0, n.length - 1);
            return n
        },
        ellipse: function (t, i) {
            var n = 2 * e.kdt.util.getStrLength(t) > i;
            return t && n ? t.replace(new RegExp("([\\s\\S]{" + i + "})[\\s\\S]*"), "$1...") : t
        },
        isEmpty: function (t) {
            return "" !== e.trim(t) ? !1 : !0
        },
        urlCheck: function (t) {
            return -1 == t.indexOf("://") ? "http://" + t : t
        },
        AddZero: function (t) {
            return t >= 0 && 10 > t ? "0" + t : t + ""
        },
        twoDecimal: function (t) {
            return isNaN(t) ? t : Number(t).toFixed(2)
        },
        transEntity: function (t) {
            return t.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"')
        },
        countdown: function (t, i, n) {
            e(t).text(i), --i >= 0 ? setTimeout(function () {
                e.kdt.countdown(t, i, n)
            }, 1e3) : n()
        },
        str_replace: function (t, e, i, n) {
            var s = 0, r = 0, o = "", a = "", l = 0, c = 0, h = [].concat(t), u = [].concat(e), d = i, p = "[object Array]" === Object.prototype.toString.call(u), f = "[object Array]" === Object.prototype.toString.call(d);
            for (d = [].concat(d), n && (this.window[n] = 0), s = 0, l = d.length; l > s; s++)if ("" !== d[s])for (r = 0, c = h.length; c > r; r++)o = d[s] + "", a = p ? void 0 !== u[r] ? u[r] : "" : u[0], d[s] = o.split(h[r]).join(a), n && d[s] !== o && (this.window[n] += (o.length - d[s].length) / h[r].length);
            return f ? d : d[0]
        },
        addParameter: function (t, i) {
            var n = t.split("#");
            t = n[0];
            for (var s in i)if (i.hasOwnProperty(s)) {
                if ("" === e.trim(i[s]))continue;
                if (t.indexOf("?") < 0)t += "?" + e.trim(s) + "=" + e.trim(i[s]); else {
                    var r = {}, o = t.split("?");
                    e.each(o[1].split("&"), function (t, i) {
                        var n = i.split("=");
                        "" !== e.trim(n[1]) && (r[n[0]] = n[1])
                    }), e.each(i, function (t, i) {
                        "" !== e.trim(i) && (r[t] = i)
                    });
                    var a = [];
                    e.each(r, function (t, e) {
                        a.push(t + "=" + e)
                    }), t = o[0] + "?" + a.join("&")
                }
            }
            return 2 === n.length && (t += "#" + n[1]), t
        },
        deparam: function (t) {
            var i = {};
            return t ? (t = t.replace(/\|[^:]+:/gi, "&"), e.each(t.replace(/\+/g, " ").split("&"), function (t, n) {
                var s = n.split("="), r = decodeURIComponent(s[0]);
                if (!r)return i;
                var o = decodeURIComponent(s[1] || ""), a = r.split("]["), l = a.length - 1, c = 0, h = i;
                if (a[0].indexOf("[") >= 0 && /\]$/.test(a[l]) ? (a[l] = a[l].replace(/\]$/, ""), a = a.shift().split("[").concat(a), l++) : l = 0, l)for (; l >= c; c++)r = "" !== a[c] ? a[c] : h.length, l > c ? h = h[r] = h[r] || (isNaN(a[c + 1]) ? {} : []) : h[r] = o; else e.isArray(i[r]) ? i[r].push(o) : r in i ? i[r] = [i[r], o] : i[r] = o
            }), i) : i
        },
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        },
        navActive: function (t, i) {
            var n = e(".ui-nav");
            if (n.length > 0)return e("li.active", n).removeClass("active"), void e(t).addClass("active");
            var s = e.extend(i, {navBlock: ".third-nav__links"});
            e(s.navBlock).children("li.active").removeClass("active"), t && e(t).addClass("active")
        },
        sidebarNavActive: function (t) {
            var i = e("aside.ui-sidebar");
            i.find("li.active").removeClass("active"), e(t).addClass("active")
        },
        rgb2hex: function (t) {
            function e(t) {
                return ("0" + parseInt(t, 10).toString(16)).slice(-2)
            }

            return t = t.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/), "#" + e(t[1]) + e(t[2]) + e(t[3])
        },
        fixedButton: function (t, n) {
            var s = e(".app-design .app-actions .form-actions"), r = e(".app-design .pin"), o = function () {
                var t = e(window).scrollTop() + e(window).height(), i = r.offset().top + r.outerHeight() + 80;
                if (t > i)s.css({position: "static"}); else {
                    var n;
                    n = e(".js-notify .alert").length > 0 && "block" === e(".js-notify").css("display") ? e(window).height() - e(".js-notify").position().top : 0, s.css({
                        position: "fixed",
                        bottom: n,
                        width: "850px",
                        boxSizing: "border-box",
                        zIndex: 100
                    })
                }
            };
            o(), t.listenTo(n, "done", function () {
                o()
            });
            var a = i.throttle(o, 100);
            s.length > 0 && window.addEventListener("scroll", a, !1)
        },
        REG: {
            url: /^(https?|ftp|weixin):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
            tel: /^(tel|callto):\/\/[-\s\d,]+$/i
        },
        ANIMITION_END: "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
        Cache: {},
        updateModel: function (t) {
            var n, s, r, o, a, l, c = e(t.target), h = this;
            if (h.model && (r = (c.attr("name") || "").split("[")[0])) {
                if (n = (c.attr("type") || "").toLowerCase(), o = "checkbox" === n ? c.prop("checked") : "radio" === n ? h.$("[name=" + c.attr("name") + "]:checked").val() : c.val(), s = (c.data("type") || "").toLowerCase(), s = s || ("checkbox" === n ? "number" : "string"), s = s.substring(0, 1).toUpperCase() + s.substring(1), a = t.target && t.target.tagName.toLowerCase(), "select" === a && (l = !!c.attr("multiple")), i.isFunction(window[s]) && ("select" === a && l ? null !== o && (o = i.map(o, function (t) {
                        return window[s](t)
                    })) : o = window[s](o)), this.model.set(r, o, {validate: !1}), this.model.validate && "no" !== c.data("validate")) {
                    var u = {};
                    u[r] = o, this.model.validate(u)
                }
                t.stopPropagation()
            }
        },
        handleScroll: function (t) {
            var i, n, s, r = e(t.currentTarget);
            return i = -(null != (n = t.originalEvent) ? n.wheelDelta : void 0) || (null != (s = t.originialEvent) ? s.detail : void 0), null != i ? (t.preventDefault(), "DOMMouseScroll" === t.type && (i = 40 * i), r.scrollTop(i + r.scrollTop())) : void 0
        },
        checkIdentifyCard: function (t) {
            function e(t) {
                if (!/\d{17}[\dxX]/.test(t))return !1;
                for (var e = function (t, e, i) {
                    return (e + i - t % e) % e
                }, i = function (t, e) {
                    return t * (Math.pow(2, e - 1) % 11)
                }, n = 0, s = 0; 17 > s; s++)n += i(+t.charAt(s), 18 - s);
                var r = t.charAt(17), o = e(n, 11, 1);
                return r - o === 0 || "x" === r.toLowerCase() && 10 === o
            }

            function i(t) {
                var e, i, n, s, r, o = /[1-9]\d{5}(\d{2})(\d{2})(\d{2})\d{3}/;
                return e = t.match(o), null == e ? !1 : (i = +("19" + e[1]), n = +e[2], s = +e[3], r = new Date(i, n - 1, s), r.getFullYear() === i && r.getMonth() === n - 1 && r.getDate() === s)
            }

            return e(t) || i(t)
        },
        decimalFix: function (t, e) {
            if (!t)return "";
            var n = Number(t);
            return isNaN(n) ? n : i.isUndefined(e) ? n : n.toFixed(e)
        },
        deepCopy: function (t) {
            return JSON.parse(JSON.stringify(t))
        }
    }
}), define("components/delay_hover/com", ["require", "jquery", "underscore"], function (t) {
    var e = t("jquery"), i = t("underscore"), n = {
        initialize: function (t) {
            var i = e.extend({}, {
                eventType: "hover",
                contentElem: "",
                showDelayTime: 200,
                hideDelayTime: 200,
                destroyPop: !0,
                targetElem: "",
                popElem: "",
                showCallback: null,
                hideCallback: null
            }, t);
            this.timeout = null, this.outPop = !0, this.outTarget = !0, this.events(i)
        }, events: function (t) {
            var i = this;
            "hover" === t.eventType ? (e("body").on("mouseover", t.targetElem, function () {
                i.showPop(t)
            }).on("mouseout", t.targetElem, function () {
                clearTimeout(i.timeout), i.outTarget = !0, i.hidePop(t)
            }), e("body").on("mouseover", t.popElem, function () {
                i.outPop = !1
            }).on("mouseout", t.popElem, function () {
                clearTimeout(i.timeout), i.outPop = !0, i.hidePop(t)
            })) : "click" === t.eventType && (e("body").on("click", t.targetElem, function (e) {
                i.showPopFn(t), e.stopPropagation()
            }), e("body").on("click", t.contentElem, function (t) {
                t.stopPropagation()
            }), e("body").on("click", function () {
                i.hidePopFn(t)
            }))
        }, showPop: function (t) {
            var e = this;
            e.outTarget = !1, e.timeout && clearTimeout(e.timeout), e.timeout = setTimeout(function () {
                e.showPopFn(t)
            }, t.showDelayTime)
        }, showPopFn: function (t) {
            i.isFunction(t.showCallback) && t.showCallback(), t.destroyPop && e(t.popElem).remove()
        }, hidePop: function (t) {
            var e = this;
            e.timeout = setTimeout(function () {
                e.outTarget && e.outPop && e.hidePopFn(t)
            }, t.hideDelayTime)
        }, hidePopFn: function (t) {
            i.isFunction(t.hideCallback) ? t.hideCallback() : e(t.popElem).hide()
        }
    };
    return function (t) {
        n.initialize(t)
    }
}), define("text", {
    load: function (t) {
        throw new Error("Dynamic load not allowed: " + t)
    }
}), define("text!components/page_help/templates/help.html", [], function () {
    return '<% if (templateType === \'btn\') { %>\n    <div id="js-page-help-open-btn" class="ui-page-help-open-btn">\n        帮助\n    </div>\n<% } else if (templateType === \'content\') { %>\n    <div id="js-page-help-container" class="ui-page-help-container">\n        <div class="js-page-help-content ui-page-help-content loading">\n        </div>\n        <div class="js-page-help-btn-action ui-page-help-btn-action">\n            <a href="<%= _global.url.www %>/service" class="ui-btn ui-btn-primary" target="_blank">进入帮助中心</a>\n            <a href="<%= _global.url.bbs %>/forum.php?mod=viewthread&tid=51125" class="ui-btn ui-btn-default" target="_blank" style="width:72px">建议反馈</a>\n            <!-- <a class="ui-btn" target="_blank" href="http://help.im.koudaitong.com">在线客服</a> -->\n            <% if (_global.kdt_id === 1) { %>\n                <a href="<%= _global.url.cp %>/tools/help/edit?id=<%= pageId %>" target="_blank" class="ui-page-help-edit">编辑</a>\n            <% } %>\n        </div>\n    </div>\n<% } %>\n'
}), define("components/page_help/config", [], function () {
    return {
        index_dashboard: "index_dashboard",
        weixin_dashboard: "weixin_dashboard",
        weixin_message: "messages_my",
        weixin_history: "weixin_history",
        messages_multiple: "messages_multiple_txt",
        messages_history: "messages_history_list",
        messages_multiple_delay: "messages_multiple_list",
        weixin_news_list: "news_list",
        weixin_news_create_1: "news_create_1",
        weixin_news_create_0: "news_create_0",
        autoreply_normal: "autoreply_normal",
        autoreply_default: "autoreply_default",
        autoreply_hosting: "autoreply_hosting",
        autoreply_activity: "autoreply_index_activity",
        autoreply_tail: "autoreply_index_tail",
        autoreply_scan: "autoreply_scan",
        shop_menu: "shop_menu_edit",
        sinaweibo_not_verify: "sinaweibo_not_verify",
        sinaweibo_timeline_index: "sinaweibo_timeline_index",
        sinaweibo_timeline_my: "sinaweibo_timeline_my",
        sinaweibo_timeline_byme: "sinaweibo_timeline_byme",
        sinaweibo_timeline_tome: "sinaweibo_timeline_tome",
        sinaweibo_timeline_mentions: "sinaweibo_timeline_mentions",
        sinaweibo_timeline_subscribe: "sinaweibo_timeline_subscribe",
        sinaweibo_message: "sinaweibo_message",
        sinaweibo_autoreply: "sinaweibo_autoreply",
        sinaweibo_articles: "sinaweibo_articles",
        sinaweibo_schedule: "sinaweibo_schedule",
        sinaweibo_autoreply_concerned: "sinaweibo_autoreply_concerned",
        sinaweibo_autoreply_at: "sinaweibo_autoreply_at",
        fans_dashboard: "fans_dashboard",
        fans_level: "fans_rule_index_level",
        fans_tag: "fans_rule_index_tag",
        fans_points_rule: "fans_rule_index_points",
        fans_search_basic: "fans_search_basic",
        fans_search_level: "fans_search_level",
        fans_search_behavior: "fans_search_behavior",
        fans_third: "fans_third",
        fans_cards_card_list: "fans_cards_card_list",
        fans_cards_get_list: "fans_cards_get_list",
        fans_cards_logout_list: "fans_cards_logout_list",
        fans_cards_create: "fans_cards_create",
        showcase_dashboard: "showcase_dashboard",
        showcase_feature: "feature_list",
        showcase_feature_create: "feature_create",
        showcase_category: "category_list",
        showcase_category_create: "category_create",
        showcase_homepage: "shop_homepage_edit",
        showcase_homepage_my_url: "showcase_homepage_my_url",
        showcase_homepage_list: "shop_homepage_list",
        showcase_usercenter: "shop_center_edit",
        showcase_shopnav: "shopnav",
        showcase_ad: "showcase_ad",
        showcase_component: "component_list",
        showcase_component_create: "component_create",
        showcase_homepage_domain: "shop_homepage_domain",
        showcase_attachment: "attachment_my_all",
        showcase_goods: "goods_list_on",
        showcase_goods_create: "goods_create",
        showcase_tag: "tag_list",
        showcase_tag_create: "tag_create",
        showcase_material: "material_list",
        showcase_paipai: "showcase_paipai",
        trade_dashboard: "trade_dashboard",
        trade_order_all: "order_normal",
        trade_order_complain: "order_complain",
        trade_order_selffetch: "trade_order_selffetch",
        trade_order_star: "trade_order_star",
        trade_order_gift: "trade_order_gift",
        trade_order_codpay: "trade_order_codpay",
        trade_order_peerpay: "trade_order_peerpay",
        trade_order_detail: "trade_order_detail",
        trade_sub_order: "trade_sub_order",
        trade_paipai_order_detail: "trade_paipai_order_detail",
        trade_paipai_order_list: "trade_paipai_order_list",
        trade_freight: "trade_freight",
        trade_setting: "trade_setting",
        trade_selffetch: "trade_selffetch",
        trade_gift: "trade_gift",
        trade_peerpay: "trade_peerpay",
        trade_settlement_income: "trade_settlement_income",
        trade_settlement_withdrawal: "trade_settlement_withdrawal",
        trade_settlement_inoutdetail: "trade_settlement_inoutdetail",
        trade_settlement_withdrawallog: "trade_settlement_withdrawallog",
        trade_settlement_freeze: "trade_settlement_freeze",
        trade_settlement_waitsettled: "trade_settlement_waitsettled",
        trade_unionpay_withdraw: "trade_unionpay_withdraw",
        trade_unionpay_inoutdetail: "trade_unionpay_inoutdetail",
        trade_unionpay_withdrawlog: "trade_unionpay_withdrawlog",
        trade_wish_list: "trade_wish_list",
        ump_dashboard: "ump_dashboard",
        ump_coupon: "ump_coupon",
        apps_open_api: "apps_open_api",
        apps_third: "apps_third",
        apps_checkin: "apps_checkin",
        apps_vote_create: "apps_vote_create",
        apps_goods_search: "autoreply_index_search",
        apps_cards: "apps_cards",
        apps_wheel: "apps_wheel",
        apps_crazy_guess: "activity_list_type_7",
        apps_zodiac: "activity_list_type_4",
        apps_random: "activity_list_type_6",
        apps_directseller: "apps_directseller",
        stat_dashboard: "stat_dashboard",
        stat_fans_count: "stat_fans_count",
        stat_layer: "stat_layer",
        stat_baseinfo: "stat_baseinfo",
        stat_behavior: "stat_behavior",
        stat_interact: "stat_interact",
        stat_multiple: "stat_multiple",
        stat_pagedata: "stat_pagedata",
        stat_pagerank: "stat_pagerank",
        stat_pvperday: "stat_pvperday",
        stat_goods: "stat_goods",
        stat_order: "stat_order",
        stat_qrcode: "stat_qrcode",
        setting_store: "setting_store",
        setting_weixin: "setting_weixin",
        setting_weibo: "setting_weibo",
        setting_admin: "setting_admin",
        setting_team: "setting_team",
        setting_payment: "setting_payment_",
        setting_payment_wxpay: "setting_payment_wxpay",
        setting_payment_alipay: "setting_payment_alipay",
        setting_payment_umpay: "setting_payment_umpay",
        setting_payment_cod: "setting_payment_cod",
        task_team: "task_team",
        ump_present_create: "ump_present_create",
        ump_present_list: "ump_present_list",
        ump_cashback_list: "ump_cashback_list",
        ump_cashback_create: "ump_cashback_create",
        ump_tuan_create: "ump_tuan_create",
        ump_tuan_list: "ump_tuan_list",
        ump_reward_create: "ump_reward_create",
        ump_reward_list: "ump_reward_list",
        ump_tradeincard: "ump_tradeincard",
        ump_treasurecard: "ump_treasurecard",
        ump_promocode: "ump_promocode",
        cashier_list_help: "cashier_list_help",
        ump_auction_create: "ump_auction_create",
        ump_auction_list: "ump_auction_list",
        ump_auction_buyers: "ump_auction_buyers"
    }
}), define("components/page_help/help", ["require", "jquery", "underscore", "components/delay_hover/com", "text!components/page_help/templates/help.html", "components/page_help/config"], function (t) {
    var e = t("jquery"), i = t("underscore"), n = t("components/delay_hover/com"), s = t("text!components/page_help/templates/help.html"), r = t("components/page_help/config"), o = {
        showBtn: "#js-page-help-open-btn",
        helpWrap: "#js-page-help-container",
        helpContent: "#js-page-help-container .js-page-help-content",
        helpBtnWrap: "#js-page-help-container .js-page-help-btn-action"
    }, a = {
        init: function (t) {
            return this.pageId = t, t ? (0 === e(o.showBtn).size() && this.appendBtn(), e(o.helpWrap).size() > 0 && e(o.helpWrap).remove(), this.appendContent(), this.events(), void this.fetch(this.pageId)) : (e(o.showBtn).remove(), void e(o.helpWrap).remove())
        }, appendBtn: function () {
            e("body").append(i.template(s, {templateType: "btn"}))
        }, appendContent: function () {
            e("body").append(i.template(s, {templateType: "content", pageId: this.pageId}))
        }, fetch: function (t) {
            var i = this, n = window._global.url.www + "/common/pagehelp/help", s = "本页面暂时没有帮助。", r = "";
            e.get(n, {id: t}, function (t) {
                r = t || s, e(o.helpContent).removeClass("loading").html(r), i.helpSize(), i.renderLink()
            })
        }, events: function () {
            var t = this;
            n({
                eventType: "click",
                contentElem: o.helpWrap,
                destroyPop: !1,
                targetElem: o.showBtn,
                popElem: o.helpWrap,
                showCallback: function () {
                    t.showHelp()
                },
                hideCallback: function () {
                    t.hideHelp()
                }
            }), e(window).on("resize", function () {
                t.helpSize()
            })
        }, hideHelp: function () {
            e(o.helpWrap).animate({right: -320}, 200)
        }, showHelp: function () {
            e(o.helpWrap).animate({right: 0}, 200)
        }, renderLink: function () {
            e("a", e(o.helpContent)).attr("target", "_blank")
        }, helpSize: function () {
            e(o.helpContent).css({height: "100%"});
            var t = e(o.helpWrap).outerHeight(), i = e(o.helpBtnWrap).outerHeight() + 40, n = e(window).height() - 40, s = t >= n ? n - i : t - i;
            e(o.helpContent).css({height: s}), e(o.helpWrap).css({"margin-bottom": -(s / 2) - 23})
        }
    };
    return function (t, i) {
        var n = r[t], s = e.extend({hasPageHelp: !0}, i);
        s.hasPageHelp && e(function () {
            a.init(n)
        })
    }
}), function (t) {
    "object" == typeof exports ? module.exports = t(require("backbone"), require("underscore")) : "function" == typeof define && define.amd && define("backboneValidate", ["backbone", "underscore"], t)
}(function (t, e) {
    return t.Validation = function (e) {
        var i = {
            forceUpdate: !1,
            selector: "name",
            labelFormatter: "sentenceCase",
            valid: Function.prototype,
            invalid: Function.prototype
        }, n = {
            formatLabel: function (t, e) {
                return c[i.labelFormatter](t, e)
            }, format: function () {
                var t = Array.prototype.slice.call(arguments), e = t.shift();
                return e.replace(/\{(\d+)\}/g, function (e, i) {
                    return "undefined" != typeof t[i] ? t[i] : e
                })
            }
        }, s = function (i, n, r) {
            return n = n || {}, r = r || "", e.each(i, function (e, o) {
                i.hasOwnProperty(o) && (e && "object" == typeof e && !(e instanceof Array || e instanceof Date || e instanceof RegExp || e instanceof t.Model || e instanceof t.Collection) ? s(e, n, r + o + ".") : n[r + o] = e)
            }), n
        }, r = function () {
            var t = function (t) {
                return e.reduce(e.keys(t.validation || {}), function (t, e) {
                    return t[e] = void 0, t
                }, {})
            }, r = function (t, i) {
                var n = t.validation ? t.validation[i] || {} : {};
                return (e.isFunction(n) || e.isString(n)) && (n = {fn: n}), e.isArray(n) || (n = [n]), e.reduce(n, function (t, i) {
                    return e.each(e.without(e.keys(i), "msg"), function (e) {
                        t.push({fn: h[e], val: i[e], msg: i.msg})
                    }), t
                }, [])
            }, a = function (t, i, s, o) {
                return e.reduce(r(t, i), function (r, a) {
                    var l = e.extend({}, n, h), c = a.fn.call(l, s, i, a.val, t, o);
                    return c === !1 || r === !1 ? !1 : c && !r ? a.msg || c : r
                }, "")
            }, l = function (t, i) {
                var n, r = {}, o = !0, l = e.clone(i), c = s(i);
                return e.each(c, function (e, i) {
                    n = a(t, i, e, l), n && (r[i] = n, o = !1)
                }), {invalidAttrs: r, isValid: o}
            }, c = function (i, n) {
                return {
                    preValidate: function (t, i) {
                        return a(this, t, i, e.extend({}, this.attributes))
                    }, isValid: function (t) {
                        var i = s(this.attributes);
                        return e.isString(t) ? !a(this, t, i[t], e.extend({}, this.attributes)) : e.isArray(t) ? e.reduce(t, function (t, n) {
                            return t && !a(this, n, i[n], e.extend({}, this.attributes))
                        }, !0, this) : (t === !0 && this.validate(), this.validation ? this._isValid : !0)
                    }, validate: function (r, o) {
                        var a = this, c = !r, h = e.extend({}, n, o), u = t(a), d = e.extend({}, u, a.attributes, r), p = s(r || d), f = l(a, d);
                        return a._isValid = f.isValid, e.each(u, function (t, e) {
                            var n = f.invalidAttrs.hasOwnProperty(e);
                            n || h.valid(i, e, h.selector)
                        }), e.each(u, function (t, e) {
                            var n = f.invalidAttrs.hasOwnProperty(e), s = p.hasOwnProperty(e);
                            n && (s || c) && h.invalid(i, e, f.invalidAttrs[e], h.selector)
                        }), e.defer(function () {
                            a.trigger("validated", a._isValid, a, f.invalidAttrs), a.trigger("validated:" + (a._isValid ? "valid" : "invalid"), a, f.invalidAttrs)
                        }), !h.forceUpdate && e.intersection(e.keys(f.invalidAttrs), e.keys(p)).length > 0 ? f.invalidAttrs : void 0
                    }
                }
            }, u = function (t, i, n) {
                e.extend(i, c(t, n))
            }, d = function (t) {
                delete t.validate, delete t.preValidate, delete t.isValid
            }, p = function (t) {
                u(this.view, t, this.options)
            }, f = function (t) {
                d(t)
            };
            return {
                version: "0.8.0", configure: function (t) {
                    e.extend(i, t)
                }, bind: function (t, n) {
                    var s = t.model, r = t.collection;
                    if (n = e.extend({}, i, o, n), "undefined" == typeof s && "undefined" == typeof r)throw"Before you execute the binding your view must have a model or a collection.\nSee http://thedersen.com/projects/backbone-validation/#using-form-model-validation for more information.";
                    s ? u(t, s, n) : r && (r.each(function (e) {
                        u(t, e, n)
                    }), r.bind("add", p, {view: t, options: n}), r.bind("remove", f))
                }, unbind: function (t) {
                    var e = t.model, i = t.collection;
                    e && d(t.model), i && (i.each(function (t) {
                        d(t)
                    }), i.unbind("add", p), i.unbind("remove", f))
                }, mixin: c(null, i)
            }
        }(), o = r.callbacks = {
            valid: function (t, e, i) {
                t.$("[" + i + '~="' + e + '"]').removeClass("invalid").removeAttr("data-error")
            }, invalid: function (t, e, i, n) {
                t.$("[" + n + '~="' + e + '"]').addClass("invalid").attr("data-error", i)
            }
        }, a = r.patterns = {
            digits: /^\d+$/,
            number: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,
            email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
            url: /^(https?|ftp|weixin):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
        }, l = r.messages = {
            required: "{0} is required",
            acceptance: "{0} must be accepted",
            min: "{0} must be greater than or equal to {1}",
            max: "{0} must be less than or equal to {1}",
            range: "{0} must be between {1} and {2}",
            length: "{0} must be {1} characters",
            minLength: "{0} must be at least {1} characters",
            maxLength: "{0} must be at most {1} characters",
            rangeLength: "{0} must be between {1} and {2} characters",
            oneOf: "{0} must be one of: {1}",
            equalTo: "{0} must be the same as {1}",
            pattern: "{0} must be a valid {1}"
        }, c = r.labelFormatters = {
            none: function (t) {
                return t
            }, sentenceCase: function (t) {
                return t.replace(/(?:^\w|[A-Z]|\b\w)/g, function (t, e) {
                    return 0 === e ? t.toUpperCase() : " " + t.toLowerCase()
                }).replace("_", " ")
            }, label: function (t, e) {
                return e.labels && e.labels[t] || c.sentenceCase(t, e)
            }
        }, h = r.validators = function () {
            var t = String.prototype.trim ? function (t) {
                return null === t ? "" : String.prototype.trim.call(t)
            } : function (t) {
                var e = /^\s+/, i = /\s+$/;
                return null === t ? "" : t.toString().replace(e, "").replace(i, "")
            }, i = function (t) {
                return e.isNumber(t) || e.isString(t) && t.match(a.number)
            }, n = function (i) {
                return !(e.isNull(i) || e.isUndefined(i) || e.isString(i) && "" === t(i) || e.isArray(i) && e.isEmpty(i))
            };
            return {
                fn: function (t, i, n, s, r) {
                    return e.isString(n) && (n = s[n]), n.call(s, t, i, r)
                }, required: function (t, i, s, r, o) {
                    var a = e.isFunction(s) ? s.call(r, t, i, o) : s;
                    return a || n(t) ? a && !n(t) ? this.format(l.required, this.formatLabel(i, r)) : void 0 : !1
                }, acceptance: function (t, i, n, s) {
                    return "true" === t || e.isBoolean(t) && t !== !1 ? void 0 : this.format(l.acceptance, this.formatLabel(i, s))
                }, min: function (t, e, n, s) {
                    return !i(t) || n > t ? this.format(l.min, this.formatLabel(e, s), n) : void 0
                }, max: function (t, e, n, s) {
                    return !i(t) || t > n ? this.format(l.max, this.formatLabel(e, s), n) : void 0
                }, range: function (t, e, n, s) {
                    return !i(t) || t < n[0] || t > n[1] ? this.format(l.range, this.formatLabel(e, s), n[0], n[1]) : void 0
                }, length: function (e, i, s, r) {
                    return n(e) && t(e).length === s ? void 0 : this.format(l.length, this.formatLabel(i, r), s)
                }, minLength: function (e, i, s, r) {
                    return !n(e) || t(e).length < s ? this.format(l.minLength, this.formatLabel(i, r), s) : void 0
                }, maxLength: function (e, i, s, r) {
                    return !n(e) || t(e).length > s ? this.format(l.maxLength, this.formatLabel(i, r), s) : void 0
                }, rangeLength: function (e, i, s, r) {
                    return !n(e) || t(e).length < s[0] || t(e).length > s[1] ? this.format(l.rangeLength, this.formatLabel(i, r), s[0], s[1]) : void 0
                }, oneOf: function (t, i, n, s) {
                    return e.include(n, t) ? void 0 : this.format(l.oneOf, this.formatLabel(i, s), n.join(", "))
                }, equalTo: function (t, e, i, n, s) {
                    return t !== s[i] ? this.format(l.equalTo, this.formatLabel(e, n), this.formatLabel(i, n)) : void 0
                }, pattern: function (t, e, i, s) {
                    return n(t) && t.toString().match(a[i] || i) ? void 0 : this.format(l.pattern, this.formatLabel(e, s), i)
                }
            }
        }();
        return r
    }(e), t.Validation
}), define("core/event", ["backbone.wreqr"], function (t) {
    return window.NC ? window.NC : (window.NC = new Backbone.Wreqr.EventAggregator, window.NC)
}), define("components/backtop/1.0.0/backtop", ["require", "jquery", "underscore"], function (t) {
    function e() {
        i(window).scrollTop() > 150 ? s.parent().removeClass("hide") : s.parent().addClass("hide")
    }

    var i = t("jquery"), n = t("underscore"), s = i(".js-back-to-top");
    s.length <= 0 || (i(window).on("scroll", n.throttle(e, 100)), s.on("click", function (t) {
        window.scrollTo(0, 0), t.preventDefault(), t.stopPropagation()
    }))
}), define("components/float_service/1.0.0/main", ["require", "jquery", "underscore"], function (t) {
    function e() {
        n.toggleClass("float-service-thumb", i(this).width() < 1220)
    }

    var i = t("jquery"), n = (t("underscore"), i(".float-service-wrap"));
    n.length && (i(window).on("resize", e), e(), n.delegate(".float-service-close", "click", function () {
        i(window).unbind("resize", e), n.remove()
    }))
}), define("core/auth", ["require", "jquery", "core/utils"], function (t) {
    var e = t("jquery"), i = t("core/utils");
    e(document).on("click", ".js-no-auth", function (t) {
        t.preventDefault();
        var n = e(t.target).attr("data-err-msg");
        i.errorNotify(n ? n : "客服账号没有操作权限。如有问题，请联系店铺高级管理员。")
    })
}), define("components/spider/ui/btn", ["require", "jquery"], function (t) {
    var e = t("jquery"), i = function (t, n) {
        this.$element = e(t), this.options = e.extend({}, i.DEFAULTS, n)
    };
    i.DEFAULTS = {loadingText: "保存中..."}, i.prototype.setState = function (t) {
        var e = "disabled", i = this.$element, n = i.is("input") ? "val" : "html", s = i.data();
        t += "Text", s.resetText || i.data("resetText", i[n]()), i[n](s[t] || this.options[t]), setTimeout(function () {
            "loadingText" == t ? i.addClass("ui-btn-" + e).attr(e, e) : i.removeClass("ui-btn-" + e).removeAttr(e)
        }, 0)
    }, i.prototype.toggle = function () {
        var t = this.$element.closest('[data-toggle="buttons"]'), e = !0;
        if (t.length) {
            var i = this.$element.find("input");
            "radio" === i.prop("type") && (i.prop("checked") && this.$element.hasClass("active") ? e = !1 : t.find(".active").removeClass("active")), e && i.prop("checked", !this.$element.hasClass("active")).trigger("change")
        }
        e && this.$element.toggleClass("active")
    };
    var n = e.fn.btn;
    e.fn.btn = function (t) {
        return this.each(function () {
            var n = e(this), s = n.data("kdt.btn"), r = "object" == typeof t && t;
            s || n.data("kdt.btn", s = new i(this, r)), "toggle" == t ? s.toggle() : t && s.setState(t)
        })
    }, e.fn.btn.Constructor = i, e.fn.btn.noConflict = function () {
        return e.fn.btn = n, this
    }, e(document).on("click.kdt.btn.data-api", "[data-toggle^=button]", function (t) {
        var i = e(t.target);
        i.hasClass("ui-btn") || (i = i.closest(".ui-btn")), i.button("toggle"), t.preventDefault()
    })
}), define("components/spider/ui/switcher", ["require", "jquery"], function (t) {
    var e = t("jquery"), i = "disabled", n = "ui-switcher", s = "ui-switcher-", r = s + "on", o = s + "off", a = s + i, l = s + "loading", c = function (t) {
        this.$el = e(t), this.$el.addClass(n)
    };
    c.prototype.val = function () {
        return this.$el.hasClass(r)
    }, c.prototype.setState = function (t) {
        var e = s + t;
        this.$el.removeClass(r).removeClass(o).addClass(e)
    }, c.prototype.on = function () {
        this.setState("on")
    }, c.prototype.off = function () {
        this.setState("off")
    }, c.prototype.toggle = function () {
        this.val() ? this.off() : this.on()
    }, c.prototype.loading = function () {
        this.$el.addClass(l).addClass(a).attr(i, i)
    }, c.prototype.reset = function () {
        this.$el.removeClass(l).removeClass(a).removeAttr(i)
    }, e.fn.switcher = function (t) {
        return "val" === t ? this.hasClass(r) : this.each(function () {
            var i = e(this), n = i.data("kdt.switcher");
            n || (n = new c(i), i.data("kdt.switcher", n)), n[t] ? n[t]() : n.setState(t)
        })
    }, e.fn["switch"] = e.fn.switcher
}), define("components/spider/spider", ["require", "jquery", "components/spider/ui/btn", "components/spider/ui/switcher"], function (t) {
    var e = t("jquery");
    return t("components/spider/ui/btn"), t("components/spider/ui/switcher"), e
}), function () {
    var t, e, i, n, s, r = {}.hasOwnProperty, o = function (t, e) {
        function i() {
            this.constructor = t
        }

        for (var n in e)r.call(e, n) && (t[n] = e[n]);
        return i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype, t
    };
    n = function () {
        function t() {
            this.options_index = 0, this.parsed = []
        }

        return t.prototype.add_node = function (t) {
            return "OPTGROUP" === t.nodeName.toUpperCase() ? this.add_group(t) : this.add_option(t)
        }, t.prototype.add_group = function (t) {
            var e, i, n, s, r, o;
            for (e = this.parsed.length, this.parsed.push({
                array_index: e,
                group: !0,
                label: this.escapeExpression(t.label),
                children: 0,
                disabled: t.disabled
            }), r = t.childNodes, o = [], n = 0, s = r.length; s > n; n++)i = r[n], o.push(this.add_option(i, e, t.disabled));
            return o
        }, t.prototype.add_option = function (t, e, i) {
            return "OPTION" === t.nodeName.toUpperCase() ? ("" !== t.text ? (null != e && (this.parsed[e].children += 1), this.parsed.push({
                array_index: this.parsed.length,
                options_index: this.options_index,
                value: t.value,
                text: t.text,
                html: t.innerHTML,
                selected: t.selected,
                disabled: i === !0 ? i : t.disabled,
                group_array_index: e,
                classes: t.className,
                style: t.style.cssText
            })) : this.parsed.push({
                array_index: this.parsed.length,
                options_index: this.options_index,
                empty: !0
            }), this.options_index += 1) : void 0
        }, t.prototype.escapeExpression = function (t) {
            var e, i;
            return null == t || t === !1 ? "" : /[\&\<\>\"\'\`]/.test(t) ? (e = {
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            }, i = /&(?!\w+;)|[\<\>\"\'\`]/g, t.replace(i, function (t) {
                return e[t] || "&amp;"
            })) : t
        }, t
    }(), n.select_to_array = function (t) {
        var e, i, s, r, o;
        for (i = new n, o = t.childNodes, s = 0, r = o.length; r > s; s++)e = o[s], i.add_node(e);
        return i.parsed
    }, e = function () {
        function t(e, i) {
            this.form_field = e, this.options = null != i ? i : {}, t.browser_is_supported() && (this.is_multiple = this.form_field.multiple, this.set_default_text(), this.set_default_values(),
                this.setup(), this.set_up_html(), this.register_observers())
        }

        return t.prototype.set_default_values = function () {
            var t = this;
            return this.click_test_action = function (e) {
                return t.test_active_click(e)
            }, this.activate_action = function (e) {
                return t.activate_field(e)
            }, this.active_field = !1, this.mouse_on_container = !1, this.results_showing = !1, this.result_highlighted = null, this.result_single_selected = null, this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text ? this.options.allow_single_deselect : !1, this.disable_search_threshold = this.options.disable_search_threshold || 0, this.disable_search = this.options.disable_search || !1, this.enable_split_word_search = null != this.options.enable_split_word_search ? this.options.enable_split_word_search : !0, this.group_search = null != this.options.group_search ? this.options.group_search : !0, this.search_contains = this.options.search_contains || !1, this.single_backstroke_delete = null != this.options.single_backstroke_delete ? this.options.single_backstroke_delete : !0, this.max_selected_options = this.options.max_selected_options || 1 / 0, this.inherit_select_classes = this.options.inherit_select_classes || !1, this.display_selected_options = null != this.options.display_selected_options ? this.options.display_selected_options : !0, this.display_disabled_options = null != this.options.display_disabled_options ? this.options.display_disabled_options : !0
        }, t.prototype.set_default_text = function () {
            return this.form_field.getAttribute("data-placeholder") ? this.default_text = this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || t.default_multiple_text : this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || t.default_single_text, this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || t.default_no_result_text
        }, t.prototype.mouse_enter = function () {
            return this.mouse_on_container = !0
        }, t.prototype.mouse_leave = function () {
            return this.mouse_on_container = !1
        }, t.prototype.input_focus = function (t) {
            var e = this;
            if (this.is_multiple) {
                if (!this.active_field)return setTimeout(function () {
                    return e.container_mousedown()
                }, 50)
            } else if (!this.active_field)return this.activate_field()
        }, t.prototype.input_blur = function (t) {
            var e = this;
            return this.mouse_on_container ? void 0 : (this.active_field = !1, setTimeout(function () {
                return e.blur_test()
            }, 100))
        }, t.prototype.results_option_build = function (t) {
            var e, i, n, s, r;
            for (e = "", r = this.results_data, n = 0, s = r.length; s > n; n++)i = r[n], e += i.group ? this.result_add_group(i) : this.result_add_option(i), (null != t ? t.first : void 0) && (i.selected && this.is_multiple ? this.choice_build(i) : i.selected && !this.is_multiple && this.single_set_selected_text(i.text));
            return e
        }, t.prototype.result_add_option = function (t) {
            var e, i;
            return t.search_match && this.include_option_in_results(t) ? (e = [], t.disabled || t.selected && this.is_multiple || e.push("active-result"), !t.disabled || t.selected && this.is_multiple || e.push("disabled-result"), t.selected && e.push("result-selected"), null != t.group_array_index && e.push("group-option"), "" !== t.classes && e.push(t.classes), i = "" !== t.style.cssText ? ' style="' + t.style + '"' : "", '<li class="' + e.join(" ") + '"' + i + ' data-option-array-index="' + t.array_index + '">' + t.search_text + "</li>") : ""
        }, t.prototype.result_add_group = function (t) {
            return (t.search_match || t.group_match) && t.active_options > 0 ? '<li class="group-result">' + t.search_text + "</li>" : ""
        }, t.prototype.results_update_field = function () {
            return this.set_default_text(), this.is_multiple || this.results_reset_cleanup(), this.result_clear_highlight(), this.result_single_selected = null, this.results_build(), this.results_showing ? this.winnow_results() : void 0
        }, t.prototype.results_toggle = function () {
            return this.results_showing ? this.results_hide() : this.results_show()
        }, t.prototype.results_search = function (t) {
            return this.results_showing ? this.winnow_results() : this.results_show()
        }, t.prototype.winnow_results = function () {
            var t, e, i, n, s, r, o, a, l, c, h, u, d;
            for (this.no_results_clear(), s = 0, o = this.get_search_text(), t = o.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), n = this.search_contains ? "" : "^", i = new RegExp(n + t, "i"), c = new RegExp(t, "i"), d = this.results_data, h = 0, u = d.length; u > h; h++)e = d[h], e.search_match = !1, r = null, this.include_option_in_results(e) && (e.group && (e.group_match = !1, e.active_options = 0), null != e.group_array_index && this.results_data[e.group_array_index] && (r = this.results_data[e.group_array_index], 0 === r.active_options && r.search_match && (s += 1), r.active_options += 1), (!e.group || this.group_search) && (e.search_text = e.group ? e.label : e.html, e.search_match = this.search_string_match(e.search_text, i), e.search_match && !e.group && (s += 1), e.search_match ? (o.length && (a = e.search_text.search(c), l = e.search_text.substr(0, a + o.length) + "</em>" + e.search_text.substr(a + o.length), e.search_text = l.substr(0, a) + "<em>" + l.substr(a)), null != r && (r.group_match = !0)) : null != e.group_array_index && this.results_data[e.group_array_index].search_match && (e.search_match = !0)));
            return this.result_clear_highlight(), 1 > s && o.length ? (this.update_results_content(""), this.no_results(o)) : (this.update_results_content(this.results_option_build()), this.winnow_results_set_highlight())
        }, t.prototype.search_string_match = function (t, e) {
            var i, n, s, r;
            if (e.test(t))return !0;
            if (this.enable_split_word_search && (t.indexOf(" ") >= 0 || 0 === t.indexOf("[")) && (n = t.replace(/\[|\]/g, "").split(" "), n.length))for (s = 0, r = n.length; r > s; s++)if (i = n[s], e.test(i))return !0
        }, t.prototype.choices_count = function () {
            var t, e, i, n;
            if (null != this.selected_option_count)return this.selected_option_count;
            for (this.selected_option_count = 0, n = this.form_field.options, e = 0, i = n.length; i > e; e++)t = n[e], t.selected && (this.selected_option_count += 1);
            return this.selected_option_count
        }, t.prototype.choices_click = function (t) {
            return t.preventDefault(), this.results_showing || this.is_disabled ? void 0 : this.results_show()
        }, t.prototype.keyup_checker = function (t) {
            var e, i;
            switch (e = null != (i = t.which) ? i : t.keyCode, this.search_field_scale(), e) {
                case 8:
                    if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0)return this.keydown_backstroke();
                    if (!this.pending_backstroke)return this.result_clear_highlight(), this.results_search();
                    break;
                case 13:
                    if (t.preventDefault(), this.results_showing)return this.result_select(t);
                    break;
                case 27:
                    return this.results_showing && this.results_hide(), !0;
                case 9:
                case 38:
                case 40:
                case 16:
                case 91:
                case 17:
                    break;
                default:
                    return this.results_search()
            }
        }, t.prototype.container_width = function () {
            return null != this.options.width ? this.options.width : "" + this.form_field.offsetWidth + "px"
        }, t.prototype.include_option_in_results = function (t) {
            return this.is_multiple && !this.display_selected_options && t.selected ? !1 : !this.display_disabled_options && t.disabled ? !1 : t.empty ? !1 : !0
        }, t.browser_is_supported = function () {
            return "Microsoft Internet Explorer" === window.navigator.appName ? document.documentMode >= 8 : /iP(od|hone)/i.test(window.navigator.userAgent) ? !1 : /Android/i.test(window.navigator.userAgent) && /Mobile/i.test(window.navigator.userAgent) ? !1 : !0
        }, t.default_multiple_text = "Select Some Options", t.default_single_text = "Select an Option", t.default_no_result_text = "No results match", t
    }(), t = jQuery, t.fn.extend({
        chosen: function (n) {
            return e.browser_is_supported() ? this.each(function (e) {
                var s, r;
                s = t(this), r = s.data("chosen"), "destroy" === n && r ? r.destroy() : r || s.data("chosen", new i(this, n))
            }) : this
        }
    }), i = function (e) {
        function i() {
            return s = i.__super__.constructor.apply(this, arguments)
        }

        return o(i, e), i.prototype.setup = function () {
            return this.form_field_jq = t(this.form_field), this.current_selectedIndex = this.form_field.selectedIndex, this.is_rtl = this.form_field_jq.hasClass("chosen-rtl")
        }, i.prototype.set_up_html = function () {
            var e, i;
            return e = ["chosen-container"], e.push("chosen-container-" + (this.is_multiple ? "multi" : "single")), this.inherit_select_classes && this.form_field.className && e.push(this.form_field.className), this.is_rtl && e.push("chosen-rtl"), i = {
                "class": e.join(" "),
                style: "width: " + this.container_width() + ";",
                title: this.form_field.title
            }, this.form_field.id.length && (i.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"), this.container = t("<div />", i), this.container.html(this.is_multiple ? '<ul class="chosen-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>' : '<a class="chosen-single chosen-default" tabindex="-1"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'), this.form_field_jq.hide().after(this.container), this.dropdown = this.container.find("div.chosen-drop").first(), this.search_field = this.container.find("input").first(), this.search_results = this.container.find("ul.chosen-results").first(), this.search_field_scale(), this.search_no_results = this.container.find("li.no-results").first(), this.is_multiple ? (this.search_choices = this.container.find("ul.chosen-choices").first(), this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chosen-search").first(), this.selected_item = this.container.find(".chosen-single").first()), this.results_build(), this.set_tab_index(), this.set_label_behavior(), this.form_field_jq.trigger("chosen:ready", {chosen: this})
        }, i.prototype.register_observers = function () {
            var t = this;
            return this.container.bind("mousedown.chosen", function (e) {
                t.container_mousedown(e)
            }), this.container.bind("mouseup.chosen", function (e) {
                t.container_mouseup(e)
            }), this.container.bind("mouseenter.chosen", function (e) {
                t.mouse_enter(e)
            }), this.container.bind("mouseleave.chosen", function (e) {
                t.mouse_leave(e)
            }), this.search_results.bind("mouseup.chosen", function (e) {
                t.search_results_mouseup(e)
            }), this.search_results.bind("mouseover.chosen", function (e) {
                t.search_results_mouseover(e)
            }), this.search_results.bind("mouseout.chosen", function (e) {
                t.search_results_mouseout(e)
            }), this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen", function (e) {
                t.search_results_mousewheel(e)
            }), this.form_field_jq.bind("chosen:updated.chosen", function (e) {
                t.results_update_field(e)
            }), this.form_field_jq.bind("chosen:activate.chosen", function (e) {
                t.activate_field(e)
            }), this.form_field_jq.bind("chosen:open.chosen", function (e) {
                t.container_mousedown(e)
            }), this.search_field.bind("blur.chosen", function (e) {
                t.input_blur(e)
            }), this.search_field.bind("keyup.chosen", function (e) {
                t.keyup_checker(e)
            }), this.search_field.bind("keydown.chosen", function (e) {
                t.keydown_checker(e)
            }), this.search_field.bind("focus.chosen", function (e) {
                t.input_focus(e)
            }), this.is_multiple ? this.search_choices.bind("click.chosen", function (e) {
                t.choices_click(e)
            }) : this.container.bind("click.chosen", function (t) {
                t.preventDefault()
            })
        }, i.prototype.destroy = function () {
            return t(document).unbind("click.chosen", this.click_test_action), this.search_field[0].tabIndex && (this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex), this.container.remove(), this.form_field_jq.removeData("chosen"), this.form_field_jq.show()
        }, i.prototype.search_field_disabled = function () {
            return this.is_disabled = this.form_field_jq[0].disabled, this.is_disabled ? (this.container.addClass("chosen-disabled"), this.search_field[0].disabled = !0, this.is_multiple || this.selected_item.unbind("focus.chosen", this.activate_action), this.close_field()) : (this.container.removeClass("chosen-disabled"), this.search_field[0].disabled = !1, this.is_multiple ? void 0 : this.selected_item.bind("focus.chosen", this.activate_action))
        }, i.prototype.container_mousedown = function (e) {
            return this.is_disabled || (e && "mousedown" === e.type && !this.results_showing && e.preventDefault(), null != e && t(e.target).hasClass("search-choice-close")) ? void 0 : (this.active_field ? this.is_multiple || !e || t(e.target)[0] !== this.selected_item[0] && !t(e.target).parents("a.chosen-single").length || (e.preventDefault(), this.results_toggle()) : (this.is_multiple && this.search_field.val(""), t(document).bind("click.chosen", this.click_test_action), this.results_show()), this.activate_field())
        }, i.prototype.container_mouseup = function (t) {
            return "ABBR" !== t.target.nodeName || this.is_disabled ? void 0 : this.results_reset(t)
        }, i.prototype.search_results_mousewheel = function (t) {
            var e, i, n;
            return e = -(null != (i = t.originalEvent) ? i.wheelDelta : void 0) || (null != (n = t.originialEvent) ? n.detail : void 0), null != e ? (t.preventDefault(), "DOMMouseScroll" === t.type && (e = 40 * e), this.search_results.scrollTop(e + this.search_results.scrollTop())) : void 0
        }, i.prototype.blur_test = function (t) {
            return !this.active_field && this.container.hasClass("chosen-container-active") ? this.close_field() : void 0
        }, i.prototype.close_field = function () {
            return t(document).unbind("click.chosen", this.click_test_action), this.active_field = !1, this.results_hide(), this.container.removeClass("chosen-container-active"), this.clear_backstroke(), this.show_search_field_default(), this.search_field_scale()
        }, i.prototype.activate_field = function () {
            return this.container.addClass("chosen-container-active"), this.active_field = !0, this.search_field.val(this.search_field.val()), this.search_field.focus()
        }, i.prototype.test_active_click = function (e) {
            return this.container.is(t(e.target).closest(".chosen-container")) ? this.active_field = !0 : this.close_field()
        }, i.prototype.results_build = function () {
            return this.parsing = !0, this.selected_option_count = null, this.results_data = n.select_to_array(this.form_field), this.is_multiple ? this.search_choices.find("li.search-choice").remove() : this.is_multiple || (this.single_set_selected_text(), this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? (this.search_field[0].readOnly = !0, this.container.addClass("chosen-container-single-nosearch")) : (this.search_field[0].readOnly = !1, this.container.removeClass("chosen-container-single-nosearch"))), this.update_results_content(this.results_option_build({first: !0})), this.search_field_disabled(), this.show_search_field_default(), this.search_field_scale(), this.parsing = !1
        }, i.prototype.result_do_highlight = function (t) {
            var e, i, n, s, r;
            if (t.length) {
                if (this.result_clear_highlight(), this.result_highlight = t, this.result_highlight.addClass("highlighted"), n = parseInt(this.search_results.css("maxHeight"), 10), r = this.search_results.scrollTop(), s = n + r, i = this.result_highlight.position().top + this.search_results.scrollTop(), e = i + this.result_highlight.outerHeight(), e >= s)return this.search_results.scrollTop(e - n > 0 ? e - n : 0);
                if (r > i)return this.search_results.scrollTop(i)
            }
        }, i.prototype.result_clear_highlight = function () {
            return this.result_highlight && this.result_highlight.removeClass("highlighted"), this.result_highlight = null
        }, i.prototype.results_show = function () {
            return this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {chosen: this}), !1) : (this.container.addClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:showing_dropdown", {chosen: this}), this.results_showing = !0, this.search_field.focus(), this.search_field.val(this.search_field.val()), this.winnow_results())
        }, i.prototype.update_results_content = function (t) {
            return this.search_results.html(t)
        }, i.prototype.results_hide = function () {
            return this.results_showing && (this.result_clear_highlight(), this.container.removeClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:hiding_dropdown", {chosen: this})), this.results_showing = !1
        }, i.prototype.set_tab_index = function (t) {
            var e;
            return this.form_field.tabIndex ? (e = this.form_field.tabIndex, this.form_field.tabIndex = -1, this.search_field[0].tabIndex = e) : void 0
        }, i.prototype.set_label_behavior = function () {
            var e = this;
            return this.form_field_label = this.form_field_jq.parents("label"), !this.form_field_label.length && this.form_field.id.length && (this.form_field_label = t("label[for='" + this.form_field.id + "']")), this.form_field_label.length > 0 ? this.form_field_label.bind("click.chosen", function (t) {
                return e.is_multiple ? e.container_mousedown(t) : e.activate_field()
            }) : void 0
        }, i.prototype.show_search_field_default = function () {
            return this.is_multiple && this.choices_count() < 1 && !this.active_field ? (this.search_field.val(this.default_text), this.search_field.addClass("default")) : (this.search_field.val(""), this.search_field.removeClass("default"))
        }, i.prototype.search_results_mouseup = function (e) {
            var i;
            return i = t(e.target).hasClass("active-result") ? t(e.target) : t(e.target).parents(".active-result").first(), i.length ? (this.result_highlight = i, this.result_select(e), this.search_field.focus()) : void 0
        }, i.prototype.search_results_mouseover = function (e) {
            var i;
            return i = t(e.target).hasClass("active-result") ? t(e.target) : t(e.target).parents(".active-result").first(), i ? this.result_do_highlight(i) : void 0
        }, i.prototype.search_results_mouseout = function (e) {
            return t(e.target).hasClass("active-result") ? this.result_clear_highlight() : void 0
        }, i.prototype.choice_build = function (e) {
            var i, n, s = this;
            return i = t("<li />", {"class": "search-choice"}).html("<span>" + e.html + "</span>"), e.disabled ? i.addClass("search-choice-disabled") : (n = t("<a />", {
                "class": "search-choice-close",
                "data-option-array-index": e.array_index
            }), n.bind("click.chosen", function (t) {
                return s.choice_destroy_link_click(t)
            }), i.append(n)), this.search_container.before(i)
        }, i.prototype.choice_destroy_link_click = function (e) {
            return e.preventDefault(), e.stopPropagation(), this.is_disabled ? void 0 : this.choice_destroy(t(e.target))
        }, i.prototype.choice_destroy = function (t) {
            return this.result_deselect(t[0].getAttribute("data-option-array-index")) ? (this.show_search_field_default(), this.is_multiple && this.choices_count() > 0 && this.search_field.val().length < 1 && this.results_hide(), t.parents("li").first().remove(), this.search_field_scale()) : void 0
        }, i.prototype.results_reset = function () {
            return this.form_field.options[0].selected = !0, this.selected_option_count = null, this.single_set_selected_text(), this.show_search_field_default(), this.results_reset_cleanup(), this.form_field_jq.trigger("change"), this.active_field ? this.results_hide() : void 0
        }, i.prototype.results_reset_cleanup = function () {
            return this.current_selectedIndex = this.form_field.selectedIndex, this.selected_item.find("abbr").remove()
        }, i.prototype.result_select = function (t) {
            var e, i, n;
            return this.result_highlight ? (e = this.result_highlight, this.result_clear_highlight(), this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {chosen: this}), !1) : (this.is_multiple ? e.removeClass("active-result") : (this.result_single_selected && (this.result_single_selected.removeClass("result-selected"), n = this.result_single_selected[0].getAttribute("data-option-array-index"), this.results_data[n].selected = !1), this.result_single_selected = e), e.addClass("result-selected"), i = this.results_data[e[0].getAttribute("data-option-array-index")], i.selected = !0, this.form_field.options[i.options_index].selected = !0, this.selected_option_count = null, this.is_multiple ? this.choice_build(i) : this.single_set_selected_text(i.text), (t.metaKey || t.ctrlKey) && this.is_multiple || this.results_hide(), this.search_field.val(""), (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.form_field_jq.trigger("change", {selected: this.form_field.options[i.options_index].value}), this.current_selectedIndex = this.form_field.selectedIndex, this.search_field_scale())) : void 0
        }, i.prototype.single_set_selected_text = function (t) {
            return null == t && (t = this.default_text), t === this.default_text ? this.selected_item.addClass("chosen-default") : (this.single_deselect_control_build(), this.selected_item.removeClass("chosen-default")), this.selected_item.find("span").text(t)
        }, i.prototype.result_deselect = function (t) {
            var e;
            return e = this.results_data[t], this.form_field.options[e.options_index].disabled ? !1 : (e.selected = !1, this.form_field.options[e.options_index].selected = !1, this.selected_option_count = null, this.result_clear_highlight(), this.results_showing && this.winnow_results(), this.form_field_jq.trigger("change", {deselected: this.form_field.options[e.options_index].value}), this.search_field_scale(), !0)
        }, i.prototype.single_deselect_control_build = function () {
            return this.allow_single_deselect ? (this.selected_item.find("abbr").length || this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'), this.selected_item.addClass("chosen-single-with-deselect")) : void 0
        }, i.prototype.get_search_text = function () {
            return this.search_field.val() === this.default_text ? "" : t("<div/>").text(t.trim(this.search_field.val())).html()
        }, i.prototype.winnow_results_set_highlight = function () {
            var t, e;
            return e = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result"), t = e.length ? e.first() : this.search_results.find(".active-result").first(), null != t ? this.result_do_highlight(t) : void 0
        }, i.prototype.no_results = function (e) {
            var i;
            return i = t('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>'), i.find("span").first().html(e), this.search_results.append(i)
        }, i.prototype.no_results_clear = function () {
            return this.search_results.find(".no-results").remove()
        }, i.prototype.keydown_arrow = function () {
            var t;
            return this.results_showing && this.result_highlight ? (t = this.result_highlight.nextAll("li.active-result").first()) ? this.result_do_highlight(t) : void 0 : this.results_show()
        }, i.prototype.keyup_arrow = function () {
            var t;
            return this.results_showing || this.is_multiple ? this.result_highlight ? (t = this.result_highlight.prevAll("li.active-result"), t.length ? this.result_do_highlight(t.first()) : (this.choices_count() > 0 && this.results_hide(), this.result_clear_highlight())) : void 0 : this.results_show()
        }, i.prototype.keydown_backstroke = function () {
            var t;
            return this.pending_backstroke ? (this.choice_destroy(this.pending_backstroke.find("a").first()), this.clear_backstroke()) : (t = this.search_container.siblings("li.search-choice").last(), t.length && !t.hasClass("search-choice-disabled") ? (this.pending_backstroke = t, this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")) : void 0)
        }, i.prototype.clear_backstroke = function () {
            return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"), this.pending_backstroke = null
        }, i.prototype.keydown_checker = function (t) {
            var e, i;
            switch (e = null != (i = t.which) ? i : t.keyCode, this.search_field_scale(), 8 !== e && this.pending_backstroke && this.clear_backstroke(), e) {
                case 8:
                    this.backstroke_length = this.search_field.val().length;
                    break;
                case 9:
                    this.results_showing && !this.is_multiple && this.result_select(t), this.mouse_on_container = !1;
                    break;
                case 13:
                    t.preventDefault();
                    break;
                case 38:
                    t.preventDefault(), this.keyup_arrow();
                    break;
                case 40:
                    t.preventDefault(), this.keydown_arrow()
            }
        }, i.prototype.search_field_scale = function () {
            var e, i, n, s, r, o, a, l, c;
            if (this.is_multiple) {
                for (n = 0, a = 0, r = "position:absolute; left: -1000px; top: -1000px; display:none;", o = ["font-size", "font-style", "font-weight", "font-family", "line-height", "text-transform", "letter-spacing"], l = 0, c = o.length; c > l; l++)s = o[l], r += s + ":" + this.search_field.css(s) + ";";
                return e = t("<div />", {style: r}), e.text(this.search_field.val()), t("body").append(e), a = e.width() + 25, e.remove(), i = this.container.outerWidth(), a > i - 10 && (a = i - 10), this.search_field.css({width: a + "px"})
            }
        }, i
    }(e)
}.call(this), define("chosen", ["jquery"], function () {
}), function (t) {
    "undefined" == typeof t.fn.each2 && t.extend(t.fn, {
        each2: function (e) {
            for (var i = t([0]), n = -1, s = this.length; ++n < s && (i.context = i[0] = this[n]) && e.call(i[0], n, i) !== !1;);
            return this
        }
    })
}(jQuery), function (t, e) {
    function i(t) {
        var e, i, n, s;
        if (!t || t.length < 1)return t;
        for (e = "", i = 0, n = t.length; n > i; i++)s = t.charAt(i), e += H[s] || s;
        return e
    }

    function n(t, e) {
        for (var i = 0, n = e.length; n > i; i += 1)if (r(t, e[i]))return i;
        return -1
    }

    function s() {
        var e = t(j);
        e.appendTo("body");
        var i = {width: e.width() - e[0].clientWidth, height: e.height() - e[0].clientHeight};
        return e.remove(), i
    }

    function r(t, i) {
        return t === i ? !0 : t === e || i === e ? !1 : null === t || null === i ? !1 : t.constructor === String ? t + "" == i + "" : i.constructor === String ? i + "" == t + "" : !1
    }

    function o(e, i) {
        var n, s, r;
        if (null === e || e.length < 1)return [];
        for (n = e.split(i), s = 0, r = n.length; r > s; s += 1)n[s] = t.trim(n[s]);
        return n
    }

    function a(t) {
        return t.outerWidth(!1) - t.width()
    }

    function l(i) {
        var n = "keyup-change-value";
        i.on("keydown", function () {
            t.data(i, n) === e && t.data(i, n, i.val())
        }), i.on("keyup", function () {
            var s = t.data(i, n);
            s !== e && i.val() !== s && (t.removeData(i, n), i.trigger("keyup-change"))
        })
    }

    function c(i) {
        i.on("mousemove", function (i) {
            var n = z;
            (n === e || n.x !== i.pageX || n.y !== i.pageY) && t(i.target).trigger("mousemove-filtered", i)
        })
    }

    function h(t, i, n) {
        n = n || e;
        var s;
        return function () {
            var e = arguments;
            window.clearTimeout(s), s = window.setTimeout(function () {
                i.apply(n, e)
            }, t)
        }
    }

    function u(t) {
        var e, i = !1;
        return function () {
            return i === !1 && (e = t(), i = !0), e
        }
    }

    function d(t, e) {
        var i = h(t, function (t) {
            e.trigger("scroll-debounced", t)
        });
        e.on("scroll", function (t) {
            n(t.target, e.get()) >= 0 && i(t)
        })
    }

    function p(t) {
        t[0] !== document.activeElement && window.setTimeout(function () {
            var e, i = t[0], n = t.val().length;
            t.focus(), t.is(":visible") && i === document.activeElement && (i.setSelectionRange ? i.setSelectionRange(n, n) : i.createTextRange && (e = i.createTextRange(), e.collapse(!1), e.select()))
        }, 0)
    }

    function f(e) {
        e = t(e)[0];
        var i = 0, n = 0;
        if ("selectionStart" in e)i = e.selectionStart, n = e.selectionEnd - i; else if ("selection" in document) {
            e.focus();
            var s = document.selection.createRange();
            n = document.selection.createRange().text.length, s.moveStart("character", -e.value.length), i = s.text.length - n
        }
        return {offset: i, length: n}
    }

    function m(t) {
        t.preventDefault(), t.stopPropagation()
    }

    function g(t) {
        t.preventDefault(), t.stopImmediatePropagation()
    }

    function v(e) {
        if (!N) {
            var i = e[0].currentStyle || window.getComputedStyle(e[0], null);
            N = t(document.createElement("div")).css({
                position: "absolute",
                left: "-10000px",
                top: "-10000px",
                display: "none",
                fontSize: i.fontSize,
                fontFamily: i.fontFamily,
                fontStyle: i.fontStyle,
                fontWeight: i.fontWeight,
                letterSpacing: i.letterSpacing,
                textTransform: i.textTransform,
                whiteSpace: "nowrap"
            }), N.attr("class", "select2-sizer"), t("body").append(N)
        }
        return N.text(e.val()), N.width()
    }

    function _(e, i, n) {
        var s, r, o = [];
        s = e.attr("class"), s && (s = "" + s, t(s.split(" ")).each2(function () {
            0 === this.indexOf("select2-") && o.push(this)
        })), s = i.attr("class"), s && (s = "" + s, t(s.split(" ")).each2(function () {
            0 !== this.indexOf("select2-") && (r = n(this), r && o.push(this))
        })), e.attr("class", o.join(" "))
    }

    function y(t, e, n, s) {
        var r = i(t.toUpperCase()).indexOf(i(e.toUpperCase())), o = e.length;
        return 0 > r ? void n.push(s(t)) : (n.push(s(t.substring(0, r))), n.push("<span class='select2-match'>"), n.push(s(t.substring(r, r + o))), n.push("</span>"), void n.push(s(t.substring(r + o, t.length))))
    }

    function b(t) {
        var e = {"\\": "&#92;", "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#47;"};
        return String(t).replace(/[&<>"'\/\\]/g, function (t) {
            return e[t]
        })
    }

    function w(i) {
        var n, s = null, r = i.quietMillis || 100, o = i.url, a = this;
        return function (l) {
            window.clearTimeout(n), n = window.setTimeout(function () {
                var n = i.data, r = o, c = i.transport || t.fn.select2.ajaxDefaults.transport, h = {
                    type: i.type || "GET",
                    cache: i.cache || !1,
                    jsonpCallback: i.jsonpCallback || e,
                    dataType: i.dataType || "json"
                }, u = t.extend({}, t.fn.select2.ajaxDefaults.params, h);
                n = n ? n.call(a, l.term, l.page, l.context) : null, r = "function" == typeof r ? r.call(a, l.term, l.page, l.context) : r, s && s.abort(), i.params && (t.isFunction(i.params) ? t.extend(u, i.params.call(a)) : t.extend(u, i.params)), t.extend(u, {
                    url: r,
                    dataType: i.dataType,
                    data: n,
                    success: function (t) {
                        var e = i.results(t, l.page);
                        l.callback(e)
                    }
                }), s = c.call(a, u)
            }, r)
        }
    }

    function x(e) {
        var i, n, s = e, r = function (t) {
            return "" + t.text
        };
        t.isArray(s) && (n = s, s = {results: n}), t.isFunction(s) === !1 && (n = s, s = function () {
            return n
        });
        var o = s();
        return o.text && (r = o.text, t.isFunction(r) || (i = o.text, r = function (t) {
            return t[i]
        })), function (e) {
            var i, n = e.term, o = {results: []};
            return "" === n ? void e.callback(s()) : (i = function (s, o) {
                var a, l;
                if (s = s[0], s.children) {
                    a = {};
                    for (l in s)s.hasOwnProperty(l) && (a[l] = s[l]);
                    a.children = [], t(s.children).each2(function (t, e) {
                        i(e, a.children)
                    }), (a.children.length || e.matcher(n, r(a), s)) && o.push(a)
                } else e.matcher(n, r(s), s) && o.push(s)
            }, t(s().results).each2(function (t, e) {
                i(e, o.results)
            }), void e.callback(o))
        }
    }

    function k(i) {
        var n = t.isFunction(i);
        return function (s) {
            var r = s.term, o = {results: []};
            t(n ? i() : i).each(function () {
                var t = this.text !== e, i = t ? this.text : this;
                ("" === r || s.matcher(r, i)) && o.results.push(t ? this : {id: this, text: this})
            }), s.callback(o)
        }
    }

    function C(e, i) {
        if (t.isFunction(e))return !0;
        if (!e)return !1;
        throw new Error(i + " must be a function or a falsy value")
    }

    function D(e) {
        return t.isFunction(e) ? e() : e
    }

    function T(e) {
        var i = 0;
        return t.each(e, function (t, e) {
            e.children ? i += T(e.children) : i++
        }), i
    }

    function S(t, i, n, s) {
        var o, a, l, c, h, u = t, d = !1;
        if (!s.createSearchChoice || !s.tokenSeparators || s.tokenSeparators.length < 1)return e;
        for (; ;) {
            for (a = -1, l = 0, c = s.tokenSeparators.length; c > l && (h = s.tokenSeparators[l], a = t.indexOf(h), !(a >= 0)); l++);
            if (0 > a)break;
            if (o = t.substring(0, a), t = t.substring(a + h.length), o.length > 0 && (o = s.createSearchChoice.call(this, o, i), o !== e && null !== o && s.id(o) !== e && null !== s.id(o))) {
                for (d = !1, l = 0, c = i.length; c > l; l++)if (r(s.id(o), s.id(i[l]))) {
                    d = !0;
                    break
                }
                d || n(o)
            }
        }
        return u !== t ? t : void 0
    }

    function M(e, i) {
        var n = function () {
        };
        return n.prototype = new e, n.prototype.constructor = n, n.prototype.parent = e.prototype, n.prototype = t.extend(n.prototype, i), n
    }

    if (window.Select2 === e) {
        var F, E, I, A, P, N, $, O, z = {x: 0, y: 0}, F = {
            TAB: 9,
            ENTER: 13,
            ESC: 27,
            SPACE: 32,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            HOME: 36,
            END: 35,
            BACKSPACE: 8,
            DELETE: 46,
            isArrow: function (t) {
                switch (t = t.which ? t.which : t) {
                    case F.LEFT:
                    case F.RIGHT:
                    case F.UP:
                    case F.DOWN:
                        return !0
                }
                return !1
            },
            isControl: function (t) {
                var e = t.which;
                switch (e) {
                    case F.SHIFT:
                    case F.CTRL:
                    case F.ALT:
                        return !0
                }
                return t.metaKey ? !0 : !1
            },
            isFunctionKey: function (t) {
                return t = t.which ? t.which : t, t >= 112 && 123 >= t
            }
        }, j = "<div class='select2-measure-scrollbar'></div>", H = {
            "Ⓐ": "A",
            "Ａ": "A",
            "À": "A",
            "Á": "A",
            "Â": "A",
            "Ầ": "A",
            "Ấ": "A",
            "Ẫ": "A",
            "Ẩ": "A",
            "Ã": "A",
            "Ā": "A",
            "Ă": "A",
            "Ằ": "A",
            "Ắ": "A",
            "Ẵ": "A",
            "Ẳ": "A",
            "Ȧ": "A",
            "Ǡ": "A",
            "Ä": "A",
            "Ǟ": "A",
            "Ả": "A",
            "Å": "A",
            "Ǻ": "A",
            "Ǎ": "A",
            "Ȁ": "A",
            "Ȃ": "A",
            "Ạ": "A",
            "Ậ": "A",
            "Ặ": "A",
            "Ḁ": "A",
            "Ą": "A",
            "Ⱥ": "A",
            "Ɐ": "A",
            "Ꜳ": "AA",
            "Æ": "AE",
            "Ǽ": "AE",
            "Ǣ": "AE",
            "Ꜵ": "AO",
            "Ꜷ": "AU",
            "Ꜹ": "AV",
            "Ꜻ": "AV",
            "Ꜽ": "AY",
            "Ⓑ": "B",
            "Ｂ": "B",
            "Ḃ": "B",
            "Ḅ": "B",
            "Ḇ": "B",
            "Ƀ": "B",
            "Ƃ": "B",
            "Ɓ": "B",
            "Ⓒ": "C",
            "Ｃ": "C",
            "Ć": "C",
            "Ĉ": "C",
            "Ċ": "C",
            "Č": "C",
            "Ç": "C",
            "Ḉ": "C",
            "Ƈ": "C",
            "Ȼ": "C",
            "Ꜿ": "C",
            "Ⓓ": "D",
            "Ｄ": "D",
            "Ḋ": "D",
            "Ď": "D",
            "Ḍ": "D",
            "Ḑ": "D",
            "Ḓ": "D",
            "Ḏ": "D",
            "Đ": "D",
            "Ƌ": "D",
            "Ɗ": "D",
            "Ɖ": "D",
            "Ꝺ": "D",
            "Ǳ": "DZ",
            "Ǆ": "DZ",
            "ǲ": "Dz",
            "ǅ": "Dz",
            "Ⓔ": "E",
            "Ｅ": "E",
            "È": "E",
            "É": "E",
            "Ê": "E",
            "Ề": "E",
            "Ế": "E",
            "Ễ": "E",
            "Ể": "E",
            "Ẽ": "E",
            "Ē": "E",
            "Ḕ": "E",
            "Ḗ": "E",
            "Ĕ": "E",
            "Ė": "E",
            "Ë": "E",
            "Ẻ": "E",
            "Ě": "E",
            "Ȅ": "E",
            "Ȇ": "E",
            "Ẹ": "E",
            "Ệ": "E",
            "Ȩ": "E",
            "Ḝ": "E",
            "Ę": "E",
            "Ḙ": "E",
            "Ḛ": "E",
            "Ɛ": "E",
            "Ǝ": "E",
            "Ⓕ": "F",
            "Ｆ": "F",
            "Ḟ": "F",
            "Ƒ": "F",
            "Ꝼ": "F",
            "Ⓖ": "G",
            "Ｇ": "G",
            "Ǵ": "G",
            "Ĝ": "G",
            "Ḡ": "G",
            "Ğ": "G",
            "Ġ": "G",
            "Ǧ": "G",
            "Ģ": "G",
            "Ǥ": "G",
            "Ɠ": "G",
            "Ꞡ": "G",
            "Ᵹ": "G",
            "Ꝿ": "G",
            "Ⓗ": "H",
            "Ｈ": "H",
            "Ĥ": "H",
            "Ḣ": "H",
            "Ḧ": "H",
            "Ȟ": "H",
            "Ḥ": "H",
            "Ḩ": "H",
            "Ḫ": "H",
            "Ħ": "H",
            "Ⱨ": "H",
            "Ⱶ": "H",
            "Ɥ": "H",
            "Ⓘ": "I",
            "Ｉ": "I",
            "Ì": "I",
            "Í": "I",
            "Î": "I",
            "Ĩ": "I",
            "Ī": "I",
            "Ĭ": "I",
            "İ": "I",
            "Ï": "I",
            "Ḯ": "I",
            "Ỉ": "I",
            "Ǐ": "I",
            "Ȉ": "I",
            "Ȋ": "I",
            "Ị": "I",
            "Į": "I",
            "Ḭ": "I",
            "Ɨ": "I",
            "Ⓙ": "J",
            "Ｊ": "J",
            "Ĵ": "J",
            "Ɉ": "J",
            "Ⓚ": "K",
            "Ｋ": "K",
            "Ḱ": "K",
            "Ǩ": "K",
            "Ḳ": "K",
            "Ķ": "K",
            "Ḵ": "K",
            "Ƙ": "K",
            "Ⱪ": "K",
            "Ꝁ": "K",
            "Ꝃ": "K",
            "Ꝅ": "K",
            "Ꞣ": "K",
            "Ⓛ": "L",
            "Ｌ": "L",
            "Ŀ": "L",
            "Ĺ": "L",
            "Ľ": "L",
            "Ḷ": "L",
            "Ḹ": "L",
            "Ļ": "L",
            "Ḽ": "L",
            "Ḻ": "L",
            "Ł": "L",
            "Ƚ": "L",
            "Ɫ": "L",
            "Ⱡ": "L",
            "Ꝉ": "L",
            "Ꝇ": "L",
            "Ꞁ": "L",
            "Ǉ": "LJ",
            "ǈ": "Lj",
            "Ⓜ": "M",
            "Ｍ": "M",
            "Ḿ": "M",
            "Ṁ": "M",
            "Ṃ": "M",
            "Ɱ": "M",
            "Ɯ": "M",
            "Ⓝ": "N",
            "Ｎ": "N",
            "Ǹ": "N",
            "Ń": "N",
            "Ñ": "N",
            "Ṅ": "N",
            "Ň": "N",
            "Ṇ": "N",
            "Ņ": "N",
            "Ṋ": "N",
            "Ṉ": "N",
            "Ƞ": "N",
            "Ɲ": "N",
            "Ꞑ": "N",
            "Ꞥ": "N",
            "Ǌ": "NJ",
            "ǋ": "Nj",
            "Ⓞ": "O",
            "Ｏ": "O",
            "Ò": "O",
            "Ó": "O",
            "Ô": "O",
            "Ồ": "O",
            "Ố": "O",
            "Ỗ": "O",
            "Ổ": "O",
            "Õ": "O",
            "Ṍ": "O",
            "Ȭ": "O",
            "Ṏ": "O",
            "Ō": "O",
            "Ṑ": "O",
            "Ṓ": "O",
            "Ŏ": "O",
            "Ȯ": "O",
            "Ȱ": "O",
            "Ö": "O",
            "Ȫ": "O",
            "Ỏ": "O",
            "Ő": "O",
            "Ǒ": "O",
            "Ȍ": "O",
            "Ȏ": "O",
            "Ơ": "O",
            "Ờ": "O",
            "Ớ": "O",
            "Ỡ": "O",
            "Ở": "O",
            "Ợ": "O",
            "Ọ": "O",
            "Ộ": "O",
            "Ǫ": "O",
            "Ǭ": "O",
            "Ø": "O",
            "Ǿ": "O",
            "Ɔ": "O",
            "Ɵ": "O",
            "Ꝋ": "O",
            "Ꝍ": "O",
            "Ƣ": "OI",
            "Ꝏ": "OO",
            "Ȣ": "OU",
            "Ⓟ": "P",
            "Ｐ": "P",
            "Ṕ": "P",
            "Ṗ": "P",
            "Ƥ": "P",
            "Ᵽ": "P",
            "Ꝑ": "P",
            "Ꝓ": "P",
            "Ꝕ": "P",
            "Ⓠ": "Q",
            "Ｑ": "Q",
            "Ꝗ": "Q",
            "Ꝙ": "Q",
            "Ɋ": "Q",
            "Ⓡ": "R",
            "Ｒ": "R",
            "Ŕ": "R",
            "Ṙ": "R",
            "Ř": "R",
            "Ȑ": "R",
            "Ȓ": "R",
            "Ṛ": "R",
            "Ṝ": "R",
            "Ŗ": "R",
            "Ṟ": "R",
            "Ɍ": "R",
            "Ɽ": "R",
            "Ꝛ": "R",
            "Ꞧ": "R",
            "Ꞃ": "R",
            "Ⓢ": "S",
            "Ｓ": "S",
            "ẞ": "S",
            "Ś": "S",
            "Ṥ": "S",
            "Ŝ": "S",
            "Ṡ": "S",
            "Š": "S",
            "Ṧ": "S",
            "Ṣ": "S",
            "Ṩ": "S",
            "Ș": "S",
            "Ş": "S",
            "Ȿ": "S",
            "Ꞩ": "S",
            "Ꞅ": "S",
            "Ⓣ": "T",
            "Ｔ": "T",
            "Ṫ": "T",
            "Ť": "T",
            "Ṭ": "T",
            "Ț": "T",
            "Ţ": "T",
            "Ṱ": "T",
            "Ṯ": "T",
            "Ŧ": "T",
            "Ƭ": "T",
            "Ʈ": "T",
            "Ⱦ": "T",
            "Ꞇ": "T",
            "Ꜩ": "TZ",
            "Ⓤ": "U",
            "Ｕ": "U",
            "Ù": "U",
            "Ú": "U",
            "Û": "U",
            "Ũ": "U",
            "Ṹ": "U",
            "Ū": "U",
            "Ṻ": "U",
            "Ŭ": "U",
            "Ü": "U",
            "Ǜ": "U",
            "Ǘ": "U",
            "Ǖ": "U",
            "Ǚ": "U",
            "Ủ": "U",
            "Ů": "U",
            "Ű": "U",
            "Ǔ": "U",
            "Ȕ": "U",
            "Ȗ": "U",
            "Ư": "U",
            "Ừ": "U",
            "Ứ": "U",
            "Ữ": "U",
            "Ử": "U",
            "Ự": "U",
            "Ụ": "U",
            "Ṳ": "U",
            "Ų": "U",
            "Ṷ": "U",
            "Ṵ": "U",
            "Ʉ": "U",
            "Ⓥ": "V",
            "Ｖ": "V",
            "Ṽ": "V",
            "Ṿ": "V",
            "Ʋ": "V",
            "Ꝟ": "V",
            "Ʌ": "V",
            "Ꝡ": "VY",
            "Ⓦ": "W",
            "Ｗ": "W",
            "Ẁ": "W",
            "Ẃ": "W",
            "Ŵ": "W",
            "Ẇ": "W",
            "Ẅ": "W",
            "Ẉ": "W",
            "Ⱳ": "W",
            "Ⓧ": "X",
            "Ｘ": "X",
            "Ẋ": "X",
            "Ẍ": "X",
            "Ⓨ": "Y",
            "Ｙ": "Y",
            "Ỳ": "Y",
            "Ý": "Y",
            "Ŷ": "Y",
            "Ỹ": "Y",
            "Ȳ": "Y",
            "Ẏ": "Y",
            "Ÿ": "Y",
            "Ỷ": "Y",
            "Ỵ": "Y",
            "Ƴ": "Y",
            "Ɏ": "Y",
            "Ỿ": "Y",
            "Ⓩ": "Z",
            "Ｚ": "Z",
            "Ź": "Z",
            "Ẑ": "Z",
            "Ż": "Z",
            "Ž": "Z",
            "Ẓ": "Z",
            "Ẕ": "Z",
            "Ƶ": "Z",
            "Ȥ": "Z",
            "Ɀ": "Z",
            "Ⱬ": "Z",
            "Ꝣ": "Z",
            "ⓐ": "a",
            "ａ": "a",
            "ẚ": "a",
            "à": "a",
            "á": "a",
            "â": "a",
            "ầ": "a",
            "ấ": "a",
            "ẫ": "a",
            "ẩ": "a",
            "ã": "a",
            "ā": "a",
            "ă": "a",
            "ằ": "a",
            "ắ": "a",
            "ẵ": "a",
            "ẳ": "a",
            "ȧ": "a",
            "ǡ": "a",
            "ä": "a",
            "ǟ": "a",
            "ả": "a",
            "å": "a",
            "ǻ": "a",
            "ǎ": "a",
            "ȁ": "a",
            "ȃ": "a",
            "ạ": "a",
            "ậ": "a",
            "ặ": "a",
            "ḁ": "a",
            "ą": "a",
            "ⱥ": "a",
            "ɐ": "a",
            "ꜳ": "aa",
            "æ": "ae",
            "ǽ": "ae",
            "ǣ": "ae",
            "ꜵ": "ao",
            "ꜷ": "au",
            "ꜹ": "av",
            "ꜻ": "av",
            "ꜽ": "ay",
            "ⓑ": "b",
            "ｂ": "b",
            "ḃ": "b",
            "ḅ": "b",
            "ḇ": "b",
            "ƀ": "b",
            "ƃ": "b",
            "ɓ": "b",
            "ⓒ": "c",
            "ｃ": "c",
            "ć": "c",
            "ĉ": "c",
            "ċ": "c",
            "č": "c",
            "ç": "c",
            "ḉ": "c",
            "ƈ": "c",
            "ȼ": "c",
            "ꜿ": "c",
            "ↄ": "c",
            "ⓓ": "d",
            "ｄ": "d",
            "ḋ": "d",
            "ď": "d",
            "ḍ": "d",
            "ḑ": "d",
            "ḓ": "d",
            "ḏ": "d",
            "đ": "d",
            "ƌ": "d",
            "ɖ": "d",
            "ɗ": "d",
            "ꝺ": "d",
            "ǳ": "dz",
            "ǆ": "dz",
            "ⓔ": "e",
            "ｅ": "e",
            "è": "e",
            "é": "e",
            "ê": "e",
            "ề": "e",
            "ế": "e",
            "ễ": "e",
            "ể": "e",
            "ẽ": "e",
            "ē": "e",
            "ḕ": "e",
            "ḗ": "e",
            "ĕ": "e",
            "ė": "e",
            "ë": "e",
            "ẻ": "e",
            "ě": "e",
            "ȅ": "e",
            "ȇ": "e",
            "ẹ": "e",
            "ệ": "e",
            "ȩ": "e",
            "ḝ": "e",
            "ę": "e",
            "ḙ": "e",
            "ḛ": "e",
            "ɇ": "e",
            "ɛ": "e",
            "ǝ": "e",
            "ⓕ": "f",
            "ｆ": "f",
            "ḟ": "f",
            "ƒ": "f",
            "ꝼ": "f",
            "ⓖ": "g",
            "ｇ": "g",
            "ǵ": "g",
            "ĝ": "g",
            "ḡ": "g",
            "ğ": "g",
            "ġ": "g",
            "ǧ": "g",
            "ģ": "g",
            "ǥ": "g",
            "ɠ": "g",
            "ꞡ": "g",
            "ᵹ": "g",
            "ꝿ": "g",
            "ⓗ": "h",
            "ｈ": "h",
            "ĥ": "h",
            "ḣ": "h",
            "ḧ": "h",
            "ȟ": "h",
            "ḥ": "h",
            "ḩ": "h",
            "ḫ": "h",
            "ẖ": "h",
            "ħ": "h",
            "ⱨ": "h",
            "ⱶ": "h",
            "ɥ": "h",
            "ƕ": "hv",
            "ⓘ": "i",
            "ｉ": "i",
            "ì": "i",
            "í": "i",
            "î": "i",
            "ĩ": "i",
            "ī": "i",
            "ĭ": "i",
            "ï": "i",
            "ḯ": "i",
            "ỉ": "i",
            "ǐ": "i",
            "ȉ": "i",
            "ȋ": "i",
            "ị": "i",
            "į": "i",
            "ḭ": "i",
            "ɨ": "i",
            "ı": "i",
            "ⓙ": "j",
            "ｊ": "j",
            "ĵ": "j",
            "ǰ": "j",
            "ɉ": "j",
            "ⓚ": "k",
            "ｋ": "k",
            "ḱ": "k",
            "ǩ": "k",
            "ḳ": "k",
            "ķ": "k",
            "ḵ": "k",
            "ƙ": "k",
            "ⱪ": "k",
            "ꝁ": "k",
            "ꝃ": "k",
            "ꝅ": "k",
            "ꞣ": "k",
            "ⓛ": "l",
            "ｌ": "l",
            "ŀ": "l",
            "ĺ": "l",
            "ľ": "l",
            "ḷ": "l",
            "ḹ": "l",
            "ļ": "l",
            "ḽ": "l",
            "ḻ": "l",
            "ſ": "l",
            "ł": "l",
            "ƚ": "l",
            "ɫ": "l",
            "ⱡ": "l",
            "ꝉ": "l",
            "ꞁ": "l",
            "ꝇ": "l",
            "ǉ": "lj",
            "ⓜ": "m",
            "ｍ": "m",
            "ḿ": "m",
            "ṁ": "m",
            "ṃ": "m",
            "ɱ": "m",
            "ɯ": "m",
            "ⓝ": "n",
            "ｎ": "n",
            "ǹ": "n",
            "ń": "n",
            "ñ": "n",
            "ṅ": "n",
            "ň": "n",
            "ṇ": "n",
            "ņ": "n",
            "ṋ": "n",
            "ṉ": "n",
            "ƞ": "n",
            "ɲ": "n",
            "ŉ": "n",
            "ꞑ": "n",
            "ꞥ": "n",
            "ǌ": "nj",
            "ⓞ": "o",
            "ｏ": "o",
            "ò": "o",
            "ó": "o",
            "ô": "o",
            "ồ": "o",
            "ố": "o",
            "ỗ": "o",
            "ổ": "o",
            "õ": "o",
            "ṍ": "o",
            "ȭ": "o",
            "ṏ": "o",
            "ō": "o",
            "ṑ": "o",
            "ṓ": "o",
            "ŏ": "o",
            "ȯ": "o",
            "ȱ": "o",
            "ö": "o",
            "ȫ": "o",
            "ỏ": "o",
            "ő": "o",
            "ǒ": "o",
            "ȍ": "o",
            "ȏ": "o",
            "ơ": "o",
            "ờ": "o",
            "ớ": "o",
            "ỡ": "o",
            "ở": "o",
            "ợ": "o",
            "ọ": "o",
            "ộ": "o",
            "ǫ": "o",
            "ǭ": "o",
            "ø": "o",
            "ǿ": "o",
            "ɔ": "o",
            "ꝋ": "o",
            "ꝍ": "o",
            "ɵ": "o",
            "ƣ": "oi",
            "ȣ": "ou",
            "ꝏ": "oo",
            "ⓟ": "p",
            "ｐ": "p",
            "ṕ": "p",
            "ṗ": "p",
            "ƥ": "p",
            "ᵽ": "p",
            "ꝑ": "p",
            "ꝓ": "p",
            "ꝕ": "p",
            "ⓠ": "q",
            "ｑ": "q",
            "ɋ": "q",
            "ꝗ": "q",
            "ꝙ": "q",
            "ⓡ": "r",
            "ｒ": "r",
            "ŕ": "r",
            "ṙ": "r",
            "ř": "r",
            "ȑ": "r",
            "ȓ": "r",
            "ṛ": "r",
            "ṝ": "r",
            "ŗ": "r",
            "ṟ": "r",
            "ɍ": "r",
            "ɽ": "r",
            "ꝛ": "r",
            "ꞧ": "r",
            "ꞃ": "r",
            "ⓢ": "s",
            "ｓ": "s",
            "ß": "s",
            "ś": "s",
            "ṥ": "s",
            "ŝ": "s",
            "ṡ": "s",
            "š": "s",
            "ṧ": "s",
            "ṣ": "s",
            "ṩ": "s",
            "ș": "s",
            "ş": "s",
            "ȿ": "s",
            "ꞩ": "s",
            "ꞅ": "s",
            "ẛ": "s",
            "ⓣ": "t",
            "ｔ": "t",
            "ṫ": "t",
            "ẗ": "t",
            "ť": "t",
            "ṭ": "t",
            "ț": "t",
            "ţ": "t",
            "ṱ": "t",
            "ṯ": "t",
            "ŧ": "t",
            "ƭ": "t",
            "ʈ": "t",
            "ⱦ": "t",
            "ꞇ": "t",
            "ꜩ": "tz",
            "ⓤ": "u",
            "ｕ": "u",
            "ù": "u",
            "ú": "u",
            "û": "u",
            "ũ": "u",
            "ṹ": "u",
            "ū": "u",
            "ṻ": "u",
            "ŭ": "u",
            "ü": "u",
            "ǜ": "u",
            "ǘ": "u",
            "ǖ": "u",
            "ǚ": "u",
            "ủ": "u",
            "ů": "u",
            "ű": "u",
            "ǔ": "u",
            "ȕ": "u",
            "ȗ": "u",
            "ư": "u",
            "ừ": "u",
            "ứ": "u",
            "ữ": "u",
            "ử": "u",
            "ự": "u",
            "ụ": "u",
            "ṳ": "u",
            "ų": "u",
            "ṷ": "u",
            "ṵ": "u",
            "ʉ": "u",
            "ⓥ": "v",
            "ｖ": "v",
            "ṽ": "v",
            "ṿ": "v",
            "ʋ": "v",
            "ꝟ": "v",
            "ʌ": "v",
            "ꝡ": "vy",
            "ⓦ": "w",
            "ｗ": "w",
            "ẁ": "w",
            "ẃ": "w",
            "ŵ": "w",
            "ẇ": "w",
            "ẅ": "w",
            "ẘ": "w",
            "ẉ": "w",
            "ⱳ": "w",
            "ⓧ": "x",
            "ｘ": "x",
            "ẋ": "x",
            "ẍ": "x",
            "ⓨ": "y",
            "ｙ": "y",
            "ỳ": "y",
            "ý": "y",
            "ŷ": "y",
            "ỹ": "y",
            "ȳ": "y",
            "ẏ": "y",
            "ÿ": "y",
            "ỷ": "y",
            "ẙ": "y",
            "ỵ": "y",
            "ƴ": "y",
            "ɏ": "y",
            "ỿ": "y",
            "ⓩ": "z",
            "ｚ": "z",
            "ź": "z",
            "ẑ": "z",
            "ż": "z",
            "ž": "z",
            "ẓ": "z",
            "ẕ": "z",
            "ƶ": "z",
            "ȥ": "z",
            "ɀ": "z",
            "ⱬ": "z",
            "ꝣ": "z"
        };
        $ = t(document), P = function () {
            var t = 1;
            return function () {
                return t++
            }
        }(), $.on("mousemove", function (t) {
            z.x = t.pageX, z.y = t.pageY
        }), E = M(Object, {
            bind: function (t) {
                var e = this;
                return function () {
                    t.apply(e, arguments)
                }
            }, init: function (i) {
                var n, r, o, a, h = ".select2-results";
                this.opts = i = this.prepareOpts(i), this.id = i.id, i.element.data("select2") !== e && null !== i.element.data("select2") && i.element.data("select2").destroy(), this.container = this.createContainer(), this.containerId = "s2id_" + (i.element.attr("id") || "autogen" + P()), this.containerSelector = "#" + this.containerId.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1"), this.container.attr("id", this.containerId), this.body = u(function () {
                    return i.element.closest("body")
                }), _(this.container, this.opts.element, this.opts.adaptContainerCssClass), this.container.attr("style", i.element.attr("style")), this.container.css(D(i.containerCss)), this.container.addClass(D(i.containerCssClass)), this.elementTabIndex = this.opts.element.attr("tabindex"), this.opts.element.data("select2", this).attr("tabindex", "-1").before(this.container).on("click.select2", m), this.container.data("select2", this), this.dropdown = this.container.find(".select2-drop"), _(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass), this.dropdown.addClass(D(i.dropdownCssClass)), this.dropdown.data("select2", this), this.dropdown.on("click", m), this.results = n = this.container.find(h), this.search = r = this.container.find("input.select2-input"), this.queryCount = 0, this.resultsPage = 0, this.context = null, this.initContainer(), this.container.on("click", m), c(this.results), this.dropdown.on("mousemove-filtered touchstart touchmove touchend", h, this.bind(this.highlightUnderEvent)), d(80, this.results), this.dropdown.on("scroll-debounced", h, this.bind(this.loadMoreIfNeeded)), t(this.container).on("change", ".select2-input", function (t) {
                    t.stopPropagation()
                }), t(this.dropdown).on("change", ".select2-input", function (t) {
                    t.stopPropagation()
                }), t.fn.mousewheel && n.mousewheel(function (t, e, i, s) {
                    var r = n.scrollTop();
                    s > 0 && 0 >= r - s ? (n.scrollTop(0), m(t)) : 0 > s && n.get(0).scrollHeight - n.scrollTop() + s <= n.height() && (n.scrollTop(n.get(0).scrollHeight - n.height()), m(t))
                }), l(r), r.on("keyup-change input paste", this.bind(this.updateResults)), r.on("focus", function () {
                    r.addClass("select2-focused")
                }), r.on("blur", function () {
                    r.removeClass("select2-focused")
                }), this.dropdown.on("mouseup", h, this.bind(function (e) {
                    t(e.target).closest(".select2-result-selectable").length > 0 && (this.highlightUnderEvent(e), this.selectHighlighted(e))
                })), this.dropdown.on("click mouseup mousedown", function (t) {
                    t.stopPropagation()
                }), t.isFunction(this.opts.initSelection) && (this.initSelection(), this.monitorSource()), null !== i.maximumInputLength && this.search.attr("maxlength", i.maximumInputLength);
                var o = i.element.prop("disabled");
                o === e && (o = !1), this.enable(!o);
                var a = i.element.prop("readonly");
                a === e && (a = !1), this.readonly(a), O = O || s(), this.autofocus = i.element.prop("autofocus"), i.element.prop("autofocus", !1), this.autofocus && this.focus(), this.nextSearchTerm = e
            }, destroy: function () {
                var t = this.opts.element, i = t.data("select2");
                this.close(), this.propertyObserver && (delete this.propertyObserver, this.propertyObserver = null), i !== e && (i.container.remove(), i.dropdown.remove(), t.removeClass("select2-offscreen").removeData("select2").off(".select2").prop("autofocus", this.autofocus || !1), this.elementTabIndex ? t.attr({tabindex: this.elementTabIndex}) : t.removeAttr("tabindex"), t.show())
            }, optionToData: function (t) {
                return t.is("option") ? {
                    id: t.prop("value"),
                    text: t.text(),
                    element: t.get(),
                    css: t.attr("class"),
                    disabled: t.prop("disabled"),
                    locked: r(t.attr("locked"), "locked") || r(t.data("locked"), !0)
                } : t.is("optgroup") ? {
                    text: t.attr("label"),
                    children: [],
                    element: t.get(),
                    css: t.attr("class")
                } : void 0
            }, prepareOpts: function (i) {
                var n, s, a, l, c = this;
                if (n = i.element, "select" === n.get(0).tagName.toLowerCase() && (this.select = s = i.element), s && t.each(["id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags"], function () {
                        if (this in i)throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.")
                    }), i = t.extend({}, {
                        populateResults: function (n, s, r) {
                            var o, a = this.opts.id;
                            (o = function (n, s, l) {
                                var h, u, d, p, f, m, g, v, _, y;
                                for (n = i.sortResults(n, s, r), h = 0, u = n.length; u > h; h += 1)d = n[h], f = d.disabled === !0, p = !f && a(d) !== e, m = d.children && d.children.length > 0, g = t("<li></li>"), g.addClass("select2-results-dept-" + l), g.addClass("select2-result"), g.addClass(p ? "select2-result-selectable" : "select2-result-unselectable"), f && g.addClass("select2-disabled"), m && g.addClass("select2-result-with-children"), g.addClass(c.opts.formatResultCssClass(d)), v = t(document.createElement("div")), v.addClass("select2-result-label"), y = i.formatResult(d, v, r, c.opts.escapeMarkup), y !== e && v.html(y), g.append(v), m && (_ = t("<ul></ul>"), _.addClass("select2-result-sub"), o(d.children, _, l + 1), g.append(_)), g.data("select2-data", d), s.append(g)
                            })(s, n, 0)
                        }
                    }, t.fn.select2.defaults, i), "function" != typeof i.id && (a = i.id, i.id = function (t) {
                        return t[a]
                    }), t.isArray(i.element.data("select2Tags"))) {
                    if ("tags" in i)throw"tags specified as both an attribute 'data-select2-tags' and in options of Select2 " + i.element.attr("id");
                    i.tags = i.element.data("select2Tags")
                }
                if (s ? (i.query = this.bind(function (t) {
                        var i, s, r, o = {results: [], more: !1}, a = t.term;
                        r = function (e, i) {
                            var n;
                            e.is("option") ? t.matcher(a, e.text(), e) && i.push(c.optionToData(e)) : e.is("optgroup") && (n = c.optionToData(e), e.children().each2(function (t, e) {
                                r(e, n.children)
                            }), n.children.length > 0 && i.push(n))
                        }, i = n.children(), this.getPlaceholder() !== e && i.length > 0 && (s = this.getPlaceholderOption(), s && (i = i.not(s))), i.each2(function (t, e) {
                            r(e, o.results)
                        }), t.callback(o)
                    }), i.id = function (t) {
                        return t.id
                    }, i.formatResultCssClass = function (t) {
                        return t.css
                    }) : "query" in i || ("ajax" in i ? (l = i.element.data("ajax-url"), l && l.length > 0 && (i.ajax.url = l), i.query = w.call(i.element, i.ajax)) : "data" in i ? i.query = x(i.data) : "tags" in i && (i.query = k(i.tags), i.createSearchChoice === e && (i.createSearchChoice = function (e) {
                        return {id: t.trim(e), text: t.trim(e)}
                    }), i.initSelection === e && (i.initSelection = function (e, n) {
                        var s = [];
                        t(o(e.val(), i.separator)).each(function () {
                            var e = {id: this, text: this}, n = i.tags;
                            t.isFunction(n) && (n = n()), t(n).each(function () {
                                return r(this.id, e.id) ? (e = this, !1) : void 0
                            }), s.push(e)
                        }), n(s)
                    }))), "function" != typeof i.query)throw"query function not defined for Select2 " + i.element.attr("id");
                return i
            }, monitorSource: function () {
                var t, i = this.opts.element;
                i.on("change.select2", this.bind(function (t) {
                    this.opts.element.data("select2-change-triggered") !== !0 && this.initSelection()
                })), t = this.bind(function () {
                    var t, n = i.prop("disabled");
                    n === e && (n = !1), this.enable(!n);
                    var t = i.prop("readonly");
                    t === e && (t = !1), this.readonly(t), _(this.container, this.opts.element, this.opts.adaptContainerCssClass), this.container.addClass(D(this.opts.containerCssClass)), _(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass), this.dropdown.addClass(D(this.opts.dropdownCssClass))
                }), i.on("propertychange.select2 DOMAttrModified.select2", t), this.mutationCallback === e && (this.mutationCallback = function (e) {
                    e.forEach(t)
                }), "undefined" != typeof WebKitMutationObserver && (this.propertyObserver && (delete this.propertyObserver, this.propertyObserver = null), this.propertyObserver = new WebKitMutationObserver(this.mutationCallback), this.propertyObserver.observe(i.get(0), {
                    attributes: !0,
                    subtree: !1
                }))
            }, triggerSelect: function (e) {
                var i = t.Event("select2-selecting", {val: this.id(e), object: e});
                return this.opts.element.trigger(i), !i.isDefaultPrevented()
            }, triggerChange: function (e) {
                e = e || {}, e = t.extend({}, e, {
                    type: "change",
                    val: this.val()
                }), this.opts.element.data("select2-change-triggered", !0), this.opts.element.trigger(e), this.opts.element.data("select2-change-triggered", !1), this.opts.element.click(), this.opts.blurOnChange && this.opts.element.blur()
            }, isInterfaceEnabled: function () {
                return this.enabledInterface === !0
            }, enableInterface: function () {
                var t = this._enabled && !this._readonly, e = !t;
                return t === this.enabledInterface ? !1 : (this.container.toggleClass("select2-container-disabled", e), this.close(), this.enabledInterface = t, !0)
            }, enable: function (t) {
                t === e && (t = !0), this._enabled !== t && (this._enabled = t, this.opts.element.prop("disabled", !t), this.enableInterface())
            }, disable: function () {
                this.enable(!1)
            }, readonly: function (t) {
                return t === e && (t = !1), this._readonly === t ? !1 : (this._readonly = t, this.opts.element.prop("readonly", t), this.enableInterface(), !0)
            }, opened: function () {
                return this.container.hasClass("select2-dropdown-open")
            }, positionDropdown: function () {
                var e, i, n, s, r = this.dropdown, o = this.container.offset(), a = this.container.outerHeight(!1), l = this.container.outerWidth(!1), c = r.outerHeight(!1), h = t(window).scrollLeft() + t(window).width(), u = t(window).scrollTop() + t(window).height(), d = o.top + a, p = o.left, f = u >= d + c, m = o.top - c >= this.body().scrollTop(), g = r.outerWidth(!1), v = h >= p + g, _ = r.hasClass("select2-drop-above");
                this.opts.dropdownAutoWidth ? (s = t(".select2-results", r)[0], r.addClass("select2-drop-auto-width"), r.css("width", ""), g = r.outerWidth(!1) + (s.scrollHeight === s.clientHeight ? 0 : O.width), g > l ? l = g : g = l, v = h >= p + g) : this.container.removeClass("select2-drop-auto-width"), "static" !== this.body().css("position") && (e = this.body().offset(), d -= e.top, p -= e.left), this.opts.alwaysBelow && (f = !0, m = !1), _ ? (i = !0, !m && f && (i = !1)) : (i = !1, !f && m && (i = !0)), v || (p = o.left + l - g), i ? (d = o.top - c, this.container.addClass("select2-drop-above"), r.addClass("select2-drop-above")) : (this.container.removeClass("select2-drop-above"), r.removeClass("select2-drop-above")), n = t.extend({
                    top: d,
                    left: p,
                    width: l
                }, D(this.opts.dropdownCss)), r.css(n)
            }, shouldOpen: function () {
                var e;
                return this.opened() ? !1 : this._enabled === !1 || this._readonly === !0 ? !1 : (e = t.Event("select2-opening"), this.opts.element.trigger(e), !e.isDefaultPrevented())
            }, clearDropdownAlignmentPreference: function () {
                this.container.removeClass("select2-drop-above"), this.dropdown.removeClass("select2-drop-above")
            }, open: function () {
                return this.shouldOpen() ? (this.opening(), !0) : !1
            }, opening: function () {
                var e, i = this.containerId, n = "scroll." + i, s = "resize." + i, r = "orientationchange." + i;
                this.container.addClass("select2-dropdown-open").addClass("select2-container-active"), this.clearDropdownAlignmentPreference(), this.dropdown[0] !== this.body().children().last()[0] && this.dropdown.detach().appendTo(this.body()), e = t("#select2-drop-mask"), 0 == e.length && (e = t(document.createElement("div")), e.attr("id", "select2-drop-mask").attr("class", "select2-drop-mask"), e.hide(), e.appendTo(this.body()), e.on("mousedown touchstart click", function (e) {
                    var i, n = t("#select2-drop");
                    n.length > 0 && (i = n.data("select2"), i.opts.selectOnBlur && i.selectHighlighted({noFocus: !0}), i.close({focus: !1}), e.preventDefault(), e.stopPropagation())
                })), this.dropdown.prev()[0] !== e[0] && this.dropdown.before(e), t("#select2-drop").removeAttr("id"), this.dropdown.attr("id", "select2-drop"), e.show(), this.positionDropdown(), this.dropdown.show(), this.positionDropdown(), this.dropdown.addClass("select2-drop-active");
                var o = this;
                this.container.parents().add(window).each(function () {
                    t(this).on(s + " " + n + " " + r, function (t) {
                        o.positionDropdown()
                    })
                })
            }, close: function () {
                if (this.opened()) {
                    var e = this.containerId, i = "scroll." + e, n = "resize." + e, s = "orientationchange." + e;
                    this.container.parents().add(window).each(function () {
                        t(this).off(i).off(n).off(s)
                    }), this.clearDropdownAlignmentPreference(), t("#select2-drop-mask").hide(), this.dropdown.removeAttr("id"), this.dropdown.hide(), this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active"), this.results.empty(), this.clearSearch(), this.search.removeClass("select2-active"), this.opts.element.trigger(t.Event("select2-close"))
                }
            }, externalSearch: function (t) {
                this.open(), this.search.val(t), this.updateResults(!1)
            }, clearSearch: function () {
            }, getMaximumSelectionSize: function () {
                return D(this.opts.maximumSelectionSize)
            }, ensureHighlightVisible: function () {
                var e, i, n, s, r, o, a, l = this.results;
                if (i = this.highlight(), !(0 > i)) {
                    if (0 == i)return void l.scrollTop(0);
                    e = this.findHighlightableChoices().find(".select2-result-label"), n = t(e[i]), s = n.offset().top + n.outerHeight(!0), i === e.length - 1 && (a = l.find("li.select2-more-results"), a.length > 0 && (s = a.offset().top + a.outerHeight(!0))), r = l.offset().top + l.outerHeight(!0), s > r && l.scrollTop(l.scrollTop() + (s - r)), o = n.offset().top - l.offset().top, 0 > o && "none" != n.css("display") && l.scrollTop(l.scrollTop() + o)
                }
            }, findHighlightableChoices: function () {
                return this.results.find(".select2-result-selectable:not(.select2-disabled)")
            }, moveHighlight: function (e) {
                for (var i = this.findHighlightableChoices(), n = this.highlight(); n > -1 && n < i.length;) {
                    n += e;
                    var s = t(i[n]);
                    if (s.hasClass("select2-result-selectable") && !s.hasClass("select2-disabled") && !s.hasClass("select2-selected")) {
                        this.highlight(n);
                        break
                    }
                }
            }, highlight: function (e) {
                var i, s, r = this.findHighlightableChoices();
                return 0 === arguments.length ? n(r.filter(".select2-highlighted")[0], r.get()) : (e >= r.length && (e = r.length - 1), 0 > e && (e = 0), this.removeHighlight(), i = t(r[e]), i.addClass("select2-highlighted"), this.ensureHighlightVisible(), s = i.data("select2-data"), void(s && this.opts.element.trigger({
                    type: "select2-highlight",
                    val: this.id(s),
                    choice: s
                })))
            }, removeHighlight: function () {
                this.results.find(".select2-highlighted").removeClass("select2-highlighted")
            }, countSelectableResults: function () {
                return this.findHighlightableChoices().length
            }, highlightUnderEvent: function (e) {
                var i = t(e.target).closest(".select2-result-selectable");
                if (i.length > 0 && !i.is(".select2-highlighted")) {
                    var n = this.findHighlightableChoices();
                    this.highlight(n.index(i))
                } else 0 == i.length && this.removeHighlight()
            }, loadMoreIfNeeded: function () {
                var t, e = this.results, i = e.find("li.select2-more-results"), n = this.resultsPage + 1, s = this, r = this.search.val(), o = this.context;
                0 !== i.length && (t = i.offset().top - e.offset().top - e.height(), t <= this.opts.loadMorePadding && (i.addClass("select2-active"), this.opts.query({
                    element: this.opts.element,
                    term: r,
                    page: n,
                    context: o,
                    matcher: this.opts.matcher,
                    callback: this.bind(function (t) {
                        s.opened() && (s.opts.populateResults.call(this, e, t.results, {
                            term: r,
                            page: n,
                            context: o
                        }), s.postprocessResults(t, !1, !1), t.more === !0 ? (i.detach().appendTo(e).text(s.opts.formatLoadMore(n + 1)), window.setTimeout(function () {
                            s.loadMoreIfNeeded()
                        }, 10)) : i.remove(), s.positionDropdown(), s.resultsPage = n, s.context = t.context, this.opts.element.trigger({
                            type: "select2-loaded",
                            items: t
                        }))
                    })
                })))
            }, tokenize: function () {
            }, updateResults: function (i) {
                function n() {
                    c.removeClass("select2-active"), d.positionDropdown()
                }

                function s(t) {
                    h.html(t), n()
                }

                var o, a, l, c = this.search, h = this.results, u = this.opts, d = this, p = c.val(), f = t.data(this.container, "select2-last-term");
                if ((i === !0 || !f || !r(p, f)) && (t.data(this.container, "select2-last-term", p), i === !0 || this.showSearchInput !== !1 && this.opened())) {
                    l = ++this.queryCount;
                    var m = this.getMaximumSelectionSize();
                    if (m >= 1 && (o = this.data(), t.isArray(o) && o.length >= m && C(u.formatSelectionTooBig, "formatSelectionTooBig")))return void s("<li class='select2-selection-limit'>" + u.formatSelectionTooBig(m) + "</li>");
                    if (c.val().length < u.minimumInputLength)return s(C(u.formatInputTooShort, "formatInputTooShort") ? "<li class='select2-no-results'>" + u.formatInputTooShort(c.val(), u.minimumInputLength) + "</li>" : ""), void(i && this.showSearch && this.showSearch(!0));
                    if (u.maximumInputLength && c.val().length > u.maximumInputLength)return void s(C(u.formatInputTooLong, "formatInputTooLong") ? "<li class='select2-no-results'>" + u.formatInputTooLong(c.val(), u.maximumInputLength) + "</li>" : "");
                    u.formatSearching && 0 === this.findHighlightableChoices().length && s("<li class='select2-searching'>" + u.formatSearching() + "</li>"), c.addClass("select2-active"), this.removeHighlight(), a = this.tokenize(), a != e && null != a && c.val(a), this.resultsPage = 1, u.query({
                        element: u.element,
                        term: c.val(),
                        page: this.resultsPage,
                        context: null,
                        matcher: u.matcher,
                        callback: this.bind(function (o) {
                            var a;
                            if (l == this.queryCount) {
                                if (!this.opened())return void this.search.removeClass("select2-active");
                                if (this.context = o.context === e ? null : o.context, this.opts.createSearchChoice && "" !== c.val() && (a = this.opts.createSearchChoice.call(d, c.val(), o.results), a !== e && null !== a && d.id(a) !== e && null !== d.id(a) && 0 === t(o.results).filter(function () {
                                        return r(d.id(this), d.id(a))
                                    }).length && o.results.unshift(a)), 0 === o.results.length && C(u.formatNoMatches, "formatNoMatches"))return void s("<li class='select2-no-results'>" + u.formatNoMatches(c.val()) + "</li>");
                                h.empty(), d.opts.populateResults.call(this, h, o.results, {
                                    term: c.val(),
                                    page: this.resultsPage,
                                    context: null
                                }), o.more === !0 && C(u.formatLoadMore, "formatLoadMore") && (h.append("<li class='select2-more-results'>" + d.opts.escapeMarkup(u.formatLoadMore(this.resultsPage)) + "</li>"), window.setTimeout(function () {
                                    d.loadMoreIfNeeded()
                                }, 10)), this.postprocessResults(o, i), n(), this.opts.element.trigger({
                                    type: "select2-loaded",
                                    items: o
                                })
                            }
                        })
                    })
                }
            }, cancel: function () {
                this.close()
            }, blur: function () {
                this.opts.selectOnBlur && this.selectHighlighted({noFocus: !0}), this.close(), this.container.removeClass("select2-container-active"), this.search[0] === document.activeElement && this.search.blur(), this.clearSearch(), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus")
            }, focusSearch: function () {
                p(this.search)
            }, selectHighlighted: function (t) {
                var e = this.highlight(), i = this.results.find(".select2-highlighted"), n = i.closest(".select2-result").data("select2-data");
                n ? (this.highlight(e), this.onSelect(n, t)) : t && t.noFocus && this.close()
            }, getPlaceholder: function () {
                var t;
                return this.opts.element.attr("placeholder") || this.opts.element.attr("data-placeholder") || this.opts.element.data("placeholder") || this.opts.placeholder || ((t = this.getPlaceholderOption()) !== e ? t.text() : e)
            }, getPlaceholderOption: function () {
                if (this.select) {
                    var t = this.select.children().first();
                    if (this.opts.placeholderOption !== e)return "first" === this.opts.placeholderOption && t || "function" == typeof this.opts.placeholderOption && this.opts.placeholderOption(this.select);
                    if ("" === t.text() && "" === t.val())return t
                }
            }, initContainerWidth: function () {
                function i() {
                    var i, n, s, r, o;
                    if ("off" === this.opts.width)return null;
                    if ("element" === this.opts.width)return 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px";
                    if ("copy" === this.opts.width || "resolve" === this.opts.width) {
                        if (i = this.opts.element.attr("style"), i !== e)for (n = i.split(";"), r = 0, o = n.length; o > r; r += 1)if (s = n[r].replace(/\s/g, "").match(/[^-]width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i), null !== s && s.length >= 1)return s[1];
                        return "resolve" === this.opts.width ? (i = this.opts.element.css("width"), i.indexOf("%") > 0 ? i : 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px") : null
                    }
                    return t.isFunction(this.opts.width) ? this.opts.width() : this.opts.width
                }

                var n = i.call(this);
                null !== n && this.container.css("width", n)
            }
        }), I = M(E, {
            createContainer: function () {
                var e = t(document.createElement("div")).attr({"class": "select2-container"}).html(["<a href='javascript:void(0)' onclick='return false;' class='select2-choice' tabindex='-1'>", "   <span class='select2-chosen'>&nbsp;</span><abbr class='select2-search-choice-close'></abbr>", "   <span class='select2-arrow'><b></b></span>", "</a>", "<input class='select2-focusser select2-offscreen' type='text'/>", "<div class='select2-drop select2-display-none'>", "   <div class='select2-search'>", "       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'/>", "   </div>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
                return e
            }, enableInterface: function () {
                this.parent.enableInterface.apply(this, arguments) && this.focusser.prop("disabled", !this.isInterfaceEnabled())
            }, opening: function () {
                var i, n, s;
                this.opts.minimumResultsForSearch >= 0 && this.showSearch(!0), this.parent.opening.apply(this, arguments), this.showSearchInput !== !1 && this.search.val(this.focusser.val()), this.search.focus(), i = this.search.get(0), i.createTextRange ? (n = i.createTextRange(), n.collapse(!1), n.select()) : i.setSelectionRange && (s = this.search.val().length, i.setSelectionRange(s, s)), "" === this.search.val() && this.nextSearchTerm != e && (this.search.val(this.nextSearchTerm), this.search.select()), this.focusser.prop("disabled", !0).val(""), this.updateResults(!0), this.opts.element.trigger(t.Event("select2-open"))
            }, close: function (t) {
                this.opened() && (this.parent.close.apply(this, arguments), t = t || {focus: !0}, this.focusser.removeAttr("disabled"), t.focus && this.focusser.focus())
            }, focus: function () {
                this.opened() ? this.close() : (this.focusser.removeAttr("disabled"), this.focusser.focus())
            }, isFocused: function () {
                return this.container.hasClass("select2-container-active")
            }, cancel: function () {
                this.parent.cancel.apply(this, arguments), this.focusser.removeAttr("disabled"), this.focusser.focus()
            }, destroy: function () {
                t("label[for='" + this.focusser.attr("id") + "']").attr("for", this.opts.element.attr("id")), this.parent.destroy.apply(this, arguments)
            }, initContainer: function () {
                var e, i = this.container, n = this.dropdown;
                this.showSearch(this.opts.minimumResultsForSearch < 0 ? !1 : !0), this.selection = e = i.find(".select2-choice"), this.focusser = i.find(".select2-focusser"), this.focusser.attr("id", "s2id_autogen" + P()), t("label[for='" + this.opts.element.attr("id") + "']").attr("for", this.focusser.attr("id")), this.focusser.attr("tabindex", this.elementTabIndex), this.search.on("keydown", this.bind(function (t) {
                    if (this.isInterfaceEnabled()) {
                        if (t.which === F.PAGE_UP || t.which === F.PAGE_DOWN)return void m(t);
                        switch (t.which) {
                            case F.UP:
                            case F.DOWN:
                                return this.moveHighlight(t.which === F.UP ? -1 : 1), void m(t);
                            case F.ENTER:
                                return this.selectHighlighted(), void m(t);
                            case F.TAB:
                                return void this.selectHighlighted({noFocus: !0});
                            case F.ESC:
                                return this.cancel(t), void m(t)
                        }
                    }
                })), this.search.on("blur", this.bind(function (t) {
                    document.activeElement === this.body().get(0) && window.setTimeout(this.bind(function () {
                        this.search.focus()
                    }), 0)
                })), this.focusser.on("keydown", this.bind(function (t) {
                    if (this.isInterfaceEnabled() && t.which !== F.TAB && !F.isControl(t) && !F.isFunctionKey(t) && t.which !== F.ESC) {
                        if (this.opts.openOnEnter === !1 && t.which === F.ENTER)return void m(t);
                        if (t.which == F.DOWN || t.which == F.UP || t.which == F.ENTER && this.opts.openOnEnter) {
                            if (t.altKey || t.ctrlKey || t.shiftKey || t.metaKey)return;
                            return this.open(), void m(t)
                        }
                        return t.which == F.DELETE || t.which == F.BACKSPACE ? (this.opts.allowClear && this.clear(), void m(t)) : void 0
                    }
                })), l(this.focusser), this.focusser.on("keyup-change input", this.bind(function (t) {
                    if (this.opts.minimumResultsForSearch >= 0) {
                        if (t.stopPropagation(), this.opened())return;
                        this.open()
                    }
                })), e.on("mousedown", "abbr", this.bind(function (t) {
                    this.isInterfaceEnabled() && (this.clear(), g(t), this.close(), this.selection.focus())
                })), e.on("mousedown", this.bind(function (e) {
                    this.container.hasClass("select2-container-active") || this.opts.element.trigger(t.Event("select2-focus")), this.opened() ? this.close() : this.isInterfaceEnabled() && this.open(), m(e)
                })), n.on("mousedown", this.bind(function () {
                    this.search.focus()
                })), e.on("focus", this.bind(function (t) {
                    m(t)
                })), this.focusser.on("focus", this.bind(function () {
                    this.container.hasClass("select2-container-active") || this.opts.element.trigger(t.Event("select2-focus")), this.container.addClass("select2-container-active")
                })).on("blur", this.bind(function () {
                    this.opened() || (this.container.removeClass("select2-container-active"), this.opts.element.trigger(t.Event("select2-blur")))
                })), this.search.on("focus", this.bind(function () {
                    this.container.hasClass("select2-container-active") || this.opts.element.trigger(t.Event("select2-focus")), this.container.addClass("select2-container-active")
                })), this.initContainerWidth(), this.opts.element.addClass("select2-offscreen"), this.setPlaceholder()
            }, clear: function (e) {
                var i = this.selection.data("select2-data");
                if (i) {
                    var n = t.Event("select2-clearing");
                    if (this.opts.element.trigger(n), n.isDefaultPrevented())return;
                    var s = this.getPlaceholderOption();
                    this.opts.element.val(s ? s.val() : ""), this.selection.find(".select2-chosen").empty(), this.selection.removeData("select2-data"), this.setPlaceholder(), e !== !1 && (this.opts.element.trigger({
                        type: "select2-removed",
                        val: this.id(i),
                        choice: i
                    }), this.triggerChange({removed: i}))
                }
            }, initSelection: function () {
                if (this.isPlaceholderOptionSelected())this.updateSelection(null), this.close(), this.setPlaceholder(); else {
                    var t = this;
                    this.opts.initSelection.call(null, this.opts.element, function (i) {
                        i !== e && null !== i && (t.updateSelection(i), t.close(), t.setPlaceholder())
                    })
                }
            }, isPlaceholderOptionSelected: function () {
                var t;
                return this.getPlaceholder() ? (t = this.getPlaceholderOption()) !== e && t.is(":selected") || "" === this.opts.element.val() || this.opts.element.val() === e || null === this.opts.element.val() : !1
            }, prepareOpts: function () {
                var e = this.parent.prepareOpts.apply(this, arguments), i = this;
                return "select" === e.element.get(0).tagName.toLowerCase() ? e.initSelection = function (t, e) {
                    var n = t.find(":selected");
                    e(i.optionToData(n))
                } : "data" in e && (e.initSelection = e.initSelection || function (i, n) {
                        var s = i.val(), o = null;
                        e.query({
                            matcher: function (t, i, n) {
                                var a = r(s, e.id(n));
                                return a && (o = n), a
                            }, callback: t.isFunction(n) ? function () {
                                n(o)
                            } : t.noop
                        })
                    }), e
            }, getPlaceholder: function () {
                return this.select && this.getPlaceholderOption() === e ? e : this.parent.getPlaceholder.apply(this, arguments)
            }, setPlaceholder: function () {
                var t = this.getPlaceholder();
                if (this.isPlaceholderOptionSelected() && t !== e) {
                    if (this.select && this.getPlaceholderOption() === e)return;
                    this.selection.find(".select2-chosen").html(this.opts.escapeMarkup(t)), this.selection.addClass("select2-default"), this.container.removeClass("select2-allowclear")
                }
            }, postprocessResults: function (t, e, i) {
                var n = 0, s = this;
                if (this.findHighlightableChoices().each2(function (t, e) {
                        return r(s.id(e.data("select2-data")), s.opts.element.val()) ? (n = t, !1) : void 0
                    }), i !== !1 && this.highlight(e === !0 && n >= 0 ? n : 0), e === !0) {
                    var o = this.opts.minimumResultsForSearch;
                    o >= 0 && this.showSearch(T(t.results) >= o)
                }
            }, showSearch: function (e) {
                this.showSearchInput !== e && (this.showSearchInput = e, this.dropdown.find(".select2-search").toggleClass("select2-search-hidden", !e), this.dropdown.find(".select2-search").toggleClass("select2-offscreen", !e), t(this.dropdown, this.container).toggleClass("select2-with-searchbox", e))
            }, onSelect: function (t, e) {
                if (this.triggerSelect(t)) {
                    var i = this.opts.element.val(), n = this.data();
                    this.opts.element.val(this.id(t)), this.updateSelection(t), this.opts.element.trigger({
                        type: "select2-selected",
                        val: this.id(t),
                        choice: t
                    }), this.nextSearchTerm = this.opts.nextSearchTerm(t, this.search.val()), this.close(), e && e.noFocus || this.focusser.focus(), r(i, this.id(t)) || this.triggerChange({
                        added: t,
                        removed: n
                    })
                }
            }, updateSelection: function (t) {
                var i, n, s = this.selection.find(".select2-chosen");
                this.selection.data("select2-data", t), s.empty(), null !== t && (i = this.opts.formatSelection(t, s, this.opts.escapeMarkup)), i !== e && s.append(i), n = this.opts.formatSelectionCssClass(t, s), n !== e && s.addClass(n), this.selection.removeClass("select2-default"), this.opts.allowClear && this.getPlaceholder() !== e && this.container.addClass("select2-allowclear")
            }, val: function () {
                var t, i = !1, n = null, s = this, r = this.data();
                if (0 === arguments.length)return this.opts.element.val();
                if (t = arguments[0], arguments.length > 1 && (i = arguments[1]), this.select)this.select.val(t).find(":selected").each2(function (t, e) {
                    return n = s.optionToData(e), !1
                }), this.updateSelection(n), this.setPlaceholder(), i && this.triggerChange({
                    added: n,
                    removed: r
                }); else {
                    if (!t && 0 !== t)return void this.clear(i);
                    if (this.opts.initSelection === e)throw new Error("cannot call val() if initSelection() is not defined");
                    this.opts.element.val(t), this.opts.initSelection(this.opts.element, function (t) {
                        s.opts.element.val(t ? s.id(t) : ""), s.updateSelection(t), s.setPlaceholder(), i && s.triggerChange({
                            added: t,
                            removed: r
                        })
                    })
                }
            }, clearSearch: function () {
                this.search.val(""), this.focusser.val("")
            }, data: function (t) {
                var i, n = !1;
                return 0 === arguments.length ? (i = this.selection.data("select2-data"), i == e && (i = null), i) : (arguments.length > 1 && (n = arguments[1]), void(t ? (i = this.data(), this.opts.element.val(t ? this.id(t) : ""), this.updateSelection(t), n && this.triggerChange({
                    added: t,
                    removed: i
                })) : this.clear(n)))
            }
        }), A = M(E, {
            createContainer: function () {
                var e = t(document.createElement("div")).attr({"class": "select2-container select2-container-multi"}).html(["<ul class='select2-choices'>", "  <li class='select2-search-field'>", "    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'>", "  </li>", "</ul>", "<div class='select2-drop select2-drop-multi select2-display-none'>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
                return e
            }, prepareOpts: function () {
                var e = this.parent.prepareOpts.apply(this, arguments), i = this;
                return "select" === e.element.get(0).tagName.toLowerCase() ? e.initSelection = function (t, e) {
                    var n = [];
                    t.find(":selected").each2(function (t, e) {
                        n.push(i.optionToData(e))
                    }), e(n)
                } : "data" in e && (e.initSelection = e.initSelection || function (i, n) {
                        var s = o(i.val(), e.separator), a = [];
                        e.query({
                            matcher: function (i, n, o) {
                                var l = t.grep(s, function (t) {
                                    return r(t, e.id(o))
                                }).length;
                                return l && a.push(o), l
                            }, callback: t.isFunction(n) ? function () {
                                for (var t = [], i = 0; i < s.length; i++)for (var o = s[i], l = 0; l < a.length; l++) {
                                    var c = a[l];
                                    if (r(o, e.id(c))) {
                                        t.push(c), a.splice(l, 1);
                                        break
                                    }
                                }
                                n(t)
                            } : t.noop
                        })
                    }), e
            }, selectChoice: function (t) {
                var e = this.container.find(".select2-search-choice-focus");
                e.length && t && t[0] == e[0] || (e.length && this.opts.element.trigger("choice-deselected", e), e.removeClass("select2-search-choice-focus"), t && t.length && (this.close(), t.addClass("select2-search-choice-focus"), this.opts.element.trigger("choice-selected", t)))
            }, destroy: function () {
                t("label[for='" + this.search.attr("id") + "']").attr("for", this.opts.element.attr("id")), this.parent.destroy.apply(this, arguments)
            }, initContainer: function () {
                var e, i = ".select2-choices";
                this.searchContainer = this.container.find(".select2-search-field"), this.selection = e = this.container.find(i);
                var n = this;
                this.selection.on("click", ".select2-search-choice:not(.select2-locked)", function (e) {
                    n.search[0].focus(), n.selectChoice(t(this))
                }), this.search.attr("id", "s2id_autogen" + P()), t("label[for='" + this.opts.element.attr("id") + "']").attr("for", this.search.attr("id")), this.search.on("input paste", this.bind(function () {
                    this.isInterfaceEnabled() && (this.opened() || this.open())
                })), this.search.attr("tabindex", this.elementTabIndex), this.keydowns = 0, this.search.on("keydown", this.bind(function (t) {
                    if (this.isInterfaceEnabled()) {
                        ++this.keydowns;
                        var i = e.find(".select2-search-choice-focus"), n = i.prev(".select2-search-choice:not(.select2-locked)"), s = i.next(".select2-search-choice:not(.select2-locked)"), r = f(this.search);
                        if (i.length && (t.which == F.LEFT || t.which == F.RIGHT || t.which == F.BACKSPACE || t.which == F.DELETE || t.which == F.ENTER)) {
                            var o = i;
                            return t.which == F.LEFT && n.length ? o = n : t.which == F.RIGHT ? o = s.length ? s : null : t.which === F.BACKSPACE ? (this.unselect(i.first()), this.search.width(10), o = n.length ? n : s) : t.which == F.DELETE ? (this.unselect(i.first()), this.search.width(10), o = s.length ? s : null) : t.which == F.ENTER && (o = null), this.selectChoice(o), m(t), void(o && o.length || this.open())
                        }
                        if ((t.which === F.BACKSPACE && 1 == this.keydowns || t.which == F.LEFT) && 0 == r.offset && !r.length)return this.selectChoice(e.find(".select2-search-choice:not(.select2-locked)").last()), void m(t);
                        if (this.selectChoice(null), this.opened())switch (t.which) {
                            case F.UP:
                            case F.DOWN:
                                return this.moveHighlight(t.which === F.UP ? -1 : 1), void m(t);
                            case F.ENTER:
                                return this.selectHighlighted(), void m(t);
                            case F.TAB:
                                return this.selectHighlighted({noFocus: !0}), void this.close();
                            case F.ESC:
                                return this.cancel(t), void m(t)
                        }
                        if (t.which !== F.TAB && !F.isControl(t) && !F.isFunctionKey(t) && t.which !== F.BACKSPACE && t.which !== F.ESC) {
                            if (t.which === F.ENTER) {
                                if (this.opts.openOnEnter === !1)return;
                                if (t.altKey || t.ctrlKey || t.shiftKey || t.metaKey)return
                            }
                            this.open(), (t.which === F.PAGE_UP || t.which === F.PAGE_DOWN) && m(t), t.which === F.ENTER && m(t)
                        }
                    }
                })), this.search.on("keyup", this.bind(function (t) {
                    this.keydowns = 0, this.resizeSearch()
                })), this.search.on("blur", this.bind(function (e) {
                    this.container.removeClass("select2-container-active"), this.search.removeClass("select2-focused"), this.selectChoice(null), this.opened() || this.clearSearch(), e.stopImmediatePropagation(), this.opts.element.trigger(t.Event("select2-blur"))
                })), this.container.on("click", i, this.bind(function (e) {
                    this.isInterfaceEnabled() && (t(e.target).closest(".select2-search-choice").length > 0 || (this.selectChoice(null), this.clearPlaceholder(), this.container.hasClass("select2-container-active") || this.opts.element.trigger(t.Event("select2-focus")), this.open(), this.focusSearch(), e.preventDefault()))
                })), this.container.on("focus", i, this.bind(function () {
                    this.isInterfaceEnabled() && (this.container.hasClass("select2-container-active") || this.opts.element.trigger(t.Event("select2-focus")), this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"), this.clearPlaceholder())
                })), this.initContainerWidth(), this.opts.element.addClass("select2-offscreen"), this.clearSearch()
            }, enableInterface: function () {
                this.parent.enableInterface.apply(this, arguments) && this.search.prop("disabled", !this.isInterfaceEnabled())
            }, initSelection: function () {
                if ("" === this.opts.element.val() && "" === this.opts.element.text() && (this.updateSelection([]), this.close(), this.clearSearch()), this.select || "" !== this.opts.element.val()) {
                    var t = this;
                    this.opts.initSelection.call(null, this.opts.element, function (i) {
                        i !== e && null !== i && (t.updateSelection(i), t.close(), t.clearSearch())
                    })
                }
            }, clearSearch: function () {
                var t = this.getPlaceholder(), i = this.getMaxSearchWidth();
                t !== e && 0 === this.getVal().length && this.search.hasClass("select2-focused") === !1 ? (this.search.val(t).addClass("select2-default"), this.search.width(i > 0 ? i : this.container.css("width"))) : this.search.val("").width(10)
            }, clearPlaceholder: function () {
                this.search.hasClass("select2-default") && this.search.val("").removeClass("select2-default")
            }, opening: function () {
                this.clearPlaceholder(), this.resizeSearch(), this.parent.opening.apply(this, arguments), this.focusSearch(), this.updateResults(!0), this.search.focus(), this.opts.element.trigger(t.Event("select2-open"))
            }, close: function () {
                this.opened() && this.parent.close.apply(this, arguments)
            }, focus: function () {
                this.close(), this.search.focus()
            }, isFocused: function () {
                return this.search.hasClass("select2-focused")
            }, updateSelection: function (e) {
                var i = [], s = [], r = this;
                t(e).each(function () {
                    n(r.id(this), i) < 0 && (i.push(r.id(this)), s.push(this))
                }), e = s, this.selection.find(".select2-search-choice").remove(), t(e).each(function () {
                    r.addSelectedChoice(this)
                }), r.postprocessResults()
            }, tokenize: function () {
                var t = this.search.val();
                t = this.opts.tokenizer.call(this, t, this.data(), this.bind(this.onSelect), this.opts), null != t && t != e && (this.search.val(t), t.length > 0 && this.open())
            }, onSelect: function (t, e) {
                this.triggerSelect(t) && (this.addSelectedChoice(t), this.opts.element.trigger({
                    type: "selected",
                    val: this.id(t),
                    choice: t
                }), (this.select || !this.opts.closeOnSelect) && this.postprocessResults(t, !1, this.opts.closeOnSelect === !0), this.opts.closeOnSelect ? (this.close(), this.search.width(10)) : this.countSelectableResults() > 0 ? (this.search.width(10), this.resizeSearch(), this.getMaximumSelectionSize() > 0 && this.val().length >= this.getMaximumSelectionSize() && this.updateResults(!0), this.positionDropdown()) : (this.close(), this.search.width(10)), this.triggerChange({added: t}), e && e.noFocus || this.focusSearch())
            }, cancel: function () {
                this.close(), this.focusSearch()
            }, addSelectedChoice: function (i) {
                var n, s, r = !i.locked, o = t("<li class='select2-search-choice'>    <div></div>    <a href='#' onclick='return false;' class='select2-search-choice-close' tabindex='-1'></a></li>"), a = t("<li class='select2-search-choice select2-locked'><div></div></li>"), l = r ? o : a, c = this.id(i), h = this.getVal();
                n = this.opts.formatSelection(i, l.find("div"), this.opts.escapeMarkup), n != e && l.find("div").replaceWith("<div>" + n + "</div>"), s = this.opts.formatSelectionCssClass(i, l.find("div")), s != e && l.addClass(s), r && l.find(".select2-search-choice-close").on("mousedown", m).on("click dblclick", this.bind(function (e) {
                    this.isInterfaceEnabled() && (t(e.target).closest(".select2-search-choice").fadeOut("fast", this.bind(function () {
                        this.unselect(t(e.target)), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"), this.close(), this.focusSearch()
                    })).dequeue(), m(e))
                })).on("focus", this.bind(function () {
                    this.isInterfaceEnabled() && (this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"))
                })), l.data("select2-data", i), l.insertBefore(this.searchContainer), h.push(c), this.setVal(h)
            }, unselect: function (t) {
                var e, i, s = this.getVal();
                if (t = t.closest(".select2-search-choice"), 0 === t.length)throw"Invalid argument: " + t + ". Must be .select2-search-choice";
                if (e = t.data("select2-data")) {
                    for (; (i = n(this.id(e), s)) >= 0;)s.splice(i, 1), this.setVal(s), this.select && this.postprocessResults();
                    t.remove(), this.opts.element.trigger({
                        type: "removed",
                        val: this.id(e),
                        choice: e
                    }), this.triggerChange({removed: e})
                }
            }, postprocessResults: function (t, e, i) {
                var s = this.getVal(), r = this.results.find(".select2-result"), o = this.results.find(".select2-result-with-children"), a = this;
                r.each2(function (t, e) {
                    var i = a.id(e.data("select2-data"));
                    n(i, s) >= 0 && (e.addClass("select2-selected"), e.find(".select2-result-selectable").addClass("select2-selected"))
                }), o.each2(function (t, e) {
                    e.is(".select2-result-selectable") || 0 !== e.find(".select2-result-selectable:not(.select2-selected)").length || e.addClass("select2-selected")
                }), -1 == this.highlight() && i !== !1 && a.highlight(0), !this.opts.createSearchChoice && !r.filter(".select2-result:not(.select2-selected)").length > 0 && (!t || t && !t.more && 0 === this.results.find(".select2-no-results").length) && C(a.opts.formatNoMatches, "formatNoMatches") && this.results.append("<li class='select2-no-results'>" + a.opts.formatNoMatches(a.search.val()) + "</li>")
            }, getMaxSearchWidth: function () {
                return this.selection.width() - a(this.search)
            }, resizeSearch: function () {
                var t, e, i, n, s, r = a(this.search);
                t = v(this.search) + 10, e = this.search.offset().left, i = this.selection.width(), n = this.selection.offset().left, s = i - (e - n) - r, t > s && (s = i - r), 40 > s && (s = i - r), 0 >= s && (s = t), this.search.width(Math.floor(s))
            }, getVal: function () {
                var t;
                return this.select ? (t = this.select.val(), null === t ? [] : t) : (t = this.opts.element.val(), o(t, this.opts.separator))
            }, setVal: function (e) {
                var i;
                this.select ? this.select.val(e) : (i = [], t(e).each(function () {
                    n(this, i) < 0 && i.push(this)
                }), this.opts.element.val(0 === i.length ? "" : i.join(this.opts.separator)))
            }, buildChangeDetails: function (t, e) {
                for (var e = e.slice(0), t = t.slice(0), i = 0; i < e.length; i++)for (var n = 0; n < t.length; n++)r(this.opts.id(e[i]), this.opts.id(t[n])) && (e.splice(i, 1), i--, t.splice(n, 1), n--);
                return {added: e, removed: t}
            }, val: function (i, n) {
                var s, r = this;
                if (0 === arguments.length)return this.getVal();
                if (s = this.data(), s.length || (s = []), !i && 0 !== i)return this.opts.element.val(""), this.updateSelection([]), this.clearSearch(), void(n && this.triggerChange({
                    added: this.data(),
                    removed: s
                }));
                if (this.setVal(i), this.select)this.opts.initSelection(this.select, this.bind(this.updateSelection)), n && this.triggerChange(this.buildChangeDetails(s, this.data())); else {
                    if (this.opts.initSelection === e)throw new Error("val() cannot be called if initSelection() is not defined");
                    this.opts.initSelection(this.opts.element, function (e) {
                        var i = t.map(e, r.id);
                        r.setVal(i), r.updateSelection(e), r.clearSearch(), n && r.triggerChange(r.buildChangeDetails(s, this.data()))
                    })
                }
                this.clearSearch()
            }, onSortStart: function () {
                if (this.select)throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");
                this.search.width(0), this.searchContainer.hide()
            }, onSortEnd: function () {
                var e = [], i = this;
                this.searchContainer.show(), this.searchContainer.appendTo(this.searchContainer.parent()), this.resizeSearch(), this.selection.find(".select2-search-choice").each(function () {
                    e.push(i.opts.id(t(this).data("select2-data")))
                }), this.setVal(e), this.triggerChange()
            }, data: function (e, i) {
                var n, s, r = this;
                return 0 === arguments.length ? this.selection.find(".select2-search-choice").map(function () {
                    return t(this).data("select2-data")
                }).get() : (s = this.data(), e || (e = []), n = t.map(e, function (t) {
                    return r.opts.id(t)
                }), this.setVal(n), this.updateSelection(e), this.clearSearch(), i && this.triggerChange(this.buildChangeDetails(s, this.data())), void 0)
            }
        }), t.fn.select2 = function () {
            var i, s, r, o, a, l = Array.prototype.slice.call(arguments, 0), c = ["val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "dropdown", "onSortStart", "onSortEnd", "enable", "disable", "readonly", "positionDropdown", "data", "search"], h = ["opened", "isFocused", "container", "dropdown"], u = ["val", "data"], d = {search: "externalSearch"};
            return this.each(function () {
                if (0 === l.length || "object" == typeof l[0])i = 0 === l.length ? {} : t.extend({}, l[0]), i.element = t(this), "select" === i.element.get(0).tagName.toLowerCase() ? a = i.element.prop("multiple") : (a = i.multiple || !1, "tags" in i && (i.multiple = a = !0)), s = a ? new A : new I, s.init(i); else {
                    if ("string" != typeof l[0])throw"Invalid arguments to select2 plugin: " + l;
                    if (n(l[0], c) < 0)throw"Unknown method: " + l[0];
                    if (o = e, s = t(this).data("select2"), s === e)return;
                    if (r = l[0], "container" === r ? o = s.container : "dropdown" === r ? o = s.dropdown : (d[r] && (r = d[r]), o = s[r].apply(s, l.slice(1))), n(l[0], h) >= 0 || n(l[0], u) && 1 == l.length)return !1
                }
            }), o === e ? this : o
        }, t.fn.select2.defaults = {
            width: "copy",
            loadMorePadding: 0,
            closeOnSelect: !0,
            openOnEnter: !0,
            containerCss: {},
            dropdownCss: {},
            containerCssClass: "",
            dropdownCssClass: "",
            formatResult: function (t, e, i, n) {
                var s = [];
                return y(t.text, i.term, s, n), s.join("")
            },
            formatSelection: function (t, i, n) {
                return t ? n(t.text) : e
            },
            sortResults: function (t, e, i) {
                return t
            },
            formatResultCssClass: function (t) {
                return e
            },
            formatSelectionCssClass: function (t, i) {
                return e
            },
            formatNoMatches: function () {
                return "No matches found"
            },
            formatInputTooShort: function (t, e) {
                var i = e - t.length;
                return "Please enter " + i + " more character" + (1 == i ? "" : "s")
            },
            formatInputTooLong: function (t, e) {
                var i = t.length - e;
                return "Please delete " + i + " character" + (1 == i ? "" : "s")
            },
            formatSelectionTooBig: function (t) {
                return "You can only select " + t + " item" + (1 == t ? "" : "s")
            },
            formatLoadMore: function (t) {
                return "Loading more results..."
            },
            formatSearching: function () {
                return "Searching..."
            },
            minimumResultsForSearch: 0,
            minimumInputLength: 0,
            maximumInputLength: null,
            maximumSelectionSize: 0,
            id: function (t) {
                return t.id
            },
            matcher: function (t, e) {
                return i("" + e).toUpperCase().indexOf(i("" + t).toUpperCase()) >= 0
            },
            separator: ",",
            tokenSeparators: [],
            tokenizer: S,
            escapeMarkup: b,
            blurOnChange: !1,
            selectOnBlur: !1,
            adaptContainerCssClass: function (t) {
                return t
            },
            adaptDropdownCssClass: function (t) {
                return null
            },
            nextSearchTerm: function (t, i) {
                return e
            }
        }, t.fn.select2.ajaxDefaults = {
            transport: t.ajax,
            params: {type: "GET", cache: !1, dataType: "json"}
        }, window.Select2 = {
            query: {ajax: w, local: x, tags: k},
            util: {debounce: h, markMatch: y, escapeMarkup: b, stripDiacritics: i},
            "class": {"abstract": E, single: I, multi: A}
        }, t.extend(t.fn.select2.defaults, {
            formatNoMatches: function () {
                return "没有找到匹配项"
            }, formatInputTooShort: function (t, e) {
                var i = e - t.length;
                return "请再输入" + i + "个字符"
            }, formatInputTooLong: function (t, e) {
                var i = t.length - e;
                return "请删掉" + i + "个字符"
            }, formatSelectionTooBig: function (t) {
                return "你只能选择最多" + t + "项"
            }, formatLoadMore: function (t) {
                return "加载结果中..."
            }, formatSearching: function () {
                return "搜索中..."
            }
        })
    }
}(jQuery), define("select2", ["jquery"], function () {
}), define("common", ["jquery", "underscore", "core/event", "components/backtop/1.0.0/backtop", "components/float_service/1.0.0/main", "core/auth", "components/spider/spider", "chosen", "select2"], function (t, e) {
    return t.ajaxPrefilter(function (t) {
        if (window._global.online_debug === !0 && window._global.debug === !0) {
            var e = t.url;
            if (e.indexOf("?") > 0) {
                var i = e.split("?"), n = i[1].split("&");
                n.push("debug=" + window._global.debug), e = i[0] + "?" + n.join("&")
            } else e += "?debug=" + window._global.debug;
            t.url = e
        }
    }), t(function () {
        var i = window, n = function () {
            var e = i.innerHeight, n = t("aside.sidebar"), s = e - 66;
            n.css({minHeight: s})
        };
        n();
        var s = e.throttle(n, 500);
        t(i).resize(s)
    }), t
}), define("tpl", {
    load: function (t) {
        throw new Error("Dynamic load not allowed: " + t)
    }
}), function (t, e) {
    function i(e, i) {
        var s, r, o, a = e.nodeName.toLowerCase();
        return "area" === a ? (s = e.parentNode, r = s.name, e.href && r && "map" === s.nodeName.toLowerCase() ? (o = t("img[usemap=#" + r + "]")[0], !!o && n(o)) : !1) : (/input|select|textarea|button|object/.test(a) ? !e.disabled : "a" === a ? e.href || i : i) && n(e)
    }

    function n(e) {
        return t.expr.filters.visible(e) && !t(e).parents().addBack().filter(function () {
                return "hidden" === t.css(this, "visibility")
            }).length
    }

    var s = 0, r = /^ui-id-\d+$/;
    t.ui = t.ui || {}, t.extend(t.ui, {
        version: "1.10.3",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), t.fn.extend({
        focus: function (e) {
            return function (i, n) {
                return "number" == typeof i ? this.each(function () {
                    var e = this;
                    setTimeout(function () {
                        t(e).focus(), n && n.call(e)
                    }, i)
                }) : e.apply(this, arguments)
            }
        }(t.fn.focus), scrollParent: function () {
            var e;
            return e = t.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
                return /(relative|absolute|fixed)/.test(t.css(this, "position")) && /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"))
            }).eq(0) : this.parents().filter(function () {
                return /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"))
            }).eq(0), /fixed/.test(this.css("position")) || !e.length ? t(document) : e
        }, zIndex: function (i) {
            if (i !== e)return this.css("zIndex", i);
            if (this.length)for (var n, s, r = t(this[0]); r.length && r[0] !== document;) {
                if (n = r.css("position"), ("absolute" === n || "relative" === n || "fixed" === n) && (s = parseInt(r.css("zIndex"), 10), !isNaN(s) && 0 !== s))return s;
                r = r.parent()
            }
            return 0
        }, uniqueId: function () {
            return this.each(function () {
                this.id || (this.id = "ui-id-" + ++s)
            })
        }, removeUniqueId: function () {
            return this.each(function () {
                r.test(this.id) && t(this).removeAttr("id")
            })
        }
    }), t.extend(t.expr[":"], {
        data: t.expr.createPseudo ? t.expr.createPseudo(function (e) {
            return function (i) {
                return !!t.data(i, e)
            }
        }) : function (e, i, n) {
            return !!t.data(e, n[3])
        }, focusable: function (e) {
            return i(e, !isNaN(t.attr(e, "tabindex")))
        }, tabbable: function (e) {
            var n = t.attr(e, "tabindex"), s = isNaN(n);
            return (s || n >= 0) && i(e, !s)
        }
    }), t("<a>").outerWidth(1).jquery || t.each(["Width", "Height"], function (i, n) {
        function s(e, i, n, s) {
            return t.each(r, function () {
                i -= parseFloat(t.css(e, "padding" + this)) || 0, n && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), s && (i -= parseFloat(t.css(e, "margin" + this)) || 0)
            }), i
        }

        var r = "Width" === n ? ["Left", "Right"] : ["Top", "Bottom"], o = n.toLowerCase(), a = {
            innerWidth: t.fn.innerWidth,
            innerHeight: t.fn.innerHeight,
            outerWidth: t.fn.outerWidth,
            outerHeight: t.fn.outerHeight
        };
        t.fn["inner" + n] = function (i) {
            return i === e ? a["inner" + n].call(this) : this.each(function () {
                t(this).css(o, s(this, i) + "px")
            })
        }, t.fn["outer" + n] = function (e, i) {
            return "number" != typeof e ? a["outer" + n].call(this, e) : this.each(function () {
                t(this).css(o, s(this, e, !0, i) + "px")
            })
        }
    }), t.fn.addBack || (t.fn.addBack = function (t) {
        return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
    }), t("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (t.fn.removeData = function (e) {
        return function (i) {
            return arguments.length ? e.call(this, t.camelCase(i)) : e.call(this)
        }
    }(t.fn.removeData)), t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), t.support.selectstart = "onselectstart" in document.createElement("div"), t.fn.extend({
        disableSelection: function () {
            return this.bind((t.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (t) {
                t.preventDefault()
            })
        }, enableSelection: function () {
            return this.unbind(".ui-disableSelection")
        }
    }), t.extend(t.ui, {
        plugin: {
            add: function (e, i, n) {
                var s, r = t.ui[e].prototype;
                for (s in n)r.plugins[s] = r.plugins[s] || [], r.plugins[s].push([i, n[s]])
            }, call: function (t, e, i) {
                var n, s = t.plugins[e];
                if (s && t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType)for (n = 0; n < s.length; n++)t.options[s[n][0]] && s[n][1].apply(t.element, i)
            }
        }, hasScroll: function (e, i) {
            if ("hidden" === t(e).css("overflow"))return !1;
            var n = i && "left" === i ? "scrollLeft" : "scrollTop", s = !1;
            return e[n] > 0 ? !0 : (e[n] = 1, s = e[n] > 0, e[n] = 0, s)
        }
    })
}(jQuery), function (t, e) {
    var i = 0, n = Array.prototype.slice, s = t.cleanData;
    t.cleanData = function (e) {
        for (var i, n = 0; null != (i = e[n]); n++)try {
            t(i).triggerHandler("remove")
        } catch (r) {
        }
        s(e)
    }, t.widget = function (e, i, n) {
        var s, r, o, a, l = {}, c = e.split(".")[0];
        e = e.split(".")[1], s = c + "-" + e, n || (n = i, i = t.Widget), t.expr[":"][s.toLowerCase()] = function (e) {
            return !!t.data(e, s)
        }, t[c] = t[c] || {}, r = t[c][e], o = t[c][e] = function (t, e) {
            return this._createWidget ? void(arguments.length && this._createWidget(t, e)) : new o(t, e)
        }, t.extend(o, r, {
            version: n.version,
            _proto: t.extend({}, n),
            _childConstructors: []
        }), a = new i, a.options = t.widget.extend({}, a.options), t.each(n, function (e, n) {
            return t.isFunction(n) ? void(l[e] = function () {
                var t = function () {
                    return i.prototype[e].apply(this, arguments)
                }, s = function (t) {
                    return i.prototype[e].apply(this, t)
                };
                return function () {
                    var e, i = this._super, r = this._superApply;
                    return this._super = t, this._superApply = s, e = n.apply(this, arguments), this._super = i, this._superApply = r, e
                }
            }()) : void(l[e] = n)
        }), o.prototype = t.widget.extend(a, {widgetEventPrefix: r ? a.widgetEventPrefix : e}, l, {
            constructor: o,
            namespace: c,
            widgetName: e,
            widgetFullName: s
        }), r ? (t.each(r._childConstructors, function (e, i) {
            var n = i.prototype;
            t.widget(n.namespace + "." + n.widgetName, o, i._proto)
        }), delete r._childConstructors) : i._childConstructors.push(o), t.widget.bridge(e, o)
    }, t.widget.extend = function (i) {
        for (var s, r, o = n.call(arguments, 1), a = 0, l = o.length; l > a; a++)for (s in o[a])r = o[a][s], o[a].hasOwnProperty(s) && r !== e && (t.isPlainObject(r) ? i[s] = t.isPlainObject(i[s]) ? t.widget.extend({}, i[s], r) : t.widget.extend({}, r) : i[s] = r);
        return i
    }, t.widget.bridge = function (i, s) {
        var r = s.prototype.widgetFullName || i;
        t.fn[i] = function (o) {
            var a = "string" == typeof o, l = n.call(arguments, 1), c = this;
            return o = !a && l.length ? t.widget.extend.apply(null, [o].concat(l)) : o, this.each(a ? function () {
                var n, s = t.data(this, r);
                return s ? t.isFunction(s[o]) && "_" !== o.charAt(0) ? (n = s[o].apply(s, l), n !== s && n !== e ? (c = n && n.jquery ? c.pushStack(n.get()) : n, !1) : void 0) : t.error("no such method '" + o + "' for " + i + " widget instance") : t.error("cannot call methods on " + i + " prior to initialization; attempted to call method '" + o + "'")
            } : function () {
                var e = t.data(this, r);
                e ? e.option(o || {})._init() : t.data(this, r, new s(o, this))
            }), c
        }
    }, t.Widget = function () {
    }, t.Widget._childConstructors = [], t.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {disabled: !1, create: null},
        _createWidget: function (e, n) {
            n = t(n || this.defaultElement || this)[0], this.element = t(n), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this.bindings = t(), this.hoverable = t(), this.focusable = t(), n !== this && (t.data(n, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function (t) {
                    t.target === n && this.destroy()
                }
            }), this.document = t(n.style ? n.ownerDocument : n.document || n), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: t.noop,
        _getCreateEventData: t.noop,
        _create: t.noop,
        _init: t.noop,
        destroy: function () {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: t.noop,
        widget: function () {
            return this.element
        },
        option: function (i, n) {
            var s, r, o, a = i;
            if (0 === arguments.length)return t.widget.extend({}, this.options);
            if ("string" == typeof i)if (a = {}, s = i.split("."), i = s.shift(), s.length) {
                for (r = a[i] = t.widget.extend({}, this.options[i]), o = 0; o < s.length - 1; o++)r[s[o]] = r[s[o]] || {}, r = r[s[o]];
                if (i = s.pop(), n === e)return r[i] === e ? null : r[i];
                r[i] = n
            } else {
                if (n === e)return this.options[i] === e ? null : this.options[i];
                a[i] = n
            }
            return this._setOptions(a), this
        },
        _setOptions: function (t) {
            var e;
            for (e in t)this._setOption(e, t[e]);
            return this
        },
        _setOption: function (t, e) {
            return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!e).attr("aria-disabled", e), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
        },
        enable: function () {
            return this._setOption("disabled", !1)
        },
        disable: function () {
            return this._setOption("disabled", !0)
        },
        _on: function (e, i, n) {
            var s, r = this;
            "boolean" != typeof e && (n = i, i = e, e = !1), n ? (i = s = t(i), this.bindings = this.bindings.add(i)) : (n = i, i = this.element, s = this.widget()), t.each(n, function (n, o) {
                function a() {
                    return e || r.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? r[o] : o).apply(r, arguments) : void 0
                }

                "string" != typeof o && (a.guid = o.guid = o.guid || a.guid || t.guid++);
                var l = n.match(/^(\w+)\s*(.*)$/), c = l[1] + r.eventNamespace, h = l[2];
                h ? s.delegate(h, c, a) : i.bind(c, a)
            })
        },
        _off: function (t, e) {
            e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(e).undelegate(e)
        },
        _delay: function (t, e) {
            function i() {
                return ("string" == typeof t ? n[t] : t).apply(n, arguments)
            }

            var n = this;
            return setTimeout(i, e || 0)
        },
        _hoverable: function (e) {
            this.hoverable = this.hoverable.add(e), this._on(e, {
                mouseenter: function (e) {
                    t(e.currentTarget).addClass("ui-state-hover")
                }, mouseleave: function (e) {
                    t(e.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function (e) {
            this.focusable = this.focusable.add(e), this._on(e, {
                focusin: function (e) {
                    t(e.currentTarget).addClass("ui-state-focus")
                }, focusout: function (e) {
                    t(e.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function (e, i, n) {
            var s, r, o = this.options[e];
            if (n = n || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], r = i.originalEvent)for (s in r)s in i || (i[s] = r[s]);
            return this.element.trigger(i, n), !(t.isFunction(o) && o.apply(this.element[0], [i].concat(n)) === !1 || i.isDefaultPrevented())
        }
    }, t.each({show: "fadeIn", hide: "fadeOut"}, function (e, i) {
        t.Widget.prototype["_" + e] = function (n, s, r) {
            "string" == typeof s && (s = {effect: s});
            var o, a = s ? s === !0 || "number" == typeof s ? i : s.effect || i : e;
            s = s || {}, "number" == typeof s && (s = {duration: s}), o = !t.isEmptyObject(s), s.complete = r, s.delay && n.delay(s.delay), o && t.effects && t.effects.effect[a] ? n[e](s) : a !== e && n[a] ? n[a](s.duration, s.easing, r) : n.queue(function (i) {
                t(this)[e](), r && r.call(n[0]), i()
            })
        }
    })
}(jQuery), function (t, e) {
    var i = !1;
    t(document).mouseup(function () {
        i = !1
    }), t.widget("ui.mouse", {
        version: "1.10.3",
        options: {cancel: "input,textarea,button,select,option", distance: 1, delay: 0},
        _mouseInit: function () {
            var e = this;
            this.element.bind("mousedown." + this.widgetName, function (t) {
                return e._mouseDown(t)
            }).bind("click." + this.widgetName, function (i) {
                return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
            }), this.started = !1
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function (e) {
            if (!i) {
                this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e;
                var n = this, s = 1 === e.which, r = "string" == typeof this.options.cancel && e.target.nodeName ? t(e.target).closest(this.options.cancel).length : !1;
                return s && !r && this._mouseCapture(e) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                    n.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(e) !== !1, !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === t.data(e.target, this.widgetName + ".preventClickEvent") && t.removeData(e.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (t) {
                    return n._mouseMove(t)
                }, this._mouseUpDelegate = function (t) {
                    return n._mouseUp(t)
                }, t(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), e.preventDefault(), i = !0, !0)) : !0
            }
        },
        _mouseMove: function (e) {
            return t.ui.ie && (!document.documentMode || document.documentMode < 9) && !e.button ? this._mouseUp(e) : this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
        },
        _mouseUp: function (e) {
            return t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), !1
        },
        _mouseDistanceMet: function (t) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function () {
            return this.mouseDelayMet
        },
        _mouseStart: function () {
        },
        _mouseDrag: function () {
        },
        _mouseStop: function () {
        },
        _mouseCapture: function () {
            return !0
        }
    })
}(jQuery), function (t, e) {
    function i(t, e, i) {
        return [parseFloat(t[0]) * (p.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (p.test(t[1]) ? i / 100 : 1)]
    }

    function n(e, i) {
        return parseInt(t.css(e, i), 10) || 0
    }

    function s(e) {
        var i = e[0];
        return 9 === i.nodeType ? {
            width: e.width(),
            height: e.height(),
            offset: {top: 0, left: 0}
        } : t.isWindow(i) ? {
            width: e.width(),
            height: e.height(),
            offset: {top: e.scrollTop(), left: e.scrollLeft()}
        } : i.preventDefault ? {width: 0, height: 0, offset: {top: i.pageY, left: i.pageX}} : {
            width: e.outerWidth(),
            height: e.outerHeight(),
            offset: e.offset()
        }
    }

    t.ui = t.ui || {};
    var r, o = Math.max, a = Math.abs, l = Math.round, c = /left|center|right/, h = /top|center|bottom/, u = /[\+\-]\d+(\.[\d]+)?%?/, d = /^\w+/, p = /%$/, f = t.fn.position;
    t.position = {
        scrollbarWidth: function () {
            if (r !== e)return r;
            var i, n, s = t("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), o = s.children()[0];
            return t("body").append(s), i = o.offsetWidth, s.css("overflow", "scroll"), n = o.offsetWidth, i === n && (n = s[0].clientWidth), s.remove(), r = i - n
        }, getScrollInfo: function (e) {
            var i = e.isWindow ? "" : e.element.css("overflow-x"), n = e.isWindow ? "" : e.element.css("overflow-y"), s = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth, r = "scroll" === n || "auto" === n && e.height < e.element[0].scrollHeight;
            return {width: r ? t.position.scrollbarWidth() : 0, height: s ? t.position.scrollbarWidth() : 0}
        }, getWithinInfo: function (e) {
            var i = t(e || window), n = t.isWindow(i[0]);
            return {
                element: i,
                isWindow: n,
                offset: i.offset() || {left: 0, top: 0},
                scrollLeft: i.scrollLeft(),
                scrollTop: i.scrollTop(),
                width: n ? i.width() : i.outerWidth(),
                height: n ? i.height() : i.outerHeight()
            }
        }
    }, t.fn.position = function (e) {
        if (!e || !e.of)return f.apply(this, arguments);
        e = t.extend({}, e);
        var r, p, m, g, v, _, y = t(e.of), b = t.position.getWithinInfo(e.within), w = t.position.getScrollInfo(b), x = (e.collision || "flip").split(" "), k = {};
        return _ = s(y), y[0].preventDefault && (e.at = "left top"), p = _.width, m = _.height, g = _.offset, v = t.extend({}, g), t.each(["my", "at"], function () {
            var t, i, n = (e[this] || "").split(" ");
            1 === n.length && (n = c.test(n[0]) ? n.concat(["center"]) : h.test(n[0]) ? ["center"].concat(n) : ["center", "center"]), n[0] = c.test(n[0]) ? n[0] : "center", n[1] = h.test(n[1]) ? n[1] : "center", t = u.exec(n[0]), i = u.exec(n[1]), k[this] = [t ? t[0] : 0, i ? i[0] : 0], e[this] = [d.exec(n[0])[0], d.exec(n[1])[0]]
        }), 1 === x.length && (x[1] = x[0]), "right" === e.at[0] ? v.left += p : "center" === e.at[0] && (v.left += p / 2), "bottom" === e.at[1] ? v.top += m : "center" === e.at[1] && (v.top += m / 2), r = i(k.at, p, m), v.left += r[0], v.top += r[1], this.each(function () {
            var s, c, h = t(this), u = h.outerWidth(), d = h.outerHeight(), f = n(this, "marginLeft"), _ = n(this, "marginTop"), C = u + f + n(this, "marginRight") + w.width, D = d + _ + n(this, "marginBottom") + w.height, T = t.extend({}, v), S = i(k.my, h.outerWidth(), h.outerHeight());
            "right" === e.my[0] ? T.left -= u : "center" === e.my[0] && (T.left -= u / 2), "bottom" === e.my[1] ? T.top -= d : "center" === e.my[1] && (T.top -= d / 2), T.left += S[0], T.top += S[1], t.support.offsetFractions || (T.left = l(T.left), T.top = l(T.top)), s = {
                marginLeft: f,
                marginTop: _
            }, t.each(["left", "top"], function (i, n) {
                t.ui.position[x[i]] && t.ui.position[x[i]][n](T, {
                    targetWidth: p,
                    targetHeight: m,
                    elemWidth: u,
                    elemHeight: d,
                    collisionPosition: s,
                    collisionWidth: C,
                    collisionHeight: D,
                    offset: [r[0] + S[0], r[1] + S[1]],
                    my: e.my,
                    at: e.at,
                    within: b,
                    elem: h
                })
            }), e.using && (c = function (t) {
                var i = g.left - T.left, n = i + p - u, s = g.top - T.top, r = s + m - d, l = {
                    target: {
                        element: y,
                        left: g.left,
                        top: g.top,
                        width: p,
                        height: m
                    },
                    element: {element: h, left: T.left, top: T.top, width: u, height: d},
                    horizontal: 0 > n ? "left" : i > 0 ? "right" : "center",
                    vertical: 0 > r ? "top" : s > 0 ? "bottom" : "middle"
                };
                u > p && a(i + n) < p && (l.horizontal = "center"), d > m && a(s + r) < m && (l.vertical = "middle"), o(a(i), a(n)) > o(a(s), a(r)) ? l.important = "horizontal" : l.important = "vertical",
                    e.using.call(this, t, l)
            }), h.offset(t.extend(T, {using: c}))
        })
    }, t.ui.position = {
        fit: {
            left: function (t, e) {
                var i, n = e.within, s = n.isWindow ? n.scrollLeft : n.offset.left, r = n.width, a = t.left - e.collisionPosition.marginLeft, l = s - a, c = a + e.collisionWidth - r - s;
                e.collisionWidth > r ? l > 0 && 0 >= c ? (i = t.left + l + e.collisionWidth - r - s, t.left += l - i) : c > 0 && 0 >= l ? t.left = s : l > c ? t.left = s + r - e.collisionWidth : t.left = s : l > 0 ? t.left += l : c > 0 ? t.left -= c : t.left = o(t.left - a, t.left)
            }, top: function (t, e) {
                var i, n = e.within, s = n.isWindow ? n.scrollTop : n.offset.top, r = e.within.height, a = t.top - e.collisionPosition.marginTop, l = s - a, c = a + e.collisionHeight - r - s;
                e.collisionHeight > r ? l > 0 && 0 >= c ? (i = t.top + l + e.collisionHeight - r - s, t.top += l - i) : c > 0 && 0 >= l ? t.top = s : l > c ? t.top = s + r - e.collisionHeight : t.top = s : l > 0 ? t.top += l : c > 0 ? t.top -= c : t.top = o(t.top - a, t.top)
            }
        }, flip: {
            left: function (t, e) {
                var i, n, s = e.within, r = s.offset.left + s.scrollLeft, o = s.width, l = s.isWindow ? s.scrollLeft : s.offset.left, c = t.left - e.collisionPosition.marginLeft, h = c - l, u = c + e.collisionWidth - o - l, d = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0, p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0, f = -2 * e.offset[0];
                0 > h ? (i = t.left + d + p + f + e.collisionWidth - o - r, (0 > i || i < a(h)) && (t.left += d + p + f)) : u > 0 && (n = t.left - e.collisionPosition.marginLeft + d + p + f - l, (n > 0 || a(n) < u) && (t.left += d + p + f))
            }, top: function (t, e) {
                var i, n, s = e.within, r = s.offset.top + s.scrollTop, o = s.height, l = s.isWindow ? s.scrollTop : s.offset.top, c = t.top - e.collisionPosition.marginTop, h = c - l, u = c + e.collisionHeight - o - l, d = "top" === e.my[1], p = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0, f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0, m = -2 * e.offset[1];
                0 > h ? (n = t.top + p + f + m + e.collisionHeight - o - r, t.top + p + f + m > h && (0 > n || n < a(h)) && (t.top += p + f + m)) : u > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + m - l, t.top + p + f + m > u && (i > 0 || a(i) < u) && (t.top += p + f + m))
            }
        }, flipfit: {
            left: function () {
                t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments)
            }, top: function () {
                t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments)
            }
        }
    }, function () {
        var e, i, n, s, r, o = document.getElementsByTagName("body")[0], a = document.createElement("div");
        e = document.createElement(o ? "div" : "body"), n = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        }, o && t.extend(n, {position: "absolute", left: "-1000px", top: "-1000px"});
        for (r in n)e.style[r] = n[r];
        e.appendChild(a), i = o || document.documentElement, i.insertBefore(e, i.firstChild), a.style.cssText = "position: absolute; left: 10.7432222px;", s = t(a).offset().left, t.support.offsetFractions = s > 10 && 11 > s, e.innerHTML = "", i.removeChild(e)
    }()
}(jQuery), function (t, e) {
    t.widget("ui.draggable", t.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function () {
            "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
        },
        _destroy: function () {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
        },
        _mouseCapture: function (e) {
            var i = this.options;
            return this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(e), this.handle ? (t(i.iframeFix === !0 ? "iframe" : i.iframeFix).each(function () {
                t("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css(t(this).offset()).appendTo("body")
            }), !0) : !1)
        },
        _mouseStart: function (e) {
            var i = this.options;
            return this.helper = this._createHelper(e), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, this.offset.scroll = !1, t.extend(this.offset, {
                click: {
                    left: e.pageX - this.offset.left,
                    top: e.pageY - this.offset.top
                }, parent: this._getParentOffset(), relative: this._getRelativeOffset()
            }), this.originalPosition = this.position = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0)
        },
        _mouseDrag: function (e, i) {
            if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                var n = this._uiHash();
                if (this._trigger("drag", e, n) === !1)return this._mouseUp({}), !1;
                this.position = n.position
            }
            return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1
        },
        _mouseStop: function (e) {
            var i = this, n = !1;
            return t.ui.ddmanager && !this.options.dropBehaviour && (n = t.ui.ddmanager.drop(this, e)), this.dropped && (n = this.dropped, this.dropped = !1), "original" !== this.options.helper || t.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !n || "valid" === this.options.revert && n || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, n) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                i._trigger("stop", e) !== !1 && i._clear()
            }) : this._trigger("stop", e) !== !1 && this._clear(), !1) : !1
        },
        _mouseUp: function (e) {
            return t("div.ui-draggable-iframeFix").each(function () {
                this.parentNode.removeChild(this)
            }), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), t.ui.mouse.prototype._mouseUp.call(this, e)
        },
        cancel: function () {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
        },
        _getHandle: function (e) {
            return this.options.handle ? !!t(e.target).closest(this.element.find(this.options.handle)).length : !0
        },
        _createHelper: function (e) {
            var i = this.options, n = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
            return n.parents("body").length || n.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), n[0] === this.element[0] || /(fixed|absolute)/.test(n.css("position")) || n.css("position", "absolute"), n
        },
        _adjustOffsetFromHelper: function (e) {
            "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                left: +e[0],
                top: +e[1] || 0
            }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
        },
        _getParentOffset: function () {
            var e = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                top: 0,
                left: 0
            }), {
                top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if ("relative" === this.cssPosition) {
                var t = this.element.position();
                return {
                    top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {top: 0, left: 0}
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
        },
        _setContainment: function () {
            var e, i, n, s = this.options;
            return s.containment ? "window" === s.containment ? void(this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : "document" === s.containment ? void(this.containment = [0, 0, t(document).width() - this.helperProportions.width - this.margins.left, (t(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : s.containment.constructor === Array ? void(this.containment = s.containment) : ("parent" === s.containment && (s.containment = this.helper[0].parentNode), i = t(s.containment), n = i[0], void(n && (e = "hidden" !== i.css("overflow"), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(n.scrollWidth, n.offsetWidth) : n.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(n.scrollHeight, n.offsetHeight) : n.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = i))) : void(this.containment = null)
        },
        _convertPositionTo: function (e, i) {
            i || (i = this.position);
            var n = "absolute" === e ? 1 : -1, s = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
            return this.offset.scroll || (this.offset.scroll = {
                top: s.scrollTop(),
                left: s.scrollLeft()
            }), {
                top: i.top + this.offset.relative.top * n + this.offset.parent.top * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * n,
                left: i.left + this.offset.relative.left * n + this.offset.parent.left * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * n
            }
        },
        _generatePosition: function (e) {
            var i, n, s, r, o = this.options, a = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, l = e.pageX, c = e.pageY;
            return this.offset.scroll || (this.offset.scroll = {
                top: a.scrollTop(),
                left: a.scrollLeft()
            }), this.originalPosition && (this.containment && (this.relative_container ? (n = this.relative_container.offset(), i = [this.containment[0] + n.left, this.containment[1] + n.top, this.containment[2] + n.left, this.containment[3] + n.top]) : i = this.containment, e.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left), e.pageY - this.offset.click.top < i[1] && (c = i[1] + this.offset.click.top), e.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left), e.pageY - this.offset.click.top > i[3] && (c = i[3] + this.offset.click.top)), o.grid && (s = o.grid[1] ? this.originalPageY + Math.round((c - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY, c = i ? s - this.offset.click.top >= i[1] || s - this.offset.click.top > i[3] ? s : s - this.offset.click.top >= i[1] ? s - o.grid[1] : s + o.grid[1] : s, r = o.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX, l = i ? r - this.offset.click.left >= i[0] || r - this.offset.click.left > i[2] ? r : r - this.offset.click.left >= i[0] ? r - o.grid[0] : r + o.grid[0] : r)), {
                top: c - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
                left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
            }
        },
        _clear: function () {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
        },
        _trigger: function (e, i, n) {
            return n = n || this._uiHash(), t.ui.plugin.call(this, e, [i, n]), "drag" === e && (this.positionAbs = this._convertPositionTo("absolute")), t.Widget.prototype._trigger.call(this, e, i, n)
        },
        plugins: {},
        _uiHash: function () {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }), t.ui.plugin.add("draggable", "connectToSortable", {
        start: function (e, i) {
            var n = t(this).data("ui-draggable"), s = n.options, r = t.extend({}, i, {item: n.element});
            n.sortables = [], t(s.connectToSortable).each(function () {
                var i = t.data(this, "ui-sortable");
                i && !i.options.disabled && (n.sortables.push({
                    instance: i,
                    shouldRevert: i.options.revert
                }), i.refreshPositions(), i._trigger("activate", e, r))
            })
        }, stop: function (e, i) {
            var n = t(this).data("ui-draggable"), s = t.extend({}, i, {item: n.element});
            t.each(n.sortables, function () {
                this.instance.isOver ? (this.instance.isOver = 0, n.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(e), this.instance.options.helper = this.instance.options._helper, "original" === n.options.helper && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", e, s))
            })
        }, drag: function (e, i) {
            var n = t(this).data("ui-draggable"), s = this;
            t.each(n.sortables, function () {
                var r = !1, o = this;
                this.instance.positionAbs = n.positionAbs, this.instance.helperProportions = n.helperProportions, this.instance.offset.click = n.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (r = !0, t.each(n.sortables, function () {
                    return this.instance.positionAbs = n.positionAbs, this.instance.helperProportions = n.helperProportions, this.instance.offset.click = n.offset.click, this !== o && this.instance._intersectsWith(this.instance.containerCache) && t.contains(o.instance.element[0], this.instance.element[0]) && (r = !1), r
                })), r ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = t(s).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () {
                    return i.helper[0]
                }, e.target = this.instance.currentItem[0], this.instance._mouseCapture(e, !0), this.instance._mouseStart(e, !0, !0), this.instance.offset.click.top = n.offset.click.top, this.instance.offset.click.left = n.offset.click.left, this.instance.offset.parent.left -= n.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= n.offset.parent.top - this.instance.offset.parent.top, n._trigger("toSortable", e), n.dropped = this.instance.element, n.currentItem = n.element, this.instance.fromOutside = n), this.instance.currentItem && this.instance._mouseDrag(e)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", e, this.instance._uiHash(this.instance)), this.instance._mouseStop(e, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), n._trigger("fromSortable", e), n.dropped = !1)
            })
        }
    }), t.ui.plugin.add("draggable", "cursor", {
        start: function () {
            var e = t("body"), i = t(this).data("ui-draggable").options;
            e.css("cursor") && (i._cursor = e.css("cursor")), e.css("cursor", i.cursor)
        }, stop: function () {
            var e = t(this).data("ui-draggable").options;
            e._cursor && t("body").css("cursor", e._cursor)
        }
    }), t.ui.plugin.add("draggable", "opacity", {
        start: function (e, i) {
            var n = t(i.helper), s = t(this).data("ui-draggable").options;
            n.css("opacity") && (s._opacity = n.css("opacity")), n.css("opacity", s.opacity)
        }, stop: function (e, i) {
            var n = t(this).data("ui-draggable").options;
            n._opacity && t(i.helper).css("opacity", n._opacity)
        }
    }), t.ui.plugin.add("draggable", "scroll", {
        start: function () {
            var e = t(this).data("ui-draggable");
            e.scrollParent[0] !== document && "HTML" !== e.scrollParent[0].tagName && (e.overflowOffset = e.scrollParent.offset())
        }, drag: function (e) {
            var i = t(this).data("ui-draggable"), n = i.options, s = !1;
            i.scrollParent[0] !== document && "HTML" !== i.scrollParent[0].tagName ? (n.axis && "x" === n.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - e.pageY < n.scrollSensitivity ? i.scrollParent[0].scrollTop = s = i.scrollParent[0].scrollTop + n.scrollSpeed : e.pageY - i.overflowOffset.top < n.scrollSensitivity && (i.scrollParent[0].scrollTop = s = i.scrollParent[0].scrollTop - n.scrollSpeed)), n.axis && "y" === n.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - e.pageX < n.scrollSensitivity ? i.scrollParent[0].scrollLeft = s = i.scrollParent[0].scrollLeft + n.scrollSpeed : e.pageX - i.overflowOffset.left < n.scrollSensitivity && (i.scrollParent[0].scrollLeft = s = i.scrollParent[0].scrollLeft - n.scrollSpeed))) : (n.axis && "x" === n.axis || (e.pageY - t(document).scrollTop() < n.scrollSensitivity ? s = t(document).scrollTop(t(document).scrollTop() - n.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < n.scrollSensitivity && (s = t(document).scrollTop(t(document).scrollTop() + n.scrollSpeed))), n.axis && "y" === n.axis || (e.pageX - t(document).scrollLeft() < n.scrollSensitivity ? s = t(document).scrollLeft(t(document).scrollLeft() - n.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < n.scrollSensitivity && (s = t(document).scrollLeft(t(document).scrollLeft() + n.scrollSpeed)))), s !== !1 && t.ui.ddmanager && !n.dropBehaviour && t.ui.ddmanager.prepareOffsets(i, e)
        }
    }), t.ui.plugin.add("draggable", "snap", {
        start: function () {
            var e = t(this).data("ui-draggable"), i = e.options;
            e.snapElements = [], t(i.snap.constructor !== String ? i.snap.items || ":data(ui-draggable)" : i.snap).each(function () {
                var i = t(this), n = i.offset();
                this !== e.element[0] && e.snapElements.push({
                    item: this,
                    width: i.outerWidth(),
                    height: i.outerHeight(),
                    top: n.top,
                    left: n.left
                })
            })
        }, drag: function (e, i) {
            var n, s, r, o, a, l, c, h, u, d, p = t(this).data("ui-draggable"), f = p.options, m = f.snapTolerance, g = i.offset.left, v = g + p.helperProportions.width, _ = i.offset.top, y = _ + p.helperProportions.height;
            for (u = p.snapElements.length - 1; u >= 0; u--)a = p.snapElements[u].left, l = a + p.snapElements[u].width, c = p.snapElements[u].top, h = c + p.snapElements[u].height, a - m > v || g > l + m || c - m > y || _ > h + m || !t.contains(p.snapElements[u].item.ownerDocument, p.snapElements[u].item) ? (p.snapElements[u].snapping && p.options.snap.release && p.options.snap.release.call(p.element, e, t.extend(p._uiHash(), {snapItem: p.snapElements[u].item})), p.snapElements[u].snapping = !1) : ("inner" !== f.snapMode && (n = Math.abs(c - y) <= m, s = Math.abs(h - _) <= m, r = Math.abs(a - v) <= m, o = Math.abs(l - g) <= m, n && (i.position.top = p._convertPositionTo("relative", {
                    top: c - p.helperProportions.height,
                    left: 0
                }).top - p.margins.top), s && (i.position.top = p._convertPositionTo("relative", {
                    top: h,
                    left: 0
                }).top - p.margins.top), r && (i.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: a - p.helperProportions.width
                }).left - p.margins.left), o && (i.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: l
                }).left - p.margins.left)), d = n || s || r || o, "outer" !== f.snapMode && (n = Math.abs(c - _) <= m, s = Math.abs(h - y) <= m, r = Math.abs(a - g) <= m, o = Math.abs(l - v) <= m, n && (i.position.top = p._convertPositionTo("relative", {
                    top: c,
                    left: 0
                }).top - p.margins.top), s && (i.position.top = p._convertPositionTo("relative", {
                    top: h - p.helperProportions.height,
                    left: 0
                }).top - p.margins.top), r && (i.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: a
                }).left - p.margins.left), o && (i.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: l - p.helperProportions.width
                }).left - p.margins.left)), !p.snapElements[u].snapping && (n || s || r || o || d) && p.options.snap.snap && p.options.snap.snap.call(p.element, e, t.extend(p._uiHash(), {snapItem: p.snapElements[u].item})), p.snapElements[u].snapping = n || s || r || o || d)
        }
    }), t.ui.plugin.add("draggable", "stack", {
        start: function () {
            var e, i = this.data("ui-draggable").options, n = t.makeArray(t(i.stack)).sort(function (e, i) {
                return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0)
            });
            n.length && (e = parseInt(t(n[0]).css("zIndex"), 10) || 0, t(n).each(function (i) {
                t(this).css("zIndex", e + i)
            }), this.css("zIndex", e + n.length))
        }
    }), t.ui.plugin.add("draggable", "zIndex", {
        start: function (e, i) {
            var n = t(i.helper), s = t(this).data("ui-draggable").options;
            n.css("zIndex") && (s._zIndex = n.css("zIndex")), n.css("zIndex", s.zIndex)
        }, stop: function (e, i) {
            var n = t(this).data("ui-draggable").options;
            n._zIndex && t(i.helper).css("zIndex", n._zIndex)
        }
    })
}(jQuery), function (t, e) {
    function i(t, e, i) {
        return t > e && e + i > t
    }

    t.widget("ui.droppable", {
        version: "1.10.3",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: !1,
            addClasses: !0,
            greedy: !1,
            hoverClass: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function () {
            var e = this.options, i = e.accept;
            this.isover = !1, this.isout = !0, this.accept = t.isFunction(i) ? i : function (t) {
                return t.is(i)
            }, this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            }, t.ui.ddmanager.droppables[e.scope] = t.ui.ddmanager.droppables[e.scope] || [], t.ui.ddmanager.droppables[e.scope].push(this), e.addClasses && this.element.addClass("ui-droppable")
        },
        _destroy: function () {
            for (var e = 0, i = t.ui.ddmanager.droppables[this.options.scope]; e < i.length; e++)i[e] === this && i.splice(e, 1);
            this.element.removeClass("ui-droppable ui-droppable-disabled")
        },
        _setOption: function (e, i) {
            "accept" === e && (this.accept = t.isFunction(i) ? i : function (t) {
                return t.is(i)
            }), t.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function (e) {
            var i = t.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", e, this.ui(i))
        },
        _deactivate: function (e) {
            var i = t.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger("deactivate", e, this.ui(i))
        },
        _over: function (e) {
            var i = t.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", e, this.ui(i)))
        },
        _out: function (e) {
            var i = t.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", e, this.ui(i)))
        },
        _drop: function (e, i) {
            var n = i || t.ui.ddmanager.current, s = !1;
            return n && (n.currentItem || n.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function () {
                var e = t.data(this, "ui-droppable");
                return e.options.greedy && !e.options.disabled && e.options.scope === n.options.scope && e.accept.call(e.element[0], n.currentItem || n.element) && t.ui.intersect(n, t.extend(e, {offset: e.element.offset()}), e.options.tolerance) ? (s = !0, !1) : void 0
            }), s ? !1 : this.accept.call(this.element[0], n.currentItem || n.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", e, this.ui(n)), this.element) : !1) : !1
        },
        ui: function (t) {
            return {
                draggable: t.currentItem || t.element,
                helper: t.helper,
                position: t.position,
                offset: t.positionAbs
            }
        }
    }), t.ui.intersect = function (t, e, n) {
        if (!e.offset)return !1;
        var s, r, o = (t.positionAbs || t.position.absolute).left, a = o + t.helperProportions.width, l = (t.positionAbs || t.position.absolute).top, c = l + t.helperProportions.height, h = e.offset.left, u = h + e.proportions.width, d = e.offset.top, p = d + e.proportions.height;
        switch (n) {
            case"fit":
                return o >= h && u >= a && l >= d && p >= c;
            case"intersect":
                return h < o + t.helperProportions.width / 2 && a - t.helperProportions.width / 2 < u && d < l + t.helperProportions.height / 2 && c - t.helperProportions.height / 2 < p;
            case"pointer":
                return s = (t.positionAbs || t.position.absolute).left + (t.clickOffset || t.offset.click).left, r = (t.positionAbs || t.position.absolute).top + (t.clickOffset || t.offset.click).top, i(r, d, e.proportions.height) && i(s, h, e.proportions.width);
            case"touch":
                return (l >= d && p >= l || c >= d && p >= c || d > l && c > p) && (o >= h && u >= o || a >= h && u >= a || h > o && a > u);
            default:
                return !1
        }
    }, t.ui.ddmanager = {
        current: null, droppables: {"default": []}, prepareOffsets: function (e, i) {
            var n, s, r = t.ui.ddmanager.droppables[e.options.scope] || [], o = i ? i.type : null, a = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
            t:for (n = 0; n < r.length; n++)if (!(r[n].options.disabled || e && !r[n].accept.call(r[n].element[0], e.currentItem || e.element))) {
                for (s = 0; s < a.length; s++)if (a[s] === r[n].element[0]) {
                    r[n].proportions.height = 0;
                    continue t
                }
                r[n].visible = "none" !== r[n].element.css("display"), r[n].visible && ("mousedown" === o && r[n]._activate.call(r[n], i), r[n].offset = r[n].element.offset(), r[n].proportions = {
                    width: r[n].element[0].offsetWidth,
                    height: r[n].element[0].offsetHeight
                })
            }
        }, drop: function (e, i) {
            var n = !1;
            return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function () {
                this.options && (!this.options.disabled && this.visible && t.ui.intersect(e, this, this.options.tolerance) && (n = this._drop.call(this, i) || n), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
            }), n
        }, dragStart: function (e, i) {
            e.element.parentsUntil("body").bind("scroll.droppable", function () {
                e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
            })
        }, drag: function (e, i) {
            e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i), t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function () {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var n, s, r, o = t.ui.intersect(e, this, this.options.tolerance), a = !o && this.isover ? "isout" : o && !this.isover ? "isover" : null;
                    a && (this.options.greedy && (s = this.options.scope, r = this.element.parents(":data(ui-droppable)").filter(function () {
                        return t.data(this, "ui-droppable").options.scope === s
                    }), r.length && (n = t.data(r[0], "ui-droppable"), n.greedyChild = "isover" === a)), n && "isover" === a && (n.isover = !1, n.isout = !0, n._out.call(n, i)), this[a] = !0, this["isout" === a ? "isover" : "isout"] = !1, this["isover" === a ? "_over" : "_out"].call(this, i), n && "isout" === a && (n.isout = !1, n.isover = !0, n._over.call(n, i)))
                }
            })
        }, dragStop: function (e, i) {
            e.element.parentsUntil("body").unbind("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
        }
    }
}(jQuery), function (t, e) {
    function i(t) {
        return parseInt(t, 10) || 0
    }

    function n(t) {
        return !isNaN(parseInt(t, 10))
    }

    t.widget("ui.resizable", t.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _create: function () {
            var e, i, n, s, r, o = this, a = this.options;
            if (this.element.addClass("ui-resizable"), t.extend(this, {
                    _aspectRatio: !!a.aspectRatio,
                    aspectRatio: a.aspectRatio,
                    originalElement: this.element,
                    _proportionallyResizeElements: [],
                    _helper: a.helper || a.ghost || a.animate ? a.helper || "ui-resizable-helper" : null
                }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                })), this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")), this.elementIsWrapper = !0, this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                }), this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                })), this.originalElement.css({margin: this.originalElement.css("margin")}), this._proportionallyResize()), this.handles = a.handles || (t(".ui-resizable-handle", this.element).length ? {
                        n: ".ui-resizable-n",
                        e: ".ui-resizable-e",
                        s: ".ui-resizable-s",
                        w: ".ui-resizable-w",
                        se: ".ui-resizable-se",
                        sw: ".ui-resizable-sw",
                        ne: ".ui-resizable-ne",
                        nw: ".ui-resizable-nw"
                    } : "e,s,se"), this.handles.constructor === String)for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), e = this.handles.split(","), this.handles = {}, i = 0; i < e.length; i++)n = t.trim(e[i]), r = "ui-resizable-" + n, s = t("<div class='ui-resizable-handle " + r + "'></div>"), s.css({zIndex: a.zIndex}), "se" === n && s.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[n] = ".ui-resizable-" + n, this.element.append(s);
            this._renderAxis = function (e) {
                var i, n, s, r;
                e = e || this.element;
                for (i in this.handles)this.handles[i].constructor === String && (this.handles[i] = t(this.handles[i], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (n = t(this.handles[i], this.element), r = /sw|ne|nw|se|n|s/.test(i) ? n.outerHeight() : n.outerWidth(), s = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), e.css(s, r), this._proportionallyResize()), t(this.handles[i]).length
            }, this._renderAxis(this.element), this._handles = t(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function () {
                o.resizing || (this.className && (s = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), o.axis = s && s[1] ? s[1] : "se")
            }), a.autoHide && (this._handles.hide(), t(this.element).addClass("ui-resizable-autohide").mouseenter(function () {
                a.disabled || (t(this).removeClass("ui-resizable-autohide"), o._handles.show())
            }).mouseleave(function () {
                a.disabled || o.resizing || (t(this).addClass("ui-resizable-autohide"), o._handles.hide())
            })), this._mouseInit()
        },
        _destroy: function () {
            this._mouseDestroy();
            var e, i = function (e) {
                t(e).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({
                position: e.css("position"),
                width: e.outerWidth(),
                height: e.outerHeight(),
                top: e.css("top"),
                left: e.css("left")
            }).insertAfter(e), e.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
        },
        _mouseCapture: function (e) {
            var i, n, s = !1;
            for (i in this.handles)n = t(this.handles[i])[0], (n === e.target || t.contains(n, e.target)) && (s = !0);
            return !this.options.disabled && s
        },
        _mouseStart: function (e) {
            var n, s, r, o = this.options, a = this.element.position(), l = this.element;
            return this.resizing = !0, /absolute/.test(l.css("position")) ? l.css({
                position: "absolute",
                top: l.css("top"),
                left: l.css("left")
            }) : l.is(".ui-draggable") && l.css({
                position: "absolute",
                top: a.top,
                left: a.left
            }), this._renderProxy(), n = i(this.helper.css("left")), s = i(this.helper.css("top")), o.containment && (n += t(o.containment).scrollLeft() || 0, s += t(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                left: n,
                top: s
            }, this.size = this._helper ? {width: l.outerWidth(), height: l.outerHeight()} : {
                width: l.width(),
                height: l.height()
            }, this.originalSize = this._helper ? {width: l.outerWidth(), height: l.outerHeight()} : {
                width: l.width(),
                height: l.height()
            }, this.originalPosition = {left: n, top: s}, this.sizeDiff = {
                width: l.outerWidth() - l.width(),
                height: l.outerHeight() - l.height()
            }, this.originalMousePosition = {
                left: e.pageX,
                top: e.pageY
            }, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1,
                r = t(".ui-resizable-" + this.axis).css("cursor"), t("body").css("cursor", "auto" === r ? this.axis + "-resize" : r), l.addClass("ui-resizable-resizing"), this._propagate("start", e), !0
        },
        _mouseDrag: function (e) {
            var i, n = this.helper, s = {}, r = this.originalMousePosition, o = this.axis, a = this.position.top, l = this.position.left, c = this.size.width, h = this.size.height, u = e.pageX - r.left || 0, d = e.pageY - r.top || 0, p = this._change[o];
            return p ? (i = p.apply(this, [e, u, d]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), this._updateCache(i), this._propagate("resize", e), this.position.top !== a && (s.top = this.position.top + "px"), this.position.left !== l && (s.left = this.position.left + "px"), this.size.width !== c && (s.width = this.size.width + "px"), this.size.height !== h && (s.height = this.size.height + "px"), n.css(s), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(s) || this._trigger("resize", e, this.ui()), !1) : !1
        },
        _mouseStop: function (e) {
            this.resizing = !1;
            var i, n, s, r, o, a, l, c = this.options, h = this;
            return this._helper && (i = this._proportionallyResizeElements, n = i.length && /textarea/i.test(i[0].nodeName), s = n && t.ui.hasScroll(i[0], "left") ? 0 : h.sizeDiff.height, r = n ? 0 : h.sizeDiff.width, o = {
                width: h.helper.width() - r,
                height: h.helper.height() - s
            }, a = parseInt(h.element.css("left"), 10) + (h.position.left - h.originalPosition.left) || null, l = parseInt(h.element.css("top"), 10) + (h.position.top - h.originalPosition.top) || null, c.animate || this.element.css(t.extend(o, {
                top: l,
                left: a
            })), h.helper.height(h.size.height), h.helper.width(h.size.width), this._helper && !c.animate && this._proportionallyResize()), t("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", e), this._helper && this.helper.remove(), !1
        },
        _updateVirtualBoundaries: function (t) {
            var e, i, s, r, o, a = this.options;
            o = {
                minWidth: n(a.minWidth) ? a.minWidth : 0,
                maxWidth: n(a.maxWidth) ? a.maxWidth : 1 / 0,
                minHeight: n(a.minHeight) ? a.minHeight : 0,
                maxHeight: n(a.maxHeight) ? a.maxHeight : 1 / 0
            }, (this._aspectRatio || t) && (e = o.minHeight * this.aspectRatio, s = o.minWidth / this.aspectRatio, i = o.maxHeight * this.aspectRatio, r = o.maxWidth / this.aspectRatio, e > o.minWidth && (o.minWidth = e), s > o.minHeight && (o.minHeight = s), i < o.maxWidth && (o.maxWidth = i), r < o.maxHeight && (o.maxHeight = r)), this._vBoundaries = o
        },
        _updateCache: function (t) {
            this.offset = this.helper.offset(), n(t.left) && (this.position.left = t.left), n(t.top) && (this.position.top = t.top), n(t.height) && (this.size.height = t.height), n(t.width) && (this.size.width = t.width)
        },
        _updateRatio: function (t) {
            var e = this.position, i = this.size, s = this.axis;
            return n(t.height) ? t.width = t.height * this.aspectRatio : n(t.width) && (t.height = t.width / this.aspectRatio), "sw" === s && (t.left = e.left + (i.width - t.width), t.top = null), "nw" === s && (t.top = e.top + (i.height - t.height), t.left = e.left + (i.width - t.width)), t
        },
        _respectSize: function (t) {
            var e = this._vBoundaries, i = this.axis, s = n(t.width) && e.maxWidth && e.maxWidth < t.width, r = n(t.height) && e.maxHeight && e.maxHeight < t.height, o = n(t.width) && e.minWidth && e.minWidth > t.width, a = n(t.height) && e.minHeight && e.minHeight > t.height, l = this.originalPosition.left + this.originalSize.width, c = this.position.top + this.size.height, h = /sw|nw|w/.test(i), u = /nw|ne|n/.test(i);
            return o && (t.width = e.minWidth), a && (t.height = e.minHeight), s && (t.width = e.maxWidth), r && (t.height = e.maxHeight), o && h && (t.left = l - e.minWidth), s && h && (t.left = l - e.maxWidth), a && u && (t.top = c - e.minHeight), r && u && (t.top = c - e.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, t
        },
        _proportionallyResize: function () {
            if (this._proportionallyResizeElements.length) {
                var t, e, i, n, s, r = this.helper || this.element;
                for (t = 0; t < this._proportionallyResizeElements.length; t++) {
                    if (s = this._proportionallyResizeElements[t], !this.borderDif)for (this.borderDif = [], i = [s.css("borderTopWidth"), s.css("borderRightWidth"), s.css("borderBottomWidth"), s.css("borderLeftWidth")], n = [s.css("paddingTop"), s.css("paddingRight"), s.css("paddingBottom"), s.css("paddingLeft")], e = 0; e < i.length; e++)this.borderDif[e] = (parseInt(i[e], 10) || 0) + (parseInt(n[e], 10) || 0);
                    s.css({
                        height: r.height() - this.borderDif[0] - this.borderDif[2] || 0,
                        width: r.width() - this.borderDif[1] - this.borderDif[3] || 0
                    })
                }
            }
        },
        _renderProxy: function () {
            var e = this.element, i = this.options;
            this.elementOffset = e.offset(), this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
                width: this.element.outerWidth() - 1,
                height: this.element.outerHeight() - 1,
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++i.zIndex
            }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
        },
        _change: {
            e: function (t, e) {
                return {width: this.originalSize.width + e}
            }, w: function (t, e) {
                var i = this.originalSize, n = this.originalPosition;
                return {left: n.left + e, width: i.width - e}
            }, n: function (t, e, i) {
                var n = this.originalSize, s = this.originalPosition;
                return {top: s.top + i, height: n.height - i}
            }, s: function (t, e, i) {
                return {height: this.originalSize.height + i}
            }, se: function (e, i, n) {
                return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, n]))
            }, sw: function (e, i, n) {
                return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, n]))
            }, ne: function (e, i, n) {
                return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, n]))
            }, nw: function (e, i, n) {
                return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, n]))
            }
        },
        _propagate: function (e, i) {
            t.ui.plugin.call(this, e, [i, this.ui()]), "resize" !== e && this._trigger(e, i, this.ui())
        },
        plugins: {},
        ui: function () {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }), t.ui.plugin.add("resizable", "animate", {
        stop: function (e) {
            var i = t(this).data("ui-resizable"), n = i.options, s = i._proportionallyResizeElements, r = s.length && /textarea/i.test(s[0].nodeName), o = r && t.ui.hasScroll(s[0], "left") ? 0 : i.sizeDiff.height, a = r ? 0 : i.sizeDiff.width, l = {
                width: i.size.width - a,
                height: i.size.height - o
            }, c = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null, h = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
            i.element.animate(t.extend(l, h && c ? {top: h, left: c} : {}), {
                duration: n.animateDuration,
                easing: n.animateEasing,
                step: function () {
                    var n = {
                        width: parseInt(i.element.css("width"), 10),
                        height: parseInt(i.element.css("height"), 10),
                        top: parseInt(i.element.css("top"), 10),
                        left: parseInt(i.element.css("left"), 10)
                    };
                    s && s.length && t(s[0]).css({
                        width: n.width,
                        height: n.height
                    }), i._updateCache(n), i._propagate("resize", e)
                }
            })
        }
    }), t.ui.plugin.add("resizable", "containment", {
        start: function () {
            var e, n, s, r, o, a, l, c = t(this).data("ui-resizable"), h = c.options, u = c.element, d = h.containment, p = d instanceof t ? d.get(0) : /parent/.test(d) ? u.parent().get(0) : d;
            p && (c.containerElement = t(p), /document/.test(d) || d === document ? (c.containerOffset = {
                left: 0,
                top: 0
            }, c.containerPosition = {left: 0, top: 0}, c.parentData = {
                element: t(document),
                left: 0,
                top: 0,
                width: t(document).width(),
                height: t(document).height() || document.body.parentNode.scrollHeight
            }) : (e = t(p), n = [], t(["Top", "Right", "Left", "Bottom"]).each(function (t, s) {
                n[t] = i(e.css("padding" + s))
            }), c.containerOffset = e.offset(), c.containerPosition = e.position(), c.containerSize = {
                height: e.innerHeight() - n[3],
                width: e.innerWidth() - n[1]
            }, s = c.containerOffset, r = c.containerSize.height, o = c.containerSize.width, a = t.ui.hasScroll(p, "left") ? p.scrollWidth : o, l = t.ui.hasScroll(p) ? p.scrollHeight : r, c.parentData = {
                element: p,
                left: s.left,
                top: s.top,
                width: a,
                height: l
            }))
        }, resize: function (e) {
            var i, n, s, r, o = t(this).data("ui-resizable"), a = o.options, l = o.containerOffset, c = o.position, h = o._aspectRatio || e.shiftKey, u = {
                top: 0,
                left: 0
            }, d = o.containerElement;
            d[0] !== document && /static/.test(d.css("position")) && (u = l), c.left < (o._helper ? l.left : 0) && (o.size.width = o.size.width + (o._helper ? o.position.left - l.left : o.position.left - u.left), h && (o.size.height = o.size.width / o.aspectRatio), o.position.left = a.helper ? l.left : 0), c.top < (o._helper ? l.top : 0) && (o.size.height = o.size.height + (o._helper ? o.position.top - l.top : o.position.top), h && (o.size.width = o.size.height * o.aspectRatio), o.position.top = o._helper ? l.top : 0), o.offset.left = o.parentData.left + o.position.left, o.offset.top = o.parentData.top + o.position.top, i = Math.abs((o._helper ? o.offset.left - u.left : o.offset.left - u.left) + o.sizeDiff.width), n = Math.abs((o._helper ? o.offset.top - u.top : o.offset.top - l.top) + o.sizeDiff.height), s = o.containerElement.get(0) === o.element.parent().get(0), r = /relative|absolute/.test(o.containerElement.css("position")), s && r && (i -= o.parentData.left), i + o.size.width >= o.parentData.width && (o.size.width = o.parentData.width - i, h && (o.size.height = o.size.width / o.aspectRatio)), n + o.size.height >= o.parentData.height && (o.size.height = o.parentData.height - n, h && (o.size.width = o.size.height * o.aspectRatio))
        }, stop: function () {
            var e = t(this).data("ui-resizable"), i = e.options, n = e.containerOffset, s = e.containerPosition, r = e.containerElement, o = t(e.helper), a = o.offset(), l = o.outerWidth() - e.sizeDiff.width, c = o.outerHeight() - e.sizeDiff.height;
            e._helper && !i.animate && /relative/.test(r.css("position")) && t(this).css({
                left: a.left - s.left - n.left,
                width: l,
                height: c
            }), e._helper && !i.animate && /static/.test(r.css("position")) && t(this).css({
                left: a.left - s.left - n.left,
                width: l,
                height: c
            })
        }
    }), t.ui.plugin.add("resizable", "alsoResize", {
        start: function () {
            var e = t(this).data("ui-resizable"), i = e.options, n = function (e) {
                t(e).each(function () {
                    var e = t(this);
                    e.data("ui-resizable-alsoresize", {
                        width: parseInt(e.width(), 10),
                        height: parseInt(e.height(), 10),
                        left: parseInt(e.css("left"), 10),
                        top: parseInt(e.css("top"), 10)
                    })
                })
            };
            "object" != typeof i.alsoResize || i.alsoResize.parentNode ? n(i.alsoResize) : i.alsoResize.length ? (i.alsoResize = i.alsoResize[0], n(i.alsoResize)) : t.each(i.alsoResize, function (t) {
                n(t)
            })
        }, resize: function (e, i) {
            var n = t(this).data("ui-resizable"), s = n.options, r = n.originalSize, o = n.originalPosition, a = {
                height: n.size.height - r.height || 0,
                width: n.size.width - r.width || 0,
                top: n.position.top - o.top || 0,
                left: n.position.left - o.left || 0
            }, l = function (e, n) {
                t(e).each(function () {
                    var e = t(this), s = t(this).data("ui-resizable-alsoresize"), r = {}, o = n && n.length ? n : e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                    t.each(o, function (t, e) {
                        var i = (s[e] || 0) + (a[e] || 0);
                        i && i >= 0 && (r[e] = i || null)
                    }), e.css(r)
                })
            };
            "object" != typeof s.alsoResize || s.alsoResize.nodeType ? l(s.alsoResize) : t.each(s.alsoResize, function (t, e) {
                l(t, e)
            })
        }, stop: function () {
            t(this).removeData("resizable-alsoresize")
        }
    }), t.ui.plugin.add("resizable", "ghost", {
        start: function () {
            var e = t(this).data("ui-resizable"), i = e.options, n = e.size;
            e.ghost = e.originalElement.clone(), e.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: n.height,
                width: n.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""), e.ghost.appendTo(e.helper)
        }, resize: function () {
            var e = t(this).data("ui-resizable");
            e.ghost && e.ghost.css({position: "relative", height: e.size.height, width: e.size.width})
        }, stop: function () {
            var e = t(this).data("ui-resizable");
            e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0))
        }
    }), t.ui.plugin.add("resizable", "grid", {
        resize: function () {
            var e = t(this).data("ui-resizable"), i = e.options, n = e.size, s = e.originalSize, r = e.originalPosition, o = e.axis, a = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid, l = a[0] || 1, c = a[1] || 1, h = Math.round((n.width - s.width) / l) * l, u = Math.round((n.height - s.height) / c) * c, d = s.width + h, p = s.height + u, f = i.maxWidth && i.maxWidth < d, m = i.maxHeight && i.maxHeight < p, g = i.minWidth && i.minWidth > d, v = i.minHeight && i.minHeight > p;
            i.grid = a, g && (d += l), v && (p += c), f && (d -= l), m && (p -= c), /^(se|s|e)$/.test(o) ? (e.size.width = d, e.size.height = p) : /^(ne)$/.test(o) ? (e.size.width = d, e.size.height = p, e.position.top = r.top - u) : /^(sw)$/.test(o) ? (e.size.width = d, e.size.height = p, e.position.left = r.left - h) : (e.size.width = d, e.size.height = p, e.position.top = r.top - u, e.position.left = r.left - h)
        }
    })
}(jQuery), function (t, e) {
    t.widget("ui.selectable", t.ui.mouse, {
        version: "1.10.3",
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch",
            selected: null,
            selecting: null,
            start: null,
            stop: null,
            unselected: null,
            unselecting: null
        },
        _create: function () {
            var e, i = this;
            this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function () {
                e = t(i.options.filter, i.element[0]), e.addClass("ui-selectee"), e.each(function () {
                    var e = t(this), i = e.offset();
                    t.data(this, "selectable-item", {
                        element: this,
                        $element: e,
                        left: i.left,
                        top: i.top,
                        right: i.left + e.outerWidth(),
                        bottom: i.top + e.outerHeight(),
                        startselected: !1,
                        selected: e.hasClass("ui-selected"),
                        selecting: e.hasClass("ui-selecting"),
                        unselecting: e.hasClass("ui-unselecting")
                    })
                })
            }, this.refresh(), this.selectees = e.addClass("ui-selectee"), this._mouseInit(), this.helper = t("<div class='ui-selectable-helper'></div>")
        },
        _destroy: function () {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
        },
        _mouseStart: function (e) {
            var i = this, n = this.options;
            this.opos = [e.pageX, e.pageY], this.options.disabled || (this.selectees = t(n.filter, this.element[0]), this._trigger("start", e), t(n.appendTo).append(this.helper), this.helper.css({
                left: e.pageX,
                top: e.pageY,
                width: 0,
                height: 0
            }), n.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function () {
                var n = t.data(this, "selectable-item");
                n.startselected = !0, e.metaKey || e.ctrlKey || (n.$element.removeClass("ui-selected"), n.selected = !1, n.$element.addClass("ui-unselecting"), n.unselecting = !0, i._trigger("unselecting", e, {unselecting: n.element}))
            }), t(e.target).parents().addBack().each(function () {
                var n, s = t.data(this, "selectable-item");
                return s ? (n = !e.metaKey && !e.ctrlKey || !s.$element.hasClass("ui-selected"), s.$element.removeClass(n ? "ui-unselecting" : "ui-selected").addClass(n ? "ui-selecting" : "ui-unselecting"), s.unselecting = !n, s.selecting = n, s.selected = n, n ? i._trigger("selecting", e, {selecting: s.element}) : i._trigger("unselecting", e, {unselecting: s.element}), !1) : void 0
            }))
        },
        _mouseDrag: function (e) {
            if (this.dragged = !0, !this.options.disabled) {
                var i, n = this, s = this.options, r = this.opos[0], o = this.opos[1], a = e.pageX, l = e.pageY;
                return r > a && (i = a, a = r, r = i), o > l && (i = l, l = o, o = i), this.helper.css({
                    left: r,
                    top: o,
                    width: a - r,
                    height: l - o
                }), this.selectees.each(function () {
                    var i = t.data(this, "selectable-item"), c = !1;
                    i && i.element !== n.element[0] && ("touch" === s.tolerance ? c = !(i.left > a || i.right < r || i.top > l || i.bottom < o) : "fit" === s.tolerance && (c = i.left > r && i.right < a && i.top > o && i.bottom < l), c ? (i.selected && (i.$element.removeClass("ui-selected"), i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, n._trigger("selecting", e, {selecting: i.element}))) : (i.selecting && ((e.metaKey || e.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0) : (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), n._trigger("unselecting", e, {unselecting: i.element}))), i.selected && (e.metaKey || e.ctrlKey || i.startselected || (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, n._trigger("unselecting", e, {unselecting: i.element})))))
                }), !1
            }
        },
        _mouseStop: function (e) {
            var i = this;
            return this.dragged = !1, t(".ui-unselecting", this.element[0]).each(function () {
                var n = t.data(this, "selectable-item");
                n.$element.removeClass("ui-unselecting"), n.unselecting = !1, n.startselected = !1, i._trigger("unselected", e, {unselected: n.element})
            }), t(".ui-selecting", this.element[0]).each(function () {
                var n = t.data(this, "selectable-item");
                n.$element.removeClass("ui-selecting").addClass("ui-selected"), n.selecting = !1, n.selected = !0, n.startselected = !0, i._trigger("selected", e, {selected: n.element})
            }), this._trigger("stop", e), this.helper.remove(), !1
        }
    })
}(jQuery), function (t, e) {
    function i(t, e, i) {
        return t > e && e + i > t
    }

    function n(t) {
        return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
    }

    t.widget("ui.sortable", t.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _create: function () {
            var t = this.options;
            this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? "x" === t.axis || n(this.items[0].item) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
        },
        _destroy: function () {
            this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
            for (var t = this.items.length - 1; t >= 0; t--)this.items[t].item.removeData(this.widgetName + "-item");
            return this
        },
        _setOption: function (e, i) {
            "disabled" === e ? (this.options[e] = i, this.widget().toggleClass("ui-sortable-disabled", !!i)) : t.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function (e, i) {
            var n = null, s = !1, r = this;
            return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(e), t(e.target).parents().each(function () {
                return t.data(this, r.widgetName + "-item") === r ? (n = t(this), !1) : void 0
            }), t.data(e.target, r.widgetName + "-item") === r && (n = t(e.target)), n && (!this.options.handle || i || (t(this.options.handle, n).find("*").addBack().each(function () {
                this === e.target && (s = !0)
            }), s)) ? (this.currentItem = n, this._removeCurrentsFromItems(), !0) : !1)
        },
        _mouseStart: function (e, i, n) {
            var s, r, o = this.options;
            if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, t.extend(this.offset, {
                    click: {left: e.pageX - this.offset.left, top: e.pageY - this.offset.top},
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), this.domPosition = {
                    prev: this.currentItem.prev()[0],
                    parent: this.currentItem.parent()[0]
                }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), o.containment && this._setContainment(), o.cursor && "auto" !== o.cursor && (r = this.document.find("body"), this.storedCursor = r.css("cursor"), r.css("cursor", o.cursor), this.storedStylesheet = t("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(r)), o.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", o.opacity)), o.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", o.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !n)for (s = this.containers.length - 1; s >= 0; s--)this.containers[s]._trigger("activate", e, this._uiHash(this));
            return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !o.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(e), !0
        },
        _mouseDrag: function (e) {
            var i, n, s, r, o = this.options, a = !1;
            for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < o.scrollSensitivity ? this.scrollParent[0].scrollTop = a = this.scrollParent[0].scrollTop + o.scrollSpeed : e.pageY - this.overflowOffset.top < o.scrollSensitivity && (this.scrollParent[0].scrollTop = a = this.scrollParent[0].scrollTop - o.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < o.scrollSensitivity ? this.scrollParent[0].scrollLeft = a = this.scrollParent[0].scrollLeft + o.scrollSpeed : e.pageX - this.overflowOffset.left < o.scrollSensitivity && (this.scrollParent[0].scrollLeft = a = this.scrollParent[0].scrollLeft - o.scrollSpeed)) : (e.pageY - t(document).scrollTop() < o.scrollSensitivity ? a = t(document).scrollTop(t(document).scrollTop() - o.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < o.scrollSensitivity && (a = t(document).scrollTop(t(document).scrollTop() + o.scrollSpeed)), e.pageX - t(document).scrollLeft() < o.scrollSensitivity ? a = t(document).scrollLeft(t(document).scrollLeft() - o.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < o.scrollSensitivity && (a = t(document).scrollLeft(t(document).scrollLeft() + o.scrollSpeed))), a !== !1 && t.ui.ddmanager && !o.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--)if (n = this.items[i], s = n.item[0], r = this._intersectsWithPointer(n), r && n.instance === this.currentContainer && s !== this.currentItem[0] && this.placeholder[1 === r ? "next" : "prev"]()[0] !== s && !t.contains(this.placeholder[0], s) && ("semi-dynamic" === this.options.type ? !t.contains(this.element[0], s) : !0)) {
                if (this.direction = 1 === r ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(n))break;
                this._rearrange(e, n), this._trigger("change", e, this._uiHash());
                break
            }
            return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
        },
        _mouseStop: function (e, i) {
            if (e) {
                if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
                    var n = this, s = this.placeholder.offset(), r = this.options.axis, o = {};
                    r && "x" !== r || (o.left = s.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), r && "y" !== r || (o.top = s.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, t(this.helper).animate(o, parseInt(this.options.revert, 10) || 500, function () {
                        n._clear(e)
                    })
                } else this._clear(e, i);
                return !1
            }
        },
        cancel: function () {
            if (this.dragging) {
                this._mouseUp({target: null}), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var e = this.containers.length - 1; e >= 0; e--)this.containers[e]._trigger("deactivate", null, this._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this
        },
        serialize: function (e) {
            var i = this._getItemsAsjQuery(e && e.connected), n = [];
            return e = e || {}, t(i).each(function () {
                var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
                i && n.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
            }), !n.length && e.key && n.push(e.key + "="), n.join("&")
        },
        toArray: function (e) {
            var i = this._getItemsAsjQuery(e && e.connected), n = [];
            return e = e || {}, i.each(function () {
                n.push(t(e.item || this).attr(e.attribute || "id") || "")
            }), n
        },
        _intersectsWith: function (t) {
            var e = this.positionAbs.left, i = e + this.helperProportions.width, n = this.positionAbs.top, s = n + this.helperProportions.height, r = t.left, o = r + t.width, a = t.top, l = a + t.height, c = this.offset.click.top, h = this.offset.click.left, u = "x" === this.options.axis || n + c > a && l > n + c, d = "y" === this.options.axis || e + h > r && o > e + h, p = u && d;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? p : r < e + this.helperProportions.width / 2 && i - this.helperProportions.width / 2 < o && a < n + this.helperProportions.height / 2 && s - this.helperProportions.height / 2 < l
        },
        _intersectsWithPointer: function (t) {
            var e = "x" === this.options.axis || i(this.positionAbs.top + this.offset.click.top, t.top, t.height), n = "y" === this.options.axis || i(this.positionAbs.left + this.offset.click.left, t.left, t.width), s = e && n, r = this._getDragVerticalDirection(), o = this._getDragHorizontalDirection();
            return s ? this.floating ? o && "right" === o || "down" === r ? 2 : 1 : r && ("down" === r ? 2 : 1) : !1
        },
        _intersectsWithSides: function (t) {
            var e = i(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height), n = i(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width), s = this._getDragVerticalDirection(), r = this._getDragHorizontalDirection();
            return this.floating && r ? "right" === r && n || "left" === r && !n : s && ("down" === s && e || "up" === s && !e)
        },
        _getDragVerticalDirection: function () {
            var t = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 !== t && (t > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function () {
            var t = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 !== t && (t > 0 ? "right" : "left")
        },
        refresh: function (t) {
            return this._refreshItems(t), this.refreshPositions(), this
        },
        _connectWith: function () {
            var t = this.options;
            return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith
        },
        _getItemsAsjQuery: function (e) {
            var i, n, s, r, o = [], a = [], l = this._connectWith();
            if (l && e)for (i = l.length - 1; i >= 0; i--)for (s = t(l[i]), n = s.length - 1; n >= 0; n--)r = t.data(s[n], this.widgetFullName), r && r !== this && !r.options.disabled && a.push([t.isFunction(r.options.items) ? r.options.items.call(r.element) : t(r.options.items, r.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), r]);
            for (a.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), i = a.length - 1; i >= 0; i--)a[i][0].each(function () {
                o.push(this)
            });
            return t(o)
        },
        _removeCurrentsFromItems: function () {
            var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = t.grep(this.items, function (t) {
                for (var i = 0; i < e.length; i++)if (e[i] === t.item[0])return !1;
                return !0
            })
        },
        _refreshItems: function (e) {
            this.items = [], this.containers = [this];
            var i, n, s, r, o, a, l, c, h = this.items, u = [[t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {item: this.currentItem}) : t(this.options.items, this.element), this]], d = this._connectWith();
            if (d && this.ready)for (i = d.length - 1; i >= 0; i--)for (s = t(d[i]), n = s.length - 1; n >= 0; n--)r = t.data(s[n], this.widgetFullName), r && r !== this && !r.options.disabled && (u.push([t.isFunction(r.options.items) ? r.options.items.call(r.element[0], e, {item: this.currentItem}) : t(r.options.items, r.element), r]), this.containers.push(r));
            for (i = u.length - 1; i >= 0; i--)for (o = u[i][1], a = u[i][0], n = 0, c = a.length; c > n; n++)l = t(a[n]), l.data(this.widgetName + "-item", o), h.push({
                item: l,
                instance: o,
                width: 0,
                height: 0,
                left: 0,
                top: 0
            })
        },
        refreshPositions: function (e) {
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            var i, n, s, r;
            for (i = this.items.length - 1; i >= 0; i--)n = this.items[i], n.instance !== this.currentContainer && this.currentContainer && n.item[0] !== this.currentItem[0] || (s = this.options.toleranceElement ? t(this.options.toleranceElement, n.item) : n.item, e || (n.width = s.outerWidth(), n.height = s.outerHeight()), r = s.offset(), n.left = r.left, n.top = r.top);
            if (this.options.custom && this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this); else for (i = this.containers.length - 1; i >= 0; i--)r = this.containers[i].element.offset(), this.containers[i].containerCache.left = r.left, this.containers[i].containerCache.top = r.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
            return this
        },
        _createPlaceholder: function (e) {
            e = e || this;
            var i, n = e.options;
            n.placeholder && n.placeholder.constructor !== String || (i = n.placeholder, n.placeholder = {
                element: function () {
                    var n = e.currentItem[0].nodeName.toLowerCase(), s = t("<" + n + ">", e.document[0]).addClass(i || e.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                    return "tr" === n ? e.currentItem.children().each(function () {
                        t("<td>&#160;</td>", e.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(s)
                    }) : "img" === n && s.attr("src", e.currentItem.attr("src")), i || s.css("visibility", "hidden"), s
                }, update: function (t, s) {
                    (!i || n.forcePlaceholderSize) && (s.height() || s.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), s.width() || s.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)))
                }
            }), e.placeholder = t(n.placeholder.element.call(e.element, e.currentItem)), e.currentItem.after(e.placeholder), n.placeholder.update(e, e.placeholder)
        },
        _contactContainers: function (e) {
            var s, r, o, a, l, c, h, u, d, p, f = null, m = null;
            for (s = this.containers.length - 1; s >= 0; s--)if (!t.contains(this.currentItem[0], this.containers[s].element[0]))if (this._intersectsWith(this.containers[s].containerCache)) {
                if (f && t.contains(this.containers[s].element[0], f.element[0]))continue;
                f = this.containers[s], m = s
            } else this.containers[s].containerCache.over && (this.containers[s]._trigger("out", e, this._uiHash(this)), this.containers[s].containerCache.over = 0);
            if (f)if (1 === this.containers.length)this.containers[m].containerCache.over || (this.containers[m]._trigger("over", e, this._uiHash(this)), this.containers[m].containerCache.over = 1); else {
                for (o = 1e4, a = null, p = f.floating || n(this.currentItem), l = p ? "left" : "top", c = p ? "width" : "height", h = this.positionAbs[l] + this.offset.click[l], r = this.items.length - 1; r >= 0; r--)t.contains(this.containers[m].element[0], this.items[r].item[0]) && this.items[r].item[0] !== this.currentItem[0] && (!p || i(this.positionAbs.top + this.offset.click.top, this.items[r].top, this.items[r].height)) && (u = this.items[r].item.offset()[l], d = !1, Math.abs(u - h) > Math.abs(u + this.items[r][c] - h) && (d = !0, u += this.items[r][c]), Math.abs(u - h) < o && (o = Math.abs(u - h), a = this.items[r], this.direction = d ? "up" : "down"));
                if (!a && !this.options.dropOnEmpty)return;
                if (this.currentContainer === this.containers[m])return;
                a ? this._rearrange(e, a, null, !0) : this._rearrange(e, null, this.containers[m].element, !0), this._trigger("change", e, this._uiHash()), this.containers[m]._trigger("change", e, this._uiHash(this)), this.currentContainer = this.containers[m], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[m]._trigger("over", e, this._uiHash(this)), this.containers[m].containerCache.over = 1
            }
        },
        _createHelper: function (e) {
            var i = this.options, n = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
            return n.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(n[0]), n[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }), (!n[0].style.width || i.forceHelperSize) && n.width(this.currentItem.width()), (!n[0].style.height || i.forceHelperSize) && n.height(this.currentItem.height()), n
        },
        _adjustOffsetFromHelper: function (e) {
            "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                left: +e[0],
                top: +e[1] || 0
            }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left),
            "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var e = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                top: 0,
                left: 0
            }), {
                top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if ("relative" === this.cssPosition) {
                var t = this.currentItem.position();
                return {
                    top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {top: 0, left: 0}
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
        },
        _setContainment: function () {
            var e, i, n, s = this.options;
            "parent" === s.containment && (s.containment = this.helper[0].parentNode), ("document" === s.containment || "window" === s.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, t("document" === s.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (t("document" === s.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(s.containment) || (e = t(s.containment)[0], i = t(s.containment).offset(), n = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (n ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (n ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
        },
        _convertPositionTo: function (e, i) {
            i || (i = this.position);
            var n = "absolute" === e ? 1 : -1, s = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, r = /(html|body)/i.test(s[0].tagName);
            return {
                top: i.top + this.offset.relative.top * n + this.offset.parent.top * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : r ? 0 : s.scrollTop()) * n,
                left: i.left + this.offset.relative.left * n + this.offset.parent.left * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : r ? 0 : s.scrollLeft()) * n
            }
        },
        _generatePosition: function (e) {
            var i, n, s = this.options, r = e.pageX, o = e.pageY, a = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, l = /(html|body)/i.test(a[0].tagName);
            return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (r = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (o = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (r = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (o = this.containment[3] + this.offset.click.top)), s.grid && (i = this.originalPageY + Math.round((o - this.originalPageY) / s.grid[1]) * s.grid[1], o = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - s.grid[1] : i + s.grid[1] : i, n = this.originalPageX + Math.round((r - this.originalPageX) / s.grid[0]) * s.grid[0], r = this.containment ? n - this.offset.click.left >= this.containment[0] && n - this.offset.click.left <= this.containment[2] ? n : n - this.offset.click.left >= this.containment[0] ? n - s.grid[0] : n + s.grid[0] : n)), {
                top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : l ? 0 : a.scrollTop()),
                left: r - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : l ? 0 : a.scrollLeft())
            }
        },
        _rearrange: function (t, e, i, n) {
            i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
            var s = this.counter;
            this._delay(function () {
                s === this.counter && this.refreshPositions(!n)
            })
        },
        _clear: function (t, e) {
            this.reverting = !1;
            var i, n = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                for (i in this._storedCSS)("auto" === this._storedCSS[i] || "static" === this._storedCSS[i]) && (this._storedCSS[i] = "");
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            for (this.fromOutside && !e && n.push(function (t) {
                this._trigger("receive", t, this._uiHash(this.fromOutside))
            }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || n.push(function (t) {
                this._trigger("update", t, this._uiHash())
            }), this !== this.currentContainer && (e || (n.push(function (t) {
                this._trigger("remove", t, this._uiHash())
            }), n.push(function (t) {
                return function (e) {
                    t._trigger("receive", e, this._uiHash(this))
                }
            }.call(this, this.currentContainer)), n.push(function (t) {
                return function (e) {
                    t._trigger("update", e, this._uiHash(this))
                }
            }.call(this, this.currentContainer)))), i = this.containers.length - 1; i >= 0; i--)e || n.push(function (t) {
                return function (e) {
                    t._trigger("deactivate", e, this._uiHash(this))
                }
            }.call(this, this.containers[i])), this.containers[i].containerCache.over && (n.push(function (t) {
                return function (e) {
                    t._trigger("out", e, this._uiHash(this))
                }
            }.call(this, this.containers[i])), this.containers[i].containerCache.over = 0);
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
                if (!e) {
                    for (this._trigger("beforeStop", t, this._uiHash()), i = 0; i < n.length; i++)n[i].call(this, t);
                    this._trigger("stop", t, this._uiHash())
                }
                return this.fromOutside = !1, !1
            }
            if (e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !e) {
                for (i = 0; i < n.length; i++)n[i].call(this, t);
                this._trigger("stop", t, this._uiHash())
            }
            return this.fromOutside = !1, !0
        },
        _trigger: function () {
            t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        },
        _uiHash: function (e) {
            var i = e || this;
            return {
                helper: i.helper,
                placeholder: i.placeholder || t([]),
                position: i.position,
                originalPosition: i.originalPosition,
                offset: i.positionAbs,
                item: i.currentItem,
                sender: e ? e.element : null
            }
        }
    })
}(jQuery), function (t, e) {
    function i() {
        this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
            closeText: "Done",
            prevText: "&lang; ",
            nextText: "&rang; ",
            currentText: "Today",
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            weekHeader: "Wk",
            dateFormat: "yy-mm-dd",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        }, this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        }, t.extend(this._defaults, this.regional[""]), this.dpDiv = n(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }

    function n(e) {
        var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return e.delegate(i, "mouseout", function () {
            t(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover")
        }).delegate(i, "mouseover", function () {
            t.datepicker._isDisabledDatepicker(r.inline ? e.parent()[0] : r.input[0]) || (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), t(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover"))
        })
    }

    function s(e, i) {
        t.extend(e, i);
        for (var n in i)null == i[n] && (e[n] = i[n]);
        return e
    }

    t.extend(t.ui, {datepicker: {version: "1.10.3"}});
    var r, o = "datepicker";
    t.extend(i.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function () {
            return this.dpDiv
        },
        setDefaults: function (t) {
            return s(this._defaults, t || {}), this
        },
        _attachDatepicker: function (e, i) {
            var n, s, r;
            n = e.nodeName.toLowerCase(), s = "div" === n || "span" === n, e.id || (this.uuid += 1, e.id = "dp" + this.uuid), r = this._newInst(t(e), s), r.settings = t.extend({}, i || {}), "input" === n ? this._connectDatepicker(e, r) : s && this._inlineDatepicker(e, r)
        },
        _newInst: function (e, i) {
            var s = e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: s,
                input: e,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: i,
                dpDiv: i ? n(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            }
        },
        _connectDatepicker: function (e, i) {
            var n = t(e);
            i.append = t([]), i.trigger = t([]), n.hasClass(this.markerClassName) || (this._attachments(n, i), n.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), t.data(e, o, i), i.settings.disabled && this._disableDatepicker(e))
        },
        _attachments: function (e, i) {
            var n, s, r, o = this._get(i, "appendText"), a = this._get(i, "isRTL");
            i.append && i.append.remove(), o && (i.append = t("<span class='" + this._appendClass + "'>" + o + "</span>"), e[a ? "before" : "after"](i.append)), e.unbind("focus", this._showDatepicker), i.trigger && i.trigger.remove(), n = this._get(i, "showOn"), ("focus" === n || "both" === n) && e.focus(this._showDatepicker), ("button" === n || "both" === n) && (s = this._get(i, "buttonText"), r = this._get(i, "buttonImage"), i.trigger = t(this._get(i, "buttonImageOnly") ? t("<img/>").addClass(this._triggerClass).attr({
                src: r,
                alt: s,
                title: s
            }) : t("<button type='button'></button>").addClass(this._triggerClass).html(r ? t("<img/>").attr({
                src: r,
                alt: s,
                title: s
            }) : s)), e[a ? "before" : "after"](i.trigger), i.trigger.click(function () {
                return t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0] ? t.datepicker._hideDatepicker() : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0] ? (t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e[0])) : t.datepicker._showDatepicker(e[0]), !1
            }))
        },
        _autoSize: function (t) {
            if (this._get(t, "autoSize") && !t.inline) {
                var e, i, n, s, r = new Date(2009, 11, 20), o = this._get(t, "dateFormat");
                o.match(/[DM]/) && (e = function (t) {
                    for (i = 0, n = 0, s = 0; s < t.length; s++)t[s].length > i && (i = t[s].length, n = s);
                    return n
                }, r.setMonth(e(this._get(t, o.match(/MM/) ? "monthNames" : "monthNamesShort"))), r.setDate(e(this._get(t, o.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - r.getDay())), t.input.attr("size", this._formatDate(t, r).length)
            }
        },
        _inlineDatepicker: function (e, i) {
            var n = t(e);
            n.hasClass(this.markerClassName) || (n.addClass(this.markerClassName).append(i.dpDiv), t.data(e, o, i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(e), i.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function (e, i, n, r, a) {
            var l, c, h, u, d, p = this._dialogInst;
            return p || (this.uuid += 1, l = "dp" + this.uuid, this._dialogInput = t("<input type='text' id='" + l + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), t("body").append(this._dialogInput), p = this._dialogInst = this._newInst(this._dialogInput, !1), p.settings = {}, t.data(this._dialogInput[0], o, p)), s(p.settings, r || {}), i = i && i.constructor === Date ? this._formatDate(p, i) : i, this._dialogInput.val(i), this._pos = a ? a.length ? a : [a.pageX, a.pageY] : null, this._pos || (c = document.documentElement.clientWidth, h = document.documentElement.clientHeight, u = document.documentElement.scrollLeft || document.body.scrollLeft, d = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [c / 2 - 100 + u, h / 2 - 150 + d]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), p.settings.onSelect = n, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), t.blockUI && t.blockUI(this.dpDiv), t.data(this._dialogInput[0], o, p), this
        },
        _destroyDatepicker: function (e) {
            var i, n = t(e), s = t.data(e, o);
            n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), t.removeData(e, o), "input" === i ? (s.append.remove(), s.trigger.remove(), n.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && n.removeClass(this.markerClassName).empty())
        },
        _enableDatepicker: function (e) {
            var i, n, s = t(e), r = t.data(e, o);
            s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !1, r.trigger.filter("button").each(function () {
                this.disabled = !1
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : ("div" === i || "span" === i) && (n = s.children("." + this._inlineClass), n.children().removeClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = t.map(this._disabledInputs, function (t) {
                return t === e ? null : t
            }))
        },
        _disableDatepicker: function (e) {
            var i, n, s = t(e), r = t.data(e, o);
            s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !0, r.trigger.filter("button").each(function () {
                this.disabled = !0
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : ("div" === i || "span" === i) && (n = s.children("." + this._inlineClass), n.children().addClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = t.map(this._disabledInputs, function (t) {
                return t === e ? null : t
            }), this._disabledInputs[this._disabledInputs.length] = e)
        },
        _isDisabledDatepicker: function (t) {
            if (!t)return !1;
            for (var e = 0; e < this._disabledInputs.length; e++)if (this._disabledInputs[e] === t)return !0;
            return !1
        },
        _getInst: function (e) {
            try {
                return t.data(e, o)
            } catch (i) {
                throw"Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function (i, n, r) {
            var o, a, l, c, h = this._getInst(i);
            return 2 === arguments.length && "string" == typeof n ? "defaults" === n ? t.extend({}, t.datepicker._defaults) : h ? "all" === n ? t.extend({}, h.settings) : this._get(h, n) : null : (o = n || {}, "string" == typeof n && (o = {}, o[n] = r), void(h && (this._curInst === h && this._hideDatepicker(), a = this._getDateDatepicker(i, !0), l = this._getMinMaxDate(h, "min"), c = this._getMinMaxDate(h, "max"), s(h.settings, o), null !== l && o.dateFormat !== e && o.minDate === e && (h.settings.minDate = this._formatDate(h, l)), null !== c && o.dateFormat !== e && o.maxDate === e && (h.settings.maxDate = this._formatDate(h, c)), "disabled" in o && (o.disabled ? this._disableDatepicker(i) : this._enableDatepicker(i)), this._attachments(t(i), h), this._autoSize(h), this._setDate(h, a), this._updateAlternate(h), this._updateDatepicker(h))))
        },
        _changeDatepicker: function (t, e, i) {
            this._optionDatepicker(t, e, i)
        },
        _refreshDatepicker: function (t) {
            var e = this._getInst(t);
            e && this._updateDatepicker(e)
        },
        _setDateDatepicker: function (t, e) {
            var i = this._getInst(t);
            i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i))
        },
        _getDateDatepicker: function (t, e) {
            var i = this._getInst(t);
            return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null
        },
        _doKeyDown: function (e) {
            var i, n, s, r = t.datepicker._getInst(e.target), o = !0, a = r.dpDiv.is(".ui-datepicker-rtl");
            if (r._keyEvent = !0, t.datepicker._datepickerShowing)switch (e.keyCode) {
                case 9:
                    t.datepicker._hideDatepicker(), o = !1;
                    break;
                case 13:
                    return s = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", r.dpDiv), s[0] && t.datepicker._selectDay(e.target, r.selectedMonth, r.selectedYear, s[0]), i = t.datepicker._get(r, "onSelect"), i ? (n = t.datepicker._formatDate(r), i.apply(r.input ? r.input[0] : null, [n, r])) : t.datepicker._hideDatepicker(), !1;
                case 27:
                    t.datepicker._hideDatepicker();
                    break;
                case 33:
                    t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(r, "stepBigMonths") : -t.datepicker._get(r, "stepMonths"), "M");
                    break;
                case 34:
                    t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(r, "stepBigMonths") : +t.datepicker._get(r, "stepMonths"), "M");
                    break;
                case 35:
                    (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target), o = e.ctrlKey || e.metaKey;
                    break;
                case 36:
                    (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target), o = e.ctrlKey || e.metaKey;
                    break;
                case 37:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, a ? 1 : -1, "D"), o = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(r, "stepBigMonths") : -t.datepicker._get(r, "stepMonths"), "M");
                    break;
                case 38:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, "D"), o = e.ctrlKey || e.metaKey;
                    break;
                case 39:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, a ? -1 : 1, "D"), o = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(r, "stepBigMonths") : +t.datepicker._get(r, "stepMonths"), "M");
                    break;
                case 40:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, "D"), o = e.ctrlKey || e.metaKey;
                    break;
                default:
                    o = !1
            } else 36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : o = !1;
            o && (e.preventDefault(), e.stopPropagation())
        },
        _doKeyPress: function (e) {
            var i, n, s = t.datepicker._getInst(e.target);
            return t.datepicker._get(s, "constrainInput") ? (i = t.datepicker._possibleChars(t.datepicker._get(s, "dateFormat")), n = String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), e.ctrlKey || e.metaKey || " " > n || !i || i.indexOf(n) > -1) : void 0
        },
        _doKeyUp: function (e) {
            var i, n = t.datepicker._getInst(e.target);
            if (n.input.val() !== n.lastVal)try {
                i = t.datepicker.parseDate(t.datepicker._get(n, "dateFormat"), n.input ? n.input.val() : null, t.datepicker._getFormatConfig(n)), i && (t.datepicker._setDateFromField(n), t.datepicker._updateAlternate(n), t.datepicker._updateDatepicker(n))
            } catch (s) {
            }
            return !0
        },
        _showDatepicker: function (e) {
            if (e = e.target || e, "input" !== e.nodeName.toLowerCase() && (e = t("input", e.parentNode)[0]), !t.datepicker._isDisabledDatepicker(e) && t.datepicker._lastInput !== e) {
                var i, n, r, o, a, l, c;
                i = t.datepicker._getInst(e), t.datepicker._curInst && t.datepicker._curInst !== i && (t.datepicker._curInst.dpDiv.stop(!0, !0), i && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])), n = t.datepicker._get(i, "beforeShow"), r = n ? n.apply(e, [e, i]) : {}, r !== !1 && (s(i.settings, r), i.lastVal = null, t.datepicker._lastInput = e, t.datepicker._setDateFromField(i), t.datepicker._inDialog && (e.value = ""), t.datepicker._pos || (t.datepicker._pos = t.datepicker._findPos(e), t.datepicker._pos[1] += e.offsetHeight), o = !1, t(e).parents().each(function () {
                    return o |= "fixed" === t(this).css("position"), !o
                }), a = {
                    left: t.datepicker._pos[0],
                    top: t.datepicker._pos[1]
                }, t.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }), t.datepicker._updateDatepicker(i), a = t.datepicker._checkOffset(i, a, o), i.dpDiv.css({
                    position: t.datepicker._inDialog && t.blockUI ? "static" : o ? "fixed" : "absolute",
                    display: "none",
                    left: a.left + "px",
                    top: a.top + "px"
                }), i.inline || (l = t.datepicker._get(i, "showAnim"), c = t.datepicker._get(i, "duration"), i.dpDiv.zIndex(t(e).zIndex() + 1), t.datepicker._datepickerShowing = !0, t.effects && t.effects.effect[l] ? i.dpDiv.show(l, t.datepicker._get(i, "showOptions"), c) : i.dpDiv[l || "show"](l ? c : null), t.datepicker._shouldFocusInput(i) && i.input.focus(), t.datepicker._curInst = i))
            }
        },
        _updateDatepicker: function (e) {
            this.maxRows = 4, r = e, e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e), e.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var i, n = this._getNumberOfMonths(e), s = n[1], o = 17;
            e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), s > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + s).css("width", o * s + "em"), e.dpDiv[(1 !== n[0] || 1 !== n[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e === t.datepicker._curInst && t.datepicker._datepickerShowing && t.datepicker._shouldFocusInput(e) && e.input.focus(), e.yearshtml && (i = e.yearshtml, setTimeout(function () {
                i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), i = e.yearshtml = null
            }, 0))
        },
        _shouldFocusInput: function (t) {
            return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus")
        },
        _checkOffset: function (e, i, n) {
            var s = e.dpDiv.outerWidth(), r = e.dpDiv.outerHeight(), o = e.input ? e.input.outerWidth() : 0, a = e.input ? e.input.outerHeight() : 0, l = document.documentElement.clientWidth + (n ? 0 : t(document).scrollLeft()), c = document.documentElement.clientHeight + (n ? 0 : t(document).scrollTop());
            return i.left -= this._get(e, "isRTL") ? s - o : 0, i.left -= n && i.left === e.input.offset().left ? t(document).scrollLeft() : 0, i.top -= n && i.top === e.input.offset().top + a ? t(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + s > l && l > s ? Math.abs(i.left + s - l) : 0), i.top -= Math.min(i.top, i.top + r > c && c > r ? Math.abs(r + a) : 0), i
        },
        _findPos: function (e) {
            for (var i, n = this._getInst(e), s = this._get(n, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e));)e = e[s ? "previousSibling" : "nextSibling"];
            return i = t(e).offset(), [i.left, i.top]
        },
        _hideDatepicker: function (e) {
            var i, n, s, r, a = this._curInst;
            !a || e && a !== t.data(e, o) || this._datepickerShowing && (i = this._get(a, "showAnim"), n = this._get(a, "duration"), s = function () {
                t.datepicker._tidyDialog(a)
            }, t.effects && (t.effects.effect[i] || t.effects[i]) ? a.dpDiv.hide(i, t.datepicker._get(a, "showOptions"), n, s) : a.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? n : null, s), i || s(), this._datepickerShowing = !1, r = this._get(a, "onClose"), r && r.apply(a.input ? a.input[0] : null, [a.input ? a.input.val() : "", a]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))), this._inDialog = !1)
        },
        _tidyDialog: function (t) {
            t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (e) {
            if (t.datepicker._curInst) {
                var i = t(e.target), n = t.datepicker._getInst(i[0]);
                (i[0].id !== t.datepicker._mainDivId && 0 === i.parents("#" + t.datepicker._mainDivId).length && !i.hasClass(t.datepicker.markerClassName) && !i.closest("." + t.datepicker._triggerClass).length && t.datepicker._datepickerShowing && (!t.datepicker._inDialog || !t.blockUI) || i.hasClass(t.datepicker.markerClassName) && t.datepicker._curInst !== n) && t.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function (e, i, n) {
            var s = t(e), r = this._getInst(s[0]);
            this._isDisabledDatepicker(s[0]) || (this._adjustInstDate(r, i + ("M" === n ? this._get(r, "showCurrentAtPos") : 0), n), this._updateDatepicker(r))
        },
        _gotoToday: function (e) {
            var i, n = t(e), s = this._getInst(n[0]);
            this._get(s, "gotoCurrent") && s.currentDay ? (s.selectedDay = s.currentDay, s.drawMonth = s.selectedMonth = s.currentMonth, s.drawYear = s.selectedYear = s.currentYear) : (i = new Date, s.selectedDay = i.getDate(), s.drawMonth = s.selectedMonth = i.getMonth(), s.drawYear = s.selectedYear = i.getFullYear()), this._notifyChange(s), this._adjustDate(n)
        },
        _selectMonthYear: function (e, i, n) {
            var s = t(e), r = this._getInst(s[0]);
            r["selected" + ("M" === n ? "Month" : "Year")] = r["draw" + ("M" === n ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(r), this._adjustDate(s)
        },
        _selectDay: function (e, i, n, s) {
            var r, o = t(e);
            t(s).hasClass(this._unselectableClass) || this._isDisabledDatepicker(o[0]) || (r = this._getInst(o[0]), r.selectedDay = r.currentDay = t("a", s).html(), r.selectedMonth = r.currentMonth = i, r.selectedYear = r.currentYear = n, this._selectDate(e, this._formatDate(r, r.currentDay, r.currentMonth, r.currentYear)))
        },
        _clearDate: function (e) {
            var i = t(e);
            this._selectDate(i, "")
        },
        _selectDate: function (e, i) {
            var n, s = t(e), r = this._getInst(s[0]);
            i = null != i ? i : this._formatDate(r), r.input && r.input.val(i), this._updateAlternate(r), n = this._get(r, "onSelect"), n ? n.apply(r.input ? r.input[0] : null, [i, r]) : r.input && r.input.trigger("change"), r.inline ? this._updateDatepicker(r) : (this._hideDatepicker(), this._lastInput = r.input[0], "object" != typeof r.input[0] && r.input.focus(), this._lastInput = null)
        },
        _updateAlternate: function (e) {
            var i, n, s, r = this._get(e, "altField");
            r && (i = this._get(e, "altFormat") || this._get(e, "dateFormat"), n = this._getDate(e), s = this.formatDate(i, n, this._getFormatConfig(e)), t(r).each(function () {
                t(this).val(s)
            }))
        },
        noWeekends: function (t) {
            var e = t.getDay();
            return [e > 0 && 6 > e, ""]
        },
        iso8601Week: function (t) {
            var e, i = new Date(t.getTime());
            return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), e = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1
        },
        parseDate: function (e, i, n) {
            if (null == e || null == i)throw"Invalid arguments";
            if (i = "object" == typeof i ? i.toString() : i + "", "" === i)return null;
            var s, r, o, a, l = 0, c = (n ? n.shortYearCutoff : null) || this._defaults.shortYearCutoff, h = "string" != typeof c ? c : (new Date).getFullYear() % 100 + parseInt(c, 10), u = (n ? n.dayNamesShort : null) || this._defaults.dayNamesShort, d = (n ? n.dayNames : null) || this._defaults.dayNames, p = (n ? n.monthNamesShort : null) || this._defaults.monthNamesShort, f = (n ? n.monthNames : null) || this._defaults.monthNames, m = -1, g = -1, v = -1, _ = -1, y = !1, b = function (t) {
                var i = s + 1 < e.length && e.charAt(s + 1) === t;
                return i && s++, i
            }, w = function (t) {
                var e = b(t), n = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2, s = new RegExp("^\\d{1," + n + "}"), r = i.substring(l).match(s);
                if (!r)throw"Missing number at position " + l;
                return l += r[0].length, parseInt(r[0], 10)
            }, x = function (e, n, s) {
                var r = -1, o = t.map(b(e) ? s : n, function (t, e) {
                    return [[e, t]]
                }).sort(function (t, e) {
                    return -(t[1].length - e[1].length)
                });
                if (t.each(o, function (t, e) {
                        var n = e[1];
                        return i.substr(l, n.length).toLowerCase() === n.toLowerCase() ? (r = e[0], l += n.length, !1) : void 0
                    }), -1 !== r)return r + 1;
                throw"Unknown name at position " + l
            }, k = function () {
                if (i.charAt(l) !== e.charAt(s))throw"Unexpected literal at position " + l;
                l++
            };
            for (s = 0; s < e.length; s++)if (y)"'" !== e.charAt(s) || b("'") ? k() : y = !1; else switch (e.charAt(s)) {
                case"d":
                    v = w("d");
                    break;
                case"D":
                    x("D", u, d);
                    break;
                case"o":
                    _ = w("o");
                    break;
                case"m":
                    g = w("m");
                    break;
                case"M":
                    g = x("M", p, f);
                    break;
                case"y":
                    m = w("y");
                    break;
                case"@":
                    a = new Date(w("@")), m = a.getFullYear(), g = a.getMonth() + 1, v = a.getDate();
                    break;
                case"!":
                    a = new Date((w("!") - this._ticksTo1970) / 1e4), m = a.getFullYear(), g = a.getMonth() + 1, v = a.getDate();
                    break;
                case"'":
                    b("'") ? k() : y = !0;
                    break;
                default:
                    k()
            }
            if (l < i.length && (o = i.substr(l), !/^\s+/.test(o)))throw"Extra/unparsed characters found in date: " + o;
            if (-1 === m ? m = (new Date).getFullYear() : 100 > m && (m += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (h >= m ? 0 : -100)), _ > -1)for (g = 1, v = _; ;) {
                if (r = this._getDaysInMonth(m, g - 1), r >= v)break;
                g++, v -= r
            }
            if (a = this._daylightSavingAdjust(new Date(m, g - 1, v)), a.getFullYear() !== m || a.getMonth() + 1 !== g || a.getDate() !== v)throw"Invalid date";
            return a
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
        formatDate: function (t, e, i) {
            if (!e)return "";
            var n, s = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort, r = (i ? i.dayNames : null) || this._defaults.dayNames, o = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort, a = (i ? i.monthNames : null) || this._defaults.monthNames, l = function (e) {
                var i = n + 1 < t.length && t.charAt(n + 1) === e;
                return i && n++, i
            }, c = function (t, e, i) {
                var n = "" + e;
                if (l(t))for (; n.length < i;)n = "0" + n;
                return n
            }, h = function (t, e, i, n) {
                return l(t) ? n[e] : i[e]
            }, u = "", d = !1;
            if (e)for (n = 0; n < t.length; n++)if (d)"'" !== t.charAt(n) || l("'") ? u += t.charAt(n) : d = !1; else switch (t.charAt(n)) {
                case"d":
                    u += c("d", e.getDate(), 2);
                    break;
                case"D":
                    u += h("D", e.getDay(), s, r);
                    break;
                case"o":
                    u += c("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                    break;
                case"m":
                    u += c("m", e.getMonth() + 1, 2);
                    break;
                case"M":
                    u += h("M", e.getMonth(), o, a);
                    break;
                case"y":
                    u += l("y") ? e.getFullYear() : (e.getYear() % 100 < 10 ? "0" : "") + e.getYear() % 100;
                    break;
                case"@":
                    u += e.getTime();
                    break;
                case"!":
                    u += 1e4 * e.getTime() + this._ticksTo1970;
                    break;
                case"'":
                    l("'") ? u += "'" : d = !0;
                    break;
                default:
                    u += t.charAt(n)
            }
            return u
        },
        _possibleChars: function (t) {
            var e, i = "", n = !1, s = function (i) {
                var n = e + 1 < t.length && t.charAt(e + 1) === i;
                return n && e++, n
            };
            for (e = 0; e < t.length; e++)if (n)"'" !== t.charAt(e) || s("'") ? i += t.charAt(e) : n = !1; else switch (t.charAt(e)) {
                case"d":
                case"m":
                case"y":
                case"@":
                    i += "0123456789";
                    break;
                case"D":
                case"M":
                    return null;
                case"'":
                    s("'") ? i += "'" : n = !0;
                    break;
                default:
                    i += t.charAt(e)
            }
            return i
        },
        _get: function (t, i) {
            return t.settings[i] !== e ? t.settings[i] : this._defaults[i]
        },
        _setDateFromField: function (t, e) {
            if (t.input.val() !== t.lastVal) {
                var i = this._get(t, "dateFormat"), n = t.lastVal = t.input ? t.input.val() : null, s = this._getDefaultDate(t), r = s, o = this._getFormatConfig(t);
                try {
                    r = this.parseDate(i, n, o) || s
                } catch (a) {
                    n = e ? "" : n
                }
                t.selectedDay = r.getDate(), t.drawMonth = t.selectedMonth = r.getMonth(), t.drawYear = t.selectedYear = r.getFullYear(), t.currentDay = n ? r.getDate() : 0, t.currentMonth = n ? r.getMonth() : 0, t.currentYear = n ? r.getFullYear() : 0, this._adjustInstDate(t)
            }
        },
        _getDefaultDate: function (t) {
            return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date))
        },
        _determineDate: function (e, i, n) {
            var s = function (t) {
                var e = new Date;
                return e.setDate(e.getDate() + t), e
            }, r = function (i) {
                try {
                    return t.datepicker.parseDate(t.datepicker._get(e, "dateFormat"), i, t.datepicker._getFormatConfig(e))
                } catch (n) {
                }
                for (var s = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date, r = s.getFullYear(), o = s.getMonth(), a = s.getDate(), l = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, c = l.exec(i); c;) {
                    switch (c[2] || "d") {
                        case"d":
                        case"D":
                            a += parseInt(c[1], 10);
                            break;
                        case"w":
                        case"W":
                            a += 7 * parseInt(c[1], 10);
                            break;
                        case"m":
                        case"M":
                            o += parseInt(c[1], 10), a = Math.min(a, t.datepicker._getDaysInMonth(r, o));
                            break;
                        case"y":
                        case"Y":
                            r += parseInt(c[1], 10), a = Math.min(a, t.datepicker._getDaysInMonth(r, o))
                    }
                    c = l.exec(i)
                }
                return new Date(r, o, a)
            }, o = null == i || "" === i ? n : "string" == typeof i ? r(i) : "number" == typeof i ? isNaN(i) ? n : s(i) : new Date(i.getTime());
            return o = o && "Invalid Date" === o.toString() ? n : o,
            o && (o.setHours(0), o.setMinutes(0), o.setSeconds(0), o.setMilliseconds(0)), this._daylightSavingAdjust(o)
        },
        _daylightSavingAdjust: function (t) {
            return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null
        },
        _setDate: function (t, e, i) {
            var n = !e, s = t.selectedMonth, r = t.selectedYear, o = this._restrictMinMax(t, this._determineDate(t, e, new Date));
            t.selectedDay = t.currentDay = o.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = o.getMonth(), t.drawYear = t.selectedYear = t.currentYear = o.getFullYear(), s === t.selectedMonth && r === t.selectedYear || i || this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(n ? "" : this._formatDate(t))
        },
        _getDate: function (t) {
            var e = !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
            return e
        },
        _attachHandlers: function (e) {
            var i = this._get(e, "stepMonths"), n = "#" + e.id.replace(/\\\\/g, "\\");
            e.dpDiv.find("[data-handler]").map(function () {
                var e = {
                    prev: function () {
                        t.datepicker._adjustDate(n, -i, "M")
                    }, next: function () {
                        t.datepicker._adjustDate(n, +i, "M")
                    }, hide: function () {
                        t.datepicker._hideDatepicker()
                    }, today: function () {
                        t.datepicker._gotoToday(n)
                    }, selectDay: function () {
                        return t.datepicker._selectDay(n, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                    }, selectMonth: function () {
                        return t.datepicker._selectMonthYear(n, this, "M"), !1
                    }, selectYear: function () {
                        return t.datepicker._selectMonthYear(n, this, "Y"), !1
                    }
                };
                t(this).bind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function (t) {
            var e, i, n, s, r, o, a, l, c, h, u, d, p, f, m, g, v, _, y, b, w, x, k, C, D, T, S, M, F, E, I, A, P, N, $, O, z, j, H, R = new Date, L = this._daylightSavingAdjust(new Date(R.getFullYear(), R.getMonth(), R.getDate())), W = this._get(t, "isRTL"), q = this._get(t, "showButtonPanel"), B = this._get(t, "hideIfNoPrevNext"), V = this._get(t, "navigationAsDateFormat"), U = this._getNumberOfMonths(t), Y = this._get(t, "showCurrentAtPos"), K = this._get(t, "stepMonths"), X = 1 !== U[0] || 1 !== U[1], G = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)), Z = this._getMinMaxDate(t, "min"), Q = this._getMinMaxDate(t, "max"), J = t.drawMonth - Y, tt = t.drawYear;
            if (0 > J && (J += 12, tt--), Q)for (e = this._daylightSavingAdjust(new Date(Q.getFullYear(), Q.getMonth() - U[0] * U[1] + 1, Q.getDate())), e = Z && Z > e ? Z : e; this._daylightSavingAdjust(new Date(tt, J, 1)) > e;)J--, 0 > J && (J = 11, tt--);
            for (t.drawMonth = J, t.drawYear = tt, i = this._get(t, "prevText"), i = V ? this.formatDate(i, this._daylightSavingAdjust(new Date(tt, J - K, 1)), this._getFormatConfig(t)) : i, n = this._canAdjustMonth(t, -1, tt, J) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (W ? "e" : "w") + "'>" + i + "</span></a>" : B ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (W ? "e" : "w") + "'>" + i + "</span></a>", s = this._get(t, "nextText"), s = V ? this.formatDate(s, this._daylightSavingAdjust(new Date(tt, J + K, 1)), this._getFormatConfig(t)) : s, r = this._canAdjustMonth(t, 1, tt, J) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (W ? "w" : "e") + "'>" + s + "</span></a>" : B ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (W ? "w" : "e") + "'>" + s + "</span></a>", o = this._get(t, "currentText"), a = this._get(t, "gotoCurrent") && t.currentDay ? G : L, o = V ? this.formatDate(o, a, this._getFormatConfig(t)) : o, l = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>", c = q ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (W ? l : "") + (this._isInRange(t, a) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + o + "</button>" : "") + (W ? "" : l) + "</div>" : "", h = parseInt(this._get(t, "firstDay"), 10), h = isNaN(h) ? 0 : h, u = this._get(t, "showWeek"), d = this._get(t, "dayNames"), p = this._get(t, "dayNamesMin"), f = this._get(t, "monthNames"), m = this._get(t, "monthNamesShort"), g = this._get(t, "beforeShowDay"), v = this._get(t, "showOtherMonths"), _ = this._get(t, "selectOtherMonths"), y = this._getDefaultDate(t), b = "", x = 0; x < U[0]; x++) {
                for (k = "", this.maxRows = 4, C = 0; C < U[1]; C++) {
                    if (D = this._daylightSavingAdjust(new Date(tt, J, t.selectedDay)), T = " ui-corner-all", S = "", X) {
                        if (S += "<div class='ui-datepicker-group", U[1] > 1)switch (C) {
                            case 0:
                                S += " ui-datepicker-group-first", T = " ui-corner-" + (W ? "right" : "left");
                                break;
                            case U[1] - 1:
                                S += " ui-datepicker-group-last", T = " ui-corner-" + (W ? "left" : "right");
                                break;
                            default:
                                S += " ui-datepicker-group-middle", T = ""
                        }
                        S += "'>"
                    }
                    for (S += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + T + "'>" + (/all|left/.test(T) && 0 === x ? W ? r : n : "") + (/all|right/.test(T) && 0 === x ? W ? n : r : "") + this._generateMonthYearHeader(t, J, tt, Z, Q, x > 0 || C > 0, f, m) + "</div><table class='ui-datepicker-calendar'><thead><tr>", M = u ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "", w = 0; 7 > w; w++)F = (w + h) % 7, M += "<th" + ((w + h + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + d[F] + "'>" + p[F] + "</span></th>";
                    for (S += M + "</tr></thead><tbody>", E = this._getDaysInMonth(tt, J), tt === t.selectedYear && J === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, E)), I = (this._getFirstDayOfMonth(tt, J) - h + 7) % 7, A = Math.ceil((I + E) / 7), P = X && this.maxRows > A ? this.maxRows : A, this.maxRows = P, N = this._daylightSavingAdjust(new Date(tt, J, 1 - I)), $ = 0; P > $; $++) {
                        for (S += "<tr>", O = u ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(N) + "</td>" : "", w = 0; 7 > w; w++)z = g ? g.apply(t.input ? t.input[0] : null, [N]) : [!0, ""], j = N.getMonth() !== J, H = j && !_ || !z[0] || Z && Z > N || Q && N > Q, O += "<td class='" + ((w + h + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (j ? " ui-datepicker-other-month" : "") + (N.getTime() === D.getTime() && J === t.selectedMonth && t._keyEvent || y.getTime() === N.getTime() && y.getTime() === D.getTime() ? " " + this._dayOverClass : "") + (H ? " " + this._unselectableClass + " ui-state-disabled" : "") + (j && !v ? "" : " " + z[1] + (N.getTime() === G.getTime() ? " " + this._currentClass : "") + (N.getTime() === L.getTime() ? " ui-datepicker-today" : "")) + "'" + (j && !v || !z[2] ? "" : " title='" + z[2].replace(/'/g, "&#39;") + "'") + (H ? "" : " data-handler='selectDay' data-event='click' data-month='" + N.getMonth() + "' data-year='" + N.getFullYear() + "'") + ">" + (j && !v ? "&#xa0;" : H ? "<span class='ui-state-default'>" + N.getDate() + "</span>" : "<a class='ui-state-default" + (N.getTime() === L.getTime() ? " ui-state-highlight" : "") + (N.getTime() === G.getTime() ? " ui-state-active" : "") + (j ? " ui-priority-secondary" : "") + "' href='#'>" + N.getDate() + "</a>") + "</td>", N.setDate(N.getDate() + 1), N = this._daylightSavingAdjust(N);
                        S += O + "</tr>"
                    }
                    J++, J > 11 && (J = 0, tt++), S += "</tbody></table>" + (X ? "</div>" + (U[0] > 0 && C === U[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), k += S
                }
                b += k
            }
            return b += c, t._keyEvent = !1, b
        },
        _generateMonthYearHeader: function (t, e, i, n, s, r, o, a) {
            var l, c, h, u, d, p, f, m, g = this._get(t, "changeMonth"), v = this._get(t, "changeYear"), _ = this._get(t, "showMonthAfterYear"), y = "<div class='ui-datepicker-title'>", b = "";
            if (r || !g)b += "<span class='ui-datepicker-month'>" + o[e] + "</span>"; else {
                for (l = n && n.getFullYear() === i, c = s && s.getFullYear() === i, b += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", h = 0; 12 > h; h++)(!l || h >= n.getMonth()) && (!c || h <= s.getMonth()) && (b += "<option value='" + h + "'" + (h === e ? " selected='selected'" : "") + ">" + a[h] + "</option>");
                b += "</select>"
            }
            if (_ || (y += b + (!r && g && v ? "" : "&#xa0;")), !t.yearshtml)if (t.yearshtml = "", r || !v)y += "<span class='ui-datepicker-year'>" + i + "</span>"; else {
                for (u = this._get(t, "yearRange").split(":"), d = (new Date).getFullYear(), p = function (t) {
                    var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? d + parseInt(t, 10) : parseInt(t, 10);
                    return isNaN(e) ? d : e
                }, f = p(u[0]), m = Math.max(f, p(u[1] || "")), f = n ? Math.max(f, n.getFullYear()) : f, m = s ? Math.min(m, s.getFullYear()) : m, t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; m >= f; f++)t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
                t.yearshtml += "</select>", y += t.yearshtml, t.yearshtml = null
            }
            return y += this._get(t, "yearSuffix"), _ && (y += (!r && g && v ? "" : "&#xa0;") + b), y += "</div>"
        },
        _adjustInstDate: function (t, e, i) {
            var n = t.drawYear + ("Y" === i ? e : 0), s = t.drawMonth + ("M" === i ? e : 0), r = Math.min(t.selectedDay, this._getDaysInMonth(n, s)) + ("D" === i ? e : 0), o = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(n, s, r)));
            t.selectedDay = o.getDate(), t.drawMonth = t.selectedMonth = o.getMonth(), t.drawYear = t.selectedYear = o.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(t)
        },
        _restrictMinMax: function (t, e) {
            var i = this._getMinMaxDate(t, "min"), n = this._getMinMaxDate(t, "max"), s = i && i > e ? i : e;
            return n && s > n ? n : s
        },
        _notifyChange: function (t) {
            var e = this._get(t, "onChangeMonthYear");
            e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t])
        },
        _getNumberOfMonths: function (t) {
            var e = this._get(t, "numberOfMonths");
            return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e
        },
        _getMinMaxDate: function (t, e) {
            return this._determineDate(t, this._get(t, e + "Date"), null)
        },
        _getDaysInMonth: function (t, e) {
            return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate()
        },
        _getFirstDayOfMonth: function (t, e) {
            return new Date(t, e, 1).getDay()
        },
        _canAdjustMonth: function (t, e, i, n) {
            var s = this._getNumberOfMonths(t), r = this._daylightSavingAdjust(new Date(i, n + (0 > e ? e : s[0] * s[1]), 1));
            return 0 > e && r.setDate(this._getDaysInMonth(r.getFullYear(), r.getMonth())), this._isInRange(t, r)
        },
        _isInRange: function (t, e) {
            var i, n, s = this._getMinMaxDate(t, "min"), r = this._getMinMaxDate(t, "max"), o = null, a = null, l = this._get(t, "yearRange");
            return l && (i = l.split(":"), n = (new Date).getFullYear(), o = parseInt(i[0], 10), a = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (o += n), i[1].match(/[+\-].*/) && (a += n)), (!s || e.getTime() >= s.getTime()) && (!r || e.getTime() <= r.getTime()) && (!o || e.getFullYear() >= o) && (!a || e.getFullYear() <= a)
        },
        _getFormatConfig: function (t) {
            var e = this._get(t, "shortYearCutoff");
            return e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10), {
                shortYearCutoff: e,
                dayNamesShort: this._get(t, "dayNamesShort"),
                dayNames: this._get(t, "dayNames"),
                monthNamesShort: this._get(t, "monthNamesShort"),
                monthNames: this._get(t, "monthNames")
            }
        },
        _formatDate: function (t, e, i, n) {
            e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);
            var s = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(n, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
            return this.formatDate(this._get(t, "dateFormat"), s, this._getFormatConfig(t))
        }
    }), t.fn.datepicker = function (e) {
        if (!this.length)return this;
        t.datepicker.initialized || (t(document).mousedown(t.datepicker._checkExternalClick), t.datepicker.initialized = !0), 0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv);
        var i = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i)) : this.each(function () {
            "string" == typeof e ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this].concat(i)) : t.datepicker._attachDatepicker(this, e)
        }) : t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i))
    }, t.datepicker = new i, t.datepicker.initialized = !1, t.datepicker.uuid = (new Date).getTime(), t.datepicker.version = "1.10.3"
}(jQuery), function (t, e) {
    var i = 5;
    t.widget("ui.slider", t.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        _create: function () {
            this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
        },
        _refresh: function () {
            this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
        },
        _createHandles: function () {
            var e, i, n = this.options, s = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), r = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>", o = [];
            for (i = n.values && n.values.length || 1, s.length > i && (s.slice(i).remove(), s = s.slice(0, i)), e = s.length; i > e; e++)o.push(r);
            this.handles = s.add(t(o.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function (e) {
                t(this).data("ui-slider-handle-index", e)
            })
        },
        _createRange: function () {
            var e = this.options, i = "";
            e.range ? (e.range === !0 && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                left: "",
                bottom: ""
            }) : (this.range = t("<div></div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === e.range || "max" === e.range ? " ui-slider-range-" + e.range : ""))) : this.range = t([])
        },
        _setupEvents: function () {
            var t = this.handles.add(this.range).filter("a");
            this._off(t), this._on(t, this._handleEvents), this._hoverable(t), this._focusable(t)
        },
        _destroy: function () {
            this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
        },
        _mouseCapture: function (e) {
            var i, n, s, r, o, a, l, c, h = this, u = this.options;
            return u.disabled ? !1 : (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), i = {
                x: e.pageX,
                y: e.pageY
            }, n = this._normValueFromMouse(i), s = this._valueMax() - this._valueMin() + 1, this.handles.each(function (e) {
                var i = Math.abs(n - h.values(e));
                (s > i || s === i && (e === h._lastChangedValue || h.values(e) === u.min)) && (s = i, r = t(this), o = e)
            }), a = this._start(e, o), a === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = o, r.addClass("ui-state-active").focus(), l = r.offset(), c = !t(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = c ? {
                left: 0,
                top: 0
            } : {
                left: e.pageX - l.left - r.width() / 2,
                top: e.pageY - l.top - r.height() / 2 - (parseInt(r.css("borderTopWidth"), 10) || 0) - (parseInt(r.css("borderBottomWidth"), 10) || 0) + (parseInt(r.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(e, o, n), this._animateOff = !0, !0))
        },
        _mouseStart: function () {
            return !0
        },
        _mouseDrag: function (t) {
            var e = {x: t.pageX, y: t.pageY}, i = this._normValueFromMouse(e);
            return this._slide(t, this._handleIndex, i), !1
        },
        _mouseStop: function (t) {
            return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
        },
        _detectOrientation: function () {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function (t) {
            var e, i, n, s, r;
            return "horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), n = i / e, n > 1 && (n = 1), 0 > n && (n = 0), "vertical" === this.orientation && (n = 1 - n), s = this._valueMax() - this._valueMin(), r = this._valueMin() + n * s, this._trimAlignValue(r)
        },
        _start: function (t, e) {
            var i = {handle: this.handles[e], value: this.value()};
            return this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("start", t, i)
        },
        _slide: function (t, e, i) {
            var n, s, r;
            this.options.values && this.options.values.length ? (n = this.values(e ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === e && i > n || 1 === e && n > i) && (i = n), i !== this.values(e) && (s = this.values(), s[e] = i, r = this._trigger("slide", t, {
                handle: this.handles[e],
                value: i,
                values: s
            }), n = this.values(e ? 0 : 1), r !== !1 && this.values(e, i, !0))) : i !== this.value() && (r = this._trigger("slide", t, {
                handle: this.handles[e],
                value: i
            }), r !== !1 && this.value(i))
        },
        _stop: function (t, e) {
            var i = {handle: this.handles[e], value: this.value()};
            this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("stop", t, i)
        },
        _change: function (t, e) {
            if (!this._keySliding && !this._mouseSliding) {
                var i = {handle: this.handles[e], value: this.value()};
                this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._lastChangedValue = e, this._trigger("change", t, i)
            }
        },
        value: function (t) {
            return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), void this._change(null, 0)) : this._value()
        },
        values: function (e, i) {
            var n, s, r;
            if (arguments.length > 1)return this.options.values[e] = this._trimAlignValue(i), this._refreshValue(), void this._change(null, e);
            if (!arguments.length)return this._values();
            if (!t.isArray(arguments[0]))return this.options.values && this.options.values.length ? this._values(e) : this.value();
            for (n = this.options.values, s = arguments[0], r = 0; r < n.length; r += 1)n[r] = this._trimAlignValue(s[r]), this._change(null, r);
            this._refreshValue()
        },
        _setOption: function (e, i) {
            var n, s = 0;
            switch ("range" === e && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), t.isArray(this.options.values) && (s = this.options.values.length), t.Widget.prototype._setOption.apply(this, arguments), e) {
                case"orientation":
                    this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                    break;
                case"value":
                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                    break;
                case"values":
                    for (this._animateOff = !0, this._refreshValue(), n = 0; s > n; n += 1)this._change(null, n);
                    this._animateOff = !1;
                    break;
                case"min":
                case"max":
                    this._animateOff = !0, this._refreshValue(), this._animateOff = !1;
                    break;
                case"range":
                    this._animateOff = !0, this._refresh(), this._animateOff = !1
            }
        },
        _value: function () {
            var t = this.options.value;
            return t = this._trimAlignValue(t)
        },
        _values: function (t) {
            var e, i, n;
            if (arguments.length)return e = this.options.values[t], e = this._trimAlignValue(e);
            if (this.options.values && this.options.values.length) {
                for (i = this.options.values.slice(), n = 0; n < i.length; n += 1)i[n] = this._trimAlignValue(i[n]);
                return i
            }
            return []
        },
        _trimAlignValue: function (t) {
            if (t <= this._valueMin())return this._valueMin();
            if (t >= this._valueMax())return this._valueMax();
            var e = this.options.step > 0 ? this.options.step : 1, i = (t - this._valueMin()) % e, n = t - i;
            return 2 * Math.abs(i) >= e && (n += i > 0 ? e : -e), parseFloat(n.toFixed(5))
        },
        _valueMin: function () {
            return this.options.min
        },
        _valueMax: function () {
            return this.options.max
        },
        _refreshValue: function () {
            var e, i, n, s, r, o = this.options.range, a = this.options, l = this, c = this._animateOff ? !1 : a.animate, h = {};
            this.options.values && this.options.values.length ? this.handles.each(function (n) {
                i = (l.values(n) - l._valueMin()) / (l._valueMax() - l._valueMin()) * 100, h["horizontal" === l.orientation ? "left" : "bottom"] = i + "%", t(this).stop(1, 1)[c ? "animate" : "css"](h, a.animate), l.options.range === !0 && ("horizontal" === l.orientation ? (0 === n && l.range.stop(1, 1)[c ? "animate" : "css"]({left: i + "%"}, a.animate), 1 === n && l.range[c ? "animate" : "css"]({width: i - e + "%"}, {
                    queue: !1,
                    duration: a.animate
                })) : (0 === n && l.range.stop(1, 1)[c ? "animate" : "css"]({bottom: i + "%"}, a.animate), 1 === n && l.range[c ? "animate" : "css"]({height: i - e + "%"}, {
                    queue: !1,
                    duration: a.animate
                }))), e = i
            }) : (n = this.value(), s = this._valueMin(), r = this._valueMax(), i = r !== s ? (n - s) / (r - s) * 100 : 0, h["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[c ? "animate" : "css"](h, a.animate), "min" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[c ? "animate" : "css"]({width: i + "%"}, a.animate), "max" === o && "horizontal" === this.orientation && this.range[c ? "animate" : "css"]({width: 100 - i + "%"}, {
                queue: !1,
                duration: a.animate
            }), "min" === o && "vertical" === this.orientation && this.range.stop(1, 1)[c ? "animate" : "css"]({height: i + "%"}, a.animate), "max" === o && "vertical" === this.orientation && this.range[c ? "animate" : "css"]({height: 100 - i + "%"}, {
                queue: !1,
                duration: a.animate
            }))
        },
        _handleEvents: {
            keydown: function (e) {
                var n, s, r, o, a = t(e.target).data("ui-slider-handle-index");
                switch (e.keyCode) {
                    case t.ui.keyCode.HOME:
                    case t.ui.keyCode.END:
                    case t.ui.keyCode.PAGE_UP:
                    case t.ui.keyCode.PAGE_DOWN:
                    case t.ui.keyCode.UP:
                    case t.ui.keyCode.RIGHT:
                    case t.ui.keyCode.DOWN:
                    case t.ui.keyCode.LEFT:
                        if (e.preventDefault(), !this._keySliding && (this._keySliding = !0, t(e.target).addClass("ui-state-active"), n = this._start(e, a), n === !1))return
                }
                switch (o = this.options.step, s = r = this.options.values && this.options.values.length ? this.values(a) : this.value(), e.keyCode) {
                    case t.ui.keyCode.HOME:
                        r = this._valueMin();
                        break;
                    case t.ui.keyCode.END:
                        r = this._valueMax();
                        break;
                    case t.ui.keyCode.PAGE_UP:
                        r = this._trimAlignValue(s + (this._valueMax() - this._valueMin()) / i);
                        break;
                    case t.ui.keyCode.PAGE_DOWN:
                        r = this._trimAlignValue(s - (this._valueMax() - this._valueMin()) / i);
                        break;
                    case t.ui.keyCode.UP:
                    case t.ui.keyCode.RIGHT:
                        if (s === this._valueMax())return;
                        r = this._trimAlignValue(s + o);
                        break;
                    case t.ui.keyCode.DOWN:
                    case t.ui.keyCode.LEFT:
                        if (s === this._valueMin())return;
                        r = this._trimAlignValue(s - o)
                }
                this._slide(e, a, r)
            }, click: function (t) {
                t.preventDefault()
            }, keyup: function (e) {
                var i = t(e.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(e, i), this._change(e, i), t(e.target).removeClass("ui-state-active"))
            }
        }
    })
}(jQuery), function (t) {
    function e(e, i) {
        var n = (e.attr("aria-describedby") || "").split(/\s+/);
        n.push(i), e.data("ui-tooltip-id", i).attr("aria-describedby", t.trim(n.join(" ")))
    }

    function i(e) {
        var i = e.data("ui-tooltip-id"), n = (e.attr("aria-describedby") || "").split(/\s+/), s = t.inArray(i, n);
        -1 !== s && n.splice(s, 1), e.removeData("ui-tooltip-id"), n = t.trim(n.join(" ")), n ? e.attr("aria-describedby", n) : e.removeAttr("aria-describedby")
    }

    var n = 0;
    t.widget("ui.tooltip", {
        version: "1.10.3", options: {
            content: function () {
                var e = t(this).attr("title") || "";
                return t("<a>").text(e).html()
            },
            hide: !0,
            items: "[title]:not([disabled])",
            position: {my: "left top+15", at: "left bottom", collision: "flipfit flip"},
            show: !0,
            tooltipClass: null,
            track: !1,
            close: null,
            open: null
        }, _create: function () {
            this._on({
                mouseover: "open",
                focusin: "open"
            }), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable()
        }, _setOption: function (e, i) {
            var n = this;
            return "disabled" === e ? (this[i ? "_disable" : "_enable"](), void(this.options[e] = i)) : (this._super(e, i), void("content" === e && t.each(this.tooltips, function (t, e) {
                n._updateContent(e)
            })))
        }, _disable: function () {
            var e = this;
            t.each(this.tooltips, function (i, n) {
                var s = t.Event("blur");
                s.target = s.currentTarget = n[0], e.close(s, !0)
            }), this.element.find(this.options.items).addBack().each(function () {
                var e = t(this);
                e.is("[title]") && e.data("ui-tooltip-title", e.attr("title")).attr("title", "")
            })
        }, _enable: function () {
            this.element.find(this.options.items).addBack().each(function () {
                var e = t(this);
                e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title"))
            })
        }, open: function (e) {
            var i = this, n = t(e ? e.target : this.element).closest(this.options.items);
            n.length && !n.data("ui-tooltip-id") && (n.attr("title") && n.data("ui-tooltip-title", n.attr("title")), n.data("ui-tooltip-open", !0), e && "mouseover" === e.type && n.parents().each(function () {
                var e, n = t(this);
                n.data("ui-tooltip-open") && (e = t.Event("blur"), e.target = e.currentTarget = this, i.close(e, !0)), n.attr("title") && (n.uniqueId(), i.parents[this.id] = {
                    element: this,
                    title: n.attr("title")
                }, n.attr("title", ""))
            }), this._updateContent(n, e))
        }, _updateContent: function (t, e) {
            var i, n = this.options.content, s = this, r = e ? e.type : null;
            return "string" == typeof n ? this._open(e, t, n) : (i = n.call(t[0], function (i) {
                t.data("ui-tooltip-open") && s._delay(function () {
                    e && (e.type = r), this._open(e, t, i)
                })
            }), void(i && this._open(e, t, i)))
        }, _open: function (i, n, s) {
            function r(t) {
                c.of = t, o.is(":hidden") || o.position(c)
            }

            var o, a, l, c = t.extend({}, this.options.position);
            if (s) {
                if (o = this._find(n), o.length)return void o.find(".ui-tooltip-content").html(s);
                n.is("[title]") && (i && "mouseover" === i.type ? n.attr("title", "") : n.removeAttr("title")), o = this._tooltip(n), e(n, o.attr("id")), o.find(".ui-tooltip-content").html(s), this.options.track && i && /^mouse/.test(i.type) ? (this._on(this.document, {mousemove: r}), r(i)) : o.position(t.extend({of: n}, this.options.position)), o.hide(), this._show(o, this.options.show), this.options.show && this.options.show.delay && (l = this.delayedShow = setInterval(function () {
                    o.is(":visible") && (r(c.of), clearInterval(l))
                }, t.fx.interval)), this._trigger("open", i, {tooltip: o}), a = {
                    keyup: function (e) {
                        if (e.keyCode === t.ui.keyCode.ESCAPE) {
                            var i = t.Event(e);
                            i.currentTarget = n[0], this.close(i, !0)
                        }
                    }, remove: function () {
                        this._removeTooltip(o)
                    }
                }, i && "mouseover" !== i.type || (a.mouseleave = "close"), i && "focusin" !== i.type || (a.focusout = "close"), this._on(!0, n, a)
            }
        }, close: function (e) {
            var n = this, s = t(e ? e.currentTarget : this.element), r = this._find(s);
            this.closing || (clearInterval(this.delayedShow), s.data("ui-tooltip-title") && s.attr("title", s.data("ui-tooltip-title")), i(s), r.stop(!0), this._hide(r, this.options.hide, function () {
                n._removeTooltip(t(this))
            }), s.removeData("ui-tooltip-open"), this._off(s, "mouseleave focusout keyup"), s[0] !== this.element[0] && this._off(s, "remove"), this._off(this.document, "mousemove"), e && "mouseleave" === e.type && t.each(this.parents, function (e, i) {
                t(i.element).attr("title", i.title), delete n.parents[e]
            }), this.closing = !0, this._trigger("close", e, {tooltip: r}), this.closing = !1)
        }, _tooltip: function (e) {
            var i = "ui-tooltip-" + n++, s = t("<div>").attr({
                id: i,
                role: "tooltip"
            }).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || ""));
            return t("<div>").addClass("ui-tooltip-content").appendTo(s), s.appendTo(this.document[0].body), this.tooltips[i] = e, s
        }, _find: function (e) {
            var i = e.data("ui-tooltip-id");
            return i ? t("#" + i) : t()
        }, _removeTooltip: function (t) {
            t.remove(), delete this.tooltips[t.attr("id")]
        }, _destroy: function () {
            var e = this;
            t.each(this.tooltips, function (i, n) {
                var s = t.Event("blur");
                s.target = s.currentTarget = n[0], e.close(s, !0), t("#" + i).remove(), n.data("ui-tooltip-title") && (n.attr("title", n.data("ui-tooltip-title")), n.removeData("ui-tooltip-title"))
            })
        }
    })
}(jQuery), define("jqueryui", ["jquery"], function () {
}), function (t) {
    "function" == typeof module ? module.exports = t(this.jQuery || require("jquery")) : "function" == typeof define && define.amd ? define("vendor/nprogress", ["jquery", "core/event"], function (e) {
        return t(e)
    }) : this.NProgress = t(this.jQuery)
}(function (t) {
    function e(t, e, i) {
        return e > t ? e : t > i ? i : t
    }

    function i(t) {
        return 100 * (-1 + t)
    }

    function n(t, e, n) {
        var s;
        return s = "translate3d" === r.positionUsing ? {transform: "translate3d(" + i(t) + "%,0,0)"} : "translate" === r.positionUsing ? {transform: "translate(" + i(t) + "%,0)"} : {"margin-left": i(t) + "%"}, s.transition = "all " + e + "ms " + n, s
    }

    var s = {};
    s.version = "0.1.2";
    var r = s.settings = {
        minimum: .2 * Math.random() + .3,
        easing: "ease",
        positionUsing: "",
        speed: 100,
        trickle: !0,
        trickleRate: .1,
        trickleSpeed: 800,
        showSpinner: !0,
        template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
    };
    return s.configure = function (e) {
        return t.extend(r, e), this
    }, s.status = null, s.set = function (t) {
        var i = s.isStarted();
        t = e(t, r.minimum, 1), s.status = 1 === t ? null : t;
        var o = s.render(!i), a = o.find('[role="bar"]'), l = r.speed, c = r.easing;
        return o[0].offsetWidth, o.queue(function (e) {
            "" === r.positionUsing && (r.positionUsing = s.getPositioningCSS()), a.css(n(t, l, c)), 1 === t ? (o.css({
                transition: "none",
                opacity: 1
            }), o[0].offsetWidth, setTimeout(function () {
                o.css({transition: "all " + l + "ms linear", opacity: 0}), setTimeout(function () {
                    s.remove(), e()
                }, l)
            }, l)) : setTimeout(e, l)
        }), this
    }, s.isStarted = function () {
        return "number" == typeof s.status
    }, s.start = function () {
        s.status || s.set(0);
        var t = function () {
            setTimeout(function () {
                s.status && (s.trickle(), t())
            }, r.trickleSpeed)
        };
        return r.trickle && t(), this
    }, s.done = function (t) {
        return t || s.status ? (window.NC && window.NC.trigger("finish"), s.inc(.3 + .5 * Math.random()).set(1)) : this
    }, s.inc = function (t) {
        var i = s.status;
        return i ? ("number" != typeof t && (t = (1 - i) * e(Math.random() * i, .1, .95)), i = e(i + t, 0, .994), s.set(i)) : s.start()
    }, s.trickle = function () {
        return s.inc(Math.random() * r.trickleRate)
    }, s.render = function (e) {
        if (s.isRendered())return t("#nprogress");
        t("html").addClass("nprogress-busy");
        var n = t("<div id='nprogress'>").html(r.template), o = e ? "-100" : i(s.status || 0);
        return n.find('[role="bar"]').css({
            transition: "all 0 linear",
            transform: "translate3d(" + o + "%,0,0)"
        }), r.showSpinner || n.find('[role="spinner"]').remove(), n.appendTo(document.body), n
    }, s.remove = function () {
        t("html").removeClass("nprogress-busy"), t("#nprogress").remove()
    }, s.isRendered = function () {
        return t("#nprogress").length > 0
    }, s.getPositioningCSS = function () {
        var t = document.body.style, e = "WebkitTransform" in t ? "Webkit" : "MozTransform" in t ? "Moz" : "msTransform" in t ? "ms" : "OTransform" in t ? "O" : "";
        return e + "Perspective" in t ? "translate3d" : e + "Transform" in t ? "translate" : "margin"
    }, s
}), function (t, e, i) {
    function n(i, n) {
        var o = this;
        o.$el = t(i), o.el = i, o.$el.bind("destroyed", t.proxy(o.teardown, o)), o.$window = t(e), o.$clonedHeader = null, o.$originalHeader = null, o.isSticky = !1, o.leftOffset = null, o.topOffset = null, o.init = function () {
            o.options = t.extend({}, r, n), o.$el.each(function () {
                var e = t(this);
                e.css("padding", 0), o.$originalHeader = t("thead:first", this), o.$clonedHeader = o.$originalHeader.clone(), o.$clonedHeader.addClass("tableFloatingHeader"), o.$clonedHeader.css("display", "none"), o.$originalHeader.addClass("tableFloatingHeaderOriginal"), o.$originalHeader.after(o.$clonedHeader), o.$printStyle = t('<style type="text/css" media="print">.tableFloatingHeader{display:none !important;}.tableFloatingHeaderOriginal{position:static !important;}</style>'), t("head").append(o.$printStyle)
            }), o.updateWidth(), o.toggleHeaders(), o.bind()
        }, o.destroy = function () {
            o.$el.unbind("destroyed", o.teardown), o.teardown()
        }, o.teardown = function () {
            o.isSticky && o.$originalHeader.css("position", "static"), t.removeData(o.el, "plugin_" + s), o.unbind(), o.$clonedHeader.remove(), o.$originalHeader.removeClass("tableFloatingHeaderOriginal"), o.$originalHeader.css("visibility", "visible"), o.$printStyle.remove(), o.el = null, o.$el = null
        }, o.bind = function () {
            o.$window.on("scroll." + s, o.toggleHeaders), o.$window.on("resize." + s, o.toggleHeaders), o.$window.on("resize." + s, o.updateWidth)
        }, o.unbind = function () {
            o.$window.off("." + s, o.toggleHeaders), o.$window.off("." + s, o.updateWidth), o.$el.off("." + s), o.$el.find("*").off("." + s)
        }, o.toggleHeaders = function () {
            o.$el.each(function () {
                var e = t(this), i = isNaN(o.options.fixedOffset) ? o.options.fixedOffset.height() : o.options.fixedOffset, n = e.offset(), s = o.$window.scrollTop() + i, r = o.$window.scrollLeft();
                if (s > n.top && s < n.top + e.height() - o.$clonedHeader.height()) {
                    var a = n.left - r;
                    if (o.isSticky && a === o.leftOffset && i === o.topOffset)return;
                    o.$originalHeader.css({
                        position: "fixed",
                        top: i,
                        "margin-top": 0,
                        left: a,
                        "z-index": 1
                    }), o.$clonedHeader.css("display", ""), o.isSticky = !0, o.leftOffset = a, o.topOffset = i, o.updateWidth()
                } else o.isSticky && (o.$originalHeader.css("position", "static"), o.$clonedHeader.css("display", "none"), o.isSticky = !1)
            })
        }, o.updateWidth = function () {
            if (o.isSticky) {
                var e = t("th,td", o.$originalHeader), i = t("th,td", o.$clonedHeader);
                o.cellWidths = [], o.getWidth(i), o.setWidth(i, e), o.$originalHeader.css("width", o.$clonedHeader.width())
            }
        }, o.getWidth = function (e) {
            e.each(function (e) {
                var i, n = t(this);
                i = "border-box" === n.css("box-sizing") ? n.outerWidth() : n.width(), o.cellWidths[e] = i
            })
        }, o.setWidth = function (t, e) {
            t.each(function (t) {
                var i = o.cellWidths[t];
                e.eq(t).css({"min-width": i, "max-width": i})
            })
        }, o.updateOptions = function (e) {
            o.options = t.extend({}, r, e), o.updateWidth(), o.toggleHeaders()
        }, o.init()
    }

    var s = "stickyTableHeaders", r = {fixedOffset: 0};
    t.fn[s] = function (e) {
        return this.each(function () {
            var i = t.data(this, "plugin_" + s);
            i ? "string" == typeof e ? i[e].apply(i) : i.updateOptions(e) : "destroy" !== e && t.data(this, "plugin_" + s, new n(this, e))
        })
    }
}(jQuery, window), define("stickytableheaders", ["jquery"], function () {
}), define("text!components/list/templates/list.html", [], function () {
    return '<div class="js-list-filter-region clearfix ui-box" style="position: relative;">\n\n</div>\n<div class="ui-box">\n    <table class="ui-table ui-table-list">\n        <thead class="js-list-header-region"></thead>\n        <tbody class="js-list-body-region"></tbody>\n    </table>\n    <div class="js-list-empty-region"></div>\n</div>\n<div class="js-list-footer-region ui-box"></div>\n';
}), define("text!components/list/templates/list_filter.html", [], function () {
    return '<div class="js-list-search ui-search-box">\n    <input class="txt" type="text" placeholder="搜索" value="<%= keyword %>">\n</div>\n'
}), define("text!components/list/templates/list_header.html", [], function () {
    return ""
}), define("text!components/list/templates/list_item.html", [], function () {
    return ""
}), define("text!components/list/templates/list_empty.html", [], function () {
    return '<div class="no-result widget-list-empty">还没有相关数据。</div>\n'
}), define("text!components/list/templates/list_footer.html", [], function () {
    return '<div class="pagenavi"><%= page %></div>\n'
}), define("components/list/models/list", ["require", "underscore", "jquery", "backbone", "core/utils"], function (t) {
    var e = t("underscore"), i = t("jquery"), n = t("backbone"), s = t("core/utils"), r = window._global.url.www + window._global.query_path, o = n.Model.extend({
        url: r + "/list.json",
        defaults: {orderby: "created_time", order: "desc", keyword: "", p: "1", page: "", items: null},
        cacheable: !0,
        fetch: function () {
            var t = this.getCache();
            t && (this.get("items").reset(t, {silent: !0}), this.trigger("sync")), this.trigger("before:fetch"), this.abortFetchingXHR();
            var i = s.ajax({url: e.result(this, "url"), data: this.getRequestData()});
            return i.done(e.bind(this.fetchDone, this)), i.fail(e.bind(this.fetchFail, this)), this._fetching_xhr = i.xhr, i
        },
        fetchDone: function (t) {
            this.setCache(t.list), t = this.parse(t), this.set(t, {silent: !0}), this.trigger("sync")
        },
        fetchFail: function (t, e) {
            -1 !== e.code && (s.errorNotify(t), this.trigger("error", t))
        },
        abortFetchingXHR: function () {
            var t = this._fetching_xhr;
            t && t.readyState > 0 && t.readyState < 4 && t.abort()
        },
        parse: function (t) {
            var e = t.list;
            return delete t.list, this.get("items").reset(e, {silent: !0}), t
        },
        getRequestData: function () {
            var t = this.toJSON();
            return delete t.page, delete t.items, t
        },
        getRequestString: function () {
            return i.param(this.getRequestData())
        },
        checkAll: function () {
            this.get("items").each(function (t) {
                t.set("checked", 1)
            })
        },
        uncheckAll: function () {
            this.get("items").each(function (t) {
                t.set("checked", 0)
            })
        },
        getCheckedItems: function () {
            return this.get("items").filter(function (t) {
                return t.get("checked")
            })
        },
        getCheckedItemsId: function () {
            var t = this.getCheckedItems();
            return e.map(t, function (t) {
                return t.get("item_id")
            })
        },
        setCache: function (t) {
            if (this.cacheable) {
                this._cache || (this._cache = {});
                var e = this.getRequestString();
                this._cache[e] = t
            }
        },
        getCache: function () {
            if (this.cacheable) {
                this._cache || (this._cache = {});
                var t = this.getRequestString();
                return this._cache[t]
            }
        }
    });
    return o
}), define("components/list/models/list_item", ["require", "backbone", "core/utils"], function (t) {
    var e = t("backbone"), i = t("core/utils"), n = window._global.url.www + window._global.query_path, s = e.Model.extend({
        idAttribute: "_id",
        defaults: {checked: 0},
        url: {"delete": n + "/item.json", copy: n + "/copy.json", num: n + "/num.json", title: n + "/title.json"},
        sync: function (t) {
            return t = t || {}, i.ajax(t)
        },
        "delete": function () {
            return this.sync({url: this.url["delete"], method: "DELETE", data: {id: this.getId()}})
        },
        copy: function () {
            return this.sync({url: this.url.copy, method: "POST", data: {id: this.getId()}})
        },
        num: function (t) {
            return this.sync({url: this.url.num, method: "PUT", data: {id: this.getId(), num: t}})
        },
        rename: function (t) {
            return this.sync({url: this.url.title, method: "PUT", data: {id: this.getId(), title: t}})
        },
        getId: function () {
            return this.get("item_id") || this.get("id")
        }
    });
    return s
}), define("components/list/views/list_filter", ["require", "jquery", "marionette", "core/utils"], function (t) {
    var e = t("jquery"), i = t("marionette"), n = t("core/utils");
    return i.Layout.extend({
        className: "widget-list-filter",
        events: {"keypress .js-list-search input": "handleSearch"},
        initialize: function (t) {
            this.options = t || {}, this.layout = this.options.layout, this.triggerMethod("init")
        },
        handleSearch: function (t) {
            t.keyCode === n.keyCode.ENTER && (this.model.set({
                keyword: e(t.currentTarget).val(),
                p: 1
            }, {silent: !0}), this.model.fetch())
        },
        onClose: function () {
            this.options = null, this.layout = null
        }
    })
}), define("components/list/views/list_header", ["require", "jquery", "marionette"], function (t) {
    var e = t("jquery"), i = t("marionette");
    return i.ItemView.extend({
        className: "widget-list-header",
        tagName: "tr",
        events: {"click a": "handleOrder", "change .js-check-all": "handleCheckAll"},
        initialize: function (t) {
            this.options = t || {}, this.layout = this.options.layout, this.triggerMethod("init")
        },
        onRender: function () {
            var t = this.model.toJSON(), i = this.$("[data-orderby=" + t.orderby + "]"), n = e('<span class="orderby-arrow"></span>').addClass(t.order);
            i.append(n)
        },
        handleOrder: function (t) {
            var i = e(t.currentTarget), n = i.data("orderby");
            n && (n == this.model.get("orderby") ? this.model.set({order: "asc" === this.model.get("order") ? "desc" : "asc"}, {silent: !0}) : this.model.set({
                orderby: n,
                order: this.model.get("order") || "asc"
            }, {silent: !0}), this.model.set("p", 1, {silent: !0}), this.model.fetch())
        },
        handleCheckAll: function (t) {
            e(t.currentTarget).prop("checked") ? this.model.checkAll() : this.model.uncheckAll()
        },
        onClose: function () {
            this.options = null, this.layout = null
        }
    })
}), define("components/list/views/list_body", ["require", "marionette"], function (t) {
    var e = t("marionette");
    return e.CollectionView.extend({
        className: "widget-list-body", initialize: function (t) {
            this.options = t || {}, this.layout = this.options.layout, this.triggerMethod("init")
        }, onClose: function () {
            this.options = null, this.layout = null
        }
    })
}), define("components/popover/_base/app", ["require", "underscore", "marionette", "core/utils"], function (t) {
    var e = t("underscore"), i = t("marionette");
    t("core/utils");
    return i.ItemView.extend({
        className: "ui-popover",
        defaults: {
            of: null,
            my: "",
            at: "",
            collision: "none none",
            arrow: "left-center",
            data: {},
            callback: function () {
            }
        },
        initialize: function (t) {
            this.triggerMethod("before:initialize", t), this.options = e.extend({}, this.defaults, t), this.render(), this.position(), this.triggerMethod("initialize", t)
        },
        serializeData: function () {
            return this.options.data || {}
        },
        onBeforeRender: function () {
            this._appendedToBody || (this.$el.appendTo($("body")), this.listenBodyClick(), this._appendedToBody = !0)
        },
        position: function () {
            var t, e;
            if (this.options.my && this.options.at)t = this.options.my, e = this.options.at; else {
                var i = this.getPosition();
                t = i.my, e = i.at
            }
            this.$el.position({of: this.options.of, my: t, at: e, collision: this.options.collision}), this.addArrow()
        },
        addArrow: function () {
            this.$el.addClass(this.options.arrow), this.$el.append($('<div class="arrow"></div>'))
        },
        getPosition: function () {
            switch (this.options.arrow) {
                case"left-top":
                    return {my: "right top", at: "left top"};
                case"left-center":
                    return {my: "right center", at: "left center"};
                case"left-bottom":
                    return {my: "right bottom", at: "left bottom"};
                case"bottom-left":
                    return {my: "left bottom", at: "left top"};
                case"bottom-center":
                    return {my: "center bottom", at: "center top"};
                case"bottom-right":
                    return {my: "right bottom", at: "right top"};
                case"right-top":
                    return {my: "left top", at: "right top"};
                case"right-center":
                    return {my: "left center", at: "right center"};
                case"right-bottom":
                    return {my: "left bottom", at: "right bottom"};
                case"top-left":
                    return {my: "left top", at: "left bottom"};
                case"top-center":
                    return {my: "center top", at: "center bottom"};
                case"top-right":
                    return {my: "right top", at: "right bottom"}
            }
        },
        listenBodyClick: function () {
            var t = this;
            setTimeout(function () {
                $("body").on("click.ui.popover." + t.cid, e.bind(t.autoClose, t))
            }, 0)
        },
        autoClose: function (t) {
            t.target !== this.el && 0 === $(t.target).closest(this.$el).length && this.close()
        },
        onBeforeClose: function () {
            $("body").off("click.ui.popover." + this.cid)
        }
    })
}), define("tpl!components/popover/confirm/app.template", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div class="ui-popover-inner clearfix">\n    <p class="pull-left text-center" style="width: 160px;line-height: 28px;font-size: 14px;">' + (null == (__t = title) ? "" : __t) + '</p>\n    <div class="pull-right">\n        <a href="javascript:;" class="ui-btn ui-btn-primary js-save">确定</a>\n        <a href="javascript:;" class="ui-btn js-cancel">取消</a>\n    </div>\n</div>\n';
        return __p
    }
}), define("components/popover/confirm/app", ["require", "underscore", "jquery", "../_base/app", "tpl!./app.template"], function (t) {
    var e = t("underscore"), i = (t("jquery"), t("../_base/app"));
    return i.extend({
        template: t("tpl!./app.template"),
        events: {"click .js-cancel": "close", "click .js-save": "save"},
        save: function () {
            e.isFunction(this.options.callback) && this.options.callback(), this.close()
        }
    })
}), function ($) {
    if ($.ui.timepicker = $.ui.timepicker || {}, !$.ui.timepicker.version) {
        $.extend($.ui, {timepicker: {version: "1.2.2"}});
        var Timepicker = function () {
            this.regional = [], this.regional[""] = {
                currentText: "Now",
                closeText: "Done",
                amNames: ["AM", "A"],
                pmNames: ["PM", "P"],
                timeFormat: "HH:mm",
                timeSuffix: "",
                timeOnlyTitle: "Choose Time",
                timeText: "Time",
                hourText: "Hour",
                minuteText: "Minute",
                secondText: "Second",
                millisecText: "Millisecond",
                timezoneText: "Time Zone",
                isRTL: !1
            }, this._defaults = {
                showButtonPanel: !0,
                timeOnly: !1,
                showHour: !0,
                showMinute: !0,
                showSecond: !1,
                showMillisec: !1,
                showTimezone: !1,
                showTime: !0,
                stepHour: 1,
                stepMinute: 1,
                stepSecond: 1,
                stepMillisec: 1,
                hour: 0,
                minute: 0,
                second: 0,
                millisec: 0,
                timezone: null,
                useLocalTimezone: !1,
                defaultTimezone: "+0000",
                hourMin: 0,
                minuteMin: 0,
                secondMin: 0,
                millisecMin: 0,
                hourMax: 23,
                minuteMax: 59,
                secondMax: 59,
                millisecMax: 999,
                minDateTime: null,
                maxDateTime: null,
                onSelect: null,
                hourGrid: 0,
                minuteGrid: 0,
                secondGrid: 0,
                millisecGrid: 0,
                alwaysSetTime: !0,
                separator: " ",
                altFieldTimeOnly: !0,
                altTimeFormat: null,
                altSeparator: null,
                altTimeSuffix: null,
                pickerTimeFormat: null,
                pickerTimeSuffix: null,
                showTimepicker: !0,
                timezoneIso8601: !1,
                timezoneList: null,
                addSliderAccess: !1,
                sliderAccessArgs: null,
                controlType: "slider",
                defaultValue: null,
                parse: "strict"
            }, $.extend(this._defaults, this.regional[""])
        };
        $.extend(Timepicker.prototype, {
            $input: null,
            $altInput: null,
            $timeObj: null,
            inst: null,
            hour_slider: null,
            minute_slider: null,
            second_slider: null,
            millisec_slider: null,
            timezone_select: null,
            hour: 0,
            minute: 0,
            second: 0,
            millisec: 0,
            timezone: null,
            defaultTimezone: "+0000",
            hourMinOriginal: null,
            minuteMinOriginal: null,
            secondMinOriginal: null,
            millisecMinOriginal: null,
            hourMaxOriginal: null,
            minuteMaxOriginal: null,
            secondMaxOriginal: null,
            millisecMaxOriginal: null,
            ampm: "",
            formattedDate: "",
            formattedTime: "",
            formattedDateTime: "",
            timezoneList: null,
            units: ["hour", "minute", "second", "millisec"],
            control: null,
            setDefaults: function (t) {
                return extendRemove(this._defaults, t || {}), this
            },
            _newInst: function ($input, o) {
                var tp_inst = new Timepicker, inlineSettings = {}, fns = {}, overrides, i;
                for (var attrName in this._defaults)if (this._defaults.hasOwnProperty(attrName)) {
                    var attrValue = $input.attr("time:" + attrName);
                    if (attrValue)try {
                        inlineSettings[attrName] = eval(attrValue)
                    } catch (err) {
                        inlineSettings[attrName] = attrValue
                    }
                }
                overrides = {
                    beforeShow: function (t, e) {
                        return $.isFunction(tp_inst._defaults.evnts.beforeShow) ? tp_inst._defaults.evnts.beforeShow.call($input[0], t, e, tp_inst) : void 0
                    }, onChangeMonthYear: function (t, e, i) {
                        tp_inst._updateDateTime(i), $.isFunction(tp_inst._defaults.evnts.onChangeMonthYear) && tp_inst._defaults.evnts.onChangeMonthYear.call($input[0], t, e, i, tp_inst)
                    }, onClose: function (t, e) {
                        tp_inst.timeDefined === !0 && "" !== $input.val() && tp_inst._updateDateTime(e), $.isFunction(tp_inst._defaults.evnts.onClose) && tp_inst._defaults.evnts.onClose.call($input[0], t, e, tp_inst)
                    }
                };
                for (i in overrides)overrides.hasOwnProperty(i) && (fns[i] = o[i] || null);
                if (tp_inst._defaults = $.extend({}, this._defaults, inlineSettings, o, overrides, {
                        evnts: fns,
                        timepicker: tp_inst
                    }), tp_inst.amNames = $.map(tp_inst._defaults.amNames, function (t) {
                        return t.toUpperCase()
                    }), tp_inst.pmNames = $.map(tp_inst._defaults.pmNames, function (t) {
                        return t.toUpperCase()
                    }), "string" == typeof tp_inst._defaults.controlType ? (void 0 === $.fn[tp_inst._defaults.controlType] && (tp_inst._defaults.controlType = "select"), tp_inst.control = tp_inst._controls[tp_inst._defaults.controlType]) : tp_inst.control = tp_inst._defaults.controlType, null === tp_inst._defaults.timezoneList) {
                    var timezoneList = ["-1200", "-1100", "-1000", "-0930", "-0900", "-0800", "-0700", "-0600", "-0500", "-0430", "-0400", "-0330", "-0300", "-0200", "-0100", "+0000", "+0100", "+0200", "+0300", "+0330", "+0400", "+0430", "+0500", "+0530", "+0545", "+0600", "+0630", "+0700", "+0800", "+0845", "+0900", "+0930", "+1000", "+1030", "+1100", "+1130", "+1200", "+1245", "+1300", "+1400"];
                    tp_inst._defaults.timezoneIso8601 && (timezoneList = $.map(timezoneList, function (t) {
                        return "+0000" == t ? "Z" : t.substring(0, 3) + ":" + t.substring(3)
                    })), tp_inst._defaults.timezoneList = timezoneList
                }
                return tp_inst.timezone = tp_inst._defaults.timezone, tp_inst.hour = tp_inst._defaults.hour < tp_inst._defaults.hourMin ? tp_inst._defaults.hourMin : tp_inst._defaults.hour > tp_inst._defaults.hourMax ? tp_inst._defaults.hourMax : tp_inst._defaults.hour, tp_inst.minute = tp_inst._defaults.minute < tp_inst._defaults.minuteMin ? tp_inst._defaults.minuteMin : tp_inst._defaults.minute > tp_inst._defaults.minuteMax ? tp_inst._defaults.minuteMax : tp_inst._defaults.minute, tp_inst.second = tp_inst._defaults.second < tp_inst._defaults.secondMin ? tp_inst._defaults.secondMin : tp_inst._defaults.second > tp_inst._defaults.secondMax ? tp_inst._defaults.secondMax : tp_inst._defaults.second, tp_inst.millisec = tp_inst._defaults.millisec < tp_inst._defaults.millisecMin ? tp_inst._defaults.millisecMin : tp_inst._defaults.millisec > tp_inst._defaults.millisecMax ? tp_inst._defaults.millisecMax : tp_inst._defaults.millisec, tp_inst.ampm = "", tp_inst.$input = $input, o.altField && (tp_inst.$altInput = $(o.altField).css({cursor: "pointer"}).focus(function () {
                    $input.trigger("focus")
                })), (0 === tp_inst._defaults.minDate || 0 === tp_inst._defaults.minDateTime) && (tp_inst._defaults.minDate = new Date), (0 === tp_inst._defaults.maxDate || 0 === tp_inst._defaults.maxDateTime) && (tp_inst._defaults.maxDate = new Date), void 0 !== tp_inst._defaults.minDate && tp_inst._defaults.minDate instanceof Date && (tp_inst._defaults.minDateTime = new Date(tp_inst._defaults.minDate.getTime())), void 0 !== tp_inst._defaults.minDateTime && tp_inst._defaults.minDateTime instanceof Date && (tp_inst._defaults.minDate = new Date(tp_inst._defaults.minDateTime.getTime())), void 0 !== tp_inst._defaults.maxDate && tp_inst._defaults.maxDate instanceof Date && (tp_inst._defaults.maxDateTime = new Date(tp_inst._defaults.maxDate.getTime())), void 0 !== tp_inst._defaults.maxDateTime && tp_inst._defaults.maxDateTime instanceof Date && (tp_inst._defaults.maxDate = new Date(tp_inst._defaults.maxDateTime.getTime())), tp_inst.$input.bind("focus", function () {
                    tp_inst._onFocus()
                }), tp_inst
            },
            _addTimePicker: function (t) {
                var e = this.$altInput && this._defaults.altFieldTimeOnly ? this.$input.val() + " " + this.$altInput.val() : this.$input.val();
                this.timeDefined = this._parseTime(e), this._limitMinMaxDateTime(t, !1), this._injectTimePicker()
            },
            _parseTime: function (t, e) {
                if (this.inst || (this.inst = $.datepicker._getInst(this.$input[0])), e || !this._defaults.timeOnly) {
                    var i = $.datepicker._get(this.inst, "dateFormat");
                    try {
                        var n = parseDateTimeInternal(i, this._defaults.timeFormat, t, $.datepicker._getFormatConfig(this.inst), this._defaults);
                        if (!n.timeObj)return !1;
                        $.extend(this, n.timeObj)
                    } catch (s) {
                        return $.timepicker.log("Error parsing the date/time string: " + s + "\ndate/time string = " + t + "\ntimeFormat = " + this._defaults.timeFormat + "\ndateFormat = " + i), !1
                    }
                    return !0
                }
                var r = $.datepicker.parseTime(this._defaults.timeFormat, t, this._defaults);
                return r ? ($.extend(this, r), !0) : !1
            },
            _injectTimePicker: function () {
                var t = this.inst.dpDiv, e = this.inst.settings, i = this, n = "", s = "", r = {}, o = {}, a = null, l = 0, c = 0;
                if (0 === t.find("div.ui-timepicker-div").length && e.showTimepicker) {
                    var h = ' style="display:none;"', u = '<div class="ui-timepicker-div' + (e.isRTL ? " ui-timepicker-rtl" : "") + '"><dl><dt class="ui_tpicker_time_label"' + (e.showTime ? "" : h) + ">" + e.timeText + '</dt><dd class="ui_tpicker_time"' + (e.showTime ? "" : h) + "></dd>";
                    for (l = 0, c = this.units.length; c > l; l++) {
                        if (n = this.units[l], s = n.substr(0, 1).toUpperCase() + n.substr(1), r[n] = parseInt(e[n + "Max"] - (e[n + "Max"] - e[n + "Min"]) % e["step" + s], 10), o[n] = 0, u += '<dt class="ui_tpicker_' + n + '_label"' + (e["show" + s] ? "" : h) + ">" + e[n + "Text"] + '</dt><dd class="ui_tpicker_' + n + '"><div class="ui_tpicker_' + n + '_slider"' + (e["show" + s] ? "" : h) + "></div>", e["show" + s] && e[n + "Grid"] > 0) {
                            if (u += '<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>', "hour" == n)for (var d = e[n + "Min"]; d <= r[n]; d += parseInt(e[n + "Grid"], 10)) {
                                o[n]++;
                                var p = $.datepicker.formatTime(useAmpm(e.pickerTimeFormat || e.timeFormat) ? "hht" : "HH", {hour: d}, e);
                                u += '<td data-for="' + n + '">' + p + "</td>"
                            } else for (var f = e[n + "Min"]; f <= r[n]; f += parseInt(e[n + "Grid"], 10))o[n]++, u += '<td data-for="' + n + '">' + (10 > f ? "0" : "") + f + "</td>";
                            u += "</tr></table></div>"
                        }
                        u += "</dd>"
                    }
                    u += '<dt class="ui_tpicker_timezone_label"' + (e.showTimezone ? "" : h) + ">" + e.timezoneText + "</dt>", u += '<dd class="ui_tpicker_timezone" ' + (e.showTimezone ? "" : h) + "></dd>", u += "</dl></div>";
                    var m = $(u);
                    for (e.timeOnly === !0 && (m.prepend('<div class="ui-widget-header ui-helper-clearfix ui-corner-all"><div class="ui-datepicker-title">' + e.timeOnlyTitle + "</div></div>"), t.find(".ui-datepicker-header, .ui-datepicker-calendar").hide()), l = 0, c = i.units.length; c > l; l++)n = i.units[l], s = n.substr(0, 1).toUpperCase() + n.substr(1), i[n + "_slider"] = i.control.create(i, m.find(".ui_tpicker_" + n + "_slider"), n, i[n], e[n + "Min"], r[n], e["step" + s]), e["show" + s] && e[n + "Grid"] > 0 && (a = 100 * o[n] * e[n + "Grid"] / (r[n] - e[n + "Min"]), m.find(".ui_tpicker_" + n + " table").css({
                        width: a + "%",
                        marginLeft: e.isRTL ? "0" : a / (-2 * o[n]) + "%",
                        marginRight: e.isRTL ? a / (-2 * o[n]) + "%" : "0",
                        borderCollapse: "collapse"
                    }).find("td").click(function (t) {
                        var e = $(this), s = e.html(), r = parseInt(s.replace(/[^0-9]/g), 10), o = s.replace(/[^apm]/gi), a = e.data("for");
                        "hour" == a && (-1 !== o.indexOf("p") && 12 > r ? r += 12 : -1 !== o.indexOf("a") && 12 === r && (r = 0)), i.control.value(i, i[a + "_slider"], n, r), i._onTimeChange(), i._onSelectHandler()
                    }).css({cursor: "pointer", width: 100 / o[n] + "%", textAlign: "center", overflow: "hidden"}));
                    if (this.timezone_select = m.find(".ui_tpicker_timezone").append("<select></select>").find("select"), $.fn.append.apply(this.timezone_select, $.map(e.timezoneList, function (t, e) {
                            return $("<option />").val("object" == typeof t ? t.value : t).text("object" == typeof t ? t.label : t)
                        })), "undefined" != typeof this.timezone && null !== this.timezone && "" !== this.timezone) {
                        var g = new Date(this.inst.selectedYear, this.inst.selectedMonth, this.inst.selectedDay, 12), v = $.timepicker.timeZoneOffsetString(g);
                        v == this.timezone ? selectLocalTimeZone(i) : this.timezone_select.val(this.timezone)
                    } else"undefined" != typeof this.hour && null !== this.hour && "" !== this.hour ? this.timezone_select.val(e.defaultTimezone) : selectLocalTimeZone(i);
                    this.timezone_select.change(function () {
                        i._defaults.useLocalTimezone = !1, i._onTimeChange(), i._onSelectHandler()
                    });
                    var _ = t.find(".ui-datepicker-buttonpane");
                    if (_.length ? _.before(m) : t.append(m), this.$timeObj = m.find(".ui_tpicker_time"), null !== this.inst) {
                        var y = this.timeDefined;
                        this._onTimeChange(), this.timeDefined = y
                    }
                    if (this._defaults.addSliderAccess) {
                        var b = this._defaults.sliderAccessArgs, w = this._defaults.isRTL;
                        b.isRTL = w, setTimeout(function () {
                            if (0 === m.find(".ui-slider-access").length) {
                                m.find(".ui-slider:visible").sliderAccess(b);
                                var t = m.find(".ui-slider-access:eq(0)").outerWidth(!0);
                                t && m.find("table:visible").each(function () {
                                    var e = $(this), i = e.outerWidth(), n = e.css(w ? "marginRight" : "marginLeft").toString().replace("%", ""), s = i - t, r = n * s / i + "%", o = {
                                        width: s,
                                        marginRight: 0,
                                        marginLeft: 0
                                    };
                                    o[w ? "marginRight" : "marginLeft"] = r, e.css(o)
                                })
                            }
                        }, 10)
                    }
                }
            },
            _limitMinMaxDateTime: function (t, e) {
                var i = this._defaults, n = new Date(t.selectedYear, t.selectedMonth, t.selectedDay);
                if (this._defaults.showTimepicker) {
                    if (null !== $.datepicker._get(t, "minDateTime") && void 0 !== $.datepicker._get(t, "minDateTime") && n) {
                        var s = $.datepicker._get(t, "minDateTime"), r = new Date(s.getFullYear(), s.getMonth(), s.getDate(), 0, 0, 0, 0);
                        (null === this.hourMinOriginal || null === this.minuteMinOriginal || null === this.secondMinOriginal || null === this.millisecMinOriginal) && (this.hourMinOriginal = i.hourMin, this.minuteMinOriginal = i.minuteMin, this.secondMinOriginal = i.secondMin, this.millisecMinOriginal = i.millisecMin), t.settings.timeOnly || r.getTime() == n.getTime() ? (this._defaults.hourMin = s.getHours(), this.hour <= this._defaults.hourMin ? (this.hour = this._defaults.hourMin, this._defaults.minuteMin = s.getMinutes(), this.minute <= this._defaults.minuteMin ? (this.minute = this._defaults.minuteMin, this._defaults.secondMin = s.getSeconds(), this.second <= this._defaults.secondMin ? (this.second = this._defaults.secondMin, this._defaults.millisecMin = s.getMilliseconds()) : (this.millisec < this._defaults.millisecMin && (this.millisec = this._defaults.millisecMin), this._defaults.millisecMin = this.millisecMinOriginal)) : (this._defaults.secondMin = this.secondMinOriginal, this._defaults.millisecMin = this.millisecMinOriginal)) : (this._defaults.minuteMin = this.minuteMinOriginal, this._defaults.secondMin = this.secondMinOriginal, this._defaults.millisecMin = this.millisecMinOriginal)) : (this._defaults.hourMin = this.hourMinOriginal, this._defaults.minuteMin = this.minuteMinOriginal, this._defaults.secondMin = this.secondMinOriginal, this._defaults.millisecMin = this.millisecMinOriginal)
                    }
                    if (null !== $.datepicker._get(t, "maxDateTime") && void 0 !== $.datepicker._get(t, "maxDateTime") && n) {
                        var o = $.datepicker._get(t, "maxDateTime"), a = new Date(o.getFullYear(), o.getMonth(), o.getDate(), 0, 0, 0, 0);
                        (null === this.hourMaxOriginal || null === this.minuteMaxOriginal || null === this.secondMaxOriginal) && (this.hourMaxOriginal = i.hourMax, this.minuteMaxOriginal = i.minuteMax, this.secondMaxOriginal = i.secondMax, this.millisecMaxOriginal = i.millisecMax), t.settings.timeOnly || a.getTime() == n.getTime() ? (this._defaults.hourMax = o.getHours(), this.hour >= this._defaults.hourMax ? (this.hour = this._defaults.hourMax, this._defaults.minuteMax = o.getMinutes(), this.minute >= this._defaults.minuteMax ? (this.minute = this._defaults.minuteMax, this._defaults.secondMax = o.getSeconds(), this.second >= this._defaults.secondMax ? (this.second = this._defaults.secondMax, this._defaults.millisecMax = o.getMilliseconds()) : (this.millisec > this._defaults.millisecMax && (this.millisec = this._defaults.millisecMax), this._defaults.millisecMax = this.millisecMaxOriginal)) : (this._defaults.secondMax = this.secondMaxOriginal, this._defaults.millisecMax = this.millisecMaxOriginal)) : (this._defaults.minuteMax = this.minuteMaxOriginal, this._defaults.secondMax = this.secondMaxOriginal, this._defaults.millisecMax = this.millisecMaxOriginal)) : (this._defaults.hourMax = this.hourMaxOriginal, this._defaults.minuteMax = this.minuteMaxOriginal, this._defaults.secondMax = this.secondMaxOriginal, this._defaults.millisecMax = this.millisecMaxOriginal)
                    }
                    if (void 0 !== e && e === !0) {
                        var l = parseInt(this._defaults.hourMax - (this._defaults.hourMax - this._defaults.hourMin) % this._defaults.stepHour, 10), c = parseInt(this._defaults.minuteMax - (this._defaults.minuteMax - this._defaults.minuteMin) % this._defaults.stepMinute, 10), h = parseInt(this._defaults.secondMax - (this._defaults.secondMax - this._defaults.secondMin) % this._defaults.stepSecond, 10), u = parseInt(this._defaults.millisecMax - (this._defaults.millisecMax - this._defaults.millisecMin) % this._defaults.stepMillisec, 10);
                        this.hour_slider && (this.control.options(this, this.hour_slider, "hour", {
                            min: this._defaults.hourMin,
                            max: l
                        }), this.control.value(this, this.hour_slider, "hour", this.hour - this.hour % this._defaults.stepHour)), this.minute_slider && (this.control.options(this, this.minute_slider, "minute", {
                            min: this._defaults.minuteMin,
                            max: c
                        }), this.control.value(this, this.minute_slider, "minute", this.minute - this.minute % this._defaults.stepMinute)), this.second_slider && (this.control.options(this, this.second_slider, "second", {
                            min: this._defaults.secondMin,
                            max: h
                        }), this.control.value(this, this.second_slider, "second", this.second - this.second % this._defaults.stepSecond)), this.millisec_slider && (this.control.options(this, this.millisec_slider, "millisec", {
                            min: this._defaults.millisecMin,
                            max: u
                        }), this.control.value(this, this.millisec_slider, "millisec", this.millisec - this.millisec % this._defaults.stepMillisec))
                    }
                }
            },
            _onTimeChange: function () {
                var t = this.hour_slider ? this.control.value(this, this.hour_slider, "hour") : !1, e = this.minute_slider ? this.control.value(this, this.minute_slider, "minute") : !1, i = this.second_slider ? this.control.value(this, this.second_slider, "second") : !1, n = this.millisec_slider ? this.control.value(this, this.millisec_slider, "millisec") : !1, s = this.timezone_select ? this.timezone_select.val() : !1, r = this._defaults, o = r.pickerTimeFormat || r.timeFormat, a = r.pickerTimeSuffix || r.timeSuffix;
                "object" == typeof t && (t = !1), "object" == typeof e && (e = !1), "object" == typeof i && (i = !1), "object" == typeof n && (n = !1), "object" == typeof s && (s = !1), t !== !1 && (t = parseInt(t, 10)), e !== !1 && (e = parseInt(e, 10)), i !== !1 && (i = parseInt(i, 10)), n !== !1 && (n = parseInt(n, 10));
                var l = r[12 > t ? "amNames" : "pmNames"][0], c = t != this.hour || e != this.minute || i != this.second || n != this.millisec || this.ampm.length > 0 && 12 > t != (-1 !== $.inArray(this.ampm.toUpperCase(), this.amNames)) || null === this.timezone && s != this.defaultTimezone || null !== this.timezone && s != this.timezone;
                c && (t !== !1 && (this.hour = t), e !== !1 && (this.minute = e), i !== !1 && (this.second = i), n !== !1 && (this.millisec = n), s !== !1 && (this.timezone = s), this.inst || (this.inst = $.datepicker._getInst(this.$input[0])), this._limitMinMaxDateTime(this.inst, !0)), useAmpm(r.timeFormat) && (this.ampm = l), this.formattedTime = $.datepicker.formatTime(r.timeFormat, this, r), this.$timeObj && this.$timeObj.text(o === r.timeFormat ? this.formattedTime + a : $.datepicker.formatTime(o, this, r) + a), this.timeDefined = !0, c && this._updateDateTime()
            },
            _onSelectHandler: function () {
                var t = this._defaults.onSelect || this.inst.settings.onSelect, e = this.$input ? this.$input[0] : null;
                t && e && t.apply(e, [this.formattedDateTime, this])
            },
            _updateDateTime: function (t) {
                t = this.inst || t;
                var e = $.datepicker._daylightSavingAdjust(new Date(t.selectedYear, t.selectedMonth, t.selectedDay)), i = $.datepicker._get(t, "dateFormat"), n = $.datepicker._getFormatConfig(t), s = null !== e && this.timeDefined;
                this.formattedDate = $.datepicker.formatDate(i, null === e ? new Date : e, n);
                var r = this.formattedDate;
                if ("" === t.lastVal && (t.currentYear = t.selectedYear, t.currentMonth = t.selectedMonth, t.currentDay = t.selectedDay), this._defaults.timeOnly === !0 ? r = this.formattedTime : this._defaults.timeOnly !== !0 && (this._defaults.alwaysSetTime || s) && (r += this._defaults.separator + this.formattedTime + this._defaults.timeSuffix), this.formattedDateTime = r, this._defaults.showTimepicker)if (this.$altInput && this._defaults.altFieldTimeOnly === !0)this.$altInput.val(this.formattedTime), this.$input.val(this.formattedDate); else if (this.$altInput) {
                    this.$input.val(r);
                    var o = "", a = this._defaults.altSeparator ? this._defaults.altSeparator : this._defaults.separator, l = this._defaults.altTimeSuffix ? this._defaults.altTimeSuffix : this._defaults.timeSuffix;
                    o = this._defaults.altFormat ? $.datepicker.formatDate(this._defaults.altFormat, null === e ? new Date : e, n) : this.formattedDate, o && (o += a), o += this._defaults.altTimeFormat ? $.datepicker.formatTime(this._defaults.altTimeFormat, this, this._defaults) + l : this.formattedTime + l, this.$altInput.val(o)
                } else this.$input.val(r); else this.$input.val(this.formattedDate);
                this.$input.trigger("change")
            },
            _onFocus: function () {
                if (!this.$input.val() && this._defaults.defaultValue) {
                    this.$input.val(this._defaults.defaultValue);
                    var t = $.datepicker._getInst(this.$input.get(0)), e = $.datepicker._get(t, "timepicker");
                    if (e && e._defaults.timeOnly && t.input.val() != t.lastVal)try {
                        $.datepicker._updateDatepicker(t)
                    } catch (i) {
                        $.timepicker.log(i)
                    }
                }
            },
            _controls: {
                slider: {
                    create: function (t, e, i, n, s, r, o) {
                        var a = t._defaults.isRTL;
                        return e.prop("slide", null).slider({
                            orientation: "horizontal",
                            value: a ? -1 * n : n,
                            min: a ? -1 * r : s,
                            max: a ? -1 * s : r,
                            step: o,
                            slide: function (e, n) {
                                t.control.value(t, $(this), i, a ? -1 * n.value : n.value), t._onTimeChange()
                            },
                            stop: function (e, i) {
                                t._onSelectHandler()
                            }
                        })
                    }, options: function (t, e, i, n, s) {
                        if (t._defaults.isRTL) {
                            if ("string" == typeof n)return "min" == n || "max" == n ? void 0 !== s ? e.slider(n, -1 * s) : Math.abs(e.slider(n)) : e.slider(n);
                            var r = n.min, o = n.max;
                            return n.min = n.max = null, void 0 !== r && (n.max = -1 * r), void 0 !== o && (n.min = -1 * o), e.slider(n)
                        }
                        return "string" == typeof n && void 0 !== s ? e.slider(n, s) : e.slider(n)
                    }, value: function (t, e, i, n) {
                        return t._defaults.isRTL ? void 0 !== n ? e.slider("value", -1 * n) : Math.abs(e.slider("value")) : void 0 !== n ? e.slider("value", n) : e.slider("value")
                    }
                }, select: {
                    create: function (t, e, i, n, s, r, o) {
                        for (var a = '<select class="ui-timepicker-select" data-unit="' + i + '" data-min="' + s + '" data-max="' + r + '" data-step="' + o + '">', l = t._defaults.pickerTimeFormat || t._defaults.timeFormat, c = s; r >= c; c += o)a += '<option value="' + c + '"' + (c == n ? " selected" : "") + ">", a += "hour" == i ? $.datepicker.formatTime($.trim(l.replace(/[^ht ]/gi, "")), {hour: c}, t._defaults) : "millisec" == i || c >= 10 ? c : "0" + c.toString(), a += "</option>";
                        return a += "</select>", e.children("select").remove(), $(a).appendTo(e).change(function (e) {
                            t._onTimeChange(), t._onSelectHandler()
                        }), e
                    }, options: function (t, e, i, n, s) {
                        var r = {}, o = e.children("select");
                        if ("string" == typeof n) {
                            if (void 0 === s)return o.data(n);
                            r[n] = s
                        } else r = n;
                        return t.control.create(t, e, o.data("unit"), o.val(), r.min || o.data("min"), r.max || o.data("max"), r.step || o.data("step"))
                    }, value: function (t, e, i, n) {
                        var s = e.children("select");
                        return void 0 !== n ? s.val(n) : s.val()
                    }
                }
            }
        }), $.fn.extend({
            timepicker: function (t) {
                t = t || {};
                var e = Array.prototype.slice.call(arguments);
                return "object" == typeof t && (e[0] = $.extend(t, {timeOnly: !0})), $(this).each(function () {
                    $.fn.datetimepicker.apply($(this), e)
                })
            }, datetimepicker: function (t) {
                t = t || {};
                var e = arguments;
                return "string" == typeof t ? "getDate" == t ? $.fn.datepicker.apply($(this[0]), e) : this.each(function () {
                    var t = $(this);
                    t.datepicker.apply(t, e)
                }) : this.each(function () {
                    var e = $(this);
                    e.datepicker($.timepicker._newInst(e, t)._defaults)
                })
            }
        }), $.datepicker.parseDateTime = function (t, e, i, n, s) {
            var r = parseDateTimeInternal(t, e, i, n, s);
            if (r.timeObj) {
                var o = r.timeObj;
                r.date.setHours(o.hour, o.minute, o.second, o.millisec)
            }
            return r.date
        }, $.datepicker.parseTime = function (t, e, i) {
            var n = extendRemove(extendRemove({}, $.timepicker._defaults), i || {}), s = function (t, e, i) {
                var n, s = function (t, e) {
                    var i = [];
                    return t && $.merge(i, t), e && $.merge(i, e), i = $.map(i, function (t) {
                        return t.replace(/[.*+?|()\[\]{}\\]/g, "\\$&")
                    }), "(" + i.join("|") + ")?"
                }, r = function (t) {
                    var e = t.toLowerCase().match(/(h{1,2}|m{1,2}|s{1,2}|l{1}|t{1,2}|z|'.*?')/g), i = {
                        h: -1,
                        m: -1,
                        s: -1,
                        l: -1,
                        t: -1,
                        z: -1
                    };
                    if (e)for (var n = 0; n < e.length; n++)-1 == i[e[n].toString().charAt(0)] && (i[e[n].toString().charAt(0)] = n + 1);
                    return i
                }, o = "^" + t.toString().replace(/([hH]{1,2}|mm?|ss?|[tT]{1,2}|[lz]|'.*?')/g, function (t) {
                        var e = t.length;
                        switch (t.charAt(0).toLowerCase()) {
                            case"h":
                                return 1 === e ? "(\\d?\\d)" : "(\\d{" + e + "})";
                            case"m":
                                return 1 === e ? "(\\d?\\d)" : "(\\d{" + e + "})";
                            case"s":
                                return 1 === e ? "(\\d?\\d)" : "(\\d{" + e + "})";
                            case"l":
                                return "(\\d?\\d?\\d)";
                            case"z":
                                return "(z|[-+]\\d\\d:?\\d\\d|\\S+)?";
                            case"t":
                                return s(i.amNames, i.pmNames);
                            default:
                                return "(" + t.replace(/\'/g, "").replace(/(\.|\$|\^|\\|\/|\(|\)|\[|\]|\?|\+|\*)/g, function (t) {
                                        return "\\" + t
                                    }) + ")?"
                        }
                    }).replace(/\s/g, "\\s?") + i.timeSuffix + "$", a = r(t), l = "";
                n = e.match(new RegExp(o, "i"));
                var c = {hour: 0, minute: 0, second: 0, millisec: 0};
                if (n) {
                    if (-1 !== a.t && (void 0 === n[a.t] || 0 === n[a.t].length ? (l = "", c.ampm = "") : (l = -1 !== $.inArray(n[a.t].toUpperCase(), i.amNames) ? "AM" : "PM", c.ampm = i["AM" == l ? "amNames" : "pmNames"][0])), -1 !== a.h && ("AM" == l && "12" == n[a.h] ? c.hour = 0 : "PM" == l && "12" != n[a.h] ? c.hour = parseInt(n[a.h], 10) + 12 : c.hour = Number(n[a.h])), -1 !== a.m && (c.minute = Number(n[a.m])), -1 !== a.s && (c.second = Number(n[a.s])), -1 !== a.l && (c.millisec = Number(n[a.l])), -1 !== a.z && void 0 !== n[a.z]) {
                        var h = n[a.z].toUpperCase();
                        switch (h.length) {
                            case 1:
                                h = i.timezoneIso8601 ? "Z" : "+0000";
                                break;
                            case 5:
                                i.timezoneIso8601 && (h = "0000" == h.substring(1) ? "Z" : h.substring(0, 3) + ":" + h.substring(3));
                                break;
                            case 6:
                                i.timezoneIso8601 ? "00:00" == h.substring(1) && (h = "Z") : h = "Z" == h || "00:00" == h.substring(1) ? "+0000" : h.replace(/:/, "")
                        }
                        c.timezone = h
                    }
                    return c
                }
                return !1
            }, r = function (t, e, i) {
                try {
                    var n = new Date("2012-01-01 " + e);
                    if (isNaN(n.getTime()) && (n = new Date("2012-01-01T" + e), isNaN(n.getTime()) && (n = new Date("01/01/2012 " + e), isNaN(n.getTime()))))throw"Unable to parse time with native Date: " + e;
                    return {
                        hour: n.getHours(),
                        minute: n.getMinutes(),
                        second: n.getSeconds(),
                        millisec: n.getMilliseconds(),
                        timezone: $.timepicker.timeZoneOffsetString(n)
                    }
                } catch (r) {
                    try {
                        return s(t, e, i)
                    } catch (o) {
                        $.timepicker.log("Unable to parse \ntimeString: " + e + "\ntimeFormat: " + t)
                    }
                }
                return !1
            };
            return "function" == typeof n.parse ? n.parse(t, e, n) : "loose" === n.parse ? r(t, e, n) : s(t, e, n)
        }, $.datepicker.formatTime = function (t, e, i) {
            i = i || {}, i = $.extend({}, $.timepicker._defaults, i), e = $.extend({
                hour: 0,
                minute: 0,
                second: 0,
                millisec: 0,
                timezone: "+0000"
            }, e);
            var n = t, s = i.amNames[0], r = parseInt(e.hour, 10);
            return r > 11 && (s = i.pmNames[0]), n = n.replace(/(?:HH?|hh?|mm?|ss?|[tT]{1,2}|[lz]|('.*?'|".*?"))/g, function (t) {
                switch (t) {
                    case"HH":
                        return ("0" + r).slice(-2);
                    case"H":
                        return r;
                    case"hh":
                        return ("0" + convert24to12(r)).slice(-2);
                    case"h":
                        return convert24to12(r);
                    case"mm":
                        return ("0" + e.minute).slice(-2);
                    case"m":
                        return e.minute;
                    case"ss":
                        return ("0" + e.second).slice(-2);
                    case"s":
                        return e.second;
                    case"l":
                        return ("00" + e.millisec).slice(-3);
                    case"z":
                        return null === e.timezone ? i.defaultTimezone : e.timezone;
                    case"T":
                        return s.charAt(0).toUpperCase();
                    case"TT":
                        return s.toUpperCase();
                    case"t":
                        return s.charAt(0).toLowerCase();
                    case"tt":
                        return s.toLowerCase();
                    default:
                        return t.replace(/\'/g, "") || "'"
                }
            }), n = $.trim(n)
        }, $.datepicker._base_selectDate = $.datepicker._selectDate, $.datepicker._selectDate = function (t, e) {
            var i = this._getInst($(t)[0]), n = this._get(i, "timepicker");
            n ? (n._limitMinMaxDateTime(i, !0), i.inline = i.stay_open = !0, this._base_selectDate(t, e), i.inline = i.stay_open = !1, this._notifyChange(i), this._updateDatepicker(i)) : this._base_selectDate(t, e)
        }, $.datepicker._base_updateDatepicker = $.datepicker._updateDatepicker, $.datepicker._updateDatepicker = function (t) {
            var e = t.input[0];
            if (!($.datepicker._curInst && $.datepicker._curInst != t && $.datepicker._datepickerShowing && $.datepicker._lastInput != e || "boolean" == typeof t.stay_open && t.stay_open !== !1)) {
                this._base_updateDatepicker(t);
                var i = this._get(t, "timepicker");
                i && i._addTimePicker(t)
            }
        }, $.datepicker._base_doKeyPress = $.datepicker._doKeyPress, $.datepicker._doKeyPress = function (t) {
            var e = $.datepicker._getInst(t.target), i = $.datepicker._get(e, "timepicker");
            if (i && $.datepicker._get(e, "constrainInput")) {
                var n = useAmpm(i._defaults.timeFormat), s = $.datepicker._possibleChars($.datepicker._get(e, "dateFormat")), r = i._defaults.timeFormat.toString().replace(/[hms]/g, "").replace(/TT/g, n ? "APM" : "").replace(/Tt/g, n ? "AaPpMm" : "").replace(/tT/g, n ? "AaPpMm" : "").replace(/T/g, n ? "AP" : "").replace(/tt/g, n ? "apm" : "").replace(/t/g, n ? "ap" : "") + " " + i._defaults.separator + i._defaults.timeSuffix + (i._defaults.showTimezone ? i._defaults.timezoneList.join("") : "") + i._defaults.amNames.join("") + i._defaults.pmNames.join("") + s, o = String.fromCharCode(void 0 === t.charCode ? t.keyCode : t.charCode);
                return t.ctrlKey || " " > o || !s || r.indexOf(o) > -1
            }
            return $.datepicker._base_doKeyPress(t)
        }, $.datepicker._base_updateAlternate = $.datepicker._updateAlternate, $.datepicker._updateAlternate = function (t) {
            var e = this._get(t, "timepicker");
            if (e) {
                var i = e._defaults.altField;
                if (i) {
                    var n = (e._defaults.altFormat || e._defaults.dateFormat, this._getDate(t)), s = $.datepicker._getFormatConfig(t), r = "", o = e._defaults.altSeparator ? e._defaults.altSeparator : e._defaults.separator, a = e._defaults.altTimeSuffix ? e._defaults.altTimeSuffix : e._defaults.timeSuffix, l = null !== e._defaults.altTimeFormat ? e._defaults.altTimeFormat : e._defaults.timeFormat;
                    r += $.datepicker.formatTime(l, e, e._defaults) + a, e._defaults.timeOnly || e._defaults.altFieldTimeOnly || null === n || (r = e._defaults.altFormat ? $.datepicker.formatDate(e._defaults.altFormat, n, s) + o + r : e.formattedDate + o + r), $(i).val(r)
                }
            } else $.datepicker._base_updateAlternate(t)
        }, $.datepicker._base_doKeyUp = $.datepicker._doKeyUp, $.datepicker._doKeyUp = function (t) {
            var e = $.datepicker._getInst(t.target), i = $.datepicker._get(e, "timepicker");
            if (i && i._defaults.timeOnly && e.input.val() != e.lastVal)try {
                $.datepicker._updateDatepicker(e)
            } catch (n) {
                $.timepicker.log(n)
            }
            return $.datepicker._base_doKeyUp(t)
        }, $.datepicker._base_gotoToday = $.datepicker._gotoToday, $.datepicker._gotoToday = function (t) {
            var e = this._getInst($(t)[0]), i = e.dpDiv;
            this._base_gotoToday(t);
            var n = this._get(e, "timepicker");
            selectLocalTimeZone(n);
            var s = new Date;
            this._setTime(e, s), $(".ui-datepicker-today", i).click()
        }, $.datepicker._disableTimepickerDatepicker = function (t) {
            var e = this._getInst(t);
            if (e) {
                var i = this._get(e, "timepicker");
                $(t).datepicker("getDate"), i && (i._defaults.showTimepicker = !1, i._updateDateTime(e))
            }
        }, $.datepicker._enableTimepickerDatepicker = function (t) {
            var e = this._getInst(t);
            if (e) {
                var i = this._get(e, "timepicker");
                $(t).datepicker("getDate"), i && (i._defaults.showTimepicker = !0, i._addTimePicker(e), i._updateDateTime(e))
            }
        }, $.datepicker._setTime = function (t, e) {
            var i = this._get(t, "timepicker");
            if (i) {
                var n = i._defaults;
                i.hour = e ? e.getHours() : n.hour, i.minute = e ? e.getMinutes() : n.minute, i.second = e ? e.getSeconds() : n.second, i.millisec = e ? e.getMilliseconds() : n.millisec, i._limitMinMaxDateTime(t, !0), i._onTimeChange(), i._updateDateTime(t)
            }
        }, $.datepicker._setTimeDatepicker = function (t, e, i) {
            var n = this._getInst(t);
            if (n) {
                var s = this._get(n, "timepicker");
                if (s) {
                    this._setDateFromField(n);
                    var r;
                    e && ("string" == typeof e ? (s._parseTime(e, i), r = new Date, r.setHours(s.hour, s.minute, s.second, s.millisec)) : r = new Date(e.getTime()), "Invalid Date" == r.toString() && (r = void 0), this._setTime(n, r))
                }
            }
        }, $.datepicker._base_setDateDatepicker = $.datepicker._setDateDatepicker, $.datepicker._setDateDatepicker = function (t, e) {
            var i = this._getInst(t);
            if (i) {
                var n = e instanceof Date ? new Date(e.getTime()) : e;
                this._updateDatepicker(i), this._base_setDateDatepicker.apply(this, arguments), this._setTimeDatepicker(t, n, !0)
            }
        }, $.datepicker._base_getDateDatepicker = $.datepicker._getDateDatepicker, $.datepicker._getDateDatepicker = function (t, e) {
            var i = this._getInst(t);
            if (i) {
                var n = this._get(i, "timepicker");
                if (n) {
                    void 0 === i.lastVal && this._setDateFromField(i, e);
                    var s = this._getDate(i);
                    return s && n._parseTime($(t).val(), n.timeOnly) && s.setHours(n.hour, n.minute, n.second, n.millisec), s
                }
                return this._base_getDateDatepicker(t, e)
            }
        }, $.datepicker._base_parseDate = $.datepicker.parseDate, $.datepicker.parseDate = function (t, e, i) {
            var n;
            try {
                n = this._base_parseDate(t, e, i)
            } catch (s) {
                if (!(s.indexOf(":") >= 0))throw s;
                n = this._base_parseDate(t, e.substring(0, e.length - (s.length - s.indexOf(":") - 2)), i), $.timepicker.log("Error parsing the date string: " + s + "\ndate string = " + e + "\ndate format = " + t)
            }
            return n
        }, $.datepicker._base_formatDate = $.datepicker._formatDate, $.datepicker._formatDate = function (t, e, i, n) {
            var s = this._get(t, "timepicker");
            return s ? (s._updateDateTime(t), s.$input.val()) : this._base_formatDate(t)
        }, $.datepicker._base_optionDatepicker = $.datepicker._optionDatepicker, $.datepicker._optionDatepicker = function (t, e, i) {
            var n, s = this._getInst(t);
            if (!s)return null;
            var r = this._get(s, "timepicker");
            if (r) {
                var o, a = null, l = null, c = null, h = r._defaults.evnts, u = {};
                if ("string" == typeof e) {
                    if ("minDate" === e || "minDateTime" === e)a = i; else if ("maxDate" === e || "maxDateTime" === e)l = i; else if ("onSelect" === e)c = i; else if (h.hasOwnProperty(e)) {
                        if ("undefined" == typeof i)return h[e];
                        u[e] = i, n = {}
                    }
                } else if ("object" == typeof e) {
                    e.minDate ? a = e.minDate : e.minDateTime ? a = e.minDateTime : e.maxDate ? l = e.maxDate : e.maxDateTime && (l = e.maxDateTime);
                    for (o in h)h.hasOwnProperty(o) && e[o] && (u[o] = e[o])
                }
                for (o in u)u.hasOwnProperty(o) && (h[o] = u[o], n || (n = $.extend({}, e)), delete n[o]);
                if (n && isEmptyObject(n))return;
                a ? (a = 0 === a ? new Date : new Date(a), r._defaults.minDate = a, r._defaults.minDateTime = a) : l ? (l = 0 === l ? new Date : new Date(l), r._defaults.maxDate = l, r._defaults.maxDateTime = l) : c && (r._defaults.onSelect = c)
            }
            return void 0 === i ? this._base_optionDatepicker.call($.datepicker, t, e) : this._base_optionDatepicker.call($.datepicker, t, n || e, i)
        };
        var isEmptyObject = function (t) {
            var e;
            for (e in t)if (t.hasOwnProperty(t))return !1;
            return !0
        }, extendRemove = function (t, e) {
            $.extend(t, e);
            for (var i in e)(null === e[i] || void 0 === e[i]) && (t[i] = e[i]);
            return t
        }, useAmpm = function (t) {
            return (-1 !== t.indexOf("t") || -1 !== t.indexOf("T")) && -1 !== t.indexOf("h")
        }, convert24to12 = function (t) {
            return t > 12 && (t -= 12), 0 === t && (t = 12), String(t)
        }, splitDateTime = function (t, e, i, n) {
            try {
                var s = n && n.separator ? n.separator : $.timepicker._defaults.separator, r = n && n.timeFormat ? n.timeFormat : $.timepicker._defaults.timeFormat, o = r.split(s), a = o.length, l = e.split(s), c = l.length;
                if (c > 1)return [l.splice(0, c - a).join(s), l.splice(0, a).join(s)]
            } catch (h) {
                if ($.timepicker.log("Could not split the date from the time. Please check the following datetimepicker options\nthrown error: " + h + "\ndateTimeString" + e + "\ndateFormat = " + t + "\nseparator = " + n.separator + "\ntimeFormat = " + n.timeFormat), h.indexOf(":") >= 0) {
                    var u = e.length - (h.length - h.indexOf(":") - 2);
                    e.substring(u);
                    return [$.trim(e.substring(0, u)), $.trim(e.substring(u))]
                }
                throw h
            }
            return [e, ""]
        }, parseDateTimeInternal = function (t, e, i, n, s) {
            var r, o = splitDateTime(t, i, n, s);
            if (r = $.datepicker._base_parseDate(t, o[0], n), "" !== o[1]) {
                var a = o[1], l = $.datepicker.parseTime(e, a, s);
                if (null === l)throw"Wrong time format";
                return {date: r, timeObj: l}
            }
            return {date: r}
        }, selectLocalTimeZone = function (t, e) {
            if (t && t.timezone_select) {
                t._defaults.useLocalTimezone = !0;
                var i = "undefined" != typeof e ? e : new Date, n = $.timepicker.timeZoneOffsetString(i);
                t._defaults.timezoneIso8601 && (n = n.substring(0, 3) + ":" + n.substring(3)), t.timezone_select.val(n)
            }
        };
        $.timepicker = new Timepicker, $.timepicker.timeZoneOffsetString = function (t) {
            var e = -1 * t.getTimezoneOffset(), i = e % 60, n = (e - i) / 60;
            return (e >= 0 ? "+" : "-") + ("0" + (101 * n).toString()).slice(-2) + ("0" + (101 * i).toString()).slice(-2)
        }, $.timepicker.timeRange = function (t, e, i) {
            return $.timepicker.handleRange("timepicker", t, e, i)
        }, $.timepicker.dateTimeRange = function (t, e, i) {
            $.timepicker.dateRange(t, e, i, "datetimepicker")
        }, $.timepicker.dateRange = function (t, e, i, n) {
            n = n || "datepicker", $.timepicker.handleRange(n, t, e, i)
        }, $.timepicker.handleRange = function (t, e, i, n) {
            function s(t, n, s) {
                n.val() && new Date(e.val()) > new Date(i.val()) && n.val(s)
            }

            function r(e, i, n) {
                if ($(e).val()) {
                    var s = $(e)[t].call($(e), "getDate");
                    s.getTime && $(i)[t].call($(i), "option", n, s)
                }
            }

            return $.fn[t].call(e, $.extend({
                onClose: function (t, e) {
                    s(this, i, t)
                }, onSelect: function (t) {
                    r(this, i, "minDate")
                }
            }, n, n.start)), $.fn[t].call(i, $.extend({
                onClose: function (t, i) {
                    s(this, e, t)
                }, onSelect: function (t) {
                    r(this, e, "maxDate")
                }
            }, n, n.end)), "timepicker" != t && n.reformat && $([e, i]).each(function () {
                var e = $(this)[t].call($(this), "option", "dateFormat"), i = new Date($(this).val());
                $(this).val() && i && $(this).val($.datepicker.formatDate(e, i))
            }), s(e, i, e.val()), r(e, i, "minDate"), r(i, e, "maxDate"), $([e.get(0), i.get(0)])
        }, $.timepicker.log = function (t) {
            window.console
        }, $.timepicker.version = "1.2.2"
    }
}(jQuery), function (t) {
    t.timepicker.regional["zh-CN"] = {
        timeOnlyTitle: "选择时间",
        timeText: "时间",
        hourText: "小时",
        minuteText: "分钟",
        secondText: "秒钟",
        millisecText: "微秒",
        timezoneText: "时区",
        currentText: "当前时间",
        closeText: "确认",
        timeFormat: "HH:mm",
        amNames: ["AM", "A"],
        pmNames: ["PM", "P"],
        isRTL: !1
    }, t.timepicker.setDefaults(t.timepicker.regional["zh-CN"])
}(jQuery), define("datetimepicker", ["jqueryui", "jquery"], function () {
}), define("tpl!components/popover/rename/app.template", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div class="ui-popover-inner">\n    <input\n        class="input-medium js-name-input"\n        type="text"\n        value="' + (null == (__t = name) ? "" : __t) + '"\n        ', max_input_length && (__p += 'maxlength="' + (null == (__t = max_input_length) ? "" : __t) + '"'), __p += '\n        style="margin-bottom: 0;"\n        >\n    <a href="javascript:;" class="ui-btn ui-btn-primary js-save">确定</a>\n    <a href="javascript:;" class="ui-btn js-cancel">取消</a>\n</div>\n';
        return __p
    }
}), define("components/popover/rename/app", ["require", "underscore", "jquery", "core/utils", "../_base/app", "datetimepicker", "tpl!./app.template"], function (t) {
    var e = t("underscore"), i = (t("jquery"), t("core/utils")), n = t("../_base/app");
    return t("datetimepicker"), n.extend({
        template: t("tpl!./app.template"),
        ui: {input: ".js-name-input", save: ".js-save", cancel: ".js-cancel"},
        events: {
            "click @ui.cancel": "close",
            "click @ui.save": "save",
            "keypress @ui.input": "handleNameInputKeypress"
        },
        serializeData: function () {
            var t = this.options.data || {};
            return e.extend({max_input_length: 0}, t)
        },
        save: function () {
            var t = this.ui.input.val();
            e.isFunction(this.options.callback) && this.options.callback(t), this.close()
        },
        handleNameInputKeypress: function (t) {
            t.keyCode === i.keyCode.ENTER && this.save()
        }
    })
}), function () {
    function t(t) {
        return t.replace(/,/g, ".").replace(/[^0-9\.]/g, "")
    }

    function e(e) {
        return parseFloat(t(e)) >= 10
    }

    var i, n = {
        bridge: null,
        version: "0.0.0",
        disabled: null,
        outdated: null,
        ready: null
    }, s = {}, r = 0, o = {}, a = 0, l = {}, c = null, h = null, u = function () {
        var t, e, i, n, s = "ZeroClipboard.swf";
        if (document.currentScript && (n = document.currentScript.src)); else {
            var r = document.getElementsByTagName("script");
            if ("readyState" in r[0])for (t = r.length; t-- && ("interactive" !== r[t].readyState || !(n = r[t].src));); else if ("loading" === document.readyState)n = r[r.length - 1].src; else {
                for (t = r.length; t--;) {
                    if (i = r[t].src, !i) {
                        e = null;
                        break
                    }
                    if (i = i.split("#")[0].split("?")[0], i = i.slice(0, i.lastIndexOf("/") + 1), null == e)e = i; else if (e !== i) {
                        e = null;
                        break
                    }
                }
                null !== e && (n = e)
            }
        }
        return n && (n = n.split("#")[0].split("?")[0], s = n.slice(0, n.lastIndexOf("/") + 1) + s), s
    }(), d = function () {
        var t = /\-([a-z])/g, e = function (t, e) {
            return e.toUpperCase()
        };
        return function (i) {
            return i.replace(t, e)
        }
    }(), p = function (t, e) {
        var i, n, s;
        return window.getComputedStyle ? i = window.getComputedStyle(t, null).getPropertyValue(e) : (n = d(e), i = t.currentStyle ? t.currentStyle[n] : t.style[n]), "cursor" !== e || i && "auto" !== i || (s = t.tagName.toLowerCase(), "a" !== s) ? i : "pointer"
    }, f = function (t) {
        t || (t = window.event);
        var e;
        this !== window ? e = this : t.target ? e = t.target : t.srcElement && (e = t.srcElement), N.activate(e)
    }, m = function (t, e, i) {
        t && 1 === t.nodeType && (t.addEventListener ? t.addEventListener(e, i, !1) : t.attachEvent && t.attachEvent("on" + e, i))
    }, g = function (t, e, i) {
        t && 1 === t.nodeType && (t.removeEventListener ? t.removeEventListener(e, i, !1) : t.detachEvent && t.detachEvent("on" + e, i))
    }, v = function (t, e) {
        if (!t || 1 !== t.nodeType)return t;
        if (t.classList)return t.classList.contains(e) || t.classList.add(e), t;
        if (e && "string" == typeof e) {
            var i = (e || "").split(/\s+/);
            if (1 === t.nodeType)if (t.className) {
                for (var n = " " + t.className + " ", s = t.className, r = 0, o = i.length; o > r; r++)n.indexOf(" " + i[r] + " ") < 0 && (s += " " + i[r]);
                t.className = s.replace(/^\s+|\s+$/g, "")
            } else t.className = e
        }
        return t
    }, _ = function (t, e) {
        if (!t || 1 !== t.nodeType)return t;
        if (t.classList)return t.classList.contains(e) && t.classList.remove(e), t;
        if (e && "string" == typeof e || void 0 === e) {
            var i = (e || "").split(/\s+/);
            if (1 === t.nodeType && t.className)if (e) {
                for (var n = (" " + t.className + " ").replace(/[\n\t]/g, " "), s = 0, r = i.length; r > s; s++)n = n.replace(" " + i[s] + " ", " ");
                t.className = n.replace(/^\s+|\s+$/g, "")
            } else t.className = ""
        }
        return t
    }, y = function () {
        var t, e, i, n = 1;
        return "function" == typeof document.body.getBoundingClientRect && (t = document.body.getBoundingClientRect(), e = t.right - t.left, i = document.body.offsetWidth, n = Math.round(e / i * 100) / 100), n
    }, b = function (t, e) {
        var i = {left: 0, top: 0, width: 0, height: 0, zIndex: T(e) - 1};
        if (t.getBoundingClientRect) {
            var n, s, r, o = t.getBoundingClientRect();
            "pageXOffset" in window && "pageYOffset" in window ? (n = window.pageXOffset, s = window.pageYOffset) : (r = y(), n = Math.round(document.documentElement.scrollLeft / r), s = Math.round(document.documentElement.scrollTop / r));
            var a = document.documentElement.clientLeft || 0, l = document.documentElement.clientTop || 0;
            i.left = o.left + n - a, i.top = o.top + s - l, i.width = "width" in o ? o.width : o.right - o.left, i.height = "height" in o ? o.height : o.bottom - o.top
        }
        return i
    }, w = function (t, e) {
        var i = null == e || e && e.cacheBust === !0 && e.useNoCache === !0;
        return i ? (-1 === t.indexOf("?") ? "?" : "&") + "noCache=" + (new Date).getTime() : ""
    }, x = function (t) {
        var e, i, n, s = [], r = [], o = [];
        if (t.trustedOrigins && ("string" == typeof t.trustedOrigins ? r.push(t.trustedOrigins) : "object" == typeof t.trustedOrigins && "length" in t.trustedOrigins && (r = r.concat(t.trustedOrigins))), t.trustedDomains && ("string" == typeof t.trustedDomains ? r.push(t.trustedDomains) : "object" == typeof t.trustedDomains && "length" in t.trustedDomains && (r = r.concat(t.trustedDomains))), r.length)for (e = 0, i = r.length; i > e; e++)if (r.hasOwnProperty(e) && r[e] && "string" == typeof r[e]) {
            if (n = F(r[e]), !n)continue;
            if ("*" === n) {
                o = [n];
                break
            }
            o.push.apply(o, [n, "//" + n, window.location.protocol + "//" + n])
        }
        return o.length && s.push("trustedOrigins=" + encodeURIComponent(o.join(","))), "string" == typeof t.jsModuleId && t.jsModuleId && s.push("jsModuleId=" + encodeURIComponent(t.jsModuleId)), s.join("&")
    }, k = function (t, e, i) {
        if ("function" == typeof e.indexOf)return e.indexOf(t, i);
        var n, s = e.length;
        for ("undefined" == typeof i ? i = 0 : 0 > i && (i = s + i), n = i; s > n; n++)if (e.hasOwnProperty(n) && e[n] === t)return n;
        return -1
    }, C = function (t) {
        if ("string" == typeof t)throw new TypeError("ZeroClipboard doesn't accept query strings.");
        return t.length ? t : [t]
    }, D = function (t, e, i, n) {
        n ? window.setTimeout(function () {
            t.apply(e, i)
        }, 0) : t.apply(e, i)
    }, T = function (t) {
        var e, i;
        return t && ("number" == typeof t && t > 0 ? e = t : "string" == typeof t && (i = parseInt(t, 10)) && !isNaN(i) && i > 0 && (e = i)), e || ("number" == typeof z.zIndex && z.zIndex > 0 ? e = z.zIndex : "string" == typeof z.zIndex && (i = parseInt(z.zIndex, 10)) && !isNaN(i) && i > 0 && (e = i)), e || 0
    }, S = function (t, e) {
        if (t && e !== !1 && "undefined" != typeof console && console && (console.warn || console.log)) {
            console.warn
        }
    }, M = function () {
        var t, e, i, n, s, r, o = arguments[0] || {};
        for (t = 1, e = arguments.length; e > t; t++)if (null != (i = arguments[t]))for (n in i)if (i.hasOwnProperty(n)) {
            if (s = o[n], r = i[n], o === r)continue;
            void 0 !== r && (o[n] = r)
        }
        return o
    }, F = function (t) {
        if (null == t || "" === t)return null;
        if (t = t.replace(/^\s+|\s+$/g, ""), "" === t)return null;
        var e = t.indexOf("//");
        t = -1 === e ? t : t.slice(e + 2);
        var i = t.indexOf("/");
        return t = -1 === i ? t : -1 === e || 0 === i ? null : t.slice(0, i), t && ".swf" === t.slice(-4).toLowerCase() ? null : t || null
    }, E = function () {
        var t = function (t, e) {
            var i, n, s;
            if (null != t && "*" !== e[0] && ("string" == typeof t && (t = [t]), "object" == typeof t && "length" in t))for (i = 0, n = t.length; n > i; i++)if (t.hasOwnProperty(i) && (s = F(t[i]))) {
                if ("*" === s) {
                    e.length = 0, e.push("*");
                    break
                }
                -1 === k(s, e) && e.push(s)
            }
        }, e = {always: "always", samedomain: "sameDomain", never: "never"};
        return function (i, n) {
            var s, r = n.allowScriptAccess;
            if ("string" == typeof r && (s = r.toLowerCase()) && /^always|samedomain|never$/.test(s))return e[s];
            var o = F(n.moviePath);
            null === o && (o = i);
            var a = [];
            t(n.trustedOrigins, a), t(n.trustedDomains, a);
            var l = a.length;
            if (l > 0) {
                if (1 === l && "*" === a[0])return "always";
                if (-1 !== k(i, a))return 1 === l && i === o ? "sameDomain" : "always"
            }
            return "never"
        }
    }(), I = function (t) {
        if (null == t)return [];
        if (Object.keys)return Object.keys(t);
        var e = [];
        for (var i in t)t.hasOwnProperty(i) && e.push(i);
        return e
    }, A = function (t) {
        if (t)for (var e in t)t.hasOwnProperty(e) && delete t[e];
        return t
    }, P = function () {
        var t = !1;
        if ("boolean" == typeof n.disabled)t = n.disabled === !1; else {
            if ("function" == typeof ActiveXObject)try {
                new ActiveXObject("ShockwaveFlash.ShockwaveFlash") && (t = !0)
            } catch (e) {
            }
            !t && navigator.mimeTypes["application/x-shockwave-flash"] && (t = !0)
        }
        return t
    }, N = function (t, e) {
        return this instanceof N ? (this.id = "" + r++, o[this.id] = {
            instance: this,
            elements: [],
            handlers: {}
        }, t && this.clip(t), "undefined" != typeof e && (S("new ZeroClipboard(elements, options)", z.debug), N.config(e)), this.options = N.config(), "boolean" != typeof n.disabled && (n.disabled = !P()), void(n.disabled === !1 && n.outdated !== !0 && null === n.bridge && (n.outdated = !1, n.ready = !1, j()))) : new N(t, e)
    };
    N.prototype.setText = function (t) {
        return t && "" !== t && (s["text/plain"] = t, n.ready === !0 && n.bridge && n.bridge.setText(t)), this
    }, N.prototype.setSize = function (t, e) {
        return n.ready === !0 && n.bridge && n.bridge.setSize(t, e), this
    };
    var $ = function (t) {
        n.ready === !0 && n.bridge && n.bridge.setHandCursor(t)
    };
    N.prototype.destroy = function () {
        this.unclip(), this.off(), delete o[this.id]
    };
    var O = function () {
        var t, e, i, n = [], s = I(o);
        for (t = 0, e = s.length; e > t; t++)i = o[s[t]].instance, i && i instanceof N && n.push(i);
        return n
    };
    N.version = "1.3.2";
    var z = {
        swfPath: u,
        trustedDomains: window.location.host ? [window.location.host] : [],
        cacheBust: !0,
        forceHandCursor: !1,
        zIndex: 999999999,
        debug: !0,
        title: null,
        autoActivate: !0
    };
    N.config = function (t) {
        "object" == typeof t && null !== t && M(z, t);
        {
            if ("string" != typeof t || !t) {
                var e = {};
                for (var i in z)z.hasOwnProperty(i) && ("object" == typeof z[i] && null !== z[i] ? "length" in z[i] ? e[i] = z[i].slice(0) : e[i] = M({}, z[i]) : e[i] = z[i]);
                return e
            }
            if (z.hasOwnProperty(t))return z[t]
        }
    }, N.destroy = function () {
        N.deactivate();
        for (var t in o)if (o.hasOwnProperty(t) && o[t]) {
            var e = o[t].instance;
            e && "function" == typeof e.destroy && e.destroy()
        }
        var i = H(n.bridge);
        i && i.parentNode && (i.parentNode.removeChild(i), n.ready = null, n.bridge = null)
    }, N.activate = function (t) {
        i && (_(i, z.hoverClass), _(i, z.activeClass)), i = t, v(t, z.hoverClass), R();
        var e = z.title || t.getAttribute("title");
        if (e) {
            var s = H(n.bridge);
            s && s.setAttribute("title", e)
        }
        var r = z.forceHandCursor === !0 || "pointer" === p(t, "cursor");
        $(r)
    }, N.deactivate = function () {
        var t = H(n.bridge);
        t && (t.style.left = "0px", t.style.top = "-9999px", t.removeAttribute("title")), i && (_(i, z.hoverClass), _(i, z.activeClass), i = null)
    };
    var j = function () {
        var t, e, i = document.getElementById("global-zeroclipboard-html-bridge");
        if (!i) {
            var s = N.config();
            s.jsModuleId = "string" == typeof c && c || "string" == typeof h && h || null;
            var r = E(window.location.host, z), o = x(s), a = z.moviePath + w(z.moviePath, z), l = '      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="global-zeroclipboard-flash-bridge" width="100%" height="100%">         <param name="movie" value="' + a + '"/>         <param name="allowScriptAccess" value="' + r + '"/>         <param name="scale" value="exactfit"/>         <param name="loop" value="false"/>         <param name="menu" value="false"/>         <param name="quality" value="best" />         <param name="bgcolor" value="#ffffff"/>         <param name="wmode" value="transparent"/>         <param name="flashvars" value="' + o + '"/>         <embed src="' + a + '"           loop="false" menu="false"           quality="best" bgcolor="#ffffff"           width="100%" height="100%"           name="global-zeroclipboard-flash-bridge"           allowScriptAccess="' + r + '"           allowFullScreen="false"           type="application/x-shockwave-flash"           wmode="transparent"           pluginspage="http://www.macromedia.com/go/getflashplayer"           flashvars="' + o + '"           scale="exactfit">         </embed>       </object>';
            i = document.createElement("div"), i.id = "global-zeroclipboard-html-bridge", i.setAttribute("class", "global-zeroclipboard-container"), i.style.position = "absolute", i.style.left = "0px", i.style.top = "-9999px", i.style.width = "15px", i.style.height = "15px", i.style.zIndex = "" + T(z.zIndex), document.body.appendChild(i), i.innerHTML = l
        }
        t = document["global-zeroclipboard-flash-bridge"], t && (e = t.length) && (t = t[e - 1]), n.bridge = t || i.children[0].lastElementChild
    }, H = function (t) {
        for (var e = /^OBJECT|EMBED$/, i = t && t.parentNode; i && e.test(i.nodeName) && i.parentNode;)i = i.parentNode;
        return i || null
    }, R = function () {
        if (i) {
            var t = b(i, z.zIndex), e = H(n.bridge);
            e && (e.style.top = t.top + "px", e.style.left = t.left + "px", e.style.width = t.width + "px", e.style.height = t.height + "px", e.style.zIndex = t.zIndex + 1), n.ready === !0 && n.bridge && n.bridge.setSize(t.width, t.height)
        }
        return this
    };
    N.prototype.on = function (t, e) {
        var i, s, r, a = {}, l = o[this.id] && o[this.id].handlers;
        if ("string" == typeof t && t)r = t.toLowerCase().split(/\s+/); else if ("object" == typeof t && t && "undefined" == typeof e)for (i in t)t.hasOwnProperty(i) && "string" == typeof i && i && "function" == typeof t[i] && this.on(i, t[i]);
        if (r && r.length) {
            for (i = 0, s = r.length; s > i; i++)t = r[i].replace(/^on/, ""), a[t] = !0, l[t] || (l[t] = []), l[t].push(e);
            a.noflash && n.disabled && q.call(this, "noflash", {}), a.wrongflash && n.outdated && q.call(this, "wrongflash", {flashVersion: n.version}), a.load && n.ready && q.call(this, "load", {flashVersion: n.version})
        }
        return this
    }, N.prototype.off = function (t, e) {
        var i, n, s, r, a, l = o[this.id] && o[this.id].handlers;
        if (0 === arguments.length)r = I(l); else if ("string" == typeof t && t)r = t.split(/\s+/); else if ("object" == typeof t && t && "undefined" == typeof e)for (i in t)t.hasOwnProperty(i) && "string" == typeof i && i && "function" == typeof t[i] && this.off(i, t[i]);
        if (r && r.length)for (i = 0, n = r.length; n > i; i++)if (t = r[i].toLowerCase().replace(/^on/, ""), a = l[t], a && a.length)if (e)for (s = k(e, a); -1 !== s;)a.splice(s, 1), s = k(e, a, s); else l[t].length = 0;
        return this
    }, N.prototype.handlers = function (t) {
        var e, i = null, n = o[this.id] && o[this.id].handlers;
        if (n) {
            if ("string" == typeof t && t)return n[t] ? n[t].slice(0) : null;
            i = {};
            for (e in n)n.hasOwnProperty(e) && n[e] && (i[e] = n[e].slice(0))
        }
        return i
    };
    var L = function (t, e, i, n) {
        var s = o[this.id] && o[this.id].handlers[t];
        if (s && s.length) {
            var r, a, l, c = e || this;
            for (r = 0, a = s.length; a > r; r++)l = s[r], e = c, "string" == typeof l && "function" == typeof window[l] && (l = window[l]), "object" == typeof l && l && "function" == typeof l.handleEvent && (e = l, l = l.handleEvent), "function" == typeof l && D(l, e, i, n)
        }
        return this
    };
    N.prototype.clip = function (t) {
        t = C(t);
        for (var e = 0; e < t.length; e++)if (t.hasOwnProperty(e) && t[e] && 1 === t[e].nodeType) {
            t[e].zcClippingId ? -1 === k(this.id, l[t[e].zcClippingId]) && l[t[e].zcClippingId].push(this.id) : (t[e].zcClippingId = "zcClippingId_" + a++, l[t[e].zcClippingId] = [this.id], z.autoActivate === !0 && m(t[e], "mouseover", f));
            var i = o[this.id].elements;
            -1 === k(t[e], i) && i.push(t[e])
        }
        return this
    }, N.prototype.unclip = function (t) {
        var e = o[this.id];
        if (e) {
            var i, n = e.elements;
            t = "undefined" == typeof t ? n.slice(0) : C(t);
            for (var s = t.length; s--;)if (t.hasOwnProperty(s) && t[s] && 1 === t[s].nodeType) {
                for (i = 0; -1 !== (i = k(t[s], n, i));)n.splice(i, 1);
                var r = l[t[s].zcClippingId];
                if (r) {
                    for (i = 0; -1 !== (i = k(this.id, r, i));)r.splice(i, 1);
                    0 === r.length && (z.autoActivate === !0 && g(t[s], "mouseover", f), delete t[s].zcClippingId)
                }
            }
        }
        return this
    }, N.prototype.elements = function () {
        var t = o[this.id];
        return t && t.elements ? t.elements.slice(0) : []
    };
    var W = function (t) {
        var e, i, n, s, r, a = [];
        if (t && 1 === t.nodeType && (e = t.zcClippingId) && l.hasOwnProperty(e) && (i = l[e], i && i.length))for (n = 0, s = i.length; s > n; n++)r = o[i[n]].instance, r && r instanceof N && a.push(r);
        return a
    };
    z.hoverClass = "zeroclipboard-is-hover", z.activeClass = "zeroclipboard-is-active", z.trustedOrigins = null, z.allowScriptAccess = null, z.useNoCache = !0, z.moviePath = "ZeroClipboard.swf", N.detectFlashSupport = function () {
        return S("ZeroClipboard.detectFlashSupport", z.debug), P()
    }, N.dispatch = function (t, e) {
        if ("string" == typeof t && t) {
            var n = t.toLowerCase().replace(/^on/, "");
            if (n)for (var s = i ? W(i) : O(), r = 0, o = s.length; o > r; r++)q.call(s[r], n, e)
        }
    }, N.prototype.setHandCursor = function (t) {
        return S("ZeroClipboard.prototype.setHandCursor", z.debug), t = "boolean" == typeof t ? t : !!t, $(t), z.forceHandCursor = t, this
    }, N.prototype.reposition = function () {
        return S("ZeroClipboard.prototype.reposition", z.debug), R()
    }, N.prototype.receiveEvent = function (t, e) {
        if (S("ZeroClipboard.prototype.receiveEvent", z.debug), "string" == typeof t && t) {
            var i = t.toLowerCase().replace(/^on/, "");
            i && q.call(this, i, e)
        }
    }, N.prototype.setCurrent = function (t) {
        return S("ZeroClipboard.prototype.setCurrent", z.debug), N.activate(t), this
    }, N.prototype.resetBridge = function () {
        return S("ZeroClipboard.prototype.resetBridge", z.debug), N.deactivate(), this
    }, N.prototype.setTitle = function (t) {
        if (S("ZeroClipboard.prototype.setTitle", z.debug), t = t || z.title || i && i.getAttribute("title")) {
            var e = H(n.bridge);
            e && e.setAttribute("title", t)
        }
        return this
    }, N.setDefaults = function (t) {
        S("ZeroClipboard.setDefaults", z.debug), N.config(t)
    }, N.prototype.addEventListener = function (t, e) {
        return S("ZeroClipboard.prototype.addEventListener", z.debug), this.on(t, e)
    }, N.prototype.removeEventListener = function (t, e) {
        return S("ZeroClipboard.prototype.removeEventListener", z.debug), this.off(t, e)
    }, N.prototype.ready = function () {
        return S("ZeroClipboard.prototype.ready", z.debug), n.ready === !0
    };
    var q = function (r, o) {
        r = r.toLowerCase().replace(/^on/, "");
        var a = o && o.flashVersion && t(o.flashVersion) || null, l = i, c = !0;
        switch (r) {
            case"load":
                if (a) {
                    if (!e(a))return void q.call(this, "onWrongFlash", {flashVersion: a});
                    n.outdated = !1, n.ready = !0, n.version = a
                }
                break;
            case"wrongflash":
                a && !e(a) && (n.outdated = !0, n.ready = !1, n.version = a);
                break;
            case"mouseover":
                v(l, z.hoverClass);
                break;
            case"mouseout":
                z.autoActivate === !0 && N.deactivate();
                break;
            case"mousedown":
                v(l, z.activeClass);
                break;
            case"mouseup":
                _(l, z.activeClass);
                break;
            case"datarequested":
                var h = l.getAttribute("data-clipboard-target"), u = h ? document.getElementById(h) : null;
                if (u) {
                    var d = u.value || u.textContent || u.innerText;
                    d && this.setText(d)
                } else {
                    var p = l.getAttribute("data-clipboard-text");
                    p && this.setText(p)
                }
                c = !1;
                break;
            case"complete":
                A(s)
        }
        var f = l, m = [this, o];
        return L.call(this, r, f, m, c)
    };
    "function" == typeof define && define.amd ? define("clipboard", ["require", "exports", "module"], function (t, e, i) {
        return c = i && i.id || null, N
    }) : "object" == typeof module && module && "object" == typeof module.exports && module.exports ? (h = module.id || null, module.exports = N) : window.ZeroClipboard = N
}(), define("tpl!components/popover/copy/app.template", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div class="ui-popover-inner">\n    <div class="form-inline">\n        <div class="input-append">\n            <input type="text" class="txt js-url-placeholder url-placeholder" style="width: 216px;" readonly="" value="' + (null == (__t = text) ? "" : __t) + '">\n            <button type="button" class="btn js-btn-copy" data-clipboard-text="' + (null == (__t = text) ? "" : __t) + '">复制</button>\n        </div>\n    </div>\n</div>\n';
        return __p
    }
}), define("components/popover/copy/app", ["require", "underscore", "jquery", "../_base/app", "core/utils", "clipboard", "tpl!./app.template"], function (t) {
    var e = (t("underscore"), t("jquery"), t("../_base/app")), i = t("core/utils"), n = t("clipboard");
    return e.extend({
        template: t("tpl!./app.template"), onInitialize: function () {
            var t = this;
            n.config({
                moviePath: window._global.url["static"] + "/vendor/plugin/ZeroClipboard.swf",
                trustedDomains: ["*"],
                allowScriptAccess: "always"
            });
            var e = new n(this.$(".js-btn-copy"));
            e.on("load", function (n) {
                n.on("complete", function (n, s) {
                    i.successNotify("复制成功"), e.off("load"), t.close()
                })
            })
        }
    })
}), define("components/list/views/list_item", ["require", "underscore", "jquery", "marionette", "core/utils", "components/popover/confirm/app", "components/popover/rename/app", "components/popover/copy/app"], function (t) {
    var e = t("underscore"), i = t("jquery"), n = t("marionette"), s = t("core/utils"), r = t("components/popover/confirm/app"), o = t("components/popover/rename/app"), a = t("components/popover/copy/app");
    return n.ItemView.extend({
        tagName: "tr",
        className: "widget-list-item",
        events: {
            "click .js-check-toggle": "handleCheckToggle",
            "click .js-copy": "handleCopy",
            "click .js-delete": "handleDelete",
            "click .js-copy-link": "handleCopyLink",
            "click .js-change-num": "handleChangeNum",
            "blur .js-input-num": "handleInputNumBlur",
            "keypress .js-input-num": "handleInputNumKeypress",
            "click .js-rename": "handleRename"
        },
        modelEvents: {change: "render"},
        initialize: function (t) {
            this.options = t || {}, this.layout = this.options.layout, this.triggerMethod("init")
        },
        serializeData: function () {
            return e.extend({queryData: this.layout.model.getRequestData()}, this.model.toJSON())
        },
        handleCheckToggle: function (t) {
            this.model.set("checked", i(t.currentTarget).prop("checked"), {silent: !0})
        },
        handleCopy: function (t) {
            var e = this;
            new r({
                of: t.target, data: {title: "确定复制？"}, callback: function () {
                    e.model.copy().done(function () {
                        e.layout.model.fetch(), s.successNotify("复制成功。")
                    }).fail(function (t) {
                        s.errorNotify(t)
                    })
                }
            })
        },
        handleDelete: function (t) {
            var e = this;
            new r({
                of: t.target, data: {title: "确定删除？"}, callback: function () {
                    e.model["delete"]().done(function () {
                        e.$el.css("background", "#F3E59A").hide(500, function () {
                            e.layout.model.fetch()
                        })
                    }).fail(function (t) {
                        s.errorNotify(t)
                    })
                }
            })
        },
        handleCopyLink: function (t) {
            new a({of: t.target, data: {text: this.model.get("url")}})
        },
        handleChangeNum: function () {
            this.$(".js-change-num").hide(), this.$(".js-input-num").show().focus()
        },
        handleInputNumKeypress: function (t) {
            t.keyCode === s.keyCode.ENTER && this.handleInputNumBlur(t)
        },
        handleInputNumBlur: function (t) {
            var e = i(t.currentTarget).val(), n = this;
            e && this.model.num(e).done(function () {
                n.model.set("num", e)
            }).fail(function (t) {
                s.errorNotify(t)
            }), this.$(".js-input-num").hide(), this.$(".js-change-num").show()
        },
        handleRename: function (t) {
            new o({of: t.target, data: {name: this.model.get("title")}, callback: this._renameCallback.bind(this)})
        },
        _renameCallback: function (t) {
            var e = this;
            this.model.rename(t).done(function () {
                s.successNotify("改名成功。"), e.model.set("title", t)
            }).fail(function (t) {
                s.errorNotify(t)
            })
        },
        onClose: function () {
            this.options = null, this.layout = null
        }
    })
}), define("components/list/views/list_footer", ["require", "jquery", "marionette", "core/utils"], function (t) {
    var e = t("jquery"), i = t("marionette"), n = t("core/utils");
    return i.ItemView.extend({
        className: "widget-list-footer",
        events: {
            "click .pagenavi .fetch_page": "handlePageNumClick",
            "keypress .pagenavi .js-goto-input": "handlePageNumKeypress"
        },
        initialize: function (t) {
            this.options = t || {}, this.layout = this.options.layout, this.triggerMethod("init")
        },
        handlePageNumClick: function (t) {
            var i = e(t.currentTarget), n = +i.data("page-num");
            this.gotoPage(n)
        },
        handlePageNumKeypress: function (t) {
            var i = +e(t.currentTarget).text();
            n.isNumber(t) || t.preventDefault(), t.keyCode === n.keyCode.ENTER && (this.gotoPage(i), t.preventDefault())
        },
        gotoPage: function (t) {
            t !== +this.model.get("p") && t && (this.model.set("p", t, {silent: !0}), this.model.fetch({scroll: !0}))
        },
        onClose: function () {
            this.options = null, this.layout = null
        }
    })
}), define("components/list/views/list", ["require", "underscore", "jquery", "backbone", "vendor/nprogress", "marionette", "stickytableheaders", "text!components/list/templates/list.html", "text!components/list/templates/list_filter.html", "text!components/list/templates/list_header.html", "text!components/list/templates/list_item.html", "text!components/list/templates/list_empty.html", "text!components/list/templates/list_footer.html", "components/list/models/list", "components/list/models/list_item", "components/list/views/list_filter", "components/list/views/list_header", "components/list/views/list_body", "components/list/views/list_item", "components/list/views/list_footer"], function (t) {
    var e = t("underscore"), i = t("jquery"), n = t("backbone"), s = t("vendor/nprogress"), r = t("marionette");
    t("stickytableheaders");
    var o = {
        listTemplate: e.template(t("text!components/list/templates/list.html")),
        listFilterTemplate: e.template(t("text!components/list/templates/list_filter.html")),
        listHeaderTemplate: e.template(t("text!components/list/templates/list_header.html")),
        listItemTemplate: e.template(t("text!components/list/templates/list_item.html")),
        listEmptyTemplate: e.template(t("text!components/list/templates/list_empty.html")),
        listFooterTemplate: e.template(t("text!components/list/templates/list_footer.html")),
        ListModel: t("components/list/models/list"),
        ListItemModel: t("components/list/models/list_item"),
        ListFilterView: t("components/list/views/list_filter"),
        ListHeaderView: t("components/list/views/list_header"),
        ListBodyView: t("components/list/views/list_body"),
        ListItemView: t("components/list/views/list_item"),
        ListFooterView: t("components/list/views/list_footer")
    }, a = r.Layout.extend({
        className: "widget-list",
        defaults: {},
        ui: {body: ".js-list-body-region"},
        regions: {
            filterRegion: ".js-list-filter-region",
            headerRegion: ".js-list-header-region",
            emptyRegion: ".js-list-empty-region",
            footerRegion: ".js-list-footer-region"
        },
        initialize: function (t) {
            this.listItemViews = [], this.cache = {}, this.options = e.defaults(t || {}, this.defaults, o), this.template = this.options.listTemplate, this.model = new this.options.ListModel(e.extend({}, this.options.query, {items: new n.Collection(null, {model: this.options.ListItemModel})})), this.listenTo(this.model, "before:fetch", this.addLoading), this.listenTo(this.model, "sync", this.removeLoading), this.listenTo(this.model, "error", this.removeLoading), this.listenTo(this.model, "sync", this.fetched), this.listenTo(this.model, "sync", this.render), this.listenTo(this.model, "sync", this.setHash), this.model.fetch(), this.triggerMethod("init", t), window.NC.trigger("finish")
        },
        fetched: function () {
            this.model.fetched = !0
        },
        onRender: function () {
            var t = this.model.get("items");
            this.model.fetched && (t && t.length > 0 ? this.renderView() : (this.renderFilterView(), this.renderEmptyView()))
        },
        renderView: function () {
            this.renderFilterView(), this.renderHeaderView(), this.renderBodyView(), this.renderFooterView(), this.stickyTableHeaders(), this.scrollToTableHeaders()
        },
        renderFilterView: function () {
            this.filterRegion.show(new this.options.ListFilterView({
                template: this.options.listFilterTemplate,
                model: this.model,
                layout: this
            }))
        },
        renderHeaderView: function () {
            this.headerRegion.show(new this.options.ListHeaderView({
                template: this.options.listHeaderTemplate,
                model: this.model,
                layout: this
            }))
        },
        renderBodyView: function () {
            var t = document.createDocumentFragment(), e = this;
            this.closeListItemViews(), this.model.get("items").each(function (i) {
                var n = new e.options.ListItemView({template: e.options.listItemTemplate, model: i, layout: e});
                e.listItemViews.push(n), t.appendChild(n.render().el)
            }), this.ui.body.append(t)
        },
        renderFooterView: function () {
            this.footerRegion.show(new this.options.ListFooterView({
                template: this.options.listFooterTemplate,
                model: this.model,
                layout: this
            }))
        },
        renderEmptyView: function () {
            this.emptyRegion.show(new r.ItemView({
                template: this.options.listEmptyTemplate,
                model: this.model,
                layout: this
            }))
        },
        closeListItemViews: function () {
            e.each(this.listItemViews, function (t) {
                t.close()
            })
        },
        stickyTableHeaders: function () {
            this.$("table").stickyTableHeaders("destroy"), this.$("table").stickyTableHeaders()
        },
        scrollToTableHeaders: function () {
            var t = this.$("table");
            if (t.length) {
                var e = t.offset().top;
                i(window).scrollTop() > e && i("body, html").animate({scrollTop: e}, 200)
            }
        },
        addLoading: function () {
            s.start()
        },
        removeLoading: function () {
            s.done(), i(".js-app-main").removeClass("loading")
        },
        close: function () {
            this.closeListItemViews(), r.Layout.prototype.close.call(this)
        },
        fetchAssistData: function (t) {
            t = e.extend({}, {cache: !0}, t);
            var n = this, s = i.Deferred(), r = t.key, o = t.url, a = t.data;
            return t.cache && n.cache[r] ? s.resolve(n.cache[r]) : i.get(o, a).done(function (t) {
                n.cache[r] = t, s.resolve(t)
            }).fail(function (t) {
                s.reject(t)
            }), s.promise()
        },
        hash: function () {
            return (window.location.hash.match(/^#([^&]*)/) || [])[1]
        },
        setHash: function () {
            var t = e.result(this, "hash");
            if (t && this.model.fetched && window.router) {
                var n = this.model.getRequestData();
                window.router.navigate(t + "&" + i.param(n), {trigger: !1, replace: !0})
            }
        }
    });
    return a
}), define("core/global", ["jquery", "backbone", "marionette", "bootstrap", "notify", "core/utils", "components/page_help/help", "backboneValidate", "core/event", "common", "backbone.wreqr", "text", "tpl", "jqueryui", "components/list/views/list", "components/spider/spider"], function () {
});